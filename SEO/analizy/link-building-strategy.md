# Strategia Link Buildingu — coreltb.pl

**Utworzono:** 2026-03-31
**Ostatnia aktualizacja:** 2026-03-31
**Status:** aktywna — artykuly przygotowane, oczekiwanie na budzet
**Budzet:** do ustalenia
**Framework oceny:** SEO/analizy/link-evaluation-framework.md (12 kryteriow)
**Dokumentacja linkow:** SEO/link-building/dokumentacja.json
**Artykuly:** SEO/link-building/artykuly/

---

## 1. Cele link buildingu

### Priorytet 1 — Lokalne frazy (pozycje 10-20 -> TOP 10)

| Fraza | Pozycja | Impresje | Docelowa strona | Potrzebne linki |
|-------|---------|----------|-----------------|-----------------|
| budowa domow wodzislaw slaski | 11.7 | 125 | /obszar-dzialania/wodzislaw-slaski | 2-3 |
| budowa domow rybnik | 14.3 | 149 | /obszar-dzialania/rybnik | 2-3 |
| budowa domow zory | 10.3 | 58 | /obszar-dzialania/zory | 1-2 |
| budowa domu tychy | 10.2 | 25 | /obszar-dzialania/tychy | 1-2 |

### Priorytet 2 — Dalsze miasta (pozycje 20+)

| Fraza | Pozycja | Impresje | Docelowa strona |
|-------|---------|----------|-----------------|
| budowa domu katowice | 33.0 | 118 | /obszar-dzialania/katowice |
| budowa domu gliwice | 28.7 | 59 | /obszar-dzialania/gliwice |

### Priorytet 3 — Brand + strona glowna + konwersje
- "firma budowlana slask", "budowa domow slask" -> /
- /wycena, /projekty (strony konwersji)

---

## 2. Aktualne zamowienia — gotowe do realizacji

### Status: OCZEKIWANIE NA BUDZET

| # | Portal | DR | Ruch | Cena netto | Anchor | Typ | Link do | Score |
|---|--------|----|------|-----------|--------|-----|---------|-------|
| 1 | nowiny.pl | 63 | 22-79k | 282 PLN | "budowa domow Rybnik" | exact match | /obszar-dzialania/rybnik | 8.2/10 |
| 2 | tuwodzislaw.pl | 35 | 7-23k | 475 PLN | "CoreLTB Builders" | brand | /obszar-dzialania/wodzislaw-slaski | 7.5/10 |
| 3 | naszwodzislaw.com | 35 | ~7k | 96 PLN | "coreltb.pl" | URL | /obszar-dzialania/wodzislaw-slaski | 7.1/10 |
| | **RAZEM** | | | **853 PLN** | | | | |

Artykuly napisane i gotowe: `SEO/link-building/artykuly/01-03`
Pelne dane portali + weryfikacja HTML: `SEO/link-building/dokumentacja.json`

### Kolejnosc realizacji (rekomendacja)
1. **nowiny.pl** — najsilniejszy portal (DR 63), jedyny z dowolnym anchorem (exact match!), pokrywa caly ROW
2. **tuwodzislaw.pl** — Kategoria + Homepage, 2x dofollow, Wodzislaw
3. **naszwodzislaw.com** — tani uzupelniacz (96 PLN), dywersyfikacja profilu

### Weryfikacja portali na zywo (2026-03-31)
Zbadano HTML artykulow sponsorowanych:

| Portal | Zbadany artykul | Linki wych. | Rel | Noindex | Sasiedztwo |
|--------|----------------|-------------|-----|---------|------------|
| nowiny.pl | 2 artykuly (sofy, Helios) | 1-2 | dofollow | NIE | Eko-Okna, JSW — czyste |
| tuwodzislaw.pl | 1 artykul (mlotowiertarka) | 1 | dofollow | NIE | Dnipro-M — czyste |
| naszwodzislaw.com | nie znaleziono art. spons. | ? | ? | ? | ? |

---

## 3. Strategia anchorow

### Aktualny profil (po 3 linkach)

| Typ anchora | Udzial | Przyklad | Ile mamy |
|-------------|--------|----------|----------|
| Exact match | 33% | "budowa domow Rybnik" | 1 (nowiny) |
| Brand | 33% | "CoreLTB Builders" | 1 (tuwodzislaw) |
| URL | 33% | "coreltb.pl" | 1 (naszwodzislaw) |

### Docelowy profil (10+ linkow)

| Typ anchora | Docelowy udzial | Przyklady |
|-------------|-----------------|-----------|
| Brand | 35% | CoreLTB, CoreLTB Builders, coreltb.pl |
| Naturalny | 25% | tutaj, na stronie, wiecej informacji, sprawdz oferte |
| Czesciowy match | 20% | firma budowlana z Rybnika, budowa domow na Slasku |
| Exact match | 15% | budowa domow Wodzislaw Slaski, budowa domu Rybnik |
| URL | 5% | https://coreltb.pl/obszar-dzialania/rybnik |

**WAZNE:** Max 2 linki z tym samym exact match anchorem. Google karze za nadoptymalizacje.

---

## 4. Gdzie linkujemy — rozklad

### Zasada 60/30/10:
- **60% linkow** -> strony lokalne (/obszar-dzialania/*)
- **30% linkow** -> strona glowna (/)
- **10% linkow** -> strony konwersji (/wycena, /oferta/*, /projekty)

### Aktualny rozklad (3 linki)
- /obszar-dzialania/rybnik: 1 link (nowiny.pl)
- /obszar-dzialania/wodzislaw-slaski: 2 linki (tuwodzislaw + naszwodzislaw)
- /: 0 linkow
- Rozklad: 100% lokalne — OK na start, potem dodac strone glowna

---

## 5. Framework oceny linkow — 12 kryteriow

**Pelny dokument:** `SEO/analizy/link-evaluation-framework.md`
**Implementacja w kodzie:** `SEO/seo-agent/lib/link-analyzer.js`

### Wagi czynnikow

| Tier | Czynnik | Waga |
|------|---------|------|
| A | Relevancja tematyczna | 20% |
| A | Relevancja regionalna | 15% |
| A | Ruch organiczny | 15% |
| A | Linki wychodzace na stronie | 10% |
| B | Umiejscowienie linku | 10% |
| B | DR / DA portalu | 8% |
| B | Oznaczenie artykulu (rel, noindex) | 8% |
| B | Jakosc tresci portalu | 5% |
| C | Podlinkowanie wewnetrzne | 3% |
| C | Czas publikacji | 3% |
| C | Cena / wartosc | 2% |
| C | Dozwolone anchory | 1% |

### Co sprawdzac PRZED zakupem (checklist)
1. Ruch w Ahrefs/Semrush (min. 1000/mies.)
2. `site:portal.pl` — artykuly sponsorowane indeksowane?
3. Otworz artykul sponsorowany — policz linki wychodzace (max 10)
4. Sprawdz rel="" na linkach (dofollow, nie nofollow/sponsored)
5. Sprawdz sasiedztwo — brak kasyn, pozyczek, krypto
6. Link w body tresci, nie w stopce/sidebarze
7. Podlinkowanie: Kategoria > Archiwum (Archiwum = zakopany)
8. Bezterminowa publikacja
9. Dozwolone anchory (Dowolny = najlepszy)
10. Cena adekwatna do DR x ruch x relevancja

### Podlinkowanie wewnetrzne — hierarchia

| Opcja | Znaczenie | Wartosc |
|-------|-----------|---------|
| Homepage + Kategoria | Artykul na glownej i w kategorii | NAJLEPSZA |
| Kategoria | Artykul widoczny w kategorii | DOBRA |
| Archiwum | Artykul zakopany, brak linkow wewn. | SLABA |

---

## 6. Zrodla linkow — ranking wg. wartosci

### Tier 1 — Najcenniejsze (DR 30+, regionalne/tematyczne)
**Koszt: 200-800 PLN/link**

| Typ | Przyklady | Status |
|-----|-----------|--------|
| Regionalne portale informacyjne ROW | **nowiny.pl (DR 63)** — GOTOWY | artykul napisany |
| Regionalne portale miejskie | **tuwodzislaw.pl (DR 35)** — GOTOWY | artykul napisany |
| Portale budowlane | muratordom.pl, budujemydom.pl, kb.pl | do zbadania |
| Portale nieruchomosci | extradom.pl, domy.pl, galeriadomow.pl | do zbadania |

### Tier 2 — Dobre (DR 15-30, kontekstowe)
**Koszt: 80-300 PLN/link**

| Typ | Przyklady | Status |
|-----|-----------|--------|
| WhitePress regionalne | **naszwodzislaw.com (DR 35)** — GOTOWY | artykul napisany |
| Blogi budowlane | blogi o budowie domu, remontach | do zbadania |
| Lokalne portale miejskie | naszrybnik.com, wodzislaw.info.pl | zbadane, ROZWAZ |

### Tier 3 — Uzupelniajace (DR 5-15)
**Koszt: 30-100 PLN/link**

| Typ | Przyklady |
|-----|-----------|
| Tanie WhitePress | mniejsze blogi, lifestyle |
| Fora | forum.muratordom.pl, forumbudowlane.pl |
| Lokalne wpisy (gminy, OSP) | silny sygnal lokalny |

### Darmowe (Tier GOLD)

| Typ | Jak zdobyc | Status |
|-----|-----------|--------|
| Google Business Profile | Uzupelnic profil | zrobione (2 lokalizacje) |
| Katalogi firm | panoramafirm, pkt, gowork, aleo, oferteo | do zrobienia |
| Dostawcy/partnerzy | Solbet, Wienerberger, Baumit | do kontaktu |
| Zadowoleni klienci | Wzmianka na ich profilach | do kontaktu |

### Odrzucone portale

| Portal | Powod | Score |
|--------|-------|-------|
| tugazetka.pl | Zero tematyki, brak regionu, martwy (art. z 2019) | 2.1/10 |

---

## 7. Budzet i warianty

### Wariant A — Minimalny (500 PLN/mies.)
| Co | Koszt | Ilosc |
|----|-------|-------|
| 1x Tier 2 (regionalny) | 300 PLN | 1 link |
| 2x Tier 3 (uzupelniajace) | 150 PLN | 2 linki |
| Darmowe (katalogi) | 0 PLN | 2-3 wpisy |
| **RAZEM** | **500 PLN** | **5-6 linkow** |

### Wariant B — Optymalny (1000 PLN/mies.)
| Co | Koszt | Ilosc |
|----|-------|-------|
| 1x Tier 1 (nowiny.pl, muratordom) | 400 PLN | 1 link |
| 2x Tier 2 (regionalne) | 400 PLN | 2 linki |
| 2x Tier 3 (uzupelniajace) | 150 PLN | 2 linki |
| Darmowe | 0 PLN | 2-3 wpisy |
| **RAZEM** | **1000 PLN** | **7-8 linkow** |

### Wariant C — Agresywny (1500 PLN/mies.)
| Co | Koszt | Ilosc |
|----|-------|-------|
| 2x Tier 1 | 700 PLN | 2 linki |
| 2x Tier 2 | 450 PLN | 2-3 linki |
| 3x Tier 3 | 200 PLN | 3 linki |
| Darmowe | 0 PLN | 3-5 wpisow |
| **RAZEM** | **1500 PLN** | **10-13 linkow** |

### Start jednorazowy (aktualne 3 linki)
| Co | Koszt |
|----|-------|
| nowiny.pl (DR 63, exact match) | 282 PLN |
| tuwodzislaw.pl (DR 35, Kategoria+HP) | 475 PLN |
| naszwodzislaw.com (DR 35, tani) | 96 PLN |
| **RAZEM** | **853 PLN netto** |

---

## 8. Harmonogram — pierwsze 3 miesiace

### Miesiac 1 — Fundament
- [ ] Wyslac 3 przygotowane artykuly (nowiny + tuwodzislaw + naszwodzislaw)
- [ ] Dodac firme do 5 katalogow (panoramafirm, pkt, gowork, aleo, oferteo)
- [ ] Uzupelnic Google Business Profile (posty, zdjecia)
- [ ] Skontaktowac sie z dostawcami ws. stron partnerow
- **Cel:** Wodzislaw 11.7 -> ~9, Rybnik 14.3 -> ~10

### Miesiac 2 — Rozszerzenie
- [ ] 1x Tier 1 (portal budowlany) -> / (strona glowna)
- [ ] 1x Tier 2 -> /obszar-dzialania/zory (exact match "budowa domow Zory")
- [ ] 2x Tier 3 -> rozne podstrony
- [ ] Sprawdzic indexacje artykulow z miesiaca 1
- [ ] Pomiar pozycji w GSC
- **Cel:** Zory 10.3 -> TOP 10, Rybnik -> TOP 10

### Miesiac 3 — Skalowanie
- [ ] Powtorz schemat na Tychy, Katowice
- [ ] 1x Tier 1 (portal nieruchomosci) -> /projekty
- [ ] Analiza efektow: ktore linki daly najlepszy ROI
- [ ] Dostosowanie strategii

---

## 9. Metryki sukcesu

| Metryka | Obecna (03/2026) | Cel 3 mies. | Cel 6 mies. |
|---------|------------------|-------------|-------------|
| Referring domains (coreltb.pl) | ~5 | 20+ | 40+ |
| DR domeny | ~5 | 10+ | 15+ |
| Frazy w TOP 10 (lokalne) | 1-2 | 5+ | 8+ |
| Ruch organiczny (sesje/mies.) | ~93 | 200+ | 500+ |
| Wodzislaw — pozycja | 11.7 | TOP 10 | TOP 5 |
| Rybnik — pozycja | 14.3 | TOP 10 | TOP 5 |
| Zory — pozycja | 10.3 | TOP 10 | TOP 7 |
| Leady organiczne | ~10/mies. | 20+ | 40+ |

---

## 10. Zasady bezpieczenstwa

1. **Tempo:** Max 10-15 linkow/mies. Google podejrzewa nagly wzrost.
2. **Roznorodnosc:** Max 3 linki z jednej platformy (WhitePress).
3. **Anchory:** Max 15% exact match. Reszta brand + naturalny.
4. **Dofollow/nofollow:** Naturalny profil to ~70/30. Nie unikaj nofollow.
5. **Monitoring:** Co miesiac sprawdzaj w Ahrefs/GSC czy linki zyja i sa zaindeksowane.
6. **Toxic links:** Spam/PBN -> Google Disavow Tool.
7. **Podlinkowanie:** Zawsze preferuj Kategoria/Homepage nad Archiwum.
8. **Sasiedztwo:** Przed zakupem sprawdz inne art. sponsorowane — brak kasyn/krypto/pozyczek.

---

## 11. Pliki i komendy

### Dokumentacja
| Plik | Co zawiera |
|------|------------|
| `SEO/link-building/dokumentacja.json` | Master: wszystkie linki, statusy, koszty, indexacja, efekt SEO |
| `SEO/link-building/artykuly/*.md` | Artykuly gotowe do wyslania + metadane |
| `SEO/analizy/link-evaluation-framework.md` | 12-czynnikowy framework oceny linkow |
| `SEO/analizy/link-building-strategy.md` | Ten plik — strategia |
| `SEO/seo-agent/lib/link-analyzer.js` | Kod agenta: 12-czynnikowy scoring |
| `SEO/seo-agent/data/links-db.json` | Baza linkow agenta (synchronizowac z dokumentacja.json) |

### Komendy agenta
```bash
# Pelny raport linkow
node SEO/seo-agent/orchestrator.js --link-report

# Ocen nowy portal (12 czynnikow)
node SEO/seo-agent/orchestrator.js --evaluate-link '{"portal":"...", "dr":25, "traffic":5000, "price":200, "topic":"budownictwo region", "outboundLinks":3, "articleMarking":"dofollow_partnerski", "linkPlacement":"body", "internalLinking":"kategoria", "publicationTime":"bezterminowo", "anchorOptions":"dowolny"}'

# Dodaj kupiony link do bazy
node SEO/seo-agent/orchestrator.js --add-link '{"portal":"nowiny.pl", "dr":63, "price":282, "targetPage":"/obszar-dzialania/rybnik", "anchor":"budowa domow Rybnik"}'
```

---

*Dokument zywy — aktualizowany po kazdym zakupie i analizie. Wracamy tu gdy bedzie budzet.*
