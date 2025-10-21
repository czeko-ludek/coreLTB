'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';

export interface PhilosophyItem {
  title: string;
  description: string;
}

export interface PhilosophySectionProps {
  image: string;
  imageAlt: string;
  headline: string;
  introText: string;
  philosophyTitle: string;
  philosophyItems: PhilosophyItem[];
  closingText: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({
  image,
  imageAlt,
  headline,
  introText,
  philosophyTitle,
  philosophyItems,
  closingText,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          {/* Left: Image */}
          <div
            className={`transition-all duration-1000 ${
              inView ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl shadow-xl">
              <Image
                src={image}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>

          {/* Right: Content */}
          <div
            className={`flex flex-col justify-center transition-all duration-1000 ${
              inView ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <h2 className="mb-6 text-3xl font-bold leading-tight text-text sm:text-4xl lg:text-5xl">
              {headline}
            </h2>

            <p className="mb-8 whitespace-pre-line text-lg leading-relaxed text-text/80">
              {introText}
            </p>

            <h3 className="mb-4 text-xl font-semibold text-text sm:text-2xl">
              {philosophyTitle}
            </h3>

            <ul className="mb-8 space-y-4">
              {philosophyItems.map((item, index) => (
                <li key={index} className="flex gap-3">
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                  </span>
                  <div>
                    <strong className="font-semibold text-text">{item.title}:</strong>{' '}
                    <span className="text-text/80">{item.description}</span>
                  </div>
                </li>
              ))}
            </ul>

            <p className="text-lg leading-relaxed text-text/80">{closingText}</p>
          </div>
        </div>
      </div>
    </section>
  );
};
