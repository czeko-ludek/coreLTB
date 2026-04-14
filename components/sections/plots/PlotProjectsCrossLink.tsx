'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui';
import { allProjects } from '@/data/projects';
import { getProjectThumbnail } from '@/data/projects/helpers';
import { trackCrossLinkClick } from '@/lib/analytics';
import type { Plot } from '@/data/plots/types';
import type { Project } from '@/data/projects/types';

interface PlotProjectsCrossLinkProps {
  plot: Plot;
}

const CATEGORY_LABELS: Record<string, string> = {
  parterowy: 'Parterowy',
  pietrowy: 'Piętrowy',
  'z-poddaszem': 'Z poddaszem',
  dwulokalowy: 'Dwulokalowy',
  jednorodzinny: 'Jednorodzinny',
};

// ─── Helpers: parse dimensions ──────────────────────────

/** Parse plot dimensions string → [width, length] in meters (shorter side = width) */
function parsePlotDimensions(dims?: string): { width: number; length: number } | null {
  if (!dims) return null;
  // Formats: "29/42 m", "22X62 m", "30 x 31,5 m", "19/22 m"
  // For irregular plots like "43/191/48/163 m" — take min and max
  const numbers = dims.match(/[\d]+[,.]?[\d]*/g);
  if (!numbers || numbers.length < 2) return null;

  const parsed = numbers.map((n) => parseFloat(n.replace(',', '.')));
  const width = Math.min(...parsed);
  const length = Math.max(...parsed);

  if (width < 5 || length < 5 || isNaN(width) || isNaN(length)) return null;
  return { width, length };
}

/** Get minimum plot dimensions required by a project → [width, length] */
function getProjectMinPlotDims(project: Project): { width: number; length: number } | null {
  // Z500: dedicated fields
  if (project.lotWidth && project.lotLength) {
    const w = parseFloat(project.lotWidth.replace(',', '.'));
    const l = parseFloat(project.lotLength.replace(',', '.'));
    if (w > 0 && l > 0) return { width: Math.min(w, l), length: Math.max(w, l) };
  }

  // GaleriaDomów: spec "Minimalne wymiary działki" → "19.05 x 22.15 m"
  for (const tab of project.specifications) {
    for (const item of tab.items) {
      if (item.label === 'Minimalne wymiary działki') {
        const numbers = item.value.match(/[\d]+[,.]?[\d]*/g);
        if (numbers && numbers.length >= 2) {
          const parsed = numbers.map((n) => parseFloat(n.replace(',', '.')));
          const w = Math.min(...parsed);
          const l = Math.max(...parsed);
          if (w > 0 && l > 0) return { width: w, length: l };
        }
      }
    }
  }

  return null;
}

/** Check if a project fits on a plot by dimensions (with 1m tolerance) */
function projectFitsOnPlot(
  projectDims: { width: number; length: number },
  plotDims: { width: number; length: number },
): boolean {
  const TOLERANCE = 1; // 1m margin
  return (
    projectDims.width <= plotDims.width + TOLERANCE &&
    projectDims.length <= plotDims.length + TOLERANCE
  );
}

/**
 * Cross-link section on plot detail pages.
 * Shows 3 matching projects that actually fit on this plot by dimensions.
 * Falls back to area-based matching if plot has no dimensions.
 */
export function PlotProjectsCrossLink({ plot }: PlotProjectsCrossLinkProps) {
  const matchedProjects = useMemo(() => {
    const plotDims = parsePlotDimensions(plot.dimensions);

    const parseSurface = (s: string) => {
      const match = s.match(/[\d,.]+/);
      return match ? parseFloat(match[0].replace(',', '.')) : 0;
    };

    // Area-based pre-filter (rule of thumb: house = 10-35% of plot)
    const maxHouseArea = Math.round(plot.area * 0.35);
    const minHouseArea = Math.round(plot.area * 0.1);

    type ScoredProject = { project: Project; score: number };
    const scored: ScoredProject[] = [];

    for (const p of allProjects) {
      if (p.availability === 'niedostepny') continue;

      const houseArea = parseSurface(p.surfaceArea);
      if (houseArea < minHouseArea || houseArea > maxHouseArea) continue;

      let score = 0;

      // +10 for having gallery images
      if (p.galleryImageCount > 0) score += 10;

      // Dimension matching — the key improvement
      const projDims = getProjectMinPlotDims(p);
      if (plotDims && projDims) {
        if (projectFitsOnPlot(projDims, plotDims)) {
          score += 50; // strong signal: project actually fits
          // Bonus for tighter fit (less wasted space)
          const fitRatio = (projDims.width * projDims.length) / (plotDims.width * plotDims.length);
          score += Math.round(fitRatio * 20); // 0-20 bonus
        } else {
          score -= 100; // project doesn't fit — exclude
        }
      }

      // Prefer projects closer to ideal house size (~20% of plot)
      const idealArea = plot.area * 0.2;
      const areaDistance = Math.abs(houseArea - idealArea) / idealArea;
      score += Math.round((1 - Math.min(areaDistance, 1)) * 15);

      if (score >= 0) {
        scored.push({ project: p, score });
      }
    }

    // Sort by score descending, take top 3
    scored.sort((a, b) => b.score - a.score);
    const candidates = scored.slice(0, 3).map((s) => s.project);

    // Fallback: if < 3 matches, fill with popular projects
    if (candidates.length < 3) {
      const fallbacks = allProjects
        .filter((p) =>
          p.availability !== 'niedostepny' &&
          p.galleryImageCount > 0 &&
          !candidates.find((c) => c.slug === p.slug)
        )
        .slice(0, 3 - candidates.length);
      return [...candidates, ...fallbacks];
    }

    return candidates;
  }, [plot.area, plot.dimensions]);

  if (matchedProjects.length === 0) return null;

  return (
    <section className="py-10 md:py-14 px-4 sm:px-6 lg:px-8 bg-zinc-50">
      <div className="mx-auto max-w-[96rem]">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
            <Icon name="home" size="md" className="text-primary" />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-text-primary">
            Projekty domów na tę działkę
          </h2>
        </div>
        <p className="text-text-secondary mb-6 ml-[52px]">
          Działka {plot.area} m² — sprawdź projekty, które możesz na niej postawić
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {matchedProjects.map((project) => {
            const thumbnail = getProjectThumbnail(project);
            const categoryLabel = CATEGORY_LABELS[project.category] || project.category;
            const parsedArea = project.surfaceArea.match(/[\d,.]+/)?.[0] || project.surfaceArea;

            return (
              <Link
                key={project.slug}
                href={`/projekty/${project.slug}`}
                onClick={() => trackCrossLinkClick(`/dzialki/${plot.slug}`, `/projekty/${project.slug}`, 'plot_to_project')}
                className="group block bg-white rounded-2xl overflow-hidden border border-zinc-200/60 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  {thumbnail ? (
                    <Image
                      src={thumbnail}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                      <Icon name="home" size="xl" className="text-zinc-300" />
                    </div>
                  )}

                  {/* Category badge */}
                  <div className="absolute top-3 left-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm bg-white/90 text-text-primary">
                      {categoryLabel}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-text-primary leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
                    {project.title}
                  </h3>

                  {/* ID badge */}
                  <p className="text-xs text-text-muted mb-4">{project.id}</p>

                  {/* Spec pills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg px-2.5 py-1.5">
                      <Icon name="ruler" size="sm" className="text-primary" />
                      {parsedArea} m2
                    </span>
                    <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg px-2.5 py-1.5">
                      <Icon name="brickWall" size="sm" className="text-primary" />
                      {project.technology}
                    </span>
                    {project.estimatedBuildCost && (
                      <span className="inline-flex items-center gap-1 bg-primary/10 text-primary text-xs font-bold rounded-lg px-2.5 py-1.5">
                        <Icon name="calculator" size="sm" />
                        {project.estimatedBuildCost}
                      </span>
                    )}
                  </div>

                  {/* Price + CTA row */}
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
                    <span className="text-sm font-bold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                      Zobacz projekt
                    </span>
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
                      <Icon name="arrowRight" size="sm" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/projekty"
            onClick={() => trackCrossLinkClick(`/dzialki/${plot.slug}`, '/projekty', 'plot_to_projects_listing')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            Zobacz wszystkie projekty
            <Icon name="arrowRight" size="sm" />
          </Link>
        </div>
      </div>
    </section>
  );
}
