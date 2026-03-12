/**
 * Generatory Schema.org dla stron lokalnych
 * UWAGA: BEZ pricing (każdy projekt indywidualny)
 */

import type { ResolvedLocalPageData, FAQItem } from '@/data/local';
import { companyData, getLocalBusinessSchema, getProviderSchema } from '@/data/company-data';
import type {
  SchemaGraph,
  FAQPageSchema,
  ServiceSchema,
  BreadcrumbListSchema
} from './types';

/**
 * Usuwa markdown z tekstu (dla Schema.org)
 */
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')  // **bold** → text
    .replace(/\*(.*?)\*/g, '$1')      // *italic* → text
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // [link](url) → link
    .replace(/`(.*?)`/g, '$1')        // `code` → code
    .replace(/#{1,6}\s/g, '')         // # heading → heading
    .trim();
}

/**
 * Flatten FAQItem content (ContentBlock[]) to plain text string
 */
function flattenFAQContent(item: FAQItem): string {
  return item.content
    .map((block) => {
      if (block.type === 'paragraph') return stripMarkdown(block.value);
      if (block.type === 'list') return block.items.map(i => stripMarkdown(i)).join('. ');
      return '';
    })
    .join(' ');
}

/**
 * Generuje FAQPage Schema
 */
export function generateFAQPageSchema(
  faqItems: FAQItem[],
  pageUrl: string
): FAQPageSchema {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqItems.map(item => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: flattenFAQContent(item)
      }
    }))
  };
}

/**
 * Generuje Service Schema (bez pricing - bo każdy projekt indywidualny)
 */
export function generateServiceSchema(
  page: ResolvedLocalPageData,
  pageUrl: string
): ServiceSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Budowa domów ${page.cityName}`,
    description: stripMarkdown(page.emotionalHero.subtitle),
    provider: getProviderSchema(),
    areaServed: page.areaServed.map(city => ({
      "@type": "City",
      name: city
    })),
    url: pageUrl,
  };
}

/**
 * Generuje BreadcrumbList Schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ label: string; href: string }>,
  baseUrl: string
): BreadcrumbListSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${baseUrl}#breadcrumb`,
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: crumb.href ? `${companyData.url}${crumb.href}` : undefined
    }))
  };
}

/**
 * Generator główny dla stron lokalnych
 * Łączy Service + FAQPage + LocalBusiness + Breadcrumb
 */
export function generateLocalPageSchema(page: ResolvedLocalPageData): object {
  const pageUrl = `${companyData.url}/obszar-dzialania/${page.slug}`;
  const graphItems: object[] = [];

  // 1. Service Schema (bez pricing)
  graphItems.push(generateServiceSchema(page, pageUrl));

  // 2. FAQPage Schema
  if (page.faq.items.length > 0) {
    graphItems.push(generateFAQPageSchema(page.faq.items, pageUrl));
  }

  // 3. LocalBusiness Schema
  const localBusiness = {
    ...getLocalBusinessSchema(),
    url: pageUrl, // Override URL do konkretnego miasta
  };

  // Dodaj geo coordinates jeśli są
  if (page.geoCoordinates) {
    localBusiness.geo = {
      "@type": "GeoCoordinates",
      latitude: page.geoCoordinates.latitude,
      longitude: page.geoCoordinates.longitude
    };
  }

  graphItems.push(localBusiness);

  // 4. BreadcrumbList Schema
  graphItems.push(
    generateBreadcrumbSchema(page.pageHeader.breadcrumbs || [], pageUrl)
  );

  return {
    "@context": "https://schema.org",
    "@graph": graphItems
  };
}

/**
 * Sanityzacja JSON-LD dla bezpieczeństwa (XSS prevention)
 */
export function sanitizeJsonLd(jsonLd: object): string {
  return JSON.stringify(jsonLd).replace(/</g, '\\u003c');
}
