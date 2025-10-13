import React from 'react';
import { clsx } from 'clsx';

export interface CompanyStatBoxProps {
  stats: Array<{
    value: string;
    label: string;
    variant: 'dark' | 'primary';
  }>;
}

export function CompanyStatBox({ stats }: CompanyStatBoxProps) {
  return (
    <div className="flex rounded-xl overflow-hidden shadow-2xl">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={clsx(
            'p-4 md:p-6 flex-1',
            {
              'bg-white': stat.variant === 'dark',
              'bg-primary': stat.variant === 'primary',
            }
          )}
        >
          <div className="space-y-1 md:space-y-2">
            <div
              className={clsx(
                'text-3xl md:text-5xl lg:text-6xl font-bold leading-tight',
                {
                  'text-text-primary': stat.variant === 'dark',
                  'text-white': stat.variant === 'primary',
                }
              )}
            >
              {stat.value}
            </div>
            <p
              className={clsx(
                'text-xs md:text-sm uppercase tracking-wide font-medium leading-tight',
                {
                  'text-text-secondary': stat.variant === 'dark',
                  'text-white': stat.variant === 'primary',
                }
              )}
            >
              {stat.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

