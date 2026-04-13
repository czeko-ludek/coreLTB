/**
 * Batch URL submission to Google Indexing API
 *
 * Submits project URLs from sitemap.xml to Google for faster indexing.
 * Uses OAuth2 ADC credentials (same as SEO agent).
 * Tracks submitted URLs in scripts/indexing-history.json to avoid duplicates.
 *
 * Usage:
 *   node scripts/submit-indexing.mjs                  # submit next batch (auto-skips already sent)
 *   node scripts/submit-indexing.mjs --limit 50       # submit next 50 unsent URLs
 *   node scripts/submit-indexing.mjs --dry-run        # list what would be sent, don't submit
 *   node scripts/submit-indexing.mjs --filter /obszar  # custom URL filter (default: /projekty/)
 *   node scripts/submit-indexing.mjs --all            # include already submitted (re-submit)
 *   node scripts/submit-indexing.mjs --status         # show submission history summary
 *   node scripts/submit-indexing.mjs --reset          # clear history and start fresh
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

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// ─── Config ──────────────────────────────────────────────

const SITEMAP_URL = 'https://coreltb.pl/sitemap.xml';
const DAILY_LIMIT = 200;
const DELAY_MS = 500;
const DEFAULT_FILTER = '/projekty/';
const HISTORY_FILE = resolve(__dirname, 'indexing-history.json');

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const INDEXING_URL = 'https://indexing.googleapis.com/v3/urlNotifications:publish';

// ─── History tracking ───────────────────────────────────

function loadHistory() {
  if (!existsSync(HISTORY_FILE)) {
    return { submissions: [], batches: [] };
  }
  try {
    return JSON.parse(readFileSync(HISTORY_FILE, 'utf-8'));
  } catch {
    return { submissions: [], batches: [] };
  }
}

function saveHistory(history) {
  writeFileSync(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf-8');
}

function getSubmittedUrls(history) {
  return new Set(history.submissions.map(s => s.url));
}

function showStatus(history) {
  const submitted = history.submissions.length;
  const batches = history.batches.length;
  const successCount = history.submissions.filter(s => s.status === 'ok').length;
  const errorCount = history.submissions.filter(s => s.status === 'error').length;

  console.log('=== Indexing History ===\n');
  console.log(`Total submitted:  ${submitted} URLs`);
  console.log(`  Successful:     ${successCount}`);
  console.log(`  Errors:         ${errorCount}`);
  console.log(`Batches run:      ${batches}`);

  if (batches > 0) {
    console.log('\n--- Batches ---');
    history.batches.forEach((b, i) => {
      console.log(`  ${i + 1}. ${b.date} — ${b.success} ok, ${b.errors} err, filter: "${b.filter}"`);
    });
  }

  // Group by date
  const byDate = {};
  history.submissions.forEach(s => {
    const date = s.date.split('T')[0];
    byDate[date] = (byDate[date] || 0) + 1;
  });

  if (Object.keys(byDate).length > 0) {
    console.log('\n--- Submissions by date ---');
    Object.entries(byDate).sort().forEach(([date, count]) => {
      console.log(`  ${date}: ${count} URLs`);
    });
  }
}

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
  const includeAll = args.includes('--all');
  const showStatusFlag = args.includes('--status');
  const resetFlag = args.includes('--reset');
  const limitIdx = args.indexOf('--limit');
  const limit = limitIdx !== -1 ? parseInt(args[limitIdx + 1]) : DAILY_LIMIT;
  const filterIdx = args.indexOf('--filter');
  const filter = filterIdx !== -1 ? args[filterIdx + 1] : DEFAULT_FILTER;

  const history = loadHistory();

  // --status: show history and exit
  if (showStatusFlag) {
    showStatus(history);
    return;
  }

  // --reset: clear history
  if (resetFlag) {
    saveHistory({ submissions: [], batches: [] });
    console.log('History cleared.');
    return;
  }

  console.log('=== Google Indexing API — Batch URL Submission ===\n');

  const allUrls = await fetchSitemapUrls(filter);

  // Filter out already submitted URLs (unless --all)
  const submittedSet = getSubmittedUrls(history);
  let candidateUrls;
  if (includeAll) {
    candidateUrls = allUrls;
    console.log(`Mode: --all (re-submitting including already sent)\n`);
  } else {
    candidateUrls = allUrls.filter(u => !submittedSet.has(u));
    const skipped = allUrls.length - candidateUrls.length;
    if (skipped > 0) {
      console.log(`Skipping ${skipped} already submitted URLs`);
    }
  }

  const urls = candidateUrls.slice(0, Math.min(limit, DAILY_LIMIT));

  console.log(`Will submit ${urls.length} of ${candidateUrls.length} pending URLs (${allUrls.length} total in sitemap)\n`);

  if (urls.length === 0) {
    console.log('Nothing to submit! All URLs already sent.');
    console.log('Use --all to re-submit, or --filter to change URL filter.');
    return;
  }

  if (dryRun) {
    urls.forEach((url, i) => console.log(`  ${i + 1}. ${url}`));
    console.log(`\nDRY RUN — nothing submitted.`);
    console.log(`Pending after this batch: ${candidateUrls.length - urls.length}`);
    return;
  }

  // Auth
  console.log('Authenticating...');
  const token = await getAccessToken();
  console.log('OK\n');

  // Submit
  let success = 0;
  let errors = 0;
  const batchSubmissions = [];

  for (let i = 0; i < urls.length; i++) {
    const result = await submitUrl(token, urls[i]);
    const now = new Date().toISOString();

    if (result.status === 'ok') {
      success++;
      batchSubmissions.push({ url: result.url, status: 'ok', date: now });
      process.stdout.write(`\r  [${i + 1}/${urls.length}] Submitted: ${success} | Errors: ${errors}`);
    } else {
      errors++;
      batchSubmissions.push({ url: result.url, status: 'error', code: result.code, message: result.message, date: now });
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

  // Save history
  history.submissions.push(...batchSubmissions);
  history.batches.push({
    date: new Date().toISOString(),
    filter,
    total: urls.length,
    success,
    errors,
  });
  saveHistory(history);

  const remaining = candidateUrls.length - urls.length;

  console.log('\n\n=== Summary ===');
  console.log(`Submitted: ${success}`);
  console.log(`Errors:    ${errors}`);
  console.log(`Remaining: ${remaining}`);
  console.log(`History:   ${HISTORY_FILE}`);

  if (remaining > 0) {
    const days = Math.ceil(remaining / DAILY_LIMIT);
    console.log(`\nRun again tomorrow — ${days} more day(s) to finish all URLs.`);
  } else {
    console.log('\nAll URLs submitted!');
  }
}

main().catch(console.error);
