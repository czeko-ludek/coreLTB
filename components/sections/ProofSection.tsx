import React from 'react';
import { ProofStatCard } from '@/components/shared/ProofStatCard';
import { SectionLabel } from '@/components/ui';

export interface ProofItem {
  value: string;
  label: string;
  description?: string;
}

export interface ProofSectionProps {
  proofItems: ProofItem[];
}

/**
 * ProofSection - Organizm
 *
 * Sekcja wyświetlająca dowody społeczne (social proof) - statystyki budujące zaufanie.
 * Kluczowa sekcja perswazji pokazująca konkretne liczby i osiągnięcia firmy.
 *
 * Cechy:
 * - Beżowe tło
 * - Responsywna siatka statystyk
 * - Animacje scroll-triggered z stagger delay
 * - Duże, złote wartości liczbowe przyciągające wzrok
 */
export function ProofSection({ proofItems }: ProofSectionProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel>Zaufanie</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-4">
            Liczby mówią same za siebie
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {proofItems.map((item, index) => (
            <ProofStatCard
              key={index}
              value={item.value}
              label={item.label}
              description={item.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
