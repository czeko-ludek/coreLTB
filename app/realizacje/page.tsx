import type { Metadata } from 'next';
import { companyData } from '@/data/company-data';
import { allRealizationListings } from '@/data/realizacje';
import { ContactCTASection } from '@/components/sections';
import { RealizacjeListingSection } from '@/components/sections/realizacje/RealizacjeListingSection';

export const metadata: Metadata = {
  title: 'Budowa domu krok po kroku - Realizacje ze zdjeciami | CoreLTB',
  description:
    'Budowa domu krok po kroku ze zdjeciami z kazdego etapu. Realizacje domow jednorodzinnych na Slasku - fundamenty, sciany, dach, instalacje. Eksperckie komentarze i technologie.',
  alternates: {
    canonical: `${companyData.url}/realizacje`,
  },
  openGraph: {
    title: 'Budowa domu krok po kroku - Realizacje ze zdjeciami | CoreLTB',
    description:
      'Budowa domu krok po kroku ze zdjeciami z kazdego etapu. Realizacje domow jednorodzinnych na Slasku z eksperckimi komentarzami.',
    url: `${companyData.url}/realizacje`,
    type: 'website',
  },
};

export default function RealizacjePage() {
  return (
    <>
      <RealizacjeListingSection items={allRealizationListings} />

      <ContactCTASection
        contactInfo={{
          phone: companyData.telephone,
          email: companyData.email,
        }}
      />
    </>
  );
}
