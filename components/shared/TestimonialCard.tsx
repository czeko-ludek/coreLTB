import React from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui';

export interface TestimonialCardProps {
  quote: string;
  author: {
    image: { src: string; alt: string };
    name: string;
    role: string;
  };
  rating: number;
}

export function TestimonialCard({ quote, author, rating }: TestimonialCardProps) {
  return (
    <div className="bg-surface-light rounded-xl shadow-lg p-8 space-y-6">
      {/* Quote icon */}
      <Icon name="quote" size="xl" className="text-primary" />
      
      {/* Quote text */}
      <p className="text-body-lg text-text-primary leading-relaxed">
        "{quote}"
      </p>
      
      {/* Separator */}
      <div className="border-t border-border-light"></div>
      
      {/* Author and rating */}
      <div className="flex items-center justify-between">
        {/* Author info */}
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src={author.image.src}
              alt={author.image.alt}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-semibold text-text-primary">{author.name}</p>
            <p className="text-sm text-text-secondary">{author.role}</p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Icon
                key={i}
                name="star"
                size="sm"
                className={i < Math.floor(rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-text-primary">
            {rating.toFixed(1)} Ratings
          </span>
        </div>
      </div>
    </div>
  );
}

