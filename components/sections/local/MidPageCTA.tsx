'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Icon } from '@/components/ui';

export interface MidPageCTAProps {
  headline: string;
  highlightedText: string;
  phone: string;
  image?: string;
  buttons: Array<{ text: string; href: string; variant: 'primary' | 'outline-white' }>;
}

const fadeStyle = (delay?: number): React.CSSProperties => ({
  transitionProperty: 'opacity, transform',
  transitionDuration: '600ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  ...(delay != null && { transitionDelay: `${delay}ms` }),
});

export function MidPageCTA({ headline, highlightedText, phone, image, buttons }: MidPageCTAProps) {
  const { ref: leftRef, inView: leftInView } = useInView({ triggerOnce: true, threshold: 0.15 });
  const { ref: rightRef, inView: rightInView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <section className="py-6 md:py-8 bg-background-beige">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left: Content */}
          <div
            ref={leftRef}
            className={`bg-zinc-900 rounded-2xl overflow-hidden ${leftInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={fadeStyle()}
          >
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
              <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3">
                Bezpłatna konsultacja
              </span>

              <h2 className="text-3xl md:text-4xl font-black text-white leading-tight mb-4">
                {headline}
                <br />
                <span className="text-primary">{highlightedText}</span>
              </h2>

              <p className="text-zinc-400 text-base mb-6 max-w-md">
                Porozmawiajmy o Twoim projekcie. Sprawdzimy teren, dobierzemy technologię i przedstawimy kosztorys.
              </p>

              {/* Phone */}
              <a
                href={`tel:${phone.replace(/\s/g, '')}`}
                className="group flex items-center gap-3 mb-6"
              >
                <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Icon name="phone" className="text-zinc-900" size="md" />
                </div>
                <div>
                  <div className="text-zinc-500 text-[10px] uppercase tracking-wider font-bold">
                    Telefon
                  </div>
                  <div className="text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {phone}
                  </div>
                </div>
              </a>

              {/* Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                {buttons.map((btn) => (
                  <Link
                    key={btn.text}
                    href={btn.href}
                    className={
                      btn.variant === 'primary'
                        ? 'group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300'
                        : 'inline-flex items-center gap-2 text-white border border-zinc-600 hover:border-primary hover:text-primary font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300'
                    }
                  >
                    {btn.text}
                    {btn.variant === 'primary' && (
                      <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                        <Icon name="arrowRight" className="text-white" size="sm" />
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div
            ref={rightRef}
            className={`relative min-h-[300px] rounded-2xl overflow-hidden ${rightInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            style={fadeStyle(150)}
          >
            <Image
              src={image || '/images/cta.webp'}
              alt="CoreLTB Builders - Budowa domu"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
