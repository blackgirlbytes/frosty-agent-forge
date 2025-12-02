/**
 * Script to send notification emails to all subscribed users
 * 
 * Usage:
 *   npx tsx scripts/send-notification.ts
 * 
 * Or with custom message:
 *   npx tsx scripts/send-notification.ts --day 1
 */

import sgMail from '@sendgrid/mail';
import { getSubscribedEmails, getSignupStats } from '../src/lib/db';
import * as dotenv from 'dotenv';
import { execSync } from 'child_process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// Load environment variables
dotenv.config({ path: '.env.local' });

interface EmailTemplate {
  subject: string;
  html: string;
}

/**
 * Extract challenge preview from markdown file
 */
function getChallengePreview(day: number): { title: string; preview: string } {
  const challengePath = join(process.cwd(), 'challenges', `day${day}.md`);
  
  if (!existsSync(challengePath)) {
    console.warn(`⚠️  Challenge file not found for day ${day}, using fallback`);
    return {
      title: `Day ${day} Challenge`,
      preview: `Your Day ${day} challenge is now available! Head to the site to see what's in store.`
    };
  }

  try {
    const content = readFileSync(challengePath, 'utf-8');
    
    // Extract title (first # heading)
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : `Day ${day} Challenge`;
    
    // Extract the intro paragraphs (after "## Welcome" section, before "###")
    const welcomeSection = content.match(/##\s+Welcome[^#]*?([\s\S]*?)(?=###|##\s+\*\*|$)/);
    let preview = '';
    
    if (welcomeSection && welcomeSection[1]) {
      // Get first 2-3 paragraphs, clean up markdown
      const paragraphs = welcomeSection[1]
        .trim()
        .split('\n\n')
        .filter(p => p.trim() && !p.startsWith('---'))
        .slice(0, 3)
        .map(p => p.replace(/\*\*/g, '').replace(/\*/g, '').trim())
        .join('\n\n');
      
      preview = paragraphs;
    }
    
    // Fallback if we couldn't extract a good preview
    if (!preview || preview.length < 50) {
      preview = `Your Day ${day} challenge is now available! Head to the site to see what's in store.`;
    }
    
    return { title, preview };
  } catch (error: any) {
    console.error(`❌ Error reading challenge file for day ${day}:`, error.message);
    return {
      title: `Day ${day} Challenge`,
      preview: `Your Day ${day} challenge is now available! Head to the site to see what's in store.`
    };
  }
}

/**
 * Get email template for challenge unlock notification
 */
function getChallengeUnlockTemplate(day: number): EmailTemplate {
  const { title, preview } = getChallengePreview(day);
  
  const subject = day === 1 
    ? '🎄 Day 1 Challenge is Live - Advent of AI!' 
    : `🎄 Day ${day} Challenge Unlocked - Advent of AI!`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          line-height: 1.6; 
          color: #1f2937;
          background: #ffffff;
          margin: 0;
          padding: 0;
        }
        .container { 
          max-width: 600px; 
          margin: 0 auto; 
          padding: 40px 20px; 
        }
        .header { 
          text-align: center; 
          margin-bottom: 40px; 
        }
        .snowflake {
          font-size: 24px;
          display: inline-block;
          margin: 0 4px;
        }
        .title {
          font-size: 42px;
          font-weight: bold;
          margin: 20px 0;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .day-badge {
          display: inline-block;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          font-size: 24px;
          font-weight: bold;
          margin: 20px 0;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }
        .content { 
          background: #ffffff;
          padding: 40px; 
          border-radius: 16px; 
          border: 2px solid #e5e7eb;
        }
        .challenge-title {
          color: #06b6d4;
          font-size: 24px;
          font-weight: 600;
          margin: 0 0 20px 0;
        }
        .challenge-preview {
          background: #f9fafb;
          border-left: 4px solid #06b6d4;
          padding: 20px;
          margin: 24px 0;
          border-radius: 8px;
          font-size: 15px;
          line-height: 1.7;
          color: #374151;
          white-space: pre-line;
        }
        .highlight {
          color: #06b6d4;
          font-weight: 600;
        }
        .cta-button {
          display: inline-block;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white !important;
          padding: 16px 40px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          font-size: 18px;
          margin: 30px 0;
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }
        .footer { 
          text-align: center; 
          margin-top: 40px; 
          color: #6b7280; 
          font-size: 14px; 
        }
        a {
          color: #06b6d4;
          text-decoration: none;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="snowflake">❄️ ❄️ ❄️</div>
          <h1 class="title">Advent of AI</h1>
          <div class="day-badge">Day ${day}</div>
        </div>
        
        <div class="content">
          <h2 class="challenge-title">${title}</h2>
          
          <div class="challenge-preview">${preview}</div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="https://adventofai.dev/challenges/${day}" class="cta-button">
              View Full Challenge →
            </a>
          </div>

          <p style="font-size: 16px; margin-top: 24px; color: #6b7280;">
            ${day === 1 
              ? 'Ready to start your AI agent journey? Click above to see the full challenge details, requirements, and resources!'
              : 'Ready to continue your journey? Click above to see the full challenge details and get started!'
            }
          </p>
        </div>
        
        <div class="footer">
          <p>Happy coding! See you tomorrow for the next challenge! ❄️</p>
          <p style="margin-top: 20px; font-size: 12px;">
            You're receiving this because you signed up for <a href="https://adventofai.dev" style="color: #6b7280; text-decoration: none;">Advent of AI</a> challenge notifications.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return { subject, html };
}

/**
 * Fetch emails from JSON file
 */
function getEmailsFromJson(): string[] {
  try {
    console.log('📋 Reading emails from JSON file...');
    const jsonPath = join(process.cwd(), 'data', 'signups-list.json');
    const signups = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    const emails = signups
      .filter((signup: any) => signup.subscribed === 1)
      .map((signup: any) => signup.email);
    console.log(`✅ Found ${emails.length} subscribed emails in JSON file`);
    return emails;
  } catch (error: any) {
    console.error('❌ Failed to read emails from JSON:', error.message);
    throw error;
  }
}

/**
 * Get signup statistics from JSON file
 */
function getStatsFromJson(): { total: number; subscribed: number; unsubscribed: number } {
  try {
    const jsonPath = join(process.cwd(), 'data', 'signups-list.json');
    const signups = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    const total = signups.length;
    const subscribed = signups.filter((s: any) => s.subscribed === 1).length;
    return {
      total,
      subscribed,
      unsubscribed: total - subscribed
    };
  } catch (error: any) {
    console.error('⚠️  Failed to read stats from JSON:', error.message);
    return { total: 0, subscribed: 0, unsubscribed: 0 };
  }
}

/**
 * Fetch emails from Railway database
 */
function getEmailsFromRailway(): string[] {
  try {
    console.log('📡 Fetching emails from Railway database...');
    const command = `railway ssh "node -e \\"const db = require('better-sqlite3')('./data/signups.db'); const rows = db.prepare('SELECT email FROM signups WHERE subscribed = 1').all(); console.log(JSON.stringify(rows.map(r => r.email))); db.close();\\""`;
    
    const output = execSync(command, { encoding: 'utf-8' });
    const emails = JSON.parse(output.trim());
    console.log(`✅ Fetched ${emails.length} subscribed emails from Railway`);
    return emails;
  } catch (error: any) {
    console.error('❌ Failed to fetch emails from Railway:', error.message);
    throw error;
  }
}

/**
 * Get signup statistics from Railway
 */
function getStatsFromRailway(): { total: number; subscribed: number; unsubscribed: number } {
  try {
    const command = `railway ssh "node -e \\"const db = require('better-sqlite3')('./data/signups.db'); const total = db.prepare('SELECT COUNT(*) as count FROM signups').get().count; const subscribed = db.prepare('SELECT COUNT(*) as count FROM signups WHERE subscribed = 1').get().count; console.log(JSON.stringify({ total, subscribed, unsubscribed: total - subscribed })); db.close();\\""`;
    
    const output = execSync(command, { encoding: 'utf-8' });
    return JSON.parse(output.trim());
  } catch (error: any) {
    console.error('⚠️  Failed to fetch stats from Railway:', error.message);
    return { total: 0, subscribed: 0, unsubscribed: 0 };
  }
}

/**
 * Send notification emails to all subscribed users
 */
async function sendNotifications(day: number = 1, useRailway: boolean = false, useJson: boolean = false) {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'noreply@adventofai.dev';

  if (!sendgridApiKey) {
    console.error('❌ SENDGRID_API_KEY not configured');
    process.exit(1);
  }

  sgMail.setApiKey(sendgridApiKey);

  // Get all subscribed emails
  let emails: string[];
  let stats: { total: number; subscribed: number; unsubscribed: number };

  if (useRailway) {
    emails = getEmailsFromRailway();
    stats = getStatsFromRailway();
  } else if (useJson) {
    emails = getEmailsFromJson();
    stats = getStatsFromJson();
  } else {
    console.log('📋 Fetching subscribed emails from local database...');
    emails = getSubscribedEmails();
    stats = getSignupStats();
  }

  console.log(`\n📊 Signup Statistics:`);
  console.log(`   Total signups: ${stats.total}`);
  console.log(`   Subscribed: ${stats.subscribed}`);
  console.log(`   Unsubscribed: ${stats.unsubscribed}`);
  console.log(`\n📤 Preparing to send to ${emails.length} recipients...\n`);

  if (emails.length === 0) {
    console.log('⚠️  No subscribed emails found. Exiting.');
    return;
  }

  // Get email template
  const template = getChallengeUnlockTemplate(day);

  // Send emails (with rate limiting to avoid SendGrid limits)
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      await sgMail.send({
        to: email,
        from: fromEmail,
        subject: template.subject,
        html: template.html,
      });
      
      sent++;
      console.log(`✅ Sent to ${email} (${sent}/${emails.length})`);

      // Rate limiting: wait 100ms between emails to avoid hitting SendGrid limits
      if (sent < emails.length) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    } catch (error: any) {
      failed++;
      console.error(`❌ Failed to send to ${email}:`, error.message);
    }
  }

  console.log(`\n📊 Summary:`);
  console.log(`   ✅ Successfully sent: ${sent}`);
  console.log(`   ❌ Failed: ${failed}`);
  console.log(`   📧 Total: ${emails.length}`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const dayArg = args.find(arg => arg.startsWith('--day='));
const day = dayArg ? parseInt(dayArg.split('=')[1]) : 1;
const useRailway = args.includes('--railway');
const useJson = args.includes('--json');

// Run the script
console.log(`\n🎄 Advent of AI - Notification Sender`);
console.log(`📅 Sending Day ${day} notifications...\n`);
if (useRailway) {
  console.log('🚂 Using Railway database\n');
} else if (useJson) {
  console.log('📄 Using JSON file\n');
}

sendNotifications(day, useRailway, useJson)
  .then(() => {
    console.log('\n✅ Done!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Error:', error);
    process.exit(1);
  });
