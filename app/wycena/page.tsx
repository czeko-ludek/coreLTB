import type { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { HideHeader } from '@/components/sections/calculator/HideHeader';
import { CalculatorForm } from '@/components/sections/calculator/CalculatorForm';
import { CalculatorTrustBar } from '@/components/sections/calculator/CalculatorTrustBar';
import { CalculatorTestimonials } from '@/components/sections/calculator/CalculatorTestimonials';
import { CalculatorSteps } from '@/components/sections/calculator/CalculatorSteps';
import { FAQTwoColumnsSection } from '@/components/sections/FAQTwoColumnsSection';
import { ContactCTASection } from '@/components/sections/ContactCTASection';
import { companyData } from '@/data/company-data';

export const metadata: Metadata = {
  title: 'Kalkulator Budowy Domu 2026 – Wycena Online za Darmo | CoreLTB',
  description:
    'Kalkulator budowy domu 2026: oblicz koszt budowy w 60 sekund. Wybierz metraż, technologię, dach i ogrzewanie — otrzymaj wycenę z podziałem na etapy. Aktualne ceny na Śląsku.',
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
      {/* SEO Content Section */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <h2 className="text-2xl md:text-3xl font-bold font-heading mb-6 text-center">
            Kalkulator budowy domu 2026 — <span className="text-primary">jak działa?</span>
          </h2>
          <div className="prose prose-zinc max-w-none text-base leading-relaxed space-y-4">
            <p>
              Nasz <strong>kalkulator budowy domu</strong> oblicza koszt budowy na podstawie 9 parametrów: powierzchni użytkowej, liczby kondygnacji, technologii ściennej, typu dachu, rodzaju fundamentu, garażu, ogrzewania, piwnicy i standardu wykończenia. Stawki są aktualne na <strong>kwiecień 2026 r.</strong> i oparte na realnych kosztach z naszych budów na Śląsku.
            </p>
            <p>
              Wycena uwzględnia <strong>materiały, robociznę i nadzór inżynierski</strong> na każdym z 5 etapów: stan zero (fundamenty), stan surowy otwarty (SSO), stan surowy zamknięty (SSZ), stan deweloperski i wykończenie pod klucz. Szczegółowy opis etapów znajdziesz w artykule{' '}
              <Link href="/baza-wiedzy/kosztorys-budowy-domu-2026" className="text-primary hover:underline font-medium">
                Kosztorys budowy domu 2026 — aktualny cennik
              </Link>.
            </p>
            <h3 className="text-lg font-semibold mt-6">Ile kosztuje budowa domu w 2026?</h3>
            <p>
              Koszt budowy domu pod klucz na Śląsku wynosi <strong>4 640–6 200 zł netto za m²</strong> (5 011–6 696 zł brutto z 8% VAT) w zależności od konfiguracji. Nasz standard (silikat, dach płaski, płyta, gaz): <strong>5 240 zł/m² netto</strong>. Dom 100 m² to 565 920 zł brutto, dom 120 m² — 679 104 zł brutto. Sam{' '}
              <Link href="/baza-wiedzy/stan-surowy-otwarty-poradnik" className="text-primary hover:underline font-medium">
                stan surowy otwarty
              </Link>{' '}
              to 3 000–4 000 zł/m².
            </p>
            <h3 className="text-lg font-semibold mt-6">Dlaczego warto użyć kalkulatora?</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Konkretne kwoty</strong> — nie &quot;od ... do&quot;, lecz wycena dopasowana do Twojej konfiguracji</li>
              <li><strong>Podział na etapy</strong> — wiesz, ile kosztuje każdy etap budowy z osobna</li>
              <li><strong>Aktualne ceny</strong> — stawki z realizacji CoreLTB, nie ze starych katalogów</li>
              <li><strong>Bezpłatnie i bez zobowiązań</strong> — nie musisz podawać danych, żeby zobaczyć wycenę</li>
            </ul>
            <p className="text-sm text-zinc-500 mt-4">
              Po konfiguracji możesz zostawić dane kontaktowe — nasz inżynier oddzwoni w 24h z dokładną kalkulacją uwzględniającą specyfikę Twojej działki i regionu. Budujemy na terenie całego{' '}
              <Link href="/obszar-dzialania/rybnik" className="text-primary hover:underline">Śląska</Link>
              {' '}— od{' '}
              <Link href="/obszar-dzialania/katowice" className="text-primary hover:underline">Katowic</Link>
              {' '}po{' '}
              <Link href="/obszar-dzialania/wodzislaw-slaski" className="text-primary hover:underline">Wodzisław Śl.</Link>
            </p>
          </div>
        </div>
      </section>
      <FAQTwoColumnsSection
        header={{
          label: 'FAQ',
          title: 'Najczęściej zadawane pytania',
          description: 'Wszystko, co musisz wiedzieć o wycenie i budowie domu',
        }}
        items={[
          {
            question: 'Czy wycena z kalkulatora jest zobowiązująca?',
            content: [{ type: 'paragraph', value: 'Nie — wycena jest całkowicie bezpłatna i niezobowiązująca. To wstępna kalkulacja, która pomoże Ci zaplanować budżet. Dokładną wycenę przygotowujemy po analizie projektu i warunków gruntowych na Twojej działce.' }],
          },
          {
            question: 'Ile kosztuje budowa domu 100 m² w 2026 roku?',
            content: [{ type: 'paragraph', value: 'Dom 100 m² parterowy pod klucz (silikat, dach płaski, płyta, gaz, bez garażu) kosztuje 565 920 zł brutto (524 000 zł netto + 8% VAT). Sam stan surowy otwarty to 388 800 zł brutto. Dokładną kwotę dla Twojej konfiguracji obliczysz w kalkulatorze powyżej.' }],
          },
          {
            question: 'Ile kosztuje budowa domu za m² w 2026?',
            content: [{ type: 'paragraph', value: 'Koszt pod klucz na Śląsku: 4 640–6 200 zł netto za m² (5 011–6 696 zł brutto) w zależności od konfiguracji. Nasz standard (silikat, dach płaski, płyta, gaz): 5 240 zł/m² netto. Na terenach górniczych koszty fundamentów są o 15–25% wyższe.' }],
          },
          {
            question: 'Jak długo trwa budowa domu?',
            content: [{ type: 'paragraph', value: 'Czas realizacji zależy od metrażu i standardu wykończenia. Dom parterowy 120 m² w stanie deweloperskim budujemy w 10–12 miesięcy. Dom piętrowy 180 m² pod klucz — 12–16 miesięcy. Dokładny harmonogram z kamieniami milowymi podajemy w umowie.' }],
          },
          {
            question: 'Co zawiera cena budowy domu?',
            content: [
              { type: 'paragraph', value: 'Cena obejmuje materiały, robociznę, nadzór kierownika budowy i koordynację podwykonawców. Nie zawiera:' },
              { type: 'list', items: ['Projektu architektonicznego (8 000–25 000 zł)', 'Przyłączy mediów (10 000–30 000 zł)', 'Opłat administracyjnych (pozwolenie na budowę)', 'Zagospodarowania terenu (ogrodzenie, podjazd)'] },
              { type: 'paragraph', value: 'Wszystko omawiamy transparentnie przed podpisaniem umowy. Szczegóły w artykule: Kosztorys budowy domu 2026.' },
            ],
          },
          {
            question: 'Czy cena może się zmienić po podpisaniu umowy?',
            content: [{ type: 'paragraph', value: 'Nie. Podpisujemy umowę ryczałtową ze stałą ceną. Jedyne co może zmienić cenę to Twoja decyzja o zmianie zakresu prac (np. dodanie garażu, zmiana materiałów). Każda taka zmiana wymaga pisemnego aneksu z nową wyceną.' }],
          },
          {
            question: 'Jak nowe Warunki Techniczne 2026 wpłyną na cenę budowy?',
            content: [{ type: 'paragraph', value: 'Od 20 września 2026 r. wchodzą zaostrzone wymagania energetyczne (EP ~55 kWh/m²·rok). Branża szacuje wzrost kosztów o 10–15% — grubsza izolacja, lepsza stolarka, obowiązkowa rekuperacja. Jeśli złożysz wniosek o pozwolenie przed tą datą, budujesz po obecnych, tańszych przepisach.' }],
          },
          {
            question: 'Czy budujecie na terenach górniczych?',
            content: [{ type: 'paragraph', value: 'Tak — tereny górnicze to nasza specjalizacja. Budujemy na szkodach górniczych kategorii I–IV (Rybnik, Jastrzębie-Zdrój, Wodzisław Śl., Zabrze, Katowice). Fundamenty na tych terenach wymagają płyty żelbetowej ze stalą B500SP i warstwą poślizgową — kalkulator uwzględnia ten koszt automatycznie.' }],
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
