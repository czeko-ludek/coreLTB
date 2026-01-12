"""
Data Normalizer - Normalize local parser output to match web scraper format
"""

from typing import Dict, Any


def normalize_page_data(page_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Normalize page data from local parser to match expected format.

    Local parser returns different formats than web scraper:
    - wordCount: int → should be dict with 'total'
    - testimonials: dict with 'count' → should be list of objects
    - sectionWordCounts: dict → should be nested in wordCount

    Args:
        page_data: Raw page data from local parser

    Returns:
        Normalized page data compatible with all analyzers
    """
    normalized = page_data.copy()

    # 1. Normalize wordCount
    word_count = page_data.get('wordCount', 0)
    if isinstance(word_count, int):
        # Convert int to dict format
        section_counts = page_data.get('sectionWordCounts', {})
        normalized['wordCount'] = {
            'total': word_count,
            'emotionalHero': section_counts.get('emotionalHero', 0),
            'philosophyTimeline': section_counts.get('philosophyTimeline', 0),
            'cooperationTimeline': section_counts.get('cooperationTimeline', 0),
            'servicesAccordion': section_counts.get('servicesAccordion', 0),
        }

    # 2. Normalize testimonials
    testimonials = page_data.get('testimonials')
    if testimonials and isinstance(testimonials, dict):
        # Convert dict with 'count' to list of placeholder objects
        count = testimonials.get('count', 0)
        header = testimonials.get('header', {})

        # Create placeholder testimonial objects (we don't have full data from local parser)
        normalized['testimonials'] = [
            {
                'quote': f'[Testimonial {i+1} - parsed from servicesV2.ts]',
                'author': {
                    'name': f'Client {i+1}',
                    'role': 'Customer'
                },
                'rating': 5
            }
            for i in range(count)
        ]

        # Keep header separately for access
        normalized['testimonialsHeader'] = header

    # 3. Normalize philosophyTimeline items
    philosophy = page_data.get('philosophyTimeline')
    if philosophy and isinstance(philosophy, dict):
        items = philosophy.get('items', [])
        # Ensure items have all expected fields
        normalized_items = []
        for item in items:
            if isinstance(item, dict):
                normalized_items.append({
                    'title': item.get('title', ''),
                    'description': item.get('description', ''),
                    'number': item.get('number', 0),
                    'icon': item.get('icon', 'check')
                })

        if normalized_items:
            philosophy['items'] = normalized_items
            normalized['philosophyTimeline'] = philosophy

    # 4. Normalize cooperationTimeline steps
    timeline = page_data.get('cooperationTimeline')
    if timeline and isinstance(timeline, dict):
        steps = timeline.get('steps', [])
        # Ensure steps have content field as string (not just ContentBlock objects)
        normalized_steps = []
        for step in steps:
            if isinstance(step, dict):
                content = step.get('content', '')
                # If content is list, join it
                if isinstance(content, list):
                    content = '\n'.join(str(c) for c in content)

                normalized_steps.append({
                    'title': step.get('title', ''),
                    'content': content,
                    'number': step.get('number', 0),
                    'icon': step.get('icon', 'check')
                })

        if normalized_steps:
            timeline['steps'] = normalized_steps
            normalized['cooperationTimeline'] = timeline

    # 5. Normalize servicesAccordion
    accordion = page_data.get('servicesAccordion')
    if accordion and isinstance(accordion, dict):
        services = accordion.get('services', [])
        # Ensure services have content as string
        normalized_services = []
        for service in services:
            if isinstance(service, dict):
                content = service.get('content', '')
                if isinstance(content, list):
                    content = '\n'.join(str(c) for c in content)

                normalized_services.append({
                    'title': service.get('title', ''),
                    'content': content,
                    'icon': service.get('icon', 'info')
                })

        if normalized_services:
            accordion['services'] = normalized_services
            normalized['servicesAccordion'] = accordion

    # 6. Create 'faq' alias for servicesAccordion (analyzers look for 'faq')
    # Convert servicesAccordion.services to faq.questions format
    if normalized.get('servicesAccordion'):
        accordion_data = normalized['servicesAccordion']
        services = accordion_data.get('services', [])

        # Map services to FAQ questions format
        questions = []
        for service in services:
            questions.append({
                'question': service.get('title', ''),
                'answer': service.get('content', '')
            })

        normalized['faq'] = {
            'questions': questions,
            'count': len(questions),
            'header': accordion_data.get('header', {})
        }
    else:
        normalized['faq'] = None

    # 7. Ensure breadcrumbs are available
    page_header = normalized.get('pageHeader', {})
    if isinstance(page_header, dict):
        breadcrumbs = page_header.get('breadcrumbs', [])
        normalized['breadcrumbs'] = breadcrumbs
    else:
        normalized['breadcrumbs'] = []

    return normalized
