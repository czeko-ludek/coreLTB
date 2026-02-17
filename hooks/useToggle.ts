'use client';

import { useState, useCallback } from 'react';

/**
 * useToggle — prosty hook do zarządzania stanem boolean.
 * Eliminuje powtarzalne useState(false) + setter w komponentach.
 *
 * @param initialValue - wartość początkowa (domyślnie false)
 * @returns [value, toggle, setValue] — aktualny stan, toggle, opcjonalny setter
 *
 * @example
 * const [isOpen, toggleOpen] = useToggle()
 * const [isModalOpen, openModal, , closeModal] = useToggle()  // jeśli potrzebujesz on/off
 */
export function useToggle(initialValue = false): [boolean, () => void, (v: boolean) => void] {
  const [value, setValue] = useState(initialValue);

  const toggle = useCallback(() => {
    setValue((v) => !v);
  }, []);

  return [value, toggle, setValue];
}
