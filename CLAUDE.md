# Elever — CoreLTB Builders Website

## Project Overview
- Next.js App Router website for CoreLTB Builders (home construction, Silesia region, Poland)
- Branch: v3, Main: master
- Polish language content, SEO-focused
- No Framer Motion — all animations use CSS transitions/keyframes + `useInView` from `react-intersection-observer`

## Git Workflow & Deployment
- **`v3`** — main working branch, **direct production deploys** to **coreltb.pl** (Cloudflare Pages)
- Every push to `v3` auto-deploys to production — no merge needed
- Cloudflare Pages project: `coreltb` (repo: `czeko-ludek/coreLTB`, production branch: `v3`)
- `coreltb-v2` project — ignored, not used
- Build command: `npx next build`, output: `out` (static export)
- Cloudflare Pages Functions: `functions/api/lead.ts` (standalone, no imports from lib/)
- Env vars (Cloudflare Dashboard): `RESEND_API_KEY`, `LEAD_NOTIFICATION_EMAIL`, `LEAD_FROM_EMAIL`

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

## Key Files
- `app/wycena/page.tsx` — calculator LP (with `<Suspense>`)
- `app/umow-konsultacje/page.tsx` — consultation LP (with `<Suspense>`)
- `app/analiza-dzialki/page.tsx` — plot analysis LP
- `app/kontakt/page.tsx` — contact page with routing cards
- `functions/api/lead.ts` — Cloudflare Pages Function for lead emails (standalone, no imports)
- `lib/validation.ts` — shared phone validation (`validatePolishPhone`, `formatPolishPhone`)
- `app/projekty/[slug]/page.tsx` — project detail page
- `app/projekty/page.tsx` — projects listing (RSC)
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

## SEO Agent (SEO/seo-agent/)
Node.js agent pulling real data from Google Search Console + GA4, generating Markdown reports.
Domena: **coreltb.pl** | GSC: Done | GA4: TODO

**Architecture:**
```
SEO/
├── seo-agent/
│   ├── agent.js              <- CLI orchestrator
│   ├── config.json           <- config (coreltb.pl, thresholds, keyword groups)
│   ├── seo-actions.json      <- SEO change log (correlates with effects)
│   ├── lib/
│   │   ├── auth.js, gsc.js, ga4.js, analyzer.js, formatter.js
│   ├── credentials/          <- (gitignored)
│   └── reports/              <- (gitignored)
└── analizy/                  <- Saved SEO analyses
    └── YYYY-MM-DD-opis.md
```

**Auth:** OAuth2 ADC from `%APPDATA%/gcloud/application_default_credentials.json` (dawidFC@gmail.com).
Token refresh: `py "D:\NEXUS V2\credentials\setup_analytics_adc.py"`

**Commands:**
```bash
node SEO/seo-agent/agent.js                  # 28-day report (default)
node SEO/seo-agent/agent.js --days 7         # 7-day report
node SEO/seo-agent/agent.js --gsc-only       # GSC only (no GA4)
node SEO/seo-agent/agent.js --test-auth      # test connection
node SEO/seo-agent/agent.js --actions        # show SEO change log
```

**SEO change log (`seo-actions.json`):** After EVERY SEO change, add entry with date, type, description. Agent correlates changes with effects.

**TODO po deploy:**
- [ ] Connect GA4 -> add `propertyId` to `config.json`
- [ ] Request historical GSC data from Venet
- [ ] Set up redirects from old URL structure
