import React from 'react';
import { clsx } from 'clsx';
import { Icon, IconName } from '@/components/ui';

export interface CompetenceCardProps {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
}

export function CompetenceCard({
  icon,
  title,
  description,
  className,
}: CompetenceCardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl p-6 shadow-lg',
        'transition-all duration-300',
        'h-full flex flex-col',
        className
      )}
    >
      {/* Header: Icon + Title */}
      <div className="flex items-center gap-4 mb-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name={icon} size="lg" className="text-primary" />
        </div>
        <h3 className="text-xl font-bold text-text-primary leading-tight flex-1">
          {title}
        </h3>
      </div>

      {/* Separator Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent mb-4"></div>

      {/* Description */}
      <p className="text-body-md text-text-secondary leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}
