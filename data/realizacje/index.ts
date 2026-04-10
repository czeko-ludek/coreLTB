/**
 * REALIZACJE — Public API
 * Merges all realization projects, exports listing + detail accessors.
 */

import type { RealizationData, RealizationListingItem } from './types';
import { zabrze2024 } from './projects/zabrze-2024';

// ─── All realizations ────────────────────────────────────────

const allRealizationsRaw: RealizationData[] = [
  zabrze2024,
  // Add new realizations here:
];

// ─── Derived listing items ───────────────────────────────────

function toListingItem(r: RealizationData): RealizationListingItem {
  const documentedStages = r.stages.filter(
    (s) => s.narrative.length > 0 && s.images.length > 0
  ).length;

  // For completed projects all stages are done; for in-progress use documented count
  const completedStages = r.project.status === 'completed'
    ? r.stages.length
    : documentedStages;

  // Progress: use explicit override from project data, else derive from stages
  const progress = r.project.progress
    ?? (r.project.status === 'completed'
      ? 100
      : Math.round((completedStages / r.stages.length) * 100));

  const lastCompletedStage = r.stages
    .filter((s) => s.narrative.length > 0)
    .sort((a, b) => b.order - a.order)[0];

  return {
    slug: r.slug,
    title: r.project.title,
    location: r.project.location,
    city: r.project.city,
    surfaceArea: r.project.surfaceArea,
    floors: r.project.floors,
    technology: r.project.technology,
    roofType: r.project.roofType,
    status: r.project.status,
    heroImage: r.project.heroImage,
    stagesTotal: r.stages.length,
    stagesCompleted: completedStages,
    progress,
    currentStage: lastCompletedStage?.title,
    startDate: r.project.startDate,
    endDate: r.project.endDate,
  };
}

// ─── Public API ──────────────────────────────────────────────

export const allRealizations: RealizationData[] = allRealizationsRaw;

export const allRealizationListings: RealizationListingItem[] =
  allRealizationsRaw.map(toListingItem);

export function getRealizationBySlug(slug: string): RealizationData | undefined {
  return allRealizationsRaw.find((r) => r.slug === slug);
}

export function getAllRealizationSlugs(): string[] {
  return allRealizationsRaw.map((r) => r.slug);
}

// Re-export types
export type { RealizationData, RealizationListingItem } from './types';
