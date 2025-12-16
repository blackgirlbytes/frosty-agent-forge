import { NextRequest, NextResponse } from 'next/server';
import { verifyUnsubscribeToken } from '@/lib/unsubscribe';
import { unsubscribeEmail, getSignupByEmail } from '@/lib/db';

/**
 * POST /api/unsubscribe
 * Unsubscribe an email from notifications
 * 
 * Required query params:
 * - email: The email to unsubscribe
 * - token: HMAC token for verification
 */
export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Validate required params
    if (!email || !token) {
      return NextResponse.json(
        { success: false, message: 'Missing email or token parameter' },
        { status: 400 }
      );
    }

    const decodedEmail = decodeURIComponent(email).toLowerCase().trim();

    // Verify the token
    if (!verifyUnsubscribeToken(decodedEmail, token)) {
      return NextResponse.json(
        { success: false, message: 'Invalid unsubscribe link' },
        { status: 403 }
      );
    }

    // Check if email exists
    const signup = getSignupByEmail(decodedEmail);
    if (!signup) {
      return NextResponse.json(
        { success: false, message: 'Email not found in our records' },
        { status: 404 }
      );
    }

    // Check if already unsubscribed
    if (signup.subscribed === 0) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed',
        alreadyUnsubscribed: true
      });
    }

    // Unsubscribe the email
    const result = unsubscribeEmail(decodedEmail);

    if (result) {
      console.log(`✅ Unsubscribed: ${decodedEmail}`);
      return NextResponse.json({
        success: true,
        message: 'You have been successfully unsubscribed'
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Failed to unsubscribe' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Unsubscribe error:', error);
    return NextResponse.json(
      { success: false, message: 'An error occurred while processing your request' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/unsubscribe
 * Verify unsubscribe link and return status (for the unsubscribe page)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const token = searchParams.get('token');

    // Validate required params
    if (!email || !token) {
      return NextResponse.json(
        { valid: false, message: 'Missing email or token parameter' },
        { status: 400 }
      );
    }

    const decodedEmail = decodeURIComponent(email).toLowerCase().trim();

    // Verify the token
    if (!verifyUnsubscribeToken(decodedEmail, token)) {
      return NextResponse.json(
        { valid: false, message: 'Invalid unsubscribe link' },
        { status: 403 }
      );
    }

    // Check if email exists and its status
    const signup = getSignupByEmail(decodedEmail);
    if (!signup) {
      return NextResponse.json(
        { valid: false, message: 'Email not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      valid: true,
      email: decodedEmail,
      alreadyUnsubscribed: signup.subscribed === 0
    });

  } catch (error) {
    console.error('❌ Unsubscribe verification error:', error);
    return NextResponse.json(
      { valid: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
