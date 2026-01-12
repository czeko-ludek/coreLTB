'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Button, Icon } from '@/components/ui';

export interface ContactMethod {
  icon: 'mail' | 'phone' | 'mapPin';
  title: string;
  content: string;
  action?: {
    text: string;
    href: string;
  };
  companyInfo?: {
    name: string;
    address: string;
    mapUrl: string;
    mapEmbedUrl: string;
  };
}

export interface ContactHeroSectionProps {
  header: SectionHeaderProps;
  benefits: Array<{
    icon: 'checkCircle' | 'users' | 'clipboard' | 'fileCheck' | 'mapPin';
    text: string;
  }>;
  contactMethods: ContactMethod[];
}

export const ContactHeroSection: React.FC<ContactHeroSectionProps> = ({
  header,
  benefits,
  contactMethods,
}) => {
  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* Grid: Benefity (lewo, mniejsze) + Formularz (prawo, większy) */}
        <div className="grid gap-8 lg:grid-cols-[2fr_3fr] lg:gap-12 mb-16">
          {/* LEWO: Co zyskasz - mniejsze */}
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 md:p-10 flex flex-col justify-center">
            <h3 className="text-2xl md:text-3xl font-bold text-text mb-8">
              Co zyskasz?
            </h3>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <Icon name={benefit.icon} size="md" className="text-primary" />
                  </div>
                  <div className="pt-2">
                    <p className="text-base md:text-lg text-text/80 leading-relaxed">
                      {benefit.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PRAWO: Formularz kontaktowy */}
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold text-text mb-6">
              Napisz do nas
            </h3>

            <form className="space-y-5">
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Imię i nazwisko"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Adres e-mail"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Numer telefonu"
                  className="w-full rounded-lg border border-gray-300 px-4 py-3.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Opisz krótko swój plan budowy..."
                  className="w-full rounded-lg border border-gray-300 px-4 py-3.5 text-base focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full">
                Wyślij wiadomość
              </Button>
            </form>
          </div>
        </div>

        {/* Bento Grid: 2 mniejsze + 1 większe z lokalizacją */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {contactMethods.map((method, index) => {
            // Okienko "Odwiedź nas" (większe, z mapą Google)
            if (method.companyInfo) {
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 md:col-span-2"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8">
                    {/* Lewa kolumna: Informacje */}
                    <div className="flex flex-col justify-center">
                      <div className="flex items-start gap-4 mb-8">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-primary/10">
                          <Icon name={method.icon} size="xl" className="text-primary" />
                        </div>
                        <div className="pt-2">
                          <h4 className="text-2xl font-bold text-text mb-2">
                            {method.title}
                          </h4>
                          <p className="text-base text-text/70">
                            {method.content}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4 mb-8">
                        <Icon name="building" size="lg" className="text-primary mt-1 shrink-0" />
                        <div>
                          <p className="text-xl font-bold text-text mb-1">
                            {method.companyInfo.name}
                          </p>
                          <p className="text-base text-text/80">
                            {method.companyInfo.address}
                          </p>
                        </div>
                      </div>

                      <a
                        href={method.companyInfo.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-primary hover:text-primary-dark transition-colors font-semibold"
                      >
                        <Icon name="mapPin" size="md" />
                        <span>Otwórz w Google Maps</span>
                        <Icon name="arrowRight" size="sm" />
                      </a>
                    </div>

                    {/* Prawa kolumna: Mapa Google (50% większa) */}
                    <div className="relative w-full h-[350px] lg:h-full min-h-[350px] rounded-lg overflow-hidden">
                      <iframe
                        src={method.companyInfo.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Lokalizacja firmy na mapie Google"
                        className="absolute inset-0"
                      />
                    </div>
                  </div>
                </div>
              );
            }

            // Standardowe okienka (Napisz, Zadzwoń)
            return (
              <div
                key={index}
                className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 text-center h-full flex flex-col"
              >
                <div className="flex justify-center mb-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                    <Icon name={method.icon} size="xl" className="text-primary" />
                  </div>
                </div>

                <h4 className="text-xl font-bold text-text mb-3">
                  {method.title}
                </h4>

                <p className="text-base text-text/70 mb-5 flex-grow">
                  {method.content}
                </p>

                {method.action && (
                  <Button
                    variant="secondary"
                    size="sm"
                    href={method.action.href}
                    className="w-full mt-auto"
                  >
                    {method.action.text}
                  </Button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
