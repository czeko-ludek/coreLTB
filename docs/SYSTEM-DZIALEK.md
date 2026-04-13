# System Dzialek Budowlanych — Specyfikacja Techniczna

## 1. Wizja

Klient chce oferowac klientom dzialki budowlane. Uzytkownik wchodzi na `/dzialki`, przegladam oferty (jak projekty domow), widzi cene, lokalizacje, i moze zamowic audyt dzialki.

System wzorowany na istniejacym systemie projektow (`data/projects/`) — ta sama architektura, konwencje, wzorce komponentow.

---

## 2. Architektura (analogiczna do systemu projektow)

```
data/
  plots/
    types.ts          <- interfejs Plot, PlotListingItem, PlotFilters
    index.ts          <- getAllPlots(), getPlotBySlug(), eksport
    helpers.ts        <- filtrowanie, sortowanie, buildAnalysisUrl()
    plots-data.ts     <- dane 100-200 dzialek (lub podzielone na pliki)

app/
  dzialki/
    page.tsx          <- listing z filtrami (RSC, analogicznie do /projekty)
    [slug]/
      page.tsx        <- strona szczegolowa dzialki

components/
  shared/
    PlotCard.tsx              <- karta dzialki na listingu (analogia ProjectListingCard)
    PlotFilterSidebar.tsx     <- filtry desktop (analogia ProjectFilterSidebar)
    MobilePlotFilterDrawer.tsx <- filtry mobile (analogia MobileFilterDrawer)
  sections/
    PlotsListingSection.tsx   <- glowna sekcja listingu (analogia ProjectsListingSection)
    plots/
      PlotGalleryHero.tsx     <- galeria zdjec dzialki
      PlotDetails.tsx         <- szczegoly (powierzchnia, MPZP, media, cena)
      PlotLocationMap.tsx     <- mapa z pinem (Etap 3)
      PlotCTA.tsx             <- "Zamow audyt tej dzialki" -> /analiza-dzialki
      NearbyPlotsSection.tsx  <- podobne dzialki w okolicy (Etap 2)
```

---

## 3. Typ danych `Plot`

```typescript
interface Plot {
  slug: string;                    // np. "dzialka-rybnik-ul-polna-1200m2"
  title: string;                   // np. "Dzialka budowlana Rybnik, ul. Polna"
  city: string;                    // miasto
  district?: string;               // dzielnica
  address: string;                 // adres lub okolica
  area: number;                    // powierzchnia w m2
  price: number;                   // cena w PLN
  pricePerM2: number;              // cena za m2
  mpzp: 'tak' | 'nie' | 'nie_wiem'; // MPZP
  media: {                         // dostepne media
    water: boolean;
    electricity: boolean;
    gas: boolean;
    sewer: boolean;
  };
  plotShape: string;               // np. "prostokatna", "trapezowa"
  terrain: string;                 // np. "plaski", "lekko nachylony"
  access: string;                  // np. "droga asfaltowa", "droga gruntowa"
  buildingConditions?: string;     // warunki zabudowy
  description: string;             // opis tekstowy
  thumbnailSrc: string;            // zdjecie glowne
  images: string[];                // galeria zdjec
  coordinates?: { lat: number; lng: number }; // do mapy (Etap 3)
  availability: 'dostepna' | 'rezerwacja' | 'sprzedana';
  dateAdded: number;               // timestamp
  source?: string;                 // skad pochodzi oferta
}
```

### PlotListingItem (slim version for listing page)

```typescript
interface PlotListingItem {
  slug: string;
  title: string;
  city: string;
  district?: string;
  area: number;
  price: number;
  pricePerM2: number;
  mpzp: 'tak' | 'nie' | 'nie_wiem';
  media: { water: boolean; electricity: boolean; gas: boolean; sewer: boolean };
  availability: 'dostepna' | 'rezerwacja' | 'sprzedana';
  thumbnailSrc: string;
  dateAdded: number;
  terrain: string;
}
```

### PlotFilters

```typescript
interface PlotFilters {
  city?: string;
  priceMin?: number;
  priceMax?: number;
  areaMin?: number;
  areaMax?: number;
  mpzp?: 'tak' | 'nie' | 'nie_wiem';
  hasWater?: boolean;
  hasElectricity?: boolean;
  hasSewer?: boolean;
  hasGas?: boolean;
  availability?: 'dostepna' | 'rezerwacja' | 'sprzedana';
  sortBy?: 'newest' | 'price-asc' | 'price-desc' | 'area-asc' | 'area-desc';
}
```

---

## 4. Integracja z istniejacym systemem

| Integracja | Jak | Opis |
|-----------|-----|------|
| `/analiza-dzialki` pre-fill | `buildAnalysisUrl(plot)` | Z dzialki -> formularz z pre-fill adresu, MPZP, numeru dzialki |
| Sitemap | Dodanie do `app/sitemap.ts` | Wszystkie dzialki w sitemap |
| Schema.org | `RealEstateListing` (Etap 2) | Structured data per dzialka |
| Analytics | `plot_view`, `plot_analysis_request` (Etap 2) | Nowe eventy GA4 |
| Header nav | Dodanie linku "Dzialki" | W nawigacji glownej (`app/layout.tsx` navLinks) |
| SEO meta | Auto-generowane tytuly/opisy | Jak dla projektow (`generatePlotSeoTitle/Description`) |
| Breadcrumbs | Strona glowna > Dzialki > [title] | Analogicznie do projektow |

### buildAnalysisUrl(plot)

```typescript
function buildAnalysisUrl(plot: Plot): string {
  const params = new URLSearchParams();
  params.set('adres', plot.address);
  if (plot.mpzp) params.set('mpzp', plot.mpzp);
  return `/analiza-dzialki?${params.toString()}`;
}
```

---

## 5. Wzorce komponentow (reuse z projektow)

### Komponenty wspoldzielone (bez zmian)
- `FilterSection.tsx` — rozwijana sekcja filtra (juz generyczna)
- `Breadcrumbs.tsx` — breadcrumbs
- `SectionLabel` — etykieta sekcji
- `Icon` — ikony Lucide

### Komponenty nowe (wzorowane na projektach)
- `PlotCard.tsx` — wzorowany na `ProjectListingCard.tsx` (React.memo, inView, delay)
- `PlotFilterSidebar.tsx` — wzorowany na `ProjectFilterSidebar.tsx`
- `MobilePlotFilterDrawer.tsx` — wzorowany na `MobileFilterDrawer.tsx`
- `PlotsListingSection.tsx` — wzorowany na `ProjectsListingSection.tsx` (useToggle, useMemo, useCallback, URL sync)

### Wzorce do zastosowania
- `useToggle` hook (z `hooks/useToggle.ts`) — drawer open/close, sort dropdown
- `useMemo` — filteredPlots, paginatedPlots, plotCounts
- `useCallback` — handleFiltersChange, handleSortChange, goToPage
- `useInView` z `react-intersection-observer` — animacje scroll-triggered
- `React.memo` — PlotCard (pure component)
- `clsx` — warunkowe klasy CSS
- URL sync via `useRouter().replace()` — filtry/sort/page w URL
- CSS animations (`animate-fade-in-up`) — NIE Framer Motion

---

## 6. Etapowanie

### Etap 1: MVP

Co wchodzi:
- [x] Typ danych `Plot` + `PlotFilters` + `PlotListingItem`
- [x] Plik danych z pierwszymi 50-100 dzialkami
- [x] Strona listingu `/dzialki` z podstawowymi filtrami (miasto, cena, powierzchnia)
- [x] `PlotCard.tsx` — karta z miniaturka, lokalizacja, cena, powierzchnia
- [x] Strona szczegolowa `/dzialki/[slug]` — galeria, opis, szczegoly, media
- [x] CTA "Zamow audyt dzialki" -> link do `/analiza-dzialki?adres=X&mpzp=Y`
- [x] SEO: sitemap, meta tagi, breadcrumbs
- [x] Responsywnosc (mobile-first)
- [x] Dodanie do nawigacji

Co NIE wchodzi w MVP:
- Mapa interaktywna
- Zaawansowane filtry (media, ksztalt, teren)
- Schema.org RealEstateListing
- Porownywarka
- Import z zewnetrznych zrodel
- Eventy GA4

### Etap 2: Rozszerzenie (ZREALIZOWANE)

- [x] Schema.org `RealEstateListing` per dzialka
- [x] Statusy: dostepna / rezerwacja / sprzedana (z wizualnym oznaczeniem)
- [x] Eventy GA4: `plot_view`, `plot_calculator_click`, `plot_analysis_click`, `plot_contact_click`, `cross_link_click`
- [x] 38 realnych dzialek z danymi i zdjeciami
- [ ] Zaawansowane filtry (MPZP, media, dostep, teren)
- [ ] `NearbyPlotsSection` — podobne dzialki na detail page

### Etap 3: Premium — Mapa interaktywna (ZREALIZOWANE)

- [x] Mapa interaktywna z pinami dzialek (Leaflet + CartoDB Positron)
- [x] Toggle Lista/Mapa na `/dzialki` ze zmiana layoutu
- [x] Interakcje mapa <-> lista (hover/click synchronizacja, focusPlot)
- [x] MarkerCluster — grupowanie pinow w zlote kolka
- [x] Mini mapa na stronie detail `/dzialki/[slug]` (okrag 200m, fullscreen)
- [x] CTA na stronie projektu: "Szukasz dzialki pod ten projekt?" (`ProjectPlotsCrossLink`)
- [x] Cross-linking: dzialka -> najlepsze projekty (`PlotProjectsCrossLink`)
- [x] Interlinking lokalizacji — parent/sibling/child linki miedzy stronami
- [x] 73 URLe w sitemap.xml
- [ ] Porownywarka dzialek (max 3, side-by-side)
- [ ] Integracja z Google Ads (nowa grupa assetow PMax)

---

## 7. Mapa interaktywna — specyfikacja (Etap 3)

### Technologia

| Opcja | Koszt | Werdykt |
|---|---|---|
| **Leaflet + OpenStreetMap** | 0 PLN | NAJLEPSZE — darmowe, lekkie (~40KB), bez API key |
| Google Maps | ~50-200 PLN/msc przy ruchu | Overkill, platne |
| Mapbox | Darmowe do 50k ladowan | Ladniejsze, ale limit |

Biblioteka: `react-leaflet` (React wrapper na Leaflet).

### Layout — dwa tryby na `/dzialki`

3 kolumny kart + mapa obok sie NIE ZMIESZCZA. Mapa potrzebuje min 500-600px szerokosc.
Dlatego: **przelaczenie trybu zmienia caly layout**.

```
Toggle: [ Lista ] [ Mapa ]

TRYB LISTA (domyslny):
  Sidebar 280px + 3 kolumny kart (jak /projekty)
  Bez mapy.

  ┌──────────┬───────┬───────┬───────┐
  │ Filtry   │ karta │ karta │ karta │
  │ sidebar  ├───────┼───────┼───────┤
  │          │ karta │ karta │ karta │
  │          ├───────┼───────┼───────┤
  │          │ karta │ karta │ karta │
  └──────────┴───────┴───────┴───────┘

TRYB MAPA:
  Sidebar znika.
  1 kolumna kart (scrollowalna, ~380px) + mapa (~reszta).
  Filtry przeniesione na gore mapy jako pills/chipy.

  ┌───────────┬──────────────────────────┐
  │  karta    │  [miasto▾] [cena▾] [m2▾] │
  ├───────────┤                          │
  │  karta    │        MAPA              │
  ├───────────┤   📍     📍             │
  │  karta    │      📍    📍           │
  ├───────────┤   📍          📍        │
  │  karta    │                          │
  ├───────────┤                          │
  │  karta    │                          │
  └───────────┴──────────────────────────┘
   ~380px          ~reszta (55-60%)
```

**Mobile:** Toggle [Lista] [Mapa] — pelnoekranowe przelaczanie.
W trybie Mapa: mapa fullscreen, karty jako dolny drawer (swipe up).

### Wzorzec UX (Otodom / Airbnb / Booking)

Taki sam pattern jak wiodace portale nieruchomosci:
- Wlaczasz mape → karty kompresuja sie do 1 kolumny
- Sidebar filtrów znika, filtry staja sie chipami nad mapa
- Lista kart jest scrollowalna niezaleznie od mapy

### Interakcje mapa <-> lista

| Akcja uzytkownika | Reakcja |
|---|---|
| Hover na karcie w liscie | Pin na mapie pulsuje / zmienia kolor |
| Klik na pin na mapie | Karta w liscie scrolluje sie do widoku + podswietla |
| Zmiana filtrow | Piny na mapie filtruja sie w czasie rzeczywistym |
| Zoom/pan mapy (opcja zaawansowana) | Lista pokazuje tylko dzialki widoczne w viewport mapy |

### Design pinow na mapie

```
Dostepna:    zielony pin z cena "180k"
Rezerwacja:  zolty pin
Sprzedana:   szary pin (opcja: ukryj)
```

Tooltip po kliknieciu pina:
```
┌──────────────────────┐
│ ul. Polna, Rybnik    │
│ 1 200 m2 · 180 000   │
│ MPZP: tak · media ok │
│ [Zobacz szczegoly ->] │
└──────────────────────┘
```

Cluster markers gdy wiele pinow blisko siebie (Leaflet MarkerCluster plugin).

### Mini mapa na stronie detail `/dzialki/[slug]`

Mala statyczna mapa pod sekcja szczegolow — pin z lokalizacja, podstawowy zoom:

```
┌─────────────────────────────┐
│  Lokalizacja                │
│  ┌───────────────────────┐  │
│  │       MAPA            │  │
│  │         📍            │  │
│  │                       │  │
│  └───────────────────────┘  │
│  ul. Polna 12, Rybnik       │
└─────────────────────────────┘
```

Wymaga `coordinates: { lat, lng }` w danych dzialki.

### Komponenty mapy

```
components/
  sections/
    plots/
      PlotMap.tsx             <- glowna mapa z pinami (Leaflet)
      PlotMapPin.tsx          <- custom pin z tooltipem
      PlotMapFilters.tsx      <- chipy filtrow nad mapa
      PlotMapListCard.tsx     <- kompaktowa karta w trybie mapy (1-kolumna)
      PlotDetailMap.tsx       <- mini mapa na stronie detail
```

### Szacowany czas i cena

| Zakres mapy | Czas | Cena po znajomosci |
|---|---|---|
| Prosty pin na detail page | 2-3h | W ramach MVP lub +300 PLN |
| Toggle lista/mapa basic | 6-8h | 800-1 000 PLN |
| **Split view + interakcje mapa<->lista** | 12-16h | 1 500-2 000 PLN |
| Split view + viewport filtering + clusters | 16-20h | 2 000-2 500 PLN |

---

## 8. Strona szczegolowa `/dzialki/[slug]` — struktura

Kolejnosc komponentow na stronie szczegolowej:

1. **PlotGalleryHero** — galeria zdjec (lightbox, analogia `ProjectGalleryHero`)
2. **PlotDetails** — breadcrumbs, tytul, adres, powierzchnia, cena, cena/m2, MPZP, media, teren, dojazd, opis
3. **PlotDetailMap** — mini mapa z pinem lokalizacji (Etap 3, wymaga coordinates)
4. **PlotCTA** — "Zamow audyt tej dzialki" -> `/analiza-dzialki?adres=X&mpzp=Y` (dark two-column CTA)
5. **NearbyPlotsSection** — podobne dzialki w okolicy (Etap 2, carousel)

### SEO na stronie szczegolowej

```typescript
// Tytul: "Dzialka budowlana [miasto] [adres] · [area] m2 | CoreLTB"
// Opis: "Dzialka budowlana na sprzedaz w [miasto], [adres]. [area] m2, [cena] PLN ([cena/m2] PLN/m2). MPZP: [tak/nie]. Zamow bezplatna analize dzialki."
```

---

## 9. Dane — format i zrodla

### Format danych w kodzie

Dane dzialek beda trzymane w plikach TypeScript (jak projekty), np.:

```typescript
// data/plots/plots-data.ts
export const plotsData: Plot[] = [
  {
    slug: 'dzialka-rybnik-ul-polna-1200m2',
    title: 'Dzialka budowlana Rybnik, ul. Polna',
    city: 'Rybnik',
    district: 'Smolna',
    address: 'ul. Polna 12, Rybnik',
    area: 1200,
    price: 180000,
    pricePerM2: 150,
    mpzp: 'tak',
    media: { water: true, electricity: true, gas: false, sewer: true },
    plotShape: 'prostokatna',
    terrain: 'plaski',
    access: 'droga asfaltowa',
    description: 'Dzialka budowlana...',
    thumbnailSrc: '/images/dzialki/rybnik-polna/thumbnail.webp',
    images: ['/images/dzialki/rybnik-polna/1.webp', '/images/dzialki/rybnik-polna/2.webp'],
    availability: 'dostepna',
    dateAdded: Date.now(),
  },
  // ...
];
```

### Zdjecia

Struktura katalogu zdjec:
```
public/images/dzialki/
  [slug]/
    thumbnail.webp    <- miniaturka na listing (400x300)
    1.webp            <- galeria
    2.webp
    ...
```

### Przyszle zrodla danych (Etap 2+)
- Reczne dodawanie przez klienta (dane + zdjecia)
- Scraping z portali nieruchomosci (opcja)
- Import z Excela/CSV (skrypt konwersji)

---

## 10. Miasta docelowe

System dzialek obejmuje te same miasta co strony lokalne:

rybnik, wodzislaw-slaski, tychy, katowice, jaworzno, mikolow, gliwice, zabrze, zory, jastrzebie-zdroj, raciborz

+ dodatkowe miejscowosci wokol tych miast.

---

*Specyfikacja systemu dzialek CoreLTB — wersja 1.0, 2026-04-07*
