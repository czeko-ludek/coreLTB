# Google Ads — Kampania CoreLTB Builders

> **Status:** Planowanie
> **Data:** 2026-03-23
> **Budżet:** 50 zł/dzień (1 500 zł/mies.)
> **Typ kampanii:** Performance Max
> **Konto Google Ads:** TODO — do utworzenia

---

## 1. Dlaczego Performance Max, a nie Search

| Czynnik | Search | PMax | Nasz kontekst |
|---|---|---|---|
| Skala geograficzna | Osobna grupa na każde miasto — setki kombinacji | Jeden asset group na 3 województwa | 2 bazy, 3 województwa, dziesiątki miast |
| Google Maps | Nie obsługuje | Obsługuje — reklamy w Mapach | 2 wizytówki GBP (Wodzisław + Jaworzno) |
| Remarketing | Osobna kampania Display/RLSA | Wbudowany | Cykl decyzyjny 6–18 mies. — remarketing to konieczność |
| Faza lejka | Tylko koniec (user wpisuje frazę) | Cały lejek (Display, YouTube, Maps, Search) | Chcemy łapać klienta zanim zacznie szukać wykonawcy |
| Budżet 50 zł/dzień | Wystarczy, ale ograniczony zasięg | Wystarczy przy prostych konwersjach | Konwersja = telefon / formularz — prosta, częsta akcja |

**Decyzja:** PMax jako główna kampania. Search ewentualnie jako uzupełnienie w przyszłości (brand protection).

---

## 2. Konfiguracja kampanii

### Ustawienia podstawowe

| Parametr | Wartość |
|---|---|
| **Nazwa kampanii** | CoreLTB — PMax — Budowa Domów |
| **Cel** | Leady (Leads) |
| **Budżet dzienny** | 50 zł |
| **Strategia stawek** | Maksymalizuj konwersje (bez docelowego CPA na start) |
| **Lokalizacja** | Śląskie + Małopolskie + Opolskie |
| **Język** | Polski |
| **Wizytówki GBP** | Podpięte obie: Wodzisław Śl. + Jaworzno |
| **Final URL expansion** | ON — pozwól Google kierować na najlepsze podstrony |
| **Schedule** | 6:00–22:00 (budowlanka — nikt nie dzwoni w nocy) |

### Konwersje (KRYTYCZNE — ustawić przed startem)

| Konwersja | Typ | Wartość | Priorytet |
|---|---|---|---|
| **Kliknięcie telefonu** | Phone click | 50 zł | Primary |
| **Submit /wycena** | Form submit | 100 zł | Primary |
| **Submit /umow-konsultacje** | Form submit | 100 zł | Primary |
| **Submit /analiza-dzialki** | Form submit | 80 zł | Primary |
| **Kliknięcie "Zadzwoń" z GBP** | GBP call | 50 zł | Primary |

> **UWAGA:** Wartości konwersji to szacunki do optymalizacji AI. Przy średniej wartości kontraktu 500k zł i konwersji lead→klient ~5%, realny CPA powinien być < 200 zł żeby się opłacało. Przy CPA 30–50 zł to będzie doskonały ROI.

### Wykluczenia

- **Frazy do wykluczenia (negative keywords, poziom konta):**
  - praca, oferty pracy, zatrudnienie, dam pracę
  - kurs, szkolenie, studia
  - darmowe, za darmo, tanio
  - warszawa, gdańsk, poznań, wrocław, łódź (poza zasięgiem)
  - deweloper, mieszkanie, blok

---

## 3. Asset Group

### Nazwa: „Budowa domów — Śląsk, Małopolska, Opolskie"

### Nagłówki (15 szt., max 30 znaków)

| # | Nagłówek | Typ |
|---|---|---|
| 1 | Budowa Domów — Śląsk | Geo |
| 2 | Budowa Domów Pod Klucz | Usługa |
| 3 | Stała Cena w Umowie | USP |
| 4 | Kalkulator Budowy Online | Narzędzie |
| 5 | Generalny Wykonawca Domów | Usługa |
| 6 | Domy SSO i Pod Klucz | Usługa |
| 7 | 10 Lat Gwarancji | USP |
| 8 | Budowa Domów — Katowice | Geo |
| 9 | Budowa Domów — Rybnik | Geo |
| 10 | Oblicz Koszt w 60 Sekund | CTA |
| 11 | 200+ Zrealizowanych Domów | Social proof |
| 12 | Firma Budowlana — Śląsk | Geo |
| 13 | Budowa od Fundamentów | Usługa |
| 14 | Umów Bezpłatną Konsultację | CTA |
| 15 | Budowa Domów — Małopolska | Geo |

### Długie nagłówki (5 szt., max 90 znaków)

| # | Długi nagłówek |
|---|---|
| 1 | Budowa domów na Śląsku i w Małopolsce — stała cena, gwarancja terminu |
| 2 | Oblicz koszt budowy domu w 60 sekund — darmowy kalkulator online |
| 3 | Generalny wykonawca domów jednorodzinnych — od projektu po klucz |
| 4 | Budujemy domy SSO, deweloperskie i pod klucz — 10 lat gwarancji |
| 5 | Firma budowlana z 15-letnim doświadczeniem — Śląsk, Małopolska, Opolskie |

### Opisy (5 szt., max 90 znaków)

| # | Opis |
|---|---|
| 1 | Budowa domów jednorodzinnych na Śląsku, w Małopolsce i na Opolszczyźnie. Stała cena ryczałtowa w umowie. |
| 2 | Kalkulator budowy domu online — poznaj koszt SSO, stanu deweloperskiego i pod klucz w 60 sekund. |
| 3 | Od fundamentu po odbiór kluczy. Płyty fundamentowe, domy murowane, technologia WT 2026. 10 lat gwarancji. |
| 4 | 200+ zrealizowanych domów. Dwie bazy: Jaworzno i Wodzisław Śląski. Obsługujemy 3 województwa. |
| 5 | Bezpłatna konsultacja i analiza działki. Dobierzemy technologię do Twojego gruntu i budżetu. |

### Obrazy (min. 15 szt.)

| Typ | Źródło | Format |
|---|---|---|
| Realizacje — domy gotowe (5-8) | Zdjęcia z realizacji CoreLTB | 1200×628 (landscape) |
| Budowy w trakcie (3-4) | Zdjęcia z budów | 1200×628 |
| Projekty domów — wizualizacje (3-4) | Najładniejsze thumbnails z /projekty | 1200×628 |
| Kalkulator — screenshot (1-2) | Screenshot /wycena z wyceną | 1200×628 |
| Logo kwadratowe | logo-black.png | 1200×1200 |
| Logo landscape | logo na białym tle | 1200×628 |

> **TODO:** Przygotować zdjęcia realizacji. Wizualizacje projektów mamy — wybrać 5 najładniejszych z `/public/images/projekty/`.

### Sitelinki

| Tekst | URL | Opis |
|---|---|---|
| Kalkulator budowy | /wycena/ | Oblicz koszt budowy domu online |
| Projekty domów | /projekty/ | 250+ projektów z kalkulacją |
| Umów konsultację | /umow-konsultacje/ | Bezpłatna rozmowa z inżynierem |
| Analiza działki | /analiza-dzialki/ | Bezpłatna ocena warunków budowy |
| Budowa domów — oferta | /oferta/kompleksowa-budowa-domow/ | SSO, deweloperski, pod klucz |

---

## 4. Wizytówki Google Business Profile

| Wizytówka | Adres | Status | Rola w kampanii |
|---|---|---|---|
| CoreLTB Builders — Jaworzno | [adres biura] | TODO: sprawdzić | Obsługuje: Katowice, Tychy, Jaworzno, Mikołów, Chrzanów, Kraków |
| CoreLTB Builders — Wodzisław Śl. | [adres biura] | TODO: sprawdzić | Obsługuje: Rybnik, Wodzisław, Jastrzębie, Żory, Racibórz |

> **WAŻNE:** Wizytówki muszą być:
> - Zweryfikowane
> - Podpięte do tego samego konta Google co Google Ads
> - Z aktualnymi godzinami, telefonem, zdjęciami
> - Kategoria: „Firma budowlana" (General contractor)

---

## 5. Landing pages — mapowanie

PMax z Final URL expansion sam wybierze najlepszą stronę. Ale warto ustawić te jako preferowane:

| Intencja klienta | URL | Co zobaczy |
|---|---|---|
| Ogólna (default) | / | Strona główna z hero + usługi |
| Szuka ceny | /wycena/ | Kalkulator — konwersja natychmiast |
| Szuka firmy w mieście | /obszar-dzialania/[miasto]/ | Lokalna strona + CTA do kalkulatora |
| Szuka projektów | /projekty/ | 520 projektów z cenami |
| Szuka nadzoru | /kierownik-budowy-[miasto]/ | Dedykowana strona nadzoru |

---

## 6. Faza nauki — co robić, czego NIE robić

### Tydzień 1–2 (faza nauki AI)

| Rób | NIE rób |
|---|---|
| Sprawdzaj czy konwersje się rejestrują | Nie zmieniaj budżetu |
| Monitoruj spam/boty w leadach | Nie zmieniaj assetów |
| Sprawdzaj raport „Where ads showed" | Nie wyłączaj kampanii |
| Dodawaj negative keywords jeśli widać śmieci | Nie zmieniaj strategii stawek |

### Tydzień 3–4 (optymalizacja)

- Sprawdź raport assetów — usuń te z oceną „Low"
- Sprawdź „Placement report" — wyklucz nieistotne strony/aplikacje
- Sprawdź „Search terms" — dodaj negative keywords
- Oceń CPA — czy jest < 50 zł?

### Miesiąc 2+ (skalowanie)

- Jeśli CPA < 30 zł → zwiększ budżet do 75–100 zł/dzień
- Dodaj drugi asset group (np. osobny dla „kierownik budowy" / „nadzór")
- Rozważ kampanię Search na brand keywords (ochrona marki)

---

## 7. Metryki sukcesu

| Metryka | Cel (miesiąc 1) | Cel (miesiąc 3) |
|---|---|---|
| **CPA (koszt leada)** | < 50 zł | < 30 zł |
| **Liczba leadów/mies.** | 30+ | 50+ |
| **CTR** | > 3% | > 5% |
| **Konwersje z Maps** | Monitorować | > 30% udziału |
| **ROAS** | Nie mierzalny od razu (długi cykl) | Pierwszy kontrakt z Ads |

### ROI rachunek

- Budżet miesięczny: **1 500 zł**
- Przy CPA 30 zł = **50 leadów/miesiąc**
- Konwersja lead → klient: ~5% = **2,5 klienta/miesiąc**
- Średnia wartość kontraktu: **500 000 zł**
- **Przychód z Ads: ~1 250 000 zł/mies. vs koszt 1 500 zł = ROAS 833:1**

Nawet przy 1% konwersji i 1 kliencie na kwartał, Ads się zwraca wielokrotnie.

---

## 8. Wymagania techniczne (przed startem)

### Must-have

- [ ] Konto Google Ads (utworzyć)
- [ ] Podpięcie wizytówek GBP do konta Ads
- [ ] GTM Container → osadzić w `app/layout.tsx`
- [ ] GA4 Property → Measurement ID
- [ ] Conversion tracking: phone click + form submit (3 formularze)
- [ ] Honeypot na formularzach (JEST — `website` field w `/api/lead`)
- [ ] Cookie consent → zgoda na marketing cookies (JEST — `CookieConsent.tsx`)

### Nice-to-have (miesiąc 2)

- [ ] Enhanced conversions (dane klienta → lepsza atrybucja)
- [ ] Offline conversion import (CRM → zamknięte kontrakty do Google Ads)
- [ ] YouTube video asset (30–60 sek. z budowy)

---

## 9. Harmonogram wdrożenia

| Tydzień | Zadanie |
|---|---|
| **T1** | Utworzenie konta Google Ads, podpięcie GBP, GTM + GA4 |
| **T1** | Konfiguracja konwersji (phone click, form submit) |
| **T1** | Przygotowanie assetów (zdjęcia, nagłówki, opisy) |
| **T2** | Uruchomienie kampanii PMax (50 zł/dzień) |
| **T2–T3** | Faza nauki — nie ruszać, monitorować konwersje |
| **T4** | Pierwsza optymalizacja — negative keywords, ocena assetów |
| **M2** | Ocena CPA, decyzja o skalowaniu budżetu |
| **M3** | Ewentualne dodanie kampanii Search (brand) lub drugiego asset group |

---

## 10. Notatki i decyzje

| Data | Decyzja / notatka |
|---|---|
| 2026-03-23 | Analiza CPC: frazy lokalne 0,50–2,70 zł (LOW competition). PMax wybrany zamiast Search ze względu na skalę geograficzną, 2 wizytówki GBP, długi cykl decyzyjny i wbudowany remarketing. |
