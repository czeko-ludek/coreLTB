import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';
import { LOCATIONS, getLocationBreadcrumb } from '@/data/plots/locations';

interface PlotsInterlinkingProps {
  activeCity: string;
}

function buildLocUrl(slug: string): string {
  const bc = getLocationBreadcrumb(slug);
  const parts = bc.filter((b) => b.level !== 'wojewodztwo').map((b) => b.slug);
  return `/dzialki/${parts.join('/')}`;
}

export function PlotsInterlinking({ activeCity }: PlotsInterlinkingProps) {
  const loc = LOCATIONS[activeCity];
  if (!loc) return null;

  const parent = loc.parentSlug ? LOCATIONS[loc.parentSlug] : null;
  const showParent = parent && parent.level !== 'wojewodztwo';
  const siblings = parent?.children
    ?.map((s) => LOCATIONS[s])
    .filter((s) => s && s.slug !== loc.slug) || [];
  const children = loc.children?.map((c) => LOCATIONS[c]).filter(Boolean) || [];
  const hasLinks = showParent || siblings.length > 0 || children.length > 0;
  if (!hasLinks) return null;

  return (
    <div className="mt-12 md:mt-16">
      <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
        Działki w okolicy
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
        {showParent && (
          <Link
            href={buildLocUrl(parent.slug)}
            className="group flex items-center gap-2 bg-white rounded-xl border border-zinc-200/60 px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <Icon name="chevronLeft" size="sm" className="text-text-muted group-hover:text-primary shrink-0" />
            <span className="text-sm font-medium text-text-primary group-hover:text-primary truncate">
              {parent.name}
            </span>
          </Link>
        )}
        {children.map((child) => (
          <Link
            key={child.slug}
            href={buildLocUrl(child.slug)}
            className="group flex items-center gap-2 bg-white rounded-xl border border-zinc-200/60 px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <Icon name="mapPin" size="sm" className="text-primary/60 group-hover:text-primary shrink-0" />
            <span className="text-sm font-medium text-text-primary group-hover:text-primary truncate">
              {child.name}
            </span>
          </Link>
        ))}
        {siblings.map((sib) => (
          <Link
            key={sib.slug}
            href={buildLocUrl(sib.slug)}
            className="group flex items-center gap-2 bg-white rounded-xl border border-zinc-200/60 px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all"
          >
            <Icon name="mapPin" size="sm" className="text-text-muted group-hover:text-primary shrink-0" />
            <span className="text-sm font-medium text-text-primary group-hover:text-primary truncate">
              {sib.name}
            </span>
          </Link>
        ))}
        <Link
          href="/dzialki"
          className="group flex items-center gap-2 bg-zinc-50 rounded-xl border border-zinc-200/60 px-4 py-3.5 hover:border-primary/40 hover:shadow-sm transition-all"
        >
          <Icon name="list" size="sm" className="text-text-muted group-hover:text-primary shrink-0" />
          <span className="text-sm font-medium text-text-secondary group-hover:text-primary truncate">
            Wszystkie działki
          </span>
        </Link>
      </div>
    </div>
  );
}
