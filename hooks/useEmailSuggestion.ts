'use client';

import { useState, useCallback } from 'react';
import { getEmailSuggestion, validateEmailStructure, type EmailSuggestion } from '@/lib/email-validation';

/**
 * useEmailSuggestion — hook for email typo detection + disposable email blocking.
 *
 * Usage:
 *   const { suggestion, disposableError, onBlur, applySuggestion, clearSuggestion } = useEmailSuggestion(email, setEmail);
 *
 * On blur:  checks for typos and disposable domains
 * Returns:  suggestion object (or null) + disposable error string (or null)
 */
export function useEmailSuggestion(
  value: string,
  onChange: (corrected: string) => void
) {
  const [suggestion, setSuggestion] = useState<EmailSuggestion | null>(null);
  const [disposableError, setDisposableError] = useState<string | null>(null);

  const onBlur = useCallback(() => {
    // Reset
    setSuggestion(null);
    setDisposableError(null);

    if (!value || !value.includes('@')) return;

    // Check disposable first
    const structureError = validateEmailStructure(value);
    if (structureError && structureError.includes('tymczasowe')) {
      setDisposableError(structureError);
      return;
    }

    // Check typo
    const typoSuggestion = getEmailSuggestion(value);
    if (typoSuggestion) {
      setSuggestion(typoSuggestion);
    }
  }, [value]);

  const applySuggestion = useCallback(() => {
    if (suggestion) {
      onChange(suggestion.full);
      setSuggestion(null);
    }
  }, [suggestion, onChange]);

  const clearSuggestion = useCallback(() => {
    setSuggestion(null);
  }, []);

  return {
    /** Typo suggestion (e.g. "Czy chodziło o jan@gmail.com?") */
    suggestion,
    /** Error if disposable email detected */
    disposableError,
    /** Call on input blur to trigger checks */
    onBlur,
    /** Apply the suggestion (auto-correct email) */
    applySuggestion,
    /** Dismiss suggestion without applying */
    clearSuggestion,
  };
}
