/**
 * DANE STRON REGIONALNYCH (Budowa domów w miastach)
 * Single Source of Truth dla content stron lokalnych
 */

import type { SectionHeaderProps } from '@/components/shared/SectionHeader';
import type { PageHeaderProps } from '@/components/shared/PageHeader';
import type { IconName } from '@/components/ui/Icon';
import type { Hub } from '@/components/sections/AreasSection';
import type { ContentBlock, ContentItem, FAQ } from './shared-types';

/**
 * Dzielnica/obszar obsługiwany
 */
export interface DistrictArea {
  readonly name: string;
  readonly description?: string;
}

/**
 * Punkt "Dlaczego my"
 */
export interface WhyUsPoint {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * Wiersz tabeli cennika
 */
export interface PricingRow {
  stage: string;
  scope: string;
  priceRange: string;
  timeRange: string;
}

/**
 * Sekcja tekstowa (SimpleImageTextSection)
 * Opcjonalny obraz renderowany w grid 2-kolumnowym (tekst + obraz)
 */
export interface ImageTextSection {
  header: SectionHeaderProps;
  items: ContentItem[];    // Import z shared-types.ts
  imageSrc?: string;       // Opcjonalny obraz sekcji
  imageAlt?: string;       // Opcjonalny alt text
}

/**
 * Główny interface dla strony lokalnej
 */
export interface LocalPageData {
  // Meta & Routing
  slug: string;                    // "rybnik"
  cityName: string;                // "Rybnik"
  region: string;                  // "woj. śląskie"
  metaTitle: string;
  metaDescription: string;

  // Hero (PageHeader)
  pageHeader: PageHeaderProps;

  // Intro (tekst wstępny)
  intro: {
    label: string;
    paragraphs: string[];
  };

  // Etapy budowy (SimpleImageTextSection style)
  buildingStages: ImageTextSection;

  // Specyfika lokalna (SimpleImageTextSection style)
  localSpecifics: ImageTextSection;

  // Dzielnice obsługiwane (AreasSection style - 1 hub)
  districts: {
    header: SectionHeaderProps;
    hub: Hub;  // Tylko 1 hub zamiast 2
  };

  // Dlaczego my (USP)
  whyUs: {
    header: SectionHeaderProps;
    points: WhyUsPoint[];
  };

  // FAQ
  faq: {
    header: SectionHeaderProps;
    items: FAQ[];  // Import z shared-types.ts
  };

  // Cennik (opcjonalny)
  pricing?: {
    header: SectionHeaderProps;
    rows: PricingRow[];
    disclaimer: string;
  };

  // Sekcje dodatkowe (opcjonalne - SimpleImageTextSection style)
  energyEfficiency?: ImageTextSection;
  formalities?: ImageTextSection;

  // Schema.org
  areaServed: string[];   // ["Rybnik", "Chwałowice", ...]
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}

/**
 * ========================================
 * RYBNIK - Budowa Domów
 * ========================================
 */
export const rybnikPage: LocalPageData = {
  // Meta
  slug: "rybnik",
  cityName: "Rybnik",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Rybnik – Generalny Wykonawca | CoreLTB Builders",
  metaDescription: "Profesjonalna budowa domów w Rybniku. Specjalizujemy się w terenach górniczych. Płyty fundamentowe, wzmocnione konstrukcje, pełne zabezpieczenia. ✓ 15 lat doświadczenia ✓ Gwarancja",

  // Hero
  pageHeader: {
    title: "Budowa Domów Rybnik",
    watermarkText: "RYBNIK",
    backgroundImage: "/images/local/rybnik/hero.webp", // TODO: Dodać obraz
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Budowa domów Rybnik", href: "" }
    ]
  },

  // Intro
  intro: {
    label: "BUDOWA DOMÓW RYBNIK",
    paragraphs: [
      "**Budowa domu** na terenie Rybnika czy powiatu rybnickiego różni się od realizacji w innych częściach Polski jednym kluczowym czynnikiem: aktywnością górniczą. Pierwszym krokiem nie jest wybór koloru elewacji, ale weryfikacja **Miejscowego Planu Zagospodarowania Przestrzennego (MPZP)** oraz uzyskanie informacji o prognozowanej kategorii terenu górniczego.",
      "Większość działek w dzielnicach takich jak Boguszowice, Chwałowice czy Niedobczyce znajduje się w strefie wpływów eksploatacji górniczej. Oznacza to konieczność wykonania **adaptacji projektu** przez konstruktora z uprawnieniami do projektowania na terenach górniczych. Standardowy projekt katalogowy \"za 3000 zł\" nie uwzględnia wzmocnień fundamentów ani sztywności bryły budynku wymaganej przy wstrząsach rzędu 3-4 stopni w skali Richtera."
    ]
  },

  // Etapy budowy - 3 główne zakresy współpracy
  buildingStages: {
    header: {
      label: 'ETAPY REALIZACJI',
      title: 'Co oferujemy?',
      description:
        'Jako inwestorzy zastępczy i generalny wykonawca, nie dzielimy budowy na przypadkowe zlecenia. Realizujemy proces systemowo, co pozwala nam utrzymać ciągłość prac i płynność dostaw materiałów.',
      align: 'left',
      theme: 'light',
    },

    items: [
      {
        icon: 'building',
        title: 'Stan Surowy Otwarty (SSO)',
        content: [
          {
            type: 'paragraph',
            value:
              'To etap, w którym budynek uzyskuje swoją formę konstrukcyjną. W warunkach rybnickich kluczowa jest precyzja wykonania elementów żelbetowych.',
          },
          {
            type: 'paragraph',
            value:
              'Realizujemy roboty ziemne i fundamentowe (na terenach szkód górniczych standardem jest **płyta fundamentowa** 120-150 kg stali/m³), murujemy ściany z certyfikowanych materiałów, wylewamy stropy monolityczne oraz montujemy więźbę dachową (drewno klasy C24).',
          },
        ],
      },
      {
        icon: 'hardHat',
        title: 'Stan Deweloperski',
        content: [
          {
            type: 'paragraph',
            value:
              'Najczęściej wybierany zakres współpracy. Budynek jest z zewnątrz gotowy, a w środku przygotowany do prac wykończeniowych.',
          },
          {
            type: 'paragraph',
            value:
              'Montujemy okna 3-szybowe (Uw <0,9 W/m²K) w ciepłym montażu, rozprowadzamy instalacje (elektryka, Smart Home/KNX, wod-kan, ogrzewanie podłogowe), wykonujemy tynki i wylewki oraz ocieplamy budynek styropianem grafitowym 20 cm z tynkiem silikonowym odpornym na smog.',
          },
        ],
      },
      {
        icon: 'keyRound',
        title: 'Budowa pod klucz',
        content: [
          {
            type: 'paragraph',
            value:
              'Dla inwestorów ceniących czas, oferujemy pełne wykończenie. Przejmujemy koordynację glazurników, parkieciarzy i malarzy.',
          },
          {
            type: 'paragraph',
            value:
              'Wykonujemy kompleksowe wykończenie łazienek, układamy podłogi (panele/deski/płytki), montujemy drzwi wewnętrzne, malujemy ściany farbami lateksowymi i przekazujemy klucze do wysprzątanego domu gotowego do wniesienia mebli.',
          },
        ],
      },
    ],

    // Obraz renderowany w grid 2-kolumnowym (50% tekst / 50% obraz)
    imageSrc: '/images/local/rybnik/etapy-budowy.webp',
    imageAlt: 'Etapy budowy domu w Rybniku - od stanu surowego do wykończenia pod klucz',
  },

  // Specyfika lokalna - wzmocnienia konstrukcyjne wymagane na terenach górniczych
  localSpecifics: {
    header: {
      label: 'SPECYFIKA BUDOWY W RYBNIKU',
      title: 'Szkody górnicze i teren',
      description:
        'Działalność kopalń KWK Chwałowice czy KWK Jankowice powoduje deformacje terenu. Dla źle zaprojektowanego domu mogą być wyrokiem.',
      align: 'left',
      theme: 'light',
    },

    items: [
      {
        icon: 'layers',
        title: 'Płyta fundamentowa',
        content: [
          {
            type: 'paragraph',
            value:
              'Przy III i IV kategorii szkód górniczych to jedyne dopuszczalne rozwiązanie. Płyta 25-30 cm, zbrojona górą i dołem, zachowuje się jak sztywna tratwa.',
          },
          {
            type: 'paragraph',
            value:
              'Gdy grunt pod budynkiem się rozstępuje lub zapada, płyta przenosi naprężenia, chroniąc ściany przed pękaniem. Koszt wyższy o 15-20% od ław, ale eliminuje ryzyko uszkodzeń strukturalnych wartych setki tysięcy złotych.',
          },
        ],
      },
      {
        icon: 'shield',
        title: 'Trzpienie i wieńce żelbetowe',
        content: [
          {
            type: 'paragraph',
            value:
              'To pionowe słupy ukryte w ścianach, które łączą fundament z wieńcem dachowym. W standardowym domu jest ich 4-6, w domu na szkodach górniczych – nawet **12-16 sztuk**.',
          },
          {
            type: 'paragraph',
            value:
              'Każdy strop musi być opasany żelbetowym wieńcem. Często stosujemy też wieńce w połowie wysokości ścian parteru (przy wysokich kondygnacjach). Dzięki temu zapewniamy budynkowi sztywność przestrzenną potrzebną do przetrwania wstrząsów górniczych.',
          },
        ],
      },
      {
        icon: 'settings',
        title: 'Dylatacje konstrukcyjne',
        content: [
          {
            type: 'paragraph',
            value:
              'Budynek musi być oddzielony od tarasów, schodów zewnętrznych i garaży. Jeśli grunt osiądzie, te elementy muszą pracować niezależnie, aby nie rozerwać bryły domu.',
          },
          {
            type: 'paragraph',
            value:
              'W dzielnicach takich jak Niedobczyce, Niewiadom czy Boguszowice grunt "pracuje" – dlatego każde rozwiązanie inżynieryjne musi być przemyślane i dostosowane do kategorii szkód górniczych określonej w badaniach geologicznych.',
          },
        ],
      },
    ],
  },

  // Dzielnice (AreasSection style - 1 hub)
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Dzielnice Rybnika i okolice",
      description: "Działamy lokalnie, co ma kluczowe znaczenie dla logistyki i kosztów. Znamy specyfikę wąskich dróg dojazdowych w starszych dzielnicach oraz warunki gruntowe na nowych osiedlach.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "RYBNIK I POWIAT RYBNICKI",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Realizujemy inwestycje we wszystkich dzielnicach Rybnika oraz w ościennych gminach powiatu rybnickiego. Znamy specyfikę terenu górniczego oraz lokalne warunki gruntowe.",
      cities: [
        { label: "Orzepowice", url: "#" },
        { label: "Golejów", url: "#" },
        { label: "Rybnicka Kuźnia", url: "#" },
        { label: "Popielów", url: "#" },
        { label: "Radziejów", url: "#" },
        { label: "Chwałowice", url: "#" },
        { label: "Boguszowice", url: "#" },
        { label: "Zamysłów", url: "#" },
        { label: "Zebrzydowice", url: "#" },
        { label: "Niewiadom", url: "#" },
        { label: "Jejkowice", url: "#" },
        { label: "Lyski", url: "#" },
        { label: "Gaszowice", url: "#" },
        { label: "Świerklany", url: "#" }
      ]
    }
  },

  // Dlaczego my
  whyUs: {
    header: {
      label: "DLACZEGO CORELTB BUILDERS",
      title: "Wybór generalnego wykonawcy to decyzja na całe życie",
      description: "Na rynku pełnym przypadkowych ekip, my stawiamy na transparentność inżynieryjną i odpowiedzialność prawną.",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "mapPin",
        title: "Lokalna ekspertyza",
        description: "Znamy grunty w Rybniku lepiej niż ktokolwiek inny. Wiemy, gdzie występuje glina, gdzie kurzawka, a gdzie szkody górnicze są najbardziej aktywne."
      },
      {
        icon: "trendingUp",
        title: "Analiza TCO (Total Cost of Ownership)",
        description: "Nie budujemy \"najtaniej\", budujemy tak, aby eksploatacja domu była tania. Pokazujemy, jak inwestycja w lepsze ocieplenie czy płytę fundamentową zwraca się w niższych rachunkach."
      },
      {
        icon: "building",
        title: "Własne zaplecze",
        description: "Posiadamy własne szalunki systemowe, stemple i narzędzia. Nie jesteśmy pośrednikiem, który tylko \"załatwia ludzi\"."
      },
      {
        icon: "shieldCheck",
        title: "Gwarancja stałej ceny",
        description: "Po podpisaniu umowy i ustaleniu zakresu, cena jest stała. Chronimy Twój budżet przed niespodziankami w trakcie budowy."
      }
    ]
  },

  // FAQ
  faq: {
    header: {
      label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
      title: "Odpowiadamy na Twoje wątpliwości",
      align: "left",
      theme: "light"
    },
    items: [
      {
        question: "Ile kosztuje budowa domu 100–150 m² w Rybniku w 2025 roku i czy budżet 400–600 tys. zł wystarczy na realizację pod klucz?",
        answer: "Realizacja domu 100–150 m² w standardzie pod klucz w 2025 roku zazwyczaj przekracza 700 tys. zł. Budżet 400–600 tys. zł pozwoli raczej na doprowadzenie inwestycji do stanu deweloperskiego. W CoreLTB pomagamy optymalizować projekt, jednak przy obecnych stawkach na Śląsku, pełne wykończenie w tej kwocie wymagałoby znacznych kompromisów jakościowych."
      },
      {
        question: "Czy realizujecie budowy na terenach szkód górniczych i jak dobieracie odpowiednie zabezpieczenia konstrukcji?",
        answer: "Jak najbardziej, realizujemy inwestycje na terenach objętych wpływami eksploatacji górniczej. Zabezpieczenia konstrukcyjne, takie jak płyta fundamentowa czy wzmocnione wieńce, dobieramy indywidualnie na podstawie kategorii szkód określonej w badaniach geologicznych. Dzięki temu zapewniamy pełną stabilność budynku i odporność na ewentualne deformacje podłoża."
      },
      {
        question: "Czy oferta obejmuje kompleksową budowę domu – od stanu zero, przez stan surowy zamknięty, aż po wykończenie pod klucz?",
        answer: "Jak najbardziej, specjalizujemy się w generalnym wykonawstwie, przejmując pełną odpowiedzialność za proces inwestycyjny. W CoreLTB realizujemy budowy kompleksowo: od robót ziemnych i fundamentów, przez stan surowy, aż po finalne wykończenie pod klucz. Dzięki temu zyskują Państwo gwarancję ciągłości prac oraz spójności technologicznej na każdym etapie powstawania domu."
      },
      {
        question: "Jaki projekt domu wychodzi najtaniej w budowie i co generuje największe koszty podczas inwestycji?",
        answer: "Najtańszy w realizacji jest dom o prostej, zwartej bryle na planie prostokąta, przekryty dachem dwuspadowym. Rezygnacja z piwnicy, balkonów i lukarn pozwala na znaczne oszczędności. W strukturze wydatków dominującą pozycję zajmują roboty konstrukcyjne stanu surowego, natomiast standard wykończenia wnętrz jest elementem, który najłatwiej może przekroczyć założony budżet."
      },
      {
        question: "W jakich dzielnicach Rybnika budujecie domy i czy pomagacie w ocenie potencjału inwestycyjnego działki?",
        answer: "Realizujemy inwestycje we wszystkich dzielnicach Rybnika, zarówno w centrum, jak i w zielonych lokalizacjach podmiejskich. Weryfikacja gruntu to nasz standard – specjaliści CoreLTB analizują warunki geotechniczne oraz zapisy MPZP, precyzyjnie określając możliwości zabudowy. Taka wstępna ekspertyza pozwala uniknąć ukrytych kosztów i potwierdza opłacalność przedsięwzięcia."
      }
    ]
  },

  // Cennik
  pricing: {
    header: {
      label: "SZACUNKOWY CENNIK",
      title: "Ile kosztuje budowa domu w Rybniku?",
      description: "Orientacyjne koszty budowy domu jednorodzinnego o powierzchni ok. 120-150 m². Ostateczna cena zależy od kategorii szkód górniczych i stopnia skomplikowania bryły dachu.",
      align: "center",
      theme: "light"
    },
    rows: [
      {
        stage: "Stan Surowy Otwarty",
        scope: "Fundamenty, ściany, stropy, dach, izolacje",
        priceRange: "2300 - 2800 zł / m²",
        timeRange: "3-4 miesiące"
      },
      {
        stage: "Stan Deweloperski",
        scope: "Okna, tynki, wylewki, instalacje, ocieplenie",
        priceRange: "4800 - 5800 zł / m²",
        timeRange: "5-7 miesięcy"
      },
      {
        stage: "Dom pod klucz",
        scope: "Podłogi, łazienki, malowanie, drzwi wew.",
        priceRange: "od 6500 zł / m²",
        timeRange: "8-12 miesięcy"
      },
      {
        stage: "Adaptacja projektu",
        scope: "Dostosowanie do szkód górniczych i MPZP",
        priceRange: "Wycena indywidualna",
        timeRange: "4-8 tygodni"
      },
      {
        stage: "Płyta fundamentowa",
        scope: "Zamiennie za ławy (dla szkód górniczych)",
        priceRange: "Wycena indywidualna",
        timeRange: "2-3 tygodnie"
      }
    ],
    disclaimer: "Podane ceny są szacunkowe i nie stanowią oferty handlowej. Dokładny kosztorys (TCO) przygotowujemy po analizie projektu konstrukcyjnego."
  },

  // Energooszczędność - nowoczesne rozwiązania przeciw smogowi
  energyEfficiency: {
    header: {
      label: 'ENERGOOSZCZĘDNOŚĆ',
      title: 'Nowoczesne rozwiązania dla Rybnika',
      description:
        'Rybnik, mimo wielu działań antysmogowych, wciąż boryka się z problemem jakości powietrza w sezonie grzewczym. Budując nowy dom, musisz myśleć nie tylko o cieple, ale o jakości powietrza, którym oddychasz wewnątrz.',
      align: 'left',
      theme: 'light',
    },

    items: [
      {
        icon: 'wind',
        title: 'Rekuperacja – dlaczego warto?',
        content: [
          {
            type: 'paragraph',
            value:
              'Wentylacja grawitacyjna (kominy) w Rybniku to wpuszczanie smogu do domu. Działa ona na zasadzie zasysania powietrza z zewnątrz przez nawiewniki w oknach.',
          },
          {
            type: 'paragraph',
            value:
              'Wentylacja mechaniczna z odzyskiem ciepła (rekuperacja) to system, który filtruje powietrze nawiewane. Stosując filtry klasy F7, zatrzymujemy ponad **80-90% pyłów zawieszonych PM10 i PM2.5**. Rekuperator odzyskuje do 90% ciepła z powietrza wywiewanego, co realnie obniża zapotrzebowanie na ogrzewanie o **15-20 kWh/m²/rok**. Instalację kanałów wentylacyjnych najlepiej zaplanować przed wylaniem stropów.',
          },
        ],
      },
      {
        icon: 'zap',
        title: 'Pompy ciepła i nowoczesne ogrzewanie',
        content: [
          {
            type: 'paragraph',
            value:
              'Odchodzimy całkowicie od paliw stałych. W naszych realizacjach standardem są powietrzne pompy ciepła lub gruntowe pompy ciepła (z odwiertami pionowymi).',
          },
          {
            type: 'paragraph',
            value:
              'Pompa ciepła działa najefektywniej przy zasilaniu rzędu 30-35°C. Dlatego w całym domu stosujemy ogrzewanie płaszczyznowe (podłogówka), rezygnując z grzejników. Dach projektujemy tak, aby zoptymalizować połać południową pod panele PV. Połączenie pompy ciepła z instalacją 6-10 kWp pozwala zredukować koszty ogrzewania i CWU do poziomu **kilkuset złotych rocznie**.',
          },
        ],
      },
      {
        icon: 'leafIcon',
        title: 'Standard WT 2021 i ekologia',
        content: [
          {
            type: 'paragraph',
            value: 'Nowoczesne budownictwo (WT 2021) to nie tylko wymóg prawny, to kwestia zdrowia i niskich rachunków.',
          },
          {
            type: 'paragraph',
            value:
              'Stosujemy ocieplenie styropianem grafitowym min. 20 cm (lambda 0,031-0,033), okna 3-szybowe (Uw <0,9 W/m²K) oraz szczelną obudowę budynku. Dzięki temu Twój dom będzie ciepły zimą, chłodny latem i tani w eksploatacji przez całe życie.',
          },
        ],
      },
    ],
  },

  // Formalności - wsparcie w procedurach urzędowych
  formalities: {
    header: {
      label: 'FORMALNOŚCI',
      title: 'Jak pomagamy w procedurach?',
      description:
        'Budowa domu to w 30% biurokracja, a w 70% inżynieria. Wielu inwestorów traci miesiące na walkę z urzędami. My przejmujemy ten ciężar.',
      align: 'left',
      theme: 'light',
    },

    items: [
      {
        icon: 'fileText',
        title: 'Adaptacja projektu i pozwolenie na budowę',
        content: [
          {
            type: 'paragraph',
            value:
              'Kupując gotowy projekt, otrzymujesz dokumentację uniwersalną. Aby stała się ona projektem budowlanym, musi zostać zaadaptowana przez lokalnego architekta.',
          },
          {
            type: 'paragraph',
            value:
              'Występujemy do odpowiedniej kopalni (PGG/JSW) o opinię geologiczną. Nasz konstruktor przelicza obciążenia i projektuje wzmocnienia fundamentów adekwatne do kategorii szkód. Koordynujemy pracę geodety. Kompletujemy dokumentację i składamy wniosek o pozwolenie na budowę, monitorując jego status aż do uprawomocnienia. Procedury w Urzędzie Miasta Rybnik są nam dobrze znane.',
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Kierownik budowy i dziennik budowy',
        content: [
          {
            type: 'paragraph',
            value:
              'Zgodnie z Prawem Budowlanym, każda budowa musi mieć kierownika. U nas Kierownik Budowy to nie figurant, który pojawia się tylko po wpis do dziennika.',
          },
          {
            type: 'paragraph',
            value:
              'To inżynier obecny przy każdym kluczowym etapie: odbiór zbrojenia fundamentów (przed zalaniem betonem), kontrola trzpieni i wieńców, sprawdzenie więźby dachowej, nadzór nad izolacjami przeciwwilgociowymi. Prowadzimy rzetelny Dziennik Budowy, dokumentując postępy prac, użyte materiały (klasy betonu, certyfikaty stali) oraz warunki atmosferyczne.',
          },
        ],
      },
      {
        icon: 'checkCircle',
        title: 'Odbiór końcowy i przekazanie',
        content: [
          {
            type: 'paragraph',
            value:
              'Po zakończeniu prac organizujemy odbiór końcowy z Twoim udziałem. Sprawdzamy każdy detal, testujemy wszystkie instalacje i upewniamy się, że wszystko działa zgodnie z projektem.',
          },
          {
            type: 'paragraph',
            value:
              'Przekazujemy komplet dokumentacji powykonawczej, gwarancji i instrukcji obsługi. Dzięki temu masz pełną kontrolę nad inwestycją i spokój na lata.',
          },
        ],
      },
    ],
  },

  // Schema.org
  areaServed: [
    "Rybnik",
    "Orzepowice",
    "Golejów",
    "Rybnicka Kuźnia",
    "Popielów",
    "Radziejów",
    "Chwałowice",
    "Boguszowice",
    "Zamysłów",
    "Zebrzydowice",
    "Niewiadom",
    "Niedobczyce",
    "Jejkowice",
    "Lyski",
    "Gaszowice",
    "Świerklany"
  ],
  geoCoordinates: {
    latitude: "50.0972",
    longitude: "18.5463"
  }
};

/**
 * ========================================
 * WODZISŁAW ŚLĄSKI - Budowa Domów
 * ========================================
 */
export const wodzislawPage: LocalPageData = {
  // Meta
  slug: "wodzislaw-slaski",
  cityName: "Wodzisław Śląski",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Wodzisław Śląski – Generalny Wykonawca | CoreLTB Builders",
  metaDescription: "Profesjonalna budowa domów w Wodzisławiu Śląskim. Specjalizujemy się w terenach górniczych. Płyty fundamentowe, wzmocnione konstrukcje. ✓ 15 lat doświadczenia ✓ Gwarancja",

  // Hero
  pageHeader: {
    title: "Budowa Domów Wodzisław Śląski",
    watermarkText: "WODZISŁAW",
    backgroundImage: "/images/local/wodzislaw/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Budowa domów Wodzisław Śląski", href: "" }
    ]
  },

  // Intro
  intro: {
    label: "BUDOWA DOMÓW WODZISŁAW ŚLĄSKI",
    paragraphs: [
      "Wodzisław Śląski i powiat wodzisławski to teren wymagający, gdzie standardowe podejście do budownictwa jednorodzinnego często okazuje się niewystarczające. **Kompleksowa budowa domu** w naszym wydaniu to nie tylko wznoszenie murów, ale przede wszystkim inżynieryjne zarządzanie projektem w warunkach deformacji górotworu.",
      "Definiujemy generalne wykonawstwo jako proces, w którym **CoreLTB Builders** przejmuje rolę jedynego partnera odpowiedzialnego za efekt końcowy. Oznacza to, że nie musisz koordynować pracy geodety, operatora koparki, murarzy, dekarzy i hydraulików. My robimy to za Ciebie. W warunkach śląskich, gdzie **szkody górnicze** mogą osiągać nawet III czy IV kategorię, kluczowa jest ciągłość nadzoru. Jeden błąd przy zbrojeniu ław fundamentowych może skutkować pękaniem ścian nośnych po kilku latach eksploatacji. Nasz model pracy opiera się na **technologii tradycyjnej murowanej**, która dzięki swojej masie i sztywności, przy odpowiednim wzmocnieniu, najlepiej znosi lokalne wstrząsy.",
      "Działamy w oparciu o precyzyjny harmonogram rzeczowo-finansowy. Dzięki temu wiesz, kiedy zamawiamy stal na strop, kiedy wchodzi ekipa od tynków, a kiedy wykonujemy **testy szczelności** budynku. To podejście eliminuje przestoje, które w obecnych czasach generują ogromne koszty związane z wynajmem sprzętu czy wzrostem cen materiałów."
    ]
  },

  // Etapy budowy
  buildingStages: {
    header: {
      label: "ETAPY REALIZACJI",
      title: "Co budujemy w Wodzisławiu Śląskim? Nasz zakres usług",
      description: "Jako generalny wykonawca skupiamy się na solidnych technologiach murowanych. Nie eksperymentujemy z lekkimi szkieletami w rejonach zagrożonych wstrząsami. Nasza oferta jest modułowa – możesz zlecić nam stan surowy lub pełen stan deweloperski.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "building",
        title: "Stan zerowy i roboty ziemne",
        content: [
          { type: 'paragraph', value: "Wykonujemy niwelację terenu, wymianę gruntu (często konieczną na gliniastych terenach Wodzisławia) oraz wylewamy Fundamenty i płyty fundamentowe, które są zbrojone zgodnie z kategorią szkód górniczych." }
        ]
      },
      {
        icon: "hardHat",
        title: "Stan surowy otwarty (SSO)",
        content: [
          { type: 'paragraph', value: "To trzon naszej działalności. Obejmuje precyzyjne murowanie ścian nośnych z ceramiki lub silikatów oraz wykonanie stropów żelbetowych monolitycznych. Budowa w stanie surowym to etap, gdzie decyduje się statyka budynku." }
        ]
      },
      {
        icon: "settings",
        title: "Konstrukcja i pokrycie dachu",
        content: [
          { type: 'paragraph', value: "Montujemy więźbę dachową impregnowaną ciśnieniowo oraz układamy pokrycia ciężkie (dachówka ceramiczna/betonowa) lub lekkie (blachodachówka), zawsze z pełnym deskowaniem dla zwiększenia sztywności bryły. Dachy i więźby dachowe wykonujemy z uwzględnieniem lokalnych stref wiatrowych." }
        ]
      },
      {
        icon: "paintBrush",
        title: "Stolarka otworowa (Stan Surowy Zamknięty)",
        content: [
          { type: 'paragraph', value: "Instalujemy okna w systemie \"ciepłego montażu\" (z taśmami paroszczelnymi i paroprzepuszczalnymi), co jest kluczowe dla spełnienia norm WT 2021 i przyszłych wymogów EPBD. Montaż okien i drzwi zamyka bryłę budynku." }
        ]
      },
      {
        icon: "settings",
        title: "Instalacje sanitarne i elektryczne",
        content: [
          { type: 'paragraph', value: "Rozprowadzamy systemy wod-kan, ogrzewanie podłogowe oraz elektrykę, w tym okablowanie pod systemy Smart Home. Instalacje wewnętrzne są u nas projektowane pod kątem energooszczędności." }
        ]
      },
      {
        icon: "keyRound",
        title: "Stan deweloperski",
        content: [
          { type: 'paragraph', value: "Finalny etap obejmujący tynki maszynowe (gipsowe lub cementowo-wapienne), wylewki anhydrytowe lub betonowe oraz ocieplenie poddasza pianą PUR lub wełną. Wykończenie wnętrz przygotowuje dom do prac malarskich i montażu podłóg." }
        ]
      }
    ]
  },

  // Specyfika lokalna
  localSpecifics: {
    header: {
      label: "SPECYFIKA WODZISŁAWIA",
      title: "Budowa domu na szkodach górniczych – specyfika Wodzisławia",
      description: "Wodzisław Śląski, ze względu na eksploatację górniczą (KWK ROW), wymaga od firmy budowlanej specjalistycznej wiedzy geotechnicznej. Budowanie tutaj \"jak w reszcie Polski\" to proszenie się o kłopoty. Odkształcenia terenu, niecki obniżeniowe i wstrząsy to codzienność, z którą nasze budynki muszą sobie radzić przez dekady.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "Fundamenty a kategoria szkód górniczych",
        content: [
          { type: 'paragraph', value: "W zależności od tego, czy Twoja działka znajduje się w I, II, III czy IV kategorii szkód górniczych, dobieramy odpowiedni sposób posadowienia budynku. Na terenach stabilnych wystarczą tradycyjne ławy fundamentowe, jednak w Wodzisławiu coraz częściej standardem staje się **płyta fundamentowa**." },
          { type: 'paragraph', value: "Płyta fundamentowa działa jak sztywna taca. Gdy grunt pod budynkiem pracuje (osiada nierównomiernie lub przesuwa się poziomo), płyta \"pływa\" razem z nim, zachowując sztywność całej konstrukcji. Dzięki temu unikamy pękania ścian, co jest typowym objawem przy zastosowaniu zwykłych ław na terenie górniczym. Nasz zespół inżynierów przelicza ilość stali zbrojeniowej (często stosujemy stal o podwyższonej ciągliwości A-IIIN) tak, aby fundament przeniósł naprężenia rozciągające wynikające z krzywizny terenu. Koszt płyty jest wyższy o około **15-20%** od ław, ale jest to polisa ubezpieczeniowa dla struktury Twojego domu." }
        ]
      },
      {
        icon: "shield",
        title: "Wzmocnienia konstrukcji murowanej",
        content: [
          { type: 'paragraph', value: "Sam fundament to nie wszystko. Budynek na szkodach górniczych musi być \"spięty\" klamrą. W naszych realizacjach w Wodzisławiu stosujemy systemowe wzmocnienia:" },
          { type: 'list', items: [
            "**Wieńce żelbetowe:** Nie tylko na poziomie stropu, ale często również wieńce obwodowe na poziomie fundamentów oraz dodatkowe wieńce podmurłatowe. Tworzą one szkielet, który trzyma ściany w ryzach.",
            "**Trzpienie żelbetowe:** Są to pionowe słupy żelbetowe ukryte wewnątrz ścian murowanych (np. w narożnikach budynku i przy dużych otworach okiennych). Łączą one fundament z wieńcem dachowym, usztywniając całą bryłę.",
            "**Dylatacje:** W przypadku domów o skomplikowanej bryle, dzielimy budynek na niezależne segmenty, aby każdy z nich mógł pracować osobno bez przenoszenia naprężeń niszczących."
          ]}
        ]
      },
      {
        icon: "settings",
        title: "Technologie, w których budujemy (Tylko tradycyjne)",
        content: [
          { type: 'paragraph', value: "Jako inżynierowie z doświadczeniem, stawiamy na technologie sprawdzone, trwałe i posiadające wysoką zdolność akumulacji ciepła. W naszym klimacie i przy lokalnych uwarunkowaniach, domy murowane są bezkonkurencyjne pod względem **TCO (Total Cost of Ownership)** – całkowitego kosztu posiadania. **Wyraźnie zaznaczamy: nie budujemy domów szkieletowych, z bali ani modułowych.**" },
          { type: 'paragraph', value: "Stosujemy trzy główne grupy materiałowe:" },
          { type: 'list', items: [
            "**Ceramika poryzowana (np. Porotherm):** Klasyka gatunku. Pustaki ceramiczne wypalane z gliny charakteryzują się świetną paroprzepuszczalnością (\"oddychanie ścian\") i dobrą izolacyjnością termiczną. Są odporne na ściskanie, co jest kluczowe przy projektowaniu budynków wielokondygnacyjnych na szkodach górniczych.",
            "**Beton komórkowy (np. Ytong, Solbet):** Materiał lekki, ciepły i łatwy w obróbce. Pozwala na wznoszenie ścian jednowarstwowych (choć zalecamy docieplenie). Jego struktura porów powietrznych sprawia, że jest doskonałym izolatorem, a precyzja wymiarowa pozwala na murowanie na cienką spoinę, eliminując mostki termiczne.",
            "**Bloki silikatowe:** To rozwiązanie dla inwestorów ceniących ciszę. Silikaty mają bardzo dużą gęstość (są ciężkie), dzięki czemu zapewniają doskonałą izolacyjność akustyczną. Ściana z silikatu o grubości 18 cm tłumi hałas lepiej niż gruby mur z betonu komórkowego. Dodatkowo, duża masa termiczna sprawia, że dom z silikatów wolno się nagrzewa latem i wolno wychładza zimą, stabilizując mikroklimat wnętrza."
          ]}
        ]
      },
      {
        icon: "shieldCheck",
        title: "Zarządzanie ryzykiem i \"Czarne Scenariusze\"",
        content: [
          { type: 'paragraph', value: "W budownictwie, zwłaszcza w tak dynamicznych czasach, optymizm nie jest dobrą strategią. My stosujemy inżynieryjne zarządzanie ryzykiem. Większość firm budowlanych unika tematu problemów, my wolimy być przygotowani na każdy scenariusz." },
          { type: 'paragraph', value: "**Niewidoczne koszty \"Stanu Zero\"**" },
          { type: 'paragraph', value: "Często spotykamy się z sytuacją, gdzie inwestor ma budżet wyliczony \"na styk\" pod projekt typowy. Jednak w Wodzisławiu, zanim wylejemy pierwszy kubik betonu, musimy zmierzyć się z gruntem. Badania geotechniczne to absolutna podstawa – bez nich to wróżenie z fusów. Często okazuje się, że pod warstwą humusu zalega nienośna glina lub grunty nasypowe (typowe dla Śląska). Wymaga to **wymiany gruntu**, stabilizacji cementem lub wykonania drenażu opaskowego. Te koszty potrafią sięgać kilkudziesięciu tysięcy złotych i \"zjadają\" budżet na wykończenie. My diagnozujemy te ryzyka przed podpisaniem umowy, aby cena końcowa nie była dla Ciebie szokiem." },
          { type: 'paragraph', value: "**Ubezpieczenie i bezpieczeństwo prawne**" },
          { type: 'paragraph', value: "Budowa to operacja na otwartym organizmie. Co w przypadku kradzieży materiałów z placu budowy? Co jeśli wichura zerwie świeżo położoną więźbę? Jako generalny wykonawca posiadamy pełne ubezpieczenie OC (Odpowiedzialności Cywilnej) oraz polisę CAR (Contractors' All Risks) dla prowadzonych inwestycji. Oznacza to, że Twoja inwestycja jest chroniona finansowo od zdarzeń losowych. Ponadto, działamy w pełni legalnie – każda ekipa jest zgłoszona, a budowa prowadzona zgodnie z przepisami BHP, co zdejmuje z Ciebie ryzyko kar w przypadku kontroli PIP." }
        ]
      }
    ]
  },

  // Dzielnice
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Dzielnice Wodzisławia Śląskiego – gdzie realizujemy inwestycje?",
      description: "Jesteśmy stąd, dlatego logistyka nie stanowi dla nas problemu. Nie doliczamy gigantycznych kwot za dojazd, bo nasze bazy są w regionie. Znamy specyfikę poszczególnych dzielnic Wodzisławia Śląskiego, co pozwala nam precyzyjniej szacować koszty robót ziemnych i fundamentowych.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "WODZISŁAW ŚLĄSKI I POWIAT",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Obsługujemy inwestycje na terenie całego miasta oraz w gminach ościennych. Znamy lokalne wymogi MPZP (Miejscowych Planów Zagospodarowania Przestrzennego).",
      cities: [
        { label: "Wilchwy", url: "#" },
        { label: "Jedłownik", url: "#" },
        { label: "Kokoszyce", url: "#" },
        { label: "Radlin II", url: "#" },
        { label: "Zawada", url: "#" },
        { label: "Nowe Miasto", url: "#" },
        { label: "Trzy Wzgórza", url: "#" },
        { label: "Gorzyce", url: "#" },
        { label: "Mszana", url: "#" },
        { label: "Godów", url: "#" }
      ]
    }
  },

  // Dlaczego my
  whyUs: {
    header: {
      label: "DLACZEGO CORELTB BUILDERS",
      title: "Dlaczego warto wybrać naszą firmę budowlaną?",
      description: "Wybór generalnego wykonawcy to decyzja, z którą będziesz żyć przez lata. Mieszkańcy powiatu wodzisławskiego wybierają nas, ponieważ:",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "mapPin",
        title: "Znamy lokalny grunt",
        description: "Mamy doświadczenie w budowaniu na terenach górniczych (KWK ROW) i wiemy, jak skutecznie zbroić fundamenty, by dom nie pękał."
      },
      {
        icon: "users",
        title: "Stałe ekipy",
        description: "Nie szukamy ludzi \"z łapanki\". Pracujemy ze sprawdzonymi brygadami murarskimi i instalacyjnymi, co gwarantuje powtarzalną, wysoką jakość."
      },
      {
        icon: "trendingUp",
        title: "Przejrzystość finansowa",
        description: "Otrzymujesz szczegółowy kosztorys. Wiesz, za co płacisz. Żadnych ukrytych dopłat \"bo cegła podrożała\", jeśli zakontraktowaliśmy cenę ryczałtową."
      },
      {
        icon: "building",
        title: "Lokalna baza logistyczna",
        description: "Jesteśmy na miejscu. W razie awarii czy pilnej potrzeby konsultacji, jesteśmy na budowie w kilkanaście minut, a nie dojeżdżamy z drugiego końca Polski."
      },
      {
        icon: "shieldCheck",
        title: "Gwarancja",
        description: "Udzielamy realnej gwarancji na konstrukcję i prace wykończeniowe. Jesteśmy stabilną firmą, która nie zniknie z rynku po zakończeniu budowy."
      }
    ]
  },
  // FAQ
  faq: {
    header: {
      label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
      title: "Etapy współpracy – od projektu do kluczy",
      description: "Budowa domu to proces złożony, ale dla naszych klientów staramy się go maksymalnie uprościć. Przejrzystość na każdym etapie to nasza zasada.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        question: "Jak wygląda proces formalności i adaptacji projektu?",
        answer: "Zanim wbijemy pierwszą łopatę, pomagamy w gąszczu biurokracji. Współpracujemy z lokalnymi architektami przy **adaptacji projektu** do warunków działki. W Wodzisławiu Śląskim kluczowe jest uzyskanie uzgodnień dotyczących szkód górniczych (często wymagana opinia geologiczno-górnicza). Pomagamy w kompletowaniu dokumentacji do Starostwa Powiatowego w celu uzyskania pozwolenia na budowę. Weryfikujemy projekt pod kątem ewentualnych mostków termicznych i proponujemy optymalizacje, które obniżą koszty budowy bez utraty jakości."
      },
      {
        question: "Jak przebiega realizacja prac na budowie?",
        answer: "Po uzyskaniu PnB (Pozwolenia na Budowę), przejmujemy plac budowy. 1) **Ogrodzenie i zaplecze:** Zabezpieczamy teren, ustawiamy toaletę, organizujemy przyłącze prądu budowlanego (prowizorkę). 2) **Kierownik Budowy:** Nasz kierownik prowadzi Dziennik Budowy (coraz częściej w formie elektronicznej EDB), nadzoruje kluczowe etapy (zbrojenie, betonowanie) i odpowiada za zgodność prac z projektem. 3) **Odbiory częściowe:** Każdy etap (fundamenty, ściany, dach) kończy się odbiorem wewnętrznym. Nie zakrywamy instalacji tynkiem, dopóki nie przejdą prób ciśnieniowych i nie wykonamy dokumentacji fotograficznej instalacji podtynkowych. 4) **Czystość:** Utrzymujemy porządek na budowie. Segregujemy odpady budowlane i zapewniamy kontenery na gruz."
      },
      {
        question: "Co z dyrektywą EPBD i przyszłością energetyczną domu?",
        answer: "Budując dom dzisiaj, musisz myśleć o jego wartości za 10-15 lat. Unia Europejska wprowadza dyrektywę EPBD, która dąży do budownictwa bezemisyjnego. Domy, które nie będą spełniać rygorystycznych norm energetycznych, stracą na wartości rynkowej i będą trudne do sprzedania. Dlatego w CoreLTB Builders nie budujemy \"na minimum normowe\". Promujemy rozwiązania, które wyprzedzają obecne Warunki Techniczne (WT 2021). Skupiamy się na **szczelności powietrznej** budynku. Nieszczelny dom to straty ciepła, których nie zatrzyma nawet najgrubszy styropian. Zalecamy wykonanie **Blower Door Test** (testu szczelności) przed tynkami, aby wykryć i uszczelnić wszelkie przedmuchy. Montujemy rekuperację (często z odzyskiem wilgoci - entalpią), co staje się standardem w nowoczesnym budownictwie. Twój dom ma być aktywem, a nie obciążeniem finansowym."
      }
    ]
  },

  // Cennik
  pricing: {
    header: {
      label: "SZACUNKOWY CENNIK",
      title: "Cennik budowy domu – Wodzisław Śląski 2024",
      description: "Poniższa tabela przedstawia szacunkowe zakresy cenowe dla poszczególnych etapów budowy domu jednorodzinnego w technologii murowanej. Pamiętaj, że ostateczna wycena zależy od skomplikowania bryły dachu, ilości stali potrzebnej na szkody górnicze oraz standardu wykończenia.",
      align: "center",
      theme: "light"
    },
    rows: [
      {
        stage: "Stan Zerowy",
        scope: "Roboty ziemne, fundamenty (płyta/ławy), izolacje, kanalizacja",
        priceRange: "Wycena indywidualna",
        timeRange: "3-5 tygodni"
      },
      {
        stage: "Stan Surowy Otwarty",
        scope: "Ściany nośne, stropy, kominy, więźba, pokrycie dachu",
        priceRange: "Wycena indywidualna",
        timeRange: "2-3 miesiące"
      },
      {
        stage: "Stan Surowy Zamknięty",
        scope: "Stolarka okienna, drzwi, brama garażowa",
        priceRange: "Wycena indywidualna",
        timeRange: "1-2 miesiące"
      },
      {
        stage: "Stan Deweloperski",
        scope: "Instalacje, tynki, wylewki, ocieplenie elewacji",
        priceRange: "Wycena indywidualna",
        timeRange: "3-4 miesiące"
      },
      {
        stage: "Pod klucz",
        scope: "Podłogi, malowanie, biały montaż, drzwi wewnętrzne",
        priceRange: "Wycena indywidualna",
        timeRange: "2-3 miesiące"
      }
    ],
    disclaimer: "Wycena jest darmowa i niezobowiązująca. Ostateczny koszt jest zapisywany w umowie i gwarantujemy jego stałość, o ile nie zmieni się zakres prac. Zapewniamy przejrzystą umowę bez ukrytych kosztów."
  },

  // Schema.org
  areaServed: [
    "Wodzisław Śląski",
    "Wilchwy",
    "Jedłownik",
    "Kokoszyce",
    "Radlin II",
    "Zawada",
    "Nowe Miasto",
    "Trzy Wzgórza",
    "Gorzyce",
    "Mszana",
    "Godów"
  ],
  geoCoordinates: {
    latitude: "50.0022",
    longitude: "18.4610"
  }
};

/**
 * ========================================
 * TYCHY - Budowa Domów
 * ========================================
 */
export const tychyPage: LocalPageData = {
  // Meta
  slug: "tychy",
  cityName: "Tychy",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Tychy – Generalny Wykonawca | CoreLTB Builders",
  metaDescription: "Profesjonalna budowa domów w Tychach. Specjalizacja w terenach górniczych i trudnych gruntach. ✓ Doświadczenie ✓ Gwarancja ✓ Terminowość",

  // Hero
  pageHeader: {
    title: "Budowa Domów Tychy",
    watermarkText: "TYCHY",
    backgroundImage: "/images/local/tychy/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Budowa domów Tychy", href: "" }
    ]
  },

  // Intro
  intro: {
    label: "BUDOWA DOMÓW TYCHY",
    paragraphs: [
      "Mieszkasz w Tychach lub planujesz zakup działki w tym regionie? **Budowa domów** na Śląsku to wyzwanie inżynieryjne, które wymaga czegoś więcej niż standardowego projektu z katalogu. Specyfika tutejszych gruntów – często gliniastych i narażonych na szkody górnicze – wymusza stosowanie wzmocnionych konstrukcji i precyzyjnej izolacji. Jako generalny wykonawca działający lokalnie, realizujemy inwestycje w technologii murowanej, zapewniając **stan surowy otwarty** lub **deweloperski** w czasie od **8 do 14 miesięcy**. Koszt realizacji jest ściśle powiązany z kategorią szkód górniczych i startuje od poziomu rynkowego dla budownictwa energooszczędnego (szczegóły w tabeli poniżej). Nie jesteśmy pośrednikiem – dysponujemy własnym zapleczem sprzętowym i ludzkim, co pozwala nam przejąć pełną odpowiedzialność za proces budowlany, od geodezji po odbiory techniczne."
    ]
  },

  // Etapy budowy
  buildingStages: {
    header: {
      label: "ETAPY REALIZACJI",
      title: "Kompleksowa realizacja inwestycji na Śląsku",
      description: "Budowa domu to proces logistyczny, który na terenie Górnego Śląska obarczony jest specyficznymi uwarunkowaniami prawnymi i terenowymi. Wielu inwestorów nie zdaje sobie sprawy, że uzyskanie pozwolenia na budowę w Tychach czy powiecie bieruńsko-lędzińskim wymaga często dodatkowych uzgodnień z Okręgowym Urzędem Górniczym. Jako doświadczony zespół inżynierów, zdejmujemy ten ciężar z Twoich barków.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "building",
        title: "Stan Zero",
        content: [
          { type: 'paragraph', value: "Obejmuje roboty ziemne, wymianę gruntu (jeśli badania geotechniczne wykażą grunty nienośne), wykonanie ław lub płyty fundamentowej oraz izolacje przeciwwilgociowe i termiczne fundamentów." }
        ]
      },
      {
        icon: "hardHat",
        title: "Stan Surowy Otwarty (SSO)",
        content: [
          { type: 'paragraph', value: "Wznoszenie ścian nośnych i działowych, wykonanie stropów żelbetowych (monolitycznych lub gęstożebrowych), wieńców, schodów betonowych oraz więźby dachowej z pokryciem wstępnym." }
        ]
      },
      {
        icon: "paintBrush",
        title: "Stan Surowy Zamknięty (SSZ)",
        content: [
          { type: 'paragraph', value: "Montaż stolarki okiennej (zwykle pakiety 3-szybowe), drzwi zewnętrznych, bramy garażowej oraz docelowego pokrycia dachowego." }
        ]
      },
      {
        icon: "settings",
        title: "Instalacje i tynki",
        content: [
          { type: 'paragraph', value: "Rozprowadzenie instalacji wod-kan, elektrycznych, C.O., wykonanie tynków wewnętrznych (gipsowych lub cementowo-wapiennych) oraz wylewek podłogowych." }
        ]
      },
      {
        icon: "paintBrush",
        title: "Elewacja i ocieplenie",
        content: [
          { type: 'paragraph', value: "Wykonanie termoizolacji styropianem lub wełną mineralną, tynki zewnętrzne, podbitka dachowa i parapety." }
        ]
      },
      {
        icon: "keyRound",
        title: "Prace wykończeniowe",
        content: [
          { type: 'paragraph', value: "Na życzenie doprowadzamy budynek do stanu \"pod klucz\", włączając w to biały montaż, podłogi i malowanie." }
        ]
      }
    ]
  },

  // Specyfika lokalna
  localSpecifics: {
    header: {
      label: "SPECYFIKA TYCHÓW",
      title: "Dlaczego budowa w Tychach wymaga specjalnego podejścia?",
      description: "Tychy i okolice to teren specyficzny geologicznie. Ignorowanie tego faktu na etapie adaptacji projektu to najkrótsza droga do spękanych ścian i wilgoci w piwnicy po kilku latach eksploatacji. Jako lokalna firma, analizujemy każdą działkę pod kątem dwóch kluczowych zagrożeń.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "Szkody górnicze – realne wyzwanie inżynieryjne",
        content: [
          { type: 'paragraph', value: "Wiele dzielnic Tychów oraz sąsiednich miejscowości (jak Bieruń czy Lędziny) znajduje się w strefie wpływów eksploatacji górniczej. Teren może osiadać, przechylać się lub ulegać deformacjom nieciągłym." },
          { type: 'paragraph', value: "Budowa na takim terenie wymaga zastosowania:" },
          { type: 'list', items: [
            "**Wzmocnionych fundamentów:** Zwiększona ilość stali zbrojeniowej (często stal A-IIIN) oraz zastosowanie ław fundamentowych krzyżowych lub płyty fundamentowej.",
            "**Dylatacji:** Podział budynku na niezależne segmenty, które mogą pracować względem siebie bez uszkodzenia konstrukcji.",
            "**Wzmocnień obwodowych:** Dodatkowe wieńce żelbetowe na poziomie stropów i ścian kolankowych, które spinają budynek jak obręcz beczkę."
          ]},
          { type: 'paragraph', value: "Przed rozpoczęciem prac zawsze weryfikujemy kategorię szkód górniczych (od I do IV) i dostosowujemy projekt konstrukcyjny. To nie jest \"opcja dodatkowa\" – to konieczność dla bezpieczeństwa Twojej rodziny." }
        ]
      },
      {
        icon: "shield",
        title: "Grunty wysadzinowe i glina",
        content: [
          { type: 'paragraph', value: "Region ten obfituje w grunty spoiste, takie jak gliny i iły. Są to grunty wysadzinowe, co oznacza, że pod wpływem zamarzania wody zwiększają swoją objętość, mogąc \"wypychać\" fundamenty do góry." },
          { type: 'paragraph', value: "Rozwiązujemy ten problem poprzez:" },
          { type: 'list', items: [
            "**Posadowienie poniżej strefy przemarzania:** W Tychach wynosi ona 1,0 m p.p.t.",
            "**Wymianę gruntu:** Usunięcie warstwy gliny i zastąpienie jej zagęszczonym piaskiem lub pospółką.",
            "**Drenaż opaskowy:** Odprowadzenie wody z dala od fundamentów, aby zapobiec jej gromadzeniu się w strefie przyściennej."
          ]}
        ]
      },
      {
        icon: "settings",
        title: "Fundamenty na trudnym gruncie – technologia i bezpieczeństwo",
        content: [
          { type: 'paragraph', value: "Fundament to baza, której nie da się naprawić po wybudowaniu domu. W naszej praktyce inżynierskiej na terenie Śląska odchodzimy od standardowych rozwiązań na rzecz technologii gwarantujących wyższe bezpieczeństwo." },
          { type: 'paragraph', value: "**Płyta fundamentowa czy ławy?**" },
          { type: 'paragraph', value: "Tradycyjne ławy fundamentowe sprawdzają się na gruntach stabilnych. Jednak w Tychach, przy ryzyku szkód górniczych, coraz częściej rekomendujemy **płytę fundamentową**." },
          { type: 'list', items: [
            "**Sztywność przestrzenna:** Płyta działa jak sztywna taca. Nawet jeśli grunt pod jednym narożnikiem domu osiądzie, płyta utrzyma budynek w całości, minimalizując ryzyko pękania ścian.",
            "**Rozkład naprężeń:** Ciężar domu rozkłada się na całą powierzchnię pod budynkiem (np. 120 m²), a nie tylko liniowo pod ścianami. To kluczowe przy gruntach o słabszej nośności.",
            "**Izolacja termiczna:** Płyta fundamentowa pozwala na wykonanie ciągłej izolacji termicznej od spodu (XPS), eliminując mostki termiczne na styku ściana-fundament."
          ]}
        ]
      },
      {
        icon: "settings",
        title: "Materiały ścienne a akustyka i termoizolacja",
        content: [
          { type: 'paragraph', value: "Jakość murów definiuje mikroklimat wnętrza. Nie pracujemy na \"najtańszych zamiennikach\". Stosujemy materiały certyfikowane:" },
          { type: 'list', items: [
            "**Ceramika poryzowana (np. Porotherm):** Świetna izolacyjność termiczna, naturalna regulacja wilgotności (\"oddychanie ścian\"). Wymaga jednak precyzji przy murowaniu, by nie uszkodzić kruchych pustaków.",
            "**Silikaty (np. Silka):** Bardzo duża masa, co przekłada się na doskonałą izolacyjność akustyczną. Idealne rozwiązanie, jeśli budujesz dom przy ruchliwej ulicy (np. Oświęcimskiej czy Mikołowskiej). Silikaty mają też dużą bezwładność cieplną – długo trzymają ciepło.",
            "**Beton komórkowy (np. Ytong):** Najcieplejszy materiał konstrukcyjny, łatwy w obróbce, pozwalający na uzyskanie bardzo równych ścian, co obniża koszt tynkowania."
          ]},
          { type: 'paragraph', value: "Każdy z tych materiałów ma swoje zastosowanie. Dobieramy go indywidualnie, analizując projekt i lokalizację działki (hałas, strony świata)." }
        ]
      },
      {
        icon: "zap",
        title: "Smart Home Ready – instalacje przyszłości",
        content: [
          { type: 'paragraph', value: "Wielu inwestorów popełnia błąd, myśląc o automatyce budynkowej dopiero na etapie wykończeniówki. Wtedy jest już za późno na profesjonalne systemy przewodowe – zostają tylko mniej stabilne rozwiązania radiowe. U nas standardem jest przygotowanie budynku pod **Smart Home**." },
          { type: 'paragraph', value: "**Standard KNX a tradycyjna elektryka**" },
          { type: 'paragraph', value: "Już na etapie stanu surowego zamkniętego (SSZ) planujemy instalacje inaczej niż w latach 90-tych:" },
          { type: 'list', items: [
            "**Magistrala sterująca:** Rozprowadzamy przewody magistralne (np. zielony kabel EIB/KNX) do wszystkich włączników i punktów sterowania.",
            "**Topologia gwiazdy:** Przewody z gniazd i punktów świetlnych sprowadzamy bezpośrednio do rozdzielnicy, a nie łączymy ich w puszkach pod sufitem. Daje to pełną kontrolę nad każdym obwodem z poziomu szafy sterowniczej.",
            "**Głębokie puszki:** Stosujemy puszki o pogłębionej kubaturze (min. 60mm głębokości lub kieszeniowe), aby zmieścić w nich moduły sterujące lub zapas przewodów."
          ]},
          { type: 'paragraph', value: "**Przygotowanie pod OZE**" },
          { type: 'paragraph', value: "Budujemy domy gotowe na transformację energetyczną. Nawet jeśli dziś nie planujesz pompy ciepła czy fotowoltaiki, przygotowujemy infrastrukturę:" },
          { type: 'list', items: [
            "Kanały techniczne z kotłowni na dach (pod instalację PV).",
            "Przepusty w fundamentach pod gruntowy wymiennik ciepła lub jednostkę zewnętrzną pompy ciepła.",
            "Wzmocniona instalacja elektryczna w garażu pod ładowarkę do samochodów elektrycznych (Wallbox)."
          ]},
          { type: 'paragraph', value: "Takie podejście zwiększa wartość nieruchomości i oszczędza kucia ścian w przyszłości." }
        ]
      },
      {
        icon: "trendingUp",
        title: "Total Cost of Ownership (TCO) – ile naprawdę kosztuje dom?",
        content: [
          { type: 'paragraph', value: "Tani dom w budowie to zazwyczaj drogi dom w eksploatacji. Jako inżynierowie patrzymy na **Total Cost of Ownership (TCO)** – całkowity koszt posiadania domu w perspektywie 15-20 lat." },
          { type: 'paragraph', value: "**Koszt budowy vs. koszt eksploatacji**" },
          { type: 'paragraph', value: "Zaoszczędzenie 10 000 zł na izolacji fundamentów lub wyborze tańszych okien może wydawać się kuszące na etapie kosztorysu. Jednak analiza fizyki budowli jest bezlitosna:" },
          { type: 'list', items: [
            "**Mostki termiczne:** Niewłaściwie zaizolowany wieniec czy nadproże to miejsca, którędy ucieka do 30% ciepła. To przekłada się na wyższe rachunki za gaz czy prąd rzędu 2000-3000 zł rocznie. Po 10 latach \"oszczędność\" zamienia się w stratę.",
            "**Szczelność powietrzna:** Budujemy domy szczelne. Przeprowadzamy testy szczelności (Blower Door Test), aby upewnić się, że ciepłe powietrze nie \"wywiewa\" przez gniazdka elektryczne czy nieszczelności przy murłacie."
          ]},
          { type: 'paragraph', value: "**Analiza akustyczna i mikroklimat**" },
          { type: 'paragraph', value: "Komfort życia to nie tylko temperatura, ale i cisza. Domy szkieletowe często mają problem z przenoszeniem dźwięków uderzeniowych (kroki, trzaśnięcia drzwiami). Dom murowany ze stropem żelbetowym naturalnie tłumi te dźwięki. Ponadto, masywne ściany działają jak bufor wilgoci – wchłaniają jej nadmiar, gdy jest parno, i oddają, gdy powietrze jest suche, tworząc zdrowy mikroklimat bez konieczności stosowania drogich nawilżaczy." }
        ]
      }
    ]
  },

  // Dzielnice
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Gdzie budujemy? Dzielnice Tychów i okolice",
      description: "Nasza baza logistyczna pozwala na sprawną obsługę inwestycji w promieniu do 40 km, jednak sercem naszej działalności są Tychy i bezpośrednie sąsiedztwo. Znamy specyfikę poszczególnych dzielnic, co ułatwia logistykę i planowanie prac ziemnych.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "TYCHY I OKOLICE",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Obsługujemy inwestycje w lokalizacjach w Tychach oraz w miastach ościennych. Dzięki znajomości lokalnych składów budowlanych i betoniarni, minimalizujemy koszty transportu materiałów.",
      cities: [
        { label: "Żwaków", url: "#" },
        { label: "Czułów", url: "#" },
        { label: "Jaroszowice", url: "#" },
        { label: "Urbanowice", url: "#" },
        { label: "Wilkowyje", url: "#" },
        { label: "Mąkołowiec", url: "#" },
        { label: "Wartogłowiec", url: "#" },
        { label: "Mikołów", url: "#" },
        { label: "Bieruń", url: "#" },
        { label: "Kobiór", url: "#" },
        { label: "Lędziny", url: "#" },
        { label: "Pszczyna", url: "#" }
      ]
    }
  },

  // Dlaczego my
  whyUs: {
    header: {
      label: "DLACZEGO CORELTB BUILDERS",
      title: "Dlaczego warto powierzyć nam budowę swojego domu?",
      description: "Wybór wykonawcy to decyzja na lata. Dlaczego inwestorzy z Tychów i okolic decydują się na współpracę z **CoreLTB Builders**?",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "mapPin",
        title: "Lokalność i dostępność",
        description: "Jesteśmy stąd. Nie znikniemy po odebraniu zaliczki. Możesz odwiedzić nas w biurze lub zobaczyć nasze trwające realizacje w regionie."
      },
      {
        icon: "shield",
        title: "Doświadczenie w szkodach górniczych",
        description: "Wiemy, jak zbroić fundamenty i wieńce, aby dom przetrwał wstrząsy górnicze bez pęknięć. To wiedza, której nie mają firmy z innych części Polski."
      },
      {
        icon: "clock",
        title: "Terminowość zapisana w umowie",
        description: "Szanujemy Twój czas i pieniądze (odsetki kredytowe). Harmonogram prac jest integralną częścią umowy, a za opóźnienia z naszej winy przewidujemy kary umowne."
      },
      {
        icon: "building",
        title: "Kompleksowość",
        description: "Załatwiamy geodetę do wytyczenia budynku, kierownika budowy oraz niezbędne odbiory (kominiarskie, elektryczne). Oddajemy Ci komplet dokumentów potrzebnych do PNB (Pozwolenia na Użytkowanie)."
      }
    ]
  },

  // FAQ
  faq: {
    header: {
      label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
      title: "Zarządzanie kryzysowe i bezpieczeństwo prawne",
      description: "Budowa domu to duża operacja finansowa. Co się stanie, gdy ceny stali nagle wzrosną o 50%? Albo gdy wykonawca zniknie z zaliczką? Z nami unikasz tych scenariuszy.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        question: "Co gdy materiały drożeją w trakcie budowy?",
        answer: "W naszych umowach stosujemy przejrzyste zasady waloryzacji lub gwarancji ceny (w zależności od wybranego modelu współpracy). **Model Ryczałtowy:** Ustalamy stałą cenę za dany etap przy podpisaniu umowy. Ryzyko wzrostu cen materiałów bierzemy na siebie. Ty śpisz spokojnie, znając ostateczny koszt. **Model Open Book:** Rozliczamy się na podstawie faktur zakupowych z hurtowni + ustalona marża za robociznę i koordynację. Masz pełny wgląd w ceny zakupu."
      },
      {
        question: "Jakie są moje prawa – rękojmia vs gwarancja?",
        answer: "Jako legalnie działająca firma, udzielamy pisemnej gwarancji na wykonane prace. **Konstrukcja:** Gwarancja na szczelność i stabilność konstrukcji (zgodnie z KC). **Rękojmia:** Ustawowa odpowiedzialność za wady fizyczne. **Polisa OC:** Posiadamy ubezpieczenie OC działalności gospodarczej. Jeśli przypadkowo uszkodzimy mienie sąsiada lub materiał, szkoda pokrywana jest z polisy, a nie z Twojej kieszeni."
      }
    ]
  },

  // Cennik
  pricing: {
    header: {
      label: "SZACUNKOWY CENNIK",
      title: "Szacunkowe koszty budowy domu (2025)",
      description: "Poniższa tabela prezentuje orientacyjne koszty dla domu jednorodzinnego o prostej bryle (dach dwuspadowy). Pamiętaj, że każda budowa wyceniana jest indywidualnie. Ceny materiałów budowlanych są zmienne, dlatego zawsze przygotowujemy aktualny kosztorys przed podpisaniem umowy.",
      align: "center",
      theme: "light"
    },
    rows: [
      {
        stage: "Stan Zero",
        scope: "Roboty ziemne, ławy/płyta, izolacje, chudziak",
        priceRange: "Wycena indywidualna",
        timeRange: "3-5 tygodni"
      },
      {
        stage: "Stan Surowy Otwarty",
        scope: "Ściany nośne, stropy, więźba, pokrycie wstępne",
        priceRange: "Wycena indywidualna",
        timeRange: "2-3 miesiące"
      },
      {
        stage: "Stan Surowy Zamknięty",
        scope: "Okna 3-szybowe, drzwi, brama, dach docelowy",
        priceRange: "Wycena indywidualna",
        timeRange: "1-2 miesiące"
      },
      {
        stage: "Stan Deweloperski",
        scope: "Instalacje, tynki, wylewki, ocieplenie elewacji",
        priceRange: "Wycena indywidualna",
        timeRange: "3-4 miesiące"
      },
      {
        stage: "Kompleksowa budowa",
        scope: "Całość od A do Z (Pakiet Inwestora)",
        priceRange: "Wycena indywidualna",
        timeRange: "8-12 miesięcy"
      }
    ],
    disclaimer: "Uwaga: Ostateczna cena zależy od projektu, kategorii szkód górniczych (ilość stali) oraz wybranych materiałów wykończeniowych."
  },

  // Schema.org
  areaServed: [
    "Tychy",
    "Żwaków",
    "Czułów",
    "Jaroszowice",
    "Urbanowice",
    "Wilkowyje",
    "Mąkołowiec",
    "Wartogłowiec",
    "Mikołów",
    "Bieruń",
    "Kobiór",
    "Lędziny",
    "Pszczyna"
  ],
  geoCoordinates: {
    latitude: "50.1351",
    longitude: "18.9654"
  }
};

/**
 * ========================================
 * KATOWICE - Budowa Domów
 * ========================================
 */
export const katowicePage: LocalPageData = {
  // Meta
  slug: "katowice",
  cityName: "Katowice",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Katowice – Generalny Wykonawca | CoreLTB Builders",
  metaDescription: "Profesjonalna budowa domów w Katowice. ✓ Gwarancja ✓ Doświadczenie",

  // Hero
  pageHeader: {
    title: "Budowa Domów Katowice",
    watermarkText: "KATOWICE",
    backgroundImage: "/images/local/katowice/hero.webp", // TODO: Dodać obraz
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Budowa domów Katowice", href: "" }
    ]
  },

  // Intro
  intro: {
    label: "BUDOWA DOMÓW KATOWICE",
    paragraphs: [
      "**Budowa domu w technologii murowanej** to kompleksowy proces inwestycyjny, obejmujący realizację od stanu zerowego po klucz, z uwzględnieniem specyfiki geologicznej gruntu. Szacunkowy koszt stanu deweloperskiego w 2025 roku wynosi **4800–6500 zł netto za m²** powierzchni użytkowej. Czas realizacji pełnego cyklu budowlanego to zazwyczaj **12–18 miesięcy**. Jako generalny wykonawca, przejmujemy pełną odpowiedzialność prawną i techniczną za inwestycję, zabezpieczając budynek przed szkodami górniczymi charakterystycznymi dla Katowic.",
    ]
  },

  // buildingStages
  buildingStages: {
    header: {
      label: 'ETAPY REALIZACJI',
      title: 'Etapy współpracy – od \"WZ\" do odbioru kluczy',
      description: 'Proces budowy domu to skomplikowana operacja logistyczna. Aby zdjąć z Ciebie ciężar zarządzania, działamy według sprawdzonego schematu, który eliminuje chaos i przestoje.',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        icon: 'fileText',
        title: 'Formalności w Urzędzie Miasta Katowice',
        content: [
          {
            type: 'paragraph',
            value: 'Zanim pierwsza koparka wjedzie na działkę, musimy przebrnąć przez procedury administracyjne. W Katowicach czas oczekiwania na Warunki Zabudowy (jeśli brak MPZP) wynosi średnio **3-6 miesięcy**.',
          },
          {
            type: 'list',
            items: ["**Analiza działki:** Sprawdzamy dostęp do mediów i mapy szkód górniczych w Wyższym Urzędzie Górniczym.", "**Adaptacja projektu:** Nasz architekt adaptujący nanosi budynek na mapę do celów projektowych i projektuje niezbędne wzmocnienia konstrukcyjne (trzpienie, wieńce).", "**Pozwolenie na budowę:** Kompletujemy dokumentację i składamy wniosek w Wydziale Architektury i Budownictwa przy Rynku 1 w Katowicach."],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Nadzór kierownika budowy i zarządzanie kryzysowe',
        content: [
          {
            type: 'paragraph',
            value: 'Na budowie, nawet najlepiej zaplanowanej, mogą wystąpić nieprzewidziane sytuacje – od nagłego załamania pogody po ukryte wady gruntu (np. kurzawka). Wyróżnia nas podejście do zarządzania kryzysowego.',
          },
          {
            type: 'list',
            items: ["**Checklisty odbiorowe:** Każdy etap prac zanikowych (zbrojenie, izolacje) jest weryfikowany przez kierownika budowy według listy kontrolnej obejmującej ponad **50 punktów**.", "**Dokumentacja fotograficzna:** Tworzymy pełną historię budowy. Wiesz dokładnie, jak wygląda zbrojenie w fundamencie, zanim zostanie zalane betonem.", "**Reakcja na błędy:** Jeśli popełnimy błąd (jesteśmy tylko ludźmi), naprawiamy go na własny koszt przed przejściem do kolejnego etapu. Nie \"pudrujemy\" problemów tynkiem."],
          },
        ],
      },
    ],
    imageSrc: '/images/local/katowice/etapy-realizacji.webp',
    imageAlt: 'Etapy współpracy – od \"WZ\" do odbioru kluczy - Katowice',
  },

  // localSpecifics
  localSpecifics: {
    header: {
      label: 'SPECYFIKA BUDOWY W KATOWICE',
      title: 'Szkody górnicze w Katowicach a budowa domu – co musisz wiedzieć?',
      description: 'Budowa domu w stolicy Górnego Śląska nierozerwalnie wiąże się z tematem szkód górniczych. Większość terenów inwestycyjnych w Katowicach (szczególnie południowe dzielnice) znajduje się w zasięgu eksplo',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        icon: 'layers',
        title: 'Fundamenty na terenach górniczych – płyta czy ławy?',
        content: [
          {
            type: 'paragraph',
            value: 'Tradycyjne ławy fundamentowe często nie zdają egzaminu na terenach objętych III lub IV kategorią szkód górniczych. W przypadku wystąpienia deformacji terenu (np. niecki osiadania), ławy mogą pękać, przenosząc naprężenia bezpośrednio na ściany nośne.',
          },
          {
            type: 'paragraph',
            value: 'Dlatego w Katowicach rekomendujemy i wykonujemy **płyty fundamentowe**.',
          },
          {
            type: 'list',
            items: ["**Sztywność:** Płyta to jednolity element żelbetowy, zbrojony górą i dołem (często zużywamy tu o **40% więcej stali** niż w standardzie).", "**Praca z gruntem:** Gdy ziemia \"ucieka\" spod budynku w wyniku tąpnięcia, płyta przechyla się jako całość, ale nie pęka. Dom pozostaje stabilną bryłą.", "**Izolacja:** Płyta pozwala na ciągłą izolację termiczną od spodu (XPS), co eliminuje mostki termiczne przy gruncie."],
          },
        ],
      },
      {
        icon: 'info',
        title: 'Materiały odporne na wstrząsy i akustyka',
        content: [
          {
            type: 'paragraph',
            value: 'Technologia murowana, którą stosujemy, jest dobierana pod kątem odporności na drgania oraz komfortu akustycznego. To aspekt często pomijany przez konkurencję, a kluczowy dla życia w dużym mieście.',
          },
          {
            type: 'paragraph',
            value: 'Stosujemy rozwiązania systemowe:',
          },
          {
            type: 'list',
            items: ["**Bloczki silikatowe lub ceramika poryzowana klasy 15+:** Materiały o dużej gęstości, które zapewniają świetną izolacyjność akustyczną (nawet **55 dB** dla ścian międzylokalowych) i dużą pojemność cieplną.", "**Stropy żelbetowe monolityczne:** W przeciwieństwie do lekkich stropów drewnianych czy gęstożebrowych, monolit wiąże ściany budynku w sztywną skrzynię, co jest krytyczne przy wstrząsach górniczych. Dodatkowo, taki strop doskonale tłumi dźwięki uderzeniowe z piętra.", "**Dylatacje obwodowe:** Stosujemy specjalistyczne taśmy dylatacyjne przy ściankach działowych, aby te nie przejmowały obciążeń z konstrukcji nośnej podczas pracy budynku."],
          },
        ],
      },
    ],
    imageSrc: '/images/local/katowice/specyfika-budowy-w-katowice.webp',
    imageAlt: 'Szkody górnicze w Katowicach a budowa domu – co musisz wiedzieć? - Katowice',
  },
  
  // Dzielnice
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Gdzie budujemy? Dzielnice Katowic i okolice",
      description: "Działamy lokalnie. Znamy specyfikę terenu w Katowice.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "KATOWICE I OKOLICE",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Realizujemy inwestycje w Katowice oraz okolicach.",
      cities: [
        { label: "Podlesie", url: "#" },
        { label: "Zarzecze", url: "#" },
        { label: "Kostuchna", url: "#" },
        { label: "Murcki", url: "#" },
        { label: "Panewniki", url: "#" },
        { label: "Ligota", url: "#" },
        { label: "Brynów", url: "#" },
        { label: "Dąbrówka Mała", url: "#" },
        { label: "Szopienice", url: "#" },
        { label: "Giszowiec", url: "#" },
      ]
    }
  },
    // Dlaczego my
    whyUs: {
      header: {
        label: "DLACZEGO CORE LTB BUILDERS",
        title: "Dlaczego mieszkańcy Katowic wybierają CORE LTB Builders?",
        description: "Wybór wykonawcy to decyzja, która zaważy na Twoim komforcie życia przez następne 30 lat.Oto konkretne powody, dla których inwestorzy ze Śląska powierzają nam swoje budżety:",
        align: "center",
        theme: "light"
      },
      points: [
        {
          icon: "shield",
          title: "Inżynierskie podejście do szkód górniczych",
          description: "Nie zgadujemy. Projektujemy fundamenty i konstrukcję w oparciu o twarde dane geologiczne i wytyczne dla terenów górniczych IV kategorii."
        },
        {
          icon: "shieldCheck",
          title: "Stała cena w umowie",
          description: "W dobie inflacji gwarantujemy stałość ceny na poszczególne etapy. Podpisując umowę na stan surowy, masz pewność, że cena betonu czy stali nie zmieni Twojego budżetu w trakcie trwania tego etapu."
        },
        {
          icon: "trendingUp",
          title: "TCO i Wartość Odsprzedaży",
          description: "Budujemy domy murowane, które utrzymują wysoką wartość rynkową. Dom murowany w Katowicach po 20 latach jest wart znacznie więcej niż jego odpowiednik w technologii lekkiej, a jego koszty konserwacji (elewacja, szczelność) są o 40-60% niższe."
        },
        
        {
          icon: "fileCheck",
          title: "Bezpieczeństwo prawne",
          description: "Działamy legalnie, wystawiamy faktury VAT, posiadamy ubezpieczenie OC działalności.Twoja inwestycja jest chroniona prawnie."
        }
      ]
    },
  // Cennik
  pricing: {
    header: {
      label: "SZACUNKOWY CENNIK",
      title: "Koszt budowy domu 150m2 w Katowicach – Cennik 2025",
      description: "Poniższa tabela przedstawia szacunkowe koszty budowy domu jednorodzinnego o powierzchni 150 m² w technologii murowanej, przy założeniu standardowych warunków gruntowych. Pamiętaj, że ostateczna cena z",
      align: "center",
      theme: "light"
    },
    rows: [
      {
        stage: "Stan Surowy Otwarty",
        scope: "Fundamenty, ściany, stropy, dach",
        priceRange: "2300 - 2800 zł / m²",
        timeRange: "3-4 miesiące"
      },
      {
        stage: "Stan Deweloperski",
        scope: "Okna, tynki, wylewki, instalacje",
        priceRange: "4800 - 5800 zł / m²",
        timeRange: "5-7 miesięcy"
      },
      {
        stage: "Dom pod klucz",
        scope: "Podłogi, łazienki, malowanie",
        priceRange: "od 6500 zł / m²",
        timeRange: "8-12 miesięcy"
      },
    ],
    disclaimer: "Podane ceny są szacunkowe. Dokładny kosztorys przygotowujemy po analizie projektu."
  },
// FAQ
faq: {
  header: {
    label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
    title: "Budowa domu w Katowicach – odpowiadamy na Twoje wątpliwości",
    description: "Zbieramy pytania, które najczęściej słyszymy od klientów planujących budowę w Katowicach i okolicach.",
    align: "center",
    theme: "light"
  },
  items: [
    {
      question: "Ile kosztuje budowa domu 100–150 m² w Katowicach w 2025 roku?",
      answer: "Realizacja domu 100–150 m² w standardzie pod klucz w 2025 roku zazwyczaj wynosi od 700 tys.zł wzwyż. Budżet 400–600 tys. zł pozwoli na doprowadzenie inwestycji do stanu deweloperskiego. Dokładny kosztorys przygotowujemy po analizie projektu."
    },
    {
      question: "Czy realizujecie budowy w Katowicach i okolicach?",
      answer: "Tak, specjalizujemy się w budownictwie na Śląsku, w tym w Katowicach i wszystkich dzielnicach. Znamy lokalną specyfikę gruntów i procedury administracyjne w katowickich urzędach."
    },
    {
      question: "Czy budujecie na terenach szkód górniczych?",
      answer: "Tak, realizujemy inwestycje na terenach objętych wpływami eksploatacji górniczej.Zabezpieczenia konstrukcyjne dobieramy indywidualnie na podstawie kategorii szkód określonej w badaniach geologicznych."
    },
    {
      question: "Jaki projekt domu wychodzi najtaniej w budowie?",
      answer: "Najtańszy w realizacji jest dom o prostej bryle na planie prostokąta, przekryty dachem dwuspadowym. Rezygnacja z piwnicy, balkonów i lukarn pozwala na oszczędności 15-20%."
    },
    {
      question: "Czy oferujecie kompleksową budowę od zera do klucza?",
      answer: "Tak, specjalizujemy się w generalnym wykonawstwie. Przejmujemy pełną odpowiedzialność za proces inwestycyjny – od robót ziemnych i fundamentów, przez stan surowy, aż po finalne wykończenie pod klucz."
    }
  ]
},
  

  // Schema.org
  areaServed: [
    "Katowice",
    "Brynów",
    "Podlesie",
    "Zarzecze",
    "Panewniki",
    "Murcki",
    "Ligota",
    "Kostuchna",
    "Giszowiec",
    "Szopienice",
    "Dąbrówka Mała",
  ],
  geoCoordinates: {
    latitude: "0.0000", // TODO: Dodać współrzędne
    longitude: "0.0000"
  }
};

/**
 * ========================================
 * JAWORZNO - Budowa Domów
 * ========================================
 */
export const jaworznoPage: LocalPageData = {
  // Meta
  slug: "jaworzno",
  cityName: "Jaworzno",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Jaworzno – Generalny Wykonawca | CoreLTB Builders",
  metaDescription: "Kompleksowa budowa domów w Jaworznie. Specjalizacja w terenach pogórniczych i trudnych gruntach. ✓ Lokalny wykonawca ✓ Gwarancja ✓ Stała cena",

  // Hero
  pageHeader: {
    title: "Budowa Domów Jaworzno",
    watermarkText: "JAWORZNO",
    backgroundImage: "/images/local/jaworzno/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Budowa domów Jaworzno", href: "" }
    ]
  },

  // Intro
  intro: {
    label: "BUDOWA DOMÓW JAWORZNO",
    paragraphs: [
      "**Budowa domów w Jaworznie** to złożony proces inwestycyjny realizowany w technologii murowanej, wymagający uwzględnienia specyficznych warunków gruntowych (szkody górnicze). Czas realizacji inwestycji od \"wbicia łopaty\" do stanu deweloperskiego wynosi średnio **8-12 miesięcy**. Koszt stanu surowego otwartego jest każdorazowo przedmiotem **wyceny indywidualnej**, zależnej od stopnia skomplikowania projektu i klasy gruntu. Jako lokalny generalny wykonawca, przejmujemy pełną odpowiedzialność za logistykę, materiały i nadzór techniczny, eliminując ryzyko błędów wykonawczych.",
      "Mieszkasz w Jaworznie lub planujesz tu swoją przyszłość? Nie musisz szukać firmy budowlanej z drugiego końca Polski. Nasza baza operacyjna znajduje się w regionie, dzięki czemu doskonale znamy specyfikę lokalnych gruntów – od Jelenia po Ciężkowice. Wiemy, gdzie występują pustki pogórnicze, a gdzie grunt jest stabilny. Oferujemy realizację inwestycji z gwarancją stałej ceny, co w obecnych czasach inflacji materiałowej jest kluczowym bezpiecznikiem dla Twojego budżetu."
    ]
  },

  // Etapy budowy
  buildingStages: {
    header: {
      label: "ETAPY REALIZACJI",
      title: "Kompleksowa budowa domów w Jaworznie – co oferujemy?",
      description: "Jako **generalny wykonawca** specjalizujemy się w prowadzeniu inwestycji mieszkaniowych w modelu \"zaprojektuj i wybuduj\" lub na podstawie dostarczonego projektu. Nasza oferta to przede wszystkim **budowa domów jednorodzinnych** w technologii tradycyjnej (murowanej), która na terenie Śląska i Jaworzna jest najbezpieczniejszym rozwiązaniem ze względu na **odporność na szkody górnicze**.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "building",
        title: "Stan Surowy Otwarty (SSO) – fundamenty i konstrukcja",
        content: [
          { type: 'paragraph', value: "To etap, w którym budynek nabiera kształtu. W warunkach jaworznickich często rezygnujemy z tradycyjnych ław na rzecz płyty fundamentowej, która działa jak sztywna taca." },
          { type: 'list', items: [
            "Wytyczenie geodezyjne budynku (oś zero).",
            "Roboty ziemne i wykonanie fundamentów ze wzmocnionym zbrojeniem (stal A-IIIN).",
            "Wznoszenie ścian nośnych i działowych.",
            "Wykonanie stropu (często monolitycznego dla lepszego usztywnienia bryły).",
            "Więźba dachowa i pokrycie dachu (dachówka lub blacha)."
          ]}
        ]
      },
      {
        icon: "paintBrush",
        title: "Stan Surowy Zamknięty (SSZ) – stolarka i zabezpieczenie",
        content: [
          { type: 'paragraph', value: "Zamknięcie bryły budynku pozwala na prowadzenie prac wewnątrz niezależnie od warunków atmosferycznych." },
          { type: 'list', items: [
            "Montaż okien w technologii \"ciepłego montażu\" (szczelny montaż trójwarstwowy).",
            "Instalacja bramy garażowej z napędem.",
            "Montaż drzwi wejściowych o podwyższonej odporności na włamanie."
          ]}
        ]
      },
      {
        icon: "settings",
        title: "Stan Deweloperski – instalacje i tynki",
        content: [
          { type: 'paragraph', value: "To moment, w którym budynek staje się funkcjonalnym domem pod kątem technicznym." },
          { type: 'list', items: [
            "Rozprowadzenie instalacji wod-kan, elektrycznej i CO (w tym ogrzewanie podłogowe).",
            "Wykonanie tynków wewnętrznych (gipsowych lub cementowo-wapiennych).",
            "Wylewki podłogowe (jastrych cementowy lub anhydrytowy).",
            "Ocieplenie poddasza i zabudowa G-K."
          ]}
        ]
      },
      {
        icon: "keyRound",
        title: "Budowa Pod Klucz – wykończenie wnętrz",
        content: [
          { type: 'paragraph', value: "Opcja dla inwestorów, którzy chcą wprowadzić się do gotowego domu." },
          { type: 'list', items: [
            "Układanie podłóg, paneli i płytek.",
            "Biały montaż w łazienkach.",
            "Malowanie ścian i montaż drzwi wewnętrznych."
          ]}
        ]
      }
    ]
  },

  // Specyfika lokalna
  localSpecifics: {
    header: {
      label: "SPECYFIKA JAWORZNA",
      title: "Specyfika gruntów w Jaworznie a budowa domu",
      description: "Budowa w naszym mieście wymaga specjalistycznej wiedzy inżynierskiej. Jaworzno, ze względu na swoją górniczą przeszłość (KWK Jaworzno, KWK Komuna Paryska), posiada tereny o zróżnicowanej stabilności gruntu. Jako lokalny wykonawca, nie bagatelizujemy tego aspektu. Standardowy projekt gotowy zakupiony w internecie zazwyczaj projektowany jest na grunt o nośności 150 kPa i brak szkód górniczych. W Jaworznie takie założenia mogą doprowadzić do katastrofy budowlanej, pękania ścian czy wręcz przełamania płyty fundamentowej po kilku latach eksploatacji.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "Szkody górnicze i wzmocnienia konstrukcyjne",
        content: [
          { type: 'paragraph', value: "Tereny pogórnicze klasyfikowane są w kategoriach od I do IV (czasem V). Każda kategoria wymusza inne podejście do konstrukcji budynku. W dzielnicach takich jak Jeleń czy Dąbrowa Narodowa, często spotykamy się z koniecznością stosowania **zabezpieczeń konstrukcyjnych**." },
          { type: 'paragraph', value: "Czym różni się dom na szkody górnicze od standardowego?" },
          { type: 'list', items: [
            "**Fundament:** Zamiast ław, stosujemy zbrojoną krzyżowo płytę fundamentową o grubości 25-30 cm, która \"pływa\" na gruncie w razie wstrząsów.",
            "**Trzpienie żelbetowe:** W ścianach ukrywamy pionowe słupy żelbetowe, które spinają fundament z wieńcem dachowym, tworząc sztywną klatkę.",
            "**Wieńce obwodowe:** Dodatkowe zbrojenie na poziomie stropu, które zapobiega \"rozjeżdżaniu się\" ścian.",
            "**Dylatacje:** Stosowanie przerw dylatacyjnych w elementach wykończeniowych, aby zapobiec pękaniu płytek czy elewacji podczas mikru ruchów gruntu."
          ]},
          { type: 'paragraph', value: "Koszt takich wzmocnień to zazwyczaj **10-15% wartości stanu surowego**, ale jest to wydatek niezbędny dla bezpieczeństwa inwestycji na dekady." }
        ]
      },
      {
        icon: "shield",
        title: "Badania geotechniczne gruntu przed zakupem działki",
        content: [
          { type: 'paragraph', value: "Zanim kupisz działkę w Jaworznie, zleć badania geotechniczne. To nie jest zbędny wydatek, ale polisa ubezpieczeniowa. Wykonanie 3-4 odwiertów na głębokość 3-5 metrów pozwala nam określić:" },
          { type: 'list', items: [
            "Poziom wód gruntowych (czy potrzebny będzie drenaż opaskowy).",
            "Rodzaj gruntu (glina, piasek, nasypy niekontrolowane).",
            "Występowanie pustek lub gruntów nienośnych."
          ]},
          { type: 'paragraph', value: "Często zdarza się, że \"okazyjna\" działka wymaga wymiany gruntu za kilkadziesiąt tysięcy złotych. My pomagamy zweryfikować ten potencjał jeszcze przed finalizacją transakcji u notariusza." }
        ]
      },
      {
        icon: "settings",
        title: "Dlaczego stawiamy na technologię murowaną?",
        content: [
          { type: 'paragraph', value: "W dobie popularności domów szkieletowych czy modułowych, my wciąż rekomendujemy naszym klientom w Jaworznie technologię tradycyjną. Dlaczego? Ponieważ w zderzeniu z lokalnymi realiami (szkody górnicze, wilgotność, klimat), dom murowany wygrywa trwałością i **Całkowitym Kosztem Posiadania (TCO)**." },
          { type: 'paragraph', value: "Dom murowany to konstrukcja masywna. Jej ciężar i sztywność to zalety, a nie wady, gdy grunt pod budynkiem pracuje. Beton i ceramika doskonale przenoszą naprężenia ściskające, co w połączeniu z żelbetowymi wieńcami tworzy bezpieczną \"skorupę\". Domy lekkie (drewniane) są bardziej podatne na deformacje, które mogą prowadzić do rozszczelnienia izolacji i mostków termicznych." },
          { type: 'paragraph', value: "**Ceramika, silikat czy beton komórkowy?**" },
          { type: 'paragraph', value: "Wybór materiału ściennego to jedna z pierwszych decyzji. Każdy ma swoje zalety, które dobieramy do potrzeb inwestora:" },
          { type: 'list', items: [
            "**Ceramika poryzowana (np. Porotherm):** Klasyka gatunku. Świetna izolacyjność termiczna i paroprzepuszczalność (\"oddychanie ścian\"). Wypalana w wysokiej temperaturze, jest całkowicie sucha i odporna na grzyby.",
            "**Silikat (Bloki wapienno-piaskowe):** Mistrz akustyki. Jeśli Twoja działka w Jaworznie leży przy ruchliwej ulicy lub trasie kolejowej, silikat zapewni ciszę wewnątrz. Jest bardzo ciężki, co zwiększa akumulację ciepła – dom wolniej się nagrzewa latem i wolniej wychładza zimą.",
            "**Beton komórkowy (np. Ytong, Solbet):** Najcieplejszy materiał konstrukcyjny. Umożliwia budowę ścian jednowarstwowych (choć zalecamy docieplenie). Jest lekki i łatwy w obróbce, co przyspiesza prace murarskie."
          ]},
          { type: 'paragraph', value: "**Analiza TCO – koszty eksploatacji po 10 latach**" },
          { type: 'paragraph', value: "Budowa domu to nie tylko koszt \"tu i teraz\". To również koszty ogrzewania i konserwacji przez kolejne dekady. Domy murowane charakteryzują się wysoką **bezwładnością cieplną**. Oznacza to, że mury akumulują energię. W przypadku awarii ogrzewania zimą, dom murowany wychładza się o 1-2 stopnie na dobę, podczas gdy dom szkieletowy traci ciepło w kilka godzin." },
          { type: 'paragraph', value: "W perspektywie 20 lat, dom murowany wymaga też mniejszych nakładów na konserwację elewacji i konstrukcji niż technologie alternatywne. To realna oszczędność, którą warto uwzględnić w budżecie." }
        ]
      },
      {
        icon: "trendingUp",
        title: "System Gospodarczy vs Generalny Wykonawca – analiza opłacalności",
        content: [
          { type: 'paragraph', value: "Wielu inwestorów z naszego regionu rozważa budowę systemem gospodarczym (\"szwagier pomoże\", \"sam zamówię beton\"). W teorii brzmi to taniej. W praktyce, w latach 2024/2025, ta różnica zaciera się, a ryzyko rośnie wykładniczo." },
          { type: 'paragraph', value: "**Ukryte koszty budowy systemem gospodarczym**" },
          { type: 'paragraph', value: "Samodzielne prowadzenie budowy to praca na drugi etat. Statystyki pokazują, że inwestor budujący systemem gospodarczym poświęca na logistykę, pilnowanie ekip i zakupy ponad **500-700 godzin** rocznie. To czas, którego nie spędzisz w pracy zarobkowej ani z rodziną." },
          { type: 'paragraph', value: "Do tego dochodzą straty materiałowe (złe wyliczenia, kradzieże na niestrzeżonym placu, odpady) rzędu **10-15%**. My, zamawiając materiały hurtowo bezpośrednio od producentów, uzyskujemy rabaty niedostępne dla klienta indywidualnego, co często pokrywa koszt naszej marży za koordynację." },
          { type: 'paragraph', value: "**Bezpieczeństwo prawne i gwarancja**" },
          { type: 'paragraph', value: "Zatrudniając \"luźne brygady\" bez umowy, w razie błędu zostajesz sam z problemem. Pękająca wylewka? Krzywe ściany? Ekipa znika, telefon milczy. Wybierając naszą firmę, podpisujesz jedną, przejrzystą umowę. Otrzymujesz **gwarancję** na całość prac. Wszelkie usterki usuwamy na nasz koszt. Chronią Cię przepisy Kodeksu Cywilnego i nasza polisa OC wykonawcy. To spokój, którego nie da się wycenić." }
        ]
      }
    ]
  },

  // Dzielnice
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Gdzie budujemy? Dzielnice Jaworzna i okolice",
      description: "Nasza działalność koncentruje się na terenie całego miasta oraz w bezpośrednim sąsiedztwie. Dzięki temu, że nasza baza sprzętowa i logistyczna znajduje się na miejscu, koszty dojazdu i transportu materiałów są zminimalizowane. Nie doliczamy \"kilometrówek\" za dojazd brygad z odległych miast.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "JAWORZNO I OKOLICE",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Obsługujemy inwestycje we wszystkich kluczowych dzielnicach, gdzie rozwija się budownictwo jednorodzinne. Dojazd naszych ekip na plac budowy w obrębie miasta zajmuje średnio **15-20 minut**, co pozwala na błyskawiczną reakcję w sytuacjach awaryjnych (np. nagłe załamanie pogody podczas betonowania).",
      cities: [
        { label: "Jeleń", url: "#" },
        { label: "Dąbrowa Narodowa", url: "#" },
        { label: "Byczyna", url: "#" },
        { label: "Ciężkowice", url: "#" },
        { label: "Pieczyska", url: "#" },
        { label: "Osiedle Stałe", url: "#" },
        { label: "Bory", url: "#" },
        { label: "Szczakowa", url: "#" },
        { label: "Góra Piasku", url: "#" }
      ]
    }
  },

  // Dlaczego my
  whyUs: {
    header: {
      label: "DLACZEGO CORELTB BUILDERS",
      title: "Dlaczego warto wybrać CoreLTB Builders?",
      description: "Decyzja o wyborze wykonawcy to decyzja na całe życie. Dlaczego mieszkańcy Jaworzna i okolic ufają właśnie nam?",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "shield",
        title: "Doświadczenie w szkodach górniczych",
        description: "Nie uczymy się na Twoim domu. Mamy za sobą dziesiątki realizacji na trudnych gruntach IV kategorii. Nasze domy nie pękają, bo wiemy, jak je zazbroić."
      },
      {
        icon: "trendingUp",
        title: "Stała cena w umowie",
        description: "W CoreLTB Builders nie stosujemy \"metody salami\" (dorkajania kosztów w trakcie). Cena ustalona w umowie jest święta, chyba że sam zmienisz zakres prac. Chronimy Cię przed inflacją cen materiałów."
      },
      {
        icon: "clock",
        title: "Terminowość i kary umowne",
        description: "Szanujemy Twój czas. W umowie wpisujemy konkretne daty zakończenia etapów. Jeśli się spóźnimy – płacimy kary umowne. To najlepsza motywacja do sprawnej pracy."
      },
      {
        icon: "users",
        title: "Lokalny patriotyzm",
        description: "Zatrudniamy fachowców z regionu. Wspierasz lokalny rynek pracy, a w zamian otrzymujesz ekipę, która nie musi dojeżdżać 100 km i jest na budowie punkt 7:00."
      }
    ]
  },

  // FAQ
  faq: {
    header: {
      label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
      title: "Formalności budowlane w Urzędzie Miejskim w Jaworznie",
      description: "Budowa domu to także \"papierologia\". Dla wielu naszych klientów wizyta w urzędzie jest stresująca. Dlatego przejmujemy te obowiązki. Znamy procedury w Wydziale Urbanistyki i Architektury Urzędu Miejskiego w Jaworznie przy ul. Grunwaldzkiej.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        question: "W czym wyręczamy inwestora w formalościach?",
        answer: "**Mapy do celów projektowych:** Współpracujemy ze sprawdzonymi lokalnymi geodetami. **Warunki zabudowy / MPZP:** Analizujemy Miejscowy Plan Zagospodarowania Przestrzennego, aby sprawdzić, jaki dom można wybudować na Twojej działce (kąt dachu, wysokość kalenicy, kolor elewacji). **Uzgodnienia branżowe:** Załatwiamy warunki przyłączeniowe mediów (woda, prąd, gaz) u lokalnych dostawców (Tauron, Wodociągi Jaworzno). **Kierownik Budowy:** Zapewniamy nadzór uprawnionego kierownika, który prowadzi Dziennik Budowy i odpowiada karnie za zgodność realizacji ze sztuką budowlaną. **Odbiory końcowe:** Kompletujemy dokumentację powykonawczą niezbędną do uzyskania pozwolenia na użytkowanie w Powiatowym Inspektoracie Nadzoru Budowlanego."
      }
    ]
  },

  // Cennik
  pricing: {
    header: {
      label: "SZACUNKOWY CENNIK",
      title: "Cennik budowy domu w Jaworznie (Szacunkowe koszty 2025)",
      description: "Poniższa tabela przedstawia szacunkowe koszty budowy domu jednorodzinnego o powierzchni ok. 120-150 m². Pamiętaj, że są to wartości orientacyjne dla standardu energooszczędnego (WT 2021). Ostateczna cena zależy od projektu, warunków gruntowych (szkody górnicze!) oraz wybranych materiałów wykończeniowych.",
      align: "center",
      theme: "light"
    },
    rows: [
      {
        stage: "Stan Surowy Otwarty",
        scope: "Fundamenty, ściany, strop, dach",
        priceRange: "Wycena indywidualna",
        timeRange: "3-4 miesiące"
      },
      {
        stage: "Stan Surowy Zamknięty",
        scope: "+ Okna, drzwi, bramy, ścianki działowe",
        priceRange: "Wycena indywidualna",
        timeRange: "+ 1-2 miesiące"
      },
      {
        stage: "Stan Deweloperski",
        scope: "+ Instalacje, tynki, wylewki, ocieplenie",
        priceRange: "Wycena indywidualna",
        timeRange: "+ 3-4 miesiące"
      },
      {
        stage: "Budowa Pod Klucz",
        scope: "+ Podłogi, malowanie, łazienki",
        priceRange: "Wycena indywidualna",
        timeRange: "+ 2-3 miesiące"
      },
      {
        stage: "Adaptacja Projektu",
        scope: "Dostosowanie do szkód górniczych",
        priceRange: "Wycena indywidualna",
        timeRange: "2-4 tygodnie"
      }
    ],
    disclaimer: "Uwaga: Wycena jest zawsze darmowa. W przypadku budowy na terenach szkód górniczych, koszt stanu surowego może wzrosnąć ze względu na konieczność użycia większej ilości stali zbrojeniowej i betonu wyższej klasy (np. C25/30)."
  },

  // Schema.org
  areaServed: [
    "Jaworzno",
    "Jeleń",
    "Dąbrowa Narodowa",
    "Byczyna",
    "Ciężkowice",
    "Pieczyska",
    "Osiedle Stałe",
    "Bory",
    "Szczakowa",
    "Góra Piasku"
  ],
  geoCoordinates: {
    latitude: "50.2050",
    longitude: "19.2747"
  },
  
};


/**
 * Wszystkie strony lokalne
 */
export const allLocalPages: readonly LocalPageData[] = [
  rybnikPage,
  wodzislawPage,
  tychyPage,
  jaworznoPage,
  katowicePage
] as const;

/**
 * Funkcja pomocnicza do pobierania strony po slug
 */
export function getLocalPageBySlug(slug: string): LocalPageData | undefined {
  return allLocalPages.find(page => page.slug === slug);
}

/**
 * Funkcja pomocnicza do pobierania wszystkich slugów (dla generateStaticParams)
 */
export function getAllLocalPageSlugs(): string[] {
  return allLocalPages.map(page => page.slug);
}
