'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import Image from 'next/image';
import { Icon, Portal } from '@/components/ui';
import { useMirrorMode } from '@/contexts/MirrorModeContext';

export interface ProjectElevationsProps {
  slug: string;
  elevationImageCount?: number;
  hasCrossSection?: boolean;
  hasSitePlan?: boolean;
  lotWidth?: string;
  lotLength?: string;
  elevationWidth?: string;
}

interface ElevationItem {
  src: string;
  label: string;
}

const ELEVATION_LABELS = [
  'Elewacja frontowa',
  'Elewacja tylna',
  'Elewacja boczna lewa',
  'Elewacja boczna prawa',
] as const;

export function ProjectElevations({
  slug,
  elevationImageCount = 0,
  hasCrossSection = false,
  hasSitePlan = false,
  lotWidth,
  lotLength,
  elevationWidth,
}: ProjectElevationsProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { getMirrorPath } = useMirrorMode();

  // Memoize computed image lists — recomputes when props or mirror mode change
  const allImages = useMemo<ElevationItem[]>(() => {
    const images: ElevationItem[] = [];

    for (let i = 1; i <= elevationImageCount; i++) {
      images.push({
        src: getMirrorPath(`/images/projekty/${slug}/elewacja-${i}.webp`),
        label: ELEVATION_LABELS[i - 1] || `Elewacja ${i}`,
      });
    }

    if (hasCrossSection) {
      images.push({ src: getMirrorPath(`/images/projekty/${slug}/przekroj.webp`), label: 'Przekrój' });
    }
    if (hasSitePlan) {
      images.push({ src: getMirrorPath(`/images/projekty/${slug}/sytuacja.webp`), label: 'Usytuowanie na działce' });
    }

    return images;
  }, [slug, elevationImageCount, hasCrossSection, hasSitePlan, getMirrorPath]);

  const imageCount = allImages.length;

  // Stable handler references with useCallback
  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);

  const goNext = useCallback(
    () => setActiveIndex((prev) => (prev + 1) % imageCount),
    [imageCount]
  );

  const goPrev = useCallback(
    () => setActiveIndex((prev) => (prev - 1 + imageCount) % imageCount),
    [imageCount]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, goNext, goPrev]);

  // Pre-split images into elevation vs other groups (memoized)
  const { elevationImages, otherImages } = useMemo(() => {
    const elev: Array<ElevationItem & { globalIdx: number }> = [];
    const other: Array<ElevationItem & { globalIdx: number }> = [];

    allImages.forEach((img, idx) => {
      if (img.src.includes('elewacja')) {
        elev.push({ ...img, globalIdx: idx });
      } else {
        other.push({ ...img, globalIdx: idx });
      }
    });

    return { elevationImages: elev, otherImages: other };
  }, [allImages]);

  if (imageCount === 0) return null;

  return (
    <>
      <section className="py-8 md:py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-6 md:mb-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4">
              Elewacje i rysunki techniczne
            </h2>
            <p className="text-text-secondary text-base md:text-lg">
              Rysunki elewacji, przekrój budynku oraz plan usytuowania na działce.
            </p>
          </div>

          {/* Elevations grid — 2 columns */}
          {elevationImages.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6">
              {elevationImages.map((img) => (
                <button
                  key={img.src}
                  onClick={() => openLightbox(img.globalIdx)}
                  className="group relative bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[16/9] bg-gray-50">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, 50vw"
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-border-light bg-gray-50/50">
                    <p className="text-sm font-medium text-text-primary">{img.label}</p>
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* Przekrój — pełna szerokość lub pół */}
          {otherImages.filter(i => i.src.includes('przekroj')).map((img) => (
            <button
              key={img.src}
              onClick={() => openLightbox(img.globalIdx)}
              className="group relative w-full bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer mb-6"
            >
              <div className="relative aspect-[16/9] bg-gray-50">
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                  sizes="100vw"
                />
              </div>
              <div className="px-4 py-3 border-t border-border-light bg-gray-50/50">
                <p className="text-sm font-medium text-text-primary">{img.label}</p>
              </div>
            </button>
          ))}

          {/* Usytuowanie na działce + wymiary — 2 kolumny */}
          {(otherImages.some(i => i.src.includes('sytuacja')) || lotWidth || elevationWidth) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Lewa kolumna — mapa/sytuacja */}
              {otherImages.filter(i => i.src.includes('sytuacja')).map((img) => (
                <button
                  key={img.src}
                  onClick={() => openLightbox(img.globalIdx)}
                  className="group relative bg-white rounded-xl border border-border-light overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative aspect-[16/9] bg-gray-50">
                    <Image
                      src={img.src}
                      alt={img.label}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-border-light bg-gray-50/50">
                    <p className="text-sm font-medium text-text-primary">{img.label}</p>
                  </div>
                </button>
              ))}

              {/* Prawa kolumna — wymiary */}
              {(lotWidth || elevationWidth) && (
                <div className="flex flex-col gap-4 h-full justify-center">
                  {lotWidth && lotLength && (
                    <div className="p-5 bg-gray-50 rounded-xl border border-border-light">
                      <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wide mb-3">
                        Minimalne wymiary działki
                      </h3>
                      <div className="flex gap-8 text-sm">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-text-secondary text-xs uppercase tracking-wide">Szerokość</span>
                          <span className="font-bold text-base text-text-primary">{lotWidth}</span>
                        </div>
                        <div className="flex flex-col gap-0.5">
                          <span className="text-text-secondary text-xs uppercase tracking-wide">Długość</span>
                          <span className="font-bold text-base text-text-primary">{lotLength}</span>
                        </div>
                      </div>
                    </div>
                  )}
                  {elevationWidth && (
                    <div className="p-5 bg-gray-50 rounded-xl border border-border-light">
                      <h3 className="font-semibold text-sm text-text-muted uppercase tracking-wide mb-3">
                        Wymiary elewacji frontowej
                      </h3>
                      <span className="font-bold text-base text-text-primary">{elevationWidth}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <Portal>
          <div
            className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-[10000] w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Zamknij"
            >
              <Icon name="x" size="md" className="text-white" />
            </button>

            {/* Navigation arrows */}
            {imageCount > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); goPrev(); }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Poprzedni"
                >
                  <Icon name="chevronLeft" size="lg" className="text-white" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); goNext(); }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="Następny"
                >
                  <Icon name="chevronRight" size="lg" className="text-white" />
                </button>
              </>
            )}

            {/* Image */}
            <div
              className="relative w-full h-full max-w-5xl max-h-[80vh] mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={allImages[activeIndex].src}
                alt={allImages[activeIndex].label}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>

            {/* Label & counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[10000] text-center">
              <p className="text-white font-medium text-base mb-1">{allImages[activeIndex].label}</p>
              <p className="text-white/60 text-sm">{activeIndex + 1} / {imageCount}</p>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
