'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';

export interface PricingRow {
  readonly stage: string;
  readonly scope: string;
  readonly priceRange: string;
  readonly timeRange: string;
}

export interface PricingSectionProps {
  id?: string;
  header: SectionHeaderProps;
  rows: readonly PricingRow[];
  disclaimer: string;
}

export function PricingSection({ id, header, rows, disclaimer }: PricingSectionProps) {
  const { ref: headlineRef, inView: headlineInView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { ref: tableRef, inView: tableInView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section id={id} className="py-16 sm:py-20 lg:py-24 bg-background-beige">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div ref={headlineRef} className={headlineInView ? 'animate-fade-in-up' : 'opacity-0'}>
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* Tabela cennikowa */}
        <div
          ref={tableRef}
          className={`max-w-6xl mx-auto mt-12 transition-all duration-500 ${
            tableInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Desktop Table */}
          <div className="hidden md:block bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-primary/10 to-primary/5">
                  <th className="px-6 py-4 text-left text-sm font-bold text-text-primary uppercase tracking-wide">
                    Etap inwestycji
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-text-primary uppercase tracking-wide">
                    Zakres prac
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-text-primary uppercase tracking-wide">
                    Szacunkowy koszt
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-text-primary uppercase tracking-wide">
                    Czas realizacji
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr
                    key={index}
                    className={`border-t border-gray-100 hover:bg-gray-50 transition-colors ${
                      index % 2 === 1 ? 'bg-gray-50/50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 text-base font-semibold text-text-primary">
                      {row.stage}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {row.scope}
                    </td>
                    <td className="px-6 py-4 text-base font-bold text-primary">
                      {row.priceRange}
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">
                      {row.timeRange}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {rows.map((row, index) => (
              <div
                key={index}
                className="bg-white rounded-xl border border-gray-200 p-6 shadow-md"
              >
                <h3 className="text-lg font-bold text-text-primary mb-2">
                  {row.stage}
                </h3>
                <p className="text-sm text-text-secondary mb-4">
                  {row.scope}
                </p>
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                      Koszt
                    </p>
                    <p className="text-base font-bold text-primary">
                      {row.priceRange}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-text-secondary uppercase tracking-wide mb-1">
                      Czas
                    </p>
                    <p className="text-sm font-medium text-text-secondary">
                      {row.timeRange}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-text-secondary italic">
              {disclaimer}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
