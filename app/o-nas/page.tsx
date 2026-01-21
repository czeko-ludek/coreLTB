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
		titleHighlight: "firma inżynieryjna",
		description: [
			"CoreLTB to firma inżynieryjna wywodząca się z serca Śląska i Małopolski. Działamy w modelu 'Design & Build' oraz jako Generalny Wykonawca inwestycji indywidualnych. Od 2005 roku łączymy rzemieślniczą dokładność firmy rodzinnej ze skalą i procedurami dużej organizacji.",
			"Nie jesteśmy anonimową spółką. Nasze bazy w Jaworznie i Wodzisławiu Śląskim pozwalają nam operacyjnie pokryć cały pas Polski Południowej. Dla Inwestora oznaczamy koniec z chaosem 'systemu gospodarczego'. Wnosimy na budowę domów jednorodzinnych standardy znane z inwestycji komercyjnych: nadzór kierownika kontraktu, transparentne harmonogramy i żelazną dyscyplinę budżetową.",
		],
		philosophyCards: [
			{
				number: 1,
				title: "15 lat na trudnym gruncie",
				description:
					"Specjalizujemy się w geologii Śląska i Małopolski. Wiemy, jak budować bezpiecznie na glinach i terenach górniczych.",
			},
			{
				number: 2,
				title: "Inżynieria kosztów",
				description:
					"Zamiast wróżenia z fusów, opieramy się na precyzyjnych kosztorysach opartych na rzeczywistych cenach materiałów i robocizny z regionu.",
			},
			{
				number: 3,
				title: "Jeden partner do rozliczeń",
				description:
					"Zastępujemy chaotyczny 'system gospodarczy'. Masz jedną umowę, jeden numer telefonu i jedną osobę odpowiedzialną za budowę.",
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
					"Zastępujemy inwestora w procesie budowlanym. Przejmujemy ryzyko kontraktowe, logistykę materiałową oraz koordynację wszystkich branż (od ziemnych po instalacyjne). Masz jedną umowę i jednego partnera do rozliczeń.",
			},
			{
				icon: "hammer" as const,
				title: "Technologia i konstrukcja",
				description:
					"Nie oszczędzamy na 'stanach zerowych'. Projektujemy i wykonujemy wzmocnione płyty fundamentowe oraz żelbety, które zabezpieczają budynek przed szkodami górniczymi do IV kategorii włącznie.",
			},
			{
				icon: "users" as const,
				title: "Własne zasoby wykonawcze",
				description:
					"Nie polegamy na przypadkowych podwykonawcach z ogłoszenia. Dysponujemy stałymi, zweryfikowanymi brygadami oraz własnym zapleczem szalunkowym, co uniezależnia nas od braków na rynku usług.",
			},
			{
				icon: "shieldCheck" as const,
				title: "Bezpieczeństwo formalne",
				description:
					"Jako Twój pełnomocnik, procesujemy Pozwolenie na Budowę, uzgodnienia z gestorami mediów oraz finalny odbiór techniczny. Eliminujemy dla Ciebie ryzyko administracyjne i prawne.",
			},
		],
	};

	const businessResponsibilityData = {
		header: {
			label: "ODPOWIEDZIALNOŚĆ BIZNESU",
			title: "Filary naszych działań",
			description: "",
			align: "center" as const,
			theme: "light" as const,
		},
		cards: [
			{
				icon: "briefcase" as const,
				title: "Transparentność finansowa",
				description:
					"W budownictwie płynność to podstawa. Jesteśmy rzetelnym płatnikiem wobec dostawców i pracowników. Dajemy Inwestorowi pełny wgląd w koszty. Nie stosujemy 'gwiazdek' w umowach ani ukrytych dopłat w trakcie realizacji.",
			},
			{
				icon: "leaf" as const,
				title: "Czysta budowa i ekologia",
				description:
					"Segregujemy odpady budowlane zgodnie z BDO. Stosujemy materiały o niskim śladzie węglowym i promujemy standard energooszczędny WT2021. Dbamy o porządek na placu, szanując Twoich przyszłych sąsiadów.",
			},
			{
				icon: "mapPin" as const,
				title: "Lokalny patriotyzm gospodarczy",
				description:
					"Budujemy na Południu i tu zostawiamy podatki. Współpracujemy z lokalnymi betoniarniami, składami i rzemieślnikami z Jaworzna, Rybnika czy Gliwic, wspierając rozwój regionu, w którym żyjemy.",
			},
			{
				icon: "shieldCheck" as const,
				title: "Etyczne działania",
				description:
					"Działamy etycznie. W firmie i relacjach biznesowych nie tolerujemy korupcji, nieuczciwości oraz nieetycznych działań. Budujemy długoterminowe relacje oparte na zaufaniu.",
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
