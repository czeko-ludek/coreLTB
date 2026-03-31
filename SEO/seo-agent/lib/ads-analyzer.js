/**
 * Ads Analyzer — analiza kampanii Google Ads + Meta Ads
 *
 * Zadania:
 * 1. Analiza danych GA4 per kanal (Paid Search, Paid Social, Cross-network)
 * 2. Analiza konwersji z reklam (calculator_lead, consultation_lead, plot_analysis_lead)
 * 3. ROI / ROAS kalkulacja
 * 4. Rekomendacje budzetowe
 * 5. Porownanie kanalow
 */

/**
 * Analizuje dane GA4 traffic sources pod katem reklam
 * @param {Object} ga4Sources - dane z ga4.getTrafficSources()
 * @returns {Object} analiza kanalow reklamowych
 */
function analyzeAdChannels(ga4Sources) {
  if (!ga4Sources?.rows?.length) {
    return { channels: [], summary: 'Brak danych GA4 o zrodlach ruchu' };
  }

  const adChannels = ['Paid Search', 'Paid Social', 'Cross-network', 'Display'];
  const organicChannels = ['Organic Search', 'Organic Social', 'Direct', 'Referral'];

  const channels = [];
  let totalAdSessions = 0;
  let totalOrganicSessions = 0;

  for (const row of ga4Sources.rows) {
    const channel = row.dimensionValues?.[0]?.value || 'unknown';
    const vals = row.metricValues || [];
    const sessions = parseInt(vals[0]?.value) || 0;
    const users = parseInt(vals[1]?.value) || 0;
    const engagementRate = parseFloat(vals[2]?.value) || 0;
    const avgDuration = parseFloat(vals[3]?.value) || 0;

    const isAd = adChannels.some(ac => channel.includes(ac) || channel === 'Cross-network');
    if (isAd) totalAdSessions += sessions;
    else totalOrganicSessions += sessions;

    channels.push({
      name: channel,
      type: isAd ? 'paid' : 'organic',
      sessions,
      users,
      engagementRate,
      avgDuration,
    });
  }

  // Posortuj po sesjach
  channels.sort((a, b) => b.sessions - a.sessions);

  // Porownanie paid vs organic
  const totalSessions = totalAdSessions + totalOrganicSessions;
  const paidShare = totalSessions > 0 ? (totalAdSessions / totalSessions * 100).toFixed(1) : 0;
  const organicShare = totalSessions > 0 ? (totalOrganicSessions / totalSessions * 100).toFixed(1) : 0;

  // Engagement comparison
  const paidChannels = channels.filter(c => c.type === 'paid');
  const organicCh = channels.filter(c => c.type === 'organic');

  const avgPaidEngagement = paidChannels.length > 0
    ? paidChannels.reduce((s, c) => s + c.engagementRate * c.sessions, 0) / Math.max(totalAdSessions, 1)
    : 0;
  const avgOrganicEngagement = organicCh.length > 0
    ? organicCh.reduce((s, c) => s + c.engagementRate * c.sessions, 0) / Math.max(totalOrganicSessions, 1)
    : 0;

  return {
    channels,
    paidTotal: totalAdSessions,
    organicTotal: totalOrganicSessions,
    paidShare: parseFloat(paidShare),
    organicShare: parseFloat(organicShare),
    avgPaidEngagement,
    avgOrganicEngagement,
    qualityGap: ((avgOrganicEngagement - avgPaidEngagement) * 100).toFixed(1),
  };
}

/**
 * Analizuje eventy konwersji z GA4
 * @param {Object} ga4Events - dane z ga4.getTopEvents()
 * @returns {Object} analiza konwersji
 */
function analyzeConversions(ga4Events) {
  if (!ga4Events?.rows?.length) {
    return { conversions: [], total: 0 };
  }

  const conversionEvents = [
    'calculator_lead',
    'consultation_lead',
    'plot_analysis_lead',
    'calculator_start',
    'form_focus',
    'phone_click',
    'cookie_accepted',
    'cookie_rejected',
    'cookie_ignored',
  ];

  const conversions = [];
  for (const row of ga4Events.rows) {
    const eventName = row.dimensionValues?.[0]?.value || '';
    const count = parseInt(row.metricValues?.[0]?.value) || 0;
    const users = parseInt(row.metricValues?.[1]?.value) || 0;

    if (conversionEvents.includes(eventName)) {
      conversions.push({
        event: eventName,
        count,
        users,
        isLead: eventName.endsWith('_lead'),
      });
    }
  }

  const totalLeads = conversions.filter(c => c.isLead).reduce((s, c) => s + c.count, 0);

  return {
    conversions,
    totalLeads,
    leadEvents: conversions.filter(c => c.isLead),
    microConversions: conversions.filter(c => !c.isLead),
  };
}

/**
 * Analizuje top strony z GA4 pod katem landing pages reklamowych
 * @param {Object} ga4Pages - dane z ga4.getTopPagesGA4()
 * @returns {Object} performance landing pages
 */
function analyzeLandingPages(ga4Pages) {
  if (!ga4Pages?.rows?.length) {
    return { pages: [] };
  }

  const lpPaths = ['/wycena', '/umow-konsultacje', '/analiza-dzialki', '/kontakt', '/projekty'];

  const pages = [];
  for (const row of ga4Pages.rows) {
    const pagePath = row.dimensionValues?.[0]?.value || '';
    const vals = row.metricValues || [];

    pages.push({
      path: pagePath,
      pageViews: parseInt(vals[0]?.value) || 0,
      sessions: parseInt(vals[1]?.value) || 0,
      engagementRate: parseFloat(vals[2]?.value) || 0,
      avgDuration: parseFloat(vals[3]?.value) || 0,
      bounceRate: parseFloat(vals[4]?.value) || 0,
      isLP: lpPaths.some(lp => pagePath === lp || pagePath.startsWith(lp + '?')),
      isLocal: pagePath.startsWith('/obszar-dzialania/'),
      isProject: pagePath.startsWith('/projekty/'),
    });
  }

  return {
    pages: pages.sort((a, b) => b.pageViews - a.pageViews),
    landingPages: pages.filter(p => p.isLP),
    localPages: pages.filter(p => p.isLocal),
    projectPages: pages.filter(p => p.isProject),
  };
}

/**
 * Generuje raport Ads
 */
function generateAdsReport(adChannels, conversions, landingPages, config) {
  const lines = [];
  const add = (line = '') => lines.push(line);

  add('## Analiza kampanii reklamowych');
  add('');

  // Kanaly
  if (adChannels.channels.length > 0) {
    add('### Kanaly ruchu — Paid vs Organic');
    add('');
    add(`| Typ | Sesje | Udzial | Avg Engagement |`);
    add(`|-----|-------|--------|----------------|`);
    add(`| Paid (reklamy) | ${adChannels.paidTotal} | ${adChannels.paidShare}% | ${(adChannels.avgPaidEngagement * 100).toFixed(1)}% |`);
    add(`| Organic (darmowy) | ${adChannels.organicTotal} | ${adChannels.organicShare}% | ${(adChannels.avgOrganicEngagement * 100).toFixed(1)}% |`);
    add('');

    if (parseFloat(adChannels.qualityGap) > 10) {
      add(`> Engagement organiczny jest ${adChannels.qualityGap}pp wyzszy niz platny — warto poprawic targetowanie reklam lub landing page.`);
      add('');
    }

    add('### Szczegoly kanalow');
    add('');
    add('| Kanal | Typ | Sesje | Uzytkownicy | Engagement | Sr. czas |');
    add('|-------|-----|-------|-------------|------------|----------|');
    for (const ch of adChannels.channels) {
      const dur = ch.avgDuration;
      const durStr = dur >= 60 ? `${Math.floor(dur/60)}m ${Math.round(dur%60)}s` : `${Math.round(dur)}s`;
      add(`| ${ch.name} | ${ch.type} | ${ch.sessions} | ${ch.users} | ${(ch.engagementRate * 100).toFixed(1)}% | ${durStr} |`);
    }
    add('');
  }

  // Konwersje
  if (conversions.conversions.length > 0) {
    add('### Konwersje');
    add('');
    add(`**Leady lacznie:** ${conversions.totalLeads}`);
    add('');

    if (conversions.leadEvents.length > 0) {
      add('| Event (lead) | Ilosc | Uzytkownicy |');
      add('|--------------|-------|-------------|');
      for (const c of conversions.leadEvents) {
        add(`| ${c.event} | ${c.count} | ${c.users} |`);
      }
      add('');
    }

    if (conversions.microConversions.length > 0) {
      add('| Event (micro) | Ilosc | Uzytkownicy |');
      add('|---------------|-------|-------------|');
      for (const c of conversions.microConversions) {
        add(`| ${c.event} | ${c.count} | ${c.users} |`);
      }
      add('');
    }
  }

  // Landing pages
  if (landingPages.landingPages?.length > 0) {
    add('### Landing Pages — performance');
    add('');
    add('| Strona | Odslon | Sesje | Engagement | Bounce | Sr. czas |');
    add('|--------|--------|-------|------------|--------|----------|');
    for (const p of landingPages.landingPages) {
      const dur = p.avgDuration;
      const durStr = dur >= 60 ? `${Math.floor(dur/60)}m ${Math.round(dur%60)}s` : `${Math.round(dur)}s`;
      add(`| ${p.path} | ${p.pageViews} | ${p.sessions} | ${(p.engagementRate * 100).toFixed(1)}% | ${(p.bounceRate * 100).toFixed(1)}% | ${durStr} |`);
    }
    add('');
  }

  return lines.join('\n');
}

module.exports = {
  analyzeAdChannels,
  analyzeConversions,
  analyzeLandingPages,
  generateAdsReport,
};
