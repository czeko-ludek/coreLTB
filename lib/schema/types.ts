/**
 * TypeScript types dla Schema.org
 * Uproszczona wersja - tylko typy używane w projekcie
 */

export interface SchemaOrg {
  "@context": "https://schema.org";
  "@type": string;
  "@id"?: string;
  [key: string]: unknown;
}

export interface SchemaGraph {
  "@context": "https://schema.org";
  "@graph": SchemaOrg[];
}

export interface FAQPageSchema extends SchemaOrg {
  "@type": "FAQPage";
  mainEntity: QuestionSchema[];
}

export interface QuestionSchema {
  "@type": "Question";
  name: string;
  acceptedAnswer: AnswerSchema;
}

export interface AnswerSchema {
  "@type": "Answer";
  text: string;
}

export interface ServiceSchema extends SchemaOrg {
  "@type": "Service";
  name: string;
  description: string;
  provider: LocalBusinessSchema | object;
  areaServed: CitySchema[] | object[];
  url: string;
}

export interface LocalBusinessSchema extends SchemaOrg {
  "@type": "LocalBusiness";
  name: string;
  legalName?: string;
  description?: string;
  url: string;
  telephone: string;
  email?: string;
  address: PostalAddressSchema;
  geo?: GeoCoordinatesSchema;
  areaServed?: CitySchema[];
  foundingDate?: string;
  priceRange?: string;
  openingHoursSpecification?: OpeningHoursSpecificationSchema[];
  sameAs?: string[];
}

export interface PostalAddressSchema {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  postalCode: string;
  addressRegion: string;
  addressCountry: string;
}

export interface GeoCoordinatesSchema {
  "@type": "GeoCoordinates";
  latitude: string;
  longitude: string;
}

export interface CitySchema {
  "@type": "City";
  name: string;
}

export interface OpeningHoursSpecificationSchema {
  "@type": "OpeningHoursSpecification";
  dayOfWeek: string[];
  opens: string;
  closes: string;
}

export interface BreadcrumbListSchema extends SchemaOrg {
  "@type": "BreadcrumbList";
  itemListElement: ListItemSchema[];
}

export interface ListItemSchema {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}
