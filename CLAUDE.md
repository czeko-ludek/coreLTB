# Elever — CoreLTB Builders Website

## Project Overview
- Next.js App Router website for CoreLTB Builders (home construction, Silesia region, Poland)
- Branch: v3, Main: master
- Polish language content, SEO-focused

## Landing Pages & Conversion Strategy
Full strategy doc: **`docs/LANDING-PAGES-STRATEGY.md`** — describes all conversion landing pages (calculator `/wycena`, consultation `/umow-konsultacje`, plot analysis `/analiza-dzialki`), CTA mapping across the site, GA4 event naming, Google Ads campaign structure, and backend API routes for form handling. Reference this file when building any new LP, changing CTA destinations, or setting up analytics/ads.

## Local Pages System (data/local/)
Scalable system for city-specific landing pages at `/obszar-dzialania/[slug]`.

**Architecture:**
- `data/local/types.ts` — all interfaces (CityData, ResolvedLocalPageData, etc.)
- `data/local/shared-template.ts` — shared data with `{cityName}`/`{cityNameLocative}` placeholders
- `data/local/index.ts` — merge logic, public API: `getLocalPageBySlug()`, `getAllLocalPageSlugs()`
- `data/local/cities/*.ts` — one file per city (~100-200 lines each)

**Adding a new city:** Create `data/local/cities/{slug}.ts` exporting `CityData`, add import to `index.ts` `allCities[]`, add hero image.

**7 cities:** rybnik, wodzislaw-slaski, tychy, katowice, jaworzno, mikolow, gliwice

**Local page components** in `components/sections/local/`:
- ServicePillarsSection, MidPageCTA, LocalExpertiseSection, WhyUsSection
- PartnerLogosMarquee, DistrictsSection, NearbyCitiesSection
- **BuildingStagesSection** — dedicated timeline component for `etapy-realizacji` additionalSections. Numbered steps with dashed connecting line, keyword-based pillar interlinking (SSO/Deweloperski/Pod Klucz → `/oferta/kompleksowa-budowa-domow`). Routed in page.tsx by `section.id === 'etapy-realizacji'`; other additionalSections still use LocalExpertiseSection.

**Old file:** `data/local-pages.ts` is deprecated (still exists but no imports reference it)

## Calculator / Wycena Page (`/wycena`)
Lead generation landing page with cost calculator at `app/wycena/page.tsx`.

**Architecture:**
- `data/pricing.ts` — pricing engine: `calculateEstimate()`, material/labor/equipment breakdown per construction stage, geometric quantity calculations. Types: `CalculatorConfig`, `EstimateBreakdown`, `StageBreakdown`, `MaterialItem`. Labels: `WALL_LABELS`, `ROOF_LABELS`, `FLOOR_LABELS`, `GARAGE_LABELS`, `FINISH_LABELS`, `HEATING_LABELS`
- `components/sections/calculator/CalculatorForm.tsx` — main form + estimate document. `useReducer` for form state (area, floors, wallType, roofType, garage, finish, heating, contact fields). Generates professional estimate PDF with logo, ref number, per-stage material tables, print CSS
- `components/sections/calculator/CalculatorHero.tsx` — mobile-only hero header (white text on dark bg)
- `components/sections/calculator/CalculatorTrustBar.tsx` — 4 trust badges (200+ domów, stała cena, gwarancja terminu, 5 lat gwarancji)
- `components/sections/calculator/CalculatorTestimonials.tsx` — 8 testimonials, CSS marquee infinite scroll
- `components/sections/calculator/CalculatorSteps.tsx` — "Od wyceny do budowy w 3 krokach"
- `components/sections/calculator/HideHeader.tsx` — hides global header on desktop only (lg+), SSR inline `<style>` for zero flash
- `components/ui/OptionCard.tsx` — reusable selection card for calculator options

**Config options:** area (80-500 m², slider + manual input), floors (parterowy/piętrowy), wall type (silikat/ceramika/beton komórkowy), roof type (dwuspadowy/czterospadowy/kopertowy), garage (brak/jedno/dwustanowiskowy), finish standard (SSO/deweloperski/pod klucz), heating type (gazowe/pompa ciepła/elektryczne)

**Mobile specifics:** Header hidden, custom hamburger menu + drawer (identical to Header component). Slider hidden, area input only. Estimate sections stack vertically.

**Ads config:** See `docs/ads.md` for Google Ads / Meta Ads / analytics configuration.

## Key Files
- `app/obszar-dzialania/[slug]/page.tsx` — local page route (Layout A)
- `lib/schema/generators.ts` — Schema.org JSON-LD (FAQPage, Service, BreadcrumbList, LocalBusiness)
- `app/sitemap.ts` — imports from `@/data/local`
- `data/servicesV2.ts` — service definitions
- `data/company-data.ts` — company info, telephone, email, schema helpers
- `data/pricing.ts` — calculator pricing engine, material quantities, labels
- `app/wycena/page.tsx` — calculator landing page route

## SEO Agent (SEO/seo-agent/)
Node.js agent pulling real data from Google Search Console + GA4, generating Markdown reports.
Domena: **coreltb.pl** | GSC: ✅ podłączone | GA4: ⏳ do podłączenia po deploy

**Architecture:**
```
SEO/
├── seo-agent/                ← Agent (Node.js, googleapis)
│   ├── agent.js              ← CLI orkiestrator
│   ├── config.json           ← konfiguracja (coreltb.pl, progi, grupy fraz)
│   ├── seo-actions.json      ← rejestr zmian SEO (korelacja z efektami)
│   ├── lib/
│   │   ├── auth.js           ← OAuth2 ADC auth (konto dawidFC@gmail.com)
│   │   ├── gsc.js            ← 5 raportów GSC
│   │   ├── ga4.js            ← 5 raportów GA4 (do podłączenia)
│   │   ├── analyzer.js       ← top movers, grupy fraz, szanse, alerty, korelacja
│   │   └── formatter.js      ← raport Markdown (11 sekcji po polsku)
│   ├── credentials/          ← (gitignored)
│   └── reports/              ← (gitignored)
└── analizy/                  ← Zapisane analizy SEO (ręczne + automatyczne)
    └── YYYY-MM-DD-opis.md    ← konwencja nazw
```

**Auth:** OAuth2 User Credentials (ADC) z `%APPDATA%/gcloud/application_default_credentials.json`.
Konto: `dawidFC@gmail.com` — dodany jako właściciel w GSC coreltb.pl.
Jeśli token wygaśnie: `py "D:\NEXUS V2\credentials\setup_analytics_adc.py"` (scopy: analytics.readonly + webmasters.readonly).

**Komendy agenta:**
```bash
node SEO/seo-agent/agent.js                  # raport 28 dni (domyślnie)
node SEO/seo-agent/agent.js --days 7         # raport 7 dni
node SEO/seo-agent/agent.js --days 90        # raport 90 dni
node SEO/seo-agent/agent.js --gsc-only       # tylko GSC (bez GA4)
node SEO/seo-agent/agent.js --test-auth      # test połączenia GSC + GA4
node SEO/seo-agent/agent.js --actions        # pokaż rejestr zmian SEO
```

**Jak wykonać analizę SEO (dla przyszłych agentów):**
1. Uruchom: `node SEO/seo-agent/agent.js --days 28 --gsc-only`
2. Przeczytaj raport: `SEO/seo-agent/reports/latest-report.md`
3. Zapisz analizę z wnioskami: `SEO/analizy/YYYY-MM-DD-opis.md`
4. Po każdej zmianie SEO dodaj wpis do `seo-actions.json` (agent koreluje zmiany z efektami)

**Rejestr zmian SEO (`seo-actions.json`):**
Po KAŻDEJ zmianie SEO (content, technical, schema, redirect) dodaj wpis z datą, typem i opisem.
Agent koreluje zmiany z efektami: POTWIERDZONE / PRAWDOPODOBNE / ZA_WCZESNIE / BRAK_EFEKTU / NEGATYWNE.

**Grupy fraz w config.json:** budowa-domow, projekty-domow, pod-klucz, sso, deweloperski, slask, rybnik, katowice, tychy, wodzislaw, gliwice

**11 sekcji raportu:** Przegląd GSC, Przegląd GA4, Grupy słów kluczowych, Top movers keywords (↑↓✨❌), Top movers strony, Źródła ruchu, Kraje, Urządzenia, Wpływ zmian SEO, Szanse, Alerty

**TODO po deploy:**
- [ ] Podłączyć GA4 → wpisać `propertyId` w `config.json`
- [ ] Poprosić Venet o transfer/dostęp do historycznych danych GSC
- [ ] Ustawić przekierowania ze starej struktury URL
