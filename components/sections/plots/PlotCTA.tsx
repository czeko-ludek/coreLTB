'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon } from '@/components/ui';
import type { Plot } from '@/data/plots/types';
import { buildPlotCalculatorUrl, buildPlotAnalysisUrl } from '@/data/plots/helpers';

interface PlotCTAProps {
  plot: Plot;
}

/**
 * PlotCTA — dark two-column CTA section (same pattern as ProjectModificationCTA).
 * Drives conversion: kalkulator + analiza dzialki.
 */
export function PlotCTA({ plot }: PlotCTAProps) {
  const calculatorUrl = buildPlotCalculatorUrl(plot);
  const analysisUrl = buildPlotAnalysisUrl(plot);

  return (
    <section className="px-4 md:px-6 lg:px-[38px] pb-12 md:pb-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left: CTA content */}
          <div className="bg-zinc-900 rounded-2xl overflow-hidden">
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">
                Masz już działkę?
              </span>
              <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4">
                SPRAWDŹ ILE
                <br />
                <span className="text-primary">KOSZTUJE BUDOWA</span>
              </h3>
              <p className="text-zinc-400 text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-xl leading-relaxed">
                Skonfiguruj parametry domu i otrzymaj{' '}
                <strong className="text-white">szczegółowy kosztorys budowy</strong> w 60 sekund.
                Działka {plot.area} m<sup className="text-xs">2</sup> w {plot.city} — idealna pod dom jednorodzinny.
              </p>
              <div className="flex flex-col gap-2.5 mb-6">
                {[
                  'Wycena w 60 sekund',
                  'Rozbicie na etapy: SSO, deweloperski, pod klucz',
                  'Stała cena w umowie ryczałtowej',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon name="check" className="text-primary" size="sm" />
                    </div>
                    <span className="text-zinc-300 text-sm md:text-base">{feature}</span>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={calculatorUrl}
                  className="group inline-flex items-center justify-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider"
                >
                  Oblicz koszt budowy
                  <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon name="arrowRight" className="text-white" size="sm" />
                  </div>
                </Link>
                <Link
                  href={analysisUrl}
                  className="group inline-flex items-center justify-center gap-3 border border-zinc-600 hover:border-primary text-white hover:text-primary font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider"
                >
                  Zamów analizę działki
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div className="relative min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden">
            <Image
              src="/images/cta.webp"
              alt="Kalkulator kosztów budowy domu — CoreLTB Builders"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
