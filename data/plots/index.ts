import { realPlots } from './real-data';
import type { Plot, PlotFilters } from './types';
import { LOCATIONS, getLocationCities, getLocationDistricts } from './locations';

export type { Plot, PlotFilters, PlotMedia, PlotSortBy } from './types';

export const allPlots: Plot[] = realPlots;

/** Slugify city name — removes Polish diacritics, lowercases, replaces spaces with dashes */
export function slugifyCity(city: string): string {
  return city
    .toLowerCase()
    .replace(/ś/g, 's').replace(/ł/g, 'l').replace(/ó/g, 'o')
    .replace(/ą/g, 'a').replace(/ę/g, 'e').replace(/ć/g, 'c')
    .replace(/ń/g, 'n').replace(/ż/g, 'z').replace(/ź/g, 'z')
    .replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

export function getPlotBySlug(slug: string): Plot | undefined {
  return allPlots.find((p) => p.slug === slug);
}

export function getAllPlotSlugs(): string[] {
  return allPlots.map((p) => p.slug);
}

export function getAvailableCities(): string[] {
  const cities = new Set(allPlots.map((p) => p.city));
  return Array.from(cities).sort();
}

/** Filter plots by location slug (uses hierarchical location system) */
export function getPlotsByLocation(locationSlug: string): Plot[] {
  const loc = LOCATIONS[locationSlug];
  if (!loc) return [];

  const cities = getLocationCities(locationSlug);
  const districts = getLocationDistricts(locationSlug);

  let result = allPlots.filter((p) => cities.includes(p.city));

  // For miejscowosc-level, also filter by district
  if (districts && districts.length > 0) {
    result = result.filter((p) => p.district && districts.includes(p.district));
  }

  return result;
}

export function filterAndSortPlots(plots: Plot[], filters: PlotFilters): Plot[] {
  let result = [...plots];

  if (filters.city) {
    result = result.filter((p) => p.city === filters.city);
  }
  if (filters.priceMin) {
    result = result.filter((p) => p.price >= filters.priceMin!);
  }
  if (filters.priceMax) {
    result = result.filter((p) => p.price <= filters.priceMax!);
  }
  if (filters.areaMin) {
    result = result.filter((p) => p.area >= filters.areaMin!);
  }
  if (filters.areaMax) {
    result = result.filter((p) => p.area <= filters.areaMax!);
  }
  if (filters.availability) {
    result = result.filter((p) => p.availability === filters.availability);
  }
  if (filters.source) {
    result = result.filter((p) => p.source === filters.source);
  }

  switch (filters.sortBy) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      result.sort((a, b) => b.price - a.price);
      break;
    case 'area-asc':
      result.sort((a, b) => a.area - b.area);
      break;
    case 'area-desc':
      result.sort((a, b) => b.area - a.area);
      break;
    case 'newest':
      result.sort((a, b) => b.dateAdded - a.dateAdded);
      break;
    case 'mixed':
    default: {
      // Deterministic shuffle — mix sources evenly so listings look diverse
      // Uses seeded pseudo-random based on slug to keep order stable across renders
      const sources = [...new Set(result.map((p) => p.source || 'unknown'))];
      if (sources.length > 1) {
        // Round-robin by source, then by dateAdded within each source
        const buckets = new Map<string, typeof result>();
        for (const s of sources) buckets.set(s, []);
        for (const p of result) buckets.get(p.source || 'unknown')!.push(p);
        // Sort each bucket by newest first
        for (const bucket of buckets.values()) bucket.sort((a, b) => b.dateAdded - a.dateAdded);
        // Interleave
        const interleaved: typeof result = [];
        let added = true;
        let idx = 0;
        while (added) {
          added = false;
          for (const bucket of buckets.values()) {
            if (idx < bucket.length) {
              interleaved.push(bucket[idx]);
              added = true;
            }
          }
          idx++;
        }
        result = interleaved;
      } else {
        result.sort((a, b) => b.dateAdded - a.dateAdded);
      }
      break;
    }
  }

  return result;
}
