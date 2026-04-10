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

  // ============= KWIECIEŃ 2026 =============
  {
    id: 'stan-surowy-otwarty-poradnik',
    image: {
      src: '/images/blog/stan-surowy-otwarty/hero.webp',
      alt: 'Dom z poddaszem w stanie surowym otwartym - ściany z pustaków ceramicznych, dach dwuspadowy z dachówką, puste otwory okienne',
    },
    category: 'Porady',
    categoryId: 'porady',
    date: '8 Kwietnia, 2026',
    dateTimestamp: Date.parse('2026-04-08'),
    readTime: '12 min czytania',
    title: 'Stan surowy otwarty - co zawiera i ile kosztuje w 2026?',
    excerpt: 'Stan surowy otwarty (SSO) - zakres prac, konkretne stawki za m² na Śląsku w 2026 i porównanie technologii. Cennik od generalnego wykonawcy.',
    author: {
      name: 'Michał Krawczyk',
      role: 'Inżynier Konstrukcji',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    href: '/baza-wiedzy/stan-surowy-otwarty-poradnik',
  },
  {
    id: 'kosztorys-budowy-domu-2026',
    image: {
      src: '/images/blog/kosztorys-budowy/hero.webp',
      alt: 'Kosztorys budowy domu - kalkulator, dokumenty i plany budowlane na biurku',
    },
    category: 'Porady',
    categoryId: 'porady',
    date: '15 Kwietnia, 2026',
    dateTimestamp: Date.parse('2026-04-15'),
    readTime: '14 min czytania',
    title: 'Kosztorys budowy domu 2026 - aktualny cennik na Śląsku',
    excerpt: 'Ile kosztuje budowa domu w 2026 roku? Rozbijamy koszty na etapy: stan zero, SSO, SSZ, deweloperski i pod klucz. Realne stawki za m² z podziałem na materiały - cennik dla Śląska od generalnego wykonawcy.',
    author: {
      name: 'Michał Krawczyk',
      role: 'Inżynier Konstrukcji',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    href: '/baza-wiedzy/kosztorys-budowy-domu-2026',
    hidden: true,
  },
  {
    id: 'ile-kosztuje-kierownik-budowy',
    image: {
      src: '/images/blog/kierownik-budowy/hero.webp',
      alt: 'Kierownik budowy na placu budowy domu jednorodzinnego z dokumentacją projektową',
    },
    category: 'Porady',
    categoryId: 'porady',
    date: '28 Kwietnia, 2026',
    dateTimestamp: Date.parse('2026-04-28'),
    readTime: '11 min czytania',
    title: 'Ile kosztuje kierownik budowy w 2026? Obowiązki, stawki, na co uważać',
    excerpt: 'Kierownik budowy to obowiązkowa funkcja przy każdej budowie domu. Ile kosztuje, za co odpowiada i czym różni się od inspektora nadzoru? Aktualne stawki na Śląsku i konkretne wskazówki od generalnego wykonawcy.',
    author: {
      name: 'Michał Krawczyk',
      role: 'Inżynier Konstrukcji',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    href: '/baza-wiedzy/ile-kosztuje-kierownik-budowy',
    hidden: true,
  },

  // ============= MARZEC 2026 =============
  {
    id: 'dom-energooszczedny-slask',
    image: {
      src: '/images/blog/dom-energooszczedny/hero.webp',
      alt: 'Nowoczesny dom energooszczędny z fotowoltaiką na dachu i pompą ciepła - widok od frontu',
    },
    category: 'Technologia',
    categoryId: 'technologia',
    date: '23 Marca, 2026',
    dateTimestamp: Date.parse('2026-03-23'),
    readTime: '14 min czytania',
    title: 'Dom energooszczędny - kompletny przewodnik budowy 2026',
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
    .filter(post => post.id !== currentSlug && post.categoryId === currentPost.categoryId && !post.hidden)
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

  // =============================================================================
  // ARTYKUŁ 1: Stan surowy otwarty - co zawiera i ile kosztuje w 2026?
  // Keywords: stan surowy otwarty (2400), cena za m2 robocizny (720), koszt (210),
  //   co zawiera (170), cena za m2 (170), a zamknięty (90)
  // Information Gain: ŻADEN z TOP 9 nie podaje stawek za m² komponentowo
  // =============================================================================
  'stan-surowy-otwarty-poradnik': [

    // ── INTRO ──────────────────────────────────────────────────
    {
      type: 'paragraph',
      content: '<strong>Stan surowy otwarty (SSO)</strong> to etap, na którym dom nabiera realnych kształtów - stoi na fundamentach, ma ściany nośne i dach, ale wciąż nie posiada okien ani drzwi. Pochłania największą część budżetu budowy i jednocześnie decyduje o trwałości domu na dekady. W tym przewodniku podajemy <strong>konkretne stawki za m²</strong> w podziale na fundamenty, ściany i dach - aktualne na kwiecień 2026, dla rejonu Śląska.',
    },

    // ── SEKCJA 1 - Definicja SSO (kw: co to jest SSO, co zawiera) ───
    {
      type: 'heading',
      level: 2,
      content: 'Czym jest stan surowy otwarty domu?',
    },
    {
      type: 'paragraph',
      content: 'Stan surowy otwarty to etap budowy obejmujący kompletną konstrukcję nośną budynku - fundamenty, ściany, strop (w domach piętrowych) i pokrycie dachu. Budynek nie ma zamontowanej stolarki okiennej i drzwiowej, co oznacza, że jest „otwarty" na warunki atmosferyczne.',
    },
    {
      type: 'paragraph',
      content: 'W praktyce SSO składa się z dwóch faz realizacji:',
    },
    {
      type: 'list',
      items: [
        '<strong>Stan zero</strong> - fundamenty (płyta lub ławy), kanalizacja podposadzkowa, hydroizolacja, podsypka żwirowa. To niewidoczna część domu, ale decydująca o jego trwałości.',
        '<strong>Stan surowy otwarty właściwy</strong> - ściany nośne i działowe, strop, więźba dachowa lub konstrukcja dachu płaskiego, pokrycie dachu, kominy, ocieplenie dachu (piana PUR), rynny i podbitka.',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>SSO nie zawiera okien, drzwi, instalacji elektrycznej ani wod-kan.</strong> Te elementy wchodzą w zakres <a href="/wycena">stanu surowego zamkniętego (SSZ)</a>. Niektóre firmy doliczają stolarkę do SSO, sztucznie podnosząc cenę. Zawsze żądaj szczegółowej listy prac - nie porównuj „cen za m²" bez znajomości zakresu.',
    },

    // ── SEKCJA 2 - Zakres prac (kw: co zawiera SSO, co obejmuje) ──
    {
      type: 'heading',
      level: 2,
      content: 'Co dokładnie zawiera stan surowy otwarty?',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Fundamenty - stan zero',
    },
    {
      type: 'list',
      items: [
        '<strong>Kierownik Budowy i Inżynier Budowy</strong> - nadzór techniczny od pierwszego dnia',
        '<strong>Geodeta</strong> - wytyczenie budynku na działce (<a href="/oferta/uslugi-techniczne">usługi techniczne</a>)',
        '<strong>Geotechnik</strong> - odwierty i badanie gruntu (konieczne do doboru fundamentu). Nie masz jeszcze badań? Zacznij od <a href="/analiza-dzialki">bezpłatnej analizy działki</a>',
        '<strong>Fundament</strong> - płyta fundamentowa żelbetowa z izolacją lub ławy fundamentowe z izolacją',
        '<strong>Kanalizacja podposadzkowa</strong> - rury odpływowe prowadzone przed betonowaniem',
        '<strong>Hydroizolacja</strong> - zabezpieczenie przed wilgocią gruntową',
        '<strong>Podsypka piaskowo-żwirowa</strong> - podbudowa zagęszczana mechanicznie warstwami',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Na terenach górniczych Śląska</strong> (Katowice, Bytom, Ruda Śl., Zabrze, Jastrzębie-Zdrój) jedynym bezpiecznym fundamentem jest płyta żelbetowa ze stalą B500SP i warstwą poślizgową. Szczegóły: <a href="/baza-wiedzy/plyta-fundamentowa-tereny-gornicze">Płyta fundamentowa na terenach górniczych</a>.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ściany nośne i działowe',
    },
    {
      type: 'paragraph',
      content: 'Wybór technologii ściennej wpływa na koszt SSO, akustykę i zdolność akumulacji ciepła. Trzy główne opcje:',
    },
    {
      type: 'list',
      items: [
        '<strong>Bloczki silikatowe (Silka)</strong> - nasza preferowana technologia. Najlepsza akumulacja ciepła i izolacyjność akustyczna. Ściana nośna 18 cm + ocieplenie. Stawka: <strong>~1 300 zł/m²</strong>.',
        '<strong>Ceramika szlifowana (Porotherm, Leier)</strong> - popularna, dobra akumulacja ciepła. Stawka: <strong>~1 100 zł/m²</strong>.',
        '<strong>Beton komórkowy (Ytong, Solbet, H+H)</strong> - lekki, szybki w murowanie, ale niższa akumulacja ciepła i gorsza akustyka. Stawka: <strong>~900 zł/m²</strong>.',
      ],
    },
    {
      type: 'paragraph',
      content: 'Ściany działowe (wewnętrzne, nienośne) murujemy z bloczków betonu komórkowego 12 cm - ich zadaniem jest podział przestrzeni, nie przenoszenie obciążeń. Jak wygląda murowanie ceramiką szlifowaną w praktyce? Zobacz naszą <a href="/realizacje/dom-jednorodzinny-zabrze-gwiazdy-polarnej">budowę domu 200 m² w Zabrzu krok po kroku</a> - dokumentujemy każdy etap ze zdjęciami.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Konstrukcja dachu',
    },
    {
      type: 'list',
      items: [
        '<strong>Dach płaski</strong> (membrana PVC / papa termozgrzewalna) - prostszy, nowoczesny. Stawka: <strong>~900 zł/m²</strong>.',
        '<strong>Dach dwuspadowy</strong> (konstrukcja drewniana + dachówka betonowa) - klasyczny, umiarkowany koszt. Stawka: <strong>~800 zł/m²</strong>.',
        '<strong>Dach wielospadowy</strong> (konstrukcja drewniana z obróbkami) - najdroższy ze względu na złożoność geometrii. Stawka: <strong>~1 000 zł/m²</strong>.',
      ],
    },
    {
      type: 'paragraph',
      content: 'W domach piętrowych lub z poddaszem użytkowym etap SSO obejmuje również <strong>strop monolityczny żelbetowy</strong>. To dodaje ~150–400 zł/m² do kosztu w zależności od rozpiętości.',
    },
    {
      type: 'image',
      src: '/images/blog/stan-surowy-otwarty/sciany-dach.webp',
      alt: 'Murowanie ścian nośnych z pustaków ceramicznych - widok wnętrza budowy domu na etapie stanu surowego otwartego',
      caption: 'Ściany nośne z pustaków ceramicznych na etapie SSO - rusztowanie robocze, widoczna wylewka i nadproża okienne.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Pozostałe elementy SSO',
    },
    {
      type: 'list',
      items: [
        '<strong>Kominy izolowane</strong> - spalinowy + wentylacyjny',
        '<strong>Piana PUR</strong> - ocieplenie dachu od wewnątrz natryskową pianą poliuretanową',
        '<strong>Rynny i rury spustowe PCV</strong>',
        '<strong>Wyłaz strychowy</strong>',
        '<strong>Podbitka dachowa</strong> - wykończenie okapów',
      ],
    },

    // ── SEKCJA 3 - Koszty SSO (kw: cena za m2, koszt, robocizna) ──
    {
      type: 'heading',
      level: 2,
      content: 'Ile kosztuje stan surowy otwarty w 2026 - stawki za m²',
    },
    {
      type: 'paragraph',
      content: 'Poniższe stawki to ceny netto za m² powierzchni użytkowej, obejmujące materiały i robociznę. Aktualne na kwiecień 2026, rejon Śląska.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Komponenty kosztowe stanu zero (fundamenty)',
    },
    {
      type: 'list',
      items: [
        '<strong>Płyta fundamentowa żelbetowa z izolacją:</strong> ~1 000 zł/m²',
        '<strong>Ławy fundamentowe z izolacją:</strong> ~750 zł/m²',
        '<strong>Piwnica pod częścią domu:</strong> dodaje ~250 zł/m²',
        '<strong>Piwnica pod całym domem:</strong> dodaje ~500 zł/m²',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'Komponenty kosztowe stanu surowego otwartego',
    },
    {
      type: 'list',
      items: [
        '<strong>Ściany:</strong> beton komórkowy ~900 zł/m² | ceramika ~1 100 zł/m² | silikat ~1 300 zł/m²',
        '<strong>Dach:</strong> płaski ~900 zł/m² | dwuspadowy ~800 zł/m² | wielospadowy ~1 000 zł/m²',
        '<strong>Kondygnacja:</strong> parterowy ~800 zł/m² | z poddaszem ~950 zł/m² | piętrowy ~1 200 zł/m²',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'Przykład: dom parterowy 120 m², silikat, dach płaski, płyta fundamentowa',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Stan zero:</strong> (1 000 + 500) × 120 m² = <strong>169 000–191 000 zł</strong> (±6%)<br><strong>SSO:</strong> (1 300 + 900 + 800) × 120 m² = <strong>338 000–382 000 zł</strong> (±6%)<br><br><strong>Razem SSO netto: ~510 000–570 000 zł</strong><br><strong>Razem SSO brutto (8% VAT): ~551 000–616 000 zł</strong><br><strong>Stawka za m²: ~4 250–4 750 zł netto</strong><br><br><em>Stawki obejmują materiały, robociznę, kierownika budowy i nadzór inżynierski.</em>',
    },
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz koszt SSO dla Twojego domu',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ile kosztuje SSO domu 100 m²?',
    },
    {
      type: 'paragraph',
      content: 'Dla domu <strong>100 m²</strong> parterowego z bloczków silikatowych, dachem płaskim i płytą fundamentową, koszt SSO wynosi orientacyjnie <strong>425 000–475 000 zł netto</strong> (ok. 459 000–513 000 zł brutto). Przy tańszej technologii (beton komórkowy, ławy, dach dwuspadowy) koszt spada do ok. <strong>355 000–400 000 zł netto</strong>.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ile kosztuje SSO domu 150 m²?',
    },
    {
      type: 'paragraph',
      content: 'Dla domu <strong>150 m²</strong> parterowego (silikat, dach płaski, płyta fundamentowa) koszt SSO to ok. <strong>640 000–710 000 zł netto</strong> (690 000–767 000 zł brutto). Wariant ekonomiczny (beton komórkowy, ławy, dach dwuspadowy) obniża koszt do ok. <strong>530 000–600 000 zł netto</strong>. Przy większych metrażach stawka za m² nieznacznie spada dzięki rozłożeniu kosztów stałych (geodeta, kierownik budowy, mobilizacja sprzętu).',
    },

    // ── SEKCJA 4 - SSO vs SSZ (kw: a zamknięty, różnica) ──────
    {
      type: 'heading',
      level: 2,
      content: 'SSO a stan surowy zamknięty - czym się różnią?',
    },
    {
      type: 'paragraph',
      content: 'Stan surowy zamknięty (SSZ) to SSO <strong>plus</strong> stolarka okienna i drzwiowa, instalacje elektryczne i wod-kan, parapety. Zamyka budynek - chroni go przed deszczem i włamaniami.',
    },
    {
      type: 'paragraph',
      content: '<strong>Uwaga:</strong> polskie prawo budowlane nie definiuje pojęć „stan surowy otwarty" ani „stan surowy zamknięty". To terminy zwyczajowe - dlatego <strong>zawsze żądaj szczegółowej listy prac w umowie</strong>, a nie samego określenia „SSO" czy „SSZ".',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Tabela porównawcza SSO vs SSZ',
    },
    {
      type: 'paragraph',
      content: '<table style="width:100%;border-collapse:collapse;font-size:0.95em;"><thead><tr style="background:#1a1a1a;color:#fff;"><th style="padding:10px 12px;text-align:left;border:1px solid #333;">Parametr</th><th style="padding:10px 12px;text-align:center;border:1px solid #333;">SSO</th><th style="padding:10px 12px;text-align:center;border:1px solid #333;">SSZ</th></tr></thead><tbody><tr><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Fundamenty</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr style="background:#fafaf9;"><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Ściany nośne i działowe</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Strop (dom piętrowy)</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr style="background:#fafaf9;"><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Dach (konstrukcja + pokrycie)</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Okna i drzwi zewnętrzne</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#a3a3a3;">—</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr style="background:#fafaf9;"><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Instalacja elektryczna</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#a3a3a3;">—</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Instalacja wod-kan</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#a3a3a3;">—</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr style="background:#fafaf9;"><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Parapety</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#a3a3a3;">—</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Ochrona przed warunkami atmosf.</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#a3a3a3;">—</span></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;"><span style="color:#dfbb68;font-size:1.2em;font-weight:700;">&#9679;</span></td></tr><tr style="background:#fafaf9;"><td style="padding:8px 12px;border:1px solid #e5e5e5;"><strong>Koszt za m² (dom 120 m²)</strong></td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;">4 250–4 750 zł</td><td style="padding:8px 12px;text-align:center;border:1px solid #e5e5e5;">4 750–5 750 zł</td></tr></tbody></table>',
    },
    {
      type: 'paragraph',
      content: 'Dla domu 120 m² bez garażu różnica między SSO a SSZ wynosi ok. <strong>56 000–64 000 zł netto</strong>. To koszt okien trzyszybowych (Oknoplast / Eko-Okna), drzwi antywłamaniowych Gerda, kompletnej instalacji elektrycznej i wod-kan. Z garażem jednostanowiskowym dopłata rośnie do ~750 zł/m², z dwustanowiskowym - do ~1 000 zł/m².',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Cztery standardy budowy domu:</strong><br>1. <strong>Stan surowy otwarty (SSO)</strong> - fundamenty + ściany + dach<br>2. <strong>Stan surowy zamknięty (SSZ)</strong> - SSO + okna, drzwi, instalacje<br>3. <strong>Stan deweloperski</strong> - SSZ + ogrzewanie, tynki, wylewki, elewacja<br>4. <strong>Pod klucz</strong> - deweloperski + podłogi, glazura, malowanie, biały montaż',
    },

    // ── SEKCJA 5 - Ile procent budowy (kw: ile to procent) ──────
    {
      type: 'heading',
      level: 2,
      content: 'Stan surowy otwarty - ile to procent całej budowy?',
    },
    {
      type: 'paragraph',
      content: 'SSO pochłania <strong>65–70% samego budżetu budowy pod klucz</strong> (bez kosztu działki i projektu architektonicznego). To zdecydowanie najdroższa faza - fundamenty, ściany i dach stanowią trzon konstrukcyjny domu. Pozostałe etapy (SSZ, deweloperski, wykończenie) to łącznie 30–35%.',
    },
    {
      type: 'paragraph',
      content: 'Dla przykładowego domu 120 m² pod klucz (ok. 800 000–900 000 zł brutto), sam SSO kosztuje 551 000–616 000 zł brutto, czyli ok. <strong>68–69%</strong>.',
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Uwaga na porównania z innymi źródłami.</strong> Niektóre portale podają, że SSO to „30–35% inwestycji" - ale liczą procent od <strong>całkowitego kosztu inwestycji, łącznie z działką, projektem i zagospodarowaniem terenu</strong>. My podajemy procent od samego kosztu budowy - to bardziej przydatna informacja przy planowaniu etapowego finansowania.',
    },

    // ── SEKCJA 6 - Czas realizacji ──────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Ile trwa budowa do stanu surowego otwartego?',
    },
    {
      type: 'list',
      items: [
        '<strong>Stan zero (fundamenty):</strong> 2–4 tygodnie (+ min. 7 dni przerwy technologicznej na wiązanie betonu)',
        '<strong>Ściany nośne i działowe:</strong> 3–5 tygodni',
        '<strong>Strop (dom piętrowy):</strong> 1–2 tygodnie (+ 21–28 dni dojrzewania betonu przed obciążeniem)',
        '<strong>Dach:</strong> 3–6 tygodni (płaski szybciej, wielospadowy dłużej)',
        '<strong>Razem SSO:</strong> ok. <strong>3–5 miesięcy</strong> (z przerwami technologicznymi)',
      ],
    },
    {
      type: 'paragraph',
      content: '<strong>Przerwy technologiczne</strong> to czas niezbędny do osiągnięcia przez beton wymaganej wytrzymałości. Fundament potrzebuje min. 7 dni przed rozpoczęciem murowania, strop monolityczny - 21–28 dni przed pełnym obciążeniem. Tych przerw nie da się pominąć bez ryzyka uszkodzenia konstrukcji.',
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Optymalny start:</strong> marzec–kwiecień. Fundamenty wymagają temperatury powyżej 5°C. Zaczynając w marcu, masz SSO gotowy przed jesienią i zamknięty budynek (SSZ) przed zimą.',
    },

    // ── SEKCJA 7 - Co dalej po SSO (kw: co dalej) ──────────────
    {
      type: 'heading',
      level: 2,
      content: 'Co dalej po stanie surowym otwartym?',
    },
    {
      type: 'paragraph',
      content: 'Po ukończeniu SSO rekomendujemy <strong>kontynuację do stanu surowego zamkniętego bez przerwy</strong>. Montaż okien i drzwi trwa 1–2 tygodnie i chroni inwestycję wartą kilkaset tysięcy złotych przed zniszczeniem.',
    },
    {
      type: 'paragraph',
      content: 'Jeśli budżet wymaga rozłożenia kosztów, dom w SSO może „przezimować" - ale wiąże się to z realnymi ryzykami:',
    },
    {
      type: 'list',
      items: [
        '<strong>Wykwity solne na murze</strong> - woda wnikająca w pustaki rozpuszcza sole, które po wyschnięciu tworzą białe naloty. Usunięcie wymaga mechanicznego czyszczenia i impregnacji.',
        '<strong>Pleśń i grzyb na drewnie więźby</strong> - wilgoć w niezamkniętym budynku sprzyja rozwojowi grzybów. Drewno KVH jest odporniejsze, ale nie odporne bezwarunkowo.',
        '<strong>Przemarzanie betonu komórkowego</strong> - nasiąknięte bloczki Ytong/Solbet pękają przy wielokrotnym zamarzaniu i rozmarzaniu. Beton komórkowy wymaga <strong>szczególnej ochrony</strong> - okrycia folią lub wstępnej impregnacji.',
        '<strong>Korozja odsłoniętego zbrojenia</strong> - niedokończone elementy żelbetowe (wieńce, nadproża) z odsłoniętymi prętami rdzewieją.',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Z naszej praktyki:</strong> dom przezimowany w SSO bez zabezpieczeń traci na wartości ok. 10 000–20 000 zł (koszty napraw + opóźnienia). Jeśli planujesz przerwę zimową, budżetuj min. 3 000–5 000 zł na zabezpieczenie otworów folią budowlaną i impregnację drewna. Budujesz z własną ekipą? Rozważ <a href="/oferta/nadzor-i-doradztwo">nadzór inżynierski</a> - kontrolujemy jakość na każdym etapie.',
    },

    // ── CTA ──────────────────────────────────────────────────────
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz koszt budowy domu',
    },
    {
      type: 'cta',
      ctaHref: '/oferta/kompleksowa-budowa-domow',
      ctaIcon: 'hardHat',
      ctaLabel: 'Kompleksowa budowa domów',
    },

    // ── FAQ (z DataForSEO PAA) ──────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Najczęściej zadawane pytania',
    },
    {
      type: 'faq',
      faqItems: [
        {
          question: 'Co to jest stan surowy otwarty domu?',
          answer: 'Stan surowy otwarty (SSO) to etap budowy, w którym dom ma gotowe fundamenty, ściany nośne i działowe, strop oraz pokrycie dachu, ale <strong>nie posiada okien, drzwi ani instalacji wewnętrznych</strong>. Budynek jest „otwarty" na warunki atmosferyczne - stąd nazwa.',
        },
        {
          question: 'Stan surowy otwarty - co zawiera?',
          answer: 'SSO obejmuje: fundamenty (płyta lub ławy), kanalizację podposadzkową, ściany nośne i działowe, strop (w domach piętrowych), konstrukcję i pokrycie dachu, kominy, ocieplenie dachu pianą PUR, rynny i podbitkę. <strong>Nie zawiera</strong> okien, drzwi, instalacji elektrycznej i wod-kan - to zakres stanu surowego zamkniętego.',
        },
        {
          question: 'Ile kosztuje stan surowy otwarty za m² w 2026?',
          answer: 'Koszt SSO na Śląsku w 2026 roku wynosi <strong>3 550–4 750 zł netto za m²</strong> powierzchni użytkowej, zależnie od technologii ściennej, typu dachu i fundamentu. Najtaniej: beton komórkowy + ławy + dach dwuspadowy (~3 550 zł/m²). Najdrożej: silikat + płyta fundamentowa + dach wielospadowy (~4 750 zł/m²). Sprawdź dokładną wycenę w naszym <a href="/wycena">kalkulatorze</a>.',
        },
        {
          question: 'Ile kosztuje stan surowy otwarty domu 100 m²?',
          answer: 'Dla domu 100 m² parterowego ze ścianami z bloczków silikatowych, dachem płaskim i płytą fundamentową, koszt SSO wynosi ok. <strong>425 000–475 000 zł netto</strong> (459 000–513 000 zł brutto z 8% VAT). Przy tańszej technologii (beton komórkowy, ławy, dach dwuspadowy) koszt spada do ok. 355 000–400 000 zł netto.',
        },
        {
          question: 'Czym się różni stan surowy otwarty od zamkniętego?',
          answer: 'Stan surowy zamknięty (SSZ) to SSO plus okna trzyszybowe, drzwi zewnętrzne antywłamaniowe, instalacja elektryczna i wod-kan, parapety. SSZ „zamyka" budynek - chroni przed deszczem i włamaniami. Różnica w cenie: <strong>500–1 000 zł/m²</strong> w zależności od standardu stolarki i garażu.',
        },
        {
          question: 'Stan surowy otwarty - ile to procent budowy?',
          answer: 'SSO pochłania ok. <strong>65–70% budżetu samej budowy pod klucz</strong> (bez kosztu działki i projektu). To najdroższa faza - fundamenty, ściany i dach stanowią trzon konstrukcyjny domu. Jeśli doliczysz koszt działki, udział SSO w całej inwestycji spada do ok. 30–40%.',
        },
      ],
    },

    // ── PODSUMOWANIE ─────────────────────────────────────────────
    {
      type: 'quote',
      content: 'Stan surowy otwarty to moment, w którym dom przestaje być rysunkiem i staje się budynkiem. Na tym etapie nie warto oszczędzać na materiałach i nadzorze - jakość fundamentów i ścian decyduje o trwałości domu na kolejne dekady.',
      caption: 'Zespół inżynierów CoreLTB Builders',
    },
  ],

  // =============================================================================
  // ARTYKUŁ 2: Kosztorys budowy domu 2026 - aktualny cennik na Śląsku
  // Keywords: kosztorys budowy domu 2025 (4400), kosztorys budowy domu (1900),
  //   kosztorys budowy domu 100m2 (1300), 120m2 (590), kalkulator (880),
  //   etapy budowy domu kosztorys (170)
  // Information Gain: konkretne stawki komponentowe za m², porównanie technologii,
  //   kalkulator interaktywny, specyfika Śląska (tereny górnicze)
  // =============================================================================
  'kosztorys-budowy-domu-2026': [

    // ── INTRO ──────────────────────────────────────────────────
    {
      type: 'paragraph',
      content: '<strong>Ile kosztuje budowa domu w 2026 roku?</strong> Odpowiedź zależy od dziesiątek zmiennych - powierzchni, technologii ściennej, typu dachu, fundamentu i standardu wykończenia. W tym artykule rozbijamy koszty budowy na poszczególne etapy, podajemy <strong>realne stawki za m²</strong> aktualne na Śląsku i pokazujemy, jak samodzielnie oszacować budżet. Bez „widełek od–do" - z konkretnymi liczbami.',
    },

    // ── SEKCJA 1 - Etapy budowy z kosztami ──────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Etapy budowy domu - kosztorys krok po kroku',
    },
    {
      type: 'paragraph',
      content: 'Budowę domu dzielimy na 5 etapów. Każdy kolejny zawiera poprzedni - „stan deweloperski" oznacza wykonanie etapów 1–4. Poniżej podajemy stawki netto za m² powierzchni użytkowej (materiały + robocizna), aktualne na kwiecień 2026 r.',
    },
    {
      type: 'heading',
      level: 3,
      content: '1. Stan zero - fundamenty (15–20% budżetu)',
    },
    {
      type: 'list',
      items: [
        '<strong>Płyta fundamentowa żelbetowa z izolacją:</strong> ~1 000 zł/m²',
        '<strong>Ławy fundamentowe z izolacją:</strong> ~750 zł/m²',
        '<strong>Piwnica (częściowa):</strong> dodaje ~250 zł/m²',
        '<strong>Piwnica (cała):</strong> dodaje ~500 zł/m²',
      ],
    },
    {
      type: 'paragraph',
      content: 'Obejmuje: nadzór kierownika budowy, geodetę, geotechnika, fundament, kanalizację podposadzkową, hydroizolację i podsypkę żwirową.',
    },
    {
      type: 'heading',
      level: 3,
      content: '2. Stan surowy otwarty (SSO) - ściany i dach (35–45%)',
    },
    {
      type: 'list',
      items: [
        '<strong>Ściany:</strong> beton komórkowy ~900 zł/m² | ceramika ~1 100 zł/m² | silikat ~1 300 zł/m²',
        '<strong>Dach:</strong> płaski ~900 zł/m² | dwuspadowy ~800 zł/m² | wielospadowy ~1 000 zł/m²',
        '<strong>Kondygnacja:</strong> parterowy ~800 zł/m² | z poddaszem ~950 zł/m² | piętrowy ~1 200 zł/m²',
      ],
    },
    {
      type: 'paragraph',
      content: 'Obejmuje: ściany nośne i działowe, strop (dom piętrowy), konstrukcję i pokrycie dachu, kominy, ocieplenie dachu pianą PUR, rynny, podbitkę. Szczegóły: <a href="/baza-wiedzy/stan-surowy-otwarty-poradnik">Stan surowy otwarty - co zawiera?</a>',
    },
    {
      type: 'heading',
      level: 3,
      content: '3. Stan surowy zamknięty (SSZ) - okna, drzwi, instalacje (8–12%)',
    },
    {
      type: 'list',
      items: [
        '<strong>Bez garażu:</strong> ~500 zł/m² (okna PCV trzyszybowe, drzwi antywłamaniowe Gerda, elektr., wod-kan, parapety)',
        '<strong>Z garażem jednostanowiskowym:</strong> ~750 zł/m²',
        '<strong>Z garażem dwustanowiskowym:</strong> ~1 000 zł/m²',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: '4. Stan deweloperski - ogrzewanie, tynki, elewacja (10–15%)',
    },
    {
      type: 'list',
      items: [
        '<strong>Ogrzewanie gazowe</strong> (kocioł kondensacyjny + podłogówka): ~700 zł/m²',
        '<strong>Pompa ciepła</strong> (powietrze-woda + podłogówka): ~900 zł/m²',
        '<strong>Pelet</strong> (kocioł z podajnikiem + podłogówka): ~800 zł/m²',
      ],
    },
    {
      type: 'paragraph',
      content: 'Obejmuje: wentylację, system grzewczy, tynki gipsowe maszynowe, wylewki, sufity GK, ocieplenie elewacji styropianem EPS, tynk silikatowy zewnętrzny.',
    },
    {
      type: 'heading',
      level: 3,
      content: '5. Pod klucz - wykończenie wnętrz (10–12%)',
    },
    {
      type: 'list',
      items: [
        '<strong>Wykończenie:</strong> ~850 zł/m² (podłogi panele/gres, glazura łazienki, malowanie 2 warstwy, biały montaż, drzwi wewnętrzne z ościeżnicą)',
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Wszystkie stawki powyżej to ceny netto za m²,</strong> obejmujące materiały i robociznę. Do ceny netto dolicza się <strong>8% VAT</strong> (stawka na budowę domów mieszkalnych do 300 m²). Podane zakresy uwzględniają ±6% tolerancji na zmienność cen materiałów.',
    },

    // ── SEKCJA 2 - Przykładowe kosztorysy ──────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Kosztorys budowy domu 100 m² i 120 m² - przykłady',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Dom 100 m² parterowy - silikat, dach płaski, płyta, gaz',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>1. Stan zero:</strong> 141 000–159 000 zł<br><strong>2. SSO (ściany + dach):</strong> 282 000–318 000 zł<br><strong>3. SSZ (okna, drzwi, instalacje):</strong> 47 000–53 000 zł<br><strong>4. Deweloperski (ogrzewanie, tynki):</strong> 66 000–74 000 zł<br><strong>5. Pod klucz (wykończenie):</strong> 80 000–90 000 zł<br><br><strong>RAZEM netto: ~615 000–695 000 zł</strong><br><strong>RAZEM brutto (8% VAT): ~664 000–751 000 zł</strong><br><strong>Za m² netto: ~6 150–6 950 zł/m²</strong>',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Dom 120 m² parterowy - silikat, dach płaski, płyta, gaz',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>1. Stan zero:</strong> 169 000–191 000 zł<br><strong>2. SSO:</strong> 338 000–382 000 zł<br><strong>3. SSZ:</strong> 56 000–64 000 zł<br><strong>4. Deweloperski:</strong> 79 000–89 000 zł<br><strong>5. Pod klucz:</strong> 96 000–108 000 zł<br><br><strong>RAZEM netto: ~740 000–835 000 zł</strong><br><strong>RAZEM brutto: ~799 000–902 000 zł</strong><br><strong>Za m²: ~6 170–6 960 zł/m²</strong><br><strong>Czas realizacji: ~12–16 miesięcy</strong>',
    },
    {
      type: 'paragraph',
      content: 'Ceny obejmują materiały, robociznę, kierownika budowy i nadzór inżynierski. <strong>Nie obejmują:</strong> projektu budowlanego, przyłączy mediów, ogrodzenia, zagospodarowania terenu. Chcesz zobaczyć, jak wygląda realizacja takiego budżetu w praktyce? Zobacz naszą <a href="/realizacje/dom-jednorodzinny-zabrze-gwiazdy-polarnej">budowę domu 200 m² w Zabrzu</a> - dokumentujemy koszty i technologie na każdym etapie.',
    },
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz dokładny koszt dla swojego domu',
    },

    // ── SEKCJA 3 - Co wpływa na cenę ──────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Co wpływa na koszt budowy domu?',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Powierzchnia - efekt skali',
    },
    {
      type: 'paragraph',
      content: 'Większy dom kosztuje więcej w sumie, ale <strong>mniej za m²</strong>. Koszty stałe (kierownik budowy, geodeta, przyłącza, transport) rozkładają się na większą powierzchnię. Dom 80 m² może kosztować 7 200 zł/m², a dom 200 m² - 5 800 zł/m².',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Technologia ścienna - porównanie',
    },
    {
      type: 'paragraph',
      content: 'Różnica między betonem komórkowym a silikatem to <strong>~400 zł/m²</strong>, czyli <strong>~48 000 zł</strong> dla domu 120 m². Silikat daje lepszą akustykę (ważne w gęstej zabudowie), lepszą akumulację ciepła i wyższą wartość nieruchomości. W CoreLTB silikat jest naszym standardem.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Lokalizacja i grunt - specyfika Śląska',
    },
    {
      type: 'paragraph',
      content: 'Na <strong>terenach górniczych</strong> (Katowice, Zabrze, Bytom, Jastrzębie-Zdrój, Rybnik) fundament wymaga płyty żelbetowej ze stalą B500SP i warstwą poślizgową - to <strong>dodatkowe 15–25%</strong> kosztów stanu zero. Nie każda firma ma doświadczenie w budowie na szkodach górniczych III–IV kategorii. Więcej: <a href="/baza-wiedzy/plyta-fundamentowa-tereny-gornicze">Płyta fundamentowa na terenach górniczych</a>.',
    },

    // ── SEKCJA 4 - Ukryte koszty ──────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Ukryte koszty budowy domu - o czym zapominają kosztorysy',
    },
    {
      type: 'list',
      items: [
        '<strong>Projekt budowlany z adaptacją:</strong> 8 000–25 000 zł',
        '<strong>Przyłącza mediów (woda, kanalizacja, prąd, gaz):</strong> 10 000–30 000 zł',
        '<strong>Badania geotechniczne:</strong> 1 500–3 000 zł',
        '<strong>Pozwolenie na budowę i formalności:</strong> 500–2 000 zł',
        '<strong>Zagospodarowanie terenu (podjazd, chodniki, ogrodzenie):</strong> 15 000–50 000 zł',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Budżetuj z buforem 10–15%.</strong> Nawet przy stałej cenie w umowie z generalnym wykonawcą, koszty „okołobudowlane" mogą zaskoczyć. Przyłącza, zagospodarowanie terenu, meble - to osobne pozycje, które potrafią dodać 50 000–100 000 zł do budżetu.',
    },

    // ── SEKCJA 5 - WT 2026 wpływ ──────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Jak nowe WT 2026 wpłyną na koszty budowy?',
    },
    {
      type: 'paragraph',
      content: 'Od <strong>20 września 2026</strong> wchodzą nowe Warunki Techniczne z zaostrzonym wskaźnikiem EP (~55 kWh/m²·rok) i współczynnikiem U ścian (~0,17). Branża szacuje wzrost kosztów o <strong>10–15%</strong> - grubsza izolacja, lepsza stolarka, rekuperacja. Szczegóły: <a href="/baza-wiedzy/dom-energooszczedny-slask">Dom energooszczędny - przewodnik 2026</a>.',
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Kluczowa data: 20 września 2026.</strong> Liczy się data złożenia kompletnego wniosku o pozwolenie na budowę. Przed tą datą = budujesz po obecnych przepisach. Po niej = nowe, droższe wymagania.',
    },

    // ── CTA ──────────────────────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Nie zgaduj - oblicz',
    },
    {
      type: 'paragraph',
      content: 'Nasz <a href="/wycena">kalkulator wyceny</a> uwzględnia wszystkie zmienne: powierzchnię, technologię, typ dachu, fundament, ogrzewanie i standard wykończenia. W kilka minut otrzymasz wycenę z podziałem na etapy i szczegółowym zakresem prac.',
    },
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz koszt budowy domu',
    },
    {
      type: 'cta',
      ctaHref: '/umow-konsultacje',
      ctaIcon: 'phone',
      ctaLabel: 'Umów konsultację z inżynierem',
    },

    // ── FAQ (z DataForSEO PAA) ──────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Najczęściej zadawane pytania',
    },
    {
      type: 'faq',
      faqItems: [
        {
          question: 'Ile kosztuje budowa domu 100 m² w 2026 roku?',
          answer: 'Dom 100 m² pod klucz na Śląsku kosztuje orientacyjnie <strong>664 000–751 000 zł brutto</strong> (z 8% VAT) przy technologii silikatowej, dachu płaskim i ogrzewaniu gazowym. Sam stan surowy otwarty to ok. 459 000–513 000 zł brutto. Dokładną wycenę sprawdzisz w <a href="/wycena">kalkulatorze</a>.',
        },
        {
          question: 'Ile kosztuje budowa domu za m² w 2026?',
          answer: 'Średni koszt pod klucz na Śląsku: <strong>6 150–6 950 zł netto za m²</strong> (ok. 6 640–7 510 zł brutto). SSO to ok. 4 250–4 750 zł/m², deweloperski ~5 200–5 800 zł/m². Stawki zależą od technologii, lokalizacji i gruntu.',
        },
        {
          question: 'Jak zrobić kosztorys budowy domu?',
          answer: 'Kosztorys budowy domu powinien rozbijać koszty na 5 etapów: stan zero, SSO, SSZ, deweloperski i pod klucz. Dla każdego etapu uwzględnij stawki za m² (materiały + robocizna), pomnóż przez powierzchnię i dodaj 8% VAT. Nie zapomnij o kosztach towarzyszących (projekt, przyłącza, zagospodarowanie). Najszybciej - skorzystaj z <a href="/wycena">kalkulatora online</a>.',
        },
        {
          question: 'Ile kosztuje kosztorys budowy domu?',
          answer: 'Profesjonalny kosztorys inwestorski kosztuje <strong>1 500–5 000 zł</strong> w zależności od szczegółowości. W CoreLTB wycenę z podziałem na etapy i zakresem prac przygotowujemy <strong>bezpłatnie</strong> w ramach <a href="/wycena">kalkulatora online</a> - wystarczy podać parametry domu.',
        },
        {
          question: 'Czy ceny materiałów budowlanych rosną w 2026?',
          answer: 'Ceny materiałów w 2026 roku są relatywnie stabilne po korekcie z lat 2023–2024. Główne zmienne: stal zbrojeniowa (wahania ±10%), stolarka okienna (lekki wzrost +5%). Największy wpływ na budżet będą miały <strong>nowe WT 2026 od września</strong>, wymuszające droższą izolację i stolarkę.',
        },
        {
          question: 'Ile kosztuje budowa domu na terenach górniczych?',
          answer: 'Na terenach górniczych Śląska fundament kosztuje <strong>15–25% więcej</strong> (płyta ze stalą B500SP, warstwa poślizgowa). Dla domu 120 m² to dodatkowe 25 000–40 000 zł na etapie stanu zero. Szczegóły: <a href="/baza-wiedzy/plyta-fundamentowa-tereny-gornicze">Płyta fundamentowa na terenach górniczych</a>.',
        },
      ],
    },

    // ── PODSUMOWANIE ─────────────────────────────────────────────
    {
      type: 'quote',
      content: 'Kosztorys budowy domu to nie jednorazowy dokument - to plan, który weryfikujesz na każdym etapie. Najlepsza ochrona przed niespodziankami? Stała cena w umowie z generalnym wykonawcą i bufor 10–15% na koszty towarzyszące.',
      caption: 'Michał Krawczyk, Inżynier Konstrukcji CoreLTB Builders',
    },
  ],

  // =============================================================================
  // ARTYKUŁ 3: Ile kosztuje kierownik budowy w 2026?
  // Keywords: kierownik budowy (5400), ile kosztuje kierownik budowy (1000),
  //   ile zarabia kierownik budowy (1300), ile bierze kierownik budowy (320),
  //   ile kosztuje KB domu jednorodzinnego (320), co robi kierownik budowy (260),
  //   za co odpowiada kierownik budowy (210), zakres obowiązków (170)
  // Information Gain: stawki regionalne (Śląsk), model GW (wliczone w cenę),
  //   porównanie z inspektorem nadzoru, prawo budowlane art. 22
  // =============================================================================
  'ile-kosztuje-kierownik-budowy': [

    // ── INTRO ──────────────────────────────────────────────────
    {
      type: 'paragraph',
      content: '<strong>Kierownik budowy</strong> to jedyna funkcja na budowie, która jest <strong>obowiązkowa z mocy prawa</strong> - bez niego nie możesz rozpocząć budowy domu, prowadzić robót ani odebrać budynku do użytkowania. W tym artykule podajemy aktualne stawki na Śląsku, wyjaśniamy obowiązki kierownika i pokazujemy, czym różni się od inspektora nadzoru inwestorskiego.',
    },

    // ── SEKCJA 1 - Kim jest kierownik budowy ────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Kim jest kierownik budowy i dlaczego jest obowiązkowy?',
    },
    {
      type: 'paragraph',
      content: 'Kierownik budowy to osoba z <strong>uprawnieniami budowlanymi do kierowania robotami</strong>, wpisana do izby inżynierów budownictwa (PIIB). Zgodnie z art. 42 ust. 1 Prawa budowlanego, inwestor jest zobowiązany zapewnić kierownictwo budowy przez osobę z odpowiednimi uprawnieniami.',
    },
    {
      type: 'paragraph',
      content: 'To on podpisuje się pod każdym wpisem w dzienniku budowy i ponosi odpowiedzialność prawną za zgodność robót z projektem, sztuką budowlaną i przepisami BHP. W praktyce - to „strażnik" całego procesu.',
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Bez kierownika budowy nie możesz:</strong> rozpocząć budowy (zgłoszenie w PINB wymaga jego oświadczenia), prowadzić prac na placu (brak nadzoru = wykroczenie), odebrać budynku do użytkowania. To wymóg prawny, nie opcja.',
    },

    // ── SEKCJA 2 - Obowiązki (kw: co robi, za co odpowiada) ────
    {
      type: 'heading',
      level: 2,
      content: 'Co robi kierownik budowy - zakres obowiązków',
    },
    {
      type: 'paragraph',
      content: 'Obowiązki reguluje art. 22 Prawa budowlanego. W praktyce oznacza to:',
    },
    {
      type: 'list',
      items: [
        '<strong>Protokolarne przejęcie placu budowy</strong> i zabezpieczenie terenu',
        '<strong>Prowadzenie dziennika budowy</strong> - dokumentacja przebiegu robót, wpisy o odbiorach',
        '<strong>Geodezyjne wytyczenie obiektu</strong> i organizacja inwentaryzacji powykonawczej',
        '<strong>Nadzór nad zgodnością robót z projektem</strong> i przepisami techniczno-budowlanymi',
        '<strong>Kontrola jakości materiałów</strong> - weryfikacja certyfikatów, atestów, deklaracji',
        '<strong>Odbiory robót zanikających</strong> - zbrojenie przed betonowaniem, hydroizolacja przed zasypaniem',
        '<strong>Plan BIOZ</strong> - bezpieczeństwo i ochrona zdrowia na budowie',
        '<strong>Wstrzymanie robót</strong> w przypadku zagrożenia lub rażących odchyleń od projektu',
        '<strong>Zgłoszenie obiektu do odbioru</strong> i uczestnictwo w czynnościach odbiorowych',
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Odbiory robót zanikających - kluczowy moment.</strong> Zbrojenie fundamentów, kanalizacja podposadzkowa, hydroizolacja - to prace, których nie zweryfikujesz po zalaniu betonem. Dobry kierownik jest obecny przy każdym takim momencie i dokumentuje go w dzienniku budowy.',
    },

    // ── SEKCJA 3 - Stawki (kw: ile kosztuje, ile bierze) ────────
    {
      type: 'heading',
      level: 2,
      content: 'Ile kosztuje kierownik budowy w 2026 roku - stawki na Śląsku',
    },
    {
      type: 'list',
      items: [
        '<strong>Ryczałt za całą budowę</strong> (dom jednorodzinny, SSO → pod klucz): <strong>8 000–20 000 zł</strong>',
        '<strong>Stawka miesięczna:</strong> <strong>1 000–2 000 zł/miesiąc</strong>',
        '<strong>Stawka za wizytę:</strong> <strong>300–600 zł/wizyta</strong> (1–2x w tygodniu)',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'Od czego zależy cena kierownika budowy?',
    },
    {
      type: 'list',
      items: [
        '<strong>Zakres budowy</strong> - nadzór nad samym SSO kosztuje mniej niż nadzór nad budową pod klucz',
        '<strong>Częstotliwość wizyt</strong> - 1x/tydzień vs 3x/tydzień to znaczna różnica',
        '<strong>Stopień zaangażowania</strong> - sam formalny nadzór (minimum prawne) vs aktywne zarządzanie budową (koordynacja ekip, zamawianie materiałów)',
        '<strong>Lokalizacja</strong> - Katowice, Gliwice: stawki o 20–30% wyższe niż w mniejszych miejscowościach',
        '<strong>Doświadczenie</strong> - kierownik z 20-letnim stażem i specjalizacją w szkodach górniczych kosztuje więcej niż świeżo uprawiony inżynier',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>W CoreLTB kierownik budowy i inżynier budowy są wliczeni w cenę.</strong> Nie płacisz za nadzór osobno - to integralny element naszej usługi <a href="/oferta/kompleksowa-budowa-domow">kompleksowej budowy domu</a>. Kierownik jest na budowie od wytyczenia fundamentów do odbioru końcowego.',
    },

    // ── SEKCJA 4 - Kierownik vs inspektor nadzoru ────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Kierownik budowy a inspektor nadzoru - czym się różnią?',
    },
    {
      type: 'paragraph',
      content: 'To dwie różne funkcje, często mylone przez inwestorów. Kluczowa różnica: kierownik reprezentuje <strong>wykonawcę</strong>, inspektor - <strong>inwestora</strong>.',
    },
    {
      type: 'list',
      items: [
        '<strong>Kierownik budowy</strong> - obowiązkowy. Zatrudniany przez wykonawcę (lub inwestora przy systemie gospodarczym). Odpowiada za prawidłowe prowadzenie robót, BHP, dziennik budowy.',
        '<strong>Inspektor nadzoru inwestorskiego</strong> - nieobowiązkowy przy domach jednorodzinnych. Zatrudniany przez inwestora. Kontroluje jakość prac wykonawcy, weryfikuje faktury, reprezentuje inwestora. Koszt: <strong>5 000–15 000 zł</strong> za budowę lub <strong>200–500 zł/wizyta</strong>.',
      ],
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Kiedy inspektor jest obowiązkowy?</strong> PINB może nałożyć obowiązek ustanowienia inspektora w decyzji o pozwoleniu na budowę - szczególnie na <strong>terenach górniczych</strong>, przy budynkach wielorodzinnych lub skomplikowanych konstrukcjach.',
    },

    // ── SEKCJA 5 - Jak wybrać ──────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Jak wybrać kierownika budowy - 6 zasad',
    },
    {
      type: 'list',
      items: [
        '<strong>Sprawdź uprawnienia</strong> - aktualne uprawnienia budowlane + wpis do PIIB. Numer uprawnień zweryfikujesz na stronie izby.',
        '<strong>Pytaj o doświadczenie w Twojej technologii</strong> - kierownik od domów drewnianych może nie znać specyfiki silikatów na terenach górniczych.',
        '<strong>Ustal częstotliwość wizyt</strong> - minimum 1x/tydzień, optymalnie 2–3x. Przy betonowaniu fundamentów i stropu - obowiązkowo na miejscu.',
        '<strong>Podpisz umowę</strong> - jasny zakres, częstotliwość wizyt, stawka, odpowiedzialność. Ustna umowa to proszenie się o problemy.',
        '<strong>Sprawdź referencje</strong> - poproś o kontakt do 2–3 poprzednich inwestorów.',
        '<strong>Unikaj „kierowników na papierze"</strong> - tani kierownik podpisujący dziennik raz w miesiącu bez wizytowania placu to formalność. Nie ochroni Cię przed błędami ekipy.',
      ],
    },

    // ── SEKCJA 6 - Model CoreLTB ──────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Jak wygląda nadzór budowlany w CoreLTB?',
    },
    {
      type: 'paragraph',
      content: 'W modelu generalnego wykonawstwa kierownik budowy jest <strong>wliczony w cenę</strong> i obecny od pierwszego do ostatniego dnia. Nasz model:',
    },
    {
      type: 'list',
      items: [
        '<strong>Kierownik Budowy</strong> - uprawnienia budowlane, odpowiedzialność formalno-prawna, dziennik budowy, odbiory robót zanikających',
        '<strong>Inżynier Budowy</strong> - codzienny nadzór techniczny na placu, kontrola jakości materiałów, fotodokumentacja',
        '<strong>Cotygodniowe raporty</strong> - inwestor otrzymuje aktualizacje ze zdjęciami z placu budowy',
        '<strong>Stała cena w umowie</strong> - kierownik pilnuje harmonogramu i budżetu. Przekroczenia to nasz problem, nie inwestora.',
      ],
    },

    // ── CTA ──────────────────────────────────────────────────────
    {
      type: 'cta',
      ctaHref: '/wycena',
      ctaIcon: 'calculator',
      ctaLabel: 'Oblicz koszt budowy z nadzorem',
    },
    {
      type: 'cta',
      ctaHref: '/oferta/nadzor-i-doradztwo',
      ctaIcon: 'shieldCheck',
      ctaLabel: 'Nadzór i doradztwo budowlane',
    },

    // ── FAQ (z DataForSEO PAA) ──────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Najczęściej zadawane pytania',
    },
    {
      type: 'faq',
      faqItems: [
        {
          question: 'Ile kosztuje kierownik budowy domu jednorodzinnego?',
          answer: 'Na Śląsku w 2026 roku: <strong>8 000–20 000 zł za całą budowę</strong> (ryczałt) lub <strong>1 000–2 000 zł miesięcznie</strong>. Cena zależy od zakresu budowy, częstotliwości wizyt i doświadczenia. W CoreLTB kierownik jest <strong>wliczony w cenę</strong> usługi generalnego wykonawstwa.',
        },
        {
          question: 'Czy kierownik budowy jest obowiązkowy?',
          answer: 'Tak. Art. 42 ust. 1 <strong>Prawa budowlanego</strong> wymaga zapewnienia kierownictwa budowy przez osobę z uprawnieniami. Bez kierownika nie rozpoczniesz budowy, nie będziesz prowadzić robót i nie odbierzesz budynku do użytkowania. Brak kierownika to wykroczenie.',
        },
        {
          question: 'Ile bierze kierownik budowy za wizytę?',
          answer: 'Stawka za pojedynczą wizytę na Śląsku wynosi <strong>300–600 zł</strong>. Przy umówionych 1–2 wizytach tygodniowo daje to 1 200–4 800 zł/miesiąc. Ryczałt miesięczny (1 000–2 000 zł) jest zazwyczaj korzystniejszy.',
        },
        {
          question: 'Co robi kierownik budowy?',
          answer: 'Prowadzi dziennik budowy, nadzoruje zgodność robót z projektem, kontroluje materiały, odbiera roboty zanikające (zbrojenie, hydroizolacja), zapewnia BHP na budowie i zgłasza obiekt do odbioru. Pełny zakres obowiązków reguluje <strong>art. 22 Prawa budowlanego</strong>.',
        },
        {
          question: 'Czym różni się kierownik budowy od inspektora nadzoru?',
          answer: 'Kierownik reprezentuje <strong>wykonawcę</strong> - odpowiada za prowadzenie robót. Inspektor nadzoru reprezentuje <strong>inwestora</strong> - kontroluje jakość prac. Kierownik jest obowiązkowy przy każdej budowie. Inspektor - tylko gdy nałoży to PINB lub gdy inwestor chce dodatkowej kontroli.',
        },
        {
          question: 'Jak często kierownik powinien być na budowie?',
          answer: 'Minimum <strong>1 raz w tygodniu</strong>, optymalnie 2–3 razy. Obowiązkowo: przy betonowaniu fundamentów i stropu, odbiorach robót zanikających, montażu konstrukcji dachu. W CoreLTB nasz inżynier budowy jest na placu <strong>codziennie</strong>.',
        },
      ],
    },

    // ── PODSUMOWANIE ─────────────────────────────────────────────
    {
      type: 'quote',
      content: 'Kierownik budowy to nie koszt - to ubezpieczenie. Dobry kierownik wyłapie błędy ekipy, dopilnuje jakości materiałów i zadba, żeby Twój dom stał bezpiecznie przez dekady. Na tym nie warto oszczędzać.',
      caption: 'Michał Krawczyk, Inżynier Konstrukcji CoreLTB Builders',
    },
  ],

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
  // ARTYKUŁ: Dom energooszczędny - kompletny przewodnik budowy 2026
  // =============================================================================
  'dom-energooszczedny-slask': [

    // ── INTRO ──────────────────────────────────────────────────────
    {
      type: 'paragraph',
      content: '<strong>20 września 2026 roku</strong> wchodzą w życie nowe Warunki Techniczne (WT 2026), które zaostrzają wymagania energetyczne dla budynków mieszkalnych. Dla każdego, kto planuje budowę domu, oznacza to jedno: standard energooszczędny przestaje być wyborem - staje się przepisem. W tym przewodniku wyjaśniamy, czym jest dom energooszczędny, co dokładnie zmienią nowe regulacje i ile to kosztuje w praktyce.',
    },

    // ── SEKCJA 1 - Definicja ──────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Czym jest dom energooszczędny?',
    },
    {
      type: 'paragraph',
      content: 'Dom energooszczędny to budynek, który zużywa znacznie mniej energii do ogrzewania, chłodzenia i wentylacji niż standardowa konstrukcja. Kluczowym miernikiem jest <strong>wskaźnik EP</strong> - zapotrzebowanie na nieodnawialną energię pierwotną, wyrażone w kWh/(m²·rok).',
    },
    {
      type: 'paragraph',
      content: 'Według obecnych przepisów (WT 2021) dom jednorodzinny nie może przekraczać <strong>EP = 70 kWh/(m²·rok)</strong>. W praktyce dobrze zaprojektowany dom energooszczędny osiąga <strong>40–55 kWh/(m²·rok)</strong>, co przekłada się na rachunki za ogrzewanie rzędu <strong>2 000–3 000 zł rocznie</strong> dla domu 120 m².',
    },
    {
      type: 'callout',
      variant: 'info',
      content: '<strong>Wskaźnik EP - co oznacza w praktyce?</strong> EP uwzględnia nie tylko energię zużytą w budynku, ale też straty przy jej wytwarzaniu i przesyle. Dlatego pompa ciepła (zasilana prądem z OZE) daje niższy EP niż kocioł gazowy, mimo że oba mogą ogrzewać dom tak samo skutecznie.',
    },

    // ── SEKCJA 2 - Energooszczędny vs pasywny ────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Dom energooszczędny a pasywny - czym się różnią?',
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
      content: 'Dla większości inwestorów <strong>dom energooszczędny</strong> to złoty środek - realne oszczędności bez przesadnych kosztów budowy. Dom pasywny ma sens w skrajnie zimnych lokalizacjach lub gdy inwestor planuje certyfikację (np. pod kredyt „zielony").',
    },

    // ── SEKCJA 3 - WT 2026 (GŁÓWNA OŚ) ──────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'WT 2026 - co się zmienia od 20 września?',
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
        '<strong>Wskaźnik EP</strong> - spodziewane obniżenie z 70 do ok. <strong>55 kWh/(m²·rok)</strong>, co de facto wymusza stosowanie OZE (pompa ciepła, fotowoltaika)',
        '<strong>Współczynnik U ścian zewnętrznych</strong> - obecne 0,20 W/(m²·K) prawdopodobnie spadnie do <strong>0,17 W/(m²·K)</strong>, co oznacza grubszą izolację (min. 20–25 cm styropianu grafitowego lub wełny)',
        '<strong>Standard bezemisyjny</strong> - nowe budynki mają zbliżać się do zerowej emisji, co promuje pompy ciepła i fotowoltaikę jako główne źródła energii',
        '<strong>Automatyka budynkowa</strong> - obowiązkowy monitoring zużycia energii w wybranych typach obiektów',
        '<strong>Bezpieczeństwo pożarowe ETICS</strong> - surowsze wymagania dla systemów ociepleń, wymóg pasów ogniowych z wełny mineralnej',
      ],
    },
    {
      type: 'callout',
      variant: 'warning',
      content: '<strong>Data graniczna: 20 września 2026.</strong> Liczy się data złożenia <strong>kompletnego wniosku o pozwolenie na budowę</strong>, nie data jego wydania. Wniosek złożony 19 września = budujesz po starych WT 2021. Wniosek złożony 21 września = nowe, droższe wymagania WT 2026. Jeśli planujesz budowę - czas na decyzję się kurczy.',
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

    // ── SEKCJA 4 - Wymagania techniczne ──────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Wymagania techniczne domu energooszczędnego',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Izolacja termiczna - ściany, dach, fundament',
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
      content: 'Rekuperacja - wentylacja z odzyskiem ciepła',
    },
    {
      type: 'paragraph',
      content: 'Przy szczelnym budynku wentylacja grawitacyjna nie działa - potrzebna jest <strong>wentylacja mechaniczna z rekuperacją</strong>. Centrala odzyskuje <strong>80–95% ciepła</strong> z powietrza wywiewanego i podgrzewa nim świeże powietrze nawiewane. Efekt: świeże, przefiltrowane powietrze bez otwierania okien i bez strat ciepła.',
    },
    {
      type: 'paragraph',
      content: 'Rekuperacja ma jeszcze jedną, często pomijaną zaletę: <strong>filtracja powietrza</strong>. W regionach o złej jakości powietrza (południe Polski, aglomeracje) filtry F7 lub HEPA w centrali skutecznie zatrzymują pyły PM2.5 i PM10. To nie gadżet - to ochrona zdrowia domowników. Jak wygląda instalacja rekuperacji i pompy ciepła w praktyce? Zobacz naszą <a href="/realizacje/dom-jednorodzinny-zabrze-gwiazdy-polarnej">realizację domu z pompą ciepła i LOXONE w Zabrzu</a> - zdjęcia z każdego etapu.',
    },
    // TODO: OBRAZ - rekuperator
    {
      type: 'image',
      src: '/images/blog/dom-energooszczedny/rekuperacja.webp',
      alt: 'Centrala rekuperacyjna z filtrem - wentylacja mechaniczna z odzyskiem ciepła w domu energooszczędnym',
      caption: 'Rekuperator odzyskuje 80–95% ciepła z powietrza wywiewanego - obowiązkowy element domu energooszczędnego',
    },

    // ── SEKCJA 5 - Materiały ─────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Z czego budować dom energooszczędny?',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ściany - silikat, ceramika, beton komórkowy czy szkielet?',
    },
    {
      type: 'paragraph',
      content: 'Każda z popularnych technologii pozwala osiągnąć standard energooszczędny, ale różnią się one właściwościami użytkowymi:',
    },
    {
      type: 'list',
      items: [
        '<strong>Bloczki silikatowe</strong> (Silka) - nasza preferowana technologia w CoreLTB. Doskonała akumulacja ciepła (mur „magazynuje" ciepło w dzień i oddaje w nocy), wysoka izolacyjność akustyczna, ściana nośna 18 cm + ocieplenie. Idealne do gęstej zabudowy.',
        '<strong>Ceramika</strong> (Porotherm, Leier) - popularna, dobra akumulacja, nieco grubsza ściana. Sprawdzone rozwiązanie w budownictwie jednorodzinnym.',
        '<strong>Beton komórkowy</strong> (Ytong, Solbet) - lekki, łatwy w obróbce, ale niższa akumulacja ciepła. Wymaga starannego wykończenia (podatny na wilgoć).',
        '<strong>Szkielet drewniany</strong> - najszybsza budowa, bardzo dobre parametry U przy mniejszej grubości ściany. Ograniczona akumulacja ciepła, wymaga idealnej paroizolacji.',
      ],
    },
    {
      type: 'heading',
      level: 3,
      content: 'Fundamenty - ława czy płyta?',
    },
    {
      type: 'paragraph',
      content: '<strong>Płyta fundamentowa</strong> z izolacją XPS od spodu eliminuje mostki termiczne w strefie cokołu i ułatwia montaż ogrzewania podłogowego. Na terenach o trudnych warunkach gruntowych (szkody górnicze, gliny, grunty zalewowe) jest jedynym bezpiecznym rozwiązaniem. Szczegółowo opisaliśmy to w artykule: <a href="/baza-wiedzy/plyta-fundamentowa-tereny-gornicze">Płyta fundamentowa na terenach górniczych</a>.',
    },
    {
      type: 'paragraph',
      content: '<strong>Ławy fundamentowe</strong> ze wzmocnioną izolacją cokołu sprawdzają się na stabilnych gruntach. Tańsze o ok. 30–50 zł/m², ale wymagają starannego rozwiązania mostka termicznego na styku ław, ścian i posadzki.',
    },

    // ── SEKCJA 6 - Systemy grzewcze ─────────────────────────────
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
      content: 'To obecnie <strong>dominujące rozwiązanie</strong> w budownictwie energooszczędnym - i jedyne, które realistycznie pozwala spełnić EP ≤ 55 kWh/(m²·rok) bez fotowoltaiki. Współczynnik COP <strong>3,5–4,5</strong> oznacza, że z 1 kWh prądu uzyskujemy 3,5–4,5 kWh ciepła. Roczny koszt ogrzewania domu 120 m²: <strong>2 000–3 000 zł</strong>.',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Fotowoltaika - synergia z pompą ciepła',
    },
    {
      type: 'paragraph',
      content: 'Instalacja <strong>5–8 kWp</strong> (koszt ok. 20 000–30 000 zł po dotacjach) w połączeniu z pompą ciepła pozwala osiągnąć niemal zerowe rachunki za ogrzewanie i ciepłą wodę. WT 2026 nie narzucają obowiązku montażu PV na domach jednorodzinnych, ale obniżony wskaźnik EP sprawia, że fotowoltaika staje się <strong>de facto standardem</strong>.',
    },
    // TODO: OBRAZ - pompa ciepła + PV
    {
      type: 'image',
      src: '/images/blog/dom-energooszczedny/pompa-ciepla-fotowoltaika.webp',
      alt: 'Pompa ciepła powietrze-woda obok domu jednorodzinnego z instalacją fotowoltaiczną na dachu',
      caption: 'Pompa ciepła + fotowoltaika - tandem, który pozwala spełnić wymagania WT 2026 i obniżyć rachunki do minimum',
    },
    {
      type: 'heading',
      level: 3,
      content: 'Ogrzewanie podłogowe niskotemperaturowe',
    },
    {
      type: 'paragraph',
      content: 'Pompa ciepła najefektywniej współpracuje z <strong>ogrzewaniem podłogowym</strong> (temperatura zasilania 30–35°C vs 55–70°C dla grzejników). Podłogówka równomiernie rozprowadza ciepło, eliminuje grzejniki pod oknami i doskonale pasuje do płyty fundamentowej - pętle grzewcze zatapiane są bezpośrednio w wylewce.',
    },

    // ── SEKCJA 7 - Koszty ────────────────────────────────────────
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

    // ── SEKCJA 8 - Dotacje ───────────────────────────────────────
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
        '<strong>Moje Ciepło</strong> - dotacja do <strong>21 000 zł</strong> na pompę ciepła w nowym budynku (warunek: EP ≤ norma WT i świadectwo energetyczne klasy A).',
        '<strong>Mój Prąd</strong> - dofinansowanie instalacji fotowoltaicznej, magazynu energii i systemu zarządzania energią.',
        '<strong>Czyste Powietrze</strong> - obejmuje m.in. rekuperację, stolarkę okienną i pompę ciepła. Kwoty zależą od dochodu.',
        '<strong>Ulga termomodernizacyjna</strong> - odliczenie od podatku do <strong>53 000 zł</strong> na materiały i usługi związane z termomodernizacją (dotyczy istniejących budynków, ale warto znać przy rozbudowie).',
      ],
    },

    // ── SEKCJA 9 - Południe Polski ───────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Budowa na południu Polski - na co uważać',
    },
    {
      type: 'paragraph',
      content: 'Polska południowa (Śląsk, Małopolska, Opolszczyzna) stawia przed inwestorami kilka dodatkowych wyzwań, które wpływają na projektowanie domu energooszczędnego:',
    },
    {
      type: 'list',
      items: [
        '<strong>Strefa klimatyczna III</strong> - obliczeniowa temperatura zewnętrzna <strong>-20°C</strong>. Dłuższe sezony grzewcze niż w zachodniej Polsce. Izolacja musi mieć zapas - projektujemy z U = 0,17 zamiast 0,20.',
        '<strong>Tereny górnicze (Śląsk)</strong> - na działkach objętych szkodami górniczymi jedynym bezpiecznym fundamentem jest <strong>płyta fundamentowa</strong> z izolacją XPS. Płyta jednocześnie eliminuje mostki termiczne, co jest korzystne dla energooszczędności.',
        '<strong>Jakość powietrza</strong> - stężenia PM2.5 i PM10 regularnie przekraczają normy, szczególnie zimą. Rekuperacja z filtracją F7/HEPA staje się nie opcją, a <strong>koniecznością zdrowotną</strong>.',
        '<strong>Grunty</strong> - gliny na Śląsku, grunty zalewowe w dolinach Wisły i Soły (Małopolska), tereny krasowe (Jura). Każdy typ wymaga innego podejścia do fundamentu i hydroizolacji.',
      ],
    },
    {
      type: 'paragraph',
      content: 'Budujemy domy na południu Polski od ponad 15 lat. Znamy lokalne warunki, współpracujemy z geologami i konstruktorami. Jeśli budujesz w <a href="/obszar-dzialania/katowice">Katowicach</a>, <a href="/obszar-dzialania/rybnik">Rybniku</a> czy <a href="/obszar-dzialania/krakow">Krakowie</a> - rozumiemy specyfikę Twojego terenu.',
    },
    {
      type: 'cta',
      ctaHref: '/analiza-dzialki',
      ctaIcon: 'mapPin',
      ctaLabel: 'Zamów analizę działki',
    },
    // TODO: OBRAZ - budowa na południu
    {
      type: 'image',
      src: '/images/blog/dom-energooszczedny/budowa-slask.webp',
      alt: 'Budowa domu jednorodzinnego na Śląsku - izolacja fundamentu płytą XPS na terenie górniczym',
      caption: 'Izolacja płyty fundamentowej XPS-em na budowie w rejonie Śląska - eliminacja mostków termicznych od poziomu gruntu',
    },

    // ── SEKCJA 10 - Projekty ─────────────────────────────────────
    {
      type: 'heading',
      level: 2,
      content: 'Projekty domów energooszczędnych - na co zwrócić uwagę',
    },
    {
      type: 'paragraph',
      content: 'Nie każdy projekt „katalogowy" jest energooszczędny. Przy wyborze zwróć uwagę na:',
    },
    {
      type: 'list',
      items: [
        '<strong>Zwartą bryłę</strong> - im mniej załamań, wykuszy i loggi, tym mniejsza powierzchnia przegród tracących ciepło. Stosunek A/V (powierzchnia zewnętrzna do kubatury) powinien być jak najniższy.',
        '<strong>Orientację budynku</strong> - salon i główne przeszklenia na południe (zyski solarne), pomieszczenia gospodarcze na północ.',
        '<strong>Adaptację do gruntu</strong> - projekt gotowy wymaga adaptacji do warunków na działce (geologia, kategoria terenu, strefy wiatrowe). Dobry projektant adaptujący przeliczy izolację pod konkretną lokalizację.',
      ],
    },
    {
      type: 'paragraph',
      content: 'W naszej <a href="/projekty">bazie projektów</a> znajdziesz ponad 250 domów parterowych i z poddaszem - każdy z kalkulacją kosztów budowy. Potrzebujesz projektu indywidualnego? <a href="/oferta/projektowanie">Zaprojektujemy dom</a> dopasowany do Twojej działki i budżetu.',
    },
    {
      type: 'cta-wide',
      ctaHref: '/projekty',
      caption: 'Baza projektów',
      ctaLabel: 'Znajdź projekt domu energooszczędnego',
      ctaDescription: 'Ponad 250 domów parterowych i z poddaszem - każdy z kalkulacją kosztów budowy.',
      content: 'Przeglądaj projekty',
      src: '/images/blog/dom-energooszczedny/hero.webp',
      alt: 'Nowoczesny dom energooszczędny - projekty domów CoreLTB',
    },

    // ── SEKCJA 11 - Od czego zacząć ─────────────────────────────
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
        '<strong>1. Analiza działki</strong> - sprawdź MPZP, warunki gruntowe i ewentualne obciążenia (szkody górnicze, tereny zalewowe). <a href="/analiza-dzialki">Zamów bezpłatną analizę</a>.',
        '<strong>2. Wybór projektu</strong> - gotowy lub indywidualny, z parametrami spełniającymi WT 2026. <a href="/projekty">Zobacz projekty</a>.',
        '<strong>3. Wycena budowy</strong> - poznaj realne koszty z podziałem na etapy. <a href="/wycena">Użyj kalkulatora</a>.',
        '<strong>4. Wybór wykonawcy</strong> - postaw na generalnego wykonawcę ze stałą ceną w umowie i doświadczeniem w Twoim regionie.',
        '<strong>5. Realizacja</strong> - budowa z profesjonalnym <a href="/oferta/kompleksowa-budowa-domow">nadzorem i kontrolą jakości</a> na każdym etapie.',
      ],
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Pamiętaj o terminie.</strong> Jeśli chcesz budować według WT 2021, kompletny wniosek o pozwolenie na budowę musisz złożyć <strong>przed 20 września 2026</strong>. Po tej dacie - nowe, droższe wymagania.',
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
          answer: 'Każda technologia (silikat, ceramika, beton komórkowy, szkielet drewniany) pozwala osiągnąć standard energooszczędny. Kluczowa jest <strong>grubość i jakość izolacji</strong>, nie sam materiał ściany nośnej. W CoreLTB preferujemy bloczki silikatowe z ociepleniem styropianem grafitowym - łączą doskonałą akumulację ciepła z izolacyjnością akustyczną.',
        },
        {
          question: 'Czym różni się dom energooszczędny od pasywnego?',
          answer: 'Dom energooszczędny ma wskaźnik EP ≤ 70 kWh/(m²·rok), dom pasywny ≤ 15 kWh/(m²·rok). Dom pasywny wymaga ekstremalnej szczelności (n50 ≤ 0,6), izolacji 30–40 cm i okien o U ≤ 0,7. Kosztuje <strong>25–40% więcej</strong> niż standardowy. Dla większości inwestorów dom energooszczędny to optymalny wybór - realne oszczędności bez przesadnych kosztów.',
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
      content: 'Dom energooszczędny to nie fanaberia - od września 2026 to nowy standard. Ale nawet dziś warto budować z zapasem na przyszłe regulacje. Dobrze zaizolowany dom z pompą ciepła i rekuperacją to niższe rachunki, czystsze powietrze w środku i wyższa wartość nieruchomości na lata.',
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
/** Posty widoczne w listingu (bez hidden/draft) */
export const visibleBlogPosts = blogPosts.filter(p => !p.hidden);

export const blogSectionData = {
  breadcrumbs: blogBreadcrumbs,
  title: 'Wiedza, innowacje i',
  titleHighlight: 'nowoczesne budownictwo.',
  description: 'Śledź nasze najnowsze realizacje, dowiedz się więcej o technologiach budowlanych i poznaj specyfikę budowy na terenach górniczych Śląska.',
  categories: blogCategories,
  posts: visibleBlogPosts,
  loadMoreLabel: 'Załaduj więcej wpisów',
};
