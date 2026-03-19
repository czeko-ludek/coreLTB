# Landing Pages & CTA Strategy — CoreLTB Builders

> Dokument referencyjny opisujący wszystkie landing page'e konwersyjne, mapowanie CTA,
> eventy Analytics i strukturę pod Google Ads. Aktualizuj przy każdej zmianie funnelu.
>
> **Ostatnia aktualizacja:** 2026-03-19

---

## Spis treści

1. [Architektura funnelu](#1-architektura-funnelu)
2. [LP1: Kalkulator wyceny `/wycena`](#lp1-kalkulator-wyceny-wycena)
3. [LP2: Umów konsultację `/umow-konsultacje`](#lp2-umów-konsultację-umow-konsultacje)
4. [LP3: Analiza działki `/analiza-dzialki`](#lp3-analiza-działki-analiza-dzialki)
5. [LP4: Kontakt `/kontakt`](#lp4-kontakt-kontakt)
6. [LP5: Case study `/projekty/[slug]`](#lp5-case-study-projektyslug)
7. [LP6: Porównanie standardów `/porownanie-standardow`](#lp6-porównanie-standardów-porownanie-standardow)
8. [Mapowanie CTA → Destynacje](#7-mapowanie-cta--destynacje)
9. [Google Analytics 4 — eventy](#8-google-analytics-4--eventy)
10. [Google Ads — grupy kampanii](#9-google-ads--grupy-kampanii)
11. [Backend formularzy](#10-backend-formularzy)
12. [Priorytety implementacji](#11-priorytety-implementacji)

---

## 1. Architektura funnelu

```
                         AWARENESS (ruch organiczny / Ads)
               ┌─────────────────────────────────────────────┐
               │  Strona główna          coreltb.pl          │
               │  Strony lokalne         /obszar-dzialania/* │
               │  Strony usług           /oferta/*           │
               │  Baza wiedzy            /baza-wiedzy/*      │
               │  Blog                   /blog/*             │
               │  Nadzór per-city        /kierownik-budowy-* │
               └──────────────┬──────────────────────────────┘
                              │
                       CONSIDERATION
          ┌───────────────────┼───────────────────┐
          │                   │                   │
          ▼                   ▼                   ▼
   ┌──────────────┐  ┌───────────────┐  ┌────────────────┐
   │  /wycena     │  │  /umow-       │  │  /analiza-     │
   │  Kalkulator  │  │  konsultacje  │  │  dzialki       │
   │  (LP1)       │  │  (LP2)        │  │  (LP3)         │
   │              │  │               │  │                │
   │  "Ile to     │  │  "Chcę        │  │  "Mam działkę, │
   │   kosztuje?" │  │   porozmawiać"│  │   co dalej?"   │
   └──────┬───────┘  └───────┬───────┘  └───────┬────────┘
          │                  │                   │
          │      ┌───────────┼───────────────────┘
          │      │           │
          ▼      ▼           ▼
   ┌──────────────────────────────────┐
   │  LEAD (CRM / email / telefon)   │
   │  Dane: imię, tel, email,        │
   │  + kontekst (usługa, metraż,    │
   │    lokalizacja, etap)            │
   └──────────────┬───────────────────┘
                  │
            CONVERSION
          ┌───────▼───────┐
          │  Spotkanie    │
          │  na budowie / │
          │  w biurze     │
          └───────────────┘
```

**Strony wspierające konwersję (nie są LP same w sobie):**
- `/porownanie-standardow` (LP6) — edukuje, prowadzi do `/wycena`
- `/projekty/[slug]` (LP5) — case study, buduje zaufanie, prowadzi do `/umow-konsultacje`
- `/kontakt` (LP4) — catch-all, dane kontaktowe, mapa, prosty formularz

---

## LP1: Kalkulator wyceny `/wycena`

**Priorytet:** P0
**Cel:** Generowanie ciepłych leadów z konkretnymi parametrami projektu.
**Typ użytkownika:** „Wiem, że chcę budować. Ile to będzie kosztować?"
**Ścieżka do strony:** Header CTA „Wycena", hero buttons, strony lokalne, service pages

### Struktura strony

**BEZ LIVE PREVIEW** — cena to nagroda za leada. User NIE widzi wyceny przed wysłaniem formularza.

```
HERO (compact, dark) → H1: "Bezpłatna Wycena Budowy Domu"
                       "Zostaw numer — oddzwonimy z wyceną w 24h"

KONFIGURATOR (single-page, centered max-w-3xl):
  Sekcja 1: Powierzchnia (slider 80–300m²) + Kondygnacje (3 karty z ikonami)
  Sekcja 2: Materiał murowy (3 karty) + Typ dachu (3 karty) + Garaż (3 karty)
  Sekcja 3: Dane kontaktowe (imię, telefon*, email, lokalizacja, załącz projekt)
  Zgody RODO + Submit button

EKRAN SUKCESU (po wysłaniu):
  ✓ "Dziękujemy, {imię}!"
  Podsumowanie konfiguracji
  "Oddzwonimy w ciągu 24h"
  Alternatywa: "Zadzwoń teraz: +48 664 123 757"

SEKCJE WSPIERAJĄCE:
  Trust bar (4 karty: 200+ domów, stała cena, gwarancja terminu, 5 lat gwarancji)
  Opinie klientów (3 karty ze zdjęciami/inicjałami)
  "Od wyceny do budowy w 3 krokach" (timeline)
  Mini FAQ (3–4 pytania)
  ContactCTASection
```

Szczegółowy koncept UI/UX: **`docs/KALKULATOR-KONCEPT.md`**

### Logika cenowa

Ceny przechowywane w `data/pricing.ts` (nowy plik):

```typescript
interface PricingConfig {
  baseRatePerM2: Record<Standard, { min: number; max: number }>; // zł/m² netto
  wallModifier: Record<WallType, number>;     // mnożnik (1.0 = base)
  roofModifier: Record<RoofType, number>;     // mnożnik
  foundationModifier: Record<FoundationType, number>;
  miningDamageModifier: { min: number; max: number }; // +10–25%
  basementModifier: number;                   // +15–20%
  floorModifier: Record<Floors, number>;      // parterowy vs piętrowy
}
```

**Formuła:** `metraż × stawka_bazowa/m² × modyfikator_ścian × modyfikator_dachu × modyfikator_fundamentu × [modyfikator_szkód]`

**Ważne:**
- Wynik to ZAWSZE widełki (min–max), nigdy jedna kwota
- Disclaimer: „Wycena orientacyjna. Dokładna wycena po analizie projektu i warunków gruntowych."
- Ceny aktualizowane kwartalnie (Q1/Q2/Q3/Q4 2026)

### Analytics events

| Event name | Trigger | Parametry |
|---|---|---|
| `calculator_start` | Użytkownik zmienia pierwszy parametr | `step: 1` |
| `calculator_step` | Przejście do kolejnego kroku | `step: 2/3/4`, `wall_type`, `roof_type`... |
| `calculator_lead` | Wysłanie formularza (= konwersja) | `city`, `area_m2`, `wall_type`, `roof_type`, `floors`, `garage` |
| `calculator_call` | Kliknięcie „Zadzwoń" | `source: calculator` |
| `calculator_abandon` | Opuszczenie strony bez wyniku | `last_step`, `time_on_page` |

### Google Ads

**Kampanie kierujące na `/wycena`:**
- Search: „ile kosztuje budowa domu", „koszt budowy domu 2026", „kalkulator budowy domu"
- Search: „budowa domu [miasto]" + „cena", „koszt", „wycena"
- Display remarketing: odwiedzający `/oferta/*` i strony lokalne → baner „Sprawdź koszt budowy"

**Konwersje Ads:**
- Primary: `calculator_lead` (formularz wysłany)
- Secondary: `calculator_call` (telefon z kalkulatora)

### SEO

- **H1:** „Ile kosztuje budowa domu na Śląsku w 2026?"
- **Title:** „Kalkulator Budowy Domu 2026 — Wycena Online | CoreLTB Builders"
- **Schema:** FAQPage (pytania o koszty) + WebApplication (kalkulator)
- **Targetowane frazy:** kalkulator budowy domu, koszt budowy domu 2026, ile kosztuje budowa domu śląsk, wycena budowy domu online

---

## LP2: Umów konsultację `/umow-konsultacje`

**Priorytet:** P1
**Cel:** Lead z kontekstem — wiesz CZEGO chce klient, zanim oddzwonisz.
**Typ użytkownika:** „Chcę porozmawiać z kimś, kto się zna."
**Ścieżka do strony:** Floating CTA (desktop), ContactCTASection, service page CTAs

### Struktura strony

```
┌──────────────────────────────────────────────────┐
│  HERO                                            │
│  H1: "Umów bezpłatną konsultację"                │
│  Podtytuł: "Odpowiemy na Twoje pytania w ciągu   │
│  24h. Bez zobowiązań."                           │
│  Trust: zdjęcie osoby + "Rozmawiasz z inżynierem,│
│  nie z handlowcem"                               │
└──────────────────────────────────────────────────┘
│
│  FORMULARZ KONTEKSTOWY
│
│  ┌─────────────────────────────────────────────┐
│  │  Czego dotyczy zapytanie?                   │
│  │  ○ Budowa domu                              │
│  │  ○ Projektowanie                            │
│  │  ○ Nadzór inwestorski                       │
│  │  ○ Usługi techniczne (geologia, geodezja)   │
│  │  ○ Wykończenie wnętrz                       │
│  │  ○ Inne                                     │
│  │                                             │
│  │  ↓ Po wyborze — kontekstowe pytania:        │
│  │                                             │
│  │  [jeśli "Budowa domu":]                     │
│  │  Czy masz działkę?       ○ Tak ○ Nie ○ Szukam│
│  │  Czy masz projekt?       ○ Tak ○ Nie         │
│  │  Planowany metraż:       [____] m²          │
│  │                                             │
│  │  [jeśli "Nadzór":]                          │
│  │  Etap budowy:  ○ Przed startem              │
│  │                ○ W trakcie (problemy)        │
│  │                ○ Odbiór końcowy              │
│  │                                             │
│  │  [jeśli "Projektowanie":]                   │
│  │  Rodzaj projektu: ○ Indywidualny            │
│  │                   ○ Adaptacja gotowego       │
│  │                   ○ Aranżacja wnętrz        │
│  │                                             │
│  │  [wspólne:]                                 │
│  │  Lokalizacja budowy:     [dropdown miast]   │
│  │  Preferowany kontakt:    ○ Telefon ○ Email  │
│  │                          ○ Spotkanie w biurze│
│  │  Imię:       [____________]                 │
│  │  Telefon:    [____________]                 │
│  │  Email:      [____________]                 │
│  │  Uwagi:      [________________________]     │
│  │  Załącz plik: [Wybierz plik] (projekt, rzuty)│
│  │                                             │
│  │  □ Wyrażam zgodę na przetwarzanie danych... │
│  │  [Wyślij zapytanie]                         │
│  └─────────────────────────────────────────────┘
│
│  SEKCJE WSPIERAJĄCE
│  • Co się dzieje po wysłaniu? (3 kroki)
│  • „Dlaczego konsultacja z inżynierem?" — 3 karty
│  • Opinie klientów (1–2)
│  • Alternatywa: „Wolisz zadzwonić? +48 664 123 757"
```

### Query params — auto-fill z kontekstu

Strona obsługuje parametry URL, które pre-selectują usługę:

| Param | Wartość | Źródło |
|---|---|---|
| `?usluga=budowa` | Pre-select „Budowa domu" | `/oferta/kompleksowa-budowa-domow` CTA |
| `?usluga=projektowanie` | Pre-select „Projektowanie" | `/oferta/projektowanie` CTA |
| `?usluga=nadzor` | Pre-select „Nadzór inwestorski" | `/oferta/nadzor-i-doradztwo` CTA, `/kierownik-budowy-*` CTA |
| `?usluga=techniczne` | Pre-select „Usługi techniczne" | `/oferta/uslugi-techniczne` CTA |
| `?usluga=wykonczenia` | Pre-select „Wykończenie wnętrz" | `/oferta/wykonczenia-i-aranzacje` CTA |
| `?usluga=inne` | Pre-select „Inne" | — |
| `?miasto=katowice` | Pre-fill lokalizacja | Strony lokalne, kierownik-budowy |
| `?zrodlo=kalkulator` | Tracking: przyszedł z kalkulatora | `/wycena` → CTA „Umów dokładną wycenę" |

**Przykład pełnego URL:**
`/umow-konsultacje?usluga=nadzor&miasto=katowice`
→ Formularz z pre-selectem „Nadzór inwestorski" i pre-fillem „Katowice"

### Analytics events

| Event name | Trigger | Parametry |
|---|---|---|
| `consultation_form_view` | Wyświetlenie strony | `source`, `usluga` (z query param) |
| `consultation_service_select` | Wybór usługi | `service_type` |
| `consultation_lead` | Wysłanie formularza | `service_type`, `city`, `has_plot`, `has_project`, `contact_pref` |
| `consultation_file_attach` | Załączenie pliku | `file_type` |
| `consultation_call` | Kliknięcie „Zadzwoń" | `source: consultation_page` |

### Google Ads

**Kampanie kierujące na `/umow-konsultacje`:**
- Search: „firma budowlana [miasto]", „generalny wykonawca [miasto]"
- Search: „kierownik budowy [miasto]", „nadzór inwestorski [miasto]"
- Search: „projekt domu indywidualny [miasto]"
- Remarketing: odwiedzający `/wycena` bez konwersji → „Porozmawiaj z inżynierem"

**Konwersje Ads:**
- Primary: `consultation_lead`
- Secondary: `consultation_call`

### SEO

- **Title:** „Umów Bezpłatną Konsultację Budowlaną | CoreLTB Builders"
- **Noindex:** TAK — to strona konwersyjna, nie SEO (Google Ads landing)
- Alternatywnie: index z H1 „Bezpłatna konsultacja budowlana — Śląsk i Małopolska"

---

## LP3: Analiza działki `/analiza-dzialki`

**Priorytet:** P2
**Cel:** Wysoko-intentowy lead. Ktoś z działką = ktoś bliski decyzji o budowie.
**Typ użytkownika:** „Kupiłem działkę, chcę wiedzieć co mogę wybudować."
**Ścieżka do strony:** `/oferta/uslugi-techniczne` CTA, FAQ linki, strony lokalne

### Struktura strony

```
┌──────────────────────────────────────────────────┐
│  HERO                                            │
│  H1: "Czy Twoja działka nadaje się pod budowę?"  │
│  Podtytuł: "Zamów analizę — sprawdzimy grunt,    │
│  MPZP i uzbrojenie zanim wydasz 500 000 zł"     │
│  CTA: "Zamów analizę za 0 zł*"                  │
│  * — "Bezpłatna przy podpisaniu umowy na budowę" │
└──────────────────────────────────────────────────┘
│
│  CO OBEJMUJE ANALIZA (6 kart z ikonami)
│
│  ┌────────┐ ┌────────┐ ┌────────┐
│  │ 🔬     │ │ 📐     │ │ ⛏️     │
│  │Badanie │ │Analiza │ │Szkody  │
│  │gruntu  │ │MPZP    │ │górnicze│
│  │(geolo- │ │Warunki │ │Kategoria│
│  │gia)    │ │zabudowy│ │terenu  │
│  └────────┘ └────────┘ └────────┘
│  ┌────────┐ ┌────────┐ ┌────────┐
│  │ 🔌     │ │ 🚗     │ │ 📋     │
│  │Uzbro-  │ │Dojazd  │ │Raport  │
│  │jenie   │ │i infra-│ │z reko- │
│  │mediów  │ │struktu-│ │menda-  │
│  │        │ │ra      │ │cjami   │
│  └────────┘ └────────┘ └────────┘
│
│  ILE TO KOSZTUJE
│  • Analiza samodzielna: 2 500 – 4 000 zł netto
│  • Przy umowie na budowę: 0 zł (wliczone w projekt)
│  • Badania geotechniczne: 1 500 – 3 000 zł (partner)
│
│  JAK TO WYGLĄDA (timeline 4 kroki)
│  1. Wysyłasz lokalizację działki → 2. Wizja lokalna (1–2 dni)
│  3. Analiza dokumentów (3–5 dni) → 4. Raport z rekomendacjami
│
│  FORMULARZ
│  ┌─────────────────────────────────────────────┐
│  │  Adres / lokalizacja działki: [___________] │
│  │  Nr księgi wieczystej (opcj.): [___________] │
│  │  Nr działki ewidencyjnej:     [___________] │
│  │  Czy masz MPZP / WZ?   ○ Tak ○ Nie ○ Nie wiem│
│  │  Imię:    [_______]                         │
│  │  Telefon: [_______]                         │
│  │  Email:   [_______]                         │
│  │  [Zamów analizę]                            │
│  └─────────────────────────────────────────────┘
│
│  CASE STUDY (opcjonalnie)
│  "Klient kupił działkę w Zabrzu. Nasza analiza wykazała
│   szkody górnicze kat. III. Dostosowaliśmy projekt —
│   zaoszczędził 40 000 zł na niepotrzebnych fundamentach."
│
│  FAQ (3–4 pytania)
│  ContactCTASection
```

### Analytics events

| Event name | Trigger | Parametry |
|---|---|---|
| `plot_analysis_view` | Wyświetlenie strony | `source` |
| `plot_analysis_lead` | Wysłanie formularza | `has_mpzp`, `city` (z adresu) |
| `plot_analysis_call` | Kliknięcie „Zadzwoń" | `source: plot_analysis` |

### Google Ads

- Search: „analiza działki budowlanej", „badanie gruntu pod budowę", „geologia działki [miasto]"
- Search: „MPZP [miasto]", „warunki zabudowy [miasto]"

### SEO

- **Title:** „Analiza Działki Budowlanej — Grunt, MPZP, Uzbrojenie | CoreLTB"
- **Index:** TAK — targetuje frazy „analiza działki", „badanie gruntu pod budowę"
- **Schema:** Service + FAQPage

---

## LP4: Kontakt `/kontakt`

**Priorytet:** P0 (naprawa backendu — formularz nie działa!)
**Cel:** Catch-all. Dane kontaktowe, mapa, prosty formularz.
**Typ użytkownika:** „Chcę po prostu napisać/zadzwonić."

### Obecny stan i co naprawić

| Element | Obecny stan | Do zmiany |
|---|---|---|
| Formularz | Brak `onSubmit`, brak API — **nie działa** | Podłączyć backend |
| Telefon | Hardcoded `+48 573 568 300` (zły numer!) | Zmienić na `+48 664 123 757` (z company-data) |
| Email | `biuro@thebuilders.pl` (zły!) | Zmienić na `coreltb@gmail.com` |
| Mapa | Brak | Dodać mapę z 2 lokalizacjami |
| Routing | Brak | Dodać „Chcesz wycenę? → [Kalkulator](/wycena)" |

### Struktura docelowa

```
┌──────────────────────────────────────────────────┐
│  HERO (compact)                                  │
│  H1: "Porozmawiajmy o Twoim projekcie"           │
│  Podtytuł: "Odpowiadamy w ciągu 24h"             │
└──────────────────────────────────────────────────┘
│
│  INTELIGENTNY ROUTING (3 karty)
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
│  │ 💰           │ │ 📞           │ │ 🔬           │
│  │ Chcę wycenę  │ │ Chcę         │ │ Mam działkę  │
│  │              │ │ porozmawiać  │ │              │
│  │ → /wycena    │ │ → /umow-     │ │ → /analiza-  │
│  │              │ │ konsultacje  │ │   dzialki    │
│  └──────────────┘ └──────────────┘ └──────────────┘
│
│  DANE KONTAKTOWE + MAPA
│  ┌─────────────────────────┬─────────────────────┐
│  │  📍 Baza Jaworzno (HQ)  │  📍 Baza Wodzisław   │
│  │  ul. Grunwaldzka 34a    │  ul. Wałowa 55       │
│  │  43-600 Jaworzno        │  44-300 Wodzisław Śl.│
│  │                         │                     │
│  │  📞 +48 664 123 757      │  📞 +48 664 123 757  │
│  │  📧 coreltb@gmail.com    │                     │
│  │  🕐 Pn–Pt 8–17, Sb 9–14 │                     │
│  └─────────────────────────┴─────────────────────┘
│  [       Google Maps embed z 2 pinami           ]
│
│  PROSTY FORMULARZ
│  Imię [____] Telefon [____] Email [____]
│  Wiadomość [_________________________________]
│  [Wyślij wiadomość]
│
│  Socials: Facebook | Instagram | LinkedIn
```

### Analytics events

| Event name | Trigger | Parametry |
|---|---|---|
| `contact_page_view` | Wyświetlenie | `source` |
| `contact_routing_click` | Kliknięcie karty routingu | `destination: wycena/konsultacje/analiza` |
| `contact_form_submit` | Wysłanie formularza | — |
| `contact_call` | Kliknięcie telefonu | `location: jaworzno/wodzislaw` |
| `contact_email` | Kliknięcie maila | — |
| `contact_map_click` | Kliknięcie mapy | `location` |

---

## LP5: Case study `/projekty/[slug]`

**Priorytet:** P2
**Cel:** Dowód społeczny. Pokazać EFEKTY, nie obietnice.
**Typ użytkownika:** „Chcę zobaczyć co faktycznie budują."

### Struktura podstrony projektu

```
┌──────────────────────────────────────────────────┐
│  GALERIA (full-width, swipeable)                 │
│  Zdjęcia: przed → w trakcie → po                │
└──────────────────────────────────────────────────┘
│
│  KARTA PROJEKTU
│  ┌──────────────────────────────────────────────┐
│  │  Lokalizacja:        Mikołów, ul. Leśna      │
│  │  Metraż:             165 m² użytkowej         │
│  │  Technologia:        Ceramika Porotherm 25    │
│  │  Standard:           Pod Klucz                │
│  │  Czas realizacji:    12 miesięcy              │
│  │  Budżet:             ~650 000 zł netto        │
│  │  Specyfika:          Pogranicze górnicze,      │
│  │                      płyta fundamentowa        │
│  └──────────────────────────────────────────────┘
│
│  OPIS REALIZACJI (storytelling)
│  • Wyzwania (np. trudny grunt, szkody górnicze)
│  • Rozwiązania techniczne
│  • Efekt końcowy
│
│  OPINIA KLIENTA (jeśli dostępna)
│  "Cytat klienta..." — Imię, Miasto
│
│  CTA
│  "Chcesz podobny dom?"
│  [Wyceń budowę → /wycena]  [Umów konsultację → /umow-konsultacje]
│
│  POWIĄZANE REALIZACJE (grid 2–3 inne projekty)
```

### Analytics events

| Event name | Trigger | Parametry |
|---|---|---|
| `project_view` | Wyświetlenie case study | `project_slug`, `city`, `standard` |
| `project_gallery_swipe` | Przewijanie galerii | `project_slug`, `photo_index` |
| `project_cta_click` | Kliknięcie CTA | `project_slug`, `destination` |

### SEO

- **Title:** „Budowa domu {standard} {metraż}m² — {miasto} | CoreLTB Realizacje"
- **Schema:** Product (lub CreativeWork) + ImageGallery
- **Targetowane frazy:** „budowa domu [miasto] realizacja", „dom [metraż] m² pod klucz"

---

## LP6: Porównanie standardów `/porownanie-standardow`

**Priorytet:** P3
**Cel:** Edukacja → konwersja. Klient rozumie różnice → wybiera standard → kalkulator.
**Typ użytkownika:** „Co to jest stan surowy otwarty? Czym się różni od deweloperskiego?"

### Struktura strony

```
┌──────────────────────────────────────────────────┐
│  HERO                                            │
│  H1: "SSO, deweloperski czy pod klucz —          │
│       co wybrać i ile to kosztuje?"              │
└──────────────────────────────────────────────────┘
│
│  TABELA PORÓWNAWCZA (interaktywna, sticky header)
│  ┌──────────┬─────────┬──────────┬──────────┬──────────┐
│  │          │   SSO   │   SSZ    │  Dewelo- │Pod Klucz │
│  │          │         │          │ perski   │          │
│  ├──────────┼─────────┼──────────┼──────────┼──────────┤
│  │Cena/m²   │2800–3200│3200–3600 │3800–4500 │4800–5800 │
│  │Dom 120m² │336–384k │384–432k  │456–540k  │576–696k  │
│  │Dom 180m² │504–576k │576–648k  │684–810k  │864–1044k │
│  ├──────────┼─────────┼──────────┼──────────┼──────────┤
│  │Ściany    │   ✅    │   ✅     │   ✅     │   ✅     │
│  │Dach      │   ✅    │   ✅     │   ✅     │   ✅     │
│  │Okna      │   ❌    │   ✅     │   ✅     │   ✅     │
│  │Instala-  │   ❌    │   ❌     │   ✅     │   ✅     │
│  │cje       │         │          │          │          │
│  │Tynki     │   ❌    │   ❌     │   ✅     │   ✅     │
│  │Podłogi   │   ❌    │   ❌     │   ❌     │   ✅     │
│  │Kuchnia   │   ❌    │   ❌     │   ❌     │   ✅     │
│  │Łazienki  │   ❌    │   ❌     │   ❌     │   ✅     │
│  ├──────────┼─────────┼──────────┼──────────┼──────────┤
│  │Czas      │4–6 mies.│5–7 mies. │8–10 mies.│10–14 mies│
│  ├──────────┼─────────┼──────────┼──────────┼──────────┤
│  │          │[Wyceń]  │[Wyceń]   │[Wyceń]   │[Wyceń]  │
│  │          │→/wycena │→/wycena  │→/wycena  │→/wycena │
│  └──────────┴─────────┴──────────┴──────────┴──────────┘
│
│  SZCZEGÓŁOWY OPIS KAŻDEGO STANDARDU
│  (accordion / tabs — co DOKŁADNIE zawiera)
│
│  DLA KOGO? (persona matching)
│  • SSO → „Masz ekipę wykończeniową i czas"
│  • Deweloperski → „Chcesz sam wykończyć kuchnię i łazienki"
│  • Pod Klucz → „Chcesz wejść z walizką"
│
│  CTA: „Już wiesz, co chcesz? Sprawdź cenę"
│  [Kalkulator wyceny → /wycena]
│
│  FAQ (5–6 pytań)
```

### SEO

- **Title:** „Stan Surowy Otwarty vs Deweloperski vs Pod Klucz — Porównanie 2026 | CoreLTB"
- **Schema:** FAQPage + Table (Article)
- **Targetowane frazy:** „stan surowy otwarty co obejmuje", „SSO vs deweloperski", „koszt budowy domu pod klucz 2026"
- **Uwaga:** Ten LP pokrywa TODO z bazy wiedzy „Stan surowy otwarty — co obejmuje i ile kosztuje"

### Analytics events

| Event name | Trigger | Parametry |
|---|---|---|
| `comparison_view` | Wyświetlenie strony | `source` |
| `comparison_standard_select` | Kliknięcie w standard | `standard: sso/ssz/deweloperski/pod-klucz` |
| `comparison_cta_click` | Kliknięcie „Wyceń" | `standard`, `destination` |

---

## 7. Mapowanie CTA → Destynacje

### Globalne CTA (na każdej stronie)

| Element | Tekst CTA | Obecne → | Docelowe → |
|---|---|---|---|
| Header button | „Wycena" | `/kontakt` | **`/wycena`** |
| Floating CTA (desktop) | „Umów bezpłatną konsultację" | `/kontakt` | **`/umow-konsultacje`** |
| Floating phone (mobile) | ikona telefonu | `tel:+48664123757` | `tel:+48664123757` ✅ |
| Footer telefon | „Zadzwoń" | `tel:+48664123757` | ✅ |
| Footer email | „Napisz" | `mailto:coreltb@gmail.com` | ✅ |

### Homepage `/`

| Element | Tekst CTA | Obecne → | Docelowe → |
|---|---|---|---|
| Hero primary | „Poznaj ofertę" | `/oferta` | `/oferta` ✅ (lub `/wycena`) |
| Hero secondary (mobile) | „Darmowa wycena" | `/kontakt` | **`/wycena`** |
| ContactCTASection | „Umów Konsultację" | `/kontakt` | **`/umow-konsultacje`** |

### Strony lokalne `/obszar-dzialania/[slug]`

| Element | Tekst CTA | Obecne → | Docelowe → |
|---|---|---|---|
| Hero box — primary | „Zadzwoń do Nas" | `tel:+48664123757` | ✅ |
| Hero box — secondary | „Napisz do Nas" | `#kontakt` | **`/wycena`** + zmiana tekstu → „Wyceń budowę" |
| MidPageCTA — primary | „Zadzwoń do nas" | `tel:+48664123757` | ✅ |
| MidPageCTA — secondary | „Napisz wiadomość" | `/kontakt` | **`/umow-konsultacje?miasto={slug}`** |
| ContactCTASection | „Umów Konsultację" | `/kontakt` | **`/umow-konsultacje?miasto={slug}`** |

### Strony usług `/oferta/[slug]`

| Strona usługi | CTA tekst | Obecne → | Docelowe → |
|---|---|---|---|
| Kompleksowa budowa | „Umów konsultację" | `/kontakt` | **`/wycena`** (główna usługa = kalkulator) |
| Projektowanie | „Umów konsultację" | `/kontakt` | **`/umow-konsultacje?usluga=projektowanie`** |
| Nadzór i doradztwo | „Umów konsultację" | `/kontakt` | **`/umow-konsultacje?usluga=nadzor`** |
| Usługi techniczne | „Umów konsultację" | `/kontakt` | **`/analiza-dzialki`** |
| Wykończenia | „Umów konsultację" | `/kontakt` | **`/umow-konsultacje?usluga=wykonczenia`** |
| Zagospodarowanie | „Umów konsultację" | `/kontakt` | **`/umow-konsultacje?usluga=inne`** |
| Floating CTA (desktop) | „Umów bezpłatną konsultację" | `/kontakt` | **`/umow-konsultacje`** |

### Nadzór per-city `/kierownik-budowy-[miasto]`

| Element | Tekst CTA | Obecne → | Docelowe → |
|---|---|---|---|
| Hero CTA | „Umów nadzór" | `/kontakt` | **`/umow-konsultacje?usluga=nadzor&miasto={slug}`** |
| ContactCTASection | „Umów Konsultację" | `/kontakt` | **`/umow-konsultacje?usluga=nadzor&miasto={slug}`** |

---

## 8. Google Analytics 4 — eventy

### Event naming convention

Format: `{category}_{action}`

| Kategoria | Opis |
|---|---|
| `calculator_*` | Kalkulator wyceny |
| `consultation_*` | Formularz konsultacji |
| `plot_analysis_*` | Analiza działki |
| `contact_*` | Strona kontaktu |
| `project_*` | Case study |
| `comparison_*` | Porównanie standardów |
| `cta_*` | Kliknięcia CTA (globalne) |
| `phone_*` | Kliknięcia telefonu |

### Globalne eventy (na każdej stronie)

| Event | Trigger | Parametry |
|---|---|---|
| `cta_click` | Kliknięcie dowolnego CTA | `text`, `href`, `page`, `position` (header/hero/mid/footer/floating) |
| `phone_click` | Kliknięcie `tel:` linku | `page`, `position`, `phone_number` |
| `email_click` | Kliknięcie `mailto:` linku | `page` |
| `floating_phone_click` | Kliknięcie pulsującego telefonika | `page`, `tooltip_visible` |
| `floating_phone_tooltip_dismiss` | Zamknięcie dymku | `page`, `time_to_dismiss` |

### Konwersje (cele w GA4 / Google Ads)

| Konwersja | Event | Wartość | Typ |
|---|---|---|---|
| **Lead — kalkulator** | `calculator_lead` | 150 zł | Primary |
| **Lead — konsultacja** | `consultation_lead` | 100 zł | Primary |
| **Lead — analiza działki** | `plot_analysis_lead` | 200 zł | Primary |
| **Lead — kontakt** | `contact_form_submit` | 50 zł | Primary |
| **Telefon** | `phone_click` | 80 zł | Primary |

### Enhanced ecommerce (opcjonalnie)

Kalkulator jako „produkt" w GA4:
- `view_item` → wyświetlenie wyniku kalkulatora (item: dom {metraż}m² {standard})
- `begin_checkout` → start wypełniania formularza lead
- `purchase` → wysłanie lead (conversion value = szacunkowa wartość projektu × 0.03 marży)

---

## 9. Google Ads — grupy kampanii

### Kampania 1: Kalkulator (Search)

| Grupa reklam | Słowa kluczowe | Landing page |
|---|---|---|
| Koszty budowy | ile kosztuje budowa domu, koszt budowy domu 2026, cena budowy domu | `/wycena` |
| Kalkulator | kalkulator budowy domu, wycena budowy domu online, kalkulator kosztów budowy | `/wycena` |
| Budowa + miasto | budowa domu [miasto], dom [miasto] cena, budowa domu pod klucz [miasto] | `/wycena` |

### Kampania 2: Usługi (Search)

| Grupa reklam | Słowa kluczowe | Landing page |
|---|---|---|
| Generalny wykonawca | generalny wykonawca [miasto], firma budowlana [miasto] | `/umow-konsultacje?usluga=budowa` |
| Nadzór | kierownik budowy [miasto], nadzór inwestorski [miasto] | `/umow-konsultacje?usluga=nadzor` |
| Projektowanie | projekt domu [miasto], architekt [miasto], projekt domu indywidualny | `/umow-konsultacje?usluga=projektowanie` |
| Usługi techniczne | badanie gruntu [miasto], geologia [miasto], analiza działki | `/analiza-dzialki` |

### Kampania 3: Remarketing (Display + YouTube)

| Audience | Komunikat | Landing page |
|---|---|---|
| Odwiedzający /oferta/* (bez konwersji) | „Sprawdź koszt budowy w 60 sekund" | `/wycena` |
| Odwiedzający /wycena (bez lead) | „Masz pytania? Porozmawiaj z inżynierem" | `/umow-konsultacje` |
| Odwiedzający strony lokalne | „Budujemy w {miasto} — umów wizję lokalną" | `/umow-konsultacje?miasto={slug}` |
| Użyli kalkulatora (calculator_result) | „Twoja wycena czeka. Umów spotkanie" | `/umow-konsultacje?zrodlo=remarketing` |

### Kampania 4: Brand (Search)

| Grupa reklam | Słowa kluczowe | Landing page |
|---|---|---|
| Brand | coreltb, core ltb, coreltb builders | `/` |
| Brand + usługa | coreltb wycena, coreltb budowa | `/wycena` |

### UTM convention

```
?utm_source=google
&utm_medium=cpc
&utm_campaign={campaign_name}  // kalkulator, uslugi, remarketing, brand
&utm_content={ad_group}        // koszty-budowy, nadzor-katowice, remarketing-oferta
&utm_term={keyword}            // budowa+domu+katowice
```

---

## 10. Backend formularzy

### Architektura (Cloudflare-native)

```
Browser → /api/lead → Cloudflare Worker (route.ts)
                          │
                          ├─→ Walidacja (Zod)
                          ├─→ Rate limiting (KV lub Turnstile)
                          ├─→ Email notification (Resend / CF Email Routing)
                          ├─→ Webhook → CRM (opcjonalnie, przyszłość)
                          └─→ Response (200 OK / 422 Validation / 429 Rate Limit)
```

### API Routes do stworzenia

| Route | Metoda | Cel | Formularz źródłowy |
|---|---|---|---|
| `/api/lead/calculator` | POST | Lead z kalkulatora | LP1 `/wycena` |
| `/api/lead/consultation` | POST | Lead z konsultacji | LP2 `/umow-konsultacje` |
| `/api/lead/plot-analysis` | POST | Lead z analizy działki | LP3 `/analiza-dzialki` |
| `/api/lead/contact` | POST | Lead z kontaktu | LP4 `/kontakt` |

### Payload (przykład — calculator)

```typescript
interface CalculatorLeadPayload {
  // Konfiguracja
  area_m2: number;
  floors: '1' | '1+attic' | '2';
  basement: boolean;
  wall_type: 'ceramika' | 'silikaty' | 'beton_komorkowy' | 'drewno';
  roof_type: 'dwuspadowy' | 'wielospadowy' | 'plaski';
  foundation_type: 'lawy' | 'plyta' | 'nie_wiem';
  standard: 'sso' | 'ssz' | 'deweloperski' | 'pod_klucz';
  city: string;
  mining_damage: 'tak' | 'nie' | 'nie_wiem';

  // Wynik
  price_min: number;
  price_max: number;

  // Dane kontaktowe
  name: string;
  phone: string;
  email: string;
  has_project: boolean;

  // Meta
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  page_url: string;
  timestamp: string;
}
```

### Anti-spam

- **Cloudflare Turnstile** (darmowy captcha) na wszystkich formularzach
- Rate limit: max 3 submissions / IP / godzina
- Honeypot field (ukryte pole — jeśli wypełnione = bot)

### Email notification

Na każdy lead → email do `coreltb@gmail.com` z:
- Danymi kontaktowymi
- Kontekstem (usługa, metraż, miasto, parametry kalkulatora)
- Źródłem (UTM, strona referencyjna)
- Linkiem do odpowiedzi

---

## 11. Priorytety implementacji

| Faza | Co | Wysiłek | Pliki |
|---|---|---|---|
| **P0a** | Backend formularzy (API routes + email) | 2–3 dni | `app/api/lead/*/route.ts`, nowy pkg: `resend` lub CF Email |
| **P0b** | Kalkulator `/wycena` | 5–7 dni | `app/wycena/page.tsx`, `data/pricing.ts`, komponenty kalkulatora |
| **P0c** | Naprawa `/kontakt` (dane, routing) | 1 dzień | `app/kontakt/page.tsx` |
| **P1** | `/umow-konsultacje` | 2–3 dni | `app/umow-konsultacje/page.tsx` |
| **P1** | Przemapowanie CTA (tabela §7) | 1 dzień | `data/local/shared-template.ts`, `data/servicesV2.ts`, `app/layout.tsx` |
| **P2** | `/analiza-dzialki` | 1–2 dni | `app/analiza-dzialki/page.tsx` |
| **P2** | Case study `/projekty/[slug]` | 3–4 dni | `app/projekty/[slug]/page.tsx`, `data/projects.ts` |
| **P3** | `/porownanie-standardow` | 2 dni | `app/porownanie-standardow/page.tsx` |
| **P3** | GA4 event tracking | 1–2 dni | `lib/analytics.ts`, hook `useTrackEvent` |
| **P3** | Google Ads setup | Zewnętrzne | Kampanie w Google Ads console |

---

## Pliki powiązane

| Plik | Rola |
|---|---|
| `data/company-data.ts` | Single source of truth — telefon, email, adresy |
| `data/pricing.ts` | **DO STWORZENIA** — konfiguracja cen kalkulatora |
| `data/projects.ts` | **DO STWORZENIA** — dane realizacji (case study) |
| `lib/analytics.ts` | **DO STWORZENIA** — helper eventy GA4 |
| `components/ui/FloatingCTA.tsx` | Desktop floating CTA (hidden on mobile) |
| `components/ui/FloatingPhoneCTA.tsx` | Mobile pulsating phone button |
| `components/sections/ContactCTASection.tsx` | Sekcja CTA na dole stron |
| `components/sections/BentoContactSection.tsx` | Formularz kontaktowy (do podłączenia) |
