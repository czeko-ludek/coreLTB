import type { CityData } from '../types';

export const oswiecimData: CityData = {
  slug: 'oswiecim',
  cityName: 'Oświęcim',
  cityNameLocative: 'Oświęcimiu',

  meta: {
    title: 'Budowa Domów Oświęcim – Generalny Wykonawca 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Oświęcimiu i powiecie oświęcimskim. Znamy specyfikę gruntów zalewowych Wisły i Soły. ✓ Baza 30 km (Jaworzno) ✓ Gwarancja stałej ceny ✓ 8-12 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Oświęcim',
    backgroundImage: '/images/local/oswiecim/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW OŚWIĘCIM',
    headline: ['Budujesz dom w Oświęcimiu?', 'Dobierzemy technologię do Twojej działki'],
    subtitle:
      'Budujemy domy jednorodzinne w Oświęcimiu i powiecie oświęcimskim — od stanu zero do klucza. Znamy lokalne warunki gruntowe i dobieramy fundamenty do specyfiki Twojej działki. Baza operacyjna 30 km stąd, stała cena w umowie.',
    benefits: [
      'Technologia fundamentu i hydroizolacji dobrana do Twojej działki',
      'Baza operacyjna 30 km — bez kosztów dojazdu',
      'Stała cena w umowie — bez niespodzianek w trakcie budowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Sprawdzimy MPZP i ewentualne ograniczenia zabudowy',
      'Przedstawimy kosztorys z gwarancją stałej ceny',
      'Odpowiemy na wszystkie Twoje pytania',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', variant: 'secondary' },
      { text: 'Napisz do Nas', href: '/kontakt', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA BUDOWY W OŚWIĘCIMIU',
      title: 'Wisła, Soła i grunty aluwialne — co warto wiedzieć',
      description:
        'Oświęcim leży u zbiegu Wisły i Soły — dwie duże rzeki kształtują warunki gruntowe w całym powiecie. Gleby aluwialne (piaszczyste, muliste) i wysoki poziom wód gruntowych w rejonach nadrzecznych wymagają indywidualnego podejścia do fundamentu. Ale nie każda działka w Oświęcimiu leży nad rzeką — wiele osiedli ma stabilne podłoże.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Grunty aluwialne — fundament dobrany do działki',
        description:
          'Dolina Wisły i Soły to gleby napływowe: piaski, muły, gliny z wkładkami organicznymi. Nośność gruntu bywa zróżnicowana nawet na jednej działce. Dlatego [badanie geotechniczne](/oferta/uslugi-techniczne) to tutaj punkt startowy, nie opcja.',
        details: [
          'Na podstawie odwiertów (3-4 otwory, głębokość 3-6 m) dobieramy technologię: na stabilnym podłożu wystarczą ławy fundamentowe, na gruntach napływowych z warstwami organicznymi stosujemy wymianę gruntu (do 1,5 m) lub płytę fundamentową. W rejonach z wysokim poziomem wód gruntowych (**0,5-2 m** pod powierzchnią) wykonujemy drenaż opaskowy i hydroizolację ciężką. Koszt badania geotechnicznego to **1 500–2 500 zł** — ułamek wartości domu.',
        ],
      },
      {
        icon: 'shield',
        title: 'Zagrożenie powodziowe — weryfikacja przed zakupem działki',
        description:
          'Powódź 2010 roku dotknęła Oświęcim i okolice. Zbieg Wisły i Soły generuje ryzyko wezbrań, a mapy zagrożenia powodziowego (Q100, Q500) obejmują znaczne tereny w dolinie obu rzek.',
        details: [
          'Przed zakupem działki sprawdzamy jej status na mapach zagrożenia powodziowego dostępnych na HydroPortalu. Działki w strefie Q100 mają poważne ograniczenia zabudowy w MPZP. Tereny Q500 bywają dopuszczone do zabudowy z warunkami (np. podniesienie parteru, zakaz podpiwniczenia). **Pomagamy inwestorom zweryfikować status działki jeszcze przed zakupem** — oszczędzając czas i pieniądze na projektowaniu domu, którego nie da się wybudować.',
        ],
      },
      {
        icon: 'settings',
        title: 'MPZP i lokalne ograniczenia — znamy procedury',
        description:
          'Oświęcim leży w województwie małopolskim. Część terenów objęta jest strefą ochronną Muzeum Auschwitz-Birkenau, co wpływa na warunki zabudowy w MPZP. Znamy lokalne regulacje i sprawnie przeprowadzamy formalności.',
        details: [
          'Strefa ochronna UNESCO obejmuje przede wszystkim rejon Brzezinki i Harmęż — ogranicza tam wysokość zabudowy, charakter architektury i intensywność zagospodarowania. Większość osiedli mieszkaniowych Oświęcimia (Zasole, Stare Miasto, Dwory, Monowice) nie jest objęta tymi restrykcjami. Przed rozpoczęciem projektowania **zawsze sprawdzamy MPZP** w Urzędzie Miasta Oświęcim lub występujemy o warunki zabudowy (WZ) dla działek nieobjętych planem.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-hydroizolacja.webp',
      alt: 'Budowa domu w Oświęcimiu — specyfika gruntów zalewowych doliny Wisły i Soły',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Baza 30 km — sprawna logistyka',
        description:
          'Z bazy w Jaworznie dojeżdżamy do Oświęcimia w 30 minut. Znamy lokalne hurtownie materiałowe i dostawców — transport materiałów bez dopłat.',
      },
      {
        icon: 'trendingUp',
        title: 'Geotechnika i hydroizolacja — nasz standard',
        description:
          'W dolinie Wisły i Soły nie oszczędzamy na fundamentach. Badanie geotechniczne przed wyceną, hydroizolacja i drenaż dobrane do poziomu wód gruntowych na Twojej działce.',
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
          'Stała cena w umowie, polisa OC wykonawcy i kary umowne za opóźnienia. W rejonie zalewowym to szczególnie ważne — brak niespodzianek kosztowych.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Osiedla Oświęcimia i gminy powiatu',
      description:
        'Realizujemy inwestycje w całym Oświęcimiu oraz w gminach powiatu oświęcimskiego. Znamy różnice w warunkach gruntowych między nadrzecznym Zasolem a wyżej położonymi Dworami czy Monowicami.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Stare Miasto' },
      { label: 'Zasole' },
      { label: 'Błonie' },
      { label: 'Chemików' },
      { label: 'Dwory-Kruki' },
      { label: 'Monowice' },
      { label: 'Stare Stawy' },
      { label: 'Pod Borem' },
      { label: 'Brzezinka' },
      { label: 'Harmęże' },
      { label: 'Rajsko' },
      { label: 'Włosienica' },
      { label: 'Zaborze' },
      { label: 'Kęty (gmina)' },
      { label: 'Brzeszcze (gmina)' },
      { label: 'Chełmek (gmina)' },
    ],
    hubDescription:
      'Z bazy w Jaworznie (30 km) obsługujemy Oświęcim i gminy powiatu oświęcimskiego: Kęty, Brzeszcze, Chełmek, Zator i Polankę Wielką. Znamy lokalne MPZP, strefy zagrożenia powodziowego i specyfikę gruntową poszczególnych rejonów.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Oświęcimiu — odpowiadamy na pytania',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Oświęcimiu w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **2 800–3 400 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) — **5 500–6 500 zł/m²**, realizacja pod klucz — **7 000–8 500 zł/m²**. W rejonach nadrzecznych (Zasole, Harmęże, Rajsko) dolicz **10–18 tys. zł** na hydroizolację ciężką i drenaż opaskowy. Na gruntach z warstwami organicznymi koszt fundamentu może wzrosnąć o **15–25%** (wymiana gruntu lub płyta).',
          },
        ],
      },
      {
        question: 'Czy w Oświęcimiu jest ryzyko powodzi?',
        content: [
          {
            type: 'paragraph',
            value:
              'Oświęcim leży u zbiegu Wisły i Soły — powódź 2010 roku dotknęła miasto i okolice. Przed zakupem działki **zawsze sprawdzamy** mapy zagrożenia powodziowego (Q100, Q500) na HydroPortalu. Działki w strefie Q100 mają ograniczone możliwości zabudowy. Tereny wyżej położone (Dwory, Monowice, Stare Miasto) są poza zasięgiem wezbrań i mają korzystniejsze warunki do budowy.',
          },
        ],
      },
      {
        question: 'Czy strefa ochronna UNESCO ogranicza budowę?',
        content: [
          {
            type: 'paragraph',
            value:
              'Strefa ochronna Muzeum Auschwitz-Birkenau obejmuje przede wszystkim rejon Brzezinki i Harmęż — ogranicza tam wysokość zabudowy i charakter architektury. **Większość osiedli mieszkaniowych Oświęcimia** (Zasole, Dwory, Monowice, Stare Miasto) nie jest objęta tymi restrykcjami. Przed zakupem działki sprawdzamy status w MPZP i kontaktujemy się z Urzędem Miasta.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Oświęcimiu?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **7–10 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. Na gruntach aluwialnych z wymianą gruntu czas wydłuża się o **2–4 tygodnie** (konsolidacja podłoża). Harmonogram ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
          },
        ],
      },
      {
        question: 'Czy Oświęcim ma szkody górnicze lub wstrząsy?',
        content: [
          {
            type: 'paragraph',
            value:
              'Sam Oświęcim nie ma aktywnych kopalń, ale **wstrząsy z KWK Piast-Ziemowit** (Bieruń) i KWK Brzeszcze są odczuwalne — szczególnie w północnej i wschodniej części miasta. W części osiedli (Dwory, Monowice) weryfikujemy kategorię terenu górniczego przed budową. Główne wyzwania geotechniczne to jednak **grunty aluwialne** doliny Wisły i Soły — inna specyfika niż na Górnym Śląsku.',
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
          'W Oświęcimiu budowa zaczyna się od geotechniki i weryfikacji statusu powodziowego. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od odwiertów przez fundamenty po odbiór w PINB powiatu oświęcimskiego.',
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
            'Na gruntach aluwialnych często konieczna jest **wymiana gruntu** na warstwie 0,5–1,5 m lub stabilizacja. Fundament — ławy lub płyta — projektujemy na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne). Hydroizolacja fundamentów i drenaż opaskowy wykonywane na etapie stanu zerowego — nie po fakcie. Ściany murowane z ceramiki lub silikatu, stropy żelbetowe monolityczne.',
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
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB w Oświęcimiu.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-nadrzeczne.webp',
        alt: 'Etapy budowy domu w Oświęcimiu — od fundamentu do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Jaworzno', slug: 'jaworzno', context: '30 km na północny-wschód' },
    { name: 'Chrzanów', slug: 'chrzanow', context: '20 km na północ' },
    { name: 'Katowice', slug: 'katowice', context: '60 km na północny-wschód' },
  ],

  areaServed: [
    'Oświęcim',
    'Stare Miasto',
    'Zasole',
    'Błonie',
    'Chemików',
    'Dwory-Kruki',
    'Monowice',
    'Stare Stawy',
    'Pod Borem',
    'Brzezinka',
    'Harmęże',
    'Rajsko',
    'Włosienica',
    'Zaborze',
    'Kęty',
    'Brzeszcze',
    'Chełmek',
  ],
  geoCoordinates: { latitude: '50.0343', longitude: '19.2442' },
};
