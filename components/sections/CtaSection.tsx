import React from 'react';
import { Button } from '@/components/ui';

export interface CtaSectionProps {
  title: string;
  primaryButton: { text: string; href: string };
  secondaryButton: { text: string; href: string };
}

export function CtaSection({
  title,
  primaryButton,
  secondaryButton,
}: CtaSectionProps) {
  return (
    <section className="bg-primary py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Worker Images Collage (placeholder) */}
          <div className="relative h-96 lg:h-full opacity-30 lg:opacity-100">
            {/* This would contain the actual image collage */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-primary"></div>
          </div>

          {/* Right: Content */}
          <div className="space-y-8">
            <h2 className="text-display font-bold text-white leading-tight">
              {title}
            </h2>
            
            <div className="flex flex-wrap gap-4">
              <Button variant="secondary" size="lg" href={primaryButton.href}>
                {primaryButton.text}
              </Button>
              <Button variant="secondary" size="lg" href={secondaryButton.href}>
                {secondaryButton.text}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


