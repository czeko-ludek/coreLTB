import React from 'react';
import { clsx } from 'clsx';
import { Icon, IconName } from '@/components/ui';

export interface StatCardProps {
  iconName: IconName;
  value: string;
  label: string;
  suffix?: string;
  theme?: 'light' | 'dark';
}

export function StatCard({
  iconName,
  value,
  label,
  suffix = '',
  theme = 'light',
}: StatCardProps) {
  return (
    <div
      className={clsx(
        'p-8 rounded-lg transition-all duration-300',
        'hover:-translate-y-1',
        {
          'bg-surface-light shadow-xl hover:shadow-2xl border border-gray-200': theme === 'light',
          'bg-surface-dark': theme === 'dark',
        }
      )}
    >
      <div className="space-y-4">
        <Icon name={iconName} size="xl" className="text-primary" />
        
        <div className="flex items-baseline gap-1">
          <span
            className={clsx(
              'text-5xl font-bold',
              {
                'text-text-dark': theme === 'light',
                'text-white': theme === 'dark',
              }
            )}
          >
            {value}
          </span>
          {suffix && (
            <span className="text-2xl font-bold text-primary">{suffix}</span>
          )}
        </div>
        
        <p className="text-sm text-text-secondary uppercase tracking-wide">
          {label}
        </p>
      </div>
    </div>
  );
}


