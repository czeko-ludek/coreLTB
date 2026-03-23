// data/projects/helpers.ts
// Funkcje filtrowania, sortowania i parsowania projektów

import type { Project, ProjectListingItem, ProjectFilters, SortOption, ProjectSource, ProjectCategory, GarageFilter } from './types';
import { surfaceRanges } from './types';

// ---------------------------------------------------------------------------
// SEO helpers — title, description, category labels
// ---------------------------------------------------------------------------

const CATEGORY_LABELS: Record<ProjectCategory, string> = {
  parterowy: 'parterowy',
  pietrowy: 'pietrowy',
  'z-poddaszem': 'z poddaszem',
  dwulokalowy: 'dwulokalowy',
  jednorodzinny: 'jednorodzinny',
};

/** Human-readable category label for SEO (lowercase, Polish) */
export function getCategoryLabel(category: ProjectCategory): string {
  return CATEGORY_LABELS[category] || category;
}

/**
 * Generates an SEO-optimized <title> for a project detail page.
 *
 * Pattern: "Projekt domu [Name] · [Area] m² [category] | Wyceń w 60s"
 * Example: "Projekt domu Dom przy Jesionowej · 120 m² parterowy | Wyceń w 60s"
 *
 * Targets:
 * - "projekt domu" keyword front-loaded (highest volume phrase)
 * - Surface area as modifier (long-tail: "projekt domu 120m2")
 * - Category for "projekt domu parterowego" style queries
 * - "Wyceń w 60s" as unique CTR hook (no competitor does this)
 */
export function generateProjectSeoTitle(project: Project): string {
  const area = Math.round(parseSurfaceArea(project.surfaceArea));
  const category = getCategoryLabel(project.category);
  return `Projekt domu ${project.title} · ${area} m² ${category} | Wyceń w 60s · CoreLTB`;
}

/**
 * Generates an SEO-optimized meta description for a project detail page.
 *
 * ~150 chars, includes: name, area, category, technology, CTA with calculator.
 * Optionally includes garage info and room count for richer snippets.
 */
export function generateProjectSeoDescription(project: Project): string {
  const area = Math.round(parseSurfaceArea(project.surfaceArea));
  const category = getCategoryLabel(project.category);
  const tech = project.technology.toLowerCase();

  // Build feature chips: garage, rooms
  const features: string[] = [];
  if (project.garage && !project.garage.includes('brak')) {
    features.push(`garaż ${project.garage}`);
  }
  if (project.roomCount && project.roomCount > 0) {
    features.push(`${project.roomCount} pokoi`);
  }
  const featuresStr = features.length > 0 ? ` ${features.join(', ')}.` : '';

  return `Projekt domu ${project.title} – ${area} m², dom ${category}, technologia: ${tech}.${featuresStr} Wyceń koszt budowy w 60 sekund kalkulatorem online. Rzuty, elewacje, specyfikacja techniczna. CoreLTB Builders.`;
}

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
 * Builds a /wycena URL with pre-filled calculator params extracted from a Project.
 * Maps project data → calculator field values via URL search params.
 */
export function buildCalculatorUrl(project: Project): string {
  const params = new URLSearchParams();

  // 1. Area
  const area = Math.round(parseSurfaceArea(project.surfaceArea));
  if (area >= 80 && area <= 500) params.set('area', String(area));

  // 2. Floors — map category → calculator FloorType
  const floorsMap: Record<string, string> = {
    parterowy: 'parterowy',
    'z-poddaszem': 'poddasze',
    pietrowy: 'pietrowy',
    dwulokalowy: 'pietrowy',
    jednorodzinny: 'parterowy',
  };
  if (floorsMap[project.category]) params.set('floors', floorsMap[project.category]);

  // 3. Wall type — always silikat (CoreLTB standard)
  params.set('wallType', 'silikat');

  // 4. Roof type — extract from specifications "Rodzaj dachu"
  const roofSpec = project.specifications
    .flatMap(tab => tab.items)
    .find(item => item.label === 'Rodzaj dachu');
  if (roofSpec) {
    const roofMap: Record<string, string> = {
      dwuspadowy: 'dwuspadowy',
      czterospadowy: 'wielospadowy',
      kopertowy: 'wielospadowy',
      wielospadowy: 'wielospadowy',
    };
    const mapped = roofMap[roofSpec.value.toLowerCase()];
    if (mapped) params.set('roofType', mapped);
  }
  // Z500: infer from angle — ≤5° = flat
  if (!params.has('roofType')) {
    const angleSpec = project.specifications
      .flatMap(tab => tab.items)
      .find(item => item.label === 'Kąt nachylenia dachu');
    if (angleSpec) {
      const angle = parseFloat(angleSpec.value);
      if (!isNaN(angle)) {
        params.set('roofType', angle <= 5 ? 'plaski' : 'dwuspadowy');
      }
    }
  }

  // 5. Garage — map project.garage string → calculator GarageType
  //    GaleriaDomów: has `project.garage` field ('1-stanowiskowy' / '2-stanowiskowy' / 'wiata garażowa')
  //    Z500: no `garage` field, but has 'Powierzchnia garażu' in specs or 'Garaż' in floorPlans
  if (project.garage) {
    if (project.garage.includes('2-stanowiskowy')) {
      params.set('garage', 'dwustanowiskowy');
    } else if (project.garage.includes('1-stanowiskowy')) {
      params.set('garage', 'jednostanowiskowy');
    } else {
      params.set('garage', 'brak');
    }
  } else {
    // Fallback: check specifications for "Powierzchnia garażu" or floorPlans for "Garaż"
    const garageSpec = project.specifications
      .flatMap(tab => tab.items)
      .find(item => item.label.toLowerCase().includes('garażu'));
    const garageRoom = project.floorPlans
      .flatMap(fp => fp.rooms)
      .find(room => room.name.toLowerCase().includes('garaż'));

    if (garageSpec || garageRoom) {
      // Infer size from area: >30m² = dwustanowiskowy, else jednostanowiskowy
      const areaStr = garageSpec?.value || garageRoom?.area || '';
      const garageArea = parseFloat(areaStr.replace(',', '.'));
      params.set('garage', !isNaN(garageArea) && garageArea > 30 ? 'dwustanowiskowy' : 'jednostanowiskowy');
    } else {
      params.set('garage', 'brak');
    }
  }

  // 6. Foundation — Z500 has "Posadowienie", GaleriaDomów doesn't; default to ławy
  const foundationSpec = project.specifications
    .flatMap(tab => tab.items)
    .find(item => item.label === 'Posadowienie');
  if (foundationSpec && foundationSpec.value.toLowerCase().includes('płyta')) {
    params.set('foundation', 'plyta');
  } else {
    params.set('foundation', 'lawy');
  }

  // 7. Basement — default to brak (no data in projects)
  params.set('basement', 'brak');

  // 8. Project name — pass to calculator for display in estimate
  if (project.title) params.set('projekt', project.title);

  return `/wycena?${params.toString()}`;
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
    hasGarage: !!project.garage && project.garage.length > 0,
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

    // Category filter — 'pietrowy' matches projects with category 'z-poddaszem', 'dwulokalowy', or 'jednorodzinny'
    if (filters.category.length > 0) {
      const multiStoryCategories = ['z-poddaszem', 'dwulokalowy', 'jednorodzinny'];
      const matchesCategory = filters.category.some(cat => {
        if (cat === 'pietrowy') return multiStoryCategories.includes(project.category);
        return cat === project.category;
      });
      if (!matchesCategory) return false;
    }

    if (filters.source.length > 0 && !filters.source.includes(project.source as ProjectSource)) return false;

    // Garage filter
    if (filters.garage.length > 0) {
      const wantsWithGarage = filters.garage.includes('z-garazem');
      const wantsWithoutGarage = filters.garage.includes('bez-garazu');
      // If both selected, show everything (no filter)
      if (!(wantsWithGarage && wantsWithoutGarage)) {
        if (wantsWithGarage && !project.hasGarage) return false;
        if (wantsWithoutGarage && project.hasGarage) return false;
      }
    }

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
    case 'mixed': {
      // Balanced deterministic shuffle — ensures smaller sources (Z500) get fair
      // visibility on page 1, then fills remaining slots with larger sources.
      // Uses slug-based hash for stable, random-looking order within each source.
      const PAGE = 24;
      const hash = (s: string): number => {
        let h = 0x9e3779b9;
        for (let i = 0; i < s.length; i++) {
          h = Math.imul(h ^ s.charCodeAt(i), 0x5bd1e995);
          h ^= h >>> 15;
        }
        return h >>> 0;
      };

      // Group by source, shuffle each group deterministically
      const groups = new Map<string, ProjectListingItem[]>();
      for (const p of sorted) {
        const src = p.source || 'other';
        if (!groups.has(src)) groups.set(src, []);
        groups.get(src)!.push(p);
      }
      for (const arr of groups.values()) {
        arr.sort((a, b) => hash(a.slug) - hash(b.slug));
      }

      // Sort sources: smallest first (so they get guaranteed slots)
      const sources = [...groups.entries()].sort((a, b) => a[1].length - b[1].length);
      const totalSources = sources.length;

      // Allocate per-page slots: each source gets at least floor(PAGE / totalSources)
      // but at most its own length. Remainder goes to larger sources.
      const perPage = Math.floor(PAGE / totalSources); // e.g. 24/3 = 8
      const allocations = new Map<string, number>();
      let remaining = PAGE;

      for (const [src, arr] of sources) {
        const take = Math.min(perPage, arr.length);
        allocations.set(src, take);
        remaining -= take;
      }
      // Distribute leftover slots to larger sources (last = largest)
      for (let i = sources.length - 1; i >= 0 && remaining > 0; i--) {
        const [src, arr] = sources[i];
        const current = allocations.get(src)!;
        const canTake = Math.min(remaining, arr.length - current);
        allocations.set(src, current + canTake);
        remaining -= canTake;
      }

      // Build result: for each page-worth, take allocated amounts then shuffle together
      const result: ProjectListingItem[] = [];
      const cursors = new Map<string, number>(sources.map(([src]) => [src, 0]));
      const totalProjects = sorted.length;

      while (result.length < totalProjects) {
        const pageBatch: ProjectListingItem[] = [];

        for (const [src, arr] of sources) {
          const cursor = cursors.get(src)!;
          const remaining = arr.length - cursor;
          const take = Math.min(allocations.get(src)!, remaining);
          for (let i = 0; i < take; i++) {
            pageBatch.push(arr[cursor + i]);
          }
          cursors.set(src, cursor + take);
        }

        // Shuffle the page batch deterministically so sources don't form columns
        pageBatch.sort((a, b) => hash(a.slug + String(result.length)) - hash(b.slug + String(result.length)));
        result.push(...pageBatch);
      }

      return result;
    }
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
  filterType: 'technology' | 'category' | 'source' | 'garage',
  value: string
): number {
  if (filterType === 'garage') {
    if (value === 'z-garazem') return projects.filter(p => p.hasGarage).length;
    if (value === 'bez-garazu') return projects.filter(p => !p.hasGarage).length;
    return 0;
  }
  // 'pietrowy' matches multi-story categories
  if (filterType === 'category' && value === 'pietrowy') {
    return projects.filter(p => ['z-poddaszem', 'dwulokalowy', 'jednorodzinny'].includes(p.category)).length;
  }
  return projects.filter(p => p[filterType] === value).length;
}
