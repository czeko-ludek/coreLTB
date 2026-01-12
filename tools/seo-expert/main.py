"""
CoreLTB SEO Expert - Main CLI

Usage:
    python main.py analyze <url>
    python main.py analyze --file <path_to_html>
"""

import click
import json
from rich.console import Console
from rich.progress import Progress, SpinnerColumn, TextColumn
from rich.panel import Panel
from rich.table import Table
from rich import print as rprint
from datetime import datetime
import os

# Import modules
from utils.scraper import scrape_url, scrape_local_file
from utils.parser import parse_url_to_structured_data
from analyzers.structure import analyze_structure
from analyzers.intent import classify_intent
from analyzers.semantic import validate_semantics
from analyzers.geo import check_geo_optimization
from analyzers.content_depth import analyze_content_depth
from engine.claude_recommendations import generate_recommendations
from engine.gemini_reasoning import generate_strategic_insights

console = Console()


@click.group()
def cli():
    """CoreLTB SEO Expert - Intelligent SEO audit tool"""
    pass


@cli.command()
@click.argument('url', required=False)
@click.option('--file', '-f', help='Path to local HTML file')
@click.option('--output', '-o', default='reports', help='Output directory for report')
@click.option('--format', '-fmt', default='json', type=click.Choice(['json', 'markdown']), help='Output format')
@click.option('--page-type', '-t', default='cluster', type=click.Choice(['cluster', 'pillar']), help='Page type')
def analyze(url, file, output, format, page_type):
    """Analyze a page for SEO optimization"""

    console.print("\n[bold cyan]🔍 CoreLTB SEO Expert - Full Analysis[/bold cyan]\n", style="bold")

    # Step 1: Fetch HTML
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:

        if file:
            task = progress.add_task(f"Reading file: {file}", total=None)
            html = scrape_local_file(file)
            source = file
        elif url:
            task = progress.add_task(f"Scraping: {url}", total=None)
            html = scrape_url(url)
            source = url
        else:
            console.print("[red]❌ Error: Provide either URL or --file[/red]")
            return

        if not html:
            console.print("[red]❌ Failed to fetch HTML[/red]")
            return

        progress.update(task, completed=True)

    console.print("✅ HTML fetched successfully\n")

    # Step 2: Parse HTML
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("Parsing HTML to structured data...", total=None)
        page_data = parse_url_to_structured_data(html)
        progress.update(task, completed=True)

    console.print("✅ Page parsed successfully\n")

    # Display basic info
    _display_page_info(page_data, source)

    # Step 3: Run all analyzers
    console.print("\n[bold yellow]📊 Running Analysis Modules...[/bold yellow]\n")

    results = {
        'timestamp': datetime.now().isoformat(),
        'source': source,
        'pageType': page_type,
        'pageData': page_data,
        'analysis': {}
    }

    # Structure Analysis
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("1/7 Analyzing structure...", total=None)
        structure_results = analyze_structure(page_data, url or file)
        results['analysis']['structure'] = structure_results
        progress.update(task, completed=True)

    console.print(f"✅ Structure: [bold]{structure_results['score']}/100[/bold]")

    # Intent Classification
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("2/7 Classifying intent (Gemini AI)...", total=None)
        intent_results = classify_intent(page_data)
        results['analysis']['intent'] = intent_results
        progress.update(task, completed=True)

    console.print(f"✅ Intent: [bold]{intent_results['primaryIntent']}[/bold] ({intent_results['confidence']}%)")

    # Semantic Validation
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("3/7 Validating semantic coherence (embeddings)...", total=None)
        semantic_results = validate_semantics(page_data)
        results['analysis']['semantic'] = semantic_results
        progress.update(task, completed=True)

    console.print(f"✅ Semantic: [bold]{semantic_results['overallScore']:.2f}[/bold] ({semantic_results['interpretation']['message']})")

    # GEO Optimization
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("4/7 Checking GEO optimization...", total=None)
        geo_results = check_geo_optimization(page_data)
        results['analysis']['geo'] = geo_results
        progress.update(task, completed=True)

    console.print(f"✅ GEO: [bold]{geo_results['score']}/100[/bold] ({geo_results['status']})")

    # Content Depth
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("5/7 Analyzing content depth...", total=None)
        content_results = analyze_content_depth(page_data, page_type)
        results['analysis']['contentDepth'] = content_results
        progress.update(task, completed=True)

    console.print(f"✅ Content Depth: [bold]{content_results['score']}/100[/bold]")

    # Claude Recommendations
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("6/7 Generating recommendations (Claude AI)...", total=None)
        recommendations = generate_recommendations(page_data, results['analysis'])
        results['recommendations'] = recommendations
        progress.update(task, completed=True)

    console.print(f"✅ Recommendations: [bold]{len(recommendations.get('recommendations', []))} items[/bold]")

    # Gemini Strategic Insights
    with Progress(
        SpinnerColumn(),
        TextColumn("[progress.description]{task.description}"),
        console=console
    ) as progress:
        task = progress.add_task("7/7 Strategic reasoning (Gemini Thinking)...", total=None)
        strategic_insights = generate_strategic_insights(results['analysis'], recommendations)
        results['strategicInsights'] = strategic_insights
        progress.update(task, completed=True)

    console.print(f"✅ Strategic Insights: [bold]{len(strategic_insights.get('topPriorities', []))} priorities[/bold]")

    # Display results
    console.print("\n" + "="*80 + "\n")
    _display_results(results)

    # Save report
    _save_report(results, output, format, source)


def _display_page_info(page_data: dict, source: str):
    """Display basic page information"""
    table = Table(title="📄 Page Information", show_header=True, header_style="bold cyan")
    table.add_column("Property", style="cyan")
    table.add_column("Value", style="white")

    table.add_row("Source", source)
    table.add_row("H1", page_data.get('h1', 'N/A'))
    table.add_row("Meta Title", page_data.get('meta', {}).get('title', 'N/A'))
    table.add_row("Word Count", str(page_data.get('wordCount', {}).get('total', 0)))

    breadcrumbs = page_data.get('breadcrumbs', [])
    breadcrumb_str = ' → '.join([b['label'] for b in breadcrumbs]) if breadcrumbs else 'N/A'
    table.add_row("Breadcrumbs", breadcrumb_str)

    console.print(table)


def _display_results(results: dict):
    """Display analysis results in terminal"""

    # Overall Scores
    scores_table = Table(title="📊 Overall Scores", show_header=True, header_style="bold green")
    scores_table.add_column("Module", style="cyan", width=25)
    scores_table.add_column("Score", style="white", width=15)
    scores_table.add_column("Status", style="white", width=35)

    # Add all scores
    structure_score = results['analysis']['structure']['score']
    scores_table.add_row(
        "Structure",
        f"{structure_score}/100",
        _get_score_status(structure_score)
    )

    intent = results['analysis']['intent']
    scores_table.add_row(
        "Intent",
        f"{intent['confidence']}%",
        f"🎯 {intent['primaryIntent']}"
    )

    semantic_score = results['analysis']['semantic']['overallScore']
    scores_table.add_row(
        "Semantic Coherence",
        f"{semantic_score:.2f}",
        results['analysis']['semantic']['interpretation']['message']
    )

    geo_score = results['analysis']['geo']['score']
    scores_table.add_row(
        "GEO Optimization",
        f"{geo_score}/100",
        _get_score_status(geo_score)
    )

    content_score = results['analysis']['contentDepth']['score']
    scores_table.add_row(
        "Content Depth",
        f"{content_score}/100",
        _get_score_status(content_score)
    )

    console.print(scores_table)

    # Strategic Insights
    console.print("\n[bold magenta]🧠 Strategic Insights (Gemini Thinking)[/bold magenta]\n")

    strategic = results['strategicInsights']
    console.print(f"[bold]Primary Weakness:[/bold] {strategic.get('primaryWeakness', 'N/A')}\n")

    console.print("[bold]Top 3 Priorities:[/bold]")
    for priority in strategic.get('topPriorities', [])[:3]:
        console.print(f"  {priority['priority']}. [{priority['impact']}] {priority['action']}")
        console.print(f"     → {priority.get('reasoning', 'N/A')}\n")

    # Quick Wins
    quick_wins = strategic.get('quickWins', [])
    if quick_wins:
        console.print("[bold yellow]⚡ Quick Wins:[/bold yellow]")
        for win in quick_wins[:5]:
            if isinstance(win, dict):
                console.print(f"  • {win['action']} ({win.get('effort', 'N/A')})")
            else:
                console.print(f"  • {win}")
        console.print()

    # Top Recommendations from Claude
    recommendations_list = results['recommendations'].get('recommendations', [])

    if recommendations_list:
        console.print("\n[bold red]🚨 Top Issues (Claude Analysis):[/bold red]\n")

        for rec in recommendations_list[:5]:  # Top 5
            priority_icon = "🔴" if rec['priority'] == 'P0' else "🟡" if rec['priority'] == 'P1' else "🟢"
            console.print(f"{priority_icon} [{rec['priority']}] {rec.get('section', 'N/A')}")
            console.print(f"   Problem: {rec['problem'][:100]}...")
            console.print(f"   💡 Recommendation: {rec['recommendation'][:100]}...\n")

        if len(recommendations_list) > 5:
            console.print(f"[dim]... and {len(recommendations_list) - 5} more recommendations (see full report)[/dim]\n")

    # Next Steps
    next_steps = results['recommendations'].get('nextSteps', [])
    if next_steps:
        console.print("\n[bold green]✅ Next Steps:[/bold green]")
        for step in next_steps[:5]:
            console.print(f"  {step}")
        console.print()


def _get_score_status(score: int) -> str:
    """Get status emoji based on score"""
    if score >= 80:
        return "✅ Excellent"
    elif score >= 60:
        return "⚠️  Needs Improvement"
    else:
        return "❌ Critical"


def _save_report(results: dict, output_dir: str, format: str, source: str):
    """Save report to file"""

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    # Generate filename
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    source_name = source.split('/')[-1].replace('.html', '').replace(':', '_')
    filename = f"seo_report_{source_name}_{timestamp}.{format}"
    filepath = os.path.join(output_dir, filename)

    if format == 'json':
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(results, f, indent=2, ensure_ascii=False)

    elif format == 'markdown':
        markdown = _generate_markdown_report(results)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(markdown)

    console.print(f"\n[bold green]✅ Report saved:[/bold green] {filepath}")
    console.print(f"[dim]Total analysis time: ~60-90 seconds[/dim]\n")


def _generate_markdown_report(results: dict) -> str:
    """Generate markdown report"""
    md = f"""# CoreLTB SEO Expert - Full Analysis Report

**Date:** {results['timestamp']}
**Source:** {results['source']}
**Page Type:** {results['pageType']}

---

## 📄 Page Information

- **H1:** {results['pageData'].get('h1', 'N/A')}
- **Meta Title:** {results['pageData'].get('meta', {}).get('title', 'N/A')}
- **Word Count:** {results['pageData'].get('wordCount', {}).get('total', 0)}

---

## 📊 Overall Scores

| Module | Score | Status |
|--------|-------|--------|
| Structure | {results['analysis']['structure']['score']}/100 | {_get_score_status(results['analysis']['structure']['score'])} |
| Semantic | {results['analysis']['semantic']['overallScore']:.2f} | {results['analysis']['semantic']['interpretation']['message']} |
| GEO | {results['analysis']['geo']['score']}/100 | {_get_score_status(results['analysis']['geo']['score'])} |
| Content Depth | {results['analysis']['contentDepth']['score']}/100 | {_get_score_status(results['analysis']['contentDepth']['score'])} |

---

## 🧠 Strategic Insights

**Primary Weakness:** {results['strategicInsights'].get('primaryWeakness', 'N/A')}

### Top Priorities

"""

    for priority in results['strategicInsights'].get('topPriorities', []):
        md += f"\n{priority['priority']}. **[{priority['impact']}]** {priority['action']}\n"
        md += f"   - Reasoning: {priority.get('reasoning', 'N/A')}\n"

    md += "\n### Quick Wins\n\n"
    for win in results['strategicInsights'].get('quickWins', []):
        if isinstance(win, dict):
            md += f"- {win['action']} ({win.get('effort', 'N/A')})\n"
        else:
            md += f"- {win}\n"

    md += "\n---\n\n## 🚨 Detailed Recommendations\n\n"

    for rec in results['recommendations'].get('recommendations', []):
        md += f"\n### [{rec['priority']}] {rec.get('section', 'N/A')}\n\n"
        md += f"**Problem:** {rec['problem']}\n\n"
        md += f"**Recommendation:** {rec['recommendation']}\n\n"

        if 'example' in rec and rec['example'] != 'N/A':
            md += f"**Example:**\n```\n{rec['example']}\n```\n\n"

        if 'impact' in rec:
            impact = rec['impact']
            if isinstance(impact, dict):
                md += f"**Impact:**\n"
                for key, value in impact.items():
                    md += f"- {key}: {value}\n"
            else:
                md += f"**Impact:** {impact}\n"

        md += f"\n**Difficulty:** {rec.get('difficultyScore', 'N/A')}/5\n"
        md += f"**Time:** {rec.get('estimatedTimeMinutes', 'N/A')} minutes\n\n"
        md += "---\n\n"

    return md


if __name__ == '__main__':
    cli()
