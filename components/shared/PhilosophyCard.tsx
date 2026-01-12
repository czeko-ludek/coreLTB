import React from 'react';
import { clsx } from 'clsx';

export interface PhilosophyCardProps {
  number: number;
  title: string;
  description: string;
  className?: string;
}

export function PhilosophyCard({
  number,
  title,
  description,
  className,
}: PhilosophyCardProps) {
  return (
    <div
      className={clsx(
        'relative bg-gradient-to-br from-primary/90 to-primary rounded-xl p-5 shadow-lg',
        'hover:shadow-xl hover:scale-[1.02] transition-all duration-300',
        'grid grid-cols-[auto_1fr] gap-6 items-center',
        className
      )}
    >
      {/* Large Number - Left Side */}
      <div className="flex-shrink-0">
        <div className="text-[5rem] font-black text-white/30 leading-none select-none">
          {number}
        </div>
      </div>

      {/* Content - Right Side */}
      <div className="space-y-3">
        {/* Title */}
        <h3 className="text-xl font-bold text-white leading-tight">
          {title}
        </h3>

        {/* Description */}
        <p className="text-base text-white/90 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
