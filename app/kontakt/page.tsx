import type { Metadata } from 'next';
import { Breadcrumbs } from '@/components/shared';
import { BentoContactSection, ContactInfo } from '@/components/sections';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Kontakt – CoreLTB Builders | Budowa Domów Śląsk',
  description:
    'Skontaktuj się z CoreLTB Builders. Zadzwoń +48 664 123 757 lub napisz biuro@coreltb.pl. Biura: Jaworzno (HQ) i Wodzisław Śląski.',
  alternates: {
    canonical: `${companyData.url}/kontakt`,
  },
};

export default function ContactPage() {
  const contactInfo: ContactInfo = {
    phone: '+48 664 123 757',
    email: 'biuro@coreltb.pl',
    address: 'ul. Grunwaldzka 34a, 43-600 Jaworzno',
  };

  return (
    <main>
      <Breadcrumbs
        items={[
          { label: 'Strona główna', href: '/' },
          { label: 'Kontakt' },
        ]}
        className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-2 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary">
          Kontakt
        </h1>
      </div>

      <BentoContactSection contactInfo={contactInfo} />
    </main>
  );
}
