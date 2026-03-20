'use client';

import React from 'react';
import { clsx } from 'clsx';
import { CountingNumber } from './CountingNumber';

export interface CompanyStatBoxProps {
  stats: Array<{
    value: string;
    label: string;
    variant: 'dark' | 'primary';
  }>;
}

export function CompanyStatBox({ stats }: CompanyStatBoxProps) {
  // Parse number and suffix from value (e.g., "500+" -> 500, "+")
  const parseValue = (value: string) => {
    const match = value.match(/^(\d+)(.*)$/);
    if (match) {
      return { number: parseInt(match[1]), suffix: match[2] };
    }
    return { number: 0, suffix: value };
  };

  return (
    <div className="flex rounded-lg overflow-hidden shadow-lg">
      {stats.map((stat, index) => {
        const { number, suffix } = parseValue(stat.value);

        return (
          <div
            key={index}
            className={clsx(
              'px-3 py-2.5 md:px-5 md:py-3 flex-1',
              {
                'bg-white': stat.variant === 'dark',
                'bg-primary': stat.variant === 'primary',
              }
            )}
          >
            <div className="space-y-0.5">
              <div
                className={clsx(
                  'text-lg md:text-2xl lg:text-3xl font-bold leading-tight',
                  {
                    'text-text-primary': stat.variant === 'dark',
                    'text-white': stat.variant === 'primary',
                  }
                )}
              >
                <CountingNumber end={number} suffix={suffix} />
              </div>
              <p
                className={clsx(
                  'text-[10px] md:text-xs uppercase tracking-wide font-medium leading-tight',
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
        );
      })}
    </div>
  );
}

