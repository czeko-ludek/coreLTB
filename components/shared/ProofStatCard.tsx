'use client';

import { useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

interface ProofStatCardProps {
  value: string; // np. "350+", "98%"
  label: string;
  description?: string;
  index: number; // Dla animacji stagger
}

/**
 * ProofStatCard - Molekuła
 *
 * Karta wyświetlająca statystyki budujące zaufanie (social proof).
 * Animuje się po wejściu w viewport (scroll-triggered).
 *
 * Cechy:
 * - Duża, złota wartość liczbowa
 * - Label i opcjonalny opis
 * - Animacja fade-in-up przy scrollowaniu
 * - Stagger delay bazujący na index
 * - Używa react-intersection-observer
 */
export const ProofStatCard: React.FC<ProofStatCardProps> = ({
  value,
  label,
  description,
  index,
}) => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`
        bg-white rounded-xl p-6 md:p-8
        shadow-lg
        text-center
        transition-all duration-700 ease-out
        ${
          inView
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }
      `}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Value */}
      <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-3">
        {value}
      </div>

      {/* Label */}
      <h4 className="text-base md:text-lg font-bold text-text-primary mb-2">
        {label}
      </h4>

      {/* Description (optional) */}
      {description && (
        <p className="text-sm md:text-base text-text-secondary leading-relaxed whitespace-pre-line">
          {description}
        </p>
      )}
    </div>
  );
};
