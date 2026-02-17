# CLAUDE.md - CoreLTB Builders - Dokumentacja Projektu

**Ostatnia aktualizacja:** 2026-01-20

---

## 🆕 AKTUALIZACJA SESJI (2026-01-20) - Sticky Sidebar + Active Section Tracking + CTA Redesign

### ✅ Naprawa Sticky Sidebar na Stronach Lokalnych

**Problem:** Spis treści i CTA box nie podążały za użytkownikiem przy scrollowaniu. Brak podświetlania aktywnej sekcji w TOC.

**Rozwiązanie:**

1. **Sticky Sidebar** - Dodano `self-start` i poprawny offset `lg:top-[160px]`
2. **Active Section Tracking** - IntersectionObserver podświetla aktywną sekcję w TOC
3. **Scroll Margin** - `scroll-mt-[168px]` dla spójności z sticky headerem (~150px)

### ✅ Redesign CTA Box (Compact & Personalized)

**Zmiana:** Długi, generyczny CTA box → Krótki, spersonalizowany dla miasta

**Stary CTA:**
- Długi tytuł + 4 benefity + 2 buttony + subtext

**Nowy CTA:**
```
┌─────────────────────────────┐
│ Planujesz budowę w {miasto}?│
│                             │
│ Bezpłatna konsultacja i     │
│ wycena. Budujemy lokalnie   │
│ od 15 lat.                  │
│                             │
│ [📞 Zadzwoń] [✉️ Napisz]    │
└─────────────────────────────┘
```

**Interface zmieniony:**
```tsx
// Stary
interface LocalPageSidebarProps {
  sections: TOCItem[];
  ctaBox?: CTABoxData;  // ❌ USUNIĘTY
  ...
}

// Nowy
interface LocalPageSidebarProps {
  sections: TOCItem[];
  cityName: string;     // ✅ NOWY - miasto dla personalizacji
  ...
}
```

**CTA teraz używa `companyData.telephone` dla linku tel:**

### ✅ System Odmian Nazw Miast (Miejscownik)

**Problem:** Polski wymaga odmiany - "w Mikołowie", nie "w Mikołów"

**Rozwiązanie:** Dodane pole `cityNameLocative` (miejscownik) do `LocalPageData`

```typescript
// local-pages.ts
export interface LocalPageData {
  cityName: string;           // "Mikołów" (mianownik)
  cityNameLocative: string;   // "Mikołowie" (miejscownik - "w Mikołowie")
  // ...
}
```

**Aktualne odmiany (7 miast):**

| Miasto | Mianownik | Miejscownik |
|--------|-----------|-------------|
| Rybnik | Rybnik | Rybniku |
| Wodzisław Śląski | Wodzisław Śląski | Wodzisławiu Śląskim |
| Tychy | Tychy | Tychach |
| Katowice | Katowice | Katowicach |
| Jaworzno | Jaworzno | Jaworznie |
| Mikołów | Mikołów | Mikołowie |
| Gliwice | Gliwice | Gliwicach |

**Przy dodawaniu nowego miasta pamiętaj o dodaniu `cityNameLocative`!**

**Zmodyfikowane pliki:**
- `/components/shared/LocalPageSidebar.tsx` - sticky fix + offset
- `/components/sections/LocalPageContentSection.tsx` - active section tracking

### Techniczne Szczegóły

**LocalPageSidebar.tsx:**
```tsx
// Sticky sidebar z offsetem uwzględniającym header (~150px + gap)
<aside className="lg:sticky lg:top-[160px] self-start space-y-6">
```

**LocalPageContentSection.tsx:**
```tsx
// useMemo dla tocItems (optymalizacja)
const tocItems = useMemo(() => [...], [deps]);

// Active section tracking z IntersectionObserver
const [activeSection, setActiveSection] = useState<string>('');
const HEADER_OFFSET = 168;

// Observer z rootMargin uwzględniającym header
rootMargin: `-${HEADER_OFFSET}px 0px -50% 0px`

// Scroll margin na sekcjach
<section id={section.id} className="scroll-mt-[168px]">
```

### Konfiguracja Offsetów (WAŻNE)

| Element | Wartość | Opis |
|---------|---------|------|
| Header sticky | ~150px | Top bar (~40px) + Main nav (~107px) |
| Sidebar top | `160px` | Header + 10px gap |
| Scroll margin | `168px` | Header + 18px gap (lepszy UX) |
| Observer offset | `168px` | Spójne z scroll margin |

**Aby zmienić offset (np. przy zmianie wysokości headera):**
1. `LocalPageSidebar.tsx` → `lg:top-[XXXpx]`
2. `LocalPageContentSection.tsx` → `HEADER_OFFSET = XXX`
3. `LocalPageContentSection.tsx` → `scroll-mt-[XXXpx]`

---

## 🆕 AKTUALIZACJA SESJI (2026-01-19) - Redesign Stron Lokalnych (Blog-Style)

### ✅ Nowy Layout Stron Lokalnych `/obszar-dzialania/[slug]`

**Cel:** Przekształcenie stron lokalnych na design podobny do strony pojedynczego wpisu blogowego z 2-kolumnowym layoutem i sticky sidebar.

**Nowe pliki:**
- `/components/sections/LocalPageContentSection.tsx` - Główna sekcja 2-kolumnowa (organizm)
- `/components/shared/LocalPageSidebar.tsx` - Sticky sidebar z TOC + CTA Box (molekuła)

**Zmodyfikowane pliki:**
- `/app/obszar-dzialania/[slug]/page.tsx` - Nowy layout z funkcją konwertującą dane
- `/components/sections/index.ts` - Eksport LocalPageContentSection
- `/components/shared/index.ts` - Eksport LocalPageSidebar

### Architektura Nowego Layoutu

```
┌────────────────────────────────────────────────────────────┐
│  PageHeader (hero + breadcrumbs)    ← BEZ ZMIAN            │
├────────────────────────────────────────────────────────────┤
│  BEŻOWE TŁO (#efebe7)                                      │
│  ┌────────────────────────────────┐ ┌──────────────────┐   │
│  │  BIAŁY BOX (TREŚĆ)             │ │  SIDEBAR (320px) │   │
│  │                                │ │  (sticky)        │   │
│  │  H1: Budowa Domów {miasto}     │ │                  │   │
│  │  ════════════════════          │ │ ┌──────────────┐ │   │
│  │                                │ │ │ SPIS TREŚCI  │ │   │
│  │  ## Sekcja 1                   │ │ │  • Sekcja 1  │ │   │
│  │  ────────────────              │ │ │  • Sekcja 2  │ │   │
│  │  ContentBlocks...              │ │ │  • Dzielnice │ │   │
│  │                                │ │ │  • FAQ       │ │   │
│  │  ## Sekcja 2                   │ │ └──────────────┘ │   │
│  │  ────────────────              │ │                  │   │
│  │  ContentBlocks...              │ │ ┌──────────────┐ │   │
│  │                                │ │ │ CTA BOX      │ │   │
│  │  ## Dzielnice                  │ │ │ (złoty)      │ │   │
│  │  ────────────────              │ │ │ ✓ Benefit 1  │ │   │
│  │  [Grid dzielnic]               │ │ │ ✓ Benefit 2  │ │   │
│  │                                │ │ │ [Zadzwoń]    │ │   │
│  │  ## FAQ                        │ │ └──────────────┘ │   │
│  │  ────────────────              │ │                  │   │
│  │  [Accordion]                   │ └──────────────────┘   │
│  └────────────────────────────────┘                        │
├────────────────────────────────────────────────────────────┤
│  ContactCTASection    ← BEZ ZMIAN                          │
└────────────────────────────────────────────────────────────┘
```

### Złote Kreski Pod Nagłówkami (KONFIGUROWALNE)

**Można zmienić/wyłączyć** w `/components/sections/LocalPageContentSection.tsx`:

```tsx
// H1 - większa kreska (linia ~348)
<span className="block w-20 h-1.5 bg-primary mt-4 mb-2 rounded-full" />

// H2 - mniejsza kreska (linie ~351, ~191, ~265)
<span className="block w-16 h-1 bg-primary mt-3 rounded-full" />
```

**Aby wyłączyć:** Usuń lub zakomentuj linie ze `<span className="block w-... bg-primary..." />`

**Aby zmienić rozmiar:**
- `w-16` → `w-20`, `w-24` (szerokość)
- `h-1` → `h-0.5`, `h-1.5` (grubość)
- `mt-3` → `mt-2`, `mt-4` (odstęp od góry)

### Konwersja Danych (Automatyczna)

Funkcja `convertToLocalPageContent()` w `page.tsx` automatycznie konwertuje istniejące dane z `local-pages.ts` do nowego formatu. **Nie trzeba przepisywać danych 7 miast.**

Konwertuje:
- `emotionalHero.subtitle` → sekcja "Wprowadzenie" z callout
- `buildingStages.items` → sekcja z H3 i ContentBlocks
- `localSpecifics.items` → sekcja z H3 i ContentBlocks
- `energyEfficiency/formalities` → opcjonalne sekcje
- `whyUs.points` → sekcja "Dlaczego My"
- `districts.hub.cities` → grid dzielnic
- `faq.items` → accordion FAQ
- `**bold**` markdown → `<strong>` HTML

### Responsywność

| Viewport | Layout |
|----------|--------|
| Mobile (<1024px) | 1 kolumna, sidebar pod treścią |
| Desktop (>=1024px) | 2 kolumny, sidebar sticky |

### Opcja Cofnięcia

Jeśli nowy design nie pasuje, wystarczy przywrócić poprzednią wersję `page.tsx` z git:
```bash
git checkout HEAD~1 -- app/obszar-dzialania/[slug]/page.tsx
```

**Build:** ✅ 42 strony SSG wygenerowane poprawnie

---

## 🆕 AKTUALIZACJA SESJI (2026-01-19) - Sekcja Projekty z Filtrowaniem

### ✅ Nowa Strona Listingowa Projektów `/projekty`

**Cel:** Stworzenie pełnej strony katalogowej projektów z filtrowaniem, sortowaniem i responsywnym designem.

**Nowe pliki:**
- `/app/projekty/page.tsx` - Strona listingowa (SSG)
- `/components/sections/ProjectsListingSection.tsx` - Główna sekcja (organizm)
- `/components/shared/ProjectListingCard.tsx` - Karta projektu (molekuła)
- `/components/shared/ProjectFilterSidebar.tsx` - Sidebar z filtrami (molekuła)
- `/components/shared/MobileFilterDrawer.tsx` - Drawer filtrów na mobile

**Zmodyfikowane pliki:**
- `/data/projects.ts` - Rozszerzony interface Project + helper functions
- `/components/ui/Icon.tsx` - Nowe ikony (filter, refreshCw, chevronUp)
- `/components/sections/index.ts` - Eksport ProjectsListingSection
- `/components/shared/index.ts` - Eksporty nowych komponentów

**Build:** ✅ 42 strony SSG wygenerowane poprawnie (0 errors)

---

## 🏠 PROJEKTY - DOKUMENTACJA TECHNICZNA

### Architektura Sekcji Projektów

```
ProjectsListingSection (Organizm)
├── Breadcrumbs (nawigacja)
├── H1 Title + Highlight (złoty kolor)
├── Description
├── Mobile Filter Button (lg:hidden)
├── Main Grid (lg:grid-cols-[280px_1fr])
│   ├── ProjectFilterSidebar (sticky, desktop only)
│   │   ├── Wyniki counter
│   │   ├── Sortowanie (radio)
│   │   ├── Technologia (checkbox)
│   │   ├── Kategoria (checkbox)
│   │   ├── Budżet (radio)
│   │   └── Reset Button
│   └── Projects Grid (1/2/3 kolumny)
│       └── ProjectListingCard[] (cascading animations)
├── Empty State (gdy brak wyników)
├── CTA Banner (złoty gradient)
└── MobileFilterDrawer (bottom sheet)
```

### Rozszerzony Interface Project

```typescript
// Nowe typy w /data/projects.ts
export type ProjectCategory = 'jednorodzinny' | 'dwulokalowy' | 'z-poddaszem' | 'parterowy';
export type ProjectTechnology = 'MUROWANY' | 'DREWNIANY';
export type SortOption = 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';

export interface ProjectFilters {
  technology: ProjectTechnology[];
  category: ProjectCategory[];
  budgetRange: string | null;
}

export interface Project {
  // Istniejące pola
  slug: string;
  id: string;
  title: string;
  // ...

  // NOWE POLA
  category: ProjectCategory;    // 'jednorodzinny' | 'dwulokalowy' | ...
  dateAdded: number;            // timestamp do sortowania
  thumbnailSrc?: string;        // opcjonalne
}
```

### Stałe Konfiguracyjne (łatwe do rozszerzenia)

```typescript
// Kategorie - dodaj nowe tutaj
export const projectCategories = [
  { id: 'jednorodzinny', label: 'Jednorodzinny' },
  { id: 'dwulokalowy', label: 'Dwulokalowy' },
  { id: 'z-poddaszem', label: 'Z poddaszem' },
  { id: 'parterowy', label: 'Parterowy' },
] as const;

// Technologie
export const projectTechnologies = [
  { id: 'MUROWANY', label: 'Murowany' },
  { id: 'DREWNIANY', label: 'Drewniany' },
] as const;

// Zakresy budżetowe
export const budgetRanges: BudgetRange[] = [
  { id: 'do-500', label: 'do 500 tys. zł', min: 0, max: 500000 },
  { id: '500-800', label: '500-800 tys. zł', min: 500000, max: 800000 },
  { id: 'powyzej-800', label: 'powyżej 800 tys. zł', min: 800000, max: null },
];

// Opcje sortowania
export const sortOptions = [
  { id: 'newest', label: 'Najnowsze' },
  { id: 'oldest', label: 'Najstarsze' },
  { id: 'price-asc', label: 'Cena rosnąco' },
  { id: 'price-desc', label: 'Cena malejąco' },
  { id: 'area-asc', label: 'Powierzchnia rosnąco' },
  { id: 'area-desc', label: 'Powierzchnia malejąco' },
] as const;
```

### Helper Functions

```typescript
// Parsowanie ceny "984 tys. zł" → 984000
parseEstimatedCost(costString: string): number

// Parsowanie powierzchni "248 + 38m²" → 286
parseSurfaceArea(areaString: string): number

// Filtrowanie projektów
filterProjects(projects: Project[], filters: ProjectFilters): Project[]

// Sortowanie projektów
sortProjects(projects: Project[], sortBy: SortOption): Project[]

// Liczenie projektów per filtr (dla "Murowany (4)")
countProjectsByFilter(projects: Project[], filterType, value): number

// Wszystkie slugi (dla SSG)
getAllProjectSlugs(): string[]
```

### Komponenty Kart

| Komponent | Użycie | Opis |
|-----------|--------|------|
| `ProjectListingCard` | Grid projektów | Karta z obrazem, badge'ami kategorii/technologii, detalami |

**Layout karty:**
```
┌─────────────────────────────────────┐
│  [KATEGORIA badge - lewy górny]    │
│        OBRAZEK (aspect 4/3)         │
│  [TECHNOLOGIA badge - prawy dolny] │
├─────────────────────────────────────┤
│  Projekt ID                         │
│  TYTUŁ (h3, line-clamp-2)          │
│  ┌─────────────┐ ┌───────────────┐ │
│  │ POWIERZCHNIA│ │ KOSZT BUDOWY  │ │
│  └─────────────┘ └───────────────┘ │
│  [Zobacz projekt →]                │
└─────────────────────────────────────┘
```

### Responsywność

| Viewport | Sidebar | Projects Grid | Filtry |
|----------|---------|---------------|--------|
| Mobile (<768px) | Ukryty | 1 kolumna | Bottom drawer |
| Tablet (768-1023px) | Ukryty | 2 kolumny | Bottom drawer |
| Desktop (>=1024px) | Sticky 280px | 2-3 kolumny | W sidebarze |

### Animacje

| Element | Animacja | Delay |
|---------|----------|-------|
| Breadcrumbs | fadeInUp | 0.1s |
| Header | fadeInUp | 0.15s |
| Mobile button | fadeInUp | 0.2s |
| Sidebar | fadeInUp | 0.2s |
| Karty | fadeInUp cascading | 0.3 + index*0.1s |
| CTA Banner | fadeInUp | 0.5s |

### Procedura Dodawania Nowego Projektu

**Krok 1:** Edytuj `/data/projects.ts`:

```typescript
export const allProjects: Project[] = [
  // ... istniejące projekty
  {
    slug: 'nowy-projekt',
    id: 'NP100',
    title: 'Opis projektu...',
    alt: 'Wizualizacja...',
    price: '6 500 zł',
    availability: '3 dni robocze',
    surfaceArea: '145m²',
    estimatedBuildCost: '520 tys. zł',
    technology: 'MUROWANY',
    category: 'jednorodzinny',           // ← WYMAGANE
    dateAdded: Date.parse('2026-01-19'), // ← WYMAGANE
    galleryImageCount: 5,
    floorPlans: [...],
    specifications: [...],
    costCalculation: {...},
  },
];
```

**Krok 2:** Dodaj obrazy:

```
/public/images/projekty/nowy-projekt/
├── main.webp           - Główne zdjęcie
├── thumbnail.webp      - Miniatura (800×600 rekomendowane)
├── gallery-1.webp      - Galeria
└── plan-parter.webp    - Plan piętra
```

**Krok 3:** Build

```bash
npm run build
```

Projekt automatycznie pojawi się:
- Na stronie `/projekty` (listing z filtrami)
- Na stronie `/projekty/nowy-projekt` (szczegóły)

### Dodawanie Nowej Kategorii

**Krok 1:** Edytuj `/data/projects.ts`:

```typescript
// 1. Dodaj do typu
export type ProjectCategory = 'jednorodzinny' | 'dwulokalowy' | 'z-poddaszem' | 'parterowy' | 'nowa-kategoria';

// 2. Dodaj do stałej
export const projectCategories = [
  // ... istniejące
  { id: 'nowa-kategoria', label: 'Nowa Kategoria' },
] as const;
```

**Krok 2:** Przypisz kategorię do projektów i uruchom build.

### Kolorystyka

| Element | Kolor | Klasa/Wartość |
|---------|-------|---------------|
| Tło sekcji | Beżowy | `#efebe7` |
| Karty | Biały | `bg-white` |
| Badge kategorii | Złoty | `bg-primary text-white` |
| Badge technologii | Ciemny | `bg-zinc-800/90 text-white` |
| Aktywny filtr | Złoty | `accent-primary` |
| CTA Banner | Złoty gradient | `from-primary to-primary-dark` |

### Routing

| Ścieżka | Plik | Opis |
|---------|------|------|
| `/projekty` | `/app/projekty/page.tsx` | Lista wszystkich projektów z filtrami |
| `/projekty/[slug]` | `/app/projekty/[slug]/page.tsx` | Strona pojedynczego projektu (SSG) |

---

## 🆕 AKTUALIZACJA SESJI (2026-01-19)

### ✅ Zmiana Sekcji Intro na EmotionalHeroSection (Strony Lokalne)

**Cel:** Ujednolicenie designu stron lokalnych z sekcją początkową ze stron ofertowych (z CTA Box i buttonami konsultacji).

**Zmiana:** `IntroSection` → `EmotionalHeroSection` na wszystkich 7 stronach lokalnych.

**Zaktualizowane pliki:**

1. **`/data/local-pages.ts`** - Nowy interface `EmotionalHeroData`:
```typescript
export interface EmotionalHeroData {
  label: string;
  headline: string | string[];
  subtitle: string;
  benefits?: string[];
  ctaBoxTitle: string;
  ctaBoxBenefits: string[];
  ctaBoxSubtext: string;
  ctaBoxButtons: CTAButton[];
}

export interface LocalPageData {
  // ...
  emotionalHero: EmotionalHeroData;  // ← Zamiast intro
  // ...
}
```

2. **`/app/obszar-dzialania/[slug]/page.tsx`**:
   - Import: `IntroSection` → `EmotionalHeroSection`
   - Użycie: `<EmotionalHeroSection {...page.emotionalHero} />`
   - TOC: ID sekcji `intro` → `emotional-hero`, label `Wprowadzenie` → `Konsultacja`

3. **`/lib/schema/generators.ts`**:
   - Zmiana: `page.intro.paragraphs.join(' ')` → `page.emotionalHero.subtitle`

**Zaktualizowane strony lokalne (7):**
- ✅ Rybnik
- ✅ Wodzisław Śląski
- ✅ Tychy
- ✅ Katowice
- ✅ Jaworzno
- ✅ Mikołów
- ✅ Gliwice

**Przykładowa struktura EmotionalHero dla strony lokalnej:**
```typescript
emotionalHero: {
  label: "BUDOWA DOMÓW RYBNIK",
  headline: ["Budujesz Dom w Rybniku?", "Teren Górniczy Wymaga Specjalistów"],
  subtitle: "Rybnik to teren górniczy kategorii II-IV. Standardowy projekt katalogowy nie wystarczy...",
  benefits: [
    "Specjalizacja w budowie na terenach górniczych (kat. II-IV)",
    "Płyty fundamentowe i wzmocnione konstrukcje jako standard",
    "15 lat doświadczenia w powiecie rybnickim",
  ],
  ctaBoxTitle: "☎ Umów Bezpłatną Konsultację",
  ctaBoxBenefits: [
    "Ocenimy kategorię terenu górniczego Twojej działki",
    "Dobierzemy odpowiednie rozwiązania konstrukcyjne",
    "Przedstawimy realny kosztorys budowy",
    "Odpowiemy na wszystkie Twoje pytania",
  ],
  ctaBoxSubtext: "Konsultacja jest bezpłatna i niezobowiązująca.",
  ctaBoxButtons: [
    { text: "Zadzwoń do Nas", variant: "secondary" },
    { text: "Napisz do Nas", href: "#kontakt", variant: "secondary" },
  ],
},
```

**Build:** ✅ 28 stron SSG wygenerowanych poprawnie (0 errors)

### ✅ Sekcja Blogowa - BentoBlogSection (ZAKTUALIZOWANA)

**Cel:** Nowoczesna sekcja blogowa z dynamicznym filtrowaniem po kategoriach i automatycznym sortowaniem po dacie.

**Pliki:**
- `/components/sections/BentoBlogSection.tsx` - Główny komponent
- `/data/blog-data.ts` - Dane wszystkich wpisów blogowych
- `/app/blog/page.tsx` - Strona bloga

---

## 📝 BLOG - DOKUMENTACJA TECHNICZNA

### Architektura Sekcji Blogowej

```
BentoBlogSection (Organizm)
├── Breadcrumbs (nawigacja)
├── H1 Title + Highlight (złoty kolor)
├── Description
├── Category Filters (grid 5-kolumnowy)
├── Main Grid (3-kolumnowy)
│   ├── MainPostCard (2/3 szerokości) - najnowszy post
│   └── Recommended Sidebar (1/3) - starsze posty
├── Bottom Grid (3 kafelki) - następne 3 najnowsze
└── Load More Button
```

### Logika Wyświetlania Postów

**KLUCZOWE:** Posty są automatycznie rozdzielane na sekcje na podstawie daty:

```
┌─────────────────────────────────────────────────────────────┐
│  1. FILTROWANIE                                             │
│     - "Wszystkie" → wszystkie posty                         │
│     - Kategoria → tylko posty z categoryId === activeCategory│
├─────────────────────────────────────────────────────────────┤
│  2. SORTOWANIE                                              │
│     - Po dateTimestamp (najnowsze najpierw)                 │
├─────────────────────────────────────────────────────────────┤
│  3. ROZDZIELENIE NA SEKCJE                                  │
│     - mainPost = filteredPosts[0] (najnowszy)               │
│     - bottomPosts = filteredPosts[1..3] (następne 3)        │
│     - recommendedPosts = filteredPosts[4+] (reszta/starsze) │
└─────────────────────────────────────────────────────────────┘
```

### Interface BlogPost

```typescript
export interface BlogPost {
  id: string;                    // Unikalne ID (używane jako key i w URL)
  image: { src: string; alt: string };
  category: string;              // Nazwa wyświetlana (np. "Technologia")
  categoryId: string;            // ID do filtrowania (np. "technologia")
  date: string;                  // Data wyświetlana (np. "14 Stycznia, 2026")
  dateTimestamp: number;         // Timestamp do sortowania (Date.parse())
  readTime?: string;             // Opcjonalnie (np. "5 min czytania")
  title: string;
  excerpt: string;
  author?: BlogAuthor;           // Opcjonalnie { name, role?, avatar? }
  href: string;                  // Link do wpisu
}
```

### Interface BentoBlogSectionProps

```typescript
export interface BentoBlogSectionProps {
  breadcrumbs?: Breadcrumb[];    // Nawigacja nad H1
  title: string;                 // "Wiedza, innowacje i"
  titleHighlight?: string;       // "nowoczesne budownictwo." (złoty)
  description: string;
  categories: BlogCategory[];    // Filtry kategorii
  posts: BlogPost[];             // WSZYSTKIE posty (sortowanie automatyczne)
  loadMoreLabel?: string;
}
```

### Kategorie

```typescript
export const blogCategories: BlogCategory[] = [
  { id: 'realizacje', label: 'Realizacje' },
  { id: 'technologia', label: 'Technologia' },
  { id: 'prawo', label: 'Prawo budowlane' },
  { id: 'porady', label: 'Porady' },
];
```

### Komponenty Kart

| Komponent | Użycie | Opis |
|-----------|--------|------|
| `MainPostCard` | Główny post (lewo) | Duża karta 2/3 szerokości, zdjęcie, autor, excerpt |
| `SmallPostCard` | Sidebar "Polecane" | Mała karta z miniaturką 96x96px |
| `GridPostCard` | Dolne 3 kafelki | Karta ze zdjęciem aspect-[4/3] |

### Dodawanie Nowego Wpisu

**Krok 1:** Dodaj wpis do `/data/blog-data.ts`:

```typescript
export const blogPosts: BlogPost[] = [
  {
    id: 'moj-nowy-wpis',                          // Unikalne ID
    image: {
      src: 'https://images.unsplash.com/...',    // URL zdjęcia
      alt: 'Opis zdjęcia',
    },
    category: 'Technologia',                      // Nazwa wyświetlana
    categoryId: 'technologia',                    // ID kategorii
    date: '20 Stycznia, 2026',                    // Data wyświetlana
    dateTimestamp: Date.parse('2026-01-20'),      // ← WAŻNE: timestamp do sortowania
    readTime: '5 min czytania',                   // Opcjonalnie
    title: 'Tytuł mojego wpisu',
    excerpt: 'Krótki opis wpisu...',
    author: {                                     // Opcjonalnie
      name: 'Jan Kowalski',
      avatar: 'https://...',
    },
    href: '/blog/moj-nowy-wpis',                  // Link do wpisu
  },
  // ... inne wpisy
];
```

**Krok 2:** Post automatycznie pojawi się w odpowiednim miejscu na podstawie `dateTimestamp`.

### Kolorystyka

| Element | Kolor | Klasa/Wartość |
|---------|-------|---------------|
| Tło sekcji | Beżowy | `#efebe7` |
| Karty | Biały | `#ffffff` |
| Kategoria (badge) | Złoty + biały tekst | `bg-primary text-white` |
| Aktywny filtr | Złoty | `bg-primary text-white` |
| Nieaktywny filtr | Biały + ramka | `bg-white border-2` |
| Title highlight | Złoty | `text-primary` |

### Responsywność

| Viewport | Filtry | Main Grid | Bottom Grid |
|----------|--------|-----------|-------------|
| Mobile | 2 kolumny | 1 kolumna (stack) | 1 kolumna |
| Tablet | 3 kolumny | 1 kolumna | 2 kolumny |
| Desktop | 5 kolumn | 3 kolumny (2+1) | 3 kolumny |

### Użycie

```tsx
// /app/blog/page.tsx
import { BentoBlogSection } from '@/components/sections';
import { blogSectionData } from '@/data/blog-data';

export default function BlogPage() {
  return (
    <main>
      <BentoBlogSection {...blogSectionData} />
    </main>
  );
}
```

### Funkcje

- ✅ Dynamiczne filtrowanie po kategoriach
- ✅ Automatyczne sortowanie po dacie
- ✅ Breadcrumbs nawigacja
- ✅ Animacje scroll-triggered (cascading delays)
- ✅ Sticky main post na desktop
- ✅ Scrollowalny sidebar "Polecane"
- ✅ Hover effects na kartach (scale, shadow, color)
- ✅ Pełne karty klikalne (Link wrapper)
- ✅ Empty state gdy brak postów w kategorii
- ✅ Load More button

---

## 📄 STRONA POJEDYNCZEGO WPISU BLOGOWEGO

### Architektura

```
BlogPostContent (Organizm) - /app/blog/[slug]/page.tsx
├── Breadcrumbs (Strona główna → Blog → Tytuł)
├── Main Grid (2-kolumnowy: lg:grid-cols-[1fr_320px])
│   ├── Article (lewa kolumna - biały box)
│   │   ├── Featured Image (aspect 2:1)
│   │   ├── Post Meta (data, czas czytania, kategoria)
│   │   ├── H1 Title
│   │   ├── Content Blocks (renderowane dynamicznie)
│   │   ├── Tags (linki)
│   │   ├── Share Buttons (Facebook, LinkedIn, Link)
│   │   └── Author Box (zdjęcie + imię + rola)
│   └── Sidebar (prawa kolumna - sticky)
│       ├── Table of Contents (biały box, sticky top-24)
│       └── CTA Box (gradient złoty)
└── Related Posts (3 karty, full width)
```

### Layout

**2-kolumnowy grid:** Artykuł (lewo) + Sticky Sidebar (prawo, 320px).

```
┌────────────────────────────────────────────────────────────────────────┐
│                         BEŻOWE TŁO (#efebe7)                           │
│                                                                        │
│  ┌────────────────────────────────────────────────┐  ┌──────────────┐  │
│  │           BIAŁY BOX (ARTYKUŁ)                  │  │   SIDEBAR    │  │
│  │  ┌──────────────────────────────────────────┐  │  │   (320px)    │  │
│  │  │        FEATURED IMAGE (aspect 2:1)       │  │  │              │  │
│  │  └──────────────────────────────────────────┘  │  │ ┌──────────┐ │  │
│  │                                                │  │ │ SPIS     │ │  │
│  │  Meta: 📅 14 Stycznia  •  ⏱ 5 min  •  KATEG.  │  │ │ TREŚCI   │ │  │
│  │                                                │  │ │ (sticky) │ │  │
│  │  # Tytuł Artykułu (H1)                        │  │ │  • H2    │ │  │
│  │                                                │  │ │    • H3  │ │  │
│  │  CONTENT BLOCKS:                              │  │ └──────────┘ │  │
│  │  - paragraph                                  │  │              │  │
│  │  - heading (H2, H3, H4)                       │  │ ┌──────────┐ │  │
│  │  - list (złote kropki)                        │  │ │ CTA BOX  │ │  │
│  │  - image (z caption)                          │  │ │ (złoty   │ │  │
│  │  - quote (złota linia)                        │  │ │ gradient)│ │  │
│  │  - callout (info/warning/tip)                 │  │ │          │ │  │
│  │                                                │  │ │ [Umów    │ │  │
│  │  ─────────────────────────────────────────    │  │ │konsultację]│ │
│  │  Tags: #technologia #materiały                │  │ └──────────┘ │  │
│  │  ─────────────────────────────────────────    │  │              │  │
│  │  Udostępnij: [FB] [LI] [🔗]                   │  └──────────────┘  │
│  │                                                │                    │
│  │  ┌──────────────────────────────────────────┐  │                    │
│  │  │ 👤 AUTHOR BOX                            │  │                    │
│  │  └──────────────────────────────────────────┘  │                    │
│  └────────────────────────────────────────────────┘                    │
│                                                                        │
│              PODOBNE ARTYKUŁY (3 karty, full width)                    │
│              [Karta 1]      [Karta 2]      [Karta 3]                   │
└────────────────────────────────────────────────────────────────────────┘
```

**Responsywność:**
- **Desktop (lg+):** 2 kolumny - artykuł + sticky sidebar
- **Mobile/Tablet:** 1 kolumna - sidebar pod artykułem

### System ContentBlock

**Interface:**
```typescript
export interface ContentBlock {
  type: 'paragraph' | 'heading' | 'image' | 'list' | 'quote' | 'callout';
  content?: string;        // Treść (wspiera HTML)
  items?: string[];        // Lista elementów
  src?: string;            // URL obrazu
  alt?: string;            // Alt text obrazu
  caption?: string;        // Podpis (obraz, cytat)
  level?: 2 | 3 | 4;       // Poziom nagłówka
  variant?: 'info' | 'warning' | 'tip';  // Wariant callout
}
```

### 🎨 Stylizacja ContentBlock

#### 1. **Paragraph** (Akapit)
```typescript
{ type: 'paragraph', content: 'Treść akapitu z <strong>bold</strong>...' }
```
- **Style:** `text-text-secondary leading-relaxed mb-6`
- **HTML:** Wspiera `<strong>`, `<em>`, `<a>` przez `dangerouslySetInnerHTML`

#### 2. **Heading** (Nagłówek)
```typescript
{ type: 'heading', level: 2, content: 'Tytuł sekcji' }
```

| Level | Style | Użycie |
|-------|-------|--------|
| H2 | `text-2xl md:text-3xl font-bold mt-12 mb-6` | Główne sekcje artykułu |
| H3 | `text-xl md:text-2xl font-semibold mt-10 mb-4` | Podsekcje |
| H4 | `text-lg md:text-xl font-semibold mt-8 mb-3` | Mniejsze nagłówki |

#### 3. **List** (Lista punktowana)
```typescript
{
  type: 'list',
  items: [
    '<strong>Element 1</strong> - opis',
    '<strong>Element 2</strong> - opis',
  ]
}
```
- **Style:** `space-y-3 mb-6 ml-6`
- **Punkt:** Złota kropka (`bg-primary rounded-full w-2 h-2`)
- **HTML:** Wspiera `<strong>`, `<em>` w elementach

#### 4. **Image** (Obraz)
```typescript
{
  type: 'image',
  src: 'https://images.unsplash.com/...',
  alt: 'Opis obrazu',
  caption: 'Podpis pod obrazem (opcjonalny)'
}
```
- **Kontener:** `aspect-[16/9] rounded-xl overflow-hidden my-8`
- **Podpis:** `text-sm text-text-muted text-center italic mt-3`

#### 5. **Quote** (Cytat)
```typescript
{
  type: 'quote',
  content: 'Treść cytatu...',
  caption: 'Autor cytatu'
}
```
- **Style:** `pl-6 border-l-4 border-primary bg-primary/5 py-4 pr-6 rounded-r-xl my-8`
- **Treść:** `text-lg italic text-text-primary`
- **Autor:** `text-sm text-text-muted not-italic` z prefixem "—"

#### 6. **Callout** (Wyróżniony blok) ⭐

```typescript
{
  type: 'callout',
  variant: 'info' | 'warning' | 'tip',
  content: '<strong>Nagłówek:</strong> Treść callout...'
}
```

| Variant | Kolor | Ikona | Użycie |
|---------|-------|-------|--------|
| **info** 🔵 | `bg-blue-50 border-blue-200 text-blue-800` | `info` | Informacje dodatkowe, ciekawostki |
| **warning** 🟠 | `bg-amber-50 border-amber-200 text-amber-800` | `alertTriangle` | Ostrzeżenia, ważne uwagi |
| **tip** 🟢 | `bg-green-50 border-green-200 text-green-800` | `lightbulb` | Porady eksperta, wskazówki |

**Przykłady użycia:**

```typescript
// 🔵 INFO - Informacja
{
  type: 'callout',
  variant: 'info',
  content: '<strong>Uwaga:</strong> Ta sekcja dotyczy tylko terenów górniczych kategorii III i wyższej.'
}

// 🟠 WARNING - Ostrzeżenie
{
  type: 'callout',
  variant: 'warning',
  content: '<strong>Ważne:</strong> Przed rozpoczęciem budowy należy uzyskać opinię geotechniczną!'
}

// 🟢 TIP - Porada
{
  type: 'callout',
  variant: 'tip',
  content: '<strong>Porada eksperta:</strong> Zalecamy stosowanie izolacji XPS o grubości min. 15 cm.'
}
```

### Dodawanie Treści do Wpisu

**Krok 1:** W `/data/blog-data.ts` dodaj treść do `blogPostContents`:

```typescript
export const blogPostContents: Record<string, ContentBlock[]> = {
  'moj-nowy-wpis': [
    {
      type: 'paragraph',
      content: 'Wprowadzenie do artykułu...',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Pierwszy rozdział',
    },
    {
      type: 'paragraph',
      content: 'Treść pierwszego rozdziału...',
    },
    {
      type: 'callout',
      variant: 'tip',
      content: '<strong>Porada:</strong> Pamiętaj o tym aspekcie!',
    },
    {
      type: 'list',
      items: [
        '<strong>Punkt 1</strong> - opis',
        '<strong>Punkt 2</strong> - opis',
      ],
    },
    {
      type: 'image',
      src: 'https://images.unsplash.com/...',
      alt: 'Opis obrazu',
      caption: 'Podpis pod obrazem',
    },
    {
      type: 'quote',
      content: 'Cytat z artykułu lub od eksperta.',
      caption: 'Imię Nazwisko, Stanowisko',
    },
    {
      type: 'heading',
      level: 2,
      content: 'Podsumowanie',
    },
    {
      type: 'paragraph',
      content: 'Końcowe wnioski...',
    },
  ],
};
```

**Krok 2:** Strona automatycznie wygeneruje się pod `/blog/moj-nowy-wpis` (SSG).

### Funkcje Pomocnicze

```typescript
// Pobierz post po slug
getBlogPostBySlug(slug: string): BlogPost | undefined

// Wszystkie slugi (dla generateStaticParams)
getAllBlogSlugs(): string[]

// Powiązane posty (ta sama kategoria)
getRelatedPosts(currentSlug: string, limit?: number): BlogPost[]

// Pełne dane posta z treścią
getBlogPostDataBySlug(slug: string): BlogPostData | undefined

// Konwersja do RelatedPost
toRelatedPost(post: BlogPost): RelatedPost
```

### Routing

| Ścieżka | Plik | Opis |
|---------|------|------|
| `/blog` | `/app/blog/page.tsx` | Lista wszystkich wpisów |
| `/blog/[slug]` | `/app/blog/[slug]/page.tsx` | Strona pojedynczego wpisu (SSG) |

### SEO

- ✅ `generateMetadata()` z title, description, OpenGraph
- ✅ Twitter Cards (summary_large_image)
- ✅ Breadcrumbs
- ✅ Semantic HTML (article, h1, h2, nav)

---

## 🆕 AKTUALIZACJA SESJI (2026-01-17)

### ✅ Rozszerzone Animacje Scroll-Triggered

**Nowe komponenty z animacjami:**
- ✅ `BentoContactSection` - Animowane kafelki formularza kontaktowego (cascading 0.2-0.6s)
- ✅ `AnimatedServiceGrid` - Nowy komponent wrapper dla animowanych kart usług
- ✅ `ProjectsSection` - Animowany slider portfolio (header, button, slider)
- ✅ `BlogSection` - Animowane karty blogowe (cascading)

### ✅ Footer - Aktualizacja Sekcji "Obszar Działania"

**Zmiana:** "Szybkie Usługi" → "Obszar Działania" z 5 najważniejszymi miastami

**Nowa struktura:**
```typescript
{
  title: "Obszar Działania",
  titleHref: "/obszar-dzialania",  // ← Klikalnyttuł
  links: [
    { label: "Rybnik", href: "/obszar-dzialania/rybnik" },
    { label: "Katowice", href: "/obszar-dzialania/katowice" },
    { label: "Tychy", href: "/obszar-dzialania/tychy" },
    { label: "Jaworzno", href: "/obszar-dzialania/jaworzno" },
    { label: "Wodzisław Śląski", href: "/obszar-dzialania/wodzislaw-slaski" },
  ],
}
```

**Zaktualizowany interface `FooterProps`:**
```typescript
linkGroups: Array<{
  title: string;
  titleHref?: string;  // ← Opcjonalny link dla tytułu
  links: Array<{ label: string; href: string }>;
}>;
```

### ✅ Nowa Strona: Obszar Działania Hub z Interaktywną Mapą SVG

**Routing:** `/obszar-dzialania` (page.tsx - SSG)

**1. Strona Hub "Obszar Działania"**
- ✅ Nowa strona główna dla sekcji "Obszar Działania"
- ✅ Interaktywna mapa SVG 3 województw (śląskie, małopolskie, opolskie)
- ✅ Lista miast z dedykowanymi stronami (grid z linkami)
- ✅ Karty województw z listą miast
- ✅ Sekcja "Logistyka i Zaplecze" (4 benefity)
- ✅ Schema.org: LocalBusiness + BreadcrumbList

**2. Nowe Komponenty Interaktywnej Mapy:**

| Komponent | Lokalizacja | Typ | Opis |
|-----------|-------------|-----|------|
| `InteractiveMapSection` | `/components/sections/` | Organizm | Sekcja z mapą (tylko desktop) |
| `PolandMapSVG` | `/components/shared/` | Molekuła | Komponent SVG z interaktywnością |
| `MapTooltip` | `/components/ui/` | Atom | Tooltip nad miastem |

**3. Nowy Plik Danych:**
- `/data/map-data.ts` - Dane województw, miast, helper functions

**4. Plik SVG:**
- `/public/mapa_3_wojewodztwa.svg` - Zewnętrzny plik mapy Polski

---

## 🗺️ INTERAKTYWNA MAPA SVG - DOKUMENTACJA TECHNICZNA

### Architektura Komponentów

```
InteractiveMapSection (Organizm)
├── SectionHeader
├── PolandMapSVG (Molekuła)
│   └── [SVG Injection] mapa_3_wojewodztwa.svg
├── MapTooltip (Atom)
├── Legend (wbudowany)
├── Back Button (wbudowany)
└── Instructions (wbudowany)
```

### Wzorce Implementacyjne

**1. SVG Injection Pattern**
```typescript
// PolandMapSVG.tsx - Ładowanie zewnętrznego SVG
useEffect(() => {
  const loadSVG = async () => {
    const response = await fetch('/mapa_3_wojewodztwa.svg');
    const svgText = await response.text();
    containerRef.current.innerHTML = svgText;
    svgRef.current = containerRef.current.querySelector('svg');
    // Setup interaktywności...
  };
  loadSVG();
}, []);
```

**2. Callback Refs Pattern (unikanie stale closures)**
```typescript
// Przechowywanie callbacków w refs dla event listenerów
const callbacksRef = useRef<CallbackRefs>({
  onVoivodeshipClick,
  onVoivodeshipHover,
  onCityClick,
  onCityHover,
});

// Aktualizacja przy każdej zmianie props
useEffect(() => {
  callbacksRef.current = { ... };
}, [deps]);

// Event listener używa ref (zawsze aktualna wersja)
const clickHandler = () => {
  callbacksRef.current.onVoivodeshipClick(voiv.id);
};
```

**3. CSS Transform Zoom**
```css
/* Zoom do województwa przez CSS transform */
.map-container.zoomed-slaskie {
  transform-origin: 42% 52%;
  transform: scale(1.5) translate(6%, 10%);
}
```

**4. Dataset API (dane na elementach SVG)**
```typescript
// Przechowywanie danych na elementach DOM
(circle as HTMLElement).dataset.cityId = city.id;
(circle as HTMLElement).dataset.voivodeship = city.voivodeship;
```

**5. Map Entry Animation (Bezpieczne podejście)**
```typescript
// InteractiveMapSection.tsx - Animacja SVG kontenera
<div
  className={clsx(
    "relative aspect-[16/9] p-6",
    "transition-all duration-700 delay-300",  // ← 300ms delay po białej karcie
    inView ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'  // ← Scale z 0.96 → 1.0
  )}
  style={{
    transformOrigin: 'center center'  // ← Skalowanie z centrum
  }}
>
  <PolandMapSVG ... />
</div>
```

**WAŻNE:** Nie modyfikujemy domyślnych stylów `.map-voivodeship` (opacity, transform) - to powodowało niewidoczność mapy. Zamiast tego animujemy cały kontener SVG jako jedną jednostkę.

### Stany Mapy

| Stan | Opis | Klasy CSS |
|------|------|-----------|
| `overview` | Widok wszystkich 3 województw | Brak transformacji |
| `zoomed` | Zoom na jedno województwo | `.zoomed-{id}` na kontenerze |
| `hovered` | Hover na województwie (overview) | `.hovered` na grupie SVG |
| `active` | Aktywne województwo (zoomed) | `.active` na grupie SVG |
| `faded` | Nieaktywne województwa (zoomed) | `.faded` na grupie SVG |

### Stany Miast

| Stan | Opis | Klasy CSS |
|------|------|-----------|
| Ukryte | Domyślny stan | `.miasto` (opacity: 0) |
| Preview | Hover na województwie | `.miasto-preview` |
| Widoczne | Zoom na województwo | `.miasto-visible` |
| Label widoczny | Zoom na województwo | `.label-visible` |

### Struktura Danych (`/data/map-data.ts`)

```typescript
// Typy
export type VoivodeshipId = 'slaskie' | 'malopolskie' | 'opolskie';

export interface MapCity {
  id: string;                    // Unique identifier
  name: string;                  // Display name (Polish)
  nameInSvg: string;             // Name as it appears in SVG
  slug: string | null;           // URL slug (null = no page)
  voivodeship: VoivodeshipId;    // Parent voivodeship
  coordinates: { cx: number; cy: number };  // SVG coordinates
  hasPage: boolean;              // Has dedicated local page
}

export interface MapVoivodeship {
  id: VoivodeshipId;
  name: string;                  // Display name
  svgGroupId: string;            // ID grupy w SVG (#wojewodztwo-slaskie)
  citiesGroupId: string;         // ID grupy miast w SVG
  cities: MapCity[];
}
```

**Helper Functions:**
- `getAllCities()` - Wszystkie miasta (flat array)
- `getCitiesWithPages()` - Miasta z dedykowanymi stronami
- `getCityById(id)` - Znajdź miasto po ID
- `getCityByNameInSvg(name)` - Znajdź miasto po nazwie w SVG
- `getVoivodeshipById(id)` - Znajdź województwo
- `getMapStats()` - Statystyki (total, withPages, comingSoon)

### Style CSS (`globals.css`)

**Sekcje stylów mapy:**
1. **Map Container** - `.map-container`, `.zoomed-{id}`
2. **Voivodeship Styles** - `.map-voivodeship`, `.hovered`, `.active`, `.faded`
3. **City Markers** - `.miasto`, `.miasto-visible`, `.miasto-preview`
4. **Labels** - `.label`, `.label-visible`
5. **Voivodeship Name Label** - `.voivodeship-hover-label`
6. **Legend** - `.map-legend`, `.map-legend-item`, `.map-legend-dot`
7. **Back Button** - `.map-back-button`
8. **Tooltip** - `.map-tooltip`, `.map-tooltip-title`, `.map-tooltip-subtitle`

### Responsywność

**Desktop Only:**
```tsx
// InteractiveMapSection - ukryta na mobile
<section className="hidden lg:block ...">
```

**Mobile Fallback:**
- Sekcja "Lista Miast" (Section 2) widoczna na wszystkich urządzeniach
- Grid miast z linkami zastępuje interaktywną mapę

### Flow Użytkownika

```
[Overview Mode]
    │
    ├─ Hover na województwo → Label nazwy + preview miast
    │
    └─ Klik na województwo → [Zoomed Mode]
                                  │
                                  ├─ Widoczne markery miast
                                  ├─ Hover na miasto → Tooltip
                                  ├─ Klik na miasto (hasPage) → Nawigacja
                                  └─ Klik poza / Back button → [Overview Mode]
```

### Dodawanie Nowego Miasta

**Krok 1:** Dodaj miasto do `/data/map-data.ts`
```typescript
const slaskieCities: MapCity[] = [
  // ... existing cities
  createCity('nowe-miasto', 'Nowe Miasto', 'Nowe Miasto', 'nowe-miasto', 'slaskie', 700, 1100),
];
```

**Krok 2:** Jeśli miasto ma stronę, dodaj slug do `existingPageSlugs`
```typescript
const existingPageSlugs = new Set([
  'rybnik',
  'nowe-miasto',  // ← Dodaj tutaj
]);
```

**Krok 3:** Upewnij się, że miasto jest w pliku SVG (text.label + circle.miasto)

### Pliki Komponentów

```
/components/
├── sections/
│   └── InteractiveMapSection.tsx   ← Organizm (246 linii)
├── shared/
│   └── PolandMapSVG.tsx            ← Molekuła (288 linii)
└── ui/
    └── MapTooltip.tsx              ← Atom (49 linii)

/data/
└── map-data.ts                     ← Dane (229 linii)

/public/
└── mapa_3_wojewodztwa.svg          ← Plik SVG mapy

/app/globals.css                    ← Style mapy (linie 278-574)
```

---

## ✨ SYSTEM ANIMACJI - DOKUMENTACJA

### Przegląd

Projekt używa spójnego systemu animacji opartego na:
- **CSS Keyframes** - definicje w `globals.css`
- **react-intersection-observer** - scroll-triggered animations
- **Cascading delays** - kaskadowe opóźnienia elementów

### Keyframes CSS (`globals.css`)

| Keyframe | Opis | Czas | Użycie |
|----------|------|------|--------|
| `fadeInUp` | Fade + translateY(20px→0) | 0.72s | Główna animacja sekcji |
| `fadeInRight` | Fade + translateX(30px→0) | 0.8s | CTA Box, elementy boczne |
| `heroImageZoom` | Scale(1.05→1.0) | 1.2s | Obraz tła w PageHeader |
| `watermarkFadeIn` | Opacity(0→1) | 0.8s | Watermark w PageHeader |

### Komponenty z Animacjami

#### 1. `AnimatedSection` (Wrapper)
**Lokalizacja:** `/components/shared/AnimatedSection.tsx`

Uniwersalny wrapper do scroll-triggered fadeInUp.

```typescript
interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;      // Opóźnienie w sekundach (default: 0.1)
  id?: string;
  as?: 'section' | 'div';
}

// Użycie
<AnimatedSection className="bg-white rounded-3xl" delay={0.1}>
  <SectionHeader ... />
  <Content ... />
</AnimatedSection>
```

**Użycie:** `/obszar-dzialania/page.tsx` (4 sekcje)

#### 2. `IntroSection`
**Lokalizacja:** `/components/sections/IntroSection.tsx`

Sekcja wprowadzająca z animowanym labelem i paragrafami.

```typescript
interface IntroSectionProps {
  label: string;
  paragraphs: readonly string[];
}
```

**Animacje:**
- Label: fadeInUp (0.1s delay)
- Paragrafy: cascading fadeInUp (0.2s, 0.3s, 0.4s...)

**Użycie:** `/obszar-dzialania/[slug]/page.tsx`

#### 3. `PageHeader` (On-Load Animations)
**Lokalizacja:** `/components/shared/PageHeader.tsx`

| Element | Animacja | Delay |
|---------|----------|-------|
| Obraz tła | `animate-hero-zoom` | 0s |
| Tytuł H1 | `animate-fade-in-up` | 0.2s |
| Watermark | `animate-watermark-fade` | 0.3s |
| Breadcrumbs | `animate-fade-in-up` | 0.4s |

#### 4. `EmotionalHeroSection` (On-Load Cascading)
**Lokalizacja:** `/components/sections/EmotionalHeroSection.tsx`

| Element | Animacja | Delay |
|---------|----------|-------|
| Biały kontener | fadeInUp | 0.3s |
| Label (złoty) | fadeInUp | 0.4s |
| Nagłówek H2 | fadeInUp | 0.5s |
| Subtitle | fadeInUp | 0.6s |
| Benefits | fadeInUp (cascading) | 0.7s, 0.8s, 0.9s |
| CTA Box | fadeInRight | 0.5s |

#### 5. Sekcje ze Scroll-Triggered Animations

| Komponent | Threshold | Animacja |
|-----------|-----------|----------|
| `SimpleImageTextSection` | 0.1 | fadeInUp (header, content, image) |
| `AreasSection` | 0.1 | fadeInUp (header, hubs cascading) |
| `ServicesAccordionSection` | 0.1 | fadeInUp (header, items 0.08s interval) |
| `ContactCTASection` | 0.1 | fadeInUp (header, form) + fadeInRight (contact boxes) |
| `BusinessResponsibilitySection` | 0.2 | fadeInUp (header, cards cascading) |
| `InteractiveMapSection` | 0.2 | Custom transition (header, map container) |
| `BentoContactSection` | 0.1 | fadeInUp (header, 5 grid items cascading 0.2-0.6s) |
| `ProjectsSection` | 0.1 | fadeInUp (header+desc, button, slider) |
| `BlogSection` | 0.1 | fadeInUp (header, cards cascading 0.1s interval) |

#### 6. `AnimatedServiceGrid` (Wrapper dla kart usług)
**Lokalizacja:** `/components/shared/AnimatedServiceGrid.tsx`

Wrapper dla gridu kart usług z cascading animations.

```typescript
interface AnimatedServiceGridProps {
  items: ServiceCardSimpleProps[];
}
```

**Animacje:**
- Karty: cascading fadeInUp (0.1s, 0.2s, 0.3s...)

**Użycie:** `/oferta/page.tsx`

#### 7. `BentoContactSection` (Animacje formularza kontaktowego)
**Lokalizacja:** `/components/sections/BentoContactSection.tsx`

| Element | Animacja | Delay |
|---------|----------|-------|
| Header | fadeInUp | 0.1s |
| Intro Box (złoty) | fadeInUp | 0.2s |
| Formularz | fadeInUp | 0.3s |
| Phone Box | fadeInUp | 0.4s |
| Email Box | fadeInUp | 0.5s |
| Address/Map Box | fadeInUp | 0.6s |

**Użycie:** `/kontakt/page.tsx`

### Wzorzec Implementacji

```typescript
'use client';

import { useInView } from 'react-intersection-observer';
import { clsx } from 'clsx';

export function MySection() {
  const { ref, inView } = useInView({
    threshold: 0.1,          // Trigger gdy 10% sekcji widoczne
    triggerOnce: true,       // Animuj tylko raz
    rootMargin: '50px 0px',  // Trigger 50px przed viewport
  });

  return (
    <section ref={ref}>
      <div
        className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
        style={{ animationDelay: '0.1s' }}
      >
        {/* Content */}
      </div>
    </section>
  );
}
```

### Cascading Pattern

```typescript
{items.map((item, index) => (
  <div
    key={index}
    className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
    style={{ animationDelay: `${0.2 + index * 0.1}s` }}  // 0.2s, 0.3s, 0.4s...
  >
    {item}
  </div>
))}
```

### Klasy CSS Animacji

```css
/* Fade in from bottom */
.animate-fade-in-up {
  animation: fadeInUp 0.72s ease-out forwards;
  opacity: 0;
}

/* Fade in from right */
.animate-fade-in-right {
  animation: fadeInRight 0.8s ease-out forwards;
  animation-delay: 0.3s;
  opacity: 0;
}

/* Hero image zoom */
.animate-hero-zoom {
  animation: heroImageZoom 1.2s ease-out forwards;
}

/* Watermark fade */
.animate-watermark-fade {
  animation: watermarkFadeIn 0.8s ease-out forwards;
  opacity: 0;
}
```

---

## 🆕 AKTUALIZACJA SESJI (2026-01-16)

### ✅ Aktualizacje Technologiczne

**1. Next.js 15.5.9 + React 19.2.3**
- ✅ Bezpieczny update z 15.5.4 → 15.5.9 (patch release)
- ✅ React 19.2.0 → 19.2.3 (bug fixes)
- ✅ Update wszystkich dev dependencies (ESLint, TypeScript types, autoprefixer, lucide-react, wrangler)
- ✅ Build: 0 błędów, 25 stron SSG wygenerowanych poprawnie

**2. Naprawione Warningi**
- ✅ **Webpack cache errors** - wyczyszczono uszkodzony cache (.next folder)
- ✅ **baseline-browser-mapping** - zaktualizowano do najnowszej wersji
- ✅ **metadataBase** - dodano do `/app/layout.tsx` (używa `companyData.url`)
  ```tsx
  export const metadata: Metadata = {
    metadataBase: new URL(companyData.url),
    // ... poprawne generowanie OpenGraph URLs
  };
  ```

### ✅ Nowe Strony Lokalne

**3. Strona Katowice (5. strona lokalna)**
- ✅ Pełna implementacja w `/data/local-pages.ts`
- ✅ Routing: `/obszar-dzialania/katowice`
- ✅ Sekcje: PageHeader, Intro, Building Stages, Local Specifics, Districts, **Why Us (5 punktów)**, **FAQ (5 pytań)**, Contact CTA
- ✅ Schema.org: LocalBusiness + Service + FAQPage
- ✅ **Why Us** - unikalna treść:
  - Inżynierskie podejście do szkód górniczych
  - Stała cena w umowie
  - TCO i Wartość Odsprzedaży
  - Akustyka i cisza (ciężkie przegrody dla gęstej zabudowy)
  - Bezpieczeństwo prawne (faktury VAT, ubezpieczenie OC)

**Lista aktywnych stron lokalnych (5):**
1. `/obszar-dzialania/rybnik`
2. `/obszar-dzialania/wodzislaw-slaski`
3. `/obszar-dzialania/tychy`
4. `/obszar-dzialania/jaworzno`
5. `/obszar-dzialania/katowice` 🆕

### ✅ UI Improvements - Bento Grid Style

**4. Zaokrąglone rogi białych sekcji**
- ✅ `SimpleImageTextSection` → `rounded-3xl`
- ✅ `AreasSection` → `rounded-3xl`
- ✅ Spójność z Bento Grid design system

**5. Odstępy między sekcjami**
- ✅ Wrapper sekcji: `space-y-5` (20px gap)
- ✅ Odstęp od Intro: `mt-5` (20px)
- ✅ Równomierne spacing na całej stronie

**6. CtaSection - czarny button**
- ✅ Button "Umów wizytę" zmieniony z złotego na czarny (`!bg-[#1a1a1a]`)
- ✅ Lepsza widoczność na złotym gradiencie
- ✅ Hover: white bg + black text (bez zmian)

### 📊 Build Stats

```
Route (app)                                  Size  First Load JS
├ ● /obszar-dzialania/[slug]                 2 kB         180 kB
├   ├ /obszar-dzialania/rybnik
├   ├ /obszar-dzialania/wodzislaw-slaski
├   ├ /obszar-dzialania/tychy
├   ├ /obszar-dzialania/jaworzno
├   └ /obszar-dzialania/katowice           🆕 NOWA

✓ Generating static pages (25/25)           (było 24)
✓ 0 errors, 15 warnings (unused vars)
```

---

## 📋 SPIS TREŚCI

1. [Wprowadzenie](#wprowadzenie)
2. [Stos Technologiczny](#stos-technologiczny)
3. [Architektura Projektu](#architektura-projektu)
4. [Strony Lokalne (Obszar Działania)](#strony-lokalne-obszar-działania)
5. [Interaktywna Mapa SVG](#🗺️-interaktywna-mapa-svg---dokumentacja-techniczna) 🆕
6. [Schema.org - Implementacja](#schemaorg-implementacja)
7. [Atomic Design - Komponenty](#atomic-design-komponenty)
8. [Dane Firmy - Single Source of Truth](#dane-firmy-single-source-of-truth)
9. [SEO i Metadata](#seo-i-metadata)
10. [Routing i SSG](#routing-i-ssg)
11. [Best Practices](#best-practices)

---

## 1. WPROWADZENIE

**CoreLTB Builders** to firma budowlana specjalizująca się w budownictwie domów jednorodzinnych na terenach górniczych Śląska i Małopolski.

### Kluczowe Cechy Projektu:
- ✅ **Next.js 15.5.9** - Full SSR/SSG
- ✅ **Atomic Design** - Skalowalna architektura komponentów
- ✅ **Bento Grid Design System** - Nowoczesny UI (zaokrąglone rogi, spacing)
- ✅ **Schema.org** - Pełna integracja SEO
- ✅ **TypeScript** - Type-safe development
- ✅ **Strony lokalne (5)** - SEO dla każdego miasta
- ✅ **Single Source of Truth** - Centralne dane firmy

---

## 2. STOS TECHNOLOGICZNY

```json
{
  "framework": "Next.js 15.5.9",
  "react": "19.2.3",
  "typescript": "5.x",
  "styling": "Tailwind CSS",
  "animations": "react-intersection-observer",
  "carousels": "Swiper.js",
  "deployment": "Cloudflare Pages (@cloudflare/next-on-pages)"
}
```

---

## 3. ARCHITEKTURA PROJEKTU

### Struktura Folderów

```
/app
├── /page.tsx                          # Homepage
├── /o-nas/page.tsx                    # O nas
├── /oferta/
│   ├── /page.tsx                      # Lista usług
│   └── /[slug]/page.tsx               # Dynamiczne strony usług (V2)
├── /projekty/[slug]/page.tsx          # Projekty (SSG)
└── /obszar-dzialania/                 # STRONY LOKALNE
    ├── /page.tsx                      # 🆕 Hub z interaktywną mapą SVG
    └── /[slug]/page.tsx               # Dynamiczne strony miast (SSG)

/data
├── company-data.ts                    # Dane firmy (SSOT)
├── local-pages.ts                     # Dane stron lokalnych
├── map-data.ts                        # 🆕 Dane interaktywnej mapy
├── projects.ts                        # Dane projektów
├── services.ts                        # Stare dane usług
└── servicesV2.ts                      # Nowe dane usług (V2)

/lib/schema                            # 🆕 Schema.org
├── types.ts                           # TypeScript types
├── generators.ts                      # Generatory Schema
└── index.ts                           # Exports

/components
├── /ui                                # Atomy
├── /shared                            # Molekuły
└── /sections                          # Organizmy
```

---

## 4. STRONY LOKALNE (OBSZAR DZIAŁANIA)

### 📍 Cel

Stworzenie dedykowanych stron dla każdego miasta/regionu obsługiwanego przez firmę:
- **SEO:** Osobne strony dla każdego miasta (Google: "budowa domów Rybnik")
- **Schema.org:** LocalBusiness + Service dla konkretnego obszaru
- **Content:** Treść dostosowana do lokalnej specyfiki (np. szkody górnicze w Rybniku)

### Routing

```
/obszar-dzialania/rybnik          ← Budowa domów w Rybniku
/obszar-dzialania/katowice        ← Budowa domów w Katowicach
/obszar-dzialania/gliwice         ← Budowa domów w Gliwicach
...
```

### Struktura Danych (`local-pages.ts`)

```typescript
export interface LocalPageData {
  // Meta & Routing
  slug: string;                    // "rybnik"
  cityName: string;                // "Rybnik"
  region: string;                  // "woj. śląskie"
  metaTitle: string;
  metaDescription: string;

  // Hero
  pageHeader: PageHeaderProps;

  // Intro (tekst wstępny)
  intro: {
    label: string;
    paragraphs: readonly string[];
  };

  // Sekcje tekstowe (SimpleImageTextSection style)
  buildingStages: ImageTextSection;      // Co oferujemy?
  localSpecifics: ImageTextSection;      // Specyfika lokalna

  // Dzielnice (AreasSection style - 1 hub)
  districts: {
    header: SectionHeaderProps;
    hub: Hub;  // Jeden hub zamiast north/south/center/west
  };

  // Dlaczego my (USP)
  whyUs: {
    header: SectionHeaderProps;
    points: readonly WhyUsPoint[];
  };

  // FAQ
  faq: {
    header: SectionHeaderProps;
    items: readonly FAQItem[];
  };

  // Sekcje dodatkowe (opcjonalne)
  energyEfficiency?: ImageTextSection;   // Energooszczędność
  formalities?: ImageTextSection;        // Formalności

  // Schema.org
  areaServed: readonly string[];
  geoCoordinates?: {
    latitude: string;
    longitude: string;
  };
}
```

### Design i Komponenty

#### 🎨 Paleta Kolorów Stron Lokalnych

- **Tło sekcji tekstowych:** `#efebe7` (ciepły beż - taki sam jak FAQ)
- **Karty tekstowe:** `#ffffff` (biały)
- **Główny akcent:** `#dfbb68` (złoty)

#### 📦 SimpleImageTextSection - Główny Komponent Tekstowy

**Lokalizacja:** `/components/sections/SimpleImageTextSection.tsx`

**Charakterystyka:**
- **Tło:** Beżowe `#efebe7` (spójność z FAQ)
- **Layout:** Grid 2-kolumnowy (tekst + obraz) lub 1-kolumnowy (tylko tekst)
- **Obraz:** Opcjonalny - jeśli brak, sekcje rozciągają się na pełną szerokość
- **Hierarchia HTML:**
  - `<h2>` - Nagłówek głównej sekcji (SectionHeader)
  - `<h3>` - Tytuły poszczególnych elementów (z ikonami)

**Interface:**
```typescript
export interface SimpleImageTextSectionProps {
  header: SectionHeaderProps;
  items: ContentItem[];        // Elementy z ikonami i treścią
  imageSrc?: string;            // Opcjonalny obraz
  imageAlt?: string;
}

export interface ContentItem {
  icon: IconName;
  title: string;
  content: ContentBlock[];      // Paragrafy lub listy
}

type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };
```

**Responsive Layout:**
- **Z obrazem:** Grid `lg:grid-cols-[1fr_1fr]` (tekst 50% + obraz 50%)
- **Bez obrazu:** Grid `lg:grid-cols-1` + `max-w-5xl mx-auto` (sekcje wyśrodkowane)

**Przykład użycia:**
```typescript
// Z obrazem
buildingStages: {
  header: { label: "ETAPY", title: "Co oferujemy?", ... },
  items: [
    { icon: "building", title: "SSO", content: [...] },
    { icon: "hardHat", title: "Deweloperski", content: [...] }
  ],
  image: {
    src: "/images/local/rybnik/etapy.webp",
    alt: "Etapy budowy"
  }
}

// Bez obrazu (sekcje pełna szerokość)
buildingStages: {
  header: { ... },
  items: [ ... ]
  // brak pola image
}
```

#### 🗺️ AreasSection - Sekcja "Gdzie Budujemy"

**Lokalizacja:** `/components/sections/AreasSection.tsx`

**Charakterystyka:**
- Ten sam komponent co na stronach ofertowych (LOGISTYKA I ZASIĘG)
- **1 hub** zamiast 2 (wyśrodkowany, `max-w-3xl`)
- Biała karta z gradientem, ikoną, opisem i listą dzielnic
- Dzielnice jako klikalne linki

**Przykład:**
```typescript
districts: {
  header: {
    label: "GDZIE BUDUJEMY",
    title: "Dzielnice Rybnika i okolice",
    description: "...",
  },
  hub: {
    hubName: "RYBNIK I POWIAT RYBNICKI",
    subLabel: "OBSZAR DZIAŁANIA",
    iconName: "mapPin",
    description: "Realizujemy inwestycje...",
    cities: [
      { label: "Orzepowice", url: "#" },
      { label: "Boguszowice", url: "#" },
      // ... więcej dzielnic
    ]
  }
}
```

#### 🔄 Reużywane Komponenty

- **PageHeader** - Hero z obrazem tła + breadcrumbs
- **BusinessResponsibilitySection** - Sekcja "Dlaczego my"
- **ServicesAccordionSection** - FAQ (accordion z ContentBlock)

### Procedura Dodawania Nowego Miasta

**Krok 1:** Dodaj dane do `/data/local-pages.ts`

```typescript
export const katowicePage: LocalPageData = {
  slug: "katowice",
  cityName: "Katowice",
  region: "woj. śląskie",
  metaTitle: "Budowa Domów Katowice - CoreLTB Builders",
  metaDescription: "...",

  // ... reszta danych (skopiuj wzorzec z rybnikPage)
};

export const allLocalPages = [
  rybnikPage,
  katowicePage  // ← Dodaj tutaj
] as const;
```

**Krok 2:** Dodaj obraz tła

```
/public/images/local/katowice/
└── hero.webp  (1920×400px)
```

**Krok 3:** Build

```bash
npm run build
```

Strona automatycznie wygeneruje się pod: `/obszar-dzialania/katowice`

---

## 5. SCHEMA.ORG - IMPLEMENTACJA

### 🎯 Filozofia

**WAŻNE:** W projekcie CoreLTB **NIE używamy pricing** w Schema.org, ponieważ:
- Każdy projekt budowlany jest wyceniany indywidualnie
- Cena zależy od kategorii szkód górniczych, projektu, etc.
- Nie chcemy wprowadzać klientów w błąd

### Architektura Schema.org

```
/lib/schema/
├── types.ts              # TypeScript types dla Schema.org
├── generators.ts         # Generatory (Service, FAQ, Breadcrumb, LocalBusiness)
└── index.ts              # Centralne eksporty
```

### Generatory

#### 1. `generateLocalPageSchema()` - Główny generator

Łączy:
- **Service Schema** (bez pricing!)
- **FAQPage Schema**
- **LocalBusiness Schema** (z geo coordinates)
- **BreadcrumbList Schema**

```typescript
export function generateLocalPageSchema(page: LocalPageData): object {
  const pageUrl = `${companyData.url}/obszar-dzialania/${page.slug}`;
  const graphItems: object[] = [];

  // 1. Service (bez pricing)
  graphItems.push(generateServiceSchema(page, pageUrl));

  // 2. FAQPage
  if (page.faq.items.length > 0) {
    graphItems.push(generateFAQPageSchema(page.faq.items, pageUrl));
  }

  // 3. LocalBusiness
  const localBusiness = {
    ...getLocalBusinessSchema(),
    url: pageUrl,
    geo: page.geoCoordinates && {
      "@type": "GeoCoordinates",
      latitude: page.geoCoordinates.latitude,
      longitude: page.geoCoordinates.longitude
    }
  };
  graphItems.push(localBusiness);

  // 4. BreadcrumbList
  graphItems.push(
    generateBreadcrumbSchema(page.pageHeader.breadcrumbs, pageUrl)
  );

  return {
    "@context": "https://schema.org",
    "@graph": graphItems
  };
}
```

#### 2. `generateServiceSchema()` - Service bez pricing

```typescript
export function generateServiceSchema(
  page: LocalPageData,
  pageUrl: string
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    "name": `Budowa domów ${page.cityName}`,
    "description": stripMarkdown(page.intro.paragraphs.join(' ')),
    "provider": getProviderSchema(),
    "areaServed": page.areaServed.map(city => ({
      "@type": "City",
      "name": city
    })),
    "url": pageUrl
    // ❌ BEZ hasOfferCatalog - nie ma konkretnych cen
  };
}
```

#### 3. `generateFAQPageSchema()` - FAQ

```typescript
export function generateFAQPageSchema(
  faqItems: readonly FAQItem[],
  pageUrl: string
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripMarkdown(item.answer)
      }
    }))
  };
}
```

### Użycie w Next.js

```tsx
// /app/obszar-dzialania/[slug]/page.tsx

import { generateLocalPageSchema, sanitizeJsonLd } from '@/lib/schema';

export default async function LocalPage({ params }) {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);

  const schema = generateLocalPageSchema(page);
  const jsonLd = sanitizeJsonLd(schema);

  return (
    <>
      <main>...</main>

      <Script
        id={`schema-local-${slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
    </>
  );
}
```

### Testowanie Schema.org

- **Google Rich Results Test:** https://search.google.com/test/rich-results
- **Schema.org Validator:** https://validator.schema.org/
- **Google Search Console:** Sekcja "Enhancements"

---

## 6. ATOMIC DESIGN - KOMPONENTY

### ⚛️ Atomy (`/components/ui/`)

- `Button` - CTA buttons (primary, secondary, outline-white)
- `Icon` - 80+ ikon z lucide-react
- `SectionLabel` - Złote etykiety nad nagłówkami
- `Portal` - Wrapper dla modals/tooltips
- `MapTooltip` 🆕 - Tooltip nad miastem na mapie

### 🧬 Molekuły (`/components/shared/`)

- `SectionHeader` - Reużywalny nagłówek sekcji (label + title + description)
- `PageHeader` - Hero z obrazem tła + breadcrumbs
- `AccordionItem` - Rozwijane sekcje (używa ContentBlock system)
- `NumberedListItem` - Element listy z numerem i ikoną
- `TimelineNav` - Nawigacja timeline (dla usług)
- `TimelineStep` - Krok timeline z ContentBlock[]
- `PolandMapSVG` 🆕 - Interaktywny komponent mapy SVG

### 🏗️ Organizmy (`/components/sections/`)

**Homepage:**
- `HeroSection`, `AboutCompanySection`, `ServicesSection`, `HowItWorksSection`, `ProjectsSection`, `TestimonialsSection`, `CtaSection`, `BlogSection`

**Strony usług (V2):**
- `EmotionalHeroSection`, `PhilosophyTimelineSection`, `CooperationTimelineSection`, `CooperationTimelineSectionNoLine`, `ServicesAccordionSection`, `ContactCTASection`

**Strony lokalne:**
- `SimpleImageTextSection` - Główny komponent dla wszystkich sekcji tekstowych (buildingStages, localSpecifics, energyEfficiency, formalities)
- `AreasSection` - Sekcja "Gdzie Budujemy" (reużywalny z oferty, 1 hub dla local pages)
- `BusinessResponsibilitySection` - Sekcja "Dlaczego My" (reużywalny)
- `ServicesAccordionSection` - FAQ (reużywalny)

**Strona Hub "Obszar Działania":** 🆕
- `InteractiveMapSection` - Sekcja z interaktywną mapą SVG (tylko desktop)

**Strona O nas:**
- `AboutIntroSection`, `CompetenciesSection`, `BusinessResponsibilitySection`

**Global:**
- `Header`, `Footer`

---

## 7. DANE FIRMY - SINGLE SOURCE OF TRUTH

### `/data/company-data.ts`

**Cel:** Wszystkie dane firmy w jednym miejscu - używane w Schema.org, Footer, Contact, etc.

```typescript
export const companyData: CompanyData = {
  name: "CoreLTB Builders",
  legalName: "CoreLTB Sp. z o.o.",
  url: "https://coreltb.pl",
  telephone: "+48123456789",  // TODO: Uzupełnić
  email: "coreltb@gmail.com",
  foundingDate: "2005-01-01",

  // Główna siedziba - Jaworzno
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Przykładowa 1",  // TODO: Uzupełnić
    addressLocality: "Jaworzno",
    postalCode: "43-600",
    addressRegion: "śląskie",
    addressCountry: "PL"
  },

  // Drugi oddział - Wodzisław Śląski
  additionalLocation: {
    address: {
      streetAddress: "ul. Przykładowa 2",  // TODO: Uzupełnić
      addressLocality: "Wodzisław Śląski",
      // ...
    }
  },

  // Obsługiwane miasta (29 miast)
  areaServed: [
    { "@type": "City", name: "Rybnik" },
    { "@type": "City", name: "Katowice" },
    // ... więcej miast
  ],

  openingHours: [
    "Mo-Fr 08:00-17:00",
    "Sa 09:00-14:00"
  ],

  sameAs: [
    "https://facebook.com/coreltb",
    "https://instagram.com/coreltb",
    // ... social media
  ]
};
```

### Funkcje Pomocnicze

```typescript
// Dla Schema.org
export function getLocalBusinessSchema() { ... }
export function getProviderSchema() { ... }
export function getAreaServedSchema() { ... }

// Walidacja
export function isCityServed(cityName: string): boolean { ... }
```

### Użycie

```tsx
// ✅ DOBRZE - Single Source of Truth
import { companyData } from '@/data/company-data';

<footer>
  <p>{companyData.name}</p>
  <a href={`tel:${companyData.telephone}`}>{companyData.telephone}</a>
</footer>

// ❌ ŹLE - Hardcoded
<footer>
  <p>CoreLTB Builders</p>
  <a href="tel:+48123456789">+48 123 456 789</a>
</footer>
```

---

## 8. SEO I METADATA

### generateMetadata() - Next.js 15

```typescript
export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLocalPageBySlug(slug);

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${companyData.url}/obszar-dzialania/${slug}`,
      type: 'website',
      images: [{
        url: page.pageHeader.backgroundImage,
        width: 1200,
        height: 630
      }]
    }
  };
}
```

### SEO Checklist

- ✅ Unique title i description dla każdej strony
- ✅ OpenGraph tags
- ✅ Schema.org JSON-LD
- ✅ Breadcrumbs
- ✅ Alt text dla obrazów
- ✅ Semantic HTML (h1, h2, h3)
- ✅ Clean URLs (slug-based)

---

## 9. ROUTING I SSG

### Static Site Generation (SSG)

**generateStaticParams()** dla stron lokalnych:

```typescript
export async function generateStaticParams() {
  const slugs = getAllLocalPageSlugs();  // ["rybnik", "katowice", ...]
  return slugs.map((slug) => ({
    slug: slug
  }));
}
```

**Rezultat:**
```
Route (app)                         Size  First Load JS
├ ● /obszar-dzialania/[slug]        2 kB  178 kB
├   ├ /obszar-dzialania/rybnik
├   └ /obszar-dzialania/katowice
```

### Async Params (Next.js 15)

**WAŻNE:** W Next.js 15 params są Promise!

```typescript
// ✅ DOBRZE
export default async function Page({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;
  // ...
}

// ❌ ŹLE (Next.js 14 style)
export default function Page({
  params
}: {
  params: { slug: string }
}) {
  // TypeScript error w Next.js 15
}
```

---

## 10. BEST PRACTICES

### ✅ DO's

1. **Single Source of Truth**
   - Dane firmy → `company-data.ts`
   - Dane stron lokalnych → `local-pages.ts`

2. **Reużywalność**
   - Zawsze sprawdź czy komponent już istnieje przed tworzeniem nowego
   - Przykład: `BusinessResponsibilitySection` reużywany dla "Dlaczego my"

3. **TypeScript**
   - Strict typing dla wszystkich danych
   - `readonly` dla tablic w interfejsach

4. **Schema.org**
   - Używaj generatorów z `/lib/schema/`
   - `stripMarkdown()` dla tekstów z **bold**
   - Unikalne `@id` dla każdego schema

5. **Animacje**
   - IntersectionObserver dla scroll-triggered animations
   - Delays: `0.1s` (header), `0.2s+` (content)

### ❌ DON'Ts

1. **Hardcoding**
   - ❌ NIE hardcoduj danych firmy
   - ❌ NIE duplikuj komponentów
   - ❌ NIE używaj inline styles (tylko Tailwind)

2. **Schema.org**
   - ❌ NIE dodawaj pricing dla usług budowlanych (każdy projekt indywidualny)
   - ❌ NIE zostawiaj markdown w Schema (`**text**` → użyj `stripMarkdown()`)

3. **Components**
   - ❌ NIE twórz nowego komponentu jeśli podobny już istnieje
   - ❌ NIE używaj `any` (używaj `unknown` lub konkretnego typu)

---

## 📸 OBRAZY - LOKALIZACJE

### Strony lokalne

```
/public/images/local/
├── rybnik/
│   └── hero.webp           (1920×400px)
├── katowice/
│   └── hero.webp
└── [miasto]/
    └── hero.webp
```

### Strony usług

```
/public/images/uslugi/
├── kompleksowa-budowa-domow/
│   ├── hero.webp
│   ├── dlaczego-warto.webp
│   └── etapy/ (8 obrazów)
└── projektowanie/
    ├── hero.webp
    └── ...
```

---

## 🚀 DEPLOYMENT - CLOUDFLARE PAGES

### Build Settings

```
Build command: npm run build
Build output: .vercel/output/static
Node version: 18
```

### Required Flags

W Cloudflare Dashboard → Settings → Functions → Compatibility flags:

```
nodejs_compat
```

### .npmrc (Required!)

```
legacy-peer-deps=true
```

Rozwiązuje konflikty zależności na serwerze CI/CD.

---

## 📝 TODO

### Dane do uzupełnienia w `company-data.ts`:

- [ ] Prawdziwy numer telefonu (linia 66)
- [ ] Prawdziwy adres Jaworzno (linia 73)
- [ ] Prawdziwy adres Wodzisław Śląski (linia 84)
- [ ] Geo coordinates (opcjonalne)

### Obrazy do dodania:

- [ ] `/public/images/local/rybnik/hero.webp`
- [ ] Kolejne miasta (Katowice, Gliwice, etc.)

### Następne miasta do zaimplementowania:

- [ ] Katowice
- [ ] Gliwice
- [ ] Zabrze
- [ ] Tychy
- [ ] Kraków

---

**Data utworzenia:** 2026-01-15
**Wersja:** 1.0
**Autor:** CoreLTB Builders Team + Claude
