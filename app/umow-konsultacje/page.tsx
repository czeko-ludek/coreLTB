import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HideHeader } from '@/components/sections/calculator/HideHeader';
import { ConsultationForm } from '@/components/sections/consultation/ConsultationForm';
import { LPTrustBar } from '@/components/sections/shared/LPTrustBar';
import { LPTestimonials } from '@/components/sections/shared/LPTestimonials';
import { LPSteps } from '@/components/sections/shared/LPSteps';
import { FAQTwoColumnsSection } from '@/components/sections/FAQTwoColumnsSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';
import { Icon } from '@/components/ui/Icon';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Umów Bezpłatną Konsultację Budowlaną | CoreLTB Builders',
  description:
    'Porozmawiaj z inżynierem o budowie domu, projekcie lub nadzorze inwestorskim. Odpowiadamy w 24h. Bez zobowiązań — Śląsk i Małopolska.',
  alternates: {
    canonical: `${companyData.url}/umow-konsultacje`,
  },
};

export default function UmowKonsultacjePage() {
  return (
    <main>
      <HideHeader />
      <Suspense fallback={null}>
        <ConsultationForm />
      </Suspense>

      <LPTrustBar />
      <LPTestimonials />

      {/* Why consult with an engineer */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-h3 md:text-h2 font-bold font-heading text-text-primary">
              Dlaczego konsultacja z&nbsp;inżynierem?
            </h2>
            <p className="mt-3 text-body-md text-text-secondary max-w-2xl mx-auto">
              U nas nie rozmawiasz z handlowcem, który obiecuje nierealne terminy. Rozmawiasz z osobą, która będzie koordynować Twoją budowę.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {([
              {
                title: 'Konkretne odpowiedzi',
                description: 'Nie „zobaczymy" — dostaniesz konkretne informacje o kosztach, terminach i technologii dopasowanej do Twojej działki.',
                icon: 'fileCheck' as const,
              },
              {
                title: 'Bez niespodzianek',
                description: 'Omówimy wszystkie koszty, które mogą się pojawić. Żadnych ukrytych dopłat po podpisaniu umowy.',
                icon: 'shieldCheck' as const,
              },
              {
                title: 'Oszczędność czasu',
                description: 'Jedna rozmowa zamiast kilkunastu telefonów do różnych ekip. Koordynujemy cały proces za Ciebie.',
                icon: 'clock' as const,
              },
            ]).map((card) => (
              <div
                key={card.title}
                className="bg-background-light rounded-2xl p-6 md:p-8 border border-gray-100"
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

      <LPSteps
        title="Od zapytania do budowy w"
        highlight="3 krokach"
        steps={[
          {
            number: '01',
            icon: 'mail',
            title: 'Wysyłasz zapytanie',
            description: 'Wypełniasz formularz z opisem projektu. Zajmuje to 2 minuty.',
          },
          {
            number: '02',
            icon: 'phone',
            title: 'Oddzwonimy w 24h',
            description: 'Nasz inżynier zapozna się z zapytaniem i zadzwoni z konkretnymi odpowiedziami.',
          },
          {
            number: '03',
            icon: 'users',
            title: 'Umawiamy spotkanie',
            description: 'Wizja lokalna na działce lub spotkanie w biurze — omawiamy szczegóły i wycenę.',
          },
        ]}
      />

      <FAQTwoColumnsSection
        header={{
          label: 'FAQ',
          title: 'Najczęściej zadawane pytania',
          description: 'Wszystko o konsultacji i współpracy z CoreLTB Builders',
        }}
        items={[
          {
            question: 'Czy konsultacja jest bezpłatna?',
            content: [{ type: 'paragraph', value: 'Tak — pierwsza konsultacja telefoniczna lub w biurze jest całkowicie bezpłatna i niezobowiązująca. To spotkanie zapoznawcze, na którym omawiamy Twoje potrzeby i możliwości.' }],
          },
          {
            question: 'Jak szybko oddzwonicie?',
            content: [{ type: 'paragraph', value: 'Kontaktujemy się w ciągu 24 godzin w dni robocze (Pn–Pt 8:00–17:00, Sb 9:00–14:00). W pilnych sprawach możesz zadzwonić bezpośrednio: +48 664 123 757.' }],
          },
          {
            question: 'Z kim będę rozmawiać?',
            content: [{ type: 'paragraph', value: 'Z inżynierem budowlanym — osobą, która faktycznie koordynuje budowy. Nie z call center ani z handlowcem. Dzięki temu od razu dostaniesz merytoryczne odpowiedzi na pytania techniczne.' }],
          },
          {
            question: 'Jaki jest zasięg Waszych usług?',
            content: [{ type: 'paragraph', value: 'Działamy na terenie województwa śląskiego i małopolskiego. Nasze bazy operacyjne to Jaworzno (HQ) i Wodzisław Śląski. Obsługujemy m.in. Katowice, Rybnik, Gliwice, Tychy, Zabrze, Żory, Jastrzębie-Zdrój, Kraków i okolice.' }],
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
