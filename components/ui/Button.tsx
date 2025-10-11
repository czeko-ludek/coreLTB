import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  rightIcon?: React.ReactNode;
  className?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  href,
  rightIcon,
  className,
}: ButtonProps) {
  const baseClasses = clsx(
    'inline-flex items-center justify-center gap-2',
    'font-bold uppercase tracking-wider',
    'rounded-sm transition-all duration-300',
    'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
    // Size variants
    {
      'px-4 py-2 text-sm': size === 'sm',
      'px-6 py-3 text-base': size === 'md',
      'px-8 py-4 text-lg': size === 'lg',
    },
    // Color variants
    {
      'bg-primary text-white hover:bg-primary-dark hover:shadow-lg': variant === 'primary',
      'bg-primary text-white border-2 border-primary hover:bg-white hover:text-primary': variant === 'secondary',
      'bg-primary text-white border-2 border-primary hover:bg-transparent hover:text-text-dark hover:border-text-dark': variant === 'outline',
      'bg-transparent text-primary hover:bg-primary/10': variant === 'ghost',
    },
    className
  );

  const content = (
    <>
      {children}
      {rightIcon && <span className="transition-transform group-hover:translate-x-1">{rightIcon}</span>}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={clsx(baseClasses, 'group')}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={clsx(baseClasses, 'group')}>
      {content}
    </button>
  );
}


