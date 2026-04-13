/**
 * Region/powiat grouping for plot filtering.
 * Instead of 16+ individual villages, group by larger administrative areas.
 */

export interface PlotRegion {
  slug: string;
  label: string;
  /** All city names (from Plot.city) that belong to this region */
  cities: string[];
}

/**
 * Region definitions — ordered by expected plot count (most first).
 * Cities are matched exactly against Plot.city field (with Polish diacritics).
 */
export const PLOT_REGIONS: PlotRegion[] = [
  {
    slug: 'wodzislawski',
    label: 'Powiat wodzisławski',
    cities: [
      'Wodzislaw Slaski', 'Wodzisław Śląski',
      'Gorzyce',
      'Godow', 'Godów',
      'Radlin',
      'Lubomia',
      'Mszana',
      'Marklowice',
    ],
  },
  {
    slug: 'rybnicki',
    label: 'Rybnik',
    cities: [
      'Rybnik',
      'Gaszowice',
      'Lyski', 'Łyski',
    ],
  },
  {
    slug: 'raciborski',
    label: 'Powiat raciborski',
    cities: [
      'Nedza', 'Nędza',
      'Pietrowice Wielkie',
    ],
  },
  {
    slug: 'slaskie-inne',
    label: 'Śląskie — inne',
    cities: [
      'Ornontowice',
    ],
  },
];

/** Find which region a city belongs to */
export function getRegionForCity(city: string): PlotRegion | undefined {
  return PLOT_REGIONS.find((r) => r.cities.includes(city));
}

/** Get region by slug */
export function getRegionBySlug(slug: string): PlotRegion | undefined {
  return PLOT_REGIONS.find((r) => r.slug === slug);
}
