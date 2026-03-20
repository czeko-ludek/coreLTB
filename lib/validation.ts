/**
 * Polish phone number validation.
 *
 * Accepts formats:
 *   +48 664 123 757
 *   48664123757
 *   664 123 757
 *   664-123-757
 *   (48) 664123757
 *
 * Rejects:
 *   - Less than 9 digits
 *   - All same digit (111111111)
 *   - Sequential (123456789, 987654321)
 *   - Starting with 0 or 1 (not valid Polish mobile/landline)
 */
export function validatePolishPhone(raw: string): boolean {
  // Strip everything except digits
  const digits = raw.replace(/\D/g, '');

  // Remove country code if present
  let number = digits;
  if (number.startsWith('48') && number.length > 9) {
    number = number.slice(2);
  }
  if (number.startsWith('0048')) {
    number = number.slice(4);
  }

  // Must be exactly 9 digits
  if (number.length !== 9) return false;

  // First digit must be 2-8 (valid Polish prefixes)
  // 2x = landline geographic
  // 3x = reserved/VoIP
  // 4x-8x = mobile and special
  const first = number[0];
  if (first === '0' || first === '1' || first === '9') return false;

  // Reject all same digit (e.g., 555555555, 111111111)
  if (/^(\d)\1{8}$/.test(number)) return false;

  // Reject simple sequential (123456789, 987654321)
  if (number === '123456789' || number === '987654321') return false;

  // Reject repeating 2-digit pattern (e.g., 121212121)
  if (/^(\d{2})\1{3,}/.test(number)) return false;

  return true;
}

/**
 * Format phone display: "664123757" → "664 123 757"
 */
export function formatPolishPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  let number = digits;
  let prefix = '';

  if (number.startsWith('48') && number.length > 9) {
    prefix = '+48 ';
    number = number.slice(2);
  }

  if (number.length === 9) {
    return `${prefix}${number.slice(0, 3)} ${number.slice(3, 6)} ${number.slice(6)}`;
  }

  return raw; // return as-is if can't format
}
