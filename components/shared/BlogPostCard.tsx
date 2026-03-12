import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';

export interface BlogPostCardProps {
  image: { src: string; alt: string };
  category: string;
  date: string;
  title: string;
  excerpt: string;
  href: string;
}

export function BlogPostCard({
  image,
  category,
  date,
  title,
  excerpt,
  href,
}: BlogPostCardProps) {
  return (
    <Link
      href={href}
      aria-label={`Czytaj artykuł: ${title}`}
      className="group block bg-surface-light rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 h-full flex flex-col"
    >
      {/* Image section — clean, no overlays */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>

      {/* Content section */}
      <div className="p-4 sm:p-6 space-y-3 sm:space-y-4 flex flex-col flex-1">
        {/* Badges — date + category, below image */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs text-text-muted">
            <Icon name="calendar" size="sm" />
            {date}
          </span>
          <span className="px-2.5 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold uppercase">
            {category}
          </span>
        </div>

        {/* Title — smaller on mobile */}
        <h3 className="text-base sm:text-lg lg:text-h5 font-bold text-text-primary line-clamp-2 group-hover:text-primary transition-colors">
          {title}
        </h3>

        {/* Excerpt — hidden on mobile for compact cards */}
        <p className="hidden sm:block text-sm text-text-secondary leading-relaxed line-clamp-3">
          {excerpt}
        </p>

        {/* CTA */}
        <div className="mt-auto pt-2">
          <span className="inline-flex items-center gap-2 text-sm text-text-primary font-medium group-hover:text-primary transition-colors">
            Czytaj Więcej
            <Icon name="arrowRight" size="sm" className="text-primary" />
          </span>
        </div>
      </div>
    </Link>
  );
}
