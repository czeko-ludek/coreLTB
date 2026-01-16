'use client';

import React from 'react';
import { Icon, IconName } from '@/components/ui';

interface NavigationItem {
    id: string;
    icon: IconName;
    label: string;
    href: string;
}

interface BentoNavigationProps {
    items: NavigationItem[];
    activeId?: string;
    variant?: 'v1' | 'v2' | 'v3' | 'v4';
}

export const BentoNavigation: React.FC<BentoNavigationProps> = ({ items, activeId, variant = 'v1' }) => {

    // VARIANT 1: Clean & Minimal (Original - white background, subtle)
    if (variant === 'v1') {
        return (
            <nav className="mb-12 md:mb-16" aria-label="Nawigacja sekcji">
                <div className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                    <div className="relative">
                        <div
                            className="hidden md:block absolute top-6 md:top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
                            style={{ margin: '0px 7%' }}
                        />

                        <div className="relative grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
                            {items.map((item, index) => {
                                const isActive = activeId === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        className="flex flex-col items-center gap-2 group"
                                        aria-label={`${item.label} (Etap ${index + 1})`}
                                        aria-current={isActive ? 'step' : undefined}
                                    >
                                        <div
                                            className={`
                                                flex items-center justify-center 
                                                w-12 h-12 md:w-14 md:h-14 
                                                rounded-full border-2 
                                                transition-all duration-300 
                                                relative z-10
                                                ${isActive
                                                    ? 'bg-primary border-primary text-white shadow-lg shadow-primary/30 scale-110'
                                                    : 'bg-white border-gray-200 text-gray-600 hover:border-primary hover:text-primary hover:scale-105 hover:shadow-md'
                                                }
                                            `}
                                        >
                                            <Icon
                                                name={item.icon}
                                                className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
                                            />
                                        </div>

                                        <span
                                            className={`
                                                text-xs md:text-sm font-semibold text-center leading-tight
                                                transition-colors duration-300
                                                ${isActive
                                                    ? 'text-primary'
                                                    : 'text-gray-600 group-hover:text-primary'
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    // VARIANT 2: Bold & Colorful (Gradient backgrounds, vibrant)
    if (variant === 'v2') {
        return (
            <nav className="mb-12 md:mb-16" aria-label="Nawigacja sekcji">
                <div className="bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl p-6 md:p-8 border-2 border-gray-200">
                    <div className="relative">
                        <div
                            className="hidden md:block absolute top-6 md:top-7 left-0 right-0 h-1 bg-gradient-to-r from-primary via-[#d4a847] to-primary rounded-full"
                            style={{ margin: '0px 7%' }}
                        />

                        <div className="relative grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
                            {items.map((item, index) => {
                                const isActive = activeId === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        className="flex flex-col items-center gap-2 group"
                                        aria-label={`${item.label} (Etap ${index + 1})`}
                                        aria-current={isActive ? 'step' : undefined}
                                    >
                                        <div
                                            className={`
                                                flex items-center justify-center 
                                                w-12 h-12 md:w-14 md:h-14 
                                                rounded-2xl
                                                transition-all duration-300 
                                                relative z-10
                                                ${isActive
                                                    ? 'bg-gradient-to-br from-primary to-[#d4a847] text-white shadow-xl shadow-primary/40 scale-110 rotate-3'
                                                    : 'bg-gray-50 text-gray-600 hover:bg-gradient-to-br hover:from-primary/20 hover:to-[#d4a847]/20 hover:text-primary hover:scale-105 hover:shadow-lg border-2 border-gray-200 hover:border-primary/50'
                                                }
                                            `}
                                        >
                                            <Icon
                                                name={item.icon}
                                                className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
                                            />
                                        </div>

                                        <span
                                            className={`
                                                text-xs md:text-sm font-bold text-center leading-tight uppercase tracking-wide
                                                transition-colors duration-300
                                                ${isActive
                                                    ? 'text-primary'
                                                    : 'text-gray-600 group-hover:text-primary'
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    // VARIANT 3: Minimal & Flat (No borders, flat design, modern)
    if (variant === 'v3') {
        return (
            <nav className="mb-12 md:mb-16" aria-label="Nawigacja sekcji">
                <div className="bg-gray-50 rounded-3xl p-6 md:p-8">
                    <div className="relative">
                        <div
                            className="hidden md:block absolute top-7 left-0 right-0 h-px bg-gray-200"
                            style={{ margin: '0px 7%' }}
                        />

                        <div className="relative grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
                            {items.map((item, index) => {
                                const isActive = activeId === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        className="flex flex-col items-center gap-2 group"
                                        aria-label={`${item.label} (Etap ${index + 1})`}
                                        aria-current={isActive ? 'step' : undefined}
                                    >
                                        <div
                                            className={`
                                                flex items-center justify-center 
                                                w-12 h-12 md:w-14 md:h-14 
                                                rounded-2xl
                                                transition-all duration-300 
                                                relative z-10
                                                ${isActive
                                                    ? 'bg-primary text-white scale-105'
                                                    : 'bg-white text-gray-600 hover:bg-primary/10 hover:text-primary hover:scale-105'
                                                }
                                            `}
                                        >
                                            <Icon
                                                name={item.icon}
                                                className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
                                            />
                                        </div>

                                        <span
                                            className={`
                                                text-xs md:text-sm font-medium text-center leading-tight
                                                transition-colors duration-300
                                                ${isActive
                                                    ? 'text-primary font-bold'
                                                    : 'text-gray-500 group-hover:text-primary'
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    // VARIANT 4: Premium & Elegant (Dark mode, sophisticated)
    if (variant === 'v4') {
        return (
            <nav className="mb-12 md:mb-16" aria-label="Nawigacja sekcji">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl p-6 md:p-8 border border-gray-700">
                    <div className="relative">
                        <div
                            className="hidden md:block absolute top-6 md:top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"
                            style={{ margin: '0px 7%' }}
                        />

                        <div className="relative grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">
                            {items.map((item, index) => {
                                const isActive = activeId === item.id;

                                return (
                                    <a
                                        key={item.id}
                                        href={item.href}
                                        className="flex flex-col items-center gap-2 group"
                                        aria-label={`${item.label} (Etap ${index + 1})`}
                                        aria-current={isActive ? 'step' : undefined}
                                    >
                                        <div
                                            className={`
                                                flex items-center justify-center 
                                                w-12 h-12 md:w-14 md:h-14 
                                                rounded-full
                                                transition-all duration-300 
                                                relative z-10
                                                ${isActive
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/50 scale-110 ring-2 ring-primary/30 ring-offset-2 ring-offset-gray-900'
                                                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-primary hover:text-primary hover:scale-105 hover:shadow-md hover:shadow-primary/20'
                                                }
                                            `}
                                        >
                                            <Icon
                                                name={item.icon}
                                                className="w-5 h-5 md:w-6 md:h-6 transition-colors duration-300"
                                            />
                                        </div>

                                        <span
                                            className={`
                                                text-xs md:text-sm font-semibold text-center leading-tight
                                                transition-colors duration-300
                                                ${isActive
                                                    ? 'text-primary'
                                                    : 'text-gray-400 group-hover:text-primary'
                                                }
                                            `}
                                        >
                                            {item.label}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }

    return null;
};
