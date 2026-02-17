'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { AccordionItem, AccordionItemProps } from '@/components/shared/AccordionItem';
import { clsx } from 'clsx';

export interface ServicesAccordionSectionProps {
  id?: string;
  header: SectionHeaderProps;
  services: AccordionItemProps[];
}

export const ServicesAccordionSection: React.FC<ServicesAccordionSectionProps> = ({
  id,
  header,
  services,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  return (
    <section id={id || "faq-section"} ref={ref} className="py-16 sm:py-20 lg:py-24 scroll-mt-24 bg-background-beige">
      <div className="container mx-auto px-4">
        {/* 2-kolumnowy layout: Header (lewo) + Pytania (prawo) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
          {/* Lewa kolumna - Header */}
          <div
            className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.1s' }}
          >
            <SectionHeader {...header} align="left" theme="light" />
          </div>

          {/* Prawa kolumna - Pytania */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <div
                key={index}
                className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
                style={{ animationDelay: `${0.2 + index * 0.08}s` }}
              >
                <AccordionItem {...service} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
