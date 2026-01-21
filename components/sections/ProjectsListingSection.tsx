'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import clsx from 'clsx';
import { Icon, SectionLabel } from '@/components/ui';
import { ProjectListingCard } from '@/components/shared/ProjectListingCard';
import { ProjectFilterSidebar } from '@/components/shared/ProjectFilterSidebar';
import { MobileFilterDrawer } from '@/components/shared/MobileFilterDrawer';
import {
  filterProjects,
  sortProjects,
  countProjectsByFilter,
  projectCategories,
  projectTechnologies,
  sortOptions,
  type Project,
  type ProjectFilters,
  type SortOption,
} from '@/data/projects';

export interface Breadcrumb {
  label: string;
  href?: string;
}

export interface ProjectsListingSectionProps {
  breadcrumbs: Breadcrumb[];
  title: string;
  titleHighlight?: string;
  description: string;
  projects: Project[];
}

export function ProjectsListingSection({
  breadcrumbs,
  title,
  titleHighlight,
  description,
  projects,
}: ProjectsListingSectionProps) {
  // Stan filtrów i sortowania
  const [filters, setFilters] = useState<ProjectFilters>({
    technology: [],
    category: [],
    budgetRange: null,
    surfaceRange: null,
  });
  const [sortBy, setSortBy] = useState<SortOption>('price-asc');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);

  // Aktualnie wybrana opcja sortowania
  const currentSortOption = sortOptions.find(opt => opt.id === sortBy);

  // Scroll-triggered animations
  const { ref, inView } = useInView({
    threshold: 0.05,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  // Filtrowanie i sortowanie projektów
  const filteredProjects = useMemo(() => {
    const filtered = filterProjects(projects, filters);
    return sortProjects(filtered, sortBy);
  }, [projects, filters, sortBy]);

  // Liczniki dla filtrów (zawsze na podstawie WSZYSTKICH projektów)
  const projectCounts = useMemo(() => ({
    technology: Object.fromEntries(
      projectTechnologies.map(t => [t.id, countProjectsByFilter(projects, 'technology', t.id)])
    ),
    category: Object.fromEntries(
      projectCategories.map(c => [c.id, countProjectsByFilter(projects, 'category', c.id)])
    ),
  }), [projects]);

  // Licznik aktywnych filtrów (dla mobile button)
  const activeFiltersCount =
    filters.technology.length +
    filters.category.length +
    (filters.budgetRange ? 1 : 0) +
    (filters.surfaceRange ? 1 : 0);

  return (
    <section
      ref={ref}
      className="pt-6 pb-16 md:pt-8 md:pb-24"
      style={{ backgroundColor: '#efebe7' }}
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
              onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
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
                      setSortBy(option.id as SortOption);
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
              onFiltersChange={setFilters}
              projectCounts={projectCounts}
              totalResults={filteredProjects.length}
              inView={inView}
            />
          </aside>

          {/* Projects Grid */}
          <div>
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
                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
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
                          setSortBy(option.id as SortOption);
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
                  onClick={() => {
                    setFilters({ technology: [], category: [], budgetRange: null, surfaceRange: null });
                    setSortBy('price-asc');
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors"
                >
                  <Icon name="refreshCw" size="sm" />
                  Resetuj filtry
                </button>
              </div>
            ) : (
              /* Projects Grid */
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProjects.map((project, index) => (
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
                    inView={inView}
                    delay={0.3 + index * 0.1}
                  />
                ))}
              </div>
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
        onFiltersChange={setFilters}
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
