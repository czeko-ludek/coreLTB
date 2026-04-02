'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon, Portal } from '@/components/ui';
import { useToggle } from '@/hooks/useToggle';
import { useMirrorMode } from '@/contexts/MirrorModeContext';
import { type ProjectSource } from '@/data/projects';

/** Label kolekcji — kolor i styl zależny od źródła */
const SOURCE_BADGE: Record<string, { label: string; color: string; outline?: boolean }> = {
  z500:         { label: 'Z500',          color: '#d9308a' },
  galeriadomow: { label: 'Galeria Domów', color: '#e75c55' },
  malachit:     { label: 'Malachit',      color: '#CF006D', outline: true },
};

export interface ProjectGalleryHeroProps {
  slug: string;
  alt: string;
  galleryImageCount: number;
  source?: ProjectSource;
}

export function ProjectGalleryHero({ slug, alt, galleryImageCount, source }: ProjectGalleryHeroProps) {
  const [isLightboxOpen, , setIsLightboxOpen] = useToggle(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const thumbsContainerRef = React.useRef<HTMLDivElement>(null);
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

  // Scroll thumbnail strip so the active thumb is visible
  const scrollThumbIntoView = useCallback((index: number) => {
    const container = thumbsContainerRef.current;
    if (!container) return;
    const thumb = container.children[index] as HTMLElement | undefined;
    if (!thumb) return;
    const containerRect = container.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
    // If thumb is outside visible area, scroll to center it
    if (thumbRect.left < containerRect.left || thumbRect.right > containerRect.right) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    const idx = swiper.realIndex;
    setCurrentSlide(idx);
    scrollThumbIntoView(idx);
  }, [scrollThumbIntoView]);

  const goToSlide = useCallback((index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  }, [swiperInstance]);

  const openLightbox = useCallback((index: number) => {
    setActiveIndex(index);
    setCurrentSlide(index);
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

  const sourceBadge = source ? SOURCE_BADGE[source] : undefined;

  return (
    <>
      {/* Gallery - Mobile: Main + 2 Small, Desktop: Grid */}
      <section className="py-4 md:py-6 px-4 md:px-6 lg:px-[38px]">
        {/* Mobile: Main Image + 2 Smaller Images Below */}
        <div className="lg:hidden space-y-3">
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
            {/* Badge kolekcji - lewy górny (mobile) */}
            {sourceBadge && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-sm"
                  style={sourceBadge.outline
                    ? { backgroundColor: '#fff', color: sourceBadge.color, border: `2px solid ${sourceBadge.color}` }
                    : { backgroundColor: sourceBadge.color, color: '#fff' }
                  }
                >
                  {sourceBadge.label}
                </span>
              </div>
            )}
          </div>

          {/* 2 Smaller Images Below - Side by Side */}
          <div className="grid grid-cols-2 gap-3">
            {allImages.slice(1, 3).map((src, index) => (
              <div
                key={index}
                className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
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
        <div className="hidden lg:grid grid-cols-3 gap-3">
          {/* Main Large Image - Left (2 columns on desktop) */}
          <div
            className="col-span-2 relative h-[432px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={allImages[0]}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="66vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            {/* Badge kolekcji - lewy górny (desktop) */}
            {sourceBadge && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-md shadow-md"
                  style={sourceBadge.outline
                    ? { backgroundColor: '#fff', color: sourceBadge.color, border: `2px solid ${sourceBadge.color}` }
                    : { backgroundColor: sourceBadge.color, color: '#fff' }
                  }
                >
                  {sourceBadge.label}
                </span>
              </div>
            )}
          </div>

          {/* Right Side - 2 Smaller Images */}
          <div className="grid grid-cols-1 gap-3 h-[432px]">
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
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
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
          <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
            {/* Close Button + Counter */}
            <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6 pb-2 flex-shrink-0">
              <span className="text-white/70 font-medium text-xs md:text-sm">
                {currentSlide + 1} / {allImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                aria-label="Zamknij galerię"
              >
                <Icon name="x" size="md" className="text-white md:w-6 md:h-6" />
              </button>
            </div>

            {/* Main image area */}
            <div className="relative flex-1 min-h-0 px-4 md:px-16">
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
                onSlideChange={handleSlideChange}
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

            {/* Thumbnail strip */}
            <div className="flex-shrink-0 px-4 md:px-16 py-3 md:py-4">
              <div
                ref={thumbsContainerRef}
                className="flex gap-2 overflow-x-auto scrollbar-hide justify-start md:justify-center py-1"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {allImages.map((src, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`relative flex-shrink-0 w-[92px] h-[69px] md:w-[116px] md:h-[87px] rounded-lg transition-all duration-200 ${
                      currentSlide === index
                        ? 'ring-2 ring-primary ring-offset-2 ring-offset-black/95 opacity-100'
                        : 'opacity-50 hover:opacity-80'
                    }`}
                    aria-label={`Zdjęcie ${index + 1}`}
                  >
                    <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={src}
                      alt={`Miniatura ${index + 1}`}
                      fill
                      className="object-cover"
                      sizes="116px"
                    />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
