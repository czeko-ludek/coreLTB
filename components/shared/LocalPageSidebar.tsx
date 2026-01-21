'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import { companyData } from '@/data/company-data';

// =============================================================================
// INTERFACES
// =============================================================================

export interface TOCItem {
  id: string;
  title: string;
  level?: number;  // 2 = H2, 3 = H3 (dla wcięć)
}

export interface LocalPageSidebarProps {
  sections: TOCItem[];
  cityNameLocative?: string;  // Odmiana miejscownikowa: "Rybniku", "Katowicach"
  activeSection?: string;
  inView?: boolean;
  showCTA?: boolean;  // Domyślnie true
}

// =============================================================================
// MAIN COMPONENT
// =============================================================================

export function LocalPageSidebar({
  sections,
  cityNameLocative,
  activeSection,
  inView = true,
  showCTA = true,
}: LocalPageSidebarProps) {
  return (
    <aside className="lg:sticky lg:top-[160px] self-start space-y-6">
      {/* Table of Contents */}
      <div
        className={clsx(
          'bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm',
          inView ? 'animate-fade-in-up' : 'opacity-0'
        )}
        style={{ animationDelay: '0.3s' }}
      >
        <h2 className="font-bold text-text-primary uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
          <Icon name="list" size="sm" className="text-primary" />
          Spis treści
        </h2>
        <nav className="space-y-2">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className={clsx(
                'block text-sm transition-colors py-1',
                section.level === 3 && 'pl-4',
                activeSection === section.id
                  ? 'text-primary font-medium'
                  : 'text-text-secondary hover:text-primary'
              )}
            >
              {section.title}
            </a>
          ))}
        </nav>
      </div>

      {/* CTA Box - Compact & Personalized (opcjonalny) */}
      {showCTA && cityNameLocative && (
        <div
          className={clsx(
            'bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-6 text-white',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.4s' }}
        >
          <h3 className="font-bold text-xl mb-3">
            Planujesz budowę w {cityNameLocative}?
          </h3>

          <p className="text-sm text-white/90 mb-5 leading-relaxed">
            Bezpłatna konsultacja i wycena. Budujemy lokalnie od 15 lat.
          </p>

          <div className="flex gap-2">
            <a
              href={`tel:${companyData.telephone}`}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm bg-white text-primary hover:bg-white/90 transition-colors"
            >
              <Icon name="phone" size="sm" />
              Zadzwoń
            </a>
            <Link
              href="/kontakt"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium text-sm bg-white/20 hover:bg-white/30 text-white transition-colors"
            >
              <Icon name="mail" size="sm" />
              Napisz
            </Link>
          </div>
        </div>
      )}
    </aside>
  );
}
