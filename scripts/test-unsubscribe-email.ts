/**
 * Test script to send a single email with unsubscribe link
 * 
 * Usage:
 *   npx tsx scripts/test-unsubscribe-email.ts rizel@block.xyz
 */

import sgMail from '@sendgrid/mail';
import { generateUnsubscribeUrl } from '../src/lib/unsubscribe';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const testEmail = process.argv[2];

if (!testEmail) {
  console.error('❌ Please provide an email address');
  console.log('Usage: npx tsx scripts/test-unsubscribe-email.ts <email>');
  process.exit(1);
}

async function sendTestEmail() {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const fromEmail = process.env.FROM_EMAIL || 'noreply@adventofai.dev';

  if (!sendgridApiKey) {
    console.error('❌ SENDGRID_API_KEY not configured');
    process.exit(1);
  }

  sgMail.setApiKey(sendgridApiKey);

  const unsubscribeUrl = generateUnsubscribeUrl(testEmail);

  console.log(`\n📧 Sending test email to: ${testEmail}`);
  console.log(`🔗 Unsubscribe URL: ${unsubscribeUrl}\n`);

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
        .title {
          font-size: 32px;
          font-weight: bold;
          margin: 20px 0;
          color: #06b6d4;
        }
        .content { 
          background: #ffffff;
          padding: 40px; 
          border-radius: 16px; 
          border: 2px solid #e5e7eb;
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
          <div style="font-size: 48px;">🧪</div>
          <h1 class="title">Unsubscribe Test Email</h1>
        </div>
        
        <div class="content">
          <h2 style="color: #06b6d4; margin-top: 0;">Testing Unsubscribe Feature</h2>
          
          <p>This is a test email to verify the unsubscribe functionality works correctly.</p>
          
          <p><strong>Click the unsubscribe link below to test:</strong></p>
          
          <div style="background: #f0f9ff; border-left: 4px solid #06b6d4; padding: 20px; margin: 24px 0; border-radius: 8px;">
            <a href="${unsubscribeUrl}" style="word-break: break-all;">${unsubscribeUrl}</a>
          </div>
          
          <p style="color: #6b7280; font-size: 14px;">
            After clicking, you should see a confirmation page. If you confirm, your email will be marked as unsubscribed in the database.
          </p>
        </div>
        
        <div class="footer">
          <p>Advent of AI • Unsubscribe Test</p>
          <p style="margin-top: 20px; font-size: 12px;">
            You're receiving this test because you requested it.
            <br>
            <a href="${unsubscribeUrl}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    await sgMail.send({
      to: testEmail,
      from: fromEmail,
      subject: '🧪 Test: Unsubscribe Feature - Advent of AI',
      html: html,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('\nNext steps:');
    console.log('1. Check your inbox for the test email');
    console.log('2. Click the unsubscribe link');
    console.log('3. Confirm unsubscribe on the page');
    console.log('4. Verify your email is marked as unsubscribed in the database\n');
  } catch (error: any) {
    console.error('❌ Failed to send:', error.message);
    process.exit(1);
  }
}

sendTestEmail();
