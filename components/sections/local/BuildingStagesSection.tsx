'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Icon, IconName } from '@/components/ui';
import { SectionHeader, SectionHeaderProps } from '@/components/shared/SectionHeader';

interface ExpertiseCard {
  icon: IconName;
  title: string;
  description: string;
  details?: string[];
}

interface BuildingStagesSectionProps {
  header: SectionHeaderProps;
  cards: ExpertiseCard[];
  image?: { src: string; alt: string };
}

// ─── Pillar Matching ────────────────────────────────────────────

const PILLAR_LINKS = [
  {
    keywords: ['surowy', 'sso', 'zero', 'fundament', 'dach', 'konstrukcj', 'roboty ziemne'],
    label: 'Stan Surowy',
    href: '/oferta/kompleksowa-budowa-domow',
  },
  {
    keywords: ['deweloper', 'instalac', 'tynk', 'elewac', 'stolark', 'zamknięty', 'ssz', 'ocieplen'],
    label: 'Stan Deweloperski',
    href: '/oferta/kompleksowa-budowa-domow',
  },
  {
    keywords: ['klucz', 'wykończ', 'malowa', 'podłóg', 'podlog'],
    label: 'Pod Klucz',
    href: '/oferta/kompleksowa-budowa-domow',
  },
];

function getPillarLink(title: string): { label: string; href: string } | null {
  const lower = title.toLowerCase();
  for (const pillar of PILLAR_LINKS) {
    if (pillar.keywords.some((kw) => lower.includes(kw))) {
      return { label: pillar.label, href: pillar.href };
    }
  }
  return null;
}

// ─── Rich Text Formatter ────────────────────────────────────────

function formatRichText(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-zinc-900">$1</strong>')
    .replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" class="text-primary font-semibold hover:text-primary-dark underline underline-offset-2 transition-colors">$1</a>'
    );
}

// ─── Fade transition style helper ───────────────────────────────

const fadeStyle = (delay?: number): React.CSSProperties => ({
  transitionProperty: 'opacity, transform',
  transitionDuration: '600ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  ...(delay != null && { transitionDelay: `${delay}ms` }),
});

// ─── Stage Card ─────────────────────────────────────────────────

function StageCard({ card, index }: { card: ExpertiseCard; index: number }) {
  const pillar = getPillarLink(card.title);
  const stepNumber = String(index + 1).padStart(2, '0');
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={`relative bg-white rounded-2xl p-6 shadow-sm border border-zinc-100 hover:shadow-md hover:border-primary/20 transition-[shadow,border-color] duration-300 overflow-hidden group ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={fadeStyle(index * 80)}
    >
      {/* Big background number */}
      <span
        className="absolute -top-3 -right-2 text-[5.5rem] font-black leading-none text-zinc-100 select-none pointer-events-none group-hover:text-primary/10 transition-colors duration-300"
        aria-hidden="true"
      >
        {stepNumber}
      </span>

      {/* Icon + Title row */}
      <div className="relative flex items-start gap-3 mb-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Icon name={card.icon} className="text-primary" size="md" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold text-primary uppercase tracking-wider mb-0.5">
            Etap {index + 1}
          </p>
          <h3 className="text-base font-bold text-text-primary leading-snug">
            {card.title.replace(/^Etap \d+:\s*/i, '')}
          </h3>
        </div>
      </div>

      {/* Short description */}
      <p
        className="relative text-sm text-text-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: formatRichText(card.description) }}
      />

      {/* Expandable details */}
      {card.details && card.details.length > 0 && (
        <details className="relative mt-4 group/details">
          <summary className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-50 text-xs font-bold text-zinc-600 hover:bg-primary/10 hover:text-primary transition-colors cursor-pointer list-none [&::-webkit-details-marker]:hidden">
            <span className="group-open/details:hidden">Szczegóły</span>
            <span className="hidden group-open/details:inline">Zwiń</span>
            <Icon name="chevronDown" size="sm" className="w-3.5 h-3.5 transition-transform group-open/details:rotate-180" />
          </summary>
          <div className="mt-3 space-y-2 border-t border-zinc-100 pt-3">
            {card.details.map((detail, i) => (
              <p
                key={i}
                className="text-sm text-text-secondary leading-relaxed"
                dangerouslySetInnerHTML={{ __html: formatRichText(detail) }}
              />
            ))}
          </div>
        </details>
      )}

      {/* Pillar link */}
      {pillar && (
        <Link
          href={pillar.href}
          className="relative inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
        >
          <span>→ {pillar.label}</span>
        </Link>
      )}
    </div>
  );
}

// ─── Main Section ───────────────────────────────────────────────

export function BuildingStagesSection({ header, cards, image }: BuildingStagesSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="bg-zinc-50 py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          style={fadeStyle()}
        >
          <SectionHeader {...header} />
        </div>

        {/* Cards grid — 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {cards.map((card, index) => (
            <StageCard key={card.title} card={card} index={index} />
          ))}
        </div>

        {/* Optional image — shown below grid as full-width banner */}
        {image && (
          <div
            ref={imageRef}
            className={`mt-10 rounded-2xl overflow-hidden shadow-lg ${imageInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={fadeStyle()}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={500}
              className="w-full h-auto object-cover max-h-[400px]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
