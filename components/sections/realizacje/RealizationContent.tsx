'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import type { RealizationData } from '@/data/realizacje/types';

interface RealizationContentProps {
  data: RealizationData;
}

/**
 * TOC sidebar for realizacja detail page.
 * - Desktop: sticky sidebar with active section tracking
 * - Mobile: collapsible accordion at the top, collapsed by default
 */
export function RealizationContent({ data }: RealizationContentProps) {
  const tocItems = useMemo(() => {
    const sortedStages = [...data.stages].sort((a, b) => a.order - b.order);
    return sortedStages.map((stage) => ({
      id: `etap-${stage.id}`,
      title: `${stage.order}. ${stage.title}`,
      level: 2,
    }));
  }, [data.stages]);

  const [activeSection, setActiveSection] = useState<string>(tocItems[0]?.id || '');
  const [mobileOpen, setMobileOpen] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Close mobile TOC on link click
  const handleTocClick = useCallback(() => {
    setMobileOpen(false);
  }, []);

  useEffect(() => {
    const HEADER_OFFSET = 168;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const visibleSections = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => {
            const aTop = a.boundingClientRect.top;
            const bTop = b.boundingClientRect.top;
            return Math.abs(aTop - HEADER_OFFSET) - Math.abs(bTop - HEADER_OFFSET);
          });

        if (visibleSections.length > 0) {
          setActiveSection(visibleSections[0].target.id);
        }
      },
      {
        rootMargin: `-${HEADER_OFFSET}px 0px -50% 0px`,
        threshold: [0, 0.1, 0.5],
      }
    );

    tocItems.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [tocItems]);

  if (tocItems.length === 0) return null;

  const tocNav = (
    <nav className="space-y-1.5">
      {tocItems.map((item) => (
        <a
          key={item.id}
          href={`#${item.id}`}
          onClick={handleTocClick}
          className={clsx(
            'block text-sm transition-colors py-1 leading-snug',
            item.level === 3 && 'pl-4',
            activeSection === item.id
              ? 'text-primary font-medium'
              : 'text-text-secondary hover:text-primary'
          )}
        >
          {item.title}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      {/* Mobile: collapsible TOC — visible only < lg */}
      <div className="lg:hidden">
        <div className="bg-white rounded-2xl border border-zinc-200/60 shadow-sm overflow-hidden">
          <button
            onClick={() => setMobileOpen((v) => !v)}
            className="w-full flex items-center justify-between p-4 text-left"
          >
            <span className="font-bold text-text-primary text-sm uppercase tracking-wide flex items-center gap-2">
              <Icon name="list" size="sm" className="text-primary" />
              Spis etapow ({tocItems.length})
            </span>
            <Icon
              name="chevronDown"
              size="sm"
              className={clsx(
                'text-text-muted transition-transform duration-300',
                mobileOpen && 'rotate-180'
              )}
            />
          </button>
          <div
            className={clsx(
              'overflow-hidden transition-all duration-300 ease-in-out',
              mobileOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
            )}
          >
            <div className="px-4 pb-4">
              {tocNav}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop: sticky sidebar — visible only >= lg */}
      <aside className="hidden lg:block lg:sticky lg:top-[160px] self-start">
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm">
          <h2 className="font-bold text-text-primary uppercase tracking-wide text-sm mb-4 flex items-center gap-2">
            <Icon name="list" size="sm" className="text-primary" />
            Spis treści
          </h2>
          {tocNav}
        </div>
      </aside>
    </>
  );
}
