"""
Quick test for external site analysis (profokno.pl)
"""
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent))

from utils.scraper import scrape_url
from utils.parser import parse_url_to_structured_data
from analyzers.structure import analyze_structure

def test_external_site():
    """Test analysis of external site"""

    url = "https://profokno.pl/"

    print(f"\n{'='*80}")
    print(f"Testing External Site Analysis: {url}")
    print(f"{'='*80}\n")

    # Step 1: Scrape
    print("1. Scraping HTML...")
    html = scrape_url(url)

    if not html:
        print("   ERROR: Failed to scrape")
        return False

    print(f"   ✓ Scraped {len(html)} characters")

    # Step 2: Parse
    print("\n2. Parsing HTML...")
    page_data = parse_url_to_structured_data(html)

    print(f"   ✓ H1: {page_data.get('h1', 'N/A')}")
    print(f"   ✓ Meta Title: {page_data.get('meta', {}).get('title', 'N/A')}")
    print(f"   ✓ Word Count: {page_data.get('wordCount', {}).get('total', 0)}")

    # Step 3: Structure Analysis
    print("\n3. Running Structure Analysis...")
    structure_results = analyze_structure(page_data, url)

    print(f"   ✓ Score: {structure_results['score']}/100")
    print(f"   ✓ Total Issues: {structure_results['summary']['total_issues']}")
    print(f"   ✓ Critical: {structure_results['summary']['critical']}")
    print(f"   ✓ Warnings: {structure_results['summary']['warnings']}")

    # Show issues
    if structure_results['issues']:
        print("\n   Issues Found:")
        for issue in structure_results['issues'][:5]:  # Show first 5
            severity = issue['severity'].upper()
            message = issue['message']
            print(f"      [{severity}] {message}")

    print(f"\n{'='*80}")
    print("SUCCESS! External site analysis works correctly.")
    print(f"{'='*80}\n")

    return True

if __name__ == '__main__':
    try:
        success = test_external_site()
        sys.exit(0 if success else 1)
    except Exception as e:
        print(f"\nERROR: {str(e)}")
        import traceback
        traceback.print_exc()
        sys.exit(1)
