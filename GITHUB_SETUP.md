# GitHub Discussions Setup Guide

## 🎯 Overview

This guide will help you set up automated posting to GitHub Discussions for the Advent of AI challenges.

---

## 📋 Prerequisites

1. **GitHub Token** with the following permissions:
   - `public_repo` (or `repo` for private repos)
   - `write:discussion`

2. **GitHub Discussions enabled** on the `block/goose` repository

3. **Discussion category created**: "Advent of AI"

---

## 🔑 Step 1: Add GitHub Token as Repository Secret

### Option A: Via GitHub Web Interface

1. Go to your repository on GitHub: `https://github.com/YOUR_USERNAME/frosty-agent-forge`
2. Click **Settings** (top right)
3. In the left sidebar, click **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Enter:
   - **Name**: `DISCUSSIONS_TOKEN`
   - **Secret**: Your GitHub token (starts with `ghp_` or `github_pat_`)
6. Click **Add secret**

### Option B: Via GitHub CLI

```bash
gh secret set DISCUSSIONS_TOKEN --body "YOUR_GITHUB_TOKEN_HERE"
```

---

## 🗂️ Step 2: Verify Discussion Category Exists

### Check if "Advent of AI" category exists:

1. Go to `https://github.com/block/goose/discussions`
2. Look for "Advent of AI" in the categories list

### If it doesn't exist, create it:

1. Go to `https://github.com/block/goose/discussions/categories`
2. Click **New category**
3. Enter:
   - **Name**: `Advent of AI`
   - **Description**: `Daily challenges for the Advent of AI event`
   - **Format**: Choose "Announcement" or "General"
4. Click **Create**

---

## 🧪 Step 3: Test the Posting Script Locally

Before the automated workflow runs, test it locally:

```bash
# Set your GitHub token temporarily
export GITHUB_TOKEN="your_github_token_here"

# Test posting Day 1
export CHALLENGE_DAY=1
npx tsx scripts/github/post-discussion.ts
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

---

## 🚀 Step 4: Test GitHub Actions Workflow

Once the token is set up, test the automated workflow:

### Via GitHub Web Interface:

1. Go to your repository → **Actions** tab
2. Click **Post Daily Challenge to GitHub Discussions** workflow
3. Click **Run workflow** (right side)
4. Enter day number: `1`
5. Click **Run workflow**

### Via GitHub CLI:

```bash
gh workflow run post-challenge.yml -f day=1
```

---

## 📅 Step 5: Verify Scheduled Runs

The workflow is configured to run automatically at **12:00 PM ET** (5:00 PM UTC) on these dates:

- **Week 1**: Dec 1, 2, 3, 4, 5 (Days 1-5)
- **Week 2**: Dec 8, 9, 10, 11, 12 (Days 6-10)
- **Week 3**: Dec 15, 16, 17, 18, 19, 22, 23 (Days 11-17)

To verify:
1. Go to **Actions** tab
2. Check for scheduled runs at noon ET each weekday

---

## 🔍 Troubleshooting

### Error: "Category 'Advent of AI' not found"

**Solution**: Create the discussion category in the `block/goose` repository (see Step 2)

### Error: "GraphQL errors: Resource not accessible by integration"

**Solution**: Your GitHub token doesn't have the required permissions. Create a new token with:
- `public_repo` (or `repo`)
- `write:discussion`

### Error: "Could not find challenge file"

**Solution**: Make sure `challenges/day1.md` exists. The script will fallback to `day1-balanced.md` for Day 1.

### Workflow doesn't run at scheduled time

**Possible causes:**
1. Repository is private and you're on a free plan (scheduled workflows don't run)
2. Token secret is not set correctly
3. GitHub Actions is disabled for the repository

---

## 📁 File Structure

After successful posting, you'll have:

```
frosty-agent-forge/
├── .github/
│   └── workflows/
│       └── post-challenge.yml          # Automated workflow
├── challenges/
│   ├── day1.md                         # Challenge content
│   ├── day2.md
│   └── ...
├── data/
│   ├── day1-discussion.json            # Metadata (auto-generated)
│   ├── day2-discussion.json
│   └── ...
└── scripts/
    └── github/
        └── post-discussion.ts          # Posting script
```

---

## 🎉 Success Checklist

- [ ] GitHub token created with correct permissions
- [ ] Token added as `DISCUSSIONS_TOKEN` repository secret
- [ ] "Advent of AI" discussion category exists in `block/goose`
- [ ] Local test successful (script runs without errors)
- [ ] Manual workflow test successful (Day 1 posted)
- [ ] Discussion appears at `https://github.com/block/goose/discussions`
- [ ] Metadata saved to `data/day1-discussion.json`

---

## 📞 Need Help?

If you encounter issues:
1. Check the GitHub Actions logs for error messages
2. Verify your token has the correct permissions
3. Ensure the discussion category exists
4. Test locally first before relying on automation

---

## 🔄 Next Steps

Once posting is working:
1. Move to **Phase 2**: Update site to unlock challenges dynamically
2. **Phase 3**: Fetch and display discussions on the site
3. **Phase 4**: Add comments section

See the main TODO for the full implementation plan.
