import React from 'react';
import { PartnerLogo, PartnerLogoProps } from '@/components/shared';

export interface PartnersSectionProps {
  logos: PartnerLogoProps[];
}

export function PartnersSection({ logos }: PartnersSectionProps) {
  return (
    <section className="section-with-bg py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-8">
          {logos.map((logo, index) => (
            <PartnerLogo key={index} {...logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

