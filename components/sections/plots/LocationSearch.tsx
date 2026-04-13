'use client';

import React, { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { clsx } from 'clsx';
import { Icon, type IconName } from '@/components/ui';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';
import {
  searchLocations,
  getLocationLevelLabel,
  getLocationCities,
  getLocationDistricts,
  getLocationBreadcrumb,
  LOCATIONS,
  type LocationEntry,
  type LocationLevel,
} from '@/data/plots/locations';

/* ── Level badge colors ── */
const LEVEL_STYLES: Record<LocationLevel, string> = {
  wojewodztwo: 'bg-purple-50 text-purple-600',
  powiat: 'bg-blue-50 text-blue-600',
  gmina: 'bg-green-50 text-green-700',
  miejscowosc: 'bg-zinc-100 text-zinc-600',
};

const LEVEL_ICONS: Record<LocationLevel, IconName> = {
  wojewodztwo: 'map',
  powiat: 'mapPin',
  gmina: 'building',
  miejscowosc: 'home',
};

/* ── Types ── */
export interface LocationSelection {
  slug: string;
  entry: LocationEntry;
  /** All Plot.city values covered by this location (recursive) */
  cities: string[];
  /** If miejscowosc — specific districts to filter */
  districts?: string[];
  /** Nominatim query for boundary overlay on map */
  nominatimQuery?: string;
}

interface LocationSearchProps {
  /** Currently selected location (null = all) */
  value: LocationSelection | null;
  /** Called when user selects a location or clears */
  onChange: (selection: LocationSelection | null) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Additional className for wrapper */
  className?: string;
  /** Compact mode for fullscreen toolbar */
  compact?: boolean;
  /** Navigate to /dzialki/[slug] subpage on select (default: false) */
  navigateToSubpage?: boolean;
  /** Override popular locations shown when input is focused (slugs) */
  popularSlugs?: string[];
}

/**
 * LocationSearch — OtoDom-style autocomplete for hierarchical location search.
 *
 * Features:
 * - Debounced search through locations.ts hierarchy
 * - Results grouped by level (powiat > gmina > miejscowosc)
 * - Keyboard navigation (Arrow Up/Down, Enter, Escape)
 * - Breadcrumb display for selected location
 * - Clear button to reset
 */
export const LocationSearch = React.memo(function LocationSearch({
  value,
  onChange,
  placeholder = 'Szukaj lokalizacji...',
  className,
  compact = false,
  navigateToSubpage = false,
  popularSlugs,
}: LocationSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const debouncedQuery = useDebounce(query, 150);

  // ── Search results (memoized on debounced query) ──
  const results = useMemo(() => {
    if (!debouncedQuery || debouncedQuery.length < 2) return [];
    return searchLocations(debouncedQuery);
  }, [debouncedQuery]);

  // ── Group results by level for display ──
  const groupedResults = useMemo(() => {
    const groups: { level: LocationLevel; label: string; entries: LocationEntry[] }[] = [];
    const levelOrder: LocationLevel[] = ['powiat', 'gmina', 'miejscowosc', 'wojewodztwo'];

    for (const level of levelOrder) {
      const entries = results.filter((r) => r.level === level);
      if (entries.length > 0) {
        groups.push({
          level,
          label: getLocationLevelLabel(level),
          entries,
        });
      }
    }

    return groups;
  }, [results]);

  // Flat list for keyboard nav
  const flatResults = useMemo(() => results, [results]);

  // ── Breadcrumb for selected value ──
  const breadcrumb = useMemo(() => {
    if (!value) return [];
    return getLocationBreadcrumb(value.slug);
  }, [value]);

  // ── Select a location ──
  const handleSelect = useCallback(
    (entry: LocationEntry) => {
      // Navigate to subpage for any location level
      if (navigateToSubpage && (entry.level === 'gmina' || entry.level === 'powiat' || entry.level === 'miejscowosc')) {
        const breadcrumb = getLocationBreadcrumb(entry.slug);
        const parts = breadcrumb
          .filter((b) => b.level !== 'wojewodztwo')
          .map((b) => b.slug);
        router.push(`/dzialki/${parts.join('/')}`);
        setQuery('');
        setIsOpen(false);
        setActiveIndex(0);
        inputRef.current?.blur();
        return;
      }

      const cities = getLocationCities(entry.slug);
      const districts = getLocationDistricts(entry.slug);

      // For miejscowosc without own nominatimQuery, use parent's
      let nominatimQuery = entry.nominatimQuery;
      if (!nominatimQuery && entry.parentSlug) {
        const parent = LOCATIONS[entry.parentSlug];
        nominatimQuery = parent?.nominatimQuery;
      }

      onChange({
        slug: entry.slug,
        entry,
        cities,
        districts: districts || undefined,
        nominatimQuery,
      });

      setQuery('');
      setIsOpen(false);
      setActiveIndex(0);
      inputRef.current?.blur();
    },
    [onChange, navigateToSubpage, router]
  );

  // ── Clear selection ──
  const handleClear = useCallback(() => {
    onChange(null);
    setQuery('');
    setActiveIndex(0);
    inputRef.current?.focus();
  }, [onChange]);

  // ── Keyboard navigation ──
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen || flatResults.length === 0) {
        if (e.key === 'Escape') {
          setIsOpen(false);
          inputRef.current?.blur();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setActiveIndex((i) => Math.min(i + 1, flatResults.length - 1));
          break;
        case 'ArrowUp':
          e.preventDefault();
          setActiveIndex((i) => Math.max(i - 1, 0));
          break;
        case 'Enter':
          e.preventDefault();
          if (flatResults[activeIndex]) {
            handleSelect(flatResults[activeIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          inputRef.current?.blur();
          break;
      }
    },
    [isOpen, flatResults, activeIndex, handleSelect]
  );

  // ── Click outside to close ──
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  // ── Scroll active item into view ──
  useEffect(() => {
    if (!isOpen || !dropdownRef.current) return;
    const activeEl = dropdownRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest' });
    }
  }, [activeIndex, isOpen]);

  // Reset active index when results change
  useEffect(() => {
    setActiveIndex(0);
  }, [debouncedQuery]);

  // ── Render helper: parent path for context ──
  const renderParentPath = useCallback((entry: LocationEntry) => {
    if (!entry.parentSlug) return null;
    const path = getLocationBreadcrumb(entry.slug);
    if (path.length <= 1) return null;

    // Show parent chain without self
    const parents = path.slice(0, -1);
    return (
      <span className="text-[10px] text-text-muted ml-1.5">
        {parents.map((p) => p.name).join(' > ')}
      </span>
    );
  }, []);

  const showDropdown = isOpen && (results.length > 0 || (debouncedQuery.length >= 2 && results.length === 0));

  // ── Quick-pick popular locations (shown when input focused but no query) ──
  const popularLocations = useMemo(() => {
    if (popularSlugs && popularSlugs.length > 0) {
      return popularSlugs.map((s) => LOCATIONS[s]).filter(Boolean);
    }
    return [
      LOCATIONS['wodzislaw-slaski'],
      LOCATIONS['gorzyce'],
      LOCATIONS['rybnik'],
      LOCATIONS['gaszowice'],
      LOCATIONS['mszana'],
      LOCATIONS['nedza'],
    ].filter(Boolean);
  }, [popularSlugs]);

  const showPopular = isOpen && debouncedQuery.length < 2;

  return (
    <div ref={wrapperRef} className={clsx('relative z-[100]', className)}>
      {/* ── Input area ── */}
      <div
        className={clsx(
          'flex items-center gap-2 bg-white border rounded-lg transition-all',
          isOpen ? 'border-primary ring-2 ring-primary/10' : 'border-zinc-200 hover:border-zinc-300',
          compact ? 'px-2.5 py-1.5' : 'px-3.5 py-2.5'
        )}
      >
        <Icon
          name="search"
          size="sm"
          className={clsx('shrink-0', isOpen ? 'text-primary' : 'text-text-muted')}
        />

        {/* Selected badge (inline before input) */}
        {value && !query && (
          <div className="flex items-center gap-1.5 shrink-0">
            <span
              className={clsx(
                'inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-semibold',
                LEVEL_STYLES[value.entry.level]
              )}
            >
              <Icon name={LEVEL_ICONS[value.entry.level]} size="sm" />
              {value.entry.name}
            </span>
            <button
              onClick={handleClear}
              className="w-5 h-5 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors shrink-0"
              aria-label="Wyczysc lokalizacje"
            >
              <Icon name="x" size="sm" className="text-zinc-500" />
            </button>
          </div>
        )}

        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={value ? '' : placeholder}
          className={clsx(
            'flex-1 bg-transparent outline-none text-text-primary placeholder:text-text-muted min-w-0',
            compact ? 'text-xs' : 'text-sm',
            value && !query ? 'hidden' : ''
          )}
          role="combobox"
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-autocomplete="list"
          aria-activedescendant={
            isOpen && flatResults[activeIndex]
              ? `loc-option-${flatResults[activeIndex].slug}`
              : undefined
          }
        />

        {/* Clear text button */}
        {query && (
          <button
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="w-5 h-5 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center shrink-0"
          >
            <Icon name="x" size="sm" className="text-zinc-500" />
          </button>
        )}
      </div>

      {/* ── Breadcrumb below input (when selected) ── */}
      {value && breadcrumb.length > 1 && !compact && (
        <div className="flex items-center gap-1 mt-1.5 px-1">
          {breadcrumb.map((loc, i) => (
            <React.Fragment key={loc.slug}>
              {i > 0 && (
                <Icon name="chevronRight" size="sm" className="text-text-muted shrink-0" />
              )}
              <button
                onClick={() => {
                  const entry = LOCATIONS[loc.slug];
                  if (entry) handleSelect(entry);
                }}
                className={clsx(
                  'text-[11px] transition-colors',
                  loc.slug === value.slug
                    ? 'font-semibold text-primary'
                    : 'text-text-muted hover:text-primary'
                )}
              >
                {loc.name}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}

      {/* ── Dropdown ── */}
      {(showDropdown || showPopular) && (
        <div
          ref={dropdownRef}
          className="absolute left-0 top-full mt-1.5 bg-white rounded-xl shadow-xl border border-zinc-200 overflow-hidden z-[200] max-h-[320px] overflow-y-auto min-w-[320px] w-full"
          role="listbox"
        >
          {/* Popular locations (no query) */}
          {showPopular && (
            <>
              <div className="px-3 pt-2.5 pb-1.5">
                <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                  Popularne lokalizacje
                </p>
              </div>
              {popularLocations.map((loc) => (
                <button
                  key={loc.slug}
                  onClick={() => handleSelect(loc)}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-left hover:bg-zinc-50 transition-colors"
                >
                  <span
                    className={clsx(
                      'inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0',
                      LEVEL_STYLES[loc.level]
                    )}
                  >
                    <Icon name={LEVEL_ICONS[loc.level]} size="sm" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {loc.name}
                    </p>
                    <p className="text-[10px] text-text-muted">
                      {getLocationLevelLabel(loc.level)}
                    </p>
                  </div>
                </button>
              ))}
            </>
          )}

          {/* Search results (grouped by level) */}
          {showDropdown && results.length > 0 && (
            <>
              {groupedResults.map((group) => (
                <div key={group.level}>
                  <div className="px-3 pt-2.5 pb-1">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text-muted">
                      {group.label}
                    </p>
                  </div>
                  {group.entries.map((entry) => {
                    const flatIdx = flatResults.indexOf(entry);
                    const isActive = flatIdx === activeIndex;
                    const isSelected = value?.slug === entry.slug;

                    return (
                      <button
                        key={entry.slug}
                        id={`loc-option-${entry.slug}`}
                        role="option"
                        aria-selected={isSelected}
                        data-active={isActive}
                        onClick={() => handleSelect(entry)}
                        onMouseEnter={() => setActiveIndex(flatIdx)}
                        className={clsx(
                          'w-full flex items-center gap-2.5 px-3 py-2 text-left transition-colors',
                          isActive ? 'bg-primary/5' : 'hover:bg-zinc-50',
                          isSelected && 'bg-primary/10'
                        )}
                      >
                        <span
                          className={clsx(
                            'inline-flex items-center justify-center w-7 h-7 rounded-lg shrink-0',
                            LEVEL_STYLES[entry.level]
                          )}
                        >
                          <Icon name={LEVEL_ICONS[entry.level]} size="sm" />
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-baseline gap-1 flex-wrap">
                            <p
                              className={clsx(
                                'text-sm font-medium',
                                isSelected ? 'text-primary' : 'text-text-primary'
                              )}
                            >
                              {entry.name}
                            </p>
                            {renderParentPath(entry)}
                          </div>
                        </div>
                        {isSelected && (
                          <Icon name="check" size="sm" className="text-primary shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              ))}
            </>
          )}

          {/* No results */}
          {showDropdown && results.length === 0 && debouncedQuery.length >= 2 && (
            <div className="px-4 py-6 text-center">
              <Icon name="search" size="md" className="text-text-muted mx-auto mb-2" />
              <p className="text-sm text-text-secondary">
                Brak wynikow dla &quot;{debouncedQuery}&quot;
              </p>
              <p className="text-xs text-text-muted mt-1">
                Sprobuj: Wodzislaw, Rybnik, Gorzyce...
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
});
