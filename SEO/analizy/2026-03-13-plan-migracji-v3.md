# Plan Migracji v3 — Szczegółowe Ustalenia
**Data:** 2026-03-13
**Status:** W trakcie — uzupełniany temat po temacie

---

## TEMAT 1: Dom energooszczędny ✅ USTALONY

### Dane źródłowe (GSC, 12 mies.)
| Fraza | Imp | Poz | Stara strona |
|---|---|---|---|
| dom energooszczędny śląsk | 341 | **5.3** | /oferta/budowa/dom-energooszczedny-slask |
| budowa domów energooszczędnych śląsk | 264 | 33.7 | j.w. |
| bezpieczny dom śląskie | 203 | 14.4 | j.w. |
| dom pasywny śląsk | ~80 | ~20 | — |
| **SUMA** | **~1 672** (stara strona łącznie) | — | — |

### Decyzja
**Blog post** jako główny landing + **krótka wzmianka** na stronie ofertowej budowy.

### Uzasadnienie
- Intencja użytkownika: research/edukacyjna — szuka wiedzy o technologii, kosztach, normach
- Strona /oferta/kompleksowa-budowa-domow to 8-etapowy timeline o generalnym wykonawstwie — użytkownik szukający "dom energooszczędny" lądowałby w złym kontekście
- Sekcja na dole strony ofertowej = ~6000px scrollu, pogo-sticking, spadek pozycji
- Blog post trafia idealnie w intencję + daje dedykowany URL do rankowania

### Co robimy

#### A) Blog post: `/baza-wiedzy/dom-energooszczedny-slask`
- **Tytuł roboczy:** "Dom energooszczędny na Śląsku — technologie, koszty, nowe normy WT2026"
- **Objętość:** 2000-2500 słów
- **Frazy do wbicia:** dom energooszczędny, dom energooszczędny śląsk, budowa domów energooszczędnych, dom pasywny, normy WT2026, pompa ciepła, rekuperacja, fotowoltaika
- **Struktura:**
  - Co to jest dom energooszczędny (definicja, parametry)
  - Nowe normy WT2026 (wchodzą wrzesień 2026) — U=0.15 ściany, U=0.12 dach, zakaz kotłów kopalnych
  - Technologie: pompa ciepła + rekuperacja + fotowoltaika + izolacja
  - Koszty: ile więcej vs standard (tabela porównawcza)
  - Specyfika Śląska: tereny górnicze + jakość powietrza (smog → rekuperacja z filtracją)
  - FAQ (5-6 pytań) z FAQ schema
- **CTA w artykule:**
  - Link do /oferta/kompleksowa-budowa-domow
  - Link/formularz do /kontakt (wycena)
- **Priorytet:** P0 (redirect musi mieć sensowny landing)

#### B) Wzmianka na stronie ofertowej budowy
- **Gdzie:** W etapie 2 "Projekt" (sekcja `cooperationTimelineNoLine`)
- **Co:** Rozbudować istniejący bullet o projektach indywidualnych + dodać zdanie o energooszczędności z linkiem do bloga
- **Cel:** Internal linking, nie landing page

#### C) Redirect
```
/oferta/budowa/dom-energooszczedny-slask → /blog/dom-energooszczedny-slask 301
```

### Czego NIE robimy
- ❌ Osobna strona ofertowa /oferta/domy-energooszczedne — to nie osobna usługa, to wariant budowy
- ❌ Sekcja na dole strony budowy jako landing — złe dopasowanie do intencji, pogo-sticking

---

## TEMAT 2: Nadzór budowlany per-miasto ✅ WDROŻONY

### Dane źródłowe (GSC, 12 mies.)
| Fraza | Imp | Poz | Klik | Stara strona |
|---|---|---|---|---|
| kierownik budowy katowice | 995 | **7.2** | 7 | /nadzor-budowy/nadzor-budowy-katowice |
| nadzór budowy katowice (strona) | 3 166 | 22.5 | 13 | j.w. |
| kierownik budowy jaworzno | 446 | 12.7 | 1 | /nadzor-budowy |
| inspektor kierownik budowy jaworzno | 419 | **6.9** | 0 | j.w. |
| nadzór inwestorski katowice | 418 | 24.8 | 0 | /nadzor-budowy-katowice |
| kierownik budowy wodzisław śląski | 307 | **7.5** | 2 | /nadzor-budowy-wodzislaw |
| nadzór budowy wodzisław (strona) | 482 | 7.7 | 15 | j.w. |
| nadzór budowlany katowice | 241 | 18.1 | 0 | — |
| kierownik budowy śląsk | 235 | 45.3 | 0 | — |
| **SUMA** | **~5 500** | — | **~38** | — |

### Kluczowe ustalenia z researchu

#### Kto rankuje na te frazy?
| Typ | Udział w TOP 10 | Przykłady |
|---|---|---|
| Katalogi/portale | ~30% | Oferteo, OLX, Fixly, Muratordom |
| Dedykowane firmy nadzoru | ~50% | Proinvestbud, Passiva, Sarvic, SMARTA, TPI |
| Jednoosobowe działalności | ~10% | AdrianMajor, wizytówki PIIB |
| Generalni wykonawcy | ~5% | CoreLTB (jedyny GW w TOP 10!) |
| Urzędy | ~5% | PINB, WINB |

**CoreLTB jest JEDYNYM generalnym wykonawcą w TOP 10.** Żaden inny GW (Skolbud, AZISbud, Dom Pełen Energii) nie rankuje na frazy nadzorowe. Duże firmy budowlane nie walczą o te frazy — usługa za 5 000 zł vs budowa za 500 000+ zł.

#### Feedback klienta
- ✅ Klient potwierdził: **"lead wpadł"** — frazy konwertują
- ✅ Cennik jawny: **kierownik/inspektor od 5 000 zł brutto**
- ✅ Realizuje to osoba: **Tomasz**
- ❓ Nie wiemy ile leadów rocznie — do weryfikacji z klientem

#### Realistyczna prognoza
| Scenariusz | Pozycja | Klik/rok | Leady/rok |
|---|---|---|---|
| Teraz (stara strona, thin content) | 7-22 | ~38 | ~1-2 |
| Po migracji (redirect na /oferta/nadzor) | 15-30 | ~15-25 | ~1 |
| Dedykowany landing (800 sł, cennik, FAQ) | 8-15 | ~40-60 | ~2-3 |

Nie wskoczysz z 7 na 3 — na pozycjach 1-5 siedzą katalogi (Oferteo, Fixly) i firmy specjalizujące się TYLKO w nadzorze.

### Decyzja
**Dedykowane landingi per-miasto** — flat routing, krótkie strony z cennikiem i FAQ. ~~Priorytet P2~~ **WDROŻONE 2026-03-13.**

### Co robimy

#### A) 3 landingi nadzoru per-miasto

**URL-e:**
- `/kierownik-budowy-katowice`
- `/kierownik-budowy-jaworzno`
- `/kierownik-budowy-wodzislaw-slaski`

**Routing:** 3 statyczne foldery w `app/` (wybrana opcja — brak konfliktu z innymi root routes)

**Format strony (hybrid — ~800 słów):**
- **Hero:** H1 "Kierownik budowy {miasto}", krótki subtitle 2-3 zdania, CTA
- **Cennik:** Jawny — "od 5 000 zł brutto" (wyróżnik! żaden konkurent tego nie ma)
- **Zakres usług:** 3-4 bullet pointy (kierownik budowy, inspektor nadzoru, odbiory techniczne, audyt budowy)
- **Specyfika lokalna:** 100-150 słów — szkody górnicze, PINB lokalny, specyfika terenu per miasto
- **FAQ:** 3-4 pytania z FAQ schema (ile kosztuje, kiedy warto, co sprawdzamy)
- **CTA:** Telefon + formularz kontaktowy
- **Link:** "Szczegóły usługi → /oferta/nadzor-i-doradztwo"

**Frazy docelowe per landing:**
- Katowice: kierownik budowy katowice, nadzór inwestorski katowice, inspektor nadzoru katowice
- Jaworzno: kierownik budowy jaworzno, inspektor nadzoru jaworzno
- Wodzisław: kierownik budowy wodzisław śląski, nadzór budowlany wodzisław

**Treść musi być lepsza od starej strony** — stara miała ~440 słów generycznego tekstu Venet. Nowe landingi: 800 słów, jawny cennik (USP!), FAQ schema, lokalna specyfika, CTA z formularzem.

#### B) Redirecty
```
/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-katowice → /kierownik-budowy-katowice 301
/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-wodzislaw-slaski → /kierownik-budowy-wodzislaw-slaski 301
/oferta/uslugi-techniczne/nadzor-budowy → /oferta/nadzor-i-doradztwo 301
```
Jaworzno nie miało dedykowanej strony na starej witrynie — landing tworzony od zera.

#### C) Linkowanie wewnętrzne
| Miejsce | Typ linku | Priorytet |
|---|---|---|
| `/oferta/nadzor-i-doradztwo` | Sekcja "Gdzie działamy" z listą 3 miast + cennik | 🔴 Obowiązkowe |
| `/obszar-dzialania/katowice` (i Jaworzno, Wodzisław) | Jedna linijka cross-sell: "Potrzebujesz tylko kierownika? Od 5000 zł →" | 🟡 Zalecane |
| Footer | Lista w sekcji "Usługi" | 🟡 Zalecane |
| `/oferta` (hub) | Sub-linki pod kafelkiem nadzoru | 🟢 Opcjonalne |

#### D) Czego NIE linkować
- ❌ Nie w nawigacji głównej — marginalna usługa
- ❌ Nie w homepage hero/sekcjach głównych — nie zasługuje na prime real estate

### Priorytet
~~P2 — po migracji~~ **WDROŻONE** — 3 landingi gotowe, redirecty do aktualizacji.

### Status wdrożenia (2026-03-13)
| Element | Status |
|---|---|
| `data/nadzor/types.ts` — interfejsy | ✅ Gotowe |
| `data/nadzor/index.ts` — merge logic, public API | ✅ Gotowe |
| `data/nadzor/cities/katowice.ts` | ✅ Gotowe (~350 linii) |
| `data/nadzor/cities/wodzislaw-slaski.ts` | ✅ Gotowe (~350 linii) |
| `data/nadzor/cities/jaworzno.ts` | ✅ Gotowe (~330 linii) |
| `app/kierownik-budowy-katowice/page.tsx` | ✅ Gotowe |
| `app/kierownik-budowy-wodzislaw-slaski/page.tsx` | ✅ Gotowe |
| `app/kierownik-budowy-jaworzno/page.tsx` | ✅ Gotowe |
| Linkowanie z `/oferta/nadzor-i-doradztwo` (areasData) | ✅ Gotowe |
| Sitemap — nadzór pages | ✅ Gotowe |
| Schema.org (Service + FAQPage + LocalBusiness + Breadcrumb) | ✅ Gotowe |
| Redirecty w `_redirects` | ⚠️ DO AKTUALIZACJI (zmienić target z `/oferta/nadzor-i-doradztwo` na docelowe landingi) |
| Cross-link ze stron lokalnych (`/obszar-dzialania/[miasto]`) | 🟡 Zalecane — do wdrożenia |

### Czego NIE robimy
- ❌ Sekcji per-miasto na istniejącej stronie /oferta/nadzor-i-doradztwo — nie robimy z niej "potwora"
- ❌ Podstron pod /oferta/nadzor-i-doradztwo/katowice — ingerencja w architekturę routing
- ❌ Sekcji nadzoru na stronach lokalnych jako landing — strony lokalne to budowa domów, nie nadzór
- ❌ Osobnej pozycji w nawigacji — za mało ważne

---

## TEMAT 3: Strona lokalna Zabrze ✅ USTALONY

### Dane źródłowe (GSC, 12 mies.)
| Fraza | Imp | Poz | Klik |
|---|---|---|---|
| budowa domów jednorodzinnych zabrze | 244 | **7.5** | 1 |
| budowa domów zabrze | ~500 | ~15 | 2 |
| firma budowlana zabrze | ~300 | ~18 | 1 |
| **SUMA (stara strona)** | **1 333** | 19.4 | 4 |

Stara strona: `/oferta/budowa/budowa-zabrze` — 422 słowa, generyczny template Venet.

### Decyzja
Nowa strona lokalna `/obszar-dzialania/zabrze` — pełna strona jak inne miasta (Layout A).

### Co robimy
- **Plik:** `data/local/cities/zabrze.ts` — bazujemy na szablonie Gliwic (najbliższe miasto)
- **Import:** Dodać do `data/local/index.ts` → `allCities[]`
- **Obrazy:** Potrzebne hero + specyfika budowy (do dostarczenia)
- **Priorytet:** P0 (przed migracją)
- **Szacowany nakład:** 2-3h (teksty + dane + zdjęcia)

### Uwagi do treści
- **Specyfika:** Tereny pogórnicze (historyczna eksploatacja), bliskość Gliwic — wspólny rynek
- **Dzielnice:** Biskupice, Helenka, Rokitnica, Centrum, Osiedle Kotarbińskiego, Makoszowy, Mikulczyce
- **NearbyCities:** Gliwice, Katowice, Mikołów (lub Rybnik)
- **Konkurencja słaba:** Dominują katalogi (Oferteo, OLX, Fixly), jedyna lokalna firma to DAR'C (stara strona, od 1991). Brak silnego gracza z rozbudowaną treścią — łatwe wejście do TOP 3
- **Redirect:** `/oferta/budowa/budowa-zabrze → /obszar-dzialania/zabrze 301`

---

## TEMAT 4: Sekcja projektów indywidualnych na stronie Katowice ✅ USTALONY

### Dane źródłowe (GSC, 12 mies.)
| Fraza | Imp | Poz | Klik | Stara strona |
|---|---|---|---|---|
| indywidualne projekty katowice | 353 | **3.9** ← TOP 4! | 0 | /projekty-indywidualne-katowice |
| **Stara strona łącznie** | **1 151** | 13.6 | 3 | j.w. |

### Decyzja
Dodać sekcję o projektach indywidualnych na istniejącej stronie `/obszar-dzialania/katowice`.

### Co robimy
- **Gdzie:** Nowa `additionalSection` w `data/local/cities/katowice.ts`
- **Treść:** ~200 słów o projektowaniu domów indywidualnych w Katowicach, współpraca z architektami znającymi lokalne MPZP, link do `/oferta/projektowanie`
- **Frazy do wbicia:** indywidualne projekty katowice, projekt domu katowice, projektowanie domów katowice
- **Priorytet:** P0 (chronimy pozycję 3.9!)
- **Redirect:** `/oferta/projekty/projekty-indywidualne/projekty-indywidualne-katowice → /obszar-dzialania/katowice 301`

### Uwagi
- Obecna strona Katowice NIE MA żadnej wzmianki o projektach indywidualnych
- Na stronie budowy (etap 2 "Projekt") jest bullet "Projekty indywidualne" — ale to nie wystarczy, bo redirect ląduje na stronie Katowice
- Sekcja musi naturalnie wpleść frazę "indywidualne projekty" w kontekst Katowic

---

## TEMAT 5: Strona lokalna Żory ✅ USTALONY

### Dane źródłowe (GSC, 12 mies.)
| Fraza | Imp | Poz | Klik |
|---|---|---|---|
| budowa domów żory | 229 | 16.5 | 0 |
| budowa domu żory | 203 | 13.3 | 0 |
| firma budowlana żory | ~80 | ~20 | 1 |
| **SUMA (stara strona)** | **581** | 18.6 | 1 |

Stara strona: `/oferta/budowa/budowa-zory` — 436 słów, generyczny template Venet.

### Decyzja
Nowa strona lokalna `/obszar-dzialania/zory` — pełna strona jak inne miasta (Layout A).

### Co robimy
- **Plik:** `data/local/cities/zory.ts` — bazujemy na szablonie Rybnika (najbliższe miasto)
- **Import:** Dodać do `data/local/index.ts` → `allCities[]`
- **Obrazy:** Potrzebne hero + specyfika budowy (do dostarczenia)
- **Priorytet:** P1 (miesiąc 1 po migracji)
- **Szacowany nakład:** 2-3h

### Uwagi do treści
- **Specyfika:** Mniejsze miasto (62k), aktywny rynek budowlany, bliskość Rybnika i Jastrzębia-Zdroju
- **Dzielnice:** Centrum, Kleszczówka, Os. Sikorskiego, Rowień, Folwarki, Rój, Osiny
- **NearbyCities:** Rybnik, Wodzisław Śląski, Jastrzębie-Zdrój (lub Mikołów)
- **Konkurencja:** Silniejsza niż Zabrze — Solitar (fabryka domów prefabrykowanych), TIKPRO, SCHIER, NaszDomek.eu. Ale żadna nie ma rozbudowanej strony jak model CoreLTB
- **Redirect:** `/oferta/budowa/budowa-zory → /obszar-dzialania/zory 301`

---

## TEMAT 6: SSO / Stan zero / Kosztorysowanie ✅ USTALONY

### Dane źródłowe (GSC, 12 mies.)
| Stara strona | Imp | Poz | Klik | Intencja |
|---|---|---|---|---|
| `/stan-surowy-otwarty` | 1 901 | 54.9 | 0 | 100% informacyjna |
| `/stan-zero` | 1 027 | 25.3 | 1 | 100% informacyjna |
| `/stan-pod-klucz` | 133 | 64.0 | 0 | informacyjna |
| `/oferta/uslugi-techniczne/kosztorysowanie` | 928 | 19.6 | 0 | informacyjna/narzędziowa |
| **SUMA** | **~3 989** | — | **1** | — |

### Decyzja
**Redirect** do istniejących stron + **blog posty** zaplanowane na P1-P2.

### Uzasadnienie
- Pozycje 25-65 — zero kliknięć, zero konwersji
- Strona budowy (etap 6 "Realizacja") i `BuildingStagesSection` na stronach lokalnych już pokrywają SSO/deweloperski kontekstowo
- Redirect nie pogorszy sytuacji, bo sytuacja jest zerowa
- Blog posty łapią intencję informacyjną lepiej niż strona ofertowa

### A) Redirecty
```
/stan-surowy-otwarty                        → /oferta/kompleksowa-budowa-domow 301
/stan-zero                                  → /oferta/kompleksowa-budowa-domow 301
/stan-pod-klucz                             → /oferta/kompleksowa-budowa-domow 301
/oferta/uslugi-techniczne/kosztorysowanie   → /oferta/uslugi-techniczne 301
```

### B) Blog posty — plan contentowy

#### BLOG 1: "Stan surowy otwarty — co zawiera, ile kosztuje, na co uważać" (P1)
- **URL:** `/baza-wiedzy/stan-surowy-otwarty`
- **Objętość:** 2500+ słów
- **Frazy docelowe:** stan surowy otwarty (1 112 imp), SSO co to jest, koszt stanu surowego otwartego, co zawiera SSO
- **Struktura:**
  - Definicja SSO — co wchodzi w zakres
  - Tabela kosztów SSO na Śląsku (2026, ceny za m²)
  - Zdjęcia z realizacji CoreLTB na etapie SSO
  - Ile trwa budowa do SSO
  - Na co uważać — najczęstsze błędy
  - FAQ (5-6 pytań) z FAQ schema
  - HowTo schema (etapy budowy do SSO)
- **CTA:** "Chcesz wycenę SSO? → /kontakt", "Budujemy kompleksowo → /oferta/kompleksowa-budowa-domow"

#### BLOG 2: "Ile kosztuje budowa domu na Śląsku w 2026? Realny cennik" (P1)
- **URL:** `/baza-wiedzy/koszt-budowy-domu-2026-cennik` (ten link już istnieje 3x na stronie budowy!)
- **Objętość:** 3000+ słów
- **Frazy docelowe:** kosztorys budowy domu (928 imp), ile kosztuje budowa domu, koszt budowy domu 2026, cena budowy domu za m²
- **Struktura:**
  - Tabela kosztów per etap (stan zero, SSO, deweloperski, pod klucz)
  - Porównanie: system gospodarczy vs generalny wykonawca
  - Koszty ukryte (przyłącza, zagospodarowanie, geotechnika)
  - Specyfika Śląska — szkody górnicze = droższe fundamenty
  - Przykładowy kosztorys domu 120 m² i 150 m²
  - FAQ z FAQ schema
- **CTA:** "Zamów indywidualny kosztorys → /kontakt"
- **UWAGA:** Ten URL jest już linkowany 3x ze strony budowy i 1x ze strony projektowania jako `/baza-wiedzy/koszt-budowy-domu-2026-cennik`. Trzeba zdecydować: `/blog/` czy `/baza-wiedzy/`? Patrz sekcja "Routing blogów" poniżej.

#### BLOG 3: "Stany budowy domu — SSO vs deweloperski vs pod klucz" (P2)
- **URL:** `/baza-wiedzy/stany-budowy-domu-porownanie`
- **Objętość:** 2500+ słów
- **Frazy docelowe:** stan surowy zamknięty (136 imp), stan deweloperski co to, pod klucz co zawiera, różnice SSO deweloperski
- **Struktura:**
  - Tabela porównawcza: co zawiera każdy stan (zakres prac)
  - Tabela kosztów: cena za m² per stan
  - Który stan wybrać? (decision tree)
  - Zalety i wady każdego wariantu
  - FAQ z FAQ schema
- **CTA:** "Wybierz swój wariant → /kontakt"

#### BLOG 4: "Stan zero budowy — co to jest i ile kosztuje?" (P2)
- **URL:** `/baza-wiedzy/stan-zero-budowy`
- **Objętość:** 2000 słów
- **Frazy docelowe:** stan zero budowy domu (~150 imp), co to stan zero, ile kosztuje stan zero
- **Struktura:**
  - Definicja + zakres prac
  - Koszt (tabela)
  - Fundamenty na Śląsku — specyfika
  - FAQ
- **CTA:** "Wycena fundamentów → /kontakt"

### C) Linkowanie blogów — skąd i dokąd

#### Linki DO blogów (skąd linkujemy):

| Blog post | Linkowanie z... | Jak |
|---|---|---|
| **SSO poradnik** | `/oferta/kompleksowa-budowa-domow` etap 6 "Realizacja" | Już jest bullet o SSO — dodać link |
| | Strony lokalne — `BuildingStagesSection` (etap SSO) | Link w opisie etapu |
| | Blog "Stany budowy porównanie" | Cross-link |
| **Koszt budowy 2026** | `/oferta/kompleksowa-budowa-domow` etap 5 "Finanse" | **Link JUŻ ISTNIEJE** (`/baza-wiedzy/koszt-budowy-domu-2026-cennik`) — zmienić URL! |
| | `/oferta/kompleksowa-budowa-domow` etap 6 "Realizacja" | Link w kontekście cen |
| | `/oferta/projektowanie` | **Link JUŻ ISTNIEJE** — zmienić URL! |
| | Strony lokalne — FAQ "Ile kosztuje budowa domu w {mieście}?" | Dodać link w odpowiedzi |
| | Homepage — sekcja usług (opcjonalnie) | Opcjonalne |
| **Stany budowy porównanie** | `/oferta/kompleksowa-budowa-domow` | Link przy opisie stanów |
| | Blog "SSO poradnik" | Cross-link |
| | Blog "Stan zero" | Cross-link |
| **Stan zero** | `/oferta/kompleksowa-budowa-domow` etap 6 | Link przy fundamencie |
| | Strony lokalne — expertise (fundamenty) | Link kontekstowy |
| | Blog "Stany budowy porównanie" | Cross-link |

#### Linki Z blogów (dokąd linkujemy):

| Z bloga... | Link do... | Cel |
|---|---|---|
| Każdy blog post | `/oferta/kompleksowa-budowa-domow` | Główna konwersja — "budujemy kompleksowo" |
| Każdy blog post | `/kontakt` | CTA — formularz wyceny |
| SSO poradnik | `/obszar-dzialania/[miasto]` | "Budujemy w Rybniku, Katowicach..." |
| Koszt budowy | `/oferta/projektowanie` | "Zacznij od projektu" |
| Stany porównanie | Blog SSO, Blog Stan zero | Cross-linki wewnętrzne |
| Każdy blog | Inne blogi z klastra | Budowanie topical authority |

### D) Routing: `/baza-wiedzy/` ✅ USTALONY

**Decyzja:** Cały content poradnikowy żyje pod `/baza-wiedzy/`. Sekcja `/blog/` jest **usuwana/zastępowana**.

**Uzasadnienie:**
- Bardziej profesjonalne niż "blog" dla firmy budowlanej
- Na stronach usługowych (`servicesV2.ts`) jest już **15+ linków** do `/baza-wiedzy/*` — nie trzeba nic zmieniać
- Stary blog (Venet) miał **0 kliknięć** przez 12 miesięcy — nic nie tracimy
- Obecny v3 ma tylko 1 porządny artykuł (płyta fundamentowa na terenach górniczych), reszta to puste szkielety (tytuł + stock photo)

**Co robimy:**
1. **Nowy routing:** `app/baza-wiedzy/[slug]/page.tsx` + `app/baza-wiedzy/page.tsx` (listing)
2. **Przenieść** istniejący artykuł o płycie fundamentowej z `/blog/` na `/baza-wiedzy/`
3. **Usunąć** routing `app/blog/` (folder + page.tsx + [slug]/page.tsx)
4. **Usunąć** puste szkielety blogpostów z `data/blog-data.ts` (zostawić tylko artykuł o płycie fundamentowej)
5. **Nawigacja główna:** Zmienić "Blog" na "Baza Wiedzy" w menu (`app/layout.tsx` lub komponent nawigacji)
6. **Linki w servicesV2.ts** — już poprawne! Wskazują na `/baza-wiedzy/`
7. **PEŁNY REFACTOR odnośników na całej stronie** — WSZYSTKIE linki kierujące do `/blog/` muszą zostać zmienione na `/baza-wiedzy/`:
   - `app/layout.tsx` — nawigacja główna (menu + mobile menu)
   - `app/page.tsx` — homepage (jeśli linkuje do bloga)
   - `components/` — wszystkie komponenty (footer, CTA, karty artykułów, breadcrumbs)
   - `data/blog-data.ts` → przemianować na `data/knowledge-base-data.ts` (lub `data/baza-wiedzy.ts`)
   - `data/servicesV2.ts` — linki w treściach usług (większość już pod `/baza-wiedzy/`, ale sprawdzić wszystkie)
   - `data/local/` — jeśli strony lokalne linkują do bloga
   - `data/local/shared-template.ts` — jeśli shared template ma linki blogowe
   - `lib/schema/generators.ts` — jeśli schema odwołuje się do bloga
   - `app/sitemap.ts` — zmienić wpisy blogowe na `/baza-wiedzy/`
   - **Grep po całym projekcie:** `grep -r "/blog" --include="*.ts" --include="*.tsx"` — wyłapać WSZYSTKIE odniesienia

**Redirect starego bloga Venet:**
```
/blog/stan-surowy-zamkniety-a-deweloperski...  → /oferta/kompleksowa-budowa-domow 301
/blog/nowoczesne-przestrzenie-mieszkalne...     → /obszar-dzialania/jaworzno 301
/blog/wyzwania-stojace-przed-kierownikiem...    → /oferta/nadzor-i-doradztwo 301
/blog/*                                         → / 301 (catch-all)
```

### E) Kalendarz publikacji

```
P1 (miesiąc 1 po migracji):
  📝 Blog: "Stan surowy otwarty — poradnik"        ~2500 słów, 3h
  📝 Blog: "Koszt budowy domu 2026 cennik"          ~3000 słów, 4h
  📝 Blog: "Dom energooszczędny Śląsk" (TEMAT 1)    ~2500 słów, 3h

P2 (miesiąc 2-3 po migracji):
  📝 Blog: "Stany budowy — SSO vs deweloperski"     ~2500 słów, 3h
  📝 Blog: "Stan zero budowy"                       ~2000 słów, 2h
```

---

## TEMAT 7: Kompletne redirecty `_redirects` ✅ USTALONY

### Format
Cloudflare Pages `_redirects` — plik w `public/_redirects`.
```
/stary-path /nowy-path 301
```
**UWAGA:** `output: 'export'` w Next.js = `redirects()` w `next.config.js` NIE DZIAŁA. Jedyna opcja to plik `_redirects`.

### Zasady
- Bardziej specyficzne reguły PRZED catch-all
- Jeden hop — zero łańcuchów przekierowań
- Cloudflare Pages nie obsługuje fragmentów (#) w redirectach

---

### TIER 1: KRYTYCZNE — strony lokalne budowy (>1000 imp)

| Stara strona | Nowa strona | Imp | Uwagi |
|---|---|---|---|
| `/oferta/budowa/budowa-katowice` | `/obszar-dzialania/katowice` | 6 209 | ✅ Strona istnieje |
| `/oferta/budowa/budowa-rybnik` | `/obszar-dzialania/rybnik` | 3 081 | ✅ Strona istnieje |
| `/oferta/budowa/budowa-gliwice` | `/obszar-dzialania/gliwice` | 2 741 | ✅ Strona istnieje |
| `/oferta/budowa/budowa-wodzislaw-slaski` | `/obszar-dzialania/wodzislaw-slaski` | 2 262 | ✅ Strona istnieje |
| `/oferta/budowa/budowa-jaworzno` | `/obszar-dzialania/jaworzno` | 2 039 | ✅ Strona istnieje |
| `/oferta/budowa/budowa-tychy` | `/obszar-dzialania/tychy` | 1 466 | ✅ Strona istnieje |
| `/oferta/budowa/budowa-zabrze` | `/obszar-dzialania/zabrze` | 1 333 | ⚠️ WYMAGA stworzenia strony (TEMAT 3) |
| `/oferta/budowa/budowa-zory` | `/obszar-dzialania/zory` | 581 | ⚠️ WYMAGA stworzenia strony (TEMAT 5) |
| `/oferta/budowa/budowa-raciborz` | `/oferta/kompleksowa-budowa-domow` | 201 | Tymczasowo do ogólnej, P2: stworzyć stronę |

### TIER 1: KRYTYCZNE — budowa ogólna i stany budowy

| Stara strona | Nowa strona | Imp | Uwagi |
|---|---|---|---|
| `/oferta/budowa` | `/oferta/kompleksowa-budowa-domow` | 1 449 | |
| `/stan-surowy-otwarty` | `/oferta/kompleksowa-budowa-domow` | 1 901 | P1: blog `/baza-wiedzy/stan-surowy-otwarty` |
| `/stan-zero` | `/oferta/kompleksowa-budowa-domow` | 1 027 | P2: blog `/baza-wiedzy/stan-zero-budowy` |
| `/stan-pod-klucz` | `/oferta/kompleksowa-budowa-domow` | 133 | |
| `/oferta/budowa/dom-energooszczedny-slask` | `/baza-wiedzy/dom-energooszczedny-slask` | 1 672 | ⚠️ WYMAGA stworzenia artykułu (TEMAT 1) |

### TIER 1: KRYTYCZNE — projekty

| Stara strona | Nowa strona | Imp | Uwagi |
|---|---|---|---|
| `/oferta/projekty/projekty-indywidualne/projekty-indywidualne-katowice` | `/obszar-dzialania/katowice` | 1 151 | Poz 3.9! Sekcja projektów na stronie Katowice (TEMAT 4) |
| `/oferta/projekty/projekty-indywidualne` | `/oferta/projektowanie` | ~50 | |
| `/oferta/projekty/projekty-gotowe` | `/oferta/projektowanie` | 163 | |
| `/oferta/projekty/oceny-stanu-technicznego` | `/oferta/uslugi-techniczne` | <50 | |
| `/oferta/projekty/swiadectwa-charakterystyki-energetycznej` | `/oferta/uslugi-techniczne` | <50 | |
| `/oferta/projekty` | `/oferta/projektowanie` | 211 | |

### TIER 2: WAŻNE — nadzór budowlany

| Stara strona | Nowa strona | Imp | Uwagi |
|---|---|---|---|
| `/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-katowice` | `/kierownik-budowy-katowice` | 3 166 | ✅ Landing gotowy |
| `/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-wodzislaw-slaski` | `/kierownik-budowy-wodzislaw-slaski` | 482 | ✅ Landing gotowy |
| `/oferta/uslugi-techniczne/nadzor-budowy` | `/oferta/nadzor-i-doradztwo` | 2 170 | |

### TIER 2: WAŻNE — usługi techniczne

| Stara strona | Nowa strona | Imp | Uwagi |
|---|---|---|---|
| `/oferta/uslugi-techniczne/kosztorysowanie` | `/oferta/uslugi-techniczne` | 928 | |
| `/oferta/uslugi-techniczne/doradztwo-techniczne` | `/oferta/nadzor-i-doradztwo` | 508 | |
| `/oferta/uslugi-techniczne/geodezja` | `/oferta/uslugi-techniczne` | 424 | |
| `/oferta/uslugi-techniczne/odbiory-techniczne` | `/oferta/uslugi-techniczne` | 274 | |
| `/pinb` | `/oferta/uslugi-techniczne` | 276 | |

### TIER 2: WAŻNE — wnętrza

| Stara strona | Nowa strona | Imp | Uwagi |
|---|---|---|---|
| `/oferta/wnetrza/projektowanie-wnetrz` | `/oferta/wykonczenia-i-aranzacje` | 1 149 | |
| `/oferta/wnetrza/kompleksowe-wykonawstwo-wnetrz` | `/oferta/wykonczenia-i-aranzacje` | <50 | |
| `/oferta/wnetrza` | `/oferta/wykonczenia-i-aranzacje` | 204 | |

### TIER 3: NISKI PRIORYTET — zagospodarowanie terenu

| Stara strona | Nowa strona | Imp |
|---|---|---|
| `/oferta/zagospodarowanie-terenu/ogrodzenia` | `/oferta/zagospodarowanie-terenu` | <50 |
| `/oferta/zagospodarowanie-terenu/drogi` | `/oferta/zagospodarowanie-terenu` | <50 |
| `/oferta/zagospodarowanie-terenu/ogrody` | `/oferta/zagospodarowanie-terenu` | <50 |

### TIER 3: NISKI PRIORYTET — blog Venet

| Stara strona | Nowa strona | Imp |
|---|---|---|
| `/blog/stan-surowy-zamkniety-a-deweloperski-roznice-i-znaczenie-dla-inwestora` | `/oferta/kompleksowa-budowa-domow` | 136 |
| `/blog/nowoczesne-przestrzenie-mieszkalne-budownictwo-w-jaworznie` | `/obszar-dzialania/jaworzno` | <50 |
| `/blog/wyzwania-stojace-przed-kierownikiem-budowy` | `/oferta/nadzor-i-doradztwo` | <50 |
| `/blog/projektowanie-domu-jak-uwzglednic-potrzeby-rodziny` | `/oferta/projektowanie` | <50 |
| `/blog/jakie-sa-najnowsze-rozwiazania-w-wykonczaniu-wnetrz` | `/oferta/wykonczenia-i-aranzacje` | <50 |
| `/blog/projektowanie-domow-nowoczesnosc-i-funkcjonalnosc` | `/oferta/projektowanie` | <50 |

### CATCH-ALL (na końcu pliku!)

| Pattern | Nowa strona | Uwagi |
|---|---|---|
| `/oferta/uslugi-techniczne-w-budownictwie/*` | `/oferta/uslugi-techniczne` | Stary wariant path |
| `/oferta/uslugi-techniczne/*` | `/oferta/uslugi-techniczne` | Catch-all podstron |
| `/oferta/budowa/*` | `/oferta/kompleksowa-budowa-domow` | Catch-all budowa |
| `/blog/*` | `/` | Catch-all blog |

---

### Gotowy plik `_redirects` (Cloudflare Pages format)

```
# ============================================
# Cloudflare Pages — 301 Redirects
# Migracja coreltb.pl (Venet) → Elever v3
# ============================================
# Format: /stary-path /nowy-path 301
# Dane źródłowe: GSC 12 mies. (03.2025–02.2026)
# Uwaga: Specyficzne reguły PRZED catch-all!
# ============================================

# ── STRONY LOKALNE BUDOWY ──────────────────────────────────────

/oferta/budowa/budowa-katowice /obszar-dzialania/katowice 301
/oferta/budowa/budowa-rybnik /obszar-dzialania/rybnik 301
/oferta/budowa/budowa-gliwice /obszar-dzialania/gliwice 301
/oferta/budowa/budowa-wodzislaw-slaski /obszar-dzialania/wodzislaw-slaski 301
/oferta/budowa/budowa-jaworzno /obszar-dzialania/jaworzno 301
/oferta/budowa/budowa-tychy /obszar-dzialania/tychy 301
/oferta/budowa/budowa-zabrze /obszar-dzialania/zabrze 301
/oferta/budowa/budowa-zory /obszar-dzialania/zory 301
/oferta/budowa/budowa-raciborz /oferta/kompleksowa-budowa-domow 301

# ── BUDOWA OGÓLNA I STANY ─────────────────────────────────────

/oferta/budowa /oferta/kompleksowa-budowa-domow 301
/stan-surowy-otwarty /oferta/kompleksowa-budowa-domow 301
/stan-zero /oferta/kompleksowa-budowa-domow 301
/stan-pod-klucz /oferta/kompleksowa-budowa-domow 301
/oferta/budowa/dom-energooszczedny-slask /baza-wiedzy/dom-energooszczedny-slask 301

# ── PROJEKTY (specyficzne przed catch-all) ────────────────────

/oferta/projekty/projekty-indywidualne/projekty-indywidualne-katowice /obszar-dzialania/katowice 301
/oferta/projekty/projekty-indywidualne /oferta/projektowanie 301
/oferta/projekty/projekty-gotowe /oferta/projektowanie 301
/oferta/projekty/oceny-stanu-technicznego /oferta/uslugi-techniczne 301
/oferta/projekty/swiadectwa-charakterystyki-energetycznej /oferta/uslugi-techniczne 301
/oferta/projekty /oferta/projektowanie 301

# ── NADZÓR BUDOWLANY (specyficzne per-miasto) ─────────────────
# ✅ Landingi wdrożone 2026-03-13

/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-katowice /kierownik-budowy-katowice 301
/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-wodzislaw-slaski /kierownik-budowy-wodzislaw-slaski 301
/oferta/uslugi-techniczne/nadzor-budowy /oferta/nadzor-i-doradztwo 301

# ── USŁUGI TECHNICZNE ─────────────────────────────────────────

/oferta/uslugi-techniczne/kosztorysowanie /oferta/uslugi-techniczne 301
/oferta/uslugi-techniczne/doradztwo-techniczne /oferta/nadzor-i-doradztwo 301
/oferta/uslugi-techniczne/geodezja /oferta/uslugi-techniczne 301
/oferta/uslugi-techniczne/odbiory-techniczne /oferta/uslugi-techniczne 301
/pinb /oferta/uslugi-techniczne 301

# ── WNĘTRZA ───────────────────────────────────────────────────

/oferta/wnetrza/projektowanie-wnetrz /oferta/wykonczenia-i-aranzacje 301
/oferta/wnetrza/kompleksowe-wykonawstwo-wnetrz /oferta/wykonczenia-i-aranzacje 301
/oferta/wnetrza /oferta/wykonczenia-i-aranzacje 301

# ── ZAGOSPODAROWANIE TERENU ────────────────────────────────────

/oferta/zagospodarowanie-terenu/ogrodzenia /oferta/zagospodarowanie-terenu 301
/oferta/zagospodarowanie-terenu/drogi /oferta/zagospodarowanie-terenu 301
/oferta/zagospodarowanie-terenu/ogrody /oferta/zagospodarowanie-terenu 301

# ── BLOG VENET (specyficzne przed catch-all) ───────────────────

/blog/stan-surowy-zamkniety-a-deweloperski-roznice-i-znaczenie-dla-inwestora /oferta/kompleksowa-budowa-domow 301
/blog/nowoczesne-przestrzenie-mieszkalne-budownictwo-w-jaworznie /obszar-dzialania/jaworzno 301
/blog/wyzwania-stojace-przed-kierownikiem-budowy /oferta/nadzor-i-doradztwo 301
/blog/projektowanie-domu-jak-uwzglednic-potrzeby-rodziny /oferta/projektowanie 301
/blog/jakie-sa-najnowsze-rozwiazania-w-wykonczaniu-wnetrz /oferta/wykonczenia-i-aranzacje 301
/blog/projektowanie-domow-nowoczesnosc-i-funkcjonalnosc /oferta/projektowanie 301

# ── CATCH-ALL (MUSZĄ BYĆ NA KOŃCU!) ───────────────────────────

/oferta/uslugi-techniczne-w-budownictwie/* /oferta/uslugi-techniczne 301
/oferta/uslugi-techniczne/* /oferta/uslugi-techniczne 301
/oferta/budowa/* /oferta/kompleksowa-budowa-domow 301
/blog/* / 301
```

### Strony które MUSZĄ istnieć przed wdrożeniem redirectów
| Strona | Status | Priorytet |
|---|---|---|
| `/obszar-dzialania/zabrze` | ❌ Do stworzenia | P0 |
| `/obszar-dzialania/zory` | ❌ Do stworzenia | P1 |
| `/baza-wiedzy/dom-energooszczedny-slask` | ❌ Do stworzenia | P0 |
| `/kierownik-budowy-katowice` | ✅ Wdrożone 2026-03-13 | — |
| `/kierownik-budowy-wodzislaw-slaski` | ✅ Wdrożone 2026-03-13 | — |
| `/kierownik-budowy-jaworzno` | ✅ Wdrożone 2026-03-13 (nowy landing od zera) | — |
| Pozostałe strony docelowe | ✅ Istnieją | — |

### Post-migration checklist (redirecty)
- [ ] Wdrożyć plik `public/_redirects`
- [ ] Przetestować KAŻDY redirect — `curl -I https://coreltb.pl/oferta/budowa/budowa-katowice`
- [ ] Sprawdzić w GSC po 1-2 tyg. czy stare URL-e są oznaczone jako "Redirected"
- [ ] Monitorować 404 w GSC Coverage report
- [x] Landingi nadzoru wdrożone (2026-03-13) — redirecty zaktualizowane na docelowe URL-e

---

## TEMAT 8: Brakujące grafiki na stronach lokalnych 🖼️

**Data:** 2026-03-16
**Status:** Do wygenerowania

Każda strona lokalna (`/obszar-dzialania/[slug]`) używa do 3 obrazów:
1. **hero.webp** — tło nagłówka PageHeader (h1)
2. **specyfika.webp** — ilustracja sekcji "Specyfika budowy" (LocalExpertiseSection)
3. **etapy.webp** — ilustracja sekcji "Etapy realizacji" (BuildingStagesSection / LocalExpertiseSection)

**Format:** WebP, ~1200×800px, kompresja 75-80%, max 150 KB.

---

### Miasta z częściowymi grafikami (mają tylko hero.webp)

| Miasto | hero | specyfika | etapy |
|--------|:----:|:---------:|:-----:|
| Jaworzno | ✅ | ❌ | ❌ |
| Katowice | ✅ | ❌ | ❌ |
| Rybnik | ✅ | ❌ | ❌ |
| Wodzisław Śl. | ✅ | ❌ | ❌ |
| Gliwice | ✅ | ❌ | ❌ |
| Tychy | ✅ | ❌ | ❌ |
| Mikołów | ✅ | ❌ | ❌ |
| Zabrze | ✅ | ❌ | ❌ |

### Miasta bez żadnych grafik

| Miasto | hero | specyfika | etapy | Aktualny placeholder |
|--------|:----:|:---------:|:-----:|----------------------|
| Żory | ❌ | ❌ | ❌ | rybnik/hero.webp |
| Jastrzębie-Zdrój | ❌ | ❌ | ❌ | wodzislaw/hero.webp |
| Racibórz | ❌ | ❌ | ❌ | wodzislaw/hero.webp |
| Chrzanów | ❌ | ❌ | ❌ | jaworzno/hero.webp |
| Olkusz | ❌ | ❌ | ❌ | jaworzno/hero.webp |
| Oświęcim | ❌ | ❌ | ❌ | jaworzno/hero.webp |
| Kraków | ❌ | ❌ | ❌ | katowice/hero.webp |
| Opole | ❌ | ❌ | ❌ | jaworzno/hero.webp |
| Kędzierzyn-Koźle | ❌ | ❌ | ❌ | jaworzno/hero.webp |

---

### Co powinny przedstawiać grafiki — brief do generowania

#### 1. hero.webp (PageHeader — tło pod h1)

**Cel:** Szerokie, panoramiczne zdjęcie/render budowy domu z widocznym kontekstem lokalizacji.
**Styl:** Ujęcie z drona lub szerokokątne. Dominujące kolory: ciepłe (złoty hour), budynek w centrum kadru. Grafika będzie przyciemniona overlay 60% + biały tekst na wierzchu.

| Miasto | Co powinno przedstawiać |
|--------|------------------------|
| **Żory** | Budowa domu jednorodzinnego na tle zielonych dzielnic Żor (Kleszczówka/Rowień). Nowa zabudowa jednorodzinna, otoczenie podmiejskie. |
| **Jastrzębie-Zdrój** | Budowa domu murowanego na terenie Jastrzębia — widoczna nowa zabudowa, w tle panorama miasta. Charakter industrialno-podmiejski. |
| **Racibórz** | Budowa domu w dolinie — w tle rzeka Odra lub panorama Raciborza z wieżą zamku Piastowskiego. Charakter nadrzeczny, zielony. |
| **Chrzanów** | Budowa domu na Pogórzu Krakowskim — falujący teren, w tle pagórki Jury Krakowsko-Częstochowskiej. Charakter małomiasteczkowy. |
| **Olkusz** | Budowa domu na tle krajobrazu jurajskiego — wapienne skały, jasny teren, Jura Krakowsko-Częstochowska. Okolica Czarnej Góry/Parcz. |
| **Oświęcim** | Budowa domu w okolicach Oświęcimia — równinny teren, w tle dolina rzeczna (Wisła/Soła). Spokojne, zielone otoczenie. |
| **Kraków** | Budowa domu jednorodzinnego w południowej/zachodniej dzielnicy Krakowa — nowoczesna zabudowa, w dalekim tle panorama miasta. |
| **Opole** | Budowa domu na przedmieściach Opola — zielone, równinne tereny, elementy opolskiej architektury w tle (opcjonalnie). |
| **Kędzierzyn-Koźle** | Budowa domu w otoczeniu Kędzierzyna — przemysłowo-zielony charakter, teren równinny, w tle Kanał Gliwicki lub infrastruktura miasta. |

#### 2. specyfika.webp (sekcja "Specyfika budowy w [mieście]")

**Cel:** Ilustracja techniczna / zdjęcie budowy pokazujące lokalną specyfikę gruntową/geologiczną.
**Styl:** Zdjęcie techniczne z placu budowy. Ujęcie na poziomie gruntu lub lekko z góry. Widoczne detale: zbrojenie, izolacja, warstwy gruntu, sprzęt. Kolory naturalne, dzienne oświetlenie.

| Miasto | Co powinno przedstawiać |
|--------|------------------------|
| **Jaworzno** | Wykop fundamentowy na terenie pogórniczym — widoczne warstwy gruntu, ewentualnie oznakowanie pustki poeksploatacyjnej. Geotechnika w akcji. |
| **Katowice** | Płyta fundamentowa na terenie z szkodami górniczymi — zbrojenie, szalunki, geowłóknina. Widoczna specyfika GOP. |
| **Rybnik** | Budowa fundamentu na gliniastym gruncie — wykop z widoczną gliną, drenaż opaskowy, hydroizolacja. Teren ROW. |
| **Wodzisław Śl.** | Stabilizacja gruntu / wymiana kurzawki — koparki, warstwy gruntu, prace ziemne na trudnym podłożu. |
| **Gliwice** | Fundamenty na terenie pogórniczym — płyta fundamentowa, zbrojenie, monitoring geodezyjny. |
| **Tychy** | Budowa fundamentów — prace ziemne, ławy lub płyta, charakterystyczny teren pogranicza GOP. |
| **Mikołów** | Fundamenty na pograniczu terenu górniczego i stabilnego — kontrast warunków, badanie geotechniczne. |
| **Zabrze** | Prace fundamentowe na terenie pogórniczym (KWK Makoszowy) — wzmocniona konstrukcja, zbrojenie. |
| **Żory** | Badanie geotechniczne / odwierty na działce — wiertnica, próbki gruntu. Teren po KWK Żory/Krupiński. |
| **Jastrzębie-Zdrój** | Płyta fundamentowa z dodatkowym zbrojeniem — wzmocnienia pod szkody górnicze kat. II-IV. Aktywne KWK JSW. |
| **Racibórz** | Hydroizolacja fundamentu — masa bitumiczna, folia kubełkowa, drenaż opaskowy. Teren zalewowy doliny Odry. |
| **Chrzanów** | Grunt krasowy — widoczne wapienne podłoże, odwierty geotechniczne na terenie jurajskim. |
| **Olkusz** | Kras jurajski — wapienne podłoże, zapadlisko lub profil gruntu z warstwą wapienia. Specyfika Jury. |
| **Oświęcim** | Grunty aluwialne doliny Wisły — wykop z warstwami piasku/mułu, wysoki poziom wód gruntowych, drenaż. |
| **Kraków** | Prace fundamentowe z widocznym MPZP/tablicą budowy — restrykcyjne warunki zabudowy, profesjonalny plac. |
| **Opole** | Grunty nadodrzańskie — drenaż opaskowy, hydroizolacja ciężka, wymiana gruntu napływowego. |
| **Kędzierzyn-Koźle** | Hydroizolacja + drenaż na terenie nadrzecznym — fundament z zabezpieczeniem przed wysokim poziomem wód gruntowych. |

#### 3. etapy.webp (sekcja "Etapy realizacji")

**Cel:** Dom w trakcie budowy — na etapie SSO lub deweloperskim, pokazujący postęp prac.
**Styl:** Ujęcie z dystansu (~10-20m), cały dom w kadrze. Ekipa budowlana opcjonalnie. Jasne, dzienne oświetlenie. Uporządkowany plac = profesjonalizm.

| Wariant | Miasta | Co przedstawia |
|---------|--------|----------------|
| **Górnicze (GOP/ROW)** | Katowice, Gliwice, Zabrze, Tychy, Mikołów, Rybnik, Wodzisław, Żory, Jastrzębie, Jaworzno | Dom SSO z widoczną wzmocnioną konstrukcją — grubsze ściany, wieniec antygórniczy, więźba dachowa. |
| **Nadrzeczne** | Racibórz, Opole, Kędzierzyn-Koźle, Oświęcim | Dom SSO z widocznym podwyższonym parterem, solidną hydroizolacją fundamentu. |
| **Jurajskie** | Olkusz, Chrzanów | Dom SSO na pagórkowatym terenie, jasne podłoże wapienne. |
| **Miejskie** | Kraków | Nowoczesny dom jednorodzinny w miejskim/podmiejskim otoczeniu, etap SSO. |

---

### Podsumowanie — lista plików do wygenerowania

**P0 — specyfika + etapy dla miast z istniejącym hero (16 plików):**
```
public/images/local/jaworzno/specyfika.webp
public/images/local/jaworzno/etapy.webp
public/images/local/katowice/specyfika.webp
public/images/local/katowice/etapy.webp
public/images/local/rybnik/specyfika.webp
public/images/local/rybnik/etapy.webp
public/images/local/wodzislaw-slaski/specyfika.webp
public/images/local/wodzislaw-slaski/etapy.webp
public/images/local/gliwice/specyfika.webp
public/images/local/gliwice/etapy.webp
public/images/local/tychy/specyfika.webp
public/images/local/tychy/etapy.webp
public/images/local/mikolow/specyfika.webp
public/images/local/mikolow/etapy.webp
public/images/local/zabrze/specyfika.webp
public/images/local/zabrze/etapy.webp
```

**P1 — pełen komplet (hero + specyfika + etapy) dla nowych miast (27 plików):**
```
public/images/local/zory/hero.webp
public/images/local/zory/specyfika.webp
public/images/local/zory/etapy.webp
public/images/local/jastrzebie-zdroj/hero.webp
public/images/local/jastrzebie-zdroj/specyfika.webp
public/images/local/jastrzebie-zdroj/etapy.webp
public/images/local/raciborz/hero.webp
public/images/local/raciborz/specyfika.webp
public/images/local/raciborz/etapy.webp
public/images/local/chrzanow/hero.webp
public/images/local/chrzanow/specyfika.webp
public/images/local/chrzanow/etapy.webp
public/images/local/olkusz/hero.webp
public/images/local/olkusz/specyfika.webp
public/images/local/olkusz/etapy.webp
public/images/local/oswiecim/hero.webp
public/images/local/oswiecim/specyfika.webp
public/images/local/oswiecim/etapy.webp
public/images/local/krakow/hero.webp
public/images/local/krakow/specyfika.webp
public/images/local/krakow/etapy.webp
public/images/local/opole/hero.webp
public/images/local/opole/specyfika.webp
public/images/local/opole/etapy.webp
public/images/local/kedzierzyn-kozle/hero.webp
public/images/local/kedzierzyn-kozle/specyfika.webp
public/images/local/kedzierzyn-kozle/etapy.webp
```

**Łącznie: 43 pliki** (16 P0 + 27 P1)

---
