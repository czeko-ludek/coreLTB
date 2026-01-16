# CLAUDE.md - CoreLTB Builders - Dokumentacja Projektu

**Ostatnia aktualizacja:** 2026-01-16

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
5. [Schema.org - Implementacja](#schemaorg-implementacja)
6. [Atomic Design - Komponenty](#atomic-design-komponenty)
7. [Dane Firmy - Single Source of Truth](#dane-firmy-single-source-of-truth)
8. [SEO i Metadata](#seo-i-metadata)
9. [Routing i SSG](#routing-i-ssg)
10. [Best Practices](#best-practices)

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
└── /obszar-dzialania/                 # 🆕 STRONY LOKALNE
    ├── /page.tsx                      # Hub z mapą (TODO)
    └── /[slug]/page.tsx               # Dynamiczne strony miast (SSG)

/data
├── company-data.ts                    # 🆕 Dane firmy (SSOT)
├── local-pages.ts                     # 🆕 Dane stron lokalnych
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

  // Cennik (opcjonalny)
  pricing?: {
    header: SectionHeaderProps;
    rows: readonly PricingRow[];
    disclaimer: string;
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

#### 📋 PricingSection - Tabela Cennikowa

**Lokalizacja:** `/components/sections/PricingSection.tsx`

**Charakterystyka:**
- Tabela z 4 kolumnami (Etap, Zakres, Koszt, Czas)
- Desktop: Pełna tabela
- Mobile: Karty z danymi
- Disclaimer na dole

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

### 🧬 Molekuły (`/components/shared/`)

- `SectionHeader` - Reużywalny nagłówek sekcji (label + title + description)
- `PageHeader` - Hero z obrazem tła + breadcrumbs
- `AccordionItem` - Rozwijane sekcje (używa ContentBlock system)
- `NumberedListItem` - Element listy z numerem i ikoną
- `TimelineNav` - Nawigacja timeline (dla usług)
- `TimelineStep` - Krok timeline z ContentBlock[]

### 🏗️ Organizmy (`/components/sections/`)

**Homepage:**
- `HeroSection`, `AboutCompanySection`, `ServicesSection`, `HowItWorksSection`, `ProjectsSection`, `TestimonialsSection`, `CtaSection`, `BlogSection`

**Strony usług (V2):**
- `EmotionalHeroSection`, `PhilosophyTimelineSection`, `CooperationTimelineSection`, `CooperationTimelineSectionNoLine`, `ServicesAccordionSection`, `ContactCTASection`

**Strony lokalne:** 🆕
- `SimpleImageTextSection` - Główny komponent dla wszystkich sekcji tekstowych (buildingStages, localSpecifics, energyEfficiency, formalities)
- `AreasSection` - Sekcja "Gdzie Budujemy" (reużywalny z oferty, 1 hub dla local pages)
- `BusinessResponsibilitySection` - Sekcja "Dlaczego My" (reużywalny)
- `ServicesAccordionSection` - FAQ (reużywalny)
- `PricingSection` - Cennik (opcjonalny, obecnie nieużywany)

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
