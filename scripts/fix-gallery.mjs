/**
 * fix-gallery.mjs
 * Poprawia jakość wizualizacji (main-*.webp, gallery-*.webp):
 * - Sharpen — wyostrza po downscale 1920→1200
 * - Wyższa jakość q=85 (było 78-80)
 *
 * Użycie:
 *   node scripts/fix-gallery.mjs              → dry-run
 *   node scripts/fix-gallery.mjs --run        → zapis
 *   node scripts/fix-gallery.mjs --folder=z349 --run  → jeden folder
 */

import sharp from 'sharp';
import { readdir, stat, readFile, writeFile } from 'fs/promises';
import { join, resolve, basename } from 'path';

const ROOT    = resolve(process.cwd(), 'public/images/projekty');
const DRY_RUN = !process.argv.includes('--run');
const folderArg = process.argv.find(a => a.startsWith('--folder='));
const FOLDER  = folderArg ? folderArg.split('=')[1] : null;

async function getFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      files.push(...await getFiles(p));
    } else if (e.name.endsWith('.webp')) {
      const n = e.name.toLowerCase();
      if (n.startsWith('main') || n.startsWith('gallery') || n.startsWith('thumbnail')) {
        files.push(p);
      }
    }
  }
  return files;
}

function fmt(b) { return (b / 1024).toFixed(1) + ' KB'; }

async function main() {
  const scanDir = FOLDER ? join(ROOT, FOLDER) : ROOT;

  console.log(`\n🖼  Poprawa jakości wizualizacji (main / gallery / thumbnail)`);
  console.log(`   Katalog: ${scanDir}`);
  console.log(`   Tryb   : ${DRY_RUN ? 'DRY-RUN' : '⚡ ZAPIS'}\n`);

  const files = await getFiles(scanDir);
  console.log(`   Znaleziono: ${files.length} plików\n`);

  console.log('─'.repeat(80));
  console.log(`${'Plik'.padEnd(50)} ${'Wym.'.padEnd(12)} ${'Przed'.padStart(8)} ${'Po'.padStart(8)}`);
  console.log('─'.repeat(80));

  let totalBefore = 0, totalAfter = 0, count = 0;

  for (const filePath of files) {
    const s = await stat(filePath);
    const inputBuffer = await readFile(filePath);
    const meta = await sharp(inputBuffer).metadata();

    const outputBuffer = await sharp(inputBuffer)
      // Lekki sharpen po downscale — przywraca ostrość krawędzi
      .sharpen({ sigma: 0.5, m1: 1.0, m2: 0.5 })
      .webp({
        quality: 85,      // było 78-80 — znaczna poprawa jakości
        effort: 5,
        lossless: false,
        smartSubsample: true,
      })
      .toBuffer();

    totalBefore += s.size;
    totalAfter  += outputBuffer.length;
    count++;

    const rel     = filePath.replace(scanDir, '').replace(/^[\\/]/, '');
    const display = rel.length > 49 ? '…' + rel.slice(-48) : rel;
    const dims    = `${meta.width}x${meta.height}`;
    const diff    = outputBuffer.length - s.size;
    const sign    = diff > 0 ? '+' : '';

    console.log(
      `${display.padEnd(50)} ${dims.padEnd(12)} ${fmt(s.size).padStart(8)} ${fmt(outputBuffer.length).padStart(8)}  ${sign}${fmt(Math.abs(diff))}`
    );

    if (!DRY_RUN) {
      await writeFile(filePath, outputBuffer);
    }
  }

  console.log('─'.repeat(80));

  const totalDiff = totalAfter - totalBefore;
  const sign = totalDiff > 0 ? '+' : '-';
  console.log(`\n📊 ${count} plików`);
  console.log(`   Przed : ${(totalBefore / 1048576).toFixed(1)} MB`);
  console.log(`   Po    : ${(totalAfter  / 1048576).toFixed(1)} MB`);
  console.log(`   Zmiana: ${sign}${(Math.abs(totalDiff) / 1048576).toFixed(1)} MB`);
  console.log(`   (wyższa jakość = większe pliki, ale zdjęcia wyglądają lepiej)\n`);

  if (DRY_RUN) {
    const cmd = FOLDER
      ? `node scripts/fix-gallery.mjs --folder=${FOLDER} --run`
      : `node scripts/fix-gallery.mjs --run`;
    console.log(`⚠️  DRY-RUN. Aby zapisać: ${cmd}\n`);
  } else {
    console.log(`✅ Gotowe!\n`);
  }
}

main().catch(err => {
  console.error('❌', err.message);
  process.exit(1);
});
