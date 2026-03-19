import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';
import { type ProjectSource } from '@/data/projects';

/** Label kolekcji — kolor tła zależny od źródła */
const SOURCE_BADGE: Record<string, { label: string; bg: string }> = {
  z500:         { label: 'Z500',          bg: '#d9308a' },
  galeriadomow: { label: 'Galeria Domów', bg: '#e75c55' },
};

export interface ProjectCardProps {
  slug: string;
  alt: string;
  title: string;
  price: string;
  surfaceArea: string;
  technology: string;
  source?: ProjectSource;
}

export function ProjectCard({
  slug,
  alt,
  title,
  price,
  surfaceArea,
  technology,
  source,
}: ProjectCardProps) {
  const thumbnailPath = `/images/projekty/${slug}/thumbnail.webp`;
  const sourceBadge = source ? SOURCE_BADGE[source] : undefined;

  return (
    <Link
      href={`/projekty/${slug}`}
      className="group relative bg-white rounded-2xl border border-zinc-200/60 overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image with technology badge */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={thumbnailPath}
          alt={alt}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
        />

        {/* Badge kolekcji - lewy górny */}
        {sourceBadge && (
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-md shadow-sm"
              style={{ backgroundColor: sourceBadge.bg }}
            >
              {sourceBadge.label}
            </span>
          </div>
        )}

        {/* Technology badge - bottom right */}
        <div className="absolute bottom-4 right-4 z-10">
          <span className="bg-zinc-800/90 text-white text-xs font-medium px-3 py-1.5 rounded-full">
            {technology}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Title */}
        <h3 className="text-lg font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors duration-300 mb-3">
          {title}
        </h3>

        {/* Details row: Surface area (left) + Price (right) */}
        <div className="flex items-baseline justify-between gap-3 mt-auto">
          <div>
            <p className="text-[0.7rem] text-text-muted uppercase tracking-wide mb-0.5">
              Powierzchnia
            </p>
            <p className="text-sm font-bold text-text-primary">
              {surfaceArea}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[0.7rem] text-text-muted uppercase tracking-wide mb-0.5">
              Cena
            </p>
            <p className="text-sm font-bold text-primary">
              {price}
            </p>
          </div>
        </div>

        {/* CTA divider + link */}
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
}
