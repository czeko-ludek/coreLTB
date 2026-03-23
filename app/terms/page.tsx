import type { Metadata } from "next";
import Link from "next/link";
import { companyData } from "@/data/company-data";

export const metadata: Metadata = {
  title: "Regulamin - CoreLTB Builders",
  description: "Regulamin korzystania z serwisu internetowego CoreLTB Builders.",
  robots: { index: false, follow: false },
};

export default function TermsPage() {
  return (
    <main className="bg-background-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">
          Regulamin
        </h1>
        <p className="text-zinc-500 mb-12">
          Ostatnia aktualizacja: 23 marca 2026
        </p>

        <div className="prose prose-zinc max-w-none space-y-8">
          {/* §1 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;1. Postanowienia ogolne
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Niniejszy Regulamin okresla zasady korzystania z serwisu internetowego
                dostepnego pod adresem{" "}
                <a href={companyData.url} className="text-primary hover:underline">
                  {companyData.url.replace("https://", "")}
                </a>{" "}
                (dalej: &bdquo;Serwis&rdquo;).
              </li>
              <li>
                Wlascicielem i administratorem Serwisu jest {companyData.legalName},
                z siedziba pod adresem: {companyData.address.streetAddress},{" "}
                {companyData.address.postalCode} {companyData.address.addressLocality},
                NIP: 6322046389 (dalej: &bdquo;Usługodawca&rdquo;).
              </li>
              <li>
                Korzystanie z Serwisu oznacza akceptacje niniejszego Regulaminu.
              </li>
            </ol>
          </section>

          {/* §2 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;2. Zakres uslug
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Serwis umozliwia zapoznanie sie z oferta Usługodawcy w zakresie
                budowy domow jednorodzinnych, projektowania, nadzoru budowlanego,
                uslug technicznych, wykonczenia wnetrz oraz zagospodarowania terenu.
              </li>
              <li>
                Za posrednictwem Serwisu Uzytkownik moze:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>przegladac oferte i realizacje Usługodawcy,</li>
                  <li>korzystac z kalkulatora wyceny budowy domu,</li>
                  <li>przesylac zapytania poprzez formularze kontaktowe,</li>
                  <li>umawiac konsultacje z inzynierem.</li>
                </ul>
              </li>
              <li>
                Uslugi swiadczone droga elektroniczna sa bezplatne. Uslugi budowlane
                realizowane sa na podstawie odrebnych umow.
              </li>
            </ol>
          </section>

          {/* §3 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;3. Warunki korzystania z Serwisu
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Do korzystania z Serwisu wymagane jest urzadzenie z dostepem do
                Internetu oraz przegladarka internetowa obslugujaca JavaScript.
              </li>
              <li>
                Uzytkownik zobowiazuje sie do korzystania z Serwisu zgodnie
                z obowiazujacym prawem i dobrymi obyczajami.
              </li>
              <li>
                Zabronione jest dostarczanie tresci o charakterze bezprawnym.
              </li>
            </ol>
          </section>

          {/* §4 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;4. Formularze kontaktowe
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Przesylajac formularz kontaktowy, Uzytkownik wyraża zgode na
                przetwarzanie podanych danych osobowych w celu obslugi zapytania.
              </li>
              <li>
                Szczegolowe informacje o przetwarzaniu danych osobowych znajduja sie
                w{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Polityce prywatnosci
                </Link>
                .
              </li>
              <li>
                Usługodawca doklada staran, aby odpowiedziec na zapytanie
                w terminie 2 dni roboczych.
              </li>
            </ol>
          </section>

          {/* §5 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;5. Wlasnosc intelektualna
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Wszelkie tresci zamieszczone w Serwisie, w tym teksty, grafiki,
                zdjecia, logotypy i projekty, stanowia wlasnosc Usługodawcy lub
                zostaly wykorzystane za zgoda uprawnionych podmiotow.
              </li>
              <li>
                Kopiowanie, rozpowszechnianie lub wykorzystywanie tresci Serwisu
                bez pisemnej zgody Usługodawcy jest zabronione.
              </li>
            </ol>
          </section>

          {/* §6 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;6. Reklamacje
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Reklamacje dotyczace funkcjonowania Serwisu mozna zgłaszac na adres
                e-mail:{" "}
                <a
                  href={`mailto:${companyData.email}`}
                  className="text-primary hover:underline"
                >
                  {companyData.email}
                </a>{" "}
                lub pisemnie na adres siedziby Usługodawcy.
              </li>
              <li>
                Reklamacja powinna zawierac opis problemu oraz dane kontaktowe
                zgłaszajacego.
              </li>
              <li>
                Usługodawca rozpatrzy reklamacje w terminie 14 dni od jej otrzymania.
              </li>
            </ol>
          </section>

          {/* §7 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;7. Postanowienia koncowe
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Usługodawca zastrzega sobie prawo do zmiany niniejszego Regulaminu.
                Zmiany wchodza w zycie z chwila opublikowania w Serwisie.
              </li>
              <li>
                W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie maja
                przepisy prawa polskiego.
              </li>
              <li>
                Wszelkie spory wynikajace z korzystania z Serwisu beda rozstrzygane
                przez sad wlasciwy dla siedziby Usługodawcy.
              </li>
            </ol>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200">
          <Link
            href="/"
            className="text-primary hover:underline font-medium"
          >
            &larr; Wróc do strony głównej
          </Link>
        </div>
      </div>
    </main>
  );
}
