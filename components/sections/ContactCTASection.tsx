'use client';

import React from 'react';
import { SectionHeader, SectionHeaderProps } from '@/components/shared';
import { Button, Icon } from '@/components/ui';

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactCTASectionProps {
  header: SectionHeaderProps;
  contactInfo: ContactInfo;
}

export const ContactCTASection: React.FC<ContactCTASectionProps> = ({
  header,
  contactInfo,
}) => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* Grid: Dane kontaktowe (lewo) + Formularz (prawo) */}
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* LEWO: Dane kontaktowe z ikonami */}
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 md:p-10 flex flex-col justify-center space-y-8">
            {/* Phone */}
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon name="phone" size="lg" className="text-primary" />
              </div>
              <div className="pt-1">
                <h4 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-text/60">
                  Telefon
                </h4>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-xl font-semibold text-primary hover:underline transition-all"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon name="mail" size="lg" className="text-primary" />
              </div>
              <div className="pt-1">
                <h4 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-text/60">
                  E-mail
                </h4>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-xl font-semibold text-primary hover:underline transition-all break-all"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-5">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10">
                <Icon name="mapPin" size="lg" className="text-primary" />
              </div>
              <div className="pt-1">
                <h4 className="mb-1.5 text-sm font-semibold uppercase tracking-wide text-text/60">
                  Adres
                </h4>
                <p className="text-lg font-medium text-text/80">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          </div>

          {/* PRAWO: Formularz kontaktowy */}
          <div className="bg-white rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.08)] p-8 md:p-10">
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
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Telefon"
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
                <textarea
                  id="message"
                  name="message"
                  rows={5}
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
      </div>
    </section>
  );
};
