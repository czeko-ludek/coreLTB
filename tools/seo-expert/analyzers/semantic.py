"""
Semantic Validator - Check content coherence using embeddings
"""

from typing import Dict, List
from utils.embeddings import EmbeddingGenerator, calculate_section_similarities
import config


class SemanticValidator:
    """Validate semantic coherence of page sections"""

    def __init__(self, page_data: Dict):
        self.page_data = page_data
        self.generator = EmbeddingGenerator()

    def validate(self) -> Dict:
        """Run semantic validation"""

        # Extract target keyword from H1
        target_keyword = self._extract_target_keyword()

        if not target_keyword:
            return self._no_keyword_fallback()

        # Prepare sections for analysis
        sections = self._prepare_sections()

        # Calculate similarities
        similarities = calculate_section_similarities(
            target_keyword,
            sections,
            self.generator
        )

        # Calculate overall score
        overall_score = self._calculate_overall_score(similarities)

        # Generate recommendations
        recommendations = self._generate_recommendations(similarities, target_keyword)

        return {
            'targetKeyword': target_keyword,
            'overallScore': overall_score,
            'interpretation': self._interpret_overall_score(overall_score),
            'sectionScores': similarities,
            'recommendations': recommendations,
            'summary': {
                'total_sections': len(similarities),
                'on_target': len([s for s in similarities.values() if s['interpretation']['status'] == 'on_target']),
                'minor_deviation': len([s for s in similarities.values() if s['interpretation']['status'] == 'minor_deviation']),
                'off_topic': len([s for s in similarities.values() if s['interpretation']['status'] == 'off_topic'])
            }
        }

    def _extract_target_keyword(self) -> str:
        """Extract target keyword from H1 or meta title"""
        h1 = self.page_data.get('h1', '')
        meta_title = self.page_data.get('meta', {}).get('title', '')

        # Prefer H1, fallback to meta title
        keyword = h1 if h1 else meta_title

        # Clean up (remove brand name, etc.)
        keyword = keyword.replace('| CoreLTB Builders', '').strip()
        keyword = keyword.replace('CoreLTB Builders', '').strip()

        return keyword

    def _prepare_sections(self) -> Dict[str, str]:
        """Extract text from all sections"""
        sections = {}

        # Check if this is an external site (competitor)
        is_external = self.page_data.get('source') == 'external'

        if is_external:
            # For external sites, use semanticContent (holistic extraction)
            semantic = self.page_data.get('semanticContent', {})

            # Extract semantic sections (heading + content)
            for i, section in enumerate(semantic.get('sections', [])):
                heading = section.get('heading', '')
                content = section.get('content', '')
                sections[f'section.{i+1}'] = f"{heading} {content}"

            # Extract lists (features, benefits)
            for i, list_item in enumerate(semantic.get('lists', [])):
                context = list_item.get('context', '')
                items = ' '.join(list_item.get('items', []))
                sections[f'list.{i+1}'] = f"{context} {items}"

            # Extract FAQs
            for i, faq in enumerate(semantic.get('faqs', [])):
                question = faq.get('question', '')
                answer = faq.get('answer', '')
                sections[f'faq.{i+1}'] = f"{question} {answer}"

        else:
            # For CoreLTB sites, use structured components (old logic)

            # EmotionalHero
            hero = self.page_data.get('emotionalHero')
            if hero:
                sections['emotionalHero.headline'] = hero.get('headline', '')
                sections['emotionalHero.subtitle'] = hero.get('subtitle', '')

            # PhilosophyTimeline
            philosophy = self.page_data.get('philosophyTimeline')
            if philosophy and philosophy.get('items'):
                for i, item in enumerate(philosophy['items']):
                    sections[f'philosophyTimeline.item{i+1}'] = f"{item.get('title', '')} {item.get('description', '')}"

            # CooperationTimeline
            coop = self.page_data.get('cooperationTimeline')
            if coop and coop.get('steps'):
                for i, step in enumerate(coop['steps']):
                    # Combine all content blocks
                    text_parts = []
                    for block in step.get('content', []):
                        if block['type'] == 'paragraph':
                            text_parts.append(block['value'])
                        elif block['type'] == 'list':
                            text_parts.extend(block['items'])

                    sections[f'cooperationTimeline.step{i+1}'] = ' '.join(text_parts)

            # FAQ
            faq = self.page_data.get('faq')
            if faq and faq.get('questions'):
                for i, q in enumerate(faq['questions'][:5]):  # First 5 questions
                    sections[f'faq.question{i+1}'] = f"{q['question']} {q['answer']}"

        return sections

    def _calculate_overall_score(self, similarities: Dict) -> float:
        """Calculate weighted overall score"""
        if not similarities:
            return 0.0

        # Weights for different sections (based on importance)
        weights = {
            'emotionalHero.headline': 3.0,     # Most important
            'emotionalHero.subtitle': 2.5,     # Very important
            'philosophyTimeline': 1.5,         # Important
            'cooperationTimeline': 1.0,        # Supporting
            'faq': 1.2                          # Important for long-tail
        }

        weighted_sum = 0.0
        total_weight = 0.0

        for section_name, data in similarities.items():
            # Find matching weight
            weight = 1.0  # Default
            for key, w in weights.items():
                if section_name.startswith(key):
                    weight = w
                    break

            weighted_sum += data['similarity'] * weight
            total_weight += weight

        return round(weighted_sum / total_weight, 3) if total_weight > 0 else 0.0

    def _interpret_overall_score(self, score: float) -> Dict:
        """Interpret overall semantic score"""
        thresholds = config.SEMANTIC_THRESHOLDS

        if score >= thresholds['on_target']:
            return {
                'status': 'excellent',
                'message': 'Treść ma doskonałą spójność tematyczną',
                'color': 'green'
            }
        elif score >= thresholds['minor_deviation']:
            return {
                'status': 'good',
                'message': 'Treść jest spójna, możliwe drobne poprawki',
                'color': 'yellow'
            }
        elif score >= thresholds['off_topic']:
            return {
                'status': 'needs_improvement',
                'message': 'Treść odchodzi od tematu głównego',
                'color': 'orange'
            }
        else:
            return {
                'status': 'critical',
                'message': 'Treść nie jest spójna tematycznie',
                'color': 'red'
            }

    def _generate_recommendations(self, similarities: Dict, target_keyword: str) -> List[Dict]:
        """Generate recommendations for low-scoring sections"""
        recommendations = []

        for section_name, data in similarities.items():
            similarity = data['similarity']
            interpretation = data['interpretation']

            # Flag sections below threshold
            if similarity < config.SEMANTIC_THRESHOLDS['minor_deviation']:
                recommendations.append({
                    'section': section_name,
                    'priority': 'P1' if similarity < config.SEMANTIC_THRESHOLDS['off_topic'] else 'P2',
                    'current': data['text'],
                    'similarity': similarity,
                    'status': interpretation['status'],
                    'problem': f'Sekcja odchodzi od głównego tematu "{target_keyword}" (similarity: {similarity:.2f})',
                    'recommendation': self._get_section_recommendation(section_name, target_keyword, similarity)
                })

        # Sort by priority and similarity (lowest first)
        recommendations.sort(key=lambda x: (x['priority'], x['similarity']))

        return recommendations

    def _get_section_recommendation(self, section_name: str, target_keyword: str, similarity: float) -> str:
        """Get specific recommendation for section"""

        if 'emotionalHero.subtitle' in section_name:
            return f'EmotionalHero.subtitle powinien bezpośrednio odnosić się do "{target_keyword}". Upewnij się że używasz tego terminu w pierwszych 2-3 zdaniach i wyjaśniasz czym jest ta usługa.'

        elif 'philosophyTimeline' in section_name:
            return f'Ten punkt PhilosophyTimeline nie łączy się z tematem "{target_keyword}". Dodaj konkretny przykład związany z tą usługą (np. liczby, koszty, case study).'

        elif 'cooperationTimeline' in section_name:
            return f'Ten krok procesu jest zbyt ogólny. Dodaj konkretne detale specyficzne dla "{target_keyword}" (co dokładnie robimy, jakie narzędzia, ile czasu).'

        elif 'faq' in section_name:
            return f'To pytanie nie dotyczy bezpośrednio "{target_keyword}". Zmień pytanie lub odpowiedź, aby skupić się na tej konkretnej usłudze.'

        else:
            return f'Dodaj więcej konkretnych odniesień do "{target_keyword}" w tej sekcji. Użyj synonimów i powiązanych terminów.'

    def _no_keyword_fallback(self) -> Dict:
        """Fallback when no target keyword found"""
        return {
            'targetKeyword': None,
            'overallScore': 0.0,
            'interpretation': {
                'status': 'error',
                'message': 'Nie znaleziono target keyword (H1 lub meta title)',
                'color': 'red'
            },
            'sectionScores': {},
            'recommendations': [{
                'priority': 'P0',
                'problem': 'Brak H1 lub meta title',
                'recommendation': 'Dodaj H1 z target keyword'
            }],
            'summary': {
                'total_sections': 0,
                'on_target': 0,
                'minor_deviation': 0,
                'off_topic': 0
            }
        }


def validate_semantics(page_data: Dict) -> Dict:
    """
    Validate semantic coherence

    Args:
        page_data: Parsed page data

    Returns:
        Semantic validation results
    """
    validator = SemanticValidator(page_data)
    return validator.validate()
