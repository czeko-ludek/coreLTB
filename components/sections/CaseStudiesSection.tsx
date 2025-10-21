'use client';

import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { CaseStudyCard, CaseStudyCardProps } from '@/components/shared/CaseStudyCard';
import { SliderArrow } from '@/components/shared';
import { Button } from '@/components/ui';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export interface CaseStudiesSectionProps {
  headline: string;
  caseStudies: CaseStudyCardProps[];
  ctaText?: string;
  ctaLink?: string;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({
  headline,
  caseStudies,
  ctaText,
  ctaLink,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-12 text-center text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.slice(0, 2).map((study, index) => (
              <div key={index} className="h-[400px] animate-pulse rounded-xl bg-gray-200" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-12 text-center text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{
              clickable: true,
              el: '.case-studies-pagination',
            }}
            navigation={false}
            onSwiper={setSwiperInstance}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            }}
            className="!pb-12"
          >
            {caseStudies.map((study, index) => (
              <SwiperSlide key={index}>
                <CaseStudyCard {...study} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation Arrows - Desktop */}
          <div className="hidden lg:block">
            <SliderArrow
              direction="left"
              onClick={() => swiperInstance?.slidePrev()}
              className="absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
            />
            <SliderArrow
              direction="right"
              onClick={() => swiperInstance?.slideNext()}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 translate-x-1/2"
            />
          </div>

          {/* Custom Pagination */}
          <div className="case-studies-pagination mt-8 flex justify-center gap-2" />
        </div>

        {/* Optional CTA Button */}
        {ctaText && ctaLink && (
          <div className="mt-12 text-center">
            <Button variant="secondary" href={ctaLink}>
              {ctaText}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};
