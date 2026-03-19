/**
 * NADZÓR LANDING PAGES — Type Definitions
 * Scalable system for city-specific supervision landing pages.
 * Pattern mirrors data/local/ architecture.
 */

import type { IconName } from '@/components/ui/Icon';
import type { SectionHeaderProps } from '@/components/shared/SectionHeader';

// ─── Content Blocks (reused from local) ──────────────────────────

export type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface FAQItem {
  question: string;
  content: ContentBlock[];
}

// ─── Section Data Shapes ─────────────────────────────────────────

export interface ServiceCard {
  icon: IconName;
  title: string;
  description: string;
}

export interface ExpertiseCard {
  icon: IconName;
  title: string;
  description: string;
  details?: string[];
}

export interface PricingRow {
  service: string;
  price: string;
  model: string;
}

// ─── Shared Template (common across all nadzór cities) ───────────
// Placeholders: {cityName}, {cityNameLocative}

export interface SharedNadzorTemplate {
  emotionalHero: {
    headline: string[];
    ctaBoxBenefits: string[];
    ctaBoxSubtext: string;
    ctaBoxButtons: Array<{
      text: string;
      href?: string;
      variant?: 'primary' | 'secondary';
    }>;
  };

  services: {
    items: ServiceCard[];
  };

  pricing: {
    rows: PricingRow[];
    comparison: {
      title: string;
      description: string;
    };
  };

  trustSignals: {
    items: ServiceCard[];
  };
}

// ─── City-Specific Data (exported by each city file) ─────────────
// Only unique data per city — shared data comes from template

export interface NadzorCityData {
  slug: string;
  cityName: string;
  cityNameLocative: string;

  meta: {
    title: string;
    description: string;
  };

  pageHeader: {
    title: string;
    backgroundImage: string;
  };

  emotionalHero: {
    subtitle: string;
    benefits: string[];
  };

  services: {
    header: SectionHeaderProps;
  };

  /** City-specific expertise (szkody górnicze, PINB, specyfika terenu) */
  localExpertise: {
    header: SectionHeaderProps;
    cards: ExpertiseCard[];
    image?: { src: string; alt: string };
  };

  /** Pricing — only city-specific note */
  pricing: {
    note: string;
  };

  /** Districts / service area — dzielnice i logistyka */
  districts: {
    header: SectionHeaderProps;
    description: string;
    items: string[];
  };

  /** FAQ with FAQ schema */
  faq: {
    header: SectionHeaderProps;
    items: FAQItem[];
  };

  /** Cross-links to related pages */
  relatedLinks: {
    mainServicePage: string;
    localBuildPage?: string;
  };

  /** Schema.org */
  areaServed: string[];
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}

// ─── Resolved Page Data (result of merge) ────────────────────────

export interface ResolvedNadzorPageData {
  slug: string;
  cityName: string;
  cityNameLocative: string;

  metaTitle: string;
  metaDescription: string;

  pageHeader: {
    title: string;
    backgroundImage: string;
    breadcrumbs: Array<{ label: string; href: string }>;
  };

  emotionalHero: {
    label: string;
    headline: string[];
    subtitle: string;
    benefits: string[];
    ctaBoxTitle: string;
    ctaBoxBenefits: string[];
    ctaBoxSubtext: string;
    ctaBoxButtons: Array<{
      text: string;
      href?: string;
      variant?: 'primary' | 'secondary';
    }>;
  };

  services: {
    header: SectionHeaderProps;
    items: ServiceCard[];
  };

  localExpertise: {
    header: SectionHeaderProps;
    cards: ExpertiseCard[];
    image?: { src: string; alt: string };
  };

  pricing: {
    header: SectionHeaderProps;
    rows: PricingRow[];
    note: string;
    comparison: {
      title: string;
      description: string;
    };
  };

  districts: {
    header: SectionHeaderProps;
    description: string;
    items: string[];
  };

  trustSignals: {
    header: SectionHeaderProps;
    items: ServiceCard[];
  };

  faq: {
    header: SectionHeaderProps;
    items: FAQItem[];
  };

  relatedLinks: {
    mainServicePage: string;
    localBuildPage?: string;
  };

  areaServed: string[];
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}
