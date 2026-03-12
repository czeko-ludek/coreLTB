/**
 * LOCAL PAGES — Public API
 * Merge shared template + city-specific data → ResolvedLocalPageData
 */

import type { CityData, ResolvedLocalPageData } from './types';
import { sharedTemplate } from './shared-template';

// ── City imports ──
import { rybnikData } from './cities/rybnik';
import { wodzislawData } from './cities/wodzislaw-slaski';
import { tychyData } from './cities/tychy';
import { katowiceData } from './cities/katowice';
import { jaworznoData } from './cities/jaworzno';
import { mikolowData } from './cities/mikolow';
import { gliwiceData } from './cities/gliwice';

// ── Registry ──
const allCities: CityData[] = [
  rybnikData,
  wodzislawData,
  tychyData,
  katowiceData,
  jaworznoData,
  mikolowData,
  gliwiceData,
];

// ─── Placeholder Replacement ──────────────────────────────────────

type Replacements = Record<string, string>;

/**
 * Deep-replace placeholders like {cityName} in all strings
 * within objects, arrays, and primitives.
 */
function replacePlaceholders<T>(value: T, replacements: Replacements): T {
  if (typeof value === 'string') {
    let result: string = value;
    for (const [key, replacement] of Object.entries(replacements)) {
      result = result.replaceAll(`{${key}}`, replacement);
    }
    return result as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => replacePlaceholders(item, replacements)) as T;
  }

  if (value !== null && typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value)) {
      result[key] = replacePlaceholders(val, replacements);
    }
    return result as T;
  }

  return value;
}

// ─── Merge Logic ──────────────────────────────────────────────────

function resolveLocalPage(city: CityData): ResolvedLocalPageData {
  const replacements: Replacements = {
    cityName: city.cityName,
    cityNameLocative: city.cityNameLocative,
  };

  // Resolve shared template with city-specific placeholders
  const shared = replacePlaceholders(sharedTemplate, replacements);

  // Auto-generate breadcrumbs
  const breadcrumbs = [
    { label: 'Strona główna', href: '/' },
    { label: 'Obszar działania', href: '/obszar-dzialania' },
    { label: `Budowa domów ${city.cityName}`, href: '' },
  ];

  // Determine whyUs: city override or shared default
  const whyUs = city.whyUsOverride
    ? {
        label: city.whyUsOverride.label ?? shared.whyUs.label,
        title: city.whyUsOverride.title ?? shared.whyUs.title,
        competencies: city.whyUsOverride.competencies,
      }
    : shared.whyUs;

  return {
    slug: city.slug,
    cityName: city.cityName,
    cityNameLocative: city.cityNameLocative,

    metaTitle: city.meta.title,
    metaDescription: city.meta.description,

    pageHeader: {
      ...city.pageHeader,
      breadcrumbs,
    },

    emotionalHero: city.emotionalHero,
    partnerLogos: shared.partnerLogos,
    servicePillars: shared.servicePillars,
    midCTA: {
      ...shared.midCTA,
      image: city.pageHeader.backgroundImage,
    },
    expertise: city.expertise,
    whyUs,
    districts: city.districts,
    faq: city.faq,

    additionalSections: city.additionalSections,
    nearbyCities: city.nearbyCities,

    areaServed: city.areaServed,
    geoCoordinates: city.geoCoordinates,
  };
}

// ─── Pre-resolve all cities ───────────────────────────────────────

const resolvedPages: Map<string, ResolvedLocalPageData> = new Map();

for (const city of allCities) {
  resolvedPages.set(city.slug, resolveLocalPage(city));
}

// ─── Public API ───────────────────────────────────────────────────

export function getLocalPageBySlug(slug: string): ResolvedLocalPageData | undefined {
  return resolvedPages.get(slug);
}

export function getAllLocalPageSlugs(): string[] {
  return allCities.map((c) => c.slug);
}

// Re-export types for convenience
export type {
  ResolvedLocalPageData,
  CityData,
  FAQItem,
  ContentBlock,
  ExpertiseCard,
  ServicePillar,
  MidPageCTAData,
  PartnerLogoItem,
  WhyUsPoint,
  District,
  NearbyCityLink,
  AdditionalSection,
} from './types';
