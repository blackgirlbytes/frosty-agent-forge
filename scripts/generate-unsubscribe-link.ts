/**
 * Script to generate unsubscribe links for testing
 * 
 * Usage:
 *   npx tsx scripts/generate-unsubscribe-link.ts rizel@block.xyz
 */

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { generateUnsubscribeUrl } from '../src/lib/unsubscribe';

const email = process.argv[2];

if (!email) {
  console.error('❌ Please provide an email address');
  console.log('Usage: npx tsx scripts/generate-unsubscribe-link.ts <email>');
  process.exit(1);
}

console.log(`\n📧 Generating unsubscribe link for: ${email}\n`);

const url = generateUnsubscribeUrl(email);

console.log('🔗 Unsubscribe URL:');
console.log(url);
console.log('');

// Also show local dev URL
const localUrl = generateUnsubscribeUrl(email, 'http://localhost:3000');
console.log('🔗 Local dev URL:');
console.log(localUrl);
console.log('');
