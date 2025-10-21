'use client';

import React from 'react';
import { Icon, IconName } from '@/components/ui';
import { useInView } from 'react-intersection-observer';

export interface ProcessStepDetailedProps {
  stepNumber: number;
  icon: IconName;
  title: string;
  description: string;
  index: number;
}

export const ProcessStepDetailed: React.FC<ProcessStepDetailedProps> = ({
  stepNumber,
  icon,
  title,
  description,
  index,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const delay = index * 150;

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center text-center transition-all duration-700 lg:items-start lg:text-left ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* Icon Circle */}
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <Icon name={icon} size="xl" className="text-primary" />
      </div>

      {/* Step Number */}
      <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-primary">
        Krok {stepNumber}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-text sm:text-2xl">{title}</h3>

      {/* Description */}
      <p className="whitespace-pre-line text-base leading-relaxed text-text/80">
        {description}
      </p>
    </div>
  );
};
