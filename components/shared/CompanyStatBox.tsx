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
            'p-6 flex-1',
            {
              'bg-white': stat.variant === 'dark',
              'bg-primary': stat.variant === 'primary',
            }
          )}
        >
          <div className="space-y-2">
            <div
              className={clsx(
                'text-6xl font-bold',
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
                'text-sm uppercase tracking-wide font-medium',
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

