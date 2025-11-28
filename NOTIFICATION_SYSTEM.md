# Advent of AI - Notification System

## Quick Start

### 1. Install Dependencies

```bash
npm install @sendgrid/mail better-sqlite3 dotenv tsx
npm install -D @types/better-sqlite3
```

### 2. Configure Environment

Create `.env.local`:

```bash
SENDGRID_API_KEY=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
FROM_EMAIL=goose team <noreply@yourdomain.com>
```

### 3. Test Signup

```bash
npm run dev
# Visit http://localhost:3001 and sign up with your email
```

## Available Commands

### View Signups

```bash
npm run signups:view
```

Shows all signups with statistics.

### Export Signups to CSV

```bash
npm run signups:export
```

Exports to `data/exports/signups-YYYY-MM-DD.csv`

### Send Notifications

```bash
# Send Day 1 notification
npm run notify:send

# Send specific day
npx tsx scripts/send-notification.ts --day=5
```

## How It Works

### Architecture

```
User Signs Up
    ↓
API validates email
    ↓
Saves to SQLite database (data/signups.db)
    ↓
Sends confirmation email via SendGrid
    ↓
User receives welcome email
```

### When Ready to Notify

```
Run notification script
    ↓
Fetches all subscribed emails from database
    ↓
Sends challenge unlock email to each
    ↓
Shows progress and summary
```

## Database

**Location:** `data/signups.db`

**Schema:**
```sql
CREATE TABLE signups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  subscribed INTEGER DEFAULT 1,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
)
```

**Access directly:**
```bash
sqlite3 data/signups.db "SELECT * FROM signups;"
```

## Email Quota

Your SendGrid account:
- **Email API**: 50,000 emails/month
- **Currently used**: 9 emails
- **Available**: 49,991 emails

This is more than enough for the advent calendar!

## Files

- `app/api/notify/route.ts` - Signup API endpoint
- `lib/db.ts` - Database operations
- `scripts/send-notification.ts` - Bulk notification sender
- `scripts/view-signups.ts` - View/export signups
- `data/signups.db` - SQLite database (auto-created)

## Tips

1. **Test first**: Sign up with your own email to test the flow
2. **Check spam**: Confirmation emails might go to spam initially
3. **Rate limiting**: Script waits 100ms between emails to avoid limits
4. **Backup database**: Copy `data/signups.db` before sending bulk emails
5. **Monitor SendGrid**: Check the Activity Feed in SendGrid dashboard

## Troubleshooting

**"Module not found: Can't resolve '@sendgrid/mail'"**
- Run: `npm install @sendgrid/mail better-sqlite3 dotenv tsx`

**"SENDGRID_API_KEY not configured"**
- Create `.env.local` with your SendGrid API key

**"Failed to send email"**
- Verify sender email is authenticated in SendGrid
- Check SendGrid dashboard for issues

**Database errors**
- Make sure `data/` directory exists
- Check file permissions

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure `.env.local`
3. ✅ Test signup flow
4. 📧 Collect signups until December 1st
5. 🚀 Send notifications when challenges unlock

See `EMAIL_SETUP.md` for detailed setup instructions.
