"""
CoreLTB SEO Expert - Configuration
"""

import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Keys (set in .env file)
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY')

# Model Configuration
GEMINI_MODEL = 'gemini-3-pro-preview'  # Gemini 3 with dynamic thinking
EMBEDDING_MODEL = 'text-embedding-004'

# Analysis Thresholds (from strategia-seo.md)
SEMANTIC_THRESHOLDS = {
    'on_target': 0.75,        # ≥0.75 = On Target ✅
    'minor_deviation': 0.60,  # 0.60-0.75 = Minor Deviation ⚠️
    'off_topic': 0.45         # <0.45 = Off-topic ❌
}

# Content Depth Requirements (from CLUSTER-PAGE-TEMPLATE.md)
CONTENT_REQUIREMENTS = {
    'cluster': {
        'min_words': 2000,
        'target_words': 3000,
        'min_faq_questions': 10,
        'required_sections': [
            'emotionalHero',
            'philosophyTimeline',
            'faq',
            'contactCTA'
        ]
    },
    'pillar': {
        'min_words': 1500,
        'target_words': 2000,
        'min_faq_questions': 5,
        'required_sections': [
            'emotionalHero',
            'philosophyTimeline',
            'contactCTA'
        ]
    }
}

# Intent Classification (conversion rates from strategia-seo.md)
INTENT_TYPES = {
    'commercial_investigation': {
        'conversion_rate': '5-15%',
        'description': 'User wants to buy but needs info first'
    },
    'tofu': {
        'conversion_rate': '1-3%',
        'description': 'Broad discovery'
    },
    'mofu': {
        'conversion_rate': '3-7%',
        'description': 'Comparing options'
    },
    'bofu': {
        'conversion_rate': '10-20%',
        'description': 'Ready to contact/buy'
    }
}

# Scraping Configuration
SCRAPER_CONFIG = {
    'timeout': 30000,  # 30 seconds
    'headless': True,
    'viewport': {'width': 1920, 'height': 1080}
}

# Output Configuration
OUTPUT_DIR = 'reports'
OUTPUT_FORMAT = 'json'  # 'json' or 'markdown'

# Validation
if not GEMINI_API_KEY:
    print("⚠️  WARNING: GEMINI_API_KEY not set in .env file")
