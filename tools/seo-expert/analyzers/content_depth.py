"""
Content Depth Analyzer - Check completeness vs CLUSTER-PAGE-TEMPLATE.md
"""

from typing import Dict, List
import config


class ContentDepthAnalyzer:
    """Analyze content depth and completeness"""

    def __init__(self, page_data: Dict, page_type: str = 'cluster'):
        self.page_data = page_data
        self.page_type = page_type  # 'cluster' or 'pillar'
        self.requirements = config.CONTENT_REQUIREMENTS.get(page_type, {})

    def analyze(self) -> Dict:
        """Run all content depth checks"""

        word_counts = self._analyze_word_counts()
        missing_elements = self._check_missing_elements()
        vague_content = self._check_vague_content()

        issues = []
        issues.extend(missing_elements)
        issues.extend(vague_content)

        # Word count check
        total_words = word_counts['total']
        min_words = self.requirements.get('min_words', 2000)

        if total_words < min_words:
            issues.append({
                'priority': 'P0',
                'type': 'word_count_low',
                'section': 'overall',
                'current': f'{total_words} słów',
                'problem': f'Strona ma tylko {total_words} słów. Minimum dla {self.page_type} to {min_words} słów.',
                'recommendation': f'Dodaj jeszcze {min_words - total_words} słów treści. Rozbuduj sekcje: PhilosophyTimeline (więcej szczegółów), FAQ (więcej pytań), CooperationTimeline (jeśli brak).',
                'impact': 'HIGH - Thin content (< 2000 słów) może być uznany za low-quality przez Google'
            })

        score = self._calculate_score(word_counts, issues)

        return {
            'score': score,
            'status': self._get_status(score),
            'wordCounts': word_counts,
            'issues': issues,
            'summary': {
                'total_issues': len(issues),
                'critical': len([i for i in issues if i['priority'] == 'P0']),
                'important': len([i for i in issues if i['priority'] == 'P1']),
                'minor': len([i for i in issues if i['priority'] == 'P2'])
            }
        }

    def _analyze_word_counts(self) -> Dict:
        """Count words in each section"""
        # Check if external site
        is_external = self.page_data.get('source') == 'external'

        if is_external:
            # For external sites, use semanticContent
            semantic = self.page_data.get('semanticContent', {})

            counts = {
                'sections': 0,
                'lists': 0,
                'faqs': 0,
                'total': self.page_data.get('wordCount', {}).get('total', 0)
            }

            # Count sections
            for section in semantic.get('sections', []):
                counts['sections'] += len(section.get('heading', '').split())
                counts['sections'] += len(section.get('content', '').split())

            # Count lists
            for list_item in semantic.get('lists', []):
                counts['lists'] += len(list_item.get('context', '').split())
                for item in list_item.get('items', []):
                    counts['lists'] += len(item.split())

            # Count FAQs
            for faq in semantic.get('faqs', []):
                counts['faqs'] += len(faq.get('question', '').split())
                counts['faqs'] += len(faq.get('answer', '').split())

            return counts

        # For CoreLTB sites, use structured components (old logic)
        # wordCount is now always normalized to dict format by data_normalizer
        counts = {
            'emotionalHero': 0,
            'philosophyTimeline': 0,
            'cooperationTimeline': 0,
            'faq': 0,
            'testimonials': 0,
            'total': self.page_data.get('wordCount', {}).get('total', 0)
        }

        # EmotionalHero
        hero = self.page_data.get('emotionalHero')
        if hero:
            counts['emotionalHero'] = sum([
                len(hero.get('headline', '').split()),
                len(hero.get('subtitle', '').split()),
                sum(len(b.split()) for b in hero.get('benefits', []))
            ])

        # PhilosophyTimeline
        philosophy = self.page_data.get('philosophyTimeline')
        if philosophy and philosophy.get('items'):
            for item in philosophy['items']:
                counts['philosophyTimeline'] += len(item.get('title', '').split())
                counts['philosophyTimeline'] += len(item.get('description', '').split())

        # CooperationTimeline
        coop = self.page_data.get('cooperationTimeline')
        if coop and coop.get('steps'):
            for step in coop['steps']:
                counts['cooperationTimeline'] += len(step.get('title', '').split())
                for block in step.get('content', []):
                    if block['type'] == 'paragraph':
                        counts['cooperationTimeline'] += len(block['value'].split())
                    elif block['type'] == 'list':
                        counts['cooperationTimeline'] += sum(len(item.split()) for item in block['items'])

        # FAQ
        faq = self.page_data.get('faq')
        if faq and faq.get('questions'):
            for q in faq['questions']:
                counts['faq'] += len(q['question'].split())
                counts['faq'] += len(q['answer'].split())

        # Testimonials (now always normalized to list format)
        testimonials = self.page_data.get('testimonials', [])
        if testimonials:
            for t in testimonials:
                counts['testimonials'] += len(t.get('quote', '').split())

        return counts

    def _check_missing_elements(self) -> List[Dict]:
        """Check for missing required sections"""
        issues = []

        required_sections = self.requirements.get('required_sections', [])

        for section in required_sections:
            if section == 'emotionalHero':
                if not self.page_data.get('emotionalHero'):
                    issues.append({
                        'priority': 'P0',
                        'type': 'section_missing',
                        'section': 'emotionalHero',
                        'problem': 'Brak EmotionalHeroSection',
                        'recommendation': 'Dodaj EmotionalHeroSection z answer-first format. Wzorzec: CLUSTER-PAGE-TEMPLATE.md linie 48-70',
                        'impact': 'CRITICAL - Hero section jest first impression i punktem wejścia dla AI Overviews'
                    })

            elif section == 'philosophyTimeline':
                if not self.page_data.get('philosophyTimeline'):
                    issues.append({
                        'priority': 'P0',
                        'type': 'section_missing',
                        'section': 'philosophyTimeline',
                        'problem': 'Brak PhilosophyTimelineSection',
                        'recommendation': 'Dodaj PhilosophyTimelineSection z 3 filarami zaufania (konkretne koszty/oszczędności). Wzorzec: CLUSTER-PAGE-TEMPLATE.md linie 72-120',
                        'impact': 'HIGH - Philosophy section buduje zaufanie przez konkretne liczby (15-20% oszczędności, 500+ projektów)'
                    })

            elif section == 'faq':
                if not self.page_data.get('faq') or self.page_data.get('faq', {}).get('count', 0) == 0:
                    issues.append({
                        'priority': 'P1',
                        'type': 'section_missing',
                        'section': 'faq',
                        'problem': 'Brak sekcji FAQ (ServicesAccordion)',
                        'recommendation': 'Dodaj ServicesAccordionSection z 15 pytań pokrywających PAA queries. Wzorzec: CLUSTER-PAGE-TEMPLATE.md linie 154-237',
                        'impact': 'HIGH - FAQ = 40-60% szans na featured snippets'
                    })

            elif section == 'contactCTA':
                if not self.page_data.get('contactCTA'):
                    issues.append({
                        'priority': 'P2',
                        'type': 'section_missing',
                        'section': 'contactCTA',
                        'problem': 'Brak ContactCTASection',
                        'recommendation': 'Dodaj ContactCTASection z formularzem kontaktowym',
                        'impact': 'MEDIUM - CTA section zwiększa konwersję'
                    })

        # Check for CooperationTimeline (recommended for clusters)
        if self.page_type == 'cluster':
            if not self.page_data.get('cooperationTimeline'):
                issues.append({
                    'priority': 'P1',
                    'type': 'section_missing',
                    'section': 'cooperationTimeline',
                    'problem': 'Brak CooperationTimelineSection',
                    'recommendation': 'Dodaj CooperationTimelineNoLine z 7 krokami procesu realizacji usługi. Wzorzec: CLUSTER-PAGE-TEMPLATE.md linie 122-152',
                    'impact': 'HIGH - Timeline pokazuje transparentny proces (zwiększa konwersję o 5-10%)'
                })

        return issues

    def _check_vague_content(self) -> List[Dict]:
        """Check for vague/marketing content without concrete details"""
        issues = []

        # Check PhilosophyTimeline for concrete numbers
        philosophy = self.page_data.get('philosophyTimeline')
        if philosophy and philosophy.get('items'):
            for i, item in enumerate(philosophy['items']):
                desc = item.get('description', '')

                # Vague phrases to flag
                vague_phrases = [
                    'lepsze ceny',
                    'konkurencyjne ceny',
                    'najwyższa jakość',
                    'profesjonalne usługi',
                    'doświadczony zespół',
                    'optymalizacja procesów'
                ]

                is_vague = any(phrase in desc.lower() for phrase in vague_phrases)

                # Check if has concrete numbers
                import re
                has_numbers = bool(re.search(r'\d+[\s%zł]', desc))

                if is_vague and not has_numbers:
                    issues.append({
                        'priority': 'P1',
                        'type': 'content_vague',
                        'section': f'philosophyTimeline.items[{i}]',
                        'current': item.get('title', ''),
                        'problem': 'Punkt używa vague marketing speak bez konkretnych liczb',
                        'recommendation': f'Zamień ogólniki na konkretne dane:\n\nZamiast: "Lepsze ceny niż konkurencja"\nUżyj: "Lepsza Cena Niż 6 Osobnych Umów\n\nTypowa oszczędność: 15-20% całkowitego budżetu budowy.\n\nPrzykład dla domu 150m²:\n• 6 separate firms: 630 000 zł\n• CoreLTB pakiet: 540 000 zł\n• Oszczędność: 90 000 zł (koszt całego tarasu 40m²)"',
                        'impact': 'MEDIUM - Konkretne liczby konwertują 2-3× lepiej niż vague claims'
                    })

        return issues

    def _calculate_score(self, word_counts: Dict, issues: List[Dict]) -> int:
        """Calculate content depth score"""
        score = 100

        # Deduct for word count
        total_words = word_counts['total']
        min_words = self.requirements.get('min_words', 2000)
        target_words = self.requirements.get('target_words', 3000)

        if total_words < min_words:
            # Severe penalty for thin content
            percentage = total_words / min_words
            score -= int((1 - percentage) * 40)  # Up to -40 points
        elif total_words < target_words:
            # Minor penalty for below target
            percentage = total_words / target_words
            score -= int((1 - percentage) * 10)  # Up to -10 points

        # Deduct for issues
        for issue in issues:
            if issue['priority'] == 'P0':
                score -= 20
            elif issue['priority'] == 'P1':
                score -= 10
            elif issue['priority'] == 'P2':
                score -= 5

        return max(0, score)

    def _get_status(self, score: int) -> str:
        """Get status label"""
        if score >= 80:
            return 'Excellent - Comprehensive content'
        elif score >= 60:
            return 'Good - Could be deeper'
        elif score >= 40:
            return 'Needs Work - Missing key sections'
        else:
            return 'Critical - Thin content'


def analyze_content_depth(page_data: Dict, page_type: str = 'cluster') -> Dict:
    """
    Analyze content depth

    Args:
        page_data: Parsed page data
        page_type: 'cluster' or 'pillar'

    Returns:
        Content depth analysis results
    """
    analyzer = ContentDepthAnalyzer(page_data, page_type)
    return analyzer.analyze()
