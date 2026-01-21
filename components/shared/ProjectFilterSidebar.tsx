'use client';

import React, { useState } from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/ui';
import {
  projectCategories,
  projectTechnologies,
  budgetRanges,
  surfaceRanges,
  type ProjectFilters,
  type ProjectTechnology,
  type ProjectCategory,
} from '@/data/projects';

export interface ProjectFilterSidebarProps {
  filters: ProjectFilters;
  onFiltersChange: (filters: ProjectFilters) => void;
  projectCounts: {
    technology: Record<string, number>;
    category: Record<string, number>;
  };
  totalResults: number;
  inView?: boolean;
}

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

// Rozwijalna sekcja filtra
function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full py-4 text-left"
      >
        <span className="text-sm font-bold text-text-primary uppercase tracking-wide">
          {title}
        </span>
        <Icon
          name={isOpen ? 'chevronUp' : 'chevronDown'}
          size="sm"
          className="text-text-muted"
        />
      </button>
      <div
        className={clsx(
          'overflow-hidden transition-all duration-300',
          isOpen ? 'max-h-96 pb-4' : 'max-h-0'
        )}
      >
        {children}
      </div>
    </div>
  );
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

  // Handler dla radio (budżet)
  const handleBudgetChange = (budgetId: string | null) => {
    onFiltersChange({ ...filters, budgetRange: budgetId });
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
      budgetRange: null,
      surfaceRange: null,
    });
  };

  // Sprawdź czy są aktywne filtry
  const hasActiveFilters =
    filters.technology.length > 0 ||
    filters.category.length > 0 ||
    filters.budgetRange !== null ||
    filters.surfaceRange !== null;

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

      {/* Budżet */}
      <FilterSection title="Budżet budowy">
        <div className="space-y-2">
          {/* Opcja "Wszystkie" */}
          <label className="flex items-center gap-3 cursor-pointer group">
            <input
              type="radio"
              name="budget"
              checked={filters.budgetRange === null}
              onChange={() => handleBudgetChange(null)}
              className="appearance-none w-4 h-4 border-2 border-zinc-300 rounded-sm checked:bg-primary checked:border-primary transition-colors"
            />
            <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">
              Wszystkie
            </span>
          </label>
          {budgetRanges.map((range) => (
            <label
              key={range.id}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="budget"
                value={range.id}
                checked={filters.budgetRange === range.id}
                onChange={() => handleBudgetChange(range.id)}
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
