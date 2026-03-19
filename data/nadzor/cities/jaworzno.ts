import type { NadzorCityData } from '../types';

export const jaworznoNadzorData: NadzorCityData = {
  slug: 'kierownik-budowy-jaworzno',
  cityName: 'Jaworzno',
  cityNameLocative: 'Jaworznie',

  meta: {
    title:
      'Kierownik Budowy Jaworzno – Nadzór Inwestorski od 5 000 zł | CoreLTB',
    description:
      'Kierownik budowy i inspektor nadzoru inwestorskiego w Jaworznie. Cennik od 5 000 zł brutto. Specjalizacja: szkody górnicze KWK Sobieski, odbiory, e-dziennik budowy 2026. ✓ Uprawnienia bez ograniczeń ✓ OC 500 000 zł ✓ Reakcja w 45 min',
  },

  pageHeader: {
    title: 'Kierownik Budowy Jaworzno',
    backgroundImage: '/images/uslugi/nadzor-i-doradztwo/hero.webp',
  },

  // ── HERO — unikalne pola ──
  emotionalHero: {
    subtitle:
      'Kierownik budowy Jaworzno to nie tylko wymóg formalny, ale przede wszystkim Twój inżynierski bufor bezpieczeństwa. Każda inwestycja wymagająca pozwolenia musi posiadać osobę z uprawnieniami, która prowadzi i uzupełnia dziennik budowy. Wdrażamy elektroniczny e-dziennik budowy 2026, co przyspiesza obieg dokumentów o 40%.',
    benefits: [
      'Jawny cennik: kierownik budowy / inspektor nadzoru od 5 000 zł brutto',
      'Uprawnienia budowlane bez ograniczeń + wpis do ŚOIIB',
      'Reakcja w ciągu 45 minut od wezwania na plac budowy',
    ],
  },

  // ── SERVICES header ──
  services: {
    header: {
      label: 'ZAKRES USŁUG W JAWORZNIE',
      title: 'Kiedy potrzebujesz kierownika budowy?',
      description:
        'Przejmujemy pełną odpowiedzialność techniczną i logistyczną. Działamy jako Twój główny kierownik lub niezależny inspektor nadzoru inwestorskiego.',
      align: 'center',
      theme: 'light',
    },
  },

  // ── SPECYFIKA — KWK Sobieski ──
  localExpertise: {
    header: {
      label: 'SPECYFIKA INWESTYCJI W JAWORZNIE',
      title: 'Szkody górnicze KWK Sobieski — dlaczego nadzór jest koniecznością?',
      description:
        'Ziemia w Jaworznie intensywnie pracuje. Bliskość KWK Sobieski wymusza bezkompromisowe podejście do konstrukcji. Tąpnięcia i osiadanie terenu (często IV kategorii uszkodzeń) sprawiają, że standardowe ławy fundamentowe nie zdają egzaminu. Wymagamy stosowania betonu minimum C25/30 oraz gęstszego zbrojenia krzyżowego.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Kontrola zbrojenia i fundamentów',
        description:
          'Płyta fundamentowa na terenie górniczym działa jak sztywna taca, chroniąc mury przed pękaniem. Rygorystycznie kontrolujemy każdy element wzmocnień konstrukcyjnych.',
        details: [
          'Zwiększamy przekroje stali zbrojeniowej w strefach narażonych na rozciąganie',
          'Pilnujemy ciągłości **dylatacji systemowych**, zapobiegając naprężeniom przy wstrząsach',
          'Nadzorujemy **pielęgnację betonu** — przy letnich upałach brak zraszania obniża wytrzymałość wieńca nawet o 30%',
          'Kontrolujemy zastosowanie **elastycznych przyłączy instalacyjnych** (wod-kan), zapobiegając ich zerwaniu',
        ],
      },
      {
        icon: 'mapPin',
        title: 'Dzielnice o podwyższonym ryzyku',
        description:
          'Znamy warunki wodno-gruntowe na poszczególnych osiedlach Jaworzna, co pozwala przewidzieć problemy jeszcze przed wejściem koparki.',
        details: [
          '**Śródmieście, Podłęże, Osiedle Stałe** — gęsta zabudowa, logistyka placu budowy, zabezpieczenie sąsiednich budynków',
          '**Szczakowa, Byczyna, Ciężkowice, Jeleń** — nowe domy jednorodzinne, kontrola nośności gruntów',
          'Wykrywamy średnio **12-15 uchybień** na jeden lokal w odbiorach deweloperskich',
        ],
      },
      {
        icon: 'fileText',
        title: 'Współpraca z PINB Jaworzno',
        description:
          'Prowadzimy kompletną dokumentację zgodną z wymaganiami PINB. Płynnie poruszamy się po lokalnych wydziałach architektury. Czas oczekiwania na kluczowe formalności skracamy średnio o 14–21 dni dzięki znajomości lokalnych procedur.',
      },
    ],
    image: {
      src: '/images/uslugi/nadzor-i-doradztwo/filozofia-nadzoru.webp',
      alt: 'Inspektor nadzoru CoreLTB weryfikujący zbrojenie fundamentów na budowie w Jaworznie',
    },
  },

  // ── CENNIK — unikalne pola ──
  pricing: {
    note: 'Dojazd na terenie Jaworzna wliczony w cenę. Wycena indywidualna na podstawie projektu budowlanego jest zawsze darmowa.',
  },

  // ── DZIELNICE ──
  districts: {
    header: {
      label: 'OBSZAR DZIAŁANIA',
      title: 'Dzielnice Jaworzna — gdzie dojeżdżamy na budowy?',
      description:
        'Jako lokalni inżynierowie obsługujemy cały obszar miasta. Dojazd na osiedla zajmuje maksymalnie 20–30 minut, co pozwala na błyskawiczne interwencje.',
      align: 'center',
      theme: 'light',
    },
    description:
      'W gęstej zabudowie Śródmieścia i Podłęża skupiamy się na logistyce placu budowy i zabezpieczeniu sąsiednich budynków. Na terenach podmiejskich (Szczakowa, Byczyna, Ciężkowice, Jeleń) kontrolujemy nośność gruntów przed wylaniem ław i zabezpieczamy wykopy przed zalaniem wodami opadowymi.',
    items: [
      'Śródmieście', 'Podłęże', 'Osiedle Stałe', 'Szczakowa', 'Byczyna', 'Ciężkowice',
      'Jeleń', 'Dąbrowa Narodowa', 'Długoszyn', 'Bory', 'Cezarówka', 'Jeziorki',
    ],
  },

  // ── FAQ ──
  faq: {
    header: {
      label: 'NAJCZĘSTSZE PYTANIA',
      title: 'Kierownik budowy Jaworzno — pytania i odpowiedzi',
      description:
        'Odpowiadamy na pytania, które najczęściej słyszymy od inwestorów budujących w Jaworznie i okolicach.',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Na jakim etapie inwestycji w Jaworznie najlepiej zatrudnić kierownika budowy?',
        content: [
          { type: 'paragraph', value: 'Kierownika budowy warto zaangażować **jeszcze przed startem robót ziemnych**, optymalnie na etapie adaptacji projektu lub uzyskiwania pozwolenia. Taki krok eliminuje kosztowne błędy organizacyjne. Jesteśmy w stanie przejąć obowiązki i oficjalnie zgłosić prace w PINB Jaworzno w zaledwie **2–3 dni robocze** od otrzymania kompletu dokumentacji.' },
        ],
      },
      {
        question: 'Ile kosztuje kierownik budowy w Jaworznie?',
        content: [
          { type: 'paragraph', value: 'Koszt pełnienia funkcji kierownika budowy lub inspektora nadzoru inwestorskiego w Jaworznie startuje od **5 000 zł brutto** za cały proces budowy domu jednorodzinnego. Cena zależy od metrażu, technologii budowy i kategorii terenu górniczego.' },
          { type: 'paragraph', value: 'Odbiór techniczny mieszkania od dewelopera to koszt od **500 zł**. Pojedyncza wizyta kontrolna — **500–800 zł**. Konsultacja techniczna od **250 zł**. Rekomendujemy model ryczałtowy — stała cena oznacza brak ukrytych dopłat za "dodatkowy przyjazd".' },
        ],
      },
      {
        question: 'Jakie konsekwencje grożą za brak kierownika budowy?',
        content: [
          { type: 'paragraph', value: 'Prowadzenie prac bez uprawnionego inżyniera to prosta droga do katastrofy finansowej i problemów prawnych. Inspektor nadzoru nakłada kary od **5 000 zł w górę** za samowolę. Budynek bez uzupełnionego dziennika nie zostanie oddany do legalnego użytku.' },
          { type: 'paragraph', value: 'Dodatkowe ryzyko: producenci materiałów (beton, pustaki) **odrzucają reklamacje** przy braku podpisu kierownika pod protokołem wbudowania. Tracisz gwarancję na materiały warte dziesiątki tysięcy złotych.' },
        ],
      },
      {
        question: 'Czy na szkodach górniczych w Jaworznie nadzór jest obowiązkowy?',
        content: [
          { type: 'paragraph', value: 'Kierownik budowy jest obowiązkowy prawnie przy każdym pozwoleniu na budowę. Bliskość **KWK Sobieski** sprawia, że tereny w Jaworznie są często objęte IV kategorią uszkodzeń. Na takich terenach urząd może nałożyć wymóg inspektora nadzoru w decyzji o pozwoleniu.' },
          { type: 'paragraph', value: 'Nawet jeśli formalnie nie jest wymagany — **inżyniersko jest to konieczność**. Standardowe ławy fundamentowe nie zdają tu egzaminu. Wymagamy betonu minimum C25/30 i gęstszego zbrojenia krzyżowego, a płyta fundamentowa działa jak sztywna taca chroniąca mury.' },
        ],
      },
      {
        question: 'Czy kierownik budowy przeprowadza końcowy odbiór domu?',
        content: [
          { type: 'paragraph', value: 'Tak. Końcowy odbiór techniczny to jeden z najważniejszych momentów inwestycji. Przygotowujemy komplet dokumentacji powykonawczej i **asystujemy przy odbiorze przez PINB Jaworzno**. Kompletujemy oświadczenia instalatorów i potwierdzamy gotowość obiektu.' },
          { type: 'paragraph', value: 'Szczegóły naszego podejścia do nadzoru: [Kierownik budowy i nadzór inwestorski — pełna oferta →](/oferta/nadzor-i-doradztwo)' },
        ],
      },
    ],
  },

  relatedLinks: {
    mainServicePage: '/oferta/nadzor-i-doradztwo',
    localBuildPage: '/obszar-dzialania/jaworzno',
  },

  areaServed: [
    'Jaworzno', 'Śródmieście', 'Podłęże', 'Osiedle Stałe', 'Szczakowa',
    'Byczyna', 'Ciężkowice', 'Jeleń', 'Dąbrowa Narodowa', 'Długoszyn',
    'Bory', 'Cezarówka', 'Jeziorki', 'Mysłowice', 'Sosnowiec',
  ],
  geoCoordinates: { latitude: '50.2056', longitude: '19.2713' },
};
