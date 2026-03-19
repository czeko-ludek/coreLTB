'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared';
import { Icon } from '@/components/ui';

interface City {
    label: string;
    url?: string;
}

interface Hub {
    hubName: string;
    subLabel: string;
    iconName: 'mountain' | 'building';
    isHeadquarters: boolean;
    description: string;
    cities: City[];
}

interface BentoAreasSectionProps {
    header: {
        label: string;
        title: string;
        description: string;
    };
    hubs: Hub[];
}

export const BentoAreasSection: React.FC<BentoAreasSectionProps> = ({ header, hubs }) => {
    return (
        <section className="bg-background-cream py-16 sm:py-20 lg:py-24">
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <SectionHeader
                        label={header.label}
                        title={header.title}
                        description={header.description}
                        align="center"
                        theme="light"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {hubs.map((hub, index) => (
                        <div
                            key={index}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 lg:p-10 border-2 border-gray-200 relative"
                        >
                            <div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <Icon name={hub.iconName} className="w-9 h-9 text-primary" />
                            </div>

                            <div className="mb-6 pb-6 border-b border-gray-200">
                                <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-3">
                                    {hub.subLabel}
                                </p>

                                <h3 className="text-2xl lg:text-3xl font-bold text-text-dark leading-tight">
                                    {hub.hubName}
                                </h3>
                            </div>

                            <p className="text-gray-700 text-base leading-relaxed mb-8 font-medium">
                                {hub.description}
                            </p>

                            <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                                <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Obszar działania</p>
                                <div className="flex flex-wrap gap-2">
                                    {hub.cities.map((city, cityIndex) =>
                                        city.url ? (
                                            <Link
                                                key={cityIndex}
                                                href={city.url}
                                                className="block px-4 py-2 bg-white text-text-dark rounded-lg font-semibold text-sm border border-gray-200 transition-all hover:bg-primary hover:text-white hover:border-primary hover:shadow-md text-center"
                                            >
                                                {city.label}
                                            </Link>
                                        ) : (
                                            <span
                                                key={cityIndex}
                                                className="block px-4 py-2 bg-white text-gray-400 rounded-lg font-semibold text-sm border border-gray-100 text-center"
                                            >
                                                {city.label}
                                            </span>
                                        )
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
