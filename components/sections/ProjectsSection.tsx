'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { SectionHeader, SectionHeaderProps, ProjectCard, ProjectCardProps, SliderArrow } from '@/components/shared';
import { Button } from '@/components/ui';

export interface ProjectsSectionProps {
  header: SectionHeaderProps;
  projects: ProjectCardProps[];
}

export function ProjectsSection({ header, projects }: ProjectsSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px',
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

  // Render nothing on server, wait for client mount
  if (!isMounted) {
    return (
      <section className="relative py-20 overflow-hidden bg-background-beige">
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
    <section ref={ref} className="relative py-20 overflow-hidden bg-background-beige">
      <div className="mx-auto px-4 lg:px-8 max-w-[1400px]">
        {/* Custom header - left aligned with button on right */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div
            className={clsx('max-w-2xl', inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.1s' }}
          >
            <SectionHeader {...header} align="left" theme="light" />
            <p className="mt-4 text-base lg:text-lg text-text-secondary leading-relaxed">
              Odkryj nasze projekty, które łączą ponadczasowy design z indywidualnymi potrzebami klientów, tworząc wyjątkowe przestrzenie do życia i pracy.
            </p>
          </div>
          <div
            className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.2s' }}
          >
            <Button variant="outline" size="md" href="/projekty">
              Zobacz Wszystkie
            </Button>
          </div>
        </div>

        {/* Slider Container — side padding makes room for arrows on sm+ */}
        <div
          className={clsx('mt-8 relative sm:px-[4.5rem]', inView ? 'animate-fade-in-up' : 'opacity-0')}
          style={{ animationDelay: '0.3s' }}
        >
          {/* Left arrow — sits in the padding zone, outside cards */}
          <div className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 z-10">
            <SliderArrow
              direction="left"
              onClick={handlePrev}
              disabled={false}
              variant="gold"
            />
          </div>

          {/* Right arrow — sits in the padding zone, outside cards */}
          <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 z-10">
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
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            loop={true}
            speed={600}
            onSwiper={setSwiperInstance}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet swiper-custom-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active swiper-custom-bullet-active',
            }}
            className="projects-swiper pb-12"
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 20,
              },
            }}
          >
            {projects.map((project, index) => (
              <SwiperSlide key={`${project.slug}-${index}`}>
                <ProjectCard {...project} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Mobile navigation — small arrows under cards, centered */}
          <div className="flex sm:hidden items-center justify-center gap-4 mt-2">
            <SliderArrow
              direction="left"
              onClick={handlePrev}
              disabled={false}
              variant="gold"
              className="!w-11 !h-11"
            />
            <SliderArrow
              direction="right"
              onClick={handleNext}
              disabled={false}
              variant="gold"
              className="!w-11 !h-11"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
