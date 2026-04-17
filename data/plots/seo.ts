/**
 * SEO data for /dzialki/[miasto] — city-specific H1, descriptions, FAQ templates.
 * FAQ answers are computed dynamically from actual plot data.
 *
 * Cities based on real plot data from l-r.com.pl (41 plots, 16 cities).
 */

import type { Plot } from './types';

export interface PlotCitySEO {
  slug: string;
  city: string;
  /** Locative case — used in "Działki budowlane w {cityLocative}" */
  cityLocative: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  h1Highlight: string;
  description: string;
  /** SEO content block below FAQ — unique per city */
  seoContent?: string;
}

/** Static SEO data per city — extend when adding new cities */
export const PLOT_CITY_SEO: Record<string, PlotCitySEO> = {
  // ── Powiat wodzisławski (core region) ──
  'wodzislaw-slaski': {
    slug: 'wodzislaw-slaski',
    city: 'Wodzisław Śląski',
    cityLocative: 'Wodzisławiu Śląskim',
    metaTitle: 'Działki budowlane Wodzisław Śląski — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Wodzisławiu Śląskim. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Wodzisławiu Śląskim',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w Wodzisławiu Śląskim i okolicach. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  gorzyce: {
    slug: 'gorzyce',
    city: 'Gorzyce',
    cityLocative: 'Gorzycach',
    metaTitle: 'Działki budowlane Gorzyce — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Gorzycach. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Gorzycach',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Gorzyce. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  lyski: {
    slug: 'lyski',
    city: 'Łyski',
    cityLocative: 'Łyskach',
    metaTitle: 'Działki budowlane Łyski — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Łyskach. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Łyskach',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Łyski. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  gaszowice: {
    slug: 'gaszowice',
    city: 'Gaszowice',
    cityLocative: 'Gaszowicach',
    metaTitle: 'Działki budowlane Gaszowice — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Gaszowicach. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Gaszowicach',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Gaszowice. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  nedza: {
    slug: 'nedza',
    city: 'Nędza',
    cityLocative: 'Nędzy',
    metaTitle: 'Działki budowlane Nędza — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Nędzy. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Nędzy',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Nędza. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  rybnik: {
    slug: 'rybnik',
    city: 'Rybnik',
    cityLocative: 'Rybniku',
    metaTitle: 'Działki budowlane Rybnik — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Rybniku. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Rybniku',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w Rybniku i okolicach. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  mszana: {
    slug: 'mszana',
    city: 'Mszana',
    cityLocative: 'Mszanie',
    metaTitle: 'Działki budowlane Mszana — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Mszanie. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Mszanie',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Mszana. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  'pietrowice-wielkie': {
    slug: 'pietrowice-wielkie',
    city: 'Pietrowice Wielkie',
    cityLocative: 'Pietrowicach Wielkich',
    metaTitle: 'Działki budowlane Pietrowice Wielkie — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Pietrowicach Wielkich. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Pietrowicach Wielkich',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Pietrowice Wielkie. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  godow: {
    slug: 'godow',
    city: 'Godów',
    cityLocative: 'Godowie',
    metaTitle: 'Działki budowlane Godów — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Godowie. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Godowie',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Godów. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  radlin: {
    slug: 'radlin',
    city: 'Radlin',
    cityLocative: 'Radlinie',
    metaTitle: 'Działki budowlane Radlin — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Radlinie. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Radlinie',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w Radlinie. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  lubomia: {
    slug: 'lubomia',
    city: 'Lubomia',
    cityLocative: 'Lubomi',
    metaTitle: 'Działki budowlane Lubomia — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Lubomi. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe. Ceny, lokalizacje, mapa.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Lubomi',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Lubomia. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  ornontowice: {
    slug: 'ornontowice',
    city: 'Ornontowice',
    cityLocative: 'Ornontowicach',
    metaTitle: 'Działki budowlane Ornontowice — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Ornontowicach. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Ornontowicach',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w gminie Ornontowice. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
  marklowice: {
    slug: 'marklowice',
    city: 'Marklowice',
    cityLocative: 'Marklowicach',
    metaTitle: 'Działki budowlane Marklowice — sprawdzone pod budowę domu | CoreLTB',
    metaDescription: 'Działki budowlane na sprzedaż w Marklowicach. Sprawdzone pod budowę domu — MPZP, media, warunki gruntowe.',
    h1: 'Działki budowlane',
    h1Highlight: 'w Marklowicach',
    description: 'Sprawdzone działki pod budowę domu jednorodzinnego w Marklowicach. Każda z informacją o mediach, MPZP i warunkach gruntowych.',
  },
};

export function getAllPlotCitySlugs(): string[] {
  return Object.keys(PLOT_CITY_SEO);
}

export function getPlotCitySEO(slug: string): PlotCitySEO | undefined {
  return PLOT_CITY_SEO[slug];
}

/** Dynamic FAQ — computed from actual plot data for a given city */
export interface PlotFAQItem {
  question: string;
  answer: string;
}

export function generatePlotFAQ(cityLocative: string, plots: Plot[]): PlotFAQItem[] {
  const available = plots.filter((p) => p.availability === 'dostepna');

  if (available.length === 0) {
    return [
      {
        question: `Czy są dostępne działki budowlane ${cityLocative}?`,
        answer: `Aktualnie nie mamy dostępnych działek ${cityLocative}. Regularnie dodajemy nowe oferty — sprawdź ponownie lub skontaktuj się z nami, a poinformujemy Cię o nowych działkach.`,
      },
    ];
  }

  const prices = available.map((p) => p.price);
  const areas = available.map((p) => p.area);
  const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgArea = Math.round(areas.reduce((a, b) => a + b, 0) / areas.length);
  const minArea = Math.min(...areas);
  const maxArea = Math.max(...areas);
  const mpzpCount = available.filter((p) => p.mpzp === 'tak').length;
  const fullMediaCount = available.filter(
    (p) => p.media.water && p.media.electricity && p.media.gas && p.media.sewer
  ).length;

  const faq: PlotFAQItem[] = [
    {
      question: `Ile działek budowlanych jest dostępnych ${cityLocative}?`,
      answer: `Aktualnie mamy ${available.length} ${available.length === 1 ? 'dostępną działkę' : 'dostępnych działek'} budowlanych ${cityLocative}. Oferta jest regularnie aktualizowana.`,
    },
    {
      question: `Jaka jest średnia cena działki budowlanej ${cityLocative}?`,
      answer: `Średnia cena działki budowlanej ${cityLocative} wynosi ${avgPrice.toLocaleString('pl-PL')} zł. Ceny wahają się od ${minPrice.toLocaleString('pl-PL')} zł do ${maxPrice.toLocaleString('pl-PL')} zł.`,
    },
    {
      question: `Jakie są dostępne powierzchnie działek ${cityLocative}?`,
      answer: `Powierzchnie dostępnych działek ${cityLocative} wahają się od ${minArea} m² do ${maxArea} m². Średnia powierzchnia to ${avgArea} m².`,
    },
  ];

  if (mpzpCount > 0) {
    faq.push({
      question: `Czy działki ${cityLocative} mają MPZP?`,
      answer: `${mpzpCount} z ${available.length} dostępnych działek ${cityLocative} posiada Miejscowy Plan Zagospodarowania Przestrzennego (MPZP), co ułatwia i przyspiesza proces uzyskania pozwolenia na budowę.`,
    });
  }

  if (fullMediaCount > 0) {
    faq.push({
      question: `Czy działki ${cityLocative} są uzbrojone?`,
      answer: `${fullMediaCount} z ${available.length} działek posiada pełne uzbrojenie (woda, prąd, gaz, kanalizacja). Pozostałe działki mają częściowy dostęp do mediów — szczegóły w opisie każdej oferty.`,
    });
  }

  faq.push({
    question: `Jak sprawdzić działkę przed zakupem ${cityLocative}?`,
    answer: `Każda działka w naszej ofercie jest wstępnie sprawdzona pod kątem budowy domu jednorodzinnego. Oferujemy bezpłatną analizę działki przy podpisaniu umowy na budowę — sprawdzamy warunki gruntowe, dostęp do mediów, MPZP i warunki zabudowy.`,
  });

  return faq;
}
