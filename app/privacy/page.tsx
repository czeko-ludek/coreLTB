import type { Metadata } from "next";
import Link from "next/link";
import { companyData } from "@/data/company-data";

export const metadata: Metadata = {
  title: "Polityka prywatności - CoreLTB Builders",
  description: "Polityka prywatności serwisu internetowego CoreLTB Builders. Informacje o przetwarzaniu danych osobowych.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="bg-background-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">
          Polityka prywatności
        </h1>
        <p className="text-zinc-500 mb-12">
          Ostatnia aktualizacja: 23 marca 2026
        </p>

        <div className="prose prose-zinc max-w-none space-y-8">
          {/* §1 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;1. Administrator danych osobowych
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Administratorem danych osobowych jest {companyData.legalName},
                z siedzibą pod adresem: {companyData.address.streetAddress},{" "}
                {companyData.address.postalCode} {companyData.address.addressLocality}
                {" "}(dalej: &bdquo;Administrator&rdquo;).
              </li>
              <li>
                Kontakt z Administratorem:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    e-mail:{" "}
                    <a href={`mailto:${companyData.email}`} className="text-primary hover:underline">
                      {companyData.email}
                    </a>
                  </li>
                  <li>
                    telefon:{" "}
                    <a href={`tel:${companyData.telephone}`} className="text-primary hover:underline">
                      +48 664 123 757
                    </a>
                  </li>
                  <li>
                    adres korespondencyjny: {companyData.address.streetAddress},{" "}
                    {companyData.address.postalCode} {companyData.address.addressLocality}
                  </li>
                </ul>
              </li>
            </ol>
          </section>

          {/* §2 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;2. Cel i podstawa przetwarzania danych
            </h2>
            <p className="text-zinc-700 mb-3">
              Dane osobowe są przetwarzane w następujących celach:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                <strong>Obsługa zapytań z formularzy kontaktowych</strong> (kalkulator
                wyceny, formularz konsultacji, formularz analizy działki) — na
                podstawie art. 6 ust. 1 lit. b RODO (podejmowanie działań na żądanie
                osoby przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie
                uzasadniony interes Administratora).
              </li>
              <li>
                <strong>Kontakt telefoniczny i mailowy</strong> — na podstawie art. 6
                ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).
              </li>
              <li>
                <strong>Realizacja umów</strong> o roboty budowlane i usługi — na
                podstawie art. 6 ust. 1 lit. b RODO.
              </li>
              <li>
                <strong>Cele analityczne</strong> (poprawa jakości usług, statystyki
                ruchu) — na podstawie art. 6 ust. 1 lit. f RODO.
              </li>
            </ol>
          </section>

          {/* §3 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;3. Zakres zbieranych danych
            </h2>
            <p className="text-zinc-700 mb-3">
              W ramach formularzy kontaktowych zbieramy następujące dane:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>imię i nazwisko,</li>
              <li>numer telefonu,</li>
              <li>adres e-mail,</li>
              <li>preferowana lokalizacja budowy,</li>
              <li>parametry budowy (w przypadku kalkulatora wyceny),</li>
              <li>adres działki (w przypadku formularza analizy działki),</li>
              <li>treść wiadomości / dodatkowe uwagi.</li>
            </ul>
            <p className="text-zinc-700 mt-3">
              Podanie danych jest dobrowolne, lecz niezbędne do realizacji celu,
              w jakim są zbierane.
            </p>
          </section>

          {/* §4 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;4. Okres przechowywania danych
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Dane z formularzy kontaktowych są przechowywane przez okres niezbędny
                do obsługi zapytania, nie dłużej niż 12 miesięcy od ostatniego kontaktu.
              </li>
              <li>
                Dane związane z realizacją umów — przez okres trwania umowy oraz
                okres wymagany przepisami prawa (w szczególności przepisy podatkowe
                i rachunkowe).
              </li>
              <li>
                Dane analityczne (cookies) — zgodnie z okresem ważności plików
                cookies (patrz &sect;6).
              </li>
            </ol>
          </section>

          {/* §5 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;5. Odbiorcy danych
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Dane mogą być udostępniane następującym kategoriom odbiorców:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>dostawcy usług hostingowych (Cloudflare, Inc.),</li>
                  <li>dostawcy usług e-mail (Resend),</li>
                  <li>dostawcy narzędzi analitycznych (Google Analytics),</li>
                  <li>podmioty uprawnione na podstawie przepisów prawa.</li>
                </ul>
              </li>
              <li>
                Administrator nie sprzedaje danych osobowych podmiotom trzecim.
              </li>
            </ol>
          </section>

          {/* §6 */}
          <section id="cookies">
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;6. Pliki cookies
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Serwis wykorzystuje pliki cookies w celu zapewnienia prawidłowego
                działania strony oraz zbierania danych analitycznych.
              </li>
              <li>
                Rodzaje stosowanych cookies:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    <strong>Niezbędne</strong> — wymagane do prawidłowego działania
                    Serwisu (sesja, preferencje).
                  </li>
                  <li>
                    <strong>Analityczne</strong> — służące do analizy ruchu
                    i zachowań Użytkowników (Google Analytics).
                  </li>
                </ul>
              </li>
              <li>
                Użytkownik może zarządzać plikami cookies za pomocą ustawień
                przeglądarki internetowej. Wyłączenie cookies może ograniczyć
                funkcjonalność Serwisu.
              </li>
            </ol>
          </section>

          {/* §7 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;7. Prawa osoby, której dane dotyczą
            </h2>
            <p className="text-zinc-700 mb-3">
              Każdej osobie, której dane są przetwarzane, przysługują następujące prawa:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>prawo dostępu do danych (art. 15 RODO),</li>
              <li>prawo do sprostowania danych (art. 16 RODO),</li>
              <li>prawo do usunięcia danych (art. 17 RODO),</li>
              <li>prawo do ograniczenia przetwarzania (art. 18 RODO),</li>
              <li>prawo do przenoszenia danych (art. 20 RODO),</li>
              <li>prawo do sprzeciwu (art. 21 RODO),</li>
              <li>
                prawo do wniesienia skargi do Prezesa Urzędu Ochrony Danych
                Osobowych (ul. Stawki 2, 00-193 Warszawa).
              </li>
            </ul>
            <p className="text-zinc-700 mt-3">
              W celu realizacji powyższych praw prosimy o kontakt na adres:{" "}
              <a href={`mailto:${companyData.email}`} className="text-primary hover:underline">
                {companyData.email}
              </a>
              .
            </p>
          </section>

          {/* §8 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;8. Bezpieczeństwo danych
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Administrator stosuje odpowiednie środki techniczne i organizacyjne
                w celu ochrony danych osobowych przed nieuprawnionym dostępem,
                utratą lub zniszczeniem.
              </li>
              <li>
                Komunikacja z Serwisem jest szyfrowana protokołem SSL/TLS.
              </li>
            </ol>
          </section>

          {/* §9 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;9. Zmiany Polityki prywatności
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Administrator zastrzega sobie prawo do zmiany niniejszej Polityki
                prywatności. Zmiany wchodzą w życie z chwilą opublikowania w Serwisie.
              </li>
              <li>
                O istotnych zmianach Użytkownik zostanie poinformowany za
                pośrednictwem Serwisu.
              </li>
            </ol>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex gap-6">
          <Link
            href="/"
            className="text-primary hover:underline font-medium"
          >
            &larr; Strona główna
          </Link>
          <Link
            href="/terms"
            className="text-primary hover:underline font-medium"
          >
            Regulamin
          </Link>
        </div>
      </div>
    </main>
  );
}
