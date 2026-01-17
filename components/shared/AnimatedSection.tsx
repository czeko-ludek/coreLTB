'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';

export interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // delay in seconds
  id?: string;
  as?: 'section' | 'div';
}

/**
 * AnimatedSection - Wrapper component for scroll-triggered fadeInUp animation
 *
 * Use this to wrap any content that should animate on scroll
 */
export function AnimatedSection({
  children,
  className,
  delay = 0.1,
  id,
  as: Component = 'section',
}: AnimatedSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  return (
    <Component
      ref={ref}
      id={id}
      className={clsx(
        className,
        inView ? 'animate-fade-in-up' : 'opacity-0'
      )}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </Component>
  );
}
