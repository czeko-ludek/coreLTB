/**
 * SINGLE SOURCE OF TRUTH dla danych firmy
 * Używane w Schema.org, Footer, Contact, etc.
 */

export interface CompanyAddress {
  readonly "@type": "PostalAddress";
  readonly streetAddress: string;
  readonly addressLocality: string;
  readonly postalCode: string;
  readonly addressRegion: string;
  readonly addressCountry: "PL";
}

export interface CompanyGeo {
  readonly "@type": "GeoCoordinates";
  readonly latitude: string;
  readonly longitude: string;
}

export interface AreaServed {
  readonly "@type": "City";
  readonly name: string;
}

export interface CompanyData {
  readonly name: string;              // Nazwa handlowa
  readonly legalName: string;         // Nazwa prawna
  readonly alternateName: string;     // Alternatywna nazwa
  readonly description: string;       // Krótki opis firmy
  readonly url: string;              // URL strony (bez trailing slash)
  readonly telephone: string;         // Format: +48123456789
  readonly email: string;
  readonly foundingDate: string;      // Format: YYYY-MM-DD
  readonly priceRange: string;        // $$$
  readonly currenciesAccepted: string;
  readonly paymentAccepted: string;

  // Główna siedziba (Jaworzno)
  readonly address: CompanyAddress;
  readonly geo: CompanyGeo;

  // Drugi oddział (Wodzisław Śląski)
  readonly additionalLocation?: {
    address: CompanyAddress;
    geo: CompanyGeo;
  };

  // Obsługiwane miasta
  readonly areaServed: readonly AreaServed[];

  // Godziny otwarcia
  readonly openingHours: readonly string[];

  // Social media & Google Business
  readonly sameAs: readonly string[];
}

/**
 * Dane firmy CoreLTB Builders
 */
export const companyData: CompanyData = {
  name: "CoreLTB Builders",
  legalName: "CoreLTB Sp. z o.o.",
  alternateName: "CORE LTB",
  description: "Generalny Wykonawca domów jednorodzinnych. Specjalizujemy się w budownictwie na terenach górniczych Śląska i Małopolski. Od 2005 roku łączymy rzemieślniczą dokładność z profesjonalnym zarządzaniem projektami.",
  url: "https://coreltb.pl",
  telephone: "+48664123757",
  email: "coreltb@gmail.com",
  foundingDate: "2005-01-01",
  priceRange: "$$$",
  currenciesAccepted: "PLN",
  paymentAccepted: "Gotówka, Przelew bankowy, Karta płatnicza",

  // Główna siedziba - Jaworzno
  address: {
    "@type": "PostalAddress",
    streetAddress: "ul. Grunwaldzka 34a",
    addressLocality: "Jaworzno",
    postalCode: "43-600",
    addressRegion: "śląskie",
    addressCountry: "PL"
  },

  geo: {
    "@type": "GeoCoordinates",
    latitude: "50.2050", // Jaworzno centrum
    longitude: "19.2750"
  },

  // Drugi oddział - Wodzisław Śląski
  additionalLocation: {
    address: {
      "@type": "PostalAddress",
      streetAddress: "ul. Wałowa 55",
      addressLocality: "Wodzisław Śląski",
      postalCode: "44-300",
      addressRegion: "śląskie",
      addressCountry: "PL"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "50.0000", // Wodzisław Śląski centrum
      longitude: "18.4610"
    }
  },

  // Obsługiwane miasta (Śląsk i Małopolska)
  areaServed: [
    // Główne miasta Śląska
    { "@type": "City", name: "Rybnik" },
    { "@type": "City", name: "Katowice" },
    { "@type": "City", name: "Gliwice" },
    { "@type": "City", name: "Zabrze" },
    { "@type": "City", name: "Bytom" },
    { "@type": "City", name: "Sosnowiec" },
    { "@type": "City", name: "Jaworzno" },
    { "@type": "City", name: "Wodzisław Śląski" },
    { "@type": "City", name: "Tychy" },
    { "@type": "City", name: "Mysłowice" },
    { "@type": "City", name: "Chorzów" },
    { "@type": "City", name: "Ruda Śląska" },
    { "@type": "City", name: "Jastrzębie-Zdrój" },
    { "@type": "City", name: "Racibórz" },
    { "@type": "City", name: "Żory" },

    // Powiat rybnicki
    { "@type": "City", name: "Jejkowice" },
    { "@type": "City", name: "Lyski" },
    { "@type": "City", name: "Gaszowice" },
    { "@type": "City", name: "Świerklany" },

    // Małopolska
    { "@type": "City", name: "Kraków" },
    { "@type": "City", name: "Tarnów" },
    { "@type": "City", name: "Oświęcim" },
    { "@type": "City", name: "Chrzanów" },
    { "@type": "City", name: "Olkusz" },
    { "@type": "City", name: "Wadowice" },
    { "@type": "City", name: "Bochnia" },
    { "@type": "City", name: "Skawina" },

    // Świętokrzyskie (z CLAUDE.md)
    { "@type": "City", name: "Kielce" },
  ] as const,

  openingHours: [
    "Mo-Fr 08:00-17:00",
    "Sa 09:00-14:00"
  ] as const,

  sameAs: [
    "https://facebook.com/coreltb",
    "https://instagram.com/coreltb",
    "https://linkedin.com/company/coreltb",
    "https://youtube.com/@coreltb"
  ] as const
};

/**
 * Funkcje pomocnicze dla Schema.org
 */

/**
 * Generuje kompletny obiekt LocalBusiness dla Schema.org
 */
export function getLocalBusinessSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${companyData.url}/#organization`,
    "name": companyData.name,
    "legalName": companyData.legalName,
    "alternateName": companyData.alternateName,
    "description": companyData.description,
    "url": companyData.url,
    "telephone": companyData.telephone,
    "email": companyData.email,
    "address": companyData.address,
    "geo": companyData.geo,
    "areaServed": companyData.areaServed,
    "foundingDate": companyData.foundingDate,
    "priceRange": companyData.priceRange,
    "currenciesAccepted": companyData.currenciesAccepted,
    "paymentAccepted": companyData.paymentAccepted,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "14:00"
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
    "address": companyData.address,
    "url": companyData.url
  };
}

/**
 * AreaServed dla Service Schema
 */
export function getAreaServedSchema() {
  return companyData.areaServed;
}

/**
 * Sprawdza czy miasto jest obsługiwane
 */
export function isCityServed(cityName: string): boolean {
  return companyData.areaServed.some(
    area => area.name.toLowerCase() === cityName.toLowerCase()
  );
}
