"""
CoreLTB SEO Expert - Web Dashboard
Uruchom: streamlit run dashboard.py
"""

import streamlit as st
import json
from datetime import datetime
import os

# Import analyzers
from utils.scraper import scrape_url, scrape_local_file
from utils.parser import parse_url_to_structured_data
from analyzers.structure import analyze_structure
from analyzers.intent import classify_intent
from analyzers.semantic import validate_semantics
from analyzers.geo import check_geo_optimization
from analyzers.content_depth import analyze_content_depth
from engine.claude_recommendations import generate_recommendations
from engine.gemini_reasoning import generate_strategic_insights

# Page config
st.set_page_config(
    page_title="CoreLTB SEO Expert",
    page_icon="🔍",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS
st.markdown("""
<style>
    .main-header {
        font-size: 3rem;
        font-weight: bold;
        color: #dfbb68;
        text-align: center;
        margin-bottom: 2rem;
    }
    .metric-card {
        background: white;
        padding: 1.5rem;
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        margin-bottom: 1rem;
    }
    .score-excellent {
        color: #22c55e;
        font-size: 2rem;
        font-weight: bold;
    }
    .score-good {
        color: #eab308;
        font-size: 2rem;
        font-weight: bold;
    }
    .score-critical {
        color: #ef4444;
        font-size: 2rem;
        font-weight: bold;
    }
    .priority-p0 {
        background: #fee2e2;
        border-left: 4px solid #ef4444;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 5px;
    }
    .priority-p1 {
        background: #fef3c7;
        border-left: 4px solid #eab308;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 5px;
    }
    .priority-p2 {
        background: #dbeafe;
        border-left: 4px solid #3b82f6;
        padding: 1rem;
        margin: 1rem 0;
        border-radius: 5px;
    }
    .recommendation-box {
        background: #f9fafb;
        padding: 1.5rem;
        border-radius: 10px;
        margin: 1rem 0;
        border: 1px solid #e5e7eb;
    }
    .quick-win {
        background: #dcfce7;
        padding: 1rem;
        border-radius: 5px;
        margin: 0.5rem 0;
        border-left: 4px solid #22c55e;
    }
    .stButton>button {
        background-color: #dfbb68;
        color: #1a1a1a;
        font-weight: bold;
        border-radius: 10px;
        padding: 0.75rem 2rem;
        border: none;
        transition: all 0.3s;
    }
    .stButton>button:hover {
        background-color: #c9a654;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
</style>
""", unsafe_allow_html=True)


def get_score_class(score):
    """Get CSS class based on score"""
    if score >= 80:
        return "score-excellent"
    elif score >= 60:
        return "score-good"
    else:
        return "score-critical"


def display_score_card(title, score, max_score=100, status=None):
    """Display a metric score card"""
    score_class = get_score_class(score)

    st.markdown(f"""
    <div class="metric-card">
        <h3>{title}</h3>
        <span class="{score_class}">{score}/{max_score}</span>
        {f'<p style="color: #6b7280; margin-top: 0.5rem;">{status}</p>' if status else ''}
    </div>
    """, unsafe_allow_html=True)


def run_analysis(url, page_type):
    """Run full analysis"""
    results = {
        'timestamp': datetime.now().isoformat(),
        'source': url,
        'pageType': page_type,
        'analysis': {}
    }

    progress_bar = st.progress(0)
    status_text = st.empty()

    # Step 1: Fetch HTML
    status_text.text("🌐 Pobieranie HTML...")
    progress_bar.progress(10)

    html = scrape_url(url)
    if not html:
        st.error("❌ Nie udało się pobrać HTML")
        return None

    # Step 2: Parse
    status_text.text("📝 Parsowanie HTML...")
    progress_bar.progress(20)

    page_data = parse_url_to_structured_data(html)
    results['pageData'] = page_data

    # Step 3: Structure Analysis
    status_text.text("🏗️ Analiza struktury...")
    progress_bar.progress(30)

    structure_results = analyze_structure(page_data, url)
    results['analysis']['structure'] = structure_results

    # Step 4: Intent Classification
    status_text.text("🎯 Klasyfikacja intencji (Gemini AI)...")
    progress_bar.progress(40)

    intent_results = classify_intent(page_data)
    results['analysis']['intent'] = intent_results

    # Step 5: Semantic Validation
    status_text.text("🔗 Walidacja semantyczna (embeddings)...")
    progress_bar.progress(50)

    semantic_results = validate_semantics(page_data)
    results['analysis']['semantic'] = semantic_results

    # Step 6: GEO Optimization
    status_text.text("🤖 Optymalizacja GEO (AI Overviews)...")
    progress_bar.progress(60)

    geo_results = check_geo_optimization(page_data)
    results['analysis']['geo'] = geo_results

    # Step 7: Content Depth
    status_text.text("📊 Analiza głębokości treści...")
    progress_bar.progress(70)

    content_results = analyze_content_depth(page_data, page_type)
    results['analysis']['contentDepth'] = content_results

    # Step 8: Claude Recommendations
    status_text.text("💡 Generowanie rekomendacji (Claude AI)...")
    progress_bar.progress(80)

    recommendations = generate_recommendations(page_data, results['analysis'])
    results['recommendations'] = recommendations

    # Step 9: Gemini Strategic Insights
    status_text.text("🧠 Myślenie strategiczne (Gemini Thinking)...")
    progress_bar.progress(90)

    strategic_insights = generate_strategic_insights(results['analysis'], recommendations)
    results['strategicInsights'] = strategic_insights

    # Complete
    status_text.text("✅ Analiza zakończona!")
    progress_bar.progress(100)

    return results


def display_results(results):
    """Display analysis results"""

    # Header
    st.markdown('<div class="main-header">📊 Wyniki Analizy</div>', unsafe_allow_html=True)

    # Page Info
    st.subheader("📄 Informacje o Stronie")
    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("H1", results['pageData'].get('h1', 'N/A'))
    with col2:
        st.metric("Liczba Słów", results['pageData'].get('wordCount', {}).get('total', 0))
    with col3:
        st.metric("Typ Strony", results['pageType'].upper())

    st.divider()

    # Overall Scores
    st.subheader("📊 Wyniki Ogólne")

    col1, col2, col3, col4, col5 = st.columns(5)

    with col1:
        structure_score = results['analysis']['structure']['score']
        st.markdown(f"""
        <div class="metric-card">
            <h4 style="margin: 0; color: #6b7280;">Struktura</h4>
            <div class="{get_score_class(structure_score)}">{structure_score}/100</div>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        intent_conf = results['analysis']['intent']['confidence']
        st.markdown(f"""
        <div class="metric-card">
            <h4 style="margin: 0; color: #6b7280;">Intencja</h4>
            <div class="{get_score_class(intent_conf)}">{intent_conf}%</div>
            <small style="color: #6b7280;">{results['analysis']['intent']['primaryIntent']}</small>
        </div>
        """, unsafe_allow_html=True)

    with col3:
        semantic_score = int(results['analysis']['semantic']['overallScore'] * 100)
        st.markdown(f"""
        <div class="metric-card">
            <h4 style="margin: 0; color: #6b7280;">Semantyka</h4>
            <div class="{get_score_class(semantic_score)}">{results['analysis']['semantic']['overallScore']:.2f}</div>
            <small style="color: #6b7280;">{results['analysis']['semantic']['interpretation']['message']}</small>
        </div>
        """, unsafe_allow_html=True)

    with col4:
        geo_score = results['analysis']['geo']['score']
        st.markdown(f"""
        <div class="metric-card">
            <h4 style="margin: 0; color: #6b7280;">GEO</h4>
            <div class="{get_score_class(geo_score)}">{geo_score}/100</div>
        </div>
        """, unsafe_allow_html=True)

    with col5:
        content_score = results['analysis']['contentDepth']['score']
        st.markdown(f"""
        <div class="metric-card">
            <h4 style="margin: 0; color: #6b7280;">Treść</h4>
            <div class="{get_score_class(content_score)}">{content_score}/100</div>
        </div>
        """, unsafe_allow_html=True)

    st.divider()

    # Strategic Insights
    st.subheader("🧠 Wnioski Strategiczne (Gemini Thinking)")

    strategic = results['strategicInsights']

    st.markdown(f"""
    <div class="recommendation-box">
        <h4 style="color: #ef4444;">🎯 Główna Słabość</h4>
        <p style="font-size: 1.1rem;">{strategic.get('primaryWeakness', 'N/A')}</p>
    </div>
    """, unsafe_allow_html=True)

    # Top Priorities
    st.markdown("### 🔝 Top 3 Priorytety")

    for priority in strategic.get('topPriorities', [])[:3]:
        impact_color = "#22c55e" if priority['impact'] == "HIGH" else "#eab308" if priority['impact'] == "MEDIUM" else "#3b82f6"
        st.markdown(f"""
        <div class="recommendation-box">
            <h4 style="color: {impact_color};">{priority['priority']}. [{priority['impact']}] {priority['action']}</h4>
            <p>{priority.get('reasoning', 'N/A')}</p>
            {f"<p><strong>Oczekiwany efekt:</strong> {priority.get('estimatedGain', 'N/A')}</p>" if 'estimatedGain' in priority else ""}
        </div>
        """, unsafe_allow_html=True)

    # Quick Wins
    quick_wins = strategic.get('quickWins', [])
    if quick_wins:
        st.markdown("### ⚡ Quick Wins")
        for win in quick_wins[:5]:
            if isinstance(win, dict):
                st.markdown(f"""
                <div class="quick-win">
                    <strong>{win['action']}</strong><br>
                    <small>Wysiłek: {win.get('effort', 'N/A')} | Impact: {win.get('impact', 'N/A')}</small>
                </div>
                """, unsafe_allow_html=True)
            else:
                st.markdown(f'<div class="quick-win">{win}</div>', unsafe_allow_html=True)

    st.divider()

    # Detailed Recommendations
    st.subheader("📋 Szczegółowe Rekomendacje (Claude AI)")

    recommendations_list = results['recommendations'].get('recommendations', [])

    if recommendations_list:
        # Filters
        col1, col2 = st.columns([1, 3])

        with col1:
            priority_filter = st.selectbox(
                "Filtruj po priorytecie:",
                ["Wszystkie", "P0 (Krytyczne)", "P1 (Ważne)", "P2 (Nice to have)"]
            )

        # Filter recommendations
        if priority_filter != "Wszystkie":
            priority_code = priority_filter.split()[0]
            filtered_recs = [r for r in recommendations_list if r['priority'] == priority_code]
        else:
            filtered_recs = recommendations_list

        st.markdown(f"**Znaleziono:** {len(filtered_recs)} rekomendacji")

        # Display recommendations
        for i, rec in enumerate(filtered_recs):
            priority_class = f"priority-{rec['priority'].lower()}"

            with st.expander(f"{i+1}. [{rec['priority']}] {rec.get('section', 'N/A')}", expanded=(i < 3)):
                st.markdown(f"""
                <div class="{priority_class}">
                    <h4>Problem:</h4>
                    <p>{rec['problem']}</p>

                    <h4>Rekomendacja:</h4>
                    <p>{rec['recommendation']}</p>

                    {'<h4>Przykład:</h4><pre style="background: #f3f4f6; padding: 1rem; border-radius: 5px; overflow-x: auto;">' + rec.get('example', 'N/A') + '</pre>' if rec.get('example') and rec['example'] != 'N/A' else ''}

                    <h4>Impact:</h4>
                    <p>{rec.get('impact', 'N/A')}</p>

                    <div style="display: flex; gap: 2rem; margin-top: 1rem;">
                        <span><strong>Trudność:</strong> {rec.get('difficultyScore', 'N/A')}/5</span>
                        <span><strong>Czas:</strong> {rec.get('estimatedTimeMinutes', 'N/A')} min</span>
                    </div>
                </div>
                """, unsafe_allow_html=True)

    st.divider()

    # Next Steps
    next_steps = results['recommendations'].get('nextSteps', [])
    if next_steps:
        st.subheader("✅ Następne Kroki")
        for step in next_steps:
            st.markdown(f"- {step}")


def main():
    """Main dashboard"""

    # Sidebar
    with st.sidebar:
        st.image("https://via.placeholder.com/300x100/dfbb68/1a1a1a?text=CoreLTB+SEO+Expert", use_container_width=True)

        st.markdown("---")

        st.markdown("""
        ### 🔍 O Narzędziu

        CoreLTB SEO Expert to inteligentne narzędzie do audytu SEO, które wykorzystuje:

        - 🤖 **Gemini 2.0 Flash Thinking** - Klasyfikacja intencji i myślenie strategiczne
        - 🤖 **Claude Sonnet 4.5** - Szczegółowe rekomendacje
        - 🔗 **Google Embeddings** - Analiza semantyczna

        ### 📊 Moduły Analizy

        1. **Struktura** - URL, breadcrumbs, linki
        2. **Intencja** - Commercial Investigation, TOFU, MOFU, BOFU
        3. **Semantyka** - Spójność tematyczna
        4. **GEO** - Optymalizacja dla AI Overviews
        5. **Treść** - Głębokość i kompletność
        6. **Rekomendacje** - Claude AI
        7. **Strategia** - Gemini Thinking

        ---

        ### ⚙️ Konfiguracja

        API Keys powinny być w pliku `.env`:
        - `GEMINI_API_KEY`
        - `ANTHROPIC_API_KEY`
        """)

    # Main content
    st.markdown('<div class="main-header">🔍 CoreLTB SEO Expert</div>', unsafe_allow_html=True)
    st.markdown('<p style="text-align: center; color: #6b7280; font-size: 1.2rem;">Inteligentny Audyt SEO z AI</p>', unsafe_allow_html=True)

    # Check if results exist in session
    if 'results' not in st.session_state:
        st.session_state.results = None

    # Input form
    st.markdown("---")

    col1, col2 = st.columns([3, 1])

    with col1:
        url = st.text_input(
            "🌐 Wklej URL strony do analizy:",
            placeholder="https://coreltb.pl/oferta/kompleksowa-budowa-domow",
            help="Podaj pełny URL strony do audytu SEO"
        )

    with col2:
        page_type = st.selectbox(
            "📄 Typ strony:",
            ["cluster", "pillar", "hub"],
            help="Wybierz typ strony:\n- cluster: pojedyncza usługa pod pilarem\n- pillar: główna kategoria usług\n- hub: strona /oferta"
        )

    col1, col2, col3 = st.columns([2, 1, 2])

    with col2:
        analyze_button = st.button("🚀 Analizuj Stronę", type="primary", use_container_width=True)

    # Run analysis
    if analyze_button:
        if not url:
            st.error("⚠️ Proszę podać URL strony!")
        else:
            with st.spinner("🔄 Trwa analiza... To może potrwać 60-90 sekund"):
                results = run_analysis(url, page_type)

                if results:
                    st.session_state.results = results
                    st.success("✅ Analiza zakończona pomyślnie!")
                    st.rerun()

    # Display results
    if st.session_state.results:
        st.markdown("---")
        display_results(st.session_state.results)

        # Export options
        st.markdown("---")
        st.subheader("💾 Eksport Raportu")

        col1, col2, col3 = st.columns(3)

        with col1:
            # JSON export
            json_data = json.dumps(st.session_state.results, indent=2, ensure_ascii=False)
            st.download_button(
                label="📥 Pobierz JSON",
                data=json_data,
                file_name=f"seo_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json",
                mime="application/json"
            )

        with col2:
            # Reset
            if st.button("🔄 Nowa Analiza"):
                st.session_state.results = None
                st.rerun()


if __name__ == "__main__":
    main()
