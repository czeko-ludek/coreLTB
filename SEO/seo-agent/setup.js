#!/usr/bin/env node

/**
 * Setup helper — sprawdza konfigurację i prowadzi przez setup
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.join(__dirname, 'config.json');
const CREDS_DIR = path.join(__dirname, 'credentials');
const CREDS_PATH = path.join(CREDS_DIR, 'service-account.json');

console.log('');
console.log('╔═══════════════════════════════════════════════╗');
console.log('║     🔧 SEO Agent Setup — Elever (CoreLTB)    ║');
console.log('╚═══════════════════════════════════════════════╝');
console.log('');

const config = JSON.parse(fs.readFileSync(CONFIG_PATH, 'utf8'));

// ─── 1. Sprawdź credentials ──────────────────────
console.log('1️⃣  Credentials (Service Account)');
if (fs.existsSync(CREDS_PATH)) {
  const creds = JSON.parse(fs.readFileSync(CREDS_PATH, 'utf8'));
  console.log(`   ✅ Plik znaleziony`);
  console.log(`   📧 Email: ${creds.client_email}`);
  console.log(`   🔑 Project: ${creds.project_id}`);
  console.log('');
  console.log('   ⚠️  Upewnij się, że ten email jest dodany jako:');
  console.log(`      - Użytkownik w GSC (${config.gsc.siteUrl})`);
  if (config.ga4.propertyId) {
    console.log(`      - Viewer w GA4 (${config.ga4.propertyId})`);
  }
} else {
  console.log('   ❌ Brak pliku: credentials/service-account.json');
  console.log('');
  console.log('   Jak uzyskać:');
  console.log('   1. Otwórz https://console.cloud.google.com');
  console.log('   2. Utwórz projekt (lub użyj istniejącego)');
  console.log('   3. Włącz API: Search Console API + Analytics Data API');
  console.log('   4. IAM → Service Accounts → Create');
  console.log('   5. Keys → Add Key → JSON → Pobierz');
  console.log(`   6. Zapisz jako: ${CREDS_PATH}`);
  console.log('   7. Dodaj email SA jako użytkownika w GSC');

  if (!fs.existsSync(CREDS_DIR)) {
    fs.mkdirSync(CREDS_DIR, { recursive: true });
    console.log('');
    console.log(`   📁 Utworzono folder: ${CREDS_DIR}`);
  }
}
console.log('');

// ─── 2. Sprawdź config ──────────────────────────
console.log('2️⃣  Konfiguracja');
console.log(`   Domena:     ${config.site.domain}`);
console.log(`   GSC Site:   ${config.gsc.siteUrl}`);
console.log(`   GA4 ID:     ${config.ga4.propertyId || '❌ NIE SKONFIGUROWANY'}`);
console.log(`   Domyślny okres: ${config.defaults.days} dni`);
console.log('');

if (!config.ga4.propertyId) {
  console.log('   💡 Aby skonfigurować GA4:');
  console.log('   1. Otwórz https://analytics.google.com');
  console.log('   2. Admin → Property Settings → Property ID');
  console.log('   3. Wpisz "properties/XXXXXXXX" w config.json → ga4.propertyId');
  console.log('');
}

// ─── 3. Sprawdź .gitignore ──────────────────────
console.log('3️⃣  Bezpieczeństwo');
const gitignorePath = path.join(__dirname, '..', '..', '.gitignore');
if (fs.existsSync(gitignorePath)) {
  const gitignore = fs.readFileSync(gitignorePath, 'utf8');
  const hasCredentials = gitignore.includes('credentials/') || gitignore.includes('service-account.json');
  if (hasCredentials) {
    console.log('   ✅ Credentials w .gitignore');
  } else {
    console.log('   ⚠️  Dodaj do .gitignore:');
    console.log('      SEO/seo-agent/credentials/');
    console.log('      SEO/seo-agent/reports/');
  }
} else {
  console.log('   ⚠️  Brak .gitignore — utwórz i dodaj exclusions');
}
console.log('');

// ─── 4. Podsumowanie ─────────────────────────────
console.log('4️⃣  Następne kroki');
console.log('');
console.log('   📌 Po skonfigurowaniu uruchom:');
console.log('      cd SEO/seo-agent');
console.log('      npm install');
console.log('      node agent.js --dry-run    ← test połączenia');
console.log('      node agent.js              ← pełny raport');
console.log('');
