'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { SectionHeader, SectionHeaderProps, ProjectCard, ProjectCardProps, SliderArrow } from '@/components/shared';

export interface ProjectsSectionProps {
  header: SectionHeaderProps;
  projects: ProjectCardProps[];
}

export function ProjectsSection({ header, projects }: ProjectsSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);

  const handlePrev = () => {
    swiperInstance?.slidePrev();
  };

  const handleNext = () => {
    swiperInstance?.slideNext();
  };

  return (
    <section className="relative section-with-bg py-20 overflow-hidden">
      <div className="mx-auto px-4 lg:px-8 max-w-[1400px]">
        <SectionHeader {...header} align="center" theme="light" />

        {/* Slider Container */}
        <div className="mt-16 relative">
          {/* Desktop Navigation Arrows - Outside slider, only on lg+ */}
          <div className="hidden lg:block absolute -left-4 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="left"
              onClick={handlePrev}
              disabled={false}
              variant="light"
            />
          </div>
          <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="right"
              onClick={handleNext}
              disabled={false}
              variant="light"
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
