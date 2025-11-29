import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'signups.db');
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

export default db;
