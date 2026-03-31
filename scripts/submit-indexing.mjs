/**
 * Batch URL submission to Google Indexing API
 *
 * Submits project URLs from sitemap.xml to Google for faster indexing.
 * Uses OAuth2 ADC credentials (same as SEO agent).
 *
 * Usage:
 *   node scripts/submit-indexing.mjs                  # submit all project URLs
 *   node scripts/submit-indexing.mjs --limit 50       # submit first 50
 *   node scripts/submit-indexing.mjs --dry-run        # just list URLs, don't submit
 *   node scripts/submit-indexing.mjs --filter /obszar  # custom URL filter
 *
 * Rate limits: Google allows 200 requests/day for Indexing API.
 * Script auto-batches and respects this limit.
 *
 * Prerequisites:
 *   - Google Search Console verified for coreltb.pl
 *   - ADC credentials at %APPDATA%/gcloud/application_default_credentials.json
 *   - Indexing API enabled in Google Cloud Console:
 *     https://console.cloud.google.com/apis/library/indexing.googleapis.com
 */

import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// ─── Config ──────────────────────────────────────────────

const SITEMAP_URL = 'https://coreltb.pl/sitemap.xml';
const DAILY_LIMIT = 200;
const DELAY_MS = 500;
const DEFAULT_FILTER = '/projekty/';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const INDEXING_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

// ─── Auth ────────────────────────────────────────────────

async function getAccessToken() {
  const adcPath = resolve(
    process.env.APPDATA || '',
    'gcloud/application_default_credentials.json'
  );

  if (!existsSync(adcPath)) {
    console.error(`\nCredentials not found at: ${adcPath}`);
    console.error('Run: gcloud auth application-default login');
    process.exit(1);
  }

  const creds = JSON.parse(readFileSync(adcPath, 'utf-8'));

  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: creds.client_id,
      client_secret: creds.client_secret,
      refresh_token: creds.refresh_token,
      grant_type: 'refresh_token',
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error('Token refresh failed:', err);
    process.exit(1);
  }

  const data = await res.json();
  return data.access_token;
}

// ─── Fetch sitemap URLs ──────────────────────────────────

async function fetchSitemapUrls(filter) {
  console.log(`Fetching sitemap: ${SITEMAP_URL}`);

  const res = await fetch(SITEMAP_URL);
  const xml = await res.text();

  const urls = [];
  const regex = /<loc>(.*?)<\/loc>/g;
  let match;
  while ((match = regex.exec(xml)) !== null) {
    if (match[1].includes(filter)) {
      urls.push(match[1]);
    }
  }

  console.log(`Found ${urls.length} URLs matching "${filter}"\n`);
  return urls;
}

// ─── Submit URL ──────────────────────────────────────────

async function submitUrl(token, url) {
  try {
    const res = await fetch(INDEXING_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        url: url,
        type: 'URL_UPDATED',
      }),
    });

    if (res.ok) {
      return { url, status: 'ok', code: res.status };
    }

    const err = await res.json().catch(() => ({}));
    return {
      url,
      status: 'error',
      code: res.status,
      message: err.error?.message || res.statusText,
    };
  } catch (err) {
    return { url, status: 'error', code: 'network', message: err.message };
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Main ────────────────────────────────────────────────

async function main() {
  const args = process.argv.slice(2);
  const dryRun = args.includes('--dry-run');
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : DAILY_LIMIT;
  const filterIdx = args.indexOf('--filter');
  const filter = filterIdx !== -1 ? args[filterIdx + 1] : DEFAULT_FILTER;

  console.log('=== Google Indexing API — Batch URL Submission ===\n');

  const allUrls = await fetchSitemapUrls(filter);
  const urls = allUrls.slice(0, Math.min(limit, DAILY_LIMIT));

  console.log(`Will submit ${urls.length} of ${allUrls.length} URLs\n`);

  if (dryRun) {
    urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
    console.log(`\nDRY RUN — nothing submitted.`);
    console.log(`Remaining: ${allUrls.length - urls.length}`);
    return;
  }

  // Auth
  console.log('Authenticating...');
  const token = await getAccessToken();
  console.log('OK\n');

  // Submit
  let success = 0;
  let errors = 0;

  for (let i = 0; i < urls.length; i++) {
    const result = await submitUrl(token, urls[i]);

    if (result.status === 'ok') {
      success++;
      process.stdout.write(`\r  [${i + 1}/${urls.length}] Submitted: ${success} | Errors: ${errors}`);
    } else {
      errors++;
      console.log(`\n  ERR ${result.url} — ${result.code}: ${result.message}`);

      if (result.code === 403 || result.code === 401) {
        console.error('\nAuth/permission error. Make sure Indexing API is enabled:');
        console.error('https://console.cloud.google.com/apis/library/indexing.googleapis.com');
        break;
      }
      if (result.code === 429) {
        console.error('\nDaily quota exceeded. Run again tomorrow.');
        break;
      }
    }

    if (i < urls.length - 1) await sleep(DELAY_MS);
  }

  console.log('\n\n=== Summary ===');
  console.log(`Submitted: ${success}`);
  console.log(`Errors:    ${errors}`);
  console.log(`Remaining: ${allUrls.length - urls.length}`);

  if (allUrls.length > urls.length) {
    const days = Math.ceil((allUrls.length - urls.length) / DAILY_LIMIT);
    console.log(`\nRun again tomorrow — ${days} more day(s) to finish all URLs.`);
  }
}

main().catch(console.error);
