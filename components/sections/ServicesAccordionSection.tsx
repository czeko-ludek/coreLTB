'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { AccordionItem, AccordionItemProps } from '@/components/shared/AccordionItem';

export interface ServicesAccordionSectionProps {
  header: SectionHeaderProps;
  services: AccordionItemProps[];
}

export const ServicesAccordionSection: React.FC<ServicesAccordionSectionProps> = ({
  header,
  services,
}) => {
  return (
    <section id="faq-section" className="py-16 sm:py-20 lg:py-24 scroll-mt-24" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4">
        {/* 2-kolumnowy layout: Header (lewo) + Pytania (prawo) */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-8 lg:gap-12">
          {/* Lewa kolumna - Header */}
          <div>
            <SectionHeader {...header} align="left" theme="light" />
          </div>

          {/* Prawa kolumna - Pytania */}
          <div className="space-y-4">
            {services.map((service, index) => (
              <AccordionItem key={index} {...service} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
