'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { trackEvent } from '@/lib/analytics';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
    fbq?: (...args: unknown[]) => void;
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

/**
 * CookieConsent — large bottom bar with backdrop overlay.
 * Tracks: cookie_accepted, cookie_rejected, cookie_ignored (after 30s without action).
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [animate, setAnimate] = useState(false);
  const ignoredTrackedRef = useRef(false);

  useEffect(() => {
    const stored = getStoredConsent();

    if (stored && typeof window !== 'undefined') {
      if (stored === 'all') {
        if (typeof window.gtag === 'function') {
          window.gtag('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
          });
        }
        if (typeof window.fbq === 'function') {
          window.fbq('consent', 'grant');
        }
      }
    }

    if (stored) return;

    const showTimer = setTimeout(() => {
      setVisible(true);
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setAnimate(true));
      });
    }, 1500);

    // Track "ignored" after 30 seconds without action
    const ignoreTimer = setTimeout(() => {
      if (!getStoredConsent() && !ignoredTrackedRef.current) {
        ignoredTrackedRef.current = true;
        trackEvent('cookie_ignored', { delay_seconds: 30 });
      }
    }, 31500); // 1.5s show delay + 30s

    return () => {
      clearTimeout(showTimer);
      clearTimeout(ignoreTimer);
    };
  }, []);

  const handleConsent = useCallback((value: 'all' | 'necessary') => {
    localStorage.setItem(COOKIE_KEY, value);

    // Track the decision
    trackEvent(value === 'all' ? 'cookie_accepted' : 'cookie_rejected');

    if (typeof window !== 'undefined') {
      if (typeof window.gtag === 'function') {
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
      // Meta Pixel consent
      if (typeof window.fbq === 'function') {
        if (value === 'all') {
          window.fbq('consent', 'grant');
        } else {
          window.fbq('consent', 'revoke');
        }
      }
    }

    setAnimate(false);
    setTimeout(() => setVisible(false), 400);
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Backdrop overlay — subtle darkening, clickable to dismiss visually but consent stays */}
      <div
        className={`
          fixed inset-0 z-[59] bg-black/40 backdrop-blur-[2px]
          transition-opacity duration-500
          ${animate ? 'opacity-100' : 'opacity-0'}
        `}
        aria-hidden="true"
      />

      {/* Cookie bar */}
      <div
        role="dialog"
        aria-label="Zgoda na pliki cookies"
        className={`
          fixed bottom-0 inset-x-0 z-[60]
          transition-all duration-500 ease-out
          ${animate ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}
        `}
      >
        <div className="bg-zinc-900 border-t border-zinc-700/50 shadow-[0_-8px_30px_rgba(0,0,0,0.3)]">
          <div className="max-w-5xl mx-auto px-5 py-6 sm:px-8 sm:py-8">
            {/* Header */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-semibold text-white">
                Szanujemy Twoją prywatność
              </h3>
            </div>

            {/* Description */}
            <p className="text-sm sm:text-[15px] text-zinc-400 leading-relaxed mb-6 max-w-3xl">
              Używamy plików cookies, aby analizować ruch na stronie i dostarczać
              lepsze doświadczenia. Dzięki nim możemy wyświetlać trafniejsze treści
              i mierzyć skuteczność naszych działań.{' '}
              <Link
                href="/privacy#cookies"
                className="text-zinc-300 underline underline-offset-2 hover:text-primary transition-colors"
              >
                Polityka prywatności
              </Link>
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <button
                onClick={() => handleConsent('all')}
                className="
                  px-8 py-3 text-sm sm:text-base font-semibold
                  text-zinc-900 bg-primary
                  rounded-xl
                  hover:bg-primary/90
                  transition-colors duration-200
                  order-1
                "
              >
                Akceptuję wszystkie
              </button>
              <button
                onClick={() => handleConsent('necessary')}
                className="
                  px-6 py-3 text-sm sm:text-base font-medium
                  text-zinc-400 hover:text-white
                  border border-zinc-700 rounded-xl
                  hover:bg-zinc-800 hover:border-zinc-600
                  transition-colors duration-200
                  order-2
                "
              >
                Tylko niezbędne
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
