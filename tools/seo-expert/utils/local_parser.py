"""
Local Parser for servicesV2.ts
Parses CoreLTB project data directly from TypeScript files instead of fetching live URLs.
Understands the semantic structure of ServiceV2 interface.
"""

import os
import re
import json
from typing import Dict, List, Any, Optional
from pathlib import Path


class LocalServiceParser:
    """
    Parser for servicesV2.ts that understands CoreLTB project structure.
    Maps TypeScript data to semantic HTML structure for SEO analysis.
    """

    def __init__(self, project_root: str = None):
        """
        Initialize parser with project root path.

        Args:
            project_root: Path to the root of CoreLTB project (where /data folder is)
        """
        if project_root is None:
            # Default: go up from tools/seo-expert/utils to project root (D:\CORE LTB\elever)
            # __file__ is in: D:\CORE LTB\elever\tools\seo-expert\utils\local_parser.py
            # We need to go up 4 levels: utils -> seo-expert -> tools -> elever
            current_dir = Path(__file__).resolve().parent.parent.parent.parent
            self.project_root = current_dir
        else:
            self.project_root = Path(project_root)

        self.services_file = self.project_root / "data" / "servicesV2.ts"

        if not self.services_file.exists():
            raise FileNotFoundError(
                f"servicesV2.ts not found at: {self.services_file}\n"
                f"Project root detected: {self.project_root}\n"
                f"Expected file: {self.services_file}\n"
                f"__file__ location: {Path(__file__).resolve()}"
            )

    def list_available_services(self) -> List[Dict[str, str]]:
        """
        List all available services from servicesV2.ts with their metadata.

        Returns:
            List of dicts with: slug, title, category, type (cluster/pillar)
        """
        content = self.services_file.read_text(encoding='utf-8')

        services = []

        # Extract all service objects from allServicesV2 array
        # Pattern: slug: 'name', id: 'name', category: 'Category', title: 'Title'
        pattern = r"slug:\s*'([^']+)'.*?category:\s*'([^']+)'.*?title:\s*'([^']+)'"

        matches = re.finditer(pattern, content, re.DOTALL)

        for match in matches:
            slug = match.group(1)
            category = match.group(2)
            title = match.group(3)

            # Infer type based on category or slug
            service_type = self._infer_service_type(slug, category)

            services.append({
                'slug': slug,
                'title': title,
                'category': category,
                'type': service_type
            })

        return services

    def _infer_service_type(self, slug: str, category: str) -> str:
        """
        Infer service type (cluster/pillar/hub) from slug or category.

        Returns:
            'cluster', 'pillar', or 'hub'
        """
        # All services in servicesV2.ts are PILLAR pages (main service pages)
        # Structure:
        # - Hub: / (homepage)
        # - Pillar: /oferta/kompleksowa-budowa-domow (main service - IN servicesV2.ts)
        # - Cluster: /oferta/kompleksowa-budowa-domow/badania-geologiczne (detailed expert content - FUTURE)

        return 'pillar'

    def parse_service(self, slug: str) -> Dict[str, Any]:
        """
        Parse a specific service by slug and return structured data
        compatible with existing SEO analyzers.

        Args:
            slug: Service slug (e.g., 'kompleksowa-budowa-domow')

        Returns:
            Dict with structured page data in format expected by analyzers
        """
        content = self.services_file.read_text(encoding='utf-8')

        # Find the service object by slug
        service_pattern = rf"slug:\s*'{re.escape(slug)}'.*?(?=slug:|export const)"
        service_match = re.search(service_pattern, content, re.DOTALL)

        if not service_match:
            raise ValueError(f"Service with slug '{slug}' not found in servicesV2.ts")

        service_text = service_match.group(0)

        # Parse individual sections
        parsed_data = {
            'source': f'local:{slug}',
            'slug': slug,
            'pageType': self._infer_service_type(slug, ''),

            # Extract semantic structure
            'h1': self._extract_h1(service_text),
            'h2': self._extract_h2(service_text),
            'metaTitle': self._extract_field(service_text, 'metaTitle'),
            'metaDescription': self._extract_field(service_text, 'metaDescription'),

            # Page sections
            'pageHeader': self._parse_page_header(service_text),
            'emotionalHero': self._parse_emotional_hero(service_text),
            'philosophyTimeline': self._parse_philosophy_timeline(service_text),
            'cooperationTimeline': self._parse_cooperation_timeline(service_text),
            'servicesAccordion': self._parse_services_accordion(service_text),
            'testimonials': self._parse_testimonials(service_text),
            'contactCTA': self._parse_contact_cta(service_text),

            # Word counts
            'wordCount': self._calculate_word_count(service_text),
            'sectionWordCounts': self._calculate_section_word_counts(service_text),
        }

        return parsed_data

    def _extract_balanced_braces(self, text: str) -> Optional[str]:
        """
        Extract content within balanced braces { }
        Handles nested objects correctly.

        Args:
            text: Text starting with { or containing {

        Returns:
            Content including the outer braces, or None if not found
        """
        # Find first {
        start = text.find('{')
        if start == -1:
            return None

        # Count braces to find matching }
        count = 0
        i = start
        while i < len(text):
            if text[i] == '{':
                count += 1
            elif text[i] == '}':
                count -= 1
                if count == 0:
                    # Found matching brace
                    return text[start:i+1]
            i += 1

        return None

    def _extract_h1(self, service_text: str) -> str:
        """
        Extract H1 from PageHeader.title
        H1 is the main page title in PageHeader
        """
        match = re.search(r"pageHeader:\s*\{[^}]*title:\s*'([^']+)'", service_text, re.DOTALL)
        return match.group(1) if match else ''

    def _extract_h2(self, service_text: str) -> str:
        """
        Extract H2 from EmotionalHero.headline
        H2 is the main headline in EmotionalHeroSection
        """
        # Headline can be string or string[]
        match = re.search(r"emotionalHero:\s*\{[^}]*headline:\s*(?:'([^']+)'|\[([^\]]+)\])",
                         service_text, re.DOTALL)

        if match:
            if match.group(1):  # Single string
                return match.group(1)
            elif match.group(2):  # Array of strings
                # Extract all strings from array
                headlines = re.findall(r"'([^']+)'", match.group(2))
                return ' '.join(headlines)

        return ''

    def _extract_field(self, service_text: str, field_name: str) -> Optional[str]:
        """Extract a simple string field"""
        pattern = rf"{field_name}:\s*'([^']+)'"
        match = re.search(pattern, service_text)
        return match.group(1) if match else None

    def _extract_number(self, text: str, field_name: str) -> int:
        """Extract a number field"""
        pattern = rf"{field_name}:\s*(\d+)"
        match = re.search(pattern, text)
        return int(match.group(1)) if match else 0

    def _parse_page_header(self, service_text: str) -> Dict[str, Any]:
        """Parse PageHeader section"""
        # Match pageHeader with nested breadcrumbs array
        header_match = re.search(r"pageHeader:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}emotionalHero:)",
                                service_text, re.DOTALL)

        if not header_match:
            return {}

        header_text = header_match.group(1)

        # Parse breadcrumbs array
        breadcrumbs = []
        breadcrumbs_match = re.search(r"breadcrumbs:\s*\[(.*?)\]", header_text, re.DOTALL)
        if breadcrumbs_match:
            breadcrumbs_text = breadcrumbs_match.group(1)
            # Extract each breadcrumb object { label: '...', href: '...' }
            breadcrumb_pattern = r"\{\s*label:\s*'([^']+)',\s*href:\s*'([^']+)'\s*\}"
            for match in re.finditer(breadcrumb_pattern, breadcrumbs_text):
                breadcrumbs.append({
                    'label': match.group(1),
                    'href': match.group(2)
                })

        return {
            'title': self._extract_field(header_text, 'title') or '',
            'watermarkText': self._extract_field(header_text, 'watermarkText') or '',
            'backgroundImage': self._extract_field(header_text, 'backgroundImage') or '',
            'breadcrumbs': breadcrumbs,
        }

    def _parse_emotional_hero(self, service_text: str) -> Dict[str, Any]:
        """Parse EmotionalHero section"""
        hero_match = re.search(r"emotionalHero:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}\w+Timeline:)",
                              service_text, re.DOTALL)

        if not hero_match:
            return {}

        hero_text = hero_match.group(1)

        return {
            'label': self._extract_field(hero_text, 'label') or '',
            'headline': self._extract_h2(service_text),  # Use H2 extraction method
            'subtitle': self._extract_long_text(hero_text, 'subtitle'),
            'benefits': self._extract_array(hero_text, 'benefits'),
            'ctaBoxTitle': self._extract_field(hero_text, 'ctaBoxTitle') or '',
            'ctaBoxBenefits': self._extract_array(hero_text, 'ctaBoxBenefits'),
        }

    def _parse_philosophy_timeline(self, service_text: str) -> Dict[str, Any]:
        """Parse PhilosophyTimeline section"""
        timeline_match = re.search(
            r"philosophyTimeline:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}\w+Timeline:|\n\s{2}testimonials:)",
            service_text, re.DOTALL
        )

        if not timeline_match:
            return {}

        timeline_text = timeline_match.group(1)

        # Extract header using balanced braces
        header = {}
        header_match = re.search(r"header:\s*", timeline_text)
        if header_match:
            header_start = timeline_text.find('{', header_match.end())
            if header_start != -1:
                header_content = self._extract_balanced_braces(timeline_text[header_start:])
                if header_content:
                    header = {
                        'label': self._extract_field(header_content, 'label') or '',
                        'title': self._extract_field(header_content, 'title') or '',
                        'description': self._extract_long_text(header_content, 'description'),
                    }

        # Extract items (3 philosophy points) using balanced braces
        items = []
        items_match = re.search(r"items:\s*\[", timeline_text)
        if items_match:
            items_start = items_match.end()
            items_end = timeline_text.find(']', items_start)
            if items_end != -1:
                items_text = timeline_text[items_start:items_end]

                # Find each item object using balanced braces
                i = 0
                while i < len(items_text):
                    if items_text[i] == '{':
                        item_content = self._extract_balanced_braces(items_text[i:])
                        if item_content:
                            items.append({
                                'title': self._extract_field(item_content, 'title') or '',
                                'description': self._extract_long_text(item_content, 'description'),
                                'number': self._extract_number(item_content, 'number') if 'number' in item_content else 0,
                                'icon': self._extract_field(item_content, 'icon') or 'check',
                            })
                            i += len(item_content)
                        else:
                            i += 1
                    else:
                        i += 1

        return {
            'header': header,
            'items': items,
        }

    def _parse_cooperation_timeline(self, service_text: str) -> Dict[str, Any]:
        """Parse CooperationTimeline section (7-8 steps) - uses balanced brace extraction"""
        timeline_match = re.search(
            r"cooperationTimeline(?:NoLine)?:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}\w+:|\n\s{2}testimonials:)",
            service_text, re.DOTALL
        )

        if not timeline_match:
            return {}

        timeline_text = timeline_match.group(1)

        # Extract header using balanced braces
        header = {}
        header_match = re.search(r"header:\s*", timeline_text)
        if header_match:
            header_start = timeline_text.find('{', header_match.end())
            if header_start != -1:
                header_content = self._extract_balanced_braces(timeline_text[header_start:])
                if header_content:
                    header = {
                        'label': self._extract_field(header_content, 'label') or '',
                        'title': self._extract_field(header_content, 'title') or '',
                        'description': self._extract_long_text(header_content, 'description'),
                    }

        # Extract steps using balanced braces
        steps = []
        steps_match = re.search(r"steps:\s*\[", timeline_text)
        if steps_match:
            steps_start = steps_match.end()
            steps_end = timeline_text.find(']', steps_start)
            if steps_end != -1:
                steps_text = timeline_text[steps_start:steps_end]

                # Iterate through steps array, extracting each complete object
                i = 0
                while i < len(steps_text):
                    if steps_text[i] == '{':
                        step_content = self._extract_balanced_braces(steps_text[i:])
                        if step_content:
                            # Extract content blocks (paragraphs and lists)
                            content_text = self._extract_content_blocks(step_content)

                            steps.append({
                                'id': self._extract_field(step_content, 'id') or '',
                                'number': self._extract_number(step_content, 'number') if 'number' in step_content else 0,
                                'icon': self._extract_field(step_content, 'icon') or 'check',
                                'label': self._extract_field(step_content, 'label') or '',
                                'title': self._extract_field(step_content, 'title') or '',
                                'content': content_text,
                                'imageSrc': self._extract_field(step_content, 'imageSrc') or '',
                                'imageAlt': self._extract_field(step_content, 'imageAlt') or '',
                            })
                            i += len(step_content)
                        else:
                            i += 1
                    else:
                        i += 1

        return {
            'header': header,
            'steps': steps,
        }

    def _parse_services_accordion(self, service_text: str) -> Dict[str, Any]:
        """Parse ServicesAccordion section (FAQ) - uses balanced brace extraction"""
        accordion_match = re.search(
            r"servicesAccordion:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}testimonials:)",
            service_text, re.DOTALL
        )

        if not accordion_match:
            return {}

        accordion_text = accordion_match.group(1)

        # Extract header using balanced braces
        header = {}
        header_match = re.search(r"header:\s*", accordion_text)
        if header_match:
            header_start = accordion_text.find('{', header_match.end())
            if header_start != -1:
                header_content = self._extract_balanced_braces(accordion_text[header_start:])
                if header_content:
                    header = {
                        'label': self._extract_field(header_content, 'label') or '',
                        'title': self._extract_field(header_content, 'title') or '',
                        'description': self._extract_long_text(header_content, 'description'),
                    }

        # Extract services (accordion items) using balanced braces
        services = []
        services_match = re.search(r"services:\s*\[", accordion_text)
        if services_match:
            services_start = services_match.end()
            services_end = accordion_text.find(']', services_start)
            if services_end != -1:
                services_text = accordion_text[services_start:services_end]

                # Iterate through services array, extracting each complete object
                i = 0
                while i < len(services_text):
                    if services_text[i] == '{':
                        item_content = self._extract_balanced_braces(services_text[i:])
                        if item_content:
                            # Extract content blocks
                            content_text = self._extract_content_blocks(item_content)

                            services.append({
                                'iconName': self._extract_field(item_content, 'iconName') or '',
                                'title': self._extract_field(item_content, 'title') or '',
                                'content': content_text,
                            })
                            i += len(item_content)
                        else:
                            i += 1
                    else:
                        i += 1

        return {
            'header': header,
            'services': services,
        }

    def _parse_testimonials(self, service_text: str) -> Dict[str, Any]:
        """Parse Testimonials section"""
        testimonials_match = re.search(
            r"testimonials:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}contactCTA:)",
            service_text, re.DOTALL
        )

        if not testimonials_match:
            return {}

        testimonials_text = testimonials_match.group(1)

        # Extract header
        header_match = re.search(r"header:\s*\{([^}]+)\}", testimonials_text, re.DOTALL)
        header = {}
        if header_match:
            header_text = header_match.group(1)
            header = {
                'label': self._extract_field(header_text, 'label') or '',
                'title': self._extract_field(header_text, 'title') or '',
            }

        # Count testimonials
        testimonials_array = re.search(r"testimonials:\s*\[(.*?)\]", testimonials_text, re.DOTALL)
        testimonial_count = 0
        if testimonials_array:
            # Count number of testimonial objects
            testimonial_count = len(re.findall(r"\{[^}]+\}", testimonials_array.group(1)))

        return {
            'header': header,
            'count': testimonial_count,
        }

    def _parse_contact_cta(self, service_text: str) -> Dict[str, Any]:
        """Parse ContactCTA section"""
        cta_match = re.search(
            r"contactCTA:\s*\{(.*?)(?=\n\s{2}//|\n\s{2}metaTitle:|\n\s*\},)",
            service_text, re.DOTALL
        )

        if not cta_match:
            return {}

        cta_text = cta_match.group(1)

        # Extract header
        header_match = re.search(r"header:\s*\{([^}]+)\}", cta_text, re.DOTALL)
        header = {}
        if header_match:
            header_text = header_match.group(1)
            header = {
                'label': self._extract_field(header_text, 'label') or '',
                'title': self._extract_field(header_text, 'title') or '',
            }

        return {
            'header': header,
        }

    def _extract_long_text(self, text: str, field_name: str) -> str:
        """Extract multi-line string field"""
        pattern = rf"{field_name}:\s*'([^']+)'|{field_name}:\s*\"([^\"]+)\""
        match = re.search(pattern, text, re.DOTALL)
        if match:
            return match.group(1) or match.group(2) or ''
        return ''

    def _extract_array(self, text: str, field_name: str) -> List[str]:
        """Extract array of strings"""
        pattern = rf"{field_name}:\s*\[(.*?)\]"
        match = re.search(pattern, text, re.DOTALL)
        if match:
            array_text = match.group(1)
            # Extract all strings
            strings = re.findall(r"'([^']+)'", array_text)
            return strings
        return []

    def _extract_content_blocks(self, text: str) -> str:
        """
        Extract content from ContentBlock[] format.
        Converts to plain text for word counting and analysis.
        """
        content_match = re.search(r"content:\s*\[(.*?)\](?=\s*,\s*\w+:|\s*\})", text, re.DOTALL)

        if not content_match:
            return ''

        content_text = content_match.group(1)

        # Extract paragraphs and lists
        paragraphs = []

        # Extract paragraph blocks: { type: 'paragraph', value: '...' }
        para_pattern = r"type:\s*'paragraph'.*?value:\s*'([^']+)'"
        for para_match in re.finditer(para_pattern, content_text, re.DOTALL):
            paragraphs.append(para_match.group(1))

        # Extract list blocks: { type: 'list', items: [...] }
        list_pattern = r"type:\s*'list'.*?items:\s*\[(.*?)\]"
        for list_match in re.finditer(list_pattern, content_text, re.DOTALL):
            items_text = list_match.group(1)
            items = re.findall(r"'([^']+)'", items_text)
            paragraphs.extend(items)

        return '\n'.join(paragraphs)

    def _calculate_word_count(self, service_text: str) -> int:
        """Calculate total word count of all text content"""
        # Remove code syntax (brackets, colons, etc.)
        text_only = re.sub(r'[{}[\]:,]', ' ', service_text)
        text_only = re.sub(r'\b(label|title|description|headline|subtitle|content|value|items)\b', '', text_only)

        # Extract only text within quotes
        texts = re.findall(r"'([^']+)'", service_text)
        full_text = ' '.join(texts)

        # Count words
        words = full_text.split()
        return len(words)

    def _calculate_section_word_counts(self, service_text: str) -> Dict[str, int]:
        """Calculate word count per section"""
        sections = {
            'emotionalHero': 0,
            'philosophyTimeline': 0,
            'cooperationTimeline': 0,
            'servicesAccordion': 0,
        }

        # Extract each section and count words
        for section_name in sections.keys():
            pattern = rf"{section_name}:\s*\{{(.*?)(?=\n\s{{2}}\w+:|\n\s*\}},)"
            match = re.search(pattern, service_text, re.DOTALL)
            if match:
                section_text = match.group(1)
                texts = re.findall(r"'([^']+)'", section_text)
                full_text = ' '.join(texts)
                sections[section_name] = len(full_text.split())

        return sections


# Convenience function for quick access
def parse_local_service(slug: str, project_root: str = None) -> Dict[str, Any]:
    """
    Parse a service from servicesV2.ts by slug.

    Args:
        slug: Service slug (e.g., 'kompleksowa-budowa-domow')
        project_root: Optional project root path

    Returns:
        Structured page data compatible with SEO analyzers
    """
    parser = LocalServiceParser(project_root)
    return parser.parse_service(slug)


def list_local_services(project_root: str = None) -> List[Dict[str, str]]:
    """
    List all available services from servicesV2.ts.

    Args:
        project_root: Optional project root path

    Returns:
        List of services with metadata
    """
    parser = LocalServiceParser(project_root)
    return parser.list_available_services()
