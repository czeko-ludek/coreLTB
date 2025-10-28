import React from 'react';
import { Button, SectionLabel, Icon } from '@/components/ui';

export interface EmotionalHeroSectionProps {
  label: string;
  headline: string | string[];
  subtitle: string;
  benefits?: string[]; // Opcjonalne bullet points (2-3) z benefitami

  // CTA Box (REQUIRED)
  ctaBoxTitle: string; // np. "☎ Umów Konsultację (30 min)"
  ctaBoxBenefits: string[]; // 4 bullet points wartości
  ctaBoxSubtext: string; // np. "Konsultacja bezpłatna..."
  ctaBoxButtons: Array<{
    text: string;
    href?: string;
    variant?: 'primary' | 'secondary';
  }>;
}

export const EmotionalHeroSection: React.FC<EmotionalHeroSectionProps> = ({
  label,
  headline,
  subtitle,
  benefits,
  ctaBoxTitle,
  ctaBoxBenefits,
  ctaBoxSubtext,
  ctaBoxButtons,
}) => {
  return (
    <section id="emotional-hero" className="py-6 md:py-8" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 lg:p-16">
          {/* Grid layout: tekst po lewej, CTA Box po prawej */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-start">
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

              {/* Benefits (opcjonalne) - 2-3 bullet points */}
              {benefits && benefits.length > 0 && (
                <ul className="mt-6 md:mt-8 space-y-3">
                  {benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Icon
                        name="check"
                        className="text-primary mt-1 flex-shrink-0"
                        size="md"
                      />
                      <span className="text-base md:text-lg text-text-primary font-medium">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Prawa kolumna - CTA Box */}
            <div className="w-full lg:w-auto lg:min-w-[380px] lg:max-w-[420px]">
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-6 md:p-7 border-2 border-primary/20 h-full flex flex-col">
                {/* Tytuł */}
                <h3 className="text-lg md:text-xl font-bold text-text-primary mb-4 text-center">
                  {ctaBoxTitle}
                </h3>

                {/* Benefity */}
                <p className="text-sm md:text-base font-semibold text-text-primary mb-3">
                  Podczas konsultacji:
                </p>
                <ul className="space-y-2.5 mb-4 flex-grow">
                  {ctaBoxBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <Icon
                        name="check"
                        className="text-primary mt-0.5 flex-shrink-0"
                        size="md"
                      />
                      <span className="text-sm md:text-base text-text-primary leading-snug">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Subtext */}
                <p className="text-xs md:text-sm text-text-secondary text-center mb-4 italic">
                  {ctaBoxSubtext}
                </p>

                {/* Buttons - obok siebie (kompaktowe) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ctaBoxButtons.map((btn, index) => (
                    <Button
                      key={index}
                      variant="secondary"
                      size="sm"
                      href={btn.href}
                      className="w-full !px-3"
                    >
                      {btn.text}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
