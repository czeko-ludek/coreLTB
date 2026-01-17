'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionLabel } from '@/components/ui';
import { clsx } from 'clsx';

export interface IntroSectionProps {
  label: string;
  paragraphs: readonly string[];
}

export function IntroSection({ label, paragraphs }: IntroSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id="intro" ref={ref} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div
            className={clsx(
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.1s' }}
          >
            <SectionLabel>{label}</SectionLabel>
          </div>
          <div className="space-y-4 mt-6">
            {paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className={clsx(
                  "text-base md:text-lg text-text-secondary leading-relaxed",
                  inView ? 'animate-fade-in-up' : 'opacity-0'
                )}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                dangerouslySetInnerHTML={{
                  __html: paragraph.replace(
                    /\*\*(.*?)\*\*/g,
                    '<strong class="font-bold text-text-primary">$1</strong>'
                  ),
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
