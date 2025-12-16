import crypto from 'crypto';

/**
 * Unsubscribe token utilities using HMAC-SHA256
 * 
 * This provides secure, stateless unsubscribe links that:
 * - Can only be generated with the secret key
 * - Cannot be forged by users
 * - Don't require database storage for tokens
 */

const UNSUBSCRIBE_SECRET = process.env.UNSUBSCRIBE_SECRET || 'default-dev-secret-change-in-production';

/**
 * Generate an unsubscribe token for an email
 */
export function generateUnsubscribeToken(email: string): string {
  return crypto
    .createHmac('sha256', UNSUBSCRIBE_SECRET)
    .update(email.toLowerCase().trim())
    .digest('hex');
}

/**
 * Verify an unsubscribe token
 */
export function verifyUnsubscribeToken(email: string, token: string): boolean {
  const expectedToken = generateUnsubscribeToken(email);
  
  // Use timing-safe comparison to prevent timing attacks
  try {
    return crypto.timingSafeEqual(
      Buffer.from(token),
      Buffer.from(expectedToken)
    );
  } catch {
    // If buffers are different lengths, timingSafeEqual throws
    return false;
  }
}

/**
 * Generate a full unsubscribe URL for an email
 */
export function generateUnsubscribeUrl(email: string, baseUrl?: string): string {
  const base = baseUrl || process.env.NEXT_PUBLIC_BASE_URL || 'https://adventofai.dev';
  const token = generateUnsubscribeToken(email);
  const encodedEmail = encodeURIComponent(email.toLowerCase().trim());
  
  return `${base}/unsubscribe?email=${encodedEmail}&token=${token}`;
}
