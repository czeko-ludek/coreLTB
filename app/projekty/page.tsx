import type { Metadata } from 'next';
import { ProjectsListingSection } from '@/components/sections/ProjectsListingSection';
import { allProjects } from '@/data/projects';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Projekty Domów - Katalog | CoreLTB Builders',
  description:
    'Przeglądaj nasze projekty domów jednorodzinnych. Filtruj według technologii, kategorii i budżetu. Znajdź idealny projekt dla siebie.',
  openGraph: {
    title: 'Projekty Domów - Katalog | CoreLTB Builders',
    description:
      'Przeglądaj nasze projekty domów jednorodzinnych. Filtruj według technologii, kategorii i budżetu.',
    url: `${companyData.url}/projekty`,
    type: 'website',
  },
};

export default function ProjectsListingPage() {
  const breadcrumbs = [
    { label: 'Strona główna', href: '/' },
    { label: 'Projekty' },
  ];

  return (
    <main>
      <ProjectsListingSection
        breadcrumbs={breadcrumbs}
        title="Nasze"
        titleHighlight="Projekty"
        description="Przeglądaj katalog projektów domów jednorodzinnych. Filtruj według technologii, kategorii i budżetu. Każdy projekt można dostosować do indywidualnych potrzeb."
        projects={allProjects}
      />
    </main>
  );
}
