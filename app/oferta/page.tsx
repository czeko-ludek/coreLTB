import React from 'react';
import { PageHeader, ServiceCardSimple, SectionHeader } from '@/components/shared';
import { PhilosophyTimelineSection } from '@/components/sections/PhilosophyTimelineSection';
import { CtaSection } from '@/components/sections/CtaSection';
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
      {/* 1. Page Header - Hero z obrazem */}
      <PageHeader
        title="Nasza Oferta"
        watermarkText="OFERTA"
        backgroundImage="/images/uslugi.webp"
        breadcrumbs={[
          { label: 'Strona Główna', href: '/' },
          { label: 'Nasza Oferta', href: '/oferta' }
        ]}
      />

      {/* 2. SectionHeader - Krótki intro (40 słów, 5-8 sekund czytania) */}
      <section className="py-12 px-4 bg-background">
        <div className="container mx-auto max-w-4xl">
          <SectionHeader
            label="KOMPLEKSOWE USŁUGI BUDOWLANE"
            title="Wszystko Czego Potrzebujesz Do Budowy Domu – W Jednym Miejscu"
            description="Od projektu przez budowę po odbiór – wszystkie etapy pod jednym dachem. Wybierz usługę, która odpowiada Twojemu etapowi inwestycji."
            align="center"
            theme="light"
          />
        </div>
      </section>

      {/* 3. GRID USŁUG - Najważniejsze! User chce zobaczyć opcje NATYCHMIAST */}
      <section className="py-16 px-4 bg-background">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {offerData.map((item) => (
              <ServiceCardSimple key={item.title} {...item} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. PhilosophyTimeline - Trust building (dla users którzy scrollują dalej) */}
      <PhilosophyTimelineSection
        header={{
          label: 'DLACZEGO JEDEN PARTNER?',
          title: 'Jeden Telefon Zamiast Dziesięciu Podwykonawców',
          description: 'Koordynacja wielu firm to największy stres w budownictwie. My bierzemy to na siebie – oszczędzając Twój czas, pieniądze i nerwy.',
          theme: 'light',
        }}
        items={[
          {
            number: 1,
            iconName: 'shield',
            title: 'Jedna Umowa = Jedna Odpowiedzialność',
            description:
              'Nie musisz koordynować 10 różnych firm. Nie musisz rozstrzygać sporów między architektem, wykonawcą i geodetą. My odpowiadamy za wszystko – od pierwszej linii projektu po odbiór końcowy. Jeśli coś pójdzie nie tak, nie szukasz winnego – dzwonisz do nas.',
          },
          {
            number: 2,
            iconName: 'trendingUp',
            title: 'Lepsza Cena Niż 6 Osobnych Umów',
            description:
              'Gdy kupujesz usługi osobno, każda firma ma swoją marżę. Gdy kupujesz pakiet, eliminujesz wielokrotne marże i koszty koordynacji. Typowa oszczędność: 15-20% całkowitego budżetu budowy. To często oznacza różnicę między „musimy zrezygnować z tarasu" a „mieścimy się w budżecie z zapasem".',
          },
          {
            number: 3,
            iconName: 'clock',
            title: 'Szybsza Realizacja (Brak Przestojów)',
            description:
              '500+ zrealizowanych projektów nauczyło nas, że największe opóźnienia powstają na styku różnych firm. „Geodeta nie przyszedł, więc wykonawca czeka." „Architekt nie odpowiada, więc projekt stoi." Nasz zespół działa jak orkiestra – każdy wie kiedy wchodzi, nikt nie czeka na drugiego.',
          },
        ]}
        image={{
          src: '/images/uslugi.webp',
          alt: 'Zespół CoreLTB Builders podczas spotkania projektowego',
        }}
      />

      {/* 5. CTA Section - Final push dla undecided users */}
      <CtaSection
        title="Nie Wiesz Od Czego Zacząć?"
        email="coreltb@gmail.com"
        primaryButton={{
          text: 'Umów konsultację',
          href: '/kontakt',
        }}
        socials={[
          { platform: 'facebook' as const, href: 'https://facebook.com' },
          { platform: 'instagram' as const, href: 'https://instagram.com' },
          { platform: 'linkedin' as const, href: 'https://linkedin.com' },
          { platform: 'youtube' as const, href: 'https://youtube.com' },
        ]}
      />
    </main>
  );
}
