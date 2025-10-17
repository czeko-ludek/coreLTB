// hooks/useMediaQuery.ts
'use client';

import { useState, useEffect } from 'react';

/**
 * Hook do sprawdzania media queries w React
 *
 * @param query - Media query string (np. "(min-width: 768px)")
 * @returns boolean - true jeśli query pasuje, false w przeciwnym razie
 *
 * @example
 * const isDesktop = useMediaQuery('(min-width: 768px)');
 * const isMobile = useMediaQuery('(max-width: 767px)');
 */
export function useMediaQuery(query: string): boolean {
  // SSR-safe: domyślnie false, zaktualizuje się po mount
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Sprawdź czy jesteśmy w przeglądarce
    if (typeof window === 'undefined') return;

    // Utwórz media query list
    const mediaQueryList = window.matchMedia(query);

    // Handler dla zmian
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setMatches(event.matches);
    };

    // Ustaw początkową wartość
    setMatches(mediaQueryList.matches);

    // Nasłuchuj zmian (np. zmiana orientacji, resize okna)
    // Stara metoda (deprecated ale wspierana): addListener
    // Nowa metoda: addEventListener
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', handleChange);
    } else {
      // Fallback dla starszych przeglądarek
      mediaQueryList.addListener(handleChange);
    }

    // Cleanup
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', handleChange);
      } else {
        // Fallback dla starszych przeglądarek
        mediaQueryList.removeListener(handleChange);
      }
    };
  }, [query]);

  return matches;
}
