#!/usr/bin/env node
/**
 * Regenerate thumbnails from full-size images with better quality.
 * Thumbs: 600px wide, quality 82 (was 400px, q75)
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const PLOTS_DIR = path.resolve('public/images/dzialki');
const THUMB_WIDTH = 600;
const THUMB_QUALITY = 82;

async function main() {
  const folders = fs.readdirSync(PLOTS_DIR)
    .filter(f => fs.statSync(path.join(PLOTS_DIR, f)).isDirectory());

  let count = 0;
  let totalSize = 0;

  for (const folder of folders) {
    const folderPath = path.join(PLOTS_DIR, folder);
    const fullImage = path.join(folderPath, '1.webp');
    const thumbPath = path.join(folderPath, 'thumb.webp');

    if (!fs.existsSync(fullImage)) continue;

    try {
      await sharp(fullImage)
        .resize(THUMB_WIDTH, undefined, { withoutEnlargement: true })
        .webp({ quality: THUMB_QUALITY, effort: 4 })
        .toFile(thumbPath + '.tmp');

      // Replace
      fs.renameSync(thumbPath + '.tmp', thumbPath);
      const size = fs.statSync(thumbPath).size;
      totalSize += size;
      count++;
    } catch (err) {
      console.error(`ERROR ${folder}: ${err.message}`);
    }
  }

  console.log(`Regenerated ${count} thumbnails (600px, q82)`);
  console.log(`Total: ${(totalSize / 1048576).toFixed(1)} MB, avg ${Math.round(totalSize / count / 1024)} KB`);
}

main().catch(console.error);
