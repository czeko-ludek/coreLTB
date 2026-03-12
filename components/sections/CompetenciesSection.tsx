'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { Icon, IconName } from '@/components/ui';

interface CompetencyCard {
  icon: IconName;
  title: string;
  description: string;
}

export interface CompetenciesSectionProps {
  label: string;
  title: string;
  titleHighlight?: string;
  competencies: CompetencyCard[];
}

export function CompetenciesSection({
  label,
  title,
  titleHighlight,
  competencies,
}: CompetenciesSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="bg-zinc-900 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">

        {/* Header — centered, light text on dark */}
        <div className="text-center mb-12 lg:mb-16">
          <span
            className={clsx(
              'inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-4',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            {label}
          </span>

          <h2
            className={clsx(
              'text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {title}
            {titleHighlight && (
              <span className="text-primary"> {titleHighlight}</span>
            )}
          </h2>
        </div>

        {/* Editorial list — no boxes, gold dividers */}
        <div className="max-w-4xl mx-auto">
          {competencies.map((comp, index) => (
            <div
              key={index}
              className={clsx(
                'group',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Gold divider line */}
              <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

              {/* Content row */}
              <div className="flex items-start gap-5 sm:gap-8 py-8 sm:py-10">
                {/* Icon circle */}
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <Icon name={comp.icon} size="lg" className="text-primary" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white group-hover:text-primary transition-colors duration-300">
                      {comp.title}
                    </h3>
                    <span className="hidden sm:block text-sm font-mono font-bold text-zinc-600 flex-shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                    {comp.description}
                  </p>
                </div>
              </div>

              {/* Last divider */}
              {index === competencies.length - 1 && (
                <div className="h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
