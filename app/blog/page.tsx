import type { Metadata } from 'next';
import { BentoBlogSection } from '@/components/sections';
import { blogSectionData } from '@/data/blog-data';
import { companyData } from '@/data/company-data';

/**
 * Metadata SEO dla strony bloga
 */
export const metadata: Metadata = {
  title: 'Blog Budowlany - Wiedza i Porady | CoreLTB Builders',
  description: 'Dziennik budowy, porady ekspertów, realizacje i nowości z branży budowlanej. Dowiedz się więcej o budowie domów na terenach górniczych Śląska.',
  openGraph: {
    title: 'Blog Budowlany - Wiedza i Porady | CoreLTB Builders',
    description: 'Dziennik budowy, porady ekspertów, realizacje i nowości z branży budowlanej.',
    url: `${companyData.url}/blog`,
    type: 'website',
  },
};

/**
 * Strona Bloga - /blog
 */
export default function BlogPage() {
  return (
    <main>
      {/* Bento Blog Section - pełna strona bez hero */}
      <BentoBlogSection {...blogSectionData} />
    </main>
  );
}
