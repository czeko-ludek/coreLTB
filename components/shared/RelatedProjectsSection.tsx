'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import { Icon } from '@/components/ui';

export interface RelatedProject {
  slug: string;
  title: string;
  surfaceArea: string;
  price: string;
}

export interface RelatedProjectsSectionProps {
  currentProjectSlug: string; // Slug aktualnego projektu (żeby go wykluczyć)
  allProjects: RelatedProject[];
}

export function RelatedProjectsSection({
  currentProjectSlug,
  allProjects,
}: RelatedProjectsSectionProps) {
  const [swiperInstance, setSwiperInstance] = React.useState<SwiperType | null>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filtruj projekty - wyłącz aktualny projekt i weź max 4
  const relatedProjects = allProjects
    .filter(project => project.slug !== currentProjectSlug)
    .slice(0, 4);

  if (!isMounted) {
    return (
      <section className="py-12 md:py-16 bg-background-light">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary text-center mb-8 md:mb-12">
            Zobacz również inne projekty
          </h2>
          <div className="min-h-[300px] md:min-h-[400px] flex items-center justify-center">
            <div className="animate-pulse text-text-secondary">Ładowanie...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-16" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4">
            Zobacz również inne projekty
          </h2>
          <p className="text-base md:text-lg text-text-secondary">
            Sprawdź nasze inne realizacje, które mogą Cię zainteresować
          </p>
        </div>

        {/* Projects Slider */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={relatedProjects.length > 2}
            speed={600}
            navigation={{
              prevEl: '.related-prev',
              nextEl: '.related-next',
            }}
            pagination={{
              clickable: true,
              bulletClass: 'swiper-pagination-bullet related-bullet',
              bulletActiveClass: 'swiper-pagination-bullet-active related-bullet-active',
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 4, spaceBetween: 24 },
            }}
            onSwiper={setSwiperInstance}
            className="related-projects-swiper pb-12"
          >
            {relatedProjects.map((project) => (
              <SwiperSlide key={project.slug}>
                <Link href={`/projekty/${project.slug}`}>
                  <div className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {/* Thumbnail Image */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                      <Image
                        src={`/images/projekty/${project.slug}/thumbnail.webp`}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>

                    {/* Project Info */}
                    <div className="p-4 md:p-5">
                      {/* Title */}
                      <h3 className="text-base md:text-lg font-bold text-text-primary mb-2 md:mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Details */}
                      <div className="flex items-center justify-between gap-3 md:gap-4 mb-3 md:mb-4">
                        {/* Surface Area */}
                        <div className="flex items-center gap-1.5 md:gap-2">
                          <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                            <Icon name="building" size="sm" className="text-primary" />
                          </div>
                          <div>
                            <p className="text-[0.65rem] md:text-xs text-text-secondary">Powierzchnia</p>
                            <p className="text-xs md:text-sm font-bold text-text-primary">{project.surfaceArea}</p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <p className="text-[0.65rem] md:text-xs text-text-secondary">Cena projektu</p>
                          <p className="text-base md:text-lg font-bold text-primary">{project.price}</p>
                        </div>
                      </div>

                      {/* CTA Link */}
                      <div className="flex items-center justify-center gap-2 text-primary font-medium text-xs md:text-sm group-hover:gap-3 transition-all duration-300">
                        <span>Zobacz projekt</span>
                        <Icon name="arrowRight" size="sm" />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows - Desktop */}
          {relatedProjects.length > 4 && (
            <>
              <button
                className="related-prev hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 z-10 w-12 h-12 rounded-full bg-white border-2 border-primary/30 shadow-md hover:border-primary hover:shadow-lg flex items-center justify-center transition-all duration-300"
                aria-label="Poprzedni projekt"
              >
                <Icon name="chevronLeft" size="lg" className="text-primary" />
              </button>
              <button
                className="related-next hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 z-10 w-12 h-12 rounded-full bg-white border-2 border-primary/30 shadow-md hover:border-primary hover:shadow-lg flex items-center justify-center transition-all duration-300"
                aria-label="Następny projekt"
              >
                <Icon name="chevronRight" size="lg" className="text-primary" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
