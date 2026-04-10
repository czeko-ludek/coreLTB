'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import { Icon, Portal } from '@/components/ui';

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
  /** Label shown in lightbox, e.g. "Etap 3: Sciany parteru" */
  stageLabel?: string;
}

interface RealizationLightboxProps {
  images: LightboxImage[];
  activeIndex: number;
  onClose: () => void;
}

export function RealizationLightbox({ images, activeIndex, onClose }: RealizationLightboxProps) {
  const [currentSlide, setCurrentSlide] = useState(activeIndex);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const thumbsContainerRef = useRef<HTMLDivElement>(null);

  // Scroll thumbnail strip so the active thumb is visible
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

  // ESC to close
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const current = images[currentSlide];

  return (
    <Portal>
      <div className="fixed inset-0 z-[9999] bg-black/95 flex flex-col">
        {/* Header — counter + stage label + close */}
        <div className="flex items-center justify-between px-4 md:px-6 pt-4 md:pt-6 pb-2 flex-shrink-0">
          <div className="flex items-center gap-3">
            <span className="text-white/70 font-medium text-xs md:text-sm">
              {currentSlide + 1} / {images.length}
            </span>
            {current?.stageLabel && (
              <span className="text-white/50 text-xs md:text-sm hidden sm:inline">
                — {current.stageLabel}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
            aria-label="Zamknij galerie"
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
            loop={images.length > 1}
            navigation={{
              prevEl: '.realizacja-lightbox-prev',
              nextEl: '.realizacja-lightbox-next',
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            className="w-full h-full"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index} className="flex items-center justify-center">
                <div className="relative w-full h-full flex items-center justify-center">
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                className="realizacja-lightbox-prev absolute left-2 md:left-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                aria-label="Poprzednie zdjecie"
              >
                <Icon name="chevronLeft" size="md" className="text-white md:w-6 md:h-6" />
              </button>
              <button
                className="realizacja-lightbox-next absolute right-2 md:right-6 top-1/2 -translate-y-1/2 z-[10000] w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                aria-label="Nastepne zdjecie"
              >
                <Icon name="chevronRight" size="md" className="text-white md:w-6 md:h-6" />
              </button>
            </>
          )}
        </div>

        {/* Caption */}
        {current?.caption && (
          <div className="text-center px-4 py-2 flex-shrink-0">
            <p className="text-white/70 text-sm italic">{current.caption}</p>
          </div>
        )}

        {/* Thumbnail strip */}
        <div className="flex-shrink-0 px-4 md:px-16 py-3 md:py-4">
          <div
            ref={thumbsContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide justify-start md:justify-center py-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {images.map((img, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative flex-shrink-0 w-[72px] h-[54px] md:w-[100px] md:h-[75px] rounded-lg transition-all duration-200 ${
                  currentSlide === index
                    ? 'ring-2 ring-primary ring-offset-2 ring-offset-black/95 opacity-100'
                    : 'opacity-50 hover:opacity-80'
                }`}
                aria-label={`Zdjecie ${index + 1}`}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                  <Image
                    src={img.src}
                    alt={`Miniatura ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </Portal>
  );
}
