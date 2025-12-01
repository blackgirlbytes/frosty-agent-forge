import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDiscussion } from '@/lib/github';
import { unlockChallenge, isChallengeUnlocked } from '@/lib/db';

// Force dynamic route - don't cache
export const dynamic = 'force-dynamic';
export const revalidate = 0;

// Challenge dates mapping (same as in unlock-daily-challenge.ts)
const CHALLENGE_DATES: Record<number, string> = {
  1: '2025-12-01',
  2: '2025-12-02',
  3: '2025-12-03',
  4: '2025-12-04',
  5: '2025-12-05',
  6: '2025-12-08',
  7: '2025-12-09',
  8: '2025-12-10',
  9: '2025-12-11',
  10: '2025-12-12',
  11: '2025-12-15',
  12: '2025-12-16',
  13: '2025-12-17',
  14: '2025-12-18',
  15: '2025-12-19',
  16: '2025-12-22',
  17: '2025-12-23',
};

/**
 * API endpoint to unlock today's challenge
 * Called by GitHub Actions daily workflow
 * 
 * POST /api/unlock-daily
 * Body: { secret: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { secret } = body;

    // Validate secret (prevent unauthorized unlocks)
    const UNLOCK_SECRET = process.env.UNLOCK_SECRET;
    if (!UNLOCK_SECRET || secret !== UNLOCK_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get current date in ET timezone
    const now = new Date();
    const etDate = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
    const today = etDate.toISOString().split('T')[0]; // YYYY-MM-DD format

    console.log(`🎄 Daily unlock check for ${today}...`);

    // Find which challenge should unlock today
    const dayToUnlock = Object.entries(CHALLENGE_DATES).find(
      ([_, date]) => date === today
    );

    if (!dayToUnlock) {
      console.log(`ℹ️  No challenge scheduled for today (${today})`);
      return NextResponse.json({
        success: true,
        message: `No challenge scheduled for today (${today})`,
        noChallenge: true,
      });
    }

    const day = parseInt(dayToUnlock[0]);
    console.log(`📅 Today's challenge: Day ${day}`);

    // Check if already unlocked
    if (isChallengeUnlocked(day)) {
      console.log(`✅ Challenge ${day} is already unlocked`);
      return NextResponse.json({
        success: true,
        message: `Challenge ${day} is already unlocked`,
        alreadyUnlocked: true,
        day,
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
    console.error('❌ Error unlocking daily challenge:', error);
    return NextResponse.json(
      { 
        error: 'Failed to unlock daily challenge',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
