"""
Quick test script for local development
Tests parser and analyzers without API calls
"""

from utils.parser import parse_url_to_structured_data
from analyzers.structure import analyze_structure
import json

# Sample HTML (minimal example)
SAMPLE_HTML = """
<!DOCTYPE html>
<html>
<head>
    <title>Badania Geologiczne Gruntu | CoreLTB Builders</title>
    <meta name="description" content="Profesjonalne badania geologiczne dla Twojej budowy">
</head>
<body>
    <nav aria-label="Breadcrumb">
        <a href="/">Strona Główna</a>
        <a href="/oferta">Oferta</a>
        <a href="/oferta/uslugi-techniczne">Usługi Techniczne</a>
        <span aria-current="page">Badania Geologiczne</span>
    </nav>

    <h1>Badania Geologiczne Gruntu</h1>

    <section class="bg-background">
        <p class="text-primary uppercase tracking-wide">BADANIA GEOLOGICZNE GRUNTU</p>
        <h2>Uniknij Pękających Ścian i Zalanej Piwnicy</h2>
        <p class="text-lg">Profesjonalne badania geologiczne dla Twojej budowy</p>

        <ul>
            <li>500+ zrealizowanych badań</li>
            <li>Szczegółowa opinia geotechniczna</li>
            <li>7-14 dni wykonania</li>
        </ul>
    </section>
</body>
</html>
"""

def test_parser():
    """Test HTML parser"""
    print("🧪 Testing Parser...\n")

    page_data = parse_url_to_structured_data(SAMPLE_HTML)

    print("✅ Extracted Data:")
    print(f"   H1: {page_data['h1']}")
    print(f"   Meta Title: {page_data['meta']['title']}")
    print(f"   Breadcrumbs: {len(page_data['breadcrumbs'])} items")
    print(f"   Word Count: {page_data['wordCount']['total']}")
    print()

    return page_data


def test_structure_analyzer(page_data):
    """Test Structure Analyzer"""
    print("🧪 Testing Structure Analyzer...\n")

    url = "https://coreltb.pl/oferta/uslugi-techniczne/badania-geologiczne-gruntu"
    results = analyze_structure(page_data, url)

    print(f"✅ Structure Score: {results['score']}/100")
    print(f"   Total Issues: {results['summary']['total_issues']}")
    print(f"   Critical: {results['summary']['critical']}")
    print(f"   Warnings: {results['summary']['warnings']}")
    print()

    if results['issues']:
        print("⚠️  Issues Found:")
        for issue in results['issues'][:3]:
            print(f"   [{issue['severity'].upper()}] {issue['message']}")
        print()

    return results


if __name__ == '__main__':
    print("\n" + "="*80)
    print("CoreLTB SEO Expert - Local Test")
    print("="*80 + "\n")

    # Test parser
    page_data = test_parser()

    # Test structure analyzer
    structure_results = test_structure_analyzer(page_data)

    # Save results
    with open('test_results.json', 'w', encoding='utf-8') as f:
        json.dump({
            'pageData': page_data,
            'structureAnalysis': structure_results
        }, f, indent=2, ensure_ascii=False)

    print("✅ Test results saved to: test_results.json")
    print()
