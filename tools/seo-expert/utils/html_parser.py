"""
HTML Parser - Extract clean content from live Next.js pages
"""

import re
import requests
from bs4 import BeautifulSoup
from typing import Dict, Any, List, Optional
from .content_extractor import extract_clean_content


class HTMLPageParser:
    """Parse live HTML pages to extract structured content"""

    def __init__(self, base_url: str = "http://localhost:3001"):
        self.base_url = base_url

    def parse_service_page(self, slug: str) -> Dict[str, Any]:
        """
        Parse a service page from live URL (CoreLTB internal)

        Args:
            slug: Service slug (e.g., 'projektowanie', 'kompleksowa-budowa-domow')

        Returns:
            Structured data matching servicesV2.ts format
        """
        url = f"{self.base_url}/oferta/{slug}"

        try:
            response = requests.get(url, timeout=10)
            response.raise_for_status()
        except Exception as e:
            raise Exception(f"Failed to fetch {url}: {str(e)}")

        soup = BeautifulSoup(response.content, 'lxml')

        # Remove Next.js noise (scripts, styles, noscript)
        for tag in soup(['script', 'style', 'noscript', 'meta', 'link']):
            tag.decompose()

        return {
            'url': url,
            'slug': slug,
            'h1': self._extract_h1(soup),
            'h2': self._extract_h2(soup),
            'meta': self._extract_meta(response.content),
            'pageHeader': self._parse_page_header(soup),
            'emotionalHero': self._parse_emotional_hero(soup),
            'philosophyTimeline': self._parse_philosophy_timeline(soup),
            'cooperationTimeline': self._parse_cooperation_timeline(soup),
            'servicesAccordion': self._parse_services_accordion(soup),
            'testimonials': self._parse_testimonials(soup),
            'wordCount': self._calculate_word_count(soup),
            'breadcrumbs': self._parse_breadcrumbs(soup),
        }

    def parse_external_page(self, url: str) -> Dict[str, Any]:
        """
        Parse an external page (competitor analysis)

        Uses Playwright to render JS and extract ALL content semantically.
        Does NOT look for specific CoreLTB components - instead extracts
        full text and structured content for Gemini 3 holistic analysis.

        Args:
            url: Full URL (e.g., 'https://profokno.pl/')

        Returns:
            Structured data for analysis (with semantic content)
        """
        print(f"[parse_external_page] Starting for URL: {url}")

        # Import Playwright scraper
        from .scraper import scrape_url

        try:
            print("[parse_external_page] Calling scrape_url() with Playwright...")
            # Use Playwright to render JS (handles hidden elements, animations)
            html = scrape_url(url)

            print(f"[parse_external_page] scrape_url() returned: {type(html)}, length={len(html) if html else 0}")

            if not html:
                raise Exception("Playwright returned empty content. Page may have failed to load or timed out.")

        except Exception as e:
            print(f"[parse_external_page] ERROR during scrape_url(): {str(e)}")
            raise Exception(f"Failed to fetch {url}: {str(e)}")

        print("[parse_external_page] Calling extract_clean_content()...")
        # Extract clean, semantic content
        try:
            content = extract_clean_content(html)
            print(f"[parse_external_page] extract_clean_content() returned: {type(content)}")
            print(f"[parse_external_page] Content keys: {list(content.keys()) if isinstance(content, dict) else 'NOT A DICT'}")
        except Exception as e:
            print(f"[parse_external_page] ERROR during extract_clean_content(): {str(e)}")
            raise Exception(f"Failed to extract content: {str(e)}")

        if not content:
            raise Exception("Failed to extract content from HTML")

        # Extract slug from URL (last segment)
        slug = url.rstrip('/').split('/')[-1] or 'home'
        print(f"[parse_external_page] Extracted slug: {slug}")

        print("[parse_external_page] Building result dict...")

        # Return format compatible with analyzer expectations
        result = {
            'url': url,
            'slug': slug,
            'source': 'external',

            # Basic metadata
            'h1': content.get('h1', ''),
            'h2': content.get('h2s', [''])[0] if content.get('h2s') else '',
            'meta': content.get('meta', {}),

            # Semantic content (for Gemini analysis)
            'semanticContent': {
                'sections': content.get('sections', []),
                'lists': content.get('lists', []),
                'faqs': content.get('faqs', []),
                'fullText': content.get('fullText', ''),
            },

            # Word count
            'wordCount': {
                'total': content.get('wordCount', 0),
            },

            # Empty CoreLTB-specific sections (will be filled by Gemini)
            'pageHeader': {},
            'emotionalHero': {},
            'philosophyTimeline': {},
            'cooperationTimeline': {},
            'servicesAccordion': {},
            'testimonials': {},
            'breadcrumbs': [],
        }

        print(f"[parse_external_page] Result dict created successfully with keys: {list(result.keys())}")
        return result

    def _extract_h1(self, soup: BeautifulSoup) -> str:
        """Extract H1 from PageHeader"""
        h1 = soup.find('h1')
        return h1.get_text(strip=True) if h1 else ''

    def _extract_h2(self, soup: BeautifulSoup) -> str:
        """Extract first H2 from EmotionalHero"""
        h2 = soup.find('h2')
        return h2.get_text(strip=True) if h2 else ''

    def _extract_meta(self, html_content: bytes) -> Dict[str, str]:
        """Extract meta tags (title, description)"""
        soup = BeautifulSoup(html_content, 'lxml')

        title_tag = soup.find('title')
        desc_tag = soup.find('meta', attrs={'name': 'description'})

        return {
            'title': title_tag.get_text(strip=True) if title_tag else '',
            'description': desc_tag.get('content', '') if desc_tag else '',
        }

    def _parse_page_header(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """
        Parse PageHeader section
        Structure: <div> with background image, H1, watermark
        """
        # H1 is in PageHeader
        h1 = soup.find('h1')

        return {
            'title': h1.get_text(strip=True) if h1 else '',
            'breadcrumbs': self._parse_breadcrumbs(soup),
        }

    def _parse_breadcrumbs(self, soup: BeautifulSoup) -> List[Dict[str, str]]:
        """
        Parse breadcrumbs navigation
        Look for: nav with breadcrumbs or links in header
        """
        breadcrumbs = []

        # Find breadcrumb container (usually <nav> or specific class)
        nav = soup.find('nav', class_=lambda x: x and 'breadcrumb' in x.lower()) if soup.find('nav') else None

        if nav:
            links = nav.find_all('a')
            for link in links:
                breadcrumbs.append({
                    'label': link.get_text(strip=True),
                    'href': link.get('href', ''),
                })

        return breadcrumbs

    def _parse_emotional_hero(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """
        Parse EmotionalHeroSection
        Contains: H2 headline, subtitle, benefits, CTA box
        """
        # Find the white card section after PageHeader
        # Usually first section with white background
        hero_section = soup.find('section', class_=lambda x: x and ('bg-white' in x or 'hero' in x.lower()))

        if not hero_section:
            return {}

        # H2 headline
        h2 = hero_section.find('h2')
        headline = h2.get_text(strip=True) if h2 else ''

        # Subtitle (usually <p> after H2)
        subtitle = ''
        if h2:
            next_p = h2.find_next('p')
            if next_p:
                subtitle = next_p.get_text(strip=True)

        # Benefits (ul li with checkmarks)
        benefits = []
        benefit_list = hero_section.find('ul')
        if benefit_list:
            for li in benefit_list.find_all('li'):
                benefits.append(li.get_text(strip=True))

        return {
            'headline': headline,
            'subtitle': subtitle,
            'benefits': benefits,
        }

    def _parse_philosophy_timeline(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """
        Parse PhilosophyTimelineSection
        Contains: Header + 3 numbered items
        """
        # Find section by looking for "DLACZEGO" or numbered items
        sections = soup.find_all('section')

        for section in sections:
            # Look for section with numbered list (1, 2, 3)
            numbers = section.find_all(text=re.compile(r'^[123]$'))
            if len(numbers) >= 3:
                return self._extract_timeline_data(section)

        return {}

    def _extract_timeline_data(self, section: BeautifulSoup) -> Dict[str, Any]:
        """Extract header + items from timeline section"""
        # Extract header
        h2 = section.find('h2')
        header = {
            'title': h2.get_text(strip=True) if h2 else '',
            'description': '',
        }

        # Find description (p after h2)
        if h2:
            desc_p = h2.find_next('p')
            if desc_p:
                header['description'] = desc_p.get_text(strip=True)

        # Extract items (look for numbered elements)
        items = []

        # Find all divs/sections with numbers
        for i in range(1, 4):
            # Look for number badge
            number_elem = section.find(text=re.compile(rf'^{i}$'))
            if number_elem:
                # Get parent container
                container = number_elem.find_parent('div', recursive=True)
                if container:
                    # Title (h3 or strong)
                    title_elem = container.find(['h3', 'strong'])
                    title = title_elem.get_text(strip=True) if title_elem else ''

                    # Description (p after title)
                    desc = ''
                    if title_elem:
                        desc_p = title_elem.find_next('p')
                        if desc_p:
                            desc = desc_p.get_text(strip=True)

                    items.append({
                        'number': i,
                        'title': title,
                        'description': desc,
                    })

        return {
            'header': header,
            'items': items,
        }

    def _parse_cooperation_timeline(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """
        Parse CooperationTimelineSection
        Contains: Header + 7-8 steps with icons, titles, content
        """
        # Find timeline section (look for vertical steps or navigation icons)
        sections = soup.find_all('section')

        for section in sections:
            # Look for timeline navigation (8 icons) or numbered steps
            nav_icons = section.find_all('button', class_=lambda x: x and 'timeline' in x.lower())

            if len(nav_icons) >= 7:
                return self._extract_cooperation_steps(section)

        return {}

    def _extract_cooperation_steps(self, section: BeautifulSoup) -> Dict[str, Any]:
        """Extract steps from cooperation timeline"""
        # Extract header
        h2 = section.find('h2')
        header = {
            'title': h2.get_text(strip=True) if h2 else '',
        }

        # Extract steps
        steps = []

        # Find all step containers (usually divs with id like 'projekt-gotowy')
        step_containers = section.find_all('div', id=True)

        for container in step_containers:
            # Title (h3)
            title_elem = container.find('h3')
            title = title_elem.get_text(strip=True) if title_elem else ''

            # Content (all paragraphs and lists)
            content_parts = []

            # Paragraphs
            for p in container.find_all('p'):
                content_parts.append(p.get_text(strip=True))

            # Lists
            for ul in container.find_all('ul'):
                for li in ul.find_all('li'):
                    content_parts.append('• ' + li.get_text(strip=True))

            if title:  # Only add if has title
                steps.append({
                    'title': title,
                    'content': '\n'.join(content_parts),
                })

        return {
            'header': header,
            'steps': steps,
        }

    def _parse_services_accordion(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """
        Parse ServicesAccordionSection (FAQ)
        Contains: Header + accordion items with questions/answers
        """
        # Find FAQ section (look for "FAQ" text or accordion pattern)
        sections = soup.find_all('section')

        for section in sections:
            # Look for accordion buttons or FAQ heading
            h2 = section.find('h2')
            if h2 and 'faq' in h2.get_text().lower():
                return self._extract_faq_data(section)

            # Or look for accordion structure (multiple buttons)
            buttons = section.find_all('button')
            if len(buttons) >= 5:  # FAQ usually has 5+ questions
                return self._extract_faq_data(section)

        return {}

    def _extract_faq_data(self, section: BeautifulSoup) -> Dict[str, Any]:
        """Extract FAQ questions and answers"""
        # Extract header
        h2 = section.find('h2')
        header = {
            'title': h2.get_text(strip=True) if h2 else 'FAQ',
        }

        # Extract questions (accordion items)
        services = []

        # Find all accordion items (button + content)
        buttons = section.find_all('button')

        for button in buttons:
            question = button.get_text(strip=True)

            # Find answer (usually in next sibling or parent container)
            answer_container = button.find_next('div', class_=lambda x: x and 'content' in x.lower())
            answer = ''

            if answer_container:
                # Get all text from answer
                paragraphs = []
                for p in answer_container.find_all(['p', 'li']):
                    paragraphs.append(p.get_text(strip=True))
                answer = '\n'.join(paragraphs)

            if question:  # Only add if has question
                services.append({
                    'title': question,
                    'content': answer,
                })

        return {
            'header': header,
            'services': services,
        }

    def _parse_testimonials(self, soup: BeautifulSoup) -> Dict[str, Any]:
        """
        Parse TestimonialsSection
        Contains: Header + testimonial cards
        """
        # Find testimonials section
        sections = soup.find_all('section')

        for section in sections:
            h2 = section.find('h2')
            if h2 and 'opini' in h2.get_text().lower():
                # Count testimonial cards
                cards = section.find_all('div', class_=lambda x: x and 'testimonial' in x.lower())

                return {
                    'count': len(cards) if cards else 0,
                    'header': {
                        'title': h2.get_text(strip=True),
                    }
                }

        return {}

    def _calculate_word_count(self, soup: BeautifulSoup) -> Dict[str, int]:
        """
        Calculate word count from clean text
        """
        # Get all text from body
        body = soup.find('body')
        if not body:
            return {'total': 0}

        # Get clean text
        text = body.get_text(separator=' ', strip=True)

        # Remove extra whitespace
        text = re.sub(r'\s+', ' ', text)

        # Count words
        words = text.split()

        return {
            'total': len(words),
        }


def parse_page_from_url(url: str) -> Dict[str, Any]:
    """
    Parse a page from URL - UNIVERSAL method for ALL sites

    Uses Playwright to render JS and extract semantic content.
    Works for CoreLTB, competitors, any site.

    Args:
        url: Full URL (e.g., 'http://localhost:3001/oferta/projektowanie' or 'https://profokno.pl/')

    Returns:
        Structured page data with semantic content
    """
    print(f"[parse_page_from_url] Starting for URL: {url}")

    # Detect if CoreLTB or external (for source labeling only)
    from urllib.parse import urlparse
    parsed = urlparse(url)
    hostname = parsed.hostname or ''

    coreltb_indicators = ['coreltb', 'localhost', '127.0.0.1']
    is_coreltb = any(indicator in hostname for indicator in coreltb_indicators) or '/oferta/' in url

    source = 'coreltb' if is_coreltb else 'external'
    print(f"[parse_page_from_url] Detected source: {source}")

    # UNIVERSAL PATH: Use parse_external_page for EVERYONE
    # (It uses Playwright + semantic extraction - works for all sites)
    parser = HTMLPageParser(base_url='')

    try:
        result = parser.parse_external_page(url)
        print(f"[parse_page_from_url] Success! Returning dict with keys: {list(result.keys())}")

        # Override source label
        result['source'] = source

        return result

    except Exception as e:
        print(f"[parse_page_from_url] ERROR: {str(e)}")
        import traceback
        print(f"[parse_page_from_url] TRACEBACK: {traceback.format_exc()}")
        raise
