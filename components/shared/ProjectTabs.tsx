'use client';

import React, { useState } from 'react';
import { ProjectSpecificationTab } from '@/data/projects';
import { hasDefinition, getDefinition } from '@/data/definitions';
import { InfoTooltip } from './InfoTooltip';

/**
 * Formats description text by bolding labels before colons.
 * "Ściany zewnętrzne: pustak..." → <strong>Ściany zewnętrzne:</strong> pustak...
 * Only matches labels at the start of a line (after newline or beginning of string).
 */
function formatDescription(text: string): React.ReactNode[] {
  // Split by lines, process each
  const lines = text.split('\n');
  const result: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    if (i > 0) result.push('\n');
    const line = lines[i];
    // Match pattern: starts with a capitalized word(s) followed by colon
    const match = line.match(/^([A-ZĄĆĘŁŃÓŚŹŻ][^:]{0,60}:)\s*/i);
    if (match) {
      result.push(
        <strong key={`b-${i}`} className="font-bold">{match[1]}</strong>,
        ' ',
        line.slice(match[0].length)
      );
    } else {
      result.push(line);
    }
  }

  return result;
}

export interface ProjectTabsProps {
  specifications: ProjectSpecificationTab[];
}

export function ProjectTabs({ specifications }: ProjectTabsProps) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className="py-6 md:py-8 bg-background-beige">
      <div className="container mx-auto px-4 md:px-6 lg:px-8">
        {/* Tab Headers */}
        <div className="flex flex-wrap gap-1.5 md:gap-2">
          {specifications.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTabIndex(index)}
              className={`px-3 py-1.5 md:px-5 md:py-2 font-medium text-xs md:text-sm uppercase tracking-wide transition-all duration-300 ${
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
        <div className="bg-gray-50 rounded-b-xl rounded-tr-xl p-3 md:p-5">
          <h3 className="text-lg md:text-xl font-bold text-text-primary mb-3 md:mb-4">
            {specifications[activeTabIndex].title}
          </h3>

          {/* Grid with conditional columns: 1 for "Opis funkcjonalny", 2 for others */}
          <div className={`grid gap-2.5 md:gap-3 ${
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
                  className="bg-white rounded-md px-3 py-2 md:px-3.5 md:py-2.5 border border-primary/20 hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <dt className="text-[0.7rem] md:text-xs font-medium text-text-secondary tracking-wide mb-1 flex items-center">
                    <span>{item.label}</span>
                    {hasInfo && definition && <InfoTooltip definition={definition} />}
                  </dt>
                  <dd className="text-sm md:text-base font-semibold text-text-primary whitespace-pre-line leading-snug">
                    {specifications[activeTabIndex].title === 'Opis funkcjonalny'
                      ? formatDescription(item.value)
                      : item.value}
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
