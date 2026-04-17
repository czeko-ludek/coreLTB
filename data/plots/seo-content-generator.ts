/**
 * Intelligent SEO content generator for plot listing pages.
 *
 * Combines:
 * 1. Regional data (geology, transport, infrastructure — unique per location)
 * 2. Dynamic plot statistics (prices, areas, MPZP %, media % — from real data)
 * 3. Construction-specific advice (from CoreLTB expertise)
 *
 * Each generated description is genuinely unique — not a template with city name swap.
 * Content targets SEO phrases: "działki [miasto]", "ceny działek [miasto]",
 * "ile kosztuje działka [miasto]", "działka budowlana co sprawdzić".
 */

import type { Plot } from './types';
import type { LocationEntry } from './locations';
import { LOCATIONS } from './locations';
import { getRegionDataWithFallback, type RegionData } from './seo-regions';

// ── Dynamic stats from plot data ──

interface PlotStats {
  total: number;
  available: number;
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  avgPricePerM2: number;
  minArea: number;
  maxArea: number;
  avgArea: number;
  mpzpCount: number;
  mpzpPercent: number;
  fullMediaCount: number;
  fullMediaPercent: number;
  waterCount: number;
  electricityCount: number;
  gasCount: number;
  sewerCount: number;
  flatTerrainCount: number;
  flatTerrainPercent: number;
  asphaltAccessCount: number;
  cities: string[];
  sources: string[];
}

function computeStats(plots: Plot[]): PlotStats {
  const available = plots.filter((p) => p.availability === 'dostepna');
  const prices = available.map((p) => p.price);
  const areas = available.map((p) => p.area);
  const pricesPerM2 = available.map((p) => p.pricePerM2);
  const len = available.length;

  // Pre-compute counts to avoid duplicate iterations
  const mpzpCount = available.filter((p) => p.mpzp === 'tak').length;
  const fullMediaCount = available.filter((p) => p.media.water && p.media.electricity && p.media.gas && p.media.sewer).length;
  const flatTerrainCount = available.filter((p) => p.terrain?.toLowerCase().includes('płaski') || p.terrain?.toLowerCase().includes('plaski')).length;

  return {
    total: plots.length,
    available: len,
    minPrice: prices.length > 0 ? Math.min(...prices) : 0,
    maxPrice: prices.length > 0 ? Math.max(...prices) : 0,
    avgPrice: prices.length > 0 ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
    avgPricePerM2: pricesPerM2.length > 0 ? Math.round(pricesPerM2.reduce((a, b) => a + b, 0) / pricesPerM2.length) : 0,
    minArea: areas.length > 0 ? Math.min(...areas) : 0,
    maxArea: areas.length > 0 ? Math.max(...areas) : 0,
    avgArea: areas.length > 0 ? Math.round(areas.reduce((a, b) => a + b, 0) / areas.length) : 0,
    mpzpCount,
    mpzpPercent: len > 0 ? Math.round((mpzpCount / len) * 100) : 0,
    fullMediaCount,
    fullMediaPercent: len > 0 ? Math.round((fullMediaCount / len) * 100) : 0,
    waterCount: available.filter((p) => p.media.water).length,
    electricityCount: available.filter((p) => p.media.electricity).length,
    gasCount: available.filter((p) => p.media.gas).length,
    sewerCount: available.filter((p) => p.media.sewer).length,
    flatTerrainCount,
    flatTerrainPercent: len > 0 ? Math.round((flatTerrainCount / len) * 100) : 0,
    asphaltAccessCount: available.filter((p) => p.access?.toLowerCase().includes('asfalt')).length,
    cities: [...new Set(available.map((p) => p.city))],
    sources: [...new Set(available.filter((p) => p.source).map((p) => p.source!))],
  };
}

// ── Content building blocks ──

function fmt(n: number): string {
  return n.toLocaleString('pl-PL');
}

function buildLocationSection(loc: LocationEntry, region: RegionData, stats: PlotStats): string {
  const parts: string[] = [];

  // Opening — unique per region type
  if (region.character.type === 'mountain') {
    parts.push(`${loc.name} to lokalizacja o charakterze górskim, ${region.character.description}`);
  } else if (region.character.type === 'urban') {
    parts.push(`${loc.name} — ${region.character.description}`);
  } else if (region.character.type === 'rural') {
    parts.push(`${region.character.description}`);
  } else if (region.character.type === 'periurban') {
    parts.push(`${region.character.description}`);
  } else {
    parts.push(`${loc.name} to ${region.character.description}`);
  }

  // Transport
  const transport = region.transport;
  const transportParts: string[] = [];
  if (transport.highwayName && transport.highwayDistanceKm) {
    transportParts.push(`<strong>${transport.highwayName}</strong> w odległości ${transport.highwayDistanceKm} km`);
  }
  if (transport.majorRoads.length > 0) {
    const roads = transport.majorRoads.filter((r) => r !== transport.highwayName).slice(0, 3);
    if (roads.length > 0) {
      transportParts.push(`drogi ${roads.map((r) => `<strong>${r}</strong>`).join(', ')}`);
    }
  }
  if (transport.nearestCity && transport.nearestCityDistanceKm) {
    transportParts.push(`${transport.nearestCity} — ${transport.nearestCityDistanceKm} km`);
  }
  if (transportParts.length > 0) {
    parts.push(`Komunikacja: ${transportParts.join(', ')}.`);
  }
  if (transport.railConnection) {
    parts.push(transport.railConnection + '.');
  }

  // Residential areas
  if (region.character.residentialAreas && region.character.residentialAreas.length > 0) {
    const areas = region.character.residentialAreas.map((a) => `<strong>${a}</strong>`).join(', ');
    parts.push(`Popularne lokalizacje pod zabudowę jednorodzinną: ${areas}.`);
  }

  return `<h2>Działki ${loc.nameLocative} — lokalizacja i otoczenie</h2>\n<p>${parts.join(' ')}</p>`;
}

function buildTerrainSection(loc: LocationEntry, region: RegionData, stats: PlotStats): string {
  const parts: string[] = [];

  // Terrain & geology
  parts.push(`Teren ${region.terrain.type}. ${region.terrain.geology}`);

  // Mining — use constructionNotes directly when available to avoid duplication
  const notes = region.terrain.constructionNotes;
  if (region.terrain.miningInfluence === 'high') {
    parts.push(`<strong>Teren objęty wpływami górnictwa.</strong> ${notes || 'Konieczna opinia górnicza przed zakupem działki.'}`);
  } else if (region.terrain.miningInfluence === 'medium') {
    parts.push(`Częściowe wpływy górnicze. ${notes || 'Sprawdź kategorię szkód dla konkretnej działki.'}`);
  } else if (region.terrain.miningInfluence === 'low') {
    if (notes) {
      parts.push(notes);
    } else {
      parts.push('Minimalne wpływy górnicze. Standardowe fundamenty wystarczające w większości lokalizacji.');
    }
  } else {
    if (notes) {
      parts.push(`<strong>Brak wpływów górniczych</strong> — stabilne warunki gruntowe pod budowę. ${notes}`);
    } else {
      parts.push('<strong>Brak wpływów górniczych</strong> — stabilne warunki gruntowe pod budowę.');
    }
  }

  // Flood risk
  if (region.terrain.floodRisk) {
    parts.push(`Zagrożenie powodziowe: ${region.terrain.floodRisk}`);
  }

  // Dynamic stats: terrain flatness
  if (stats.available > 2 && stats.flatTerrainPercent > 0) {
    parts.push(`Wśród dostępnych działek — <strong>${stats.flatTerrainPercent}%</strong> na płaskim terenie.`);
  }

  return `<h2>Warunki gruntowe i budowlane ${loc.nameLocative}</h2>\n<p>${parts.join(' ')}</p>`;
}

function buildPriceSection(loc: LocationEntry, region: RegionData, stats: PlotStats): string {
  if (stats.available === 0) {
    return `<h2>Ceny działek budowlanych ${loc.nameLocative}</h2>\n<p>Aktualnie brak dostępnych działek ${loc.nameLocative}. Oferta jest regularnie aktualizowana — sprawdź ponownie lub <a href="/analiza-dzialki">zamów analizę działki</a>, a pomożemy Ci znaleźć odpowiedni teren pod budowę.</p>`;
  }

  const parts: string[] = [];

  // Main price stats
  if (stats.available === 1) {
    parts.push(`Aktualnie dostępna <strong>1 działka budowlana</strong> ${loc.nameLocative} w cenie <strong>${fmt(stats.minPrice)} zł</strong> (${fmt(stats.avgPricePerM2)} zł/m²).`);
  } else {
    parts.push(`Aktualnie ${stats.available > 4 ? `<strong>${stats.available} działek</strong>` : `<strong>${stats.available} działki</strong>`} budowlanych ${loc.nameLocative}.`);
    parts.push(`Ceny od <strong>${fmt(stats.minPrice)} zł</strong> do <strong>${fmt(stats.maxPrice)} zł</strong>.`);
    parts.push(`Średnia cena: <strong>${fmt(stats.avgPrice)} zł</strong> (${fmt(stats.avgPricePerM2)} zł/m²).`);
  }

  // Area range
  if (stats.available > 1) {
    parts.push(`Powierzchnie od ${fmt(stats.minArea)} m² do ${fmt(stats.maxArea)} m².`);
  }

  // Price context from region data
  if (region.priceContext) {
    parts.push(region.priceContext);
  }

  return `<h2>Ile kosztuje działka budowlana ${loc.nameLocative}?</h2>\n<p>${parts.join(' ')}</p>`;
}

function buildChecklistSection(loc: LocationEntry, region: RegionData, stats: PlotStats): string {
  const items: string[] = [];

  // MPZP
  if (stats.available > 0) {
    if (stats.mpzpPercent >= 80) {
      items.push(`<strong>MPZP</strong> — ${stats.mpzpCount} z ${stats.available} działek (${stats.mpzpPercent}%) objętych planem miejscowym. Przyspiesza uzyskanie pozwolenia na budowę o 2-3 miesiące.`);
    } else if (stats.mpzpCount > 0) {
      items.push(`<strong>MPZP</strong> — ${stats.mpzpCount} z ${stats.available} działek ma plan miejscowy. Dla pozostałych konieczne warunki zabudowy (WZ) — proces trwa 2-6 miesięcy.`);
    } else {
      items.push(`<strong>MPZP</strong> — brak planu miejscowego. Konieczne wystąpienie o warunki zabudowy (WZ) — czas oczekiwania 2-6 miesięcy.`);
    }
  }

  // Media
  if (stats.available > 0) {
    const mediaParts: string[] = [];
    if (stats.fullMediaPercent >= 50) {
      mediaParts.push(`<strong>${stats.fullMediaCount}</strong> z ${stats.available} działek ma pełne uzbrojenie (woda, prąd, gaz, kanalizacja)`);
    } else {
      if (stats.waterCount > 0) mediaParts.push(`woda: ${stats.waterCount}/${stats.available}`);
      if (stats.electricityCount > 0) mediaParts.push(`prąd: ${stats.electricityCount}/${stats.available}`);
      if (stats.gasCount > 0) mediaParts.push(`gaz: ${stats.gasCount}/${stats.available}`);
      if (stats.sewerCount > 0) mediaParts.push(`kanalizacja: ${stats.sewerCount}/${stats.available}`);
    }
    if (mediaParts.length > 0) {
      items.push(`<strong>Media</strong> — ${mediaParts.join(', ')}. ${region.infrastructure.notes || ''}`);
    }
  }

  // Construction notes from region
  if (region.terrain.miningInfluence !== 'none') {
    const miningLabel = region.terrain.miningInfluence === 'high' ? 'Obowiązkowa opinia górniczo-geologiczna' : 'Zalecane sprawdzenie historycznych wpływów górniczych';
    items.push(`<strong>Geotechnika</strong> — ${miningLabel}. Badanie gruntu (ok. 1 500-3 000 zł) pozwala dobrać typ fundamentu i uniknąć kosztownych niespodzianek.`);
  } else if (region.terrain.type === 'podgórski' || region.character.type === 'mountain') {
    items.push(`<strong>Geotechnika</strong> — teren ${region.terrain.type}, konieczne badanie stateczności zbocza. Na nachylonych działkach — wyższe koszty fundamentów i robót ziemnych.`);
  } else {
    items.push(`<strong>Geotechnika</strong> — badanie gruntu (ok. 1 500-3 000 zł) pozwala dobrać optymalny typ fundamentu. ${region.terrain.miningInfluence === 'none' ? 'Brak wpływów górniczych — korzystne warunki.' : ''}`);
  }

  // Access
  if (stats.asphaltAccessCount > 0 && stats.available > 0) {
    const asphaltPercent = Math.round((stats.asphaltAccessCount / stats.available) * 100);
    items.push(`<strong>Dojazd</strong> — ${asphaltPercent}% działek z dojazdem asfaltowym. Nawierzchnia drogi dojazdowej wpływa na komfort codziennego użytkowania i wartość nieruchomości.`);
  } else {
    items.push(`<strong>Dojazd</strong> — sprawdź nawierzchnię drogi dojazdowej (asfalt vs szuter vs gruntowa). Wpływa na komfort i wartość nieruchomości.`);
  }

  return `<h2>Na co zwrócić uwagę przy zakupie działki ${loc.nameLocative}?</h2>\n<ul>\n${items.map((i) => `<li>${i}</li>`).join('\n')}\n</ul>`;
}

function buildAdviceSection(loc: LocationEntry, region: RegionData): string {
  if (region.buildingAdvice.length === 0) return '';

  const items = region.buildingAdvice
    .slice(0, 4)
    .map((a) => `<li>${a}</li>`)
    .join('\n');

  return `<h3>Porady budowlane — ${loc.name}</h3>\n<ul>\n${items}\n</ul>`;
}

function buildCtaSection(loc: LocationEntry): string {
  return `<h2>Od działki do gotowego domu ${loc.nameLocative}</h2>\n<p>Masz już działkę ${loc.nameLocative}? <a href="/wycena"><strong>Sprawdź koszt budowy domu</strong></a> — kalkulator online w 2 minuty. Nie masz jeszcze działki? <a href="/analiza-dzialki"><strong>Zamów bezpłatną analizę</strong></a> — ocenimy warunki gruntowe, media i możliwości zabudowy wybranego terenu.</p>`;
}

// ── Main generator ──

/**
 * Generate unique SEO content for a plot listing page.
 *
 * @param locationSlug — slug from LocationEntry
 * @param plots — plots for this location (already filtered)
 * @returns HTML string or undefined if no regional data available
 */
export function generateLocationSeoContent(locationSlug: string, plots: Plot[]): string | undefined {
  const loc = LOCATIONS[locationSlug];
  if (!loc) return undefined;

  // Get regional data with fallback to parent
  const region = getRegionDataWithFallback(locationSlug, loc.parentSlug);
  if (!region) return undefined;

  const stats = computeStats(plots);

  // Build sections
  const sections: string[] = [];

  // 1. Location & surroundings (always)
  sections.push(buildLocationSection(loc, region, stats));

  // 2. Terrain & construction (always — this is our expertise differentiator)
  sections.push(buildTerrainSection(loc, region, stats));

  // 3. Price section (if we have data)
  sections.push(buildPriceSection(loc, region, stats));

  // 4. Checklist section (always — targets "co sprawdzić" queries)
  sections.push(buildChecklistSection(loc, region, stats));

  // 5. Building advice (if region has specific tips)
  const advice = buildAdviceSection(loc, region);
  if (advice) sections.push(advice);

  // 6. CTA section (always — conversion)
  sections.push(buildCtaSection(loc));

  return sections.join('\n\n');
}
