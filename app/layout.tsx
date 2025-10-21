import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header, Footer } from "@/components/sections";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CoreLTB Builders - Zbuduj Swój Wymarzony Projekt z Nami",
  description: "Profesjonalne usługi budowlane. Dostarczamy klientom większą przejrzystość projektów, lepszy wgląd i mniej chaosu.",
};

// Header data
const headerData = {
  topBar: {
    phone: "+48 123 456 789",
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
    { label: "Strona Główna", href: "/" },
    { label: "O Nas", href: "/about" },
    { label: "Oferta", href: "/oferta" },
    { label: "Projekty", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "Kontakt", href: "/contact" },
  ],
  searchEnabled: true,
  ctaButton: { text: "Wycena", href: "/contact" },
  megaMenuItems: [
    {
      icon: "home" as const,
      title: "Kompleksowa Budowa Domów",
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
      title: "Nadzór i Doradztwo",
      description: "Profesjonalny nadzór inwestorski i doradztwo techniczne na każdym etapie realizacji Twojej inwestycji.",
      href: "/oferta/nadzor-i-doradztwo",
    },
    {
      icon: "settings" as const,
      title: "Usługi Techniczne",
      description: "Zapewniamy pełen zakres usług technicznych, w tym instalacje sanitarne, elektryczne oraz systemy smart home.",
      href: "/oferta/uslugi-techniczne",
    },
    {
      icon: "paintBrush" as const,
      title: "Wykończenia i Aranżacje",
      description: "Precyzyjne prace wykończeniowe i stylowe aranżacje wnętrz, które nadadzą Twojemu domowi unikalny charakter.",
      href: "/oferta/wykonczenia-i-aranzacje",
    },
    {
      icon: "tree" as const,
      title: "Zagospodarowanie Terenu",
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
      content: "+48 123 456 789",
    },
    {
      iconName: "clock" as const,
      title: "Godziny Otwarcia",
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
      content: "ul. Przykładowa 123, Warszawa",
    },
  ],
  logo: { src: "/logo.webp", alt: "CoreLTB Builders" },
  about: "Budujemy marzenia i konstruujemy przyszłość. Jesteśmy zobowiązani do dostarczania wyjątkowych usług budowlanych.",
  linkGroups: [
    {
      title: "Przydatne Linki",
      links: [
        { label: "O Nas", href: "/about" },
        { label: "Nasze Usługi", href: "/services" },
        { label: "Projekty", href: "/projects" },
        { label: "Kontakt", href: "/contact" },
      ],
    },
    {
      title: "Szybkie Usługi",
      links: [
        { label: "Budownictwo Ogólne", href: "/services/general" },
        { label: "Projektowanie Wnętrz", href: "/services/interior" },
        { label: "Zarządzanie Projektem", href: "/services/management" },
        { label: "Konsultacje", href: "/services/consultation" },
      ],
    },
  ],
  newsletter: {
    title: "Newsletter",
    description: "Zapisz się do naszego newslettera, aby otrzymywać najnowsze informacje i oferty.",
    placeholder: "Twój email",
  },
  bottomBar: {
    copyright: "Copyright © 2024 CoreLTB Builders. Wszelkie prawa zastrzeżone.",
    links: [
      { label: "Regulamin", href: "/terms" },
      { label: "Polityka Prywatności", href: "/privacy" },
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
      <body className={inter.className}>
        <Header {...headerData} />
        {children}
        <Footer {...footerData} />
      </body>
    </html>
  );
}
