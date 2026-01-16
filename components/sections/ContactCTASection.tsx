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
    <section className="bg-[#efebe7] py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader {...header} align="center" theme="light" />
        </div>

        {/* Bento Grid: Formularz (lewo, 2 cols) + Contact Boxes (prawo, stack) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* FORMULARZ - 2 kolumny na desktop */}
          <div className="lg:col-span-2 bg-white rounded-3xl p-8 lg:p-10 border border-gray-100 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900">Formularz Kontaktowy</h3>
              <p className="text-gray-500 text-sm mt-1">Wypełnij formularz, a my zajmiemy się resztą.</p>
            </div>

            <form className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Imię i nazwisko"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="Telefon"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Adres e-mail"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                />
              </div>

              <div>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Opisz nam swój projekt..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
                  required
                />
              </div>

              <Button variant="primary" size="lg" type="submit" className="w-full shadow-lg shadow-primary/20">
                Wyślij Wiadomość
              </Button>
            </form>
          </div>

          {/* CONTACT BOXES - 1 kolumna stack na desktop */}
          <div className="flex flex-col gap-6">
            {/* Phone Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg flex flex-col justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 mb-4">
                <Icon name="phone" className="text-white" size="md" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Zadzwoń do nas</p>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, '')}`}
                  className="text-2xl font-bold text-gray-900 hover:text-primary transition-colors"
                >
                  {contactInfo.phone}
                </a>
              </div>
            </div>

            {/* Email Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg flex flex-col justify-between group cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 transition-transform group-hover:scale-110 mb-4">
                <Icon name="mail" className="text-white" size="md" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Napisz do nas</p>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-xl font-bold text-gray-900 break-all hover:text-primary transition-colors"
                >
                  {contactInfo.email}
                </a>
              </div>
            </div>

            {/* Address Box */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-lg flex flex-col justify-between group">
              <div className="h-14 w-14 rounded-full bg-primary flex items-center justify-center shadow-lg shadow-primary/30 mb-4">
                <Icon name="mapPin" className="text-white" size="md" />
              </div>
              <div>
                <p className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-2">Siedziba firmy</p>
                <p className="text-base font-semibold text-gray-900 leading-tight">
                  {contactInfo.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
