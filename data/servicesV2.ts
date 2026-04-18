// /data/servicesV2.ts
// Nowa struktura danych dla usług budowlanych (wersja 2 - emocjonalna i perswazYjna)
// Kompatybilna z przyszłą migracją do Headless CMS (Strapi)

import { IconName } from '@/components/ui';
import { TestimonialCardProps, SectionHeaderProps, NumberedListItemProps } from '@/components/shared';

/** Aktualny rok — używany w tekstach ofertowych, aby nie edytować ręcznie co roku. */
const CURRENT_YEAR = new Date().getFullYear();

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
  address?: string;
}

export interface ContactCTAData {
  header: SectionHeaderProps;
  faqs?: FAQ[];
  contactInfo: ContactInfo;
  primaryButton?: { text: string; href: string };
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
  url?: string;
  context?: string;
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

// --- Dane listingowe (karta na stronie /oferta) ---

export interface ServiceListingData {
  image: string;
  title: string;
  description: string;
  features: string[];
}

// --- Główny Typ Usługi V2 ---

export interface ServiceV2 {
  slug: string;
  id: string;
  category: string;
  title: string;

  // Listing (karta na stronie /oferta)
  listing: ServiceListingData;

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
    title: 'Budowa Domów Pod Klucz – Śląsk', // Zmiana pod SEO!

    // Listing (karta na stronie /oferta)
    listing: {
      image: '/images/uslugi/kompleksowa-budowa-domow/timeline/odbior-gwarancja.webp',
      title: 'Budowa domów (SSO / deweloperski / pod klucz)',
      description: 'Budowa domów (SSO / Deweloperka) w reżimie WT2026. Płyty fundamentowe, dylatacje pod szkody górnicze, stała cena.',
      features: [
        'Indywidualne projekty architektoniczne',
        'Gwarancja jakości i terminowości',
      ],
    },

    // PageHeader
    pageHeader: {
      // TU ZMIANA: Hybryda Fraz (Vol: 5000 + 500)
      title: 'Kompleksowa budowa domów pod klucz',
      watermarkText: 'BUDOWA DOMÓW',
      backgroundImage: '/images/uslugi/kompleksowa-budowa-domow/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        // Zmieniamy breadcrumb na krótki SEO
        { label: 'Budowa domów (Śląsk / Małopolska)', href: '' }, 
      ],
    },

    // Sekcja 1: HERO - SEO + Konkret Inżynierski
    emotionalHero: {
      label: 'SYSTEMOWA BUDOWA DOMÓW NA ŚLĄSKU I W MAŁOPOLSCE',
      // NAGŁÓWEK H1 - Bezpośrednio w frazę "Budowa Domów" (Volume: 5000)
      headline: [
        'Kompleksowa budowa domów',
        'z gwarancją stałej ceny'
      ],
      // PODTYTUŁ - Tu wstrzykujemy semantykę (Płyta + Ceramika + Stan surowy)
      subtitle:
        'Zastępujemy chaos systemu gospodarczego inżynierskim procesem. Realizujemy domy w technologii murowanej (ceramika/silikat) oraz na płycie fundamentowej, co jest kluczowe przy szkodach górniczych. Obsługujemy inwestycje od "geologa", przez stan surowy otwarty, aż po stan deweloperski i odbiory.',
      
      benefits: [
        // Konkretne liczby i nazewnictwo prawne
        'Ponad 150 oddanych budynków (technologia tradycyjna i płytowa)',
        'Pełna odpowiedzialność prawna (5 lat rękojmi na konstrukcję)',
        'Umowa ryczałtowa (stała cena niezależnie od inflacji materiałowej)',
      ],
      
      // CTA Box - Sprzedajemy wiedzę za kontakt (Lead Magnet)
      ctaBoxTitle: 'Wstępny audyt inwestycji',
      ctaBoxBenefits: [
        'Weryfikacja MPZP i kategorii szkód górniczych na działce',
        'Szacunkowy kosztorys budowy domu na rok 2026 (SSO / Deweloperski)',
        'Analiza: Ławy fundamentowe czy płyta? (Kalkulacja pod grunt)',
        'Wstępny dobór technologii OZE (Pompa ciepła + Fotowoltaika)',
      ],
      ctaBoxSubtext: 'Konsultacja techniczna z Inżynierem Kontraktu.',
      ctaBoxButtons: [
        {
          text: 'Wyceń budowę online',
          href: '/wycena',
          variant: 'primary',
        },
        {
          text: 'Umów konsultację',
          href: '/umow-konsultacje?usluga=budowa',
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
    label: 'PYTANIA I ODPOWIEDZI',
    title: 'Kwestie budżetowe i prawne',
    description: 'Odpowiedzi na najczęstsze obawy inwestorów dotyczące umów, cen i terminów.',
    theme: 'light' as const,
  },
  
  services: [
    {
      iconName: 'coins', // Ikona Pieniędzy
      title: 'Czy cena w umowie jest stała i gwarantowana?',
      content: [
        {
          type: 'paragraph',
          value: '**Tak.** To fundamentalna różnica między Generalnym Wykonawcą a "systemem gospodarczym". Podpisujesz z nami umowę na stałą kwotę ryczałtową. Jako duży podmiot, my kontraktujemy materiały z wyprzedzeniem, biorąc na siebie **ryzyko inflacji i wzrostu cen**.'
        },
        {
          type: 'paragraph',
          value: 'Dzięki temu Twoja rata kredytu i harmonogram finansowy są bezpieczne, a Ty nie musisz szukać dodatkowych środków w trakcie budowy.'
        }
      ]
    },
    {
      iconName: 'calendar', // Ikona Kalendarza
      title: 'Ile realnie trwa budowa do stanu deweloperskiego?',
      content: [
        {
          type: 'paragraph',
          value: 'Dzięki własnym brygadom i materiałom systemowym, eliminujemy przestoje (tzw. "dziury w grafiku"). Średni czas realizacji dla domu ~150 m² to:'
        },
        {
           type: 'list',
           items: [
             '**3-4 miesiące** – [Stan Surowy Otwarty (SSO)](/baza-wiedzy/stan-surowy-otwarty-poradnik).',
             '**7-9 miesięcy** – Stan Deweloperski (pełne instalacje, tynki, elewacja).',
             '**12 miesięcy** – Opcja "Pod Klucz" z wykończeniem wnętrz.'
           ]
        }
      ]
    },
    {
      iconName: 'shieldCheck', // Ikona Tarczy
      title: 'Jak wygląda gwarancja na budynek?',
      content: [
        {
          type: 'paragraph',
          value: 'W systemie gospodarczym, gdy pęknie rura lub dach zacznie przeciekać, dekarz zrzuca winę na kominiarza. U nas to niemożliwe. Jako Generalny Wykonawca udzielamy **jednej, spójnej 5-letniej rękojmi** na cały budynek (konstrukcję, szczelność, instalacje).'
        },
        {
          type: 'paragraph',
          value: 'Masz jeden numer telefonu do zgłaszania usterek. To my zarządzamy podwykonawcami, a nie Ty.'
        }
      ]
    },
    {
      iconName: 'hardHat', // Ikona Kasku/Nadzoru
      title: 'Czy muszę codziennie bywać na budowie?',
      content: [
        {
          type: 'paragraph',
          value: '**Nie.** Twoim reprezentantem na miejscu jest **Kierownik Kontraktu CoreLTB Builders**. Ty pojawiasz się tylko na kluczowych kamieniach milowych (np. odbiór zbrojenia stropu, odbiór tynków).'
        },
        {
          type: 'paragraph',
          value: 'Codzienny nadzór logistyczny i jakościowy to nasza praca. Otrzymujesz od nas regularne raporty (zdjęcia/wideo) z postępów prac, więc widzisz, co dzieje się na Twojej działce bez wychodzenia z biura.'
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
            title: 'Audyt i badania geotechniczne gruntu', // WBITE SŁOWO KLUCZOWE (5k)
            content: [
              {
                type: 'paragraph',
                value: 'Zakup działki na Śląsku bez sprawdzenia gruntu to ryzyko. Grunty wysadzinowe (gliny) i **szkody górnicze** (kategorie I-IV) wpływają na koszty. Analizujemy grunt przed startem, bo różnica w cenie między ławą a [płytą fundamentową](/baza-wiedzy/plyta-fundamentowa-tereny-gornicze) jest znacząca.'
              },
              {
                type: 'list',
                items: [
                  '**Badania geotechniczne gruntu:** wykonujemy odwierty, aby wykluczyć kosztowną wymianę gruntu (np. przy nasypach niekontrolowanych).',
                  '**Szkody Górnicze:** weryfikujemy teren w PGG i dobieramy stal zbrojeniową (A-IIIN), która utrzyma sztywność budynku.',
                  '**Mapa do celów projektowych:** geodeta przygotowuje dokument niezbędny do adaptacji projektu.'
                ]
              },
              {
                 type: 'paragraph', 
                 value: '**Masz trudną działkę?** Sprawdź szczegóły: [Usługi geotechniczne w CoreLTB Builders](/oferta/uslugi-techniczne)'
              }
            ],
            imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
            imageAlt: 'Badania geotechniczne gruntu i geodeta na działce' // Alt też poprawiony
          },
          {
            id: 'etap-2',
            number: 2,
            icon: 'draftingCompass',
            label: 'Projekt',
            title: 'Adaptacja projektu i optymalizacja (value engineering)', // WBITE SŁOWO KLUCZOWE
            content: [
              {
                type: 'paragraph',
                value: 'Papier przyjmie wszystko, budżet nie. Weryfikujemy dokumentację "okiem wykonawcy". Często **projekty gotowe** są przewymiarowane. Naszym celem jest redukcja kosztów stanu surowego przy zachowaniu norm **WT2021**.'
              },
              {
                type: 'list',
                items: [
                  '**Adaptacja projektu:** przeliczamy fundamenty na **płytę fundamentową** (bezpieczniejszą na szkody górnicze) i dostosowujemy dach do stref wiatrowych.',
                  '**Projekty indywidualne:** projektujemy domy pod pompy ciepła i rekuperację, eliminując mostki termiczne.',
                  '**Formalności:** kompletujemy uzgodnienia ZUD i charakterystykę energetyczną do pozwolenia na budowę.'
                ]
              },
              {
                type: 'paragraph',
                value: 'Sprawdź naszą ofertę: [Adaptacja projektów i Biuro Projektowe >](/oferta/projektowanie)'
              }
            ],
            imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/projekt-domu.webp',
            imageAlt: 'Adaptacja projektu gotowego - optymalizacja kosztów'
          },
          {
            id: 'etap-3',
            number: 3,
            icon: 'plug',
            label: 'Media',
            title: 'Uzbrojenie działki i przyłącza', // Money Keyword (Uzbrojenie)
            content: [
              {
                type: 'paragraph',
                value: 'Brak mediów to najczęstsza blokada startu budowy. Jako generalny wykonawca działamy jako Twój pełnomocnik u lokalnych gestorów (Tauron, PSG, Wodociągi). Koordynujemy procedury tak, aby plac budowy miał zasilanie (tzw. prowizorkę) od pierwszego dnia.'
              },
              {
                type: 'list',
                items: [
                  '**Warunki techniczne (WTP):** składamy wnioski o wydanie warunków przyłączenia, zlecamy projekty branżowe i uzgadniamy je w ZUD, optymalizując trasy wykopów.',
                  '**Prąd budowlany (RB-tka):** organizujemy zasilanie tymczasowe ("siłę" 400V), co pozwala naszym brygadom ruszyć z pracami natychmiast, bez czekania na licznik docelowy.',
                  '**Wykonawstwo i odbiory:** nadzorujemy wykopy, ułożenie rur zgodnie z normą (podsypki, taśmy ostrzegawcze) oraz kończymy proces inwentaryzacją geodezyjną.'
                ]
              },
              {
                 type: 'paragraph',
                 value: 'Dzięki temu unikasz sytuacji, w której gotowy dom "stoi i niszczeje" przez brak licznika gazu potrzebnego do wygrzania posadzek.'
              }
            ],
            imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/przylacza-budowlane.webp',
            imageAlt: 'Wykopy i montaż przyłączy mediów na działce budowlanej',
          },
          {
            id: 'etap-4',
            number: 4,
            icon: 'stamp',
            label: 'Urzędy',
            title: 'Pozwolenie na budowę (PnB) i warunki zabudowy', // Tu wbijamy frazę z 50k vol
            content: [
              {
                type: 'paragraph',
                value: 'Biurokracja to „wąskie gardło” inwestycji. Działamy na podstawie **pełnomocnictwa**. Weryfikujemy **warunki zabudowy (WZ)** lub MPZP i składamy wnioski, które nie wracają do "uzupełnień formalnych" w lokalnych starostwach (Wodzisław, Rybnik, Gliwice).'
              },
              {
                type: 'list',
                items: [
                  '**Teczka projektowa:** kompletujemy dokumentację zgodną z nowym prawem budowlanym (obowiązkowy podział na PZT i PAB).',
                  '**Cyfryzacja:** zakładamy Elektroniczny Dziennik Budowy (EDB), co usprawnia obieg dokumentów między inwestorem a kierownikiem budowy.',
                  '**Nadzór procesu:** monitorujemy status sprawy u inspektora, aż do uzyskania prawomocnej decyzji.'
                ]
              },
              {
                // LINK SEO: Pozwolenie na budowę (Volume: 50, trend rosnący nieskończoność)
                type: 'paragraph',
                value: '**Checklista inwestora:** Sprawdź procedurę: Pozwolenie na budowę krok po kroku'
              }
            ],
            imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/pozwolenie-na-budowe.webp',
            imageAlt: 'Decyzja administracyjna pozwolenia na budowę i pieczęć urzędu',
          },
        {
          id: 'etap-5',
          number: 5,
          icon: 'landmark', // Ikona Banku
          label: 'Finanse',
          title: 'Budżet i harmonogram bankowy', // Bardziej precyzyjny tytuł
          content: [
            {
              type: 'paragraph',
              value: 'Dla banku Twoja budowa to cyfry w Excelu. Analitycy odrzucają wnioski oparte na nierealnych szacunkach. Jako Generalny Wykonawca dostarczamy **umowę z gwarancją ceny** oraz profesjonalny **Harmonogram Rzeczowo-Finansowy**. To dokument, który udowadnia bankowi, że inwestycja zostanie domknięta w założonym budżecie.'
            },
            {
              type: 'list',
              items: [
                '**Dokumentacja dla rzeczoznawcy:** Przygotowujemy kosztorys, który jest podstawą do wyceny nieruchomości (operatu szacunkowego).',
                '**Płynność Transz:** Planujemy etapy budowy (np. SSZ, instalacje) tak, aby idealnie pokrywały się z harmonogramem wypłat transz przez bank. Budowa nie stanie z powodu braku środków.',
                '**Eksperci Kredytowi:** Udostępniamy kontakt do sprawdzonych doradców na Śląsku/Małopolsce, którzy znają specyfikę naszych umów ryczałtowych.'
              ]
            },
            {
              // STRATEGICZNY LINK - KLIENT CHCE WIEDZIEĆ "ILE?"
              type: 'paragraph',
              value: `**Planujesz budżet na ${CURRENT_YEAR}?** Sprawdź naszą analizę rynku: Ile realnie kosztuje budowa domu (SSO / Pod Klucz)?`
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/wsparcie-finansowanie.webp',
          imageAlt: 'Analiza harmonogramu rzeczowo-finansowego budowy',
        },
        {
          id: 'etap-6',
          number: 6,
          icon: 'construction',
          label: 'Realizacja', // Zmienione z 'Budowa' na bardziej pro 'Realizacja'
          title: `Stan surowy i standard deweloperski WT2021`,
          content: [
            {
              type: 'paragraph',
              value: 'To inżynieria, nie improwizacja. Budowę prowadzimy własnymi brygadami, co gwarantuje zachowanie ciągłości prac. Pilnujemy reżimu technologicznego – beton musi osiągnąć pełną wytrzymałość (28 dni) przed obciążeniem, a mostki termiczne są eliminowane systemowo (np. przy roletach i balkonach).'
            },
            {
              type: 'list',
              items: [
                '**Konstrukcja (SSO):** Mury w technologii cienkospoinowej (Ceramika/Silikat), stropy monolityczne żelbetowe (większa sztywność niż Teriva!) oraz więźba impregnowana.',
                '**Zamknięcie (SSZ):** Okna 3-szybowe (Ug<0.9) w standardzie "ciepłego montażu" na taśmach paroszczelnych, co jest wymogiem dla pomp ciepła.',
                '**Instalacje (Deweloperka):** Kompleksowe uzbrojenie budynku: Ogrzewanie podłogowe (w całym domu), Wod-Kan, Elektryka, Rekuperacja i Tynki maszynowe.'
              ]
            },
            {
              // SUPER WAŻNY LINK - Chroni przed niedomówieniami
              type: 'paragraph',
              value: '**Uniknij nieporozumień:** Zobacz Checklista prac (120 pkt): Standard Deweloperski'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/realizacja-budowy.webp',
          imageAlt: 'Budowa domu: murowanie ścian w technologii poryzowanej i stropy monolityczne',
        },
        {
          id: 'etap-7',
          number: 7,
          icon: 'shovel', // Ikona łopaty/prac ziemnych
          label: 'Teren',
          title: 'Prace ziemne i zagospodarowanie', // Bardziej techniczny tytuł
          content: [
            {
              type: 'paragraph',
              value: 'Nie zostawiamy domu na "księżycowym krajobrazie". Zaraz po demontażu rusztowań wchodzimy z ciężkim sprzętem. Na nieprzepuszczalnych gruntach Południowej Polski (gliny) kluczowe jest **inżynierskie ukształtowanie spadków**, aby woda opadowa nie stała przy fundamentach, co grozi zawilgoceniem.'
            },
            {
              type: 'list',
              items: [
                '**Gospodarka Wodna:** Niwelacja terenu, drenaż opaskowy wokół budynku oraz montaż studni chłonnych (rozwiązanie problemu błota).',
                '**Nawierzchnie Utwardzone:** Podjazdy i tarasy wykonujemy na pełnej **podbudowie drogowej** (kruszywo łamane stabilizowane mechanicznie). Dajemy gwarancję, że kostka nie zapadnie się pod ciężkim samochodem.',
                '**Ogrodzenie:** Montaż ogrodzeń systemowych i bram z automatyką zintegrowaną z elektryką domu.'
              ]
            },
            {
              // LINK WEWNĘTRZNY DO OFERTY UZUPEŁNIAJĄCEJ (CROSS-SELLING)
              type: 'paragraph',
              value: '**Twój ogród i podjazd:** Zobacz co oferujemy w dziale: [Zagospodarowanie Terenu >](/oferta/zagospodarowanie-terenu)'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/zagospodarowanie-terenu.webp',
          imageAlt: 'Niwelacja terenu i układanie kostki brukowej na podjeździe',
        },
        {
          id: 'etap-8',
          number: 8,
          icon: 'keyRound',
          label: 'Finał',
          title: 'Procedura PINB, rękojmia i szkolenie',
          content: [
            {
              type: 'paragraph',
              value: 'Fizyczne zakończenie prac to nie wszystko. Aby legalnie zamieszkać, budynek musi przejść procedurę odbiorową w Powiatowym Inspektoracie Nadzoru Budowlanego (PINB). Użytkowanie domu bez odbioru grozi wysokimi karami administracyjnymi. Bierzemy tę biurokrację na siebie.'
            },
            {
              type: 'list',
              items: [
                '**Kompletacja dokumentów:** Zbieramy wpisy kierownika budowy, protokoły kominiarskie, elektryczne, szczelności instalacji oraz geodezyjną inwentaryzację powykonawczą.',
                '**Legalizacja:** Składamy zawiadomienie o zakończeniu budowy i uzyskujemy formalną zgodę na użytkowanie (tzw. milcząca zgoda lub decyzja).',
                '**Rękojmia:** Od momentu odbioru startuje pełna, 5-letnia ochrona prawna na konstrukcję i szczelność budynku.'
              ]
            },
            {
               // WAŻNY DODATEK: "Onboarding" zamiast "Marzeń"
               type: 'paragraph',
               value: '**Przekazanie kluczy:** Wraz z domem otrzymujesz Teczkę Inwestycji oraz przeprowadzamy **techniczne szkolenie z obsługi budynku** (sterowanie ogrzewaniem, wymiana filtrów, serwis), abyś w pełni panował nad swoją nieruchomością.'
            }
          ],
          // Twoje oryginalne zdjęcie
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/odbior-gwarancja.webp',
          imageAlt: 'Przekazanie kluczy i dokumentacji technicznej inwestorowi',
        },
      ],
    },
    areasData: {
      header: {
        label: 'LOGISTYKA I ZASIĘG',
        title: 'Dwie bazy operacyjne: Jaworzno i Wodzisław',
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
            { label: 'Wodzisław Śląski', url: '/obszar-dzialania/wodzislaw-slaski' },
            { label: 'Rybnik', url: '/obszar-dzialania/rybnik' },
            { label: 'Żory', url: '/obszar-dzialania/zory' },
            { label: 'Racibórz', url: '/obszar-dzialania/raciborz' },
            { label: 'Jastrzębie-Zdrój', url: '/obszar-dzialania/jastrzebie-zdroj' },
          ]
        },
        {
          hubName: 'JAWORZNO',
          subLabel: '',
          iconName: 'building' as const,
          description: 'Logistyka materiałowa A4/S1. Szybki start inwestycji w Katowicach, Tychach i Małopolsce.',
          cities: [
            { label: 'Jaworzno', url: '/obszar-dzialania/jaworzno' },
            { label: 'Katowice', url: '/obszar-dzialania/katowice' },
            { label: 'Tychy', url: '/obszar-dzialania/tychy' },
            { label: 'Gliwice', url: '/obszar-dzialania/gliwice' },
            { label: 'Mikołów', url: '/obszar-dzialania/mikolow' },
          ]
        }
      ]
    },

    // Sekcja 8: Wezwanie do Działania
    contactCTA: {
      header: {
        label: 'SKONTAKTUJ SIĘ Z NAMI',
        title: 'Gotowy na pierwszy krok?',
        description: 'Sprawdź koszt budowy w naszym kalkulatorze lub umów rozmowę z inżynierem.',
        theme: 'light' as const,
      },
      contactInfo: {
        phone: '+48 664 123 757',
        email: 'biuro@coreltb.pl',
      },
      primaryButton: { text: 'Wyceń budowę', href: '/wycena' },
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

    // Listing (karta na stronie /oferta)
    listing: {
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      title: 'Projektowanie i adaptacje',
      description: 'Projekty domów pod budżet wykonawczy. Adaptacja konstrukcji do trudnych gruntów (Śląsk) i optymalizacja kosztów (Value Engineering).',
      features: [
        'Wizualizacje 3D',
        'Pełna dokumentacja techniczna',
      ],
    },

    // PageHeader
    pageHeader: {
      title: 'Projekty indywidualne i adaptacje projektów',
      watermarkText: 'PROJEKTOWANIE',
      backgroundImage: '/images/uslugi/projektowanie/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Projektowanie', href: '' },
      ],
    },

// Sekcja 1: EmotionalHero - Konkret finansowy i technologiczny
emotionalHero: {
  label: 'BIURO PROJEKTOWE GENERALNEGO WYKONAWCY',
  headline: 'Projekty domów, na które Cię stać', // Uderzenie w największy ból (budżet)
  subtitle:
    `Standardowe biura architektoniczne rzadko znają aktualne ceny stali i betonu na rok ${CURRENT_YEAR}. My tak. Jako generalny wykonawca łączymy estetykę z twardą kalkulacją wykonawczą. Eliminujemy drogie i zbędne rozwiązania konstrukcyjne już na etapie kreski, zanim wydasz pieniądze na fundamenty.`,
  benefits: [
    'Projekt z gwarancją zmieszczenia się w założonym kosztorysie',
    'Adaptacja fundamentów do trudnych gruntów (gliny, szkody górnicze)',
    'Bezpłatny harmonogram rzeczowo-finansowy pod kredyt hipoteczny',
  ],
  
  // CTA - Konkretna wartość techniczna na start
  ctaBoxTitle: 'Wstępny audyt działki i budżetu',
  ctaBoxBenefits: [
    'Weryfikacja MPZP (co urzędnik pozwoli wybudować?)',
    'Ocena ryzyka szkód górniczych i warunków wodnych',
    'Dobór technologii ścian i stropów do twojego budżetu',
    'Wstępne oszacowanie kosztów stanu surowego (SSO)',
  ],
  ctaBoxSubtext: 'Konsultacja techniczna z inżynierem, nie handlowcem.',
  ctaBoxButtons: [
    {
      text: 'Umów konsultację',
      href: '/umow-konsultacje?usluga=projektowanie',
      variant: 'primary'
    },
    {
      text: 'Zadzwoń do nas',
      href: 'tel:+48664123757',
      variant: 'secondary'
    },
  ],
},

// Sekcja 2: Dlaczego warto - model Design & Build
philosophyTimeline: {
  header: {
    label: 'MODEL "ZAPROJEKTUJ I WYBUDUJ"',
    title: 'Nie projektujemy "do szuflady"',
    description:
      'Eliminujemy ryzyko, że projekt trafi do kosza przez zbyt wysokie koszty realizacji. Jako generalny wykonawca tworzymy dokumentację wykonawczą, a nie tylko ładną wizualizację.',
  },

  items: [
    {
      number: 1,
      iconName: 'coins', // Ikona finansowa
      title: 'Kontrola kosztów (value engineering)',
      description:
        'Zamiast "cenników z internetu", bazujemy na naszych realnych kontraktach wykonawczych. Optymalizujemy zużycie stali i betonu, często oszczędzając inwestorowi 10-15% na stanie surowym bez utraty jakości konstrukcji.',
    },
    {
      number: 2,
      iconName: 'layers', // Ikona warstw gruntu
      title: 'Konstrukcja dobrana do geologii',
      description:
        'Każda działka jest inna. Projektujemy bezpieczne fundamenty zarówno na śląskie szkody górnicze (PGG/JSW), jak i na małopolskie lessy, skarpy czy skaliste podłoża jury krakowsko-częstochowskiej.',
    },
    {
      number: 3,
      iconName: 'clipboardCheck', // Ikona weryfikacji
      title: 'Wykonalność techniczna detali',
      description:
        'Unikamy rozwiązań "ładnych, ale trudnych w izolacji". Nasi inżynierowie weryfikują projekt pod kątem eliminacji mostków termicznych i możliwości szczelnego montażu okien w warstwie ocieplenia.',
    },
  ],

  image: {
    // Zostawiam oryginalną ścieżkę
    src: '/images/uslugi/projektowanie/dlaczego-warto.webp',
    alt: 'Zespół inżynierów CoreLTB weryfikujący projekt wykonawczy',
  },
},

    cooperationTimelineNoLine: {
      header: {
        label: 'PROCES PROJEKTOWY',
        title: 'Ścieżka do pozwolenia na budowę',
        description: 'Nie teoretyzujemy. Każdy z tych etapów służy jednemu celowi: uzyskaniu legalnego projektu, który zmieści się w Twoim budżecie wykonawczym.',
      },
      steps: [
        {
          id: 'step-1',
          number: 1,
          icon: 'fileText',
          label: 'Adaptacja',
          title: 'Adaptacja projektu gotowego',
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
                '**Przewymiarowanie konstrukcji:** często "odchudzamy" ilość stali w fundamentach (średnio o 15-20%) lub zmieniamy drogie stropy na systemowe.',
                '**Dostosowanie do działki:** weryfikujemy zgodność z MPZP (kąty dachu, wysokość) oraz orientację względem stron świata.',
                '**Koszty ukryte:** wskazujemy detale (np. nietypowe okna), które drastycznie podniosą cenę budowy.',
                'Wykonujemy pełną adaptację projektu do działki i warunków zabudowy (WZ) lub MPZP.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Naszym zadaniem jest zamiana "taniego projektu" w dokumentację "tanią w budowie".'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/adaptacja-projektu.webp',
          imageAlt: 'Adaptacja projektu gotowego do warunków działki'
        },
        {
          id: 'step-2', // Pamiętaj, żeby ID były unikalne (step-1, step-2...)
          number: 2,
          icon: 'draftingCompass',
          label: 'Projekt indywidualny',
          title: 'Projekt indywidualny "pod budżet"',
          content: [
            {
              type: 'paragraph',
              value: 'Tworzymy projekt od zera pod trudną działkę (skarpę, wąski front, szkody górnicze). Projektujemy z kalkulatorem w ręku, traktując budżet inwestorski jako główną wytyczną, a nie dodatek.'
            },
            {
              type: 'paragraph',
              value: '**Dlaczego warto?**'
            },
            {
              type: 'list',
              items: [
                '**Optymalizacja PUM:** projektujemy bryłę tak, aby zminimalizować "puste metry" (korytarze), za których budowę płacisz, a z nich nie korzystasz.',
                '**Bilans mas ziemnych:** wykorzystujemy naturalne ukształtowanie spadków, aby uniknąć kosztownego wywożenia ziemi i drogich murów oporowych.',
                '**Standard energetyczny:** modelujemy budynek pod pompę ciepła i rekuperację, eliminując mostki termiczne już w geometrii ścian zewnętrznych.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Efektem jest unikalny dom, który finalnie kosztuje tyle samo co katalogowy po adaptacji, ale jest pozbawiony błędów funkcjonalnych.'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/projekt-indywidualny.webp',
          imageAlt: 'Projektowanie indywidualne domu na wymagającej działce'
        },
        {
          // Krok scalony (Technologia + Adaptacja) z Linkiem Edukacyjnym
          id: 'step-3',
          number: 3,
          icon: 'settings', 
          label: 'Inżynieria',
          title: 'Optymalizacja konstrukcyjna (value engineering)',
          content: [
            {
              type: 'paragraph',
              value: 'To jest serce naszej pracy. Niezależnie od wariantu, nasi konstruktorzy przeliczają budynek, aby był bezpieczny i ekonomiczny. Eliminujemy błędy projektowe, które generują nieprzewidziane koszty na placu budowy.'
            },
            {
              type: 'paragraph',
              value: '**Zakres prac inżynieryjnych:**'
            },
            {
              type: 'list',
              items: [
                '**Fundamenty na szkody:** dobieramy płytę fundamentową lub ławy w zależności od kategorii terenu (I-IV) i badań geologicznych (szczególnie przy glinach).',
                '**Kolizje i detale:** weryfikujemy przejścia instalacyjne przez stropy i podciągi, aby uniknąć kucia betonu podczas realizacji instalacji.',
                `**Termika detalu:** projektujemy połączenia balkonów i nadproży w standardzie "zero mostków", co jest kluczowe dla spełnienia norm WT2021.`
              ]
            },
            {
               // STRATEGICZNY LINK DO ARTYKUŁU
               type: 'paragraph',
               value: '**Technologia:** Zobacz, jakie rozwiązania obniżą Twoje rachunki: [Domy energooszczędne - przewodnik 2026](/baza-wiedzy/dom-energooszczedny-slask)'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/adaptacja.webp',
          imageAlt: 'Optymalizacja konstrukcji i adaptacja do warunków gruntowych'
        },
        {
          id: 'step-4',
          number: 4,
          icon: 'piggyBank',
          label: 'Wycena',
          title: 'Kosztorys inwestorski (gwarancja wykonalności)',
          content: [
            {
              type: 'paragraph',
              value: `Jako generalny wykonawca dajemy Ci przewagę, której nie mają zwykłe biura projektowe. Wraz z projektem otrzymujesz **szacunek realnych kosztów budowy** na rok ${CURRENT_YEAR}, oparty na cenach transakcyjnych, a nie wskaźnikach.`
            },
            {
              type: 'paragraph',
              value: '**Co zyskujesz?**'
            },
            {
              type: 'list',
              items: [
                '**Decyzyjność:** wiesz, czy stać Cię na stan surowy i deweloperski jeszcze przed wydaniem oszczędności na start robót.',
                '**Bezpieczeństwo kredytowe:** otrzymujesz wsad merytoryczny niezbędny do rozmów z analitykiem bankowym (profesjonalny harmonogram rzeczowo-finansowy).',
                '**Weryfikacja materiałowa:** to ostatni moment na zamianę drogich rozwiązań (np. dachówka ceramiczna, okna HS) na tańsze (blacha, okna PSK), jeśli budżet tego wymaga.'
              ]
            },
            {
              // STRATEGICZNY LINK: Przekierowanie do analizy cen
              type: 'paragraph',
              value: `**Planujesz finanse?** Zobacz nasz aktualny: Raport kosztów budowy domu ${CURRENT_YEAR}`
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/koszty.webp',
          imageAlt: 'Analiza kosztorysu i budżetu budowy domu'
        },
        {
          id: 'step-5',
          number: 5,
          icon: 'clipboardCheck', // Ikona dokumentacji
          label: 'Finał',
          title: 'Kompletna dokumentacja i pozwolenie (PnB)',
          content: [
            {
              type: 'paragraph',
              value: 'Biurokrację bierzemy na siebie. Przygotowujemy dokumentację w formie wymaganej przez aktualne Prawo budowlane (obowiązkowy podział na trzy tomy: PZT, PAB i PT).'
            },
            {
              type: 'paragraph',
              value: '**Twoja teczka zawiera:**'
            },
            {
              type: 'list',
              items: [
                '**PZT (Projekt zagospodarowania terenu):** mapa z wrysowanym budynkiem, zjazdami i przyłączami mediów.',
                '**PAB (Projekt architektoniczno-budowlany):** rzuty i elewacje niezbędne dla urzędu do wydania decyzji.',
                '**PT (Projekt techniczny):** szczegóły konstrukcyjne (zbrojenie) i instalacyjne, bez których kierownik budowy nie może legalnie rozpocząć prac.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Jako Twój pełnomocnik składamy wniosek i monitorujemy procedurę w starostwie, odpowiadając na ewentualne wezwania, aż do uzyskania prawomocnej decyzji o pozwoleniu na budowę.'
            },
            {
               // STRATEGICZNY LINK DO ARTYKUŁU EDUKACYJNEGO
               type: 'paragraph',
               value: `**Co dokładnie dostaniesz w teczce?** Sprawdź checklistę: Co musi zawierać projekt budowlany ${CURRENT_YEAR}?`
            }
          ],
          // Twoje oryginalne pliki
          imageSrc: '/images/uslugi/projektowanie/etapy/dokumentacja.webp',
          imageAlt: 'Gotowa dokumentacja projektowa z pozwoleniem na budowę'
        }
      ]
    },
// Sekcja 4: FAQ Sprzedażowe (Edukacja Inżynierska)
servicesAccordion: {
  header: {
    label: 'PYTANIA I ODPOWIEDZI',
    title: 'Kwestie prawne i budżetowe',
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
      iconName: 'shieldCheck', 
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
      iconName: 'mountain', // Ważne dla Twojej lokalizacji (Śląsk)
      title: 'Mam działkę ze szkodami górniczymi. Co z projektem?',
      content: [
        {
          type: 'paragraph',
          value: 'To nasza codzienność. Standardowy projekt nie przejdzie w starostwie bez **adaptacji konstrukcyjnej** do kategorii szkód (I-IV). Nasz konstruktor przeliczy fundamenty (najczęściej na płytę fundamentową) i zaprojektuje niezbędne dylatacje/wieńce, zgodnie z wytycznami GIG i lokalnym prawem geologicznym. Więcej: [Płyta fundamentowa na terenach górniczych](/baza-wiedzy/plyta-fundamentowa-tereny-gornicze).'
        }
      ]
    },
    {
      iconName: 'calendar',
      title: 'Ile realnie trwa uzyskanie pozwolenia na budowę (PnB)?',
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
          value: '**Tak, to jest istota modelu Design & Build.** Jeśli wycena wstępna wyjdzie za wysoka, nie zostawiamy Cię z problemem. Proponujemy zamienniki: np. tańsze okna, rezygnację z lukarny, zamianę ceramiki na gazobeton. Optymalizujemy projekt, aż "zepnie" się w Excelu.'
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
    description: 'Umów konsultację z architektem — pomożemy wybrać i zaadaptować projekt.',
  },
  contactInfo: {
    phone: '+48 664 123 757',
    email: 'biuro@coreltb.pl',
  },
  primaryButton: { text: 'Umów Konsultację', href: '/umow-konsultacje?usluga=projektowanie' },
},

    // SEO
    metaTitle: 'Projekty Domów i Adaptacje | Południowa Polska',
    metaDescription:
      'Profesjonalne projektowanie domów jednorodzinnych. Projekt zintegrowany z budową i budżetem. 15 lat doświadczenia. Indywidualne projekty i adaptacje. Bezpłatna konsultacja.',

    createdAt: '2025-01-24T10:00:00Z',
    updatedAt: '2025-01-24T10:00:00Z',
  },

// ============================================
  // 3. NADZÓR I KIEROWNIK BUDOWY (Filar Ekspercki B2B/B2C)
  // ============================================
  {
    slug: 'nadzor-i-doradztwo',
    id: 'nadzor-i-doradztwo',
    category: 'Nadzór techniczny',
    title: 'Kierownik budowy i inspektor nadzoru', // Główna fraza SEO (5000 vol)

    // Listing (karta na stronie /oferta)
    listing: {
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      title: 'Nadzór inwestorski',
      description: 'Twój człowiek na budowie. Niezależna kontrola jakości prac, odbiory mieszkań od dewelopera i weryfikacja umów.',
      features: [
        'Kontrola budżetu i harmonogramu',
        'Odbiory techniczne',
      ],
    },

    // PageHeader
    pageHeader: {
      title: 'Kierownik budowy i nadzór inwestorski',
      watermarkText: 'KONTROLA JAKOŚCI',
      backgroundImage: '/images/uslugi/nadzor-i-doradztwo/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Kierownik Budowy i nadzór', href: '/oferta/nadzor-i-doradztwo' },
      ],
    },

// Sekcja 1: HERO - Adwokat Techniczny Inwestora
emotionalHero: {
  label: 'KIEROWNIK BUDOWY Z UPRAWNIENIAMI • ŚLĄSK I MAŁOPOLSKA',
  headline: [
    'Niezależny nadzór inwestorski' 
  ],
  subtitle:
    'W budownictwie błędy kosztują fortunę. Jako Twój inspektor weryfikujemy prace, które ekipy ukrywają pod tynkiem lub w wykopie. Od zbrojenia na śląskich szkodach górniczych, przez szczelność izolacji, aż po prowadzenie Elektronicznego Dziennika Budowy (EDB). Gwarantujemy, że dom powstanie zgodnie ze sztuką, a nie "tak, jak majstrowi wygodniej".',
  
  benefits: [
    'Kontrola robót zanikowych (fundamenty, trzpienie, wieńce)', 
    'Bezwzględna weryfikacja kosztorysów pod kątem zawyżania ilości materiałów',
    'Diagnostyka sprzętowa (kamery termowizyjne, wilgotnościomierze, lasery)',
  ],
  
  // CTA Box - Konkretne usługi (Pieniądze)
  ctaBoxTitle: 'Zleć kontrolę budowy',
  ctaBoxBenefits: [
    'Objęcie funkcji Kierownika Budowy (cały proces)',
    'Nadzór Inwestorski (kontrola Twojego wykonawcy)',
    'Odbiór mieszkania od dewelopera (protokół usterek)',
    'Audyt techniczny trwającej budowy',
  ],
  ctaBoxSubtext: 'Ochrona kapitału przed błędami wykonawczymi.',
  ctaBoxButtons: [
    {
      text: 'Umów konsultację',
      href: '/umow-konsultacje?usluga=nadzor',
      variant: 'primary',
    },
    {
      text: 'Zadzwoń do nas',
      href: 'tel:+48664123757',
      variant: 'secondary',
    },
  ],
},

// Sekcja 2: PHILOSOPHY TIMELINE - Rygor i Kompetencje
philosophyTimeline: {
  header: {
    label: 'ROLA INSPEKTORA',
    title: 'Nie jesteśmy tu, żeby pić kawę z wykonawcą',
    description: 'Nadzór techniczny nie polega na „podbijaniu pieczątek” w dzienniku raz w tygodniu. Płacisz nam za to, abyśmy byli „niewygodni” dla ekipy budowlanej. Wchodzimy w wykopy, sprawdzamy klasy stali i jakość betonu. Jesteśmy Twoją polisą ubezpieczeniową przed fuszarką ukrytą pod tynkiem.',
  },
  items: [
    {
      number: 1,
      iconName: 'shield', // Ikona Tarczy
      title: 'Kontrola robót zanikowych',
      description: 'Największe błędy (np. brak ciągłości hydroizolacji, złe zakotwienie zbrojenia) stają się niewidoczne chwilę po wylaniu betonu. Nasz inspektor jest na budowie W TRAKCIE tych prac, a nie po fakcie. Nie pozwalamy na zalewanie "bylejakości".'
    },
    {
      number: 2,
      iconName: 'trendingUp',
      title: 'Blokada "robót dodatkowych"',
      description: 'Wykonawcy często próbują naciągnąć inwestora na dopłaty, twierdząc, że "projekt tego nie przewidział". Weryfikujemy zasadność każdego roszczenia finansowego wykonawcy. Jeśli zakres był w projekcie, nie zapłacisz za to ani złotówki więcej.'
    },
    {
      number: 3,
      iconName: 'award', 
      title: 'Wiedza o gruncie Śląska i Małopolski',
      description: 'Inspektor "teoretyk" nie zauważy problemów ze szkodami górniczymi czy pęczniejącą gliną. My jesteśmy stąd. Wiemy, jak powinien wyglądać fundament zabezpieczony pod IV kategorię szkód (np. w Rybniku) i wymuszamy na wykonawcy zachowanie tych rygorów technicznych.'
    }
  ],

  image: {
    src: '/images/uslugi/nadzor-i-doradztwo/filozofia-nadzoru.webp',
    alt: 'Inspektor nadzoru CoreLTB weryfikujący zbrojenie fundamentów z projektem konstrukcyjnym',
  },
},

  // Sekcja 3: Cooperation Timeline NoLine
  cooperationTimelineNoLine: {
    header: {
      label: 'ZAKRES NADZORU',
      title: 'Formy współpracy: Kierownik i Inspektor',
      description: 'Poznaj kluczowe elementy profesjonalnego nadzoru budowlanego. Wybierz poziom ochrony inwestycji dopasowany do Twoich potrzeb.',
    },
    steps: [
      {
        id: 'kierownik-vs-inspektor',
        number: 1,
        icon: 'users',
        label: 'Kierownik czy inspektor',
        title: 'Kierownik a Inspektor – Konflikt interesów?',
        content: [
          {
            type: 'paragraph',
            value: 'To nie są synonimy. Prawo budowlane nakłada obowiązek zatrudnienia kierownika, ale to Inspektor nadzoru inwestorskiego jest Twoim "agentem specjalnym". Zrozumienie różnicy to klucz do bezpieczeństwa Twoich pieniędzy.'
          },
          {
            type: 'list',
            items: [
              '**Kierownik budowy z uprawnieniami:** odpowiada za technologię, BHP i prowadzenie Dziennika Budowy (często elektronicznego EDB).',
              '**Inspektor nadzoru inwestorskiego:** funkcja nieobowiązkowa przy domach (chyba że urząd nakaże), ale kluczowa. Reprezentuje TYLKO CIEBIE, sprawdzając, czy kierownik i ekipa nie "zamietli błędów pod dywan".'
            ]
          },
          {
            type: 'paragraph',
            value: 'W CoreLTB działamy dwutorowo. Jeśli budujemy Twój dom – zapewniamy rzetelnego Kierownika Budowy. Jeśli budujesz z inną firmą – **wynajmij naszych Inspektorów, aby patrzyli im na ręce**.'
          },
          {
            // LINK SEO (Silos Tematyczny)
            type: 'paragraph',
            value: '**Wciąż nie masz pewności kogo potrzebujesz?** Przeczytaj: [Ile kosztuje kierownik budowy w 2026?](/baza-wiedzy/ile-kosztuje-kierownik-budowy) — stawki, obowiązki i porównanie z inspektorem nadzoru.'
          }
        ],
        imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/kierownik-vs-inspektor.webp',
        imageAlt: 'Spotkanie na budowie: Inwestor, Kierownik Budowy i Inspektor Nadzoru'
      },
        {
          id: 'kierownik-budowy',
          number: 2,
          icon: 'hardHat',
          label: 'Kierownik Budowy',
          title: 'Nadzór techniczny (nie "figurant")',
          content: [
            {
              type: 'paragraph',
              value: 'Zatrudnienie kierownika to wymóg Prawa Budowlanego, ale dla nas to fundament bezpieczeństwa konstrukcji. W CoreLTB Builders odcinamy się od praktyk "podbijania pieczątki". Nasz Kierownik to inżynier z uprawnieniami, który fizycznie weryfikuje poprawność prac przed każdym kluczowym etapem (tzw. prace zanikowe).'
            },
            {
              type: 'paragraph',
              value: '**Co realnie sprawdzamy na placu?**'
            },
            {
              type: 'list',
              items: [
                '**Odbiór zbrojenia:** Wchodzimy do wykopu i sprawdzamy średnice prętów, zakłady i dystanse *zanim* przyjedzie beton. To jedyny moment na uniknięcie błędu.',
                '**Kontrola Materiałów:** Weryfikujemy certyfikaty (Deklaracje Właściwości Użytkowych) betonu i stali. Nie pozwalamy na wbudowanie materiałów "no-name".',
                '**Prowadzenie Dokumentacji:** Rzetelne wpisy w Dzienniku Budowy oraz dbałość o BIOZ, co jest kluczowe przy kontrolach inspektora pracy lub PINB.',
                '**Optymalizacja:** Doradzamy wykonawcy, jak rozwiązać detale (np. szalunki), aby prace szły szybciej i taniej dla Inwestora.'
              ]
            },
            {
               // LINK DO KLASTRA: EDUKACJA
               type: 'paragraph',
               value: '**Za co odpowiada kierownik?** Sprawdź pełną listę obowiązków: Rola Kierownika Budowy w procesie inwestycyjnym'
            }
          ],
          // Twoje oryginalne zdjęcie
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/kierownik-budowy.webp',
          imageAlt: 'Kierownik Budowy CoreLTB odbierający zbrojenie płyty fundamentowej'
        },
        {
          id: 'inspektor-nadzoru',
          number: 3,
          icon: 'shield', // Ikona Tarczy (Ochrona)
          label: 'Inspektor Nadzoru',
          title: 'Inspektor Nadzoru - Twój pełnomocnik techniczny',
          content: [
            {
              type: 'paragraph',
              value: 'Budujesz firmą zewnętrzną i boisz się fuszerek? Inspektor to jedyna osoba na placu, która **nie jest opłacana przez wykonawcę**. To "policja budowlana", która w Twoim imieniu weryfikuje zgodność prac z projektem i sztuką. Działamy bezkompromisowo – jeśli ściana jest krzywa, nakazujemy jej rozebranie na koszt ekipy.'
            },
            {
              type: 'paragraph',
              value: '**Kiedy nas wezwać?**'
            },
            {
              type: 'list',
              items: [
                '**Przed zalaniem betonu:** Odbiór zbrojenia to najważniejszy moment budowy. Wykrywamy braki w ciągłości prętów, zanim znikną pod betonem.',
                '**Odbiór "Stanu Zero":** Sprawdzamy jakość izolacji fundamentów (bitumy, styrodur). Tu najczęściej wykonawcy oszczędzają, co grozi wilgocią po latach.',
                '**Spór z wykonawcą:** Gdy ekipa żąda dopłaty za "roboty dodatkowe", my weryfikujemy czy są one zasadne, czy wynikają z ich błędu.'
              ]
            },
            {
              type: 'paragraph',
              value: '**Twoja korzyść:** Nie musisz znać się na budowlance ani kłócić z majstrem. My używamy twardych argumentów inżynierskich, oszczędzając Twoje nerwy i pieniądze.'
            },
            {
                // LINK DO ARTYKUŁU O PUŁAPKACH
                type: 'paragraph',
                value: '**Na co uważać przy wyborze ekipy?** Przeczytaj: 5 najczęstszych błędów wykonawczych, które wykrywa Inspektor'
            }
          ],
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/inspektor-nadzoru.webp',
          imageAlt: 'Inspektor CoreLTB mierzący jakość zbrojenia i betonu'
        },
        {
          id: 'odbiory-techniczne',
          number: 4,
          icon: 'clipboardCheck',
          label: 'Odbiory techniczne',
          title: 'Odbiór techniczny i weryfikacja usterek',
          content: [
            {
              type: 'paragraph',
              value: 'To ostatni moment, by zmusić wykonawcę do darmowej naprawy błędów. Jeśli podpiszesz protokół odbioru bez uwag, za krzywe ściany czy porysowane okna zapłacisz z własnej kieszeni na etapie wykańczania wnętrz. Nasz inspektor wchodzi na budowę z chłodną głową i **profesjonalnym sprzętem pomiarowym** (niwelator laserowy, kamera termowizyjna, wilgotnościomierz).'
            },
            {
              type: 'paragraph',
              value: '**Co dyskwalifikuje odbiór? Sprawdzamy:**'
            },
            {
              type: 'list',
              items: [
                '**Geometria (Tynki/Wylewki):** Laserowa kontrola płaszczyzn i kątów prostych (krytyczne dla montażu mebli kuchennych i szaf wnękowych). Weryfikujemy zgodność z normą PN-B-10110.',
                '**Stolarka:** Szukamy rys na pakietach szybowych (zgodnie z normą PN-EN 1279), sprawdzamy regulację okuć oraz szczelność montażu kamerą termowizyjną (przedmuchy).',
                '**Wilgotność:** Mierzymy wilgotność wylewek (metoda CM). Położenie podłogi na mokry podkład to gwarantowane zniszczenie paneli.',
                '**Zgodność z Projektem:** Czy gniazdka są tam, gdzie miały być? Czy otwory drzwiowe mają normową wysokość?'
              ]
            },
            {
              // WAŻNY LINK - Przykład usterek
              type: 'paragraph',
              value: '**Efekt:** Otrzymujesz Protokół Usterek, który jest podstawą prawną do żądania napraw. Zobacz: Lista najczęstszych usterek deweloperskich na Śląsku'
            }
          ],
          imageSrc: '/images/uslugi/nadzor-i-doradztwo/etapy/odbiory-techniczne.webp',
          imageAlt: 'Inspektor CoreLTB wykonujący pomiar laserowy tynków podczas odbioru'
        },
      ],
    },

// Sekcja 4: FAQ - Obrona Inwestora i Pieniądze
servicesAccordion: {
  header: {
    label: 'PYTANIA INWESTORA',
    title: 'Kwestie prawne i koszty bezpieczeństwa',
    description: 'Konkretne odpowiedzi o zakres odpowiedzialności, ceny i sens zatrudniania inspektora nadzoru.',
  },
  services: [
    {
      iconName: 'wallet', 
      title: 'Czy nadzór mi się opłaci? (Koszt vs Zysk)',
      content: [
        {
          type: 'paragraph',
          value: 'Koszt Inspektora Nadzoru to zazwyczaj **1-2% wartości inwestycji**. To promil w porównaniu do kosztów naprawy źle zaizolowanych fundamentów (często 50-100 tys. zł po kilku latach eksploatacji).'
        },
        {
          type: 'paragraph',
          value: 'Nasza usługa często "zarabia na siebie" już przy pierwszej kontroli, gdy blokujemy niezasadne faktury wykonawcy za rzekome "roboty dodatkowe" lub wymuszamy użycie stali właściwej klasy zamiast tańszego zamiennika.'
        }
      ]
    },
    {
      iconName: 'users',
      title: 'Dlaczego nie wystarczy sam Kierownik Budowy?',
      content: [
        {
          type: 'paragraph',
          value: 'Funkcje te się nie dublują. W praktyce rynkowej Kierownik jest często zatrudniony przez firmę wykonawczą, co rodzi **konflikt interesów**. Jemu zależy na szybkim postępie prac ("żeby przerobić").'
        },
        {
          type: 'paragraph',
          value: '**Inspektor nadzoru inwestorskiego** zależy wyłącznie na Twoim interesie. Jesteśmy jedyną osobą techniczną na budowie, której wykonawca nie płaci, więc nie mamy powodu, by przymykać oko na błędy.'
        }
      ]
    },
    {
      iconName: 'home', // Odbiory mieszkań (Money Keyword)
      title: 'Czy odbieracie też mieszkania od dewelopera?',
      content: [
        {
          type: 'paragraph',
          value: '**Tak, to jedna z naszych głównych usług.** Deweloperzy często liczą na niewiedzę kupującego. My przychodzimy z normami (kąty, płaszczyzny tynków PN-B-10110) i kamerą termowizyjną. Znajdujemy mostki termiczne, porysowane szyby i brak kątów prostych w kuchni.'
        },
        {
           // LINK SEO: USTERKI DEWELOPERSKIE
           type: 'paragraph',
           value: '**Idziesz na odbiór sam?** Zobacz, co możesz przeoczyć: Lista najczęstszych usterek deweloperskich na Śląsku'
        }
      ]
    },
    {
      iconName: 'calendarRange', 
      title: 'Kiedy wzywać Inspektora na budowę?',
      content: [
        {
          type: 'paragraph',
          value: 'Nie musimy być na budowie codziennie, ale musimy być w momentach krytycznych – przy tzw. **pracach zanikających**. Gdy wyleją beton, jest już za późno na kontrolę zbrojenia.'
        },
        {
          type: 'paragraph',
          value: '**Kluczowe momenty wizyt:**'
        },
        {
          type: 'list',
          items: [
            'odbiór zbrojenia ław lub płyty fundamentowej (przed betonowaniem),',
            'weryfikacja izolacji przeciwwilgociowych (przed zasypaniem),',
            'kontrola więźby dachowej i warstw pokrycia,',
            'sprawdzenie poprawności wykonania dylatacji (szczególnie na szkodach górniczych).'
          ]
        }
      ]
    },
    {
      iconName: 'alertTriangle',
      title: 'Buduję na szkodach górniczych. Czy nadzór jest konieczny?',
      content: [
        {
          type: 'paragraph',
          value: '**Tak, to inżynierska konieczność.** Na terenach IV kategorii szkód (Rybnik, Jastrzębie, Wodzisław) budynek jest poddawany potężnym siłom. Wykonawcy z innych regionów często bagatelizują te wymogi.'
        },
        {
          type: 'paragraph',
          value: 'Nasz Inspektor weryfikuje zgodność zbrojenia (zagęszczone strzemiona, podwójne siatki) co do jednego pręta. Bez tego Twój dom może popękać przy pierwszym silniejszym wstrząsie.'
        }
      ]
    },
    {
      iconName: 'fileCheck',
      title: 'Co jeśli wykonawca nie chce poprawić błędu?',
      content: [
        {
          type: 'paragraph',
          value: 'Dokonujemy wpisu do Dziennika Budowy i wstrzymujemy etap prac. Wykonawca nie otrzyma zapłaty, dopóki wada nie zostanie usunięta. W razie sporu sądowego, nasza dokumentacja jest Twoim **najmocniejszym dowodem**. Działamy jak Twój techniczny adwokat.'
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

    // Sekcja 6: Obszary działania — kierownik budowy w miastach
    areasData: {
      header: {
        label: 'KIEROWNIK BUDOWY W TWOIM MIEŚCIE',
        title: 'Nadzór budowlany na Śląsku',
        description: 'Działamy w całym województwie śląskim. Wybierz swoje miasto i sprawdź cennik oraz zakres usług kierownika budowy.',
        align: 'center' as const,
        theme: 'light' as const,
      },
      hubs: [
        {
          hubName: 'Miasta',
          subLabel: '',
          iconName: 'mapPin' as const,
          description: 'Sprawdź szczegółowy cennik i zakres usług kierownika budowy w Twoim mieście.',
          cities: [
            { label: 'Katowice', url: '/kierownik-budowy-katowice', context: 'Cennik od 5 000 zł' },
            { label: 'Jaworzno', url: '/kierownik-budowy-jaworzno', context: 'Cennik od 5 000 zł' },
            { label: 'Wodzisław Śląski', url: '/kierownik-budowy-wodzislaw-slaski', context: 'Cennik od 5 000 zł' },
          ]
        }
      ]
    },

    // Sekcja 7: ContactCTA
    contactCTA: {
      header: {
        label: 'ZABEZPIECZ SWOJĄ INWESTYCJĘ',
        title: 'Każdy dzień bez nadzoru to Ryzyko',
        description: 'Umów bezpłatną konsultację i dowiedz się, jak chronimy Twoją budowę przed kosztownymi błędami.',
      },
      contactInfo: {
        phone: '+48 664 123 757',
        email: 'biuro@coreltb.pl',
      },
      primaryButton: { text: 'Umów Konsultację', href: '/umow-konsultacje?usluga=nadzor' },
    },

    // SEO
    metaTitle: 'Nadzór budowlany | CoreLTB Builders - Ochrona twojej inwestycji',
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
  title: 'Geologia i Geodezja',

  // Listing (karta na stronie /oferta)
  listing: {
    image: '/images/uslugi/uslugi-techniczne/etapy/geodezja.webp',
    title: 'Usługi techniczne: geologia, geodezja, kosztorys',
    description: 'Twarde dane przed startem. Odwierty geotechniczne, badanie nośności glin, mapy MDCP i tyczenie osi budynków.',
    features: [
      'Badania geologiczne i geotechniczne',
      'Pomiary geodezyjne i kosztorysy',
    ],
  },

  // PageHeader
  pageHeader: {
    // H1 ZOPTYMALIZOWANY POD FRAZY (Vol: 5k + 5k)
    title: 'Geologia i geodezja: Badania geotechniczne i mapy',
    watermarkText: 'USŁUGI INŻYNIERSKIE',
    backgroundImage: '/images/uslugi/uslugi-techniczne/hero.webp',
    breadcrumbs: [
      { label: 'Strona główna', href: '/' },
      { label: 'Oferta', href: '/oferta' },
      { label: 'Geologia i Geodezja', href: '' },
    ],
  },

  // Sekcja 1: HERO - Diagnostyka Gruntu (Intencja: Bezpieczeństwo i Prawo)
  emotionalHero: {
    label: 'USŁUGI INŻYNIERSKIE • DIAGNOSTYKA GRUNTU',
    headline: [
      'Nie buduj w ciemno.',
      'Twarde dane przed wbiciem łopaty.'
    ],
    subtitle:
      'Inwestycja na Śląsku lub w Małopolsce bez badań gruntu to ryzyko finansowe. Grunty wysadzinowe (gliny), szkody górnicze czy niekontrolowane nasypy mogą podwoić koszt fundamentów. Dostarczamy precyzyjną diagnostykę: odwierty geotechniczne, mapy do celów projektowych i rzetelne kosztorysy, które chronią Twój budżet przed niespodziankami.',
    benefits: [
      'Badania geotechniczne: wykrywamy wody gruntowe i grunty nienośne',
      'Geodezja: wykonujemy mapy do celów projektowych i tyczenie budynków',
      'Kosztorysowanie: dokumentacja niezbędna do banku (transze) i kontroli wykonawcy',
    ],
    
    // CTA Box - Agresywne nastawienie na usługi "na już"
    ctaBoxTitle: 'Wstępny audyt działki',
    ctaBoxBenefits: [
      'Analiza przydatności gruntu pod zabudowę',
      'Weryfikacja granic prawnych (wznowienie znaków)',
      'Wycena Mapy do celów projektowych (MDCP)',
      'Ocena ryzyka szkód górniczych (Okręg Rybnicki/Śląsk)',
    ],
    ctaBoxSubtext: 'Raport techniczny niezbędny do rozpoczęcia budowy.',
    ctaBoxButtons: [
      {
        text: 'Zamów analizę działki',
        href: '/analiza-dzialki',
        variant: 'primary',
      },
      {
        text: 'Zadzwoń do nas',
        href: 'tel:+48664123757',
        variant: 'secondary',
      },
    ],
  },

// Sekcja 2: DLACZEGO WARTO BADAĆ? (USP Diagnostyczne)
philosophyTimeline: {
  header: {
    label: 'DIAGNOSTYKA INWESTYCJI',
    title: 'Błąd na papierze kosztuje grosze. Błąd na budowie – tysiące.',
    description: 'Budownictwo nie wybacza "gdybania". Geologia i Geodezja to najtańsze ubezpieczenie Twojego kapitału. Wykrywamy grunty nienośne, kolizje prawne i ryzyka budżetowe, zanim wjadą koparki.',
    theme: 'light',
  },
  items: [
    {
      number: 1,
      iconName: 'pickaxe',
      title: 'Geotechnika: unikasz wymiany gruntu',
      description:
        'Najczęstszy powód nagłych dopłat? "Wyszły torfy" albo "nasyp niekontrolowany". Nasze badania geotechniczne pokazują prawdę. Dowiesz się, czy możesz stawiać dom na ławach, czy grunt wymaga kosztownej wymiany lub płyty.',
    },
    {
      number: 2,
      iconName: 'ruler',
      title: 'Geodezja: precyzja prawna (MDCP)',
      description:
        'Od mapy do celów projektowych po inwentaryzację. Nasz geodeta pilnuje granic. Przesunięcie budynku o 20 cm względem planu zagospodarowania może skutkować nakazem rozbiórki. My tego pilnujemy.',
    },
    {
      number: 3,
      iconName: 'calculator',
      title: 'Kosztorys: twarde dane dla banku',
      description:
        'Nie daj się nabrać na wyceny "z sufitu". Tworzymy profesjonalny przedmiar robót i kosztorys inwestorski oparty na cenach rynkowych 2026. To Twoja tarcza w negocjacjach z bankiem i wykonawcami.',
    },
  ],
  image: {
    src: '/images/uslugi/uslugi-techniczne/filozofia-pomiary.webp',
    alt: 'Badania geotechniczne gruntu na działce budowlanej',
  },
},

// Sekcja 3: PROCES USŁUG TECHNICZNYCH (4 Kroki)
cooperationTimelineNoLine: {
  header: {
    label: 'ZAKRES EKSPERTYZ I POMIARÓW',
    title: 'Kompleksowa obsługa inżynierska',
    description: 'Budownictwo na Śląsku i w Małopolsce to wyzwanie geologiczne i formalne. Dostarczamy twarde dane, które pozwalają projektować bezpiecznie. Obsługujemy cały cykl: od mapy i odwiertów, przez kosztorys, aż po świadectwo energetyczne.',
  },
  steps: [
    {
      id: 'uslugi-geodezyjne',
      number: 1,
      icon: 'mapPin',
      label: 'Geodezja',
      title: 'Pełna obsługa geodezyjna (MDCP i tyczenie)',
      content: [
        {
          type: 'paragraph',
          value: 'Błąd w usytuowaniu budynku o 10 cm może skutkować wstrzymaniem budowy przez PINB lub wieloletnim sporem prawnym. Geodeta to nie tylko "człowiek od mapy", to gwarant legalności inwestycji. W CoreLTB Builders koordynujemy prace geodezyjne tak, aby dokumentacja wyprzedzała postęp prac.'
        },
        {
          type: 'paragraph',
          value: '**Zakres prac geodezyjnych:**'
        },
        {
          type: 'list',
          items: [
            '**MDCP (mapa do celów projektowych):** aktualizujemy mapę zasadniczą, nanosząc realne uzbrojenie terenu. To baza dla architekta – bez tego nie złożysz wniosku o PnB.',
            '**Tyczenie osi i "punktu zero":** przed wjazdem koparki geodeta wyznacza fizycznie w terenie obrys fundamentów oraz (co kluczowe) poziom posadzki parteru ("Zero"), aby dom nie był posadowiony za nisko względem drogi.',
            '**Inwentaryzacja powykonawcza:** końcowy pomiar, który nanosi gotowy budynek i przyłącza na państwowe mapy zasobów (klauzula ośrodka geodezji).'
          ]
        },
        {
          type: 'paragraph',
          value: 'Dzięki stałej współpracy z lokalnymi geodetami, mapy otrzymujemy szybciej niż klient indywidualny.'
        }
      ],
      imageSrc: '/images/uslugi/uslugi-techniczne/etapy/geodezja.webp',
      imageAlt: 'Geodeta wykonujący tyczenie budynku tachimetrem na budowie'
    },
    {
      id: 'badania-geologiczne',
      number: 2,
      icon: 'layers',
      label: 'Geologia',
      title: 'Badania geotechniczne gruntu i wody',
      content: [
        {
          type: 'paragraph',
          value: 'Dla nas projektowanie fundamentów bez odwiertów to hazard. Specyfika gruntów na Śląsku i w Małopolsce (częste gliny, kurzawki, tereny poeksploatacyjne) wymaga twardych danych. **Opinia geotechniczna** jest dokumentem obowiązkowym do Projektu Budowlanego, ale jej jakość decyduje o kosztach "wyjścia z ziemi".'
        },
        {
          type: 'paragraph',
          value: '**Co realnie sprawdzamy wiercąc w ziemi?**'
        },
        {
          type: 'list',
          items: [
            '**Warstwy nienośne:** wykrywamy nasypy niekontrolowane (częste na działkach "okazyjnych"), torfy i namuły, na których nie wolno bezpośrednio budować.',
            '**Zwierciadło wody:** ustalamy, czy woda gruntowa nie zaleje fundamentów. To podstawa do zaprojektowania drenażu opaskowego lub hydroizolacji ciężkiej.',
            '**Rodzaj gruntu (kategoria geotechniczna):** to decyduje o technologii. Na glinach wysadzinowych rekomendujemy płytę fundamentową, na piaskach wystarczą tańsze ławy.'
          ]
        },
        {
          // LINK: Baza wiedzy (Technologia/Geologia)
          type: 'paragraph',
          value: '**Budujesz na szkodach górniczych?** Sprawdź, jak dobrać fundamenty: [Płyta fundamentowa na terenach górniczych — poradnik inżyniera](/baza-wiedzy/plyta-fundamentowa-tereny-gornicze)'
        }
      ],
      imageSrc: '/images/uslugi/uslugi-techniczne/etapy/geologia.webp',
      imageAlt: 'Geolog wykonujący odwiert mechaniczny sondą na działce'
    },
{
  id: 'kosztorysowanie-budowlane',
  number: 3,
  icon: 'wallet',
  label: 'Finanse',
  title: 'Kosztorysowanie i harmonogramy do banku',
  content: [
    {
      type: 'paragraph',
      value: `W procesie inwestycyjnym nie ma miejsca na wróżenie z fusów. Niedoszacowany budżet to najczęstsza przyczyna wstrzymania budowy w połowie. W CoreLTB tworzymy kosztorysy oparte o **bieżące stawki transakcyjne na rok ${CURRENT_YEAR}**, a nie o teoretyczne tabele katalogowe, które często nie nadążają za inflacją.`
    },
    {
      type: 'list',
      items: [
        '**Kosztorys Bankowy (Inwestorski):** Przygotowujemy **Harmonogram Rzeczowo-Finansowy** wymagany przy kredycie hipotecznym. Dzielimy budowę na etapy logiczne dla analityka bankowego, co gwarantuje płynne uruchamianie kolejnych transz pieniędzy (brak zatorów płatniczych).',
        '**Przedmiar Robót:** To precyzyjne wyliczenie ilości materiałów (ilość cegieł, m³ betonu, kg stali) wynikające z projektu. Dzięki temu dokumencie wiesz dokładnie, ile materiału zamówić i nikt nie oszuka Cię na "nadmiarach" czy fikcyjnych obmiarach prac.'
      ]
    },
    {
       // KLUCZOWY LINK - Wysyłamy klienta do cennika
       type: 'paragraph',
       value: `**Sprawdź realia:** Ile naprawdę kosztuje dom w ${CURRENT_YEAR}? Zobacz Raport Kosztów Budowy (Analiza Rynku)`
    }
  ],
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/kosztorysowanie.webp',
  imageAlt: 'Analiza harmonogramu rzeczowo-finansowego budowy dla banku'
},

{
  id: 'swiadectwa-energetyczne',
  number: 4,
  icon: 'fileBadge',
  label: 'Certyfikacja',
  title: 'Świadectwa charakterystyki energetycznej',
  content: [
    {
      type: 'paragraph',
      value: 'Świadectwo to techniczny paszport budynku. Od 2023 roku jest to dokument obowiązkowy na każdym etapie cyklu życia nieruchomości. Dokument ten określa wskaźniki zapotrzebowania na energię (EP i EK), weryfikując czy budynek jest energooszczędny, czy generuje straty ciepła.'
    },
    {
      type: 'list',
      items: [
        '**Do odbioru budynku (PINB):** świadectwo jest niezbędnym załącznikiem do zawiadomienia o zakończeniu budowy. Bez ważnego certyfikatu nadzór budowlany nie wyda pozwolenia na użytkowanie, przez co nie możesz legalnie zamieszkać w domu.',
        '**Przy sprzedaży i wynajmie:** notariusz ma obowiązek zażądać świadectwa przy akcie notarialnym. Dla kupującego to twardy dowód na to, ile będzie kosztowało ogrzewanie domu, co jest silnym argumentem cenowym.',
        '**Pewność prawna:** nasze dokumenty są sporządzane przez uprawnionych audytorów i rejestrowane w centralnym rejestrze charakterystyki energetycznej budynków (MRiT), co gwarantuje ich ważność przez 10 lat.'
      ]
    },
    {
       // LINK
       type: 'paragraph',
       value: '**Ważne dla inwestora:** certyfikat to test jakości izolacji. Zobacz, jak budujemy, żeby wyniki były doskonałe: [Dom energooszczędny - przewodnik 2026](/baza-wiedzy/dom-energooszczedny-slask)'
    }
  ],
  // Zdjęcie zostaje Twoje stare
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/swiadectwa-energetyczne.webp',
  imageAlt: 'Analiza energetyczna budynku do odbioru PINB'
},
// Krok 5: Ekspertyzy i Doradztwo Techniczne

{
  id: 'ekspertyzy-techniczne',
  number: 5,
  icon: 'search',
  label: 'Diagnostyka',
  title: 'Ekspertyzy i opinie techniczne',
  content: [
    {
      type: 'paragraph',
      value: 'Rynek wtórny to ryzyko ukrytych wad, zwłaszcza w regionie narażonym na wstrząsy górnicze. Wykonujemy szczegółowe ekspertyzy techniczne, weryfikując nośność konstrukcji, stan izolacji oraz przyczyny degradacji budynku. Używamy profesjonalnego sprzętu pomiarowego (kamery termowizyjne, skanery wilgotności), zamieniając domysły na twarde dane.'
    },
    {
      type: 'list',
      items: [
        '**Audyt przed zakupem:** weryfikujemy stan domów "z drugiej ręki". Oceniamy, czy pęknięcia elewacji to tylko kosmetyka, czy poważne naruszenie konstrukcji (np. przez szkody górnicze). Nasz raport to twardy argument do obniżenia ceny zakupu nieruchomości.',
        '**Diagnostyka zawilgoceń:** precyzyjnie określamy źródło wilgoci (woda gruntowa, awaria instalacji czy mostek termiczny) i dobieramy technologię osuszania oraz naprawy izolacji.',
        '**Odbiory i spory:** przygotowujemy opinie techniczne niezbędne w sporach z deweloperami lub nierzetelnymi wykonawcami. Dokumentujemy błędy wykonawcze zgodnie ze sztuką budowlaną, co stanowi podstawę do roszczeń.'
      ]
    },
    {
      type: 'paragraph',
      value: 'Ekspertyza kosztuje ułamek wartości domu, a pozwala uniknąć zakupu obiektu, którego remont przekroczy koszt budowy nowego. Działamy na terenie Śląska i Małopolski.'
    }
  ],
  imageSrc: '/images/uslugi/uslugi-techniczne/etapy/ekspertyzy-techniczne.webp',
  imageAlt: 'Rzeczoznawca budowlany wykonujący ekspertyzę techniczną pęknięcia ściany'
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

// Sekcja 4: FAQ (Pytania Techniczne i Prawne - Wersja 2026 SEO)
servicesAccordion: {
  header: {
    label: 'FAQ INŻYNIERSKIE',
    title: 'Geodezja i geologia w pytaniach',
    description: 'Odpowiedzi na techniczne aspekty przygotowania inwestycji, które najczęściej słyszymy od Inwestorów.',
  },
  services: [
    // --- GEODEZJA ---
    {
      iconName: 'map', 
      title: 'Ile kosztuje i ile trwa mapa do celów projektowych (MDCP)?',
      content: [
        {
          type: 'paragraph',
          value: 'Dla standardowej działki jednorodzinnej na Śląsku koszt to zazwyczaj **1400–2000 zł netto**. Cena i czas zależą od powiatowego ośrodka dokumentacji (ODGiK).'
        },
        {
          type: 'paragraph',
          value: '**Czas oczekiwania:** Średnio 3-6 tygodni. Nie da się tego przyspieszyć "za dopłatą", ponieważ jest to procedura urzędowa. Zalecamy zlecenie mapy geodecie natychmiast po zakupie gruntu.'
        }
      ]
    },
    // --- GEOLOGIA (Money Keyword: Szkody Górnicze) ---
    {
      iconName: 'mountain', 
      title: 'Czy badania geotechniczne wykryją szkody górnicze?',
      content: [
        {
          type: 'paragraph',
          value: '**Nie bezpośrednio.** Odwierty geotechniczne pokazują, co fizycznie jest w ziemi (glina, piasek, woda). Kategorię szkód (I-IV) ustala się na podstawie **Opinii Geologiczno-Górniczej** z kopalni (PGG/WUG).'
        },
        {
          type: 'paragraph',
          value: 'Dopiero połączenie tych dwóch dokumentów (Wyniki wierceń + Opinia o szkodach) pozwala konstruktorowi dobrać bezpieczne fundamenty (często płytę), które nie pękną przy wstrząsie.'
        }
      ]
    },
    // --- KOSZTY (Value Engineering) ---
    {
      iconName: 'coins',
      title: 'Dlaczego warto zapłacić za odwierty geologiczne?',
      content: [
        {
          type: 'paragraph',
          value: 'Badanie gruntu to koszt rzędu 1500–2000 zł. Rezygnacja z niego to oszczędność pozorna. Jeśli konstruktor nie zna gruntu, zakłada "najgorszy wariant" i przewymiarowuje fundamenty, co kosztuje Cię dodatkowe 10-15 tys. zł w betonie i stali.'
        },
        {
          type: 'paragraph',
          value: 'Nasze motto: **Badamy grunt, żeby nie topić Twoich pieniędzy w błocie.**'
        }
      ]
    },
    // --- KOSZTORYS (Bankowość) ---
    {
      iconName: 'landmark',
      title: 'Czym różni się kosztorys inwestorski od bankowego?',
      content: [
        {
          type: 'paragraph',
          value: '**Kosztorys bankowy** jest uproszczony i musi pasować do formularzy banku, aby analityk mógł uruchomić kredyt (bazuje na wskaźnikach).'
        },
        {
          type: 'paragraph',
          value: '**Kosztorys inwestorski (wykonawczy)** jest precyzyjny co do śrubki. Służy do tego, abyś wiedział, ile realnie wydasz. W CoreLTB przygotowujemy dokumentację zgodną z cenami rynkowymi 2026, eliminując ryzyko niedoszacowania inwestycji.'
        }
      ]
    },
    // --- PRAWO/CERTYFIKATY ---
    {
      iconName: 'fileBadge',
      title: 'Kiedy obowiązkowe jest Świadectwo Energetyczne?',
      content: [
        {
          type: 'paragraph',
          value: 'Zgodnie z przepisami, świadectwo jest wymagane przy **zawiadomieniu o zakończeniu budowy** (odbiorze w PINB). Bez tego dokumentu zarejestrowanego w centralnym rejestrze, nadzór budowlany nie wyda pozwolenia na użytkowanie.'
        },
        {
          type: 'paragraph',
          value: 'Dla naszych klientów wystawiamy ten dokument systemowo, po wykonaniu audytu powykonawczego (często sprawdzamy też szczelność budynku kamerą termowizyjną).'
        }
      ]
    },
    {
      iconName: 'search', // Ekspertyzy
      title: 'Czy wykonujecie audyty domów z rynku wtórnego?',
      content: [
        {
          type: 'paragraph',
          value: 'Tak. Kupno domu na Śląsku "na oko" to błąd. Wykonujemy **ekspertyzy techniczne** weryfikujące: zawilgocenia (kamerą termowizyjną), spękania murów od szkód górniczych oraz stan więźby dachowej. Raport z takiej wizyty często pozwala wynegocjować obniżkę ceny nieruchomości znacznie przewyższającą koszt naszej usługi.'
        }
      ]
    }
  ]
},

    // Sekcja 6: ContactCTA
    contactCTA: {
      header: {
        label: 'ZBUDUJ NA PEWNYCH FUNDAMENTACH',
        title: 'Każdy Dom Zaczyna Się od Danych',
        description:
          'Zamów analizę działki — sprawdzimy grunt, MPZP i uzbrojenie zanim wydasz pół miliona złotych.',
      },
      contactInfo: {
        phone: '+48 664 123 757',
        email: 'biuro@coreltb.pl',
      },
      primaryButton: { text: 'Zamów Analizę Działki', href: '/analiza-dzialki' },
    },

    // SEO
    metaTitle: 'Usługi Techniczne - Ekspertyzy i Pomiary | CoreLTB Builders',
    metaDescription:
      'Profesjonalne badania gruntu, pomiary geodezyjne i kosztorysy budowlane. Chronimy Twoją inwestycję przed kosztownymi błędami. 15 lat doświadczenia. Bezpłatna konsultacja.',

    createdAt: '2025-10-28T10:00:00Z',
    updatedAt: '2025-10-28T10:00:00Z',
  },
// ============================================
// 5. WYKOŃCZENIA (Filar B2C)
// ============================================
{
  slug: 'wykonczenia-i-aranzacje', // PRZYWRÓCONE TWOJE ID
  id: 'wykonczenia-i-aranzacje',   // PRZYWRÓCONE TWOJE ID
  category: 'Wykończenia i aranżacje',
  title: 'Wykończenia i aranżacje wnętrz',

  // Listing (karta na stronie /oferta)
  listing: {
    image: '/images/uslugi/wykonczenia-i-aranzacje/etapy/aranzacja.webp',
    title: 'Wykończenia i aranżacje',
    description: 'Prace \'pod klucz\' z preferencyjnym 8% VAT na materiały. Instalacje, posadzki, gładzie maszynowe – bez szukania ekip.',
    features: [
      'Najwyższej jakości materiały',
      'Dbałość o każdy detal',
    ],
  },

  // PageHeader
  pageHeader: {
    title: 'Kompleksowe wykończenia wnętrz  pod klucz',
    watermarkText: 'REALIZACJA WNĘTRZ',
    // UWAGA: Sprawdź czy plik leży tutaj, czy w folderze 'wykonczenia'. 
    // Zostawiam zgodne ze slugiem, jeśli masz inne - podmień tylko to.
    backgroundImage: '/images/uslugi/wykonczenia-i-aranzacje/hero.webp', 
    breadcrumbs: [
      { label: 'Strona główna', href: '/' },
      { label: 'Oferta', href: '/oferta' },
      { label: 'Wykończenia i aranżacje', href: '' },
    ],
  },

  // Sekcja 1: HERO - Argumentacja Finansowa i Logistyczna
  emotionalHero: {
    label: 'WYKOŃCZENIA POD KLUCZ • ŚLĄSK I MAŁOPOLSKA',
    headline: [
      'Jeden wykonawca',
      'zamiast pięciu różnych ekip'
    ],
    subtitle:
      'Etap wykończeniowy generuje najwięcej problemów logistycznych. Jako generalny wykonawca eliminujemy konieczność koordynowania hydraulika, płytkarza i stolarza. Przejmujemy klucze do stanu deweloperskiego i oddajemy gotowe, posprzątane wnętrze. Dajemy jedną, zbiorczą rękojmię na całość prac.',
    
    benefits: [
      'VAT 8% na materiały (realna oszczędność 15% względem zakupów w markecie)',
      'Gwarancja stałej ceny ryczałtowej za całość robocizny i chemii budowlanej',
      'Koordynacja branżowa (elektryk i tynkarz w jednym harmonogramie)',
    ],
    
    // CTA Box - Konkret finansowy + Weryfikacja techniczna
    ctaBoxTitle: 'Kosztorys prac wykończeniowych',
    ctaBoxBenefits: [
      'Odbiór techniczny tynków i wylewek przed startem prac (geometria)',
      'Wycena "na gotowo" (z klejami, gruntami i transportem)',
      'Dobór materiałów (płytki, panele) w założonym budżecie',
      'Realny harmonogram wejścia i wyjścia ekip',
    ],
    ctaBoxSubtext: 'Otrzymaj precyzyjną wycenę opartą o pomiar laserowy.',
    ctaBoxButtons: [
      {
        text: 'Umów konsultację',
        href: '/umow-konsultacje?usluga=wykonczenia',
        variant: 'primary',
      },
      {
        text: 'Zadzwoń do nas',
        href: 'tel:+48664123757',
        variant: 'secondary',
      },
    ],
  },
// Sekcja 2: DLACZEGO WARTO (Filozofia Wykonawcza)
philosophyTimeline: {
  header: {
    label: 'SYSTEM REALIZACJI WNĘTRZ',
    title: 'Budowa pod klucz zamiast "pilnowania ekip"', // Konkret
    description: 'Wykończenie to logistyka setek produktów i koordynacja 5-7 różnych branż. W CoreLTB Builders zastępujemy chaos "systemu gospodarczego" (gdzie Ty jesteś kierownikiem budowy) profesjonalnym procesem "fit-out". Przejmujemy klucze i odpowiedzialność.',
  },
  items: [
    {
      number: 1,
      iconName: 'users',
      title: 'Eliminacja kolizji branżowych', // Małe litery!
      description: 'Hydraulik nie czeka na ścianki działowe, a parkieciarz nie wchodzi na mokrą posadzkę. Nasz koordynator zarządza harmonogramem liniowo. Eliminujemy klasyczną "spychologię" i przerzucanie winy między glazurnikiem a instalatorem.',
    },
    {
      number: 2,
      iconName: 'fileCheck',
      title: 'Umowa na stałą kwotę (ryczałt)',
      description: 'Wycena "na oko" to standard u małych ekip. U nas podpisujesz precyzyjną umowę z przedmiarem robót. Cena za m² gładzi czy montażu płytek jest zablokowana w dniu startu, co chroni Twój portfel przed nieplanowanymi wydatkami.',
    },
    {
      number: 3,
      iconName: 'ruler', // Ikona miarki/jakości (award jest zbyt ogólne)
      title: 'Techniczne odbiory jakości',
      description: 'Nie uznajemy "jakoś to będzie". Używamy laserów krzyżowych do weryfikacji płaszczyzn i lamp inspekcyjnych przy gładziach. Otrzymujesz standard wykonania zgodny z normami budowlanymi, objęty pisemną rękojmią firmy.',
    }
  ],
  // Twoja ścieżka do zdjęcia - NIE RUSZAM JEJ
  image: {
    src: '/images/uslugi/wykonczenia-i-aranzacje/dlaczego-warto.webp',
    alt: 'Koordynator CoreLTB weryfikujący jakość gładzi lampą inspekcyjną',
  },
},
cooperationTimelineNoLine: {
  header: {
    label: 'MODEL REALIZACJI',
    title: 'Prace wykończeniowe etap po etapie',
    description: 'Nie zaczynamy prac "na żywioł". Proces fit-out (wykończenia) dzielimy na etapy logiczne, aby uniknąć kolizji między tynkarzem, hydraulikiem a stolarzem.',
    theme: 'light',
  },
  steps: [
    {
      id: 'kosztorys-wykonczeniowy',
      number: 1,
      icon: 'fileCheck',
      label: 'Wycena',
      title: 'Inwentaryzacja i kosztorys wykonawczy',
      content: [
        {
          type: 'paragraph',
          value: 'Dobre wykończenie zaczyna się od weryfikacji tego, co zostawił deweloper. Przed przygotowaniem wyceny wykonujemy **inwentaryzację z natury**. Sprawdzamy kąty ścian, poziomy wylewek i wilgotność tynków.'
        },
        {
          type: 'list',
          items: [
            'szczegółowy przedmiar robót (ilość m² gładzi, mb płytek).',
            'koszty chemii budowlanej (nie martwisz się o braki).',
            'logistykę dostaw i wniesienia (ukryty koszt).'
          ]
        },
        {
           // 🔥 KLUCZOWY LINK: Odsyłamy do usługi odbiorów
           type: 'paragraph',
           value: '**Odbierasz mieszkanie?** Sprawdź naszą usługę [Profesjonalne Odbiory Techniczne od Dewelopera](/oferta/uslugi-techniczne)'
        }
      ],
      imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/kosztorys.webp',
      imageAlt: 'Inżynier wykonujący pomiary laserowe do kosztorysu wykończeniowego'
    },
// Krok 2: Projekt i Dokumentacja (Wersja Inżynierska)
{
  id: 'aranzacja-wnetrz',
          number: 2,
          icon: 'draftingCompass',
          label: 'Dokumentacja',
          title: 'Projekt wykonawczy i dobór materiałów',
          content: [
            {
              type: 'paragraph',
              value: 'W CoreLTB tworzymy **projekt wykonawczy**, który jest techniczną mapą drogową. Weryfikujemy Twoją wizję pod kątem instalacyjnym i budżetowym, unikając materiałów, które zrujnują portfel.'
            },
            {
              type: 'list',
              items: [
                '**kłady ścian:** precyzyjne rozrysowanie płytek (brak brzydkich docinek).',
                '**mapa punktów:** wymiarowane rzuty elektryki i hydrauliki.',
                '**zestawienie materiałowe:** pełna lista zakupowa.'
              ]
            },
            {
               // 🔥 LINK DO WIEDZY: Koszty wykończenia
               type: 'paragraph',
               value: `**Planujesz budżet?** Zobacz: Ile kosztuje wykończenie mieszkania pod klucz w ${CURRENT_YEAR}? (Raport)`
            }
          ],
          imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/aranzacja.webp',
          imageAlt: 'Architekt wnętrz CoreLTB omawiający projekt wykonawczy'
        },
// Krok 3: Logistyka i Koordynacja
{
  id: 'harmonogram-prac',
  number: 3,
  icon: 'calendar',
  label: 'Logistyka',
  title: 'Kolejność technologiczna prac',
  content: [
    {
      type: 'paragraph',
      value: 'Błąd w harmonogramie (np. zbyt wczesny montaż drzwi) to gwarancja uszkodzeń. W CoreLTB Builders zastępujemy przypadkowość ścisłym procesem liniowym. Monitorujemy wilgotność posadzek (pomiar CM) przed wpuszczeniem parkieciarzy i synchronizujemy dostawy materiałów w systemie Just-in-Time, aby nic nie niszczało na budowie.'
    },
    {
      type: 'paragraph',
      value: 'Proces dzielimy na strefy, eliminując kolizje między ekipami:'
    },
    {
      type: 'list',
      items: [
        '**przeróbki instalacyjne:** dostosowanie punktów wod-kan i gniazdek do projektu wnętrz przed rozpoczęciem prac glazurniczych.',
        '**prace brudne:** wykonanie gładzi, zabudowy G-K oraz układanie płytek w łazienkach (zabezpieczenie okien przed pyłem).',
        '**malowanie i podłogi:** gruntowanie, malowanie i montaż podłóg twardych (dopiero po zakończeniu prac pylących).',
        '**montaż czysty:** osadzanie ościeżnic, drzwi wewnętrznych, listew i armatury oraz białego osprzętu elektrycznego.'
      ]
    },
    {
      type: 'paragraph',
      value: 'Taki układ gwarantuje, że podłoga nie zostanie porysowana, a ościeżnice drzwiowe nie napęcznieją od wilgoci z gładzi.'
    }
  ],
  // Zostawiam Twoją ścieżkę
  imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/harmonogram.webp',
  imageAlt: 'Kierownik projektu kontrolujący postęp prac wykończeniowych'
},
    // Krok 4: Wykonawstwo i Nadzór
    {
      id: 'realizacja-wykonczeniowa',
      number: 4,
      icon: 'hammer',
      label: 'Wykonawstwo',
      title: 'Specjalizacja brygad i nadzór techniczny',
      content: [
        {
          type: 'paragraph',
          value: 'Jakość wykończenia tkwi w detalu, którego często nie widać na pierwszy rzut oka. W CoreLTB odchodzimy od modelu "złotej rączki". Prace realizują wąsko wyspecjalizowane brygady branżowe, a nad całością czuwa inżynier koordynujący (nie musisz sam pilnować ekip).'
        },
        {
          type: 'paragraph',
          value: 'Nasz standard wykonawczy obejmuje:'
        },
        {
          type: 'list',
          items: [
            '**wyprowadzenie geometrii:** prostowanie kątów ścian (niezbędne pod zabudowy meblowe i wanny) oraz weryfikacja płaszczyzn gładzi światłem bocznym.',
            '**glazurnictwo precyzyjne:** układanie gresów wielkoformatowych i spieków, szlifowanie narożników 45° (jolly) zamiast listew, systemowe hydroizolacje w łazienkach.',
            '**montaż końcowy:** osadzanie drzwi bezklamkowych/ukrytych, biały montaż armatury oraz precyzyjne docinanie listew przypodłogowych.'
          ]
        },
        {
          type: 'paragraph',
           value: '**Planujesz otoczenie domu?** Wykończyliśmy środek, zajmiemy się też zewnątrz. Sprawdź: [Podjazdy, Ogrodzenia i Ogrody w CoreLTB Builders](/oferta/zagospodarowanie-terenu)'
        }
      ],
      // Zostawiam Twoją ścieżkę
      imageSrc: '/images/uslugi/wykonczenia-i-aranzacje/etapy/realizacja.webp',
      imageAlt: 'Ekipa wykończeniowa podczas precyzyjnego montażu zabudowy'
    }
  ]
},

    // Sekcja 5: ServicesAccordion (FAQ)
    servicesAccordion: {
      header: {
        label: 'FAQ INWESTORA',
        title: 'Koszty i logistyka wykończenia',
        description: 'Odpowiedzi na pytania o pieniądze i organizację prac "pod klucz".',
      },
      services: [
        // --- FINANSE ---
        {
          iconName: 'wallet',
          title: 'Dlaczego usługa z materiałem jest tańsza niż zakupy w markecie?',
          content: [
            {
              type: 'paragraph',
              value: 'To prosta matematyka podatkowa. Kupując płytki czy kleje w sklepie, płacisz 23% VAT. Zlecając nam usługę kompleksową (Generalne Wykonawstwo), płacisz **tylko 8% VAT** (dla budownictwa mieszkaniowego do 300 m²). To oznacza oszczędność rzędu kilkunastu tysięcy złotych, która pokrywa dużą część kosztów robocizny.'
            }
          ]
        },
        {
          iconName: 'coins',
          title: `Ile kosztuje wykończenie m² w standardzie ${CURRENT_YEAR}?`,
          content: [
            {
              type: 'paragraph',
              value: 'Rynek ustabilizował się na poziomie **2500–4500 zł brutto za m² podłogi**. Ta kwota obejmuje projekt, robociznę oraz materiały wykończeniowe średniej i wyższej klasy. Ostateczny koszt zależy od ilości "mokrych pomieszczeń" (łazienek), które są najdroższe w realizacji.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB wycena nie jest "szacunkiem", ale **ofertą ryczałtową**. Gwarantujemy, że cena nie zmieni się w trakcie prac.'
            }
          ]
        },
        {
          iconName: 'piggyBank',
          title: 'Czy 300 tys. zł wystarczy na wykończenie domu 120m²?',
          content: [
            {
              type: 'paragraph',
              value: '**Tak, to bezpieczny budżet na wysoki standard.** Przy 120m² daje to średnią ok. 2500 zł/m². Pozwala to na zastosowanie gresów wielkoformatowych, dobrej armatury podtynkowej i podłóg drewnianych lub winylowych wysokiej klasy. Dokładny zakres ustalamy w Kosztorysie Ofertowym przed podpisaniem umowy.'
            }
          ]
        },
        // --- PROCES ---
        {
          iconName: 'home',
          title: 'Co dokładnie oznacza "stan pod klucz"?',
          content: [
            {
              type: 'paragraph',
              value: 'Dla nas oznacza to mieszkanie gotowe do wniesienia mebli ruchomych (sofa, łóżko). W ramach usługi wykonujemy: gładzie, malowanie, podłogi, łazienki "na gotowo" (z białym montażem), osadzenie drzwi wewnętrznych. Po zakończeniu prac sprzątamy i utylizujemy odpady. Opcjonalnie wykonujemy też zabudowy stoujące.'
            }
          ]
        },
        {
          iconName: 'clock',
          title: 'Ile trwa realizacja (Fit-out)?',
          content: [
            {
              type: 'paragraph',
              value: 'Dzięki pracy równoległej naszych ekip (bez czekania na "wolne terminy"), standardowe wykończenie domu trwa **3-4 miesiące** od wejścia na budowę. Gwarantujemy ten termin karami umownymi w kontrakcie.'
            }
          ]
        },
        {
          iconName: 'checkCircle',
          title: 'Kto odpowiada za jakość (gwarancja)?',
          content: [
            {
              type: 'paragraph',
              value: 'W modelu gospodarczym odpowiedzialność się rozmywa. W CoreLTB otrzymujesz **jedną zbiorczą rękojmię (gwarancję)** na całość prac. Jeśli pęknie fuga lub zacznie kapać kran – dzwonisz do nas, a nie szukasz hydraulika sprzed roku.'
            }
          ]
        },
        // --- LOGISTYKA ---
        {
          iconName: 'trendingUp',
          title: 'Co jest najdroższe w wykończeniu?',
          content: [
            {
              type: 'paragraph',
              value: 'Zdecydowanie łazienki i kuchnia. Te pomieszczenia generują ok. **50% kosztów** całej "wykończeniówki". Wynika to ze skomplikowania prac (hydroizolacje, przeróbki hydrauliczne) oraz cen materiałów (płytki, armatura). Salon i sypialnie są relatywnie tanie.'
            }
          ]
        }
      ]
    },

    // Sekcja 6: Testimonials
    testimonials: {
      header: {
        label: 'CO MÓWIĄ NASI KLIENCI',
        title: 'Spokój i zaufanie na ostatniej prostej',
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

    // Sekcja 6: ContactCTA
    contactCTA: {
      header: {
        label: 'ZACZNIJMY TWORZYĆ TWOJE WNĘTRZE',
        title: 'Gotowy na Wykończenie Marzeń?',
        description: 'Umów się na bezpłatną konsultację, a my przygotujemy wstępny kosztorys i harmonogram prac wykończeniowych.',
      },
      contactInfo: {
        phone: '+48 664 123 757',
        email: 'biuro@coreltb.pl',
      },
      primaryButton: { text: 'Umów Konsultację', href: '/umow-konsultacje?usluga=wykonczenia' },
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

    // Listing (karta na stronie /oferta)
    listing: {
      image: '/images/uslugi/kompleksowa-budowa-domow/timeline/zagospodarowanie-terenu.webp',
      title: 'Zagospodarowanie terenu',
      description: 'Przekształcamy przestrzeń wokół budynków w funkcjonalne i estetyczne otoczenie, realizując ogrody, drogi i ogrodzenia.',
      features: [
        'Projektowanie ogrodów i otoczenia',
        'Budowa dróg dojazdowych i ogrodzeń',
      ],
    },

    // Sekcja 1: PageHeader
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
// Sekcja 2: HERO - Prace Ziemne i Brukarskie
emotionalHero: {
  label: 'PRACE ZIEMNE I BRUKARSTWO • ŚLĄSK/MAŁOPOLSKA',
  headline: 'Zamieniamy plac budowy w gotowy teren',
  subtitle:
    'Oddanie kluczy to nie koniec logistyki. W regionie, gdzie dominują grunty nieprzepuszczalne (gliny) i tereny ze spadkiem, zagospodarowanie to przede wszystkim inżynieria wodna. Wchodzimy z własnym sprzętem zaraz po demontażu rusztowań. Kształtujemy spadki, wykonujemy drenaże i układamy nawierzchnie na podbudowie drogowej, która nie "siądzie" po pierwszej zimie.',
  benefits: [
    'Własny park maszynowy (koparki, zagęszczarki) – nie czekasz na wynajem sprzętu',
    'Kompleksowość: od drenażu opaskowego, przez podbudowę, aż po ogrodzenie systemowe',
    'Projekt ukształtowania terenu (bilans mas ziemnych) w cenie realizacji',
  ],
  // CTA Box - Konkret techniczny (Pomiary)
  ctaBoxTitle: 'Zamów pomiar niwelacyjny',
  ctaBoxBenefits: [
    'ocena spadków terenu i kierunków spływu wód opadowych',
    'weryfikacja gruntu rodzimego (czy wymaga wymiany pod kostkę)',
    'kosztorys materiałowy (kruszywa, kostka, stal ogrodzeniowa)',
    'dobór technologii odwodnienia (studnie chłonne vs kanalizacja deszczowa)',
  ],
  ctaBoxSubtext: 'Wizyta techniczna na działce w promieniu działania firmy.',
  ctaBoxButtons: [
    { text: 'Umów konsultację', href: '/umow-konsultacje?usluga=inne', variant: 'primary' },
    { text: 'Zadzwoń do nas', href: 'tel:+48664123757', variant: 'secondary' },
  ],
},

// Sekcja 2: USP - TECHNOLOGIA I WODA
philosophyTimeline: {
  header: {
    label: 'STANDARD WYKONAWCZY',
    title: 'Dlaczego nasze podjazdy nie "siadają" po zimie?', // Konkretny problem
    description:
      'To prosta fizyka: kostka brukowa jest tylko tak trwała, jak to, co leży pod nią. Na gruntach wysadzinowych (glinach), które dominują w naszym regionie, kluczem jest wymiana gruntu. Nie oszczędzamy na kruszywie – stosujemy podbudowę drogową zagęszczaną warstwowo, co daje gwarancję stabilności pod ciężkimi samochodami.',
  },
  items: [
    {
      number: 1,
      iconName: 'layers', // Ikona warstw (lepsza niż linijka)
      title: 'Stabilizacja gruntu i korytowanie', // Małe litery w treści
      description:
        'Usuwamy grunt rodzimy (humus/glina) do głębokości min. 40-50 cm. Stosujemy geowłókniny separacyjne i warstwową podbudowę z kruszyw łamanych o frakcjach klinujących (0-31mm / 0-63mm). Każda warstwa jest zagęszczana płytą wibracyjną o dużym nacisku, co eliminuje powstawanie kolein.',
    },
    {
      number: 2,
      iconName: 'waves', // Ikona wody (Hydro)
      title: 'Zarządzanie wodą opadową',
      description:
        'Każdy m² kostki to woda, którą trzeba odprowadzić. Nie robimy podjazdów "na płasko". Wytyczamy spadki (1-2%) w kierunku odwodnień liniowych lub terenów chłonnych. Wpinamy rynny do studni chłonnych lub kanalizacji deszczowej, aby uniknąć błota wokół domu.',
    },
    {
      number: 3,
      iconName: 'combine', // Ikona Integracji/Systemu (zamiast checkCircle)
      title: 'Integracja ogrodzenia i bram',
      description:
        'Traktujemy otoczenie jako system. Fundament ogrodzenia jest zintegrowany z bramą przesuwną i furtką (wypuszczamy peszle pod domofon i napęd na etapie "brudnym"). Dzięki temu elektryk nie musi później rozbierać gotowego chodnika, by podłączyć kable.',
    },
  ],
  // Zostawiam Twoją ścieżkę
  image: {
    src: '/images/uslugi/zagospodarowanie-terenu/filozofia.webp',
    alt: 'Inżynier dokonujący niwelacji terenu niwelatorem laserowym przed brukowaniem',
  },
},

    // Sekcja 4: CooperationTimelineNoLine (6 kroków)
// Krok 1: Brukarstwo (Inżynieria Drogowa)
cooperationTimelineNoLine: {
  header: {
    label: 'HARMONOGRAM REALIZACJI',
    title: 'Od błota do gotowego ogrodu',
    description:
      'Proces zagospodarowania terenu to nie "sadzenie roślin", tylko ciężkie prace inżynieryjne. Koordynujemy operatorów koparek, dostawy kruszyw i brukarzy w jednym ciągu logicznym, aby uniknąć przestojów.',
  },
  steps: [
    {
      id: 'brukarstwo',
      number: 1,
      icon: 'layoutGrid', 
      label: 'Nawierzchnie',
      title: 'Brukarstwo i podbudowy drogowe',
      content: [
        {
          type: 'paragraph',
          value:
            'Podjazd musi wytrzymać obciążenie kilku ton. Na śląskich i małopolskich glinach kluczem do trwałości jest **wymiana gruntu**. Nie układamy kostki "na piasku". Stosujemy pełną technologię drogową, która gwarantuje, że nawierzchnia nie pofaluje się (nie powstają koleiny) i nie zostanie wysadzona przez mróz.'
        },
        {
          type: 'paragraph',
          value: 'Nasz standard wykonawczy obejmuje:'
        },
        {
          type: 'list',
          items: [
            '**korytowanie i stabilizacja:** wybranie humusu (min. 40-50 cm), ułożenie geowłókniny separacyjnej (zapobiega mieszaniu się warstw) i wykonanie podbudowy z kruszyw łamanych klinujących.',
            '**zagęszczanie warstwowe:** używamy ciężkich zagęszczarek płytowych (powyżej 200 kg), aby "zabetonować" kruszywo mechanicznie przed ułożeniem kostki.',
            '**niwelacja laserowa:** wyznaczamy precyzyjne spadki (1-2%), kierując wodę deszczową do odwodnień liniowych lub na teren chłonny (z dala od murów budynku).',
            '**spoinowanie:** oprócz piasku płukanego, stosujemy fugi żywiczne (przepuszczalne dla wody, ale odporne na wyrastanie chwastów i wypłukiwanie).'
          ],
        },
      ],
      imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/brukarstwo.webp',
      imageAlt: 'Zagęszczanie podbudowy pod kostkę brukową ciężkim sprzętem'
    },
    {
      id: 'ogrodzenia',
      number: 2,
      icon: 'gate', 
      label: 'Ogrodzenia',
      title: 'Systemy ogrodzeniowe i bramy',
      content: [
        {
          type: 'paragraph',
          value:
            'Ogrodzenie to konstrukcja budowlana narażona na silne parcie wiatru i pracę gruntu. Na gruntach wysadzinowych (gliny typowe dla Południa), kluczem nie jest wygląd przęsła, ale to, co pod ziemią. W CoreLTB Builders traktujemy fundament ogrodzenia z taką samą powagą jak fundament domu – musi być zbrojony i wykonany poniżej strefy zamarzania, aby murki nie pękały po pierwszej zwi.'
        },
        {
          type: 'paragraph',
          value: 'Realizujemy ogrodzenia systemowo:'
        },
        {
          type: 'list',
          items: [
            '**fundamenty liniowe:** wykonujemy wykopy poniżej strefy przemarzania gruntu (80-120 cm), stosując dylatacje obwodowe, co zabezpiecza betonowe cokoły przed pękaniem od mrozu.',
            '**systemy modułowe:** montujemy ogrodzenia z pustaków gładkich/łupanych oraz stalowe przęsła (wyłącznie ocynk ogniowy + malowanie proszkowe), co daje realną gwarancję antykorozyjną.',
            '**automatyka zintegrowana:** przewody pod napędy bram, domofon i elektrozamek rozprowadzamy w ziemi jeszcze przed ułożeniem kostki, unikając demontażu nowej nawierzchni przez elektryka.'
          ],
        },
        {
          type: 'paragraph',
          value:
            'Dzięki temu, że wykonuje to jeden zespół, masz pewność, że poziomy bramy idealnie zgrają się z poziomem podjazdu (zero progów i kałuż przy wjeździe).'
        },
      ],
      imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/ogrodzenia.webp',
      imageAlt: 'Montaż nowoczesnego ogrodzenia modułowego i bramy przesuwnej na podjeździe'
    },
    {
      id: 'odwodnienie',
      number: 3,
      icon: 'waves', // Zmieniam 'umbrella' na 'waves' (bardziej inżyniersko)
      label: 'Hydrotechnika', // Brzmi bardziej pro niż "Gospodarka Wodna"
      title: 'Odwodnienie, drenaże i retencja',
      content: [
        {
          type: 'paragraph',
          value:
            'Na nieprzepuszczalnych gruntach Śląska i Małopolski (gdzie dominują gliny), woda opadowa nie wsiąka w podłoże, lecz spływa w stronę fundamentów. Ignorowanie tego faktu to gwarancja wilgoci w garażu. W CoreLTB nie działamy "na oko". Projektujemy systemy odwodnień, dopasowując je do chłonności gruntu.'
        },
        {
          type: 'paragraph',
          value: 'Realizujemy kompleksowe roboty odwodnieniowe:'
        },
        {
          type: 'list',
          items: [
            '**zagospodarowanie deszczówki:** zgodnie z prawem wodnym, woda z dachu musi zostać na działce. Montujemy studnie chłonne betonowe lub systemowe skrzynki rozsączające, które przejmują zrzut wody z rynien.',
            '**drenaż opaskowy:** jeśli wymagają tego warunki geologiczne, wykonujemy drenaż wokół ław fundamentowych (rura w otulinie + obsypka żwirowa), odcinając dopływ wód gruntowych do murów.',
            '**odwodnienia liniowe:** w nawierzchni podjazdu montujemy korytka o klasie obciążenia B125 (odporne na najazd samochodów osobowych), zapobiegając tworzeniu się kałuż i lodu przy bramie garażowej.'
          ],
        },
        {
           // STRATEGICZNY LINK DO USŁUGI WSPIERAJĄCEJ
           // Klient z mokrą działką musi kliknąć tutaj!
          type: 'paragraph',
          value:
            '**Stoi Ci woda na działce?** Przed doborem studni warto wykonać badanie gruntu. Sprawdź: [Usługi Geologiczne i Geotechnika w CoreLTB](/oferta/uslugi-techniczne)'
        },
      ],
      imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/odwodnienie.webp',
      imageAlt: 'Montaż studni chłonnej i drenażu opaskowego przy domu jednorodzinnym',
    },
    {
      id: 'niwelacja-terenu',
      number: 4,
      icon: 'tractor', // Zmień ikonę na 'tractor' (lub shovel), areaChart nie pasuje do koparki
      label: 'Niwelacja',
      title: 'Profilowanie terenu i humusowanie',
      content: [
        {
          type: 'paragraph',
          value:
            'Ostatni etap budowy to logistyka ciężkiego sprzętu. Wchodzimy, aby wyprowadzić rzędne terenu. W CoreLTB Builders traktujemy to zadanie geodezyjnie: musimy zgubić różnice wysokości działki, zachowując bezpieczny spływ wód od budynku, a jednocześnie nie "zakopując" ogrodzenia czy sąsiadów.'
        },
        {
          type: 'paragraph',
          value: 'Nasz standard prac ziemnych obejmuje:'
        },
        {
          type: 'list',
          items: [
            '**bilans mas ziemnych:** weryfikujemy, czy ziemię z wykopów da się rozplantować, czy (co częste przy śląskich glinach) należy ją wywieźć i dowieźć lżejszy grunt z zewnątrz.',
            '**mikroniwelacja laserowa:** profilowanie spadków z dokładnością do centymetrów, co eliminuje powstawanie "zastoin wodnych" (kałuż) na środku przyszłego trawnika.',
            '**humusowanie (10-15 cm):** mechaniczne rozścielenie warstwy wegetacyjnej (odsianego humusu). To minimum technologiczne, aby trawa się ukorzeniła na twardym podłożu.'
          ],
        },
        {
          // 🔥 KLUCZOWY LINK (Cost-Anchor): Klient tutaj pyta o pieniądze.
          type: 'paragraph',
          value:
            `**Planujesz budżet na koniec budowy?** Sprawdź realne koszty (wywrotki ziemi, roboczogodziny sprzętu): Ile kosztuje zagospodarowanie działki 1000m² w ${CURRENT_YEAR}? (Analiza)`
        },
      ],
      imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/niwelacja.webp',
      imageAlt: 'Niwelacja terenu i rozkładanie humusu maszyną budowlaną po budowie'
    },
    {
      id: 'trawniki-i-nawadnianie',
      number: 5,
      icon: 'leaf',
      label: 'Nawadnianie', // Zmiana etykiety na bardziej techniczną
      title: 'Systemy nawadniania i trawniki',
      content: [
        {
          type: 'paragraph',
          value:
            'Ogród bez wody na Śląsku nie przetrwa. Gliny w lecie pękają, a piaski (Jura) wysychają. Nie bawimy się w "ręczne podlewanie". Wdrażamy systemy automatyczne oparte na bilansie wodnym. Rury i sekcje kładziemy PRZED humusowaniem, żeby nie niszczyć wykonanej niwelacji.'
        },
        {
          type: 'paragraph',
          value: 'Instalujemy technologię:'
        },
        {
          type: 'list',
          items: [
            '**automatyka strefowa:** podział na sekcje zraszaczy (trawnik) i linie kroplujące (rabaty) sterowane zegarem astronomicznym.',
            '**biologia murawy:** zakładamy trawniki z siewu na odpowiednim podłożu (humus min. 10-15 cm) lub z rolki (efekt natychmiastowy) z obowiązkową siatką na krety.',
            '**retencja wody:** tam gdzie to możliwe, wykorzystujemy darmową wodę opadową z Twojego zbiornika retencyjnego, zamiast drogiej wody wodociągowej.'
          ],
        },
        {
          type: 'paragraph',
          value:
            'Precyzyjne nawadnianie (kropelkowe) to oszczędność wody rzędu 50% względem tradycyjnego węża. Trawnik nie jest przelany, ani spalony słońcem.'
        },
      ],
      imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/trawniki-nawadnianie.webp',
      imageAlt: 'Montaż systemu nawadniania i układanie trawnika z rolki'
    },
    
    {
      id: 'oswietlenie-ogrodowe',
      number: 6,
      icon: 'lightbulb',
      label: 'Elektryka', // Bardziej pasuje do kabla YKY
      title: 'Oświetlenie zewnętrzne i sterowanie',
      content: [
        {
          type: 'paragraph',
          value:
            'Brak kabli na etapie "ziemi" to najdroższy błąd w ogrodzie. Często widzimy gotowe trawniki rozkopywane, by podłączyć lampkę. W CoreLTB kładziemy rury osłonowe (aroty) równolegle z drenażami i krawężnikami, eliminując późniejszą dewastację.'
        },
        {
          type: 'paragraph',
          value: 'Realizujemy elektrykę terenu:'
        },
        {
          type: 'list',
          items: [
            '**kable ziemne (YKY):** instalujemy okablowanie w osłonach, odporne na wilgoć i gryzonie.',
            '**bezpieczeństwo:** oświetlenie najazdowe w podjeździe i słupki przy ścieżkach to wymóg bezpieczeństwa, a nie tylko estetyka.',
            '**sterowanie zmierzchowe:** lampy uruchamiają się automatycznie po zachodzie słońca, tworząc strefę bezpieczeństwa wokół domu.'
          ],
        },
        {
          // CROSS-SELL: Odsyłamy do wykończeń (instalacje wewnętrzne) zamiast duplikować link do cennika terenu
          type: 'paragraph',
          value: '**Planujesz też wykończenie wnętrz?** Instalacje zewnętrzne to dopiero początek. Sprawdź: [Wykończenie domu pod klucz — od instalacji po aranżację >](/oferta/wykonczenia-i-aranzacje)'
        },
      ],
      imageSrc: '/images/uslugi/zagospodarowanie-terenu/etapy/oswietlenie.webp',
      imageAlt: 'Podświetlenie ogrodu i elewacji systemem lamp najazdowych'
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
          'Umów się na bezpłatną konsultację, a my przygotujemy wstępną koncepcję zagospodarowania terenu oraz kosztorys prac.',
      },
      contactInfo: {
        phone: '+48 664 123 757',
        email: 'biuro@coreltb.pl',
      },
      primaryButton: { text: 'Umów Konsultację', href: '/umow-konsultacje?usluga=inne' },
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

/** Zwraca dane listingowe (karty) dla strony /oferta – gotowe do AnimatedServiceGrid. */
export const getAllServicesListingData = () =>
  allServicesV2.map((s) => ({
    ...s.listing,
    href: `/oferta/${s.slug}`,
  }));
