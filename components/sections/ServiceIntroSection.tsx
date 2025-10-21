import React from 'react';
import { Button, Icon } from '@/components/ui';

export interface ServiceIntroSectionProps {
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export function ServiceIntroSection({
  headline,
  description,
  ctaText,
  ctaLink,
}: ServiceIntroSectionProps) {
  return (
    <section className="bg-background py-16 sm:py-20">
      <div className="container mx-auto px-4 md:px-8 lg:px-12">
        <div className="max-w-4xl">
          {/* Headline - wyrównany do lewej */}
          <h2 className="mb-6 text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
            {headline}
          </h2>

          {/* Description - wyrównany do lewej, whitespace-pre-line dla \n */}
          <p className="mb-8 whitespace-pre-line text-lg leading-relaxed text-text/80">
            {description}
          </p>

          {/* CTA Button */}
          <div>
            <Button
              variant="primary"
              size="lg"
              href={ctaLink}
              rightIcon={<Icon name="arrowRight" size="sm" />}
            >
              {ctaText}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
