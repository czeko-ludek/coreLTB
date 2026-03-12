#!/usr/bin/env node

/**
 * SEO Agent — Elever (CoreLTB)
 *
 * Orkiestrator: pobiera dane z GSC + GA4, analizuje, generuje raport Markdown.
 *
 * Użycie:
 *   node agent.js                  — raport domyślny (28 dni)
 *   node agent.js --days 7         — ostatnie 7 dni
 *   node agent.js --days 90        — ostatnie 90 dni
 *   node agent.js --actions        — pokaż rejestr zmian SEO
 *   node agent.js --gsc-only       — tylko dane GSC (bez GA4)
 *   node agent.js --dry-run        — test połączenia (bez raportu)
 *   node agent.js --test-auth      — test uwierzytelnienia GSC + GA4
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
const gscOnly = hasFlag('--gsc-only');
const dryRun = hasFlag('--dry-run');
const showActions = hasFlag('--actions');

// ─── Modules ─────────────────────────────────────
const { testAuth } = require('./lib/auth');
const gsc = require('./lib/gsc');
const ga4 = require('./lib/ga4');
const analyzer = require('./lib/analyzer');
const { generateReport } = require('./lib/formatter');

// ─── Test Auth ───────────────────────────────────
if (hasFlag('--test-auth')) {
  testAuth().then(result => {
    console.log('\n🔐 Test uwierzytelnienia:\n');
    console.log(`  GSC: ${result.gsc ? '✅' : '❌'} ${result.details.gsc}`);
    console.log(`  GA4: ${result.ga4 ? '✅' : '❌'} ${result.details.ga4}`);
    console.log('');
    process.exit(result.gsc ? 0 : 1);
  }).catch(err => {
    console.error(`\n❌ ${err.message}\n`);
    process.exit(1);
  });
  return;
}

// ─── Show Actions ────────────────────────────────
if (showActions) {
  const actions = JSON.parse(fs.readFileSync(ACTIONS_PATH, 'utf8'));
  console.log('\n📋 Rejestr zmian SEO:\n');
  for (const a of actions.actions) {
    console.log(`  [${a.id}] ${a.date} | ${a.type} | ${a.status}`);
    console.log(`       ${a.description}`);
    if (a.notes) console.log(`       📝 ${a.notes}`);
    console.log('');
  }
  process.exit(0);
}

// ─── Main ────────────────────────────────────────
async function main() {
  console.log('');
  console.log('╔═══════════════════════════════════════════════╗');
  console.log('║       📊 SEO Agent — Elever (CoreLTB)        ║');
  console.log('╚═══════════════════════════════════════════════╝');
  console.log(`  Domena:  ${config.site.domain}`);
  console.log(`  Okres:   ${days} dni`);
  console.log(`  Tryb:    ${dryRun ? 'DRY RUN (test)' : gscOnly ? 'GSC only' : 'GSC + GA4'}`);
  console.log('');

  const results = {
    config,
    gsc: {},
    ga4: {},
    analysis: {},
    timestamp: new Date().toISOString().replace('T', ' ').split('.')[0],
  };

  // ─── GSC Data ────────────────────────────────
  try {
    console.log('🔍 Pobieram dane z Google Search Console...');

    if (dryRun) {
      console.log('  ✅ Połączenie GSC OK (dry run)');
    } else {
      const [queries, pages, countries, devices] = await Promise.all([
        gsc.getTopQueries(config.gsc.siteUrl, days, config.defaults.rowLimit),
        gsc.getTopPages(config.gsc.siteUrl, days, config.defaults.rowLimit),
        gsc.getCountries(config.gsc.siteUrl, days),
        gsc.getDevices(config.gsc.siteUrl, days),
      ]);

      results.gsc = {
        queries: { current: queries.current, previous: queries.previous },
        pages: { current: pages.current, previous: pages.previous },
        countries,
        devices,
      };

      console.log(`  ✅ GSC: ${queries.current.length} fraz, ${pages.current.length} stron`);
    }
  } catch (err) {
    console.error(`  ❌ GSC Error: ${err.message}`);
    if (err.message.includes('Nie można uwierzytelnić')) {
      process.exit(1);
    }
  }

  // ─── GA4 Data ────────────────────────────────
  if (!gscOnly && !dryRun && config.ga4.propertyId) {
    try {
      console.log('📈 Pobieram dane z Google Analytics 4...');

      const [overview, topPages, events, sources, countriesGA4] = await Promise.all([
        ga4.getOverview(config.ga4.propertyId, days),
        ga4.getTopPagesGA4(config.ga4.propertyId, days),
        ga4.getTopEvents(config.ga4.propertyId, days),
        ga4.getTrafficSources(config.ga4.propertyId, days),
        ga4.getCountriesGA4(config.ga4.propertyId, days),
      ]);

      results.ga4 = { overview, topPages, events, sources, countries: countriesGA4 };
      console.log(`  ✅ GA4: dane pobrane`);
    } catch (err) {
      console.error(`  ⚠️  GA4 Error: ${err.message}`);
      console.error('  → Kontynuuję bez GA4...');
    }
  } else if (!config.ga4.propertyId) {
    console.log('⚠️  GA4 propertyId nie skonfigurowany — pomijam');
  }

  if (dryRun) {
    console.log('\n✅ Dry run zakończony pomyślnie.');
    process.exit(0);
  }

  // ─── Analysis ────────────────────────────────
  console.log('🧮 Analizuję dane...');

  if (results.gsc.queries) {
    results.analysis.queryMovers = analyzer.compareData(
      results.gsc.queries.current,
      results.gsc.queries.previous
    );

    results.analysis.pageMovers = analyzer.compareData(
      results.gsc.pages?.current || [],
      results.gsc.pages?.previous || []
    );

    results.analysis.keywordGroups = analyzer.groupKeywords(
      results.gsc.queries.current,
      config.keywordGroups
    );

    results.analysis.opportunities = analyzer.findOpportunities(
      results.gsc.queries.current,
      config
    );

    results.analysis.alerts = analyzer.generateAlerts(
      results.gsc.queries.current,
      results.gsc.queries.previous,
      config
    );

    results.analysis.actionCorrelations = analyzer.correlateActions(
      ACTIONS_PATH,
      results.analysis.queryMovers,
      results.analysis.pageMovers
    );
  }

  // ─── Generate Report ────────────────────────
  console.log('📝 Generuję raport...');
  const report = generateReport(results);

  // Zapisz raport
  const reportsDir = path.join(__dirname, 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const dateStr = new Date().toISOString().split('T')[0];
  const reportPath = path.join(reportsDir, `report-${dateStr}.md`);
  const latestPath = path.join(reportsDir, 'latest-report.md');

  fs.writeFileSync(reportPath, report, 'utf8');
  fs.writeFileSync(latestPath, report, 'utf8');

  console.log('');
  console.log(`✅ Raport zapisany:`);
  console.log(`   📄 ${reportPath}`);
  console.log(`   📄 ${latestPath} (latest)`);
  console.log('');

  // Pokaż summary
  const alertCount = results.analysis.alerts?.length || 0;
  const oppCount = results.analysis.opportunities?.length || 0;
  if (alertCount > 0) console.log(`  🚨 ${alertCount} alertów`);
  if (oppCount > 0) console.log(`  💡 ${oppCount} szans do wykorzystania`);
  console.log('');
}

main().catch(err => {
  console.error('💥 Błąd krytyczny:', err.message);
  console.error(err.stack);
  process.exit(1);
});
