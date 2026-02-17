// data/projects/helpers.ts
// Funkcje filtrowania, sortowania i parsowania projektów

import type { Project, ProjectListingItem, ProjectFilters, SortOption, ProjectSource } from './types';
import { surfaceRanges } from './types';

/**
 * Parsuje string ceny "984 tys. zł" lub "810 000 zł" na liczbę
 */
export function parseEstimatedCost(costString: string): number {
  const cleanString = costString.replace(/\s/g, '').replace(',', '.');
  const match = cleanString.match(/(\d+(?:\.\d+)?)/);
  if (!match) return 0;

  const num = parseFloat(match[1]);
  if (costString.toLowerCase().includes('tys')) return num * 1000;
  return num;
}

/**
 * Parsuje string powierzchni "248 + 38m²" lub "120.23m²" na sumę liczb.
 * Obsługuje zarówno format z plusem (parter + poddasze) jak i dziesiętne (galeriadomow/z500).
 */
export function parseSurfaceArea(areaString: string): number {
  const numbers = areaString.match(/\d+(?:\.\d+)?/g);
  if (!numbers) return 0;
  return numbers.reduce((sum, n) => sum + parseFloat(n), 0);
}

/**
 * Tworzy slim ProjectListingItem z pełnego obiektu Project.
 * Wywołuj wyłącznie po stronie Server Component — wynik jest serializowany
 * jako RSC payload (bez floorPlans, specifications, etc.).
 */
export function toListingItem(project: Project): ProjectListingItem {
  return {
    slug: project.slug,
    id: project.id,
    title: project.title,
    category: project.category,
    technology: project.technology,
    surfaceArea: project.surfaceArea,
    estimatedBuildCost: project.estimatedBuildCost,
    price: project.price,
    thumbnailSrc: project.thumbnailSrc,
    source: project.source,
    dateAdded: project.dateAdded,
    costNum: parseEstimatedCost(project.estimatedBuildCost || ''),
    areaNum: parseSurfaceArea(project.surfaceArea),
  };
}

/**
 * Filtruje projekty według podanych filtrów.
 * Używa precomputed costNum/areaNum — zero string parsingu w pętli.
 */
export function filterProjects(
  projects: ProjectListingItem[],
  filters: ProjectFilters
): ProjectListingItem[] {
  const surfaceRange = filters.surfaceRange
    ? surfaceRanges.find(r => r.id === filters.surfaceRange) ?? null
    : null;

  return projects.filter(project => {
    if (filters.technology.length > 0 && !filters.technology.includes(project.technology)) return false;
    if (filters.category.length > 0 && !filters.category.includes(project.category)) return false;
    if (filters.source.length > 0 && !filters.source.includes(project.source as ProjectSource)) return false;

    if (surfaceRange) {
      if (project.areaNum < surfaceRange.min) return false;
      if (surfaceRange.max !== null && project.areaNum > surfaceRange.max) return false;
    }

    return true;
  });
}

/**
 * Sortuje projekty według wybranej opcji.
 * Używa precomputed costNum/areaNum — O(n log n) prostych porównań liczb.
 */
export function sortProjects(projects: ProjectListingItem[], sortBy: SortOption): ProjectListingItem[] {
  const sorted = [...projects];

  switch (sortBy) {
    case 'newest':     return sorted.sort((a, b) => b.dateAdded - a.dateAdded);
    case 'price-asc':  return sorted.sort((a, b) => a.costNum - b.costNum);
    case 'price-desc': return sorted.sort((a, b) => b.costNum - a.costNum);
    case 'area-asc':   return sorted.sort((a, b) => a.areaNum - b.areaNum);
    case 'area-desc':  return sorted.sort((a, b) => b.areaNum - a.areaNum);
    default:           return sorted;
  }
}

/**
 * Zlicza projekty dla danego filtra (do wyświetlania "Murowany (4)")
 */
export function countProjectsByFilter(
  projects: ProjectListingItem[],
  filterType: 'technology' | 'category' | 'source',
  value: string
): number {
  return projects.filter(p => p[filterType] === value).length;
}
