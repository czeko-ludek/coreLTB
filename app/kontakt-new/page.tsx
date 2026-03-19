import type { Metadata } from "next";
import { BentoContactSection, ContactInfo, BentoAreasSection } from "@/components/sections";
import { BentoOfferSection } from "@/components/sections";
import { BentoCTASection } from "@/components/sections/BentoCTASection";
import { PageHeader } from "@/components/shared";
import { FontWrapper } from "@/components/playground/FontWrapper";

export const metadata: Metadata = {
    title: "Kontakt (Bento) - CoreLTB Builders",
    description:
        "Skontaktuj się z nami. Umów bezpłatną konsultację i otrzymaj rzetelną wycenę swojego przyszłego domu.",
};

export default function ContactBentoPage() {
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

    const areasData = {
        header: {
            label: 'LOGISTYKA I ZASIĘG',
            title: 'Dwie Bazy Operacyjne: Jaworzno i Wodzisław',
            description: 'Dzięki strategicznemu położeniu baz przy A4 i w centrum ROW, eliminujemy koszty dojazdów w promieniu 50km.',
        },
        hubs: [
            {
                hubName: 'HUB POŁUDNIE: WODZISŁAW ŚLĄSKI',
                subLabel: 'STREFA ROW / SZKODY GÓRNICZE',
                iconName: 'mountain' as const,
                isHeadquarters: false,
                description: 'Specjalizacja: Fundamenty na trudnych gruntach gliniastych i górniczych (kat. I-IV).',
                cities: [
                    { label: 'Wodzisław Śląski', url: '/obszar-dzialania/wodzislaw-slaski' },
                    { label: 'Rybnik', url: '/obszar-dzialania/rybnik' },
                    { label: 'Żory' },
                    { label: 'Racibórz' },
                    { label: 'Jastrzębie-Zdrój' },
                ]
            },
            {
                hubName: 'HUB CENTRUM: JAWORZNO',
                subLabel: 'CENTRALA / STREFA AGLOMERACJI A4',
                iconName: 'building' as const,
                isHeadquarters: false,
                description: 'Logistyka materiałowa A4/S1. Szybki start inwestycji w Katowicach, Tychach i Małopolsce.',
                cities: [
                    { label: 'Jaworzno', url: '/obszar-dzialania/jaworzno' },
                    { label: 'Katowice', url: '/obszar-dzialania/katowice' },
                    { label: 'Tychy', url: '/obszar-dzialania/tychy' },
                    { label: 'Gliwice', url: '/obszar-dzialania/gliwice' },
                    { label: 'Mikołów', url: '/obszar-dzialania/mikolow' },
                ]
            }
        ]
    };

    const ctaData = {
        title: 'Umów Konsultację Techniczną',
        subtitle: 'Podczas konsultacji:',
        benefits: [
            { text: 'Określimy, jakich badań i pomiarów potrzebuje Twoja działka' },
            { text: 'Wycenimy niezbędne ekspertyzy i usługi geodezyjne' },
            { text: 'Wskażemy potencjalne ryzyka techniczne i prawne' },
            { text: 'Odpowiemy na wszystkie Twoje pytania i wątpliwości' },
        ],
        disclaimer: 'Konsultacja jest bezpłatna i niezobowiązująca.',
        phoneText: 'Zadzwoń do Nas',
        phoneHref: 'tel:+48573568300',
        emailText: 'Napisz do Nas',
        emailHref: 'mailto:biuro@thebuilders.pl',
    };

    return (
        <FontWrapper>
            <PageHeader {...pageHeaderData} />
            <BentoContactSection contactInfo={contactInfo} />
            <BentoAreasSection {...areasData} />
            <BentoOfferSection />

            {/* CTA Variants Demo */}
            <div className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Wariant 1: Centered Card</h2>
                </div>
            </div>
            <BentoCTASection {...ctaData} variant="v1" />

            <div className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Wariant 2: Split Layout</h2>
                </div>
            </div>
            <BentoCTASection {...ctaData} variant="v2" />

            <div className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Wariant 3: Compact Horizontal</h2>
                </div>
            </div>
            <BentoCTASection {...ctaData} variant="v3" />

            <div className="bg-gray-100 py-8">
                <div className="mx-auto max-w-[96rem] px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Wariant 4: Grid Cards</h2>
                </div>
            </div>
            <BentoCTASection {...ctaData} variant="v4" />
        </FontWrapper>
    );
}
