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
import { generateUnsubscribeUrl } from '../src/lib/unsubscribe';
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
 * Clean markdown text to plain text
 */
function cleanMarkdown(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, '$1')  // Remove bold
    .replace(/\*(.+?)\*/g, '$1')      // Remove italic
    .replace(/\\!/g, '!')             // Remove escaped characters
    .replace(/\\/g, '')               // Remove remaining backslashes
    .replace(/\[(.+?)\]\(.+?\)/g, '$1') // Remove links but keep text
    .trim();
}

/**
 * Extract challenge preview from markdown file
 */
function getChallengePreview(day: number): { title: string; greeting: string; description: string } {
  const challengePath = join(process.cwd(), 'challenges', `day${day}.md`);
  
  if (!existsSync(challengePath)) {
    console.warn(`⚠️  Challenge file not found for day ${day}, using fallback`);
    return {
      title: `Day ${day} Challenge`,
      greeting: 'Welcome, AI Engineer',
      description: `Your Day ${day} challenge is now available! Head to the site to see what's in store.`
    };
  }

  try {
    const content = readFileSync(challengePath, 'utf-8');
    
    // Extract title (first # heading) - clean it
    const titleMatch = content.match(/^#\s+(.+)$/m);
    const title = titleMatch ? cleanMarkdown(titleMatch[1]) : `Day ${day} Challenge`;
    
    // Extract greeting (## Welcome... heading) - handle both with and without **
    const greetingMatch = content.match(/##\s+\*?\*?(.+?)\*?\*?$/m);
    const greeting = greetingMatch ? cleanMarkdown(greetingMatch[1]) : 'Welcome, AI Engineer';
    
    // Extract the story/description paragraphs (after greeting heading, before first ###)
    // This regex finds content after "## Welcome" and before the next heading
    const storyMatch = content.match(/##\s+\*?\*?Welcome[^\n]*\n+([\s\S]*?)(?=\n###)/);
    let description = '';
    
    if (storyMatch && storyMatch[1]) {
      // Get paragraphs, filter out empty lines and separators
      const paragraphs = storyMatch[1]
        .trim()
        .split('\n\n')
        .filter(p => {
          const trimmed = p.trim();
          return trimmed && 
                 !trimmed.startsWith('---') && 
                 !trimmed.startsWith('###') &&
                 trimmed.length > 10; // Skip very short lines
        })
        .map(p => cleanMarkdown(p))
        .filter(p => p.length > 0);
      
      // Take up to 4 paragraphs for a good preview
      description = paragraphs.slice(0, 4).join('\n\n');
    }
    
    // Fallback if we couldn't extract a good description
    if (!description || description.length < 50) {
      description = `Your Day ${day} challenge is now available! Head to the site to see what's in store.`;
    }
    
    return { title, greeting, description };
  } catch (error: any) {
    console.error(`❌ Error reading challenge file for day ${day}:`, error.message);
    return {
      title: `Day ${day} Challenge`,
      greeting: 'Welcome, AI Engineer',
      description: `Your Day ${day} challenge is now available! Head to the site to see what's in store.`
    };
  }
}

/**
 * Get email template for challenge unlock notification
 * Now accepts recipientEmail to generate personalized unsubscribe link
 */
function getChallengeUnlockTemplate(day: number, recipientEmail: string): EmailTemplate {
  const { title, greeting, description } = getChallengePreview(day);
  
  const subject = day === 1 
    ? '🎄 Day 1 Challenge is Live - Advent of AI!' 
    : `🎄 Day ${day} Challenge Unlocked - Advent of AI!`;

  // Generate personalized unsubscribe URL for this recipient
  const unsubscribeUrl = generateUnsubscribeUrl(recipientEmail);

  // Convert description paragraphs to HTML paragraphs
  const descriptionHtml = description
    .split('\n\n')
    .map(p => `<p style="margin: 12px 0; line-height: 1.6;">${p}</p>`)
    .join('');

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
          margin: 0 0 8px 0;
        }
        .greeting {
          color: #6b7280;
          font-size: 16px;
          margin: 0 0 24px 0;
          font-style: italic;
        }
        .section-header {
          color: #374151;
          font-size: 18px;
          font-weight: 600;
          margin: 24px 0 12px 0;
        }
        .challenge-description {
          color: #4b5563;
          font-size: 15px;
          line-height: 1.7;
          margin: 16px 0;
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
          <p class="greeting">${greeting}</p>
          
          <h3 class="section-header">Today's Challenge:</h3>
          <div class="challenge-description">
            ${descriptionHtml}
          </div>

          <div style="text-align: center; margin: 40px 0;">
            <a href="https://adventofai.dev/challenges/${day}" class="cta-button">
              View Full Challenge →
            </a>
          </div>

          <p style="font-size: 15px; margin: 24px 0; color: #4b5563; line-height: 1.7;">
            Remember: Each challenge is designed to build your skills with goose and agentic workflows. Take your time, experiment, and learn!
          </p>

          <div style="background: #f0f9ff; border-left: 4px solid #06b6d4; padding: 20px; margin: 24px 0; border-radius: 8px;">
            <strong style="color: #06b6d4; font-size: 16px;">💡 Tips for Success:</strong>
            <ul style="margin: 12px 0; padding-left: 24px;">
              <li style="margin: 8px 0; color: #4b5563;">Read the challenge carefully before starting</li>
              <li style="margin: 8px 0; color: #4b5563;">Use the goose documentation when you get stuck</li>
              <li style="margin: 8px 0; color: #4b5563;">Share your progress in the Discord community</li>
              <li style="margin: 8px 0; color: #4b5563;">Have fun and experiment!</li>
            </ul>
          </div>
        </div>
        
        <div class="footer">
          <p>Happy coding! See you tomorrow for the next challenge! ❄️</p>
          <p style="margin-top: 20px; font-size: 12px;">
            You're receiving this because you signed up for <a href="https://adventofai.dev" style="color: #6b7280; text-decoration: none;">Advent of AI</a> challenge notifications.
            <br>
            <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
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

  // Send emails (with rate limiting to avoid SendGrid limits)
  // Each email gets a personalized template with unique unsubscribe link
  let sent = 0;
  let failed = 0;

  for (const email of emails) {
    try {
      // Generate personalized template with unsubscribe link for this recipient
      const template = getChallengeUnlockTemplate(day, email);
      
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
