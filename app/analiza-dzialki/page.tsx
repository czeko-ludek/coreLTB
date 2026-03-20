import type { Metadata } from 'next';
import { HideHeader } from '@/components/sections/calculator/HideHeader';
import { PlotAnalysisForm } from '@/components/sections/plot-analysis/PlotAnalysisForm';
import { LPTrustBar } from '@/components/sections/shared/LPTrustBar';
import { LPTestimonials } from '@/components/sections/shared/LPTestimonials';
import { LPSteps } from '@/components/sections/shared/LPSteps';
import { FAQTwoColumnsSection } from '@/components/sections/FAQTwoColumnsSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';
import { Icon } from '@/components/ui/Icon';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Analiza Działki Budowlanej — Grunt, MPZP, Uzbrojenie | CoreLTB Builders',
  description:
    'Zamów analizę działki budowlanej. Sprawdzimy warunki gruntowe, MPZP, uzbrojenie mediów i szkody górnicze. Bezpłatna przy umowie na budowę — Śląsk i Małopolska.',
  alternates: {
    canonical: `${companyData.url}/analiza-dzialki`,
  },
};

export default function AnalizaDzialkiPage() {
  return (
    <main>
      <HideHeader />
      <PlotAnalysisForm />

      <LPTrustBar />
      <LPTestimonials />

      {/* Co obejmuje analiza */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-h3 md:text-h2 font-bold font-heading text-text-primary">
              Co obejmuje analiza działki?
            </h2>
            <p className="mt-3 text-body-md text-text-secondary max-w-2xl mx-auto">
              Zanim wydasz pieniądze na budowę, sprawdzimy 6 kluczowych aspektów Twojej działki.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {([
              {
                icon: 'search' as const,
                title: 'Badanie gruntu',
                description: 'Weryfikacja warunków geologicznych — nośność, poziom wód gruntowych, rodzaj gruntu. Rekomendacja typu fundamentu.',
              },
              {
                icon: 'ruler' as const,
                title: 'Analiza MPZP',
                description: 'Sprawdzenie planu zagospodarowania lub warunków zabudowy — co możesz wybudować, jakie ograniczenia obowiązują.',
              },
              {
                icon: 'mountain' as const,
                title: 'Szkody górnicze',
                description: 'Kategoria terenu górniczego, wpływ eksploatacji na fundament. Szczególnie istotne na Śląsku (KWK, Kompania Węglowa).',
              },
              {
                icon: 'zap' as const,
                title: 'Uzbrojenie mediów',
                description: 'Sprawdzenie dostępności przyłączy: woda, kanalizacja, prąd, gaz. Odległość i koszt podłączenia.',
              },
              {
                icon: 'mapPin' as const,
                title: 'Dojazd i infrastruktura',
                description: 'Dojazd do działki, konieczność budowy drogi, bliskość szkół, sklepów, komunikacji.',
              },
              {
                icon: 'fileCheck' as const,
                title: 'Raport z rekomendacjami',
                description: 'Pisemny raport z oceną działki, rekomendacjami technicznymi i orientacyjnym wpływem na koszt budowy.',
              },
            ]).map((card) => (
              <div
                key={card.title}
                className="bg-background-light rounded-2xl p-6 border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                  <Icon name={card.icon} size="lg" className="text-primary" />
                </div>
                <h3 className="text-h5 font-bold text-text-primary mb-2">{card.title}</h3>
                <p className="text-body-sm text-text-secondary leading-relaxed">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ile to kosztuje */}
      <section className="py-16 md:py-20 bg-background-light">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-h3 md:text-h2 font-bold font-heading text-text-primary">
              Ile kosztuje analiza?
            </h2>
            <p className="mt-3 text-body-md text-text-secondary max-w-2xl mx-auto">
              Transparentne ceny bez ukrytych kosztów
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Main pricing card — highlighted */}
            <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-8 relative overflow-hidden">
              <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-5">
                <Icon name="checkCircle" size="xl" className="text-green-600" />
              </div>
              <h3 className="text-h4 font-bold text-text-primary mb-1">Przy umowie na budowę</h3>
              <p className="text-display font-bold text-green-700 mb-3">0 zł</p>
              <p className="text-body-sm text-text-secondary leading-relaxed mb-6">
                Analiza wliczona w koszt budowy — bezpłatna dla klientów, którzy podpiszą z nami umowę na realizację.
              </p>
              <ul className="space-y-2.5">
                {['Pełna analiza gruntu i MPZP', 'Wizja lokalna na działce', 'Raport z rekomendacjami', 'Konsultacja z inżynierem'].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-body-sm text-text-primary">
                    <Icon name="check" size="sm" className="text-green-600 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right column — stacked cards */}
            <div className="space-y-6">
              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="fileText" size="lg" className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h5 font-bold text-text-primary">Analiza samodzielna</h3>
                    <p className="text-h4 font-bold text-primary mt-1">2 500 – 4 000 zł <span className="text-body-sm font-normal text-text-muted">netto</span></p>
                    <p className="text-body-sm text-text-secondary mt-2 leading-relaxed">
                      Pełna analiza działki z raportem — dla klientów, którzy jeszcze nie zdecydowali się na budowę z nami.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon name="search" size="lg" className="text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-h5 font-bold text-text-primary">Badania geotechniczne</h3>
                    <p className="text-h4 font-bold text-primary mt-1">1 500 – 3 000 zł</p>
                    <p className="text-body-sm text-text-secondary mt-2 leading-relaxed">
                      Odwierty i badania laboratoryjne gruntu — wykonywane przez certyfikowane laboratorium partnerskie.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-background-dark rounded-2xl p-6 text-center">
                <p className="text-body-sm text-gray-300 mb-3">Nie wiesz, który wariant wybrać?</p>
                <a
                  href="tel:+48664123757"
                  className="inline-flex items-center gap-2 text-body-md font-bold text-primary hover:text-primary/80 transition-colors"
                >
                  <Icon name="phone" size="md" />
                  +48 664 123 757
                </a>
                <p className="text-body-xs text-gray-500 mt-1">Doradzimy bezpłatnie</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <LPSteps
        title="Jak wygląda proces?"
        subtitle="Od zgłoszenia do raportu w 5–7 dni roboczych"
        steps={[
          { number: '01', icon: 'mail', title: 'Wysyłasz lokalizację', time: 'Dzień 0', description: 'Wypełniasz formularz z adresem i danymi działki.' },
          { number: '02', icon: 'mapPin', title: 'Wizja lokalna', time: '1–2 dni', description: 'Inżynier odwiedza działkę, ocenia teren i robi dokumentację.' },
          { number: '03', icon: 'fileText', title: 'Analiza dokumentów', time: '3–5 dni', description: 'Weryfikujemy MPZP, kategorie górnicze, mapy uzbrojenia i KW.' },
          { number: '04', icon: 'fileCheck', title: 'Raport z rekomendacjami', time: '5–7 dni', description: 'Pisemny raport z oceną i wpływem na koszt budowy.' },
        ]}
      />

      <FAQTwoColumnsSection
        header={{
          label: 'FAQ',
          title: 'Pytania o analizę działki',
          description: 'Najczęściej zadawane pytania o badanie gruntu i analizę działki budowlanej',
        }}
        items={[
          {
            question: 'Czy analiza jest obowiązkowa przed budową?',
            content: [{ type: 'paragraph', value: 'Badania geotechniczne są wymagane prawnie przed rozpoczęciem budowy. Nasza analiza idzie dalej — sprawdzamy też MPZP, szkody górnicze i uzbrojenie. Dzięki temu unikasz kosztownych niespodzianek po rozpoczęciu prac.' }],
          },
          {
            question: 'Co jeśli działka nie nadaje się pod budowę?',
            content: [{ type: 'paragraph', value: 'Każdą działkę można zabudować — pytanie za jaką cenę. Nasza analiza wskazuje dokładnie, jakie dodatkowe prace będą potrzebne (np. wzmocniony fundament na terenie górniczym, drenaż na mokrym gruncie) i ile będą kosztować. Lepiej wiedzieć PRZED zakupem.' }],
          },
          {
            question: 'Ile trwa cały proces analizy?',
            content: [{ type: 'paragraph', value: 'Od zgłoszenia do raportu — zazwyczaj 5–7 dni roboczych. Wizja lokalna odbywa się w ciągu 1–2 dni od zgłoszenia. Sama analiza dokumentów trwa 3–5 dni.' }],
          },
          {
            question: 'Czy analizujecie działki poza Śląskiem?',
            content: [{ type: 'paragraph', value: 'Tak — obsługujemy całe województwo śląskie i małopolskie. Nasze bazy to Jaworzno (HQ) i Wodzisław Śląski, ale dojeżdżamy do klientów w promieniu ~100 km. Kraków, Chrzanów, Oświęcim — żaden problem.' }],
          },
        ]}
      />

      <ContactCTASection
        contactInfo={{
          phone: '+48 664 123 757',
          email: 'biuro@coreltb.pl',
        }}
      />
    </main>
  );
}
