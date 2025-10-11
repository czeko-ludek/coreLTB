import React from 'react';
import { clsx } from 'clsx';

export interface InputFieldProps {
  type?: 'text' | 'email' | 'tel' | 'password';
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  name?: string;
  required?: boolean;
  className?: string;
  theme?: 'light' | 'dark';
}

export function InputField({
  type = 'text',
  placeholder,
  value,
  onChange,
  name,
  required = false,
  className,
  theme = 'light',
}: InputFieldProps) {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      required={required}
      className={clsx(
        'w-full px-4 py-3 rounded-md',
        'transition-all duration-300',
        'focus:outline-none focus:ring-2 focus:ring-primary',
        {
          'bg-surface-dark text-white border border-border-dark placeholder:text-text-secondary': theme === 'dark',
          'bg-white text-text-dark border border-border-light placeholder:text-text-secondary': theme === 'light',
        },
        className
      )}
    />
  );
}


