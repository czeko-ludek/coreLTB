'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { Icon, IconName } from '@/components/ui';

interface WhyUsCard {
  icon: IconName;
  title: string;
  description: string;
}

export interface WhyUsSectionProps {
  label: string;
  title: string;
  competencies: WhyUsCard[];
}

const fadeStyle = (delay?: number): React.CSSProperties => ({
  transitionProperty: 'opacity, transform',
  transitionDuration: '600ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  ...(delay != null && { transitionDelay: `${delay}ms` }),
});

function CompetencyCard({ comp, index }: { comp: WhyUsCard; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg hover:ring-2 hover:ring-primary/20 transition-[shadow,ring-color] duration-300 text-center ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={fadeStyle(index * 100)}
    >
      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
        <Icon name={comp.icon} size="lg" className="text-primary" />
      </div>
      <h3 className="text-lg font-bold text-text-primary mt-4 group-hover:text-primary transition-colors">
        {comp.title}
      </h3>
      <p className="text-sm text-text-secondary mt-2 leading-relaxed">
        {comp.description}
      </p>
    </div>
  );
}

export function WhyUsSection({ label, title, competencies }: WhyUsSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="py-12 lg:py-16 bg-background-beige">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={`text-center mb-10 ${headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          style={fadeStyle()}
        >
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            {label}
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary">
            {title}
          </h2>
        </div>

        {/* 4 kolumny — max 4 karty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {competencies.slice(0, 4).map((comp, index) => (
            <CompetencyCard key={comp.title} comp={comp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
