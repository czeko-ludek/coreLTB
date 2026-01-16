import {
	AboutCompanySection,
	BlogSection,
	CtaSection,
	HeroSection,
	HowItWorksSection,
	ProjectsSection,
	ServiceShowcaseSection,
	TestimonialsSection,
	// PartnersSection, // Disabled - missing images
} from "@/components/sections"; // ✅ Centralized import from index.ts
import { allProjects } from "@/data/projects";

export default function Home() {
	// Hero Section Data
	const heroData = {
		tagline: "BUDUJEMY LEPSZE JUTRO",
		title: "Zrealizuj z nami projekt swoich marzeń!",
		subtitle:
			"CoreLTB to Twój zaufany partner w realizacji projektów budowlanych. Specjalizujemy się w budownictwie kubaturowym, projektach infrastrukturalnych, nowoczesnym budownictwie mieszkalnym, łącząc innowacyjne technologie z wieloletnim doświadczeniem. Od koncepcji aż po finalizację – budujemy solidne fundamenty dla Twojej przyszłości.",
		backgroundImage: "/slide-1.webp",
		primaryButton: { text: "Nasze usługi", href: "/services" },
		stats: [
			{
				iconName: "building" as const,
				value: "200",
				label: "Zrealizowanych projektów",
				suffix: "+",
			},
			{
				iconName: "users" as const,
				value: "15",
				label: "Ekspertów w zespole",
				suffix: "+",
			},
			{
				iconName: "award" as const,
				value: "25",
				label: "Lat doświadczenia",
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
			"Jesteśmy firmą rodzinną z **podwójnym korzeniem** – operujemy z Jaworzna i Wodzisławia Śląskiego. Działamy w skali generalnego wykonawcy, ale podchodzimy do inwestycji z rzemieślniczą odpowiedzialnością, gdzie nazwisko właściciela jest najlepszą gwarancją jakości.",
			"Od ponad 15 lat rozwiązujemy **inżynierskie problemy Południowej Polski**: szkody górnicze na Śląsku, trudne warunki gruntowe i skomplikowaną logistykę materiałową. Nie sprzedajemy marzeń o domu – dostarczamy bezpieczny, terminowo zrealizowany budynek oparty na solidnej umowie.",
		],
		image: {
			src: "/aboutcompany1.webp",
			alt: "Zespół CoreLTB Builders na budowie",
		},
		stats: {
			stats: [
				{
					value: "100+",
					label: "Zakończonych Inwestycji",
					variant: "dark" as const,
				},
				{
					value: "15 LAT",
					label: "Doświadczenia Inżynierskiego Kadry",
					variant: "primary" as const,
				},
			],
		},
		ctaButton: { text: "Poznaj nasz zespół", href: "/o-nas" },
	};

	// Services Section Data
	const servicesData = {
		header: {
			label: "POZNAJ NASZE USŁUGI",
			title: "Oferujemy profesjonalne usługi budowlane",
			theme: "light" as const,
		},
		services: [
			{
				iconName: "home" as const,
				title: "Budowa domów",
				description:
					"Kompleksowa realizacja domów jednorodzinnych pod klucz, od projektu aż po finalne wykończenie. Zajmujemy się wszystkim - od fundamentów po dach.",
				image:
					"https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=1200",
				href: "/oferta/kompleksowa-budowa-domow",
			},
			{
				iconName: "pencil" as const,
				title: "Projektowanie",
				description:
					"Tworzymy nowoczesne i funkcjonalne projekty budowlane oraz aranżacje wnętrz dopasowane do Twoich potrzeb. Nasze projekty łączą estetykę z funkcjonalnością.",
				image:
					"https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200",
				href: "/oferta/projektowanie",
			},
			{
				iconName: "clipboard" as const,
				title: "Nadzór i doradztwo",
				description:
					"Profesjonalny nadzór inwestorski i doradztwo techniczne na każdym etapie realizacji Twojej inwestycji. Dbamy o jakość i terminowość.",
				image:
					"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200",
				href: "/oferta/nadzor-i-doradztwo",
			},
			{
				iconName: "settings" as const,
				title: "Usługi techniczne",
				description:
					"Zapewniamy pełen zakres usług technicznych, w tym instalacje sanitarne, elektryczne oraz systemy smart home. Nowoczesne rozwiązania dla Twojego domu.",
				image:
					"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1200",
				href: "/oferta/uslugi-techniczne",
			},
			{
				iconName: "paintBrush" as const,
				title: "Wykończenia",
				description:
					"Precyzyjne prace wykończeniowe i stylowe aranżacje wnętrz, które nadadzą Twojemu domowi unikalny charakter. Dbałość o każdy detal.",
				image:
					"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200",
				href: "/oferta/wykonczenia-i-aranzacje",
			},
			{
				iconName: "tree" as const,
				title: "Zagospodarowanie terenu",
				description:
					"Przekształcamy przestrzeń w funkcjonalne i estetyczne otoczenie, realizując ogrody, drogi i ogrodzenia. Kompleksowe zagospodarowanie działki.",
				image:
					"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200",
				href: "/oferta/zagospodarowanie-terenu",
			},
		],
	};

	// How It Works Section Data
	const howItWorksData = {
		header: {
			label: "MODEL REALIZACJI",
			title: "Inwestycja prowadzona systemowo",
			theme: "light" as const,
		},
		steps: [
			{
				number: 1,
				iconName: "check" as const,
				title: "Audyt Działki i Budżetowanie",
				description:
					"Zamiast \"rozmów o wizji\", zaczynamy od weryfikacji MPZP i warunków gruntowych (szkody górnicze). Przygotowujemy **wstępny kosztorys inwestorski**, aby zderzyć Twoje oczekiwania z realiami rynkowymi 2026 r. przed wydaniem pieniędzy na projekt.",
			},
			{
				number: 2,
				iconName: "fileCheck" as const,
				title: "Projekt i Formalności (PnB)",
				description:
					"Przejmujemy biurokrację. Na podstawie pełnomocnictwa uzyskujemy **Pozwolenie na Budowę** i wykonujemy adaptację konstrukcyjną budynku. Optymalizujemy projekt, zamieniając przewymiarowane rozwiązania na ekonomiczne technologie systemowe.",
			},
			{
				number: 3,
				iconName: "building" as const,
				title: "Realizacja i Odbiory Techniczne",
				description:
					"Budowa pod nadzorem Inżyniera Kontraktu. Nie martwisz się o dostawy betonu czy harmonogram brygad. Każdy etap (fundamenty, stropy) kończy się rygorem odbiorowym i dokumentacją fotograficzną.",
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
			title: "Odkryj nasze portfolio wyjątkowych projektów",
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
				{
					label: "Działka",
					value:
						project.specifications[0]?.items.find(
							(item) => item.label === "Minimalne wymiary działki",
						)?.value || "N/A",
				},
				{ label: "Szacowany koszt", value: project.estimatedBuildCost },
			],
			isActive: index === 0, // First project is active in slider
		})),
	};

	// Testimonials Section Data
	const testimonialsData = {
		header: {
			label: "CO MÓWIĄ NASI KLIENCI",
			title: "Po skorzystaniu z naszych usług",
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
					role: "Właścicielka domu",
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
					role: "Właściciel firmy",
				},
				rating: 4.9,
			},
		],
	};

	// CTA Section Data
	const ctaData = {
		title: "Gotowy na budowę swoich marzeń?",
		email: "coreltb@gmail.com",
		primaryButton: { text: "Umów wizytę", href: "/kontakt" },
		socials: [
			{ platform: "facebook" as const, href: "https://facebook.com" },
			{ platform: "instagram" as const, href: "https://instagram.com" },
			{ platform: "linkedin" as const, href: "https://linkedin.com" },
			{ platform: "youtube" as const, href: "https://youtube.com" },
		],
	};

	// Blog Section Data
	const blogData = {
		header: {
			label: "ARTYKUŁY I BLOG",
			title: "Najnowsze wiadomości i aktualności",
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
				title: "Nowoczesne techniki budowlane dla zrównoważonego budownictwa",
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
				title:
					"Najważniejsze trendy w projektowaniu wnętrz dla nowoczesnych domów",
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
				title: "Kluczowe etapy planowania projektu budowlanego",
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
			<ServiceShowcaseSection {...servicesData} />
			<HowItWorksSection {...howItWorksData} />
			<ProjectsSection {...projectsData} />
			<TestimonialsSection {...testimonialsData} />
			<CtaSection {...ctaData} />
			<BlogSection {...blogData} />
			{/* <PartnersSection {...partnersData} /> */}
		</main>
	);
}
