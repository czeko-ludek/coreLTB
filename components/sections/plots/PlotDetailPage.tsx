'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import type { Plot } from '@/data/plots/types';
import { PlotGalleryHero } from './PlotGalleryHero';
import { PlotDetails } from './PlotDetails';
import { PlotProjectsCrossLink } from './PlotProjectsCrossLink';

// Dynamic import for map (Leaflet can't SSR)
const PlotDetailMap = dynamic(
  () => import('./PlotDetailMap').then((mod) => ({ default: mod.PlotDetailMap })),
  {
    ssr: false,
    loading: () => (
      <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[96rem]">
          <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">Lokalizacja</h2>
          <div className="h-[350px] md:h-[450px] rounded-xl bg-zinc-100 animate-pulse" />
        </div>
      </section>
    ),
  }
);

interface PlotDetailPageProps {
  plot: Plot;
}

/**
 * PlotDetailPage — client wrapper composing all detail sections.
 * Map is dynamically imported (no SSR) since Leaflet needs `window`.
 * ContactCTASection is rendered in the RSC page (not here) to avoid duplication.
 */
export function PlotDetailPage({ plot }: PlotDetailPageProps) {
  return (
    <>
      <PlotGalleryHero plot={plot} />
      <PlotDetails plot={plot} />
      <PlotProjectsCrossLink plot={plot} />
      <PlotDetailMap plot={plot} />
    </>
  );
}
