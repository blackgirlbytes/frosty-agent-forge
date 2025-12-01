import { NextRequest, NextResponse } from 'next/server';
import { createGitHubDiscussion } from '@/lib/github';
import { unlockChallenge, isChallengeUnlocked } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    // Verify secret to prevent unauthorized access
    const authHeader = request.headers.get('authorization');
    const expectedAuth = `Bearer ${process.env.CRON_SECRET}`;
    
    if (!process.env.CRON_SECRET || authHeader !== expectedAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get day from request body
    const body = await request.json();
    const day = parseInt(body.day);

    if (!day || isNaN(day)) {
      return NextResponse.json(
        { error: 'Invalid day parameter' },
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
