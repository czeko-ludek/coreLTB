'use client';

import React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export interface PartnerLogoItem {
  name: string;
  image?: string;
  /** Scale multiplier for square/tall logos (default 1). */
  scale?: number;
  /** Slug for anchor link (scrolls to #slug on click). */
  slug?: string;
}

export interface PartnerLogosMarqueeProps {
  label?: string;
  logos: PartnerLogoItem[];
}

export function PartnerLogosMarquee({
  label = 'Zaufali nam',
  logos,
}: PartnerLogosMarqueeProps) {
  const pathname = usePathname();
  const isPartnersPage = pathname === '/partnerzy';

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

        {/* Scrolling track — w-max prevents flex from being constrained to parent width */}
        <div className="flex items-center w-max animate-marquee">
          {doubled.map((logo, i) => {
            const scale = logo.scale ?? 1;
            const h = Math.round(56 * scale);
            const w = Math.round(160 * scale);

            const img = logo.image ? (
              <Image
                src={logo.image}
                alt={logo.name}
                width={w}
                height={h}
                className="w-auto object-contain hover:scale-110 transition-transform duration-300"
                style={{ height: `${h}px` }}
              />
            ) : (
              <span className="text-zinc-300 font-bold text-sm lg:text-base tracking-wide whitespace-nowrap hover:text-zinc-500 transition-colors duration-300">
                {logo.name}
              </span>
            );

            return (
              <div
                key={`${logo.name}-${i}`}
                className="flex-shrink-0 mx-6 lg:mx-10 flex items-center justify-center"
              >
                {logo.slug ? (
                  <a
                    href={isPartnersPage ? `#${logo.slug}` : `/partnerzy#${logo.slug}`}
                    className="cursor-pointer"
                    onClick={isPartnersPage ? (e) => {
                      e.preventDefault();
                      const el = document.getElementById(logo.slug!);
                      if (el) {
                        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                      }
                    } : undefined}
                  >
                    {img}
                  </a>
                ) : (
                  img
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
