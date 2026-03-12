import React from 'react';
import { clsx } from 'clsx';
import { Icon, IconName } from '@/components/ui';

export interface ResponsibilityCardProps {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
}

export function ResponsibilityCard({
  icon,
  title,
  description,
  className,
}: ResponsibilityCardProps) {
  return (
    <div
      className={clsx(
        'bg-white rounded-xl p-6 shadow-lg',
        'transition-all duration-300',
        'h-full flex flex-col',
        className
      )}
    >
      {/* Icon */}
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
        <Icon name={icon} size="lg" className="text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-text-primary mb-3 leading-tight">
        {title}
      </h3>

      {/* Separator Line */}
      <div className="w-full h-[2px] bg-gradient-to-r from-primary via-primary/50 to-transparent mb-4"></div>

      {/* Description */}
      <p className="text-body-md text-text-secondary leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
}
