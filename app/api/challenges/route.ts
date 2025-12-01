import { NextResponse } from 'next/server';
import { getAllChallenges } from '@/lib/db';

// API endpoint to get challenge unlock status
export async function GET() {
  try {
    const challenges = getAllChallenges();
    
    // Return unlock status for each challenge
    const unlockStatus = challenges.reduce((acc, challenge) => {
      acc[challenge.day] = {
        unlocked: challenge.unlocked === 1,
        discussionUrl: challenge.discussion_url,
        discussionNumber: challenge.discussion_number,
        unlockedAt: challenge.unlocked_at,
      };
      return acc;
    }, {} as Record<number, { 
      unlocked: boolean; 
      discussionUrl: string | null;
      discussionNumber: number | null;
      unlockedAt: string | null;
    }>);

    return NextResponse.json(unlockStatus);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 });
  }
}
