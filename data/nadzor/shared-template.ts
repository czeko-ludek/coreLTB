/**
 * SHARED NADZÓR TEMPLATE
 * Dane wspólne dla wszystkich stron kierownik budowy per-miasto.
 * Placeholdery: {cityName}, {cityNameLocative}
 */

import type { SharedNadzorTemplate } from './types';

export const sharedNadzorTemplate: SharedNadzorTemplate = {
  // ── HERO — wspólne elementy ──
  emotionalHero: {
    headline: [
      'Niezależny Nadzór Budowlany',
      'w {cityNameLocative} — od 5 000 zł',
    ],
    ctaBoxBenefits: [
      'Objęcie funkcji Kierownika Budowy (cały proces)',
      'Nadzór Inwestorski (kontrola Twojego wykonawcy)',
      'Odbiór mieszkania od dewelopera (protokół usterek)',
      'Jednorazowy audyt techniczny trwającej budowy',
    ],
    ctaBoxSubtext:
      'Wycena na podstawie projektu — zawsze darmowa. Konsultacja telefoniczna niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń: Wyceń Nadzór', variant: 'secondary' },
      { text: 'Wyślij Projekt (PDF)', href: '/umow-konsultacje?usluga=nadzor', variant: 'secondary' },
    ],
  },

  // ── ZAKRES USŁUG — 4 karty (wspólne) ──
  services: {
    items: [
      {
        icon: 'hardHat',
        title: 'Budowa domu jednorodzinnego',
        description:
          'Przejmujemy pełną odpowiedzialność za proces. Prowadzimy wpisy w dzienniku, kontrolujemy zbrojenia przed zalaniem i odbieramy kolejne etapy. Weryfikujemy, że beton ma klasę C20/25 lub wyższą, a nie tańszy zamiennik.',
      },
      {
        icon: 'layers',
        title: 'Rozbudowa i nadbudowa budynków',
        description:
          'Każda ingerencja w istniejącą konstrukcję nośną wymaga ścisłego nadzoru. Podnoszenie ścianki kolankowej, wymiana więźby, dobudowa garażu — koordynujemy te prace, eliminując pęknięcia na łączeniach i mostki termiczne.',
      },
      {
        icon: 'fileText',
        title: 'Prowadzenie dziennika budowy',
        description:
          'To nie formalność — dziennik to twardy dokument prawny chroniący Cię w sporach z wykonawcami. Rejestrujemy go w wydziale architektury w 48h, dokonujemy wpisów po każdym etapie i kompletujemy oświadczenia instalatorów.',
      },
      {
        icon: 'shield',
        title: 'Koordynacja ekip wykonawczych',
        description:
          'Weryfikujemy jakość pracy murarzy, dekarzy i zbrojarzy. Sprawdzamy certyfikaty materiałów, odbieramy prace zanikowe (izolacje, zbrojenia) i pilnujemy harmonogramu — aby kolejne transze kredytu były uwalniane bez opóźnień.',
      },
    ],
  },

  // ── CENNIK — 5 wspólnych wierszy + comparison ──
  pricing: {
    rows: [
      {
        service: 'Kierownik budowy / Inspektor nadzoru (cały proces)',
        price: 'od 5 000 zł brutto',
        model: 'Ryczałt za inwestycję',
      },
      {
        service: 'Pojedyncza wizyta kontrolna na budowie',
        price: '500–800 zł',
        model: 'Za wizytę (~2h)',
      },
      {
        service: 'Odbiór mieszkania od dewelopera',
        price: 'od 500 zł',
        model: 'Ryczałt (zależnie od m²)',
      },
      {
        service: 'Analiza projektu pod kątem szkód górniczych',
        price: '800 zł',
        model: 'Jednorazowo',
      },
      {
        service: 'Konsultacja techniczna na budowie',
        price: 'od 250 zł',
        model: 'Jednorazowo (1h)',
      },
    ],
    comparison: {
      title: 'Ryczałt czy rozliczenie za wizytę?',
      description:
        'Przy budowie domu jednorodzinnego rekomendujemy model ryczałtowy. Stała cena w umowie chroni budżet przed inflacją i opóźnieniami. Ryczałt obejmuje 8–12 wizyt na najważniejszych etapach plus pełną obsługę dziennika budowy. Rozliczenie "za wizytę" sprawdza się przy mniejszych remontach, adaptacjach poddaszy lub jednorazowej konsultacji.',
    },
  },

  // ── E-E-A-T TRUST SIGNALS — 4 karty (wspólne) ──
  trustSignals: {
    items: [
      {
        icon: 'award',
        title: 'Uprawnienia bez ograniczeń',
        description:
          'Nadzór prowadzi Tomasz — inżynier z uprawnieniami konstrukcyjno-budowlanymi bez ograniczeń i aktywnym wpisem do Śląskiej Okręgowej Izby Inżynierów Budownictwa (ŚOIIB). Nie delegujemy zleceń do podwykonawców.',
      },
      {
        icon: 'shieldCheck',
        title: 'Polisa OC na 500 000 zł',
        description:
          'Chroni Cię nasza rozszerzona polisa ubezpieczeniowa OC (OCP). W razie naszego błędu — Twoja inwestycja jest ubezpieczona. Żaden "pan Zbyszek z ogłoszenia" tego nie oferuje.',
      },
      {
        icon: 'fileCheck',
        title: 'Raporty po każdej wizycie',
        description:
          'Po każdym odbiorze zbrojenia czy izolacji otrzymujesz cyfrowy raport fotograficzny z opisem technicznym. Na bieżąco raportujemy o zużyciu materiałów, zapobiegając kradzieży lub marnotrawstwu.',
      },
      {
        icon: 'trendingUp',
        title: 'Znajomość lokalnych urzędów',
        description:
          'Doskonale znamy wymagania i procedury lokalnych wydziałów architektury. W praktyce przyspiesza to obieg dokumentów urzędowych o blisko 20%.',
      },
    ],
  },
};
