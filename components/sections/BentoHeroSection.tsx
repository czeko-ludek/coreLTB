'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';

interface HeroData {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
    ctaHref: string;
    imageSrc: string;
    stats?: { value: string; label: string }[];
}

interface BentoHeroSectionProps {
    data: HeroData;
    variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const BentoHeroSection: React.FC<BentoHeroSectionProps> = ({ data, variant = 'v1' }) => {

    // VARIANT 1: Split Screen - Image Right, Content Left
    if (variant === 'v1') {
        return (
            <section className="bg-background-cream py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Content */}
                            <div className="p-12 lg:p-16 flex flex-col justify-center">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                                    {data.subtitle}
                                </p>
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                                    {data.title}
                                </h1>
                                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                                    {data.description}
                                </p>

                                {data.stats && (
                                    <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200">
                                        {data.stats.map((stat, idx) => (
                                            <div key={idx}>
                                                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                                                <p className="text-sm text-gray-600">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    href={data.ctaHref}
                                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/30 group w-fit"
                                >
                                    {data.ctaText}
                                    <Icon name="arrowRight" className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>

                            {/* Image */}
                            <div className="relative h-96 lg:h-auto">
                                <Image
                                    src={data.imageSrc}
                                    alt={data.title}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // VARIANT 2: Overlay - Text Over Image with Gradient
    if (variant === 'v2') {
        return (
            <section className="bg-background-cream py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="relative bg-white rounded-3xl overflow-hidden shadow-xl h-[600px]">
                        {/* Background Image */}
                        <Image
                            src={data.imageSrc}
                            alt={data.title}
                            fill
                            className="object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/70 to-transparent" />

                        {/* Content */}
                        <div className="relative h-full flex items-center">
                            <div className="px-12 lg:px-16 max-w-3xl">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                                    {data.subtitle}
                                </p>
                                <h1 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
                                    {data.title}
                                </h1>
                                <p className="text-lg text-gray-200 mb-8 leading-relaxed">
                                    {data.description}
                                </p>

                                {data.stats && (
                                    <div className="flex gap-8 mb-8">
                                        {data.stats.map((stat, idx) => (
                                            <div key={idx} className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl border border-white/20">
                                                <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                                                <p className="text-sm text-gray-300">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    href={data.ctaHref}
                                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/50 group"
                                >
                                    {data.ctaText}
                                    <Icon name="arrowRight" className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // VARIANT 3: Asymmetric - Large Image with Floating Content Card
    if (variant === 'v3') {
        return (
            <section className="bg-background-cream py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="relative rounded-3xl overflow-hidden shadow-xl h-[600px]">
                        {/* Background Image */}
                        <Image
                            src={data.imageSrc}
                            alt={data.title}
                            fill
                            className="object-cover"
                        />

                        {/* Floating Content Card */}
                        <div className="absolute inset-0 flex items-center justify-start p-12 lg:p-16">
                            <div className="bg-white rounded-3xl p-10 lg:p-12 max-w-2xl shadow-2xl">
                                <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                                    {data.subtitle}
                                </p>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                                    {data.title}
                                </h1>
                                <p className="text-base text-gray-600 mb-8 leading-relaxed">
                                    {data.description}
                                </p>

                                {data.stats && (
                                    <div className="grid grid-cols-3 gap-4 mb-8 pb-8 border-b border-gray-200">
                                        {data.stats.map((stat, idx) => (
                                            <div key={idx}>
                                                <p className="text-2xl font-bold text-primary mb-1">{stat.value}</p>
                                                <p className="text-xs text-gray-600">{stat.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                <Link
                                    href={data.ctaHref}
                                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/30 group"
                                >
                                    {data.ctaText}
                                    <Icon name="arrowRight" className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // VARIANT 4: Stacked - Image Top, Content Bottom with Overlap
    if (variant === 'v4') {
        return (
            <section className="bg-background-cream py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                        {/* Image */}
                        <div className="relative h-96">
                            <Image
                                src={data.imageSrc}
                                alt={data.title}
                                fill
                                className="object-cover"
                            />
                            {/* Gradient Fade */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                        </div>

                        {/* Content - Overlapping */}
                        <div className="relative -mt-32 px-12 lg:px-16 pb-12 lg:pb-16">
                            <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-2xl border border-gray-100">
                                <div className="flex items-start justify-between gap-8 mb-6">
                                    <div className="flex-1">
                                        <p className="text-sm font-bold uppercase tracking-widest text-primary mb-4">
                                            {data.subtitle}
                                        </p>
                                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                                            {data.title}
                                        </h1>
                                        <p className="text-lg text-gray-600 leading-relaxed">
                                            {data.description}
                                        </p>
                                    </div>

                                    {data.stats && (
                                        <div className="flex gap-6">
                                            {data.stats.map((stat, idx) => (
                                                <div key={idx} className="text-center bg-gray-50 px-6 py-4 rounded-2xl min-w-[120px]">
                                                    <p className="text-3xl font-bold text-primary mb-1">{stat.value}</p>
                                                    <p className="text-sm text-gray-600">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                <Link
                                    href={data.ctaHref}
                                    className="inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/30 group"
                                >
                                    {data.ctaText}
                                    <Icon name="arrowRight" className="group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return null;
};
