# Google Ads — Kampania CoreLTB Builders

> **Status:** Planowanie
> **Data:** 2026-03-23
> **Budżet:** 50 zł/dzień (1 500 zł/mies.)
> **Typ kampanii:** Performance Max (jedna kampania)
> **Konto Google Ads:** TODO — do utworzenia

---

## 1. Strategia: Jedna kampania PMax, 50 zł/dzień

### Dlaczego jedna kampania, a nie dwie

Przy budżecie 50 zł/dzień rozdzielanie na PMax + Search to błąd:

| Problem z podziałem | Dlaczego to szkodzi |
|---|---|
| **Faza nauki wymaga danych** | Google AI potrzebuje min. 15-30 konwersji/mies. żeby się nauczyć. Jedna kampania z 50 zł zbiera ~30-50 leadów = uczy się szybko. Dwie kampanie (35+15) = obie uczą się wolniej |
| **PMax już zawiera Search** | PMax wyświetla reklamy w wynikach wyszukiwania, nie tylko Display/Maps. Search Themes kierują AI na nasze frazy |
| **15 zł/dzień na Search to za mało** | Smart bidding może nie wyjść z fazy nauki. Kampania Search ma sens od 30-50 zł/dzień |
| **Prostota = mniej błędów** | Na start, bez doświadczenia z Ads, jedna kampania do monitorowania |
| **AI lepiej rozkłada budżet** | Sam zobaczy, że klik w Rybniku za 0.76 zł konwertuje lepiej niż display i przesunie budżet |

### Dlaczego PMax, a nie Search

| Czynnik | Search | PMax | Nasz kontekst |
|---|---|---|---|
| Skala geograficzna | Osobna grupa na każde miasto | Jeden asset group na 3 woj. | 2 bazy, 3 województwa, 11+ miast |
| Google Maps | Nie obsługuje | Reklamy w Mapach | 2 wizytówki GBP (Wodzisław + Jaworzno) |
| Remarketing | Osobna kampania Display/RLSA | Wbudowany | Cykl decyzyjny 6-18 mies. — remarketing konieczny |
| Faza lejka | Tylko koniec (user wpisuje frazę) | Cały lejek (Display, YouTube, Maps, Search) | Chcemy łapać klienta zanim zacznie szukać wykonawcy |
| Budżet 50 zł/dzień | Wystarczy ale ograniczony zasięg | Wystarczy przy prostych konwersjach | Konwersja = telefon / formularz — prosta, częsta akcja |

**Decyzja:** Jedna kampania PMax, 50 zł/dzień. Search jako osobna kampania dopiero przy budżecie 100+ zł/dzień (miesiąc 2-3).

### Region docelowy — focus na bliskie miasta

Przy 50 zł/dzień nie rozrzucamy budżetu na cały Śląsk równomiernie. PMax sam zoptymalizuje, ale Search Themes i nagłówki kierujemy na miasta bliskie naszym bazom, gdzie CPC jest najniższe:

| Priorytet | Miasta | Baza | CPC | Poz. org. | Uzasadnienie |
|---|---|---|---|---|---|
| **P0 — Rdzeń** | Wodzisław Śl., Rybnik, Jaworzno | Obie bazy | 0.00-1.66 zł | 5-12 | Najtaniej, najbliżej, największy ruch GSC |
| **P1 — Bliskie** | Żory, Jastrzębie, Tychy, Gliwice | 15-40 km | 0.84-1.46 zł | 10-28 | Tanie CPC, rosnące impresje |
| **P2 — Dalsze** | Katowice, Zabrze, Mikołów, Racibórz | 30-50 km | do 2.70 zł | 7-45 | PMax pokryje przez Maps i Display (taniej niż Search) |

> **Katowice:** Największy rynek (290 tys.), ale CPC 2.70 zł (3.5x droższe niż Rybnik) i pozycja org. 45. PMax pokaże nas tam przez Maps i Display za mniejszy koszt niż Search. Gdy budżet wzrośnie → dodamy Search na Katowice.

---

## 2. Dane źródłowe — co ludzie szukają (GSC + GBP)

### GSC — ostatnie 30 dni (coreltb.pl)

**Frazy budowlane lokalne (core business):**

| Fraza | Imp | Klik | Poz. org. | CPC |
|---|---|---|---|---|
| budowa domów wodzisław śląski | 66 | 0 | 12.2 | 0.00 zł |
| budowa domów rybnik | 46 | 0 | 6.9 | 0.76 zł |
| budowa domu rybnik | 32 | 0 | 7.2 | 0.76 zł |
| budowa domów katowice | 22 | 0 | 45.2 | 2.70 zł |
| dom pod klucz jaworzno | 21 | 0 | 7.0 | — |
| budowa domu tychy | 20 | 0 | 10.3 | 1.46 zł |
| budowa domów żory | 20 | 0 | 14.1 | 1.18 zł |
| firma budowlana jaworzno | 20 | 1 | 5.2 | 1.11 zł |
| budowa domu gliwice | 19 | 0 | 23.5 | 0.84 zł |
| budowa domu jaworzno | 19 | 0 | 7.1 | 1.66 zł |
| budowa domu katowice | 19 | 0 | 32.9 | 2.70 zł |
| dom energooszczędny śląsk | 18 | 0 | 4.7 | 0.61 zł |
| budowa domów gliwice | 16 | 0 | 28.1 | 0.84 zł |
| firma budowlana wodzisław śląski | 14 | 0 | 59.4 | 0.82 zł |
| budowa domów zabrze | 13 | 0 | 7-10 | — |
| budowa domu żory | 11 | 0 | 13.3 | 1.18 zł |

**Frazy kosztowe (intencja kalkulatorowa):**

| Fraza | Imp | CPC | Wniosek |
|---|---|---|---|
| stan surowy otwarty | 51 | 1.08 zł | Informacyjna, ale duży wolumen — mamy artykuł |
| budowa domu stan surowy otwarty | 10 | — | Wariant z "budowa" = wyższa intencja |
| stan surowy otwarty co zawiera | 3 | — | FAQ — mamy treść |

> **Frazy kosztowe ogólne (DataForSEO):** "ile kosztuje budowa domu" CPC 0.48 zł, "kalkulator budowy domu" CPC 0.53 zł, "koszt budowy domu" CPC 0.54 zł — najtańsze kliknięcia w branży! PMax z Search Themes je złapie.

**Frazy nadzorowe (osobny Asset Group — miesiąc 2):**

| Fraza | Imp | Klik | Poz. org. |
|---|---|---|---|
| kierownik budowy jaworzno | 32 | 0 | 7.0 |
| kierownik budowy katowice | 30 | 1 | 10.0 |
| kierownik budowy wodzisław śl. | 21 | 1 | 6.5 |
| nadzór inwestorski katowice | 20 | 0 | 24.0 |
| nadzory budowlane katowice | 19 | 0 | 33.7 |
| inspektor kierownik budowy jaworzno | 15 | 0 | 4.4 |
| nadzór inwestycyjny katowice | 15 | 0 | 22.7 |
| inspektor kierownik budowy katowice | 12 | 0 | 23.6 |
| usługa nadzoru budowlanego katowice | 16 | 0 | 26.2 |

> **Nadzór razem: ~180 impresji/mies.** To osobna persona (ktoś kto JUZ buduje i szuka inspektora). Nie mieszać z budową na start — osobny Asset Group w miesiącu 2.

**Brand queries:**

| Fraza | Imp | Klik | Poz. |
|---|---|---|---|
| coreltb | 27 | 11 | 1.0 |
| coreltb builders sp. z o.o. | 18 | 5 | 1.3 |
| coreltb builders | 12 | 4 | 1.0 |
| coreltb builders sp. z o.o | 12 | 3 | 1.3 |
| coreltb builders sp. z o.o. opinie | 22 | 2 | 2.8 |

> **Brand razem: ~91 imp, 25 klików, CTR 27%.** Pozycja 1.0 — nie potrzebują Ads. Ale "opinie" (22 imp) = PILNE: zbierz opinie Google.

### GBP Jaworzno — ostatnie 6 miesięcy (pełne dane)

**Brand queries (nie potrzebują Ads):**

| Fraza | Szukania | Wniosek |
|---|---|---|
| coreltb builders sp. z o.o | 108 | Brand #1 — dominuje |
| coreltb builders sp. z o.o. | 41 | Wariant z kropką |
| coreltb builders | 38 | Wariant skrócony |
| coreltb builders sp. z o.o. opinie | 37 | PILNE: potrzebujemy opinii! |
| coreltb | <15 | Wariant najkrótszy |
| coreltb jaworzno | <15 | Brand + miasto |
| coreltb builders sp. z o.o., grunwaldzka, jaworzno | <15 | Nawigacyjna |
| coreltb builders sp. z o.o. reviews | <15 | Anglojęzyczna |

> **Brand razem: ~224+ szukań/6 mies.** Rozpoznawalność rośnie organicznie.
> **37 osób szukało opinii** — PILNE: zbierz min. 10-15 opinii Google ZANIM odpalamy Ads. Ludzie klikają reklamę → wchodzą na wizytówkę → widzą 0 opinii → odchodzą.

**Frazy usługowe (kluczowe dla kampanii Ads):**

| Fraza | Szukania | CPC | Wniosek |
|---|---|---|---|
| **firma budowlana jaworzno** | **89** | 1.11 zł | TOP fraza lokalna! PMax z GBP to pokryje |
| firmy budowlane jaworzno | <15 | — | Wariant l.mn. — PMax złapie |
| jaworzno firma budowlana | <15 | — | Odwrócona kolejność |
| firmy budowlane generalne wykonawstwo jaworzno | <15 | — | Long-tail, wysoka intencja |
| budowa domu jaworzno | <15 | 1.66 zł | Główna fraza budowlana |
| budowa domów jaworzno | <15 | 1.66 zł | Wariant l.mn. |
| kierownik budowy jaworzno | <15 | — | Nadzor — osobny AG (M2) |
| elewacje jaworzno | <15 | — | Nie nasza usługa |
| produkcja domów | <15 | — | Ogólna |
| 43-600 firma | <15 | — | Kod pocztowy — ogólna |
| firma budowlana koralterm | <15 | — | Konkurent — ale my się pokazujemy! |

> **Kluczowy wniosek z GBP:** "firma budowlana jaworzno" (89 szukań) to 2. najczęstsza fraza po brandzie. PMax z podpiętą wizytówką GBP + Search Themes = dominacja w Maps na tę frazę.

### CPC — pełna mapa kosztów (DataForSEO)

| Fraza | CPC | Competition | Wniosek |
|---|---|---|---|
| **Frazy kosztowe (najtańsze!)** | | | |
| dom pod klucz cena | 0.40 zł | MEDIUM | /wycena |
| ile kosztuje budowa domu | 0.48 zł | MEDIUM | /wycena |
| budowa domu cena | 0.49 zł | LOW | /wycena |
| koszt budowy domu 2026 | 0.49 zł | LOW | /wycena |
| kalkulator budowy domu 2026 | 0.50 zł | LOW | /wycena |
| kalkulator budowy domu | 0.53 zł | MEDIUM | /wycena |
| koszt budowy domu | 0.54 zł | LOW | /wycena |
| dom energooszczędny | 0.61 zł | HIGH | /baza-wiedzy |
| **Frazy lokalne bliskie (tanie)** | | | |
| budowa domów rybnik | 0.76 zł | LOW | /obszar-dzialania/rybnik |
| budowa domu rybnik | 0.76 zł | LOW | /obszar-dzialania/rybnik |
| firma budowlana wodzisław śląski | 0.82 zł | LOW | /obszar-dzialania/wodzislaw-slaski |
| budowa domu gliwice | 0.84 zł | LOW | /obszar-dzialania/gliwice |
| budowa domów gliwice | 0.84 zł | LOW | /obszar-dzialania/gliwice |
| kierownik budowy katowice | 0.85 zł | LOW | /kierownik-budowy-katowice |
| budowa domu pod klucz | 0.95 zł | LOW | /wycena |
| firma budowlana rybnik | 0.97 zł | LOW | /obszar-dzialania/rybnik |
| firma budowlana jaworzno | 1.11 zł | MEDIUM | /obszar-dzialania/jaworzno |
| budowa domów żory | 1.18 zł | LOW | /obszar-dzialania/zory |
| budowa domów śląsk | 1.53 zł | LOW | / |
| **Frazy lokalne dalsze (droższe)** | | | |
| budowa domów tychy | 1.46 zł | LOW | /obszar-dzialania/tychy |
| budowa domu jaworzno | 1.66 zł | LOW | /obszar-dzialania/jaworzno |
| firma budowlana katowice | 1.82 zł | LOW | /obszar-dzialania/katowice |
| budowa domów katowice | 2.70 zł | LOW | /obszar-dzialania/katowice |
| budowa domu katowice | 2.70 zł | LOW | /obszar-dzialania/katowice |
| generalny wykonawca | 3.83 zł | LOW | / |

> **Wszystkie frazy mają LOW competition** — branża budowlana na Śląsku jest słabo zagospodarowana w Ads. To ogromna szansa.

---

## 3. Konfiguracja kampanii PMax

### Ustawienia podstawowe

| Parametr | Wartość | Uwagi |
|---|---|---|
| **Nazwa kampanii** | CoreLTB — PMax — Budowa Domów | |
| **Cel** | Leady (Leads) | |
| **Budżet dzienny** | 50 zł | Cały budżet w jednej kampanii |
| **Strategia stawek** | Maksymalizuj konwersje | Bez docelowego CPA na start — pozwól AI się nauczyć |
| **Lokalizacja** | Śląskie + Małopolskie + Opolskie | 3 województwa — PMax sam priorytetyzuje bliższe |
| **Język** | Polski | |
| **Wizytówki GBP** | Podpięte obie: Wodzisław Śl. + Jaworzno | KRYTYCZNE — bez tego brak reklam w Maps |
| **Final URL expansion** | ON | Pozwól Google kierować na najlepsze podstrony |
| **Schedule** | 6:00-22:00 | Budowlanka — nikt nie dzwoni w nocy |
| **Audience signals** | Zainteresowania: Nieruchomości, Budownictwo, Dom i ogród | Podpowiedź dla AI, nie ograniczenie |

### Konwersje (KRYTYCZNE — ustawić PRZED startem kampanii)

| Konwersja | Typ | Wartość | Priorytet | Uwagi |
|---|---|---|---|---|
| **Submit /wycena** | Form submit | 150 zł | Primary | Najcieplejszy lead — zna cenę, podaje dane |
| **Submit /umow-konsultacje** | Form submit | 100 zł | Primary | Ciepły lead — chce rozmawiać |
| **Submit /analiza-dzialki** | Form submit | 80 zł | Primary | Ciepły lead — ma działkę |
| **Kliknięcie telefonu (strona)** | Phone click | 50 zł | Primary | Każde kliknięcie tel. na coreltb.pl |
| **Kliknięcie "Zadzwoń" z GBP** | GBP call | 50 zł | Primary | Dzwonienie bezpośrednio z Maps |

> **Dlaczego /wycena = 150 zł?** Kalkulator to najsilniejszy konwerter — user konfiguruje dom, widzi cenę, zostawia dane. Wie czego chce i ile to kosztuje. To najcieplejszy lead w lejku.

> **Arytmetyka:** Średni kontrakt 500k zł, konwersja lead→klient ~5% → wartość leada = 25 000 zł. Dopuszczalny CPA nawet 500 zł. Przy realnym CPA 30-50 zł to fenomenalny ROI.

### Search Themes (podpowiedzi dla AI PMax)

Search Themes mówią AI PMax, jakie frazy nas interesują. To NIE są keywords — AI użyje ich jako sygnał i rozszerzy sam.

| # | Search Theme | Dlaczego | Źródło danych |
|---|---|---|---|
| 1 | budowa domów rybnik | Top fraza lokalna, CPC 0.76 zł | GSC: 78 imp (l.poj. + l.mn.) |
| 2 | budowa domów wodzisław śląski | Nasza baza, 66 imp | GSC: top fraza |
| 3 | firma budowlana jaworzno | 89 szukań na GBP! | GBP Jaworzno |
| 4 | budowa domu jaworzno | Nasza baza, CPC 1.66 zł | GSC: 19 imp |
| 5 | ile kosztuje budowa domu | Intencja kosztowa → /wycena, CPC 0.48 zł | DataForSEO: najtańsza fraza |
| 6 | kalkulator budowy domu | Nasz wyróżnik → /wycena, CPC 0.53 zł | DataForSEO |
| 7 | budowa domów żory | Bliskie miasto, CPC 1.18 zł | GSC: 20 imp |
| 8 | budowa domu gliwice | Tanie CPC 0.84 zł, słaba poz. org. | GSC: 19 imp, poz. 23 |
| 9 | dom pod klucz śląsk | Stan wykończenia — wysoka intencja | GSC: 21 imp "dom pod klucz jaworzno" |
| 10 | firma budowlana śląsk | Wariant regionalny | DataForSEO: CPC 1.43 zł |

> **Limit:** PMax pozwala max 25 Search Themes per Asset Group. 10 to dobry start — AI rozszerzy sam.
> **Brak Katowic w Search Themes** — celowe. PMax pokryje Katowice przez Maps i Display (tańsze kanały). Search Themes skupiamy na bliskich miastach z niskim CPC.

### Negative keywords (poziom konta — dotyczą WSZYSTKICH kampanii)

**Frazy do wykluczenia od razu:**

| Kategoria | Frazy | Dlaczego |
|---|---|---|
| **Praca** | praca, oferty pracy, zatrudnienie, dam pracę, pracownik, murarz praca, operator koparki | Szukający pracy, nie klienta |
| **Edukacja** | kurs, szkolenie, studia, technikum, zawodowe | Studenci, nie inwestorzy |
| **Poza zasięgiem** | warszawa, gdańsk, poznań, wrocław, łódź, szczecin, lublin, białystok | Nie obsługujemy |
| **Nie nasza technologia** | szkieletowy, modułowy, prefabrykowany, kontenerowy, drewniany | Budujemy murowane |
| **Deweloper/mieszkanie** | deweloper, mieszkanie, blok, kawalerka, apartament, wynajem | Inna branża |
| **Remont** | remont, odnawianie, renowacja, malowanie | Nie robimy remontów |
| **False positives "kalkulator"** | excel, arkusz, szablon, pobierz, pdf, darmowy kalkulator | Szukają tabelki, nie usługi |
| **Sprzedaż działek** | działka na sprzedaż, kupno działki, działki budowlane sprzedaż | Nie sprzedajemy działek |

> **WAŻNE:** Dodawaj negative keywords na bieżąco w tygodniach 1-4 na podstawie raportu "Search terms" w PMax (Insights → Search term insights).

---

## 4. Asset Group 1: "Budowa domów — Rybnik, Wodzisław, Jaworzno i okolice"

### Nagłówki (15 szt., max 30 znaków)

| # | Nagłówek | Typ | Źródło danych |
|---|---|---|---|
| 1 | Budowa Domów — Śląsk | Geo/Główny | GSC: top fraza regionalna |
| 2 | Budowa Domów Pod Klucz | Usługa | GSC: "dom pod klucz jaworzno" 21 imp |
| 3 | Oblicz Koszt w 60 Sekund | CTA/Kalkulator | Wyróżnik — /wycena, hook konwersyjny |
| 4 | Kalkulator Budowy Online | CTA/Kalkulator | CPC 0.53 zł, unikalne narzędzie |
| 5 | Stała Cena w Umowie | USP | Brand promise — bez niespodzianek |
| 6 | Domy SSO i Pod Klucz | Usługa | GSC: "stan surowy otwarty" 51 imp |
| 7 | 10 Lat Gwarancji | USP | Social proof / zaufanie |
| 8 | Budowa Domów — Rybnik | Geo | GSC: 78 imp, poz. 7 — wzmocnienie |
| 9 | Budowa Domów — Jaworzno | Geo | GBP: 89 szukań "firma budowlana jaworzno" |
| 10 | Ile Kosztuje Budowa Domu? | CTA/Kalkulator | Fraza kosztowa CPC 0.48 zł |
| 11 | 200+ Zrealizowanych Domów | Social proof | Dowód kompetencji |
| 12 | Firma Budowlana — Śląsk | Geo | GSC: frazy "firma budowlana" |
| 13 | Poznaj Cenę Budowy Domu | CTA/Kalkulator | Kalkulator jako hook |
| 14 | Budowa Domów — Wodzisław | Geo | GSC: 66 imp — top fraza lokalna! |
| 15 | Budowa Domów — Gliwice | Geo | GSC: 16 imp, poz. 28 — słaba org. |

> **Struktura nagłówków:**
> - 5x Geo (Śląsk, Rybnik, Jaworzno, Wodzisław, Gliwice) — pokrywają top frazy z GSC
> - 4x CTA/Kalkulator (Oblicz koszt, Kalkulator online, Ile kosztuje, Poznaj cenę) — nasz wyróżnik
> - 3x Usługa (Pod klucz, SSO, Firma budowlana)
> - 2x USP (Stała cena, 10 lat gwarancji)
> - 1x Social proof (200+ domów)
>
> Google AI testuje kombinacje i wybiera najlepiej konwertujące. Kalkulator to nasz unikalny wyróżnik — żaden konkurent na Śląsku go nie ma.

### Długie nagłówki (5 szt., max 90 znaków)

| # | Długi nagłówek | Znaki | Typ |
|---|---|---|---|
| 1 | Oblicz koszt budowy domu w 60 sekund — darmowy kalkulator online | 64 | CTA/Kalkulator |
| 2 | Budowa domów w Rybniku, Wodzisławiu i Jaworzno — stała cena w umowie | 69 | Geo + USP |
| 3 | Ile kosztuje budowa domu? Sprawdź SSO, deweloperski i pod klucz | 62 | CTA/Kalkulator |
| 4 | Firma budowlana z 200+ realizacjami — od fundamentu po odbiór kluczy | 68 | Social proof + Usługa |
| 5 | Budujemy domy na Śląsku — Rybnik, Wodzisław, Jaworzno. 10 lat gwarancji | 72 | Geo + USP |

### Opisy (5 szt., max 90 znaków)

| # | Opis | Znaki |
|---|---|---|
| 1 | Kalkulator budowy domu online — poznaj koszt SSO, stanu deweloperskiego i pod klucz w 60 sekund. Stała cena w umowie. | 113 |
| 2 | Budowa domów jednorodzinnych w Rybniku, Wodzisławiu Śl. i Jaworzno. Od fundamentu po odbiór kluczy. 10 lat gwarancji. | 115 |
| 3 | 200+ zrealizowanych domów. Dwie bazy: Jaworzno i Wodzisław Śl. Obsługujemy Rybnik, Gliwice, Żory, Tychy i okolice. | 113 |
| 4 | Ile kosztuje budowa domu w 2026? Skonfiguruj parametry i poznaj szczegółowy kosztorys z podziałem na etapy. Bez zobowiązań. | 121 |
| 5 | Bezpłatna analiza działki i konsultacja z inżynierem. Dobierzemy technologię do Twojego gruntu i budżetu. Zadzwoń lub napisz. | 122 |

> **Uwaga:** Opisy w PMax mogą mieć do 90 znaków (krótki) lub do 180 (długi). Powyższe to wersje długie. Google sam skróci jeśli potrzebuje.

### Obrazy (min. 15 szt.)

| # | Typ | Źródło | Format | Ilość |
|---|---|---|---|---|
| 1-5 | Realizacje — domy gotowe | Zdjęcia z realizacji CoreLTB | 1200x628 (landscape) | 5 |
| 6-8 | Budowy w trakcie | Zdjęcia z budów (etapy SSO) | 1200x628 | 3 |
| 9-11 | Projekty domów — wizualizacje | Najładniejsze z /projekty | 1200x628 | 3 |
| 12-13 | Kalkulator — screenshot | Screenshot /wycena z widoczną ceną | 1200x628 | 2 |
| 14 | Logo kwadratowe | logo-black.png na białym tle | 1200x1200 (square) | 1 |
| 15 | Logo landscape | logo na białym tle, panoramiczne | 1200x628 | 1 |

**Wymagania techniczne obrazów:**

| Parametr | Landscape | Square | Portrait |
|---|---|---|---|
| Ratio | 1.91:1 | 1:1 | 4:5 |
| Min. rozmiar | 600x314 | 300x300 | 480x600 |
| Zalecany | 1200x628 | 1200x1200 | 960x1200 |
| Max rozmiar pliku | 5 MB | 5 MB | 5 MB |

> **TODO — przygotować przed startem:**
> - [ ] 5 zdjęć gotowych realizacji (najlepsze wizualnie, widok z zewnątrz)
> - [ ] 3 zdjęcia budów w trakcie (SSO, murowanie, dach)
> - [ ] 3 wizualizacje projektów z /public/images/projekty/ (wybrać najładniejsze)
> - [ ] 2-3 screenshoty kalkulatora (dom parterowy 120m2, piętrowy 180m2 z widoczną ceną) — unikalne, przyciąga uwagę w Display
> - [ ] Logo w 2 formatach (kwadrat + landscape)

### Filmy (opcjonalnie, ale mocno zalecane)

| Typ | Długość | Treść |
|---|---|---|
| Realizacja time-lapse | 15-30 sek | Od fundamentu do dachu — przyspieszony |
| Kalkulator demo | 15-30 sek | Screen recording: konfiguracja domu → cena w 60 sek |

> PMax z filmem YouTube dostaje dodatkowy kanał dystrybucji za darmo. Nawet nagrany telefonem jest lepszy niż brak.

### Sitelinki (rozszerzenia linków)

| Tekst | URL | Opis (max 35 znaków) |
|---|---|---|
| Kalkulator budowy | /wycena/ | Oblicz koszt domu w 60 sekund |
| Projekty domów | /projekty/ | 250+ projektów z kalkulacją |
| Umów konsultację | /umow-konsultacje/ | Bezpłatna rozmowa z inżynierem |
| Analiza działki | /analiza-dzialki/ | Sprawdzimy warunki Twojej działki |
| Budowa domów — oferta | /oferta/kompleksowa-budowa-domow/ | SSO, deweloperski, pod klucz |

### Rozszerzenia dodatkowe

| Typ rozszerzenia | Treść |
|---|---|
| **Callout** (4-6 szt.) | Stała cena w umowie, 10 lat gwarancji, 200+ realizacji, Dwie bazy na Śląsku, Darmowy kalkulator online, Bezpłatna analiza działki |
| **Structured snippet** | Usługi: SSO, Stan deweloperski, Pod klucz, Nadzór budowy, Projektowanie |
| **Call extension** | +48 664 123 757 (wyświetla przycisk "Zadzwoń" na mobile) |
| **Location extension** | Podpięte z GBP (Jaworzno + Wodzisław) |
| **Price extension** | SSO od 2 800 zł/m2, Deweloperski od 4 200 zł/m2, Pod klucz od 5 500 zł/m2 |

---

## 5. Asset Group 2: "Nadzór i kierownik budowy" (MIESIĄC 2)

> **NIE uruchamiać od razu.** Nadzór to inna persona (ktoś kto JUŻ buduje i szuka inspektora), inny CPA, inne landing pages. Poczekaj aż Asset Group 1 się ustabilizuje (min. 4 tygodnie).

**Kiedy dodać:** Gdy AG1 wyjdzie z fazy nauki i CPA < 50 zł.

**Search Themes:**
- kierownik budowy
- nadzór inwestorski
- inspektor budowlany
- nadzór budowy

**Nagłówki (przykłady):**
- Kierownik Budowy — Śląsk
- Nadzór Inwestorski
- Inspektor z Uprawnieniami
- Kontrola Jakości Budowy
- Ochrona Twojego Budżetu

**Landing pages:**
- /kierownik-budowy-katowice/ (GSC: 30 imp)
- /kierownik-budowy-jaworzno/ (GSC: 32 imp)
- /kierownik-budowy-wodzislaw-slaski/ (GSC: 21 imp)

**Popyt z GSC:** ~180 impresji/mies. łącznie na frazy nadzorowe. Pozycje organiczne 4-10 — dobre, ale Ads wzmocni konwersje.

---

## 6. Wizytówki Google Business Profile

| Wizytówka | Adres | Status | Obsługuje miasta |
|---|---|---|---|
| CoreLTB Builders — Jaworzno | Grunwaldzka 34a, 43-600 | Aktywna (224+ brand szukań) | Jaworzno, Katowice, Tychy, Mikołów, Chrzanów |
| CoreLTB Builders — Wodzisław Śl. | [adres biura] | TODO: zweryfikować | Wodzisław, Rybnik, Jastrzębie, Żory, Racibórz |

### Wymagania wizytówek (PRZED startem kampanii)

- [ ] **Obie zweryfikowane** — bez weryfikacji nie ma reklam w Maps
- [ ] **Podpięte do tego samego konta Google co Google Ads**
- [ ] **Kategoria:** "Firma budowlana" (General contractor) — główna, "Firma budowlana domów" — dodatkowa
- [ ] **Godziny:** Pn-Pt 7:00-17:00, Sob 8:00-13:00 (albo realne godziny)
- [ ] **Telefon:** +48 664 123 757
- [ ] **Strona www:** https://coreltb.pl
- [ ] **Zdjęcia:** min. 10 na wizytówkę (realizacje, budowy, biuro, zespół)
- [ ] **Opis:** 750 znaków — usługi, region, kalkulator, USP

### PILNE: Opinie Google

| Fakt | Wartość |
|---|---|
| "coreltb builders opinie" w GBP | 37 szukań / 6 mies. |
| "coreltb builders opinie" w GSC | 22 impresji / 30 dni |
| Obecna liczba opinii | TODO: sprawdzić |
| **Cel przed startem Ads** | **Min. 10-15 opinii, średnia > 4.5** |

> **Dlaczego to krytyczne:** Ludzie klikają reklamę w Maps → widzą wizytówkę → sprawdzają opinie. 0 opinii = 0 zaufania = zmarnowany budżet. Poproś zadowolonych klientów o opinie TERAZ.
>
> **Hack:** Wyślij SMS do 20 ostatnich klientów z linkiem do opinii Google. 50% odpowie = 10 opinii.

---

## 7. Landing pages — mapowanie intencji na konwersje

### Kluczowa zasada: kalkulator /wycena jako główna konwersja

Kalkulator to **najsilniejszy element konwersji** na stronie. User dostaje cenę natychmiast i zostawia dane. Każdy landing page musi mieć widoczny CTA "Oblicz koszt budowy" prowadzący do /wycena.

### Mapowanie intencja → strona → konwersja

| Intencja użytkownika | Przykładowe frazy (z GSC/GBP) | Landing page (PMax wybierze sam) | Główna konwersja na stronie |
|---|---|---|---|
| Szuka firmy w mieście | "firma budowlana jaworzno" (89 GBP), "budowa domów rybnik" (78 GSC) | /obszar-dzialania/jaworzno/, /obszar-dzialania/rybnik/ | CTA "Oblicz koszt budowy" → /wycena |
| Szuka ceny / kalkulatora | "ile kosztuje budowa domu" (CPC 0.48), "kalkulator budowy domu" (CPC 0.53) | **/wycena/** | Formularz kalkulatora = konwersja |
| Szuka projektów | "projekty domów" (GSC) | /projekty/ | "Poznaj cenę budowy" → /wycena |
| Szuka nadzoru | "kierownik budowy katowice" (30 GSC) | /kierownik-budowy-katowice/ | "Umów konsultację" → /umow-konsultacje |
| Ogólne szukanie firmy | "firma budowlana śląsk" (CPC 1.43) | / (strona główna) | Hero CTA "Oblicz koszt budowy" → /wycena |
| Szuka informacji | "stan surowy otwarty" (51 GSC), "dom energooszczędny" (18 GSC) | /baza-wiedzy/[artykuł]/ | CTA w artykule → /wycena |

### Gotowość stron na kampanię Ads

**Strony lokalne (/obszar-dzialania/*):**
- [x] 11 miast z dedykowaną treścią (dzielnice, geologia, specyfika)
- [x] MidPageCTA z kalkulatorem ("Ile kosztuje budowa domu w {mieście}?" → /wycena)
- [x] Schema LocalBusiness
- [x] Telefon + CTA do konsultacji

**Kalkulator (/wycena):**
- [x] Formularz z 9 parametrami → natychmiastowa wycena
- [x] Lead capture (imię, telefon, email)
- [x] Honeypot antyspamowy
- [x] URL pre-fill z projektów (/projekty/[slug] → /wycena?params)

**Brakuje (TODO przed startem):**
- [ ] GTM + GA4 conversion tracking na wszystkich formularzach
- [ ] Phone click tracking (GTM event na kliknięcie tel:)
- [ ] UTM parametry w linkach z Ads

---

## 8. Faza nauki i optymalizacja — krok po kroku

### Przed startem (Tydzień 0) — CHECKLIST

- [ ] Konto Google Ads utworzone
- [ ] Wizytówki GBP podpięte do konta
- [ ] GTM Container osadzony w `app/layout.tsx`
- [ ] GA4 Property skonfigurowana (Measurement ID)
- [ ] 5 konwersji skonfigurowanych (phone click, 3x form submit, GBP call)
- [ ] Honeypot na formularzach (JEST)
- [ ] Cookie consent (JEST — `CookieConsent.tsx`)
- [ ] Min. 10 opinii Google na wizytówce
- [ ] 15+ zdjęć przygotowanych (realizacje, budowy, kalkulator, logo)
- [ ] Negative keywords dodane (lista z sekcji 3)
- [ ] Testowy submit każdego formularza — czy konwersja się rejestruje w GA4

### Tydzień 1-2: Faza nauki AI

| Rób | NIE rób |
|---|---|
| Codziennie sprawdzaj czy konwersje się rejestrują | Nie zmieniaj budżetu |
| Monitoruj spam/boty w leadach (honeypot powinien filtrować) | Nie zmieniaj assetów (nagłówków, opisów, zdjęć) |
| Sprawdzaj "Insights → Search term insights" | Nie wyłączaj kampanii (nawet jeśli CPA jest wysoki) |
| Dodawaj negative keywords jeśli widzisz śmieci | Nie zmieniaj strategii stawek |
| Sprawdzaj "Where ads showed" (placements) | Nie dodawaj nowych Asset Groups |
| Notuj: ile leadów, z jakiego źródła (Maps/Search/Display) | Nie panikuj — AI potrzebuje 2-4 tygodni |

> **WAŻNE:** W fazie nauki CPA będzie wysoki (nawet 100+ zł). To normalne. AI testuje różne kanały i frazy. Po 2-3 tygodniach się ustabilizuje.

### Tydzień 3-4: Pierwsza optymalizacja

| Akcja | Gdzie w panelu | Co szukasz |
|---|---|---|
| Sprawdź raport assetów | Campaigns → Assets → View details | Usuń assety z oceną "Low" (nagłówki, zdjęcia) |
| Sprawdź placements | Insights → Placement report | Wyklucz gry mobilne, aplikacje dla dzieci, strony porno |
| Sprawdź search terms | Insights → Search term insights | Dodaj negative keywords na nieistotne frazy |
| Sprawdź konwersje per źródło | Campaigns → Segments → Network | Czy Maps konwertuje? Czy Display konwertuje? |
| Oceń CPA | Campaigns → Columns → Conv. value/cost | Cel: < 50 zł. Jeśli > 100 zł → problem z konwersjami |
| Sprawdź landing pages | Insights → Landing pages | Czy /wycena konwertuje lepiej niż inne strony? |

### Miesiąc 2: Skalowanie i rozszerzanie

| Warunek | Akcja |
|---|---|
| CPA < 50 zł, 30+ leadów/mies. | Wszystko OK — nie ruszaj |
| CPA < 30 zł | Zwiększ budżet do 75-100 zł/dzień |
| CPA < 30 zł i budżet 100+ zł | Dodaj osobną kampanię Search (frazy lokalne bliskie) |
| Frazy nadzorowe w search terms | Dodaj Asset Group 2 "Nadzór i kierownik budowy" |
| CPA > 80 zł po 4 tygodniach | Sprawdź: czy konwersje się rejestrują? Czy honeypot nie blokuje realnych leadów? |
| 0 konwersji po 2 tygodniach | STOP — problem z trackingiem. Sprawdź GTM/GA4 |

### Miesiąc 3+: Dojrzała kampania

- Dodaj kampanię Search na frazy lokalne (30-50 zł/dzień) — teraz masz dane i wiesz które frazy konwertują
- Rozważ osobny Ad Group na "dom energooszczędny" (rosnący popyt, 18 imp GSC)
- Testuj brand campaign (ochrona marki — jeśli konkurenci zaczną licytować na "coreltb")
- Enhanced conversions (dane klienta → lepsza atrybucja)
- Offline conversion import (CRM → zamknięte kontrakty → Google Ads wie która fraza przyniosła klienta)
- YouTube video asset (30-60 sek z budowy → dodatkowy kanał w PMax za darmo)

---

## 9. Metryki sukcesu

### KPI

| Metryka | Cel (miesiąc 1) | Cel (miesiąc 3) | Jak mierzyć |
|---|---|---|---|
| **CPA (koszt leada)** | < 50 zł | < 30 zł | Campaigns → Cost/conv. |
| **Liczba leadów/mies.** | 20+ | 40+ | GA4 → Conversions |
| **Konwersje z /wycena** | > 40% udziału | > 60% udziału | GA4 → Landing page report |
| **Konwersje z Maps/GBP** | Monitorować | > 20% udziału | PMax → Network segment |
| **CTR (łącznie)** | > 2% | > 3% | Campaigns → CTR |
| **Impression share** | Monitorować | > 30% | Campaigns → Competitive metrics |
| **ROAS** | Nie mierzalny (długi cykl) | Pierwszy kontrakt z Ads | Ręcznie: lead → podpisana umowa |

### ROI rachunek

```
Budżet miesięczny:           1 500 zł
Śr. CPC (PMax, mix kanałów): ~1.20 zł
Kliknięć/miesiąc:            ~1 250
Konwersja strona→lead:        2-3%
Leadów/miesiąc:               25-37
CPA:                          40-60 zł

Konwersja lead→klient:        ~5%
Klientów/miesiąc:             1-2
Średni kontrakt:              500 000 zł
Przychód z Ads/miesiąc:       500 000 - 1 000 000 zł

ROAS:                         333:1 - 667:1
```

> Nawet przy 1% konwersji lead→klient i 1 kliencie na kwartał, Ads zwraca się wielokrotnie. Budowa jednego domu = 500k zł przychodu vs 4 500 zł kosztu Ads (kwartał).

---

## 10. Harmonogram wdrożenia

| Etap | Tydzień | Zadania | Kto |
|---|---|---|---|
| **Przygotowanie** | T0 | Utworzenie konta Google Ads | Dawid |
| | T0 | Podpięcie wizytówek GBP do konta Ads | Dawid |
| | T0 | GTM Container → osadzić w `app/layout.tsx` | Dev |
| | T0 | GA4 Property → Measurement ID → GTM | Dawid/Dev |
| | T0 | Konfiguracja 5 konwersji w GA4 + import do Ads | Dawid |
| | T0 | Zbieranie opinii Google (SMS do klientów) | Dawid/zespół |
| | T0 | Przygotowanie 15+ zdjęć (realizacje, kalkulator) | Dawid |
| **Start** | T1 | Utworzenie kampanii PMax wg tego dokumentu | Dawid |
| | T1 | Dodanie nagłówków, opisów, zdjęć, sitelinków | Dawid |
| | T1 | Dodanie Search Themes, negative keywords | Dawid |
| | T1 | Testowy submit formularzy → sprawdzenie czy konwersje się rejestrują | Dawid |
| | T1 | **START kampanii — 50 zł/dzień** | Dawid |
| **Nauka** | T1-T3 | Codzienny monitoring konwersji | Dawid |
| | T1-T3 | Dodawanie negative keywords na bieżąco | Dawid |
| | T1-T3 | NIE ruszać budżetu, assetów, strategii | — |
| **Optymalizacja** | T4 | Ocena assetów — usunięcie "Low" | Dawid |
| | T4 | Placement report — wykluczenia | Dawid |
| | T4 | Search term analysis — negative keywords | Dawid |
| | T4 | Ocena CPA — czy < 50 zł? | Dawid |
| **Skalowanie** | M2 | Decyzja o budżecie (zwiększyć?) | Dawid |
| | M2 | Dodanie Asset Group "Nadzór" (jeśli popyt) | Dawid |
| | M3 | Ewentualne dodanie kampanii Search | Dawid |

---

## 11. Notatki i decyzje

| Data | Decyzja / notatka |
|---|---|
| 2026-03-23 | **Analiza CPC (DataForSEO):** Frazy lokalne 0,50-2,70 zł, LOW competition. Frazy kosztowe (kalkulator) 0,40-0,54 zł — najtańsze w branży. Generalny wykonawca najdroższy (3.83 zł). |
| 2026-03-23 | **Analiza GSC (30 dni):** 585 impresji, 50+ fraz. Top miasta: Wodzisław (111 imp), Rybnik (109), Jaworzno (80+), Katowice (72), Gliwice (39). Katowice poz. 33-45 organicznie. |
| 2026-03-23 | **Analiza GBP Jaworzno (6 mies.):** "firma budowlana jaworzno" = 89 szukań (top!). Brand razem 224+. "Opinie" = 37 szukań — PILNE: zebrać opinie. |
| 2026-03-23 | **Strategia: Jedna kampania PMax, 50 zł/dzień.** Przy tym budżecie dzielenie na PMax+Search szkodzi (za mało danych do nauki). Search jako osobna kampania dopiero przy 100+ zł/dzień (M2-M3). |
| 2026-03-23 | **Focus geograficzny:** P0 = Rybnik, Wodzisław, Jaworzno (bazy, tanie CPC). P1 = Żory, Gliwice, Tychy (bliskie). P2 = Katowice, Zabrze (PMax pokryje przez Maps/Display taniej niż Search). |
| 2026-03-23 | **Kalkulator /wycena = główna konwersja.** Wartość 150 zł (najcieplejszy lead). 4/15 nagłówków to CTA kalkulatorowe. Unikalny wyróżnik — konkurencja nie ma kalkulatora online. |
| 2026-03-23 | **Nadzór/kierownik budowy:** Wyodrębniony do osobnego Asset Group na miesiąc 2. Inna persona (ktoś kto JUŻ buduje), inny CPA. GSC: ~180 imp/mies. łącznie. |
| 2026-03-23 | **Negative keywords:** Rozszerzona lista: praca, edukacja, poza zasięgiem, nie nasza technologia (szkieletowy/modułowy), remont, false positives kalkulatora (excel/arkusz), sprzedaż działek. |
| 2026-04-05 | **Native Conversion Tag** wdrożony w GTM — eliminuje opóźnienie 24-72h w raportowaniu konwersji do Google AI. |
| 2026-04-05 | **Analiza 12 dni kampanii (25 mar - 5 apr):** 616 zł wydane, 646 kliknięć, CPC 0.95 zł, 10 konwersji (primary), CPA 61.63 zł. Trend: CPA spadł z 74 zł (T1) do 47 zł (T2). /wycena konwertuje 5x lepiej niż homepage (3.16% vs 0.64%). Czwartki najlepsze (4 konw., CPA 22 zł). Godziny 16-21 = 60% konwersji. |
| 2026-04-05 | **PROBLEM: Gate'owany kalkulator generuje fejki.** Cena widoczna DOPIERO po zostawieniu danych kontaktowych. Szacunkowo 40-55% leadów to fejkowe numery (ludzie wpisują byle co żeby zobaczyć cenę). Google Ads AI optymalizuje na tych fejkach = zatruwa algorytm. Decyzja: wdrożyć hybrydę (Opcja C) — patrz sekcja 12. |
| 2026-04-05 | **Decyzja PMax vs Search:** Zostajemy na PMax do końca kwietnia (faza nauki). W maju testujemy hybrydę: Search 30 zł/dzień na top frazy kosztowe + PMax 20 zł/dzień na awareness/remarketing. |

---

## 12. Hybryda kalkulatora — "Opcja C" (ZAPLANOWANE)

> **Status:** Do wdrożenia po potwierdzeniu jakości leadów z klientem
> **Priorytet:** WYSOKI — wpływa na jakość danych dla Google Ads AI
> **Szacowany czas wdrożenia:** ~1h, 2 pliki, 0 zmian w backendzie

### Problem

Kalkulator na `/wycena` jest **gate'owany** — użytkownik musi zostawić telefon i email ZANIM zobaczy cenę. To powoduje:

- ~40-55% leadów to fejkowe dane (ludzie wpisują byle co żeby zobaczyć cenę)
- Google Ads AI uczy się na fejkach = optymalizuje pod niewłaściwy profil
- Klient marnuje czas na dzwonienie do nieistniejących numerów
- Realny CPA jest ~2x wyższy niż raportowany (125 zł zamiast 62 zł)

### Rozwiązanie: Hybryda (zakres ceny + szczegóły za dane)

**Obecny flow:**
```
Konfiguracja (9 kroków) -> Dane kontaktowe -> Cena
```

**Nowy flow:**
```
Konfiguracja (9 kroków) -> ZAKRES CENY (widoczny dla wszystkich)
                                |
                    "Chcę szczegółową wycenę z rozpisem na etapy"
                                |
                        Dane kontaktowe -> Pełna wycena PDF
```

### Co widzi użytkownik po konfiguracji (PRZED podaniem danych):

```
+-------------------------------------------+
|  Szacunkowy koszt budowy                   |
|                                            |
|  350 000 - 420 000 zl netto               |
|  ~2 900 zl/m2  ·  10-13 miesiecy          |
|                                            |
|  Parterowy 120 m2, silikat, dwuspadowy    |
|  Stan deweloperski, pompa ciepla           |
|                                            |
|  Cena orientacyjna +/-6%.                  |
|                                            |
|  [Chce szczegolowa wycene z rozpisem]      |
|                                            |
|  Bezplatnie · Oddzwonimy w 24h             |
+-------------------------------------------+
```

### Czego NIE widzi (dostępne dopiero po podaniu danych):

- Rozbicie na etapy (Stan Zero, SSO, SSZ, Deweloperski, Pod klucz)
- Lista prac per etap (bullet points)
- Dokument PDF z nagłówkiem firmy i numerem referencyjnym
- Cena brutto z VAT
- Gwarancja i czas realizacji szczegółowy

### Prognozowany wpływ na metryki

| Metryka | Teraz | Po zmianie |
|---------|-------|------------|
| Leadów/mies. | 10 | 5-7 (spadek!) |
| Fejki | ~40-55% | ~10-15% |
| **Prawdziwych leadów** | **4-6** | **4-6** (to samo) |
| Lead -> Spotkanie | ~10% | ~25-35% |
| CPA (prawdziwy) | ~125 zł | ~80-100 zł |
| Jakość danych Ads AI | Zatruta | Czysta |

### Nowy 3-stopniowy funnel analytics

| Event | Moment | Typ w Google Ads |
|-------|--------|------------------|
| `price_preview_shown` | User zobaczył zakres ceny | Observe (micro) |
| `price_preview_cta` | User kliknął "chcę szczegóły" | Observe (micro) |
| `calculator_lead` | User zostawił dane i dostał pełną wycenę | Primary (konwersja) |

Micro-conversions (`price_preview_shown/cta`) dają Google AI dodatkowe sygnały nawet przy mniejszej liczbie primary conversions.

### Zmiany techniczne

| Co | Gdzie | Opis |
|----|-------|------|
| State `pricePreview` + `showContactSection` | `CalculatorForm.tsx` | Nowe stany do sterowania widocznością |
| `useEffect` auto-preview | `CalculatorForm.tsx` | Po wypełnieniu 8 OptionGroups automatycznie liczy cenę z `calculateEstimate()` |
| Komponent `PricePreviewCard` | `CalculatorForm.tsx` (inline) | Karta z zakresem ceny, summary konfiguracji, CTA button |
| Sekcja 4 ukryta domyślnie | `CalculatorForm.tsx` | `showContactSection && <FormSection>` |
| 2 nowe eventy | `lib/analytics.ts` | `trackPricePreviewShown()`, `trackPricePreviewCTA()` |

**Zero zmian w:** `data/pricing.ts`, `functions/api/lead.ts`, `app/wycena/page.tsx`

### Kiedy wdrożyć

| Warunek | Termin |
|---------|--------|
| Potwierdzenie od klienta ile leadów to fejki | ASAP |
| Jeśli fejki > 30% | Wdrożenie natychmiast |
| Jeśli fejki < 20% | Odłożyć, obecny model działa |
| Idealne okno | Początek nowego tygodnia (poniedziałek rano) |

### Czy kampania PMax zacznie się uczyć od nowa?

**NIE.** Zmiana landing page'a nie resetuje fazy nauki PMax. Co się stanie:

1. **Przez 3-5 dni** — Google zauważy niższy conversion rate (mniej fejków = mniej "konwersji")
2. **Po 5-7 dniach** — AI dostosuje bidding do nowego, niższego wolumenu konwersji
3. **Po 2-3 tygodniach** — AI zacznie lepiej targetować bo uczy się na prawdziwych leadach

**Nie jest to "reset" — to "rekalibracja".** Algorytm nie traci dotychczasowej wiedzy o frazach i audience. Zmienia się tylko sygnał konwersji (lepszy jakościowo).

**Tip:** Wdrożenie w poniedziałek rano daje AI cały tydzień na dostosowanie się przed weekendem (kiedy jest więcej ruchu).

### Design PricePreviewCard — szczegółowy plan UI

Karta pojawia się automatycznie po wypełnieniu wszystkich 8 OptionGroups (area + 7 opcji). Animowane wjechanie (CSS transition, opacity + translateY). Umiejscowienie: między sekcją 3 (Standard i wyposażenie) a ukrytą sekcją 4 (Dane).

**Struktura karty (5 bloków, od góry do dołu):**

#### Blok 1: Cena glowna (hero)

Jedna srednia kwota (nie zakres!) z dopiskiem +/-6%. Anchoring — konkretna liczba buduje pewnosc.

```
Szacunkowy koszt Twojego domu

      382 000 zl  netto (+/-6%)
      brutto: ~412 500 zl (8% VAT)
      ~3 180 zl/m2  ·  10-13 miesiecy
```

Stylowanie: `text-h3 md:text-h1 font-bold`, cena w `text-text-primary`, reszta `text-gray-500`.

#### Blok 2: Summary konfiguracji

Jedna kompaktowa linia z Icon komponentami potwierdzajaca wybory usera:

```
[house] Parterowy 120 m2 · Silikat · Dwuspadowy · Deweloperski · Pompa ciepla
```

Uzywa istniejacych LABELS z `data/pricing.ts`. Stylowanie: `text-body-sm text-gray-600`, ikony `text-primary`.

#### Blok 3: TEASER etapow (klucz do konwersji)

5 etapow budowy z ZAMAZANYMI cenami (CSS `filter: blur(8px)` na kwotach). User widzi STRUKTURE ale nie DETALE. Mechanizm curiosity gap — "ile kosztuje sam dach?"

```
Twoja wycena zawiera rozpiske na 5 etapow:

[check] Stan Zero                    ░░░░░░░ zl
        Fundamenty, kanalizacja...

[check] Stan Surowy Otwarty          ░░░░░░░ zl
        Sciany, dach, kominy...

[check] Stan Surowy Zamkniety        ░░░░░░░ zl
        Okna, instalacje, garaz...

[check] Stan Deweloperski            ░░░░░░░ zl
        Ogrzewanie, tynki, elewacja...

[check] Wykonczenie pod klucz        ░░░░░░░ zl
        Podlogi, lazienki, malowanie...

+ lista 30+ pozycji prac w kazdym etapie
+ dokument PDF z naglowkiem firmy
+ gwarancja i harmonogram
```

Etapy wyswietlane dynamicznie z `estimate.stages` (te same co w pelnym dokumencie). Ilosc etapow zalezy od wybranego `finish` (SSO = 3 etapy, deweloperski = 4, pod klucz = 5).

Blur implementacja: `<span className="blur-sm select-none">{formatPrice(stageTotal)} zl</span>`.

#### Blok 4: CTA button

Duzy, zielony (`bg-primary`), dwie linie tekstu. Konkretna obietnica, nie generyk.

```
[fileText] Odbierz wycene z rozpisem na 5 etapow budowy

           Oddzwonimy w 24h z dokladna kalkulacja
           dopasowana do Twojego projektu
```

Pierwsza linia: `font-bold text-body-md`. Druga: `text-body-sm font-normal opacity-80`.
Przycisk: `py-5 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5` (identyczny styl jak obecny submit).

onClick: `handleRevealContact()` — odsłania sekcję 4, smooth scroll, trackuje event.

#### Blok 5: Trust line

```
Wystarczy imie i telefon · Bezplatnie · Bez zobowiazan

Ponad 200 rodzin skorzystalo z naszego kalkulatora
```

`text-body-xs text-gray-400`, centered.

**Calość karty:** `bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden` — identyczny styl jak estimate document.

#### Psychologia designu

| Element | Mechanizm | Efekt |
|---------|-----------|-------|
| Jedna kwota (nie zakres) | Anchoring | "Moj dom kosztuje 382 tys." |
| Blurred ceny etapow | Curiosity gap | "Ile kosztuje sam dach? Musze zobaczyc" |
| "5 etapow" + nazwy | Perceived value | "To profesjonalny kosztorys, nie byle formularz" |
| "30+ pozycji prac" | Specificity | Konkretna liczba > "szczegolowa wycena" |
| "Oddzwonimy w 24h" | Expectation setting | Wie co sie stanie = mniejszy opor |
| "Wystarczy imie i telefon" | Effort reduction | "Tylko 2 pola? OK" |
| Summary konfiguracji | Sunk cost | "Juz to wybralem, szkoda nie dokonczyc" |

### Jak wyjaśnić klientowi

**Krótka wersja (SMS/telefon):**

> "Kalkulator teraz pokazuje cenę dopiero po zostawieniu telefonu — przez to połowa ludzi wpisuje byle jaki numer żeby zobaczyć ile kosztuje. Chcemy to zmienić: klient zobaczy zakres ceny od razu (np. 350-420 tys.), a jak chce szczegółowy kosztorys z etapami — dopiero wtedy zostawi numer. Mniej zgłoszeń, ale same prawdziwe."

**Dłuższa wersja (mail/spotkanie):**

> Temat: Poprawa jakości leadów z kalkulatora
>
> Cześć,
>
> Z analizy kampanii Google Ads wynika, że kalkulator generuje ok. 10 zgłoszeń miesięcznie,
> ale spora część to mogą być nieprawdziwe numery — ludzie wpisują byle co żeby zobaczyć cenę.
>
> Chcemy to naprawić prostą zmianą:
> 1. Klient konfiguruje dom (jak teraz)
> 2. OD RAZU widzi zakres ceny (np. "350 000 - 420 000 zł")
> 3. Jak chce szczegółowy kosztorys z rozpisem na etapy — dopiero wtedy zostawia telefon
>
> Co to da:
> - Mniej zgłoszeń (7 zamiast 10), ale SAME PRAWDZIWE
> - Nie tracisz czasu na dzwonienie do fejkowych numerów
> - Google Ads lepiej się uczy i z czasem będzie kierować reklamy do poważniejszych klientów
>
> Zanim to wdrożymy — pytanie: z tych ~10 zgłoszeń które przyszły,
> ile numerów było prawdziwych? Ile razy udało się dodzwonić?
> To pomoże nam ocenić skalę problemu.
>
> Zmiana jest odwracalna w 5 minut gdyby coś nie grało.

---
