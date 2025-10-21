import React from 'react';
import { SectionLabel, Icon } from '@/components/ui';

export interface ServiceAreaSectionProps {
  provinces: string[];
  description: string;
}

/**
 * ServiceAreaSection - Organizm
 *
 * Sekcja pokazująca obszar działania firmy (województwa).
 * Wyświetla listę województw w elegancki sposób.
 *
 * Cechy:
 * - Białe tło
 * - Lista województw z ikonami MapPin
 * - Responsywna siatka
 * - Dodatkowy opis wyjaśniający przewagę lokalnego działania
 */
export function ServiceAreaSection({
  provinces,
  description,
}: ServiceAreaSectionProps) {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <SectionLabel>Obszar działania</SectionLabel>
          <h2 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-4">
            Budujemy w południowej Polsce
          </h2>
          <p className="text-base md:text-lg text-text-secondary mt-6 max-w-3xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Provinces Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {provinces.map((province, index) => (
            <div
              key={index}
              className="
                bg-background rounded-xl p-4 md:p-6
                shadow-md
                flex items-center gap-3
                transition-all duration-300
                hover:shadow-lg hover:-translate-y-1
              "
            >
              <Icon
                name="mapPin"
                size="lg"
                className="text-primary flex-shrink-0"
              />
              <span className="text-sm md:text-base font-semibold text-text-primary capitalize">
                {province}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
