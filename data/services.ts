// /data/services.ts
// Struktura danych dla usług budowlanych
// Kompatybilna z przyszłą migracją do Headless CMS (Strapi)

import { IconName } from '@/components/ui';

// --- Typy Danych ---

export interface ServiceFeature {
  icon: IconName; // Nazwa ikony z lucide-react
  title: string;
  description: string;
}

export interface ServiceBenefit {
  title: string;
  description: string;
}

export interface ServiceStep {
  number: string; // np. "01", "02"
  title: string;
  description: string;
}

export interface ServiceRealization {
  image: string; // Ścieżka do zdjęcia, np. 'realizacja-1.jpg'
  alt: string;
  title?: string;
  location?: string; // np. "Kraków, Małopolskie"
}

export interface ServiceProofItem {
  value: string; // np. "350+", "98%"
  label: string; // np. "Zadowolonych klientów", "Terminowość realizacji"
  description?: string;
}

export interface ServiceCTA {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface ServiceArea {
  provinces: string[]; // np. ["małopolskie", "śląskie"]
  description: string;
}

export interface ServiceContent {
  title: string;
  content: string; // Może zawierać \n dla nowych linii, wspierane przez whitespace-pre-line
}

// --- Główny Typ Usługi ---

export interface Service {
  slug: string;
  id: string;
  category: string; // np. "Budowa Domów"
  title: string;
  subtitle: string;
  description: string;
  heroImage: string; // Ścieżka do głównego obrazu w PageHeader
  heroImageAlt: string;

  // Sekcja głównych cech (ikony)
  features: ServiceFeature[];

  // Elastyczność rozpoczęcia współpracy
  flexibilityOptions: {
    title: string;
    options: {
      stage: string; // np. "Nie masz działki ani projektu?"
      description: string;
      icon: IconName;
    }[];
  };

  // Proces współpracy (timeline)
  processSteps: ServiceStep[];

  // Obszar działania
  serviceArea: ServiceArea;

  // Dowód społeczny (proof)
  proofItems: ServiceProofItem[];

  // Sekcje treści (elastyczne, różne dla każdej usługi)
  contentSections: ServiceContent[];

  // Realizacje (galeria)
  realizations: ServiceRealization[];

  // CTA (wezwanie do działania)
  cta: ServiceCTA;

  // SEO
  metaTitle?: string;
  metaDescription?: string;

  // Data utworzenia/aktualizacji (przygotowanie pod Strapi)
  createdAt?: string;
  updatedAt?: string;
}

// --- Przykładowe Dane ---

export const allServices: Service[] = [
  {
    slug: 'kompleksowa-budowa-domow',
    id: 'kompleksowa-budowa-domow',
    category: 'Kompleksowa Budowa Domów',
    title: 'Kompleksowa Budowa Domów',
    subtitle: 'Twój wymarzony dom – szybciej i pewniej, niż myślisz',
    description: 'Budujemy domy murowane z gwarancją jakości i terminu. Od poszukiwania działki, przez projekt, aż po przekazanie kluczy – zajmujemy się wszystkim.',
    heroImage: '/images/uslugi/kompleksowa-budowa-domow/hero.jpg',
    heroImageAlt: 'Budowa domu jednorodzinnego przez CoreLTB Builders',

    features: [
      {
        icon: 'hammer',
        title: 'Technologia murowana',
        description: 'Budujemy z solidnego pustaka ceramicznego – trwale i energooszczędnie.',
      },
      {
        icon: 'zap',
        title: 'Ekspresowe tempo budowy',
        description: 'Dzięki przemyślanej organizacji i sprawdzonym ekipom – 6-12 miesięcy.',
      },
      {
        icon: 'briefcase',
        title: 'Kompleksowa obsługa',
        description: 'Od projektu i formalności, po gotowy dom – wszystko pod jednym dachem.',
      },
      {
        icon: 'shieldCheck',
        title: 'Gwarancja jakości i terminu',
        description: 'Pisemna umowa, transparentne warunki i 5 lat gwarancji na wykonane prace.',
      },
    ],

    flexibilityOptions: {
      title: 'Rozpocznij współpracę na każdym etapie',
      options: [
        {
          stage: 'Nie masz działki ani projektu?',
          description: 'Pomożemy znaleźć idealną działkę i zaprojektujemy dom dopasowany do Twoich potrzeb.',
          icon: 'mapPin',
        },
        {
          stage: 'Masz działkę, ale brak projektu?',
          description: 'Nasi architekci stworzą projekt autorski lub zaadaptują gotowy do Twojej działki.',
          icon: 'penTool',
        },
        {
          stage: 'Masz projekt, ale bez pozwolenia?',
          description: 'Załatwimy wszystkie formalności – od zgłoszenia budowy po pozwolenie na użytkowanie.',
          icon: 'fileText',
        },
        {
          stage: 'Masz pozwolenie i szukasz wykonawcy?',
          description: 'Budujemy terminowo, z transparentną ceną i gwarancją jakości wpisaną do umowy.',
          icon: 'hardHat',
        },
      ],
    },

    processSteps: [
      {
        number: '01',
        title: 'Analiza potrzeb i dobór projektu',
        description: 'Poznajemy Twoje oczekiwania, budżet i wymagania. Doradzamy przy wyborze projektu lub działki.',
      },
      {
        number: '02',
        title: 'Projekt i formalności',
        description: 'Przygotowujemy dokumentację projektową, załatwiamy pozwolenia i zgłoszenia budowlane.',
      },
      {
        number: '03',
        title: 'Wycena i umowa',
        description: 'Przedstawiamy szczegółową wycenę z harmonogramem. Podpisujemy przejrzystą umowę z gwarancjami.',
      },
      {
        number: '04',
        title: 'Budowa domu',
        description: 'Realizujemy inwestycję zgodnie z harmonogramem. Otrzymujesz regularne raporty i zdjęcia z placu budowy.',
      },
      {
        number: '05',
        title: 'Odbiory i przekazanie kluczy',
        description: 'Przeprowadzamy odbiory techniczne i przekazujemy gotowy dom. Zapewniamy 5 lat gwarancji.',
      },
    ],

    serviceArea: {
      provinces: ['małopolskie', 'śląskie', 'świętokrzyskie'],
      description: 'Realizujemy inwestycje na terenie południowej Polski. Działamy lokalnie – znamy specyfikę regionu, warunki gruntowe i najlepszych lokalnych dostawców.',
    },

    proofItems: [
      {
        value: '350+',
        label: 'Wybudowanych domów',
        description: 'Od 2010 roku zrealizowaliśmy setki projektów dla zadowolonych rodzin.',
      },
      {
        value: '98%',
        label: 'Terminowość realizacji',
        description: 'Niemal wszystkie nasze inwestycje zakończyliśmy zgodnie z harmonogramem.',
      },
      {
        value: '96%',
        label: 'Klientów nas poleca',
        description: 'Nasi klienci chętnie rekomendują nas swoim bliskim i znajomym.',
      },
      {
        value: '5 lat',
        label: 'Gwarancji',
        description: 'Każda nasza budowa objęta jest 5-letnią gwarancją jakości wykonania.',
      },
    ],

    contentSections: [
      {
        title: 'Bezpieczeństwo finansowe w trakcie budowy',
        content: 'Budowa domu to poważna inwestycja – dlatego stawiamy na pełną transparentność. Precyzyjnie określamy koszt budowy i harmonogram płatności jeszcze przed rozpoczęciem prac.\n\nW naszej wycenie uwzględnione jest wszystko:\n• Projekt architektoniczny i konstrukcyjny\n• Obsługa formalności (pozwolenia, zgłoszenia)\n• Obsługa geodezyjna\n• Cały proces budowlany z odbiorami\n• Wstępne wyrównanie terenu\n• Zagospodarowanie odpadów budowlanych\n\nOprócz tego zapewniamy 5 lat gwarancji i ubezpieczenie budowy. Dzięki temu masz pewność, że Twój budżet jest pod kontrolą – bez ukrytych kosztów i nieprzyjemnych niespodzianek.',
      },
      {
        title: 'Nowoczesne technologie i materiały',
        content: 'Stawiamy na sprawdzoną w Polsce technologię murowaną, która gwarantuje solidną i trwałą konstrukcję na wiele lat. Współpracujemy wyłącznie z renomowanymi dostawcami materiałów budowlanych spełniających najwyższe standardy jakości.\n\nDla energooszczędnych domów oferujemy:\n• Materiały o doskonałej izolacji termicznej\n• Nowoczesne okna z niskim współczynnikiem przenikania ciepła\n• Odnawialne źródła energii: pompy ciepła, panele fotowoltaiczne\n• Ogrzewanie podłogowe, niskotemperaturowe\n• Rekuperację i mechaniczną wentylację\n• Przygotowanie instalacji pod dom inteligentny',
      },
      {
        title: 'Organizacja budowy i kontrola jakości',
        content: 'Budowa w zależności od warunków pogodowych i wielkości domu trwa od 6 do 12 miesięcy. Pracujemy według ustalonego harmonogramu i zapewniamy ciągły nadzór kierownika budowy.\n\nDzięki profesjonalnemu zarządzaniu minimalizujemy przestoje związane z organizacją ekip i dostaw materiałów. Co dwa tygodnie otrzymujesz raport z postępów prac oraz aktualne zdjęcia z placu budowy.\n\nPracujemy z doświadczonymi specjalistami posiadającymi odpowiednie kwalifikacje: murarzami, elektrykami, hydraulikami, dekarzami oraz projektantami. Każdy etap budowy podlega kontroli jakości.',
      },
    ],

    realizations: [
      {
        image: '/images/uslugi/kompleksowa-budowa-domow/realizacje/realizacja-1.jpg',
        alt: 'Budowa domu jednorodzinnego w Krakowie',
        title: 'Dom jednorodzinny 180m²',
        location: 'Kraków, Małopolskie',
      },
      {
        image: '/images/uslugi/kompleksowa-budowa-domow/realizacje/realizacja-2.jpg',
        alt: 'Nowoczesna stodoła w stylu barn house',
        title: 'Nowoczesna stodoła 140m²',
        location: 'Zakopane, Małopolskie',
      },
      {
        image: '/images/uslugi/kompleksowa-budowa-domow/realizacje/realizacja-3.jpg',
        alt: 'Dom energooszczędny z pompą ciepła',
        title: 'Dom energooszczędny 200m²',
        location: 'Katowice, Śląskie',
      },
    ],

    cta: {
      title: 'Gotowy na rozmowę o Twoim domu?',
      description: 'Umów się na bezpłatną konsultację. Poznamy Twoje potrzeby i przygotujemy szczegółową wycenę – bez zobowiązań.',
      buttonText: 'Zamów darmową wycenę',
      buttonLink: '/kontakt',
    },

    metaTitle: 'Kompleksowa Budowa Domów | CoreLTB Builders',
    metaDescription: 'Budujemy domy murowane od projektu po klucze. Gwarancja jakości, terminu i ceny. 350+ wybudowanych domów w południowej Polsce. Bezpłatna wycena.',

    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-01-15T10:00:00Z',
  },
];

export const getServiceBySlug = (slug: string): Service | undefined =>
  allServices.find((s) => s.slug === slug);
