/**
 * optimize-images.mjs
 * Optymalizuje .webp w public/images/projekty/ — resize + rekompresja.
 *
 * Użycie:
 *   node scripts/optimize-images.mjs                    → dry-run WSZYSTKICH folderów
 *   node scripts/optimize-images.mjs --folder=zx214     → dry-run 1 folderu
 *   node scripts/optimize-images.mjs --folder=zx214 --run  → optymalizuj 1 folder
 *   node scripts/optimize-images.mjs --run              → optymalizuj WSZYSTKO
 *   node scripts/optimize-images.mjs --min-kb=200       → tylko pliki > 200 KB
 */

import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, basename, resolve } from 'path';
import { existsSync } from 'fs';

// ─── Konfiguracja ────────────────────────────────────────────────────────────

const ROOT = resolve(process.cwd(), 'public/images/projekty');
const DRY_RUN = !process.argv.includes('--run');

const folderArg = process.argv.find(a => a.startsWith('--folder='));
const FOLDER = folderArg ? folderArg.split('=')[1] : null;

const minKbArg = process.argv.find(a => a.startsWith('--min-kb='));
const MIN_KB = minKbArg ? parseInt(minKbArg.split('=')[1]) : 50;

/**
 * Maksymalna szerokość/wysokość (dłuższa krawędź) po resize.
 * Next.js Image serwuje zoptymalizowane rozmiary — oryginalny plik nie musi być 1920px.
 *
 * Strategia:
 *   gallery-* / main / thumbnail  → max 1200px  (wystarczy dla max-w-screen)
 *   elewacja-*                    → max 1400px  (techniczne, potrzebują ostrości)
 *   plan-*                        → max 1200px  (rzuty w lightboxie)
 *   sytuacja / przekroj           → max 1400px  (szczegółowe rysunki)
 */
function getMaxDim(filename) {
  const f = basename(filename).toLowerCase();
  if (f.startsWith('plan-'))                            return 9999; // rzuty: bez resize (czytelność)
  if (f.startsWith('elewacja'))                         return 1400;
  if (f.startsWith('sytuacja') || f.startsWith('przekroj')) return 1400;
  return 1200;
}

/**
 * Jakość webp na podstawie nazwy pliku.
 */
function getQuality(filename) {
  const f = basename(filename).toLowerCase();
  if (f.startsWith('gallery'))             return 78;
  if (f.startsWith('main') || f.startsWith('thumbnail')) return 80;
  if (f.startsWith('elewacja'))            return 82;
  if (f.startsWith('plan-'))              return 92; // rzuty: wyższa jakość = czytelne linie
  if (f.startsWith('sytuacja') || f.startsWith('przekroj')) return 85;
  return 80;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

async function getAllWebpFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllWebpFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith('.webp')) {
      files.push(fullPath);
    }
  }
  return files;
}

function fmt(bytes) { return (bytes / 1024).toFixed(1) + ' KB'; }
function fmtMB(bytes) { return (bytes / 1048576).toFixed(1) + ' MB'; }

// ─── Główna logika ────────────────────────────────────────────────────────────

async function main() {
  const scanDir = FOLDER ? join(ROOT, FOLDER) : ROOT;

  console.log('\n🔍 Skanowanie plików...');
  console.log(`   Katalog : ${scanDir}`);
  console.log(`   Tryb    : ${DRY_RUN ? 'DRY-RUN (podgląd)' : '⚡ ZAPIS (nadpisuje pliki)'}`);
  console.log(`   Min. rozmiar: ${MIN_KB} KB\n`);

  if (!existsSync(scanDir)) {
    console.error('❌ Katalog nie istnieje:', scanDir);
    process.exit(1);
  }

  const allFiles = await getAllWebpFiles(scanDir);

  const toProcess = [];
  for (const file of allFiles) {
    const s = await stat(file);
    if (s.size >= MIN_KB * 1024) {
      toProcess.push({ path: file, size: s.size });
    }
  }

  console.log(`   Plików .webp łącznie  : ${allFiles.length}`);
  console.log(`   Do optymalizacji (> ${MIN_KB} KB): ${toProcess.length}\n`);

  if (toProcess.length === 0) {
    console.log('✅ Brak plików do optymalizacji.');
    return;
  }

  toProcess.sort((a, b) => b.size - a.size);

  let totalBefore = 0;
  let totalAfter = 0;
  let skipped = 0;
  let processed = 0;
  const errors = [];

  console.log('─'.repeat(84));
  console.log(`${'Plik'.padEnd(48)} ${'Wymiary'.padEnd(12)} ${'Przed'.padStart(8)} ${'Po'.padStart(8)} ${'Zysk'.padStart(6)}`);
  console.log('─'.repeat(84));

  for (const { path: filePath, size: originalSize } of toProcess) {
    const quality = getQuality(filePath);
    const maxDim  = getMaxDim(filePath);

    try {
      // Czytaj do bufora — sharp(filePath) blokuje plik, nie można nadpisać
      const inputBuffer = await readFile(filePath);
      const meta = await sharp(inputBuffer).metadata();
      const { width = 0, height = 0 } = meta;

      const needsResize = width > maxDim || height > maxDim;

      let pipeline = sharp(inputBuffer);
      if (needsResize) {
        pipeline = pipeline.resize(maxDim, maxDim, { fit: 'inside', withoutEnlargement: true });
      }

      const outputBuffer = await pipeline
        .webp({ quality, effort: 5, lossless: false, smartSubsample: true })
        .toBuffer();

      const newSize = outputBuffer.length;
      const saved   = originalSize - newSize;
      const savedPct = ((saved / originalSize) * 100).toFixed(1);

      if (saved < originalSize * 0.005) { // pomijaj < 0.5% zysku
        skipped++;
        continue;
      }

      totalBefore += originalSize;
      totalAfter  += newSize;
      processed++;

      const rel = filePath.replace(scanDir, '').replace(/^[\\/]/, '');
      const displayPath = rel.length > 47 ? '…' + rel.slice(-46) : rel;
      const dims = needsResize ? `${width}→${maxDim}` : `${width}px`;

      console.log(
        `${displayPath.padEnd(48)} ${dims.padEnd(12)} ${fmt(originalSize).padStart(8)} ${fmt(newSize).padStart(8)} ${('-'+savedPct+'%').padStart(6)}`
      );

      if (!DRY_RUN) {
        await writeFile(filePath, outputBuffer);
      }

    } catch (err) {
      errors.push({ file: filePath, error: err.message });
    }
  }

  console.log('─'.repeat(84));
  console.log(`\n📊 Podsumowanie:`);
  console.log(`   Przetworzono : ${processed} plików`);
  console.log(`   Pominięto    : ${skipped} (już zoptymalizowane)`);
  if (errors.length > 0) {
    console.log(`   Błędy        : ${errors.length}`);
    errors.slice(0, 5).forEach(e => console.log(`     ⚠ ${basename(e.file)}: ${e.error}`));
  }

  if (processed > 0) {
    const savedTotal = totalBefore - totalAfter;
    const savedPct   = ((savedTotal / totalBefore) * 100).toFixed(1);
    console.log(`\n   Przed        : ${fmtMB(totalBefore)}`);
    console.log(`   Po           : ${fmtMB(totalAfter)}`);
    console.log(`   Zaoszczędzono: ${fmtMB(savedTotal)} (${savedPct}%)`);
  }

  if (DRY_RUN) {
    console.log(`\n⚠️  DRY-RUN — żaden plik nie został zmieniony.`);
    const cmd = FOLDER
      ? `node scripts/optimize-images.mjs --folder=${FOLDER} --run`
      : `node scripts/optimize-images.mjs --run`;
    console.log(`   Aby zapisać: ${cmd}\n`);
  } else {
    console.log(`\n✅ Gotowe! Pliki nadpisane.\n`);
  }
}

main().catch(err => {
  console.error('❌ Błąd krytyczny:', err);
  process.exit(1);
});
