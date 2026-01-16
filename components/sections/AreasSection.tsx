'use client';

import React from 'react';
import Link from 'next/link';
import { SectionHeader } from '@/components/shared';
import { Icon, IconName } from '@/components/ui';

export interface City {
    label: string;
    url: string;
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
    };
    hubs: Hub[];
}

export const AreasSection: React.FC<AreasSectionProps> = ({ id, header, hubs }) => {
    return (
        <section id={id} className="bg-white rounded-3xl py-16 sm:py-20">
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <SectionHeader
                        label={header.label}
                        title={header.title}
                        description={header.description}
                        align="left"
                        theme="light"
                    />

                    <div className="mt-12 space-y-12">
                        {hubs.map((hub, index) => (
                            <article key={index}>
                                {/* H3 nagłówek z ikoną */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                        <Icon name={hub.iconName} className="text-primary" size="lg" />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#1a1a1a]">{hub.hubName}</h3>
                                </div>

                                {/* Opis */}
                                <p className="mb-6 text-base md:text-lg text-gray-600 leading-relaxed">
                                    {hub.description}
                                </p>

                                {/* Lista miast */}
                                <div className="flex flex-wrap gap-2">
                                    {hub.cities.map((city, cityIndex) => (
                                        <Link
                                            key={cityIndex}
                                            href={city.url}
                                            className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-primary transition-colors"
                                        >
                                            {city.label}
                                            {cityIndex < hub.cities.length - 1 && <span className="ml-2 text-gray-300">•</span>}
                                        </Link>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
