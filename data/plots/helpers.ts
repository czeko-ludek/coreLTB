import type { Plot } from './types';

/**
 * Clean plot description — remove boilerplate legal text from l-r.com.pl
 */
export function cleanDescription(desc: string): string {
  if (!desc) return '';

  // Cut at common boilerplate markers
  const cutMarkers = [
    'Zapraszam na prezentację!',
    'Zapraszam na prezentację.',
    'Zapraszamy na prezentację!',
    'Pomagamy w uzyskaniu',
    'Korzystając z pomocy naszego Biura',
    'Wszelkie prawa zastrzeżone',
    'Nota prawna',
    'Opis oferty zawarty na stronie internetowej',
  ];

  let cleaned = desc;
  for (const marker of cutMarkers) {
    const idx = cleaned.indexOf(marker);
    if (idx > 50) {
      cleaned = cleaned.substring(0, idx);
    }
  }

  // Remove leading "Opis nieruchomości" prefix
  cleaned = cleaned.replace(/^Opis\s+nieruchomo[sś]ci\s*/i, '');

  // Remove price repetitions at end like "Cena: 225.000 złotych" or "Cena: 77."
  cleaned = cleaned.replace(/\s*Cena:\s*[\d\s.]+(?:z[lł](?:otych)?)?\.?\s*$/i, '');

  // Remove asterisks (masked numbers)
  cleaned = cleaned.replace(/\*{2,}/g, '');

  // Remove "OFERTA NA WYŁĄCZNOŚĆ" etc.
  cleaned = cleaned.replace(/OFERTA NA WY[ŁL][AĄ]CZNO[SŚ][CĆ]/gi, '');

  // Normalize whitespace
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // Remove trailing period if double
  cleaned = cleaned.replace(/\.\.\s*$/, '.').replace(/\.\s*$/, '.');

  return cleaned;
}

/**
 * Extract street/address from plot description or title.
 * Returns the best address string we can find.
 */
export function extractAddress(plot: Plot): string {
  const desc = plot.description || '';
  const title = plot.title || '';

  // Pattern 1: "przy ulicy X" / "przy ul. X"
  const ulicaPatterns = [
    /przy\s+ulicy\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i,
    /przy\s+ul\.\s*([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i,
    /ul(?:icy|\.)\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i,
  ];

  for (const pattern of ulicaPatterns) {
    const match = desc.match(pattern);
    if (match && match[1]) {
      const street = match[1].trim();
      // Skip common false positives
      if (['Oferujemy', 'Mam', 'Prezentujemy', 'Na', 'W'].includes(street)) continue;
      return `ul. ${street}`;
    }
  }

  // Pattern 2: "położoną w X" — already have city, but extract miejscowosc
  const polozonaMatch = desc.match(/po[lł]o[żz]on[aąeę]\s+w\s+([A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+(?:\s+[A-ZĄĆĘŁŃÓŚŹŻ][a-ząćęłńóśźż]+)?)/i);
  if (polozonaMatch && polozonaMatch[1]) {
    const loc = polozonaMatch[1].trim();
    if (!['Wodzisławiu', 'Rybniku', 'Radlinie'].includes(loc)) {
      return loc;
    }
  }

  // Pattern 3: district from title "Działka 2780 m² — Godów, Skrzyszów" -> "Skrzyszów"
  const titleMatch = title.match(/—\s*[^,]+,\s*(.+)$/);
  if (titleMatch && titleMatch[1]) {
    return titleMatch[1].trim();
  }

  return '';
}

/**
 * Extract district from title: "Działka 2780 m² — Godów, Skrzyszów" -> "Skrzyszów"
 */
export function extractDistrict(title: string): string | undefined {
  const match = title.match(/—\s*[^,]+,\s*(.+)$/);
  if (match && match[1]) {
    return match[1].trim();
  }
  return undefined;
}

/**
 * Build /wycena URL pre-filled with plot area
 */
export function buildPlotCalculatorUrl(plot: Plot): string {
  return `/wycena?area=${Math.round(plot.area)}&utm_content=dzialka-${plot.slug}`;
}

/**
 * Build /analiza-dzialki URL pre-filled with plot data
 */
export function buildPlotAnalysisUrl(plot: Plot): string {
  const params = new URLSearchParams();
  const addr = extractAddress(plot);
  const fullAddr = addr
    ? `${addr}, ${plot.city}`
    : plot.city;
  params.set('adres', fullAddr);
  if (plot.mpzp !== 'nie_wiem') {
    params.set('mpzp', plot.mpzp);
  }
  return `/analiza-dzialki?${params.toString()}`;
}

/**
 * Format price with spaces: 225000 -> "225 000"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString('pl-PL');
}

/**
 * Get media summary labels
 */
export function getMediaLabels(plot: Plot): string[] {
  const labels: string[] = [];
  if (plot.media.water) labels.push('Woda');
  if (plot.media.electricity) labels.push('Prad');
  if (plot.media.gas) labels.push('Gaz');
  if (plot.media.sewer) labels.push('Kanalizacja');
  return labels;
}
