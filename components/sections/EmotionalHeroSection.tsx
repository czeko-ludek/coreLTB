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
    <section id="emotional-hero" className="py-0 md:py-6 bg-white md:bg-background-beige">
      <div className="md:container mx-auto px-0 md:px-6 lg:px-8">
        <div
          className="bg-white md:rounded-xl md:shadow-lg px-4 py-5 md:p-9 lg:p-12 animate-fade-in-up"
          style={{ animationDelay: '0.3s' }}
        >
          {/* Grid layout: tekst po lewej, CTA Box po prawej (desktop) */}
          {/* Mobile: CTA box PIERWSZY (order-first), tekst DRUGI */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-5 lg:gap-9 items-start">
            {/* Lewa kolumna - tekst (na mobile: order-2, pod CTA) */}
            <div className="order-2 lg:order-1">
              {/* Label (złoty akcent) */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
                <SectionLabel className="mb-4">{label}</SectionLabel>
              </div>

              {/* Headline (H2 - główny nagłówek sekcji, H1 jest w PageHeader) */}
              <h2
                className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3 md:mb-4 leading-tight animate-fade-in-up"
                style={{ animationDelay: '0.5s' }}
              >
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
              <p
                className="text-base md:text-lg text-text-secondary leading-relaxed animate-fade-in-up"
                style={{ animationDelay: '0.6s' }}
              >
                {subtitle}
              </p>

              {/* Benefits (opcjonalne) - 2-3 bullet points */}
              {benefits && benefits.length > 0 && (
                <ul className="mt-4 md:mt-6 space-y-2.5">
                  {benefits.map((benefit, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 animate-fade-in-up"
                      style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                    >
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

            {/* Prawa kolumna - CTA Box (na mobile: order-1, PIERWSZY widoczny) */}
            <div
              className="order-1 lg:order-2 w-full lg:w-auto lg:min-w-[456px] lg:max-w-[516px] animate-fade-in-right"
              style={{ animationDelay: '0.5s' }}
            >
              <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl p-5 md:p-6 border-2 border-primary/20 h-full flex flex-col">
                {/* Tytuł */}
                <h3 className="text-base md:text-lg font-bold text-text-primary mb-3 text-center">
                  {ctaBoxTitle}
                </h3>

                {/* Benefity */}
                <p className="text-sm md:text-base font-semibold text-text-primary mb-3">
                  Podczas konsultacji:
                </p>
                <ul className="space-y-2 mb-3 flex-grow">
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
                <p className="text-xs md:text-sm text-text-secondary text-center mb-3 italic">
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
