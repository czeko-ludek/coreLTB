/** Source agency/portal for the plot listing */
export type PlotSource = 'l-r' | 'optima' | 'dom-ex' | 'viphouse';

export const plotSources: { id: PlotSource; label: string; color: string }[] = [
  { id: 'l-r', label: 'L-R Nieruchomości', color: '#2563eb' },
  { id: 'optima', label: 'Optima Nieruchomości', color: '#7c3aed' },
  { id: 'dom-ex', label: 'Domex Nieruchomości', color: '#059669' },
  { id: 'viphouse', label: 'VipHouse Nieruchomości', color: '#dc2626' },
];

export interface PlotMedia {
  water: boolean;
  electricity: boolean;
  gas: boolean;
  sewer: boolean;
}

/** Extended media with detail strings from source (e.g. "jest", "mozliwosc podlaczenia", "brak") */
export interface PlotMediaDetails {
  water?: string;
  electricity?: string;
  gas?: string;
  sewer?: string;
  fiber?: string;
}

export interface Plot {
  slug: string;
  title: string;
  city: string;
  district?: string;
  address: string;
  /** Street name extracted from listing (e.g. "ul. Janowska") */
  street?: string;
  area: number;
  price: number;
  pricePerM2: number;
  mpzp: 'tak' | 'nie' | 'nie_wiem';
  /** MPZP symbol if available (e.g. "H.MN15") */
  mpzpSymbol?: string;
  media: PlotMedia;
  /** Detailed media status strings from source */
  mediaDetails?: PlotMediaDetails;
  plotShape: string;
  terrain: string;
  access: string;
  /** Plot dimensions e.g. "29/42 m" */
  dimensions?: string;
  /** Legal status e.g. "wlasnosc" */
  legalStatus?: string;
  /** Land purpose e.g. "mieszkaniowa jednorodzinna" */
  purpose?: string;
  /** Development status e.g. "niezagospodarowana" */
  development?: string;
  /** Fencing e.g. "brak", "pelne" */
  fencing?: string;
  /** Surroundings e.g. "niezabudowane" */
  surroundings?: string;
  /** Location type e.g. "obrzeza miasta" */
  locationType?: string;
  buildingConditions?: string;
  description: string;
  thumbnailSrc: string;
  images: string[];
  coordinates: { lat: number; lng: number };
  availability: 'dostepna' | 'rezerwacja' | 'sprzedana';
  dateAdded: number;
  /** Original listing URL (for reference) */
  sourceUrl?: string;
  /** Reference ID from source (e.g. BPP-GS-XXX) */
  refId?: string;
  /** Source agency/portal */
  source?: PlotSource;
}

export type PlotSortBy = 'mixed' | 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';

export interface PlotFilters {
  city?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  availability?: 'dostepna' | 'rezerwacja' | 'sprzedana';
  source?: PlotSource;
  sortBy?: PlotSortBy;
}
