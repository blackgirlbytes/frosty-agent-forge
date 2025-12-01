import Database from 'better-sqlite3';
import path from 'path';
import fs from 'fs';

// Ensure data directory exists
const dataDir = path.join(process.cwd(), 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'signups.db');
const db = new Database(dbPath);

// Enable WAL mode for better concurrent access
db.pragma('journal_mode = WAL');

// Initialize database schema
function initializeDatabase() {
  // Create signups table
  db.exec(`
    CREATE TABLE IF NOT EXISTS signups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      subscribed INTEGER DEFAULT 1,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create index for better query performance
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_signups_email ON signups(email);
    CREATE INDEX IF NOT EXISTS idx_signups_subscribed ON signups(subscribed);
  `);

  // Create challenges table
  db.exec(`
    CREATE TABLE IF NOT EXISTS challenges (
      id INTEGER PRIMARY KEY,
      day INTEGER NOT NULL UNIQUE,
      unlocked INTEGER DEFAULT 0,
      discussion_url TEXT,
      discussion_number INTEGER,
      unlocked_at TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Create index for challenges
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_challenges_day ON challenges(day);
    CREATE INDEX IF NOT EXISTS idx_challenges_unlocked ON challenges(unlocked);
  `);
}

// Initialize on import
initializeDatabase();

// ============================================
// Signup Operations
// ============================================

export interface Signup {
  id: number;
  email: string;
  subscribed: number;
  created_at: string;
}

/**
 * Add a new signup
 */
export function createSignup(email: string): Signup {
  const stmt = db.prepare(`
    INSERT INTO signups (email)
    VALUES (?)
  `);

  try {
    const result = stmt.run(email.toLowerCase());
    
    return {
      id: result.lastInsertRowid as number,
      email: email.toLowerCase(),
      subscribed: 1,
      created_at: new Date().toISOString()
    };
  } catch (error) {
    // If email already exists, return the existing record
    if (error && typeof error === 'object' && 'code' in error && error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      const existing = getSignupByEmail(email);
      if (existing) {
        throw new Error('EMAIL_EXISTS');
      }
    }
    if (error instanceof Error && error.message.includes('UNIQUE constraint failed')) {
      const existing = getSignupByEmail(email);
      if (existing) {
        throw new Error('EMAIL_EXISTS');
      }
    }
    throw error;
  }
}

/**
 * Get signup by email
 */
export function getSignupByEmail(email: string): Signup | undefined {
  const stmt = db.prepare('SELECT * FROM signups WHERE email = ?');
  return stmt.get(email.toLowerCase()) as Signup | undefined;
}

/**
 * Get all signups
 */
export function getAllSignups(): Signup[] {
  const stmt = db.prepare('SELECT * FROM signups ORDER BY created_at DESC');
  return stmt.all() as Signup[];
}

/**
 * Get all subscribed emails (for sending notifications)
 */
export function getSubscribedEmails(): string[] {
  const stmt = db.prepare('SELECT email FROM signups WHERE subscribed = 1 ORDER BY created_at ASC');
  const results = stmt.all() as Array<{ email: string }>;
  return results.map(r => r.email);
}

/**
 * Unsubscribe an email
 */
export function unsubscribeEmail(email: string): boolean {
  const stmt = db.prepare('UPDATE signups SET subscribed = 0 WHERE email = ?');
  const result = stmt.run(email.toLowerCase());
  return result.changes > 0;
}

/**
 * Get signup statistics
 */
export function getSignupStats(): {
  total: number;
  subscribed: number;
  unsubscribed: number;
} {
  const total = db.prepare('SELECT COUNT(*) as count FROM signups').get() as { count: number };
  const subscribed = db.prepare('SELECT COUNT(*) as count FROM signups WHERE subscribed = 1').get() as { count: number };
  
  return {
    total: total.count,
    subscribed: subscribed.count,
    unsubscribed: total.count - subscribed.count
  };
}

/**
 * Check if email has already signed up
 */
export function hasEmailSignedUp(email: string): boolean {
  const signup = getSignupByEmail(email);
  return signup !== undefined;
}

// ============================================
// Challenge Operations
// ============================================

export interface Challenge {
  id: number;
  day: number;
  unlocked: number;
  discussion_url: string | null;
  discussion_number: number | null;
  unlocked_at: string | null;
  created_at: string;
}

/**
 * Get challenge by day
 */
export function getChallengeByDay(day: number): Challenge | undefined {
  const stmt = db.prepare('SELECT * FROM challenges WHERE day = ?');
  return stmt.get(day) as Challenge | undefined;
}

/**
 * Get all challenges
 */
export function getAllChallenges(): Challenge[] {
  const stmt = db.prepare('SELECT * FROM challenges ORDER BY day ASC');
  return stmt.all() as Challenge[];
}

/**
 * Get all unlocked challenges
 */
export function getUnlockedChallenges(): Challenge[] {
  const stmt = db.prepare('SELECT * FROM challenges WHERE unlocked = 1 ORDER BY day ASC');
  return stmt.all() as Challenge[];
}

/**
 * Unlock a challenge
 */
export function unlockChallenge(
  day: number,
  discussionUrl: string,
  discussionNumber: number
): Challenge {
  const existing = getChallengeByDay(day);
  
  if (existing) {
    // Update existing challenge
    const stmt = db.prepare(`
      UPDATE challenges 
      SET unlocked = 1, 
          discussion_url = ?, 
          discussion_number = ?,
          unlocked_at = ?
      WHERE day = ?
    `);
    stmt.run(discussionUrl, discussionNumber, new Date().toISOString(), day);
  } else {
    // Create new challenge
    const stmt = db.prepare(`
      INSERT INTO challenges (day, unlocked, discussion_url, discussion_number, unlocked_at)
      VALUES (?, 1, ?, ?, ?)
    `);
    stmt.run(day, discussionUrl, discussionNumber, new Date().toISOString());
  }
  
  return getChallengeByDay(day)!;
}

/**
 * Check if challenge is unlocked
 */
export function isChallengeUnlocked(day: number): boolean {
  const challenge = getChallengeByDay(day);
  return challenge?.unlocked === 1;
}

export default db;
