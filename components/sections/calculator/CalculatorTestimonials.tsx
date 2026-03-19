'use client';

import { Icon } from '@/components/ui/Icon';

const testimonials = [
  {
    name: 'Jan K.',
    location: 'Katowice',
    detail: 'Dom 145 m²',
    initials: 'JK',
    text: 'Profesjonalne podejście od pierwszego spotkania. Cena, którą podali na początku, okazała się ceną końcową. Żadnych niespodzianek.',
  },
  {
    name: 'Anna M.',
    location: 'Rybnik',
    detail: 'Dom 120 m²',
    initials: 'AM',
    text: 'Budowa przebiegła zgodnie z harmonogramem. Ekipa zawsze na czas, materiały najwyższej jakości. Polecam każdemu.',
  },
  {
    name: 'Piotr W.',
    location: 'Mikołów',
    detail: 'Dom 180 m²',
    initials: 'PW',
    text: 'Szukałem firmy, która zbuduje dom na terenie pogórniczym. CoreLTB znali specyfikę gruntu i dobrali odpowiednie fundamenty.',
  },
  {
    name: 'Marta S.',
    location: 'Tychy',
    detail: 'Dom 160 m²',
    initials: 'MS',
    text: 'Kierownik budowy był dostępny telefonicznie praktycznie cały czas. Każdy etap dokumentowany zdjęciami — pełna kontrola nad procesem.',
  },
  {
    name: 'Tomasz L.',
    location: 'Gliwice',
    detail: 'Dom 200 m²',
    initials: 'TL',
    text: 'Wybraliśmy CoreLTB po rekomendacji sąsiadów. Budowa domu piętrowego trwała dokładnie tyle, ile obiecali. Jakość wykonania rewelacyjna.',
  },
  {
    name: 'Kasia D.',
    location: 'Jaworzno',
    detail: 'Dom 135 m²',
    initials: 'KD',
    text: 'Bałam się budować na terenie po kopalni, ale CoreLTB wykonali badania gruntu i zaprojektowali fundamenty idealnie. Dom stoi stabilnie.',
  },
  {
    name: 'Marek R.',
    location: 'Wodzisław Śl.',
    detail: 'Dom 170 m²',
    initials: 'MR',
    text: 'Umowa ryczałtowa ze stałą ceną to ogromny spokój. Żadnych „dopłat" i „nieprzewidzianych kosztów". Szczerze polecam.',
  },
  {
    name: 'Ewa B.',
    location: 'Żory',
    detail: 'Dom 110 m²',
    initials: 'EB',
    text: 'Kompaktowy dom parterowy gotowy w 10 miesięcy. Ekipa zadbała o każdy detal — od fundamentów po elewację. Jesteśmy zachwyceni.',
  },
];

const TestimonialCard = ({ t }: { t: (typeof testimonials)[number] }) => (
  <div className="min-w-[300px] md:min-w-[340px] max-w-[360px] flex-shrink-0 bg-background-light rounded-2xl p-6 border border-border-light">
    {/* Stars */}
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Icon key={i} name="star" size="sm" className="text-primary fill-primary" />
      ))}
    </div>

    {/* Quote */}
    <p className="mt-4 text-text-primary text-body-sm leading-relaxed">
      &ldquo;{t.text}&rdquo;
    </p>

    {/* Author */}
    <div className="mt-5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-body-sm flex-shrink-0">
        {t.initials}
      </div>
      <div>
        <p className="font-semibold text-body-sm text-text-primary">{t.name}</p>
        <p className="text-body-xs text-text-muted">
          {t.location} &middot; {t.detail}
        </p>
      </div>
    </div>
  </div>
);

export const CalculatorTestimonials = () => {
  return (
    <section className="bg-white py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <h2 className="text-h3 md:text-display font-bold font-heading text-center">
          Co mówią nasi klienci
        </h2>
      </div>

      {/* Infinite scroll marquee — CSS-driven */}
      <div className="relative group">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 md:w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee group-hover:[animation-play-state:paused] w-max">
          {/* First set */}
          <div className="flex gap-6 px-3">
            {testimonials.map((t) => (
              <TestimonialCard key={t.name} t={t} />
            ))}
          </div>
          {/* Duplicate for seamless loop */}
          <div className="flex gap-6 px-3">
            {testimonials.map((t) => (
              <TestimonialCard key={`dup-${t.name}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
