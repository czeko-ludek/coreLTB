# 🎨 BENTO GRID - PRZEWODNIK IMPLEMENTACYJNY

**Data utworzenia:** 2025-01-15
**Status:** ✅ Prototyp gotowy w `/kontakt-new`
**Cel:** Migracja nowego systemu designu do głównego projektu

---

## 📋 SPIS TREŚCI

1. [Wprowadzenie](#1-wprowadzenie)
2. [Fundament Designu](#2-fundament-designu)
3. [Komponenty Bazowe](#3-komponenty-bazowe)
4. [Sekcje (Organisms)](#4-sekcje-organisms)
5. [System Wariantów](#5-system-wariantów)
6. [Procedura Implementacji](#6-procedura-implementacji)
7. [Migracja Komponentów](#7-migracja-komponentów)

---

## 1. WPROWADZENIE

### Co to jest Bento Grid?

**Bento Grid** to nowy system designu oparty na filozofii modularności i elastyczności, zainspirowany japońskimi pudełkami bento. Każdy komponent to niezależny "moduł", który można układać w różne kompozycje.

### Kluczowe Cechy:

- **Większa szerokość kontenera:** `max-w-[96rem]` (1536px) vs stary `max-w-7xl` (1280px)
- **Zaokrąglenia:** `rounded-3xl` (24px) jako standard
- **Subtelne cienie:** `shadow-[0_0_20px_rgba(0,0,0,0.05)]`
- **System wariantów:** Każdy komponent ma 4 warianty wizualne (v1-v4)
- **Hover effects:** Plynne animacje i hover states na wszystkich interaktywnych elementach

### Dlaczego Bento Grid?

1. **Spójność wizualna** - Wszystkie komponenty mają ten sam język designu
2. **Elastyczność** - 4 warianty pozwalają dopasować wygląd do kontekstu
3. **Responsywność** - Mobile-first approach z płynnymi breakpointami
4. **Nowoczesność** - Większa przestrzeń, miękkość i elegancja

---

## 2. FUNDAMENT DESIGNU

### 2.1 Stałe Wartości Designu

```typescript
// Container Width
const BENTO_CONTAINER = 'max-w-[96rem]'; // 1536px (20% szerszy niż 7xl)

// Padding
const BENTO_PADDING = 'px-4 sm:px-6 lg:px-8';

// Border Radius
const BENTO_RADIUS = 'rounded-3xl'; // 24px

// Shadow
const BENTO_SHADOW = 'shadow-[0_0_20px_rgba(0,0,0,0.05)]';
const BENTO_SHADOW_HOVER = 'hover:shadow-[0_0_30px_rgba(0,0,0,0.08)]';

// Transition
const BENTO_TRANSITION = 'transition-all duration-300';

// Border
const BENTO_BORDER = 'border border-gray-100/50';
```

### 2.2 Hierarchia Kolorów

```typescript
// Tła Sekcji
BG_SECTION_LIGHT = 'bg-[#efebe7]'; // Ciepły beż (główny)
BG_SECTION_ALT = 'bg-[#f5f5f3]';   // Jaśniejszy beż (alternatywny)

// Komponenty
BG_CARD = 'bg-white';              // Białe karty
BG_ACCENT = 'bg-primary';          // Złote akcenty (#dfbb68)
BG_GRADIENT = 'bg-gradient-to-br from-white to-gray-50'; // Subtelne gradienty

// Tekst
TEXT_PRIMARY = 'text-gray-900';    // #1a1a1a
TEXT_SECONDARY = 'text-gray-600';
TEXT_LABEL = 'text-gray-400';      // Uppercase labels
```

### 2.3 Typografia Bento

```typescript
// Nagłówki Sekcji
HEADING_XL = 'text-4xl lg:text-5xl xl:text-6xl font-bold';
HEADING_LG = 'text-3xl lg:text-4xl font-bold';
HEADING_MD = 'text-2xl lg:text-3xl font-bold';

// Labels (SectionLabel pattern)
LABEL = 'text-xs font-bold uppercase tracking-widest text-primary';

// Body
BODY_LG = 'text-lg leading-relaxed';
BODY_MD = 'text-base leading-relaxed';
BODY_SM = 'text-sm leading-relaxed';
```

### 2.4 Spacing System

```typescript
// Section Padding
SECTION_PADDING_Y = 'py-16 sm:py-20 lg:py-24'; // Vertical
SECTION_PADDING_X = 'px-4 sm:px-6 lg:px-8';    // Horizontal

// Card Padding
CARD_PADDING_SM = 'p-6';
CARD_PADDING_MD = 'p-8 lg:p-10';
CARD_PADDING_LG = 'p-10 lg:p-12';

// Grid Gaps
GRID_GAP = 'gap-6 lg:gap-8';
```

---

## 3. KOMPONENTY BAZOWE

### 3.1 BentoGridItem (Molekuła)

**Lokalizacja:** `/components/shared/BentoGridItem.tsx`

#### Opis:
Podstawowy kontener dla komponentów Bento Grid. Obsługuje dynamiczne span kolumn i wierszy.

#### Props:
```typescript
interface BentoGridItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;  // Desktop col-span
  rowSpan?: 1 | 2 | 3 | 4;  // Desktop row-span
}
```

#### Przykład użycia:
```tsx
<BentoGridItem colSpan={2} rowSpan={3} className="flex flex-col">
  {/* Zawartość */}
</BentoGridItem>
```

#### Klasy CSS:
```css
bg-white
rounded-3xl
p-6
shadow-[0_0_20px_rgba(0,0,0,0.05)]
border border-gray-100/50
transition-all duration-300
hover:shadow-[0_0_30px_rgba(0,0,0,0.08)]
```

#### Kiedy używać:
- Kompleksowe układy grid (np. BentoContactSection)
- Komponenty wymagające różnych rozmiarów kart
- Layouty responsive (mobile: 1 col, desktop: 4 cols)

---

## 4. SEKCJE (ORGANISMS)

### 4.1 BentoContactSection

**Lokalizacja:** `/components/sections/BentoContactSection.tsx`
**Użycie:** Formularz kontaktowy z modułowym układem grid

#### Layout Grid:
```
Desktop (4 kolumny):
┌─────────────┬─────────────┬─────────────┬─────────────┐
│ Intro (2)   │ Intro (2)   │ Formularz   │ Formularz   │ Row 1
├─────────────┼─────────────┤ (2 cols,    │ (2 cols,    │
│ Phone       │ Email       │  3 rows)    │  3 rows)    │ Row 2
├─────────────┴─────────────┤             │             │
│ Mapa (2 cols, 1 row)      │             │             │ Row 3
└───────────────────────────┴─────────────┴─────────────┘

Mobile: Stack pionowy (wszystkie elementy 1 kolumna)
```

#### Kluczowe Komponenty:

1. **Intro Box (colSpan=2)**
   - Złote tło (`bg-primary`)
   - Ikona w kółku z `backdrop-blur-sm`
   - Pytanie "Masz pytania?" + opis

2. **Formularz (colSpan=2, rowSpan=3)**
   - Labels: `text-xs font-semibold uppercase tracking-wider text-gray-500`
   - Inputs: `rounded-xl border border-gray-200 bg-gray-50`
   - Focus: `focus:border-primary focus:ring-2 focus:ring-primary/20`
   - Przycisk załącz: Ikona z hover effect `group-hover/file:bg-primary/10`

3. **Phone/Email Boxes**
   - Ikona w złotym kółku (`bg-primary shadow-lg shadow-primary/30`)
   - Hover: `group cursor-pointer hover:bg-gray-50`
   - Scale animation na ikonie: `group-hover:scale-110`

4. **Mapa (colSpan=2, !p-0)**
   - Google Maps iframe w tle
   - Gradient overlay: `bg-gradient-to-t from-black/80 via-black/20 to-transparent`
   - Floating address badge na dole

#### Stylizacja Formularza:
```tsx
// Input Style
className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm
           focus:border-primary focus:bg-white focus:outline-none
           focus:ring-2 focus:ring-primary/20 transition-all font-inherit"

// Label Style
className="text-xs font-semibold uppercase tracking-wider text-gray-500 ml-1"

// Button Style
<Button variant="primary" size="lg" className="w-full mt-4 shadow-lg shadow-primary/20">
  Wyślij Wiadomość
</Button>
```

#### Props Interface:
```typescript
export interface ContactInfo {
  phone: string;
  email: string;
  address: string;
}

export interface BentoContactSectionProps {
  contactInfo: ContactInfo;
}
```

#### Kiedy używać:
- Strona `/kontakt` (główna)
- Końcowe sekcje artykułów eksperckich (CTA do kontaktu)

---

### 4.2 BentoAreasSection

**Lokalizacja:** `/components/sections/BentoAreasSection.tsx`
**Użycie:** Prezentacja obszarów działania firmy (HUBów logistycznych)

#### Layout:
```
Desktop: 2 kolumny (lg:grid-cols-2)
Mobile: Stack pionowy

┌──────────────────────────┬──────────────────────────┐
│ HUB POŁUDNIE:            │ HUB CENTRUM:             │
│ WODZISŁAW ŚLĄSKI         │ JAWORZNO                 │
│ (mountain icon)          │ (building icon)          │
│                          │                          │
│ [Description]            │ [Description]            │
│                          │                          │
│ ┌──────────────────────┐ │ ┌──────────────────────┐ │
│ │ Obszar działania:    │ │ │ Obszar działania:    │ │
│ │ [Wodzisław] [Rybnik] │ │ │ [Jaworzno] [Katowice]│ │
│ │ [Żory] [Racibórz]... │ │ │ [Tychy] [Gliwice]... │ │
│ └──────────────────────┘ │ └──────────────────────┘ │
└──────────────────────────┴──────────────────────────┘
```

#### Stylizacja Kart HUBów:

```tsx
// Główny kontener HUBa
className="bg-gradient-to-br from-white to-gray-50
           rounded-3xl p-8 lg:p-10
           border-2 border-gray-200 relative"

// Ikona HUBa
<div className="w-16 h-16 mb-6 rounded-full bg-primary/10 flex items-center justify-center">
  <Icon name={hub.iconName} className="w-9 h-9 text-primary" />
</div>

// Sub-label (nad tytułem)
className="text-xs font-extrabold uppercase tracking-[0.2em] text-primary mb-3"

// Tytuł HUBa
className="text-2xl lg:text-3xl font-bold text-[#1a1a1a] leading-tight"

// Sekcja miast (nested card)
<div className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
  <p className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
    Obszar działania
  </p>
  <div className="flex flex-wrap gap-2">
    {/* City badges */}
  </div>
</div>
```

#### Stylizacja Badge Miasta:

```tsx
<Link
  href={city.url}
  className="block px-4 py-2 bg-white text-[#1a1a1a] rounded-lg
             font-semibold text-sm border border-gray-200
             transition-all
             hover:bg-primary hover:text-white hover:border-primary hover:shadow-md
             text-center"
>
  {city.label}
</Link>
```

#### Props Interface:
```typescript
interface City {
  label: string;
  url: string;
}

interface Hub {
  hubName: string;
  subLabel: string;
  iconName: 'mountain' | 'building';
  isHeadquarters: boolean;
  description: string;
  cities: City[];
}

interface BentoAreasSectionProps {
  header: {
    label: string;
    title: string;
    description: string;
  };
  hubs: Hub[];
}
```

#### Kiedy używać:
- **Główne użycie:** Na końcu artykułów lokalnych (np. "Budowa domów Wodzisław Śląski")
- **Cel:** Pokazanie zasięgu firmy i linkowanie do innych lokalizacji
- **SEO:** Internal linking do stron lokalizacyjnych

---

### 4.3 BentoOfferSection

**Lokalizacja:** `/components/sections/BentoOfferSection.tsx`
**Użycie:** Prezentacja ofert z nawigacją poziomą i pionową (scrollspy)

#### Unikalne Cechy:

1. **Dual Navigation System:**
   - **Top Navigation:** Horizontal, znika przy scrollu
   - **Side Navigation:** Vertical sticky, pojawia się gdy top znika
   - **Smooth transition:** `transition-all duration-700 ease-out`

2. **Scrollspy Active Detection:**
   - Automatyczna detekcja aktywnego wariantu przy scrollu
   - Synchronizacja obu nawigacji
   - Offset dla lepszego UX: `window.scrollY + window.innerHeight / 3`

3. **Layout:**
   ```
   ┌─────────────────────────────────────────┐
   │ Top Navigation (horizontal, 4 ikony)   │ ← Znika przy scrollu
   └─────────────────────────────────────────┘

   ┌──────────┬────────────────────────────────┐
   │ Side Nav │ Variant 1: Audyt Działki       │
   │ (sticky) │ [Image right, text left]       │
   │          ├────────────────────────────────┤
   │ [Icon 1] │ Variant 2: Fundamenty          │
   │ [Icon 2] │ [Image right, text left]       │
   │ [Icon 3] │ ├────────────────────────────────┤
   │ [Icon 4] │ Variant 3: Dokumentacja        │
   │          │ [Image right, text left]       │
   │          ├────────────────────────────────┤
   │          │ Variant 4: Monitoring          │
   │          │ [Image right, text left]       │
   └──────────┴────────────────────────────────┘
   ```

#### Scrollspy Logic:

```typescript
useEffect(() => {
  const handleScroll = () => {
    // 1. Show/Hide Side Navigation
    if (topNavRef.current && sectionRef.current) {
      const topNavRect = topNavRef.current.getBoundingClientRect();
      const sectionRect = sectionRef.current.getBoundingClientRect();

      setShowSideNav(
        topNavRect.bottom < 0 &&
        sectionRect.bottom > window.innerHeight / 2
      );
    }

    // 2. Update Active Variant (Scrollspy)
    const scrollPosition = window.scrollY + window.innerHeight / 3;

    for (const variant of offerVariants) {
      const element = variantRefs.current[variant.id];
      if (element) {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementBottom = elementTop + rect.height;

        if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
          setActiveVariant(variant.id);
          break;
        }
      }
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);
```

#### Stylizacja Top Navigation:

```tsx
// Container (znika przy scrollu)
<div className={`mb-12 transition-all duration-500
                 ${showSideNav ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>

  // White card
  <nav className="bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100">

    // Horizontal line (łączy ikony)
    <div className="hidden md:block absolute top-6 md:top-7 left-0 right-0
                    h-0.5 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20"
         style={{ margin: '0px 7%' }} />

    // Grid 4 kolumny
    <div className="relative grid grid-cols-4 gap-3 md:gap-4">
      {/* Icon circles */}
    </div>
  </nav>
</div>
```

#### Stylizacja Side Navigation:

```tsx
// Sticky wrapper (pojawia się przy scrollu)
<div className={`hidden xl:block w-64 flex-shrink-0
                 transition-all duration-700 ease-out -ml-[200px]
                 ${showSideNav
                   ? 'opacity-100 translate-x-0'
                   : 'opacity-0 -translate-x-8 pointer-events-none'}`}>

  <nav className="sticky top-24 bg-white rounded-3xl shadow-xl p-6 border border-gray-100">
    <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6">
      Nasze Usługi
    </h3>

    <div className="space-y-3">
      {offerVariants.map((variant, index) => (
        <a
          href={`#${variant.id}`}
          className={`group flex items-center gap-4 p-4 rounded-2xl transition-all duration-300
                      ${isActive
                        ? 'bg-primary text-white shadow-lg shadow-primary/30 scale-105'
                        : 'hover:bg-gray-50 text-gray-600'}`}
          style={{ transitionDelay: showSideNav ? `${index * 50}ms` : '0ms' }} // Staggered animation
        >
          {/* Icon + Label + Active indicator */}
        </a>
      ))}
    </div>
  </nav>
</div>
```

#### Stylizacja Variant Card:

```tsx
<div className="min-h-[600px] bg-white rounded-3xl overflow-hidden
                flex flex-col lg:flex-row shadow-lg">

  {/* Text Section (60%, order-2 on mobile, order-1 on desktop) */}
  <div className="p-8 lg:p-12 flex-1 flex flex-col justify-center order-2 lg:order-1">
    <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
      {variant.title}
    </h3>

    <p className="mb-6 text-lg font-medium text-gray-900">
      {variant.subtitle}
    </p>

    <p className="mb-8 text-base leading-relaxed text-gray-600">
      {variant.description}
    </p>

    {/* Features with checkmarks */}
    <div className="grid grid-cols-1 gap-5 mb-8">
      {variant.features.map((feature, idx) => (
        <div className="flex items-start gap-3">
          <Icon name="check" className="text-primary mt-1 shrink-0" size="md" />
          <span className="text-base">{feature.text}</span>
        </div>
      ))}
    </div>

    {/* Callout (italic quote) */}
    <p className="text-base italic border-l-4 border-primary pl-6 py-2
                  bg-primary/5 mb-8">
      {variant.callout}
    </p>

    {/* CTA Link (styled as button) */}
    <Link href={variant.ctaHref}
          className="group/btn flex items-center justify-between w-full sm:w-auto
                     bg-gray-50 hover:bg-primary/5 border border-gray-200
                     hover:border-primary/30 rounded-xl p-5 transition-all duration-300">
      <div>
        <span className="block text-sm font-extrabold text-gray-900 uppercase tracking-wide
                         mb-1 group-hover/btn:text-primary transition-colors">
          {variant.ctaText}
        </span>
        <span className="block text-base font-medium text-gray-600
                         group-hover/btn:text-gray-900 transition-colors">
          Dowiedz się więcej
        </span>
      </div>

      {/* Arrow icon */}
      <div className="w-10 h-10 rounded-full bg-white border border-gray-200
                      flex items-center justify-center
                      group-hover/btn:border-primary group-hover/btn:bg-primary
                      group-hover/btn:text-white transition-all shadow-sm">
        <Icon name="arrowRight" size="sm" />
      </div>
    </Link>
  </div>

  {/* Image Section (40%, order-1 on mobile, order-2 on desktop) */}
  <div className="relative w-full lg:w-2/5 h-80 lg:h-auto overflow-hidden order-1 lg:order-2">
    <Image src={variant.imageSrc} alt={variant.title} fill className="object-cover" />

    {/* Floating badge (top-left) */}
    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm
                    px-5 py-3 rounded-full flex items-center gap-3 shadow-sm">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center
                      text-white text-sm font-bold">
        {index + 1}
      </div>
      <span className="text-base font-bold text-gray-900">{variant.label}</span>
    </div>
  </div>
</div>
```

#### Kiedy używać:
- **Artykuły eksperckie** - sekcja "Proces krok po kroku" (np. "Jak przygotować działkę pod budowę")
- **Landing pages usług** - prezentacja etapów realizacji
- **Strony kategorii** - pokazanie wariantów oferty

---

### 4.4 BentoNavigation (Molekuła z 4 Wariantami)

**Lokalizacja:** `/components/shared/BentoNavigation.tsx`
**Użycie:** Reużywalna nawigacja timeline/procesu z ikonami

#### 4 Warianty Wizualne:

##### **V1: Clean & Minimal** (Domyślny)
- Białe tło, subtelna linia łącząca ikony
- Border na ikonach (`border-2`)
- Aktywna: Złota z cieniem (`shadow-lg shadow-primary/30 scale-110`)

```tsx
<BentoNavigation items={items} activeId="step-1" variant="v1" />

// Stylizacja
bg-white rounded-3xl shadow-lg p-6 md:p-8 border border-gray-100
```

##### **V2: Bold & Colorful**
- Gradient tło, grubsza złota linia
- Rounded-square ikony (`rounded-2xl`)
- Aktywna: Gradient + rotacja 3deg

```tsx
<BentoNavigation items={items} activeId="step-2" variant="v2" />

// Stylizacja
bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl shadow-xl
border-2 border-gray-200
```

##### **V3: Minimal & Flat**
- Płaskie tło (gray-50), brak cieni
- Brak borders, prostokąty zamiast kół
- Aktywna: Wypełnione tło primary

```tsx
<BentoNavigation items={items} activeId="step-3" variant="v3" />

// Stylizacja
bg-gray-50 rounded-3xl p-6 md:p-8
```

##### **V4: Premium & Elegant** (Dark Mode)
- Ciemne tło (`bg-gradient-to-br from-gray-900 to-gray-800`)
- Białe/złote ikony z glow effect
- Aktywna: Ring offset (`ring-2 ring-primary/30 ring-offset-2`)

```tsx
<BentoNavigation items={items} activeId="step-4" variant="v4" />

// Stylizacja
bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl
border border-gray-700
```

#### Props Interface:

```typescript
interface NavigationItem {
  id: string;       // Anchor link (np. "step-1")
  icon: IconName;   // Ikona z Icon.tsx
  label: string;    // Krótki tekst pod ikoną
  href: string;     // URL (smooth scroll anchor)
}

interface BentoNavigationProps {
  items: NavigationItem[];
  activeId?: string;           // Aktywny element (dla scrollspy)
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}
```

#### Kiedy używać który wariant:

| Wariant | Kontekst | Przykład |
|---------|----------|----------|
| **V1** | Strony usług, artykuły eksperckie | CooperationTimeline w `/oferta/[slug]` |
| **V2** | Landing pages, promocje | Specjalna oferta z wyróżnionym procesem |
| **V3** | Minimalistyczne strony, blogi | Artykuły techniczne z krokami |
| **V4** | Premium services, high-end | Ekskluzywne usługi, portfolio projektów |

#### Klasy Wspólne (wszystkie warianty):

```tsx
// Container
<nav className="mb-12 md:mb-16" aria-label="Nawigacja sekcji">

// Grid (4 kolumny mobile, 8 desktop)
<div className="relative grid grid-cols-4 md:grid-cols-8 gap-3 md:gap-4">

// Linia łącząca (hidden na mobile)
<div className="hidden md:block absolute top-6 md:top-7 left-0 right-0 h-0.5 ..."
     style={{ margin: '0px 7%' }} />

// Link (każdy item)
<a href={item.href} className="flex flex-col items-center gap-2 group">

// Icon circle (różne style w zależności od wariantu)
<div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 ...">
  <Icon name={item.icon} className="w-5 h-5 md:w-6 md:h-6" />
</div>

// Label (pod ikoną)
<span className="text-xs md:text-sm font-semibold text-center leading-tight">
  {item.label}
</span>
```

---

### 4.5 BentoCTASection (4 Warianty)

**Lokalizacja:** `/components/sections/BentoCTASection.tsx`
**Użycie:** Call-to-action z benefitami konsultacji

#### Props Interface:

```typescript
interface CTABenefit {
  text: string;
}

interface BentoCTASectionProps {
  title: string;           // "Umów Konsultację Techniczną"
  subtitle: string;        // "Podczas konsultacji:"
  benefits: CTABenefit[];  // 3-4 bullet pointy
  disclaimer: string;      // "Konsultacja jest bezpłatna..."
  phoneText: string;       // "Zadzwoń do Nas"
  phoneHref: string;       // "tel:+48..."
  emailText: string;       // "Napisz do Nas"
  emailHref: string;       // "mailto:..."
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}
```

#### 4 Warianty Wizualne:

##### **V1: Centered Card** (Domyślny)
Wyśrodkowana biała karta na beżowym tle, benefity z checkmarkami.

```tsx
<BentoCTASection {...ctaData} variant="v1" />

Layout:
┌─────────────────────────────────────┐
│ [Icon]                              │
│ Title                               │
│ Subtitle                            │
│                                     │
│ ✓ Benefit 1                         │
│ ✓ Benefit 2                         │
│ ✓ Benefit 3                         │
│                                     │
│ Disclaimer (italic)                 │
│                                     │
│ [Button Phone] [Button Email]       │
└─────────────────────────────────────┘
```

**Stylizacja:**
```tsx
// Container
<div className="bg-white rounded-3xl p-10 lg:p-12 shadow-xl border border-gray-100">

// Icon
<div className="inline-flex items-center justify-center w-16 h-16
                bg-primary/10 rounded-full mb-4">

// Benefits
<div className="flex items-start gap-3">
  <Icon name="check" className="w-6 h-6 text-primary mt-0.5 flex-shrink-0" />
  <p className="text-base text-gray-700">{benefit.text}</p>
</div>
```

##### **V2: Split Layout**
Benefity po lewej, CTA na złotym tle po prawej (50/50).

```tsx
<BentoCTASection {...ctaData} variant="v2" />

Layout:
┌──────────────────┬──────────────────┐
│ Title            │ [Icon]           │
│ Subtitle         │ Disclaimer       │
│                  │                  │
│ ✓ Benefit 1      │ [Button Phone]   │
│ ✓ Benefit 2      │ [Button Email]   │
│ ✓ Benefit 3      │                  │
└──────────────────┴──────────────────┘
 Gradient bg        Gold bg (primary)
```

**Stylizacja:**
```tsx
// Grid 2 kolumny
<div className="grid lg:grid-cols-2 gap-0">

// Lewa strona (gradient)
<div className="p-10 lg:p-12 bg-gradient-to-br from-gray-50 to-white">

// Prawa strona (złota)
<div className="p-10 lg:p-12 bg-primary flex flex-col justify-center">
```

##### **V3: Compact Horizontal**
Wszystko w jednej linii (icon + text + buttons), złote tło gradient.

```tsx
<BentoCTASection {...ctaData} variant="v3" />

Layout (desktop):
┌──────────┬─────────────────────────────┬─────────────────┐
│ [Icon]   │ Title + Subtitle            │ [Phone] [Email] │
└──────────┴─────────────────────────────┴─────────────────┘
```

**Stylizacja:**
```tsx
// Container (horizontal flex)
<div className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl
                p-8 lg:p-10 shadow-xl">
  <div className="flex flex-col lg:flex-row items-center gap-8">
    {/* Icon, Content, Buttons */}
  </div>
</div>
```

##### **V4: Grid Cards**
Każdy benefit jako osobna karta (2×2 grid).

```tsx
<BentoCTASection {...ctaData} variant="v4" />

Layout:
┌─────────────────────────────────────┐
│ Title                               │
│ Subtitle                            │
│                                     │
│ ┌─────────────┬─────────────┐       │
│ │ ✓ Benefit 1 │ ✓ Benefit 2 │       │
│ ├─────────────┼─────────────┤       │
│ │ ✓ Benefit 3 │ ✓ Benefit 4 │       │
│ └─────────────┴─────────────┘       │
│                                     │
│ Disclaimer                          │
│ [Button Phone] [Button Email]       │
└─────────────────────────────────────┘
```

**Stylizacja:**
```tsx
// Grid benefitów
<div className="grid sm:grid-cols-2 gap-4 mb-8">
  {benefits.map((benefit, idx) => (
    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl
                    border border-gray-100 hover:border-primary/30 transition-all">
      {/* Icon + Text */}
    </div>
  ))}
</div>
```

#### Kiedy używać który wariant:

| Wariant | Kontekst | Przykład |
|---------|----------|----------|
| **V1** | Artykuły eksperckie, blog posty | Końcowe CTA w artykule "Jak przygotować działkę" |
| **V2** | Landing pages z dużą ilością treści | Strona usługi z długim opisem |
| **V3** | Sticky footer, floating CTA | Kompaktowy banner na dole strony |
| **V4** | Strony z wieloma benefitami | 4+ punkty do podkreślenia |

---

### 4.6 BentoHeroSection (4 Warianty)

**Lokalizacja:** `/components/sections/BentoHeroSection.tsx`
**Użycie:** Hero sekcja z obrazem, tekstem i statystykami

#### Props Interface:

```typescript
interface HeroData {
  title: string;
  subtitle: string;       // Label nad tytułem
  description: string;
  ctaText: string;
  ctaHref: string;
  imageSrc: string;
  stats?: {              // Opcjonalne statystyki (3 max)
    value: string;       // "500+"
    label: string;       // "Zrealizowanych Projektów"
  }[];
}

interface BentoHeroSectionProps {
  data: HeroData;
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}
```

#### 4 Warianty Wizualne:

##### **V1: Split Screen** (Domyślny)
Tekst po lewej, obraz po prawej (50/50).

```tsx
<BentoHeroSection data={heroData} variant="v1" />

Layout:
┌──────────────────────┬──────────────────────┐
│ Subtitle (label)     │                      │
│ Title (H1)           │                      │
│ Description          │      Image           │
│                      │      (full)          │
│ [Stats] [Stats]      │                      │
│ [CTA Button]         │                      │
└──────────────────────┴──────────────────────┘
```

##### **V2: Overlay**
Tekst nad obrazem z gradientem.

```tsx
<BentoHeroSection data={heroData} variant="v2" />

Layout:
┌────────────────────────────────────────────┐
│                                            │
│ Subtitle (label)                           │
│ Title (H1, white)                          │
│ Description (white)                        │
│                                            │
│ [Stats glass card] [Stats glass card]     │
│ [CTA Button]                               │
│                                            │
└────────────────────────────────────────────┘
           Background Image + Gradient
```

**Stylizacja:**
```tsx
// Gradient overlay (left to right fade)
<div className="absolute inset-0 bg-gradient-to-r
                from-gray-900/95 via-gray-900/70 to-transparent" />

// Stats glass card
<div className="bg-white/10 backdrop-blur-sm px-6 py-4 rounded-xl
                border border-white/20">
```

##### **V3: Asymmetric**
Duży obraz z floating content card.

```tsx
<BentoHeroSection data={heroData} variant="v3" />

Layout:
┌────────────────────────────────────────────┐
│                                            │
│  ┌──────────────────┐                      │
│  │ Subtitle         │                      │
│  │ Title            │                      │
│  │ Description      │    Background        │
│  │                  │      Image           │
│  │ [Stats] [Stats]  │                      │
│  │ [CTA Button]     │                      │
│  └──────────────────┘                      │
│                                            │
└────────────────────────────────────────────┘
   Floating white card (max-w-2xl)
```

**Stylizacja:**
```tsx
// Floating card
<div className="absolute inset-0 flex items-center justify-start p-12 lg:p-16">
  <div className="bg-white rounded-3xl p-10 lg:p-12 max-w-2xl shadow-2xl">
    {/* Content */}
  </div>
</div>
```

##### **V4: Stacked**
Obraz na górze, content na dole z overlappingiem.

```tsx
<BentoHeroSection data={heroData} variant="v4" />

Layout:
┌────────────────────────────────────────────┐
│                                            │
│          Image (h-96)                      │
│          + gradient fade                   │
│                                            │
├────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐  │ ← -mt-32 (overlap)
│  │ Subtitle + Title + Description       │  │
│  │                                      │  │
│  │ [Stats]  [Stats]  [Stats]  [Button] │  │
│  └──────────────────────────────────────┘  │
└────────────────────────────────────────────┘
```

**Stylizacja:**
```tsx
// Gradient fade na obrazie
<div className="absolute inset-0 bg-gradient-to-b
                from-transparent via-transparent to-white" />

// Content card (overlapping)
<div className="relative -mt-32 px-12 lg:px-16 pb-12 lg:pb-16">
  <div className="bg-white rounded-3xl p-10 lg:p-12 shadow-2xl border border-gray-100">
```

#### Kiedy używać który wariant:

| Wariant | Kontekst | Przykład |
|---------|----------|----------|
| **V1** | Standard hero, strony główne | Homepage, landing pages |
| **V2** | Dramatyczne obrazy tła | Portfolio projektów, case studies |
| **V3** | Focus na tekst + piękny obraz | Landing pages z długim opisem |
| **V4** | Modern magazine style | Blog, artykuły, strony kategorii |

---

### 4.7 BentoKnowledgeSection

**Lokalizacja:** `/components/sections/BentoKnowledgeSection.tsx`
**Użycie:** Grid 2×2 kart artykułów/wiedzy eksperckiej

#### Props Interface:

```typescript
interface KnowledgeArticle {
  icon: IconName;
  title: string;
  desc: string;
  href: string;
  highlight?: boolean;  // Jeśli true, border primary od razu (bez hover)
}

interface BentoKnowledgeSectionProps {
  header: {
    label: string;
    title: string;
    description: string;
  };
  articles: KnowledgeArticle[];  // Ideally 4 items (2×2 grid)
}
```

#### Layout:

```
Desktop (2×2):
┌──────────────────────┬──────────────────────┐
│ [Icon]               │ [Icon]               │
│ Title                │ Title                │
│ Description...       │ Description...       │
│ Czytaj więcej →      │ Czytaj więcej →      │
├──────────────────────┼──────────────────────┤
│ [Icon]               │ [Icon]               │
│ Title                │ Title                │
│ Description...       │ Description...       │
│ Czytaj więcej →      │ Czytaj więcej →      │
└──────────────────────┴──────────────────────┘

Mobile: Stack pionowy
```

#### Stylizacja Karty:

```tsx
<Link
  href={article.href}
  className={`
    bg-white rounded-3xl p-8
    border
    ${article.highlight ? 'border-primary' : 'border-gray-100'}
    hover:border-primary
    shadow-sm
    hover:shadow-[0_10px_40px_-10px_rgba(26,26,26,0.1)]
    transition-all duration-300
    group
    flex flex-col
  `}
>
  {/* Icon Circle */}
  <div className={`
    w-14 h-14 rounded-full mb-6
    flex items-center justify-center
    ${article.highlight
      ? 'bg-primary text-white'
      : 'bg-[#fafaf9] text-primary group-hover:bg-primary group-hover:text-white'
    }
    transition-all duration-300
  `}>
    <Icon name={article.icon} className="w-6 h-6" />
  </div>

  {/* Title */}
  <h3 className="text-xl lg:text-2xl font-bold text-[#1a1a1a] mb-3 leading-tight
                 group-hover:text-primary transition-colors">
    {article.title}
  </h3>

  {/* Description */}
  <p className="text-gray-600 text-sm lg:text-base leading-relaxed flex-grow">
    {article.desc}
  </p>

  {/* Read More Arrow */}
  <div className="mt-6 flex items-center gap-2 text-primary font-semibold text-sm">
    <span>Czytaj więcej</span>
    <Icon name="arrowRight" className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
  </div>
</Link>
```

#### Kiedy używać:
- **Homepage** - sekcja "Baza Wiedzy" lub "Artykuły Eksperckie"
- **Blog category page** - Grid featured articles
- **Footer replacement** - Zamiast tradycyjnych linków, wizualne karty

#### Highlight Pattern:
Użyj `highlight: true` dla najważniejszego artykułu (featured):
```typescript
articles: [
  { icon: 'fileText', title: 'Przewodnik...', highlight: true, ... },
  { icon: 'hammer', title: 'Technologie...', highlight: false, ... },
  // ...
]
```

---

### 4.8 BentoTitleHero (Molekuła z 4 Wariantami)

**Lokalizacja:** `/components/shared/BentoTitleHero.tsx`
**Użycie:** Alternatywny tytuł hero z watermarkiem (do użycia w PageHeader)

#### Props Interface:

```typescript
interface BentoTitleHeroProps {
  title: string;      // Główny tytuł (H1)
  watermark: string;  // Duży outline text w tle (dekoracja)
  variant?: 'v1' | 'v2' | 'v3' | 'v4';
}
```

#### 4 Warianty Wizualne:

##### **V1: Side by Side** (Domyślny)
Tytuł po lewej, watermark po prawej.

```tsx
<BentoTitleHero title="Nasza Oferta" watermark="OFERTA" variant="v1" />

Layout:
┌──────────────────────────────────────────┐
│ Nasza Oferta        O F E R T A          │
│ (solid white)       (outline, transparent)│
└──────────────────────────────────────────┘
```

##### **V2: Stacked**
Watermark jako duże tło, tytuł nad nim.

```tsx
<BentoTitleHero title="Projektowanie" watermark="PROJEKT" variant="v2" />

Layout:
┌──────────────────────────────────────────┐
│         P R O J E K T                    │ ← Huge outline (background)
│         (opacity-30)                      │
│                                          │
│ Projektowanie                            │ ← Solid title (foreground)
└──────────────────────────────────────────┘
```

##### **V3: Diagonal**
Watermark obrócony -12deg za tytułem.

```tsx
<BentoTitleHero title="Budowa" watermark="BUDOWA" variant="v3" />

Layout:
┌──────────────────────────────────────────┐
│    B U D O W A (diagonal, -12deg)       │
│                                          │
│ Budowa                                   │
└──────────────────────────────────────────┘
```

##### **V4: Vertical**
Watermark jako pionowy text (writing-mode).

```tsx
<BentoTitleHero title="Nadzór" watermark="NADZÓR" variant="v4" />

Layout:
┌──────────────────────────────────────────┐
│ N │ Nadzór                               │
│ A │                                      │
│ D │                                      │
│ Z │                                      │
│ Ó │                                      │
│ R │                                      │
└──────────────────────────────────────────┘
```

#### Wspólne Style:

```tsx
// Watermark (outline text)
style={{
  WebkitTextStroke: '2px rgba(255, 255, 255, 0.5)',
  color: 'transparent'
}}
aria-hidden="true"  // Nie czytane przez screen readery
```

#### Kiedy używać:
**Obecnie NIE używane w głównym projekcie** - PageHeader ma własny watermark.
Potencjalne użycie: Landing pages z różnymi stylami hero.

---

## 5. SYSTEM WARIANTÓW

### 5.1 Filozofia Wariantów

Każdy komponent Bento Grid ma **4 warianty wizualne** (v1-v4):
- **v1:** Domyślny, clean & minimal
- **v2:** Bold & colorful (lub Split layout)
- **v3:** Minimal & flat (lub Compact)
- **v4:** Premium & elegant (lub Grid cards)

### 5.2 Kiedy Używać Wariantów

#### Kontekst Strony:

| Typ Strony | Rekomendowany Wariant | Dlaczego |
|------------|----------------------|----------|
| **Homepage** | v1 (clean) | Nie przytłacza, elegancki |
| **Landing Page** | v2 (bold) | Wyróżnia się, przyciąga wzrok |
| **Blog/Artykuły** | v3 (minimal) | Fokus na treści, nie na UI |
| **Premium Services** | v4 (elegant) | Luksusowy wygląd, wysokiej jakości |

#### Kombinacje Wariantów na Jednej Stronie:

✅ **DOBRE:**
- Homepage: v1 (Hero) + v1 (Contact) + v3 (Knowledge)
- Landing: v2 (Hero) + v2 (Offer) + v1 (CTA)
- Article: v3 (Navigation) + v1 (CTA)

❌ **ZŁE:**
- Mixing v2 + v4 na jednej stronie (zbyt dużo wizualnego "hałasu")
- Wszystkie sekcje v1 (monotonia)

### 5.3 Implementacja Wariantów w Props

Wszystkie komponenty z wariantami używają tego samego pattern:

```typescript
interface ComponentProps {
  // ... inne props
  variant?: 'v1' | 'v2' | 'v3' | 'v4';  // Opcjonalny, default v1
}

export const Component: React.FC<ComponentProps> = ({ variant = 'v1', ...props }) => {

  if (variant === 'v1') {
    return (/* Wariant 1 JSX */);
  }

  if (variant === 'v2') {
    return (/* Wariant 2 JSX */);
  }

  // ...

  return null;  // Fallback
};
```

---

## 6. PROCEDURA IMPLEMENTACJI

### 6.1 Plan Migracji (3 Fazy)

#### **FAZA 1: Setup i Przygotowanie**

**Cel:** Przenieść komponenty Bento do głównego projektu bez breaking changes.

**Kroki:**
1. ✅ **Dodać nowe komponenty** do `/components/sections/` i `/components/shared/`
   - BentoContactSection.tsx
   - BentoAreasSection.tsx
   - BentoOfferSection.tsx
   - BentoCTASection.tsx
   - BentoHeroSection.tsx
   - BentoKnowledgeSection.tsx
   - BentoNavigation.tsx
   - BentoTitleHero.tsx
   - BentoGridItem.tsx

2. ✅ **Zaktualizować eksporty** w `/components/sections/index.ts` i `/components/shared/index.ts`
   ```typescript
   // /components/sections/index.ts
   export * from './BentoContactSection';
   export * from './BentoAreasSection';
   export * from './BentoOfferSection';
   export * from './BentoCTASection';
   export * from './BentoHeroSection';
   export * from './BentoKnowledgeSection';

   // /components/shared/index.ts
   export * from './BentoNavigation';
   export * from './BentoTitleHero';
   export * from './BentoGridItem';
   ```

3. ✅ **Dodać nowe ikony** (jeśli używane w Bento, a nie ma w Icon.tsx)
   - Sprawdzić `Icon.tsx` czy ma wszystkie ikony z `lucide-react`
   - Dodać brakujące: `type`, `paperclip`, itp.

4. ✅ **Przetestować na `/kontakt-new`**
   - Upewnić się, że strona `/kontakt-new` działa bez błędów
   - Build test: `npm run build`

#### **FAZA 2: Implementacja Stopniowa (Strona po Stronie)**

**Strategia:** Migrować po jednej stronie naraz, testując każdą zmianę.

**Kolejność migracji:**

1. **Strona Kontakt (`/kontakt`)**
   - Zamienić obecny ContactSection → BentoContactSection
   - Props mapping (stare → nowe)
   - Test: Formularz działa, mapa się ładuje

2. **Artykuły Lokalne (`/obszar-dzialania/[slug]`)**
   - Dodać BentoAreasSection na końcu artykułu
   - Data: Przygotować dane dla 2 HUBów (Wodzisław, Jaworzno)
   - Test: Linki do miast działają, SEO internal linking

3. **Artykuły Eksperckie (`/blog/[slug]` lub `/wiedza/[slug]`)**
   - Dodać BentoOfferSection jako "Proces krok po kroku"
   - Zamienić obecne timeline → BentoNavigation (v1 lub v3)
   - Dodać BentoCTASection na końcu (v1)
   - Test: Scrollspy działa, nawigacja smooth scroll

4. **Strony Usług (`/oferta/[slug]`)**
   - Rozważyć zamianę CooperationTimelineSection → BentoOfferSection
   - Lub dodać BentoNavigation jako alternatywę do TimelineNav
   - Test: Nie zepsuć istniejących stron usług

5. **Homepage (`/`)**
   - Dodać BentoKnowledgeSection jako nowa sekcja "Baza Wiedzy"
   - Lub zamienić BlogSection → BentoKnowledgeSection
   - Test: Grid responsywny, karty klikalne

#### **FAZA 3: Optymalizacja i Refaktoryzacja**

**Cel:** Usunąć stare komponenty i zunifikować kod.

**Kroki:**

1. **Audyt komponentów**
   - Znaleźć wszystkie nieużywane stare komponenty
   - Lista komponentów do usunięcia (z CLAUDE.md sekcja 8.2)

2. **Deprecation notices**
   - Dodać komentarze `@deprecated` w starych komponentach
   ```typescript
   /**
    * @deprecated Use BentoContactSection instead
    */
   export const ContactSection = ...
   ```

3. **Stopniowe usuwanie**
   - Usunąć stare komponenty TYLKO gdy wszystkie użycia zastąpione
   - Grep search przed usunięciem: `grep -r "ContactSection" app/`

4. **Update dokumentacji**
   - Dodać sekcję "Bento Grid Components" do CLAUDE.md
   - Zaktualizować mapę komponentów (sekcja 8)

### 6.2 Checklist przed Wdrożeniem

#### Przed migracją każdej strony:

- [ ] Przeczytać aktualny kod strony
- [ ] Zidentyfikować komponenty do zastąpienia
- [ ] Przygotować dane (props) dla nowych komponentów
- [ ] Stworzyć backup (git commit przed zmianami)
- [ ] Zmienić komponenty
- [ ] Test lokalny (`npm run dev`)
- [ ] Build test (`npm run build`)
- [ ] Manual QA (responsywność, interakcje)
- [ ] Git commit z opisem zmian

#### Przed merge do main:

- [ ] Wszystkie testy przechodzą
- [ ] Brak błędów TypeScript
- [ ] Brak console.error w przeglądarce
- [ ] Mobile responsiveness OK
- [ ] Accessibility check (keyboard navigation, screen reader)
- [ ] Performance check (Lighthouse score)
- [ ] SEO check (meta tags, heading hierarchy)

### 6.3 Rollback Plan

Jeśli coś pójdzie nie tak:

1. **Git revert**
   ```bash
   git revert HEAD  # Cofnij ostatni commit
   git push origin main
   ```

2. **Feature flag (opcjonalnie)**
   - Dodać flag w `.env`: `ENABLE_BENTO_GRID=false`
   - Warunkowe renderowanie:
   ```tsx
   {process.env.ENABLE_BENTO_GRID === 'true'
     ? <BentoContactSection />
     : <ContactSection />}
   ```

3. **Stara wersja jako fallback**
   - Zachować stare komponenty jako `ComponentOLD.tsx`
   - Szybkie przełączenie importu w razie błędu

---

## 7. MIGRACJA KOMPONENTÓW

### 7.1 Mapowanie: Stare → Nowe

| Stary Komponent | Nowy Komponent Bento | Trudność | Notatki |
|----------------|---------------------|----------|---------|
| **ContactCTASection** | BentoCTASection (v1) | 🟢 Łatwa | Props niemal identyczne |
| **ContactSection** | BentoContactSection | 🟡 Średnia | Layout grid wymaga uwagi |
| **TimelineNav** | BentoNavigation (v1) | 🟢 Łatwa | Drop-in replacement |
| **ProcessInfographic** | BentoOfferSection | 🔴 Trudna | Scrollspy + dual nav |
| **BlogSection** | BentoKnowledgeSection | 🟢 Łatwa | Grid 2×2 zamiast slider |
| **HeroSection** | BentoHeroSection (v1) | 🟡 Średnia | Stats opcjonalne |

### 7.2 Przykład Migracji: ContactSection → BentoContactSection

#### **Stary kod:**

```tsx
// /app/kontakt/page.tsx (OLD)
import { ContactSection } from '@/components/sections';

export default function ContactPage() {
  return (
    <>
      <PageHeader {...headerData} />
      <ContactSection />
    </>
  );
}
```

#### **Nowy kod:**

```tsx
// /app/kontakt/page.tsx (NEW)
import { BentoContactSection, ContactInfo } from '@/components/sections';

export default function ContactPage() {
  const contactInfo: ContactInfo = {
    phone: "+48 573 568 300",
    email: "biuro@thebuilders.pl",
    address: "ul. Wałowa 55, 44-300 Wodzisław Śląski",
  };

  return (
    <>
      <PageHeader {...headerData} />
      <BentoContactSection contactInfo={contactInfo} />
    </>
  );
}
```

#### **Props Mapping:**

| Stare Props | Nowe Props | Transformacja |
|------------|-----------|---------------|
| Brak (hardcoded w komponencie) | `contactInfo: ContactInfo` | Wyciągnąć dane do props |

### 7.3 Przykład Migracji: TimelineNav → BentoNavigation

#### **Stary kod:**

```tsx
// /components/sections/CooperationTimelineSection.tsx (OLD)
import { TimelineNav } from '@/components/shared';

<TimelineNav
  items={navItems}
  activeId={activeStep}
/>
```

#### **Nowy kod:**

```tsx
// /components/sections/CooperationTimelineSection.tsx (NEW)
import { BentoNavigation } from '@/components/shared';

<BentoNavigation
  items={navItems}
  activeId={activeStep}
  variant="v1"  // Wybierz wariant (v1-v4)
/>
```

#### **Props Mapping:**

| Stare Props | Nowe Props | Transformacja |
|------------|-----------|---------------|
| `items` | `items` | **Bez zmian** |
| `activeId` | `activeId` | **Bez zmian** |
| N/A | `variant` | **NOWE:** Wybierz v1-v4 |

**✅ DROP-IN REPLACEMENT** - dodaj tylko `variant` prop.

### 7.4 Przykład Migracji: BlogSection → BentoKnowledgeSection

#### **Stary kod:**

```tsx
// /app/page.tsx (OLD)
import { BlogSection } from '@/components/sections';

<BlogSection />  // Slider z artykułami
```

#### **Nowy kod:**

```tsx
// /app/page.tsx (NEW)
import { BentoKnowledgeSection } from '@/components/sections';

const knowledgeArticles = [
  {
    icon: 'fileText',
    title: 'Przewodnik po Budowie Domu',
    desc: 'Wszystko co musisz wiedzieć zanim zaczniesz budować swój dom.',
    href: '/wiedza/przewodnik-budowa-domu',
    highlight: true,
  },
  {
    icon: 'hammer',
    title: 'Nowoczesne Technologie Budowlane',
    desc: 'Poznaj najnowsze rozwiązania technologiczne w budownictwie.',
    href: '/wiedza/technologie-budowlane',
  },
  // ... 2 more articles for 2×2 grid
];

<BentoKnowledgeSection
  header={{
    label: 'BAZA WIEDZY',
    title: 'Artykuły Eksperckie',
    description: 'Praktyczna wiedza z zakresu projektowania i budowy domów.',
  }}
  articles={knowledgeArticles}
/>
```

#### **Props Mapping:**

| Stare Props | Nowe Props | Transformacja |
|------------|-----------|---------------|
| Brak (hardcoded) | `header` | Przygotować dane nagłówka |
| Brak | `articles` | **Nowe:** Array 4 artykułów |

### 7.5 Przykład Dodania: BentoAreasSection w Artykułach Lokalnych

#### **Stary kod:**

```tsx
// /app/obszar-dzialania/[slug]/page.tsx (OLD)
export default function AreaPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader {...headerData} />
      <ArticleContent />
      {/* Brak sekcji zasięgu */}
    </>
  );
}
```

#### **Nowy kod:**

```tsx
// /app/obszar-dzialania/[slug]/page.tsx (NEW)
import { BentoAreasSection } from '@/components/sections';

const areasData = {
  header: {
    label: 'LOGISTYKA I ZASIĘG',
    title: 'Dwie Bazy Operacyjne: Jaworzno i Wodzisław',
    description: 'Dzięki strategicznemu położeniu baz przy A4 i w centrum ROW, eliminujemy koszty dojazdów w promieniu 50km.',
  },
  hubs: [
    {
      hubName: 'HUB POŁUDNIE: WODZISŁAW ŚLĄSKI',
      subLabel: 'STREFA ROW / SZKODY GÓRNICZE',
      iconName: 'mountain' as const,
      isHeadquarters: false,
      description: 'Specjalizacja: Fundamenty na trudnych gruntach gliniastych i górniczych (kat. I-IV).',
      cities: [
        { label: 'Wodzisław Śląski', url: '/obszar-dzialania/budowa-domow-wodzislaw-slaski' },
        { label: 'Rybnik', url: '/obszar-dzialania/budowa-domow-rybnik' },
        // ...
      ]
    },
    {
      hubName: 'HUB CENTRUM: JAWORZNO',
      subLabel: 'CENTRALA / STREFA AGLOMERACJI A4',
      iconName: 'building' as const,
      isHeadquarters: false,
      description: 'Logistyka materiałowa A4/S1. Szybki start inwestycji w Katowicach, Tychach i Małopolsce.',
      cities: [
        { label: 'Jaworzno', url: '/obszar-dzialania/budowa-domow-jaworzno' },
        { label: 'Katowice', url: '/obszar-dzialania/budowa-domow-katowice' },
        // ...
      ]
    }
  ]
};

export default function AreaPage({ params }: { params: { slug: string } }) {
  return (
    <>
      <PageHeader {...headerData} />
      <ArticleContent />
      <BentoAreasSection {...areasData} />  {/* NOWE */}
    </>
  );
}
```

#### **Korzyści:**

- ✅ Internal linking SEO (linki do innych miast)
- ✅ Pokazanie zasięgu firmy
- ✅ Redukcja bounce rate (użytkownik może kliknąć inne miasto)

---

## 8. NAJLEPSZE PRAKTYKI

### 8.1 Responsywność

#### Mobile-First Breakpoints:

```typescript
// Tailwind breakpoints (używane w Bento)
sm: 640px   // Small devices
md: 768px   // Tablets
lg: 1024px  // Desktops
xl: 1280px  // Large desktops
2xl: 1536px // Extra large
```

#### Pattern: Mobile Stack → Desktop Grid

```tsx
// Grid 4 kolumny na desktop, 1 na mobile
<div className="grid grid-cols-1 md:grid-cols-4 gap-6">

// Grid 2 kolumny na desktop, 1 na mobile
<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

// Flex kolumna na mobile, row na desktop
<div className="flex flex-col lg:flex-row gap-6">
```

### 8.2 Accessibility

#### Kluczowe zasady:

1. **Aria Labels:**
   ```tsx
   <nav aria-label="Nawigacja sekcji">
   <a aria-label={`${item.label} (Etap ${index + 1})`}>
   <div aria-hidden="true">{/* Decorative watermark */}</div>
   ```

2. **Keyboard Navigation:**
   - Wszystkie linki muszą być klikalne przez Tab
   - Focus states: `focus:ring-2 focus:ring-primary`

3. **Semantic HTML:**
   - `<nav>` dla nawigacji
   - `<section>` dla sekcji
   - `<h1>` dla głównego tytułu (tylko jeden na stronie)

### 8.3 Performance

#### Image Optimization:

```tsx
// Always use Next.js Image
<Image
  src={imageSrc}
  alt={alt}
  fill
  className="object-cover"
  loading="lazy"  // Lazy load images
  quality={85}    // Balance quality/size
/>
```

#### Lazy Loading Components:

```tsx
// Dynamic import dla ciężkich komponentów
const BentoOfferSection = dynamic(() =>
  import('@/components/sections/BentoOfferSection').then(mod => ({ default: mod.BentoOfferSection })),
  { loading: () => <p>Ładowanie...</p> }
);
```

#### Memoization (jeśli potrzebne):

```tsx
// Jeśli komponent renderuje się często
export const BentoNavigation = React.memo<BentoNavigationProps>(({ items, activeId, variant }) => {
  // ...
});
```

### 8.4 Stylizacja

#### Unikaj inline styles (z wyjątkiem dynamicznych wartości):

```tsx
// ❌ ZŁE
<div style={{ padding: '20px', borderRadius: '24px' }}>

// ✅ DOBRE
<div className="p-5 rounded-3xl">

// ✅ OK (dynamiczne wartości)
<div style={{ margin: `0px ${dynamicMargin}%` }}>
```

#### Preferuj Tailwind utility classes:

```tsx
// ❌ ZŁE
<div className="custom-gradient-bg">  // Custom CSS class

// ✅ DOBRE
<div className="bg-gradient-to-br from-white to-gray-50">
```

#### Group hover pattern:

```tsx
<div className="group">
  <Icon className="group-hover:text-primary" />
  <span className="group-hover:translate-x-1">Text</span>
</div>
```

---

## 9. FAQ & TROUBLESHOOTING

### 9.1 Najczęstsze Problemy

#### **Problem:** "Module not found: Can't resolve '@/components/sections/BentoContactSection'"

**Rozwiązanie:**
1. Sprawdź czy plik istnieje w `/components/sections/BentoContactSection.tsx`
2. Sprawdź eksporty w `/components/sections/index.ts`
3. Restart dev server: `npm run dev`

#### **Problem:** Grid nie działa na mobile (wszystko w jednej linii)

**Rozwiązanie:**
Sprawdź czy masz `grid-cols-1` jako bazową klasę:
```tsx
// ❌ ZŁE
<div className="md:grid-cols-4">

// ✅ DOBRE
<div className="grid grid-cols-1 md:grid-cols-4">
```

#### **Problem:** Hover effects nie działają

**Rozwiązanie:**
1. Sprawdź czy masz `transition-all duration-300`
2. Sprawdź czy parent ma `group` class (dla group-hover)
3. Sprawdź czy używasz `hover:` prefix

#### **Problem:** Scrollspy nie aktualizuje aktywnego elementu

**Rozwiązanie:**
1. Sprawdź czy `variantRefs` są poprawnie ustawione
2. Sprawdź threshold w scrollspy logic (może być za wysoki/niski)
3. Sprawdź czy `id` na elementach zgadza się z `items[].id`

### 9.2 Debugging Tips

#### Console log w useEffect:

```typescript
useEffect(() => {
  console.log('Active variant:', activeVariant);
  console.log('Scroll position:', window.scrollY);
}, [activeVariant]);
```

#### React DevTools:

1. Zainstaluj [React DevTools](https://react.dev/learn/react-developer-tools)
2. Inspect komponentu → sprawdź props i state
3. Highlight updates → zobacz co się re-renderuje

#### Tailwind CSS IntelliSense:

W VS Code, zainstaluj extension "Tailwind CSS IntelliSense" dla:
- Autocomplete class names
- Hover preview
- Linting

---

## 10. ZASOBY I REFERENCJE

### 10.1 Pliki Źródłowe

- **Prototyp:** `/app/kontakt-new/page.tsx`
- **Komponenty:** `/components/sections/Bento*.tsx`, `/components/shared/Bento*.tsx`
- **Dokumentacja główna:** `/CLAUDE.md`
- **Ten dokument:** `/BENTO-GRID-IMPLEMENTATION-GUIDE.md`

### 10.2 External Resources

- **Tailwind CSS Docs:** https://tailwindcss.com/docs
- **Next.js Image Optimization:** https://nextjs.org/docs/app/building-your-application/optimizing/images
- **Lucide React Icons:** https://lucide.dev/icons
- **Bento Grid Inspiration:** https://bento.me/en/home

### 10.3 Kontakt

W razie pytań lub problemów:
1. Sprawdź FAQ w tym dokumencie
2. Sprawdź `/CLAUDE.md` dla ogólnych zasad projektu
3. Git blame problematycznego pliku (kto ostatnio edytował)

---

## 11. CHANGELOG

### 2025-01-15 - Initial Creation
- Stworzenie dokumentu
- Analiza wszystkich komponentów Bento Grid z `/kontakt-new`
- Opisanie 4 wariantów dla każdego komponentu
- Procedura implementacji (3 fazy)
- Mapowanie migracji: stare → nowe komponenty

---

**Koniec dokumentu** | Last update: 2025-01-15 | Version: 1.0
