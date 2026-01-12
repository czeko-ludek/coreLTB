"""
Gemini Recommendations Engine - Generate section-by-section actionable recommendations using Gemini 3 Pro
"""

from google import genai
from google.genai import types
from typing import Dict, List
import json
import config


class GeminiRecommendationsEngine:
    """Generate detailed recommendations using Gemini 3 Pro"""

    def __init__(self, page_data: Dict, analysis_results: Dict):
        self.page_data = page_data
        self.analysis_results = analysis_results

        if config.GEMINI_API_KEY:
            self.client = genai.Client(api_key=config.GEMINI_API_KEY)
            self.model = 'gemini-3-pro-preview'
        else:
            self.client = None
            self.model = None

    def generate(self) -> Dict:
        """Generate recommendations"""

        if not self.client:
            return self._fallback_recommendations()

        prompt = self._build_prompt()

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.4,
                    response_mime_type="application/json"
                )
            )

            return self._parse_gemini_response(response.text)

        except Exception as e:
            print(f"⚠️  Gemini recommendations failed: {str(e)}")
            return self._fallback_recommendations()

    def _build_prompt(self) -> str:
        """Build prompt for Gemini"""

        # Get key data
        h1 = self.page_data.get('h1', '')
        meta_desc = self.page_data.get('meta', {}).get('description', '')
        word_count = self.page_data.get('wordCount', {}).get('total', 0)

        # Get analysis scores
        structure_score = self.analysis_results.get('structure', {}).get('score', 0)
        intent = self.analysis_results.get('intent', {}).get('primaryIntent', 'unknown')
        semantic_score = self.analysis_results.get('semantic', {}).get('overallScore', 0)
        geo_score = self.analysis_results.get('geo', {}).get('score', 0)
        content_score = self.analysis_results.get('contentDepth', {}).get('score', 0)

        return f"""Jesteś ekspertem SEO i strategiem treści dla CoreLTB Builders - firmy budowlanej w Polsce.

**Kontekst firmy:**
- CoreLTB specjalizuje się w kompleksowej budowie domów
- Grupa docelowa: Inwestorzy indywidualni budujący pierwszy dom
- Geografia: Małopolska, Śląskie, Świętokrzyskie
- Strategia SEO: Topic clusters (pillar + cluster pages)
- Ścieżka konwersji: TOFU → MOFU → BOFU (Commercial Investigation = najwyższy priorytet)

**Twoje zadanie:**
Przeanalizuj tę stronę sekcja po sekcji i dostarcz konkretne, wykonalne rekomendacje w języku polskim.

**⚡ FILOZOFIA ANALIZY (BARDZO WAŻNE!):**
1. **Pozytywny feedback JEST** - Jeśli sekcja jest dobra, oznacz ją jako "Dobrze" w status i pomiń
2. **NIE przepisuj całej strony** - Rekomenduj zmiany tylko dla PROBLEMÓW, nie dla elementów OK
3. **Wartość dla użytkownika > SEO spam** - Priorytet to czytelność i użyteczność
4. **Kontekst intencji** - Oceń czy cała strona jest spójna z Commercial Investigation
5. **Liczby z umiarem** - Dodaj koszty/czas gdzie mają sens, nie w każdym zdaniu
6. **Spójność narracji** - Czy sekcje wspierają się nawzajem? Czy jest logiczny flow?

---

## Informacje o stronie

**Typ URL:** Strona cluster (pod-usługa pod pillarem)
**H1:** {h1}
**Meta Description:** {meta_desc}
**Liczba słów:** {word_count}

---

## Wyniki analizy

- **Struktura:** {structure_score}/100
- **Intencja:** {intent}
- **Spójność semantyczna:** {semantic_score:.2f}
- **Optymalizacja GEO:** {geo_score}/100
- **Głębokość treści:** {content_score}/100

---

## Szczegółowe wyniki analizy

```json
{json.dumps(self.analysis_results, indent=2, ensure_ascii=False)}
```

---

## Dane strony (wyodrębnione sekcje)

```json
{json.dumps({
    'emotionalHero': self.page_data.get('emotionalHero'),
    'philosophyTimeline': self.page_data.get('philosophyTimeline'),
    'faq': self.page_data.get('faq'),
    'wordCounts': self.page_data.get('wordCount')
}, indent=2, ensure_ascii=False)}
```

---

## Standardy referencyjne (z strategia-seo.md)

- **Commercial Investigation intent** konwertuje na 5-15%
- **Format answer-first** krytyczny dla AI Overviews (definicja + koszt + czas + wartość)
- **Konkretne liczby/koszty** konwertują 2-3× lepiej niż vague claims
- **FAQ** powinno pokrywać 10-15 zapytań "People Also Ask"
- **Liczba słów:** Minimum 2000, cel 2500-3500 dla clusters
- **Linkowanie wewnętrzne:** Cluster → Pillar + 2-3 boczne clustery

---

## Instrukcje

Dla KAŻDEGO głównego problemu znalezionego w analizie, dostarcz rekomendację z:

1. **section** - Która sekcja (np. "emotionalHero.subtitle", "philosophyTimeline.items[1]", "faq")
2. **status** - "Krytyczny Problem" / "Wymaga Poprawy" / "Dobrze"
3. **priority** - "P0" (krytyczne), "P1" (ważne), "P2" (nice to have)
4. **currentContent** - **CYTAT** aktualnego tekstu z tej sekcji (dokładny fragment, który jest problemem)
5. **problem** - Opis konkretnego problemu
6. **recommendation** - Co zmienić
7. **example** - Pokaż DOKŁADNIE jak powinna wyglądać nowa wersja (kompletny tekst, nie placeholder)
8. **impact** - Oczekiwany wpływ na ranking i konwersję (z % szacunkami jeśli możliwe)
9. **difficultyScore** - 1-5 (1=łatwa edycja tekstu, 5=wymaga pracy developera)
10. **estimatedTimeMinutes** - Jak długo zajmie implementacja

---

## Obszary priorytetowe (kolejność)

1. ✅ **Format answer-first** w EmotionalHero.subtitle (jeśli brakuje/niekompletny) - ale tylko JEDEN paragraph, nie cała strona
2. ✅ **Konkretne liczby/koszty** - dodaj gdzie mają sens (koszt usługi, czas realizacji), ale NIE w każdym zdaniu
3. ✅ **Pokrycie FAQ** zapytań PAA (jeśli brakuje pytań)
4. ✅ **Brakujące sekcje** (jeśli faktycznie brakują)
5. ✅ **Spójność narracji** - czy wszystkie sekcje razem tworzą logiczną całość?

**PRZYKŁAD DOBREJ ANALIZY:**
- EmotionalHero.subtitle → Dodaj answer-first (1 paragraph)
- PhilosophyTimeline.items[0] → Status: "Dobrze" (jest konkretna, spójna)
- PhilosophyTimeline.items[1] → Dodaj przykład dowodu społecznego
- FAQ → Dodaj 5 brakujących pytań PAA
- CooperationTimeline → Status: "Dobrze" (jasny proces, konkretne kroki)

**NIE rób tak:**
❌ Przepisz całą stronę
❌ Dodaj liczby do każdego zdania
❌ Wszystkie sekcje oznacz jako problem

---

## Format wyjściowy (JSON)

Wyprodukuj TYLKO poprawny JSON w tym formacie:

```json
{{
  "recommendations": [
    {{
      "section": "emotionalHero.subtitle",
      "status": "Krytyczny Problem",
      "priority": "P0",
      "currentContent": "DOKŁADNY CYTAT aktualnego tekstu z tej sekcji (np. 'Projektujemy i budujemy domy na terenie Małopolski')",
      "problem": "Opis problemu z tym tekstem (PO POLSKU)",
      "recommendation": "Co zmienić i dlaczego (PO POLSKU)",
      "example": "KOMPLETNY NOWY TEKST TUTAJ - pełne zdania, nie placeholder (PO POLSKU)",
      "impact": {{
        "ranking": "+20-30% szansa na AI Overview",
        "conversion": "+10-15%"
      }},
      "difficultyScore": 2,
      "estimatedTimeMinutes": 15
    }},
    {{
      "section": "philosophyTimeline.items[1]",
      "status": "Dobrze",
      "priority": "P2",
      "currentContent": "Nasz zespół projektowy pracuje ramię w ramię z kierownikami budowy...",
      "problem": null,
      "recommendation": "Sekcja jest spójna z intencją Commercial Investigation. Dobrze opisuje wartość współpracy. Można zostawić bez zmian.",
      "example": null,
      "impact": null,
      "difficultyScore": 0,
      "estimatedTimeMinutes": 0
    }}
  ],
  "summary": {{
    "totalIssues": 12,
    "byPriority": {{"P0": 2, "P1": 5, "P2": 5}},
    "overallScore": 68,
    "interpretation": "Wymaga Znacznej Poprawy"
  }},
  "quickWins": [
    {{
      "action": "Przepisz EmotionalHero.subtitle na answer-first",
      "impact": "WYSOKIE",
      "effort": "NISKIE (15 min)",
      "expectedGain": "+20-30% szansa na AI Overview"
    }}
  ],
  "nextSteps": [
    "1. [P0, 15 min] Przepisz EmotionalHero.subtitle",
    "2. [P0, 2h] Dodaj CooperationTimeline",
    "3. [P1, 90 min] Rozbuduj FAQ"
  ]
}}
```

**KRYTYCZNE WYMAGANIA:**
1. **currentContent** - ZAWSZE cytuj DOKŁADNY fragment aktualnego tekstu (nie "brakuje", nie "tekst jest słaby", ale DOKŁADNY CYTAT)
2. **example** - Dostarcz PEŁNY PRZEPISANY ARTYKUŁ:
   - Dla EmotionalHero.subtitle → cały paragraph 250-350 znaków
   - Dla PhilosophyTimeline.items[X] → cały tytuł + pełny opis (150-200 znaków)
   - Dla FAQ → pełne pytanie + pełna odpowiedź (200-300 znaków)
   - Dla CooperationTimeline.steps[X] → cały tytuł + pełna treść z listami
   - **Format markdown:** Użyj **nagłówków**, **bold**, list punktowanych
   - **NIE używaj:** "...", "[dodaj tutaj]", "[przykład]" - tylko KOMPLETNE teksty!

3. **Konkretność** - Zamiast "dodaj koszty", napisz dokładny tekst z rzeczywistymi liczbami (np. "10 000 - 15 000 zł")
4. **TOP 10-15** - Skup się na najbardziej wpływowych problemach
5. **Sortowanie** - P0 pierwsze, potem P1, potem P2
6. **JĘZYK POLSKI** - WSZYSTKO po polsku: currentContent, problem, recommendation, example

**PRZYKŁAD DOBREGO currentContent:**
✅ "Projektujemy i budujemy domy na terenie Małopolski od 15 lat."
❌ "Brakuje answer-first format"
❌ "Tekst jest zbyt ogólny"

**PRZYKŁAD DOBREGO example (dla EmotionalHero.subtitle):**
✅ "**Kompleksowa budowa domu** to usługa polegająca na realizacji całego procesu – od fundamentów po odbiór końcowy. **Koszt:** 2 500 - 3 500 zł/m² (w zależności od standardu). **Czas:** 8-12 miesięcy dla domu 150m². **Wartość:** Jeden wykonawca = zero konfliktów, pełna odpowiedzialność, stała cena."

❌ "Dodaj definicję, koszt, czas i wartość w formacie answer-first..."
❌ "Kompleksowa budowa to... [dodaj koszty] ... [dodaj czas]..."

Wygeneruj JSON teraz. **Pamiętaj: CYTUJ aktualny tekst + PEŁNE przepisane artykuły w example!**"""

    def _parse_gemini_response(self, response_text: str) -> Dict:
        """Parse Gemini's JSON response"""
        import re

        # Extract JSON from response (may have markdown code blocks)
        json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)

        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = response_text

        try:
            result = json.loads(json_str)
            return result

        except json.JSONDecodeError as e:
            print(f"⚠️  Failed to parse Gemini response as JSON: {str(e)}")
            print(f"Response preview: {response_text[:500]}")
            return self._fallback_recommendations()

    def _fallback_recommendations(self) -> Dict:
        """Fallback recommendations when Gemini API fails"""
        recommendations = []

        # Basic recommendations from analysis results
        geo_issues = self.analysis_results.get('geo', {}).get('issues', [])
        content_issues = self.analysis_results.get('contentDepth', {}).get('issues', [])
        structure_issues = self.analysis_results.get('structure', {}).get('issues', [])

        # Combine top issues
        all_issues = geo_issues + content_issues + structure_issues

        for issue in all_issues[:10]:  # Top 10
            recommendations.append({
                'section': issue.get('section', 'unknown'),
                'priority': issue.get('priority', 'P2'),
                'problem': issue.get('problem', ''),
                'recommendation': issue.get('recommendation', ''),
                'example': issue.get('example', 'N/A (Gemini API niedostępne)'),
                'impact': issue.get('impact', 'Nieznany'),
                'difficultyScore': 3,
                'estimatedTimeMinutes': 30
            })

        return {
            'recommendations': recommendations,
            'summary': {
                'totalIssues': len(recommendations),
                'byPriority': {
                    'P0': len([r for r in recommendations if r['priority'] == 'P0']),
                    'P1': len([r for r in recommendations if r['priority'] == 'P1']),
                    'P2': len([r for r in recommendations if r['priority'] == 'P2'])
                },
                'overallScore': 60,
                'interpretation': 'Podstawowa analiza (Gemini API niedostępne)'
            },
            'quickWins': [],
            'nextSteps': [f"{i+1}. [{r['priority']}] {r['recommendation'][:80]}..." for i, r in enumerate(recommendations[:5])]
        }


def generate_recommendations(page_data: Dict, analysis_results: Dict) -> Dict:
    """
    Generate recommendations using Gemini 3 Pro

    Args:
        page_data: Parsed page data
        analysis_results: Results from all analyzers

    Returns:
        Recommendations with examples and impact estimates
    """
    engine = GeminiRecommendationsEngine(page_data, analysis_results)
    return engine.generate()
