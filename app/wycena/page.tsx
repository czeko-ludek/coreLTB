import type { Metadata } from 'next';
import { Suspense } from 'react';
import { HideHeader } from '@/components/sections/calculator/HideHeader';
import { CalculatorForm } from '@/components/sections/calculator/CalculatorForm';
import { CalculatorTrustBar } from '@/components/sections/calculator/CalculatorTrustBar';
import { CalculatorTestimonials } from '@/components/sections/calculator/CalculatorTestimonials';
import { CalculatorSteps } from '@/components/sections/calculator/CalculatorSteps';
import { FAQTwoColumnsSection } from '@/components/sections/FAQTwoColumnsSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Bezpłatna Wycena Budowy Domu — Kalkulator Online | CoreLTB Builders',
  description:
    'Skonfiguruj parametry domu i otrzymaj wstępną wycenę budowy. Powierzchnia, materiał, dach, kondygnacje — wyceń w 60 sekund. Oddzwonimy z dokładną kalkulacją.',
  alternates: {
    canonical: `${companyData.url}/wycena`,
  },
};

export default function WycenaPage() {
  return (
    <main>
      <HideHeader />
      <Suspense>
        <CalculatorForm />
      </Suspense>
      <CalculatorTrustBar />
      <CalculatorTestimonials />
      <CalculatorSteps />
      <FAQTwoColumnsSection
        header={{
          label: 'FAQ',
          title: 'Najczęściej zadawane pytania',
          description: 'Wszystko, co musisz wiedzieć o wycenie i budowie domu',
        }}
        items={[
          {
            question: 'Czy wycena jest zobowiązująca?',
            content: [{ type: 'paragraph', value: 'Nie — wycena jest całkowicie bezpłatna i niezobowiązująca. To wstępna kalkulacja, która pomoże Ci zaplanować budżet. Dokładną wycenę przygotowujemy po analizie projektu i warunków gruntowych.' }],
          },
          {
            question: 'Jak długo trwa budowa domu?',
            content: [{ type: 'paragraph', value: 'Czas realizacji zależy od metrażu i standardu wykończenia. Dom parterowy 120 m² w stanie deweloperskim budujemy w 10–12 miesięcy. Dom piętrowy 180 m² pod klucz — 12–16 miesięcy. Dokładny harmonogram podajemy w umowie.' }],
          },
          {
            question: 'Co zawiera cena budowy?',
            content: [
              { type: 'paragraph', value: 'Cena obejmuje materiały, robociznę, nadzór kierownika budowy i koordynację podwykonawców. Nie zawiera:' },
              { type: 'list', items: ['Projektu architektonicznego', 'Przyłączy mediów', 'Opłat administracyjnych (pozwolenie na budowę)'] },
              { type: 'paragraph', value: 'Wszystko omawiamy transparentnie przed podpisaniem umowy.' },
            ],
          },
          {
            question: 'Czy cena może się zmienić po podpisaniu umowy?',
            content: [{ type: 'paragraph', value: 'Nie. Podpisujemy umowę ryczałtową ze stałą ceną. Jedyne co może zmienić cenę to Twoja decyzja o zmianie zakresu prac (np. dodanie garażu, zmiana materiałów). Każda taka zmiana wymaga pisemnego aneksu z nową wyceną.' }],
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
