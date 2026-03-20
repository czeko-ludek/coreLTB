import type { CityData } from '../types';

export const olkuszData: CityData = {
  slug: 'olkusz',
  cityName: 'Olkusz',
  cityNameLocative: 'Olkuszu',

  meta: {
    title: 'Budowa Domów Olkusz – Generalny Wykonawca 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Olkuszu i powiecie olkuskim. Znamy specyfikę krasową Jury i dziedzictwo pogórnicze regionu. ✓ Baza 25 km (Jaworzno) ✓ Gwarancja stałej ceny ✓ 8-12 miesięcy realizacji',
  },

  pageHeader: {
    title: 'Budowa Domów Olkusz',
    backgroundImage: '/images/local/olkusz/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW OLKUSZ',
    headline: ['Budujesz dom w Olkuszu?', 'Baza 25 km stąd — znamy jurajski grunt'],
    subtitle:
      'Budujemy domy jednorodzinne w Olkuszu i powiecie olkuskim — od Parcz po Rabsztyn. Baza operacyjna w Jaworznie (25 km) oznacza szybki dojazd i stały nadzór na budowie. Dobieramy technologię fundamentu do warunków Twojej konkretnej działki.',
    benefits: [
      'Baza w Jaworznie — 25 km, sprawna logistyka',
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
      label: 'SPECYFIKA BUDOWY W OLKUSZU',
      title: 'Kras jurajski i dziedzictwo górnictwa kruszcowego',
      description:
        'Olkusz leży na styku Jury Krakowsko-Częstochowskiej i Wyżyny Śląsko-Krakowskiej — podłoże stanowią triasowe dolomity i wapienie kruszcowe. Ponad 700 lat wydobycia rud cynku i ołowiu (kopalnia Olkusz-Pomorzany zamknięta 2020, ZGH Bolesław) pozostawiło ślad: PIG zidentyfikował **ponad 1000 zapadlisk** w gminach Olkusz i Bolesław. Dlatego [badania geotechniczne](/oferta/uslugi-techniczne) to tutaj punkt startowy każdej inwestycji.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Podłoże krasowe — wapienie z kawernamii pustkami',
        description:
          'Wapienie jurajskie i triasowe pod Olkuszem tworzą podłoże podatne na zjawiska krasowe — kawerny, leje, kanały rozpuszczeniowe. Nie każda działka jest obarczona tym ryzykiem, ale rozpoznanie geotechniczne jest konieczne.',
        details: [
          'PIG rozpoznał ponad **1 000 zapadlisk** w gminach Olkusz i Bolesław, z czego 216 w promieniu 20 m od dróg i zabudowy. Mapa zagrożeń (georadar + monitoring satelitarny) obejmie 5 gmin do końca 2026. Nie każda działka jest zagrożona — **Czarna Góra, Zagaje, Parcze** mają na ogół stabilne podłoże, natomiast rejony bliżej dawnych wyrobisk (Bolesław, Bukowno) wymagają szczegółowej weryfikacji. Kluczem jest **badanie geotechniczne z odwiertami** (3-4 otwory, głębokość 4-8 m). W zależności od wyników dobieramy: standardowe ławy, ławy ze wzmocnioną poduszką żwirową lub płytę fundamentową. Koszt badania: **1 500–3 000 zł**.',
        ],
      },
      {
        icon: 'shield',
        title: 'Dziedzictwo górnictwa kruszcowego — zmiany poziomu wód',
        description:
          'Kopalnia Olkusz-Pomorzany (zamknięta 2020, likwidacja zakończona 2025) przez dekady utrzymywała lej depresji o zasięgu **300 km²**. Po wyłączeniu pomp poziom wód gruntowych rośnie — w strefie centralnej o ponad **130 metrów**. To tzw. „powrót wód".',
        details: [
          'Prognozowane stężenia siarczanów w strefie centralnej leja depresji sięgają **3 000–3 500 mg/l** — to woda agresywna wobec stali i betonu. Na działkach w rejonach dawnej eksploatacji (Bolesław, Bukowno, wschodnia część Olkusza) stosujemy **cement siarczanoodporny (SR/HSR)**, wzmocnione membrany hydroizolacyjne i drenaż opaskowy. Na terenach stabilnych (Czarna Góra, Parcze, Zagaje) sytuacja hydrologiczna jest korzystna — standardowa hydroizolacja wystarczy.',
        ],
      },
      {
        icon: 'settings',
        title: 'Jura Krakowsko-Częstochowska — walory i ograniczenia',
        description:
          'Część powiatu olkuskiego leży w granicach Parku Krajobrazowego Dolinki Krakowskie lub ich otuliny. MPZP w tych rejonach narzuca ograniczenia dotyczące wysokości zabudowy, materiałów elewacyjnych i intensywności zagospodarowania.',
        details: [
          'Przed rozpoczęciem projektowania **zawsze sprawdzamy MPZP** lub występujemy o warunki zabudowy (WZ). W Olkuszu wymagania urzędowe różnią się między osiedlami — w centrum obowiązują inne regulacje niż na obrzeżach. Znamy procedury olkuskiego starostwa i PINB w Olkuszu. Bliskość **autostrady A4** (węzeł Balice/Chrzanów) sprawia, że transport materiałów z hurtowni śląskich jest szybki i ekonomiczny.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-odwierty.webp',
      alt: 'Budowa domu w Olkuszu — specyfika krasowa Jury i dziedzictwo górnictwa kruszcowego',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Baza 25 km stąd — znamy teren',
        description:
          'Z Jaworzna do Olkusza dojeżdżamy w 25 minut. Znamy lokalne warunki gruntowe, specyfikę krasową regionu i procedury olkuskiego PINB.',
      },
      {
        icon: 'trendingUp',
        title: 'Geotechnika przed budową, nie w trakcie',
        description:
          'Na Jurze badanie geotechniczne to konieczność, nie formalność. Zlecamy je przed wyceną — eliminujemy ryzyko „niespodzianek" krasowych w trakcie budowy.',
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
      title: 'Osiedla Olkusza i gminy powiatu',
      description:
        'Realizujemy inwestycje w całym Olkuszu oraz w gminach powiatu olkuskiego. Znamy różnice w warunkach gruntowych między jurajskimi Parczami a pogórniczym Bolesławiem.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Centrum' },
      { label: 'Czarna Góra' },
      { label: 'Zagaje' },
      { label: 'Parcze' },
      { label: 'Słowiki' },
      { label: 'Pakuska' },
      { label: 'Sikorka' },
      { label: 'Pomorzany' },
      { label: 'Rabsztyn' },
      { label: 'Stary Olkusz' },
      { label: 'Żurada' },
      { label: 'Bolesław (gmina)' },
      { label: 'Bukowno (gmina)' },
      { label: 'Klucze (gmina)' },
      { label: 'Wolbrom (gmina)' },
    ],
    hubDescription:
      'Z bazy w Jaworznie (25 km) obsługujemy Olkusz i gminy powiatu olkuskiego: Bolesław, Bukowno, Klucze, Wolbrom i Trzyciąż. Znamy lokalne MPZP, specyfikę krasową poszczególnych rejonów i zmiany poziomu wód gruntowych po zamknięciu kopalni.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domu w Olkuszu — odpowiadamy na pytania',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Ile kosztuje budowa domu w Olkuszu w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to **2 800–3 400 zł/m²**, [stan deweloperski](/oferta/kompleksowa-budowa-domow) — **5 500–6 500 zł/m²**, realizacja pod klucz — **7 000–8 500 zł/m²**. Na działkach z podłożem krasowym lub w rejonie dawnych wyrobisk koszt fundamentu może wzrosnąć o **10–20%** ze względu na wzmocnione ławy, wymianę gruntu lub płytę fundamentową.',
          },
        ],
      },
      {
        question: 'Czy w Olkuszu są zapadliska jak w Trzebini?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak — PIG rozpoznał ponad **1 000 zapadlisk** w gminach Olkusz i Bolesław, z czego 216 w pobliżu zabudowy i dróg. W samym Bolesławiu zmapowano 97 zagrożonych miejsc. Mapa zagrożeń (georadar + monitoring satelitarny) obejmie 5 gmin powiatu do końca 2026. Przed zakupem działki **sprawdzamy mapy zagrożeń** i zlecamy badanie geotechniczne z odwiertami. Osiedla **Czarna Góra, Zagaje, Parcze** — na wyższym terenie, dalej od stref eksploatacji — mają stabilne podłoże.',
          },
        ],
      },
      {
        question: 'Czy zamknięcie kopalni Olkusz-Pomorzany wpływa na budowę?',
        content: [
          {
            type: 'paragraph',
            value:
              'Tak — po zamknięciu kopalni w 2020 roku (likwidacja zakończona 2025, koszt 163 mln zł) poziom wód w strefie centralnej leja depresji wzrósł o ponad **130 metrów**. Na działkach w rejonach dawnej eksploatacji (wschodnia część Olkusza, Bolesław, Bukowno) projektujemy hydroizolację z **cementem siarczanoodpornym** (prognozowane stężenia siarczanów: 3 000–3 500 mg/l) i drenaż opaskowy. Rekomendujemy **zakaz podpiwniczenia** w strefie wpływów. Tereny Czarnej Góry i Parcz leżą poza główną strefą oddziaływania.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu w Olkuszu?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do stanu deweloperskiego: **7–10 miesięcy**. Pod klucz: dodatkowe **2–3 miesiące**. Na działkach wymagających wymiany gruntu lub wzmocnionego fundamentu czas wydłuża się o **2–3 tygodnie**. Harmonogram rzeczowo-finansowy ustalamy przed umową — opóźnienia po naszej stronie skutkują karami umownymi.',
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
          'W Olkuszu budowa zaczyna się od geotechniki i weryfikacji warunków krasowych. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) koordynujemy cały proces — od odwiertów przez fundamenty po odbiór w PINB powiatu olkuskiego.',
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
            'Na podłożu krasowym fundament projektujemy na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne) z odwiertami do 6-8 m. Na stabilnym gruncie (Parcze, Słowiki) często wystarczą standardowe ławy. W rejonach z anomaliami krasowymi lub pogórniczymi stosujemy ławy wzmocnione lub płytę fundamentową. Ściany murowane z ceramiki lub silikatu, stropy żelbetowe monolityczne, więźba z drewna C24.',
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
            'Kompleksowe wykończenie wnętrz, montaż armatury i osprzętu. Przekazujemy wysprzątany dom z kompletem dokumentacji powykonawczej, gwarancjami i protokołem odbioru PINB w Olkuszu.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-standard.webp',
        alt: 'Etapy budowy domu w Olkuszu — od fundamentu do wykończenia pod klucz',
      },
    },
  ],

  nearbyCities: [
    { name: 'Chrzanów', slug: 'chrzanow', context: '20 km na południowy-zachód' },
    { name: 'Jaworzno', slug: 'jaworzno', context: '25 km na zachód' },
    { name: 'Kraków', slug: 'krakow', context: '40 km na południowy-wschód' },
  ],

  areaServed: [
    'Olkusz',
    'Centrum',
    'Czarna Góra',
    'Zagaje',
    'Parcze',
    'Słowiki',
    'Pakuska',
    'Sikorka',
    'Pomorzany',
    'Rabsztyn',
    'Stary Olkusz',
    'Żurada',
    'Bolesław',
    'Bukowno',
    'Klucze',
    'Wolbrom',
  ],
  geoCoordinates: { latitude: '50.2813', longitude: '19.5640' },
};
