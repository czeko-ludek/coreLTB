import type { CityData } from '../types';

export const jastrzebieData: CityData = {
  slug: 'jastrzebie-zdroj',
  cityName: 'Jastrzębie-Zdrój',
  cityNameLocative: 'Jastrzębiu-Zdroju',

  meta: {
    title: 'Budowa Domów Jastrzębie-Zdrój – Pod Klucz 2026 | CoreLTB Builders',
    description:
      'Budowa domu w Jastrzębiu-Zdroju na aktywnych terenach górniczych JSW. Płyty fundamentowe, wzmocnione konstrukcje, pełna koordynacja z KWK Borynia-Zofiówka-Bzie i Pniówek. ✓ 15 lat doświadczenia ✓ Gwarancja stałej ceny',
  },

  pageHeader: {
    title: 'Budowa Domów Jastrzębie-Zdrój',
    backgroundImage: '/images/local/jastrzebie-zdroj/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW JASTRZĘBIE-ZDRÓJ',
    headline: ['Budujesz dom w Jastrzębiu?', 'Budujemy solidne domy na każdej działce'],
    subtitle:
      'Jastrzębie-Zdrój to dynamiczne miasto z dostępnymi działkami i dobrą infrastrukturą. Budujemy tu domy murowane od stanu zero do klucza — z technologią dobraną do warunków Twojej konkretnej działki. Znamy lokalny teren, procedury JSW i urzędy. Baza logistyczna 12 km stąd.',
    benefits: [
      'Technologia budowy dobrana do warunków Twojej działki',
      'Znamy procedury JSW i lokalne uzgodnienia — załatwiamy za Ciebie',
      'Baza logistyczna w Wodzisławiu Śl. — 12 km, bez kosztów dojazdu',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Załatwimy uzgodnienia z JSW — za Ciebie',
      'Dobierzemy technologię fundamentu i konstrukcji',
      'Przedstawimy kosztorys z gwarancją stałej ceny',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', href: 'tel:+48664123757', variant: 'secondary' },
      { text: 'Wyceń budowę', href: '/wycena', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA BUDOWY W JASTRZĘBIU-ZDROJU',
      title: 'Aktywne kopalnie JSW — co to oznacza dla Twojego domu',
      description:
        'W przeciwieństwie do Żor czy Zabrza, gdzie kopalnie zamknięto lata temu, w Jastrzębiu eksploatacja trwa. KWK Borynia-Zofiówka-Bzie i KWK Pniówek to jedne z najgłębszych kopalń węgla koksowego w Europie — a ich wpływ na powierzchnię jest realny i mierzalny.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Płyta fundamentowa — standard w Jastrzębiu',
        description:
          'Przy aktywnych szkodach górniczych kat. III–IV **płyta fundamentowa jest jedynym bezpiecznym rozwiązaniem**. Grubość 25–30 cm, zbrojona górą i dołem stalą A-IIIN o podwyższonej ciągliwości. Koszt wyższy o 15–20% od ław, ale eliminuje ryzyko pęknięć konstrukcyjnych.',
        details: [
          'Płyta „pływa" z gruntem — gdy podłoże osiada nierównomiernie lub przesuwa się poziomo, konstrukcja zachowuje sztywność. Na działkach w strefie wpływów Ruchu Zofiówka i Ruchu Borynia stosujemy dodatkowe wzmocnienia w postaci żeber płyty, zwiększając jej nośność przy minimalnym wzroście kosztu.',
        ],
      },
      {
        icon: 'shield',
        title: 'Wzmocniona konstrukcja — więcej stali, więcej wieńców',
        description:
          'Dom w Jastrzębiu potrzebuje **12–16 trzpieni żelbetowych** (vs. 4–6 w standardowym domu), wieńców na wielu poziomach i dylatacji między segmentami bryły. To „klatka", która trzyma ściany mimo wstrząsów.',
        details: [
          'Wieńce żelbetowe projektujemy na poziomie fundamentów, pod stropami i pod murłatą. Trzpienie w narożnikach i przy dużych otworach okiennych łączą fundament z dachem. Przy domach o złożonej bryle stosujemy dylatacje konstrukcyjne — tarasy, garaże i schody zewnętrzne muszą pracować niezależnie od głównej bryły budynku.',
        ],
      },
      {
        icon: 'settings',
        title: 'Procedury JSW — znamy je od lat',
        description:
          'Przed każdą budową w Jastrzębiu występujemy do JSW S.A. o **opinię górniczo-geologiczną** określającą kategorię szkód i prognozowane deformacje. Na tej podstawie konstruktor projektuje zabezpieczenia — nie na oko, ale na dane.',
        details: [
          'JSW odpowiada za szkody spowodowane ruchem zakładów KWK Borynia-Zofiówka-Bzie i KWK Pniówek. Jeśli w trakcie budowy lub po jej zakończeniu pojawią się uszkodzenia wynikające z eksploatacji górniczej, pomagamy naszym inwestorom w procedurze zgłoszenia szkody i dochodzeniu odszkodowania od JSW.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-zbrojenie.webp',
      alt: 'Budowa domu na terenach górniczych w Jastrzębiu-Zdroju',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Ekspertyza lokalna — kopalnie JSW',
        description:
          'Znamy strefy wpływów Ruchu Zofiówka, Borynia i Pniówek. Wiemy, które dzielnice wymagają płyty fundamentowej, a gdzie wystarczy wzmocniony ruszt.',
      },
      {
        icon: 'trendingUp',
        title: 'TCO — budujemy na lata, nie na „najtaniej"',
        description:
          'Styropian grafitowy 20 cm, pompa ciepła, rekuperacja — inwestycja zwraca się w rachunkach za 6–8 lat. Pokazujemy kalkulację TCO przed podpisaniem umowy.',
      },
      {
        icon: 'building',
        title: 'Własne brygady i sprzęt',
        description:
          'Szalunki systemowe, stemple, rusztowania — nie wynajmujemy. Realizujemy budowę własnymi ludźmi, nie podwykonawcami z ogłoszenia.',
      },
      {
        icon: 'shieldCheck',
        title: 'Ryczałt + OC + CAR',
        description:
          'Cena stała w umowie, ubezpieczenie OC i polisa CAR (Contractors All Risks). Twoja inwestycja jest chroniona od zdarzeń losowych i wzrostu cen materiałów.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice i sołectwa Jastrzębia-Zdroju',
      description:
        'Budujemy w całym Jastrzębiu-Zdroju — od centralnych osiedli po peryferyjne sołectwa. Znamy specyfikę gruntów w każdej części miasta i wiemy, gdzie wpływy konkretnych ruchów KWK są najsilniejsze.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Centrum (Zdrój)' },
      { label: 'Szeroka' },
      { label: 'Borynia' },
      { label: 'Ruptawa' },
      { label: 'Moszczenica' },
      { label: 'Bzie' },
      { label: 'Skrzeczkowice' },
      { label: 'Zofiówka' },
      { label: 'Os. Złote Łany' },
      { label: 'Os. Barbary' },
      { label: 'Os. Przyjaźń' },
      { label: 'Os. 1000-lecia' },
      { label: 'Os. Staszica' },
      { label: 'Os. Gwarków' },
    ],
    hubDescription:
      'Z bazy w Wodzisławiu Śląskim (12 km) obsługujemy wszystkie dzielnice i sołectwa Jastrzębia-Zdroju. Znamy procedury JSW dotyczące opinii górniczo-geologicznych i koordynujemy je w imieniu inwestora.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Odpowiadamy na Twoje wątpliwości',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Jastrzębiu-Zdroju w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **3 000–3 800 zł/m²** — wyższa widełka niż średnia śląska, bo aktywne szkody górnicze wymagają płyty fundamentowej i wzmocnionej konstrukcji. [Stan deweloperski](/oferta/kompleksowa-budowa-domow) zamyka się w **5 800–6 800 zł/m²**, realizacja pod klucz — **7 500–9 000 zł/m²**. Dla domu 130 m² w standardzie deweloperskim budżet to **755–885 tys. zł**.',
          },
        ],
      },
      {
        question: 'Czy w każdej dzielnicy Jastrzębia trzeba budować na płycie fundamentowej?',
        content: [
          {
            type: 'paragraph',
            value:
              'Nie w każdej, ale w większości tak. Jastrzębie to miasto z aktywnymi kopalniami — KWK Borynia-Zofiówka-Bzie i KWK Pniówek generują ciągłe deformacje. W dzielnicach bezpośrednio nad wyrobiskami (Zofiówka, Borynia, Bzie) **płyta fundamentowa jest bezwzględnie wymagana**. W peryferyjnych sołectwach (Skrzeczkowice, Moszczenica) wpływy bywają słabsze — decyzję podejmujemy na podstawie opinii JSW i badań geotechnicznych.',
          },
        ],
      },
      {
        question: 'Jak uzyskać opinię górniczo-geologiczną od JSW?',
        content: [
          {
            type: 'paragraph',
            value:
              'Występujemy w Twoim imieniu do JSW S.A. z wnioskiem o opinię dotyczącą kategorii szkód górniczych i prognozowanych deformacji terenu na danej działce. Proces trwa zwykle **3–6 tygodni**. Na podstawie opinii nasz konstruktor projektuje fundament i zabezpieczenia. Koordynujemy też adaptację projektu przez architekta i składamy wniosek o [pozwolenie na budowę](/oferta/uslugi-techniczne) w Urzędzie Miasta Jastrzębie-Zdrój.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Jastrzębiu od fundamentu do klucza?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do odbioru stanu deweloperskiego: **8–11 miesięcy** (dłużej niż średnia, bo formalności górnicze i wzmocniony fundament wymagają dodatkowego czasu). Realizacja pod klucz to dodatkowe **2–3 miesiące**. Harmonogram rzeczowo-finansowy ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
          },
        ],
      },
      {
        question: 'Co jeśli kopalnia uszkodzi mój nowy dom?',
        content: [
          {
            type: 'paragraph',
            value:
              'Budując dom z odpowiednimi zabezpieczeniami (płyta fundamentowa, wzmocnione wieńce, dylatacje), minimalizujemy ryzyko uszkodzeń. Jeśli mimo to pojawią się szkody wynikające z ruchu zakładu górniczego, JSW S.A. jest zobowiązana do ich naprawy lub wypłaty odszkodowania. Pomagamy naszym inwestorom w procedurze zgłoszenia szkody — znamy formularze, terminy i właściwe działy JSW odpowiedzialne za konkretne ruchy kopalni.',
          },
        ],
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY REALIZACJI',
        title: 'Od opinii JSW do klucza — systemowo',
        description:
          'W Jastrzębiu budowa zaczyna się od papieru, nie od łopaty. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od opinii górniczo-geologicznej przez fundamenty po odbiór w PINB.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Fundament i konstrukcja to w Jastrzębiu **60% sukcesu**. Płyta fundamentowa zbrojona stalą A-IIIN, ściany z ceramiki lub silikatu, stropy monolityczne, więźba dachowa z drewna C24.',
          details: [
            'Na terenach kat. III–IV stosujemy płytę o grubości **25–30 cm** z żebrami wzmacniającymi. Ściany murowane spajamy siecią **trzpieni żelbetowych (12–16 szt.)** i wieńców na wielu poziomach. Więźbę dachową montujemy z pełnym deskowaniem dla dodatkowej sztywności bryły.',
          ],
        },
        {
          icon: 'hardHat',
          title: 'Stan Deweloperski',
          description:
            'Budynek gotowy z zewnątrz, przygotowany do wykończenia. Okna 3-szybowe w ciepłym montażu, instalacje, tynki, wylewki, ocieplenie.',
          details: [
            'Montujemy okna (Uw <0,9 W/m²K), rozprowadzamy instalacje elektryczne, wod-kan i ogrzewanie podłogowe. Wykonujemy tynki gipsowe, wylewki anhydrytowe i ocieplamy budynek **styropianem grafitowym 20 cm** (lambda 0,031). Przygotowujemy rozprowadzenie kanałów pod rekuperację.',
          ],
        },
        {
          icon: 'keyRound',
          title: 'Budowa Pod Klucz',
          description:
            'Pełne wykończenie dla inwestorów ceniących czas. Koordynujemy glazurników, parkieciarzy i malarzy.',
          details: [
            'Wykończenie łazienek, podłogi (panele/deski/płytki), drzwi wewnętrzne, malowanie. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i instrukcjami obsługi urządzeń.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-gornicze.webp',
        alt: 'Etapy budowy domu w Jastrzębiu-Zdroju — od fundamentu po wykończenie',
      },
    },
  ],

  nearbyCities: [
    { name: 'Wodzisław Śląski', slug: 'wodzislaw-slaski', context: '12 km na południowy-zachód' },
    { name: 'Żory', slug: 'zory', context: '15 km na północ' },
    { name: 'Rybnik', slug: 'rybnik', context: '20 km na północny-zachód' },
  ],

  areaServed: [
    'Jastrzębie-Zdrój',
    'Centrum (Zdrój)',
    'Szeroka',
    'Borynia',
    'Ruptawa',
    'Moszczenica',
    'Bzie',
    'Skrzeczkowice',
    'Zofiówka',
    'Złote Łany',
    'Osiedle Barbary',
    'Osiedle Przyjaźń',
    'Osiedle 1000-lecia',
    'Osiedle Staszica',
    'Osiedle Gwarków',
  ],
  geoCoordinates: { latitude: '49.9505', longitude: '18.5728' },
};
