"""
Structure Analyzer - Validate URL hierarchy, breadcrumbs, and internal linking
"""

from typing import Dict, List
from urllib.parse import urlparse


class StructureAnalyzer:
    """Analyze page structure and linking patterns"""

    def __init__(self, page_data: Dict, url: str):
        self.page_data = page_data
        self.url = url
        self.parsed_url = urlparse(url)
        self.path_segments = [s for s in self.parsed_url.path.split('/') if s]
        self.is_external = self._is_external_site()

    def _is_external_site(self) -> bool:
        """Check if URL is external (not CoreLTB site)"""
        hostname = self.parsed_url.hostname or ''

        # Detect CoreLTB sites more intelligently
        coreltb_indicators = [
            'coreltb',          # Any coreltb domain (coreltb.pl, coreltb-v2.pages.dev, etc.)
            'localhost',
            '127.0.0.1'
        ]

        is_coreltb = any(indicator in hostname for indicator in coreltb_indicators)

        # Also check if URL has /oferta/ structure (CoreLTB specific)
        has_oferta_structure = '/oferta/' in self.url

        # Return True if external (not CoreLTB)
        return not (is_coreltb or has_oferta_structure)

    def analyze(self) -> Dict:
        """Run all structure validations"""
        issues = []

        # 1. URL Hierarchy Validation (skip for external sites)
        if not self.is_external:
            url_issues = self._validate_url_hierarchy()
            issues.extend(url_issues)
        else:
            # For external sites, just validate basic URL format
            url_issues = self._validate_url_format()
            issues.extend(url_issues)

        # 2. Breadcrumb Validation
        breadcrumb_issues = self._validate_breadcrumbs()
        issues.extend(breadcrumb_issues)

        # 3. Internal Linking Validation (skip for external sites - CoreLTB specific)
        if not self.is_external:
            linking_issues = self._validate_internal_linking()
            issues.extend(linking_issues)

        # Calculate score
        score = self._calculate_score(issues)

        return {
            'score': score,
            'issues': issues,
            'summary': {
                'total_issues': len(issues),
                'critical': len([i for i in issues if i['severity'] == 'high']),
                'warnings': len([i for i in issues if i['severity'] == 'medium']),
                'info': len([i for i in issues if i['severity'] == 'low'])
            }
        }

    def _validate_url_hierarchy(self) -> List[Dict]:
        """Validate URL structure follows /oferta/pillar/cluster pattern"""
        issues = []

        # Check segment count
        if len(self.path_segments) < 2:
            issues.append({
                'severity': 'high',
                'type': 'url_hierarchy',
                'message': f'URL ma tylko {len(self.path_segments)} segmenty. Oczekiwano minimum 2 (/oferta/pillar)',
                'current': self.url,
                'recommendation': 'URL powinien mieć strukturę: /oferta/[pillar] lub /oferta/[pillar]/[cluster]'
            })

        # Check first segment is 'oferta'
        if self.path_segments and self.path_segments[0] != 'oferta':
            issues.append({
                'severity': 'medium',
                'type': 'url_hierarchy',
                'message': f'Pierwszy segment URL to "{self.path_segments[0]}", oczekiwano "oferta"',
                'current': self.url,
                'recommendation': 'Wszystkie strony usług powinny zaczynać się od /oferta/'
            })

        # Check for slug format (lowercase, hyphens)
        for segment in self.path_segments:
            if segment != segment.lower():
                issues.append({
                    'severity': 'low',
                    'type': 'url_format',
                    'message': f'Segment "{segment}" zawiera wielkie litery',
                    'current': self.url,
                    'recommendation': 'Używaj lowercase dla wszystkich segmentów URL'
                })

            if '_' in segment:
                issues.append({
                    'severity': 'low',
                    'type': 'url_format',
                    'message': f'Segment "{segment}" używa podkreślników zamiast myślników',
                    'current': self.url,
                    'recommendation': 'Używaj myślników (-) zamiast podkreślników (_)'
                })

        return issues

    def _validate_url_format(self) -> List[Dict]:
        """Validate basic URL format (for external sites)"""
        issues = []

        # Check for slug format (lowercase, hyphens) - universal best practice
        for segment in self.path_segments:
            if segment != segment.lower():
                issues.append({
                    'severity': 'low',
                    'type': 'url_format',
                    'message': f'Segment "{segment}" zawiera wielkie litery',
                    'current': self.url,
                    'recommendation': 'Używaj lowercase dla wszystkich segmentów URL (best practice SEO)'
                })

            if '_' in segment:
                issues.append({
                    'severity': 'low',
                    'type': 'url_format',
                    'message': f'Segment "{segment}" używa podkreślników zamiast myślników',
                    'current': self.url,
                    'recommendation': 'Używaj myślników (-) zamiast podkreślników (_) (best practice SEO)'
                })

        return issues

    def _validate_breadcrumbs(self) -> List[Dict]:
        """Validate breadcrumb navigation"""
        issues = []
        breadcrumbs = self.page_data.get('breadcrumbs', [])

        if not breadcrumbs:
            issues.append({
                'severity': 'high',
                'type': 'breadcrumbs_missing',
                'message': 'Brak breadcrumbs na stronie',
                'recommendation': 'Dodaj komponent PageHeader z breadcrumbs dla lepszej nawigacji i SEO'
            })
            return issues

        # Check if breadcrumbs match URL structure (only for CoreLTB)
        if not self.is_external:
            expected_segments = len(self.path_segments) + 1  # +1 for home

            if len(breadcrumbs) != expected_segments:
                issues.append({
                    'severity': 'medium',
                    'type': 'breadcrumbs_mismatch',
                    'message': f'Breadcrumbs ma {len(breadcrumbs)} elementów, URL ma {len(self.path_segments)} segmentów',
                    'current': [b['label'] for b in breadcrumbs],
                    'recommendation': f'Breadcrumbs powinny mieć {expected_segments} elementów (Home + {len(self.path_segments)} segmenty URL)'
                })

        # Check for aria-label
        # (This would need to be checked in HTML, parser should extract this)

        return issues

    def _validate_internal_linking(self) -> List[Dict]:
        """Validate internal linking patterns"""
        issues = []
        links = self.page_data.get('internalLinks', {})

        pillar_links = links.get('pillar', [])
        cluster_links = links.get('clusters', [])

        # Determine page type based on URL
        page_type = 'cluster' if len(self.path_segments) >= 3 else 'pillar'

        if page_type == 'cluster':
            # Cluster page should link to parent pillar
            if not pillar_links:
                issues.append({
                    'severity': 'high',
                    'type': 'internal_linking',
                    'message': 'Cluster page nie linkuje do parent pillar',
                    'recommendation': 'Dodaj link do strony filar w treści (np. w EmotionalHero lub PhilosophyTimeline)',
                    'section': 'content'
                })

            # Cluster should have 2-3 lateral links to related clusters
            if len(cluster_links) < 2:
                issues.append({
                    'severity': 'medium',
                    'type': 'internal_linking',
                    'message': f'Brak lateral linking do powiązanych klastrów (znaleziono: {len(cluster_links)})',
                    'recommendation': 'Dodaj linki do 2-3 powiązanych klastrów (np. w sekcji "Zobacz również")',
                    'section': 'related_content'
                })

        elif page_type == 'pillar':
            # Pillar should link to child clusters
            if len(cluster_links) < 3:
                issues.append({
                    'severity': 'medium',
                    'type': 'internal_linking',
                    'message': f'Pillar linkuje tylko do {len(cluster_links)} klastrów',
                    'recommendation': 'Pillar powinien linkować do wszystkich child clusters (minimum 3-5)',
                    'section': 'services_list'
                })

        return issues

    def _calculate_score(self, issues: List[Dict]) -> int:
        """Calculate structure score (0-100)"""
        # Start with perfect score
        score = 100

        # Deduct points for issues
        for issue in issues:
            if issue['severity'] == 'high':
                score -= 20
            elif issue['severity'] == 'medium':
                score -= 10
            elif issue['severity'] == 'low':
                score -= 5

        return max(0, score)


def analyze_structure(page_data: Dict, url: str) -> Dict:
    """
    Analyze page structure

    Args:
        page_data: Parsed page data from parser
        url: Original URL

    Returns:
        Analysis results with score and issues
    """
    analyzer = StructureAnalyzer(page_data, url)
    return analyzer.analyze()
