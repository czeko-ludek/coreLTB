'use client';

import React, { useState } from 'react';
import { Inter, Outfit, Manrope, Montserrat, Lato, Playfair_Display } from 'next/font/google';
import { Icon } from '@/components/ui';

// Initialize fonts
const inter = Inter({ subsets: ['latin'], display: 'swap' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap' });
const manrope = Manrope({ subsets: ['latin'], display: 'swap' });
const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' });
const lato = Lato({ weight: ['300', '400', '700', '900'], subsets: ['latin'], display: 'swap' });
const playfair = Playfair_Display({ subsets: ['latin'], display: 'swap' });

const fonts = [
    { name: 'Outfit', font: outfit, label: 'Outfit (Modern & Premium)' },
    { name: 'Inter', font: inter, label: 'Inter (Standard)' },
    { name: 'Manrope', font: manrope, label: 'Manrope (Technical)' },
    { name: 'Montserrat', font: montserrat, label: 'Montserrat (Geometric)' },
    { name: 'Lato', font: lato, label: 'Lato (Friendly)' },
    { name: 'Playfair Display', font: playfair, label: 'Playfair (Serif/Elegant)' },
];

interface FontWrapperProps {
    children: React.ReactNode;
}

export const FontWrapper: React.FC<FontWrapperProps> = ({ children }) => {
    const [currentFontIndex, setCurrentFontIndex] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    const currentFont = fonts[currentFontIndex];

    return (
        <div className={currentFont.font.className}>
            {/* Font Selector Bar */}
            <div className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
                <div className="max-w-[96rem] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                            Bento Playground
                        </span>
                        <div className="h-4 w-px bg-gray-200" />

                        <div className="relative">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-primary transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-50"
                            >
                                <Icon name="type" size="sm" className="text-gray-400" />
                                <span>{currentFont.label}</span>
                                <Icon name="chevronDown" size="sm" className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {isOpen && (
                                <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2">
                                    {fonts.map((font, index) => (
                                        <button
                                            key={font.name}
                                            onClick={() => {
                                                setCurrentFontIndex(index);
                                                setIsOpen(false);
                                            }}
                                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${index === currentFontIndex
                                                    ? 'bg-primary/5 text-primary font-medium'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            <span className={font.font.className}>{font.name}</span>
                                            {index === currentFontIndex && <Icon name="check" size="sm" />}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-xs text-gray-400 hidden sm:block">
                        Wybierz font, aby przetestować wygląd
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="min-h-screen">
                {children}
            </div>
        </div>
    );
};
