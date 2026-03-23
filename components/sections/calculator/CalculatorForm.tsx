'use client';

import { useState, useReducer, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { OptionCard } from '@/components/ui/OptionCard';
import {
  calculateEstimate,
  WALL_LABELS,
  ROOF_LABELS,
  FLOOR_LABELS,
  GARAGE_LABELS,
  FINISH_LABELS,
  HEATING_LABELS,
  FOUNDATION_LABELS,
  BASEMENT_LABELS,
  type WallType,
  type RoofType,
  type FloorType,
  type GarageType,
  type FinishType,
  type HeatingType,
  type FoundationType,
  type BasementType,
  type EstimateBreakdown,
  type CalculatorConfig,
} from '@/data/pricing';
import { companyData } from '@/data/company-data';
import { validatePolishPhone } from '@/lib/validation';
import { useEmailSuggestion } from '@/hooks/useEmailSuggestion';
import { validateEmailStructure } from '@/lib/email-validation';
import {
  captureUTMParams,
  getUTMParams,
  trackLead,
  trackCalculatorStart,
  trackCalculatorStep,
} from '@/lib/analytics';

// ─── State ──────────────────────────────────────────────

interface FormState {
  area: number;
  floors: FloorType;
  wallType: WallType;
  roofType: RoofType;
  garage: GarageType;
  finish: FinishType;
  heating: HeatingType;
  foundation: FoundationType;
  basement: BasementType;
  name: string;
  phone: string;
  email: string;
  location: string;
  file: File | null;
  consentData: boolean;
  consentContact: boolean;
  errors: Record<string, string>;
  projectName: string;
}

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string | number | boolean | File | null }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'CLEAR_ERRORS' };

const initialState: FormState = {
  area: 0,
  floors: '' as FloorType,
  wallType: '' as WallType,
  roofType: '' as RoofType,
  garage: '' as GarageType,
  finish: '' as FinishType,
  heating: '' as HeatingType,
  foundation: '' as FoundationType,
  basement: '' as BasementType,
  name: '',
  phone: '',
  email: '',
  location: '',
  file: null,
  consentData: false,
  consentContact: false,
  errors: {},
  projectName: '',
};

function reducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value, errors: { ...state.errors, [action.field]: '' } };
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} };
    default:
      return state;
  }
}

const areaPresets = [100, 120, 140, 160, 180, 200];

// Nav links — identyczne z Header
const mobileNavLinks: { label: string; href: string; icon: IconName }[] = [
  { label: 'Strona główna', href: '/', icon: 'home' },
  { label: 'O nas', href: '/o-nas', icon: 'users' },
  { label: 'Oferta', href: '/oferta', icon: 'briefcase' },
  { label: 'Projekty', href: '/projekty', icon: 'building' },
  { label: 'Kontakt', href: '/kontakt', icon: 'mail' },
];

function formatPrice(n: number): string {
  return n.toLocaleString('pl-PL');
}

function generateRefNumber(): string {
  const now = new Date();
  const rand = Math.floor(Math.random() * 9000 + 1000);
  const d = now.getDate();
  const m = now.getMonth() + 1;
  const y = now.getFullYear();
  return `${rand}/${d}/${m}/${y}`;
}

// ─── Component ──────────────────────────────────────────

export const CalculatorForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<EstimateBreakdown | null>(null);
  const [submittedConfig, setSubmittedConfig] = useState<CalculatorConfig | null>(null);
  const [refNumber] = useState(() => generateRefNumber());
  const [areaInput, setAreaInput] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Pre-fill calculator from URL params (e.g., /wycena?area=120&floors=parterowy&roofType=dwuspadowy...)
  useEffect(() => {
    const areaParam = searchParams.get('area');
    if (areaParam) {
      const parsed = parseInt(areaParam, 10);
      if (!isNaN(parsed) && parsed >= 80 && parsed <= 500) {
        dispatch({ type: 'SET_FIELD', field: 'area', value: parsed });
        setAreaInput(String(parsed));
      }
    }

    // Valid values for each field
    const validValues: Record<string, string[]> = {
      floors: ['parterowy', 'poddasze', 'pietrowy'],
      wallType: ['beton_komorkowy', 'ceramika', 'silikat'],
      roofType: ['plaski', 'dwuspadowy', 'wielospadowy'],
      garage: ['brak', 'jednostanowiskowy', 'dwustanowiskowy'],
      finish: ['sso', 'deweloperski', 'pod_klucz'],
      heating: ['gazowe', 'pompa_ciepla', 'pelet'],
      foundation: ['plyta', 'lawy'],
      basement: ['brak', 'czesciowa', 'cala'],
    };

    for (const [field, allowed] of Object.entries(validValues)) {
      const val = searchParams.get(field);
      if (val && allowed.includes(val)) {
        dispatch({ type: 'SET_FIELD', field, value: val });
      }
    }

    // Project name — passed from project detail page via buildCalculatorUrl()
    const projektParam = searchParams.get('projekt');
    if (projektParam) {
      dispatch({ type: 'SET_FIELD', field: 'projectName', value: projektParam });
    }
  }, [searchParams]);

  // Capture UTM params on mount
  useEffect(() => {
    captureUTMParams();
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  // Email typo detection + disposable blocking
  const emailSuggestion = useEmailSuggestion(state.email, (corrected) => {
    dispatch({ type: 'SET_FIELD', field: 'email', value: corrected });
  });

  // Track calculator funnel steps
  const hasTrackedStart = useRef(false);
  const set = (field: string, value: string | number | boolean | File | null) => {
    // Track first interaction
    if (!hasTrackedStart.current) {
      hasTrackedStart.current = true;
      trackCalculatorStart();
    }
    // Track each step change
    if (typeof value === 'string' || typeof value === 'number') {
      trackCalculatorStep(field, value);
    }
    dispatch({ type: 'SET_FIELD', field, value });
  };

  // Conditional logic — poddasze always visible, wielospadowy always available
  const availableFloors: FloorType[] = ['parterowy', 'poddasze', 'pietrowy'];

  // Plaski dach not available with poddasze (no attic space under flat roof)
  const availableRoofs: RoofType[] =
    state.floors === 'poddasze'
      ? ['dwuspadowy', 'wielospadowy']
      : ['plaski', 'dwuspadowy', 'wielospadowy'];

  // If user switches to poddasze while plaski is selected, auto-switch roof
  if (state.floors === 'poddasze' && state.roofType === 'plaski') {
    set('roofType', 'dwuspadowy');
  }

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!state.area || state.area < 80) errors.area = 'Podaj powierzchnię (min. 80 m²)';
    if (!state.floors) errors.floors = 'Wybierz kondygnację';
    if (!state.wallType) errors.wallType = 'Wybierz typ ścian';
    if (!state.roofType) errors.roofType = 'Wybierz typ dachu';
    if (!state.finish) errors.finish = 'Wybierz standard wykończenia';
    if (!state.heating) errors.heating = 'Wybierz typ ogrzewania';
    if (!state.foundation) errors.foundation = 'Wybierz typ fundamentu';
    if (!state.basement) errors.basement = 'Wybierz opcję piwnicy';
    if (!state.name.trim() || state.name.trim().length < 3) errors.name = 'Podaj imię i nazwisko';
    if (!state.phone.trim() || !validatePolishPhone(state.phone))
      errors.phone = 'Podaj prawidłowy polski numer telefonu (9 cyfr)';
    if (state.email) {
      const emailError = validateEmailStructure(state.email);
      if (emailError) errors.email = emailError;
    }
    if (!state.consentData) errors.consentData = 'Wymagana zgoda';
    if (!state.consentContact) errors.consentContact = 'Wymagana zgoda';
    return errors;
  }

  // Loading modal steps
  const [loadingStep, setLoadingStep] = useState(-1);
  const loadingSteps = [
    'Analizujemy parametry budynku…',
    'Obliczamy ilości materiałów…',
    'Kalkulujemy koszty robocizny…',
    'Przygotowujemy Twoją wycenę…',
  ];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });

      // Find first missing option group or input error and scroll to it
      const optionFields = ['floors', 'wallType', 'roofType', 'foundation', 'basement', 'finish', 'heating'];
      const firstMissingOption = optionFields.find(f => errors[f]);
      if (firstMissingOption) {
        const el = document.querySelector(`[data-option-group="${firstMissingOption}"]`);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          // Re-trigger animation by removing and re-adding class
          el.classList.remove('animate-error-pulse');
          void (el as HTMLElement).offsetWidth; // force reflow
          el.classList.add('animate-error-pulse');
          return;
        }
      }

      // Fallback: scroll to first data-error input
      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);
    const config: CalculatorConfig = {
      area: state.area,
      floors: state.floors,
      wallType: state.wallType,
      roofType: state.roofType,
      garage: state.garage,
      finish: state.finish,
      heating: state.heating,
      foundation: state.foundation,
      basement: state.basement,
    };

    const result = calculateEstimate(config);

    // Animated loading steps
    for (let i = 0; i < loadingSteps.length; i++) {
      setLoadingStep(i);
      await new Promise((resolve) => setTimeout(resolve, 1250));
    }

    setEstimate(result);
    setSubmittedConfig(config);
    setLoadingStep(-1);
    setIsSubmitting(false);

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Send lead email (with UTM data for attribution)
    const utm = getUTMParams();
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'calculator',
          data: {
            name: state.name,
            phone: state.phone,
            email: state.email || undefined,
            location: state.location || undefined,
            area: state.area,
            floors: FLOOR_LABELS[config.floors],
            wallType: WALL_LABELS[config.wallType],
            roofType: ROOF_LABELS[config.roofType],
            foundation: FOUNDATION_LABELS[config.foundation],
            basement: BASEMENT_LABELS[config.basement],
            garage: GARAGE_LABELS[config.garage],
            finish: FINISH_LABELS[config.finish],
            heating: HEATING_LABELS[config.heating],
            estimateTotal: `${formatPrice(Math.round((result.total.min + result.total.max) / 2))} zl netto`,
            estimateTotalBrutto: `${formatPrice(Math.round((result.totalBrutto.min + result.totalBrutto.max) / 2))} zl brutto`,
            projektName: state.projectName || undefined,
            website: honeypotRef.current?.value || '',
            // UTM attribution
            utm_source: utm.utm_source || '',
            utm_medium: utm.utm_medium || '',
            utm_campaign: utm.utm_campaign || '',
            utm_content: utm.utm_content || '',
            landing_page: utm.landing_page || '',
            referrer: utm.referrer || '',
          },
        }),
      });
    } catch (err) {
      console.error('[Calculator] Email send error:', err);
    }

    // GA4 conversion event (via GTM dataLayer)
    trackLead('calculator', {
      area: String(state.area),
      finish: state.finish,
      estimate_total: String(Math.round((result.total.min + result.total.max) / 2)),
    });
  }

  function handlePrint() {
    window.print();
  }

  // ─── Estimate result data ──

  const estimateToday = estimate ? new Date() : null;
  const estimateValidUntil = estimateToday ? (() => { const d = new Date(estimateToday); d.setDate(d.getDate() + 14); return d; })() : null;

  // ─── Render ────────────────────────────────────────
  // Store the estimate document JSX for use inside the right panel
  const estimateDocument = (estimate && submittedConfig && estimateToday && estimateValidUntil) ? (
    <div ref={resultRef} className="px-5 md:px-8 lg:px-10 xl:px-14 py-8 md:py-10 lg:py-12 print:p-0">
          {/* Screen-only: Thank you header */}
          <div className="text-center mb-8 print:hidden">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-5">
              <Icon name="checkCircle" size="xl" className="text-green-600" />
            </div>
            <h2 className="text-h3 md:text-display font-bold font-heading">
              Dziękujemy, {state.name.split(' ')[0]}!
            </h2>
            <p className="mt-3 text-body-md text-text-secondary">
              Poniżej Twoja wstępna wycena. Oddzwonimy w ciągu 24h z&nbsp;dokładną kalkulacją.
            </p>
          </div>

          {/* ═══ THE DOCUMENT ═══ */}
          <div
            className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden
              print:shadow-none print:border-0 print:rounded-none"
            id="estimate-pdf"
          >
            {/* Document Header — Company info + estimate number */}
            <div className="bg-background-dark p-8 md:p-10 print:p-10">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-5">
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <Image
                    src="/images/logo-white.webp"
                    alt="CoreLTB Builders"
                    width={64}
                    height={64}
                    className="rounded-xl flex-shrink-0"
                  />
                  <div>
                    <h1 className="text-white font-bold text-h5 md:text-h3 font-heading">{companyData.name}</h1>
                    <p className="text-gray-300 text-body-xs md:text-body-sm mt-0.5">Generalny Wykonawca Domów Jednorodzinnych</p>
                    <div className="mt-2 text-body-xs text-gray-400">
                      <p>{companyData.address.streetAddress}, {companyData.address.postalCode} {companyData.address.addressLocality}</p>
                      <p>tel. +48 664 123 757</p>
                      <p>{companyData.email}</p>
                      <p>coreltb.pl</p>
                    </div>
                  </div>
                </div>
                <div className="md:text-right flex gap-3 md:block text-body-xs md:text-body-sm">
                  <p className="text-primary font-bold uppercase tracking-wider">Wycena wstępna</p>
                  <p className="text-gray-400">Nr: {refNumber}</p>
                  <p className="text-gray-400">{estimateToday!.toLocaleDateString('pl-PL')}</p>
                </div>
              </div>
            </div>

            {/* Client info bar */}
            <div className="print-client-bar bg-gray-50 px-5 md:px-10 py-4 md:py-5 border-b border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 text-body-sm">
                <div>
                  <span className="text-gray-500 block text-body-xs uppercase tracking-wide mb-0.5">Klient</span>
                  <span className="font-semibold text-text-primary">{state.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-body-xs uppercase tracking-wide mb-0.5">Telefon</span>
                  <span className="font-semibold text-text-primary">{state.phone}</span>
                </div>
                {state.email && (
                  <div>
                    <span className="text-gray-500 block text-body-xs uppercase tracking-wide mb-0.5">E-mail</span>
                    <span className="font-semibold text-text-primary">{state.email}</span>
                  </div>
                )}
                {state.location && (
                  <div>
                    <span className="text-gray-500 block text-body-xs uppercase tracking-wide mb-0.5">Lokalizacja</span>
                    <span className="font-semibold text-text-primary">{state.location}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Wstęp — introduction paragraph */}
            <div className="print-wstep px-5 md:px-10 py-5 border-b border-gray-200">
              <p className="text-body-sm text-gray-700 leading-relaxed">
                Szanowni Państwo, dziękujemy za zainteresowanie usługami {companyData.name}.
                Poniżej przedstawiamy wstępną wycenę budowy domu jednorodzinnego{state.projectName ? <> wg projektu <strong>{state.projectName}</strong></> : null} o powierzchni <strong>{submittedConfig.area} m²</strong>.
                Kalkulacja obejmuje materiały budowlane, robociznę, sprzęt oraz nadzór budowlany.
                Ceny są cenami netto i mogą ulec zmianie po analizie projektu architektonicznego oraz warunków gruntowych na działce.
              </p>
            </div>

            {/* Total — Hero */}
            <div className="print-total px-5 md:px-10 py-5 md:py-6 border-b border-gray-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: prices */}
                <div>
                  <p className="text-body-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
                    Szacunkowy koszt budowy
                  </p>
                  <p className="print-total-price text-h3 md:text-h1 font-bold text-text-primary font-heading leading-tight">
                    {formatPrice(Math.round((estimate.total.min + estimate.total.max) / 2))}
                  </p>
                  <p className="print-total-unit text-body-sm text-gray-500 font-normal mt-0.5">
                    złotych netto
                  </p>
                  <p className="text-body-xs text-gray-400 mt-1">
                    brutto: {formatPrice(Math.round((estimate.totalBrutto.min + estimate.totalBrutto.max) / 2))} zł (8% VAT)
                  </p>
                </div>
                {/* Right: meta stats */}
                <div className="flex flex-wrap gap-x-4 gap-y-1 md:flex-col md:gap-2 md:items-end md:text-right">
                  {[
                    { icon: 'calendar' as const, text: `${estimate.czasRealizacji.min}–${estimate.czasRealizacji.max} miesięcy` },
                    { icon: 'ruler' as const, text: `${submittedConfig.area} m²` },
                    { icon: 'coins' as const, text: `~${formatPrice(Math.round((estimate.total.min + estimate.total.max) / 2 / submittedConfig.area))} zł/m²` },
                    { icon: 'shieldCheck' as const, text: `Gwarancja do ${estimate.gwarancja.konstrukcja / 12} lat` },
                  ].map((item) => (
                    <span key={item.icon} className="flex items-center gap-1.5 text-body-xs md:text-body-sm text-gray-700 font-medium">
                      <Icon name={item.icon} size="sm" className="text-primary" />
                      {item.text}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Configuration summary */}
            <div className="print-config px-8 md:px-10 py-5 border-b border-gray-200">
              <h3 className="text-body-xs uppercase tracking-widest text-gray-500 font-semibold mb-3 flex items-center gap-2">
                <Icon name="settings" size="sm" className="text-primary" />
                Parametry konfiguracji
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-2">
                {[
                  ...(state.projectName ? [['Projekt', state.projectName]] : []),
                  ['Powierzchnia', `${submittedConfig.area} m²`],
                  ['Kondygnacje', FLOOR_LABELS[submittedConfig.floors]],
                  ['Ściany', WALL_LABELS[submittedConfig.wallType]],
                  ['Typ dachu', ROOF_LABELS[submittedConfig.roofType]],
                  ['Fundament', FOUNDATION_LABELS[submittedConfig.foundation]],
                  ['Standard', FINISH_LABELS[submittedConfig.finish]],
                  ['Ogrzewanie', HEATING_LABELS[submittedConfig.heating]],
                  ['Piwnica', BASEMENT_LABELS[submittedConfig.basement]],
                  ['Garaż', GARAGE_LABELS[submittedConfig.garage]],
                  ...(state.location ? [['Lokalizacja', state.location]] : []),
                ].map(([label, value]) => (
                  <div key={label} className="py-1.5 border-b border-dashed border-gray-200">
                    <span className="text-[11px] text-gray-500 block">{label}</span>
                    <span className="text-body-sm font-semibold text-text-primary">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Cost breakdown — per stage with included work items */}
            <div className="print-stages px-8 md:px-10 py-8 border-b border-gray-200">
              <h3 className="text-body-sm uppercase tracking-widest text-gray-500 font-semibold mb-6 flex items-center gap-2.5">
                <Icon name="list" size="md" className="text-primary" />
                Zakres prac
              </h3>

              <div className="space-y-5">
                {estimate.stages.map((stage, idx) => {
                  const icons = ['mountain', 'layers', 'home', 'keyRound', 'paintBrush'] as const;
                  const stageIcon = icons[idx] || 'home';
                  return (
                    <div key={stage.label} className="print-stage-card border border-gray-200 rounded-xl overflow-hidden">
                      {/* Stage header */}
                      <div className="print-stage-header flex items-center gap-3 bg-gray-50 px-4 md:px-5 py-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon name={stageIcon} size="md" className="text-primary" />
                        </div>
                        <span className="text-body-sm md:text-body-md font-bold text-text-primary">{stage.label}</span>
                      </div>

                      {/* Description + Included items */}
                      <div className="print-stage-body px-4 md:px-5 py-3">
                        {stage.description && (
                          <p className="text-body-xs text-gray-500 mb-3 leading-relaxed">{stage.description}</p>
                        )}
                        <p className="text-body-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Zakres prac</p>
                        <ul className="space-y-1.5">
                          {stage.includedItems.map((item) => (
                            <li key={item} className="flex items-start gap-2 text-body-sm text-gray-700">
                              <Icon name="check" size="sm" className="text-primary flex-shrink-0 mt-0.5 w-3.5 h-3.5" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  );
                })}

              </div>

              {/* TOTAL */}
              <div className="print-total-row pt-5 mt-5 border-t-2 border-primary space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 border border-green-200 -mx-4 md:-mx-5 px-4 md:px-5 py-3 rounded-lg">
                  <span className="text-body-md sm:text-h5 font-bold text-text-primary">Kwota netto</span>
                  <span className="text-h5 font-bold text-text-primary tabular-nums">
                    {formatPrice(Math.round((estimate.total.min + estimate.total.max) / 2))} zł
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between bg-green-50 border border-green-200 -mx-4 md:-mx-5 px-4 md:px-5 py-2 rounded-lg">
                  <span className="text-body-sm font-bold text-text-primary">Kwota brutto (8% VAT)</span>
                  <span className="text-body-md font-bold text-text-primary tabular-nums">
                    {formatPrice(Math.round((estimate.totalBrutto.min + estimate.totalBrutto.max) / 2))} zł
                  </span>
                </div>
              </div>
            </div>

            {/* Gwarancja + Disclaimers + Footer — keep together on print */}
            <div className="print-ending-block">
              {/* Gwarancja */}
              <div className="print-gwarancja px-5 md:px-10 py-4 border-b border-gray-200">
                <p className="text-body-sm text-gray-700 leading-relaxed">
                  <Icon name="shieldCheck" size="sm" className="text-primary inline mr-1.5 -mt-0.5" />
                  Na prace konstrukcyjne udzielamy <strong>{estimate.gwarancja.konstrukcja} miesięcy</strong> gwarancji,
                  na pozostałe prace budowlane <strong>{estimate.gwarancja.pozostale} miesięcy</strong> gwarancji.
                  Urządzenia objęte są dodatkową 12-miesięczną pogwarancyjną obsługą serwisową.
                </p>
              </div>

              {/* Disclaimers */}
              <div className="print-disclaimers px-5 md:px-10 py-6 bg-gray-50">
                <div className="space-y-2.5 text-body-sm text-gray-600 leading-relaxed">
                  <p>
                    <strong className="text-gray-800">Uwaga:</strong> Powyższy zakres prac nie zawiera w cenie przygotowania terenów zewnętrznych,
                    wykonania przyłączy wod-kan, prądowych, gazowych oraz zagospodarowania terenów zewnętrznych.
                    W cenie nie uwzględniono wykonania drogi dojazdowej oraz ogrodzenia terenu budowy.
                  </p>
                  <p>
                    Wycena ma charakter orientacyjny i została sporządzona na podstawie parametrów wprowadzonych w kalkulatorze.
                    Dokładna kalkulacja wymaga analizy projektu architektonicznego i warunków gruntowych na działce.
                  </p>
                  <p>
                    Z wyrazami szacunku,<br />
                    <strong className="text-gray-800">Zespół {companyData.name}</strong>
                  </p>
                  <p>Ważność wyceny: <strong className="text-gray-800">{estimateValidUntil!.toLocaleDateString('pl-PL')}</strong> (14 dni od wygenerowania).</p>
                  <p className="text-body-xs text-gray-400 italic">Niniejsza oferta nie stanowi oferty handlowej w rozumieniu Kodeksu Cywilnego.</p>
                </div>
              </div>

              {/* Document Footer */}
              <div className="print-footer px-8 md:px-10 py-5 border-t border-gray-200 bg-background-dark">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-body-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Image src="/images/logo-white.webp" alt="CoreLTB" width={28} height={28} className="rounded-lg" />
                  <span>{companyData.legalName} · {companyData.address.streetAddress}, {companyData.address.postalCode} {companyData.address.addressLocality}</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-1.5">
                    <Icon name="phone" size="sm" className="text-primary" />
                    +48 664 123 757
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="mail" size="sm" className="text-primary" />
                    {companyData.email}
                  </span>
                </div>
              </div>
            </div>
            </div>{/* /print-ending-block */}
          </div>

          {/* Action buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3 print:hidden">
            <button
              onClick={handlePrint}
              className="flex-1 flex items-center justify-center gap-2.5 bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-body-md"
            >
              <Icon name="fileText" size="md" />
              Pobierz wycenę (PDF)
            </button>
            <a
              href="tel:+48664123757"
              className="flex-1 flex items-center justify-center gap-2.5 bg-background-dark hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 text-body-md"
            >
              <Icon name="phone" size="md" />
              Zadzwoń teraz
            </a>
          </div>

          <p className="mt-4 text-center text-body-sm text-gray-500 print:hidden">
            Wycena orientacyjna. Oddzwonimy z dokładną kalkulacją dopasowaną do Twojego projektu.
          </p>

          <button
            type="button"
            onClick={() => {
              setEstimate(null);
              setSubmittedConfig(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-6 mx-auto flex items-center gap-2 text-body-md text-gray-500 hover:text-primary transition-colors print:hidden"
          >
            <Icon name="chevronLeft" size="sm" />
            Wróć do kalkulatora
          </button>
    </div>
  ) : null;

  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ─── LEFT: Full-bleed sticky image ─── */}
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-screen">
            <Image
              src="/images/hero/slide-1-mobile.webp"
              alt="Realizacja CoreLTB Builders — nowoczesny dom jednorodzinny"
              fill
              className="object-cover"
              sizes="50vw"
              priority
            />
            <div className="absolute inset-0 bg-black/30" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Bottom bar — logo + text */}
            <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
              <div className="flex items-center gap-5">
                <Link href="/">
                  <Image
                    src="/images/logo-white.webp"
                    alt="CoreLTB — strona główna"
                    width={90}
                    height={90}
                    className="rounded-2xl shadow-lg opacity-90 flex-shrink-0 hover:opacity-100 transition-opacity"
                  />
                </Link>
                <div>
                  <p className="text-white/90 text-body-lg font-semibold font-heading">Budujemy jak dla siebie</p>
                  <p className="text-white/60 text-body-sm mt-1">200+ domów na Śląsku i w Małopolsce od 2005 roku</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── RIGHT: Form ─── */}
        <div className="bg-background-light">
          {/* Mobile top bar — logo + hamburger */}
          <div className="lg:hidden flex items-center justify-between px-5 pt-5">
            <Link href="/">
              <Image src="/images/logo-black.webp" alt="CoreLTB" width={64} height={64} className="rounded-none" />
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="text-gray-700 hover:text-primary transition-colors p-1.5"
              aria-label="Otwórz menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

          {/* Mobile menu drawer — identyczny z Header */}
          <div
            className={`fixed inset-0 bg-black/40 z-[60] lg:hidden transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            className={`fixed top-0 right-0 bottom-0 w-full bg-white z-[70] lg:hidden
              shadow-2xl overflow-y-auto transition-transform duration-300 ease-out
              ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
            `}
          >
            {/* Logo + zamknij */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="relative w-[56px] h-[50px]">
                <Image src="/images/logo-black.webp" alt="CoreLTB" fill className="object-contain" sizes="56px" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:bg-gray-200 transition-colors"
                aria-label="Zamknij menu"
              >
                <Icon name="x" size="md" />
              </button>
            </div>

            {/* Nawigacja */}
            <nav className="px-4 py-6 flex flex-col gap-1">
              {mobileNavLinks.filter(link => link.href !== '/').map((link) => {
                const isActive = pathname === link.href || (link.href === '/oferta' && pathname.startsWith('/oferta'));
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-4 px-4 py-4 rounded-xl text-base font-semibold transition-colors ${
                      isActive ? 'text-primary bg-primary/5' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isActive ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Icon name={link.icon} size="md" />
                    </div>
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA + kontakt na dole */}
            <div className="px-6 py-5 mt-auto border-t border-gray-100">
              <Link
                href="/wycena"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full bg-primary text-zinc-900 font-bold py-3.5 rounded-xl text-base mb-5"
              >
                Darmowa wycena
                <Icon name="arrowRight" size="sm" />
              </Link>
              <a href="tel:+48664123757" className="flex items-center gap-3 py-2.5 text-base font-medium text-gray-700">
                <Icon name="phone" size="md" className="text-primary" />
                +48 664 123 757
              </a>
              <a href="mailto:biuro@coreltb.pl" className="flex items-center gap-3 py-2.5 text-base font-medium text-gray-700">
                <Icon name="mail" size="md" className="text-primary" />
                biuro@coreltb.pl
              </a>
            </div>
          </div>

          {estimateDocument ? estimateDocument : (
          <form
            onSubmit={handleSubmit}
            className="px-5 md:px-8 lg:px-10 xl:px-14 py-8 md:py-10 lg:py-12"
            noValidate
          >
            {/* H1 */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-h3 xl:text-display font-bold font-heading text-text-primary leading-tight">
                Bezpłatna wycena
                <br />
                <span className="text-primary">budowy domu</span>
              </h1>
              <p className="mt-3 text-body-md text-text-secondary">
                Skonfiguruj dom i otrzymaj wycenę w&nbsp;60&nbsp;sekund
              </p>
            </div>

            {/* ─── Section 1: Powierzchnia ─── */}
            <FormSection number="1" title="Powierzchnia domu">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-body-sm font-semibold text-text-primary">
                    Powierzchnia użytkowa
                  </label>
                  <div className="bg-primary/10 text-primary font-bold px-4 py-1.5 rounded-lg text-h5 tabular-nums">
                    {state.area > 0 ? `${state.area} m²` : '— m²'}
                  </div>
                </div>

                {/* Editable input + Slider (slider hidden on mobile) */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 bg-white border-2 border-gray-200 focus-within:border-primary rounded-lg px-3 py-2 shadow-sm flex-shrink-0">
                    <input
                      type="text"
                      inputMode="decimal"
                      value={areaInput}
                      onChange={(e) => {
                        const raw = e.target.value.replace(',', '.').replace(/[^0-9.]/g, '');
                        setAreaInput(raw);
                        const v = parseFloat(raw);
                        if (!isNaN(v) && v >= 80 && v <= 500) set('area', parseFloat(v.toFixed(1)));
                      }}
                      onBlur={() => {
                        if (areaInput) {
                          let v = parseFloat(areaInput.replace(',', '.'));
                          if (isNaN(v) || v < 80) v = 80;
                          if (v > 500) v = 500;
                          set('area', parseFloat(v.toFixed(1)));
                          setAreaInput(String(parseFloat(v.toFixed(1))));
                        }
                      }}
                      placeholder="Wpisz metraż"
                      className="w-28 bg-transparent text-text-primary font-semibold text-body-md tabular-nums outline-none cursor-text
                        placeholder:text-gray-400 placeholder:font-normal placeholder:text-body-sm"
                    />
                    <span className="text-text-muted font-medium text-body-sm">m²</span>
                  </div>

                  <div className="flex-1 hidden md:block">
                    <input
                      type="range"
                      min={80}
                      max={500}
                      step={5}
                      value={state.area || 80}
                      onChange={(e) => set('area', Number(e.target.value))}
                      className="w-full h-2.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-primary
                        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7
                        [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-white
                        [&::-webkit-slider-thumb]:cursor-pointer"
                    />
                    <div className="flex justify-between text-body-xs text-text-muted mt-1">
                      <span>80 m²</span>
                      <span>500 m²</span>
                    </div>
                  </div>
                </div>

                {/* Presets */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {areaPresets.map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => set('area', preset)}
                      className={`px-3 py-1.5 rounded-lg text-label font-medium transition-colors duration-150
                        ${
                          state.area === preset
                            ? 'bg-primary text-white'
                            : 'bg-background-light text-text-secondary border border-border-light hover:border-primary/30'
                        }`}
                    >
                      {preset} m²
                    </button>
                  ))}
                </div>
              </div>
            </FormSection>

            <SectionDivider />

            {/* ─── Section 2: Konfiguracja ─── */}
            <FormSection number="2" title="Konfiguracja domu">
              <OptionGroup label="Kondygnacje" field="floors" hasError={!!state.errors.floors}>
                {availableFloors.map((floor) => {
                  const iconMap: Record<string, IconName> = { parterowy: 'square', poddasze: 'house', pietrowy: 'building' };
                  return (
                    <OptionCard
                      key={floor}
                      label={FLOOR_LABELS[floor]}
                      icon={iconMap[floor]}
                      selected={state.floors === floor}
                      onClick={() => set('floors', floor)}
                    />
                  );
                })}
              </OptionGroup>

              <OptionGroup label="Materiał murowy" className="mt-6" field="wallType" hasError={!!state.errors.wallType}>
                {(Object.keys(WALL_LABELS) as WallType[]).map((wall) => {
                  const iconMap: Record<string, IconName> = { beton_komorkowy: 'layoutGrid', ceramika: 'brickWall', silikat: 'box' };
                  return (
                    <OptionCard
                      key={wall}
                      label={WALL_LABELS[wall]}
                      icon={iconMap[wall]}
                      selected={state.wallType === wall}
                      onClick={() => set('wallType', wall)}
                    />
                  );
                })}
              </OptionGroup>

              <OptionGroup label="Typ dachu" className="mt-6" field="roofType" hasError={!!state.errors.roofType}>
                {availableRoofs.map((roof) => {
                  const iconMap: Record<string, IconName> = { plaski: 'minus', dwuspadowy: 'triangle', wielospadowy: 'pyramid' };
                  return (
                    <OptionCard
                      key={roof}
                      label={ROOF_LABELS[roof]}
                      icon={iconMap[roof]}
                      selected={state.roofType === roof}
                      onClick={() => set('roofType', roof)}
                    />
                  );
                })}
              </OptionGroup>

              <OptionGroup label="Typ fundamentu" className="mt-6" field="foundation" hasError={!!state.errors.foundation}>
                {(Object.keys(FOUNDATION_LABELS) as FoundationType[]).map((f) => {
                  const iconMap: Record<string, IconName> = { plyta: 'rectangleHorizontal', lawy: 'columns3' };
                  return (
                    <OptionCard
                      key={f}
                      label={FOUNDATION_LABELS[f]}
                      icon={iconMap[f]}
                      selected={state.foundation === f}
                      onClick={() => set('foundation', f)}
                    />
                  );
                })}
              </OptionGroup>

              <OptionGroup label="Piwnica" className="mt-6" field="basement" hasError={!!state.errors.basement}>
                {(Object.keys(BASEMENT_LABELS) as BasementType[]).map((b) => {
                  const iconMap: Record<string, IconName> = { brak: 'ban', czesciowa: 'squareDashedBottom', cala: 'square' };
                  return (
                    <OptionCard
                      key={b}
                      label={BASEMENT_LABELS[b]}
                      icon={iconMap[b]}
                      selected={state.basement === b}
                      onClick={() => set('basement', b)}
                    />
                  );
                })}
              </OptionGroup>
            </FormSection>

            <SectionDivider />

            {/* ─── Section 3: Wykończenie i dodatkowe ─── */}
            <FormSection number="3" title="Standard i wyposażenie">
              <OptionGroup label="Standard budowy" field="finish" hasError={!!state.errors.finish}>
                {(Object.keys(FINISH_LABELS) as FinishType[]).map((f) => {
                  const iconMap: Record<string, IconName> = { sso: 'hammer', deweloperski: 'house', pod_klucz: 'keyRound' };
                  return (
                    <OptionCard
                      key={f}
                      label={FINISH_LABELS[f]}
                      icon={iconMap[f]}
                      selected={state.finish === f}
                      onClick={() => set('finish', f)}
                    />
                  );
                })}
              </OptionGroup>


              <div className="mt-3 bg-primary/5 border border-primary/20 rounded-xl p-4">
                <p className="text-body-xs text-text-secondary leading-relaxed">
                  {state.finish === 'sso' && (
                    <><strong>Stan surowy otwarty</strong> — fundamenty, ściany, strop, dach z pokryciem, okna i drzwi zewnętrzne. Bez instalacji wewnętrznych.</>
                  )}
                  {state.finish === 'deweloperski' && (
                    <><strong>Stan deweloperski</strong> — SSO + kompletne instalacje (elektryka, wod-kan, ogrzewanie, tynki, wylewki). Gotowy do wykończenia wnętrz.</>
                  )}
                  {state.finish === 'pod_klucz' && (
                    <><strong>Pod klucz</strong> — deweloperski + pełne wykończenie wnętrz: podłogi, łazienki, kuchnia (bez mebli), malowanie.</>
                  )}
                </p>
              </div>

              <OptionGroup label="Ogrzewanie" className="mt-6" field="heating" hasError={!!state.errors.heating}>
                {(Object.keys(HEATING_LABELS) as HeatingType[]).map((h) => {
                  const iconMap: Record<string, IconName> = { gazowe: 'flame', pompa_ciepla: 'thermometerSnowflake', pelet: 'flameKindling' };
                  return (
                    <OptionCard
                      key={h}
                      label={HEATING_LABELS[h]}
                      icon={iconMap[h]}
                      selected={state.heating === h}
                      onClick={() => set('heating', h)}
                    />
                  );
                })}
              </OptionGroup>

              <OptionGroup label="Garaż" className="mt-6" field="garage" hasError={!!state.errors.garage}>
                {(Object.keys(GARAGE_LABELS) as GarageType[]).map((g) => (
                  <OptionCard
                    key={g}
                    label={GARAGE_LABELS[g]}
                    icon={g !== 'dwustanowiskowy' ? (g === 'brak' ? 'ban' : 'car') as IconName : undefined}
                    svgContent={g === 'dwustanowiskowy' ? (
                      <div className="flex gap-1">
                        <Icon name="car" size="xl" />
                        <Icon name="car" size="xl" />
                      </div>
                    ) : undefined}
                    selected={state.garage === g}
                    onClick={() => set('garage', g)}
                  />
                ))}
              </OptionGroup>
            </FormSection>

            <SectionDivider />

            {/* ─── Section 4: Dane kontaktowe ─── */}
            <FormSection number="4" title="Twoje dane">
              <p className="text-body-sm text-text-secondary -mt-2 mb-5">
                Oddzwonimy z dokładną wyceną w ciągu 24h
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField
                  label="Imię i nazwisko"
                  value={state.name}
                  onChange={(v) => set('name', v)}
                  error={state.errors.name}
                  required
                  placeholder="Jan Kowalski"
                />
                <InputField
                  label="Telefon"
                  type="tel"
                  value={state.phone}
                  onChange={(v) => set('phone', v)}
                  error={state.errors.phone}
                  required
                  placeholder="+48 ___ ___ ___"
                  hint="Numer wymagany — oddzwonimy z wyceną"
                />
                <InputField
                  label="E-mail"
                  type="email"
                  value={state.email}
                  onChange={(v) => set('email', v)}
                  error={state.errors.email || emailSuggestion.disposableError || undefined}
                  placeholder="jan@example.com"
                  onBlur={emailSuggestion.onBlur}
                  suggestion={emailSuggestion.suggestion}
                  onApplySuggestion={emailSuggestion.applySuggestion}
                  onDismissSuggestion={emailSuggestion.clearSuggestion}
                />
                <InputField
                  label="Lokalizacja budowy"
                  value={state.location}
                  onChange={(v) => set('location', v)}
                  placeholder="Miasto lub gmina"
                />
              </div>

              {/* File upload */}
              <div className="mt-4">
                <label className="text-label font-semibold text-text-primary block mb-2">
                  Załącz projekt <span className="text-text-muted font-normal">(opcjonalnie)</span>
                </label>
                <label className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-primary/50 hover:bg-primary/5 transition-colors duration-200">
                  <Icon name="paperclip" size="lg" className="text-text-muted mb-2" />
                  {state.file ? (
                    <div className="flex items-center gap-2">
                      <span className="text-body-sm font-medium text-text-primary">{state.file.name}</span>
                      <button
                        type="button"
                        onClick={(e) => { e.preventDefault(); set('file', null); }}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Icon name="x" size="sm" />
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-body-sm text-text-secondary">Przeciągnij plik lub kliknij aby wybrać</span>
                      <span className="text-body-xs text-text-muted mt-1">PDF, JPG, PNG · Max 10 MB</span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      if (file && file.size > 10 * 1024 * 1024) {
                        alert('Plik jest za duży. Maksymalny rozmiar to 10 MB.');
                        return;
                      }
                      set('file', file);
                    }}
                  />
                </label>
              </div>

              {/* Consents */}
              <div className="mt-5 space-y-3">
                <ConsentCheckbox
                  checked={state.consentData}
                  onChange={(v) => set('consentData', v)}
                  error={state.errors.consentData}
                  label="Wyrażam zgodę na przetwarzanie moich danych osobowych przez CoreLTB Sp.&nbsp;z&nbsp;o.o. w celu przygotowania wyceny budowy domu."
                  required
                />
                <ConsentCheckbox
                  checked={state.consentContact}
                  onChange={(v) => set('consentContact', v)}
                  error={state.errors.consentContact}
                  label="Wyrażam zgodę na kontakt telefoniczny i mailowy w celu przedstawienia oferty i omówienia szczegółów wyceny."
                  required
                />
              </div>

              {/* Honeypot — hidden from humans, bots fill it */}
              <div className="absolute opacity-0 pointer-events-none" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" tabIndex={-1}>
                <label htmlFor="website">Website</label>
                <input ref={honeypotRef} type="text" id="website" name="website" autoComplete="off" tabIndex={-1} />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-6 w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-dark disabled:opacity-60
                  text-white font-bold text-body-md py-4 px-8 rounded-xl
                  transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5
                  disabled:hover:translate-y-0 disabled:hover:shadow-lg cursor-pointer disabled:cursor-wait"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generuję wycenę...
                  </>
                ) : (
                  <>
                    Wyślij — otrzymasz wycenę
                    <Icon name="arrowRight" size="md" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-body-xs text-text-muted">
                Wycena jest bezpłatna i niezobowiązująca.
              </p>
            </FormSection>
          </form>
          )}
        </div>
      </div>

      {/* Loading Modal */}
      {isSubmitting && loadingStep >= 0 && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-[90%] mx-4 p-10 md:p-12 text-center animate-in">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <Image
                src="/images/logo-black.webp"
                alt="CoreLTB"
                width={80}
                height={80}
                className="rounded-none"
              />
            </div>

            {/* Greeting */}
            <h3 className="text-h4 md:text-h3 font-bold font-heading text-text-primary mb-2">
              {state.name ? `${state.name.split(' ')[0]}, przygotowujemy Twoją wycenę` : 'Przygotowujemy Twoją wycenę'}
            </h3>
            <p className="text-body-md text-text-muted mb-8">
              Każda wycena jest kalkulowana indywidualnie na podstawie aktualnych cen materiałów i robocizny.
            </p>

            {/* Progress steps */}
            <div className="space-y-3 text-left mb-8">
              {loadingSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-3 transition-all duration-500 ${
                    i < loadingStep
                      ? 'opacity-100'
                      : i === loadingStep
                      ? 'opacity-100'
                      : 'opacity-30'
                  }`}
                >
                  {i < loadingStep ? (
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
                      <Icon name="check" size="sm" className="text-white w-3.5 h-3.5" />
                    </div>
                  ) : i === loadingStep ? (
                    <div className="w-6 h-6 flex items-center justify-center flex-shrink-0">
                      <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-gray-200 flex-shrink-0" />
                  )}
                  <span className={`text-body-sm ${
                    i <= loadingStep ? 'text-text-primary font-medium' : 'text-gray-400'
                  }`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700 ease-out"
                style={{ width: `${((loadingStep + 1) / loadingSteps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

// ─── Sub-components ─────────────────────────────────────

function FormSection({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="py-2">
      <div className="flex items-center gap-3 mb-5">
        <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-label font-bold flex-shrink-0">
          {number}
        </span>
        <h2 className="text-h5 md:text-h4 font-bold text-text-primary font-heading">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

function OptionGroup({
  label,
  children,
  className = '',
  field,
  hasError,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  field?: string;
  hasError?: boolean;
}) {
  return (
    <div
      className={`${className} rounded-xl transition-all duration-300 ${hasError ? 'animate-error-pulse p-2 -m-2' : ''}`}
      data-option-group={field}
    >
      <label className={`text-body-sm font-semibold block mb-2.5 transition-colors ${hasError ? 'text-red-500' : 'text-text-primary'}`}>
        {label}
        {hasError && <span className="ml-2 text-body-xs font-normal text-red-400">— wybierz opcję</span>}
      </label>
      <div className="grid grid-cols-3 gap-2.5">
        {children}
      </div>
    </div>
  );
}

function SectionDivider() {
  return <div className="my-6 md:my-8 border-t border-border-light" />;
}

function InputField({
  label,
  type = 'text',
  value,
  onChange,
  error,
  required,
  placeholder,
  hint,
  onBlur,
  suggestion,
  onApplySuggestion,
  onDismissSuggestion,
}: {
  label: string;
  type?: 'text' | 'tel' | 'email';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
  onBlur?: () => void;
  suggestion?: { full: string; domain: string; original: string } | null;
  onApplySuggestion?: () => void;
  onDismissSuggestion?: () => void;
}) {
  return (
    <div data-error={!!error || undefined}>
      <label className="text-label font-semibold text-text-primary block mb-1.5">
        {label}
        {required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 text-body-md transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          placeholder:text-text-muted
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
      />
      {error && <p className="mt-1 text-body-xs text-red-500">{error}</p>}
      {suggestion && onApplySuggestion && (
        <div className="mt-1.5 flex items-center gap-2 text-body-xs">
          <span className="text-amber-600">
            Czy chodziło o <strong>{suggestion.full}</strong>?
          </span>
          <button
            type="button"
            onClick={onApplySuggestion}
            className="text-primary font-semibold hover:underline"
          >
            Popraw
          </button>
          {onDismissSuggestion && (
            <button
              type="button"
              onClick={onDismissSuggestion}
              className="text-text-muted hover:text-text-secondary"
            >
              Nie
            </button>
          )}
        </div>
      )}
      {hint && !error && !suggestion && <p className="mt-1 text-body-xs text-text-muted">{hint}</p>}
    </div>
  );
}

function ConsentCheckbox({
  checked,
  onChange,
  label,
  error,
  required,
}: {
  checked: boolean;
  onChange: (value: boolean) => void;
  label: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 cursor-pointer group" data-error={!!error || undefined}>
      <div
        className={`mt-0.5 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-all duration-200
          ${
            checked
              ? 'bg-primary border-primary'
              : error
                ? 'border-red-400 bg-red-50'
                : 'border-gray-300 bg-white group-hover:border-primary/50'
          }`}
        onClick={(e) => { e.preventDefault(); onChange(!checked); }}
        role="checkbox"
        aria-checked={checked}
      >
        {checked && <Icon name="check" size="sm" className="text-white w-3 h-3" />}
      </div>
      <span
        className="text-body-xs text-text-secondary leading-relaxed"
        dangerouslySetInnerHTML={{ __html: `${label}${required ? ' <span class="text-red-500">*</span>' : ''}` }}
      />
    </label>
  );
}
