import { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { clsx } from 'clsx';

import { InteractiveMapSection } from '@/components/sections/InteractiveMapSection';
import { CtaSection } from '@/components/sections/CtaSection';
import { SectionHeader, AnimatedSection } from '@/components/shared';
import { Icon } from '@/components/ui';

import { companyData } from '@/data/company-data';
import { getCitiesWithPages, getMapStats, mapVoivodeships } from '@/data/map-data';

// =============================================================================
// METADATA
// =============================================================================

export const metadata: Metadata = {
  title: 'Obszar Działania - Budowa Domów Śląsk, Małopolska i Opolskie | CoreLTB Builders',
  description:
    'Budujemy domy jednorodzinne na terenie województw śląskiego, małopolskiego i opolskiego. Sprawdź, czy działamy w Twoim mieście. Rybnik, Katowice, Tychy, Jaworzno, Wodzisław Śląski i okolice.',
  openGraph: {
    title: 'Obszar Działania | CoreLTB Builders',
    description:
      'Budujemy domy w województwach śląskim, małopolskim i opolskim. Sprawdź nasze lokalizacje.',
    url: `${companyData.url}/obszar-dzialania`,
    type: 'website',
  },
};

// =============================================================================
// SCHEMA.ORG
// =============================================================================

function generatePageSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      // LocalBusiness
      {
        '@type': 'LocalBusiness',
        '@id': `${companyData.url}/#organization`,
        name: companyData.name,
        description: companyData.description,
        url: companyData.url,
        telephone: companyData.telephone,
        email: companyData.email,
        areaServed: mapVoivodeships.flatMap((v) =>
          v.cities.map((c) => ({
            '@type': 'City',
            name: c.name,
          }))
        ),
      },
      // BreadcrumbList
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Strona główna',
            item: companyData.url,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Obszar Działania',
            item: `${companyData.url}/obszar-dzialania`,
          },
        ],
      },
    ],
  };
}

// =============================================================================
// PAGE COMPONENT
// =============================================================================

export default function ObszarDzialaniaPage() {
  const citiesWithPages = getCitiesWithPages();
  const stats = getMapStats();
  const schema = generatePageSchema();

  return (
    <main className="min-h-screen">
      {/* ================================================================
          SECTION 1: INTERACTIVE MAP (Desktop Only)
          ================================================================ */}
      <InteractiveMapSection
        header={{
          label: 'OBSZAR DZIAŁANIA',
          title: 'Gdzie budujemy domy?',
          description:
            'Działamy na terenie trzech województw południowej Polski. Kliknij na mapę, aby zobaczyć szczegóły.',
        }}
      />

      {/* ================================================================
          SECTION 2: CITY LIST (All Devices - Mobile Hero)
          ================================================================ */}
      <AnimatedSection className="bg-white rounded-3xl py-12 sm:py-16 mx-4 md:mx-[50px] mt-5" delay={0.1}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <SectionHeader
            label="NASZE LOKALIZACJE"
            title="Miasta, w których budujemy"
            description={`Posiadamy dedykowane strony dla ${stats.citiesWithPages} miast. Kliknij, aby poznać szczegóły naszych usług w Twojej okolicy.`}
            align="center"
            theme="light"
          />

          {/* Cities Grid */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {citiesWithPages.map((city) => (
              <Link
                key={city.id}
                href={`/obszar-dzialania/${city.slug}`}
                className={clsx(
                  'group flex items-center gap-3 p-4',
                  'bg-gray-50 rounded-2xl border border-gray-100',
                  'hover:bg-primary hover:border-primary',
                  'transition-all duration-300'
                )}
              >
                <Icon
                  name="mapPin"
                  size="sm"
                  className="text-primary group-hover:text-white transition-colors"
                />
                <span className="font-semibold text-[#1a1a1a] group-hover:text-white transition-colors">
                  {city.name}
                </span>
              </Link>
            ))}
          </div>

          {/* Coming Soon Note */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Wkrótce dodamy strony dla kolejnych {stats.citiesComingSoon} miast z naszego
            obszaru działania.
          </p>
        </div>
      </AnimatedSection>

      {/* ================================================================
          SECTION 3: VOIVODESHIPS INFO (All Devices)
          ================================================================ */}
      <AnimatedSection className="bg-white rounded-3xl py-12 sm:py-16 mx-4 md:mx-[50px] mt-5" delay={0.1}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="ZASIĘG OPERACYJNY"
            title="Trzy województwa, jeden standard jakości"
            align="center"
            theme="light"
          />

          {/* Voivodeships Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {mapVoivodeships.map((voiv) => (
              <div
                key={voiv.id}
                className={clsx(
                  'p-6 rounded-2xl border border-gray-100',
                  'bg-gradient-to-br from-gray-50 to-white',
                  'shadow-[0_0_15px_rgba(0,0,0,0.03)]'
                )}
              >
                {/* Voivodeship Name */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon name="mapPin" size="sm" className="text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a1a1a]">
                    Województwo {voiv.name}
                  </h3>
                </div>

                {/* Cities List */}
                <div className="flex flex-wrap gap-2">
                  {voiv.cities.map((city) => (
                    <span
                      key={city.id}
                      className={clsx(
                        'text-xs px-3 py-1 rounded-full',
                        city.hasPage
                          ? 'bg-primary/10 text-primary font-semibold'
                          : 'bg-gray-100 text-gray-500'
                      )}
                    >
                      {city.name}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <p className="mt-4 text-sm text-gray-500">
                  {voiv.cities.filter((c) => c.hasPage).length} z {voiv.cities.length}{' '}
                  miast z dedykowaną stroną
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* ================================================================
          SECTION 4: LOGISTICS INFO
          ================================================================ */}
      <AnimatedSection className="bg-white rounded-3xl py-12 sm:py-16 mx-4 md:mx-[50px] mt-5" delay={0.1}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="LOGISTYKA I ZAPLECZE"
            title="Dlaczego region ma znaczenie?"
            align="center"
            theme="light"
          />

          {/* Benefits Grid */}
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Benefit 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="building" size="md" className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Własne Zaplecze Sprzętowe</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Posiadamy własne szalunki systemowe i transport HDS. Gdy potrzebujemy
                  przewieźć sprzęt z Wodzisławia do Gliwic, robimy to z dnia na dzień, bez
                  przestojów w harmonogramie.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="users" size="md" className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Lokalne Partnerstwa</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Mamy podpisane stałe umowy z największymi sieciami betoniarni i hurtowni
                  na Południu. Ty zyskujesz ceny &quot;dużego gracza&quot;, a towar dociera na czas.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="shieldCheck" size="md" className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Znajomość Terenu</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Znamy specyfikę regionu – szkody górnicze, warunki gruntowe, lokalne
                  urzędy. To doświadczenie przekłada się na sprawniejszy przebieg budowy.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="clock" size="md" className="text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#1a1a1a] mb-2">Szybka Reakcja</h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  Dojazd z naszej siedziby do każdego miasta w obszarze działania zajmuje
                  maksymalnie godzinę. W razie pilnej potrzeby jesteśmy na miejscu tego
                  samego dnia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* ================================================================
          SECTION 5: CTA
          ================================================================ */}
      <AnimatedSection as="div" className="mx-4 md:mx-[50px] mt-5 mb-5" delay={0.1}>
        <CtaSection
          title="Twoja działka znajduje się w naszym zasięgu logistycznym?"
          email={companyData.email}
          primaryButton={{
            text: 'Umów bezpłatną konsultację',
            href: '/kontakt',
          }}
          socials={[
            { platform: 'facebook', href: 'https://facebook.com/coreltb' },
            { platform: 'instagram', href: 'https://instagram.com/coreltb' },
            { platform: 'linkedin', href: 'https://linkedin.com/company/coreltb' },
          ]}
        />
      </AnimatedSection>

      {/* Schema.org JSON-LD */}
      <Script
        id="schema-obszar-dzialania"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, '\\u003c'),
        }}
      />
    </main>
  );
}
