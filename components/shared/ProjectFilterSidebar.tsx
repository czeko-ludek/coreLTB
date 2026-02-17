'use client';

import React from 'react';
import clsx from 'clsx';
import {
  projectCategories,
  projectTechnologies,
  projectSources,
  surfaceRanges,
  type ProjectFilters,
  type ProjectTechnology,
  type ProjectCategory,
  type ProjectSource,
} from '@/data/projects';
import { FilterSection } from './FilterSection';

export interface ProjectFilterSidebarProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  projectCounts: {
    technology: Record<string, number>;
    category: Record<string, number>;
    source: Record<string, number>;
  };
  totalResults: number;
  inView?: boolean;
}

export function ProjectFilterSidebar({
  filters,
  onFiltersChange,
  projectCounts,
  totalResults,
  inView = true,
}: ProjectFilterSidebarProps) {
  // Handlers dla checkboxów (technologia, kategoria)
  const handleTechnologyChange = (tech: ProjectTechnology, checked: boolean) => {
    const newTech = checked
      ? [...filters.technology, tech]
      : filters.technology.filter(t => t !== tech);
    onFiltersChange({ ...filters, technology: newTech });
  };

  const handleCategoryChange = (cat: ProjectCategory, checked: boolean) => {
    const newCat = checked
      ? [...filters.category, cat]
      : filters.category.filter(c => c !== cat);
    onFiltersChange({ ...filters, category: newCat });
  };

  const handleSourceChange = (src: ProjectSource, checked: boolean) => {
    const newSource = checked
      ? [...filters.source, src]
      : filters.source.filter(s => s !== src);
    onFiltersChange({ ...filters, source: newSource });
  };

  // Handler dla radio (powierzchnia)
  const handleSurfaceChange = (surfaceId: string | null) => {
    onFiltersChange({ ...filters, surfaceRange: surfaceId });
  };

  // Reset filtrów
  const handleReset = () => {
    onFiltersChange({
      technology: [],
      category: [],
      surfaceRange: null,
      source: [],
    });
  };

  // Sprawdź czy są aktywne filtry
  const hasActiveFilters =
    filters.technology.length > 0 ||
    filters.category.length > 0 ||
    filters.surfaceRange !== null ||
    filters.source.length > 0;

  return (
    <div
      className={clsx(
        'bg-white rounded-3xl shadow-[0_0_20px_rgba(0,0,0,0.05)] p-6',
        'lg:sticky lg:top-24',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: '0.2s' }}
    >
      {/* Wyniki */}
      <div className="pb-4 border-b border-zinc-100 mb-2">
        <p className="text-sm text-text-secondary">
          Znaleziono: <span className="font-bold text-text-primary">{totalResults}</span>{' '}
          {totalResults === 1 ? 'projekt' : totalResults < 5 ? 'projekty' : 'projektów'}
        </p>
      </div>

      {/* Technologia */}
      <FilterSection title="Technologia">
        <div className="space-y-2">
          {projectTechnologies.map((tech) => (
            <label
              key={tech.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.technology.includes(tech.id as ProjectTechnology)}
                onChange={(e) =>
                  handleTechnologyChange(tech.id as ProjectTechnology, e.target.checked)
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors flex-1">
                {tech.label}
              </span>
              <span className="text-xs text-text-muted">
                ({projectCounts.technology[tech.id] || 0})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Kategoria */}
      <FilterSection title="Kategoria">
        <div className="space-y-2">
          {projectCategories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.category.includes(cat.id as ProjectCategory)}
                onChange={(e) =>
                  handleCategoryChange(cat.id as ProjectCategory, e.target.checked)
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors flex-1">
                {cat.label}
              </span>
              <span className="text-xs text-text-muted">
                ({projectCounts.category[cat.id] || 0})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Kolekcja */}
      <FilterSection title="Kolekcja">
        <div className="space-y-2">
          {projectSources.map((src) => (
            <label
              key={src.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="checkbox"
                checked={filters.source.includes(src.id as ProjectSource)}
                onChange={(e) =>
                  handleSourceChange(src.id as ProjectSource, e.target.checked)
                }
                className="w-4 h-4 rounded accent-primary"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors flex-1">
                {src.label}
              </span>
              <span className="text-xs text-text-muted">
                ({projectCounts.source[src.id] || 0})
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Powierzchnia użytkowa */}
      <FilterSection title="Powierzchnia">
        <div className="space-y-2">
          {/* Opcja "Wszystkie" */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="surface"
              checked={filters.surfaceRange === null}
              onChange={() => handleSurfaceChange(null)}
              className="appearance-none w-4 h-4 border-2 border-zinc-300 rounded-sm checked:bg-primary checked:border-primary transition-colors"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              Wszystkie
            </span>
          </label>
          {surfaceRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="surface"
                value={range.id}
                checked={filters.surfaceRange === range.id}
                onChange={() => handleSurfaceChange(range.id)}
                className="appearance-none w-4 h-4 border-2 border-zinc-300 rounded-sm checked:bg-primary checked:border-primary transition-colors"
              />
              <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                {range.label}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Reset Button */}
      {hasActiveFilters && (
        <button
          onClick={handleReset}
          className="w-full mt-4 py-3 px-4 border border-zinc-200 rounded-xl text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
        >
          Resetuj filtry
        </button>
      )}
    </div>
  );
}
