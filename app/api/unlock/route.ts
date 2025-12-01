import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDiscussion } from '@/lib/github';
import { unlockChallenge, isChallengeUnlocked } from '@/lib/db';

// Force dynamic route - don't cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

/**
 * API endpoint to unlock a challenge
 * Called by GitHub Actions workflows
 * 
 * POST /api/unlock
 * Body: { day: number, secret: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { day, secret } = body;

    // Validate secret (prevent unauthorized unlocks)
    const UNLOCK_SECRET = process.env.UNLOCK_SECRET;
    if (!UNLOCK_SECRET || secret !== UNLOCK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Validate day
    if (!day || isNaN(day) || day < 1 || day > 17) {
      return NextResponse.json(
        { error: 'Invalid day number' },
        { status: 400 }
      );
    }

    console.log(`🎄 Starting unlock process for Day ${day}...`);

    // Check if already unlocked
    if (isChallengeUnlocked(day)) {
      console.log(`✅ Challenge ${day} is already unlocked`);
      return NextResponse.json({
        success: true,
        message: `Challenge ${day} is already unlocked`,
        alreadyUnlocked: true,
      });
    }

    // Create GitHub discussion
    console.log(`📝 Creating GitHub discussion for Day ${day}...`);
    const { discussionUrl, discussionNumber } = await createGitHubDiscussion(day);
    console.log(`✅ Discussion created: ${discussionUrl}`);

    // Unlock challenge in database
    console.log(`🔓 Unlocking challenge ${day} in database...`);
    const challenge = unlockChallenge(day, discussionUrl, discussionNumber);
    console.log(`✅ Challenge ${day} unlocked successfully!`);

    return NextResponse.json({
      success: true,
      message: `Challenge ${day} unlocked successfully`,
      challenge: {
        day: challenge.day,
        discussionUrl: challenge.discussion_url,
        discussionNumber: challenge.discussion_number,
        unlockedAt: challenge.unlocked_at,
      },
    });

  } catch (error) {
    console.error('❌ Error unlocking challenge:', error);
    return NextResponse.json(
      { 
        error: 'Failed to unlock challenge',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
