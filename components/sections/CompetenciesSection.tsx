'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps, CompetenceCard, CompetenceCardProps } from '@/components/shared';

export interface CompetenciesSectionProps {
  header: SectionHeaderProps;
  competencies: CompetenceCardProps[];
}

export function CompetenciesSection({
  header,
  competencies,
}: CompetenciesSectionProps) {
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
        {/* Section Header */}
        <div
          className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} />
        </div>

        {/* Competence Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {competencies.map((competence, index) => (
            <div
              key={index}
              className={isVisible ? 'animate-fade-in-up' : 'opacity-0'}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              <CompetenceCard {...competence} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
