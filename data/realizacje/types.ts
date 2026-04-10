/**
 * REALIZACJE (Case Studies / Construction Diary)
 * Type definitions for the scalable realization system.
 */

import type { IconName } from '@/components/ui/Icon';
import type { SectionHeaderProps } from '@/components/shared/SectionHeader';

// ─── Stage Image ─────────────────────────────────────────────

export interface StageImage {
  src: string;
  alt: string;
  caption?: string;
}

// ─── Technical Fact ──────────────────────────────────────────

export interface TechnicalFact {
  label: string;
  value: string;
  icon?: IconName;
}

// ─── Expert Insight (SEO gold) ───────────────────────────────

export interface ExpertInsight {
  title: string;
  content: string[];
  linkTo?: string;
  linkLabel?: string;
}

// ─── Challenge / Decision (storytelling) ─────────────────────

export interface StageChallenge {
  title: string;
  description: string;
  solution: string;
}

// ─── Build Stage (core diary entry) ──────────────────────────

export interface BuildStage {
  id: string;
  order: number;
  title: string;
  icon: IconName;
  dateLabel: string;
  duration?: string;

  /** Narrative paragraphs — the diary story */
  narrative: string[];

  /** Stage photos (min 1) */
  images: StageImage[];

  /** Expert knowledge box */
  expertInsight?: ExpertInsight;

  /** Challenge encountered and solution applied */
  challenge?: StageChallenge;

  /** Quick technical facts bar */
  technicalFacts?: TechnicalFact[];
}

// ─── Project Info Card (header) ──────────────────────────────

export interface ProjectCard {
  title: string;
  location: string;
  city: string;
  surfaceArea: number;
  floors: string;
  technology: string;
  roofType: string;
  projectSource?: string;
  projectSlug?: string;
  startDate: string;
  endDate?: string;
  status: 'in-progress' | 'completed';
  heroImage: string;
  /** Overall build progress 0–100 (overrides heuristic when provided) */
  progress?: number;
}

// ─── Mid-build CTA ──────────────────────────────────────────

export interface MidBuildCTA {
  afterStageOrder: number;
  variant: 'calculator' | 'consultation' | 'plot';
  headline: string;
  description: string;
}

// ─── FAQ Item ────────────────────────────────────────────────

export interface RealizationFAQItem {
  question: string;
  content: Array<{ type: 'paragraph'; value: string } | { type: 'list'; items: string[] }>;
}

// ─── Client Testimonial ─────────────────────────────────────

export interface ClientTestimonial {
  text: string;
  author: string;
  role?: string;
}

// ─── Summary ─────────────────────────────────────────────────

export interface RealizationSummary {
  headline: string;
  description: string[];
  clientTestimonial?: ClientTestimonial;
  stats?: Array<{ label: string; value: string }>;
}

// ─── Full Realization Data ──────────────────────────────────

export interface RealizationData {
  slug: string;

  meta: {
    title: string;
    description: string;
  };

  project: ProjectCard;
  stages: BuildStage[];
  midCTAs?: MidBuildCTA[];

  summary?: RealizationSummary;

  faq?: {
    header: SectionHeaderProps;
    items: RealizationFAQItem[];
  };

  relatedRealizations?: string[];
}

// ─── Listing Card (derived for listing page) ────────────────

export interface RealizationListingItem {
  slug: string;
  title: string;
  location: string;
  city: string;
  surfaceArea: number;
  floors: string;
  technology: string;
  roofType: string;
  status: 'in-progress' | 'completed';
  heroImage: string;
  stagesTotal: number;
  stagesCompleted: number;
  /** Overall build progress 0–100 */
  progress: number;
  currentStage?: string;
  startDate: string;
  endDate?: string;
}
