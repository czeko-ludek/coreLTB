'use client';

import React from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Icon } from '@/components/ui';
import { clsx } from 'clsx';

export interface TestimonialCardProps {
  quote: string;
  author: {
    image: { src: string; alt: string };
    name: string;
    role: string;
  };
  rating: number;
}

export interface TestimonialsSectionProps {
  header: SectionHeaderProps;
  testimonials: TestimonialCardProps[];
}

// Determine card size based on quote length
const getCardSize = (quote: string): 'lg' | 'md' | 'sm' => {
  if (quote.length > 200) return 'lg';
  if (quote.length > 100) return 'md';
  return 'sm';
};

// Single Testimonial Card — pure CSS animation, no Framer Motion
function TestimonialCard({
  quote,
  author,
  rating,
  index
}: TestimonialCardProps & { index: number }) {
  const size = getCardSize(quote);
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  const paddingClass = {
    lg: 'p-8',
    md: 'p-6',
    sm: 'p-5',
  }[size];

  return (
    <div
      ref={ref}
      className={clsx(
        'relative bg-white rounded-2xl shadow-lg overflow-hidden group',
        'border border-zinc-100 hover:shadow-xl hover:border-primary/20',
        'transition-[shadow,border-color] duration-300',
        paddingClass,
        // CSS fade-in: start invisible, animate when inView
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4',
      )}
      style={{
        transitionProperty: 'opacity, transform, box-shadow, border-color',
        transitionDuration: '600ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        transitionDelay: `${index * 80}ms`,
      }}
    >
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent pointer-events-none" />

      {/* Quote icon */}
      <div className="relative mb-4">
        <Icon name="quote" size="xl" className="text-primary/30" />
      </div>

      {/* Quote text */}
      <p className="relative text-gray-700 leading-relaxed mb-6">
        &ldquo;{quote}&rdquo;
      </p>

      {/* Separator */}
      <div className="border-t border-zinc-100 mb-4" />

      {/* Author and rating */}
      <div className="relative flex items-center justify-between">
        {/* Author info */}
        <div className="flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-full overflow-hidden ring-2 ring-primary/10">
            <Image
              src={author.image.src}
              alt={author.image.alt}
              fill
              className="object-cover"
              sizes="44px"
            />
          </div>
          <div>
            <p className="font-semibold text-gray-900 text-sm">{author.name}</p>
            <p className="text-xs text-text-muted">{author.role}</p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5">
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
          <span className="text-xs font-medium text-text-muted ml-1">
            {rating.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TestimonialsSection({ header, testimonials }: TestimonialsSectionProps) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="relative py-16 lg:py-24 overflow-hidden bg-background-beige">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          ref={ref}
          className={clsx(
            'mb-12 lg:mb-16 transition-all duration-600',
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          )}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* Grid 2×2 (mobile 1 col, tablet+ 2 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={`${testimonial.author.name}-${index}`} {...testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
