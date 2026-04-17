'use client';

import React, { useState, useRef, useEffect } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';

export interface FilterDropdownOption {
  label: string;
}

interface FilterDropdownProps {
  label: string;
  options: FilterDropdownOption[];
  activeIndex: number;
  onSelect: (index: number) => void;
  align?: 'left' | 'right';
}

/** Generic dropdown component */
export function FilterDropdown({
  label,
  options,
  activeIndex,
  onSelect,
  align = 'left',
}: FilterDropdownProps) {
  const [open, setOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(activeIndex);
  const isFiltered = activeIndex > 0;
  const containerRef = useRef<HTMLDivElement>(null);
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // When dropdown opens, sync focusedIndex to activeIndex
  useEffect(() => {
    if (open) {
      setFocusedIndex(activeIndex);
    }
  }, [open, activeIndex]);

  // Scroll focused option into view
  useEffect(() => {
    if (open && optionRefs.current[focusedIndex]) {
      optionRefs.current[focusedIndex]?.scrollIntoView({ block: 'nearest' });
    }
  }, [open, focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((i) => (i + 1) % options.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((i) => (i - 1 + options.length) % options.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        onSelect(focusedIndex);
        setOpen(false);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Close only if focus leaves the entire container
    if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
      setOpen(false);
    }
  };

  return (
    <div className="relative" ref={containerRef} onBlur={handleBlur}>
      <button
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
        aria-expanded={open}
        aria-haspopup="listbox"
        className={clsx(
          'flex items-center justify-between gap-1.5 px-4 py-2 bg-white rounded-full text-sm font-medium border transition-all whitespace-nowrap',
          isFiltered
            ? 'border-primary text-zinc-900 shadow-sm'
            : 'border-zinc-200 text-text-secondary hover:border-zinc-400'
        )}
      >
        <span>{options[activeIndex]?.label || label}</span>
        <Icon name={open ? 'chevronUp' : 'chevronDown'} size="sm" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div
            role="listbox"
            className={clsx(
              'absolute top-full mt-1.5 w-52 bg-white rounded-2xl shadow-xl border border-zinc-200 p-1.5 z-30',
              align === 'right' ? 'right-0' : 'left-0'
            )}
          >
            {options.map((opt, i) => (
              <button
                key={i}
                ref={(el) => { optionRefs.current[i] = el; }}
                role="option"
                aria-selected={activeIndex === i}
                onClick={() => { onSelect(i); setOpen(false); }}
                className={clsx(
                  'w-full text-left px-4 py-2.5 text-sm transition-colors rounded-lg',
                  activeIndex === i
                    ? 'bg-primary/10 text-primary font-medium'
                    : 'text-text-secondary hover:bg-zinc-50',
                  focusedIndex === i && 'ring-2 ring-primary/50 ring-inset'
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
