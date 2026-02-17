/**
 * fix-plans.mjs
 * Poprawia rozmyte rzuty kondygnacji (plan-*.webp) przez:
 * - Wyostrzenie (unsharp mask) — poprawia czytelność linii i tekstu
 * - Wyższa jakość (q=92) — mniej artefaktów kompresji
 *
 * Użycie:
 *   node scripts/fix-plans.mjs          → dry-run
 *   node scripts/fix-plans.mjs --run    → zapis
 */

import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, resolve } from 'path';

const ROOT    = resolve(process.cwd(), 'public/images/projekty');
const DRY_RUN = !process.argv.includes('--run');

async function getAllPlanFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await getAllPlanFiles(p));
    } else if (e.name.startsWith('plan-') && e.name.endsWith('.webp')) {
      files.push(p);
    }
  }
  return files;
}

function fmt(b) { return (b / 1024).toFixed(1) + ' KB'; }

async function main() {
  console.log(`\n🔍 Szukam rzutów kondygnacji (plan-*.webp)...`);
  console.log(`   Tryb: ${DRY_RUN ? 'DRY-RUN' : '⚡ ZAPIS'}\n`);

  const files = await getAllPlanFiles(ROOT);
  console.log(`   Znaleziono: ${files.length} plików\n`);

  console.log('─'.repeat(80));
  console.log(`${'Plik'.padEnd(52)} ${'Wymiary'.padEnd(12)} ${'Przed'.padStart(8)} ${'Po'.padStart(8)}`);
  console.log('─'.repeat(80));

  let totalBefore = 0, totalAfter = 0, count = 0;

  for (const filePath of files) {
    const s = await stat(filePath);
    const inputBuffer = await readFile(filePath);
    const meta = await sharp(inputBuffer).metadata();

    const outputBuffer = await sharp(inputBuffer)
      // Unsharp mask — poprawia ostrość na rysunkach technicznych
      // sigma=0.6 = lekkie; m1=1.2 = wzmocnienie krawędzi; m2=0.8 = tłumienie szumów
      .sharpen({ sigma: 0.6, m1: 1.2, m2: 0.8 })
      .webp({ quality: 92, effort: 6, lossless: false, smartSubsample: false })
      .toBuffer();

    const before = s.size;
    const after  = outputBuffer.length;
    totalBefore += before;
    totalAfter  += after;
    count++;

    const rel = filePath.replace(ROOT, '').replace(/^[\\/]/, '');
    const display = rel.length > 51 ? '…' + rel.slice(-50) : rel;
    const dims = `${meta.width}x${meta.height}`;

    console.log(
      `${display.padEnd(52)} ${dims.padEnd(12)} ${fmt(before).padStart(8)} ${fmt(after).padStart(8)}`
    );

    if (!DRY_RUN) {
      await writeFile(filePath, outputBuffer);
    }
  }

  console.log('─'.repeat(80));
  console.log(`\n📊 Rzuty: ${count} plików`);
  console.log(`   Rozmiar: ${(totalBefore/1048576).toFixed(1)} MB → ${(totalAfter/1048576).toFixed(1)} MB`);
  const diff = totalAfter - totalBefore;
  console.log(`   Zmiana : ${diff > 0 ? '+' : ''}${(diff/1048576).toFixed(1)} MB (wyższa jakość = większe pliki — to OK dla czytelności)`);

  if (DRY_RUN) {
    console.log(`\n⚠️  DRY-RUN. Aby zapisać: node scripts/fix-plans.mjs --run\n`);
  } else {
    console.log(`\n✅ Gotowe! Rzuty zostały wyostrzone.\n`);
  }
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
