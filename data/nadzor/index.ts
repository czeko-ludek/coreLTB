/**
 * NADZÓR LANDING PAGES — Public API
 * Merge shared template + city-specific data → ResolvedNadzorPageData
 * Pattern mirrors data/local/index.ts
 */

import type { NadzorCityData, ResolvedNadzorPageData } from './types';
import { sharedNadzorTemplate } from './shared-template';

// ── City imports ──
import { katowiceNadzorData } from './cities/katowice';
import { wodzislawNadzorData } from './cities/wodzislaw-slaski';
import { jaworznoNadzorData } from './cities/jaworzno';

// ── Registry ──
const allNadzorCities: NadzorCityData[] = [
  katowiceNadzorData,
  wodzislawNadzorData,
  jaworznoNadzorData,
];

// ─── Placeholder replacement ───────────────────────────────────

function r(text: string, cityName: string, cityNameLocative: string): string {
  return text
    .replace(/\{cityName\}/g, cityName)
    .replace(/\{cityNameLocative\}/g, cityNameLocative);
}

// ─── Resolve Logic ─────────────────────────────────────────────

function resolveNadzorPage(city: NadzorCityData): ResolvedNadzorPageData {
  const { cityName, cityNameLocative } = city;
  const tpl = sharedNadzorTemplate;

  const breadcrumbs = [
    { label: 'Strona główna', href: '/' },
    { label: 'Nadzór i doradztwo', href: '/oferta/nadzor-i-doradztwo' },
    { label: `Kierownik budowy ${cityName}`, href: '' },
  ];

  return {
    slug: city.slug,
    cityName,
    cityNameLocative,

    metaTitle: city.meta.title,
    metaDescription: city.meta.description,

    pageHeader: {
      ...city.pageHeader,
      breadcrumbs,
    },

    emotionalHero: {
      label: `KIEROWNIK BUDOWY • INSPEKTOR NADZORU • ${cityName.toUpperCase()}`,
      headline: tpl.emotionalHero.headline.map((line) =>
        r(line, cityName, cityNameLocative)
      ),
      subtitle: city.emotionalHero.subtitle,
      benefits: city.emotionalHero.benefits,
      ctaBoxTitle: `Zamów nadzór budowy w ${cityNameLocative}`,
      ctaBoxBenefits: tpl.emotionalHero.ctaBoxBenefits,
      ctaBoxSubtext: tpl.emotionalHero.ctaBoxSubtext,
      ctaBoxButtons: tpl.emotionalHero.ctaBoxButtons,
    },

    services: {
      header: city.services.header,
      items: tpl.services.items,
    },

    localExpertise: city.localExpertise,

    pricing: {
      header: {
        label: 'CENNIK NADZORU 2026',
        title: `Ile kosztuje kierownik budowy w ${cityNameLocative}?`,
        description:
          'Transparentny cennik zaktualizowany na 2026 rok. Wycena na podstawie projektu budowlanego jest zawsze darmowa.',
        align: 'center',
        theme: 'light',
      },
      rows: tpl.pricing.rows,
      note: city.pricing.note,
      comparison: tpl.pricing.comparison,
    },

    districts: city.districts,

    trustSignals: {
      header: {
        label: 'DLACZEGO CORELTB BUILDERS',
        title: `Gwarancje, które dajemy inwestorom w ${cityNameLocative}`,
        description:
          'Wybór inżyniera nadzorującego to najważniejsza decyzja wpływająca na bezpieczeństwo Twojego majątku. Nie uznajemy kompromisów z wykonawcami.',
        align: 'center',
        theme: 'light',
      },
      items: tpl.trustSignals.items,
    },

    faq: city.faq,
    relatedLinks: city.relatedLinks,

    areaServed: city.areaServed,
    geoCoordinates: city.geoCoordinates,
  };
}

// ─── Pre-resolve all cities ──────────────────────────────────────

const resolvedPages: Map<string, ResolvedNadzorPageData> = new Map();

for (const city of allNadzorCities) {
  resolvedPages.set(city.slug, resolveNadzorPage(city));
}

// ─── Public API ──────────────────────────────────────────────────

export function getNadzorPageBySlug(
  slug: string
): ResolvedNadzorPageData | undefined {
  return resolvedPages.get(slug);
}

export function getAllNadzorSlugs(): string[] {
  return allNadzorCities.map((c) => c.slug);
}

// Re-export types
export type {
  ResolvedNadzorPageData,
  NadzorCityData,
  FAQItem,
  ContentBlock,
  ServiceCard,
  ExpertiseCard,
  PricingRow,
} from './types';
