'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';

interface PhilosophyCard {
  number: number;
  title: string;
  description: string;
}

export interface AboutIntroSectionProps {
  label: string;
  title: string;
  titleHighlight?: string;
  description: string[];
  philosophyCards: PhilosophyCard[];
}

export function AboutIntroSection({
  label,
  title,
  titleHighlight,
  description,
  philosophyCards,
}: AboutIntroSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="bg-background-beige py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">

        {/* Header - wyśrodkowany */}
        <div className="text-center mb-12 lg:mb-16">
          <span
            className={clsx(
              'inline-flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider mb-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            {label}
          </span>

          <h1
            className={clsx(
              'text-3xl md:text-4xl lg:text-6xl font-black text-zinc-900 leading-[1.1] mb-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {title}
            {titleHighlight && (
              <span className="block text-primary">{titleHighlight}</span>
            )}
          </h1>

          <div
            className={clsx(
              'max-w-3xl mx-auto space-y-4',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.3s' }}
          >
            {description.map((paragraph, index) => (
              <p
                key={index}
                className="text-base md:text-lg text-zinc-600 leading-relaxed"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Philosophy Cards - grid 3 kolumny */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophyCards.map((card, index) => (
            <div
              key={index}
              className={clsx(
                'bg-white rounded-2xl p-6 md:p-8 border border-zinc-200 shadow-lg',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Numer + Linia */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl font-black text-primary/40">
                  {String(card.number).padStart(2, '0')}
                </span>
                <div className="h-px flex-grow bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              {/* Tytuł */}
              <h3 className="text-xl font-bold text-zinc-900 mb-3">
                {card.title}
              </h3>

              {/* Opis */}
              <p className="text-sm text-zinc-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
