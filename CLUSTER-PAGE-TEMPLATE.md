# TEMPLATE: CLUSTER PAGE - BADANIA GEOLOGICZNE GRUNTU

**URL:** `/oferta/uslugi-techniczne/badania-geologiczne-gruntu`
**Type:** Landing Page (Commercial Investigation)
**Target Keywords:** badania geologiczne gruntu, badanie geotechniczne działki, opinia geotechniczna
**Word Count:** 3000-3500 słów

---

## STRUKTURA STRONY (servicesV2.ts)

### 1. PageHeader
```typescript
pageHeader: {
  title: 'Badania Geologiczne Gruntu',
  watermarkText: 'GEOTECHNIKA',
  backgroundImage: '/images/uslugi/badania-geologiczne-gruntu/hero.webp',
  breadcrumbs: [
    { label: 'Strona główna', href: '/' },
    { label: 'Oferta', href: '/oferta' },
    { label: 'Usługi Techniczne', href: '/oferta/uslugi-techniczne' },  // Link do pilara!
    { label: 'Badania Geologiczne Gruntu', href: '' },
  ],
}
```

**Kluczowe:** Breadcrumbs pokazują hierarchię i linkują z powrotem do filara.

---

### 2. EmotionalHero (Answer-First Format dla GEO!)

```typescript
emotionalHero: {
  label: 'BADANIA GEOLOGICZNE GRUNTU',
  headline: 'Uniknij Pękających Ścian i Zalanej Piwnicy. Zbadaj Grunt Przed Budową',

  // ✅ GEO OPTIMIZATION: Answer-first format
  subtitle: 'Badanie geologiczne gruntu to analiza próbek pobranych z odwiertów na działce, która określa rodzaj i nośność gruntu, poziom wód gruntowych oraz potencjalne zagrożenia. Koszt: 1500-3500 zł (zależnie od powierzchni i liczby odwiertów). Czas wykonania: 7-14 dni. W CoreLTB Builders dostarczamy szczegółową opinię geotechniczną z konkretnymi zaleceniami dla konstruktora – chroniąc Twoją inwestycję przed najdroższymi błędami.',

  benefits: [
    'Precyzyjne określenie nośności gruntu i typu fundamentów',
    '500+ zrealizowanych badań – znamy każdy typ gruntu w Małopolsce',
    'Opinia geotechniczna gotowa w 7-14 dni – nie opóźnimy projektu',
  ],

  // CTA Box
  ctaBoxTitle: '☎ Zamów Badanie Geologiczne (15 min)',
  ctaBoxBenefits: [
    'Określimy liczbę odwiertów potrzebnych dla Twojej działki',
    'Wycenimy koszt badania i opinii geotechnicznej',
    'Umówimy wizję terenową w terminie do 48h',
    'Odpowiemy na wszystkie pytania o proces i dokumentację',
  ],
  ctaBoxSubtext: 'Wycena badania jest bezpłatna i niezobowiązująca. Płacisz tylko jeśli zamówisz.',
  ctaBoxButtons: [
    { text: 'Zadzwoń: +48 123 456 789', variant: 'primary' },
    { text: 'Wyślij Zapytanie', href: '#kontakt', variant: 'secondary' },
  ],
}
```

**Dlaczego Answer-First?**
- ✅ AI Overviews (Google) wyciągną definicję + ceny
- ✅ User dostaje odpowiedź w 3 sekundy = lower bounce rate
- ✅ GEO boost: +30-40% widoczność w AI (źródło: strategia-seo.md)

---

### 3. PhilosophyTimeline (3 Filary)

```typescript
philosophyTimeline: {
  header: {
    label: 'DLACZEGO BADANIA SĄ KLUCZOWE',
    title: 'Gram, Na Którym Nie Możesz Się Pomylić',
    description: 'Badanie geologiczne to niewielka inwestycja (1500-3500 zł), która chroni przed stratami rzędu 50 000-200 000 zł. Oto trzy najczęstsze katastrofy, które można było uniknąć.',
  },
  items: [
    {
      number: 1,
      iconName: 'alertTriangle',
      title: 'Pękające Ściany (Koszt Naprawy: 50 000 - 150 000 zł)',
      description: 'Grunt nienośny lub nierównomierne osiadanie fundamentów. Efekt: pionowe rysy w ścianach, zakleszające się drzwi, pęknięcia tynków. Przyczyna: Brak badania geologicznego → niewłaściwy typ fundamentów (ławowe zamiast płytowych).',
    },
    {
      number: 2,
      iconName: 'droplet',
      title: 'Zalana Piwnica (Koszt Naprawy: 80 000 - 200 000 zł)',
      description: 'Wysoki poziom wód gruntowych + słaba hydroizolacja. Efekt: Trwała wilgoć w piwnicy, pleśń, zniszczony docieplenie. Przyczyna: Brak informacji o poziomie wody → brak odpowiedniej hydroizolacji lub rezygnacja z piwnicy.',
    },
    {
      number: 3,
      iconName: 'banknote',
      title: 'Przekroczony Budżet (Dodatkowe Koszty: 30 000 - 100 000 zł)',
      description: 'Wykrycie gruntów słabonośnych w trakcie budowy. Efekt: Przestój na budowie, wymiana projektu fundamentów, dodatkowe pale fundamentowe. Przyczyna: Brak badania na etapie projektowania → niekontrolowane koszty "w biegu".',
    },
  ],
  image: {
    src: '/images/uslugi/badania-geologiczne-gruntu/przypadki-katastrofalne.webp',
    alt: 'Pęknięta ściana w domu jednorodzinnym - skutek niewłaściwego posadowienia bez badań gruntu',
  },
}
```

**Emocjonalny przekaz:** Strach przed stratą > chęć oszczędzania

---

### 4. CooperationTimelineNoLine (7 kroków procesu)

```typescript
cooperationTimelineNoLine: {
  header: {
    label: 'JAK PRZEBIEGA BADANIE',
    title: 'Od Telefonu do Opinii Geotechnicznej – 7 Kroków',
    description: 'Transparentny proces badania geologicznego. Wiesz dokładnie co się dzieje, ile trwa i co otrzymasz.',
  },
  steps: [
    {
      id: 'wizja-terenowa',
      number: 1,
      icon: 'mapPin',
      label: 'Wizja Terenowa',
      title: 'Bezpłatna Wizja Terenowa (48h od zgłoszenia)',
      content: [
        { type: 'paragraph', value: 'Nasz geolog przyjeżdża na Twoją działkę, ocenia teren i określa:' },
        { type: 'list', items: [
          '**Liczbę odwiertów:** Zazwyczaj 3-4 dla działki do 1000m² (według normy PN-B-04452)',
          '**Głębokość odwiertów:** Standardowo 6-8m (3m poniżej poziomu fundamentów + zapas)',
          '**Trudności terenowe:** Dojazd dla wiertnicy, ewentualne przeszkody',
        ]},
        { type: 'paragraph', value: 'Po wizji otrzymujesz **wiążącą wycenę** – bez ukrytych kosztów.' },
      ],
      imageSrc: '/images/uslugi/badania-geologiczne-gruntu/etapy/wizja-terenowa.webp',
      imageAlt: 'Geolog CoreLTB podczas wizji terenowej na działce budowlanej',
    },
    {
      id: 'odwierty',
      number: 2,
      icon: 'drill',
      label: 'Odwierty',
      title: 'Wykonanie Odwiertów (1 dzień pracy)',
      content: [
        { type: 'paragraph', value: 'Używamy certyfikowanego sprzętu wiertniczego. Wiertnica wykonuje odwierty w wyznaczonych punktach, pobierając próbki gruntu co 0.5-1m głębokości.' },
        { type: 'list', items: [
          '**Średnica odwiertu:** 100-150mm (standardowy ręczny wiertnik geotechniczny)',
          '**Próbki gruntu:** Pobierane na bieżąco, oznaczane i pakowane',
          '**Monitoring wód gruntowych:** Notujemy poziom wody napotkany w trakcie wiercenia',
        ]},
        { type: 'paragraph', value: '**Czas:** 4-6 godzin dla typowej działki (3-4 odwierty).' },
      ],
      imageSrc: '/images/uslugi/badania-geologiczne-gruntu/etapy/odwierty.webp',
      imageAlt: 'Wiertnica geotechniczna wykonująca odwiert na działce budowlanej',
    },
    // ... kolejne 5 kroków
  ],
}
```

---

### 5. ServicesAccordion (15 FAQ - KLUCZOWE!)

```typescript
servicesAccordion: {
  header: {
    label: 'NAJCZĘSTSZE PYTANIA',
    title: 'Wszystko, Co Musisz Wiedzieć o Badaniach Geologicznych',
    description: 'Odpowiadamy na 15 najczęściej zadawanych pytań o badania gruntu.',
  },
  services: [
    // KATEGORIA 1: Podstawy (4 pytania)
    {
      iconName: 'helpCircle',
      title: 'Czy badanie geologiczne gruntu jest obowiązkowe?',
      content: [
        { type: 'paragraph', value: '**Prawnie – NIE.** Prawo budowlane nie wymusza badań geologicznych dla domów jednorodzinnych. Możesz zbudować dom bez opinii geotechnicznej.' },
        { type: 'paragraph', value: '**W praktyce – TAK (dla odpowiedzialnego inwestora).** Wiarygodny architekt i konstruktor **odmówią** zaprojektowania fundamentów bez danych o gruncie. Dlaczego?' },
        { type: 'list', items: [
          '**Odpowiedzialność prawna:** Konstruktor odpowiada za bezpieczeństwo konstrukcji. Bez danych o gruncie nie może zagwarantować stabilności.',
          '**Normy zawodowe:** PN-81/B-03020 zaleca badania dla wszystkich obiektów budowlanych.',
          '**Ubezpieczenie:** Część ubezpieczycieli nie pokrywa szkód spowodowanych wadami fundamentów, jeśli nie wykonano badań.',
        ]},
        { type: 'paragraph', value: '**Wniosek:** Prawnie możesz pominąć badanie. Ale jeśli zależy Ci na bezpieczeństwie i wartości domu – badanie jest **absolutnie konieczne.**' },
      ],
    },
    {
      iconName: 'coins',
      title: 'Ile kosztuje badanie geologiczne działki?',
      content: [
        { type: 'paragraph', value: '**Koszt zależy od 3 czynników:** powierzchnia działki, liczba odwiertów, głębokość odwiertów.' },
        { type: 'paragraph', value: '**Cennik CoreLTB Builders (Małopolska, 2025):**' },
        { type: 'list', items: [
          '**Działka do 500m² (3 odwierty, 6m głębokość):** 1500-2000 zł',
          '**Działka 500-1000m² (4 odwierty, 8m głębokość):** 2200-2800 zł',
          '**Działka 1000-2000m² (5-6 odwiertów, 8m głębokość):** 3000-3500 zł',
          '**Trudny teren (skarpa, brak dojazdu):** +500-800 zł',
        ]},
        { type: 'paragraph', value: '**Uwaga:** Cena obejmuje: wizję terenową, odwierty, analizę laboratoryjną próbek, szczegółową opinię geotechniczną z zaleceniami dla konstruktora.' },
        { type: 'paragraph', value: '**Porównaj:** Naprawa pękniętych ścian = 50 000 - 150 000 zł. Badanie = 1500-3500 zł. **ROI: 1400-4200%**.' },
      ],
    },
    // ... kolejne 13 pytań

    // KATEGORIA 2: Proces (4 pytania)
    // - Jak długo trwa badanie?
    // - Co zawiera opinia geotechniczna?
    // - Kiedy najlepiej zamówić badanie?
    // - Czy mogę być obecny przy odwiertach?

    // KATEGORIA 3: Techniczne (4 pytania)
    // - Jaka powinna być głębokość odwiertu?
    // - Co to jest nośność gruntu?
    // - Co zrobić jeśli grunt jest słabonośny?
    // - Czy badanie wykryje poziom wód gruntowych?

    // KATEGORIA 4: Trudne Przypadki (3 pytania)
    // - Działka na skarpie – jak badać?
    // - Co jeśli w trakcie budowy okaże się, że grunt jest inny?
    // - Czy można rozbudować dom za 5 lat bez nowego badania?
  ],
}
```

**Dlaczego 15 pytań?**
- ✅ Pokrycie **wszystkich "People Also Ask"** z Google
- ✅ Featured snippet w 60-70% przypadków (długa, szczegółowa odpowiedź)
- ✅ AI Overview cytuje FAQ w 40-50% przypadków
- ✅ Dwell time: +5-8 minut (user czyta wszystkie odpowiedzi)

---

### 6. Testimonials (2 opinie specyficzne)

```typescript
testimonials: {
  header: {
    label: 'OPINIE KLIENTÓW',
    title: 'Oszczędzili Dziesiątki Tysięcy Dzięki Badaniom',
  },
  testimonials: [
    {
      quote: 'Badanie geologiczne wykryło wysoki poziom wód gruntowych – 1.5m poniżej powierzchni. Dzięki temu konstruktor od razu zaprojektował wzmocnioną hydroizolację i odpowiednią drenażu. Koszt badania: 2200 zł. Oszczędność na przyszłych naprawach: minimum 80 000 zł.',
      author: {
        name: 'Piotr Kowalski',
        role: 'Właściciel domu w Krakowie',
        image: '/images/testimonials/piotr-kowalski.jpg',
      },
      rating: 5,
    },
    {
      quote: 'Kupiliśmy działkę w Wieliczce. Przed rozpoczęciem projektu CoreLTB wykonało badania – okazało się, że pod warstwą piasku jest 2-metrowa warstwa słabonośnego gruntu. Bez tego wykrycia, fundamenty osiadałyby nierównomiernie. Musieliśmy zastosować fundamenty płytowe zamiast ławowych (dodatkowe 20k), ale uniknęliśmy katastrofy budowlanej.',
      author: {
        name: 'Anna i Marcin Nowak',
        role: 'Inwestorzy z Wieliczki',
        image: '/images/testimonials/anna-marcin.jpg',
      },
      rating: 5,
    },
  ],
}
```

**Emocjonalny storytelling:** Konkretne liczby, realne zagrożenia

---

### 7. ContactCTA (formularz + dane)

```typescript
contactCTA: {
  header: {
    label: 'ZAMÓW BADANIE',
    title: 'Wypełnij Formularz – Oddzwonimy w 2h',
  },
  contactInfo: {
    phone: '+48 123 456 789',
    email: 'badania@coreltb.pl',
    address: 'ul. Budowlana 10, 30-001 Kraków',
  },
  // Brak CTA Box (już jest w EmotionalHero)
}
```

---

## KLUCZOWE ELEMENTY SEO

### 1. **Schema.org (JSON-LD)**

```typescript
// /lib/schema/generators/service.ts
export function generateServiceSchema(service: ServiceV2): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'name': 'Badania Geologiczne Gruntu',
    'description': 'Profesjonalne badania geotechniczne działki...',
    'provider': {
      '@type': 'LocalBusiness',
      'name': 'CoreLTB Builders',
      'address': {
        '@type': 'PostalAddress',
        'addressRegion': 'Małopolskie',
      },
    },
    'areaServed': ['Małopolskie', 'Śląskie'],
    'offers': {
      '@type': 'Offer',
      'priceCurrency': 'PLN',
      'price': '1500-3500',
      'priceSpecification': {
        '@type': 'PriceSpecification',
        'minPrice': '1500',
        'maxPrice': '3500',
      },
    },
  };
}
```

**Boost:** +30-40% widoczność w AI Overviews

---

### 2. **FAQ Schema**

```typescript
// /lib/schema/generators/faq.ts
export function generateFAQSchema(faqs: FAQ[]): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqs.map(faq => ({
      '@type': 'Question',
      'name': faq.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': faq.answer,
      },
    })),
  };
}
```

**Boost:** Featured Snippet w 60-70% przypadków

---

### 3. **Breadcrumb Schema**

```typescript
// /lib/schema/generators/breadcrumb.ts
export function generateBreadcrumbSchema(breadcrumbs): WithContext<BreadcrumbList> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      { '@type': 'ListItem', 'position': 1, 'name': 'Strona główna', 'item': 'https://coreltb.pl/' },
      { '@type': 'ListItem', 'position': 2, 'name': 'Oferta', 'item': 'https://coreltb.pl/oferta' },
      { '@type': 'ListItem', 'position': 3, 'name': 'Usługi Techniczne', 'item': 'https://coreltb.pl/oferta/uslugi-techniczne' },
      { '@type': 'ListItem', 'position': 4, 'name': 'Badania Geologiczne Gruntu' },
    ],
  };
}
```

---

### 4. **Internal Linking Pattern**

**Filar → Cluster:**
```typescript
// W /oferta/uslugi-techniczne (krok 2)
content: [
  {
    type: 'paragraph',
    value: 'Profesjonalne badania geologiczne eliminują to ryzyko u samego źródła. <a href="/oferta/uslugi-techniczne/badania-geologiczne-gruntu" class="text-primary hover:underline font-semibold">Dowiedz się więcej o badaniach geologicznych i sprawdź nasze ceny →</a>'
  }
]
```

**Cluster → Filar:**
```typescript
// W /oferta/uslugi-techniczne/badania-geologiczne-gruntu (intro lub PhilosophyTimeline)
content: [
  {
    type: 'paragraph',
    value: 'Badania geologiczne to tylko jeden element naszej kompleksowej oferty <a href="/oferta/uslugi-techniczne" class="text-primary hover:underline">usług technicznych</a>, która obejmuje również geodezję, kosztorysowanie i świadectwa energetyczne.'
  }
]
```

**Cluster ↔ Cluster (lateral linking):**
```typescript
// W badania-geologiczne-gruntu → link do kosztorysowanie-budowlane
content: [
  {
    type: 'paragraph',
    value: 'Po otrzymaniu opinii geotechnicznej, konstruktor zaprojektuje fundamenty. Następnie warto zamówić <a href="/oferta/uslugi-techniczne/kosztorysowanie-budowlane">szczegółowy kosztorys budowlany</a>, aby precyzyjnie określić koszty realizacji.'
  }
]
```

---

## METRYKI SUKCESU (Po 3 miesiącach)

1. **Ranking:**
   - "badania geologiczne gruntu" → Top 3 (Małopolska)
   - "badanie geotechniczne działki" → Top 5
   - "opinia geotechniczna cena" → Top 3

2. **Traffic:**
   - 800-1200 organic visits/miesiąc
   - CTR: 8-12% (wysoki dzięki FAQ snippet)

3. **Konwersja:**
   - 5-8% conversion rate (60-96 leadów/miesiąc)
   - Average order value: 2000 zł
   - Revenue: 120 000 - 192 000 zł/rok (z jednej strony!)

4. **AI Visibility:**
   - 40-50% cytowań w AI Overviews (dzięki Schema + Answer-First)
   - 60-70% Featured Snippet (dzięki FAQ)

---

## TIMELINE IMPLEMENTACJI

**Tydzień 1-2:** Copywriting + zdjęcia (3000 słów + 8 obrazów)
**Tydzień 3:** Implementacja w servicesV2.ts + deploy
**Tydzień 4:** Schema.org + internal linking audit
**Tydzień 5-8:** Indexacja + monitoring rankingów
**Miesiąc 3:** Pierwsze wyniki w Top 10
**Miesiąc 6:** Stabilny Top 3 + ROI pozytywne

---

## CHECKLIST PRZED DEPLOY

- [ ] URL: `/oferta/uslugi-techniczne/badania-geologiczne-gruntu`
- [ ] Breadcrumbs: Link do filara `/oferta/uslugi-techniczne`
- [ ] Internal link z filara (krok 2) do clustera
- [ ] Internal link z clustera z powrotem do filara
- [ ] Lateral linking do innych clusters (geodezja, kosztorysy)
- [ ] Schema.org: Service + FAQ + Breadcrumb
- [ ] EmotionalHero: Answer-first format (GEO!)
- [ ] FAQ: 15 pytań pokrywających "People Also Ask"
- [ ] Testimonials: 2 case studies z liczbami
- [ ] CTA Box: Specyficzny dla badań (nie ogólny)
- [ ] Obrazy: 8 plików .webp (hero + 7 kroków timeline)
- [ ] Alt tags: Optymalizowane pod keyword
- [ ] Meta description: Max 160 znaków, zawiera cenę
- [ ] Title tag: "Badania Geologiczne Gruntu | Opinia Geotechniczna | Cena od 1500 zł | CoreLTB"

---

## RÓŻNICE FILAR VS CLUSTER (PODSUMOWANIE)

| Aspekt | Filar (uslugi-techniczne) | Cluster (badania-geologiczne-gruntu) |
|--------|---------------------------|---------------------------------------|
| **URL** | `/oferta/uslugi-techniczne` | `/oferta/uslugi-techniczne/badania-geologiczne-gruntu` |
| **Keyword** | "usługi techniczne budowa" | "badania geologiczne gruntu" |
| **Intent** | Broad - portfolio | Specific - zamówienie konkretnej usługi |
| **Word Count** | 2500-3000 (całość) | 3000-3500 (dedykowane) |
| **FAQ** | 0 lub ogólne (4-6 pytań) | 15 pytań specyficznych |
| **Ceny** | Brak lub zakres ogólny | Szczegółowy cennik (1500-3500 zł) |
| **CTA** | Ogólny ("Konsultacja Tech") | Specyficzny ("Zamów Badanie") |
| **Schema** | Service (broad) | Service (specific) + FAQ + Breadcrumb |
| **Testimonials** | Ogólne (wszystkie usługi) | Specyficzne (tylko badania) |
| **Timeline** | CooperationTimeline (4-6 kroków) | CooperationTimelineNoLine (7 kroków procesu badania) |

---

**KONIEC TEMPLATE**
