"""
HTML Parser - Extract structured data from CoreLTB pages
"""

from bs4 import BeautifulSoup
from typing import Dict, List, Optional
import re


class PageParser:
    """Parse HTML into structured data matching servicesV2.ts format"""

    def __init__(self, html: str):
        self.soup = BeautifulSoup(html, 'lxml')

    def parse(self) -> Dict:
        """Extract all sections from page"""
        return {
            'meta': self._extract_meta(),
            'h1': self._extract_h1(),
            'breadcrumbs': self._extract_breadcrumbs(),
            'emotionalHero': self._extract_emotional_hero(),
            'philosophyTimeline': self._extract_philosophy_timeline(),
            'cooperationTimeline': self._extract_cooperation_timeline(),
            'faq': self._extract_faq(),
            'testimonials': self._extract_testimonials(),
            'contactCTA': self._extract_contact_cta(),
            'internalLinks': self._extract_internal_links(),
            'schema': self._extract_schema_org(),
            'wordCount': self._count_words()
        }

    def _extract_meta(self) -> Dict:
        """Extract meta tags"""
        title = self.soup.find('title')
        description = self.soup.find('meta', attrs={'name': 'description'})

        return {
            'title': title.text.strip() if title else None,
            'description': description['content'] if description else None
        }

    def _extract_h1(self) -> Optional[str]:
        """Extract H1 heading"""
        h1 = self.soup.find('h1')
        return h1.text.strip() if h1 else None

    def _extract_breadcrumbs(self) -> List[Dict]:
        """Extract breadcrumb navigation"""
        breadcrumbs = []
        nav = self.soup.find('nav', attrs={'aria-label': 'Breadcrumb'})

        if nav:
            links = nav.find_all('a')
            for link in links:
                breadcrumbs.append({
                    'label': link.text.strip(),
                    'href': link.get('href', '')
                })

        return breadcrumbs

    def _extract_emotional_hero(self) -> Optional[Dict]:
        """Extract EmotionalHeroSection data"""
        # Look for section with specific structure
        hero = self.soup.find('section', class_=lambda x: x and 'bg-background' in x)

        if not hero:
            return None

        label = hero.find('p', class_=lambda x: x and 'text-primary' in x)
        headline = hero.find('h2')
        subtitle = hero.find('p', class_=lambda x: x and 'text-lg' in x)

        # Extract benefits (checkmarks)
        benefits = []
        benefit_items = hero.find_all('li')
        for item in benefit_items:
            benefits.append(item.text.strip())

        # Extract CTA Box
        cta_box = hero.find('div', class_=lambda x: x and 'gradient' in x)
        cta_data = None

        if cta_box:
            cta_title = cta_box.find('h3')
            cta_benefits = [li.text.strip() for li in cta_box.find_all('li')]
            cta_subtext = cta_box.find('p', class_=lambda x: x and 'text-sm' in x)

            cta_data = {
                'title': cta_title.text.strip() if cta_title else None,
                'benefits': cta_benefits,
                'subtext': cta_subtext.text.strip() if cta_subtext else None
            }

        return {
            'label': label.text.strip() if label else None,
            'headline': headline.text.strip() if headline else None,
            'subtitle': subtitle.text.strip() if subtitle else None,
            'benefits': benefits,
            'ctaBox': cta_data
        }

    def _extract_philosophy_timeline(self) -> Optional[Dict]:
        """Extract PhilosophyTimelineSection data"""
        # Look for section with NumberedListItem components
        sections = self.soup.find_all('section')

        for section in sections:
            # Check if this section has numbered items (philosophy timeline pattern)
            numbered_items = section.find_all('div', class_=lambda x: x and 'rounded-full' in x)

            if len(numbered_items) >= 3:  # Philosophy typically has 3 items
                items = []

                for item_container in section.find_all('div', recursive=False):
                    # Extract number, title, description
                    number_elem = item_container.find('div', class_=lambda x: x and 'rounded-full' in x)
                    title_elem = item_container.find('h3')
                    desc_elem = item_container.find('p', class_=lambda x: x and 'text-gray-600' in x)

                    if title_elem and desc_elem:
                        items.append({
                            'number': len(items) + 1,
                            'title': title_elem.text.strip(),
                            'description': desc_elem.text.strip()
                        })

                if items:
                    # Extract header
                    header_label = section.find('p', class_=lambda x: x and 'text-primary' in x)
                    header_title = section.find('h2')

                    return {
                        'header': {
                            'label': header_label.text.strip() if header_label else None,
                            'title': header_title.text.strip() if header_title else None
                        },
                        'items': items
                    }

        return None

    def _extract_cooperation_timeline(self) -> Optional[Dict]:
        """Extract CooperationTimelineSection data"""
        # Look for timeline navigation (8 icons)
        timeline_nav = self.soup.find('div', class_=lambda x: x and 'grid' in x and 'grid-cols-4' in x)

        if not timeline_nav:
            return None

        steps = []
        step_sections = self.soup.find_all('div', attrs={'id': lambda x: x and x.startswith('step-')})

        for step in step_sections:
            title = step.find('h3')
            content_blocks = []

            # Extract paragraphs and lists
            for elem in step.find_all(['p', 'ul']):
                if elem.name == 'p':
                    content_blocks.append({
                        'type': 'paragraph',
                        'value': elem.text.strip()
                    })
                elif elem.name == 'ul':
                    items = [li.text.strip() for li in elem.find_all('li')]
                    content_blocks.append({
                        'type': 'list',
                        'items': items
                    })

            if title:
                steps.append({
                    'title': title.text.strip(),
                    'content': content_blocks
                })

        return {
            'steps': steps
        } if steps else None

    def _extract_faq(self) -> Optional[Dict]:
        """Extract FAQ/ServicesAccordion data"""
        faq_questions = []

        # Look for accordion pattern
        accordions = self.soup.find_all('button', attrs={'aria-expanded': lambda x: x is not None})

        for accordion in accordions:
            question = accordion.find(text=True, recursive=False)

            # Find associated answer (next sibling or within parent)
            answer_container = accordion.find_next_sibling('div')

            if answer_container:
                answer = answer_container.get_text(strip=True)

                faq_questions.append({
                    'question': question.strip() if question else accordion.text.strip(),
                    'answer': answer
                })

        return {
            'questions': faq_questions,
            'count': len(faq_questions)
        } if faq_questions else None

    def _extract_testimonials(self) -> Optional[List[Dict]]:
        """Extract testimonial cards"""
        testimonials = []

        # Look for testimonial pattern (quote + author)
        testimonial_cards = self.soup.find_all('div', class_=lambda x: x and 'bg-white' in x and 'rounded-xl' in x)

        for card in testimonial_cards:
            quote_elem = card.find('p', class_=lambda x: x and 'text-lg' in x)
            author_elem = card.find('p', class_=lambda x: x and 'font-semibold' in x)

            if quote_elem and author_elem:
                testimonials.append({
                    'quote': quote_elem.text.strip(),
                    'author': author_elem.text.strip()
                })

        return testimonials if testimonials else None

    def _extract_contact_cta(self) -> Optional[Dict]:
        """Extract ContactCTASection data"""
        # Look for form section
        form = self.soup.find('form')

        if not form:
            return None

        return {
            'hasForm': True,
            'formFields': [input_elem.get('name') for input_elem in form.find_all('input')]
        }

    def _extract_internal_links(self) -> Dict:
        """Extract and categorize internal links"""
        links = {
            'pillar': [],
            'clusters': [],
            'other': []
        }

        for link in self.soup.find_all('a', href=True):
            href = link['href']

            # Skip external links
            if href.startswith('http') and 'coreltb' not in href:
                continue

            # Categorize by URL pattern
            if '/oferta/' in href:
                segments = href.split('/')
                if len(segments) == 3:  # /oferta/pillar
                    links['pillar'].append({
                        'href': href,
                        'text': link.text.strip()
                    })
                elif len(segments) == 4:  # /oferta/pillar/cluster
                    links['clusters'].append({
                        'href': href,
                        'text': link.text.strip()
                    })
            else:
                links['other'].append({
                    'href': href,
                    'text': link.text.strip()
                })

        return links

    def _extract_schema_org(self) -> Dict:
        """Extract Schema.org JSON-LD markup"""
        schemas = []

        for script in self.soup.find_all('script', type='application/ld+json'):
            try:
                import json
                schema = json.loads(script.string)
                schemas.append(schema)
            except:
                pass

        return {
            'count': len(schemas),
            'types': [s.get('@type') for s in schemas if '@type' in s],
            'schemas': schemas
        }

    def _count_words(self) -> Dict:
        """Count words in main content"""
        # Remove script, style, nav, footer
        for tag in self.soup(['script', 'style', 'nav', 'footer', 'header']):
            tag.decompose()

        text = self.soup.get_text()
        words = re.findall(r'\b\w+\b', text)

        return {
            'total': len(words),
            'status': 'good' if len(words) >= 2000 else 'needs_improvement'
        }


def parse_url_to_structured_data(html: str) -> Dict:
    """
    Main function to parse HTML into structured data

    Args:
        html: HTML string from scraped page

    Returns:
        Structured data dict matching servicesV2.ts format
    """
    parser = PageParser(html)
    return parser.parse()
