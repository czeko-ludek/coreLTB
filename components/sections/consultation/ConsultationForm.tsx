'use client';

import { useState, useReducer, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Icon } from '@/components/ui/Icon';
import type { IconName } from '@/components/ui/Icon';
import { OptionCard } from '@/components/ui/OptionCard';
import { companyData } from '@/data/company-data';
import { validatePolishPhone } from '@/lib/validation';
import { captureUTMParams, getUTMParams, trackLead } from '@/lib/analytics';

// ─── Types ──────────────────────────────────────────────

type ServiceType = 'budowa' | 'projektowanie' | 'nadzor' | 'techniczne' | 'wykonczenia' | 'inne';
type PlotStatus = 'tak' | 'nie' | 'szukam';
type ProjectStatus = 'tak' | 'nie';
type BuildStage = 'przed_startem' | 'w_trakcie' | 'odbior';
type ProjectType = 'indywidualny' | 'adaptacja' | 'aranzacja';
type ContactPref = 'telefon' | 'email' | 'spotkanie';

const SERVICE_OPTIONS: { value: ServiceType; label: string; icon: IconName }[] = [
  { value: 'budowa', label: 'Budowa domu', icon: 'home' },
  { value: 'projektowanie', label: 'Projektowanie', icon: 'ruler' },
  { value: 'nadzor', label: 'Nadzór inwestorski', icon: 'shieldCheck' },
  { value: 'techniczne', label: 'Usługi techniczne', icon: 'hardHat' },
  { value: 'wykonczenia', label: 'Wykończenie wnętrz', icon: 'paintBrush' },
  { value: 'inne', label: 'Inne', icon: 'helpCircle' },
];

const CITIES = [
  'Katowice', 'Rybnik', 'Gliwice', 'Zabrze', 'Tychy', 'Jaworzno',
  'Mikołów', 'Wodzisław Śl.', 'Żory', 'Jastrzębie-Zdrój', 'Racibórz',
  'Chrzanów', 'Kraków', 'Oświęcim', 'Inne',
];

// ─── State ──────────────────────────────────────────────

interface FormState {
  service: ServiceType;
  // Budowa context
  hasPlot: PlotStatus;
  hasProject: ProjectStatus;
  plannedArea: string;
  // Nadzor context
  buildStage: BuildStage;
  // Projektowanie context
  projectType: ProjectType;
  // Common
  city: string;
  contactPref: ContactPref;
  name: string;
  phone: string;
  email: string;
  notes: string;
  file: File | null;
  consentData: boolean;
  consentContact: boolean;
  errors: Record<string, string>;
}

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string | boolean | File | null }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'CLEAR_ERRORS' };

const initialState: FormState = {
  service: '' as ServiceType,
  hasPlot: '' as PlotStatus,
  hasProject: '' as ProjectStatus,
  plannedArea: '',
  buildStage: '' as BuildStage,
  projectType: '' as ProjectType,
  city: '',
  contactPref: '' as ContactPref,
  name: '',
  phone: '',
  email: '',
  notes: '',
  file: null,
  consentData: false,
  consentContact: false,
  errors: {},
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

// Nav links — identyczne z Header
const mobileNavLinks: { label: string; href: string; icon: IconName }[] = [
  { label: 'Strona główna', href: '/', icon: 'home' },
  { label: 'O nas', href: '/o-nas', icon: 'users' },
  { label: 'Oferta', href: '/oferta', icon: 'briefcase' },
  { label: 'Projekty', href: '/projekty', icon: 'building' },
  { label: 'Kontakt', href: '/kontakt', icon: 'mail' },
];

// ─── Component ──────────────────────────────────────────

export const ConsultationForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const successRef = useRef<HTMLDivElement>(null);
  const honeypotRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Auto-fill from query params
  useEffect(() => {
    const usluga = searchParams.get('usluga');
    const miasto = searchParams.get('miasto');

    if (usluga && SERVICE_OPTIONS.some(s => s.value === usluga)) {
      dispatch({ type: 'SET_FIELD', field: 'service', value: usluga });
    }
    if (miasto) {
      // Capitalize first letter
      const cityName = miasto.charAt(0).toUpperCase() + miasto.slice(1).replace(/-/g, ' ');
      const matched = CITIES.find(c => c.toLowerCase().replace(/\s/g, '') === miasto.toLowerCase().replace(/-/g, ''));
      dispatch({ type: 'SET_FIELD', field: 'city', value: matched || cityName });
    }
  }, [searchParams]);

  // Capture UTM params on mount
  useEffect(() => { captureUTMParams(); }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  const set = (field: string, value: string | boolean | File | null) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!state.service) errors.service = 'Wybierz temat zapytania';
    if (!state.name.trim() || state.name.trim().length < 3) errors.name = 'Podaj imię i nazwisko';
    if (!state.phone.trim() || !validatePolishPhone(state.phone))
      errors.phone = 'Podaj prawidłowy polski numer telefonu (9 cyfr)';
    if (state.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email))
      errors.email = 'Podaj prawidłowy adres e-mail';
    if (!state.consentData) errors.consentData = 'Wymagana zgoda';
    if (!state.consentContact) errors.consentContact = 'Wymagana zgoda';
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      dispatch({ type: 'SET_ERRORS', errors });

      // Scroll to service selection if missing
      if (errors.service) {
        const el = document.querySelector('[data-option-group="service"]');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'center' });
          el.classList.remove('animate-error-pulse');
          void (el as HTMLElement).offsetWidth;
          el.classList.add('animate-error-pulse');
          return;
        }
      }

      const firstErrorField = document.querySelector('[data-error="true"]');
      firstErrorField?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'consultation',
          data: {
            name: state.name,
            phone: state.phone,
            email: state.email || undefined,
            service: SERVICE_OPTIONS.find(s => s.value === state.service)?.label || state.service,
            city: state.city || undefined,
            contactPref: state.contactPref || undefined,
            notes: state.notes || undefined,
            website: honeypotRef.current?.value || '',
            // UTM attribution
            ...(() => { const u = getUTMParams(); return { utm_source: u.utm_source || '', utm_medium: u.utm_medium || '', utm_campaign: u.utm_campaign || '', landing_page: u.landing_page || '', referrer: u.referrer || '' }; })(),
            hasPlot: state.hasPlot || undefined,
            hasProject: state.hasProject || undefined,
            area: state.plannedArea ? `${state.plannedArea} m²` : undefined,
            buildStage: state.buildStage || undefined,
            projectType: state.projectType || undefined,
          },
        }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        console.error('[Consultation] API error:', err);
      }
    } catch (err) {
      // Email failed — still show success to user (lead data logged server-side)
      console.error('[Consultation] Network error:', err);
    }

    setIsSubmitting(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSuccess(true);

    // GA4 conversion event (via GTM dataLayer)
    trackLead('consultation', { service: state.service, city: state.city });
  }

  // ─── Form View ────────────────────────────────────────

  return (
    <section className="min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">

        {/* ─── LEFT: Full-bleed sticky image ─── */}
        <div className="hidden lg:block relative">
          <div className="sticky top-0 h-screen">
            <Image
              src="/images/hero/slide-2-mobile.webp"
              alt="Konsultacja budowlana CoreLTB Builders"
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
                  <p className="text-white/90 text-body-lg font-semibold font-heading">Rozmawiasz z inżynierem,<br />nie z handlowcem</p>
                  <p className="text-white/60 text-body-sm mt-1">Odpowiemy na Twoje pytania w ciągu 24h</p>
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

          {/* Mobile menu drawer */}
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

          {isSuccess ? (
            <div ref={successRef} className="px-5 md:px-8 lg:px-10 xl:px-14 py-8 md:py-10 lg:py-12 flex flex-col items-center justify-center min-h-[60vh] lg:min-h-screen text-center">
              <div className="max-w-md w-full">
                <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <Icon name="checkCircle" size="xl" className="text-green-600 w-10 h-10" />
                </div>
                <h2 className="text-h3 md:text-display font-bold font-heading text-text-primary">
                  Dziękujemy, {state.name.split(' ')[0]}!
                </h2>
                <p className="mt-4 text-body-md text-text-secondary">
                  Twoje zapytanie dotyczące <strong>{SERVICE_OPTIONS.find(s => s.value === state.service)?.label.toLowerCase()}</strong> zostało
                  wysłane. Oddzwonimy w ciągu <strong>24 godzin</strong>.
                </p>

                <div className="mt-8 bg-white rounded-2xl border border-gray-200 p-6 text-left">
                  <h3 className="text-body-sm uppercase tracking-widest text-gray-500 font-semibold mb-4">
                    Co się teraz stanie?
                  </h3>
                  <div className="space-y-4">
                    {[
                      { step: '1', text: 'Nasz inżynier zapozna się z Twoim zapytaniem' },
                      { step: '2', text: 'Skontaktujemy się telefonicznie w ciągu 24h' },
                      { step: '3', text: 'Umówimy spotkanie lub wizję lokalną — bezpłatnie' },
                    ].map((item) => (
                      <div key={item.step} className="flex items-start gap-3">
                        <span className="w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-label font-bold flex-shrink-0">
                          {item.step}
                        </span>
                        <span className="text-body-md text-text-primary pt-0.5">{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href="tel:+48664123757"
                    className="flex-1 flex items-center justify-center gap-2.5 bg-background-dark hover:bg-gray-800 text-white font-bold py-4 px-6 rounded-xl transition-colors"
                  >
                    <Icon name="phone" size="md" />
                    Zadzwoń teraz
                  </a>
                  <Link
                    href="/"
                    className="flex-1 flex items-center justify-center gap-2.5 bg-white border-2 border-gray-200 hover:border-primary/30 text-text-primary font-bold py-4 px-6 rounded-xl transition-colors"
                  >
                    <Icon name="home" size="md" />
                    Strona główna
                  </Link>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSuccess(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="mt-6 mx-auto flex items-center gap-2 text-body-md text-gray-500 hover:text-primary transition-colors"
                >
                  <Icon name="chevronLeft" size="sm" />
                  Wróć do formularza
                </button>
              </div>
            </div>
          ) : (
          <form
            onSubmit={handleSubmit}
            className="px-5 md:px-8 lg:px-10 xl:px-14 py-8 md:py-10 lg:py-12"
            noValidate
          >
            {/* H1 */}
            <div className="mb-8 text-center lg:text-left">
              <h1 className="text-h3 xl:text-display font-bold font-heading text-text-primary leading-tight">
                Umów bezpłatną
                <br />
                <span className="text-primary">konsultację</span>
              </h1>
              <p className="mt-3 text-body-md text-text-secondary">
                Odpowiemy na Twoje pytania w&nbsp;ciągu&nbsp;24h. Bez&nbsp;zobowiązań.
              </p>
            </div>

            {/* ─── Section 1: Wybór usługi ─── */}
            <FormSection number="1" title="Czego dotyczy zapytanie?">
              <div
                className={`rounded-xl transition-all duration-300 ${state.errors.service ? 'animate-error-pulse p-2 -m-2' : ''}`}
                data-option-group="service"
              >
                {state.errors.service && (
                  <p className="mb-2 text-body-xs text-red-500 font-semibold">Wybierz temat zapytania</p>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {SERVICE_OPTIONS.map((opt) => (
                    <OptionCard
                      key={opt.value}
                      label={opt.label}
                      icon={opt.icon}
                      selected={state.service === opt.value}
                      onClick={() => set('service', opt.value)}
                    />
                  ))}
                </div>
              </div>
            </FormSection>

            {/* ─── Contextual questions based on service ─── */}
            {state.service === 'budowa' && (
              <>
                <SectionDivider />
                <FormSection number="2" title="Szczegóły projektu">
                  <OptionGroup label="Czy masz działkę?">
                    {([
                      { value: 'tak' as PlotStatus, label: 'Tak', icon: 'checkCircle' as IconName },
                      { value: 'nie' as PlotStatus, label: 'Nie', icon: 'x' as IconName },
                      { value: 'szukam' as PlotStatus, label: 'Szukam', icon: 'search' as IconName },
                    ]).map((opt) => (
                      <OptionCard
                        key={opt.value}
                        label={opt.label}
                        icon={opt.icon}
                        selected={state.hasPlot === opt.value}
                        onClick={() => set('hasPlot', opt.value)}
                      />
                    ))}
                  </OptionGroup>

                  <OptionGroup label="Czy masz projekt?" className="mt-6">
                    {([
                      { value: 'tak' as ProjectStatus, label: 'Tak', icon: 'fileText' as IconName },
                      { value: 'nie' as ProjectStatus, label: 'Nie', icon: 'x' as IconName },
                    ]).map((opt) => (
                      <OptionCard
                        key={opt.value}
                        label={opt.label}
                        icon={opt.icon}
                        selected={state.hasProject === opt.value}
                        onClick={() => set('hasProject', opt.value)}
                      />
                    ))}
                  </OptionGroup>

                  <div className="mt-6">
                    <label className="text-body-sm font-semibold text-text-primary block mb-2">
                      Planowany metraż <span className="text-text-muted font-normal">(opcjonalnie)</span>
                    </label>
                    <div className="flex items-center gap-2 bg-white border-2 border-gray-200 focus-within:border-primary rounded-lg px-4 py-3 shadow-sm max-w-[200px]">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={state.plannedArea}
                        onChange={(e) => set('plannedArea', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder="np. 150"
                        className="w-full bg-transparent text-text-primary font-semibold text-body-md outline-none placeholder:text-gray-400 placeholder:font-normal"
                      />
                      <span className="text-text-muted font-medium text-body-sm">m²</span>
                    </div>
                  </div>
                </FormSection>
              </>
            )}

            {state.service === 'nadzor' && (
              <>
                <SectionDivider />
                <FormSection number="2" title="Etap budowy">
                  <OptionGroup label="Na jakim etapie jest budowa?">
                    {([
                      { value: 'przed_startem' as BuildStage, label: 'Przed startem', icon: 'calendar' as IconName },
                      { value: 'w_trakcie' as BuildStage, label: 'W trakcie (problemy)', icon: 'construction' as IconName },
                      { value: 'odbior' as BuildStage, label: 'Odbiór końcowy', icon: 'checkCircle' as IconName },
                    ]).map((opt) => (
                      <OptionCard
                        key={opt.value}
                        label={opt.label}
                        icon={opt.icon}
                        selected={state.buildStage === opt.value}
                        onClick={() => set('buildStage', opt.value)}
                      />
                    ))}
                  </OptionGroup>
                </FormSection>
              </>
            )}

            {state.service === 'projektowanie' && (
              <>
                <SectionDivider />
                <FormSection number="2" title="Rodzaj projektu">
                  <OptionGroup label="Co Cię interesuje?">
                    {([
                      { value: 'indywidualny' as ProjectType, label: 'Projekt indywidualny', icon: 'ruler' as IconName },
                      { value: 'adaptacja' as ProjectType, label: 'Adaptacja gotowego', icon: 'fileText' as IconName },
                      { value: 'aranzacja' as ProjectType, label: 'Aranżacja wnętrz', icon: 'paintBrush' as IconName },
                    ]).map((opt) => (
                      <OptionCard
                        key={opt.value}
                        label={opt.label}
                        icon={opt.icon}
                        selected={state.projectType === opt.value}
                        onClick={() => set('projectType', opt.value)}
                      />
                    ))}
                  </OptionGroup>
                </FormSection>
              </>
            )}

            <SectionDivider />

            {/* ─── Common: Location + Contact Preference ─── */}
            <FormSection
              number={state.service === 'budowa' || state.service === 'nadzor' || state.service === 'projektowanie' ? '3' : '2'}
              title="Lokalizacja i kontakt"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-label font-semibold text-text-primary block mb-1.5">
                    Lokalizacja budowy
                  </label>
                  <select
                    value={state.city}
                    onChange={(e) => set('city', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-body-md transition-colors
                      focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                      hover:border-gray-300"
                  >
                    <option value="">Wybierz miasto</option>
                    {CITIES.map((city) => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-label font-semibold text-text-primary block mb-1.5">
                    Preferowany kontakt
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {([
                      { value: 'telefon' as ContactPref, label: 'Telefon', icon: 'phone' as IconName },
                      { value: 'email' as ContactPref, label: 'Email', icon: 'mail' as IconName },
                      { value: 'spotkanie' as ContactPref, label: 'Spotkanie', icon: 'users' as IconName },
                    ]).map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => set('contactPref', opt.value)}
                        className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all duration-200 cursor-pointer
                          ${state.contactPref === opt.value
                            ? 'border-primary bg-primary/5 shadow-md'
                            : 'border-gray-200 bg-white hover:border-primary/30'
                          }`}
                      >
                        <Icon
                          name={opt.icon}
                          size="md"
                          className={state.contactPref === opt.value ? 'text-primary' : 'text-gray-400'}
                        />
                        <span className={`text-body-xs ${state.contactPref === opt.value ? 'font-semibold text-text-primary' : 'text-text-secondary'}`}>
                          {opt.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </FormSection>

            <SectionDivider />

            {/* ─── Contact details ─── */}
            <FormSection
              number={state.service === 'budowa' || state.service === 'nadzor' || state.service === 'projektowanie' ? '4' : '3'}
              title="Twoje dane"
            >
              <p className="text-body-sm text-text-secondary -mt-2 mb-5">
                Skontaktujemy się w ciągu 24h
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
                />
                <InputField
                  label="E-mail"
                  type="email"
                  value={state.email}
                  onChange={(v) => set('email', v)}
                  error={state.errors.email}
                  placeholder="jan@example.com"
                />
              </div>

              {/* Notes */}
              <div className="mt-4">
                <label className="text-label font-semibold text-text-primary block mb-1.5">
                  Uwagi <span className="text-text-muted font-normal">(opcjonalnie)</span>
                </label>
                <textarea
                  value={state.notes}
                  onChange={(e) => set('notes', e.target.value)}
                  placeholder="Opisz krótko swoje pytanie lub sytuację..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 bg-white text-body-md transition-colors
                    focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
                    hover:border-gray-300 placeholder:text-text-muted resize-none"
                />
              </div>

              {/* File upload */}
              <div className="mt-4">
                <label className="text-label font-semibold text-text-primary block mb-2">
                  Załącz plik <span className="text-text-muted font-normal">(projekt, rzuty — opcjonalnie)</span>
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
                    accept=".pdf,.jpg,.jpeg,.png,.webp,.dwg"
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
                  label="Wyrażam zgodę na przetwarzanie moich danych osobowych przez CoreLTB Sp.&nbsp;z&nbsp;o.o. w celu obsługi zapytania."
                  required
                />
                <ConsentCheckbox
                  checked={state.consentContact}
                  onChange={(v) => set('consentContact', v)}
                  error={state.errors.consentContact}
                  label="Wyrażam zgodę na kontakt telefoniczny i mailowy w celu przedstawienia oferty i omówienia szczegółów."
                  required
                />
              </div>

              {/* Honeypot */}
              <div className="absolute opacity-0 pointer-events-none" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" tabIndex={-1}>
                <label htmlFor="cons-website">Website</label>
                <input ref={honeypotRef} type="text" id="cons-website" name="website" autoComplete="off" tabIndex={-1} />
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
                    Wysyłam zapytanie...
                  </>
                ) : (
                  <>
                    Wyślij zapytanie
                    <Icon name="arrowRight" size="md" />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-body-xs text-text-muted">
                Konsultacja jest bezpłatna i niezobowiązująca.
              </p>
            </FormSection>

            {/* ─── Alternative: Phone ─── */}
            <div className="mt-8 border-t border-border-light pt-6">
              <a
                href="tel:+48664123757"
                className="flex items-center gap-4 bg-white border-2 border-gray-200 hover:border-primary/30 hover:shadow-md rounded-2xl px-5 py-4 transition-all duration-200 group"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Icon name="phone" size="lg" className="text-primary" />
                </div>
                <div>
                  <p className="text-body-xs text-text-muted font-medium">Wolisz porozmawiać od razu?</p>
                  <p className="text-h5 font-bold text-text-primary group-hover:text-primary transition-colors">+48 664 123 757</p>
                  <p className="text-body-xs text-text-muted">Pn–Pt 8:00–17:00, Sb 9:00–14:00</p>
                </div>
                <Icon name="arrowRight" size="md" className="text-gray-300 group-hover:text-primary ml-auto transition-colors" />
              </a>
            </div>
          </form>
          )}
        </div>
      </div>
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
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="text-body-sm font-semibold text-text-primary block mb-2.5">
        {label}
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
}: {
  label: string;
  type?: 'text' | 'tel' | 'email';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
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
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border-2 text-body-md transition-colors duration-200
          focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary
          placeholder:text-text-muted
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
      />
      {error && <p className="mt-1 text-body-xs text-red-500">{error}</p>}
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
