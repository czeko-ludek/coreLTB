#!/usr/bin/env node
/**
 * Rewrite plot descriptions using Gemini API.
 * Reads raw descriptions from real-data.ts, sends each to Gemini with
 * structured data context, gets back rich HTML, writes updated file.
 *
 * Usage:
 *   node scripts/rewrite-descriptions.mjs
 *   node scripts/rewrite-descriptions.mjs --slug=gorzyce-1131690
 *   node scripts/rewrite-descriptions.mjs --dry-run
 */

import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REAL_DATA_PATH = resolve(__dirname, '..', 'data', 'plots', 'real-data.ts');
import 'dotenv/config';

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY not found. Add it to .env file in project root.');
  process.exit(1);
}
const GEMINI_MODEL = 'gemini-2.5-flash-lite';
const GEMINI_URL = `https://aiplatform.googleapis.com/v1/publishers/google/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const dryRun = process.argv.includes('--dry-run');
const singleSlug = process.argv.find(a => a.startsWith('--slug='))?.split('=')[1];
const slugPrefix = process.argv.find(a => a.startsWith('--prefix='))?.split('=')[1];
const sleep = (ms) => new Promise(r => setTimeout(r, ms));

// ── Parse plots from real-data.ts ──
function parsePlots(content) {
  const plots = [];
  const regex = /\{\s*\n\s+slug:\s*"([^"]+)"([\s\S]*?)(?=\n  \},|\n\];)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    const slug = m[1];
    const block = m[0];

    const getString = (key) => {
      const match = block.match(new RegExp(`${key}:\\s*"([^"]*)"`));
      return match ? match[1] : '';
    };
    const getNum = (key) => {
      const match = block.match(new RegExp(`${key}:\\s*([0-9.-]+)`));
      return match ? parseFloat(match[1]) : 0;
    };

    const mediaMatch = block.match(/media:\s*\{([^}]+)\}/);
    const mediaStr = mediaMatch ? mediaMatch[1] : '';
    const media = {
      water: mediaStr.includes('water: true'),
      electricity: mediaStr.includes('electricity: true'),
      gas: mediaStr.includes('gas: true'),
      sewer: mediaStr.includes('sewer: true'),
    };

    const mdMatch = block.match(/mediaDetails:\s*\{([^}]+)\}/);
    const mediaDetails = {};
    if (mdMatch) {
      const pairs = mdMatch[1].matchAll(/(\w+):\s*"([^"]*)"/g);
      for (const p of pairs) mediaDetails[p[1]] = p[2];
    }

    plots.push({
      slug,
      title: getString('title'),
      city: getString('city'),
      district: getString('district'),
      street: getString('street'),
      area: getNum('area'),
      price: getNum('price'),
      pricePerM2: getNum('pricePerM2'),
      mpzp: getString('mpzp'),
      mpzpSymbol: getString('mpzpSymbol'),
      media,
      mediaDetails,
      plotShape: getString('plotShape'),
      terrain: getString('terrain'),
      access: getString('access'),
      dimensions: getString('dimensions'),
      legalStatus: getString('legalStatus'),
      purpose: getString('purpose'),
      development: getString('development'),
      fencing: getString('fencing'),
      surroundings: getString('surroundings'),
      locationType: getString('locationType'),
      description: getString('description'),
    });
  }
  return plots;
}

// ── Build the prompt ──
function buildPrompt(plot) {
  const mediaList = [];
  if (plot.media.water) mediaList.push(`woda (${plot.mediaDetails.water || 'dostepna'})`);
  if (plot.media.electricity) mediaList.push(`prad (${plot.mediaDetails.electricity || 'dostepny'})`);
  if (plot.media.gas) mediaList.push(`gaz (${plot.mediaDetails.gas || 'dostepny'})`);
  if (plot.media.sewer) mediaList.push(`kanalizacja (${plot.mediaDetails.sewer || 'dostepna'})`);
  const missingMedia = [];
  if (!plot.media.water) missingMedia.push('woda');
  if (!plot.media.electricity) missingMedia.push('prad');
  if (!plot.media.gas) missingMedia.push('gaz');
  if (!plot.media.sewer) missingMedia.push('kanalizacja');

  return `Przeczytaj opis działki i dane strukturalne. Wyciągnij WSZYSTKIE fakty (ulice, odległości, szkoły, sklepy, widoki, projekt budowlany, pokoje, dokumenty). Zmapuj te fakty do dokładnie 4 sekcji HTML.

DANE STRUKTURALNE:
- Lokalizacja: ${plot.city}${plot.district ? `, ${plot.district}` : ''}${plot.street ? `, ul. ${plot.street}` : ''}
- Powierzchnia: ${plot.area.toLocaleString('pl-PL')} m²
- Kształt: ${plot.plotShape}, teren: ${plot.terrain}
${plot.dimensions ? `- Wymiary: ${plot.dimensions}` : ''}
${plot.legalStatus ? `- Stan prawny: ${plot.legalStatus}` : ''}
${plot.purpose ? `- Przeznaczenie: ${plot.purpose}` : ''}
${plot.development ? `- Zagospodarowanie: ${plot.development}` : ''}
${plot.fencing ? `- Ogrodzenie: ${plot.fencing}` : ''}
${plot.surroundings ? `- Otoczenie: ${plot.surroundings}` : ''}
${plot.locationType ? `- Położenie: ${plot.locationType}` : ''}
- Dojazd: ${plot.access}
${plot.mpzp !== 'nie_wiem' ? `- MPZP: ${plot.mpzp}${plot.mpzpSymbol ? ` (${plot.mpzpSymbol})` : ''}` : '- MPZP: do weryfikacji'}
- Media dostępne: ${mediaList.length > 0 ? mediaList.join(', ') : 'brak'}
${missingMedia.length > 0 ? `- Media brak: ${missingMedia.join(', ')}` : ''}

ORYGINALNY OPIS (wyciągnij z niego KAŻDY fakt — odległości, nazwy ulic, widoki, projekt, pokoje, infrastrukturę):
${plot.description}

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
- ŹLE: "Ta parcela łączy walory widokowe z gotowością inwestycyjną."
- ZAKAZANE słowa: oferujemy, prezentujemy, proponujemy, wyjątkowa, idealna, doskonała, perfekcyjna, wymarzony, zapraszamy
- Pisz w 3. osobie: "Działka ma...", "W odległości 200 m znajduje się..."
- NIE powtarzaj ceny ani powierzchni — to jest w nagłówku strony
- Pogrub (<strong>) kluczowe dane: wymiary, odległości, nazwy ulic, metraże
- Każda sekcja: minimum 2 zdania. Użyj <ul><li> dla wyliczeń (media, pokoje, dokumenty).
- Pisz po polsku z polskimi znakami (ą, ę, ó, ś, ź, ż, ć, ń, ł)

ZWRÓĆ TYLKO HTML — bez markdown, bez \`\`\`, bez komentarzy. Zaczynając od <h3>Lokalizacja i otoczenie</h3>.`;
}

// ── Call Gemini API ──
async function callGemini(prompt) {
  const body = {
    systemInstruction: {
      parts: [{ text: 'Jesteś generatorem HTML. Zwracasz WYŁĄCZNIE czysty HTML. Nie dodajesz komentarzy, wyjaśnień, markdown ani bloków kodu. Odpowiedź zaczyna się od <h3> i kończy na </p> lub </ul>.' }],
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

  // Clean markdown artifacts
  let cleaned = text.trim()
    .replace(/^```html?\s*/i, '').replace(/\s*```$/i, '') // fences
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>') // **bold** -> <strong>
    .replace(/\*([^*]+)\*/g, '<em>$1</em>') // *italic* -> <em>
    .trim();
  return cleaned;
}

// ── Main ──
async function main() {
  let content = readFileSync(REAL_DATA_PATH, 'utf8');
  let plots = parsePlots(content);

  if (singleSlug) {
    plots = plots.filter(p => p.slug === singleSlug);
    if (!plots.length) {
      console.error(`Slug "${singleSlug}" nie znaleziony`);
      process.exit(1);
    }
  }
  if (slugPrefix) {
    plots = plots.filter(p => p.slug.startsWith(slugPrefix));
    console.log(`Filtrowanie po prefix "${slugPrefix}": ${plots.length} działek`);
  }

  // Skip plots with very short descriptions
  plots = plots.filter(p => p.description && p.description.length > 50);

  console.log(`\nPrzepisywanie ${plots.length} opisów działek przez Gemini ${GEMINI_MODEL}...\n`);

  let updated = 0;
  let errors = 0;

  for (let i = 0; i < plots.length; i++) {
    const plot = plots[i];
    const prompt = buildPrompt(plot);

    console.log(`[${i + 1}/${plots.length}] ${plot.slug} (${plot.description.length} zn.)`);

    if (dryRun) {
      console.log('  PROMPT preview:');
      console.log('  ' + prompt.substring(0, 200).replace(/\n/g, '\n  ') + '...\n');
      continue;
    }

    try {
      let html = await callGemini(prompt);

      // Validate
      if (!html.includes('<p>') && !html.includes('<h3>') && !html.includes('<ul>')) {
        console.log(`  WARN: Brak tagów HTML w odpowiedzi, pomijam`);
        console.log('  Response:', html.substring(0, 100));
        errors++;
        continue;
      }

      // Escape for TypeScript string literal
      const escaped = html
        .replace(/\\/g, '\\\\')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '')
        .replace(/\r/g, '');

      // Replace description in content using position-based approach (not regex)
      // to handle quotes inside the description correctly
      const slugPos = content.indexOf(`slug: "${plot.slug}"`);
      if (slugPos === -1) {
        console.log(`  WARN: Slug nie znaleziony w pliku`);
        errors++;
        continue;
      }

      const descKeyword = 'description: "';
      const descStart = content.indexOf(descKeyword, slugPos);
      if (descStart === -1) {
        console.log(`  WARN: Nie znaleziono pola description`);
        errors++;
        continue;
      }

      // Find the closing quote — look for ",\n    thumbnailSrc" pattern (the field after description)
      const valueStart = descStart + descKeyword.length;
      let descEnd = -1;
      // Find thumbnailSrc after description start — the closing " is right before it
      // Support both LF and CRLF line endings
      for (const nl of ['\r\n', '\n']) {
        const thumbPattern = `",${nl}    thumbnailSrc`;
        const thumbIdx = content.indexOf(thumbPattern, valueStart);
        if (thumbIdx !== -1) { descEnd = thumbIdx; break; }
        // Fallback patterns
        for (const fallback of [`",${nl}    images`, `",${nl}  }`]) {
          const fbIdx = content.indexOf(fallback, valueStart);
          if (fbIdx !== -1) { descEnd = fbIdx; break; }
        }
        if (descEnd !== -1) break;
      }

      if (descEnd === -1) {
        console.log(`  WARN: Nie znaleziono końca description`);
        errors++;
        continue;
      }

      // descEnd points to the `"` before `,\n    thumbnailSrc` — keep that closing `"`
      content = content.substring(0, valueStart) + escaped + content.substring(descEnd);
      updated++;
      console.log(`  OK (${html.length} zn. HTML)`);

      // Rate limit: Gemini Flash free tier = 15 RPM, paid = 1000 RPM
      if (i < plots.length - 1) {
        await sleep(2000);
      }
    } catch (err) {
      console.log(`  ERROR: ${err.message}`);
      errors++;

      if (err.message.includes('429')) {
        console.log('  Czekam 60s na rate limit...');
        await sleep(60000);
        i--; // retry
      }
    }
  }

  if (!dryRun) {
    writeFileSync(REAL_DATA_PATH, content, 'utf8');
    console.log(`\nZapisano: ${REAL_DATA_PATH}`);
    console.log(`Zaktualizowano: ${updated}, Błędy: ${errors}`);
  } else {
    console.log('\nDRY RUN — brak zmian');
  }
}

main().catch(console.error);
