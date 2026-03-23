/**
 * SHARED LOCAL TEMPLATE
 * Dane wspólne dla wszystkich stron lokalnych.
 * Placeholdery: {cityName}, {cityNameLocative}
 */

import type { SharedLocalTemplate } from './types';

export const sharedTemplate: SharedLocalTemplate = {
  // ── Partner logos marquee ──
  partnerLogos: [
    { name: 'Wienerberger' },
    { name: 'Solbet' },
    { name: 'Baumit' },
    { name: 'Velux' },
    { name: 'Fakro' },
    { name: 'Knauf' },
    { name: 'Weber' },
    { name: 'Rockwool' },
    { name: 'Bramac' },
    { name: 'Schiedel' },
  ],

  // ── Service Pillars — 3 filary usług ──
  servicePillars: {
    header: {
      label: 'ZAKRES USŁUG',
      title: 'Co budujemy w {cityNameLocative}?',
      description:
        'Nasza oferta jest modułowa — możesz zlecić nam dowolny zakres prac. Budujemy wyłącznie w technologii murowanej, sprawdzonej na terenach górniczych.',
      align: 'center',
      theme: 'light',
    },
    pillars: [
      {
        icon: 'hardHat',
        title: 'Stan Surowy Otwarty',
        description: 'Trzon naszej działalności — od fundamentów po konstrukcję dachu.',
        bullets: [
          'Niwelacja terenu i wymiana gruntu',
          'Płyta fundamentowa lub ławy żelbetowe',
          'Murowanie ścian z ceramiki lub silikatów',
          'Więźba dachowa z pełnym deskowaniem',
        ],
        href: '/oferta/kompleksowa-budowa-domow',
        linkText: 'Sprawdź stan surowy',
      },
      {
        icon: 'plug',
        title: 'Stan Deweloperski',
        description: 'Zamknięta bryła z pełnymi instalacjami — gotowa do wykończenia.',
        bullets: [
          'Stolarka okienna w ciepłym montażu',
          'Instalacje wod-kan, CO, elektryka',
          'Tynki maszynowe i wylewki',
          'Ocieplenie poddasza (PUR / wełna)',
        ],
        href: '/oferta/kompleksowa-budowa-domow',
        linkText: 'Sprawdź stan deweloperski',
      },
      {
        icon: 'keyRound',
        title: 'Pod Klucz',
        description: 'Jeden partner od projektu do wprowadzenia — pełna odpowiedzialność.',
        bullets: [
          'Wykończenie wnętrz i montaż podłóg',
          'Elewacja i ocieplenie',
          'Zagospodarowanie terenu',
          'Jeden koordynator = zero stresu',
        ],
        href: '/oferta/kompleksowa-budowa-domow',
        linkText: 'Sprawdź budowę pod klucz',
      },
    ],
  },

  // ── Mid-page CTA ──
  midCTA: {
    headline: 'Ile kosztuje budowa domu',
    highlightedText: 'w {cityNameLocative}?',
    phone: '+48 664 123 757',
    buttons: [
      { text: 'Oblicz koszt budowy', href: '/wycena', variant: 'primary' },
      { text: 'Zadzwoń do nas', href: 'tel:+48664123757', variant: 'outline-white' },
    ],
  },

  // ── WhyUs — 4 kompetencje ──
  whyUs: {
    label: 'DLACZEGO CORELTB BUILDERS',
    title: 'Dlaczego warto wybrać naszą firmę budowlaną?',
    competencies: [
      {
        icon: 'mapPin',
        title: 'Znamy lokalny grunt',
        description:
          'Mamy doświadczenie w budowaniu na terenach górniczych i wiemy, jak skutecznie zbroić fundamenty, by dom nie pękał.',
      },
      {
        icon: 'trendingUp',
        title: 'Przejrzystość finansowa',
        description:
          'Otrzymujesz szczegółowy kosztorys. Wiesz, za co płacisz. Żadnych ukrytych dopłat "bo cegła podrożała", jeśli zakontraktowaliśmy cenę ryczałtową.',
      },
      {
        icon: 'building',
        title: 'Lokalna baza logistyczna',
        description:
          'Jesteśmy na miejscu. W razie awarii czy pilnej potrzeby konsultacji, jesteśmy na budowie w kilkanaście minut, a nie dojeżdżamy z drugiego końca Polski.',
      },
      {
        icon: 'shieldCheck',
        title: 'Gwarancja',
        description:
          'Udzielamy realnej gwarancji na konstrukcję i prace wykończeniowe. Jesteśmy stabilną firmą, która nie zniknie z rynku po zakończeniu budowy.',
      },
    ],
  },
};
