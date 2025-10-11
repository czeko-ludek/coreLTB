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
    <div className="group bg-surface-light rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      {/* Image section */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={image.src}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="px-3 py-1 rounded-sm bg-white/90 text-text-primary text-xs font-semibold flex items-center gap-1">
            <Icon name="calendar" size="sm" />
            {date}
          </span>
          <span className="px-3 py-1 rounded-sm bg-primary text-white text-xs font-semibold uppercase">
            {category}
          </span>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-4">
        <h3 className="text-h3 font-bold text-text-primary group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-body-sm text-text-secondary leading-relaxed">
          {excerpt}
        </p>
        
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-text-primary font-medium group-hover:text-primary transition-colors"
        >
          Czytaj Więcej
          <Icon name="arrowRight" size="sm" className="text-primary" />
        </Link>
      </div>
    </div>
  );
}

