"""
Gemini Strategic Reasoning - Multi-step thinking for top-level insights
"""

from google import genai
from google.genai import types
from typing import Dict
import json
import config


class GeminiStrategicReasoning:
    """Add strategic layer using Gemini's thinking mode"""

    def __init__(self, analysis_results: Dict, recommendations: Dict):
        self.analysis_results = analysis_results
        self.recommendations = recommendations

        if config.GEMINI_API_KEY:
            self.client = genai.Client(api_key=config.GEMINI_API_KEY)
            self.model = 'gemini-3-pro-preview'
        else:
            self.client = None
            self.model = None

    def reason(self) -> Dict:
        """Generate strategic insights"""

        if not self.client:
            return self._fallback_reasoning()

        prompt = self._build_prompt()

        try:
            # Use Gemini 3 Pro Preview (dynamic thinking is automatic)
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.4,
                    response_mime_type="application/json"
                )
            )
            return self._parse_response(response.text)

        except Exception as e:
            print(f"⚠️  Gemini reasoning failed: {str(e)}")
            return self._fallback_reasoning()

    def _build_prompt(self) -> str:
        """Build prompt for Gemini thinking mode"""

        return f"""Jesteś strategicznym architektem SEO dla CoreLTB Builders.

Masz kompletne wyniki analizy z wielu modułów oraz szczegółowe rekomendacje od Gemini.

## Wyniki Analizy

```json
{json.dumps(self.analysis_results, indent=2, ensure_ascii=False)}
```

## Rekomendacje od Gemini

```json
{json.dumps(self.recommendations, indent=2, ensure_ascii=False)}
```

---

## Twoje Zadanie: Myślenie Strategiczne

Myśl krok po kroku:

1. **Jaka jest GŁÓWNA słabość tej strony?**
   - Spójrz na wszystkie wyniki (struktura, intencja, semantyka, GEO, głębokość treści)
   - Która JEDNA rzecz, jeśli zostanie naprawiona, będzie miała największy wpływ?

2. **Która rekomendacja będzie miała NAJWIĘKSZY wpływ na ranking I konwersję?**
   - Rozważ: trudność implementacji vs oczekiwany zysk
   - Priorytetyzuj quick wins (wysoki wpływ, mały wysiłek)

3. **Czy są KONFLIKTY między rekomendacjami?**
   - Np. dodanie więcej tekstu vs utrzymanie zwięzłości
   - Np. optymalizacja pod AI Overviews vs optymalizacja dla użytkowników
   - Jak rozwiązać te konflikty?

4. **Jaka jest OPTYMALNA kolejność implementacji tych zmian?**
   - Które zmiany należy wykonać najpierw?
   - Które zmiany zależą od innych?
   - Jaka jest najszybsza ścieżka do 80/100 punktów?

5. **Sprawdzenie spójności:**
   - Czy wszystkie sekcje wspierają tę samą intencję użytkownika?
   - Czy jest spójna narracja przez całą stronę?
   - Czy są sekcje, które wydają się nie na miejscu?

---

## Format Wyjściowy (JSON)

**WAŻNE: WSZYSTKIE odpowiedzi w JSON muszą być PO POLSKU!**

```json
{{
  "primaryWeakness": "Jedno zdanie identyfikujące NAJWIĘKSZY problem (PO POLSKU)",
  "topPriorities": [
    {{
      "priority": 1,
      "action": "Konkretna akcja do wykonania (PO POLSKU)",
      "reasoning": "Dlaczego to jest priorytet #1 (PO POLSKU)",
      "impact": "WYSOKIE/ŚREDNIE/NISKIE",
      "estimatedGain": "Konkretny % lub poprawa metryki (PO POLSKU)"
    }}
  ],
  "quickWins": [
    {{
      "action": "Szybka akcja (< 30 min) (PO POLSKU)",
      "impact": "Oczekiwana poprawa (PO POLSKU)",
      "effort": "Szacowany czas (PO POLSKU)"
    }}
  ],
  "conflicts": [
    {{
      "conflict": "Opis konfliktujących rekomendacji (PO POLSKU)",
      "resolution": "Jak to rozwiązać (PO POLSKU)"
    }}
  ],
  "implementationSequence": [
    "Krok 1: ... (PO POLSKU)",
    "Krok 2: ... (PO POLSKU)",
    "Krok 3: ... (PO POLSKU)"
  ],
  "coherenceCheck": {{
    "status": "Dobrze/Wymaga Pracy/Krytyczne",
    "issues": ["Lista problemów ze spójnością (PO POLSKU)"],
    "note": "Ogólna ocena spójności strony (PO POLSKU)"
  }},
  "expectedOutcome": {{
    "timeframe": "X tygodni (PO POLSKU)",
    "rankingImprovement": "+X pozycji (PO POLSKU)",
    "trafficIncrease": "+X% (PO POLSKU)",
    "conversionIncrease": "+X% (PO POLSKU)"
  }}
}}
```

Myśl głęboko i dostarcz strategiczne wskazówki. **Wyprodukuj TYLKO JSON, wszystkie teksty PO POLSKU.**"""

    def _parse_response(self, response_text: str) -> Dict:
        """Parse Gemini's response"""
        import re

        # Extract JSON
        json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)

        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = response_text

        try:
            return json.loads(json_str)
        except json.JSONDecodeError:
            print(f"⚠️  Failed to parse Gemini response")
            return self._fallback_reasoning()

    def _fallback_reasoning(self) -> Dict:
        """Fallback when Gemini fails"""

        # Simple heuristic-based reasoning
        scores = {
            'structure': self.analysis_results.get('structure', {}).get('score', 0),
            'semantic': self.analysis_results.get('semantic', {}).get('overallScore', 0),
            'geo': self.analysis_results.get('geo', {}).get('score', 0),
            'content': self.analysis_results.get('contentDepth', {}).get('score', 0)
        }

        # Tłumaczenia modułów
        module_names = {
            'structure': 'Struktura',
            'semantic': 'Semantyka',
            'geo': 'GEO',
            'content': 'Głębokość treści'
        }

        # Find lowest score
        lowest_module = min(scores, key=scores.get)
        lowest_score = scores[lowest_module]
        module_pl = module_names.get(lowest_module, lowest_module)

        return {
            'primaryWeakness': f'{module_pl} ma tylko {lowest_score}/100 punktów - to największe wąskie gardło',
            'topPriorities': [
                {
                    'priority': 1,
                    'action': f'Napraw problemy w module {module_pl}',
                    'reasoning': f'Najniższy wynik ({lowest_score}/100) = największa szansa na poprawę',
                    'impact': 'WYSOKIE'
                }
            ],
            'quickWins': [
                'Napraw format answer-first w EmotionalHero (15 min)',
                'Dodaj markup Schema.org FAQPage (10 min)',
                'Dodaj rok 2025 do tytułu i H1 (5 min)'
            ],
            'conflicts': [],
            'implementationSequence': [
                'Krok 1: Napraw krytyczne problemy P0',
                'Krok 2: Dodaj brakujące sekcje',
                'Krok 3: Dopracuj treść konkretnymi przykładami'
            ],
            'coherenceCheck': {
                'status': 'Nieznany',
                'issues': [],
                'note': 'Gemini API niedostępne dla głębokiej analizy'
            },
            'expectedOutcome': {
                'timeframe': '4-6 tygodni',
                'rankingImprovement': 'Nieznany',
                'trafficIncrease': 'Nieznany',
                'conversionIncrease': 'Nieznany'
            }
        }


def generate_strategic_insights(analysis_results: Dict, recommendations: Dict) -> Dict:
    """
    Generate strategic insights using Gemini

    Args:
        analysis_results: Results from all analyzers
        recommendations: Recommendations from Claude

    Returns:
        Strategic insights and priorities
    """
    reasoner = GeminiStrategicReasoning(analysis_results, recommendations)
    return reasoner.reason()
