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
      benefits: [
        '500+ domów zbudowanych od A do Z – każdy etap pod kontrolą',
        'Jedna umowa, jedna odpowiedzialność – Ty odpoczywasz, my budujemy',
        'Gwarancja stałej ceny i terminu – żadnych niespodzianek',
      ],
      // CTA Box
      ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
      ctaBoxBenefits: [
        'Przeanalizujemy Twoją sytuację i wymagania',
        'Przedstawimy realny harmonogram i budżet budowy',
        'Wycenimy kompleksową realizację od projektu do odbioru',
        'Odpowiemy na wszystkie Twoje pytania i wątpliwości',
      ],
      ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
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
        'Budowa domu zaczyna się od projektu. Dobry projekt to spokojny sen przez całą budowę i lata mieszkania. Zły projekt to przepalony budżet, frustracja na budowie i kosztowne poprawki. W CoreLTB Builders tworzymy projekty, które działają – zarówno na papierze, jak i w realnym życiu.',
      benefits: [
        '500+ zrealizowanych projektów domów – znamy każdą pułapkę',
        'Projekt zintegrowany z budżetem budowy od pierwszej linii',
        'Architekci + inżynierowie w jednym zespole – zero niespodzianek na budowie',
      ],
      // CTA Box zamiast prostego buttona
      ctaBoxTitle: '☎ Umów Konsultację (30 min, online/stacjonarnie)',
      ctaBoxBenefits: [
        'Przeanalizujemy Twoją działkę i warunki prawne',
        'Polecimy optymalny rodzaj projektu (gotowy vs. indywidualny)',
        'Wycenimy projekt i szacunkowy koszt budowy',
        'Odpowiemy na wszystkie Twoje pytania i wątpliwości',
      ],
      ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
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

    // Sekcja 2: PhilosophyTimeline - Dlaczego warto nam zlecić projekt
    philosophyTimeline: {
      header: {
        label: 'DLACZEGO WARTO NAM ZLECIĆ PROJEKT?',
        title: 'Projekt to coś więcej niż wizja – to plan budowy',
        description:
          'Znamy problem: architekt projektuje piękny dom, a potem wykonawca mówi "To będzie kosztować 100 000 zł więcej". U nas tego nie ma. Nasz zespół projektowy pracuje z inżynierami budowy od pierwszej kreski. Każde rozwiązanie jest sprawdzone pod kątem kosztów przed trafieniem do projektu.',
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
          label: 'Rozwiązania',
          title: 'Praktyczne Rozwiązania, Które Oszczędzają Pieniądze',
          content: [
            {
              type: 'paragraph',
              value: 'Projekt domu to decyzja na dekady. W CoreLTB Builders nie podążamy ślepo za modą. Wdrażamy **sprawdzone rozwiązania**, które zwracają się w konkretnych liczbach i podnoszą komfort życia. Oto 3 najważniejsze kierunki, które warto uwzględnić już na etapie projektu.'
            },
            {
              type: 'paragraph',
              value: '**1. Dom Energooszczędny – Oszczędzaj 6 000 zł Rocznie**'
            },
            {
              type: 'paragraph',
              value: '**Przykład:** Dom 150m² z tradycyjnym ogrzewaniem gazowym to koszt **~8 000 zł rocznie**. Ten sam dom z **pompą ciepła + fotowoltaiką + rekuperacją** to **~2 000 zł rocznie**.'
            },
            {
              type: 'paragraph',
              value: '**Kalkulacja:** Przez 20 lat to różnica **120 000 zł**. Koszt wdrożenia tych technologii to dodatkowe **~30 000 zł** w projekcie. **Zwrot inwestycji: 5 lat**. Przez kolejne 15 lat to czysta oszczędność w Twoim portfelu.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders projektujemy domy energooszczędne jako standard, bo to się po prostu **opłaca**.'
            },
            {
              type: 'paragraph',
              value: '**2. Prosta Bryła – Taniej w Budowie, Cieplej w Użytkowaniu**'
            },
            {
              type: 'paragraph',
              value: 'Skomplikowana bryła (wykusze, balkony, załamania dachu) to **wyższe koszty budowy** (+15-20%) i **wyższe straty ciepła** (więcej mostków termicznych). Prosta, zwarta bryła w stylu **"nowoczesnej stodoły"** to elegancja, oszczędność i funkcjonalność. Siłę projektu budujemy przez **jakość materiałów elewacyjnych**, nie przez skomplikowaną formę.'
            },
            {
              type: 'paragraph',
              value: '**3. Wielofunkcyjność Przestrzeni – Dom Gotowy na Przyszłość**'
            },
            {
              type: 'paragraph',
              value: 'Projektujemy przestrzenie, które **łatwo się adaptują** do zmieniających się potrzeb: gabinet może stać się pokojem gościnnym, otwarta strefa dzienna z elastycznym podziałem to miejsce do pracy, relaksu i zabawy. To rozwiązanie sprawdza się szczególnie w pracy zdalnej i gdy dzieci dorastają i opuszczają dom.'
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
        description: 'Sprawdź najważniejsze informacje, które pomogą Ci podjąć świadomą decyzję. Podzieliliśmy pytania na kategorie, aby łatwiej znaleźć to, czego szukasz.',
      },
      services: [
        // PODSTAWY PROJEKTOWANIA
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
          iconName: 'fileText',
          title: 'Jaka jest różnica między projektem budowlanym a wykonawczym?',
          content: [
            {
              type: 'paragraph',
              value: '**Projekt budowlany** to dokumentacja, którą składasz do urzędu, aby uzyskać pozwolenie na budowę. Zawiera rzuty, przekroje, elewacje i podstawowe rozwiązania konstrukcyjne.'
            },
            {
              type: 'paragraph',
              value: '**Projekt wykonawczy (techniczny)** to znacznie bardziej szczegółowa instrukcja dla ekipy budowlanej. Zawiera dokładne detale konstrukcyjne, specyfikacje materiałów i wszystkie niezbędne informacje do wykonania prac.'
            },
            {
              type: 'paragraph',
              value: '**Wniosek:** Projekt budowlany to "przepustka" do urzędu, projekt wykonawczy to "instrukcja obsługi" dla budowlańców.'
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
          iconName: 'shieldCheck',
          title: 'Czy projekt z internetu jest legalny?',
          content: [
            {
              type: 'paragraph',
              value: '**Tak, ale z warunkami.** Projekty z internetu (katalogowe) są legalne, ale podlegają **prawom autorskim**. Kupujesz **licencję na realizację**, a nie pełne prawa do projektu.'
            },
            {
              type: 'paragraph',
              value: '**Ważne:** Każdy projekt gotowy **wymaga adaptacji** do Twojej działki (zgodność z MPZP, dostosowanie fundamentów do geologii, itp.). Nie możesz wprowadzać zmian samodzielnie – **każda modyfikacja musi być pieczętowana przez uprawnionego architekta**.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders pomagamy wybrać projekt i przeprowadzamy pełną, legalną adaptację.'
            }
          ]
        },

        // ZMIANY I ADAPTACJE
        {
          iconName: 'edit',
          title: 'Czy mogę wprowadzić zmiany w projekcie w trakcie budowy?',
          content: [
            {
              type: 'paragraph',
              value: 'Tak, ale zmiany istotne (np. zmiana wielkości budynku, przebudowa konstrukcji) wymagają **projektu zamiennego** i zgłoszenia do urzędu. Drobne zmiany (np. przesunięcie ścianki działowej) można wykonać bez formalności.'
            },
            {
              type: 'paragraph',
              value: '**Dlatego tak duży nacisk kładziemy na dopracowanie projektu do perfekcji, zanim ruszy budowa.** Projekt to mapa – im lepsza, tym spokojniejsza droga. Naszym celem jest minimalizacja zmian na budowie, co eliminuje stres, przestoje i dodatkowe koszty.'
            }
          ]
        },
        {
          iconName: 'alertCircle',
          title: 'Czy mogę samodzielnie wprowadzić zmiany w kupionym projekcie?',
          content: [
            {
              type: 'paragraph',
              value: '**NIE.** To częsty błąd inwestorów. Każda zmiana w projekcie budowlanym **musi być zatwierdzona i opieczętowana przez architekta z odpowiednimi uprawnieniami**.'
            },
            {
              type: 'paragraph',
              value: 'Samowolne zmiany mogą skutkować: **odmową odbioru przez nadzór budowlany**, **karami finansowymi** lub nawet **nakazem rozbiórki**.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders zajmujemy się **profesjonalnymi modyfikacjami projektów**, dbając o ich zgodność z prawem i normami technicznymi.'
            }
          ]
        },
        {
          iconName: 'coins',
          title: 'Ile kosztuje każda zmiana w projekcie po jego zatwierdzeniu?',
          content: [
            {
              type: 'paragraph',
              value: 'Koszt zależy od zakresu zmiany. **Drobne modyfikacje** (np. przesunięcie okna) to **500 - 1 500 zł**. **Średnie zmiany** (np. przebudowa układu pomieszczeń) to **2 000 - 5 000 zł**. **Duże zmiany konstrukcyjne** (np. zmiana wielkości budynku) to **projekt zamiennych od 5 000 zł wzwyż**.'
            },
            {
              type: 'paragraph',
              value: '**Wniosek:** Warto dokładnie przemyśleć projekt przed jego zatwierdzeniem. W CoreLTB Builders poświęcamy czas na **szczegółowe konsultacje**, aby projekt był idealny od razu.'
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

        // PROCEDURY I PRAWO
        {
          iconName: 'map',
          title: 'Czy projekt musi być sprawdzony przez geodetę?',
          content: [
            {
              type: 'paragraph',
              value: '**Tak.** Projekt zagospodarowania działki (część projektu budowlanego) wymaga **mapy do celów projektowych**, którą sporządza uprawniony geodeta.'
            },
            {
              type: 'paragraph',
              value: 'Geodeta nanosi na mapę aktualny stan działki (granice, ukształtowanie terenu, istniejące budynki, drzewa). Ta mapa jest **podstawą do zaprojektowania usytuowania domu** i wymaganym załącznikiem do wniosku o pozwolenie na budowę.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders **koordynujemy współpracę z geodetą**, aby cały proces przebiegł sprawnie.'
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
          iconName: 'home',
          title: 'Czy mogę budować dom bez pozwolenia?',
          content: [
            {
              type: 'paragraph',
              value: '**Tak, ale tylko do 70m²**. Od lipca 2023 roku obowiązują nowe przepisy: domy **do 70m² powierzchni użytkowej** można budować **bez pozwolenia na budowę**, wystarczy zgłoszenie w urzędzie.'
            },
            {
              type: 'paragraph',
              value: '**Warunki:** Dom musi być **parterowy** (bez poddasza użytkowego), na działce objętej **Miejscowym Planem Zagospodarowania Przestrzennego (MPZP)** lub z decyzją o **Warunkach Zabudowy (WZ)**. Odległość od granic działki min. **3 metry**.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders przygotowujemy **projekty kompaktowych domów do 70m²**, które spełniają wszystkie wymogi nowych przepisów.'
            }
          ]
        },

        // TRUDNE PRZYPADKI
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
              value: 'Adaptacja projektu gotowego na taką działkę jest często bardzo kosztowna i kompromisowa. W CoreLTB Builders **specjalizujemy się w projektach na wymagających działkach**, w pełni wykorzystując ich potencjał (np. podpiwniczenie częściowe, taras na poziomie parteru od południa, garaż wbudowany w skarpy).'
            }
          ]
        },
        {
          iconName: 'alertTriangle',
          title: 'Co jeśli w trakcie projektowania zmienią się warunki zabudowy?',
          content: [
            {
              type: 'paragraph',
              value: 'Zdarza się rzadko, ale to możliwe (np. uchwalenie nowego MPZP). Jeśli zmiana nastąpi **przed złożeniem wniosku o pozwolenie**, musimy dostosować projekt do nowych przepisów (dodatkowy koszt zależny od zakresu zmian).'
            },
            {
              type: 'paragraph',
              value: 'Jeśli zmiana nastąpi **po uzyskaniu pozwolenia**, Twoje pozwolenie **pozostaje ważne** (prawo nabyte). W CoreLTB Builders **monitorujemy lokalną sytuację prawną** i informujemy Cię o ewentualnych zmianach na bieżąco.'
            }
          ]
        },
        {
          iconName: 'users',
          title: 'Co jeśli sąsiad się sprzeciwi mojemu projektowi?',
          content: [
            {
              type: 'paragraph',
              value: 'Sąsiad ma prawo **złożyć uwagi** do projektu w ciągu **21 dni** od wywieszenia obwieszczenia w urzędzie. Urząd bada te uwagi i może: **odrzucić je** (jeśli są nieuzasadnione), **nakazać modyfikację projektu** (jeśli są uzasadnione).'
            },
            {
              type: 'paragraph',
              value: '**Jak się bronić:** Najlepszą obroną jest **projekt zgodny z prawem** (odległości od granic, wysokość budynku, architektura zgodna z MPZP). W CoreLTB Builders dbamy o to, by projekty były **prawnie niepodważalne**, co minimalizuje ryzyko skutecznych protestów sąsiadów.'
            }
          ]
        },
        {
          iconName: 'xCircle',
          title: 'Co jeśli projekt gotowy nie przejdzie w urzędzie?',
          content: [
            {
              type: 'paragraph',
              value: 'Najczęstsze przyczyny odmowy: **niezgodność z MPZP/WZ** (np. przekroczenie wysokości budynku), **błędy formalne** (brak wymaganych uzgodnień), **nieprawidłowa dokumentacja**.'
            },
            {
              type: 'paragraph',
              value: '**Nasze rozwiązanie:** Przed zakupem projektu gotowego **weryfikujemy jego zgodność** z warunkami Twojej działki. Dzięki temu eliminujemy ryzyko odmowy. Jeśli mimo to urząd zgłosi uwagi, **szybko wprowadzamy poprawki** i ponownie składamy wniosek.'
            }
          ]
        },
        {
          iconName: 'trendingUp',
          title: 'Co jeśli projekt będę chciał rozbudować za 5 lat?',
          content: [
            {
              type: 'paragraph',
              value: 'Doskonałe pytanie! To często pomijany aspekt. Jeśli planujesz **przyszłą rozbudowę** (np. dodanie garażu, powiększenie salonu), warto to uwzględnić już na etapie projektu.'
            },
            {
              type: 'paragraph',
              value: '**Nasze rozwiązanie:** Projektujemy dom z "zapasem" – fundamenty i konstrukcja przygotowane na przyszłą rozbudowę (dodatkowe zbrojenie, rezerwa w instalacjach). To kosztuje **niewiele na etapie budowy**, ale oszczędza **dziesiątki tysięcy złotych** przy rozbudowie w przyszłości.'
            },
            {
              type: 'paragraph',
              value: 'W CoreLTB Builders rozmawiamy z klientami o **długoterminowych planach** i projektujemy domy gotowe na przyszłość.'
            }
          ]
        },
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
    metaTitle: 'Projektowanie Domu | CoreLTB Builders - Od Marzenia do Projektu',
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
    category: 'Nadzór i Doradztwo',
    title: 'Nadzór Budowlany i Doradztwo',

    // PageHeader
    pageHeader: {
      title: 'Nadzór Budowlany i Doradztwo',
      watermarkText: 'NADZÓR',
      backgroundImage: '/images/uslugi/nadzor-i-doradztwo/hero.webp',
      breadcrumbs: [
        { label: 'Strona główna', href: '/' },
        { label: 'Oferta', href: '/oferta' },
        { label: 'Nadzór i Doradztwo', href: '/oferta/nadzor-i-doradztwo' },
      ],
    },

    // Sekcja 1: Emotional Hero
    emotionalHero: {
      label: 'NADZÓR BUDOWLANY I DORADZTWO',
      headline: 'Twoja Budowa, Twoje Pieniądze, Nasza Ochrona',
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
        title: 'Nadzór Budowlany, Który Jest Po Twojej Stronie',
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
        title: 'Nasze Usługi Nadzoru',
        description: 'Poznaj kluczowe elementy profesjonalnego nadzoru budowlanego.',
      },
      steps: [
        // PLACEHOLDER - 7 kroków czeka na dane
        {
          id: 'kierownik-vs-inspektor',
          number: 1,
          icon: 'users',
          label: 'Kierownik vs Inspektor',
          title: 'Kierownik Budowy vs Inspektor Nadzoru',
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
          label: 'Kierownik Budowy',
          title: 'Usługa Kierownika Budowy',
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
          label: 'Inspektor Nadzoru',
          title: 'Inspektor Nadzoru Inwestorskiego',
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
              src: '/images/testimonials/marek-kasia.jpg',
              alt: 'Marek i Kasia',
            },
            name: 'Marek i Kasia',
            role: 'Inwestorzy prywatni',
          },
          rating: 5.0,
        },
        {
          quote:
            'Bez nadzoru byśmy tego nie zauważyli. Kierownik budowy z CoreLTB na bieżąco kontrolował każdy etap i trzymał wykonawcę w ryzach. Spokój ducha bezcenny.',
          author: {
            image: {
              src: '/images/testimonials/piotr-nowicki.jpg',
              alt: 'Piotr Nowicki',
            },
            name: 'Piotr Nowicki',
            role: 'Właściciel domu jednorodzinnego',
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
];

export const getServiceV2BySlug = (slug: string): ServiceV2 | undefined =>
  allServicesV2.find((s) => s.slug === slug);
