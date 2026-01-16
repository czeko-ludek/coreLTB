import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getServiceV2BySlug, allServicesV2 } from '@/data/servicesV2';
import { PageHeader } from '@/components/shared'; // ✅ Centralized import
import {
  EmotionalHeroSection,
  PhilosophyTimelineSection,
  ServicesAccordionSection,
  AreasSection,
  TestimonialsSection,
  CooperationTimelineSection,
  CooperationTimelineSectionNoLine,
  ContactCTASection,
} from '@/components/sections'; // ✅ Centralized import
import { FloatingCTA } from '@/components/ui'; // ✅ Centralized import

// Generate static params for all services
export async function generateStaticParams() {
  return allServicesV2.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceV2BySlug(slug);

  if (!service) {
    return {
      title: 'Usługa nie znaleziona',
    };
  }

  return {
    title: service.metaTitle || `${service.title} | CoreLTB Builders`,
    description: service.metaDescription || service.emotionalHero.subtitle,
    openGraph: {
      title: service.title,
      description: service.emotionalHero.subtitle,
      images: [service.pageHeader.backgroundImage],
    },
  };
}

// Main Service Page Component V2
export default async function ServicePageV2({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceV2BySlug(slug);

  // Handle 404
  if (!service) {
    notFound();
  }

  return (
    <main>
      {/* PageHeader z breadcrumbs */}
      <PageHeader
        title={service.pageHeader.title}
        watermarkText={service.pageHeader.watermarkText}
        backgroundImage={service.pageHeader.backgroundImage}
        breadcrumbs={service.pageHeader.breadcrumbs}
      />

      {/* Sekcja 1: Dom to więcej niż budynek */}
      <EmotionalHeroSection {...service.emotionalHero} />

      {/* Sekcja 2: Nasza Filozofia */}
      <PhilosophyTimelineSection {...service.philosophyTimeline} />

      {/* Sekcja 3: Etapy Współpracy (Timeline) - USUNIĘTE (brzydki timeline z linią) */}
      {/* {service.cooperationTimeline && (
        <CooperationTimelineSection {...service.cooperationTimeline} />
      )} */}

      {/* Sekcja 3 (alternatywna): Timeline bez linii (dla Projektowanie) */}
      {service.cooperationTimelineNoLine && (
        <CooperationTimelineSectionNoLine {...service.cooperationTimelineNoLine} />
      )}

      {/* Sekcja 4: Logistyka i Zasięg (opcjonalna) - ZARAZ PO ARTYKULE */}
      {service.areasData && (
        <AreasSection {...service.areasData} />
      )}

      {/* Sekcja 5: Treść dla Zainteresowanych (FAQ/Accordion) */}
      {service.servicesAccordion && (
        <ServicesAccordionSection {...service.servicesAccordion} />
      )}

      {/* Sekcja 6: Opinie Klientów */}
      <TestimonialsSection {...service.testimonials} />

      {/* Sekcja 7: Wezwanie do Działania (Kontakt) */}
      <ContactCTASection {...service.contactCTA} />

      {/* Sticky FloatingCTA - pojawia się gdy użytkownik scrolluje poniżej EmotionalHeroSection */}
      <FloatingCTA
        text="Umów bezpłatną konsultację"
        href="/kontakt"
        hideWhenSectionVisible="emotional-hero"
      />
    </main>
  );
}
