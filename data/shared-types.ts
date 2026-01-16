/**
 * SHARED TYPES - Single Source of Truth
 * Wspólne typy danych dla servicesV2.ts i local-pages.ts
 * Przygotowane pod integrację z Headless CMS (Strapi)
 */

import type { IconName } from '@/components/ui/Icon';

/**
 * ContentBlock - elastyczny format treści
 * Używany w: servicesV2.ts, local-pages.ts
 *
 * WAŻNE: Obrazy NIE są częścią ContentBlock!
 * W Strapi obrazy to osobne komponenty Media, nie bloki tekstowe.
 */
export type ContentBlock =
  | { type: 'paragraph'; value: string }
  | { type: 'list'; items: string[] };

/**
 * ContentItem - element z ikoną, tytułem i treścią
 * Może być renderowany jako:
 * - Statyczny element (SimpleImageTextSection)
 * - Rozwijany accordion (ServicesAccordionSection)
 */
export interface ContentItem {
  icon: IconName;           // Ikona z lucide-react
  title: string;            // Tytuł elementu (H3)
  content: ContentBlock[];  // Treść (paragrafy lub listy)
}

/**
 * FAQ - pytanie i odpowiedź
 * Używany w: servicesV2.ts, local-pages.ts
 */
export interface FAQ {
  question: string;  // Pytanie
  answer: string;    // Odpowiedź (wspiera **bold** markdown)
}
