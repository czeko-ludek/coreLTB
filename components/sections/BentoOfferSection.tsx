'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Icon } from '@/components/ui';

interface OfferVariant {
    id: string;
    icon: 'shovel' | 'hardHat' | 'fileText' | 'search';
    label: string;
    title: string;
    subtitle: string;
    description: string;
    features: { icon: 'check'; text: string }[];
    callout: string;
    ctaText: string;
    ctaHref: string;
    imageSrc: string;
}

const offerVariants: OfferVariant[] = [
    {
        id: 'variant-1',
        icon: 'shovel',
        label: 'Audyt Działki',
        title: 'Audyt działki i analiza geotechniczna',
        subtitle: 'Start inwestycji na terenie Południowej Polski (Śląsk, Małopolska) wymaga wyjścia poza standardową weryfikację prawną.',
        description: 'Specyfika regionu – w tym grunty wysadzinowe (gliny) oraz aktywne szkody górnicze (od I do IV kategorii) – bezpośrednio wpływa na koszt budowy. Nasz zespół analizuje nie tylko, czy możesz budować, ale ile będzie kosztowało "wyjście z ziemi". Różnica między standardową ławą a wzmocnioną płytą fundamentową może wynosić nawet 20-30% budżetu stanu surowego.',
        features: [
            { icon: 'check', text: 'Geologia Inżynierska: Wykonujemy odwierty kontrolne, aby wykryć wody gruntowe i grunty nienośne (nasypy). Unikasz ryzyka wymiany gruntu.' },
            { icon: 'check', text: 'Szkody Górnicze (Śląsk): Weryfikujemy zapisy w PGG i Miejscowym Planie (MPZP), dobierając odpowiednie zabezpieczenia konstrukcyjne (tuleje, dylatacje).' },
            { icon: 'check', text: 'Uzbrojenie i WZ: Analizujemy realne (a nie "na mapie") możliwości przyłącza mediów oraz procedujemy Decyzję o Warunkach Zabudowy w przypadku braku planu.' },
        ],
        callout: 'Dzięki temu masz absolutną pewność, że inwestujesz w grunt bez wad prawnych i ukrytych problemów technicznych.',
        ctaText: 'Sprawdź Usługi Geologiczne',
        ctaHref: '/oferta/uslugi-techniczne',
        imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
    },
    {
        id: 'variant-2',
        icon: 'hardHat',
        label: 'Fundamenty',
        title: 'Fundamenty na trudnym gruncie',
        subtitle: 'Specjalistyczne rozwiązania fundamentowe dla terenów górniczych i gliniastych.',
        description: 'W regionie Śląska i Małopolski standardowe fundamenty często nie wystarczają. Oferujemy kompleksową analizę i dobór odpowiednich rozwiązań konstrukcyjnych, które zapewnią stabilność budynku na lata.',
        features: [
            { icon: 'check', text: 'Płyty fundamentowe: Wzmocnione konstrukcje dla terenów osiadających.' },
            { icon: 'check', text: 'Pale fundamentowe: Rozwiązanie dla gruntów o niskiej nośności.' },
            { icon: 'check', text: 'Dylatacje sejsmiczne: Zabezpieczenie przed skutkami wstrząsów górniczych.' },
        ],
        callout: 'Nasze rozwiązania są certyfikowane i sprawdzone w najtrudniejszych warunkach gruntowych.',
        ctaText: 'Poznaj Technologie',
        ctaHref: '/oferta/fundamenty-specjalistyczne',
        imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
    },
    {
        id: 'variant-3',
        icon: 'fileText',
        label: 'Dokumentacja',
        title: 'Kompletna dokumentacja geotechniczna',
        subtitle: 'Profesjonalne raporty i ekspertyzy wymagane przez urząd i bank.',
        description: 'Przygotowujemy pełną dokumentację geotechniczną zgodną z wymogami prawa budowlanego. Nasze raporty są akceptowane przez wszystkie instytucje finansowe i urzędy.',
        features: [
            { icon: 'check', text: 'Raport geologiczny: Szczegółowa analiza warstw gruntu i wód podziemnych.' },
            { icon: 'check', text: 'Ekspertyza geotechniczna: Zalecenia dla projektanta konstrukcji.' },
            { icon: 'check', text: 'Dokumentacja dla banku: Komplet dokumentów wymaganych przy kredycie.' },
        ],
        callout: 'Wszystkie dokumenty przygotowujemy w terminie 14 dni od wykonania badań.',
        ctaText: 'Zamów Dokumentację',
        ctaHref: '/oferta/dokumentacja-geotechniczna',
        imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
    },
    {
        id: 'variant-4',
        icon: 'search',
        label: 'Monitoring',
        title: 'Monitoring geotechniczny podczas budowy',
        subtitle: 'Ciągła kontrola stabilności gruntu w trakcie realizacji inwestycji.',
        description: 'Oferujemy monitoring geotechniczny na każdym etapie budowy. Dzięki temu możemy szybko reagować na zmiany w gruncie i dostosować rozwiązania konstrukcyjne.',
        features: [
            { icon: 'check', text: 'Pomiary osiadań: Regularna kontrola stabilności fundamentów.' },
            { icon: 'check', text: 'Monitoring wód gruntowych: Śledzenie poziomu wody i jej wpływu na konstrukcję.' },
            { icon: 'check', text: 'Raporty miesięczne: Szczegółowa dokumentacja postępów i ewentualnych zagrożeń.' },
        ],
        callout: 'Monitoring pozwala uniknąć kosztownych napraw i zapewnia bezpieczeństwo inwestycji.',
        ctaText: 'Dowiedz się więcej',
        ctaHref: '/oferta/monitoring-geotechniczny',
        imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
    },
];

export const BentoOfferSection: React.FC = () => {
    const [activeVariant, setActiveVariant] = useState('variant-1');
    const [showSideNav, setShowSideNav] = useState(false);
    const variantRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
    const topNavRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            // Check if top navigation is out of view
            if (topNavRef.current && sectionRef.current) {
                const topNavRect = topNavRef.current.getBoundingClientRect();
                const sectionRect = sectionRef.current.getBoundingClientRect();

                // Show side nav when top nav is scrolled past
                setShowSideNav(topNavRect.bottom < 0 && sectionRect.bottom > window.innerHeight / 2);
            }

            // Update active variant based on scroll position
            const scrollPosition = window.scrollY + window.innerHeight / 3;

            for (const variant of offerVariants) {
                const element = variantRefs.current[variant.id];
                if (element) {
                    const rect = element.getBoundingClientRect();
                    const elementTop = rect.top + window.scrollY;
                    const elementBottom = elementTop + rect.height;

                    if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                        setActiveVariant(variant.id);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section ref={sectionRef} className="bg-background-beige py-16 sm:py-20 lg:py-24 relative">
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                {/* Horizontal Top Navigation - Initial State */}
                <div
                    ref={topNavRef}
                    className={`mb-12 transition-all duration-500 ${showSideNav ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}
                >
                    <nav className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">
                        <div className="relative">
                            <div
                                className="hidden md:block absolute top-6 md:top-7 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
                                style={{ margin: '0px 7%' }}
                            />

                            <div className="relative grid grid-cols-4 gap-3 md:gap-4">
                                {offerVariants.map((variant) => {
                                    const isActive = activeVariant === variant.id;

                                    return (
                                        <a
                                            key={variant.id}
                                            href={`#${variant.id}`}
                                            className="flex flex-col items-center gap-2 group"
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
                                                    name={variant.icon}
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
                                                {variant.label}
                                            </span>
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                    </nav>
                </div>

                <div className="flex gap-4">
                    {/* Vertical Sticky Navigation - Side (appears on scroll) */}
                    <div
                        className={`
                            hidden xl:block w-64 flex-shrink-0 transition-all duration-700 ease-out -ml-[200px]
                            ${showSideNav
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 -translate-x-8 pointer-events-none'
                            }
                        `}
                    >
                        <nav className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 border border-gray-100 transform-gpu">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">Nasze Usługi</h3>
                            <div className="space-y-3">
                                {offerVariants.map((variant, index) => {
                                    const isActive = activeVariant === variant.id;

                                    return (
                                        <a
                                            key={variant.id}
                                            href={`#${variant.id}`}
                                            className={`
                                                group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
                                                ${isActive
                                                    ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                                                    : 'hover:bg-gray-50 text-gray-600 hover:scale-102'
                                                }
                                            `}
                                            style={{
                                                transitionDelay: showSideNav ? `${index * 50}ms` : '0ms'
                                            }}
                                        >
                                            <div
                                                className={`
                                                    flex items-center justify-center 
                                                    w-12 h-12 
                                                    rounded-full 
                                                    flex-shrink-0
                                                    transition-all duration-300
                                                    ${isActive
                                                        ? 'bg-white/20 text-white'
                                                        : 'bg-gray-100 text-gray-600 group-hover:bg-primary/10 group-hover:text-primary'
                                                    }
                                                `}
                                            >
                                                <Icon name={variant.icon} className="w-6 h-6" />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span
                                                        className={`
                                                            text-xs font-bold
                                                            ${isActive ? 'text-white/70' : 'text-gray-400'}
                                                        `}
                                                    >
                                                        {String(index + 1).padStart(2, '0')}
                                                    </span>
                                                </div>
                                                <p
                                                    className={`
                                                        text-sm font-bold leading-tight
                                                        ${isActive ? 'text-white' : 'text-gray-900 group-hover:text-primary'}
                                                    `}
                                                >
                                                    {variant.label}
                                                </p>
                                            </div>

                                            {isActive && (
                                                <div className="w-1.5 h-8 bg-white rounded-full animate-pulse" />
                                            )}
                                        </a>
                                    );
                                })}
                            </div>
                        </nav>
                    </div>

                    {/* Scrollable Variants */}
                    <div className="flex-1 space-y-12 transition-all duration-700">
                        {offerVariants.map((variant) => (
                            <div
                                key={variant.id}
                                id={variant.id}
                                ref={(el) => { variantRefs.current[variant.id] = el; }}
                                className="min-h-[600px] bg-white rounded-3xl overflow-hidden flex flex-col lg:flex-row shadow-lg"
                            >
                                <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center order-2 lg:order-1">
                                    <div className="prose prose-lg max-w-none text-gray-600">
                                        <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">{variant.title}</h3>
                                        <p className="mb-6 text-lg font-medium text-gray-900">
                                            {variant.subtitle}
                                        </p>
                                        <p className="mb-8 text-base leading-relaxed">
                                            {variant.description}
                                        </p>

                                        <div className="grid grid-cols-1 gap-5 mb-8">
                                            {variant.features.map((feature, idx) => (
                                                <div key={idx} className="flex items-start gap-3">
                                                    <Icon name={feature.icon} className="text-primary mt-1 shrink-0" size="md" />
                                                    <span className="text-base">{feature.text}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <p className="text-base italic border-l-4 border-primary pl-6 py-2 bg-primary/5 mb-8">
                                            {variant.callout}
                                        </p>

                                        <Link
                                            href={variant.ctaHref}
                                            className="group/btn flex items-center justify-between w-full sm:w-auto bg-gray-50 hover:bg-primary/5 border border-gray-200 hover:border-primary/30 rounded-xl p-5 transition-all duration-300"
                                        >
                                            <div>
                                                <span className="block text-sm font-extrabold text-gray-900 uppercase tracking-wide mb-1 group-hover/btn:text-primary transition-colors">
                                                    {variant.ctaText}
                                                </span>
                                                <span className="block text-base font-medium text-gray-600 group-hover/btn:text-gray-900 transition-colors">
                                                    Dowiedz się więcej
                                                </span>
                                            </div>
                                            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center group-hover/btn:border-primary group-hover/btn:bg-primary group-hover/btn:text-white transition-all shadow-sm">
                                                <Icon name="arrowRight" size="sm" />
                                            </div>
                                        </Link>
                                    </div>
                                </div>

                                <div className="relative w-full lg:w-2/5 h-80 lg:h-auto overflow-hidden order-1 lg:order-2">
                                    <Image
                                        src={variant.imageSrc}
                                        alt={variant.title}
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-5 py-3 rounded-full flex items-center gap-3 shadow-sm">
                                        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
                                            {offerVariants.indexOf(variant) + 1}
                                        </div>
                                        <span className="text-base font-bold text-gray-900">{variant.label}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
