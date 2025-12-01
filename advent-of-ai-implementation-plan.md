# Advent of AI - GitHub Discussions Implementation Plan

## Overview
Use GitHub Discussions to host challenge content and collect submissions.

## Architecture

### Frontend (adventofai.dev)
```
Calendar Box (Unlocked) 
  ↓ Click
  ↓
Opens GitHub Discussion in new tab
  ↓
User reads challenge & submits solution as comment
```

### Backend Requirements

1. **GitHub Discussion Creation**
   - Create 17 discussions (one per challenge)
   - Category: "Challenges" or "Advent of AI 2025"
   - Each discussion has:
     - Title: "Day X: [Challenge Name] [Emoji]"
     - Body: Full challenge content from Google Doc
     - Labels: `day-X`, `challenge`, `advent-2025`

2. **Calendar Integration**
   - Store discussion URLs in your database/config
   - When a challenge unlocks, enable the link
   - Link format: `https://github.com/block/goose/discussions/[discussion-number]`

3. **Data Structure**
```json
{
  "challenges": [
    {
      "day": 1,
      "date": "2025-12-01",
      "unlockTime": "12:00:00 ET",
      "title": "The Fortune Teller's Tent",
      "emoji": "🔮",
      "discussionUrl": "https://github.com/block/goose/discussions/123",
      "discussionNumber": 123,
      "locked": true
    },
    // ... 16 more
  ]
}
```

## Implementation Steps

### Step 1: Create Discussions via GitHub API

```javascript
// Using Octokit
const { Octokit } = require("@octokit/rest");

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function createChallengeDiscussion(day, title, body) {
  const response = await octokit.rest.discussions.create({
    owner: "block",
    repo: "goose",
    category_id: "YOUR_CATEGORY_ID", // Get from repo settings
    title: `Day ${day}: ${title}`,
    body: body
  });
  
  return response.data.html_url;
}
```

### Step 2: Format Challenge Content

Convert your Google Doc content to Markdown:

```javascript
function formatChallenge(challengeData) {
  return `
# Day ${challengeData.day}: ${challengeData.title} ${challengeData.emoji}

${challengeData.intro}

## 🎯 Your Challenge

${challengeData.challenge}

## 📋 Requirements

${challengeData.requirements}

## 🎁 Level Up (Bonus Challenges)

${challengeData.bonuses}

## 📤 Submit Your Solution

Share your solution by commenting below! Include:
- Screenshot or screen recording of your app in action
- Link to your code (optional)
- What you learned
- Any bonus challenges you completed

## 📚 Resources

${challengeData.resources}

---

**Need help?** Join us in [Discord](https://discord.gg/goose-oss) #adventofai channel
`;
}
```

### Step 3: Update Calendar on adventofai.dev

```javascript
// When rendering calendar boxes
function renderCalendarBox(challenge) {
  const isUnlocked = new Date() >= new Date(challenge.unlockTime);
  
  return `
    <div class="calendar-box ${isUnlocked ? 'unlocked' : 'locked'}">
      <div class="day-number">${challenge.day}</div>
      <div class="date">DEC ${challenge.date.split('-')[2]}</div>
      ${isUnlocked 
        ? `<a href="${challenge.discussionUrl}" target="_blank" class="challenge-link">
             ${challenge.emoji} ${challenge.title}
           </a>`
        : `<div class="locked-label">LOCKED</div>`
      }
    </div>
  `;
}
```

### Step 4: Scheduled Unlocking

Option A: **Client-side (Simple)**
```javascript
// Check every minute if new challenges should unlock
setInterval(() => {
  checkForUnlocks();
}, 60000);

function checkForUnlocks() {
  const now = new Date();
  challenges.forEach(challenge => {
    if (now >= new Date(challenge.unlockTime) && challenge.locked) {
      challenge.locked = false;
      updateCalendarUI();
    }
  });
}
```

Option B: **Server-side (Better)**
```javascript
// Cron job runs at 12:00 PM ET daily
// Updates database to mark challenge as unlocked
// Sends notification emails to subscribers
```

## Email Notification Template

When a challenge unlocks, send email to subscribers:

```
Subject: 🎄 Day ${day} Challenge Unlocked: ${title}

Hi there!

Day ${day} of Advent of AI is now live!

Today's Challenge: ${title} ${emoji}
${shortDescription}

👉 Start the challenge: ${discussionUrl}

⏰ Solution video drops tomorrow at 12 PM ET

See you in the discussions!
- The goose team

---
Unsubscribe | View in browser
```

## GitHub Discussion Template

Create a discussion template in `.github/DISCUSSION_TEMPLATE/challenge.md`:

```markdown
---
title: "Day X: [Challenge Name] [Emoji]"
labels: ["challenge", "advent-2025", "day-X"]
---

# Day X: [Challenge Name] [Emoji]

[Challenge content]

---

## 📤 Submit Your Solution

Share your solution by commenting below! Include:
- [ ] Screenshot or screen recording
- [ ] What you learned
- [ ] Bonus challenges completed

## 🏆 Hall of Fame

Outstanding solutions will be featured here!

---

**Next Challenge:** Day X+1 unlocks tomorrow at 12 PM ET
```

## Automation Ideas

### 1. Auto-create all discussions at once
```bash
# Script to create all 17 discussions
node scripts/create-advent-discussions.js
```

### 2. Schedule unlocks
```javascript
// Store in database
{
  day: 1,
  discussionNumber: 123,
  unlocksAt: "2025-12-01T17:00:00Z" // 12 PM ET
}
```

### 3. Track engagement
```javascript
// Use GitHub API to fetch discussion stats
async function getDiscussionStats(discussionNumber) {
  const discussion = await octokit.graphql(`
    query {
      repository(owner: "block", name: "goose") {
        discussion(number: ${discussionNumber}) {
          comments {
            totalCount
          }
          reactions {
            totalCount
          }
        }
      }
    }
  `);
  return discussion;
}
```

## Migration from Google Doc

You'll need to:
1. Extract each day's content from your Google Doc
2. Convert to Markdown
3. Create discussions via API
4. Store discussion URLs in your config

Would you like me to help you with:
- A script to create all 17 discussions?
- Converting your Google Doc content to Markdown?
- The calendar unlock logic?
