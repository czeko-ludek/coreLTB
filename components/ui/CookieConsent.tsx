'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

const COOKIE_KEY = 'coreltb-cookies';

type ConsentValue = 'all' | 'necessary' | null;

function getStoredConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  const val = localStorage.getItem(COOKIE_KEY);
  if (val === 'all' || val === 'necessary') return val;
  return null;
}

/* ========================================================================
 * ZMIEN VARIANT TUTAJ (1, 2 lub 3) aby przetestowac rozne designy:
 * ====================================================================== */
const ACTIVE_VARIANT: 1 | 2 | 3 = 1;

/**
 * CookieConsent — cookie bar na dole ekranu.
 * 3 warianty designu — zmien ACTIVE_VARIANT powyzej.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const stored = getStoredConsent();

    if (stored && typeof window !== 'undefined' && typeof window.gtag === 'function') {
      if (stored === 'all') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      }
    }

    if (stored) return;

    const timer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = useCallback((value: 'all' | 'necessary') => {
    localStorage.setItem(COOKIE_KEY, value);

    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      if (value === 'all') {
        window.gtag('consent', 'update', {
          analytics_storage: 'granted',
          ad_storage: 'granted',
          ad_user_data: 'granted',
          ad_personalization: 'granted',
        });
      } else {
        window.gtag('consent', 'update', {
          analytics_storage: 'denied',
          ad_storage: 'denied',
          ad_user_data: 'denied',
          ad_personalization: 'denied',
        });
      }
    }

    setAnimate(false);
    setTimeout(() => setVisible(false), 400);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Zgoda na pliki cookies"
      className={`
        fixed bottom-0 inset-x-0 z-[60]
        transition-all duration-400 ease-out
        ${animate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
      `}
    >
      {ACTIVE_VARIANT === 1 && (
        <Variant1 onConsent={handleConsent} />
      )}
      {ACTIVE_VARIANT === 2 && (
        <Variant2 onConsent={handleConsent} />
      )}
      {ACTIVE_VARIANT === 3 && (
        <Variant3 onConsent={handleConsent} />
      )}
    </div>
  );
}

interface VariantProps {
  onConsent: (value: 'all' | 'necessary') => void;
}

/* ========================================================================
 * VARIANT 1 — Compact glassmorphism bar
 *
 * Floating bar z backdrop-blur i zaokraglonymi rogami.
 * Subtelna ikonka ciasteczka, tekst po lewej, buttony po prawej.
 * Na mobile stackuje sie pionowo. Ciemny motyw — elegancki i nowoczesny.
 * ====================================================================== */
function Variant1({ onConsent }: VariantProps) {
  return (
    <div className="px-4 sm:px-6 pb-4 sm:pb-6">
      <div className="max-w-4xl mx-auto bg-zinc-900/95 backdrop-blur-md rounded-2xl border border-zinc-700/50 shadow-2xl">
        <div className="px-5 py-4 sm:px-6 sm:py-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Ikona + tekst */}
            <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
              <svg className="w-5 h-5 text-primary shrink-0 mt-0.5 sm:mt-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <p className="text-sm text-zinc-300 leading-relaxed">
                Używamy cookies do analizy ruchu i poprawy jakości.{' '}
                <Link
                  href="/privacy#cookies"
                  className="text-white font-medium underline underline-offset-2 hover:text-primary transition-colors"
                >
                  Polityka prywatności
                </Link>
              </p>
            </div>

            {/* Buttony */}
            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onConsent('necessary')}
                className="
                  px-4 py-2 text-sm font-medium
                  text-zinc-400 hover:text-white
                  rounded-lg
                  hover:bg-zinc-800
                  transition-colors duration-200
                "
              >
                Odrzuć
              </button>
              <button
                onClick={() => onConsent('all')}
                className="
                  px-5 py-2 text-sm font-semibold
                  text-zinc-900 bg-primary
                  rounded-lg
                  hover:bg-primary/90
                  transition-colors duration-200
                "
              >
                Akceptuję
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
 * VARIANT 2 — Minimal bottom strip
 *
 * Ultracienki pasek na samym dole — prawie nie przeszkadza.
 * Bialy z subtelnymi przyciskami. Tekst i buttony w jednej linii.
 * Na mobile: dwie linie — tekst + buttony pod spodem.
 * ====================================================================== */
function Variant2({ onConsent }: VariantProps) {
  return (
    <div className="bg-white border-t border-zinc-200/80 shadow-[0_-2px_12px_rgba(0,0,0,0.04)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-6">
          <p className="text-[13px] text-zinc-500 leading-relaxed">
            Ta strona korzysta z cookies w celu analizy ruchu.{' '}
            <Link
              href="/privacy#cookies"
              className="text-zinc-700 font-medium hover:text-primary underline underline-offset-2 transition-colors"
            >
              Więcej
            </Link>
          </p>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => onConsent('necessary')}
              className="
                px-3 py-1.5 text-[13px] font-medium
                text-zinc-500 hover:text-zinc-700
                transition-colors duration-200
              "
            >
              Tylko niezbędne
            </button>
            <button
              onClick={() => onConsent('all')}
              className="
                px-4 py-1.5 text-[13px] font-semibold
                text-white bg-zinc-900
                rounded-full
                hover:bg-zinc-700
                transition-colors duration-200
              "
            >
              OK, rozumiem
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================
 * VARIANT 3 — Card w rogu (bottom-left)
 *
 * Mala kartka w lewym dolnym rogu — nie zaslania contentu.
 * Ciemne tlo, shield icon, krotki tekst, dwa buttony jeden pod drugim.
 * Na mobile: full-width na dole.
 * ====================================================================== */
function Variant3({ onConsent }: VariantProps) {
  return (
    <div className="px-4 pb-4 sm:px-6 sm:pb-6 flex justify-start">
      <div className="w-full sm:max-w-sm bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-800 overflow-hidden">
        {/* Gorny akcent */}
        <div className="h-1 bg-gradient-to-r from-primary via-primary/60 to-transparent" />

        <div className="px-5 py-5">
          {/* Ikonka + naglowek */}
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <svg className="w-4 h-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-sm font-semibold text-white">Prywatność i cookies</h3>
          </div>

          {/* Tekst */}
          <p className="text-[13px] text-zinc-400 leading-relaxed mb-4">
            Używamy plików cookies do analizy ruchu i poprawy działania strony.{' '}
            <Link
              href="/privacy#cookies"
              className="text-zinc-300 underline underline-offset-2 hover:text-primary transition-colors"
            >
              Dowiedz się więcej
            </Link>
          </p>

          {/* Buttony — obok siebie */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => onConsent('all')}
              className="
                flex-1 px-4 py-2.5 text-sm font-semibold
                text-zinc-900 bg-primary
                rounded-xl
                hover:bg-primary/90
                transition-colors duration-200
              "
            >
              Akceptuję
            </button>
            <button
              onClick={() => onConsent('necessary')}
              className="
                flex-1 px-4 py-2.5 text-sm font-medium
                text-zinc-400 hover:text-white
                border border-zinc-700 rounded-xl
                hover:bg-zinc-800 hover:border-zinc-600
                transition-colors duration-200
              "
            >
              Odrzuć
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
