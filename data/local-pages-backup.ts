/**
 * DANE STRON REGIONALNYCH (Budowa domów w miastach)
 * Single Source of Truth dla content stron lokalnych
 */

import type { SectionHeaderProps } from '@/components/shared/SectionHeader';
import type { PageHeaderProps } from '@/components/shared/PageHeader';
import type { IconName } from '@/components/ui/Icon';
import type { Hub } from '@/components/sections/AreasSection';

// Content Blocks dla SimpleImageTextSection
type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] }
  | { type: 'image'; src: string; alt: string; caption?: string };

/**
 * Etap budowy (SSO, Deweloperski, Pod klucz)
 */
export interface BuildingStage {
  readonly title: string;
  readonly description: string;
  readonly items: readonly string[]; // Lista punktów
  readonly icon: IconName;
}

/**
 * Specyfika lokalna (szkody górnicze, fundamenty, etc.)
 */
export interface LocalSpecificItem {
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

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
  readonly icon: IconName;
  readonly title: string;
  readonly description: string;
}

/**
 * FAQ Item
 */
export interface FAQItem {
  readonly question: string;
  readonly answer: string;
}

/**
 * Wiersz tabeli cennika
 */
export interface PricingRow {
  readonly stage: string;
  readonly scope: string;
  readonly priceRange: string;
  readonly timeRange: string;
}

/**
 * Element z ikoną, tytułem i treścią (dla SimpleImageTextSection)
 */
export interface ContentItem {
  readonly icon: IconName;
  readonly title: string;
  readonly content: ContentBlock[];
}

/**
 * Prosta sekcja tekstowa w stylu bloga (SimpleImageTextSection)
 * Obrazy mogą być wstawione w dowolnym miejscu w content jako ContentBlock
 */
export interface ImageTextSection {
  readonly header: SectionHeaderProps;
  readonly items: ContentItem[];
}

/**
 * Główny interface dla strony lokalnej
 */
export interface LocalPageData {
  // Meta & Routing
  readonly slug: string;                    // "rybnik"
  readonly cityName: string;                // "Rybnik"
  readonly region: string;                  // "woj. śląskie"
  readonly metaTitle: string;
  readonly metaDescription: string;

  // Hero (PageHeader)
  readonly pageHeader: PageHeaderProps;

  // Intro (tekst wstępny)
  readonly intro: {
    readonly label: string;
    readonly paragraphs: readonly string[];
  };

  // Etapy budowy (PhilosophyTimeline style)
  readonly buildingStages: ImageTextSection;

  // Specyfika lokalna (PhilosophyTimeline style)
  readonly localSpecifics: ImageTextSection;

  // Dzielnice obsługiwane (AreasSection style - 1 hub)
  readonly districts: {
    readonly header: SectionHeaderProps;
    readonly hub: Hub;  // Tylko 1 hub zamiast 2
  };

  // Dlaczego my (USP)
  readonly whyUs: {
    readonly header: SectionHeaderProps;
    readonly points: readonly WhyUsPoint[];
  };

  // FAQ
  readonly faq: {
    readonly header: SectionHeaderProps;
    readonly items: readonly FAQItem[];
  };

  // Cennik (opcjonalny)
  readonly pricing?: {
    readonly header: SectionHeaderProps;
    readonly rows: readonly PricingRow[];
    readonly disclaimer: string;
  };

  // Sekcje dodatkowe (opcjonalne - PhilosophyTimeline style)
  readonly energyEfficiency?: ImageTextSection;
  readonly formalities?: ImageTextSection;

  // Schema.org
  readonly areaServed: readonly string[];   // ["Rybnik", "Chwałowice", ...]
  readonly geoCoordinates?: {
    readonly latitude: string;
    readonly longitude: string;
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

  // Etapy budowy (SimpleImageTextSection style - BEZ obrazu)
  buildingStages: {
    header: {
      label: "ETAPY REALIZACJI",
      title: "Co oferujemy?",
      description: "Jako inwestorzy zastępczy i generalny wykonawca, nie dzielimy budowy na przypadkowe zlecenia. Realizujemy proces systemowo, co pozwala nam utrzymać ciągłość prac i płynność dostaw materiałów.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "building",
        title: "Stan Surowy Otwarty (SSO)",
        content: [
          { type: 'paragraph', value: "To etap, w którym budynek uzyskuje swoją formę konstrukcyjną. W warunkach rybnickich kluczowa jest precyzja wykonania elementów żelbetowych." },
          { type: 'paragraph', value: "Realizujemy roboty ziemne i fundamentowe (na terenach szkód górniczych standardem jest **płyta fundamentowa** 120-150 kg stali/m³), murujemy ściany z certyfikowanych materiałów, wylewamy stropy monolityczne oraz montujemy więźbę dachową (drewno klasy C24)." }
        ]
      },
      {
        icon: "hardHat",
        title: "Stan Deweloperski",
        content: [
          { type: 'paragraph', value: "Najczęściej wybierany zakres współpracy. Budynek jest z zewnątrz gotowy, a w środku przygotowany do prac wykończeniowych." },
          { type: 'paragraph', value: "Montujemy okna 3-szybowe (Uw <0,9 W/m²K) w ciepłym montażu, rozprowadzamy instalacje (elektryka, Smart Home/KNX, wod-kan, ogrzewanie podłogowe), wykonujemy tynki i wylewki oraz ocieplamy budynek styropianem grafitowym 20 cm z tynkiem silikonowym odpornym na smog." }
        ]
      },
      {
        icon: "keyRound",
        title: "Budowa pod klucz",
        content: [
          { type: 'paragraph', value: "Dla inwestorów ceniących czas, oferujemy pełne wykończenie. Przejmujemy koordynację glazurników, parkieciarzy i malarzy." },
          { type: 'paragraph', value: "Wykonujemy kompleksowe wykończenie łazienek, układamy podłogi (panele/deski/płytki), montujemy drzwi wewnętrzne, malujemy ściany farbami lateksowymi i przekazujemy klucze do wysprzątanego domu gotowego do wniesienia mebli." },
          // Przykład: Obraz wstawiony w dowolnym miejscu w tekście
          { type: 'image', src: "/images/local/rybnik/energooszczednosc.webp", alt: "Nowoczesne rozwiązania energooszczędne w domu - rekuperacja i pompa ciepła", caption: "Rekuperacja i pompa ciepła w nowoczesnym domu" }
        ]
      }
    ]
  },

  // Specyfika lokalna (SimpleImageTextSection style)
  localSpecifics: {
    header: {
      label: "SPECYFIKA BUDOWY W RYBNIKU",
      title: "Szkody górnicze i teren",
      description: "Działalność kopalń KWK Chwałowice czy KWK Jankowice powoduje deformacje terenu. Dla źle zaprojektowanego domu mogą być wyrokiem.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "Płyta fundamentowa",
        content: [
          { type: 'paragraph', value: "Przy III i IV kategorii szkód górniczych to jedyne dopuszczalne rozwiązanie. Płyta 25-30 cm, zbrojona górą i dołem, zachowuje się jak sztywna tratwa." },
          { type: 'paragraph', value: "Gdy grunt pod budynkiem się rozstępuje lub zapada, płyta przenosi naprężenia, chroniąc ściany przed pękaniem. Koszt wyższy o 15-20% od ław, ale eliminuje ryzyko uszkodzeń strukturalnych wartych setki tysięcy złotych." }
        ]
      },
      {
        icon: "shield",
        title: "Trzpienie i wieńce żelbetowe",
        content: [
          { type: 'paragraph', value: "To pionowe słupy ukryte w ścianach, które łączą fundament z wieńcem dachowym. W standardowym domu jest ich 4-6, w domu na szkodach górniczych – nawet **12-16 sztuk**." },
          { type: 'paragraph', value: "Każdy strop musi być opasany żelbetowym wieńcem. Często stosujemy też wieńce w połowie wysokości ścian parteru (przy wysokich kondygnacjach). Dzięki temu zapewniamy budynkowi sztywność przestrzenną potrzebną do przetrwania wstrząsów górniczych." }
        ]
      },
      {
        icon: "settings",
        title: "Dylatacje konstrukcyjne",
        content: [
          { type: 'paragraph', value: "Budynek musi być oddzielony od tarasów, schodów zewnętrznych i garaży. Jeśli grunt osiądzie, te elementy muszą pracować niezależnie, aby nie rozerwać bryły domu." },
          { type: 'paragraph', value: "W dzielnicach takich jak Niedobczyce, Niewiadom czy Boguszowice grunt \"pracuje\" – dlatego każde rozwiązanie inżynieryjne musi być przemyślane i dostosowane do kategorii szkód górniczych określonej w badaniach geologicznych." }
        ]
      }
    ]
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

  // Energooszczędność (SimpleImageTextSection style)
  energyEfficiency: {
    header: {
      label: "ENERGOOSZCZĘDNOŚĆ",
      title: "Nowoczesne rozwiązania dla Rybnika",
      description: "Rybnik, mimo wielu działań antysmogowych, wciąż boryka się z problemem jakości powietrza w sezonie grzewczym. Budując nowy dom, musisz myśleć nie tylko o cieple, ale o jakości powietrza, którym oddychasz wewnątrz.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "wind",
        title: "Rekuperacja – dlaczego warto?",
        content: [
          { type: 'paragraph', value: "Wentylacja grawitacyjna (kominy) w Rybniku to wpuszczanie smogu do domu. Działa ona na zasadzie zasysania powietrza z zewnątrz przez nawiewniki w oknach." },
          { type: 'paragraph', value: "Wentylacja mechaniczna z odzyskiem ciepła (rekuperacja) to system, który filtruje powietrze nawiewane. Stosując filtry klasy F7, zatrzymujemy ponad **80-90% pyłów zawieszonych PM10 i PM2.5**. Rekuperator odzyskuje do 90% ciepła z powietrza wywiewanego, co realnie obniża zapotrzebowanie na ogrzewanie o **15-20 kWh/m²/rok**. Instalację kanałów wentylacyjnych najlepiej zaplanować przed wylaniem stropów." }
        ]
      },
      {
        icon: "zap",
        title: "Pompy ciepła i nowoczesne ogrzewanie",
        content: [
          { type: 'paragraph', value: "Odchodzimy całkowicie od paliw stałych. W naszych realizacjach standardem są powietrzne pompy ciepła lub gruntowe pompy ciepła (z odwiertami pionowymi)." },
          { type: 'paragraph', value: "Pompa ciepła działa najefektywniej przy zasilaniu rzędu 30-35°C. Dlatego w całym domu stosujemy ogrzewanie płaszczyznowe (podłogówka), rezygnując z grzejników. Dach projektujemy tak, aby zoptymalizować połać południową pod panele PV. Połączenie pompy ciepła z instalacją 6-10 kWp pozwala zredukować koszty ogrzewania i CWU do poziomu **kilkuset złotych rocznie**." }
        ]
      },
      {
        icon: "leafIcon",
        title: "Standard WT 2021 i ekologia",
        content: [
          { type: 'paragraph', value: "Nowoczesne budownictwo (WT 2021) to nie tylko wymóg prawny, to kwestia zdrowia i niskich rachunków." },
          { type: 'paragraph', value: "Stosujemy ocieplenie styropianem grafitowym min. 20 cm (lambda 0,031-0,033), okna 3-szybowe (Uw <0,9 W/m²K) oraz szczelną obudowę budynku. Dzięki temu Twój dom będzie ciepły zimą, chłodny latem i tani w eksploatacji przez całe życie." }
        ]
      }
    ]
  },

  // Formalności (SimpleImageTextSection style)
  formalities: {
    header: {
      label: "FORMALNOŚCI",
      title: "Jak pomagamy w procedurach?",
      description: "Budowa domu to w 30% biurokracja, a w 70% inżynieria. Wielu inwestorów traci miesiące na walkę z urzędami. My przejmujemy ten ciężar.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "fileText",
        title: "Adaptacja projektu i pozwolenie na budowę",
        content: [
          { type: 'paragraph', value: "Kupując gotowy projekt, otrzymujesz dokumentację uniwersalną. Aby stała się ona projektem budowlanym, musi zostać zaadaptowana przez lokalnego architekta." },
          { type: 'paragraph', value: "Występujemy do odpowiedniej kopalni (PGG/JSW) o opinię geologiczną. Nasz konstruktor przelicza obciążenia i projektuje wzmocnienia fundamentów adekwatne do kategorii szkód. Koordynujemy pracę geodety. Kompletujemy dokumentację i składamy wniosek o pozwolenie na budowę, monitorując jego status aż do uprawomocnienia. Procedury w Urzędzie Miasta Rybnik są nam dobrze znane." }
        ]
      },
      {
        icon: "clipboard",
        title: "Kierownik budowy i dziennik budowy",
        content: [
          { type: 'paragraph', value: "Zgodnie z Prawem Budowlanym, każda budowa musi mieć kierownika. U nas Kierownik Budowy to nie figurant, który pojawia się tylko po wpis do dziennika." },
          { type: 'paragraph', value: "To inżynier obecny przy każdym kluczowym etapie: odbiór zbrojenia fundamentów (przed zalaniem betonem), kontrola trzpieni i wieńców, sprawdzenie więźby dachowej, nadzór nad izolacjami przeciwwilgociowymi. Prowadzimy rzetelny Dziennik Budowy, dokumentując postępy prac, użyte materiały (klasy betonu, certyfikaty stali) oraz warunki atmosferyczne." }
        ]
      },
      {
        icon: "checkCircle",
        title: "Odbiór końcowy i przekazanie",
        content: [
          { type: 'paragraph', value: "Po zakończeniu prac organizujemy odbiór końcowy z Twoim udziałem. Sprawdzamy każdy detal, testujemy wszystkie instalacje i upewniamy się, że wszystko działa zgodnie z projektem." },
          { type: 'paragraph', value: "Przekazujemy komplet dokumentacji powykonawczej, gwarancji i instrukcji obsługi. Dzięki temu masz pełną kontrolę nad inwestycją i spokój na lata." }
        ]
      }
    ]
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
 * Wszystkie strony lokalne
 */
export const allLocalPages: readonly LocalPageData[] = [
  rybnikPage
  // Kolejne miasta dodamy później
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
