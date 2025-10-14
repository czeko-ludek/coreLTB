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
    <section className="py-8 md:py-12" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-6 md:mb-8 text-center">
            {costCalculation.title}
          </h2>

          {/* Cost Table - Single unified container with overflow-x-auto for mobile */}
          <div className="overflow-x-auto">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg min-w-[600px]">
              {/* Table Header */}
              <div className="grid grid-cols-3 bg-primary text-white font-bold text-xs md:text-sm uppercase tracking-wide">
                <div className="p-3 md:p-4 lg:p-6">Stan</div>
                <div className="p-3 md:p-4 lg:p-6 text-center">Ceny średnie</div>
                <div className="p-3 md:p-4 lg:p-6 text-center">Ceny minimalne</div>
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
                      <div className={`p-3 md:p-4 lg:p-6 ${isTotal ? 'font-bold text-base md:text-lg' : 'text-sm md:text-base'} flex items-center`}>
                        <span>{item.name}</span>
                        {hasInfo && definition && <InfoTooltip definition={definition} />}
                      </div>
                      <div
                        className={`p-3 md:p-4 lg:p-6 text-center ${
                          isTotal ? 'font-bold text-primary text-base md:text-lg' : 'text-text-primary text-sm md:text-base'
                        }`}
                      >
                        {item.prices.average}
                      </div>
                      <div
                        className={`p-3 md:p-4 lg:p-6 text-center ${
                          isTotal ? 'font-bold text-primary text-base md:text-lg' : 'text-text-primary text-sm md:text-base'
                        }`}
                      >
                        {item.prices.min}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="mt-4 md:mt-6 text-xs md:text-sm text-text-secondary text-center italic px-4">
            * Podane ceny są szacunkowe i mogą się różnić w zależności od lokalizacji, materiałów i
            specyfikacji projektu.
          </p>
        </div>
      </div>
    </section>
  );
}
