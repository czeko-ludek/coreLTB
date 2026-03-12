/**
 * Google Search Console — 5 raportów
 *
 * 1. queries     — top frazy (clicks, impressions, ctr, position)
 * 2. pages       — top strony
 * 3. countries   — rozkład geograficzny
 * 4. devices     — mobile / desktop / tablet
 * 5. queryPage   — frazy × strony (szczegółowe)
 */

const { getSearchConsole } = require('./auth');

/**
 * Helper: daty w formacie YYYY-MM-DD
 */
function getDateRange(days, offsetDays = 0) {
  const end = new Date();
  end.setDate(end.getDate() - 3 - offsetDays); // GSC ma ~3 dni opóźnienia
  const start = new Date(end);
  start.setDate(start.getDate() - days);
  return {
    startDate: start.toISOString().split('T')[0],
    endDate: end.toISOString().split('T')[0],
  };
}

/**
 * Generyczny request do GSC Search Analytics
 */
async function queryGSC(siteUrl, params) {
  const sc = await getSearchConsole();
  const res = await sc.searchanalytics.query({
    siteUrl,
    requestBody: params,
  });
  return res.data.rows || [];
}

/**
 * 1. Top queries (frazy kluczowe)
 */
async function getTopQueries(siteUrl, days, rowLimit = 100) {
  const current = getDateRange(days);
  const previous = getDateRange(days, days);

  const [currentRows, previousRows] = await Promise.all([
    queryGSC(siteUrl, {
      startDate: current.startDate,
      endDate: current.endDate,
      dimensions: ['query'],
      rowLimit,
      dataState: 'all',
    }),
    queryGSC(siteUrl, {
      startDate: previous.startDate,
      endDate: previous.endDate,
      dimensions: ['query'],
      rowLimit: rowLimit * 2,
      dataState: 'all',
    }),
  ]);

  return { current: currentRows, previous: previousRows, dates: { current, previous } };
}

/**
 * 2. Top pages (strony)
 */
async function getTopPages(siteUrl, days, rowLimit = 50) {
  const current = getDateRange(days);
  const previous = getDateRange(days, days);

  const [currentRows, previousRows] = await Promise.all([
    queryGSC(siteUrl, {
      startDate: current.startDate,
      endDate: current.endDate,
      dimensions: ['page'],
      rowLimit,
      dataState: 'all',
    }),
    queryGSC(siteUrl, {
      startDate: previous.startDate,
      endDate: previous.endDate,
      dimensions: ['page'],
      rowLimit: rowLimit * 2,
      dataState: 'all',
    }),
  ]);

  return { current: currentRows, previous: previousRows, dates: { current, previous } };
}

/**
 * 3. Kraje
 */
async function getCountries(siteUrl, days) {
  const { startDate, endDate } = getDateRange(days);
  return queryGSC(siteUrl, {
    startDate,
    endDate,
    dimensions: ['country'],
    rowLimit: 20,
    dataState: 'all',
  });
}

/**
 * 4. Urządzenia
 */
async function getDevices(siteUrl, days) {
  const { startDate, endDate } = getDateRange(days);
  return queryGSC(siteUrl, {
    startDate,
    endDate,
    dimensions: ['device'],
    dataState: 'all',
  });
}

/**
 * 5. Query × Page (szczegółowe)
 */
async function getQueryPageCombos(siteUrl, days, rowLimit = 200) {
  const { startDate, endDate } = getDateRange(days);
  return queryGSC(siteUrl, {
    startDate,
    endDate,
    dimensions: ['query', 'page'],
    rowLimit,
    dataState: 'all',
  });
}

module.exports = {
  getTopQueries,
  getTopPages,
  getCountries,
  getDevices,
  getQueryPageCombos,
  getDateRange,
};
