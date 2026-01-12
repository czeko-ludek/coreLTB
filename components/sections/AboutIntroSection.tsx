'use client';

import React from 'react';
import { SectionLabel } from '@/components/ui';
import { PhilosophyCard, PhilosophyCardProps } from '@/components/shared';

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
    // Check if IntersectionObserver is available (client-side only)
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
    <section
      ref={sectionRef}
      className="py-20"
      style={{ backgroundColor: '#efebe7' }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[80%_20%] gap-0 items-center relative">
          {/* Left: Text Content in White Box (extends far under right side) */}
          <div
            className={`bg-white rounded-xl shadow-lg px-8 py-8 lg:px-10 lg:py-28 space-y-6 relative z-0 ${
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="lg:pr-80">
              <SectionLabel>{label}</SectionLabel>

              <h1 className="text-h2 lg:text-display font-bold text-text-primary">
                {title}
              </h1>

              <div className="space-y-4">
                {description.map((paragraph, index) => (
                  <p
                    key={index}
                    className="text-body-lg text-text-secondary leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Philosophy Cards (overlapping white box heavily) */}
          <div className="space-y-5 lg:-ml-80 relative z-10 mt-8 lg:mt-0">
            {philosophyCards.map((card, index) => (
              <div
                key={index}
                className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
                style={{ animationDelay: `${0.4 + index * 0.15}s` }}
              >
                <PhilosophyCard {...card} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
