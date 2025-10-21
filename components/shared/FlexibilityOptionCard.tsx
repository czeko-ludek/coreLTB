import { Icon, IconName } from '@/components/ui';

interface FlexibilityOptionCardProps {
  stage: string;
  description: string;
  icon: IconName;
  index: number; // Dla animacji stagger
}

/**
 * FlexibilityOptionCard - Molekuła
 *
 * Karta prezentująca opcję rozpoczęcia współpracy na różnych etapach budowy.
 * Pokazuje elastyczność firmy i możliwość dołączenia w dowolnym momencie.
 *
 * Cechy:
 * - Biała karta z lewostronną złotą obwódką (border-l-4)
 * - Ikona po lewej, tekst po prawej
 * - Stagger animation delay bazujący na index
 * - Responsywny layout (column na mobile, row na desktop)
 */
export const FlexibilityOptionCard: React.FC<FlexibilityOptionCardProps> = ({
  stage,
  description,
  icon,
  index,
}) => {
  return (
    <div
      className="
        bg-white rounded-xl p-6
        border-l-4 border-primary
        shadow-md
        transition-all duration-300 ease-out
        hover:shadow-xl hover:-translate-x-1
        flex flex-col md:flex-row items-start gap-4
        animate-fade-in-up
      "
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Icon Container */}
      <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 bg-primary/10 rounded-lg">
        <Icon name={icon} size="lg" className="text-primary" />
      </div>

      {/* Text Content */}
      <div className="flex-1">
        <h4 className="text-base md:text-lg font-bold text-text-primary mb-2">
          {stage}
        </h4>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};
