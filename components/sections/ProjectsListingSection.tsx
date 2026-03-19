'use client';

import React, { useState, useMemo, useCallback, useRef } from 'react';
import Link from 'next/link';
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
  page: number
): string {
  const params = new URLSearchParams();

  if (filters.technology.length)  params.set('technology', filters.technology.join(','));
  if (filters.category.length)    params.set('category',   filters.category.join(','));
  if (filters.source.length)      params.set('source',     filters.source.join(','));
  if (filters.surfaceRange)       params.set('surface',    filters.surfaceRange);
  if (sortBy !== 'newest')        params.set('sort',       sortBy);   // default pominięty
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
      surfaceRange: sp.get('surface') || null,
    },
    sort: (sp.get('sort') || 'newest') as SortOption,
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
  initialSort   = 'newest',
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
    urlState?.filters ?? initialFilters ?? { technology: [], category: [], surfaceRange: null, source: [] }
  );
  const [sortBy, setSortBy] = useState<SortOption>(urlState?.sort ?? initialSort);
  const [currentPage, setCurrentPage] = useState(urlState?.page ?? initialPage);
  const [isMobileFilterOpen, toggleMobileFilter, setIsMobileFilterOpen] = useToggle(false);
  const [isSortDropdownOpen, toggleSortDropdown, setIsSortDropdownOpen] = useToggle(false);

  // Ref do scrollowania na górę gridu przy zmianie strony
  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filtry — reset strony + sync URL
  const handleFiltersChange = useCallback((newFilters: ProjectFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
    router.replace(buildUrl(pathname, newFilters, sortBy, 1), { scroll: false });
  }, [sortBy, pathname, router]);

  // Sort — reset strony + sync URL
  const handleSortChange = useCallback((newSort: SortOption) => {
    setSortBy(newSort);
    setCurrentPage(1);
    router.replace(buildUrl(pathname, filters, newSort, 1), { scroll: false });
  }, [filters, pathname, router]);

  // Strona — scroll do góry + sync URL
  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    router.replace(buildUrl(pathname, filters, sortBy, page), { scroll: false });
    gridTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [filters, sortBy, pathname, router]);

  // Pełny reset — jeden router.replace zamiast dwóch (brak stale closure)
  const handleReset = useCallback(() => {
    const empty: ProjectFilters = { technology: [], category: [], surfaceRange: null, source: [] };
    setFilters(empty);
    setSortBy('newest');
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

  // Filtrowanie i sortowanie projektów
  const filteredProjects = useMemo(() => {
    const filtered = filterProjects(projects, filters);
    return sortProjects(filtered, sortBy);
  }, [projects, filters, sortBy]);

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
  }), [projects]);

  // Licznik aktywnych filtrów (dla mobile button)
  const activeFiltersCount =
    filters.technology.length +
    filters.category.length +
    filters.source.length +
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

        {/* Mobile Filter Button + Sorting */}
        <div
          className={clsx(
            'lg:hidden mb-6 flex gap-3',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.2s' }}
        >
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
            {/* Desktop Sort Dropdown */}
            <div
              className={clsx(
                'hidden lg:flex justify-end mb-6 relative z-40',
                inView ? 'animate-fade-in-up' : 'opacity-0'
              )}
              style={{ animationDelay: '0.25s' }}
            >
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
                  Nie znaleziono projektów spełniających wybrane kryteria.
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

        {/* CTA Banner */}
        <div
          className={clsx(
            'mt-12 md:mt-16 bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.5s' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Nie znalazłeś odpowiedniego projektu?
              </h3>
              <p className="text-white/80">
                Skontaktuj się z nami - pomożemy dobrać projekt idealny dla Twoich potrzeb.
              </p>
            </div>
            <Link
              href="/kontakt"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-zinc-100 transition-colors"
            >
              Umów konsultację
              <Icon name="arrowRight" size="sm" />
            </Link>
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
