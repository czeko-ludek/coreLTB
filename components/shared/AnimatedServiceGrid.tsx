'use client';

import React from 'react';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { ServiceCardSimple, ServiceCardSimpleProps } from './ServiceCardSimple';

export interface AnimatedServiceGridProps {
  items: ServiceCardSimpleProps[];
}

export function AnimatedServiceGrid({ items }: AnimatedServiceGridProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '50px 0px',
  });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
    >
      {items.map((item, index) => (
        <div
          key={item.title}
          className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
          style={{ animationDelay: `${0.1 + index * 0.1}s` }}
        >
          <ServiceCardSimple {...item} />
        </div>
      ))}
    </div>
  );
}
