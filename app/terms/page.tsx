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
              &sect;1. Postanowienia ogólne
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Niniejszy Regulamin określa zasady korzystania z serwisu internetowego
                dostępnego pod adresem{" "}
                <a href={companyData.url} className="text-primary hover:underline">
                  {companyData.url.replace("https://", "")}
                </a>{" "}
                (dalej: &bdquo;Serwis&rdquo;).
              </li>
              <li>
                Właścicielem i administratorem Serwisu jest {companyData.legalName},
                z siedzibą pod adresem: {companyData.address.streetAddress},{" "}
                {companyData.address.postalCode} {companyData.address.addressLocality},
                NIP: 6322046389 (dalej: &bdquo;Usługodawca&rdquo;).
              </li>
              <li>
                Korzystanie z Serwisu oznacza akceptację niniejszego Regulaminu.
              </li>
            </ol>
          </section>

          {/* §2 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;2. Zakres usług
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Serwis umożliwia zapoznanie się z ofertą Usługodawcy w zakresie
                budowy domów jednorodzinnych, projektowania, nadzoru budowlanego,
                usług technicznych, wykończenia wnętrz oraz zagospodarowania terenu.
              </li>
              <li>
                Za pośrednictwem Serwisu Użytkownik może:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>przeglądać ofertę i realizacje Usługodawcy,</li>
                  <li>korzystać z kalkulatora wyceny budowy domu,</li>
                  <li>przesyłać zapytania poprzez formularze kontaktowe,</li>
                  <li>umawiać konsultacje z inżynierem.</li>
                </ul>
              </li>
              <li>
                Usługi świadczone drogą elektroniczną są bezpłatne. Usługi budowlane
                realizowane są na podstawie odrębnych umów.
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
                Do korzystania z Serwisu wymagane jest urządzenie z dostępem do
                Internetu oraz przeglądarka internetowa obsługująca JavaScript.
              </li>
              <li>
                Użytkownik zobowiązuje się do korzystania z Serwisu zgodnie
                z obowiązującym prawem i dobrymi obyczajami.
              </li>
              <li>
                Zabronione jest dostarczanie treści o charakterze bezprawnym.
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
                Przesyłając formularz kontaktowy, Użytkownik wyraża zgodę na
                przetwarzanie podanych danych osobowych w celu obsługi zapytania.
              </li>
              <li>
                Szczegółowe informacje o przetwarzaniu danych osobowych znajdują się
                w{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Polityce prywatności
                </Link>
                .
              </li>
              <li>
                Usługodawca dokłada starań, aby odpowiedzieć na zapytanie
                w terminie 2 dni roboczych.
              </li>
            </ol>
          </section>

          {/* §5 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;5. Własność intelektualna
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Wszelkie treści zamieszczone w Serwisie, w tym teksty, grafiki,
                zdjęcia, logotypy i projekty, stanowią własność Usługodawcy lub
                zostały wykorzystane za zgodą uprawnionych podmiotów.
              </li>
              <li>
                Kopiowanie, rozpowszechnianie lub wykorzystywanie treści Serwisu
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
                Reklamacje dotyczące funkcjonowania Serwisu można zgłaszać na adres
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
                Reklamacja powinna zawierać opis problemu oraz dane kontaktowe
                zgłaszającego.
              </li>
              <li>
                Usługodawca rozpatrzy reklamację w terminie 14 dni od jej otrzymania.
              </li>
            </ol>
          </section>

          {/* §7 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;7. Postanowienia końcowe
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Usługodawca zastrzega sobie prawo do zmiany niniejszego Regulaminu.
                Zmiany wchodzą w życie z chwilą opublikowania w Serwisie.
              </li>
              <li>
                W sprawach nieuregulowanych niniejszym Regulaminem zastosowanie mają
                przepisy prawa polskiego.
              </li>
              <li>
                Wszelkie spory wynikające z korzystania z Serwisu będą rozstrzygane
                przez sąd właściwy dla siedziby Usługodawcy.
              </li>
            </ol>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200">
          <Link
            href="/"
            className="text-primary hover:underline font-medium"
          >
            &larr; Wróć do strony głównej
          </Link>
        </div>
      </div>
    </main>
  );
}
