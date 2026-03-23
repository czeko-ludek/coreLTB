import type { Metadata } from "next";
import React from "react";
import { ContactCTASection, BlogSection } from "@/components/sections";
import { companyData } from "@/data/company-data";
import { blogPosts } from "@/data/blog-data";
import { PhilosophyTimelineSection } from "@/components/sections/PhilosophyTimelineSection";
import {
	PageHeader,
	Breadcrumbs,
	SectionHeader,
	AnimatedSection,
} from "@/components/shared";
import { AnimatedServiceGrid } from "@/components/shared/AnimatedServiceGrid";
import { getAllServicesListingData } from "@/data/servicesV2";

export const metadata: Metadata = {
	title: "Usługi Budowlane i Projektowe — Śląsk, Małopolska | CoreLTB Builders",
	description:
		"Budowa domów pod klucz, projektowanie, nadzór inwestorski i badania geologiczne. Kompleksowa obsługa inwestycji na Śląsku i w Małopolsce. 150+ realizacji.",
	alternates: { canonical: "https://coreltb.pl/oferta" },
};

export default function OfferPage() {
	const offerData = getAllServicesListingData();

	// Pobieramy 3 najnowsze artykuły z Bazy Wiedzy (Edukacja klienta)
	const latestPosts = [...blogPosts]
		.sort((a, b) => b.dateTimestamp - a.dateTimestamp)
		.slice(0, 3);

	const blogData = {
		header: {
			label: "BAZA WIEDZY INWESTORA",
			title: "Decyzje oparte na faktach",
			theme: "light" as const,
		},
		posts: latestPosts,
	};

	return (
		<main>
			{/* Breadcrumbs — nad hero */}
			<Breadcrumbs
				items={[
					{ label: "Strona główna", href: "/" },
					{ label: "Oferta", href: "/oferta" },
				]}
				className="container mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2"
			/>

			{/* 1. Page Header - Inżynierski konkret */}
			<PageHeader
				title="Usługi Budowlane"
				watermarkText="OFERTA"
				backgroundImage="/images/uslugi.webp"
			/>

			{/* 2. Intro - Czyste i lokalne (Śląsk / Kraków / Rybnik) */}
			<AnimatedSection as="div" className="py-12 px-4 bg-background" delay={0.1}>
				<div className="container mx-auto max-w-4xl">
					<SectionHeader
						label="MODEL DESIGN & BUILD"
						title="Budowa domów i usługi inżynierskie w Polsce Południowej"
						description="Od analizy działki w Rybniku po odbiór kluczy w Krakowie. Skalujemy proces budowlany, dostarczając kompletny pakiet usług pod jednym dachem: projektowanie, wykonawstwo, nadzór oraz logistykę."
						align="center"
						theme="light"
					/>
				</div>
			</AnimatedSection>

			{/* 3. GRID USŁUG */}
			<section className="py-16 px-4 bg-background">
				<div className="container mx-auto">
					<AnimatedServiceGrid items={offerData} />
				</div>
			</section>

			{/* 4. PhilosophyTimeline - Uderzenie w system gospodarczy */}
			<PhilosophyTimelineSection
				header={{
					label: "DLACZEGO JEDEN PARTNER?",
					title: "Jeden telefon zamiast dziesięciu podwykonawców",
					description:
						"Koordynacja wielu firm to największe ryzyko w budownictwie. My bierzemy to na siebie – chroniąc Twój budżet, czas i eliminując błędy wykonawcze.",
					theme: "light",
				}}
				items={[
					{
						number: 1,
						iconName: "shieldCheck",
						title: "Jedna umowa i jedna rękojmia",
						description:
							"Nie musisz rozstrzygać sporów między architektem, murarzem i instalatorem. Bierzemy odpowiedzialność za cały proces – od pierwszej kreski w projekcie po odbiór końcowy (PINB). Jeśli coś wymaga poprawy, dzwonisz pod jeden numer.",
					},
					{
						number: 2,
						iconName: "coins",
						title: "Lepsza cena niż 6 osobnych umów",
						description:
							"Gdy kupujesz usługi osobno, każda ekipa narzuca swoją marżę. W pakiecie eliminujesz ukryte koszty koordynacji. Co więcej, dzięki naszym wypracowanym rabatom inwestycyjnym w hurtowniach na Śląsku, materiał kupujesz znacznie taniej niż w marketach budowlanych.",
					},
					{
						number: 3,
						iconName: "clock",
						title: "Brak przestojów technologicznych",
						description:
							"Ponad 150 zrealizowanych inwestycji udowodniło nam, że opóźnienia powstają zawsze na styku różnych firm. My likwidujemy 'dziury' w harmonogramie. Gdy instalator kończy, następnego dnia wchodzą tynkarze. Skracamy czas budowy do stanu deweloperskiego nawet o 3 miesiące.",
					},
				]}
				image={{
					src: "/images/uslugi/dlaczego-jeden-partner.jpeg",
					alt: "Inżynierowie CoreLTB Builders podczas koordynacji projektu budowlanego",
				}}
			/>

			{/* 5. Edukacja - Zatrzymanie klienta na stronie */}
			<BlogSection {...blogData} />

			{/* 6. CTA Section */}
			<ContactCTASection
				contactInfo={{
					phone: companyData.telephone,
					email: companyData.email,
				}}
				socials={[
					{ platform: "facebook", href: "https://facebook.com" },
					{ platform: "instagram", href: "https://instagram.com" },
					{ platform: "linkedin", href: "https://linkedin.com" },
				]}
			/>
		</main>
	);
}
