import type { Metadata } from 'next';
import { ProjectsListingSection } from '@/components/sections/ProjectsListingSection';
import {
  allProjects,
  toListingItem,
  type ProjectFilters,
  type SortOption,
} from '@/data/projects';
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

// Next.js 15: searchParams is a Promise
interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

/** Parsuje wartość query param (string | string[] | undefined) → string[] */
function parseList(value: string | string[] | undefined): string[] {
  if (!value) return [];
  const str = Array.isArray(value) ? value[0] : value;
  return str.split(',').filter(Boolean);
}

export default async function ProjectsListingPage({ searchParams }: PageProps) {
  const params = await searchParams;

  // Parsuj filtry z URL po stronie serwera — zero kosztu na kliencie
  const initialFilters: ProjectFilters = {
    technology: parseList(params.technology) as ProjectFilters['technology'],
    category:   parseList(params.category)   as ProjectFilters['category'],
    surfaceRange: (params.surface as string) || null,
    source: parseList(params.source) as ProjectFilters['source'],
  };

  const initialSort  = ((params.sort as string) || 'newest') as SortOption;
  const initialPage  = Math.max(1, parseInt((params.page as string) || '1', 10));

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
        description="Przeglądaj katalog projektów domów jednorodzinnych. Filtruj według technologii, kategorii i powierzchni. Każdy projekt można dostosować do indywidualnych potrzeb."
        projects={allProjects.map(toListingItem)}
        initialFilters={initialFilters}
        initialSort={initialSort}
        initialPage={initialPage}
      />
    </main>
  );
}
