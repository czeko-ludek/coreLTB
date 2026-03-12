'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Icon, IconName } from '@/components/ui';
import clsx from 'clsx';

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

  // First card = hero (full width), rest = 3 columns
  const heroCard = cards[0];
  const supportCards = cards.slice(1);

  return (
    <section id={id} ref={sectionRef} className="bg-background-beige py-16 sm:py-20">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={clsx('mb-12', isVisible ? 'animate-fade-in-up' : 'opacity-0')}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} />
        </div>

        {/* Hero card — full width, horizontal layout */}
        {heroCard && (
          <div
            className={clsx(
              'bg-zinc-900 rounded-2xl p-8 sm:p-10 lg:p-12 mb-6',
              'flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10',
              isVisible ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary flex items-center justify-center">
              <Icon name={heroCard.icon} size="lg" className="text-white" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 leading-tight">
                {heroCard.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                {heroCard.description}
              </p>
            </div>
          </div>
        )}

        {/* Supporting cards — 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {supportCards.map((card, index) => (
            <div
              key={index}
              className={clsx(
                'bg-white rounded-2xl border border-zinc-200/60 p-6 md:p-8',
                'group hover:shadow-lg hover:border-primary/20 transition-all duration-300',
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Icon */}
              <div className="mb-5">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={card.icon} size="md" className="text-primary" />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-text-primary mb-2 leading-tight">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
