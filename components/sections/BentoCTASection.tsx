'use client';

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/components/ui';

interface CTABenefit {
    text: string;
}

interface BentoCTASectionProps {
    title: string;
    subtitle: string;
    benefits: CTABenefit[];
    disclaimer: string;
    phoneText: string;
    phoneHref: string;
    emailText: string;
    emailHref: string;
    variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const BentoCTASection: React.FC<BentoCTASectionProps> = ({
    title,
    subtitle,
    benefits,
    disclaimer,
    phoneText,
    phoneHref,
    emailText,
    emailHref,
    variant = 'v1'
}) => {

    // VARIANT 1: Centered Card - Clean & Professional
    if (variant === 'v1') {
        return (
            <section className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl border border-gray-100">
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
                                <Icon name="phone" className="w-8 h-8 text-primary" />
                            </div>
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-600">
                                {subtitle}
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="space-y-4 mb-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <Icon name="check" className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
                                    <p className="text-base text-gray-700">{benefit.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <p className="text-sm text-gray-500 italic mb-8 text-center">
                            {disclaimer}
                        </p>

                        {/* CTA Buttons */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <Link
                                href={phoneHref}
                                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-6 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/30"
                            >
                                <Icon name="phone" className="w-5 h-5" />
                                {phoneText}
                            </Link>
                            <Link
                                href={emailHref}
                                className="flex items-center justify-center gap-3 bg-gray-100 hover:bg-gray-200 text-gray-900 px-6 py-4 rounded-xl font-bold transition-all"
                            >
                                <Icon name="mail" className="w-5 h-5" />
                                {emailText}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // VARIANT 2: Split Layout - Benefits Left, CTA Right
    if (variant === 'v2') {
        return (
            <section className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
                        <div className="grid lg:grid-cols-2 gap-0">
                            {/* Left - Content */}
                            <div className="p-10 lg:p-12 bg-gradient-to-br from-gray-50 to-white">
                                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                    {title}
                                </h2>
                                <p className="text-lg text-gray-600 mb-8">
                                    {subtitle}
                                </p>

                                <div className="space-y-4">
                                    {benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-white p-4 rounded-xl border border-gray-100">
                                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                <Icon name="check" className="w-4 h-4 text-primary" />
                                            </div>
                                            <p className="text-base text-gray-700">{benefit.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right - CTA */}
                            <div className="p-10 lg:p-12 bg-primary flex flex-col justify-center">
                                <div className="text-center mb-8">
                                    <Icon name="phone" className="w-16 h-16 text-white mx-auto mb-4" />
                                    <p className="text-white/90 text-lg mb-2">{disclaimer}</p>
                                </div>

                                <div className="space-y-4">
                                    <Link
                                        href={phoneHref}
                                        className="flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-primary px-6 py-4 rounded-xl font-bold transition-all w-full"
                                    >
                                        <Icon name="phone" className="w-5 h-5" />
                                        {phoneText}
                                    </Link>
                                    <Link
                                        href={emailHref}
                                        className="flex items-center justify-center gap-3 bg-primary-dark hover:bg-primary text-white px-6 py-4 rounded-xl font-bold transition-all border-2 border-white/20 w-full"
                                    >
                                        <Icon name="mail" className="w-5 h-5" />
                                        {emailText}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // VARIANT 3: Compact Horizontal - All in One Row
    if (variant === 'v3') {
        return (
            <section className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 lg:p-10 shadow-xl">
                        <div className="flex flex-col lg:flex-row items-center gap-8">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
                                    <Icon name="phone" className="w-10 h-10 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1 text-center lg:text-left">
                                <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                                    {title}
                                </h2>
                                <p className="text-white/90 text-base">
                                    {subtitle} {disclaimer}
                                </p>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                                <Link
                                    href={phoneHref}
                                    className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-primary px-6 py-3 rounded-xl font-bold transition-all whitespace-nowrap"
                                >
                                    <Icon name="phone" className="w-5 h-5" />
                                    {phoneText}
                                </Link>
                                <Link
                                    href={emailHref}
                                    className="flex items-center justify-center gap-2 bg-primary-dark hover:bg-primary text-white px-6 py-3 rounded-xl font-bold transition-all border-2 border-white/20 whitespace-nowrap"
                                >
                                    <Icon name="mail" className="w-5 h-5" />
                                    {emailText}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    // VARIANT 4: Grid Cards - Each Benefit as Card
    if (variant === 'v4') {
        return (
            <section className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl">
                        {/* Header */}
                        <div className="text-center mb-10">
                            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
                                {title}
                            </h2>
                            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                                {subtitle}
                            </p>
                        </div>

                        {/* Benefits Grid */}
                        <div className="grid sm:grid-cols-2 gap-4 mb-8">
                            {benefits.map((benefit, idx) => (
                                <div key={idx} className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:border-primary/30 transition-all">
                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                                            <Icon name="check" className="w-5 h-5 text-primary" />
                                        </div>
                                        <p className="text-base text-gray-700 font-medium">{benefit.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Disclaimer */}
                        <div className="bg-primary/5 border-l-4 border-primary rounded-lg p-4 mb-8">
                            <p className="text-sm text-gray-700 italic">
                                {disclaimer}
                            </p>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href={phoneHref}
                                className="flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg hover:shadow-primary/30 group"
                            >
                                <Icon name="phone" className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                {phoneText}
                            </Link>
                            <Link
                                href={emailHref}
                                className="flex items-center justify-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg group"
                            >
                                <Icon name="mail" className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                {emailText}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return null;
};
