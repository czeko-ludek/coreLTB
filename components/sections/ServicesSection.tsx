'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import { SectionHeader, SectionHeaderProps, ServiceCard, ServiceCardProps, SliderArrow } from '@/components/shared';

export interface ServicesSectionProps {
  header: SectionHeaderProps;
  services: ServiceCardProps[];
}

export function ServicesSection({ header, services }: ServicesSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section className="section-with-bg py-24">
      <div className="container mx-auto px-4">
        <SectionHeader {...header} align="center" theme="light" />

        <div className="mt-16 relative max-w-7xl mx-auto px-12 lg:px-0">
          {/* Navigation Arrows - Hidden on mobile, visible on desktop */}
          <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="left"
              onClick={handlePrev}
              disabled={false}
              variant="light"
            />
          </div>
          <div className="hidden lg:block absolute -right-16 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="right"
              onClick={handleNext}
              disabled={false}
              variant="light"
            />
          </div>

          {/* Mobile Navigation Arrows - Inside container */}
          <div className="lg:hidden absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="left"
              onClick={handlePrev}
              disabled={false}
              variant="light"
            />
          </div>
          <div className="lg:hidden absolute right-0 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="right"
              onClick={handleNext}
              disabled={false}
              variant="light"
            />
          </div>

          {/* Services Slider with Swiper */}
          <Swiper
            modules={[Navigation]}
            spaceBetween={24}
            slidesPerView={3}
            slidesPerGroup={1}
            centeredSlides={false}
            loop={true}
            speed={500}
            onSwiper={setSwiperInstance}
            className="services-swiper py-8"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
            {services.map((service, index) => (
              <SwiperSlide key={`${service.title}-${index}`}>
                <ServiceCard {...service} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

