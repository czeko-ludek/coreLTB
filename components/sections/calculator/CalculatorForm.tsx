'use client';

import { useState, useReducer, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Icon } from '@/components/ui/Icon';
import { OptionCard } from '@/components/ui/OptionCard';
import { CalculatorHero } from './CalculatorHero';
import {
  calculateEstimate,
  WALL_LABELS,
  ROOF_LABELS,
  FLOOR_LABELS,
  GARAGE_LABELS,
  FINISH_LABELS,
  HEATING_LABELS,
  type WallType,
  type RoofType,
  type FloorType,
  type GarageType,
  type FinishType,
  type HeatingType,
  type EstimateBreakdown,
  type CalculatorConfig,
} from '@/data/pricing';

// ─── State ──────────────────────────────────────────────

interface FormState {
  area: number;
  floors: FloorType;
  wallType: WallType;
  roofType: RoofType;
  garage: GarageType;
  finish: FinishType;
  heating: HeatingType;
  name: string;
  phone: string;
  email: string;
  location: string;
  file: File | null;
  consentData: boolean;
  consentContact: boolean;
  errors: Record<string, string>;
}

type FormAction =
  | { type: 'SET_FIELD'; field: string; value: string | number | boolean | File | null }
  | { type: 'SET_ERRORS'; errors: Record<string, string> }
  | { type: 'CLEAR_ERRORS' };

const initialState: FormState = {
  area: 140,
  floors: 'parterowy',
  wallType: 'ceramika',
  roofType: 'dwuspadowy',
  garage: 'brak',
  finish: 'deweloperski',
  heating: 'gazowe',
  name: '',
  phone: '',
  email: '',
  location: '',
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

const areaPresets = [100, 120, 140, 160, 180, 200];

function formatPrice(n: number): string {
  return n.toLocaleString('pl-PL');
}

function generateRefNumber(): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = (now.getMonth() + 1).toString().padStart(2, '0');
  const d = now.getDate().toString().padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000 + 1000);
  return `WYC-${y}${m}${d}-${rand}`;
}

// ─── Component ──────────────────────────────────────────

export const CalculatorForm = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [estimate, setEstimate] = useState<EstimateBreakdown | null>(null);
  const [submittedConfig, setSubmittedConfig] = useState<CalculatorConfig | null>(null);
  const [refNumber] = useState(() => generateRefNumber());
  const [areaInput, setAreaInput] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);

  const set = (field: string, value: string | number | boolean | File | null) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  // Conditional logic
  const availableFloors: FloorType[] =
    state.roofType === 'plaski'
      ? ['parterowy', 'pietrowy']
      : ['parterowy', 'poddasze', 'pietrowy'];

  if (!availableFloors.includes(state.floors) && state.floors === 'poddasze') {
    set('floors', 'parterowy');
  }

  const availableRoofs: RoofType[] =
    state.floors === 'poddasze'
      ? ['dwuspadowy', 'wielospadowy']
      : ['plaski', 'dwuspadowy', 'wielospadowy'];

  function validate(): Record<string, string> {
    const errors: Record<string, string> = {};
    if (!state.name.trim() || state.name.trim().length < 3) errors.name = 'Podaj imię i nazwisko';
    if (!state.phone.trim() || !/^[\d\s+()-]{9,15}$/.test(state.phone.replace(/\s/g, '')))
      errors.phone = 'Podaj prawidłowy numer telefonu';
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
    };

    const result = calculateEstimate(config);
    await new Promise((resolve) => setTimeout(resolve, 800));

    setEstimate(result);
    setSubmittedConfig(config);
    setIsSubmitting(false);

    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  function handlePrint() {
    window.print();
  }

  // ─── Success / Result View — Professional Estimate Document ──

  if (estimate && submittedConfig) {
    const today = new Date();
    const validUntil = new Date(today);
    validUntil.setDate(validUntil.getDate() + 30);

    return (
      <section className="bg-gray-100 min-h-screen py-8 md:py-14 print:bg-white print:py-0 print:min-h-0">
        <div ref={resultRef} className="container mx-auto px-4 md:px-6 max-w-4xl print:max-w-none print:px-0">

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
            {/* Document Header with Logo */}
            <div className="bg-background-dark p-8 md:p-10 print:p-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-5">
                  <Image
                    src="/images/logo-white.webp"
                    alt="CoreLTB Builders"
                    width={64}
                    height={64}
                    className="rounded-xl"
                  />
                  <div>
                    <h1 className="text-white font-bold text-h4 md:text-h3 font-heading">CoreLTB Builders</h1>
                    <p className="text-gray-300 text-body-sm mt-1">Generalny Wykonawca Domów Jednorodzinnych</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold text-body-md uppercase tracking-wider">Wycena wstępna</p>
                  <p className="text-gray-400 text-body-sm mt-1.5">Nr: {refNumber}</p>
                  <p className="text-gray-400 text-body-sm">{today.toLocaleDateString('pl-PL')}</p>
                </div>
              </div>
            </div>

            {/* Client info bar */}
            <div className="bg-gray-50 px-8 md:px-10 py-5 border-b border-gray-200">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-body-sm">
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

            {/* Total — Hero */}
            <div className="print-total px-8 md:px-10 py-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {/* Left: label + price */}
                <div>
                  <p className="text-body-xs uppercase tracking-widest text-gray-500 font-semibold mb-1">
                    Szacunkowy koszt budowy
                  </p>
                  <p className="print-total-price text-h2 md:text-h1 font-bold text-text-primary font-heading leading-tight">
                    {formatPrice(estimate.total.min)} – {formatPrice(estimate.total.max)}
                  </p>
                  <p className="print-total-unit text-body-sm text-gray-500 font-normal mt-0.5">złotych netto</p>
                </div>
                {/* Right: meta stats */}
                <div className="flex flex-col gap-2 items-end text-right">
                  {[
                    { icon: 'calendar' as const, text: `${estimate.czasRealizacji.min}–${estimate.czasRealizacji.max} miesięcy` },
                    { icon: 'ruler' as const, text: `${submittedConfig.area} m²` },
                    { icon: 'coins' as const, text: `~${formatPrice(Math.round((estimate.total.min + estimate.total.max) / 2 / submittedConfig.area))} zł/m²` },
                  ].map((item) => (
                    <span key={item.icon} className="flex items-center gap-1.5 text-body-sm text-gray-700 font-medium">
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
              <div className="grid grid-cols-3 md:grid-cols-4 gap-x-6 gap-y-2">
                {[
                  ['Powierzchnia', `${submittedConfig.area} m²`],
                  ['Kondygnacje', FLOOR_LABELS[submittedConfig.floors]],
                  ['Ściany', WALL_LABELS[submittedConfig.wallType]],
                  ['Typ dachu', ROOF_LABELS[submittedConfig.roofType]],
                  ['Standard', FINISH_LABELS[submittedConfig.finish]],
                  ['Ogrzewanie', HEATING_LABELS[submittedConfig.heating]],
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

            {/* Cost breakdown — per stage with materials */}
            <div className="print-stages px-8 md:px-10 py-8 border-b border-gray-200">
              <h3 className="text-body-sm uppercase tracking-widest text-gray-500 font-semibold mb-6 flex items-center gap-2.5">
                <Icon name="list" size="md" className="text-primary" />
                Szczegółowe rozbicie kosztów
              </h3>

              <div className="space-y-6">
                {estimate.stages.map((stage, idx) => {
                  const icons = ['mountain', 'layers', 'home', 'keyRound', 'zap', 'paintBrush'] as const;
                  const stageIcon = icons[idx] || 'home';
                  return (
                    <div key={stage.label} className="print-stage-card border border-gray-200 rounded-xl overflow-hidden">
                      {/* Stage header */}
                      <div className="print-stage-header flex items-center justify-between bg-gray-50 px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Icon name={stageIcon} size="md" className="text-primary" />
                          </div>
                          <span className="text-body-md font-bold text-text-primary">{stage.label}</span>
                        </div>
                        <span className="text-body-md font-bold text-primary tabular-nums">
                          {formatPrice(stage.total.min)} – {formatPrice(stage.total.max)} zł
                        </span>
                      </div>

                      {/* Materials table */}
                      <div className="print-stage-body px-5 py-3">
                        <p className="text-body-xs uppercase tracking-wider text-gray-400 font-semibold mb-2">Materiały</p>
                        {stage.materials.map((mat) => (
                          <div key={mat.name} className="flex items-center justify-between py-1.5 text-body-sm">
                            <span className="text-gray-700">{mat.name}</span>
                            <span className="text-gray-500 tabular-nums text-body-xs flex-shrink-0 ml-4">
                              {mat.quantity} {mat.unit} × {formatPrice(mat.unitPrice)} zł = <strong className="text-gray-800">{formatPrice(mat.total)} zł</strong>
                            </span>
                          </div>
                        ))}

                        {/* Robocizna + Sprzęt */}
                        <div className="mt-2 pt-2 border-t border-dashed border-gray-200 space-y-1.5">
                          <div className="flex items-center justify-between text-body-sm">
                            <span className="text-gray-500 flex items-center gap-1.5">
                              <Icon name="users" size="sm" className="text-gray-400" />
                              Robocizna
                            </span>
                            <strong className="text-gray-800 tabular-nums">{formatPrice(stage.robocizna)} zł</strong>
                          </div>
                          {stage.sprzet > 0 && (
                            <div className="flex items-center justify-between text-body-sm">
                              <span className="text-gray-500 flex items-center gap-1.5">
                                <Icon name="construction" size="sm" className="text-gray-400" />
                                Sprzęt i transport
                              </span>
                              <strong className="text-gray-800 tabular-nums">{formatPrice(stage.sprzet)} zł</strong>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Garaż */}
                {estimate.garaz.max > 0 && (
                  <div className="flex items-center justify-between py-4 px-5 border border-gray-200 rounded-xl bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon name="home" size="md" className="text-primary" />
                      </div>
                      <span className="text-body-md font-bold text-text-primary">Garaż</span>
                    </div>
                    <span className="text-body-md font-bold text-primary tabular-nums">
                      {formatPrice(estimate.garaz.min)} – {formatPrice(estimate.garaz.max)} zł
                    </span>
                  </div>
                )}
              </div>

              {/* Summary: materiały / robocizna / sprzęt */}
              <div className="print-summary mt-6 pt-4 border-t border-gray-200 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-body-xs text-gray-400 uppercase tracking-wide">Materiały</p>
                  <p className="text-body-md font-bold text-text-primary mt-1">{formatPrice(estimate.materialTotal)} zł</p>
                </div>
                <div>
                  <p className="text-body-xs text-gray-400 uppercase tracking-wide">Robocizna</p>
                  <p className="text-body-md font-bold text-text-primary mt-1">{formatPrice(estimate.robociznaTotal)} zł</p>
                </div>
                <div>
                  <p className="text-body-xs text-gray-400 uppercase tracking-wide">Sprzęt</p>
                  <p className="text-body-md font-bold text-text-primary mt-1">{formatPrice(estimate.sprzetTotal)} zł</p>
                </div>
              </div>

              {/* TOTAL */}
              <div className="print-total-row flex items-center justify-between pt-5 mt-4 border-t-2 border-primary">
                <span className="text-h5 font-bold text-text-primary">RAZEM</span>
                <span className="text-h5 font-bold text-primary tabular-nums">
                  {formatPrice(estimate.total.min)} – {formatPrice(estimate.total.max)} zł
                </span>
              </div>
            </div>

            {/* Disclaimers */}
            <div className="print-disclaimers px-8 md:px-10 py-6 bg-gray-50">
              <div className="space-y-2.5 text-body-sm text-gray-600 leading-relaxed">
                <p>
                  <strong className="text-gray-800">Uwaga:</strong> Wycena ma charakter orientacyjny i została wygenerowana na podstawie uśrednionych
                  cen rynkowych dla regionu Śląska i Małopolski. Dokładna kalkulacja wymaga analizy projektu architektonicznego
                  i warunków gruntowych.
                </p>
                <p>Ceny netto. Podane kwoty nie zawierają: projektu architektonicznego, przyłączy mediów, opłat administracyjnych.</p>
                <p>Ważność wyceny: <strong className="text-gray-800">{validUntil.toLocaleDateString('pl-PL')}</strong> (30 dni od wygenerowania).</p>
              </div>
            </div>

            {/* Document Footer */}
            <div className="print-footer px-8 md:px-10 py-5 border-t border-gray-200 bg-background-dark">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-body-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <Image src="/images/logo-white.webp" alt="CoreLTB" width={28} height={28} className="rounded-lg" />
                  <span>CoreLTB Sp. z o.o. · ul. Grunwaldzka 34a, 43-600 Jaworzno</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="flex items-center gap-1.5">
                    <Icon name="phone" size="sm" className="text-primary" />
                    +48 664 123 757
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Icon name="mail" size="sm" className="text-primary" />
                    coreltb@gmail.com
                  </span>
                </div>
              </div>
            </div>
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
      </section>
    );
  }

  // ─── Form View ────────────────────────────────────────

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
                <Image
                  src="/images/logo-white.webp"
                  alt="CoreLTB"
                  width={90}
                  height={90}
                  className="rounded-2xl shadow-lg opacity-90 flex-shrink-0"
                />
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
          <form
            onSubmit={handleSubmit}
            className="px-5 md:px-8 lg:px-10 xl:px-14 py-8 md:py-10 lg:py-12"
            noValidate
          >
            {/* H1 */}
            <div className="mb-8">
              <h1 className="text-h3 xl:text-display font-bold font-heading text-text-primary leading-tight">
                Bezpłatna Wycena{' '}
                <span className="text-primary">Budowy Domu</span>
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
                    {state.area} m²
                  </div>
                </div>

                {/* Editable input (left) + Slider */}
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

                  <div className="flex-1">
                    <input
                      type="range"
                      min={80}
                      max={500}
                      step={5}
                      value={state.area}
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
              <OptionGroup label="Kondygnacje">
                {availableFloors.map((floor) => (
                  <OptionCard
                    key={floor}
                    label={FLOOR_LABELS[floor]}
                    icon={floor === 'pietrowy' ? 'building' : 'home'}
                    selected={state.floors === floor}
                    onClick={() => set('floors', floor)}
                  />
                ))}
              </OptionGroup>

              <OptionGroup label="Materiał murowy" className="mt-6">
                {(Object.keys(WALL_LABELS) as WallType[]).map((wall) => (
                  <OptionCard
                    key={wall}
                    label={WALL_LABELS[wall]}
                    icon="layers"
                    selected={state.wallType === wall}
                    onClick={() => set('wallType', wall)}
                  />
                ))}
              </OptionGroup>

              <OptionGroup label="Typ dachu" className="mt-6">
                {availableRoofs.map((roof) => (
                  <OptionCard
                    key={roof}
                    label={ROOF_LABELS[roof]}
                    icon="home"
                    selected={state.roofType === roof}
                    onClick={() => set('roofType', roof)}
                  />
                ))}
              </OptionGroup>
            </FormSection>

            <SectionDivider />

            {/* ─── Section 3: Wykończenie i dodatkowe ─── */}
            <FormSection number="3" title="Standard i wyposażenie">
              <OptionGroup label="Standard budowy">
                {(Object.keys(FINISH_LABELS) as FinishType[]).map((f) => (
                  <OptionCard
                    key={f}
                    label={FINISH_LABELS[f]}
                    icon={f === 'sso' ? 'construction' : f === 'deweloperski' ? 'home' : 'keyRound'}
                    selected={state.finish === f}
                    onClick={() => set('finish', f)}
                  />
                ))}
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

              <OptionGroup label="Ogrzewanie" className="mt-6">
                {(Object.keys(HEATING_LABELS) as HeatingType[]).map((h) => (
                  <OptionCard
                    key={h}
                    label={HEATING_LABELS[h]}
                    icon={h === 'gazowe' ? 'zap' : h === 'pompa_ciepla' ? 'wind' : 'lightbulb'}
                    selected={state.heating === h}
                    onClick={() => set('heating', h)}
                  />
                ))}
              </OptionGroup>

              <OptionGroup label="Garaż" className="mt-6">
                {(Object.keys(GARAGE_LABELS) as GarageType[]).map((g) => (
                  <OptionCard
                    key={g}
                    label={GARAGE_LABELS[g]}
                    icon={g === 'brak' ? 'x' : 'home'}
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
                  error={state.errors.email}
                  placeholder="jan@example.com"
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
  hint,
}: {
  label: string;
  type?: 'text' | 'tel' | 'email';
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  hint?: string;
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
      {hint && !error && <p className="mt-1 text-body-xs text-text-muted">{hint}</p>}
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
