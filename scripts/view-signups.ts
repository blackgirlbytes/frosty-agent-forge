/**
 * Script to view all email signups
 * 
 * Usage:
 *   npx tsx scripts/view-signups.ts
 * 
 * Options:
 *   --export     Export emails to a CSV file
 */

import { getAllSignups, getSignupStats } from '../lib/db';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Display all signups
 */
function viewSignups() {
  console.log('\n🎄 Advent of AI - Email Signups\n');

  const signups = getAllSignups();
  const stats = getSignupStats();

  console.log('📊 Statistics:');
  console.log(`   Total signups: ${stats.total}`);
  console.log(`   Subscribed: ${stats.subscribed}`);
  console.log(`   Unsubscribed: ${stats.unsubscribed}`);
  console.log('\n');

  if (signups.length === 0) {
    console.log('⚠️  No signups yet.\n');
    return;
  }

  console.log('📧 All Signups:\n');
  console.log('ID\tEmail\t\t\t\tSubscribed\tCreated At');
  console.log('─'.repeat(80));

  signups.forEach(signup => {
    const email = signup.email.padEnd(30);
    const subscribed = signup.subscribed ? '✅ Yes' : '❌ No';
    const date = new Date(signup.created_at).toLocaleString();
    console.log(`${signup.id}\t${email}\t${subscribed}\t${date}`);
  });

  console.log('\n');
}

/**
 * Export signups to CSV
 */
function exportToCSV() {
  const signups = getAllSignups();
  
  if (signups.length === 0) {
    console.log('⚠️  No signups to export.\n');
    return;
  }

  const csvContent = [
    'ID,Email,Subscribed,Created At',
    ...signups.map(s => 
      `${s.id},${s.email},${s.subscribed ? 'Yes' : 'No'},${s.created_at}`
    )
  ].join('\n');

  const exportDir = path.join(process.cwd(), 'data', 'exports');
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').split('T')[0];
  const filename = `signups-${timestamp}.csv`;
  const filepath = path.join(exportDir, filename);

  fs.writeFileSync(filepath, csvContent);

  console.log(`\n✅ Exported ${signups.length} signups to: ${filepath}\n`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const shouldExport = args.includes('--export');

// Run the script
if (shouldExport) {
  exportToCSV();
} else {
  viewSignups();
}
