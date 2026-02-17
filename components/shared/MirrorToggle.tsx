'use client';

import React from 'react';
import { Icon } from '@/components/ui';
import { useMirrorMode } from '@/contexts/MirrorModeContext';

export function MirrorToggle() {
  const { isMirror, toggleMirror } = useMirrorMode();

  return (
    <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
      <button
        onClick={() => { if (isMirror) toggleMirror(); }}
        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold text-xs uppercase tracking-wide transition-all duration-300 ${
          !isMirror
            ? 'bg-primary text-white shadow-lg'
            : 'bg-white text-text-secondary hover:text-text-primary'
        }`}
        aria-pressed={!isMirror}
      >
        Standard
      </button>
      <button
        onClick={() => { if (!isMirror) toggleMirror(); }}
        className={`px-3 py-1.5 md:px-4 md:py-2 rounded-md font-bold text-xs uppercase tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
          isMirror
            ? 'bg-primary text-white shadow-lg'
            : 'bg-white text-text-secondary hover:text-text-primary'
        }`}
        aria-pressed={isMirror}
      >
        <Icon name="flipHorizontal" size="sm" className="w-3.5 h-3.5" />
        Lustro
      </button>
    </div>
  );
}
