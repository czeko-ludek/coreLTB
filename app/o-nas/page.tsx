import type { Metadata } from "next";
import {
	AboutIntroSection,
	BusinessResponsibilitySection,
	CompetenciesSection,
} from "@/components/sections";
import { PageHeader, Breadcrumbs } from "@/components/shared";

export const metadata: Metadata = {
	title: "O firmie - Generalny Wykonawca Śląsk i Małopolska | CoreLTB",
	description:
		"Poznaj inżynierów stojących za marką CoreLTB. 15 lat doświadczenia w budownictwie na Śląsku i w Małopolsce, własne zaplecze sprzętowe i transparentny model Design & Build.",
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
		title: "CoreLTB Builders to firma",
		titleHighlight: "Projektowo-Budowlana",
		description: [
			"CoreLTB Builders to generalny wykonawca wywodzący się z serca Śląska i Małopolski. Działamy w modelu 'Design & Build', obsługując inwestycje indywidualne premium. Pod obecnym szyldem spółki połączyliśmy 15-letnie, osobiste doświadczenie naszych inżynierów i kierowników budów z zapleczem dużej organizacji.",
			"Nie jesteśmy anonimowym tworem. Posiadamy realne bazy sprzętowe w Jaworznie i Wodzisławiu Śląskim, co pozwala nam kontrolować logistykę na całym Południu. Nie sprzedajemy marzeń o domu – dostarczamy bezpieczny, terminowo zrealizowany budynek oparty na solidnej umowie ryczałtowej.",
		],
		image: {
			src: "/images/logo.webp",
			alt: "Logo CoreLTB Builders",
		},
		philosophyCards: [
			{
				number: 1,
				title: "15 lat na trudnym gruncie",
				description:
					"Nasi eksperci specjalizują się w geologii Śląska i Małopolski. Wiemy, jak budować bezpiecznie na glinach i terenach górniczych (kat. I-IV).",
			},
			{
				number: 2,
				title: "Inżynieria kosztów",
				description:
					"Zamiast wróżenia z fusów, opieramy się na Harmonogramie Rzeczowo-Finansowym. Gwarantujemy stałość ceny w umowie przed wbiciem łopaty.",
			},
			{
				number: 3,
				title: "Jeden partner do rozliczeń",
				description:
					"Zastępujemy chaotyczny 'system gospodarczy'. Masz jedną umowę, jeden numer do kierownika kontraktu i pełną rękojmię na cały budynek.",
			},
		],
	};

	const competenciesData = {
		label: "NASZE KOMPETENCJE",
		title: "Czym się",
		titleHighlight: "wyróżniamy?",
		competencies: [
			{
				icon: "building" as const,
				title: "Generalne wykonawstwo",
				description:
					"Zastępujemy inwestora w procesie budowlanym. Przejmujemy ryzyko kontraktowe, logistykę materiałową oraz koordynację wszystkich branż (od ziemnych po instalacyjne).",
			},
			{
				icon: "hammer" as const,
				title: "Technologia i konstrukcja",
				description:
					"Nie oszczędzamy na 'stanach zerowych'. Projektujemy i wykonujemy wzmocnione płyty fundamentowe oraz żelbety, które zabezpieczają budynek przed szkodami górniczymi.",
			},
			{
				icon: "users" as const,
				title: "Własne zasoby wykonawcze",
				description:
					"Nie polegamy na przypadkowych podwykonawcach z ogłoszenia. Dysponujemy stałymi, zweryfikowanymi brygadami oraz własnym zapleczem szalunkowym.",
			},
			{
				icon: "shieldCheck" as const,
				title: "Bezpieczeństwo formalne",
				description:
					"Jako Twój pełnomocnik, procesujemy Pozwolenie na Budowę, uzgodnienia z gestorami mediów oraz finalny odbiór w PINB (prowadząc m.in. Elektroniczny Dziennik Budowy).",
			},
		],
	};

	const businessResponsibilityData = {
		header: {
			label: "WARTOŚCI CORE LTB",
			title: "Filary naszych działań",
			description: "W branży o trudnej reputacji, my stawiamy na twarde zasady biznesowe.",
			align: "center" as const,
			theme: "light" as const,
		},
		cards: [
			{
				icon: "briefcase" as const,
				title: "Transparentność finansowa",
				description:
					"W budownictwie płynność to podstawa. Jesteśmy rzetelnym płatnikiem wobec dostawców i pracowników. Dajemy Inwestorowi wgląd w koszty, nie stosując 'gwiazdek' w umowach.",
			},
			{
				icon: "leaf" as const,
				title: "Czysta budowa",
				description:
					"Segregujemy odpady budowlane zgodnie z systemem BDO. Promujemy energooszczędny standard WT2021. Dbamy o porządek na placu, szanując Twoich przyszłych sąsiadów.",
			},
			{
				icon: "mapPin" as const,
				title: "Patriotyzm gospodarczy",
				description:
					"Budujemy na Południu i tu zostawiamy kapitał. Współpracujemy z lokalnymi betoniarniami i składami z Jaworzna, Rybnika, Gliwic czy Chrzanowa, wspierając rozwój całego regionu Śląska i Małopolski.",
			},
			{
				icon: "shieldCheck" as const,
				title: "Etyka inżynierska",
				description:
					"Nigdy nie rekomendujemy technologii niebezpiecznych tylko po to, by 'wygrać ceną'. Jeśli grunt wymaga drogiej płyty fundamentowej lub wymiany – mówimy o tym otwarcie przed podpisaniem umowy.",
			},
		],
	};

	return (
		<main>
			{/* Breadcrumbs — nad hero */}
			<Breadcrumbs
				items={[
					{ label: "Strona główna", href: "/" },
					{ label: "O nas" },
				]}
				className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
			/>

			<PageHeader {...pageHeaderData} />
			<AboutIntroSection {...aboutIntroData} />
			<CompetenciesSection {...competenciesData} />
			<BusinessResponsibilitySection {...businessResponsibilityData} />
		</main>
	);
}
