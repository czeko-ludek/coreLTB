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

export interface TimelineStepProps {
  id: string;
  number: number;
  icon: IconName;
  title: string;
  content: ContentBlock[];
  imageSrc: string;
  imageAlt: string;
  isActive: boolean;
  isLast?: boolean;
  onInView: (stepNumber: number) => void;
}

export function TimelineStep({
  id,
  number,
  icon,
  title,
  content,
  imageSrc,
  imageAlt,
  isActive,
  isLast = false,
  onInView,
}: TimelineStepProps) {
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
    if (block.type === 'paragraph') {
      return (
        <p key={index} className="mb-4 last:mb-0">
          {formatText(block.value)}
        </p>
      );
    }

    if (block.type === 'list') {
      return (
        <ul key={index} className="mb-4 last:mb-0 space-y-2">
          {block.items.map((item, itemIndex) => (
            <li key={itemIndex} className="flex items-start gap-2">
              <span className="text-primary mt-1.5">•</span>
              <span className="flex-1">{formatText(item)}</span>
            </li>
          ))}
        </ul>
      );
    }

    return null;
  };

  return (
    <section id={id} ref={setRefs} className="scroll-mt-24">
      {/* Layout Mobile (pionowy stack) - w białym kontenerze */}
      <div className={`md:hidden bg-white rounded-xl shadow-lg p-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
        {/* Nagłówek z numerem */}
        <div className="flex items-center gap-4 mb-4">
          <div
            className={clsx(
              'w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0',
              isActive
                ? 'bg-primary border-primary text-white shadow-lg'
                : 'bg-gray-100 border-gray-300 text-gray-600'
            )}
          >
            <span className="text-sm font-bold">{number}</span>
          </div>
          <h3
            className={clsx(
              'text-xl font-bold transition-colors duration-300',
              isActive ? 'text-primary' : 'text-gray-900'
            )}
          >
            {title}
          </h3>
        </div>

        {/* Obraz */}
        <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden mb-4">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        {/* Treść */}
        <div className="text-gray-700 leading-relaxed">
          {content.map((block, index) => renderContentBlock(block, index))}
        </div>
      </div>

      {/* Layout Desktop - IKONA NA ŚRODKU, TEKST I OBRAZ W KONTENERZE */}
      <div className="hidden md:grid md:grid-cols-[auto_1fr] md:gap-8 md:items-center">
        {/* Timeline Column - IKONA wycentrowana pionowo */}
        <div className={`relative flex flex-col items-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
             style={{ animationDelay: '0.1s' }}>
          {/* Ikona w dużym kółku - WIĘKSZA i bardziej ekskluzywna */}
          <div
            className={clsx(
              'relative z-10 w-20 h-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 bg-white',
              isActive
                ? 'border-primary shadow-[0_0_30px_rgba(223,187,104,0.5)] scale-110'
                : 'border-gray-300 shadow-lg hover:border-primary/50'
            )}
          >
            <Icon
              name={icon}
              size="xl"
              className={clsx(
                'transition-colors duration-300',
                isActive ? 'text-primary' : 'text-gray-600'
              )}
            />
          </div>

          {/* Numer etapu pod ikoną - WIĘKSZY */}
          <div
            className={clsx(
              'mt-4 text-base font-bold px-4 py-2 rounded-full transition-all duration-300',
              isActive
                ? 'bg-primary text-white shadow-lg shadow-primary/30'
                : 'bg-gray-100 text-gray-600'
            )}
          >
            Etap {number}
          </div>
        </div>

        {/* Jeden biały kontener dla tekstu i obrazu */}
        <div className="relative py-8">
          <div className={`bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 md:p-10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
               style={{ animationDelay: '0.3s' }}>
            {/* Grid: tekst po lewej, obraz po prawej - items-center dla wycentrowania */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Lewa kolumna - TEKST */}
              <div>
                <h3
                  className={clsx(
                    'text-2xl lg:text-3xl font-bold mb-6 transition-colors duration-300',
                    isActive ? 'text-primary' : 'text-gray-900'
                  )}
                >
                  {title}
                </h3>

                <div className="text-gray-700 leading-relaxed text-base lg:text-lg">
                  {content.map((block, index) => renderContentBlock(block, index))}
                </div>
              </div>

              {/* Prawa kolumna - OBRAZ */}
              <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
