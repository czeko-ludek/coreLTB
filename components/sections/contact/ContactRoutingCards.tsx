'use client';

import Link from 'next/link';
import { Icon } from '@/components/ui/Icon';

const routes = [
  {
    icon: 'coins' as const,
    title: 'Chcę wycenę budowy',
    description: 'Skonfiguruj parametry domu i otrzymaj wstępną wycenę w 60 sekund.',
    href: '/wycena',
    cta: 'Kalkulator wyceny',
    color: 'bg-primary/10 text-primary',
  },
  {
    icon: 'phone' as const,
    title: 'Chcę porozmawiać',
    description: 'Umów bezpłatną konsultację z inżynierem — odpowiemy w 24h.',
    href: '/umow-konsultacje',
    cta: 'Umów konsultację',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: 'mountain' as const,
    title: 'Mam działkę do sprawdzenia',
    description: 'Zamów analizę gruntu, MPZP i uzbrojenia — zanim wydasz pieniądze.',
    href: '/analiza-dzialki',
    cta: 'Analiza działki',
    color: 'bg-green-50 text-green-600',
  },
];

export const ContactRoutingCards = () => {
  return (
    <section className="py-10 md:py-14 bg-background-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-h3 md:text-h2 font-bold font-heading text-text-primary">
            Porozmawiajmy o Twoim projekcie
          </h1>
          <p className="mt-3 text-body-md text-text-secondary max-w-xl mx-auto">
            Wybierz, czego szukasz — przekierujemy Cię na odpowiednią stronę
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-200"
            >
              <div className={`w-12 h-12 rounded-xl ${route.color} flex items-center justify-center mb-4`}>
                <Icon name={route.icon} size="lg" />
              </div>
              <h3 className="text-h5 font-bold text-text-primary mb-2 group-hover:text-primary transition-colors">
                {route.title}
              </h3>
              <p className="text-body-sm text-text-secondary leading-relaxed mb-4">
                {route.description}
              </p>
              <span className="inline-flex items-center gap-1.5 text-body-sm font-semibold text-primary">
                {route.cta}
                <Icon name="arrowRight" size="sm" className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
