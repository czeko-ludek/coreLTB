'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Icon } from './Icon';

interface FloatingCTAProps {
  text: string;
  href: string;
  /**
   * ID sekcji, która ma być monitorowana. Gdy sekcja jest widoczna, FloatingCTA znika.
   * @default null (użyje prostego offsetu scrollowania)
   */
  hideWhenSectionVisible?: string;
  /**
   * Offset od góry strony (w pikselach), po którym przycisk staje się widoczny.
   * Używane tylko gdy hideWhenSectionVisible nie jest podane.
   * @default 300
   */
  showAfterScroll?: number;
}

/**
 * FloatingCTA - Atom
 *
 * Sticky floating action button wyświetlający się po prawej stronie ekranu.
 * Pojawia się gdy użytkownik przewinie poniżej określonej sekcji i znika gdy wróci do niej.
 *
 * Cechy:
 * - Sticky positioning (fixed) w prawym dolnym rogu
 * - Animacja slide-in/out z prawej strony
 * - Złoty kolor zgodny z paletą (#dfbb68)
 * - Responsywny: na mobile mniejszy padding
 * - Ikona ArrowRight z animacją na hover
 * - IntersectionObserver do wykrywania widoczności sekcji
 */
export const FloatingCTA: React.FC<FloatingCTAProps> = ({
  text,
  href,
  hideWhenSectionVisible,
  showAfterScroll = 300,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Jeśli podano ID sekcji do monitorowania
    if (hideWhenSectionVisible) {
      const targetSection = document.getElementById(hideWhenSectionVisible);

      if (!targetSection) {
        console.warn(`FloatingCTA: Section with id "${hideWhenSectionVisible}" not found`);
        return;
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Jeśli sekcja jest widoczna (przynajmniej 10%), ukryj FloatingCTA
          // Jeśli sekcja nie jest widoczna, pokaż FloatingCTA
          setIsVisible(!entry.isIntersecting);
        },
        {
          threshold: 0.1, // Wywołaj callback gdy 10% sekcji jest widoczne
          rootMargin: '0px',
        }
      );

      observer.observe(targetSection);

      return () => observer.disconnect();
    } else {
      // Fallback: prosty scroll offset
      const handleScroll = () => {
        const scrolled = window.scrollY > showAfterScroll;
        setIsVisible(scrolled);
      };

      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [hideWhenSectionVisible, showAfterScroll]);

  return (
    <Link
      href={href}
      className={`
        fixed bottom-6 right-6 z-50
        hidden lg:flex
        bg-primary text-white
        px-4 md:px-6 py-3 md:py-4
        rounded-xl
        shadow-2xl
        font-semibold text-sm md:text-base uppercase tracking-wider
        transition-all duration-500 ease-out
        hover:bg-primary-dark hover:shadow-[0_20px_50px_rgba(223,187,104,0.4)]
        hover:-translate-y-1
        flex items-center gap-2 md:gap-3
        ${
          isVisible
            ? 'translate-x-0 opacity-100'
            : 'translate-x-[200%] opacity-0 pointer-events-none'
        }
      `}
      aria-label={text}
    >
      <span>{text}</span>
      <Icon
        name="arrowRight"
        size="md"
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </Link>
  );
};
