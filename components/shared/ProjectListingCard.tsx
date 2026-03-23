'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import { Icon } from '@/components/ui';
import { type ProjectCategory, type ProjectTechnology, type ProjectSource } from '@/data/projects';

export interface ProjectListingCardProps {
  slug: string;
  id: string;
  title: string;
  category: ProjectCategory;
  technology: ProjectTechnology;
  surfaceArea: string;
  estimatedBuildCost?: string;
  price: string;
  thumbnailSrc?: string;
  source?: ProjectSource;
  inView?: boolean;
  delay?: number;
  priority?: boolean;
}

/** Label kolekcji — kolor i styl zależny od źródła */
const SOURCE_BADGE: Record<string, { label: string; color: string; outline?: boolean }> = {
  z500:         { label: 'Z500',          color: '#d9308a' },
  galeriadomow: { label: 'Galeria Domów', color: '#e75c55' },
  malachit:     { label: 'Malachit',      color: '#CF006D', outline: true },
};

// O(1) lookup — zawiera WSZYSTKIE możliwe kategorie (nie tylko filtrowalne)
const CATEGORY_LABEL: Record<string, string> = {
  jednorodzinny: 'Jednorodzinny',
  dwulokalowy: 'Dwulokalowy',
  'z-poddaszem': 'Z poddaszem',
  parterowy: 'Parterowy',
};

export const ProjectListingCard = React.memo(function ProjectListingCard({
  slug,
  id,
  title,
  category,
  technology,
  surfaceArea,
  // estimatedBuildCost — kept in interface for future use
  price,
  thumbnailSrc,
  source,
  inView = true,
  delay = 0,
  priority = false,
}: ProjectListingCardProps) {
  const sourceBadge = source ? SOURCE_BADGE[source] : undefined;
  const imageSrc = thumbnailSrc || `/images/projekty/${slug}/thumbnail.webp`;

  return (
    <Link
      href={`/projekty/${slug}`}
      className={clsx(
        'group relative bg-white rounded-2xl border border-zinc-200/60',
        'overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50',
        'transition-all duration-500 flex flex-col h-full',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: delay > 0 ? `${delay}s` : undefined }}
    >
      {/* Obrazek z badge'ami */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={imageSrc}
          alt={title}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Badge kolekcji - lewy górny */}
        {sourceBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-sm"
              style={sourceBadge.outline
                ? { backgroundColor: '#fff', color: sourceBadge.color, border: `2px solid ${sourceBadge.color}` }
                : { backgroundColor: sourceBadge.color, color: '#fff' }
              }
            >
              {sourceBadge.label}
            </span>
          </div>
        )}

        {/* Badge technologii - prawy dolny */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="bg-zinc-800/90 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {technology}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* ID projektu */}
        <span className="text-xs text-text-muted uppercase tracking-wider mb-1">
          Projekt {id}
        </span>

        {/* Tytuł + Cena */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-300 flex-1">
            {title}
          </h3>
          {/* Cena projektu - badge */}
          <div className="flex-shrink-0 bg-primary text-white px-3 py-1.5 rounded-lg">
            <p className="text-lg font-bold whitespace-nowrap">
              {price}
            </p>
          </div>
        </div>

        {/* Detale - grid 2 kolumny */}
        <div className="grid grid-cols-2 gap-3 mt-auto">
          <div className="bg-zinc-50 rounded-lg p-3">
            <p className="text-[0.7rem] text-text-muted uppercase tracking-wide mb-0.5">
              Typ
            </p>
            <p className="text-sm font-bold text-text-primary">
              {CATEGORY_LABEL[category] ?? category}
            </p>
          </div>
          <div className="bg-zinc-50 rounded-lg p-3">
            <p className="text-[0.7rem] text-text-muted uppercase tracking-wide mb-0.5">
              Powierzchnia
            </p>
            <p className="text-sm font-bold text-text-primary">
              {surfaceArea}
            </p>
          </div>
        </div>

        {/* Link "Zobacz projekt" */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-zinc-100">
          <span className="text-sm font-medium text-primary group-hover:text-primary-dark transition-colors">
            Zobacz projekt
          </span>
          <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
            <Icon name="arrowRight" size="sm" />
          </span>
        </div>
      </div>
    </Link>
  );
});
