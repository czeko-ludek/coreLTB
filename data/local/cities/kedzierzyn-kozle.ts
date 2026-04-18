import type { CityData } from '../types';

export const kedzierzynData: CityData = {
  slug: 'kedzierzyn-kozle',
  cityName: 'Kędzierzyn-Koźle',
  cityNameLocative: 'Kędzierzynie-Koźlu',

  meta: {
    title: 'Budowa Domów Kędzierzyn-Koźle – Pod Klucz 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Kędzierzynie-Koźlu i powiecie kędzierzyńsko-kozielskim. Znamy specyfikę gruntów nadodrzańskich regionu. ✓ Doświadczenie na Śląsku i Opolszczyźnie ✓ Gwarancja stałej ceny ✓ 8-14 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Kędzierzyn-Koźle',
    backgroundImage: '/images/local/kedzierzyn-kozle/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW KĘDZIERZYN-KOŹLE',
    headline: ['Budujesz dom w Kędzierzynie-Koźlu?', 'Dobierzemy technologię do Twojej działki'],
    subtitle:
      'Budujemy domy jednorodzinne w Kędzierzynie-Koźlu i powiecie — od Cisowej po Reńską Wieś. Wieloletnie doświadczenie na Śląsku przenosimy na Opolszczyznę. Stała cena w umowie, fundament dobrany do warunków Twojej działki.',
    benefits: [
      'Doświadczenie z budowy na trudnych gruntach Śląska i Opolszczyzny',
      'Technologia fundamentu dobrana do warunków Twojej działki',
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
      label: 'SPECYFIKA BUDOWY W KĘDZIERZYNIE-KOŹLU',
      title: 'Odra, Kłodnica i grunty nadrzeczne — co warto wiedzieć',
      description:
        'Kędzierzyn-Koźle leży w rowie tektonicznym głębokości 400-500 m, u zbiegu Odry i Kłodnicy, przy Kanale Gliwickim (unikalna konstrukcja: Kłodnica przechodzi pod kanałem syfonem). Miasto doświadczyło powodzi w 1985 (~1 400 ha zalanych), 1997 (Odra ponad 9 m), 2010 i 2024. Ale nie całe miasto leży w strefie zalewowej — Cisowa, Sławięcice i Pogorzelec mają stabilne warunki.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Grunty nadrzeczne — fundament dobrany do działki',
        description:
          'Dolina Odry i Kłodnicy to holoceńskie osady rzeczne: piaski, muły, gliny z wkładkami organicznymi. Mapa hydrogeologiczna wskazuje poziom wód gruntowych **0,5–1,0 m** pod powierzchnią w dolinach rzecznych. Dlatego [badanie geotechniczne](/oferta/uslugi-techniczne) to punkt startowy każdej inwestycji.',
        details: [
          'Na podstawie odwiertów (3-4 otwory, głębokość 3-6 m) dobieramy technologię: na stabilnym podłożu (Cisowa, Pogorzelec, Lenartowice) wystarczą ławy fundamentowe. Na gruntach nadrzecznych (Koźle Rogi, Kłodnica) stosujemy wymianę gruntu lub płytę fundamentową z hydroizolacją ciężką i drenażem. Koszt badania geotechnicznego to **1 500–2 500 zł** — ułamek wartości domu.',
        ],
      },
      {
        icon: 'shield',
        title: 'Zagrożenie powodziowe — lekcja z 1997 i 2010',
        description:
          'Powódź 1997 — Odra przekroczyła **9 metrów**, zalane: Koźle (poza rynkiem), Kłodnica, Koźle Rogi, Koźle-Port, Żabieniec; częściowo: Lenartowice, Pogorzelec. **2 100 rodzin** poszkodowanych, straty ponad 23 mln zł. We wrześniu 2024 ponownie stan alarmowy — mieszkańcy Koźla Rogów uczestniczyli w obronie wałów.',
        details: [
          'Przed zakupem działki sprawdzamy jej status na mapach zagrożenia powodziowego (Q100, Q500) dostępnych na HydroPortalu. Tereny w strefie Q100 mają ograniczone możliwości zabudowy lub całkowity zakaz. **Dzielnice wyżej położone** — Cisowa, Pogorzelec, Sławięcice, Lenartowice — leżą poza zasięgiem wezbrań i mają korzystne warunki inwestycyjne. Pomagamy zweryfikować status działki **przed zakupem**.',
        ],
      },
      {
        icon: 'settings',
        title: 'Bliskość przemysłu chemicznego — co sprawdzić',
        description:
          'Kędzierzyn-Koźle to ośrodek przemysłu chemicznego (Grupa Azoty ZAK). Przy wyborze działki warto zwrócić uwagę na odległość od stref przemysłowych i kierunek dominujących wiatrów.',
        details: [
          'Dzielnice mieszkaniowe (Cisowa, Pogorzelec, Sławięcice) leżą w odpowiedniej odległości od stref przemysłowych — strefa niska odporność na przenikanie zanieczyszczeń do profilu glebowego obejmuje głównie obszar samego zakładu. Badania z lat 2004-2006 wykazały **niskie stężenia** cynku, ołowiu i miedzi w glebach rolnych. MPZP wyznacza strefy ochronne. Formalności koordynuje nasz [kierownik budowy](/oferta/nadzor-i-doradztwo).',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-hydroizolacja.webp',
      alt: 'Budowa domu w Kędzierzynie-Koźlu — specyfika gruntów nadodrzańskich',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'shield',
        title: 'Doświadczenie na trudnych gruntach',
        description:
          'Budujemy na Śląsku i Opolszczyźnie od lat — grunty napływowe, tereny zalewowe, szkody górnicze. Specyfika nadodrzańska Kędzierzyna jest nam znana.',
      },
      {
        icon: 'trendingUp',
        title: 'Geotechnika i hydroizolacja — nasz standard',
        description:
          'Badanie geotechniczne przed wyceną, hydroizolacja i drenaż dobrane do poziomu wód gruntowych. Nie oszczędzamy na fundamentach.',
      },
      {
        icon: 'building',
        title: 'Własne ekipy i sprzęt',
        description:
          'Szalunki, stemple, rusztowania — posiadamy, nie wynajmujemy. Własne brygady murarskie, zbrojarskie i ciesielskie. Pełna kontrola nad jakością.',
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
      title: 'Dzielnice Kędzierzyna-Koźla i gminy powiatu',
      description:
        'Realizujemy inwestycje w całym Kędzierzynie-Koźlu oraz gminach powiatu. Znamy różnice w warunkach gruntowych między nadodrzańskim Koźlem a wyżej położoną Cisową czy Sławięcicami.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Cisowa' },
      { label: 'Pogorzelec' },
      { label: 'Sławięcice' },
      { label: 'Lenartowice' },
      { label: 'Kędzierzyn (Śródmieście)' },
      { label: 'Blachownia Śląska' },
      { label: 'Koźle (Stare Miasto)' },
      { label: 'Koźle Rogi' },
      { label: 'Kłodnica' },
      { label: 'Miejsce Kłodnickie' },
      { label: 'Azoty' },
      { label: 'Reńska Wieś (gmina)' },
      { label: 'Bierawa (gmina)' },
      { label: 'Pawłowiczki (gmina)' },
    ],
    hubDescription:
      'Realizujemy inwestycje we wszystkich dzielnicach Kędzierzyna-Koźla i gminach powiatu kędzierzyńsko-kozielskiego. Cisowa, Pogorzelec i Sławięcice to najbardziej atrakcyjne dzielnice do budownictwa jednorodzinnego — stabilny grunt, dobra infrastruktura i brak zagrożenia powodziowego.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Kędzierzynie-Koźlu — odpowiadamy na pytania',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Kędzierzynie-Koźlu w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stawki wg naszego [kalkulatora](/wycena): SSO **3 000–4 000 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) **3 960–5 520 zł/m²**, pod klucz **4 640–6 200 zł/m²** netto (zależnie od konfiguracji). W rejonach nadodrzańskich dolicz **8–15 tys. zł** na hydroizolację ciężką i drenaż opaskowy.',
          },
        ],
      },
      {
        question: 'Czy Kędzierzyn-Koźle jest zagrożone powodzią?',
        content: [
          {
            type: 'paragraph',
            value:
              'Powódź 1997 roku dotknęła miasto poważnie. Przed zakupem działki **sprawdzamy mapy zagrożenia powodziowego** (Q100, Q500). Dzielnice wyżej położone (Cisowa, Pogorzelec, Sławięcice) leżą poza strefą zalewową i mają korzystne warunki do budowy. Tereny nadodrzańskie (Koźle Rogi, Kłodnica) wymagają szczegółowej weryfikacji.',
          },
        ],
      },
      {
        question: 'Czy bliskość Grupy Azoty jest problemem?',
        content: [
          {
            type: 'paragraph',
            value:
              'Dzielnice mieszkaniowe (Cisowa, Pogorzelec, Sławięcice) leżą w bezpiecznej odległości od stref przemysłowych. MPZP miasta wyznacza strefy ochronne. Sprawdzamy zgodność planowanej zabudowy z MPZP. Jakość powietrza w dzielnicach mieszkaniowych jest porównywalna z innymi miastami regionu.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Kędzierzynie-Koźlu?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **8–12 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. Na gruntach napływowych czas wydłuża się o **2–4 tygodnie** (wymiana gruntu, konsolidacja). Harmonogram ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
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
          'W Kędzierzynie-Koźlu budowa zaczyna się od geotechniki i weryfikacji statusu powodziowego. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od odwiertów po odbiór w PINB.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Roboty ziemne z uwzględnieniem poziomu wód gruntowych, fundament dobrany do geotechniki, ściany murowane, stropy monolityczne, więźba dachowa.',
          details: [
            'Na gruntach nadodrzańskich często konieczna jest **wymiana gruntu** lub stabilizacja. Fundament — ławy lub płyta — projektujemy na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne). Hydroizolacja i drenaż opaskowy na etapie stanu zerowego. Ściany murowane z ceramiki lub silikatu, stropy żelbetowe monolityczne, więźba z drewna C24.',
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
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB w Kędzierzynie-Koźlu.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-nadrzeczne.webp',
        alt: 'Etapy budowy domu w Kędzierzynie-Koźlu — od fundamentu do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Opole', slug: 'opole', context: '30 km na północ' },
    { name: 'Racibórz', slug: 'raciborz', context: '30 km na południowy-zachód' },
    { name: 'Gliwice', slug: 'gliwice', context: '50 km na wschód' },
  ],

  areaServed: [
    'Kędzierzyn-Koźle',
    'Cisowa',
    'Pogorzelec',
    'Sławięcice',
    'Lenartowice',
    'Kędzierzyn',
    'Blachownia Śląska',
    'Koźle',
    'Koźle Rogi',
    'Kłodnica',
    'Miejsce Kłodnickie',
    'Azoty',
    'Reńska Wieś',
    'Bierawa',
    'Pawłowiczki',
  ],
  geoCoordinates: { latitude: '50.3494', longitude: '18.2070' },
};
