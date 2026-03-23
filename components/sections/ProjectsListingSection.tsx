'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { Icon, SectionLabel } from '@/components/ui';
import { ProjectListingCard } from '@/components/shared/ProjectListingCard';
import { ProjectFilterSidebar } from '@/components/shared/ProjectFilterSidebar';
import { MobileFilterDrawer } from '@/components/shared/MobileFilterDrawer';
import { useToggle } from '@/hooks/useToggle';
import {
  filterProjects,
  sortProjects,
  countProjectsByFilter,
  projectCategories,
  projectTechnologies,
  projectSources,
  garageOptions,
  sortOptions,
  type ProjectListingItem,
  type ProjectFilters,
  type SortOption,
} from '@/data/projects';

const PROJECTS_PER_PAGE = 24;

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface ProjectsListingSectionProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  titleHighlight?: string;
  description: string;
  projects: ProjectListingItem[];
  initialFilters?: ProjectFilters;
  initialSort?: SortOption;
  initialPage?: number;
}

/**
 * Buduje URL z aktualnymi filtrami/sortem/stroną.
 * Pomija wartości domyślne (sort=newest, page=1) dla czystszych URLi.
 */
function buildUrl(
  pathname: string,
  filters: ProjectFilters,
  sortBy: SortOption,
  page: number,
  search?: string
): string {
  const params = new URLSearchParams();

  if (search)                     params.set('q',          search);
  if (filters.technology.length)  params.set('technology', filters.technology.join(','));
  if (filters.category.length)    params.set('category',   filters.category.join(','));
  if (filters.source.length)      params.set('source',     filters.source.join(','));
  if (filters.garage.length)      params.set('garage',     filters.garage.join(','));
  if (filters.surfaceRange)       params.set('surface',    filters.surfaceRange);
  if (sortBy !== 'mixed')         params.set('sort',       sortBy);   // default pominięty
  if (page > 1)                   params.set('page',       String(page)); // page=1 pominięta

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
}

/** Parsuje wartość query param → string[] */
function parseList(value: string | null): string[] {
  if (!value) return [];
  return value.split(',').filter(Boolean);
}

/** Czyta filtry/sort/page z searchParams (klient) */
function parseFiltersFromURL(sp: URLSearchParams): {
  filters: ProjectFilters;
  sort: SortOption;
  page: number;
} {
  return {
    filters: {
      technology: parseList(sp.get('technology')) as ProjectFilters['technology'],
      category:   parseList(sp.get('category'))   as ProjectFilters['category'],
      source:     parseList(sp.get('source'))      as ProjectFilters['source'],
      garage:     parseList(sp.get('garage'))       as ProjectFilters['garage'],
      surfaceRange: sp.get('surface') || null,
    },
    sort: (sp.get('sort') || 'mixed') as SortOption,
    page: Math.max(1, parseInt(sp.get('page') || '1', 10)),
  };
}

export function ProjectsListingSection({
  breadcrumbs,
  title,
  titleHighlight,
  description,
  projects,
  initialFilters,
  initialSort   = 'mixed',
  initialPage   = 1,
}: ProjectsListingSectionProps) {
  const router   = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Czytaj filtry z URL (klient) lub z props (server)
  const urlState = useMemo(() => {
    if (searchParams && searchParams.toString()) {
      return parseFiltersFromURL(searchParams);
    }
    return null;
  }, [searchParams]);

  const [filters, setFilters] = useState<ProjectFilters>(
    urlState?.filters ?? initialFilters ?? { technology: [], category: [], surfaceRange: null, source: [], garage: [] }
  );
  const [sortBy, setSortBy] = useState<SortOption>(urlState?.sort ?? initialSort);
  const [currentPage, setCurrentPage] = useState(urlState?.page ?? initialPage);
  const [searchQuery, setSearchQuery] = useState(searchParams?.get('q') ?? '');
  const [isMobileFilterOpen, , setIsMobileFilterOpen] = useToggle(false);
  const [isSortDropdownOpen, toggleSortDropdown, setIsSortDropdownOpen] = useToggle(false);

  // Debounced URL sync for search (avoid spamming router on every keystroke)
  const searchTimerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Ref do scrollowania na górę gridu przy zmianie strony
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Search — reset strony + debounced URL sync
  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
    clearTimeout(searchTimerRef.current);
    searchTimerRef.current = setTimeout(() => {
      router.replace(buildUrl(pathname, filters, sortBy, 1, value.trim()), { scroll: false });
    }, 300);
  }, [filters, sortBy, pathname, router]);

  // Filtry — reset strony + sync URL
  const handleFiltersChange = useCallback((newFilters: ProjectFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    router.replace(buildUrl(pathname, newFilters, sortBy, 1, searchQuery.trim()), { scroll: false });
  }, [sortBy, searchQuery, pathname, router]);

  // Sort — reset strony + sync URL
  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
    router.replace(buildUrl(pathname, filters, newSort, 1, searchQuery.trim()), { scroll: false });
  }, [filters, searchQuery, pathname, router]);

  // Strona — scroll do góry + sync URL
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    router.replace(buildUrl(pathname, filters, sortBy, page, searchQuery.trim()), { scroll: false });
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filters, sortBy, searchQuery, pathname, router]);

  // Pełny reset — jeden router.replace zamiast dwóch (brak stale closure)
  const handleReset = useCallback(() => {
    const empty: ProjectFilters = { technology: [], category: [], surfaceRange: null, source: [], garage: [] };
    setFilters(empty);
    setSortBy('mixed');
    setSearchQuery('');
    setCurrentPage(1);
    router.replace(pathname, { scroll: false }); // czyste URL bez parametrów
  }, [pathname, router]);

  // Aktualnie wybrana opcja sortowania
  const currentSortOption = sortOptions.find(opt => opt.id === sortBy);

  // Scroll-triggered animations — threshold: 0 bo sekcja z 300+ kartami jest olbrzymia
  const { ref, inView } = useInView({
    threshold: 0,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  // Filtrowanie i sortowanie projektów (+ wyszukiwanie po nazwie)
  const filteredProjects = useMemo(() => {
    let result = filterProjects(projects, filters);

    // Wyszukiwanie — case-insensitive match na title lub id
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(q) || p.id.toLowerCase().includes(q)
      );
    }

    return sortProjects(result, sortBy);
  }, [projects, filters, sortBy, searchQuery]);

  // Paginacja
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const paginatedProjects = useMemo(() => {
    const start = (currentPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, currentPage]);

  // Liczniki dla filtrów (zawsze na podstawie WSZYSTKICH projektów)
  const projectCounts = useMemo(() => ({
    technology: Object.fromEntries(
      projectTechnologies.map(t => [t.id, countProjectsByFilter(projects, 'technology', t.id)])
    ),
    category: Object.fromEntries(
      projectCategories.map(c => [c.id, countProjectsByFilter(projects, 'category', c.id)])
    ),
    source: Object.fromEntries(
      projectSources.map(s => [s.id, countProjectsByFilter(projects, 'source', s.id)])
    ),
    garage: Object.fromEntries(
      garageOptions.map(g => [g.id, countProjectsByFilter(projects, 'garage', g.id)])
    ),
  }), [projects]);

  // Licznik aktywnych filtrów (dla mobile button)
  const activeFiltersCount =
    filters.technology.length +
    filters.category.length +
    filters.source.length +
    filters.garage.length +
    (filters.surfaceRange ? 1 : 0);

  // Generowanie numerów stron do wyświetlenia (max 7 pozycji z wielokropkami)
  const pageNumbers = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | 'dots')[] = [1];

    if (currentPage > 3) pages.push('dots');

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);

    if (currentPage < totalPages - 2) pages.push('dots');

    pages.push(totalPages);
    return pages;
  }, [totalPages, currentPage]);

  return (
    <section
      ref={ref}
      className="pt-6 pb-16 md:pt-8 md:pb-24 bg-background-beige"
    >
      <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-[96rem]">
        {/* Breadcrumbs */}
        <nav
          className={clsx(
            'mb-6',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
        >
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

        {/* Header */}
        <div
          className={clsx(
            'mb-8 md:mb-12 max-w-3xl',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.15s' }}
        >
          <SectionLabel className="mb-4">PROJEKTY DOMÓW</SectionLabel>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-4">
            {title}{' '}
            {titleHighlight && (
              <span className="text-primary">{titleHighlight}</span>
            )}
          </h1>
          <p className="text-base md:text-lg text-text-secondary">
            {description}
          </p>
        </div>

        {/* Mobile: Search + Filter + Sorting */}
        <div
          className={clsx(
            'lg:hidden mb-6 flex flex-col gap-3',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.2s' }}
        >
          {/* Mobile Search */}
          <div className="relative">
            <Icon name="search" size="sm" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => handleSearchChange(e.target.value)}
              placeholder="Szukaj projektu po nazwie..."
              className="w-full py-3 pl-10 pr-9 bg-white rounded-xl border border-zinc-200 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => handleSearchChange('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                aria-label="Wyczyść wyszukiwanie"
              >
                <Icon name="x" size="sm" />
              </button>
            )}
          </div>

          {/* Mobile Filter + Sort row */}
          <div className="flex gap-3">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-white rounded-xl border border-zinc-200 text-sm font-medium text-text-primary hover:border-primary transition-colors"
              aria-expanded={isMobileFilterOpen}
            >
              <Icon name="filter" size="sm" />
              Filtry
              {activeFiltersCount > 0 && (
                <span className="bg-primary text-white text-xs font-bold px-2 py-0.5 rounded-full ml-1">
                  {activeFiltersCount}
                </span>
              )}
            </button>
            {/* Mobile Sort Dropdown */}
            <div className="relative">
              <button
                onClick={toggleSortDropdown}
                className="flex items-center gap-2 py-3 px-4 bg-white rounded-xl border border-zinc-200 text-sm font-medium text-text-primary hover:border-primary transition-colors"
              >
                <Icon name="arrowUpDown" size="sm" />
                <span className="hidden sm:inline">{currentSortOption?.label}</span>
                <Icon name={isSortDropdownOpen ? 'chevronUp' : 'chevronDown'} size="sm" />
              </button>
              {isSortDropdownOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-lg border border-zinc-200 py-2 z-30">
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        handleSortChange(option.id as SortOption);
                        setIsSortDropdownOpen(false);
                      }}
                      className={clsx(
                        'w-full text-left px-4 py-2 text-sm transition-colors',
                        sortBy === option.id
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-text-secondary hover:bg-zinc-50'
                      )}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Main Grid: Sidebar + Projects */}
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Sidebar (hidden on mobile) */}
          <aside className="hidden lg:block">
            <ProjectFilterSidebar
              filters={filters}
              onFiltersChange={handleFiltersChange}
              projectCounts={projectCounts}
              totalResults={filteredProjects.length}
              inView={inView}
            />
          </aside>

          {/* Projects Grid */}
          <div ref={gridTopRef} className="scroll-mt-6">
            {/* Desktop Search + Sort row */}
            <div
              className={clsx(
                'hidden lg:flex items-center justify-between gap-4 mb-6 relative z-40',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.25s' }}
            >
              {/* Search input */}
              <div className="relative w-72">
                <Icon name="search" size="sm" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => handleSearchChange(e.target.value)}
                  placeholder="Szukaj projektu po nazwie..."
                  className="w-full py-2.5 pl-10 pr-9 bg-white rounded-xl border border-zinc-200 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/30 transition-colors shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => handleSearchChange('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                    aria-label="Wyczyść wyszukiwanie"
                  >
                    <Icon name="x" size="sm" />
                  </button>
                )}
              </div>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={toggleSortDropdown}
                  className="flex items-center gap-2 py-2.5 px-4 bg-white rounded-xl border border-zinc-200 text-sm font-medium text-text-primary hover:border-primary transition-colors shadow-sm"
                >
                  <Icon name="arrowUpDown" size="sm" />
                  Sortuj: {currentSortOption?.label}
                  <Icon name={isSortDropdownOpen ? 'chevronUp' : 'chevronDown'} size="sm" />
                </button>
                {isSortDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-xl shadow-xl border border-zinc-200 py-2 z-50">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        onClick={() => {
                          handleSortChange(option.id as SortOption);
                          setIsSortDropdownOpen(false);
                        }}
                        className={clsx(
                          'w-full text-left px-4 py-2.5 text-sm transition-colors',
                          sortBy === option.id
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'text-text-secondary hover:bg-zinc-50'
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {filteredProjects.length === 0 ? (
              /* Empty State */
              <div
                className={clsx(
                  'bg-white rounded-3xl p-12 text-center',
                  inView ? 'animate-fade-in-up' : 'opacity-0'
                )}
                style={{ animationDelay: '0.3s' }}
              >
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-zinc-100 flex items-center justify-center">
                  <Icon name="search" size="lg" className="text-text-muted" />
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-2">
                  Brak wyników
                </h3>
                <p className="text-text-secondary mb-6">
                  {searchQuery.trim()
                    ? `Nie znaleziono projektów dla „${searchQuery.trim()}".`
                    : 'Nie znaleziono projektów spełniających wybrane kryteria.'}
                </p>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                >
                  <Icon name="refreshCw" size="sm" />
                  Resetuj filtry
                </button>
              </div>
            ) : (
              /* Projects Grid + Paginacja */
              <>
                {/* Licznik wyników + info o stronie */}
                <div
                  className={clsx(
                    'flex items-center justify-between mb-4',
                    inView ? 'animate-fade-in-up' : 'opacity-0'
                  )}
                  style={{ animationDelay: '0.25s' }}
                >
                  <p className="text-sm text-text-muted">
                    {filteredProjects.length} {filteredProjects.length === 1 ? 'projekt' : filteredProjects.length < 5 ? 'projekty' : 'projektów'}
                    {totalPages > 1 && (
                      <span> · Strona {currentPage} z {totalPages}</span>
                    )}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {paginatedProjects.map((project, index) => (
                    <ProjectListingCard
                      key={project.slug}
                      slug={project.slug}
                      id={project.id}
                      title={project.title}
                      category={project.category}
                      technology={project.technology}
                      surfaceArea={project.surfaceArea}
                      estimatedBuildCost={project.estimatedBuildCost}
                      price={project.price}
                      thumbnailSrc={project.thumbnailSrc}
                      source={project.source}
                      inView={inView}
                      delay={index < 6 ? 0.3 + index * 0.08 : 0}
                      priority={currentPage === 1 && index < 3}
                    />
                  ))}
                </div>

                {/* Paginacja */}
                {totalPages > 1 && (
                  <nav aria-label="Paginacja projektów" className="flex items-center justify-center gap-1.5 mt-10">
                    {/* Poprzednia strona */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={clsx(
                        'flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200',
                        currentPage === 1
                          ? 'text-zinc-300 cursor-not-allowed'
                          : 'text-text-secondary bg-white border border-zinc-200 hover:border-primary hover:text-primary shadow-sm'
                      )}
                      aria-label="Poprzednia strona"
                    >
                      <Icon name="chevronLeft" size="sm" />
                    </button>

                    {/* Numery stron */}
                    {pageNumbers.map((page, idx) =>
                      page === 'dots' ? (
                        <span key={`dots-${idx}`} className="w-10 h-10 flex items-center justify-center text-text-muted text-sm">
                          …
                        </span>
                      ) : (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={clsx(
                            'flex items-center justify-center w-10 h-10 rounded-xl text-sm font-semibold transition-all duration-200',
                            currentPage === page
                              ? 'bg-primary text-white shadow-lg shadow-primary/25'
                              : 'text-text-secondary bg-white border border-zinc-200 hover:border-primary hover:text-primary shadow-sm'
                          )}
                          aria-label={`Strona ${page}`}
                          aria-current={currentPage === page ? 'page' : undefined}
                        >
                          {page}
                        </button>
                      )
                    )}

                    {/* Następna strona */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={clsx(
                        'flex items-center justify-center w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200',
                        currentPage === totalPages
                          ? 'text-zinc-300 cursor-not-allowed'
                          : 'text-text-secondary bg-white border border-zinc-200 hover:border-primary hover:text-primary shadow-sm'
                      )}
                      aria-label="Następna strona"
                    >
                      <Icon name="chevronRight" size="sm" />
                    </button>
                  </nav>
                )}
              </>
            )}
          </div>
        </div>

        {/* CTA — Kalkulator wyceny (dwukolumnowy, styl ContactCTA) */}
        <div className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Left: Content */}
            <div
              className={clsx(
                'bg-zinc-900 rounded-2xl overflow-hidden',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.5s' }}
            >
              <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
                <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">
                  Kalkulator Budowy
                </span>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4">
                  ILE KOSZTUJE
                  <br />
                  <span className="text-primary">BUDOWA?</span>
                </h3>
                <p className="text-zinc-400 text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-xl leading-relaxed">
                  Skonfiguruj parametry domu i otrzymaj{' '}
                  <strong className="text-white">szczegółowy kosztorys budowy</strong> w 60 sekund.
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
                <div>
                  <Link
                    href="/wycena"
                    className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider"
                  >
                    Oblicz koszt budowy
                    <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                      <Icon name="arrowRight" className="text-white" size="sm" />
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right: Image */}
            <div
              className={clsx(
                'relative min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.65s' }}
            >
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
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        projectCounts={projectCounts}
        totalResults={filteredProjects.length}
      />

      {/* Click outside to close sort dropdown */}
      {isSortDropdownOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setIsSortDropdownOpen(false)}
        />
      )}
    </section>
  );
}
