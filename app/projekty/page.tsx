import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ProjectsListingSection } from '@/components/sections/ProjectsListingSection';
import { allProjects, toListingItem } from '@/data/projects';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: `Projekty Domów 2026 – Katalog ${allProjects.length}+ projektów | Wyceń budowę online`,
  description:
    `Katalog ${allProjects.length}+ gotowych projektów domów jednorodzinnych. Domy parterowe, pietrowe, z poddaszem – z kalkulatorem kosztow budowy. Filtruj wg powierzchni, kategorii i technologii. CoreLTB Builders.`,
  alternates: {
    canonical: `${companyData.url}/projekty`,
  },
  openGraph: {
    title: `Projekty Domow – Katalog ${allProjects.length}+ projektow z kalkulatorem budowy`,
    description:
      `Przegladaj ${allProjects.length}+ gotowych projektow domow jednorodzinnych. Filtruj wg technologii, kategorii i powierzchni. Wycen koszt budowy w 60 sekund.`,
    url: `${companyData.url}/projekty`,
    type: 'website',
  },
};

const breadcrumbs = [
  { label: 'Strona główna', href: '/' },
  { label: 'Projekty' },
];

const listingItems = allProjects.map(toListingItem);

// Group projects by category for SEO crawl section
const projectsByCategory = allProjects.reduce<Record<string, { slug: string; title: string; surfaceArea: string }[]>>(
  (acc, p) => {
    const cat = p.category || 'inne';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push({ slug: p.slug, title: p.title, surfaceArea: p.surfaceArea });
    return acc;
  },
  {}
);

const categoryLabels: Record<string, string> = {
  parterowy: 'Domy parterowe',
  'z-poddaszem': 'Domy z poddaszem',
  pietrowy: 'Domy pietrowe',
  dwulokalowy: 'Domy dwulokalowe',
  jednorodzinny: 'Domy jednorodzinne',
  inne: 'Pozostale projekty',
};

export default function ProjectsListingPage() {
  return (
    <main>
      <Suspense>
        <ProjectsListingSection
          breadcrumbs={breadcrumbs}
          title="Nasze"
          titleHighlight="Projekty"
          description="Przeglądaj katalog projektów domów jednorodzinnych. Filtruj według technologii, kategorii i powierzchni. Każdy projekt można dostosować do indywidualnych potrzeb."
          projects={listingItems}
        />
      </Suspense>

      {/* SSR crawl links — all project links rendered server-side for Google indexing */}
      <section className="container mx-auto px-4 md:px-6 py-12 border-t border-zinc-200">
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Wszystkie projekty domow ({allProjects.length})
        </h2>
        <p className="text-text-muted text-sm mb-8">
          Pelny katalog projektow domow jednorodzinnych — parterowe, pietrowe, z poddaszem. Kazdy projekt z kalkulatorem kosztow budowy.
        </p>
        {Object.entries(projectsByCategory).map(([category, projects]) => (
          <div key={category} className="mb-8">
            <h3 className="text-lg font-semibold text-text-primary mb-3">
              {categoryLabels[category] || category} ({projects.length})
            </h3>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5">
              {projects.map((p) => (
                <Link
                  key={p.slug}
                  href={`/projekty/${p.slug}`}
                  className="text-sm text-text-muted hover:text-primary transition-colors whitespace-nowrap"
                >
                  {p.title} ({p.surfaceArea})
                </Link>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
