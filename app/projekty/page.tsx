import { Suspense } from 'react';
import type { Metadata } from 'next';
import { ProjectsListingSection } from '@/components/sections/ProjectsListingSection';
import { allProjects, toListingItem } from '@/data/projects';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Projekty Domów - Katalog | CoreLTB Builders',
  description:
    'Przeglądaj nasze projekty domów jednorodzinnych. Filtruj według technologii, kategorii i powierzchni. Znajdź idealny projekt dla siebie.',
  openGraph: {
    title: 'Projekty Domów - Katalog | CoreLTB Builders',
    description:
      'Przeglądaj nasze projekty domów jednorodzinnych. Filtruj według technologii, kategorii i powierzchni.',
    url: `${companyData.url}/projekty`,
    type: 'website',
  },
};

const breadcrumbs = [
  { label: 'Strona główna', href: '/' },
  { label: 'Projekty' },
];

const listingItems = allProjects.map(toListingItem);

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
    </main>
  );
}
