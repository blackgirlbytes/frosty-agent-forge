# Production Database & Notification Commands

This document contains essential commands for managing the production database and sending notification emails on Railway.

## Check Production Database

View all signups in the production database:

```bash
railway ssh "node -e \"const db = require('better-sqlite3')('./data/signups.db'); const all = db.prepare('SELECT * FROM signups ORDER BY created_at DESC').all(); console.log('Total:', all.length); console.log(JSON.stringify(all, null, 2)); db.close();\""
```

Get just the count:

```bash
railway ssh "node -e \"const db = require('better-sqlite3')('./data/signups.db'); const count = db.prepare('SELECT COUNT(*) as c FROM signups').get(); console.log('Total signups:', count.c); db.close();\""
```

Check for a specific email:

```bash
railway ssh "node -e \"const db = require('better-sqlite3')('./data/signups.db'); const email = 'example@email.com'; const exists = db.prepare('SELECT * FROM signups WHERE email = ?').get(email); console.log(exists ? 'Found: ' + JSON.stringify(exists) : 'Not found'); db.close();\""
```

## Delete from Production Database

Delete a specific email:

```bash
railway ssh "node -e \"const db = require('better-sqlite3')('./data/signups.db'); const email = 'example@email.com'; db.prepare('DELETE FROM signups WHERE email = ?').run(email); console.log('Deleted:', email); db.close();\""
```

Delete ALL signups (use with caution!):

```bash
railway ssh "node -e \"const db = require('better-sqlite3')('./data/signups.db'); db.prepare('DELETE FROM signups').run(); console.log('All signups deleted'); db.close();\""
```

## Send Notification Emails

Send Day 1 challenge notification (default):

```bash
railway ssh -- npx tsx scripts/send-notification.ts
```

Send Day X challenge notification:

```bash
railway ssh -- npx tsx scripts/send-notification.ts --day=2
railway ssh -- npx tsx scripts/send-notification.ts --day=3
railway ssh -- npx tsx scripts/send-notification.ts --day=17
```

The script will:
- Fetch all subscribed emails from the production database
- Show statistics (total, subscribed, unsubscribed)
- Send the challenge unlock email to each subscriber
- Report success/failure for each email

## Production URLs

- **Production Site**: https://frosty-agent-forge-production.up.railway.app/
- **Signup API**: https://frosty-agent-forge-production.up.railway.app/api/notify

## Test Signup via API

```bash
curl -X POST https://frosty-agent-forge-production.up.railway.app/api/notify \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

## Important Notes

⚠️ **Railway Volume Required**: The production database is currently ephemeral. Without a Railway Volume mounted to `/data`, all signups will be lost when the service redeploys or restarts.

To set up persistent storage:
1. Go to Railway Dashboard
2. Select your `frosty-agent-forge` service
3. Go to Settings → Volumes
4. Add a new volume mounted to `/data`
5. Redeploy the service

## Environment Variables Required

The notification script requires these environment variables in Railway:
- `SENDGRID_API_KEY` - Your SendGrid API key
- `FROM_EMAIL` - Email address to send from (defaults to `noreply@adventofai.dev`)

Check Railway environment variables:
```bash
railway vars
```

## Database Schema

```sql
CREATE TABLE signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  subscribed INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```

Fields:
- `id` - Auto-incrementing primary key
- `email` - Unique email address (stored lowercase)
- `subscribed` - 1 = subscribed, 0 = unsubscribed
- `created_at` - ISO timestamp of signup
