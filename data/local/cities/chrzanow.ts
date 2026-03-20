import type { CityData } from '../types';

export const chrzanowData: CityData = {
  slug: 'chrzanow',
  cityName: 'Chrzanów',
  cityNameLocative: 'Chrzanowie',

  meta: {
    title: 'Budowa Domów Chrzanów – Generalny Wykonawca 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Chrzanowie i powiecie chrzanowskim. Znamy specyfikę krasową i pogórniczą regionu. ✓ Baza 15 km (Jaworzno) ✓ Gwarancja stałej ceny ✓ 8-12 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Chrzanów',
    backgroundImage: '/images/local/chrzanow/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW CHRZANÓW',
    headline: ['Budujesz dom w Chrzanowie?', 'Baza 15 km stąd — znamy ten teren'],
    subtitle:
      'Budujemy domy w Chrzanowie i powiecie chrzanowskim — od Kątów po Kościelec. Baza operacyjna w Jaworznie (15 km, dojazd A4) oznacza szybki dojazd i stały nadzór na budowie. Dobieramy technologię fundamentu do warunków Twojej konkretnej działki.',
    benefits: [
      'Baza w Jaworznie — 15 km, dojazd autostradą A4',
      'Technologia fundamentu dobrana do warunków Twojej działki',
      'Stała cena w umowie — bez niespodzianek w trakcie budowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Dobierzemy optymalną technologię fundamentu',
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
      label: 'SPECYFIKA BUDOWY W CHRZANOWIE',
      title: 'Kras, pogórnicze grunty i wstrząsy — co warto wiedzieć',
      description:
        'Chrzanów leży w Niecce Chrzanowskiej, na pograniczu Śląska i Małopolski. To teren o złożonej geologii: wapienie jurajskie z zjawiskami krasowymi, ponad 700 lat wydobycia cynku i ołowiu (ZG Trzebionka, Kopalnia Matylda) oraz wstrząsy z aktywnej KWK Janina w sąsiednim Libiążu. Dlatego [badania geotechniczne](/oferta/uslugi-techniczne) to tutaj absolutna konieczność.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Podłoże krasowe — nie każda działka jest taka sama',
        description:
          'Wapienie jurajskie i triasowe pod Chrzanowem tworzą podłoże podatne na zjawiska krasowe — pustki, kanały, kawerny. Budowa domu na takim gruncie wymaga rozpoznania geotechnicznego, które ujawni ewentualne anomalie pod powierzchnią.',
        details: [
          'Zjawiska krasowe nie występują wszędzie — wiele dzielnic Chrzanowa (Młodości, Północ, Stella) ma stabilne podłoże. Kluczem jest **badanie geotechniczne z odwiertami** (3-4 otwory, głębokość 3-6 m), które weryfikuje nośność gruntu i obecność pustek. W zależności od wyników dobieramy: standardowe ławy, wzmocnione ławy z poduszką żwirową lub płytę fundamentową. Koszt badania to **1 500–2 500 zł** — ułamek wartości domu.',
        ],
      },
      {
        icon: 'shield',
        title: 'Dziedzictwo pogórnicze — rozpoznanie przed budową',
        description:
          'Kopalnia Matylda (1850-1972), Zakłady Górnicze Trzebionka i wielowiekowe wydobycie cynku i ołowiu pozostawiły pod Chrzanowem sieć wyrobisk. Po zakończeniu pompowania wód kopalnianych poziom wód gruntowych w niektórych rejonach wzrósł.',
        details: [
          'Nie każda działka w Chrzanowie jest obciążona pogórniczo — dzielnice takie jak Stella, Młodości czy Balin mają stabilne warunki. W rejonach historycznej eksploatacji (Kąty, Kościelec, okolice ul. Matyldy) zlecamy dodatkową analizę wpływów pogórniczych. Sprawdzamy też aktualną kategorię terenu w kontekście wstrząsów z KWK Janina (Libiąż), które odczuwalne są szczególnie w zachodniej części miasta.',
        ],
      },
      {
        icon: 'settings',
        title: 'Pogranicze Śląska i Małopolski — lokalna wiedza',
        description:
          'Chrzanów leży w województwie małopolskim, ale graniczy z Jaworznem (śląskie). Inne urzędy, inne procedury, inny PINB. Znamy oba systemy — sprawnie przeprowadzamy formalności niezależnie od strony granicy.',
        details: [
          'PINB w powiecie chrzanowskim (ul. Zielona 20) ma odmienną praktykę niż PINB w Jaworznie czy Katowicach. Znamy lokalne wymagania dotyczące dokumentacji, terminów zgłoszeń i odbiorów. Bliskość autostrady **A4** (węzeł Chrzanów) sprawia, że transport materiałów z hurtowni śląskich jest szybki i tani — dostawy realizujemy w ciągu dnia roboczego.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-wykop.webp',
      alt: 'Budowa domu w Chrzanowie — specyfika krasowa i pogórnicza powiatu chrzanowskiego',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Baza 15 km stąd — znamy teren',
        description:
          'Z Jaworzna do Chrzanowa dojeżdżamy autostradą A4 w 15 minut. Znamy lokalne warunki gruntowe, MPZP poszczególnych osiedli i procedury chrzanowskiego PINB.',
      },
      {
        icon: 'trendingUp',
        title: 'Geotechnika przed budową, nie w trakcie',
        description:
          'Przed wyceną zlecamy badanie geotechniczne. To eliminuje ryzyko „niespodzianek" w trakcie budowy i pozwala nam dać Ci realistyczny kosztorys z gwarancją stałej ceny.',
      },
      {
        icon: 'building',
        title: 'Własne ekipy i sprzęt',
        description:
          'Szalunki, stemple, rusztowania — posiadamy, nie wynajmujemy. Własne brygady murarskie, zbrojarskie i ciesielskie. Żadnych pośredników między Tobą a budową.',
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
      title: 'Osiedla Chrzanowa i gminy powiatu',
      description:
        'Realizujemy inwestycje w całym Chrzanowie oraz w gminach powiatu chrzanowskiego. Znamy różnice w warunkach gruntowych między poszczególnymi osiedlami — od stabilnej Stelli po pogórnicze Kąty.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Śródmieście' },
      { label: 'Kąty' },
      { label: 'Kościelec' },
      { label: 'Stella' },
      { label: 'Młodości' },
      { label: 'Północ-Tysiąclecie' },
      { label: 'Rospontowa' },
      { label: 'Borowiec' },
      { label: 'Stara Huta' },
      { label: 'Balin' },
      { label: 'Luszowice' },
      { label: 'Płaza' },
      { label: 'Pogorzyce' },
      { label: 'Trzebinia (gmina)' },
      { label: 'Libiąż (gmina)' },
    ],
    hubDescription:
      'Z bazy w Jaworznie (15 km, autostrada A4) obsługujemy wszystkie osiedla Chrzanowa i gminy powiatu chrzanowskiego: Trzebinię, Libiąż, Babice i Alwernię. Znamy lokalne MPZP i specyfikę gruntową poszczególnych rejonów.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Chrzanowie — odpowiadamy na pytania',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Chrzanowie w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **2 800–3 400 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) — **5 500–6 500 zł/m²**, realizacja pod klucz — **7 000–8 500 zł/m²**. Ceny są zbliżone do jaworznickich. Na działkach z podłożem krasowym lub pogórniczym koszt fundamentu może wzrosnąć o **10–20%** (wzmocnione ławy lub płyta zamiast standardowych ław).',
          },
        ],
      },
      {
        question: 'Czy w Chrzanowie są zapadliska jak w Trzebini?',
        content: [
          {
            type: 'paragraph',
            value:
              'Zjawisko zapadlisk związane z dawną eksploatacją cynku i ołowiu (ZG Trzebionka) dotyczy przede wszystkim Trzebini, ale pojedyncze przypadki odnotowano też w Chrzanowie — szczególnie w rejonie Kątów. Przed zakupem działki **zawsze sprawdzamy** mapy zagrożeń na portalu GIG (zapadliska.gig.eu) i zlecamy badanie geotechniczne z odwiertami. Większość osiedli Chrzanowa (Stella, Młodości, Północ) ma stabilne podłoże.',
          },
        ],
      },
      {
        question: 'Czy wstrząsy z KWK Janina wpływają na budowę?',
        content: [
          {
            type: 'paragraph',
            value:
              'Kopalnia Janina w Libiążu prowadzi aktywne wydobycie, a wstrząsy odczuwalne są głównie w zachodniej części Chrzanowa (Borowiec, Kąty). Na działkach w strefie oddziaływania stosujemy wzmocnienia konstrukcyjne: **płytę fundamentową** zamiast ław, trzpienie żelbetowe i wieńce obwodowe. Koszt wzmocnień to **10–15%** więcej niż w standardzie — ale eliminuje ryzyko pęknięć na dekady.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Chrzanowie?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **7–10 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. Na działkach wymagających wymiany gruntu lub wzmocnionego fundamentu czas wydłuża się o **2–3 tygodnie**. Harmonogram rzeczowo-finansowy ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
          },
        ],
      },
      {
        question: 'Chrzanów to Małopolska — czy obsługujecie ten region?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak. Chrzanów leży 15 km od naszej bazy w Jaworznie — dojazd autostradą A4 zajmuje 15 minut. Znamy procedury chrzanowskiego PINB i starostwa powiatowego. Realizujemy inwestycje w całym powiecie chrzanowskim: Chrzanów, Trzebinia, Libiąż, Babice, Alwernia.',
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
          'W Chrzanowie budowa zaczyna się od geotechniki. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od odwiertów przez fundamenty po odbiór w PINB powiatu chrzanowskiego.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Roboty ziemne, fundament dobrany do wyników badania geotechnicznego, ściany murowane, stropy monolityczne, więźba dachowa i pokrycie dachu.',
          details: [
            'Na podłożu krasowym lub pogórniczym fundament projektujemy na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne). W dzielnicach ze stabilnym gruntem (Stella, Młodości) często wystarczą standardowe ławy. W strefie wstrząsów z KWK Janina stosujemy płytę fundamentową ze wzmocnionym zbrojeniem. Ściany murowane z ceramiki lub silikatu, stropy żelbetowe monolityczne, więźba z drewna C24.',
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
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB w Chrzanowie.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-standard.webp',
        alt: 'Etapy budowy domu w Chrzanowie — od fundamentu do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Jaworzno', slug: 'jaworzno', context: '15 km na wschód (A4)' },
    { name: 'Katowice', slug: 'katowice', context: '45 km na wschód' },
    { name: 'Kraków', slug: 'krakow', context: '50 km na wschód' },
  ],

  areaServed: [
    'Chrzanów',
    'Śródmieście',
    'Kąty',
    'Kościelec',
    'Stella',
    'Młodości',
    'Północ-Tysiąclecie',
    'Rospontowa',
    'Borowiec',
    'Stara Huta',
    'Balin',
    'Luszowice',
    'Płaza',
    'Pogorzyce',
    'Trzebinia',
    'Libiąż',
  ],
  geoCoordinates: { latitude: '50.1354', longitude: '19.4024' },
};
