'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps, ResponsibilityCardProps } from '@/components/shared';
import { Icon } from '@/components/ui';

export interface BusinessResponsibilitySectionProps {
  header: SectionHeaderProps;
  cards: ResponsibilityCardProps[];
}

export function BusinessResponsibilitySection({
  header,
  cards,
}: BusinessResponsibilitySectionProps) {
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

        {/* Timeline Container */}
        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Gold Line */}
          <div className="absolute left-10 top-20 bottom-0 w-[3px] bg-gradient-to-b from-primary via-primary/80 to-primary/20 hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-8">
            {cards.map((card, index) => (
                <div
                  key={index}
                  className={`flex gap-6 relative ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${0.2 + index * 0.15}s` }}
                >
                  {/* Icon circle with number badge */}
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-full bg-primary shadow-md flex items-center justify-center">
                      <Icon name={card.icon} size="xl" className="text-white" />
                    </div>

                    {/* Number badge on top right */}
                    <div className="absolute -top-1 -right-1 w-10 h-10 rounded-full bg-primary border-4 border-white shadow-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Content Card */}
                  <div className="flex-1 bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
                    <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight">
                      {card.title}
                    </h3>
                    <div className="w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent mb-3"></div>
                    <p className="text-body-md text-text-secondary leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
