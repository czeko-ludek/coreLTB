"""
Content Extractor - Clean HTML and extract semantic content for AI analysis

For external competitor sites, we can't rely on specific CoreLTB components.
Instead, we extract ALL text content semantically and let Gemini 3 analyze it holistically.
"""

from bs4 import BeautifulSoup, NavigableString, Tag
from typing import Dict, List, Any
import re


class ContentExtractor:
    """Extract clean, semantic content from any HTML page"""

    def __init__(self, html: str):
        self.soup = BeautifulSoup(html, 'lxml')
        self._clean_html()

    def _clean_html(self):
        """Remove noise: scripts, styles, ads, social media embeds"""
        # Remove all noise tags
        noise_tags = [
            'script', 'style', 'noscript', 'iframe',
            'svg', 'path',  # Keep basic structure, remove complex graphics
        ]

        for tag_name in noise_tags:
            for tag in self.soup.find_all(tag_name):
                tag.decompose()

        # Remove common noise by class/id patterns
        noise_patterns = [
            'cookie', 'banner', 'popup', 'modal',
            'social', 'share', 'facebook', 'twitter',
            'advertisement', 'ad-', 'ads-',
            'tracking', 'analytics',
        ]

        # First collect elements to remove (don't remove during iteration!)
        elements_to_remove = []

        for element in self.soup.find_all(True):  # All tags
            if not element:  # Skip if None
                continue

            classes = element.get('class', []) if hasattr(element, 'get') else []
            elem_id = element.get('id', '') if hasattr(element, 'get') else ''

            # Check if any noise pattern matches
            should_remove = False
            for pattern in noise_patterns:
                if any(pattern in str(c).lower() for c in classes):
                    should_remove = True
                    break
                if pattern in elem_id.lower():
                    should_remove = True
                    break

            if should_remove:
                elements_to_remove.append(element)

        # Now remove collected elements
        for element in elements_to_remove:
            if element and hasattr(element, 'decompose'):
                element.decompose()

    def extract_structured_content(self) -> Dict[str, Any]:
        """
        Extract content with semantic structure preserved
        Returns clean text organized by semantic sections
        """

        # Extract metadata
        meta = self._extract_metadata()

        # Extract main headings
        h1 = self._extract_h1()
        h2s = self._extract_h2s()

        # Extract all semantic sections
        sections = self._extract_semantic_sections()

        # Extract lists (often contain key features/benefits)
        lists = self._extract_lists()

        # Extract FAQ-like patterns
        faqs = self._extract_faq_patterns()

        # Extract full body text (fallback)
        full_text = self._extract_full_text()

        # Word count
        word_count = len(full_text.split())

        return {
            'meta': meta,
            'h1': h1,
            'h2s': h2s,
            'sections': sections,
            'lists': lists,
            'faqs': faqs,
            'fullText': full_text,
            'wordCount': word_count,
        }

    def _extract_metadata(self) -> Dict[str, str]:
        """Extract meta title and description"""
        title_tag = self.soup.find('title')
        desc_tag = self.soup.find('meta', attrs={'name': 'description'})

        return {
            'title': title_tag.get_text(strip=True) if title_tag else '',
            'description': desc_tag.get('content', '') if desc_tag else '',
        }

    def _extract_h1(self) -> str:
        """Extract H1 heading"""
        h1 = self.soup.find('h1')
        return h1.get_text(strip=True) if h1 else ''

    def _extract_h2s(self) -> List[str]:
        """Extract all H2 headings (section titles)"""
        h2s = self.soup.find_all('h2')
        return [h2.get_text(strip=True) for h2 in h2s if h2.get_text(strip=True)]

    def _extract_semantic_sections(self) -> List[Dict[str, str]]:
        """
        Extract content organized by semantic sections
        Each section = heading + content below it
        """
        sections = []

        # Find all headings (h1-h4)
        headings = self.soup.find_all(['h1', 'h2', 'h3', 'h4'])

        for heading in headings:
            title = heading.get_text(strip=True)
            if not title:
                continue

            # Collect all content until next heading
            content_parts = []
            current = heading.find_next_sibling()

            while current and current.name not in ['h1', 'h2', 'h3', 'h4']:
                if isinstance(current, Tag):
                    text = current.get_text(separator=' ', strip=True)
                    if text:
                        content_parts.append(text)
                current = current.find_next_sibling()

            if content_parts:
                sections.append({
                    'heading': title,
                    'content': '\n'.join(content_parts),
                })

        return sections

    def _extract_lists(self) -> List[Dict[str, Any]]:
        """
        Extract all lists (ul, ol) - often contain key features/benefits
        """
        lists = []

        for ul in self.soup.find_all(['ul', 'ol']):
            items = []
            for li in ul.find_all('li', recursive=False):
                text = li.get_text(strip=True)
                if text:
                    items.append(text)

            if items:
                # Try to find context (heading before this list)
                context = ''
                prev = ul.find_previous(['h1', 'h2', 'h3', 'h4', 'strong', 'p'])
                if prev:
                    context = prev.get_text(strip=True)

                lists.append({
                    'context': context[:100],  # First 100 chars
                    'items': items,
                })

        return lists

    def _extract_faq_patterns(self) -> List[Dict[str, str]]:
        """
        Extract FAQ-like patterns (question + answer)
        Common patterns:
        - <dt>Question</dt><dd>Answer</dd>
        - <h3>Question?</h3><p>Answer</p>
        - <strong>Question</strong><p>Answer</p>
        """
        faqs = []

        # Pattern 1: <dt><dd> (definition lists)
        for dl in self.soup.find_all('dl'):
            dts = dl.find_all('dt')
            dds = dl.find_all('dd')

            for dt, dd in zip(dts, dds):
                question = dt.get_text(strip=True)
                answer = dd.get_text(strip=True)

                if question and answer:
                    faqs.append({
                        'question': question,
                        'answer': answer,
                    })

        # Pattern 2: H3/H4 with question mark + paragraph
        for heading in self.soup.find_all(['h3', 'h4']):
            text = heading.get_text(strip=True)

            # Check if looks like a question
            if '?' in text or any(text.lower().startswith(q) for q in ['jak', 'co', 'czy', 'dlaczego', 'kiedy', 'gdzie']):
                # Get next paragraph
                next_p = heading.find_next('p')
                if next_p:
                    answer = next_p.get_text(strip=True)
                    faqs.append({
                        'question': text,
                        'answer': answer,
                    })

        return faqs

    def _extract_full_text(self) -> str:
        """
        Extract all visible text from body
        This is the fallback - full content for Gemini analysis
        """
        body = self.soup.find('body')
        if not body:
            body = self.soup

        # Get all text
        text = body.get_text(separator=' ', strip=True)

        # Clean up whitespace
        text = re.sub(r'\s+', ' ', text)

        return text.strip()


def extract_clean_content(html: str) -> Dict[str, Any]:
    """
    Main function to extract clean content from HTML

    Args:
        html: Raw HTML string

    Returns:
        Structured content ready for Gemini analysis
    """
    print(f"[extract_clean_content] Starting... HTML length: {len(html) if html else 0}")

    try:
        extractor = ContentExtractor(html)
        print("[extract_clean_content] ContentExtractor created, calling extract_structured_content()...")

        result = extractor.extract_structured_content()
        print(f"[extract_clean_content] Success! Result type: {type(result)}")

        if isinstance(result, dict):
            print(f"[extract_clean_content] Result keys: {list(result.keys())}")
            print(f"[extract_clean_content] Word count: {result.get('wordCount', 0)}")
        else:
            print(f"[extract_clean_content] WARNING: Result is not a dict! Type: {type(result)}")

        return result

    except Exception as e:
        print(f"[extract_clean_content] ERROR: {str(e)}")
        import traceback
        print(f"[extract_clean_content] TRACEBACK: {traceback.format_exc()}")
        raise
