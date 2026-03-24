'use client';

import { useState, useEffect, useCallback } from 'react';
import { Icon } from './Icon';
import { trackPhoneClick } from '@/lib/analytics';

interface FloatingPhoneCTAProps {
  phone?: string;
  /** Show only on mobile (< lg breakpoint) */
  mobileOnly?: boolean;
  /** Scroll offset before showing */
  showAfterScroll?: number;
  /** Delay before showing tooltip bubble (ms) */
  tooltipDelay?: number;
  /** Tooltip text */
  tooltipText?: string;
}

/**
 * FloatingPhoneCTA - Pulsating phone button (mobile)
 *
 * Okrągły przycisk telefonu w prawym dolnym rogu z pulsującą animacją.
 * Pojawia się po scrollu, tylko na mobile.
 * Po 5s wyświetla dymek "Masz pytanie? Zadzwoń!"
 */
export const FloatingPhoneCTA: React.FC<FloatingPhoneCTAProps> = ({
  phone = '+48664123757',
  mobileOnly = true,
  showAfterScroll = 400,
  tooltipDelay = 5000,
  tooltipText = 'Masz pytanie? Zadzwoń!',
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipDismissed, setTooltipDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showAfterScroll]);

  // Show tooltip after delay once button is visible
  useEffect(() => {
    if (!isVisible || tooltipDismissed) return;

    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, tooltipDelay);

    return () => clearTimeout(timer);
  }, [isVisible, tooltipDelay, tooltipDismissed]);

  const dismissTooltip = useCallback(() => {
    setShowTooltip(false);
    setTooltipDismissed(true);
  }, []);

  return (
    <div
      className={`
        fixed bottom-6 right-6 z-50
        ${mobileOnly ? 'lg:hidden' : ''}
        transition-all duration-500 ease-out
        ${
          isVisible
            ? 'translate-y-0 opacity-100 scale-100'
            : 'translate-y-20 opacity-0 scale-75 pointer-events-none'
        }
      `}
    >
      {/* Tooltip bubble */}
      <div
        className={`
          absolute bottom-[calc(100%+12px)] right-0
          bg-white text-gray-800 text-sm font-medium
          px-4 py-2.5 rounded-xl
          shadow-[0_4px_20px_rgba(0,0,0,0.12)]
          whitespace-nowrap
          transition-all duration-400 ease-out
          ${
            showTooltip
              ? 'translate-y-0 opacity-100 scale-100'
              : 'translate-y-2 opacity-0 scale-95 pointer-events-none'
          }
        `}
      >
        {tooltipText}

        {/* Arrow pointing down */}
        <span className="absolute -bottom-1.5 right-5 w-3 h-3 bg-white rotate-45 shadow-[2px_2px_4px_rgba(0,0,0,0.06)]" />

        {/* Dismiss button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dismissTooltip();
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs transition-colors"
          aria-label="Zamknij"
        >
          ✕
        </button>
      </div>

      {/* Phone button */}
      <a
        href={`tel:${phone}`}
        aria-label="Zadzwoń do nas"
        onClick={() => { dismissTooltip(); trackPhoneClick('floating-cta'); }}
        className="
          relative
          w-14 h-14
          bg-primary rounded-full
          shadow-[0_4px_20px_rgba(223,187,104,0.5)]
          flex items-center justify-center
          hover:bg-primary-dark hover:scale-110
          transition-all duration-300
        "
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30" />

        {/* Icon */}
        <Icon
          name="phone"
          size="md"
          className="relative z-10 text-white"
        />
      </a>
    </div>
  );
};
