'use client';

import React from 'react';

interface BentoTitleHeroProps {
    title: string;
    watermark: string;
    variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const BentoTitleHero: React.FC<BentoTitleHeroProps> = ({ title, watermark, variant = 'v1' }) => {

    // VARIANT 1: Original - Side by Side with Outline
    if (variant === 'v1') {
        return (
            <div className="absolute inset-0 flex items-center z-10 px-4 md:px-8 left-0 overflow-hidden">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-[400px] md:max-w-[600px]">
                    {title}
                </h1>
                <div
                    className="text-[50px] md:text-[70px] lg:text-[90px] font-bold uppercase select-none pointer-events-none ml-4 md:ml-8 whitespace-nowrap"
                    aria-hidden="true"
                    style={{
                        WebkitTextStroke: '1px rgba(255, 255, 255, 0.4)',
                        color: 'transparent'
                    }}
                >
                    {watermark}
                </div>
            </div>
        );
    }

    // VARIANT 2: Stacked - Title Over Watermark
    if (variant === 'v2') {
        return (
            <div className="absolute inset-0 flex flex-col justify-center z-10 px-4 md:px-8 overflow-hidden">
                <div className="relative">
                    {/* Watermark Background */}
                    <div
                        className="absolute -top-8 md:-top-12 lg:-top-16 left-0 text-[80px] md:text-[120px] lg:text-[160px] font-bold uppercase select-none pointer-events-none whitespace-nowrap opacity-30"
                        aria-hidden="true"
                        style={{
                            WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)',
                            color: 'transparent'
                        }}
                    >
                        {watermark}
                    </div>

                    {/* Title Foreground */}
                    <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-[500px] md:max-w-[700px]">
                        {title}
                    </h1>
                </div>
            </div>
        );
    }

    // VARIANT 3: Diagonal - Watermark Rotated Behind
    if (variant === 'v3') {
        return (
            <div className="absolute inset-0 flex items-center z-10 px-4 md:px-8 overflow-hidden">
                <div className="relative">
                    {/* Diagonal Watermark */}
                    <div
                        className="absolute -top-20 -left-40 md:-left-60 text-[100px] md:text-[140px] lg:text-[180px] font-bold uppercase select-none pointer-events-none whitespace-nowrap -rotate-12 opacity-20"
                        aria-hidden="true"
                        style={{
                            WebkitTextStroke: '2px rgba(255, 255, 255, 0.6)',
                            color: 'transparent'
                        }}
                    >
                        {watermark}
                    </div>

                    {/* Title */}
                    <h1 className="relative text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-[400px] md:max-w-[600px] drop-shadow-lg">
                        {title}
                    </h1>
                </div>
            </div>
        );
    }

    // VARIANT 4: Vertical - Watermark as Vertical Text
    if (variant === 'v4') {
        return (
            <div className="absolute inset-0 flex items-center z-10 px-4 md:px-8 overflow-hidden">
                <div className="flex items-center gap-8 md:gap-12">
                    {/* Vertical Watermark */}
                    <div
                        className="text-[60px] md:text-[80px] lg:text-[100px] font-bold uppercase select-none pointer-events-none writing-mode-vertical-rl rotate-180 opacity-40"
                        aria-hidden="true"
                        style={{
                            WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)',
                            color: 'transparent',
                            writingMode: 'vertical-rl',
                        }}
                    >
                        {watermark}
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-[400px] md:max-w-[600px]">
                        {title}
                    </h1>
                </div>
            </div>
        );
    }

    return null;
};
