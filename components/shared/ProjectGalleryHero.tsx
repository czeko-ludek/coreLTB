'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Icon } from '@/components/ui';

export interface ProjectGalleryHeroProps {
  slug: string;
  alt: string;
  galleryImageCount: number;
}

export function ProjectGalleryHero({ slug, alt, galleryImageCount }: ProjectGalleryHeroProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Generate all gallery image paths
  const allImages = [
    `/images/projekty/${slug}/main.webp`,
    ...Array.from({ length: galleryImageCount - 1 }, (_, i) =>
      `/images/projekty/${slug}/gallery-${i + 1}.webp`
    ),
  ];

  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Handle keyboard ESC to close
  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isLightboxOpen) {
        closeLightbox();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLightboxOpen]);

  return (
    <>
      {/* Gallery Grid */}
      <section className="py-8 px-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Main Large Image - Left (2 columns on desktop) */}
          <div
            className="lg:col-span-2 relative h-[576px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => openLightbox(0)}
          >
            <Image
              src={allImages[0]}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 66vw"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </div>

          {/* Right Side - 2 Smaller Images */}
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 h-[576px]">
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
                  sizes="(max-width: 1024px) 50vw, 33vw"
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
        <div className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center">
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[10000] w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors duration-300"
            aria-label="Zamknij galerię"
          >
            <Icon name="x" size="lg" className="text-white" />
          </button>

          {/* Swiper Slider */}
          <div className="w-full h-full flex items-center justify-center px-16">
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
                  className="lightbox-prev absolute left-6 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                  aria-label="Poprzednie zdjęcie"
                >
                  <Icon name="chevronLeft" size="lg" className="text-white" />
                </button>
                <button
                  className="lightbox-next absolute right-6 top-1/2 -translate-y-1/2 z-[10000] w-14 h-14 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-all duration-300"
                  aria-label="Następne zdjęcie"
                >
                  <Icon name="chevronRight" size="lg" className="text-white" />
                </button>
              </>
            )}
          </div>

          {/* Image Counter */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-lg">
            <span className="text-white font-medium text-sm">
              {(swiperInstance?.realIndex ?? activeIndex) + 1} / {allImages.length}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
