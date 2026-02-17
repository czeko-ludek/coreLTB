'use client';

import React from 'react';
import clsx from 'clsx';
import { Icon } from '@/components/ui';
import { useToggle } from '@/hooks/useToggle';

export interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

/**
 * FilterSection — rozwijana sekcja filtra.
 * Współdzielona przez ProjectFilterSidebar i MobileFilterDrawer.
 */
export function FilterSection({ title, defaultOpen = true, children }: FilterSectionProps) {
  const [isOpen, toggleOpen] = useToggle(defaultOpen);

  return (
    <div className="border-b border-zinc-100 last:border-b-0">
      <button
        onClick={toggleOpen}
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
