import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';

interface ProjectPlotsCrossLinkProps {
  projectSlug: string;
  surfaceArea: string;
}

/**
 * Cross-link section on project detail pages.
 * "Szukasz działki pod ten projekt? Zobacz sprawdzone działki budowlane."
 * Server component — rendered in RSC project page.
 */
export function ProjectPlotsCrossLink({ projectSlug, surfaceArea }: ProjectPlotsCrossLinkProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-zinc-900 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Left: content */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <span className="text-primary text-xs font-bold uppercase tracking-[0.15em] mb-3">
                Szukasz działki?
              </span>
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                Znajdź działkę pod ten projekt
              </h2>
              <p className="text-zinc-400 mb-6 leading-relaxed">
                Projekt {surfaceArea} m² wymaga odpowiedniej działki. Sprawdź nasze
                zweryfikowane działki budowlane na Śląsku — z informacją o mediach, MPZP
                i warunkach gruntowych.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  'Sprawdzone pod budowę domu',
                  'Informacja o mediach i MPZP',
                  'Bezpłatna analiza przy umowie',
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                    <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon name="check" size="sm" className="text-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/dzialki"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-zinc-900 font-bold text-sm px-6 py-3 rounded-lg transition-all uppercase tracking-wider"
                  data-cross-link-from={`/projekty/${projectSlug}`}
                  data-cross-link-to="/dzialki"
                >
                  <Icon name="mapPin" size="sm" />
                  Zobacz działki
                </Link>
                <Link
                  href="/analiza-dzialki"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm px-6 py-3 rounded-lg transition-all"
                >
                  <Icon name="search" size="sm" />
                  Analiza działki
                </Link>
              </div>
            </div>

            {/* Right: visual */}
            <div className="hidden lg:flex items-center justify-center p-12 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
                  <Icon name="mapPin" size="xl" className="text-primary" />
                </div>
                <div>
                  <p className="text-4xl font-black text-white mb-1">38+</p>
                  <p className="text-zinc-400 text-sm">działek budowlanych</p>
                </div>
                <div className="flex items-center justify-center gap-6 text-sm">
                  <div>
                    <p className="text-xl font-bold text-white">4</p>
                    <p className="text-zinc-500">powiaty</p>
                  </div>
                  <div className="w-px h-8 bg-zinc-700" />
                  <div>
                    <p className="text-xl font-bold text-white">13</p>
                    <p className="text-zinc-500">gmin</p>
                  </div>
                  <div className="w-px h-8 bg-zinc-700" />
                  <div>
                    <p className="text-xl font-bold text-white">73</p>
                    <p className="text-zinc-500">stron SEO</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
