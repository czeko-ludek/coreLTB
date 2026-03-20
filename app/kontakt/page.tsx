import type { Metadata } from 'next';
import Link from 'next/link';
import { Breadcrumbs } from '@/components/shared';
import { BentoContactSection, ContactInfo } from '@/components/sections';
import { companyData } from '@/data/company-data';
import { ContactRoutingCards } from '@/components/sections/contact/ContactRoutingCards';

export const metadata: Metadata = {
  title: 'Kontakt — CoreLTB Builders | Budowa Domów Śląsk',
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

      {/* Routing cards — kieruj na właściwy LP */}
      <ContactRoutingCards />

      <BentoContactSection contactInfo={contactInfo} />
    </main>
  );
}
