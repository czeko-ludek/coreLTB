'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui';
import { allProjects } from '@/data/projects';
import { trackCrossLinkClick } from '@/lib/analytics';
import type { Plot } from '@/data/plots/types';

interface PlotProjectsCrossLinkProps {
  plot: Plot;
}

/**
 * Cross-link section on plot detail pages.
 * Shows 3 matching projects based on plot area (suitable house size).
 * "Masz działkę? Zobacz projekty domów, które na niej postawisz."
 */
export function PlotProjectsCrossLink({ plot }: PlotProjectsCrossLinkProps) {
  const matchedProjects = useMemo(() => {
    // Estimate buildable house area from plot size (rule of thumb: 15-30% of plot)
    // Show projects with surfaceArea roughly matching
    const maxHouseArea = Math.round(plot.area * 0.35);
    const minHouseArea = Math.round(plot.area * 0.1);

    const parseSurface = (s: string) => {
      const match = s.match(/[\d,.]+/);
      return match ? parseFloat(match[0].replace(',', '.')) : 0;
    };

    // Filter projects that could fit on this plot
    const candidates = allProjects
      .filter((p) => {
        const area = parseSurface(p.surfaceArea);
        return area >= minHouseArea && area <= maxHouseArea && p.availability !== 'niedostepny';
      })
      .sort(() => Math.random() - 0.5) // shuffle
      .slice(0, 3);

    // Fallback: if no good matches, show popular projects
    if (candidates.length < 3) {
      const fallbacks = allProjects
        .filter((p) => p.availability !== 'niedostepny' && !candidates.find((c) => c.slug === p.slug))
        .slice(0, 3 - candidates.length);
      return [...candidates, ...fallbacks];
    }

    return candidates;
  }, [plot.area]);

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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {matchedProjects.map((project) => (
            <Link
              key={project.slug}
              href={`/projekty/${project.slug}`}
              onClick={() => trackCrossLinkClick(`/dzialki/${plot.slug}`, `/projekty/${project.slug}`, 'plot_to_project')}
              className="group bg-white rounded-xl border border-zinc-200/60 overflow-hidden hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {project.thumbnailSrc ? (
                  <Image
                    src={project.thumbnailSrc}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-zinc-100 flex items-center justify-center">
                    <Icon name="home" size="xl" className="text-zinc-300" />
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-text-primary group-hover:text-primary transition-colors truncate">
                  {project.title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5 text-sm text-text-muted">
                  <span>{project.surfaceArea} m²</span>
                  {project.price && <span className="font-semibold text-text-primary">{project.price}</span>}
                </div>
              </div>
            </Link>
          ))}
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
