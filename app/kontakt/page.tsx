import type { Metadata } from "next";
import { BentoContactSection, ContactInfo } from "@/components/sections";
import { Breadcrumbs } from "@/components/shared";

export const metadata: Metadata = {
	title: "Kontakt - CoreLTB Builders",
	description:
		"Skontaktuj się z nami. Umów bezpłatną konsultację i otrzymaj rzetelną wycenę swojego przyszłego domu.",
};

export default function ContactPage() {
	const contactInfo: ContactInfo = {
		phone: "+48 573 568 300",
		email: "biuro@thebuilders.pl",
		address: "ul. Wałowa 55, 44-300 Wodzisław Śląski",
	};

	return (
		<main>
			<Breadcrumbs
				items={[
					{ label: "Strona główna", href: "/" },
					{ label: "Kontakt" },
				]}
				className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8"
			/>
			<BentoContactSection contactInfo={contactInfo} />
		</main>
	);
}
