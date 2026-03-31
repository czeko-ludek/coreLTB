'use client';

import React, { useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '@/components/shared';
import { Icon } from '@/components/ui';
import { clsx } from 'clsx';
import type { GoogleReview, GoogleReviewsData } from '@/data/google-reviews';

// ─── Inline Google "G" Logo SVG ────────────────────────────────────────────
// Official Google colors, no external dependency
function GoogleLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

// ─── Aggregate Rating Bar ──────────────────────────────────────────────────
function AggregateRating({
  rating,
  totalReviews,
}: {
  rating: number;
  totalReviews: number;
}) {
  return (
    <div className="inline-flex items-center gap-3 bg-white rounded-full px-5 py-2.5 shadow-sm border border-zinc-100">
      <GoogleLogo className="w-5 h-5 flex-shrink-0" />
      <div className="flex items-center gap-2">
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Icon
              key={i}
              name="star"
              size="sm"
              className={clsx(
                'w-4 h-4',
                i < Math.floor(rating)
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-200 fill-gray-200'
              )}
            />
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-900">
          {rating.toFixed(1)}
        </span>
        <span className="text-sm text-gray-500">
          · {totalReviews} opinii
        </span>
      </div>
    </div>
  );
}

// ─── Single Review Card ────────────────────────────────────────────────────
const ReviewCard = React.memo(function ReviewCard({
  review,
  index,
}: {
  review: GoogleReview;
  index: number;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <div
      ref={ref}
      className={clsx(
        'relative bg-white rounded-2xl shadow-lg overflow-hidden group',
        'border border-zinc-100 hover:shadow-xl hover:border-primary/20',
        'transition-[shadow,border-color] duration-300',
        'p-6 lg:p-7',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      )}
      style={{
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${index * 100}ms`,
      }}
    >
      {/* Top row: Google icon + stars + date */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <GoogleLogo className="w-5 h-5 flex-shrink-0" />
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                size="sm"
                className={clsx(
                  'w-4 h-4',
                  i < review.rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-200 fill-gray-200'
                )}
              />
            ))}
          </div>
        </div>
        <span className="text-xs text-gray-400">{review.relativeDate}</span>
      </div>

      {/* Quote text */}
      <p className="text-gray-700 leading-relaxed mb-5 text-[15px]">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Separator */}
      <div className="border-t border-zinc-100 mb-4" />

      {/* Author row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Initials avatar */}
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm flex-shrink-0">
            {review.initials}
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">
              {review.author}
            </p>
            {review.company && (
              <p className="text-xs text-gray-500">{review.company}</p>
            )}
          </div>
        </div>

        {/* "Opinia Google" badge */}
        <div className="flex items-center gap-1.5 bg-gray-50 rounded-full px-3 py-1 border border-gray-100">
          <GoogleLogo className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium text-gray-500">
            Google
          </span>
        </div>
      </div>
    </div>
  );
});

// ─── Main Section Component ────────────────────────────────────────────────
export interface GoogleReviewsSectionProps {
  header: {
    label: string;
    title: string;
    theme?: 'light' | 'dark';
  };
  data: GoogleReviewsData;
  /** How many reviews to show (default: 6) */
  maxVisible?: number;
}

export function GoogleReviewsSection({
  header,
  data,
  maxVisible = 6,
}: GoogleReviewsSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Memoize the visible reviews slice to avoid re-computation on re-renders
  const visibleReviews = useMemo(
    () => data.reviews.slice(0, maxVisible),
    [data.reviews, maxVisible]
  );

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-background-beige">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={headerRef}
          className={clsx(
            'mb-6 lg:mb-8 transition-all',
            headerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          )}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <SectionHeader {...header} align="center" theme={header.theme ?? 'light'} />
        </div>

        {/* Aggregate rating pill — centered below header */}
        <div
          className={clsx(
            'flex justify-center mb-10 lg:mb-14 transition-all',
            headerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          )}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            transitionDelay: '150ms',
          }}
        >
          <AggregateRating
            rating={data.aggregateRating}
            totalReviews={data.totalReviews}
          />
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {visibleReviews.map((review, index) => (
            <ReviewCard
              key={review.author}
              review={review}
              index={index}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
