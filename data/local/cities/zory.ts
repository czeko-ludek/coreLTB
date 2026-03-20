import type { CityData } from '../types';

export const zoryData: CityData = {
  slug: 'zory',
  cityName: 'Żory',
  cityNameLocative: 'Żorach',

  meta: {
    title: 'Budowa Domów Żory – Generalny Wykonawca 2026 | CoreLTB Builders',
    description:
      'Budowa domu jednorodzinnego w Żorach. Znamy specyfikę gruntów pogórniczych i stabilnych dzielnic. Płyty fundamentowe, SSO, stan deweloperski i pod klucz. ✓ 15 lat doświadczenia ✓ Gwarancja stałej ceny',
  },

  pageHeader: {
    title: 'Budowa Domów Żory',
    backgroundImage: '/images/local/zory/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW ŻORY',
    headline: ['Budujesz dom w Żorach?', 'Dobierzemy technologię do Twojej działki'],
    subtitle:
      'Budujemy domy w Żorach — od Kleszczówki po Rogoźną. Każda dzielnica ma inne warunki gruntowe, dlatego dobieramy technologię fundamentu indywidualnie do Twojej działki. Baza logistyczna 15 km stąd, własne ekipy, stała cena w umowie.',
    benefits: [
      'Technologia fundamentu dobrana do warunków Twojej działki',
      'Baza logistyczna 15 km od Żor — bez kosztów dojazdu',
      'Stała cena w umowie — bez niespodzianek w trakcie budowy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Dobierzemy optymalną technologię fundamentu',
      'Przedstawimy kosztorys z gwarancją stałej ceny',
      'Odpowiemy na pytania o MPZP, pozwolenie i etapy budowy',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', href: 'tel:+48664123757', variant: 'secondary' },
      { text: 'Wyceń budowę', href: '/wycena', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA BUDOWY W ŻORACH',
      title: 'Dwie kopalnie, różne grunty — jedno podejście: dane',
      description:
        'KWK Żory (zamknięta 1997) i KWK Krupiński (zamknięta 2017) pozostawiły zróżnicowany wpływ na podłoże. W Żorach nie wystarczy jedno rozwiązanie dla całego miasta — każda dzielnica wymaga indywidualnej analizy geotechnicznej.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Grunty pogórnicze — nie wszędzie takie same',
        description:
          'Osiedle Gwarków i Osiny leżą w strefie dawnych wpływów KWK Żory. Kleszczówka i Rowień to tereny stabilne, gdzie wystarczą standardowe ławy fundamentowe. Różnica w koszcie fundamentu wynosi **15–25%** — dlatego badanie geotechniczne to pierwszy krok.',
        details: [
          'Opinię o warunkach gruntowych uzyskujemy z SRK (Spółka Restrukturyzacji Kopalń) dla terenów po KWK Żory oraz z JSW dla wpływów KWK Krupiński. Na tej podstawie konstruktor dobiera rozwiązanie: ławy fundamentowe, płytę monolityczną lub wzmocniony ruszt żelbetowy.',
        ],
      },
      {
        icon: 'shield',
        title: 'Gliny i wody gruntowe — typowe dla ROW',
        description:
          'Grunty gliniaste spowalniają odprowadzanie wody i generują parcie hydrostatyczne na fundamenty. W dzielnicach takich jak Baranowice czy Rogoźna regularnie spotykamy warstwy gliny o miąższości **2–4 m** z podwyższonym poziomem wód gruntowych.',
        details: [
          'Stosujemy izolację ciężką (folia kubełkowa + drenaż opaskowy), a przy wysokim poziomie wód — wannę żelbetową z uszczelnieniem. Koszt wyższy o 8–12 tys. zł vs. standardowa izolacja, ale eliminuje ryzyko wilgoci i zagrzybienia piwnic.',
        ],
      },
      {
        icon: 'settings',
        title: 'Bliskość bazy — logistyka bez dopłat',
        description:
          'Żory leżą **15 km** od naszej bazy w Wodzisławiu Śląskim. Dostawy betonu, stali i materiałów ściennych realizujemy z hurtowni w Rybniku i Jastrzębiu — bez kosztów transportu ponadgabarytowego.',
        details: [
          'Dzięki krótkiej trasie dojazdowej nasi kierownicy budowy reagują w ciągu **45 minut** od zgłoszenia. Eliminujemy przestoje logistyczne, które na odległych budowach kosztują inwestora 500–1000 zł dziennie.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-plyta.webp',
      alt: 'Budowa domu jednorodzinnego w Żorach — fundament na gruncie pogórniczym',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Znamy grunty Żor per dzielnica',
        description:
          'Wiemy, gdzie pod Osinami zalegają nasypy po KWK Żory, a gdzie Kleszczówka oferuje stabilny grunt pod standardowe ławy. Nie przepłacisz za płytę tam, gdzie nie jest potrzebna.',
      },
      {
        icon: 'trendingUp',
        title: 'TCO zamiast „najtaniej"',
        description:
          'Lepsze ocieplenie (styropian grafitowy 20 cm, lambda 0,031) i pompa ciepła zwracają się w rachunkach za 6–8 lat. Pokazujemy kalkulację przed podpisaniem umowy.',
      },
      {
        icon: 'building',
        title: 'Własne zaplecze i brygady',
        description:
          'Szalunki systemowe, stemple, rusztowania — nie wynajmujemy, posiadamy. Realizujemy inwestycję własnymi ludźmi, nie podwykonawcami z ogłoszenia.',
      },
      {
        icon: 'shieldCheck',
        title: 'Ryczałt — cena stała w umowie',
        description:
          'Po ustaleniu zakresu i podpisaniu umowy cena nie rośnie. Chronimy Twój budżet przed niespodziankami materiałowymi i inflacyjnymi.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Żor i okolice',
      description:
        'Realizujemy inwestycje we wszystkich dzielnicach Żor. Znamy różnice w warunkach gruntowych między pogórniczymi Osinami a stabilną Kleszczówką.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Śródmieście' },
      { label: 'Zachód' },
      { label: 'Kleszczówka' },
      { label: 'Rowień-Folwarki' },
      { label: 'Osiny' },
      { label: 'Kleszczów' },
      { label: 'Baranowice' },
      { label: 'Rogoźna' },
      { label: 'Rój' },
      { label: 'Os. Gwarków' },
      { label: 'Os. 700-lecia Żor' },
      { label: 'Os. Sikorskiego' },
      { label: 'Os. Korfantego' },
    ],
    hubDescription:
      'Budujemy w całych Żorach i sąsiednich gminach. Z bazy w Wodzisławiu Śląskim dojeżdżamy na każdą budowę w mieście w 15–20 minut, co eliminuje koszty logistyczne i zapewnia ciągły nadzór kierownika budowy.',
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
        question: 'Ile kosztuje budowa domu 100–150 m² w Żorach w 2026 roku?',
        content: [
          {
            type: 'paragraph',
            value:
              'Stan surowy otwarty (SSO) to orientacyjnie **2 800–3 500 zł/m²** w zależności od technologii i warunków gruntowych. [Stan deweloperski](/oferta/kompleksowa-budowa-domow) zamyka się w **5 500–6 500 zł/m²**, a realizacja pod klucz — **7 000–8 500 zł/m²**. Dla domu 130 m² w standardzie deweloperskim budżet wynosi więc **715–845 tys. zł**. Na terenach pogórniczych (Osiny, os. Gwarków) dolicz 15–25% na wzmocniony fundament.',
          },
        ],
      },
      {
        question: 'Czy w Żorach trzeba budować na płycie fundamentowej?',
        content: [
          {
            type: 'paragraph',
            value:
              'Nie wszędzie. Żory to miasto o zróżnicowanym podłożu. W dzielnicach stabilnych (Kleszczówka, Rowień, Rój) zazwyczaj wystarczą **ławy fundamentowe**, co obniża koszt o 15–25%. Na terenach po KWK Żory i w strefie wpływów KWK Krupiński rekomendujemy **płytę monolityczną** lub wzmocniony ruszt — decyzję podejmujemy na podstawie opinii geotechnicznej i danych z SRK.',
          },
        ],
      },
      {
        question: 'Ile trwa budowa domu jednorodzinnego w Żorach?',
        content: [
          {
            type: 'paragraph',
            value:
              'Od wbicia łopaty do odbioru stanu deweloperskiego potrzebujemy **7–10 miesięcy** (w zależności od pory roku startu i złożoności projektu). Realizacja pod klucz to dodatkowe **2–3 miesiące** na prace wykończeniowe. Harmonogram rzeczowo-finansowy ustalamy przed podpisaniem umowy i trzymamy się go — opóźnienia po naszej stronie skutkują karami umownymi.',
          },
        ],
      },
      {
        question: 'Czy pomagacie z formalnościami i pozwoleniem na budowę w Żorach?',
        content: [
          {
            type: 'paragraph',
            value:
              'Przejmujemy cały proces formalny jako Twój pełnomocnik. Koordynujemy adaptację projektu, występujemy o opinię z SRK/JSW dotyczącą wpływów górniczych, kompletujemy mapę do celów projektowych (MDCP) i składamy wniosek o [pozwolenie na budowę](/oferta/uslugi-techniczne) w Urzędzie Miasta Żory. Procedura trwa zwykle **6–10 tygodni** od złożenia kompletnej dokumentacji.',
          },
        ],
      },
      {
        question: 'W jakich dzielnicach Żor budujecie najczęściej?',
        content: [
          {
            type: 'paragraph',
            value:
              'Realizujemy inwestycje w całych Żorach — od os. Gwarków i Osin, gdzie wymagana jest szczególna uwaga na grunty pogórnicze, po spokojne Kleszczówkę, Rogoźną i Rój, gdzie warunki budowlane są standardowe. Baza w [Wodzisławiu Śląskim](/obszar-dzialania/wodzislaw-slaski) (15 km) zapewnia szybką logistykę materiałową i stały nadzór [kierownika budowy](/oferta/nadzor-i-doradztwo).',
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
        title: 'Od fundamentu do klucza — systemowo',
        description:
          'Nie dzielimy budowy na przypadkowe zlecenia. Jako [generalny wykonawca](/oferta/kompleksowa-budowa-domow) przejmujemy pełną odpowiedzialność za proces — od robót ziemnych po odbiór w PINB.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Surowy Otwarty (SSO)',
          description:
            'Budynek zyskuje formę konstrukcyjną. W Żorach kluczowy jest dobór fundamentu do faktycznych warunków gruntowych — nie do uśrednionej kategorii.',
          details: [
            'Wykonujemy roboty ziemne, fundament (ławy lub płyta — zależnie od opinii geotechnicznej), murujemy ściany z ceramiki lub silikatu, wylewamy stropy monolityczne i montujemy więźbę dachową z drewna klasy C24. Na terenach pogórniczych stosujemy **wzmocnione wieńce i trzpienie żelbetowe** (12–16 sztuk zamiast standardowych 4–6).',
          ],
        },
        {
          icon: 'hardHat',
          title: 'Stan Deweloperski',
          description:
            'Najczęściej wybierany zakres. Budynek z zewnątrz gotowy, w środku przygotowany do wykończenia.',
          details: [
            'Montujemy okna 3-szybowe (Uw <0,9 W/m²K) w ciepłym montażu, rozprowadzamy instalacje (elektryka, wod-kan, ogrzewanie podłogowe, przygotowanie pod rekuperację), wykonujemy tynki i wylewki. Ocieplamy budynek **styropianem grafitowym 20 cm** (lambda 0,031) z tynkiem silikonowym.',
          ],
        },
        {
          icon: 'keyRound',
          title: 'Budowa Pod Klucz',
          description:
            'Pełne wykończenie dla inwestorów ceniących czas. Przejmujemy koordynację wszystkich ekip wykończeniowych.',
          details: [
            'Kompleksowe wykończenie łazienek (glazura, armatura), podłogi (panele/deski/płytki), drzwi wewnętrzne, malowanie ścian farbami lateksowymi. Przekazujemy wysprzątany dom gotowy do wniesienia mebli — z kompletem dokumentacji powykonawczej i gwarancjami.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-gornicze.webp',
        alt: 'Etapy budowy domu w Żorach — od stanu surowego do wykończenia pod klucz',
      },
    },
    {
      id: 'formalnosci',
      header: {
        label: 'FORMALNOŚCI W ŻORACH',
        title: 'Przejmujemy biurokrację',
        description:
          'Budowa domu to w 30% papiery, a w 70% inżynieria. Znamy procedury Urzędu Miasta Żory i wiemy, jak skrócić czas oczekiwania na pozwolenie.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'fileText',
          title: 'Adaptacja projektu i PnB',
          description:
            'Kupując gotowy projekt katalogowy, potrzebujesz adaptacji do warunków lokalnych. Koordynujemy cały proces — od architekta po pozwolenie na budowę.',
          details: [
            'Występujemy do SRK i JSW o opinię dotyczącą wpływów górniczych. Konstruktor przelicza obciążenia i projektuje wzmocnienia (jeśli wymagane). Kompletujemy dokumentację geodezyjną (MDCP) i składamy wniosek o PnB w Żorach — monitorujemy status do uprawomocnienia.',
          ],
        },
        {
          icon: 'clipboard',
          title: 'Kierownik budowy i EDB',
          description:
            'Nasz kierownik to nie figurant. To inżynier z uprawnieniami, obecny przy każdym kluczowym etapie: odbiór zbrojenia, kontrola izolacji, sprawdzenie więźby.',
          details: [
            'Prowadzimy Elektroniczny Dziennik Budowy (EDB), dokumentując postępy prac, użyte materiały (klasy betonu, certyfikaty stali) i warunki pogodowe. Pełna transparencja — masz dostęp online do statusu swojej budowy.',
          ],
        },
        {
          icon: 'checkCircle',
          title: 'Odbiór końcowy i PINB',
          description:
            'Po zakończeniu prac organizujemy odbiór z Twoim udziałem. Testujemy instalacje, sprawdzamy detale i przekazujemy komplet dokumentacji.',
          details: [
            'Przygotowujemy dokumentację powykonawczą wymaganą przez PINB Żory: dziennik budowy, oświadczenie kierownika, protokoły badań instalacji. Przekazujemy klucze z gwarancjami na roboty budowlane i zamontowane urządzenia.',
          ],
        },
      ],
    },
  ],

  nearbyCities: [
    { name: 'Rybnik', slug: 'rybnik', context: '15 km na zachód' },
    { name: 'Mikołów', slug: 'mikolow', context: '25 km na północny-wschód' },
    { name: 'Tychy', slug: 'tychy', context: '30 km na wschód' },
  ],

  areaServed: [
    'Żory',
    'Śródmieście',
    'Zachód',
    'Kleszczówka',
    'Rowień-Folwarki',
    'Osiny',
    'Kleszczów',
    'Baranowice',
    'Rogoźna',
    'Rój',
    'Osiedle Gwarków',
    'Osiedle 700-lecia Żor',
    'Osiedle Sikorskiego',
    'Osiedle Korfantego',
  ],
  geoCoordinates: { latitude: '50.0495', longitude: '18.6987' },
};
