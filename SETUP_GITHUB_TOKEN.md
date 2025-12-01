# GitHub Token Setup for Advent of AI

## The Issue

You're getting a **401 Unauthorized** error when trying to fetch GitHub discussions. This means you need to add a GitHub token to your `.env.local` file.

## Quick Fix

### 1. Add GitHub Token to `.env.local`

Open your `.env.local` file and add:

```env
GITHUB_TOKEN=ghp_your_actual_token_here
```

### 2. Create a GitHub Token (if you don't have one)

1. Go to https://github.com/settings/tokens
2. Click **"Generate new token"** → **"Generate new token (classic)"**
3. Give it a name: `Advent of AI - adventofai.dev`
4. Select scopes:
   - ✅ `public_repo` (to read public discussions)
   - ✅ `read:discussion` (to read discussions)
5. Click **"Generate token"**
6. **Copy the token immediately** (you won't see it again!)
7. Paste it into your `.env.local` file

### 3. Restart Your Dev Server

```bash
# Stop the server (Ctrl+C)
# Then restart:
npm run dev
```

### 4. Test Again

Click on Day 1 in the calendar - it should now work!

## What the Token Does

The GitHub API requires authentication to:
- Avoid rate limits (60 requests/hour without auth → 5,000 with auth)
- Access discussion content
- Read from public repositories

Your token is kept **private** in `.env.local` (which is in `.gitignore`).

## Troubleshooting

### Still getting 401?

1. **Check the token is in `.env.local`:**
   - Open `.env.local`
   - Make sure line starts with `GITHUB_TOKEN=ghp_...`
   - No spaces around the `=`

2. **Restart dev server:**
   ```bash
   npm run dev
   ```

3. **Check token permissions:**
   - Go to https://github.com/settings/tokens
   - Click on your token
   - Make sure `public_repo` and `read:discussion` are checked

### Token not working?

Generate a new one:
1. Delete the old token on GitHub
2. Create a new one with the scopes above
3. Update `.env.local`
4. Restart dev server

## Security Notes

- ✅ `.env.local` is in `.gitignore` - won't be committed
- ✅ Token only has read permissions
- ✅ Token only works for public repos
- ⚠️ Never share your token or commit it to git
- ⚠️ If exposed, revoke it immediately on GitHub

## Current Status

After adding the token:
- ✅ API route fixed (params await issue resolved)
- ⏳ Need to add `GITHUB_TOKEN` to `.env.local`
- ⏳ Need to restart dev server
- ⏳ Test by clicking Day 1

## Next Steps

Once the token is working:
1. Create actual Day 1 discussion with full challenge content
2. Update discussion number in `/app/api/challenge/[day]/route.ts`
3. Test the full flow!
