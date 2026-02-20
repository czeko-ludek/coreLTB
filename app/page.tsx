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

const CURRENT_YEAR = new Date().getFullYear();

export default function Home() {
	// Hero Section Data (Money Keywords w H1)
	const heroData = {
		tagline: "GENERALNY WYKONAWCA • ŚLĄSK I MAŁOPOLSKA",
		title: "Kompleksowa budowa domów i inwestycje pod klucz",
		subtitle:
			"Zastępujemy chaos systemu gospodarczego inżynierskim procesem. Przejmujemy 100% logistyki: od analizy gruntu, przez stan surowy, aż po odbiór budynku.",
		images: [
			{ src: "/images/hero/slide-1.webp", alt: "Budowa domu na płycie fundamentowej Śląsk" },
			{ src: "/images/hero/slide-2.webp", alt: "Nowoczesny dom jednorodzinny realizacja Rybnik" },
			{ src: "/images/hero/slide-3.webp", alt: "Realizacja CoreLTB Builders" },
			{ src: "/images/hero/slide-4.webp", alt: "Wykończenie wnętrz pod klucz" },
		],
		primaryButton: { text: "Poznaj ofertę", href: "/oferta" },
	};

	// About Company Section Data (korekta SEO w ALT + twarde liczby)
	const aboutData = {
		header: {
			label: "GENERALNE WYKONAWSTWO",
			title: "Dlaczego inżynierowie wybierają CoreLTB?",
			theme: "light" as const,
		},
		content: [
			"Jesteśmy firmą inżynierską z **podwójnym zapleczem** – bazy w Jaworznie i Wodzisławiu Śląskim. Działamy w skali Generalnego Wykonawcy, eliminując ryzyka systemu gospodarczego.",
			"Od 15 lat rozwiązujemy **trudne tematy Południa**: szkody górnicze, gliny i tereny zalewowe. Nie sprzedajemy obietnic – dostarczamy bezpieczny budynek, oparty na harmonogramie rzeczowo-finansowym i umowie z gwarancją ceny.",
		],
		image: {
			src: "/images/about-home.webp",
			alt: "Zespół inżynierów CoreLTB na budowie w Katowicach",
		},
		stats: {
			stats: [
				{
					value: "150+",
					label: "Oddanych Inwestycji (Budynki)",
					variant: "dark" as const,
				},
				{
					value: "15 LAT",
					label: "Doświadczenia w nadzorze i wykonawstwie",
					variant: "primary" as const,
				},
			],
		},
		ctaButton: { text: "Poznaj nasz zespół", href: "/o-nas" },
	};

	// Services Section Data (Money Keywords Injection)
	const servicesData = {
		header: {
			label: "ZAKRES KOMPETENCJI",
			title: "Model \"Zaprojektuj i wybuduj\"",
			theme: "light" as const,
		},
		services: [
			{
				iconName: "home" as const,
				title: "Kompleksowa budowa domów",
				description:
					"Generalne wykonawstwo (SSO / Deweloperka) w reżimie WT2026. Płyty fundamentowe, szkody górnicze, materiał w cenie.",
				image: "/images/uslugi/showcase/budowa-domow.webp",
				href: "/oferta/kompleksowa-budowa-domow",
			},
			{
				iconName: "draftingCompass" as const,
				title: "Biuro projektowe",
				description:
					"Projekty domów pod budżet wykonawczy. Adaptacja do szkód górniczych i optymalizacja kosztów stali (Value Engineering).",
				image: "/images/uslugi/showcase/projektowanie.webp",
				href: "/oferta/projektowanie",
			},
			{
				iconName: "hardHat" as const,
				title: "Nadzór i kierownik budowy",
				description:
					"Twój techniczny adwokat na budowie. Kierownicy z uprawnieniami, inspektorzy nadzoru i odbiory mieszkań od dewelopera.",
				image: "/images/uslugi/showcase/nadzor.webp",
				href: "/oferta/nadzor-i-doradztwo",
			},
			{
				iconName: "mapPin" as const,
				title: "Geologia i geodezja",
				description:
					"Diagnostyka gruntu przed zakupem. Odwierty geotechniczne, mapy do celów projektowych (MDCP) i tyczenie budynków.",
				image: "/images/uslugi/showcase/uslugi-techniczne.webp",
				href: "/oferta/uslugi-techniczne",
			},
			{
				iconName: "paintBrush" as const,
				title: "Wykończenia wnętrz",
				description:
					"Fit-out pod klucz z 8% VAT na materiały. Gładzie, płytki, podłogi. Jedna ekipa, jeden termin i czysta budowa.",
				image: "/images/uslugi/showcase/wykonczenia.webp",
				href: "/oferta/wykonczenia-i-aranzacje",
			},
			{
				iconName: "tree" as const,
				title: "Zagospodarowanie działki",
				description:
					"Brukarstwo, ogrodzenia, trawniki i oświetlenie terenu. Finalizujemy inwestycję tak, aby była gotowa do zamieszkania.",
				image: "/images/uslugi/showcase/zagospodarowanie.webp",
				href: "/oferta/zagospodarowanie-terenu",
			},
		],
	};

	// How It Works Section Data
	const howItWorksData = {
		header: {
			label: "BUDOWA DOMU KROK PO KROKU",
			title: "Od audytu działki po odbiór budynku",
			theme: "light" as const,
		},
		steps: [
			{
				number: 1,
				iconName: "check" as const,
				title: "Audyt działki i budżetowanie",
				description:
					`Zamiast "rozmów o wizji", zaczynamy od weryfikacji MPZP i warunków gruntowych (szkody górnicze). Przygotowujemy **wstępny kosztorys inwestorski**, aby zderzyć Twoje oczekiwania z realiami rynkowymi ${CURRENT_YEAR} r. przed wydaniem pieniędzy na projekt.`,
			},
			{
				number: 2,
				iconName: "fileCheck" as const,
				title: "Projekt i formalności (PnB)",
				description:
					"Przejmujemy biurokrację. Na podstawie pełnomocnictwa uzyskujemy Pozwolenie na Budowę i wykonujemy adaptację projektu do Twojej działki. Optymalizujemy konstrukcję, zamieniając przewymiarowane rozwiązania na ekonomiczne technologie systemowe.",
			},
			{
				number: 3,
				iconName: "building" as const,
				title: "Realizacja i odbiory techniczne",
				description:
					"Budujemy własnymi brygadami pod nadzorem Inżyniera Kontraktu. Płyty fundamentowe, stropy monolityczne, więźba — każdy etap kończy się odbiorem technicznym i dokumentacją fotograficzną w dzienniku budowy.",
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
			label: "PROJEKTY DOMÓW JEDNORODZINNYCH",
			title: "Budowa domów pod klucz — realizacje na Śląsku i w Małopolsce",
			theme: "light" as const,
		},
		projects: allProjects.slice(0, 8).map((project, index) => ({
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
			label: "OPINIE KLIENTÓW",
			title: "Zaufali nam inwestorzy z całego Śląska",
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
			label: "BAZA WIEDZY",
			title: "Poradniki budowlane i analizy kosztów",
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
