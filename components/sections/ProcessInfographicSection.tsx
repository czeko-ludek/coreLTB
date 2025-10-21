'use client';

import React from 'react';
import { ProcessStepDetailed, ProcessStepDetailedProps } from '@/components/shared/ProcessStepDetailed';

export interface ProcessInfographicSectionProps {
  headline: string;
  steps: Omit<ProcessStepDetailedProps, 'index'>[];
}

export const ProcessInfographicSection: React.FC<ProcessInfographicSectionProps> = ({
  headline,
  steps,
}) => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-16 text-center text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
          {headline}
        </h2>

        {/* Timeline Grid */}
        <div className="relative grid gap-12 lg:grid-cols-5 lg:gap-8">
          {/* Connecting Line - Desktop */}
          <div className="absolute left-0 right-0 top-10 hidden h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 lg:block" />

          {steps.map((step, index) => (
            <ProcessStepDetailed key={index} {...step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
