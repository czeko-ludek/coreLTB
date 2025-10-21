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
  title: string;
  content: string;
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
  faqs: FAQ[];
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

  // Sekcja 4: Treść dla Zainteresowanych (Usługi)
  servicesAccordion: ServicesAccordionData;

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
    title: 'Budujemy tak, jak sami chcielibyśmy mieszkać.',
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
];

export const getServiceV2BySlug = (slug: string): ServiceV2 | undefined =>
  allServicesV2.find((s) => s.slug === slug);
