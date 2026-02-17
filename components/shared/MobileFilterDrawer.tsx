'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/ui';
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

export interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  projectCounts: {
    technology: Record<string, number>;
    category: Record<string, number>;
    source: Record<string, number>;
  };
  totalResults: number;
}

export function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFiltersChange,
  projectCounts,
  totalResults,
}: MobileFilterDrawerProps) {
  // Blokuj scroll body gdy drawer jest otwarty
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handlers
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

  const handleReset = () => {
    onFiltersChange({
      technology: [],
      category: [],
      surfaceRange: null,
      source: [],
    });
  };

  // Licznik aktywnych filtrów
  const activeFiltersCount =
    filters.technology.length +
    filters.category.length +
    filters.source.length +
    (filters.surfaceRange ? 1 : 0);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={clsx(
          'fixed inset-x-0 bottom-0 z-50 lg:hidden',
          'bg-white rounded-t-3xl shadow-2xl',
          'transform transition-transform duration-300',
          'max-h-[85vh] overflow-hidden flex flex-col',
          isOpen ? 'translate-y-0' : 'translate-y-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-100">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-text-primary">
              Filtry
            </h3>
            {activeFiltersCount > 0 && (
              <span className="bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                {activeFiltersCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
          >
            <Icon name="x" size="md" className="text-text-primary" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4">
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
                    className="w-5 h-5 rounded accent-primary"
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
                    className="w-5 h-5 rounded accent-primary"
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
                    className="w-5 h-5 rounded accent-primary"
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
                  name="surfaceMobile"
                  checked={filters.surfaceRange === null}
                  onChange={() => handleSurfaceChange(null)}
                  className="appearance-none w-5 h-5 border-2 border-zinc-300 rounded-sm checked:bg-primary checked:border-primary transition-colors"
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
                    name="surfaceMobile"
                    value={range.id}
                    checked={filters.surfaceRange === range.id}
                    onChange={() => handleSurfaceChange(range.id)}
                    className="appearance-none w-5 h-5 border-2 border-zinc-300 rounded-sm checked:bg-primary checked:border-primary transition-colors"
                  />
                  <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
                    {range.label}
                  </span>
                </label>
              ))}
            </div>
          </FilterSection>
        </div>

        {/* Footer z przyciskami */}
        <div className="p-4 border-t border-zinc-100 flex gap-3">
          <button
            onClick={handleReset}
            className="flex-1 py-3 px-4 border border-zinc-200 rounded-xl text-sm font-medium text-text-secondary hover:border-primary hover:text-primary transition-colors"
          >
            Resetuj
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 bg-primary text-white rounded-xl text-sm font-medium hover:bg-primary-dark transition-colors"
          >
            Pokaż wyniki ({totalResults})
          </button>
        </div>
      </div>
    </>
  );
}
