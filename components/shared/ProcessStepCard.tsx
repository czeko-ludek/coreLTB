interface ProcessStepCardProps {
  number: string; // np. "01", "02"
  title: string;
  description: string;
  isLast?: boolean; // Czy to ostatni element (bez linii łączącej)
}

/**
 * ProcessStepCard - Molekuła
 *
 * Karta reprezentująca pojedynczy krok w procesie współpracy (timeline).
 * Wyświetla numer, tytuł i opis kroku.
 *
 * Cechy:
 * - Duży, złoty numer w kółku
 * - Tytuł i opis wycentrowane
 * - Linia łącząca z następnym krokiem (chyba że isLast=true)
 * - Responsywny: linia pozioma na desktop, pionowa na mobile
 */
export const ProcessStepCard: React.FC<ProcessStepCardProps> = ({
  number,
  title,
  description,
  isLast = false,
}) => {
  return (
    <div className="flex flex-col items-center relative">
      {/* Number Circle */}
      <div
        className="
          w-16 h-16 md:w-20 md:h-20
          rounded-full
          bg-primary
          text-white
          flex items-center justify-center
          font-bold text-2xl md:text-3xl
          shadow-lg
          z-10
        "
      >
        {number}
      </div>

      {/* Connecting Line (hidden on last item) */}
      {!isLast && (
        <>
          {/* Horizontal line for desktop */}
          <div
            className="
              hidden md:block
              absolute top-8 left-[50%] w-full h-1
              bg-primary/30
              z-0
            "
            aria-hidden="true"
          />
          {/* Vertical line for mobile */}
          <div
            className="
              md:hidden
              absolute top-16 left-[50%] -translate-x-1/2 w-1 h-full
              bg-primary/30
              z-0
            "
            aria-hidden="true"
          />
        </>
      )}

      {/* Content */}
      <div className="mt-6 text-center max-w-xs">
        <h4 className="text-lg md:text-xl font-bold text-text-primary mb-3">
          {title}
        </h4>
        <p className="text-sm md:text-base text-text-secondary leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>
    </div>
  );
};
