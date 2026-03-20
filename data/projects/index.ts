// data/projects/index.ts
// Centralny punkt wejścia — łączy wszystkie źródła projektów i re-exportuje API

// Re-export typów i stałych
export type {
  Project,
  ProjectSpecificationItem,
  ProjectSpecificationTab,
  Room,
  FloorPlan,
  ProjectCostItem,
  ProjectCostTable,
  ProjectCategory,
  ProjectTechnology,
  ProjectSource,
  SortOption,
  SurfaceRange,
  ProjectFilters,
  ProjectListingItem,
  GarageFilter,
} from './types';

export {
  projectCategories,
  projectTechnologies,
  projectSources,
  garageOptions,
  surfaceRanges,
  sortOptions,
} from './types';

// Re-export helperów
export {
  parseEstimatedCost,
  parseSurfaceArea,
  buildCalculatorUrl,
  toListingItem,
  filterProjects,
  sortProjects,
  countProjectsByFilter,
} from './helpers';

// --- Źródła projektów ---
import type { Project } from './types';
import { galeriadomowProjects } from './galeriadomow';
import { z500Projects } from './z500';

// --- Złączona tablica wszystkich projektów ---
// Z500 pierwsze (mniejszy katalog, wyższa jakość wizualizacji), potem Galeria Domów
export const allProjects: Project[] = [
  ...z500Projects,
  ...galeriadomowProjects,
];

// --- Lookup helpers ---
export const getProjectBySlug = (slug: string): Project | undefined =>
  allProjects.find((p) => p.slug === slug);

export function getAllProjectSlugs(): string[] {
  return allProjects.map(p => p.slug);
}
