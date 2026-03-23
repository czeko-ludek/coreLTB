'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const COOKIE_KEY = 'coreltb-cookies';

type ConsentValue = 'all' | 'necessary' | null;

function getStoredConsent(): ConsentValue {
  if (typeof window === 'undefined') return null;
  const val = localStorage.getItem(COOKIE_KEY);
  if (val === 'all' || val === 'necessary') return val;
  return null;
}

/**
 * CookieConsent — skromny pasek cookies na dole ekranu.
 *
 * Dwa przyciski: "Akceptuję wszystkie" (primary) i "Tylko niezbędne" (ghost).
 * Wynik zapisywany w localStorage. Pasek znika na zawsze po wyborze.
 * Animacja wejścia: slide-up z opacity (CSS transition, bez Framer Motion).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Nie pokazuj jeśli user już wybrał
    if (getStoredConsent()) return;

    // Pokaż po krótkim opóźnieniu żeby nie walczyć z FCP
    const timer = setTimeout(() => {
      setVisible(true);
      // Wymuszamy reflow, potem animacja wejścia
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleConsent = useCallback((value: 'all' | 'necessary') => {
    localStorage.setItem(COOKIE_KEY, value);

    // TODO: Kiedy GA4 będzie podpięte, tutaj odpalamy/blokujemy skrypty
    // if (value === 'all') { window.gtag?.('consent', 'update', { analytics_storage: 'granted' }); }

    // Animacja wyjścia
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
        ${animate
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0'
        }
      `}
    >
      {/* Delikatny cień na górze */}
      <div className="bg-white border-t border-zinc-200 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            {/* Tekst */}
            <p className="text-sm text-zinc-600 leading-relaxed flex-1">
              Korzystamy z plików cookies, aby zapewnić prawidłowe działanie
              strony i analizować ruch.{' '}
              <Link
                href="/privacy#cookies"
                className="text-zinc-900 font-medium underline underline-offset-2 hover:text-primary transition-colors"
              >
                Dowiedz się więcej
              </Link>
            </p>

            {/* Przyciski */}
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => handleConsent('necessary')}
                className="
                  px-4 py-2 text-sm font-medium
                  text-zinc-600 hover:text-zinc-900
                  border border-zinc-300 rounded-lg
                  hover:bg-zinc-50
                  transition-colors duration-200
                "
              >
                Tylko niezbędne
              </button>
              <button
                onClick={() => handleConsent('all')}
                className="
                  px-4 py-2 text-sm font-semibold
                  text-white bg-zinc-900
                  rounded-lg
                  hover:bg-zinc-800
                  transition-colors duration-200
                "
              >
                Akceptuję wszystkie
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
