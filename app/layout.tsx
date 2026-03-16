import type { Metadata } from "next";
import { Manrope, Funnel_Sans } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/sections";
import { ErrorBoundary } from "@/components/shared";
import { companyData } from "@/data/company-data";

const manrope = Manrope({ subsets: ["latin"], display: "swap" });
const funnelSans = Funnel_Sans({ subsets: ["latin"], display: "swap", variable: "--font-heading" });

export const metadata: Metadata = {
  metadataBase: new URL(companyData.url),
  title: "CoreLTB Builders - Zbuduj Swój Wymarzony Projekt z Nami",
  description: "Profesjonalne usługi budowlane. Dostarczamy klientom większą przejrzystość projektów, lepszy wgląd i mniej chaosu.",
};

// Header data
const headerData = {
  topBar: {
    phone: "+48 664 123 757",
    email: "kontakt@coreltb.pl",
    socials: [
      { platform: "facebook" as const, href: "https://facebook.com" },
      { platform: "twitter" as const, href: "https://twitter.com" },
      { platform: "instagram" as const, href: "https://instagram.com" },
      { platform: "linkedin" as const, href: "https://linkedin.com" },
    ],
  },
  logo: { src: "/logo.webp", alt: "CoreLTB Builders" },
  navLinks: [
    { label: "Strona główna", href: "/" },
    { label: "O nas", href: "/o-nas" },
    { label: "Oferta", href: "/oferta" },
    { label: "Projekty", href: "/projekty" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/kontakt" },
  ],
  searchEnabled: false,
  ctaButton: { text: "Wycena", href: "/kontakt" },
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
  contactInfo: [
    {
      iconName: "phone" as const,
      title: "Zadzwoń",
      content: "+48 664 123 757",
    },
    {
      iconName: "clock" as const,
      title: "Godziny otwarcia",
      content: "Pn - Pt: 8:00 - 18:00",
    },
    {
      iconName: "mail" as const,
      title: "Pomoc",
      content: "kontakt@coreltb.pl",
    },
    {
      iconName: "mapPin" as const,
      title: "Adres",
      content: "Coreltb Builders sp. z o.o., ul. Wałowa 55, 44-300 Wodzisław Śląski",
    },
  ],
  logo: { src: "/logo.webp", alt: "CoreLTB Builders" },
  about: "Budujemy marzenia i konstruujemy przyszłość. Jesteśmy zobowiązani do dostarczania wyjątkowych usług budowlanych.",
  linkGroups: [
    {
      title: "Przydatne linki",
      links: [
        { label: "O nas", href: "/o-nas" },
        { label: "Nasze usługi", href: "/oferta" },
        { label: "Projekty", href: "/projekty" },
        { label: "Kontakt", href: "/kontakt" },
      ],
    },
    {
      title: "Obszar Działania",
      titleHref: "/obszar-dzialania",
      links: [
        { label: "Rybnik", href: "/obszar-dzialania/rybnik" },
        { label: "Katowice", href: "/obszar-dzialania/katowice" },
        { label: "Tychy", href: "/obszar-dzialania/tychy" },
        { label: "Jaworzno", href: "/obszar-dzialania/jaworzno" },
        { label: "Wodzisław Śląski", href: "/obszar-dzialania/wodzislaw-slaski" },
      ],
    },
  ],
  newsletter: {
    title: "Newsletter",
    description: "Zapisz się do naszego newslettera, aby otrzymywać najnowsze informacje i oferty.",
    placeholder: "Twój email",
  },
  bottomBar: {
    copyright: `Copyright © ${new Date().getFullYear()} CoreLTB Builders. Wszelkie prawa zastrzeżone.`,
    links: [
      { label: "Regulamin", href: "/terms" },
      { label: "Polityka prywatności", href: "/privacy" },
    ],
  },
  socials: [
    { platform: "facebook" as const, href: "https://facebook.com" },
    { platform: "twitter" as const, href: "https://twitter.com" },
    { platform: "instagram" as const, href: "https://instagram.com" },
    { platform: "linkedin" as const, href: "https://linkedin.com" },
    { platform: "youtube" as const, href: "https://youtube.com" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" data-scroll-behavior="smooth">
      {/* Preconnect/dns-prefetch removed: next/font/google hosts fonts locally, no external requests needed */}
      <body className={`${manrope.className} ${funnelSans.variable}`}>
        <Header {...headerData} />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <Footer {...footerData} />
      </body>
    </html>
  );
}
