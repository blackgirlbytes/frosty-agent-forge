# Challenge Flow Implementation

## Overview
Users click on unlocked challenges on adventofai.dev → Modal opens with GitHub discussion content → "Share Your Solution" button takes them to GitHub to comment.

## What We Built

### 1. API Route: `/app/api/challenge/[day]/route.ts`
- Fetches GitHub discussion content via GitHub API
- Maps challenge days to discussion numbers
- Returns formatted data (title, body, URL, metadata)
- Caches responses for 5 minutes

**Configuration needed:**
```env
GITHUB_TOKEN=your_github_token_here
```

### 2. Challenge Modal Component: `/src/components/ChallengeModal.tsx`
- Displays challenge content in a beautiful modal
- Renders markdown from GitHub discussion
- Two CTAs:
  - **"Share Your Solution"** (primary) - Opens GitHub discussion
  - **"View on GitHub"** (secondary) - Also opens discussion
- Loading states and error handling
- Responsive design with frosted glass effect

### 3. Updated Calendar: `/src/components/ChallengeCalendar.tsx`
- Day 1 unlocked for testing (change `locked: i !== 0` to control)
- Unlocked challenges show unlock icon and pulse animation
- Click handler opens modal
- Visual distinction between locked/unlocked states

## User Flow

```
1. User visits adventofai.dev
   ↓
2. Sees calendar with Day 1 unlocked (unlock icon, "Available")
   ↓
3. Clicks Day 1 box
   ↓
4. Modal opens, fetches content from GitHub API
   ↓
5. Reads challenge in modal (markdown formatted)
   ↓
6. Clicks "Share Your Solution"
   ↓
7. Opens GitHub discussion in new tab
   ↓
8. User comments with their solution
```

## Next Steps

### Before Testing
1. Install dependencies:
   ```bash
   npm install react-markdown
   ```

2. Add GitHub token to `.env.local`:
   ```env
   GITHUB_TOKEN=ghp_your_token_here
   ```

3. Start dev server:
   ```bash
   npm run dev
   ```

### To Add More Challenges

Update the `DISCUSSION_MAP` in `/app/api/challenge/[day]/route.ts`:

```typescript
const DISCUSSION_MAP: Record<number, number> = {
  0: 5919, // Day 0 test
  1: XXXX, // Replace with actual Day 1 discussion number
  2: XXXX, // Day 2
  // ... etc
};
```

### To Control Which Days Are Unlocked

Edit `/src/components/ChallengeCalendar.tsx`:

```typescript
const challenges = Array.from({ length: 17 }, (_, i) => ({
  id: i + 1,
  day: i + 1,
  date: weekdayDates[i],
  locked: i !== 0, // Change this logic for different unlock behavior
}));
```

**Examples:**
- Unlock first 3 days: `locked: i > 2`
- Unlock based on date: `locked: new Date() < new Date('2025-12-01')`
- Unlock all: `locked: false`

## Creating GitHub Discussions

You'll need to create 17 discussions in the goose repo. For each one:

1. Go to https://github.com/block/goose/discussions
2. Click "New discussion"
3. Select "Advent of AI" category
4. Title: `Day X: [Challenge Name] [Emoji]`
5. Body: Full challenge content from your Google Doc (formatted as Markdown)
6. Post and note the discussion number from the URL
7. Add that number to `DISCUSSION_MAP`

## Automation Script (TODO)

You could create a script to:
1. Read challenge content from your Google Doc
2. Convert to Markdown
3. Create all 17 discussions via GitHub API
4. Update DISCUSSION_MAP automatically

Would you like help creating this script?

## Testing Checklist

- [ ] Day 1 shows as unlocked (unlock icon, "Available" text)
- [ ] Clicking Day 1 opens modal
- [ ] Modal fetches and displays content from GitHub
- [ ] Markdown renders correctly (headings, lists, code blocks)
- [ ] "Share Your Solution" button opens GitHub discussion in new tab
- [ ] Modal closes when clicking X or backdrop
- [ ] Locked days show lock icon and can't be clicked
- [ ] Mobile responsive

## Current Status

✅ API route created
✅ Modal component built
✅ Calendar updated with click handlers
✅ Day 1 unlocked for testing
⏳ Need to install `react-markdown`
⏳ Need to add GITHUB_TOKEN to env
⏳ Need to create actual Day 1 discussion with full content
⏳ Need to update DISCUSSION_MAP with real discussion numbers
