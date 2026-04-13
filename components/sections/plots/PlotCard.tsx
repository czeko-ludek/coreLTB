'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import type { Plot } from '@/data/plots/types';

/** Build /wycena URL pre-filled with plot area */
function buildPlotCalculatorUrl(plot: Plot): string {
  return `/wycena?area=${Math.round(plot.area)}&utm_content=dzialka-${plot.slug}`;
}

interface PlotCardProps {
  plot: Plot;
  isHighlighted?: boolean;
  /** Sidebar mode — large card for map sidebar (OtoDom style) */
  compact?: boolean;
  onHover?: (slug: string | null) => void;
  /** Click handler (used in map sidebar to focus map) */
  onClick?: (slug: string) => void;
  /** Scroll-triggered animation */
  inView?: boolean;
  /** Stagger delay in seconds */
  delay?: number;
}

const AVAILABILITY_BADGE: Record<string, { label: string; color: string }> = {
  dostepna: { label: 'Dostepna', color: '#22c55e' },
  rezerwacja: { label: 'Rezerwacja', color: '#dfbb68' },
  sprzedana: { label: 'Sprzedana', color: '#71717a' },
};

function formatPrice(price: number): string {
  return price.toLocaleString('pl-PL');
}

/**
 * PlotCard — two modes:
 * - Full: grid listing card with animations
 * - Compact/Sidebar: OtoDom-style large card for map sidebar
 */
export const PlotCard = React.memo(function PlotCard({
  plot,
  isHighlighted = false,
  compact = false,
  onHover,
  onClick,
  inView = true,
  delay = 0,
}: PlotCardProps) {
  const badge = AVAILABILITY_BADGE[plot.availability];
  const mediaLabels: string[] = [];
  if (plot.media.water) mediaLabels.push('Woda');
  if (plot.media.electricity) mediaLabels.push('Prad');
  if (plot.media.gas) mediaLabels.push('Gaz');
  if (plot.media.sewer) mediaLabels.push('Kanalizacja');
  const mediaCount = mediaLabels.length;

  const detailUrl = `/dzialki/${plot.slug}`;

  /* ── Compact/Sidebar: OtoDom-style card ── */
  if (compact) {
    return (
      <div
        className={clsx(
          'border-b border-zinc-100 cursor-pointer transition-colors duration-150',
          isHighlighted ? 'bg-primary/5' : 'hover:bg-zinc-50/80'
        )}
        style={isHighlighted ? { boxShadow: 'inset 3px 0 0 0 var(--color-primary, #c9a96e)' } : undefined}
        onMouseEnter={() => onHover?.(plot.slug)}
        onMouseLeave={() => onHover?.(null)}
        onClick={() => onClick?.(plot.slug)}
      >
        {/* Large thumbnail */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100">
          {plot.thumbnailSrc ? (
            <img
              src={plot.thumbnailSrc}
              alt={plot.title}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Icon name="mapPin" size="lg" className="text-zinc-300" />
            </div>
          )}

          {/* Badges on image */}
          <div className="absolute top-2.5 left-2.5 flex gap-1.5">
            <span
              className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md shadow-sm"
              style={{ backgroundColor: badge.color, color: '#fff' }}
            >
              {badge.label}
            </span>
            {plot.mpzp === 'tak' && (
              <span className="text-[10px] font-bold uppercase tracking-wide px-2 py-1 rounded-md bg-zinc-800/80 text-white shadow-sm">
                MPZP
              </span>
            )}
          </div>

          {/* Image count */}
          {plot.images.length > 0 && (
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-black/60 text-white text-[10px] font-medium px-2 py-1 rounded-md">
              <Icon name="image" size="sm" />
              {plot.images.length + 1}
            </div>
          )}
        </div>

        {/* Content below photo */}
        <div className="px-4 py-3.5">
          {/* Price — BIG and prominent */}
          <p className="text-xl font-black text-text-primary mb-0.5">
            {formatPrice(plot.price)} zl
          </p>

          {/* Location */}
          <p className="text-sm font-medium text-text-secondary mb-3">
            {plot.city}{plot.district ? `, ${plot.district}` : ''}
          </p>

          {/* Key specs — large, clear */}
          <div className="flex items-center gap-4 mb-3">
            <div>
              <p className="text-lg font-bold text-text-primary leading-tight">{plot.area} m<sup className="text-xs">2</sup></p>
              <p className="text-[11px] text-text-muted">Powierzchnia</p>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div>
              <p className="text-lg font-bold text-text-primary leading-tight">{plot.pricePerM2} zl</p>
              <p className="text-[11px] text-text-muted">za m<sup className="text-xs">2</sup></p>
            </div>
            <div className="w-px h-8 bg-zinc-200" />
            <div>
              <p className="text-lg font-bold text-text-primary leading-tight">{mediaCount}<span className="text-sm text-text-muted font-normal">/4</span></p>
              <p className="text-[11px] text-text-muted">Media</p>
            </div>
          </div>

          {/* Media pills */}
          {mediaCount > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3">
              {mediaLabels.map((m) => (
                <span key={m} className="text-[10px] font-medium bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                  {m}
                </span>
              ))}
            </div>
          )}

          {/* CTA — link to detail + calculator */}
          <div className="flex items-center justify-between pt-2.5 border-t border-zinc-100 gap-2">
            <Link
              href={buildPlotCalculatorUrl(plot)}
              className="text-xs font-semibold text-primary hover:underline transition-colors flex items-center gap-1.5"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="calculator" size="sm" />
              Koszt budowy
            </Link>
            <Link
              href={detailUrl}
              className="text-xs font-semibold text-text-muted hover:text-primary transition-colors flex items-center gap-1"
              onClick={(e) => e.stopPropagation()}
            >
              Szczegoly
              <Icon name="arrowRight" size="sm" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  /* ── Full: grid card (ProjectListingCard style) ── */
  return (
    <Link
      href={detailUrl}
      className={clsx(
        'group relative bg-white rounded-2xl border',
        'overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50',
        'transition-all duration-500 flex flex-col h-full cursor-pointer',
        'border-zinc-200/60',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: delay > 0 ? `${delay}s` : undefined }}
      onMouseEnter={() => onHover?.(plot.slug)}
      onMouseLeave={() => onHover?.(null)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
        {plot.thumbnailSrc ? (
          <img
            src={plot.thumbnailSrc}
            alt={plot.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon name="mapPin" size="xl" className="text-zinc-200" />
          </div>
        )}

        {/* Availability badge — top left */}
        <div className="absolute top-3 left-3 z-10">
          <span
            className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-sm"
            style={{ backgroundColor: badge.color, color: '#fff' }}
          >
            {badge.label}
          </span>
        </div>

        {/* MPZP badge — bottom right */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="bg-zinc-800/90 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            MPZP: {plot.mpzp === 'tak' ? 'Tak' : plot.mpzp === 'nie' ? 'Nie' : '?'}
          </span>
        </div>

        {/* Image count */}
        {plot.images.length > 0 && (
          <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full">
            <Icon name="image" size="sm" />
            {plot.images.length + 1}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* City label */}
        <span className="text-xs text-text-muted uppercase tracking-wider mb-1">
          {plot.city}{plot.district ? ` · ${plot.district}` : ''}
        </span>

        {/* Title + Price badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-1">
            {plot.title}
          </h3>
          <div className="flex-shrink-0 bg-primary text-white px-3 py-1.5 rounded-lg">
            <p className="text-lg font-bold whitespace-nowrap">
              {formatPrice(plot.price)} zl
            </p>
          </div>
        </div>

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="bg-zinc-50 rounded-lg p-3">
            <p className="text-[0.7rem] text-text-muted uppercase tracking-wide mb-0.5">
              Powierzchnia
            </p>
            <p className="text-sm font-bold text-text-primary">
              {plot.area} m2
            </p>
          </div>
          <div className="bg-zinc-50 rounded-lg p-3">
            <p className="text-[0.7rem] text-text-muted uppercase tracking-wide mb-0.5">
              Cena za m2
            </p>
            <p className="text-sm font-bold text-text-primary">
              {plot.pricePerM2} zl
            </p>
          </div>
        </div>

        {/* Media pills */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {mediaLabels.length > 0 ? (
            mediaLabels.map((m) => (
              <span key={m} className="inline-flex items-center gap-1 text-xs bg-green-50 text-green-700 px-2.5 py-1 rounded-full">
                {m}
              </span>
            ))
          ) : (
            <span className="text-xs bg-zinc-100 text-text-secondary px-2.5 py-1 rounded-full">
              Brak mediow
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-xs bg-zinc-100 text-text-secondary px-2.5 py-1 rounded-full">
            {plot.terrain}
          </span>
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100 gap-2">
          <span
            className="text-xs font-semibold text-primary hover:text-primary-dark transition-colors flex items-center gap-1.5"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              window.location.href = buildPlotCalculatorUrl(plot);
            }}
          >
            <Icon name="calculator" size="sm" />
            Sprawdz koszt budowy
          </span>
          <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
            <Icon name="arrowRight" size="sm" />
          </span>
        </div>
      </div>
    </Link>
  );
});
