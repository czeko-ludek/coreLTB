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

  return (
    <section id={id} ref={setRefs} className="scroll-mt-24">
      {/* Layout Mobile (pionowy stack) - w białym kontenerze */}
      <div className={`md:hidden bg-white rounded-3xl shadow-lg p-6 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
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
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4">
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

      {/* Layout Desktop - BENTO STYLE */}
      <div className="hidden md:block">
        {/* Jeden biały kontener dla tekstu i obrazu */}
        <div className="relative py-6">
          <div className={`min-h-[600px] bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-lg hover:shadow-xl transition-shadow duration-300 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
               style={{ animationDelay: '0.2s' }}>
            {/* TEXT Section - 60% width, order-2 mobile, order-1 desktop */}
            <div className="p-8 lg:p-12 flex-1 lg:flex-[6] flex flex-col justify-center order-2 lg:order-1">
              {/* Ikona usunieta - będzie floating badge na obrazie */}

              <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                {title}
              </h3>

              <div className="text-gray-700 leading-relaxed text-base">
                {content.map((block, index) => renderContentBlock(block, index))}
              </div>
            </div>

            {/* IMAGE Section - 40% width, order-1 mobile, order-2 desktop */}
            <div className="relative w-full lg:w-2/5 lg:flex-[4] h-80 lg:h-auto overflow-hidden order-1 lg:order-2">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />

              {/* Floating badge (top-left) - IKONA + LABEL */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-3 shadow-sm">
                <div className={clsx(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300",
                  isActive ? 'bg-primary text-white' : 'bg-gray-600 text-white'
                )}>
                  <Icon
                    name={icon}
                    className="w-4 h-4"
                  />
                </div>
                <span className="text-base font-bold text-gray-900">
                  {label}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
