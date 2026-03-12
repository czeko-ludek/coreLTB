'use client';

import { SectionHeader } from '@/components/shared/SectionHeader';
import type { SectionHeaderProps } from '@/components/shared/SectionHeader';
import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export interface DistrictItem {
  label: string;
  href?: string;
}

export interface NearbyCityLinkItem {
  name: string;
  slug: string;
  context?: string;
}

export interface DistrictsSectionProps {
  header: SectionHeaderProps;
  items: DistrictItem[];
  hubDescription: string;
  nearbyCities?: NearbyCityLinkItem[];
}

export function DistrictsSection({ header, items, hubDescription, nearbyCities }: DistrictsSectionProps) {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader {...header} />
        <p className="mt-4 mb-8 text-zinc-600 max-w-2xl">
          {hubDescription}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {items.map((district) =>
            district.href ? (
              <Link
                key={district.label}
                href={district.href}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-700 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {district.label}
              </Link>
            ) : (
              <div
                key={district.label}
                className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-center text-sm font-medium text-zinc-700 hover:border-primary hover:bg-primary/5 transition-colors"
              >
                {district.label}
              </div>
            )
          )}
        </div>

        {/* Nearby cities — interlinking SEO */}
        {nearbyCities && nearbyCities.length > 0 && (
          <div className="mt-12 pt-10 border-t border-zinc-100">
            <h3 className="text-lg font-semibold text-zinc-800 mb-6">
              Budujemy również w pobliskich miastach
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {nearbyCities.map((city) => (
                <Link
                  key={city.slug}
                  href={`/obszar-dzialania/${city.slug}`}
                  className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 hover:border-primary hover:bg-primary/5 hover:shadow-sm transition-all"
                >
                  <Icon name="mapPin" className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-zinc-800">{city.name}</span>
                    {city.context && (
                      <span className="block text-xs text-zinc-500">{city.context}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
