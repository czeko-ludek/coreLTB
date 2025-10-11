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
      {/* Wider container - 30% bigger than original (1400px + 30% = 1820px) */}
      <div className="mx-auto px-4 max-w-[1820px]">
        <SectionHeader {...header} align="center" theme="light" />

        {/* Slider - wider than services section */}
        <div className="mt-16 relative px-16 lg:px-20">
          {/* Navigation Arrows - Desktop only outside */}
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

          {/* Projects Slider with Swiper - 3 projects visible, center one active */}
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={20}
            slidesPerView={3}
            slidesPerGroup={1}
            centeredSlides={true}
            loop={true}
            speed={600}
            onSwiper={setSwiperInstance}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet projects-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active projects-bullet-active',
            }}
            className="projects-swiper py-8"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 12,
                centeredSlides: true,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 16,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
              },
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={`${project.title}-${index}`}>
                {({ isActive }) => (
                  <ProjectCard {...project} isActive={isActive} />
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}

