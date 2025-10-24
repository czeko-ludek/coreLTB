import React from 'react';
import { Button, SectionLabel } from '@/components/ui';

export interface EmotionalHeroSectionProps {
  label: string;
  headline: string | string[];
  subtitle: string;
  ctaText: string;
  ctaLink: string;
}

export const EmotionalHeroSection: React.FC<EmotionalHeroSectionProps> = ({
  label,
  headline,
  subtitle,
  ctaText,
  ctaLink,
}) => {
  return (
    <section id="emotional-hero" className="py-6 md:py-8" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 lg:p-16">
          {/* Grid layout: tekst po lewej, przycisk po prawej */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center">
            {/* Lewa kolumna - tekst */}
            <div>
              {/* Label (złoty akcent) */}
              <SectionLabel className="mb-4">{label}</SectionLabel>

              {/* Headline (H2 - główny nagłówek sekcji, H1 jest w PageHeader) */}
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4 md:mb-6 leading-tight">
                {Array.isArray(headline) ? (
                  headline.map((line, index) => (
                    <React.Fragment key={index}>
                      {line}
                      {index < headline.length - 1 && <br />}
                    </React.Fragment>
                  ))
                ) : (
                  headline
                )}
              </h2>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Prawa kolumna - CTA Button */}
            <div className="flex justify-start lg:justify-center">
              <Button variant="primary" size="lg" href={ctaLink}>
                {ctaText}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
