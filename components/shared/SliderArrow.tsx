import React from 'react';
import { clsx } from 'clsx';
import { Icon } from '@/components/ui';

export interface SliderArrowProps {
  direction: 'left' | 'right';
  onClick: () => void;
  disabled?: boolean;
  variant?: 'light' | 'dark' | 'gold';
}

export function SliderArrow({
  direction,
  onClick,
  disabled = false,
  variant = 'light',
}: SliderArrowProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        'w-14 h-14 rounded-full flex items-center justify-center',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        {
          'opacity-50 cursor-not-allowed': disabled,
          'hover:scale-110': !disabled,
          'bg-white shadow-lg': variant === 'light',
          'bg-surface-dark shadow-lg': variant === 'dark',
          'bg-white border-2 border-primary/30 shadow-md hover:border-primary hover:shadow-lg': variant === 'gold',
        }
      )}
    >
      <Icon
        name={direction === 'left' ? 'chevronLeft' : 'chevronRight'}
        size="lg"
        className={clsx({
          'text-text-dark': variant === 'light',
          'text-white': variant === 'dark',
          'text-primary': variant === 'gold',
        })}
      />
    </button>
  );
}


