# CoreLTB Builders - Kompletna Mapa Projektu

Dokument stanowi pelna mape architektoniczna projektu CoreLTB Builders - strony internetowej firmy budowlanej.
Zawiera inwentaryzacje wszystkich zaleznosci, komponentow, stron, plikow danych i ich wzajemnych powiazan.
Cel: jeden dokument referencyjny dla dewelopera, ktory pozwala szybko zrozumiec co gdzie jest i co od czego zalezy.

**Wygenerowano:** 2026-02-16

---

# 1. STOS TECHNOLOGICZNY I ZALEZNOSCI

## 1.1 Zaleznosci Produkcyjne

| Paczka | Wersja | Rola w Projekcie |
|--------|--------|------------------|
| `next` | ^15.5.9 | Framework - SSR/SSG, routing, optymalizacja obrazow |
| `react` | ^19.2.3 | Biblioteka UI |
| `react-dom` | ^19.2.3 | Renderer DOM |
| `clsx` | ^2.1.0 | Warunkowe laczenie klas CSS (uzywany w ~90% komponentow) |
| `framer-motion` | ^12.27.5 | Animacje (PageHeader, HeroSection) |
| `lucide-react` | ^0.562.0 | Ikony - 80+ ikon przez komponent `Icon` |
| `react-intersection-observer` | ^9.16.0 | Scroll-triggered animations (useInView) |
| `swiper` | ^11.2.10 | Karuzele (Hero, Projekty, Testimonials, Blog) |

## 1.2 Zaleznosci Deweloperskie

| Paczka | Wersja | Rola |
|--------|--------|------|
| `typescript` | ^5 | Type-safety |
| `tailwindcss` | ^3.4.1 | Utility-first CSS |
| `postcss` | ^8.4.35 | Pipeline CSS |
| `autoprefixer` | ^10.4.23 | Vendor prefixes |
| `eslint` | ^9.39.2 | Linting |
| `eslint-config-next` | ^15.5.9 | Reguly ESLint dla Next.js |
| `@cloudflare/next-on-pages` | ^1.13.16 | Deployment na Cloudflare Pages |
| `wrangler` | ^4.59.2 | CLI Cloudflare Workers |
| `@svgr/webpack` | ^8.1.0 | Import SVG jako komponenty React |
| `critters` | ^0.0.25 | Critical CSS inlining |
| `baseline-browser-mapping` | ^2.9.14 | Browser compatibility mapping |
| `@types/node` | ^20 | Typy Node.js |
| `@types/react` | ^19.2.8 | Typy React |
| `@types/react-dom` | ^19.2.3 | Typy React DOM |
| `@eslint/eslintrc` | ^3.3.1 | ESLint config utilities |

## 1.3 Skrypty NPM

| Komenda | Opis |
|---------|------|
| `npm run dev` | Serwer deweloperski (Next.js) |
| `npm run build` | Build produkcyjny |
| `npm run pages:build` | Build Cloudflare Pages (`npx @cloudflare/next-on-pages`) |
| `npm run preview` | Build CF + podglad lokalny (`wrangler pages dev`) |
| `npm run deploy` | Build CF + deploy (`wrangler pages deploy`) |
| `npm run start` | Serwer produkcyjny (Next.js) |
| `npm run lint` | ESLint |

---

# 2. ARCHITEKTURA KOMPONENTOW (Atomic Design)

## 2.1 ATOMY (`/components/ui/`) - 7 komponentow

| Komponent | Plik | Client | Props Interface | Opis |
|-----------|------|--------|-----------------|------|
| **Button** | `Button.tsx` | Nie | `ButtonProps` | 5 wariantow (primary/secondary/outline/ghost/outline-white), 3 rozmiary. Renderuje `<button>` lub `<Link>` |
| **Icon** | `Icon.tsx` | Nie | `IconProps`, `IconName` | 80+ ikon z lucide-react. Rozmiary: xs/sm/md/lg/xl |
| **SectionLabel** | `SectionLabel.tsx` | Nie | `SectionLabelProps` | Zlota linia + uppercase label (0.75rem) |
| **FloatingCTA** | `FloatingCTA.tsx` | Tak | `FloatingCTAProps` | Sticky floating button (fixed bottom-right), pojawia sie po scrollu |
| **InputField** | `InputField.tsx` | Nie | `InputFieldProps` | Input formularza, theme: light/dark |
| **Portal** | `Portal.tsx` | Tak | `PortalProps` | Renderuje children w document.body (modale, tooltipy) |
| **MapTooltip** | `MapTooltip.tsx` | Nie | - | Tooltip nad miastem na mapie interaktywnej |

**Eksportowane z `index.ts`:** Button, Icon, SectionLabel, Portal, FloatingCTA, InputField

---

## 2.2 MOLEKULY (`/components/shared/`) - 43 komponenty

### Naglowki i Nawigacja

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **SectionHeader** | `SectionHeader.tsx` | Nie | `SectionHeaderProps` | Label + H2 + Description. Align: left/center. Theme: dark/light. Wszedzie. |
| **PageHeader** | `PageHeader.tsx` | Tak | `PageHeaderProps` | Hero z obrazem tla + breadcrumbs + watermark. O nas, Oferta, Kontakt, Lokalne. |
| **MegaMenu** | `MegaMenu.tsx` | Tak | `MegaMenuProps` | Dropdown z kartami uslug. W Header. |
| **TableOfContents** | `TableOfContents.tsx` | Tak | `TOCSection` | Spis tresci sidebar. Blog post. |
| **SliderArrow** | `SliderArrow.tsx` | Nie | `SliderArrowProps` | Strzalki nawigacji karuzeli. |

### Karty

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **ServiceCard** | `ServiceCard.tsx` | Nie | `ServiceCardProps` | Karta uslugi z ikona. Homepage ServicesSection. |
| **ServiceCardSimple** | `ServiceCardSimple.tsx` | Nie | `ServiceCardSimpleProps` | Karta uslugi z obrazem + features. Oferta. |
| **ProjectCard** | `ProjectCard.tsx` | Nie | `ProjectCardProps` | Karta projektu w karuzeli. Homepage. |
| **ProjectListingCard** | `ProjectListingCard.tsx` | Tak | `ProjectListingCardProps` | Karta projektu z badgeami kategorii/technologii. Projekty listing. |
| **BlogPostCard** | `BlogPostCard.tsx` | Nie | `BlogPostCardProps` | Karta wpisu blogowego. Homepage BlogSection. |
| **TeamMemberCard** | `TeamMemberCard.tsx` | Nie | `TeamMemberCardProps` | Karta czlonka zespolu. Homepage. |
| **TestimonialCard** | `TestimonialCard.tsx` | Nie | `TestimonialCardProps` | Karta opinii klienta. Homepage + Uslugi. |
| **StatCard** | `StatCard.tsx` | Nie | `StatCardProps` | Karta statystyki. |
| **CompanyStatBox** | `CompanyStatBox.tsx` | Nie | `CompanyStatBoxProps` | Box ze statystyka firmy. |
| **PhilosophyCard** | `PhilosophyCard.tsx` | Nie | `PhilosophyCardProps` | Karta filozofii. O nas. |
| **CompetenceCard** | `CompetenceCard.tsx` | Nie | `CompetenceCardProps` | Karta kompetencji. O nas. |
| **ResponsibilityCard** | `ResponsibilityCard.tsx` | Nie | `ResponsibilityCardProps` | Karta odpowiedzialnosci. O nas + Lokalne. |
| **ResponsibilityPillarsCard** | `ResponsibilityPillarsCard.tsx` | Nie | `ResponsibilityPillarsCardProps` | Wariant z filarami. |

### Timeline

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **TimelineNav** | `TimelineNav.tsx` | Tak | `TimelineNavProps` | Nawigacja timeline (zlota linia + ikony). Uslugi V2. |
| **TimelineStep** | `TimelineStep.tsx` | Tak | `TimelineStepProps` | Krok timeline z scroll spy. Uslugi V2. |
| **TimelineStepNoLine** | `TimelineStepNoLine.tsx` | Tak | `TimelineStepNoLineProps` | Krok bez linii laczacej. Uslugi V2. |

### Accordion i Lista

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **AccordionItem** | `AccordionItem.tsx` | Tak | `AccordionItemProps` | Rozwijany element. FAQ, ServicesAccordion. |
| **NumberedListItem** | `NumberedListItem.tsx` | Nie | `NumberedListItemProps` | Element listy z numerem. |

### Komponenty Projektow

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **ProjectIntroduction** | `ProjectIntroduction.tsx` | Nie | `ProjectIntroductionProps` | Intro projektu (powierzchnia, koszt). `/projekty/[slug]` |
| **ProjectTabs** | `ProjectTabs.tsx` | Tak | `ProjectTabsProps` | Zakladki specyfikacji. `/projekty/[slug]` |
| **ProjectCostTable** | `ProjectCostTable.tsx` | Nie | `ProjectCostTableProps` | Tabela kosztow. `/projekty/[slug]` |
| **ProjectOptimalPrice** | `ProjectOptimalPrice.tsx` | Nie | `ProjectOptimalPriceProps` | Sekcja optymalnej ceny. `/projekty/[slug]` |
| **ProjectGalleryHero** | `ProjectGalleryHero.tsx` | Tak | `ProjectGalleryHeroProps` | Galeria zdjec projektu. `/projekty/[slug]` |
| **ProjectFloorPlans** | `ProjectFloorPlans.tsx` | Tak | `ProjectFloorPlansProps` | Plany pieter z modalem. `/projekty/[slug]` |
| **ProjectModificationCTA** | `ProjectModificationCTA.tsx` | Nie | - | CTA modyfikacji projektu. `/projekty/[slug]` |
| **RelatedProjectsSection** | `RelatedProjectsSection.tsx` | Nie | `RelatedProjectsSectionProps` | Powiazane projekty. `/projekty/[slug]` |

### Filtry i Sidebar

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **ProjectFilterSidebar** | `ProjectFilterSidebar.tsx` | Tak | `ProjectFilterSidebarProps` | Sidebar filtrow (desktop). `/projekty` |
| **MobileFilterDrawer** | `MobileFilterDrawer.tsx` | Tak | `MobileFilterDrawerProps` | Drawer filtrow (mobile). `/projekty` |
| **LocalPageSidebar** | `LocalPageSidebar.tsx` | Tak | `LocalPageSidebarProps` | TOC + CTA Box. Lokalne strony. |

### Wrappery Animacji

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **AnimatedSection** | `AnimatedSection.tsx` | Tak | `AnimatedSectionProps` | Wrapper fadeInUp. Hub Obszar Dzialania. |
| **AnimatedServiceGrid** | `AnimatedServiceGrid.tsx` | Tak | `AnimatedServiceGridProps` | Cascading animations kart uslug. Oferta. |

### Mapa i Inne

| Komponent | Plik | Client | Props | Uzycie |
|-----------|------|--------|-------|--------|
| **PolandMapSVG** | `PolandMapSVG.tsx` | Tak | - | SVG injection + interaktywnosc. Hub Obszar Dzialania. |
| **CountingNumber** | `CountingNumber.tsx` | Tak | `CountingNumberProps` | Animowany licznik. |
| **InfoTooltip** | `InfoTooltip.tsx` | Tak | `InfoTooltipProps` | Tooltip informacyjny. |
| **PartnerLogo** | `PartnerLogo.tsx` | Nie | `PartnerLogoProps` | Logo partnera (wylaczone - brak obrazow). |
| **BentoGridItem** | `BentoGridItem.tsx` | Nie | - | Element gridu Bento. |
| **BentoNavigation** | `BentoNavigation.tsx` | Tak | - | Nawigacja Bento. |
| **BentoTitleHero** | `BentoTitleHero.tsx` | Nie | - | Tytul hero Bento. |

---

## 2.3 ORGANIZMY (`/components/sections/`) - 42 komponenty

### Layout Globalny (w kazdej stronie przez `/app/layout.tsx`)

| Komponent | Client | Props | Opis |
|-----------|--------|-------|------|
| **Header** | Tak | `HeaderProps` | Sticky header: top bar (tel/email/social) + logo + nav + MegaMenu + CTA button |
| **Footer** | Tak | `FooterProps` | Logo + opis + link groups + newsletter + social + copyright |

### Sekcje Homepage (`/`)

| Komponent | Client | Props | Rola na Stronie |
|-----------|--------|-------|-----------------|
| **HeroSection** | Tak | `HeroSectionProps` | Karuzela hero z 4 obrazami, Ken Burns effect, auto-advance 4s |
| **AboutCompanySection** | Tak | `AboutCompanySectionProps` | Przeglad firmy ze statystykami |
| **ServiceShowcaseSection** | Tak | `ServiceShowcaseSectionProps` | Grid uslug z showcase |
| **HowItWorksSection** | Tak | `HowItWorksSectionProps` | Timeline 3 krokow procesu |
| **ProjectsSection** | Tak | `ProjectsSectionProps` | Slider projektow (Swiper) |
| **TestimonialsSection** | Tak | `TestimonialsSectionProps` | Slider opinii (Swiper) |
| **BlogSection** | Tak | `BlogSectionProps` | 3 najnowsze wpisy blogowe |
| **ContactCTASection** | Tak | `ContactCTASectionProps` | CTA z formularzem/danymi kontaktowymi |

### Sekcje Stron Uslug V2 (`/oferta/[slug]`)

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **EmotionalHeroSection** | Tak | `EmotionalHeroSectionProps` | Hero emocjonalny: headline + benefits + CTA Box |
| **PhilosophyTimelineSection** | Tak | `PhilosophyTimelineSectionProps` | Timeline filozofii/podejscia (z TimelineNav + TimelineStep) |
| **CooperationTimelineSection** | Tak | `CooperationTimelineSectionProps` | Timeline wspolpracy z linia laczaca |
| **CooperationTimelineSectionNoLine** | Tak | `CooperationTimelineSectionNoLineProps` | Timeline bez linii |
| **ServicesAccordionSection** | Tak | `ServicesAccordionSectionProps` | Accordion FAQ/uslug (2 kolumny) |
| **FAQTwoColumnsSection** | Tak | `FAQTwoColumnsSectionProps` | FAQ w 2 kolumnach |

### Sekcje O Nas (`/o-nas`)

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **AboutIntroSection** | Tak | `AboutIntroSectionProps` | Intro z kartami filozofii |
| **CompetenciesSection** | Tak | `CompetenciesSectionProps` | Grid 4 kompetencji |
| **BusinessResponsibilitySection** | Tak | `BusinessResponsibilitySectionProps` | 4 karty odpowiedzialnosci. Tez w lokalnych. |

### Sekcje Kontakt (`/kontakt`)

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **BentoContactSection** | Tak | `BentoContactSectionProps` | Bento grid: intro + formularz + telefon + email + adres/mapa |
| **ContactHeroSection** | Tak | `ContactHeroSectionProps` | Hero kontaktu |

### Sekcje Blog

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **BentoBlogSection** | Tak | `BentoBlogSectionProps` | Listing blogowy z filtrami kategorii. `/blog` |
| **BlogPostContent** | Tak | `BlogPostContentProps` | Tresc wpisu: article + sidebar (TOC + CTA). `/blog/[slug]` |

### Sekcje Projektow

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **ProjectsListingSection** | Tak | `ProjectsListingSectionProps` | Listing z filtrami + sortowaniem. `/projekty` |

### Sekcje Stron Lokalnych (`/obszar-dzialania/[slug]`)

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **LocalPageContentSection** | Tak | `LocalPageContentSectionProps` | Glowna sekcja 2-kolumnowa (tresc + sticky sidebar) |
| **SimpleImageTextSection** | Tak | `SimpleImageTextSectionProps` | Sekcja tekst + obraz (dane konwertowane przez convertToLocalPageContent) |
| **IntroSection** | Tak | `IntroSectionProps` | Intro z animacjami |
| **AreasSection** | Tak | `AreasSectionProps` | Sekcja dzielnic/hubow |
| **DistrictsSection** | Tak | `DistrictsSectionProps` | Grid dzielnic |
| **InteractiveMapSection** | Tak | - | Interaktywna mapa SVG (tylko desktop). Hub `/obszar-dzialania` |

### Sekcje Bento (Eksperymentalne)

| Komponent | Client | Props | Rola |
|-----------|--------|-------|------|
| **BentoOfferSection** | Tak | - | Oferta w stylu bento |
| **BentoAreasSection** | Tak | - | Obszary w stylu bento |
| **BentoKnowledgeSection** | Tak | - | Wiedza w stylu bento |
| **BentoCTASection** | Tak | - | CTA w stylu bento (4 warianty) |
| **BentoHeroSection** | Tak | - | Hero w stylu bento |

### Inne Dostepne

| Komponent | Client | Props | Status |
|-----------|--------|-------|--------|
| **ServicesSection** | Tak | `ServicesSectionProps` | Slider uslug (homepage alternatywa) |
| **ServicesBentoSection** | Tak | `ServicesBentoSectionProps` | Bento variant |
| **TeamSection** | Tak | `TeamSectionProps` | Sekcja zespolu |
| **StatsSection** | Tak | `StatsSectionProps` | Statystyki (dostepna, nieuzywana) |
| **PartnersSection** | Tak | `PartnersSectionProps` | Partnerzy (wylaczona - brak obrazow) |
| **PricingSection** | Tak | `PricingSectionProps` | Cennik |

---

# 3. MAPA STRON I UZYCIE KOMPONENTOW

## 3.1 Root Layout (`/app/layout.tsx`)

**Scope:** Wraps KAZDA strone

| Element | Komponent | Zrodlo Danych |
|---------|-----------|---------------|
| Font | Manrope (Google Fonts, swap) | - |
| Metadata | `metadataBase: companyData.url` | `company-data.ts` |
| Header | `Header` | Hardcoded headerData (navLinks, megaMenuItems) |
| Footer | `Footer` | Hardcoded footerData (contactInfo, linkGroups, newsletter) |
| Preconnect | Google Fonts, Unsplash | - |

---

## 3.2 Homepage (`/` - `/app/page.tsx`)

**Typ:** SSR | **Metadata:** Domyslna z layout

| # | Komponent | Props/Dane | Zrodlo |
|---|-----------|-----------|--------|
| 1 | `HeroSection` | tagline, title, subtitle, 4 images | Hardcoded |
| 2 | `AboutCompanySection` | stats, features | Hardcoded |
| 3 | `ServiceShowcaseSection` | 6 uslug z kartami | Hardcoded |
| 4 | `HowItWorksSection` | 3 kroki | Hardcoded |
| 5 | `ProjectsSection` | projects slider | `allProjects` z `projects.ts` |
| 6 | `TestimonialsSection` | 6 testimonials | Hardcoded |
| 7 | `ContactCTASection` | phone, email | `companyData` z `company-data.ts` |
| 8 | `BlogSection` | 3 najnowsze posty | `blogPosts` z `blog-data.ts` |

---

## 3.3 O Nas (`/o-nas` - `/app/o-nas/page.tsx`)

**Typ:** SSR | **Metadata:** "O nas - CoreLTB Builders"

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `PageHeader` | title, breadcrumbs, backgroundImage, watermark |
| 2 | `AboutIntroSection` | philosophy cards, company history |
| 3 | `CompetenciesSection` | 4 competency cards |
| 4 | `BusinessResponsibilitySection` | 4 responsibility cards |

---

## 3.4 Oferta - Listing (`/oferta` - `/app/oferta/page.tsx`)

**Typ:** SSR | **Metadata:** "Nasza oferta - CoreLTB Builders"

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `PageHeader` | hero |
| 2 | `AnimatedSection` + `SectionHeader` | section intro |
| 3 | `AnimatedServiceGrid` | 6 `ServiceCardSimple` items |
| 4 | `PhilosophyTimelineSection` | "Dlaczego Jeden Partner?" 3 items |
| 5 | `ContactCTASection` | phone, email z `companyData` |

---

## 3.5 Oferta - Podstrona Uslugi (`/oferta/[slug]` - `/app/oferta/[slug]/page.tsx`)

**Typ:** SSG (`generateStaticParams`) | **Metadata:** `generateMetadata()` | **Zrodlo:** `servicesV2.ts`

**6 stron:** kompleksowa-budowa-domow, projektowanie, nadzor-i-doradztwo, uslugi-techniczne, wykonczenia-i-aranzacje, zagospodarowanie-terenu

| # | Komponent | Warunek | Props/Dane |
|---|-----------|---------|-----------|
| 1 | `PageHeader` | Zawsze | breadcrumbs, backgroundImage z serviceV2 |
| 2 | `EmotionalHeroSection` | Zawsze | label, headline, subtitle, benefits, CTA Box |
| 3 | `PhilosophyTimelineSection` | Zawsze | TimelineNav + TimelineSteps (3-8 krokow) |
| 4 | `CooperationTimelineSectionNoLine` | Jesli istnieje | Etapy wspolpracy |
| 5 | `AreasSection` | Jesli istnieje | Zasieg logistyczny (2 huby) |
| 6 | `FAQTwoColumnsSection` | Jesli istnieje | FAQ 2-kolumnowe |
| 7 | `TestimonialsSection` | Jesli istnieje | Opinie klientow |
| 8 | `ContactCTASection` | Zawsze | Dane z `companyData` |
| 9 | `FloatingCTA` | Zawsze | Sticky button "Umow Konsultacje" |
| - | `<Script>` Schema.org | Zawsze | Service + FAQ + LocalBusiness + Breadcrumb |

---

## 3.6 Projekty - Listing (`/projekty` - `/app/projekty/page.tsx`)

**Typ:** SSR | **Metadata:** Statyczna

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `ProjectsListingSection` | Cala sekcja (breadcrumbs, title, filters, grid) |

**Wewnatrz ProjectsListingSection:**
- `ProjectFilterSidebar` (desktop, sticky 280px)
- `MobileFilterDrawer` (mobile, bottom sheet)
- `ProjectListingCard[]` (grid 1/2/3 kolumny)

**Zrodlo:** `allProjects` z `projects.ts`

---

## 3.7 Projekty - Podstrona (`/projekty/[slug]` - `/app/projekty/[slug]/page.tsx`)

**Typ:** SSG (`generateStaticParams`) | **Metadata:** `generateMetadata()`

**5 projektow:** z357, z357-d-ecodom, zb5-duo, zx201, zx251

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `ProjectGalleryHero` | Galeria zdjec z lightbox |
| 2 | `ProjectIntroduction` | Powierzchnia, koszt, technologia, opis |
| 3 | `ProjectTabs` | Zakladki specyfikacji |
| 4 | `ProjectFloorPlans` | Plany pieter z modalem |
| 5 | `ProjectOptimalPrice` | Rozbicie kosztow |
| 6 | `ProjectModificationCTA` | CTA modyfikacji projektu |
| 7 | `RelatedProjectsSection` | Powiazane projekty (Swiper) |

**Zrodlo:** `projects.ts` (getProjectBySlug)

---

## 3.8 Blog - Listing (`/blog` - `/app/blog/page.tsx`)

**Typ:** SSR | **Metadata:** Statyczna

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `BentoBlogSection` | Breadcrumbs, title, categories, posts |

**Wewnatrz BentoBlogSection:**
- Category filters (5 kolumn)
- MainPostCard (2/3 width, najnowszy)
- SmallPostCard sidebar "Polecane" (1/3 width)
- GridPostCard (dolne 3)

**Zrodlo:** `blogSectionData` z `blog-data.ts`

---

## 3.9 Blog - Wpis (`/blog/[slug]` - `/app/blog/[slug]/page.tsx`)

**Typ:** SSG (`generateStaticParams`) | **Metadata:** `generateMetadata()` z OpenGraph + Twitter Card

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `BlogPostContent` | Caly wpis blogowy |

**Wewnatrz BlogPostContent:**
- Breadcrumbs
- Featured Image (aspect 2:1)
- Post Meta (data, czas, kategoria)
- H1 Title
- ContentBlocks (paragraph, heading, list, image, quote, callout)
- Tags + Share Buttons
- Author Box
- Sidebar: TableOfContents (sticky) + CTA Box
- Related Posts (3 karty)

**Zrodlo:** `blog-data.ts` (getBlogPostDataBySlug, blogPostContents)

---

## 3.10 Kontakt (`/kontakt` - `/app/kontakt/page.tsx`)

**Typ:** SSR | **Metadata:** "Kontakt - CoreLTB Builders"

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `PageHeader` | Hero + breadcrumbs |
| 2 | `BentoContactSection` | Bento grid: intro + form + phone + email + address |

---

## 3.11 Obszar Dzialania - Hub (`/obszar-dzialania` - `/app/obszar-dzialania/page.tsx`)

**Typ:** SSR | **Metadata:** Statyczna z OpenGraph | **Schema.org:** LocalBusiness + BreadcrumbList

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `InteractiveMapSection` | Mapa SVG 3 wojewodztw (desktop only, hidden lg:) |
| 2 | `AnimatedSection` | Grid linkow do miast (mobile + desktop) |
| 3 | `AnimatedSection` | 3-kolumnowy grid wojewodztw z miastami |
| 4 | `AnimatedSection` | 4 benefity logistyki (grid 2x2) |
| 5 | `ContactCTASection` | Dane z `companyData` |

**Zrodlo:** `map-data.ts` (getCitiesWithPages, getMapStats, mapVoivodeships)

---

## 3.12 Obszar Dzialania - Miasto (`/obszar-dzialania/[slug]`)

**Typ:** SSG (`generateStaticParams`) | **Metadata:** `generateMetadata()` | **Schema.org:** Service + FAQ + LocalBusiness + Breadcrumb

**7 miast:** rybnik, wodzislaw-slaski, tychy, katowice, jaworzno, mikolow, gliwice

| # | Komponent | Props/Dane |
|---|-----------|-----------|
| 1 | `PageHeader` | Hero z obrazem tla + breadcrumbs |
| 2 | `LocalPageContentSection` | 2-kolumnowy layout blog-style |
| 3 | `ContactCTASection` | Dane z `companyData` |

**Wewnatrz LocalPageContentSection:**
- **Lewa kolumna (artykul):** Wprowadzenie, Oferta (karty), Specyfika Lokalna, Energooszczednosc (opcja), Formalnosci (opcja), Dzielnice (grid), Dlaczego My (karty), FAQ (accordion)
- **Prawa kolumna (sidebar 320px, sticky):** LocalPageSidebar (TOC + CTA Box spersonalizowany)

**Konwersja danych:** `convertToLocalPageContent()` konwertuje stary format z `local-pages.ts` -> nowy `LocalPageContent`

**Zrodlo:** `local-pages.ts` (getLocalPageBySlug) + `lib/schema/generators.ts`

---

## 3.13 Kontakt-New (`/kontakt-new` - Eksperymentalna)

**Status:** Strona testowa/playground z wariantami CTA

| # | Komponent |
|---|-----------|
| 1 | `PageHeader` |
| 2 | `BentoContactSection` |
| 3 | `BentoAreasSection` |
| 4 | `BentoOfferSection` |
| 5 | `BentoCTASection` (4 warianty: v1-v4) |
| 6 | `FontWrapper` (typografia) |

---

# 4. PLIKI DANYCH (`/data/`)

## 4.1 `company-data.ts` - Single Source of Truth

**Eksportowane:**

| Export | Typ | Opis |
|--------|-----|------|
| `companyData` | `CompanyData` | Dane firmy (nazwa, adres, telefon, email, godziny, social) |
| `getLocalBusinessSchema()` | Funkcja | Schema.org LocalBusiness |
| `getProviderSchema()` | Funkcja | Schema.org Service provider |
| `getAreaServedSchema()` | Funkcja | Schema.org areaServed (29 miast) |
| `isCityServed(cityName)` | Funkcja | Sprawdzenie czy miasto obslugiwane |

**Uzywany w:** layout.tsx, ContactCTASection, LocalPageSidebar, Schema generators, strony lokalne

---

## 4.2 `local-pages.ts` - Dane 7 Miast

**Interfejsy:** `LocalPageData`, `EmotionalHeroData`, `ImageTextSection`, `DistrictArea`, `WhyUsPoint`, `CTAButton`

**Eksportowane dane:**

| Export | Typ | Opis |
|--------|-----|------|
| `rybnikPage` | `LocalPageData` | Dane Rybnika |
| `wodzislawPage` | `LocalPageData` | Dane Wodzislawia Sl. |
| `tychyPage` | `LocalPageData` | Dane Tych |
| `katowicePage` | `LocalPageData` | Dane Katowic |
| `jaworznoPage` | `LocalPageData` | Dane Jaworzna |
| `mikolowPage` | `LocalPageData` | Dane Mikolowa |
| `gliwicePage` | `LocalPageData` | Dane Gliwic |
| `allLocalPages` | `readonly LocalPageData[]` | Tablica wszystkich 7 miast |
| `getLocalPageBySlug(slug)` | Funkcja | Znajdz miasto po slug |
| `getAllLocalPageSlugs()` | Funkcja | Wszystkie slugi (SSG) |

**Odmiany nazw (miejscownik):** Kazde miasto ma `cityNameLocative` (np. "Rybniku", "Katowicach")

---

## 4.3 `projects.ts` - Dane Projektow

**Typy:** `ProjectCategory`, `ProjectTechnology`, `SortOption`, `ProjectFilters`, `BudgetRange`, `SurfaceRange`, `Project`

**Eksportowane:**

| Export | Typ | Opis |
|--------|-----|------|
| `allProjects` | `Project[]` | 5 projektow |
| `projectCategories` | Stala | 4 kategorie (jednorodzinny, dwulokalowy, z-poddaszem, parterowy) |
| `projectTechnologies` | Stala | 2 technologie (MUROWANY, DREWNIANY) |
| `budgetRanges` | `BudgetRange[]` | 3 zakresy budzetowe |
| `surfaceRanges` | `SurfaceRange[]` | 6 zakresow powierzchni |
| `sortOptions` | Stala | 4 opcje sortowania (cena/powierzchnia asc/desc) |
| `parseEstimatedCost(s)` | Funkcja | "984 tys. zl" -> 984000 |
| `parseSurfaceArea(s)` | Funkcja | "248 + 38m2" -> 286 |
| `filterProjects(...)` | Funkcja | Filtrowanie po technologii/kategorii/budzecie/powierzchni |
| `sortProjects(...)` | Funkcja | Sortowanie po cenie/powierzchni |
| `countProjectsByFilter(...)` | Funkcja | Licznik per filtr |
| `getAllProjectSlugs()` | Funkcja | Slugi (SSG) |
| `getProjectBySlug(slug)` | Funkcja | Znajdz projekt |

**5 projektow:** z357, z357-d-ecodom, zb5-duo, zx201, zx251

---

## 4.4 `blog-data.ts` - Dane Bloga

**Typy:** `BlogPost`, `BlogCategory`, `BlogAuthor`, `ContentBlock`, `BlogPostData`

**Eksportowane:**

| Export | Typ | Opis |
|--------|-----|------|
| `blogCategories` | `BlogCategory[]` | 4 kategorie: realizacje, technologia, prawo, porady |
| `blogPosts` | `BlogPost[]` | Wpisy blogowe (metadata + excerpt) |
| `blogPostContents` | `Record<string, ContentBlock[]>` | Pelna tresc wpisow |
| `blogSectionData` | `BentoBlogSectionProps` | Gotowe dane dla sekcji bloga |
| `getBlogPostBySlug(slug)` | Funkcja | Post po slug |
| `getAllBlogSlugs()` | Funkcja | Slugi (SSG) |
| `getRelatedPosts(slug, limit)` | Funkcja | Powiazane posty |
| `getBlogPostDataBySlug(slug)` | Funkcja | Pelne dane z trescia |
| `toRelatedPost(post)` | Funkcja | Konwersja na RelatedPost |

---

## 4.5 `servicesV2.ts` - Dane Uslug V2

**Struktura:** Kazda usluga zawiera emotionalHero, philosophyTimeline, cooperationTimeline, faq, areas, testimonials

**6 uslug V2** (odpowiadaja `/oferta/[slug]`):
1. kompleksowa-budowa-domow
2. projektowanie
3. nadzor-i-doradztwo
4. uslugi-techniczne
5. wykonczenia-i-aranzacje
6. zagospodarowanie-terenu

---

## 4.6 `services.ts` - Dane Uslug V1 (Legacy)

**Stary format** z polami: slug, category, title, features, flexibilityOptions, processSteps, serviceArea, proofItems, contentSections, realizations

**Eksportowane:** `allServices: Service[]`

---

## 4.7 `map-data.ts` - Dane Mapy Interaktywnej

**Typy:** `VoivodeshipId`, `MapCity`, `MapVoivodeship`

**Eksportowane:**

| Export | Typ | Opis |
|--------|-----|------|
| `mapVoivodeships` | `MapVoivodeship[]` | 3 wojewodztwa (slaskie, malopolskie, opolskie) |
| `getAllCities()` | Funkcja | Wszystkie miasta (flat) |
| `getCitiesWithPages()` | Funkcja | Miasta z dedykowanymi stronami |
| `getCitiesWithoutPages()` | Funkcja | Miasta "coming soon" |
| `getCityById(id)` | Funkcja | Miasto po ID |
| `getCityByNameInSvg(name)` | Funkcja | Miasto po nazwie SVG |
| `getVoivodeshipById(id)` | Funkcja | Wojewodztwo |
| `getCitiesByVoivodeship(id)` | Funkcja | Miasta w wojewodztwie |
| `cityHasPage(id)` | Funkcja | Czy miasto ma strone |
| `getCityPageUrl(id)` | Funkcja | URL strony miasta |
| `getMapStats()` | Funkcja | Statystyki (total, withPages, comingSoon) |

**3 wojewodztwa:**
- **slaskie** - 9 miast (Rybnik, Wodzislaw, Katowice, Tychy, Jaworzno, Zory, Gliwice, Zabrze, Mikolow)
- **malopolskie** - 4 miasta (Krakow, Chrzanow, Oswiecim, Olkusz)
- **opolskie** - 2 miasta (Opole, Kedzierzyn-Kozle)

---

## 4.8 `shared-types.ts` - Wspoldzielone Typy

| Typ | Opis | Uzywany w |
|-----|------|-----------|
| `ContentBlock` | `{ type: 'paragraph'; value: string } \| { type: 'list'; items: string[] }` | servicesV2.ts, local-pages.ts, AccordionItem, SimpleImageTextSection, TimelineStep |
| `ContentItem` | `{ icon: IconName; title: string; content: ContentBlock[] }` | SimpleImageTextSection, ServicesAccordionSection |
| `FAQ` | `{ question: string; answer: string }` | servicesV2.ts, local-pages.ts |

---

## 4.9 `definitions.ts` - Definicje

Dodatkowe definicje typow i stalych wspoldzielonych miedzy plikami danych.

---

## 4.10 `local-pages-backup.ts` - Backup

Kopia zapasowa danych stron lokalnych (nie uzywana w produkcji).

---

# 5. BIBLIOTEKI POMOCNICZE (`/lib/`)

## 5.1 Schema.org (`/lib/schema/`)

| Plik | Eksporty | Opis |
|------|----------|------|
| `types.ts` | `ServiceSchema`, `FAQPageSchema`, `BreadcrumbListSchema`, `LocalBusinessSchema`, `SchemaOrg`, `SchemaGraph` | TypeScript types Schema.org |
| `generators.ts` | `generateLocalPageSchema()`, `generateServiceSchema()`, `generateFAQPageSchema()`, `generateBreadcrumbSchema()`, `sanitizeJsonLd()`, `stripMarkdown()` | Generatory JSON-LD |
| `index.ts` | Re-export powyzszych | Centralne eksporty |

**Uzywane w:** `/app/obszar-dzialania/[slug]/page.tsx`, `/app/obszar-dzialania/page.tsx`, `/app/oferta/[slug]/page.tsx`

**Wazne:** NIE MA pricing w Schema.org - kazdy projekt budowlany jest wyceniany indywidualnie.

---

# 6. ZASOBY PUBLICZNE (`/public/`)

## 6.1 Struktura Obrazow

```
/public/
├── logo.webp                              <- Logo firmy
├── mapa_3_wojewodztwa.svg                 <- Mapa SVG (3 wojewodztwa)
├── images/
│   ├── hero/                              <- Obrazy hero homepage
│   ├── testimonials/                      <- Zdjecia klientow
│   ├── blog/
│   │   └── plyta-fundamentowa/            <- Obrazy wpisow blogowych
│   ├── local/                             <- Obrazy stron lokalnych
│   │   ├── rybnik/hero.webp
│   │   ├── wodzislaw-slaski/hero.webp
│   │   ├── tychy/hero.webp
│   │   ├── katowice/hero.webp
│   │   ├── jaworzno/hero.webp
│   │   ├── mikolow/hero.webp
│   │   └── gliwice/hero.webp
│   ├── projekty/                          <- Obrazy projektow
│   │   ├── z357/
│   │   ├── z357-d-ecodom/
│   │   ├── zb5-duo/
│   │   ├── zx201/
│   │   └── zx251/
│   └── uslugi/                            <- Obrazy uslug
│       ├── kompleksowa-budowa-domow/
│       │   └── timeline/
│       ├── projektowanie/
│       │   └── etapy/
│       ├── nadzor-i-doradztwo/
│       │   └── etapy/
│       ├── uslugi-techniczne/
│       │   └── etapy/
│       ├── wykonczenia-i-aranzacje/
│       │   └── etapy/
│       ├── zagospodarowanie-terenu/
│       │   └── etapy/
│       └── o-nas/
```

---

# 7. SYSTEM ANIMACJI

## 7.1 CSS Keyframes (`globals.css`)

| Keyframe | Czas | Uzycie |
|----------|------|--------|
| `fadeInUp` | 0.72s ease-out | Scroll-triggered entry (glowna animacja) |
| `fadeInRight` | 0.8s ease-out | CTA Box, elementy boczne |
| `heroImageZoom` | 1.2s ease-out | Hero background zoom-out on load |
| `watermarkFadeIn` | 0.8s ease-out | Watermark text |
| `curtainSlideGold` | 0.68s ease-in-out | Gold curtain reveal |
| `curtainSlideGray` | 0.68s ease-in-out | Gray curtain reveal |

## 7.2 Klasy Animacji

| Klasa | Efekt |
|-------|-------|
| `.animate-fade-in-up` | fadeInUp + opacity: 0 -> 1 |
| `.animate-fade-in-right` | fadeInRight + opacity: 0 -> 1 |
| `.animate-hero-zoom` | heroImageZoom |
| `.animate-watermark-fade` | watermarkFadeIn |

## 7.3 Wzorzec Implementacji

```tsx
const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true });
<div className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
     style={{ animationDelay: '0.2s' }}>
```

## 7.4 Cascading Pattern

```tsx
{items.map((item, index) => (
  <div
    key={index}
    className={clsx(inView ? 'animate-fade-in-up' : 'opacity-0')}
    style={{ animationDelay: `${0.2 + index * 0.1}s` }}
  >
    {item}
  </div>
))}
```

---

# 8. TAILWIND - KONFIGURACJA MOTYWU

## 8.1 Kolory

| Token | Wartosc | Uzycie |
|-------|---------|--------|
| `primary` | `#dfbb68` | Glowny zloty akcent |
| `primary-dark` | `#d4a847` | Ciemniejszy zloty (gradienty) |
| `primary-light` | `#e8cc8a` | Jasniejszy zloty |
| `background-dark` | `#1a1a1a` | Ciemne tlo |
| `background-light` | `#fafaf9` | Jasne tlo |
| `background-pattern` | `#f0f0ee` | Tlo z wzorem |
| `background-cream` | `#f5f5f3` | Kremowe tlo |
| `surface-dark` | `#4a4a4a` | Ciemna powierzchnia |
| `surface-light` | `#ffffff` | Biala powierzchnia |
| `text-primary` | `#1a1a1a` | Tekst glowny |
| `text-secondary` | `#9ca3af` | Tekst drugorzedny |
| `text-muted` | `#a3a3a3` | Tekst wyciszony |
| `border-light` | `#e5e5e5` | Jasne obramowanie |
| `border-dark` | `#27272a` | Ciemne obramowanie |
| `background-beige` | `#efebe7` | Bezowe tlo sekcji (scentralizowane) |

## 8.2 Typografia (Dwellis Design System)

Skala typograficzna oparta na szablonie Dwellis (Webflow). Wszystkie nagłówki używają font-family `Funnel Sans`.

### Nagłówki

| Token | Rozmiar | Line-height | Weight | Opis |
|-------|---------|-------------|--------|------|
| `hero` | 3.5rem (56px) | 1.1 | 600 | H1 — główny nagłówek |
| `display` | 2.5rem (40px) | 1.15 | 600 | H2 alias display |
| `h2` | 2.5rem (40px) | 1.15 | 600 | Nagłówek sekcji |
| `h3` | 2rem (32px) | 1.2 | 600 | Podsekcja |
| `h4` | 1.75rem (28px) | 1.2 | 600 | Karta/blok |
| `h5` | 1.25rem (20px) | 1.3 | 600 | Mały nagłówek |
| `h6` | 1.125rem (18px) | 1.3 | 500 | Najmniejszy nagłówek |

### Body / Tekst

| Token | Rozmiar | Line-height | Weight | Opis |
|-------|---------|-------------|--------|------|
| `body-lg` | 1.25rem (20px) | 1.5 | 400 | Tekst duży |
| `body-md` | 1rem (16px) | 1.5 | 400 | Tekst standardowy |
| `body-sm` | 0.95rem (~15px) | 1.5 | 400 | Tekst mały |
| `body-xs` | 0.755rem (~12px) | 1.4 | 400 | Tekst mikro |
| `label` | 0.875rem (14px) | 1.4 | 500 (tracking: 0.05em) | Etykiety |

### Wagi fontów (text-weight)

| Klasa | Weight | Użycie |
|-------|--------|--------|
| `font-light` | 300 | Delikatny tekst |
| `font-normal` | 400 | Body text |
| `font-medium` | 500 | H6, label |
| `font-semibold` | 600 | H1–H5 (domyślnie) |
| `font-bold` | 700 | Wyróżnienia |
| `font-extrabold` | 800 | Specjalne akcenty |

## 8.3 Fonty

| Kontekst | Font | Źródło | Fallback |
|----------|------|--------|----------|
| **Nagłówki (h1–h6)** | Funnel Sans | Google Fonts (next/font) | sans-serif |
| **Body / tekst** | Manrope | Google Fonts (next/font) | system-ui, sans-serif |

Funnel Sans jest ładowany jako CSS variable `--font-heading` w `layout.tsx` i mapowany na token Tailwind `font-heading`.
Manrope jest głównym fontem body ustawionym przez `className` na `<body>`.

### Globalne style CSS (globals.css)

```css
h1, h2, h3, h4, h5 { font-family: font-heading; font-weight: 600 (semibold) }
h6 { font-family: font-heading; font-weight: 500 (medium) }
```

Źródło systemu typograficznego: szablon **Dwellis** (Webflow Ecommerce Template).

---

# 9. ROUTING - PODSUMOWANIE

| Route | Plik | SSG/SSR | Metadata | Schema.org |
|-------|------|---------|----------|------------|
| `/` | `app/page.tsx` | SSR | Domyslna | Nie |
| `/o-nas` | `app/o-nas/page.tsx` | SSR | Statyczna | Nie |
| `/oferta` | `app/oferta/page.tsx` | SSR | Statyczna | Nie |
| `/oferta/[slug]` | `app/oferta/[slug]/page.tsx` | **SSG** (6) | Dynamiczna | Tak |
| `/projekty` | `app/projekty/page.tsx` | SSR | Statyczna | Nie |
| `/projekty/[slug]` | `app/projekty/[slug]/page.tsx` | **SSG** (5) | Dynamiczna | Nie |
| `/blog` | `app/blog/page.tsx` | SSR | Statyczna | Nie |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | **SSG** (N) | Dynamiczna | Nie |
| `/kontakt` | `app/kontakt/page.tsx` | SSR | Statyczna | Nie |
| `/kontakt-new` | `app/kontakt-new/page.tsx` | SSR | Statyczna | Nie |
| `/obszar-dzialania` | `app/obszar-dzialania/page.tsx` | SSR | Statyczna | Tak |
| `/obszar-dzialania/[slug]` | `app/obszar-dzialania/[slug]/page.tsx` | **SSG** (7) | Dynamiczna | Tak |

**Lacznie SSG:** ~18+ stron statycznie generowanych (6 uslug + 5 projektow + N blogow + 7 miast)

---

# 10. GRAF ZALEZNOSCI DANYCH

```
company-data.ts (SSOT)
    |
    +-- local-pages.ts (uzywa companyData dla Schema.org)
    +-- lib/schema/generators.ts (uzywa companyData dla LocalBusiness)
    +-- Header, Footer (wyswietlanie danych firmy)
    +-- ContactCTASection (telefon, email)
    +-- LocalPageSidebar (telefon do CTA)

shared-types.ts (ContentBlock, ContentItem, FAQ)
    |
    +-- local-pages.ts (ContentItem, ContentBlock, FAQ)
    +-- servicesV2.ts (ContentBlock, FAQ)
    +-- AccordionItem, SimpleImageTextSection, TimelineStep (rendering)

local-pages.ts (7 miast)
    |
    +-- app/obszar-dzialania/[slug]/page.tsx (SSG)
    +-- map-data.ts (referencja przez existingPageSlugs)
    +-- lib/schema/generators.ts (generateLocalPageSchema)

map-data.ts (3 wojewodztwa, 15 miast)
    |
    +-- app/obszar-dzialania/page.tsx (interaktywna mapa)
    +-- PolandMapSVG (renderowanie mapy)

projects.ts (5 projektow)
    |
    +-- app/projekty/page.tsx (listing z filtrami)
    +-- app/projekty/[slug]/page.tsx (SSG)
    +-- app/page.tsx (ProjectsSection slider)

servicesV2.ts (6 uslug)
    |
    +-- app/oferta/[slug]/page.tsx (emocjonalne strony uslug)

blog-data.ts (wpisy blogowe)
    |
    +-- app/blog/page.tsx (listing)
    +-- app/blog/[slug]/page.tsx (SSG)
    +-- app/page.tsx (BlogSection - 3 najnowsze)
```

---

# 11. STATYSTYKI PROJEKTU

| Element | Ilosc |
|---------|-------|
| Atomy (ui/) | 7 |
| Molekuly (shared/) | 43 |
| Organizmy (sections/) | 42 |
| **Lacznie komponentow** | **92** |
| Pliki danych (data/) | 10 |
| Strony lokalne (miasta) | 7 |
| Projekty | 5 |
| Uslugi V2 | 6 |
| Kategorie bloga | 4 |
| Wojewodztwa na mapie | 3 |
| Miasta na mapie | 15 |
| Generatory Schema.org | 5 |
| Strony SSG | ~18+ |

---

# 12. DEPLOYMENT - CLOUDFLARE PAGES

**Build Settings:**
- Build command: `npm run pages:build` (`npx @cloudflare/next-on-pages`)
- Deploy: `npm run deploy` (build + `wrangler pages deploy`)

**Wymagane:**
- `.npmrc`: `legacy-peer-deps=true` (rozwiazuje konflikty zaleznosci)
- Cloudflare compatibility flags: `nodejs_compat`

---

*Wygenerowano: 2026-02-16*
