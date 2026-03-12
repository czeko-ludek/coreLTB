/**
 * Google Analytics 4 — 5 raportów
 *
 * 1. overview    — sesje, użytkownicy, odsłony, bounce rate, czas
 * 2. pages       — top strony (pageviews, sessions, engagement)
 * 3. events      — top eventy (custom + domyślne)
 * 4. sources     — źródła ruchu (organic, direct, referral, social)
 * 5. countries   — rozkład geograficzny
 */

const { getAnalyticsData } = require('./auth');

/**
 * Helper: format daty GA4 (YYYY-MM-DD)
 */
function getGA4DateRange(days) {
  const end = new Date();
  end.setDate(end.getDate() - 1); // GA4 ma ~1 dzień opóźnienia
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}

/**
 * Generyczny GA4 report request
 */
async function runGA4Report(propertyId, params) {
  if (!propertyId) {
    return { rows: [], notice: 'GA4 propertyId nie skonfigurowany w config.json' };
  }

  const analytics = await getAnalyticsData();
  const res = await analytics.properties.runReport({
    property: propertyId,
    requestBody: params,
  });

  return {
    rows: res.data.rows || [],
    totals: res.data.totals || [],
    metadata: res.data.metadata,
  };
}

/**
 * 1. Overview — główne metryki
 */
async function getOverview(propertyId, days) {
  const current = getGA4DateRange(days);
  const previousEnd = new Date(current.startDate);
  previousEnd.setDate(previousEnd.getDate() - 1);
  const previousStart = new Date(previousEnd);
  previousStart.setDate(previousStart.getDate() - days);

  const previous = {
    startDate: previousStart.toISOString().split('T')[0],
    endDate: previousEnd.toISOString().split('T')[0],
  };

  const metrics = [
    { name: 'sessions' },
    { name: 'totalUsers' },
    { name: 'screenPageViews' },
    { name: 'bounceRate' },
    { name: 'averageSessionDuration' },
    { name: 'engagementRate' },
    { name: 'newUsers' },
  ];

  const [currentData, previousData] = await Promise.all([
    runGA4Report(propertyId, {
      dateRanges: [current],
      metrics,
    }),
    runGA4Report(propertyId, {
      dateRanges: [previous],
      metrics,
    }),
  ]);

  return { current: currentData, previous: previousData, dates: { current, previous } };
}

/**
 * 2. Top pages
 */
async function getTopPagesGA4(propertyId, days, limit = 30) {
  const dateRange = getGA4DateRange(days);
  return runGA4Report(propertyId, {
    dateRanges: [dateRange],
    dimensions: [{ name: 'pagePath' }],
    metrics: [
      { name: 'screenPageViews' },
      { name: 'sessions' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
      { name: 'bounceRate' },
    ],
    orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
    limit,
  });
}

/**
 * 3. Top events
 */
async function getTopEvents(propertyId, days, limit = 20) {
  const dateRange = getGA4DateRange(days);
  return runGA4Report(propertyId, {
    dateRanges: [dateRange],
    dimensions: [{ name: 'eventName' }],
    metrics: [
      { name: 'eventCount' },
      { name: 'totalUsers' },
    ],
    orderBys: [{ metric: { metricName: 'eventCount' }, desc: true }],
    limit,
  });
}

/**
 * 4. Traffic sources
 */
async function getTrafficSources(propertyId, days) {
  const dateRange = getGA4DateRange(days);
  return runGA4Report(propertyId, {
    dateRanges: [dateRange],
    dimensions: [
      { name: 'sessionDefaultChannelGroup' },
    ],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
      { name: 'engagementRate' },
      { name: 'averageSessionDuration' },
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
  });
}

/**
 * 5. Countries
 */
async function getCountriesGA4(propertyId, days) {
  const dateRange = getGA4DateRange(days);
  return runGA4Report(propertyId, {
    dateRanges: [dateRange],
    dimensions: [{ name: 'country' }],
    metrics: [
      { name: 'sessions' },
      { name: 'totalUsers' },
    ],
    orderBys: [{ metric: { metricName: 'sessions' }, desc: true }],
    limit: 15,
  });
}

module.exports = {
  getOverview,
  getTopPagesGA4,
  getTopEvents,
  getTrafficSources,
  getCountriesGA4,
};
