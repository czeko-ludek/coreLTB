'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
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

// Single Testimonial Card with animations
function TestimonialCard({
  quote,
  author,
  rating,
  index
}: TestimonialCardProps & { index: number }) {
  const size = getCardSize(quote);

  const paddingClass = {
    lg: 'p-8',
    md: 'p-6',
    sm: 'p-5',
  }[size];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={clsx(
        'relative bg-white rounded-2xl shadow-lg overflow-hidden group',
        'border border-zinc-100 hover:shadow-xl hover:border-primary/20 transition-all duration-300',
        paddingClass
      )}
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
    </motion.div>
  );
}

export function TestimonialsSection({ header, testimonials }: TestimonialsSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className="relative py-16 lg:py-24 overflow-hidden bg-background-beige"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div
          className={clsx(
            'mb-12 lg:mb-16',
            inView ? 'animate-fade-in-up' : 'opacity-0'
          )}
          style={{ animationDelay: '0.1s' }}
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
