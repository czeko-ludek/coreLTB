"""
Web Scraper - Fetch HTML from URLs using Playwright
"""

from playwright.sync_api import sync_playwright
from typing import Optional
import config
import sys
import asyncio

# WYMUSZENIE TRYBU PROACTOR DLA WINDOWS
if sys.platform == 'win32':
    asyncio.set_event_loop_policy(asyncio.WindowsProactorEventLoopPolicy())


def scrape_url(url: str) -> Optional[str]:
    """
    Scrape HTML content from URL using Playwright

    Args:
        url: Target URL to scrape

    Returns:
        HTML string or None if failed
    """
    try:
        with sync_playwright() as p:
            browser = p.chromium.launch(
                headless=config.SCRAPER_CONFIG['headless']
            )

            page = browser.new_page(
                viewport=config.SCRAPER_CONFIG['viewport']
            )

            # Navigate to URL with timeout
            page.goto(url, timeout=config.SCRAPER_CONFIG['timeout'])

            # Wait for page to be fully loaded
            page.wait_for_load_state('networkidle')

            # Get HTML content
            html = page.content()

            browser.close()

            return html

    except Exception as e:
        print(f"❌ Scraping failed: {str(e)}")
        return None


def scrape_local_file(file_path: str) -> Optional[str]:
    """
    Read HTML from local file

    Args:
        file_path: Path to HTML file

    Returns:
        HTML string or None if failed
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"❌ Failed to read file: {str(e)}")
        return None
