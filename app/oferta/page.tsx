import React from 'react';
import { PageHeader, ServiceCardSimple } from '@/components/shared'; // ✅ Centralized import from index.ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Nasza Oferta - CoreLTB Builders',
  description: 'Poznaj pełną ofertę usług CoreLTB Builders: budowa domów, projektowanie, nadzór budowlany, usługi techniczne i wykończenia wnętrz.',
};

export default function OfferPage() {
  const offerData = [
    {
      image: 'https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800',
      title: 'Kompleksowa Budowa Domów',
      description: 'Kompleksowa realizacja domów jednorodzinnych pod klucz, od projektu aż po finalne wykończenie.',
      features: ['Indywidualne projekty architektoniczne', 'Gwarancja jakości i terminowości'],
      href: '/oferta/kompleksowa-budowa-domow',
    },
    {
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800',
      title: 'Projektowanie',
      description: 'Tworzymy nowoczesne i funkcjonalne projekty budowlane oraz aranżacje wnętrz dopasowane do Twoich potrzeb.',
      features: ['Wizualizacje 3D', 'Pełna dokumentacja techniczna'],
      href: '/oferta/projektowanie',
    },
    {
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800',
      title: 'Nadzór i Doradztwo',
      description: 'Profesjonalny nadzór inwestorski i doradztwo techniczne na każdym etapie realizacji Twojej inwestycji.',
      features: ['Kontrola budżetu i harmonogramu', 'Odbiory techniczne'],
      href: '/oferta/nadzor-i-doradztwo',
    },
    {
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800',
      title: 'Usługi Techniczne',
      description: 'Badania gruntu, pomiary geodezyjne i profesjonalne kosztorysy. Twarde dane, które chronią Twoją inwestycję.',
      features: ['Badania geologiczne i geotechniczne', 'Pomiary geodezyjne i kosztorysy'],
      href: '/oferta/uslugi-techniczne',
    },
    {
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800',
      title: 'Wykończenia i Aranżacje',
      description: 'Precyzyjne prace wykończeniowe i stylowe aranżacje wnętrz, które nadadzą Twojemu domowi unikalny charakter.',
      features: ['Najwyższej jakości materiały', 'Dbałość o każdy detal'],
      href: '/oferta/wykonczenia-i-aranzacje',
    },
    {
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      title: 'Zagospodarowanie Terenu',
      description: 'Przekształcamy przestrzeń wokół budynków w funkcjonalne i estetyczne otoczenie, realizując ogrody, drogi i ogrodzenia.',
      features: ['Projektowanie ogrodów i otoczenia', 'Budowa dróg dojazdowych i ogrodzeń'],
      href: '/oferta/zagospodarowanie-terenu',
    },
  ];

  return (
    <main>
      {/* Page Header */}
      <PageHeader
        title="Nasza Oferta"
        watermarkText="OFERTA"
        backgroundImage="/images/uslugi.webp"
        breadcrumbs={[
          { label: 'Strona Główna', href: '/' },
          { label: 'Nasza Oferta', href: '/oferta' }
        ]}
      />

      {/* Services Grid */}
      <section className="py-20 px-4 lg:px-[50px] section-pattern">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerData.map((item) => (
              <ServiceCardSimple key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
