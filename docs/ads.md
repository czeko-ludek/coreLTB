# Ads & Analytics Configuration — CoreLTB Builders

## Status

| Platform | Status | Account | Notes |
|----------|--------|---------|-------|
| Google Ads | ❌ TODO | — | Konto do utworzenia |
| Google Tag Manager | ❌ TODO | — | Container do osadzenia |
| GA4 | ⏳ Do podlaczenia | — | Property ID do wpisania w `SEO/seo-agent/config.json` |
| Meta Ads (Facebook/Instagram) | ❌ TODO | — | Pixel do osadzenia |
| Google Search Console | ✅ Done | dawidFC@gmail.com | Domena: coreltb.pl |

---

## Google Ads

### Kampanie (planowane)

| Kampania | Typ | Landing Page | Budget | Frazy |
|----------|-----|-------------|--------|-------|
| Wycena — Search | Search | `/wycena` | — | budowa domu wycena, kalkulator budowy domu, ile kosztuje budowa domu |
| Wycena — Local | Search (local) | `/wycena` | — | budowa domu katowice, budowa domu rybnik, firma budowlana slask |
| Brand | Search | `/` | — | coreltb, core ltb, coreltb builders |
| Remarketing | Display | `/wycena` | — | Osoby ktore odwiedzialy /wycena ale nie wyslaly formularza |

### Conversion tracking

| Event | Trigger | Value |
|-------|---------|-------|
| `calculator_submit` | Wyslanie formularza na `/wycena` | Lead |
| `calculator_pdf_download` | Klik "Pobierz wycene (PDF)" | Micro-conversion |
| `phone_click` | Klik na numer telefonu | Micro-conversion |
| `contact_form_submit` | Wyslanie formularza na `/kontakt` | Lead |

### Konfiguracja GTM

```
TODO: Wpisac GTM Container ID
<!-- Google Tag Manager -->
<script>
  // GTM snippet — do osadzenia w app/layout.tsx
</script>
```

**Plik do edycji:** `app/layout.tsx` — dodac GTM snippet w `<head>` i noscript w `<body>`.

---

## GA4 (Google Analytics 4)

```
TODO: Wpisac GA4 Measurement ID (G-XXXXXXXXXX)
```

### Zdarzenia do skonfigurowania

| Event name | Parametry | Kiedy |
|------------|-----------|-------|
| `generate_lead` | `lead_type: "calculator"`, `area`, `finish_type` | Po wyslaniu formularza /wycena |
| `generate_lead` | `lead_type: "contact"` | Po wyslaniu formularza /kontakt |
| `page_view` | auto | Kazda strona |
| `scroll` | auto | 90% scroll |
| `file_download` | `file_name: "wycena-pdf"` | Klik PDF |

### Grupy odbiorcow (Audiences)

| Audience | Definicja |
|----------|-----------|
| Kalkulator — nie wyslali | Odwiedzili `/wycena`, nie wyslali formularza |
| Kalkulator — wyslali | Event `generate_lead` z `lead_type: "calculator"` |
| Lokalne strony | Odwiedzili `/obszar-dzialania/*` |
| Powracajacy | Sesje >= 2 |

---

## Meta Ads (Facebook / Instagram)

```
TODO: Wpisac Meta Pixel ID
```

### Kampanie (planowane)

| Kampania | Cel | Audience | LP |
|----------|-----|----------|----|
| Lead Gen — Lookalike | Leads | Lookalike z konwersji kalkulatora | `/wycena` |
| Remarketing | Conversions | Custom Audience: odwiedziny /wycena | `/wycena` |
| Awareness — Realizacje | Reach | Zainteresowania: budowa domu, nieruchomosci | `/projekty` |

### Zdarzenia Pixel

| Event | Kiedy |
|-------|-------|
| `Lead` | Wyslanie formularza /wycena |
| `Contact` | Wyslanie formularza /kontakt |
| `ViewContent` | Odwiedziny /wycena |
| `PageView` | Kazda strona |

---

## Implementacja w kodzie

### Pliki do modyfikacji

| Plik | Co dodac |
|------|----------|
| `app/layout.tsx` | GTM snippet, Meta Pixel base code |
| `components/sections/calculator/CalculatorForm.tsx` | `gtag('event', 'generate_lead', {...})` po submit |
| `app/kontakt/page.tsx` lub komponent kontaktowy | Event kontakt |
| `lib/analytics.ts` | Helper functions: `trackEvent()`, `trackLead()` (do utworzenia) |

### Helper (do implementacji)

```typescript
// lib/analytics.ts
export function trackEvent(name: string, params?: Record<string, string | number>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params);
  }
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', name, params);
  }
}

export function trackLead(type: 'calculator' | 'contact', extra?: Record<string, string | number>) {
  trackEvent('generate_lead', { lead_type: type, ...extra });
}
```

---

## UTM conventions

| Parametr | Format | Przyklad |
|----------|--------|----------|
| `utm_source` | `google` / `facebook` / `instagram` | `google` |
| `utm_medium` | `cpc` / `social` / `email` | `cpc` |
| `utm_campaign` | `{typ}-{miasto}-{data}` | `wycena-katowice-2026q2` |
| `utm_content` | `{wariant-reklamy}` | `headline-v2` |

---

## TODO Checklist

- [ ] Utworzyc konto Google Ads
- [ ] Utworzyc kontener GTM i osadzic w `app/layout.tsx`
- [ ] Skonfigurowac GA4 property, wpisac Measurement ID
- [ ] Utworzyc `lib/analytics.ts` z helper functions
- [ ] Dodac event tracking do `CalculatorForm.tsx` (submit + PDF download)
- [ ] Dodac event tracking do formularza kontaktowego
- [ ] Skonfigurowac conversion goals w Google Ads
- [ ] Utworzyc Meta Pixel i osadzic w `app/layout.tsx`
- [ ] Skonfigurowac Custom Audiences i Lookalike w Meta
- [ ] Przygotowac kampanie Search + Local w Google Ads
- [ ] Ustawic remarketing (Google + Meta)
- [ ] Test: sprawdzic eventy w GA4 DebugView i Meta Events Manager
