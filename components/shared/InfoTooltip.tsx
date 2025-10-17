// src/components/shared/InfoTooltip.tsx
'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Icon, Portal } from '@/components/ui';
import { TermDefinition } from '@/data/definitions';
import { useMediaQuery } from '@/hooks/useMediaQuery';

export interface InfoTooltipProps {
  definition: TermDefinition;
}

export function InfoTooltip({ definition }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const iconRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Sprawdź czy jesteśmy na desktop (≥768px)
  const isDesktop = useMediaQuery('(min-width: 768px)');

  // Oblicz szerokość tooltipa na podstawie viewport width (tylko desktop)
  const getTooltipWidth = useCallback(() => {
    const viewportWidth = window.innerWidth;

    // Responsywne szerokości dla różnych rozdzielczości desktop
    if (viewportWidth >= 1920) return 541;      // Large desktop (Full HD+)
    if (viewportWidth >= 1536) return 480;      // Medium-large (1536px)
    if (viewportWidth >= 1280) return 420;      // Medium (1280px)
    if (viewportWidth >= 1024) return 380;      // Small desktop (1024px)
    return 350;                                  // Tablet landscape (768-1023px)
  }, []);

  // Oblicz pozycję tooltipa (tylko dla desktop)
  const calculatePosition = useCallback(() => {
    // Na mobile nie obliczamy pozycji (bottom sheet nie potrzebuje)
    if (!isDesktop) return;
    if (!iconRef.current) return;

    const rect = iconRef.current.getBoundingClientRect();
    const viewportWidth = window.innerWidth;

    // Domyślnie: wyśrodkowany pod ikoną
    let calculatedLeft = rect.left + rect.width / 2;

    // Dynamiczna szerokość tooltipa
    const tooltipWidth = getTooltipWidth();
    const halfWidth = tooltipWidth / 2;

    // Ochrona przed wyjazdem poza ekran - lewo
    if (calculatedLeft - halfWidth < 10) {
      calculatedLeft = halfWidth + 10; // 10px margin od lewej krawędzi
    }

    // Ochrona przed wyjazdem poza ekran - prawo
    if (calculatedLeft + halfWidth > viewportWidth - 10) {
      calculatedLeft = viewportWidth - halfWidth - 10; // 10px margin od prawej krawędzi
    }

    setPosition({
      top: rect.bottom + 8, // 8px gap BELOW icon
      left: calculatedLeft,
    });
  }, [isDesktop, getTooltipWidth]);

  // Toggle tooltip po kliknięciu
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Zapobiega zamknięciu przez click outside

    if (!isOpen && isDesktop) {
      // Na desktop oblicz pozycję PRZED otwarciem
      calculatePosition();
    }
    setIsOpen(!isOpen);
  };

  // Zamknij tooltip
  const closeTooltip = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Click outside - zamyka tooltip gdy klikniemy poza nim
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      // Sprawdź czy kliknięto poza tooltipem
      if (tooltipRef.current && !tooltipRef.current.contains(e.target as Node) &&
          iconRef.current && !iconRef.current.contains(e.target as Node)) {
        closeTooltip();
      }
    };

    // Dodaj listener dopiero po otwarciu tooltipa
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, closeTooltip]);

  // ESC key - zamyka tooltip (accessibility)
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeTooltip();
      }
    };

    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, closeTooltip]);

  // Scroll tracking - aktualizuj pozycję podczas scrollowania (tylko desktop)
  // Używamy requestAnimationFrame dla płynności i wydajności
  useEffect(() => {
    // Scroll tracking tylko na desktop (mobile ma bottom sheet który nie wymaga aktualizacji)
    if (!isOpen || !isDesktop) return;

    let rafId: number | null = null;
    let ticking = false;

    const handleScroll = () => {
      // Jeśli już zaplanowano aktualizację, pomiń
      if (ticking) return;

      ticking = true;

      // Zaplanuj aktualizację pozycji w następnej klatce animacji
      rafId = requestAnimationFrame(() => {
        calculatePosition();
        ticking = false;
      });
    };

    // Listen na scroll dla window i wszystkich parent elementów
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('scroll', handleScroll, true);
      // Anuluj zaplanowaną animację jeśli istnieje
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isOpen, isDesktop, calculatePosition]);

  return (
    <>
      {/* Ikona "i" - klikalna */}
      <button
        ref={iconRef}
        onClick={handleClick}
        aria-label="Pokaż więcej informacji"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className="inline-flex items-center justify-center ml-2 align-middle"
      >
        <Icon
          name="info"
          size="sm"
          className={`transition-colors ${
            isOpen
              ? 'text-primary'
              : 'text-gray-400 hover:text-primary'
          }`}
        />
      </button>

      {/* Tooltip - dwa tryby: desktop (dymek) i mobile (bottom sheet) */}
      {isOpen && (
        <Portal>
          {isDesktop ? (
            /* DESKTOP: Dymek nad ikoną - responsywna szerokość */
            <div
              ref={tooltipRef}
              className="fixed bg-white p-4 rounded-lg shadow-2xl border border-gray-200"
              style={{
                top: `${position.top}px`,
                left: `${position.left}px`,
                width: `${getTooltipWidth()}px`, // Dynamiczna szerokość
                transform: 'translateX(-50%)', // Center horizontally
                zIndex: 40, // PONIŻEJ sticky header (z-50)
              }}
              role="dialog"
              aria-modal="false"
              aria-labelledby="tooltip-title"
            >
              {/* Przycisk zamknięcia (X) - prawy górny róg */}
              <button
                onClick={closeTooltip}
                className="absolute top-2 right-2 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 group"
                aria-label="Zamknij tooltip"
              >
                <Icon
                  name="x"
                  size="sm"
                  className="text-gray-600 group-hover:text-gray-900 w-3 h-3"
                />
              </button>

              {/* Zawartość tooltipa */}
              <div className="pr-6">
                <h4
                  id="tooltip-title"
                  className="font-bold text-text-primary mb-2"
                >
                  {definition.title}
                </h4>
                <p className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                  {definition.content}
                </p>
              </div>

              {/* Strzałka wskazująca na ikonę - NA GÓRZE tooltipa */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-t border-l border-gray-200 transform rotate-45"
                aria-hidden="true"
              />
            </div>
          ) : (
            /* MOBILE: Bottom Sheet (panel od dołu) */
            <>
              {/* Overlay - ciemne tło */}
              <div
                className="fixed inset-0 bg-black/50 z-40"
                onClick={closeTooltip}
                aria-hidden="true"
              />

              {/* Bottom Sheet Panel */}
              <div
                ref={tooltipRef}
                className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl z-40 max-h-[80vh] overflow-y-auto"
                style={{
                  animation: 'slideUpFromBottom 0.3s ease-out',
                }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="tooltip-title-mobile"
              >
                {/* Header z drag handle i przyciskiem zamknięcia */}
                <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 rounded-t-2xl">
                  {/* Drag handle (wskaźnik wizualny) */}
                  <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-3" aria-hidden="true" />

                  {/* Przycisk zamknięcia */}
                  <button
                    onClick={closeTooltip}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
                    aria-label="Zamknij"
                  >
                    <Icon name="x" size="sm" className="text-gray-600" />
                  </button>

                  {/* Tytuł */}
                  <h4
                    id="tooltip-title-mobile"
                    className="font-bold text-text-primary text-lg pr-10"
                  >
                    {definition.title}
                  </h4>
                </div>

                {/* Zawartość */}
                <div className="px-4 py-6">
                  <p className="text-sm text-text-secondary whitespace-pre-line leading-relaxed">
                    {definition.content}
                  </p>
                </div>
              </div>
            </>
          )}
        </Portal>
      )}
    </>
  );
}
