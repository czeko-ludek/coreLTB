'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SectionHeader, SectionHeaderProps, ProjectCard, ProjectCardProps, SliderArrow } from '@/components/shared';
import { Button } from '@/components/ui';

export interface ProjectsSectionProps {
  header: SectionHeaderProps;
  projects: ProjectCardProps[];
}

export function ProjectsSection({ header, projects }: ProjectsSectionProps) {
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

  // Render nothing on server, wait for client mount
  if (!isMounted) {
    return (
      <section style={{ backgroundColor: '#efebe7' }} className="relative py-20 overflow-hidden">
        <div className="mx-auto px-4 lg:px-8 max-w-[1400px]">
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
        {/* Custom header - left aligned with button on right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionHeader {...header} align="left" theme="light" />
            <p className="mt-4 text-base lg:text-lg text-text-secondary leading-relaxed">
              Odkryj nasze projekty, które łączą ponadczasowy design z indywidualnymi potrzebami klientów, tworząc wyjątkowe przestrzenie do życia i pracy.
            </p>
          </div>
          <Button variant="outline" size="md" href="/projekty">
            Zobacz Wszystkie
          </Button>
        </div>

        {/* Slider Container - arrows completely outside section */}
        <div className="mt-8 relative">
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

          {/* Projects Slider with Swiper */}
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
              bulletClass: 'swiper-pagination-bullet projects-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active projects-bullet-active',
            }}
            className="projects-swiper pb-12"
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
            {projects.map((project, index) => (
              <SwiperSlide key={`${project.title}-${index}`}>
                <ProjectCard {...project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
