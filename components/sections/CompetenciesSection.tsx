'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Icon, IconName } from '@/components/ui';

export interface CompetenceCardProps {
  icon: IconName;
  title: string;
  description: string;
}

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
    <section ref={sectionRef} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} />
        </div>

        {/* Asymetryczny Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Card 1 - Duża (2 kolumny) */}
          {competencies[0] && (
            <div
              className={`md:col-span-2 bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 shadow-lg p-5 md:p-6 hover:shadow-xl hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.2s' }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={competencies[0].icon} size="lg" className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4 leading-tight">
                {competencies[0].title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {competencies[0].description}
              </p>
            </div>
          )}

          {/* Card 2 - Wysoka (2 rows) */}
          {competencies[1] && (
            <div
              className={`md:row-span-2 bg-gradient-to-br from-primary/5 to-white rounded-3xl border-2 border-gray-200 shadow-lg p-5 md:p-6 hover:shadow-xl hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={competencies[1].icon} size="lg" className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4 leading-tight">
                {competencies[1].title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {competencies[1].description}
              </p>
            </div>
          )}

          {/* Card 3 - Normalna */}
          {competencies[2] && (
            <div
              className={`bg-gradient-to-br from-gray-50 to-white rounded-3xl border-2 border-gray-200 shadow-lg p-5 md:p-6 hover:shadow-xl hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.4s' }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={competencies[2].icon} size="lg" className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4 leading-tight">
                {competencies[2].title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {competencies[2].description}
              </p>
            </div>
          )}

          {/* Card 4 - Duża (2 kolumny) */}
          {competencies[3] && (
            <div
              className={`md:col-span-2 bg-gradient-to-br from-white to-gray-50 rounded-3xl border-2 border-gray-200 shadow-lg p-5 md:p-6 hover:shadow-xl hover:border-primary/30 hover:scale-[1.02] transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon name={competencies[3].icon} size="lg" className="text-primary" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4 leading-tight">
                {competencies[3].title}
              </h3>
              <p className="text-base text-text-secondary leading-relaxed">
                {competencies[3].description}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
