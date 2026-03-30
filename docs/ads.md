# Ads & Analytics Configuration — CoreLTB Builders

## Status

| Platform | Status | Account | Notes |
|----------|--------|---------|-------|
| Google Ads | ✅ Active | dawidFC@gmail.com | Kampania PMax aktywna |
| Google Tag Manager | ✅ Done | GTM-TPFV68BN | Osadzony w `app/layout.tsx` |
| GA4 | ✅ Done | G-SMNG7006SN | Skonfigurowany via GTM |
| Google Search Console | ✅ Done | dawidFC@gmail.com | Domena: coreltb.pl |
| Meta Pixel | ✅ Done | ID: 2115781769222343 | Osadzony w `app/layout.tsx`, consent mode |
| Meta Ads | ✅ Active | Konto: CoreLTB Reklama (515195598339409) | Kampania na `/wycena` aktywna |

---

## Conversion Tracking — Architektura

### Problem: GA4 Import vs Native Google Ads Tag

Obecnie konwersje sa importowane z GA4 do Google Ads. To powoduje:

| | GA4 Import (obecny) | Native Google Ads Tag (docelowy) |
|---|---|---|
| **Opoznienie** | **24-72h** | **~1-3h** (zwykle minuty) |
| **Smart Bidding** | Uczy sie z opoznieniem | Near real-time |
| **Cross-device** | Brak | Sledzi cross-device |
| **View-through** | Brak | Widzi konwersje po wyswietleniu reklamy |
| **Enhanced Conversions** | Ograniczone | Pelne wsparcie |
| **Consent Mode modeling** | Dziala, ale czesciowe dane (0.5 konwersji) | Lepsze modelowanie, pelniejsze dane |

### Consent Mode a ułamkowe konwersje

Gdy user NIE akceptuje cookies → `ad_storage: denied` → Google Ads nie moze bezposrednio zmierzyc konwersji → stosuje **Consent Mode Modeling** → konwersja liczona jako ulamek (np. 0.5 zamiast 1.0).

Gdy user AKCEPTUJE cookies → `ad_storage: granted` → pelna konwersja 1.0.

Native Google Ads Tag lepiej radzi sobie z modelowaniem consent niz GA4 import.

### Docelowa architektura (TODO)

**Dual tracking — tak robia profesjonalisci:**

1. **Native Google Ads Conversion Tag** (PRIMARY) — do optymalizacji kampanii, Smart Bidding
2. **GA4 Key Events** (SECONDARY/OBSERVE) — do analityki, raportow, audience

#### Implementacja Native Tag w GTM:

1. W Google Ads → Cele → Konwersje → Nowa akcja konwersji → Strona internetowa → Skonfiguruj recznie
2. Skopiowac **Conversion ID** (np. `AW-123456789`) i **Conversion Label** (np. `AbCdEfG`)
3. W GTM dodac:
   - **Tag:** Google Ads Conversion Tracking
   - **Conversion ID:** z kroku 2
   - **Conversion Label:** z kroku 2
   - **Value:** 500 (PLN)
   - **Trigger:** Custom Event = `calculator_lead` / `consultation_lead` / `plot_analysis_lead`
4. Conversion Linker tag (jesli nie istnieje) — All Pages trigger
5. W Google Ads oznaczyc GA4 import jako "Secondary" (observe only)

#### Potrzebne dane (od Dawida):
- [ ] **Conversion ID** (AW-XXXXXXXXX)
- [ ] **Conversion Label** per akcja (calculator, consultation, plot_analysis)

---

## Aktywne eventy (dataLayer → GTM → GA4)

### Conversion events (key events, value 500 PLN each)

| Event | Trigger | Formularz |
|-------|---------|-----------|
| `calculator_lead` | Submit na `/wycena` | CalculatorForm.tsx |
| `consultation_lead` | Submit na `/umow-konsultacje` | ConsultationForm.tsx |
| `plot_analysis_lead` | Submit na `/analiza-dzialki` | PlotAnalysisForm.tsx |

### Micro-conversion events

| Event | Trigger | Plik |
|-------|---------|------|
| `calculator_start` | Pierwsza zmiana parametru | CalculatorForm.tsx |
| `calculator_step` | Wybor opcji w kalkulatorze | CalculatorForm.tsx |
| `calculator_estimate_view` | Wyswietlenie wyceny | CalculatorForm.tsx |
| `form_focus` | Focus na polu kontaktowym | CalculatorForm.tsx |
| `form_error` | Blad walidacji | CalculatorForm.tsx |
| `phone_click` | Klik na numer tel | Wszystkie tel: linki |
| `cta_click` | Klik CTA | Rozne komponenty |

### Implementacja w kodzie

Wszystkie eventy ida przez `lib/analytics.ts`:
- `trackEvent(name, params)` → `window.dataLayer.push({ event, ...params })`
- `trackLead(source, data)` → odpala odpowiedni event + dolacza UTM params z sessionStorage
- `trackPhoneClick(location)` → `phone_click`
- `trackCalculatorStart()` → `calculator_start`
- `trackCalculatorStep(step, value)` → `calculator_step`

---

## GTM Configuration

**Container:** GTM-TPFV68BN

### Tags (6)

| Tag | Type | Trigger |
|-----|------|---------|
| GA4 Config | GA4 Configuration (G-SMNG7006SN) | All Pages |
| calculator_lead | GA4 Event | Custom Event: calculator_lead |
| consultation_lead | GA4 Event | Custom Event: consultation_lead |
| plot_analysis_lead | GA4 Event | Custom Event: plot_analysis_lead |
| phone_click | GA4 Event | Custom Event: phone_click |
| calculator_start | GA4 Event | Custom Event: calculator_start |

### TODO: Dodac w GTM

- [ ] Google Ads Conversion Tracking tag (po otrzymaniu Conversion ID + Label)
- [ ] Google Ads Conversion Linker tag (All Pages)
- [ ] Oznaczyc GA4 import w Google Ads jako Secondary

---

## Consent Mode v2

Zaimplementowany w `app/layout.tsx` + `components/ui/CookieConsent.tsx`.

### Google (GTM/GA4)

**Default (przed akceptacja):**
```js
gtag('consent', 'default', {
  analytics_storage: 'denied',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied',
});
```

**Po akceptacji ("Akceptuje"):**
```js
gtag('consent', 'update', {
  analytics_storage: 'granted',
  ad_storage: 'granted',
  ad_user_data: 'granted',
  ad_personalization: 'granted',
});
```

### Meta Pixel

**Default:** `fbq('consent', 'revoke')` — Pixel laduje sie ale nie trackuje.
**Po akceptacji:** `fbq('consent', 'grant')` — pelne sledzenie wlaczone.
**Po odrzuceniu:** `fbq('consent', 'revoke')` — pozostaje zablokowany.

### Cookie Consent UX & Tracking

**Design:** Duzy bar na dole z ciemnym overlay (backdrop). Trudny do ignorowania.
**Wariant:** Opcja B (bar + przyciemnienie). Jesli % ignorowania wysoki → przejscie na Opcje A (pelny modal).

**Eventy decyzji uzytkownika (dataLayer → GTM → GA4):**

| Event | Kiedy |
|-------|-------|
| `cookie_accepted` | Kliknal "Akceptuje wszystkie" |
| `cookie_rejected` | Kliknal "Tylko niezbedne" |
| `cookie_ignored` | Nie podjal decyzji przez 30 sekund |

**Konsekwencje:** Bez akceptacji cookies → konwersje liczone jako ulamki (Consent Mode Modeling). Z native Google Ads tagiem modelowanie jest dokladniejsze. Meta Pixel nie trackuje w ogole bez consent.

---

## UTM Conventions

| Parametr | Format | Przyklad |
|----------|--------|----------|
| `utm_source` | `google` / `facebook` | `google` |
| `utm_medium` | `cpc` / `social` / `email` | `cpc` |
| `utm_campaign` | `{typ}-{miasto}-{data}` | `wycena-katowice-2026q2` |
| `utm_content` | `{wariant}` | `headline-v2` |

UTM tracking: `lib/analytics.ts` → `captureUTMParams()` → sessionStorage → wysylane z leadem do `/api/lead`.

---

## Kampanie Google Ads

### Aktywne

| Kampania | Typ | LP | Budget |
|----------|-----|-----|--------|
| PMax — budowa domow | Performance Max | `/wycena` | 50 PLN/dzien |

### Planowane

| Kampania | Typ | LP | Frazy |
|----------|-----|-----|-------|
| Search — wycena | Search | `/wycena` | budowa domu wycena, kalkulator budowy |
| Search — local | Search | `/wycena` | budowa domu [miasto] |
| Brand | Search | `/` | coreltb, core ltb |
| Remarketing | Display | `/wycena` | Odwiedziny /wycena bez submit |

---

## Meta Pixel & Ads

### Pixel Setup

- **Pixel ID:** `2115781769222343`
- **Nazwa:** CoreLTB Pixel
- **Konto reklamowe:** CoreLTB Reklama (515195598339409)
- **Tworca:** Julia Kubala (asystentka marketingu)
- **Wlasciciel:** Tomasz (587512275861870)
- **Osadzenie:** `app/layout.tsx` via `next/script` strategy `afterInteractive`
- **Consent:** Startuje w `fbq('consent', 'revoke')`, aktywowany po akceptacji cookies

### Ustawienia w Events Manager

- **Automatyczne zaawansowane dopasowywanie:** Wl. (hashuje email/phone z formularzy)
- **Wlasne pliki cookie:** Wl.
- **Monitoruj zdarzenia automatycznie bez kodu:** Wyl. (eventy wysylamy recznie)
- **Lista zatwierdzonych domen:** `coreltb.pl`
- **API Konwersji (CAPI):** TODO — server-side tracking z `functions/api/lead.ts`

### Eventy Meta Pixel

| Event | Typ | Kiedy | Plik |
|-------|-----|-------|------|
| `PageView` | Standard | Kazda strona (automatyczny) | layout.tsx |
| `ViewContent` | Standard | Wejscie na `/wycena` | CalculatorForm.tsx |
| `Lead` | Standard | Submit formularza `/wycena` | CalculatorForm.tsx |
| `Lead` | Standard | Submit formularza `/umow-konsultacje` | ConsultationForm.tsx |
| `Lead` | Standard | Submit formularza `/analiza-dzialki` | PlotAnalysisForm.tsx |

### Implementacja w kodzie

Helpery w `lib/analytics.ts`:
- `trackMetaEvent(name, params)` → `window.fbq('track', name, params)`
- `trackMetaLead(source, data)` → `fbq('track', 'Lead', { content_name: source, ... })`
- `trackMetaViewContent(name, category)` → `fbq('track', 'ViewContent', ...)`

### Remarketing — plan (zbieranie danych w toku)

| Grupa | Definicja | Min. wielkosci | Status |
|-------|-----------|---------------|--------|
| Odwiedzili /wycena | ViewContent, 30 dni | 500-1000 osob | Zbieranie danych |
| Lead (konwersja) | Lead event, 180 dni | 100+ leadow | Zbieranie danych |
| Odwiedzili bez Lead | ViewContent MINUS Lead, 30 dni | 500+ osob | Zbieranie danych |
| Lookalike z leadow | Lookalike z grupy Lead | 500+ leadow zrodlowych | Za 2-3 miesiace |

**Minimalne wielkosci grup:** Remarketing = 100 (wymog Meta, realne min. 500-1000). Lookalike = 100 zrodlowych (realne min. 500+).
**Szacowany czas zbierania:** Remarketing ~2-4 tygodnie, Lookalike ~2-3 miesiace.

### Aktywne kampanie Meta

| Kampania | LP | Budget | Status |
|----------|-----|--------|--------|
| Kampania na kalkulator | `/wycena` | TBD | Aktywna (prowadzi Julia) |

### TODO Meta

- [ ] Conversions API (CAPI) — server-side tracking z `functions/api/lead.ts` (potrzebny Access Token)
- [ ] Stworzyc grupy remarketingowe (po zebraniu min. 500 ViewContent)
- [ ] Stworzyc Lookalike audience (po zebraniu min. 100 leadow)
- [ ] Analiza wynikow kampanii na `/wycena` — targetowanie, kreacje, koszty

---

## TODO Checklist

- [x] GTM container osadzony
- [x] GA4 skonfigurowany via GTM
- [x] Event tracking w formularzach (calculator, consultation, plot_analysis)
- [x] Phone click tracking na wszystkich tel: linkach
- [x] UTM capture + sessionStorage
- [x] Consent Mode v2 (Google + Meta)
- [x] Meta Pixel osadzony (ID: 2115781769222343)
- [x] Meta Pixel eventy: PageView, ViewContent, Lead
- [x] Meta consent mode (revoke/grant)
- [x] Cookie consent tracking (accepted/rejected/ignored)
- [ ] **Native Google Ads Conversion Tag w GTM** ← PRIORYTET
- [ ] Enhanced Conversions setup
- [ ] Meta Conversions API (CAPI) — server-side
- [ ] Remarketing audiences (Meta — po zebraniu danych)
- [ ] Analiza kampanii Meta na `/wycena`
