# ⚡ Quick Start - Advent of AI

**Goal:** Get everything running before 12:00 PM ET today (Dec 1, 2025)

---

## 🚀 5-Minute Setup

### 1. Install Dependencies (1 min)

```bash
npm install
```

### 2. Add GitHub Token (2 min)

Create `.env.local`:

```bash
GITHUB_TOKEN=your_github_token_here
```

**Get your token:** https://github.com/settings/tokens/new
- Select scopes: `public_repo`, `write:discussion`

### 3. Test Locally (2 min)

```bash
# Start dev server
npm run dev

# Visit http://localhost:3000
# Verify calendar shows all challenges locked
```

---

## 🧪 Test Before Going Live

### Test the Posting Script

```bash
# Set token
export GITHUB_TOKEN=your_token_here

# Dry run (won't actually post)
npm run challenge:test
```

**⚠️ This will post to GitHub!** Only run once for testing.

---

## 🌐 Deploy to Production

### Option A: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod

# Add environment variable in Vercel dashboard:
# GITHUB_TOKEN = your_token_here
```

### Option B: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Deploy
netlify deploy --prod

# Add environment variable in Netlify dashboard:
# GITHUB_TOKEN = your_token_here
```

### Option C: Push to GitHub (if auto-deploy configured)

```bash
git push origin main
```

---

## 🔐 Add GitHub Secret for Automation

1. Go to your repo: `https://github.com/YOUR_USERNAME/frosty-agent-forge`
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add:
   - **Name**: `DISCUSSIONS_TOKEN`
   - **Value**: Your GitHub token

---

## ✅ Verify Everything Works

### At Noon ET Today:

1. **Check GitHub Actions:**
   - Go to Actions tab
   - Look for "Post Daily Challenge" workflow run
   - Should complete successfully

2. **Check GitHub Discussions:**
   - Visit https://github.com/block/goose/discussions
   - Look for "Day 1: The Fortune Teller's Tent ⛄️"

3. **Check Your Site:**
   - Visit your production URL
   - Day 1 should show as "Unlocked"
   - Click Day 1 → Modal should open with challenge

---

## 🐛 Quick Troubleshooting

### "Category 'Advent of AI' not found"
→ Create the category at https://github.com/block/goose/discussions/categories

### "GITHUB_TOKEN not configured"
→ Add to `.env.local` for local, or repository secrets for production

### "Challenge not unlocking"
→ Check server time is correct, hard refresh browser (Cmd+Shift+R)

### Workflow not running
→ Verify `DISCUSSIONS_TOKEN` secret is set in repository settings

---

## 📚 Full Documentation

- **Detailed Setup:** See `GITHUB_SETUP.md`
- **Deployment Guide:** See `DEPLOYMENT_GUIDE.md`
- **Architecture:** See `IMPLEMENTATION_SUMMARY.md`

---

## 🎯 Success Checklist

Before noon ET:
- [ ] Dependencies installed
- [ ] GitHub token added locally
- [ ] GitHub token added to repository secrets
- [ ] Code pushed to production
- [ ] Environment variables set in hosting platform

At noon ET:
- [ ] GitHub Action runs successfully
- [ ] Discussion posted to block/goose
- [ ] Day 1 unlocked on site
- [ ] Modal displays challenge correctly

---

## 🆘 Need Help?

Check the logs:
- **GitHub Actions:** Repository → Actions tab
- **Vercel:** Dashboard → Deployments → Logs
- **Netlify:** Dashboard → Deploys → Deploy log

---

**You're ready! 🎄 The automation will handle everything from here.**
