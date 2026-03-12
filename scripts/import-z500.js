#!/usr/bin/env node
/**
 * import-z500.js v2
 * Imports projects from Z500.pl website into the project catalog.
 *
 * Data source: `let PageData = {...}` JS object embedded in each project page.
 * PageData.project contains full project data including:
 *   - images[] with inline SVG content for floor plans & site plans
 *   - rooms[] with names, areas and storey assignments
 *   - building dimensions, roof angles, technology codes
 *
 * Image mapping:
 *   project_view (not mirrored)   → main.webp + thumbnail.webp + gallery-N.webp
 *   project_projection.content    → plan-parter.webp, plan-poddasze.webp (SVG→WebP)
 *   project_placement.content     → sytuacja.webp (SVG→WebP, plot/site plan)
 *
 * Usage: node scripts/import-z500.js [--dry-run] [--skip-download] [--limit N]
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { execSync } = require('child_process');

// === CONFIG ===
const URLS_FILE = path.join(__dirname, 'z500-urls.txt');
const IMAGES_BASE = path.join(__dirname, '..', 'public', 'images', 'projekty');
const OUTPUT_TS = path.join(__dirname, '..', 'data', 'projects', 'z500.ts');
const IMAGEMAGICK = 'C:\\Program Files\\ImageMagick-7.1.2-Q16\\magick.exe';

// FFmpeg quality settings — matching import-projects.js
const FFMPEG = {
  main:      '-vf "scale=\'min(1920,iw)\':-1:flags=lanczos" -quality 82 -compression_level 6',
  thumb:     '-vf "scale=600:-1:flags=lanczos" -quality 75 -compression_level 6',
  gallery:   '-vf "scale=\'min(1920,iw)\':-1:flags=lanczos" -quality 82 -compression_level 6',
};
// Plan/elevation images — higher quality for technical drawings
const FFMPEG_PLAN = '-vf "scale=\'min(1600,iw)\':-1:flags=lanczos" -quality 85 -compression_level 6';

// Z500 CDN base — for project_view raster images
const Z500_CDN = 'https://image.z500.pl/';
const Z500_BUCKET = 'z500-prod';

// Delay between fetches to be polite (ms)
const FETCH_DELAY = 1500;

// === CLI ARGS ===
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf('--' + name);
  return idx >= 0 ? args[idx + 1] : null;
};
const LIMIT = parseInt(getArg('limit') || '999999');
const DRY_RUN = args.includes('--dry-run');
const SKIP_DOWNLOAD = args.includes('--skip-download');

// =====================================================================
// UTILITIES
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

/** Format number with Polish thousands separator */
function formatPLN(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Sleep helper */
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// =====================================================================
// HTTP HELPERS
// =====================================================================

/** Fetch URL content as string (follows redirects) */
function fetchUrl(url, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      const protocol = url.startsWith('https') ? https : http;
      const options = {
        timeout: 30000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
        },
      };

      protocol.get(url, options, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          const newUrl = res.headers.location.startsWith('http')
            ? res.headers.location
            : new URL(res.headers.location, url).href;
          return fetchUrl(newUrl, n).then(resolve).catch(reject);
        }
        if (res.statusCode !== 200) {
          if (n > 0) return setTimeout(() => attempt(n - 1), 2000);
          return reject(new Error(`HTTP ${res.statusCode} for ${url}`));
        }

        const chunks = [];
        res.on('data', chunk => chunks.push(chunk));
        res.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
        res.on('error', (err) => {
          if (n > 0) return setTimeout(() => attempt(n - 1), 2000);
          reject(err);
        });
      }).on('error', (err) => {
        if (n > 0) return setTimeout(() => attempt(n - 1), 2000);
        reject(err);
      }).on('timeout', () => {
        if (n > 0) return setTimeout(() => attempt(n - 1), 2000);
        reject(new Error('Timeout'));
      });
    };
    attempt(retries);
  });
}

/** Download file with retries (binary) */
function downloadFile(url, destPath, retries = 3) {
  return new Promise((resolve, reject) => {
    const attempt = (n) => {
      const protocol = url.startsWith('https') ? https : http;
      const file = fs.createWriteStream(destPath);
      const options = {
        timeout: 60000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
      };

      protocol.get(url, options, (res) => {
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

/** Download + convert to WebP via ffmpeg. Returns true on success. Skips if output already exists. */
async function downloadAndConvert(url, outputWebp, ffmpegArgs, label) {
  if (fs.existsSync(outputWebp)) {
    const stat = fs.statSync(outputWebp);
    if (stat.size > 100) return true;
  }

  const ext = url.includes('.png') ? '.png' : url.includes('.webp') ? '.webp' : '.jpg';
  const tmpFile = outputWebp.replace('.webp', `_tmp${ext}`);
  try {
    await downloadFile(url, tmpFile);
    execSync(`ffmpeg -y -i "${tmpFile}" ${ffmpegArgs} "${outputWebp}" -loglevel error`, { stdio: 'pipe' });
    fs.unlinkSync(tmpFile);
    return true;
  } catch (err) {
    try { fs.unlinkSync(tmpFile); } catch(e) {}
    console.error(`    \u2717 ${label}: ${err.message}`);
    return false;
  }
}

// =====================================================================
// SVG → WebP CONVERSION
// =====================================================================

/**
 * Convert SVG string content to WebP using ImageMagick.
 * Returns true on success. Skips if output already exists.
 */
function convertSvgToWebp(svgContent, outputWebp, label = 'SVG') {
  if (fs.existsSync(outputWebp)) {
    const stat = fs.statSync(outputWebp);
    if (stat.size > 100) return true;
  }

  const tmpSvg = outputWebp.replace('.webp', '_tmp.svg');
  try {
    let svg = svgContent;
    // Ensure XML header
    if (!svg.includes('<?xml')) {
      svg = '<?xml version="1.0" encoding="UTF-8"?>\n' + svg;
    }

    fs.writeFileSync(tmpSvg, svg, 'utf8');

    // ImageMagick: high-density rasterization, white background, max 1600px wide
    // NOTE: input file MUST come before -flatten (IM reads input first, then composites)
    execSync(
      `"${IMAGEMAGICK}" -density 200 "${tmpSvg}" -background white -flatten -resize "1600x>" -quality 85 "${outputWebp}"`,
      { stdio: 'pipe', timeout: 30000 }
    );

    fs.unlinkSync(tmpSvg);
    return true;
  } catch (err) {
    try { fs.unlinkSync(tmpSvg); } catch(e) {}
    console.error(`    \u2717 ${label}: ${err.message}`);
    return false;
  }
}

// =====================================================================
// Z500 PAGE DATA EXTRACTION
// =====================================================================

/**
 * Extract PageData object from Z500 HTML.
 *
 * The page contains a massive <script> block:
 *   let PageData = { route: {...}, project: {...}, ... };
 * This is ~628KB of JS. We find the boundaries and parse with Function().
 */
function extractPageData(html) {
  // Find "let PageData" in the HTML
  const startMarker = 'let PageData';
  const startIdx = html.indexOf(startMarker);
  if (startIdx === -1) {
    console.error('  ! "let PageData" not found in HTML');
    return {};
  }

  // Find the </script> that closes this block
  const scriptEnd = html.indexOf('</script>', startIdx);
  if (scriptEnd === -1) {
    console.error('  ! </script> not found after PageData');
    return {};
  }

  // Extract: "let PageData = {...}" → grab everything between "= " and ";"
  const rawBlock = html.substring(startIdx, scriptEnd);
  const eqIdx = rawBlock.indexOf('=');
  if (eqIdx === -1) return {};

  let rawObj = rawBlock.substring(eqIdx + 1).trim();
  // Remove trailing semicolon
  if (rawObj.endsWith(';')) rawObj = rawObj.slice(0, -1).trim();

  try {
    const fn = new Function('return (' + rawObj + ')');
    return fn();
  } catch (err) {
    console.error('  ! Failed to parse PageData:', err.message.substring(0, 200));
    return {};
  }
}

/**
 * Parse image path from Z500 image object.
 * Z500 stores: image.path = "amazon-s3:image.z500.pl:images/project_view/50907/file.jpg"
 * or: "amazon-s3:d16h5llwpes6vw.cloudfront.net:files/project_projection/50907/file.svg"
 *
 * Returns { bucket, key } where bucket is the CDN hostname.
 */
function parseImagePath(image) {
  if (!image || !image.path) return null;

  const parts = image.path.split(':');
  if (parts.length >= 3 && parts[0] === 'amazon-s3') {
    return {
      bucket: parts[1],                  // e.g. "image.z500.pl" or "d16h5llwpes6vw.cloudfront.net"
      key: parts.slice(2).join(':'),     // e.g. "images/project_view/50907/file.jpg"
    };
  }

  return null;
}

/**
 * Generate high-res CDN URL from parsed image path.
 * Only works for raster images on image.z500.pl CDN.
 */
function makeHighResUrl(parsedPath, width = 1920) {
  const params = {
    bucket: Z500_BUCKET,
    key: parsedPath.key,
    edits: {
      webp: { quality: 85, preset: 'photo' },
      resize: { width, fit: 'inside' },
    },
  };
  const base64 = Buffer.from(JSON.stringify(params)).toString('base64');
  return Z500_CDN + base64;
}

/**
 * Classify images from PageData.project.images array into typed groups.
 * Filters out mirrored versions for standard import.
 *
 * Two formats exist:
 * - New projects: SVG inline in images[].content (e.g. Z509)
 * - Older projects: Raster PNG on CDN, content is null (e.g. Z381, Z408)
 * Both are handled — SVGs via ImageMagick, rasters via CDN download + ffmpeg.
 */
function classifyImages(images) {
  const result = {
    views: [],        // project_view — 3D visualizations (non-mirrored)
    viewsMirrored: [],// project_view — mirrored versions
    projections: [],  // project_projection — floor plans (SVG content OR raster on CDN)
    placements: [],   // project_placement — site/plot plans (SVG content OR raster on CDN)
  };

  if (!Array.isArray(images)) return result;

  for (const img of images) {
    const type = img.type || '';
    const isMirrored = img.mirrored === true || img.option_2 === 'mirror_yes';

    switch (type) {
      case 'project_view':
        if (isMirrored) result.viewsMirrored.push(img);
        else result.views.push(img);
        break;
      case 'project_projection':
        // Non-mirrored — either SVG (content) or raster PNG (path on CDN)
        if (!isMirrored) result.projections.push(img);
        break;
      case 'project_placement':
        // Site/plot plan — non-mirrored
        if (!isMirrored) result.placements.push(img);
        break;
      // project_drawing, project_outline — PDFs, skip
    }
  }

  return result;
}

/**
 * Build rooms array for a given storey from PageData.project.rooms.
 * Each room: { id, room: { name, summed }, usable_area, net_area, storey }
 *
 * Area priority: usable_area when > 0, otherwise net_area (fallback for
 * garages, utility rooms and stairs where usable_area = 0).
 * Rooms with 0 area after fallback are excluded from the list.
 */
function buildRooms(rooms, storey) {
  if (!Array.isArray(rooms)) return [];

  return rooms
    .filter(r => r.storey === storey)
    .sort((a, b) => (a.no || 0) - (b.no || 0))
    .map(r => {
      const area = (r.usable_area && r.usable_area > 0) ? r.usable_area : (r.net_area || 0);
      return {
        name: r.room?.name || `Pomieszczenie ${r.no}`,
        area: `${area} m\u00B2`,
      };
    })
    .filter(r => !r.area.startsWith('0 '));
}

/**
 * Determine project category from title keywords.
 */
function determineCategory(title) {
  const t = title.toLowerCase();
  if (t.includes('dwulokal') || t.includes('bliz') || t.includes('bli\u017A')) return 'dwulokalowy';
  if (t.includes('poddasz') || t.includes('pi\u0119tr') || t.includes('pietr')) return 'z-poddaszem';
  if (t.includes('parter')) return 'parterowy';
  return 'jednorodzinny';
}

// =====================================================================
// Z500 ENUM DECODERS
// =====================================================================
// Z500 stores most building parameters as bitmasks (2^index) where
// the index corresponds to the key order in project_translations.
// Some are simple key-value mappings (technology).

/**
 * Technology code → Polish label mapping.
 * From Vue binding: :items="{1:'murowany'}"
 * Keys match project_translations.technology_type order.
 */
const TECHNOLOGY_MAP = {
  1: { key: 'brick', label: 'murowany', tech: 'MUROWANY' },
  2: { key: 'wooden', label: 'drewniany', tech: 'DREWNIANY' },
  3: { key: 'sip', label: 'SIP', tech: 'MUROWANY' },
  4: { key: 'eneroo', label: 'Eneroo', tech: 'MUROWANY' },
  5: { key: 'brzechwa', label: 'Brzechwa', tech: 'DREWNIANY' },
  6: { key: 'domzfabryki', label: 'Dom z Fabryki', tech: 'MUROWANY' },
  7: { key: 'domikon', label: 'DOMiKON', tech: 'MUROWANY' },
  8: { key: 'ecodom', label: 'EcoDom', tech: 'MUROWANY' },
  9: { key: 'novahouse', label: 'Nova House', tech: 'MUROWANY' },
};

/**
 * Ceiling type bitmask decoder.
 * Bit position → key in project_translations.ceiling
 */
const CEILING_BITS = [
  'g\u0119sto\u017Cebrowy',          // 2^0 = 1: beam_and_block
  '\u017Celbetowy',                   // 2^1 = 2: reinforced_concrete
  'drewniany',                        // 2^2 = 4: wooden
  'wi\u0105zary',                     // 2^3 = 8: trusses
  'SIP',                              // 2^4 = 16: sip
];

/**
 * Roofing type bitmask decoder (multi-select — multiple bits can be set).
 * Bit position → key in project_translations.roofing_type
 */
const ROOFING_BITS = [
  'dach\u00F3wka',                    // 2^0 = 1: tile
  'blachodach\u00F3wka',              // 2^1 = 2: metal_tile
  'papa bitumiczna',                  // 2^2 = 4: tar_paper
  'folia PVC',                        // 2^3 = 8: foil
  'blacha',                           // 2^4 = 16: plate
  'gont',                             // 2^5 = 32: shingle
  'p\u0142ytki',                      // 2^6 = 64: ceramics
];

/**
 * Foundation type bitmask decoder.
 * Bit position → key in project_translations.foundation_type
 */
const FOUNDATION_BITS = [
  'fundament liniowy',                // 2^0 = 1: linear
  'p\u0142yta fundamentowa',          // 2^1 = 2: plate
];

/**
 * Roof construction type bitmask decoder.
 * Bit position → key in project_translations.roof_construction_type
 */
const ROOF_CONSTRUCTION_BITS = [
  'wi\u0119\u017Aba tradycyjna',      // 2^0 = 1: timber_trusses
  'wi\u0105zary prefabrykowane',      // 2^1 = 2: prefabricated_trusses
  'system betonowy',                  // 2^2 = 4: concrete_system
  'SIP',                              // 2^3 = 8: sip
  'stalowy',                          // 2^4 = 16: steel
  'wi\u0105zary gwo\u017Adziowane',   // 2^5 = 32: nailed_plank_trusses
  '\u017Celbetowy (stropodach)',      // 2^6 = 64: reinforced_concrete
];

/**
 * Installation bitmask decoder.
 * Each installation is a single power-of-2. The installations array
 * contains individual bitmask values (not combined into one number).
 * Bit position → key in project_translations.installation_name
 */
const INSTALLATION_BITS = [
  'kocio\u0142 na gaz',              // 2^0 = 1: gas
  'paliwo sta\u0142e',               // 2^1 = 2: solid_fuel
  'olej opa\u0142owy',               // 2^2 = 4: oil
  'grzejniki elektryczne',           // 2^3 = 8: electric
  'kominek (bez rozprowadzenia)',     // 2^4 = 16: chimney
  'kolektory s\u0142oneczne',        // 2^5 = 32: solars
  'kable grzewcze elektryczne',      // 2^6 = 64: electrical_cables
  'pompa ciep\u0142a powietrzna',    // 2^7 = 128: heat_pump
  'podgrzewacz przep\u0142ywowy',    // 2^8 = 256: flow_heater
  'kocio\u0142 na biomas\u0119',     // 2^9 = 512: biomass
  'ogrzewanie pod\u0142ogowe',       // 2^10 = 1024: floor_heating
  'kominek z p\u0142aszczem wodnym', // 2^11 = 2048: fireplace_wj
  'fotowoltaika',                    // 2^12 = 4096: photovoltaics
  'promiennik ciep\u0142a',          // 2^13 = 8192: heat_radiator
  'kominek z DGP',                   // 2^14 = 16384: dgp
  'pompa ciep\u0142a gruntowa',      // 2^15 = 32768: heat_pump_ground
  'klimatyzator z funkcj\u0105 pompy ciep\u0142a', // 2^16 = 65536: hp_air_cond
  'bojler',                          // 2^17 = 131072: boiler
  'grzejniki',                       // 2^18 = 262144: radiators
  'instalacja klimatyzacji',         // 2^19 = 524288: air_conditioner
  'odkurzacz centralny',             // 2^20 = 1048576: vacuum_cleaner
  'wentylacja w warstwach posadzki', // 2^21 = 2097152: vent_peflex
];

/**
 * Installation category groupings — from Vue component bindings.
 * An installation bitmask value can appear in multiple categories.
 */
const INSTALLATION_CATEGORIES = {
  // Instalacja grzewcza (heating source)
  hs: new Set([1, 4, 2048, 8, 8192, 65536, 16, 256, 32768, 128, 131072, 262144]),
  // Instalacja CWU (hot water)
  hw: new Set([1, 4, 2048, 8, 8192, 1024, 524288, 64, 128, 131072]),
  // Instalacje uzupełniające (complementary)
  complementary: new Set([16384, 32, 4096, 1048576, 2097152, 4194304, 8388608]),
};

/**
 * Default construction assumptions for Z500 projects.
 * Hardcoded in Z500 Vue bundle — used when construction_assumptions field is empty.
 * Source: frontend_project-6bLqQIUz.js
 */
const Z500_DEFAULT_ASSUMPTIONS = [
  'III strefa wiatrowa dla H = 300m n.p.m. obci\u0105\u017Cenia wiatrem (300 N/m\u00B2)',
  'III strefa \u015Bniegowa dla H = 300m n.p.m. obci\u0105\u017Cenia \u015Bniegiem (1200 N/m\u00B2)',
  'g\u0142\u0119boko\u015B\u0107 przemarzania gruntu hz = 1,2m',
  'budynek zaliczono do I-ej kategorii geotechnicznej',
  'obliczeniowy graniczny op\u00F3r pod\u0142o\u017Ca gruntowego za\u0142o\u017Cono: mxQf = 150kPa',
];

/**
 * Ventilation type decoder.
 * data.designed_ventilation: 1 = mechanical, 0 = gravity
 */
const VENTILATION_MAP = {
  0: 'grawitacyjna',
  1: 'mechaniczna (rekuperacja)',
};

/** Decode a bitmask value to labels array using a bits lookup table */
function decodeBitmask(value, bitsTable) {
  if (!value || value === 0) return [];
  const labels = [];
  for (let i = 0; i < bitsTable.length; i++) {
    if (value & (1 << i)) {
      labels.push(bitsTable[i]);
    }
  }
  return labels;
}

/** Decode a single bitmask value (only one bit set) to label */
function decodeSingleBit(value, bitsTable) {
  if (!value || value === 0) return null;
  const bitPos = Math.log2(value);
  if (Number.isInteger(bitPos) && bitPos < bitsTable.length) {
    return bitsTable[bitPos];
  }
  return null;
}

/**
 * Decode installations into categorized groups.
 *
 * Two data sources on a Z500 project:
 *   1. proj.installations[]         — all available/supported installations (bitmask values)
 *   2. proj.data.installations_hs[] — DESIGNED heating sources (takes priority)
 *      proj.data.installations_hw[] — DESIGNED hot-water sources (takes priority)
 *
 * Strategy:
 *   • If data.installations_hs/hw exist → use them for heating/CWU (they're what Z500 actually shows).
 *   • Remaining items from proj.installations go to complementary (or heating/cwu if no designed data).
 */
function decodeInstallations(installationsArray, dataInstallationsHs, dataInstallationsHw) {
  const heating = [];
  const cwu = [];
  const complementary = [];

  const hasDesignedHs = Array.isArray(dataInstallationsHs) && dataInstallationsHs.length > 0;
  const hasDesignedHw = Array.isArray(dataInstallationsHw) && dataInstallationsHw.length > 0;

  // 1) Designed heating sources (from data.installations_hs)
  if (hasDesignedHs) {
    for (const val of dataInstallationsHs) {
      const label = decodeSingleBit(val, INSTALLATION_BITS);
      if (label && !heating.includes(label)) heating.push(label);
    }
  }

  // 2) Designed CWU sources (from data.installations_hw)
  if (hasDesignedHw) {
    for (const val of dataInstallationsHw) {
      const label = decodeSingleBit(val, INSTALLATION_BITS);
      if (label && !cwu.includes(label)) cwu.push(label);
    }
  }

  // 3) General installations list → fill gaps or add complementary
  if (Array.isArray(installationsArray)) {
    const usedLabels = new Set([...heating, ...cwu]);

    for (const val of installationsArray) {
      const label = decodeSingleBit(val, INSTALLATION_BITS);
      if (!label || usedLabels.has(label)) continue;

      const inHs = INSTALLATION_CATEGORIES.hs.has(val);
      const inHw = INSTALLATION_CATEGORIES.hw.has(val);
      const inComp = INSTALLATION_CATEGORIES.complementary.has(val);

      if (!hasDesignedHs && inHs) { heating.push(label); usedLabels.add(label); }
      else if (!hasDesignedHw && inHw) { cwu.push(label); usedLabels.add(label); }
      else if (inComp) { complementary.push(label); usedLabels.add(label); }
      else { complementary.push(label); usedLabels.add(label); }
    }
  }

  return { heating, cwu, complementary };
}

/**
 * Map Z500 technology code to our ProjectTechnology type.
 * From Vue binding: :items="{1:'murowany'}" → technology code is a simple key.
 */
function mapTechnology(code) {
  const entry = TECHNOLOGY_MAP[code];
  return entry ? entry.tech : 'MUROWANY';
}

/** Get Polish label for technology code */
function getTechnologyLabel(code) {
  const entry = TECHNOLOGY_MAP[code];
  return entry ? entry.label : 'murowany';
}

/**
 * Strip HTML tags from string, normalize whitespace.
 * Used for converting short_description HTML to plain text.
 */
function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Build specifications tabs from PageData.project fields.
 * Full extraction of all Z500 parametry sections:
 *   1. Powierzchnia i wymiary
 *   2. Dach i konstrukcja (merged: angles/area + tech/construction)
 *   3. Technologia i konstrukcja
 *   4. Instalacje
 *   5. Koszty
 */
function buildSpecifications(proj) {
  const specs = [];

  // --- Tab 1: Powierzchnia i wymiary ---
  const items1 = [];
  if (proj.usable_area) items1.push({ label: 'Powierzchnia u\u017Cytkowa', value: `${proj.usable_area} m\u00B2` });
  if (proj.net_area && proj.net_area !== proj.usable_area) {
    items1.push({ label: 'Powierzchnia netto', value: `${proj.net_area} m\u00B2` });
  }
  if (proj.footprint_area) items1.push({ label: 'Powierzchnia zabudowy', value: `${proj.footprint_area} m\u00B2` });
  if (proj.garage_area && proj.garage_area > 0) {
    items1.push({ label: 'Powierzchnia gara\u017Cu', value: `${proj.garage_area} m\u00B2` });
  }
  if (proj.data?.volume) items1.push({ label: 'Kubatura', value: `${proj.data.volume} m\u00B3` });
  if (proj.elevation_width) items1.push({ label: 'Szeroko\u015B\u0107 elewacji', value: `${proj.elevation_width} m` });
  if (proj.height) items1.push({ label: 'Wysoko\u015B\u0107 budynku', value: `${proj.height} m` });
  if (proj.roof_angle && proj.roof_angle > 0) {
    items1.push({ label: 'K\u0105t nachylenia dachu', value: `${proj.roof_angle}\u00B0` });
  }
  if (proj.roof_angle_2 && proj.roof_angle_2 > 0) {
    items1.push({ label: 'K\u0105t nachylenia dachu (2)', value: `${proj.roof_angle_2}\u00B0` });
  }
  if (proj.roof_area) items1.push({ label: 'Powierzchnia dachu', value: `${proj.roof_area} m\u00B2` });
  if (proj.knee_wall_height && proj.knee_wall_height > 0) {
    items1.push({ label: 'Wysoko\u015B\u0107 \u015Bcianki kolankowej', value: `${proj.knee_wall_height} m` });
  }
  if (proj.lot_width && proj.lot_length) {
    items1.push({ label: 'Minimalne wymiary dzia\u0142ki', value: `${proj.lot_width} x ${proj.lot_length} m` });
  }
  if (items1.length) specs.push({ title: 'Powierzchnia i wymiary', items: items1 });

  // --- Tab 2: Technologia i konstrukcja ---
  const items2 = [];
  if (proj.technology) {
    items2.push({ label: 'Technologia', value: getTechnologyLabel(proj.technology) });
  }
  if (proj.ceiling1) {
    const ceilingLabels = decodeBitmask(proj.ceiling1, CEILING_BITS);
    if (ceilingLabels.length) {
      items2.push({ label: 'Konstrukcja stropu nad parterem', value: ceilingLabels.join(', ') });
    }
  }
  if (proj.ceiling2) {
    const ceilingLabels2 = decodeBitmask(proj.ceiling2, CEILING_BITS);
    if (ceilingLabels2.length) {
      items2.push({ label: 'Konstrukcja stropu nad pi\u0119trem', value: ceilingLabels2.join(', ') });
    }
  }
  if (proj.roofing) {
    const roofingLabels = decodeBitmask(proj.roofing, ROOFING_BITS);
    if (roofingLabels.length) {
      items2.push({ label: 'Pokrycie dachu', value: roofingLabels.join(', ') });
    }
  }
  if (proj.foundation) {
    const foundationLabels = decodeBitmask(proj.foundation, FOUNDATION_BITS);
    if (foundationLabels.length) {
      items2.push({ label: 'Posadowienie', value: foundationLabels.join(', ') });
    }
  }
  if (proj.roof_construction) {
    const roofConLabels = decodeBitmask(proj.roof_construction, ROOF_CONSTRUCTION_BITS);
    if (roofConLabels.length) {
      items2.push({ label: 'Konstrukcja dachu', value: roofConLabels.join(', ') });
    }
  }
  // Construction assumptions — from field or Z500 default template
  {
    let assumptionsLines = [];
    if (proj.construction_assumptions && typeof proj.construction_assumptions === 'string' && proj.construction_assumptions.trim()) {
      assumptionsLines = proj.construction_assumptions.split('\n').filter(Boolean);
    } else {
      assumptionsLines = Z500_DEFAULT_ASSUMPTIONS;
    }

    let assumptionText = '';
    if (proj.construction_eurocode) {
      assumptionText += 'Konstrukcja zgodna z normami Eurokod.\n';
    }
    if (assumptionsLines.length) {
      assumptionText += 'Projekt konstrukcji wykonany zosta\u0142 przy za\u0142o\u017Ceniach:\n';
      assumptionText += assumptionsLines.map(l => '\u2022 ' + l).join('\n');
    }
    if (assumptionText.trim()) {
      items2.push({ label: 'Za\u0142o\u017Cenia projektowe konstrukcji', value: assumptionText.trim() });
    }
  }
  if (items2.length) specs.push({ title: 'Technologia i konstrukcja', items: items2 });

  // --- Tab 3: Instalacje ---
  const items3 = [];
  const instGroups = decodeInstallations(proj.installations, proj.data?.installations_hs, proj.data?.installations_hw);

  if (instGroups.heating.length) {
    items3.push({ label: 'Instalacja grzewcza', value: instGroups.heating.join(', ') });
  }
  if (instGroups.cwu.length) {
    items3.push({ label: 'Instalacja CWU', value: instGroups.cwu.join(', ') });
  }
  if (instGroups.complementary.length) {
    items3.push({ label: 'Instalacje uzupe\u0142niaj\u0105ce', value: instGroups.complementary.join(', ') });
  }
  // Ventilation
  const ventCode = proj.data?.designed_ventilation;
  if (ventCode !== undefined && ventCode !== null && VENTILATION_MAP[ventCode]) {
    items3.push({ label: 'Rodzaj wentylacji', value: VENTILATION_MAP[ventCode] });
  }
  // Energy
  if (proj.data?.ep) {
    items3.push({ label: 'Energia pierwotna (Ep)', value: `${proj.data.ep} kWh/(m\u00B2\u00B7rok)` });
  }
  if (proj.data?.ek) {
    items3.push({ label: 'Energia ko\u0144cowa (Ek)', value: `${proj.data.ek} kWh/(m\u00B2\u00B7rok)` });
  }
  if (items3.length) specs.push({ title: 'Instalacje', items: items3 });

  // --- Tab 4: Koszty ---
  const items4 = [];
  if (proj.price) items4.push({ label: 'Cena projektu', value: `${formatPLN(proj.price)} z\u0142` });
  if (proj.cost_estimate_total) {
    items4.push({ label: 'Szacunkowy koszt budowy', value: `${formatPLN(proj.cost_estimate_total)} z\u0142` });
    if (proj.usable_area && proj.usable_area > 0) {
      const costPerSqm = Math.round(proj.cost_estimate_total / proj.usable_area);
      items4.push({ label: 'Koszt budowy za m\u00B2', value: `~${formatPLN(costPerSqm)} z\u0142/m\u00B2` });
    }
  }
  if (items4.length) specs.push({ title: 'Koszty', items: items4 });

  // --- Tab 5: Opis funkcjonalny ---
  const descriptionText = stripHtml(proj.short_description || '');
  if (descriptionText) {
    specs.push({
      title: 'Opis funkcjonalny',
      items: [{ label: 'Opis', value: descriptionText }],
    });
  }

  return specs;
}

// =====================================================================
// MAIN
// =====================================================================

async function main() {
  console.log('=== IMPORT PROJEKT\u00D3W z Z500.pl v2 ===\n');

  // Read URLs
  if (!fs.existsSync(URLS_FILE)) {
    console.error(`Brak pliku: ${URLS_FILE}`);
    console.error('Utw\u00F3rz plik z URL-ami (jeden na lini\u0119).');
    process.exit(1);
  }

  const urls = fs.readFileSync(URLS_FILE, 'utf8')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.startsWith('http'));

  if (urls.length === 0) {
    console.error('Brak URL-i w pliku z500-urls.txt');
    console.error('Dodaj linki do projekt\u00F3w Z500 (jeden na lini\u0119).');
    process.exit(1);
  }

  const selected = urls.slice(0, LIMIT);
  console.log(`Znaleziono: ${urls.length} URL-i`);
  console.log(`Przetwarzam: ${selected.length}`);
  if (DRY_RUN) console.log('\u26A0 DRY RUN \u2014 bez pobierania obraz\u00F3w');
  if (SKIP_DOWNLOAD) console.log('\u26A0 SKIP DOWNLOAD \u2014 tylko generowanie TS');
  console.log('');

  const results = [];
  const errors = [];
  const usedSlugs = new Set();

  for (let i = 0; i < selected.length; i++) {
    const url = selected[i];
    const num = i + 1;

    console.log(`\n${'─'.repeat(60)}`);
    console.log(`${num}/${selected.length} ${url}`);

    // --- Fetch page ---
    let html;
    try {
      html = await fetchUrl(url);
      console.log(`  \u2713 Strona pobrana (${(html.length / 1024).toFixed(0)} KB)`);
    } catch (err) {
      console.error(`  \u2717 Nie uda\u0142o si\u0119 pobra\u0107 strony: ${err.message}`);
      errors.push({ url, error: err.message });
      continue;
    }

    // --- Extract PageData ---
    const pageData = extractPageData(html);
    if (!pageData.project) {
      console.error('  \u2717 Nie znaleziono PageData.project');
      errors.push({ url, error: 'No PageData.project' });
      continue;
    }

    const proj = pageData.project;
    const symbol = proj.symbol || proj.code || 'UNKNOWN';
    const title = proj.title || proj.name || '';
    const z500Id = proj.id || '';
    const price = proj.price || 0;
    const usableArea = proj.usable_area || proj.net_area || 0;
    const garageArea = proj.garage_area && proj.garage_area > 0 ? proj.garage_area : 0;
    const costEstimate = proj.cost_estimate_total || 0;

    // Classify images from PageData
    const images = classifyImages(proj.images || []);
    const projections = proj.projections || []; // storey info [{storey, name, usable_area}]

    console.log(`  Symbol: ${symbol} | ID: ${z500Id}`);
    console.log(`  Tytu\u0142: ${title.substring(0, 80)}${title.length > 80 ? '...' : ''}`);
    console.log(`  Cena: ${price} PLN | Pow: ${usableArea} m\u00B2 | Koszt budowy: ${costEstimate} PLN`);
    console.log(`  Obrazy: ${images.views.length} viz, ${images.projections.length} rzut\u00F3w, ${images.placements.length} dzia\u0142ek`);
    console.log(`  Pokoje: ${(proj.rooms || []).length} | Kondygnacje: ${projections.length}`);

    // --- Slug ---
    let slug = slugify(symbol);
    if (!slug || slug === 'unknown') slug = slugify(title).substring(0, 50);
    if (usedSlugs.has(slug)) slug = slug + '-' + z500Id;
    usedSlugs.add(slug);

    // --- Category ---
    const category = determineCategory(title);

    // --- Image directory ---
    const imgDir = path.join(IMAGES_BASE, slug);
    let galleryImageCount = 0;
    let hasSitePlan = false;

    // --- Floor plans tracking (keyed by storey) ---
    const floorPlanFiles = {}; // { 1: 'plan-parter.webp', 2: 'plan-poddasze.webp', ... }

    if (!DRY_RUN && !SKIP_DOWNLOAD) {
      fs.mkdirSync(imgDir, { recursive: true });

      // ═══════════════════════════════════════
      // 1) MAIN + THUMBNAIL (first non-mirrored project_view)
      // ═══════════════════════════════════════
      if (images.views.length > 0) {
        const parsed = parseImagePath(images.views[0]);
        if (parsed) {
          const highResUrl = makeHighResUrl(parsed);
          const ok1 = await downloadAndConvert(highResUrl, path.join(imgDir, 'main.webp'), FFMPEG.main, 'main');
          if (ok1) {
            const thumbUrl = makeHighResUrl(parsed, 600);
            await downloadAndConvert(thumbUrl, path.join(imgDir, 'thumbnail.webp'), FFMPEG.thumb, 'thumbnail');
            galleryImageCount = 1;
            console.log('  \u2713 main.webp + thumbnail.webp');
          } else {
            errors.push({ url, file: 'main' });
          }
        }
      }

      // ═══════════════════════════════════════
      // 2) GALLERY (remaining non-mirrored project_view images)
      // ═══════════════════════════════════════
      for (let v = 1; v < images.views.length; v++) {
        const parsed = parseImagePath(images.views[v]);
        if (!parsed) continue;
        const fname = `gallery-${v}.webp`;
        const highResUrl = makeHighResUrl(parsed);
        const ok = await downloadAndConvert(highResUrl, path.join(imgDir, fname), FFMPEG.gallery, fname);
        if (ok) {
          galleryImageCount++;
          console.log(`  \u2713 ${fname}`);
        } else {
          errors.push({ url, file: fname });
        }
      }

      // ═══════════════════════════════════════
      // 3) FLOOR PLANS — SVG content OR raster PNG from CDN
      // ═══════════════════════════════════════
      // Deduplicate projections (Z500 sometimes duplicates them)
      const seenProjectionPaths = new Set();
      const uniqueProjections = images.projections.filter(img => {
        if (seenProjectionPaths.has(img.path)) return false;
        seenProjectionPaths.add(img.path);
        return true;
      });

      for (let p = 0; p < uniqueProjections.length; p++) {
        const projection = uniqueProjections[p];
        const storey = parseInt(projection.option_1) || (p + 1);

        // Determine file name based on storey
        let fname;
        if (storey === 1 || uniqueProjections.length === 1) {
          fname = 'plan-parter.webp';
        } else if (storey === 2) {
          const projInfo = projections.find(pr => pr.storey === storey);
          const name = projInfo?.name?.toLowerCase() || '';
          if (name.includes('poddasz')) fname = 'plan-poddasze.webp';
          else if (name.includes('pi\u0119tr') || name.includes('pietr')) fname = 'plan-pietro.webp';
          else fname = 'plan-poddasze.webp';
        } else {
          fname = `plan-kondygnacja-${storey}.webp`;
        }

        let ok = false;
        if (projection.content) {
          // New format: inline SVG content → ImageMagick
          ok = convertSvgToWebp(projection.content, path.join(imgDir, fname), `rzut ${fname}`);
          if (ok) console.log(`  \u2713 ${fname} (SVG rzut, kondygnacja ${storey})`);
        } else {
          // Older format: raster PNG on CDN → download + ffmpeg
          const parsed = parseImagePath(projection);
          if (parsed) {
            const cdnUrl = makeHighResUrl(parsed, 1600);
            ok = await downloadAndConvert(cdnUrl, path.join(imgDir, fname), FFMPEG_PLAN, `rzut ${fname}`);
            if (ok) console.log(`  \u2713 ${fname} (CDN rzut, kondygnacja ${storey})`);
          }
        }

        if (ok) {
          floorPlanFiles[storey] = fname;
        } else {
          errors.push({ url, file: fname });
        }
      }

      // ═══════════════════════════════════════
      // 4) SITE/PLOT PLAN — SVG content OR raster PNG from CDN
      // ═══════════════════════════════════════
      if (images.placements.length > 0) {
        const placement = images.placements[0];
        let ok = false;

        if (placement.content) {
          // New format: inline SVG
          ok = convertSvgToWebp(placement.content, path.join(imgDir, 'sytuacja.webp'), 'dzia\u0142ka');
          if (ok) console.log('  \u2713 sytuacja.webp (SVG dzia\u0142ka)');
        } else {
          // Older format: raster PNG on CDN
          const parsed = parseImagePath(placement);
          if (parsed) {
            const cdnUrl = makeHighResUrl(parsed, 1600);
            ok = await downloadAndConvert(cdnUrl, path.join(imgDir, 'sytuacja.webp'), FFMPEG_PLAN, 'dzia\u0142ka');
            if (ok) console.log('  \u2713 sytuacja.webp (CDN dzia\u0142ka)');
          }
        }

        if (ok) hasSitePlan = true;
      }

    } else {
      // --- Dry run / skip download ---
      galleryImageCount = images.views.length;
      hasSitePlan = images.placements.length > 0;

      // Count unique projections for floor plan tracking
      const seenPaths = new Set();
      let projIdx = 0;
      images.projections.forEach((img) => {
        if (seenPaths.has(img.path)) return;
        seenPaths.add(img.path);
        const storey = parseInt(img.option_1) || (++projIdx);

        let fname;
        if (storey === 1) fname = 'plan-parter.webp';
        else if (storey === 2) {
          const projInfo = projections.find(pr => pr.storey === storey);
          const name = projInfo?.name?.toLowerCase() || '';
          if (name.includes('poddasz')) fname = 'plan-poddasze.webp';
          else fname = 'plan-poddasze.webp';
        } else {
          fname = `plan-kondygnacja-${storey}.webp`;
        }
        floorPlanFiles[storey] = fname;
      });
    }

    // ═══════════════════════════════════════
    // BUILD FLOOR PLANS DATA (with rooms from PageData.project.rooms)
    // ═══════════════════════════════════════
    const floorPlans = [];

    // Group by storey
    const storeys = Object.keys(floorPlanFiles).map(Number).sort();
    for (const storey of storeys) {
      const rooms = buildRooms(proj.rooms, storey);
      const totalArea = rooms.reduce((sum, r) => sum + parseFloat(r.area), 0).toFixed(1);

      // Determine floor name
      const projInfo = (proj.projections || []).find(pr => pr.storey === storey);
      let floorName = projInfo?.name || '';
      if (!floorName) {
        if (storey === 1) floorName = 'Parter';
        else if (storey === 2) floorName = 'Poddasze';
        else floorName = `Kondygnacja ${storey}`;
      }

      floorPlans.push({
        name: floorName,
        area: totalArea > 0 ? `${totalArea}m\u00B2` : `${usableArea}m\u00B2`,
        image: floorPlanFiles[storey],
        rooms,
      });
    }

    // ═══════════════════════════════════════
    // BUILD SPECIFICATIONS
    // ═══════════════════════════════════════
    const specifications = buildSpecifications(proj);

    // ═══════════════════════════════════════
    // BUILD PROJECT OBJECT
    // ═══════════════════════════════════════
    const alt = `Wizualizacja projektu ${symbol}`;

    let formattedTitle = title;
    if (!formattedTitle.toLowerCase().startsWith('dom ')) {
      formattedTitle = formattedTitle.charAt(0).toUpperCase() + formattedTitle.slice(1);
    }

    const formattedEstimatedCost = costEstimate > 0
      ? `${Math.round(costEstimate / 1000)} tys. z\u0142`
      : undefined;

    // ═══════════════════════════════════════
    // DESCRIPTION (Opis funkcjonalny)
    // ═══════════════════════════════════════
    const description = stripHtml(proj.short_description || '');

    const project = {
      slug,
      id: symbol,
      title: formattedTitle,
      alt,
      price: price ? `${formatPLN(price)} z\u0142` : '',
      availability: '3 dni robocze',
      surfaceArea: garageArea > 0 ? `${usableArea} + ${garageArea}m\u00B2` : `${usableArea}m\u00B2`,
      estimatedBuildCost: formattedEstimatedCost,
      technology: mapTechnology(proj.technology),
      category,
      dateAdded: Date.now(),
      galleryImageCount,
      hasSitePlan,
      source: 'z500',
      sourceUrl: url,
      floorPlans,
      specifications,
      description,
      lotWidth: proj.lot_width ? `${proj.lot_width} m` : undefined,
      lotLength: proj.lot_length ? `${proj.lot_length} m` : undefined,
      elevationWidth: proj.elevation_width ? `${proj.elevation_width} m` : undefined,
    };

    results.push(project);
    const specNames = specifications.map(s => s.title).join(', ');
    console.log(`  \u2713 Gotowe (${galleryImageCount} viz, ${Object.keys(floorPlanFiles).length} rzut\u00F3w, ${hasSitePlan ? 'dzia\u0142ka' : 'brak dzia\u0142ki'}, ${(proj.rooms || []).length} pokoi)`);
    console.log(`    Specs: ${specNames}`);
    if (description) console.log(`    Opis: ${description.substring(0, 80)}...`);

    // Polite delay before next fetch
    if (i < selected.length - 1) {
      await sleep(FETCH_DELAY);
    }
  }

  // =====================================================================
  // GENERATE TYPESCRIPT
  // =====================================================================
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`Generowanie TypeScript (${results.length} projekt\u00F3w)...`);

  const esc = (s) => {
    if (s == null) return '';
    return String(s)
      .replace(/\\/g, '\\\\')
      .replace(/'/g, "\\'")
      .replace(/\r\n/g, '\\n')
      .replace(/\r/g, '\\n')
      .replace(/\n/g, '\\n')
      .replace(/\t/g, '\\t');
  };

  let ts = `// Auto-generated from Z500.pl project pages
// Generated: ${new Date().toISOString().split('T')[0]}
// Projects: ${results.length}

import type { Project } from './types';

export const z500Projects: Project[] = [\n`;

  for (const p of results) {
    ts += `  {\n`;
    ts += `    slug: '${esc(p.slug)}',\n`;
    ts += `    source: 'z500',\n`;
    ts += `    id: '${esc(p.id)}',\n`;
    ts += `    title: '${esc(p.title)}',\n`;
    ts += `    alt: '${esc(p.alt)}',\n`;
    ts += `    price: '${esc(p.price)}',\n`;
    ts += `    availability: '${p.availability}',\n`;
    ts += `    surfaceArea: '${esc(p.surfaceArea)}',\n`;
    if (p.estimatedBuildCost) ts += `    estimatedBuildCost: '${esc(p.estimatedBuildCost)}',\n`;
    ts += `    technology: '${p.technology}',\n`;
    ts += `    category: '${p.category}',\n`;
    ts += `    dateAdded: ${p.dateAdded},\n`;
    ts += `    galleryImageCount: ${p.galleryImageCount},\n`;
    if (p.hasSitePlan) ts += `    hasSitePlan: true,\n`;
    ts += `    sourceUrl: '${esc(p.sourceUrl)}',\n`;
    if (p.description) {
      ts += `    description: '${esc(p.description)}',\n`;
    }
    if (p.lotWidth) ts += `    lotWidth: '${esc(p.lotWidth)}',\n`;
    if (p.lotLength) ts += `    lotLength: '${esc(p.lotLength)}',\n`;
    if (p.elevationWidth) ts += `    elevationWidth: '${esc(p.elevationWidth)}',\n`;

    // Floor plans
    ts += `    floorPlans: [\n`;
    for (const fp of p.floorPlans) {
      ts += `      { name: '${esc(fp.name)}', area: '${esc(fp.area)}', image: '${fp.image}', rooms: [\n`;
      for (const r of fp.rooms) {
        ts += `        { name: '${esc(r.name)}', area: '${esc(r.area)}' },\n`;
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
  console.log(`\u2713 Zapisano: ${OUTPUT_TS}`);

  // Summary
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`PODSUMOWANIE:`);
  console.log(`  Przetworzono: ${results.length}/${selected.length}`);
  console.log(`  B\u0142\u0119dy: ${errors.length}`);
  if (errors.length > 0) {
    console.log('  Szczeg\u00F3\u0142y b\u0142\u0119d\u00F3w:');
    errors.forEach(e => console.log(`    [${e.url || e.file}] ${e.error || ''}`));
    fs.writeFileSync(
      path.join(__dirname, 'import-z500-errors.json'),
      JSON.stringify(errors, null, 2)
    );
  }
}

main().catch(err => { console.error('FATAL:', err); process.exit(1); });
