// Plik: components/sections/PhilosophyTimelineSection.tsx

'use client';

import React from 'react';
import Image from 'next/image'; // Krok 1: Upewnij się, że Image jest zaimportowany
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps, NumberedListItem, NumberedListItemProps } from '@/components/shared';

// Krok 2: Ulepszamy interfejs, aby przyjmował obiekt obrazu
export interface PhilosophyTimelineSectionProps {
  header: SectionHeaderProps;
  items: NumberedListItemProps[];
  image: {           // Zmieniamy z opcjonalnego na wymagany, aby zawsze był obraz
    src: string;
    alt: string;
  };
}

export function PhilosophyTimelineSection({ header, items, image }: PhilosophyTimelineSectionProps) {
  // Twoja logika animacji pozostaje bez zmian
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section ref={ref} className="py-20 px-4 lg:px-[50px] bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          
          {/* ==================================================================== */}
          {/* Krok 3: TUTAJ ZNAJDUJE SIĘ KLUCZOWA ZMIANA - PODMIANA PLACEHOLDERA    */}
          {/* ==================================================================== */}

          {/* Lewa strona: Obraz z Next.js i Twoją animacją "curtain reveal" */}
          <div className={`relative h-full min-h-[400px] rounded-xl overflow-hidden shadow-2xl ring-1 ring-black/5 animate-curtain-reveal ${inView ? 'curtain-animate' : ''}`}>
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>

          {/* Prawa strona: Twoja lista elementów pozostaje bez zmian */}
          <div className="space-y-6">
            <div className={inView ? 'animate-fade-in-up' : 'opacity-0'} style={{ animationDelay: '0.2s' }}>
              <SectionHeader {...header} align="left" theme="light" />
            </div>

            <div className="mt-8">
              {items.map((item, index) => (
                <div
                  key={index}
                  className={inView ? 'animate-fade-in-up' : 'opacity-0'}
                  style={{ animationDelay: `${0.4 + index * 0.15}s` }}
                >
                  <NumberedListItem
                    {...item}
                    isLast={index === items.length - 1}
                    isVisible={inView}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}