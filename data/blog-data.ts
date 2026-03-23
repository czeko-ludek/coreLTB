/**
 * DANE BLOGA
 * Single Source of Truth dla sekcji blogowej
 *
 * LOGIKA WYŚWIETLANIA:
 * 1. Posty są sortowane po dacie (dateTimestamp) - najnowsze najpierw
 * 2. Po wybraniu kategorii - filtrowane są tylko posty z danej kategorii
 * 3. Główny post (duży) = najnowszy post z wyfiltrowanych
 * 4. Dolne 3 kafelki = następne 3 najnowsze posty
 * 5. Polecane (sidebar) = reszta postów (starsze)
 *
 * DODAWANIE NOWEGO WPISU:
 * 1. Dodaj wpis do tablicy `blogPosts` poniżej
 * 2. Ustaw unikalne `id`
 * 3. Ustaw `categoryId` zgodnie z istniejącymi kategoriami: realizacje, technologia, prawo, porady
 * 4. Ustaw `dateTimestamp` jako timestamp (Date.parse('YYYY-MM-DD'))
 * 5. Post automatycznie pojawi się w odpowiednim miejscu na podstawie daty
 */

import type {
  BlogCategory,
  Breadcrumb,
  BlogPost,
} from '@/components/sections/BentoBlogSection';

// =============================================================================
// BREADCRUMBS
// =============================================================================

export const blogBreadcrumbs: Breadcrumb[] = [
  { label: 'Strona główna', href: '/' },
  { label: 'Baza wiedzy' },
];

// =============================================================================
// KATEGORIE
// =============================================================================

export const blogCategories: BlogCategory[] = [
  { id: 'realizacje', label: 'Realizacje' },
  { id: 'technologia', label: 'Technologia' },
  { id: 'prawo', label: 'Prawo budowlane' },
  { id: 'porady', label: 'Porady' },
];

// =============================================================================
// WSZYSTKIE POSTY BLOGOWE
// Sortowanie odbywa się automatycznie po dateTimestamp
// =============================================================================

export const blogPosts: BlogPost[] = [
  // ============= STYCZEŃ 2026 =============
  {
    id: 'plyta-fundamentowa-tereny-gornicze',
    image: {
      // TODO: Zamień na własne zdjęcie z realizacji
      src: '/images/blog/plyta-fundamentowa/plyta-fundamentowa.webp',
      alt: 'Płyta fundamentowa na terenie górniczym Śląska',
    },
    category: 'Technologia',
    categoryId: 'technologia',
    date: '20 Stycznia, 2026',
    dateTimestamp: Date.parse('2026-01-20'),
    readTime: '12 min czytania',
    title: 'Płyta fundamentowa na terenach górniczych.',
    excerpt: 'Kompletny przewodnik po budowie płyty fundamentowej na szkodach górniczych. Zbrojenie stalą B500SP, warstwa poślizgowa, izolacja XPS – wszystko co musisz wiedzieć o bezpiecznym fundamencie na Śląsku.',
    author: {
      name: 'Michał Krawczyk',
      role: 'Inżynier Konstrukcji',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    href: '/baza-wiedzy/plyta-fundamentowa-tereny-gornicze',
  },

  // ============= MARZEC 2026 =============
  {
    id: 'dom-energooszczedny-slask',
    image: {
      src: '/images/blog/dom-energooszczedny/hero.webp',
      alt: 'Nowoczesny dom energooszczędny z fotowoltaiką na dachu i pompą ciepła — widok od frontu',
    },
    category: 'Technologia',
    categoryId: 'technologia',
    date: '23 Marca, 2026',
    dateTimestamp: Date.parse('2026-03-23'),
    readTime: '14 min czytania',
    title: 'Dom energooszczędny — kompletny przewodnik budowy 2026',
    excerpt: 'Czym jest dom energooszczędny, jakie wymagania musi spełniać i co zmienią nowe WT 2026? Parametry techniczne, materiały, koszty budowy, dotacje i praktyczne wskazówki od generalnego wykonawcy.',
    author: {
      name: 'Michał Krawczyk',
      role: 'Inżynier Konstrukcji',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    href: '/baza-wiedzy/dom-energooszczedny-slask',
  },
];

// =============================================================================
// FUNKCJE POMOCNICZE
// =============================================================================

/**
 * Pobierz post po slug (id)
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === slug);
}

/**
 * Pobierz wszystkie slugi postów (dla generateStaticParams)
 */
export function getAllBlogSlugs(): string[] {
  return blogPosts.map(post => post.id);
}

/**
 * Pobierz powiązane posty (ta sama kategoria, bez aktualnego posta)
 */
export function getRelatedPosts(currentSlug: string, limit: number = 3): BlogPost[] {
  const currentPost = getBlogPostBySlug(currentSlug);
  if (!currentPost) return [];

  return blogPosts
    .filter(post => post.id !== currentSlug && post.categoryId === currentPost.categoryId)
    .sort((a, b) => b.dateTimestamp - a.dateTimestamp)
    .slice(0, limit);
}

// =============================================================================
// TREŚCI POSTÓW BLOGOWYCH (dla pojedynczych stron)
// =============================================================================

import type { BlogContentBlock, BlogPostData, RelatedPost } from '@/components/sections/BlogPostContent';

/**
 * Mapa treści postów blogowych
 * Klucz = slug (id) posta
 */
export const blogPostContents: Record<string, BlogContentBlock[]> = {
  'plyta-fundamentowa-tereny-gornicze': [
    // =============================================================================
    // INTRO - Bezpieczne fundamenty w rejonie szkód górniczych
    // =============================================================================
   

    // =============================================================================
    // SEKCJA 1 - Dlaczego płyta fundamentowa to konieczność?
    // =============================================================================
    
    {
      type: 'paragraph',
      content: '<strong>Płyta fundamentowa na terenach górniczych</strong> to jedyne rozwiązanie, które skutecznie "odsprzęga" budynek od deformującego się podłoża. W przeciwieństwie do ław fundamentowych, płyta działa jak sztywna taca, która unosi się na gruncie, minimalizując ryzyko pękania ścian nośnych podczas wstrząsów.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Sztywność przestrzenna a ruchy górotworu',
    },
    {
      type: 'paragraph',
      content: 'Tradycyjne ławy fundamentowe są wrażliwe na nierównomierne osiadanie. Gdy grunt usuwa się spod jednego narożnika domu, ława pęka, a wraz z nią ściany i stropy. Płyta fundamentowa, dzięki potężnemu zbrojeniu górnemu i dolnemu, zachowuje swoją sztywność.',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Kluczowa zasada:</strong> W warunkach szkód górniczych budynek musi zachowywać się jak pudełko – sztywne i zwarte. Płyta fundamentowa zapewnia równomierny rozkład naprężeń na znacznie większą powierzchnię (cały rzut budynku), co redukuje nacisk jednostkowy na grunt często poniżej <strong>0,5 kg/cm²</strong>.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Różnica między osiadaniem w niecce a na siodle',
    },
    {
      type: 'paragraph',
      content: 'Projektując fundament, musimy przewidzieć dwa skrajne scenariusze pracy płyty, które wymagają specyficznego podejścia do zbrojenia:',
    },
    {
      type: 'list',
      items: [
        '<strong>Praca w niecce:</strong> Grunt zapada się pod środkiem budynku. Płyta "wisi" w powietrzu w centralnej części, opierając się na krawędziach. Wymaga to potężnego zbrojenia dolnego, aby płyta nie złamała się do środka.',
        '<strong>Praca na siodle:</strong> Grunt zapada się na krawędziach, a środek budynku jest wypychany w górę (lub osiada wolniej). Płyta "przewiesza się" na brzegach. Tutaj kluczową rolę odgrywa zbrojenie górne, które przejmuje siły rozciągające w górnej strefie przekroju.',
      ],
    },
    {
      type: 'paragraph',
      content: 'Nasze projekty uwzględniają oba te warianty, stosując odpowiednie zakłady stali i zagęszczenie prętów w strefach krytycznych, zgodnie z aktualnymi normami Eurokod 7.',
    },
    // TODO: OBRAZ 2 - Schemat niecka vs siodło (ilustracja techniczna)
    {
      type: 'image',
      src: '/images/blog/plyta-fundamentowa/schemat-niecka-siodlo.webp',
      alt: 'Schemat pracy płyty fundamentowej w niecce i na siodle',
      caption: 'Schemat ilustrujący pracę płyty fundamentowej: w niecce (góra) i na siodle (dół)',
    },

    // =============================================================================
    // SEKCJA 2 - Co obejmuje nasza oferta?
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Co obejmuje nasza oferta budowy fundamentów?',
    },
    {
      type: 'paragraph',
      content: 'Jako specjaliści od trudnych gruntów, oferujemy kompleksową realizację stanu zerowego. Nie zajmujemy się półśrodkami – dostarczamy gotowy produkt inżynieryjny.',
    },
    {
      type: 'list',
      items: [
        '<strong>Analiza geotechniczna i górnicza</strong> – weryfikujemy prognozowane deformacje terenu (nachylenie, krzywizna, odkształcenie poziome) we współpracy z geologiem.',
        '<strong>Projekt konstrukcyjny zamienny</strong> – optymalizujemy zużycie stali, dobierając odpowiednie średnice prętów i klasę betonu do kategorii szkód, co pozwala zaoszczędzić inwestorowi nawet 10-15% kosztów materiałowych.',
        '<strong>Wykonanie podbudowy i drenażu</strong> – stabilizacja gruntu rodzimego oraz wykonanie warstw filtracyjnych z kruszywa łamanego, zagęszczanego mechanicznie warstwami.',
        '<strong>Montaż warstwy poślizgowej</strong> – precyzyjne ułożenie układu folii i podsypek, które redukują tarcie między gruntem a fundamentem podczas ruchów poziomych.',
        '<strong>Zbrojenie i betonowanie</strong> – montaż stali zbrojeniowej (w tym stali ciągliwej) oraz betonowanie przy użyciu pompy, z wibrowaniem wgłębnym mieszanki.',
        '<strong>Izolacje termiczne i przeciwwodne</strong> – montaż płyt XPS o wysokiej odporności na ściskanie oraz hydroizolacji systemowej.',
      ],
    },

    // =============================================================================
    // SEKCJA 3 - Specyfika budowy na terenach górniczych
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Specyfika budowy na terenach górniczych – problemy regionu',
    },
    {
      type: 'paragraph',
      content: 'Budowa domu na Śląsku czy w Małopolsce Zachodniej to wyzwanie inżynieryjne, z którym nie poradzi sobie przypadkowa ekipa budowlana. Region ten charakteryzuje się występowaniem specyficznych zjawisk geologicznych, które bezpośrednio zagrażają trwałości budynków.',
    },
    {
      type: 'paragraph',
      content: 'Głównym problemem są <strong>deformacje powierzchni terenu</strong>. Mogą one mieć charakter ciągły (niecki osiadania, które tworzą się powoli i obejmują duże obszary) lub nieciągły (progi, szczeliny, zapadliska). W przypadku deformacji ciągłych, budynek ulega przechyleniu oraz działaniu sił rozciągających lub ściskających grunt. Siły te, przenoszone przez tarcie na fundamenty, potrafią rozerwać standardową ławę fundamentową w kilka miesięcy.',
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Uwaga:</strong> Projekty katalogowe "gotowce" zazwyczaj zakładają posadowienie na gruntach stabilnych. Budowa na ich podstawie w Bytomiu czy Rudzie Śląskiej to proszenie się o kłopoty – pękające ściany, niedomykające się okna czy uszkodzenia instalacji podposadzkowych to typowe skutki braku adaptacji do szkód górniczych.',
    },
    {
      type: 'paragraph',
      content: 'Kolejnym aspektem są <strong>wstrząsy górotworu</strong>. Są to nagłe wyzwolenia energii, które wywołują drgania podłoża przypominające trzęsienia ziemi o małej magnitudzie. Dla budynku murowanego są to obciążenia dynamiczne, których standardowe normy budowlane dla reszty Polski nie przewidują.',
    },
    {
      type: 'paragraph',
      content: 'Wymagane jest zastosowanie dylatacji obwodowych oraz specjalnych złączy kompensacyjnych na przyłączach mediów, aby ruch budynku względem gruntu nie doprowadził do zerwania rur kanalizacyjnych czy wodociągowych. To detale, o których często się zapomina, a które decydują o bezawaryjnej eksploatacji domu.',
    },
    // TODO: OBRAZ 3 - Zdjęcie uszkodzeń budynku / pęknięcia ścian (opcjonalne - dla kontrastu)
    {
      type: 'image',
      src: '/images/blog/plyta-fundamentowa/uszkodzenia-gornicze.webp',
      alt: 'Typowe uszkodzenia budynku na terenach górniczych bez odpowiednich fundamentów',
      caption: 'Skutki braku odpowiedniego fundamentu na terenach górniczych – pęknięcia ścian i uszkodzenia konstrukcji',
    },

    // =============================================================================
    // SEKCJA 4 - Etapy realizacji płyty
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Etapy realizacji płyty pod szkody górnicze',
    },
    {
      type: 'paragraph',
      content: 'Proces budowy płyty fundamentowej na terenach objętych eksploatacją górniczą różni się zasadniczo od standardowej budowy. Każdy etap musi być wykonywany z aptekarską precyzją, ponieważ błąd na etapie zbrojenia czy zagęszczania podbudowy jest niemożliwy do naprawienia po wylaniu betonu.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Zwiększone zużycie stali i betonu',
    },
    {
      type: 'paragraph',
      content: 'Podstawową różnicą jest ilość i jakość materiałów konstrukcyjnych. Na terenach szkód górniczych (III i IV kategoria) nie stosujemy zwykłej stali zbrojeniowej. Konieczne jest użycie stali o <strong>podwyższonej ciągliwości</strong>, najczęściej klasy <strong>B500SP</strong> (stal epoksydowana lub specjalna stopowa).',
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Dlaczego stal B500SP?</strong> Posiada zdolność do znacznego odkształcenia plastycznego przed zerwaniem. Gdy grunt pod budynkiem zaczyna się rozsuwać, fundament jest poddawany potężnym siłom rozrywającym. Zwykła stal mogłaby pęknąć – stal ciągliwa "naciągnie się", przejmując energię i utrzymując spójność betonu.',
    },
    {
      type: 'paragraph',
      content: 'Również beton musi spełniać rygorystyczne normy. Stosujemy mieszanki o klasie wytrzymałości minimum <strong>C25/30 (dawne B30)</strong> lub <strong>C30/37</strong>, często z dodatkami uszczelniającymi (beton wodoszczelny W8), aby mikropęknięcia nie powodowały korozji zbrojenia.',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Statystyka:</strong> Ilość stali w płycie na szkody górnicze może wynosić od <strong>120 do nawet 180 kg na m³ betonu</strong>, podczas gdy w standardowej płycie jest to zazwyczaj 80-90 kg/m³.',
    },
    // TODO: OBRAZ 4 - Zdjęcie zbrojenia płyty fundamentowej (podwójna siatka)
    {
      type: 'image',
      src: '/images/blog/plyta-fundamentowa/zbrojenie-plyta.webp',
      alt: 'Gęste zbrojenie płyty fundamentowej na terenie górniczym',
      caption: 'Podwójne zbrojenie płyty fundamentowej ze stali B500SP – górna i dolna siatka prętów',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Izolacja i warstwa poślizgowa',
    },
    {
      type: 'paragraph',
      content: 'Kluczowym, a często pomijanym przez konkurencję elementem, jest <strong>warstwa poślizgowa</strong>. Jej zadaniem jest zredukowanie tarcia między spodem płyty fundamentowej a podłożem gruntowym. Gdy ziemia przesuwa się poziomo (pełzanie gruntu), nie powinna "ciągnąć" za sobą budynku.',
    },
    {
      type: 'paragraph',
      content: 'Aby to osiągnąć, stosujemy zaawansowany system odsprzęgania:',
    },
    {
      type: 'list',
      items: [
        '<strong>Podsypka piaskowa:</strong> Warstwa wyrównawcza z piasku stabilizowanego, idealnie wypoziomowana.',
        '<strong>Podwójna warstwa folii PE:</strong> Stosujemy grubą folię budowlaną (min. 0,3 mm lub 0,5 mm) układaną w dwóch warstwach. Między warstwami folii tarcie jest minimalne, co pozwala płycie "ślizgać się" po podłożu przy silnych ruchach górotworu.',
        '<strong>Geowłóknina separacyjna:</strong> Oddziela warstwy konstrukcyjne od gruntu rodzimego, zapobiegając wymieszaniu się materiałów.',
      ],
    },
    {
      type: 'paragraph',
      content: 'Równie istotna jest izolacja termiczna. Stosujemy polistyren ekstrudowany <strong>XPS</strong> o podwyższonym parametrze CS (wytrzymałość na ściskanie). Na terenach górniczych, gdzie naciski punktowe mogą być ekstremalne, standardowy styropian EPS100 uległby zmiażdżeniu. Dlatego rekomendujemy XPS o CS wynoszącym <strong>500 lub 700 kPa</strong>.',
    },
    // TODO: OBRAZ 5 - Zdjęcie warstwy izolacyjnej / XPS pod płytą
    {
      type: 'image',
      src: '/images/blog/plyta-fundamentowa/izolacja-xps.webp',
      alt: 'Układanie izolacji XPS pod płytę fundamentową',
      caption: 'Izolacja termiczna XPS o podwyższonej wytrzymałości na ściskanie – kluczowy element fundamentu górniczego',
    },

    // =============================================================================
    // SEKCJA 5 - Obszar działania
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Obszar działania – gdzie budujemy?',
    },
    {
      type: 'paragraph',
      content: 'CoreLTB Builders koncentruje się na regionach, gdzie problem szkód górniczych jest najbardziej palący. Nie jesteśmy firmą ogólnopolską, która "dojeżdża wszędzie". Jesteśmy stąd i budujemy tam, gdzie znamy grunt.',
    },
    {
      type: 'paragraph',
      content: 'Obsługujemy kompleksowo miasta i powiaty, w których aktywna lub zakończona eksploatacja górnicza wymaga specjalistycznego podejścia:',
    },
    {
      type: 'list',
      items: [
        '<strong>Górny Śląsk:</strong> Katowice, Ruda Śląska, Bytom, Zabrze, Gliwice, Mikołów.',
        '<strong>ROW (Rybnicki Okręg Węglowy):</strong> Rybnik, Jastrzębie-Zdrój, Żory, Wodzisław Śląski.',
        '<strong>Małopolska Zachodnia:</strong> Oświęcim, Libiąż, Chrzanów (rejon kopalni Janina).',
      ],
    },
    {
      type: 'paragraph',
      content: 'Dzięki lokalizacji naszej bazy sprzętowej w sercu aglomeracji, jesteśmy w stanie zoptymalizować koszty logistyczne. Dojazd ciężkiego sprzętu (koparki, pompy do betonu) na terenie tych miast nie generuje dla Inwestora nadmiernych kosztów. Znamy lokalnych dostawców betonu towarowego, co gwarantuje ciągłość dostaw podczas betonowania płyty – procesu, którego nie można przerwać.',
    },

    // =============================================================================
    // SEKCJA 6 - Dlaczego CoreLTB?
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Dlaczego inwestorzy wybierają CoreLTB Builders?',
    },
    {
      type: 'paragraph',
      content: 'Decyzja o wyborze wykonawcy fundamentów na terenach górniczych to decyzja o bezpieczeństwie Twojej rodziny i majątku na całe życie. Dlaczego warto powierzyć to zadanie specjalistom z CoreLTB Builders?',
    },
    {
      type: 'list',
      items: [
        '<strong>Doświadczenie w IV kategorii szkód:</strong> Mamy na koncie realizacje w najtrudniejszych strefach (np. Bytom-Bobrek, Ruda Śląska-Kochłowice), gdzie budynki stoją stabilnie mimo osiadań terenu rzędu kilku metrów.',
        '<strong>Własne szalunki systemowe:</strong> Nie dzierżawimy szalunków, co eliminuje ryzyko przestojów i dodatkowych kosztów wynajmu. Posiadamy własne systemy szalunkowe, co przyspiesza prace i gwarantuje idealną geometrię płyty.',
        '<strong>Gwarancja na konstrukcję:</strong> Udzielamy pisemnej gwarancji na wykonane prace żelbetowe. Działamy w pełni legalnie, wystawiamy faktury VAT, co jest podstawą do ewentualnych roszczeń odszkodowawczych od kopalni w przyszłości.',
        '<strong>Współpraca z konstruktorami:</strong> Nasi kierownicy budowy stale konsultują się z projektantami specjalizującymi się w szkodach górniczych. Jeśli na budowie pojawią się nieprzewidziane warunki gruntowe (np. kurzawka, pustki), reagujemy natychmiast, proponując bezpieczne rozwiązanie zamienne.',
      ],
    },

    // =============================================================================
    // SEKCJA 7 - CTA
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Zamów wycenę fundamentu na trudnym gruncie',
    },
    {
      type: 'paragraph',
      content: 'Nie ryzykuj budowy domu na "zwykłych" fundamentach w rejonie górniczym. Skontaktuj się z <strong>CoreLTB Builders</strong> już na etapie planowania inwestycji. Prześlij nam swój projekt budowlany lub numer działki – sprawdzimy Miejscowy Plan Zagospodarowania Przestrzennego i kategorię terenu górniczego.',
    },
    {
      type: 'paragraph',
      content: 'Przygotujemy dla Ciebie szczegółową, transparentną wycenę, która uwzględnia wszystkie niezbędne wzmocnienia i materiały. U nas nie ma ukrytych kosztów – cena w umowie jest ceną ostateczną za uzgodniony zakres prac. Zabezpiecz swoją przyszłość na solidnym fundamencie.',
    },
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz koszt budowy',
    },
    {
      type: 'cta',
      ctaHref: '/analiza-dzialki',
      ctaIcon: 'mapPin',
      ctaLabel: 'Zamów analizę działki',
    },

    // =============================================================================
    // SEKCJA 8 - FAQ (zwijane accordion)
    // =============================================================================
    {
      type: 'heading',
      level: 2,
      content: 'Najczęściej zadawane pytania',
    },
    {
      type: 'faq',
      faqItems: [
        {
          question: 'Jaki jest koszt 1 m² płyty fundamentowej górniczej?',
          answer: 'Płyta fundamentowa w wariancie górniczym jest zazwyczaj droższa od tradycyjnych fundamentów ze względu na zwiększone zużycie stali i wyższą klasę betonu. Koszt za m² zależy ściśle od kategorii szkód górniczych na działce. W CoreLTB zawsze podkreślamy, że choć wydatek jest wyższy, stanowi to niezbędne zabezpieczenie konstrukcji przed nieprzewidywalnymi ruchami górotworu.',
        },
        {
          question: 'Dlaczego płyta fundamentowa jest najlepszym rozwiązaniem na szkody górnicze?',
          answer: 'Płyta fundamentowa to najbezpieczniejszy wybór na terenach górniczych, ponieważ działa jak sztywna tarcza. Zamiast pękać przy ruchach gruntu, przenosi naprężenia równomiernie pod całym budynkiem, co zapobiega uszkodzeniom konstrukcyjnym. Jest niezbędna w strefach o podwyższonym ryzyku deformacji podłoża, gwarantując stabilność, której nie zapewnią tradycyjne ławy.',
        },
        {
          question: 'Jaką wytrzymałość ma płyta fundamentowa i czy można ją budować na trudnych gruntach?',
          answer: 'Płyty fundamentowe górnicze charakteryzują się ekstremalną wytrzymałością i sztywnością, dzięki czemu idealnie nadają się na tereny objęte szkodami górniczymi lub grunty o słabej nośności. W CoreLTB projektujemy je tak, by równomiernie rozkładały ciężar budynku, co eliminuje ryzyko pękania ścian. To obecnie najbezpieczniejsze rozwiązanie inżynieryjne na wymagające działki.',
        },
      ],
    },

    // =============================================================================
    // PODSUMOWANIE
    // =============================================================================
    {
      type: 'quote',
      content: 'Inwestycja w solidny fundament to inwestycja w bezpieczeństwo całego domu. Na terenach górniczych nie warto oszczędzać na tym etapie budowy – to decyzja na całe życie.',
      caption: 'Michał Krawczyk, Inżynier Konstrukcji CoreLTB Builders',
    },
  ],

  // =============================================================================
  // ARTYKUŁ: Dom energooszczędny — kompletny przewodnik budowy 2026
  // =============================================================================
  'dom-energooszczedny-slask': [

    // ── INTRO ──────────────────────────────────────────────────────
    {
      type: 'paragraph',
      content: '<strong>20 września 2026 roku</strong> wchodzą w życie nowe Warunki Techniczne (WT 2026), które zaostrzają wymagania energetyczne dla budynków mieszkalnych. Dla każdego, kto planuje budowę domu, oznacza to jedno: standard energooszczędny przestaje być wyborem — staje się przepisem. W tym przewodniku wyjaśniamy, czym jest dom energooszczędny, co dokładnie zmienią nowe regulacje i ile to kosztuje w praktyce.',
    },

    // ── SEKCJA 1 — Definicja ──────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Czym jest dom energooszczędny?',
    },
    {
      type: 'paragraph',
      content: 'Dom energooszczędny to budynek, który zużywa znacznie mniej energii do ogrzewania, chłodzenia i wentylacji niż standardowa konstrukcja. Kluczowym miernikiem jest <strong>wskaźnik EP</strong> — zapotrzebowanie na nieodnawialną energię pierwotną, wyrażone w kWh/(m²·rok).',
    },
    {
      type: 'paragraph',
      content: 'Według obecnych przepisów (WT 2021) dom jednorodzinny nie może przekraczać <strong>EP = 70 kWh/(m²·rok)</strong>. W praktyce dobrze zaprojektowany dom energooszczędny osiąga <strong>40–55 kWh/(m²·rok)</strong>, co przekłada się na rachunki za ogrzewanie rzędu <strong>2 000–3 000 zł rocznie</strong> dla domu 120 m².',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Wskaźnik EP — co oznacza w praktyce?</strong> EP uwzględnia nie tylko energię zużytą w budynku, ale też straty przy jej wytwarzaniu i przesyle. Dlatego pompa ciepła (zasilana prądem z OZE) daje niższy EP niż kocioł gazowy, mimo że oba mogą ogrzewać dom tak samo skutecznie.',
    },

    // ── SEKCJA 2 — Energooszczędny vs pasywny ────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Dom energooszczędny a pasywny — czym się różnią?',
    },
    {
      type: 'paragraph',
      content: 'Obydwa pojęcia dotyczą budynków o obniżonym zapotrzebowaniu na energię, ale różnica jest znaczna:',
    },
    {
      type: 'list',
      items: [
        '<strong>Dom energooszczędny:</strong> EP ≤ 70 kWh/(m²·rok) (WT 2021) lub ≤ 55 kWh/(m²·rok) (kierunek WT 2026). Koszt budowy wyższy o <strong>10–15%</strong> od standardowego. Wymaga dobrej izolacji, szczelności i rekuperacji.',
        '<strong>Dom pasywny:</strong> EP ≤ 15 kWh/(m²·rok). Koszt budowy wyższy o <strong>25–40%</strong>. Wymaga ekstremalnej szczelności (n50 ≤ 0,6), izolacji 30–40 cm, okien o U ≤ 0,7 i certyfikacji PHI.',
        '<strong>Dom standardowy (WT 2021):</strong> EP ≤ 70 kWh/(m²·rok). Spełnia minimum przepisów, ale bez zapasu na przyszłe regulacje.',
      ],
    },
    {
      type: 'paragraph',
      content: 'Dla większości inwestorów <strong>dom energooszczędny</strong> to złoty środek — realne oszczędności bez przesadnych kosztów budowy. Dom pasywny ma sens w skrajnie zimnych lokalizacjach lub gdy inwestor planuje certyfikację (np. pod kredyt „zielony").',
    },

    // ── SEKCJA 3 — WT 2026 (GŁÓWNA OŚ) ──────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'WT 2026 — co się zmienia od 20 września?',
    },
    {
      type: 'paragraph',
      content: 'Ministerstwo Rozwoju i Technologii przygotowuje <strong>całkowicie nowe rozporządzenie</strong> w sprawie warunków technicznych budynków, zastępujące wielokrotnie nowelizowany dokument z 2002 roku. Nowe WT 2026 wchodzą w życie <strong>20 września 2026 r.</strong> i opierają się na czterech filarach: energooszczędność, bezpieczeństwo pożarowe, akustyka i dostępność.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Zaostrzenie wymagań energetycznych',
    },
    {
      type: 'paragraph',
      content: 'Najważniejsze zmiany dla inwestorów budujących domy jednorodzinne:',
    },
    {
      type: 'list',
      items: [
        '<strong>Wskaźnik EP</strong> — spodziewane obniżenie z 70 do ok. <strong>55 kWh/(m²·rok)</strong>, co de facto wymusza stosowanie OZE (pompa ciepła, fotowoltaika)',
        '<strong>Współczynnik U ścian zewnętrznych</strong> — obecne 0,20 W/(m²·K) prawdopodobnie spadnie do <strong>0,17 W/(m²·K)</strong>, co oznacza grubszą izolację (min. 20–25 cm styropianu grafitowego lub wełny)',
        '<strong>Standard bezemisyjny</strong> — nowe budynki mają zbliżać się do zerowej emisji, co promuje pompy ciepła i fotowoltaikę jako główne źródła energii',
        '<strong>Automatyka budynkowa</strong> — obowiązkowy monitoring zużycia energii w wybranych typach obiektów',
        '<strong>Bezpieczeństwo pożarowe ETICS</strong> — surowsze wymagania dla systemów ociepleń, wymóg pasów ogniowych z wełny mineralnej',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Data graniczna: 20 września 2026.</strong> Liczy się data złożenia <strong>kompletnego wniosku o pozwolenie na budowę</strong>, nie data jego wydania. Wniosek złożony 19 września = budujesz po starych WT 2021. Wniosek złożony 21 września = nowe, droższe wymagania WT 2026. Jeśli planujesz budowę — czas na decyzję się kurczy.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ile więcej kosztują nowe wymagania?',
    },
    {
      type: 'paragraph',
      content: 'Branża szacuje wzrost kosztów budowy o <strong>10–15%</strong>, czyli <strong>25 000–50 000 zł</strong> więcej na dom jednorodzinny. Największe pozycje:',
    },
    {
      type: 'list',
      items: [
        '<strong>Termoizolacja</strong> (grubsze warstwy, droższe materiały): +25 000–50 000 zł',
        '<strong>Wentylacja z rekuperacją</strong> (w praktyce obowiązkowa przy EP 55): +15 000–35 000 zł',
        '<strong>Izolacyjność akustyczna</strong> (zabudowa bliźniacza/szeregowa): +7 000–25 000 zł',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Nasza rekomendacja:</strong> Niezależnie od daty złożenia wniosku, projektuj dom z parametrami WT 2026 już teraz. U ścian 0,17 zamiast 0,20, EP poniżej 55. Różnica w kosztach jest niewielka, a zyskujesz niższe rachunki i wyższą wartość nieruchomości na lata.',
    },

    // ── SEKCJA 4 — Wymagania techniczne ──────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Wymagania techniczne domu energooszczędnego',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Izolacja termiczna — ściany, dach, fundament',
    },
    {
      type: 'paragraph',
      content: 'Izolacja to fundament (dosłownie) energooszczędności. Kluczowe wartości współczynnika przenikania ciepła <strong>U</strong> [W/(m²·K)]:',
    },
    {
      type: 'list',
      items: [
        '<strong>Ściany zewnętrzne:</strong> U ≤ 0,20 (WT 2021) → rekomendowane U ≤ 0,17 (WT 2026). W praktyce: 20–25 cm styropianu grafitowego (λ = 0,031) lub wełny mineralnej na bloczku silikatowym/ceramicznym.',
        '<strong>Dach / stropodach:</strong> U ≤ 0,15. Minimum 25–30 cm wełny mineralnej lub pianki PIR między krokwiami + dodatkowa warstwa.',
        '<strong>Podłoga na gruncie:</strong> U ≤ 0,30. Izolacja XPS min. 15 cm pod płytą fundamentową lub na ławach.',
        '<strong>Okna:</strong> U ≤ 0,90 (WT 2021) → rekomendowane U ≤ 0,80. Trzyszybowe pakiety z ramą o ciepłym dystansie.',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'Szczelność powietrzna budynku',
    },
    {
      type: 'paragraph',
      content: 'Nawet najlepsza izolacja nie pomoże, jeśli ciepło ucieka przez nieszczelności. Dom energooszczędny powinien osiągać wynik testu <strong>blower door n50 ≤ 1,5 1/h</strong> (dom pasywny: ≤ 0,6). Kluczowe detale: ciągłość folii paroizolacyjnej, uszczelnienie przejść instalacyjnych, szczelny montaż okien w warstwie izolacji.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Rekuperacja — wentylacja z odzyskiem ciepła',
    },
    {
      type: 'paragraph',
      content: 'Przy szczelnym budynku wentylacja grawitacyjna nie działa — potrzebna jest <strong>wentylacja mechaniczna z rekuperacją</strong>. Centrala odzyskuje <strong>80–95% ciepła</strong> z powietrza wywiewanego i podgrzewa nim świeże powietrze nawiewane. Efekt: świeże, przefiltrowane powietrze bez otwierania okien i bez strat ciepła.',
    },
    {
      type: 'paragraph',
      content: 'Rekuperacja ma jeszcze jedną, często pomijaną zaletę: <strong>filtracja powietrza</strong>. W regionach o złej jakości powietrza (południe Polski, aglomeracje) filtry F7 lub HEPA w centrali skutecznie zatrzymują pyły PM2.5 i PM10. To nie gadżet — to ochrona zdrowia domowników.',
    },
    // TODO: OBRAZ — rekuperator
    {
      type: 'image',
      src: '/images/blog/dom-energooszczedny/rekuperacja.webp',
      alt: 'Centrala rekuperacyjna z filtrem — wentylacja mechaniczna z odzyskiem ciepła w domu energooszczędnym',
      caption: 'Rekuperator odzyskuje 80–95% ciepła z powietrza wywiewanego — obowiązkowy element domu energooszczędnego',
    },

    // ── SEKCJA 5 — Materiały ─────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Z czego budować dom energooszczędny?',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ściany — silikat, ceramika, beton komórkowy czy szkielet?',
    },
    {
      type: 'paragraph',
      content: 'Każda z popularnych technologii pozwala osiągnąć standard energooszczędny, ale różnią się one właściwościami użytkowymi:',
    },
    {
      type: 'list',
      items: [
        '<strong>Bloczki silikatowe</strong> (Silka) — nasza preferowana technologia w CoreLTB. Doskonała akumulacja ciepła (mur „magazynuje" ciepło w dzień i oddaje w nocy), wysoka izolacyjność akustyczna, ściana nośna 18 cm + ocieplenie. Idealne do gęstej zabudowy.',
        '<strong>Ceramika</strong> (Porotherm, Leier) — popularna, dobra akumulacja, nieco grubsza ściana. Sprawdzone rozwiązanie w budownictwie jednorodzinnym.',
        '<strong>Beton komórkowy</strong> (Ytong, Solbet) — lekki, łatwy w obróbce, ale niższa akumulacja ciepła. Wymaga starannego wykończenia (podatny na wilgoć).',
        '<strong>Szkielet drewniany</strong> — najszybsza budowa, bardzo dobre parametry U przy mniejszej grubości ściany. Ograniczona akumulacja ciepła, wymaga idealnej paroizolacji.',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'Fundamenty — ława czy płyta?',
    },
    {
      type: 'paragraph',
      content: '<strong>Płyta fundamentowa</strong> z izolacją XPS od spodu eliminuje mostki termiczne w strefie cokołu i ułatwia montaż ogrzewania podłogowego. Na terenach o trudnych warunkach gruntowych (szkody górnicze, gliny, grunty zalewowe) jest jedynym bezpiecznym rozwiązaniem. Szczegółowo opisaliśmy to w artykule: <a href="/baza-wiedzy/plyta-fundamentowa-tereny-gornicze">Płyta fundamentowa na terenach górniczych</a>.',
    },
    {
      type: 'paragraph',
      content: '<strong>Ławy fundamentowe</strong> ze wzmocnioną izolacją cokołu sprawdzają się na stabilnych gruntach. Tańsze o ok. 30–50 zł/m², ale wymagają starannego rozwiązania mostka termicznego na styku ław, ścian i posadzki.',
    },

    // ── SEKCJA 6 — Systemy grzewcze ─────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Systemy grzewcze i OZE',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Pompa ciepła powietrze-woda',
    },
    {
      type: 'paragraph',
      content: 'To obecnie <strong>dominujące rozwiązanie</strong> w budownictwie energooszczędnym — i jedyne, które realistycznie pozwala spełnić EP ≤ 55 kWh/(m²·rok) bez fotowoltaiki. Współczynnik COP <strong>3,5–4,5</strong> oznacza, że z 1 kWh prądu uzyskujemy 3,5–4,5 kWh ciepła. Roczny koszt ogrzewania domu 120 m²: <strong>2 000–3 000 zł</strong>.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Fotowoltaika — synergia z pompą ciepła',
    },
    {
      type: 'paragraph',
      content: 'Instalacja <strong>5–8 kWp</strong> (koszt ok. 20 000–30 000 zł po dotacjach) w połączeniu z pompą ciepła pozwala osiągnąć niemal zerowe rachunki za ogrzewanie i ciepłą wodę. WT 2026 nie narzucają obowiązku montażu PV na domach jednorodzinnych, ale obniżony wskaźnik EP sprawia, że fotowoltaika staje się <strong>de facto standardem</strong>.',
    },
    // TODO: OBRAZ — pompa ciepła + PV
    {
      type: 'image',
      src: '/images/blog/dom-energooszczedny/pompa-ciepla-fotowoltaika.webp',
      alt: 'Pompa ciepła powietrze-woda obok domu jednorodzinnego z instalacją fotowoltaiczną na dachu',
      caption: 'Pompa ciepła + fotowoltaika — tandem, który pozwala spełnić wymagania WT 2026 i obniżyć rachunki do minimum',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ogrzewanie podłogowe niskotemperaturowe',
    },
    {
      type: 'paragraph',
      content: 'Pompa ciepła najefektywniej współpracuje z <strong>ogrzewaniem podłogowym</strong> (temperatura zasilania 30–35°C vs 55–70°C dla grzejników). Podłogówka równomiernie rozprowadza ciepło, eliminuje grzejniki pod oknami i doskonale pasuje do płyty fundamentowej — pętle grzewcze zatapiane są bezpośrednio w wylewce.',
    },

    // ── SEKCJA 7 — Koszty ────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Ile kosztuje budowa domu energooszczędnego?',
    },
    {
      type: 'paragraph',
      content: 'Budowa domu energooszczędnego jest droższa o ok. <strong>10–15%</strong> w porównaniu z domem spełniającym jedynie minimum WT 2021. Różnica wynika głównie z lepszej izolacji, stolarki, rekuperacji i pompy ciepła. Ale te dodatkowe <strong>50 000–80 000 zł</strong> zwracają się w ciągu <strong>5–8 lat</strong> dzięki niższym rachunkom.',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Orientacyjne koszty budowy domu energooszczędnego 120 m² (2026):</strong><br>Stan surowy otwarty: <strong>250 000–320 000 zł</strong><br>Stan surowy zamknięty: <strong>350 000–430 000 zł</strong><br>Stan deweloperski: <strong>450 000–560 000 zł</strong><br>Pod klucz: <strong>550 000–700 000 zł</strong><br><br><em>Ceny dla domu parterowego z pompą ciepła i rekuperacją. Zależą od lokalizacji, gruntu i standardu wykończenia.</em>',
    },
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz koszt budowy',
    },

    // ── SEKCJA 8 — Dotacje ───────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Dotacje i dofinansowanie w 2026 roku',
    },
    {
      type: 'paragraph',
      content: 'Budując dom energooszczędny, możesz odzyskać znaczną część dodatkowych kosztów:',
    },
    {
      type: 'list',
      items: [
        '<strong>Moje Ciepło</strong> — dotacja do <strong>21 000 zł</strong> na pompę ciepła w nowym budynku (warunek: EP ≤ norma WT i świadectwo energetyczne klasy A).',
        '<strong>Mój Prąd</strong> — dofinansowanie instalacji fotowoltaicznej, magazynu energii i systemu zarządzania energią.',
        '<strong>Czyste Powietrze</strong> — obejmuje m.in. rekuperację, stolarkę okienną i pompę ciepła. Kwoty zależą od dochodu.',
        '<strong>Ulga termomodernizacyjna</strong> — odliczenie od podatku do <strong>53 000 zł</strong> na materiały i usługi związane z termomodernizacją (dotyczy istniejących budynków, ale warto znać przy rozbudowie).',
      ],
    },

    // ── SEKCJA 9 — Południe Polski ───────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Budowa na południu Polski — na co uważać',
    },
    {
      type: 'paragraph',
      content: 'Polska południowa (Śląsk, Małopolska, Opolszczyzna) stawia przed inwestorami kilka dodatkowych wyzwań, które wpływają na projektowanie domu energooszczędnego:',
    },
    {
      type: 'list',
      items: [
        '<strong>Strefa klimatyczna III</strong> — obliczeniowa temperatura zewnętrzna <strong>-20°C</strong>. Dłuższe sezony grzewcze niż w zachodniej Polsce. Izolacja musi mieć zapas — projektujemy z U = 0,17 zamiast 0,20.',
        '<strong>Tereny górnicze (Śląsk)</strong> — na działkach objętych szkodami górniczymi jedynym bezpiecznym fundamentem jest <strong>płyta fundamentowa</strong> z izolacją XPS. Płyta jednocześnie eliminuje mostki termiczne, co jest korzystne dla energooszczędności.',
        '<strong>Jakość powietrza</strong> — stężenia PM2.5 i PM10 regularnie przekraczają normy, szczególnie zimą. Rekuperacja z filtracją F7/HEPA staje się nie opcją, a <strong>koniecznością zdrowotną</strong>.',
        '<strong>Grunty</strong> — gliny na Śląsku, grunty zalewowe w dolinach Wisły i Soły (Małopolska), tereny krasowe (Jura). Każdy typ wymaga innego podejścia do fundamentu i hydroizolacji.',
      ],
    },
    {
      type: 'paragraph',
      content: 'Budujemy domy na południu Polski od ponad 15 lat. Znamy lokalne warunki, współpracujemy z geologami i konstruktorami. Jeśli budujesz w <a href="/obszar-dzialania/katowice">Katowicach</a>, <a href="/obszar-dzialania/rybnik">Rybniku</a> czy <a href="/obszar-dzialania/krakow">Krakowie</a> — rozumiemy specyfikę Twojego terenu.',
    },
    {
      type: 'cta',
      ctaHref: '/analiza-dzialki',
      ctaIcon: 'mapPin',
      ctaLabel: 'Zamów analizę działki',
    },
    // TODO: OBRAZ — budowa na południu
    {
      type: 'image',
      src: '/images/blog/dom-energooszczedny/budowa-slask.webp',
      alt: 'Budowa domu jednorodzinnego na Śląsku — izolacja fundamentu płytą XPS na terenie górniczym',
      caption: 'Izolacja płyty fundamentowej XPS-em na budowie w rejonie Śląska — eliminacja mostków termicznych od poziomu gruntu',
    },

    // ── SEKCJA 10 — Projekty ─────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Projekty domów energooszczędnych — na co zwrócić uwagę',
    },
    {
      type: 'paragraph',
      content: 'Nie każdy projekt „katalogowy" jest energooszczędny. Przy wyborze zwróć uwagę na:',
    },
    {
      type: 'list',
      items: [
        '<strong>Zwartą bryłę</strong> — im mniej załamań, wykuszy i loggi, tym mniejsza powierzchnia przegród tracących ciepło. Stosunek A/V (powierzchnia zewnętrzna do kubatury) powinien być jak najniższy.',
        '<strong>Orientację budynku</strong> — salon i główne przeszklenia na południe (zyski solarne), pomieszczenia gospodarcze na północ.',
        '<strong>Adaptację do gruntu</strong> — projekt gotowy wymaga adaptacji do warunków na działce (geologia, kategoria terenu, strefy wiatrowe). Dobry projektant adaptujący przeliczy izolację pod konkretną lokalizację.',
      ],
    },
    {
      type: 'paragraph',
      content: 'W naszej <a href="/projekty">bazie projektów</a> znajdziesz ponad 250 domów parterowych i z poddaszem — każdy z kalkulacją kosztów budowy. Potrzebujesz projektu indywidualnego? <a href="/oferta/projektowanie">Zaprojektujemy dom</a> dopasowany do Twojej działki i budżetu.',
    },
    {
      type: 'cta-wide',
      ctaHref: '/projekty',
      caption: 'Baza projektów',
      ctaLabel: 'Znajdź projekt domu energooszczędnego',
      ctaDescription: 'Ponad 250 domów parterowych i z poddaszem — każdy z kalkulacją kosztów budowy.',
      content: 'Przeglądaj projekty',
      src: '/images/blog/dom-energooszczedny/hero.webp',
      alt: 'Nowoczesny dom energooszczędny — projekty domów CoreLTB',
    },

    // ── SEKCJA 11 — Od czego zacząć ─────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Od czego zacząć budowę domu energooszczędnego?',
    },
    {
      type: 'paragraph',
      content: 'Budowa domu energooszczędnego to proces, który zaczyna się od dobrego planu. Oto 5 kluczowych kroków:',
    },
    {
      type: 'list',
      items: [
        '<strong>1. Analiza działki</strong> — sprawdź MPZP, warunki gruntowe i ewentualne obciążenia (szkody górnicze, tereny zalewowe). <a href="/analiza-dzialki">Zamów bezpłatną analizę</a>.',
        '<strong>2. Wybór projektu</strong> — gotowy lub indywidualny, z parametrami spełniającymi WT 2026. <a href="/projekty">Zobacz projekty</a>.',
        '<strong>3. Wycena budowy</strong> — poznaj realne koszty z podziałem na etapy. <a href="/wycena">Użyj kalkulatora</a>.',
        '<strong>4. Wybór wykonawcy</strong> — postaw na generalnego wykonawcę ze stałą ceną w umowie i doświadczeniem w Twoim regionie.',
        '<strong>5. Realizacja</strong> — budowa z profesjonalnym <a href="/oferta/kompleksowa-budowa-domow">nadzorem i kontrolą jakości</a> na każdym etapie.',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Pamiętaj o terminie.</strong> Jeśli chcesz budować według WT 2021, kompletny wniosek o pozwolenie na budowę musisz złożyć <strong>przed 20 września 2026</strong>. Po tej dacie — nowe, droższe wymagania.',
    },
    {
      type: 'cta',
      ctaHref: '/umow-konsultacje',
      ctaIcon: 'phone',
      ctaLabel: 'Umów konsultację',
    },

    // ── FAQ ──────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Najczęściej zadawane pytania',
    },
    {
      type: 'faq',
      faqItems: [
        {
          question: 'Co to jest dom energooszczędny?',
          answer: 'Dom energooszczędny to budynek o obniżonym zapotrzebowaniu na energię do ogrzewania, chłodzenia i wentylacji. Zgodnie z WT 2021 jego wskaźnik EP nie przekracza <strong>70 kWh/(m²·rok)</strong>. W praktyce dobrze zaprojektowany dom energooszczędny osiąga 40–55 kWh/(m²·rok) dzięki grubej izolacji, szczelnej konstrukcji, rekuperacji i efektywnemu systemowi grzewczemu (najczęściej pompa ciepła).',
        },
        {
          question: 'Ile kosztuje budowa domu energooszczędnego w 2026 roku?',
          answer: 'Budowa domu energooszczędnego o powierzchni 120 m² kosztuje orientacyjnie <strong>550 000–700 000 zł pod klucz</strong> (z pompą ciepła i rekuperacją). To o ok. 10–15% więcej niż dom standardowy, ale niższe rachunki za ogrzewanie (ok. 2 000–3 000 zł/rok zamiast 5 000–7 000 zł) zwracają różnicę w <strong>5–8 lat</strong>.',
        },
        {
          question: 'Z czego najlepiej budować dom energooszczędny?',
          answer: 'Każda technologia (silikat, ceramika, beton komórkowy, szkielet drewniany) pozwala osiągnąć standard energooszczędny. Kluczowa jest <strong>grubość i jakość izolacji</strong>, nie sam materiał ściany nośnej. W CoreLTB preferujemy bloczki silikatowe z ociepleniem styropianem grafitowym — łączą doskonałą akumulację ciepła z izolacyjnością akustyczną.',
        },
        {
          question: 'Czym różni się dom energooszczędny od pasywnego?',
          answer: 'Dom energooszczędny ma wskaźnik EP ≤ 70 kWh/(m²·rok), dom pasywny ≤ 15 kWh/(m²·rok). Dom pasywny wymaga ekstremalnej szczelności (n50 ≤ 0,6), izolacji 30–40 cm i okien o U ≤ 0,7. Kosztuje <strong>25–40% więcej</strong> niż standardowy. Dla większości inwestorów dom energooszczędny to optymalny wybór — realne oszczędności bez przesadnych kosztów.',
        },
        {
          question: 'Jakie wymagania musi spełniać dom energooszczędny po WT 2026?',
          answer: 'Nowe WT 2026 (od 20 września 2026) zaostrzają wymagania: wskaźnik EP ma spaść do ok. <strong>55 kWh/(m²·rok)</strong>, a współczynnik U ścian do ok. <strong>0,17 W/(m²·K)</strong>. W praktyce oznacza to grubszą izolację, lepszą stolarkę okienną i niemal obowiązkową pompę ciepła z fotowoltaiką. Szacowany wzrost kosztów: 25 000–50 000 zł.',
        },
        {
          question: 'Ile kWh/m² zużywa dom energooszczędny rocznie?',
          answer: 'Dom energooszczędny zużywa od <strong>40 do 70 kWh/(m²·rok)</strong> energii pierwotnej (wskaźnik EP). W przeliczeniu na realne zużycie ciepła do ogrzewania to ok. <strong>30–50 kWh/(m²·rok)</strong>. Dla porównania: standardowy dom sprzed 2021 roku zużywał nawet 120–150 kWh/(m²·rok).',
        },
      ],
    },

    // ── PODSUMOWANIE ─────────────────────────────────────────────
    {
      type: 'quote',
      content: 'Dom energooszczędny to nie fanaberia — od września 2026 to nowy standard. Ale nawet dziś warto budować z zapasem na przyszłe regulacje. Dobrze zaizolowany dom z pompą ciepła i rekuperacją to niższe rachunki, czystsze powietrze w środku i wyższa wartość nieruchomości na lata.',
      caption: 'Michał Krawczyk, Inżynier Konstrukcji CoreLTB Builders',
    },
  ],
};

/**
 * Pobierz pełne dane posta blogowego (z treścią)
 */
export function getBlogPostDataBySlug(slug: string): BlogPostData | undefined {
  const post = getBlogPostBySlug(slug);
  if (!post) return undefined;

  const content = blogPostContents[slug] || [
    {
      type: 'paragraph' as const,
      content: post.excerpt,
    },
    {
      type: 'callout' as const,
      variant: 'info' as const,
      content: 'Pełna treść tego artykułu jest w przygotowaniu. Zapraszamy wkrótce!',
    },
  ];

  return {
    ...post,
    content,
    tags: getTagsForPost(post.categoryId),
  };
}

/**
 * Generuj tagi na podstawie kategorii
 */
function getTagsForPost(categoryId: string): string[] {
  const tagMap: Record<string, string[]> = {
    'realizacje': ['budowa domu', 'case study', 'realizacja'],
    'technologia': ['technologia budowlana', 'materiały', 'innowacje'],
    'prawo': ['prawo budowlane', 'przepisy', 'formalności'],
    'porady': ['porady', 'wskazówki', 'praktyka'],
  };
  return tagMap[categoryId] || ['budownictwo'];
}

/**
 * Konwertuj BlogPost na RelatedPost (dla sekcji "Podobne artykuły")
 */
export function toRelatedPost(post: BlogPost): RelatedPost {
  return {
    id: post.id,
    image: post.image,
    category: post.category,
    date: post.date,
    title: post.title,
    href: post.href,
  };
}

// =============================================================================
// EKSPORT DANYCH DLA KOMPONENTU
// =============================================================================

/**
 * Dane sekcji blogowej do użycia w komponencie BentoBlogSection
 */
export const blogSectionData = {
  breadcrumbs: blogBreadcrumbs,
  title: 'Wiedza, innowacje i',
  titleHighlight: 'nowoczesne budownictwo.',
  description: 'Śledź nasze najnowsze realizacje, dowiedz się więcej o technologiach budowlanych i poznaj specyfikę budowy na terenach górniczych Śląska.',
  categories: blogCategories,
  posts: blogPosts,
  loadMoreLabel: 'Załaduj więcej wpisów',
};
