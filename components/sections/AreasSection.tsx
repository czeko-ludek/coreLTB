'use client';

import React, { useMemo } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { SectionHeader } from '@/components/shared';
import { Icon, IconName } from '@/components/ui';
import { clsx } from 'clsx';

export interface City {
    label: string;
    url?: string;
    context?: string;
}

export interface Hub {
    hubName: string;
    subLabel: string;
    iconName: IconName;
    description: string;
    cities: City[];
}

export interface AreasSectionProps {
    id?: string;
    header: {
        label: string;
        title: string;
        description?: string;
        align?: 'left' | 'center';
        theme?: 'light' | 'dark';
    };
    hubs: Hub[];
}

/* ── City card (memoized to avoid re-renders on parent animation) ── */
const CityCard = React.memo<{ city: City }>(({ city }) => {
    const inner = (
        <>
            <Icon name="mapPin" className="h-5 w-5 text-primary shrink-0" />
            <div>
                <span className="text-sm font-medium text-zinc-800">{city.label}</span>
                {city.context && (
                    <span className="block text-xs text-zinc-500">{city.context}</span>
                )}
            </div>
        </>
    );

    const baseClasses =
        'flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 transition-all';
    const hoverClasses = city.url
        ? 'hover:border-primary hover:bg-primary/5 hover:shadow-sm'
        : '';

    if (city.url && city.url !== '#') {
        return (
            <Link href={city.url} className={clsx(baseClasses, hoverClasses)}>
                {inner}
            </Link>
        );
    }

    return <div className={baseClasses}>{inner}</div>;
});
CityCard.displayName = 'CityCard';

export const AreasSection: React.FC<AreasSectionProps> = ({ id, header, hubs }) => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '50px 0px',
    });

    /* Memoize grid column class based on max city count across hubs */
    const gridCols = useMemo(() => {
        const maxCities = Math.max(...hubs.map((h) => h.cities.length));
        if (maxCities <= 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
        if (maxCities <= 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4';
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
    }, [hubs]);

    return (
        <section id={id} ref={ref} className="bg-white rounded-3xl py-16 sm:py-20">
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                <div
                    className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
                    style={{ animationDelay: '0.1s' }}
                >
                    <SectionHeader
                        label={header.label}
                        title={header.title}
                        description={header.description}
                        align={header.align ?? 'left'}
                        theme={header.theme ?? 'light'}
                    />
                </div>

                <div className="mt-12 space-y-12">
                    {hubs.map((hub, index) => (
                        <article
                            key={index}
                            className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
                            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
                        >
                            {/* Hub header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                    <Icon name={hub.iconName} className="text-primary" size="md" />
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold text-zinc-800">
                                    {hub.hubName}
                                </h3>
                            </div>

                            {/* Hub description */}
                            <p className="mb-6 text-base text-zinc-600 leading-relaxed max-w-2xl">
                                {hub.description}
                            </p>

                            {/* City cards grid */}
                            <div className={clsx('grid gap-3', gridCols)}>
                                {hub.cities.map((city) => (
                                    <CityCard key={city.label} city={city} />
                                ))}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
