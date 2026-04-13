'use client';

import { useState, useEffect } from 'react';

/**
 * useDebounce — delays updating a value until after `delay` ms of inactivity.
 * Perfect for search inputs to avoid firing on every keystroke.
 *
 * @param value - the raw value to debounce
 * @param delay - debounce delay in ms (default 200)
 *
 * @example
 * const [query, setQuery] = useState('')
 * const debouncedQuery = useDebounce(query, 300)
 *
 * useEffect(() => {
 *   if (debouncedQuery) performSearch(debouncedQuery)
 * }, [debouncedQuery])
 */
export function useDebounce<T>(value: T, delay = 200): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}
