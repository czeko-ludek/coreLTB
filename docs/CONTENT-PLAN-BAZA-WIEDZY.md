# Plan Contentowy: Baza Wiedzy (/baza-wiedzy/)

> **Status:** Artykuły zaplanowane, linki tymczasowo odlinkowane w `servicesV2.ts`
> **Cel:** Po publikacji każdego artykułu — przywrócić link w odpowiednim miejscu `servicesV2.ts`
> **Docelowy URL:** `/baza-wiedzy/{slug}`

---

## Opublikowane artykuły

### Płyta fundamentowa na terenach górniczych
- **Slug:** `plyta-fundamentowa-tereny-gornicze`
- **Status:** OPUBLIKOWANY
- **URL:** `/baza-wiedzy/plyta-fundamentowa-tereny-gornicze`
- **Dane:** `data/blog-data.ts` (BlogPost + BlogContentBlock[])
- **Brakujące zdjęcia:**
  - `/images/blog/plyta-fundamentowa/plyta-fundamentowa.webp` — hero (potrzebne zdjęcie z realizacji)
  - `/images/blog/plyta-fundamentowa/schemat-niecka-siodlo.webp` — schemat niecka vs siodło
  - `/images/blog/plyta-fundamentowa/uszkodzenia-gornicze.webp` — uszkodzenia budynku bez fundamentu
  - `/images/blog/plyta-fundamentowa/zbrojenie-plyta.webp` — zbrojenie podwójne B500SP
  - `/images/blog/plyta-fundamentowa/izolacja-xps.webp` — izolacja XPS pod płytą

### Dom energooszczędny — kompletny przewodnik budowy 2026
- **Slug:** `dom-energooszczedny-slask`
- **Status:** OPUBLIKOWANY (treść gotowa, brak zdjęć)
- **URL:** `/baza-wiedzy/dom-energooszczedny-slask`
- **Redirect:** `/oferta/budowa/dom-energooszczedny-slask` → `/baza-wiedzy/dom-energooszczedny-slask` (301)
- **Dane:** `data/blog-data.ts` (BlogPost + BlogContentBlock[])
- **Pipeline:** create-content (DataForSEO keyword research + SERP analysis + blueprint)
- **Główna oś:** WT 2026 (wchodzi 20.09.2026) — żaden konkurent w TOP10 nie pokrywa
- **Interlinki:** /wycena (2x), /plyta-fundamentowa, /oferta/kompleksowa-budowa-domow, /oferta/projektowanie, /projekty, /analiza-dzialki, /umow-konsultacje, /obszar-dzialania (3 miasta)
- **FAQ:** 6 pytań z wolumenami PAA
- **Brakujące zdjęcia (4 sztuki):**

| # | Plik | Co powinno przedstawiać | Alt text |
|---|------|------------------------|----------|
| 1 | `/images/blog/dom-energooszczedny/hero.webp` | Nowoczesny dom parterowy/piętrowy z panelami PV na dachu, czysta elewacja, zadbany ogród. Najlepiej z realizacji CoreLTB lub dobry stock. | Nowoczesny dom energooszczędny z fotowoltaiką na dachu i pompą ciepła — widok od frontu |
| 2 | `/images/blog/dom-energooszczedny/rekuperacja.webp` | Centrala rekuperacyjna zamontowana w kotłowni/pomieszczeniu technicznym. Widoczne kanały wentylacyjne i filtr. | Centrala rekuperacyjna z filtrem — wentylacja mechaniczna z odzyskiem ciepła w domu energooszczędnym |
| 3 | `/images/blog/dom-energooszczedny/pompa-ciepla-fotowoltaika.webp` | Jednostka zewnętrzna pompy ciepła obok domu + panele PV widoczne na dachu w tle. | Pompa ciepła powietrze-woda obok domu jednorodzinnego z instalacją fotowoltaiczną na dachu |
| 4 | `/images/blog/dom-energooszczedny/budowa-slask.webp` | Budowa w trakcie — widoczna izolacja XPS na fundamencie/płycie. Najlepiej z realizacji CoreLTB na Śląsku. | Budowa domu jednorodzinnego na Śląsku — izolacja fundamentu płytą XPS na terenie górniczym |

> **Format:** WebP, szerokość min. 1200px, proporcje 16:9 lub 2:1 (hero). Kompresja ~80%.

---

## Priorytet 1 — Kluczowe artykuły konwersyjne (linkowane wielokrotnie)

### 1. Ile realnie kosztuje budowa domu — SSO / Pod Klucz? (Raport cenowy)
- **Slug:** `koszt-budowy-domu-2026-cennik`
- **Linkowane z:** Kompleksowa budowa domów (×1), Projektowanie (×1), Usługi techniczne (×1) — **3 linki**
- **Typ:** Raport / Pillar Article
- **Zakres treści:**
  - Realne koszty budowy domu w 2026 r. na Śląsku i w Małopolsce (dane transakcyjne, nie katalogowe)
  - Podział na etapy: stan zerowy, SSO, SSZ, deweloperski, pod klucz — koszt za m² na każdym etapie
  - Porównanie technologii: murowany vs drewniany (koszt, czas, trwałość)
  - Koszty ukryte: przyłącza, geologia, projekt, nadzór, zagospodarowanie terenu
  - Jak planować budżet z kredytem hipotecznym — harmonogram transz
  - Tabela: przykładowy kosztorys dla domu 120m² i 180m²
  - CTA: Bezpłatna wycena indywidualna
- **Frazy kluczowe:** "koszt budowy domu 2026", "ile kosztuje budowa domu", "cennik budowy domu śląsk"

---

### 2. Domy energooszczędne — technologia i zwrot z inwestycji
- **Slug:** `domy-energooszczedne-technologia`
- **Linkowane z:** Projektowanie (×1), Usługi techniczne / Świadectwa energetyczne (×1) — **2 linki**
- **Typ:** Artykuł edukacyjny (Technologia)
- **Zakres treści:**
  - Normy WT2021 — co oznaczają w praktyce (Ep, Ek, wymagania izolacyjności)
  - Technologie budowy energooszczędnej: pompa ciepła, rekuperacja, okna 3-szybowe, ciepły montaż
  - Eliminacja mostków termicznych — detale: balkony, nadproża, rolety
  - ROI: kiedy inwestycja się zwraca (porównanie rachunków za ogrzewanie)
  - Certyfikacja energetyczna — jak wpływa na wartość nieruchomości
  - Case study: dom CoreLTB ze wskaźnikiem EP < 40 kWh/m²/rok
- **Frazy kluczowe:** "dom energooszczędny koszt", "WT2021 wymagania", "technologia budowy energooszczędnej"

---

### 3. Lista najczęstszych usterek deweloperskich na Śląsku
- **Slug:** `najczestsze-usterki-przy-odbiorze`
- **Linkowane z:** Nadzór / Odbiory techniczne (×1), Nadzór / FAQ Odbiory od dewelopera (×1) — **2 linki**
- **Typ:** Checklist / Poradnik praktyczny
- **Zakres treści:**
  - TOP 20 usterek wykrywanych przy odbiorach mieszkań na Śląsku (dane z realnych odbiorów CoreLTB)
  - Kategorie: tynki (krzywizny, pęknięcia), stolarka (rysy na szybach, nieszczelności), wylewki (wilgotność), instalacje
  - Normy referencyjne: PN-B-10110 (tynki), PN-EN 1279 (szyby), test CM (wilgotność wylewek)
  - Jak wygląda protokół usterek — co powinien zawierać, żeby był wiążący prawnie
  - Zdjęcia przykładowych usterek z opisami technicznymi
  - CTA: Zamów odbiór techniczny z inspektorem
- **Frazy kluczowe:** "odbiór mieszkania usterki", "usterki deweloperskie lista", "odbiór techniczny mieszkania"

---

## Priorytet 2 — Artykuły wspierające silos tematyczny

### 4. Pozwolenie na budowę krok po kroku
- **Slug:** `pozwolenie-na-budowe`
- **Linkowane z:** Kompleksowa budowa domów / Etap 4 (×1) — **1 link**
- **Typ:** Poradnik krok po kroku
- **Zakres treści:**
  - Pełna procedura uzyskania PnB w 2026 r. (z uwzględnieniem zmian w prawie)
  - Wymagane dokumenty: PZT, PAB, PT — co zawiera każdy tom
  - Kto składa wniosek i jak wygląda procedura w starostwie
  - Typowe przyczyny odrzucenia wniosku i jak ich uniknąć
  - Ile trwa wydanie PnB (terminy ustawowe vs realia)
  - Różnica: pozwolenie na budowę vs zgłoszenie budowy (dom do 70m²)
  - CTA: Uzyskamy PnB za Ciebie — usługa pełnomocnictwa
- **Frazy kluczowe:** "pozwolenie na budowę 2026", "jak uzyskać pozwolenie na budowę", "dokumenty do pozwolenia na budowę"

---

### 5. Checklista prac: Standard Deweloperski (120 punktów)
- **Slug:** `stan-deweloperski-co-to-jest`
- **Linkowane z:** Kompleksowa budowa domów / Etap 6 (×1) — **1 link**
- **Typ:** Checklist / Definicja
- **Zakres treści:**
  - Precyzyjna definicja "stanu deweloperskiego" — co wchodzi, a co NIE wchodzi w zakres
  - Lista 120 punktów kontrolnych (pogrupowana: konstrukcja, instalacje, stolarka, tynki, elewacja)
  - Porównanie: SSO vs SSZ vs Deweloperski vs Pod Klucz — tabela różnic
  - Dlaczego "standard deweloperski" różni się między firmami — na co uważać w umowie
  - Checklistę do pobrania (PDF) — lead magnet
  - CTA: Zapytaj o wycenę w standardzie deweloperskim
- **Frazy kluczowe:** "stan deweloperski co to", "co zawiera stan deweloperski", "stan deweloperski zakres prac"

---

### 6. Co musi zawierać projekt budowlany?
- **Slug:** `co-zawiera-projekt-budowlany`
- **Linkowane z:** Projektowanie / Etap 5 (×1) — **1 link**
- **Typ:** Poradnik edukacyjny
- **Zakres treści:**
  - Obowiązkowy podział na 3 tomy (PZT, PAB, PT) — wyjaśnienie każdego
  - Co musi zawierać każdy tom wg aktualnego Prawa budowlanego
  - Różnica między projektem gotowym a indywidualnym — co wymaga adaptacji
  - Projekt konstrukcyjny — dlaczego jest kluczowy na Śląsku (szkody górnicze)
  - Optymalizacja projektu: jak obniżyć koszty budowy już na etapie projektowania (Value Engineering)
  - CTA: Zamów projekt z kosztorysem wykonawczym
- **Frazy kluczowe:** "co zawiera projekt budowlany", "projekt budowlany wymagania 2026", "PZT PAB PT"

---

### 7. Szkody górnicze a fundamenty — poradnik inżyniera
- **Slug:** `fundamenty-na-szkodach-gorniczych`
- **Linkowane z:** Usługi techniczne / Geologia (×1) — **1 link**
- **Typ:** Artykuł techniczny / Poradnik
- **Zakres treści:**
  - Kategorie szkód górniczych (I-IV) — co oznaczają w praktyce budowlanej
  - Kiedy płyta fundamentowa, kiedy ławy — algorytm decyzyjny
  - Specyfikacja techniczna płyty: grubość, zbrojenie (B500SP, podwójna siatka), beton C25/30
  - Koszt płyty vs ławy — porównanie dla domu 120m²
  - Mapa: strefy szkód górniczych na Śląsku (KWK Borynia-Zofiówka, KWK Pniówek, etc.)
  - Procedura: jak sprawdzić kategorię szkód na swojej działce (opinia JSW/PGG)
  - CTA: Zamów badanie geotechniczne
- **Frazy kluczowe:** "budowa na szkodach górniczych", "płyta fundamentowa szkody górnicze", "kategorie szkód górniczych"

---

### 8. Kiedy warto zatrudnić Inspektora Nadzoru i ile to kosztuje?
- **Slug:** `kierownik-budowy-czy-inspektor-nadzoru`
- **Linkowane z:** Nadzór / Intro (×1) — **1 link**
- **Typ:** Artykuł porównawczy / Decyzyjny
- **Zakres treści:**
  - Kierownik budowy vs Inspektor nadzoru — różnice w prawie i praktyce
  - Konflikt interesów: dlaczego kierownik od wykonawcy nie chroni inwestora
  - Kiedy inspektor jest obowiązkowy (Prawo budowlane art. 19)
  - Ile kosztuje inspektor nadzoru na Śląsku (przedziały cenowe 2026)
  - ROI: przykłady oszczędności z realnych budów (blokada niezasadnych faktur, wymiana wadliwego materiału)
  - CTA: Wyceń nadzór inwestorski
- **Frazy kluczowe:** "inspektor nadzoru koszt", "kierownik budowy vs inspektor", "czy potrzebuję inspektora nadzoru"

---

### 9. Rola Kierownika Budowy w procesie inwestycyjnym
- **Slug:** `obowiazki-kierownika-budowy`
- **Linkowane z:** Nadzór / Kierownik budowy (×1) — **1 link**
- **Typ:** Artykuł edukacyjny
- **Zakres treści:**
  - Obowiązki kierownika budowy wg Prawa budowlanego (art. 22, 23)
  - Co sprawdza kierownik na placu: odbiór zbrojenia, kontrola materiałów, dziennik budowy, BIOZ
  - "Podbijanie pieczątki" vs realny nadzór — jak odróżnić dobrego kierownika
  - Odpowiedzialność prawna kierownika (kary, odpowiedzialność zawodowa)
  - Jak wygląda współpraca KB z inspektorem nadzoru i inwestorem
  - CTA: Zapytaj o kierownika budowy z uprawnieniami
- **Frazy kluczowe:** "kierownik budowy obowiązki", "rola kierownika budowy", "odpowiedzialność kierownika budowy"

---

### 10. 5 najczęstszych błędów wykonawczych, które wykrywa Inspektor
- **Slug:** `bledy-na-budowie-nadzor`
- **Linkowane z:** Nadzór / Inspektor nadzoru (×1) — **1 link**
- **Typ:** Listicle / Case study
- **Zakres treści:**
  - 5 krytycznych błędów z realnych budów na Śląsku (z opisem technicznym):
    1. Zła klasa stali w zbrojeniu (A-0 zamiast A-IIIN)
    2. Brak ciągłości izolacji przeciwwodnej na fundamentach
    3. Złe zakłady prętów zbrojeniowych (zbyt krótkie)
    4. Murowanie w zbyt niskiej temperaturze (zamarzanie zaprawy)
    5. Nieprawidłowy montaż okien (brak taśm paroszczelnych)
  - Konsekwencje każdego błędu (kosztowe i konstrukcyjne)
  - Jak inspektor wykrywa te błędy (metody, sprzęt pomiarowy)
  - CTA: Nie ryzykuj — zamów nadzór inwestorski
- **Frazy kluczowe:** "błędy na budowie", "najczęstsze usterki budowlane", "kontrola jakości budowy"

---

### 11. Ile kosztuje wykończenie mieszkania pod klucz? (Raport)
- **Slug:** `koszty-wykonczenia-pod-klucz-2026`
- **Linkowane z:** Wykończenia i aranżacje (×1) — **1 link**
- **Typ:** Raport cenowy
- **Zakres treści:**
  - Realne koszty wykończenia za m² w 2026 r. (standard ekonomiczny / średni / premium)
  - Podział kosztów: podłogi, łazienki, kuchnia, malowanie, instalacje elektryczne
  - Ile kosztują materiały vs robocizna (proporcje)
  - Harmonogram prac wykończeniowych — ile trwa wykończenie 80m² / 120m² mieszkania
  - VAT 8% na materiały przy usłudze budowlanej — jak to działa
  - Porównanie: wykończenie samemu vs z ekipą vs pod klucz z GW
  - CTA: Wycena wykończenia pod klucz
- **Frazy kluczowe:** "koszt wykończenia mieszkania 2026", "wykończenie pod klucz cennik", "ile kosztuje wykończenie domu"

---

### 12. Ile kosztuje zagospodarowanie działki 1000m²? (Analiza)
- **Slug:** `koszt-zagospodarowania-dzialki-2026`
- **Linkowane z:** Zagospodarowanie terenu (×1) — **1 link**
- **Typ:** Raport cenowy
- **Zakres treści:**
  - Realne koszty zagospodarowania na Śląsku w 2026 r. (dane z realizacji CoreLTB)
  - Koszty jednostkowe: niwelacja (wywrotka ziemi), podbudowa (m³ kruszywa), humusowanie (m²)
  - Koszt ogrodzenia: panelowe / gabionowe / klinkierowe — porównanie za mb
  - Koszt brukowania: kostka betonowa vs granitowa, grubości, podbudowy
  - Koszt trawnika: siew vs rolka, nawadnianie automatyczne
  - Roboczogodziny sprzętu ciężkiego (minikoparki, walce, wywrotki)
  - Przykładowy budżet zagospodarowania działki 800m² i 1200m²
  - CTA: Wycena zagospodarowania terenu
- **Frazy kluczowe:** "koszt zagospodarowania działki", "ile kosztuje ogrodzenie domu", "zagospodarowanie terenu cennik"

---

## Podsumowanie linkowania

| # | Artykuł | Slug | Linki w servicesV2.ts | Priorytet |
|---|---------|------|-----------------------|-----------|
| 1 | Koszt budowy domu (Raport) | `koszt-budowy-domu-2026-cennik` | 3× (budowa, projekt, usługi tech.) | **P1** |
| 2 | Domy energooszczędne | `domy-energooszczedne-technologia` | 2× (projekt, świadectwa) | **P1** |
| 3 | Usterki deweloperskie | `najczestsze-usterki-przy-odbiorze` | 2× (odbiory, FAQ) | **P1** |
| 4 | Pozwolenie na budowę | `pozwolenie-na-budowe` | 1× | P2 |
| 5 | Stan deweloperski (120 pkt) | `stan-deweloperski-co-to-jest` | 1× | P2 |
| 6 | Co zawiera projekt budowlany | `co-zawiera-projekt-budowlany` | 1× | P2 |
| 7 | Fundamenty na szkodach górniczych | `fundamenty-na-szkodach-gorniczych` | 1× | P2 |
| 8 | Inspektor vs Kierownik | `kierownik-budowy-czy-inspektor-nadzoru` | 1× | P2 |
| 9 | Obowiązki kierownika budowy | `obowiazki-kierownika-budowy` | 1× | P2 |
| 10 | Błędy na budowie (5 najczęstszych) | `bledy-na-budowie-nadzor` | 1× | P2 |
| 11 | Koszt wykończenia pod klucz | `koszty-wykonczenia-pod-klucz-2026` | 1× | P2 |
| 12 | Koszt zagospodarowania działki | `koszt-zagospodarowania-dzialki-2026` | 1× | P2 |

**Łącznie:** 12 artykułów → 16 linków do przywrócenia

---

## Jak przywrócić link po publikacji artykułu

W `data/servicesV2.ts` szukaj frazy `*(artykuł wkrótce)*` i zamień:

**Przed:**
```
**Tytuł artykułu** *(artykuł wkrótce)*
```

**Po:**
```
[Tytuł artykułu](/baza-wiedzy/{slug})
```
