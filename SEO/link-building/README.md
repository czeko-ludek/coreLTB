# Link Building — CoreLTB Builders

Folder zawiera artykuly sponsorowane gotowe do publikacji + dokumentacje linkowania.

## Struktura

```
SEO/link-building/
  README.md                  <- ten plik
  dokumentacja.json          <- GLOWNY PLIK: wszystkie linki, statusy, koszty, indexacja
  artykuly/
    01-nowiny-rybnik.md      <- artykul + metadane (portal, anchor, link, zdjecia)
    02-tuwodzislaw-wodzislaw.md
    03-naszwodzislaw-wodzislaw.md
    ...kolejne artykuly
```

## Workflow

1. Przygotuj artykul w `artykuly/XX-portal-miasto.md`
2. Dodaj wpis do `dokumentacja.json` (status: "przygotowany")
3. Wyslij na WhitePress / portal
4. Zaktualizuj status: "wyslany" -> "opublikowany" (dodaj URL)
5. Sprawdz indexacje: `site:portal.pl "tytul artykulu"` -> status "zaindeksowany"
6. Monitoruj efekt w GSC (pozycja frazy docelowej)

## Komendy agenta

```bash
# Raport linkow
node SEO/seo-agent/orchestrator.js --link-report

# Ocena nowego portalu
node SEO/seo-agent/orchestrator.js --evaluate-link '{"portal":"...", "dr":25, ...}'

# Dodaj kupiony link
node SEO/seo-agent/orchestrator.js --add-link '{"portal":"...", "price":200, ...}'
```
