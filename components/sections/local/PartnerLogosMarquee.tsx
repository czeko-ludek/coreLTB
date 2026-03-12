'use client';

import React from 'react';
import Image from 'next/image';

export interface PartnerLogoItem {
  name: string;
  image?: string;
}

export interface PartnerLogosMarqueeProps {
  label?: string;
  logos: PartnerLogoItem[];
}

export function PartnerLogosMarquee({
  label = 'Zaufali nam',
  logos,
}: PartnerLogosMarqueeProps) {
  // Duplicate logos for seamless loop
  const doubled = [...logos, ...logos];

  return (
    <section className="bg-white py-6 lg:py-8 overflow-hidden border-y border-zinc-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 mb-4">
        <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center">
          {label}
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Scrolling track */}
        <div className="flex animate-marquee">
          {doubled.map((logo, i) => (
            <div
              key={`${logo.name}-${i}`}
              className="flex-shrink-0 mx-6 lg:mx-10 flex items-center justify-center h-10"
            >
              {logo.image ? (
                <Image
                  src={logo.image}
                  alt={logo.name}
                  width={120}
                  height={40}
                  className="h-8 lg:h-10 w-auto object-contain grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="text-zinc-300 font-bold text-sm lg:text-base tracking-wide whitespace-nowrap hover:text-zinc-500 transition-colors duration-300">
                  {logo.name}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
