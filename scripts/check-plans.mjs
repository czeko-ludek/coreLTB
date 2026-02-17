import sharp from 'sharp';
import { readdirSync, statSync } from 'fs';
import { join } from 'path';

const ROOT = 'public/images/projekty';

function walk(d) {
  const files = [];
  for (const e of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, e.name);
    if (e.isDirectory()) files.push(...walk(p));
    else if (e.name.startsWith('plan-') && e.name.endsWith('.webp') && !e.name.includes('lustro'))
      files.push(p);
  }
  return files;
}

// Tylko foldery z500/galeriadomow (krótkie nazwy: z349, zx214 itp. lub 'dom-przy' ze źródłem)
const allFiles = walk(ROOT);
// Bierz tylko pliki z folderów o krótkich nazwach (importowane)
const imported = allFiles.filter(f => {
  const folder = f.split(/[/\\]/)[2]; // public\images\projekty\FOLDER\plik
  return /^(z|zx|zb)\d/.test(folder);
}).slice(0, 12);

const results = await Promise.all(imported.map(async f => {
  const m = await sharp(f).metadata();
  const s = statSync(f).size;
  return `${String(m.width + 'x' + m.height).padEnd(12)} ${String((s/1024).toFixed(0)+'KB').padStart(7)}  ${f}`;
}));
results.forEach(r => console.log(r));
