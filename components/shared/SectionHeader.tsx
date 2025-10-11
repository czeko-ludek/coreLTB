import React from 'react';
import { clsx } from 'clsx';
import { SectionLabel } from '@/components/ui';

export interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
}

export function SectionHeader({
  label,
  title,
  description,
  align = 'center',
  theme = 'light',
}: SectionHeaderProps) {
  return (
    <div
      className={clsx(
        'space-y-4 max-w-2xl',
        {
          'text-left': align === 'left',
          'text-center mx-auto': align === 'center',
        }
      )}
    >
      <SectionLabel className={align === 'center' ? 'justify-center' : ''}>
        {label}
      </SectionLabel>
      
      <h2
        className={clsx(
          'text-h2 font-bold',
          {
            'text-white': theme === 'dark',
            'text-text-primary': theme === 'light',
          }
        )}
      >
        {title}
      </h2>
      
      {description && (
        <p className="text-body-lg text-text-secondary">
          {description}
        </p>
      )}
    </div>
  );
}

