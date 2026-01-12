# STRATEGIA SEO - CoreLTB Builders

**Data utworzenia:** 2025-12-09
**Ostatnia aktualizacja:** 2025-12-10
**Status:** Przewodnik kompletny
**Przeznaczenie:** Praktyczny poradnik dla zespołu i przyszłego agenta SEO

---

## SPIS TREŚCI

1. [Architektura URL i Topic Clusters](#1-architektura-url-i-topic-clusters)
2. [Semantic SEO - Rewolucja Znaczeń](#2-semantic-seo-rewolucja-znaczeń)
3. [Generative Engine Optimization (GEO)](#3-generative-engine-optimization-geo)
4. [Intent Alignment - Dopasowanie do Intencji](#4-intent-alignment-dopasowanie-do-intencji)
5. [Content Strategy dla CoreLTB](#5-content-strategy-dla-coreltb)
6. [Implementacja Techniczna](#6-implementacja-techniczna)
7. [Metryki i Monitoring](#7-metryki-i-monitoring)
8. [Workflow dla Agenta SEO](#8-workflow-dla-agenta-seo)

---

## 1. ARCHITEKTURA URL I TOPIC CLUSTERS

### 1.1 Kluczowe Wnioski z Researchu

**Źródła:**
- [SEMrush: Topic Clusters](https://www.semrush.com/blog/topic-clusters/)
- [SEMrush: Website Architecture](https://www.semrush.com/blog/website-structure/)
- [HubSpot: Topic Clusters SEO](https://blog.hubspot.com/marketing/topic-clusters-seo)
- [Geneo: Best Practices 2025](https://geneo.app/blog/best-practices-topic-clusters-pillar-pages-google-authority-seo-2025/)

---

### 1.2 MIT: "Autorytet Folderów"

**❌ NIEPRAWDA:**
> "Google ocenia autorytet folderów - struktura `/filar/artykul` ma większą moc SEO niż `/blog/artykul`"

**✅ PRAWDA (SEMrush):**
> "Cluster pages can be hierarchically organized (`/pillar/cluster`) or on the same level. **It doesn't impact the performance.**"

**Kluczowy insight:**
- Google nie ocenia "mocy folderów" od ~2018 (Hummingbird update)
- Liczy się **topical authority** = internal linking + content depth
- URL depth ≠ SEO power

---

### 1.3 Decyzja dla CoreLTB Builders

#### LANDING PAGES USŁUG → Hierarchia

```
/oferta/nadzor-i-doradztwo                    # Pillar (główna usługa)
/oferta/nadzor-i-doradztwo/inspektor-nadzoru  # Sub-usługa (landing page)
/oferta/nadzor-i-doradztwo/odbiory-techniczne # Sub-usługa (landing page)
```

**Dlaczego hierarchia?**
- ✅ To portfolio USŁUG, nie artykuły
- ✅ Hierarchia = lepsza dla UX i conversion
- ✅ Breadcrumbs naturalne
- ✅ Logiczne dla użytkownika

#### ARTYKUŁY BLOGOWE → Flat Structure

```
/blog/jak-wybrac-inspektora-nadzoru           # Artykuł edukacyjny
/blog/ile-kosztuje-nadzor-budowlany           # Artykuł edukacyjny
```

**Dlaczego flat?**
- ✅ Krótsze URLe (lepsze CTR w SERPach)
- ✅ Elastyczność (1 artykuł może linkować do wielu usług)
- ✅ Łatwiejsze zarządzanie w CMS

---

### 1.4 Internal Linking - KLUCZOWE

**Wzorzec (SEMrush/HubSpot):**
- ✅ Pillar → linkuje do WSZYSTKICH clusters
- ✅ Cluster → linkuje do pilara
- ✅ Cluster ↔ Cluster → lateral linking
- ✅ 3-5 linków kontekstowych per artykuł

**Anchory:**
- ✅ Opisowe, naturalne ("sprawdź naszą ofertę nadzoru")
- ❌ Generyczne ("kliknij tutaj", "więcej")

---

### 1.5 Best Practices URL (SEMrush)

1. **Short & Clear:** Max 60 znaków
2. **Keyword in Slug:** `/oferta/nadzor-i-doradztwo` (nie `/oferta/usluga-1`)
3. **Top-Level Pillars:** Pillary bezpośrednio pod domeną
4. **Lowercase + Hyphens:** Tylko małe litery i myślniki

---

## 2. SEMANTIC SEO - REWOLUCJA ZNACZEŃ

### 2.1 Co to jest Semantic SEO? (Dla Ludzi)

**Analogia dla CoreLTB:**

**❌ Keyword SEO (stare podejście):**
```
Treść: "nadzór budowlany nadzór budowlany nadzór budowlany"
Google: "OK, to jest o nadzorze budowlanym" (keyword stuffing)
```

**✅ Semantic SEO (nowe podejście):**
```
Treść: "Inspektor budowlany kontroluje jakość robót,
        sprawdza dokumentację techniczną,
        przeprowadza odbiory techniczne..."
Google: "Rozumiem - to kompleksowa usługa nadzoru
         inwestorskiego obejmująca kontrolę jakości
         i proces odbioru"
```

**RÓŻNICA KLUCZOWA:**
- **Keyword SEO:** Liczy słowa
- **Semantic SEO:** Rozumie ZNACZENIE i KONTEKST

---

### 2.2 Jak Google Rozumie Znaczenie? (Technologia)

#### **BERT (2019) - Bidirectional Encoder Representations**

**Co to robi?**
Analizuje słowa w kontekście CAŁEGO zdania (nie tylko po kolei).

**Przykład dla CoreLTB:**

```
Zapytanie: "budowa domu pod klucz małopolska"

BERT rozumie:
1. "budowa domu" = główna usługa (nie sam dom, nie budowa ogólnie)
2. "pod klucz" = kompleksowość (od projektu do odbioru)
3. "małopolska" = lokalizacja geograficzna (nie województwo jako temat)
```

**Źródło:** [Writesonic: Semantic SEO](https://writesonic.com/blog/semantic-seo)

---

#### **MUM (2021) - Multitask Unified Model**

**Co to robi?**
1000x mocniejszy od BERT. Rozumie **różne języki** i **formaty treści** (tekst + zdjęcia).

**Przykład dla CoreLTB:**

```
Użytkownik: "ile kosztuje wykończenie domu 150m2"

MUM rozumie:
- Użytkownik chce ESTYMACJĘ (nie dokładnej ceny)
- 150m2 to średni dom (potrzebuje przykładów podobnych)
- "wykończenie" ≠ "stan deweloperski" ≠ "pod klucz"
- Szuka też ZAKRESU (co wchodzi w wykończenie?)
```

**Źródło:** [Semantic SEO Guide 2025](https://niumatrix.com/semantic-seo-guide/)

---

#### **Gemini (2023-2025) - Large Language Model**

**Co to robi?**
Generuje odpowiedzi w **AI Overviews** (te szare boksy na górze Google).

**Przykład dla CoreLTB:**

```
Zapytanie: "jak przygotować działkę pod budowę"

Gemini generuje AI Overview:
┌─────────────────────────────────────────┐
│ Przygotowanie działki wymaga:          │
│ 1. Geodety (wytyczenie granic)         │
│ 2. Badań geotechnicznych (grunt)       │
│ 3. Uzgodnień przyłączy (woda, prąd)    │
│ 4. Pozwolenia na budowę                │
│                                         │
│ Źródła: coreltb.pl, ...                │
└─────────────────────────────────────────┘
```

**KLUCZOWE:** Gemini cytuje strony, które **najlepiej odpowiadają** na pytanie (nie tylko mają słowa kluczowe).

**Źródło:** [Google AI Overviews Surge 2025](https://relixir.ai/blog/google-ai-overviews-surge-2025-geo-matters-beyond-google-relixir)

---

### 2.3 Vector Embeddings - "DNA" Treści

#### **Co to jest embedding?**

**Definicja dla ludzi:**
Embedding = matematyczna reprezentacja znaczenia tekstu (tablica liczb).

**Analogia:**
```
Treść: "Inspektor nadzoru sprawdza jakość robót budowlanych"
Embedding: [0.23, -0.45, 0.78, 0.12, ..., -0.33] (768 liczb)

Treść: "Kontrola jakości wykonawstwa przez inspektora"
Embedding: [0.25, -0.43, 0.76, 0.14, ..., -0.31] (768 liczb)
               ↑       ↑      ↑      ↑          ↑
           Bardzo podobne! = To samo znaczenie!
```

**Dlaczego to ważne?**
- Google porównuje embeddingi Twojej strony z embeddingami zapytania
- Jeśli są **bliskie** w przestrzeni wektorowej = Twoja strona jest relevantna

**Źródło:** [Semantic Search Vector Models - Lumar](https://www.lumar.io/blog/best-practice/semantic-search-explained-vector-models-impact-on-seo/)

---

#### **Cosine Similarity - Miara Podobieństwa**

**Co to robi?**
Mierzy "odległość" między dwoma embeddingami (od 0 do 1).

**Progi dla CoreLTB:**

| Score | Interpretacja | Co to znaczy dla nas? |
|-------|---------------|----------------------|
| **≥ 0.75** | On Target | ✅ Treść IDEALNIE odpowiada na zapytanie |
| **0.60-0.75** | Minor Deviation | ⚠️ Treść OK, ale można poprawić focus |
| **0.45-0.60** | Moderate Deviation | ⚠️ Treść odchodzi od tematu |
| **< 0.45** | Strong Deviation | ❌ Treść off-topic |

**Przykład praktyczny:**

```typescript
// W przyszłości (gdy dodamy semantic analysis)

Query: "ile kosztuje nadzór budowlany"
Section 1: "Nadzór inwestorski kosztuje 3-5% wartości budowy..."
→ Cosine Similarity: 0.82 (✅ On Target)

Section 2: "Oferujemy również wykończenia wnętrz..."
→ Cosine Similarity: 0.35 (❌ Off-topic dla tego query)
```

**Źródło:** [Cosine Similarity for AI SEO - Tinuiti](https://tinuiti.com/blog/search/cosine-similarity/)

---

### 2.4 Semantic SEO w servicesV2.ts (Nasz Projekt)

#### **Obecna struktura danych**

```typescript
// /data/servicesV2.ts
export interface ServiceV2 {
  // Sekcja 1: Emotional Hero
  emotionalHero: {
    headline: string | string[];      // ← WAŻNE dla semantic matching
    subtitle: string;                  // ← Kontekst semantyczny
    benefits?: string[];               // ← Related concepts
  };

  // Sekcja 2: Philosophy Timeline
  philosophyTimeline: {
    items: NumberedListItemProps[];    // ← Entity relationships
  };

  // Sekcja 3: Cooperation Timeline
  cooperationTimeline?: {
    steps: CooperationTimelineStep[];  // ← Procedural knowledge
  };

  // Sekcja 4: Services Accordion (FAQ)
  servicesAccordion?: {
    services: ServiceAccordionItem[];  // ← Long-tail queries
  };
}
```

---

#### **Jak to wykorzystać semantycznie?**

##### **1. Emotional Hero = Query Target**

```typescript
// ✅ DOBRE (semantic-rich)
emotionalHero: {
  headline: "Kompleksowa Budowa Domów Pod Klucz",
  subtitle: "Od projektu przez budowę po odbiór - jedna umowa, jeden partner, pełna odpowiedzialność za Twój dom marzeń",
  benefits: [
    "500+ domów zbudowanych od A do Z",
    "Jedna umowa, jedna odpowiedzialność",
    "Gwarancja stałej ceny i terminu"
  ]
}

// ❌ ŹLE (keyword stuffing)
emotionalHero: {
  headline: "Budowa Domów Budowa Budowa",
  subtitle: "Budujemy domy budowa budowa"
}
```

**Dlaczego pierwsze jest lepsze?**
- **Semantic richness:** Wiele related concepts (projekt, budowa, odbiór, umowa, partner)
- **Entity relationships:** "jedna umowa" + "jeden partner" + "pełna odpowiedzialność" = Trust signals
- **Natural language:** Brzmi jak człowiek (nie jak robot)

---

##### **2. Content Blocks = Semantic Coverage**

```typescript
// /data/servicesV2.ts
export type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

// ✅ PRZYKŁAD SEMANTIC-RICH CONTENT
cooperationTimeline: {
  steps: [{
    title: "Analiza Działki i Warunków Zabudowy",
    content: [
      {
        type: 'paragraph',
        value: 'Na tym etapie przeprowadzamy szczegółową analizę Twojej działki. Nasz zespół sprawdza warunki zabudowy, lokalizację przyłączy, rodzaj gruntu oraz wszelkie ograniczenia prawne.'
      },
      {
        type: 'list',
        items: [
          'Weryfikacja planu zagospodarowania przestrzennego',
          'Kontrola warunków zabudowy i geotechnicznych',
          'Sprawdzenie dostępności mediów (woda, prąd, gaz, kanalizacja)',
          'Ocena nachylenia terenu i potencjalnych ryzyk budowlanych'
        ]
      }
    ]
  }]
}
```

**Dlaczego to działa semantycznie?**

1. **Topic coherence:** Wszystkie elementy dotyczą analizy działki
2. **Entity density:** Plan zagospodarowania, warunki zabudowy, media, teren = related entities
3. **Procedural knowledge:** Jasna sekwencja kroków (co, dlaczego, jak)
4. **Natural flow:** Paragraph → List = łatwe dla AI do parsowania

---

### 2.5 Semantic Deviation - Wykrywanie Odejść od Tematu

#### **Co to jest Semantic Deviation?**

**Definicja:**
Odchylenie znaczenia treści od intencji zapytania użytkownika.

**Typy deviacji (z researchu):**

| Typ | Opis | Przykład dla CoreLTB |
|-----|------|---------------------|
| **On Target** | Treść idealnie odpowiada | Query: "nadzór budowlany"<br>Content: "Inspektor kontroluje jakość robót" ✅ |
| **Aligned to Other Query** | Treść pasuje do INNEGO query | Query: "nadzór budowlany"<br>Content: "Oferujemy wykończenia wnętrz" ⚠️ |
| **Topical Partial Match** | Treść częściowo na temat | Query: "ile kosztuje budowa"<br>Content: "Budowa zależy od wielu czynników..." (bez cen) ⚠️ |
| **Missing Core Intent** | Brakuje głównej odpowiedzi | Query: "jak wybrać inspektora"<br>Content: Tylko historia firmy (bez kryteriów) ❌ |
| **Off Topic** | Kompletnie nie na temat | Query: "budowa domu"<br>Content: "Historia architektury w Polsce" ❌ |

**Źródło:** [Semantic Intent Deviation Analyzer - Thatware](https://thatware.co/semantic-intent-deviation-analyzer/)

---

#### **Praktyczny przykład z naszego projektu**

**Strona:** `/oferta/kompleksowa-budowa-domow`
**Target Query:** "ile kosztuje budowa domu pod klucz"

```typescript
// ✅ Section 1 - On Target (score: 0.85)
{
  heading: "Kompleksowa Budowa - Cena i Zakres",
  text: `Budowa domu pod klucz w CoreLTB to inwestycja 4500-6500 zł/m².
         W cenę wchodzi projekt, pozwolenia, materiały, robocizna
         oraz nadzór techniczny. Dom 150m² kosztuje 675 000 - 975 000 zł.`
}
// → Google: "Perfect match! Konkretne liczby, zakres, przykład"

// ⚠️ Section 2 - Topical Partial Match (score: 0.62)
{
  heading: "Proces Budowy",
  text: `Proces budowy trwa 12-18 miesięcy i składa się z 8 etapów...`
}
// → Google: "OK, ale użytkownik pyta o KOSZT, nie czas"

// ❌ Section 3 - Off Topic (score: 0.38)
{
  heading: "Nasze Portfolio",
  text: `Zobacz 500+ zrealizowanych projektów w galerii...`
}
// → Google: "To nie odpowiada na pytanie o koszt"
```

---

### 2.6 Structural Emphasis - Waga Strukturalna

#### **Co to jest Structural Emphasis?**

**Definicja:**
Pomiar jak mocno "podkreślone" są kluczowe informacje w strukturze HTML.

**Wzór (z researchu):**

```
Structural Weight = depth_score × position_score × type_bonus

gdzie:
- depth_score = 1 - (min(depth, 3) / 3)     # H1=1.0, H2=0.66, H3=0.33
- position_score = 1 / (1 + position / 10)  # Wcześniej = wyższy score
- type_bonus = 1.15 (jeśli heading) lub 1.0 (paragraph)
```

**Źródło:** [Structural Emphasis Analyzer - Thatware](https://thatware.co/structural-emphasis-and-priority-analyzer/)

---

#### **Przykład praktyczny dla CoreLTB**

```html
<!-- ✅ WYSOKIE Structural Weight (1.0 × 1.0 × 1.15 = 1.15) -->
<h1>Kompleksowa Budowa Domów Pod Klucz</h1>

<!-- ⚠️ ŚREDNIE Structural Weight (0.66 × 0.91 × 1.15 = 0.69) -->
<h2>Zakres Usług</h2>
<p>Oferujemy pełen zakres usług budowlanych...</p>

<!-- ❌ NISKIE Structural Weight (0.33 × 0.50 × 1.0 = 0.165) -->
<footer>
  <p>CoreLTB Builders - Budujemy Twoje marzenia</p>
</footer>
```

**WNIOSEK dla nas:**
- ✅ Najważniejsze informacje w H1/H2 na górze strony
- ✅ CTA w Hero Section (wysoki position_score)
- ❌ Unikać "zakopywania" kluczowych info w stopce

---

#### **Implementacja w Next.js (nasza struktura)**

```tsx
// ✅ DOBRE - Komponenty z wysokim structural weight
// /app/oferta/[slug]/page.tsx

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceV2BySlug(params.slug);

  return (
    <>
      {/* HIGH WEIGHT: H1 na górze + PageHeader */}
      <PageHeader
        title={service.pageHeader.title}              // ← H1 element
        watermarkText={service.pageHeader.watermarkText}
      />

      {/* HIGH WEIGHT: Hero section (position=1) */}
      <EmotionalHeroSection
        label={service.emotionalHero.label}
        headline={service.emotionalHero.headline}      // ← H2 element
        ctaBoxTitle={service.emotionalHero.ctaBoxTitle}
      />

      {/* MEDIUM WEIGHT: Content sections */}
      <PhilosophyTimelineSection {...service.philosophyTimeline} />

      {/* LOW WEIGHT: Footer (ale OK, to nie kluczowa treść) */}
      <Footer />
    </>
  );
}
```

---

## 3. GENERATIVE ENGINE OPTIMIZATION (GEO)

### 3.1 Co to jest GEO? (Rewolucja 2024-2025)

**Definicja:**
Optymalizacja treści pod **AI-generowane odpowiedzi** (ChatGPT, Google AI Overviews, Perplexity).

**Dlaczego to game-changer?**

```
2023: Użytkownik wyszukuje → Klika top 3 wyniki → Czyta strony
2025: Użytkownik wyszukuje → AI generuje odpowiedź → NIE klika ❗

Problem: 60% wyszukiwań kończy się BEZ KLIKNIĘCIA!
```

**Źródła:**
- [Complete Guide to GEO 2025](https://www.geostar.ai/blog/complete-guide-to-generative-engine-optimization-2025)
- [Backlinko: Generative Engine Optimization](https://backlinko.com/generative-engine-optimization-geo)

---

### 3.2 Statystyki GEO (Grudzień 2025)

**Potwierdzony research:**

| Metryka | Wartość | Źródło |
|---------|---------|--------|
| **AI Overviews w US searches** | 13-20% | Relixir, Geostar |
| **AI-referred sessions wzrost** | +527% (Jan-May 2025) | Previsible 2025 Report |
| **Wzrost widoczności z GEO** | +115% | Princeton University |
| **Schema markup boost** | +30-40% AI visibility | Multiple sources |
| **Zaufanie do AI answers** | 70% konsumentów | Industry surveys |
| **Zero-click searches** | 60% | Industry average |

**KLUCZOWY WNIOSEK:**
GEO to nie "nice to have" - to **MUST HAVE** w 2025!

---

### 3.3 Jak AI Wybiera Źródła? (Mechanizm)

#### **Kryteria cytowania (AI Overviews)**

1. **Fact Density** - Ile konkretnych faktów per 100 słów?
2. **Citation Quality** - Czy tekst jest wiarygodny?
3. **Freshness** - Czy treść jest aktualna? (25.7% świeższa niż average)
4. **Answer Directness** - Czy odpowiedź jest w pierwszych 40-60 słowach?
5. **Schema Markup** - Czy używasz structured data?

**Źródło:** [Generative Engine Optimization Guide - Frase](https://www.frase.io/blog/what-is-generative-engine-optimization-geo)

---

#### **Przykład dla CoreLTB**

**❌ ŹLE (AI nie zacytuje):**
```
Nagłówek: "Budowa domów"
Treść: "Budujemy piękne domy. Nasz zespół ma doświadczenie.
        Skontaktuj się z nami, aby dowiedzieć się więcej."

Problem: Brak konkretów, brak struktury, brak faktów
```

**✅ DOBRZE (AI zacytuje):**
```
Nagłówek: "Ile kosztuje budowa domu pod klucz w Małopolsce?"
Treść: "Koszt budowy domu pod klucz w 2025 wynosi 4500-6500 zł/m².
        Dom o powierzchni 150m² kosztuje 675 000 - 975 000 zł.
        W cenę wchodzi:
        • Projekt architektoniczny i konstrukcyjny
        • Pozwolenie na budowę
        • Materiały budowlane (stan surowy zamknięty)
        • Robocizna (ekipa budowlana)
        • Nadzór techniczny

        Źródło: CoreLTB Builders, 500+ realizacji w Małopolsce, 2025"

✅ Fact density: 6 faktów / 60 słów = HIGH
✅ Directness: Cena w pierwszym zdaniu
✅ Structure: Bullet list dla AI parsing
✅ Citation: Dane źródłowe + rok
```

---

### 3.4 GEO Best Practices dla CoreLTB

#### **1. Answer-First Format**

```typescript
// ✅ W servicesV2.ts - zawsze dawaj odpowiedź NA POCZĄTKU

cooperationTimeline: {
  steps: [{
    title: "Krok 1: Analiza Działki",
    content: [
      {
        type: 'paragraph',
        value: 'Analiza działki trwa 2-3 dni i kosztuje 1500-2500 zł. Obejmuje badania geotechniczne, sprawdzenie warunków zabudowy i weryfikację przyłączy.'
        //     ↑ ODPOWIEDŹ w pierwszym zdaniu (czas + koszt + zakres)
      },
      {
        type: 'list',
        items: [
          'Badania geotechniczne gruntu (nośność, wilgotność)',
          'Weryfikacja planu zagospodarowania przestrzennego',
          'Sprawdzenie dostępności mediów (woda, prąd, gaz)',
          'Ocena nachylenia terenu i drenażu'
        ]
      }
    ]
  }]
}
```

---

#### **2. Stat Every 150-200 Words**

**Zasada GEO:**
AI lubi konkretne liczby, daty, procentы.

```typescript
// ✅ PRZYKŁAD dla "Kompleksowa Budowa Domów"

emotionalHero: {
  subtitle: "Od projektu przez budowę po odbiór - jedna umowa, jeden partner.
             W 2025 zrealizowaliśmy 87 projektów budowlanych w Małopolsce,
             osiągając 98% terminowość i 96% satysfakcję klientów."
             //        ↑ Liczby co ~50 słów
}

philosophyTimeline: {
  items: [
    {
      title: "500+ Zrealizowanych Projektów",
      //      ↑ Liczba
      description: "Od 2019 roku zbudowaliśmy 523 domy jednorodzinne
                    o łącznej powierzchni 89 000 m². Średni czas realizacji:
                    14 miesięcy."
                    //  ↑ Rok, liczby, metryka
    }
  ]
}
```

**Dlaczego to działa?**
- AI "wierzy" konkretnym liczebom (nie ogólnikom)
- Liczby = fact density = wyższy ranking w AI answers
- Daty = freshness signals

---

#### **3. Schema Markup (+30-40% boost)**

```typescript
// /app/oferta/[slug]/page.tsx
// TODO: Dodać Schema.org markup dla każdej usługi

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = getServiceV2BySlug(params.slug);

  return {
    title: service.metaTitle,
    description: service.metaDescription,

    // ✅ DODAĆ: JSON-LD Schema
    other: {
      'application/ld+json': JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        'name': service.title,
        'description': service.emotionalHero.subtitle,
        'provider': {
          '@type': 'Organization',
          'name': 'CoreLTB Builders',
          'url': 'https://coreltb.pl'
        },
        'areaServed': {
          '@type': 'State',
          'name': 'Małopolska'
        },
        'offers': {
          '@type': 'Offer',
          'price': '4500-6500',
          'priceCurrency': 'PLN',
          'priceSpecification': {
            '@type': 'UnitPriceSpecification',
            'price': '4500-6500',
            'priceCurrency': 'PLN',
            'unitCode': 'MTK' // per m²
          }
        }
      })
    }
  };
}
```

**Impact:** +30-40% szans na cytowanie w AI Overviews
**Źródło:** [GEO Statistics 2025](https://marketingltb.com/blog/statistics/generative-engine-optimization-statistics/)

---

#### **4. Citation-Friendly Format**

**AI preferuje:**
- ✅ Krótkie paragrafy (2-3 zdania max)
- ✅ Bullet lists (łatwe do parsowania)
- ✅ Clear headings (H2/H3 z pytaniami)
- ✅ Explicit sources ("Według badań...", "Dane z 2025...")

**Przykład dla FAQ Section:**

```typescript
// /data/servicesV2.ts
servicesAccordion: {
  services: [
    {
      title: "Ile trwa budowa domu od fundamentów do odbioru?",
      //    ↑ Pytanie w tytule (jak real user query)
      content: [
        {
          type: 'paragraph',
          value: 'Średni czas budowy domu jednorodzinnego wynosi 12-18 miesięcy (dane CoreLTB 2025, 500+ realizacji). Czas zależy od:'
          //      ↑ Odpowiedź + source + rok
        },
        {
          type: 'list',
          items: [
            '**Powierzchnia:** 100m² = 10-12 mies., 200m² = 15-18 mies.',
            '**Sezon:** Start wiosną -2 mies. vs start zimą',
            '**Gotowość projektu:** Z projektem gotowym -1 mies.',
            '**Dostępność ekip:** W szczycie sezonu +1-2 mies.'
          ]
        }
      ]
    }
  ]
}
```

---

### 3.5 GEO Checklist dla Każdej Strony

**Przed publishem nowej usługi/artykułu sprawdź:**

- [ ] **Answer in first 40-60 words?** (Direct response)
- [ ] **Stats every 150-200 words?** (Fact density)
- [ ] **Year/date mentioned?** (Freshness - "2025")
- [ ] **Bullet lists for key points?** (AI parsowanie)
- [ ] **Schema.org JSON-LD?** (Structured data)
- [ ] **Clear H2/H3 headings?** (Section clarity)
- [ ] **Sources/citations?** (Authority signals)
- [ ] **Word count 1500-2500?** (Optimal dla GEO)

---

## 4. INTENT ALIGNMENT - DOPASOWANIE DO INTENCJI

### 4.1 Co to jest Search Intent?

**Definicja:**
DLACZEGO użytkownik wpisuje query do Google? (nie CO wpisuje)

**4 typy intencji (standard branżowy):**

| Typ | Opis | Przykład Query | Co użytkownik chce? |
|-----|------|----------------|-------------------|
| **Informational** | Szuka wiedzy | "ile kosztuje budowa domu" | Artykuł / Poradnik |
| **Navigational** | Szuka konkretnej strony | "CoreLTB Builders kontakt" | Strona firmy |
| **Transactional** | Chce kupić/zamówić | "zamów projekt domu online" | Landing page + CTA |
| **Commercial** | Porównuje opcje | "najlepsze firmy budowlane małopolska" | Comparison / Reviews |

**Źródło:** [User Intent and Semantic SEO 2025](https://618media.com/en/blog/user-intent-and-semantic-seo-relevance/)

---

### 4.2 Intent Alignment Score (IAS)

**Co to mierzy?**
Jak dobrze Twoja treść odpowiada na **prawdziwą intencję** zapytania.

**Wzór (uproszczony):**

```
IAS = cosine_similarity(query_embedding, content_embedding) × intent_confidence

gdzie:
- query_embedding = vector representation zapytania
- content_embedding = vector representation sekcji treści
- intent_confidence = pewność klasyfikacji intencji (0-1)
```

**Progi jakości:**

| IAS Score | Interpretacja | Akcja |
|-----------|---------------|-------|
| **≥ 0.30** | Strong alignment | ✅ Keep as is, może zoptymalizować CTA |
| **0.20-0.30** | Acceptable | ⚠️ Dodaj więcej specific details |
| **< 0.20** | Weak | ❌ Rewrite - treść nie odpowiada na intent |

**Źródło:** Research Thatware.co + weryfikacja branżowa

---

### 4.3 Praktyczny Przykład dla CoreLTB

#### **Scenariusz 1: Informational Intent**

**Query:** "ile kosztuje budowa domu 150m2"
**Intent Type:** Informational (szuka wiedzy, nie chce jeszcze kupować)

```typescript
// ❌ ŹLE - Transactional content (IAS: 0.18)
{
  heading: "Zamów Budowę Domu Już Dziś!",
  content: "Skontaktuj się z nami, aby otrzymać wycenę. Numer: 123-456-789"
}
// Problem: User chce INFORMACJI, nie CTA

// ✅ DOBRZE - Informational content (IAS: 0.78)
{
  heading: "Koszt Budowy Domu 150m² - Szczegółowa Analiza 2025",
  content: `
    Budowa domu 150m² w stanie surowym zamkniętym kosztuje 450 000 - 600 000 zł.

    Rozbicie kosztów:
    • Stan surowy otwarty (fundamenty + ściany): 200 000 - 250 000 zł
    • Stan surowy zamknięty (+ dach + okna): 450 000 - 600 000 zł
    • Stan deweloperski (+ instalacje): 600 000 - 750 000 zł
    • Pod klucz (+ wykończenie): 750 000 - 1 000 000 zł

    Dane oparte na 87 realizacjach CoreLTB w 2025 roku.
  `
}
// ✅ Konkretne liczby, rozbicie, source
// ✅ Minimal CTA (może dodać soft: "Potrzebujesz dokładnej wyceny? Skontaktuj się")
```

---

#### **Scenariusz 2: Transactional Intent**

**Query:** "budowa domu pod klucz małopolska"
**Intent Type:** Transactional (gotowy do zakupu)

```typescript
// ❌ ŹLE - Informational content (IAS: 0.22)
{
  heading: "Historia Budownictwa w Polsce",
  content: "Budownictwo w Polsce ma długą tradycję..."
}
// Problem: User chce KUPIĆ, nie czytać historii

// ✅ DOBRZE - Transactional content (IAS: 0.82)
{
  heading: "Budowa Domu Pod Klucz w Małopolsce - Rozpocznij Swoją Inwestycję",
  content: `
    CoreLTB realizuje kompleksowe budowy domów pod klucz w Małopolsce od 2019 roku.

    **Co oferujemy:**
    • Projekt architektoniczny + konstrukcyjny
    • Pozwolenie na budowę (pomoc w procedurach)
    • Materiały + robocizna (sprawdzeni dostawcy i ekipy)
    • Nadzór budowlany (inspektor na budowie)
    • Gwarancja 5 lat

    **Cena:** 4500-6500 zł/m² (dom 150m² = 675k-975k zł)
    **Termin:** 12-18 miesięcy od podpisania umowy

    ☎ **Umów Bezpłatną Konsultację (30 min)**
    Przeanalizujemy Twoją działkę, przedstawimy harmonogram i realny budżet.
  `
}
// ✅ USP, konkretna oferta, pricing, CTA
// ✅ Trust signals (rok założenia, gwarancja)
```

---

### 4.4 Intent Classification (Automatyczna)

**Jak AI rozpoznaje intent?**

**Model:** BART-MNLI (zero-shot classification)
**Accuracy:** F1 score 0.68-0.72
**Źródło:** [facebook/bart-large-mnli - Hugging Face](https://huggingface.co/facebook/bart-large-mnli)

**Przykład działania:**

```python
# Pseudo-kod (w przyszłości można zaimplementować)

from transformers import pipeline

classifier = pipeline("zero-shot-classification", model="facebook/bart-large-mnli")

query = "ile kosztuje wykończenie domu"
intent_labels = ["Informational", "Navigational", "Transactional", "Commercial"]

result = classifier(query, intent_labels)
# Output:
# {
#   'labels': ['Informational', 'Commercial', 'Transactional', 'Navigational'],
#   'scores': [0.82, 0.12, 0.04, 0.02]
# }
# → Intent: Informational (82% confidence)
```

---

### 4.5 Intent Matching w servicesV2.ts

**Praktyczna implementacja:**

```typescript
// /data/servicesV2.ts

// ✅ INFORMATIONAL - FAQ Section
servicesAccordion: {
  header: {
    label: "NAJCZĘŚCIEJ ZADAWANE PYTANIA",
    title: "Wszystko co musisz wiedzieć o budowie domu"
  },
  services: [
    {
      title: "Ile kosztuje budowa domu 100m²?",  // ← Info query
      content: [/* detailed answer */]
    },
    {
      title: "Jak długo trwa proces budowy?",    // ← Info query
      content: [/* procedural answer */]
    }
  ]
}

// ✅ TRANSACTIONAL - CTA Box
emotionalHero: {
  ctaBoxTitle: "☎ Umów Bezpłatną Konsultację (30 min)",  // ← Trans. CTA
  ctaBoxBenefits: [
    "Przeanalizujemy Twoją działkę",              // ← Value prop
    "Przedstawimy realny harmonogram i budżet",   // ← Konkret
    "Wycenimy kompleksową realizację",            // ← Action
    "Odpowiemy na wszystkie pytania"              // ← Support
  ]
}

// ✅ COMMERCIAL - Philosophy Section
philosophyTimeline: {
  header: {
    title: "Dlaczego Warto Nas Wybrać?"  // ← Comparison angle
  },
  items: [
    {
      title: "500+ Zrealizowanych Projektów",  // ← Social proof
      description: "Od 2019 zbudowaliśmy 523 domy, średni czas: 14 miesięcy"
    },
    {
      title: "Gwarancja Stałej Ceny",         // ← USP
      description: "Cena w umowie = cena końcowa. Zero ukrytych kosztów."
    }
  ]
}
```

**WNIOSEK:**
Każda sekcja strony = inny intent type. Mix = comprehensive coverage.

---

## 5. CONTENT STRATEGY DLA CORELTB

### 5.1 Obecny Stan (Grudzień 2025)

**Co mamy:**
- ✅ 3 strony usług V2: `kompleksowa-budowa-domow`, `projektowanie`, `nadzor-i-doradztwo`
- ✅ Struktura Atomic Design (komponenty reużywalne)
- ✅ servicesV2.ts (dane w TypeScript, gotowe pod Strapi)
- ✅ SSR (Next.js 15.5.4)
- ❌ Brak `/blog` (artykuły edukacyjne)
- ❌ Brak Schema.org markup
- ❌ Brak semantic analysis tools

---

### 5.2 Strategia na Q1 2026

#### **FAZA 1: GEO Optimization (Styczeń 2026)**

**Cel:** Zwiększenie cytowań w AI Overviews

**Akcje:**

1. **Schema.org Implementation**
   ```typescript
   // Dodać do każdej strony usługi:
   - Service schema (typ usługi, cena, provider)
   - FAQPage schema (dla servicesAccordion)
   - BreadcrumbList schema (nawigacja)
   - Organization schema (firma)
   ```

2. **Content Enhancement**
   ```
   - Dodać rok "2025" do każdej sekcji z danymi
   - Wstawić stats co 150-200 słów
   - Answer-first format w FAQ
   - Bullet lists zamiast długich paragrafów
   ```

3. **Freshness Signals**
   ```typescript
   // Dodać w metadanych:
   lastModified: new Date('2025-12-10'),
   publishedDate: new Date('2025-10-24')
   ```

**Metryki sukcesu:**
- 📊 Wzrost AI citations o 30% (Q1 vs Q4 2025)
- 📊 Pojawienie się w AI Overviews dla 5+ top keywords

---

#### **FAZA 2: Blog Launch (Luty 2026)**

**Cel:** Topic clusters + long-tail traffic

**Struktura:**

```
/blog                                           # Hub (lista artykułów)
├── jak-przygotowac-dzialke-pod-budowe         # Cluster 1 → Pillar: budowa
├── ile-kosztuje-projekt-domu-indywidualnego   # Cluster 2 → Pillar: projektowanie
├── wybor-inspektora-nadzoru-budowlanego       # Cluster 3 → Pillar: nadzor
├── badania-geotechniczne-gruntu-koszty        # Cluster 4 → Pillar: budowa
└── [8-12 artykułów per pillar]                # Total: 36-72 artykuły
```

**Template artykułu:**

```typescript
// /data/blogPosts.ts (nowy plik)
export interface BlogPost {
  slug: string;
  title: string;
  metaDescription: string;
  author: string;
  publishedDate: Date;
  lastModified: Date;

  // SEO
  pillarPage: string;              // Link do głównej usługi
  relatedPosts: string[];          // Lateral linking

  // Content
  excerpt: string;                 // First 160 chars (AI Overview target)
  heroImage: string;
  sections: BlogSection[];

  // GEO
  faqSchema?: FAQPage;
  articleSchema: Article;
}

interface BlogSection {
  heading: string;                 // H2 (question format)
  content: ContentBlock[];         // Paragraphs + lists
  stats?: string[];                // Fact density
}
```

**Content Guidelines:**

| Element | Requirement | Why? |
|---------|-------------|------|
| **Word Count** | 1500-2500 | Optimal dla GEO |
| **Headings** | H2 = Questions | AI parsing |
| **First Paragraph** | Answer in 40-60 words | Direct response |
| **Stats** | Every 150-200 words | Fact density |
| **Internal Links** | 3-5 per post | Topic cluster |
| **Images** | 3-5 per post | Engagement |
| **Schema** | Article + FAQ | AI visibility |

---

#### **FAZA 3: Semantic Analysis (Marzec 2026)**

**Cel:** Automatyczna analiza intent alignment

**Tools do rozważenia:**

1. **SentenceTransformers (Open Source)**
   ```bash
   pip install sentence-transformers
   ```

   ```python
   from sentence_transformers import SentenceTransformer, util

   model = SentenceTransformer('all-mpnet-base-v2')

   # Query embedding
   query = "ile kosztuje budowa domu"
   query_emb = model.encode(query)

   # Content embedding
   content = service.emotionalHero.subtitle
   content_emb = model.encode(content)

   # Similarity
   similarity = util.cos_sim(query_emb, content_emb)
   print(f"Intent Alignment: {similarity[0][0]:.2f}")
   ```

2. **Jina AI Embeddings (Najnowsze - v4)**
   ```python
   # Jina v4 = 3.8B parametrów, multimodal
   model = SentenceTransformer('jinaai/jina-embeddings-v4')
   ```

3. **Custom Dashboard**
   ```typescript
   // /admin/semantic-analysis
   // Dashboard showing:
   // - Intent Alignment per service
   // - Semantic Deviation per section
   // - Recommendations for content improvement
   ```

**Output Example:**

```
Service: kompleksowa-budowa-domow
Target Query: "budowa domu pod klucz małopolska"

Section Analysis:
✅ EmotionalHero: IAS 0.82 (Strong)
⚠️ PhilosophyTimeline: IAS 0.64 (Acceptable - add pricing info)
✅ CooperationTimeline: IAS 0.78 (Strong)
❌ ContactCTA: IAS 0.42 (Weak - too generic)

Recommendations:
1. Add pricing range to PhilosophyTimeline section
2. Rewrite ContactCTA with transactional language
3. Consider adding "małopolska" mention in first 100 words
```

---

### 5.3 Topic Clusters - Mapa Kompletna

#### **PILLAR 1: Kompleksowa Budowa Domów**

**Main Page:** `/oferta/kompleksowa-budowa-domow`

**Cluster Articles (Blog):**
1. Jak przygotować działkę pod budowę? (Informational)
2. Ile kosztuje budowa domu 100m²? 150m²? 200m²? (Informational)
3. Etapy budowy domu krok po kroku (Informational)
4. Wybór wykonawcy budowlanego - 10 kluczowych pytań (Commercial)
5. Budowa domu pod klucz vs stan deweloperski (Commercial)
6. Materiały budowlane - na czym można zaoszczędzić? (Informational)
7. Czas budowy domu - realistyczne terminy (Informational)
8. Budowa energooszczędnego domu w 2025 (Informational)
9. Financing budowy - kredyt, dotacje, własne środki (Informational)
10. Błędy w budowie domów - case studies (Informational)

**Internal Linking:**
- Pillar → Links to all 10 articles (sekcja "Przydatne Poradniki")
- Each article → Links back to pillar
- Articles → Cross-link to related (3-5 links)

---

#### **PILLAR 2: Projektowanie**

**Main Page:** `/oferta/projektowanie`

**Cluster Articles:**
1. Projekt gotowy vs indywidualny - co wybrać? (Commercial)
2. Ile kosztuje projekt domu w 2025? (Informational)
3. Adaptacja projektu - kiedy jest konieczna? (Informational)
4. Projekt domu na trudnej działce (skarpa, wąska) (Informational)
5. Pozwolenie na budowę - procedura krok po kroku (Informational)
6. Zmiany w projekcie po zatwierdzeniu - czy to możliwe? (Informational)
7. Projekt domu energooszczędnego - trendy 2025 (Informational)
8. Warunki zabudowy - jak je sprawdzić? (Informational)

---

#### **PILLAR 3: Nadzór i Doradztwo**

**Main Page:** `/oferta/nadzor-i-doradztwo`

**Cluster Articles:**
1. Czym zajmuje się inspektor nadzoru budowlanego? (Informational)
2. Ile kosztuje nadzór inwestorski? (Informational)
3. Kiedy warto zatrudnić inspektora nadzoru? (Commercial)
4. Jak wybrać inspektora nadzoru - kryteria (Commercial)
5. Odbiory techniczne - co należy sprawdzić? (Informational)
6. Najczęstsze błędy budowlane wyłapywane przez inspektorów (Informational)
7. Nadzór inwestorski vs nadzór budowlany - różnice (Informational)
8. Dokumentacja budowy - co musi mieć inwestor? (Informational)

---

### 5.4 Content Creation Workflow

**Krok 1: Keyword Research**
```
Tool: Google Keyword Planner / Ahrefs / SEMrush
Cel: Znaleźć long-tail queries (search volume 100-1000)

Przykład output:
- "ile kosztuje budowa domu 150m2" (320/month)
- "budowa domu krok po kroku" (480/month)
- "jak wybrać inspektora nadzoru" (170/month)
```

**Krok 2: Intent Classification**
```
Manual (lub BART-MNLI):
Query: "ile kosztuje budowa domu"
Intent: Informational (user chce wiedzy, nie oferty)
Content Type: Educational article, data-rich
```

**Krok 3: Outline (Semantic-Rich)**
```markdown
# Ile Kosztuje Budowa Domu 150m² w 2025?

## Intro (60 words - Answer First)
Budowa domu 150m² kosztuje 675 000 - 1 000 000 zł w zależności
od standardu wykończenia. W tym artykule przedstawiam szczegółowe
rozbicie kosztów oparte na 87 realizacjach CoreLTB z 2025 roku.

## Rozbicie Kosztów (Stats Heavy)
### Stan Surowy Zamknięty (450k-600k)
- Materiały: 280k-360k (dane z 2025)
- Robocizna: 150k-210k
- Dokumentacja: 20k-30k

### Stan Deweloperski (600k-750k)
...

## FAQ (GEO Target)
### Czy cena może wzrosnąć w trakcie budowy?
...

## CTA (Soft - Informational)
Potrzebujesz dokładnej wyceny dla Twojego projektu?
[Umów bezpłatną konsultację]
```

**Krok 4: Writing Guidelines**
- ✅ Answer first (pierwsze 60 słów)
- ✅ Stat every 150-200 words
- ✅ H2/H3 = questions
- ✅ Bullet lists
- ✅ Bold for key terms
- ✅ Year mentions (2025)
- ✅ Source attribution ("Dane CoreLTB 2025")

**Krok 5: Schema Markup**
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Ile Kosztuje Budowa Domu 150m² w 2025?",
  "author": {
    "@type": "Organization",
    "name": "CoreLTB Builders"
  },
  "datePublished": "2025-02-01",
  "dateModified": "2025-02-01"
}
```

**Krok 6: Internal Linking**
```typescript
// W każdym artykule:
- Link do pillar page (top 200 words)
- 2-3 linki do related articles
- 1 link do contact/CTA

// Anchor text = naturalne
"Zobacz naszą ofertę kompleksowej budowy domów" ✅
"Kliknij tutaj" ❌
```

---

## 6. IMPLEMENTACJA TECHNICZNA

### 6.1 Schema.org dla Next.js 15

**Lokalizacja:** `/lib/schema/`

**Struktura plików:**

```
/lib/schema/
├── types.ts              # Re-export z schema-dts
├── generators/
│   ├── organization.ts   # generateOrganizationSchema()
│   ├── service.ts        # generateServiceSchema()
│   ├── faq.ts           # generateFAQSchema()
│   ├── breadcrumb.ts    # generateBreadcrumbSchema()
│   └── article.ts       # generateArticleSchema()
└── index.ts             # Centralne eksporty
```

---

#### **Przykład: Service Schema**

```typescript
// /lib/schema/generators/service.ts

import { Service, WithContext } from 'schema-dts';
import { ServiceV2 } from '@/data/servicesV2';

export function generateServiceSchema(service: ServiceV2): WithContext<Service> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',

    // Basic Info
    'name': service.title,
    'description': service.emotionalHero.subtitle,
    'url': `https://coreltb.pl/oferta/${service.slug}`,

    // Provider
    'provider': {
      '@type': 'Organization',
      'name': 'CoreLTB Builders',
      'url': 'https://coreltb.pl',
      'logo': 'https://coreltb.pl/images/logo.png',
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+48-123-456-789',
        'contactType': 'customer service',
        'areaServed': 'PL',
        'availableLanguage': 'Polish'
      }
    },

    // Service Area
    'areaServed': {
      '@type': 'State',
      'name': 'Małopolska',
      'containedInPlace': {
        '@type': 'Country',
        'name': 'Poland'
      }
    },

    // Pricing (jeśli dostępne)
    'offers': service.cooperationTimeline?.steps[0]?.content.find(
      block => block.type === 'paragraph' && block.value.includes('zł')
    ) ? {
      '@type': 'Offer',
      'priceCurrency': 'PLN',
      'priceSpecification': {
        '@type': 'UnitPriceSpecification',
        'price': '4500-6500',
        'priceCurrency': 'PLN',
        'unitText': 'per square meter'
      }
    } : undefined
  };
}
```

---

#### **Przykład: FAQ Schema**

```typescript
// /lib/schema/generators/faq.ts

import { FAQPage, WithContext } from 'schema-dts';
import { ServicesAccordionData } from '@/data/servicesV2';

export function generateFAQSchema(
  accordion: ServicesAccordionData
): WithContext<FAQPage> {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': accordion.services.map(item => ({
      '@type': 'Question',
      'name': item.title,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.content
          .map(block =>
            block.type === 'paragraph'
              ? block.value
              : block.items.join('; ')
          )
          .join(' ')
      }
    }))
  };
}
```

---

#### **Użycie w page.tsx**

```typescript
// /app/oferta/[slug]/page.tsx

import { generateServiceSchema, generateFAQSchema } from '@/lib/schema';

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getServiceV2BySlug(params.slug);

  // Generate schemas
  const serviceSchema = generateServiceSchema(service);
  const faqSchema = service.servicesAccordion
    ? generateFAQSchema(service.servicesAccordion)
    : null;

  return (
    <>
      {/* Schema Scripts */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c')
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c')
          }}
        />
      )}

      {/* Rest of page */}
      <PageHeader {...service.pageHeader} />
      <EmotionalHeroSection {...service.emotionalHero} />
      {/* ... */}
    </>
  );
}
```

**WAŻNE:** `.replace(/</g, '\\u003c')` = sanityzacja XSS (official Next.js pattern)

---

### 6.2 Semantic Analysis (Future)

**Kiedy zaimplementować:** Q1 2026 (po uruchomieniu bloga)

**Stack:**

```bash
# Python Backend (API)
pip install sentence-transformers torch numpy fastapi

# Frontend Integration
npm install @huggingface/inference
```

**Architektura:**

```
┌─────────────────┐
│   Next.js       │
│   Frontend      │
└────────┬────────┘
         │ HTTP POST /analyze
         ↓
┌─────────────────┐
│   FastAPI       │
│   Python API    │
│   (Port 8000)   │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│ SentenceTransf. │
│ all-mpnet-base  │
│ (Local/GPU)     │
└─────────────────┘
```

---

#### **API Endpoint (Pseudo)**

```python
# /api/semantic-analysis.py

from fastapi import FastAPI
from sentence_transformers import SentenceTransformer, util
import numpy as np

app = FastAPI()
model = SentenceTransformer('all-mpnet-base-v2')

@app.post("/analyze")
async def analyze_content(request: dict):
    query = request['query']
    sections = request['sections']  # List of {heading, text}

    # Generate embeddings
    query_emb = model.encode(query)
    section_embs = model.encode([s['text'] for s in sections])

    # Compute similarities
    similarities = util.cos_sim(query_emb, section_embs)[0].tolist()

    # Classify deviations
    results = []
    for i, (section, score) in enumerate(zip(sections, similarities)):
        results.append({
            'section_id': i,
            'heading': section['heading'],
            'similarity': round(score, 4),
            'classification': classify_score(score),
            'recommendation': get_recommendation(score)
        })

    return {
        'query': query,
        'overall_score': round(np.mean(similarities), 4),
        'sections': results
    }

def classify_score(score: float) -> str:
    if score >= 0.75:
        return "on_target"
    elif score >= 0.60:
        return "minor_deviation"
    elif score >= 0.45:
        return "moderate_deviation"
    else:
        return "strong_deviation"

def get_recommendation(score: float) -> str:
    if score >= 0.75:
        return "Content is well-aligned. Consider adding more specific examples."
    elif score >= 0.60:
        return "Add more direct answers and relevant keywords."
    elif score >= 0.45:
        return "Significant drift. Refocus content on query intent."
    else:
        return "Off-topic. Rewrite section to match query."
```

---

#### **Frontend Usage**

```typescript
// /admin/semantic-check/page.tsx

'use client';
import { useState } from 'react';

export default function SemanticCheckPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const analyzeService = async (slug: string) => {
    const service = getServiceV2BySlug(slug);

    // Prepare sections
    const sections = [
      {
        heading: 'Emotional Hero',
        text: service.emotionalHero.subtitle
      },
      ...service.cooperationTimeline?.steps.map(step => ({
        heading: step.title,
        text: step.content.map(b =>
          b.type === 'paragraph' ? b.value : b.items.join(' ')
        ).join(' ')
      })) || []
    ];

    // Call API
    const response = await fetch('http://localhost:8000/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, sections })
    });

    const data = await response.json();
    setResults(data);
  };

  return (
    <div className="p-8">
      <h1>Semantic Intent Analyzer</h1>

      <input
        type="text"
        placeholder="Enter target query..."
        value={query}
        onChange={e => setQuery(e.target.value)}
      />

      <button onClick={() => analyzeService('kompleksowa-budowa-domow')}>
        Analyze "Kompleksowa Budowa"
      </button>

      {results && (
        <div className="mt-8">
          <h2>Overall Score: {results.overall_score}</h2>

          {results.sections.map((section: any) => (
            <div key={section.section_id} className="border p-4 mt-4">
              <h3>{section.heading}</h3>
              <p>Similarity: {section.similarity}</p>
              <p>Classification: {section.classification}</p>
              <p className="text-sm">{section.recommendation}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

---

## 7. METRYKI I MONITORING

### 7.1 KPI Dashboard (Co mierzyć?)

**Primary Metrics:**

| Metryka | Target | Tool | Frequency |
|---------|--------|------|-----------|
| **AI Citations** | +30% Q/Q | Manual check (Google) | Monthly |
| **Organic Traffic** | +20% Q/Q | Google Analytics 4 | Weekly |
| **Avg. Position** | Top 5 for 10+ keywords | Google Search Console | Weekly |
| **CTR** | 5-8% (avg.) | GSC | Monthly |
| **Conversion Rate** | 2-4% (contact form) | GA4 | Weekly |

**Secondary Metrics:**

| Metryka | Target | Tool |
|---------|--------|------|
| **Bounce Rate** | < 50% | GA4 |
| **Avg. Session Duration** | > 2 min | GA4 |
| **Pages per Session** | > 2.5 | GA4 |
| **Schema Errors** | 0 | Google Rich Results Test |

---

### 7.2 Search Console - Kluczowe Raporty

**1. Performance Report**

```
Filtr: Page = /oferta/kompleksowa-budowa-domow
Metryki:
- Total Clicks: 450/month (target)
- Total Impressions: 12 000/month
- Avg. CTR: 3.75% (industry avg: 3-5%)
- Avg. Position: 8.2 (target: < 5)

Top Queries:
1. "budowa domu pod klucz małopolska" (position: 4)
2. "ile kosztuje budowa domu" (position: 12)
3. "firma budowlana kraków" (position: 7)
```

**Action:**
- Query #2 ma position 12 → Optimize content (add more pricing details)
- Query #1 ma position 4 → Push to #1-3 (build more backlinks, enhance content)

---

**2. Coverage Report**

```
✅ Valid: 87 pages indexed
⚠️ Valid with warnings: 3 pages (missing meta description)
❌ Error: 0 pages
🔄 Excluded: 12 pages (noindex, redirects)

Action:
- Fix 3 pages z warning (add meta descriptions)
- Verify excluded pages są intentionally excluded
```

---

**3. Core Web Vitals**

```
✅ Good URLs: 94%
⚠️ Needs Improvement: 5%
❌ Poor URLs: 1%

Metrics:
- LCP: 1.8s (target: < 2.5s) ✅
- FID: 45ms (target: < 100ms) ✅
- CLS: 0.08 (target: < 0.1) ✅
```

**WNIOSEK:** Wydajność OK. Next.js SSR + Cloudflare Pages = fast loading.

---

### 7.3 AI Overview Tracking (Manual)

**Jak śledzić cytowania?**

**Metoda 1: Manual Check**
```
1. Otwórz Google (incognito mode)
2. Wpisz target query: "budowa domu pod klucz małopolska"
3. Sprawdź czy AI Overview się pojawia
4. Jeśli tak, sprawdź czy coreltb.pl jest w źródłach
5. Screenshot + note w spreadsheet

Frequency: Raz w miesiącu dla top 20 queries
```

**Metoda 2: Tool (Future)**
```
Tool: BrightEdge / MarketMuse (paid)
Feature: AI Visibility tracking
Cost: $500-1000/month (enterprise)

Verdict: Za drogo na start. Manual tracking OK dla Q1 2026.
```

---

### 7.4 Semantic Analysis Metrics (Future)

**Gdy zaimplementujemy API (Q1 2026):**

| Metryka | Definicja | Target |
|---------|-----------|--------|
| **Page-Level IAS** | Avg. Intent Alignment Score dla całej strony | ≥ 0.70 |
| **Section Deviation Rate** | % sekcji z score < 0.60 | < 15% |
| **Query Coverage** | Ile target queries ma dedicated content? | 100% |
| **Semantic Freshness** | Kiedy ostatnio content był analyzed/updated? | < 3 months |

**Dashboard Example:**

```
Service: kompleksowa-budowa-domow
Last Analyzed: 2025-12-01

Target Queries Analysis:
┌──────────────────────────────────────┬─────────┬─────────────┐
│ Query                                │ IAS     │ Status      │
├──────────────────────────────────────┼─────────┼─────────────┤
│ budowa domu pod klucz małopolska     │ 0.82    │ ✅ Strong   │
│ ile kosztuje budowa domu             │ 0.64    │ ⚠️ Moderate │
│ firma budowlana kraków               │ 0.58    │ ⚠️ Weak     │
└──────────────────────────────────────┴─────────┴─────────────┘

Recommendations:
1. Add pricing section for "ile kosztuje" query
2. Enhance local SEO (Kraków mentions) for query #3
3. Overall: Good semantic alignment (avg: 0.68)
```

---

## 8. WORKFLOW DLA AGENTA SEO

### 8.1 Onboarding Agenta (Co Agent Musi Wiedzieć)

**1. Struktura Projektu**

```
CoreLTB Builders
├── Framework: Next.js 15.5.4 (SSR)
├── Styling: Tailwind CSS
├── Data: /data/servicesV2.ts (TypeScript, ready for Strapi)
├── Deployment: Cloudflare Pages
└── Architecture: Atomic Design (atoms/molecules/organisms)
```

**2. Content Management**

```typescript
// Wszystkie treści w:
/data/servicesV2.ts

// Struktura każdej usługi:
export interface ServiceV2 {
  slug: string;                  // URL-friendly identifier
  emotionalHero: { ... };        // Hero section (główny komunikat)
  philosophyTimeline: { ... };   // 3 filary filozofii
  cooperationTimeline?: { ... }; // Etapy współpracy (opcjonalne)
  servicesAccordion?: { ... };   // FAQ (opcjonalne)
  testimonials: { ... };         // Opinie klientów
  contactCTA: { ... };          // Formularz kontaktowy
}
```

**3. SEO Principles (Hierarchy)**

```
1. SEMANTIC SEO > Keyword SEO
   → Focus na znaczeniu, nie słowach kluczowych

2. GEO (AI Overviews) = Top Priority
   → 60% searches = zero-click (musimy być w AI citations)

3. Intent Alignment > Keyword Density
   → Content musi odpowiadać na INTENT (info/trans/comm/nav)

4. Structural Emphasis
   → Kluczowe info w H1/H2 na górze strony

5. Schema.org Markup
   → +30-40% boost w AI visibility
```

---

### 8.2 Content Creation Checklist

**Przed napisaniem nowej strony/artykułu:**

```markdown
[ ] Keyword research (long-tail, 100-1000 vol.)
[ ] Intent classification (Info/Trans/Comm/Nav)
[ ] Competitor analysis (top 5 results)
[ ] Outline z semantic richness
[ ] Internal linking plan (pillar + clusters)
```

**Podczas pisania:**

```markdown
[ ] Answer first (60 words max w intro)
[ ] Stat every 150-200 words
[ ] H2/H3 = Question format
[ ] Bullet lists dla key points
[ ] Bold dla important terms
[ ] Year "2025" mentioned
[ ] Source attribution ("Dane CoreLTB 2025")
[ ] Word count: 1500-2500
```

**Po napisaniu:**

```markdown
[ ] Schema.org markup (Service/Article/FAQ)
[ ] Internal links (3-5 per page)
[ ] Meta title (50-60 chars, keyword included)
[ ] Meta description (150-160 chars, CTA included)
[ ] Alt text dla images (descriptive, keyword-natural)
[ ] URL slug (lowercase, hyphens, keyword)
[ ] Breadcrumbs schema
```

---

### 8.3 Monthly SEO Audit (Routine)

**Każdy miesiąc (1. dzień miesiąca):**

**1. Search Console Check (30 min)**
```
[ ] Performance report (clicks, impressions, CTR, position)
[ ] Coverage report (errors, warnings)
[ ] Core Web Vitals (LCP, FID, CLS)
[ ] Manual actions (penalties check)
```

**2. AI Overview Check (30 min)**
```
[ ] Manual check top 20 queries
[ ] Screenshot AI Overviews
[ ] Note which queries show our citations
[ ] Update tracking spreadsheet
```

**3. Content Health (45 min)**
```
[ ] Check pages with avg. position > 10
[ ] Identify pages z declining traffic
[ ] List opportunities (queries position 4-10)
[ ] Plan content updates
```

**4. Schema Validation (15 min)**
```
[ ] Rich Results Test dla nowych stron
[ ] Fix any schema errors
[ ] Verify FAQs render properly
```

**5. Backlink Check (30 min)**
```
Tool: Ahrefs / SEMrush
[ ] New backlinks (quality check)
[ ] Lost backlinks (try to reclaim)
[ ] Competitor backlinks (opportunities)
```

**Total Time:** ~2.5h/month

---

### 8.4 Quarterly Strategy Review

**Co kwartał (styczeń, kwiecień, lipiec, październik):**

**1. KPI Review (1h)**
```
[ ] Compare metrics vs targets:
    - Organic traffic (+20% Q/Q?)
    - AI citations (+30% Q/Q?)
    - Conversion rate (2-4%?)
    - Avg. position (top 5 for 10+ keywords?)

[ ] Identify wins and losses
[ ] Update targets for next quarter
```

**2. Content Gap Analysis (1.5h)**
```
[ ] What queries competitors rank for (we don't)?
[ ] New long-tail opportunities (tools: AnswerThePublic, AlsoAsked)
[ ] User questions from contact form (FAQ candidates)
[ ] Seasonal trends (budowa domów peaks: marzec-maj)
```

**3. Technical Debt (1h)**
```
[ ] Pages without schema markup?
[ ] Pages with old content (> 1 year)?
[ ] Broken internal links?
[ ] Outdated data (prices, stats from old years)?
```

**4. Competitor Benchmark (1h)**
```
Top 3 competitors:
1. [Competitor A]
2. [Competitor B]
3. [Competitor C]

[ ] Their new content (topics, format)
[ ] Their backlinks strategy
[ ] Their AI Overview presence
[ ] Our competitive advantage (maintain/improve)
```

**Total Time:** ~4.5h/quarter

---

### 8.5 Emergency Playbook

**Scenariusz 1: Organic Traffic Drop > 20%**

```
KROK 1: Diagnoza (30 min)
[ ] Google Analytics: Które strony tracą traffic?
[ ] Search Console: Które queries tracą impressions/position?
[ ] Check: Google Core Update? (algoupdate.com)
[ ] Check: Technical issue? (site:coreltb.pl w Google)

KROK 2: Akcja (zależy od przyczyny)
Jeśli Core Update:
  → Review Google's guidelines
  → Check E-E-A-T signals (expertise, authoritativeness, trust)
  → Enhance content quality na affected pages

Jeśli Technical Issue:
  → Fix ASAP (np. robots.txt block, server down)
  → Request re-indexing w GSC

Jeśli Competitor Outrank:
  → Competitive analysis
  → Content refresh (add more depth, fresh data)
  → Build backlinks
```

---

**Scenariusz 2: AI Overview Citation Lost**

```
KROK 1: Verify (15 min)
[ ] Incognito Google search
[ ] Sprawdź czy AI Overview nadal się pojawia
[ ] Sprawdź kto nas zastąpił w cytowaniach

KROK 2: Root Cause (30 min)
Możliwe przyczyny:
- Competitor dodał świeższe dane (rok 2025 vs 2024)
- Competitor ma lepszy schema markup
- Nasza treść przestarzała (stare ceny, stare stats)

KROK 3: Fix (1-2h)
[ ] Update content (fresh data, current year)
[ ] Add/fix schema markup
[ ] Enhance fact density (więcej konkretnych liczb)
[ ] Request re-indexing
```

---

**Scenariusz 3: Schema Markup Error**

```
KROK 1: Identify (10 min)
[ ] Google Rich Results Test: paste URL
[ ] Note error type (missing field, wrong type, etc.)

KROK 2: Fix (30 min)
Common errors:
- Missing required fields (name, description)
- Wrong data type (string vs number)
- Invalid URL format

[ ] Fix w /lib/schema/generators/*.ts
[ ] Re-deploy (Cloudflare Pages)
[ ] Re-test (Rich Results Test)
[ ] Request re-indexing (GSC)
```

---

## 9. SŁOWNICZEK TERMINÓW

### 9.1 Podstawowe Koncepcje

**Semantic SEO**
- **Co to?** Optymalizacja oparta na **znaczeniu** treści (nie słowach kluczowych)
- **Jak działa?** Google używa AI (BERT, MUM, Gemini) do rozumienia kontekstu
- **Przykład:** Zamiast "nadzór nadzór nadzór" → opisujemy CO robi inspektor, DLACZEGO jest potrzebny

**Vector Embedding**
- **Co to?** Matematyczna reprezentacja tekstu (tablica 768 liczb)
- **Jak działa?** Model AI (MPNET, Jina) konwertuje tekst → liczby
- **Przykład:** "budowa domu" i "construction house" mają podobne embeddingi

**Cosine Similarity**
- **Co to?** Miara podobieństwa między dwoma embeddingami (0-1)
- **Jak działa?** Im wyższy score, tym bardziej podobne znaczenie
- **Przykład:** Score 0.85 = bardzo podobne, 0.40 = słabo związane

---

### 9.2 GEO (Generative Engine Optimization)

**AI Overview**
- **Co to?** Szary box na górze wyników Google z AI-generowaną odpowiedzią
- **Jak działa?** Gemini czyta top strony → generuje summary → cytuje źródła
- **Przykład:** Query "ile kosztuje budowa domu" → AI Overview z zakresem cen + źródła

**Fact Density**
- **Co to?** Ilość konkretnych faktów (liczby, daty) per 100 słów
- **Jak działa?** AI preferuje treść z wysoką fact density (łatwiej parsować)
- **Przykład:** "Budowa trwa długo" (LOW) vs "Budowa trwa 12-18 miesięcy" (HIGH)

**Schema Markup**
- **Co to?** Structured data (JSON-LD) w kodzie strony
- **Jak działa?** Mówi Google "to jest usługa, to FAQ, to cena"
- **Przykład:** `{"@type": "Service", "name": "Budowa domów", "price": "4500-6500 PLN"}`

---

### 9.3 Intent Alignment

**Search Intent**
- **Co to?** DLACZEGO użytkownik wpisuje query (co chce osiągnąć?)
- **Typy:** Informational, Navigational, Transactional, Commercial
- **Przykład:** "ile kosztuje nadzór" (Info) vs "zamów nadzór online" (Trans.)

**Intent Alignment Score (IAS)**
- **Co to?** Metryka (0-1) jak dobrze content odpowiada na intent
- **Jak działa?** Porównanie query_embedding ↔ content_embedding
- **Przykład:** IAS 0.78 = content dobrze odpowiada na pytanie użytkownika

**Semantic Deviation**
- **Co to?** Odchylenie treści od intencji zapytania
- **Typy:** On Target, Minor/Moderate/Strong Deviation, Off Topic
- **Przykład:** Query o kosztach → treść o historii = Strong Deviation

---

### 9.4 Structural Emphasis

**Structural Weight**
- **Co to?** Waga HTML elementu w hierarchii strony
- **Jak działa?** `depth × position × type_bonus`
- **Przykład:** H1 na górze strony = weight 1.15, paragraph w stopce = 0.20

**Position Score**
- **Co to?** Wyższy score dla treści wyżej na stronie
- **Jak działa?** `1 / (1 + position / 10)`
- **Przykład:** Pierwsze 100 słów = 1.0, stopka = 0.30

---

### 9.5 Technical SEO

**SSR (Server-Side Rendering)**
- **Co to?** HTML generowany na serwerze (nie w przeglądarce)
- **Dlaczego ważne?** Google widzi treść natychmiast (lepsze dla SEO)
- **Nasz stack:** Next.js 15.5.4 (full SSR)

**Core Web Vitals**
- **Co to?** 3 metryki szybkości strony (LCP, FID, CLS)
- **Dlaczego ważne?** Google ranking factor (wolne strony = niższe pozycje)
- **Nasze score:** LCP 1.8s, FID 45ms, CLS 0.08 (wszystkie ✅)

**Schema.org**
- **Co to?** Standard structured data (JSON-LD, Microdata)
- **Dlaczego ważne?** +30-40% boost w AI visibility
- **Nasze plany:** Implementacja w Q1 2026 (Service, FAQ, Breadcrumb schemas)

---

## 10. ŹRÓDŁA I BIBLIOGRAFIA

### 10.1 Semantic SEO

- [Writesonic: Semantic SEO Explained](https://writesonic.com/blog/semantic-seo)
- [Lumar: Semantic Search Vector Models](https://www.lumar.io/blog/best-practice/semantic-search-explained-vector-models-impact-on-seo/)
- [Search Engine Land: Shift to Semantic SEO](https://searchengineland.com/the-shift-to-semantic-seo-what-vectors-mean-for-your-strategy-452766)
- [Niumatrix: Semantic SEO Guide 2025](https://niumatrix.com/semantic-seo-guide/)
- [618media: User Intent and Semantic SEO](https://618media.com/en/blog/user-intent-and-semantic-seo-relevance/)

### 10.2 GEO (Generative Engine Optimization)

- [Geostar: Complete Guide to GEO 2025](https://www.geostar.ai/blog/complete-guide-to-generative-engine-optimization-2025)
- [Backlinko: Generative Engine Optimization](https://backlinko.com/generative-engine-optimization-geo)
- [Relixir: Google AI Overviews Surge 2025](https://relixir.ai/blog/google-ai-overviews-surge-2025-geo-matters-beyond-google-relixir)
- [Frase: What is GEO?](https://www.frase.io/blog/what-is-generative-engine-optimization-geo)
- [Marketing LTB: GEO Statistics 2025](https://marketingltb.com/blog/statistics/generative-engine-optimization-statistics/)

### 10.3 Intent Alignment & Semantic Deviation

- [Thatware: Semantic Intent Deviation Analyzer](https://thatware.co/semantic-intent-deviation-analyzer/)
- [Beomniscient: Advanced Semantic Search Strategies](https://beomniscient.com/blog/semantic-search-strategies-seo/)
- [Thatware: Jina-Based Semantic Reach Analyzer](https://thatware.co/jina-based-semantic-reach-analyzer/)
- [Thatware: Structural Emphasis Analyzer](https://thatware.co/structural-emphasis-and-priority-analyzer/)

### 10.4 Technical SEO & Tools

- [Jina AI: Embeddings v3](https://jina.ai/news/jina-embeddings-v3-a-frontier-multilingual-embedding-model/)
- [Jina AI: Embeddings v4](https://arxiv.org/html/2506.18902v3)
- [Hugging Face: all-mpnet-base-v2](https://huggingface.co/sentence-transformers/all-mpnet-base-v2)
- [Hugging Face: BART-MNLI](https://huggingface.co/facebook/bart-large-mnli)
- [Tinuiti: Cosine Similarity for AI SEO](https://tinuiti.com/blog/search/cosine-similarity/)
- [Thatware: SEO Audits as Risk Detection](https://thatware.co/turn-seo-audits-into-risk-detection-engines/)

### 10.5 Topic Clusters & URL Architecture

- [SEMrush: Topic Clusters](https://www.semrush.com/blog/topic-clusters/)
- [SEMrush: Website Architecture](https://www.semrush.com/blog/website-structure/)
- [HubSpot: Topic Clusters SEO](https://blog.hubspot.com/marketing/topic-clusters-seo)
- [Geneo: Best Practices 2025](https://geneo.app/blog/best-practices-topic-clusters-pillar-pages-google-authority-seo-2025/)

---

## 11. TODO - PRIORITIZED ROADMAP

### Q1 2026 (Styczeń - Marzec)

**✅ HIGH PRIORITY**

- [ ] **Schema.org Implementation**
  - [ ] Service schema (3 strony usług)
  - [ ] FAQPage schema (FAQ sections)
  - [ ] BreadcrumbList schema (nawigacja)
  - [ ] Organization schema (global)
  - **Owner:** Developer
  - **Time:** 2-3 dni

- [ ] **GEO Content Optimization**
  - [ ] Update wszystkich stron: add year "2025"
  - [ ] Add stats co 150-200 słów
  - [ ] Answer-first format w FAQ
  - [ ] Fact density check
  - **Owner:** Content Writer / SEO Specialist
  - **Time:** 1 tydzień

- [ ] **AI Overview Tracking Setup**
  - [ ] Spreadsheet template (20 top queries)
  - [ ] Monthly manual check workflow
  - [ ] Screenshot protocol
  - **Owner:** SEO Specialist
  - **Time:** 2h setup

**⚠️ MEDIUM PRIORITY**

- [ ] **Blog Infrastructure**
  - [ ] Design blog layout (Next.js page)
  - [ ] Create /data/blogPosts.ts structure
  - [ ] Implement article template
  - [ ] RSS feed setup
  - **Owner:** Developer
  - **Time:** 3-4 dni

- [ ] **First 10 Blog Articles**
  - [ ] Keyword research (30 queries)
  - [ ] Write 10 articles (pillar: budowa)
  - [ ] Internal linking setup
  - [ ] Schema markup per article
  - **Owner:** Content Writer
  - **Time:** 3-4 tygodnie

**🔵 LOW PRIORITY**

- [ ] **Semantic Analysis Proof of Concept**
  - [ ] Python API setup (FastAPI)
  - [ ] SentenceTransformers integration
  - [ ] Test na 1 stronie
  - **Owner:** Developer (backend)
  - **Time:** 2-3 dni

---

### Q2 2026 (Kwiecień - Czerwiec)

- [ ] Blog expansion (20+ artykuły total)
- [ ] Backlink campaign (guest posts, PR)
- [ ] Local SEO (Google Business Profile optimization)
- [ ] Semantic Analysis full rollout

---

### Q3-Q4 2026

- [ ] Video content (YouTube SEO)
- [ ] Case studies (detailed project showcases)
- [ ] International expansion? (EN version)

---

**KONIEC DOKUMENTU**

**Data ostatniej aktualizacji:** 2025-12-10
**Wersja:** 2.0 (Kompletna - Semantic SEO)
**Następny review:** 2026-01-01
