# Email Notification Setup Guide

This guide explains how to set up SendGrid for the Advent of AI email notifications.

## Overview

The email system:
1. **Stores email addresses** in a local SQLite database
2. **Sends immediate confirmation emails** when users sign up
3. **Provides scripts** to send bulk notifications when challenges unlock

## Setup Steps

### 1. Install Dependencies

**Please run this command:**
```bash
npm install @sendgrid/mail better-sqlite3 dotenv tsx
npm install -D @types/better-sqlite3
```

### 2. Configure SendGrid

You already have a SendGrid account! Just need to set up the environment variables.

Create a `.env.local` file in the project root:

```bash
SENDGRID_API_KEY=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
FROM_EMAIL=goose team <noreply@yourdomain.com>
```

**Important:** 
- Use your existing SendGrid API key from the goose-access-gateway project
- The `FROM_EMAIL` must be a verified sender in your SendGrid account
- Never commit `.env.local` to git (it's already in `.gitignore`)

### 3. Test the Integration

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3001`
3. Enter your email in the signup form
4. Click "Get Notified"
5. Check your inbox for the confirmation email

## How It Works

### Signup Flow

When a user submits the signup form:

1. **Validates the email** format
2. **Checks for duplicates** in the database
3. **Stores email** in SQLite database (`data/signups.db`)
4. **Sends confirmation email** immediately via SendGrid
5. **Returns success/error** to the frontend

### Database Structure

The SQLite database (`data/signups.db`) contains:
- `id`: Auto-incrementing ID
- `email`: User's email (unique)
- `subscribed`: 1 = subscribed, 0 = unsubscribed
- `created_at`: Timestamp of signup

### Email Templates

Two email templates are included:

1. **Confirmation Email** - Sent immediately on signup
   - Welcome message
   - Information about the 17 challenges
   - Links to goose docs and Discord
   - Countdown reminder

2. **Challenge Unlock Email** - Sent when you run the notification script
   - Day number badge
   - Challenge unlock announcement
   - Call-to-action button
   - Tips and encouragement

## Managing Signups

### View All Signups

```bash
npm run signups:view
```

This displays:
- Total signups, subscribed, and unsubscribed counts
- List of all emails with their status

### Export to CSV

```bash
npm run signups:export
```

Exports all signups to `data/exports/signups-YYYY-MM-DD.csv`

### Access the Database Directly

The database file is at `data/signups.db`. You can use any SQLite client to view/query it:

```bash
# Using sqlite3 command line
sqlite3 data/signups.db "SELECT * FROM signups;"
```

## Sending Notifications

When you're ready to notify everyone about a challenge unlock:

### Send Day 1 Notification

```bash
npm run notify:send
```

### Send Specific Day Notification

```bash
npx tsx scripts/send-notification.ts --day=5
```

This will:
1. Fetch all subscribed emails from the database
2. Send personalized challenge unlock emails to each
3. Show progress and summary
4. Rate-limit to avoid SendGrid limits (100ms between emails)

### Email Quota

Your SendGrid account has:
- **Email API**: 50,000 emails/month (you have 49,991 left)
- This is plenty for your advent calendar!

## Troubleshooting

### "Failed to send email" Error

- Check that your `SENDGRID_API_KEY` is correct
- Verify that your sender email is authenticated in SendGrid
- Check SendGrid dashboard for any account issues

### "Email already signed up" Error

- This is expected behavior to prevent duplicates
- The email is already in your database

### Database Not Found

- The database is created automatically on first run
- Make sure the `data/` directory exists
- Check file permissions

### Rate Limits

- Free tier: 100 emails/day for Marketing Campaigns (not used)
- Email API: 50,000 emails/month (what we're using)
- Script includes rate limiting (100ms between emails)

## File Structure

```
frosty-agent-forge/
├── app/
│   └── api/
│       └── notify/
│           └── route.ts          # API endpoint for signups
├── lib/
│   └── db.ts                     # Database operations
├── scripts/
│   ├── send-notification.ts      # Send bulk notifications
│   └── view-signups.ts           # View/export signups
├── data/
│   ├── signups.db                # SQLite database (auto-created)
│   └── exports/                  # CSV exports (auto-created)
└── .env.local                    # Environment variables (create this)
```

## Security Notes

- Database file is gitignored
- API key is server-side only
- Email validation prevents invalid entries
- Duplicate prevention built-in
- Unsubscribe functionality ready (can be added to emails later)

## Production Checklist

Before going live:

- [ ] Domain authentication in SendGrid (not just single sender)
- [ ] Sender email matches your domain
- [ ] Rate limiting on `/api/notify` endpoint
- [ ] Error monitoring set up
- [ ] Database backups configured
- [ ] Privacy policy and terms updated
- [ ] Test all email templates on multiple clients
- [ ] Add unsubscribe links to bulk emails (required by law)

## Next Steps

1. **Install dependencies** (see step 1 above)
2. **Configure `.env.local`** with your SendGrid credentials
3. **Test signup flow** on localhost
4. **Collect signups** leading up to December 1st
5. **Send notifications** when challenges unlock

## Resources

- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid Node.js Library](https://github.com/sendgrid/sendgrid-nodejs)
- [Better SQLite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- [goose Documentation](https://block.github.io/goose)
