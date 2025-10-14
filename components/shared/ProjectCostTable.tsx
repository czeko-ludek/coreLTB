import React from 'react';
import { ProjectCostTable as ProjectCostTableType } from '@/data/projects';
import { hasDefinition, getDefinition } from '@/data/definitions';
import { InfoTooltip } from './InfoTooltip';

export interface ProjectCostTableProps {
  costCalculation: ProjectCostTableType;
}

export function ProjectCostTable({ costCalculation }: ProjectCostTableProps) {
  // Find "Razem" row for special styling
  const totalRowIndex = costCalculation.items.findIndex((item) =>
    item.name.toLowerCase().includes('razem')
  );

  return (
    <section className="py-12" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-8 text-center">
            {costCalculation.title}
          </h2>

          {/* Cost Table - Single unified container */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            {/* Table Header */}
            <div className="grid grid-cols-3 bg-primary text-white font-bold text-sm uppercase tracking-wide">
              <div className="p-4 lg:p-6">Stan</div>
              <div className="p-4 lg:p-6 text-center">Ceny średnie</div>
              <div className="p-4 lg:p-6 text-center">Ceny minimalne</div>
            </div>

            {/* Table Body - No gaps between rows */}
            <div>
              {costCalculation.items.map((item, index) => {
                const isTotal = index === totalRowIndex;
                const hasInfo = hasDefinition(item.name);
                const definition = hasInfo ? getDefinition(item.name) : null;

                return (
                  <div
                    key={index}
                    className={`grid grid-cols-3 transition-colors duration-200 border-t border-border-light ${
                      isTotal
                        ? 'bg-primary/10 font-bold'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className={`p-4 lg:p-6 ${isTotal ? 'font-bold text-lg' : ''} flex items-center`}>
                      <span>{item.name}</span>
                      {hasInfo && definition && <InfoTooltip definition={definition} />}
                    </div>
                    <div
                      className={`p-4 lg:p-6 text-center ${
                        isTotal ? 'font-bold text-primary text-lg' : 'text-text-primary'
                      }`}
                    >
                      {item.prices.average}
                    </div>
                    <div
                      className={`p-4 lg:p-6 text-center ${
                        isTotal ? 'font-bold text-primary text-lg' : 'text-text-primary'
                      }`}
                    >
                      {item.prices.min}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-6 text-sm text-text-secondary text-center italic">
            * Podane ceny są szacunkowe i mogą się różnić w zależności od lokalizacji, materiałów i
            specyfikacji projektu.
          </p>
        </div>
      </div>
    </section>
  );
}
