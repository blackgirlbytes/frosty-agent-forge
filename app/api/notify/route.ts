import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import sgClient from '@sendgrid/client';

// Email validation regex
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Validate email format
 */
function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
}

/**
 * Add contact to SendGrid list
 */
async function addToContactList(email: string): Promise<boolean> {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  const listId = process.env.SENDGRID_LIST_ID;
  
  if (!sendgridApiKey) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  if (!listId) {
    throw new Error('SENDGRID_LIST_ID not configured');
  }

  sgClient.setApiKey(sendgridApiKey);

  console.log('📋 Adding contact to SendGrid list:', email);

  const data = {
    list_ids: [listId],
    contacts: [
      {
        email: email,
      }
    ]
  };

  try {
    const [response] = await sgClient.request({
      url: '/v3/marketing/contacts',
      method: 'PUT',
      body: data
    });

    console.log('✅ Contact added successfully');
    return true;
  } catch (error: any) {
    console.error('❌ SendGrid Contact API Error:', error.response?.body || error);
    throw new Error(`Failed to add contact: ${error.message}`);
  }
}

/**
 * Send confirmation email via SendGrid
 */
async function sendConfirmationEmail(email: string): Promise<boolean> {
  const sendgridApiKey = process.env.SENDGRID_API_KEY;
  
  if (!sendgridApiKey) {
    throw new Error('SENDGRID_API_KEY not configured');
  }

  sgMail.setApiKey(sendgridApiKey);

  const fromEmail = process.env.FROM_EMAIL || 'noreply@adventofai.dev';

  console.log('📤 Sending confirmation email to:', email);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; 
          line-height: 1.6; 
          color: #e2e8f0;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
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
        .content { 
          background: rgba(30, 41, 59, 0.8);
          padding: 40px; 
          border-radius: 16px; 
          border: 1px solid rgba(6, 182, 212, 0.2);
        }
        .highlight {
          color: #06b6d4;
          font-weight: 600;
        }
        .info-box {
          background: rgba(6, 182, 212, 0.1);
          border-left: 4px solid #06b6d4;
          padding: 20px;
          margin: 24px 0;
          border-radius: 8px;
        }
        .countdown {
          text-align: center;
          font-size: 18px;
          margin: 30px 0;
          padding: 20px;
          background: rgba(6, 182, 212, 0.05);
          border-radius: 12px;
        }
        .footer { 
          text-align: center; 
          margin-top: 40px; 
          color: #94a3b8; 
          font-size: 14px; 
        }
        .button {
          display: inline-block;
          background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
          color: white;
          padding: 14px 32px;
          text-decoration: none;
          border-radius: 8px;
          font-weight: 600;
          margin: 20px 0;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.3);
        }
        ul {
          padding-left: 24px;
          margin: 16px 0;
        }
        li {
          margin: 12px 0;
          color: #cbd5e1;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="snowflake">❄️ ❄️ ❄️</div>
          <h1 class="title">Advent of AI</h1>
          <p style="font-size: 20px; color: #94a3b8;">17 Days of Mastery</p>
        </div>
        
        <div class="content">
          <h2 style="color: #06b6d4; margin-top: 0;">You're on the list! 🎉</h2>
          
          <p style="font-size: 16px;">
            Thanks for signing up for <span class="highlight">Advent of AI</span>! 
            You'll be notified when the first challenge unlocks on <strong>December 1st, 2025</strong>.
          </p>

          <div class="info-box">
            <strong style="color: #06b6d4;">What to expect:</strong>
            <ul>
              <li><strong>17 hands-on challenges</strong> - One per weekday from December 1-24</li>
              <li><strong>Master goose</strong> - The open-source AI agent framework</li>
              <li><strong>Build real skills</strong> - Practical agentic workflows you can use immediately</li>
              <li><strong>Daily unlocks</strong> - New challenges appear each weekday morning</li>
            </ul>
          </div>

          <div class="countdown">
            <strong style="color: #06b6d4; font-size: 20px;">Challenges start in just a few days!</strong>
            <p style="margin: 10px 0 0 0; color: #94a3b8;">Mark your calendar for December 1st</p>
          </div>

          <p style="font-size: 16px; margin-top: 24px;">
            In the meantime, you might want to:
          </p>
          <ul>
            <li>Install <a href="https://block.github.io/goose/docs/getting-started/installation/" style="color: #06b6d4;">goose</a> and get familiar with it</li>
            <li>Join the <a href="https://discord.gg/goose-oss" style="color: #06b6d4;">Discord community</a></li>
            <li>Check out the <a href="https://block.github.io/goose" style="color: #06b6d4;">documentation</a></li>
          </ul>

          <p style="font-size: 16px; margin-top: 24px;">
            We'll send you a reminder email when the first challenge goes live!
          </p>
        </div>
        
        <div class="footer">
          <p>Ready to master AI agents? See you December 1st! ❄️</p>
          <p style="margin-top: 20px; font-size: 12px;">
            You're receiving this because you signed up for Advent of AI challenge notifications.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  const msg = {
    to: email,
    from: fromEmail,
    subject: '❄️ You\'re signed up for Advent of AI!',
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Confirmation email sent successfully');
    return true;
  } catch (error: any) {
    console.error('❌ SendGrid Email Error:', error.response?.body || error);
    throw new Error(`Failed to send email: ${error.message}`);
  }
}

/**
 * POST /api/notify
 * Add email to SendGrid contact list and send confirmation
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    // Validate email
    if (!email) {
      return NextResponse.json(
        { success: false, message: 'Email is required' },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email format' },
        { status: 400 }
      );
    }

    console.log(`\n📝 Processing signup for ${email}...`);

    // Add to SendGrid contact list
    console.log('Adding to contact list...');
    await addToContactList(email);
    console.log('Contact added successfully');

    // Send confirmation email
    console.log('Sending confirmation email...');
    await sendConfirmationEmail(email);
    console.log('Confirmation email sent');

    // Return success
    return NextResponse.json({
      success: true,
      message: `You're on the list! Check your inbox for confirmation.`,
    });

  } catch (error) {
    console.error('❌ Signup Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to process signup. Please try again.',
        error: errorMessage
      },
      { status: 500 }
    );
  }
}
