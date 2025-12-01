#!/usr/bin/env tsx

/**
 * Smart Daily Unlock Script
 * 
 * Automatically determines which challenge to unlock based on current date.
 * Designed to run daily at 12 PM ET during December 1-23 (weekdays only).
 */

import { createGitHubDiscussion } from '../src/lib/github';
import { unlockChallenge, isChallengeUnlocked } from '../src/lib/db';

// Map of December dates to challenge days (weekdays only)
const CHALLENGE_DATES: Record<number, number> = {
  1: 1,   // Dec 1 = Day 1
  2: 2,   // Dec 2 = Day 2
  3: 3,   // Dec 3 = Day 3
  4: 4,   // Dec 4 = Day 4
  5: 5,   // Dec 5 = Day 5
  8: 6,   // Dec 8 = Day 6 (skip weekend)
  9: 7,   // Dec 9 = Day 7
  10: 8,  // Dec 10 = Day 8
  11: 9,  // Dec 11 = Day 9
  12: 10, // Dec 12 = Day 10
  15: 11, // Dec 15 = Day 11 (skip weekend)
  16: 12, // Dec 16 = Day 12
  17: 13, // Dec 17 = Day 13
  18: 14, // Dec 18 = Day 14
  19: 15, // Dec 19 = Day 15
  22: 16, // Dec 22 = Day 16 (skip weekend)
  23: 17, // Dec 23 = Day 17
};

async function main() {
  const now = new Date();
  const month = now.getMonth() + 1; // 1-12
  const date = now.getDate(); // 1-31

  console.log(`🎄 Daily unlock script running...`);
  console.log(`📅 Current date: ${now.toISOString()}`);
  console.log(`📅 Month: ${month}, Date: ${date}`);

  // Check if we're in December
  if (month !== 12) {
    console.log('❌ Not December - no challenges to unlock');
    process.exit(0);
  }

  // Check if today is a challenge day
  const challengeDay = CHALLENGE_DATES[date];
  
  if (!challengeDay) {
    console.log(`❌ December ${date} is not a challenge day (weekend or outside Dec 1-23)`);
    process.exit(0);
  }

  console.log(`✅ Today is Challenge Day ${challengeDay}!`);

  // Check if already unlocked
  if (isChallengeUnlocked(challengeDay)) {
    console.log(`✅ Challenge ${challengeDay} is already unlocked`);
    process.exit(0);
  }

  try {
    // Create GitHub discussion
    console.log(`📝 Creating GitHub discussion for Day ${challengeDay}...`);
    const { discussionUrl, discussionNumber } = await createGitHubDiscussion(challengeDay);
    console.log(`✅ Discussion created: ${discussionUrl}`);

    // Unlock challenge in database
    console.log(`🔓 Unlocking challenge ${challengeDay} in database...`);
    const challenge = unlockChallenge(challengeDay, discussionUrl, discussionNumber);
    console.log(`✅ Challenge ${challengeDay} unlocked successfully!`);
    console.log(`   Discussion: ${challenge.discussion_url}`);
    console.log(`   Number: ${challenge.discussion_number}`);
    console.log(`   Unlocked at: ${challenge.unlocked_at}`);

  } catch (error) {
    console.error(`❌ Error unlocking challenge ${challengeDay}:`, error);
    process.exit(1);
  }
}

main();
