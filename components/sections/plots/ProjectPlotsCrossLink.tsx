'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';

interface ProjectPlotsCrossLinkProps {
  projectSlug: string;
  surfaceArea: string;
}

/**
 * Cross-link CTA on project detail pages — "Znajdź działkę pod ten projekt".
 * Styled identically to ProjectModificationCTA (two-column dark CTA pattern).
 * Compact variant (py-6 instead of py-8) since it sits above elevations.
 */
export function ProjectPlotsCrossLink({ projectSlug, surfaceArea }: ProjectPlotsCrossLinkProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  return (
    <section ref={ref} className="bg-background-beige py-6 sm:py-8">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left: Content */}
          <div
            className={clsx(
              'bg-zinc-900 rounded-2xl overflow-hidden',
              'transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
              {/* Label */}
              <span
                className={clsx(
                  'text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3',
                  'transition-all duration-500 delay-200',
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                )}
              >
                Szukasz działki?
              </span>

              {/* H2 — two-line, matching ProjectModificationCTA */}
              <h2
                className={clsx(
                  'text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4',
                  'transition-all duration-700 delay-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                )}
              >
                ZNAJDŹ
                <br />
                <span className="text-primary">DZIAŁKĘ</span>
              </h2>

              {/* Subtitle */}
              <p
                className={clsx(
                  'text-zinc-400 text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-xl leading-relaxed',
                  'transition-all duration-500 delay-[400ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                Projekt o powierzchni{' '}
                <strong className="text-white">{surfaceArea}</strong> wymaga
                odpowiedniej działki. Sprawdź nasze zweryfikowane działki budowlane
                na Śląsku — z informacją o mediach, MPZP i warunkach zabudowy.
              </p>

              {/* Features */}
              <div
                className={clsx(
                  'flex flex-col gap-2.5 mb-6',
                  'transition-all duration-500 delay-500',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                {[
                  'Sprawdzone pod budowę domu',
                  'Informacja o mediach i MPZP',
                  'Bezpłatna analiza przy umowie',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon name="check" className="text-primary" size="sm" />
                    </div>
                    <span className="text-zinc-300 text-sm md:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Buttons */}
              <div
                className={clsx(
                  'flex flex-wrap gap-3',
                  'transition-all duration-500 delay-[600ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <Link
                  href="/dzialki"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider"
                  data-cross-link-from={`/projekty/${projectSlug}`}
                  data-cross-link-to="/dzialki"
                >
                  Zobacz działki
                  <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon name="arrowRight" className="text-white" size="sm" />
                  </div>
                </Link>
                <Link
                  href="/analiza-dzialki"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-3 rounded-sm transition-all"
                >
                  Analiza działki
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Visual with stats */}
          <div
            className={clsx(
              'relative min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden',
              'transition-all duration-700 delay-300',
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          >
            <Image
              src="/images/cta.webp"
              alt="Działki budowlane na Śląsku — znajdź działkę pod swój projekt"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />

            {/* Stats overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
              <div className="flex items-center gap-6 text-sm">
                <div>
                  <p className="text-2xl md:text-3xl font-black text-white">38+</p>
                  <p className="text-zinc-300 text-xs md:text-sm">działek</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl md:text-3xl font-black text-white">4</p>
                  <p className="text-zinc-300 text-xs md:text-sm">powiaty</p>
                </div>
                <div className="w-px h-10 bg-white/20" />
                <div>
                  <p className="text-2xl md:text-3xl font-black text-white">13</p>
                  <p className="text-zinc-300 text-xs md:text-sm">gmin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
