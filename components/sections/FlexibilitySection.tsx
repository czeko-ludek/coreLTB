import React from 'react';
import { FlexibilityOptionCard } from '@/components/shared/FlexibilityOptionCard';
import { SectionLabel } from '@/components/ui';
import { IconName } from '@/components/ui';

export interface FlexibilityOption {
  stage: string;
  description: string;
  icon: IconName;
}

export interface FlexibilitySectionProps {
  title: string;
  options: FlexibilityOption[];
}

/**
 * FlexibilitySection - Organizm
 *
 * Sekcja pokazująca elastyczność rozpoczęcia współpracy na różnych etapach budowy.
 * To kluczowa sekcja perswazji - pokazuje, że firma może pomóc niezależnie od etapu.
 *
 * Cechy:
 * - Białe tło
 * - Tytuł + label na górze
 * - Lista opcji z animacją stagger
 */
export function FlexibilitySection({
  title,
  options,
}: FlexibilitySectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel>Elastyczność</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-4">
            {title}
          </h2>
        </div>

        {/* Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {options.map((option, index) => (
            <FlexibilityOptionCard
              key={index}
              stage={option.stage}
              description={option.description}
              icon={option.icon}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
