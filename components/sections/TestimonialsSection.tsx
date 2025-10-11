import React from 'react';
import { SectionHeader, SectionHeaderProps, TestimonialCard, TestimonialCardProps } from '@/components/shared';

export interface TestimonialsSectionProps {
  header: SectionHeaderProps;
  testimonials: TestimonialCardProps[];
}

export function TestimonialsSection({ header, testimonials }: TestimonialsSectionProps) {
  return (
    <section className="section-with-bg py-20">
      <div className="container mx-auto px-4">
        <SectionHeader {...header} align="center" theme="light" />
        
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

