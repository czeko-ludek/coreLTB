'use client';

import React from 'react';
import Image from 'next/image';

export interface CaseStudyCardProps {
  image: string;
  imageAlt: string;
  title: string;
  challenge: string;
  solution: string;
  testimonial: string;
  clientName: string;
}

export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  image,
  imageAlt,
  title,
  challenge,
  solution,
  testimonial,
  clientName,
}) => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image Placeholder */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-gray-100 to-gray-300">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-2 text-5xl">🏡</div>
            <p className="text-sm text-gray-500 font-medium">Zdjęcie realizacji</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-6 lg:p-8">
        <h3 className="mb-4 text-xl font-bold text-text sm:text-2xl">{title}</h3>

        <div className="mb-4 space-y-3">
          <div>
            <h4 className="mb-1 font-semibold text-primary">Wyzwanie:</h4>
            <p className="text-sm leading-relaxed text-text/80">{challenge}</p>
          </div>

          <div>
            <h4 className="mb-1 font-semibold text-primary">Nasze Rozwiązanie:</h4>
            <p className="text-sm leading-relaxed text-text/80">{solution}</p>
          </div>
        </div>

        {/* Testimonial */}
        <div className="mt-auto border-t border-gray-200 pt-4">
          <div className="mb-2 flex gap-1 text-primary">
            {[...Array(5)].map((_, i) => (
              <span key={i}>⭐</span>
            ))}
          </div>
          <blockquote className="mb-2 text-sm italic leading-relaxed text-text/80">
            &quot;{testimonial}&quot;
          </blockquote>
          <p className="text-sm font-semibold text-text">- {clientName}</p>
        </div>
      </div>
    </div>
  );
};
