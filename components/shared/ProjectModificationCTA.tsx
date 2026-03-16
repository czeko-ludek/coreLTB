'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';

export function ProjectModificationCTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    rootMargin: '-100px 0px',
  });

  return (
    <section ref={ref} className="bg-background-beige py-8 sm:py-12">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
          {/* Left: Content */}
          <div
            className={clsx(
              'bg-zinc-900 rounded-2xl overflow-hidden',
              'transition-all duration-700',
              inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
            )}
          >
            <div className="p-6 md:p-8 lg:p-10 flex flex-col justify-center h-full">
              {/* Label */}
              <span
                className={clsx(
                  'text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-3',
                  'transition-all duration-500 delay-200',
                  inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-5'
                )}
              >
                Studio Adaptacji
              </span>

              {/* H2 */}
              <h2
                className={clsx(
                  'text-2xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4',
                  'transition-all duration-700 delay-300',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
                )}
              >
                ZMIANY W
                <br />
                <span className="text-primary">PROJEKCIE?</span>
              </h2>

              {/* Subtitle */}
              <p
                className={clsx(
                  'text-zinc-400 text-sm md:text-base lg:text-lg mb-4 md:mb-6 max-w-xl leading-relaxed',
                  'transition-all duration-500 delay-[400ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                Chcesz wybudować dom według tego projektu, ale potrzebujesz
                wprowadzić kilka zmian? Skorzystaj z naszego{' '}
                <strong className="text-white">Studia Adaptacji</strong> —
                bezpłatna wycena zmian i adaptacja przez ponad 100 sprawdzonych
                architektów na terenie całej Polski.
              </p>

              {/* Features */}
              <div
                className={clsx(
                  'flex flex-col gap-2.5 mb-6',
                  'transition-all duration-500 delay-500',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                {[
                  'Bezpłatna wycena zmian',
                  'Ponad 100 architektów w całej Polsce',
                  'Szybka realizacja adaptacji',
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <Icon name="check" className="text-primary" size="sm" />
                    </div>
                    <span className="text-zinc-300 text-sm md:text-base">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div
                className={clsx(
                  'transition-all duration-500 delay-[600ms]',
                  inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                )}
              >
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-sm transition-all duration-300 uppercase tracking-wider"
                >
                  Zamów Zmiany
                  <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
                    <Icon name="arrowRight" className="text-white" size="sm" />
                  </div>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <div
            className={clsx(
              'relative min-h-[250px] md:min-h-[300px] rounded-2xl overflow-hidden',
              'transition-all duration-700 delay-300',
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          >
            <Image
              src="/images/cta.webp"
              alt="Studio Adaptacji - Zmiany w projekcie domu"
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
