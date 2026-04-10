'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import type { RealizationData } from '@/data/realizacje/types';
import type { LightboxImage } from './RealizationLightbox';
import { RealizationLightbox } from './RealizationLightbox';
import { BuildTimeline } from './BuildTimeline';
import { RealizationSummary } from './RealizationSummary';
import { Icon } from '@/components/ui';

interface RealizationArticleProps {
  data: RealizationData;
}

/**
 * Full article body with hero image + stages.
 * Manages a shared lightbox: hero image (idx 0) + all stage images.
 */
export function RealizationArticle({ data }: RealizationArticleProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Build flat image array: hero first, then all stage images in order
  const allImages = useMemo<LightboxImage[]>(() => {
    const images: LightboxImage[] = [];

    // Hero image as first
    images.push({
      src: data.project.heroImage,
      alt: data.project.title,
      stageLabel: 'Zdjecie glowne',
    });

    // Stage images in order
    const sortedStages = [...data.stages].sort((a, b) => a.order - b.order);
    for (const stage of sortedStages) {
      for (const img of stage.images) {
        images.push({
          src: img.src,
          alt: img.alt,
          caption: img.caption,
          stageLabel: `Etap ${stage.order}: ${stage.title}`,
        });
      }
    }

    return images;
  }, [data.project.heroImage, data.project.title, data.stages]);

  // Build a map: stageId -> globalStartIndex
  const stageImageOffsets = useMemo(() => {
    const offsets: Record<string, number> = {};
    let offset = 1; // hero is at index 0
    const sortedStages = [...data.stages].sort((a, b) => a.order - b.order);
    for (const stage of sortedStages) {
      offsets[stage.id] = offset;
      offset += stage.images.length;
    }
    return offsets;
  }, [data.stages]);

  const openLightbox = useCallback((globalIndex: number) => {
    setLightboxIndex(globalIndex);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Total stage images count (for the badge)
  const totalImages = allImages.length;

  return (
    <>
      {/* Featured hero image — clickable, opens lightbox at 0 */}
      <div
        className="aspect-[2/1] relative cursor-pointer group"
        onClick={() => openLightbox(0)}
      >
        <Image
          src={data.project.heroImage}
          alt={data.project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          priority
          sizes="(max-width: 1024px) 100vw, 800px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-black/50 transition-colors duration-300" />

        {/* Gallery badge */}
        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg flex items-center gap-2 text-white text-sm font-medium opacity-80 group-hover:opacity-100 transition-opacity">
          <Icon name="image" size="sm" />
          {totalImages} zdjec
        </div>
      </div>

      {/* Article body */}
      <div className="p-6 md:p-10">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-text-muted mb-6">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-primary" />
            </span>
            {data.project.startDate}
            {data.project.endDate ? ` – ${data.project.endDate}` : ' – w trakcie'}
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 rounded-full font-medium text-text-secondary">
            {data.project.surfaceArea} m&sup2; | {data.project.floors}
          </span>
          <span
            className={
              data.project.status === 'completed'
                ? 'inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 rounded-full font-medium'
                : 'inline-flex items-center gap-1.5 px-3 py-1 bg-zinc-100 text-zinc-600 rounded-full font-medium'
            }
          >
            {data.project.status === 'completed' ? 'Zakonczona' : 'W trakcie'}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 leading-tight">
          {data.project.title}
        </h1>
        <p className="text-text-secondary mb-8 text-lg leading-relaxed">
          Realizacja domu {data.project.surfaceArea} m&sup2; od fundamentow po instalacje — zdjecia z kazdego etapu, eksperckie komentarze do technologii i materialy.
          {' '}Technologia: {data.project.technology.toLowerCase()}.
          {data.project.projectSource && ` Projekt: ${data.project.projectSource}.`}
        </p>

        {/* Stage timeline */}
        <BuildTimeline
          stages={data.stages}
          midCTAs={data.midCTAs}
          stageImageOffsets={stageImageOffsets}
          onImageClick={openLightbox}
        />

        {/* Summary */}
        {data.summary && <RealizationSummary summary={data.summary} />}
      </div>

      {/* Shared lightbox for ALL images (hero + all stages) */}
      {lightboxIndex !== null && (
        <RealizationLightbox
          images={allImages}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
