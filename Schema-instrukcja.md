# Schema.org - Instrukcja implementacji

**Zbiór najlepszych praktyk z projektu PROFOKNO**
Gotowy do wdrożenia w nowych projektach Next.js

---

## 📋 Spis treści

1. [Wprowadzenie](#wprowadzenie)
2. [Architektura 3-filarowa](#architektura-3-filarowa)
3. [Single Source of Truth - Pricing](#single-source-of-truth---pricing)
4. [Company Data - Dane firmy](#company-data---dane-firmy)
5. [Schema Generators - Automatyzacja](#schema-generators---automatyzacja)
6. [Implementacja w Next.js](#implementacja-w-nextjs)
7. [Wzorce dla różnych typów stron](#wzorce-dla-różnych-typów-stron)
8. [Best Practices](#best-practices)
9. [Checklist dla nowego projektu](#checklist-dla-nowego-projektu)

---

## Wprowadzenie

### Problem
Typowe problemy z cenami i Schema.org w projektach:
- ❌ Ceny hardcodowane w wielu miejscach
- ❌ Brak spójności między stroną a Schema.org
- ❌ Ręczne tworzenie JSON-LD dla każdej strony
- ❌ Duplikacja danych firmy w wielu plikach
- ❌ Trudności z aktualizacją cen i danych

### Rozwiązanie
✅ **Single Source of Truth** dla cen
✅ **Centralne dane firmy** używane wszędzie
✅ **Automatyczne generowanie** Schema.org
✅ **Type-safe** dzięki TypeScript
✅ **DRY principle** - żadnej duplikacji

### Korzyści
- 📊 **Zmiana ceny w 1 miejscu** → aktualizacja wszędzie
- 🤖 **Automatyczne Schema.org** → 0 błędów, 100% zgodność
- 🔍 **Lepsze SEO** → Rich Results w Google
- ⚡ **Szybsze wdrożenia** → gotowe generatory
- 🛡️ **Type safety** → błędy wykrywane w czasie kompilacji

---

## Architektura 3-filarowa

```
┌─────────────────────────────────────────────────────┐
│                    PROJEKT                          │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────┐ │
│  │   PRICING   │  │ COMPANY DATA │  │  SCHEMA   │ │
│  │  pricing.ts │  │company-data  │  │GENERATORS │ │
│  │             │  │    .ts       │  │           │ │
│  │ • Ceny      │  │              │  │• FAQ      │ │
│  │ • Jednostki │  │• Nazwa       │  │• Service  │ │
│  │ • Opisy     │  │• Adres       │  │• HowTo    │ │
│  │ • Warianty  │  │• Telefon     │  │• LocalBiz │ │
│  └──────┬──────┘  └──────┬───────┘  └─────┬─────┘ │
│         │                │                 │       │
│         └────────────────┴─────────────────┘       │
│                          │                         │
│                          ▼                         │
│              ┌───────────────────────┐             │
│              │   STRONY & SCHEMA     │             │
│              │                       │             │
│              │ • Strona główna       │             │
│              │ • Strony ofertowe     │             │
│              │ • Strony lokalne      │             │
│              │ • Cennik              │             │
│              └───────────────────────┘             │
└─────────────────────────────────────────────────────┘
```

### Struktura plików

```
projekt/
├── data/
│   └── pricing.ts              # 🎯 SINGLE SOURCE dla cen
│
├── content/
│   ├── company-data.ts         # 🏢 Dane firmy (adres, tel, etc)
│   ├── schema-generators.ts    # 🤖 Generatory Schema.org
│   ├── pillar-pages.ts         # 📄 Dane stron ofertowych
│   └── local-pages.ts          # 🌍 Dane stron lokalnych
│
└── app/
    ├── page.tsx                # Strona główna
    ├── oferta/[slug]/page.tsx  # Strony ofertowe
    └── [miasto]/page.tsx       # Strony lokalne
```

---

## Single Source of Truth - Pricing

### 1. Struktura pliku `data/pricing.ts`

```typescript
/**
 * SINGLE SOURCE OF TRUTH dla cen usług
 * Wszystkie ceny w aplikacji pochodzą z tego pliku
 */

export interface PricingVariant {
  readonly name: string;
  readonly price: number;
  readonly label: string;
}

export interface PricingItem {
  readonly price: number;          // Cena bazowa (liczba)
  readonly unit: string;            // Jednostka (np. "za skrzydło")
  readonly label: string;           // Format wyświetlania (np. "od 60 zł")
  readonly minPrice: boolean;       // Czy to cena minimalna (dla Schema.org)
  readonly description?: string;    // Opis dla Schema.org
  readonly variants?: readonly PricingVariant[]; // Warianty cenowe
}

export const PRICING = {
  regulacja: {
    price: 60,
    unit: 'za skrzydło',
    label: 'od 60 zł',
    minPrice: true,
    description: 'Regulacja okuć, ustawienie geometrii skrzydła',
    variants: [
      { name: 'Okno standardowe', price: 60, label: '60 zł' },
      { name: 'Drzwi balkonowe', price: 120, label: '120 zł' }
    ]
  },

  uszczelnianie: {
    price: 20,
    unit: 'za metr bieżący',
    label: 'od 20 zł',
    minPrice: true,
    description: 'Wymiana zużytych uszczelek na system EPDM'
  },

  // ... więcej usług
} as const;

export type ServiceId = keyof typeof PRICING;

// Pomocnicze funkcje
export function formatPrice(serviceId: ServiceId): string {
  return PRICING[serviceId].label;
}

export function getPrice(serviceId: ServiceId): number {
  return PRICING[serviceId].price;
}

export function getServicePricing(serviceId: ServiceId): PricingItem {
  return PRICING[serviceId];
}
```

### 2. Kluczowe zasady

#### ✅ Zawsze używaj:
```typescript
// ✅ DOBRZE - używa PRICING
import { PRICING } from '@/data/pricing';

const price = PRICING.regulacja.label;  // "od 60 zł"
const unit = PRICING.regulacja.unit;    // "za skrzydło"
```

#### ❌ Nigdy nie rób:
```typescript
// ❌ ŹLE - hardcodowana cena
const price = "60 zł";

// ❌ ŹLE - hardcodowana jednostka
const unit = "za skrzydło";
```

### 3. Używanie w komponencie

```tsx
import { PRICING } from '@/data/pricing';

export function PriceList() {
  return (
    <div>
      <h3>Regulacja okien</h3>
      <p className="price">{PRICING.regulacja.label}</p>
      <p className="unit">{PRICING.regulacja.unit}</p>
    </div>
  );
}
```

### 4. Używanie w template literals

```typescript
import { PRICING } from '@/data/pricing';

const description = `Profesjonalna regulacja okien już od ${PRICING.regulacja.label}.
Cena: ${PRICING.regulacja.price} zł ${PRICING.regulacja.unit}.`;
```

### 5. Warianty cenowe

Używaj wariantów gdy jedna usługa ma różne ceny:

```typescript
regulacja: {
  price: 60,  // Cena bazowa (minimalna)
  variants: [
    { name: 'Okno standardowe', price: 60, label: '60 zł' },
    { name: 'Drzwi balkonowe', price: 120, label: '120 zł' },
    { name: 'Okno duże (>2m²)', price: 90, label: '90 zł' }
  ]
}
```

W Schema.org każdy wariant stanie się osobnym Offer.

---

## Company Data - Dane firmy

### 1. Struktura pliku `content/company-data.ts`

```typescript
/**
 * Globalne dane firmy używane w Schema.org i na całej stronie
 * SINGLE SOURCE OF TRUTH dla danych firmy
 */

export interface CompanyData {
  name: string;              // Nazwa handlowa
  legalName: string;         // Nazwa prawna (z NIP)
  alternateName: string;     // Alternatywna nazwa
  description: string;       // Krótki opis firmy
  url: string;              // URL strony (bez trailing slash)
  telephone: string;         // Format: +48123456789
  email: string;
  foundingDate: string;      // Format: YYYY-MM-DD
  priceRange: string;        // $$, $$$, etc.
  currenciesAccepted: string;
  paymentAccepted: string;
  address: CompanyAddress;
  geo: CompanyGeo;
  areaServed: AreaServed[];
  openingHours: string[];    // Format: "Mo-Fr 09:00-17:00"
  sameAs: string[];          // Social media, Google Business
}

export const companyData: CompanyData = {
  name: "PROFOKNO",
  legalName: "PROFOKNO Piotr Pośpiech",
  alternateName: "PROFOKNO",
  description: "Mobilny serwis okien na Śląsku",
  url: "https://profokno.pl",
  telephone: "+48730121227",
  email: "kontakt@profokno.pl",
  foundingDate: "2015-01-01",
  priceRange: "$$",
  currenciesAccepted: "PLN",
  paymentAccepted: "Gotówka, Przelew, Karta",

  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Przykładowa 1",
    addressLocality: "Miasto",
    postalCode: "00-000",
    addressRegion: "województwo",
    addressCountry: "PL"
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "50.0000000",
    longitude: "19.0000000"
  },

  areaServed: [
    { "@type": "City", name: "Miasto 1" },
    { "@type": "City", name: "Miasto 2" }
  ],

  openingHours: [
    "Mo-Fr 07:00-18:00",
    "Sa 08:00-16:00"
  ],

  sameAs: [
    "https://www.facebook.com/firma",
    "https://g.page/r/XYZ" // Google Business Profile
  ]
};
```

### 2. Funkcje pomocnicze

```typescript
/**
 * Generuje KOMPLETNY obiekt LocalBusiness
 */
export function getLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "name": companyData.name,
    "legalName": companyData.legalName,
    "telephone": companyData.telephone,
    "address": companyData.address,
    "geo": companyData.geo,
    "areaServed": companyData.areaServed,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "07:00",
        "closes": "18:00"
      }
    ],
    "sameAs": companyData.sameAs
  };
}

/**
 * Uproszczony provider dla Service Schema
 */
export function getProviderSchema() {
  return {
    "@type": "LocalBusiness",
    "name": companyData.name,
    "telephone": companyData.telephone,
    "address": companyData.address
  };
}

/**
 * AreaServed dla Service Schema
 */
export function getAreaServedSchema() {
  return companyData.areaServed;
}
```

### 3. Używanie w komponencie

```tsx
import { companyData } from '@/content/company-data';

export function Footer() {
  return (
    <footer>
      <p>{companyData.name}</p>
      <p>{companyData.address.streetAddress}</p>
      <p>{companyData.address.postalCode} {companyData.address.addressLocality}</p>
      <a href={`tel:${companyData.telephone}`}>{companyData.telephone}</a>
      <a href={`mailto:${companyData.email}`}>{companyData.email}</a>
    </footer>
  );
}
```

---

## Schema Generators - Automatyzacja

### 1. Generator FAQ Schema

```typescript
/**
 * Generuje FAQPage Schema z unikalnym @id
 */
export function generateFAQPageSchema(
  faq: FAQItem[],
  pageUrl: string
): object {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,  // ✅ Unikalny ID zapobiega duplikacji
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripMarkdown(item.answer)  // Usuwa markdown z tekstu
      }
    }))
  };
}
```

**Używanie:**
```typescript
const faq = [
  { question: "Pytanie 1?", answer: "Odpowiedź **bold**" },
  { question: "Pytanie 2?", answer: "Odpowiedź 2" }
];

const faqSchema = generateFAQPageSchema(faq, "https://profokno.pl/oferta/regulacja-okien");
```

### 2. Generator Service Schema

```typescript
/**
 * Generuje Service Schema z OfferCatalog
 */
export function generateSchemaForPage(page: PillarPage): object {
  const graphItems: object[] = [];

  // 1. Service Schema
  if (page.serviceId) {
    const serviceData = PRICING[page.serviceId];

    const serviceSchema: Record<string, unknown> = {
      "@type": "Service",
      "name": page.title,
      "description": page.metaDescription,
      "provider": getProviderSchema(),
      "areaServed": getAreaServedSchema(),
      "url": `${companyData.url}/oferta/${page.slug}`
    };

    // OfferCatalog z wariantami
    const offers = createOffersFromPricing(page.serviceId);

    serviceSchema.hasOfferCatalog = {
      "@type": "OfferCatalog",
      "name": `Cennik - ${page.title}`,
      "itemListElement": offers
    };

    graphItems.push(serviceSchema);
  }

  // 2. FAQ Schema
  if (page.faq && page.faq.length > 0) {
    const pageUrl = `${companyData.url}/oferta/${page.slug}`;
    graphItems.push(generateFAQPageSchema(page.faq, pageUrl));
  }

  // 3. HowTo Schema
  if (page.howTo) {
    graphItems.push(generateHowToFromData(page.howTo, page.serviceId));
  }

  return {
    "@context": "https://schema.org",
    "@graph": graphItems
  };
}
```

### 3. Funkcja createOffersFromPricing

**Kluczowa funkcja** - automatycznie konwertuje `PRICING` na Schema.org Offers:

```typescript
function createOffersFromPricing(serviceId: ServiceId): object[] {
  const pricing = PRICING[serviceId];

  // Jeśli ma warianty - twórz osobny Offer dla każdego
  if ('variants' in pricing && pricing.variants && pricing.variants.length > 0) {
    return pricing.variants.map(variant => ({
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": `${getServiceName(serviceId)} - ${variant.name}`,
        "description": pricing.description
      },
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "priceCurrency": "PLN",
        "price": variant.price.toFixed(2),  // ✅ Zawsze .00
        "unitText": pricing.unit
      }
    }));
  }

  // Bez wariantów - standardowy Offer
  const priceSpec: Record<string, unknown> = {
    "@type": "UnitPriceSpecification",
    "priceCurrency": "PLN",
    "unitText": pricing.unit
  };

  // ✅ WAŻNE: minPrice vs price
  if (pricing.minPrice) {
    priceSpec.minPrice = pricing.price.toFixed(2);  // "od X zł"
  } else {
    priceSpec.price = pricing.price.toFixed(2);     // "X zł"
  }

  return [{
    "@type": "Offer",
    "itemOffered": {
      "@type": "Service",
      "name": getServiceName(serviceId),
      "description": pricing.description
    },
    "priceSpecification": priceSpec
  }];
}
```

### 4. Generator HowTo Schema

```typescript
/**
 * Generuje HowTo Schema dla instrukcji krok po kroku
 */
export function generateHowToSchema(
  name: string,
  description: string,
  steps: HowToStep[],
  options?: {
    totalTime?: string;        // ISO 8601: "PT30M" = 30 minut
    estimatedCost?: { currency: string; value: string };
    supply?: string[];         // Materiały
    tool?: string[];           // Narzędzia
    image?: string;
  }
): object {
  return {
    "@type": "HowTo",
    "name": name,
    "description": description,
    "totalTime": options?.totalTime,
    "estimatedCost": options?.estimatedCost && {
      "@type": "MonetaryAmount",
      "currency": options.estimatedCost.currency,
      "value": options.estimatedCost.value
    },
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      "image": step.image
    }))
  };
}
```

**Przykład użycia:**
```typescript
const howToSteps = [
  {
    name: "Krok 1: Sprawdź okucia",
    text: "Zlokalizuj śruby regulacyjne w zawiasach",
    image: "/images/step1.jpg"
  },
  {
    name: "Krok 2: Reguluj",
    text: "Użyj klucza imbusowego 4mm"
  }
];

const howToSchema = generateHowToSchema(
  "Jak wyregulować okno",
  "Instrukcja regulacji okna PCV krok po kroku",
  howToSteps,
  {
    totalTime: "PT15M",  // 15 minut
    estimatedCost: { currency: "PLN", value: "60" },
    tool: ["Klucz imbusowy 4mm", "Poziomnica"]
  }
);
```

---

## Implementacja w Next.js

### 1. Strona ofertowa (Pillar Page)

```tsx
// app/oferta/[slug]/page.tsx
import Script from "next/script";
import { generateSchemaForPage } from "@/content/schema-generators";
import { pillarPages } from "@/content/pillar-pages";

export default function OfferPage({ params }: { params: { slug: string } }) {
  const page = pillarPages[params.slug];

  if (!page) {
    notFound();
  }

  // ✅ Automatyczne generowanie Schema.org
  const schema = generateSchemaForPage(page);

  return (
    <>
      <main>
        <h1>{page.title}</h1>
        {/* ... reszta contentu */}
      </main>

      {/* Schema.org JSON-LD */}
      <Script
        id={`schema-${params.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}
```

### 2. Strona główna

```tsx
// app/page.tsx
import Script from "next/script";
import { generateHomePageSchema } from "@/content/schema-generators";

export default function HomePage() {
  const schema = generateHomePageSchema();

  return (
    <>
      <main>
        {/* ... content */}
      </main>

      <Script
        id="homepage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema),
        }}
      />
    </>
  );
}
```

### 3. Generator metadata

```typescript
// app/oferta/[slug]/page.tsx
import { Metadata } from "next";
import { pillarPages } from "@/content/pillar-pages";
import { companyData } from "@/content/company-data";

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const page = pillarPages[params.slug];

  return {
    title: page.metaTitle,
    description: page.metaDescription,
    keywords: page.metaKeywords?.join(", "),
    openGraph: {
      title: page.metaTitle,
      description: page.metaDescription,
      url: `${companyData.url}/oferta/${params.slug}`,
      type: "website",
      images: [
        {
          url: page.heroImage,
          width: 1200,
          height: 630,
        }
      ]
    }
  };
}
```

---

## Wzorce dla różnych typów stron

### 1. Strona główna - Węzeł nawigacyjny

**Strategia:** Strona główna jako katalog usług z linkami do podstron

```typescript
export function generateHomePageSchema(): object {
  const graphItems: object[] = [];

  // 1. LocalBusiness z OfferCatalog
  const localBusiness = {
    ...getLocalBusinessSchema(),
    "@id": `${companyData.url}/#organization`,

    // Katalog usług - bez szczegółowych cen
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Usługi serwisowe",
      "itemListElement": MAIN_SERVICES.map((service, index) => ({
        "@type": "Offer",
        "position": index + 1,
        "itemOffered": {
          "@type": "Service",
          "name": service.name,
          "description": service.description,
          "url": service.url  // ✅ Link do dedykowanej podstrony
        },
        "priceSpecification": {
          "@type": "PriceSpecification",
          "priceCurrency": "PLN",
          "price": service.priceRange  // "od 60 zł"
        }
      }))
    }
  };

  graphItems.push(localBusiness);

  // 2. FAQPage
  graphItems.push(generateFAQPageSchema(HOME_FAQ, companyData.url));

  return {
    "@context": "https://schema.org",
    "@graph": graphItems
  };
}
```

### 2. Strona ofertowa - Szczegóły usługi

**Strategia:** Pełne informacje o usłudze + warianty cenowe

```typescript
// content/pillar-pages.ts
export const pillarPages = {
  'regulacja-okien': {
    slug: 'regulacja-okien',
    title: 'Regulacja okien',
    serviceId: 'regulacja',  // ✅ Mapuje na PRICING.regulacja
    relatedServices: ['uszczelnianie', 'konserwacja'],
    faq: [
      { question: "...", answer: "..." }
    ],
    howTo: {
      title: "Jak regulujemy okna",
      steps: [...]
    }
  }
};
```

Schema automatycznie zawiera:
- ✅ Service z wieloma wariantami (okno, drzwi)
- ✅ OfferCatalog z precyzyjnymi cenami
- ✅ FAQPage z pytaniami
- ✅ HowTo z instrukcją

### 3. Strona lokalna - Miasto/Region

**Strategia:** Usługi dla konkretnego miasta

```typescript
// content/local-pages.ts
export const localPages = {
  'serwis-okien-rybnik': {
    slug: 'serwis-okien-rybnik',
    cityName: 'Rybnik',
    areaServed: ['Rybnik', 'Chwałowice', 'Boguszowice'],
    serviceIds: ['regulacja', 'uszczelnianie', 'rolety'],  // Wybrane usługi
    faq: [...]
  }
};
```

Schema automatycznie zawiera:
- ✅ Service z areaServed dla miasta
- ✅ OfferCatalog z wybranymi usługami
- ✅ FAQPage lokalne

### 4. Cennik - OfferCatalog kompletny

```typescript
export function generatePricingSchema(): object {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OfferCatalog",
        "@id": `${companyData.url}/cennik#offercatalog`,
        "name": "Cennik usług serwisowych",
        "itemListElement": Object.keys(PRICING).map((serviceId, index) => {
          const pricing = PRICING[serviceId as ServiceId];
          return {
            "@type": "Offer",
            "position": index + 1,
            "itemOffered": {
              "@type": "Service",
              "name": getServiceName(serviceId as ServiceId),
              "description": pricing.description
            },
            "priceSpecification": {
              "@type": "UnitPriceSpecification",
              "price": pricing.price,
              "priceCurrency": "PLN",
              "unitText": pricing.unit
            }
          };
        })
      }
    ]
  };
}
```

---

## Best Practices

### 1. ✅ DOs - Co robić

#### Ceny
```typescript
// ✅ Zawsze używaj PRICING
const price = PRICING.regulacja.label;

// ✅ Formatuj ceny do .00
price.toFixed(2)  // "60.00"

// ✅ Używaj minPrice dla cen "od X zł"
if (pricing.minPrice) {
  priceSpec.minPrice = pricing.price.toFixed(2);
}
```

#### Schema.org
```typescript
// ✅ Używaj unikalnych @id
"@id": `${pageUrl}#faq`

// ✅ Usuwaj markdown z tekstów
stripMarkdown(answer)

// ✅ Używaj @graph dla wielu schematów
{
  "@context": "https://schema.org",
  "@graph": [schema1, schema2, schema3]
}
```

#### Company Data
```typescript
// ✅ Importuj z jednego miejsca
import { companyData } from '@/content/company-data';

// ✅ Używaj funkcji pomocniczych
getProviderSchema()
getAreaServedSchema()
```

### 2. ❌ DON'Ts - Czego unikać

```typescript
// ❌ Hardcodowane ceny
const price = "60 zł";

// ❌ Duplikacja danych firmy
const phone = "+48123456789";

// ❌ Ręczne tworzenie Schema
const schema = { "@type": "Service", ... };

// ❌ Brak unikalnych @id
"@type": "FAQPage"  // Brak @id → duplikacja

// ❌ Markdown w Schema.org
"text": "Odpowiedź **bold**"  // Źle, użyj stripMarkdown()

// ❌ Niepoprawny format ceny
"price": "60"      // Źle, powinno być "60.00"
"price": 60        // Źle, powinno być string "60.00"
```

### 3. Type Safety

```typescript
// ✅ Używaj TypeScript types
import type { ServiceId } from '@/data/pricing';
import type { PillarPage } from '@/content/pillar-pages';

function generateSchema(serviceId: ServiceId): object {
  // TypeScript sprawdzi czy serviceId istnieje w PRICING
  const pricing = PRICING[serviceId];
}
```

### 4. Testowanie Schema.org

Narzędzia do testowania:
- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema.org Validator**: https://validator.schema.org/
- **Google Search Console**: Sekcja "Enhancements"

### 5. Optymalizacja

```typescript
// ✅ Server-side generowanie (Next.js)
// Generuj Schema w komponencie, nie w useEffect

// ❌ Client-side generowanie
useEffect(() => {
  // Nie rób tego! Duplikacja + gorszy SEO
  const script = document.createElement('script');
}, []);
```

---

## Checklist dla nowego projektu

### Krok 1: Struktura folderów
```bash
mkdir -p data content
touch data/pricing.ts
touch content/company-data.ts
touch content/schema-generators.ts
```

### Krok 2: Setup pricing.ts
- [ ] Skopiuj interfejsy `PricingItem`, `PricingVariant`
- [ ] Zdefiniuj wszystkie usługi w `PRICING`
- [ ] Dodaj `ServiceId` type
- [ ] Dodaj funkcje pomocnicze (`formatPrice`, `getPrice`)

### Krok 3: Setup company-data.ts
- [ ] Skopiuj interface `CompanyData`
- [ ] Wypełnij dane firmy (nazwa, adres, telefon)
- [ ] Dodaj areaServed (obsługiwane miasta)
- [ ] Dodaj openingHours
- [ ] Dodaj sameAs (social media, Google Business)
- [ ] Dodaj funkcje `getLocalBusinessSchema()`, `getProviderSchema()`

### Krok 4: Setup schema-generators.ts
- [ ] Skopiuj `generateFAQPageSchema()`
- [ ] Skopiuj `generateSchemaForPage()`
- [ ] Skopiuj `createOffersFromPricing()`
- [ ] Skopiuj `generateHowToSchema()` (jeśli potrzebne)
- [ ] Skopiuj `generateHomePageSchema()`
- [ ] Skopiuj `stripMarkdown()` i inne utility

### Krok 5: Integracja w Next.js
- [ ] Dodaj Schema.org do layout.tsx (strona główna)
- [ ] Dodaj Schema.org do stron ofertowych
- [ ] Dodaj Schema.org do stron lokalnych (jeśli są)
- [ ] Użyj `<Script type="application/ld+json">`
- [ ] Testuj w Google Rich Results Test

### Krok 6: Content pages
- [ ] Utwórz `pillar-pages.ts` z danymi stron
- [ ] Każda strona ma `serviceId` mapujące na PRICING
- [ ] Każda strona ma `faq` array
- [ ] Opcjonalnie dodaj `howTo` dla instrukcji

### Krok 7: Używanie PRICING
- [ ] Zamień wszystkie hardcodowane ceny na `PRICING.xxx.label`
- [ ] Użyj template literals: `` `od ${PRICING.regulacja.label}` ``
- [ ] Sprawdź czy komponenty używają PRICING zamiast stałych

### Krok 8: Testowanie
- [ ] Google Rich Results Test - wszystkie strony
- [ ] Schema.org Validator - sprawdź błędy
- [ ] Sprawdź czy nie ma duplikacji FAQPage
- [ ] Sprawdź unikalne @id dla każdego schema
- [ ] Sprawdź czy ceny są w formacie .00

### Krok 9: Dokumentacja
- [ ] Skopiuj ten plik `Schema-instrukcja.md` do projektu
- [ ] Zaktualizuj `README.md` z linkiem do instrukcji
- [ ] Dodaj komentarze w kodzie dla przyszłych devów

---

## Przykłady zastosowania

### Przykład 1: Zmiana ceny

**Przed:**
```typescript
// pricing.ts
regulacja: {
  price: 60,
  label: 'od 60 zł'
}

// 20 miejsc w kodzie:
<p>Regulacja od 60 zł</p>
"Regulacja okien od 60 zł za skrzydło"
{ "price": "60.00" }
```

**Po zmianie ceny na 70 zł:**
```typescript
// pricing.ts - JEDYNA zmiana
regulacja: {
  price: 70,  // ✅ Zmiana w 1 miejscu
  label: 'od 70 zł'
}

// Automatycznie zaktualizuje się:
// - Wszystkie komponenty używające PRICING.regulacja
// - Schema.org na wszystkich stronach
// - Tabele cenowe
// - FAQ z cenami
// - Meta descriptions (jeśli używają template literals)
```

### Przykład 2: Nowa usługa

```typescript
// 1. Dodaj do pricing.ts
export const PRICING = {
  // ... existing

  // ✅ Nowa usługa
  montazMoskitiery: {
    price: 80,
    unit: 'za sztukę',
    label: 'od 80 zł',
    minPrice: true,
    description: 'Profesjonalny montaż moskitiery ramkowej lub rolowanej'
  }
};

// 2. Dodaj do schema-generators.ts w getServiceName()
function getServiceName(serviceId: ServiceId): string {
  const names: Record<ServiceId, string> = {
    // ... existing
    montazMoskitiery: "Montaż moskitiery"
  };
  return names[serviceId];
}

// 3. Utwórz stronę ofertową w pillar-pages.ts
'montaz-moskitiery': {
  slug: 'montaz-moskitiery',
  title: 'Montaż moskitier',
  serviceId: 'montazMoskitiery',  // ✅ Auto-link do PRICING
  faq: [...]
}

// 4. Schema.org wygeneruje się automatycznie! 🎉
```

### Przykład 3: Strona lokalna

```typescript
// local-pages.ts
export const localPages = {
  'serwis-okien-katowice': {
    slug: 'serwis-okien-katowice',
    cityName: 'Katowice',
    metaTitle: 'Serwis Okien Katowice - PROFOKNO',
    metaDescription: 'Profesjonalny serwis okien w Katowicach...',

    // ✅ Obsługiwane dzielnice
    areaServed: [
      'Katowice',
      'Sosnowiec',
      'Mysłowice',
      'Siemianowice Śląskie'
    ],

    // ✅ Usługi dostępne w tym mieście
    serviceIds: ['regulacja', 'uszczelnianie', 'wymianaSzyb'],

    // ✅ FAQ lokalne
    faq: [
      {
        question: "Czy dojeżdżacie do Katowic?",
        answer: `TAK! Obsługujemy Katowice i okolice.
                 Dojazd w promieniu 20 km gratis.
                 Regulacja okien od ${PRICING.regulacja.label}.`
      }
    ]
  }
};

// Schema.org automatycznie zawiera:
// ✅ Service z areaServed dla 4 miast
// ✅ OfferCatalog z 3 wybranymi usługami
// ✅ Ceny z PRICING dla każdej usługi
// ✅ FAQPage z lokalnymi pytaniami
```

---

## Podsumowanie

### Co osiągnęliśmy?

✅ **Single Source of Truth** - ceny w 1 miejscu
✅ **Automatyczne Schema.org** - 0 duplikacji, 100% zgodność
✅ **Type-safe** - błędy wykrywane w compile time
✅ **Łatwa konserwacja** - zmiana ceny = 1 linia kodu
✅ **Skalowalność** - dodanie usługi = automatyczne Schema

### Najważniejsze zasady

1. **Nigdy nie hardcoduj cen** - zawsze używaj `PRICING`
2. **Nigdy nie duplikuj danych firmy** - używaj `companyData`
3. **Generuj Schema automatycznie** - używaj `generateSchemaForPage()`
4. **Testuj Schema.org** - Google Rich Results Test
5. **Używaj TypeScript** - type safety zapobiega błędom

### Gotowy do wdrożenia!

Ten system został przetestowany w projekcie PROFOKNO i działa bezawaryjnie. Możesz go wdrożyć w każdym projekcie Next.js w mniej niż 1 godzinę.

---

**Data utworzenia:** 2026-01-09
**Projekt bazowy:** PROFOKNO - https://profokno.pl
**Next.js:** 16.1.1
**TypeScript:** 5.x
