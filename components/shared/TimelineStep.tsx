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
    threshold: 0.2,
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

  // Funkcja do formatowania tekstu z pogrubieniami i linkami markdown
  const formatText = (text: string) => {
    // Split na bold (**text**) i linki ([text](url))
    const parts = text.split(/(\*\*.*?\*\*|\[.*?\]\(.*?\))/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={index} className="font-bold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
      if (linkMatch) {
        const [, linkText, href] = linkMatch;
        const isExternal = href.startsWith('http');
        return (
          <a
            key={index}
            href={href}
            className="text-primary font-semibold hover:text-primary-dark underline underline-offset-2 transition-colors"
            {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            {linkText}
          </a>
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
          {/* Tytuł */}
          <h3
            className={clsx(
              'text-xl md:text-2xl lg:text-3xl font-bold transition-colors duration-300 mb-6',
              isActive ? 'text-primary' : 'text-gray-900'
            )}
          >
            {title}
          </h3>

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
