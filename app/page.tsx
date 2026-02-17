import {
	AboutCompanySection,
	BlogSection,
	ContactCTASection,
	HeroSection,
	HowItWorksSection,
	ProjectsSection,
	ServiceShowcaseSection,
	TestimonialsSection,
	// PartnersSection, // Disabled - missing images
} from "@/components/sections"; // ✅ Centralized import from index.ts
import { companyData } from "@/data/company-data";
import { allProjects } from "@/data/projects";
import { blogPosts } from "@/data/blog-data";

export default function Home() {
	// Hero Section Data
	const heroData = {
		tagline: "BUDUJEMY LEPSZE JUTRO",
		title: "Zrealizuj z nami projekt swoich marzeń!",
		subtitle:
			"Budujemy domy pod klucz. Od projektu po odbiór - jeden wykonawca, jedna umowa.",
		images: [
			{ src: "/images/hero/slide-1.webp", alt: "Budowa domu na Śląsku" },
			{ src: "/images/hero/slide-2.webp", alt: "Nowoczesny dom jednorodzinny" },
			{ src: "/images/hero/slide-3.webp", alt: "Realizacja CoreLTB Builders" },
			{ src: "/images/hero/slide-4.webp", alt: "Dom pod klucz" },
		],
		primaryButton: { text: "Nasze usługi", href: "/oferta" },
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
			src: "/images/about-home.webp",
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
				...(project.estimatedBuildCost ? [{ label: "Szacowany koszt", value: project.estimatedBuildCost }] : []),
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
					role: "Właścicielka domu, Rybnik",
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
					role: "Właściciel firmy, Katowice",
				},
				rating: 4.9,
			},
			{
				quote:
					"Budowa na terenie górniczym to było nasze największe zmartwienie. CoreLTB wykonali płytę fundamentową i cały stan surowy bez żadnych problemów. Wszystko zgodnie z harmonogramem i budżetem.",
				author: {
					image: {
						src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
						alt: "Tomasz Kowalczyk",
					},
					name: "Tomasz Kowalczyk",
					role: "Inwestor prywatny, Tychy",
				},
				rating: 5.0,
			},
			{
				quote:
					"Polecam z czystym sumieniem. Transparentna wycena, żadnych ukrytych kosztów. Kierownik budowy był dostępny praktycznie całą dobę. Dom oddany 2 tygodnie przed terminem!",
				author: {
					image: {
						src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100",
						alt: "Anna Nowak",
					},
					name: "Anna Nowak",
					role: "Właścicielka domu, Gliwice",
				},
				rating: 4.9,
			},
			{
				quote:
					"Trzecia budowa w życiu i pierwsza bez stresu. CoreLTB to profesjonaliści, którzy wiedzą co robią. Szczególnie doceniam ich doświadczenie w budownictwie na szkodach górniczych.",
				author: {
					image: {
						src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
						alt: "Piotr Zieliński",
					},
					name: "Piotr Zieliński",
					role: "Inwestor, Jaworzno",
				},
				rating: 4.8,
			},
			{
				quote:
					"Od projektu po wykończenie pod klucz - wszystko w jednym miejscu. Oszczędziłem mnóstwo czasu i nerwów. Efekt końcowy przerósł moje oczekiwania.",
				author: {
					image: {
						src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100",
						alt: "Marek Wójcik",
					},
					name: "Marek Wójcik",
					role: "Właściciel domu, Mikołów",
				},
				rating: 5.0,
			},
		],
	};

	// CTA Section Data
	const ctaData = {
		contactInfo: {
			phone: companyData.telephone,
			email: companyData.email,
		},
		socials: [
			{ platform: "facebook" as const, href: "https://facebook.com" },
			{ platform: "instagram" as const, href: "https://instagram.com" },
			{ platform: "linkedin" as const, href: "https://linkedin.com" },
		],
	};

	// Blog Section Data - najnowsze 3 posty z bloga
	const latestPosts = [...blogPosts]
		.sort((a, b) => b.dateTimestamp - a.dateTimestamp)
		.slice(0, 3);

	const blogData = {
		header: {
			label: "ARTYKUŁY I BLOG",
			title: "Najnowsze wiadomości i aktualności",
			theme: "light" as const,
		},
		posts: latestPosts,
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
			<ContactCTASection {...ctaData} />
			<BlogSection {...blogData} />
			{/* <PartnersSection {...partnersData} /> */}
		</main>
	);
}
