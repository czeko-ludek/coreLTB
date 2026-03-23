import type { Metadata } from "next";
import { Manrope, Funnel_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header, Footer } from "@/components/sections";
import { ErrorBoundary } from "@/components/shared";
import { FloatingPhoneCTA } from "@/components/ui/FloatingPhoneCTA";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { companyData } from "@/data/company-data";

const GTM_ID = "GTM-TPFV68BN";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const funnelSans = Funnel_Sans({ subsets: ["latin"], display: "swap", variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(companyData.url),
  title: "CoreLTB Builders – Budowa Domów Pod Klucz | Śląsk i Małopolska",
  description: "Budowa domów jednorodzinnych od projektu po klucz. 15 lat doświadczenia, 150+ oddanych inwestycji, stała cena w umowie. Śląsk, Małopolska, Opolszczyzna.",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: "CoreLTB Builders",
    title: "CoreLTB Builders — Budowa Domów na Śląsku",
    description: "Budowa domów pod klucz na Śląsku, w Małopolsce i na Opolszczyźnie. 15 lat doświadczenia, 150+ oddanych inwestycji. Stała cena w umowie.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CoreLTB Builders — Kompleksowa budowa domów",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CoreLTB Builders — Budowa Domów na Śląsku",
    description: "Budowa domów pod klucz na Śląsku. 15 lat doświadczenia, 150+ oddanych inwestycji.",
    images: ["/images/og-image.jpg"],
  },
};

// Header data
const headerData = {
  topBar: {
    phone: "+48 664 123 757",
    email: "biuro@coreltb.pl",
    socials: [
      { platform: "facebook" as const, href: "https://www.facebook.com/CoreLTBBuilders" },
      { platform: "instagram" as const, href: "https://www.instagram.com/coreltb" },
    ],
  },
  logo: { src: "/images/logo-black-sm.webp", alt: "CoreLTB Builders" },
  navLinks: [
    { label: "Strona główna", href: "/" },
    { label: "O nas", href: "/o-nas" },
    { label: "Oferta", href: "/oferta" },
    { label: "Projekty", href: "/projekty" },
    { label: "Baza wiedzy", href: "/baza-wiedzy" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  searchEnabled: false,
  ctaButton: { text: "Wyceń budowę", href: "/wycena" },
  megaMenuItems: [
    {
      icon: "home" as const,
      title: "Kompleksowa budowa domów",
      description: "Kompleksowa realizacja domów jednorodzinnych pod klucz, od projektu aż po finalne wykończenie.",
      href: "/oferta/kompleksowa-budowa-domow",
    },
    {
      icon: "pencil" as const,
      title: "Projektowanie",
      description: "Tworzymy nowoczesne i funkcjonalne projekty budowlane oraz aranżacje wnętrz dopasowane do Twoich potrzeb.",
      href: "/oferta/projektowanie",
    },
    {
      icon: "clipboard" as const,
      title: "Nadzór i doradztwo",
      description: "Profesjonalny nadzór inwestorski i doradztwo techniczne na każdym etapie realizacji Twojej inwestycji.",
      href: "/oferta/nadzor-i-doradztwo",
    },
    {
      icon: "ruler" as const,
      title: "Usługi techniczne",
      description: "Badania gruntu, pomiary geodezyjne i profesjonalne kosztorysy. Twarde dane, które chronią Twoją inwestycję.",
      href: "/oferta/uslugi-techniczne",
    },
    {
      icon: "paintBrush" as const,
      title: "Wykończenia i aranżacje",
      description: "Precyzyjne prace wykończeniowe i stylowe aranżacje wnętrz, które nadadzą Twojemu domowi unikalny charakter.",
      href: "/oferta/wykonczenia-i-aranzacje",
    },
    {
      icon: "tree" as const,
      title: "Zagospodarowanie terenu",
      description: "Przekształcamy przestrzeń wokół budynków w funkcjonalne i estetyczne otoczenie, realizując ogrody, drogi i ogrodzenia.",
      href: "/oferta/zagospodarowanie-terenu",
    },
  ],
};

// Footer data
const footerData = {
  logo: { src: "/images/logo-white-sm.webp", alt: "CoreLTB Builders" },
  about: "Budowa domów jednorodzinnych pod klucz na Śląsku, w Małopolsce i na Opolszczyźnie. Od 2005 roku łączymy rzemieślniczą dokładność z profesjonalnym zarządzaniem projektami.",
  topBar: {
    phone: "+48 664 123 757",
    phoneHref: "tel:+48664123757",
    email: "biuro@coreltb.pl",
    hours: "Pn–Pt 8:00–18:00",
  },
  companyLinks: [
    { label: "O nas", href: "/o-nas" },
    { label: "Realizacje", href: "/projekty" },
    { label: "Obszar działania", href: "/obszar-dzialania" },
    { label: "Partnerzy", href: "/partnerzy" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  serviceLinks: [
    { label: "Budowa domów", href: "/oferta/kompleksowa-budowa-domow" },
    { label: "Projektowanie", href: "/oferta/projektowanie" },
    { label: "Nadzór i doradztwo", href: "/oferta/nadzor-i-doradztwo" },
    { label: "Usługi techniczne", href: "/oferta/uslugi-techniczne" },
    { label: "Zagospodarowanie terenu", href: "/oferta/zagospodarowanie-terenu" },
  ],
  areas: {
    title: "Obszar Działania",
    titleHref: "/obszar-dzialania",
    columns: [
      {
        subtitle: "Śląskie",
        links: [
          { label: "Katowice", href: "/obszar-dzialania/katowice" },
          { label: "Gliwice", href: "/obszar-dzialania/gliwice" },
          { label: "Zabrze", href: "/obszar-dzialania/zabrze" },
          { label: "Tychy", href: "/obszar-dzialania/tychy" },
          { label: "Mikołów", href: "/obszar-dzialania/mikolow" },
          { label: "Jaworzno", href: "/obszar-dzialania/jaworzno" },
          { label: "Rybnik", href: "/obszar-dzialania/rybnik" },
          { label: "Wodzisław Śl.", href: "/obszar-dzialania/wodzislaw-slaski" },
          { label: "Żory", href: "/obszar-dzialania/zory" },
          { label: "Jastrzębie-Zdrój", href: "/obszar-dzialania/jastrzebie-zdroj" },
          { label: "Racibórz", href: "/obszar-dzialania/raciborz" },
        ],
      },
      {
        subtitle: "Małopolskie",
        links: [
          { label: "Kraków", href: "/obszar-dzialania/krakow" },
          { label: "Chrzanów", href: "/obszar-dzialania/chrzanow" },
          { label: "Oświęcim", href: "/obszar-dzialania/oswiecim" },
          { label: "Olkusz", href: "/obszar-dzialania/olkusz" },
        ],
      },
      {
        subtitle: "Opolskie",
        links: [
          { label: "Opole", href: "/obszar-dzialania/opole" },
          { label: "Kędzierzyn-Koźle", href: "/obszar-dzialania/kedzierzyn-kozle" },
        ],
      },
    ],
  },
  locations: [
    {
      name: "Baza Jaworzno (HQ)",
      address: "ul. Grunwaldzka 34a, 43-600 Jaworzno",
    },
    {
      name: "Baza Wodzisław Śl.",
      address: "ul. Wałowa 55, 44-300 Wodzisław Śląski",
    },
  ],
  socials: [
    { platform: "facebook" as const, href: "https://www.facebook.com/CoreLTBBuilders" },
    { platform: "instagram" as const, href: "https://www.instagram.com/coreltb" },
  ],
  bottomBar: {
    copyright: `© ${new Date().getFullYear()} CoreLTB Builders sp. z o.o. Wszelkie prawa zastrzeżone.`,
    links: [
      { label: "Regulamin", href: "/terms" },
      { label: "Polityka prywatności", href: "/privacy" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
      <head>
        {/* Preload LCP hero image (mobile — most users) */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/images/hero/slide-1-mobile.webp"
          media="(max-width: 767px)"
        />
        {/* Preload LCP hero image (desktop) */}
        <link
          rel="preload"
          as="image"
          type="image/webp"
          href="/images/hero/slide-1.webp"
          media="(min-width: 768px)"
        />
        {/* Preconnect to GTM to reduce connection overhead */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        {/* Google Consent Mode v2 — defaults BEFORE GTM loads (required for EOG/GDPR) */}
        <Script id="consent-defaults" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            'analytics_storage': 'denied',
            'ad_storage': 'denied',
            'ad_user_data': 'denied',
            'ad_personalization': 'denied',
            'functionality_storage': 'granted',
            'security_storage': 'granted',
            'wait_for_update': 500
          });
        `}</Script>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${GTM_ID}');
        `}</Script>
      </head>
      <body className={`${manrope.className} ${funnelSans.variable}`}>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Header {...headerData} />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer {...footerData} />
        <FloatingPhoneCTA />
        <CookieConsent />
      </body>
    </html>
  );
}
