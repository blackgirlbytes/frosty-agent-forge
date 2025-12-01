# 🚀 Deployment Guide - Advent of AI

## Overview

This guide will help you deploy the Advent of AI site with automated GitHub Discussions integration.

**Timeline:** Complete before 12:00 PM ET on December 1st, 2025

---

## ✅ Pre-Deployment Checklist

### 1. Install Dependencies

```bash
npm install
```

This will install the new `marked` package for markdown rendering.

### 2. Set Up GitHub Token

#### For Local Testing:

Create or update `.env.local`:

```bash
GITHUB_TOKEN=your_github_token_here
SENDGRID_API_KEY=your_existing_sendgrid_key
FROM_EMAIL=your_existing_from_email
```

#### For GitHub Actions (Production):

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add secret:
   - **Name**: `DISCUSSIONS_TOKEN`
   - **Value**: Your GitHub token (with `public_repo` and `write:discussion` permissions)

### 3. Verify Discussion Category

1. Go to https://github.com/block/goose/discussions
2. Confirm "Advent of AI" category exists
3. If not, create it:
   - Go to Categories settings
   - Click "New category"
   - Name: `Advent of AI`
   - Description: `Daily challenges for the Advent of AI event`
   - Format: Announcement or General

---

## 🧪 Testing Locally

### Test 1: Challenge Unlock Logic

```bash
npm run dev
```

Visit http://localhost:3000 and check:
- [ ] Countdown shows time until Dec 1, 12pm ET
- [ ] Calendar shows all 17 challenges
- [ ] All challenges appear locked (if before Dec 1 noon ET)
- [ ] Day 1 appears unlocked (if after Dec 1 noon ET)

### Test 2: Challenge Modal (Before Posting)

1. Temporarily modify `src/lib/challenge-utils.ts` to unlock Day 1:
   ```typescript
   // Change this line temporarily:
   export function isChallengeUnlocked(challengeDay: number): boolean {
     return true; // Force unlock for testing
   }
   ```

2. Refresh the site
3. Click on Day 1
4. Verify:
   - [ ] Modal opens
   - [ ] Shows challenge content from `challenges/day1.md`
   - [ ] "View on GitHub" button works
   - [ ] Modal closes properly

5. **Revert the change** after testing!

### Test 3: Discussion Posting Script

```bash
# Set your GitHub token
export GITHUB_TOKEN=your_token_here

# Test posting Day 1
npm run challenge:test
```

**Expected output:**
```
🎄 Advent of AI - Challenge Posting Script
==========================================

📅 Posting challenge for Day 1
📦 Repository: block/goose

✅ Loaded challenge content from challenges/day1.md

🔍 Fetching repository information...
✅ Repository ID: R_xxxxx

🔍 Finding "Advent of AI" discussion category...
✅ Category ID: DIC_xxxxx

📝 Creating discussion: "Day 1: The Fortune Teller's Tent ⛄️"

✅ SUCCESS! Discussion created:
   Title: Day 1: The Fortune Teller's Tent ⛄️
   URL: https://github.com/block/goose/discussions/XXXX
   ID: D_xxxxx

💾 Saved metadata to data/day1-discussion.json

🎉 Challenge posted successfully!
```

**⚠️ Important:** This will actually post to GitHub! Only run once for testing.

### Test 4: Fetch Discussion from API

After posting, test the API:

```bash
# Start dev server
npm run dev

# In another terminal, test the API
curl http://localhost:3000/api/discussions/1
```

Should return JSON with challenge data.

---

## 🚀 Deployment Steps

### Step 1: Push to Repository

```bash
git push origin main
```

### Step 2: Verify GitHub Actions Setup

1. Go to your repository → **Actions** tab
2. Look for "Post Daily Challenge to GitHub Discussions" workflow
3. Verify it's enabled

### Step 3: Test Manual Workflow Trigger

**⚠️ Only do this if you want to post Day 1 immediately!**

1. Go to **Actions** → **Post Daily Challenge to GitHub Discussions**
2. Click **Run workflow**
3. Enter day: `1`
4. Click **Run workflow**
5. Monitor the run - should complete in ~30 seconds
6. Verify discussion appears at https://github.com/block/goose/discussions

### Step 4: Deploy to Production

Deploy to your hosting platform (Vercel, Netlify, etc.):

#### Vercel:
```bash
vercel --prod
```

#### Netlify:
```bash
netlify deploy --prod
```

#### Or push to main branch if auto-deploy is configured

### Step 5: Add Environment Variables to Production

In your hosting platform dashboard, add:

```
GITHUB_TOKEN=your_token_here
SENDGRID_API_KEY=your_existing_key
FROM_EMAIL=your_existing_email
```

---

## ⏰ Scheduled Automation

The GitHub Action will automatically post challenges at **12:00 PM ET** on these dates:

| Week | Dates | Days |
|------|-------|------|
| 1 | Dec 1-5 | 1-5 |
| 2 | Dec 8-12 | 6-10 |
| 3 | Dec 15-19, 22-23 | 11-17 |

**No manual intervention needed!** The workflow handles everything.

---

## 🔍 Monitoring

### Check Workflow Runs

1. Go to **Actions** tab
2. Look for scheduled runs at noon ET
3. Check logs if any fail

### Check Discussion Posts

Visit https://github.com/block/goose/discussions/categories/advent-of-ai

### Check Site Unlocks

Visit your production site at noon ET each day to verify:
- Challenge unlocks automatically
- Modal displays correctly
- Discussion content loads

---

## 🐛 Troubleshooting

### Issue: Workflow doesn't run

**Possible causes:**
1. `DISCUSSIONS_TOKEN` secret not set
2. Token doesn't have correct permissions
3. Repository is private (free plan doesn't support scheduled workflows)

**Solution:**
- Verify secret is set correctly
- Regenerate token with `public_repo` + `write:discussion`
- Make repository public or upgrade plan

### Issue: Discussion not found in modal

**Possible causes:**
1. Discussion hasn't been posted yet
2. Metadata file doesn't exist
3. GitHub token not set in production

**Solution:**
- Check if discussion exists on GitHub
- Verify `data/day1-discussion.json` was created
- Add `GITHUB_TOKEN` to production environment variables

### Issue: Challenge not unlocking at noon

**Possible causes:**
1. Server time is incorrect
2. Timezone calculation is wrong
3. Browser cache

**Solution:**
- Verify server time is correct
- Check `src/lib/challenge-utils.ts` unlock logic
- Hard refresh browser (Cmd+Shift+R / Ctrl+Shift+R)

### Issue: Markdown not rendering correctly

**Possible causes:**
1. `marked` package not installed
2. Prose styles not applied

**Solution:**
- Run `npm install`
- Check that `@tailwindcss/typography` is installed
- Add `prose` classes to modal content

---

## 📊 Post-Launch Tasks

### Day 1 (Dec 1):
- [ ] Monitor first workflow run at noon ET
- [ ] Verify discussion posted successfully
- [ ] Check site unlocks Day 1
- [ ] Test modal displays correctly
- [ ] Send email notification to signups

### Days 2-17:
- [ ] Create challenge markdown files (`challenges/day2.md` through `challenges/day17.md`)
- [ ] Monitor daily workflow runs
- [ ] Respond to community discussions
- [ ] Share on social media

### Ongoing:
- [ ] Monitor GitHub Actions for failures
- [ ] Check discussion engagement
- [ ] Update challenges based on feedback
- [ ] Collect testimonials for marketing

---

## 🎉 Success Criteria

You'll know everything is working when:

✅ At noon ET on Dec 1:
- GitHub Action runs successfully
- Discussion appears in block/goose
- Site shows Day 1 as unlocked
- Modal displays challenge content
- Comments link works

✅ For subsequent days:
- Challenges unlock automatically
- Discussions post without manual intervention
- Community engagement grows

---

## 📞 Need Help?

If you encounter issues:

1. Check GitHub Actions logs for errors
2. Verify all environment variables are set
3. Test locally first
4. Check the troubleshooting section above
5. Review `GITHUB_SETUP.md` for detailed token setup

---

## 🔄 Rollback Plan

If something goes wrong:

1. **Disable workflow:**
   - Go to Actions → Post Daily Challenge → Disable workflow

2. **Post manually:**
   - Run `npm run challenge:post` locally with correct day

3. **Revert code:**
   ```bash
   git revert HEAD
   git push origin main
   ```

4. **Emergency fallback:**
   - Post challenges directly to GitHub Discussions manually
   - Site will still fetch and display them

---

## 📝 Final Checklist

Before noon ET on December 1st:

- [ ] Dependencies installed (`npm install`)
- [ ] GitHub token added to repository secrets
- [ ] GitHub token added to `.env.local` for testing
- [ ] Discussion category verified in block/goose
- [ ] Local testing completed successfully
- [ ] Code pushed to repository
- [ ] Production deployment completed
- [ ] Environment variables set in production
- [ ] Workflow tested manually (optional)
- [ ] Monitoring dashboard ready

**You're all set! 🎄✨**

The automation will handle everything from here. Just monitor the first run at noon to ensure everything works smoothly.
