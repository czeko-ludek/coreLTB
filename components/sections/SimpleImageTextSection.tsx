'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Icon } from '@/components/ui';
import { clsx } from 'clsx';
import type { ContentBlock, ContentItem } from '@/data/shared-types';

export interface SimpleImageTextSectionProps {
  id?: string;          // ID dla Table of Contents anchor
  header: SectionHeaderProps;
  items: ContentItem[];
  imageSrc?: string;    // Opcjonalny obraz dla sekcji
  imageAlt?: string;    // Opcjonalny alt text
}

export function SimpleImageTextSection({
  id,
  header,
  items,
  imageSrc,
  imageAlt
}: SimpleImageTextSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,  // Zmniejszony z 0.3 na 0.1 dla lepszego triggering
    triggerOnce: true,
    rootMargin: '100px 0px',  // Trigger 100px before section enters viewport
  });

  // Funkcja do formatowania tekstu z pogrubieniami
  const formatText = (text: string) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  // Renderowanie bloku treści
  const renderContentBlock = (block: ContentBlock, blockIndex: number) => {
    if (block.type === 'paragraph') {
      return (
        <p
          key={blockIndex}
          className="mb-4 text-base md:text-lg text-gray-600 leading-relaxed"
        >
          {formatText(block.value)}
        </p>
      );
    }

    if (block.type === 'list') {
      return (
        <ul key={blockIndex} className="space-y-2 mb-4">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-3">
              <Icon name="checkmark" className="text-primary mt-1 shrink-0" size="sm" />
              <span className="text-base md:text-lg text-gray-600 leading-relaxed">{formatText(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <section id={id} ref={ref} className="bg-white rounded-3xl py-16 sm:py-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Header - zawsze pełnej szerokości */}
        <div className={clsx(
          "max-w-4xl mx-auto",
          inView ? 'animate-fade-in-up' : 'opacity-0'
        )}>
          <SectionHeader {...header} align="left" theme="light" />
        </div>

        {/* Grid 2-kolumnowy (z obrazem) lub 1-kolumnowy (bez obrazu) */}
        <div className={clsx(
          "mt-12",
          imageSrc ? "grid lg:grid-cols-[1fr_1fr] gap-12 items-start" : "max-w-4xl mx-auto"
        )}>
            {/* Kolumna 1: Treść tekstowa */}
            <div
              className={clsx(
                "space-y-12",
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.2s' }}
            >
            {items.map((item, index) => (
              <article key={index}>
                {/* H3 nagłówek z ikoną */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <Icon name={item.icon} className="text-primary" size="lg" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{item.title}</h3>
                </div>

                {/* Treść (paragrafy, listy, obrazy) */}
                <div>
                  {item.content.map((block, blockIndex) => renderContentBlock(block, blockIndex))}
                </div>
              </article>
            ))}
          </div>

          {/* Kolumna 2: Obraz (jeśli podany) */}
          {imageSrc && imageAlt && (
            <div
              className={clsx(
                "sticky top-24 hidden lg:block",
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.3s' }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
