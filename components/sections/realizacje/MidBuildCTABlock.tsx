'use client';

import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
import { useInView } from 'react-intersection-observer';
import { Icon, type IconName } from '@/components/ui';
import type { MidBuildCTA } from '@/data/realizacje/types';

const CTA_CONFIG: Record<MidBuildCTA['variant'], { href: string; buttonText: string; icon: IconName }> = {
  calculator: { href: '/wycena', buttonText: 'Kalkulator wyceny', icon: 'calculator' },
  consultation: { href: '/umow-konsultacje', buttonText: 'Umów konsultację', icon: 'messageCircle' },
  plot: { href: '/analiza-dzialki', buttonText: 'Analiza działki', icon: 'map' },
};

interface MidBuildCTABlockProps {
  cta: MidBuildCTA;
}

export function MidBuildCTABlock({ cta }: MidBuildCTABlockProps) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true });
  const config = CTA_CONFIG[cta.variant];

  return (
    <div
      ref={ref}
      className={clsx(
        'my-10 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 bg-zinc-900 rounded-2xl p-6 md:p-8 items-center transition-all duration-700',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      )}
    >
      <div>
        <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] block mb-2">
          Zainteresowany?
        </span>
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{cta.headline}</h3>
        <p className="text-sm text-zinc-400">{cta.description}</p>
      </div>
      <Link
        href={config.href}
        className="group inline-flex items-center gap-3 bg-primary hover:bg-white text-zinc-900 font-bold text-sm px-6 py-3 rounded-xl transition-all duration-300 self-center"
      >
        <Icon name={config.icon} size="sm" />
        {config.buttonText}
        <div className="h-7 w-7 rounded-full bg-zinc-900 flex items-center justify-center group-hover:translate-x-1 transition-transform">
          <Icon name="arrowRight" className="text-white" size="sm" />
        </div>
      </Link>
    </div>
  );
}
