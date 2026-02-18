// /data/servicesV2.ts
// Nowa struktura danych dla usług budowlanych (wersja 2 - emocjonalna i perswazYjna)
// Kompatybilna z przyszłą migracją do Headless CMS (Strapi)

import { IconName } from '@/components/ui';
import { TestimonialCardProps, SectionHeaderProps, NumberedListItemProps } from '@/components/shared';

// --- Nowe Typy Danych ---

export interface PageHeaderData {
  title: string;
  watermarkText: string;
  backgroundImage: string;
  breadcrumbs: { label: string; href: string }[];
}

export interface ServiceIntroData {
  headline: string;
  description: string;
  ctaText: string;
  ctaLink: string;
}

export interface PhilosophyTimelineData {
  header: SectionHeaderProps;
  items: NumberedListItemProps[];
  image: {
    src: string;
    alt: string;
  };
}

export interface ProcessStepDetailed {
  stepNumber: number;
  icon: IconName;
  title: string;
  description: string;
}

export interface ProcessInfographicData {
  headline: string;
  steps: ProcessStepDetailed[];
}

export interface ServiceAccordionItem {
  iconName?: IconName;
  title: string;
  content: ContentBlock[];
}

export interface ServicesAccordionData {
  header: SectionHeaderProps;
  services: ServiceAccordionItem[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface ContactCTAData {
  header: SectionHeaderProps;
  faqs?: FAQ[];
  contactInfo: ContactInfo;
  ctaTitle?: string; // Opcjonalny tytuł CTA Box (np. "☎ Umów Konsultację (30 min)")
  ctaBenefits?: string[]; // Opcjonalne 4 bullet points benefitów konsultacji
  ctaSubtext?: string; // Opcjonalny tekst pod benefitami
  ctaButtons?: Array<{
    text: string;
    href?: string;
    variant?: 'primary' | 'secondary';
  }>;
}

// Logistyka i Zasięg (AreasSection)
export interface CityData {
  label: string;
  url: string;
}

export interface HubData {
  hubName: string;
  subLabel: string;
  iconName: IconName;
  description: string;
  cities: CityData[];
}

export interface AreasData {
  header: SectionHeaderProps;
  hubs: HubData[];
}

// Content Blocks dla elastycznego formatowania
export type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

export interface CooperationTimelineStep {
  id: string;
  number: number;
  icon: IconName;
  label: string;
  title: string;
  content: ContentBlock[];
  imageSrc: string;
  imageAlt: string;
}

export interface CooperationTimelineData {
  header: SectionHeaderProps;
  steps: CooperationTimelineStep[];
}

export interface EmotionalHeroData {
  label: string;
  headline: string | string[];
  subtitle: string;
  benefits?: string[]; // Opcjonalne 2-3 bullet points z kluczowymi benefitami

  // CTA Box (REQUIRED dla wszystkich stron usług)
  ctaBoxTitle: string; // np. "☎ Umów Konsultację (30 min)"
  ctaBoxBenefits: string[]; // 4 bullet points wartości
  ctaBoxSubtext: string; // np. "Konsultacja bezpłatna..."
  ctaBoxButtons: Array<{
    text: string;
    href?: string;
    variant?: 'primary' | 'secondary';
  }>;
}

// Timeline bez linii (dla strony Projektowanie)
export interface TimelineStepNoLineData {
  id: string;
  number: number;
  icon: IconName; // Tylko dla nawigacji
  label: string; // Tylko dla nawigacji
  title: string;
  content: ContentBlock[];
  imageSrc: string;
  imageAlt: string;
}

export interface CooperationTimelineNoLineData {
  header: SectionHeaderProps;
  steps: TimelineStepNoLineData[];
}

// --- Główny Typ Usługi V2 ---

export interface ServiceV2 {
  slug: string;
  id: string;
  category: string;
  title: string;

  // PageHeader (jak na innych stronach)
  pageHeader: PageHeaderData;

  // Sekcja 1: Dom to więcej niż budynek
  emotionalHero: EmotionalHeroData;

  // Sekcja 2: Filozofia (Budujemy zaufanie)
  philosophyTimeline: PhilosophyTimelineData;

  // Sekcja 3: Etapy Współpracy (Timeline)
  cooperationTimeline?: CooperationTimelineData;

  // Sekcja 3 (alternatywna): Timeline bez linii (dla Projektowanie)
  cooperationTimelineNoLine?: CooperationTimelineNoLineData;

  // Sekcja 4: Treść dla Zainteresowanych (Usługi)
  servicesAccordion?: ServicesAccordionData;

  // Sekcja 4b (opcjonalna): Logistyka i Zasięg
  areasData?: AreasData;

  // Sekcja 5: Opinie Klientów (TestimonialsSection - reużywalny komponent ze strony głównej)
  testimonials: {
    header: SectionHeaderProps;
    testimonials: TestimonialCardProps[];
  };

  // Sekcja 6: Wezwanie do Działania
  contactCTA: ContactCTAData;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Data utworzenia/aktualizacji (przygotowanie pod Strapi)
  createdAt?: string;
  updatedAt?: string;
}

// --- Przykładowe Dane ---

export const allServicesV2: ServiceV2[] = [
  {
    slug: 'kompleksowa-budowa-domow',
    id: 'kompleksowa-budowa-domow',
    category: 'Kompleksowa budowa domów',
    title: 'Kompleksowa budowa domów',

    // PageHeader
    pageHeader: {
      title: 'Kompleksowa budowa domów',
      watermarkText: 'BUDOWA DOMÓW',
      backgroundImage: '/images/uslugi/kompleksowa-budowa-domow/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Kompleksowa budowa domów', href: '' },
      ],
    },

    // Sekcja 1: Dom to więcej niż budynek
    emotionalHero: {
      label: 'GENERALNY WYKONAWCA • ŚLĄSK, MAŁOPOLSKA, OPOLSKIE',
      headline: ['Pełna logistyka, nadzór inżynierski',
      'i gwarancja stałej ceny'
    ],
      subtitle:
        'Jako Generalny Wykonawca przejmujemy 100% odpowiedzialności za proces inwestycyjny. W przeciwieństwie do budowy "systemem gospodarczym", oferujemy przewidywalność. Przejmujemy 100% odpowiedzialności za logistykę na Śląsku, w Małopolsce i Opolskiem – od analizy gruntu, przez stan surowy, aż po odbiory techniczne.',
      benefits: [
        '15 lat doświadczenia w realizacji budynków jednorodzinnych',
        'Jeden wykonawca = jedna gwarancja na cały budynek',
        'Stały koszt budowy wpisany w harmonogram',
      ],
      // CTA Box
      ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
      ctaBoxBenefits: [
        'Wstępna analiza działki (Szkody górnicze, MPZP, Media)',
        'Szacunkowy kosztorys budowy domu na rok 2026',
        'Porównanie kosztów: Stan Surowy vs Deweloperski',
        'Omówienie technologii (WT2021, Pompy ciepła)',
      ],
      ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
      ctaBoxButtons: [
        {
          text: 'Zadzwoń do Nas',
          href: 'tel:+48123456789',
          variant: 'primary',
        },
        {
          text: 'Zamów wycenę online',
          href: '#kontakt',
          variant: 'secondary',
        },
      ],
    },

// Sekcja 2: Filozofia (Budujemy zaufanie)
philosophyTimeline: {
  header: {
    label: 'MODEL REALIZACJI',
    title: 'Więcej niż ekipa budowlana',
    description:
      'W budownictwie najdroższe są błędy na styku ekip. Hydraulik wini murarza, a tynkarz elektryka. W CoreLTB Builders likwidujemy ten problem. Przejmujemy 100% odpowiedzialności za błędy, logistykę i terminowość.',
  },
  
  items: [
    {
      number: 1,
      iconName: 'users',
      title: 'Jeden Adresat Roszczeń (Rękojmia)',
      description:
        'Dajemy 5-letnią rękojmię na cały budynek. W razie usterki dzwonisz pod jeden numer. Nie musisz szukać elektryka, który 3 lata temu kładł kable – my odpowiadamy za sprawność wszystkich instalacji.',
    },
    {
      number: 2,
      iconName: 'fileCheck',
      title: 'Kontrakt Ryczałtowy (Ochrona Ceny)',
      description:
        'Podpisujesz umowę na stałą kwotę. W dobie inflacji to Twoja polisa ubezpieczeniowa. Nawet jeśli ceny materiałów na giełdach wzrosną w trakcie budowy, Twój harmonogram płatności pozostaje bez zmian.',
    },
    {
      number: 3,
      iconName: 'award', // Wróciłem też do 'award' jeśli nie masz 'pickaxe'/'mountain'
      title: 'Geotechnika i Szkody Górnicze',
      description:
        'Budujemy na Śląsku, więc wiemy, że fundament to nie tylko beton. Dobieramy zbrojenie i dylatacje (płyta vs ławy) ściśle pod kategorię terenu (PGG) i badania gruntu, eliminując ryzyko pękania konstrukcji w przyszłości.',
    },
  ],
  
  image: {
    // TWOJA ORYGINALNA ŚCIEŻKA:
    src: '/images/uslugi/kompleksowa-budowa-domow/zespol-coreltb-builders.webp',
    alt: 'Inżynier CoreLTB weryfikujący zbrojenie płyty fundamentowej zgodnie z projektem',
  },
},

    // Sekcja 3: Etapy Współpracy - będzie niżej

// Sekcja 4: Zakres Usług (w formie Akordeonu)
servicesAccordion: {
  header: {
    label: 'ZAKRES USŁUG',
    title: 'Jeden partner, nieskończone możliwości',
    description: 'Odkryj pełen zakres naszego wsparcia na każdym etapie Twojej inwestycji.',
    theme: 'light' as const,
  },
  
  // Zaktualizowana tablica usług
  services: [
    {
      iconName: 'fileText', // Ikona dla pierwszej karty
      title: 'Etap przed-budowlany: solidne fundamenty Twojej inwestycji',
      content: [
        {
          type: 'paragraph',
          value: 'Dobrze wiemy, że sukces całej budowy zależy od starannego przygotowania. Dlatego nasze wsparcie zaczyna się na długo przed pierwszym wbiciem łopaty. Bierzemy na siebie najbardziej złożone i czasochłonne zadania, aby Twoja inwestycja od samego początku stała na pewnym gruncie.'
        },
        {
          type: 'list',
          items: [
            '**Analiza i Pomoc w Zakupie Działki:** Wyszukujemy i weryfikujemy działki pod kątem prawnym, technicznym i geologicznym, zapewniając, że Twój projekt będzie możliwy do zrealizowania.',
            '**Obsługa Formalno-Prawna:** Reprezentujemy Cię w urzędach, uzyskując **Warunki Zabudowy**, wypisy z **MPZP** oraz finalne **pozwolenie na budowę**.',
            '**Wsparcie w Finansowaniu:** Przygotowujemy profesjonalne **kosztorysy budowlane** i harmonogramy, które są niezbędne do uzyskania kredytu hipotecznego.',
          ]
        }
      ]
    },
    {
      iconName: 'draftingCompass', // Ikona dla drugiej karty
      title: 'Projektowanie i adaptacje: Twoja wizja w rękach ekspertów',
      content: [
        {
          type: 'paragraph',
          value: 'Każdy wielki dom zaczyna się od doskonałego projektu. Nasz zespół architektów i projektantów dba o to, by Twoja wizja została przelana na papier w sposób funkcjonalny, estetyczny i zgodny z budżetem.'
        },
        {
          type: 'list',
          items: [
            '**Indywidualne Projekty Architektoniczne:** Tworzymy unikalne projekty "szyte na miarę", które w 100% odpowiadają Twoim potrzebom i marzeniom.',
            '**Adaptacje Projektów Gotowych:** Optymalizujemy i dostosowujemy projekty katalogowe do specyfiki Twojej działki, wprowadzając inteligentne zmiany, które podnoszą komfort życia.',
            '**Projekty Branżowe i Techniczne:** Koordynujemy tworzenie kompletnej dokumentacji, w tym projektów konstrukcji i wszystkich niezbędnych instalacji.',
            '**Projektowanie Wnętrz:** Oferujemy również wsparcie w aranżacji wnętrz, aby zapewnić spójność stylistyczną i funkcjonalną całego domu.',
          ]
        }
      ]
    },
    {
      iconName: 'hardHat', // Ikona dla trzeciej karty
      title: 'Generalne wykonawstwo: budowa od A do Z pod pełną kontrolą',
      content: [
        {
          type: 'paragraph',
          value: 'Jako generalny wykonawca, jesteśmy jednym, w pełni odpowiedzialnym partnerem. Zarządzamy całym procesem budowlanym, gwarantując najwyższą jakość, terminowość i stały kontakt.'
        },
        {
          type: 'list',
          items: [
            '**Realizacja Stanu Surowego:** Wznosimy solidne fundamenty, ściany i konstrukcję dachu, tworząc trwały szkielet Twojego domu (w stanie otwartym lub zamkniętym).',
            '**Prace do Stanu Deweloperskiego:** Wykonujemy wszystkie instalacje, tynki, wylewki i ocieplenie, przygotowując budynek do prac wykończeniowych.',
            '**Wykończenia "Pod Klucz":** Realizujemy kompleksowe prace wykończeniowe – od malowania i podłóg, przez łazienki, aż po biały montaż, oddając dom gotowy do zamieszkania.',
            '**Kierownictwo i Nadzór Budowlany:** Zapewniamy profesjonalnego kierownika budowy, który dba o zgodność prac z projektem, normami i harmonogramem.',
          ]
        }
      ]
    },
    {
      iconName: 'tree', // Ikona dla czwartej karty (TreeDeciduous)
      title: 'Prace zewnętrzne i finalizacja: perfekcyjne zwieńczenie projektu',
      content: [
        {
          type: 'paragraph',
          value: 'Nasz zakres odpowiedzialności wykracza poza mury budynku. Dbamy o każdy detal, aż do momentu, w którym możesz w pełni cieszyć się swoją nową posiadłością.'
        },
        {
          type: 'list',
          items: [
            '**Zagospodarowanie Terenu:** Realizujemy kompleksowe prace zewnętrzne, w tym podjazdy, tarasy, ogrodzenia oraz zakładanie trawników i nasadzenia.',
            '**Odbiory Techniczne:** Bierzemy na siebie cały proces odbiorów z udziałem nadzoru budowlanego, aż do uzyskania **pozwolenia na użytkowanie**.',
            '**Serwis Gwarancyjny:** Jesteśmy do Twojej dyspozycji również po zakończeniu budowy, zapewniając pełne wsparcie w ramach wieloletniej gwarancji.',
          ]
        }
      ]
    }
  ],
},

    // Sekcja 5: Opinie Klientów
    testimonials: {
      header: {
        label: 'CO MÓWIĄ NASI KLIENCI',
        title: 'Po skorzystaniu z naszych usług',
        theme: 'light' as const,
      },
      testimonials: [
        {
          quote:
            'Od początku czuliśmy, że jesteśmy w dobrych rękach. CoreLTB traktował naszą inwestycję jak swoją własną. Terminowość, jakość i kontakt na najwyższym poziomie.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              alt: 'Marek i Kasia',
            },
            name: 'Marek i Kasia',
            role: 'Właściciele domu, Rybnik',
          },
          rating: 5,
        },
        {
          quote:
            'Budowaliśmy po raz pierwszy i obawialiśmy się całego procesu. Dzięki CoreLTB wszystko przebiegło sprawnie i bez stresu. Polecam z całego serca!',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              alt: 'Piotr Nowicki',
            },
            name: 'Piotr Nowicki',
            role: 'Właściciel domu, Katowice',
          },
          rating: 5,
        },
        {
          quote:
            'Profesjonalizm, uczciwość i zaangażowanie. To słowa, które najlepiej opisują CoreLTB. Nasz dom jest dokładnie taki, o jakim marzyliśmy.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              alt: 'Anna Kowalczyk',
            },
            name: 'Anna Kowalczyk',
            role: 'Właścicielka domu, Tychy',
          },
          rating: 5,
        },
        {
          quote:
            'Budowa na terenie szkód górniczych III kategorii - myśleliśmy, że to będzie koszmar. CoreLTB zrobili płytę fundamentową i stan surowy bez żadnych problemów. Fachowcy od trudnych gruntów!',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              alt: 'Tomasz Wróbel',
            },
            name: 'Tomasz Wróbel',
            role: 'Inwestor, Bytom',
          },
          rating: 5,
        },
        {
          quote:
            'Stała cena w umowie i zero niespodzianek. Po doświadczeniach z poprzednią firmą to był oddech. Dom oddany tydzień przed terminem!',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              alt: 'Magdalena Sikora',
            },
            name: 'Magdalena Sikora',
            role: 'Właścicielka domu, Gliwice',
          },
          rating: 4.9,
        },
        {
          quote:
            'Kompleksowa obsługa od A do Z. Nie musiałem szukać osobno ekip do każdego etapu. Jeden telefon, jeden wykonawca, zero stresu.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
              alt: 'Krzysztof Mazur',
            },
            name: 'Krzysztof Mazur',
            role: 'Właściciel domu, Jaworzno',
          },
          rating: 5,
        },
      ],
    },

    // Sekcja 7: Etapy Współpracy (Timeline bez linii)
    cooperationTimelineNoLine: {
      header: {
        label: 'JAK PRACUJEMY',
        title: 'Droga do Twojego wymarzonego domu',
        description: 'Jako Generalny Wykonawca eliminujemy chaos. Każdy etap – od weryfikacji gruntu po odbiór kluczy – ma przypisany kamień milowy i procedurę kontrolną. Ty akceptujesz efekty, my robimy resztę.',
        theme: 'light' as const,
      },
      steps: [
        {
          id: 'etap-1',
          number: 1,
          icon: 'mapPin',
          label: 'Działka',
          title: 'Audyt Terenu i Geotechnika',
          content: [
            {
              type: 'paragraph',
              value: 'Na Południu Polski zakup działki bez sprawdzenia geologii to hazard. Specyfika regionu – w tym **grunty wysadzinowe (gliny)** oraz **aktywne szkody górnicze** (od I do IV kategorii) – bezpośrednio wpływa na koszt fundamentów. Analizujemy grunt przed startem prac, bo różnica w cenie między ławą a płytą fundamentową jest znacząca.'
            },
            {
              type: 'list',
              items: [
                '**Odwierty Geologiczne:** Wykonujemy badania gruntu, aby wykluczyć kosztowną wymianę gruntu (np. przy nasypach niekontrolowanych).',
                '**Szkody Górnicze:** Weryfikujemy kategorię terenu (PGG/WUG) i dobieramy stal zbrojeniową, która utrzyma sztywność budynku przy wstrząsach.',
                '**Geodeta:** Wykonujemy mapę do celów projektowych i wytyczamy budynek w terenie z dokładnością milimetrową.'
              ]
            },
            {
               // STRATEGICZNY LINK WEWNĘTRZNY DO USŁUGI WSPIERAJĄCEJ
               type: 'paragraph', 
               value: '**Masz trudną działkę?** Sprawdź szczegóły: [Usługi Geologiczne i Geodezyjne w CoreLTB >](/oferta/uslugi-techniczne-w-budownictwie)'
            }
          ],
          // Twoje oryginalne zdjęcie zostaje
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
          imageAlt: 'Geodeta z teodolitem na pustej działce budowlanej w słoneczny dzień',
        },
        {
          id: 'etap-2',
          number: 2,
          icon: 'draftingCompass',
          label: 'Projekt',
          title: 'Projekt i Optymalizacja Konstrukcji',
          content: [
            {
              type: 'paragraph',
              value: 'Dla nas projekt to nie tylko wizualizacja, ale precyzyjny plan wydatków. Niezależnie od ścieżki, weryfikujemy dokumentację "okiem wykonawcy". Eliminujemy błędy projektowe i przewymiarowaną ilość stali w fundamentach, zanim maszyny wjadą na budowę.  **Oszczędzasz 10-20% na stanie surowym** dzięki optymalizacji.'
            },
            {
              type: 'list',
              items: [
                '**Adaptacja projektu gotowego:** Masz projekt z katalogu? Przeliczamy go na nowo pod kątem **lokalnych stref wiatrowych/śniegowych** i szkód górniczych. Często "odchudzamy" fundamenty lub zmieniamy drogi strop monolityczny na tańszą Terivę/systemowy, zachowując pełną nośność.',
                '**Indywidualny projekt domu:** Projektujemy od "czystej kartki" domy energooszczędne **WT2021**. Tworzymy bryły proste w budowie i tanie w eksploatacji, od razu uwzględniając miejsce na rekuperację i pompę ciepła.',
                '**Projekty branżowe:** Kompletujemy pełną dokumentację instalacyjną, wjazdy (ZUD) i charakterystykę energetyczną budynku.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Jesteśmy Twoim **partnerem w projektowaniu**, dbając o to, by finalny plan był nie tylko estetyczny, ale przede wszystkim możliwy do zrealizowania w założonym budżecie.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/projekt-domu.webp',
          imageAlt: 'Architekci omawiający plany budowy w nowoczesnym biurze z modelem 3D domu',
        },
        {
          id: 'etap-3',
          number: 3,
          icon: 'plug',
          label: 'Przyłącza',
          title: 'Przyłącza budowlane',
          content: [
            {
              type: 'paragraph',
              value: 'Uzbrojenie działki to labirynt biurokracji i prac ziemnych. W CoreLTB działamy kompleksowo: **jako Twój pełnomocnik** przejmujemy kontakt z gestorami sieci (Tauron, PSG, Lokalne Wodociągi) na terenie Śląska i Małopolski. Ty nie stoisz w kolejkach, my dostarczamy media do budynku.'
            },
            {
              type: 'list',
              items: [
                '**Warunki techniczne (WTP):** Składamy wnioski o wydanie warunków przyłączenia dla wszystkich mediów (Prąd, Woda, Gaz, Kanalizacja), negocjując optymalne trasy przebiegu.',
                '**Projekty branżowe i ZUD:** Zlecamy projekty uprawnionym projektantom sanitarnym/elektrycznym i przeprowadzamy je przez Zespół Uzgodnień Dokumentacji (ZUD) w urzędzie.',
                '**Realizacja (prace ziemne):** Wprowadzamy certyfikowane ekipy instalatorskie. Koordynujemy wykopy i montaże, dbając o normowe wykonanie (podsypki, taśmy ostrzegawcze).',
                '**Odbiory i liczniki:** Organizujemy inwentaryzację geodezyjną powykonawczą oraz końcowe odbiory techniczne z zakładem energetycznym/gazownią, aż do momentu montażu liczników.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Dzięki naszemu doświadczeniu, etap uzbrojenia działki przebiega **sprawnie i bez niepotrzebnych przestojów**.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/przylacza-budowlane.webp',
          imageAlt: 'Pracownik budowlany łączący rury na placu budowy',
        },
        {
          id: 'etap-4',
          number: 4,
          icon: 'stamp',
          label: 'Pozwolenie',
          title: 'Pozwolenie na budowę',
          content: [
            {
              type: 'paragraph',
              value: ' W CoreLTB przygotowujemy kompletny wniosek zgodny z aktualnym Prawem Budowlanym. Znamy specyfikę i wymogi formalne wydziałów architektury w lokalnych Starostwach (Katowice, Rybnik, Gliwice, Opole), co minimalizuje ryzyko odrzucenia wniosku.'
            },
            {
              type: 'list',
              items: [
                '**Kompletacja dokumentacji:** Składamy Projekt Zagospodarowania Terenu (PZT) oraz Projekt Architektoniczno-Budowlany (PAB) wraz z wymaganymi opiniami.',
                '**Obsługa formalna:** Wypełniamy oświadczenia o prawie do dysponowania nieruchomością, wnioski o odrolnienie oraz uzgodnienia z rzeczoznawcami (ppoż/sanepid).',
                '**Monitoring sprawy:** Na bieżąco kontaktujemy się z inspektorem prowadzącym sprawę, aby błyskawicznie reagować na ewentualne wezwania, nie angażując Twojego czasu.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Dzięki naszej skrupulatności **minimalizujemy ryzyko odrzucenia wniosku** i maksymalnie skracamy czas oczekiwania na decyzję.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/pozwolenie-na-budowe.webp',
          imageAlt: 'Oficjalny dokument z pieczęcią zatwierdzającą pozwolenie na budowę',
        },
        {
          id: 'etap-5',
          number: 5,
          icon: 'landmark',
          label: 'Finansowanie',
          title: 'Budżet i Finansowanie',
          content: [
            {
              type: 'paragraph',
              value: 'Uzyskanie kredytu to procedura techniczna. Analitycy bankowi odrzucają wnioski oparte na nierealnych wycenach. Jako Generalny Wykonawca przygotowujemy profesjonalny **Harmonogram Rzeczowo-Finansowy**. Jest to dokument w pełni zgodny z wymogami banków, co drastycznie przyspiesza decyzję kredytową i wypłatę środków'
            },
            {
              type: 'paragraph',
              value: 'Nasze wsparcie w tym kluczowym momencie opiera się na trzech filarach:'
            },
            {
              type: 'list',
              items: [
                '**Kosztorys dla Banku:** Otrzymujesz gotowy dokument potwierdzający wartość inwestycji, uznawany przez rzeczoznawców majątkowych.',
                '**Transzowanie:** Synchronizujemy etapy budowy z wypłatami transz bankowych. Dzięki temu nie tracisz płynności finansowej w trakcie prac.',
                '**Eksperci kredytowi:** Udostępniamy kontakt do sprawdzonych, niezależnych doradców na Śląsku i w Małopolsce, którzy znają nasz proces budowlany.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Dzięki naszemu wsparciu zyskujesz nie tylko pomoc w formalnościach, ale przede wszystkim spokój ducha i pewność, że Twój budżet jest **realistyczny, dobrze zaplanowany i bezpieczny**.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/wsparcie-finansowanie.webp',
          imageAlt: 'Para omawiająca finansowanie budowy z doradcą finansowym w biurze',
        },
        {
          id: 'etap-6',
          number: 6,
          icon: 'construction',
          label: 'Budowa',
          title: 'Realizacja budowy',
          content: [
            {
              type: 'paragraph',
              value: 'Budujemy w według norm **WT2021**, eliminując mostki termiczne już na etapie wznoszenia murów (systemy cienkospoinowe Porotherm/Silka/Ytong). W CoreLTB Builders pilnujemy przerw technologicznych – beton musi osiągnąć pełną wytrzymałość przed kolejnym etapem. W standardzie deweloperskim otrzymujesz budynek wyposażony w nowoczesne systemy (Pompa Ciepła, Rekuperacja), gotowy do prac wykończeniowych.'
            },
            {
              type: 'list',
              items: [
                '**SSO (Konstrukcja):** Ściany w systemie bezspoinowym, stropy żelbetowe monolityczne (akustyka!), więźba dachowa impregnowana ciśnieniowo.',
                '**SSZ (Ciepłe zamknięcie):** Stolarka okienna 3-szybowa (Ug<0.9) montowana w warstwie ocieplenia (tzw. ciepły montaż) na taśmach szczelnych.',
                '**Instalacje:** Rozprowadzenie ogrzewania podłogowego, wod-kan, elektryki oraz montaż maszynowni (Kotłownia/Pompa).',
                '**Prace pod klucz:** Możliwość płynnego przejścia do etapu wykończenia wnętrz z naszym dedykowanym zespołem projektowym.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Na każdym etapie masz **stały wgląd w postęp prac** i jednego, dedykowanego kierownika projektu do kontaktu.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/realizacja-budowy.webp',
          imageAlt: 'Plac budowy z domem w stanie surowym otwartym na tle błękitnego nieba',
        },
        {
          id: 'etap-7',
          number: 7,
          icon: 'shovel',
          label: 'Teren',
          title: 'Zagospodarowanie terenu',
          content: [
            {
              type: 'paragraph',
              value: 'Nie zostawiamy Inwestora na "księżycowym krajobrazie". Na Śląsku i w Małopolsce, gdzie dominują grunty słabo przepuszczalne (gliny), kluczowe jest **profesjonalne ukształtowanie spadków terenu**. Wchodzimy z ciężkim sprzętem zaraz po demontażu rusztowań, aby odprowadzić wody opadowe z dala od fundamentów, chroniąc piwnice i mury przed zawilgoceniem.'
            },
    
            {
              type: 'list',
              items: [
                '**Kształtowanie terenu:** Niwelacja, humusowanie oraz wykonanie drenażu opaskowego i studni chłonnych (rozwiązanie problemu błota).',
                '**Nawierzchnie utwardzone:** Podjazdy i tarasy wykonujemy na pełnej podbudowie drogowej (kruszywo łamane stabilizowane mechanicznie), co gwarantuje, że kostka nie "siądzie" pod ciężarem samochodów.',
                '**Ogrodzenie systemowe:** Montaż cokołów, paneli i bram z automatyką zintegrowaną z instalacją elektryczną domu.',
              ]
            },
            {
              type: 'paragraph',
              value: 'Powierzając nam ten etap, masz pewność, że otoczenie Twojego domu będzie **funkcjonalne, piękne i wykonane zgodnie ze sztuką**.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/zagospodarowanie-terenu.webp',
          imageAlt: 'Nowoczesny taras z meblami ogrodowymi za świeżo wybudowanym domem',
        },
        {
          id: 'etap-8',
          number: 8,
          icon: 'keyRound',
          label: 'Odbiór',
          title: 'Procedura PINB i 5-Letnia rękojmia',
          content: [
            {
              type: 'paragraph',
              value: 'Zakończenie budowy to procedura administracyjna, nie tylko przekazanie kluczy. Zamieszkanie bez odbioru grozi karami finansowymi, dlatego jako Twój pełnomocnik składamy zawiadomienie o zakończeniu budowy do powiatowego inspektoratu nadzoru budowlanego. Nasz kierownik budowy zamyka dziennik i przygotowuje budynek do legalnego użytkowania, zdejmując z ciebie ryzyko prawne.'
            },
            {
              type: 'paragraph',
              value: 'W Twoim imieniu zajmujemy się wszystkimi niezbędnymi formalnościami, abyś mógł legalnie i bezpiecznie zamieszkać w swoim nowym domu:'
            },
            {
              type: 'list',
              items: [
'**Dokumentacja powykonawcza:** kompletujemy inwentaryzację geodezyjną, protokoły kominiarskie, elektryczne i szczelności instalacji gazowej niezbędne dla urzędu.',
                '**Pozwolenie na użytkowanie:** uzyskujemy tzw. "milczącą zgodę" lub decyzję o pozwoleniu na użytkowanie, co formalnie kończy proces budowlany.',
                '**Gwarancja i serwis:** udzielamy pełnej, 5-letniej rękojmi na konstrukcję i szczelność budynku oraz przeprowadzamy instruktaż obsługi systemów (rekuperacja, pompa ciepła).'
              ]
            },
            {
              type: 'paragraph',
              value: 'Po dopełnieniu formalności, uroczyście przekazujemy Ci klucze oraz **wieloletnią, pisemną gwarancję na wykonane roboty budowlane**. To pieczęć jakości CoreLTB Builders i Twoje **poczucie pełnego bezpieczeństwa** na wiele lat szczęśliwego mieszkania. Witaj w domu!'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/odbior-gwarancja.webp',
          imageAlt: 'Szczęśliwa para otrzymująca klucze do swojego nowego domu od przedstawiciela firmy',
        },
      ],
    },
    areasData: {
      header: {
        label: 'LOGISTYKA I ZASIĘG',
        title: 'Dwie Bazy Operacyjne: Jaworzno i Wodzisław',
        description: 'Dzięki strategicznemu położeniu baz przy A4 i w centrum ROW, eliminujemy koszty dojazdów w promieniu 50km.',
        align: 'center' as const,
        theme: 'light' as const,
      },
      hubs: [
        {
          hubName: 'WODZISŁAW ŚLĄSKI',
          subLabel: '',
          iconName: 'mountain' as const,
          description: 'Specjalizacja: Fundamenty na trudnych gruntach gliniastych i górniczych (kat. I-IV).',
          cities: [
            { label: 'Wodzisław Śląski', url: '/obszar-dzialania/budowa-domow-wodzislaw-slaski' },
            { label: 'Rybnik', url: '/obszar-dzialania/budowa-domow-rybnik' },
            { label: 'Żory', url: '/obszar-dzialania/budowa-domow-zory' },
            { label: 'Racibórz', url: '/obszar-dzialania/budowa-domow-raciborz' },
            { label: 'Jastrzębie-Zdrój', url: '/obszar-dzialania/budowa-domow-jastrzebie-zdroj' },
          ]
        },
        {
          hubName: 'JAWORZNO',
          subLabel: '',
          iconName: 'building' as const,
          description: 'Logistyka materiałowa A4/S1. Szybki start inwestycji w Katowicach, Tychach i Małopolsce.',
          cities: [
            { label: 'Jaworzno', url: '/obszar-dzialania/budowa-domow-jaworzno' },
            { label: 'Katowice', url: '/obszar-dzialania/budowa-domow-katowice' },
            { label: 'Tychy', url: '/obszar-dzialania/budowa-domow-tychy' },
            { label: 'Gliwice', url: '/obszar-dzialania/budowa-domow-gliwice' },
            { label: 'Mikołów', url: '/obszar-dzialania/budowa-domow-mikolow' },
          ]
        }
      ]
    },

    // Sekcja 8: Wezwanie do Działania
    contactCTA: {
      header: {
        label: 'SKONTAKTUJ SIĘ Z NAMI',
        title: 'Gotowy na pierwszy krok?',
        description: 'Wypełnij formularz, a odezwiemy się w ciągu 24 godzin.',
        theme: 'light' as const,
      },
      contactInfo: {
        phone: '+48 123 456 789',
        email: 'kontakt@coreltb.pl',
        address: 'ul. Budowlana 12, 30-001 Kraków',
      },
    },

    // SEO
    metaTitle: 'Kompleksowa Budowa Domów | CoreLTB Builders - Budujemy Zaufanie',
    metaDescription:
      'Zrealizujemy Twoje marzenie o własnym domu. Kompleksowa budowa od A do Z. 500+ szczęśliwych rodzin. 15 lat doświadczenia. Firma rodzinna z tradycją. Bezpłatna konsultacja.',

    createdAt: '2025-01-20T10:00:00Z',
    updatedAt: '2025-01-20T10:00:00Z',
  },

  // ============================================
  // PROJEKTOWANIE
  // ============================================
  {
    slug: 'projektowanie',
    id: 'projektowanie',
    category: 'Projektowanie',
    title: 'Projektowanie domu',

    // PageHeader
    pageHeader: {
      title: 'Projekty Domów i Adaptacje',
      watermarkText: 'PROJEKTOWANIE',
      backgroundImage: '/images/uslugi/projektowanie/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Projektowanie', href: '' },
      ],
    },

    // Sekcja 1: EmotionalHero - Od Marzenia do Projektu
    emotionalHero: {
      label: 'BIURO PROJEKTOWE & GENERALNY WYKONAWCY',
      headline: 'Projekty skrojone pod Twój budżet',
      subtitle:
        'Architekci-wizjonerzy często projektują budynki, których realizacja przekracza możliwości Inwestora. My działamy odwrotnie. Jako Generalny Wykonawca znamy ceny robocizny i materiałów na 2026 rok. Projektujemy tylko to, co da się wybudować w Twoim budżecie.',
      benefits: [
        'Projekt z gwarancją zmieszczenia się w założonym kosztorysie',
        'Adaptacja fundamentów do trudnych gruntów (gliny, skarpy, szkody)',
        'Bezpłatny Harmonogram Rzeczowo-Finansowy do kredytu',
      ],
      // CTA - Konkret techniczny
      ctaBoxTitle: 'Wstępna Analiza Inwestycji',
      ctaBoxBenefits: [
        'Weryfikacja MPZP (Co wolno wybudować?)',
        'Ocena warunków gruntowych i spadków terenu',
        'Dobór technologii do budżetu (Ceramika/Silikat/Beton)',
      ],
      ctaBoxSubtext: 'Konsultacja z Inżynierem, nie handlowcem.',
      ctaBoxButtons: [
        { text: 'Zamów analizę działki', href: 'tel:+48123456789', variant: 'primary' },
        { text: 'Wyceń projekt', href: '#kontakt', variant: 'secondary' },
      ],
    },

// Sekcja 2: DLACZEGO ZLECIC PROJEKT WYKONAWCY?
philosophyTimeline: {
  header: {
    label: 'FILOZOFIA DESIGN & BUILD',
    title: 'Nie projektujemy "do szuflady"',
    description: 'Eliminujemy ryzyko, że projekt trafi do kosza przez zbyt wysokie koszty budowy. Tworzymy dokumentację wykonawczą, a nie tylko wizualną.',
  },
  items: [
    {
      number: 1,
      iconName: 'coins', // Ikona Finansowa
      title: 'Kontrola Kosztów (Value Engineering)', 
      description: 'Zamiast "cenników z internetu", bazujemy na naszych realnych kontraktach. Optymalizujemy zużycie stali i betonu, często oszczędzając inwestorowi 15-20% na stanie surowym bez utraty jakości.',
    },
    {
      number: 2,
      iconName: 'layers', // Ikona Gruntu/Warstw
      title: 'Konstrukcja dobrana do gruntu', 
      description: 'Każda działka jest inna. Projektujemy bezpieczne fundamenty zarówno na śląskie szkody górnicze, jak i na krakowskie lessy, skarpy czy skaliste podłoża jury.',
    },
    {
      number: 3,
      iconName: 'clipboardCheck', 
      title: 'Wykonalność Techniczna',
      description: 'Unikamy rozwiązań "ładnych, ale trudnych w izolacji". Nasi inżynierowie weryfikują projekt pod kątem mostków termicznych i szczelności montażu okien.',
    },
  ],
      image: {
        src: '/images/uslugi/projektowanie/dlaczego-warto.webp',
        alt: 'Zespół projektowy CoreLTB Builders pracujący nad indywidualnym projektem domu',
      },
    },

    cooperationTimelineNoLine: {
      header: {
        label: 'PROCES PROJEKTOWY',
        title: 'Ścieżka do Pozwolenia na Budowę',
        description: 'Nie teoretyzujemy. Każdy z tych etapów służy jednemu celowi: uzyskaniu legalnego projektu, który zmieści się w Twoim budżecie wykonawczym.',
      },
      steps: [
        {
          id: 'step-1',
          number: 1,
          icon: 'fileText',
          label: 'Wybór',
          title: 'Wariant A: Adaptacja Projektu Gotowego',
          content: [
            {
              type: 'paragraph',
              value: 'To rozwiązanie budżetowe na start, ale wymagające czujności inżynierskiej. Kupując projekt "z półki", ryzykujesz, że nie będzie pasował do specyfiki gruntu w Twoim regionie.'
            },
            {
              type: 'paragraph',
              value: '**Co weryfikujemy przed adaptacją?**'
            },
            {
              type: 'list',
              items: [
                '**Przewymiarowanie konstrukcji:** Często "odchudzamy" ilość stali w fundamentach (średnio o 15-20%) lub zmieniamy drogie stropy na systemowe.',
                '**Dostosowanie do działki:** Weryfikujemy zgodność z MPZP (kąty dachu, wysokość) oraz orientację względem stron świata.',
                '**Koszty ukryte:** Wskazujemy detale (np. nietypowe okna), które drastycznie podniosą cenę budowy.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Naszym zadaniem jest zamiana "taniego projektu" w dokumentację "tanią w budowie".'
            }
          ],
          // PRZYWRÓCONY ORYGINALNY PLIK
          imageSrc: '/images/uslugi/projektowanie/etapy/projekt-gotowy.webp',
          imageAlt: 'Inżynier weryfikujący projekt katalogowy pod kątem kosztów'
        },
        {
          id: 'step-2',
          number: 2,
          icon: 'draftingCompass',
          label: 'Wybór',
          title: 'Wariant B: Projekt Indywidualny "Pod Budżet"',
          content: [
            {
              type: 'paragraph',
              value: 'Tworzymy projekt od zera pod trudną działkę (skarpę, wąski front, szkody górnicze). Projektujemy z kalkulatorem w ręku, traktując budżet jako główną wytyczną, a nie dodatek.'
            },
            {
              type: 'paragraph',
              value: '**Dlaczego warto?**'
            },
            {
              type: 'list',
              items: [
                '**Optymalizacja PUM:** Projektujemy bryłę tak, aby zminimalizować "puste metry" (korytarze), za które płacisz przy budowie.',
                '**Bilans Terenu:** Wykorzystujemy naturalne ukształtowanie spadków, aby uniknąć kosztownego wywożenia ziemi.',
                '**Standard Energetyczny:** Modelujemy budynek pod pompy ciepła i rekuperację, eliminując mostki termiczne już w geometrii ścian.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Efektem jest unikalny dom, który kosztuje tyle samo, co katalogowy, ale jest pozbawiony błędów funkcjonalnych.'
            }
          ],
          // PRZYWRÓCONY ORYGINALNY PLIK
          imageSrc: '/images/uslugi/projektowanie/etapy/projekt-indywidualny.webp',
          imageAlt: 'Projektowanie indywidualne domu na wymagającej działce'
        },
        {
          // MERGED STEP (Używamy tu zdjęcia z dawnej "Adaptacji", bo pasuje tematycznie)
          id: 'step-3',
          number: 3,
          icon: 'settings', 
          label: 'Inżynieria',
          title: 'Optymalizacja Konstrukcyjna (Value Engineering)',
          content: [
            {
              type: 'paragraph',
              value: 'To jest serce naszej pracy. Niezależnie od wariantu, nasi konstruktorzy przeliczają budynek, aby był bezpieczny i ekonomiczny. Eliminujemy ryzyka, które generują koszty na placu budowy.'
            },
            {
              type: 'paragraph',
              value: '**Zakres prac inżynieryjnych:**'
            },
            {
              type: 'list',
              items: [
                '**Fundamenty na szkody:** Dobieramy płytę fundamentową lub ławy w zależności od kategorii terenu (I-IV) i badań geologicznych (gliny).',
                '**Kolizje i Detale:** Weryfikujemy przejścia instalacyjne przez stropy i podciągi, aby uniknąć kucia betonu podczas realizacji.',
                '**Termika detalu:** Projektujemy połączenia balkonów i nadproży w standardzie "zero mostków", co jest kluczowe dla norm WT 2026.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Dzięki temu budowa przebiega płynnie, a Ty nie słyszysz od kierownika budowy: *"Tego się nie da zrobić tak jak na rysunku".*'
            }
          ],
          // PRZYWRÓCONY ORYGINALNY PLIK
          imageSrc: '/images/uslugi/projektowanie/etapy/adaptacja.webp',
          imageAlt: 'Optymalizacja konstrukcji i adaptacja do warunków gruntowych'
        },
        {
          id: 'step-4',
          number: 4,
          icon: 'piggyBank', // Tutaj miałeś 'coins', ale w pliku 'piggyBank' - przywracam piggyBank
          label: 'Wycena',
          title: 'Kosztorys Inwestorski (Gwarancja Wykonalności)',
          content: [
            {
              type: 'paragraph',
              value: 'Jako Generalny Wykonawca dajemy Ci przewagę, której nie mają zwykłe biura projektowe. Wraz z projektem otrzymujesz **szacunek realnych kosztów budowy** na rok 2026.'
            },
            {
              type: 'paragraph',
              value: '**Co zyskujesz?**'
            },
            {
              type: 'list',
              items: [
                '**Decyzyjność:** Wiesz, czy stać Cię na SSO i Deweloperkę przed wydaniem oszczędności na start robót.',
                '**Bezpieczeństwo kredytowe:** Otrzymujesz wsad merytoryczny niezbędny do rozmów z analitykiem bankowym (Harmonogram).',
                '**Weryfikacja materiałowa:** To ostatni moment na zamianę drogich rozwiązań (np. dachówka ceramiczna) na tańsze (blacha), jeśli budżet tego wymaga.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Traktujemy projekt jako integralną część budżetu, a nie "sztukę dla sztuki".'
            }
          ],
          // PRZYWRÓCONY ORYGINALNY PLIK
          imageSrc: '/images/uslugi/projektowanie/etapy/koszty.webp',
          imageAlt: 'Analiza kosztorysu i budżetu budowy domu'
        },
        {
          id: 'step-5',
          number: 5,
          icon: 'clipboardCheck', // Przywrócona Twoja ikona dokumentacji
          label: 'Finał',
          title: 'Kompletna Dokumentacja i Pozwolenie (PnB)',
          content: [
            {
              type: 'paragraph',
              value: 'Biurokrację bierzemy na siebie. Przygotowujemy dokumentację w formie wymaganej przez aktualne Prawo Budowlane (podział na PZT, PAB i PT).'
            },
            {
              type: 'paragraph',
              value: '**Twoja teczka zawiera:**'
            },
            {
              type: 'list',
              items: [
                '**PZT:** Projekt Zagospodarowania Terenu (mapa z wrysowanym budynkiem i mediami).',
                '**PAB:** Projekt Architektoniczno-Budowlany (rzuty i elewacje dla urzędu).',
                '**PT:** Projekt Techniczny (szczegóły konstrukcyjne i instalacyjne dla kierownika budowy).'
              ]
            },
            {
              type: 'paragraph',
              value: 'Jako Twój pełnomocnik składamy wniosek i monitorujemy procedurę w Starostwie, aż do uzyskania prawomocnej decyzji (PnB).'
            }
          ],
          // PRZYWRÓCONY ORYGINALNY PLIK
          imageSrc: '/images/uslugi/projektowanie/etapy/dokumentacja.webp',
          imageAlt: 'Gotowa dokumentacja projektowa z pozwoleniem na budowę'
        }
      ]

    },
    // Sekcja 4: ServicesAccordion (FAQ w formie rozwijanych sekcji)
    servicesAccordion: {
      header: {
        label: 'PYTANIA I ODPOWIEDZI',
        title: 'Kwestie Prawne i Budżetowe',
        description: 'Odpowiedzi na najczęstsze obawy inwestorów dotyczące adaptacji i projektów indywidualnych.',
      },
      services: [
        {
          iconName: 'wallet',
          title: 'Czy projekt indywidualny jest dużo droższy od gotowego?',
          content: [
            {
              type: 'paragraph',
              value: 'Na start - tak. Dokumentacja indywidualna to koszt rzędu 150-250 zł/m². Jednak patrząc na **całość inwestycji**, projekt "szyty na miarę" często wychodzi taniej. Dlaczego? Ponieważ nie budujesz "zbędnych metrów" i drogich rozwiązań konstrukcyjnych, które są zaszyte w projektach katalogowych. Bilans wychodzi na zero lub na plus przy realizacji.'
            }
          ]
        },
        {
          iconName: 'shieldCheck', // Zamiast alertTriangle - budujemy zaufanie
          title: 'Czy mogę kupić "tani projekt z internetu"?',
          content: [
            {
              type: 'paragraph',
              value: 'Możesz, ale bądź ostrożny. Tanie projekty (za 3-4 tys. zł) często mają **przewymiarowaną stal** lub błędy w detalach dachowych. Ich "taniość" kończy się w momencie zamawiania materiałów na budowę. Oferujemy usługę audytu takiego projektu przed zakupem, abyś wiedział, czy nie kupujesz "kota w worku".'
            }
          ]
        },
        {
          iconName: 'edit',
          title: 'Czy mogę wprowadzać zmiany w trakcie budowy?',
          content: [
            {
              type: 'paragraph',
              value: 'Prawo dopuszcza "nieistotne odstąpienia", ale naszym celem jest ich unikanie. Zmiany na budowie to zawsze stres i dodatkowe koszty (kucie, przeróbki). Jako Generalny Wykonawca "męczymy" projekt tak długo na etapie cyfrowym, aby na placu budowy nie trzeba było niczego zmieniać.'
            }
          ]
        },
        {
          iconName: 'mountain',
          title: 'Mam działkę ze szkodami górniczymi. Co z projektem?',
          content: [
            {
              type: 'paragraph',
              value: 'To nasza codzienność. Standardowy projekt nie przejdzie w Starostwie bez **Adaptacji Konstrukcyjnej** do kategorii szkód (I-IV). Nasz konstruktor przeliczy fundamenty (najczęściej na płytę fundamentową) i zaprojektuje niezbędne dylatacje/wieńce, zgodnie z wytycznymi GIG.'
            }
          ]
        },
        {
          iconName: 'calendar',
          title: 'Ile realnie trwa uzyskanie Pozwolenia na Budowę (PnB)?',
          content: [
            {
              type: 'paragraph',
              value: 'Przy dobrze przygotowanym wniosku (a my takie składamy) urzędy w południowej Polsce wydają decyzję w **30-60 dni**. Do tego należy doliczyć czas na mapę do celów projektowych (geodeta) i uzgodnienia mediów. Bezpiecznie jest założyć ok. 3-4 miesiące na całą "papierologię".'
            }
          ]
        },
        {
          iconName: 'trendingUp',
          title: 'Czy pomożecie, jeśli kosztorys projektu przekroczy mój budżet?',
          content: [
            {
              type: 'paragraph',
              value: '**Tak, to jest istota Design & Build.** Jeśli wycena wstępna wyjdzie za wysoka, nie zostawiamy Cię z problemem. Proponujemy zamienniki: np. tańsze okna, rezygnację z lukarny, zamianę ceramiki na gazobeton. Optymalizujemy projekt, aż "epnie" się w Excelu.'
            }
          ]
        }
      ]
    },

    // Sekcja 5: Testimonials
    testimonials: {
      header: {
        label: 'CO MÓWIĄ NASI KLIENCI',
        title: 'Opinie o naszych projektach',
        description: 'Poznaj historie klientów, którzy zaufali nam projektowanie swojego wymarzonego domu.',
        theme: 'light' as const,
      },
      testimonials: [
        {
          quote:
            'Projekt CoreLTB to była najlepsza decyzja w całym procesie budowy. Wszystko zostało przemyślane - od rozkładu pomieszczeń po detale instalacyjne. Budowa przebiegła gładko, bez żadnych niespodzianek.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              alt: 'Anna Kowalczyk',
            },
            name: 'Anna Kowalczyk',
            role: 'Właścicielka domu, Mikołów',
          },
          rating: 5.0,
        },
        {
          quote:
            'Byłem sceptyczny czy warto płacić więcej za projekt indywidualny. Teraz wiem, że to była strzał w dziesiątkę. Dom jest dokładnie taki jak chcieliśmy, a co najważniejsze - zmieściliśmy się w budżecie dzięki mądrym rozwiązaniom projektowym.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              alt: 'Piotr Nowicki',
            },
            name: 'Piotr Nowicki',
            role: 'Inwestor prywatny, Katowice',
          },
          rating: 5.0,
        },
        {
          quote:
            'Adaptacja projektu katalogowego do naszej działki na szkodach górniczych - brzmiało strasznie. Architekt CoreLTB wziął wszystko na siebie. Pozwolenie na budowę dostaliśmy w 6 tygodni.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              alt: 'Robert Lis',
            },
            name: 'Robert Lis',
            role: 'Właściciel domu, Ruda Śląska',
          },
          rating: 5.0,
        },
        {
          quote:
            'Wizualizacje 3D pozwoliły nam zobaczyć dom przed budową. Dzięki temu uniknęliśmy kilku błędów, które zauważyliśmy dopiero widząc przestrzeń w 3D. Warto!',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              alt: 'Karolina Adamska',
            },
            name: 'Karolina Adamska',
            role: 'Inwestorka, Gliwice',
          },
          rating: 4.9,
        },
        {
          quote:
            'Projekt indywidualny na wąską działkę - inne firmy mówiły że się nie da. CoreLTB zaprojektowali dom idealnie dopasowany do naszych warunków. Funkcjonalny i piękny.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              alt: 'Damian Kaczmarek',
            },
            name: 'Damian Kaczmarek',
            role: 'Właściciel domu, Tychy',
          },
          rating: 5.0,
        },
        {
          quote:
            'Cenię sobie kompleksowe podejście - projekt uwzględniał od razu instalacje, konstrukcję i koszty. Żadnych niespodzianek na budowie.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
              alt: 'Andrzej Pawlak',
            },
            name: 'Andrzej Pawlak',
            role: 'Inwestor, Jaworzno',
          },
          rating: 5.0,
        },
      ],
    },

// Sekcja 6: ContactCTA - dane kontaktowe + formularz (CTA Box przeniesiony do EmotionalHero)

contactCTA: {
  header: {
    label: 'SKONTAKTUJ SIĘ Z NAMI',
    title: 'Masz pytania? Napisz lub zadzwoń',
    description: 'Wypełnij formularz, a odezwiemy się w ciągu 24 godzin.',
  },
  contactInfo: {
    phone: '+48 123 456 789',
    email: 'kontakt@coreltb.pl',
    address: 'ul. Przykładowa 123, Warszawa',
  },
},

    // SEO
    metaTitle: 'Projekty Domów i Adaptacje | Południowa Polska',
    metaDescription:
      'Profesjonalne projektowanie domów jednorodzinnych. Projekt zintegrowany z budową i budżetem. 15 lat doświadczenia. Indywidualne projekty i adaptacje. Bezpłatna konsultacja.',

    createdAt: '2025-01-24T10:00:00Z',
    updatedAt: '2025-01-24T10:00:00Z',
  },

  // ============================================
  // 3. NADZÓR BUDOWLANY I DORADZTWO
  // ============================================
  {
    slug: 'nadzor-i-doradztwo',
    id: 'nadzor-i-doradztwo',
    category: 'Nadzór i doradztwo',
    title: 'Nadzór budowlany i doradztwo',

    // PageHeader
    pageHeader: {
      title: 'Nadzór budowlany i doradztwo',
      watermarkText: 'NADZÓR',
      backgroundImage: '/images/uslugi/nadzor-i-doradztwo/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Nadzór i doradztwo', href: '/oferta/nadzor-i-doradztwo' },
      ],
    },

    // Sekcja 1: Emotional Hero
    emotionalHero: {
      label: 'NADZÓR BUDOWLANY I DORADZTWO',
      headline: 'Twoja budowa, Twoje pieniądze, nasza ochrona',
      subtitle:
        'Aż 7 na 10 kosztownych błędów na budowie to efekt pominięcia fachowego nadzoru. Najczęstsze z nich to źle dobrany rodzaj fundamentu do warunków gruntu, zbyt płytkie posadowienie, użycie słabej jakości materiałów czy brak odpowiedniej izolacji przeciwwilgociowej. Takie błędy mogą prowadzić do pękania ścian, zawilgoceń i dużych kosztów napraw. Dlatego warto mieć zaufanego specjalistę na każdym etapie budowy.',
      benefits: [
        'Inspektor jako Twój osobisty adwokat na budowie',
        'Wykrywamy błędy zanim staną się kosztownym problemem',
        'Doświadczenie z 500+ realizacji – znamy każdą pułapkę',
      ],
      // CTA Box
      ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
      ctaBoxBenefits: [
        'Ocenimy bieżący stan Twojej budowy (jeśli trwa)',
        'Określimy zakres nadzoru dopasowany do Twoich potrzeb',
        'Wycenimy usługę nadzoru inwestorskiego',
        'Odpowiemy na wszystkie Twoje pytania i wątpliwości',
      ],
      ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca. Możemy dołączyć na każdym etapie budowy.',
      ctaBoxButtons: [
        {
          text: 'Zadzwoń do Nas',
          href: 'tel:+48123456789',
          variant: 'primary',
        },
        {
          text: 'Napisz do Nas',
          href: '#kontakt',
          variant: 'secondary',
        },
      ],
    },

    // Sekcja 2: Philosophy Timeline - CZEKA NA DANE
    philosophyTimeline: {
      header: {
        label: 'NASZA FILOZOFIA NADZORU',
        title: 'Nadzór budowlany, który jest po Twojej stronie',
        description: 'W CoreLTB Builders wierzymy, że dobry inspektor to nie tylko kontroler, ale Twój partner na każdym etapie budowy. Nasza rola nie kończy się na formalnym „odhaczaniu” kolejnych etapów i podpisywaniu protokołów. Działamy dla Ciebie — czuwając nad jakością, doradzając w trudnych decyzjach, reagując na nieścisłości i nagłe sytuacje.',
      },
      items: [
        {
          number: 1,
          iconName: 'shield',
          title: 'Pełne wsparcie i reprezentacja interesów inwestora',
          description: 'Jesteśmy z Tobą. Pilnujemy, by wykonawcy stosowali właściwe materiały, rozwiązania i nie szli na skróty. Chętnie wyjaśniamy techniczne zagadnienia i jesteśmy obecni w rozmowach z ekipą budowlaną.'
        },
        {
          number: 2,
          iconName: 'trendingUp',
          title: 'Realna kontrola kosztów',
          description: 'Dobry nadzór nie tylko chroni przed błędami, ale pozwala uniknąć niepotrzebnych wydatków. Pilnujemy budżetu i doradzamy, gdzie można zaoszczędzić bez ryzyka dla bezpieczeństwa i jakości.'
        },
        {
          number: 3,
          iconName: 'award',
          title: 'Doświadczenie poparte realizacjami',
          description: 'Znamy najczęstsze problemy i wiemy, gdzie mogą pojawić się nieoczekiwane trudności. Dzięki praktycznemu doświadczeniu szybko wykrywamy potencjalne zagrożenia – zanim staną się kosztownym problemem.'
        }
      ],
    
      image: {
        src: '/images/uslugi/nadzor-i-doradztwo/filozofia-nadzoru.webp',
        alt: 'Inspektor nadzoru CoreLTB Builders omawia plan z inwestorem na placu budowy',
      },
    },

    // Sekcja 3: Cooperation Timeline NoLine - CZEKA NA DANE (7 kroków)
    cooperationTimelineNoLine: {
      header: {
        label: 'ZAKRES NADZORU',
        title: 'Nasze usługi nadzoru',
        description: 'Poznaj kluczowe elementy profesjonalnego nadzoru budowlanego.',
      },
      steps: [
        // PLACEHOLDER - 7 kroków czeka na dane
        {
          id: 'kierownik-vs-inspektor',
          number: 1,
          icon: 'users',
          label: 'Kierownik vs inspektor',
          title: 'Kierownik budowy vs inspektor nadzoru',
          content: [
            {
              type: 'paragraph',
              value: 'To jedna z najważniejszych, a zarazem najbardziej mylących kwestii na starcie budowy. Choć obie role brzmią podobnie, ich cele są fundamentalnie różne. Zrozumienie tej różnicy to pierwszy krok do świadomego i bezpiecznego prowadzenia inwestycji.'
            },
            {
              type: 'list',
              items: [
                '**Kierownik Budowy:** Jest obowiązkowym zarządcą budowy, odpowiedzialnym za organizację i harmonogram prac. Najczęściej reprezentuje interes generalnego wykonawcy.',
                '**Inspektor Nadzoru Inwestorskiego:** Jest Twoim prywatnym ekspertem i strażnikiem na budowie. Reprezentuje **wyłącznie Ciebie** i ma za zadanie kontrolować jakość prac oraz chronić Twój budżet.'
              ]
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders oferujemy obie usługi, doskonale rozumiejąc specyfikę każdej z ról. Zapewniamy profesjonalnego Kierownika Budowy, który jest Twoim partnerem i doradcą, a także niezależnego Inspektora Nadzoru, który staje się Twoją gwarancją najwyższej jakości.'
            },
            {
              type: 'paragraph',
              value: 'Chcesz poznać wszystkie szczegóły i dowiedzieć się, które rozwiązanie jest najlepsze dla Twojej budowy? **Przeczytaj nasz szczegółowy artykuł porównawczy.**' // <<-- TUTAJ BĘDZIE LINK DO KLASTRA
            }
          ],
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/kierownik-vs-inspektor.webp',
          imageAlt: 'Kierownik Budowy vs Inspektora Nadzoru Inwestorskiego'
        },
        {
          id: 'kierownik-budowy',
          number: 2,
          icon: 'hardHat',
          label: 'Kierownik budowy',
          title: 'Usługa kierownika budowy',
          content: [
            {
              type: 'paragraph',
              value: 'Zatrudnienie Kierownika Budowy to **ustawowy obowiązek każdego inwestora**. To on formalnie prowadzi budowę, odpowiada za jej zgodność z projektem i przepisami. Niestety, rynkowa praktyka często sprowadza tę kluczową rolę do minimum. W CoreLTB Builders podchodzimy do tego zupełnie inaczej.'
            },
            {
              type: 'paragraph',
              value: 'Dla nas Kierownik Budowy to nie tylko formalność, ale **Twój najważniejszy partner i doradca techniczny na placu budowy.** Oprócz pełnienia wszystkich obowiązków wynikających z Prawa Budowlanego, nasz Kierownik zapewnia:'
            },
            {
              type: 'list',
              items: [
                '**Aktywną Obecność i Kontrolę:** Regularne wizyty na budowie w kluczowych momentach (np. przed zalaniem fundamentów, przy montażu zbrojenia), aby osobiście zweryfikować jakość prac.',
                '**Proaktywne Doradztwo Techniczne:** Nie tylko reagujemy na problemy, ale im zapobiegamy. Doradzamy w kwestii doboru materiałów i technologii, często znajdując rozwiązania, które generują realne oszczędności.',
                '**Stały Kontakt i Transparentną Komunikację:** Jesteśmy do Twojej dyspozycji. Regularnie informujemy o postępach, wyjaśniamy skomplikowane kwestie techniczne i zapewniamy pełną dokumentację fotograficzną.',
                '**Pełną Obsługę Formalną:** Bierzemy na siebie cały ciężar prowadzenia dokumentacji, w tym dziennika budowy, protokołów i przygotowania dokumentów do odbioru końcowego.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Wybierając Kierownika Budowy z CoreLTB Builders, wybierasz **spokój ducha i pewność**, że Twoja inwestycja jest w rękach zaangażowanego profesjonalisty, który dba o Twój interes.'
            }
          ],
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/kierownik-budowy.webp',
          imageAlt: 'Kierownik Budowy CoreLTB Builders omawia postępy prac z inwestorem na budowie'
        },
        {
          id: 'inspektor-nadzoru',
          number: 3,
          icon: 'users',
          label: 'Inspektor nadzoru',
          title: 'Inspektor nadzoru inwestorskiego',
          content: [
            {
              type: 'paragraph',
              value: 'Zatrudnienie Inspektora Nadzoru to **Twoja strategiczna decyzja o maksymalnym zabezpieczeniu inwestycji**. To usługa dla tych, którzy nie godzą się na żadne kompromisy i chcą mieć 100% pewności, że każdy detal ich przyszłego domu jest wykonany perfekcyjnie. Nasz Inspektor to Twój osobisty strażnik jakości na placu budowy.'
            },
            {
              type: 'paragraph',
              value: '**Kiedy szczególnie warto zainwestować w Inspektora Nadzoru?**'
            },
            {
              type: 'list',
              items: [
                '**Gdy budujesz zdalnie:** Jesteśmy Twoimi oczami i uszami na miejscu, regularnie kontrolując każdy etap.',
                '**Gdy nie masz wiedzy technicznej:** Zdejmujemy z Ciebie ciężar oceny skomplikowanych prac budowlanych.',
                '**Przy skomplikowanych projektach:** Pilnujemy, by nawet najtrudniejsze detale architektoniczne były wykonane zgodnie z projektem.',
                '**Gdy chcesz uniknąć konfrontacji:** Bierzemy na siebie wszystkie rozmowy techniczne i ewentualne spory z wykonawcą.'
              ]
            },
            {
              type: 'paragraph',
              value: '**Zakres kontroli naszego Inspektora obejmuje m.in.:**'
            },
            {
              type: 'list',
              items: [
                '**Weryfikację jakości materiałów:** Sprawdzamy, czy na budowę trafiają materiały zgodne z projektem i posiadające wymagane atesty.',
                '**Kontrolę prac zanikających:** Drobiazgowo sprawdzamy zbrojenia, izolacje fundamentów i hydroizolacje, zanim zostaną zakryte.',
                '**Odbiory kluczowych etapów:** Uczestniczymy w odbiorach stanu surowego, instalacji, tynków i posadzek, wyłapując wszelkie usterki.',
                '**Reprezentowanie Cię przed wykonawcą:** W Twoim imieniu wydajemy polecenia i egzekwujemy najwyższą jakość wykonania.'
              ]
            }
          ],
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/inspektor-nadzoru.webp',
          imageAlt: 'Inspektor Nadzoru CoreLTB Builders kontroluje zbrojenie fundamentów na budowie'
        },
        {
          id: 'odbiory-techniczne',
          number: 4,
          icon: 'clipboardCheck',
          label: 'Odbiory Techniczne',
          title: 'Odbiory Techniczne',
          content: [
            {
              type: 'paragraph',
              value: 'Odbiór techniczny to moment prawdy – finalny etap, który formalnie kończy budowę i pozwala Ci bezpiecznie zamieszkać w swoim wymarzonym domu. To także ostatnia szansa na bezkosztowe usunięcie wszelkich usterek i niedociągnięć przez wykonawcę. Przeprowadzony bez fachowej wiedzy, może stać się źródłem przyszłych problemów. Z nami, jest gwarancją Twojego spokoju.'
            },
            {
              type: 'paragraph',
              value: 'Nasz inspektor, wyposażony w profesjonalny sprzęt, przeprowadza drobiazgowy audyt techniczny, sprawdzając m.in.:'
            },
            {
              type: 'list',
              items: [
                '**Jakość tynków i wylewek:** Kontrola pionów, poziomów, kątów prostych i gładkości powierzchni.',
                '**Stolarkę okienną i drzwiową:** Sprawdzenie prawidłowości montażu, szczelności, regulacji oraz ewentualnych uszkodzeń.',
                '**Instalacje:** Weryfikacja rozmieszczenia i działania punktów elektrycznych, podejść wodno-kanalizacyjnych oraz wydajności wentylacji.',
                '**Zgodność z projektem:** Porównanie stanu faktycznego z dokumentacją projektową co do milimetra.',
                '**Elementy zewnętrzne:** Kontrola elewacji, parapetów, rynien i obróbek blacharskich.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Wynikiem naszej pracy jest **szczegółowy protokół odbioru** z listą ewentualnych usterek i terminem ich usunięcia przez wykonawcę. Dzięki temu masz pewność, że odbierasz dom wykonany **zgodnie z najwyższymi standardami sztuki budowlanej.**'
            }
          ],
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/odbiory-techniczne.webp',
          imageAlt: 'Inspektor CoreLTB Builders sprawdza piony ścian podczas odbioru technicznego domu z Porothermu'
        },
      ],
    },

    // Sekcja 4: Services Accordion (FAQ) - CZEKA NA DANE
    servicesAccordion: {
      header: {
        label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
        title: 'Odpowiedzi na Kluczowe Pytania',
        description: 'Sprawdź najważniejsze informacje, które pomogą Ci podjąć świadomą i bezpieczną decyzję. Podzieliliśmy pytania na kategorie, aby łatwiej znaleźć to, czego szukasz.',
      },
      services: [
        // PODSTAWY NADZORU
        {
          iconName: 'wallet',
          title: 'Ile kosztuje profesjonalny nadzór budowlany?',
          content: [
            {
              type: 'paragraph',
              value: 'Koszt jest zawsze indywidualny i zależy od złożoności projektu, ale kompleksowa usługa **Inspektora Nadzoru** dla domu jednorodzinnego to zazwyczaj inwestycja rzędu **1-2% wartości całej budowy**.'
            },
            {
              type: 'paragraph',
              value: 'Pojedyncza wizyta kontrolna to koszt od **300 do 500 zł**. Biorąc pod uwagę potencjalne oszczędności wynikające z eliminacji błędów, jest to jedna z najbardziej opłacalnych decyzji w całym procesie.'
            }
          ]
        },
        {
          iconName: 'users',
          title: 'Czy kierownik budowy i inspektor nadzoru to może być ta sama osoba?',
          content: [
            {
              type: 'paragraph',
              value: 'Absolutnie nie. **Polskie prawo budowlane zabrania łączenia tych dwóch funkcji** na jednej budowie. Co więcej, ich cele są często sprzeczne.'
            },
            {
              type: 'paragraph',
              value: 'Kierownik budowy dba o sprawną realizację, a Inspektor Nadzoru o **najwyższą jakość**, nawet jeśli wymaga to dodatkowego czasu. Rozdzielenie tych ról jest fundamentem prawidłowej i niezależnej kontroli na budowie.'
            }
          ]
        },
        {
          iconName: 'fileText',
          title: 'Co to jest dziennik budowy i kto za niego odpowiada?',
          content: [
            {
              type: 'paragraph',
              value: 'Dziennik budowy to **najważniejszy dokument urzędowy na placu budowy**, w którym odnotowuje się cały przebieg prac. Jest dowodem w ewentualnych sporach.'
            },
            {
              type: 'paragraph',
              value: 'Za jego prowadzenie formalnie odpowiada **Kierownik Budowy**. Nasz Inspektor Nadzoru ma prawo i obowiązek dokonywania w nim wpisów dotyczących kontroli, wykrytych usterek i zaleceń, co stanowi oficjalny ślad jego działań.'
            }
          ]
        },
    
        // PRZEBIEG WSPÓŁPRACY
        {
          iconName: 'calendar',
          title: 'Jak często inspektor powinien być na budowie?',
          content: [
            {
              type: 'paragraph',
              value: 'Częstotliwość zależy od etapu prac. Kluczowa jest obecność w momentach krytycznych i przy tzw. **pracach zanikających**, takich jak:'
            },
            {
                type: 'list',
                items: [
                    'Przed zalaniem fundamentów (kontrola zbrojenia i szalunków).',
                    'Przy montażu konstrukcji dachu.',
                    'Przed zakryciem instalacji.',
                    'Podczas odbiorów poszczególnych etapów (stan surowy, tynki).'
                ]
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders ustalamy harmonogram wizyt indywidualnie, gwarantując **kontrolę nad wszystkimi najważniejszymi etapami budowy**.'
            }
          ]
        },
        {
          iconName: 'alertTriangle',
          title: 'Co jeśli inspektor znajdzie poważny błąd?',
          content: [
            {
              type: 'paragraph',
              value: 'To jest właśnie sedno naszej pracy. W takiej sytuacji inspektor natychmiast **wstrzymuje prace i wydaje Kierownikowi Budowy polecenie usunięcia usterki**, co jest odnotowywane w dzienniku budowy.'
            },
            {
              type: 'paragraph',
              value: 'Reprezentując Twój interes, dopilnowujemy, aby wszystko zostało naprawione **zgodnie ze sztuką i na koszt wykonawcy**, chroniąc Cię przed finansowymi konsekwencjami błędu.'
            }
          ]
        },
        {
          iconName: 'fileCheck',
          title: 'Czy inspektor może pomóc mi zweryfikować umowę z wykonawcą?',
          content: [
            {
              type: 'paragraph',
              value: 'Tak. To jedna z usług doradczych, którą świadczymy. **Przed podpisaniem umowy warto ją z nami skonsultować.**'
            },
            {
              type: 'paragraph',
              value: 'Pomożemy Ci zidentyfikować potencjalne "haczyki", nieprecyzyjne zapisy i upewnić się, że Twoje interesy są w pełni zabezpieczone na papierze, jeszcze przed rozpoczęciem prac. **Dobra umowa to podstawa spokojnej budowy.**'
            }
          ]
        }
      ]
    },

    // Sekcja 5: Testimonials
    testimonials: {
      header: {
        label: 'CO MÓWIĄ NASI KLIENCI',
        title: 'Opinie o naszym nadzorze budowlanym',
        description: 'Przekonaj się, jak nadzór uratował inwestycje naszych klientów.',
        theme: 'light' as const,
      },
      testimonials: [
        {
          quote:
            'Nadzór CoreLTB wykrył poważny błąd w izolacji fundamentów, który mógł kosztować nas 50 000 zł w przyszłości. To była najlepsza decyzja w całej budowie.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              alt: 'Marek Jankowski',
            },
            name: 'Marek Jankowski',
            role: 'Inwestor prywatny, Rybnik',
          },
          rating: 5.0,
        },
        {
          quote:
            'Bez nadzoru byśmy tego nie zauważyli. Kierownik budowy z CoreLTB na bieżąco kontrolował każdy etap i trzymał wykonawcę w ryzach. Spokój ducha bezcenny.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              alt: 'Piotr Nowicki',
            },
            name: 'Piotr Nowicki',
            role: 'Właściciel domu, Katowice',
          },
          rating: 5.0,
        },
        {
          quote:
            'Odbiór mieszkania od dewelopera - inspektor z CoreLTB znalazł 47 usterek, które deweloper musiał naprawić przed przekazaniem kluczy. Sam bym połowy nie zauważył.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              alt: 'Łukasz Zawadzki',
            },
            name: 'Łukasz Zawadzki',
            role: 'Nabywca mieszkania, Gliwice',
          },
          rating: 5.0,
        },
        {
          quote:
            'Budowaliśmy systemem gospodarczym. Nadzór CoreLTB pilnował jakości prac podwykonawców i terminów. Dzięki temu uniknęliśmy przestojów i fuszerki.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              alt: 'Agnieszka Kwiatkowska',
            },
            name: 'Agnieszka Kwiatkowska',
            role: 'Inwestorka, Tychy',
          },
          rating: 4.9,
        },
        {
          quote:
            'Weryfikacja umowy z wykonawcą przed podpisaniem - inspektor wyłapał kilka niekorzystnych zapisów. Poprawki uchroniły nas przed potencjalnymi problemami.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
              alt: 'Wojciech Dąbrowski',
            },
            name: 'Wojciech Dąbrowski',
            role: 'Inwestor, Jaworzno',
          },
          rating: 5.0,
        },
        {
          quote:
            'Nadzór na budowie domu na szkodach górniczych - CoreLTB zna specyfikę regionu. Kontrolowali zbrojenie płyty fundamentowej co do centymetra.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              alt: 'Natalia Górska',
            },
            name: 'Natalia Górska',
            role: 'Właścicielka domu, Bytom',
          },
          rating: 5.0,
        },
      ],
    },

    // Sekcja 6: ContactCTA
    contactCTA: {
      header: {
        label: 'ZABEZPIECZ SWOJĄ INWESTYCJĘ',
        title: 'Każdy Dzień bez Nadzoru to Ryzyko',
        description: 'Umów bezpłatną konsultację i dowiedz się, jak chronimy Twoją budowę przed kosztownymi błędami.',
      },
      contactInfo: {
        phone: '+48 123 456 789',
        email: 'kontakt@coreltb.pl',
        address: 'ul. Przykładowa 123, Warszawa',
      },
    },

    // SEO
    metaTitle: 'Nadzór Budowlany | CoreLTB Builders - Ochrona Twojej Inwestycji',
    metaDescription:
      'Profesjonalny nadzór budowlany chroni Twoją inwestycję. 15 lat doświadczenia. Kontrola jakości, budżetu i harmonogramu. Unikaj kosztownych błędów. Bezpłatna konsultacja.',

    createdAt: '2025-10-24T10:00:00Z',
    updatedAt: '2025-10-24T10:00:00Z',
  },

  // === USŁUGI TECHNICZNE (Ekspertyzy i Pomiary) ===
  {
    slug: 'uslugi-techniczne',
    id: 'uslugi-techniczne',
    category: 'Usługi Techniczne',
    title: 'Ekspertyzy i Pomiary Budowlane',

    // PageHeader
    pageHeader: {
      title: 'Ekspertyzy i Pomiary Budowlane',
      watermarkText: 'USŁUGI TECHNICZNE',
      backgroundImage: '/images/uslugi/uslugi-techniczne/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Usługi Techniczne', href: '' },
      ],
    },

    // Sekcja 1: EmotionalHero
    emotionalHero: {
      label: 'EKSPERTYZY I POMIARY BUDOWLANE',
      headline: 'Zbuduj na Pewnym Gruncie. I na Twardych Danych',
      subtitle:
        'Fundamentem każdej udanej budowy są twarde dane, które pozwalają uniknąć najdroższych błędów – pękających ścian, przekroczonego budżetu czy problemów prawnych. W CoreLTB Builders działamy jak system wczesnego ostrzegania dla Twojej inwestycji. Dostarczamy precyzyjne pomiary, rzetelne ekspertyzy i zrozumiałe kosztorysy, które zamieniają niewiadome w pewność.',
      benefits: [
        'Precyzyjne dane, które eliminują ryzyko kosztownych błędów',
        'Jeden zespół ekspertów – od geologii po kosztorys budowlany',
        'Raporty i analizy w zrozumiałym języku, bez technicznego żargonu',
      ],
      // CTA Box
      ctaBoxTitle: '☎ Umów Konsultację Techniczną)',
      ctaBoxBenefits: [
        'Określimy, jakich badań i pomiarów potrzebuje Twoja działka',
        'Wycenimy niezbędne ekspertyzy i usługi geodezyjne',
        'Wskażemy potencjalne ryzyka techniczne i prawne',
        'Odpowiemy na wszystkie Twoje pytania i wątpliwości',
      ],
      ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
      ctaBoxButtons: [
        {
          text: 'Zadzwoń do Nas',
          href: 'tel:+48123456789',
        },
        {
          text: 'Napisz do Nas',
          href: '#kontakt',
        },
      ],
    },

    // Sekcja 2: PhilosophyTimeline
    philosophyTimeline: {
      header: {
        label: 'NASZA FILOZOFIA',
        title: 'Dane, Które Budują Pewność',
        description: 'Nie zgadujemy. Mierzymy, badamy i sprawdzamy. Bo budowa to nie miejsce na domysły.',
        theme: 'light' as const,
      },
      items: [
        {
          number: 1,
          iconName: 'search',
          title: 'Precyzyjne Badania Gruntu',
          description:
            'Każda działka skrywa tajemnice. Badania geologiczne ujawniają nośność gruntu, poziom wód gruntowych i potencjalne zagrożenia, zanim wbijesz pierwszą łopatę.',
        },
        {
          number: 2,
          iconName: 'ruler',
          title: 'Geodezja i Pomiary Wykonawcze',
          description:
            'Tyczenie budynku, inwentaryzacje powykonawcze, mapa do celów prawnych – geodeta to kluczowy gracz w każdej budowie. Bez niego możesz zbudować dom 30 cm za blisko granicy.',
        },
        {
          number: 3,
          iconName: 'fileText',
          title: 'Kosztorysy i Audyty Techniczne',
          description:
            'Ile naprawdę kosztuje Twój dom? Profesjonalny kosztorys chroni Cię przed zawyżonymi ofertami wykonawców i pozwala negocjować z pozycji wiedzy.',
        },
      ],
      image: {
        src: '/images/uslugi/uslugi-techniczne/filozofia-pomiary.webp',
        alt: 'Zespół CoreLTB podczas pomiarów geodezyjnych',
      },
    },
    
    cooperationTimelineNoLine: {
      header: {
        label: 'ZAKRES EKSPERTYZ I POMIARÓW',
        title: 'Dane, Które Gwarantują Bezpieczeństwo Twojej Inwestycji',
        description: 'Od właściwości gruntu, przez precyzyjne mapy, aż po rzetelny kosztorys – każda budowa opiera się na danych. Poniżej przedstawiamy kluczowe ekspertyzy i pomiary, które zapewnią bezpieczeństwo i pełną kontrolę nad Twoim projektem.',
      },
      steps: [
        {
          id: 'uslugi-geodezyjne',
          number: 1,
          icon: 'map',
          label: 'Geodezja',
          title: 'Usługi Geodezyjne – Wyznaczanie Granic',
          content: [
            {
              type: 'paragraph',
              value: 'Wyobraź sobie, że Twój dom został wybudowany 30 centymetrów za blisko granicy działki. Taki błąd, wynikający z braku geodezyjnej precyzji, może prowadzić do kosztownego sporu z sąsiadem, a w skrajnych przypadkach nawet do nakazu częściowej rozbiórki. Usługi geodezyjne to **prawny i techniczny fundament** całej inwestycji. To one gwarantują, że Twój dom powstanie dokładnie tam, gdzie powinien.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders traktujemy geodezję jak system nawigacji dla Twojej budowy. Dzielimy ten proces na trzy kluczowe etapy:'
            },
            {
              type: 'list',
              items: [
                '**Etap Planowania: Mapa dla Architekta.** Zanim powstanie pierwsza kreska projektu, nasz geodeta tworzy **mapę do celów projektowych**. To precyzyjne opracowanie jest fundamentem pracy architekta i niezbędnym dokumentem do uzyskania pozwolenia na budowę.',
                '**Etap Realizacji: Wytyczenie Budynku w Terenie.** Gdy masz już pozwolenie, geodeta z milimetrową precyzją przenosi projekt z papieru na Twoją działkę. **Wskazuje dokładne miejsce pod fundamenty**, dając gwarancję, że budowa ruszy we właściwym miejscu.',
                '**Etap Zakończenia: Inwentaryzacja Powykonawcza.** Po zakończeniu budowy, geodeta nanosi gotowy dom i przyłącza na oficjalne mapy. Ta **mapa powykonawcza** jest kluczowym dokumentem, wymaganym do legalnego odbioru budynku.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Koordynujemy pracę geodety na każdym z tych etapów, zapewniając płynną komunikację i pewność, że Twoja inwestycja od początku do końca stoi na **solidnym i legalnym gruncie.**'
            }
          ],
          imageSrc: '/images/uslugi/uslugi-techniczne/etapy/geodezja.webp',
          imageAlt: 'Geodeta wykonujący precyzyjne pomiary na działce budowlanej przy użyciu tachimetru'
        },
// Krok 2: Badania Geologiczne Gruntu

{
  id: 'badania-geologiczne',
  number: 2,
  icon: 'layers',
  label: 'Geologia',
  title: 'Badania Geologiczne Gruntu',
  content: [
    {
      type: 'paragraph',
      value: 'Trwałość i bezpieczeństwo Twojego domu zależą bezpośrednio od fundamentów, a ich konstrukcja – od tego, co znajduje się pod powierzchnią ziemi. **Pękające ściany, zalana piwnica czy nierówne osiadanie budynku** to najczęściej skutki niedopasowania projektu posadowienia do realnych warunków gruntowych. Profesjonalne badania geologiczne eliminują to ryzyko u samego źródła.'
    },
    {
      type: 'paragraph',
      value: 'Choć nie zawsze wymagane prawem, dla odpowiedzialnego architekta badania geologiczne są absolutną podstawą. W Naszej Firmie traktujemy je jako kluczowy element analizy ryzyka inwestycji. Nasz proces badawczy dostarcza **niezbędnych danych dla konstruktora**: '
    },
    {
      type: 'list',
      items: [
        '**Określenie rodzaju i nośności gruntu:** Pozwala to dobrać optymalny i ekonomiczny typ fundamentów (ławowe, płytowe), zapobiegając zarówno niepotrzebnym kosztom (przeprojektowanie), jak i ryzyku katastrofy budowlanej (niedoszacowanie).',
        '**Ustalenie poziomu wód gruntowych:** Ta informacja jest kluczowa dla projektu piwnicy, garażu podziemnego i doboru odpowiedniej hydroizolacji. Chroni budynek przed trwałą wilgocią i zalewaniem.',
        '**Wykrycie potencjalnych zagrożeń:** Identyfikujemy grunty nienośne (np. torfy), wysadzinowe lub inne ukryte "niespodzianki", które mogą wymagać specjalistycznych i droższych rozwiązań. Wiedza o nich przed budową oszczędza setki tysięcy złotych.'
      ]
    },
    {
      type: 'paragraph',
      value: 'Wynikiem naszych badań jest **szczegółowa opinia geotechniczna**, zawierająca konkretne zalecenia projektowe. To niewielka inwestycja, która daje bezcenną pewność, że budujesz na solidnym i bezpiecznym fundamencie.'
    }
  ],
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/geologia.webp',
  imageAlt: 'Geolog badający próbkę gruntu pobraną z odwiertu na działce budowlanej'
},
{
  id: 'kosztorysowanie-budowlane',
  number: 3,
  icon: 'wallet',
  label: 'Kosztorysowanie',
  title: 'Kosztorysowanie Budowlane',
  content: [
    {
      type: 'paragraph',
      value: 'Budżet to krwiobieg każdej budowy. Niedoszacowany prowadzi do przestojów i stresu; zawyżony – do przepalania pieniędzy. Profesjonalny kosztorys to **najważniejsze narzędzie do zarządzania finansami Twojej inwestycji**. Pozwala on nie tylko zaplanować wydatki, ale także skutecznie weryfikować i negocjować oferty wykonawców.'
    },
    {
      type: 'paragraph',
      value: 'W CoreLTB Builders specjalizujemy się w tworzeniu dwóch kluczowych rodzajów kosztorysów, które odpowiadają na inne potrzeby na różnych etapach inwestycji:'
    },
    {
      type: 'list',
      items: [
        '**Kosztorys Inwestorski (do Banku):** To dokument, którego **wymaga bank do uruchomienia kredytu hipotecznego**. Opracowujemy go na podstawie projektu budowlanego i średnich stawek rynkowych. Jego celem jest precyzyjne oszacowanie całkowitej wartości inwestycji, co jest fundamentem do uzyskania finansowania i stworzenia realistycznego budżetu.',
        '**Kosztorys Szczegółowy (Ofertowy):** To Twoja **tarcza i miecz w negocjacjach z wykonawcami**. Tworzymy go na podstawie przedmiaru robót, zawierając szczegółowy wykaz materiałów, robocizny i sprzętu. Pozwala on na dokładne porównanie ofert, wyłapanie zawyżonych cen i świadome prowadzenie rozmów handlowych.'
      ]
    },
    {
      type: 'paragraph',
      value: 'Nasz kosztorys to nie tylko liczby. To **Twoja mapa finansowa**, która daje Ci pełną kontrolę nad budżetem, chroni przed nieuczciwymi praktykami i pozwala podejmować świadome decyzje. Z nami masz pewność, że każda złotówka na Twojej budowie jest pod kontrolą.'
    }
  ],
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/kosztorysowanie.webp',
  imageAlt: 'Kosztorysant CoreLTB Builders analizujący kosztorys budowlany na komputerze w biurze'
},

{
  id: 'swiadectwa-energetyczne',
  number: 4,
  icon: 'fileBadge',
  label: 'Świadectwa Energetyczne',
  title: 'Świadectwa Charakterystyki Energetycznej',
  content: [
    {
      type: 'paragraph',
      value: 'Od 28 kwietnia 2023 roku świadectwo charakterystyki energetycznej stało się **obowiązkowym dokumentem** dla większości właścicieli nieruchomości. To "dowód osobisty" Twojego budynku, który precyzyjnie określa jego zapotrzebowanie na energię. Brak tego dokumentu w wymaganych sytuacjach grozi wysoką grzywną.'
    },
    {
      type: 'paragraph',
      value: 'W CoreLTB Builders zapewniamy profesjonalne i zgodne z najnowszymi przepisami sporządzenie certyfikatów w dwóch kluczowych sytuacjach:'
    },
    {
      type: 'list',
      items: [
        '**Dla Nowo Wybudowanych Domów:** Świadectwo jest **niezbędnym załącznikiem do zawiadomienia o zakończeniu budowy**. Bez niego nie możesz legalnie zamieszkać w swoim nowym domu. Dbamy o to, by ten ostatni, kluczowy dokument został przygotowany sprawnie i bezbłędnie.',
        '**Przy Sprzedaży lub Wynajmie Nieruchomości:** Świadectwo musi zostać przekazane nowemu nabywcy lub najemcy. Notariusz ma obowiązek odnotować ten fakt w akcie notarialnym. Zapewniamy certyfikaty, które są w pełni akceptowane przez kancelarie notarialne i urzędy.'
      ]
    },
    {
      type: 'paragraph',
      value: 'Nasze świadectwa są sporządzane wyłącznie przez **uprawnionych i wpisanych do centralnego rejestru audytorów**, co daje Ci 100% gwarancję ich poprawności i zgodności z prawem. Z nami masz pewność, że ostatni etap formalności przebiegnie gładko i bez niespodzianek.'
    }
  ],
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/swiadectwa-energetyczne.webp',
  imageAlt: 'Audytor energetyczny przekazujący świadectwo charakterystyki energetycznej właścicielowi nowego domu'
},
// Krok 5: Ekspertyzy i Doradztwo Techniczne

{
  id: 'ekspertyzy-techniczne',
  number: 5,
  icon: 'search',
  label: 'Ekspertyzy Techniczne',
  title: 'Opinie i Ekspertyzy Techniczne',
  content: [
    {
      type: 'paragraph',
      value: 'Nie każda inwestycja to budowa od zera. Często największym wyzwaniem jest ocena stanu istniejącego budynku – przed zakupem, w trakcie remontu lub gdy pojawią się niepokojące problemy, takie jak pęknięcia czy wilgoć. W takich sytuacjach potrzebna jest nie opinia, a **fachowa ekspertyza techniczna oparta na wiedzy i dowodach.**'
    },
    {
      type: 'paragraph',
      value: 'Nasi inżynierowie i rzeczoznawcy budowlani działają jak lekarze-diagności dla nieruchomości. Świadczymy usługi eksperckie w kluczowych sytuacjach:'
    },
    {
      type: 'list',
      items: [
        '**Audyt Techniczny Przed Zakupem:** Planujesz kupić dom z rynku wtórnego? Nasza szczegółowa ekspertyza to najważniejsza polisa ubezpieczeniowa. Sprawdzimy stan konstrukcji, dachu, instalacji i izolacji, dostarczając Ci raport, który pozwoli **uniknąć zakupu "skarbonki bez dna"** i skutecznie negocjować cenę.',
        '**Opinie Techniczne i Diagnoza Problemów:** Pojawiły się pęknięcia na ścianach? Czujesz wilgoć w piwnicy? Znajdziemy przyczynę problemu. Nasza opinia techniczna precyzyjnie określa źródło wady i przedstawia zalecenia naprawcze.',
        '**Wsparcie w Sporach Sądowych:** Nasze ekspertyzy to **oficjalne dokumenty o mocy dowodowej**, które mogą być kluczowym argumentem w sporach z deweloperami, wykonawcami czy w procesach o odszkodowanie.'
      ]
    },
    {
      type: 'paragraph',
      value: 'Decyzje dotyczące nieruchomości warte są setki tysięcy złotych. Nie podejmuj ich w oparciu o przypuszczenia. **Zainwestuj w wiedzę ekspercką**, która da Ci pewność, spokój i twarde argumenty.'
    }
  ],
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/ekspertyzy-techniczne.webp',
  imageAlt: 'Ekspert budowlany CoreLTB Builders badający pęknięcie na ścianie w istniejącym budynku'
}
      ]
    },
    

    // Sekcja 5: Testimonials
    testimonials: {
      header: {
        label: 'CO MÓWIĄ NASI KLIENCI',
        title: 'Opinie o naszych usługach technicznych',
        description: 'Przekonaj się, jak dokładne dane uratowały inwestycje naszych klientów.',
        theme: 'light' as const,
      },
      testimonials: [
        {
          quote:
            'Badania gruntu wykazały, że nasz grunt wymaga pali fundamentowych. Gdybyśmy tego nie wiedzieli i zbudowali dom na standardowych fundamentach, moglibyśmy mieć pęknięcia i koszty napraw rzędu 100 000 zł. CoreLTB uratowało nasze marzenie o domu.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              alt: 'Marek Nowak',
            },
            name: 'Marek Nowak',
            role: 'Inwestor prywatny, Rybnik',
          },
          rating: 5.0,
        },
        {
          quote:
            'Kosztorys wykonany przez CoreLTB pozwolił nam odkryć, że oferta jednego z wykonawców była zawyżona o 120 000 zł. Mając twarde dane, negocjowaliśmy z pozycji siły i znaleźliśmy uczciwego wykonawcę.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              alt: 'Anna Kowalczyk',
            },
            name: 'Anna Kowalczyk',
            role: 'Właścicielka domu, Katowice',
          },
          rating: 5.0,
        },
        {
          quote:
            'Geodeta z CoreLTB załatwił wszystko - mapy, wytyczenie, obsługę budowy. Jeden dostawca zamiast szukania osobno. Szybko i profesjonalnie.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              alt: 'Jan Wiśniewski',
            },
            name: 'Jan Wiśniewski',
            role: 'Inwestor, Gliwice',
          },
          rating: 5.0,
        },
        {
          quote:
            'Ekspertyza techniczna przed zakupem starego domu - CoreLTB znaleźli problemy z konstrukcją, które sprzedający ukrywał. Uniknęliśmy zakupu ruiny za 800 tys.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              alt: 'Bartosz Michalski',
            },
            name: 'Bartosz Michalski',
            role: 'Nabywca nieruchomości, Tychy',
          },
          rating: 5.0,
        },
        {
          quote:
            'Świadectwo energetyczne potrzebne do odbioru domu - audytor przyjechał następnego dnia. Szybko, sprawnie, bez stresu przed terminem.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              alt: 'Monika Zielińska',
            },
            name: 'Monika Zielińska',
            role: 'Właścicielka domu, Jaworzno',
          },
          rating: 4.9,
        },
        {
          quote:
            'Badania geotechniczne na działce na szkodach górniczych - raport jasno określił kategorię i wymagania. Konstruktor od razu wiedział jak projektować fundamenty.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
              alt: 'Grzegorz Adamczyk',
            },
            name: 'Grzegorz Adamczyk',
            role: 'Inwestor, Ruda Śląska',
          },
          rating: 5.0,
        },
      ],
    },
    // Sekcja FAQ dla filaru "Ekspertyzy i Pomiary Budowlane"

servicesAccordion: {
  header: {
    label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
    title: 'Odpowiedzi na Kluczowe Pytania Techniczne',
    description: 'Sprawdź najważniejsze informacje, które pomogą Ci podjąć świadomą i bezpieczną decyzję. Podzieliliśmy pytania na kategorie, aby łatwiej znaleźć to, czego szukasz.',
  },
  services: [
    // GEODEZJA I GEOLOGIA
    {
      iconName: 'map',
      title: 'Jaki jest cennik usług geodety?',
      content: [
        {
          type: 'paragraph',
          value: 'Koszt usług geodezyjnych zależy od specyfiki zlecenia, w tym wielkości działki, ukształtowania terenu oraz zakresu prac, takich jak mapa do celów projektowych czy wytyczenie budynku. Precyzyjna wycena wymaga analizy potrzeb konkretnej inwestycji.'
        },
        {
          type: 'paragraph',
          value: 'Zamiast sztywnego cennika, w naszej firmie rekomendujemy indywidualne oszacowanie kosztów podczas bezpłatnej konsultacji technicznej, co pozwala uniknąć niedomówień i błędów w budżecie.'
        }
      ]
    },
    {
      iconName: 'coins',
      title: 'Ile kosztuje wznowienie granic działki?',
      content: [
        {
          type: 'paragraph',
          value: 'Koszt wznowienia granic zależy od stanu dokumentacji w ośrodku geodezyjnym (ODGiK) oraz liczby punktów granicznych. Rynkowe stawki za standardową działkę zazwyczaj zaczynają się od **2000–2500 zł netto** za pierwsze cztery punkty, a każdy kolejny to wydatek rzędu 150–300 zł.'
        },
        {
          type: 'paragraph',
          value: 'Ostateczna cena jest ustalana indywidualnie po weryfikacji dostępnych materiałów archiwalnych, co pozwala precyzyjnie określić pracochłonność procedury i wyeliminować ryzyko błędów prawnych.'
        }
      ]
    },
    {
        iconName: 'users',
        title: 'Kto płaci za geodetę przy ustalaniu granic?',
        content: [
          {
            type: 'paragraph',
            value: 'Zgodnie z praktyką rynkową koszt ponosi strona zlecająca usługę, czyli najczęściej inwestor chcący precyzyjnie określić teren inwestycji. W przypadku administracyjnego rozgraniczenia spornych granic, Kodeks Cywilny (art. 152) przewiduje podział kosztów po połowie między sąsiadami.'
          },
          {
            type: 'paragraph',
            value: 'Zazwyczaj jednak, przy wznowieniu znaków granicznych, płaci wyłącznie inicjator, co pozwala szybko zabezpieczyć proces budowlany przed błędami lokalizacyjnymi.'
          }
        ]
      },
    {
      iconName: 'alertCircle',
      title: 'Czy badanie gruntu przed budową jest obowiązkowe?',
      content: [
        {
          type: 'paragraph',
          value: '**Tak, opinia geotechniczna jest obecnie obligatoryjnym dokumentem wymaganym przez prawo budowlane do uzyskania pozwolenia na budowę.** Badanie to precyzyjnie określa nośność gruntu oraz poziom wód gruntowych, co pozwala na dobranie odpowiednich fundamentów.'
        },
        {
          type: 'paragraph',
          value: 'Wykonanie odwiertów przed rozpoczęciem prac eliminuje ryzyko nierównomiernego osiadania budynku i pękania ścian, chroniąc inwestora przed kosztownymi naprawami w przyszłości.'
        }
      ]
    },
    {
      iconName: 'clock',
      title: 'Ile się czeka na badanie gruntu?',
      content: [
        {
          type: 'paragraph',
          value: 'Realizacja badań geotechnicznych to proces dwuetapowy. **Prace terenowe**, czyli wykonanie odwiertów, zajmują zazwyczaj **jeden dzień**.'
        },
        {
          type: 'paragraph',
          value: 'Kluczowy jest jednak czas na opracowanie kameralne i analizę wyników – standardowo trwa to **od 7 do 14 dni roboczych**. W CoreLTB kładziemy nacisk na ten etap, gdyż jest on niezbędny do precyzyjnego określenia nośności podłoża i poziomu wód gruntowych.'
        }
      ]
    },
    {
      iconName: 'coins',
      title: 'Ile kosztuje badanie gruntu pod budowę?',
      content: [
        {
          type: 'paragraph',
          value: 'Koszt standardowego badania geotechnicznego pod dom jednorodzinny waha się zazwyczaj w przedziale **od 1500 do 2500 zł**. Ostateczna cena zależy od liczby i głębokości odwiertów (zwykle 3-4 punkty badawcze) oraz stopnia skomplikowania warunków gruntowych.'
        },
        {
          type: 'paragraph',
          value: 'Jest to kluczowa inwestycja, która pozwala precyzyjnie dobrać fundamenty, eliminując ryzyko pękania ścian czy problemów z wodami gruntowymi.'
        }
      ]
    },

    // KOSZTORYSY
    {
      iconName: 'fileCheck',
      title: 'Kiedy wymagany jest kosztorys inwestorski?',
      content: [
        {
          type: 'paragraph',
          value: 'Kosztorys inwestorski jest **prawnie wymagany przy zamówieniach publicznych** oraz **obligatoryjny dla banków** przy ubieganiu się o kredyt budowlany i rozliczaniu transz. W inwestycjach prywatnych pełni kluczową funkcję kontrolną.'
        },
        {
          type: 'paragraph',
          value: 'W CoreLTB Builders traktujemy ten dokument jako finansowy fundament budowy – pozwala on zweryfikować rynkowość ofert wykonawców, uniknąć przepłacania i zapewnia twarde dane do negocjacji cenowych.'
        }
      ]
    },
    {
      iconName: 'wallet',
      title: 'Ile kosztuje kosztorys do banku?',
      content: [
        {
          type: 'paragraph',
          value: 'Profesjonalne przygotowanie kosztorysu pod kredyt hipoteczny to zazwyczaj wydatek rzędu **500–1500 zł netto**. Ostateczna kwota zależy od metrażu budynku, stopnia skomplikowania projektu oraz specyficznych wymagań banku.'
        },
        {
          type: 'paragraph',
          value: 'Warto zadbać o rzetelność tego dokumentu, aby uniknąć niedoszacowania budowy, co może skutkować wstrzymaniem wypłaty transz w trakcie realizacji inwestycji.'
        }
      ]
    },
    {
        iconName: 'userCheck',
        title: 'Kto przygotowuje kosztorys inwestorski?',
        content: [
          {
            type: 'paragraph',
            value: 'Kosztorys inwestorski sporządza **wykwalifikowany kosztorysant**, który łączy wiedzę o technologiach budowlanych z aktualną znajomością cen rynkowych. Opracowanie to powstaje na podstawie projektu budowlanego oraz przedmiaru robót.'
          },
          {
            type: 'paragraph',
            value: 'Dokument ten precyzyjnie określa wartość prac, stanowiąc fundament do weryfikacji ofert wykonawców. Profesjonalny kosztorys pozwala uniknąć przepłacania, gdyż różnice w ofertach firm mogą sięgać nawet 30% wartości inwestycji.'
          }
        ]
      },
  ]
},

    // Sekcja 6: ContactCTA
    contactCTA: {
      header: {
        label: 'ZBUDUJ NA PEWNYCH FUNDAMENTACH',
        title: 'Każdy Dom Zaczyna Się od Danych',
        description:
          'Umów bezpłatną konsultację i dowiedz się, jakie badania i pomiary są kluczowe dla Twojej inwestycji.',
      },
      contactInfo: {
        phone: '+48 123 456 789',
        email: 'kontakt@coreltb.pl',
        address: 'ul. Przykładowa 123, Warszawa',
      },
    },

    // SEO
    metaTitle: 'Usługi Techniczne - Ekspertyzy i Pomiary | CoreLTB Builders',
    metaDescription:
      'Profesjonalne badania gruntu, pomiary geodezyjne i kosztorysy budowlane. Chronimy Twoją inwestycję przed kosztownymi błędami. 15 lat doświadczenia. Bezpłatna konsultacja.',

    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
  },
    // === WYKOŃCZENIA I ARANŻACJE ===
  {
    slug: 'wykonczenia-i-aranzacje',
    id: 'wykonczenia-i-aranzacje',
    category: 'Wykończenia',
    title: 'Wykończenie Domu pod Klucz',

    // PageHeader
    pageHeader: {
      title: 'Wykończenie Domu pod Klucz',
      watermarkText: 'WYKOŃCZENIA',
      backgroundImage: '/images/uslugi/wykonczenia-i-aranzacje/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Wykończenie Domu pod Klucz', href: '' },
      ],
    },

    // Sekcja 1: EmotionalHero
    emotionalHero: {
      label: 'WYKOŃCZENIA I ARANŻACJE',
      headline: 'Od Pustych Ścian do Domu Pełnego Życia',
      subtitle:
        'Etap wykończeniowy to moment, w którym budynek zamienia się w prawdziwy dom – Twój dom. To ekscytujący czas, ale także logistyczne wyzwanie, pełne decyzji i potencjalnych pułapek. W CoreLTB Builders zdejmujemy z Ciebie cały ciężar. Prowadzimy Cię od pustych ścian do w pełni wykończonego, gotowego do zamieszkania wnętrza, gwarantując budżet, termin i bezkompromisową jakość.',
      benefits: [
        'Jeden partner i pełna odpowiedzialność za wszystkie etapy prac',
        'Gwarancja stałej ceny i terminu na samym starcie',
        'Dostęp do naszych sprawdzonych, wyspecjalizowanych ekip wykonawczych',
      ],
      // CTA Box
      ctaBoxTitle: '☎ Otrzymaj Wstępny Kosztorys Wykończenia',
      ctaBoxBenefits: [
        'Oszacujemy budżet potrzebny na wykończenie Twojego domu',
        'Przedstawimy harmonogram i optymalną kolejność prac',
        'Doradzimy w kwestii materiałów i najnowszych trendów',
        'Odpowiemy na wszystkie Twoje pytania i wątpliwości',
      ],
      ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
      ctaBoxButtons: [
        {
          text: 'Zadzwoń do Nas',
          href: 'tel:+48123456789',
        },
        {
          text: 'Napisz do Nas',
          href: '#kontakt',
        },
      ],
    },
// Sekcja 2: PhilosophyTimeline (Nowa Wersja)

philosophyTimeline: {
  header: {
    label: 'TWOJE SPOKOJNE WYKOŃCZENIE',
    title: 'Jeden Partner od Projektu po Ostatni Szczegół',
    description: 'Proces wykończenia domu bywa bardziej stresujący niż cała budowa. Rozumiemy to. Dlatego stworzyliśmy system, w którym jeden, w pełni odpowiedzialny partner bierze na siebie cały ciężar, zapewniając Ci spokój, kontrolę nad budżetem i bezkompromisową jakość.',
  },
  items: [
    {
      number: 1,
      iconName: 'users',
      title: 'Pełna Koordynacja, Twój Całkowity Spokój',
      description: 'Zapomnij o logistycznym koszmarze. Jeden dedykowany Project Manager z CoreLTB koordynuje pracę wszystkich naszych sprawdzonych ekip – od hydraulika po stolarza. Ty masz jeden numer telefonu, stały wgląd w postępy i zero stresu związanego z umawianiem i pilnowaniem terminów.'
    },
    {
      number: 2,
      iconName: 'fileCheck',
      title: 'Gwarancja Budżetu i Terminu na Starcie',
      description: 'Zanim zaczniemy, otrzymujesz od nas szczegółowy, wiążący kosztorys i harmonogram prac. Cena i termin, które ustalamy, są ostateczne. Koniec z finansowymi niespodziankami na ostatniej prostej. Z nami wiesz dokładnie, ile zapłacisz i kiedy wprowadzisz się do gotowego domu.'
    },
    {
      number: 3,
      iconName: 'award',
      title: 'Jakość Potwierdzona Pisemną Gwarancją',
      description: 'Pracujemy wyłącznie na naszych, wyspecjalizowanych i zaufanych zespołach wykonawczych. Każdy etap – od gładzi po montaż armatury – jest objęty naszą wieloletnią, pisemną gwarancją. Z nami masz pewność, że jakość jest bezkompromisowa i będzie służyć Ci przez lata.'
    }
  ],
  image: {
    src: '/images/uslugi/wykonczenia-i-aranzacje/dlaczego-warto.webp',
    alt: 'Wykończenie domu',
  },
},
cooperationTimelineNoLine: {
  header: {
    label: 'PROCES "POD KLUCZ"',
    title: 'Kluczowe Etapy Wykończenia',
    description: 'Ostatni etap budowy to podróż od surowych, pustych ścian do w pełni funkcjonalnego domu, w którym chcesz żyć. Poniżej przedstawiamy kluczowe etapy naszego procesu "pod klucz" – od precyzyjnego budżetu i spójnej aranżacji, aż po mistrzowską jakość wykonania. Zobacz, jak krok po kroku przekształcamy Twoją wizję w rzeczywistość.',
  },
  steps: [
    {
      id: 'kosztorys-wykonczeniowy',
      number: 1,
      icon: 'fileCheck',
      label: 'Zakres i Budżet',
      title: 'Zakres i Szczegółowy Kosztorys',
      content: [
        {
          type: 'paragraph',
          value: 'To najważniejszy etap, który stanowi fundament naszej współpracy i Twojego bezpieczeństwa finansowego. Zanim rozpoczniemy jakiekolwiek prace, spotykamy się, aby precyzyjnie zdefiniować Twoje oczekiwania i potrzeby. Nie ma tu miejsca na domysły.'
        },
        {
          type: 'paragraph',
          value: 'Na podstawie szczegółowych ustaleń dotyczących standardu materiałów i zakresu prac, przygotowujemy **transparentny i wiążący kosztorys**. Otrzymujesz od nas dokument, który zawiera m.in.:'
        },
        {
          type: 'list',
          items: [
            'Szczegółowy wykaz wszystkich prac wraz z ich wyceną.',
            'Zestawienie wybranych materiałów wykończeniowych (ilość i cena).',
            'Ostateczną, gwarantowaną cenę za całość usługi.',
            'Wiążący harmonogram, określający czas trwania poszczególnych etapów.'
          ]
        },
        {
          type: 'paragraph',
          value: 'Dzięki temu już na samym starcie masz **100% pewności co do finalnego kosztu i terminu zakończenia prac.** Koniec z finansowymi niespodziankami na ostatniej prostej.'
        }
      ],
      imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/kosztorys.webp',
      imageAlt: 'Projektant CoreLTB Builders omawiający szczegółowy kosztorys wykończenia z klientami'
    },
    // Krok 2: Projekt i Aranżacja Wnętrz
    {
      id: 'aranzacja-wnetrz',
      number: 2,
      icon: 'paintBrush',
      label: 'Aranżacja',
      title: 'Projekt i Aranżacja Wnętrz',
      content: [
        {
          type: 'paragraph',
          value: 'To etap, na którym Twoja wizja nabiera realnych kształtów, kolorów i faktur. Nasz doświadczony projektant wnętrz nie narzuca swojego stylu, lecz staje się Twoim partnerem i przewodnikiem w świecie designu. Pomagamy przekuć setki inspiracji w jeden, spójny i – co najważniejsze – **funkcjonalny projekt, idealnie dopasowany do Twojego stylu życia i budżetu.**'
        },
        {
          type: 'paragraph',
          value: 'W ramach współpracy projektowej zapewniamy:'
        },
        {
          type: 'list',
          items: [
            '**Opracowanie układu funkcjonalnego:** Tworzymy "instrukcję obsługi" dla Twojego domu – optymalizujemy układ pomieszczeń, planujemy ergonomię w kuchni i łazience oraz dbamy o wygodną komunikację.',
            '**Wspólny dobór stylu i materiałów:** Razem z Tobą tworzymy moodboardy, dobieramy kolorystykę, podłogi, płytki i wszystkie kluczowe elementy wykończenia, dbając o spójność całej koncepcji.',
            '**Fotorealistyczne wizualizacje 3D:** Nie musisz sobie niczego wyobrażać. Otrzymujesz od nas realistyczne obrazy swoich przyszłych wnętrz. To narzędzie, które pozwala Ci podejmować świadome decyzje i uniknąć kosztownych pomyłek.',
            '**Pełną dokumentację techniczną:** Przygotowujemy szczegółowe rysunki dla wykonawców – od układu płytek, przez projekt oświetlenia, aż po rozmieszczenie punktów elektrycznych i hydraulicznych.'
          ]
        },
        {
          type: 'paragraph',
          value: 'Dobry projekt wnętrza to nie tylko estetyka. To **przemyślana inżynieria przestrzeni**, która sprawia, że dom jest nie tylko piękny, ale przede wszystkim wygodny do życia.'
        }
      ],
      imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/aranzacja.webp',
      imageAlt: 'Projektantka wnętrz CoreLTB prezentuje klientom wizualizację 3D salonu na tablecie'
    },
    // Krok 3: Harmonogram i Prawidłowa Kolejność Prac
    {
      id: 'harmonogram-prac',
      number: 3,
      icon: 'calendar',
      label: 'Harmonogram',
      title: 'Harmonogram i Prawidłowa Kolejność Prac',
      content: [
        {
          type: 'paragraph',
          value: 'Chaotyczne prace wykończeniowe to prosta droga do zniszczeń, opóźnień i niepotrzebnych kosztów. W CoreLTB Builders każdą realizację opieramy na **szczegółowym harmonogramie i żelaznej zasadzie prawidłowej kolejności prac**. To nasza mapa drogowa, która gwarantuje, że proces przebiega sprawnie, logicznie i bez przykrych niespodzianek.'
        },
        {
          type: 'paragraph',
          value: 'Nasz proces jest uporządkowany zgodnie z fundamentalną regułą sztuki budowlanej – od prac "mokrych" i "brudnych" do "czystych" i finalnych:'
        },
        {
          type: 'list',
          items: [
            '**Instalacje.** Najpierw rozprowadzamy wszystkie ukryte "nerwy" domu: instalacje elektryczne, hydrauliczne, wentylacyjne i teletechniczne.',
            '**Tynki i Wylewki.** Następnie przechodzimy do prac mokrych. Wykonujemy tynki na ścianach i wylewki na podłogach. Ten etap wymaga odpowiedniego czasu na wyschnięcie.',
            '**Gładzie i Malowanie.** Po wyschnięciu, przygotowujemy idealnie gładkie powierzchnie ścian i sufitów (gładzie), a następnie wykonujemy pierwsze malowanie gruntujące i kolor.',
            '**Podłogi, Płytki i Drzwi.** Na czystych i suchych powierzchniach montujemy finalne okładziny: podłogi (panele, parkiety), płytki w łazienkach i kuchni, a na końcu montujemy drzwi wewnętrzne.',
            '**Biały Montaż i Wykończenia.** Ostatni etap to precyzyjne prace wykończeniowe: montaż gniazdek, oświetlenia, armatury łazienkowej (umywalki, toalety), a także listew przypodłogowych i innych detali.'
          ]
        },
        {
          type: 'paragraph',
          value: 'Dzięki ścisłemu przestrzeganiu tej kolejności, **minimalizujemy ryzyko uszkodzenia już wykonanych prac** i gwarantujemy najwyższą jakość finalnego efektu. Z nami wiesz nie tylko CO robimy, ale także KIEDY i DLACZEGO.'
        }
      ],
      imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/harmonogram.webp',
      imageAlt: 'Project Manager CoreLTB Builders prezentuje klientom harmonogram prac wykończeniowych na tablecie'
    },
    // Krok 4: Realizacja – Prace Wykończeniowe
    {
      id: 'realizacja-wykonczeniowa',
      number: 4,
      icon: 'hammer',
      label: 'Realizacja',
      title: 'Realizacja – Mistrzowska Jakość Wykonania',
      content: [
        {
          type: 'paragraph',
          value: 'To etap, w którym projekt zamienia się w rzeczywistość, a jakość wykonania staje się kluczowa. Sukces zależy od doświadczenia, precyzji i koordynacji. W CoreLTB Builders opieramy naszą pracę na fundamentalnej zasadzie: **każde zadanie wykonuje wyspecjalizowany w nim zespół.**'
        },
        {
          type: 'paragraph',
          value: 'Nie wierzymy w "fachowców od wszystkiego". Nasz proces realizacyjny to harmonijna współpraca wyspecjalizowanych ekip pod nadzorem jednego Project Managera:'
        },
        {
          type: 'list',
          items: [
            '**Instalatorzy:** Precyzyjnie rozprowadzają instalacje hydrauliczne i elektryczne zgodnie z projektem, gwarantując ich bezawaryjne działanie na lata.',
            '**Tynkarze i Posadzkarze:** Tworzą idealnie równe i gładkie powierzchnie ścian i podłóg, które są perfekcyjną bazą dla dalszych prac.',
            '**Malarze i Płytkarze:** Z rzemieślniczą precyzją dbają o każdy detal – od idealnie pomalowanych ścian, po równe fugi i perfekcyjne wykończenie łazienek.',
            '**Stolarze i Montażyści:** Finalizują dzieło, montując podłogi, drzwi, listwy i inne elementy z najwyższą starannością.'
          ]
        },
        {
          type: 'paragraph',
          value: 'Dzięki pracy na **własnych, sprawdzonych zespołach**, mamy pełną kontrolę nad jakością i terminowością na każdym etapie. To nasza gwarancja, że efekt końcowy będzie nie tylko piękny, ale przede wszystkim trwały i wykonany zgodnie z najwyższymi standardami sztuki budowlanej.'
        }
      ],
      imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/realizacja.webp',
      imageAlt: 'Ekipa wykończeniowa CoreLTB Builders podczas prac montażowych'
    }
  ]
},

    // Sekcja 5: ServicesAccordion (FAQ)
    servicesAccordion: {
      header: {
        label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
        title: 'Wykończenie pod Klucz - Odpowiedzi na Kluczowe Pytania',
        description: 'Znajdź odpowiedzi na najważniejsze pytania dotyczące kosztów, terminów i zakresu prac wykończeniowych.',
      },
      services: [
        {
          iconName: 'wallet',
          title: 'Ile kosztuje wykończenie domu pod klucz?',
          content: [
            {
              type: 'paragraph',
              value: 'Koszt wykończenia domu pod klucz zależy od wybranego standardu materiałów oraz zakresu prac, dlatego nie istnieje jedna uniwersalna stawka. Ostateczna cena jest ustalana indywidualnie podczas bezpłatnej konsultacji, co pozwala na przygotowanie szczegółowego i wiążącego kosztorysu.'
            },
            {
              type: 'paragraph',
              value: 'Taki model współpracy **gwarantuje stałość ceny oraz terminu na piśmie**, eliminując ryzyko nieprzewidzianych wydatków i zapewniając pełną kontrolę nad budżetem od samego początku inwestycji.'
            }
          ]
        },
        {
          iconName: 'coins',
          title: 'Jaki jest koszt wykończenia domu 100m²?',
          content: [
            {
              type: 'paragraph',
              value: 'Całkowity koszt wykończenia domu o powierzchni 100m² zależy od wybranego standardu materiałów i zakresu prac, zazwyczaj mieszcząc się w rynkowym przedziale **2500–4500 zł za m²**. Oznacza to orientacyjny budżet rzędu **250–450 tys. zł**.'
            },
            {
              type: 'paragraph',
              value: 'Precyzyjna, wiążąca kwota ustalana jest jednak indywidualnie na podstawie szczegółowego kosztorysu. Takie podejście pozwala zagwarantować stałą cenę przed rozpoczęciem robót i uniknąć nieprzewidzianych wydatków w trakcie realizacji.'
            }
          ]
        },
        {
          iconName: 'home',
          title: 'Jaki jest stan wykończenia pod klucz?',
          content: [
            {
              type: 'paragraph',
              value: 'Stan pod klucz to doprowadzenie nieruchomości do momentu **pełnej gotowości do zamieszkania**. Zakres obejmuje wszystkie niezbędne prace wykończeniowe: od wykonania gładzi i malowania, przez ułożenie podłóg i montaż drzwi, aż po kompletne wyposażenie łazienek wraz z armaturą.'
            },
            {
              type: 'paragraph',
              value: 'Decydując się na ten standard w naszej firmie, zyskujesz pewność koordynacji – inwestor otrzymuje w **100% funkcjonalne wnętrze**, a my bierzemy na siebie pełną logistykę, nadzór nad ekipami i dostawami materiałów.'
            }
          ]
        },
        {
          iconName: 'clipboard',
          title: 'Co wchodzi w prace wykończeniowe?',
          content: [
            {
              type: 'paragraph',
              value: 'Prace wykończeniowe to kompleksowy proces przekształcenia surowego budynku w funkcjonalny dom. Obejmują one pełen zakres działań:'
            },
            {
              type: 'list',
              items: [
                '**Prace instalacyjne** – hydraulika, elektryka, wentylacja',
                '**Wykończenie powierzchni** – gładzie, malowanie, układanie płytek i podłóg',
                '**Montaż końcowy** – armatura, drzwi, zabudowa stolarska'
              ]
            },
            {
              type: 'paragraph',
              value: 'W modelu „pod klucz" kluczowym elementem jest także **pełna koordynacja logistyczna** ekip i dostaw materiałów, zapewniająca realizację zgodnie z ustalonym budżetem i harmonogramem.'
            }
          ]
        },
        {
          iconName: 'clock',
          title: 'Ile trwa wykończenie domu od stanu deweloperskiego?',
          content: [
            {
              type: 'paragraph',
              value: 'Standardowy czas kompleksowego wykończenia domu wynosi zazwyczaj **od 3 do 6 miesięcy**, w zależności od metrażu i skomplikowania aranżacji. Czas ten obejmuje etap projektowy, kompletację materiałów oraz właściwe prace wykonawcze.'
            },
            {
              type: 'paragraph',
              value: 'U Nas w modelu współpracy "pod klucz" szczegółowy harmonogram jest ustalany na początku, co pozwala na precyzyjne określenie daty odbioru i zapewnia **pisemną gwarancję dotrzymania terminu**.'
            }
          ]
        },
        {
          iconName: 'checkCircle',
          title: 'Czy wykończenie pod klucz się opłaca?',
          content: [
            {
              type: 'paragraph',
              value: 'Wykończenie pod klucz **opłaca się przede wszystkim dla osób ceniących swój czas i spokój**. Eliminuje konieczność samodzielnego szukania i koordynowania wielu ekip, negocjowania cen materiałów oraz ciągłego kontrolowania postępu prac.'
            },
            {
              type: 'paragraph',
              value: 'Dodatkową wartością jest **gwarancja stałej ceny i terminu** – wiesz dokładnie, ile zapłacisz i kiedy wprowadzisz się do gotowego domu. Skontaktuj się z nami, aby uzyskać szczegółową wycenę dla Twojej inwestycji.'
            }
          ]
        },
        {
          iconName: 'fileCheck',
          title: 'Jaka jest kolejność prac wykończeniowych?',
          content: [
            {
              type: 'paragraph',
              value: 'Proces wykończenia pod klucz obejmuje **4 główne etapy** realizowane w ściśle określonej kolejności:'
            },
            {
              type: 'list',
              items: [
                '**Etap 1:** Weryfikacja budżetu i przygotowanie projektu aranżacji',
                '**Etap 2:** Przeróbki instalacyjne i prace mokre (tynki, wylewki)',
                '**Etap 3:** Wykończenie ścian, podłóg i montaż stolarki',
                '**Etap 4:** Montaż armatury, oświetlenia i mebli na wymiar'
              ]
            },
            {
              type: 'paragraph',
              value: 'Zachowanie tej sekwencji eliminuje błędy logistyczne i pozwala na dotrzymanie stałego terminu zakończenia inwestycji.'
            }
          ]
        },
        {
          iconName: 'trendingUp',
          title: 'Co jest najdroższe w wykończeniu domu?',
          content: [
            {
              type: 'paragraph',
              value: 'Najdroższym elementem wykończenia są zazwyczaj **łazienki oraz kuchnia**. Ze względu na kosztowne materiały (płytki, armatura), sprzęt AGD i zabudowę meblową na wymiar, pomieszczenia te mogą pochłonąć nawet **40-50% całego budżetu**.'
            },
            {
              type: 'paragraph',
              value: 'Znaczącą pozycją jest także profesjonalna robocizna, stanowiąca często około **30-40% kosztów całkowitych**. Ostateczna cena zależy jednak zawsze od wybranego standardu materiałów oraz stopnia skomplikowania projektu aranżacji.'
            }
          ]
        },
        {
          iconName: 'coins',
          title: 'Jak obliczyć koszt wykończenia domu?',
          content: [
            {
              type: 'paragraph',
              value: 'Dokładne obliczenie kosztu wymaga sporządzenia **szczegółowego kosztorysu** opartego na projekcie wnętrz i specyfikacji materiałowej. Szacunkowo przyjmuje się stawki za metr kwadratowy powierzchni podłogi:'
            },
            {
              type: 'list',
              items: [
                '**Standard ekonomiczny:** od około 1500 zł/m²',
                '**Standard średni:** 2500–3500 zł/m²',
                '**Standard premium:** ponad 3500 zł/m²'
              ]
            },
            {
              type: 'paragraph',
              value: 'Ostateczna kwota zależy od klasy materiałów oraz zakresu prac, dlatego **najbezpieczniejszym rozwiązaniem jest uzyskanie wiążącej wyceny** od wykonawcy przed rozpoczęciem realizacji.'
            }
          ]
        },
        {
          iconName: 'piggyBank',
          title: 'Czy 300 tys. wystarczy na wykończenie domu?',
          content: [
            {
              type: 'paragraph',
              value: 'Tak, **300 tys. zł to realny budżet**, pod warunkiem dopasowania metrażu do standardu. Obecnie średni koszt kompleksowego wykończenia waha się w granicach **2500–3500 zł za m²**.'
            },
            {
              type: 'paragraph',
              value: 'Dla domu o powierzchni **100–120 m²** taka kwota pozwala na wysoki standard, natomiast przy większych powierzchniach może wymagać kompromisów materiałowych. Ostateczna wycena zawsze wymaga szczegółowego kosztorysu uwzględniającego zakres prac i wybrane materiały.'
            }
          ]
        }
      ]
    },

    // Sekcja 6: Testimonials
    testimonials: {
      header: {
        label: 'CO MÓWIĄ NASI KLIENCI',
        title: 'Spokój i Zaufanie na Ostatniej Prostej',
        description: 'Poznaj historie inwestorów, którzy powierzyli nam wykończenie swoich domów i przekonali się, że ten etap może przebiegać sprawnie, terminowo i bezstresowo.',
        theme: 'light' as const,
      },
      testimonials: [
        {
          quote: 'Byliśmy przerażeni wizją koordynacji kilkunastu fachowców. CoreLTB wzięło wszystko na siebie. Jeden Project Manager, stały kontakt i wszystko zapięte na ostatni guzik. Dla nas, osób pracujących na pełen etat, ten spokój był bezcenny.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
              alt: 'Tomasz Kowalski',
            },
            name: 'Anna i Tomasz Kowalscy',
            role: 'Właściciele domu, Katowice',
          },
          rating: 5.0,
        },
        {
          quote: 'Największym plusem była transparentność i trzymanie się budżetu. Kosztorys, który otrzymałem na początku, zgadzał się co do złotówki z fakturą końcową. W dzisiejszych czasach to rzadkość.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
              alt: 'Piotr Nowak',
            },
            name: 'Piotr Nowak',
            role: 'Inwestor, Rybnik',
          },
          rating: 5.0,
        },
        {
          quote: 'Jestem estetką i zwracam uwagę na detale. Ekipa CoreLTB wykazała się niesamowitą precyzją – idealnie równe gładzie, perfekcyjnie położone płytki. Jakość wykonania przerosła moje oczekiwania.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
              alt: 'Katarzyna Wiśniewska',
            },
            name: 'Katarzyna Wiśniewska',
            role: 'Właścicielka domu, Gliwice',
          },
          rating: 5.0,
        },
        {
          quote: 'Budowałem dom, mieszkając 300 km dalej. Otrzymywałem cotygodniowe raporty ze zdjęciami i mogłem spokojnie pracować, wiedząc że wszystko idzie zgodnie z planem.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
              alt: 'Marek Zieliński',
            },
            name: 'Marek Zieliński',
            role: 'Inwestor budujący zdalnie, Tychy',
          },
          rating: 5.0,
        },
        {
          quote: 'Łazienka i kuchnia wyglądają jak z magazynu wnętrzarskiego. Dobór płytek, oświetlenie, każdy detal przemyślany. CoreLTB ma świetnych fachowców od wykończeń.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
              alt: 'Sylwia Majewska',
            },
            name: 'Sylwia Majewska',
            role: 'Właścicielka domu, Jaworzno',
          },
          rating: 5.0,
        },
        {
          quote: 'Po stanie deweloperskim zostaliśmy z gołymi ścianami. CoreLTB w 3 miesiące zrobili wszystko - od gładzi po meble kuchenne. Wprowadziliśmy się zgodnie z planem.',
          author: {
            image: {
              src: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100',
              alt: 'Rafał Grabowski',
            },
            name: 'Rafał Grabowski',
            role: 'Właściciel domu, Mikołów',
          },
          rating: 4.9,
        },
      ],
    },

    // Sekcja 6: ContactCTA (WYMAGANE - TODO: dostosuj treść)
    contactCTA: {
      header: {
        label: 'ZACZNIJMY TWORZYĆ TWOJE WNĘTRZE',
        title: 'Gotowy na Wykończenie Marzeń?',
        description: 'Umów się na bezpłatną konsultację, a my przygotujemy dla Ciebie wstępny kosztorys i harmonogram prac wykończeniowych dla Twojego domu.',
      },
      contactInfo: {
        phone: '+48 123 456 789',
        email: 'kontakt@coreltb.pl',
        address: 'ul. Przykładowa 123, Warszawa',
      },
    },

    // SEO
    metaTitle: 'Wykończenie Domu pod Klucz - Kompleksowe Wykończenia | CoreLTB Builders',
    metaDescription:
      'Kompleksowe wykończenie domu od A do Z. Gwarancja stałej ceny i terminu. Sprawdzone ekipy wykonawcze. Bezpłatna konsultacja i wycena wykończenia.',

    createdAt: '2025-12-05T10:00:00Z',
    updatedAt: '2025-12-05T10:00:00Z',
  },

  // ========================================
  // USŁUGA 4: ZAGOSPODAROWANIE TERENU
  // ========================================
  {
    slug: 'zagospodarowanie-terenu',
    id: 'zagospodarowanie-terenu',
    category: 'Prace Zewnętrzne',
    title: 'Zagospodarowanie Terenu',

    // Sekcja 1: PageHeader (TODO: uzupełnij dane)
    pageHeader: {
      title: 'Zagospodarowanie Terenu',
      watermarkText: 'TEREN',
      backgroundImage: '/images/uslugi/zagospodarowanie-terenu/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Zagospodarowanie Terenu', href: '' },
      ],
    },

    // Sekcja 2: EmotionalHero
    emotionalHero: {
      label: 'ZAGOSPODAROWANIE TERENU',
      headline: 'Twój Dom Nie Kończy Się Na Drzwiach Wejściowych',
      subtitle:
        'Masz już wymarzony dom, ale wokół wciąż panuje budowlany chaos? W CoreLTB Builders zamieniamy błoto i wykopy w funkcjonalną przestrzeń. Zagospodarowanie terenu to dla nas inżynieria spotykająca estetykę. Od niwelacji i odwodnienia, przez solidne podjazdy, aż po taras – tworzymy spójne otoczenie, które podnosi wartość Twojej inwestycji i daje Ci upragniony odpoczynek.',
      benefits: [
        'Pełna obsługa: prace ziemne, brukarstwo, ogrodzenia i tarasy',
        'Prawidłowe odwodnienie terenu chroniące fundamenty',
        'Projekt wykonawczy spójny ze stylem Twojego domu',
      ],
      ctaBoxTitle: '☎ Zamów Bezpłatną Wizję Lokalną i Wycenę',
      ctaBoxBenefits: [
        'Ocenimy zakres niezbędnych prac ziemnych i niwelacyjnych',
        'Zaproponujemy funkcjonalny układ podjazdów i ścieżek',
        'Doradzimy w kwestii ogrodzenia, tarasu i systemów odwodnienia',
        'Otrzymasz kosztorys bez ukrytych opłat dodatkowych',
      ],
      ctaBoxSubtext: 'Dojeżdżamy do klienta. Rozmowa do niczego nie zobowiązuje.',
      ctaBoxButtons: [
        { text: 'Zadzwoń do Nas', href: 'tel:+48123456789', variant: 'primary' as const },
        { text: 'Napisz do Nas', href: '#kontakt', variant: 'secondary' as const },
      ],
    },

    // Sekcja 3: PhilosophyTimeline
    philosophyTimeline: {
      header: {
        label: 'JAKOŚĆ I TECHNOLOGIA',
        title: 'Fundament, Którego Nie Widać, a Czuć Latami',
        description:
          'Efektowny podjazd to tylko wierzchołek góry lodowej. Prawdziwa jakość kryje się pod ziemią. W CoreLTB Builders wyznajemy zasadę: najpierw inżynieria i hydrogeologia, potem estetyka. Dzięki temu Twoje otoczenie jest nie tylko piękną wizytówką domu, ale trwałym systemem odpornym na wodę, mróz i obciążenia.',

      },
      items: [
        {
          number: 1,
          iconName: 'ruler' as const,
          title: 'Prace Ziemne i Stabilizacja Gruntu',
          description:
            'Zanim położymy pierwszą kostkę, wykonujemy tytaniczną pracę pod powierzchnią. Analizujemy nośność gruntu, wykonujemy niwelację i dbamy o perfekcyjne odwodnienie. Dzięki solidnej podbudowie i zachowaniu spadków, masz 100% pewności, że nawierzchnia nie zapadnie się, a woda opadowa nie zagrozi fundamentom.',
        },
        {
          number: 2,
          iconName: 'layoutGrid' as const,
          title: 'Funkcjonalność Przestrzeni na Pierwszym Miejscu',
          description:
            'Projektujemy przestrzeń do życia, nie na wystawę. Optymalizujemy szerokość podjazdów dla Twoich aut, planujemy wygodne ciągi piesze i logicznie rozmieszczamy strefy relaksu. Dbamy o to, by układ ścieżek był intuicyjny, a taras zapewniał intymność. Wszystko to dla Twojej wygody.',
        },
        {
          number: 3,
          iconName: 'checkCircle' as const,
          title: 'Jeden Partner od Kostki Brukowej po Trawnik',
          description:
            'Bierzemy na siebie cały, złożony proces. Od "twardych" prac inżynieryjnych – brukarstwa, ogrodzeń, odwodnienia – aż po "miękkie" wykończenie w postaci niwelacji terenu i założenia trawnika. Jeden partner to jedna odpowiedzialność i gwarancja spójnego, perfekcyjnego efektu końcowego.',
        },
      ],
      image: {
        src: '/images/uslugi/zagospodarowanie-terenu/filozofia.webp',
        alt: 'Ekspert CoreLTB Builders omawia z klientami plan zagospodarowania ich działki na tablecie',
      },
    },

    // Sekcja 4: CooperationTimelineNoLine (6 kroków)
    cooperationTimelineNoLine: {
      header: {
        label: 'ETAPY PRAC',
        title: 'Od Projektu do Efektu: Twój Teren w Rękach Prefesionalistów',
        description:
          'Przejrzysty harmonogram to podstawa spokoju inwestora. Zobacz, jak zamieniamy surowy plac budowy w uporządkowaną przestrzeń. Nie improwizujemy – stosujemy sprawdzone procedury budowlane, dzięki którym każdy metr kwadratowy Twojej działki zyskuje na funkcjonalności i wartości.',
      },
      steps: [
        {
          id: 'brukarstwo',
          number: 1,
          icon: 'layoutGrid' as const,
          label: 'Brukarstwo',
          title: 'Podjazdy, Ścieżki i Tarasy',
          content: [
            {
              type: 'paragraph',
              value:
                'Podjazd to wizytówka Twojego domu, a taras to jego serce w letnie dni. Kluczem do ich trwałości nie jest jednak sama kostka, a to, co niewidoczne pod nią. W CoreLTB Builders podchodzimy do brukarstwa jak inżynierowie – naszym priorytetem jest stworzenie solidnej i stabilnej podstawy, która zapobiegnie zapadaniu się nawierzchni przez dekady.',
            },
            {
              type: 'paragraph',
              value: 'Stawiamy na technologię warstwową i sprawdzone materiały:',
            },
            {
              type: 'list',
              items: [
                '**Głębokie Korytowanie i Podbudowa:** Nie oszczędzamy na gruncie. Wykonujemy wykop na odpowiednią głębokość i stosujemy wielowarstwową podbudowę z certyfikowanych kruszyw łamanych, mechanicznie zagęszczanych.',
                '**Odwodnienie i Spadki:** Laserowo wyznaczamy niwelację terenu. Projektujemy spadki i montujemy odwodnienia liniowe tak, by woda błyskawicznie znikała z nawierzchni, chroniąc ją przed erozją mrozową.',
                '**Precyzja Układania i Cięcia:** Niezależnie czy wybierasz kostkę betonową, granit, czy wielkoformatowe płyty gresowe – dbamy o idealną geometrię spoin i estetykę docięć przy krawężnikach.',
                '**Stabilizacja i Fugowanie:** Całość "zamykamy" profesjonalnym wibrowaniem i spoinowaniem (piaskiem lub fugą żywiczną), co blokuje przesuwanie się elementów i ogranicza wyrastanie chwastów.',
              ],
            },
          ],
          imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/brukarstwo.webp',
          imageAlt: 'Zespół CoreLTB Builders profesjonalnie układa kostkę brukową na podjeździe',
        },
        {
          id: 'ogrodzenia',
          number: 2,
          icon: 'gate' as const,
          label: 'Ogrodzenia i Bramy',
          title: 'Ogrodzenia i Bramy',
          content: [
            {
              type: 'paragraph',
              value:
                'Ogrodzenie to nie tylko wyznaczenie granic działki – to "rama" dla Twojej architektury i pierwsza linia bezpieczeństwa. Wielu inwestorów martwi się pękającymi murkami czy rdzewiejącymi przęsłami po kilku zimach. W CoreLTB Builders eliminujemy te ryzyka na starcie. Nasze ogrodzenia to konstrukcje inżynierskie: stabilne, zbrojone i idealnie skomponowane z elewacją budynku.',
            },
            {
              type: 'paragraph',
              value: 'Stawiamy na trwałość i kompleksową obsługę inwestycji:',
            },
            {
              type: 'list',
              items: [
                '**Fundamenty Poniżej Strefy Przemarzania:** To klucz do trwałości. Wykonujemy głębokie, zbrojone ławy fundamentowe z dylatacjami, dzięki czemu mróz nie wysadza konstrukcji, a murki nie pękają.',
                '**Systemy Modułowe i Nowoczesne Przęsła:** Specjalizujemy się w montażu gładkich bloków modułowych, ogrodzeń palisadowych i żaluzjowych. Dbamy o to, by stal była ocynkowana i malowana proszkowo, co gwarantuje spokój od korozji na lata.',
                '**Bramy i Automatyka (Smart Home):** Montujemy bramy przesuwne i skrzydłowe. Co ważne – przewody pod domofon, oświetlenie i napędy rozprowadzamy na etapie prac ziemnych, więc nie musisz zrywać kostki, by podłączyć wideodomofon.',
              ],
            },
            {
              type: 'paragraph',
              value:
                'Wybierając nas, zyskujesz spójność: podjazd i ogrodzenie powstają w jednej linii stylistycznej i technicznej, bez konfliktów między różnymi ekipami.',
            },
          ],
          imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/ogrodzenia.webp',
          imageAlt: 'Zespół CoreLTB Builders profesjonalnie montujący nowoczesne ogrodzenie panelowe',
        },
        {
          id: 'odwodnienie',
          number: 3,
          icon: 'umbrella' as const,
          label: 'Gospodarka Wodna',
          title: 'Ochrona Fundamentów i Suchy Teren',
          content: [
            {
              type: 'paragraph',
              value:
                'Woda to cichy zabójca budynków i nawierzchni. Ignorowanie gospodarki wodnej kończy się zawilgoconymi ścianami, zapadającą się kostką i błotem zamiast trawnika. W CoreLTB Builders podchodzimy do tematu hydrotechnicznie. Zanim położymy nawierzchnię, projektujemy system, który skutecznie zarządza każdą kroplą deszczu, chroniąc Twój majątek.',
            },
            {
              type: 'paragraph',
              value: 'Stosujemy nowoczesne rozwiązania melioracyjne i retencyjne:',
            },
            {
              type: 'list',
              items: [
                '**Zagospodarowanie Wody z Dachu (Retencja):** Nie pozwalamy wodzie marnować się ani niszczyć elewacji. Odprowadzamy deszczówkę do studni chłonnych, skrzynek rozsączających lub podziemnych zbiorników retencyjnych. Zyskujesz darmową wodę do ogrodu i suchy teren wokół domu.',
                '**Drenaż Opaskowy Budynku:** To "polisa ubezpieczeniowa" dla Twoich murów. Jeśli warunki gruntowe tego wymagają, instalujemy system rur drenarskich wokół ław fundamentowych, który obniża poziom wód gruntowych i zapobiega podciąganiu wilgoci kapilarnej.',
                '**Odwodnienia Liniowe i Punktowe:** Na podjazdach montujemy korytka o odpowiedniej klasie obciążenia (odporne na najazd aut). Zapobiegają one tworzeniu się niebezpiecznych lodowisk zimą i wypłukiwaniu fug, co jest częstą przyczyną degradacji nawierzchni.',
              ],
            },
            {
              type: 'paragraph',
              value:
                'Dobrze zaprojektowane odwodnienie jest niewidoczne dla oka, ale kluczowe dla trwałości inwestycji. Z nami masz pewność, że nawet podczas oberwania chmury, Twój garaż i piwnica pozostaną suche.',
            },
          ],
          imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/odwodnienie.webp',
          imageAlt: 'Pracownik CoreLTB Builders układa rurę drenażową w wykopie wokół fundamentów',
        },
        {
          id: 'niwelacja-terenu',
          number: 4,
          icon: 'areaChart' as const,
          label: 'Niwelacja Terenu',
          title: 'Kształtowanie Terenu i Przygotowanie Pod Ogród',
          content: [
            {
              type: 'paragraph',
              value:
                'Po zakończeniu budowy działka często przypomina pobojowisko pełne gliny i ukrytego gruzu. W CoreLTB Builders nie tylko wyrównujemy powierzchnię – my przywracamy jej biologiczną użyteczność. Niwelacja to dla nas proces inżynieryjny: modelujemy teren tak, aby był bezpieczny dla budynku (odpływ wody) i gotowy na przyjęcie roślinności.',
            },
            {
              type: 'paragraph',
              value: 'Działamy kompleksowo, używając ciężkiego sprzętu i precyzyjnej optyki:',
            },
            {
              type: 'list',
              items: [
                '**Niwelacja Laserowa i Spadki:** "Na oko" to za mało. Używamy niwelatorów laserowych, aby z milimetrową precyzją ukształtować teren. Tworzymy mikrospadki, które w niewidoczny sposób odprowadzają wodę opadową z dala od elewacji i tarasu, zapobiegając tworzeniu się kałuż.',
                '**Oczyszczanie i Profilowanie:** Usuwamy pozostałości budowlane i wymieniamy grunt tam, gdzie jest to konieczne. Modelujemy skarpy, nasypy czy wypłaszczenia, tworząc solidną bazę pod przyszłą architekturę ogrodową.',
                '**Humusowanie (Warstwa Wegetacyjna):** Na odpowiednio ukształtowane podłoże rozścielamy warstwę żyznej ziemi (czarnoziem/humus). To kluczowy etap – bez niego nawet najdroższy trawnik z rolki nie przetrwa. My tworzymy idealne środowisko dla korzeni.',
              ],
            },
            {
              type: 'paragraph',
              value:
                'Efekt? Idealnie równy teren (jak stół), przygotowany pod siew trawy lub nasadzenia, który jest łatwy w koszeniu i nie sprawia problemów z zastoinami wodnymi po ulewach.',
            },
          ],
          imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/niwelacja.webp',
          imageAlt: 'Spychacz CoreLTB Builders równa teren po zakończeniu budowy domu',
        },
        {
          id: 'trawniki-i-nawadnianie',
          number: 5,
          icon: 'leaf' as const,
          label: 'Trawnik i Nawadnianie',
          title: 'Inteligentny Ogród i Perfekcyjna Murawa',
          content: [
            {
              type: 'paragraph',
              value:
                'Piękny trawnik to w 30% natura, a w 70% inżynieria i woda. Ręczne podlewanie jest nieefektywne i czasochłonne. W CoreLTB Builders wdrażamy rozwiązania "Smart Garden". Tworzymy systemy, które same dbają o kondycję roślin, a Tobie oddają cenne godziny wolnego czasu. Instalujemy technologię pod ziemią, by na powierzchni cieszyć oko idealną zielenią.',
            },
            {
              type: 'paragraph',
              value: 'Nasze podejście łączy wygodę z biologią roślin:',
            },
            {
              type: 'list',
              items: [
                '**Automatyczne Systemy Nawadniania:** Projektujemy sekcje zraszaczy i linii kroplujących dopasowane do nasadzeń. Stosujemy sterowniki i czujniki deszczu. System podlewa ogród wczesnym rankiem – to optymalna pora, która ogranicza parowanie, ale pozwala trawie obeschnąć przed upałem, co zapobiega rozwojowi grzybów.',
                '**Trawnik z Rolki lub Siewu + Siatka na Krety:** Oferujemy natychmiastowy efekt "zielonego dywanu" (rolka) lub tańsze rozwiązanie z siewu. Co kluczowe – pod trawnikiem montujemy mocną siatkę przeciw kretom, co jest standardem chroniącym Twoją inwestycję przed zniszczeniem.',
                '**Logiczna Kolejność Prac:** Najpierw rury i kable, potem siatka i ziemia, na końcu trawa. Wykonując to kompleksowo u jednego wykonawcy, masz pewność, że system nawadniania nie zostanie uszkodzony podczas prac ziemnych, a trawa przyjmie się idealnie.',
              ],
            },
            {
              type: 'paragraph',
              value:
                'Inwestycja w automatyczne nawadnianie zwraca się nie tylko w niższych rachunkach za wodę (precyzyjne dawkowanie), ale przede wszystkim w Twoim świętym spokoju. Zapomnij o bieganiu z wężem ogrodowym.',
            },
          ],
          imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/trawniki-nawadnianie.webp',
          imageAlt: 'Pracownik CoreLTB Builders układa trawę z rolki na przygotowanym terenie',
        },
        {
          id: 'oswietlenie-ogrodowe',
          number: 6,
          icon: 'lightbulb' as const,
          label: 'Oświetlenia Ogrodu',
          title: 'Bezpieczeństwo i Klimat po Zmroku',
          content: [
            {
              type: 'paragraph',
              value:
                'Oświetlenie ogrodu to temat, który inwestorzy często zostawiają "na później". To błąd, który kończy się zrywaniem nowej kostki lub ryciem w gotowym trawniku. W CoreLTB Builders planujemy instalacje elektryczne równolegle z pracami ziemnymi. Traktujemy światło jako element bezpieczeństwa oraz "biżuterię" dla Twojego domu.',
            },
            {
              type: 'paragraph',
              value: 'Nasze instalacje łączą pragmatyzm z estetyką:',
            },
            {
              type: 'list',
              items: [
                '**Okablowanie przed Nawierzchnią:** Kładziemy odpowiednie kable ziemne (YKY) i rury osłonowe jeszcze na etapie podbudowy. Dzięki temu masz gotowe punkty pod lampy, gniazdka zewnętrzne czy napęd bramy, bez niszczenia ogrodu w przyszłości.',
                '**Bezpieczeństwo i Funkcja:** Projektujemy oświetlenie ciągów komunikacyjnych. Stosujemy wytrzymałe oprawy najazdowe w podjeździe (odporne na ciężar aut) oraz słupki przy ścieżkach, co eliminuje ryzyko potknięcia i skutecznie odstrasza intruzów.',
                '**Iluminacja i Sceny Świetlne:** Wydobywamy potencjał ogrodu nocą. Podświetlamy korony drzew, elewację budynku czy murki oporowe. Tworzymy głębię widoku, którą możesz podziwiać z salonu przez cały rok.',
                '**Automatyka i Energooszczędność:** Stosujemy technologię LED i inteligentne sterowanie (zegary astronomiczne, czujniki ruchu). Światło włącza się samo, gdy jest potrzebne, a Ty nie martwisz się o wysokie rachunki za prąd.',
              ],
            },
            {
              type: 'paragraph',
              value:
                'Dobrze dobrane oświetlenie to kropka nad "i". Sprawia, że Twój dom wygląda luksusowo, a powrót z pracy po zmroku staje się przyjemnością, a nie błądzeniem w ciemnościach.',
            },
          ],
          imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/oswietlenie.webp',
          imageAlt: 'Oświetlenie ogrodowe CoreLTB Builders pięknie podświetlające ogród i dom po zmroku',
        },
      ],
    },

    // Sekcja 5: ServicesAccordion/FAQ
    servicesAccordion: {
      header: {
        label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
        title: 'Odpowiedzi na Twoje Wątpliwości',
        description:
          'Zagospodarowanie terenu to złożony proces inżynieryjny. Zebraliśmy najważniejsze pytania, które pomogą Ci zrozumieć kolejność prac i koszty inwestycji.',
      },
      services: [
        {
          iconName: 'helpCircle' as const,
          title: 'Od czego zacząć zagospodarowanie działki?',
          content: [
            {
              type: 'paragraph',
              value:
                'Zagospodarowanie działki należy rozpocząć od inżynieryjnych podstaw, czyli precyzyjnej analizy spadków terenu i zaprojektowania systemu odwodnienia. To kluczowy etap, który chroni inwestycję przed zaleganiem wody i zapadaniem się nawierzchni. **W CoreLTB Builders zawsze rozpoczynamy od wizji lokalnej i geodezyjnego pomiaru terenu**, aby precyzyjnie zaprojektować odpływ wód opadowych.',
            },
            {
              type: 'paragraph',
              value:
                'W pierwszej kolejności wykonuje się „twarde" prace ziemne, niwelację oraz przygotowanie podbudowy pod podjazdy i ścieżki. Dopiero po stworzeniu stabilnej bazy i funkcjonalnego układu komunikacyjnego można przystąpić do montażu ogrodzenia oraz zakładania trawnika.',
            },
          ],
        },
        {
          iconName: 'home' as const,
          title: 'Jak zagospodarować teren wokół domu?',
          content: [
            {
              type: 'paragraph',
              value:
                'Zagospodarowanie terenu najlepiej zacząć od analizy inżynieryjnej, uwzględniającej spadki gruntu i systemy odwodnienia. Priorytetem jest wykonanie solidnej podbudowy pod elementy twarde, takie jak podjazdy, tarasy i ścieżki, co zapobiega ich osiadaniu w przyszłości.',
            },
            {
              type: 'paragraph',
              value:
                'Dopiero po zakończeniu prac brukarskich i montażu ogrodzenia należy przejść do precyzyjnej niwelacji terenu i zakładania trawnika. Taka sekwencja, od technicznych podstaw po estetykę, gwarantuje trwałość i spójność całej inwestycji.',
            },
          ],
        },
        {
          iconName: 'coins' as const,
          title: 'Ile kosztuje zagospodarowanie działki?',
          content: [
            {
              type: 'paragraph',
              value:
                'Koszt kompleksowego zagospodarowania terenu zależy od skali prac inżynieryjnych i klasy użytych materiałów. Kluczowe czynniki wpływające na cenę to zakres niwelacji terenu, metraż podjazdów i tarasów, rodzaj ogrodzenia oraz stopień skomplikowania systemów odwodnienia.',
            },
            {
              type: 'paragraph',
              value:
                'Ze względu na konieczność wykonania trwałych podbudów i unikalny charakter każdej działki, precyzyjny budżet ustala się zawsze po wizji lokalnej. **Warto skorzystać z naszej bezpłatnej konsultacji, która pozwoli oszacować koszty i harmonogram inwestycji.**',
            },
          ],
        },
        {
          iconName: 'ruler' as const,
          title: 'Co to jest niwelacja działki i kiedy jest konieczna?',
          content: [
            {
              type: 'paragraph',
              value:
                'Niwelacja działki to inżynieryjne profilowanie terenu polegające na przemieszczaniu mas ziemnych w celu uzyskania pożądanego ukształtowania powierzchni. Jest procesem niezbędnym po zakończeniu budowy, aby zlikwidować nierówności i nadać gruntowi odpowiednie spadki (zazwyczaj 1-2%), które zapewnią skuteczny odpływ wody deszczowej od fundamentów.',
            },
            {
              type: 'paragraph',
              value:
                'To kluczowy etap przygotowawczy pod stabilną podbudowę dla podjazdów, tarasów oraz trawnika, zapobiegający powstawaniu zastoisk wodnych.',
            },
          ],
        },
        {
          iconName: 'fileText' as const,
          title: 'Czy niwelacja terenu wymaga zgłoszenia?',
          content: [
            {
              type: 'paragraph',
              value:
                'Niwelacja terenu w celu zagospodarowania ogrodu co do zasady nie wymaga zgłoszenia ani pozwolenia na budowę. Należy jednak bezwzględnie przestrzegać przepisów Prawa wodnego – zmiana poziomu gruntu nie może kierować wód opadowych na działki sąsiednie.',
            },
            {
              type: 'paragraph',
              value:
                'Jedynie w przypadku wznoszenia murów oporowych powyżej 1,2 m wysokości lub prac ingerujących w infrastrukturę podziemną, procedury administracyjne stają się niezbędne.',
            },
          ],
        },
        {
          iconName: 'alertTriangle' as const,
          title: 'Ile cm można podnieść teren bez pozwolenia?',
          content: [
            {
              type: 'paragraph',
              value:
                'Polskie przepisy nie określają sztywnego limitu w centymetrach, do jakiego można podnieść teren bez pozwolenia. Niwelacja działki zazwyczaj nie wymaga formalności budowlanych, jednak kluczowym ograniczeniem jest Prawo wodne (art. 234). Zmiana ukształtowania terenu nie może kierować wód opadowych na sąsiednie nieruchomości ani zakłócać naturalnego spływu.',
            },
            {
              type: 'paragraph',
              value:
                'Przy znacznych zmianach poziomu gruntu warto zweryfikować Miejscowy Plan Zagospodarowania Przestrzennego, a budowa murów oporowych powyżej 1,2 m wymaga pozwolenia na budowę.',
            },
          ],
        },
        {
          iconName: 'map' as const,
          title: 'Czy do niwelacji terenu potrzebny jest geodeta?',
          content: [
            {
              type: 'paragraph',
              value:
                'Udział geodety nie jest zawsze wymogiem prawnym, jednak jest kluczowy dla zachowania inżynieryjnej precyzji prac. **W CoreLTB Builders zawsze współpracujemy z geodetami**, aby profesjonalnie wyznaczyć granice działki i rzędne wysokościowe. To zapobiega sporom z sąsiadami oraz gwarantuje poprawny spływ wód opadowych.',
            },
            {
              type: 'paragraph',
              value:
                'Precyzyjne określenie spadków terenu, zazwyczaj na poziomie 1-2%, jest niezbędne, aby ochronić fundamenty przed zawilgoceniem i stworzyć stabilną bazę pod podjazdy czy tarasy.',
            },
          ],
        },
        {
          iconName: 'coins' as const,
          title: 'Ile kosztuje wyrównanie terenu na działce?',
          content: [
            {
              type: 'paragraph',
              value:
                'Koszt maszynowego wyrównania terenu zazwyczaj mieści się w przedziale 5–15 zł za m², jednak ostateczna cena zależy od ukształtowania działki, rodzaju gruntu oraz konieczności wywozu odpadów lub nawiezienia nowej ziemi.',
            },
            {
              type: 'paragraph',
              value:
                'Należy pamiętać, że profesjonalna niwelacja to proces inżynieryjny uwzględniający spadki i systemy odwodnienia, co jest kluczowe dla trwałości inwestycji. **Dokładny budżet można ustalić dopiero po wizji lokalnej i ocenie zakresu niezbędnych robót.**',
            },
          ],
        },
        {
          iconName: 'layoutGrid' as const,
          title: 'Ile kosztuje 1 metr ułożenia kostki brukowej?',
          content: [
            {
              type: 'paragraph',
              value:
                'Koszt kompleksowego wykonania nawierzchni brukowanej mieści się zazwyczaj w przedziale 250–500 zł za m². Cena zależy od wybranego materiału, skomplikowania wzoru oraz zakresu niezbędnych prac ziemnych.',
            },
            {
              type: 'paragraph',
              value:
                '**Wycena w CoreLTB Builders uwzględnia nie tylko samo ułożenie kostki, ale przede wszystkim precyzyjne przygotowanie trwałej podbudowy, niwelację terenu i systemy odwodnienia**, które są kluczowe dla zapewnienia stabilności i estetyki inwestycji przez lata.',
            },
          ],
        },
        {
          iconName: 'clipboardCheck' as const,
          title: 'Jaka jest kolejność prac przy układaniu kostki brukowej?',
          content: [
            {
              type: 'paragraph',
              value:
                'Prawidłowy proces rozpoczyna się od korytowania gruntu (zazwyczaj na głębokość 20–50 cm) oraz osadzenia obrzeży, które wyznaczają ramy nawierzchni. Kluczowym etapem inżynieryjnym jest wykonanie solidnej podbudowy z kruszywa, a następnie ułożenie warstwy wyrównawczej z podsypki (ok. 3–5 cm).',
            },
            {
              type: 'paragraph',
              value:
                'Dopiero na tak przygotowanym gruncie układa się kostkę. Prace kończy spoinowanie piaskiem oraz mechaniczne zagęszczanie, co gwarantuje stabilność i właściwe odwodnienie przez lata.',
            },
          ],
        },
      ],
    },

    // Sekcja 6: Testimonials
    testimonials: {
      header: {
        label: 'OPINIE NASZYCH KLIENTÓW',
        title: 'Sąsiedzi Już Cieszą Się Swoim Ogrodem',
        description: 'Zobacz, co mówią inwestorzy, którym pomogliśmy zamknąć temat budowy.',
      },
      testimonials: [
        {
          quote:
            'Po budowie domu mieliśmy już szczerze dość ekip i użerania się z terminami. CoreLTB wzięliśmy z polecenia i to była najlepsza decyzja. Chłopaki weszli, zrobili swoje i wyszli. Zero marudzenia, że "się nie da". Podjazd zrobiony pancernie, kostka równiutka, a na koniec wyrównali nam teren pod trawnik. Tak to powinno wyglądać od początku.',
          author: {
            image: {
              src: '/images/testimonials/marek-i-ania.webp',
              alt: 'Marek i Ania',
            },
            name: 'Marek i Ania',
            role: 'Realizacja w Zabierzowie',
          },
          rating: 5.0,
        },
        {
          quote:
            'Bałem się o wodę na podjeździe, bo działkę mamy gliniastą i u sąsiada po deszczu stoi bajoro. Ekipa z CoreLTB podeszła do tematu bardzo technicznie. Zrobili konkretną podbudowę, drenaż i odpowiednie spadki. Pierwsze ulewy za nami – kostka sucha, nic nie stoi, nic nie siada. Widać, że znają się na inżynierii, a nie tylko na układaniu klocków.',
          author: {
            image: {
              src: '/images/testimonials/tomasz-k.webp',
              alt: 'Tomasz K.',
            },
            name: 'Tomasz K.',
            role: 'Prace ziemne i brukarstwo',
          },
          rating: 5.0,
        },
        {
          quote:
            'Nie miałam pomysłu na zagospodarowanie wokół domu, wiedziałam tylko, że nie chcę samej "betonozy". Panowie świetnie doradzili, jak połączyć taras z zejściem do ogrodu, żeby to wyglądało lekko. Bardzo kulturalna ekipa, zostawili po sobie idealny porządek. Teraz picie kawy na tarasie to czysta przyjemność. Polecam z czystym sumieniem!',
          author: {
            image: {
              src: '/images/testimonials/pani-katarzyna.webp',
              alt: 'Pani Katarzyna',
            },
            name: 'Pani Katarzyna',
            role: 'Taras i ścieżki',
          },
          rating: 5.0,
        },
        {
          quote:
            'Konkretna firma. Umówiona cena została dotrzymana, termin też, co w budowlance jest rzadkością. Robili u mnie ogrodzenie frontowe i wjazd. Podobało mi się, że mają własny sprzęt i nie kombinują z podwykonawcami. Wszystko pod kontrolą od początku do końca.',
          author: {
            image: {
              src: '/images/testimonials/krzysztof.webp',
              alt: 'Krzysztof',
            },
            name: 'Krzysztof',
            role: 'Ogrodzenie i podjazd',
          },
          rating: 5.0,
        },
      ],
    },

    // Sekcja 7: ContactCTA
    contactCTA: {
      header: {
        label: 'ZACZNIJMY TWORZYĆ TWÓJ OGRÓD',
        title: 'Gotowy na Zagospodarowanie Działki?',
        description:
          'Umów się na bezpłatną konsultację, a my przygotujemy dla Ciebie wstępną koncepcję zagospodarowania terenu oraz kosztorys prac.',
      },
      contactInfo: {
        phone: '+48 123 456 789',
        email: 'kontakt@coreltb.pl',
        address: 'ul. Przykładowa 123, Warszawa',
      },
    },

    // SEO
    metaTitle: 'Zagospodarowanie Terenu - Brukarstwo, Ogrodzenia, Trawniki | CoreLTB Builders',
    metaDescription:
      'Kompleksowe zagospodarowanie działki od A do Z. Brukarstwo, ogrodzenia, odwodnienie, trawniki i nawadnianie. Jedna firma, pełna odpowiedzialność. Bezpłatna konsultacja.',

    createdAt: '2025-12-09T10:00:00Z',
    updatedAt: '2025-12-09T10:00:00Z',
  },
];


export const getServiceV2BySlug = (slug: string): ServiceV2 | undefined =>
  allServicesV2.find((s) => s.slug === slug);
