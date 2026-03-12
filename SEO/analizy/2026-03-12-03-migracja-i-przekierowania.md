# Audyt SEO domeny coreltb.pl — Plan migracji i przekierowania

**Data audytu:** 2026-03-12
**Migracja:** coreltb.pl (Venet) → coreltb.pl (Elever v3, Next.js)
**Domena docelowa:** https://coreltb.pl/ (HTTPS, bez www)
**Okres danych:** marzec 2025 – luty 2026 (12 miesięcy)

---

## 1. Strategia canonical URL

### Obecny stan (stara strona)

```
Produkcyjna wersja: http://www.coreltb.pl/ (HTTP + www)
Problem: https://coreltb.pl/ → 301 → http://www.coreltb.pl/ (HTTPS→HTTP!)
```

### Nowa strona (Elever v3)

Docelowa wersja: `https://coreltb.pl/` (HTTPS, bez www)

**Wymagane przekierowania na poziomie serwera/CDN (Cloudflare):**
```
http://coreltb.pl/*        → 301 → https://coreltb.pl/*
http://www.coreltb.pl/*    → 301 → https://coreltb.pl/*
https://www.coreltb.pl/*   → 301 → https://coreltb.pl/*
```

**WAŻNE:** Unikać łańcuchów przekierowań. Każdy wariant musi mieć JEDEN hop do canonical.

---

## 2. Tiering stron — priorytety wg danych 12-miesięcznych

### Tier 1 — KRYTYCZNE (>1000 imp lub >10 kliknięć)

| # | Stara strona | Imp (12m) | Klik | CTR | Poz |
|---|---|---|---|---|---|
| 1 | / | 7 068 | 721 | 10.2% | 19.5 |
| 2 | /oferta/budowa/budowa-katowice | 6 209 | 22 | 0.4% | 26.3 |
| 3 | /oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-katowice | 3 166 | 13 | 0.4% | 22.5 |
| 4 | /oferta/budowa/budowa-rybnik | 3 081 | 12 | 0.4% | 20.3 |
| 5 | /kontakt | 3 016 | 38 | 1.3% | 8.8 |
| 6 | /oferta/budowa/budowa-gliwice | 2 741 | 1 | 0.0% | 24.9 |
| 7 | /oferta/budowa/budowa-wodzislaw-slaski | 2 262 | 23 | 1.0% | 14.7 |
| 8 | /oferta/uslugi-techniczne/nadzor-budowy | 2 170 | 10 | 0.5% | 26.2 |
| 9 | /oferta/budowa/budowa-jaworzno | 2 039 | 25 | 1.2% | 11.8 |
| 10 | /stan-surowy-otwarty | 1 901 | 0 | 0.0% | 54.9 |
| 11 | /oferta | 1 805 | 28 | 1.6% | 3.6 |
| 12 | /oferta/budowa/dom-energooszczedny-slask | 1 672 | 2 | 0.1% | 24.7 |
| 13 | /oferta/budowa/budowa-tychy | 1 466 | 9 | 0.6% | 15.3 |
| 14 | /oferta/budowa | 1 449 | 5 | 0.3% | 15.9 |
| 15 | /o-nas | 1 333 | 22 | 1.7% | 2.3 |
| 16 | /oferta/budowa/budowa-zabrze | 1 333 | 4 | 0.3% | 19.4 |
| 17 | /oferta/projekty/projekty-indywidualne/projekty-indywidualne-katowice | 1 151 | 3 | 0.3% | 13.6 |
| 18 | /oferta/wnetrza/projektowanie-wnetrz | 1 149 | 2 | 0.2% | 14.2 |
| 19 | /stan-zero | 1 027 | 1 | 0.1% | 25.3 |

**Łącznie Tier 1:** 19 stron, ~44 000 imp, ~930 kliknięć (97.6% ruchu)

### Tier 2 — WAŻNE (200-1000 imp)

| # | Stara strona | Imp (12m) | Klik | Poz |
|---|---|---|---|---|
| 20 | /oferta/uslugi-techniczne/kosztorysowanie | 928 | 0 | 19.6 |
| 21 | /realizacje | 863 | 12 | 2.7 |
| 22 | /oferta/budowa/budowa-zory | 581 | 1 | 18.6 |
| 23 | /oferta/uslugi-techniczne/doradztwo-techniczne | 508 | 4 | 7.2 |
| 24 | /oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-wodzislaw-slaski | 482 | 15 | 7.7 |
| 25 | /oferta/uslugi-techniczne/geodezja | 424 | 0 | 56.7 |
| 26 | /pinb | 276 | 1 | 63.4 |
| 27 | /oferta/uslugi-techniczne/odbiory-techniczne | 274 | 0 | 39.4 |
| 28 | /oferta/projekty | 211 | 0 | 21.2 |
| 29 | /oferta/wnetrza | 204 | 0 | 49.3 |
| 30 | /oferta/budowa/budowa-raciborz | 201 | 0 | 10.5 |

**Łącznie Tier 2:** 11 stron, ~4 950 imp, 33 kliknięcia

### Tier 3 — NISKI PRIORYTET (<200 imp)

| # | Stara strona | Imp (12m) | Klik |
|---|---|---|---|
| 31 | /oferta/projekty/projekty-gotowe | 163 | 2 |
| 32 | /blog/stan-surowy-zamkniety... | 136 | 0 |
| 33 | /stan-pod-klucz | 133 | 0 |
| 34 | /oferta/zagospodarowanie-terenu | 126 | 3 |
| 35-47 | Pozostałe (blog, podstrony usług, zagospodarowanie) | <100 każda | ~5 |

---

## 3. Pełne mapowanie URL: stara → nowa strona

### 3.1 Strony główne (5 URL-ów)

| # | Stara strona | Nowa strona | Imp | Ryzyko | Uwagi |
|---|---|---|---|---|---|
| 1 | / | / | 7 068 | NISKIE | Bezpośredni odpowiednik, lepsza treść |
| 2 | /o-nas | /o-nas | 1 333 | NISKIE | Bezpośredni odpowiednik |
| 3 | /oferta | /oferta | 1 805 | NISKIE | Bezpośredni odpowiednik |
| 4 | /kontakt | /kontakt | 3 016 | NISKIE | Bezpośredni odpowiednik |
| 5 | /realizacje | /realizacje | 863 | NISKIE | Jeśli /realizacje istnieje w v3 |

### 3.2 Budowa — strony lokalne (9 URL-ów) → /obszar-dzialania/[slug]

| # | Stara strona | Nowa strona | Imp | Klik | Ryzyko |
|---|---|---|---|---|---|
| 6 | /oferta/budowa | /oferta/kompleksowa-budowa-domow | 1 449 | 5 | NISKIE |
| 7 | /oferta/budowa/budowa-katowice | /obszar-dzialania/katowice | 6 209 | 22 | ŚREDNIE* |
| 8 | /oferta/budowa/budowa-rybnik | /obszar-dzialania/rybnik | 3 081 | 12 | ŚREDNIE* |
| 9 | /oferta/budowa/budowa-gliwice | /obszar-dzialania/gliwice | 2 741 | 1 | ŚREDNIE* |
| 10 | /oferta/budowa/budowa-wodzislaw-slaski | /obszar-dzialania/wodzislaw-slaski | 2 262 | 23 | ŚREDNIE* |
| 11 | /oferta/budowa/budowa-jaworzno | /obszar-dzialania/jaworzno | 2 039 | 25 | ŚREDNIE* |
| 12 | /oferta/budowa/budowa-tychy | /obszar-dzialania/tychy | 1 466 | 9 | ŚREDNIE* |
| 13 | /oferta/budowa/budowa-zabrze | /oferta/kompleksowa-budowa-domow | 1 333 | 4 | **WYSOKIE** ❗ |
| 14 | /oferta/budowa/budowa-zory | /oferta/kompleksowa-budowa-domow | 581 | 1 | **WYSOKIE** ❗ |
| 15 | /oferta/budowa/budowa-raciborz | /oferta/kompleksowa-budowa-domow | 201 | 0 | ŚREDNIE |

*ŚREDNIE: Zmiana URL z /oferta/budowa/budowa-X → /obszar-dzialania/X, ale treść jest 10x lepsza. Google reindeksuje w 2-4 tyg.

**❗ WYSOKIE ryzyko dla Zabrze i Żory:**
- Zabrze: **1 333 imp, pozycja 19.4** — utrata dedykowanej strony
- Żory: **581 imp, pozycja 18.6** — j.w.
- **REKOMENDACJA:** Stworzyć strony lokalne /obszar-dzialania/zabrze i /obszar-dzialania/zory PRZED migracją

### 3.3 Budowa — specjalna (3 URL-e stanów budowy)

| # | Stara strona | Nowa strona | Imp | Ryzyko | Uwagi |
|---|---|---|---|---|---|
| 16 | /stan-surowy-otwarty | /oferta/kompleksowa-budowa-domow | 1 901 | **WYSOKIE** | 1 112 imp na frazę SSO! Potrzebna sekcja/anchor |
| 17 | /stan-zero | /oferta/kompleksowa-budowa-domow | 1 027 | ŚREDNIE | Sekcja stanów budowy na docelowej |
| 18 | /stan-pod-klucz | /oferta/kompleksowa-budowa-domow | 133 | NISKIE | j.w. |
| 19 | /oferta/budowa/dom-energooszczedny-slask | /oferta/kompleksowa-budowa-domow | 1 672 | **WYSOKIE** | Poz 5.3 na "dom energooszczędny śląsk"! |

**REKOMENDACJA dla SSO/energooszczędny:**
- Na stronie /oferta/kompleksowa-budowa-domow dodać sekcje z anchor ID: `#stan-surowy-otwarty`, `#stan-zero`, `#dom-energooszczedny`
- Redirect z anchorem: `/stan-surowy-otwarty → /oferta/kompleksowa-budowa-domow#stan-surowy-otwarty`
- Alternatywa: Dedykowane strony blogowe (wyższy priorytet SEO)

### 3.4 Projekty (5 URL-ów)

| # | Stara strona | Nowa strona | Imp | Ryzyko | Uwagi |
|---|---|---|---|---|---|
| 20 | /oferta/projekty | /oferta/projektowanie | 211 | NISKIE | |
| 21 | /oferta/projekty/projekty-indywidualne | /oferta/projektowanie | ~50 | NISKIE | |
| 22 | /oferta/projekty/projekty-indywidualne/projekty-indywidualne-katowice | /obszar-dzialania/katowice | 1 151 | **ŚREDNIE** | Poz 3.9 na "indywidualne projekty katowice"! |
| 23 | /oferta/projekty/projekty-gotowe | /oferta/projektowanie | 163 | NISKIE | |
| 24 | /oferta/projekty/oceny-stanu-technicznego | /oferta/uslugi-techniczne | <50 | NISKIE | |
| 25 | /oferta/projekty/swiadectwa-charakterystyki-energetycznej | /oferta/uslugi-techniczne | <50 | NISKIE | |

**⚠️ UWAGA #22:** Fraza "indywidualne projekty katowice" ma pozycję 3.9 i 1 151 wyświetleń! Strona /obszar-dzialania/katowice MUSI zawierać treść o projektach indywidualnych, żeby utrzymać tę pozycję.

### 3.5 Nadzór budowlany (4 URL-e)

| # | Stara strona | Nowa strona | Imp | Klik | Ryzyko |
|---|---|---|---|---|---|
| 26 | /oferta/uslugi-techniczne/nadzor-budowy | /oferta/nadzor-i-doradztwo | 2 170 | 10 | NISKIE |
| 27 | /oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-katowice | /oferta/nadzor-i-doradztwo | 3 166 | 13 | **ŚREDNIE** |
| 28 | /oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-wodzislaw-slaski | /oferta/nadzor-i-doradztwo | 482 | 15 | **ŚREDNIE** |
| — | Brak strony nadzoru Jaworzno | — | — | — | — |

**Problem:** Nadzór Katowice (3 166 imp) i Wodzisław (482 imp, 15 klik, poz 7.7!) tracą dedykowane strony lokalne. Cały ruch trafi do ogólnej strony /oferta/nadzor-i-doradztwo.

**REKOMENDACJA:** Rozważyć dodanie sekcji per-miasto na stronie nadzoru, lub dedykowane anchory.

### 3.6 Usługi techniczne (5 URL-ów)

| # | Stara strona | Nowa strona | Imp | Ryzyko |
|---|---|---|---|---|
| 29 | /oferta/uslugi-techniczne/kosztorysowanie | /oferta/uslugi-techniczne | 928 | ŚREDNIE |
| 30 | /oferta/uslugi-techniczne/doradztwo-techniczne | /oferta/nadzor-i-doradztwo | 508 | NISKIE |
| 31 | /oferta/uslugi-techniczne/geodezja | /oferta/uslugi-techniczne | 424 | NISKIE |
| 32 | /oferta/uslugi-techniczne/odbiory-techniczne | /oferta/uslugi-techniczne | 274 | NISKIE |
| 33 | /pinb | /oferta/uslugi-techniczne | 276 | NISKIE |

### 3.7 Wnętrza (3 URL-e)

| # | Stara strona | Nowa strona | Imp | Ryzyko |
|---|---|---|---|---|
| 34 | /oferta/wnetrza | /oferta/wykonczenia-i-aranzacje | 204 | NISKIE |
| 35 | /oferta/wnetrza/projektowanie-wnetrz | /oferta/wykonczenia-i-aranzacje | 1 149 | ŚREDNIE |
| 36 | /oferta/wnetrza/kompleksowe-wykonawstwo-wnetrz | /oferta/wykonczenia-i-aranzacje | <50 | NISKIE |

### 3.8 Zagospodarowanie terenu (4 URL-e)

| # | Stara strona | Nowa strona | Imp | Ryzyko |
|---|---|---|---|---|
| 37 | /oferta/zagospodarowanie-terenu | /oferta/zagospodarowanie-terenu | 126 | NISKIE |
| 38 | /oferta/zagospodarowanie-terenu/ogrodzenia | /oferta/zagospodarowanie-terenu | <50 | NISKIE |
| 39 | /oferta/zagospodarowanie-terenu/drogi | /oferta/zagospodarowanie-terenu | <50 | NISKIE |
| 40 | /oferta/zagospodarowanie-terenu/ogrody | /oferta/zagospodarowanie-terenu | <50 | NISKIE |

### 3.9 Blog (8 URL-ów)

| # | Stara strona | Nowa strona | Imp | Ryzyko |
|---|---|---|---|---|
| 41 | /blog | / | <100 | NISKIE |
| 42 | /blog/wyzwania-stojace-przed-kierownikiem-budowy | /oferta/nadzor-i-doradztwo | <50 | NISKIE |
| 43 | /blog/projektowanie-domu-jak-uwzglednic... | /oferta/projektowanie | <50 | NISKIE |
| 44 | /blog/stan-surowy-zamkniety-a-deweloperski... | /oferta/kompleksowa-budowa-domow | 136 | NISKIE |
| 45 | /blog/jakie-sa-najnowsze-rozwiazania... | /oferta/wykonczenia-i-aranzacje | <50 | NISKIE |
| 46 | /blog/nowoczesne-przestrzenie-mieszkalne-budownictwo-w-jaworznie | /obszar-dzialania/jaworzno | <50 | NISKIE |
| 47 | /blog/projektowanie-domow-nowoczesnosc... | /oferta/projektowanie | <50 | NISKIE |

---

## 4. Brakujące miasta — analiza i rekomendacja

### Miasta z ruchem na starej stronie, BEZ strony w Elever v3

| Miasto | Imp (12m) | Klik | Poz | Priorytet |
|---|---|---|---|---|
| **Zabrze** | **1 333** | 4 | 19.4 | 🔴 KRYTYCZNY |
| **Żory** | **581** | 1 | 18.6 | 🟡 WYSOKI |
| **Racibórz** | **201** | 0 | 10.5 | 🟢 ŚREDNI |

### Zabrze — szczegóły

- 1 333 wyświetleń = więcej niż /o-nas!
- Frazy: "budowa domów jednorodzinnych zabrze" (244 imp, poz 7.5 — PRAWIE TOP 5!)
- Stara strona: 422 słowa
- **AKCJA:** Stworzyć `/data/local/cities/zabrze.ts` — priorytet P0 (przed migracją)
- Szacowany nakład: 2-3h (kopiuj szablon z najbliższego miasta — Gliwice)

### Żory — szczegóły

- 581 wyświetleń, frazy "budowa domów żory" (229 imp, poz 16.5), "budowa domu żory" (203 imp, poz 13.3)
- Stara strona: 436 słów
- **AKCJA:** Stworzyć `/data/local/cities/zory.ts` — priorytet P1 (do miesiąca po migracji)

### Racibórz — szczegóły

- 201 wyświetleń, ale pozycja 10.5 (!) — blisko TOP 10
- **AKCJA:** Stworzyć `/data/local/cities/raciborz.ts` — priorytet P2 (do 3 miesięcy po migracji)

---

## 5. Brakująca treść — tematy z ruchem bez odpowiednika w v3

| Temat | Imp (12m) | Stara strona | Status w v3 | Rekomendacja |
|---|---|---|---|---|
| Stan surowy otwarty | 1 901 | /stan-surowy-otwarty (443 sł.) | Sekcja na stronie budowy | Dedykowana sekcja z anchor + blog post |
| Stan zero | 1 027 | /stan-zero (443 sł.) | Sekcja na stronie budowy | j.w. |
| Kosztorysowanie | 928 | /kosztorysowanie (307 sł.) | Brak dedykowanej treści | Sekcja na /oferta/uslugi-techniczne |
| Dom energooszczędny | 1 672 | /dom-energooszczedny-slask (445 sł.) | Brak! | Dedykowana strona lub blog post |
| Geodezja | 424 | /geodezja | Sekcja | OK, ale anchor potrzebny |
| Stan pod klucz | 133 | /stan-pod-klucz | Sekcja na stronie budowy | OK |
| PINB | 276 | /pinb | Brak | Niska priorytet, redirect do usługi-tech |

---

## 6. Gotowy kod przekierowań — next.config.js

```javascript
// next.config.js — sekcja redirects
async redirects() {
  return [
    // === TIER 1: KRYTYCZNE (>1000 imp) ===

    // Strony lokalne budowy → obszar-dzialania
    {
      source: '/oferta/budowa/budowa-katowice',
      destination: '/obszar-dzialania/katowice',
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-rybnik',
      destination: '/obszar-dzialania/rybnik',
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-gliwice',
      destination: '/obszar-dzialania/gliwice',
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-wodzislaw-slaski',
      destination: '/obszar-dzialania/wodzislaw-slaski',
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-jaworzno',
      destination: '/obszar-dzialania/jaworzno',
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-tychy',
      destination: '/obszar-dzialania/tychy',
      permanent: true,
    },

    // Zabrze/Żory — tymczasowo do ogólnej budowy (docelowo: stworzyć strony lokalne!)
    {
      source: '/oferta/budowa/budowa-zabrze',
      destination: '/obszar-dzialania/zabrze', // WYMAGA stworzenia strony!
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-zory',
      destination: '/obszar-dzialania/zory', // WYMAGA stworzenia strony!
      permanent: true,
    },
    {
      source: '/oferta/budowa/budowa-raciborz',
      destination: '/oferta/kompleksowa-budowa-domow', // Tymczasowo, do stworzenia strony
      permanent: true,
    },

    // Budowa ogólna
    {
      source: '/oferta/budowa',
      destination: '/oferta/kompleksowa-budowa-domow',
      permanent: true,
    },

    // Stany budowy
    {
      source: '/stan-surowy-otwarty',
      destination: '/oferta/kompleksowa-budowa-domow',
      permanent: true,
    },
    {
      source: '/stan-zero',
      destination: '/oferta/kompleksowa-budowa-domow',
      permanent: true,
    },
    {
      source: '/stan-pod-klucz',
      destination: '/oferta/kompleksowa-budowa-domow',
      permanent: true,
    },

    // Dom energooszczędny
    {
      source: '/oferta/budowa/dom-energooszczedny-slask',
      destination: '/oferta/kompleksowa-budowa-domow',
      permanent: true,
    },

    // Projekty
    {
      source: '/oferta/projekty',
      destination: '/oferta/projektowanie',
      permanent: true,
    },
    {
      source: '/oferta/projekty/projekty-indywidualne',
      destination: '/oferta/projektowanie',
      permanent: true,
    },
    {
      source: '/oferta/projekty/projekty-indywidualne/projekty-indywidualne-katowice',
      destination: '/obszar-dzialania/katowice',
      permanent: true,
    },
    {
      source: '/oferta/projekty/projekty-gotowe',
      destination: '/oferta/projektowanie',
      permanent: true,
    },
    {
      source: '/oferta/projekty/oceny-stanu-technicznego',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },
    {
      source: '/oferta/projekty/swiadectwa-charakterystyki-energetycznej',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },

    // Nadzór
    {
      source: '/oferta/uslugi-techniczne/nadzor-budowy',
      destination: '/oferta/nadzor-i-doradztwo',
      permanent: true,
    },
    {
      source: '/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-katowice',
      destination: '/oferta/nadzor-i-doradztwo',
      permanent: true,
    },
    {
      source: '/oferta/uslugi-techniczne/nadzor-budowy/nadzor-budowy-wodzislaw-slaski',
      destination: '/oferta/nadzor-i-doradztwo',
      permanent: true,
    },

    // === TIER 2: WAŻNE (200-1000 imp) ===

    // Usługi techniczne
    {
      source: '/oferta/uslugi-techniczne-w-budownictwie',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },
    {
      source: '/oferta/uslugi-techniczne/kosztorysowanie',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },
    {
      source: '/oferta/uslugi-techniczne/doradztwo-techniczne',
      destination: '/oferta/nadzor-i-doradztwo',
      permanent: true,
    },
    {
      source: '/oferta/uslugi-techniczne/geodezja',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },
    {
      source: '/oferta/uslugi-techniczne/odbiory-techniczne',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },
    {
      source: '/pinb',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },

    // Wnętrza
    {
      source: '/oferta/wnetrza',
      destination: '/oferta/wykonczenia-i-aranzacje',
      permanent: true,
    },
    {
      source: '/oferta/wnetrza/projektowanie-wnetrz',
      destination: '/oferta/wykonczenia-i-aranzacje',
      permanent: true,
    },
    {
      source: '/oferta/wnetrza/kompleksowe-wykonawstwo-wnetrz',
      destination: '/oferta/wykonczenia-i-aranzacje',
      permanent: true,
    },

    // === TIER 3: NISKI PRIORYTET (<200 imp) ===

    // Zagospodarowanie (slug identyczny, ale podstrony trzeba redirect)
    {
      source: '/oferta/zagospodarowanie-terenu/ogrodzenia',
      destination: '/oferta/zagospodarowanie-terenu',
      permanent: true,
    },
    {
      source: '/oferta/zagospodarowanie-terenu/drogi',
      destination: '/oferta/zagospodarowanie-terenu',
      permanent: true,
    },
    {
      source: '/oferta/zagospodarowanie-terenu/ogrody',
      destination: '/oferta/zagospodarowanie-terenu',
      permanent: true,
    },

    // Usługi techniczne — stary path
    {
      source: '/oferta/uslugi-techniczne-w-budownictwie/:path*',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },

    // Blog
    {
      source: '/blog',
      destination: '/',
      permanent: true,
    },
    {
      source: '/blog/stan-surowy-zamkniety-a-deweloperski-roznice-i-znaczenie-dla-inwestora',
      destination: '/oferta/kompleksowa-budowa-domow',
      permanent: true,
    },
    {
      source: '/blog/nowoczesne-przestrzenie-mieszkalne-budownictwo-w-jaworznie',
      destination: '/obszar-dzialania/jaworzno',
      permanent: true,
    },
    {
      source: '/blog/wyzwania-stojace-przed-kierownikiem-budowy',
      destination: '/oferta/nadzor-i-doradztwo',
      permanent: true,
    },
    {
      source: '/blog/:slug',
      destination: '/',
      permanent: true,
    },

    // Catch-all dla /oferta/uslugi-techniczne (stary path)
    {
      source: '/oferta/uslugi-techniczne/:path*',
      destination: '/oferta/uslugi-techniczne',
      permanent: true,
    },
  ];
},
```

**UWAGA:** Kolejność redirectów ma znaczenie w Next.js — bardziej specyficzne reguły muszą być PRZED catch-all.

---

## 7. Ocena ryzyka per kategoria

| Kategoria | Imp | Ryzyko | Uzasadnienie |
|---|---|---|---|
| Homepage | 7 068 | 🟢 NISKIE | Bezpośredni 1:1, lepsza treść |
| Kontakt + O nas | 4 349 | 🟢 NISKIE | 1:1 mapping |
| Strony lokalne (6 miast) | ~17 800 | 🟡 ŚREDNIE | Zmiana URL, ale 10x lepsza treść |
| Zabrze + Żory | 1 914 | 🔴 WYSOKIE | Brak stron w v3! |
| Nadzór (Katowice) | 3 166 | 🟡 ŚREDNIE | Utrata dedykowanej strony per-miasto |
| SSO / Stan zero | 2 928 | 🟡 ŚREDNIE | Utrata dedykowanych stron, ale sekcje na stronie budowy |
| Dom energooszczędny | 1 672 | 🔴 WYSOKIE | Utrata dedykowanej strony, poz 5.3 |
| Projekty Katowice | 1 151 | 🟡 ŚREDNIE | Poz 3.9 — musi być treść o projektach na stronie Katowice |
| Blog | ~385 | 🟢 NISKIE | Minimalny ruch, redirect do tematycznych stron |

---

## 8. Post-migration checklist

### Dzień migracji (D-0)

- [ ] Wdrożyć WSZYSTKIE przekierowania 301 z sekcji 6
- [ ] Skonfigurować canonical URL: https://coreltb.pl/ (Cloudflare)
- [ ] Przekierować warianty www/http na poziomie DNS/CDN
- [ ] Zweryfikować, że łańcuch przekierowań = max 1 hop
- [ ] Ustawić HSTS header (Strict-Transport-Security)
- [ ] Sprawdzić robots.txt — brak Disallow na krytyczne strony
- [ ] Wgrać nowy sitemap.xml (z wszystkimi nowymi URL-ami)
- [ ] Przetestować KAŻDY redirect z tabeli — curl -I

### Tydzień 1 (D+1 do D+7)

- [ ] Zgłosić sitemap w GSC
- [ ] Użyć URL Inspection Tool na TOP 19 stronach Tier 1
- [ ] Monitorować GSC Coverage report — błędy 404
- [ ] Sprawdzić w GSC czy stare URL-e są oznaczone jako "Redirected"
- [ ] Monitorować Core Web Vitals w GSC

### Miesiąc 1 (D+7 do D+30)

- [ ] Porównać ruch organiczny tydzień-do-tygodnia vs pre-migracja
- [ ] Sprawdzić pozycje na 15 Quick Wins fraz
- [ ] Zweryfikować indeksację nowych stron /obszar-dzialania/*
- [ ] Stworzyć stronę Zabrze (/obszar-dzialania/zabrze) — jeśli nie przed migracją
- [ ] Stworzyć stronę Żory (/obszar-dzialania/zory)

### Miesiąc 2-3 (D+30 do D+90)

- [ ] Analiza pozycji: czy frazy wracają do poziomu pre-migracji?
- [ ] Stworzyć stronę Racibórz (/obszar-dzialania/raciborz)
- [ ] Rozważyć blog post o stanach budowy (SSO, stan zero) — odzyskanie dedykowanej treści
- [ ] Rozważyć blog post o domach energooszczędnych na Śląsku
- [ ] Dodać FAQ schema na wszystkie strony lokalne
- [ ] Optymalizacja meta title/description wg danych CTR

### Miesiąc 6+ (D+180)

- [ ] Pełna analiza: porównanie ruchu 6 mies. pre vs post migracji
- [ ] Ocena ROI z nowych stron lokalnych
- [ ] Usunięcie tymczasowych redirectów (jeśli nowe strony przejęły pozycje)

---

## 9. Podsumowanie ryzyka migracji

| Scenariusz | Prawdopodobieństwo | Wpływ | Mitygacja |
|---|---|---|---|
| Spadek ruchu 10-20% w mies. 1-2 | WYSOKIE (80%) | ŚREDNI | Normalne przy migracji, HTTPS bonus kompensuje |
| Utrata pozycji "dom energooszczędny" (poz 5.3) | ŚREDNIE (50%) | NISKI | Dodać sekcję na stronie budowy |
| Utrata pozycji Zabrze (poz 19.4, 1333 imp) | WYSOKIE (70%) | ŚREDNI | Stworzyć stronę PRZED migracją |
| Utrata pozycji "indywidualne projekty katowice" (3.9) | ŚREDNIE (40%) | NISKI | Dodać treść o projektach na stronie Katowice |
| Poprawa pozycji dzięki lepszej treści (3-6 mies.) | WYSOKIE (85%) | WYSOKI (pozytywny) | 10x lepsza treść + HTTPS + CWV |
| Wzrost CTR dzięki HTTPS + lepszym meta | WYSOKIE (90%) | ŚREDNI (pozytywny) | Lepsze snippets, FAQ schema |

**Werdykt ogólny:** Migracja jest KORZYSTNA długoterminowo. Krótkoterminowe ryzyko jest do opanowania przy prawidłowych przekierowaniach i stworzeniu brakujących stron (Zabrze, Żory).

---

*Następny raport: [04 — Analiza kontentowa](./2026-03-12-04-analiza-kontentowa.md)*
