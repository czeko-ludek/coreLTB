/**
 * Google Business Profile — pelny audyt wizytowek
 *
 * 2 lokalizacje CoreLTB:
 *   - Jaworzno (glowna):      4925552177843437582
 *   - Wodzislaw Slaski:       1555819064523769539
 *
 * Audyt obejmuje:
 * 1. Performance metrics (wyswietlenia, akcje, trendy)
 * 2. Business info (kompletnosc profilu, kategorie, opis, uslugi)
 * 3. Search keywords (na jakie hasla wizytowka sie wyswietla)
 * 4. Profile audit (scoring, problemy, rekomendacje)
 */

const fs = require('fs');
const path = require('path');
const { getBusinessProfile } = require('./auth');

// Lokalizacje CoreLTB
const LOCATIONS = [
  {
    id: '4925552177843437582',
    name: 'CoreLTB Builders — Jaworzno (glowna)',
    shortName: 'Jaworzno',
  },
  {
    id: '1555819064523769539',
    name: 'CoreLTB Builders — Wodzislaw Slaski',
    shortName: 'Wodzislaw',
  },
];

// Oczekiwane dane wizytowki (do porownania w audycie)
const EXPECTED = {
  websiteUrl: 'https://coreltb.pl',
  primaryPhone: '+48 664 123 757',
  phoneRaw: '664123757',
  companyName: 'CoreLTB Builders',
  // Kategorie ktore maja sens dla firmy budowlanej
  relevantCategories: [
    'construction_company',    // Firma budowlana
    'home_builder',            // Budowa domow
    'civil_engineer',          // Inzynier budownictwa
    'home_inspector',          // Inspektor nadzoru
    'building_designer',       // Projektant budowlany
    'custom_home_builder',     // Budowa domow na zamowienie
    'building_inspector',      // Inspektor budowlany
    'housing_development',     // Budownictwo mieszkalne
  ],
  // Kategorie ktore NIE powinny byc na wizytowce
  irrelevantCategories: [
    'trade_fair_construction_company', // Firma budujaca hale wystawowe
  ],
  // Uslugi ktore CoreLTB faktycznie swiadczy
  coreServices: [
    'home_building',
    'custom_home_building',
    'building_construction',
    'new_building_construction',
    'construction_management',
    'foundation_installation',
    'foundation_pouring',
    'roof_installation',
    'roof_building',
    'concrete_construction',
    'concrete_work',
    'concrete_pouring',
    'exterior_finishing',
    'interior_finishing',
    'home_renovation',
    'deck_construction',
    'patio_construction',
    'garage_construction',
    'consultation',
    'design',
    'architectural_designs',
    'custom_home_design',
    'blueprinting',
    'project_management',
    'excavations',
    'slab_foundation_construction',
    'foundation_drainage',
    'waterproofing',
    'demolition',
  ],
  // Uslugi ktore NIE pasuja do CoreLTB
  irrelevantServices: [
    'assemble_furniture',      // Montaz mebli
    'mount_tv',                // Montaz TV
    'clean_gutters',           // Czyszczenie rynien
    'install_fan',             // Montaz wentylatora
    'repair_fan',              // Naprawa wentylatorow
    'machinery_rental',        // Wynajem maszyn
    'road_construction',       // Roboty drogowe
    'steel_pier_piling_construction', // Molo
    'metal_building_construction',    // Budynki z metalu
    'pole_building_construction',     // Budowa slupow
    'handyman_remodeling',     // Zmiana okablowania (zlly tlumaczenie)
    'kitchen_remodeling',      // Remont kuchni
    'bathroom_remodeling',     // Przebudowa lazienki
    'landscaping',             // Architektura krajobrazu
    'tiny_home_building',      // Budowa malych domow
    'prefabricated_houses',    // Domy z prefabrykatow
    'country_houses',          // Budowa domu na wsi
    'luxury_houses',           // Budowa luksusowych domow
  ],
  // Miasta pokryte przez strone internetowa — PER WIZYTOWKA
  // Kazda wizytowka pokrywa SWOJ region, nie trzeba miec wszystkich miast na kazdej
  coveredCitiesByLocation: {
    'Jaworzno': [
      'Jaworzno', 'Katowice', 'Tychy', 'Mikołów', 'Dąbrowa Górnicza',
      'Sosnowiec', 'Mysłowice', 'Chorzów', 'Siemianowice Śląskie',
    ],
    'Wodzislaw': [
      'Wodzisław Śląski', 'Rybnik', 'Żory', 'Jastrzębie-Zdrój', 'Racibórz',
      'Gliwice', 'Zabrze', 'Knurów', 'Czerwionka-Leszczyny',
    ],
  },
  descriptionMinLength: 200,
  descriptionMaxLength: 750,
};

/**
 * Helper: date range for GBP (YYYY-MM-DD)
 */
function getDateRange(days) {
  const end = new Date();
  end.setDate(end.getDate() - 1);
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return {
    startDate: { year: start.getFullYear(), month: start.getMonth() + 1, day: start.getDate() },
    endDate: { year: end.getFullYear(), month: end.getMonth() + 1, day: end.getDate() },
    startStr: start.toISOString().split('T')[0],
    endStr: end.toISOString().split('T')[0],
  };
}

// ─── Performance Metrics ─────────────────────────────────

async function getPerformanceMetrics(locationId, days) {
  const bpp = await getBusinessProfile();
  const dateRange = getDateRange(days);
  const location = `locations/${locationId}`;

  const dailyMetrics = [
    'BUSINESS_IMPRESSIONS_DESKTOP_MAPS',
    'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH',
    'BUSINESS_IMPRESSIONS_MOBILE_MAPS',
    'BUSINESS_IMPRESSIONS_MOBILE_SEARCH',
    'WEBSITE_CLICKS',
    'CALL_CLICKS',
    'BUSINESS_DIRECTION_REQUESTS',
  ];

  try {
    const res = await bpp.locations.fetchMultiDailyMetricsTimeSeries({
      location: location,
      dailyMetrics: dailyMetrics,
      'dailyRange.startDate.year': dateRange.startDate.year,
      'dailyRange.startDate.month': dateRange.startDate.month,
      'dailyRange.startDate.day': dateRange.startDate.day,
      'dailyRange.endDate.year': dateRange.endDate.year,
      'dailyRange.endDate.month': dateRange.endDate.month,
      'dailyRange.endDate.day': dateRange.endDate.day,
    });

    // Normalize: API returns multiDailyMetricTimeSeries[].dailyMetricTimeSeries[]
    const flat = [];
    for (const group of (res.data.multiDailyMetricTimeSeries || [])) {
      for (const series of (group.dailyMetricTimeSeries || [])) {
        flat.push({
          dailyMetric: series.dailyMetric,
          timeSeries: series.timeSeries,
        });
      }
    }
    return { multiDailyMetricTimeSeries: flat };
  } catch (err) {
    // Fallback: try individual getDailyMetricsTimeSeries
    try {
      const results = [];
      for (const metric of dailyMetrics) {
        try {
          const res = await bpp.locations.getDailyMetricsTimeSeries({
            name: location,
            dailyMetric: metric,
            'dailyRange.startDate.year': dateRange.startDate.year,
            'dailyRange.startDate.month': dateRange.startDate.month,
            'dailyRange.startDate.day': dateRange.startDate.day,
            'dailyRange.endDate.year': dateRange.endDate.year,
            'dailyRange.endDate.month': dateRange.endDate.month,
            'dailyRange.endDate.day': dateRange.endDate.day,
          });
          if (res.data?.timeSeries) {
            results.push({
              dailyMetric: metric,
              timeSeries: res.data.timeSeries,
            });
          }
        } catch { /* skip individual metric errors */ }
      }
      return { multiDailyMetricTimeSeries: results };
    } catch (err2) {
      return { error: err2.message || err.message };
    }
  }
}

// ─── Search Keywords ─────────────────────────────────────

async function getSearchKeywords(locationId, days) {
  const bpp = await getBusinessProfile();
  const dateRange = getDateRange(days);
  const location = `locations/${locationId}`;

  try {
    const res = await bpp.locations.searchkeywords.impressions.monthly.list({
      parent: location,
      'monthlyRange.startMonth.year': dateRange.startDate.year,
      'monthlyRange.startMonth.month': dateRange.startDate.month,
      'monthlyRange.endMonth.year': dateRange.endDate.year,
      'monthlyRange.endMonth.month': dateRange.endDate.month,
    });

    return {
      keywords: res.data.searchKeywordsCounts || [],
    };
  } catch (err) {
    return { keywords: [], error: err.message?.substring(0, 100) };
  }
}

// ─── Business Info ───────────────────────────────────────

async function getBusinessInfo(locationId) {
  try {
    const { google } = require('googleapis');
    const auth = await require('./auth').getAuthClient();

    const mybusiness = google.mybusinessbusinessinformation({
      version: 'v1',
      auth,
    });

    const res = await mybusiness.locations.get({
      name: `locations/${locationId}`,
      readMask: 'name,title,phoneNumbers,categories,websiteUri,regularHours,profile,openInfo,serviceArea,adWordsLocationExtensions',
    });

    return res.data;
  } catch (err) {
    return { error: err.message };
  }
}

// ─── Profile Audit Engine ────────────────────────────────

/**
 * Audytuje profil GBP i generuje score + problemy + rekomendacje
 *
 * Scoring (max 100):
 *   - Tytul (10)
 *   - Opis (15)
 *   - Kategorie (15)
 *   - Uslugi (10)
 *   - Strona www (10)
 *   - Telefon (5)
 *   - Godziny otwarcia (5)
 *   - Obszar uslugowy (10)
 *   - Performance (20) — na podstawie metryk
 */
function auditProfile(info, performance, keywords, locationShortName) {
  const issues = [];      // problemy do naprawienia
  const warnings = [];    // ostrzezenia
  const good = [];        // co jest OK
  let score = 0;
  const maxScore = 100;

  // ─── 1. TYTUL (max 10) ──────────────────────
  if (info.title) {
    good.push(`Tytul: "${info.title}"`);
    // Sprawdz czy tytul zawiera nazwe firmy
    if (info.title.includes('CoreLTB') || info.title.includes('CORELTB')) {
      score += 5;
    } else {
      issues.push('Tytul nie zawiera nazwy firmy "CoreLTB"');
    }
    // Sprawdz dlugosc
    if (info.title.length >= 10 && info.title.length <= 60) {
      score += 3;
    } else if (info.title.length > 60) {
      warnings.push(`Tytul zbyt dlugi (${info.title.length} znakow, max 60)`);
      score += 1;
    }
    // Bonus za slowo kluczowe w tytule (ale Google tego nie lubi — tylko informacyjnie)
    if (info.title.toLowerCase().includes('budow') || info.title.toLowerCase().includes('dom')) {
      score += 2;
      good.push('Tytul zawiera slowo kluczowe (budow/dom)');
    } else {
      warnings.push('Tytul nie zawiera slow kluczowych (budowa, domy) — rozważ dodanie jesli zgodne z nazwa firmy');
    }
  } else {
    issues.push('BRAK TYTULU — krytyczny problem');
  }

  // ─── 2. OPIS (max 15) ──────────────────────
  const desc = info.profile?.description || '';
  if (desc.length > 0) {
    score += 5;
    good.push(`Opis: ${desc.length} znakow`);

    if (desc.length >= EXPECTED.descriptionMinLength) {
      score += 3;
    } else {
      warnings.push(`Opis zbyt krotki (${desc.length}/${EXPECTED.descriptionMinLength} znakow) — rozbuduj o USP, doswiadczenie, region`);
    }

    if (desc.length <= EXPECTED.descriptionMaxLength) {
      score += 2;
    } else {
      warnings.push(`Opis zbyt dlugi (${desc.length}/${EXPECTED.descriptionMaxLength}) — skroc do najwazniejszych informacji`);
    }

    // Sprawdz slowa kluczowe w opisie
    const descLower = desc.toLowerCase();
    const descKeywords = ['budow', 'dom', 'klucz', 'projekt', 'slask', 'śląsk', 'nadzor', 'nadzór'];
    const foundKw = descKeywords.filter(kw => descLower.includes(kw));
    if (foundKw.length >= 3) {
      score += 3;
      good.push(`Opis zawiera ${foundKw.length} slow kluczowych`);
    } else if (foundKw.length >= 1) {
      score += 1;
      warnings.push(`Opis zawiera tylko ${foundKw.length} slow kluczowych — dodaj: budowa, dom pod klucz, Slask, nadzor`);
    } else {
      issues.push('Opis nie zawiera zadnych slow kluczowych');
    }

    // CTA w opisie
    if (descLower.includes('zadzwoń') || descLower.includes('umów') || descLower.includes('kontakt') || descLower.includes('dzwonić')) {
      score += 2;
      good.push('Opis zawiera CTA');
    } else {
      warnings.push('Brak CTA w opisie — dodaj wezwanie do dzialania (zadzwon, umow sie)');
    }
  } else {
    issues.push('BRAK OPISU — krytyczny problem, napisz opis 300-750 znakow');
  }

  // ─── 3. KATEGORIE (max 15) ──────────────────
  const primaryCat = info.categories?.primaryCategory;
  const additionalCats = info.categories?.additionalCategories || [];
  const allCatIds = [];

  if (primaryCat) {
    const catId = extractCategoryId(primaryCat.name);
    allCatIds.push(catId);
    score += 5;
    good.push(`Kategoria glowna: ${primaryCat.displayName}`);

    // Najlepsza glowna kategoria dla firmy budowlanej
    if (['construction_company', 'home_builder', 'custom_home_builder'].includes(catId)) {
      score += 3;
    } else {
      warnings.push(`Kategoria glowna "${primaryCat.displayName}" nie jest optymalna — rozważ "Firma budowlana" lub "Budowa domow"`);
    }
  } else {
    issues.push('BRAK KATEGORII GLOWNEJ');
  }

  if (additionalCats.length > 0) {
    score += 2;
    const catNames = additionalCats.map(c => c.displayName);
    good.push(`Kategorie dodatkowe (${additionalCats.length}): ${catNames.join(', ')}`);

    for (const cat of additionalCats) {
      const catId = extractCategoryId(cat.name);
      allCatIds.push(catId);
    }
  } else {
    issues.push('Brak kategorii dodatkowych — dodaj min. 2-3 (Budowa domow, Inzynier budownictwa)');
  }

  // Sprawdz irrelevant categories
  const irrelevantFound = allCatIds.filter(id => EXPECTED.irrelevantCategories.includes(id));
  if (irrelevantFound.length > 0) {
    const names = additionalCats
      .filter(c => irrelevantFound.includes(extractCategoryId(c.name)))
      .map(c => c.displayName);
    issues.push(`NIEADEKWATNE kategorie do usuniecia: ${names.join(', ')}`);
  } else {
    score += 5;
  }

  // ─── 4. USLUGI (max 10) ─────────────────────
  // UWAGA: API mybusinessbusinessinformation zwraca w serviceTypes WSZYSTKIE
  // szablonowe uslugi Google dla danej kategorii (co firma MOZE oferowac),
  // NIE tylko te ktore uzytkownik wlaczyl. Customowe uslugi (freeform)
  // nie maja serviceTypeId i nie pojawiaja sie tutaj.
  //
  // Dlatego NIE sprawdzamy irrelevantServices z szablonow Google —
  // one nie oznaczaja ze firma je oferuje, a jedynie ze Google je sugeruje
  // dla tej kategorii. Sprawdzamy tylko czy kluczowe uslugi sa pokryte.
  const allServices = [];
  if (primaryCat?.serviceTypes) {
    allServices.push(...primaryCat.serviceTypes);
  }
  for (const cat of additionalCats) {
    if (cat.serviceTypes) {
      allServices.push(...cat.serviceTypes);
    }
  }

  if (allServices.length > 0) {
    score += 3;
    good.push(`Uslugi: ${allServices.length} zdefiniowanych (szablonowe + customowe)`);

    // Sprawdz tylko pokrycie kluczowych uslug (szablonowe Google)
    const serviceIds = allServices.map(s => s.serviceTypeId.replace('job_type_id:', ''));
    const coreSvc = serviceIds.filter(id => EXPECTED.coreServices.includes(id));

    if (coreSvc.length >= 10) {
      score += 4;
      good.push(`Kluczowe uslugi pokryte: ${coreSvc.length}`);
    } else {
      score += 2;
      warnings.push(`Tylko ${coreSvc.length} kluczowych uslug w szablonach Google — dodaj brakujace`);
    }

    // Szablonowe uslugi Google (irrelevantServices) NIE sa problemem —
    // to lista mozliwosci kategorii, nie aktywne uslugi uzytkownika.
    // Dajemy pelne punkty.
    score += 3;
  } else {
    issues.push('BRAK USLUG — dodaj liste swiadczonych uslug');
  }

  // ─── 5. STRONA WWW (max 10) ─────────────────
  if (info.websiteUri) {
    score += 3;
    good.push(`Strona www: ${info.websiteUri}`);

    // Sprawdz HTTPS
    if (info.websiteUri.startsWith('https://')) {
      score += 3;
    } else {
      issues.push(`Strona www ustawiona jako HTTP (${info.websiteUri}) — zmien na HTTPS!`);
    }

    // Sprawdz czy to coreltb.pl
    if (info.websiteUri.includes('coreltb.pl')) {
      score += 2;
    } else {
      issues.push(`Strona www nie wskazuje na coreltb.pl: ${info.websiteUri}`);
    }

    // Sprawdz UTM
    if (info.websiteUri.includes('utm_source=')) {
      score += 2;
      good.push('URL zawiera parametry UTM — sledzenie ruchu z GBP');
    } else {
      warnings.push('Brak UTM w URL wizytowki — dodaj ?utm_source=google&utm_medium=organic&utm_campaign=gbp-jaworzno');
    }
  } else {
    issues.push('BRAK STRONY WWW — krytyczny problem');
  }

  // ─── 6. TELEFON (max 5) ─────────────────────
  if (info.phoneNumbers?.primaryPhone) {
    score += 3;
    const phone = info.phoneNumbers.primaryPhone.replace(/\D/g, '');
    good.push(`Telefon glowny: ${info.phoneNumbers.primaryPhone}`);

    if (phone.includes(EXPECTED.phoneRaw)) {
      score += 2;
    } else {
      issues.push(`Telefon ${info.phoneNumbers.primaryPhone} nie pasuje do oczekiwanego ${EXPECTED.primaryPhone}`);
    }

    if (info.phoneNumbers.additionalPhones?.length > 0) {
      good.push(`Telefony dodatkowe: ${info.phoneNumbers.additionalPhones.join(', ')}`);
    }
  } else {
    issues.push('BRAK TELEFONU — krytyczny problem');
  }

  // ─── 7. GODZINY OTWARCIA (max 5) ────────────
  if (info.regularHours?.periods?.length > 0) {
    score += 3;
    const periods = info.regularHours.periods;
    const days = periods.map(p => p.openDay);
    const workDays = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];
    const hasAllWorkdays = workDays.every(d => days.includes(d));

    if (hasAllWorkdays) {
      score += 2;
      good.push(`Godziny: Pn-Pt ${periods[0].openTime.hours}:00-${periods[0].closeTime.hours}:00`);
    } else {
      warnings.push('Nie wszystkie dni robocze maja ustawione godziny');
    }

    // Sprawdz czy sobota jest dodana
    if (days.includes('SATURDAY')) {
      good.push('Sobota dodana do godzin');
    } else {
      warnings.push('Brak godzin sobotnich — jesli pracujecie w soboty, dodajcie');
    }
  } else {
    issues.push('BRAK GODZIN OTWARCIA — ustaw Pn-Pt 8:00-17:00');
  }

  // ─── 8. OBSZAR USLUGOWY (max 10) ────────────
  if (info.serviceArea) {
    score += 3;
    const places = info.serviceArea.places?.placeInfos || [];
    const placeNames = places.map(p => p.placeName.replace(', Polska', '').replace(/^\d+-?\d*\s*/, ''));
    good.push(`Obszar uslugowy: ${places.length} lokalizacji`);

    if (info.serviceArea.businessType === 'CUSTOMER_LOCATION_ONLY') {
      score += 2;
      good.push('Typ: dojazd do klienta (poprawne dla firmy budowlanej)');
    }

    // Sprawdz pokrycie miast z landing pages — PER WIZYTOWKA (kazda ma swoj region)
    const expectedCities = EXPECTED.coveredCitiesByLocation[locationShortName] || [];
    const coveredOnGBP = expectedCities.filter(city =>
      placeNames.some(p => p.includes(city) || city.includes(p))
    );
    const missingCities = expectedCities.filter(city =>
      !placeNames.some(p => p.includes(city) || city.includes(p))
    );

    if (coveredOnGBP.length >= expectedCities.length * 0.8) {
      score += 3;
      good.push(`Pokrycie miast: ${coveredOnGBP.length}/${expectedCities.length} z landing pages`);
    } else {
      score += 1;
      warnings.push(`Brakujace miasta w obszarze (macie landing pages!): ${missingCities.join(', ')}`);
    }

    if (places.length >= 10) {
      score += 2;
    } else {
      warnings.push(`Tylko ${places.length} lokalizacji — dodaj wiecej miast Slaska`);
    }
  } else {
    issues.push('BRAK OBSZARU USLUGOWEGO — dodaj miasta Slaska');
  }

  // ─── 9. PERFORMANCE SCORING (max 20) ────────
  if (performance?.multiDailyMetricTimeSeries) {
    const totals = calculateTotals(performance);

    if (totals.totalImpressions > 0) {
      // Impressions scoring
      if (totals.totalImpressions >= 500) score += 5;
      else if (totals.totalImpressions >= 200) score += 3;
      else if (totals.totalImpressions >= 50) score += 2;
      else score += 1;

      // Actions scoring (clicks, calls, directions)
      const totalActions = totals.websiteClicks + totals.callClicks + totals.directions;
      if (totalActions >= 50) score += 5;
      else if (totalActions >= 20) score += 3;
      else if (totalActions >= 5) score += 2;
      else score += 1;

      // Engagement rate (actions / impressions)
      const engRate = totals.totalImpressions > 0
        ? (totalActions / totals.totalImpressions * 100)
        : 0;
      if (engRate >= 15) score += 5;
      else if (engRate >= 8) score += 3;
      else if (engRate >= 3) score += 2;
      else score += 1;

      // Mobile vs Desktop balance
      const mobileShare = totals.mobileImpressions / totals.totalImpressions * 100;
      if (mobileShare >= 40 && mobileShare <= 80) {
        score += 5;
        good.push(`Balans mobile/desktop: ${mobileShare.toFixed(0)}% mobile`);
      } else {
        score += 2;
        warnings.push(`Niezrownowazony ruch: ${mobileShare.toFixed(0)}% mobile — sprawdz widocznosc na ${mobileShare < 40 ? 'mobile' : 'desktop'}`);
      }

      good.push(`Performance: ${totals.totalImpressions} wyswietlen, ${totalActions} akcji, engagement ${engRate.toFixed(1)}%`);
    } else {
      issues.push('ZERO wyswietlen w okresie — wizytowka moze byc niewidoczna');
    }
  }

  // ─── PODSUMOWANIE ───────────────────────────
  const grade = score >= 85 ? 'A' : score >= 70 ? 'B' : score >= 55 ? 'C' : score >= 40 ? 'D' : 'F';

  return {
    score,
    maxScore,
    grade,
    issues,
    warnings,
    good,
  };
}

/**
 * Wyciaga ID kategorii z pelnej nazwy (categories/gcid:xxx -> xxx)
 */
function extractCategoryId(name) {
  return (name || '').replace('categories/gcid:', '');
}

/**
 * Oblicza sumy metryk performance
 */
function calculateTotals(performance) {
  const series = performance?.multiDailyMetricTimeSeries || [];
  const totals = {
    desktopMaps: 0,
    desktopSearch: 0,
    mobileMaps: 0,
    mobileSearch: 0,
    websiteClicks: 0,
    callClicks: 0,
    directions: 0,
    totalImpressions: 0,
    mobileImpressions: 0,
    desktopImpressions: 0,
    dailyData: [],
  };

  for (const metric of series) {
    const dataPoints = metric.timeSeries?.datedValues || [];
    const total = dataPoints.reduce((sum, dp) => sum + (parseInt(dp.value) || 0), 0);

    switch (metric.dailyMetric) {
      case 'BUSINESS_IMPRESSIONS_DESKTOP_MAPS': totals.desktopMaps = total; break;
      case 'BUSINESS_IMPRESSIONS_DESKTOP_SEARCH': totals.desktopSearch = total; break;
      case 'BUSINESS_IMPRESSIONS_MOBILE_MAPS': totals.mobileMaps = total; break;
      case 'BUSINESS_IMPRESSIONS_MOBILE_SEARCH': totals.mobileSearch = total; break;
      case 'WEBSITE_CLICKS': totals.websiteClicks = total; break;
      case 'CALL_CLICKS': totals.callClicks = total; break;
      case 'BUSINESS_DIRECTION_REQUESTS': totals.directions = total; break;
    }
  }

  totals.mobileImpressions = totals.mobileMaps + totals.mobileSearch;
  totals.desktopImpressions = totals.desktopMaps + totals.desktopSearch;
  totals.totalImpressions = totals.mobileImpressions + totals.desktopImpressions;

  return totals;
}

// ─── Report Generator ────────────────────────────────────

/**
 * Generuje pelny raport GBP (performance + info + audit)
 */
async function generateGBPReport(days) {
  const results = [];

  for (const loc of LOCATIONS) {
    const [performance, keywords, info] = await Promise.all([
      getPerformanceMetrics(loc.id, days),
      getSearchKeywords(loc.id, days),
      getBusinessInfo(loc.id),
    ]);

    const audit = !info.error ? auditProfile(info, performance, keywords, loc.shortName) : null;

    results.push({
      location: loc,
      performance,
      keywords,
      info,
      audit,
    });
  }

  return results;
}

/**
 * Formatuje pelny raport GBP do Markdown
 */
function formatGBPReport(results) {
  const lines = [];
  const add = (line = '') => lines.push(line);

  add('## Google Business Profile — Audyt');
  add('');

  for (const result of results) {
    add(`### ${result.location.shortName}`);
    add('');

    // ─── Audit Score ──────────────────────
    if (result.audit) {
      const { score, maxScore, grade, issues, warnings, good } = result.audit;
      add(`**Ocena profilu: ${score}/${maxScore} (${grade})**`);
      add('');

      // Performance summary
      if (result.performance?.multiDailyMetricTimeSeries) {
        const totals = calculateTotals(result.performance);
        const totalActions = totals.websiteClicks + totals.callClicks + totals.directions;

        add('#### Wyniki (okres raportu)');
        add('');
        add('| Metryka | Wartosc |');
        add('|---------|---------|');
        add(`| Wyswietlenia lacznie | **${totals.totalImpressions}** |`);
        add(`| — Search (desktop) | ${totals.desktopSearch} |`);
        add(`| — Search (mobile) | ${totals.mobileSearch} |`);
        add(`| — Maps (desktop) | ${totals.desktopMaps} |`);
        add(`| — Maps (mobile) | ${totals.mobileMaps} |`);
        add(`| Klikniecia www | ${totals.websiteClicks} |`);
        add(`| Klikniecia telefon | ${totals.callClicks} |`);
        add(`| Prosby o nawigacje | ${totals.directions} |`);
        add(`| **Akcje lacznie** | **${totalActions}** |`);

        if (totals.totalImpressions > 0) {
          const engRate = (totalActions / totals.totalImpressions * 100).toFixed(1);
          add(`| Engagement rate | ${engRate}% |`);
          const mobileShare = (totals.mobileImpressions / totals.totalImpressions * 100).toFixed(0);
          add(`| Udzial mobile | ${mobileShare}% |`);
        }
        add('');
      }

      // Profil biznesowy
      if (result.info && !result.info.error) {
        add('#### Profil biznesowy');
        add('');
        add('| Element | Wartosc |');
        add('|---------|---------|');
        add(`| Tytul | ${result.info.title || 'BRAK'} |`);
        add(`| Strona www | ${result.info.websiteUri || 'BRAK'} |`);
        add(`| Telefon | ${result.info.phoneNumbers?.primaryPhone || 'BRAK'} |`);

        if (result.info.phoneNumbers?.additionalPhones?.length) {
          add(`| Telefony dodatkowe | ${result.info.phoneNumbers.additionalPhones.join(', ')} |`);
        }

        const primaryCat = result.info.categories?.primaryCategory;
        if (primaryCat) {
          add(`| Kategoria glowna | ${primaryCat.displayName} |`);
        }
        const addCats = result.info.categories?.additionalCategories || [];
        if (addCats.length) {
          add(`| Kategorie dodatkowe | ${addCats.map(c => c.displayName).join(', ')} |`);
        }

        if (result.info.regularHours?.periods?.length) {
          const p = result.info.regularHours.periods[0];
          add(`| Godziny | Pn-Pt ${p.openTime.hours}:00-${p.closeTime.hours}:00 |`);
        }

        if (result.info.openInfo?.openingDate) {
          const od = result.info.openInfo.openingDate;
          add(`| Data otwarcia | ${od.month || '?'}/${od.year || '?'} |`);
        }

        const places = result.info.serviceArea?.places?.placeInfos || [];
        if (places.length) {
          const placeNames = places.map(p => p.placeName.replace(', Polska', '').replace(/^\d+-?\d*\s*/, ''));
          add(`| Obszar (${places.length} miast) | ${placeNames.join(', ')} |`);
        }

        // Opis (skrocony)
        const desc = result.info.profile?.description || '';
        if (desc) {
          add(`| Opis | ${desc.length} znakow |`);
        }

        // Liczba uslug
        let svcCount = 0;
        if (primaryCat?.serviceTypes) svcCount += primaryCat.serviceTypes.length;
        for (const cat of addCats) {
          if (cat.serviceTypes) svcCount += cat.serviceTypes.length;
        }
        if (svcCount) {
          add(`| Uslugi | ${svcCount} zdefiniowanych |`);
        }

        add('');
      }

      // Keywords
      if (result.keywords?.keywords?.length > 0) {
        add('#### Hasla wyszukiwania (Maps)');
        add('');
        add('| Haslo | Wyswietlenia |');
        add('|-------|-------------|');

        const sorted = [...result.keywords.keywords]
          .sort((a, b) => (parseInt(b.insightsValue?.value) || 0) - (parseInt(a.insightsValue?.value) || 0))
          .slice(0, 15);

        for (const kw of sorted) {
          add(`| ${kw.searchKeyword || '-'} | ${kw.insightsValue?.value || '-'} |`);
        }
        add('');
      }

      // Problemy
      if (issues.length > 0) {
        add('#### Problemy do naprawienia');
        add('');
        for (const issue of issues) {
          add(`- **${issue}**`);
        }
        add('');
      }

      // Ostrzezenia
      if (warnings.length > 0) {
        add('#### Ostrzezenia');
        add('');
        for (const warning of warnings) {
          add(`- ${warning}`);
        }
        add('');
      }

      // Co jest OK
      if (good.length > 0) {
        add('<details><summary>Co jest OK</summary>');
        add('');
        for (const g of good) {
          add(`- ${g}`);
        }
        add('');
        add('</details>');
        add('');
      }
    } else if (result.info?.error) {
      add(`> Blad pobierania danych biznesowych: ${result.info.error.substring(0, 100)}`);
      add('');

      // Pokaz chociaz performance
      if (result.performance?.multiDailyMetricTimeSeries) {
        const totals = calculateTotals(result.performance);
        add('| Metryka | Wartosc |');
        add('|---------|---------|');
        add(`| Wyswietlenia | ${totals.totalImpressions} |`);
        add(`| Klikniecia www | ${totals.websiteClicks} |`);
        add(`| Telefon | ${totals.callClicks} |`);
        add(`| Nawigacje | ${totals.directions} |`);
        add('');
      }
    }
  }

  // Porownanie lokalizacji
  if (results.length >= 2 && results.every(r => r.audit)) {
    add('### Porownanie lokalizacji');
    add('');
    add('| Element | ' + results.map(r => r.location.shortName).join(' | ') + ' |');
    add('|---------|' + results.map(() => '---------|').join(''));

    // Score
    add('| Ocena | ' + results.map(r => `${r.audit.score}/${r.audit.maxScore} (${r.audit.grade})`).join(' | ') + ' |');

    // Performance totals
    const allTotals = results.map(r => calculateTotals(r.performance));
    add('| Wyswietlenia | ' + allTotals.map(t => t.totalImpressions).join(' | ') + ' |');
    add('| Klik www | ' + allTotals.map(t => t.websiteClicks).join(' | ') + ' |');
    add('| Telefon | ' + allTotals.map(t => t.callClicks).join(' | ') + ' |');
    add('| Nawigacje | ' + allTotals.map(t => t.directions).join(' | ') + ' |');
    add('| Problemy | ' + results.map(r => r.audit.issues.length).join(' | ') + ' |');
    add('| Ostrzezenia | ' + results.map(r => r.audit.warnings.length).join(' | ') + ' |');
    add('');
  }

  return lines.join('\n');
}

// ─── History & Delta Tracking ────────────────────────────

const HISTORY_PATH = path.join(__dirname, '..', 'data', 'gbp-history.json');

/**
 * Zapisuje snapshot biezacych metryk do historii
 */
function saveSnapshot(results) {
  let history;
  try {
    history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
  } catch {
    history = { snapshots: [] };
  }

  const dateStr = new Date().toISOString().split('T')[0];

  // Nie zapisuj duplikatow z tego samego dnia
  if (history.snapshots.some(s => s.date === dateStr)) {
    return history;
  }

  const snapshot = {
    date: dateStr,
    locations: {},
  };

  for (const result of results) {
    const totals = calculateTotals(result.performance);
    snapshot.locations[result.location.shortName] = {
      impressions: totals.totalImpressions,
      searchImpressions: totals.desktopSearch + totals.mobileSearch,
      mapsImpressions: totals.desktopMaps + totals.mobileMaps,
      websiteClicks: totals.websiteClicks,
      callClicks: totals.callClicks,
      directions: totals.directions,
      totalActions: totals.websiteClicks + totals.callClicks + totals.directions,
      engagementRate: totals.totalImpressions > 0
        ? ((totals.websiteClicks + totals.callClicks + totals.directions) / totals.totalImpressions * 100)
        : 0,
      auditScore: result.audit?.score || null,
      auditGrade: result.audit?.grade || null,
      issuesCount: result.audit?.issues?.length || 0,
    };
  }

  history.snapshots.push(snapshot);

  // Zachowaj max 24 snapshotow (2 lata miesiecznych)
  if (history.snapshots.length > 24) {
    history.snapshots = history.snapshots.slice(-24);
  }

  fs.writeFileSync(HISTORY_PATH, JSON.stringify(history, null, 2), 'utf8');
  return history;
}

/**
 * Porownuje biezace metryki z poprzednim snapshotem
 * Zwraca obiekt z deltami dla kazdej lokalizacji
 */
function compareWithPrevious(results) {
  let history;
  try {
    history = JSON.parse(fs.readFileSync(HISTORY_PATH, 'utf8'));
  } catch {
    return null;
  }

  if (history.snapshots.length === 0) {
    return null;
  }

  const previous = history.snapshots[history.snapshots.length - 1];
  const comparison = {
    previousDate: previous.date,
    locations: {},
  };

  for (const result of results) {
    const name = result.location.shortName;
    const prevData = previous.locations[name];
    if (!prevData) continue;

    const totals = calculateTotals(result.performance);
    const currentActions = totals.websiteClicks + totals.callClicks + totals.directions;

    const delta = (current, prev) => {
      if (prev === 0 && current === 0) return { value: 0, pct: 0, arrow: '→' };
      if (prev === 0) return { value: current, pct: 100, arrow: '↑' };
      const diff = current - prev;
      const pct = (diff / prev * 100);
      return {
        value: diff,
        pct: Math.round(pct),
        arrow: diff > 0 ? '↑' : diff < 0 ? '↓' : '→',
      };
    };

    comparison.locations[name] = {
      impressions: delta(totals.totalImpressions, prevData.impressions),
      websiteClicks: delta(totals.websiteClicks, prevData.websiteClicks),
      callClicks: delta(totals.callClicks, prevData.callClicks),
      directions: delta(totals.directions, prevData.directions),
      totalActions: delta(currentActions, prevData.totalActions),
      auditScore: delta(result.audit?.score || 0, prevData.auditScore || 0),
    };
  }

  return comparison;
}

/**
 * Formatuje porownanie delta do Markdown
 */
function formatDeltaReport(comparison) {
  if (!comparison) return '';

  const lines = [];
  const add = (line = '') => lines.push(line);

  add('### Porownanie z poprzednim okresem');
  add(`> Poprzedni snapshot: ${comparison.previousDate}`);
  add('');

  const locNames = Object.keys(comparison.locations);
  if (locNames.length === 0) {
    add('> Brak danych do porownania');
    return lines.join('\n');
  }

  add('| Metryka | ' + locNames.map(n => `${n} (zmiana)`).join(' | ') + ' |');
  add('|---------|' + locNames.map(() => '---------|').join(''));

  const metrics = [
    { key: 'impressions', label: 'Wyswietlenia' },
    { key: 'websiteClicks', label: 'Klik www' },
    { key: 'callClicks', label: 'Telefon' },
    { key: 'directions', label: 'Nawigacje' },
    { key: 'totalActions', label: 'Akcje lacznie' },
    { key: 'auditScore', label: 'Ocena profilu' },
  ];

  for (const m of metrics) {
    const cells = locNames.map(name => {
      const d = comparison.locations[name]?.[m.key];
      if (!d) return '-';
      const sign = d.value > 0 ? '+' : '';
      return `${d.arrow} ${sign}${d.value} (${sign}${d.pct}%)`;
    });
    add(`| ${m.label} | ${cells.join(' | ')} |`);
  }
  add('');

  return lines.join('\n');
}

module.exports = {
  LOCATIONS,
  EXPECTED,
  getPerformanceMetrics,
  getSearchKeywords,
  getBusinessInfo,
  auditProfile,
  calculateTotals,
  generateGBPReport,
  formatGBPReport,
  saveSnapshot,
  compareWithPrevious,
  formatDeltaReport,
};
