'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import { useRouter } from 'next/navigation';
import type { Plot, PlotFilters, PlotSortBy, PlotSource } from '@/data/plots/types';
import { plotSources } from '@/data/plots/types';
import { filterAndSortPlots, slugifyCity } from '@/data/plots';
import type { PlotFAQItem } from '@/data/plots/seo';
import { PlotCard } from './PlotCard';
import { LocationSearch, type LocationSelection } from './LocationSearch';
import type { PlotMapHandle } from './PlotMap';
import { LOCATIONS, getLocationCities, getLocationDistricts } from '@/data/plots/locations';
import { FilterDropdown } from './FilterDropdown';
import { PlotsFAQ } from './PlotsFAQ';
import { PlotsSeoContent } from './PlotsSeoContent';
import { PlotsInterlinking } from './PlotsInterlinking';

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

const PLOTS_PER_PAGE = 24;

const PRICE_RANGES = [
  { label: 'Wszystkie ceny', min: undefined, max: undefined },
  { label: 'do 150 tys.', min: undefined, max: 150000 },
  { label: '150–300 tys.', min: 150000, max: 300000 },
  { label: '300–500 tys.', min: 300000, max: 500000 },
  { label: '500 tys.+', min: 500000, max: undefined },
];

const AREA_RANGES = [
  { label: 'Każda pow.', min: undefined, max: undefined },
  { label: 'do 800 m²', min: undefined, max: 800 },
  { label: '800–1500 m²', min: 800, max: 1500 },
  { label: '1500–3000 m²', min: 1500, max: 3000 },
  { label: '3000+ m²', min: 3000, max: undefined },
];

const SORT_OPTIONS: { id: PlotSortBy; label: string }[] = [
  { id: 'mixed', label: 'Polecane' },
  { id: 'newest', label: 'Najnowsze' },
  { id: 'price-asc', label: 'Cena rosnąco' },
  { id: 'price-desc', label: 'Cena malejąco' },
  { id: 'area-asc', label: 'Powierzchnia rosnąco' },
  { id: 'area-desc', label: 'Powierzchnia malejąco' },
];

const SOURCE_OPTIONS: { id: PlotSource | 'all'; label: string }[] = [
  { id: 'all', label: 'Wszystkie biura' },
  ...plotSources.map((s) => ({ id: s.id, label: s.label })),
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
    sortBy: 'mixed',
  });
  const [page, setPage] = useState(1);
  const [highlightedSlug, setHighlightedSlug] = useState<string | null>(null);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  /** Slugs visible in map viewport — null means show all (no map-based filter) */
  const [mapVisibleSlugs, setMapVisibleSlugs] = useState<string[] | null>(null);

  const fullscreenMapHandleRef = useRef<PlotMapHandle>(null);
  const listingRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const dragStartY = useRef<number | null>(null);
  const dragCurrentY = useRef<number>(0);

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

  // Filter & sort plots — also filter by selected location in fullscreen map
  const filteredPlots = useMemo(() => {
    let base = filterAndSortPlots(plots, filters);

    // When a location is selected (fullscreen map or search without subpage nav), filter by cities/districts
    if (locationSelection) {
      const citySet = new Set(locationSelection.cities);
      const districts = locationSelection.districts;
      base = base.filter((p) => {
        if (!citySet.has(p.city)) return false;
        // For miejscowosc-level: also check district
        if (districts && districts.length > 0) {
          return p.district ? districts.includes(p.district) : false;
        }
        return true;
      });
    }

    return base;
  }, [plots, filters, locationSelection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filteredPlots.length / PLOTS_PER_PAGE));
  const paginatedPlots = useMemo(() => {
    const start = (page - 1) * PLOTS_PER_PAGE;
    return filteredPlots.slice(start, start + PLOTS_PER_PAGE);
  }, [filteredPlots, page]);

  // Reset page when filters change
  useEffect(() => { setPage(1); }, [filters]);

  // Sidebar plots in fullscreen: filtered by map viewport
  const sidebarPlots = useMemo(() => {
    if (!mapVisibleSlugs) return filteredPlots;
    const slugSet = new Set(mapVisibleSlugs);
    return filteredPlots.filter((p) => slugSet.has(p.slug));
  }, [filteredPlots, mapVisibleSlugs]);

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
  }, []);

  const handleSourceChange = useCallback((source: PlotSource | undefined) => {
    setFilters((prev) => ({ ...prev, source }));
  }, []);

  const handlePlotHover = useCallback((slug: string | null) => {
    setHighlightedSlug(slug);
  }, []);

  const handlePlotClick = useCallback((_slug: string) => {
    // Future: navigate to plot detail or show preview
  }, []);

  const handleVisiblePlotsChange = useCallback((slugs: string[]) => {
    setMapVisibleSlugs(slugs);
  }, []);

  const handleSidebarPlotClick = useCallback((slug: string) => {
    setHighlightedSlug(slug);
    fullscreenMapHandleRef.current?.focusPlot(slug);
    setMobileDrawerOpen(false);
  }, []);

  const handlePageChange = useCallback((newPage: number) => {
    setPage(newPage);
    listingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  // Active dropdown indices
  const activePriceIdx = PRICE_RANGES.findIndex((r) => r.min === filters.priceMin && r.max === filters.priceMax);
  const activeAreaIdx = AREA_RANGES.findIndex((r) => r.min === filters.areaMin && r.max === filters.areaMax);
  const activeSortIdx = SORT_OPTIONS.findIndex((o) => o.id === filters.sortBy);
  const activeSourceIdx = SOURCE_OPTIONS.findIndex((o) => o.id === (filters.source || 'all'));

  return (
    <>
      <section className="pt-6 pb-16 md:pt-8 md:pb-24 bg-background-beige min-h-screen">
        <div className="container mx-auto px-4 md:px-6">

          {/* ── Header ── */}
          <div className="max-w-3xl mb-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-primary mb-4">
              {h1}{' '}
              <span className="text-primary">{h1Highlight}</span>
            </h1>
            <p className="text-lg md:text-xl text-text-secondary leading-relaxed">
              {description}
            </p>
          </div>

          {/* ── Toolbar ── */}
          <div className="relative z-30 flex flex-col gap-3 mb-6">
            {/* Row 1: Location search + map button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
              <LocationSearch
                value={locationSelection}
                onChange={handleLocationChange}
                navigateToSubpage
                popularSlugs={topCitySlugs}
                placeholder="Wpisz miasto, np. Wodzisław Śląski, Rybnik..."
                className="flex-1 max-w-xl"
              />

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsFullscreen(true)}
                  className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-white text-text-primary border border-zinc-200 hover:border-primary hover:text-primary transition-all shrink-0"
                >
                  <Icon name="map" size="sm" />
                  Mapa
                </button>

                {activeCity && (
                  <button
                    onClick={() => router.push('/dzialki')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold bg-zinc-100 text-text-primary hover:bg-zinc-200 transition-all shrink-0"
                  >
                    <Icon name="x" size="sm" />
                    Usuń filtry
                  </button>
                )}
              </div>
            </div>

            {/* Row 2: Filter dropdowns */}
            <div className="flex flex-wrap items-center gap-2">
              <FilterDropdown
                label="Cena"
                options={PRICE_RANGES.map((r) => ({ label: r.label }))}
                activeIndex={activePriceIdx >= 0 ? activePriceIdx : 0}
                onSelect={(i) => handlePriceRange(PRICE_RANGES[i].min, PRICE_RANGES[i].max)}
              />

              <FilterDropdown
                label="Powierzchnia"
                options={AREA_RANGES.map((r) => ({ label: r.label }))}
                activeIndex={activeAreaIdx >= 0 ? activeAreaIdx : 0}
                onSelect={(i) => handleAreaRange(AREA_RANGES[i].min, AREA_RANGES[i].max)}
              />

              <FilterDropdown
                label="Biuro"
                options={SOURCE_OPTIONS.map((s) => ({ label: s.label }))}
                activeIndex={activeSourceIdx >= 0 ? activeSourceIdx : 0}
                onSelect={(i) => {
                  const src = SOURCE_OPTIONS[i].id;
                  handleSourceChange(src === 'all' ? undefined : src as PlotSource);
                }}
              />

              {/* Sort — pushed to the right */}
              <div className="ml-auto">
                <FilterDropdown
                  label="Sortowanie"
                  options={SORT_OPTIONS.map((s) => ({ label: s.label }))}
                  activeIndex={activeSortIdx >= 0 ? activeSortIdx : 0}
                  onSelect={(i) => handleSortChange(SORT_OPTIONS[i].id)}
                  align="right"
                />
              </div>
            </div>
          </div>

          {/* ── Breadcrumbs ── */}
          <nav aria-label="Breadcrumb" className="mb-4 overflow-x-auto scrollbar-hide">
            <ol className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm whitespace-nowrap">
              {(customBreadcrumbs ?? breadcrumbs).map((crumb, index) => (
                <li key={index} className="flex items-center gap-1.5 sm:gap-2 shrink-0">
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
          <div ref={listingRef}>
            {/* Result count */}
            <p className="text-sm text-text-muted mb-4">
              {filteredPlots.length} {filteredPlots.length === 1 ? 'działka' : filteredPlots.length < 5 ? 'działki' : 'działek'}
              {totalPages > 1 && (
                <span> &middot; strona {page} z {totalPages}</span>
              )}
            </p>
            {paginatedPlots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedPlots.map((plot, index) => (
                  <PlotCard
                    key={plot.slug}
                    plot={plot}
                    isHighlighted={plot.slug === highlightedSlug}
                    onHover={handlePlotHover}
                    inView={true}
                    delay={index < 6 ? 0.1 + index * 0.05 : 0}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Icon name="mapPin" size="xl" className="text-text-muted mx-auto mb-4" />
                <p className="text-text-secondary text-lg">Brak działek dla wybranych filtrów.</p>
              </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page <= 1}
                  className={clsx(
                    'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
                    page <= 1
                      ? 'text-zinc-300 cursor-not-allowed'
                      : 'text-text-secondary hover:bg-zinc-100'
                  )}
                >
                  <Icon name="chevronLeft" size="sm" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((p) => p === 1 || p === totalPages || Math.abs(p - page) <= 2)
                  .reduce<(number | 'dots')[]>((acc, p, i, arr) => {
                    if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push('dots');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, i) =>
                    item === 'dots' ? (
                      <span key={`dots-${i}`} className="px-1 text-text-muted">...</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => handlePageChange(item as number)}
                        className={clsx(
                          'w-10 h-10 rounded-lg text-sm font-medium transition-all',
                          page === item
                            ? 'bg-zinc-900 text-white'
                            : 'text-text-secondary hover:bg-zinc-100'
                        )}
                      >
                        {item}
                      </button>
                    )
                  )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page >= totalPages}
                  className={clsx(
                    'w-10 h-10 rounded-lg flex items-center justify-center transition-all',
                    page >= totalPages
                      ? 'text-zinc-300 cursor-not-allowed'
                      : 'text-text-secondary hover:bg-zinc-100'
                  )}
                >
                  <Icon name="chevronRight" size="sm" />
                </button>
              </div>
            )}
          </div>

          {/* ── FAQ Section ── */}
          {faq && faq.length > 0 && <PlotsFAQ faq={faq} />}

          {/* ── SEO Content ── */}
          {seoContent && <PlotsSeoContent content={seoContent} />}

          {/* ── Interlinking — related locations ── */}
          {activeCity && <PlotsInterlinking activeCity={activeCity} />}

        </div>
      </section>

      {/* ── Fullscreen Map Overlay ── */}
      {isFullscreen && (
        <div className="fixed inset-0 z-[1000] bg-white flex flex-col">
          {/* Fullscreen toolbar */}
          <div className="shrink-0 border-b border-zinc-200 bg-white px-4 py-3 relative z-[1200]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => { setIsFullscreen(false); setMapVisibleSlugs(null); }}
                className="w-9 h-9 rounded-lg bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors shrink-0"
                title="Zamknij (Escape)"
              >
                <Icon name="x" size="sm" className="text-zinc-600" />
              </button>

              <LocationSearch
                value={locationSelection}
                onChange={handleLocationChange}
                popularSlugs={topCitySlugs}
                placeholder="Wpisz miasto..."
                className="w-72 md:w-96 shrink-0"
              />

              <div className="hidden md:flex items-center gap-1.5">
                <FilterDropdown
                  label="Cena"
                  options={PRICE_RANGES.map((r) => ({ label: r.label }))}
                  activeIndex={activePriceIdx >= 0 ? activePriceIdx : 0}
                  onSelect={(i) => handlePriceRange(PRICE_RANGES[i].min, PRICE_RANGES[i].max)}
                />
                <FilterDropdown
                  label="Powierzchnia"
                  options={AREA_RANGES.map((r) => ({ label: r.label }))}
                  activeIndex={activeAreaIdx >= 0 ? activeAreaIdx : 0}
                  onSelect={(i) => handleAreaRange(AREA_RANGES[i].min, AREA_RANGES[i].max)}
                />
                <FilterDropdown
                  label="Biuro"
                  options={SOURCE_OPTIONS.map((s) => ({ label: s.label }))}
                  activeIndex={activeSourceIdx >= 0 ? activeSourceIdx : 0}
                  onSelect={(i) => {
                    const src = SOURCE_OPTIONS[i].id;
                    handleSourceChange(src === 'all' ? undefined : src as PlotSource);
                  }}
                />
              </div>

              <div className="relative hidden md:block ml-auto">
                <FilterDropdown
                  label="Sortowanie"
                  options={SORT_OPTIONS.map((s) => ({ label: s.label }))}
                  activeIndex={activeSortIdx >= 0 ? activeSortIdx : 0}
                  onSelect={(i) => handleSortChange(SORT_OPTIONS[i].id)}
                  align="right"
                />
              </div>
            </div>
          </div>

          {/* Fullscreen content — sidebar + map */}
          <div className="flex-1 flex overflow-hidden">
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

      {/* ── Floating "Pokaż na mapie" button ── */}
      {!isFullscreen && (
        <button
          onClick={() => setIsFullscreen(true)}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[500] bg-zinc-900 hover:bg-zinc-800 text-white pl-5 pr-6 py-3.5 rounded-full shadow-xl shadow-black/20 flex items-center gap-2.5 transition-all duration-300 hover:scale-105 group"
        >
          <Icon name="map" size="sm" className="text-primary" />
          <span className="text-sm font-bold">Pokaż na mapie</span>
        </button>
      )}

      {/* ── Mobile Bottom Drawer (swipe-to-dismiss) ── */}
      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-[1200] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileDrawerOpen(false)}
          />

          <div
            ref={drawerRef}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-2xl max-h-[75vh] flex flex-col animate-slide-up"
            onAnimationEnd={() => {
              // Remove CSS animation fill-mode so JS transform can take over
              if (drawerRef.current) {
                drawerRef.current.style.animation = 'none';
                drawerRef.current.style.transform = 'translateY(0)';
              }
            }}
          >
            {/* Drag handle — swipe zone */}
            <div
              className="sticky top-0 bg-white rounded-t-3xl z-30 pt-3 pb-2 px-5 border-b border-zinc-100"
              style={{ touchAction: 'none' }}
              onTouchStart={(e) => {
                const touch = e.touches[0];
                dragStartY.current = touch.clientY;
                dragCurrentY.current = 0;
              }}
              onTouchMove={(e) => {
                if (dragStartY.current === null) return;
                const touch = e.touches[0];
                const dy = touch.clientY - dragStartY.current;
                if (dy < 0) {
                  dragCurrentY.current = 0;
                  if (drawerRef.current) drawerRef.current.style.transform = 'translateY(0)';
                  return;
                }
                dragCurrentY.current = dy;
                if (drawerRef.current) {
                  drawerRef.current.style.transform = `translateY(${dy}px)`;
                  drawerRef.current.style.transition = 'none';
                }
              }}
              onTouchEnd={() => {
                if (dragStartY.current === null) return;
                const dy = dragCurrentY.current;
                dragStartY.current = null;
                dragCurrentY.current = 0;
                if (dy > 100) {
                  if (drawerRef.current) {
                    drawerRef.current.style.transition = 'transform 0.25s ease-out';
                    drawerRef.current.style.transform = 'translateY(100%)';
                  }
                  setTimeout(() => setMobileDrawerOpen(false), 250);
                } else {
                  if (drawerRef.current) {
                    drawerRef.current.style.transition = 'transform 0.2s ease-out';
                    drawerRef.current.style.transform = 'translateY(0)';
                  }
                }
              }}
            >
              <div className="w-10 h-1.5 rounded-full bg-zinc-300 mx-auto mb-3 cursor-grab" />
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

              <div className="flex gap-1.5 mt-3 flex-wrap pb-2">
                <FilterDropdown
                  label="Cena"
                  options={PRICE_RANGES.map((r) => ({ label: r.label }))}
                  activeIndex={activePriceIdx >= 0 ? activePriceIdx : 0}
                  onSelect={(i) => handlePriceRange(PRICE_RANGES[i].min, PRICE_RANGES[i].max)}
                />
                <FilterDropdown
                  label="Powierzchnia"
                  options={AREA_RANGES.map((r) => ({ label: r.label }))}
                  activeIndex={activeAreaIdx >= 0 ? activeAreaIdx : 0}
                  onSelect={(i) => handleAreaRange(AREA_RANGES[i].min, AREA_RANGES[i].max)}
                />
                <FilterDropdown
                  label="Biuro"
                  options={SOURCE_OPTIONS.map((s) => ({ label: s.label }))}
                  activeIndex={activeSourceIdx >= 0 ? activeSourceIdx : 0}
                  onSelect={(i) => {
                    const src = SOURCE_OPTIONS[i].id;
                    handleSourceChange(src === 'all' ? undefined : src as PlotSource);
                  }}
                />
                <FilterDropdown
                  label="Sortuj"
                  options={SORT_OPTIONS.map((s) => ({ label: s.label }))}
                  activeIndex={activeSortIdx >= 0 ? activeSortIdx : 0}
                  onSelect={(i) => handleSortChange(SORT_OPTIONS[i].id)}
                />
              </div>
            </div>

            <div
              className="flex-1 overflow-y-auto relative z-10"
              data-drawer-scroll
              onTouchStart={(e) => {
                const el = e.currentTarget;
                if (el.scrollTop <= 0) {
                  dragStartY.current = e.touches[0].clientY;
                  dragCurrentY.current = 0;
                }
              }}
              onTouchMove={(e) => {
                if (dragStartY.current === null) return;
                const dy = e.touches[0].clientY - dragStartY.current;
                if (dy < 0) {
                  // Scrolling up — release drag, let native scroll handle it
                  dragStartY.current = null;
                  dragCurrentY.current = 0;
                  return;
                }
                // Prevent native scroll while dragging drawer down
                e.preventDefault();
                dragCurrentY.current = dy;
                if (drawerRef.current) {
                  drawerRef.current.style.transform = `translateY(${dy}px)`;
                  drawerRef.current.style.transition = 'none';
                }
              }}
              onTouchEnd={() => {
                if (dragStartY.current === null) return;
                const dy = dragCurrentY.current;
                dragStartY.current = null;
                dragCurrentY.current = 0;
                if (dy > 100) {
                  if (drawerRef.current) {
                    drawerRef.current.style.transition = 'transform 0.25s ease-out';
                    drawerRef.current.style.transform = 'translateY(100%)';
                  }
                  setTimeout(() => setMobileDrawerOpen(false), 250);
                } else if (dy > 0) {
                  if (drawerRef.current) {
                    drawerRef.current.style.transition = 'transform 0.2s ease-out';
                    drawerRef.current.style.transform = 'translateY(0)';
                  }
                }
              }}
            >
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
