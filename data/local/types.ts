/**
 * LOCAL PAGES — Central Type Definitions
 * Single Source of Truth for the scalable local pages system.
 */

import type { IconName } from '@/components/ui/Icon';
import type { SectionHeaderProps } from '@/components/shared/SectionHeader';

// ─── Content Blocks ───────────────────────────────────────────────

/** Reusable rich-text block (paragraph or list). Supports **bold** and [link](url) markdown. */
export type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

/** FAQ item with structured answer (ContentBlock[]) */
export interface FAQItem {
  question: string;
  content: ContentBlock[];
}

// ─── Section Data Shapes ──────────────────────────────────────────

export interface ServicePillar {
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  linkText: string;
}

export interface ExpertiseCard {
  icon: IconName;
  title: string;
  description: string;
  details?: string[];
}

export interface MidPageCTAData {
  headline: string;
  highlightedText: string;
  phone: string;
  image?: string;
  buttons: Array<{
    text: string;
    href: string;
    variant: 'primary' | 'outline-white';
  }>;
}

export interface PartnerLogoItem {
  name: string;
  image?: string;
}

export interface WhyUsPoint {
  icon: IconName;
  title: string;
  description: string;
}

export interface District {
  label: string;
  href?: string;
}

export interface NearbyCityLink {
  name: string;
  slug: string;
  context?: string;
}

/** Optional additional expertise section (energooszczednosc, formalnosci, etc.) */
export interface AdditionalSection {
  id: string;
  header: SectionHeaderProps;
  cards: ExpertiseCard[];
  image?: { src: string; alt: string };
}

// ─── City-Specific Data (exported by each city file) ──────────────

export interface CityData {
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

  /** City-specific expertise cards (local specifics) */
  expertise: {
    header: SectionHeaderProps;
    cards: ExpertiseCard[];
    image: { src: string; alt: string };
  };

  /** Optional WhyUs override — if omitted, shared whyUs is used */
  whyUsOverride?: {
    label?: string;
    title?: string;
    competencies: WhyUsPoint[];
  };

  districts: {
    header: SectionHeaderProps;
    items: District[];
    hubDescription: string;
  };

  faq: {
    header: SectionHeaderProps;
    items: FAQItem[];
  };

  /** Optional additional sections (e.g. energooszczednosc, formalnosci) */
  additionalSections?: AdditionalSection[];

  /** Nearby cities for SEO interlinking */
  nearbyCities?: NearbyCityLink[];

  /** Schema.org data */
  areaServed: string[];
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}

// ─── Shared Template (with placeholders) ──────────────────────────

export interface SharedLocalTemplate {
  partnerLogos: PartnerLogoItem[];

  servicePillars: {
    header: SectionHeaderProps;
    pillars: ServicePillar[];
  };

  midCTA: MidPageCTAData;

  whyUs: {
    label: string;
    title: string;
    competencies: WhyUsPoint[];
  };
}

// ─── Resolved Page Data (result of merge) ─────────────────────────

export interface ResolvedLocalPageData {
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

  partnerLogos: PartnerLogoItem[];

  servicePillars: {
    header: SectionHeaderProps;
    pillars: ServicePillar[];
  };

  midCTA: MidPageCTAData;

  expertise: {
    header: SectionHeaderProps;
    cards: ExpertiseCard[];
    image: { src: string; alt: string };
  };

  whyUs: {
    label: string;
    title: string;
    competencies: WhyUsPoint[];
  };

  districts: {
    header: SectionHeaderProps;
    items: District[];
    hubDescription: string;
  };

  faq: {
    header: SectionHeaderProps;
    items: FAQItem[];
  };

  additionalSections?: AdditionalSection[];
  nearbyCities?: NearbyCityLink[];

  areaServed: string[];
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}
