'use client';

import React, { useMemo, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';
import type { IconName } from '@/components/ui/Icon';
import type { Plot } from '@/data/plots/types';
import { plotSources } from '@/data/plots/types';
import {
  extractAddress,
  extractDistrict,
  buildPlotCalculatorUrl,
  buildPlotAnalysisUrl,
  formatPrice,
  getMediaLabels,
} from '@/data/plots/helpers';
import {
  trackPlotView,
  trackPlotCalculatorClick,
  trackPlotAnalysisClick,
  trackPlotContactClick,
} from '@/lib/analytics';

interface PlotDetailsProps {
  plot: Plot;
}

/** Fixed 4-section structure — icon per section title */
const SECTION_ICON_MAP: { pattern: string; icon: IconName }[] = [
  { pattern: 'lokalizacja', icon: 'mapPin' },
  { pattern: 'otoczenie', icon: 'mapPin' },
  { pattern: 'charakter', icon: 'layers' },
  { pattern: 'media', icon: 'zap' },
  { pattern: 'uzbrojenie', icon: 'zap' },
  { pattern: 'dojazd', icon: 'car' },
  { pattern: 'komunikacj', icon: 'car' },
  { pattern: 'projekt', icon: 'fileBadge' },
  { pattern: 'rozkład', icon: 'layoutGrid' },
  { pattern: 'teren', icon: 'mountain' },
];

function getSectionIcon(title: string): IconName {
  const lower = title.toLowerCase();
  for (const { pattern, icon } of SECTION_ICON_MAP) {
    if (lower.includes(pattern)) return icon;
  }
  return 'info';
}

interface DescriptionSection {
  title: string;
  html: string;
  icon: IconName;
}

/**
 * Parse Gemini HTML (with <h3> sections) into structured sections
 * for rendering with golden border + icons.
 */
function parseDescriptionSections(html: string): DescriptionSection[] {
  if (!html || html.length < 30) return [];

  const hasH3 = html.includes('<h3>');
  if (!hasH3) {
    return [{
      title: 'Opis nieruchomości',
      html: html.includes('<p>') ? html : `<p>${html}</p>`,
      icon: 'fileText',
    }];
  }

  const sections: DescriptionSection[] = [];
  const parts = html.split(/<h3>/);

  for (const part of parts) {
    if (!part.trim()) continue;
    const closeIdx = part.indexOf('</h3>');
    if (closeIdx === -1) {
      if (part.trim().length > 20) {
        sections.push({ title: 'Informacje ogólne', html: part.trim(), icon: 'info' });
      }
      continue;
    }
    const title = part.substring(0, closeIdx).trim();
    const content = part.substring(closeIdx + 5).trim();
    if (title && content) {
      sections.push({ title, html: content, icon: getSectionIcon(title) });
    }
  }

  return sections;
}

/** Build rows for the details table, only including available data */
function buildDetailRows(plot: Plot, locationDisplay: string) {
  const rows: { label: string; value: string; icon?: IconName }[] = [
    { label: 'Powierzchnia', value: `${plot.area.toLocaleString('pl-PL')} m\u00B2`, icon: 'areaChart' },
    { label: 'Cena za m\u00B2', value: `${plot.pricePerM2} zł/m\u00B2`, icon: 'coins' },
    { label: 'Lokalizacja', value: locationDisplay, icon: 'mapPin' },
  ];

  if (plot.dimensions) rows.push({ label: 'Wymiary działki', value: plot.dimensions, icon: 'ruler' });
  rows.push({ label: 'Kształt działki', value: plot.plotShape, icon: 'layers' });
  rows.push({ label: 'Ukształtowanie terenu', value: plot.terrain, icon: 'mountain' });
  rows.push({ label: 'Dojazd', value: plot.access, icon: 'car' });

  if (plot.legalStatus) rows.push({ label: 'Stan prawny', value: plot.legalStatus, icon: 'fileBadge' });
  if (plot.purpose) rows.push({ label: 'Przeznaczenie', value: plot.purpose, icon: 'landmark' });
  if (plot.development) rows.push({ label: 'Zagospodarowanie', value: plot.development, icon: 'shovel' });
  if (plot.fencing) rows.push({ label: 'Ogrodzenie', value: plot.fencing, icon: 'gate' });
  if (plot.surroundings) rows.push({ label: 'Otoczenie', value: plot.surroundings, icon: 'tree' });
  if (plot.locationType) rows.push({ label: 'Położenie', value: plot.locationType, icon: 'map' });

  if (plot.mpzp !== 'nie_wiem') {
    rows.push({
      label: 'MPZP',
      value: plot.mpzp === 'tak'
        ? `Tak — plan miejscowy${plot.mpzpSymbol ? ` (${plot.mpzpSymbol})` : ''}`
        : 'Nie',
      icon: 'fileText',
    });
  }
  rows.push({
    label: 'Dostępność',
    value: plot.availability === 'dostepna' ? 'Dostępna' : plot.availability === 'rezerwacja' ? 'Rezerwacja' : 'Sprzedana',
    icon: 'checkCircle',
  });

  return rows;
}

export function PlotDetails({ plot }: PlotDetailsProps) {
  const district = useMemo(() => extractDistrict(plot.title) || plot.district, [plot.title, plot.district]);
  const address = useMemo(() => extractAddress(plot), [plot]);
  const descSections = useMemo(() => parseDescriptionSections(plot.description), [plot.description]);
  const mediaLabels = useMemo(() => getMediaLabels(plot), [plot]);
  const calculatorUrl = useMemo(() => buildPlotCalculatorUrl(plot), [plot]);
  const analysisUrl = useMemo(() => buildPlotAnalysisUrl(plot), [plot]);

  const locationDisplay = district ? `${plot.city}, ${district}` : plot.city;
  const fullAddress = plot.street
    ? `${plot.street}, ${plot.city}`
    : address
      ? `${address}, ${plot.city}`
      : plot.city;

  const detailRows = useMemo(() => buildDetailRows(plot, locationDisplay), [plot, locationDisplay]);

  // ── GA4 tracking ──
  useEffect(() => {
    trackPlotView(plot.slug, plot.city, plot.price, plot.area);
  }, [plot.slug, plot.city, plot.price, plot.area]);

  const onCalculatorClick = useCallback(() => {
    trackPlotCalculatorClick(plot.slug, plot.city);
  }, [plot.slug, plot.city]);

  const onAnalysisClick = useCallback(() => {
    trackPlotAnalysisClick(plot.slug, plot.city);
  }, [plot.slug, plot.city]);

  const onContactClick = useCallback(() => {
    trackPlotContactClick(plot.slug, plot.city);
  }, [plot.slug, plot.city]);

  // ── Reusable CTA card ──
  const ctaCard = (
    <div className="bg-white border border-zinc-200/60 rounded-2xl shadow-lg overflow-hidden">
      {/* Price header */}
      <div className="bg-zinc-900 px-6 py-6">
        <p className="text-primary font-bold text-xs uppercase tracking-[0.15em] mb-1">Cena</p>
        <p className="text-3xl md:text-4xl font-black text-white">
          {formatPrice(plot.price)} zł
        </p>
        <p className="text-zinc-400 text-sm md:text-base mt-1">
          {plot.pricePerM2} zł/m<sup className="text-xs">2</sup> &middot; {plot.area.toLocaleString('pl-PL')} m<sup className="text-xs">2</sup>
        </p>
        {(() => {
          const src = plot.source ? plotSources.find((s) => s.id === plot.source) : undefined;
          if (!src) return null;
          return (
            <p className="text-zinc-500 text-xs mt-3 pt-3 border-t border-zinc-700/50">
              Oferta: {src.label}
            </p>
          );
        })()}
      </div>

      {/* Quick specs in sidebar */}
      <div className="border-b border-zinc-100 px-6 py-4 space-y-2">
        {(() => {
          const items: { icon: IconName; text: string }[] = [];
          if (plot.dimensions) items.push({ icon: 'ruler', text: `Wymiary: ${plot.dimensions}` });
          if (plot.plotShape) items.push({ icon: 'layers', text: `Kształt: ${plot.plotShape}` });
          if (plot.legalStatus) items.push({ icon: 'fileBadge', text: `Stan prawny: ${plot.legalStatus}` });
          if (plot.purpose) items.push({ icon: 'landmark', text: `Przeznaczenie: ${plot.purpose}` });
          return items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-text-secondary">
              <Icon name={item.icon} size="sm" className="text-text-muted/60 shrink-0" />
              <span className="truncate">{item.text}</span>
            </div>
          ));
        })()}
      </div>

      {/* CTA buttons */}
      <div className="p-6 space-y-3">
        <Link
          href={calculatorUrl}
          onClick={onCalculatorClick}
          className="group w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-zinc-900 font-bold text-sm md:text-base px-6 py-3.5 rounded-lg transition-all duration-300 uppercase tracking-wider"
        >
          <Icon name="calculator" size="md" />
          Sprawdź koszt budowy
        </Link>

        <Link
          href={analysisUrl}
          onClick={onAnalysisClick}
          className="group w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-sm md:text-base px-6 py-3.5 rounded-lg transition-all duration-300 uppercase tracking-wider"
        >
          <Icon name="search" size="md" />
          Zamów analizę działki
        </Link>

        <Link
          href="/umow-konsultacje?usluga=budowa"
          onClick={onContactClick}
          className="group w-full flex items-center justify-center gap-2 bg-white hover:bg-zinc-50 text-text-primary font-semibold text-sm md:text-base px-6 py-3.5 rounded-lg border border-zinc-200 transition-all duration-300"
        >
          <Icon name="phone" size="md" />
          Zapytaj o działkę
        </Link>
      </div>

      {/* Trust points */}
      <div className="border-t border-zinc-100 px-6 py-5 space-y-3">
        {[
          'Bezpłatna analiza przy podpisaniu umowy',
          'Stała cena w umowie ryczałtowej',
          'Pomoc z formalnościami budowlanymi',
        ].map((point, i) => (
          <div key={i} className="flex items-start gap-2.5">
            <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 mt-0.5">
              <Icon name="check" size="sm" className="text-green-600" />
            </div>
            <span className="text-sm text-text-secondary leading-relaxed">{point}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className="bg-background-beige py-6 md:py-8">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-4" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li className="flex items-center gap-2">
              <Link href="/" className="text-text-muted hover:text-primary transition-colors">
                Strona główna
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="chevronRight" size="sm" className="text-text-muted" />
              <Link href="/dzialki" className="text-text-muted hover:text-primary transition-colors">
                Działki
              </Link>
            </li>
            <li className="flex items-center gap-2">
              <Icon name="chevronRight" size="sm" className="text-text-muted" />
              <span className="text-text-primary font-medium">{locationDisplay}</span>
            </li>
          </ol>
        </nav>

        <div className="bg-white rounded-xl shadow-lg p-4 md:p-8 lg:p-12">
          {/* H1 */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-2 leading-tight">
            Działka {plot.purpose?.includes('budowlan') ? 'budowlana ' : ''}{plot.area.toLocaleString('pl-PL')} m<sup className="text-lg md:text-xl">2</sup> — {locationDisplay}
          </h1>
          <div className="flex items-center gap-2 text-text-muted text-sm md:text-base mb-1">
            <Icon name="mapPin" size="md" />
            <span>{fullAddress}</span>
          </div>
          <p className="text-base md:text-lg text-text-secondary mb-6 md:mb-8">
            {plot.plotShape} &middot; {plot.terrain} &middot; {plot.access}
            {plot.legalStatus ? ` \u00B7 ${plot.legalStatus}` : ''}
          </p>

          {/* ── Two columns: details + sidebar ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: detailed info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Key specs — big numbers */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-50 rounded-xl p-5">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Powierzchnia</p>
                  <p className="text-2xl md:text-3xl font-bold text-text-primary">{plot.area.toLocaleString('pl-PL')} m<sup className="text-sm">2</sup></p>
                </div>
                <div className="bg-zinc-50 rounded-xl p-5">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Cena za m2</p>
                  <p className="text-2xl md:text-3xl font-bold text-text-primary">{plot.pricePerM2} zł</p>
                </div>
                {plot.mpzp !== 'nie_wiem' && (
                  <div className="bg-zinc-50 rounded-xl p-5">
                    <p className="text-xs text-text-muted uppercase tracking-wide mb-1">MPZP</p>
                    <p className="text-2xl md:text-3xl font-bold text-text-primary">
                      {plot.mpzp === 'tak' ? 'Tak' : 'Nie'}
                    </p>
                  </div>
                )}
                <div className="bg-zinc-50 rounded-xl p-5">
                  <p className="text-xs text-text-muted uppercase tracking-wide mb-1">Media</p>
                  <p className="text-2xl md:text-3xl font-bold text-text-primary">
                    {mediaLabels.length}<span className="text-base text-text-muted font-normal">/4</span>
                  </p>
                </div>
              </div>

              {/* Details table — all parameters */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">Szczegóły działki</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-px rounded-xl overflow-hidden border border-zinc-200">
                  {detailRows.map((row, i) => (
                    <div key={i} className="bg-white px-5 py-4 flex items-center justify-between gap-3 border-b border-zinc-200 md:[&:nth-last-child(-n+2)]:border-b-0 [&:last-child]:border-b-0 md:odd:border-r md:odd:border-r-zinc-200">
                      <span className="text-sm md:text-base text-text-muted flex items-center gap-2">
                        {row.icon && <Icon name={row.icon} size="sm" className="text-text-muted/60 shrink-0" />}
                        {row.label}
                      </span>
                      <span className="text-sm md:text-base font-semibold text-text-primary text-right">{row.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Media — with detailed status */}
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-4">Uzbrojenie i media</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {([
                    { label: 'Woda', available: plot.media.water, icon: 'droplets' as const, detailKey: 'water' },
                    { label: 'Prąd', available: plot.media.electricity, icon: 'zap' as const, detailKey: 'electricity' },
                    { label: 'Gaz', available: plot.media.gas, icon: 'flame' as const, detailKey: 'gas' },
                    { label: 'Kanalizacja', available: plot.media.sewer, icon: 'pipette' as const, detailKey: 'sewer' },
                  ] as const).map((item) => {
                    const detail = plot.mediaDetails?.[item.detailKey];
                    return (
                      <div
                        key={item.label}
                        className={`flex items-center gap-3 p-4 rounded-xl border ${
                          item.available
                            ? 'bg-green-50 border-green-200'
                            : 'bg-zinc-50 border-zinc-200'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                          item.available ? 'bg-green-100' : 'bg-zinc-100'
                        }`}>
                          <Icon
                            name={item.icon}
                            size="md"
                            className={item.available ? 'text-green-600' : 'text-zinc-400'}
                          />
                        </div>
                        <div className="min-w-0">
                          <p className={`text-sm md:text-base font-semibold ${
                            item.available ? 'text-green-700' : 'text-zinc-400'
                          }`}>
                            {item.label}
                          </p>
                          <p className="text-xs md:text-sm text-text-muted truncate">
                            {detail || (item.available ? 'Dostępna' : 'Brak')}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* ── Mobile CTA card — after media, before description ── */}
              <div className="lg:hidden">
                {ctaCard}
              </div>

              {/* Description — 4 sections with golden left border + icons */}
              {descSections.length > 0 && (
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-text-primary mb-5">O działce</h2>
                  <div className="space-y-5">
                    {descSections.map((section, i) => (
                      <div key={i} className="border-l-4 border-primary bg-zinc-50/50 rounded-r-xl pl-5 pr-5 py-4 md:pl-6 md:pr-6 md:py-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-8 h-8 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                            <Icon name={section.icon} size="sm" className="text-primary" />
                          </div>
                          <h3 className="text-sm md:text-base font-bold text-text-primary uppercase tracking-wide">{section.title}</h3>
                        </div>
                        <div
                          className="text-sm md:text-base text-text-secondary leading-relaxed [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:text-text-primary [&_strong]:font-semibold [&_ul]:mt-2 [&_ul]:mb-2 [&_ul]:pl-5 [&_ul]:list-disc [&_li]:mb-1 [&_li]:text-text-secondary"
                          dangerouslySetInnerHTML={{ __html: section.html }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Ref ID */}
              {plot.refId && (
                <p className="text-xs text-text-muted mt-4">
                  Nr referencyjny: {plot.refId}
                </p>
              )}
            </div>

            {/* Right: sticky CTA card — desktop only */}
            <div className="hidden lg:block lg:col-span-1">
              <div className="sticky top-24">
                {ctaCard}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
