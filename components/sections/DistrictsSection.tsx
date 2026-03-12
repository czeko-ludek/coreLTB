'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
/** @deprecated Use components/sections/local/DistrictsSection instead */
interface DistrictArea {
  readonly name: string;
  readonly description?: string;
}

export interface DistrictsSectionProps {
  header: SectionHeaderProps;
  description: string;
  north?: readonly DistrictArea[];
  south?: readonly DistrictArea[];
  center?: readonly DistrictArea[];
  west?: readonly DistrictArea[];
}

export function DistrictsSection({
  header,
  description,
  north,
  south,
  center,
  west,
}: DistrictsSectionProps) {
  const [isVisible, setIsVisible] = React.useState(false);
  const sectionRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const areas = [
    { name: 'Północ', items: north, icon: '⬆️' },
    { name: 'Południe', items: south, icon: '⬇️' },
    { name: 'Centrum', items: center, icon: '📍' },
    { name: 'Zachód', items: west, icon: '⬅️' },
  ].filter((area) => area.items && area.items.length > 0);

  return (
    <section ref={sectionRef} className="bg-background-beige py-16 sm:py-20">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`mb-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
          style={{ animationDelay: '0.1s' }}
        >
          <SectionHeader {...header} />
        </div>

        {/* Description */}
        <div
          className={`max-w-4xl mx-auto text-center mb-12 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <p className="text-base md:text-lg text-text-secondary leading-relaxed">
            {description}
          </p>
        </div>

        {/* Districts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {areas.map((area, areaIndex) => (
            <div
              key={area.name}
              className={`bg-white rounded-3xl border border-gray-100 shadow-lg p-6 hover:shadow-lg hover:shadow-zinc-200/50 transition-all duration-500 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0'
              }`}
              style={{ animationDelay: `${0.3 + areaIndex * 0.1}s` }}
            >
              {/* Area Header */}
              <div className="mb-4 pb-3 border-b-2 border-primary/20">
                <h3 className="text-lg font-bold text-text-primary flex items-center gap-2">
                  <span className="text-2xl">{area.icon}</span>
                  {area.name}
                </h3>
              </div>

              {/* District List */}
              <ul className="space-y-2">
                {area.items?.map((district, index) => (
                  <li key={index} className="text-sm text-text-secondary">
                    <span className="text-primary mr-2">•</span>
                    <span className="font-medium text-text-primary">
                      {district.name}
                    </span>
                    {district.description && (
                      <span className="block ml-4 text-xs text-text-secondary/70 mt-1">
                        {district.description}
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
