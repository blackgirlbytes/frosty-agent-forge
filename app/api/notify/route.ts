import { NextRequest, NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';
import { createSignup, hasEmailSignedUp } from '@/lib/db';

// Email validation regex
const EMAIL_REGEX = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

/**
 * Validate email format
 */
function validateEmail(email: string): boolean {
  return EMAIL_REGEX.test(email);
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
        .subtitle {
          font-size: 20px;
          color: #6b7280;
        }
        .content { 
          background: #ffffff;
          padding: 40px; 
          border-radius: 16px; 
          border: 2px solid #e5e7eb;
        }
        .highlight {
          color: #06b6d4;
          font-weight: 600;
        }
        .info-box {
          background: #f0f9ff;
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
          background: #f0f9ff;
          border-radius: 12px;
        }
        .footer { 
          text-align: center; 
          margin-top: 40px; 
          color: #6b7280; 
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
          box-shadow: 0 4px 12px rgba(6, 182, 212, 0.3);
        }
        ul {
          padding-left: 24px;
          margin: 16px 0;
        }
        li {
          margin: 12px 0;
          color: #4b5563;
        }
        a {
          color: #06b6d4;
          text-decoration: none;
        }
        a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="snowflake">❄️ ❄️ ❄️</div>
          <h1 class="title">Advent of AI</h1>
          <p class="subtitle">17 Days of Mastery</p>
        </div>
        
        <div class="content">
          <h2 style="color: #06b6d4; margin-top: 0;">You're on the list! 🎉</h2>
          
          <p style="font-size: 16px;">
            Thanks for signing up for <a href="https://adventofai.dev" style="color: #06b6d4; text-decoration: none; font-weight: 600;">Advent of AI</a>! 
            You'll be notified when the first challenge unlocks on <strong>December 1st, 2025</strong>.
          </p>

          <div class="info-box">
            <strong style="color: #06b6d4;">What to expect:</strong>
            <ul>
              <li><strong>17 hands-on challenges</strong> - One per weekday from December 1-23</li>
              <li><strong>Master goose</strong> - An open-source AI agent</li>
              <li><strong>Build real skills</strong> - Practical agentic workflows you can use immediately</li>
              <li><strong>Daily unlocks</strong> - New challenges appear each weekday morning</li>
            </ul>
          </div>

          <div class="countdown">
            <strong style="color: #06b6d4; font-size: 20px;">Challenges start in just a few days!</strong>
            <p style="margin: 10px 0 0 0; color: #6b7280;">Mark your calendar for December 1st</p>
          </div>

          <p style="font-size: 16px; margin-top: 24px;">
            In the meantime, you might want to:
          </p>
          <ul>
            <li>Install <a href="https://block.github.io/goose/docs/getting-started/installation/">goose</a> and get familiar with it</li>
            <li>Join the <a href="https://discord.gg/goose-oss">Discord community</a></li>
            <li>Check out the <a href="https://block.github.io/goose">documentation</a></li>
          </ul>

          <p style="font-size: 16px; margin-top: 24px;">
            We'll send you a reminder email when the first challenge goes live!
          </p>
        </div>
        
        <div class="footer">
          <p>Ready to master AI agents? See you December 1st! ❄️</p>
          <p style="margin-top: 20px; font-size: 12px;">
            You're receiving this because you signed up for <a href="https://adventofai.dev" style="color: #6b7280; text-decoration: none;">Advent of AI</a> challenge notifications.
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
  } catch (error) {
    console.error('❌ SendGrid Email Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    throw new Error(`Failed to send email: ${errorMessage}`);
  }
}

/**
 * POST /api/notify
 * Add email to database and send confirmation
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

    // Check if email already exists
    if (hasEmailSignedUp(email)) {
      return NextResponse.json(
        { success: false, message: 'This email is already signed up!' },
        { status: 400 }
      );
    }

    // Add to database
    console.log('Adding to database...');
    createSignup(email);
    console.log('Email stored successfully');

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
    
    // Handle duplicate email error
    if (errorMessage === 'EMAIL_EXISTS') {
      return NextResponse.json(
        { success: false, message: 'This email is already signed up!' },
        { status: 400 }
      );
    }
    
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
