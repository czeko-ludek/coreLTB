import type { Metadata } from "next";
import Link from "next/link";
import { companyData } from "@/data/company-data";

export const metadata: Metadata = {
  title: "Polityka prywatnosci - CoreLTB Builders",
  description: "Polityka prywatnosci serwisu internetowego CoreLTB Builders. Informacje o przetwarzaniu danych osobowych.",
  robots: { index: false, follow: false },
};

export default function PrivacyPage() {
  return (
    <main className="bg-background-light min-h-screen">
      <div className="max-w-3xl mx-auto px-4 py-16 sm:py-24">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 mb-2">
          Polityka prywatnosci
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
                z siedziba pod adresem: {companyData.address.streetAddress},{" "}
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
              Dane osobowe sa przetwarzane w nastepujacych celach:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                <strong>Obsluga zapytan z formularzy kontaktowych</strong> (kalkulator
                wyceny, formularz konsultacji, formularz analizy dzialki) — na
                podstawie art. 6 ust. 1 lit. b RODO (podejmowanie dzialan na zadanie
                osoby przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (prawnie
                uzasadniony interes Administratora).
              </li>
              <li>
                <strong>Kontakt telefoniczny i mailowy</strong> — na podstawie art. 6
                ust. 1 lit. f RODO (prawnie uzasadniony interes Administratora).
              </li>
              <li>
                <strong>Realizacja umow</strong> o roboty budowlane i uslugi — na
                podstawie art. 6 ust. 1 lit. b RODO.
              </li>
              <li>
                <strong>Cele analityczne</strong> (poprawa jakosci uslug, statystyki
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
              W ramach formularzy kontaktowych zbieramy nastepujace dane:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>imie i nazwisko,</li>
              <li>numer telefonu,</li>
              <li>adres e-mail,</li>
              <li>preferowana lokalizacja budowy,</li>
              <li>parametry budowy (w przypadku kalkulatora wyceny),</li>
              <li>adres dzialki (w przypadku formularza analizy dzialki),</li>
              <li>tresc wiadomosci / dodatkowe uwagi.</li>
            </ul>
            <p className="text-zinc-700 mt-3">
              Podanie danych jest dobrowolne, lecz niezbedne do realizacji celu,
              w jakim sa zbierane.
            </p>
          </section>

          {/* §4 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;4. Okres przechowywania danych
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Dane z formularzy kontaktowych sa przechowywane przez okres niezbedny
                do obslugi zapytania, nie dluzej niz 12 miesiecy od ostatniego kontaktu.
              </li>
              <li>
                Dane zwiazane z realizacja umow — przez okres trwania umowy oraz
                okres wymagany przepisami prawa (w szczegolnosci przepisy podatkowe
                i rachunkowe).
              </li>
              <li>
                Dane analityczne (cookies) — zgodnie z okresem waznosci plikow
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
                Dane moga byc udostepniane nastepujacym kategoriom odbiorcow:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>dostawcy uslug hostingowych (Cloudflare, Inc.),</li>
                  <li>dostawcy uslug e-mail (Resend),</li>
                  <li>dostawcy narzedzi analitycznych (Google Analytics),</li>
                  <li>podmioty uprawnione na podstawie przepisow prawa.</li>
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
                Serwis wykorzystuje pliki cookies w celu zapewnienia prawidlowego
                dzialania strony oraz zbierania danych analitycznych.
              </li>
              <li>
                Rodzaje stosowanych cookies:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>
                    <strong>Niezbedne</strong> — wymagane do prawidlowego dzialania
                    Serwisu (sesja, preferencje).
                  </li>
                  <li>
                    <strong>Analityczne</strong> — sluzace do analizy ruchu
                    i zachowan Uzytkownikow (Google Analytics).
                  </li>
                </ul>
              </li>
              <li>
                Uzytkownik moze zarzadzac plikami cookies za pomoca ustawien
                przegladarki internetowej. Wylaczenie cookies moze ograniczyc
                funkcjonalnosc Serwisu.
              </li>
            </ol>
          </section>

          {/* §7 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;7. Prawa osoby, której dane dotycza
            </h2>
            <p className="text-zinc-700 mb-3">
              Kazdej osobie, której dane sa przetwarzane, przysluguja nastepujace prawa:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-zinc-700">
              <li>prawo dostepu do danych (art. 15 RODO),</li>
              <li>prawo do sprostowania danych (art. 16 RODO),</li>
              <li>prawo do usuniecia danych (art. 17 RODO),</li>
              <li>prawo do ograniczenia przetwarzania (art. 18 RODO),</li>
              <li>prawo do przenoszenia danych (art. 20 RODO),</li>
              <li>prawo do sprzeciwu (art. 21 RODO),</li>
              <li>
                prawo do wniesienia skargi do Prezesa Urzedu Ochrony Danych
                Osobowych (ul. Stawki 2, 00-193 Warszawa).
              </li>
            </ul>
            <p className="text-zinc-700 mt-3">
              W celu realizacji powyzszych praw prosimy o kontakt na adres:{" "}
              <a href={`mailto:${companyData.email}`} className="text-primary hover:underline">
                {companyData.email}
              </a>
              .
            </p>
          </section>

          {/* §8 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;8. Bezpieczenstwo danych
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Administrator stosuje odpowiednie srodki techniczne i organizacyjne
                w celu ochrony danych osobowych przed nieuprawnionym dostepem,
                utrata lub zniszczeniem.
              </li>
              <li>
                Komunikacja z Serwisem jest szyfrowana protokolem SSL/TLS.
              </li>
            </ol>
          </section>

          {/* §9 */}
          <section>
            <h2 className="text-xl font-semibold text-zinc-900 mb-3">
              &sect;9. Zmiany Polityki prywatnosci
            </h2>
            <ol className="list-decimal pl-6 space-y-2 text-zinc-700">
              <li>
                Administrator zastrzega sobie prawo do zmiany niniejszej Polityki
                prywatnosci. Zmiany wchodza w zycie z chwila opublikowania w Serwisie.
              </li>
              <li>
                O istotnych zmianach Uzytkownik zostanie poinformowany za
                posrednictwem Serwisu.
              </li>
            </ol>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex gap-6">
          <Link
            href="/"
            className="text-primary hover:underline font-medium"
          >
            &larr; Strona glowna
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
