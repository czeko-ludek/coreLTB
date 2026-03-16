'use client';

import React from 'react';
import { Icon, IconName } from '@/components/ui';
import { formatBold } from '@/lib/utils';
import { CountingNumber } from './CountingNumber';

export interface NumberedListItemProps {
  number: number;
  iconName: IconName;
  title: string;
  description: string;
  isLast?: boolean;
  isVisible?: boolean; // For triggering animation
}

export function NumberedListItem({
  number,
  iconName,
  title,
  description,
  isLast = false,
  isVisible = true,
}: NumberedListItemProps) {
  return (
    <div className="flex flex-col md:flex-row gap-3 md:gap-6 relative">
      {/* Dashed line connecting items (only desktop) */}
      {!isLast && (
        <div className="hidden md:block absolute left-10 top-20 bottom-0 w-[2px] border-l-2 border-dashed border-gray-300"></div>
      )}

      {/* Mobile: inline header (icon + number + title) */}
      <div className="flex items-center gap-3 md:hidden">
        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-primary shadow-md flex items-center justify-center">
            <Icon name={iconName} size="md" className="text-white" />
          </div>
          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
            <span className="text-[10px] font-bold text-white">{number}</span>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-text-primary">
          {title}
        </h3>
      </div>

      {/* Mobile: description below */}
      <div className="md:hidden pb-6">
        <p
          className="text-base text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: formatBold(description, 'font-bold text-text'),
          }}
        />
      </div>

      {/* Desktop: original layout (icon left, content right) */}
      <div className="relative flex-shrink-0 hidden md:block">
        <div className="w-20 h-20 rounded-full bg-primary shadow-md flex items-center justify-center">
          <Icon name={iconName} size="xl" className="text-white" />
        </div>
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
          <span className="text-sm font-bold text-white">
            {isVisible ? <CountingNumber end={number} duration={800} /> : number}
          </span>
        </div>
      </div>

      <div className="hidden md:block flex-1 pt-2 pb-8">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p
          className="text-body-md text-text-secondary leading-relaxed"
          dangerouslySetInnerHTML={{
            __html: formatBold(description, 'font-bold text-text'),
          }}
        />
      </div>
    </div>
  );
}

