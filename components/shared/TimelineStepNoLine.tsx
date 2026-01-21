'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import Image from 'next/image';
import { Icon, IconName } from '@/components/ui';

// Content Blocks dla elastycznego formatowania
type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface TimelineStepNoLineProps {
  id: string;
  number: number;
  icon: IconName;
  label: string; // Label dla floating badge (np. "Projekt Gotowy")
  title: string;
  content: ContentBlock[];
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  isLast?: boolean;
  onInView: (stepNumber: number) => void;
}

export function TimelineStepNoLine({
  id,
  number,
  icon,
  label,
  title,
  content,
  imageSrc,
  imageAlt,
  isActive,
  isLast = false,
  onInView,
}: TimelineStepNoLineProps) {
  // useInView dla scrollspy (śledzenie aktywnego kroku)
  const { ref: scrollSpyRef } = useInView({
    threshold: 0.4,
    onChange: (inView) => {
      if (inView) {
        onInView(number);
      }
    },
  });

  // useInView dla animacji (jednorazowe wyzwolenie)
  const { ref: animRef, inView: isVisible } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Funkcja do łączenia ref'ów
  const setRefs = React.useCallback(
    (node: HTMLElement | null) => {
      scrollSpyRef(node);
      animRef(node);
    },
    [scrollSpyRef, animRef]
  );

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
  const renderContentBlock = (block: ContentBlock, index: number) => {
    // Sprawdź czy to ostatni block
    const isLastBlock = index === content.length - 1;
    const isLastParagraph = block.type === 'paragraph' && isLastBlock;

    if (block.type === 'paragraph') {
      return (
        <p
          key={index}
          className={clsx(
            isLastParagraph
              ? "text-base italic border-l-4 border-primary pl-6 py-2 bg-primary/5 mb-8 rounded-r-lg"
              : "mb-4 last:mb-0"
          )}
        >
          {formatText(block.value)}
        </p>
      );
    }

    if (block.type === 'list') {
      return (
        <div key={index} className="grid grid-cols-1 gap-5 mb-8">
          {block.items.map((item, itemIndex) => (
            <div key={itemIndex} className="flex items-start gap-3">
              <Icon name="checkmark" className="text-primary mt-1 shrink-0" size="md" />
              <span className="text-base">{formatText(item)}</span>
            </div>
          ))}
        </div>
      );
    }

    return null;
  };

  // Zigzag: nieparzyste (1,3,5...) = tekst-obraz, parzyste (2,4,6...) = obraz-tekst
  const isEven = number % 2 === 0;

  return (
    <section id={id} ref={setRefs} className="scroll-mt-24">
      {/* Layout Zigzag - Mobile: stack, Desktop: flex row/row-reverse */}
      <div
        className={clsx(
          'flex flex-col gap-6',
          'lg:flex-row lg:items-center lg:gap-12',
          isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'
        )}
      >
        {/* Biały Box z Tekstem */}
        <div
          className={clsx(
            'flex-1 bg-white rounded-3xl p-6 md:p-8 lg:p-10 shadow-lg',
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Label + Tytuł */}
          <div className="mb-6">
            <span className="text-sm font-semibold text-primary uppercase tracking-wide">
              {label}
            </span>
            <h3
              className={clsx(
                'text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 mt-1',
                isActive ? 'text-primary' : 'text-gray-900'
              )}
            >
              {title}
            </h3>
          </div>

          {/* Treść */}
          <div className="text-gray-600 leading-relaxed text-base lg:text-lg">
            {content.map((block, index) => renderContentBlock(block, index))}
          </div>
        </div>

        {/* Obraz z ikoną w rogu */}
        <div
          className={clsx(
            'flex-1',
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.25s' }}
        >
          <div className="relative w-full aspect-[4/3] lg:aspect-[16/12] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-700"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* Subtle gradient overlay on image */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />

            {/* Floating Icon Badge - top left corner */}
            <div
              className={clsx(
                'absolute top-4 left-4 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg',
                isActive
                  ? 'bg-primary text-white'
                  : 'bg-white/90 backdrop-blur-sm text-primary'
              )}
            >
              <Icon name={icon} size="lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
