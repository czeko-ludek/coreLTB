import type { Metadata } from 'next';
import { partners, PARTNER_CATEGORY_LABELS, allPartnerLogos } from '@/data/partners';
import { Breadcrumbs } from '@/components/shared';
import { PartnerLogosMarquee } from '@/components/sections/local/PartnerLogosMarquee';
import { PartnersGridSection } from '@/components/sections/partners/PartnersGridSection';
import { WhyPartnerSection } from '@/components/sections/partners/WhyPartnerSection';

export const metadata: Metadata = {
  title: 'Nasi Partnerzy – Firmy, z którymi budujemy | CoreLTB Builders',
  description:
    'Poznaj zaufanych partnerów CoreLTB Builders: dostawców materiałów budowlanych, biura nieruchomości, biura projektowe i firmy OZE na Śląsku i w Małopolsce.',
  alternates: { canonical: 'https://coreltb.pl/partnerzy' },
  openGraph: {
    title: 'Nasi Partnerzy | CoreLTB Builders',
    description:
      'Współpracujemy z najlepszymi firmami na Śląsku: Sewera, LUBAR, Aslandi, Dream Space, XAL Projekt i biurami nieruchomości.',
  },
};

// Build category list from actual data
const categories = Array.from(new Set(partners.map((p) => p.category))).map(
  (cat) => ({
    value: cat,
    label: PARTNER_CATEGORY_LABELS[cat],
    count: partners.filter((p) => p.category === cat).length,
  })
);

export default function PartnersPage() {
  return (
    <main>
      <Breadcrumbs
        items={[
          { label: 'Strona główna', href: '/' },
          { label: 'Partnerzy' },
        ]}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      />

      <PartnerLogosMarquee
        label="Współpracujemy z najlepszymi"
        logos={allPartnerLogos}
      />

      <PartnersGridSection
        partners={partners}
        categories={categories}
      />

      <WhyPartnerSection />
    </main>
  );
}
