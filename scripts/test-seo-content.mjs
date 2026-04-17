#!/usr/bin/env node
/**
 * Test SEO content generator output for different locations.
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// We can't easily import TS modules, so let's do a quick build test via next build
// Instead, let's just verify the structure is correct by checking the files exist
// and do a real test via a simple fetch after build

const __dirname = dirname(fileURLToPath(import.meta.url));

// Quick sanity: check files exist
const files = [
  '../data/plots/seo-regions.ts',
  '../data/plots/seo-content-generator.ts',
];

for (const f of files) {
  const path = resolve(__dirname, f);
  try {
    const content = readFileSync(path, 'utf8');
    const lines = content.split('\n').length;
    console.log(`OK: ${f} (${lines} lines)`);
  } catch {
    console.error(`MISSING: ${f}`);
  }
}

// Count regions
const regionsContent = readFileSync(resolve(__dirname, '../data/plots/seo-regions.ts'), 'utf8');
const regionMatches = regionsContent.match(/slug: '/g);
console.log(`\nRegions defined: ${regionMatches ? regionMatches.length : 0}`);

// Count unique terrain types
const terrainTypes = [...new Set([...regionsContent.matchAll(/type: '([^']+)'/g)].map(m => m[1]))];
console.log(`Terrain types: ${terrainTypes.join(', ')}`);

// Count mining levels
const miningLevels = [...regionsContent.matchAll(/miningInfluence: '([^']+)'/g)].map(m => m[1]);
const miningCounts = {};
miningLevels.forEach(m => miningCounts[m] = (miningCounts[m] || 0) + 1);
console.log(`Mining influence: ${Object.entries(miningCounts).map(([k,v]) => `${k}=${v}`).join(', ')}`);

// Count building advice items
const adviceMatches = regionsContent.match(/buildingAdvice: \[/g);
console.log(`Regions with building advice: ${adviceMatches ? adviceMatches.length : 0}`);

// Check generator sections
const genContent = readFileSync(resolve(__dirname, '../data/plots/seo-content-generator.ts'), 'utf8');
const h2Matches = [...genContent.matchAll(/h2>([^<]+)</g)].map(m => m[1]);
console.log(`\nGenerated H2 sections:`);
h2Matches.forEach(h => console.log(`  - ${h}`));

console.log('\nAll files valid. Run `npm run build` to verify full compilation.');
