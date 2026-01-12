"""
CoreLTB SEO Expert - Web Dashboard (Local Analysis)
Streamlit-based interface for analyzing pages directly from servicesV2.ts
"""

import streamlit as st
import sys
import os
import json
from datetime import datetime
from pathlib import Path

# Add parent directory to path for imports
sys.path.insert(0, str(Path(__file__).parent))

# Import local modules
from utils.local_parser import LocalServiceParser, list_local_services, parse_local_service
from utils.html_parser import HTMLPageParser, parse_page_from_url
from utils.data_normalizer import normalize_page_data
from analyzers.structure import analyze_structure
from analyzers.intent import classify_intent
from analyzers.semantic import validate_semantics
from analyzers.geo import check_geo_optimization
from analyzers.content_depth import analyze_content_depth
from engine.gemini_recommendations import generate_recommendations
from engine.gemini_reasoning import generate_strategic_insights


# Configure page
st.set_page_config(
    page_title="CoreLTB SEO Expert - Local Analysis",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS with CoreLTB branding
st.markdown("""
<style>
    /* Main Theme Colors */
    :root {
        --primary-gold: #dfbb68;
        --dark-bg: #1a1a1a;
        --light-bg: #efebe7;
        --white: #ffffff;
    }

    /* Header Styling */
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        color: var(--primary-gold);
        text-align: center;
        margin-bottom: 1rem;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
    }

    .sub-header {
        font-size: 1.2rem;
        color: #666;
        text-align: center;
        margin-bottom: 2rem;
    }

    /* Score Cards */
    .score-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transition: transform 0.2s;
    }

    .score-card:hover {
        transform: translateY(-4px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.15);
    }

    .score-value {
        font-size: 2.5rem;
        font-weight: bold;
        margin: 0.5rem 0;
    }

    .score-excellent { color: #16a34a; }  /* Ciemniejszy zielony */
    .score-good { color: #ca8a04; }       /* Ciemniejszy żółty */
    .score-critical { color: #dc2626; }   /* Ciemniejszy czerwony */

    .score-label {
        font-size: 0.9rem;
        color: #1a1a1a;
        font-weight: 600;
    }

    .score-status {
        font-size: 0.85rem;
        color: #1a1a1a;
        font-weight: 500;
    }

    /* Recommendation Boxes */
    .recommendation-box {
        border-radius: 8px;
        padding: 1rem;
        margin: 0.5rem 0;
    }

    .priority-p0 {
        background: #262730;
        border-left: 4px solid #dc2626;
    }

    .priority-p1 {
        background: #262730;
        border-left: 4px solid #ca8a04;
    }

    .priority-p2 {
        background: #262730;
        border-left: 4px solid #2563eb;
    }

    /* Problem Box (Czerwony) */
    .problem-box {
        background: #262730;
        border: 2px solid #dc2626;
        border-radius: 8px;
        padding: 1rem;
        margin: 0.5rem 0;
    }

    .problem-box strong {
        color: #991b1b;
        font-size: 0.95rem;
    }

    .problem-box code {
        background: #262730;
        color: #7f1d1d;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
        display: block;
        margin: 0.5rem 0;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    /* Solution Box (Zielony) */
    .solution-box {
        background: #262730;
        border: 2px solid #16a34a;
        border-radius: 8px;
        padding: 1rem;
        margin: 0.5rem 0;
    }

    .solution-box strong {
        color: #166534;
        font-size: 0.95rem;
    }

    .solution-box code {
        background: #262730;
        color: #14532d;
        padding: 0.2rem 0.5rem;
        border-radius: 4px;
        font-size: 0.85rem;
        display: block;
        margin: 0.5rem 0;
        white-space: pre-wrap;
        word-wrap: break-word;
    }

    /* Strategic Insights */
    .strategic-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 12px;
        padding: 1.5rem;
        margin: 1rem 0;
    }

    /* Status Messages */
    .status-success {
        color: #22c55e;
        font-weight: bold;
    }

    .status-warning {
        color: #eab308;
        font-weight: bold;
    }

    .status-error {
        color: #ef4444;
        font-weight: bold;
    }

    /* Progress Bar Custom Colors */
    .stProgress > div > div > div > div {
        background-color: var(--primary-gold);
    }

    /* Button Styling */
    .stButton > button {
        background-color: var(--primary-gold);
        color: var(--dark-bg);
        font-weight: bold;
        border-radius: 8px;
        padding: 0.75rem 2rem;
        border: none;
        transition: all 0.3s;
    }

    .stButton > button:hover {
        background-color: #c9a557;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(223, 187, 104, 0.4);
    }

    /* Sidebar Styling */
    .css-1d391kg {
        background-color: var(--light-bg);
    }

    /* Info Box */
    .info-box {
        background: #262730;
        border-left: 4px solid #3b82f6;
        border-radius: 8px;
        padding: 1rem;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)


def init_session_state():
    """Initialize session state variables"""
    if 'results' not in st.session_state:
        st.session_state.results = None
    if 'available_services' not in st.session_state:
        st.session_state.available_services = None
    if 'debug_logs' not in st.session_state:
        st.session_state.debug_logs = []
    if 'page_data' not in st.session_state:
        st.session_state.page_data = None


def load_available_services():
    """Load list of available services from servicesV2.ts"""
    try:
        services = list_local_services()
        st.session_state.available_services = services
        return services
    except Exception as e:
        st.error(f"❌ Błąd ładowania listy usług: {str(e)}")
        return []


def get_services_by_type(services, service_type):
    """Filter services by type"""
    return [s for s in services if s['type'] == service_type]


def log_debug(message: str):
    """Add message to debug logs"""
    from datetime import datetime
    timestamp = datetime.now().strftime("%H:%M:%S")
    st.session_state.debug_logs.append(f"[{timestamp}] {message}")
    # Keep only last 50 logs
    if len(st.session_state.debug_logs) > 50:
        st.session_state.debug_logs = st.session_state.debug_logs[-50:]


def run_html_analysis(url: str, page_type: str):
    """
    Run full SEO analysis on a live URL (HTML parsing)

    Args:
        url: Full URL to analyze (e.g., http://localhost:3001/oferta/projektowanie)
        page_type: Type of page (cluster/pillar/hub)

    Returns:
        Complete analysis results
    """
    progress_bar = st.progress(0)
    status_text = st.empty()

    try:
        # Clear previous debug logs
        st.session_state.debug_logs = []

        # Step 1: Fetch and parse HTML (10%)
        log_debug(f"🌐 Starting HTML analysis for: {url}")
        status_text.markdown(f"🌐 **Pobieranie HTML z {url}...**")
        progress_bar.progress(10)

        log_debug("Calling parse_page_from_url()...")
        try:
            page_data = parse_page_from_url(url)
            log_debug(f"✅ parse_page_from_url() returned data: type={type(page_data)}")
        except Exception as e:
            log_debug(f"❌ ERROR in parse_page_from_url(): {str(e)}")
            import traceback
            log_debug(f"TRACEBACK: {traceback.format_exc()}")
            st.error(f"❌ Błąd podczas pobierania strony: {str(e)}")
            return None

        if not page_data:
            log_debug("❌ ERROR: page_data is None or empty")
            st.error("❌ Nie udało się pobrać strony.")
            return None

        if not isinstance(page_data, dict):
            log_debug(f"❌ ERROR: page_data is not a dict, it's: {type(page_data)}")
            st.error(f"❌ Błąd: parse_page_from_url() zwróciło {type(page_data)} zamiast dict")
            return None

        log_debug(f"✅ page_data is dict with keys: {list(page_data.keys())}")

        word_count = page_data.get('wordCount', {})
        log_debug(f"wordCount type: {type(word_count)}, value: {word_count}")

        if isinstance(word_count, dict):
            total = word_count.get('total', 0)
        else:
            total = word_count if isinstance(word_count, int) else 0

        log_debug(f"✅ HTML parsed: {total} words")

        # Store for debug view
        st.session_state.page_data = page_data

        log_debug(f"✅ H1: {page_data.get('h1', 'N/A')}, H2: {page_data.get('h2', 'N/A')}")
        status_text.markdown(f"✅ **Dane wczytane:** {page_data.get('h1', 'N/A')}")

        # Show info about logs
        st.info("💡 **Szczegółowe logi są dostępne w panelu Debug Logs (na dole strony) oraz w konsoli terminala**")

        # Step 2: Structure Analysis (20%)
        log_debug("🏗️ Running structure analysis...")
        status_text.markdown("🏗️ **Analiza struktury strony...**")
        progress_bar.progress(20)

        structure_results = analyze_structure(page_data, url)
        log_debug(f"✅ Structure: {structure_results.get('score', 0)}/100")

        # Step 3: Intent Classification (30%)
        log_debug("🎯 Running intent classification (Gemini)...")
        status_text.markdown("🎯 **Klasyfikacja intencji (Gemini AI)...**")
        progress_bar.progress(30)

        intent_results = classify_intent(page_data)
        log_debug(f"✅ Intent: {intent_results.get('primaryIntent', 'N/A')} ({intent_results.get('confidence', 0)}%)")

        # Step 4: Semantic Validation (40%)
        log_debug("🔍 Running semantic validation (embeddings)...")
        status_text.markdown("🔍 **Walidacja semantyczna (embeddings)...**")
        progress_bar.progress(40)

        semantic_results = validate_semantics(page_data)
        log_debug(f"✅ Semantic: {semantic_results.get('overallScore', 0):.2f}")

        # Step 5: GEO Optimization (50%)
        log_debug("🌟 Running GEO optimization check...")
        status_text.markdown("🌟 **Optymalizacja GEO (AI Overviews)...**")
        progress_bar.progress(50)

        geo_results = check_geo_optimization(page_data)
        log_debug(f"✅ GEO: {geo_results.get('score', 0)}/100")

        # Step 6: Content Depth (60%)
        log_debug("📊 Running content depth analysis...")
        status_text.markdown("📊 **Analiza głębokości treści...**")
        progress_bar.progress(60)

        content_results = analyze_content_depth(page_data, page_type)
        log_debug(f"✅ Content Depth: {content_results.get('score', 0)}/100")

        # Step 7: Build analysis summary
        analysis_results = {
            'structure': structure_results,
            'intent': intent_results,
            'semantic': semantic_results,
            'geo': geo_results,
            'contentDepth': content_results
        }

        # Step 8: Gemini Recommendations (70%)
        log_debug("💡 Generating recommendations (Gemini 3 Pro)...")
        status_text.markdown("💡 **Generowanie rekomendacji (Gemini 3 Pro)...**")
        progress_bar.progress(70)

        recommendations = generate_recommendations(page_data, analysis_results)
        log_debug(f"✅ Recommendations: {len(recommendations.get('recommendations', []))} items")

        # Step 9: Gemini Strategic Insights (80%)
        log_debug("🧠 Generating strategic insights (Gemini 3 Pro)...")
        status_text.markdown("🧠 **Myślenie strategiczne (Gemini Thinking)...**")
        progress_bar.progress(80)

        strategic_insights = generate_strategic_insights(analysis_results, recommendations)
        log_debug(f"✅ Strategic insights: {len(strategic_insights.get('topPriorities', []))} priorities")

        # Step 10: Complete (100%)
        progress_bar.progress(100)
        log_debug("🎉 Analysis completed successfully!")
        status_text.markdown("✅ **Analiza zakończona!**")

        # Build final results
        word_count = page_data.get('wordCount', {})
        if isinstance(word_count, dict):
            word_count_total = word_count.get('total', 0)
        else:
            word_count_total = word_count

        slug = page_data.get('slug', url.rstrip('/').split('/')[-1])

        results = {
            'pageInfo': {
                'source': url,
                'slug': slug,
                'h1': page_data.get('h1', ''),
                'h2': page_data.get('h2', ''),
                'wordCount': word_count_total,
                'pageType': page_type
            },
            'analysis': analysis_results,
            'recommendations': recommendations,
            'strategic': strategic_insights,
        }

        return results

    except Exception as e:
        log_debug(f"❌ ERROR during HTML analysis: {str(e)}")
        st.error(f"❌ Błąd podczas analizy: {str(e)}")
        return None


def run_local_analysis(slug: str, page_type: str):
    """
    Run full SEO analysis on a local service from servicesV2.ts

    Args:
        slug: Service slug
        page_type: Type of page (cluster/pillar/hub)

    Returns:
        Complete analysis results
    """
    progress_bar = st.progress(0)
    status_text = st.empty()

    try:
        # Clear previous debug logs
        st.session_state.debug_logs = []

        # Step 1: Parse local service data (10%)
        log_debug(f"📂 Starting analysis for: {slug} (type: {page_type})")
        status_text.markdown("📂 **Wczytywanie danych z servicesV2.ts...**")
        progress_bar.progress(10)

        log_debug("Parsing local service data...")
        page_data_raw = parse_local_service(slug)

        if not page_data_raw:
            log_debug("❌ ERROR: Service not found")
            st.error("❌ Nie znaleziono danych dla wybranej usługi")
            return None

        log_debug(f"✅ Raw data parsed: {len(str(page_data_raw))} characters")

        # Normalize data to match expected format (int → dict, etc.)
        log_debug("Normalizing data format...")
        page_data = normalize_page_data(page_data_raw)
        st.session_state.page_data = page_data  # Store for debug view

        log_debug(f"✅ Data normalized. H1: {page_data.get('h1', 'N/A')}")
        status_text.markdown(f"✅ **Dane wczytane:** {page_data.get('h1', 'N/A')}")

        # Step 2: Structure Analysis (20%)
        log_debug("🏗️ Running structure analysis...")
        status_text.markdown("🏗️ **Analiza struktury strony...**")
        progress_bar.progress(20)

        # For local analysis, construct a pseudo-URL for structure validation
        local_url = f"https://coreltb.pl/oferta/{slug}"
        structure_results = analyze_structure(page_data, local_url)
        log_debug(f"✅ Structure: {structure_results.get('score', 0)}/100")

        # Step 3: Intent Classification (30%)
        log_debug("🎯 Running intent classification (Gemini)...")
        status_text.markdown("🎯 **Klasyfikacja intencji (Gemini AI)...**")
        progress_bar.progress(30)

        intent_results = classify_intent(page_data)
        log_debug(f"✅ Intent: {intent_results.get('primaryIntent', 'N/A')} ({intent_results.get('confidence', 0)}%)")

        # Step 4: Semantic Validation (40%)
        log_debug("🔍 Running semantic validation (embeddings)...")
        status_text.markdown("🔍 **Walidacja semantyczna (embeddings)...**")
        progress_bar.progress(40)

        semantic_results = validate_semantics(page_data)
        log_debug(f"✅ Semantic: {semantic_results.get('overallScore', 0):.2f}")

        # Step 5: GEO Optimization (50%)
        log_debug("🌟 Running GEO optimization check...")
        status_text.markdown("🌟 **Optymalizacja GEO (AI Overviews)...**")
        progress_bar.progress(50)

        geo_results = check_geo_optimization(page_data)
        log_debug(f"✅ GEO: {geo_results.get('score', 0)}/100")

        # Step 6: Content Depth (60%)
        log_debug("📊 Running content depth analysis...")
        status_text.markdown("📊 **Analiza głębokości treści...**")
        progress_bar.progress(60)

        content_results = analyze_content_depth(page_data, page_type)
        log_debug(f"✅ Content Depth: {content_results.get('score', 0)}/100")

        # Step 7: Build analysis summary
        analysis_results = {
            'structure': structure_results,
            'intent': intent_results,
            'semantic': semantic_results,
            'geo': geo_results,
            'contentDepth': content_results
        }

        # Step 8: Gemini Recommendations (70%)
        log_debug("💡 Generating recommendations (Gemini 3 Pro)...")
        status_text.markdown("💡 **Generowanie rekomendacji (Gemini 3 Pro)...**")
        progress_bar.progress(70)

        recommendations = generate_recommendations(page_data, analysis_results)
        log_debug(f"✅ Recommendations: {len(recommendations.get('recommendations', []))} items")

        # Step 9: Gemini Strategic Insights (80%)
        log_debug("🧠 Generating strategic insights (Gemini 3 Pro)...")
        status_text.markdown("🧠 **Myślenie strategiczne (Gemini Thinking)...**")
        progress_bar.progress(80)

        strategic_insights = generate_strategic_insights(analysis_results, recommendations)
        log_debug(f"✅ Strategic insights: {len(strategic_insights.get('topPriorities', []))} priorities")

        # Step 10: Complete (100%)
        progress_bar.progress(100)
        log_debug("🎉 Analysis completed successfully!")
        status_text.markdown("✅ **Analiza zakończona!**")

        # Build final results
        # Extract wordCount total (normalized data has dict format)
        word_count = page_data.get('wordCount', 0)
        if isinstance(word_count, dict):
            word_count_total = word_count.get('total', 0)
        else:
            word_count_total = word_count

        results = {
            'pageInfo': {
                'source': page_data.get('source', f'local:{slug}'),
                'slug': slug,
                'h1': page_data.get('h1', ''),
                'h2': page_data.get('h2', ''),
                'wordCount': word_count_total,  # Always an int
                'pageType': page_type
            },
            'analysis': analysis_results,
            'recommendations': recommendations,
            'strategicInsights': strategic_insights,
            'timestamp': datetime.now().isoformat()
        }

        return results

    except Exception as e:
        st.error(f"❌ Błąd podczas analizy: {str(e)}")
        import traceback
        st.code(traceback.format_exc())
        return None


def display_results(results):
    """Display analysis results with interactive UI"""

    # Page Information
    st.markdown("---")
    st.subheader("📄 Informacje o Stronie")

    col1, col2, col3, col4 = st.columns(4)

    page_info = results['pageInfo']

    with col1:
        st.metric("Źródło", "Local (servicesV2.ts)")
    with col2:
        st.metric("H1", page_info.get('h1', 'N/A')[:30] + "...")
    with col3:
        # wordCount can be int or dict - extract total if dict
        word_count = page_info.get('wordCount', 0)
        if isinstance(word_count, dict):
            word_count = word_count.get('total', 0)
        st.metric("Liczba słów", word_count)
    with col4:
        st.metric("Typ strony", page_info.get('pageType', 'N/A').upper())

    # Overall Scores
    st.markdown("---")
    st.subheader("📊 Wyniki Ogólne")

    analysis = results['analysis']

    col1, col2, col3, col4, col5 = st.columns(5)

    # Structure Score
    with col1:
        structure_score = analysis.get('structure', {}).get('score', 0)
        score_class = 'excellent' if structure_score >= 80 else 'good' if structure_score >= 60 else 'critical'

        st.markdown(f"""
        <div class="score-card">
            <div class="score-label">Struktura</div>
            <div class="score-value score-{score_class}">{structure_score}/100</div>
            <div class="score-status">
                {'✅ Doskonale' if structure_score >= 80 else '⚠️ Do poprawy' if structure_score >= 60 else '🔴 Krytyczne'}
            </div>
        </div>
        """, unsafe_allow_html=True)

    # Intent Classification
    with col2:
        intent_data = analysis.get('intent', {})
        intent = intent_data.get('primaryIntent', 'N/A')
        confidence = intent_data.get('confidence', 0)
        score_class = 'excellent' if confidence >= 80 else 'good' if confidence >= 60 else 'critical'

        # Tłumaczenie intencji na polski
        intent_pl = {
            'commercial_investigation': 'Badanie komercyjne',
            'tofu': 'TOFU (Odkrywanie)',
            'mofu': 'MOFU (Porównanie)',
            'bofu': 'BOFU (Decyzja)'
        }.get(intent, intent.replace('_', ' ').title())

        st.markdown(f"""
        <div class="score-card">
            <div class="score-label">Intencja</div>
            <div class="score-value score-{score_class}">{confidence}%</div>
            <div class="score-status">
                🎯 {intent_pl}
            </div>
        </div>
        """, unsafe_allow_html=True)

    # Semantic Coherence
    with col3:
        semantic_score = analysis.get('semantic', {}).get('overallScore', 0)
        score_display = f"{semantic_score:.2f}"
        status = analysis.get('semantic', {}).get('status', 'Unknown')
        score_class = 'excellent' if semantic_score >= 0.75 else 'good' if semantic_score >= 0.60 else 'critical'

        # Tłumaczenie statusu na polski
        status_pl = {
            'Excellent': 'Doskonale',
            'Good': 'Dobrze',
            'Needs Work': 'Do poprawy',
            'Critical': 'Krytyczne',
            'Unknown': 'Nieznany'
        }.get(status, status)

        st.markdown(f"""
        <div class="score-card">
            <div class="score-label">Semantyka</div>
            <div class="score-value score-{score_class}">{score_display}</div>
            <div class="score-status">
                {status_pl}
            </div>
        </div>
        """, unsafe_allow_html=True)

    # GEO Optimization
    with col4:
        geo_score = analysis.get('geo', {}).get('score', 0)
        score_class = 'excellent' if geo_score >= 80 else 'good' if geo_score >= 60 else 'critical'

        st.markdown(f"""
        <div class="score-card">
            <div class="score-label">GEO (AI Overviews)</div>
            <div class="score-value score-{score_class}">{geo_score}/100</div>
            <div class="score-status">
                {'✅ Doskonale' if geo_score >= 80 else '⚠️ Do poprawy' if geo_score >= 60 else '🔴 Krytyczne'}
            </div>
        </div>
        """, unsafe_allow_html=True)

    # Content Depth
    with col5:
        content_score = analysis.get('contentDepth', {}).get('score', 0)
        score_class = 'excellent' if content_score >= 80 else 'good' if content_score >= 60 else 'critical'

        st.markdown(f"""
        <div class="score-card">
            <div class="score-label">Głębokość Treści</div>
            <div class="score-value score-{score_class}">{content_score}/100</div>
            <div class="score-status">
                {'✅ Doskonale' if content_score >= 80 else '⚠️ Do poprawy' if content_score >= 60 else '🔴 Krytyczne'}
            </div>
        </div>
        """, unsafe_allow_html=True)

    # Strategic Insights (Gemini Thinking)
    st.markdown("---")
    st.subheader("🧠 Wnioski Strategiczne (Gemini Thinking)")

    strategic = results.get('strategicInsights', {})

    if strategic:
        # Primary Weakness
        st.markdown(f"""
        <div class="strategic-box">
            <h4>🎯 Główny Problem:</h4>
            <p style="font-size: 1.1rem;">{strategic.get('primaryWeakness', 'N/A')}</p>
        </div>
        """, unsafe_allow_html=True)

        # Top 3 Priorities
        st.markdown("### 🔥 Top 3 Priorytety:")

        priorities = strategic.get('topPriorities', [])[:3]

        for i, priority in enumerate(priorities, 1):
            impact = priority.get('impact', 'MEDIUM')
            impact_color = '#ef4444' if impact == 'HIGH' else '#eab308' if impact == 'MEDIUM-HIGH' else '#3b82f6'

            st.markdown(f"""
            <div class="recommendation-box priority-p{i-1}">
                <h4 style="margin-top: 0;">
                    <span style="color: {impact_color};">[{impact}]</span>
                    {priority.get('action', 'N/A')}
                </h4>
                <p><strong>Uzasadnienie:</strong> {priority.get('reasoning', 'N/A')}</p>
                <p><strong>Szacowany zysk:</strong> {priority.get('estimatedGain', 'N/A')}</p>
            </div>
            """, unsafe_allow_html=True)

        # Quick Wins
        st.markdown("### ⚡ Quick Wins:")

        quick_wins = strategic.get('quickWins', [])

        for win in quick_wins:
            # Handle both dict and string formats
            if isinstance(win, dict):
                action = win.get('action', 'N/A')
                effort = win.get('effort', 'N/A')
                impact = win.get('impact', 'N/A')

                st.markdown(f"""
                <div class="info-box">
                    <strong>✓</strong> {action}
                    <br><small><em>Czas: {effort} | Efekt: {impact}</em></small>
                </div>
                """, unsafe_allow_html=True)
            else:
                # Fallback for string format
                st.markdown(f"""
                <div class="info-box">
                    <strong>✓</strong> {win}
                </div>
                """, unsafe_allow_html=True)

    # Detailed Recommendations (Gemini)
    st.markdown("---")
    st.subheader("🚨 Szczegółowe Rekomendacje (Gemini 3 Pro)")

    recommendations = results.get('recommendations', {}).get('recommendations', [])

    if recommendations:
        # Priority Filter
        col1, col2 = st.columns(2)

        with col1:
            priority_filter = st.selectbox(
                "Filtruj po priorytecie:",
                ["Wszystkie", "P0", "P1", "P2"],
                key="priority_filter"
            )

        with col2:
            status_filter = st.selectbox(
                "Filtruj po statusie:",
                ["Wszystkie", "Problemy", "Pozytywne"],
                key="status_filter"
            )

        # Filter recommendations
        filtered_recs = recommendations

        if priority_filter != "Wszystkie":
            filtered_recs = [r for r in filtered_recs if r.get('priority') == priority_filter]

        if status_filter == "Problemy":
            filtered_recs = [r for r in filtered_recs if r.get('status', '').lower() not in ['dobrze', 'good', 'ok']]
        elif status_filter == "Pozytywne":
            filtered_recs = [r for r in filtered_recs if r.get('status', '').lower() in ['dobrze', 'good', 'ok']]

        # Count positive vs negative
        positive_count = sum(1 for r in recommendations if r.get('status', '').lower() in ['dobrze', 'good', 'ok'])
        negative_count = len(recommendations) - positive_count

        st.markdown(f"**Znaleziono:** {len(filtered_recs)} rekomendacji | ✅ Pozytywne: {positive_count} | 🔴 Do poprawy: {negative_count}")

        # Display recommendations
        for i, rec in enumerate(filtered_recs):
            priority = rec.get('priority', 'P2')
            section = rec.get('section', 'N/A')
            current_content = rec.get('currentContent', '')
            problem = rec.get('problem', 'N/A')
            recommendation = rec.get('recommendation', 'N/A')
            example = rec.get('example', '')

            # Auto-expand first 3 recommendations
            expanded = (i < 3)

            # Check if this is positive feedback (status = "Dobrze")
            status = rec.get('status', '')
            is_positive = status.lower() in ['dobrze', 'good', 'ok']

            with st.expander(f"[{priority}] {section}", expanded=expanded):
                if is_positive:
                    # Green box for positive feedback
                    st.markdown(f"""
                    <div class="solution-box">
                        <strong>✅ POZYTYWNY FEEDBACK:</strong><br>
                        {recommendation}<br>
                        <br>
                        <strong>Aktualny tekst (dobry):</strong>
                        <code>{current_content[:300] if current_content else 'N/A'}{'...' if current_content and len(current_content) > 300 else ''}</code>
                    </div>
                    """, unsafe_allow_html=True)
                else:
                    # Problem Box (Czerwony) z cytatem
                    if current_content:
                        st.markdown(f"""
                        <div class="problem-box">
                            <strong>🔴 CO JEST ŹLE:</strong><br>
                            {problem}<br>
                            <br>
                            <strong>Aktualny tekst:</strong>
                            <code>{current_content[:300]}{'...' if len(current_content) > 300 else ''}</code>
                        </div>
                        """, unsafe_allow_html=True)
                    else:
                        st.markdown(f"""
                        <div class="problem-box">
                            <strong>🔴 CO JEST ŹLE:</strong><br>
                            {problem}
                        </div>
                        """, unsafe_allow_html=True)

                    # Solution Box (Zielony) z przykładem
                    if example and example != 'N/A' and example != 'null' and 'niedostępne' not in example.lower():
                        st.markdown(f"""
                        <div class="solution-box">
                            <strong>✅ JAK POPRAWIĆ:</strong><br>
                            {recommendation}<br>
                            <br>
                            <strong>Nowy tekst (przykład):</strong>
                            <code>{example[:500]}{'...' if len(example) > 500 else ''}</code>
                        </div>
                        """, unsafe_allow_html=True)
                    else:
                        st.markdown(f"""
                        <div class="solution-box">
                            <strong>✅ JAK POPRAWIĆ:</strong><br>
                            {recommendation}
                        </div>
                        """, unsafe_allow_html=True)

    # Export Section
    st.markdown("---")
    st.subheader("💾 Eksport Raportu")

    # Generate JSON
    json_data = json.dumps(results, indent=2, ensure_ascii=False)

    # Download button
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    slug = results['pageInfo'].get('slug', 'unknown')
    filename = f"seo_report_{slug}_{timestamp}.json"

    st.download_button(
        label="📥 Pobierz Raport (JSON)",
        data=json_data,
        file_name=filename,
        mime="application/json",
        help="Pobierz pełny raport analizy w formacie JSON"
    )

    # New Analysis Button
    if st.button("🔄 Nowa Analiza"):
        st.session_state.results = None
        st.rerun()

    # Debug Logs Window
    st.markdown("---")
    st.subheader("🐛 Debug Logs")

    with st.expander("Zobacz logi analizy", expanded=False):
        if st.session_state.debug_logs:
            st.markdown("**Dziennik przebiegu analizy:**")

            # Display logs in code block for better readability
            log_text = "\n".join(st.session_state.debug_logs)
            st.code(log_text, language="text")

            # Option to copy all logs
            st.download_button(
                label="📋 Pobierz Logi",
                data=log_text,
                file_name=f"debug_logs_{datetime.now().strftime('%Y%m%d_%H%M%S')}.txt",
                mime="text/plain",
                help="Pobierz wszystkie logi jako plik tekstowy"
            )
        else:
            st.info("Brak logów debug. Uruchom analizę aby zobaczyć szczegółowy przebieg.")


def main():
    """Main dashboard function"""

    init_session_state()

    # Sidebar
    with st.sidebar:
        st.image("https://via.placeholder.com/300x100/dfbb68/1a1a1a?text=CoreLTB", width='stretch')

        st.markdown("### 🔍 O Narzędziu")
        st.info("""
        **CoreLTB SEO Expert** analizuje strony Pillar bezpośrednio z `servicesV2.ts`.

        **Typy Stron:**
        - **PILLAR** → Główne usługi (6 stron w servicesV2.ts)
        - **CLUSTER** → Szczegółowe treści (przyszłość)
        - **HUB** → Homepage (nie w servicesV2.ts)

        **7 Modułów Analizy:**
        - 🏗️ Structure (URL, breadcrumbs)
        - 🎯 Intent Classification (Gemini 3)
        - 🔍 Semantic Validation (embeddings)
        - 🌟 GEO Optimization (AI Overviews)
        - 📊 Content Depth (completeness)
        - 💡 Gemini Recommendations (Gemini 3 Pro)
        - 🧠 Gemini Strategic Reasoning (Gemini 3 Pro)
        """)

        st.markdown("### 📚 Dokumentacja")
        st.markdown("""
        - [README.md](./README.md)
        - [QUICK-START.md](./QUICK-START.md)
        """)

        # Real-time Debug Panel
        st.markdown("---")
        st.markdown("### 🐛 Debug (Real-time)")

        if st.session_state.debug_logs:
            # Show last 10 logs
            recent_logs = st.session_state.debug_logs[-10:]

            # Display in a container with fixed height
            debug_container = st.container()

            with debug_container:
                for log in recent_logs:
                    # Color code by type
                    if "❌" in log or "ERROR" in log:
                        st.markdown(f"<span style='color: #ef4444; font-size: 0.8rem;'>{log}</span>", unsafe_allow_html=True)
                    elif "✅" in log:
                        st.markdown(f"<span style='color: #22c55e; font-size: 0.8rem;'>{log}</span>", unsafe_allow_html=True)
                    elif "⚠️" in log or "WARNING" in log:
                        st.markdown(f"<span style='color: #eab308; font-size: 0.8rem;'>{log}</span>", unsafe_allow_html=True)
                    else:
                        st.markdown(f"<span style='color: #666; font-size: 0.8rem;'>{log}</span>", unsafe_allow_html=True)

            st.caption(f"Wyświetlono ostatnie {len(recent_logs)} z {len(st.session_state.debug_logs)} logów")
        else:
            st.info("Logi pojawią się tutaj podczas analizy...")

    # Main Header
    st.markdown('<h1 class="main-header">🔍 CoreLTB SEO Expert</h1>', unsafe_allow_html=True)
    st.markdown('<p class="sub-header">Lokalna Analiza SEO - Bezpośrednio z servicesV2.ts</p>', unsafe_allow_html=True)

    # Load available services
    if st.session_state.available_services is None:
        load_available_services()

    services = st.session_state.available_services or []

    # If no results yet, show input form
    if st.session_state.results is None:

        st.markdown("---")

        # Data Source Selection
        st.markdown("### 🎯 Źródło Danych")

        data_source = st.radio(
            "Skąd pobrać dane do analizy?",
            ["📄 Plik Lokalny (servicesV2.ts)", "🌐 Live URL (localhost/produkcja)"],
            help="**Plik Lokalny**: Parsuje TypeScript (może mieć problemy z zagnieżdżonymi obiektami)\n\n**Live URL**: Pobiera HTML z działającej strony (czysty tekst, bardziej niezawodne)"
        )

        is_live_url = "Live URL" in data_source

        st.markdown("---")

        # Service Selection Section
        st.markdown("### 📂 Wybierz Stronę do Analizy")

        if is_live_url:
            # Live URL mode - show URL input
            st.info("🌐 **Tryb Live URL**: Wprowadź adres strony (CoreLTB lub konkurencja)")

            default_url = "http://localhost:3001/oferta/projektowanie"
            page_url = st.text_input(
                "🔗 URL Strony:",
                value=default_url,
                help="Pełny URL do strony:\n\n**CoreLTB (własna strona):**\n• Dev: http://localhost:3001/oferta/...\n• Produkcja: https://coreltb.pl/oferta/...\n\n**Konkurencja (zewnętrzne strony):**\n• Np. https://profokno.pl/\n• Np. https://example.com/uslugi/budowa-domow\n\nNarzędzie automatycznie wykryje czy strona jest CoreLTB czy zewnętrzna."
            )

            # Extract slug from URL for later use
            if page_url:
                selected_slug = page_url.rstrip('/').split('/')[-1]
                page_type = "pillar"  # Assume pillar for now
            else:
                selected_slug = None
                page_type = "pillar"

        else:
            # Local file mode - show dropdown
            col1, col2 = st.columns(2)

            with col1:
                # Category Selection
                page_type = st.selectbox(
                    "📊 Typ Strony:",
                    ["pillar", "cluster", "hub"],
                    help="PILLAR = główna usługa (to co jest w servicesV2.ts)\nCLUSTER = szczegółowa treść ekspercka (przyszłość)\nHUB = homepage"
                )

            with col2:
                # Service Selection (filtered by type)
                filtered_services = get_services_by_type(services, page_type)

                if filtered_services:
                    service_options = {f"{s['title']} ({s['slug']})": s['slug'] for s in filtered_services}
                    selected_label = st.selectbox(
                        "📄 Wybierz Stronę:",
                        list(service_options.keys()),
                        help="Lista stron wczytana z servicesV2.ts"
                    )
                    selected_slug = service_options[selected_label]
                else:
                    st.warning(f"⚠️ Brak stron typu '{page_type}' w servicesV2.ts")
                    selected_slug = None

            page_url = None  # Not used in local mode

        # Info Box
        if is_live_url:
            st.markdown(f"""
            <div class="info-box">
                <strong style="color: #1a1a1a;">ℹ️ Live URL Mode:</strong><br>
                <span style="color: #1a1a1a;">
                • Pobiera HTML z działającej strony<br>
                • Oczyszcza z szumu Next.js (style, chunki, metadata)<br>
                • Wydobywa czysty tekst używając BeautifulSoup<br>
                <br>
                <strong>💡 Możliwości:</strong><br>
                • Analiza własnej strony CoreLTB (localhost lub produkcja)<br>
                • <strong>Analiza konkurencji</strong> (dowolny URL zewnętrzny)<br>
                • Automatyczna detekcja czy strona jest CoreLTB czy zewnętrzna
                </span>
            </div>
            """, unsafe_allow_html=True)
        else:
            st.markdown(f"""
            <div class="info-box">
                <strong style="color: #1a1a1a;">ℹ️ Struktura Projektu:</strong><br>
                <span style="color: #1a1a1a;">
                • <strong>PILLAR</strong> = Główne usługi z <code>servicesV2.ts</code> (np. "Kompleksowa Budowa Domów")<br>
                • <strong>CLUSTER</strong> = Szczegółowe treści eksperckie (będą w przyszłości)<br>
                • <strong>HUB</strong> = Homepage (nie ma w servicesV2.ts)<br>
                <br>
                <strong>💡 Analiza lokalna:</strong> Wszystkie dane pobierane z projektu, bez połączenia z live stroną.
                </span>
            </div>
            """, unsafe_allow_html=True)

        # Analyze Button
        st.markdown("###")  # Spacing

        if selected_slug or (is_live_url and page_url):
            if st.button("🚀 Analizuj Stronę", type="primary", use_container_width=True):
                # Choose analysis method based on data source
                if is_live_url:
                    results = run_html_analysis(page_url, page_type)
                else:
                    results = run_local_analysis(selected_slug, page_type)

                if results:
                    st.session_state.results = results
                    st.rerun()
        else:
            st.button("🚀 Analizuj Stronę", type="primary", disabled=True, use_container_width=True)

    else:
        # Display results
        display_results(st.session_state.results)


if __name__ == "__main__":
    main()
