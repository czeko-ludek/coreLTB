import type { CityData } from '../types';

export const opoleData: CityData = {
  slug: 'opole',
  cityName: 'Opole',
  cityNameLocative: 'Opolu',

  meta: {
    title: 'Budowa Domów Opole – Pod Klucz 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Opolu i powiecie opolskim. Znamy specyfikę gruntów nadodrzańskich i zagrożenie powodziowe. ✓ Doświadczenie na Śląsku i Opolszczyźnie ✓ Gwarancja stałej ceny ✓ 8-14 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Opole',
    backgroundImage: '/images/local/opole/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW OPOLE',
    headline: ['Budujesz dom w Opolu?', 'Śląskie doświadczenie na Opolszczyźnie'],
    subtitle:
      'Budujemy domy jednorodzinne w Opolu i powiecie opolskim — od Grudzic po Winów. Wieloletnie doświadczenie na Śląsku przenosimy na Opolszczyznę. Dobieramy technologię fundamentu do warunków Twojej działki, ze stałą ceną w umowie.',
    benefits: [
      'Doświadczenie z budowy na trudnych gruntach Śląska',
      'Technologia fundamentu i hydroizolacji dobrana do Twojej działki',
      'Stała cena w umowie — bez niespodzianek w trakcie budowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Sprawdzimy status powodziowy i MPZP',
      'Przedstawimy kosztorys z gwarancją stałej ceny',
      'Odpowiemy na wszystkie Twoje pytania',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', href: 'tel:+48664123757', variant: 'secondary' },
      { text: 'Wyceń budowę', href: '/wycena', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA BUDOWY W OPOLU',
      title: 'Odra, grunty napływowe i pamięć powodzi 1997',
      description:
        'Opole leży w Niecce Opolskiej, nad Odrą — w Pradolinie Wrocławskiej o szerokości 10-12 km wypełnionej osadami plejstoceńskimi i holoceńskimi. Powódź 1997, wezbrania 2010 i stan alarmowy we wrześniu 2024 (Odra ponad 678 cm) potwierdzają, że weryfikacja warunków hydrologicznych to konieczność. Ale nie cały Opole leży w strefie zalewowej — wiele dzielnic ma doskonałe warunki do budowy.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Grunty nadodrzańskie — fundament dobrany do działki',
        description:
          'Dolina Odry to gleby napływowe: piaski, muły, gliny z wkładkami organicznymi. Nośność gruntu bywa zróżnicowana nawet na jednej działce. Dlatego [badanie geotechniczne](/oferta/uslugi-techniczne) to tutaj punkt startowy, nie opcja.',
        details: [
          'Na podstawie odwiertów (3-4 otwory, głębokość 3-6 m) dobieramy technologię: na stabilnym podłożu (Grudzice, Gosławice, Wróblin) wystarczą standardowe ławy fundamentowe. Na gruntach napływowych bliżej Odry (Zaodrze, Groszowice, Półwieś) stosujemy wymianę gruntu lub płytę fundamentową. W rejonach z wysokim poziomem wód gruntowych wykonujemy **drenaż opaskowy** i hydroizolację ciężką (masa bitumiczna + folia kubełkowa). Koszt badania geotechnicznego to **1 500–2 500 zł**.',
        ],
      },
      {
        icon: 'shield',
        title: 'Zagrożenie powodziowe — weryfikacja przed inwestycją',
        description:
          'Powódź 1997 roku zalała lewobrzeżne Opole (Zaodrze, Półwieś, wyspy Pasieka i Bolko — łączne straty ~80 mln zł). We wrześniu 2024 Odra ponownie osiągnęła stan alarmowy (678 cm), ale zmodernizowane wały ochroniły centrum. Mapy zagrożenia powodziowego (Q100, Q500) obejmują doliny Odry, Małej Panwi i kanału Ulgi.',
        details: [
          'Działki w strefie Q100 mają poważne ograniczenia zabudowy w MPZP lub całkowity zakaz budowy. Tereny Q500 bywają dopuszczone do zabudowy z warunkami (podniesienie parteru, zakaz podpiwniczenia). **Dzielnice wyżej położone** — Grudzice, Gosławice, Wróblin, Kolonia Gosławicka — leżą poza zasięgiem wezbrań i mają korzystne warunki inwestycyjne. Pomagamy inwestorom zweryfikować status działki **jeszcze przed zakupem**.',
        ],
      },
      {
        icon: 'settings',
        title: 'Opolszczyzna — inne procedury niż na Śląsku',
        description:
          'Opole to województwo opolskie — inne starostwo, inny PINB, inne procedury. Znamy specyfikę opolskich urzędów i sprawnie przeprowadzamy formalności od zgłoszenia budowy po odbiór końcowy.',
        details: [
          'MPZP pokrywa tylko **40% powierzchni** Opola (117 planów) — na pozostałych terenach wymagane są decyzje WZ. Współpracujemy z PINB w Opolu i starostwem powiatowym. Znamy lokalne wymagania — w tym nowy plan ogólny (uchwalany od 2024) zastępujący studium, który może zmienić warunki zabudowy na wielu działkach. Formalności koordynuje nasz [kierownik budowy](/oferta/nadzor-i-doradztwo).',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-hydroizolacja.webp',
      alt: 'Budowa domu w Opolu — specyfika gruntów nadodrzańskich i zagrożenie powodziowe',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'shield',
        title: 'Doświadczenie na trudnych gruntach',
        description:
          'Budujemy na Śląsku od lat — szkody górnicze, grunty napływowe, tereny pogórnicze. Specyfika nadodrzańska Opola jest nam znana i potrafimy ją obsłużyć.',
      },
      {
        icon: 'trendingUp',
        title: 'Geotechnika i hydroizolacja — nasz standard',
        description:
          'Badanie geotechniczne przed wyceną, hydroizolacja i drenaż dobrane do poziomu wód gruntowych. Nie oszczędzamy na fundamentach — to decyduje o trwałości domu.',
      },
      {
        icon: 'building',
        title: 'Własne ekipy i sprzęt',
        description:
          'Szalunki, stemple, rusztowania — posiadamy, nie wynajmujemy. Własne brygady murarskie, zbrojarskie i ciesielskie. Pełna kontrola nad jakością i terminami.',
      },
      {
        icon: 'shieldCheck',
        title: 'Ryczałt + OC + kary umowne',
        description:
          'Stała cena w umowie, polisa OC wykonawcy i kary umowne za opóźnienia po naszej stronie. Twoja inwestycja jest chroniona prawnie i finansowo.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Opola — gdzie realizujemy inwestycje?',
      description:
        'Realizujemy inwestycje w Opolu i powiecie opolskim. Znamy różnice w warunkach gruntowych między nadodrzańskim Zaodrzem a wyżej położonymi Grudzicami czy Gosławicami.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Grudzice' },
      { label: 'Gosławice' },
      { label: 'Chmielowice' },
      { label: 'Wróblin' },
      { label: 'Kolonia Gosławicka' },
      { label: 'Zakrzów' },
      { label: 'Winów' },
      { label: 'Szczepanowice' },
      { label: 'Grotowice' },
      { label: 'Czarnowąsy' },
      { label: 'Groszowice' },
      { label: 'Półwieś' },
      { label: 'Malina' },
      { label: 'Wrzoski' },
    ],
    hubDescription:
      'Realizujemy inwestycje we wszystkich 13 dzielnicach Opola (w tym anektowanych w 2017) i gminach powiatu. Grudzice, Gosławice i Chmielowice to obecnie najbardziej dynamicznie rozwijające się dzielnice — aktywne inwestycje deweloperskie, stabilny grunt, dobra infrastruktura.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Opolu — odpowiadamy na pytania',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Opolu w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **2 800–3 400 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) — **5 500–6 500 zł/m²**, realizacja pod klucz — **7 000–8 500 zł/m²**. W rejonach nadodrzańskich dolicz **8–15 tys. zł** na hydroizolację ciężką i drenaż opaskowy. Na gruntach z warstwami organicznymi koszt fundamentu może wzrosnąć o **15–20%**.',
          },
        ],
      },
      {
        question: 'Czy w Opolu jest ryzyko powodzi?',
        content: [
          {
            type: 'paragraph',
            value:
              'Opole leży nad Odrą — powodzie 1997 i 2010 dotknęły miasto. Przed zakupem działki **zawsze sprawdzamy** mapy zagrożenia powodziowego (Q100, Q500) na HydroPortalu. Dzielnice wyżej położone (Grudzice, Gosławice, Wróblin, Kolonia Gosławicka) leżą poza zasięgiem wezbrań i mają korzystne warunki do budowy.',
          },
        ],
      },
      {
        question: 'Czy jesteście firmą ze Śląska — obsługujecie Opole?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak — nasza baza operacyjna jest na Śląsku, ale Opole leży w naturalnym zasięgu logistycznym. Doświadczenie z budowy na trudnych gruntach śląskich (szkody górnicze, grunty napływowe) przenosimy na Opolszczyznę. Znamy procedury opolskiego PINB i starostwa powiatowego.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Opolu?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **8–12 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. Na gruntach napływowych z wymianą gruntu czas wydłuża się o **2–4 tygodnie**. Harmonogram ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
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
        title: 'Od badania gruntu do klucza — krok po kroku',
        description:
          'W Opolu budowa zaczyna się od geotechniki i weryfikacji statusu powodziowego. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od odwiertów po odbiór w PINB w Opolu.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Roboty ziemne z uwzględnieniem poziomu wód gruntowych, fundament dobrany do wyników geotechniki, ściany murowane, stropy monolityczne, więźba dachowa.',
          details: [
            'Na gruntach nadodrzańskich często konieczna jest **wymiana gruntu** na warstwie 0,5–1,5 m lub stabilizacja cementem. Fundament — ławy lub płyta — projektujemy na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne). Hydroizolacja i drenaż opaskowy na etapie stanu zerowego. Ściany murowane z ceramiki lub silikatu, stropy żelbetowe monolityczne, więźba z drewna C24.',
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
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB w Opolu.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-nadrzeczne.webp',
        alt: 'Etapy budowy domu w Opolu — od fundamentu do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Kędzierzyn-Koźle', slug: 'kedzierzyn-kozle', context: '30 km na południe' },
    { name: 'Gliwice', slug: 'gliwice', context: '80 km na południowy-wschód' },
    { name: 'Racibórz', slug: 'raciborz', context: '70 km na południe' },
  ],

  areaServed: [
    'Opole',
    'Grudzice',
    'Gosławice',
    'Chmielowice',
    'Wróblin',
    'Kolonia Gosławicka',
    'Zakrzów',
    'Winów',
    'Szczepanowice',
    'Grotowice',
    'Czarnowąsy',
    'Groszowice',
    'Półwieś',
    'Malina',
    'Wrzoski',
  ],
  geoCoordinates: { latitude: '50.6751', longitude: '17.9213' },
};
