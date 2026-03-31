/**
 * Formatter — generuje raport Markdown po polsku
 *
 * 11 sekcji:
 * a. Przegląd (GSC + GA4)
 * b. Grupy słów kluczowych
 * c. Top movers keywords (↑↓✨❌)
 * d. Top movers strony
 * e. Źródła ruchu (GA4)
 * f. Kraje (GSC)
 * g. Urządzenia (GSC)
 * h. Wpływ zmian SEO (werdykty)
 * i. Szanse (wysoka widoczność + niski CTR)
 * j. Alerty (spadki)
 * k. Rekomendacje
 */

const VERDICT_LABELS = {
  POTWIERDZONE: '✅ POTWIERDZONE',
  PRAWDOPODOBNE: '🔄 PRAWDOPODOBNE',
  ZA_WCZESNIE: '⏳ ZA WCZESNIE',
  BRAK_EFEKTU: '⚪ BRAK EFEKTU',
  NEGATYWNE: '🔴 NEGATYWNE',
};

function formatNumber(n) {
  if (n === undefined || n === null) return '-';
  return Number(n).toLocaleString('pl-PL');
}

function formatPct(n) {
  if (n === undefined || n === null) return '-';
  return (n * 100).toFixed(1) + '%';
}

function formatPos(n) {
  if (n === undefined || n === null) return '-';
  return Number(n).toFixed(1);
}

function formatDelta(n, suffix = '') {
  if (n > 0) return `+${formatNumber(n)}${suffix}`;
  return `${formatNumber(n)}${suffix}`;
}

function generateReport(data) {
  const { config, gsc, ga4, analysis, timestamp } = data;
  const lines = [];

  const add = (line = '') => lines.push(line);

  // ─── NAGŁÓWEK ──────────────────────────────────
  add(`# 📊 Raport SEO — ${config.site.name}`);
  add(`> Wygenerowano: ${timestamp}`);
  add(`> Okres: ${config.defaults.days} dni | Porównanie z poprzednimi ${config.defaults.compareDays} dniami`);
  add('');

  // ─── a. PRZEGLĄD GSC ──────────────────────────
  add('## 🔍 Przegląd — Google Search Console');
  add('');
  if (gsc?.queries?.current?.length > 0) {
    const totalClicks = gsc.queries.current.reduce((s, r) => s + (r.clicks || 0), 0);
    const totalImpressions = gsc.queries.current.reduce((s, r) => s + (r.impressions || 0), 0);
    const avgPosition = gsc.queries.current.reduce((s, r) => s + (r.position || 0), 0) / gsc.queries.current.length;
    const avgCtr = totalImpressions > 0 ? totalClicks / totalImpressions : 0;

    const prevClicks = (gsc.queries.previous || []).reduce((s, r) => s + (r.clicks || 0), 0);
    const prevImpressions = (gsc.queries.previous || []).reduce((s, r) => s + (r.impressions || 0), 0);

    add('| Metryka | Obecny okres | Poprzedni okres | Zmiana |');
    add('|---------|-------------|-----------------|--------|');
    add(`| Kliknięcia | ${formatNumber(totalClicks)} | ${formatNumber(prevClicks)} | ${formatDelta(totalClicks - prevClicks)} |`);
    add(`| Wyświetlenia | ${formatNumber(totalImpressions)} | ${formatNumber(prevImpressions)} | ${formatDelta(totalImpressions - prevImpressions)} |`);
    add(`| Śr. CTR | ${formatPct(avgCtr)} | - | - |`);
    add(`| Śr. pozycja | ${formatPos(avgPosition)} | - | - |`);
    add(`| Unikalne frazy | ${formatNumber(gsc.queries.current.length)} | ${formatNumber((gsc.queries.previous || []).length)} | - |`);
  } else {
    add('*Brak danych GSC — sprawdź konfigurację i uwierzytelnienie.*');
  }
  add('');

  // ─── PRZEGLĄD GA4 ──────────────────────────────
  if (ga4?.overview?.current?.rows?.length > 0) {
    add('## 📈 Przegląd — Google Analytics 4');
    add('');
    const curr = ga4.overview.current.rows[0]?.metricValues || [];
    const prev = ga4.overview.previous?.rows?.[0]?.metricValues || [];

    // Metric order matches ga4.js getOverview(): sessions, totalUsers, screenPageViews, bounceRate, averageSessionDuration, engagementRate, newUsers
    const metricDefs = [
      { name: 'Sesje', format: 'number' },
      { name: 'Użytkownicy', format: 'number' },
      { name: 'Odsłony', format: 'number' },
      { name: 'Bounce Rate', format: 'percent' },
      { name: 'Śr. czas sesji', format: 'duration' },
      { name: 'Engagement Rate', format: 'percent' },
      { name: 'Nowi użytkownicy', format: 'number' },
    ];

    function formatGA4Value(raw, format) {
      if (!raw || raw === '-') return '-';
      const v = parseFloat(raw);
      if (isNaN(v)) return raw;
      switch (format) {
        case 'percent': return (v * 100).toFixed(1) + '%';
        case 'duration': {
          const mins = Math.floor(v / 60);
          const secs = Math.round(v % 60);
          return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
        }
        case 'number':
        default: return formatNumber(Math.round(v));
      }
    }

    add('| Metryka | Obecny okres | Poprzedni okres | Zmiana |');
    add('|---------|-------------|-----------------|--------|');
    metricDefs.forEach((def, i) => {
      const cRaw = curr[i]?.value;
      const pRaw = prev[i]?.value;
      const c = formatGA4Value(cRaw, def.format);
      const p = formatGA4Value(pRaw, def.format);

      let delta = '-';
      if (cRaw && pRaw && !isNaN(parseFloat(cRaw)) && !isNaN(parseFloat(pRaw)) && parseFloat(pRaw) > 0) {
        const cv = parseFloat(cRaw);
        const pv = parseFloat(pRaw);
        const changePct = ((cv - pv) / pv * 100).toFixed(1);
        delta = `${changePct > 0 ? '+' : ''}${changePct}%`;
      }

      add(`| ${def.name} | ${c} | ${p} | ${delta} |`);
    });
    add('');
  }

  // ─── b. GRUPY SŁÓW KLUCZOWYCH ──────────────────
  if (analysis?.keywordGroups) {
    add('## 🏷️ Grupy słów kluczowych');
    add('');
    add('| Grupa | Kliknięcia | Wyświetlenia | Śr. CTR | Śr. pozycja | Fraz |');
    add('|-------|-----------|-------------|---------|------------|------|');
    for (const [name, group] of Object.entries(analysis.keywordGroups)) {
      if (group.keywords.length === 0) continue;
      add(`| ${name} | ${formatNumber(group.totalClicks)} | ${formatNumber(group.totalImpressions)} | ${formatPct(group.avgCtr)} | ${formatPos(group.avgPosition)} | ${group.keywords.length} |`);
    }
    add('');
  }

  // ─── c. TOP MOVERS KEYWORDS ────────────────────
  if (analysis?.queryMovers) {
    add('## 📊 Top Movers — Frazy kluczowe');
    add('');

    if (analysis.queryMovers.rising.length > 0) {
      add('### ↑ Rosnące');
      add('| Fraza | Kliknięcia Δ | Impresje Δ | Pozycja | CTR |');
      add('|-------|-------------|-----------|---------|-----|');
      for (const m of analysis.queryMovers.rising.slice(0, 10)) {
        add(`| ${m.key} | ${formatDelta(m.clicksDelta)} | ${formatDelta(m.impressionsDelta)} | ${formatPos(m.current.position)} | ${formatPct(m.current.ctr)} |`);
      }
      add('');
    }

    if (analysis.queryMovers.falling.length > 0) {
      add('### ↓ Spadające');
      add('| Fraza | Kliknięcia Δ | Impresje Δ | Pozycja | CTR |');
      add('|-------|-------------|-----------|---------|-----|');
      for (const m of analysis.queryMovers.falling.slice(0, 10)) {
        add(`| ${m.key} | ${formatDelta(m.clicksDelta)} | ${formatDelta(m.impressionsDelta)} | ${formatPos(m.current.position)} | ${formatPct(m.current.ctr)} |`);
      }
      add('');
    }

    if (analysis.queryMovers.newEntries.length > 0) {
      add('### ✨ Nowe frazy');
      add('| Fraza | Kliknięcia | Impresje | Pozycja | CTR |');
      add('|-------|-----------|---------|---------|-----|');
      for (const m of analysis.queryMovers.newEntries) {
        add(`| ${m.key} | ${formatNumber(m.clicks)} | ${formatNumber(m.impressions)} | ${formatPos(m.position)} | ${formatPct(m.ctr)} |`);
      }
      add('');
    }

    if (analysis.queryMovers.lostEntries.length > 0) {
      add('### ❌ Utracone frazy');
      add('| Fraza | Kliknięcia (prev) | Impresje (prev) | Pozycja (prev) |');
      add('|-------|--------------------|-----------------|----------------|');
      for (const m of analysis.queryMovers.lostEntries) {
        add(`| ${m.key} | ${formatNumber(m.clicks)} | ${formatNumber(m.impressions)} | ${formatPos(m.position)} |`);
      }
      add('');
    }
  }

  // ─── d. TOP MOVERS STRONY ──────────────────────
  if (analysis?.pageMovers) {
    add('## 📄 Top Movers — Strony');
    add('');
    if (analysis.pageMovers.rising.length > 0) {
      add('### ↑ Rosnące');
      add('| Strona | Kliknięcia Δ | Impresje Δ | Pozycja |');
      add('|--------|-------------|-----------|---------|');
      for (const m of analysis.pageMovers.rising.slice(0, 10)) {
        const shortUrl = m.key.replace(/(https?:\/\/[^/]+)/, '');
        add(`| ${shortUrl || m.key} | ${formatDelta(m.clicksDelta)} | ${formatDelta(m.impressionsDelta)} | ${formatPos(m.current.position)} |`);
      }
      add('');
    }
    if (analysis.pageMovers.falling.length > 0) {
      add('### ↓ Spadające');
      add('| Strona | Kliknięcia Δ | Impresje Δ | Pozycja |');
      add('|--------|-------------|-----------|---------|');
      for (const m of analysis.pageMovers.falling.slice(0, 10)) {
        const shortUrl = m.key.replace(/(https?:\/\/[^/]+)/, '');
        add(`| ${shortUrl || m.key} | ${formatDelta(m.clicksDelta)} | ${formatDelta(m.impressionsDelta)} | ${formatPos(m.current.position)} |`);
      }
      add('');
    }
  }

  // ─── e. ŹRÓDŁA RUCHU ──────────────────────────
  if (ga4?.sources?.rows?.length > 0) {
    add('## 🌐 Źródła ruchu (GA4)');
    add('');
    add('| Kanał | Sesje | Użytkownicy | Engagement Rate | Śr. czas |');
    add('|-------|-------|-------------|-----------------|----------|');
    for (const row of ga4.sources.rows) {
      const channel = row.dimensionValues?.[0]?.value || '-';
      const vals = row.metricValues || [];
      add(`| ${channel} | ${vals[0]?.value || '-'} | ${vals[1]?.value || '-'} | ${vals[2]?.value ? (parseFloat(vals[2].value) * 100).toFixed(1) + '%' : '-'} | ${vals[3]?.value ? parseFloat(vals[3].value).toFixed(0) + 's' : '-'} |`);
    }
    add('');
  }

  // ─── f. KRAJE GSC ──────────────────────────────
  if (gsc?.countries?.length > 0) {
    add('## 🌍 Kraje (GSC)');
    add('');
    add('| Kraj | Kliknięcia | Wyświetlenia | CTR | Pozycja |');
    add('|------|-----------|-------------|-----|---------|');
    for (const row of gsc.countries) {
      add(`| ${row.keys?.[0] || '-'} | ${formatNumber(row.clicks)} | ${formatNumber(row.impressions)} | ${formatPct(row.ctr)} | ${formatPos(row.position)} |`);
    }
    add('');
  }

  // ─── g. URZĄDZENIA ─────────────────────────────
  if (gsc?.devices?.length > 0) {
    add('## 📱 Urządzenia (GSC)');
    add('');
    add('| Urządzenie | Kliknięcia | Wyświetlenia | CTR | Pozycja |');
    add('|------------|-----------|-------------|-----|---------|');
    for (const row of gsc.devices) {
      add(`| ${row.keys?.[0] || '-'} | ${formatNumber(row.clicks)} | ${formatNumber(row.impressions)} | ${formatPct(row.ctr)} | ${formatPos(row.position)} |`);
    }
    add('');
  }

  // ─── h. WPŁYW ZMIAN SEO ───────────────────────
  if (analysis?.actionCorrelations?.length > 0) {
    add('## 🔗 Wpływ zmian SEO');
    add('');
    for (const action of analysis.actionCorrelations) {
      const verdict = VERDICT_LABELS[action.verdict] || action.verdict;
      add(`### ${verdict} — ${action.description}`);
      add(`- **ID:** ${action.id} | **Data:** ${action.date} | **Typ:** ${action.type}`);
      add(`- **Dni od zmiany:** ${action.daysSince}`);
      if (action.evidence?.length > 0) {
        add('- **Dowody:**');
        for (const e of action.evidence) {
          add(`  - ${e}`);
        }
      }
      add('');
    }
  }

  // ─── i. SZANSE ─────────────────────────────────
  if (analysis?.opportunities?.length > 0) {
    add('## 💡 Szanse (wysoka widoczność, niski CTR)');
    add('');
    add('| Fraza | Impresje | Kliknięcia | CTR | Pozycja | Potencjał kliknięć |');
    add('|-------|---------|-----------|-----|---------|-------------------|');
    for (const opp of analysis.opportunities) {
      add(`| ${opp.query} | ${formatNumber(opp.impressions)} | ${formatNumber(opp.clicks)} | ${formatPct(opp.ctr)} | ${formatPos(opp.position)} | ~${opp.potentialClicks} |`);
    }
    add('');
  }

  // ─── j. ALERTY ─────────────────────────────────
  if (analysis?.alerts?.length > 0) {
    add('## 🚨 Alerty');
    add('');
    const severityIcon = { high: '🔴', medium: '🟡', low: '🟢' };
    const typeLabels = {
      position_drop: 'Spadek pozycji',
      ctr_drop: 'Spadek CTR',
      impression_drop: 'Spadek impresji',
    };
    add('| Priorytet | Typ | Fraza/Strona | Z | Do | Zmiana |');
    add('|-----------|-----|-------------|---|---|--------|');
    for (const alert of analysis.alerts.slice(0, 15)) {
      add(`| ${severityIcon[alert.severity] || '⚪'} | ${typeLabels[alert.type] || alert.type} | ${alert.key} | ${alert.from} | ${alert.to} | ${alert.delta} |`);
    }
    add('');
  }

  // ─── FOOTER ────────────────────────────────────
  add('---');
  add(`*Raport wygenerowany automatycznie przez SEO Agent — ${config.site.domain}*`);

  return lines.join('\n');
}

module.exports = { generateReport };
