'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Icon, IconName } from '@/components/ui';

export interface ResponsibilityCardProps {
  icon: IconName;
  title: string;
  description: string;
}

export interface BusinessResponsibilitySectionProps {
  id?: string;
  header: SectionHeaderProps;
  cards: ResponsibilityCardProps[];
}

export function BusinessResponsibilitySection({
  id,
  header,
  cards,
}: BusinessResponsibilitySectionProps) {
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
    <section id={id} ref={sectionRef} className="bg-background-beige py-16 sm:py-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} />
        </div>

        {/* Bento Grid - 4 kolumny */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8 flex flex-col hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.2 + index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
                  <Icon name={card.icon} size="lg" className="text-white" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight">
                {card.title}
              </h3>

              {/* Divider */}
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-primary/30 mb-4"></div>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed flex-grow">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
