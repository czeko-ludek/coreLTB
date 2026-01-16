'use client';

import React from 'react';
import { SectionHeader } from '@/components/shared';
import { Button, Icon } from '@/components/ui';
import { BentoGridItem } from '@/components/shared/BentoGridItem';

export interface ContactInfo {
    phone: string;
    email: string;
    address: string;
}

export interface BentoContactSectionProps {
    contactInfo: ContactInfo;
}

export const BentoContactSection: React.FC<BentoContactSectionProps> = ({
    contactInfo,
}) => {
    return (
        <section className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
            {/* Widened container: max-w-[90rem] is approx 1440px, 20% wider than 7xl (1280px) would be ~1536px (2xl) */}
            <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <SectionHeader
                        label="KONTAKT"
                        title="Rozpocznijmy Współpracę"
                        description="Jesteśmy gotowi zrealizować Twoją wizję. Skontaktuj się z nami, aby omówić szczegóły."
                        align="center"
                        theme="light"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[minmax(180px,auto)]">
                    {/* 1. Intro Box - Top Left */}
                    <BentoGridItem colSpan={2} className="flex flex-col justify-center bg-primary text-gray-900 border-none">
                        <div className="space-y-4">
                            <div className="h-12 w-12 rounded-full bg-black/10 flex items-center justify-center backdrop-blur-sm">
                                <Icon name="helpCircle" className="text-gray-900" />
                            </div>
                            <h3 className="text-2xl font-bold">Masz pytania?</h3>
                            <p className="text-gray-900/80 leading-relaxed font-medium">
                                Nasz zespół ekspertów czeka na Twoją wiadomość. Odpowiadamy na wszystkie zapytania w ciągu 24 godzin.
                            </p>
                        </div>
                    </BentoGridItem>

                    {/* 2. Contact Form - Right Column (Spans 3 rows vertically) */}
                    <BentoGridItem colSpan={2} rowSpan={3} className="flex flex-col">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900">Formularz Kontaktowy</h3>
                            <p className="text-gray-500 text-sm mt-1">Wypełnij formularz, a my zajmiemy się resztą.</p>
                        </div>

                        <form className="space-y-4 flex-grow flex flex-col justify-between">
                            <div className="space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Imię i nazwisko</label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Jan Kowalski"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inherit"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label htmlFor="phone" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Telefon</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            placeholder="+48 000 000 000"
                                            className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inherit"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="email" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">E-mail</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="jan@example.com"
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-inherit"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label htmlFor="message" className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1">Wiadomość</label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        placeholder="Opisz nam swój projekt..."
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none font-inherit"
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <label className="flex items-center gap-2 cursor-pointer group/file">
                                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/file:bg-primary/10 transition-colors">
                                            <Icon name="paperclip" className="text-gray-500 group-hover/file:text-primary transition-colors" size="sm" />
                                        </div>
                                        <span className="text-sm font-medium text-gray-600 group-hover/file:text-primary transition-colors">Załącz projekt</span>
                                        <input type="file" className="hidden" />
                                    </label>
                                </div>

                                <div className="flex items-start gap-3 pt-2">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="gdpr"
                                            name="gdpr"
                                            type="checkbox"
                                            required
                                            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="gdpr" className="font-medium text-gray-600">
                                            Wyrażam zgodę na przetwarzanie danych osobowych <span className="text-red-500">*</span>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <Button variant="primary" size="lg" className="w-full mt-4 shadow-lg shadow-primary/20">
                                Wyślij Wiadomość
                            </Button>
                        </form>
                    </BentoGridItem>

                    {/* 3. Phone Box */}
                    <BentoGridItem className="flex flex-col justify-between group cursor-pointer hover:bg-gray-50">
                        <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                            <Icon name="phone" className="text-white" size="md" />
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Zadzwoń do nas</p>
                            <p className="text-2xl font-bold text-gray-900">{contactInfo.phone}</p>
                        </div>
                    </BentoGridItem>

                    {/* 4. Email Box */}
                    <BentoGridItem className="flex flex-col justify-between group cursor-pointer hover:bg-gray-50">
                        <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110">
                            <Icon name="mail" className="text-white" size="md" />
                        </div>
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Napisz do nas</p>
                            <p className="text-xl font-bold text-gray-900 break-all">{contactInfo.email}</p>
                        </div>
                    </BentoGridItem>

                    {/* 5. Address/Map Box - Bottom Left */}
                    <BentoGridItem colSpan={2} className="relative !p-0 overflow-hidden group min-h-[450px]">
                        <div className="absolute inset-0 bg-gray-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2578.508774828688!2d18.465833!3d50.001667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4711467475130b0d%3A0x6a0c50766308360!2sWa%C5%82owa%2055%2C%2044-300%20Wodzis%C5%82aw%20%C5%9Al%C4%85ski!5e0!3m2!1spl!2spl!4v1700000000000!5m2!1spl!2spl"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="transition-all duration-700"
                            />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 flex flex-col justify-end">
                            <div className="flex items-start gap-3">
                                <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0">
                                    <Icon name="mapPin" className="text-white" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-1">Siedziba Firmy</p>
                                    <p className="text-xl font-bold text-white leading-tight">{contactInfo.address}</p>
                                </div>
                            </div>
                        </div>
                    </BentoGridItem>

                </div>
            </div>
        </section >
    );
};
