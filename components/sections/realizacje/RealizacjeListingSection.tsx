'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';
import type { RealizationListingItem } from '@/data/realizacje/types';
import { RealizationCard } from './RealizationCard';

// ─── Status filter options ───────────────────────────────────

type StatusFilter = 'all' | 'in-progress' | 'completed';

const STATUS_FILTERS: { id: StatusFilter; label: string }[] = [
  { id: 'all', label: 'Wszystkie' },
  { id: 'in-progress', label: 'W trakcie' },
  { id: 'completed', label: 'Zakonczone' },
];

// ─── Breadcrumbs ─────────────────────────────────────────────

const breadcrumbs = [
  { label: 'Strona glowna', href: '/' },
  { label: 'Realizacje' },
];

// ─── Component ───────────────────────────────────────────────

interface RealizacjeListingSectionProps {
  items: RealizationListingItem[];
}

export function RealizacjeListingSection({ items }: RealizacjeListingSectionProps) {
  const [activeFilter, setActiveFilter] = useState<StatusFilter>('all');

  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  // Memoized filtered items
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') return items;
    return items.filter((item) => item.status === activeFilter);
  }, [items, activeFilter]);

  // Count per status for badges
  const counts = useMemo(() => ({
    all: items.length,
    'in-progress': items.filter((i) => i.status === 'in-progress').length,
    completed: items.filter((i) => i.status === 'completed').length,
  }), [items]);

  return (
    <section ref={ref} className="pt-6 pb-16 md:pt-8 md:pb-24 bg-background-beige">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header — baza wiedzy style */}
        <div
          className={clsx('max-w-3xl mb-8', inView ? 'animate-fade-in-up' : 'opacity-0')}
          style={{ animationDelay: '0.1s' }}
        >
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-4">
            <ol className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && (
                    <Icon name="chevronRight" size="sm" className="text-text-muted" />
                  )}
                  {crumb.href ? (
                    <Link
                      href={crumb.href}
                      className="text-text-muted hover:text-primary transition-colors"
                    >
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-text-primary font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
            Budowa domu{' '}
            <span className="text-primary">krok po kroku</span>
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
            Dokumentujemy kazdy etap budowy — od fundamentow po klucze.
            Prawdziwe zdjecia, eksperckie komentarze do technologii
            i{' '}<strong className="text-text-primary">praktyczna wiedza</strong>,
            ktora pomoze Ci zaplanowac budowe wlasnego domu.
          </p>
        </div>

        {/* Status Filters — like category filters in baza wiedzy */}
        <div
          className={clsx(
            'flex flex-wrap gap-3 mb-10',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.2s' }}
        >
          {STATUS_FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={clsx(
                'inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-300',
                activeFilter === filter.id
                  ? 'bg-primary text-white shadow-md hover:bg-primary-dark'
                  : 'bg-white text-text-primary border-2 border-zinc-200 hover:border-primary hover:text-primary'
              )}
            >
              {/* Dot indicator for in-progress / completed */}
              {filter.id === 'in-progress' && (
                <span className={clsx(
                  'w-2 h-2 rounded-full',
                  activeFilter === filter.id ? 'bg-primary-light animate-pulse' : 'bg-primary animate-pulse'
                )} />
              )}
              {filter.id === 'completed' && (
                <span className={clsx(
                  'w-2 h-2 rounded-full',
                  activeFilter === filter.id ? 'bg-green-300' : 'bg-green-500'
                )} />
              )}
              {filter.label}
              <span
                className={clsx(
                  'ml-1 text-xs rounded-full px-2 py-0.5 font-bold',
                  activeFilter === filter.id
                    ? 'bg-white/20 text-white'
                    : 'bg-zinc-100 text-text-muted'
                )}
              >
                {counts[filter.id]}
              </span>
            </button>
          ))}
        </div>

        {/* Cards Grid */}
        {filteredItems.length > 0 ? (
          <div
            className={clsx(
              'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.3s' }}
          >
            {filteredItems.map((item, i) => (
              <RealizationCard key={item.slug} item={item} index={i} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Icon name="hardHat" size="xl" className="text-text-muted mx-auto mb-4" />
            <p className="text-text-secondary text-lg">Brak realizacji w tej kategorii.</p>
          </div>
        )}

        {/* Empty state — no realizations at all */}
        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-zinc-400">Wkrotce pojawia sie nasze realizacje.</p>
          </div>
        )}
      </div>
    </section>
  );
}
