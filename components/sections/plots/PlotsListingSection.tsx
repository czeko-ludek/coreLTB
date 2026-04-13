'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';
import { useRouter } from 'next/navigation';
import type { Plot, PlotFilters, PlotSortBy } from '@/data/plots/types';
import { filterAndSortPlots, slugifyCity } from '@/data/plots';
import type { PlotFAQItem } from '@/data/plots/seo';
import { PlotCard } from './PlotCard';
import { LocationSearch, type LocationSelection } from './LocationSearch';
import type { PlotMapHandle } from './PlotMap';
import { LOCATIONS, getLocationCities, getLocationDistricts } from '@/data/plots/locations';

// Dynamic import — Leaflet doesn't support SSR
const PlotMap = dynamic(() => import('./PlotMap').then((m) => m.PlotMap), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[400px] rounded-2xl bg-zinc-100 animate-pulse flex items-center justify-center">
      <Icon name="map" size="xl" className="text-zinc-300" />
    </div>
  ),
});

const breadcrumbs = [
  { label: 'Strona główna', href: '/' },
  { label: 'Działki budowlane' },
];

const PRICE_RANGES = [
  { label: 'Wszystkie ceny', min: undefined, max: undefined },
  { label: 'do 150 tys.', min: undefined, max: 150000 },
  { label: '150–300 tys.', min: 150000, max: 300000 },
  { label: '300–500 tys.', min: 300000, max: 500000 },
  { label: '500 tys.+', min: 500000, max: undefined },
];

const AREA_RANGES = [
  { label: 'Każda pow.', min: undefined, max: undefined },
  { label: 'do 800 m2', min: undefined, max: 800 },
  { label: '800–1200 m2', min: 800, max: 1200 },
  { label: '1200–2000 m2', min: 1200, max: 2000 },
  { label: '2000+ m2', min: 2000, max: undefined },
];

const SORT_OPTIONS: { id: PlotSortBy; label: string }[] = [
  { id: 'newest', label: 'Najnowsze' },
  { id: 'price-asc', label: 'Cena rosnąco' },
  { id: 'price-desc', label: 'Cena malejąco' },
  { id: 'area-asc', label: 'Powierzchnia rosnąco' },
  { id: 'area-desc', label: 'Powierzchnia malejąco' },
];

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PlotsListingSectionProps {
  plots: Plot[];
  /** Pre-selected city slug (from /dzialki/[miasto]) */
  activeCity?: string;
  /** SEO overrides */
  h1?: string;
  h1Highlight?: string;
  description?: string;
  /** Dynamic FAQ items */
  faq?: PlotFAQItem[];
  /** Custom breadcrumbs from location hierarchy */
  breadcrumbs?: BreadcrumbItem[];
  /** SEO content block (HTML) displayed below FAQ */
  seoContent?: string;
}

export function PlotsListingSection({
  plots,
  activeCity,
  h1 = 'Działki budowlane',
  h1Highlight = 'na Śląsku',
  description = 'Sprawdzone działki pod budowę domu jednorodzinnego. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  faq,
  breadcrumbs: customBreadcrumbs,
  seoContent,
}: PlotsListingSectionProps) {
  const router = useRouter();

  // Initialize location selection from activeCity prop (URL-driven)
  const initialSelection = useMemo<LocationSelection | null>(() => {
    if (!activeCity) return null;
    const entry = LOCATIONS[activeCity];
    if (!entry) return null;
    return {
      slug: entry.slug,
      entry,
      cities: getLocationCities(entry.slug),
      districts: getLocationDistricts(entry.slug) || undefined,
      nominatimQuery: entry.nominatimQuery,
    };
  }, [activeCity]);

  const [locationSelection, setLocationSelection] = useState<LocationSelection | null>(initialSelection);

  const [filters, setFilters] = useState<PlotFilters>({
    sortBy: 'newest',
  });
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [priceDropdownOpen, setPriceDropdownOpen] = useState(false);
  const [areaDropdownOpen, setAreaDropdownOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  /** Slugs visible in map viewport — null means show all (no map-based filter) */
  const [mapVisibleSlugs, setMapVisibleSlugs] = useState<string[] | null>(null);

  const fullscreenMapHandleRef = useRef<PlotMapHandle>(null);

  // Escape zamyka fullscreen
  useEffect(() => {
    if (!isFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setIsFullscreen(false); setMapVisibleSlugs(null); }
    };
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [isFullscreen]);

  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true, rootMargin: '50px 0px' });

  // Top city slugs by plot count — fed to LocationSearch as popular suggestions
  const topCitySlugs = useMemo(() => {
    const cityMap = new Map<string, { slug: string; count: number }>();
    for (const p of plots) {
      if (p.availability === 'sprzedana') continue;
      const slug = slugifyCity(p.city);
      const existing = cityMap.get(slug);
      if (existing) {
        existing.count++;
      } else {
        cityMap.set(slug, { slug, count: 1 });
      }
    }
    return Array.from(cityMap.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6)
      .map((c) => c.slug);
  }, [plots]);

  // Filter & sort plots (data already pre-filtered by location on server)
  const filteredPlots = useMemo(() => {
    return filterAndSortPlots(plots, filters);
  }, [plots, filters]);

  // Sidebar plots in fullscreen: filtered by map viewport
  const sidebarPlots = useMemo(() => {
    if (!mapVisibleSlugs) return filteredPlots;
    const slugSet = new Set(mapVisibleSlugs);
    return filteredPlots.filter((p) => slugSet.has(p.slug));
  }, [filteredPlots, mapVisibleSlugs]);

  const availableCount = useMemo(
    () => plots.filter((p) => p.availability !== 'sprzedana').length,
    [plots]
  );


  const handleLocationChange = useCallback((selection: LocationSelection | null) => {
    setLocationSelection(selection);
  }, []);

  const handlePriceRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, priceMin: min, priceMax: max }));
  }, []);

  const handleAreaRange = useCallback((min?: number, max?: number) => {
    setFilters((prev) => ({ ...prev, areaMin: min, areaMax: max }));
  }, []);

  const handleSortChange = useCallback((sortBy: PlotSortBy) => {
    setFilters((prev) => ({ ...prev, sortBy }));
    setSortDropdownOpen(false);
  }, []);

  const handlePlotHover = useCallback((slug: string | null) => {
    setHighlightedSlug(slug);
  }, []);

  const handlePlotClick = useCallback((slug: string) => {
    console.log('Plot clicked:', slug);
  }, []);

  const handleVisiblePlotsChange = useCallback((slugs: string[]) => {
    setMapVisibleSlugs(slugs);
  }, []);

  const handleSidebarPlotClick = useCallback((slug: string) => {
    setHighlightedSlug(slug);
    fullscreenMapHandleRef.current?.focusPlot(slug);
    // Close mobile drawer after selection
    setMobileDrawerOpen(false);
  }, []);

  const currentSort = SORT_OPTIONS.find((o) => o.id === filters.sortBy) || SORT_OPTIONS[0];

  return (
    <>
      <section ref={ref} className="pt-6 pb-16 md:pt-8 md:pb-24 bg-background-beige min-h-screen">
        <div className="container mx-auto px-4 md:px-6">

          {/* ── Header ── */}
          <div
            className={clsx('max-w-3xl mb-6', inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.1s' }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
              {h1}{' '}
              <span className="text-primary">{h1Highlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>

          {/* ── Toolbar ── */}
          <div
            className={clsx(
              'relative z-[50] flex flex-col gap-3 mb-6',
              inView ? 'animate-fade-in-up' : 'opacity-0'
            )}
            style={{ animationDelay: '0.2s' }}
          >
            {/* Row 1: Location search + map button */}
            <div className="flex items-center gap-3">
              {/* Location search — prominent bar */}
              <LocationSearch
                value={locationSelection}
                onChange={handleLocationChange}
                navigateToSubpage
                popularSlugs={topCitySlugs}
                placeholder="Wpisz miasto, np. Wodzisław Śląski, Rybnik..."
                className="flex-1 max-w-xl"
              />

              {/* Map button — opens fullscreen */}
              <button
                onClick={() => setIsFullscreen(true)}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-text-primary border border-zinc-200 hover:border-primary hover:text-primary transition-all shrink-0"
              >
                <Icon name="map" size="sm" />
                Mapa
              </button>

              {/* "Usuń filtry" link when on city subpage */}
              {activeCity && (
                <button
                  onClick={() => router.push('/dzialki')}
                  className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-zinc-100 text-text-primary hover:bg-zinc-200 transition-all shrink-0"
                >
                  <Icon name="x" size="sm" />
                  Usuń filtry
                </button>
              )}
            </div>

            {/* Row 2: Filters — dropdowns on mobile, chip row on desktop */}

            {/* ── Mobile: 3 dropdown boxes ── */}
            <div className="flex items-center gap-2 md:hidden">
              {/* Price dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => { setPriceDropdownOpen(!priceDropdownOpen); setAreaDropdownOpen(false); setSortDropdownOpen(false); }}
                  className={clsx(
                    'w-full flex items-center justify-between gap-1 px-3 py-2.5 bg-white rounded-lg text-xs font-medium border transition-all',
                    filters.priceMin || filters.priceMax
                      ? 'border-zinc-900 text-zinc-900'
                      : 'border-zinc-200 text-text-secondary'
                  )}
                >
                  <span>{PRICE_RANGES.find(r => r.min === filters.priceMin && r.max === filters.priceMax)?.label || 'Cena'}</span>
                  <Icon name={priceDropdownOpen ? 'chevronUp' : 'chevronDown'} size="sm" />
                </button>
                {priceDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setPriceDropdownOpen(false)} />
                    <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 py-1 z-30">
                      {PRICE_RANGES.map((range, i) => (
                        <button
                          key={i}
                          onClick={() => { handlePriceRange(range.min, range.max); setPriceDropdownOpen(false); }}
                          className={clsx(
                            'w-full text-left px-4 py-2.5 text-sm transition-colors',
                            filters.priceMin === range.min && filters.priceMax === range.max
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-text-secondary hover:bg-zinc-50'
                          )}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Area dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => { setAreaDropdownOpen(!areaDropdownOpen); setPriceDropdownOpen(false); setSortDropdownOpen(false); }}
                  className={clsx(
                    'w-full flex items-center justify-between gap-1 px-3 py-2.5 bg-white rounded-lg text-xs font-medium border transition-all',
                    filters.areaMin || filters.areaMax
                      ? 'border-zinc-900 text-zinc-900'
                      : 'border-zinc-200 text-text-secondary'
                  )}
                >
                  <span>{AREA_RANGES.find(r => r.min === filters.areaMin && r.max === filters.areaMax)?.label || 'Powierzchnia'}</span>
                  <Icon name={areaDropdownOpen ? 'chevronUp' : 'chevronDown'} size="sm" />
                </button>
                {areaDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setAreaDropdownOpen(false)} />
                    <div className="absolute left-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 py-1 z-30">
                      {AREA_RANGES.map((range, i) => (
                        <button
                          key={i}
                          onClick={() => { handleAreaRange(range.min, range.max); setAreaDropdownOpen(false); }}
                          className={clsx(
                            'w-full text-left px-4 py-2.5 text-sm transition-colors',
                            filters.areaMin === range.min && filters.areaMax === range.max
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-text-secondary hover:bg-zinc-50'
                          )}
                        >
                          {range.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative flex-1">
                <button
                  onClick={() => { setSortDropdownOpen(!sortDropdownOpen); setPriceDropdownOpen(false); setAreaDropdownOpen(false); }}
                  className="w-full flex items-center justify-between gap-1 px-3 py-2.5 bg-white rounded-lg text-xs font-medium text-text-secondary border border-zinc-200 transition-all"
                >
                  <span>{currentSort.label}</span>
                  <Icon name={sortDropdownOpen ? 'chevronUp' : 'chevronDown'} size="sm" />
                </button>
                {sortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setSortDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 py-1 z-30">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSortChange(option.id)}
                          className={clsx(
                            'w-full text-left px-4 py-2.5 text-sm transition-colors',
                            filters.sortBy === option.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-text-secondary hover:bg-zinc-50'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* ── Desktop: chip row (unchanged) ── */}
            <div className="hidden md:flex flex-wrap items-center gap-2">
              {/* Price range chips */}
              <div className="flex items-center gap-1">
                {PRICE_RANGES.map((range, i) => {
                  const isActive = filters.priceMin === range.min && filters.priceMax === range.max;
                  return (
                    <button
                      key={i}
                      onClick={() => handlePriceRange(range.min, range.max)}
                      className={clsx(
                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                        isActive
                          ? 'bg-zinc-900 text-white'
                          : 'bg-white text-text-secondary border border-zinc-200 hover:border-zinc-400'
                      )}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>

              <div className="w-px h-6 bg-zinc-200 mx-1" />

              {/* Area range chips */}
              <div className="flex items-center gap-1">
                {AREA_RANGES.map((range, i) => {
                  const isActive = filters.areaMin === range.min && filters.areaMax === range.max;
                  return (
                    <button
                      key={i}
                      onClick={() => handleAreaRange(range.min, range.max)}
                      className={clsx(
                        'px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                        isActive
                          ? 'bg-zinc-900 text-white'
                          : 'bg-white text-text-secondary border border-zinc-200 hover:border-zinc-400'
                      )}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>

              <div className="w-px h-6 bg-zinc-200 mx-1" />

              {/* Sort dropdown */}
              <div className="relative ml-auto">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-md text-xs font-medium text-text-secondary border border-zinc-200 hover:border-zinc-400 transition-all"
                >
                  <Icon name="arrowUpDown" size="sm" />
                  {currentSort.label}
                  <Icon name={sortDropdownOpen ? 'chevronUp' : 'chevronDown'} size="sm" />
                </button>
                {sortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setSortDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 py-1 z-30">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSortChange(option.id)}
                          className={clsx(
                            'w-full text-left px-4 py-2 text-sm transition-colors',
                            filters.sortBy === option.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-text-secondary hover:bg-zinc-50'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* ── Breadcrumbs (below search bar) ── */}
          <nav
            aria-label="Breadcrumb"
            className={clsx('mb-4', inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.25s' }}
          >
            <ol className="flex items-center gap-2 text-sm">
              {(customBreadcrumbs ?? breadcrumbs).map((crumb, index) => (
                <li key={index} className="flex items-center gap-2">
                  {index > 0 && <Icon name="chevronRight" size="sm" className="text-text-muted" />}
                  {crumb.href ? (
                    <Link href={crumb.href} className="text-text-muted hover:text-primary transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="text-text-primary font-medium">{crumb.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* ── Content ── */}
          <div
            className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
            style={{ animationDelay: '0.3s' }}
          >
            {/* === LIST VIEW (only view on page — map is always fullscreen) === */}
            <>
              {/* Result count */}
              <p className="text-sm text-text-muted mb-4">
                {filteredPlots.length} {filteredPlots.length === 1 ? 'działka' : 'działek'}
              </p>
              {filteredPlots.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPlots.map((plot, index) => (
                    <PlotCard
                      key={plot.slug}
                      plot={plot}
                      isHighlighted={plot.slug === highlightedSlug}
                      onHover={handlePlotHover}
                      inView={inView}
                      delay={index < 6 ? 0.3 + index * 0.08 : 0}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <Icon name="mapPin" size="xl" className="text-text-muted mx-auto mb-4" />
                  <p className="text-text-secondary text-lg">Brak działek w tej lokalizacji.</p>
                </div>
              )}
            </>
          </div>

          {/* ── FAQ Section (dynamic, SEO) ── */}
          {faq && faq.length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
                Najczęściej zadawane pytania
              </h2>
              <div className="space-y-4">
                {faq.map((item, i) => (
                  <details
                    key={i}
                    className="group bg-white rounded-2xl border border-zinc-200/60 overflow-hidden"
                  >
                    <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
                      <h3 className="text-base font-semibold text-text-primary pr-4">
                        {item.question}
                      </h3>
                      <Icon
                        name="chevronDown"
                        size="sm"
                        className="text-text-muted shrink-0 transition-transform duration-300 group-open:rotate-180"
                      />
                    </summary>
                    <div className="px-6 pb-5 text-text-secondary leading-relaxed">
                      {item.answer}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}

          {/* ── SEO Content Block (unique per city) ── */}
          {seoContent && (
            <div
              className="mt-12 md:mt-16 prose prose-zinc max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h2:mb-4 prose-p:text-text-secondary prose-p:leading-relaxed prose-ul:mt-3 prose-li:text-text-secondary prose-strong:text-text-primary"
              dangerouslySetInnerHTML={{ __html: seoContent }}
            />
          )}

        </div>
      </section>

      {/* ── Fullscreen Map Overlay ── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col">
          {/* Fullscreen toolbar */}
          <div className="shrink-0 border-b border-zinc-200 bg-white px-4 py-3 relative z-[1200]">
            <div className="flex items-center gap-3">
              {/* Close button */}
              <button
                onClick={() => { setIsFullscreen(false); setMapVisibleSlugs(null); }}
                className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors shrink-0"
                title="Zamknij (Escape)"
              >
                <Icon name="x" size="sm" className="text-zinc-600" />
              </button>

              {/* Location search */}
              <LocationSearch
                value={locationSelection}
                onChange={handleLocationChange}
                navigateToSubpage
                popularSlugs={topCitySlugs}
                placeholder="Wpisz miasto..."
                className="w-72 md:w-96 shrink-0"
              />

              {/* Secondary filters */}
              <div className="hidden md:flex items-center gap-1">
                {PRICE_RANGES.map((range, i) => {
                  const isActive = filters.priceMin === range.min && filters.priceMax === range.max;
                  return (
                    <button
                      key={i}
                      onClick={() => handlePriceRange(range.min, range.max)}
                      className={clsx(
                        'px-2.5 py-1.5 rounded-md text-[11px] font-medium transition-all whitespace-nowrap',
                        isActive
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-text-secondary hover:bg-zinc-200'
                      )}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>

              {/* Sort */}
              <div className="relative hidden md:block">
                <button
                  onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-100 rounded-md text-[11px] font-medium text-text-secondary hover:bg-zinc-200 transition-all whitespace-nowrap"
                >
                  <Icon name="arrowUpDown" size="sm" />
                  {currentSort.label}
                </button>
                {sortDropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-20" onClick={() => setSortDropdownOpen(false)} />
                    <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-zinc-200 py-1 z-30">
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => handleSortChange(option.id)}
                          className={clsx(
                            'w-full text-left px-4 py-2 text-sm transition-colors',
                            filters.sortBy === option.id
                              ? 'bg-primary/10 text-primary font-medium'
                              : 'text-text-secondary hover:bg-zinc-50'
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Fullscreen content — sidebar + map */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar — only on large screens (1024px+), tablets get mobile drawer */}
            <div className="w-[480px] shrink-0 overflow-y-auto border-r border-zinc-200 bg-white hidden lg:block">
              <div className="sticky top-0 bg-white z-10 px-4 py-3 border-b border-zinc-100">
                <p className="text-sm font-semibold text-text-primary">
                  {sidebarPlots.length} {sidebarPlots.length === 1 ? 'działka' : 'działek'}
                  {mapVisibleSlugs && sidebarPlots.length !== filteredPlots.length && (
                    <span className="text-text-muted font-normal"> z {filteredPlots.length} na mapie</span>
                  )}
                </p>
              </div>
              {sidebarPlots.map((plot) => (
                <PlotCard
                  key={plot.slug}
                  plot={plot}
                  compact
                  isHighlighted={plot.slug === highlightedSlug}
                  onHover={handlePlotHover}
                  onClick={handleSidebarPlotClick}
                />
              ))}
              {sidebarPlots.length === 0 && (
                <div className="text-center py-12">
                  <Icon name="mapPin" size="lg" className="text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">Brak działek dla wybranych filtrów.</p>
                </div>
              )}
            </div>

            {/* Map */}
            <div className="flex-1 relative">
              <PlotMap
                ref={fullscreenMapHandleRef}
                plots={filteredPlots}
                highlightedSlug={highlightedSlug}
                onPlotHover={handlePlotHover}
                onPlotClick={handlePlotClick}
                boundaryQuery={locationSelection?.nominatimQuery ?? null}
                onVisiblePlotsChange={handleVisiblePlotsChange}
              />

              {/* Mobile: bottom drawer trigger in fullscreen */}
              <button
                onClick={() => setMobileDrawerOpen(true)}
                className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-lg border border-zinc-200/60 px-5 py-3.5 flex items-center justify-between z-[1100] lg:hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="layoutGrid" size="sm" className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-text-primary">
                      {sidebarPlots.length} {sidebarPlots.length === 1 ? 'działka' : 'działek'}
                    </p>
                    <p className="text-xs text-text-muted">Dotknij, aby zobaczyć listę</p>
                  </div>
                </div>
                <Icon name="chevronUp" size="sm" className="text-text-muted" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Floating "Pokaż na mapie" button — opens fullscreen map ── */}
      {!isFullscreen && (
        <button
          onClick={() => setIsFullscreen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] bg-zinc-900 hover:bg-zinc-800 text-white pl-5 pr-6 py-3.5 rounded-full shadow-xl shadow-black/20 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group"
        >
          <Icon name="map" size="sm" className="text-primary" />
          <span className="text-sm font-bold">Pokaż na mapie</span>
        </button>
      )}

      {/* ── Mobile Bottom Drawer (Uber-style) ── */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-[900] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileDrawerOpen(false)}
          />

          {/* Drawer */}
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col animate-slide-up">
            {/* Handle + header */}
            <div className="sticky top-0 bg-white rounded-t-3xl z-10 pt-3 pb-2 px-5 border-b border-zinc-100">
              <div className="w-10 h-1 rounded-full bg-zinc-300 mx-auto mb-3" />
              <div className="flex items-center justify-between">
                <p className="text-base font-bold text-text-primary">
                  {sidebarPlots.length} {sidebarPlots.length === 1 ? 'działka' : 'działek'}
                </p>
                <button
                  onClick={() => setMobileDrawerOpen(false)}
                  className="w-8 h-8 rounded-full bg-zinc-100 flex items-center justify-center"
                >
                  <Icon name="x" size="sm" className="text-text-muted" />
                </button>
              </div>

              {/* Mobile secondary filters */}
              <div className="flex gap-2 mt-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
                {PRICE_RANGES.slice(1).map((range, i) => {
                  const isActive = filters.priceMin === range.min && filters.priceMax === range.max;
                  return (
                    <button
                      key={i}
                      onClick={() => handlePriceRange(
                        isActive ? undefined : range.min,
                        isActive ? undefined : range.max
                      )}
                      className={clsx(
                        'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0',
                        isActive
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-text-secondary'
                      )}
                    >
                      {range.label}
                    </button>
                  );
                })}
                {AREA_RANGES.slice(1).map((range, i) => {
                  const isActive = filters.areaMin === range.min && filters.areaMax === range.max;
                  return (
                    <button
                      key={`a${i}`}
                      onClick={() => handleAreaRange(
                        isActive ? undefined : range.min,
                        isActive ? undefined : range.max
                      )}
                      className={clsx(
                        'px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all shrink-0',
                        isActive
                          ? 'bg-zinc-900 text-white'
                          : 'bg-zinc-100 text-text-secondary'
                      )}
                    >
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Scrollable card list */}
            <div className="flex-1 overflow-y-auto">
              {sidebarPlots.length > 0 ? (
                sidebarPlots.map((plot) => (
                  <PlotCard
                    key={plot.slug}
                    plot={plot}
                    compact
                    isHighlighted={plot.slug === highlightedSlug}
                    onHover={handlePlotHover}
                    onClick={handleSidebarPlotClick}
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <Icon name="mapPin" size="lg" className="text-text-muted mx-auto mb-3" />
                  <p className="text-text-secondary text-sm">Brak działek dla wybranych filtrów.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
