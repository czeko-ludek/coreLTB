import type { Metadata } from "next";
import {
	AboutIntroSection,
	BusinessResponsibilitySection,
	CompetenciesSection,
} from "@/components/sections";
import { PageHeader } from "@/components/shared";

export const metadata: Metadata = {
	title: "O nas - CoreLTB Builders",
	description:
		"Poznaj naszą firmę, filozofię i kompetencje. CoreLTB Builders - profesjonalne usługi budowlane.",
};

export default function AboutPage() {
	const pageHeaderData = {
		title: "O nas",
		watermarkText: "O NAS",
		backgroundImage: "/images/o-nas-hero.webp",
		breadcrumbs: [
			{ label: "Strona Główna", href: "/" },
			{ label: "O nas", href: "/o-nas" },
		],
	};

	const aboutIntroData = {
		label: "O NAS",
		title: "CoreLTB to",
		description: [
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
			"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
		],
		philosophyCards: [
			{
				number: 1,
				title: "Fundament to zaufanie budowane latami",
				description:
					"Działamy od 2005 roku. Jako firma rodzinna traktujemy każdą budowę osobiście – Twoja wizytówka to nasza wizytówka.",
			},
			{
				number: 2,
				title: "Łączymy twarde dane z wizją",
				description:
					"Precyzyjne badania gruntu i kosztorysy minimalizują ryzyko. Realizujemy Twoją wizję nowoczesną technologią – bez niespodzianek w budżecie.",
			},
			{
				number: 3,
				title: "Zdejmujemy ciężar z twoich barków",
				description:
					"Od zakupu działki przez formalności, aż po klucze do gotowego domu. Ty marzysz, my realizujemy.",
			},
		],
	};

	const competenciesData = {
		header: {
			label: "NASZE KOMPETENCJE",
			title: "Kompetencje CoreLTB",
			description: "Czym się wyróżniamy na rynku budowlanym",
			align: "center" as const,
			theme: "light" as const,
		},
		competencies: [
			{
				icon: "building" as const,
				title: "Kompleksowa realizacja",
				description:
					"Nie jesteśmy tylko pośrednikami – budujemy. Realizujemy domy pod klucz, biorąc pełną odpowiedzialność za terminowość i jakość. Zarządzamy całym procesem: od pierwszej łopaty po montaż ostatniego gniazd­ka.",
			},
			{
				icon: "hammer" as const,
				title: "Profesjonalne wykonawstwo",
				description:
					"Nie jesteśmy tylko pośrednikami – budujemy. Realizujemy domy pod klucz, biorąc pełną odpowiedzialność za terminowość i jakość. Zarządzamy całym procesem: od pierwszej łopaty po montaż ostatniego gniazd­ka.",
			},
			{
				icon: "users" as const,
				title: "Doświadczony zespół",
				description:
					"Nie jesteśmy tylko pośrednikami – budujemy. Realizujemy domy pod klucz, biorąc pełną odpowiedzialność za terminowość i jakość. Zarządzamy całym procesem: od pierwszej łopaty po montaż ostatniego gniazd­ka.",
			},
			{
				icon: "shieldCheck" as const,
				title: "Gwarancja jakości",
				description:
					"Nie jesteśmy tylko pośrednikami – budujemy. Realizujemy domy pod klucz, biorąc pełną odpowiedzialność za terminowość i jakość. Zarządzamy całym procesem: od pierwszej łopaty po montaż ostatniego gniazd­ka.",
			},
		],
	};

	const businessResponsibilityData = {
		header: {
			label: "ODPOWIEDZIALNOŚĆ BIZNESU",
			title: "Filary naszych działań",
			description:
				"Nie jesteśmy tylko pośrednikami – budujemy. Realizujemy domy pod klucz, biorąc pełną odpowiedzialność za terminowość i jakość.",
			align: "center" as const,
			theme: "light" as const,
		},
		cards: [
			{
				icon: "users" as const,
				title: "Społeczna odpowiedzialność biznesu",
				description:
					"Promujemy społeczną odpowiedzialność biznesu. Staramy się wspierać społeczność lokalną. Dbamy o ludzi. Ne akceptujemy dyskryminacji i wykluczenia.",
			},
			{
				icon: "leaf" as const,
				title: "Ochrona środowiska",
				description:
					"Przestrzegamy zasad ekologii i ograniczamy nasz wpływ na środowisko. Promujemy zrównoważony rozwój. Stosujemy materiały oraz urządzenia o jak najmniejszym śladzie ekologicznym.",
			},
			{
				icon: "briefcase" as const,
				title: "Dobre praktyki zarządzania",
				description:
					"Przestrzegamy zasad dobrych praktyk zarządzania. Zapewniamy otwartą komunikację. Nasze działania są jawne, rzetelne i skuteczne.",
			},
			{
				icon: "shieldCheck" as const,
				title: "Etyczne działania",
				description:
					"Działamy etycznie. W firmie i relacjach biznesowych nie tolerujemy korupcji, nieuczciwości oraz nieetycznych działań.",
			},
		],
	};

	return (
		<main>
			<PageHeader {...pageHeaderData} />
			<AboutIntroSection {...aboutIntroData} />
			<CompetenciesSection {...competenciesData} />
			<BusinessResponsibilitySection {...businessResponsibilityData} />
		</main>
	);
}
