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
  { label: 'Blog' },
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
    href: '/blog/plyta-fundamentowa-tereny-gornicze',
  },
  {
    id: 'realizacja-rybnik-boguszowice',
    image: {
      src: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop',
      alt: 'Budowa domu w Rybniku',
    },
    category: 'Realizacje',
    categoryId: 'realizacje',
    date: '10 Stycznia, 2026',
    dateTimestamp: Date.parse('2026-01-10'),
    readTime: '8 min czytania',
    title: 'Dom jednorodzinny 180m² w kategorii III szkód górniczych - case study',
    excerpt: 'Szczegółowe case study budowy domu na terenie aktywnym górniczo. Wyzwania logistyczne i konstrukcyjne.',
    href: '/blog/realizacja-rybnik-boguszowice',
  },
  {
    id: 'prawo-budowlane-2026',
    image: {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
      alt: 'Zmiany w prawie budowlanym',
    },
    category: 'Prawo budowlane',
    categoryId: 'prawo',
    date: '8 Stycznia, 2026',
    dateTimestamp: Date.parse('2026-01-08'),
    readTime: '6 min czytania',
    title: 'Zmiany w prawie budowlanym 2026 - co musisz wiedzieć',
    excerpt: 'Przegląd najważniejszych zmian w prawie budowlanym wchodzących w życie w 2026 roku.',
    href: '/blog/prawo-budowlane-2026',
  },
  {
    id: 'termoizolacja-fundamentow',
    image: {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
      alt: 'Termoizolacja fundamentów',
    },
    category: 'Technologia',
    categoryId: 'technologia',
    date: '5 Stycznia, 2026',
    dateTimestamp: Date.parse('2026-01-05'),
    readTime: '4 min czytania',
    title: 'Termoizolacja fundamentów - XPS vs Styrodur. Porównanie',
    excerpt: 'Kompleksowe porównanie dwóch najpopularniejszych materiałów do izolacji fundamentów.',
    href: '/blog/termoizolacja-fundamentow',
  },
  {
    id: 'jak-wybrac-projekt-domu',
    image: {
      src: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop',
      alt: 'Projekt domu',
    },
    category: 'Porady',
    categoryId: 'porady',
    date: '2 Stycznia, 2026',
    dateTimestamp: Date.parse('2026-01-02'),
    readTime: '7 min czytania',
    title: 'Jak wybrać projekt domu? 10 kluczowych kryteriów',
    excerpt: 'Praktyczny przewodnik po wyborze projektu domu jednorodzinnego. Na co zwrócić uwagę?',
    href: '/blog/jak-wybrac-projekt-domu',
  },

  // ============= GRUDZIEŃ 2025 =============
  {
    id: 'plac-budowy-zima',
    image: {
      src: 'https://images.unsplash.com/photo-1590644365607-1c5a38fc43e0?q=80&w=800&auto=format&fit=crop',
      alt: 'Przygotowanie placu budowy do zimy',
    },
    category: 'Porady',
    categoryId: 'porady',
    date: '28 Grudnia, 2025',
    dateTimestamp: Date.parse('2025-12-28'),
    readTime: '5 min czytania',
    title: 'Jak przygotować plac budowy do sezonu zimowego?',
    excerpt: 'Zabezpieczenie materiałów, domieszki do betonu i ogrzewanie placu budowy - kompletny przewodnik.',
    href: '/blog/plac-budowy-zima',
  },
  {
    id: 'kierownik-budowy',
    image: {
      src: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop',
      alt: 'Kierownik budowy',
    },
    category: 'Prawo budowlane',
    categoryId: 'prawo',
    date: '20 Grudnia, 2025',
    dateTimestamp: Date.parse('2025-12-20'),
    readTime: '6 min czytania',
    title: 'Kierownik budowy - obowiązki i odpowiedzialność prawna',
    excerpt: 'Dowiedz się, za co odpowiada kierownik budowy i jakie ma uprawnienia na placu budowy.',
    href: '/blog/kierownik-budowy',
  },
  {
    id: 'dom-pasywny-katowice',
    image: {
      src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
      alt: 'Nowoczesny dom pasywny',
    },
    category: 'Realizacje',
    categoryId: 'realizacje',
    date: '15 Grudnia, 2025',
    dateTimestamp: Date.parse('2025-12-15'),
    readTime: '10 min czytania',
    title: 'Realizacja: Dom pasywny 220m² w Katowicach',
    excerpt: 'Case study budowy domu pasywnego z pompą ciepła i rekuperacją. Koszty, czas realizacji i efekty.',
    href: '/blog/dom-pasywny-katowice',
  },
  {
    id: 'pompa-ciepla-czy-gaz',
    image: {
      src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?q=80&w=800&auto=format&fit=crop',
      alt: 'Pompa ciepła',
    },
    category: 'Technologia',
    categoryId: 'technologia',
    date: '10 Grudnia, 2025',
    dateTimestamp: Date.parse('2025-12-10'),
    readTime: '8 min czytania',
    title: 'Pompa ciepła czy gaz? Analiza kosztów ogrzewania w 2026',
    excerpt: 'Szczegółowa analiza kosztów eksploatacji pompy ciepła vs kotła gazowego.',
    href: '/blog/pompa-ciepla-czy-gaz',
  },
  {
    id: 'pozwolenie-na-budowe-krok-po-kroku',
    image: {
      src: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=800&auto=format&fit=crop',
      alt: 'Dokumenty budowlane',
    },
    category: 'Prawo budowlane',
    categoryId: 'prawo',
    date: '5 Grudnia, 2025',
    dateTimestamp: Date.parse('2025-12-05'),
    readTime: '9 min czytania',
    title: 'Pozwolenie na budowę - krok po kroku w 2026',
    excerpt: 'Kompletny przewodnik po procedurze uzyskania pozwolenia na budowę domu jednorodzinnego.',
    href: '/blog/pozwolenie-na-budowe-krok-po-kroku',
  },

  // ============= LISTOPAD 2025 =============
  {
    id: 'realizacja-tychy-centrum',
    image: {
      src: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop',
      alt: 'Dom w Tychach',
    },
    category: 'Realizacje',
    categoryId: 'realizacje',
    date: '25 Listopada, 2025',
    dateTimestamp: Date.parse('2025-11-25'),
    readTime: '7 min czytania',
    title: 'Realizacja: Nowoczesny dom 160m² w Tychach',
    excerpt: 'Budowa nowoczesnego domu jednorodzinnego w centrum Tychów. Wyzwania i rozwiązania.',
    href: '/blog/realizacja-tychy-centrum',
  },
  {
    id: 'bledy-przy-budowie-domu',
    image: {
      src: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop',
      alt: 'Błędy przy budowie',
    },
    category: 'Porady',
    categoryId: 'porady',
    date: '18 Listopada, 2025',
    dateTimestamp: Date.parse('2025-11-18'),
    readTime: '6 min czytania',
    title: '10 najczęstszych błędów przy budowie domu - jak ich uniknąć',
    excerpt: 'Lista najczęstszych błędów popełnianych podczas budowy i praktyczne porady jak ich uniknąć.',
    href: '/blog/bledy-przy-budowie-domu',
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
      type: 'callout',
      variant: 'tip',
      content: '<strong>Bezpłatna konsultacja:</strong> Skontaktuj się z nami telefonicznie lub przez formularz kontaktowy. Ocenimy Twoją działkę i dobierzemy optymalne rozwiązanie konstrukcyjne.',
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
