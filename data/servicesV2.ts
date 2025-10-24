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
  ctaText: string;
  ctaLink: string;
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
    category: 'Kompleksowa Budowa Domów',
    title: 'Kompleksowa Budowa Domów',

    // PageHeader
    pageHeader: {
      title: 'Kompleksowa Budowa Domów',
      watermarkText: 'BUDOWA DOMÓW',
      backgroundImage: '/images/uslugi/kompleksowa-budowa-domow/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Kompleksowa Budowa Domów', href: '' },
      ],
    },

    // Sekcja 1: Dom to więcej niż budynek
    emotionalHero: {
      label: 'KOMPLEKSOWA BUDOWA DOMÓW',
      headline: ['Dom to więcej niż budynek',
      'To przestrzeń dla Twojej historii'
    ],
      subtitle:
        'W CoreLTB Builders rozumiemy, że budowa domu to jedna z najważniejszych podróży w życiu. Dlatego jako firma rodzinna z wieloletnią tradycją, jesteśmy Twoim przewodnikiem i partnerem na każdym jej etapie – od pierwszej kreski na projekcie, aż po moment, w którym przekręcasz klucz w drzwiach swojego wymarzonego domu.',
      ctaText: 'Umów bezpłatną konsultację',
      ctaLink: '/kontakt',
    },

// Sekcja 2: Filozofia (Budujemy zaufanie)
philosophyTimeline: {
  // Nagłówek jest teraz bardziej bezpośredni i skupiony na korzyściach
  header: {
    label: 'DLACZEGO WARTO NAS WYBRAĆ?',
    title: 'Budujemy tak, jak sami chcielibyśmy mieszkać',
    description:
      'Na rynku jest wielu wykonawców. My nie konkurujemy ceną – konkurujemy spokojem, który dajemy naszym klientom. Wybierając CoreLTB Builders, wybierasz partnera, który bierze pełną odpowiedzialność za Twoje marzenie i Twoje pieniądze.',
  },
  
  // Punkty są teraz mocniejszymi argumentami sprzedażowymi
  items: [
    {
      number: 1,
      iconName: 'fileText', // Sugeruję zmianę ikony na symbolizującą umowę
      title: 'Jeden Partner, Jedna Umowa, Pełna Odpowiedzialność',
      description:
        'Zapomnij o koordynowaniu dziesiątek podwykonawców. Jako generalny wykonawca, podpisujesz z nami jedną, przejrzystą umowę i to my odpowiadamy za wszystko: od projektu, przez budowę, aż po odbiory.',
    },
    {
      number: 2,
      iconName: 'shieldCheck', // Sugeruję zmianę ikony na symbolizującą bezpieczeństwo
      title: 'Gwarancja Stałej Ceny i Terminu – Bez Niespodzianek',
      description:
        'Budżet i czas to świętość. Cena, którą ustalamy w umowie, jest ostateczna i chroni Cię przed nieprzewidzianymi kosztami. Harmonogram prac jest dla nas wiążący, a o postępach informujemy Cię regularnie. Z nami wiesz, na czym stoisz.',
    },
    {
      number: 3,
      iconName: 'award', // Sugeruję zmianę ikony na symbolizującą jakość
      title: 'Doświadczenie i Jakość, Którą Widać i Czuć',
      description:
        'Nie budujemy od wczoraj. Ponad 15 lat na rynku i 500 zrealizowanych projektów to kapitał, który pracuje na Twoją korzyść. Używamy sprawdzonych materiałów i osobiście nadzorujemy każdy detal.',
    },
  ],
  
  // Pamiętaj, aby dodać również ten obiekt, jeśli go nie masz,
  // ponieważ jest on wymagany przez poprawiony komponent.
  image: {
    src: '/images/uslugi/kompleksowa-budowa-domow/zespol-coreltb-builders.webp',
    alt: 'Doświadczony kierownik budowy z CoreLTB Builders na placu budowy, w kasku z logo, analizujący plany.',
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
      title: 'Etap Przed-Budowlany: Solidne Fundamenty Twojej Inwestycji',
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
      title: 'Projektowanie i Adaptacje: Twoja Wizja w Rękach Ekspertów',
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
      title: 'Generalne Wykonawstwo: Budowa od A do Z pod Pełną Kontrolą',
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
      title: 'Prace Zewnętrzne i Finalizacja: Perfekcyjne Zwieńczenie Projektu',
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
        title: 'Po Skorzystaniu z Naszych Usług',
        theme: 'light' as const,
      },
      testimonials: [
        {
          quote:
            'Od początku czuliśmy, że jesteśmy w dobrych rękach. CoreLTB traktował naszą inwestycję jak swoją własną. Terminowość, jakość i kontakt na najwyższym poziomie.',
          author: {
            image: {
              src: '/images/testimonials/marek-kasia.jpg',
              alt: 'Marek i Kasia - Właściciele domu w Krakowie',
            },
            name: 'Marek i Kasia',
            role: 'Właściciele domu w Krakowie',
          },
          rating: 5,
        },
        {
          quote:
            'Budowaliśmy po raz pierwszy i obawialiśmy się całego procesu. Dzięki CoreLTB wszystko przebiegło sprawnie i bez stresu. Polecam z całego serca!',
          author: {
            image: {
              src: '/images/testimonials/piotr-nowicki.jpg',
              alt: 'Piotr Nowicki - Właściciel domu w Katowicach',
            },
            name: 'Piotr Nowicki',
            role: 'Właściciel domu w Katowicach',
          },
          rating: 5,
        },
        {
          quote:
            'Profesjonalizm, uczciwość i zaangażowanie. To słowa, które najlepiej opisują CoreLTB. Nasz dom jest dokładnie taki, o jakim marzyliśmy.',
          author: {
            image: {
              src: '/images/testimonials/anna-kowalczyk.jpg',
              alt: 'Anna Kowalczyk - Właścicielka domu w Zakopanem',
            },
            name: 'Anna Kowalczyk',
            role: 'Właścicielka domu w Zakopanem',
          },
          rating: 5,
        },
      ],
    },

    // Sekcja 7: Etapy Współpracy (Timeline)
    cooperationTimeline: {
      header: {
        label: 'JAK PRACUJEMY',
        title: 'Droga do Twojego Wymarzonego Domu',
        description: 'Etapy Współpracy z Nami',
        theme: 'light' as const,
      },
      steps: [
        {
          id: 'etap-1',
          number: 1,
          icon: 'mapPin',
          label: 'Działka',
          title: 'Działka Budowlana',
          content: [
            {
              type: 'paragraph',
              value: 'Wybór działki to najważniejsza decyzja, która definiuje całą przyszłą inwestycję. Błędny zakup może oznaczać ogromne koszty i problemy. Dlatego współpracę z CoreLTB Builders możesz rozpocząć jeszcze przed jej nabyciem. Nasz zespół przeprowadzi **pełną i szczegółową analizę gruntu**, która jest fundamentem Twojego bezpieczeństwa. Weryfikujemy kluczowe aspekty:'
            },
            {
              type: 'list',
              items: [
                '**Zgodność z MPZP:** Sprawdzamy zapisy w **Miejscowym Planie Zagospodarowania Przestrzennego (MPZP)**, aby upewnić się, że Twój wymarzony projekt będzie mógł na niej powstać.',
                '**Warunki Zabudowy:** Jeśli działka nie jest objęta MPZP, bierzemy na siebie cały proces uzyskania **decyzji o Warunkach Zabudowy**.',
                '**Dostępność mediów:** Analizujemy możliwości i koszty **uzbrojenia działki** w prąd, wodę, gaz i kanalizację.',
                '**Warunki geologiczne:** Zlecamy badania gruntu, aby uniknąć kosztownych niespodzianek na etapie fundamentowania.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Dzięki temu masz **absolutną pewność**, że inwestujesz w grunt bez wad prawnych i ukrytych problemów technicznych.'
            }
          ],
          imageSrc: '/images/uslugi/kompleksowa-budowa-domow/timeline/dzialka-budowlana.webp',
          imageAlt: 'Geodeta z teodolitem na pustej działce budowlanej w słoneczny dzień',
        },
        {
          id: 'etap-2',
          number: 2,
          icon: 'draftingCompass',
          label: 'Projekt',
          title: 'Projekt Domu',
          content: [
            {
              type: 'paragraph',
              value: 'To etap, na którym Twoje marzenia ubieramy w realne, techniczne ramy. Jako doświadczeni budowlańcy, wiemy, które rozwiązania są funkcjonalne, trwałe i optymalne kosztowo.'
            },
            {
              type: 'list',
              items: [
                '**Adaptacja Projektu Gotowego:** Wybrałeś projekt z katalogu? Nasz zespół architektów dokona jego **profesjonalnej adaptacji**. To więcej niż formalność – dostosowujemy go do specyfiki Twojej działki, stron świata i Twoich indywidualnych potrzeb.',
                '**Indywidualny Projekt Domu:** Jeśli marzysz o domu "szytym na miarę", tworzymy od zera **unikalną koncepcję architektoniczną**, która w 100% odzwierciedla Twój styl życia.'
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
          title: 'Przyłącza Budowlane',
          content: [
            {
              type: 'paragraph',
              value: 'Sprawne doprowadzenie mediów to fundament komfortowego życia w nowym domu. W CoreLTB Builders bierzemy na siebie **cały, często skomplikowany proces koordynacji przyłączy**, oszczędzając Twój czas i nerwy.'
            },
            {
              type: 'list',
              items: [
                '**Wnioskujemy o warunki przyłączenia** do sieci energetycznej, wodociągowej i gazowej.',
                '**Zlecamy i nadzorujemy wykonanie projektów** technicznych przyłączy.',
                '**Koordynujemy prace ziemne i montażowe** z ekipami posiadającymi niezbędne uprawnienia.',
                '**Organizujemy odbiory techniczne** z gestorami sieci, finalizując cały proces.'
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
          title: 'Pozwolenie na Budowę',
          content: [
            {
              type: 'paragraph',
              value: 'Uzyskanie **pozwolenia na budowę** to kamień milowy każdej inwestycji. Najczęstszą przyczyną opóźnień są braki formalne i błędy we wnioskach. Z nami ten problem nie istnieje. W Twoim imieniu przygotowujemy i składamy **kompletny wniosek o pozwolenie na budowę**. Nasz zespół dba o to, by do urzędu trafiła cała niezbędna dokumentacja:'
            },
            {
              type: 'list',
              items: [
                'Cztery egzemplarze projektu budowlanego.',
                'Oświadczenie o prawie do dysponowania nieruchomością.',
                'Decyzja o Warunkach Zabudowy (jeśli jest wymagana).',
                'Wszystkie wymagane opinie, uzgodnienia i pozwolenia.'
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
          title: 'Wsparcie w Finansowaniu',
          content: [
            {
              type: 'paragraph',
              value: 'Wiemy, że budowa domu to jedna z największych decyzji finansowych w życiu. Dlatego w CoreLTB Builders zapewniamy pełne wsparcie i transparentność również na etapie finansowania. Naszym celem jest maksymalne uproszczenie procedur i zapewnienie Ci solidnych podstaw do rozmów z bankiem, aby proces ubiegania się o **kredyt na budowę domu** był jak najmniej stresujący.'
            },
            {
              type: 'paragraph',
              value: 'Nasze wsparcie w tym kluczowym momencie opiera się na trzech filarach:'
            },
            {
              type: 'list',
              items: [
                '**Rzetelny Kosztorys Budowlany do Banku:** Przygotowujemy **szczegółowy i wiarygodny kosztorys**, który jest w pełni zgodny z wymogami instytucji finansowych. To kluczowy dokument, który precyzyjnie określa wartość inwestycji i jest podstawą do pozytywnej decyzji kredytowej.',
                '**Współpraca z Doradcami Finansowymi:** Współpracujemy z **zaufanymi, niezależnymi doradcami kredytowymi**, którzy pomogą Ci porównać oferty różnych banków i wybrać najkorzystniejsze rozwiązanie, dopasowane do Twoich możliwości.',
                '**Przygotowanie Harmonogramu:** Opracowujemy **jasny harmonogram prac i płatności**, który jest wymagany przez banki do wypłaty kredytu w transzach. Dzięki temu proces finansowania przebiega płynnie, zgodnie z postępem na budowie.'
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
          title: 'Realizacja Budowy',
          content: [
            {
              type: 'paragraph',
              value: 'To serce naszej działalności, gdzie plany zamieniają się w rzeczywistość. Jako **generalny wykonawca**, bierzemy pełną odpowiedzialność za plac budowy. Fundamentem naszej jakości są **własne, wyspecjalizowane ekipy budowlane**, które pracują z nami od lat. Zapewniamy pełną realizację, obejmującą wszystkie kluczowe etapy:'
            },
            {
              type: 'list',
              items: [
                '**Stan surowy otwarty:** Precyzyjne prace ziemne, solidne fundamenty, wznoszenie ścian i montaż konstrukcji dachu.',
                '**Stan surowy zamknięty:** Montaż energooszczędnej stolarki okiennej i drzwiowej.',
                '**Stan deweloperski:** Wykonanie wszystkich instalacji wewnętrznych, tynków i wylewek.',
                '**Prace "pod klucz":** Kompleksowe wykończenie wnętrz według Twoich wytycznych.'
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
          title: 'Zagospodarowanie Terenu',
          content: [
            {
              type: 'paragraph',
              value: 'Prawdziwy dom to nie tylko cztery ściany. To także przestrzeń wokół niego, która wieńczy całe dzieło. W CoreLTB Builders rozumiemy, że ogród, podjazd i taras są naturalnym przedłużeniem Twojego domu, dlatego nasza kompleksowa usługa obejmuje również **pełną i przemyślaną aranżację całej działki**.'
            },
            {
              type: 'paragraph',
              value: 'Jako generalny wykonawca, koordynujemy wszystkie prace zewnętrzne, zapewniając ich spójność z architekturą budynku i najwyższą jakość wykonania. Nasze działania obejmują:'
            },
            {
              type: 'list',
              items: [
                '**Niwelację i Kształtowanie Terenu:** Precyzyjnie przygotowujemy grunt, dbając o prawidłowe spadki i odwodnienie.',
                '**Prace Brukarskie i Tarasy:** Tworzymy estetyczne i trwałe podjazdy, chodniki oraz tarasy, które stają się letnim sercem domu.',
                '**Montaż Ogrodzenia:** Zapewniamy prywatność i bezpieczeństwo, realizując ogrodzenia dopasowane do stylu posesji.',
                '**Zakładanie Zieleni:** Finalnym akcentem jest zakładanie trawnika z siewu lub rolki oraz realizacja nasadzeń roślinnych.',
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
          title: 'Odbiór i Gwarancja',
          content: [
            {
              type: 'paragraph',
              value: 'To moment, na który czekałeś – radosny finał naszej wspólnej podróży i początek Twojego nowego rozdziału. Zwieńczeniem naszej współpracy jest oficjalny odbiór budynku, który przeprowadzamy z taką samą starannością, jak każdy poprzedni etap. Naszym celem jest zapewnienie Ci **pełnej obsługi formalnej** aż do samego końca.'
            },
            {
              type: 'paragraph',
              value: 'W Twoim imieniu zajmujemy się wszystkimi niezbędnymi formalnościami, abyś mógł legalnie i bezpiecznie zamieszkać w swoim nowym domu:'
            },
            {
              type: 'list',
              items: [
                '**Kompletujemy dokumentację powykonawczą:** Zbieramy wszystkie niezbędne dokumenty, w tym dziennik budowy i protokoły odbiorów technicznych instalacji.',
                '**Zgłaszamy zakończenie budowy:** Składamy oficjalne zawiadomienie do Powiatowego Inspektoratu Nadzoru Budowlanego.',
                '**Uzyskujemy pozwolenie na użytkowanie:** Pilotujemy cały proces aż do uzyskania ostatecznej decyzji, która pozwala na legalne zamieszkanie.'
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
    title: 'Projektowanie Domu',

    // PageHeader
    pageHeader: {
      title: 'Projektowanie Domu',
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
      label: 'PROJEKTOWANIE DOMU',
      headline: 'Od Marzenia do Projektu',
      subtitle:
        'Budowa domu zaczyna się od marzenia, ale szybko pojawiają się pytania. Jaki projekt wybrać? Jak uniknąć kosztownych błędów? Jak sprawić, by plan na papierze stał się funkcjonalnym i tanim w utrzymaniu domem na lata? W CoreLTB Builders wiemy, że projekt to fundament finansowego i funkcjonalnego sukcesu całej inwestycji. Ten przewodnik pokaże Ci, jak zaprojektować dom mądrze, unikając pułapek, w które wpadają inni.',
      ctaText: 'Umów bezpłatną konsultację',
      ctaLink: '/kontakt',
    },

    // Sekcja 2: PhilosophyTimeline - Dlaczego warto nam zlecić projekt
    philosophyTimeline: {
      header: {
        label: 'DLACZEGO WARTO NAM ZLECIĆ PROJEKT?',
        title: 'Projekt to coś więcej niż wizja – to plan budowy',
        description:
          'Na rynku jest wielu architektów. My nie oferujemy tylko estetycznych wizualizacji. Oferujemy coś cenniejszego: spokój ducha i projekt w 100% zintegrowany z realiami budowy i Twoim budżetem.',
      },

      items: [
        {
          number: 1,
          iconName: 'pencil',
          title: 'Twój Projekt, Nasza Wiedza',
          description:
            'U nas nie ma konfliktu między wizją architekta a realiami budowy. Nasz zespół projektowy pracuje ramię w ramię z kierownikami budowy. Każda kreska jest weryfikowana pod kątem wykonalności i kosztów, co eliminuje stres i nieprzewidziane wydatki na późniejszym etapie.',
        },
        {
          number: 2,
          iconName: 'landmark',
          title: 'Twój Budżet, Nasz Priorytet',
          description:
            'Zaczynamy od Twoich realnych możliwości finansowych. Projektujemy dom, na który Cię stać. Optymalizujemy każde rozwiązanie pod kątem trwałości i ekonomii. Nigdy kosztem jakości. Nie tworzymy drogich fantazji – tworzymy realne, wykonalne plany.',
        },
        {
          number: 3,
          iconName: 'building',
          title: 'Wiedza Prosto z Budowy',
          description:
            'Nasi projektanci znają realia placu budowy. Wiemy, które rozwiązania sprawdzają się w codziennym życiu, a które są tylko efektowne na papierze. To praktyczna wiedza zdobyta na ponad 500 realizacjach, której nie znajdziesz w żadnym katalogu.',
        },
      ],

      image: {
        src: '/images/uslugi/projektowanie/dlaczego-warto.webp',
        alt: 'Zespół projektowy CoreLTB Builders pracujący nad indywidualnym projektem domu',
      },
    },

    cooperationTimelineNoLine: {
      header: {
        label: 'PROCES PROJEKTOWANIA',
        title: 'Od Koncepcji do Gotowego Projektu',
        description: 'Projekt to najważniejszy etap, który decyduje o kosztach, funkcjonalności i komforcie Twojego przyszłego domu. Zobacz, jak przeprowadzimy Cię przez ten proces, gwarantując spokój i bezpieczeństwo inwestycji.',
      },
      steps: [
        {
          id: 'projekt-gotowy',
          number: 1,
          icon: 'fileText',
          label: 'Projekt Gotowy',
          title: 'Analiza Projektu Gotowego (Katalogowego)',
          content: [
            {
              type: 'paragraph',
              value: 'To gotowa dokumentacja, którą możesz kupić **od ręki**. Tysiące dostępnych opcji sprawiają, że jest to kuszące rozwiązanie, ale kluczem jest świadomy wybór.'
            },
            {
              type: 'paragraph',
              value: '**Zalety:**'
            },
            {
              type: 'list',
              items: [
                '**Niska cena zakupu**: Zwykle w przedziale **3 000 - 8 000 zł**.',
                '**Szybkość**: Projekt masz dostępny niemal od razu po zakupie.',
                '**Przewidywalność**: Często możesz zobaczyć zdjęcia z realizacji lub wizualizacje.'
              ]
            },
            {
              type: 'paragraph',
              value: '**Wady i Pułapki:**'
            },
            {
              type: 'list',
              items: [
                '**Konieczność adaptacji**: Zawsze musisz zapłacić za adaptację projektu do Twojej działki, co jest dodatkowym kosztem rzędu **3 000 - 7 000 zł**.',
                '**Kompromisy**: Dom nie jest "szyty na miarę". Układ pomieszczeń czy wielkość okien mogą nie odpowiadać w pełni Twoim potrzebom.',
                '**Niedopasowanie**: Projekt może nie wykorzystywać atutów Twojej działki (np. widoku czy nasłonecznienia).'
              ]
            },
            {
              type: 'paragraph',
              value: 'Naszym zadaniem jest **profesjonalna adaptacja**, która eliminuje wady projektu gotowego i maksymalizuje jego zalety, dostosowując go do Twoich realnych potrzeb.'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/projekt-gotowy.webp',
          imageAlt: 'Mężczyzna przeglądający katalog z gotowymi projektami domów'
        },
        {
          id: 'projekt-indywidualny',
          number: 2,
          icon: 'draftingCompass',
          label: 'Projekt Indywidualny',
          title: 'Projekt Indywidualny',
          content: [
            {
                type: 'paragraph',
                value: 'To projekt tworzony **od zera** przez architekta w ścisłej współpracy z Tobą, aby w 100% odzwierciedlał Twoje marzenia i potrzeby.'
            },
            {
              type: 'paragraph',
              value: '**Zalety:**'
            },
            {
              type: 'list',
              items: [
                '**Idealne dopasowanie**: Każdy metr kwadratowy jest zaplanowany pod styl życia Twojej rodziny.',
                '**Maksymalne wykorzystanie działki**: Projekt uwzględnia nasłonecznienie, widoki, ukształtowanie terenu i otoczenie.',
                '**Unikalność i optymalizacja**: Pełna kontrola nad funkcją i estetyką, co często pozwala na **długoterminowe oszczędności** (np. na ogrzewaniu).'
              ]
            },
            {
              type: 'paragraph',
              value: '**Wady i Pułapki:**'
            },
            {
              type: 'list',
              items: [
                '**Wyższa cena**: Koszt projektu to średnio **150 - 300 zł za m²**.',
                '**Dłuższy czas oczekiwania**: Proces projektowy trwa od kilku tygodni do kilku miesięcy.',
                '**Ryzyko "przerostu formy nad treścią"**: Bez wsparcia doświadczonego wykonawcy, łatwo zaprojektować rozwiązania niepraktyczne lub bardzo drogie w budowie.'
              ]
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders pilnujemy, by projekt indywidualny był nie tylko piękny, ale przede wszystkim **mądry, funkcjonalny i osadzony w ustalonym budżecie budowy**.'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/projekt-indywidualny.webp',
          imageAlt: 'Architekt szkicujący unikalny projekt domu na tablecie graficznym'
        },
        {
          id: 'adaptacja-projektu',
          number: 3,
          icon: 'settings',
          label: 'Adaptacja',
          title: 'Adaptacja Projektu',
          content: [
            {
              type: 'paragraph',
              value: 'Wielu inwestorów myśli, że adaptacja to niepotrzebna formalność. To błąd. Adaptacja jest obowiązkowym i kluczowym procesem, który dostosowuje uniwersalny projekt do Twojej unikalnej lokalizacji i zapewnia bezpieczeństwo konstrukcji.'
            },
            {
              type: 'paragraph',
              value: '**Adaptacja Obowiązkowa:**'
            },
            {
              type: 'list',
              items: [
                '**Projekt Zagospodarowania Działki:** Wrysowujemy budynek na mapę, planujemy przyłącza, podjazd i układ terenu.',
                '**Dostosowanie do Warunków Lokalnych:** Sprawdzamy zgodność z Miejscowym Planem (MPZP) lub Warunkami Zabudowy (WZ).',
                '**Dostosowanie Konstrukcji:** Adaptujemy fundamenty do wyników badań geologicznych gruntu oraz konstrukcję dachu do lokalnej strefy wiatrowej i śniegowej.'
              ]
            },
            {
              type: 'paragraph',
              value: '**Zmiany Dodatkowe (na Twoje życzenie):**'
            },
            {
              type: 'list',
              items: [
                'Przesunięcie lub likwidacja ścian działowych.',
                'Zmiana lokalizacji i wielkości okien lub drzwi.',
                'Wybór innych materiałów budowlanych.'
              ]
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders dbamy o to, by adaptacja była nie tylko formalnością, ale **realną optymalizacją Twojego przyszłego domu.**'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/adaptacja.webp',
          imageAlt: 'Architekt nanosi zmiany na gotowy projekt, dostosowując go do konkretnej działki'
        },
        {
          id: 'koszty-projektu',
          number: 4,
          icon: 'piggyBank',
          label: 'Koszty',
          title: 'Budżet i Koszty',
          content: [
            {
              type: 'paragraph',
              value: '**Co składa się na finalną cenę projektu?**'
            },
            {
              type: 'list',
              items: [
                '**Zakup projektu gotowego (3 000 - 8 000 zł):** Pomoc w wyborze projektu zoptymalizowanego pod Twoją działkę i budżet.',
                '**Adaptacja projektu gotowego (3 000 - 7 000 zł):** Pełna, profesjonalna adaptacja z uwzględnieniem naszych doświadczeń budowlanych.',
                '**Projekt indywidualny (150 - 300 zł / m²):** Projekt "szyty na miarę", zintegrowany z realnym kosztorysem budowy.'
              ]
            },
            {
              type: 'paragraph',
              value: '**Ważne:** Kupując projekt gotowy, **zawsze musisz doliczyć koszt adaptacji**. Finalny koszt takiego rozwiązania to często **6 000 - 15 000 zł**. Dlatego zawsze warto porównać tę kwotę z ceną projektu indywidualnego, który od początku jest tworzony bez kompromisów.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders gwarantujemy, że każda złotówka wydana na projekt jest **inwestycją w optymalizację i bezpieczeństwo całej budowy.**'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/koszty.webp',
          imageAlt: 'Zbliżenie na kalkulator i plany, symbolizujące planowanie budżetu projektu'
        },
        {
          id: 'zawartosc-projektu',
          number: 5,
          icon: 'clipboardCheck',
          label: 'Dokumentacja',
          title: 'Kompletna Dokumentacja Budowlana',
          content: [
            {
              type: 'paragraph',
              value: 'Jakość i kompletność projektu decydują o sprawności procesu urzędowego i bezproblemowej realizacji. Niepełna dokumentacja to prosta droga do przestojów i nerwów.'
            },
            {
                type: 'paragraph',
                value: 'Zgodnie z polskim prawem, kompletny projekt, który od nas otrzymasz, **składa się z 3 kluczowych części:**'
            },
            {
                type: 'list',
                items: [
                    '**Projekt Zagospodarowania Działki lub Terenu:** To mapa Twojej inwestycji, pokazująca usytuowanie budynku, przyłącza i układ terenu.',
                    '**Projekt Architektoniczno-Budowlany:** To serce projektu, zawierające rzuty, przekroje i wygląd elewacji, składane do urzędu.',
                    '**Projekt Techniczny:** To szczegółowa instrukcja dla wykonawców, zawierająca detale konstrukcyjne niezbędne do realizacji prac.'
                ]
            },
            {
                type: 'paragraph',
                value: 'Powierzając nam projekt, masz **100% pewności**, że otrzymasz kompletną, zgodną z przepisami dokumentację.'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/dokumentacja.webp',
          imageAlt: 'Profesjonalnie oprawiony projekt budowlany z pieczątką'
        },
        {
          id: 'trendy-2026',
          number: 6,
          icon: 'lightbulb',
          label: 'Trendy',
          title: 'Trendy i Inteligentne Rozwiązania na 2026 Rok',
          content: [
            {
              type: 'paragraph',
              value: 'Projekt domu to decyzja na dekady, dlatego warto, by uwzględniał nie tylko dzisiejsze potrzeby, ale i przyszłe trendy. W CoreLTB Builders nie podążamy ślepo za modą. Wybieramy **inteligentne rozwiązania**, które podnoszą komfort, obniżają koszty utrzymania i sprawiają, że wartość Twojego domu będzie rosła z czasem. Oto kierunki, które dominują w nowoczesnej architekturze i które z sukcesem realizujemy dla naszych klientów.'
            },
            {
              type: 'paragraph',
              value: '**Ekologia i Energooszczędność jako Standard, Nie Luksus**'
            },
            {
              type: 'paragraph',
              value: 'To już nie trend, a fundament nowoczesnego budownictwa. Rosnące ceny energii sprawiają, że inwestycja w technologie takie jak **pompy ciepła, rekuperacja (wentylacja z odzyskiem ciepła) i fotowoltaika** zwraca się znacznie szybciej niż kiedykolwiek. Projektując dom w 2026 roku, myślimy o jego **całkowitych kosztach życia (TCO)**, a nie tylko o kosztach budowy.'
            },
            {
              type: 'paragraph',
              value: '**Design Biofilny – Dom w Harmonii z Naturą**'
            },
            {
              type: 'paragraph',
              value: 'Zacieramy granice między wnętrzem a ogrodem. **Ogromne przeszklenia, naturalne materiały** (drewno, kamień, beton) i płynne przejście na taras to kluczowe elementy. Taki projekt nie tylko pięknie wygląda, ale też poprawia samopoczucie, wpuszczając do środka maksimum naturalnego światła i zieleni.'
            },
            {
              type: 'paragraph',
              value: '**Wielofunkcyjność Przestrzeni – Dom, Który Adaptuje się do Ciebie**'
            },
            {
              type: 'paragraph',
              value: 'Praca zdalna i zmieniający się styl życia wymagają elastyczności. Projektujemy **przestrzenie, które łatwo można adaptować** – gabinet, który może stać się pokojem gościnnym, czy otwartą strefę dzienną z inteligentnie wydzielonymi strefami do pracy, relaksu i zabawy. Koniec ze sztywnym podziałem pomieszczeń.'
            },
            {
              type: 'paragraph',
              value: '**Prosta Bryła, Szlachetne Materiały – Siła Minimalizmu**'
            },
            {
              type: 'paragraph',
              value: 'Najpopularniejsze projekty to te oparte na prostych, zwartych bryłach (często w stylu **"nowoczesnej stodoły"**). Taka forma jest nie tylko elegancka i ponadczasowa, ale przede wszystkim **tańsza w budowie i cieplejsza w eksploatacji** (mniej mostków termicznych). Siłę projektu buduje się poprzez jakość materiałów elewacyjnych, a nie skomplikowaną formę.'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/trendy.webp',
          imageAlt: 'Nowoczesny dom w stylu stodoły z dużymi przeszkleniami, otwarty na ogród'
        },
        {
          id: 'unikanie-bledow',
          number: 7,
          icon: 'shield',
          label: 'Unikanie Błędów',
          title: 'Eliminacja Najczęstszych Błędów Projektowych',
          content: [
            {
              type: 'paragraph',
              value: 'Nasze doświadczenie z ponad 500 realizacji pozwoliło nam stworzyć listę najkosztowniejszych i najbardziej irytujących błędów projektowych:'
            },
            {
              type: 'list',
              items: [
                '**Niefunkcjonalny Układ Komunikacji:** Zbyt długie korytarze, które kradną cenną powierzchnię.',
                '**Złe Usytuowanie Względem Stron Świata:** Salon od północy (ciemny i zimny), sypialnia od zachodu (przegrzana latem).',
                '**Niedopasowanie Garażu:** Zbyt mały garaż, w którym nie mieszczą się nowoczesne samochody lub brakuje miejsca na rowery.',
                '**Brak Pomieszczeń Gospodarczych:** Zapominanie o spiżarni, pralni czy schowku, co prowadzi do bałaganu w części mieszkalnej.',
                '**Źle Zaprojektowane Schody:** Zbyt strome lub niewygodne, stanowiące codzienne wyzwanie.',
                '**Zbyt Mało Miejsca na Szafy:** Ignorowanie potrzeby przechowywania, co skutkuje zagraceniem sypialni.',
                '**Kuchnia Oderwana od Rzeczywistości:** Nielogiczny układ "trójkąta roboczego" (lodówka-zlew-płyta), który utrudnia gotowanie.',
                '**Niedostateczne Oświetlenie Naturalne:** Zbyt małe okna lub ich zła lokalizacja, tworzące mroczne i przygnębiające wnętrza.',
                '**Hałas i Brak Prywatności:** Sypialnia nad salonem lub obok łazienki, co zakłóca spokój domowników.',
                '**Ignorowanie Otoczenia:** Projekt, który zupełnie nie pasuje do sąsiednich budynków i krajobrazu.'
              ]
            },
            {
              type: 'paragraph',
              value: 'Każdy z tych błędów to potencjalny koszt i codzienna frustracja. Dzięki naszej metodzie projektowania, gdzie wizja architekta jest stale weryfikowana przez doświadczenie budowlańców, w CoreLTB Builders **eliminujemy te problemy na etapie kartki papieru.**'
            }
          ],
          imageSrc: '/images/uslugi/projektowanie/etapy/bledy.webp',
          imageAlt: 'Ręka architekta zakreślająca błąd na planie technicznym'
        }
      ]
    },

    // Sekcja 4: ServicesAccordion (FAQ w formie rozwijanych sekcji)
    servicesAccordion: {
      header: {
        label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
        title: 'Odpowiedzi na Kluczowe Pytania o Projektowanie',
        description: 'Sprawdź najważniejsze informacje, które pomogą Ci podjąć świadomą decyzję.',
      },
      services: [
        {
          iconName: 'clock',
          title: 'Ile trwa przygotowanie projektu indywidualnego?',
          content: [
            {
              type: 'paragraph',
              value: 'Średnio proces ten zajmuje **od 8 do 16 tygodni**. Czas ten obejmuje stworzenie koncepcji, przygotowanie projektu budowlanego i uzyskanie wszystkich niezbędnych uzgodnień.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders **dbamy o to, by każdy etap był maksymalnie efektywny**, co pozwala nam skrócić czas realizacji bez kompromisów w jakości.'
            }
          ]
        },
        {
          iconName: 'edit',
          title: 'Czy mogę wprowadzić zmiany w projekcie w trakcie budowy?',
          content: [
            {
              type: 'paragraph',
              value: 'Tak, ale zmiany istotne (np. zmiana wielkości budynku) wymagają stworzenia projektu zamiennego. **Dlatego tak duży nacisk kładziemy na dopracowanie projektu do perfekcji, zanim ruszy budowa.**'
            },
            {
              type: 'paragraph',
              value: 'Naszym celem jest minimalizacja zmian na budowie, co eliminuje stres, przestoje i dodatkowe koszty. **Projekt to mapa – im lepsza, tym spokojniejsza droga.**'
            }
          ]
        },
        {
          iconName: 'edit',
          title: 'Czy mogę wprowadzić zmiany w projekcie w trakcie budowy?',
          content: [
            {
              type: 'paragraph',
              value: 'Tak, ale zmiany istotne (np. zmiana wielkości budynku) wymagają stworzenia projektu zamiennego. **Dlatego tak duży nacisk kładziemy na dopracowanie projektu do perfekcji, zanim ruszy budowa.**'
            },
            {
              type: 'paragraph',
              value: 'Naszym celem jest minimalizacja zmian na budowie, co eliminuje stres, przestoje i dodatkowe koszty. **Projekt to mapa – im lepsza, tym spokojniejsza droga.**'
            }
          ]
        },
        {
          iconName: 'checkCircle',
          title: 'Czy mogę sam kupić projekt i zlecić Wam tylko adaptację?',
          content: [
            {
              type: 'paragraph',
              value: 'Oczywiście, świadczymy taką usługę. Co więcej, rekomendujemy skonsultowanie z nami wyboru projektu gotowego **jeszcze przed jego zakupem**.'
            },
            {
              type: 'paragraph',
              value: 'Nasz zespół budowlany zweryfikuje, czy projekt jest optymalny dla Twojej działki i nie zawiera kosztownych w realizacji rozwiązań. Dzięki temu **unikniesz pułapki zakupu pięknego, ale problematycznego projektu.**'
            }
          ]
        },
        {
          iconName: 'wallet',
          title: 'Ile kosztuje projekt domu 150m²?',
          content: [
            {
              type: 'paragraph',
              value: 'Koszt zależy od wybranej drogi. **Projekt gotowy z adaptacją** to zazwyczaj koszt w przedziale **8 000 - 18 000 zł**.'
            },
            {
              type: 'paragraph',
              value: '**Projekt indywidualny** dla domu 150 m² to inwestycja rzędu **22 500 - 45 000 zł** (150-300 zł/m²). Pamiętaj, że projekt indywidualny, choć droższy na starcie, często pozwala na **większe oszczędności na etapie budowy** dzięki idealnemu dopasowaniu do działki i Twoich potrzeb.'
            }
          ]
        },
        {
          iconName: 'mountain',
          title: 'Co jeśli działka jest na skarpie lub to trudny teren?',
          content: [
            {
              type: 'paragraph',
              value: 'To idealna sytuacja, w której **projekt indywidualny pokazuje swoją największą siłę**. Trudny teren to dla nas nie problem, a wyzwanie projektowe, które pozwala stworzyć unikalną i spektakularną architekturę.'
            },
            {
              type: 'paragraph',
              value: 'Adaptacja projektu gotowego na taką działkę jest często bardzo kosztowna i kompromisowa. W CoreLTB Builders **specjalizujemy się w projektach na wymagających działkach**, w pełni wykorzystując ich potencjał.'
            }
          ]
        },
        {
          iconName: 'calendar',
          title: 'Jak długo czeka się na pozwolenie na budowę?',
          content: [
            {
              type: 'paragraph',
              value: 'Zgodnie z prawem, urząd ma **65 dni** na wydanie decyzji od dnia złożenia kompletnego wniosku. W praktyce czas ten może być różny w zależności od urzędu.'
            },
            {
              type: 'paragraph',
              value: 'Kluczem jest słowo **"kompletny"**. Dzięki naszemu doświadczeniu dbamy o to, by składana przez nas dokumentacja była bezbłędna, co **minimalizuje ryzyko wezwań do uzupełnień i maksymalnie skraca cały proces.**'
            }
          ]
        },
        {
          iconName: 'fileCheck',
          title: 'Czy zajmujecie się również formalnościami urzędowymi?',
          content: [
            {
              type: 'paragraph',
              value: '**Tak, to jeden z fundamentów naszej usługi.** W Twoim imieniu składamy wniosek o pozwolenie na budowę i pilotujemy cały proces w urzędzie, zdejmując z Ciebie cały ciężar "papierologii".'
            },
            {
              type: 'paragraph',
              value: 'Dzięki wieloletniemu doświadczeniu wiemy dokładnie, jak przygotować dokumentację, by uzyskać pozwolenie **szybko i bezproblemowo**.'
            }
          ]
        },
        {
          iconName: 'coins',
          title: 'Czy projekt gotowy z adaptacją to naprawdę oszczędność?',
          content: [
            {
              type: 'paragraph',
              value: 'To zależy. **Koszt projektu gotowego (3 000 - 8 000 zł) + adaptacja (3 000 - 7 000 zł)** to finalnie **6 000 - 15 000 zł**. Jest to porównywalne z projektem indywidualnym (150 - 300 zł/m²), który jednak jest **idealnie dopasowany do Twojej działki i potrzeb.**'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders **pomagamy Ci podjąć najlepszą decyzję**, analizując wszystkie aspekty: budżet, oczekiwania i specyfikę działki.'
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
              src: '/images/testimonials/anna-kowalczyk.jpg',
              alt: 'Anna Kowalczyk',
            },
            name: 'Anna Kowalczyk',
            role: 'Właścicielka domu jednorodzinnego',
          },
          rating: 5.0,
        },
        {
          quote:
            'Byłem sceptyczny czy warto płacić więcej za projekt indywidualny. Teraz wiem, że to była strzał w dziesiątkę. Dom jest dokładnie taki jak chcieliśmy, a co najważniejsze - zmieściliśmy się w budżecie dzięki mądrym rozwiązaniom projektowym.',
          author: {
            image: {
              src: '/images/testimonials/piotr-nowicki.jpg',
              alt: 'Piotr Nowicki',
            },
            name: 'Piotr Nowicki',
            role: 'Inwestor prywatny',
          },
          rating: 5.0,
        },
      ],
    },

// Sekcja 6: ContactCTA - 

contactCTA: {
  header: {
    label: 'POROZMAWIAJMY O TWOIM PROJEKCIE',
    title: 'Zmień Marzenie w Realny, Bezpieczny Plan',
    description: 'Niezależnie od etapu, na którym jesteś, nasza bezpłatna i niezobowiązująca konsultacja to najlepszy pierwszy krok. Pomożemy Ci ocenić możliwości, wybrać optymalną drogę i stworzyć solidny fundament dla budowy Twojego wymarzonego domu.',
  },
  contactInfo: {
    phone: '+48 123 456 789',
    email: 'kontakt@coreltb.pl',
    address: 'ul. Przykładowa 123, Warszawa',
  },
},

    // SEO
    metaTitle: 'Projektowanie Domu | CoreLTB Builders - Od Marzenia do Projektu',
    metaDescription:
      'Profesjonalne projektowanie domów jednorodzinnych. Projekt zintegrowany z budową i budżetem. 15 lat doświadczenia. Indywidualne projekty i adaptacje. Bezpłatna konsultacja.',

    createdAt: '2025-01-24T10:00:00Z',
    updatedAt: '2025-01-24T10:00:00Z',
  },
];

export const getServiceV2BySlug = (slug: string): ServiceV2 | undefined =>
  allServicesV2.find((s) => s.slug === slug);
