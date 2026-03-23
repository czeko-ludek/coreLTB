'use client';

import React, { useState, useMemo, useCallback } from 'react';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';
import type { Partner, PartnerCategory } from '@/data/partners';

// =============================================================================
// TYPES
// =============================================================================

interface CategoryTab {
  value: PartnerCategory | 'all';
  label: string;
  count: number;
}

export interface PartnersGridSectionProps {
  partners: Partner[];
  categories: { value: PartnerCategory; label: string; count: number }[];
}

// =============================================================================
// PARTNER ROW — logo left, content right
// =============================================================================

function PartnerRow({
  partner,
  index,
  isEven,
}: {
  partner: Partner;
  index: number;
  isEven: boolean;
}) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.08 });

  return (
    <article
      ref={ref}
      id={partner.slug}
      className={clsx(
        'rounded-2xl border border-zinc-100 shadow-md overflow-hidden',
        'hover:shadow-xl hover:border-primary/20',
        'transition-all duration-600',
        isEven ? 'bg-white' : 'bg-zinc-50/50',
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      )}
      style={{
        transitionDelay: `${index * 80}ms`,
      }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] items-stretch">
        {/* Left — Logo */}
        <div className="relative flex items-center justify-center p-8 lg:p-10 bg-white border-b lg:border-b-0 lg:border-r border-zinc-100 min-h-[180px] lg:min-h-[240px]">
          {/* Subtle decorative gradient */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(223,187,104,0.04)_0%,transparent_70%)] pointer-events-none" />
          <Image
            src={partner.logo}
            alt={`Logo ${partner.name}`}
            width={Math.round(240 * (partner.logoScale ?? 1))}
            height={Math.round(120 * (partner.logoScale ?? 1))}
            className="relative z-10 w-auto object-contain"
            style={{ maxHeight: `${Math.round(112 * (partner.logoScale ?? 1))}px` }}
          />
        </div>

        {/* Right — Content */}
        <div className="p-6 lg:p-8 flex flex-col justify-center">
          {/* Name */}
          <h3 className="text-xl lg:text-2xl font-bold font-heading text-zinc-900 leading-tight mb-2">
            {partner.name}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-sm text-zinc-500 mb-4">
            <Icon name="mapPin" size="sm" className="text-primary flex-shrink-0" />
            <span>{partner.location}</span>
          </div>

          {/* Description */}
          <div className="space-y-3 mb-5">
            {partner.description.map((paragraph, i) => (
              <p key={i} className="text-sm lg:text-base text-zinc-600 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Services */}
          <div className="mb-5">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">
              Zakres współpracy
            </h4>
            <div className="flex flex-wrap gap-2">
              {partner.services.map((service) => (
                <span
                  key={service}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-700 bg-zinc-100 px-3 py-1.5 rounded-full"
                >
                  <Icon
                    name="check"
                    size="sm"
                    className="text-primary flex-shrink-0 w-3 h-3"
                  />
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Website link */}
          {partner.website && (
            <a
              href={partner.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
            >
              <Icon name="externalLink" size="sm" />
              <span>Odwiedź stronę partnera</span>
              <Icon
                name="arrowRight"
                size="sm"
                className="group-hover:translate-x-1 transition-transform"
              />
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

// =============================================================================
// MAIN SECTION
// =============================================================================

export function PartnersGridSection({
  partners,
  categories,
}: PartnersGridSectionProps) {
  const [activeCategory, setActiveCategory] = useState<
    PartnerCategory | 'all'
  >('all');

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Build tabs array with "all"
  const tabs: CategoryTab[] = useMemo(
    () => [
      { value: 'all', label: 'Wszyscy', count: partners.length },
      ...categories,
    ],
    [categories, partners.length]
  );

  // Filter partners
  const filteredPartners = useMemo(
    () =>
      activeCategory === 'all'
        ? partners
        : partners.filter((p) => p.category === activeCategory),
    [activeCategory, partners]
  );

  const handleCategoryChange = useCallback(
    (cat: PartnerCategory | 'all') => {
      setActiveCategory(cat);
    },
    []
  );

  return (
    <section className="bg-background-light py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[80rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={headerRef}
          className={clsx(
            'text-center mb-10 lg:mb-14',
            'transition-all duration-600',
            headerInView
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          )}
          style={{
            transitionProperty: 'opacity, transform',
            transitionDuration: '600ms',
            transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <h2 className="text-h3 md:text-h2 lg:text-display font-bold font-heading text-zinc-900 leading-[1.1] mb-4">
            Budujemy razem
            <span className="text-primary"> z najlepszymi</span>
          </h2>
          <p className="text-base md:text-lg text-zinc-600 max-w-3xl mx-auto leading-relaxed">
            Każda inwestycja to praca zespołowa. Dlatego otaczamy się sprawdzonymi firmami,
            które dzielą nasze podejście do jakości, terminowości i transparentności. Oto nasi
            partnerzy — razem tworzymy ekosystem, który daje Inwestorowi spokojny sen.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 lg:mb-14">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => handleCategoryChange(tab.value)}
              className={clsx(
                'px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300',
                'border',
                activeCategory === tab.value
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : 'bg-white text-zinc-600 border-zinc-200 hover:border-zinc-400 hover:text-zinc-900'
              )}
            >
              {tab.label}
              <span
                className={clsx(
                  'ml-1.5 text-xs',
                  activeCategory === tab.value
                    ? 'text-zinc-400'
                    : 'text-zinc-400'
                )}
              >
                ({tab.count})
              </span>
            </button>
          ))}
        </div>

        {/* Partners list — one per row */}
        <div className="flex flex-col gap-6">
          {filteredPartners.map((partner, index) => (
            <PartnerRow
              key={partner.slug}
              partner={partner}
              index={index}
              isEven={index % 2 === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
