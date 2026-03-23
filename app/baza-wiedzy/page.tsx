import type { Metadata } from 'next';
import { BentoBlogSection } from '@/components/sections';
import { blogSectionData } from '@/data/blog-data';
import { companyData } from '@/data/company-data';

/**
 * Metadata SEO dla Bazy Wiedzy
 */
export const metadata: Metadata = {
  title: 'Baza Wiedzy - Porady i Przewodniki Budowlane | CoreLTB Builders',
  description: 'Dziennik budowy, porady ekspertów, realizacje i nowości z branży budowlanej. Dowiedz się więcej o budowie domów na terenach górniczych Śląska.',
  openGraph: {
    title: 'Baza Wiedzy - Porady i Przewodniki Budowlane | CoreLTB Builders',
    description: 'Dziennik budowy, porady ekspertów, realizacje i nowości z branży budowlanej.',
    url: `${companyData.url}/baza-wiedzy`,
    type: 'website',
  },
};

/**
 * Strona Bazy Wiedzy - /baza-wiedzy
 */
export default function BazaWiedzyPage() {
  return (
    <main>
      <BentoBlogSection {...blogSectionData} />
    </main>
  );
}
