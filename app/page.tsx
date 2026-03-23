import type { Metadata } from "next";
import {
	AboutCompanySection,
	BlogSection,
	ContactCTASection,
	HeroSection,
	HowItWorksSection,
	ProjectsSection,
	ServiceShowcaseSection,
	TestimonialsSection,
	AreasOfOperationSection,
} from "@/components/sections";
import { PartnerLogosMarquee } from "@/components/sections/local/PartnerLogosMarquee";
import { companyData } from "@/data/company-data";
import { allProjects } from "@/data/projects";
import { allPartnerLogos } from "@/data/partners";
import { blogPosts } from "@/data/blog-data";

export const metadata: Metadata = {
	title: "Budowa Domów Pod Klucz — Śląsk i Małopolska | CoreLTB Builders",
	description:
		"Budowa domów jednorodzinnych od projektu po klucz. 15 lat doświadczenia, 150+ oddanych inwestycji, stała cena w umowie. Rybnik, Katowice, Jaworzno i cały Śląsk.",
	alternates: {
		canonical: companyData.url,
	},
};

const CURRENT_YEAR = new Date().getFullYear();

export default function Home() {
	// Hero Section Data (Money Keywords w H1)
	const heroData = {
		tagline: "BUDOWA DOMÓW • ŚLĄSK I MAŁOPOLSKA",
		title: "Kompleksowa budowa domów i inwestycje pod klucz",
		subtitle:
			"Zastępujemy chaos systemu gospodarczego inżynierskim procesem. Przejmujemy 100% logistyki: od analizy gruntu, przez stan surowy, aż po odbiór budynku w PINB.",
		images: [
			{ src: "/images/hero/slide-1.webp", alt: "Budowa domu na płycie fundamentowej Śląsk" },
			{ src: "/images/hero/slide-2.webp", alt: "Nowoczesny dom jednorodzinny realizacja Rybnik" },
			{ src: "/images/hero/slide-3.webp", alt: "Realizacja CoreLTB Builders" },
			{ src: "/images/hero/slide-4.webp", alt: "Wykończenie wnętrz pod klucz" },
		],
		mobileImages: [
			{ src: "/images/hero/slide-1-mobile.webp", alt: "Budowa domu na płycie fundamentowej Śląsk" },
			{ src: "/images/hero/slide-2-mobile.webp", alt: "Nowoczesny dom jednorodzinny realizacja Rybnik" },
			{ src: "/images/hero/slide-3-mobile.webp", alt: "Realizacja CoreLTB Builders" },
			{ src: "/images/hero/slide-4-mobile.webp", alt: "Wykończenie wnętrz pod klucz" },
		],
		primaryButton: { text: "Poznaj ofertę", href: "/oferta" },
	};

	// About Company Section Data
	const aboutData = {
		header: {
			label: "BUDOWA DOMÓW",
			title: "Dlaczego klienci wybierają CoreLTB?",
			theme: "light" as const,
		},
		content: [
			"Jesteśmy firmą inżynierską z **podwójnym zapleczem logistycznym** – nasze bazy w Jaworznie i Wodzisławiu Śląskim pozwalają nam obsługiwać cały region bez pustych przebiegów i dopłat za dojazd.",
			"Od 15 lat rozwiązujemy **trudne problemy Południa**: szkody górnicze, gliny i tereny o dużych spadkach. Nie sprzedajemy marzeń – dostarczamy bezpieczny budynek, oparty na harmonogramie rzeczowo-finansowym i umowie z gwarancją stałej ceny.",
		],
		image: {
			src: "/images/about-home.webp",
			alt: "Kierownik budowy CoreLTB na inwestycji w Katowicach",
		},
		stats: {
			stats: [
				{
					value: "150+",
					label: "Oddanych Inwestycji (Stan Deweloperski / Pod Klucz)",
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

	// Services Section Data
	const servicesData = {
		header: {
			label: "ZAKRES KOMPETENCJI",
			title: "Budowa domów od projektu po klucz",
			theme: "light" as const,
		},
		services: [
			{
				iconName: "home" as const,
				title: "Kompleksowa budowa domów",
				description:
					"Budowa domów (SSO / Deweloperka) w reżimie WT2026. Płyty fundamentowe, systemowe dylatacje, materiał z hurtowni w cenie.",
				image: "/images/uslugi/kompleksowa-budowa-domow/timeline/odbior-gwarancja.webp",
				href: "/oferta/kompleksowa-budowa-domow",
			},
			{
				iconName: "draftingCompass" as const,
				title: "Biuro projektowe",
				description:
					"Projekty domów pod Twój budżet wykonawczy. Adaptacja do trudnych gruntów i optymalizacja kosztów stali (Value Engineering).",
				image: "/images/uslugi/showcase/projektowanie.webp",
				href: "/oferta/projektowanie",
			},
			{
				iconName: "hardHat" as const,
				title: "Nadzór inwestorski",
				description:
					"Twój inżynier na budowie. Kierownicy z uprawnieniami, niezależny nadzór i odbiory mieszkań od dewelopera na Śląsku.",
				image: "/images/uslugi/showcase/nadzor.webp",
				href: "/oferta/nadzor-i-doradztwo",
			},
			{
				iconName: "mapPin" as const,
				title: "Geologia i geodezja",
				description:
					"Twarde dane przed zakupem działki. Odwierty geotechniczne, badanie nośności gruntu, mapy do celów projektowych (MDCP).",
				image: "/images/uslugi/uslugi-techniczne/etapy/geodezja.webp",
				href: "/oferta/uslugi-techniczne",
			},
			{
				iconName: "paintBrush" as const,
				title: "Wykończenia wnętrz",
				description:
					"Prace 'pod klucz' z preferencyjnym 8% VAT na materiały. Jedna ekipa, jeden harmonogram i odpowiedzialność za cały proces.",
				image: "/images/uslugi/wykonczenia-i-aranzacje/etapy/aranzacja.webp",
				href: "/oferta/wykonczenia-i-aranzacje",
			},
			{
				iconName: "tree" as const,
				title: "Zagospodarowanie terenu",
				description:
					"Odwodnienie liniowe, podbudowy pod ciężki sprzęt, brukarstwo i ogrodzenia. Finalizujemy inwestycję z dbałością o spadki terenu.",
				image: "/images/uslugi/kompleksowa-budowa-domow/timeline/zagospodarowanie-terenu.webp",
				href: "/oferta/zagospodarowanie-terenu",
			},
		],
	};

	// How It Works Section Data
	const howItWorksData = {
		header: {
			label: "PROCES BUDOWLANY",
			title: "Od audytu działki po odbiór budynku",
			theme: "light" as const,
		},
		steps: [
			{
				number: 1,
				iconName: "check" as const,
				title: "Audyt działki i budżetowanie",
				description:
					`Weryfikujemy to, czego nie widać. Sprawdzamy MPZP, warunki gruntowe i dostępność mediów. Otrzymujesz **wstępny kosztorys inwestorski**, aby zderzyć Twoje oczekiwania z realiami cenowymi ${CURRENT_YEAR} r.`,
			},
			{
				number: 2,
				iconName: "fileCheck" as const,
				title: "Projekt i formalności (PnB)",
				description:
					"Działamy jako Twój pełnomocnik. Uzyskujemy Pozwolenie na Budowę i wykonujemy adaptację konstrukcyjną projektu do szkód górniczych. Optymalizujemy ilość stali, oszczędzając Twoje pieniądze.",
			},
			{
				number: 3,
				iconName: "building" as const,
				title: "Realizacja i odbiory techniczne",
				description:
					"Budujemy zgodnie z reżimem technologicznym. Każdy etap – od płyty fundamentowej po więźbę – podlega podwójnej kontroli jakościowej i zostaje wpisany do Elektronicznego Dziennika Budowy (EDB).",
			},
		],
		video: {
			placeholderImage: "/images/howitworks.webp",
			videoUrl: "",
		},
	};

	// Dane do sekcji: Obszar Działania (Mapa/Bento Grid)
	const areasData = {
		header: {
			label: "ZASIĘG LOGISTYCZNY",
			title: "Budujemy bez kosztów dojazdu",
			description: "Dwie bazy sprzętowe pozwalają nam obsłużyć kluczowe inwestycje w pasie Polski Południowej.",
		},
		hubs: [
			{
				name: "HUB ROW (Baza Wodzisław)",
				cities: [
					{ label: "Wodzisław Śląski", href: "/obszar-dzialania/wodzislaw-slaski" },
					{ label: "Rybnik", href: "/obszar-dzialania/rybnik" },
					{ label: "Żory", href: "/obszar-dzialania/zory" },
					{ label: "Jastrzębie-Zdrój", href: "/obszar-dzialania/jastrzebie-zdroj" },
					{ label: "Racibórz", href: "/obszar-dzialania/raciborz" },
				],
			},
			{
				name: "HUB AGLOMERACJA (Baza Jaworzno)",
				cities: [
					{ label: "Jaworzno (HQ)", href: "/obszar-dzialania/jaworzno" },
					{ label: "Katowice", href: "/obszar-dzialania/katowice" },
					{ label: "Gliwice", href: "/obszar-dzialania/gliwice" },
					{ label: "Tychy", href: "/obszar-dzialania/tychy" },
					{ label: "Mikołów", href: "/obszar-dzialania/mikolow" },
					{ label: "Zabrze", href: "/obszar-dzialania/zabrze" },
				],
			},
			{
				name: "HUB MAŁOPOLSKA",
				cities: [
					{ label: "Chrzanów", href: "/obszar-dzialania/chrzanow" },
					{ label: "Kraków", href: "/obszar-dzialania/krakow" },
					{ label: "Oświęcim", href: "/obszar-dzialania/oswiecim" },
					{ label: "Olkusz", href: "/obszar-dzialania/olkusz" },
				],
			},
			{
				name: "HUB OPOLSKIE",
				cities: [
					{ label: "Opole", href: "/obszar-dzialania/opole" },
					{ label: "Kędzierzyn-Koźle", href: "/obszar-dzialania/kedzierzyn-kozle" },
				],
			},
		],
	};

	// Projects Section Data
	const projectsData = {
		header: {
			label: "REALIZACJE",
			title: "Nasze budowy na Śląsku i w Małopolsce",
			theme: "light" as const,
		},
		projects: allProjects.slice(0, 8).map((project) => ({
			slug: project.slug,
			alt: project.alt,
			title: project.title,
			price: project.price,
			surfaceArea: project.surfaceArea,
			technology: project.technology,
			source: project.source,
		})),
	};

	// Testimonials Section Data
	const testimonialsData = {
		header: {
			label: "REFERENCJE",
			title: "Co mówią Inwestorzy z regionu?",
			theme: "light" as const,
		},
		testimonials: [
			{
				quote:
					"Baliśmy się budowy na grząskim gruncie. CoreLTB sprawdziło działkę, zaprojektowało zbrojoną płytę fundamentową i zagwarantowało cenę w umowie. Zero stresu, czysta inżynieria i terminowość.",
				author: {
					image: { src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100", alt: "Katarzyna W." },
					name: "Katarzyna W.",
					role: "Inwestycja: Rybnik-Boguszowice",
				},
				rating: 5.0,
			},
			{
				quote:
					"Szukaliśmy Generalnego Wykonawcy, a nie 'zbieraniny' ekip z ogłoszenia. Rewelacyjna logistyka, dostawy betonu na czas i kierownik budowy zawsze pod telefonem. Dom oddany do stanu deweloperskiego w 8 miesięcy.",
				author: {
					image: { src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100", alt: "Michał L." },
					name: "Michał Lewandowski",
					role: "Inwestycja: Katowice-Podlesie",
				},
				rating: 5.0,
			},
			{
				quote:
					"Budowa na terenie szkód górniczych III kategorii. Inne firmy proponowały astronomiczne kwoty. CoreLTB zoptymalizowało stal w projekcie, dając 5 lat rękojmi. Mamy bezpieczny dom i zaoszczędzone pieniądze.",
				author: {
					image: { src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100", alt: "Tomasz K." },
					name: "Tomasz Kowalczyk",
					role: "Inwestycja: Jastrzębie-Zdrój",
				},
				rating: 5.0,
			},
			{
				quote:
					"Polecam z czystym sumieniem umowę ryczałtową. Zapłaciliśmy dokładnie tyle, ile było w kosztorysie na początku roku, mimo że ceny styropianu na rynku wzrosły. Profesjonalne, uczciwe podejście.",
				author: {
					image: { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100", alt: "Anna N." },
					name: "Anna Nowak",
					role: "Inwestycja: Gliwice",
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
		primaryButton: { text: "Wyceń Budowę", href: "/wycena" },
		socials: [
			{ platform: "facebook" as const, href: "https://facebook.com" },
			{ platform: "instagram" as const, href: "https://instagram.com" },
			{ platform: "linkedin" as const, href: "https://linkedin.com" },
		],
	};

	const latestPosts = [...blogPosts]
		.sort((a, b) => b.dateTimestamp - a.dateTimestamp)
		.slice(0, 3);

	const blogData = {
		header: {
			label: "BAZA WIEDZY INWESTORA",
			title: "Technologia i koszty bez tajemnic",
			theme: "light" as const,
		},
		posts: latestPosts,
	};

	return (
		<main>
			<HeroSection {...heroData} />
			<AboutCompanySection {...aboutData} />
			<ServiceShowcaseSection {...servicesData} />
			<AreasOfOperationSection {...areasData} />
			<HowItWorksSection {...howItWorksData} />
			<ProjectsSection {...projectsData} />
			<TestimonialsSection {...testimonialsData} />
			<PartnerLogosMarquee
				label="Wspolpracujemy z najlepszymi"
				logos={allPartnerLogos}
			/>
			<ContactCTASection {...ctaData} />
			<BlogSection {...blogData} />
		</main>
	);
}
