'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Icon } from '@/components/ui';
import { validatePolishPhone } from '@/lib/validation';
import { getUTMParams, trackEvent, trackMetaEvent } from '@/lib/analytics';

interface PlotInquiryFormProps {
  plotTitle: string;
  plotSlug: string;
  plotCity: string;
  onClose: () => void;
}

interface FormState {
  name: string;
  phone: string;
  message: string;
  website: string; // honeypot
}

interface FormErrors {
  name?: string;
  phone?: string;
}

/**
 * Inline inquiry form for plot detail sidebar.
 * Sends to /api/lead with source=plot_inquiry.
 * Uses CSS transition (no Framer Motion) for crossfade.
 */
export function PlotInquiryForm({ plotTitle, plotSlug, plotCity, onClose }: PlotInquiryFormProps) {
  const [form, setForm] = useState<FormState>({
    name: '',
    phone: '',
    message: '',
    website: '', // honeypot
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  // Focus name field on mount
  useEffect(() => {
    const timer = setTimeout(() => nameRef.current?.focus(), 150);
    return () => clearTimeout(timer);
  }, []);

  const updateField = useCallback((field: keyof FormState, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  const validate = useCallback((): boolean => {
    const newErrors: FormErrors = {};

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Podaj imię i nazwisko';
    }

    if (!form.phone.trim()) {
      newErrors.phone = 'Podaj numer telefonu';
    } else if (!validatePolishPhone(form.phone)) {
      newErrors.phone = 'Podaj poprawny numer telefonu';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [form.name, form.phone]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const utm = getUTMParams();

    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: 'plot_inquiry',
          data: {
            name: form.name.trim(),
            phone: form.phone.trim(),
            message: form.message.trim(),
            plotTitle,
            plotSlug,
            plotCity,
            website: form.website, // honeypot
            ...utm,
          },
        }),
      });

      // Track conversions
      trackEvent('plot_inquiry_lead', {
        plot_slug: plotSlug,
        city: plotCity,
      });
      trackMetaEvent('Lead', {
        content_name: 'plot_inquiry',
        content_category: 'lead_form',
      });

      setIsSuccess(true);
    } catch (err) {
      console.error('[PlotInquiry] Submit error:', err);
      // Still show success — graceful degradation
      setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  }, [form, plotTitle, plotSlug, plotCity, validate]);

  // ── Success state ──
  if (isSuccess) {
    return (
      <div className="p-6 text-center">
        <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
          <Icon name="check" size="lg" className="text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-text-primary mb-2">
          Dziękujemy za zgłoszenie!
        </h3>
        <p className="text-sm text-text-secondary mb-4 leading-relaxed">
          Skontaktujemy się z Tobą najszybciej jak to możliwe w sprawie działki w {plotCity}.
        </p>
        <button
          onClick={onClose}
          className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
        >
          Wróć do oferty
        </button>
      </div>
    );
  }

  // ── Form state ──
  return (
    <div className="p-6">
      {/* Header with close button */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-bold text-text-primary">
            Zapytaj o działkę
          </h3>
          <p className="text-xs text-text-muted mt-0.5 line-clamp-2">
            {plotTitle}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center shrink-0 transition-colors"
          aria-label="Zamknij formularz"
        >
          <Icon name="close" size="sm" className="text-text-muted" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Honeypot — hidden from real users */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={e => updateField('website', e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          className="absolute opacity-0 h-0 w-0 pointer-events-none"
          aria-hidden="true"
        />

        {/* Name */}
        <div>
          <label htmlFor="plot-inquiry-name" className="block text-xs font-semibold text-text-secondary mb-1">
            Imię i nazwisko *
          </label>
          <input
            ref={nameRef}
            id="plot-inquiry-name"
            type="text"
            value={form.name}
            onChange={e => updateField('name', e.target.value)}
            placeholder="Jan Kowalski"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
              errors.name ? 'border-red-400' : 'border-zinc-200'
            }`}
          />
          {errors.name && (
            <p className="text-xs text-red-500 mt-1">{errors.name}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="plot-inquiry-phone" className="block text-xs font-semibold text-text-secondary mb-1">
            Telefon *
          </label>
          <input
            id="plot-inquiry-phone"
            type="tel"
            value={form.phone}
            onChange={e => updateField('phone', e.target.value)}
            placeholder="664 123 757"
            className={`w-full px-3 py-2.5 text-sm border rounded-lg bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${
              errors.phone ? 'border-red-400' : 'border-zinc-200'
            }`}
          />
          {errors.phone && (
            <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Message (optional) */}
        <div>
          <label htmlFor="plot-inquiry-message" className="block text-xs font-semibold text-text-secondary mb-1">
            Wiadomość <span className="font-normal text-text-muted">(opcjonalnie)</span>
          </label>
          <textarea
            id="plot-inquiry-message"
            value={form.message}
            onChange={e => updateField('message', e.target.value)}
            placeholder="Jestem zainteresowany tą działką..."
            rows={3}
            className="w-full px-3 py-2.5 text-sm border border-zinc-200 rounded-lg bg-white resize-none transition-colors focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-zinc-900 font-bold text-sm px-6 py-3 rounded-lg transition-all duration-300 uppercase tracking-wider"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-zinc-900/30 border-t-zinc-900 rounded-full animate-spin" />
              Wysyłanie...
            </>
          ) : (
            <>
              <Icon name="mail" size="sm" />
              Wyślij zapytanie
            </>
          )}
        </button>

        {/* Privacy note */}
        <p className="text-[11px] text-text-muted text-center leading-relaxed">
          Wysyłając formularz wyrażasz zgodę na kontakt telefoniczny w celu przedstawienia oferty.
        </p>
      </form>
    </div>
  );
}
