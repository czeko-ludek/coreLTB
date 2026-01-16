import type { Metadata } from "next";
import { BentoContactSection, ContactInfo } from "@/components/sections";
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

	const contactInfo: ContactInfo = {
		phone: "+48 573 568 300",
		email: "biuro@thebuilders.pl",
		address: "ul. Wałowa 55, 44-300 Wodzisław Śląski",
	};

	return (
		<main>
			<PageHeader {...pageHeaderData} />
			<BentoContactSection contactInfo={contactInfo} />
		</main>
	);
}
