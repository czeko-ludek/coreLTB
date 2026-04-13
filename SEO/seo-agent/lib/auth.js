/**
 * lib/auth.js — OAuth2 authentication from Application Default Credentials
 *
 * Reads ADC from %APPDATA%/gcloud/application_default_credentials.json
 * Creates google.auth.OAuth2 with client_id/secret/refresh_token
 * Returns authenticated client for GA4 + GSC APIs
 *
 * Identyczne podejście jak Garden Horizons Wiki — brak Service Account,
 * używa osobistego konta Google (dawidFC@gmail.com) z OAuth2 refresh token.
 */

const { google } = require('googleapis');
const fs = require('fs');
const path = require('path');

const ADC_PATH = path.join(
  process.env.APPDATA || path.join(process.env.HOME || '', '.config'),
  'gcloud',
  'application_default_credentials.json'
);

/**
 * Load ADC and create an authenticated OAuth2 client
 * @returns {Promise<import('googleapis').Common.OAuth2Client>}
 */
async function getAuthClient() {
  // Check ADC file exists
  if (!fs.existsSync(ADC_PATH)) {
    throw new Error(
      `ADC nie znaleziono: ${ADC_PATH}\n` +
      `Uruchom: py "D:\\NEXUS V2\\credentials\\setup_analytics_adc.py"\n` +
      `aby wygenerowac nowe credentials z scopami analytics + webmasters.`
    );
  }

  // Read and parse ADC
  let adc;
  try {
    const raw = fs.readFileSync(ADC_PATH, 'utf-8');
    adc = JSON.parse(raw);
  } catch (err) {
    throw new Error(`Blad parsowania ADC (${ADC_PATH}): ${err.message}`);
  }

  // Validate required fields
  const required = ['client_id', 'client_secret', 'refresh_token'];
  for (const field of required) {
    if (!adc[field]) {
      throw new Error(
        `ADC brakuje pola '${field}' w ${ADC_PATH}\n` +
        `Uruchom ponownie setup_analytics_adc.py aby odswiezyc credentials.`
      );
    }
  }

  // Create OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    adc.client_id,
    adc.client_secret
  );

  // Set refresh token — googleapis auto-refreshes access token when needed
  oauth2Client.setCredentials({
    refresh_token: adc.refresh_token,
  });

  return oauth2Client;
}

/**
 * Get authenticated Search Console client
 */
async function getSearchConsole() {
  const auth = await getAuthClient();
  return google.searchconsole({ version: 'v1', auth });
}

/**
 * Get authenticated GA4 Analytics Data client
 */
async function getAnalyticsData() {
  const auth = await getAuthClient();
  return google.analyticsdata({ version: 'v1beta', auth });
}

/**
 * Test authentication against both GA4 and GSC
 */
async function testAuth() {
  const auth = await getAuthClient();
  const config = require('../config.json');
  const result = { ga4: false, gsc: false, details: {} };

  // Test GSC
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth });
    const response = await searchconsole.searchanalytics.query({
      siteUrl: config.gsc.siteUrl,
      requestBody: {
        startDate: _formatDate(_daysAgo(3)),
        endDate: _formatDate(_daysAgo(3)),
        dimensions: ['query'],
        rowLimit: 1,
      },
    });

    const rows = response.data.rows?.length || 0;
    result.gsc = true;
    result.details.gsc = `OK — dane z 3 dni temu: ${rows > 0 ? 'dostepne' : 'brak (moze za wczesnie)'}`;
  } catch (err) {
    result.details.gsc = `BLAD: ${err.message}`;
  }

  // Test GA4
  if (config.ga4.propertyId) {
    try {
      const analyticsdata = google.analyticsdata({ version: 'v1beta', auth });
      const response = await analyticsdata.properties.runReport({
        property: `properties/${config.ga4.propertyId}`,
        requestBody: {
          dateRanges: [{ startDate: 'yesterday', endDate: 'yesterday' }],
          metrics: [{ name: 'activeUsers' }],
        },
      });

      const users = response.data.rows?.[0]?.metricValues?.[0]?.value || '0';
      result.ga4 = true;
      result.details.ga4 = `OK — wczorajsi uzytkownicy: ${users}`;
    } catch (err) {
      result.details.ga4 = `BLAD: ${err.message}`;
    }
  } else {
    result.details.ga4 = 'POMINIETY — ga4.propertyId nie skonfigurowany';
  }

  return result;
}

// --- Helpers ---

function _daysAgo(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

function _formatDate(date) {
  return date.toISOString().split('T')[0];
}

/**
 * Get authenticated Business Profile Performance client
 */
async function getBusinessProfile() {
  const auth = await getAuthClient();
  return google.businessprofileperformance({ version: 'v1', auth });
}

module.exports = { getAuthClient, getSearchConsole, getAnalyticsData, getBusinessProfile, testAuth };
