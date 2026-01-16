'use client';

import React from 'react';
import { SectionLabel, Icon } from '@/components/ui';
import { PhilosophyCardProps } from '@/components/shared';

export interface AboutIntroSectionProps {
  label: string;
  title: string;
  description: string[];
  philosophyCards: PhilosophyCardProps[];
}

export function AboutIntroSection({
  label,
  title,
  description,
  philosophyCards,
}: AboutIntroSectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#efebe7] py-16 sm:py-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Main Content Card - Bento Style */}
        <div
          className={`bg-white rounded-3xl border border-gray-100 shadow-xl p-8 md:p-12 lg:p-16 mb-8 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionLabel>{label}</SectionLabel>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            {title}
          </h1>

          <div className="space-y-4 max-w-4xl">
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-text-secondary leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Philosophy Cards Grid - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophyCards.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden group hover:shadow-xl hover:scale-105 transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Złoty pasek górny */}
              <div className="h-2 bg-gradient-to-r from-primary via-primary to-primary/80"></div>

              <div className="p-6 md:p-8">
                <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight">
                  {card.title}
                </h3>

                <p className="text-text-secondary text-sm leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
