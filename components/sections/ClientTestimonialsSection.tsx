'use client';

import React from 'react';
import { TestimonialCard, TestimonialCardProps } from '@/components/shared';
import { useInView } from 'react-intersection-observer';

export interface ClientTestimonialsSectionProps {
  headline: string;
  introText: string;
  testimonials: TestimonialCardProps[];
}

export const ClientTestimonialsSection: React.FC<ClientTestimonialsSectionProps> = ({
  headline,
  introText,
  testimonials,
}) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section ref={ref} className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-text sm:text-4xl lg:text-5xl">
            {headline}
          </h2>
          <p className="mx-auto max-w-3xl text-lg text-text/80">{introText}</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => {
            const delay = index * 100;
            return (
              <div
                key={index}
                className={`transition-all duration-700 ${
                  inView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                <TestimonialCard {...testimonial} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
