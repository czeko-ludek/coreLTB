/**
 * Analyzer — analiza zmian, korelacja, alerty, szanse
 *
 * 1. compareData     — porównanie current vs previous (top movers)
 * 2. groupKeywords   — grupowanie fraz wg config.keywordGroups
 * 3. findOpportunities — wysoka widoczność + niski CTR
 * 4. generateAlerts  — spadki pozycji/kliknięć/impresji
 * 5. correlateActions — korelacja zmian SEO z efektami
 */

const fs = require('fs');
const path = require('path');

/**
 * Mapuje rows GSC na obiekt { key: metrics }
 */
function rowsToMap(rows) {
  const map = {};
  for (const row of rows) {
    const key = (row.keys || []).join(' | ');
    map[key] = {
      clicks: row.clicks || 0,
      impressions: row.impressions || 0,
      ctr: row.ctr || 0,
      position: row.position || 0,
    };
  }
  return map;
}

/**
 * 1. Top Movers — frazy/strony z największą zmianą
 */
function compareData(currentRows, previousRows) {
  const currentMap = rowsToMap(currentRows);
  const previousMap = rowsToMap(previousRows);
  const allKeys = new Set([...Object.keys(currentMap), ...Object.keys(previousMap)]);

  const movers = [];
  const newEntries = [];
  const lostEntries = [];

  for (const key of allKeys) {
    const curr = currentMap[key];
    const prev = previousMap[key];

    if (curr && !prev) {
      newEntries.push({ key, ...curr });
      continue;
    }
    if (!curr && prev) {
      lostEntries.push({ key, ...prev });
      continue;
    }
    if (curr && prev) {
      movers.push({
        key,
        current: curr,
        previous: prev,
        clicksDelta: curr.clicks - prev.clicks,
        impressionsDelta: curr.impressions - prev.impressions,
        ctrDelta: curr.ctr - prev.ctr,
        positionDelta: curr.position - prev.position, // ujemna = poprawa
      });
    }
  }

  // Sortuj: rosnące (najwięcej kliknięć zyskanych)
  const rising = [...movers]
    .filter(m => m.clicksDelta > 0)
    .sort((a, b) => b.clicksDelta - a.clicksDelta)
    .slice(0, 15);

  // Spadające
  const falling = [...movers]
    .filter(m => m.clicksDelta < 0)
    .sort((a, b) => a.clicksDelta - b.clicksDelta)
    .slice(0, 15);

  return { rising, falling, newEntries: newEntries.slice(0, 10), lostEntries: lostEntries.slice(0, 10) };
}

/**
 * 2. Grupowanie fraz kluczowych
 */
function groupKeywords(rows, keywordGroups) {
  const groups = {};

  for (const [groupName, patterns] of Object.entries(keywordGroups)) {
    groups[groupName] = {
      keywords: [],
      totalClicks: 0,
      totalImpressions: 0,
      avgPosition: 0,
      avgCtr: 0,
    };

    for (const row of rows) {
      const query = (row.keys?.[0] || '').toLowerCase();
      if (patterns.some(p => query.includes(p.toLowerCase()))) {
        groups[groupName].keywords.push({
          query: row.keys?.[0],
          clicks: row.clicks,
          impressions: row.impressions,
          ctr: row.ctr,
          position: row.position,
        });
        groups[groupName].totalClicks += row.clicks || 0;
        groups[groupName].totalImpressions += row.impressions || 0;
      }
    }

    const kws = groups[groupName].keywords;
    if (kws.length > 0) {
      groups[groupName].avgPosition = kws.reduce((s, k) => s + k.position, 0) / kws.length;
      groups[groupName].avgCtr = groups[groupName].totalImpressions > 0
        ? groups[groupName].totalClicks / groups[groupName].totalImpressions
        : 0;
    }
  }

  return groups;
}

/**
 * 3. Szanse — wysoka widoczność, niski CTR
 */
function findOpportunities(rows, config) {
  const { opportunityMinImpressions, opportunityMaxCtr } = config.thresholds;
  return rows
    .filter(r =>
      r.impressions >= opportunityMinImpressions &&
      r.ctr <= opportunityMaxCtr &&
      r.position <= 20
    )
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 15)
    .map(r => ({
      query: r.keys?.[0],
      impressions: r.impressions,
      clicks: r.clicks,
      ctr: r.ctr,
      position: r.position,
      potentialClicks: Math.round(r.impressions * 0.05), // szacunkowy CTR 5%
    }));
}

/**
 * 4. Alerty — spadki
 */
function generateAlerts(currentRows, previousRows, config) {
  const currentMap = rowsToMap(currentRows);
  const previousMap = rowsToMap(previousRows);
  const alerts = [];

  for (const [key, prev] of Object.entries(previousMap)) {
    const curr = currentMap[key];
    if (!curr) continue;
    if (prev.clicks < config.thresholds.minClicksForAlert) continue;

    // Spadek pozycji
    if (curr.position - prev.position > config.thresholds.positionDropAlert) {
      alerts.push({
        type: 'position_drop',
        severity: 'high',
        key,
        from: prev.position.toFixed(1),
        to: curr.position.toFixed(1),
        delta: (curr.position - prev.position).toFixed(1),
      });
    }

    // Spadek CTR
    if (prev.ctr > 0) {
      const ctrDrop = ((prev.ctr - curr.ctr) / prev.ctr) * 100;
      if (ctrDrop > config.thresholds.ctrDropAlertPct) {
        alerts.push({
          type: 'ctr_drop',
          severity: 'medium',
          key,
          from: (prev.ctr * 100).toFixed(1) + '%',
          to: (curr.ctr * 100).toFixed(1) + '%',
          delta: `-${ctrDrop.toFixed(0)}%`,
        });
      }
    }

    // Spadek impresji
    if (prev.impressions > 0) {
      const impDrop = ((prev.impressions - curr.impressions) / prev.impressions) * 100;
      if (impDrop > config.thresholds.impressionDropAlertPct) {
        alerts.push({
          type: 'impression_drop',
          severity: 'medium',
          key,
          from: prev.impressions,
          to: curr.impressions,
          delta: `-${impDrop.toFixed(0)}%`,
        });
      }
    }
  }

  return alerts.sort((a, b) => {
    const sev = { high: 0, medium: 1, low: 2 };
    return (sev[a.severity] || 2) - (sev[b.severity] || 2);
  });
}

/**
 * 5. Korelacja zmian SEO z efektami
 */
function correlateActions(actionsPath, queryData, pageData) {
  if (!fs.existsSync(actionsPath)) return [];

  const { actions } = JSON.parse(fs.readFileSync(actionsPath, 'utf8'));
  const now = new Date();

  return actions
    .filter(a => a.status === 'active')
    .map(action => {
      const actionDate = new Date(action.date);
      const daysSince = Math.floor((now - actionDate) / (1000 * 60 * 60 * 24));

      let verdict = 'ZA_WCZESNIE';
      let evidence = [];

      if (daysSince < 3) {
        verdict = 'ZA_WCZESNIE';
      } else if (daysSince < 7) {
        verdict = 'PRAWDOPODOBNE';
      } else {
        // Sprawdź czy dotknięte strony/frazy się poprawiły
        const hasPositiveSignals = checkPositiveSignals(action, queryData, pageData);
        if (hasPositiveSignals.positive) {
          verdict = 'POTWIERDZONE';
          evidence = hasPositiveSignals.evidence;
        } else if (hasPositiveSignals.negative) {
          verdict = 'NEGATYWNE';
          evidence = hasPositiveSignals.evidence;
        } else {
          verdict = 'BRAK_EFEKTU';
        }
      }

      return {
        ...action,
        daysSince,
        verdict,
        evidence,
      };
    });
}

function checkPositiveSignals(action, queryData, pageData) {
  // Uproszczona logika — można rozbudować
  const result = { positive: false, negative: false, evidence: [] };

  if (!queryData?.rising || !queryData?.falling) return result;

  // Sprawdź czy targetowane frazy rosną
  for (const kw of action.keywords || []) {
    const rising = queryData.rising.find(r => r.key.toLowerCase().includes(kw.toLowerCase()));
    if (rising) {
      result.positive = true;
      result.evidence.push(`↑ "${rising.key}" +${rising.clicksDelta} kliknięć`);
    }
    const falling = queryData.falling.find(r => r.key.toLowerCase().includes(kw.toLowerCase()));
    if (falling) {
      result.negative = true;
      result.evidence.push(`↓ "${falling.key}" ${falling.clicksDelta} kliknięć`);
    }
  }

  return result;
}

module.exports = {
  compareData,
  groupKeywords,
  findOpportunities,
  generateAlerts,
  correlateActions,
};
