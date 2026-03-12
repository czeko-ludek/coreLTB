/**
 * Shared utility functions
 */

/**
 * Convert markdown bold (**text**) to HTML <strong> tags
 * @param text - Text with optional **bold** markdown
 * @param className - Optional CSS class for <strong> tag
 */
export function formatBold(text: string, className?: string): string {
  const tag = className ? `<strong class="${className}">$1</strong>` : '<strong>$1</strong>';
  return text.replace(/\*\*(.*?)\*\*/g, tag);
}

/**
 * Strip markdown bold (**text**) leaving plain text
 */
export function stripBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '$1');
}

/**
 * Social platform display names (PL)
 */
export const PLATFORM_NAMES: Record<string, string> = {
  facebook: 'Facebook',
  twitter: 'Twitter',
  instagram: 'Instagram',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
};
