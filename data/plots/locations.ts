/**
 * Hierarchical location system for plot search.
 * Structure: województwo → powiat → gmina/miasto → dzielnica/wieś
 *
 * Each entry can be searched and selected to filter plots.
 * `matchCities` — which Plot.city values belong to this location
 * `matchDistricts` — optional: also filter by district (from title parsing)
 */

export type LocationLevel = 'wojewodztwo' | 'powiat' | 'gmina' | 'miejscowosc';

export interface LocationEntry {
  /** URL-safe slug */
  slug: string;
  /** Display name */
  name: string;
  /** Locative case for SEO: "w Wodzislawiu Slaskim" */
  nameLocative: string;
  /** Hierarchy level */
  level: LocationLevel;
  /** Parent slug (e.g. gmina belongs to powiat) */
  parentSlug?: string;
  /** Which Plot.city values this location covers */
  matchCities: string[];
  /** Optional: filter to specific districts only */
  matchDistricts?: string[];
  /** Children slugs */
  children?: string[];
  /**
   * Nominatim query to fetch boundary polygon.
   * Format: search query string for Nominatim Search API.
   * If not set, boundary overlay is not shown for this location.
   */
  nominatimQuery?: string;
}

/** All locations in a flat map (slug → entry) */
export const LOCATIONS: Record<string, LocationEntry> = {
  // ══════════════════════════════════════════
  // WOJEWÓDZTWO
  // ══════════════════════════════════════════
  'slaskie': {
    slug: 'slaskie',
    name: 'Śląskie',
    nameLocative: 'na Śląsku',
    level: 'wojewodztwo',
    matchCities: [], // All cities below
    children: ['powiat-wodzislawski', 'powiat-rybnicki', 'powiat-raciborski', 'powiat-mikolowski'],
    nominatimQuery: 'województwo śląskie, Polska',
  },

  // ══════════════════════════════════════════
  // POWIAT WODZISLAWSKI
  // ══════════════════════════════════════════
  'powiat-wodzislawski': {
    slug: 'powiat-wodzislawski',
    name: 'Powiat wodzisławski',
    nameLocative: 'w powiecie wodzisławskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: [
      'Wodzislaw Slaski', 'Wodzisław Śląski',
      'Gorzyce', 'Radlin', 'Mszana', 'Marklowice',
      'Lubomia', 'Godow', 'Godów',
    ],
    children: [
      'wodzislaw-slaski', 'gorzyce', 'radlin', 'mszana',
      'marklowice', 'lubomia', 'godow',
    ],
    nominatimQuery: 'powiat wodzisławski, województwo śląskie',
  },

  'wodzislaw-slaski': {
    slug: 'wodzislaw-slaski',
    name: 'Wodzisław Śląski',
    nameLocative: 'w Wodzisławiu Śląskim',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    children: ['kokoszyce', 'turzyczka', 'wilchwy'],
    nominatimQuery: 'Wodzisław Śląski, powiat wodzisławski',
  },
  'kokoszyce': {
    slug: 'kokoszyce',
    name: 'Kokoszyce',
    nameLocative: 'w Kokoszycach',
    level: 'miejscowosc',
    parentSlug: 'wodzislaw-slaski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    matchDistricts: ['Kokoszyce'],
    nominatimQuery: 'Kokoszyce, Wodzisław Śląski, powiat wodzisławski',
  },
  'turzyczka': {
    slug: 'turzyczka',
    name: 'Turzyczka',
    nameLocative: 'w Turzyczce',
    level: 'miejscowosc',
    parentSlug: 'wodzislaw-slaski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    matchDistricts: ['Turzyczka'],
    nominatimQuery: 'Turzyczka, Wodzisław Śląski, powiat wodzisławski',
  },
  'wilchwy': {
    slug: 'wilchwy',
    name: 'Wilchwy',
    nameLocative: 'w Wilchwach',
    level: 'miejscowosc',
    parentSlug: 'wodzislaw-slaski',
    matchCities: ['Wodzislaw Slaski', 'Wodzisław Śląski'],
    matchDistricts: ['Wilchwy'],
    nominatimQuery: 'Wilchwy, Wodzisław Śląski, powiat wodzisławski',
  },

  'gorzyce': {
    slug: 'gorzyce',
    name: 'Gorzyce',
    nameLocative: 'w Gorzycach',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Gorzyce'],
    children: ['czyzowice', 'turza-slaska'],
    nominatimQuery: 'gmina Gorzyce, powiat wodzisławski',
  },
  'czyzowice': {
    slug: 'czyzowice',
    name: 'Czyżowice',
    nameLocative: 'w Czyżowicach',
    level: 'miejscowosc',
    parentSlug: 'gorzyce',
    matchCities: ['Gorzyce'],
    matchDistricts: ['Czyżowice'],
    nominatimQuery: 'Czyżowice, gmina Gorzyce, powiat wodzisławski',
  },
  'turza-slaska': {
    slug: 'turza-slaska',
    name: 'Turza Śląska',
    nameLocative: 'w Turzy Śląskiej',
    level: 'miejscowosc',
    parentSlug: 'gorzyce',
    matchCities: ['Gorzyce'],
    matchDistricts: ['Turza Śląska'],
    nominatimQuery: 'Turza Śląska, gmina Gorzyce, powiat wodzisławski',
  },

  'radlin': {
    slug: 'radlin',
    name: 'Radlin',
    nameLocative: 'w Radlinie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Radlin'],
    children: ['biertultowy'],
    nominatimQuery: 'Radlin, powiat wodzisławski',
  },
  'biertultowy': {
    slug: 'biertultowy',
    name: 'Biertułtowy',
    nameLocative: 'w Biertułtowach',
    level: 'miejscowosc',
    parentSlug: 'radlin',
    matchCities: ['Radlin'],
    matchDistricts: ['Biertułtowy'],
    nominatimQuery: 'Biertułtowy, Radlin, powiat wodzisławski',
  },

  'mszana': {
    slug: 'mszana',
    name: 'Mszana',
    nameLocative: 'w Mszanie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Mszana'],
    children: ['gogolowa'],
    nominatimQuery: 'gmina Mszana, powiat wodzisławski',
  },
  'gogolowa': {
    slug: 'gogolowa',
    name: 'Gogołowa',
    nameLocative: 'w Gogołowej',
    level: 'miejscowosc',
    parentSlug: 'mszana',
    matchCities: ['Mszana'],
    matchDistricts: ['Gogołowa'],
    nominatimQuery: 'Gogołowa, gmina Mszana, powiat wodzisławski',
  },

  'marklowice': {
    slug: 'marklowice',
    name: 'Marklowice',
    nameLocative: 'w Marklowicach',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Marklowice'],
    nominatimQuery: 'gmina Marklowice, powiat wodzisławski',
  },
  'lubomia': {
    slug: 'lubomia',
    name: 'Lubomia',
    nameLocative: 'w Lubomi',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Lubomia'],
    nominatimQuery: 'gmina Lubomia, powiat wodzisławski',
  },
  'godow': {
    slug: 'godow',
    name: 'Godów',
    nameLocative: 'w Godowie',
    level: 'gmina',
    parentSlug: 'powiat-wodzislawski',
    matchCities: ['Godow', 'Godów'],
    children: ['skrzyszow'],
    nominatimQuery: 'gmina Godów, powiat wodzisławski',
  },
  'skrzyszow': {
    slug: 'skrzyszow',
    name: 'Skrzyszów',
    nameLocative: 'w Skrzyszowie',
    level: 'miejscowosc',
    parentSlug: 'godow',
    matchCities: ['Godow', 'Godów'],
    matchDistricts: ['Skrzyszów'],
    nominatimQuery: 'Skrzyszów, gmina Godów, powiat wodzisławski',
  },

  // ══════════════════════════════════════════
  // POWIAT RYBNICKI (+ Rybnik miasto)
  // ══════════════════════════════════════════
  'powiat-rybnicki': {
    slug: 'powiat-rybnicki',
    name: 'Powiat rybnicki',
    nameLocative: 'w powiecie rybnickim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Rybnik', 'Gaszowice', 'Lyski', 'Łyski'],
    children: ['rybnik', 'gaszowice', 'lyski'],
    nominatimQuery: 'powiat rybnicki, województwo śląskie',
  },

  'rybnik': {
    slug: 'rybnik',
    name: 'Rybnik',
    nameLocative: 'w Rybniku',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Rybnik'],
    children: ['ligota-rybnik', 'popielow'],
    nominatimQuery: 'Rybnik, województwo śląskie',
  },
  'ligota-rybnik': {
    slug: 'ligota-rybnik',
    name: 'Ligota',
    nameLocative: 'w Ligocie',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Ligota'],
    nominatimQuery: 'Ligota, Rybnik, województwo śląskie',
  },
  'popielow': {
    slug: 'popielow',
    name: 'Popielów',
    nameLocative: 'w Popielowie',
    level: 'miejscowosc',
    parentSlug: 'rybnik',
    matchCities: ['Rybnik'],
    matchDistricts: ['Popielów'],
    nominatimQuery: 'Popielów, Rybnik, województwo śląskie',
  },

  'gaszowice': {
    slug: 'gaszowice',
    name: 'Gaszowice',
    nameLocative: 'w Gaszowicach',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Gaszowice'],
    children: ['czernica', 'szczerbice'],
    nominatimQuery: 'gmina Gaszowice, powiat rybnicki',
  },
  'czernica': {
    slug: 'czernica',
    name: 'Czernica',
    nameLocative: 'w Czernicy',
    level: 'miejscowosc',
    parentSlug: 'gaszowice',
    matchCities: ['Gaszowice'],
    matchDistricts: ['Czernica'],
    nominatimQuery: 'Czernica, gmina Gaszowice, powiat rybnicki',
  },
  'szczerbice': {
    slug: 'szczerbice',
    name: 'Szczerbice',
    nameLocative: 'w Szczerbicach',
    level: 'miejscowosc',
    parentSlug: 'gaszowice',
    matchCities: ['Gaszowice'],
    matchDistricts: ['Szczerbice'],
    nominatimQuery: 'Szczerbice, gmina Gaszowice, powiat rybnicki',
  },

  'lyski': {
    slug: 'lyski',
    name: 'Łyski',
    nameLocative: 'w Łyskach',
    level: 'gmina',
    parentSlug: 'powiat-rybnicki',
    matchCities: ['Lyski', 'Łyski'],
    children: ['pstrazna', 'sumina', 'zytna'],
    nominatimQuery: 'gmina Lyski, powiat rybnicki',
  },
  'pstrazna': {
    slug: 'pstrazna',
    name: 'Pstrążna',
    nameLocative: 'w Pstrążnej',
    level: 'miejscowosc',
    parentSlug: 'lyski',
    matchCities: ['Lyski', 'Łyski'],
    matchDistricts: ['Pstrążna'],
    nominatimQuery: 'Pstrążna, gmina Lyski, powiat rybnicki',
  },
  'sumina': {
    slug: 'sumina',
    name: 'Sumina',
    nameLocative: 'w Suminie',
    level: 'miejscowosc',
    parentSlug: 'lyski',
    matchCities: ['Lyski', 'Łyski'],
    matchDistricts: ['Sumina'],
    nominatimQuery: 'Sumina, gmina Lyski, powiat rybnicki',
  },
  'zytna': {
    slug: 'zytna',
    name: 'Żytna',
    nameLocative: 'w Żytnej',
    level: 'miejscowosc',
    parentSlug: 'lyski',
    matchCities: ['Lyski', 'Łyski'],
    matchDistricts: ['Żytna'],
    nominatimQuery: 'Żytna, gmina Lyski, powiat rybnicki',
  },

  // ══════════════════════════════════════════
  // POWIAT RACIBORSKI
  // ══════════════════════════════════════════
  'powiat-raciborski': {
    slug: 'powiat-raciborski',
    name: 'Powiat raciborski',
    nameLocative: 'w powiecie raciborskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Nedza', 'Nędza', 'Pietrowice Wielkie'],
    children: ['nedza', 'pietrowice-wielkie'],
    nominatimQuery: 'powiat raciborski, województwo śląskie',
  },
  'nedza': {
    slug: 'nedza',
    name: 'Nędza',
    nameLocative: 'w Nędzy',
    level: 'gmina',
    parentSlug: 'powiat-raciborski',
    matchCities: ['Nedza', 'Nędza'],
    children: ['gorki-slaskie'],
    nominatimQuery: 'gmina Nędza, powiat raciborski',
  },
  'gorki-slaskie': {
    slug: 'gorki-slaskie',
    name: 'Górki Śląskie',
    nameLocative: 'w Górkach Śląskich',
    level: 'miejscowosc',
    parentSlug: 'nedza',
    matchCities: ['Nedza', 'Nędza'],
    matchDistricts: ['Górki'],
    nominatimQuery: 'Górki Śląskie, gmina Nędza, powiat raciborski',
  },
  'pietrowice-wielkie': {
    slug: 'pietrowice-wielkie',
    name: 'Pietrowice Wielkie',
    nameLocative: 'w Pietrowicach Wielkich',
    level: 'gmina',
    parentSlug: 'powiat-raciborski',
    matchCities: ['Pietrowice Wielkie'],
    children: ['cyprzanow'],
    nominatimQuery: 'gmina Pietrowice Wielkie, powiat raciborski',
  },
  'cyprzanow': {
    slug: 'cyprzanow',
    name: 'Cyprzanów',
    nameLocative: 'w Cyprzanowie',
    level: 'miejscowosc',
    parentSlug: 'pietrowice-wielkie',
    matchCities: ['Pietrowice Wielkie'],
    matchDistricts: ['Cyprzanów'],
    nominatimQuery: 'Cyprzanów, gmina Pietrowice Wielkie, powiat raciborski',
  },

  // ══════════════════════════════════════════
  // POWIAT MIKOLOWSKI
  // ══════════════════════════════════════════
  'powiat-mikolowski': {
    slug: 'powiat-mikolowski',
    name: 'Powiat mikołowski',
    nameLocative: 'w powiecie mikołowskim',
    level: 'powiat',
    parentSlug: 'slaskie',
    matchCities: ['Ornontowice'],
    children: ['ornontowice'],
    nominatimQuery: 'powiat mikołowski, województwo śląskie',
  },
  'ornontowice': {
    slug: 'ornontowice',
    name: 'Ornontowice',
    nameLocative: 'w Ornontowicach',
    level: 'gmina',
    parentSlug: 'powiat-mikolowski',
    matchCities: ['Ornontowice'],
    nominatimQuery: 'gmina Ornontowice, powiat mikołowski',
  },

};

const LEVEL_LABELS: Record<LocationLevel, string> = {
  wojewodztwo: 'Województwo',
  powiat: 'Powiat',
  gmina: 'Gmina / Miasto',
  miejscowosc: 'Miejscowość',
};

export function getLocationLevelLabel(level: LocationLevel): string {
  return LEVEL_LABELS[level];
}

/** Get all cities covered by a location (including children recursively) */
export function getLocationCities(slug: string): string[] {
  const loc = LOCATIONS[slug];
  if (!loc) return [];

  const cities = new Set(loc.matchCities);

  // Recurse into children
  if (loc.children) {
    for (const childSlug of loc.children) {
      for (const city of getLocationCities(childSlug)) {
        cities.add(city);
      }
    }
  }

  return Array.from(cities);
}

/** Get all districts for a location (if it has matchDistricts) */
export function getLocationDistricts(slug: string): string[] | undefined {
  const loc = LOCATIONS[slug];
  return loc?.matchDistricts;
}

/** Search locations by query string — returns matching entries sorted by relevance */
export function searchLocations(query: string): LocationEntry[] {
  if (!query || query.length < 2) return [];

  const q = query.toLowerCase()
    .replace(/ś/g, 's').replace(/ł/g, 'l').replace(/ó/g, 'o')
    .replace(/ą/g, 'a').replace(/ę/g, 'e').replace(/ć/g, 'c')
    .replace(/ń/g, 'n').replace(/ż/g, 'z').replace(/ź/g, 'z');

  const results: { entry: LocationEntry; score: number }[] = [];

  for (const entry of Object.values(LOCATIONS)) {
    const nameNorm = entry.name.toLowerCase()
      .replace(/ś/g, 's').replace(/ł/g, 'l').replace(/ó/g, 'o')
      .replace(/ą/g, 'a').replace(/ę/g, 'e').replace(/ć/g, 'c')
      .replace(/ń/g, 'n').replace(/ż/g, 'z').replace(/ź/g, 'z');

    if (!nameNorm.includes(q)) continue;

    // Score: exact start > contains, gmina > powiat > miejscowosc > wojewodztwo
    let score = 0;
    if (nameNorm.startsWith(q)) score += 10;
    if (nameNorm === q) score += 20;

    // Prefer gmina/miasto level
    if (entry.level === 'gmina') score += 5;
    else if (entry.level === 'powiat') score += 3;
    else if (entry.level === 'miejscowosc') score += 2;
    else if (entry.level === 'wojewodztwo') score += 1;

    results.push({ entry, score });
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.entry);
}

/** Get all location slugs that should have their own SEO page (gmina + miejscowosc) */
export function getAllIndexableLocationSlugs(): string[] {
  return Object.values(LOCATIONS)
    .filter((loc) => loc.level === 'gmina' || loc.level === 'miejscowosc' || loc.level === 'powiat')
    .map((loc) => loc.slug);
}

/** Build breadcrumb path for a location: Slaskie > Powiat wodzislawski > Wodzislaw Slaski */
export function getLocationBreadcrumb(slug: string): LocationEntry[] {
  const path: LocationEntry[] = [];
  let current: LocationEntry | undefined = LOCATIONS[slug];

  while (current) {
    path.unshift(current);
    current = current.parentSlug ? LOCATIONS[current.parentSlug] : undefined;
  }

  return path;
}
