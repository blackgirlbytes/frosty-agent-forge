/**
 * Utility functions for challenge unlocking and date calculations
 */

// Map challenge numbers to December dates (weekdays only)
export const CHALLENGE_DATES: Record<number, number> = {
  1: 1,   // Dec 1 (Mon)
  2: 2,   // Dec 2 (Tue)
  3: 3,   // Dec 3 (Wed)
  4: 4,   // Dec 4 (Thu)
  5: 5,   // Dec 5 (Fri)
  6: 8,   // Dec 8 (Mon)
  7: 9,   // Dec 9 (Tue)
  8: 10,  // Dec 10 (Wed)
  9: 11,  // Dec 11 (Thu)
  10: 12, // Dec 12 (Fri)
  11: 15, // Dec 15 (Mon)
  12: 16, // Dec 16 (Tue)
  13: 17, // Dec 17 (Wed)
  14: 18, // Dec 18 (Thu)
  15: 19, // Dec 19 (Fri)
  16: 22, // Dec 22 (Mon)
  17: 23, // Dec 23 (Tue)
};

export const CHALLENGE_TITLES: Record<number, string> = {
  1: "Day 1: The Fortune Teller's Tent ⛄️",
  2: "Day 2: The Storyteller's Booth 🎪📖",
  3: "Day 3: The Hot Cocoa Championship Crisis 🏆☕",
  4: "Day 4: The Festival Website Launch 🌐❄️",
  5: "Day 5: The Homecoming Board ✈️❄️",
  6: "Day 6: The Festival Feedback System 🎪💬",
  7: "Day 7: The Lost & Found Data Detective 🔍🧤",
  8: "Day 8: Dmitri's Data Dilemma 🤓📱",
  9: "Day 9: The Gift Tag Dilemma 🎁",
  10: "Day 10: The Festival Poster Generator 🎨📢",
  11: "Day 11: The Social Media Blitz 📱✨",
  12: "Day 12: The Festival Gossip Column 📰☕",
  13: "Day 13: The Fun House Photo Booth 📸✨",
  14: "Day 14: The Festival Mascot Crisis 🎭☃️",
  15: "Day 15: The Festival Performance Mystery 🔍⚡",
  16: "Day 16: The Festival Countdown App ⏰❄️",
  17: "Day 17: The Winter Wishlist App 🎁✨",
};

/**
 * Check if a challenge is unlocked based on current date/time
 * Challenges unlock at 12:00 PM ET (noon Eastern Time)
 * 
 * TESTING: Temporarily set to 5:30 AM ET for testing
 */
export function isChallengeUnlocked(challengeDay: number): boolean {
  const now = new Date();
  
  // Get the December date for this challenge
  const decemberDate = CHALLENGE_DATES[challengeDay];
  if (!decemberDate) return false;
  
  // TESTING: Temporarily using 5:30 AM ET instead of 12:00 PM ET
  // TODO: Change back to T12:00:00-05:00 after testing
  const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T05:30:00-05:00');
  
  return now >= unlockDate;
}

/**
 * Get all currently unlocked challenge days
 */
export function getUnlockedChallenges(): number[] {
  const unlocked: number[] = [];
  for (let day = 1; day <= 17; day++) {
    if (isChallengeUnlocked(day)) {
      unlocked.push(day);
    }
  }
  return unlocked;
}

/**
 * Get the next challenge that will unlock
 */
export function getNextChallenge(): { day: number; unlockDate: Date } | null {
  const now = new Date();
  
  for (let day = 1; day <= 17; day++) {
    const decemberDate = CHALLENGE_DATES[day];
    const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T12:00:00-05:00');
    
    if (now < unlockDate) {
      return { day, unlockDate };
    }
  }
  
  return null; // All challenges unlocked
}

/**
 * Format unlock date for display
 */
export function formatUnlockDate(challengeDay: number): string {
  const decemberDate = CHALLENGE_DATES[challengeDay];
  if (!decemberDate) return '';
  
  const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T12:00:00-05:00');
  
  return unlockDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
}

/**
 * Get time remaining until challenge unlocks
 */
export function getTimeUntilUnlock(challengeDay: number): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} | null {
  const decemberDate = CHALLENGE_DATES[challengeDay];
  if (!decemberDate) return null;
  
  const now = new Date();
  const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T12:00:00-05:00');
  
  const difference = unlockDate.getTime() - now.getTime();
  
  if (difference <= 0) return null;
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}
