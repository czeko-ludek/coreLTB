'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { Icon, IconName } from '@/components/ui';
import { SectionHeader, SectionHeaderProps } from '@/components/shared/SectionHeader';

export interface ExpertiseCard {
  icon: IconName;
  title: string;
  description: string;
  details?: string[];
}

export interface LocalExpertiseSectionProps {
  header: SectionHeaderProps;
  cards: ExpertiseCard[];
  image: { src: string; alt: string };
}

function formatRichText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900">$1</strong>')
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-primary font-semibold hover:text-primary-dark underline underline-offset-2 transition-colors">$1</a>'
    );
}

const fadeStyle = (delay?: number): React.CSSProperties => ({
  transitionProperty: 'opacity, transform',
  transitionDuration: '600ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  ...(delay != null && { transitionDelay: `${delay}ms` }),
});

function ExpertiseCardItem({ card, index }: { card: ExpertiseCard; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`bg-zinc-50 rounded-xl p-6 border-l-4 border-primary ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={fadeStyle(index * 100)}
    >
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
          <Icon name={card.icon} className="text-primary" size="md" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-text-primary">{card.title}</h3>
          <p
            className="text-body-sm text-text-secondary mt-2 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatRichText(card.description) }}
          />
          {card.details && card.details.length > 0 && (
            <details className="mt-4 group">
              <summary className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-sm font-bold text-primary hover:bg-primary/20 transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
                <span className="group-open:hidden">Czytaj więcej</span>
                <span className="hidden group-open:inline">Zwiń</span>
                <Icon name="chevronDown" size="sm" className="transition-transform group-open:rotate-180" />
              </summary>
              <div className="mt-3 space-y-2">
                {card.details.map((detail, i) => (
                  <p
                    key={i}
                    className="text-body-sm text-text-secondary leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: formatRichText(detail) }}
                  />
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}

export function LocalExpertiseSection({ header, cards, image }: LocalExpertiseSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          style={fadeStyle()}
        >
          <SectionHeader {...header} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-12">
          {/* Left: Image (square, sticky on desktop) */}
          <div
            ref={imageRef}
            className={`lg:sticky lg:top-24 ${imageInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={fadeStyle()}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl aspect-square">
              <Image
                src={image.src}
                alt={image.alt}
                width={640}
                height={640}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right: Cards with <details> accordion */}
          <div className="space-y-4">
            {cards.map((card, index) => (
              <ExpertiseCardItem key={card.title} card={card} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
