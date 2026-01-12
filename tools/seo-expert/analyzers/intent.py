"""
Intent Classifier - Automatically detect user intent using Gemini
"""

from google import genai
from google.genai import types
import os
from typing import Dict, List, Optional, Any
import config

class IntentClassifier:
    """Classify page intent using Gemini AI"""

    def __init__(self, page_data: Dict):
        self.page_data = page_data

        # Configure Gemini 3 Pro Preview
        if config.GEMINI_API_KEY:
            self.client = genai.Client(api_key=config.GEMINI_API_KEY)
            self.model = 'gemini-3-pro-preview'
        else:
            self.client = None
            self.model = None

    def classify(self) -> Dict:
        """Classify intent using Gemini"""

        if not self.client:
            return self._fallback_classification()

        # Build prompt for Gemini
        prompt = self._build_prompt()

        try:
            # Use Gemini 3 Pro Preview (dynamic thinking is automatic)
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
                config=types.GenerateContentConfig(
                    temperature=0.3,
                    response_mime_type="application/json"
                )
            )
            return self._parse_gemini_response(response.text)

        except Exception as e:
            print(f"⚠️  Gemini classification failed: {str(e)}")
            return self._fallback_classification()

    def _build_prompt(self) -> str:
        """Build prompt for Gemini"""
        h1 = self.page_data.get('h1', '')
        meta_desc = self.page_data.get('meta', {}).get('description', '')
        hero = self.page_data.get('emotionalHero', {})
        headline = hero.get('headline', '') if hero else ''
        subtitle = hero.get('subtitle', '') if hero else ''

        # Get first 500 words of content
        content_preview = f"{headline} {subtitle}"[:500]

        return f"""Analyze this page and classify the PRIMARY user intent.

**Page Title (H1):** {h1}

**Meta Description:** {meta_desc}

**First Content:** {content_preview}

**Intent Types (from CoreLTB strategia-seo.md):**

1. **Commercial Investigation** (5-15% conversion)
   - User wants to buy a specific service but needs detailed information first
   - Examples: "badania geologiczne gruntu cena", "nadzór budowlany koszt"
   - Page should answer: What is it? How much? How long? Why us?
   - Format: Answer-first (definition + cost + time + unique value)

2. **TOFU** (1-3% conversion)
   - Broad discovery, user exploring options
   - Examples: "oferta budowlana", "usługi budowlane małopolska"
   - Page should show: Portfolio of services, trust building

3. **MOFU** (3-7% conversion)
   - Comparing options, narrowing choices
   - Examples: "kompleksowa budowa domu vs architekt + wykonawca"
   - Page should show: Benefits comparison, process explanation

4. **BOFU** (10-20% conversion)
   - Ready to contact/buy
   - Examples: "firma budowlana kraków kontakt"
   - Page should have: Prominent CTA, contact form, phone number

**Your Task:**
Classify the intent as ONE of the above types.

**Output Format (JSON):**
```json
{{
  "primaryIntent": "commercial_investigation",
  "confidence": 85,
  "reasoning": "Title mentions specific service 'badania geologiczne' and first paragraph uses answer-first format (definition + cost), which is typical of Commercial Investigation queries.",
  "expectedConversion": "5-15%",
  "signals": [
    "Specific service name in H1",
    "Answer-first format in subtitle",
    "Cost mentioned early"
  ]
}}
```

Analyze and respond with JSON only."""

    def _parse_gemini_response(self, response_text: str) -> Dict:
        """Parse Gemini's JSON response"""
        import json
        import re

        # Extract JSON from response (may have markdown code blocks)
        json_match = re.search(r'```json\s*(.*?)\s*```', response_text, re.DOTALL)

        if json_match:
            json_str = json_match.group(1)
        else:
            json_str = response_text

        try:
            result = json.loads(json_str)

            # Add recommendations based on intent
            result['recommendations'] = self._generate_recommendations(result['primaryIntent'])

            return result

        except json.JSONDecodeError:
            print(f"⚠️  Failed to parse Gemini response as JSON")
            return self._fallback_classification()

    def _generate_recommendations(self, intent: str) -> List[Dict]:
        """Generate recommendations based on detected intent"""
        recommendations = []

        if intent == 'commercial_investigation':
            recommendations.append({
                'type': 'structure',
                'message': 'Intent poprawnie zidentyfikowany jako Commercial Investigation',
                'suggestion': 'Upewnij się że EmotionalHero.subtitle ma answer-first format (definicja + koszt + czas + wartość)'
            })

            # Check if answer-first format is present
            hero = self.page_data.get('emotionalHero', {})
            subtitle = hero.get('subtitle', '') if hero else ''

            if len(subtitle) < 200:
                recommendations.append({
                    'type': 'content',
                    'priority': 'P0',
                    'message': 'EmotionalHero.subtitle za krótki dla Commercial Investigation intent',
                    'suggestion': 'Rozbuduj subtitle do 250-350 znaków z answer-first format: Definicja + Koszt + Czas + Unikalna wartość firmy'
                })

        elif intent == 'tofu':
            recommendations.append({
                'type': 'structure',
                'message': 'TOFU intent - strona discovery',
                'suggestion': 'Dodaj PhilosophyTimeline z 3 filarami zaufania + CtaSection na końcu'
            })

        elif intent == 'bofu':
            recommendations.append({
                'type': 'cta',
                'message': 'BOFU intent - użytkownik gotowy do kontaktu',
                'suggestion': 'Prominent CTA above the fold + phone number + contact form'
            })

        return recommendations

    def _fallback_classification(self) -> Dict:
        """Fallback classification based on simple rules"""
        h1 = self.page_data.get('h1', '').lower()

        # Simple keyword matching
        if any(word in h1 for word in ['cena', 'koszt', 'ile kosztuje']):
            return {
                'primaryIntent': 'commercial_investigation',
                'confidence': 60,
                'reasoning': 'H1 contains price-related keywords (fallback method)',
                'expectedConversion': '5-15%',
                'recommendations': []
            }

        elif any(word in h1 for word in ['oferta', 'usługi']):
            return {
                'primaryIntent': 'tofu',
                'confidence': 50,
                'reasoning': 'H1 contains broad service keywords (fallback method)',
                'expectedConversion': '1-3%',
                'recommendations': []
            }

        else:
            return {
                'primaryIntent': 'commercial_investigation',
                'confidence': 40,
                'reasoning': 'Default classification (Gemini API not available)',
                'expectedConversion': '5-15%',
                'recommendations': []
            }


def classify_intent(page_data: Dict) -> Dict:
    """
    Classify page intent using Gemini

    Args:
        page_data: Parsed page data

    Returns:
        Intent classification with confidence and recommendations
    """
    classifier = IntentClassifier(page_data)
    return classifier.classify()
