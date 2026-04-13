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
import type { Plot } from '@/data/plots/types';

const AVAILABILITY_BADGE: Record<string, { label: string; color: string }> = {
  dostepna: { label: 'Dostepna', color: '#22c55e' },
  rezerwacja: { label: 'Rezerwacja', color: '#dfbb68' },
  sprzedana: { label: 'Sprzedana', color: '#71717a' },
};

interface PlotGalleryHeroProps {
  plot: Plot;
}

export function PlotGalleryHero({ plot }: PlotGalleryHeroProps) {
  const [isLightboxOpen, , setIsLightboxOpen] = useToggle(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const thumbsContainerRef = React.useRef<HTMLDivElement>(null);

  const allImages = useMemo(() => {
    const imgs = [plot.thumbnailSrc, ...plot.images].filter(Boolean);
    // Deduplicate
    return [...new Set(imgs)];
  }, [plot.thumbnailSrc, plot.images]);

  const scrollThumbIntoView = useCallback((index: number) => {
    const container = thumbsContainerRef.current;
    if (!container) return;
    const thumb = container.children[index] as HTMLElement | undefined;
    if (!thumb) return;
    const containerRect = container.getBoundingClientRect();
    const thumbRect = thumb.getBoundingClientRect();
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

  React.useEffect(() => {
    if (!isLightboxOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLightboxOpen, closeLightbox]);

  const badge = AVAILABILITY_BADGE[plot.availability];
  const hasMultipleImages = allImages.length > 1;

  // Placeholder for missing images
  const PlaceholderImage = ({ className = '' }: { className?: string }) => (
    <div className={`bg-zinc-100 flex items-center justify-center ${className}`}>
      <Icon name="mapPin" size="xl" className="text-zinc-300" />
    </div>
  );

  return (
    <>
      <section className="py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[96rem]">
        {/* Mobile: Main Image + 2 Smaller */}
        <div className="lg:hidden space-y-3">
          <div
            className="relative aspect-[3/2] rounded-xl overflow-hidden cursor-pointer"
            onClick={() => openLightbox(0)}
          >
            {allImages[0] ? (
              <Image
                src={allImages[0]}
                alt={plot.title}
                fill
                className="object-cover"
                sizes="100vw"
                priority
              />
            ) : (
              <PlaceholderImage className="absolute inset-0" />
            )}
            {/* Availability badge */}
            {badge && (
              <div className="absolute top-3 left-3 z-10">
                <span
                  className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-sm"
                  style={{ backgroundColor: badge.color, color: '#fff' }}
                >
                  {badge.label}
                </span>
              </div>
            )}
            {/* MPZP badge */}
            {plot.mpzp === 'tak' && (
              <div className="absolute top-3 right-3 z-10">
                <span className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md bg-zinc-800/80 text-white shadow-sm">
                  MPZP
                </span>
              </div>
            )}
          </div>

          {hasMultipleImages && (
            <div className="grid grid-cols-2 gap-3">
              {allImages.slice(1, 3).map((src, index) => (
                <div
                  key={index}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => openLightbox(index + 1)}
                >
                  <Image
                    src={src}
                    alt={`${plot.title} - zdjecie ${index + 2}`}
                    fill
                    className="object-cover"
                    sizes="50vw"
                  />
                  {index === 1 && allImages.length > 3 && (
                    <div className="absolute bottom-2 right-2 bg-primary px-2 py-1 rounded-lg shadow-lg z-10">
                      <span className="text-white font-medium text-xs">
                        +{allImages.length - 3} zdjec
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid grid-cols-3 gap-3">
          {/* Main image — 2 columns */}
          <div
            className="col-span-2 relative h-[520px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            {allImages[0] ? (
              <Image
                src={allImages[0]}
                alt={plot.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="66vw"
                priority
              />
            ) : (
              <PlaceholderImage className="absolute inset-0" />
            )}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            {badge && (
              <div className="absolute top-4 left-4 z-10">
                <span
                  className="text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-md shadow-md"
                  style={{ backgroundColor: badge.color, color: '#fff' }}
                >
                  {badge.label}
                </span>
              </div>
            )}
            {plot.mpzp === 'tak' && (
              <div className="absolute top-4 right-4 z-10">
                <span className="text-sm font-bold uppercase tracking-wide px-4 py-2 rounded-md bg-zinc-800/80 text-white shadow-md">
                  MPZP
                </span>
              </div>
            )}
          </div>

          {/* Right side — 2 smaller images stacked */}
          <div className="grid grid-cols-1 gap-3 h-[520px]">
            {allImages.length > 1 ? (
              allImages.slice(1, 3).map((src, index) => (
                <div
                  key={index}
                  className="relative h-full rounded-xl overflow-hidden cursor-pointer group"
                  onClick={() => openLightbox(index + 1)}
                >
                  <Image
                    src={src}
                    alt={`${plot.title} - zdjecie ${index + 2}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                  {index === 1 && allImages.length > 3 && (
                    <div className="absolute bottom-4 right-4 bg-primary px-4 py-2 rounded-lg shadow-lg z-10">
                      <span className="text-white font-medium text-sm">
                        +{allImages.length - 3} zdjec
                      </span>
                    </div>
                  )}
                </div>
              ))
            ) : (
              /* Only 1 image — show placeholder for the second column */
              <>
                <PlaceholderImage className="rounded-xl" />
                <PlaceholderImage className="rounded-xl" />
              </>
            )}
          </div>
        </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
            <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6 pb-2 flex-shrink-0">
              <span className="text-white/70 font-medium text-xs md:text-sm">
                {currentSlide + 1} / {allImages.length}
              </span>
              <button
                onClick={closeLightbox}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
                aria-label="Zamknij galerie"
              >
                <Icon name="x" size="md" className="text-white md:w-6 md:h-6" />
              </button>
            </div>

            <div className="relative flex-1 min-h-0 px-4 md:px-16">
              <Swiper
                modules={[Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                initialSlide={activeIndex}
                loop={allImages.length > 1}
                navigation={{
                  prevEl: '.plot-lightbox-prev',
                  nextEl: '.plot-lightbox-next',
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
                        alt={`${plot.title} - zdjecie ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="100vw"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {allImages.length > 1 && (
                <>
                  <button
                    className="plot-lightbox-prev absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                    aria-label="Poprzednie zdjecie"
                  >
                    <Icon name="chevronLeft" size="md" className="text-white md:w-6 md:h-6" />
                  </button>
                  <button
                    className="plot-lightbox-next absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                    aria-label="Nastepne zdjecie"
                  >
                    <Icon name="chevronRight" size="md" className="text-white md:w-6 md:h-6" />
                  </button>
                </>
              )}
            </div>

            {allImages.length > 1 && (
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
                      aria-label={`Zdjecie ${index + 1}`}
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
            )}
          </div>
        </Portal>
      )}
    </>
  );
}
