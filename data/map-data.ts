/**
 * Map Data - Interactive Map for Obszar Działania
 *
 * This file contains data structures for the interactive SVG map
 * showing 3 voivodeships: Śląskie, Małopolskie, Opolskie
 */

// ============================================================================
// TYPES
// ============================================================================

export type VoivodeshipId = 'slaskie' | 'malopolskie' | 'opolskie';

export interface MapCity {
  id: string;                    // Unique identifier
  name: string;                  // Display name (Polish)
  nameInSvg: string;             // Name as it appears in SVG label
  slug: string | null;           // URL slug for local page (null if no page)
  voivodeship: VoivodeshipId;    // Parent voivodeship
  coordinates: {
    cx: number;                  // Circle X coordinate in SVG
    cy: number;                  // Circle Y coordinate in SVG
  };
  hasPage: boolean;              // Whether city has a dedicated local page
}

export interface MapVoivodeship {
  id: VoivodeshipId;
  name: string;                  // Display name (Polish)
  svgGroupId: string;            // ID of the voivodeship group in SVG
  citiesGroupId: string;         // ID of the cities group in SVG
  cities: MapCity[];
}

// ============================================================================
// DATA
// ============================================================================

/**
 * Cities with existing local pages (from getAllLocalPageSlugs)
 * These will be linkable on the map
 */
const existingPageSlugs = new Set([
  'rybnik',
  'wodzislaw-slaski',
  'tychy',
  'katowice',
  'jaworzno',
  'mikolow',
  'gliwice',
  'zabrze',
  'zory',
  'jastrzebie-zdroj',
  'raciborz',
  'chrzanow',
  'krakow',
  'oswiecim',
  'olkusz',
  'opole',
  'kedzierzyn-kozle',
]);

/**
 * Helper to create city entry
 */
function createCity(
  id: string,
  name: string,
  nameInSvg: string,
  slug: string | null,
  voivodeship: VoivodeshipId,
  cx: number,
  cy: number
): MapCity {
  return {
    id,
    name,
    nameInSvg,
    slug,
    voivodeship,
    coordinates: { cx, cy },
    hasPage: slug !== null && existingPageSlugs.has(slug),
  };
}

// ============================================================================
// VOIVODESHIPS DATA
// ============================================================================

/**
 * Województwo Śląskie - main area of operation
 */
const slaskieCities: MapCity[] = [
  createCity('rybnik', 'Rybnik', 'Rybnik', 'rybnik', 'slaskie', 669, 1156),
  createCity('wodzislaw', 'Wodzisław Śląski', 'Wodzisław', 'wodzislaw-slaski', 'slaskie', 636, 1182),
  createCity('katowice', 'Katowice', 'Katowice', 'katowice', 'slaskie', 738, 1132),
  createCity('tychy', 'Tychy', 'Tychy', 'tychy', 'slaskie', 734, 1158),
  createCity('jaworzno', 'Jaworzno', 'Jaworzno', 'jaworzno', 'slaskie', 771, 1142),
  createCity('zory', 'Żory', 'Żory', 'zory', 'slaskie', 688, 1174),
  createCity('gliwice', 'Gliwice', 'Gliwice', 'gliwice', 'slaskie', 679, 1109),
  createCity('zabrze', 'Zabrze', 'Zabrze', 'zabrze', 'slaskie', 708, 1103),
  createCity('mikolow', 'Mikołów', 'Mikołów', 'mikolow', 'slaskie', 711, 1148),
  createCity('jastrzebie-zdroj', 'Jastrzębie-Zdrój', 'Jastrzębie-Zdrój', 'jastrzebie-zdroj', 'slaskie', 655, 1190),
  createCity('raciborz', 'Racibórz', 'Racibórz', 'raciborz', 'slaskie', 624, 1170),
];

/**
 * Województwo Małopolskie
 */
const malopolskieCities: MapCity[] = [
  createCity('krakow', 'Kraków', 'Kraków', 'krakow', 'malopolskie', 877, 1171),
  createCity('chrzanow', 'Chrzanów', 'Chrzanów', 'chrzanow', 'malopolskie', 795, 1166),
  createCity('oswiecim', 'Oświęcim', 'Oświęcim', 'oswiecim', 'malopolskie', 766, 1197),
  createCity('olkusz', 'Olkusz', 'Olkusz', 'olkusz', 'malopolskie', 825, 1105),
];

/**
 * Województwo Opolskie
 */
const opolskieCities: MapCity[] = [
  createCity('opole', 'Opole', 'Opole', 'opole', 'opolskie', 579, 1021),
  createCity('kedzierzyn-kozle', 'Kędzierzyn-Koźle', 'Kędzierzyn-Koźle', 'kedzierzyn-kozle', 'opolskie', 617, 1100),
];

/**
 * All voivodeships with their cities
 */
export const mapVoivodeships: MapVoivodeship[] = [
  {
    id: 'slaskie',
    name: 'Śląskie',
    svgGroupId: 'wojewodztwo-slaskie',
    citiesGroupId: 'miasta-slaskie',
    cities: slaskieCities,
  },
  {
    id: 'malopolskie',
    name: 'Małopolskie',
    svgGroupId: 'wojewodztwo-malopolskie',
    citiesGroupId: 'miasta-malopolskie',
    cities: malopolskieCities,
  },
  {
    id: 'opolskie',
    name: 'Opolskie',
    svgGroupId: 'wojewodztwo-opolskie',
    citiesGroupId: 'miasta-opolskie',
    cities: opolskieCities,
  },
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Get all cities as flat array
 */
export function getAllCities(): MapCity[] {
  return mapVoivodeships.flatMap((v) => v.cities);
}

/**
 * Get cities that have existing local pages
 */
export function getCitiesWithPages(): MapCity[] {
  return getAllCities().filter((city) => city.hasPage);
}

/**
 * Get cities without local pages (coming soon)
 */
export function getCitiesWithoutPages(): MapCity[] {
  return getAllCities().filter((city) => !city.hasPage);
}

/**
 * Find city by ID
 */
export function getCityById(cityId: string): MapCity | undefined {
  return getAllCities().find((city) => city.id === cityId);
}

/**
 * Find city by SVG name (for matching with SVG text elements)
 */
export function getCityByNameInSvg(nameInSvg: string): MapCity | undefined {
  return getAllCities().find((city) => city.nameInSvg === nameInSvg);
}

/**
 * Get voivodeship by ID
 */
export function getVoivodeshipById(id: VoivodeshipId): MapVoivodeship | undefined {
  return mapVoivodeships.find((v) => v.id === id);
}

/**
 * Get cities for a specific voivodeship
 */
export function getCitiesByVoivodeship(voivodeshipId: VoivodeshipId): MapCity[] {
  const voivodeship = getVoivodeshipById(voivodeshipId);
  return voivodeship?.cities ?? [];
}

/**
 * Check if a city has a local page
 */
export function cityHasPage(cityId: string): boolean {
  const city = getCityById(cityId);
  return city?.hasPage ?? false;
}

/**
 * Get URL for city page (or null if no page exists)
 */
export function getCityPageUrl(cityId: string): string | null {
  const city = getCityById(cityId);
  if (city?.hasPage && city.slug) {
    return `/obszar-dzialania/${city.slug}`;
  }
  return null;
}

// ============================================================================
// STATISTICS
// ============================================================================

/**
 * Get map statistics for display
 */
export function getMapStats() {
  const allCities = getAllCities();
  const citiesWithPages = getCitiesWithPages();

  return {
    totalCities: allCities.length,
    citiesWithPages: citiesWithPages.length,
    citiesComingSoon: allCities.length - citiesWithPages.length,
    voivodeships: mapVoivodeships.length,
  };
}
