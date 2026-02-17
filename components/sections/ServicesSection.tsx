'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { useInView } from 'react-intersection-observer';

import { SectionHeader, SectionHeaderProps, ServiceCard, ServiceCardProps, SliderArrow } from '@/components/shared';
import { Button } from '@/components/ui';

export interface ServicesSectionProps {
  header: SectionHeaderProps;
  services: ServiceCardProps[];
}

export function ServicesSection({ header, services }: ServicesSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  // Scroll-triggered animation
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true, // Animacja tylko raz
  });

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section ref={ref} className="py-24 bg-background-beige">
      <div className="container mx-auto px-4">
        {/* Custom header - left aligned with description and button on right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className={inView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
              <SectionHeader {...header} align="left" theme="light" />
            </div>
            <p className={`mt-4 text-base lg:text-lg text-text-secondary leading-relaxed ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              Oferujemy kompleksowe usługi budowlane, od projektowania po wykończenie, realizując inwestycje z najwyższą starannością i terminowością.
            </p>
          </div>
          <div className={inView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.6s' }}>
            <Button variant="outline" size="md" href="/oferta">
              Zobacz Ofertę
            </Button>
          </div>
        </div>

        {/* Slider Container */}
        <div className={`mt-8 relative ${inView ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
          {isMounted && (
            <>
              {/* Desktop Navigation Arrows - Outside container, gold variant, centered */}
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

              {/* Services Slider with Swiper */}
              <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={24}
                slidesPerView={3}
                slidesPerGroup={1}
                centeredSlides={false}
                loop={true}
                speed={500}
                onSwiper={setSwiperInstance}
                pagination={{
                  clickable: true,
                  bulletClass: 'swiper-pagination-bullet services-bullet',
                  bulletActiveClass: 'swiper-pagination-bullet-active services-bullet-active',
                }}
                className="services-swiper py-8 pb-12"
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
            </>
          )}
        </div>
      </div>
    </section>
  );
}

