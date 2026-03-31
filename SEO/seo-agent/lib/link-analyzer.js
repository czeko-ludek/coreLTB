/**
 * Link Building Analyzer — 12-Factor Scoring System
 *
 * Based on: SEO/analizy/link-evaluation-framework.md
 * Sources: WPPoland, ALM Corp, Respona, Editorial.link, WhitePress KB, LinkDoctor, Delante, SEOsklep24
 *
 * 12 criteria weighted by real SEO impact (not just DR):
 *   Tier A (critical):  topicRelevance 20%, regionalRelevance 15%, organicTraffic 15%, outboundLinks 10%
 *   Tier B (important):  linkPlacement 10%, dr 8%, articleMarking 8%, contentQuality 5%
 *   Tier C (fine-tuning): internalLinking 3%, publicationTime 3%, priceValue 2%, anchorOptions 1%
 */

const fs = require('fs');
const path = require('path');

const STRATEGY_PATH = path.join(__dirname, '..', '..', 'analizy', 'link-building-strategy.md');
const LINKS_DB_PATH = path.join(__dirname, '..', 'data', 'links-db.json');

// ─── Scoring weights (must sum to 1.0) ───
const WEIGHTS = {
  topicRelevance:    0.20,
  regionalRelevance: 0.15,
  organicTraffic:    0.15,
  outboundLinks:     0.10,
  linkPlacement:     0.10,
  dr:                0.08,
  articleMarking:    0.08,
  contentQuality:    0.05,
  internalLinking:   0.03,
  publicationTime:   0.03,
  priceValue:        0.02,
  anchorOptions:     0.01,
};

// ─── Keywords for topic matching ───
const TOPIC_KEYWORDS_STRONG = ['budow', 'dom', 'nieruchomo', 'architektur', 'mieszka', 'dzialk', 'projekt', 'remont', 'wykonczeni', 'instalacj', 'dach', 'fundament', 'murow', 'ciepl', 'pompa'];
const TOPIC_KEYWORDS_MEDIUM = ['ogrod', 'wnetrz', 'mebl', 'kuchni', 'lazienk', 'podlog', 'okn', 'drzwi', 'ogrodzeni', 'teren', 'energi', 'fotowolt'];
const REGIONAL_KEYWORDS = ['slask', 'slaski', 'rybnik', 'katowice', 'gliwice', 'wodzislaw', 'tychy', 'zabrze', 'zory', 'mikolow', 'jastrzebie', 'raciborz', 'jaworzno', 'row', 'opole', 'malopolsk', 'chrzanow', 'oswiecim', 'olkusz', 'kedzierzyn'];

/**
 * Initialize links database
 */
function initLinksDB() {
  const dir = path.dirname(LINKS_DB_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LINKS_DB_PATH)) {
    fs.writeFileSync(LINKS_DB_PATH, JSON.stringify({
      links: [],
      budget: { monthly: 0, spent: {} },
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

// ─── Individual scoring functions ───

/**
 * 1. Relevancja tematyczna (20%)
 * Checks if portal writes about construction/real estate/home
 */
function scoreTopicRelevance(proposal) {
  const text = `${proposal.topic || ''} ${proposal.portal || ''} ${proposal.categories || ''} ${proposal.notes || ''}`.toLowerCase();
  const strongMatches = TOPIC_KEYWORDS_STRONG.filter(k => text.includes(k)).length;
  const mediumMatches = TOPIC_KEYWORDS_MEDIUM.filter(k => text.includes(k)).length;
  const totalScore = strongMatches * 2 + mediumMatches;

  if (totalScore >= 6) return { score: 10, note: 'Portal tematyczny (budownictwo/nieruchomosci)' };
  if (totalScore >= 4) return { score: 8, note: 'Silny zwiazek tematyczny' };
  if (totalScore >= 2) return { score: 6, note: 'Czesciowy zwiazek (dom/ogrod/wnetrza)' };
  if (totalScore >= 1) return { score: 4, note: 'Slaby zwiazek tematyczny' };

  // Check if at least regional/general news
  const isNews = ['wiadomo', 'news', 'portal', 'informacyj', 'region'].some(k => text.includes(k));
  if (isNews) return { score: 3, note: 'Portal informacyjny ogolny — slaby kontekst tematyczny' };

  return { score: 1, note: 'BRAK zwiazku tematycznego — red flag' };
}

/**
 * 2. Relevancja regionalna (15%)
 * Is the portal from our region (Silesia, ROW, Malopolska)?
 */
function scoreRegionalRelevance(proposal) {
  const text = `${proposal.portal || ''} ${proposal.url || ''} ${proposal.topic || ''} ${proposal.region || ''} ${proposal.notes || ''}`.toLowerCase();
  const matches = REGIONAL_KEYWORDS.filter(k => text.includes(k));

  if (matches.length >= 3) return { score: 10, note: `Idealny region: ${matches.join(', ')}` };
  if (matches.length >= 2) return { score: 9, note: `Dobry region: ${matches.join(', ')}` };
  if (matches.length >= 1) return { score: 7, note: `Trafienie regionalne: ${matches.join(', ')}` };

  const isNational = ['polska', 'krajow', 'ogolnopol', 'narodow'].some(k => text.includes(k));
  if (isNational) return { score: 4, note: 'Portal ogolnopolski — slaby sygnal local SEO' };

  return { score: 2, note: 'Brak powiazania regionalnego' };
}

/**
 * 3. Realny ruch organiczny (15%)
 * Minimum 1000 sessions/month. Portal with traffic = Google trusts it.
 */
function scoreOrganicTraffic(proposal) {
  const traffic = proposal.traffic || 0;
  if (traffic === 0) return { score: 0, note: 'BRAK DANYCH — musisz sprawdzic w Ahrefs/Semrush!' };
  if (traffic >= 50000) return { score: 10, note: `${traffic} sesji/mies. — doskonaly` };
  if (traffic >= 20000) return { score: 9, note: `${traffic} sesji/mies. — bardzo dobry` };
  if (traffic >= 10000) return { score: 8, note: `${traffic} sesji/mies. — dobry` };
  if (traffic >= 5000) return { score: 7, note: `${traffic} sesji/mies. — solidny` };
  if (traffic >= 2000) return { score: 6, note: `${traffic} sesji/mies. — akceptowalny` };
  if (traffic >= 1000) return { score: 5, note: `${traffic} sesji/mies. — minimum` };
  if (traffic >= 500) return { score: 3, note: `${traffic} sesji/mies. — niski, ryzyko` };
  return { score: 1, note: `${traffic} sesji/mies. — martwy portal, nie kupuj` };
}

/**
 * 4. Linki wychodzace na stronie (10%)
 * Fewer outbound links = more link juice for you.
 * Formula: Your link value ≈ PageRank / outbound_links_count
 */
function scoreOutboundLinks(proposal) {
  const links = proposal.outboundLinks;
  if (links === undefined || links === null) return { score: 0, note: 'BRAK DANYCH — sprawdz istniejacy artykul sponsorowany, policz <a href> do zewn. domen' };
  if (links <= 2) return { score: 10, note: `${links} linkow wych. — Twoj link dostanie ~${Math.round(100/(links+1))}% mocy` };
  if (links <= 5) return { score: 9, note: `${links} linkow wych. — dobra koncentracja mocy (~${Math.round(100/(links+1))}%)` };
  if (links <= 10) return { score: 7, note: `${links} linkow wych. — akceptowalne rozcienczenie` };
  if (links <= 15) return { score: 5, note: `${links} linkow wych. — duze rozcienczenie link juice` };
  if (links <= 30) return { score: 3, note: `${links} linkow wych. — Twoj link dostanie ~${Math.round(100/(links+1))}% mocy` };
  return { score: 1, note: `${links} linkow wych. — link farm, prawie zero wartosci` };
}

/**
 * 5. Umiejscowienie linku (10%)
 * Where in the article will the link appear?
 * Hierarchy: 1st paragraph > middle body > last paragraph > bio > sidebar > footer
 */
function scoreLinkPlacement(proposal) {
  const placement = (proposal.linkPlacement || '').toLowerCase();
  if (!placement) return { score: 0, note: 'BRAK DANYCH — zapytaj gdzie link bedzie umieszczony' };

  if (['pierwszy', 'first', 'top', 'poczatek', 'wstep'].some(k => placement.includes(k)))
    return { score: 10, note: 'Pierwszy akapit — najwyzsza wartosc' };
  if (['body', 'tresc', 'srodek', 'kontekst', 'artykul'].some(k => placement.includes(k)))
    return { score: 8, note: 'W tresci artykulu — bardzo dobra wartosc' };
  if (['koniec', 'cta', 'last', 'ostatni', 'podsumow'].some(k => placement.includes(k)))
    return { score: 7, note: 'Koniec artykulu / CTA — dobra wartosc' };
  if (['bio', 'autor', 'firma', 'about'].some(k => placement.includes(k)))
    return { score: 4, note: 'Bio autora / O firmie — niska wartosc' };
  if (['sidebar', 'widget', 'baner', 'banner'].some(k => placement.includes(k)))
    return { score: 2, note: 'Sidebar / widget — minimalna wartosc' };
  if (['stopka', 'footer', 'bottom'].some(k => placement.includes(k)))
    return { score: 1, note: 'Stopka strony — prawie zero wartosci' };

  return { score: 6, note: `Umiejscowienie: "${placement}" — nie jestem pewien, sprawdz` };
}

/**
 * 6. DR / DA portalu (8%) — screening only, NOT the decision
 */
function scoreDR(proposal) {
  const dr = proposal.dr || 0;
  if (dr >= 60) return { score: 10, note: `DR ${dr} — ale sprawdz czy ruch jest realny (DR bez ruchu = sztuczne)` };
  if (dr >= 50) return { score: 9, note: `DR ${dr} — silny portal` };
  if (dr >= 40) return { score: 8, note: `DR ${dr} — dobry` };
  if (dr >= 30) return { score: 7, note: `DR ${dr} — solidny` };
  if (dr >= 25) return { score: 6, note: `DR ${dr} — akceptowalny` };
  if (dr >= 20) return { score: 5, note: `DR ${dr} — ok na start` };
  if (dr >= 15) return { score: 4, note: `DR ${dr} — niski ale moze byc warty dla regionu` };
  if (dr >= 10) return { score: 3, note: `DR ${dr} — slaby` };
  return { score: 1, note: `DR ${dr} — ryzyko PBN/spam` };
}

/**
 * 7. Oznaczenie artykulu (8%)
 * How is the article marked? dofollow + no noindex = best
 * Values: 'dofollow', 'nofollow', 'sponsored', 'noindex', 'dofollow_partnerski', 'dofollow_sponsorowany'
 */
function scoreArticleMarking(proposal) {
  const marking = (proposal.articleMarking || proposal.linkType || '').toLowerCase();
  if (!marking) return { score: 0, note: 'BRAK DANYCH — sprawdz rel="" na linkach w istniejacym artykule sponsorowanym' };

  if (marking.includes('noindex'))
    return { score: 0, note: 'NOINDEX — Google nie widzi strony, link BEZWARTOSCIOWY. NIE KUPUJ!' };
  if (marking.includes('nofollow') && !marking.includes('dofollow'))
    return { score: 3, note: 'rel="nofollow" — od 2019 hint, nie przekazuje pelnej mocy. Kupuj tylko przy duzym ruchu (>10k)' };
  if (marking.includes('sponsored'))
    return { score: 5, note: 'rel="sponsored" — Google traktuje jako wskazowke, moze przekazac moc ale nie musi' };
  if (marking.includes('dofollow') && marking.includes('partnerski'))
    return { score: 9, note: 'Dofollow + "material partnera" — pelna moc technicznie, dobry kompromis' };
  if (marking.includes('dofollow') && marking.includes('sponsorowany'))
    return { score: 8, note: 'Dofollow + "art. sponsorowany" — pelna moc, wyrazne oznaczenie' };
  if (marking.includes('dofollow'))
    return { score: 10, note: 'Dofollow bez oznaczenia — ideal (ale ryzyko wykrycia przez Google)' };

  return { score: 5, note: `Oznaczenie: "${marking}" — sprawdz HTML recznie` };
}

/**
 * 8. Jakosc tresci portalu (5%)
 * Does portal publish original content? Has editorial team?
 */
function scoreContentQuality(proposal) {
  const quality = (proposal.contentQuality || '').toLowerCase();
  if (!quality) return { score: 0, note: 'BRAK DANYCH — sprawdz czy portal ma oryginalne artykuly, komentarze, redakcje' };

  if (['doskonala', 'redakcja', 'oryginalne', 'profesjonaln'].some(k => quality.includes(k)))
    return { score: 10, note: 'Profesjonalna redakcja, oryginalne tresci' };
  if (['dobra', 'aktywn', 'komentarze', 'regularn'].some(k => quality.includes(k)))
    return { score: 8, note: 'Dobra jakosc, aktywna spolecznosc' };
  if (['srednia', 'mieszana', 'ok'].some(k => quality.includes(k)))
    return { score: 5, note: 'Srednia jakosc — tresci redakcyjne + sponsorowane' };
  if (['slaba', 'spam', 'same_sponsor', 'martwy'].some(k => quality.includes(k)))
    return { score: 2, note: 'Slaba jakosc — same artykuly sponsorowane lub spam' };

  return { score: 5, note: `Jakosc: "${quality}"` };
}

/**
 * 9. Podlinkowanie wewnetrzne (3%)
 * Will the article be linked from category/homepage?
 */
function scoreInternalLinking(proposal) {
  const linking = (proposal.internalLinking || '').toLowerCase();
  if (!linking) return { score: 0, note: 'BRAK DANYCH — sprawdz czy artykul bedzie podlinkowany z kategorii' };

  if (['homepage', 'glowna', 'kategoria_i_glowna'].some(k => linking.includes(k)))
    return { score: 10, note: 'Linkowanie z homepage + kategorii — doskonale' };
  if (['kategoria', 'category'].some(k => linking.includes(k)))
    return { score: 8, note: 'Linkowanie z kategorii — dobrze' };
  if (['brak', 'none', 'zakopany', 'deep'].some(k => linking.includes(k)))
    return { score: 2, note: 'Brak podlinkowania — artykul zakopany, slaba wartosc' };

  return { score: 5, note: `Podlinkowanie: "${linking}"` };
}

/**
 * 10. Czas publikacji (3%)
 */
function scorePublicationTime(proposal) {
  const time = (proposal.publicationTime || '').toLowerCase();
  if (!time) return { score: 0, note: 'BRAK DANYCH — zapytaj jak dlugo artykul zostanie na portalu' };

  if (['bezterminow', 'permanent', 'na_zawsze', 'unlimited'].some(k => time.includes(k)))
    return { score: 10, note: 'Bezterminowo — ideal' };
  if (['12', 'rok', 'year'].some(k => time.includes(k)))
    return { score: 7, note: '12 miesiecy — ok ale trzeba odnowic' };
  if (['6', 'pol_roku'].some(k => time.includes(k)))
    return { score: 5, note: '6 miesiecy — krotko, ale moze wystarczyc' };
  if (['3', 'kwartal'].some(k => time.includes(k)))
    return { score: 2, note: '3 miesiace — za krotko, Google nie zdazy zindeksowac efektu' };
  if (['1', 'miesiac'].some(k => time.includes(k)))
    return { score: 1, note: '1 miesiac — bezwartosciowe' };

  return { score: 5, note: `Czas: "${time}"` };
}

/**
 * 11. Stosunek cena/wartosc (2%)
 * Better formula: price / (DR * traffic_factor * relevance_factor)
 */
function scorePriceValue(proposal) {
  const price = proposal.price || 0;
  const dr = proposal.dr || 1;
  const traffic = proposal.traffic || 1;

  if (price === 0) return { score: 10, note: 'Darmowe — doskonale' };

  // Smart value ratio: price / (DR * sqrt(traffic/1000))
  const trafficFactor = Math.max(1, Math.sqrt(traffic / 1000));
  const smartRatio = price / (dr * trafficFactor);
  const pricePerDR = Math.round(price / dr);

  if (smartRatio <= 2) return { score: 10, note: `${price} PLN, ${pricePerDR} PLN/DR — doskonala wartosc` };
  if (smartRatio <= 5) return { score: 8, note: `${price} PLN, ${pricePerDR} PLN/DR — dobra wartosc` };
  if (smartRatio <= 10) return { score: 6, note: `${price} PLN, ${pricePerDR} PLN/DR — akceptowalna` };
  if (smartRatio <= 20) return { score: 4, note: `${price} PLN, ${pricePerDR} PLN/DR — drogo` };
  if (smartRatio <= 40) return { score: 2, note: `${price} PLN, ${pricePerDR} PLN/DR — bardzo drogo` };
  return { score: 1, note: `${price} PLN, ${pricePerDR} PLN/DR — wyrzucone pieniadze` };
}

/**
 * 12. Dozwolone anchory (1%)
 */
function scoreAnchorOptions(proposal) {
  const anchors = (proposal.anchorOptions || '').toLowerCase();
  if (!anchors) return { score: 0, note: 'BRAK DANYCH — sprawdz jakie anchory portal dopuszcza' };

  const hasExact = ['exact', 'dopasowan', 'fraza', 'keyword'].some(k => anchors.includes(k));
  const hasBrand = ['brand', 'marka', 'firma'].some(k => anchors.includes(k));
  const hasUrl = ['url', 'link', 'adres'].some(k => anchors.includes(k));
  const hasNatural = ['naturaln', 'dowolne', 'any', 'all'].some(k => anchors.includes(k));

  const optionCount = [hasExact, hasBrand, hasUrl, hasNatural].filter(Boolean).length;

  if (hasNatural || optionCount >= 3) return { score: 10, note: 'Dowolne anchory — pelna elastycznosc' };
  if (optionCount >= 2 && hasExact) return { score: 8, note: 'Exact match + inne — dobrze' };
  if (optionCount >= 2) return { score: 6, note: `Dostepne: ${anchors}` };
  if (hasBrand || hasUrl) return { score: 4, note: 'Tylko URL/brand — ogranicza strategie anchorow' };
  return { score: 2, note: `Ograniczone anchory: "${anchors}"` };
}

// ─── Map of scoring functions ───
const SCORERS = {
  topicRelevance: scoreTopicRelevance,
  regionalRelevance: scoreRegionalRelevance,
  organicTraffic: scoreOrganicTraffic,
  outboundLinks: scoreOutboundLinks,
  linkPlacement: scoreLinkPlacement,
  dr: scoreDR,
  articleMarking: scoreArticleMarking,
  contentQuality: scoreContentQuality,
  internalLinking: scoreInternalLinking,
  publicationTime: scorePublicationTime,
  priceValue: scorePriceValue,
  anchorOptions: scoreAnchorOptions,
};

/**
 * Evaluate a link proposal using all 12 factors
 *
 * @param {Object} proposal - Full proposal object:
 *   Required: { portal, dr, price }
 *   Tier A:   { topic, region, traffic, outboundLinks }
 *   Tier B:   { linkPlacement, articleMarking/linkType, contentQuality }
 *   Tier C:   { internalLinking, publicationTime, anchorOptions }
 *   Extra:    { url, targetPage, anchor, categories, notes }
 *
 * @returns {Object} - { score, verdict, breakdown, penalties, missingData, recommendations }
 */
function evaluateProposal(proposal) {
  const breakdown = {};
  let totalWeighted = 0;
  let totalWeight = 0;
  const missingData = [];

  // Run all 12 scorers
  for (const [factor, scorer] of Object.entries(SCORERS)) {
    const result = scorer(proposal);
    const weight = WEIGHTS[factor];
    const weightPct = `${Math.round(weight * 100)}%`;

    breakdown[factor] = {
      score: result.score,
      weight: weightPct,
      weighted: Math.round(result.score * weight * 100) / 100,
      note: result.note,
    };

    if (result.score === 0 && result.note.includes('BRAK DANYCH')) {
      missingData.push({ factor, weight: weightPct, question: result.note });
    } else {
      totalWeighted += result.score * weight;
      totalWeight += weight;
    }
  }

  // Normalize score if some data is missing (score based on available data)
  const normalizedScore = totalWeight > 0 ? totalWeighted / totalWeight : 0;
  const rawScore = totalWeighted; // Raw weighted sum (max 10 if all factors scored)
  const dataCompleteness = Math.round(totalWeight * 100);

  // Hard penalties (red flags that override score)
  const penalties = [];

  if (proposal.articleMarking && proposal.articleMarking.toLowerCase().includes('noindex')) {
    penalties.push('KRYTYCZNE: noindex na artykule — link BEZWARTOSCIOWY');
  }
  if ((proposal.dr || 0) < 10) {
    penalties.push('DR < 10 — ryzyko PBN/spam');
  }
  if ((proposal.traffic || 0) > 0 && proposal.traffic < 500) {
    penalties.push('Ruch < 500/mies. — portal moze byc martwy');
  }
  if ((proposal.price || 0) > 500 && (proposal.dr || 0) < 25) {
    penalties.push('Cena > 500 PLN przy DR < 25 — slaby ROI');
  }
  if ((proposal.outboundLinks || 0) > 30) {
    penalties.push(`${proposal.outboundLinks} linkow wychodzacych — link farm`);
  }

  // Neighborhood check
  const neighborhood = (proposal.neighborhood || '').toLowerCase();
  if (['kasyn', 'casino', 'pożyczk', 'pozyczk', 'krypto', 'crypto', 'bukmacher', 'gambling', 'forex'].some(k => neighborhood.includes(k))) {
    penalties.push('KRYTYCZNE: toksyczne sasiedztwo (kasyna/pozyczki/krypto) — NIE KUPUJ');
  }

  const penaltyDeduction = penalties.length * 1.5;
  const finalScore = Math.max(0, Math.round((normalizedScore - penaltyDeduction) * 10) / 10);

  // Verdict
  let verdict, verdictEmoji;
  if (penalties.some(p => p.includes('KRYTYCZNE'))) {
    verdict = 'NIE KUPUJ'; verdictEmoji = '🔴';
  } else if (finalScore >= 7) {
    verdict = 'KUP'; verdictEmoji = '🟢';
  } else if (finalScore >= 5) {
    verdict = 'ROZWAZ'; verdictEmoji = '🟡';
  } else {
    verdict = 'ODPUSC'; verdictEmoji = '🔴';
  }

  // Recommendations
  const recommendations = [];

  if (missingData.length > 0) {
    recommendations.push(`⚠️ Brakuje danych dla ${missingData.length} z 12 czynnikow (${100 - dataCompleteness}% wagi). Ocena na bazie ${dataCompleteness}% danych.`);
    recommendations.push('Przed zakupem MUSISZ sprawdzic:');
    for (const m of missingData) {
      recommendations.push(`  → [${m.weight}] ${m.question.replace('BRAK DANYCH — ', '')}`);
    }
  }

  // Target page recommendation
  if (!proposal.targetPage) {
    const regional = REGIONAL_KEYWORDS.find(k =>
      `${proposal.portal || ''} ${proposal.url || ''} ${proposal.topic || ''}`.toLowerCase().includes(k)
    );
    if (regional) {
      recommendations.push(`Linkuj do /obszar-dzialania/${regional} (portal regionalny)`);
    } else {
      recommendations.push('Linkuj do / (strona glowna) — bezpieczna opcja');
    }
  }

  // Anchor recommendation
  if (!proposal.anchor) {
    recommendations.push('Anchor mix: 40% brand "CoreLTB Builders", 30% naturalny "sprawdz oferte budowy", 20% czesciowy "firma budowlana [miasto]", 10% exact match');
  }

  return {
    score: finalScore,
    normalizedScore: Math.round(normalizedScore * 10) / 10,
    dataCompleteness: `${dataCompleteness}%`,
    verdict: `${verdictEmoji} ${verdict}`,
    breakdown,
    penalties,
    missingData,
    recommendations,
  };
}

/**
 * Format evaluation result as readable markdown
 */
function formatEvaluation(portal, result) {
  const lines = [];
  lines.push(`### ${result.verdict} — ${portal} (${result.score}/10)`);
  lines.push('');

  if (result.dataCompleteness !== '100%') {
    lines.push(`> ⚠️ Ocena na bazie ${result.dataCompleteness} danych. Brakujace czynniki oznaczone gwiazdka.`);
    lines.push('');
  }

  lines.push('| # | Czynnik | Waga | Ocena | Wazona | Uwaga |');
  lines.push('|---|---------|------|-------|--------|-------|');

  const factorNames = {
    topicRelevance: 'Relevancja tematyczna',
    regionalRelevance: 'Relevancja regionalna',
    organicTraffic: 'Ruch organiczny',
    outboundLinks: 'Linki wychodzace',
    linkPlacement: 'Umiejscowienie linku',
    dr: 'DR portalu',
    articleMarking: 'Oznaczenie artykulu',
    contentQuality: 'Jakosc tresci',
    internalLinking: 'Podlinkowanie wewn.',
    publicationTime: 'Czas publikacji',
    priceValue: 'Cena/wartosc',
    anchorOptions: 'Dozwolone anchory',
  };

  let i = 1;
  for (const [factor, data] of Object.entries(result.breakdown)) {
    const isMissing = data.score === 0 && data.note.includes('BRAK DANYCH');
    const marker = isMissing ? ' *' : '';
    lines.push(`| ${i} | ${factorNames[factor] || factor}${marker} | ${data.weight} | ${data.score}/10 | ${data.weighted} | ${data.note} |`);
    i++;
  }

  lines.push('');

  if (result.penalties.length > 0) {
    lines.push('**Kary:**');
    for (const p of result.penalties) {
      lines.push(`- ❌ ${p}`);
    }
    lines.push('');
  }

  if (result.recommendations.length > 0) {
    lines.push('**Rekomendacje:**');
    for (const r of result.recommendations) {
      lines.push(`- ${r}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

/**
 * Add a purchased link to database
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

  const month = link.date.substring(0, 7);
  db.budget.spent[month] = (db.budget.spent[month] || 0) + (link.price || 0);

  fs.writeFileSync(LINKS_DB_PATH, JSON.stringify(db, null, 2));
  return link;
}

/**
 * Generate link building report
 */
function generateLinkReport() {
  const db = initLinksDB();
  const lines = [];

  lines.push('# Raport Link Building — coreltb.pl');
  lines.push(`> Wygenerowano: ${new Date().toISOString().split('T')[0]}`);
  lines.push('');

  const totalLinks = db.links.length;
  const totalSpent = db.links.reduce((s, l) => s + (l.price || 0), 0);
  const indexedCount = db.links.filter(l => l.indexed).length;

  lines.push('## Podsumowanie');
  lines.push('');
  lines.push('| Metryka | Wartosc |');
  lines.push('|---------|---------|');
  lines.push(`| Linki kupione | ${totalLinks} |`);
  lines.push(`| Zaindeksowane | ${indexedCount}/${totalLinks} |`);
  lines.push(`| Wydano lacznie | ${totalSpent} PLN |`);
  lines.push(`| Budzet mieseczny | ${db.budget.monthly || 'nie ustalony'} PLN |`);
  lines.push('');

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
  formatEvaluation,
  addLink,
  generateLinkReport,
  // Export for testing
  WEIGHTS,
  SCORERS,
};
