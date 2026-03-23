'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';

const reasons = [
  {
    icon: 'building' as const,
    stat: '150+',
    title: 'Wolumen inwestycji',
    description:
      'Ponad 150 oddanych inwestycji to stały strumień zamówień dla naszych partnerów — materiałowych, projektowych i instalacyjnych.',
  },
  {
    icon: 'briefcase' as const,
    stat: '14 dni',
    title: 'Terminowe płatności',
    description:
      'Jesteśmy rzetelnym płatnikiem. Faktury regulujemy w ciągu 14 dni, bo wiemy, że płynność finansowa partnera to stabilność naszych budów.',
  },
  {
    icon: 'users' as const,
    stat: '5+ lat',
    title: 'Długofalowe relacje',
    description:
      'Nie szukamy najtańszych ofert co sezon. Budujemy wieloletnie partnerstwa oparte na wzajemnym zaufaniu i powtarzalnej jakości.',
  },
];

export function WhyPartnerSection() {
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
                  inView
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-5'
                )}
              >
                Dlaczego z nami?
              </span>

              {/* H2 */}
              <h2
                className={clsx(
                  'text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[0.95] mb-4',
                  'transition-all duration-700 delay-300',
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-5'
                )}
              >
                PARTNERSTWO,
                <br />
                <span className="text-primary">KTÓRE SIĘ OPŁACA</span>
              </h2>

              {/* Subtitle */}
              <p
                className={clsx(
                  'text-zinc-400 text-base md:text-lg mb-8 max-w-xl',
                  'transition-all duration-500 delay-[400ms]',
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
              >
                Nasi partnerzy wiedzą, że współpraca z CoreLTB to przewidywalny
                biznes. Oto co nas wyróżnia:
              </p>

              {/* Reason cards */}
              <div className="space-y-4 mb-8">
                {reasons.map((reason, index) => (
                  <div
                    key={reason.title}
                    className={clsx(
                      'flex items-start gap-4 p-4 rounded-xl bg-zinc-800/50 border border-zinc-700/50',
                      'transition-all duration-500',
                      inView
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-5'
                    )}
                    style={{
                      transitionDelay: `${500 + index * 100}ms`,
                    }}
                  >
                    <div className="h-11 w-11 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                      <Icon
                        name={reason.icon}
                        className="text-zinc-900"
                        size="md"
                      />
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="text-primary font-black text-lg">
                          {reason.stat}
                        </span>
                        <h3 className="text-white font-bold text-sm">
                          {reason.title}
                        </h3>
                      </div>
                      <p className="text-zinc-400 text-sm leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div
                className={clsx(
                  'transition-all duration-500 delay-[800ms]',
                  inView
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                )}
              >
                <Link
                  href="/kontakt"
                  className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300"
                >
                  Zostań partnerem
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
              'relative min-h-[300px] rounded-2xl overflow-hidden',
              'transition-all duration-700 delay-300',
              inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            )}
          >
            <Image
              src="/images/cta.webp"
              alt="Współpraca partnerska CoreLTB Builders"
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
