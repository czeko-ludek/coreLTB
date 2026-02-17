'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps, ServiceCard, ServiceCardProps } from '@/components/shared';
import { Button } from '@/components/ui';

export interface ServicesBentoSectionProps {
  header: SectionHeaderProps;
  services: ServiceCardProps[];
}

export function ServicesBentoSection({ header, services }: ServicesBentoSectionProps) {
  // Scroll-triggered animation
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

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

        {/* Bento Grid - asymetryczny układ */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${inView ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.8s' }}
        >
          {/* Card 1 - Tall (1 col × 2 rows) */}
          {services[0] && (
            <div className="md:row-span-2">
              <ServiceCard {...services[0]} />
            </div>
          )}

          {/* Card 2 - Wide (2 cols × 1 row) */}
          {services[1] && (
            <div className="md:col-span-2 lg:col-span-2">
              <ServiceCard {...services[1]} />
            </div>
          )}

          {/* Card 3 - Standard (1×1) */}
          {services[2] && (
            <div>
              <ServiceCard {...services[2]} />
            </div>
          )}

          {/* Card 4 - Standard (1×1) */}
          {services[3] && (
            <div>
              <ServiceCard {...services[3]} />
            </div>
          )}

          {/* Card 5 - Wide (2 cols × 1 row) */}
          {services[4] && (
            <div className="md:col-span-2">
              <ServiceCard {...services[4]} />
            </div>
          )}

          {/* Card 6 - Standard (1×1) */}
          {services[5] && (
            <div>
              <ServiceCard {...services[5]} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
