'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';

interface MirrorModeContextValue {
  hasMirror: boolean;
  isMirror: boolean;
  toggleMirror: () => void;
  getMirrorPath: (path: string) => string;
}

const MirrorModeContext = createContext<MirrorModeContextValue | null>(null);

interface MirrorModeProviderProps {
  hasMirror: boolean;
  children: React.ReactNode;
}

export function MirrorModeProvider({ hasMirror, children }: MirrorModeProviderProps) {
  const [isMirror, setIsMirror] = useState(false);

  const toggleMirror = useCallback(() => {
    setIsMirror((prev) => !prev);
  }, []);

  const getMirrorPath = useCallback(
    (path: string): string => {
      if (!hasMirror || !isMirror) return path;
      return path.replace(/\.webp$/, '-lustro.webp');
    },
    [hasMirror, isMirror]
  );

  const value = useMemo<MirrorModeContextValue>(
    () => ({ hasMirror, isMirror: hasMirror && isMirror, toggleMirror, getMirrorPath }),
    [hasMirror, isMirror, toggleMirror, getMirrorPath]
  );

  return (
    <MirrorModeContext.Provider value={value}>
      {children}
    </MirrorModeContext.Provider>
  );
}

/**
 * Hook to access mirror mode state and helpers.
 * Safe fallback when used outside provider (e.g. manual projects without hasMirror).
 */
export function useMirrorMode(): MirrorModeContextValue {
  const context = useContext(MirrorModeContext);

  // Fallback — no provider means mirror mode is disabled
  if (!context) {
    return {
      hasMirror: false,
      isMirror: false,
      toggleMirror: () => {},
      getMirrorPath: (path: string) => path,
    };
  }

  return context;
}
