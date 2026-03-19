'use client';

import { Icon, type IconName } from './Icon';

interface OptionCardProps {
  label: string;
  /** Lucide icon name (fallback until custom SVGs) */
  icon?: IconName;
  /** Custom SVG path (takes priority over icon) */
  svgContent?: React.ReactNode;
  selected: boolean;
  onClick: () => void;
  /** Optional sublabel (e.g. "+10%") */
  sublabel?: string;
}

/**
 * OptionCard — Reusable selection card for calculator options
 *
 * Klikalna karta z ikoną i labelem.
 * Stan aktywny: gold border + bg, checkmark.
 * Stan nieaktywny: szary, subtle hover.
 */
export const OptionCard: React.FC<OptionCardProps> = ({
  label,
  icon,
  svgContent,
  selected,
  onClick,
  sublabel,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        relative flex flex-col items-center justify-center gap-2
        p-4 rounded-xl border-2 cursor-pointer
        transition-all duration-200 ease-out
        min-h-[100px] md:min-h-[120px]
        active:scale-95
        ${
          selected
            ? 'border-primary bg-primary/5 shadow-md ring-2 ring-primary/20'
            : 'border-gray-200 bg-white shadow-sm hover:border-primary/30 hover:shadow-md'
        }
      `}
      aria-pressed={selected}
    >
      {/* Checkmark */}
      {selected && (
        <span className="absolute top-2 right-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
          <Icon name="check" size="sm" className="text-white w-3 h-3" />
        </span>
      )}

      {/* Icon */}
      <div className={`transition-colors duration-200 ${selected ? 'text-primary' : 'text-gray-400'}`}>
        {svgContent || (icon && <Icon name={icon} size="xl" />)}
      </div>

      {/* Label */}
      <span
        className={`text-sm text-center leading-tight transition-colors duration-200 ${
          selected ? 'font-semibold text-text-primary' : 'text-text-secondary'
        }`}
      >
        {label}
      </span>

      {/* Sublabel */}
      {sublabel && (
        <span className="text-xs text-text-muted">{sublabel}</span>
      )}
    </button>
  );
};
