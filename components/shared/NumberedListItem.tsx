import React from 'react';
import { Icon, IconName } from '@/components/ui';

export interface NumberedListItemProps {
  number: number;
  iconName: IconName;
  title: string;
  description: string;
  isLast?: boolean;
}

export function NumberedListItem({
  number,
  iconName,
  title,
  description,
  isLast = false,
}: NumberedListItemProps) {
  return (
    <div className="flex gap-6 relative">
      {/* Dashed line connecting items */}
      {!isLast && (
        <div className="absolute left-10 top-20 bottom-0 w-[2px] border-l-2 border-dashed border-gray-300"></div>
      )}

      {/* Number circle with icon */}
      <div className="relative flex-shrink-0">
        <div className="w-20 h-20 rounded-full bg-white border-2 border-border-light shadow-md flex items-center justify-center">
          <span className="text-4xl font-bold text-text-secondary">
            {number}
          </span>
        </div>
        
        {/* Icon badge on the circle */}
        <div className="absolute bottom-0 right-0 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <Icon name={iconName} size="md" className="text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 pt-2 pb-8">
        <h3 className="text-xl font-semibold text-text-primary mb-2">
          {title}
        </h3>
        <p className="text-body-md text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

