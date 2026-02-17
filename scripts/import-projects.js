#!/usr/bin/env node
/**
 * import-projects.js v2
 * Imports projects from GaleriaDomów XML (domy.xml) into the project catalog.
 *
 * Image mapping:
 *   viz_1         → main.webp + thumbnail.webp
 *   viz_2-4       → gallery-1.webp ... gallery-3.webp
 *   ele_1-4       → elewacja-1.webp ... elewacja-4.webp
 *   przekroj      → przekroj.webp
 *   sytuacja      → sytuacja.webp
 *   rzut_1        → plan-parter.webp
 *   rzut_2        → plan-poddasze.webp
 *   rzut_3        → plan-pietro.webp
 *
 * Usage: node scripts/import-projects.js [--start N] [--limit N] [--dry-run] [--skip-download]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

// === CONFIG ===
const XML_PATH = path.join(__dirname, '..', 'domy.xml');
const IMAGES_BASE = path.join(__dirname, '..', 'public', 'images', 'projekty');
const OUTPUT_TS = path.join(__dirname, '..', 'data', 'projects', 'galeriadomow.ts');

// FFmpeg quality settings — high quality WebP, no resolution loss for small sources
const FFMPEG = {
  main:      '-vf "scale=\'min(1920,iw)\':-1:flags=lanczos" -quality 82 -compression_level 6',
  thumb:     '-vf "scale=600:-1:flags=lanczos" -quality 75 -compression_level 6',
  gallery:   '-vf "scale=\'min(1920,iw)\':-1:flags=lanczos" -quality 82 -compression_level 6',
  elevation: '-vf "scale=\'min(1600,iw)\':-1:flags=lanczos" -quality 85 -compression_level 6',
  plan:      '-vf "scale=\'min(1600,iw)\':-1:flags=lanczos" -quality 85 -compression_level 6',
};

// === CLI ARGS ===
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf('--' + name);
  return idx >= 0 ? args[idx + 1] : null;
};
const START = parseInt(getArg('start') || '0');
const LIMIT = parseInt(getArg('limit') || '999999');
const DRY_RUN = args.includes('--dry-run');
const SKIP_DOWNLOAD = args.includes('--skip-download');

// =====================================================================
// XML HELPERS
// =====================================================================

/** Slugify Polish text → lowercase kebab-case */
function slugify(text) {
  const pl = {
    'ą':'a','ć':'c','ę':'e','ł':'l','ń':'n','ó':'o','ś':'s','ź':'z','ż':'z',
    'Ą':'A','Ć':'C','Ę':'E','Ł':'L','Ń':'N','Ó':'O','Ś':'S','Ź':'Z','Ż':'Z',
  };
  return text
    .split('').map(c => pl[c] || c).join('')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Extract EXACT tag value from XML.
 * Won't confuse <cena> with <cena_podstawowa>, or <dach> inside <powierzchnie> with top-level <dach>.
 * Uses word-boundary after tag name: tag must be followed by > or whitespace, not _ or alphanumeric.
 */
function getTag(xml, tag) {
  const re = new RegExp('<' + tag + '(?=[\\s>])([^>]*)>([\\s\\S]*?)</' + tag + '(?=[\\s>])[^>]*>', 'm');
  const m = xml.match(re);
  return m ? m[2].trim() : null;
}

/**
 * Get ALL matches of a tag (for cases like <dach> appearing inside <powierzchnie> AND at top level).
 * Returns array of matched contents.
 */
function getAllTags(xml, tag) {
  const re = new RegExp('<' + tag + '(?=[\\s>])[^>]*>([\\s\\S]*?)</' + tag + '(?=[\\s>])[^>]*>', 'gm');
  const results = [];
  let m;
  while ((m = re.exec(xml)) !== null) {
    results.push(m[1].trim());
  }
  return results;
}

/**
 * Get a "section" tag — one that contains child XML tags (not just a plain value).
 * This solves <dach>246.50</dach> vs <dach><kalenica>...</kalenica>...</dach>
 */
function getSectionTag(xml, tag) {
  const matches = getAllTags(xml, tag);
  // Return the one that contains child tags (has < inside)
  return matches.find(content => content.includes('<')) || matches[0] || null;
}

/** Nested path extraction: 'powierzchnie/uzytkowa' → get <powierzchnie>, then <uzytkowa> inside */
function getNestedTag(xml, tagPath) {
  const parts = tagPath.split('/');
  let current = xml;
  for (let i = 0; i < parts.length; i++) {
    // For intermediate (parent) tags, prefer section tags (ones with children)
    const content = (i < parts.length - 1) ? getSectionTag(current, parts[i]) : getTag(current, parts[i]);
    if (!content) return null;
    current = content;
  }
  return current;
}

/** Clean HTML entities and <br> from XML text */
function cleanText(text) {
  if (!text) return '';
  return text
    .replace(/&lt;br&gt;/gi, '\n')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .trim();
}

// =====================================================================
// IMAGE EXTRACTION
// =====================================================================

/** Extract all image URLs organized by type (standard + mirror) */
function extractImages(xml) {
  const grafikaXml = getTag(xml, 'grafika');
  if (!grafikaXml) return { viz: [], ele: [], plans: {}, przekroj: null, sytuacja: null, mirror: null };

  const wizXml = getTag(grafikaXml, 'wizualizacja') || '';
  const eleXml = getTag(grafikaXml, 'elewacje') || '';
  const rzutyXml = getTag(grafikaXml, 'rzuty') || '';

  // Always use <standard> (non-mirror) versions
  const stdViz = getTag(wizXml, 'standard') || '';
  const stdEle = getTag(eleXml, 'standard') || '';
  const stdRzuty = getTag(rzutyXml, 'standard') || '';

  const viz = [];
  for (let i = 1; i <= 4; i++) {
    const url = getTag(stdViz, 'viz_' + i);
    if (url) viz.push(url);
  }

  const ele = [];
  for (let i = 1; i <= 4; i++) {
    const url = getTag(stdEle, 'ele_' + i);
    if (url) ele.push(url);
  }

  const plans = {};
  const rzut1 = getTag(stdRzuty, 'rzut_1');
  const rzut2 = getTag(stdRzuty, 'rzut_2');
  const rzut3 = getTag(stdRzuty, 'rzut_3');
  if (rzut1) plans.parter = rzut1;
  if (rzut2) plans.poddasze = rzut2;
  if (rzut3) plans.pietro = rzut3;

  // --- Mirror (lustro) versions ---
  const mirViz = getTag(wizXml, 'lustro') || '';
  const mirEle = getTag(eleXml, 'lustro') || '';
  const mirRzuty = getTag(rzutyXml, 'lustro') || '';

  let mirror = null;
  const mirrorViz = [];
  for (let i = 1; i <= 4; i++) {
    const url = getTag(mirViz, 'viz_' + i);
    if (url) mirrorViz.push(url);
  }
  const mirrorEle = [];
  for (let i = 1; i <= 4; i++) {
    const url = getTag(mirEle, 'ele_' + i);
    if (url) mirrorEle.push(url);
  }
  const mirrorPlans = {};
  const mirRzut1 = getTag(mirRzuty, 'rzut_1');
  const mirRzut2 = getTag(mirRzuty, 'rzut_2');
  const mirRzut3 = getTag(mirRzuty, 'rzut_3');
  if (mirRzut1) mirrorPlans.parter = mirRzut1;
  if (mirRzut2) mirrorPlans.poddasze = mirRzut2;
  if (mirRzut3) mirrorPlans.pietro = mirRzut3;

  const mirrorPrzekroj = getTag(mirRzuty, 'przekroj');
  const mirrorSytuacja = getTag(mirRzuty, 'sytuacja');

  // Only create mirror object if there are any mirror images
  if (mirrorViz.length > 0 || mirrorEle.length > 0 || Object.keys(mirrorPlans).length > 0 || mirrorPrzekroj || mirrorSytuacja) {
    mirror = {
      viz: mirrorViz,
      ele: mirrorEle,
      plans: mirrorPlans,
      przekroj: mirrorPrzekroj,
      sytuacja: mirrorSytuacja,
    };
  }

  return {
    viz,
    ele,
    plans,
    przekroj: getTag(stdRzuty, 'przekroj'),
    sytuacja: getTag(stdRzuty, 'sytuacja'),
    mirror,
  };
}

// =====================================================================
// DOWNLOAD & CONVERT
// =====================================================================

/** Download file with retries */
function downloadFile(url, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      const protocol = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(destPath);

      protocol.get(url, { timeout: 30000 }, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          file.close();
          try { fs.unlinkSync(destPath); } catch(e) {}
          const newUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          return downloadFile(newUrl, destPath, n).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          file.close();
          try { fs.unlinkSync(destPath); } catch(e) {}
          if (n > 0) return setTimeout(() => attempt(n - 1), 1000);
          return reject(new Error(`HTTP ${res.statusCode}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close();
          const stat = fs.statSync(destPath);
          if (stat.size < 100) {
            try { fs.unlinkSync(destPath); } catch(e) {}
            if (n > 0) return setTimeout(() => attempt(n - 1), 1000);
            return reject(new Error('Empty file'));
          }
          resolve();
        });
      }).on('error', (err) => {
        file.close();
        try { fs.unlinkSync(destPath); } catch(e) {}
        if (n > 0) return setTimeout(() => attempt(n - 1), 2000);
        reject(err);
      }).on('timeout', () => {
        file.close();
        try { fs.unlinkSync(destPath); } catch(e) {}
        if (n > 0) return setTimeout(() => attempt(n - 1), 2000);
        reject(new Error('Timeout'));
      });
    };
    attempt(retries);
  });
}

/** Download + convert to WebP. Returns true on success. Skips if output already exists. */
async function downloadAndConvert(url, outputWebp, ffmpegArgs, label) {
  // Skip if already downloaded & converted
  if (fs.existsSync(outputWebp)) {
    const stat = fs.statSync(outputWebp);
    if (stat.size > 100) return true; // already good
  }

  const tmpJpg = outputWebp.replace('.webp', '_tmp.jpg');
  try {
    await downloadFile(url, tmpJpg);
    execSync(`ffmpeg -y -i "${tmpJpg}" ${ffmpegArgs} "${outputWebp}" -loglevel error`, { stdio: 'pipe' });
    fs.unlinkSync(tmpJpg);
    return true;
  } catch (err) {
    try { fs.unlinkSync(tmpJpg); } catch(e) {}
    console.error(`    ✗ ${label}: ${err.message}`);
    return false;
  }
}

// =====================================================================
// DATA BUILDING
// =====================================================================

/** Parse rooms from a <kondygnacja> block */
function parseRooms(xml) {
  const rooms = [];
  const iter = xml.matchAll(/<pom>([\s\S]*?)<\/pom>/g);
  for (const m of iter) {
    const nazwa = getTag(m[1], 'nazwa');
    const pow = getTag(m[1], 'pow');
    if (nazwa && pow) rooms.push({ name: nazwa, area: `${pow} m²` });
  }
  return rooms;
}

/** Determine category from XML flags */
function determineCategory(xml) {
  // Check specyfikacja
  if (getNestedTag(xml, 'specyfikacja/dwurodzinny') === '1') return 'dwulokalowy';
  // Check kondygnacje
  if (getNestedTag(xml, 'kondygnacje/z_poddaszem') === '1') return 'z-poddaszem';
  if (getNestedTag(xml, 'kondygnacje/pietrowy') === '1') return 'z-poddaszem';
  if (getNestedTag(xml, 'kondygnacje/parterowy') === '1') return 'parterowy';
  return 'jednorodzinny';
}

/** Build 4 specification tabs from XML */
function buildSpecifications(xml) {
  const specs = [];

  // --- Tab 1: Powierzchnia i wymiary ---
  const items1 = [];
  const uzytkowa = getNestedTag(xml, 'powierzchnie/uzytkowa');
  const pomocnicza = getNestedTag(xml, 'powierzchnie/pomocnicza');
  const zabudowy = getNestedTag(xml, 'powierzchnie/zabudowy');
  const kubatura = getTag(xml, 'kubatura');
  const dachPow = getNestedTag(xml, 'powierzchnie/dach');

  if (uzytkowa) items1.push({ label: 'Powierzchnia użytkowa', value: `${uzytkowa} m²` });
  if (pomocnicza && pomocnicza !== '0.00') items1.push({ label: 'Powierzchnia pomocnicza', value: `${pomocnicza} m²` });
  if (zabudowy) items1.push({ label: 'Powierzchnia zabudowy', value: `${zabudowy} m²` });
  if (kubatura) items1.push({ label: 'Kubatura', value: `${kubatura} m³` });
  if (dachPow) items1.push({ label: 'Powierzchnia dachu', value: `${dachPow} m²` });

  // Dach section data
  const kalenica = getNestedTag(xml, 'dach/kalenica');
  const kat1 = getNestedTag(xml, 'dach/kat1');
  const scianka = getNestedTag(xml, 'dach/scianka_kolankowa');
  if (kalenica && kalenica !== '0.00') items1.push({ label: 'Wysokość kalenicy', value: `${kalenica} m` });
  if (kat1 && kat1 !== '0') items1.push({ label: 'Kąt nachylenia dachu', value: `${kat1}°` });
  if (scianka && scianka !== '0.00') items1.push({ label: 'Wysokość ścianki kolankowej', value: `${scianka} m` });

  // Dzialka data
  const minSzer = getNestedTag(xml, 'dzialka/min_szer_dzialki');
  const minDlg = getNestedTag(xml, 'dzialka/min_dlg_dzialki');
  if (minSzer && minDlg) items1.push({ label: 'Minimalne wymiary działki', value: `${minSzer} x ${minDlg} m` });

  const szerBud = getNestedTag(xml, 'dzialka/szerokosc_budynku');
  const dlgBud = getNestedTag(xml, 'dzialka/dlugosc_budynku');
  if (szerBud && dlgBud && szerBud !== '0.00') items1.push({ label: 'Wymiary budynku', value: `${szerBud} x ${dlgBud} m` });

  if (items1.length) specs.push({ title: 'Powierzchnia i wymiary', items: items1 });

  // --- Tab 2: Technologia i konstrukcja ---
  const items2 = [];
  const rodzajDachu = getNestedTag(xml, 'dach/rodzaj_dachu_opis');
  const pokrycie = getNestedTag(xml, 'dach/pokrycie_dachu_opis');
  const scianyZewn = getNestedTag(xml, 'technologia/sciany_zewn_opis');
  const scianyNosne = getNestedTag(xml, 'technologia/sciany_nosne_opis');
  const strop = getNestedTag(xml, 'technologia/strop');
  const stropText = strop === '1' ? 'monolityczny żelbetowy' : strop === '2' ? 'drewniany' : null;

  if (rodzajDachu) items2.push({ label: 'Rodzaj dachu', value: rodzajDachu });
  if (pokrycie) items2.push({ label: 'Pokrycie dachu', value: pokrycie });
  if (scianyZewn) items2.push({ label: 'Ściany zewnętrzne', value: scianyZewn });
  if (scianyNosne) items2.push({ label: 'Ściany nośne', value: scianyNosne });
  if (stropText) items2.push({ label: 'Strop', value: stropText });

  if (items2.length) specs.push({ title: 'Technologia i konstrukcja', items: items2 });

  // --- Tab 3: Instalacje ---
  const items3 = [];
  const typOgrz = getNestedTag(xml, 'instalacje/typ_ogrzewania_opis');
  if (typOgrz) items3.push({ label: 'Typ ogrzewania', value: typOgrz });
  if (getNestedTag(xml, 'instalacje/wentmech') === '1') items3.push({ label: 'Wentylacja', value: 'mechaniczna z rekuperacją' });
  if (getNestedTag(xml, 'instalacje/kominek') === '1') items3.push({ label: 'Kominek', value: 'tak' });
  if (getNestedTag(xml, 'instalacje/solar') === '1') items3.push({ label: 'Instalacja solarna', value: 'tak' });
  if (getNestedTag(xml, 'instalacje/fotowoltaika') === '1') items3.push({ label: 'Fotowoltaika', value: 'tak' });
  if (getNestedTag(xml, 'instalacje/ogrzewanie_podlogowe') === '1') items3.push({ label: 'Ogrzewanie podłogowe', value: 'tak' });
  if (getNestedTag(xml, 'instalacje/energooszczedny') === '1') items3.push({ label: 'Energooszczędny', value: 'tak' });
  if (getNestedTag(xml, 'instalacje/pasywny') === '1') items3.push({ label: 'Pasywny', value: 'tak' });

  if (items3.length) specs.push({ title: 'Instalacje', items: items3 });

  // --- Tab 4: Opis ---
  const opis = getTag(xml, 'opis');
  if (opis) {
    specs.push({ title: 'Opis funkcjonalny', items: [{ label: 'Opis', value: cleanText(opis) }] });
  }

  return specs;
}

// =====================================================================
// MAIN
// =====================================================================

async function main() {
  console.log('=== IMPORT PROJEKTÓW z GaleriaDomów XML v2 ===\n');

  const xmlContent = fs.readFileSync(XML_PATH, 'utf8');
  const projectChunks = xmlContent.split(/<projekt>/g).slice(1)
    .map(p => '<projekt>' + p.split('</projekt>')[0] + '</projekt>');

  console.log(`Znaleziono: ${projectChunks.length} projektów`);
  console.log(`Zakres: #${START + 1} → #${Math.min(START + LIMIT, projectChunks.length)}`);
  if (DRY_RUN) console.log('⚠ DRY RUN');
  if (SKIP_DOWNLOAD) console.log('⚠ SKIP DOWNLOAD');
  console.log('');

  const selected = projectChunks.slice(START, START + LIMIT);
  const results = [];
  const errors = [];
  const usedSlugs = new Set();

  for (let i = 0; i < selected.length; i++) {
    const xml = selected[i];
    const num = START + i + 1;

    // --- Basic data ---
    const xmlId = getTag(xml, 'id');
    const kod = getTag(xml, 'kod');
    const nazwa = getTag(xml, 'nazwa');
    const cena = getTag(xml, 'cena');
    const dataDodania = getTag(xml, 'data_dodania');
    const uzytkowa = getNestedTag(xml, 'powierzchnie/uzytkowa');
    const techbudowy = getNestedTag(xml, 'technologia/techbudowy');
    const ilePokoi = getTag(xml, 'ile_pokoi');
    const ileLazienek = getTag(xml, 'ile_lazienek');
    const garazOpis = getTag(xml, 'garaz_opis');

    // Skip koncepcje (not yet available)
    if (getNestedTag(xml, 'dodatkowe/koncepcja') === '1') {
      console.log(`${num}. [${kod}] ${nazwa} — POMINIĘTO (koncepcja)`);
      continue;
    }

    // --- Slug (unique) ---
    let slug = slugify(nazwa);
    if (usedSlugs.has(slug)) slug = slug + '-' + slugify(kod);
    usedSlugs.add(slug);

    // --- Images ---
    const images = extractImages(xml);
    const technology = (techbudowy === '2' || techbudowy === '3') ? 'DREWNIANY' : 'MUROWANY';
    const category = determineCategory(xml);

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`${num}/${projectChunks.length} [${kod}] ${nazwa}`);
    console.log(`  slug: ${slug} | ${uzytkowa}m² | ${technology} | ${category}`);
    console.log(`  Obrazy: ${images.viz.length} viz, ${images.ele.length} ele, ${Object.keys(images.plans).length} rzuty, przekrój:${images.przekroj ? '✓' : '✗'}, sytuacja:${images.sytuacja ? '✓' : '✗'}, lustro:${images.mirror ? '✓' : '✗'}`);

    // --- Download & Convert ---
    const imgDir = path.join(IMAGES_BASE, slug);
    let galleryImageCount = 0;
    let elevationImageCount = 0;
    let hasCrossSection = false;
    let hasSitePlan = false;
    let hasMirror = false;

    if (!DRY_RUN && !SKIP_DOWNLOAD) {
      fs.mkdirSync(imgDir, { recursive: true });

      // 1) MAIN + THUMBNAIL (viz_1)
      if (images.viz[0]) {
        const ok1 = await downloadAndConvert(images.viz[0], path.join(imgDir, 'main.webp'), FFMPEG.main, 'main');
        if (ok1) {
          // Thumbnail from same source
          await downloadAndConvert(images.viz[0], path.join(imgDir, 'thumbnail.webp'), FFMPEG.thumb, 'thumbnail');
          galleryImageCount = 1;
          console.log(`  ✓ main.webp + thumbnail.webp`);
        } else {
          errors.push({ project: kod, file: 'main' });
        }
      }

      // 2) GALLERY (viz_2, viz_3, viz_4)
      for (let v = 1; v < images.viz.length; v++) {
        const fname = `gallery-${v}.webp`;
        const ok = await downloadAndConvert(images.viz[v], path.join(imgDir, fname), FFMPEG.gallery, fname);
        if (ok) {
          galleryImageCount++;
          console.log(`  ✓ ${fname}`);
        } else {
          errors.push({ project: kod, file: fname });
        }
      }

      // 3) ELEVATIONS (ele_1-4)
      for (let e = 0; e < images.ele.length; e++) {
        const fname = `elewacja-${e + 1}.webp`;
        const ok = await downloadAndConvert(images.ele[e], path.join(imgDir, fname), FFMPEG.elevation, fname);
        if (ok) {
          elevationImageCount++;
          console.log(`  ✓ ${fname}`);
        } else {
          errors.push({ project: kod, file: fname });
        }
      }

      // 4) PRZEKROJ
      if (images.przekroj) {
        const ok = await downloadAndConvert(images.przekroj, path.join(imgDir, 'przekroj.webp'), FFMPEG.elevation, 'przekroj');
        if (ok) {
          hasCrossSection = true;
          console.log(`  ✓ przekroj.webp`);
        }
      }

      // 5) SYTUACJA
      if (images.sytuacja) {
        const ok = await downloadAndConvert(images.sytuacja, path.join(imgDir, 'sytuacja.webp'), FFMPEG.elevation, 'sytuacja');
        if (ok) {
          hasSitePlan = true;
          console.log(`  ✓ sytuacja.webp`);
        }
      }

      // 6) FLOOR PLANS
      for (const [level, url] of Object.entries(images.plans)) {
        const fname = `plan-${level}.webp`;
        const ok = await downloadAndConvert(url, path.join(imgDir, fname), FFMPEG.plan, fname);
        if (ok) console.log(`  ✓ ${fname}`);
        else errors.push({ project: kod, file: fname });
      }

      // 7) MIRROR (lustro) images — suffix -lustro, no thumbnail
      if (images.mirror) {
        let mirrorCount = 0;

        // Mirror viz: main-lustro, gallery-X-lustro (no thumbnail)
        if (images.mirror.viz[0]) {
          const ok = await downloadAndConvert(images.mirror.viz[0], path.join(imgDir, 'main-lustro.webp'), FFMPEG.main, 'main-lustro');
          if (ok) { mirrorCount++; console.log(`  ✓ main-lustro.webp`); }
        }
        for (let v = 1; v < images.mirror.viz.length; v++) {
          const fname = `gallery-${v}-lustro.webp`;
          const ok = await downloadAndConvert(images.mirror.viz[v], path.join(imgDir, fname), FFMPEG.gallery, fname);
          if (ok) { mirrorCount++; console.log(`  ✓ ${fname}`); }
        }

        // Mirror elevations
        for (let e = 0; e < images.mirror.ele.length; e++) {
          const fname = `elewacja-${e + 1}-lustro.webp`;
          const ok = await downloadAndConvert(images.mirror.ele[e], path.join(imgDir, fname), FFMPEG.elevation, fname);
          if (ok) { mirrorCount++; console.log(`  ✓ ${fname}`); }
        }

        // Mirror przekroj
        if (images.mirror.przekroj) {
          const ok = await downloadAndConvert(images.mirror.przekroj, path.join(imgDir, 'przekroj-lustro.webp'), FFMPEG.elevation, 'przekroj-lustro');
          if (ok) { mirrorCount++; console.log(`  ✓ przekroj-lustro.webp`); }
        }

        // Mirror sytuacja
        if (images.mirror.sytuacja) {
          const ok = await downloadAndConvert(images.mirror.sytuacja, path.join(imgDir, 'sytuacja-lustro.webp'), FFMPEG.elevation, 'sytuacja-lustro');
          if (ok) { mirrorCount++; console.log(`  ✓ sytuacja-lustro.webp`); }
        }

        // Mirror floor plans
        for (const [level, url] of Object.entries(images.mirror.plans)) {
          const fname = `plan-${level}-lustro.webp`;
          const ok = await downloadAndConvert(url, path.join(imgDir, fname), FFMPEG.plan, fname);
          if (ok) { mirrorCount++; console.log(`  ✓ ${fname}`); }
        }

        if (mirrorCount > 0) {
          hasMirror = true;
          console.log(`  ✓ Lustro: ${mirrorCount} obrazów`);
        }
      }

    } else {
      // Dry run — count without downloading
      galleryImageCount = images.viz.length;
      elevationImageCount = images.ele.length;
      hasCrossSection = !!images.przekroj;
      hasSitePlan = !!images.sytuacja;
      hasMirror = !!images.mirror;
    }

    // --- Floor plans data ---
    const floorPlans = [];
    const pomXml = getTag(xml, 'pomieszczenia') || '';
    const kondIter = pomXml.matchAll(/<kondygnacja\s+poziom="(\d+)">([\s\S]*?)<\/kondygnacja>/g);

    for (const km of kondIter) {
      const poziom = km[1];
      const rooms = parseRooms(km[2]);
      const nameMap = { '0': 'Piwnica', '1': 'Parter', '2': 'Poddasze', '3': 'Piętro' };
      const imageMap = { '0': 'plan-piwnica.webp', '1': 'plan-parter.webp', '2': 'plan-poddasze.webp', '3': 'plan-pietro.webp' };
      const totalArea = rooms.reduce((s, r) => s + parseFloat(r.area), 0).toFixed(1);

      floorPlans.push({
        name: nameMap[poziom] || `Kondygnacja ${poziom}`,
        area: `${totalArea}m²`,
        image: imageMap[poziom] || `plan-${poziom}.webp`,
        rooms,
      });
    }

    // --- Specifications ---
    const specifications = buildSpecifications(xml);

    // --- Alt text ---
    const alt = nazwa.startsWith('Dom ')
      ? `Wizualizacja domu ${nazwa.slice(4)}`
      : `Wizualizacja projektu ${nazwa}`;

    // --- Build result ---
    const project = {
      slug,
      id: kod,
      title: nazwa,
      alt,
      price: cena ? `${Number(cena).toLocaleString('pl-PL')} zł` : '',
      availability: '3 dni robocze',
      surfaceArea: `${uzytkowa}m²`,
      technology,
      category,
      dateAdded: dataDodania ? dataDodania.split(' ')[0] : '2025-01-01',
      galleryImageCount,
      elevationImageCount,
      hasCrossSection,
      hasSitePlan,
      hasMirror,
      roomCount: ilePokoi ? parseInt(ilePokoi) : undefined,
      bathroomCount: ileLazienek ? parseInt(ileLazienek) : undefined,
      garage: garazOpis || undefined,
      sourceUrl: getTag(xml, 'url') || undefined,
      floorPlans,
      specifications,
    };

    results.push(project);
    console.log(`  ✓ Gotowe (${galleryImageCount} viz, ${elevationImageCount} ele, ${floorPlans.length} rzutów)`);
  }

  // =====================================================================
  // GENERATE TYPESCRIPT
  // =====================================================================
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`Generowanie TypeScript (${results.length} projektów)...`);

  const esc = (s) => s.replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, '\\n');

  let ts = `// Auto-generated from GaleriaDomów XML (domy.xml)
// Generated: ${new Date().toISOString().split('T')[0]}
// Projects: ${results.length}

import type { Project } from './types';

export const galeriadomowProjects: Project[] = [\n`;

  for (const p of results) {
    ts += `  {\n`;
    ts += `    slug: '${esc(p.slug)}',\n`;
    ts += `    source: 'galeriadomow',\n`;
    ts += `    id: '${esc(p.id)}',\n`;
    ts += `    title: '${esc(p.title)}',\n`;
    ts += `    alt: '${esc(p.alt)}',\n`;
    ts += `    price: '${esc(p.price)}',\n`;
    ts += `    availability: '${p.availability}',\n`;
    ts += `    surfaceArea: '${esc(p.surfaceArea)}',\n`;
    ts += `    technology: '${p.technology}',\n`;
    ts += `    category: '${p.category}',\n`;
    ts += `    dateAdded: Date.parse('${p.dateAdded}'),\n`;
    ts += `    galleryImageCount: ${p.galleryImageCount},\n`;
    if (p.elevationImageCount) ts += `    elevationImageCount: ${p.elevationImageCount},\n`;
    if (p.hasCrossSection) ts += `    hasCrossSection: true,\n`;
    if (p.hasSitePlan) ts += `    hasSitePlan: true,\n`;
    if (p.hasMirror) ts += `    hasMirror: true,\n`;
    if (p.roomCount) ts += `    roomCount: ${p.roomCount},\n`;
    if (p.bathroomCount) ts += `    bathroomCount: ${p.bathroomCount},\n`;
    if (p.garage && p.garage !== 'brak') ts += `    garage: '${esc(p.garage)}',\n`;
    if (p.sourceUrl) ts += `    sourceUrl: '${esc(p.sourceUrl)}',\n`;

    // Floor plans
    ts += `    floorPlans: [\n`;
    for (const fp of p.floorPlans) {
      ts += `      { name: '${esc(fp.name)}', area: '${fp.area}', image: '${fp.image}', rooms: [\n`;
      for (const r of fp.rooms) {
        ts += `        { name: '${esc(r.name)}', area: '${r.area}' },\n`;
      }
      ts += `      ] },\n`;
    }
    ts += `    ],\n`;

    // Specifications
    ts += `    specifications: [\n`;
    for (const spec of p.specifications) {
      ts += `      { title: '${esc(spec.title)}', items: [\n`;
      for (const item of spec.items) {
        ts += `        { label: '${esc(item.label)}', value: '${esc(item.value)}' },\n`;
      }
      ts += `      ] },\n`;
    }
    ts += `    ],\n`;
    ts += `  },\n`;
  }

  ts += `];\n`;

  fs.writeFileSync(OUTPUT_TS, ts, 'utf8');
  console.log(`✓ Zapisano: ${OUTPUT_TS}`);

  // Summary
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`PODSUMOWANIE:`);
  console.log(`  Przetworzono: ${results.length}`);
  console.log(`  Błędy: ${errors.length}`);
  if (errors.length > 0) {
    console.log(`  Szczegóły błędów:`);
    errors.forEach(e => console.log(`    [${e.project}] ${e.file}`));
    fs.writeFileSync(path.join(__dirname, 'import-errors.json'), JSON.stringify(errors, null, 2));
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
