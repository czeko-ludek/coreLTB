'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SectionHeader, SectionHeaderProps, TestimonialCard, TestimonialCardProps, SliderArrow } from '@/components/shared';

export interface TestimonialsSectionProps {
  header: SectionHeaderProps;
  testimonials: TestimonialCardProps[];
}

export function TestimonialsSection({ header, testimonials }: TestimonialsSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  // Render placeholder on server
  if (!isMounted) {
    return (
      <section style={{ backgroundColor: '#efebe7' }} className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-4">
          <SectionHeader {...header} align="center" theme="light" />
          <div className="mt-16 min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-text-secondary">Ładowanie...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section style={{ backgroundColor: '#efebe7' }} className="relative py-20 overflow-visible">
      <div className="container mx-auto px-4">
        <SectionHeader {...header} align="center" theme="light" />

        {/* Slider Container */}
        <div className="mt-12 relative">
          {/* Desktop Navigation Arrows - Outside container, centered vertically */}
          <div className="hidden lg:block absolute -left-20 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="left"
              onClick={handlePrev}
              disabled={false}
              variant="gold"
            />
          </div>
          <div className="hidden lg:block absolute -right-20 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="right"
              onClick={handleNext}
              disabled={false}
              variant="gold"
            />
          </div>

          {/* Testimonials Slider */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            speed={600}
            onSwiper={setSwiperInstance}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet testimonials-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active testimonials-bullet-active',
            }}
            className="testimonials-swiper pb-12"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={`${testimonial.author.name}-${index}`}>
                <TestimonialCard {...testimonial} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

