'use client';

import React from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { Icon, IconName } from '@/components/ui';
import { SectionHeader, SectionHeaderProps } from '@/components/shared/SectionHeader';

export interface ServicePillar {
  icon: IconName;
  title: string;
  description: string;
  bullets: string[];
  href: string;
  linkText: string;
}

export interface ServicePillarsSectionProps {
  header: SectionHeaderProps;
  pillars: ServicePillar[];
}

const fadeStyle = (delay?: number): React.CSSProperties => ({
  transitionProperty: 'opacity, transform',
  transitionDuration: '600ms',
  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
  ...(delay != null && { transitionDelay: `${delay}ms` }),
});

function PillarCard({ pillar, index }: { pillar: ServicePillar; index: number }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.15 });

  return (
    <Link href={pillar.href} className="group">
      <div
        ref={ref}
        className={`bg-white rounded-2xl p-8 shadow-sm group-hover:shadow-lg group-hover:ring-2 group-hover:ring-primary/20 transition-[shadow,ring-color] duration-300 flex flex-col h-full ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={fadeStyle(index * 120)}
      >
        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
          <Icon name={pillar.icon} className="text-primary" size="lg" />
        </div>

        <h3 className="text-h5 font-heading font-bold mt-4 group-hover:text-primary transition-colors">{pillar.title}</h3>
        <p className="text-body-sm text-text-secondary mt-2">{pillar.description}</p>

        <ul className="space-y-2 mt-4">
          {pillar.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2 text-body-sm text-text-secondary">
              <Icon name="check" size="sm" className="text-primary mt-0.5 shrink-0" />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>

        <span className="mt-auto pt-6 inline-flex items-center gap-2 text-primary font-bold group-hover:text-primary-dark transition-colors">
          {pillar.linkText}
          <Icon name="arrowRight" size="sm" className="transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}

export function ServicePillarsSection({ header, pillars }: ServicePillarsSectionProps) {
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section className="bg-background-beige py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={headerRef}
          className={headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          style={fadeStyle()}
        >
          <SectionHeader {...header} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {pillars.map((pillar, index) => (
            <PillarCard key={pillar.title} pillar={pillar} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
