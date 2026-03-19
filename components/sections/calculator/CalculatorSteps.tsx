import { Icon, type IconName } from '@/components/ui/Icon';

const steps: { number: string; icon: IconName; title: string; description: string }[] = [
  {
    number: '01',
    icon: 'slidersHorizontal',
    title: 'Konfigurujesz parametry',
    description: 'Wybierasz metraż, materiał, typ dachu i kondygnacje. Zajmuje to 60 sekund.',
  },
  {
    number: '02',
    icon: 'phone',
    title: 'Oddzwonimy w 24h',
    description: 'Nasz inżynier przeanalizuje konfigurację i zadzwoni z dokładną wyceną.',
  },
  {
    number: '03',
    icon: 'fileCheck',
    title: 'Umowa ze stałą ceną',
    description: 'Podpisujemy umowę z gwarantowaną ceną i harmonogramem. Bez niespodzianek.',
  },
];

export const CalculatorSteps = () => {
  return (
    <section className="bg-background-dark text-white py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h2 className="text-2xl md:text-3xl font-bold text-center font-heading mb-10 md:mb-14">
          Od wyceny do budowy w{' '}
          <span className="text-primary">3 krokach</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, idx) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop only) */}
              {idx < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-px border-t border-dashed border-gray-600" />
              )}

              {/* Icon circle */}
              <div className="w-16 h-16 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center mb-4 relative">
                <Icon name={step.icon} size="lg" className="text-primary" />
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full text-xs font-bold text-white flex items-center justify-center">
                  {step.number}
                </span>
              </div>

              <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
