# 🧪 Testing Plan - 5:30 AM ET Test

**Current Time:** 5:27 AM ET (December 1, 2024)  
**Test Unlock Time:** 5:30 AM ET (in ~3 minutes!)

---

## 🎯 What We're Testing

1. **Site Unlock** - Does Day 1 unlock at 5:30 AM ET?
2. **GitHub Action** - Does it run at 5:30 AM ET (10:30 UTC)?
3. **Discussion Posting** - Does it successfully post to block/goose?
4. **Page Display** - Does /challenges/1 load correctly?
5. **Timezone Sync** - Do both unlock at the same time?

---

## ⚙️ Test Configuration

### Site (Frontend)
```typescript
// src/lib/challenge-utils.ts
const unlockDate = new Date('2024-12-01T05:30:00-05:00');
//                            ^^^^ 2024 (today!)
//                                       ^^^^^ 5:30 AM ET
```

### GitHub Action (Backend)
```yaml
# .github/workflows/post-challenge.yml
- cron: '30 10 1 12 *'  # 10:30 UTC = 5:30 AM ET
```

---

## 📋 Test Steps

### Step 1: Push Changes (NOW - 5:27 AM)

```bash
# Push to trigger the workflow
git push origin challenges

# Or push to main if you want to test on main branch
git checkout main
git merge challenges
git push origin main
```

**Note:** The GitHub Action will run at 5:30 AM ET (10:30 UTC) automatically if today is Dec 1.

### Step 2: Test Site Unlock (5:30 AM)

1. **Before 5:30 AM:**
   - Visit your site
   - All challenges should be locked 🔒
   - Day 1 should show "Locked"

2. **At 5:30 AM:**
   - Refresh the page
   - Day 1 should unlock 🔓
   - Should show green/glowing
   - Should be clickable

3. **Click Day 1:**
   - Should navigate to `/challenges/1`
   - Should show challenge content (from local file initially)
   - May show "Preview" badge if discussion not posted yet

### Step 3: Monitor GitHub Action (5:30 AM)

1. Go to your repository on GitHub
2. Click **Actions** tab
3. Look for "Post Daily Challenge to GitHub Discussions" workflow
4. Should see a run starting at ~5:30 AM ET

**Expected timeline:**
- 5:30:00 AM - Workflow triggers
- 5:30:30 AM - Workflow completes (if successful)
- 5:31:00 AM - Discussion appears on GitHub

**Note:** GitHub Actions can be delayed up to 15 minutes during high load.

### Step 4: Verify Discussion Posted (5:31 AM)

1. Visit https://github.com/block/goose/discussions
2. Look for "Day 1: The Fortune Teller's Tent ⛄️"
3. Should appear in "Advent of AI" category
4. Click to verify content matches `challenges/day1.md`

### Step 5: Verify Site Shows Discussion (5:32 AM)

1. Go back to your site
2. Navigate to `/challenges/1`
3. Refresh the page
4. Should now show discussion content from GitHub
5. "Preview" badge should be gone
6. Comment count should show
7. "View on GitHub" link should work

---

## ✅ Success Criteria

### Site Unlock ✅
- [ ] Day 1 shows as unlocked at 5:30 AM ET
- [ ] Lock icon changes to Unlock icon
- [ ] Card becomes clickable
- [ ] Navigates to `/challenges/1`

### GitHub Action ✅
- [ ] Workflow runs at ~5:30 AM ET
- [ ] Completes successfully (green checkmark)
- [ ] No errors in logs
- [ ] Creates `data/day1-discussion.json`

### Discussion Posting ✅
- [ ] Discussion appears on block/goose
- [ ] Title: "Day 1: The Fortune Teller's Tent ⛄️"
- [ ] Category: "Advent of AI"
- [ ] Content matches challenge markdown
- [ ] Formatted correctly

### Page Display ✅
- [ ] `/challenges/1` loads without errors
- [ ] Shows challenge content
- [ ] "View on GitHub" button works
- [ ] "Join Discussion" button shows comment count
- [ ] Prev/Next navigation works

---

## 🐛 Troubleshooting

### Issue: Site doesn't unlock at 5:30 AM

**Check:**
1. Did you push the changes?
2. Is your site deployed?
3. Hard refresh (Cmd+Shift+R / Ctrl+Shift+R)
4. Check browser console for errors

**Debug:**
```javascript
// In browser console
new Date('2024-12-01T05:30:00-05:00')
// Should show a date in the past after 5:30 AM
```

### Issue: GitHub Action doesn't run

**Check:**
1. Is the workflow file in `.github/workflows/`?
2. Is `DISCUSSIONS_TOKEN` secret set?
3. Is the repository public? (Private repos on free plan don't run scheduled workflows)
4. Check Actions tab for any disabled workflows

**Manual trigger:**
```bash
# Trigger manually if cron doesn't work
gh workflow run post-challenge.yml -f day=1
```

### Issue: Discussion not posted

**Check workflow logs:**
1. Go to Actions tab
2. Click the workflow run
3. Check logs for errors
4. Common issues:
   - Token doesn't have permissions
   - Category "Advent of AI" doesn't exist
   - Repository name wrong

### Issue: Page shows error

**Check:**
1. Browser console for errors
2. Network tab for failed API calls
3. `/api/discussions/1` returns valid JSON

---

## 🔄 After Testing

### If Test Succeeds ✅

**Revert to production settings:**

1. **Update unlock time back to noon:**
```typescript
// src/lib/challenge-utils.ts
const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T12:00:00-05:00');
//                            ^^^^ 2025
//                                                                                ^^^^^ 12:00 PM
```

2. **Update GitHub Action back to noon:**
```yaml
# .github/workflows/post-challenge.yml
- cron: '0 17 1 12 *'  # 17:00 UTC = 12:00 PM ET
```

3. **Commit and push:**
```bash
git add -A
git commit -m "revert: Change unlock time back to 12:00 PM ET for production"
git push origin main
```

### If Test Fails ❌

**Debug steps:**
1. Check all logs (browser console, GitHub Actions, API responses)
2. Test posting script locally: `npm run challenge:test`
3. Verify GitHub token permissions
4. Check timezone calculations
5. Review error messages

**Don't revert yet** - keep test settings to debug the issue.

---

## 📊 Test Results Log

**Fill this out during testing:**

### Site Unlock
- Time checked: _______
- Day 1 unlocked: ☐ Yes ☐ No
- Clickable: ☐ Yes ☐ No
- Notes: _______

### GitHub Action
- Workflow started: ☐ Yes ☐ No
- Start time: _______
- Completed: ☐ Yes ☐ No
- Duration: _______
- Errors: _______

### Discussion Posting
- Discussion created: ☐ Yes ☐ No
- URL: _______
- Correct category: ☐ Yes ☐ No
- Content correct: ☐ Yes ☐ No

### Page Display
- Page loads: ☐ Yes ☐ No
- Content displays: ☐ Yes ☐ No
- Links work: ☐ Yes ☐ No
- Issues: _______

---

## ⏱️ Timeline

| Time | Event | Expected Result |
|------|-------|----------------|
| 5:27 AM | Push changes | Code deployed |
| 5:29 AM | Check site | All locked |
| 5:30 AM | Unlock time | Day 1 unlocks |
| 5:30 AM | GitHub Action | Workflow starts |
| 5:31 AM | Discussion | Posted to GitHub |
| 5:32 AM | Verify | Everything working |

---

## 🎉 Next Steps

After successful test:
1. ✅ Revert to production times (12:00 PM ET)
2. ✅ Document any issues found
3. ✅ Update documentation if needed
4. ✅ Prepare for production launch
5. ✅ Create challenges for Days 2-17

---

## 📞 Quick Commands

```bash
# Check current time
date

# Push changes
git push origin challenges

# Trigger workflow manually
gh workflow run post-challenge.yml -f day=1

# Check workflow status
gh run list --workflow=post-challenge.yml

# View workflow logs
gh run view --log

# Test posting locally
export GITHUB_TOKEN=your_token
npm run challenge:test

# Check site locally
npm run dev
```

---

**Good luck with the test! 🚀**

Remember: This is just a test. After it works, revert the times back to 12:00 PM ET for the real launch!
