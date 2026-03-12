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
    <div className="flex gap-6 relative">
      {/* Dashed line connecting items */}
      {!isLast && (
        <div className="absolute left-10 top-20 bottom-0 w-[2px] border-l-2 border-dashed border-gray-300"></div>
      )}

      {/* Icon circle with number badge */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-primary shadow-md flex items-center justify-center">
          <Icon name={iconName} size="xl" className="text-white" />
        </div>

        {/* Number badge on top right with counting animation */}
        <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
          <span className="text-sm font-bold text-white">
            {isVisible ? <CountingNumber end={number} duration={800} /> : number}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2 pb-8">
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

