import type { Metadata } from "next";
import React from "react";
import { CtaSection } from "@/components/sections/CtaSection";
import { PhilosophyTimelineSection } from "@/components/sections/PhilosophyTimelineSection";
import {
	PageHeader,
	SectionHeader,
	ServiceCardSimple,
	AnimatedSection,
} from "@/components/shared";
import { AnimatedServiceGrid } from "@/components/shared/AnimatedServiceGrid";

export const metadata: Metadata = {
	title: "Nasza oferta - CoreLTB Builders",
	description:
		"Poznaj pełną ofertę usług CoreLTB Builders: budowa domów, projektowanie, nadzór budowlany, usługi techniczne i wykończenia wnętrz.",
};

export default function OfferPage() {
	const offerData = [
		{
			image:
				"https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800",
			title: "Generalne Wykonawstwo Domów (SSO / Deweloperski / Pod Klucz)",
			description:
				"Cały proces na Twojej głowie? Przejmujemy 100% logistyki. Stała cena, harmonogram i nadzór inżynierski.",
			features: [
				"Indywidualne projekty architektoniczne",
				"Gwarancja jakości i terminowości",
			],
			href: "/oferta/kompleksowa-budowa-domow",
		},
		{
			image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800",
			title: "Projektowanie i Adaptacje",
			description:
				"Projekty indywidualne szyte na miarę oraz adaptacje gotowych projektów do specyfiki działek na szkodach górniczych.",
			features: ["Wizualizacje 3D", "Pełna dokumentacja techniczna"],
			href: "/oferta/projektowanie",
		},
		{
			image:
				"https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
			title: "Nadzór Inwestorski",
			description:
				"Twój człowiek na budowie. Niezależna kontrola jakości prac, odbiory mieszkań od dewelopera i weryfikacja umów.",
			features: ["Kontrola budżetu i harmonogramu", "Odbiory techniczne"],
			href: "/oferta/nadzor-i-doradztwo",
		},
		{
			image:
				"https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800",
			title: "Usługi Techniczne: Geologia, Geodezja, Kosztorys",
			description:
				"Niezbędne przed startem. Wiercenia geologiczne, mapy do celów projektowych i analizy chłonności gruntu.",
			features: [
				"Badania geologiczne i geotechniczne",
				"Pomiary geodezyjne i kosztorysy",
			],
			href: "/oferta/uslugi-techniczne",
		},
		{
			image:
				"https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800",
			title: "Wykończenia i aranżacje",
			description:
				"Precyzyjne prace wykończeniowe i stylowe aranżacje wnętrz, które nadadzą Twojemu domowi unikalny charakter.",
			features: ["Najwyższej jakości materiały", "Dbałość o każdy detal"],
			href: "/oferta/wykonczenia-i-aranzacje",
		},
		{
			image:
				"https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
			title: "Zagospodarowanie terenu",
			description:
				"Przekształcamy przestrzeń wokół budynków w funkcjonalne i estetyczne otoczenie, realizując ogrody, drogi i ogrodzenia.",
			features: [
				"Projektowanie ogrodów i otoczenia",
				"Budowa dróg dojazdowych i ogrodzeń",
			],
			href: "/oferta/zagospodarowanie-terenu",
		},
	];

	return (
		<main>
			{/* 1. Page Header - Hero z obrazem */}
			<PageHeader
				title="Nasza oferta"
				watermarkText="OFERTA"
				backgroundImage="/images/uslugi.webp"
				breadcrumbs={[
					{ label: "Strona Główna", href: "/" },
					{ label: "Nasza Oferta", href: "/oferta" },
				]}
			/>

			{/* 2. SectionHeader - Krótki intro (40 słów, 5-8 sekund czytania) */}
			<AnimatedSection as="div" className="py-12 px-4 bg-background" delay={0.1}>
				<div className="container mx-auto max-w-4xl">
					<SectionHeader
						label="KOMPLEKSOWE USŁUGI BUDOWLANE"
						title="Generalne wykonawstwo i usługi inżynierskie – południe Polski"
						description="Od analizy działki w Rybniku po odbiór kluczy w Krakowie. Skalujemy proces budowlany, dostarczając kompletny pakiet usług pod jednym dachem: projekt, budowa, nadzór, wnętrza."
						align="center"
						theme="light"
					/>
				</div>
			</AnimatedSection>

			{/* 3. GRID USŁUG - Najważniejsze! User chce zobaczyć opcje NATYCHMIAST */}
			<section className="py-16 px-4 bg-background">
				<div className="container mx-auto">
					<AnimatedServiceGrid items={offerData} />
				</div>
			</section>

			{/* 4. PhilosophyTimeline - Trust building (dla users którzy scrollują dalej) */}
			<PhilosophyTimelineSection
				header={{
					label: "DLACZEGO JEDEN PARTNER?",
					title: "Jeden telefon zamiast dziesięciu podwykonawców",
					description:
						"Koordynacja wielu firm to największy stres w budownictwie. My bierzemy to na siebie – oszczędzając Twój czas, pieniądze i nerwy.",
					theme: "light",
				}}
				items={[
					{
						number: 1,
						iconName: "shield",
						title: "Jedna umowa = jedna odpowiedzialność",
						description:
							"Nie musisz koordynować 10 różnych firm. Nie musisz rozstrzygać sporów między architektem, wykonawcą i geodetą. My odpowiadamy za wszystko – od pierwszej linii projektu po odbiór końcowy. Jeśli coś pójdzie nie tak, nie szukasz winnego – dzwonisz do nas.",
					},
					{
						number: 2,
						iconName: "trendingUp",
						title: "Lepsza cena niż 6 osobnych umów",
						description:
							'Gdy kupujesz usługi osobno, każda firma ma swoją marżę. Gdy kupujesz pakiet, eliminujesz wielokrotne marże i koszty koordynacji. Typowa oszczędność: 15-20% całkowitego budżetu budowy. Dzięki naszym rabatom w hurtowniach budowlanych na Śląsku, materiał kupujesz taniej niż w markecie. To często oznacza różnicę między „musimy zrezygnować z tarasu" a „mieścimy się w budżecie z zapasem".',
					},
					{
						number: 3,
						iconName: "clock",
						title: "Szybsza realizacja (brak przestojów)",
						description:
							'500+ zrealizowanych projektów nauczyło nas, że największe opóźnienia powstają na styku różnych firm. Likwidacja dziur w harmonogramie." – Nasze ekipy wchodzą jedna po drugiej. Gdy hydraulik kończy, tynkarz wchodzi następnego dnia. Skracamy czas budowy średnio o 3 miesiące względem systemu gospodarczego.',
					},
				]}
				image={{
					src: "/images/uslugi.webp",
					alt: "Zespół CoreLTB Builders podczas spotkania projektowego",
				}}
			/>

			{/* 5. CTA Section - Final push dla undecided users */}
			<CtaSection
				title="Nie wiesz od czego zacząć?"
				email="coreltb@gmail.com"
				primaryButton={{
					text: "Umów konsultację",
					href: "/kontakt",
				}}
				socials={[
					{ platform: "facebook" as const, href: "https://facebook.com" },
					{ platform: "instagram" as const, href: "https://instagram.com" },
					{ platform: "linkedin" as const, href: "https://linkedin.com" },
					{ platform: "youtube" as const, href: "https://youtube.com" },
				]}
			/>
		</main>
	);
}
