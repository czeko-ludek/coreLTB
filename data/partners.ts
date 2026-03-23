// =============================================================================
// PARTNERS DATA
// =============================================================================

export type PartnerCategory =
  | 'nieruchomosci'
  | 'materialy'
  | 'oze'
  | 'projektowanie'
  | 'wnetrza';

export const PARTNER_CATEGORY_LABELS: Record<PartnerCategory, string> = {
  nieruchomosci: 'Nieruchomości',
  materialy: 'Materiały budowlane',
  oze: 'OZE i instalacje',
  projektowanie: 'Projektowanie',
  wnetrza: 'Wnętrza i wykończenia',
};

export interface Partner {
  slug: string;
  name: string;
  logo: string;
  /** Scale multiplier for square/tall logos that appear small next to wide ones. Default 1. */
  logoScale?: number;
  category: PartnerCategory;
  shortDescription: string;
  description: string[];
  services: string[];
  location: string;
  website?: string;
  featured: boolean;
}

export const partners: Partner[] = [
  {
    slug: 'aslandi',
    name: 'Aslandi',
    logo: '/images/partners/aslandi.webp',
    logoScale: 2.5,
    category: 'oze',
    shortDescription:
      'Systemy fotowoltaiczne, pompy ciepła i OZE na Śląsku i w Małopolsce.',
    description: [
      'Aslandi to firma z Wodzisławia Śląskiego specjalizująca się w odnawialnych źródłach energii. Od ponad 5 lat realizuje kompleksowe instalacje fotowoltaiczne, montaż pomp ciepła, klimatyzacji oraz systemów rekuperacji na terenie Śląska, Opolszczyzny i Małopolski.',
      'Każdy klient Aslandi otrzymuje dedykowanego opiekuna, który prowadzi go przez cały proces — od audytu energetycznego, przez pomoc w uzyskaniu dotacji, aż po odbiory techniczne. Firma wyróżnia się transparentnością i prowadzi kanał YouTube, na którym pokazuje przebieg montaży.',
    ],
    services: [
      'Instalacje fotowoltaiczne',
      'Pompy ciepła',
      'Magazyny energii',
      'Klimatyzacja i rekuperacja',
      'Ogrzewanie podłogowe',
      'Ładowarki EV',
    ],
    location: 'Wodzisław Śląski',
    website: 'https://aslandi.pl',
    featured: true,
  },
  {
    slug: 'sewera',
    name: 'Sewera Polska Chemia',
    logo: '/images/partners/sewera.webp',
    category: 'materialy',
    shortDescription:
      'Lider zaopatrzenia budowlanego na Górnym Śląsku — od 1990 roku.',
    description: [
      'Sewera Polska Chemia to jedna z największych hurtowni budowlanych na Górnym Śląsku, działająca od 1990 roku. Firma posiada kilkanaście oddziałów m.in. w Katowicach, Sosnowcu, Gliwicach, Tarnowskich Górach, Chrzanowie i Oświęcimiu. Zatrudnia ok. 300 osób i generuje roczny obrót na poziomie 200 mln zł.',
      'Sewera jest strategicznym partnerem czołowych polskich i europejskich producentów materiałów budowlanych, takich jak Atlas, Ceresit, Mapei, Rigips czy Śnieżka. Oferuje szeroki asortyment materiałów budowlanych, chemii, farb i lakierów — od fundamentów po dach.',
    ],
    services: [
      'Materiały budowlane',
      'Chemia budowlana',
      'Farby i lakiery',
      'Pokrycia dachowe',
      'Izolacje',
      'Fachowe doradztwo',
    ],
    location: 'Katowice (kilkanaście oddziałów na Śląsku)',
    website: 'https://sewera.pl',
    featured: true,
  },
  {
    slug: 'lubar',
    name: 'LUBAR',
    logo: '/images/partners/lubar.webp',
    category: 'materialy',
    shortDescription:
      'Hurtownia budowlana i betoniarnia z Rybnika — ponad 30 lat na rynku.',
    description: [
      'LUBAR to rodzinna firma z Rybnika założona w 1989 roku przez Lucjana i Barbarę — od ich imion pochodzi nazwa marki. Przez ponad 30 lat LUBAR rozrósł się do jednej z największych hurtowni budowlanych na Śląsku, oferując materiały budowlane „od fundamentów po dach".',
      'Firma posiada własne, nowoczesne węzły betoniarskie w Rybniku i Łaziskach Górnych oraz 5 oddziałów: Pilchowice, Jaworzno, Tarnowskie Góry, Gorzyce i Orzesze. W sklepie internetowym sklep-lubar.pl dostępnych jest kilkanaście tysięcy produktów od ok. 200 producentów.',
    ],
    services: [
      'Materiały budowlane',
      'Beton konstrukcyjny',
      'Elektronarzędzia',
      'Salon łazienek',
      'Sklep internetowy 24/7',
      'Program lojalnościowy LUBARKI',
    ],
    location: 'Rybnik (5 oddziałów na Śląsku)',
    website: 'https://sklep-lubar.pl',
    featured: true,
  },
  {
    slug: 'xal-projekt',
    name: 'XAL Projekt',
    logo: '/images/partners/xal-projekt.webp',
    logoScale: 1.15,
    category: 'projektowanie',
    shortDescription:
      'Biuro projektowe z Wodzisławia — projekty domów, nadzór i dokumentacja.',
    description: [
      'XAL Projekt to biuro projektowe z siedzibą w Wodzisławiu Śląskim, oferujące kompleksową obsługę inwestycji budowlanych — od koncepcji architektonicznej po nadzór nad realizacją. Firma powstała z pasji do budownictwa i wieloletniego doświadczenia jej założyciela.',
      'Zespół XAL Projekt prowadzi inwestorów przez cały proces: projektowanie, przygotowanie kosztorysów, kompletowanie dokumentacji, pozyskiwanie pozwoleń na budowę, obsługę geodezyjną oraz nadzór budowlany. Każdy członek ekipy ma kilkuletnie doświadczenie w branży budowlanej.',
    ],
    services: [
      'Projekty domów jednorodzinnych',
      'Kosztorysy inwestorskie',
      'Dokumentacja budowlana',
      'Pozwolenia na budowę',
      'Obsługa geodezyjna',
      'Nadzór budowlany',
    ],
    location: 'Wodzisław Śląski',
    website: 'https://xal-projekty.pl',
    featured: true,
  },
  {
    slug: 'dreamspace',
    name: 'Dream Space',
    logo: '/images/partners/dreamspace.webp',
    category: 'projektowanie',
    shortDescription:
      'Innowacyjny showroom architektoniczny — wizualizacje projektów w skali 1:1.',
    description: [
      'Dream Space to innowacyjna pracownia architektoniczna z Chorzowa, która łączy technologię wyświetlania projektów w skali 1:1 z wiedzą architektów i inżynierów. Dzięki temu każdy inwestor może zobaczyć i doświadczyć swojego domu jeszcze zanim powstanie.',
      'Firma prowadzi inwestora od koncepcji i projektu indywidualnego domu aż po budowę w nowoczesnych technologiach, w tym w konstrukcji stalowej. 88% klientów Dream Space odczuwa mniej konieczności poprawek po rozpoczęciu realizacji, a 96% wykazuje większą pewność co do swoich projektów.',
    ],
    services: [
      'Wizualizacje 1:1 (showroom)',
      'Projekty indywidualne domów',
      'Domy w konstrukcji stalowej',
      'Aranżacja wnętrz',
      'Arena VR',
      'Eventy sprzedażowe',
    ],
    location: 'Chorzów',
    website: 'https://dreamspace.com.pl',
    featured: true,
  },
  {
    slug: 'domex',
    name: 'Domex Nieruchomości',
    logo: '/images/partners/domex.webp',
    logoScale: 2.5,
    category: 'nieruchomosci',
    shortDescription:
      'Biuro nieruchomości z Wodzisławia — sprzedaż, kupno i wynajem od 2008 r.',
    description: [
      'Domex Nieruchomości to biuro z Wodzisławia Śląskiego, które od 2008 roku oferuje kompleksową obsługę transakcji na rynku nieruchomości. Firma specjalizuje się w sprzedaży, kupnie i wynajmie domów, mieszkań i działek na terenie województwa śląskiego.',
      'Innowacyjne podejście do klienta i znajomość rynku lokalnego pozwalają Domex skutecznie dopasowywać oferty do indywidualnych potrzeb inwestorów. Biuro działa na terenie Wodzisławia Śląskiego, Rybnika, Cieszyna, Skoczowa oraz całego Podbeskidzia.',
    ],
    services: [
      'Pośrednictwo w sprzedaży',
      'Pomoc w zakupie nieruchomości',
      'Wynajem lokali',
      'Doradztwo inwestycyjne',
      'Wycena nieruchomości',
      'Obsługa prawna transakcji',
    ],
    location: 'Wodzisław Śląski',
    website: 'https://dom-ex.pl',
    featured: true,
  },
  {
    slug: 'lr-nieruchomosci',
    name: 'L-R Nieruchomości',
    logo: '/images/partners/lr-nieruchomosci.webp',
    logoScale: 1.15,
    category: 'nieruchomosci',
    shortDescription:
      'Licencjonowane biuro nieruchomości z Wodzisławia z pełną obsługą prawną.',
    description: [
      'L-R Nieruchomości to licencjonowane biuro pośrednictwa w obrocie nieruchomościami z siedzibą w Wodzisławiu Śląskim. Firma oferuje kompleksowe usługi — od pomocy w ustaleniu stanu prawnego nieruchomości, przez współpracę z kancelariami notarialnymi i rzeczoznawcami majątkowymi, aż po pomoc w uzyskaniu kredytu hipotecznego.',
      'Wszystkie działania biura są objęte ubezpieczeniem OC, a pośrednik posiada licencję nr 28781. Klienci cenią sobie indywidualne podejście, profesjonalne doradztwo i bezpieczeństwo transakcji — profil na Facebooku ma 100% pozytywnych rekomendacji.',
    ],
    services: [
      'Pośrednictwo kupno/sprzedaż',
      'Wynajem i dzierżawa',
      'Obsługa prawna i notarialna',
      'Współpraca z rzeczoznawcami',
      'Pomoc kredytowa',
      'Ubezpieczenie OC transakcji',
    ],
    location: 'Wodzisław Śląski',
    website: 'https://l-r.com.pl',
    featured: true,
  },
  {
    slug: 'optima',
    name: 'Optima Nieruchomości',
    logo: '/images/partners/optima.webp',
    logoScale: 2.5,
    category: 'nieruchomosci',
    shortDescription:
      'Biuro nieruchomości — Wodzisław Śląski i okolice.',
    description: [
      'Optima Nieruchomości to biuro z Wodzisławia Śląskiego specjalizujące się w pośrednictwie w transakcjach kupna, sprzedaży i wynajmu nieruchomości. Firma działa na terenie Wodzisławia Śląskiego, Pszowa, Turzy Śląskiej, Rybnika i okolic.',
      'Biuro oferuje pełen serwis — od analizy rynku po obsługę formalności prawnych. Licencja Polskiej Federacji Rynku Nieruchomości nr 29649 potwierdza profesjonalizm i rzetelność usług.',
    ],
    services: [
      'Sprzedaż mieszkań',
      'Sprzedaż domów',
      'Sprzedaż działek budowlanych',
      'Wynajem nieruchomości',
    ],
    location: 'Wodzisław Śląski',
    website: 'https://optima-nieruchomosci.com.pl',
    featured: true,
  },
  {
    slug: 'maxfliz',
    name: 'Max-Fliz',
    logo: '/images/partners/maxfliz.webp',
    category: 'wnetrza',
    shortDescription:
      'Salon wnętrz premium — płytki, meble, oświetlenie, łazienki. Kraków, Katowice, Warszawa, Wrocław.',
    description: [
      'Max-Fliz to sieć salonów wnętrz premium działająca od lat na polskim rynku. Flagowy showroom w Krakowie przy ul. Zakopiańskiej 58 oraz salony w Katowicach, Warszawie i Wrocławiu oferują wszystko, co niezbędne do stworzenia wyjątkowej przestrzeni — od płytek ceramicznych, przez meble i oświetlenie, po kompletne wyposażenie łazienek.',
      'Firma realizuje również projekty „pod klucz" — wizualizacje wnętrz, dobór materiałów i kompleksowe wykończenia zarówno dla klientów indywidualnych, jak i deweloperów. Współpraca z Max-Fliz daje naszym klientom dostęp do materiałów wykończeniowych w cenach partnerskich.',
    ],
    services: [
      'Płytki ceramiczne',
      'Meble i wyposażenie',
      'Oświetlenie',
      'Wyposażenie łazienek',
      'Podłogi i drzwi',
      'Wykończenia pod klucz',
    ],
    location: 'Kraków, Katowice, Warszawa, Wrocław',
    website: 'https://www.maxfliz.pl',
    featured: true,
  },
  {
    slug: 'extradom',
    name: 'Extradom.pl',
    logo: '/images/partners/extradom.webp',
    logoScale: 2.875,
    category: 'projektowanie',
    shortDescription:
      'Największa w Polsce platforma z projektami domów — ponad 9 000 gotowych projektów.',
    description: [
      'Extradom.pl to największa w Polsce hybrydowa platforma łącząca marketplace projektów domów z autorską pracownią architektoniczną. Firma działa od 2000 roku i obsłużyła ponad 100 000 inwestorów. W ofercie znajduje się ponad 9 000 zweryfikowanych projektów domów jednorodzinnych.',
      'Platforma oferuje kompleksowe wsparcie — od doboru projektu i konfiguratora online, przez dokumentację techniczną, po kosztorysy budowlane. Autorska kolekcja Bergen wyróżnia się nowoczesnym designem i optymalizacją kosztów budowy.',
    ],
    services: [
      'Gotowe projekty domów',
      'Autorska pracownia architektoniczna',
      'Konfigurator online',
      'Dokumentacja techniczna',
      'Kosztorysy budowlane',
      'Domy prefabrykowane i modułowe',
    ],
    location: 'Wrocław (platforma ogólnopolska)',
    website: 'https://www.extradom.pl',
    featured: true,
  },
  {
    slug: 'galeriadomow',
    name: 'Galeria Domów',
    logo: '/images/partners/galeriadomow.webp',
    logoScale: 1.3,
    category: 'projektowanie',
    shortDescription:
      'Projekty domów jednorodzinnych — parterowe, piętrowe, energooszczędne. Kraków.',
    description: [
      'Galeria Domów to pracownia projektowa z Krakowa oferująca szeroką bazę gotowych projektów domów jednorodzinnych. W portfolio znajdują się domy parterowe, z poddaszem użytkowym, piętrowe, bliźniaki oraz projekty energooszczędne — w tym rozwiązania na wąskie działki i tanie w budowie.',
      'Firma zapewnia doradztwo w doborze projektu do działki, e-katalogi oraz obsługę posprzedażną z możliwością modyfikacji projektów. Projekty z katalogu Galerii Domów dostępne w naszej ofercie znajdziesz <a href="/projekty?source=galeriadomow">tutaj</a>.',
    ],
    services: [
      'Projekty domów jednorodzinnych',
      'Domy parterowe i piętrowe',
      'Projekty energooszczędne',
      'Dopasowanie projektu do działki',
      'Modyfikacje projektów',
      'E-katalogi',
    ],
    location: 'Kraków',
    website: 'https://www.galeriadomow.pl',
    featured: true,
  },
  {
    slug: 'malachit',
    name: 'Pracownia Projektowa Malachit',
    logo: '/images/partners/malachit.webp',
    logoScale: 1.15,
    category: 'projektowanie',
    shortDescription:
      'Pracownia architektoniczna z Rybnika — ponad 300 projektów domów i budynków.',
    description: [
      'Pracownia Projektowa Malachit to biuro architektoniczne z Rybnika (ul. Żorska 205) specjalizujące się w projektach domów jednorodzinnych, bliźniaczych, dwulokalowych oraz budynków wielorodzinnych i usługowych. W katalogu firmy znajduje się ponad 300 projektów — od nowoczesnych i energooszczędnych po kompaktowe domy na małe działki.',
      'Malachit oferuje również adaptacje i modyfikacje projektów oraz doradztwo inwestycyjne. Jako lokalny partner z Rybnika, pracownia doskonale zna specyfikę budownictwa na Śląsku. Projekty Malachit dostępne w naszej ofercie znajdziesz <a href="/projekty?source=malachit">tutaj</a>.',
    ],
    services: [
      'Projekty domów jednorodzinnych',
      'Projekty domów bliźniaczych i dwulokalowych',
      'Budynki wielorodzinne i usługowe',
      'Projekty garaży',
      'Adaptacje i modyfikacje projektów',
      'Doradztwo inwestycyjne',
    ],
    location: 'Rybnik',
    website: 'https://www.projektymalachit.pl',
    featured: true,
  },
  {
    slug: 'viphouse',
    name: 'VIP House Nieruchomości',
    logo: '/images/partners/viphouse.webp',
    logoScale: 1.75,
    category: 'nieruchomosci',
    shortDescription:
      'Biuro nieruchomości — pośrednictwo w sprzedaży domów, mieszkań i działek.',
    description: [
      'VIP House Nieruchomości to biuro pośrednictwa w obrocie nieruchomościami, oferujące kompleksową obsługę transakcji kupna, sprzedaży i wynajmu domów, mieszkań oraz działek budowlanych.',
      'Biuro zapewnia profesjonalne doradztwo na każdym etapie transakcji — od wyceny nieruchomości, przez przygotowanie dokumentacji, po finalizację u notariusza. Współpraca z VIP House daje naszym klientom dostęp do ofert działek idealnych pod budowę domu.',
    ],
    services: [
      'Pośrednictwo kupno/sprzedaż',
      'Wynajem nieruchomości',
      'Działki budowlane',
      'Wycena nieruchomości',
      'Obsługa dokumentacji',
      'Doradztwo inwestycyjne',
    ],
    location: 'Śląsk',
    website: 'http://www.viphouse-nieruchomosci.pl',
    featured: true,
  },
  {
    slug: 'z500',
    name: 'Z500',
    logo: '/images/partners/z500.webp',
    logoScale: 1.15,
    category: 'projektowanie',
    shortDescription:
      'Międzynarodowa pracownia architektoniczna — ponad 1 300 projektów domów.',
    description: [
      'Z500 to międzynarodowa firma architektoniczna z siedzibą w Warszawie, specjalizująca się w projektach domów jednorodzinnych. Z ponad 1 300 projektami w ofercie i siecią ponad 900 salonów partnerskich, Z500 jest jednym z największych biur projektowych w Europie.',
      'Projekty Z500 wyróżniają się nowoczesnym designem, energooszczędnością i optymalizacją kosztów budowy. Firma oferuje również adaptacje, zmiany projektów oraz doradztwo kredytowe. Projekty Z500 dostępne w naszej ofercie znajdziesz <a href="/projekty?source=z500">tutaj</a>.',
    ],
    services: [
      'Projekty domów jednorodzinnych',
      'Projekty domów wielorodzinnych',
      'Adaptacje i modyfikacje projektów',
      'Projektowanie indywidualne',
      'Doradztwo kredytowe',
      'Katalogi i materiały edukacyjne',
    ],
    location: 'Warszawa (sieć ogólnopolska)',
    website: 'https://z500.pl',
    featured: true,
  },
];

// Helper: all partners for marquee
export const allPartnerLogos = partners.map((p) => ({
  name: p.name,
  image: p.logo,
  scale: p.logoScale,
  slug: p.slug,
}));

// Helper: partners by category
export function getPartnersByCategory(
  category: PartnerCategory
): Partner[] {
  return partners.filter((p) => p.category === category);
}

// Helper: get partner by slug
export function getPartnerBySlug(slug: string): Partner | undefined {
  return partners.find((p) => p.slug === slug);
}

// All categories that have partners
export function getActiveCategories(): PartnerCategory[] {
  const cats = new Set(partners.map((p) => p.category));
  return Array.from(cats) as PartnerCategory[];
}
