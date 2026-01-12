"""
Claude Recommendations Engine - Generate section-by-section actionable recommendations
"""

from anthropic import Anthropic
from typing import Dict, List
import json
import config


class ClaudeRecommendationsEngine:
    """Generate detailed recommendations using Claude"""

    def __init__(self, page_data: Dict, analysis_results: Dict):
        self.page_data = page_data
        self.analysis_results = analysis_results

        if config.ANTHROPIC_API_KEY:
            self.client = Anthropic(api_key=config.ANTHROPIC_API_KEY)
        else:
            self.client = None

    def generate(self) -> Dict:
        """Generate recommendations"""

        if not self.client:
            return self._fallback_recommendations()

        prompt = self._build_prompt()

        try:
            response = self.client.messages.create(
                model=config.CLAUDE_MODEL,
                max_tokens=8000,
                messages=[{
                    "role": "user",
                    "content": prompt
                }]
            )

            return self._parse_claude_response(response.content[0].text)

        except Exception as e:
            print(f"⚠️  Claude recommendations failed: {str(e)}")
            return self._fallback_recommendations()

    def _build_prompt(self) -> str:
        """Build prompt for Claude"""

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

        return f"""You are an expert SEO content strategist for CoreLTB Builders, a construction company in Poland.

**Context:**
- CoreLTB specializes in comprehensive home building services
- Target audience: Individual investors building their first home
- Geography: Małopolska, Śląskie, Świętokrzyskie
- SEO strategy: Topic clusters with pillar + cluster pages
- Conversion funnel: TOFU → MOFU → BOFU (Commercial Investigation intent is highest priority)

**Your Task:**
Analyze this page section-by-section and provide concrete, actionable recommendations.

---

## Page Information

**URL Type:** Cluster page (sub-service under pillar)
**H1:** {h1}
**Meta Description:** {meta_desc}
**Word Count:** {word_count}

---

## Analysis Scores

- **Structure:** {structure_score}/100
- **Intent:** {intent}
- **Semantic Coherence:** {semantic_score:.2f}
- **GEO Optimization:** {geo_score}/100
- **Content Depth:** {content_score}/100

---

## Detailed Analysis Results

```json
{json.dumps(self.analysis_results, indent=2, ensure_ascii=False)}
```

---

## Page Data (Extracted Sections)

```json
{json.dumps({
    'emotionalHero': self.page_data.get('emotionalHero'),
    'philosophyTimeline': self.page_data.get('philosophyTimeline'),
    'faq': self.page_data.get('faq'),
    'wordCounts': self.page_data.get('wordCount')
}, indent=2, ensure_ascii=False)}
```

---

## Reference Standards (from strategia-seo.md)

- **Commercial Investigation intent** converts at 5-15%
- **Answer-first format** critical for AI Overviews (definicja + koszt + czas + wartość)
- **Concrete numbers/costs** convert 2-3× better than vague claims
- **FAQ** should cover 10-15 "People Also Ask" queries
- **Word count:** Minimum 2000, target 2500-3500 for clusters
- **Internal linking:** Cluster → Pillar + 2-3 lateral clusters

---

## Your Instructions

For EACH major issue found in the analysis, provide a recommendation with:

1. **section** - Which section (e.g., "emotionalHero.subtitle", "philosophyTimeline.items[1]", "faq")
2. **status** - "Critical Issue" / "Needs Improvement" / "Good"
3. **priority** - "P0" (critical), "P1" (important), "P2" (nice to have)
4. **problem** - Specific problem description
5. **recommendation** - What to change
6. **example** - Show EXACTLY how the new version should look (complete text, not placeholder)
7. **impact** - Expected impact on ranking and conversion (with % estimates if possible)
8. **difficultyScore** - 1-5 (1=easy text edit, 5=requires dev work)
9. **estimatedTimeMinutes** - How long to implement

---

## Focus Areas (Priority Order)

1. ✅ **Answer-first format** in EmotionalHero.subtitle (if missing/incomplete)
2. ✅ **Concrete numbers/costs** in PhilosophyTimeline (not "better prices" but "save 90,000 zł")
3. ✅ **FAQ coverage** of PAA queries (15 questions minimum)
4. ✅ **Missing sections** (CooperationTimeline if cluster, Schema.org markup)
5. ✅ **Internal linking** (pillar + lateral clusters)

---

## Output Format (JSON)

Output ONLY valid JSON in this format:

```json
{{
  "recommendations": [
    {{
      "section": "emotionalHero.subtitle",
      "status": "Critical Issue",
      "priority": "P0",
      "currentContent": "...",
      "problem": "...",
      "recommendation": "...",
      "example": "COMPLETE NEW TEXT HERE (not placeholder)",
      "impact": {{
        "ranking": "+20-30% szansa na AI Overview",
        "conversion": "+10-15%"
      }},
      "difficultyScore": 2,
      "estimatedTimeMinutes": 15
    }}
  ],
  "summary": {{
    "totalIssues": 12,
    "byPriority": {{"P0": 2, "P1": 5, "P2": 5}},
    "overallScore": 68,
    "interpretation": "Needs Significant Improvement"
  }},
  "quickWins": [
    {{
      "action": "Przepisz EmotionalHero.subtitle na answer-first",
      "impact": "HIGH",
      "effort": "LOW (15 min)",
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

**IMPORTANT:**
- Provide COMPLETE text in "example" field (not "..." or "add X here")
- Be specific: Instead of "add costs", write exact text with actual numbers
- Focus on TOP 10-15 most impactful issues
- Sort recommendations by priority (P0 first)

Generate the JSON now."""

    def _parse_claude_response(self, response_text: str) -> Dict:
        """Parse Claude's JSON response"""
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
            print(f"⚠️  Failed to parse Claude response as JSON: {str(e)}")
            print(f"Response preview: {response_text[:500]}")
            return self._fallback_recommendations()

    def _fallback_recommendations(self) -> Dict:
        """Fallback recommendations when Claude API fails"""
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
                'example': issue.get('example', 'N/A (Claude API not available)'),
                'impact': issue.get('impact', 'Unknown'),
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
                'interpretation': 'Basic analysis (Claude API not available)'
            },
            'quickWins': [],
            'nextSteps': [f"{i+1}. [{r['priority']}] {r['recommendation'][:80]}..." for i, r in enumerate(recommendations[:5])]
        }


def generate_recommendations(page_data: Dict, analysis_results: Dict) -> Dict:
    """
    Generate recommendations using Claude

    Args:
        page_data: Parsed page data
        analysis_results: Results from all analyzers

    Returns:
        Recommendations with examples and impact estimates
    """
    engine = ClaudeRecommendationsEngine(page_data, analysis_results)
    return engine.generate()
