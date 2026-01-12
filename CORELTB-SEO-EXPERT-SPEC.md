# CoreLTB SEO Expert - Specyfikacja Techniczna

**Wersja:** 1.0
**Data:** 2025-12-10
**Status:** W fazie projektowania

---

## 1. PRZEGLĄD SYSTEMU

### 1.1 Cel
Inteligentne narzędzie do audytu SEO stron filarowych i klasterowych projektu CoreLTB Builders, oparte na zasadach z `strategia-seo.md` i `CLUSTER-PAGE-TEMPLATE.md`.

### 1.2 Kluczowe Funkcje
- **Wielowarstwowa analiza AI** (Gemini + Claude)
- **Sekcja po sekcji** - szczegółowe rekomendacje przypisane do konkretnych fragmentów treści
- **Rozumienie intencji** - automatyczne rozpoznawanie typu intencji (Commercial Investigation, TOFU, BOFU, itp.)
- **Walidacja semantyczna** - sprawdzanie spójności tematycznej przez embeddingi i cosine similarity
- **GEO optimization** - analiza gotowości na AI Overviews
- **Internal linking** - walidacja struktury linkowania wewnętrznego
- **Actionable recommendations** - konkretne, łatwe do wdrożenia sugestie

---

## 2. ARCHITEKTURA WYSOKOPOZIOMOWA

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (Next.js)                       │
│  - Upload URL / Paste HTML                                   │
│  - Display Analysis Results                                  │
│  - Section-by-Section Recommendations                        │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   API GATEWAY (FastAPI)                      │
│  - Request validation                                        │
│  - Rate limiting                                             │
│  - Response formatting                                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                   ORCHESTRATOR MODULE                        │
│  - Workflow coordination                                     │
│  - Module execution order                                    │
│  - Results aggregation                                       │
└─────────────────────────────────────────────────────────────┘
          ↓              ↓              ↓              ↓
┌──────────────┐ ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│   STRUCTURE  │ │    INTENT    │ │   SEMANTIC   │ │     GEO      │
│   ANALYZER   │ │  CLASSIFIER  │ │  VALIDATOR   │ │  OPTIMIZER   │
└──────────────┘ └──────────────┘ └──────────────┘ └──────────────┘
          ↓              ↓              ↓              ↓
┌─────────────────────────────────────────────────────────────┐
│              RECOMMENDATION ENGINE (Claude)                  │
│  - Section-by-section analysis                               │
│  - Concrete suggestions with examples                        │
│  - Priority scoring (P0, P1, P2)                            │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                 AI REASONING LAYER (Gemini)                  │
│  - Multi-step thinking                                       │
│  - Strategic recommendations                                 │
│  - Cross-section coherence check                            │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. MODUŁY ANALITYCZNE

### 3.1 STRUCTURE ANALYZER

**Cel:** Walidacja hierarchii URL, breadcrumbs, internal linking patterns

**Input:**
```json
{
  "url": "https://coreltb.pl/oferta/uslugi-techniczne/badania-geologiczne-gruntu",
  "html": "<html>...</html>",
  "pageType": "cluster" | "pillar" | "hub"
}
```

**Analiza:**
1. **URL Hierarchy Validation**
   - Sprawdź czy URL ma 3-4 segmenty (hub → pillar → cluster)
   - Waliduj konwencję nazewnictwa (lowercase, hyphens)
   - Weryfikuj czy slug jest semantyczny (nie ID)

2. **Breadcrumb Validation**
   - Czy breadcrumbs odzwierciedlają hierarchię URL?
   - Czy breadcrumbs są w `<nav>` z `aria-label="Breadcrumb"`?
   - Czy ostatni element ma `aria-current="page"`?

3. **Internal Linking Pattern**
   - **Dla klastra:**
     - Link do parent pillar ✓
     - Linki do 2-3 related clusters ✓
     - Anchor text diversity ✓
   - **Dla pilara:**
     - Linki do wszystkich child clusters ✓
     - Link do hub page ✓

**Output:**
```json
{
  "score": 85,
  "issues": [
    {
      "severity": "medium",
      "type": "internal_linking",
      "message": "Brak lateral linking do powiązanych klastrów",
      "recommendation": "Dodaj linki do: 'Pomiary Geodezyjne', 'Kosztorysy Budowlane'",
      "section": "contentSections[0]"
    }
  ]
}
```

---

### 3.2 INTENT CLASSIFIER

**Cel:** Automatyczne rozpoznawanie intencji strony

**Intent Types (strategia-seo.md):**
- **Commercial Investigation** (5-15% conversion) - "badania geologiczne gruntu cena"
- **TOFU** (1-3% conversion) - "oferta budowlana"
- **MOFU** (3-7% conversion) - "nadzór budowlany małopolska"
- **BOFU** (10-20% conversion) - "firma budowlana kraków kontakt"

**Algorytm:**
1. **Keyword Analysis**
   - Ekstrahuj target keyword z H1
   - Sprawdź modyfikatory: "cena", "jak", "dlaczego", "najlepszy"

2. **Content Structure Analysis**
   - Czy ma EmotionalHero z answer-first format? → Commercial Investigation
   - Czy ma CooperationTimeline? → MOFU/Commercial Investigation
   - Czy ma CTA Box z ceną/konsultacją? → BOFU

3. **Semantic Analysis (Gemini)**
   - Prompt dla Gemini:
   ```
   Analyze this page title and first 500 words:
   H1: {h1}
   Content: {content}

   Classify the user intent as one of:
   - Commercial Investigation (user wants to buy but needs info first)
   - TOFU (broad discovery)
   - MOFU (comparing options)
   - BOFU (ready to contact/buy)

   Provide confidence score 0-100.
   ```

**Output:**
```json
{
  "primaryIntent": "Commercial Investigation",
  "confidence": 92,
  "reasoning": "Title contains specific service name + first paragraph answers 'co to jest' question, typical of CI queries",
  "expectedConversion": "5-15%",
  "recommendations": [
    {
      "type": "structure",
      "message": "Intent poprawnie zidentyfikowany jako Commercial Investigation",
      "suggestion": "Utrzymaj answer-first format w subtitle EmotionalHero"
    }
  ]
}
```

---

### 3.3 SEMANTIC VALIDATOR

**Cel:** Walidacja spójności tematycznej przez embeddingi i cosine similarity

**Tech Stack:**
- **Model:** `text-embedding-004` (Google) lub `text-embedding-ada-002` (OpenAI)
- **Wymiar wektora:** 768 (Google) lub 1536 (OpenAI)
- **Threshold:** ≥0.75 (On Target), 0.60-0.75 (Minor Deviation), <0.60 (Problem)

**Algorytm:**

1. **Ekstrahuj Target Keyword** z H1 i meta description

2. **Stwórz Embeddingi:**
   ```python
   target_embedding = get_embedding(target_keyword)

   for section in sections:
       section_embedding = get_embedding(section.text)
       similarity = cosine_similarity(target_embedding, section_embedding)

       if similarity < 0.60:
           flag_as_off_topic(section, similarity)
   ```

3. **Section-Level Analysis:**
   - EmotionalHero.headline → similarity ≥0.80 (najważniejsze)
   - EmotionalHero.subtitle → similarity ≥0.75 (answer-first)
   - PhilosophyTimeline.items → similarity ≥0.70 (wspierające)
   - FAQ questions → similarity ≥0.65 (long-tail)

**Output:**
```json
{
  "overallScore": 0.78,
  "interpretation": "On Target",
  "sectionScores": [
    {
      "section": "EmotionalHero.headline",
      "text": "Uniknij Pękających Ścian i Zalanej Piwnicy. Zbadaj Grunt Przed Budową",
      "similarity": 0.89,
      "status": "excellent"
    },
    {
      "section": "philosophyTimeline.items[2]",
      "text": "Doświadczenie z 500+ realizacji",
      "similarity": 0.58,
      "status": "moderate_deviation",
      "recommendation": "Ta sekcja odchodzi od tematu 'badania geologiczne'. Dodaj konkretny przykład: 'Przeanalizowaliśmy 500+ próbek gruntu w Małopolsce – znamy każdy typ gleby.'"
    }
  ]
}
```

---

### 3.4 GEO OPTIMIZER

**Cel:** Optymalizacja pod AI Overviews (Google Search Generative Experience)

**Checklist GEO (z strategia-seo.md):**

1. **Answer-First Format** (CRITICAL)
   - Czy EmotionalHero.subtitle zawiera:
     - Definicję usługi? ✓
     - Koszt? ✓
     - Czas wykonania? ✓
     - Unikalną wartość firmy? ✓

   **Wzorzec:**
   > "Badanie geologiczne gruntu to analiza próbek pobranych z odwiertów na działce, która określa rodzaj i nośność gruntu, poziom wód gruntowych oraz potencjalne zagrożenia. **Koszt: 1500-3500 zł** (zależnie od powierzchni i liczby odwiertów). **Czas wykonania: 7-14 dni**. W CoreLTB Builders dostarczamy szczegółową opinię geotechniczną z konkretnymi zaleceniami dla konstruktora – chroniąc Twoją inwestycję przed najdroższymi błędami."

2. **FAQ Section**
   - Minimum 10-15 pytań
   - Pokrywają "People Also Ask" queries
   - Format pytanie → odpowiedź (150-300 słów)

3. **Schema.org Markup**
   - `FAQPage` schema dla FAQ
   - `Service` schema z price range
   - `BreadcrumbList` schema

4. **Structured Data**
   - Listy numerowane/punktowane
   - Tabele porównawcze
   - Headers (H2, H3) jako pytania

**Output:**
```json
{
  "geoScore": 72,
  "status": "Needs Improvement",
  "issues": [
    {
      "priority": "P0",
      "type": "answer_first_missing",
      "section": "EmotionalHero.subtitle",
      "current": "Profesjonalne badania geologiczne dla Twojej budowy",
      "problem": "Brak answer-first format - nie odpowiada na pytanie 'co to jest' ani nie podaje ceny/czasu",
      "recommendation": "Zamień na wzorzec answer-first:\n\n'Badanie geologiczne gruntu to analiza próbek pobranych z odwiertów na działce, która określa rodzaj i nośność gruntu, poziom wód gruntowych oraz potencjalne zagrożenia. Koszt: 1500-3500 zł (zależnie od powierzchni i liczby odwiertów). Czas wykonania: 7-14 dni. W CoreLTB Builders dostarczamy szczegółową opinię geotechniczną z konkretnymi zaleceniami dla konstruktora – chroniąc Twoją inwestycję przed najdroższymi błędami.'",
      "impact": "HIGH - AI Overviews preferują odpowiedzi ze strukturą definicja + koszt + czas"
    },
    {
      "priority": "P1",
      "type": "faq_insufficient",
      "section": "servicesAccordion",
      "current": "5 pytań",
      "recommendation": "Dodaj minimum 10 pytań pokrywających PAA queries:\n- Czy badanie geologiczne jest obowiązkowe?\n- Jak długo trwa badanie gruntu?\n- Kiedy najlepiej zlecić badanie geologiczne?\n- Co zawiera raport geotechniczny?\n- Czy można budować bez badania gruntu?",
      "impact": "MEDIUM - Featured snippets w 40-60% przypadków pochodzą z FAQ"
    }
  ]
}
```

---

### 3.5 CONTENT DEPTH ANALYZER

**Cel:** Sprawdzenie kompletności treści względem wzorca z CLUSTER-PAGE-TEMPLATE.md

**Wzorzec Cluster Page:**
- **Słowa:** 2500-3500 (minimum 2000)
- **Sekcje:**
  1. EmotionalHero (answer-first) ✓
  2. PhilosophyTimeline (3 punkty z konkretnymi kosztami) ✓
  3. CooperationTimelineNoLine (7 kroków) ✓
  4. ServicesAccordion (15 pytań FAQ) ✓
  5. Testimonials (2-3 opinie) ✓
  6. ContactCTA ✓

**Algorytm:**
1. **Word Count per Section**
   ```python
   word_counts = {
       'emotionalHero': count_words(hero),
       'philosophyTimeline': count_words(philosophy),
       'faq': count_words(faq),
       # ...
   }

   if total < 2000:
       flag_as_thin_content()
   ```

2. **Required Elements Check**
   - Czy PhilosophyTimeline ma konkretne liczby/koszty? (np. "15-20% oszczędności")
   - Czy FAQ ma minimum 10 pytań?
   - Czy CooperationTimeline ma wszystkie 7 kroków?

3. **Missing Sections Detection**
   ```python
   required_sections = ['emotionalHero', 'philosophyTimeline', 'faq', 'contactCTA']
   missing = [s for s in required_sections if s not in page_data]
   ```

**Output:**
```json
{
  "totalWords": 1842,
  "status": "Below Minimum",
  "wordsBySection": {
    "emotionalHero": 156,
    "philosophyTimeline": 487,
    "cooperationTimeline": 0,
    "faq": 892,
    "testimonials": 307
  },
  "missingElements": [
    {
      "section": "cooperationTimeline",
      "status": "missing",
      "recommendation": "Dodaj CooperationTimelineNoLine z 7 krokami opisującymi proces realizacji usługi. Wzorzec: /CLUSTER-PAGE-TEMPLATE.md linie 89-156",
      "impact": "HIGH - Brak procesu realizacji = trudniej konwertować users którzy chcą wiedzieć 'jak to działa'"
    },
    {
      "section": "philosophyTimeline.items[1]",
      "status": "vague",
      "current": "Lepsze ceny niż konkurencja",
      "recommendation": "Dodaj konkretne liczby: 'Typowa oszczędność: 15-20% całkowitego budżetu. Dla budowy 150m² to różnica 45 000 - 60 000 zł.'",
      "impact": "MEDIUM - Konkretne liczby budują zaufanie i ułatwiają podjęcie decyzji"
    }
  ]
}
```

---

## 4. RECOMMENDATION ENGINE (Claude)

**Cel:** Generowanie konkretnych, actionable recommendations dla każdej sekcji

**Workflow:**

1. **Aggregate Data** z wszystkich modułów:
   ```json
   {
     "structure": {...},
     "intent": {...},
     "semantic": {...},
     "geo": {...},
     "contentDepth": {...}
   }
   ```

2. **Claude Prompt (Section-by-Section Analysis):**
   ```
   You are an expert SEO content strategist for CoreLTB Builders.

   Analyze this page section by section and provide concrete, actionable recommendations.

   Page data:
   {pageData}

   Analysis results:
   {analysisResults}

   Reference documents:
   - strategia-seo.md (SEO strategy rules)
   - CLUSTER-PAGE-TEMPLATE.md (ideal cluster page structure)

   For EACH section, provide:
   1. Current status (Good / Needs Improvement / Critical Issue)
   2. Specific problem (if any)
   3. Concrete recommendation with EXAMPLE of how to fix it
   4. Priority (P0 = Critical, P1 = Important, P2 = Nice to have)
   5. Expected impact on conversion/ranking

   Focus on:
   - Adding specific numbers, dates, costs
   - Replacing vague marketing speak with concrete examples
   - Ensuring answer-first format in EmotionalHero
   - Validating FAQ coverage of "People Also Ask" queries
   - Checking Schema.org implementation

   Output as JSON array of recommendations.
   ```

3. **Claude Response Structure:**
   ```json
   {
     "recommendations": [
       {
         "section": "emotionalHero.subtitle",
         "status": "Critical Issue",
         "priority": "P0",
         "problem": "Brak answer-first format. Obecny tekst: 'Profesjonalne badania geologiczne dla Twojej budowy' jest zbyt marketingowy i nie odpowiada na podstawowe pytania.",
         "recommendation": "Zastąp wzorcem answer-first zawierającym: definicję + koszt + czas + unikalną wartość",
         "example": "Badanie geologiczne gruntu to analiza próbek pobranych z odwiertów na działce, która określa rodzaj i nośność gruntu, poziom wód gruntowych oraz potencjalne zagrożenia. Koszt: 1500-3500 zł (zależnie od powierzchni i liczby odwiertów). Czas wykonania: 7-14 dni. W CoreLTB Builders dostarczamy szczegółową opinię geotechniczną z konkretnymi zaleceniami dla konstruktora – chroniąc Twoją inwestycję przed najdroższymi błędami.",
         "impact": {
           "ranking": "+15-25% szansa na AI Overview feature",
           "conversion": "+8-12% przez lepszą komunikację wartości"
         },
         "difficultyScore": 2,
         "estimatedTimeMinutes": 15
       },
       {
         "section": "philosophyTimeline.items[1]",
         "status": "Needs Improvement",
         "priority": "P1",
         "problem": "Punkt 'Lepsza Cena Niż Konkurencja' jest zbyt ogólnikowy. Brak konkretnych liczb.",
         "recommendation": "Dodaj konkretną kalkulację oszczędności z przykładem",
         "example": "Lepsza Cena Niż 6 Osobnych Umów\n\nGdy kupujesz usługi osobno, każda firma ma swoją marżę. Gdy kupujesz pakiet, eliminujesz wielokrotne marże i koszty koordynacji. Typowa oszczędność: 15-20% całkowitego budżetu budowy.\n\nPrzykład dla domu 150m²:\n- Separate firms: 6× marża 15% = 630 000 zł\n- CoreLTB pakiet: Jedna marża = 540 000 zł\n- Oszczędność: 90 000 zł (zamiast tarasu masz jeszcze garaż)",
         "impact": {
           "conversion": "+5-8% przez konkretną komunikację ROI"
         },
         "difficultyScore": 3,
         "estimatedTimeMinutes": 30
       }
     ],
     "summary": {
       "totalIssues": 12,
       "critical": 2,
       "important": 5,
       "niceToHave": 5,
       "overallScore": 68,
       "nextSteps": [
         "1. Fix answer-first format w EmotionalHero (P0, 15 min)",
         "2. Dodaj CooperationTimeline z 7 krokami (P0, 2h)",
         "3. Rozbuduj FAQ z 5 do 15 pytań (P1, 1h)"
       ]
     }
   }
   ```

---

## 5. AI REASONING LAYER (Gemini)

**Cel:** Multi-step thinking dla strategicznych rekomendacji i cross-section coherence

**Użycie Gemini 2.0 Flash Thinking Mode:**

```python
import google.generativeai as genai

genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel('gemini-2.0-flash-thinking-exp')

prompt = f"""
You are a strategic SEO architect for CoreLTB Builders.

You have analysis results from multiple modules:
{json.dumps(all_analysis_results, indent=2)}

Think step-by-step:
1. What is the PRIMARY weakness of this page?
2. Which recommendation will have the HIGHEST impact on ranking AND conversion?
3. Are there any CONFLICTS between recommendations? (e.g., adding more text vs keeping it concise)
4. What is the OPTIMAL sequence for implementing these changes?

Provide strategic guidance with:
- Top 3 priorities (ranked by impact)
- Quick wins (high impact, low effort)
- Long-term improvements
- Coherence check (do all sections support the same intent?)
"""

response = model.generate_content(prompt)
strategic_recommendations = response.text
```

**Output Example:**
```json
{
  "strategicInsights": {
    "primaryWeakness": "Brak answer-first format w EmotionalHero eliminuje stronę z 40-60% AI Overviews. To jest BIGGEST missed opportunity.",
    "topPriorities": [
      {
        "priority": 1,
        "action": "Przepisz EmotionalHero.subtitle na answer-first format",
        "reasoning": "15 minut pracy może dać +20-30% widoczność w AI Overviews. Najwyższy ROI.",
        "impact": "HIGH"
      },
      {
        "priority": 2,
        "action": "Dodaj konkretne liczby/koszty w PhilosophyTimeline",
        "reasoning": "Konkretne oszczędności (np. '90 000 zł') konwertują 2-3× lepiej niż 'lepsze ceny'",
        "impact": "MEDIUM-HIGH"
      },
      {
        "priority": 3,
        "action": "Rozbuduj FAQ z 5 do 15 pytań",
        "reasoning": "Featured snippets pochodzą z FAQ w 40-60% przypadków. Więcej pytań = więcej traffic.",
        "impact": "MEDIUM"
      }
    ],
    "quickWins": [
      "Dodaj rok '2025' w nagłówkach (np. 'Badania Geologiczne Gruntu Małopolska 2025')",
      "Dodaj Schema.org FAQPage markup (5 min implementacji, +10-15% CTR)",
      "Zmień 'Skontaktuj się' na 'Umów Bezpłatną Konsultację' w CTA (urgency)"
    ],
    "coherenceCheck": {
      "status": "Good",
      "note": "Wszystkie sekcje wspierają Commercial Investigation intent. PhilosophyTimeline buduje zaufanie przez konkretne przykłady kosztów (aligned z CI). FAQ odpowiada na buying objections (aligned)."
    }
  }
}
```

---

## 6. TECH STACK RECOMMENDATION

### 6.1 Backend

**FastAPI** (Python)
- **Dlaczego:** Najszybszy framework dla AI/ML workloads, async support
- **Endpoints:**
  - `POST /api/analyze` - Main analysis endpoint
  - `GET /api/analyze/{jobId}` - Poll for results (async processing)
  - `GET /api/templates` - Get cluster page template
  - `GET /api/rules` - Get SEO rules from strategia-seo.md

**Celery** (Task Queue)
- Async processing dla długich analiz (30-60 sekund)
- Redis jako broker

**PostgreSQL** (Database)
- Przechowywanie analysis results
- History tracking (compare over time)

### 6.2 AI/ML

**Google Gemini API** (Thinking Mode)
- Multi-step reasoning
- Strategic recommendations
- Model: `gemini-2.0-flash-thinking-exp`

**Anthropic Claude API** (Content Analysis)
- Section-by-section detailed analysis
- Concrete recommendations with examples
- Model: `claude-sonnet-4-5`

**Google Embeddings API** (Semantic Similarity)
- `text-embedding-004` (768-dim)
- Cosine similarity calculation

### 6.3 Frontend

**Next.js 15** (React)
- Form do submitu URL/HTML
- Real-time progress updates (SSE)
- Results dashboard z section-by-section breakdown
- Export to PDF/JSON

**Tailwind CSS** (Styling)
- Consistent z głównym projektem CoreLTB

### 6.4 Infrastructure

**Docker** (Containerization)
```dockerfile
# api/Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

**Cloudflare Workers** (Edge deployment option)
- Gemini/Claude API calls z Workera
- Low latency globally

---

## 7. STRUKTURA PROJEKTU

```
coreltb-seo-expert/
├── backend/
│   ├── api/
│   │   ├── main.py                  # FastAPI app
│   │   ├── routes/
│   │   │   ├── analyze.py           # POST /analyze
│   │   │   └── templates.py         # GET /templates
│   │   └── models/
│   │       ├── request.py           # Pydantic models
│   │       └── response.py
│   ├── analyzers/
│   │   ├── structure.py             # StructureAnalyzer
│   │   ├── intent.py                # IntentClassifier
│   │   ├── semantic.py              # SemanticValidator
│   │   ├── geo.py                   # GEOOptimizer
│   │   └── content_depth.py         # ContentDepthAnalyzer
│   ├── engine/
│   │   ├── orchestrator.py          # Workflow coordination
│   │   ├── claude_recommendations.py # Claude-based recommendations
│   │   └── gemini_reasoning.py      # Gemini strategic layer
│   ├── utils/
│   │   ├── embeddings.py            # Embedding generation + cosine similarity
│   │   ├── scraper.py               # URL scraping (Playwright)
│   │   └── parser.py                # HTML → Structured data
│   ├── data/
│   │   ├── strategia-seo.md         # SEO rules reference
│   │   └── CLUSTER-PAGE-TEMPLATE.md # Cluster template
│   ├── requirements.txt
│   └── Dockerfile
├── frontend/
│   ├── app/
│   │   ├── page.tsx                 # Main analysis form
│   │   └── results/[id]/page.tsx    # Results dashboard
│   ├── components/
│   │   ├── AnalysisForm.tsx
│   │   ├── ResultsDashboard.tsx
│   │   ├── SectionRecommendation.tsx
│   │   └── ScoreCard.tsx
│   ├── package.json
│   └── Dockerfile
├── docker-compose.yml
└── README.md
```

---

## 8. API SPECIFICATION

### 8.1 POST /api/analyze

**Request:**
```json
{
  "url": "https://coreltb.pl/oferta/uslugi-techniczne/badania-geologiczne-gruntu",
  "pageType": "cluster",
  "options": {
    "enableGeminiReasoning": true,
    "deepSemanticAnalysis": true,
    "includeCompetitorComparison": false
  }
}
```

**Response (Immediate):**
```json
{
  "jobId": "uuid-here",
  "status": "processing",
  "estimatedTime": 45,
  "message": "Analysis started. Poll GET /api/analyze/{jobId} for results."
}
```

### 8.2 GET /api/analyze/{jobId}

**Response (In Progress):**
```json
{
  "jobId": "uuid-here",
  "status": "processing",
  "progress": 65,
  "currentStep": "Generating recommendations with Claude...",
  "steps": [
    {"name": "Structure Analysis", "status": "completed"},
    {"name": "Intent Classification", "status": "completed"},
    {"name": "Semantic Validation", "status": "completed"},
    {"name": "GEO Optimization Check", "status": "completed"},
    {"name": "Content Depth Analysis", "status": "completed"},
    {"name": "Generating Recommendations", "status": "in_progress"},
    {"name": "Strategic Reasoning (Gemini)", "status": "pending"}
  ]
}
```

**Response (Completed):**
```json
{
  "jobId": "uuid-here",
  "status": "completed",
  "timestamp": "2025-12-10T14:30:00Z",
  "page": {
    "url": "https://coreltb.pl/oferta/uslugi-techniczne/badania-geologiczne-gruntu",
    "pageType": "cluster",
    "title": "Badania Geologiczne Gruntu Małopolska | CoreLTB Builders",
    "h1": "Badania Geologiczne Gruntu",
    "wordCount": 1842
  },
  "scores": {
    "overall": 68,
    "structure": 85,
    "intent": 92,
    "semantic": 78,
    "geo": 52,
    "contentDepth": 61
  },
  "analysis": {
    "structure": {...},
    "intent": {...},
    "semantic": {...},
    "geo": {...},
    "contentDepth": {...}
  },
  "recommendations": [
    {
      "section": "emotionalHero.subtitle",
      "priority": "P0",
      "status": "Critical Issue",
      "problem": "...",
      "recommendation": "...",
      "example": "...",
      "impact": {...},
      "difficultyScore": 2,
      "estimatedTimeMinutes": 15
    }
    // ... more recommendations
  ],
  "strategicInsights": {
    "primaryWeakness": "...",
    "topPriorities": [...],
    "quickWins": [...],
    "coherenceCheck": {...}
  },
  "summary": {
    "totalIssues": 12,
    "critical": 2,
    "important": 5,
    "niceToHave": 5,
    "nextSteps": [...]
  }
}
```

---

## 9. PRZYKŁADOWY WORKFLOW

### Scenariusz: Analiza cluster page "Badania Geologiczne Gruntu"

**Step 1: User submits URL**
```bash
curl -X POST https://api.coreltb-seo.pl/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://coreltb.pl/oferta/uslugi-techniczne/badania-geologiczne-gruntu",
    "pageType": "cluster"
  }'
```

**Step 2: Backend scrapes page**
```python
from playwright.async_api import async_playwright

async def scrape_page(url):
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto(url)
        html = await page.content()
        await browser.close()
        return html
```

**Step 3: Parser ekstrahuje strukturę**
```python
def parse_html_to_structured_data(html):
    soup = BeautifulSoup(html, 'html.parser')

    return {
        'h1': soup.find('h1').text,
        'emotionalHero': {
            'headline': soup.select_one('[data-section="emotional-hero"] h2').text,
            'subtitle': soup.select_one('[data-section="emotional-hero"] p').text,
        },
        'philosophyTimeline': {
            'items': [
                {
                    'title': item.select_one('h3').text,
                    'description': item.select_one('p').text
                }
                for item in soup.select('[data-section="philosophy-timeline"] [data-item]')
            ]
        },
        # ... more sections
    }
```

**Step 4: Analyzers run in parallel**
```python
async def run_analysis(page_data):
    results = await asyncio.gather(
        structure_analyzer.analyze(page_data),
        intent_classifier.classify(page_data),
        semantic_validator.validate(page_data),
        geo_optimizer.check(page_data),
        content_depth_analyzer.analyze(page_data)
    )
    return aggregate_results(results)
```

**Step 5: Claude generates recommendations**
```python
async def generate_recommendations(analysis_results):
    prompt = build_claude_prompt(analysis_results)
    response = await anthropic.messages.create(
        model="claude-sonnet-4-5",
        max_tokens=8000,
        messages=[{"role": "user", "content": prompt}]
    )
    return parse_recommendations(response.content[0].text)
```

**Step 6: Gemini adds strategic layer**
```python
async def generate_strategic_insights(analysis_results, recommendations):
    prompt = build_gemini_prompt(analysis_results, recommendations)
    response = await genai.GenerativeModel('gemini-2.0-flash-thinking-exp').generate_content_async(prompt)
    return parse_strategic_insights(response.text)
```

**Step 7: Return results to frontend**

Frontend displays:
- **Score cards** (Overall 68/100, Structure 85/100, etc.)
- **Section-by-section breakdown** (każda sekcja z recommendations)
- **Priority matrix** (P0 issues na górze)
- **Quick wins** (High impact, low effort)
- **Export button** (PDF/JSON)

---

## 10. METRYKI SUKCESU

### 10.1 Technical Metrics

- **Analysis Time:** <60 sekund dla cluster page
- **API Uptime:** 99.9%
- **Cost per Analysis:** <$0.50 (Gemini + Claude + Embeddings)

### 10.2 Business Metrics

**Przed SEO Expert:**
- Czas audytu strony: 2-3 godziny (manual)
- Konkretność rekomendacji: Niska (vague suggestions)
- Implementation rate: 30% (unclear action items)

**Po SEO Expert:**
- Czas audytu: 1-2 minuty (automated)
- Konkretność: Wysoka (specific examples + diffs)
- Implementation rate: 80% (clear, actionable steps)

**Expected Impact on Pages:**
- +20-30% widoczność w AI Overviews (przez answer-first format)
- +10-15% organic traffic (przez lepszy ranking)
- +5-10% conversion rate (przez konkretne liczby/koszty)

---

## 11. ROADMAP

### Phase 1: MVP (4 tygodnie)
- [ ] Basic StructureAnalyzer
- [ ] IntentClassifier z Gemini
- [ ] SemanticValidator z embeddings
- [ ] Claude recommendations engine
- [ ] Simple Next.js frontend

### Phase 2: Full Features (6 tygodni)
- [ ] GEOOptimizer
- [ ] ContentDepthAnalyzer
- [ ] Gemini strategic reasoning layer
- [ ] Advanced frontend (section-by-section breakdown)
- [ ] Export to PDF/JSON

### Phase 3: Advanced (8 tygodni)
- [ ] Competitor comparison
- [ ] Historical tracking (score over time)
- [ ] Batch analysis (analyze all cluster pages)
- [ ] Automatic Strapi integration (apply fixes directly)
- [ ] A/B testing recommendations

---

## 12. SECURITY & COMPLIANCE

### 12.1 API Keys
- Gemini API key w environment variables
- Claude API key w environment variables
- Secrets rotation co 90 dni

### 12.2 Rate Limiting
- 10 requests/minute per IP
- 100 requests/day per user

### 12.3 Data Privacy
- Nie przechowuj scraped HTML >7 dni
- Analysis results retain for 90 dni
- GDPR compliance (right to deletion)

---

## 13. KOSZTY (SZACUNKOWE)

### 13.1 Per Analysis

| Component | Model | Cost |
|-----------|-------|------|
| Gemini Thinking | gemini-2.0-flash-thinking-exp | $0.08 |
| Claude Analysis | claude-sonnet-4-5 | $0.25 |
| Embeddings | text-embedding-004 | $0.02 |
| **Total** | | **$0.35** |

### 13.2 Monthly (100 analyses)
- API calls: $35
- Hosting (Cloudflare Workers): $5
- Database (PostgreSQL): $10
- **Total: $50/month**

---

**KONIEC SPECYFIKACJI v1.0**

---

## APPENDIX A: Przykładowy Prompt dla Claude

```
You are an expert SEO content strategist for CoreLTB Builders, a construction company in Poland.

Context:
- CoreLTB specializes in comprehensive home building services
- Target audience: Individual investors building their first home
- Geography: Małopolska, Śląskie, Świętokrzyskie
- SEO strategy: Topic clusters with pillar + cluster pages
- Conversion funnel: TOFU → MOFU → BOFU (Commercial Investigation intent is highest priority)

Your task:
Analyze this cluster page section-by-section and provide concrete, actionable recommendations.

Page URL: {url}
Page Type: {pageType}

Structured data extracted from page:
```json
{pageData}
```

Analysis results from other modules:
```json
{analysisResults}
```

Reference standards (from strategia-seo.md):
- Commercial Investigation intent converts at 5-15%
- Answer-first format critical for AI Overviews
- Concrete numbers/costs convert 2-3× better than vague claims
- FAQ should cover 10-15 "People Also Ask" queries
- Internal linking: Cluster → Pillar + 2-3 lateral clusters

For EACH section, provide:

1. **Section Name** (e.g., "emotionalHero.subtitle")
2. **Current Status** (Good / Needs Improvement / Critical Issue)
3. **Priority** (P0 = Critical, P1 = Important, P2 = Nice to have)
4. **Current Content** (quote the problematic text)
5. **Specific Problem** (why it's not optimal)
6. **Recommendation** (what to change)
7. **Example** (show EXACTLY how the new version should look)
8. **Expected Impact** (on ranking and conversion, with % estimates)
9. **Difficulty Score** (1-5, where 1=easy, 5=requires dev work)
10. **Estimated Time** (minutes to implement)

Focus areas:
- ✅ Answer-first format in EmotionalHero.subtitle (definicja + koszt + czas + wartość)
- ✅ Concrete numbers/costs in PhilosophyTimeline (not "better prices" but "save 90,000 zł")
- ✅ FAQ coverage of PAA queries (15 questions minimum)
- ✅ Schema.org markup (FAQPage, Service, BreadcrumbList)
- ✅ Internal linking (pillar + lateral clusters)

Output as JSON array of recommendations.

After recommendations, provide:
- **Summary** with total issues count by priority
- **Top 3 Quick Wins** (highest impact, lowest effort)
- **Next Steps** (ordered list of actions)

Think step-by-step before generating recommendations.
```

---

## APPENDIX B: Przykładowy Output Claude

```json
{
  "recommendations": [
    {
      "section": "emotionalHero.subtitle",
      "status": "Critical Issue",
      "priority": "P0",
      "currentContent": "Profesjonalne badania geologiczne dla Twojej budowy",
      "problem": "To marketingowe hasło, nie answer-first format. Nie odpowiada na podstawowe pytania: 'Co to jest?', 'Ile kosztuje?', 'Ile trwa?'. AI Overviews pomijają takie strony.",
      "recommendation": "Zastosuj wzorzec answer-first: Definicja + Koszt + Czas + Unikalna wartość CoreLTB",
      "example": "Badanie geologiczne gruntu to analiza próbek pobranych z odwiertów na działce, która określa rodzaj i nośność gruntu, poziom wód gruntowych oraz potencjalne zagrożenia. Koszt: 1500-3500 zł (zależnie od powierzchni i liczby odwiertów). Czas wykonania: 7-14 dni. W CoreLTB Builders dostarczamy szczegółową opinię geotechniczną z konkretnymi zaleceniami dla konstruktora – chroniąc Twoją inwestycję przed najdroższymi błędami.",
      "impact": {
        "ranking": "+20-30% szansa na AI Overview feature snippet",
        "conversion": "+10-15% przez jaśniejszą komunikację wartości",
        "reasoning": "Answer-first format jest wymagany przez Gemini/MUM do ekstrakcji odpowiedzi. Bez tego strona nie ma szans na AI Overviews, które generują 15-25% CTR."
      },
      "difficultyScore": 2,
      "estimatedTimeMinutes": 15,
      "implementationSteps": [
        "1. Otwórz /data/servicesV2.ts",
        "2. Znajdź service o slug 'badania-geologiczne-gruntu'",
        "3. Zamień emotionalHero.subtitle na przykład powyżej",
        "4. npm run build",
        "5. Deploy"
      ]
    },
    {
      "section": "philosophyTimeline.items[1]",
      "status": "Needs Improvement",
      "priority": "P1",
      "currentContent": "Lepsza Cena Niż Konkurencja\n\nOferujemy konkurencyjne ceny dzięki optymalizacji procesów.",
      "problem": "Vague marketing speak. 'Lepsza cena' i 'optymalizacja procesów' to puste frazy. Brak konkretnych liczb = brak zaufania.",
      "recommendation": "Dodaj konkretną kalkulację oszczędności z przykładem dla typowego projektu",
      "example": "Lepsza Cena Niż 6 Osobnych Umów\n\nGdy kupujesz badanie geologiczne, projekt, nadzór i wykonawstwo osobno, każda firma ma swoją marżę 12-18%. Gdy kupujesz pakiet CoreLTB, eliminujesz wielokrotne marże.\n\nPrzykład dla domu 150m²:\n• 6 separate firms: Badanie (2000 zł) + Projekt (8000 zł) + Nadzór (15000 zł) + Wykonawstwo (500000 zł) = 525 000 zł\n• CoreLTB pakiet: 450 000 zł\n• **Oszczędność: 75 000 zł** (to koszt całego tarasu 40m²)\n\nTypowa oszczędność: 12-18% całkowitego budżetu.",
      "impact": {
        "conversion": "+8-12% przez konkretną komunikację ROI",
        "reasoning": "Konkretne liczby budują zaufanie. '75 000 zł oszczędności' jest 3× bardziej przekonujące niż 'lepsze ceny'."
      },
      "difficultyScore": 3,
      "estimatedTimeMinutes": 30
    },
    {
      "section": "servicesAccordion",
      "status": "Needs Improvement",
      "priority": "P1",
      "currentContent": "5 pytań FAQ",
      "problem": "Za mało pytań. Featured snippets pochodzą z FAQ w 40-60% przypadków. Obecne 5 pytań nie pokrywa wszystkich PAA queries.",
      "recommendation": "Rozbuduj do 15 pytań pokrywających wszystkie 'People Also Ask' queries z Google",
      "example": "Dodaj pytania:\n\n**Podstawy:**\n1. Czym jest badanie geologiczne gruntu?\n2. Czy badanie geologiczne jest obowiązkowe?\n3. Kiedy najlepiej zlecić badanie gruntu?\n\n**Koszty i Czas:**\n4. Ile kosztuje badanie geologiczne gruntu? (1500-3500 zł breakdown)\n5. Jak długo trwa badanie gruntu? (7-14 dni)\n6. Co wpływa na cenę badania?\n\n**Procedury:**\n7. Co zawiera raport geotechniczny?\n8. Czy można budować bez badania gruntu? (TAK - ryzyko pęknięć, NIE - dla kredytu)\n9. Kto wykonuje badanie geologiczne? (uprawniony geolog)\n\n**Problemy:**\n10. Co zrobić gdy grunt jest słaby? (pale, studnie, wymiana gruntu)\n11. Czy potrzebuję badania na działce z starym domem?\n12. Jak odczytać raport geotechniczny?\n\n**Specifics:**\n13. Badanie gruntu na działce z nachyleniem\n14. Badanie poziomu wód gruntowych\n15. Ile odwiertów potrzebnych dla działki 1000m²?",
      "impact": {
        "ranking": "+15-25% szansa na featured snippet dla każdego pytania",
        "traffic": "+20-30% long-tail traffic z PAA queries",
        "reasoning": "Każde pytanie to potencjalny featured snippet. 15 pytań = 15 szans na top pozycję."
      },
      "difficultyScore": 4,
      "estimatedTimeMinutes": 90
    }
  ],
  "summary": {
    "totalIssues": 12,
    "byPriority": {
      "P0": 2,
      "P1": 5,
      "P2": 5
    },
    "overallScore": 68,
    "interpretation": "Needs Significant Improvement",
    "topIssues": [
      "Brak answer-first format (eliminuje z AI Overviews)",
      "Vague marketing claims zamiast konkretnych liczb",
      "Za mało pytań FAQ (missed opportunity dla featured snippets)"
    ]
  },
  "quickWins": [
    {
      "action": "Przepisz EmotionalHero.subtitle na answer-first",
      "impact": "HIGH",
      "effort": "LOW (15 min)",
      "expectedGain": "+20-30% szansa na AI Overview"
    },
    {
      "action": "Dodaj rok '2025' w title i H1",
      "impact": "MEDIUM",
      "effort": "VERY LOW (5 min)",
      "expectedGain": "+5-8% CTR (freshness signal)"
    },
    {
      "action": "Dodaj Schema.org FAQPage markup",
      "impact": "MEDIUM",
      "effort": "LOW (10 min)",
      "expectedGain": "+10-15% CTR w SERP (rich results)"
    }
  ],
  "nextSteps": [
    "1. [P0, 15 min] Przepisz EmotionalHero.subtitle na answer-first format",
    "2. [P0, 2h] Dodaj CooperationTimelineNoLine z 7 krokami procesu realizacji",
    "3. [P1, 90 min] Rozbuduj FAQ z 5 do 15 pytań",
    "4. [P1, 30 min] Dodaj konkretne liczby/koszty w PhilosophyTimeline",
    "5. [P1, 20 min] Implementuj Schema.org (FAQPage + Service + BreadcrumbList)",
    "6. [P2, 45 min] Dodaj lateral linking do 2-3 powiązanych klastrów",
    "7. [P2, 30 min] Dodaj testimonial z konkretnym przykładem (np. 'Dom w Krakowie, grunt Gw')"
  ]
}
```
