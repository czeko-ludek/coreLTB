import React from 'react';
import { StatCard, StatCardProps } from '@/components/shared';

export interface StatsSectionProps {
  stats: StatCardProps[];
}

export function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="px-0 md:px-[50px] py-8 md:py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} theme="light" />
        ))}
      </div>
    </section>
  );
}

