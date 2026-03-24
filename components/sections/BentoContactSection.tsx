'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';
import { SectionHeader } from '@/components/shared';
import { Button, Icon } from '@/components/ui';
import type { IconName } from '@/components/ui/Icon';
import { BentoGridItem } from '@/components/shared/BentoGridItem';
import { trackPhoneClick } from '@/lib/analytics';

export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

export interface BentoContactSectionProps {
    contactInfo: ContactInfo;
}

const offices = [
    {
        id: 'wodzislaw',
        label: 'Wodzisław Śląski',
        address: 'ul. Wałowa 55, 44-300 Wodzisław Śląski',
        mapSrc: 'https://maps.google.com/maps?q=Wa%C5%82owa+55,+44-300+Wodzis%C5%82aw+%C5%9Al%C4%85ski&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
    {
        id: 'jaworzno',
        label: 'Jaworzno',
        address: 'Grunwaldzka 34a, 43-600 Jaworzno',
        mapSrc: 'https://maps.google.com/maps?q=CoreLTB+Builders+Grunwaldzka+34a+43-600+Jaworzno&t=&z=15&ie=UTF8&iwloc=&output=embed',
    },
];

export const BentoContactSection: React.FC<BentoContactSectionProps> = ({
    contactInfo,
}) => {
    const [activeOffice, setActiveOffice] = useState(0);
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
        rootMargin: '50px 0px',
    });

    const currentOffice = offices[activeOffice];

    return (
        <section ref={ref} className="bg-background-beige pt-0 pb-8 sm:pt-1 sm:pb-10 lg:pt-2 lg:pb-12">
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                <div className={clsx(
                    'mb-6',
                    inView ? 'animate-fade-in-up' : 'opacity-0'
                )} style={{ animationDelay: '0.1s' }}>
                    <SectionHeader
                        label="KONTAKT"
                        title="Rozpocznijmy Współpracę"
                        description="Jesteśmy gotowi zrealizować Twoją wizję. Skontaktuj się z nami, aby omówić szczegóły."
                        align="center"
                        theme="light"
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-4">
                    {/* LEFT COLUMN: info cards */}
                    <div className="flex flex-col gap-4">
                        {/* Masz pytania? — routing links */}
                        <BentoGridItem
                            className={clsx(
                                inView ? 'animate-fade-in-up' : 'opacity-0'
                            )}
                            style={{ animationDelay: '0.2s' }}
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-1">Masz pytania?</h3>
                            <p className="text-gray-500 text-sm leading-relaxed mb-5">
                                Wybierz, czego szukasz — przekierujemy Cię na odpowiednią stronę.
                            </p>
                            <div className="space-y-2">
                                {([
                                    { icon: 'calculator' as IconName, label: 'Chcę wycenę budowy', href: '/wycena' },
                                    { icon: 'phone' as IconName, label: 'Chcę porozmawiać z inżynierem', href: '/umow-konsultacje' },
                                    { icon: 'map' as IconName, label: 'Mam działkę do sprawdzenia', href: '/analiza-dzialki' },
                                ]).map((route) => (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className="group flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 hover:bg-primary/5 hover:border-primary/30 transition-all duration-200"
                                    >
                                        <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                            <Icon name={route.icon} size="sm" className="text-primary" />
                                        </div>
                                        <span className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors flex-1">
                                            {route.label}
                                        </span>
                                        <Icon name="arrowRight" size="sm" className="text-gray-400 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </Link>
                                ))}
                            </div>
                        </BentoGridItem>

                        {/* Zadzwoń + Email — jeden kafelek */}
                        <BentoGridItem
                            className={clsx(
                                inView ? 'animate-fade-in-up' : 'opacity-0'
                            )}
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a href={`tel:${contactInfo.phone.replace(/\s/g, '')}`} onClick={() => trackPhoneClick('bento-contact')} className="flex items-center gap-3 group">
                                    <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 shrink-0 group-hover:scale-110 transition-transform">
                                        <Icon name="phone" className="text-white" size="sm" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Zadzwoń do nas</p>
                                        <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{contactInfo.phone}</p>
                                    </div>
                                </a>
                                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 group sm:border-l sm:border-gray-100 sm:pl-4">
                                    <div className="h-11 w-11 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 shrink-0 group-hover:scale-110 transition-transform">
                                        <Icon name="mail" className="text-white" size="sm" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-0.5">Napisz do nas</p>
                                        <p className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">{contactInfo.email}</p>
                                    </div>
                                </a>
                            </div>
                        </BentoGridItem>

                        {/* Mapa z przełącznikiem lokalizacji */}
                        {/* Mapa */}
                        <BentoGridItem
                            className={clsx(
                                "relative !p-0 overflow-hidden min-h-[200px] flex-1",
                                inView ? 'animate-fade-in-up' : 'opacity-0'
                            )}
                            style={{ animationDelay: '0.4s' }}
                        >
                            <div className="absolute inset-0 bg-gray-200">
                                <iframe
                                    key={currentOffice.id}
                                    src={currentOffice.mapSrc}
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                        </BentoGridItem>

                        {/* Przełącznik biur — pod mapą */}
                        <div className={clsx(
                            'flex flex-col gap-2 px-1',
                            inView ? 'animate-fade-in-up' : 'opacity-0'
                        )} style={{ animationDelay: '0.5s' }}>
                            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Nasze biura</span>
                            <div className="flex items-center gap-2">
                                {offices.map((office, idx) => (
                                    <button
                                        key={office.id}
                                        onClick={() => setActiveOffice(idx)}
                                        className={clsx(
                                            'flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-all duration-300 text-sm font-bold',
                                            activeOffice === idx
                                                ? 'bg-primary border-primary text-gray-900 shadow-md shadow-primary/20'
                                                : 'bg-white border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                                        )}
                                    >
                                        <Icon name="mapPin" size="sm" />
                                        {office.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: formularz */}
                    <BentoGridItem
                        className={clsx(
                            "flex flex-col",
                            inView ? 'animate-fade-in-up' : 'opacity-0'
                        )}
                        style={{ animationDelay: '0.3s' }}
                    >
                        <div className="mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Formularz Kontaktowy</h3>
                            <p className="text-gray-500 text-sm mt-0.5">Wypełnij formularz, a my zajmiemy się resztą.</p>
                        </div>

                        <form className="space-y-3 flex-grow flex flex-col">
                            <div className="space-y-3 flex-grow">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                    <div className="space-y-1">
                                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Imię i nazwisko</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Jan Kowalski"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inherit"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label htmlFor="contact-phone" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Telefon</label>
                                        <input
                                            type="tel"
                                            id="contact-phone"
                                            placeholder="+48 000 000 000"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inherit"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="contact-email" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">E-mail</label>
                                    <input
                                        type="email"
                                        id="contact-email"
                                        placeholder="jan@example.com"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inherit"
                                    />
                                </div>

                                <div className="space-y-1 flex-grow flex flex-col">
                                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Wiadomość</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        placeholder="Opisz nam swój projekt..."
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-inherit flex-grow"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group/file">
                                        <div className="h-9 w-9 rounded-full bg-gray-100 flex items-center justify-center group-hover/file:bg-primary/10 transition-colors">
                                            <Icon name="paperclip" className="text-gray-500 group-hover/file:text-primary transition-colors" size="sm" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 group-hover/file:text-primary transition-colors">Załącz projekt</span>
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="flex h-5 items-center">
                                        <input
                                            id="gdpr"
                                            name="gdpr"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="text-xs leading-5">
                                        <label htmlFor="gdpr" className="font-medium text-gray-600">
                                            Wyrażam zgodę na przetwarzanie danych osobowych <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" size="md" className="w-full mt-2 shadow-lg shadow-primary/20">
                                Wyślij Wiadomość
                            </Button>
                        </form>
                    </BentoGridItem>
                </div>
            </div>
        </section>
    );
};
