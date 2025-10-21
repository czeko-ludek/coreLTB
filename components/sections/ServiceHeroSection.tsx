import React from 'react';
import { SectionLabel } from '@/components/ui';

export interface ServiceHeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
}

/**
 * ServiceHeroSection - Organizm
 *
 * Sekcja hero dla strony usługi. Wyświetla tytuł, podtytuł i krótki opis.
 * Ta sekcja NIE ma background image - będzie używana razem z PageHeader,
 * który już posiada obrazek tła.
 *
 * Cechy:
 * - Beżowe tło (#efebe7)
 * - Centrowany układ
 * - Animacje fade-in-up z stagger delay
 * - Responsywne paddingi
 */
export function ServiceHeroSection({
  title,
  subtitle,
  description,
}: ServiceHeroSectionProps) {
  return (
    <section className="bg-background py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-12 max-w-5xl">
        <div className="text-center space-y-6">
          {/* Subtitle/Tagline */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '0.1s' }}
          >
            <SectionLabel>{subtitle}</SectionLabel>
          </div>

          {/* Title */}
          <h1
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-text-primary leading-tight animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            {title}
          </h1>

          {/* Description */}
          <p
            className="text-base md:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed animate-fade-in-up whitespace-pre-line"
            style={{ animationDelay: '0.3s' }}
          >
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
