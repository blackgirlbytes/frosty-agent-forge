# 🔄 Revert to Production Settings

**Run this AFTER testing is complete and successful!**

---

## Quick Revert Commands

```bash
# 1. Update challenge-utils.ts
# Change line 55-57 from:
#   const unlockDate = new Date('2024-12-' + String(decemberDate).padStart(2, '0') + 'T05:30:00-05:00');
# To:
#   const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T12:00:00-05:00');

# 2. Update post-challenge.yml
# Change all cron times from:
#   - cron: '30 10 1 12 *'
# To:
#   - cron: '0 17 1 12 *'

# 3. Commit and push
git add -A
git commit -m "revert: Change unlock time back to 12:00 PM ET for production

- Reverted unlock time from 5:30 AM to 12:00 PM ET
- Reverted GitHub Action from 10:30 UTC to 17:00 UTC
- Changed year from 2024 to 2025
- Removed TESTING comments

Ready for production launch!"

git push origin challenges

# 4. Merge to main (if ready for production)
git checkout main
git merge challenges
git push origin main
```

---

## Detailed Changes Needed

### File 1: `src/lib/challenge-utils.ts`

**Change this:**
```typescript
/**
 * Check if a challenge is unlocked based on current date/time
 * Challenges unlock at 12:00 PM ET (noon Eastern Time)
 * 
 * TESTING: Temporarily set to 5:30 AM ET for testing
 */
export function isChallengeUnlocked(challengeDay: number): boolean {
  const now = new Date();
  
  // Get the December date for this challenge
  const decemberDate = CHALLENGE_DATES[challengeDay];
  if (!decemberDate) return false;
  
  // TESTING: Temporarily using 5:30 AM ET instead of 12:00 PM ET
  // TODO: Change back to T12:00:00-05:00 after testing
  const unlockDate = new Date('2024-12-' + String(decemberDate).padStart(2, '0') + 'T05:30:00-05:00');
  
  return now >= unlockDate;
}
```

**To this:**
```typescript
/**
 * Check if a challenge is unlocked based on current date/time
 * Challenges unlock at 12:00 PM ET (noon Eastern Time)
 */
export function isChallengeUnlocked(challengeDay: number): boolean {
  const now = new Date();
  
  // Get the December date for this challenge
  const decemberDate = CHALLENGE_DATES[challengeDay];
  if (!decemberDate) return false;
  
  // Create unlock time: December [date], 2025 at 12:00 PM ET (UTC-5)
  // Note: December is EST (not EDT), so ET = UTC-5
  const unlockDate = new Date('2025-12-' + String(decemberDate).padStart(2, '0') + 'T12:00:00-05:00');
  
  return now >= unlockDate;
}
```

### File 2: `.github/workflows/post-challenge.yml`

**Change this:**
```yaml
  # TESTING: Scheduled for 5:30 AM ET (10:30 UTC) for testing
  # TODO: Change back to noon ET (17:00 UTC) after testing
  # Production: noon ET = 17:00 UTC (5pm UTC during EST)
  schedule:
    # Days 1-5: Dec 1-5 (Mon-Fri)
    - cron: '30 10 1 12 *'  # Dec 1 at 5:30 AM ET (TESTING)
    - cron: '30 10 2 12 *'  # Dec 2 at 5:30 AM ET (TESTING)
    # ... etc
```

**To this:**
```yaml
  # Scheduled posting at noon ET (5pm UTC during EST, 4pm UTC during EDT)
  # December is EST (UTC-5), so noon ET = 5pm UTC
  schedule:
    # Days 1-5: Dec 1-5 (Mon-Fri)
    - cron: '0 17 1 12 *'  # Dec 1
    - cron: '0 17 2 12 *'  # Dec 2
    - cron: '0 17 3 12 *'  # Dec 3
    - cron: '0 17 4 12 *'  # Dec 4
    - cron: '0 17 5 12 *'  # Dec 5
    # Days 6-10: Dec 8-12 (Mon-Fri)
    - cron: '0 17 8 12 *'  # Dec 8
    - cron: '0 17 9 12 *'  # Dec 9
    - cron: '0 17 10 12 *' # Dec 10
    - cron: '0 17 11 12 *' # Dec 11
    - cron: '0 17 12 12 *' # Dec 12
    # Days 11-17: Dec 15-19, 22-23 (Mon-Fri)
    - cron: '0 17 15 12 *' # Dec 15
    - cron: '0 17 16 12 *' # Dec 16
    - cron: '0 17 17 12 *' # Dec 17
    - cron: '0 17 18 12 *' # Dec 18
    - cron: '0 17 19 12 *' # Dec 19
    - cron: '0 17 22 12 *' # Dec 22
    - cron: '0 17 23 12 *' # Dec 23
```

---

## Verification Checklist

After reverting, verify:

- [ ] `challenge-utils.ts` has `2025-12-` and `T12:00:00-05:00`
- [ ] `post-challenge.yml` has `'0 17` for all cron times
- [ ] No `TESTING` comments remain
- [ ] No `TODO` comments remain
- [ ] Committed with clear message
- [ ] Pushed to repository
- [ ] Deployed to production

---

## What Should Happen After Revert

### Before Dec 1, 2025 at 12:00 PM ET:
- All challenges locked
- Countdown shows time until Dec 1 noon

### At Dec 1, 2025 at 12:00 PM ET:
- Day 1 unlocks automatically
- GitHub Action posts discussion
- Users can access /challenges/1

### Each subsequent weekday at 12:00 PM ET:
- Next challenge unlocks
- GitHub Action posts discussion
- Pattern repeats for all 17 days

---

## Emergency Rollback

If something goes wrong after reverting:

```bash
# Rollback to test configuration
git revert HEAD
git push origin main

# Or restore from backup
git checkout a7b5276  # The test commit
git checkout -b emergency-fix
# Fix issues
git push origin emergency-fix
```

---

## Production Launch Checklist

After reverting to production settings:

- [ ] All times set to 12:00 PM ET / 17:00 UTC
- [ ] Year set to 2025
- [ ] Test comments removed
- [ ] Code pushed to main branch
- [ ] Deployed to production
- [ ] Environment variables set (GITHUB_TOKEN, etc.)
- [ ] `DISCUSSIONS_TOKEN` secret configured
- [ ] "Advent of AI" category exists in block/goose
- [ ] Challenges 2-17 markdown files created (optional for Day 1)
- [ ] Email notifications configured
- [ ] Monitoring set up

---

## Timeline for Production

| Date | Time | Event |
|------|------|-------|
| Dec 1, 2025 | 12:00 PM ET | Day 1 unlocks & posts |
| Dec 2, 2025 | 12:00 PM ET | Day 2 unlocks & posts |
| Dec 3, 2025 | 12:00 PM ET | Day 3 unlocks & posts |
| ... | ... | ... |
| Dec 23, 2025 | 12:00 PM ET | Day 17 unlocks & posts |

**All weekdays only - no weekends!**

---

## Support

If you need help after reverting:
1. Check GitHub Actions logs
2. Verify environment variables
3. Test locally with `npm run dev`
4. Review DEPLOYMENT_GUIDE.md
5. Check TROUBLESHOOTING section in docs

---

**Remember:** Don't revert until AFTER you've tested at 5:30 AM and verified everything works! 🚀
