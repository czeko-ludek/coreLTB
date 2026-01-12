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
      label: 'KOMPLEKSOWA BUDOWA DOMÓW',
      headline: ['Generalny wykonawca',
      'nadzór, logistyka i stała cena'
    ],
      subtitle:
        'Jako generalny wykonawca, zastępujemy chaos "systemu gospodarczego" inżynierskim procesem budowlanym. Przejmujemy 100% odpowiedzialności za logistykę na Śląsku, w Małopolsce i Opolskiem – od analizy gruntu, przez stan surowy, aż po odbiory techniczne.',
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
      title: 'Jeden partner, jedna umowa, pełna odpowiedzialność',
      description:
        'Zapomnij o koordynowaniu dziesiątek podwykonawców. Jako generalny wykonawca, podpisujesz z nami jedną, przejrzystą umowę i to my odpowiadamy za wszystko: od projektu, przez budowę, aż po odbiory.',
    },
    {
      number: 2,
      iconName: 'shieldCheck', // Sugeruję zmianę ikony na symbolizującą bezpieczeństwo
      title: 'Gwarancja stałej ceny i terminu – bez niespodzianek',
      description:
        'Podpisujesz umowę na kwotę brutto. To my bierzemy na siebie ryzyko, że stal lub styropian zdrożeje w przyszłym miesiącu. Twój kosztorys dla Banku jest "sztywny" i bezpieczny',
    },
    {
      number: 3,
      iconName: 'award', // Sugeruję zmianę ikony na symbolizującą jakość
      title: 'Technologia Dobrana do Gruntu',
      description:
        'Zrealizowaliśmy wiele inwestycji na wymagających, gliniastych terenach Południowej Polski. Nie powielamy schematów – dobieramy izolacje i typ fundamentowania (ławy vs płyta) indywidualnie pod wyniki badań geotechnicznych, eliminując ryzyko pękania ścian po latach.',
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

    // Sekcja 7: Etapy Współpracy (Timeline bez linii)
    cooperationTimelineNoLine: {
      header: {
        label: 'JAK PRACUJEMY',
        title: 'Droga do Twojego wymarzonego domu',
        description: 'Etapy Współpracy z Nami',
        theme: 'light' as const,
      },
      steps: [
        {
          id: 'etap-1',
          number: 1,
          icon: 'mapPin',
          label: 'Działka',
          title: 'Działka budowlana',
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
          title: 'Projekt domu',
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
          title: 'Przyłącza budowlane',
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
          title: 'Pozwolenie na budowę',
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
          title: 'Wsparcie w finansowaniu',
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
          title: 'Realizacja budowy',
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
          title: 'Zagospodarowanie terenu',
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
          title: 'Odbiór i gwarancja',
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
    title: 'Projektowanie domu',

    // PageHeader
    pageHeader: {
      title: 'Projektowanie domu',
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
      headline: 'Od marzenia do projektu',
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
          title: 'Twój projekt, nasza wiedza',
          description:
            'U nas nie ma konfliktu między wizją architekta a realiami budowy. Nasz zespół projektowy pracuje ramię w ramię z kierownikami budowy. Każda kreska jest weryfikowana pod kątem wykonalności i kosztów, co eliminuje stres i nieprzewidziane wydatki na późniejszym etapie.',
        },
        {
          number: 2,
          iconName: 'landmark',
          title: 'Twój budżet, nasz priorytet',
          description:
            'Zaczynamy od Twoich realnych możliwości finansowych. Projektujemy dom, na który Cię stać. Optymalizujemy każde rozwiązanie pod kątem trwałości i ekonomii. Nigdy kosztem jakości. Nie tworzymy drogich fantazji – tworzymy realne, wykonalne plany.',
        },
        {
          number: 3,
          iconName: 'building',
          title: 'Wiedza prosto z budowy',
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
        title: 'Od koncepcji do gotowego projektu',
        description: 'Projekt to najważniejszy etap, który decyduje o kosztach, funkcjonalności i komforcie Twojego przyszłego domu. Zobacz, jak przeprowadzimy Cię przez ten proces, gwarantując spokój i bezpieczeństwo inwestycji.',
      },
      steps: [
        {
          id: 'projekt-gotowy',
          number: 1,
          icon: 'fileText',
          label: 'Projekt gotowy',
          title: 'Analiza projektu gotowego (katalogowego)',
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
          label: 'Projekt indywidualny',
          title: 'Projekt indywidualny',
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
                '**Wyższa cena**: Koszt projektu to średnio **100 - 450 zł za m²**.',
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
          title: 'Adaptacja projektu',
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
          title: 'Budżet i koszty',
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
                '**Projekt indywidualny (100 - 450 zł / m²):** Projekt "szyty na miarę", zintegrowany z realnym kosztorysem budowy.'
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
          title: 'Kompletna dokumentacja budowlana',
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
          title: 'Praktyczne rozwiązania, które oszczędzają pieniądze',
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
          label: 'Unikanie błędów',
          title: 'Eliminacja najczęstszych błędów projektowych',
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
        title: 'Odpowiedzi na kluczowe pytania o projektowanie',
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
              value: 'Średnio proces ten zajmuje **od 24 do 36 tygodni**. Czas ten obejmuje stworzenie koncepcji, przygotowanie projektu budowlanego i uzyskanie wszystkich niezbędnych uzgodnień.'
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
              src: '/images/testimonials/marek-kasia.jpg',
              alt: 'Marek i Kasia Nowak',
            },
            name: 'Marek i Kasia Nowak',
            role: 'Inwestorzy prywatni',
          },
          rating: 5.0,
        },
        {
          quote:
            'Kosztorys wykonany przez CoreLTB pozwolił nam odkryć, że oferta jednego z wykonawców była zawyżona o 120 000 zł. Mając twarde dane, negocjowaliśmy z pozycji siły i znaleźliśmy uczciwego wykonawcę.',
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
          quote: 'Byliśmy przerażeni wizją koordynacji kilkunastu fachowców. CoreLTB wzięło wszystko na siebie. Jeden Project Manager, stały kontakt i wszystko zapięte na ostatni guzik. Dla nas, osób pracujących na pełen etat, ten spokój był bezcenny. Polecamy z całego serca.',
          author: {
            image: {
              src: '/images/testimonials/kowalscy.webp',
              alt: 'Anna i Tomasz Kowalscy',
            },
            name: 'Anna i Tomasz Kowalscy',
            role: 'Właściciele domu pod Warszawą',
          },
          rating: 5.0,
        },
        {
          quote: 'Największym plusem była transparentność i trzymanie się budżetu. Kosztorys, który otrzymałem na początku, zgadzał się co do złotówki z fakturą końcową. W dzisiejszych czasach to rzadkość. Pełen profesjonalizm i uczciwość.',
          author: {
            image: {
              src: '/images/testimonials/nowak.webp',
              alt: 'Piotr Nowak',
            },
            name: 'Piotr Nowak',
            role: 'Inwestor z Krakowa',
          },
          rating: 5.0,
        },
        {
          quote: 'Jestem estetką i zwracam uwagę na detale. Ekipa CoreLTB wykazała się niesamowitą precyzją – idealnie równe gładzie, perfekcyjnie położone płytki, wszystko wykonane z najwyższą starannością. Jakość wykonania przerosła moje oczekiwania. Dom jest piękny!',
          author: {
            image: {
              src: '/images/testimonials/wisniewska.webp',
              alt: 'Katarzyna Wiśniewska',
            },
            name: 'Katarzyna Wiśniewska',
            role: 'Właścicielka domu jednorodzinnego',
          },
          rating: 5.0,
        },
        {
          quote: 'Budowałem dom, mieszkając 300 km dalej. Nadzór i koordynacja prac wykończeniowych przez CoreLTB były kluczowe. Otrzymywałem cotygodniowe raporty ze zdjęciami i mogłem spokojnie pracować, wiedząc że wszystko idzie zgodnie z planem. Bezproblemowa współpraca na odległość.',
          author: {
            image: {
              src: '/images/testimonials/zielinski.webp',
              alt: 'Marek Zieliński',
            },
            name: 'Marek Zieliński',
            role: 'Inwestor budujący zdalnie',
          },
          rating: 5.0,
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
