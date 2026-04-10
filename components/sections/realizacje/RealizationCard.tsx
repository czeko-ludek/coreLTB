'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';
import type { RealizationListingItem } from '@/data/realizacje/types';

interface RealizationCardProps {
  item: RealizationListingItem;
  index: number;
}

export function RealizationCard({ item, index }: RealizationCardProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
  const isCompleted = item.status === 'completed';

  return (
    <Link
      ref={ref}
      href={`/realizacje/${item.slug}`}
      className={clsx(
        'group block bg-white rounded-2xl overflow-hidden border border-zinc-200/60 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500',
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Image */}
      <div className="aspect-[16/10] overflow-hidden relative">
        <Image
          src={item.heroImage}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Status badge */}
        <div className="absolute top-3 left-3">
          <span
            className={clsx(
              'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm backdrop-blur-sm',
              isCompleted
                ? 'bg-green-500/90 text-white'
                : 'bg-primary/90 text-zinc-900'
            )}
          >
            <span
              className={clsx(
                'w-2 h-2 rounded-full',
                isCompleted ? 'bg-green-200' : 'bg-zinc-900/40 animate-pulse'
              )}
            />
            {isCompleted ? 'Zakonczona' : 'W trakcie'}
          </span>
        </div>

      </div>

      {/* Content */}
      <div className="p-4 md:p-5">
        {/* Title + location */}
        <h3 className="text-lg font-bold text-text-primary leading-tight line-clamp-2 group-hover:text-primary transition-colors mb-1.5">
          {item.title}
        </h3>
        <div className="flex items-center gap-1.5 text-text-muted text-sm mb-4">
          <Icon name="mapPin" size="sm" className="text-primary" />
          <span>{item.location}</span>
        </div>

        {/* Spec pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg px-2.5 py-1.5">
            <Icon name="ruler" size="sm" className="text-primary" />
            {item.surfaceArea} m²
          </span>
          <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg px-2.5 py-1.5">
            <Icon name="home" size="sm" className="text-primary" />
            {item.floors}
          </span>
          <span className="inline-flex items-center gap-1 bg-zinc-100 text-zinc-700 text-xs font-medium rounded-lg px-2.5 py-1.5">
            <Icon name="brickWall" size="sm" className="text-primary" />
            {item.technology.split('—')[0].trim()}
          </span>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="text-text-muted font-medium">
              Zaawansowanie budowy
            </span>
            <span className={clsx(
              'font-bold',
              isCompleted ? 'text-green-600' : 'text-primary'
            )}>
              {item.progress}%
            </span>
          </div>
          <div className="h-1.5 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className={clsx(
                'h-full rounded-full transition-all duration-1000',
                isCompleted ? 'bg-green-500' : 'bg-primary'
              )}
              style={{ width: inView ? `${item.progress}%` : '0%' }}
            />
          </div>
        </div>

        {/* Current stage */}
        {item.currentStage && !isCompleted && (
          <p className="text-xs text-text-muted mb-3 line-clamp-1">
            Aktualnie: <span className="text-text-secondary font-medium">{item.currentStage}</span>
          </p>
        )}

        {/* CTA row */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <span className="text-sm font-bold text-primary inline-flex items-center gap-2 group-hover:gap-3 transition-all">
            {isCompleted ? 'Zobacz efekt koncowy' : 'Sledz budowe'}
          </span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-zinc-200 text-text-muted group-hover:bg-primary group-hover:border-primary group-hover:text-white transition-all duration-300">
            <Icon name="arrowRight" size="sm" />
          </span>
        </div>
      </div>
    </Link>
  );
}
