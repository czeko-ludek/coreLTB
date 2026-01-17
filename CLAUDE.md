# CLAUDE.md - CoreLTB Builders - Dokumentacja Projektu

**Ostatnia aktualizacja:** 2026-01-17

---

## 🆕 AKTUALIZACJA SESJI (2026-01-17)

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
