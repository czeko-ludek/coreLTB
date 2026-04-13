#!/usr/bin/env node

/**
 * SEO Orchestrator — Glowny analityk CoreLTB
 *
 * Orkiestruje wyspecjalizowanych agentow i generuje zbiorczy raport:
 *
 *   Agent 1: GSC + GA4     — ruch organiczny, pozycje, frazy, uzytkownicy
 *   Agent 2: Ads            — kampanie Google Ads + Meta, konwersje, ROI
 *   Agent 3: Link Building  — profil linkowy, budzet, propozycje, ROI linkow
 *   Agent 4: Indexing       — status indeksacji, submit queue
 *
 * Glowny analityk laczy dane ze wszystkich agentow i generuje:
 *   - Zbiorczy raport MD ze wszystkimi sekcjami
 *   - Executive summary z najwazniejszymi wnioskami
 *   - Priorytety i action items
 *
 * Uzycie:
 *   node orchestrator.js                    — pelny raport (28 dni)
 *   node orchestrator.js --days 7           — 7 dni
 *   node orchestrator.js --agent gsc        — tylko GSC+GA4
 *   node orchestrator.js --agent ads        — tylko Ads
 *   node orchestrator.js --agent links      — tylko Link Building
 *   node orchestrator.js --agent gbp        — tylko Google Business Profile
 *   node orchestrator.js --evaluate-link    — interaktywna ocena linku
 *   node orchestrator.js --add-link         — dodaj zakupiony link
 *   node orchestrator.js --link-report      — raport linkowy
 */

const fs = require('fs');
const path = require('path');

// ─── Config ──────────────────────────────────────
const CONFIG_PATH = path.join(__dirname, 'config.json');
const ACTIONS_PATH = path.join(__dirname, 'seo-actions.json');
const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

// ─── Args ────────────────────────────────────────
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(name);
  return idx !== -1 ? args[idx + 1] : null;
};
const hasFlag = (name) => args.includes(name);

const days = parseInt(getArg('--days')) || config.defaults.days;
const agentFilter = getArg('--agent'); // null = all

// ─── Modules ─────────────────────────────────────
const { testAuth } = require('./lib/auth');
const gsc = require('./lib/gsc');
const ga4 = require('./lib/ga4');
const analyzer = require('./lib/analyzer');
const adsAnalyzer = require('./lib/ads-analyzer');
const linkAnalyzer = require('./lib/link-analyzer');
const gbp = require('./lib/gbp');

// ─── Evaluate Link (standalone) ──────────────────
if (hasFlag('--evaluate-link')) {
  const jsonArg = getArg('--evaluate-link');
  if (!jsonArg) {
    console.log('\nUzycie: node orchestrator.js --evaluate-link \'{"portal":"...", "dr":25, "traffic":5000, "price":200, "topic":"budownictwo", "targetPage":"/obszar-dzialania/rybnik"}\'');
    console.log('\nParametry:');
    console.log('  portal      — nazwa portalu');
    console.log('  url         — adres portalu');
    console.log('  dr          — Domain Rating (0-100)');
    console.log('  traffic     — ruch organiczny (sesje/mies.)');
    console.log('  price       — cena w PLN');
    console.log('  linkType    — dofollow / nofollow');
    console.log('  topic       — tematyka portalu');
    console.log('  anchor      — proponowany tekst linku');
    console.log('  targetPage  — docelowa strona na coreltb.pl');
    process.exit(0);
  }

  try {
    const proposal = JSON.parse(jsonArg);
    const result = linkAnalyzer.evaluateProposal(proposal);

    console.log('');
    console.log('╔═══════════════════════════════════════════════╗');
    console.log('║       Link Evaluator — CoreLTB               ║');
    console.log('╚═══════════════════════════════════════════════╝');
    console.log('');
    console.log(`  Portal:    ${proposal.portal || '-'}`);
    console.log(`  DR:        ${proposal.dr || '-'}`);
    console.log(`  Ruch:      ${proposal.traffic || '-'} sesji/mies.`);
    console.log(`  Cena:      ${proposal.price || '-'} PLN`);
    console.log(`  Tematyka:  ${proposal.topic || '-'}`);
    console.log(`  Docelowa:  ${proposal.targetPage || 'nie podano'}`);
    console.log('');
    console.log(`  ┌─────────────────────────────────────┐`);
    console.log(`  │  OCENA: ${result.score}/10  →  ${result.verdict.padEnd(8)} │`);
    console.log(`  └─────────────────────────────────────┘`);
    console.log('');
    console.log('  Szczegoly:');
    console.log(`    DR/DA portalu:        ${result.breakdown.dr.score}/10`);
    console.log(`    Relevancja tematyczna: ${result.breakdown.topic.score}/10`);
    console.log(`    Relevancja regionalna: ${result.breakdown.regional.score}/10`);
    console.log(`    Ruch organiczny:       ${result.breakdown.traffic.score}/10`);
    console.log(`    Cena/wartosc:          ${result.breakdown.value.score}/10 (${result.breakdown.value.pricePerDR} PLN/DR)`);

    if (result.penalties.length > 0) {
      console.log('');
      console.log('  Ostrzezenia:');
      for (const p of result.penalties) {
        console.log(`    ⚠️  ${p}`);
      }
    }

    if (result.recommendations.length > 0) {
      console.log('');
      console.log('  Rekomendacje:');
      for (const r of result.recommendations) {
        console.log(`    → ${r}`);
      }
    }
    console.log('');
  } catch (err) {
    console.error(`Blad parsowania JSON: ${err.message}`);
    process.exit(1);
  }
  process.exit(0);
}

// ─── Add Link (standalone) ───────────────────────
if (hasFlag('--add-link')) {
  const jsonArg = getArg('--add-link');
  if (!jsonArg) {
    console.log('\nUzycie: node orchestrator.js --add-link \'{"portal":"...", "dr":25, "price":200, "targetPage":"/obszar-dzialania/rybnik", "anchor":"firma budowlana Rybnik"}\'');
    process.exit(0);
  }
  try {
    const linkData = JSON.parse(jsonArg);
    const result = linkAnalyzer.addLink(linkData);
    console.log(`\n✅ Link #${result.id} dodany do bazy (${result.portal}, ${result.price} PLN)\n`);
  } catch (err) {
    console.error(`Blad: ${err.message}`);
    process.exit(1);
  }
  process.exit(0);
}

// ─── Link Report (standalone) ────────────────────
if (hasFlag('--link-report')) {
  linkAnalyzer.initLinksDB();
  const report = linkAnalyzer.generateLinkReport();
  console.log('');
  console.log(report);
  process.exit(0);
}

// ─── Main Orchestrator ───────────────────────────
async function main() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║    SEO Orchestrator — CoreLTB Builders        ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log(`  Domena:  ${config.site.domain}`);
  console.log(`  Okres:   ${days} dni`);
  console.log(`  Agenty:  ${agentFilter || 'ALL (gsc+ga4, ads, links)'}`);
  console.log('');

  const timestamp = new Date().toISOString().replace('T', ' ').split('.')[0];
  const sections = [];
  const insights = [];
  const actionItems = [];

  // ═══════════════════════════════════════════════
  // AGENT 1: GSC + GA4
  // ═══════════════════════════════════════════════
  let gscData = {};
  let ga4Data = {};
  let analysisData = {};

  if (!agentFilter || agentFilter === 'gsc' || agentFilter === 'all') {
    console.log('┌─ Agent 1: GSC + GA4 ─────────────────────────');

    try {
      console.log('│  Pobieram dane z Google Search Console...');
      const [queries, pages, countries, devices] = await Promise.all([
        gsc.getTopQueries(config.gsc.siteUrl, days, config.defaults.rowLimit),
        gsc.getTopPages(config.gsc.siteUrl, days, config.defaults.rowLimit),
        gsc.getCountries(config.gsc.siteUrl, days),
        gsc.getDevices(config.gsc.siteUrl, days),
      ]);

      gscData = {
        queries: { current: queries.current, previous: queries.previous },
        pages: { current: pages.current, previous: pages.previous },
        countries,
        devices,
      };
      console.log(`│  ✅ GSC: ${queries.current.length} fraz, ${pages.current.length} stron`);
    } catch (err) {
      console.error(`│  ❌ GSC Error: ${err.message}`);
    }

    // GA4
    if (config.ga4.propertyId) {
      try {
        console.log('│  Pobieram dane z Google Analytics 4...');
        const [overview, topPages, events, sources, countriesGA4] = await Promise.all([
          ga4.getOverview(config.ga4.propertyId, days),
          ga4.getTopPagesGA4(config.ga4.propertyId, days),
          ga4.getTopEvents(config.ga4.propertyId, days),
          ga4.getTrafficSources(config.ga4.propertyId, days),
          ga4.getCountriesGA4(config.ga4.propertyId, days),
        ]);
        ga4Data = { overview, topPages, events, sources, countries: countriesGA4 };
        console.log('│  ✅ GA4: dane pobrane');
      } catch (err) {
        console.error(`│  ⚠️  GA4 Error: ${err.message}`);
      }
    }

    // Analiza GSC
    if (gscData.queries) {
      analysisData.queryMovers = analyzer.compareData(
        gscData.queries.current, gscData.queries.previous
      );
      analysisData.pageMovers = analyzer.compareData(
        gscData.pages?.current || [], gscData.pages?.previous || []
      );
      analysisData.keywordGroups = analyzer.groupKeywords(
        gscData.queries.current, config.keywordGroups
      );
      analysisData.opportunities = analyzer.findOpportunities(
        gscData.queries.current, config
      );
      analysisData.alerts = analyzer.generateAlerts(
        gscData.queries.current, gscData.queries.previous, config
      );
      analysisData.actionCorrelations = analyzer.correlateActions(
        ACTIONS_PATH, analysisData.queryMovers, analysisData.pageMovers
      );
    }

    // Wnioski z Agent 1
    if (ga4Data.overview?.current?.rows?.length > 0) {
      const vals = ga4Data.overview.current.rows[0]?.metricValues || [];
      const sessions = parseInt(vals[0]?.value) || 0;
      const users = parseInt(vals[1]?.value) || 0;
      const engRate = parseFloat(vals[5]?.value) || 0;
      insights.push(`Ruch: ${sessions} sesji, ${users} uzytkownikow, engagement ${(engRate * 100).toFixed(0)}%`);
    }

    if (analysisData.opportunities?.length > 0) {
      for (const opp of analysisData.opportunities) {
        actionItems.push({
          priority: 'medium',
          source: 'GSC',
          action: `Popraw CTR dla "${opp.query}" (poz. ${opp.position.toFixed(1)}, ${opp.impressions} impresji, CTR ${(opp.ctr * 100).toFixed(1)}%)`,
        });
      }
    }

    console.log('└───────────────────────────────────────────────');
    console.log('');
  }

  // ═══════════════════════════════════════════════
  // AGENT 2: Ads Analyzer
  // ═══════════════════════════════════════════════
  let adsReport = '';

  if (!agentFilter || agentFilter === 'ads' || agentFilter === 'all') {
    console.log('┌─ Agent 2: Ads Analyzer ──────────────────────');

    if (ga4Data.sources || ga4Data.events || ga4Data.topPages) {
      const adChannels = adsAnalyzer.analyzeAdChannels(ga4Data.sources);
      const conversions = adsAnalyzer.analyzeConversions(ga4Data.events);
      const landingPages = adsAnalyzer.analyzeLandingPages(ga4Data.topPages);

      adsReport = adsAnalyzer.generateAdsReport(adChannels, conversions, landingPages, config);

      // Wnioski z Agent 2
      if (adChannels.paidTotal > 0) {
        insights.push(`Reklamy: ${adChannels.paidTotal} sesji (${adChannels.paidShare}% ruchu), engagement ${(adChannels.avgPaidEngagement * 100).toFixed(0)}%`);
      }
      if (conversions.totalLeads > 0) {
        insights.push(`Konwersje: ${conversions.totalLeads} leadow (${conversions.leadEvents.map(e => `${e.event}: ${e.count}`).join(', ')})`);
      }
      if (adChannels.paidTotal > 0 && parseFloat(adChannels.qualityGap) > 15) {
        actionItems.push({
          priority: 'high',
          source: 'Ads',
          action: `Engagement z reklam (${(adChannels.avgPaidEngagement * 100).toFixed(0)}%) jest ${adChannels.qualityGap}pp nizszy niz organic — popraw targetowanie lub landing page`,
        });
      }

      console.log(`│  ✅ Paid: ${adChannels.paidTotal} sesji | Organic: ${adChannels.organicTotal} sesji`);
      console.log(`│  ✅ Konwersje: ${conversions.totalLeads} leadow`);
    } else {
      console.log('│  ⚠️  Brak danych GA4 — pomijam analize Ads');
    }

    console.log('└───────────────────────────────────────────────');
    console.log('');
  }

  // ═══════════════════════════════════════════════
  // AGENT 3: Link Building
  // ═══════════════════════════════════════════════
  let linksReport = '';

  if (!agentFilter || agentFilter === 'links' || agentFilter === 'all') {
    console.log('┌─ Agent 3: Link Building ─────────────────────');

    const db = linkAnalyzer.initLinksDB();
    const totalLinks = db.links.length;
    const totalSpent = db.links.reduce((s, l) => s + (l.price || 0), 0);

    linksReport = linkAnalyzer.generateLinkReport();

    if (totalLinks > 0) {
      insights.push(`Link building: ${totalLinks} linkow, wydano ${totalSpent} PLN`);
      console.log(`│  ✅ Linkow w bazie: ${totalLinks} (wydano: ${totalSpent} PLN)`);
    } else {
      insights.push('Link building: brak zakupionych linkow — rozpocznij budowanie profilu');
      actionItems.push({
        priority: 'high',
        source: 'Links',
        action: 'Rozpocznij link building — Wodzislaw (poz. 11.7) potrzebuje 2-3 linkow do TOP 10',
      });
      console.log('│  ⚠️  Brak linkow w bazie — link building nie rozpoczety');
    }

    // Sprawdz ktore miasta potrzebuja linkow (na podstawie GSC)
    if (analysisData.keywordGroups) {
      for (const [city, group] of Object.entries(analysisData.keywordGroups)) {
        if (['rybnik', 'katowice', 'tychy', 'wodzislaw', 'gliwice'].includes(city)) {
          if (group.avgPosition > 10 && group.avgPosition <= 30 && group.totalImpressions > 20) {
            actionItems.push({
              priority: group.avgPosition <= 15 ? 'high' : 'medium',
              source: 'Links',
              action: `${city}: pozycja ${group.avgPosition.toFixed(1)}, ${group.totalImpressions} impresji — potrzebuje linkow do /obszar-dzialania/${city === 'wodzislaw' ? 'wodzislaw-slaski' : city}`,
            });
          }
        }
      }
    }

    console.log('└───────────────────────────────────────────────');
    console.log('');
  }

  // ═══════════════════════════════════════════════
  // AGENT 4: Google Business Profile
  // ═══════════════════════════════════════════════
  let gbpReport = '';

  if (!agentFilter || agentFilter === 'gbp' || agentFilter === 'all') {
    console.log('┌─ Agent 4: Google Business Profile ───────────');

    try {
      const gbpResults = await gbp.generateGBPReport(days);

      // Delta — porownaj z poprzednim snapshotem
      const gbpDelta = gbp.compareWithPrevious(gbpResults);

      // Zapisz biezacy snapshot
      gbp.saveSnapshot(gbpResults);

      // Formatuj raport (z delta jesli dostepna)
      gbpReport = gbp.formatGBPReport(gbpResults);
      if (gbpDelta) {
        gbpReport += '\n' + gbp.formatDeltaReport(gbpDelta);
      }

      for (const result of gbpResults) {
        // Performance totals
        if (result.performance?.multiDailyMetricTimeSeries) {
          const totals = gbp.calculateTotals(result.performance);
          const totalActions = totals.websiteClicks + totals.callClicks + totals.directions;

          insights.push(`GBP ${result.location.shortName}: ${totals.totalImpressions} wyswietlen, ${totals.websiteClicks} klik www, ${totals.callClicks} tel, ${totals.directions} nawigacji`);
          console.log(`│  ✅ ${result.location.shortName}: ${totals.totalImpressions} wyswietlen, ${totals.callClicks} tel, ${totals.directions} nawigacji`);
        } else if (result.performance?.error) {
          console.log(`│  ⚠️  ${result.location.shortName}: ${result.performance.error}`);
        }

        // Audit score + action items
        if (result.audit) {
          console.log(`│  ✅ ${result.location.shortName}: audyt ${result.audit.score}/100 (${result.audit.grade}), ${result.audit.issues.length} problemow, ${result.audit.warnings.length} ostrzezen`);

          // Dodaj krytyczne problemy jako action items
          for (const issue of result.audit.issues) {
            actionItems.push({
              priority: issue.startsWith('BRAK') || issue.startsWith('ZERO') || issue.includes('NIEADEKWATNE') ? 'high' : 'medium',
              source: 'GBP',
              action: `${result.location.shortName}: ${issue}`,
            });
          }
        }

        if (result.keywords?.keywords?.length > 0) {
          console.log(`│  ✅ ${result.location.shortName}: ${result.keywords.keywords.length} hasel wyszukiwania`);
        }
      }
    } catch (err) {
      console.error(`│  ❌ GBP Error: ${err.message}`);
      if (err.message.includes('insufficient') || err.message.includes('scope') || err.message.includes('403')) {
        console.error('│  → Odswież token: py "D:\\NEXUS V2\\credentials\\setup_analytics_adc.py"');
      }
    }

    console.log('└───────────────────────────────────────────────');
    console.log('');
  }

  // ═══════════════════════════════════════════════
  // GLOWNY ANALITYK — zbiorczy raport
  // ═══════════════════════════════════════════════
  console.log('┌─ Glowny Analityk — generuje raport ───────────');

  const { generateReport } = require('./lib/formatter');

  // Generuj bazowy raport (GSC + GA4)
  const baseReport = generateReport({
    config,
    gsc: gscData,
    ga4: ga4Data,
    analysis: analysisData,
    timestamp,
  });

  // Zbuduj pelny raport
  const fullReportLines = [];

  // Executive Summary
  fullReportLines.push('# Raport SEO & Marketing — CoreLTB Builders');
  fullReportLines.push(`> Wygenerowano: ${timestamp}`);
  fullReportLines.push(`> Okres: ${days} dni | Agenty: GSC+GA4, Ads, Links, GBP`);
  fullReportLines.push('');

  // Executive summary
  if (insights.length > 0) {
    fullReportLines.push('## Executive Summary');
    fullReportLines.push('');
    for (const insight of insights) {
      fullReportLines.push(`- ${insight}`);
    }
    fullReportLines.push('');
  }

  // Action Items (posortowane po priorytecie)
  if (actionItems.length > 0) {
    const priorityOrder = { high: 0, medium: 1, low: 2 };
    actionItems.sort((a, b) => (priorityOrder[a.priority] || 2) - (priorityOrder[b.priority] || 2));

    const priorityIcon = { high: '🔴', medium: '🟡', low: '🟢' };

    fullReportLines.push('## Action Items');
    fullReportLines.push('');
    fullReportLines.push('| # | Priorytet | Zrodlo | Akcja |');
    fullReportLines.push('|---|-----------|--------|-------|');
    actionItems.forEach((item, i) => {
      fullReportLines.push(`| ${i + 1} | ${priorityIcon[item.priority] || '⚪'} ${item.priority} | ${item.source} | ${item.action} |`);
    });
    fullReportLines.push('');
  }

  fullReportLines.push('---');
  fullReportLines.push('');

  // Wstaw bazowy raport GSC+GA4 (bez naglowka — juz mamy swoj)
  const baseLines = baseReport.split('\n');
  const skipHeaderLines = baseLines.findIndex(l => l.startsWith('## '));
  if (skipHeaderLines > 0) {
    fullReportLines.push(...baseLines.slice(skipHeaderLines));
  } else {
    fullReportLines.push(...baseLines);
  }

  // Ads Report
  if (adsReport) {
    fullReportLines.push('');
    fullReportLines.push('---');
    fullReportLines.push('');
    fullReportLines.push(adsReport);
  }

  // Links Report
  if (linksReport) {
    fullReportLines.push('');
    fullReportLines.push('---');
    fullReportLines.push('');
    fullReportLines.push(linksReport);
  }

  // GBP Report
  if (gbpReport) {
    fullReportLines.push('');
    fullReportLines.push('---');
    fullReportLines.push('');
    fullReportLines.push(gbpReport);
  }

  // Footer
  fullReportLines.push('');
  fullReportLines.push('---');
  fullReportLines.push(`*Raport wygenerowany przez SEO Orchestrator — ${config.site.domain}*`);

  const fullReport = fullReportLines.join('\n');

  // Zapisz
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const dateStr = new Date().toISOString().split('T')[0];
  const reportPath = path.join(reportsDir, `full-report-${dateStr}.md`);
  const latestPath = path.join(reportsDir, 'latest-full-report.md');

  fs.writeFileSync(reportPath, fullReport, 'utf8');
  fs.writeFileSync(latestPath, fullReport, 'utf8');

  console.log(`│  ✅ Raport zapisany:`);
  console.log(`│     ${reportPath}`);
  console.log(`│     ${latestPath}`);
  console.log('└───────────────────────────────────────────────');
  console.log('');

  // Summary
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║  Podsumowanie                                ║');
  console.log('╠═══════════════════════════════════════════════╣');
  for (const insight of insights) {
    console.log(`║  ${insight.substring(0, 45).padEnd(45)} ║`);
  }
  if (actionItems.length > 0) {
    console.log(`║  Action items: ${String(actionItems.length).padEnd(30)} ║`);
  }
  console.log('╚═══════════════════════════════════════════════╝');
  console.log('');
}

main().catch(err => {
  console.error('Blad krytyczny:', err.message);
  console.error(err.stack);
  process.exit(1);
});
