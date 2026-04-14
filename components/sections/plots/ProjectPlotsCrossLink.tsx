'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';

interface ProjectPlotsCrossLinkProps {
  projectSlug: string;
  surfaceArea: string;
}

/**
 * Compact cross-link CTA on project detail pages — "Znajdź działkę".
 * Two-column: left dark with text + CTA, right gradient with stats.
 * Compressed height — sits between floor plans and elevations.
 */
export function ProjectPlotsCrossLink({ projectSlug, surfaceArea }: ProjectPlotsCrossLinkProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-80px 0px',
  });

  return (
    <section ref={ref} className="bg-background-beige py-4 sm:py-6">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div
          className={clsx(
            'bg-zinc-900 rounded-2xl overflow-hidden',
            'transition-all duration-700',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          )}
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-0">
            {/* Left: Content */}
            <div className="p-5 md:p-7 lg:p-8 flex flex-col justify-center">
              {/* Label */}
              <span
                className={clsx(
                  'text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-2',
                  'transition-all duration-500 delay-200',
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                )}
              >
                Szukasz działki?
              </span>

              {/* H2 — single line */}
              <h2
                className={clsx(
                  'text-2xl md:text-3xl lg:text-4xl font-black leading-[1] mb-3',
                  'transition-all duration-700 delay-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                )}
              >
                <span className="text-white">ZNAJDŹ </span>
                <span className="text-primary">DZIAŁKĘ</span>
              </h2>

              {/* Subtitle — compact */}
              <p
                className={clsx(
                  'text-zinc-400 text-sm md:text-base mb-4 max-w-2xl leading-relaxed',
                  'transition-all duration-500 delay-[400ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                Projekt o pow. <strong className="text-white">{surfaceArea}</strong> wymaga
                odpowiedniej działki. Sprawdź zweryfikowane działki na Śląsku
                — z mediami, MPZP i warunkami zabudowy.
              </p>

              {/* CTA Buttons */}
              <div
                className={clsx(
                  'flex flex-wrap gap-3',
                  'transition-all duration-500 delay-500',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <Link
                  href="/dzialki"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-2.5 rounded-sm transition-all duration-300 uppercase tracking-wider"
                  data-cross-link-from={`/projekty/${projectSlug}`}
                  data-cross-link-to="/dzialki"
                >
                  Zobacz działki
                  <div className="h-6 w-6 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon name="arrowRight" className="text-white" size="sm" />
                  </div>
                </Link>
                <Link
                  href="/analiza-dzialki"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-2.5 rounded-sm transition-all"
                >
                  Analiza działki
                </Link>
              </div>
            </div>

            {/* Right: Stats on gradient bg */}
            <div className="hidden lg:flex items-center justify-center px-10 xl:px-14 bg-gradient-to-br from-primary/10 to-primary/5 border-l border-white/5">
              <div className="flex items-center gap-8 text-center">
                <div>
                  <p className="text-3xl font-black text-white">38+</p>
                  <p className="text-zinc-400 text-xs mt-0.5">działek</p>
                </div>
                <div className="w-px h-10 bg-zinc-700" />
                <div>
                  <p className="text-3xl font-black text-white">4</p>
                  <p className="text-zinc-400 text-xs mt-0.5">powiaty</p>
                </div>
                <div className="w-px h-10 bg-zinc-700" />
                <div>
                  <p className="text-3xl font-black text-white">13</p>
                  <p className="text-zinc-400 text-xs mt-0.5">gmin</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
