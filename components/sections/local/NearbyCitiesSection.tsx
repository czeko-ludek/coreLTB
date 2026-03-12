'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

export interface NearbyCityLinkItem {
  name: string;
  slug: string;
  context?: string;
}

export interface NearbyCitiesSectionProps {
  cities: NearbyCityLinkItem[];
}

export function NearbyCitiesSection({ cities }: NearbyCitiesSectionProps) {
  if (cities.length === 0) return null;

  return (
    <section className="py-12 lg:py-16 bg-amber-50/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg font-semibold text-zinc-800 mb-6">
          Budujemy również w pobliskich miastach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {cities.map((city) => (
            <Link
              key={city.slug}
              href={`/obszar-dzialania/${city.slug}`}
              className="flex items-center gap-3 rounded-lg border border-amber-200 bg-white px-4 py-3 hover:border-primary hover:shadow-sm transition-all"
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
    </section>
  );
}
