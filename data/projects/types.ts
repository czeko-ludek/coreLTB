// data/projects/types.ts
// Wszystkie typy i interfejsy związane z projektami

// --- Typy pomocnicze ---

export interface ProjectSpecificationItem {
  label: string;
  value: string;
}

export interface ProjectSpecificationTab {
  title: string;
  items: ProjectSpecificationItem[];
}

export interface Room {
  name: string;
  area: string;
}

export interface FloorPlan {
  name: string;
  area: string;
  image: string;
  rooms: Room[];
}

export interface ProjectCostItem {
  name: string;
  prices: {
    average: string;
    min: string;
  };
}

export interface ProjectCostTable {
  title: string;
  items: ProjectCostItem[];
}

// --- Typy Filtrowania i Sortowania ---

export type ProjectCategory = 'jednorodzinny' | 'dwulokalowy' | 'z-poddaszem' | 'parterowy' | 'pietrowy';
export type ProjectTechnology = 'MUROWANY' | 'DREWNIANY';
export type SortOption = 'mixed' | 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';

/** Źródło/wydawca projektu */
export type ProjectSource = 'galeriadomow' | 'z500' | 'malachit' | 'own';

export interface SurfaceRange {
  id: string;
  label: string;
  min: number;
  max: number | null;
}

/** Filtr garaż */
export type GarageFilter = 'z-garazem' | 'bez-garazu';

export interface ProjectFilters {
  technology: ProjectTechnology[];
  category: ProjectCategory[];
  surfaceRange: string | null;
  source: ProjectSource[];
  garage: GarageFilter[];
}

/**
 * Slim version of Project — only fields needed for the listing page.
 * Passed via RSC from Server Component to 'use client' ProjectsListingSection.
 * Includes precomputed numeric values to avoid repeated string parsing in sort/filter.
 */
export interface ProjectListingItem {
  slug: string;
  id: string;
  title: string;
  category: ProjectCategory;
  technology: ProjectTechnology;
  surfaceArea: string;
  estimatedBuildCost?: string;
  price: string;
  thumbnailSrc?: string;
  source?: ProjectSource;
  /** Timestamp (ms) — używany do sortowania "Najnowsze" */
  dateAdded: number;
  /** Precomputed numeric build cost — fast sort/filter, no string parsing at runtime */
  costNum: number;
  /** Precomputed numeric surface area — fast sort/filter, no string parsing at runtime */
  areaNum: number;
  /** Whether the project includes a garage (precomputed for filtering) */
  hasGarage: boolean;
}

// --- Główny Typ Projektu ---

export interface Project {
  slug: string;
  id: string;
  title: string;
  alt: string;
  price: string;
  availability: string;
  surfaceArea: string;
  estimatedBuildCost?: string;
  technology: ProjectTechnology;
  galleryImageCount: number;
  floorPlans: FloorPlan[];
  specifications: ProjectSpecificationTab[];
  costCalculation?: ProjectCostTable;
  // Filtrowanie
  category: ProjectCategory;
  dateAdded: number;
  thumbnailSrc?: string;
  // Źródło projektu
  source?: ProjectSource;
  // Pola z importu XML (GaleriaDomów)
  elevationImageCount?: number;
  hasCrossSection?: boolean;
  hasSitePlan?: boolean;
  hasMirror?: boolean;
  roomCount?: number;
  bathroomCount?: number;
  garage?: string;
  sourceUrl?: string;
  /** Opis funkcjonalny — plain text (stripped HTML from Z500 short_description) */
  description?: string;
  // Wymiary działki i elewacji (z importu Z500)
  lotWidth?: string;        // "20.66 m"
  lotLength?: string;       // "18.26 m"
  elevationWidth?: string;  // "14.2 m"
}

// --- Stałe Konfiguracyjne ---

export const projectCategories = [
  { id: 'parterowy', label: 'Parterowy' },
  { id: 'pietrowy', label: 'Piętrowy' },
  { id: 'z-poddaszem', label: 'Z poddaszem' },
  { id: 'dwulokalowy', label: 'Dwulokalowy' },
] as const;

export const garageOptions = [
  { id: 'z-garazem', label: 'Z garażem' },
  { id: 'bez-garazu', label: 'Bez garażu' },
] as const;

export const projectTechnologies = [
  { id: 'MUROWANY', label: 'Murowany' },
] as const;

export const projectSources = [
  { id: 'galeriadomow', label: 'Galeria Domów' },
  { id: 'z500', label: 'Z500' },
  { id: 'malachit', label: 'Malachit' },
] as const;

export const surfaceRanges: SurfaceRange[] = [
  { id: '100-150', label: '100–150 m²', min: 100, max: 150 },
  { id: '150-200', label: '150–200 m²', min: 150, max: 200 },
  { id: 'powyzej-200', label: 'powyżej 200 m²', min: 200, max: null },
];

export const sortOptions = [
  { id: 'mixed',      label: 'Polecane' },
  { id: 'newest',     label: 'Najnowsze' },
  { id: 'price-asc',  label: 'Cena rosnąco' },
  { id: 'price-desc', label: 'Cena malejąco' },
  { id: 'area-asc',   label: 'Powierzchnia rosnąco' },
  { id: 'area-desc',  label: 'Powierzchnia malejąco' },
] as const;
