# Railway Cron Setup Guide

This guide will help you set up automated challenge unlocking with Railway cron jobs.

## 🎯 What This Does

- **Challenge 2** unlocks at a specific time and posts to GitHub Discussions
- **Challenge 3** unlocks 7 minutes later and posts to GitHub Discussions
- Both happen automatically without your intervention
- Discussions are posted to `block/goose` in the "Advent of AI" category

---

## 📋 Prerequisites

1. ✅ Railway account with your app deployed
2. ✅ GitHub Personal Access Token with discussion permissions
3. ✅ "Advent of AI" discussion category in `block/goose` repo

---

## Step 1: Get GitHub Discussion Category ID

First, add your GitHub token to `.env.local`:

```bash
GITHUB_TOKEN=your_token_here
GITHUB_OWNER=block
GITHUB_REPO=goose
```

Then run:

```bash
npm run challenge:get-category
```

This will show you all available discussion categories. Copy the ID for "Advent of AI".

---

## Step 2: Add Environment Variables to Railway

Go to your Railway project → Variables → Add these:

```bash
GITHUB_TOKEN=your_github_personal_access_token
GITHUB_OWNER=block
GITHUB_REPO=goose
GITHUB_DISCUSSION_CATEGORY_ID=the_category_id_from_step_1
```

**Important:** Make sure your GitHub token has these permissions:
- `public_repo` (or `repo` for private repos)
- `write:discussion`

Create token at: https://github.com/settings/tokens

---

## Step 3: Set Up Railway Cron Jobs

In Railway, you'll create **TWO cron jobs** (7 minutes apart):

### Cron Job 1: Unlock Challenge 2

1. Go to your Railway service
2. Click on "Settings" → "Cron Jobs"
3. Click "Add Cron Job"
4. Configure:
   - **Name:** `unlock-challenge-2`
   - **Schedule:** `27 2 * * *` (runs at 2:27 AM UTC - adjust for your timezone)
   - **Command:** `npm run challenge:unlock 2`

### Cron Job 2: Unlock Challenge 3

1. Add another cron job
2. Configure:
   - **Name:** `unlock-challenge-3`
   - **Schedule:** `34 2 * * *` (runs at 2:34 AM UTC - 7 minutes after job 1)
   - **Command:** `npm run challenge:unlock 3`

---

## 🕐 Cron Schedule Format

Railway uses standard cron syntax: `minute hour day month day-of-week`

Examples:
- `27 2 * * *` = 2:27 AM UTC every day
- `0 17 * * 1-5` = 5:00 PM UTC, weekdays only (12 PM ET)
- `30 12 1-23 12 1-5` = 12:30 PM UTC in December, days 1-23, weekdays only

**Timezone Note:** Railway cron runs in UTC. Convert your desired time:
- 12:00 PM ET = 5:00 PM UTC (ET is UTC-5)
- 2:27 AM local (for testing) = adjust based on your timezone

---

## Step 4: Test Locally First

Before deploying, test the unlock script locally:

```bash
# Make sure your .env.local has all the variables
npm run challenge:unlock 2
```

You should see:
```
🎄 Starting unlock process for Day 2...
📝 Creating GitHub discussion for Day 2...
✅ Discussion created: https://github.com/block/goose/discussions/XXX
🔓 Unlocking challenge 2 in database...
✅ Challenge 2 unlocked successfully!
```

Then test challenge 3:
```bash
npm run challenge:unlock 3
```

---

## Step 5: Update Calendar to Read from Database

Now we need to update your calendar component to check the database for unlocked challenges instead of hardcoding them.

Create an API endpoint to fetch unlock status:

```typescript
// app/api/challenges/route.ts
import { NextResponse } from 'next/server';
import { getAllChallenges } from '@/lib/db';

export async function GET() {
  try {
    const challenges = getAllChallenges();
    
    // Return just the unlock status
    const unlockStatus = challenges.reduce((acc, challenge) => {
      acc[challenge.day] = {
        unlocked: challenge.unlocked === 1,
        discussionUrl: challenge.discussion_url,
      };
      return acc;
    }, {} as Record<number, { unlocked: boolean; discussionUrl: string | null }>);

    return NextResponse.json(unlockStatus);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    return NextResponse.json({ error: 'Failed to fetch challenges' }, { status: 500 });
  }
}
```

Then update your `ChallengeCalendar.tsx` to fetch from this API instead of hardcoding.

---

## 🧪 Testing Schedule

For testing, you might want to set the cron jobs to run soon:

1. Check current UTC time: https://time.is/UTC
2. Set cron to run 2-3 minutes from now
3. Example: If it's 14:25 UTC, set to `28 14 * * *` and `35 14 * * *`

---

## 🔍 Monitoring

To check if cron jobs ran:

1. **Railway Logs:**
   - Go to your service → "Deployments" → Click on deployment
   - View logs to see cron job output

2. **Check Database:**
   ```bash
   npm run signups:view
   # Add a script to view challenges too
   ```

3. **Check GitHub:**
   - Visit https://github.com/block/goose/discussions
   - Look for your new discussions in "Advent of AI"

---

## 🚨 Troubleshooting

**Cron job not running:**
- Check Railway logs for errors
- Verify environment variables are set
- Ensure cron schedule is in UTC

**GitHub API errors:**
- Verify token has correct permissions
- Check category ID is correct
- Ensure repo name is correct

**Discussion already exists:**
- Script will skip if challenge is already unlocked
- Check database with a view script

**Database locked:**
- Railway might have multiple instances
- WAL mode should handle this, but check logs

---

## 📝 Next Steps

1. ✅ Get GitHub token and category ID
2. ✅ Add environment variables to Railway
3. ✅ Test locally with `npm run challenge:unlock 2`
4. ✅ Set up two cron jobs in Railway (7 minutes apart)
5. ✅ Update calendar component to read from database
6. ✅ Monitor first run to ensure it works

---

## 🎄 Production Schedule

For the real advent calendar, you'd want:

- **Day 2:** December 2, 12:00 PM ET = `0 17 2 12 *`
- **Day 3:** December 3, 12:00 PM ET = `0 17 3 12 *`
- etc.

Each day gets its own cron job at 12 PM ET (5 PM UTC).

---

## 💡 Alternative: Single Smart Cron

Instead of 17 separate cron jobs, you could create one smart script that runs daily and unlocks the appropriate challenge based on the date. Let me know if you want me to create that version!
