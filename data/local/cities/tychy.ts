import type { CityData } from '../types';

export const tychyData: CityData = {
  slug: 'tychy',
  cityName: 'Tychy',
  cityNameLocative: 'Tychach',

  meta: {
    title: 'Budowa Domów Tychy – Pod Klucz 2026 | CoreLTB Builders',
    description: 'Profesjonalna budowa domów w Tychach. Specjalizacja w terenach górniczych i trudnych gruntach. ✓ Doświadczenie ✓ Gwarancja ✓ Terminowość',
  },

  pageHeader: {
    title: 'Budowa Domów Tychy',
    backgroundImage: '/images/local/tychy/hero.webp',
  },

  emotionalHero: {
    label: 'BUDOWA DOMÓW TYCHY',
    headline: ['Budujesz dom w Tychach?', 'Własne ekipy, stała cena, pełna kontrola'],
    subtitle: 'Budujemy domy jednorodzinne w Tychach i okolicach — od stanu zero do klucza. Nie jesteśmy pośrednikiem: mamy własne ekipy, sprzęt i zaplecze logistyczne. Realizacja w 8-14 miesięcy ze stałą ceną w umowie.',
    benefits: [
      'Własne zaplecze sprzętowe i ekipy (bez pośredników)',
      'Technologia dobrana do warunków gruntowych Twojej działki',
      'Realizacja od stanu zero do klucza w 8-14 miesięcy',
    ],
    ctaBoxTitle: '☎ Umów Bezpłatną Konsultację',
    ctaBoxBenefits: [
      'Ocenimy warunki gruntowe Twojej działki',
      'Dobierzemy optymalną technologię fundamentu',
      'Przedstawimy realny harmonogram i kosztorys',
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
      label: 'SPECYFIKA TYCHÓW',
      title: 'Dlaczego budowa w Tychach wymaga specjalnego podejścia?',
      description: 'Tychy i okolice to teren specyficzny geologicznie. Ignorowanie tego faktu na etapie adaptacji projektu to najkrótsza droga do spękanych ścian i wilgoci w piwnicy po kilku latach eksploatacji. Jako lokalna firma, analizujemy każdą działkę pod kątem dwóch kluczowych zagrożeń.',
      align: 'left',
      theme: 'light',
    },
    cards: [
      {
        icon: 'layers',
        title: 'Szkody górnicze – realne wyzwanie inżynieryjne',
        description: 'Wiele dzielnic Tychów oraz sąsiednich miejscowości (jak Bieruń czy Lędziny) znajduje się w strefie wpływów eksploatacji górniczej. Teren może osiadać, przechylać się lub ulegać deformacjom nieciągłym.',
        details: [
          'Budowa na takim terenie wymaga zastosowania: **Wzmocnionych fundamentów** (zwiększona ilość stali zbrojeniowej, często stal A-IIIN, oraz zastosowanie ław fundamentowych krzyżowych lub płyty fundamentowej), **Dylatacji** (podział budynku na niezależne segmenty, które mogą pracować względem siebie bez uszkodzenia konstrukcji), **Wzmocnień obwodowych** (dodatkowe wieńce żelbetowe na poziomie stropów i ścian kolankowych, które spinają budynek jak obręcz beczkę).',
          'Przed rozpoczęciem prac zawsze weryfikujemy kategorię szkód górniczych (od I do IV) i dostosowujemy projekt konstrukcyjny. To nie jest "opcja dodatkowa" – to konieczność dla bezpieczeństwa Twojej rodziny.',
        ],
      },
      {
        icon: 'shield',
        title: 'Grunty wysadzinowe i glina',
        description: 'Region ten obfituje w grunty spoiste, takie jak gliny i iły. Są to grunty wysadzinowe, co oznacza, że pod wpływem zamarzania wody zwiększają swoją objętość, mogąc "wypychać" fundamenty do góry.',
        details: [
          'Rozwiązujemy ten problem poprzez: **Posadowienie poniżej strefy przemarzania** (w Tychach wynosi ona 1,0 m p.p.t.), **Wymianę gruntu** (usunięcie warstwy gliny i zastąpienie jej zagęszczonym piaskiem lub pospółką), **Drenaż opaskowy** (odprowadzenie wody z dala od fundamentów, aby zapobiec jej gromadzeniu się w strefie przyściennej).',
        ],
      },
      {
        icon: 'settings',
        title: 'Fundamenty na trudnym gruncie – technologia i bezpieczeństwo',
        description: 'Fundament to baza, której nie da się naprawić po wybudowaniu domu. W naszej praktyce inżynierskiej na terenie Śląska odchodzimy od standardowych rozwiązań na rzecz technologii gwarantujących wyższe bezpieczeństwo.',
        details: [
          '**Płyta fundamentowa czy ławy?** Tradycyjne ławy fundamentowe sprawdzają się na gruntach stabilnych. Jednak w Tychach, przy ryzyku szkód górniczych, coraz częściej rekomendujemy **płytę fundamentową**.',
          '**Sztywność przestrzenna:** Płyta działa jak sztywna taca. Nawet jeśli grunt pod jednym narożnikiem domu osiądzie, płyta utrzyma budynek w całości, minimalizując ryzyko pękania ścian.',
          '**Rozkład naprężeń:** Ciężar domu rozkłada się na całą powierzchnię pod budynkiem (np. 120 m²), a nie tylko liniowo pod ścianami. To kluczowe przy gruntach o słabszej nośności.',
          '**Izolacja termiczna:** Płyta fundamentowa pozwala na wykonanie ciągłej izolacji termicznej od spodu (XPS), eliminując mostki termiczne na styku ściana-fundament.',
        ],
      },
      {
        icon: 'settings',
        title: 'Materiały ścienne a akustyka i termoizolacja',
        description: 'Jakość murów definiuje mikroklimat wnętrza. Nie pracujemy na "najtańszych zamiennikach". Stosujemy materiały certyfikowane.',
        details: [
          '**Ceramika poryzowana (np. Porotherm):** Świetna izolacyjność termiczna, naturalna regulacja wilgotności ("oddychanie ścian"). Wymaga jednak precyzji przy murowaniu, by nie uszkodzić kruchych pustaków.',
          '**Silikaty (np. Silka):** Bardzo duża masa, co przekłada się na doskonałą izolacyjność akustyczną. Idealne rozwiązanie, jeśli budujesz dom przy ruchliwej ulicy (np. Oświęcimskiej czy Mikołowskiej). Silikaty mają też dużą bezwładność cieplną – długo trzymają ciepło.',
          '**Beton komórkowy (np. Ytong):** Najcieplejszy materiał konstrukcyjny, łatwy w obróbce, pozwalający na uzyskanie bardzo równych ścian, co obniża koszt tynkowania.',
          'Każdy z tych materiałów ma swoje zastosowanie. Dobieramy go indywidualnie, analizując projekt i lokalizację działki (hałas, strony świata).',
        ],
      },
      {
        icon: 'zap',
        title: 'Smart Home Ready – instalacje przyszłości',
        description: 'Wielu inwestorów popełnia błąd, myśląc o automatyce budynkowej dopiero na etapie wykończeniówki. Wtedy jest już za późno na profesjonalne systemy przewodowe. U nas standardem jest przygotowanie budynku pod **Smart Home**.',
        details: [
          '**Standard KNX a tradycyjna elektryka** — już na etapie stanu surowego zamkniętego (SSZ) planujemy instalacje inaczej niż w latach 90-tych: rozprowadzamy przewody magistralne (np. zielony kabel EIB/KNX) do wszystkich włączników i punktów sterowania, przewody z gniazd i punktów świetlnych sprowadzamy bezpośrednio do rozdzielnicy (topologia gwiazdy), stosujemy puszki o pogłębionej kubaturze (min. 60mm głębokości lub kieszeniowe).',
          '**Przygotowanie pod OZE** — budujemy domy gotowe na transformację energetyczną. Nawet jeśli dziś nie planujesz pompy ciepła czy fotowoltaiki, przygotowujemy infrastrukturę: kanały techniczne z kotłowni na dach (pod instalację PV), przepusty w fundamentach pod gruntowy wymiennik ciepła lub jednostkę zewnętrzną pompy ciepła, wzmocniona instalacja elektryczna w garażu pod ładowarkę do samochodów elektrycznych (Wallbox).',
          'Takie podejście zwiększa wartość nieruchomości i oszczędza kucia ścian w przyszłości.',
        ],
      },
      {
        icon: 'trendingUp',
        title: 'Total Cost of Ownership (TCO) – ile naprawdę kosztuje dom?',
        description: 'Tani dom w budowie to zazwyczaj drogi dom w eksploatacji. Jako inżynierowie patrzymy na **Total Cost of Ownership (TCO)** – całkowity koszt posiadania domu w perspektywie 15-20 lat.',
        details: [
          '**Koszt budowy vs. koszt eksploatacji** — zaoszczędzenie 10 000 zł na izolacji fundamentów lub wyborze tańszych okien może wydawać się kuszące na etapie kosztorysu. Jednak analiza fizyki budowli jest bezlitosna.',
          '**Mostki termiczne:** Niewłaściwie zaizolowany wieniec czy nadproże to miejsca, którędy ucieka do 30% ciepła. To przekłada się na wyższe rachunki za gaz czy prąd rzędu 2000-3000 zł rocznie. Po 10 latach "oszczędność" zamienia się w stratę.',
          '**Szczelność powietrzna:** Budujemy domy szczelne. Przeprowadzamy testy szczelności (Blower Door Test), aby upewnić się, że ciepłe powietrze nie "wywiewa" przez gniazdka elektryczne czy nieszczelności przy murłacie.',
          '**Analiza akustyczna i mikroklimat** — komfort życia to nie tylko temperatura, ale i cisza. Domy szkieletowe często mają problem z przenoszeniem dźwięków uderzeniowych (kroki, trzaśnięcia drzwiami). Dom murowany ze stropem żelbetowym naturalnie tłumi te dźwięki. Ponadto, masywne ściany działają jak bufor wilgoci – wchłaniają jej nadmiar, gdy jest parno, i oddają, gdy powietrze jest suche, tworząc zdrowy mikroklimat bez konieczności stosowania drogich nawilżaczy.',
        ],
      },
    ],
    image: {
      src: '/images/local/shared/specyfika-plyta.webp',
      alt: 'Budowa domu w Tychach – specyfika terenów górniczych',
    },
  },

  whyUsOverride: {
    competencies: [
      {
        icon: 'mapPin',
        title: 'Lokalność i dostępność',
        description: 'Jesteśmy stąd. Nie znikniemy po odebraniu zaliczki. Możesz odwiedzić nas w biurze lub zobaczyć nasze trwające realizacje w regionie.',
      },
      {
        icon: 'shield',
        title: 'Doświadczenie w szkodach górniczych',
        description: 'Wiemy, jak zbroić fundamenty i wieńce, aby dom przetrwał wstrząsy górnicze bez pęknięć. To wiedza, której nie mają firmy z innych części Polski.',
      },
      {
        icon: 'clock',
        title: 'Terminowość zapisana w umowie',
        description: 'Szanujemy Twój czas i pieniądze (odsetki kredytowe). Harmonogram prac jest integralną częścią umowy, a za opóźnienia z naszej winy przewidujemy kary umowne.',
      },
      {
        icon: 'building',
        title: 'Kompleksowość',
        description: 'Załatwiamy geodetę do wytyczenia budynku, kierownika budowy oraz niezbędne odbiory (kominiarskie, elektryczne). Oddajemy Ci komplet dokumentów potrzebnych do PNB (Pozwolenia na Użytkowanie).',
      },
    ],
  },

  additionalSections: [
    {
      id: 'etapy-realizacji',
      header: {
        label: 'ETAPY REALIZACJI',
        title: 'Kompleksowa realizacja inwestycji na Śląsku',
        description: 'Budowa domu to proces logistyczny, który na terenie Górnego Śląska obarczony jest specyficznymi uwarunkowaniami prawnymi i terenowymi. Wielu inwestorów nie zdaje sobie sprawy, że uzyskanie pozwolenia na budowę w Tychach czy powiecie bieruńsko-lędzińskim wymaga często dodatkowych uzgodnień z Okręgowym Urzędem Górniczym. Jako doświadczony zespół inżynierów, zdejmujemy ten ciężar z Twoich barków.',
        align: 'left',
        theme: 'light',
      },
      cards: [
        {
          icon: 'building',
          title: 'Stan Zero',
          description: 'Obejmuje roboty ziemne, wymianę gruntu (jeśli badania geotechniczne wykażą grunty nienośne), wykonanie ław lub płyty fundamentowej oraz izolacje przeciwwilgociowe i termiczne fundamentów.',
        },
        {
          icon: 'hardHat',
          title: 'Stan Surowy Otwarty (SSO)',
          description: 'Wznoszenie ścian nośnych i działowych, wykonanie stropów żelbetowych (monolitycznych lub gęstożebrowych), wieńców, schodów betonowych oraz więźby dachowej z pokryciem wstępnym.',
        },
        {
          icon: 'paintBrush',
          title: 'Stan Surowy Zamknięty (SSZ)',
          description: 'Montaż stolarki okiennej (zwykle pakiety 3-szybowe), drzwi zewnętrznych, bramy garażowej oraz docelowego pokrycia dachowego.',
        },
        {
          icon: 'settings',
          title: 'Instalacje i tynki',
          description: 'Rozprowadzenie instalacji wod-kan, elektrycznych, C.O., wykonanie tynków wewnętrznych (gipsowych lub cementowo-wapiennych) oraz wylewek podłogowych.',
        },
        {
          icon: 'paintBrush',
          title: 'Elewacja i ocieplenie',
          description: 'Wykonanie termoizolacji styropianem lub wełną mineralną, tynki zewnętrzne, podbitka dachowa i parapety.',
        },
        {
          icon: 'keyRound',
          title: 'Prace wykończeniowe',
          description: 'Na życzenie doprowadzamy budynek do stanu "pod klucz", włączając w to biały montaż, podłogi i malowanie.',
        },
      ],
    },
  ],

  districts: {
    header: {
      label: 'GDZIE BUDUJEMY',
      title: 'Gdzie budujemy? Dzielnice Tychów i okolice',
      description: 'Nasza baza logistyczna pozwala na sprawną obsługę inwestycji w promieniu do 40 km, jednak sercem naszej działalności są Tychy i bezpośrednie sąsiedztwo. Znamy specyfikę poszczególnych dzielnic, co ułatwia logistykę i planowanie prac ziemnych.',
      align: 'left',
      theme: 'light',
    },
    items: [
      { label: 'Żwaków' },
      { label: 'Czułów' },
      { label: 'Jaroszowice' },
      { label: 'Urbanowice' },
      { label: 'Wilkowyje' },
      { label: 'Mąkołowiec' },
      { label: 'Wartogłowiec' },
      { label: 'Mikołów' },
      { label: 'Bieruń' },
      { label: 'Kobiór' },
      { label: 'Lędziny' },
      { label: 'Pszczyna' },
    ],
    hubDescription: 'Obsługujemy inwestycje w lokalizacjach w Tychach oraz w miastach ościennych. Dzięki znajomości lokalnych składów budowlanych i betoniarni, minimalizujemy koszty transportu materiałów.',
  },

  faq: {
    header: {
      label: 'NAJCZĘŚCIEJ ZADAWANE PYTANIA',
      title: 'Zarządzanie kryzysowe i bezpieczeństwo prawne',
      description: 'Budowa domu to duża operacja finansowa. Co się stanie, gdy ceny stali nagle wzrosną o 50%? Albo gdy wykonawca zniknie z zaliczką? Z nami unikasz tych scenariuszy.',
      align: 'left',
      theme: 'light',
    },
    items: [
      {
        question: 'Co gdy materiały drożeją w trakcie budowy?',
        content: [
          { type: 'paragraph', value: 'W naszych umowach stosujemy przejrzyste zasady waloryzacji lub gwarancji ceny (w zależności od wybranego modelu współpracy). **Model Ryczałtowy:** Ustalamy stałą cenę za dany etap przy podpisaniu umowy. Ryzyko wzrostu cen materiałów bierzemy na siebie. Ty śpisz spokojnie, znając ostateczny koszt. **Model Open Book:** Rozliczamy się na podstawie faktur zakupowych z hurtowni + ustalona marża za robociznę i koordynację. Masz pełny wgląd w ceny zakupu.' },
        ],
      },
      {
        question: 'Jakie są moje prawa – rękojmia vs gwarancja?',
        content: [
          { type: 'paragraph', value: 'Jako legalnie działająca firma, udzielamy pisemnej gwarancji na wykonane prace. **Konstrukcja:** Gwarancja na szczelność i stabilność konstrukcji (zgodnie z KC). **Rękojmia:** Ustawowa odpowiedzialność za wady fizyczne. **Polisa OC:** Posiadamy ubezpieczenie OC działalności gospodarczej. Jeśli przypadkowo uszkodzimy mienie sąsiada lub materiał, szkoda pokrywana jest z polisy, a nie z Twojej kieszeni.' },
        ],
      },
      {
        question: 'Ile kosztuje budowa domu 100–150 m² w Tychach w 2026 roku?',
        content: [
          { type: 'paragraph', value: 'Dom jednorodzinny **100–150 m²** w stanie deweloperskim to w Tychach wydatek rzędu **4 500–6 000 zł/m²**, natomiast [realizacja pod klucz](/oferta/kompleksowa-budowa-domow) zamyka się w przedziale **6 500–8 500 zł/m²**. Na cenę wpływa przede wszystkim rodzaj fundamentu (na terenach z kategorią szkód górniczych płyta fundamentowa jest droższa niż ławy), standard materiałów wykończeniowych oraz złożoność bryły. W CoreLTB podpisujemy umowę ryczałtową — znasz ostateczny koszt przed wbiciem pierwszej łopaty.' },
        ],
      },
      {
        question: 'Ile trwa budowa domu od fundamentów do wprowadzenia się?',
        content: [
          { type: 'paragraph', value: 'Typowa realizacja domu jednorodzinnego w Tychach zajmuje **8–12 miesięcy** od robót ziemnych do przekazania kluczy. [Stan surowy zamknięty](/oferta/kompleksowa-budowa-domow) osiągamy w **3–5 miesięcy**, a [wykończenie wnętrz](/oferta/wykonczenia-i-aranzacje) to dodatkowe 3–4 miesiące. Kluczowe dla terminowości jest rozpoczęcie prac wiosną (marzec–kwiecień) — wtedy sezon budowlany pozwala zamknąć dach przed zimą. Dzięki bliskiej lokalizacji naszych baz (Jaworzno) logistyka materiałów nie generuje przestojów.' },
        ],
      },
      {
        question: 'Jaki fundament wybrać w Tychach — płytę fundamentową czy tradycyjne ławy?',
        content: [
          { type: 'paragraph', value: 'Wybór zależy od warunków gruntowych konkretnej działki. Tychy leżą na pograniczu GOP — w dzielnicach takich jak Urbanowice czy Czułów mogą występować wpływy eksploatacji górniczej, gdzie rekomendujemy **płytę fundamentową zbrojną**. W stabilniejszych lokalizacjach (np. Żwaków, Jaroszowice) często wystarczą tradycyjne ławy, co obniża koszt o **15–25%**. Decyzję podejmujemy zawsze na podstawie [badań geotechnicznych](/oferta/uslugi-techniczne) — nie zgadujemy.' },
        ],
      },
    ],
  },

  nearbyCities: [
    { name: 'Katowice', slug: 'katowice' },
    { name: 'Mikołów', slug: 'mikolow' },
  ],

  areaServed: [
    'Tychy',
    'Żwaków',
    'Czułów',
    'Jaroszowice',
    'Urbanowice',
    'Wilkowyje',
    'Mąkołowiec',
    'Wartogłowiec',
    'Mikołów',
    'Bieruń',
    'Kobiór',
    'Lędziny',
    'Pszczyna',
  ],
  geoCoordinates: { latitude: '50.1351', longitude: '18.9654' },
};
