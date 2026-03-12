/**
 * @deprecated Use `@/data/local` instead.
 * This file is kept for reference only. All production imports
 * should use the new scalable system in data/local/.
 *
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
 * EmotionalHero CTA Button
 */
export interface CTAButton {
  text: string;
  href?: string;
  variant?: 'primary' | 'secondary';
}

/**
 * EmotionalHero Section Data (zgodne z EmotionalHeroSectionProps)
 */
export interface EmotionalHeroData {
  label: string;
  headline: string | string[];
  subtitle: string;
  benefits?: string[];
  ctaBoxTitle: string;
  ctaBoxBenefits: string[];
  ctaBoxSubtext: string;
  ctaBoxButtons: CTAButton[];
}

/**
 * Główny interface dla strony lokalnej
 */
export interface LocalPageData {
  // Meta & Routing
  slug: string;                    // "rybnik"
  cityName: string;                // "Rybnik" (mianownik)
  cityNameLocative: string;        // "Rybniku" (miejscownik - "w Rybniku")
  region: string;                  // "woj. śląskie"
  metaTitle: string;
  metaDescription: string;

  // Hero (PageHeader)
  pageHeader: PageHeaderProps;

  // EmotionalHero (sekcja z CTA Box - jak na stronach ofertowych)
  emotionalHero: EmotionalHeroData;

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
  cityNameLocative: "Rybniku",
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
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Rybnik", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW RYBNIK",
    headline: ["Budujesz Dom w Rybniku?", "Teren Górniczy Wymaga Specjalistów"],
    subtitle: "Rybnik to teren górniczy kategorii II-IV. Standardowy projekt katalogowy nie wystarczy – potrzebujesz wykonawcy, który zna lokalne uwarunkowania i zabezpieczy Twój dom przed skutkami eksploatacji górniczej.",
    benefits: [
      "Specjalizacja w budowie na terenach górniczych (kat. II-IV)",
      "Płyty fundamentowe i wzmocnione konstrukcje jako standard",
      "15 lat doświadczenia w powiecie rybnickim",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Ocenimy kategorię terenu górniczego Twojej działki",
      "Dobierzemy odpowiednie rozwiązania konstrukcyjne",
      "Przedstawimy realny kosztorys budowy",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
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
        { label: "Orzepowice" },
        { label: "Golejów" },
        { label: "Rybnicka Kuźnia" },
        { label: "Popielów" },
        { label: "Radziejów" },
        { label: "Chwałowice" },
        { label: "Boguszowice" },
        { label: "Zamysłów" },
        { label: "Zebrzydowice" },
        { label: "Niewiadom" },
        { label: "Jejkowice" },
        { label: "Lyski" },
        { label: "Gaszowice" },
        { label: "Świerklany" }
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
  cityNameLocative: "Wodzisławiu Śląskim",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Wodzisław Śląski – Generalny Wykonawca | CoreLTB Builders",
  metaDescription: "Profesjonalna budowa domów w Wodzisławiu Śląskim. Specjalizujemy się w terenach górniczych. Płyty fundamentowe, wzmocnione konstrukcje. ✓ 15 lat doświadczenia ✓ Gwarancja",

  // Hero
  pageHeader: {
    title: "Budowa Domów Wodzisław Śląski",
    watermarkText: "WODZISŁAW",
    backgroundImage: "/images/local/wodzislaw-slaski/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Wodzisław Śląski", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW WODZISŁAW ŚLĄSKI",
    headline: ["Planujesz Budowę w Wodzisławiu?", "Znamy Ten Teren od 15 Lat"],
    subtitle: "Powiat wodzisławski to teren górniczy, gdzie standardowe projekty często zawodzą. Potrzebujesz wykonawcy z doświadczeniem w budowie na deformujących się gruntach – my realizujemy domy od stanu zero do klucza.",
    benefits: [
      "15 lat doświadczenia w powiecie wodzisławskim",
      "Technologia murowana odporna na wstrząsy górnicze",
      "Jeden partner = pełna odpowiedzialność za efekt końcowy",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Sprawdzimy kategorię terenu górniczego Twojej działki",
      "Dobierzemy optymalną technologię budowy",
      "Przedstawimy harmonogram i kosztorys",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
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
        { label: "Wilchwy" },
        { label: "Jedłownik" },
        { label: "Kokoszyce" },
        { label: "Radlin II" },
        { label: "Zawada" },
        { label: "Nowe Miasto" },
        { label: "Trzy Wzgórza" },
        { label: "Gorzyce" },
        { label: "Mszana" },
        { label: "Godów" }
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
  cityNameLocative: "Tychach",
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
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Tychy", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW TYCHY",
    headline: ["Budujesz Dom w Tychach?", "Lokalna Specjalizacja Ma Znaczenie"],
    subtitle: "Tychy i okolice to teren, gdzie grunty gliniaste i wpływy górnicze wymagają specjalistycznego podejścia. Nie jesteśmy pośrednikiem – dysponujemy własnym zapleczem i realizujemy domy od 8 do 14 miesięcy.",
    benefits: [
      "Własne zaplecze sprzętowe i ekipy (bez pośredników)",
      "Specjalizacja w trudnych gruntach i terenach górniczych",
      "Realizacja od stanu zero do klucza w 8-14 miesięcy",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Ocenimy specyfikę Twojej działki i gruntu",
      "Sprawdzimy kategorię terenu górniczego",
      "Przedstawimy realny harmonogram i kosztorys",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
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
        { label: "Żwaków" },
        { label: "Czułów" },
        { label: "Jaroszowice" },
        { label: "Urbanowice" },
        { label: "Wilkowyje" },
        { label: "Mąkołowiec" },
        { label: "Wartogłowiec" },
        { label: "Mikołów" },
        { label: "Bieruń" },
        { label: "Kobiór" },
        { label: "Lędziny" },
        { label: "Pszczyna" }
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
  cityNameLocative: "Katowicach",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Katowice – Kompleksowe Wykonawstwo 2026 | CoreLTB Builders",
  metaDescription: "Budowa domu jednorodzinnego w Katowicach. Koszt stanu deweloperskiego od 5500-6500 zł/m². Specjalizacja w terenach górniczych. ✓ Lokalna baza logistyczna ✓ Gwarancja stałej ceny ✓ 12-18 miesięcy realizacji",

  // Hero
  pageHeader: {
    title: "Budowa Domów Katowice",
    watermarkText: "KATOWICE",
    backgroundImage: "/images/local/katowice/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Katowice", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW KATOWICE",
    headline: ["Budujesz Dom w Katowicach?", "Mamy Bazę Logistyczną Tuż Obok"],
    subtitle: "Realizujemy budowę domu jednorodzinnego w 12-18 miesięcy. Nasza baza jest w sąsiedztwie Katowic – dojazd na Podlesie, Zarzecze czy Kostuchnę zajmuje nam kilkanaście minut. Zero zbędnych kosztów transportu.",
    benefits: [
      "Stan deweloperski od 5500-6500 zł/m² netto (2026)",
      "Lokalna baza logistyczna = szybka reakcja na budowie",
      "Specjalizacja w terenach górniczych Katowic",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Ocenimy specyfikę terenu górniczego Twojej działki",
      "Przedstawimy realny harmonogram 12-18 miesięcy",
      "Przygotujemy wstępny kosztorys inwestycji",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
  },

  // buildingStages - Ile trwa budowa domu?
  buildingStages: {
    header: {
      label: 'ETAPY REALIZACJI',
      title: 'Ile trwa budowa domu w Katowicach? (Standardy 2026)',
      description: 'Średni czas realizacji dla domu o powierzchni 150 m² w technologii tradycyjnej (murowanej) wynosi od 12 do 18 miesięcy do momentu wprowadzenia się. Harmonogram jest ściśle uzależniony od pór roku oraz przerw technologicznych niezbędnych dla wiązania betonu i wysychania tynków.',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        icon: 'hardHat',
        title: 'Etap 1: Stan Surowy Otwarty (SSO) – 3 do 4 miesięcy',
        content: [
          {
            type: 'paragraph',
            value: 'To najszybszy i najbardziej spektakularny etap budowy. W ciągu niespełna kwartału na Twojej działce powstaje kompletna konstrukcja budynku.',
          },
          {
            type: 'list',
            items: [
              "**Fundamenty:** Wykonanie płyty fundamentowej lub ław zajmuje około **2-3 tygodni**. Na terenach górniczych czas ten może się wydłużyć o **5-7 dni** ze względu na wzmocnione zbrojenie (nawet do **150-180 kg stali na m³ betonu**).",
              "**Ściany nośne i stropy:** Murowanie ścian i wylewanie stropów to kolejne **4-6 tygodni**.",
              "**Więźba i pokrycie dachu:** Konstrukcja dachu wraz z foliowaniem i łatowaniem zamyka ten etap w kolejnych **3-4 tygodniach**."
            ],
          },
        ],
      },
      {
        icon: 'clipboard',
        title: 'Etap 2: Stan Deweloperski – 5 do 7 miesięcy',
        content: [
          {
            type: 'paragraph',
            value: 'To moment, w którym budynek \"zwalnia\", ale dzieje się w nim najwięcej prac instalacyjnych.',
          },
          {
            type: 'list',
            items: [
              "**Stolarka otworowa:** Montaż okien i drzwi (uszczelnienie budynku) – **2-3 dni**.",
              "**Instalacje:** Rozprowadzenie elektryki, hydrauliki, rekuperacji – **3-5 tygodni**.",
              "**Tynki i wylewki:** Wykonanie tynków wewnętrznych i wylewek podłogowych wymaga czasu na wyschnięcie. Technologicznie musimy odczekać minimum **4-6 tygodni** przed rozpoczęciem prac wykończeniowych, aby wilgotność podłoża spadła poniżej **3-4% CM**."
            ],
          },
        ],
      },
    ],
    imageSrc: '/images/local/katowice/etapy-realizacji.webp',
    imageAlt: 'Etapy budowy domu w Katowicach - harmonogram 2026',
  },

  // localSpecifics - Szkody górnicze
  localSpecifics: {
    header: {
      label: 'SPECYFIKA REGIONU',
      title: 'Szkody górnicze a budowa domu w Katowicach',
      description: 'Budowanie na Śląsku, a w szczególności w Katowicach, wymaga specjalistycznej wiedzy inżynieryjnej. Większość terenów inwestycyjnych znajduje się w zasięgu oddziaływania eksploatacji górniczej. Ignorowanie tego faktu na etapie projektu to prosty przepis na pęknięte ściany i uszkodzoną konstrukcję już po kilku latach.',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        icon: 'layers',
        title: 'Fundamenty na terenach górniczych – Płyta vs Ławy',
        content: [
          {
            type: 'paragraph',
            value: 'Standardowe ławy fundamentowe, które sprawdzają się w centralnej Polsce, w Katowicach często są niewystarczające.',
          },
          {
            type: 'list',
            items: [
              "**Sztywność konstrukcji:** Na terenach II, III i IV kategorii szkód górniczych rekomendujemy **płytę fundamentową**. Działa ona jak sztywna taca, na której \"pływa\" cały budynek podczas wstrząsów.",
              "**Zbrojenie:** W naszych realizacjach stosujemy stal zbrojeniową o podwyższonej klasie ciągliwości (A-IIIN). Ilość stali w fundamencie jest często o **30-40% wyższa** niż w standardowym projekcie.",
              "**Dylatacje i zabezpieczenia:** Budynek musi być odpowiednio zdylatowany od elementów zewnętrznych (tarasy, schody wejściowe), aby ruchy gruntu nie powodowały naprężeń niszczących elewację."
            ],
          },
        ],
      },
      {
        icon: 'fileText',
        title: 'Adaptacja projektu do kategorii terenu',
        content: [
          {
            type: 'paragraph',
            value: 'Każdy \"gotowy\" projekt domu wymaga adaptacji do warunków miejscowych. W Katowicach inżynier adaptujący musi uwzględnić:',
          },
          {
            type: 'list',
            items: [
              "Przyspieszenia poziome gruntu.",
              "Krzywiznę terenu (niecki i wypiętrzenia).",
              "Odkształcenia poziome."
            ],
          },
          {
            type: 'paragraph',
            value: 'Realizując inwestycję z nami, masz pewność, że **kierownik budowy** dopilnuje zgodności wykonania z tymi zaostrzonymi rygorami. Nie oszczędzamy na betonie i stali tam, gdzie decyduje się stabilność Twojego domu.',
          },
        ],
      },
    ],
    imageSrc: '/images/local/katowice/specyfika-budowy-w-katowice.webp',
    imageAlt: 'Szkody górnicze w Katowicach - fundamenty i zabezpieczenia',
  },

  // Dzielnice - rozbudowane
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Dzielnice Katowic – gdzie najczęściej realizujemy inwestycje?",
      description: "Katowice to miasto o bardzo zróżnicowanej strukturze geologicznej i urbanistycznej. Jako lokalny wykonawca znamy specyfikę poszczególnych dzielnic, co pozwala nam precyzyjnie planować logistykę i unikać problemów z dojazdem ciężkiego sprzętu.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "KATOWICE I OKOLICE",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Najwięcej inwestycji realizujemy w południowych dzielnicach miasta. Podlesie i Zarzecze charakteryzują się dużą ilością nowych inwestycji. Kostuchna i Murcki wymagają szczególnej uwagi na szkody górnicze (historyczna eksploatacja KWK Murcki-Staszic). Panewniki i Ligota to wyzwania logistyczne – wąskie działki i ograniczenia tonażowe.",
      cities: [
        { label: "Podlesie" },
        { label: "Zarzecze" },
        { label: "Kostuchna" },
        { label: "Murcki" },
        { label: "Panewniki" },
        { label: "Ligota" },
        { label: "Brynów" },
        { label: "Dąbrówka Mała" },
        { label: "Szopienice" },
        { label: "Giszowiec" },
      ]
    }
  },

  // Dlaczego my - rozbudowane
  whyUs: {
    header: {
      label: "DLACZEGO CORE LTB BUILDERS",
      title: "Dlaczego mieszkańcy Katowic wybierają CORE LTB Builders?",
      description: "Decyzja o wyborze firmy budowlanej to decyzja na całe życie. Klienci z naszego regionu cenią nas za podejście oparte na faktach i inżynieryjnej precyzji, a nie na obietnicach bez pokrycia.",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "shield",
        title: "Doświadczenie w szkodach górniczych",
        description: "Nie uczymy się na Twoim domu. Mamy udokumentowane realizacje na terenach III i IV kategorii szkód górniczych w Katowicach i miastach ościennych."
      },
      {
        icon: "shieldCheck",
        title: "Gwarancja stałej ceny",
        description: "Podpisując umowę, otrzymujesz gwarancję ceny na dany etap. Posiadamy klauzule waloryzacyjne, które są transparentne i uczciwe, ale chronimy Cię przed spekulacyjnymi wzrostami cen materiałów, magazynując je z wyprzedzeniem."
      },
      {
        icon: "users",
        title: "Niezależny nadzór",
        description: "Współpracujemy z kierownikami budowy, którzy dbają o Twój interes, a nie tylko o \"szybkie zalanie betonu\". Każdy etap kończy się formalnym odbiorem technicznym."
      },
      {
        icon: "fileCheck",
        title: "Pomoc w odbiorach",
        description: "Nie zostawiamy Cię z kluczami w ręku. Asystujemy przy odbiorach budynku przez PINB (Powiatowy Inspektorat Nadzoru Budowlanego), dostarczając komplet dokumentacji powykonawczej."
      }
    ]
  },

  // FAQ - rozbudowane z nowymi pytaniami
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
        question: "Ile kosztuje budowa domu 100–150 m² w Katowicach w 2026 roku?",
        answer: "Koszt stanu deweloperskiego startuje od **5500-6500 zł netto za m²**. Realizacja domu 100–150 m² w standardzie pod klucz zazwyczaj wynosi od 750 tys. zł wzwyż. Budżet 450–650 tys. zł pozwoli na doprowadzenie inwestycji do stanu deweloperskiego. Dokładny kosztorys przygotowujemy po analizie projektu."
      },
      {
        question: "Jakie są ukryte koszty budowy domu w Katowicach?",
        answer: "**Przyłącza mediów:** Doprowadzenie wody, prądu, gazu i kanalizacji może wynieść od **15 000 do 40 000 zł** w zależności od odległości od sieci. **Zagospodarowanie terenu:** Ogrodzenie, podjazd, niwelacja – kolejne **30 000-60 000 zł**. **Badania geotechniczne:** Koszt rzędu **1500-2000 zł**, ale absolutnie niezbędny dla właściwego doboru fundamentów."
      },
      {
        question: "Czy realizujecie budowy na terenach szkód górniczych?",
        answer: "Tak, to nasza specjalizacja. Realizujemy inwestycje na terenach objętych wpływami eksploatacji górniczej do IV kategorii. Stosujemy płyty fundamentowe ze wzmocnionym zbrojeniem (o **30-40% więcej stali** niż w standardzie) oraz stal klasy A-IIIN o podwyższonej ciągliwości."
      },
      {
        question: "Jaki projekt domu wychodzi najtaniej w budowie?",
        answer: "Najtańszy w budowie jest dom na planie prostokąta z dachem dwuspadowym. **Brak lukarn i wykuszy** – lukarna oszczędza od **3000 do 5000 zł** na jednym elemencie. **Balkony** to drogi element i potencjalny mostek termiczny. Dach wielospadowy jest o **20-30% droższy** niż dwuspadowy."
      },
      {
        question: "Dlaczego warto wybrać generalnego wykonawcę zamiast systemu gospodarczego?",
        answer: "**Ceny materiałów:** Zamawiamy hurtowo – klient indywidualny płaci marżę wyższą o **15-20%**. **VAT:** Usługa budowlana z materiałem to **8% VAT**, zakup samodzielny to **23% VAT**. **Odpowiedzialność:** Masz jedną umowę i jedną gwarancję. Realnie oszczędność systemu gospodarczego jest iluzoryczna (często poniżej 5%), a ryzyko błędów – ogromne."
      }
    ]
  },

  // Schema.org
  areaServed: [
    "Katowice",
    "Podlesie",
    "Zarzecze",
    "Kostuchna",
    "Murcki",
    "Panewniki",
    "Ligota",
    "Brynów",
    "Giszowiec",
    "Szopienice",
    "Dąbrówka Mała",
  ],
  geoCoordinates: {
    latitude: "50.2649",
    longitude: "19.0238"
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
  cityNameLocative: "Jaworznie",
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
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Jaworzno", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW JAWORZNO",
    headline: ["Budujesz Dom w Jaworznie?", "Znamy Każdy Zakamarek Tego Terenu"],
    subtitle: "Nasza baza operacyjna jest w regionie – doskonale znamy specyfikę gruntów od Jelenia po Ciężkowice. Wiemy, gdzie występują pustki pogórnicze i jak zabezpieczyć Twój dom. Realizacja w 8-12 miesięcy.",
    benefits: [
      "Znajomość lokalnych warunków gruntowych (pustki pogórnicze)",
      "Gwarancja stałej ceny – zabezpieczenie przed inflacją materiałów",
      "Realizacja od stanu zero do deweloperskiego w 8-12 miesięcy",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Sprawdzimy specyfikę gruntu Twojej działki",
      "Ocenimy ewentualne zagrożenia pogórnicze",
      "Przedstawimy kosztorys z gwarancją stałej ceny",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
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
        { label: "Jeleń" },
        { label: "Dąbrowa Narodowa" },
        { label: "Byczyna" },
        { label: "Ciężkowice" },
        { label: "Pieczyska" },
        { label: "Osiedle Stałe" },
        { label: "Bory" },
        { label: "Szczakowa" },
        { label: "Góra Piasku" }
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
 * ========================================
 * MIKOŁÓW - Budowa Domów
 * ========================================
 */
export const mikolowPage: LocalPageData = {
  // Meta
  slug: "mikolow",
  cityName: "Mikołów",
  cityNameLocative: "Mikołowie",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Mikołów – Kompleksowa Realizacja 2026 | CoreLTB Builders",
  metaDescription: "Budowa domu jednorodzinnego w Mikołowie. Koszt stanu deweloperskiego od 5500-7200 zł/m². Specjalizacja w szkodach górniczych (KWK Bolesław Śmiały). ✓ Lokalna firma ✓ Gwarancja stałej ceny ✓ 8-12 miesięcy realizacji",

  // Hero
  pageHeader: {
    title: "Budowa Domów Mikołów",
    watermarkText: "MIKOŁÓW",
    backgroundImage: "/images/local/mikolow/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Mikołów", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW MIKOŁÓW",
    headline: ["Budujesz Dom w Mikołowie?", "Lokalny Wykonawca to Klucz do Sukcesu"],
    subtitle: "Znamy specyfikę gruntów w całym powiecie mikołowskim – od centrum po sołectwa. Zabezpieczamy budynki przed szkodami górniczymi (kat. III-IV). Realizacja w 8-12 miesięcy do stanu deweloperskiego.",
    benefits: [
      "Koszt stanu deweloperskiego od 5500-7200 zł/m² netto (2026)",
      "Specjalizacja w terenach poeksploatacyjnych (KWK Bolesław Śmiały)",
      "Pełna odpowiedzialność logistyczna, prawna i techniczna",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Zweryfikujemy MPZP i kategorię terenu górniczego",
      "Ocenimy potrzebę badań geotechnicznych",
      "Przedstawimy harmonogram i kosztorys",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
  },

  // Etapy budowy (współpracy z inwestorem)
  buildingStages: {
    header: {
      label: "ETAPY WSPÓŁPRACY",
      title: "Jak przebiega budowa domu w powiecie mikołowskim?",
      description: "Budowa domów w Mikołowie to proces wymagający uwzględnienia specyficznych uwarunkowań geologicznych oraz formalnych, charakterystycznych dla Górnego Śląska. Generalny wykonawca w tym regionie pełni funkcję nie tylko budowlańca, ale przede wszystkim inżyniera kontraktu, który zarządza ryzykiem inwestycyjnym.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "search",
        title: "Weryfikacja działki i badanie gruntu",
        content: [
          {
            type: "paragraph",
            value: "Zlecenie badań geotechnicznych (minimum 3 odwierty), aby określić nośność gruntu i poziom wód gruntowych. To podstawa do wyceny fundamentów i doboru odpowiedniej konstrukcji."
          },
          {
            type: "paragraph",
            value: "W pierwszej kolejności analizujemy **Miejscowy Plan Zagospodarowania Przestrzennego (MPZP)** lub Warunki Zabudowy. W 2026 roku kluczowym elementem jest adaptacja projektu do lokalnych warunków gruntowych – w Mikołowie często mamy do czynienia z terenami poeksploatacyjnymi."
          }
        ]
      },
      {
        icon: "fileText",
        title: "Harmonogram rzeczowo-finansowy",
        content: [
          {
            type: "paragraph",
            value: "Otrzymujesz dokument, który jest podstawą do wypłaty transz przez bank. Wiążemy się **stałą ceną** na poszczególne etapy, co chroni Cię przed inflacją cen materiałów."
          },
          {
            type: "paragraph",
            value: "Nasz zespół koordynuje uzyskanie pozwolenia na budowę w Starostwie Powiatowym w Mikołowie przy ul. Żwirki i Wigury, co zazwyczaj zajmuje ustawowe 65 dni, pod warunkiem kompletnej dokumentacji."
          }
        ]
      },
      {
        icon: "building",
        title: "Realizacja stanu surowego",
        content: [
          {
            type: "paragraph",
            value: "To najszybszy i najbardziej spektakularny etap budowy. Na Twojej działce powstaje kompletna konstrukcja budynku."
          },
          {
            type: "list",
            items: [
              "Roboty ziemne i wykonanie fundamentów (na terenach szkód górniczych standardem jest **płyta fundamentowa**).",
              "Murowanie ścian z certyfikowanych materiałów ceramicznych lub silikatowych.",
              "Wylewanie stropów monolitycznych dla lepszego usztywnienia konstrukcji.",
              "Więźba dachowa (drewno klasy C24) i pokrycie dachu."
            ]
          }
        ]
      },
      {
        icon: "settings",
        title: "Prace instalacyjne i wykończeniowe",
        content: [
          {
            type: "paragraph",
            value: "Etap, w którym budynek staje się funkcjonalnym domem pod kątem technicznym."
          },
          {
            type: "list",
            items: [
              "Montaż okien 3-szybowych (pakiety o Uw < 0,9 W/m²K) w technologii ciepłego montażu.",
              "Rozprowadzenie instalacji elektrycznych, wod-kan i rekuperacji.",
              "Wykonanie tynków maszynowych i wylewek podłogowych z izolacją termiczną.",
              "Ocieplenie budynku styropianem grafitowym z tynkiem silikonowym."
            ]
          }
        ]
      }
    ],
    imageSrc: "/images/local/mikolow/etapy-budowy.webp",
    imageAlt: "Etapy budowy domu w Mikołowie - harmonogram realizacji"
  },

  // Specyfika lokalna - szkody górnicze i teren
  localSpecifics: {
    header: {
      label: "SPECYFIKA BUDOWY W MIKOŁOWIE",
      title: "Szkody górnicze i ukształtowanie terenu",
      description: "Budowa domu w powiecie mikołowskim różni się od inwestycji w innych częściach Polski. Lokalizacja ta, będąca częścią Górnośląskiego Okręgu Przemysłowego, niesie ze sobą konkretne wyzwania inżynieryjne, których zignorowanie może prowadzić do pękania ścian czy osiadania budynku już po kilku latach.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "Zabezpieczenie przed szkodami górniczymi",
        content: [
          {
            type: "paragraph",
            value: "Mikołów znajduje się w zasięgu oddziaływania eksploatacji górniczej, m.in. **KWK Bolesław Śmiały**. Tereny te są często sklasyfikowane jako kategoria szkód górniczych od I do III, a miejscami nawet IV."
          },
          {
            type: "paragraph",
            value: "Standardowy fundament to za mało. Budynek na takim terenie musi pracować jak sztywna bryła. Dlatego w naszych realizacjach stosujemy:"
          },
          {
            type: "list",
            items: [
              "**Płyty fundamentowe:** Działają jak \"sztywna taca\", na której stoi dom. Nawet jeśli grunt pod budynkiem się przemieści, płyta zapobiega pękaniu ścian nośnych.",
              "**Wzmocnione zbrojenie:** Zwiększamy ilość stali w wieńcach stropowych i nadprożach, stosując pręty żebrowane o wyższej klasie wytrzymałości (A-IIIN).",
              "**Dylatacje:** W przypadku domów o skomplikowanej bryle dzielimy budynek na mniejsze, niezależne segmenty."
            ]
          }
        ]
      },
      {
        icon: "mountain",
        title: "Niwelacja terenu i wody gruntowe",
        content: [
          {
            type: "paragraph",
            value: "Mikołów charakteryzuje się **pagórkowatym ukształtowaniem terenu** (np. okolice Śląskiego Ogrodu Botanicznego, Mokre). Działki ze spadkiem wymagają precyzyjnej niwelacji i odpowiedniego zaprojektowania poziomu \"zero\" budynku."
          },
          {
            type: "paragraph",
            value: "Częstym problemem są również **gliniaste grunty**, które słabo przepuszczają wodę. W takich warunkach konieczne jest wykonanie:"
          },
          {
            type: "list",
            items: [
              "Drenażu opaskowego wokół fundamentów.",
              "Odprowadzenia wód opadowych do studni chłonnych lub kanalizacji deszczowej.",
              "Izolacji przeciwwilgociowej fundamentów i ścian piwnic."
            ]
          },
          {
            type: "paragraph",
            value: "Bagatelizowanie tego etapu to prosta droga do zawilgocenia ścian piwnic lub parteru."
          }
        ]
      },
      {
        icon: "hardHat",
        title: "Technologie budowy – murowane czy szkieletowe?",
        content: [
          {
            type: "paragraph",
            value: "Wybór technologii to decyzja na całe życie. W CORE LTB Builders nie faworyzujemy jednej metody – dobieramy ją do potrzeb klienta, budżetu i specyfiki działki. Analizujemy **Całkowity Koszt Posiadania (TCO)**, biorąc pod uwagę nie tylko koszt budowy, ale też ogrzewania i konserwacji przez 30 lat."
          },
          {
            type: "paragraph",
            value: "**Tradycyjna budowa domów murowanych** (Porotherm, silikaty, beton komórkowy):"
          },
          {
            type: "list",
            items: [
              "**Akumulacja ciepła:** Masywne ściany działają jak bufor termiczny. Zimą długo trzymają ciepło, latem zapobiegają przegrzewaniu.",
              "**Akustyka:** Ciężkie materiały (zwłaszcza silikaty) doskonale tłumią dźwięki – ważne przy budowie blisko DK44 czy A4.",
              "**Odporność:** Technologia murowana, przy odpowiednim zbrojeniu, świetnie znosi naprężenia wynikające ze szkód górniczych."
            ]
          },
          {
            type: "paragraph",
            value: "**Konstrukcja domów szkieletowych** (drewno C24, suszenie komorowe):"
          },
          {
            type: "list",
            items: [
              "**Szybkość realizacji:** Stan deweloperski możemy osiągnąć w 4-6 miesięcy.",
              "**Energooszczędność:** Ściana szkieletowa to w większości izolacja – łatwiej uzyskać standard pasywny.",
              "**Precyzja:** Używamy drewna struganego czterostronnie, które nie będzie się rozsychać ani wypaczać."
            ]
          }
        ]
      }
    ],
    imageSrc: "/images/local/mikolow/specyfika-mikolow.webp",
    imageAlt: "Specyfika budowy w Mikołowie - szkody górnicze i teren pagórkowaty"
  },

  // Dzielnice
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Dzielnice Mikołowa i okolice – gdzie realizujemy inwestycje?",
      description: "Jako firma stacjonująca w regionie, znamy topografię i specyfikę poszczególnych dzielnic. Nie doliczamy gigantycznych kosztów logistycznych za dojazd, co jest częstą praktyką firm ogólnopolskich. Nasze ekipy operują sprawnie na terenie całego powiatu.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "MIKOŁÓW I POWIAT MIKOŁOWSKI",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Obsługujemy wszystkie dzielnice i sołectwa Mikołowa. Znajomość lokalnych MPZP pozwala nam szybciej ocenić potencjał działki. Wiemy, gdzie gmina planuje kanalizację, a gdzie konieczne będzie szambo lub przydomowa oczyszczalnia ścieków.",
      cities: [
        { label: "Centrum i Śródmieście" },
        { label: "Kamionka" },
        { label: "Borowa Wieś" },
        { label: "Paniowy" },
        { label: "Bujaków" },
        { label: "Mokre" },
        { label: "Śmiłowice" },
        { label: "Reta" }
      ]
    }
  },

  // Dlaczego my
  whyUs: {
    header: {
      label: "DLACZEGO CORE LTB BUILDERS",
      title: "Dlaczego warto wybrać CORE LTB Builders do budowy w Mikołowie?",
      description: "Decyzja o wyborze generalnego wykonawcy to decyzja o bezpieczeństwie Twoich pieniędzy (często kredytowych). Mieszkańcy Mikołowa i okolic wybierają CORE LTB Builders, ponieważ oferujemy transparentność i inżynierskie podejście.",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "trendingUp",
        title: "Zabezpieczenie przed inflacją",
        description: "Nasze umowy zawierają jasne klauzule waloryzacyjne. Wiesz, co wpływa na cenę, a co jest stałe. Chronimy Cię przed spekulacyjnymi wzrostami cen materiałów."
      },
      {
        icon: "shield",
        title: "Znajomość lokalnych gruntów",
        description: "Wiemy, gdzie w Mikołowie występuje kurzawka, a gdzie szkody górnicze wymagają betonu klasy C30/37. Nie uczymy się na Twojej budowie – my to już wiemy."
      },
      {
        icon: "users",
        title: "Własne brygady",
        description: "Nie jesteśmy \"firmą teczkową\". Zatrudniamy murarzy, zbrojarzy i cieśli. Dzięki temu mamy pełną kontrolę nad jakością wykonania i terminowością."
      },
      {
        icon: "fileText",
        title: "Pełna obsługa formalna",
        description: "Pomagamy w skompletowaniu dokumentów do E-Dziennika Budowy (system EDB) i reprezentujemy inwestora w urzędach – od pozwolenia po odbiór końcowy."
      },
      {
        icon: "shieldCheck",
        title: "Gwarancja systemowa",
        description: "Udzielamy rękojmi i gwarancji na konstrukcję, co daje Ci spokój na lata. Wszelkie usterki usuwamy na nasz koszt zgodnie z przepisami Kodeksu Cywilnego."
      }
    ]
  },

  // FAQ
  faq: {
    header: {
      label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
      title: "Budowa domów w Mikołowie – odpowiadamy na Twoje pytania",
      description: "Zbieramy pytania, które najczęściej słyszymy od klientów planujących budowę w Mikołowie i okolicach.",
      align: "center",
      theme: "light"
    },
    items: [
      {
        question: "Ile kosztuje budowa domu w 2026 roku i czy budżet 350-500 tys. zł wystarczy na realizację pod klucz?",
        answer: "Koszt budowy domu pod klucz w 2026 roku oscyluje w granicach **6000–8500 zł za m²**. Budżet 350–500 tys. zł jest sporym wyzwaniem i zazwyczaj pozwala na realizację mniejszego budynku lub doprowadzenie inwestycji jedynie do stanu deweloperskiego. W CORE LTB Builders pomagamy optymalizować projekty (prosta bryła, dach dwuspadowy), jednak przy tej kwocie pełne wykończenie standardowego metrażu może być niemożliwe."
      },
      {
        question: "Czy realizujecie budowy na terenach ze szkodami górniczymi w Mikołowie i jak dobieracie odpowiednie fundamenty?",
        answer: "Tak, z powodzeniem budujemy na terenach objętych szkodami górniczymi w Mikołowie, również w zasięgu oddziaływania KWK Bolesław Śmiały. Podstawą jest szczegółowa analiza geologiczna, na bazie której dobieramy rozwiązanie – zazwyczaj jest to solidnie zbrojona **płyta fundamentowa**. Taka konstrukcja najlepiej przenosi naprężenia i minimalizuje ryzyko pęknięć. Projekt konstrukcyjny zawsze dostosowujemy do konkretnej kategorii szkód."
      },
      {
        question: "Jakie rodzaje domów są obecnie najchętniej budowane w Mikołowie i na które projekty jest największy popyt?",
        answer: "W Mikołowie inwestorzy najchętniej wybierają obecnie domy typu **\"nowoczesna stodoła\"** oraz kompaktowe **parterówki o powierzchni do 120 m²**. Klienci stawiają na prostą bryłę i energooszczędność. W CORE LTB Builders zauważamy również rosnący popyt na projekty z płaskim dachem, które doskonale wpisują się w lokalny krajobraz, łącząc funkcjonalność z minimalizmem."
      }
    ]
  },

  // Schema.org
  areaServed: [
    "Mikołów",
    "Kamionka",
    "Borowa Wieś",
    "Paniowy",
    "Bujaków",
    "Mokre",
    "Śmiłowice",
    "Reta"
  ],
  geoCoordinates: {
    latitude: "50.1695",
    longitude: "18.8976"
  }
};


/**
 * ========================================
 * GLIWICE - Budowa Domów
 * ========================================
 */
export const gliwicePage: LocalPageData = {
  // Meta
  slug: "gliwice",
  cityName: "Gliwice",
  cityNameLocative: "Gliwicach",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Gliwice – Generalny Wykonawca 2026 | CoreLTB Builders",
  metaDescription: "Budowa domu jednorodzinnego w Gliwicach. Specjalizacja w terenach górniczych (kategorie I-IV). Płyty fundamentowe, wzmocnione konstrukcje. ✓ 12-18 miesięcy realizacji ✓ Gwarancja stałej ceny ✓ Własne brygady",

  // Hero
  pageHeader: {
    title: "Budowa Domów Gliwice",
    watermarkText: "GLIWICE",
    backgroundImage: "/images/local/gliwice/hero.webp",
    breadcrumbs: [
      { label: "Strona główna", href: "/" },
      { label: "Obszar działania", href: "/obszar-dzialania" },
      { label: "Budowa domów Gliwice", href: "" }
    ]
  },

  // EmotionalHero - sekcja z CTA Box
  emotionalHero: {
    label: "BUDOWA DOMÓW GLIWICE",
    headline: ["Budujesz Dom w Gliwicach?", "Teren Górniczy Wymaga Specjalistów"],
    subtitle: "Gliwice i powiat gliwicki to teren z kategoriami szkód I-IV i gruntami nasypowymi. Przejmujemy pełną odpowiedzialność za proces budowy – od adaptacji projektu po odbiory techniczne. Realizacja w 12-18 miesięcy.",
    benefits: [
      "Specjalizacja w terenach górniczych (kategorie I-IV)",
      "Wzmocnione fundamenty i płyty jako standard",
      "Gwarancja stałej ceny i terminowości w umowie",
    ],
    ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
    ctaBoxBenefits: [
      "Sprawdzimy kategorię szkód górniczych Twojej działki",
      "Dobierzemy optymalną technologię posadowienia",
      "Przedstawimy harmonogram i kosztorys",
      "Odpowiemy na wszystkie Twoje pytania",
    ],
    ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
    ctaBoxButtons: [
      { text: "Zadzwoń do Nas", variant: "secondary" },
      { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
    ],
  },

  // buildingStages
  buildingStages: {
    header: {
      label: "ETAPY REALIZACJI",
      title: "Etapy budowy domu – zakres prac w naszej ofercie",
      description: "Realizujemy inwestycje kompleksowo, dzieląc proces na czytelne etapy rozliczeniowe. Dzięki temu Inwestor płaci za faktycznie wykonane prace, zachowując płynność finansową.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "1. Stan Zerowy – fundamenty i izolacje",
        content: [
          {
            type: "paragraph",
            value: "To najważniejszy etap dla trwałości budynku. Błędy popełnione tutaj są niemożliwe do taniego naprawienia w przyszłości."
          },
          {
            type: "list",
            items: [
              "Geodezyjne wytyczenie budynku na działce (tyczenie osi).",
              "Zdjęcie warstwy humusu i wykopy pod fundamenty.",
              "Wykonanie płyty fundamentowej lub ław i ścian fundamentowych z bloczków betonowych.",
              "Wyprowadzenie kanalizacji podposadzkowej i przepustów wodno-elektrycznych.",
              "Izolacja przeciwwilgociowa (bitumiczna) i termiczna (XPS/Styrodur)."
            ]
          }
        ]
      },
      {
        icon: "building",
        title: "2. Stan Surowy Otwarty (SSO)",
        content: [
          {
            type: "paragraph",
            value: "Etap, w którym budynek nabiera kształtu. Czas realizacji: zazwyczaj **2-3 miesiące**."
          },
          {
            type: "list",
            items: [
              "**Murowanie ścian nośnych:** Używamy ceramiki (np. 25 cm) lub silikatów (18-24 cm) na zaprawie cienkowarstwowej.",
              "**Stropy:** Wykonujemy stropy monolityczne (żelbetowe wylewane na mokro) lub gęstożebrowe (typu Teriva/Vector).",
              "**Konstrukcja dachu:** Montaż więźby dachowej z drewna impregnowanego klasy C24.",
              "**Kominy:** Systemowe kominy spalinowe i wentylacyjne (np. Schiedel/Plewa)."
            ]
          }
        ]
      },
      {
        icon: "keyRound",
        title: "3. Stan Surowy Zamknięty (SSZ)",
        content: [
          {
            type: "paragraph",
            value: "Zabezpieczenie budynku przed warunkami atmosferycznymi."
          },
          {
            type: "list",
            items: [
              "**Pokrycie dachowe:** Dachówka ceramiczna, betonowa lub blachodachówka wraz z obróbkami blacharskimi i rynnami.",
              "**Stolarka okienna:** Montaż okien 3-szybowych (Uf < 0.9 W/m²K) w warstwie ocieplenia (ciepły montaż).",
              "**Bramy i drzwi:** Montaż bramy garażowej segmentowej i drzwi wejściowych antywłamaniowych."
            ]
          }
        ]
      }
    ],
    imageSrc: "/images/local/gliwice/etapy-realizacji.webp",
    imageAlt: "Etapy budowy domu w Gliwicach - od fundamentów po stan zamknięty"
  },

  // localSpecifics
  localSpecifics: {
    header: {
      label: "SPECYFIKA BUDOWY W GLIWICACH",
      title: "Szkody górnicze i trudne grunty",
      description: "Gliwice i powiat gliwicki to teren specyficzny geologicznie. Występowanie szkód górniczych (kategorie I-IV) oraz gruntów nasypowych wymaga indywidualnego podejścia do każdego projektu katalogowego.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "layers",
        title: "Płyta fundamentowa a szkody górnicze",
        content: [
          {
            type: "paragraph",
            value: "Na terenach objętych eksploatacją górniczą (np. w dzielnicach takich jak **Sośnica** czy **Bojków**), rekomendujemy i wykonujemy **płyty fundamentowe zbrojone**. Płyta działa jak sztywna taca – w przypadku ruchów górotworu cały budynek \"pływa\" na gruncie, co minimalizuje ryzyko pękania ścian nośnych."
          },
          {
            type: "paragraph",
            value: "Realizacja fundamentów w strefie szkód obejmuje:"
          },
          {
            type: "list",
            items: [
              "**Wymianę gruntu:** Wybranie rodzimej ziemi i wykonanie podbudowy z kruszywa łamanego stabilizowanego mechanicznie.",
              "**Zwiększone zbrojenie:** Stosujemy stal klasy A-IIIN o podwyższonej ciągliwości, zgodnie z wytycznymi konstruktora.",
              "**Beton wodoszczelny:** Używamy mieszanek klasy C25/30 z dodatkami uszczelniającymi W8."
            ]
          }
        ]
      },
      {
        icon: "fileText",
        title: "Adaptacja projektu do warunków lokalnych",
        content: [
          {
            type: "paragraph",
            value: "Zanim wbijemy pierwszą łopatę, nasz zespół analizuje Miejscowy Plan Zagospodarowania Przestrzennego (MPZP) oraz opinie geologiczne. W Gliwicach często spotykamy się z koniecznością stosowania **dylatacji konstrukcyjnych** oraz dodatkowych wieńców żelbetowych."
          },
          {
            type: "paragraph",
            value: "Te elementy spinają budynek niczym klamra, zapewniając mu sztywność przestrzenną wymaganą przy wstrząsach górniczych. Nasz kierownik budowy dopilnuje zgodności wykonania z tymi zaostrzonymi rygorami."
          }
        ]
      }
    ],
    imageSrc: "/images/local/gliwice/specyfika-budowy-w-gliwice.webp",
    imageAlt: "Specyfika budowy w Gliwicach - szkody górnicze i trudne grunty"
  },

  // Dzielnice
  districts: {
    header: {
      label: "GDZIE BUDUJEMY",
      title: "Dzielnice Gliwic – gdzie realizujemy inwestycje?",
      description: "Jako lokalny wykonawca znamy specyfikę poszczególnych dzielnic Gliwic. Wiemy, gdzie występują tereny pogórnicze, a gdzie grunt jest stabilny. Nie doliczamy kosztów logistycznych za dojazd z odległych miast.",
      align: "left",
      theme: "light"
    },
    hub: {
      hubName: "GLIWICE I POWIAT GLIWICKI",
      subLabel: "OBSZAR DZIAŁANIA",
      iconName: "mapPin",
      description: "Realizujemy inwestycje we wszystkich dzielnicach Gliwic. W dzielnicach takich jak Sośnica czy Bojków szczególną uwagę zwracamy na zabezpieczenia przed szkodami górniczymi. Łabędy i Szobiszowice to rejony o stabilniejszym gruncie.",
      cities: [
        { label: "Śródmieście" },
        { label: "Sośnica" },
        { label: "Bojków" },
        { label: "Łabędy" },
        { label: "Szobiszowice" },
        { label: "Trynek" },
        { label: "Ostropa" },
        { label: "Brzezinka" },
        { label: "Ligota Zabrska" },
        { label: "Żerniki" }
      ]
    }
  },

  // Dlaczego my
  whyUs: {
    header: {
      label: "DLACZEGO CORELTB BUILDERS",
      title: "Dlaczego Inwestorzy z Gliwic wybierają naszą firmę?",
      description: "Decyzja o wyborze generalnego wykonawcy rzutuje na spokój Twojej rodziny przez najbliższe lata. Klienci CoreLTB Builders cenią nas za inżynierskie podejście i transparentność finansową.",
      align: "center",
      theme: "light"
    },
    points: [
      {
        icon: "shield",
        title: "Znajomość lokalnej geologii",
        description: "Nie zgadujemy, jak zbroić fundamenty. Opieramy się na mapach górniczych i badaniach geotechnicznych specyficznych dla Gliwic."
      },
      {
        icon: "users",
        title: "Własne, stałe brygady",
        description: "Nie zlecamy prac przypadkowym podwykonawcom z ogłoszenia. Nasi murarze i zbrojarze to sprawdzony zespół, pracujący ze sobą od lat."
      },
      {
        icon: "trendingUp",
        title: "Stała cena w umowie",
        description: "W dobie inflacji materiałowej, gwarantujemy stałość ceny na zakontraktowany etap. Cena betonu czy cegły nie wzrośnie dla Ciebie w trakcie realizacji."
      },
      {
        icon: "shieldCheck",
        title: "Niezależny nadzór",
        description: "Zachęcamy do zatrudnienia Inspektora Nadzoru Inwestorskiego. Jesteśmy pewni jakości naszych prac i nie boimy się zewnętrznej kontroli technicznej."
      }
    ]
  },

  // FAQ
  faq: {
    header: {
      label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
      title: "Budowa domów w Gliwicach – odpowiadamy na pytania",
      description: "Zbieramy pytania, które najczęściej słyszymy od klientów planujących budowę w Gliwicach i okolicach.",
      align: "center",
      theme: "light"
    },
    items: [
      {
        question: "Czy budowa na szkodach górniczych w Gliwicach jest bezpieczna?",
        answer: "Budowa w strefie wpływów eksploatacji górniczej jest bezpieczna, o ile zastosuje się odpowiednie zabezpieczenia konstrukcyjne. W Gliwicach najczęściej rekomendujemy **płytę fundamentową**, która \"pływa\" na gruncie, minimalizując ryzyko pękania ścian. Inżynierowie CoreLTB Builders dobierają parametry zbrojenia indywidualnie do kategorii szkód, co gwarantuje spokój i trwałość domu na lata."
      },
      {
        question: "Jaki fundament rekomendujecie – płytę czy ławy fundamentowe?",
        answer: "Na terenach objętych szkodami górniczymi (np. Sośnica, Bojków) rekomendujemy **płytę fundamentową zbrojną**. Działa ona jak sztywna taca – nawet gdy grunt się przemieszcza, cały budynek pracuje jako jednolita bryła. Na stabilnych gruntach (np. Łabędy) można rozważyć tradycyjne ławy, ale decyzję podejmujemy po analizie badań geotechnicznych."
      },
      {
        question: "Jak sprawdzić kategorię szkód górniczych działki?",
        answer: "Aktualną kategorię terenu potwierdza **opinia geologiczno-górnicza**, którą wydaje lokalny zakład wydobywczy lub Okręgowy Urząd Górniczy. W ramach współpracy kompleksowo adaptujemy dokumentację do uzyskanej klasy szkód. Stosujemy niezbędne wzmocnienia, zapewniając pełne bezpieczeństwo konstrukcji."
      }
    ]
  },

  // formalities (opcjonalne)
  formalities: {
    header: {
      label: "FORMALNOŚCI",
      title: "Logistyka i formalności – jak wspieramy Inwestora?",
      description: "Budowa domu to nie tylko murowanie, to także \"papierologia\". Urząd Miejski w Gliwicach (Wydział Architektury i Budownictwa) ma swoje specyficzne wymagania dotyczące kompletowania dokumentacji.",
      align: "left",
      theme: "light"
    },
    items: [
      {
        icon: "fileText",
        title: "Obsługa formalna",
        content: [
          {
            type: "paragraph",
            value: "Nasz zespół pomaga w skompletowaniu dokumentów niezbędnych do rozpoczęcia i zakończenia budowy:"
          },
          {
            type: "list",
            items: [
              "**Zgłoszenie rozpoczęcia robót:** Przygotowujemy oświadczenie kierownika budowy.",
              "**Dziennik budowy:** Prowadzimy go skrupulatnie, wpisując każdy istotny etap prac zanikowych.",
              "**Odbiory przyłączy:** Koordynujemy prace z gestorami sieci (wodociągi, energetyka).",
              "**Inwentaryzacja powykonawcza:** Współpracujemy z geodetami, aby mapa do odbioru była gotowa na czas."
            ]
          }
        ]
      },
      {
        icon: "leaf",
        title: "Energooszczędność i walka ze smogiem",
        content: [
          {
            type: "paragraph",
            value: "Gliwice, jak wiele śląskich miast, zmagają się z problemem jakości powietrza. Dlatego w naszych realizacjach standardem staje się **wentylacja mechaniczna z rekuperacją**."
          },
          {
            type: "paragraph",
            value: "Rekuperacja pozwala na filtrację powietrza wchodzącego do domu (filtry F7/węglowe), zatrzymując pyły zawieszone PM10 i PM2.5. Dodatkowo, system ten odzyskuje ciepło, obniżając koszty ogrzewania nawet o **30%**."
          }
        ]
      }
    ],
    imageSrc: "/images/local/gliwice/formalnosci.webp",
    imageAlt: "Formalności budowlane w Gliwicach - wsparcie dla inwestora"
  },

  // Schema.org
  areaServed: [
    "Gliwice",
    "Śródmieście",
    "Sośnica",
    "Bojków",
    "Łabędy",
    "Szobiszowice",
    "Trynek",
    "Ostropa",
    "Brzezinka",
    "Ligota Zabrska",
    "Żerniki"
  ],
  geoCoordinates: {
    latitude: "50.2945",
    longitude: "18.6714"
  }
};


/**
 * Wszystkie strony lokalne
 */
export const allLocalPages: readonly LocalPageData[] = [
  rybnikPage,
  wodzislawPage,
  tychyPage,
  jaworznoPage,
  katowicePage,
  mikolowPage,
  gliwicePage
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
