import { NextRequest, NextResponse } from 'next/server';
import { verifyUnsubscribeToken } from '@/lib/unsubscribe';
import { unsubscribeFromGitHub } from '@/lib/github';

/**
 * POST /api/unsubscribe
 * Unsubscribe an email from notifications
 * Updates email-list.json in the auto repo via GitHub API
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

    // Unsubscribe via GitHub API (updates email-list.json in auto repo)
    const result = await unsubscribeFromGitHub(decodedEmail);

    if (!result.success) {
      return NextResponse.json(
        { success: false, message: 'Email not found in our records' },
        { status: 404 }
      );
    }

    if (result.alreadyUnsubscribed) {
      return NextResponse.json({
        success: true,
        message: 'You are already unsubscribed',
        alreadyUnsubscribed: true
      });
    }

    console.log(`✅ Unsubscribed: ${decodedEmail}`);
    return NextResponse.json({
      success: true,
      message: 'You have been successfully unsubscribed'
    });

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
 * Checks email-list.json in the auto repo via GitHub API
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

    // For GET, we just verify the token is valid
    // The actual subscription status will be checked on POST
    // This avoids an extra GitHub API call on page load
    return NextResponse.json({
      valid: true,
      email: decodedEmail,
      alreadyUnsubscribed: false // Will be determined on actual unsubscribe
    });

  } catch (error) {
    console.error('❌ Unsubscribe verification error:', error);
    return NextResponse.json(
      { valid: false, message: 'An error occurred' },
      { status: 500 }
    );
  }
}
