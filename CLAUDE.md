# Elever — CoreLTB Builders Website

## Project Overview
- Next.js App Router website for CoreLTB Builders (home construction, Silesia region, Poland)
- Branch: v3, Main: master
- Polish language content, SEO-focused
- No Framer Motion — all animations use CSS transitions/keyframes + `useInView` from `react-intersection-observer`

## Performance Optimization (PLANNED)
- Mobile PSI: 63/100, Desktop: 83/100 (mediana, kwiecien 2026)
- Root cause: `output: 'export'` laduje WSZYSTKIE chunki JS (~2.2 MB niepotrzebnego) na kazdej stronie
- Plan: migracja na SSR via `@opennextjs/cloudflare` (OpenNext) — per-page code splitting, prognoza +15-25 pkt mobile
- **Full docs: `docs/OPTYMALIZACJA-PERFORMANCE.md`** — root cause analysis, zrealizowane optymalizacje, plan migracji, SEO impact

## Git Workflow & Deployment
- **`v3`** — main working branch, **direct production deploys** to **coreltb.pl** (Cloudflare Pages)
- Every push to `v3` auto-deploys to production — no merge needed
- Cloudflare Pages project: `coreltb` (repo: `czeko-ludek/coreLTB`, production branch: `v3`)
- `coreltb-v2` project — ignored, not used
- Build command: `npx next build`, output: `out` (static export)
- Cloudflare Pages Functions: `functions/api/lead.ts` (standalone, no imports from lib/)
- Env vars (Cloudflare Dashboard): `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `LEAD_FROM_EMAIL`

## Analytics & Tracking
- **GTM:** `GTM-TPFV68BN` (embedded in `app/layout.tsx` via `next/script`)
- **GA4:** `G-SMNG7006SN` (configured via GTM, NOT directly in code)
- **Meta Pixel:** `2115781769222343` (embedded in `app/layout.tsx`, consent mode revoke/grant)
- **Meta Ads account:** CoreLTB Reklama (515195598339409)
- **Consent Mode v2:** Google (gtag) + Meta (fbq) — defaults denied/revoked, updated on cookie consent
- **Cookie consent UX:** Large bottom bar with dark overlay (`CookieConsent.tsx`), tracks acceptance/rejection/ignore
- **UTM tracking:** `lib/analytics.ts` — `captureUTMParams()` stores in sessionStorage, sent with lead data
- **GA4 conversion events (key events, value 500 PLN each):**
  - `calculator_lead` — form submit on `/wycena`
  - `consultation_lead` — form submit on `/umow-konsultacje`
  - `plot_analysis_lead` — form submit on `/analiza-dzialki`
- **Meta Pixel events:**
  - `PageView` — every page (automatic)
  - `ViewContent` — `/wycena` page load (CalculatorForm mount)
  - `Lead` — form submit on all 3 LPs (calculator, consultation, plot analysis)
- **Cookie consent events:** `cookie_accepted`, `cookie_rejected`, `cookie_ignored` (after 30s)
- **Other GA4 events:** `calculator_start`, `calculator_step`, `phone_click`, `form_focus`, `form_error`
- **GTM tags:** 6 tags (1 GA4 Config + 5 GA4 Event), 5 custom event triggers
- **Google Ads:** PMax campaign, 50 PLN/day, active

## Landing Pages & Conversion Strategy
Full strategy doc: **`docs/LANDING-PAGES-STRATEGY.md`** — describes all conversion landing pages, CTA mapping, GA4 events, Google Ads campaigns, backend API routes.

### Funnel Architecture
```
AWARENESS (SEO / Ads)
  Strona glowna, /obszar-dzialania/*, /oferta/*, /projekty
      |
CONSIDERATION
  /wycena (LP1) — "Ile to kosztuje?" — P0, kalkulator budowy
  /umow-konsultacje (LP2) — "Chce porozmawiac" — P1, formularz kontekstowy
  /analiza-dzialki (LP3) — "Mam dzialke, co dalej?" — P2
  /kontakt (LP4) — catch-all, dane kontaktowe
      |
LEAD -> Spotkanie na budowie / w biurze
```

### CTA Design Pattern
All CTAs across the site use a consistent two-column dark design:
- Left: `bg-zinc-900` with label, H2/H3, description, bullet points, link button
- Right: `<Image>` with `/images/cta.webp`
- Used in: `ProjectModificationCTA`, `/projekty` listing CTA, `ContactCTASection`
- **Do NOT use** golden gradient banners — they were removed in v3

## Projects System (data/projects/)

### Data Sources
- `data/projects/galeriadomow.ts` — ~230 projects from GaleriaDomow XML import
- `data/projects/z500.ts` — ~20 projects from Z500
- `data/projects/manual.ts` — manually added projects
- `data/projects/index.ts` — merges all sources, exports `allProjects`, `getProjectBySlug()`

### Project Type (`Project`)
Key fields: `slug`, `id`, `title`, `category`, `technology`, `surfaceArea`, `price`, `availability`, `specifications[]`, `floorPlans[]`, `garage?`, `source?`

### Filtering & Sorting (`/projekty`)
- **Categories:** parterowy, pietrowy (maps to z-poddaszem + dwulokalowy + jednorodzinny), z-poddaszem, dwulokalowy
- **Garage filter:** z-garazem / bez-garazu (checkbox)
- **Technology:** MUROWANY / DREWNIANY
- **Source:** galeriadomow / z500
- **Surface ranges:** 100-150, 150-200, 200+
- **Sort:** newest, price-asc/desc, area-asc/desc
- Components: `ProjectsListingSection` (main), `ProjectFilterSidebar` (desktop), `MobileFilterDrawer`

### Project Detail Page (`/projekty/[slug]`)
Components in order:
1. `ProjectGalleryHero` — image gallery with lightbox
2. `ProjectIntroduction` — breadcrumbs, ID badge, surface area, price, technology, mirror toggle, **"Poznaj cene budowy" button**
3. `ProjectTabs` — specification tabs (excluding "Koszty")
4. `ProjectFloorPlans` — floor plan images with room lists
5. `ProjectElevations` — elevation images, cross section, site plan
6. `ProjectModificationCTA` — "Studio Adaptacji" dark CTA
7. `RelatedProjectsSection` — related projects carousel

### Calculator Pre-fill System (Project -> /wycena)
**`buildCalculatorUrl(project)`** in `data/projects/helpers.ts` — extracts data from a Project and builds a `/wycena?params` URL with pre-filled calculator fields.

**Mapping (5 of 9 fields auto-filled):**

| Calculator field | Source | Mapping logic |
|---|---|---|
| `area` | `project.surfaceArea` | `parseSurfaceArea()` -> round |
| `floors` | `project.category` | parterowy->parterowy, z-poddaszem->poddasze, pietrowy/dwulokalowy->pietrowy |
| `wallType` | hardcoded | always `silikat` (CoreLTB standard) |
| `roofType` | `specifications["Rodzaj dachu"]` | dwuspadowy->dwuspadowy, czterospadowy->wielospadowy; Z500 fallback: angle <=5deg->plaski |
| `garage` | `project.garage` OR specs/floorPlans | 1-stanowiskowy->jednostanowiskowy, 2-stanowiskowy->dwustanowiskowy; Z500: infers from "Powierzchnia garazu" spec or "Garaz" room (>30m2=dwustanowiskowy) |
| `foundation` | `specifications["Posadowienie"]` | default `lawy`; plyta if spec contains "plyta" |
| `basement` | hardcoded | always `brak` |
| `heating` | — | user must choose |
| `finish` | — | user must choose |

**Flow:** `ProjectIntroduction` receives `calculatorUrl` prop -> renders "Poznaj cene budowy" button -> links to `/wycena?area=120&floors=parterowy&wallType=silikat&roofType=dwuspadowy&garage=jednostanowiskowy&foundation=lawy&basement=brak` -> `CalculatorForm` reads all params via `useSearchParams()` and pre-fills form state.

**Data availability differences:**
- **GaleriaDomow:** has `project.garage` field, `Rodzaj dachu` in specs, no `Posadowienie`
- **Z500:** no `garage` field (inferred from specs/floorPlans), has `Kat nachylenia dachu` + `Posadowienie` in specs

## Landing Pages — Shared Layout & Components

All conversion LPs (`/wycena`, `/umow-konsultacje`, `/analiza-dzialki`) share the same two-column layout:
- **Left:** Sticky full-height image with dark overlay, logo, tagline (hidden on mobile)
- **Right:** Scrollable form panel with mobile top bar (logo + hamburger) and mobile menu drawer
- **Success view:** Right panel swaps to success message (left image stays). Smooth scroll to top. "Wróć do formularza" button resets.
- **No emoji icons anywhere** — all icons use `<Icon>` component (Lucide-based)

**Shared section components** (`components/sections/shared/`):
- `LPTrustBar.tsx` — 4 trust badges (200+ domów, Stała cena, Gwarancja terminu, 10 lat gwarancji). Accepts optional `items` prop.
- `LPTestimonials.tsx` — 8 testimonials, CSS marquee with hover pause. Accepts optional `title` and `testimonials` props.
- `LPSteps.tsx` — Dark bg, numbered steps with icons and dashed connectors. Auto `md:grid-cols-3` or `md:grid-cols-4`. Supports `time` badge and `subtitle`.

**Section order on all LPs:** Form → LPTrustBar → LPTestimonials → page-specific content → LPSteps → FAQ → ContactCTA

**HideHeader** (`components/sections/calculator/HideHeader.tsx`) — hides global header on desktop (lg+), SSR inline `<style>`. Used on all LPs.

## Calculator / Wycena Page (`/wycena`)
Lead generation landing page with cost calculator at `app/wycena/page.tsx`.

**Architecture:**
- `data/pricing.ts` — pricing engine: `calculateEstimate()`, material/labor/equipment breakdown per construction stage, geometric quantity calculations. Types: `CalculatorConfig`, `EstimateBreakdown`, `StageBreakdown`. Labels: `WALL_LABELS`, `ROOF_LABELS`, `FLOOR_LABELS`, `GARAGE_LABELS`, `FINISH_LABELS`, `HEATING_LABELS`
- `components/sections/calculator/CalculatorForm.tsx` — main form + estimate document (rendered inside right panel, not separate page). `useReducer` for form state. Reads URL params via `useSearchParams()` (wrapped in `<Suspense>` in page.tsx). Estimate shows total price only (no per-stage prices), zakres prac per stage.
- `components/sections/calculator/CalculatorHero.tsx` — mobile-only hero header (white text on dark bg)
- `components/sections/calculator/CalculatorTrustBar.tsx` — 4 trust badges
- `components/sections/calculator/CalculatorTestimonials.tsx` — 8 testimonials, CSS marquee
- `components/sections/calculator/CalculatorSteps.tsx` — "Od wyceny do budowy w 3 krokach"
- `components/ui/OptionCard.tsx` — reusable selection card

**Config options:** area (80-500 m2), floors (parterowy/poddasze/pietrowy), wall type (silikat/ceramika/beton komorkowy), roof type (plaski/dwuspadowy/wielospadowy), garage (brak/jedno/dwustanowiskowy), finish (SSO/deweloperski/pod klucz), heating (gazowe/pompa ciepla/pelet), foundation (plyta/lawy), basement (brak/czesciowa/cala)

**URL pre-fill:** Accepts query params for all config fields. Validated against allowed values before applying. Used by project detail pages via `buildCalculatorUrl()`.

**Mobile specifics:** Header hidden, custom hamburger menu + drawer. Slider hidden, area input only. Estimate sections stack vertically.

## Consultation Page (`/umow-konsultacje`)
- `components/sections/consultation/ConsultationForm.tsx` — service type selection (6 OptionCards: budowa, projektowanie, nadzor, techniczne, wykonczenia, inne), contextual questions per service, location dropdown, contact preference, file upload, consents
- URL auto-fill: `?usluga=nadzor&miasto=katowice` via `useSearchParams()` (wrapped in `<Suspense>`)
- Page-specific content: "Dlaczego konsultacja z inżynierem?" (3 Icon cards)

## Plot Analysis Page (`/analiza-dzialki`)
- `components/sections/plot-analysis/PlotAnalysisForm.tsx` — address (required), plot number, land register, MPZP status (tak/nie/nie_wiem buttons), contact fields, notes
- Green badge "Bezpłatna przy podpisaniu umowy na budowę" (no icon)
- Page-specific content: "Co obejmuje analiza?" (6 Icon cards), "Ile kosztuje?" (2-column: green 0 zł card + stacked pricing cards)

## Contact Page (`/kontakt`)
- `components/sections/contact/ContactRoutingCards.tsx` — 3 routing cards directing to LPs: "Chcę wycenę" → /wycena, "Chcę porozmawiać" → /umow-konsultacje, "Mam działkę" → /analiza-dzialki
- Correct phone: +48 664 123 757, email: biuro@coreltb.pl

## Plots System (`/dzialki`)
Scalable system for plot (land) listings at `/dzialki` with hierarchical location pages.

**Architecture:**
```
data/plots/
├── types.ts              — Plot, PlotFilters, PlotSortBy, PlotSource, PlotMedia
├── real-data.ts          — all plot data (129 plots from 4 agencies)
├── locations.ts          — hierarchical location tree (wojewodztwo > powiat > gmina > miejscowosc)
├── index.ts              — public API: allPlots, filterAndSortPlots(), getPlotsByLocation()
├── seo.ts                — per-city SEO config (meta titles, FAQ generator)
├── seo-regions.ts        — 40 unique regional data entries (geology, transport, mining, advice)
├── seo-content-generator.ts — intelligent SEO content combining regional data + dynamic stats
└── helpers.ts            — price formatting, description cleaning, address extraction
```

**Data sources (4 agencies, 129 plots):**
| Agency | Source ID | Plots | Scraper | Notes |
|--------|-----------|-------|---------|-------|
| L-R Nieruchomości | `l-r` | 37 | `scrape-malachit.mjs` | Sitemap-based, paginated listing |
| Domex Nieruchomości | `dom-ex` | 79 | `scrape-plots.mjs` | Galactica Virgo CMS, API-like listing |
| Optima Nieruchomości | `optima` | 8 | `scrape-plots.mjs` (WordPress) | WordPress Estate plugin, REST-like |
| VipHouse Nieruchomości | `viphouse` | 5 | `add-viphouse.mjs` | Manual HTML parsing, SSL expired (--insecure) |

### Data Pipeline (scrape → geocode → images → AI → TypeScript)

**Full pipeline for adding/updating plots:**
```
1. SCRAPE        → scripts/scrape-malachit.mjs (L-R) or scrape-plots.mjs (Domex/Optima) or add-viphouse.mjs
                   Output: scripts/plots-raw.json or plots-scraped.json
2. GEOCODE       → scripts/geocode-plots.mjs or geocode-plots-v2.mjs
                   Google Maps Geocoding API, output: plots-geocoded-v2.json
3. DOWNLOAD IMG  → scripts/download-plot-images.mjs
                   Downloads original JPGs from agency websites
4. OPTIMIZE IMG  → scripts/optimize-plot-images.mjs (sharp)
                   JPG → WebP: thumbs 600px q82, full 1200px q80
                   Output: public/images/dzialki/{slug}/thumb-*.webp, *.webp
5. GENERATE TS   → scripts/generate-plots-ts.mjs
                   Outputs TypeScript entries for real-data.ts
6. AI ENRICH     → scripts/rewrite-descriptions.mjs (Gemini API)
                   Rewrites raw descriptions to structured 4-section HTML
                   Model: gemini-3-flash-preview, temp 0.4
                   Sections: Lokalizacja, Charakterystyka, Media, Dojazd
                   Flags: --slug=X, --prefix=X, --dry-run
                   CRLF-safe (handles both \r\n and \n line endings)
```

**Key scripts in `scripts/`:**
- `scrape-malachit.mjs` — L-R scraper (sitemap → listing pages → detail pages)
- `scrape-plots.mjs` — Domex + Optima scraper (handles both CMS types)
- `add-viphouse.mjs` — VipHouse scraper + image downloader (sharp WebP conversion)
- `download-plot-images.mjs` — batch image downloader from source URLs
- `optimize-plot-images.mjs` — sharp JPG→WebP optimizer (thumbs + full)
- `geocode-plots.mjs` / `geocode-plots-v2.mjs` — Google Maps Geocoding
- `generate-plots-ts.mjs` — JSON → TypeScript data file generator
- `rewrite-descriptions.mjs` — Gemini API description rewriter (structured HTML)
- `enrich-plots.mjs` / `enrich-plots-v2.mjs` — metadata enrichment scripts
- `rebuild-real-data.mjs` — full rebuild of real-data.ts from scraped sources

**URL structure:** `/dzialki/[powiat]/[gmina]/[miejscowosc]` or `/dzialki/[plot-slug]` for detail pages

**Location hierarchy:** ~87 indexable locations across Slaskie (powiat wodzislawski, rybnicki, raciborski, mikolowski, pszczynski, cieszynski, bielski, zywiecki) + Bielsko-Biala, Jastrzebie-Zdroj, Zory

**Components** in `components/sections/plots/`:
- `PlotsListingSection.tsx` — main orchestrator (filters, grid, pagination, fullscreen map, mobile drawer)
- `FilterDropdown.tsx` — shared dropdown with WCAG keyboard nav (ArrowUp/Down, Enter/Space, Escape, role=listbox). Also used by `ProjectsListingSection.tsx` for sort dropdown.
- `PlotsFAQ.tsx` — FAQ accordion section
- `PlotsSeoContent.tsx` — styled SEO content HTML renderer
- `PlotsInterlinking.tsx` — "Dzialki w okolicy" related locations grid (parent/children/siblings)
- `PlotCard.tsx` — plot listing card with image, price, area, media badges
- `PlotMap.tsx` — Leaflet map with markers, clustering, boundary overlay (dynamic import, no SSR)
- `PlotDetailPage.tsx` — individual plot detail page
- `PlotDetailMap.tsx` — detail page map with approximate location circle + fullscreen toggle. Map container uses `relative z-0` to create stacking context (prevents Leaflet z-index 400+ from overlapping sticky header).
- `PlotDetails.tsx` — detail page body with GA4 analytics tracking on all CTA buttons (`trackPlotView`, `trackPlotCalculatorClick`, `trackPlotAnalysisClick`, `trackPlotContactClick`)
- `LocationSearch.tsx` — autocomplete location search with popular suggestions
- `ProjectPlotsCrossLink.tsx` — cross-link from projects to matching plots
- `PlotProjectsCrossLink.tsx` — cross-link from plots to matching projects

**Sorting:** Default is `mixed` (round-robin interleave by source agency for diverse listings). Options: mixed, newest, price-asc/desc, area-asc/desc.

**Images:** All plot images in `public/images/dzialki/` as optimized WebP (thumbs 600px q82, full 1200px q80). Pipeline: download → sharp optimize → WebP.

### SEO Content System
Intelligent, unique SEO descriptions for all ~87 location listing pages.

**How it works:**
1. `seo-regions.ts` — 40 hand-written regional data entries with: terrain (type, geology, miningInfluence, constructionNotes, soilType, floodRisk), transport (majorRoads, highways, distances, rail), character (type: urban/periurban/rural/mountain, residentialAreas), infrastructure, buildingAdvice[], priceContext
2. `seo-content-generator.ts` — combines regional data with dynamic plot statistics (prices, areas, MPZP %, media coverage) computed at build time
3. Fallback hierarchy: location slug -> parentSlug (e.g., Kokoszyce inherits from Wodzislaw Slaski)
4. Generated content targets SEO phrases: "dzialki [miasto]", "ceny dzialek [miasto]", "ile kosztuje dzialka [miasto]", "dzialka budowlana co sprawdzic"

**6 content sections per page:**
- H2: "Dzialki {lokalizacja} — lokalizacja i otoczenie" (transport, character, residential areas)
- H2: "Warunki gruntowe i budowlane" (terrain, geology, mining influence — CoreLTB expertise differentiator)
- H2: "Ile kosztuje dzialka budowlana?" (dynamic prices, areas from real data)
- H2: "Na co zwrocic uwage przy zakupie?" (MPZP, media, geotechnika, dojazd — checklist cards)
- H3: "Porady budowlane" (region-specific construction tips)
- H2: "Od dzialki do gotowego domu" (CTA with links to /wycena and /analiza-dzialki)

**Styling:** `.seo-rich-content` in `app/globals.css` — gold accent bars on H2, card-based checklist items with gold left border, 2-column grid on desktop, max-width 56rem for readability

**Schema.org:** BreadcrumbList + WebPage + Product/AggregateOffer (listing) or RealEstateListing (detail) + FAQPage

**Sitemap:** 217 /dzialki URLs (87 location + 129 detail + 1 main), priority 0.6-0.7, weekly

**Google Indexing:** `scripts/submit-indexing.mjs` — batch submission to Google Indexing API (200/day). Tracks history in `scripts/indexing-history.json`. Flags: `--filter`, `--limit`, `--dry-run`, `--status`, `--all`, `--reset`.

**Navigation:** "Dzialki" in main header nav + "Dzialki budowlane" in footer

## Local Pages System (data/local/)
Scalable system for city-specific landing pages at `/obszar-dzialania/[slug]`.

**Architecture:**
- `data/local/types.ts` — all interfaces (CityData, ResolvedLocalPageData, etc.)
- `data/local/shared-template.ts` — shared data with `{cityName}`/`{cityNameLocative}` placeholders
- `data/local/index.ts` — merge logic, public API: `getLocalPageBySlug()`, `getAllLocalPageSlugs()`
- `data/local/cities/*.ts` — one file per city (~100-200 lines each)

**Adding a new city:** Create `data/local/cities/{slug}.ts` exporting `CityData`, add import to `index.ts` `allCities[]`, add hero image.

**11 cities:** rybnik, wodzislaw-slaski, tychy, katowice, jaworzno, mikolow, gliwice, zabrze, zory, jastrzebie-zdroj, raciborz

**Local page components** in `components/sections/local/`:
- ServicePillarsSection, MidPageCTA, LocalExpertiseSection, WhyUsSection
- PartnerLogosMarquee, DistrictsSection, NearbyCitiesSection
- **BuildingStagesSection** — timeline component for `etapy-realizacji` additionalSections

**Old file:** `data/local-pages.ts` is deprecated (still exists but no imports reference it)

## Realizacje System (data/realizacje/)
Scalable system for construction case studies (build diaries) at `/realizacje` and `/realizacje/[slug]`.

**Architecture:**
- `data/realizacje/types.ts` — all interfaces: `RealizationData`, `BuildStage`, `StageImage`, `ProjectCard`, `ExpertInsight`, `StageChallenge`, `TechnicalFact`, `MidBuildCTA`, `RealizationFAQItem`, `RealizationSummary`, `RealizationListingItem`
- `data/realizacje/shared-content.ts` — `STAGE_LIBRARY` with default expert insights and technical facts per stage type
- `data/realizacje/index.ts` — public API: `allRealizations`, `allRealizationListings`, `getRealizationBySlug()`, `getAllRealizationSlugs()`. Derives listing items from full data with progress calculation.
- `data/realizacje/projects/*.ts` — one file per realization

**Active realizations:**
- `zabrze-2024.ts` — Dom 200 m2, Zabrze, ul. Gwiazdy Polarnej. Status: in-progress (85%). 8 stages documented. Ceramika szlifowana 24.5cm, strop monolityczny, blacha na rabek, pompa ciepla Buderus, LOXONE. 33 photos.

**Removed:** `mikolow-2025.ts` — placeholder, removed from listing (will add when real data available)

**Adding a new realization:** Create `data/realizacje/projects/{slug}.ts` exporting `RealizationData`, add import to `index.ts` `allRealizationsRaw[]`, add photos to `public/images/realizacje/{slug}/`.

**Progress system:** Each `ProjectCard` has optional `progress?: number` (0-100) that overrides the heuristic (which counts stages with narrative+images). Important for in-progress builds where all stages are documented but build isn't complete.

**Listing page (`/realizacje`):**
- Layout: baza-wiedzy style — no hero image, breadcrumbs + H1 + description inline
- H1: "Budowa domu **krok po kroku**" (golden highlight)
- Status filters: Wszystkie / W trakcie (golden) / Zakonczone (green) — with counts
- Grid: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- SEO title: `Budowa domu krok po kroku - Realizacje ze zdjeciami | CoreLTB`
- Component: `RealizacjeListingSection` (client, with filters)

**Detail page (`/realizacje/[slug]`):**
- TOC: mobile — collapsible accordion at top (collapsed by default), desktop — sticky sidebar
- Article: hero image with lightbox, stage timeline with interleaved midCTAs
- Each stage: gallery (1/2/3+ image layouts), narrative, challenge box (amber), expert insight box (green), technical facts bar
- Summary: dark stats card (bg-zinc-900) with icons, headline, description, CTA buttons
- FAQ + ContactCTA at bottom
- Schema.org: Article + ImageGallery + FAQPage

**Realizacje components** in `components/sections/realizacje/`:
- `RealizacjeListingSection` — listing page with status filters (client component)
- `RealizationCard` — listing card with status badge (golden for in-progress), spec pills, progress bar
- `RealizationArticle` — full article body with shared lightbox
- `RealizationContent` — TOC with mobile collapsible + desktop sticky sidebar
- `BuildTimeline` — interleaves stages with midCTAs
- `BuildStageEntry` — single stage: gallery, narrative, challenge/insight boxes, technical facts
- `RealizationSummary` — dark stats card + testimonial + CTA
- `ProjectInfoCard` — project specs card in article header
- `MidBuildCTABlock` — calculator/consultation CTA between stages
- `RealizationLightbox` — shared lightbox for all images (hero + stages)

**Gallery layout (3+ images in BuildStageEntry):**
- Grid: `grid-cols-[2fr_1fr]` with explicit height `h-[224px] md:h-[310px]`
- Left: large image with caption below (flex-1 + flex-shrink-0)
- Right: 2 stacked images with captions, "+N zdjec" badge on last if hidden images
- Captions under images (not overlays), bottom edges aligned via shared container height

**Status badge colors:**
- "W trakcie" — golden (`bg-primary/90 text-zinc-900`) with pulsing dot
- "Zakonczona" — green (`bg-green-500/90 text-white`)

**Redirect removed:** Old `/realizacje -> /projekty` 301 redirect removed from `public/_redirects` (was from Venet migration).

**Photos:** `public/images/realizacje/zabrze-2024/` — 33 SEO-named photos, ~37MB total (needs optimization). Named by stage: `fundamenty-*.jpg`, `sciany-*.jpg`, `strop-*.jpg`, `wiezba-*.jpg`, `dach-*.jpg`, `kanalizacja-*.jpg`, `ssz-*.jpg`, `instalacje-*.jpg`.

## Ads & Analytics (`docs/ads.md`)

### Platforms Status
| Platform | Status |
|---|---|
| Google Search Console | Done (coreltb.pl, dawidFC@gmail.com) |
| GA4 | TODO — need Measurement ID (G-XXXXXXXXXX) |
| Google Tag Manager | TODO — container to create & embed in `app/layout.tsx` |
| Google Ads | TODO — account to create |
| Meta Pixel | TODO — pixel to create & embed |

### Planned Campaigns
- **Search:** "budowa domu wycena", "kalkulator budowy domu" -> `/wycena`
- **Local Search:** "budowa domu [miasto]" -> `/wycena`
- **Brand:** "coreltb", "core ltb" -> `/`
- **Remarketing (Google+Meta):** visitors of `/wycena` who didn't submit -> `/wycena`
- **Meta Lookalike:** from calculator conversions -> `/wycena`
- **Meta Awareness:** interests: budowa domu -> `/projekty`

### Conversion Events (GA4 + Ads)
| Event | Trigger |
|---|---|
| `calculator_lead` | Form submit on `/wycena` (PRIMARY) |
| `calculator_start` | First param change in calculator |
| `calculator_call` | Phone click from calculator |
| `contact_form_submit` | Form submit on `/kontakt` |
| `phone_click` | Any phone number click |

### UTM Convention
`utm_source=google|facebook`, `utm_medium=cpc|social`, `utm_campaign={typ}-{miasto}-{data}`, `utm_content={wariant}`

### Implementation TODO
- [ ] Create GTM container, embed in `app/layout.tsx`
- [ ] Create `lib/analytics.ts` with `trackEvent()` / `trackLead()` helpers
- [ ] Add event tracking to `CalculatorForm.tsx` (submit + PDF)
- [ ] Add event tracking to contact form
- [ ] Configure GA4 property + Measurement ID
- [ ] Configure conversion goals in Google Ads
- [ ] Create Meta Pixel, embed, configure audiences
- [ ] Test events in GA4 DebugView + Meta Events Manager

## Lead Email System (Cloudflare Pages Functions)

**Architecture:** Since the site uses `output: 'export'` (fully static HTML), Next.js API routes don't work. Email sending is handled by a **Cloudflare Pages Function** — a serverless endpoint that runs alongside the static site.

**API endpoint:** `functions/api/lead.ts` — Cloudflare Pages Function at `POST /api/lead`, accepts `{ source, data }`:

| Source | Form | Email subject prefix |
|--------|------|---------------------|
| `calculator` | `/wycena` | `[Wycena]` — config + estimate total |
| `consultation` | `/umow-konsultacje` | `[Konsultacja]` — service + city |
| `plot_analysis` | `/analiza-dzialki` | `[Analiza działki]` — address |

**IMPORTANT:** The function is fully standalone — no imports from `lib/` or other project files. It contains its own email templates, validation, and security logic inline.

**Email delivery:** Resend REST API (direct `fetch` to `https://api.resend.com/emails`) — NOT the Resend SDK (can't use npm packages in Pages Functions easily).

**Cloudflare env vars** (set in Cloudflare Dashboard → Settings → Environment variables, for BOTH Production AND Preview):
- `RESEND_API_KEY` — Resend API key
- `LEAD_NOTIFICATION_EMAIL` — recipient (currently `biuro@coreltb.pl`)
- `LEAD_FROM_EMAIL` — sender address
- Compatibility flag: `nodejs_compat`

**Build config** (Cloudflare Dashboard):
- Build command: `npm run build` (NOT `npx @cloudflare/next-on-pages` — that generates `_worker.js` which overrides `functions/`)
- Build output directory: `out`

**Security (3 layers):**
1. **Origin check** — Referer/Origin header must match `ALLOWED_ORIGINS` list (coreltb.pl, localhost, pages.dev subdomains)
2. **Rate limiting** — 5 requests/IP/minute via in-memory Map (per-isolate, basic protection)
3. **Honeypot field** — hidden `website` input in all 3 forms; if filled (by bots), returns fake `200 OK` without sending email

**Each form POSTs to `/api/lead`** with try/catch — user always sees success even if email fails (graceful degradation). Console logs errors server-side.

**Deprecated files** (no longer imported, can be cleaned up):
- `lib/email/send.ts` — old Resend SDK wrapper
- `lib/email/templates.ts` — old HTML templates (now inline in `functions/api/lead.ts`)
- `app/api/lead/route.ts` — deleted (didn't work with static export)

## Form Validation & UX

**Phone validation** (`lib/validation.ts`):
- `validatePolishPhone(raw)` — strips non-digits, removes +48/48 prefix, validates 9 digits, first digit must be 2-8, rejects fake patterns (all same digits like 111111111, sequential like 123456789)
- `formatPolishPhone(raw)` — formats to "XXX XXX XXX"
- Used by all 3 form components (calculator, consultation, plot analysis)

**Scroll-to-error with red pulse** (calculator + consultation forms):
- When user submits with missing required OptionGroup selections, form scrolls to first error and flashes red 3 times
- CSS animation in `app/globals.css`: `@keyframes errorPulse` — 3x red `box-shadow` pulse in 1.5s
- Class `.animate-error-pulse` applied temporarily via JS, removed on `animationend`
- OptionGroups have `data-option-group="{field}"` attribute for scroll targeting
- Calculator: all 8 OptionGroups support error pulse
- Consultation: service type selection grid supports error pulse

## Google Ads Reports (Skills)
- **Skill:** `~/.claude/skills/google-ads-report.md` — schema for generating professional HTML campaign reports
- **Template:** `google-ads/analizy/raport-coreltb-pelny-24mar-01apr.html` — reference report (dark theme, Manrope, gold accents, 13 sections)
- **Data sources:** `google-ads/analizy/*.html` (exported from Google Sheets), `SEO/seo-agent/reports/full-report-*.md` (orchestrator)
- **Logo:** `google-ads/analizy/logo-b64.txt` (base64 webp for embedding)
- **Trigger phrases:** "raport kampanii", "raport google ads", "raport dla klienta"
- **Sections:** KPI summary, daily breakdown, channels, landing pages, search terms (with category cards), devices/hours/days, funnel, SEO comparison, GBP, learning phase, campaign strategy, business value, recommendations

## Business & Pricing
- **`docs/PRICING-RULES.md`** — **ZASADY CENOWE:** jedyne zrodlo prawdy to `data/pricing.ts`. Wszystkie ceny na stronie, w artykulach, FAQ i local pages MUSZA byc weryfikowane z kalkulatorem. Zawiera stawki, konfiguracje referencyjne, zakresy i wzory obliczen. CZYTAJ PRZED PISANIEM TRESCI Z CENAMI.
- **`docs/BIBLIA-CEN-PROJEKTU.md`** — cennik, zakres uslug, model pracy, plan rozwoju, etapowanie systemu dzialek, abonament 3k/msc, timeline
- **`docs/SYSTEM-DZIALEK.md`** — specyfikacja techniczna systemu dzialek (`/dzialki`), typy danych, architektura, etapowanie MVP/Rozszerzenie/Premium

## Claude Code Workflow
- **`docs/CLAUDE-CODE-IMPROVEMENTS.md`** — plan ulepszen workflow: rules folder, code review skill z 4 sub-agentami, pipeline (brainstorm->plan->execute->review->compound), compound learning, czyszczenie permissions
- TODO: stworzyc `.claude/rules/` i przeniesc sekcje z CLAUDE.md (coding-standards, seo-system, ads-reports, local-pages, calculator-system, cloudflare-patterns)
- TODO: stworzyc skille workflow (code-review, dev-brainstorm, dev-plan, compound)
- TODO: stworzyc `.claude/insights.md` — compound learning z sesji

## Key Files
- `app/wycena/page.tsx` — calculator LP (with `<Suspense>`)
- `app/umow-konsultacje/page.tsx` — consultation LP (with `<Suspense>`)
- `app/analiza-dzialki/page.tsx` — plot analysis LP
- `app/kontakt/page.tsx` — contact page with routing cards
- `functions/api/lead.ts` — Cloudflare Pages Function for lead emails (standalone, no imports)
- `lib/validation.ts` — shared phone validation (`validatePolishPhone`, `formatPolishPhone`)
- `app/projekty/[slug]/page.tsx` — project detail page
- `app/projekty/page.tsx` — projects listing (RSC)
- `app/realizacje/page.tsx` — realizacje listing (baza-wiedzy style, status filters)
- `app/realizacje/[slug]/page.tsx` — realizacja detail page (TOC + article + FAQ)
- `data/realizacje/index.ts` — realizacje public API (listings, slugs, getBySlug)
- `data/realizacje/types.ts` — all realizacje types
- `data/realizacje/projects/zabrze-2024.ts` — first real realization (200m2, Zabrze)
- `app/dzialki/[...slug]/page.tsx` — plot listing/detail page (hierarchical slugs)
- `app/dzialki/page.tsx` — main plots listing
- `data/plots/seo-regions.ts` — 40 regional SEO data entries
- `data/plots/seo-content-generator.ts` — dynamic SEO content generator
- `data/plots/locations.ts` — hierarchical location tree
- `data/plots/real-data.ts` — all plot data
- `components/sections/plots/PlotsListingSection.tsx` — main plots orchestrator
- `app/obszar-dzialania/[slug]/page.tsx` — local page route
- `components/sections/shared/` — LPTrustBar, LPTestimonials, LPSteps
- `components/sections/consultation/ConsultationForm.tsx` — consultation form
- `components/sections/plot-analysis/PlotAnalysisForm.tsx` — plot analysis form
- `components/sections/calculator/CalculatorForm.tsx` — calculator form + estimate
- `data/projects/helpers.ts` — filter/sort/parse + `buildCalculatorUrl()`
- `data/projects/types.ts` — Project, ProjectListingItem, filter types
- `data/pricing.ts` — calculator pricing engine
- `data/company-data.ts` — company info (email: biuro@coreltb.pl, phone: +48 664 123 757)
- `lib/schema/generators.ts` — Schema.org JSON-LD
- `app/sitemap.ts` — imports from `@/data/local`
- `data/servicesV2.ts` — service definitions
- `docs/ads.md` — ads & analytics config
- `docs/LANDING-PAGES-STRATEGY.md` — full funnel strategy
- `docs/INTERLINKING-MAP.md` — mapa interlinkingu: wszystkie linki wewnetrzne, status, plan

## Internal Linking Strategy
- **`docs/INTERLINKING-MAP.md`** — centralna mapa wszystkich linkow wewnetrznych na stronie
- Tracks: existing links, newly added links, planned links with priorities
- Content rendering: blog-data.ts uses HTML (dangerouslySetInnerHTML in BlogPostContent), realizacje expertInsight uses dangerouslySetInnerHTML, local page WhyUsSection uses dangerouslySetInnerHTML
- **Update this doc after EVERY content change** that adds/removes internal links

## SEO System (SEO/seo-agent/)
Node.js system with orchestrator + 3 specialized agents. Real data from GSC + GA4.
Domena: **coreltb.pl** | GSC: Done | GA4: Done (property 529532413)

**Architecture:**
```
SEO/
├── seo-agent/
│   ├── orchestrator.js        <- MAIN: orchestrator with 3 agents + executive summary
│   ├── agent.js               <- Legacy: simple GSC+GA4 report
│   ├── config.json            <- config (coreltb.pl, thresholds, keyword groups)
│   ├── seo-actions.json       <- SEO change log (correlates with effects)
│   ├── lib/
│   │   ├── auth.js            <- OAuth2 ADC authentication
│   │   ├── gsc.js             <- Google Search Console API
│   │   ├── ga4.js             <- Google Analytics 4 Data API
│   │   ├── analyzer.js        <- GSC analysis (movers, groups, alerts, opportunities)
│   │   ├── ads-analyzer.js    <- Ads analysis (channels, conversions, LP performance)
│   │   ├── link-analyzer.js   <- Link building (evaluate, add, budget, report)
│   │   └── formatter.js       <- Markdown report generator
│   ├── data/
│   │   └── links-db.json      <- Link building database (purchased links, budget)
│   ├── credentials/           <- (gitignored)
│   └── reports/               <- (gitignored)
├── analizy/                   <- Saved SEO analyses & strategies
│   ├── YYYY-MM-DD-opis.md
│   └── link-building-strategy.md  <- Link building strategy & proposal templates
└── scripts/
    └── submit-indexing.mjs    <- Batch Google Indexing API submission (200/day)
```

**Auth:** OAuth2 ADC from `%APPDATA%/gcloud/application_default_credentials.json` (dawidFC@gmail.com).
Token refresh: `py "D:\NEXUS V2\credentials\setup_analytics_adc.py"`

### Orchestrator Commands (user can say: "odpal agentow", "pelny raport", "raport SEO")
```bash
# Full report — all 3 agents (GSC+GA4, Ads, Links)
node SEO/seo-agent/orchestrator.js                    # 28 days (default)
node SEO/seo-agent/orchestrator.js --days 7           # 7 days

# Single agent only
node SEO/seo-agent/orchestrator.js --agent gsc        # only GSC+GA4
node SEO/seo-agent/orchestrator.js --agent ads        # only Ads analysis
node SEO/seo-agent/orchestrator.js --agent links      # only Link Building
```

### Link Building Commands (user can say: "ocen link", "dodaj link", "raport linkow")
```bash
# Evaluate a link proposal (WhitePress etc.)
node SEO/seo-agent/orchestrator.js --evaluate-link '{"portal":"Name","dr":25,"traffic":5000,"price":200,"topic":"budownictwo region","targetPage":"/obszar-dzialania/rybnik"}'

# Add purchased link to database
node SEO/seo-agent/orchestrator.js --add-link '{"portal":"Name","dr":25,"price":200,"targetPage":"/obszar-dzialania/rybnik","anchor":"firma budowlana Rybnik"}'

# Link building report (purchased links, budget, ROI)
node SEO/seo-agent/orchestrator.js --link-report
```

### Indexing Commands (user can say: "wyslij URLe do indeksacji")
```bash
node scripts/submit-indexing.mjs                      # submit project URLs (200/day)
node scripts/submit-indexing.mjs --dry-run             # list URLs without submitting
node scripts/submit-indexing.mjs --limit 50            # submit first 50
node scripts/submit-indexing.mjs --filter /obszar      # custom URL filter
```

### Legacy Agent (simple GSC+GA4 report)
```bash
node SEO/seo-agent/agent.js                  # 28-day report
node SEO/seo-agent/agent.js --days 7         # 7-day report
node SEO/seo-agent/agent.js --test-auth      # test connection
```

**SEO change log (`seo-actions.json`):** After EVERY SEO change, add entry with date, type, description. Agent correlates changes with effects.

**Link building strategy:** `SEO/analizy/link-building-strategy.md` — targets, budget variants, anchor mix, proposal template, purchased links log.

**IMPORTANT:** GA4 conversion events (calculator_lead etc.) currently include test submissions. Real lead count should be verified against Resend email logs. User will provide real lead numbers separately.

**TODO:**
- [ ] Request historical GSC data from Venet
- [ ] Set up redirects from old URL structure
- [ ] Submit remaining ~320 project URLs to Indexing API (200/day batches)
