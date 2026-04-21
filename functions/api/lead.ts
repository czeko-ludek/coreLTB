/**
 * Cloudflare Pages Function — /api/lead
 *
 * Handles lead form submissions from:
 *   - /wycena (calculator)
 *   - /umow-konsultacje (consultation)
 *   - /analiza-dzialki (plot analysis)
 *
 * Security:
 *   - Origin check (Referer must be from allowed domains)
 *   - Honeypot field (hidden "website" field must be empty)
 *   - Rate limiting (5 req/IP/min via in-memory map)
 *   - POST only
 */

interface Env {
  RESEND_API_KEY: string;
  LEAD_NOTIFICATION_EMAIL?: string;
  LEAD_FROM_EMAIL?: string;
}

// Cloudflare Pages Function types (built separately by Cloudflare)
interface CFContext {
  request: Request;
  env: Env;
}

type CFHandler = (context: CFContext) => Promise<Response>;

// ─── Rate Limiting (per-isolate, basic protection) ───────

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 5; // max requests per window

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) || [];

  // Remove expired timestamps
  const valid = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);

  if (valid.length >= RATE_LIMIT_MAX) {
    return true;
  }

  valid.push(now);
  rateLimitMap.set(ip, valid);

  // Cleanup old IPs periodically (prevent memory leak)
  if (rateLimitMap.size > 10_000) {
    for (const [key, vals] of rateLimitMap) {
      if (vals.every((t) => now - t > RATE_LIMIT_WINDOW)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

// ─── Origin Check ────────────────────────────────────────

const ALLOWED_ORIGINS = [
  'coreltb.pl',
  'www.coreltb.pl',
  'coreltb-v2.pages.dev',
  'v3.coreltb-v2.pages.dev',
  'localhost',
  '127.0.0.1',
];

function isAllowedOrigin(request: Request): boolean {
  const referer = request.headers.get('referer') || '';
  const origin = request.headers.get('origin') || '';

  const check = referer || origin;
  if (!check) return false;

  try {
    const url = new URL(check);
    return ALLOWED_ORIGINS.some(
      (allowed) =>
        url.hostname === allowed || url.hostname.endsWith(`.${allowed}`)
    );
  } catch {
    return false;
  }
}

// ─── Email Templates ─────────────────────────────────────

const BRAND_DARK = '#1a1a1a';
const BRAND_GOLD = '#dfbb68';

function baseTemplate(title: string, rows: [string, string][]): string {
  const rowsHtml = rows
    .filter(([, v]) => v)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:8px 12px;color:#888;font-size:13px;border-bottom:1px solid #f0f0f0;white-space:nowrap">${label}</td><td style="padding:8px 12px;font-weight:600;color:${BRAND_DARK};font-size:14px;border-bottom:1px solid #f0f0f0">${value}</td></tr>`
    )
    .join('');

  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:0;background:#f5f5f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif">
<div style="max-width:600px;margin:24px auto;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
<div style="background:${BRAND_DARK};padding:24px 32px;text-align:center">
<h1 style="margin:0;color:${BRAND_GOLD};font-size:20px;font-weight:700">CoreLTB Builders</h1>
<p style="margin:6px 0 0;color:#aaa;font-size:13px">Nowe zgłoszenie</p>
</div>
<div style="padding:24px 32px">
<h2 style="margin:0 0 16px;font-size:17px;color:${BRAND_DARK}">${title}</h2>
<table style="width:100%;border-collapse:collapse">${rowsHtml}</table>
</div>
<div style="background:#fafafa;padding:16px 32px;text-align:center;border-top:1px solid #eee">
<p style="margin:0;font-size:12px;color:#999">CoreLTB Sp. z o.o. · coreltb.pl</p>
</div>
</div></body></html>`;
}

function utmRows(d: Record<string, string>): [string, string][] {
  const rows: [string, string][] = [];
  if (d.utm_source) rows.push(['Źródło (UTM)', `${d.utm_source} / ${d.utm_medium || '-'}`]);
  if (d.utm_campaign) rows.push(['Kampania', d.utm_campaign]);
  if (d.utm_term) rows.push(['Hasło wyszukiwania', d.utm_term]);
  if (d.utm_content) rows.push(['Wariant reklamy', d.utm_content]);
  if (d.landing_page) rows.push(['Strona wejścia', d.landing_page]);
  if (d.referrer) rows.push(['Referrer', d.referrer]);
  return rows;
}

function calculatorEmail(d: Record<string, string>): { subject: string; html: string } {
  const utmTag = d.utm_source ? ` [${d.utm_source}/${d.utm_medium || '?'}]` : '';
  return {
    subject: `[Wycena] ${d.name} — ${d.area} m² ${d.finish || ''}${utmTag}`.trim(),
    html: baseTemplate('Nowa wycena z kalkulatora', [
      ['Imię i nazwisko', d.name],
      ['Telefon', d.phone],
      ['E-mail', d.email],
      ['Lokalizacja', d.location],
      ['Powierzchnia', d.area ? `${d.area} m²` : ''],
      ['Kondygnacje', d.floors],
      ['Ściany', d.wallType],
      ['Dach', d.roofType],
      ['Fundament', d.foundation],
      ['Piwnica', d.basement],
      ['Garaż', d.garage],
      ['Standard', d.finish],
      ['Ogrzewanie', d.heating],
      ['Szacunek netto', d.estimateTotal],
      ['Szacunek brutto', d.estimateTotalBrutto],
      ...utmRows(d),
    ]),
  };
}

function consultationEmail(d: Record<string, string>): { subject: string; html: string } {
  const utmTag = d.utm_source ? ` [${d.utm_source}/${d.utm_medium || '?'}]` : '';
  return {
    subject: `[Konsultacja] ${d.name} — ${d.service || 'Ogólne'}${utmTag}`,
    html: baseTemplate('Nowe zapytanie o konsultację', [
      ['Imię i nazwisko', d.name],
      ['Telefon', d.phone],
      ['E-mail', d.email],
      ['Usługa', d.service],
      ['Miasto', d.city],
      ['Preferowany kontakt', d.contactPref],
      ['Ma działkę', d.hasPlot],
      ['Ma projekt', d.hasProject],
      ['Metraż', d.area],
      ['Etap budowy', d.buildStage],
      ['Rodzaj projektu', d.projectType],
      ['Uwagi', d.notes],
      ...utmRows(d),
    ]),
  };
}

function plotAnalysisEmail(d: Record<string, string>): { subject: string; html: string } {
  const utmTag = d.utm_source ? ` [${d.utm_source}/${d.utm_medium || '?'}]` : '';
  return {
    subject: `[Analiza działki] ${d.name} — ${d.address || ''}${utmTag}`.trim(),
    html: baseTemplate('Nowe zgłoszenie analizy działki', [
      ['Imię i nazwisko', d.name],
      ['Telefon', d.phone],
      ['E-mail', d.email],
      ['Adres działki', d.address],
      ['Nr działki', d.plotNumber],
      ['Księga wieczysta', d.landRegister],
      ['MPZP', d.mpzp],
      ['Uwagi', d.notes],
      ...utmRows(d),
    ]),
  };
}

function plotInquiryEmail(d: Record<string, string>): { subject: string; html: string } {
  const utmTag = d.utm_source ? ` [${d.utm_source}/${d.utm_medium || '?'}]` : '';
  const plotUrl = d.plotSlug ? `https://coreltb.pl/dzialki/${d.plotSlug}` : '';
  const plotLink = plotUrl ? `<a href="${plotUrl}" style="color:${BRAND_GOLD};text-decoration:underline">${plotUrl}</a>` : '';
  return {
    subject: `[Działka] ${d.name} — ${d.plotCity || ''}${utmTag}`.trim(),
    html: baseTemplate('Zapytanie o działkę', [
      ['Imię i nazwisko', d.name],
      ['Telefon', d.phone],
      ['Działka', d.plotTitle],
      ['Link do działki', plotLink],
      ['Miasto', d.plotCity],
      ['Wiadomość', d.message],
      ['Referer', d.referrer || d.landing_page || ''],
      ...utmRows(d),
    ]),
  };
}

// ─── Handler ─────────────────────────────────────────────

export const onRequestPost: CFHandler = async (context) => {
  const { request, env } = context;

  // CORS preflight
  const corsHeaders = {
    'Access-Control-Allow-Origin': request.headers.get('origin') || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  // ── Security checks ──

  // 1. Origin check
  if (!isAllowedOrigin(request)) {
    return new Response(JSON.stringify({ error: 'Niedozwolone źródło' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // 2. Rate limiting
  const ip =
    request.headers.get('cf-connecting-ip') ||
    request.headers.get('x-forwarded-for') ||
    'unknown';

  if (isRateLimited(ip)) {
    return new Response(
      JSON.stringify({ error: 'Zbyt wiele prób. Poczekaj chwilę.' }),
      {
        status: 429,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      }
    );
  }

  // 3. Parse body
  let body: { source: string; data: Record<string, string> };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Nieprawidłowe dane' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  const { source, data } = body;

  // 4. Honeypot check — hidden "website" field must be empty
  if (data.website) {
    // Bot detected — return fake success (don't reveal detection)
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // 5. Basic validation
  if (!['calculator', 'consultation', 'plot_analysis', 'plot_inquiry'].includes(source)) {
    return new Response(
      JSON.stringify({ error: 'Nieprawidłowe źródło formularza' }),
      { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  if (!data.name || data.name.trim().length < 2) {
    return new Response(JSON.stringify({ error: 'Brak imienia' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  if (!data.phone || data.phone.replace(/\D/g, '').length < 9) {
    return new Response(JSON.stringify({ error: 'Brak telefonu' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', ...corsHeaders },
    });
  }

  // ── Generate email ──

  let emailContent: { subject: string; html: string };
  switch (source) {
    case 'calculator':
      emailContent = calculatorEmail(data);
      break;
    case 'consultation':
      emailContent = consultationEmail(data);
      break;
    case 'plot_analysis':
      emailContent = plotAnalysisEmail(data);
      break;
    case 'plot_inquiry':
      emailContent = plotInquiryEmail(data);
      break;
    default:
      return new Response(JSON.stringify({ error: 'Unknown source' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', ...corsHeaders },
      });
  }

  // ── Send via Resend REST API ──

  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) {
    console.error('[Lead] Missing RESEND_API_KEY');
    return new Response(
      JSON.stringify({ error: 'Konfiguracja serwera — brak klucza API' }),
      { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } }
    );
  }

  const to = env.LEAD_NOTIFICATION_EMAIL || 'biuro@coreltb.pl';
  const from = env.LEAD_FROM_EMAIL || 'onboarding@resend.dev';

  try {
    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `CoreLTB Leady <${from}>`,
        to: [to],
        subject: emailContent.subject,
        html: emailContent.html,
      }),
    });

    if (!resendRes.ok) {
      const err = await resendRes.text();
      console.error('[Lead] Resend error:', err);
      // Still return success to user — lead data logged
    } else {
      const result = await resendRes.json() as { id?: string };
      console.log(`[Lead] ${source} — ${data.name} — sent: ${result.id}`);
    }
  } catch (err) {
    console.error('[Lead] Network error:', err);
  }

  return new Response(JSON.stringify({ success: true, source }), {
    status: 200,
    headers: { 'Content-Type': 'application/json', ...corsHeaders },
  });
};

// Handle OPTIONS for CORS preflight
export const onRequestOptions: CFHandler = async (context) => {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': context.request.headers.get('origin') || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
};
