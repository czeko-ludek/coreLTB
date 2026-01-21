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
    <section ref={ref} className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">

        {/* Header - wyśrodkowany */}
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
              'text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-tight',
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

        {/* Cards Grid - 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {competencies.map((comp, index) => (
            <div
              key={index}
              className={clsx(
                'bg-white rounded-3xl p-8 lg:p-10 border border-zinc-200 shadow-lg',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: `${0.3 + index * 0.1}s` }}
            >
              {/* Ikona + Numer */}
              <div className="flex items-center gap-4 mb-6">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Icon name={comp.icon} size="lg" className="text-primary" />
                </div>
                <span className="text-5xl font-black text-zinc-200">
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>

              {/* Tytuł */}
              <h3 className="text-xl lg:text-2xl font-bold text-zinc-900 mb-4">
                {comp.title}
              </h3>

              {/* Złota linia */}
              <div className="w-16 h-1 bg-gradient-to-r from-primary to-transparent mb-4" />

              {/* Opis */}
              <p className="text-zinc-600 leading-relaxed">
                {comp.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
