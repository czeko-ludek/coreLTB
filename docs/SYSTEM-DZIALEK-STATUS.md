# System Dzialek — Status i Plan

## Stack technologiczny

| Technologia | Zastosowanie |
|---|---|
| Next.js App Router | Routing: `/dzialki`, `/dzialki/[miasto]` |
| Leaflet + CartoDB Positron | Mapa z minimalistycznymi kafelkami |
| leaflet.markercluster | Grupowanie pinow w clustery (zlote kolka z liczba) |
| React `forwardRef` + `useImperativeHandle` | focusPlot() — klikniecie karty centruje mape |
| `generateStaticParams` | Statyczne strony per miasto (SSG) |
| Schema.org FAQPage | Structured data dla dynamicznego FAQ |

## Pliki

### Dane
- `data/plots/types.ts` — Plot, PlotMedia, PlotFilters, PlotSortBy
- `data/plots/demo-data.ts` — 8 demo dzialek (Zabrze, Rybnik, Katowice, Gliwice, Jaworzno, Tychy, Mikolow, Wodzislaw)
- `data/plots/index.ts` — allPlots, getPlotBySlug, filterAndSortPlots, getAvailableCities
- `data/plots/seo.ts` — PlotCitySEO per miasto, generatePlotFAQ (dynamiczne FAQ z danych)

### Strony
- `app/dzialki/page.tsx` — strona glowna `/dzialki` (H1: "Dzialki budowlane na Slasku")
- `app/dzialki/[miasto]/page.tsx` — strony per miasto z dynamicznym H1, meta, FAQ, Schema.org

### Komponenty
- `components/sections/plots/PlotsListingSection.tsx` — glowny komponent (lista/mapa, filtry, CTA, FAQ, mobile drawer)
- `components/sections/plots/PlotCard.tsx` — karta dzialki (full grid + compact sidebar), styl ProjectListingCard
- `components/sections/plots/PlotMap.tsx` — mapa Leaflet z clusteringiem, forwardRef z focusPlot()

### CSS
- `app/globals.css` — plot-dot (piny), plot-popup (popup z thumbnailem), plot-cluster, leaflet overrides, animate-slide-up

## Co jest zrobione

### Widok listy (default)
- [x] Kafelki w stylu ProjectListingCard (aspect-4/3, badge, cena, CTA row)
- [x] Grid `1 / md:2 / xl:3` kolumny
- [x] Stagger animation (animate-fade-in-up z delay per karta)
- [x] Floating "Pokaz na mapie" button (styl Otodom, fixed bottom, ciemny pill)

### Widok mapy (desktop)
- [x] Split layout: sidebar 440px + mapa
- [x] Sidebar karty z duzymi miniaturkami (132x98px)
- [x] Badge dostepnosci w wierszu z tytulem (nie na miniaturce)
- [x] Klikniecie karty w sidebar -> flyTo + zoom na mape (focusPlot)
- [x] Hover karty <-> highlight pina na mapie (dwukierunkowa synchronizacja)
- [x] MarkerCluster — pobliske dzialki grupuja sie w zlote kolka z liczba
- [x] Clustery rozdzielaja sie przy zoom >= 14
- [x] Popup na mapie z thumbnailem dzialki (120px), tytul, adres, specs, cena
- [x] Popup "Zobacz dzialke" button w brand gold (#dfbb68)
- [x] CartoDB Positron tiles (minimalistyczne, bialo-szare)
- [x] Custom zoom controls (prawy dolny, ostylowane)
- [x] Brak atrybucji OSM (ukryta CSS-em)

### Widok mapy (mobile)
- [x] Mapa pelnoekranowa
- [x] Bottom bar "X dzialek — Dotknij aby zobaczyc liste"
- [x] Bottom drawer (styl Uber/Bolt) — slide-up z max 75vh
- [x] Drawer: uchwyt, X, filtry cenowe/powierzchniowe jako pill-chipy
- [x] Klikniecie karty w drawer -> focusPlot + zamkniecie drawer

### Filtry
- [x] Chipy miast (primary row) — klikniecie = zmiana URL (`/dzialki/rybnik`)
- [x] Zakres cen: 5 opcji (do 150k, 150-300k, 300-500k, 500k+)
- [x] Zakres powierzchni: 5 opcji (do 800, 800-1200, 1200-2000, 2000+)
- [x] Sortowanie: dropdown (najnowsze, cena rosnaco/malejaco, powierzchnia rosnaco/malejaco)
- [x] Filtry ukryte na mobile w widoku mapy (dostepne w drawer)
- [x] Hierarchiczny autocomplete lokalizacji (wojewodztwo > powiat > gmina > miejscowosc)

### Detail page `/dzialki/[slug]`
- [x] `PlotGalleryHero` — galeria Swiper z lightbox, thumbnailami, nawigacja
- [x] `PlotDetails` — breadcrumbs, tytul, cena, powierzchnia, media pills, MPZP, opis AI
- [x] `PlotDetailMap` — mapa Leaflet z przyblizona lokalizacja (okrag 200m), fullscreen toggle
- [x] CTA: 3 przyciski ("Zapytaj o dzialke", "Wycen budowe", "Analiza dzialki")
- [x] Mobile: karta z cena po sekcji media (przed opisem), `lg:hidden` / `hidden lg:block`
- [x] `PlotProjectsCrossLink` — 3 dopasowane projekty domow na podstawie powierzchni dzialki
- [x] Schema.org RealEstateListing + BreadcrumbList

### SEO & Interlinking
- [x] `/dzialki` — ogolna strona Slaska, canonical, OG tags
- [x] `/dzialki/[lokalizacja]` — hierarchiczne strony lokalizacji (wojewodztwo/powiat/gmina/miejscowosc)
- [x] 73 URLe w sitemap.xml (1 glowna + 34 lokalizacji + 38 dzialek)
- [x] generateStaticParams — statyczne strony SSG
- [x] Dynamiczny FAQ obliczany z danych dzialek per lokalizacja
- [x] FAQPage Schema.org JSON-LD (rich results Google)
- [x] Breadcrumbs hierarchiczne (`getLocationBreadcrumb`)
- [x] Interlinking "Dzialki w okolicy" — linki parent/sibling/child miedzy lokalizacjami
- [x] seoContent per lokalizacja — dlugi opis pod FAQ

### Cross-linking (dzialki <-> projekty)
- [x] `PlotProjectsCrossLink` — na `/dzialki/[slug]`: "Projekty domow na te dzialke" (3 dopasowane projekty, useMemo, fallback)
- [x] `ProjectPlotsCrossLink` — na `/projekty/[slug]`: "Znajdz dzialke pod ten projekt" (dark CTA, 2 buttony)
- [x] `trackCrossLinkClick()` — GA4 event na klikniecie cross-linkow

### GA4 Tracking
- [x] `trackPlotView(slug, city, price, area)` — plot_view na wejsciu na detail page (useEffect)
- [x] `trackPlotCalculatorClick(slug, city)` — klikniecie "Wycen budowe"
- [x] `trackPlotAnalysisClick(slug, city)` — klikniecie "Analiza dzialki"
- [x] `trackPlotContactClick(slug, city)` — klikniecie "Zapytaj o dzialke"
- [x] `trackCrossLinkClick(from, to, linkType)` — klikniecie cross-linkow dzialka<->projekt
- [x] Wszystkie eventy via GTM dataLayer (window.dataLayer.push)

### CTA
- [x] CTA "Zapytaj o dzialke" -> /umow-konsultacje
- [x] CTA "Wycen budowe na tej dzialce" -> /wycena
- [x] CTA "Analiza dzialki" -> /analiza-dzialki
- [x] ContactCTASection na dole

## Do zrobienia (TODO)

### P1 — Wazne
- [ ] **Tryb pelnoekranowy mapy** — przycisk expand/fullscreen, mapa i sidebar na caly viewport
- [ ] **Pre-fill kalkulatora z dzialki** — "Wycen budowe" -> /wycena z powierzchnia dzialki
- [ ] **Galeria zdjec w popup mapy** — carousel kilku zdjec zamiast jednego thumbnaila

### P2 — Rozszerzenia
- [ ] **Wiecej filtrow** — MPZP (tak/nie), media (pelne uzbrojenie), teren (plaski/lekko nachylony)
- [ ] **Widok satelitarny** — toggle miedzy CartoDB Positron a satelita (Google/Esri)
- [ ] **Rysowanie obszaru na mapie** — uzytkownik rysuje polygon, filtruje dzialki w srodku
- [ ] **Powiadomienia o nowych dzialkach** — email alert gdy pojawi sie dzialka w wybranym miescie
- [ ] **Porownywanie dzialek** — checkbox na kartach, porownanie 2-3 dzialek side-by-side
- [ ] **Kampania PMax** — nowa grupa assetow dla fraz o dzialkach budowlanych

### Techniczne
- [ ] **Deduplikacja PlotMap na mobile** — obecnie dwa PlotMap renderuja sie (desktop hidden + mobile)
- [ ] **Lazy load thumbnailSrc** — docelowo Next.js `<Image>` z blur placeholder
- [ ] **Testy** — unit testy dla filterAndSortPlots, generatePlotFAQ

## Statystyki

| Metryka | Wartosc |
|---|---|
| Dzialki | 38 |
| URLe w sitemap | 73 (1 glowna + 34 lokalizacji + 38 dzialek) |
| Lokalizacje | 34 stron (hierarchiczne: wojewodztwo/powiat/gmina/miejscowosc) |
| Powiaty | 4 |
| Gminy | 13 |
| Cross-linking | dzialki <-> projekty (dwukierunkowy) |
| GA4 eventy | 5 (plot_view, calculator/analysis/contact click, cross_link_click) |

## Komponenty

### Listing
- `PlotsListingSection.tsx` — glowny komponent (lista/mapa, filtry, CTA, FAQ, interlinking)
- `PlotCard.tsx` — karta dzialki (full grid + compact sidebar)
- `PlotMap.tsx` — mapa Leaflet z clusteringiem, forwardRef z focusPlot()
- `LocationSearch.tsx` — hierarchiczny autocomplete lokalizacji

### Detail page
- `PlotDetailPage.tsx` — client wrapper composing all detail sections
- `PlotGalleryHero.tsx` — galeria Swiper z lightbox i thumbnailami
- `PlotDetails.tsx` — breadcrumbs, tytul, cena, media, opis, 3x CTA, GA4 tracking
- `PlotDetailMap.tsx` — mapa Leaflet z przyblizona lokalizacja (200m okrag)
- `PlotProjectsCrossLink.tsx` — 3 dopasowane projekty (useMemo, client component)
- `ProjectPlotsCrossLink.tsx` — dark CTA na /projekty/[slug] (server component)

## Dodawanie nowej dzialki

1. Dodaj obiekt `Plot` do pliku z danymi (slug, title, city, coordinates, price, area, ...)
2. Dodaj zdjecia do `public/images/dzialki/[slug]/`
3. Dzialka pojawi sie automatycznie na liscie, mapie i w sitemap
4. FAQ per lokalizacja zaktualizuje sie automatycznie
5. Cross-linking z projektami dziala automatycznie (dopasowanie po powierzchni)
