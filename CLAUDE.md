# Elever — CoreLTB Builders Website

## Project Overview
- Next.js App Router website for CoreLTB Builders (home construction, Silesia region, Poland)
- Branch: v3, Main: master
- Polish language content, SEO-focused

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

## Key Files
- `app/obszar-dzialania/[slug]/page.tsx` — local page route (Layout A)
- `lib/schema/generators.ts` — Schema.org JSON-LD (FAQPage, Service, BreadcrumbList, LocalBusiness)
- `app/sitemap.ts` — imports from `@/data/local`
- `data/servicesV2.ts` — service definitions
- `data/company-data.ts` — company info, telephone, email, schema helpers

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
