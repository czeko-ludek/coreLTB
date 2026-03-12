'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Icon, IconName } from '@/components/ui';
import { SectionHeader, SectionHeaderProps } from '@/components/shared/SectionHeader';
import { fadeInUp, viewportConfig } from '@/lib/animations';

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

// ─── Component ──────────────────────────────────────────────────

export function BuildingStagesSection({ header, cards, image }: BuildingStagesSectionProps) {
  const hasImage = !!image;

  return (
    <section className="bg-zinc-50 py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={viewportConfig}>
          <SectionHeader {...header} />
        </motion.div>

        <div
          className={`mt-12 ${
            hasImage ? 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12' : ''
          }`}
        >
          {/* Timeline cards */}
          <div className="relative">
            {cards.map((card, index) => {
              const pillar = getPillarLink(card.title);
              const isLast = index === cards.length - 1;

              return (
                <motion.div
                  key={card.title}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportConfig}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex gap-5 ${!isLast ? 'pb-6' : ''}`}
                >
                  {/* Number + timeline line */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                      {index + 1}
                    </div>
                    {!isLast && (
                      <div className="w-px flex-1 border-l-2 border-dashed border-primary/30 mt-2" />
                    )}
                  </div>

                  {/* Card content */}
                  <div className="bg-white rounded-xl p-6 shadow-sm flex-1 min-w-0 mb-2">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <Icon name={card.icon} className="text-primary" size="md" />
                      </div>
                      <h3 className="text-lg font-bold text-text-primary pt-1">{card.title}</h3>
                    </div>

                    <p
                      className="text-body-sm text-text-secondary mt-3 leading-relaxed"
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

                    {pillar && (
                      <Link
                        href={pillar.href}
                        className="inline-flex items-center gap-1.5 mt-4 px-3 py-1.5 rounded-full bg-primary/10 text-xs font-semibold text-primary hover:bg-primary/20 transition-colors"
                      >
                        <span>→ Więcej o: {pillar.label}</span>
                      </Link>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Optional sticky image */}
          {hasImage && (
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportConfig}
              className="lg:sticky lg:top-24 h-fit hidden lg:block"
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
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
