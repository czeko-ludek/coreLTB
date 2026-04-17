import React from 'react';
import { Icon } from '@/components/ui';
import type { PlotFAQItem } from '@/data/plots/seo';

interface PlotsFAQProps {
  faq: PlotFAQItem[];
}

export function PlotsFAQ({ faq }: PlotsFAQProps) {
  if (faq.length === 0) return null;

  return (
    <div className="mt-12 md:mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
        Najczęściej zadawane pytania
      </h2>
      <div className="space-y-4">
        {faq.map((item, i) => (
          <details
            key={i}
            className="group bg-white rounded-2xl border border-zinc-200/60 overflow-hidden"
          >
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none">
              <h3 className="text-base font-semibold text-text-primary pr-4">
                {item.question}
              </h3>
              <Icon
                name="chevronDown"
                size="sm"
                className="text-text-muted shrink-0 transition-transform duration-300 group-open:rotate-180"
              />
            </summary>
            <div className="px-6 pb-5 text-text-secondary leading-relaxed">
              {item.answer}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
