import {
  HeroSection,
  AboutCompanySection,
  ServicesSection,
  HowItWorksSection,
  ProjectsSection,
  TeamSection,
  TestimonialsSection,
  CtaSection,
  BlogSection,
  // PartnersSection, // Disabled - missing images
} from "@/components/sections";
import { allProjects } from "@/data/projects";

export default function Home() {
  // Hero Section Data
  const heroData = {
    tagline: "BUDUJEMY LEPSZE JUTRO",
    title: "Zrealizuj z nami projekt swoich marzeń!",
    subtitle:
      "CoreLTB to Twój zaufany partner w realizacji projektów budowlanych. Specjalizujemy się w budownictwie kubaturowym, projektach infrastrukturalnych, nowoczesnym budownictwie mieszkalnym, łącząc innowacyjne technologie z wieloletnim doświadczeniem. Od koncepcji aż po finalizację – budujemy solidne fundamenty dla Twojej przyszłości.",
    backgroundImage: "/slide-1.webp",
    primaryButton: { text: "Nasze Usługi", href: "/services" },
    stats: [
      {
        iconName: "building" as const,
        value: "200",
        label: "Zrealizowanych Projektów",
        suffix: "+",
      },
      {
        iconName: "users" as const,
        value: "15",
        label: "Ekspertów w Zespole",
        suffix: "+",
      },
      {
        iconName: "award" as const,
        value: "25",
        label: "Lat Doświadczenia",
        suffix: "",
      },
    ],
  };

  // About Company Section Data
  const aboutData = {
    header: {
      label: "O NASZEJ FIRMIE",
      title: "Dlaczego warto wybrać CoreLTB Builders?",
      theme: "light" as const,
    },
    content: [
      "Od 2005 roku budujemy domy z pasją przekazywaną w rodzinie z pokolenia na pokolenie. Ponad 200 zrealizowanych projektów to dowód, że potrafimy zamienić marzenia w rzeczywistość. Jesteśmy z Tobą na każdym kroku – od pomocy w zakupie działki, przez wszystkie formalności i projekt, aż po przekazanie kluczy do Twojego wymarzonego domu. Ty decydujesz o szczegółach, a my dbamy o resztę.",
      "Nasze doświadczenie to gwarancja terminowości, jakości i inteligentnych rozwiązań, które optymalizują koszty bez kompromisów. Pomagamy z formalnościami, doradzamy, wspieramy – bo wiemy, że budowa to nie tylko cegły, ale przede wszystkim ludzie i ich marzenia. Z nami budujesz nie tylko dom – tworzysz miejsce dla swojej rodziny.",
    ],
    image: {
      src: "/aboutcompany1.webp",
      alt: "Zespół CoreLTB Builders na budowie",
    },
    stats: {
      stats: [
        { value: "500+", label: "Zadowolonych Klientów", variant: "dark" as const },
        { value: "15+", label: "Zdobytych Nagród", variant: "primary" as const },
      ],
    },
    ctaButton: { text: "Dowiedz Się Więcej", href: "/about" },
  };

  // Services Section Data
  const servicesData = {
    header: {
      label: "POZNAJ NASZE USŁUGI",
      title: "Oferujemy Profesjonalne Usługi Budowlane",
      theme: "light" as const,
    },
    services: [
      {
        iconName: "home" as const,
        serviceNumber: "01",
        title: "Budowa Domów",
        description:
          "Kompleksowa realizacja domów jednorodzinnych pod klucz, od projektu aż po finalne wykończenie.",
        href: "/oferta/budowa-domow",
      },
      {
        iconName: "pencil" as const,
        serviceNumber: "02",
        title: "Projektowanie",
        description:
          "Tworzymy nowoczesne i funkcjonalne projekty budowlane oraz aranżacje wnętrz dopasowane do Twoich potrzeb.",
        href: "/oferta/projektowanie",
      },
      {
        iconName: "clipboard" as const,
        serviceNumber: "03",
        title: "Nadzór i Doradztwo",
        description:
          "Profesjonalny nadzór inwestorski i doradztwo techniczne na każdym etapie realizacji Twojej inwestycji.",
        href: "/oferta/nadzor-i-doradztwo",
      },
      {
        iconName: "settings" as const,
        serviceNumber: "04",
        title: "Usługi Techniczne",
        description:
          "Zapewniamy pełen zakres usług technicznych, w tym instalacje sanitarne, elektryczne oraz systemy smart home.",
        href: "/oferta/uslugi-techniczne",
      },
      {
        iconName: "paintBrush" as const,
        serviceNumber: "05",
        title: "Wnętrza",
        description:
          "Precyzyjne prace wykończeniowe i stylowe aranżacje wnętrz, które nadadzą Twojemu domowi unikalny charakter.",
        href: "/oferta/wykonczenia-i-aranzacje",
      },
      {
        iconName: "tree" as const,
        serviceNumber: "06",
        title: "Zagospodarowanie Terenu",
        description:
          "Przekształcamy przestrzeń w funkcjonalne i estetyczne otoczenie, realizując ogrody, drogi i ogrodzenia.",
        href: "/oferta/zagospodarowanie-terenu",
      },
    ],
  };

  // How It Works Section Data
  const howItWorksData = {
    header: {
      label: "JAK PRACUJEMY",
      title: "Jak Wygląda Współpraca z CoreLTB Builders",
      theme: "light" as const,
    },
    steps: [
      {
        number: 1,
        iconName: "check" as const,
        title: "Konsultacja i Planowanie",
        description:
          "Zaczynamy od zrozumienia Twojej wizji, wymagań i budżetu, aby stworzyć kompleksowy plan projektu.",
      },
      {
        number: 2,
        iconName: "fileCheck" as const,
        title: "Projekt i Zatwierdzenie",
        description:
          "Nasi eksperci opracowują szczegółowe projekty i plany, pracując ściśle z Tobą nad zatwierdzeniem i udoskonaleniem.",
      },
      {
        number: 3,
        iconName: "building" as const,
        title: "Budowa i Realizacja",
        description:
          "Realizujemy projekt z precyzją, utrzymując standardy jakości i dostarczając na czas.",
      },
    ],
    video: {
      placeholderImage: "/images/howitworks.webp",
      videoUrl: "https://www.youtube.com/watch?v=example",
    },
  };

  // Projects Section Data - Using real projects from database
  const projectsData = {
    header: {
      label: "NASZE ZREALIZOWANE PROJEKTY",
      title: "Odkryj Nasze Portfolio Wyjątkowych Projektów",
      theme: "light" as const,
    },
    projects: allProjects.map((project, index) => ({
      slug: project.slug,
      alt: project.alt,
      title: project.title,
      category: "Projekt", // All are projects
      location: project.price, // Price shown as location
      details: [
        { label: "Powierzchnia", value: project.surfaceArea },
        { label: "Technologia", value: project.technology },
        { label: "Działka", value: project.specifications[0]?.items.find(item => item.label === "Minimalne wymiary działki")?.value || "N/A" },
        { label: "Szacowany koszt", value: project.estimatedBuildCost },
      ],
      isActive: index === 0, // First project is active in slider
    })),
  };

  // Team Section Data
  const teamData = {
    header: {
      label: "POZNAJ NASZ ZESPÓŁ",
      title: "Nasi Eksperci",
      theme: "dark" as const,
    },
    team: [
      {
        image: {
          src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600",
          alt: "Tomasz Kowalski",
        },
        name: "Tomasz Kowalski",
        role: "Kierownik Projektu",
        description: "Ekspert w koordynacji i realizacji projektów z ponad 15-letnim doświadczeniem.",
        socials: [
          { platform: "facebook" as const, href: "https://facebook.com" },
          { platform: "twitter" as const, href: "https://twitter.com" },
          { platform: "linkedin" as const, href: "https://linkedin.com" },
        ],
      },
      {
        image: {
          src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600",
          alt: "Anna Nowak",
        },
        name: "Anna Nowak",
        role: "Główny Architekt",
        description: "Innowacyjna projektantka specjalizująca się w nowoczesnej i zrównoważonej architekturze.",
        socials: [
          { platform: "facebook" as const, href: "https://facebook.com" },
          { platform: "twitter" as const, href: "https://twitter.com" },
          { platform: "linkedin" as const, href: "https://linkedin.com" },
        ],
      },
    ],
  };

  // Testimonials Section Data
  const testimonialsData = {
    header: {
      label: "CO MÓWIĄ NASI KLIENCI",
      title: "Po Skorzystaniu z Naszych Usług",
      theme: "light" as const,
    },
    testimonials: [
      {
        quote:
          "Współpraca z CoreLTB Builders była czystą przyjemnością. Ich dbałość o szczegóły i zaangażowanie w jakość przekroczyły nasze oczekiwania. Zespół był profesjonalny, komunikatywny i dostarczył nasz wymarzony dom na czas.",
        author: {
          image: {
            src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
            alt: "Katarzyna Wiśniewska",
          },
          name: "Katarzyna Wiśniewska",
          role: "Właścicielka Domu",
        },
        rating: 4.8,
      },
      {
        quote:
          "Wyjątkowa obsługa od początku do końca. Zespół CoreLTB przekształcił naszą przestrzeń biurową w nowoczesne, funkcjonalne środowisko. Ich ekspertyza i profesjonalizm sprawiły, że cały proces przebiegł sprawnie i bezstresowo.",
        author: {
          image: {
            src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
            alt: "Michał Lewandowski",
          },
          name: "Michał Lewandowski",
          role: "Właściciel Firmy",
        },
        rating: 4.9,
      },
    ],
  };

  // CTA Section Data
  const ctaData = {
    title: "Gotowy na Budowę Swoich Marzeń? Umów Się na Spotkanie Już Dziś!",
    primaryButton: { text: "Umów Spotkanie", href: "/contact" },
    secondaryButton: { text: "Dowiedz Się Więcej", href: "/about" },
  };

  // Blog Section Data
  const blogData = {
    header: {
      label: "ARTYKUŁY I BLOG",
      title: "Najnowsze Wiadomości i Aktualności",
      theme: "light" as const,
    },
    posts: [
      {
        image: {
          src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
          alt: "Nowoczesne Budownictwo",
        },
        category: "Budownictwo",
        date: "15 Gru, 2023",
        title: "Nowoczesne Techniki Budowlane dla Zrównoważonego Budownictwa",
        excerpt:
          "Odkryj najnowsze innowacje w budownictwie, które promują zrównoważony rozwój i efektywność.",
        href: "/blog/modern-construction",
      },
      {
        image: {
          src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?w=800",
          alt: "Projektowanie Wnętrz",
        },
        category: "Design",
        date: "10 Gru, 2023",
        title: "Najważniejsze Trendy w Projektowaniu Wnętrz dla Nowoczesnych Domów",
        excerpt:
          "Poznaj najgorętsze trendy w projektowaniu wnętrz, które kształtują współczesne przestrzenie życiowe.",
        href: "/blog/design-trends",
      },
      {
        image: {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800",
          alt: "Planowanie Projektu",
        },
        category: "Planowanie",
        date: "05 Gru, 2023",
        title: "Kluczowe Etapy Planowania Projektu Budowlanego",
        excerpt:
          "Dowiedz się o krytycznych fazach planowania, które zapewniają udaną realizację projektu.",
        href: "/blog/project-planning",
      },
    ],
  };

  // Partners Section Data - Disabled (missing images)
  // const partnersData = {
  //   logos: [
  //     { name: "Partner 1", image: "/partners/partner1.svg" },
  //     { name: "Partner 2", image: "/partners/partner2.svg" },
  //     { name: "Partner 3", image: "/partners/partner3.svg" },
  //     { name: "Partner 4", image: "/partners/partner4.svg" },
  //     { name: "Partner 5", image: "/partners/partner5.svg" },
  //   ],
  // };

  return (
    <main>
      <HeroSection {...heroData} />
      <AboutCompanySection {...aboutData} />
      <ServicesSection {...servicesData} />
      <HowItWorksSection {...howItWorksData} />
      <ProjectsSection {...projectsData} />
      <TeamSection {...teamData} />
      <TestimonialsSection {...testimonialsData} />
      <CtaSection {...ctaData} />
      <BlogSection {...blogData} />
      {/* <PartnersSection {...partnersData} /> */}
    </main>
  );
}
