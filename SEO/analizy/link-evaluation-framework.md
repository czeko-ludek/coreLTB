# Framework Oceny Linków — CoreLTB Builders

**Utworzono:** 2026-03-31
**Źródła:** WPPoland, ALM Corp, Respona, Editorial.link, WhitePress Knowledge Base, LinkDoctor, Delante, SEOsklep24, The Links Guy, Authority Exchange

> DR to zaledwie 1 z 12 czynników. Google nie używa DR/DA — to metryki firm trzecich.
> Jeden link DR 25 z tematycznego portalu regionalnego > link DR 80 z niezwiązanego serwisu.

---

## 1. PEŁNA LISTA CZYNNIKÓW OCENY (12 kryteriów)

### Tier A — Krytyczne (decydują o zakupie/rezygnacji)

| # | Czynnik | Waga | Co sprawdzić | Red flag |
|---|---------|------|-------------|----------|
| 1 | **Relevancja tematyczna** | 20% | Czy portal pisze o budownictwie / nieruchomościach / regionie? Czy artykuł sponsorowany będzie otoczony powiązanym kontekstem? | Portal o krypto/modzie z sekcją "artykuły sponsorowane" — zero kontekstu |
| 2 | **Relevancja regionalna** | 15% | Czy portal jest z naszego regionu (Śląsk, ROW, Małopolska)? Czy Google kojarzy portal z lokalizacją? | Portal ogólnopolski bez sekcji regionalnej — słaby sygnał local SEO |
| 3 | **Realny ruch organiczny** | 15% | Sprawdź w Ahrefs/Semrush/SimilarWeb. Minimum 1000 sesji/mies. Portal z ruchem = Google mu ufa | Ruch < 500/mies., spadający trend, ruch tylko z direct (boty?) |
| 4 | **Linki wychodzące na stronie** | 10% | Ile outbound linków ma artykuł / strona? Im mniej, tym więcej "link juice" dostaniesz. Ideał: 2-5 linków w artykule | Strona z 30+ linkami wychodzącymi — Twój link dostanie ~3% mocy. "Link farm" |

### Tier B — Ważne (wpływają na wartość linku)

| # | Czynnik | Waga | Co sprawdzić | Red flag |
|---|---------|------|-------------|----------|
| 5 | **Umiejscowienie linku** | 10% | Czy link będzie w treści artykułu (body), czy w stopce/sidebarze? Wyżej na stronie = więcej wartości | Link w stopce, sidebarze, sekcji "partnerzy" — minimalna wartość SEO |
| 6 | **DR / DA portalu** | 8% | Domain Rating (Ahrefs) / Domain Authority (Moz). Screening, nie decyzja. DR 20+ OK, DR 40+ dobrze | DR < 10 — ryzyko PBN/spam. DR > 60 ale zero ruchu — sztuczne pompowanie |
| 7 | **Oznaczenie artykułu** | 8% | Jak portal oznacza artykuł? "artykuł sponsorowany" + dofollow OK. Jeśli `rel="sponsored"` — link jest wskazówką, nie przekazuje pełnej mocy | `noindex` na artykule = Google w ogóle nie widzi strony = link bezwartościowy |
| 8 | **Jakość treści portalu** | 5% | Czy portal publikuje oryginalne artykuły? Czy mają redakcję? Komentarze od czytelników? | Same artykuły sponsorowane, zero redakcyjnych treści, brak komentarzy |

### Tier C — Uzupełniające (fine-tuning)

| # | Czynnik | Waga | Co sprawdzić | Red flag |
|---|---------|------|-------------|----------|
| 9 | **Podlinkowanie wewnętrzne** | 3% | Czy portal podlinkuje artykuł z kategorii / strony głównej? Im więcej internal links → artykuł dostaje więcej authority | Artykuł opublikowany i zakopany — brak linków z kategorii, po tygodniu znika z homepage |
| 10 | **Czas publikacji** | 3% | Bezterminowo = dobrze. 6/12 miesięcy = OK ale tracisz link. Sprawdź czy po wygaśnięciu usuwają | Publikacja na 3 miesiące — za krótko, Google nie zdąży zindeksować efektu |
| 11 | **Stosunek cena / wartość** | 2% | PLN per punkt DR to uproszczenie. Licz raczej: cena / (DR × ruch × relevancja) | > 500 PLN za DR < 25 bez ruchu = wyrzucone pieniądze |
| 12 | **Dozwolone anchory** | 1% | Czy możesz użyć exact match? Branded? URL? Im więcej opcji tym lepiej | Tylko URL / brand — ogranicza strategię anchorów |

---

## 2. JAK CZYTAĆ OFERTĘ WHITEPRESS — co znaczy każde pole

### Przykład: naszwodzislaw.com

```
ID: 22400
Linki: 2x Dofollow          ← Dwa linki dofollow w artykule — DOBRZE
Anchory: URL, Brand          ← Możesz: goły URL lub "CoreLTB Builders" — brak exact match
Czas: Bezterminowo           ← Link zostaje na zawsze — IDEALNIE
Podlinkowanie: Kategoria     ← Artykuł pojawi się w kategorii (nie tylko deep link) — DOBRZE
Oznaczenie: artykuł partnerski, materiał partnera  ← Czytelne, ale sprawdź HTML
Treść: standard 2500 znaków  ← Minimum. Lepiej dopłacić za dłuższy tekst
Promocja: 1x image           ← Jedno zdjęcie — standard
Cena: 95,80 PLN netto        ← Tania oferta
```

### Co sprawdzić ZANIM kupisz:

| Krok | Akcja | Jak |
|------|-------|-----|
| 1 | **Sprawdź czy artykuły mają `noindex`** | Google: `site:naszwodzislaw.com` — czy wyniki pokazują artykuły sponsorowane? Jeśli tak = indeksowane = OK |
| 2 | **Policz linki wychodzące** | Otwórz losowy artykuł sponsorowany na portalu. Prawoklik → "Zbadaj" → policz `<a href>` do zewnętrznych domen. Powyżej 10 = rozcieńczenie |
| 3 | **Sprawdź `rel` atrybuty** | Na istniejącym artykule sponsorowanym sprawdź czy linki mają `rel="dofollow"`, `rel="nofollow"`, `rel="sponsored"` czy nic (nic = dofollow domyślnie) |
| 4 | **Sprawdź ruch w Ahrefs/Semrush** | Wklej domenę. Ruch organiczny > 1000? Trend rosnący/stabilny? |
| 5 | **Sprawdź podlinkowanie** | Czy artykuł sponsorowany jest widoczny z kategorii? Czy po tygodniu znika? |
| 6 | **Sprawdź sąsiedztwo** | Jakie inne firmy mają artykuły sponsorowane? Jeśli kasyna, pożyczki, krypto — uciekaj |

---

## 3. LINK JUICE — JAK DZIAŁA ROZCIEŃCZENIE

### Formuła

```
Wartość Twojego linku = PageRank strony / liczba linków wychodzących na stronie
```

### Przykład praktyczny

| Scenariusz | Linki na stronie | Twój udział w "mocy" |
|------------|-----------------|---------------------|
| Artykuł z 3 linkami (Twój + 2 wewnętrzne) | 3 | ~33% mocy strony |
| Artykuł z 10 linkami | 10 | ~10% mocy strony |
| Strona z 50 linkami (katalog, sidebar pełen banerów) | 50 | ~2% mocy strony |

**Wniosek:** Artykuł z 2-5 linkami wychodzącymi > strona z 30 linkami, nawet jeśli DR jest wyższy.

### Gdzie link w artykule — hierarchia wartości

```
1. Pierwszy akapit treści      ← NAJWYŻSZA wartość (Google czyta od góry)
2. Środek treści (kontekstowy) ← BARDZO DOBRA wartość
3. Ostatni akapit / CTA        ← DOBRA wartość
4. Bio autora / "O firmie"     ← NISKA wartość
5. Sidebar / widget            ← MINIMALNA wartość
6. Stopka strony               ← PRAWIE ZERO wartości
```

---

## 4. OZNACZENIE ARTYKUŁU — co to znaczy dla SEO

| Oznaczenie | HTML | Wpływ na SEO | Nasza ocena |
|------------|------|-------------|-------------|
| Brak oznaczenia + dofollow | `<a href="...">` | Pełna moc linku | IDEAŁ (ale ryzyko — Google może wykryć) |
| "Artykuł partnerski" + dofollow | `<a href="...">` | Pełna moc linku technicznie. Czytelnik widzi "partnerski" ale Google bot widzi dofollow | DOBRY KOMPROMIS |
| "Artykuł sponsorowany" + dofollow | `<a href="...">` | j.w. ale wyraźniejsze oznaczenie | OK — wciąż dofollow |
| "Artykuł sponsorowany" + `rel="sponsored"` | `<a rel="sponsored" href="...">` | Google traktuje jako WSKAZÓWKĘ (hint), nie dyrektywę. Może przekazywać moc, ale nie musi | AKCEPTOWALNY — wartość pośrednia (ruch, brand, dywersyfikacja) |
| Jakiekolwiek + `rel="nofollow"` | `<a rel="nofollow" href="...">` | Nie przekazuje mocy bezpośrednio, ale Google od 2019 traktuje jako hint | SŁABY — kupuj tylko jeśli portal ma duży ruch (>10k) |
| Jakiekolwiek + `noindex` na stronie | `<meta name="robots" content="noindex">` | Google NIE indeksuje strony = link NIE ISTNIEJE dla SEO | **NIE KUPUJ** |

---

## 5. SCORING ZAKTUALIZOWANY — 12 czynników

### Jak liczyć (przykład: naszwodzislaw.com)

| Czynnik | Waga | Ocena 0-10 | Ważona |
|---------|------|-----------|--------|
| Relevancja tematyczna | 20% | 4 (portal ogólny, nie budowlany) | 0.80 |
| Relevancja regionalna | 15% | 10 (Wodzisław Śl. — idealne trafienie) | 1.50 |
| Ruch organiczny | 15% | ? (sprawdzić) | ? |
| Linki wychodzące | 10% | ? (sprawdzić na istniejącym artykule) | ? |
| Umiejscowienie linku | 10% | 7 (body artykułu, kategoria, ale standard 2500 zn) | 0.70 |
| DR portalu | 8% | 7 (DR 26) | 0.56 |
| Oznaczenie | 8% | 8 (artykuł partnerski, dofollow) | 0.64 |
| Jakość treści | 5% | ? (sprawdzić) | ? |
| Podlinkowanie wewnętrzne | 3% | 8 (z kategorii) | 0.24 |
| Czas publikacji | 3% | 10 (bezterminowo) | 0.30 |
| Cena/wartość | 2% | 10 (96 PLN — tanie) | 0.20 |
| Dozwolone anchory | 1% | 5 (URL + brand, brak exact match) | 0.05 |
| **SUMA** | | | **4.99 + brakujące** |

**Brakuje kluczowych danych:** ruch organiczny + linki wychodzące + jakość treści = musisz sprawdzić ręcznie przed zakupem.

---

## 6. QUICK DECISION MATRIX

### Kup od razu (7+/10)
- Portal tematyczny (budowlany/nieruchomości) LUB silnie regionalny
- Ruch organiczny > 2000/mies.
- DR > 20
- Dofollow, bez noindex
- Max 5-10 linków wychodzących w artykule
- Link w body treści
- Cena < 15 PLN per punkt DR

### Rozważ (5-7/10)
- Portal ogólny ale z sekcją regionalną
- Ruch 500-2000/mies.
- DR 15-25
- Dofollow, oznaczony jako partnerski
- Do 15 linków wychodzących
- Cena rozsądna

### Odpuść (<5/10)
- Brak związku tematycznego i regionalnego
- Ruch < 500/mies. lub brak danych
- DR < 10
- Noindex na artykułach sponsorowanych
- 20+ linków wychodzących na stronie
- Link w sidebarze/stopce
- Same artykuły sponsorowane, zero redakcyjnych

### Nigdy nie kupuj
- Portal z treściami kasynowymi / pożyczkowymi / krypto
- PBN (Private Blog Networks) — sieć blogów tworzonych tylko pod linki
- Portale z `noindex` na artykułach sponsorowanych
- DR < 5 i ruch < 100
- Strony z > 50 linkami wychodzącymi per page

---

## 7. CHECKLIST PRZED ZAKUPEM (wydrukuj)

```
[ ] 1. Sprawdziłem ruch w Ahrefs/Semrush (minimum 1000/mies.)
[ ] 2. Sprawdziłem site:portal.pl w Google — artykuły sponsorowane są indeksowane
[ ] 3. Otworzyłem istniejący artykuł sponsorowany i policzyłem linki wychodzące (max 10)
[ ] 4. Sprawdziłem rel="" na linkach (dofollow, nie nofollow/sponsored)
[ ] 5. Sprawdziłem sąsiedztwo — brak kasyn, pożyczek, krypto w artykułach
[ ] 6. Link będzie w body treści, nie w stopce/sidebarze
[ ] 7. Artykuł zostanie podlinkowany z kategorii (nie zakopany)
[ ] 8. Publikacja bezterminowa (nie na 3-6 miesięcy)
[ ] 9. Mogę użyć odpowiedniego anchora (brand LUB exact match LUB naturalny)
[ ] 10. Cena jest adekwatna do wartości (DR × ruch × relevancja)
```

---

## Źródła

- [WPPoland — Backlink Quality Assessment 2026](https://wppoland.com/en/seo-link-building-backlinks/)
- [ALM Corp — Definitive Guide to Link Building 2026](https://almcorp.com/blog/definitive-guide-link-building-2026/)
- [Respona — Backlink Quality Analysis in 6 Steps](https://respona.com/blog/backlink-quality-analysis/)
- [Editorial.link — Link Building Statistics 2026](https://editorial.link/link-building-statistics/)
- [Editorial.link — Link Building Metrics 2025](https://editorial.link/link-building-metrics/)
- [The Links Guy — 9 Link Building Metrics 2025](https://thelinksguy.com/link-building-metrics/)
- [Authority Exchange — Link Building Metrics Guide 2025](https://authorityexchange.com/blog/link-building/link-building-metrics/)
- [WhitePress — Link Prospecting](https://www.whitepress.com/en/knowledge-base/1946/link-prospecting)
- [WhitePress — Backlink Analysis](https://www.whitepress.com/en/knowledge-base/2191/backlink-analysis)
- [WhitePress — SEO & Link Building in AI Era](https://www.whitepress.com/en/knowledge-base/6127/seo-link-building-ai-era-how-theyre-changing)
- [LinkDoctor — Link Equity Explained](https://linkdoctor.io/understanding-link-equity/)
- [Incremys — Link Juice 2026 Guide](https://www.incremys.com/en/resources/blog/link-juice)
- [Delante — Gdzie opublikować artykuł sponsorowany](https://delante.pl/gdzie-opublikowac-artykul-sponsorowany-checklista/)
- [SEOsklep24 — Artykuły sponsorowane w SEO](https://seosklep24.pl/blog/artykuly-sponsorowane-w-seo-droga-od-linku-do-pozycji/)
- [icomSEO — Sponsored Links](https://icomseo.pl/sponsored-link/)

*Dokument żywy — aktualizowany przy zmianach algorytmu Google.*
