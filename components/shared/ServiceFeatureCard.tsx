import { Icon, IconName } from '@/components/ui';

interface ServiceFeatureCardProps {
  icon: IconName;
  title: string;
  description: string;
}

/**
 * ServiceFeatureCard - Molekuła
 *
 * Karta prezentująca pojedynczą cechę/benefit usługi z ikoną.
 * Używana w sekcji IconicFeaturesSection.
 *
 * Cechy:
 * - Biała karta z zaokrąglonymi rogami
 * - Złota ikona w górnej części
 * - Tytuł i opis wyśrodkowane
 * - Efekt hover: uniesienie + cień
 */
export const ServiceFeatureCard: React.FC<ServiceFeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div
      className="
        bg-white rounded-xl p-6 md:p-8
        shadow-lg
        transition-all duration-300 ease-out
        hover:-translate-y-2 hover:shadow-2xl
        text-center
        flex flex-col items-center gap-4
      "
    >
      {/* Icon Container */}
      <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-primary/10 rounded-full">
        <Icon name={icon} size="xl" className="text-primary" />
      </div>

      {/* Title */}
      <h3 className="text-lg md:text-xl font-bold text-text-primary">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm md:text-base text-text-secondary leading-relaxed">
        {description}
      </p>
    </div>
  );
};
