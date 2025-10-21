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
    <section className="py-16 sm:py-20 lg:py-24" style={{ backgroundColor: '#efebe7' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader {...header} align="center" theme="light" />

        <div className="mt-12 space-y-5">
          {services.map((service, index) => (
            <AccordionItem key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};
