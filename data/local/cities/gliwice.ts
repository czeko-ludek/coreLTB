import type { CityData } from '../types';

export const gliwiceData: CityData = {
  slug: 'gliwice',
  cityName: 'Gliwice',
  cityNameLocative: 'Gliwicach',

  meta: {
    title: 'Budowa Domów Gliwice – Generalny Wykonawca 2026 | CoreLTB Builders',
    description: 'Budowa domu jednorodzinnego w Gliwicach. Specjalizacja w terenach górniczych (kategorie I-IV). Płyty fundamentowe, wzmocnione konstrukcje. ✓ 12-18 miesięcy realizacji ✓ Gwarancja stałej ceny ✓ Własne brygady',
  },

  pageHeader: {
    title: 'Budowa Domów Gliwice',
    backgroundImage: '/images/local/gliwice/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW GLIWICE',
    headline: ['Budujesz dom w Gliwicach?', 'Przejmujemy odpowiedzialność za całą budowę'],
    subtitle: 'Budujemy domy jednorodzinne w Gliwicach i powiecie gliwickim — od projektu po odbiór w PINB. Znamy lokalny teren i dobieramy technologię do warunków Twojej działki. Realizacja w 12-18 miesięcy ze stałą ceną w umowie.',
    benefits: [
      'Pełna odpowiedzialność — jeden wykonawca, jeden kosztorys',
      'Technologia dobrana do warunków gruntowych Twojej działki',
      'Gwarancja stałej ceny i terminowości w umowie',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Dobierzemy optymalną technologię posadowienia',
      'Przedstawimy harmonogram i kosztorys',
      'Odpowiemy na wszystkie Twoje pytania',
    ],
    ctaBoxSubtext: 'Konsultacja jest bezpłatna i niezobowiązująca.',
    ctaBoxButtons: [
      { text: 'Zadzwoń do Nas', href: 'tel:+48664123757', variant: 'secondary' },
      { text: 'Wyceń budowę', href: '/wycena', variant: 'secondary' },
    ],
  },

  expertise: {
    header: {
      label: 'SPECYFIKA BUDOWY W GLIWICACH',
      title: 'Szkody górnicze i trudne grunty',
      description: 'Gliwice i powiat gliwicki to teren specyficzny geologicznie. Występowanie szkód górniczych (kategorie I-IV) oraz gruntów nasypowych wymaga indywidualnego podejścia do każdego projektu katalogowego.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Płyta fundamentowa a szkody górnicze',
        description: 'Na terenach objętych eksploatacją górniczą (np. w dzielnicach takich jak **Sośnica** czy **Bojków**), rekomendujemy i wykonujemy **płyty fundamentowe zbrojone**. Płyta działa jak sztywna taca – w przypadku ruchów górotworu cały budynek "pływa" na gruncie.',
        details: [
          'Realizacja fundamentów w strefie szkód obejmuje: **Wymianę gruntu** (wybranie rodzimej ziemi i wykonanie podbudowy z kruszywa łamanego stabilizowanego mechanicznie), **Zwiększone zbrojenie** (stosujemy stal klasy A-IIIN o podwyższonej ciągliwości, zgodnie z wytycznymi konstruktora), **Beton wodoszczelny** (używamy mieszanek klasy C25/30 z dodatkami uszczelniającymi W8).',
        ],
      },
      {
        icon: 'fileText',
        title: 'Adaptacja projektu do warunków lokalnych',
        description: 'Zanim wbijemy pierwszą łopatę, nasz zespół analizuje Miejscowy Plan Zagospodarowania Przestrzennego (MPZP) oraz opinie geologiczne. W Gliwicach często spotykamy się z koniecznością stosowania **dylatacji konstrukcyjnych** oraz dodatkowych wieńców żelbetowych.',
        details: [
          'Te elementy spinają budynek niczym klamra, zapewniając mu sztywność przestrzenną wymaganą przy wstrząsach górniczych. Nasz kierownik budowy dopilnuje zgodności wykonania z tymi zaostrzonymi rygorami.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-zbrojenie.webp',
      alt: 'Specyfika budowy w Gliwicach - szkody górnicze i trudne grunty',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'shield',
        title: 'Znajomość lokalnej geologii',
        description: 'Nie zgadujemy, jak zbroić fundamenty. Opieramy się na mapach górniczych i badaniach geotechnicznych specyficznych dla Gliwic.',
      },
      {
        icon: 'users',
        title: 'Własne, stałe brygady',
        description: 'Nie zlecamy prac przypadkowym podwykonawcom z ogłoszenia. Nasi murarze i zbrojarze to sprawdzony zespół, pracujący ze sobą od lat.',
      },
      {
        icon: 'trendingUp',
        title: 'Stała cena w umowie',
        description: 'W dobie inflacji materiałowej, gwarantujemy stałość ceny na zakontraktowany etap. Cena betonu czy cegły nie wzrośnie dla Ciebie w trakcie realizacji.',
      },
      {
        icon: 'shieldCheck',
        title: 'Niezależny nadzór',
        description: 'Zachęcamy do zatrudnienia Inspektora Nadzoru Inwestorskiego. Jesteśmy pewni jakości naszych prac i nie boimy się zewnętrznej kontroli technicznej.',
      },
    ],
  },

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Dzielnice Gliwic – gdzie realizujemy inwestycje?',
      description: 'Jako lokalny wykonawca znamy specyfikę poszczególnych dzielnic Gliwic. Wiemy, gdzie występują tereny pogórnicze, a gdzie grunt jest stabilny. Nie doliczamy kosztów logistycznych za dojazd z odległych miast.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Śródmieście' },
      { label: 'Sośnica' },
      { label: 'Bojków' },
      { label: 'Łabędy' },
      { label: 'Szobiszowice' },
      { label: 'Trynek' },
      { label: 'Ostropa' },
      { label: 'Brzezinka' },
      { label: 'Ligota Zabrska' },
      { label: 'Żerniki' },
    ],
    hubDescription: 'Realizujemy inwestycje we wszystkich dzielnicach Gliwic. W dzielnicach takich jak Sośnica czy Bojków szczególną uwagę zwracamy na zabezpieczenia przed szkodami górniczymi. Łabędy i Szobiszowice to rejony o stabilniejszym gruncie.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Budowa domów w Gliwicach – odpowiadamy na pytania',
      description: 'Zbieramy pytania, które najczęściej słyszymy od klientów planujących budowę w Gliwicach i okolicach.',
      align: 'center',
      theme: 'light',
    },
    items: [
      {
        question: 'Czy budowa na szkodach górniczych w Gliwicach jest bezpieczna?',
        content: [
          { type: 'paragraph', value: 'Budowa w strefie wpływów eksploatacji górniczej jest bezpieczna, o ile zastosuje się odpowiednie zabezpieczenia konstrukcyjne. W Gliwicach najczęściej rekomendujemy **płytę fundamentową**, która "pływa" na gruncie, minimalizując ryzyko pękania ścian. Inżynierowie CoreLTB Builders dobierają parametry zbrojenia indywidualnie do kategorii szkód, co gwarantuje spokój i trwałość domu na lata.' },
        ],
      },
      {
        question: 'Jaki fundament rekomendujecie – płytę czy ławy fundamentowe?',
        content: [
          { type: 'paragraph', value: 'Na terenach objętych szkodami górniczymi (np. Sośnica, Bojków) rekomendujemy **płytę fundamentową zbrojną**. Działa ona jak sztywna taca – nawet gdy grunt się przemieszcza, cały budynek pracuje jako jednolita bryła. Na stabilnych gruntach (np. Łabędy) można rozważyć tradycyjne ławy, ale decyzję podejmujemy po analizie badań geotechnicznych.' },
        ],
      },
      {
        question: 'Jak sprawdzić kategorię szkód górniczych działki?',
        content: [
          { type: 'paragraph', value: 'Aktualną kategorię terenu potwierdza **opinia geologiczno-górnicza**, którą wydaje lokalny zakład wydobywczy lub Okręgowy Urząd Górniczy. W ramach współpracy kompleksowo adaptujemy dokumentację do uzyskanej klasy szkód. Stosujemy niezbędne wzmocnienia, zapewniając pełne bezpieczeństwo konstrukcji.' },
        ],
      },
      {
        question: 'Ile kosztuje budowa domu 100–150 m² w Gliwicach w 2026 roku?',
        content: [
          { type: 'paragraph', value: 'Dom jednorodzinny **100–150 m²** w stanie deweloperskim to w Gliwicach wydatek **4 500–6 200 zł/m²**, a [realizacja pod klucz](/oferta/kompleksowa-budowa-domow) zamyka się w przedziale **6 500–8 500 zł/m²**. Na ostateczną cenę wpływa rodzaj fundamentu — na terenach po KWK Sośnica czy Gliwice zbrojona płyta fundamentowa podnosi koszt o **15–25%** względem tradycyjnych ław. W CoreLTB pracujemy w modelu ryczałtowym ze **stałą ceną w umowie**, niezależnie od wahań cen materiałów.' },
        ],
      },
      {
        question: 'Ile trwa budowa domu od fundamentów do stanu deweloperskiego w Gliwicach?',
        content: [
          { type: 'paragraph', value: 'Sam [stan deweloperski](/oferta/kompleksowa-budowa-domow) osiągamy w **5–8 miesięcy** od rozpoczęcia robót ziemnych. Etap fundamentów i stanu zerowego to **3–6 tygodni**, stan surowy otwarty kolejne **2–3 miesiące**, zamknięcie budynku (dach, okna, brama) dodatkowe 4–6 tygodni, a instalacje z tynkami — **6–8 tygodni**. Pełna realizacja pod klucz z [wykończeniem wnętrz](/oferta/wykonczenia-i-aranzacje) zajmuje łącznie **8–12 miesięcy**. Bliskość naszej bazy pozwala na codzienny nadzór i eliminację przestojów logistycznych.' },
        ],
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY REALIZACJI',
        title: 'Etapy budowy domu – zakres prac w naszej ofercie',
        description: 'Realizujemy inwestycje kompleksowo, dzieląc proces na czytelne etapy rozliczeniowe. Dzięki temu Inwestor płaci za faktycznie wykonane prace, zachowując płynność finansową.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'layers',
          title: '1. Stan Zerowy – fundamenty i izolacje',
          description: 'To najważniejszy etap dla trwałości budynku. Błędy popełnione tutaj są niemożliwe do taniego naprawienia w przyszłości.',
          details: [
            'Geodezyjne wytyczenie budynku na działce (tyczenie osi). Zdjęcie warstwy humusu i wykopy pod fundamenty. Wykonanie płyty fundamentowej lub ław i ścian fundamentowych z bloczków betonowych. Wyprowadzenie kanalizacji podposadzkowej i przepustów wodno-elektrycznych. Izolacja przeciwwilgociowa (bitumiczna) i termiczna (XPS/Styrodur).',
          ],
        },
        {
          icon: 'building',
          title: '2. Stan Surowy Otwarty (SSO)',
          description: 'Etap, w którym budynek nabiera kształtu. Czas realizacji: zazwyczaj **2-3 miesiące**.',
          details: [
            '**Murowanie ścian nośnych:** Używamy ceramiki (np. 25 cm) lub silikatów (18-24 cm) na zaprawie cienkowarstwowej.',
            '**Stropy:** Wykonujemy stropy monolityczne (żelbetowe wylewane na mokro) lub gęstożebrowe (typu Teriva/Vector).',
            '**Konstrukcja dachu:** Montaż więźby dachowej z drewna impregnowanego klasy C24.',
            '**Kominy:** Systemowe kominy spalinowe i wentylacyjne (np. Schiedel/Plewa).',
          ],
        },
        {
          icon: 'keyRound',
          title: '3. Stan Surowy Zamknięty (SSZ)',
          description: 'Zabezpieczenie budynku przed warunkami atmosferycznymi.',
          details: [
            '**Pokrycie dachowe:** Dachówka ceramiczna, betonowa lub blachodachówka wraz z obróbkami blacharskimi i rynnami.',
            '**Stolarka okienna:** Montaż okien 3-szybowych (Uf < 0.9 W/m²K) w warstwie ocieplenia (ciepły montaż).',
            '**Bramy i drzwi:** Montaż bramy garażowej segmentowej i drzwi wejściowych antywłamaniowych.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-gornicze.webp',
        alt: 'Etapy budowy domu w Gliwicach - od fundamentów po stan zamknięty',
      },
    },
    {
      id: 'formalnosci',
      header: {
        label: 'FORMALNOŚCI',
        title: 'Logistyka i formalności – jak wspieramy Inwestora?',
        description: 'Budowa domu to nie tylko murowanie, to także "papierologia". Urząd Miejski w Gliwicach (Wydział Architektury i Budownictwa) ma swoje specyficzne wymagania dotyczące kompletowania dokumentacji.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'fileText',
          title: 'Obsługa formalna',
          description: 'Nasz zespół pomaga w skompletowaniu dokumentów niezbędnych do rozpoczęcia i zakończenia budowy.',
          details: [
            '**Zgłoszenie rozpoczęcia robót:** Przygotowujemy oświadczenie kierownika budowy.',
            '**Dziennik budowy:** Prowadzimy go skrupulatnie, wpisując każdy istotny etap prac zanikowych.',
            '**Odbiory przyłączy:** Koordynujemy prace z gestorami sieci (wodociągi, energetyka).',
            '**Inwentaryzacja powykonawcza:** Współpracujemy z geodetami, aby mapa do odbioru była gotowa na czas.',
          ],
        },
        {
          icon: 'leaf',
          title: 'Energooszczędność i walka ze smogiem',
          description: 'Gliwice, jak wiele śląskich miast, zmagają się z problemem jakości powietrza. Dlatego w naszych realizacjach standardem staje się **wentylacja mechaniczna z rekuperacją**.',
          details: [
            'Rekuperacja pozwala na filtrację powietrza wchodzącego do domu (filtry F7/węglowe), zatrzymując pyły zawieszone PM10 i PM2.5. Dodatkowo, system ten odzyskuje ciepło, obniżając koszty ogrzewania nawet o **30%**.',
          ],
        },
      ],
      image: {
        src: '/images/local/shared/etapy-standard.webp',
        alt: 'Formalności budowlane w Gliwicach - wsparcie dla inwestora',
      },
    },
  ],

  nearbyCities: [
    { name: 'Rybnik', slug: 'rybnik' },
    { name: 'Mikołów', slug: 'mikolow' },
    { name: 'Katowice', slug: 'katowice' },
  ],

  areaServed: [
    'Gliwice',
    'Śródmieście',
    'Sośnica',
    'Bojków',
    'Łabędy',
    'Szobiszowice',
    'Trynek',
    'Ostropa',
    'Brzezinka',
    'Ligota Zabrska',
    'Żerniki',
  ],
  geoCoordinates: { latitude: '50.2945', longitude: '18.6714' },
};
