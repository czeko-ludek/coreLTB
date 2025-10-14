'use client';

import React, { useState } from 'react';
import { ProjectSpecificationTab } from '@/data/projects';
import { hasDefinition, getDefinition } from '@/data/definitions';
import { InfoTooltip } from './InfoTooltip';

export interface ProjectTabsProps {
  specifications: ProjectSpecificationTab[];
}

export function ProjectTabs({ specifications }: ProjectTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className="py-12" style={{ backgroundColor: '#efebe7' }}>
      <div className="container mx-auto px-4">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-3">
          {specifications.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`px-6 py-3 font-medium text-sm uppercase tracking-wide transition-all duration-300 ${
                activeTabIndex === index
                  ? 'bg-primary text-white rounded-t-lg'
                  : 'bg-gray-50 text-text-secondary hover:bg-gray-100 hover:text-text-primary rounded-t-lg'
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Tab Content - Connected directly to tabs */}
        <div className="bg-gray-50 rounded-b-xl rounded-tr-xl p-8">
          <h3 className="text-2xl font-bold text-text-primary mb-6">
            {specifications[activeTabIndex].title}
          </h3>

          {/* Grid with conditional columns: 1 for "Opis funkcjonalny", 2 for others */}
          <div className={`grid gap-5 ${
            specifications[activeTabIndex].title === 'Opis funkcjonalny'
              ? 'grid-cols-1'
              : 'grid-cols-1 md:grid-cols-2'
          }`}>
            {specifications[activeTabIndex].items.map((item, index) => {
              const hasInfo = hasDefinition(item.label);
              const definition = hasInfo ? getDefinition(item.label) : null;

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg p-4 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <dt className="text-xs font-medium text-text-secondary tracking-wide mb-2 flex items-center">
                    <span>{item.label}</span>
                    {hasInfo && definition && <InfoTooltip definition={definition} />}
                  </dt>
                  <dd className="text-base font-semibold text-text-primary whitespace-pre-line leading-relaxed">
                    {item.value}
                  </dd>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
