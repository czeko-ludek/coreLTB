'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';
import type { BuildStage, StageImage } from '@/data/realizacje/types';

// ─── Gallery Image (internal) ────────────────────────────────

interface GalleryImageProps {
  img: StageImage;
  onClick: () => void;
  className?: string;
  sizes: string;
  /** "+N" badge on bottom-right when there are hidden images */
  badge?: string;
}

function GalleryImage({ img, onClick, className, sizes, badge }: GalleryImageProps) {
  return (
    <figure>
      <button
        onClick={onClick}
        className={clsx(
          'relative w-full rounded-xl overflow-hidden group cursor-pointer block',
          className
        )}
      >
        <Image
          src={img.src}
          alt={img.alt}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes={sizes}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
          <Icon
            name="search"
            size="lg"
            className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </div>
        {badge && (
          <div className="absolute bottom-2 right-2 bg-primary px-2.5 py-1 rounded-lg shadow-lg z-10">
            <span className="text-white font-medium text-xs">{badge} zdjec</span>
          </div>
        )}
      </button>
      {img.caption && (
        <figcaption className="mt-1.5 text-xs text-text-muted text-center italic">
          {img.caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Build Stage Entry ───────────────────────────────────────

interface BuildStageEntryProps {
  stage: BuildStage;
  index: number;
  isLast: boolean;
  /** Starting index of this stage's images in the global flat array */
  globalImageOffset: number;
  /** Opens the shared lightbox at a global index */
  onImageClick: (globalIndex: number) => void;
}

export function BuildStageEntry({ stage, index, globalImageOffset, onImageClick }: BuildStageEntryProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <div
      ref={ref}
      id={`etap-${stage.id}`}
      className={clsx(
        'scroll-mt-[168px] mb-12 transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{ transitionDelay: `${Math.min(index * 60, 300)}ms` }}
    >
      {/* Stage heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mt-12 mb-2">
        Etap {stage.order}: {stage.title}
      </h2>

      {/* Date + duration */}
      <div className="flex items-center gap-4 text-sm text-text-muted mb-6">
        <span className="inline-flex items-center gap-1.5">
          <Icon name="calendar" size="sm" />
          {stage.dateLabel}
        </span>
        {stage.duration && (
          <span className="inline-flex items-center gap-1.5">
            <Icon name="clock" size="sm" />
            {stage.duration}
          </span>
        )}
      </div>

      {/* Photo gallery — clicks open shared lightbox */}
      {stage.images.length > 0 && (
        <div className="mb-6">
          {/* 1 image — full width */}
          {stage.images.length === 1 && (
            <GalleryImage
              img={stage.images[0]}
              onClick={() => onImageClick(globalImageOffset)}
              className="h-64 md:h-80"
              sizes="(max-width: 768px) 100vw, 700px"
            />
          )}

          {/* 2 images — side by side */}
          {stage.images.length === 2 && (
            <div className="grid grid-cols-2 gap-3">
              {stage.images.map((img, imgIdx) => (
                <GalleryImage
                  key={imgIdx}
                  img={img}
                  onClick={() => onImageClick(globalImageOffset + imgIdx)}
                  className="h-40 md:h-48"
                  sizes="(max-width: 768px) 50vw, 350px"
                />
              ))}
            </div>
          )}

          {/* 3+ images — big left + 2 stacked right, captions under each, bottoms aligned */}
          {stage.images.length >= 3 && (() => {
            const mainImg = stage.images[0];
            const sideImgs = stage.images.slice(1, 3);
            const hiddenCount = stage.images.length - 3;

            return (
              <div className="grid grid-cols-[2fr_1fr] gap-x-3 h-[224px] md:h-[310px]">
                {/* Left — big image + caption, fills full height */}
                <figure className="flex flex-col min-h-0">
                  <button
                    onClick={() => onImageClick(globalImageOffset)}
                    className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden group cursor-pointer block"
                  >
                    <Image
                      src={mainImg.src}
                      alt={mainImg.alt}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 66vw, 460px"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <Icon name="search" size="lg" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </button>
                  {mainImg.caption && (
                    <figcaption className="mt-1.5 text-xs text-text-muted text-center italic flex-shrink-0 line-clamp-1">
                      {mainImg.caption}
                    </figcaption>
                  )}
                </figure>

                {/* Right — 2 stacked images + captions, same total height */}
                <div className="flex flex-col gap-2.5 min-h-0">
                  {sideImgs.map((img, imgIdx) => (
                    <figure key={imgIdx} className="flex-1 min-h-0 flex flex-col">
                      <button
                        onClick={() => onImageClick(globalImageOffset + imgIdx + 1)}
                        className="relative w-full flex-1 min-h-0 rounded-xl overflow-hidden group cursor-pointer block"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 33vw, 230px"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <Icon name="search" size="lg" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                        {imgIdx === 1 && hiddenCount > 0 && (
                          <div className="absolute bottom-2 right-2 bg-primary px-2.5 py-1 rounded-lg shadow-lg z-10">
                            <span className="text-white font-medium text-xs">+{hiddenCount} zdjęć</span>
                          </div>
                        )}
                      </button>
                      {img.caption && (
                        <figcaption className="mt-1 text-[11px] text-text-muted text-center italic flex-shrink-0 line-clamp-1">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Narrative */}
      <div className="space-y-4 mb-6">
        {stage.narrative.map((para, pIdx) => (
          <p key={pIdx} className="text-text-secondary leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      {/* Challenge box */}
      {stage.challenge && (
        <div className="my-6 p-4 rounded-xl border border-amber-200 bg-amber-50">
          <div className="flex items-center gap-2.5 mb-2">
            <Icon name="alertTriangle" size="md" className="text-amber-700 flex-shrink-0" />
            <p className="font-semibold text-amber-900">{stage.challenge.title}</p>
          </div>
          <p className="text-sm text-amber-800 mb-3">{stage.challenge.description}</p>
          <div className="flex items-start gap-2">
            <Icon name="checkCircle" size="sm" className="text-green-600 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-green-800 font-medium">{stage.challenge.solution}</p>
          </div>
        </div>
      )}

      {/* Expert insight box */}
      {stage.expertInsight && (
        <div className="my-6 p-4 rounded-xl border border-green-200 bg-green-50">
          <div className="flex items-center gap-2.5 mb-3">
            <Icon name="lightbulb" size="md" className="text-green-700 flex-shrink-0" />
            <p className="font-semibold text-green-900">{stage.expertInsight.title}</p>
          </div>
          <div className="space-y-2">
            {stage.expertInsight.content.map((para, eIdx) => (
              <p
                key={eIdx}
                className="text-sm text-green-800 leading-relaxed [&_a]:text-green-700 [&_a]:underline [&_a]:font-medium hover:[&_a]:text-primary"
                dangerouslySetInnerHTML={{ __html: para }}
              />
            ))}
          </div>
          {stage.expertInsight.linkTo && (
            <Link
              href={stage.expertInsight.linkTo}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-dark mt-3 transition-colors"
            >
              {stage.expertInsight.linkLabel || 'Czytaj wiecej'}
              <Icon name="arrowRight" size="sm" />
            </Link>
          )}
        </div>
      )}

      {/* Technical facts bar */}
      {stage.technicalFacts && stage.technicalFacts.length > 0 && (
        <div className="flex flex-wrap gap-3 mt-4">
          {stage.technicalFacts.map((fact, fIdx) => (
            <div
              key={fIdx}
              className="flex items-center gap-2 bg-white border border-zinc-200/60 rounded-lg px-3 py-2"
            >
              {fact.icon && <Icon name={fact.icon} size="sm" className="text-text-muted" />}
              <div>
                <p className="text-[10px] uppercase tracking-wider text-text-muted font-bold leading-none mb-0.5">
                  {fact.label}
                </p>
                <p className="text-xs font-semibold text-text-primary">{fact.value}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
