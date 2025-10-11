import React from 'react';
import { clsx } from 'clsx';

export interface SectionLabelProps {
  children: string;
  className?: string;
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <div className={clsx('flex items-center gap-2', className)}>
      <span className="w-8 h-[2px] bg-primary"></span>
      <span className="text-label text-primary uppercase tracking-wider font-bold">
        {children}
      </span>
    </div>
  );
}


