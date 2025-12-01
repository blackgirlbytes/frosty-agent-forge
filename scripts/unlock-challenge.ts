#!/usr/bin/env tsx

/**
 * Unlock Challenge Script
 * 
 * This script is designed to be run by Railway cron jobs.
 * It unlocks a specific challenge day and creates a GitHub discussion.
 * 
 * Usage:
 *   tsx scripts/unlock-challenge.ts <day>
 * 
 * Example:
 *   tsx scripts/unlock-challenge.ts 2
 */

import { createGitHubDiscussion } from '../src/lib/github';
import { unlockChallenge, isChallengeUnlocked } from '../src/lib/db';

async function main() {
  // Get day from command line argument
  const day = parseInt(process.argv[2]);

  if (!day || isNaN(day)) {
    console.error('❌ Error: Please provide a valid day number');
    console.error('Usage: tsx scripts/unlock-challenge.ts <day>');
    process.exit(1);
  }

  console.log(`🎄 Starting unlock process for Day ${day}...`);

  // Check if already unlocked
  if (isChallengeUnlocked(day)) {
    console.log(`✅ Challenge ${day} is already unlocked`);
    process.exit(0);
  }

  try {
    // Create GitHub discussion
    console.log(`📝 Creating GitHub discussion for Day ${day}...`);
    const { discussionUrl, discussionNumber } = await createGitHubDiscussion(day);
    console.log(`✅ Discussion created: ${discussionUrl}`);

    // Unlock challenge in database
    console.log(`🔓 Unlocking challenge ${day} in database...`);
    const challenge = unlockChallenge(day, discussionUrl, discussionNumber);
    console.log(`✅ Challenge ${day} unlocked successfully!`);
    console.log(`   Discussion: ${challenge.discussion_url}`);
    console.log(`   Number: ${challenge.discussion_number}`);
    console.log(`   Unlocked at: ${challenge.unlocked_at}`);

  } catch (error) {
    console.error(`❌ Error unlocking challenge ${day}:`, error);
    process.exit(1);
  }
}

main();
