import React from 'react';
import { clsx } from 'clsx';

export interface ResponsibilityPillar {
  title: string;
  description: string;
}

export interface ResponsibilityPillarsCardProps {
  title: string;
  pillars: ResponsibilityPillar[];
  className?: string;
}

export function ResponsibilityPillarsCard({
  title,
  pillars,
  className,
}: ResponsibilityPillarsCardProps) {
  return (
    <div
      className={clsx(
        'relative bg-gradient-to-br from-primary/90 to-primary rounded-xl p-8 lg:p-10 shadow-lg',
        'hover:shadow-xl transition-all duration-300',
        className
      )}
    >
      {/* Title */}
      <h3 className="text-xl lg:text-2xl font-bold text-white leading-tight mb-6">
        {title}
      </h3>

      {/* Pillars List */}
      <div className="space-y-5">
        {pillars.map((pillar, index) => (
          <div key={index} className="space-y-2">
            {/* Pillar Title */}
            <h4 className="text-lg font-bold text-white">
              {pillar.title}
            </h4>
            {/* Pillar Description */}
            <p className="text-base text-white/90 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
