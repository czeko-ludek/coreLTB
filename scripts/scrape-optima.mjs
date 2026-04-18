#!/usr/bin/env node
/**
 * SCRAPE OPTIMA NIERUCHOMOSCI — pipeline for optima-nieruchomosci.com.pl
 *
 * Source: WordPress + flavor Estate plugin
 * Selectors:
 *   - Title: h1.property-title
 *   - Price: span.es-price
 *   - Params: li.es-entity-field--{key} .es-property-field__value
 *   - Description: .es-entity-field--post_content .es-property-field__value
 *   - Images: a.es-slider__item[href] (full-size gallery)
 *
 * Pipeline:
 *   1. Fetch each URL
 *   2. Extract structured data (price, area, params, description, images)
 *   3. Map to Plot interface
 *   4. Geocode via Nominatim
 *   5. Generate AI description (4-section HTML)
 *   6. Append to data/plots/real-data.ts
 *
 * Usage:
 *   node scripts/scrape-optima.mjs                    # full pipeline
 *   node scripts/scrape-optima.mjs --dry-run           # show extracted data only
 *   node scripts/scrape-optima.mjs --skip-ai           # skip AI description rewrite
 *   node scripts/scrape-optima.mjs --url=URL           # single URL
 *
 * Output: scripts/optima-scraped.json + appends to data/plots/real-data.ts
 */

import 'dotenv/config';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCRAPE_DELAY = 1500;
const GEOCODE_DELAY = 1100;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ── CLI flags ──
const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const skipAI = args.includes('--skip-ai');
const singleUrl = args.find((a) => a.startsWith('--url='))?.split('=').slice(1).join('=');

// ── URLs to scrape ──
const URLS = [
  'https://optima-nieruchomosci.com.pl/property/dzialka-rybnik/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-wodzislaw-slaski-2/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-budowlana-rybnik/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-wodzislaw-slaski-5/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-uslugowa-turza-slaska/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-wodzislaw-slaski-7/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-wodzislaw-slaski-8/',
  'https://optima-nieruchomosci.com.pl/property/dzialka-pszow/',
];

// ═══════════════════════════════════════════════════════
// HTML HELPERS
// ═══════════════════════════════════════════════════════

function stripTags(html) {
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&oacute;/g, 'ó')
    .replace(/&eacute;/g, 'é')
    .replace(/&sup2;?/g, '²')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n))
    .replace(/\s+/g, ' ')
    .trim();
}

async function fetchHTML(url) {
  const cleanUrl = url.split('?')[0]; // strip query params
  console.log(`  GET ${cleanUrl}`);
  const res = await fetch(cleanUrl, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36',
      Accept: 'text/html,application/xhtml+xml',
      'Accept-Language': 'pl,en;q=0.5',
    },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${cleanUrl}`);
  return res.text();
}

// ═══════════════════════════════════════════════════════
// EXTRACTION — optima-nieruchomosci.com.pl
// ═══════════════════════════════════════════════════════

/** Extract slug from URL: /property/dzialka-rybnik/ -> dzialka-rybnik */
function extractSlug(url) {
  const m = url.match(/\/property\/([^/?]+)/);
  return m ? m[1].replace(/\/$/, '') : 'unknown';
}

/** Extract title from h1.property-title */
function extractTitle(html) {
  const m = html.match(/<h1[^>]*class="[^"]*property-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
  return m ? stripTags(m[1]).trim() : '';
}

/** Extract price from span.es-price */
function extractPrice(html) {
  const m = html.match(/<span[^>]*class="[^"]*es-price[^"]*"[^>]*>([\s\S]*?)<\/span>/i);
  if (!m) return 0;
  return parseInt(stripTags(m[1]).replace(/[^\d]/g, ''), 10) || 0;
}

/**
 * Extract entity field value by field key.
 * Matches: <li class="es-entity-field--{key} ..."><span class="es-property-field__value ...">VALUE</span></li>
 */
function extractField(html, fieldKey) {
  // Build regex for this specific field
  const pattern = new RegExp(
    `es-entity-field--${fieldKey}[\\s\\S]*?es-property-field__value[^>]*>([\\s\\S]*?)</span>`,
    'i'
  );
  const m = html.match(pattern);
  if (!m) return '';
  return stripTags(m[1]).trim();
}

/** Extract area from pow-dzialki field — value is inside <b> tag */
function extractArea(html) {
  const pattern =
    /es-entity-field--pow-dzialki[\s\S]*?es-property-field__value[^>]*>[\s\S]*?<b>(\d+)<\/b>/i;
  const m = html.match(pattern);
  if (m) return parseInt(m[1], 10);

  // Fallback: strip tags from the field
  const raw = extractField(html, 'pow-dzialki');
  const num = parseInt(raw.replace(/[^\d]/g, ''), 10);
  return num || 0;
}

/** Extract description from post_content field */
function extractDescription(html) {
  const pattern =
    /es-entity-field--post_content[\s\S]*?es-property-field__value[^>]*>([\s\S]*?)<\/span>\s*(?:<a\s+href)/i;
  const m = html.match(pattern);
  if (!m) {
    // Fallback without the trailing <a>
    const pattern2 =
      /es-entity-field--post_content[\s\S]*?es-property-field__value[^>]*>([\s\S]*?)<\/span>/i;
    const m2 = html.match(pattern2);
    if (!m2) return '';
    return cleanDescription(m2[1]);
  }
  return cleanDescription(m[1]);
}

function cleanDescription(rawHTML) {
  let desc = rawHTML
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&oacute;/g, 'ó')
    .replace(/&sup2;?/g, '²')
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(n));

  // Cut boilerplate
  const cutMarkers = [
    'Zapraszam do bliższego',
    'Zapraszam na prezentację',
    'Zapraszamy na prezentację',
    'Zapraszam do kontaktu',
    'Zapraszamy do kontaktu',
    'Oferta na wyłączność',
    'OPTIMA Nieruchomości',
    'Adam Adamik',
    'tel. ',
    'Tel:',
    'Tel.',
    'Treść niniejszego',
    'Powyższe ogłoszenie',
    'Nota prawna',
  ];
  for (const marker of cutMarkers) {
    const idx = desc.indexOf(marker);
    if (idx > 20) desc = desc.substring(0, idx);
  }

  desc = desc
    .split('\n')
    .map((l) => l.replace(/\s+/g, ' ').trim())
    .filter(Boolean)
    .join(' ');

  return desc.trim();
}

/** Extract gallery images from slider links (full-size) */
function extractImages(html) {
  const images = [];
  const regex = /<a[^>]*href="(https:\/\/optima-nieruchomosci\.com\.pl\/wp-content\/uploads\/[^"]+)"[^>]*class="[^"]*es-slider__item[^"]*"/gi;
  let m;
  while ((m = regex.exec(html)) !== null) {
    if (!images.includes(m[1])) images.push(m[1]);
  }

  // Fallback: try mobile gallery images (full size from href)
  if (images.length === 0) {
    const imgRegex =
      /https:\/\/optima-nieruchomosci\.com\.pl\/wp-content\/uploads\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp)/gi;
    let im;
    while ((im = imgRegex.exec(html)) !== null) {
      const url = im[0];
      // Skip thumbnails (-300x, -150x)
      if (!/-\d+x\d+\./.test(url) && !images.includes(url)) {
        images.push(url);
      }
    }
  }

  return images;
}

/** Extract city from title like "Działka Rybnik" or "Działka budowlana Rybnik" */
function extractCity(title) {
  // Remove "Działka" prefix and type words
  let city = title
    .replace(/^Działka\s*/i, '')
    .replace(/^budowlana\s*/i, '')
    .replace(/^usługowa\s*/i, '')
    .replace(/^rolna\s*/i, '')
    .replace(/^inwestycyjna\s*/i, '')
    .trim();

  // Remove trailing noise: "– wynajem lub sprzedaż", "(Budowlana)" etc.
  city = city.replace(/\s*[\-–].*$/, '');         // "Turza Śląska – wynajem..." -> "Turza Śląska"
  city = city.replace(/^\(.*?\)\s*/, '');          // "(Budowlana) Rybnik" -> "Rybnik"

  // Fix known city names
  const cityFixes = {
    'Wodzislaw Slaski': 'Wodzisław Śląski',
    'Turza Slaska': 'Turza Śląska',
    'Pszow': 'Pszów',
  };
  for (const [ascii, pl] of Object.entries(cityFixes)) {
    if (city.toLowerCase() === ascii.toLowerCase()) return pl;
  }
  return city;
}

/** Extract district/street from description */
function extractDistrict(description) {
  const patterns = [
    /położon\w+\s+w\s+(\w+)\s*[\-–]\s*(\w+)/i, // "położonej w Rybniku - Popielowie"
    /położon\w+\s+w\s+(\w+)/i, // "położonej w Rybniku"
    /w\s+miejscowości\s+(\w+)/i,
    /w\s+dzielnicy\s+(\w+)/i,
  ];
  for (const p of patterns) {
    const m = description.match(p);
    if (m && m[2]) return m[2]; // district (after dash)
    // m[1] is usually the city — skip
  }
  return undefined;
}

/** Extract district specifically from "City - District" pattern */
function extractDistrictFromDesc(description) {
  // "w Rybniku - Popielowie" / "w Wodzisławiu Śląskim - Zawadzie"
  const m = description.match(
    /w\s+\w+(?:\s+\w+)?\s*[\-–]\s*([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)/i
  );
  return m ? m[1] : undefined;
}

/** Parse media string like "woda, prąd, gaz, kanalizacja, internet" */
function parseMedia(mediaStr) {
  const lower = mediaStr.toLowerCase();
  return {
    water: /wod[aę]|wodoci/i.test(lower),
    electricity: /pr[ąa]d|elektr|energi/i.test(lower),
    gas: /gaz(?!et)/i.test(lower),
    sewer: /kanalizacj/i.test(lower),
  };
}

/** Extract street from description */
function extractStreet(description) {
  const patterns = [
    /przy\s+ul(?:icy|\.)\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i,
    /ul(?:icy|\.)\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i,
    /ulica\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i,
  ];
  const skip = new Set([
    'Oferujemy', 'Mam', 'Prezentujemy', 'Na', 'W', 'Przez', 'Do', 'Jest',
    'Działki', 'Działka', 'Wszystkie', 'Bardzo', 'Nowa',
  ]);
  for (const p of patterns) {
    const m = description.match(p);
    if (m?.[1] && !skip.has(m[1]) && m[1].length > 2) return `ul. ${m[1]}`;
  }
  return undefined;
}

/** Extract MPZP info from description */
function extractMPZP(description) {
  const hasMPZP =
    /MPZP|plan\s+(?:miejscowy|zagospodarowania)|symbol\s+planu/i.test(description);
  let symbol = undefined;

  // "symbol planu 4/1 MN" or "symbolu 4/12 ZNU" or "C86MNU"
  const symbolPatterns = [
    /symbol(?:u|em)?\s+(?:planu\s+)?(\d+\/\d+\s*[A-Z]+)/i,
    /symbol(?:u|em)?\s+([A-Z]+\.?[A-Z]*\.?\d+[A-Z]*)/i,
    /(?:MPZP|plan\s+miejscowy)[^.]{0,50}?([A-Z]{1,3}\.?[A-Z]{0,3}\d+[A-Z]*)/i,
    /o\s+symbolu\s+([A-Z0-9/]+\s*[A-Z]*)/i,
  ];
  for (const p of symbolPatterns) {
    const m = description.match(p);
    if (m?.[1]) {
      symbol = m[1].trim();
      break;
    }
  }

  // If we found a symbol, MPZP is definitely 'tak'
  return { mpzp: (hasMPZP || symbol) ? 'tak' : 'nie_wiem', mpzpSymbol: symbol };
}

/** Determine terrain from description */
function extractTerrain(description) {
  if (/wznosi|pochył|nachyl|spad/i.test(description)) return 'lekko nachylona';
  if (/płask|równ/i.test(description)) return 'płaska';
  return 'płaska';
}

/** Determine plot shape from description or dimensions */
function extractShape(description, dimensions) {
  if (/prostokąt|regularnego prostokąta/i.test(description)) return 'prostokąt';
  if (/kwadrat/i.test(description)) return 'kwadrat';
  if (/trapez/i.test(description)) return 'trapez';
  if (/trójkąt/i.test(description)) return 'trójkąt';
  if (/nieregular/i.test(description)) return 'nieregularny';
  if (dimensions) return 'prostokąt'; // if dimensions given, likely regular
  return 'regularny';
}

/** Determine access from description or params */
function extractAccess(description, udogodnienia) {
  if (/asfalt/i.test(description + ' ' + udogodnienia)) return 'asfalt';
  if (/utwardz/i.test(description + ' ' + udogodnienia)) return 'droga utwardzona';
  if (/szutrow|żwir/i.test(description + ' ' + udogodnienia)) return 'droga szutrowa';
  if (/droga dojazdowa/i.test(udogodnienia)) return 'droga gminna';
  return 'droga gminna';
}

// ═══════════════════════════════════════════════════════
// SCRAPE A SINGLE PAGE
// ═══════════════════════════════════════════════════════

async function scrapePage(url) {
  const html = await fetchHTML(url);
  const slug = extractSlug(url);
  const rawTitle = extractTitle(html);
  const price = extractPrice(html);
  const area = extractArea(html);
  const pricePerM2 = area > 0 ? Math.round(price / area) : 0;
  const dimensions = extractField(html, 'wymiary') || undefined;
  const purpose = extractField(html, 'przeznaczenie-dzialki') || undefined;
  const udogodnienia = extractField(html, 'udogodnienia-na-dzialce') || '';
  const mediaStr = extractField(html, 'media') || '';
  const description = extractDescription(html);
  const images = extractImages(html);

  // Fallback: extract area from description if field was 0
  let finalArea = area;
  if (finalArea === 0 && description) {
    const areaMatch = description.match(/powierzchni[aąę]?\s+([\d\s]+)\s*m/i);
    if (areaMatch) {
      finalArea = parseInt(areaMatch[1].replace(/\s/g, ''), 10) || 0;
    }
  }
  const finalPricePerM2 = finalArea > 0 ? Math.round(price / finalArea) : pricePerM2;

  const city = extractCity(rawTitle);
  const district = extractDistrictFromDesc(description) || undefined;
  const street = extractStreet(description) || undefined;
  const media = parseMedia(mediaStr + ' ' + description);
  const { mpzp, mpzpSymbol } = extractMPZP(description);
  const terrain = extractTerrain(description);
  const plotShape = extractShape(description, dimensions);
  const access = extractAccess(description, udogodnienia);

  // Build title in our format
  const locationDisplay = district ? `${city}, ${district}` : city;
  const title = `Działka ${finalArea.toLocaleString('pl-PL')} m\u00B2 — ${locationDisplay}`;

  // Media details — from the combined media string
  const mediaDetails = {};
  if (media.water) mediaDetails.water = 'w granicy działki';
  if (media.electricity) mediaDetails.electricity = 'w granicy działki';
  if (media.gas) mediaDetails.gas = 'w granicy działki';
  if (media.sewer) mediaDetails.sewer = 'w granicy działki';

  return {
    slug: `optima-${slug}`,
    sourceUrl: url.split('?')[0],
    rawTitle,
    title,
    city,
    district,
    street,
    area: finalArea,
    price,
    pricePerM2: finalPricePerM2,
    dimensions,
    purpose,
    mpzp,
    mpzpSymbol,
    media,
    mediaDetails: Object.keys(mediaDetails).length > 0 ? mediaDetails : undefined,
    plotShape,
    terrain,
    access,
    description,
    images,
    imageCount: images.length,
    source: 'optima',
  };
}

// ═══════════════════════════════════════════════════════
// GEOCODING (same as build-plots.mjs)
// ═══════════════════════════════════════════════════════

const geocodeCache = {};

async function geocode(query) {
  if (geocodeCache[query]) return geocodeCache[query];
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1&countrycodes=pl`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'CoreLTB-PlotGeocoder/2.0 (biuro@coreltb.pl)',
      Accept: 'application/json',
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  if (data.length > 0) {
    const result = {
      lat: parseFloat(data[0].lat),
      lng: parseFloat(data[0].lon),
      display: data[0].display_name,
    };
    geocodeCache[query] = result;
    return result;
  }
  return null;
}

async function geocodePlot(city, district, street) {
  const queries = [];
  if (street && district) queries.push(`${street}, ${district}, ${city}, Polska`);
  if (street) queries.push(`${street}, ${city}, Polska`);
  if (district) queries.push(`${district}, ${city}, Polska`);
  queries.push(`${city}, śląskie, Polska`);

  for (const q of queries) {
    const result = await geocode(q);
    if (result) {
      console.log(`    Geocoded: "${q}" -> ${result.lat.toFixed(5)}, ${result.lng.toFixed(5)}`);
      return result;
    }
    await sleep(GEOCODE_DELAY);
  }
  console.log(`    Geocode FAILED for: ${[street, district, city].filter(Boolean).join(', ')}`);
  return null;
}

// ═══════════════════════════════════════════════════════
// AI DESCRIPTION (Gemini — same prompt as rewrite-descriptions.mjs)
// ═══════════════════════════════════════════════════════

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found. Add it to .env file in project root.');
  process.exit(1);
}
const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const GEMINI_URL = `https://aiplatform.googleapis.com/v1/publishers/google/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

function buildAIPrompt(plot) {
  const mediaList = [];
  if (plot.media.water) mediaList.push(`woda (${plot.mediaDetails?.water || 'dostępna'})`);
  if (plot.media.electricity) mediaList.push(`prąd (${plot.mediaDetails?.electricity || 'dostępny'})`);
  if (plot.media.gas) mediaList.push(`gaz (${plot.mediaDetails?.gas || 'dostępny'})`);
  if (plot.media.sewer) mediaList.push(`kanalizacja (${plot.mediaDetails?.sewer || 'dostępna'})`);
  const missingMedia = [];
  if (!plot.media.water) missingMedia.push('woda');
  if (!plot.media.electricity) missingMedia.push('prąd');
  if (!plot.media.gas) missingMedia.push('gaz');
  if (!plot.media.sewer) missingMedia.push('kanalizacja');

  return `Przeczytaj opis działki i dane strukturalne. Wyciągnij WSZYSTKIE fakty (ulice, odległości, szkoły, sklepy, widoki, projekt budowlany, pokoje, dokumenty). Zmapuj te fakty do dokładnie 4 sekcji HTML.

DANE STRUKTURALNE:
- Lokalizacja: ${plot.city}${plot.district ? `, ${plot.district}` : ''}${plot.street ? `, ${plot.street}` : ''}
- Powierzchnia: ${plot.area.toLocaleString('pl-PL')} m²
- Kształt: ${plot.plotShape}, teren: ${plot.terrain}
${plot.dimensions ? `- Wymiary: ${plot.dimensions}` : ''}
${plot.purpose ? `- Przeznaczenie: ${plot.purpose}` : ''}
- Dojazd: ${plot.access}
${plot.mpzp !== 'nie_wiem' ? `- MPZP: ${plot.mpzp}${plot.mpzpSymbol ? ` (${plot.mpzpSymbol})` : ''}` : '- MPZP: do weryfikacji'}
- Media dostępne: ${mediaList.length > 0 ? mediaList.join(', ') : 'brak informacji'}
${missingMedia.length > 0 ? `- Media brak: ${missingMedia.join(', ')}` : ''}

ORYGINALNY OPIS (wyciągnij z niego KAŻDY fakt — odległości, nazwy ulic, widoki, infrastrukturę):
${plot.description || 'Brak opisu w źródle.'}

WYMAGANE 4 SEKCJE — użyj DOKŁADNIE tych tytułów <h3>:

<h3>Lokalizacja i otoczenie</h3>
Opisz: gdzie leży działka (ulica, dzielnica, miasto). Co jest w okolicy — szkoły, sklepy, przystanek, las, zabudowa. Odległości w metrach/km jeśli znane. Typ okolicy (spokojna, miejska, podmiejska). Widoki jeśli są.

<h3>Charakterystyka działki</h3>
Opisz: kształt, wymiary, ukształtowanie terenu, przeznaczenie w MPZP, stan prawny, zagospodarowanie, ogrodzenie. Jeśli jest projekt budowlany — metraż domu, ile pokoi, jaki dach, ogrzewanie, rozkład pomieszczeń. Dokumenty w cenie (pozwolenie, projekt, warunki techniczne).

<h3>Media i uzbrojenie</h3>
Opisz: które media są dostępne (woda, prąd, gaz, kanalizacja) ze szczegółami (na działce / w ulicy / do podłączenia). Które media brakuje. Jeśli oryginał podaje szczegóły o przyłączach — uwzględnij.

<h3>Dojazd i komunikacja</h3>
Opisz: typ drogi dojazdowej (asfalt, szuter, gminna). Odległość do głównych dróg, autostrady, centrum miasta. Komunikacja publiczna jeśli wspomniana. MPZP status i co oznacza dla zabudowy.

TON — KRYTYCZNE:
- Pisz jak inżynier. Konkrety i fakty. Żadnego marketingu.
- DOBRZE: "Działka położona przy ul. Głównej, 500 m od szkoły podstawowej."
- ŹLE: "Oferujemy wyjątkową działkę w doskonałej lokalizacji."
- ŹLE: "Prezentowana nieruchomość stanowi idealną propozycję."
- ZAKAZANE słowa: oferujemy, prezentujemy, proponujemy, wyjątkowa, idealna, doskonała, perfekcyjna, wymarzony, zapraszamy
- Pisz w 3. osobie: "Działka ma...", "W odległości 200 m znajduje się..."
- NIE powtarzaj ceny ani powierzchni — to jest w nagłówku strony
- Pogrub (<strong>) kluczowe dane: wymiary, odległości, nazwy ulic, metraże
- Każda sekcja: minimum 2 zdania. Użyj <ul><li> dla wyliczeń (media, pokoje, dokumenty).
- Pisz po polsku z polskimi znakami (ą, ę, ó, ś, ź, ż, ć, ń, ł)
- NIGDY nie wymyślaj faktów których nie ma w danych

ZWRÓĆ TYLKO HTML — bez markdown, bez \`\`\`, bez komentarzy. Zaczynając od <h3>Lokalizacja i otoczenie</h3>.`;
}

async function callGemini(prompt) {
  const body = {
    systemInstruction: {
      parts: [
        {
          text: 'Jesteś generatorem HTML. Zwracasz WYŁĄCZNIE czysty HTML. Nie dodajesz komentarzy, wyjaśnień, markdown ani bloków kodu. Odpowiedź zaczyna się od <h3> i kończy na </p> lub </ul>.',
        },
      ],
    },
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 3000,
      responseMimeType: 'text/plain',
    },
  };

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Gemini API ${res.status}: ${err.substring(0, 200)}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from Gemini');

  let cleaned = text
    .trim()
    .replace(/^```html?\s*/i, '')
    .replace(/\s*```$/i, '')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .trim();
  return cleaned;
}

// ═══════════════════════════════════════════════════════
// TYPESCRIPT GENERATION
// ═══════════════════════════════════════════════════════

function plotToTS(p) {
  const l = [];
  l.push('  {');
  l.push(`    slug: "${p.slug}",`);
  l.push(`    title: "${p.title}",`);
  l.push(`    city: "${p.city}",`);
  if (p.district) l.push(`    district: "${p.district}",`);
  l.push(`    address: "${p.city}",`);
  if (p.street) l.push(`    street: "${p.street}",`);
  l.push(`    area: ${p.area},`);
  l.push(`    price: ${p.price},`);
  l.push(`    pricePerM2: ${p.pricePerM2},`);
  l.push(`    mpzp: "${p.mpzp}",`);
  if (p.mpzpSymbol) l.push(`    mpzpSymbol: "${p.mpzpSymbol}",`);
  l.push(
    `    media: { water: ${!!p.media.water}, electricity: ${!!p.media.electricity}, gas: ${!!p.media.gas}, sewer: ${!!p.media.sewer} },`
  );
  if (p.mediaDetails) {
    l.push(
      `    mediaDetails: { ${Object.entries(p.mediaDetails)
        .map(([k, v]) => `${k}: "${v}"`)
        .join(', ')} },`
    );
  }
  l.push(`    plotShape: "${p.plotShape}",`);
  l.push(`    terrain: "${p.terrain}",`);
  l.push(`    access: "${p.access}",`);
  if (p.dimensions) l.push(`    dimensions: "${p.dimensions}",`);
  if (p.purpose) l.push(`    purpose: "${p.purpose}",`);
  const desc = (p.aiDescription || p.description || '')
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '');
  l.push(`    description: "${desc}",`);
  l.push(`    thumbnailSrc: "/images/dzialki/${p.slug}/thumb.jpg",`);
  l.push(`    images: [${p.images.map((i) => `"${i}"`).join(', ')}],`);
  l.push(`    coordinates: { lat: ${p.coordinates?.lat || 0}, lng: ${p.coordinates?.lng || 0} },`);
  l.push(`    availability: "dostepna",`);
  l.push(`    dateAdded: ${Date.now()},`);
  l.push(`    sourceUrl: "${p.sourceUrl}",`);
  l.push(`    source: "optima",`);
  l.push('  }');
  return l.join('\n');
}

// ═══════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════

async function main() {
  let urls = singleUrl ? [singleUrl] : URLS;

  // Deduplicate URLs (strip query params for comparison)
  const seen = new Set();
  urls = urls.filter((u) => {
    const clean = u.split('?')[0].replace(/\/$/, '');
    if (seen.has(clean)) return false;
    seen.add(clean);
    return true;
  });

  console.log(`\n=== OPTIMA NIERUCHOMOSCI SCRAPER ===`);
  console.log(`URLs to process: ${urls.length}\n`);

  // ── Step 1: Scrape ──
  const scraped = [];
  for (let i = 0; i < urls.length; i++) {
    console.log(`[${i + 1}/${urls.length}] Scraping...`);
    try {
      const data = await scrapePage(urls[i]);
      scraped.push(data);
      console.log(
        `  OK | ${data.title} | ${data.price.toLocaleString('pl-PL')} zł | ${data.area} m² | imgs:${data.imageCount} | desc:${data.description.length}ch`
      );
    } catch (err) {
      console.error(`  FAIL: ${err.message}`);
    }
    if (i < urls.length - 1) await sleep(SCRAPE_DELAY);
  }

  // Save raw scrape
  const scrapedPath = resolve(__dirname, 'optima-scraped.json');
  writeFileSync(scrapedPath, JSON.stringify(scraped, null, 2), 'utf8');
  console.log(`\nSaved raw scrape: ${scrapedPath} (${scraped.length} plots)\n`);

  if (dryRun) {
    console.log('DRY RUN — showing extracted data:\n');
    for (const p of scraped) {
      console.log(`  ${p.slug}:`);
      console.log(`    Title: ${p.title}`);
      console.log(`    City: ${p.city}, District: ${p.district || '-'}, Street: ${p.street || '-'}`);
      console.log(`    Price: ${p.price.toLocaleString('pl-PL')} zł (${p.pricePerM2} zł/m²)`);
      console.log(`    Area: ${p.area} m², Dimensions: ${p.dimensions || '-'}`);
      console.log(`    Shape: ${p.plotShape}, Terrain: ${p.terrain}, Access: ${p.access}`);
      console.log(`    Purpose: ${p.purpose || '-'}, MPZP: ${p.mpzp} ${p.mpzpSymbol || ''}`);
      console.log(
        `    Media: W${p.media.water ? '+' : '-'} E${p.media.electricity ? '+' : '-'} G${p.media.gas ? '+' : '-'} S${p.media.sewer ? '+' : '-'}`
      );
      console.log(`    Images: ${p.imageCount}`);
      console.log(`    Desc (${p.description.length}ch): ${p.description.substring(0, 120)}...`);
      console.log();
    }
    return;
  }

  // ── Step 2: Geocode ──
  console.log('Geocoding...\n');
  for (const p of scraped) {
    console.log(`  ${p.slug}...`);
    const geo = await geocodePlot(p.city, p.district, p.street);
    p.coordinates = geo ? { lat: geo.lat, lng: geo.lng } : { lat: 0, lng: 0 };
  }

  // ── Step 3: AI Descriptions ──
  if (!skipAI) {
    console.log('\nGenerating AI descriptions...\n');
    for (let i = 0; i < scraped.length; i++) {
      const p = scraped[i];
      console.log(`  [${i + 1}/${scraped.length}] ${p.slug}...`);
      try {
        const prompt = buildAIPrompt(p);
        const html = await callGemini(prompt);
        if (html.includes('<h3>')) {
          p.aiDescription = html;
          console.log(`    OK (${html.length} ch HTML)`);
        } else {
          console.log(`    WARN: no <h3> tags in response, keeping raw description`);
        }
      } catch (err) {
        console.log(`    ERROR: ${err.message}`);
        if (err.message.includes('429')) {
          console.log('    Waiting 60s for rate limit...');
          await sleep(60000);
          i--; // retry
        }
      }
      if (i < scraped.length - 1) await sleep(2000);
    }
  }

  // ── Step 4: Append to real-data.ts ──
  const realDataPath = resolve(__dirname, '..', 'data', 'plots', 'real-data.ts');
  let realDataContent = readFileSync(realDataPath, 'utf8');

  // Check which slugs already exist
  const newPlots = scraped.filter((p) => !realDataContent.includes(`slug: "${p.slug}"`));
  const skipped = scraped.length - newPlots.length;

  if (skipped > 0) {
    console.log(`\nSkipping ${skipped} plots (already in real-data.ts)`);
  }

  if (newPlots.length > 0) {
    // Update header comment with new total
    const oldTotal = realDataContent.match(/Total: (\d+) plots/);
    const currentTotal = oldTotal ? parseInt(oldTotal[1], 10) : 0;
    const newTotal = currentTotal + newPlots.length;
    realDataContent = realDataContent.replace(
      /Total: \d+ plots/,
      `Total: ${newTotal} plots`
    );

    // Insert before the closing ];
    const closingBracket = realDataContent.lastIndexOf('];');
    const newEntries = newPlots.map(plotToTS).join(',\n');
    realDataContent =
      realDataContent.substring(0, closingBracket) +
      ',\n' +
      newEntries +
      '\n' +
      realDataContent.substring(closingBracket);

    writeFileSync(realDataPath, realDataContent, 'utf8');
    console.log(`\nAppended ${newPlots.length} plots to ${realDataPath}`);
    console.log(`New total: ${newTotal} plots`);
  } else {
    console.log('\nNo new plots to add.');
  }

  // ── Stats ──
  console.log('\n=== SUMMARY ===');
  console.log(`  Scraped: ${scraped.length}`);
  console.log(`  New: ${newPlots.length}`);
  console.log(`  Skipped (existing): ${skipped}`);
  console.log(`  With AI desc: ${scraped.filter((p) => p.aiDescription).length}`);
  console.log(`  With coords: ${scraped.filter((p) => p.coordinates?.lat !== 0).length}`);
  console.log(
    `  Avg images: ${Math.round(scraped.reduce((s, p) => s + p.imageCount, 0) / scraped.length)}`
  );
}

main().catch(console.error);
