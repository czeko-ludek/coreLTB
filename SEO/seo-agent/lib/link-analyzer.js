/**
 * Link Building Analyzer
 *
 * Zadania:
 * 1. Analiza propozycji linkow (WhitePress, inne zrodla)
 * 2. Ocena jakosci portalu (DR, ruch, tematyka, cena/wartosc)
 * 3. Rekomendacja anchor textu
 * 4. Monitoring zakupionych linkow (indeksacja, efekt)
 * 5. Raport budzetu i ROI
 */

const fs = require('fs');
const path = require('path');

const STRATEGY_PATH = path.join(__dirname, '..', '..', 'analizy', 'link-building-strategy.md');
const LINKS_DB_PATH = path.join(__dirname, '..', 'data', 'links-db.json');

/**
 * Inicjalizuje plik bazy linkow jesli nie istnieje
 */
function initLinksDB() {
  const dir = path.dirname(LINKS_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LINKS_DB_PATH)) {
    fs.writeFileSync(LINKS_DB_PATH, JSON.stringify({
      links: [],
      budget: {
        monthly: 0,
        spent: {},
      },
      targets: {
        '/': { priority: 2, anchorsMix: [] },
        '/obszar-dzialania/wodzislaw-slaski': { priority: 1, anchorsMix: [] },
        '/obszar-dzialania/rybnik': { priority: 1, anchorsMix: [] },
        '/obszar-dzialania/zory': { priority: 1, anchorsMix: [] },
        '/obszar-dzialania/katowice': { priority: 1, anchorsMix: [] },
        '/obszar-dzialania/gliwice': { priority: 1, anchorsMix: [] },
        '/wycena': { priority: 3, anchorsMix: [] },
        '/projekty': { priority: 3, anchorsMix: [] },
      },
    }, null, 2));
  }
  return JSON.parse(fs.readFileSync(LINKS_DB_PATH, 'utf8'));
}

/**
 * Ocenia propozycje linku
 * @param {Object} proposal - { portal, url, dr, traffic, price, linkType, topic, anchor, targetPage, notes }
 * @returns {Object} - { score, verdict, breakdown, recommendations }
 */
function evaluateProposal(proposal) {
  const scores = {};

  // 1. DR/DA portalu (25%)
  const dr = proposal.dr || 0;
  if (dr >= 50) scores.dr = 10;
  else if (dr >= 40) scores.dr = 9;
  else if (dr >= 30) scores.dr = 8;
  else if (dr >= 25) scores.dr = 7;
  else if (dr >= 20) scores.dr = 6;
  else if (dr >= 15) scores.dr = 5;
  else if (dr >= 10) scores.dr = 3;
  else scores.dr = 1;

  // 2. Relevancja tematyczna (25%)
  const topicKeywords = ['budow', 'dom', 'nieruchomo', 'architektur', 'remont', 'mieszka', 'dzialk', 'projekt'];
  const topicLower = (proposal.topic || '').toLowerCase();
  const topicMatches = topicKeywords.filter(k => topicLower.includes(k)).length;
  if (topicMatches >= 3) scores.topic = 10;
  else if (topicMatches >= 2) scores.topic = 8;
  else if (topicMatches >= 1) scores.topic = 6;
  else {
    // Sprawdz portale ogolne/regionalne
    const regionalKeywords = ['slask', 'slaski', 'rybnik', 'katowice', 'gliwice', 'wodzislaw', 'tychy', 'zabrze', 'zory', 'region'];
    const isRegional = regionalKeywords.some(k => topicLower.includes(k));
    scores.topic = isRegional ? 5 : 2;
  }

  // 3. Relevancja regionalna (20%)
  const regionalKeywords = ['slask', 'slaski', 'rybnik', 'katowice', 'gliwice', 'wodzislaw', 'tychy', 'zabrze', 'zory', 'mikolow', 'jastrzebie', 'raciborz', 'jaworzno', 'region'];
  const portalLower = ((proposal.portal || '') + ' ' + (proposal.url || '') + ' ' + (proposal.topic || '')).toLowerCase();
  const regionalMatches = regionalKeywords.filter(k => portalLower.includes(k)).length;
  if (regionalMatches >= 2) scores.regional = 10;
  else if (regionalMatches >= 1) scores.regional = 8;
  else {
    // Czy to portal ogolnopolski? Tez ok
    const nationalKeywords = ['polska', 'pl', 'krajow', 'ogolnopol'];
    const isNational = nationalKeywords.some(k => portalLower.includes(k));
    scores.regional = isNational ? 5 : 3;
  }

  // 4. Ruch organiczny portalu (15%)
  const traffic = proposal.traffic || 0;
  if (traffic >= 50000) scores.traffic = 10;
  else if (traffic >= 20000) scores.traffic = 9;
  else if (traffic >= 10000) scores.traffic = 8;
  else if (traffic >= 5000) scores.traffic = 7;
  else if (traffic >= 2000) scores.traffic = 6;
  else if (traffic >= 1000) scores.traffic = 5;
  else if (traffic >= 500) scores.traffic = 3;
  else scores.traffic = 1;

  // 5. Stosunek cena/wartosc (15%)
  const price = proposal.price || 0;
  const valueRatio = dr > 0 ? price / dr : price; // PLN per DR point
  if (price === 0) scores.value = 10;
  else if (valueRatio <= 5) scores.value = 10;
  else if (valueRatio <= 10) scores.value = 8;
  else if (valueRatio <= 15) scores.value = 6;
  else if (valueRatio <= 20) scores.value = 5;
  else if (valueRatio <= 30) scores.value = 3;
  else scores.value = 1;

  // Srednia wazona
  const totalScore = (
    scores.dr * 0.25 +
    scores.topic * 0.25 +
    scores.regional * 0.20 +
    scores.traffic * 0.15 +
    scores.value * 0.15
  );

  // Kary (red flags)
  const penalties = [];
  if (proposal.linkType === 'nofollow') {
    penalties.push('Link nofollow — nie przekazuje mocy SEO');
  }
  if (dr < 10) {
    penalties.push('DR ponizej 10 — ryzyko PBN/spam');
  }
  if (traffic < 500) {
    penalties.push('Bardzo niski ruch organiczny — portal moze byc martwy');
  }
  if (price > 500 && dr < 25) {
    penalties.push('Drogi link przy niskim DR — slaby ROI');
  }

  const penaltyScore = Math.max(0, totalScore - penalties.length * 1.5);

  // Werdykt
  let verdict;
  if (penaltyScore >= 7) verdict = 'KUP';
  else if (penaltyScore >= 5) verdict = 'ROZWAZ';
  else verdict = 'ODPUSC';

  // Rekomendacje
  const recommendations = [];

  // Rekomendacja docelowej strony
  if (!proposal.targetPage) {
    if (regionalMatches >= 1) {
      const matchedCity = regionalKeywords.find(k => portalLower.includes(k));
      recommendations.push(`Linkuj do /obszar-dzialania/${matchedCity || 'rybnik'} (portal regionalny)`);
    } else if (topicMatches >= 2) {
      recommendations.push('Linkuj do / (strona glowna) lub /oferta (portal branzowy)');
    } else {
      recommendations.push('Linkuj do / (strona glowna) — bezpieczna opcja');
    }
  }

  // Rekomendacja anchora
  if (!proposal.anchor) {
    const anchorOptions = [
      { type: 'brand', example: 'CoreLTB Builders' },
      { type: 'naturalny', example: 'sprawdz oferte' },
      { type: 'czesciowy', example: 'firma budowlana z regionu' },
    ];
    recommendations.push(`Uzyj anchora: "${anchorOptions[Math.floor(Math.random() * anchorOptions.length)].example}"`);
  }

  return {
    score: Math.round(penaltyScore * 10) / 10,
    verdict,
    breakdown: {
      dr: { score: scores.dr, weight: '25%', value: dr },
      topic: { score: scores.topic, weight: '25%', value: proposal.topic },
      regional: { score: scores.regional, weight: '20%' },
      traffic: { score: scores.traffic, weight: '15%', value: traffic },
      value: { score: scores.value, weight: '15%', pricePerDR: Math.round(valueRatio) },
    },
    penalties,
    recommendations,
  };
}

/**
 * Dodaje link do bazy
 */
function addLink(linkData) {
  const db = initLinksDB();
  const id = db.links.length + 1;
  const link = {
    id,
    date: new Date().toISOString().split('T')[0],
    ...linkData,
    status: 'purchased',
    indexed: false,
    effect: null,
  };
  db.links.push(link);

  // Aktualizuj budzet
  const month = link.date.substring(0, 7);
  db.budget.spent[month] = (db.budget.spent[month] || 0) + (link.price || 0);

  fs.writeFileSync(LINKS_DB_PATH, JSON.stringify(db, null, 2));
  return link;
}

/**
 * Generuje raport linkowy
 */
function generateLinkReport() {
  const db = initLinksDB();
  const lines = [];

  lines.push('# Raport Link Building — coreltb.pl');
  lines.push(`> Wygenerowano: ${new Date().toISOString().split('T')[0]}`);
  lines.push('');

  // Podsumowanie
  const totalLinks = db.links.length;
  const totalSpent = db.links.reduce((s, l) => s + (l.price || 0), 0);
  const indexedCount = db.links.filter(l => l.indexed).length;

  lines.push('## Podsumowanie');
  lines.push('');
  lines.push(`| Metryka | Wartosc |`);
  lines.push(`|---------|---------|`);
  lines.push(`| Linki kupione | ${totalLinks} |`);
  lines.push(`| Zaindeksowane | ${indexedCount}/${totalLinks} |`);
  lines.push(`| Wydano lacznie | ${totalSpent} PLN |`);
  lines.push(`| Budzet mieseczny | ${db.budget.monthly || 'nie ustalony'} PLN |`);
  lines.push('');

  // Wydatki per miesiac
  if (Object.keys(db.budget.spent).length > 0) {
    lines.push('## Wydatki miesiecznie');
    lines.push('');
    lines.push('| Miesiac | Wydano |');
    lines.push('|---------|--------|');
    for (const [month, amount] of Object.entries(db.budget.spent)) {
      lines.push(`| ${month} | ${amount} PLN |`);
    }
    lines.push('');
  }

  // Lista linkow
  if (db.links.length > 0) {
    lines.push('## Zakupione linki');
    lines.push('');
    lines.push('| # | Data | Portal | DR | Cena | Docelowa | Anchor | Indexed | Efekt |');
    lines.push('|---|------|--------|-----|------|----------|--------|---------|-------|');
    for (const l of db.links) {
      lines.push(`| ${l.id} | ${l.date} | ${l.portal || '-'} | ${l.dr || '-'} | ${l.price || 0} PLN | ${l.targetPage || '-'} | ${l.anchor || '-'} | ${l.indexed ? 'tak' : 'nie'} | ${l.effect || '-'} |`);
    }
    lines.push('');
  }

  // Rozklad linkow po stronach docelowych
  const targetCount = {};
  for (const l of db.links) {
    const target = l.targetPage || 'brak';
    targetCount[target] = (targetCount[target] || 0) + 1;
  }
  if (Object.keys(targetCount).length > 0) {
    lines.push('## Rozklad linkow po stronach docelowych');
    lines.push('');
    lines.push('| Strona | Linki |');
    lines.push('|--------|-------|');
    for (const [page, count] of Object.entries(targetCount).sort((a, b) => b[1] - a[1])) {
      lines.push(`| ${page} | ${count} |`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

module.exports = {
  initLinksDB,
  evaluateProposal,
  addLink,
  generateLinkReport,
};
