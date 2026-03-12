import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center gap-2 text-sm flex-wrap">
        {items.map((crumb, index) => (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && (
              <Icon name="chevronRight" size="sm" className="text-text-muted" />
            )}
            {crumb.href && index !== items.length - 1 ? (
              <Link
                href={crumb.href}
                className="text-text-muted hover:text-primary transition-colors"
              >
                {crumb.label}
              </Link>
            ) : (
              <span className="text-text-primary font-medium">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
