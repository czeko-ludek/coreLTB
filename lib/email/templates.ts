/**
 * HTML Email Templates for Lead Notifications
 * Brand colors: #1a1a1a (dark), #dfbb68 (primary gold), #fafaf9 (light bg)
 */

// ─── Brand constants ──────────────────────────────────

const BRAND = {
  dark: '#1a1a1a',
  gold: '#dfbb68',
  goldDark: '#d4a847',
  goldLight: '#e8cc8a',
  lightBg: '#fafaf9',
  border: '#2a2a2a',
  textPrimary: '#1a1a1a',
  textMuted: '#71717a',
  white: '#ffffff',
  logoUrl: 'https://coreltb.pl/images/logo-white.webp',
};

// ─── Template builder ─────────────────────────────────

function wrapTemplate(badgeText: string, title: string, rows: string, timestamp: string): string {
  return `<!DOCTYPE html>
<html lang="pl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f0f0ee; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', sans-serif;">
  <div style="max-width: 600px; margin: 24px auto; background: ${BRAND.white}; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">

    <!-- Header with logo -->
    <div style="background: ${BRAND.dark}; padding: 32px 32px 28px; text-align: center;">
      <!-- Logo: odkomentuj po deploy na coreltb.pl -->
      <!-- <img src="${BRAND.logoUrl}" alt="CoreLTB Builders" width="64" height="64" style="border-radius: 14px; margin-bottom: 16px;" /> -->
      <div style="display: inline-block; padding: 5px 16px; border-radius: 20px; background: ${BRAND.gold}; color: ${BRAND.dark}; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px;">
        ${badgeText}
      </div>
      <h1 style="margin: 14px 0 0; font-size: 22px; font-weight: 700; color: ${BRAND.white}; line-height: 1.3;">
        ${title}
      </h1>
      <p style="margin: 6px 0 0; font-size: 13px; color: #888888;">
        ${timestamp}
      </p>
    </div>

    <!-- Gold accent line -->
    <div style="height: 3px; background: linear-gradient(90deg, ${BRAND.gold}, ${BRAND.goldLight}, ${BRAND.gold});"></div>

    <!-- Content -->
    <div style="padding: 28px 32px;">
      <table style="width: 100%; border-collapse: collapse;">
        ${rows}
      </table>
    </div>

    <!-- Footer -->
    <div style="padding: 20px 32px; background: ${BRAND.dark}; text-align: center;">
      <p style="margin: 0; color: #666666; font-size: 12px; line-height: 1.5;">
        <span style="color: ${BRAND.gold};">CoreLTB Builders</span> · Generalny Wykonawca
        <br />ul. Wilcza 2, 43-600 Jaworzno · +48 664 123 757
        <br /><a href="https://coreltb.pl" style="color: ${BRAND.gold}; text-decoration: none;">coreltb.pl</a>
      </p>
    </div>

  </div>
</body>
</html>`;
}

function row(label: string, value: string | undefined | null): string {
  if (!value) return '';
  return `<tr>
    <td style="padding: 10px 8px 10px 0; border-bottom: 1px solid #f0f0f0; color: ${BRAND.textMuted}; font-size: 13px; font-weight: 600; width: 155px; vertical-align: top;">
      ${label}
    </td>
    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: ${BRAND.textPrimary}; font-size: 14px; font-weight: 500; vertical-align: top;">
      ${value}
    </td>
  </tr>`;
}

function phoneRow(label: string, value: string | undefined | null): string {
  if (!value) return '';
  const cleanNumber = value.replace(/[\s()-]/g, '');
  return `<tr>
    <td style="padding: 10px 8px 10px 0; border-bottom: 1px solid #f0f0f0; color: ${BRAND.textMuted}; font-size: 13px; font-weight: 600; width: 155px; vertical-align: top;">
      ${label}
    </td>
    <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 14px; font-weight: 600; vertical-align: top;">
      <a href="tel:${cleanNumber}" style="color: #2563eb; text-decoration: none;">${value}</a>
    </td>
  </tr>`;
}

function sectionHeader(label: string): string {
  return `<tr>
    <td colspan="2" style="padding: 18px 0 6px; border: none; color: ${BRAND.gold}; font-weight: 700; font-size: 12px; text-transform: uppercase; letter-spacing: 1px;">
      ${label}
    </td>
  </tr>`;
}

// ─── Calculator Template ──────────────────────────────

export interface CalculatorLeadData {
  name: string;
  phone: string;
  email?: string;
  location?: string;
  area: number;
  floors: string;
  wallType: string;
  roofType: string;
  foundation: string;
  basement: string;
  garage: string;
  finish: string;
  heating: string;
  estimateTotal?: string;
  estimateTotalBrutto?: string;
}

export function calculatorEmailTemplate(data: CalculatorLeadData): { subject: string; html: string } {
  const timestamp = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

  const rows = [
    sectionHeader('Dane kontaktowe'),
    row('Imię i nazwisko', data.name),
    phoneRow('Telefon', data.phone),
    row('E-mail', data.email),
    row('Lokalizacja', data.location),
    sectionHeader('Konfiguracja budynku'),
    row('Powierzchnia', `${data.area} m\u00B2`),
    row('Kondygnacje', data.floors),
    row('Ściany', data.wallType),
    row('Dach', data.roofType),
    row('Fundament', data.foundation),
    row('Piwnica', data.basement),
    row('Garaż', data.garage),
    row('Standard wykończenia', data.finish),
    row('Ogrzewanie', data.heating),
    ...(data.estimateTotal ? [
      sectionHeader('Wycena'),
      `<tr>
        <td style="padding: 12px 8px 12px 0; border: none; color: ${BRAND.textMuted}; font-size: 13px; font-weight: 600; width: 155px; vertical-align: middle;">Kwota netto</td>
        <td style="padding: 12px 0; border: none; color: ${BRAND.textPrimary}; font-size: 18px; font-weight: 800; vertical-align: middle;">${data.estimateTotal}</td>
      </tr>`,
      row('Kwota brutto', data.estimateTotalBrutto),
    ] : []),
  ].join('');

  return {
    subject: `[Wycena] ${data.name} — ${data.area} m², ${data.finish}`,
    html: wrapTemplate('Kalkulator Wyceny', 'Nowy lead z kalkulatora', rows, timestamp),
  };
}

// ─── Consultation Template ────────────────────────────

export interface ConsultationLeadData {
  name: string;
  phone: string;
  email?: string;
  service: string;
  city?: string;
  contactPref?: string;
  notes?: string;
  hasPlot?: string;
  hasProject?: string;
  area?: string;
  buildStage?: string;
  projectType?: string;
}

export function consultationEmailTemplate(data: ConsultationLeadData): { subject: string; html: string } {
  const timestamp = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

  const rows = [
    sectionHeader('Dane kontaktowe'),
    row('Imię i nazwisko', data.name),
    phoneRow('Telefon', data.phone),
    row('E-mail', data.email),
    row('Preferowany kontakt', data.contactPref),
    sectionHeader('Szczegóły zapytania'),
    row('Usługa', data.service),
    row('Miasto', data.city),
    row('Ma działkę', data.hasPlot),
    row('Ma projekt', data.hasProject),
    row('Powierzchnia', data.area),
    row('Etap budowy', data.buildStage),
    row('Typ projektu', data.projectType),
    row('Uwagi', data.notes),
  ].join('');

  return {
    subject: `[Konsultacja] ${data.service} — ${data.name}${data.city ? ` (${data.city})` : ''}`,
    html: wrapTemplate('Konsultacja', 'Nowe zapytanie o konsultację', rows, timestamp),
  };
}

// ─── Plot Analysis Template ───────────────────────────

export interface PlotAnalysisLeadData {
  name: string;
  phone: string;
  email?: string;
  address: string;
  plotNumber?: string;
  landRegister?: string;
  mpzp?: string;
  notes?: string;
}

export function plotAnalysisEmailTemplate(data: PlotAnalysisLeadData): { subject: string; html: string } {
  const timestamp = new Date().toLocaleString('pl-PL', { timeZone: 'Europe/Warsaw' });

  const mpzpLabels: Record<string, string> = {
    tak: 'Tak — działka jest w MPZP',
    nie: 'Nie — brak MPZP',
    nie_wiem: 'Nie wiem',
  };

  const rows = [
    sectionHeader('Dane kontaktowe'),
    row('Imię i nazwisko', data.name),
    phoneRow('Telefon', data.phone),
    row('E-mail', data.email),
    sectionHeader('Dane działki'),
    row('Adres / lokalizacja', data.address),
    row('Nr działki', data.plotNumber),
    row('Nr KW', data.landRegister),
    row('MPZP', data.mpzp ? mpzpLabels[data.mpzp] || data.mpzp : undefined),
    row('Dodatkowe informacje', data.notes),
  ].join('');

  return {
    subject: `[Analiza działki] ${data.address} — ${data.name}`,
    html: wrapTemplate('Analiza Działki', 'Nowe zgłoszenie analizy działki', rows, timestamp),
  };
}
