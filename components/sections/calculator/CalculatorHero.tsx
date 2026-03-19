import { Icon } from '@/components/ui/Icon';

const trustItems = [
  { icon: 'hardHat' as const, text: '200+ zrealizowanych domów' },
  { icon: 'coins' as const, text: 'Stała cena w umowie' },
  { icon: 'shield' as const, text: 'Od 2005 roku' },
];

/**
 * CalculatorHero — compact header integrated INTO the form section.
 * Not a separate full-width section — rendered inside CalculatorForm's container.
 */
export const CalculatorHero = () => {
  return (
    <div className="text-center mb-10 md:mb-14">
      <h1 className="text-h3 md:text-display lg:text-hero font-bold font-heading leading-tight">
        Bezpłatna Wycena{' '}
        <span className="text-primary">Budowy Domu</span>
      </h1>

      <p className="mt-4 text-body-md md:text-body-lg text-text-secondary max-w-2xl mx-auto">
        Skonfiguruj parametry domu, zostaw numer —
        oddzwonimy z&nbsp;dokładną wyceną w&nbsp;24h
      </p>

      {/* Trust bar */}
      <div className="mt-6 md:mt-8 flex flex-wrap items-center justify-center gap-5 md:gap-8">
        {trustItems.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 text-body-sm text-text-secondary"
          >
            <Icon name={item.icon} size="sm" className="text-primary" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
