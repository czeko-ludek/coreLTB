'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon, type IconName } from '@/components/ui';
import type { RealizationSummary as SummaryData } from '@/data/realizacje/types';

// ─── Stat icon mapping ───────────────────────────────────────

const STAT_ICONS: Record<string, IconName> = {
  'Powierzchnia': 'ruler',
  'Czas budowy': 'clock',
  'Zaawansowanie': 'trendingUp',
  'Technologia': 'zap',
};

function getStatIcon(label: string): IconName {
  return STAT_ICONS[label] || 'info';
}

// ─── Component ───────────────────────────────────────────────

interface RealizationSummaryProps {
  summary: SummaryData;
}

export function RealizationSummary({ summary }: RealizationSummaryProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section className="py-12 md:py-16">
      <div
        ref={ref}
        className={clsx(
          'mx-auto max-w-4xl px-4 sm:px-6 transition-all duration-700',
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
      >
        {/* Stats — dark card with grid */}
        {summary.stats && summary.stats.length > 0 && (
          <div className="bg-zinc-900 rounded-2xl p-4 sm:p-6 md:p-8 mb-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {summary.stats.map((stat, i) => (
                <div
                  key={i}
                  className={clsx(
                    'text-center transition-all duration-500',
                    inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  )}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  <div className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-primary/15 mb-2 sm:mb-3">
                    <Icon name={getStatIcon(stat.label)} size="sm" className="text-primary sm:hidden" />
                    <Icon name={getStatIcon(stat.label)} size="md" className="text-primary hidden sm:block" />
                  </div>
                  <p className="text-sm sm:text-lg md:text-2xl font-black text-white mb-0.5 sm:mb-1 leading-tight">{stat.value}</p>
                  <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold leading-tight">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Headline + description */}
        <div className="text-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 mb-3 sm:mb-4">
            {summary.headline}
          </h2>
          <div className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
            {summary.description.map((para, i) => (
              <p key={i} className="text-sm sm:text-base text-zinc-600 leading-relaxed">
                {para}
              </p>
            ))}
          </div>
        </div>

        {/* Client testimonial */}
        {summary.clientTestimonial && (
          <div className="bg-background-beige rounded-2xl p-6 md:p-8 mb-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <Icon name="quote" className="w-24 h-24" />
            </div>
            <Icon name="quote" size="lg" className="text-primary mx-auto mb-4 relative z-10" />
            <blockquote className="text-lg md:text-xl text-zinc-800 font-medium italic mb-4 max-w-2xl mx-auto relative z-10">
              &ldquo;{summary.clientTestimonial.text}&rdquo;
            </blockquote>
            <div className="relative z-10">
              <p className="font-bold text-zinc-900">
                {summary.clientTestimonial.author}
              </p>
              {summary.clientTestimonial.role && (
                <p className="text-sm text-zinc-500">{summary.clientTestimonial.role}</p>
              )}
            </div>
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/wycena"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-zinc-900 font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            <Icon name="calculator" size="sm" />
            Sprawdź wycenę swojego domu
          </Link>
          <Link
            href="/umow-konsultacje"
            className="inline-flex items-center justify-center gap-2 border-2 border-zinc-900 hover:border-primary text-zinc-900 hover:text-primary font-bold text-sm px-6 py-3.5 rounded-xl transition-colors"
          >
            <Icon name="messageCircle" size="sm" />
            Umów konsultację
          </Link>
        </div>
      </div>
    </section>
  );
}
