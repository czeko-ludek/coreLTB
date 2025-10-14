'use client';

import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Icon } from '@/components/ui';

export interface InfoTooltipProps {
  definition: string;
}

export function InfoTooltip({ definition }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + rect.width / 2,
      });
    }

    setIsOpen(!isOpen);
  };

  // Close on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        buttonRef.current &&
        tooltipRef.current &&
        !buttonRef.current.contains(e.target as Node) &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  return (
    <span className="relative inline-flex items-center ml-2">
      {/* Info Icon Button - transparent with gold icon */}
      <button
        ref={buttonRef}
        onClick={handleClick}
        className="inline-flex items-center justify-center w-5 h-5 transition-colors duration-200 flex-shrink-0"
        aria-label="Więcej informacji"
      >
        <Icon name="info" size="sm" className="text-primary hover:text-primary-dark" />
      </button>

      {/* Tooltip - rendered via portal with fixed positioning */}
      {isOpen && isMounted && createPortal(
        <div
          ref={tooltipRef}
          className="fixed z-40 bg-white rounded-xl shadow-2xl border border-primary/20 p-4 md:p-6 w-[calc(100vw-2rem)] md:w-[29rem]"
          style={{
            top: `${position.top}px`,
            left: `${position.left}px`,
            transform: 'translateX(-50%)',
            maxWidth: '90vw',
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2 right-2 md:top-3 md:right-3 w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200"
            aria-label="Zamknij"
          >
            <Icon name="x" size="sm" className="text-text-primary" />
          </button>

          {/* Content */}
          <div className="pr-6 md:pr-8">
            <p className="text-xs md:text-sm text-text-primary leading-relaxed whitespace-pre-line">
              {definition}
            </p>
          </div>

          {/* Arrow pointing up */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-l border-t border-primary/20 transform rotate-45" />
        </div>,
        document.body
      )}
    </span>
  );
}
