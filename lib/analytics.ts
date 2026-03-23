/**
 * Analytics helpers — GTM dataLayer events
 *
 * All tracking goes through GTM dataLayer. GA4 tags in GTM
 * pick up these events and forward to Google Analytics / Ads.
 *
 * Usage:
 *   import { trackEvent, trackLead, trackPhoneClick } from '@/lib/analytics';
 *   trackEvent('calculator_start', { area: 120 });
 *   trackLead('calculator', { area: '120', finish: 'sso' });
 */

// ─── UTM Helpers ──────────────────────────────────────────

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  landing_page?: string;
  referrer?: string;
}

const UTM_STORAGE_KEY = 'coreltb-utm';

/**
 * Capture UTM params from URL on first page load.
 * Stores in sessionStorage so they persist across page navigations.
 * Call this once from a client component (e.g. layout or form).
 */
export function captureUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};

  // Check if already captured this session
  const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // corrupted, re-capture
    }
  }

  const params = new URLSearchParams(window.location.search);
  const utm: UTMParams = {};

  const keys: (keyof UTMParams)[] = [
    'utm_source',
    'utm_medium',
    'utm_campaign',
    'utm_content',
    'utm_term',
  ];

  for (const key of keys) {
    const val = params.get(key);
    if (val) utm[key] = val;
  }

  // Always capture landing page and referrer
  utm.landing_page = window.location.pathname;
  utm.referrer = document.referrer || undefined;

  // Store for the session
  sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));

  return utm;
}

/**
 * Get stored UTM params (captured earlier in the session).
 */
export function getUTMParams(): UTMParams {
  if (typeof window === 'undefined') return {};
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

// ─── Event Tracking ───────────────────────────────────────

/**
 * Push a custom event to GTM dataLayer.
 * GA4 tag in GTM should be configured to capture these.
 */
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === 'undefined') return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: eventName,
    ...params,
  });
}

// ─── Lead Tracking ────────────────────────────────────────

type LeadSource = 'calculator' | 'consultation' | 'plot_analysis';

/**
 * Track a lead conversion. Includes UTM data for attribution.
 * This fires the main conversion event that Google Ads optimizes for.
 */
export function trackLead(
  source: LeadSource,
  data?: Record<string, string | number | undefined>
) {
  const utm = getUTMParams();

  const eventMap: Record<LeadSource, string> = {
    calculator: 'calculator_lead',
    consultation: 'consultation_lead',
    plot_analysis: 'plot_analysis_lead',
  };

  trackEvent(eventMap[source], {
    lead_source: source,
    ...utm,
    ...data,
  });
}

// ─── Specific Events ──────────────────────────────────────

/** User clicked a phone number link */
export function trackPhoneClick(location: string) {
  trackEvent('phone_click', { click_location: location });
}

/** User clicked a CTA button */
export function trackCTAClick(ctaName: string, page: string) {
  trackEvent('cta_click', { cta_name: ctaName, page });
}

// ─── Calculator Funnel ────────────────────────────────────

/** User changed the first parameter in calculator */
export function trackCalculatorStart() {
  trackEvent('calculator_start');
}

/** User selected a specific calculator step */
export function trackCalculatorStep(
  step: string,
  value: string | number
) {
  trackEvent('calculator_step', { step, value: String(value) });
}

/** User saw the estimate (all fields filled) */
export function trackEstimateView(estimateTotal?: string) {
  trackEvent('calculator_estimate_view', { estimate_total: estimateTotal });
}

/** User focused on a contact field (started filling personal data) */
export function trackFormFocus(formName: string) {
  trackEvent('form_focus', { form_name: formName });
}

/** Form validation error */
export function trackFormError(formName: string, field: string) {
  trackEvent('form_error', { form_name: formName, error_field: field });
}
