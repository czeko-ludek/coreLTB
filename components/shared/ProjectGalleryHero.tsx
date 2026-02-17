'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Icon, Portal } from '@/components/ui';
import { useToggle } from '@/hooks/useToggle';
import { useMirrorMode } from '@/contexts/MirrorModeContext';

export interface ProjectGalleryHeroProps {
  slug: string;
  alt: string;
  galleryImageCount: number;
}

export function ProjectGalleryHero({ slug, alt, galleryImageCount }: ProjectGalleryHeroProps) {
  const [isLightboxOpen, , setIsLightboxOpen] = useToggle(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const { getMirrorPath } = useMirrorMode();

  // Standard paths — stable, only recomputes when slug/count changes
  const standardImages = useMemo(() => [
    `/images/projekty/${slug}/main.webp`,
    ...Array.from({ length: galleryImageCount - 1 }, (_, i) =>
      `/images/projekty/${slug}/gallery-${i + 1}.webp`
    ),
  ], [slug, galleryImageCount]);

  // Mirror-aware paths — recomputes when mirror mode toggles
  const allImages = useMemo(
    () => standardImages.map(getMirrorPath),
    [standardImages, getMirrorPath]
  );

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  }, [setIsLightboxOpen]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, [setIsLightboxOpen]);

  // Handle keyboard ESC to close
  React.useEffect(() => {
    if (!isLightboxOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLightboxOpen, closeLightbox]);

  return (
    <>
      {/* Gallery - Mobile: Main + 2 Small, Desktop: Grid */}
      <section className="py-6 md:py-8 px-4 md:px-8 lg:px-[50px]">
        {/* Mobile: Main Image + 2 Smaller Images Below */}
        <div className="lg:hidden space-y-4">
          {/* Main Large Image */}
          <div
            className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={allImages[0]}
              alt={alt}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>

          {/* 2 Smaller Images Below - Side by Side */}
          <div className="grid grid-cols-2 gap-4">
            {allImages.slice(1, 3).map((src, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={src}
                  alt={`${alt} - zdjęcie ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
                {/* Badge on last visible image */}
                {index === 1 && galleryImageCount > 3 && (
                  <div className="absolute bottom-2 right-2 bg-primary px-2 py-1 rounded-lg shadow-lg z-10">
                    <span className="text-white font-medium text-xs">
                      +{galleryImageCount - 3} zdjęć
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-4">
          {/* Main Large Image - Left (2 columns on desktop) */}
          <div
            className="col-span-2 relative h-[576px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={allImages[0]}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="66vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Right Side - 2 Smaller Images */}
          <div className="grid grid-cols-1 gap-4 h-[576px]">
            {allImages.slice(1, 3).map((src, index) => (
              <div
                key={index}
                className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(index + 1)}
              >
                <Image
                  src={src}
                  alt={`${alt} - zdjęcie ${index + 2}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="33vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                {/* "Zobacz więcej" badge on last visible image */}
                {index === 1 && galleryImageCount > 3 && (
                  <div className="absolute bottom-4 right-4 bg-primary px-4 py-2 rounded-lg shadow-lg z-10">
                    <span className="text-white font-medium text-sm">
                      +{galleryImageCount - 3} zdjęć
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-[10000] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
              aria-label="Zamknij galerię"
            >
              <Icon name="x" size="md" className="text-white md:w-6 md:h-6" />
            </button>

            {/* Swiper Slider */}
            <div className="w-full h-full flex items-center justify-center px-4 md:px-16">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                initialSlide={activeIndex}
                loop={allImages.length > 1}
                navigation={{
                  prevEl: '.lightbox-prev',
                  nextEl: '.lightbox-next',
                }}
                onSwiper={setSwiperInstance}
                className="w-full h-full"
              >
                {allImages.map((src, index) => (
                  <SwiperSlide key={index} className="flex items-center justify-center">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <Image
                        src={src}
                        alt={`${alt} - zdjęcie ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Navigation Arrows */}
              {allImages.length > 1 && (
                <>
                  <button
                    className="lightbox-prev absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                    aria-label="Poprzednie zdjęcie"
                  >
                    <Icon name="chevronLeft" size="md" className="text-white md:w-6 md:h-6" />
                  </button>
                  <button
                    className="lightbox-next absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                    aria-label="Następne zdjęcie"
                  >
                    <Icon name="chevronRight" size="md" className="text-white md:w-6 md:h-6" />
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-3 py-1.5 md:px-4 md:py-2 rounded-lg">
              <span className="text-white font-medium text-xs md:text-sm">
                {(swiperInstance?.realIndex ?? activeIndex) + 1} / {allImages.length}
              </span>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
