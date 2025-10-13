'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';

import { SectionHeader, SectionHeaderProps, ServiceCard, ServiceCardProps, SliderArrow } from '@/components/shared';
import { Button } from '@/components/ui';

export interface ServicesSectionProps {
  header: SectionHeaderProps;
  services: ServiceCardProps[];
}

export function ServicesSection({ header, services }: ServicesSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  React.useEffect(() => {
    // Check if IntersectionObserver is available (client-side only)
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  // Render placeholder on server, wait for client mount
  if (!isMounted) {
    return (
      <section style={{ backgroundColor: '#efebe7' }} className="py-24">
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
    <section ref={sectionRef} style={{ backgroundColor: '#efebe7' }} className="py-24">
      <div className="container mx-auto px-4">
        {/* Custom header - left aligned with description and button on right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
              <SectionHeader {...header} align="left" theme="light" />
            </div>
            <p className={`mt-4 text-base lg:text-lg text-text-secondary leading-relaxed ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.4s' }}>
              Oferujemy kompleksowe usługi budowlane, od projektowania po wykończenie, realizując inwestycje z najwyższą starannością i terminowością.
            </p>
          </div>
          <div className={isVisible ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.6s' }}>
            <Button variant="outline" size="md" href="/oferta">
              Zobacz Ofertę
            </Button>
          </div>
        </div>

        {/* Slider Container */}
        <div className={`mt-8 relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '0.8s' }}>
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
        </div>
      </div>
    </section>
  );
}

