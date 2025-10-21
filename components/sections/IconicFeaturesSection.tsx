import React from 'react';
import { ServiceFeatureCard } from '@/components/shared/ServiceFeatureCard';
import { IconName } from '@/components/ui';

export interface Feature {
  icon: IconName;
  title: string;
  description: string;
}

export interface IconicFeaturesSectionProps {
  features: Feature[];
}

/**
 * IconicFeaturesSection - Organizm
 *
 * Sekcja wyświetlająca główne cechy/benefity usługi w formie kart z ikonami.
 * Używa molekuły ServiceFeatureCard.
 *
 * Cechy:
 * - Beżowe tło (#efebe7)
 * - Responsywna siatka (1 col mobile, 2 tablet, 4 desktop)
 * - Karty z efektem hover
 */
export function IconicFeaturesSection({
  features,
}: IconicFeaturesSectionProps) {
  return (
    <section className="bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <ServiceFeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
