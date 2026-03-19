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
    <div className="text-center">
      <h1 className="text-h3 font-bold font-heading leading-tight text-white">
        Bezpłatna Wycena{' '}
        <span className="text-primary">Budowy Domu</span>
      </h1>

      <p className="mt-3 text-body-md text-white/70 max-w-md mx-auto">
        Skonfiguruj parametry domu, zostaw numer —
        oddzwonimy z&nbsp;dokładną wyceną w&nbsp;24h
      </p>

      {/* Trust bar */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-4">
        {trustItems.map((item) => (
          <div
            key={item.text}
            className="flex items-center gap-2 text-body-sm text-white/60"
          >
            <Icon name={item.icon} size="sm" className="text-primary" />
            <span>{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
