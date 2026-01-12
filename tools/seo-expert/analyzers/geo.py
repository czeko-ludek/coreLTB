"""
GEO Optimizer - Check optimization for Google AI Overviews
"""

from typing import Dict, List
import re


class GEOOptimizer:
    """Check GEO optimization (Generative Engine Optimization)"""

    def __init__(self, page_data: Dict):
        self.page_data = page_data

    def check(self) -> Dict:
        """Run all GEO checks"""
        issues = []

        # 1. Answer-First Format Check (CRITICAL)
        answer_first_issues = self._check_answer_first_format()
        issues.extend(answer_first_issues)

        # 2. FAQ Section Check
        faq_issues = self._check_faq_section()
        issues.extend(faq_issues)

        # 3. Schema.org Markup Check
        schema_issues = self._check_schema_markup()
        issues.extend(schema_issues)

        # 4. Structured Data Check
        structured_issues = self._check_structured_data()
        issues.extend(structured_issues)

        # Calculate score
        score = self._calculate_score(issues)

        return {
            'score': score,
            'status': self._get_status(score),
            'issues': issues,
            'summary': {
                'total_issues': len(issues),
                'critical': len([i for i in issues if i['priority'] == 'P0']),
                'important': len([i for i in issues if i['priority'] == 'P1']),
                'minor': len([i for i in issues if i['priority'] == 'P2'])
            }
        }

    def _check_answer_first_format(self) -> List[Dict]:
        """Check if EmotionalHero has answer-first format"""
        issues = []

        hero = self.page_data.get('emotionalHero')
        if not hero:
            issues.append({
                'priority': 'P0',
                'type': 'answer_first_missing',
                'section': 'emotionalHero',
                'problem': 'Brak EmotionalHeroSection na stronie',
                'recommendation': 'Dodaj EmotionalHeroSection z answer-first format w subtitle',
                'impact': 'CRITICAL - bez tego strona nie ma szans na AI Overviews'
            })
            return issues

        subtitle = hero.get('subtitle', '')

        # Check subtitle length (answer-first needs 200+ characters)
        if len(subtitle) < 200:
            issues.append({
                'priority': 'P0',
                'type': 'answer_first_too_short',
                'section': 'emotionalHero.subtitle',
                'current': subtitle,
                'problem': f'Subtitle ma tylko {len(subtitle)} znaków. Answer-first format wymaga 250-350 znaków.',
                'recommendation': 'Rozbuduj subtitle według wzorca:\n\n"[Nazwa usługi] to [definicja]. Koszt: [zakres cen]. Czas wykonania: [dni]. W CoreLTB Builders [unikalna wartość]."',
                'example': 'Badanie geologiczne gruntu to analiza próbek pobranych z odwiertów na działce, która określa rodzaj i nośność gruntu, poziom wód gruntowych oraz potencjalne zagrożenia. Koszt: 1500-3500 zł (zależnie od powierzchni i liczby odwiertów). Czas wykonania: 7-14 dni. W CoreLTB Builders dostarczamy szczegółową opinię geotechniczną z konkretnymi zaleceniami dla konstruktora – chroniąc Twoją inwestycję przed najdroższymi błędami.',
                'impact': 'HIGH - AI Overviews preferują odpowiedzi ze strukturą definicja + koszt + czas. Bez tego +20-30% szans na feature snippet przepada.'
            })

        # Check for key elements
        has_definition = self._has_definition_pattern(subtitle)
        has_cost = self._has_cost_info(subtitle)
        has_time = self._has_time_info(subtitle)

        if not has_definition:
            issues.append({
                'priority': 'P0',
                'type': 'answer_first_no_definition',
                'section': 'emotionalHero.subtitle',
                'current': subtitle,
                'problem': 'Subtitle nie zawiera definicji usługi (brak wzorca "X to...")',
                'recommendation': 'Zacznij od definicji: "[Nazwa usługi] to [wyjaśnienie czym jest]..."',
                'impact': 'HIGH - AI potrzebuje jasnej definicji do ekstrakcji'
            })

        if not has_cost:
            issues.append({
                'priority': 'P1',
                'type': 'answer_first_no_cost',
                'section': 'emotionalHero.subtitle',
                'current': subtitle,
                'problem': 'Subtitle nie zawiera informacji o cenie',
                'recommendation': 'Dodaj zakres cenowy: "Koszt: [X-Y zł] (zależnie od...)"',
                'impact': 'MEDIUM - Cena jest jednym z najczęstszych pytań w Commercial Investigation queries'
            })

        if not has_time:
            issues.append({
                'priority': 'P1',
                'type': 'answer_first_no_time',
                'section': 'emotionalHero.subtitle',
                'current': subtitle,
                'problem': 'Subtitle nie zawiera informacji o czasie realizacji',
                'recommendation': 'Dodaj czas: "Czas wykonania: [X-Y dni]"',
                'impact': 'MEDIUM - Użytkownicy chcą wiedzieć "jak długo to trwa"'
            })

        return issues

    def _check_faq_section(self) -> List[Dict]:
        """Check FAQ section completeness"""
        issues = []

        faq = self.page_data.get('faq')

        if not faq or not faq.get('questions'):
            issues.append({
                'priority': 'P1',
                'type': 'faq_missing',
                'section': 'servicesAccordion',
                'problem': 'Brak sekcji FAQ na stronie',
                'recommendation': 'Dodaj ServicesAccordionSection z minimum 10-15 pytań pokrywających "People Also Ask" queries z Google',
                'impact': 'HIGH - Featured snippets pochodzą z FAQ w 40-60% przypadków'
            })
            return issues

        question_count = faq.get('count', 0)

        if question_count < 10:
            issues.append({
                'priority': 'P1',
                'type': 'faq_insufficient',
                'section': 'servicesAccordion',
                'current': f'{question_count} pytań',
                'problem': f'FAQ ma tylko {question_count} pytań. Minimum to 10-15.',
                'recommendation': f'Dodaj jeszcze {10 - question_count} pytań pokrywających:\n- Podstawy (Czym jest...?, Czy obowiązkowe?)\n- Koszty (Ile kosztuje?, Co wpływa na cenę?)\n- Procedury (Jak długo trwa?, Co zawiera raport?)\n- Problemy (Co jeśli grunt słaby?, Czy można budować bez?)',
                'impact': 'MEDIUM - Każde pytanie to szansa na featured snippet. Więcej pytań = więcej ruchu.'
            })

        return issues

    def _check_schema_markup(self) -> List[Dict]:
        """Check Schema.org markup"""
        issues = []

        schema = self.page_data.get('schema', {})
        schema_types = schema.get('types', [])

        # Check for FAQPage schema
        if 'FAQPage' not in schema_types:
            issues.append({
                'priority': 'P1',
                'type': 'schema_faq_missing',
                'section': 'schema.org',
                'problem': 'Brak Schema.org FAQPage markup',
                'recommendation': 'Dodaj FAQPage schema dla sekcji FAQ:\n\n```json\n{\n  "@context": "https://schema.org",\n  "@type": "FAQPage",\n  "mainEntity": [...]\n}\n```',
                'impact': 'MEDIUM - Schema.org zwiększa CTR w SERP o 10-15% (rich results)'
            })

        # Check for Service schema
        if 'Service' not in schema_types:
            issues.append({
                'priority': 'P2',
                'type': 'schema_service_missing',
                'section': 'schema.org',
                'problem': 'Brak Schema.org Service markup',
                'recommendation': 'Dodaj Service schema z ceną i opisem usługi',
                'impact': 'LOW - Nice to have dla rich results'
            })

        # Check for BreadcrumbList schema
        if 'BreadcrumbList' not in schema_types:
            issues.append({
                'priority': 'P2',
                'type': 'schema_breadcrumb_missing',
                'section': 'schema.org',
                'problem': 'Brak Schema.org BreadcrumbList markup',
                'recommendation': 'Dodaj BreadcrumbList schema dla breadcrumbs navigation',
                'impact': 'LOW - Pomaga Google zrozumieć strukturę strony'
            })

        return issues

    def _check_structured_data(self) -> List[Dict]:
        """Check for structured content (lists, tables, headers)"""
        issues = []

        # Check PhilosophyTimeline for concrete numbers
        philosophy = self.page_data.get('philosophyTimeline')
        if philosophy and philosophy.get('items'):
            for i, item in enumerate(philosophy['items']):
                desc = item.get('description', '')

                # Check for numbers (costs, percentages, etc.)
                has_numbers = bool(re.search(r'\d+[\s%zł]', desc))

                if not has_numbers:
                    issues.append({
                        'priority': 'P2',
                        'type': 'structured_data_vague',
                        'section': f'philosophyTimeline.item{i+1}',
                        'current': item.get('title', ''),
                        'problem': 'Punkt nie zawiera konkretnych liczb/kosztów',
                        'recommendation': 'Dodaj konkretne dane: "Typowa oszczędność: 15-20% (75 000 zł dla domu 150m²)" zamiast "Lepsze ceny"',
                        'impact': 'LOW - Konkretne liczby budują zaufanie i ułatwiają podjęcie decyzji'
                    })

        return issues

    def _has_definition_pattern(self, text: str) -> bool:
        """Check if text has definition pattern"""
        patterns = [
            r'\w+ to ',         # "X to ..."
            r'\w+ jest ',       # "X jest ..."
            r'\w+ oznacza ',    # "X oznacza ..."
        ]
        return any(re.search(pattern, text.lower()) for pattern in patterns)

    def _has_cost_info(self, text: str) -> bool:
        """Check if text mentions cost"""
        patterns = [
            r'koszt[:\s]+\d+',
            r'cena[:\s]+\d+',
            r'\d+[\s-]+\d+\s*zł',
            r'\d+\s*zł'
        ]
        return any(re.search(pattern, text.lower()) for pattern in patterns)

    def _has_time_info(self, text: str) -> bool:
        """Check if text mentions time/duration"""
        patterns = [
            r'czas[:\s]+\d+',
            r'\d+[\s-]+\d+\s*dni',
            r'\d+\s*dni',
            r'\d+[\s-]+\d+\s*tygodni',
            r'w ciągu\s+\d+'
        ]
        return any(re.search(pattern, text.lower()) for pattern in patterns)

    def _calculate_score(self, issues: List[Dict]) -> int:
        """Calculate GEO score (0-100)"""
        score = 100

        for issue in issues:
            if issue['priority'] == 'P0':
                score -= 25  # Critical issues
            elif issue['priority'] == 'P1':
                score -= 15  # Important issues
            elif issue['priority'] == 'P2':
                score -= 5   # Minor issues

        return max(0, score)

    def _get_status(self, score: int) -> str:
        """Get status label based on score"""
        if score >= 80:
            return 'Excellent - Ready for AI Overviews'
        elif score >= 60:
            return 'Good - Minor improvements needed'
        elif score >= 40:
            return 'Needs Work - Missing key elements'
        else:
            return 'Critical - Not optimized for AI Overviews'


def check_geo_optimization(page_data: Dict) -> Dict:
    """
    Check GEO optimization

    Args:
        page_data: Parsed page data

    Returns:
        GEO optimization results
    """
    optimizer = GEOOptimizer(page_data)
    return optimizer.check()
