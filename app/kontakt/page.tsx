import type { Metadata } from "next";
import { ContactHeroSection } from "@/components/sections";
import { PageHeader } from "@/components/shared";

export const metadata: Metadata = {
	title: "Kontakt - CoreLTB Builders",
	description:
		"Skontaktuj się z nami. Umów bezpłatną konsultację i otrzymaj rzetelną wycenę swojego przyszłego domu.",
};

export default function ContactPage() {
	const pageHeaderData = {
		title: "Kontakt",
		watermarkText: "KONTAKT",
		backgroundImage: "/images/uslugi.webp",
		breadcrumbs: [
			{ label: "Strona Główna", href: "/" },
			{ label: "Kontakt", href: "/kontakt" },
		],
	};

	const contactHeroData = {
		header: {
			label: "SKONTAKTUJ SIĘ Z NAMI",
			title: "Bezpłatna konsultacja i rzetelna wycena Twojego przyszłego domu",
			description:
				"Nie wiesz, od czego zacząć? Skontaktuj się z nami – przeanalizujemy Twoje potrzeby, doradzimy najlepsze rozwiązania i przygotujemy przejrzystą wycenę. Bez zobowiązań, ale z realnym planem działania.",
			align: "center" as const,
			theme: "light" as const,
		},
		benefits: [
			{
				icon: "users" as const,
				text: "Indywidualna konsultacja – wspólnie omówimy Twoje oczekiwania i możliwości",
			},
			{
				icon: "clipboard" as const,
				text: "Rzetelna wycena – konkretne koszty dostosowane do wybranego projektu",
			},
			{
				icon: "checkCircle" as const,
				text: "Krok po kroku do własnego domu – przedstawimy Ci jasny plan współpracy",
			},
		],
		contactMethods: [
			{
				icon: "mail" as const,
				title: "Napisz",
				content: "Skorzystaj z formularza lub napisz maila:",
				action: {
					text: "biuro@thebuilders.pl",
					href: "mailto:biuro@thebuilders.pl",
				},
			},
			{
				icon: "phone" as const,
				title: "Zadzwoń",
				content: "Skontaktuj telefonicznie – jesteśmy do Twojej dyspozycji",
				action: {
					text: "+48 573 568 300",
					href: "tel:+48573568300",
				},
			},
			{
				icon: "mapPin" as const,
				title: "Odwiedź nas",
				content: "Umów wizytę w naszym biurze i spotkajmy się przy kawie:",
				companyInfo: {
					name: "Coreltb Builders sp. z o.o.",
					address: "ul. Wałowa 55, 44-300 Wodzisław Śląski",
					mapUrl: "https://maps.google.com/?q=ul.+Wałowa+55,+44-300+Wodzisław+Śląski",
					mapEmbedUrl: "https://www.google.com/maps?q=ul.+Wałowa+55,+44-300+Wodzisław+Śląski&output=embed",
				},
			},
		],
	};

	return (
		<main>
			<PageHeader {...pageHeaderData} />
			<ContactHeroSection {...contactHeroData} />
		</main>
	);
}
