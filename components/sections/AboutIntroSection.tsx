'use client';

import React from 'react';
import Image from 'next/image';
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
  image?: { src: string; alt: string };
  philosophyCards: PhilosophyCard[];
}

export function AboutIntroSection({
  label,
  title,
  titleHighlight,
  description,
  image,
  philosophyCards,
}: AboutIntroSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="bg-background-beige py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">

        {/* Split layout: text left + image right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-16 lg:mb-20">

          {/* Left — Text content */}
          <div>
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
                'text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 leading-[1.1] mb-6',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.2s' }}
            >
              {title}
              {titleHighlight && (
                <span className="block text-primary mt-1">{titleHighlight}</span>
              )}
            </h1>

            <div
              className={clsx(
                'space-y-4',
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

          {/* Right — Logo showcase */}
          {image && (
            <div
              className={clsx(
                'relative aspect-[4/3] rounded-2xl overflow-hidden',
                'bg-zinc-900 flex items-center justify-center',
                'shadow-xl',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.3s' }}
            >
              {/* Subtle radial glow behind logo */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,187,104,0.08)_0%,transparent_70%)]" />
              <Image
                src={image.src}
                alt={image.alt}
                width={320}
                height={320}
                className="relative z-10 w-3/5 max-w-[320px] h-auto object-contain"
              />
              {/* Gold accent ring */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-primary/20" />
            </div>
          )}
        </div>

        {/* Philosophy Cards — 3-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophyCards.map((card, index) => (
            <div
              key={index}
              className={clsx(
                'bg-white rounded-2xl border border-zinc-200/60 shadow-md',
                'border-l-4 border-l-primary',
                'pl-6 pr-6 py-6 md:pl-7 md:pr-8 md:py-8',
                'hover:shadow-lg hover:border-l-primary-dark transition-all duration-300',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: `${0.4 + index * 0.1}s` }}
            >
              {/* Number badge + Title row */}
              <div className="flex items-center gap-3 mb-3">
                <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-primary text-white text-sm font-bold flex items-center justify-center">
                  {String(card.number).padStart(2, '0')}
                </span>
                <h3 className="text-lg font-bold text-zinc-900">
                  {card.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-sm text-zinc-600 leading-relaxed pl-[3.25rem]">
                {card.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
