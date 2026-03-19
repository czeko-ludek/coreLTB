'use client';

import { useEffect } from 'react';

/**
 * HideHeader — ukrywa globalny header (wraz z wrapper div) na stronie /wycena.
 * Używa DOM manipulation, bo header jest w layout.tsx (server component).
 * Czyści po unmount.
 */
export const HideHeader = () => {
  useEffect(() => {
    // Header is inside a sticky wrapper div — hide the wrapper
    const header = document.querySelector('header');
    const wrapper = header?.closest('.sticky, [class*="sticky"]') || header?.parentElement?.parentElement;

    // Hide header and its wrapper chain
    const elementsToHide: HTMLElement[] = [];

    if (header) {
      // Walk up to find the outermost sticky wrapper
      let el: HTMLElement | null = header;
      while (el && el !== document.body) {
        if (el.classList.contains('sticky') || el.style.position === 'sticky') {
          elementsToHide.push(el);
          break;
        }
        el = el.parentElement;
      }

      // Fallback: if no sticky wrapper found, hide header directly
      if (elementsToHide.length === 0) {
        elementsToHide.push(header);
      }
    }

    elementsToHide.forEach((el) => {
      el.style.display = 'none';
    });

    return () => {
      elementsToHide.forEach((el) => {
        el.style.display = '';
      });
    };
  }, []);

  return null;
};
