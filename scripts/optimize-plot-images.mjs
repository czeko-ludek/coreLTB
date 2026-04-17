#!/usr/bin/env node
/**
 * Optimize all plot images:
 * - Convert JPG -> WebP
 * - Thumbs: 400px wide, quality 75
 * - Full images: 1200px wide, quality 80
 * - Update references in real-data.ts (.jpg -> .webp)
 * - Delete original JPGs after conversion
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PLOTS_DIR = path.resolve('public/images/dzialki');
const DATA_FILE = path.resolve('data/plots/real-data.ts');

const THUMB_WIDTH = 400;
const THUMB_QUALITY = 75;
const FULL_WIDTH = 1200;
const FULL_QUALITY = 80;

async function optimizeImage(inputPath, isThumb) {
  const width = isThumb ? THUMB_WIDTH : FULL_WIDTH;
  const quality = isThumb ? THUMB_QUALITY : FULL_QUALITY;
  const outputPath = inputPath.replace(/\.jpg$/i, '.webp');

  try {
    const metadata = await sharp(inputPath).metadata();
    const resizeWidth = metadata.width > width ? width : undefined;

    await sharp(inputPath)
      .resize(resizeWidth, undefined, { withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(outputPath);

    const origSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = Math.round((1 - newSize / origSize) * 100);

    // Delete original JPG
    fs.unlinkSync(inputPath);

    return { origSize, newSize, savings };
  } catch (err) {
    console.error(`  ERROR: ${inputPath}: ${err.message}`);
    return null;
  }
}

async function main() {
  console.log('=== Plot Image Optimizer ===\n');

  // Find all plot image folders
  const folders = fs.readdirSync(PLOTS_DIR)
    .filter(f => fs.statSync(path.join(PLOTS_DIR, f)).isDirectory());

  console.log(`Found ${folders.length} plot folders\n`);

  let totalOrig = 0;
  let totalNew = 0;
  let totalFiles = 0;
  let errors = 0;

  for (const folder of folders) {
    const folderPath = path.join(PLOTS_DIR, folder);
    const files = fs.readdirSync(folderPath).filter(f => /\.jpg$/i.test(f));

    if (files.length === 0) continue;

    process.stdout.write(`${folder} (${files.length} files)... `);

    let folderOrig = 0;
    let folderNew = 0;

    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const isThumb = file === 'thumb.jpg';
      const result = await optimizeImage(filePath, isThumb);

      if (result) {
        folderOrig += result.origSize;
        folderNew += result.newSize;
        totalFiles++;
      } else {
        errors++;
      }
    }

    const savings = Math.round((1 - folderNew / folderOrig) * 100);
    console.log(`${(folderOrig / 1024).toFixed(0)}KB -> ${(folderNew / 1024).toFixed(0)}KB (-${savings}%)`);

    totalOrig += folderOrig;
    totalNew += folderNew;
  }

  console.log(`\n--- Summary ---`);
  console.log(`Files: ${totalFiles} converted, ${errors} errors`);
  console.log(`Size: ${(totalOrig / 1048576).toFixed(1)} MB -> ${(totalNew / 1048576).toFixed(1)} MB`);
  console.log(`Savings: ${(((totalOrig - totalNew) / 1048576)).toFixed(1)} MB (-${Math.round((1 - totalNew / totalOrig) * 100)}%)`);

  // Update references in real-data.ts
  console.log(`\nUpdating ${DATA_FILE}...`);
  let dataContent = fs.readFileSync(DATA_FILE, 'utf-8');
  const jpgRefs = (dataContent.match(/\/images\/dzialki\/[^"]+\.jpg/g) || []).length;
  dataContent = dataContent.replace(/(\/images\/dzialki\/[^"]+)\.jpg/g, '$1.webp');
  fs.writeFileSync(DATA_FILE, dataContent, 'utf-8');
  console.log(`Updated ${jpgRefs} image references (.jpg -> .webp)`);

  console.log('\nDone!');
}

main().catch(console.error);
