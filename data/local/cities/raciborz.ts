import type { CityData } from '../types';

export const raciborzData: CityData = {
  slug: 'raciborz',
  cityName: 'Racibórz',
  cityNameLocative: 'Raciborzu',

  meta: {
    title: 'Budowa Domów Racibórz – Generalny Wykonawca 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Raciborzu. Specjalizacja w gruntach zalewowych Odry i napływowych. Hydroizolacja, drenaż, fundamenty na trudnym podłożu. ✓ 15 lat doświadczenia ✓ Gwarancja stałej ceny',
  },

  pageHeader: {
    title: 'Budowa Domów Racibórz',
    backgroundImage: '/images/local/raciborz/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW RACIBÓRZ',
    headline: ['Budujesz dom w Raciborzu?', 'Solidne fundamenty w dolinie Odry'],
    subtitle:
      'Budujemy domy w Raciborzu i okolicach — od Ostróga po Markowice. Znamy specyfikę doliny Odry i dobieramy technologię fundamentu do warunków Twojej działki. Baza w Wodzisławiu Śl. (25 km) oznacza szybki dojazd i stałą obecność na budowie.',
    benefits: [
      'Technologia fundamentu i hydroizolacji dobrana do Twojej działki',
      'Baza w Wodzisławiu Śl. — 25 km, bez kosztów dojazdu',
      'Stała cena w umowie — bez niespodzianek w trakcie budowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Zweryfikujemy poziom wód gruntowych na Twojej działce',
      'Sprawdzimy czy działka leży w strefie zalewowej Q100/Q500',
      'Dobierzemy fundament i hydroizolację do warunków gruntowych',
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
      label: 'SPECYFIKA BUDOWY W RACIBORZU',
      title: 'Odra, grunty napływowe i wody gruntowe — fakty, nie domysły',
      description:
        'Racibórz leży w dolinie Odry, na gruntach aluwialno-napływowych. Poziom wód gruntowych w dzielnicach nadrzecznych (Ostróg, Studzienna, Płonia) bywa zaledwie 0,5–1,5 m pod powierzchnią. To wymaga innego podejścia niż na Śląsku górniczym.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Grunty napływowe — nie każdy fundament zadziała',
        description:
          'Gleby aluwialne w dolinie Odry to mieszanka piasków, mułów i glin z wkładkami organicznymi. Standardowe ławy fundamentowe mogą tu osiąść nierównomiernie. W strefach z **gruntem organicznym >0,5 m** wymagana jest wymiana gruntu lub posadowienie na płycie.',
        details: [
          'Badanie geotechniczne to w Raciborzu absolutna konieczność — nie opcja. Odwierty ujawniają warstwy torfu i namułów, które przy obciążeniu budynkiem konsolidują się latami, powodując osiadanie. W zależności od miąższości warstw słabonośnych stosujemy: wymianę gruntu (do 1,5 m), stabilizację cementem, płytę fundamentową lub — w ekstremalnych przypadkach — pale CFA.',
        ],
      },
      {
        icon: 'shield',
        title: 'Hydroizolacja i drenaż — polisa na mokre lata',
        description:
          'Przy poziomie wód gruntowych **0,5–1,5 m** pod terenem, standardowa izolacja bitumiczna to za mało. Stosujemy izolację ciężką: folia kubełkowa + membrana HDPE + drenaż opaskowy odprowadzający wodę do studni chłonnych lub kanalizacji deszczowej.',
        details: [
          'Koszt pełnej hydroizolacji z drenażem to **12–18 tys. zł** więcej niż standardowe rozwiązanie. Ale eliminuje ryzyko wilgoci, zagrzybienia i zniszczenia ocieplenia fundamentów. W dzielnicach blisko Odry (Ostróg, Płonia) to nie wydatek — to inwestycja w trwałość budynku na 50+ lat.',
        ],
      },
      {
        icon: 'settings',
        title: 'Polder Racibórz Dolny — chroni, ale nie zwalnia z myślenia',
        description:
          'Zbiornik przeciwpowodziowy Racibórz Dolny (oddany 2020, pojemność **185 mln m³**) chroni przed wielką powodzią typu 1997. Ale lokalne podtopienia z nawalnych deszczy i wezbrań mniejszych rzek (Psina, Cisek) nadal występują.',
        details: [
          'Przed zakupem działki w Raciborzu sprawdzamy mapę zagrożenia powodziowego (Q100, Q500) i mapę ryzyka powodziowego dostępne na HydroPortalu. Działki w strefie zalewowej mają ograniczone możliwości zabudowy wg MPZP. Pomagamy inwestorom zweryfikować status działki jeszcze przed jej zakupem — oszczędzając czas i pieniądze.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-hydroizolacja.webp',
      alt: 'Budowa domu w Raciborzu — fundamenty na gruntach napływowych doliny Odry',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Znamy specyfikę doliny Odry',
        description:
          'Grunty napływowe, wysoki poziom wód, strefy zalewowe — to nie teoria z podręcznika, a nasze codzienne warunki pracy. Wiemy, w których dzielnicach wystarczą ławy, a gdzie potrzebna jest płyta z drenażem.',
      },
      {
        icon: 'trendingUp',
        title: 'TCO — tanie budowanie = droga eksploatacja',
        description:
          'Oszczędność 12 tys. zł na hydroizolacji może kosztować 80 tys. zł remontu za 5 lat. Pokazujemy kalkulację TCO i rekomendujemy rozwiązania, które chronią dom na dekady.',
      },
      {
        icon: 'building',
        title: 'Własne brygady i logistyka z ROW',
        description:
          'Baza sprzętowa w Wodzisławiu Śl. (25 km). Szalunki, stemple, rusztowania — posiadamy, nie wynajmujemy. Dostawy betonu i materiałów z hurtowni w regionie bez dopłat transportowych.',
      },
      {
        icon: 'shieldCheck',
        title: 'Ryczałt + OC + CAR',
        description:
          'Stała cena w umowie, pełne ubezpieczenie OC i polisa CAR. Twoja inwestycja jest chroniona od zdarzeń losowych — w Raciborzu to szczególnie istotne.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Raciborza i okolice',
      description:
        'Realizujemy inwestycje w całym Raciborzu. Znamy różnice w warunkach gruntowych między nadrzecznym Ostrogiem a wyżej położonym Sudołem czy Markowicami.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Ostróg' },
      { label: 'Studzienna' },
      { label: 'Markowice' },
      { label: 'Sudół' },
      { label: 'Płonia' },
      { label: 'Miedonia' },
      { label: 'Ocice' },
      { label: 'Stara Wieś' },
      { label: 'Nowe Zagrody' },
      { label: 'Obora' },
      { label: 'Proszowiec' },
      { label: 'Brzezie' },
    ],
    hubDescription:
      'Z bazy w Wodzisławiu Śląskim (25 km) obsługujemy wszystkie dzielnice Raciborza i gminy powiatu raciborskiego. Znamy lokalne MPZP i strefy zagrożenia powodziowego, co pozwala nam precyzyjniej szacować koszty już na etapie konsultacji.',
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
        question: 'Ile kosztuje budowa domu w Raciborzu w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **2 800–3 500 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) — **5 500–6 500 zł/m²**, realizacja pod klucz — **7 000–8 500 zł/m²**. W dzielnicach nadrzecznych (Ostróg, Płonia, Studzienna) dolicz **12–18 tys. zł** na hydroizolację ciężką i drenaż opaskowy. Na gruntach z warstwami organicznymi koszt fundamentu może wzrosnąć o 20–30% (wymiana gruntu lub płyta).',
          },
        ],
      },
      {
        question: 'Czy w Raciborzu można budować na terenach zalewowych?',
        content: [
          {
            type: 'paragraph',
            value:
              'Zależy od strefy. Na obszarach szczególnego zagrożenia powodziowego (Q100) budowa jest mocno ograniczona lub zakazana przez MPZP i Prawo wodne. Na terenach zagrożenia Q500 zabudowa bywa dopuszczalna z warunkami (np. podniesienie poziomu parteru). Przed zakupem działki **zawsze sprawdzamy** mapy zagrożenia powodziowego na HydroPortalu i status MPZP w Urzędzie Miasta Racibórz.',
          },
        ],
      },
      {
        question: 'Czy polder Racibórz Dolny eliminuje ryzyko powodzi?',
        content: [
          {
            type: 'paragraph',
            value:
              'Zbiornik Racibórz Dolny (185 mln m³, oddany 2020) znacząco redukuje ryzyko dużej powodzi na Odrze — chroni ponad 1,3 mln ludzi do Wrocławia. Ale **nie eliminuje lokalnych podtopień** z nawalnych deszczy, wezbrań dopływów (Psina, Cisek) i wysokiego poziomu wód gruntowych. Dlatego odpowiednia hydroizolacja fundamentów i drenaż opaskowy pozostają konieczne w dzielnicach nadrzecznych.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu jednorodzinnego w Raciborzu?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **7–10 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. Na gruntach napływowych z wymianą gruntu czas się wydłuża o **2–4 tygodnie** (konsolidacja podłoża). Harmonogram rzeczowo-finansowy ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
          },
        ],
      },
      {
        question: 'Czy Racibórz ma szkody górnicze jak Rybnik czy Katowice?',
        content: [
          {
            type: 'paragraph',
            value:
              'Nie. Racibórz nie leży w strefie aktywnej eksploatacji górniczej. Główne wyzwania geotechniczne to **grunty napływowe** doliny Odry, **wysoki poziom wód gruntowych** i ryzyko podtopień — zupełnie inna specyfika niż na Górnym Śląsku. Fundamenty projektujemy pod kątem nośności gruntu i ochrony przed wilgocią, nie przed deformacjami górniczymi.',
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
        title: 'Od badania gruntu do klucza — systemowo',
        description:
          'W Raciborzu budowa zaczyna się od geotechniki, nie od projektu. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od odwiertów przez fundamenty po odbiór w PINB.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Roboty ziemne z uwzględnieniem poziomu wód gruntowych, fundament dobrany do warunków geotechnicznych, ściany murowane, stropy monolityczne, więźba dachowa.',
          details: [
            'Na gruntach napływowych często konieczna jest **wymiana gruntu** na warstwie 0,5–1,5 m lub stabilizacja cementem. Fundament — ławy lub płyta — projektujemy na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne). Ściany murowane z ceramiki lub silikatu, stropy żelbetowe monolityczne, więźba z drewna C24. Hydroizolacja fundamentów na etapie stanu zerowego — nie po fakcie.',
          ],
        },
        {
          icon: 'hardHat',
          title: 'Stan Deweloperski',
          description:
            'Budynek gotowy z zewnątrz, przygotowany do wykończenia. Okna, instalacje, tynki, wylewki, ocieplenie.',
          details: [
            'Okna 3-szybowe (Uw <0,9 W/m²K) w ciepłym montażu, instalacje elektryczne, wod-kan, ogrzewanie podłogowe, przygotowanie pod rekuperację. Tynki gipsowe, wylewki anhydrytowe, ocieplenie **styropianem grafitowym 20 cm** (lambda 0,031) z tynkiem silikonowym.',
          ],
        },
        {
          icon: 'keyRound',
          title: 'Budowa Pod Klucz',
          description:
            'Pełne wykończenie — łazienki, podłogi, drzwi, malowanie. Przekazujemy gotowy dom z dokumentacją.',
          details: [
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB Racibórz.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-nadrzeczne.webp',
        alt: 'Etapy budowy domu w Raciborzu — od fundamentu do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Wodzisław Śląski', slug: 'wodzislaw-slaski', context: '25 km na wschód' },
    { name: 'Rybnik', slug: 'rybnik', context: '35 km na północny-wschód' },
    { name: 'Gliwice', slug: 'gliwice', context: '55 km na północny-wschód' },
  ],

  areaServed: [
    'Racibórz',
    'Ostróg',
    'Studzienna',
    'Markowice',
    'Sudół',
    'Płonia',
    'Miedonia',
    'Ocice',
    'Stara Wieś',
    'Nowe Zagrody',
    'Obora',
    'Proszowiec',
    'Brzezie',
  ],
  geoCoordinates: { latitude: '50.0919', longitude: '18.2193' },
};
