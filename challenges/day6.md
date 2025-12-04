# Day 6: The Festival Feedback System 🎪💬

**Welcome Back, AI Engineer!**

The Winter Festival is magical thanks to your work! But there's a problem: **feedback is chaos.** 

The coordinator has been frantically scribbling notes on sticky papers all day - complaints, questions, suggestions - with no system to track what's urgent vs. what can wait. They're drowning in Post-its! 📝❄️

**Your mission:** Set up a proper GitHub repository for festival feedback and build an **automated triage system** with GitHub Actions + goose that categorizes and labels everything instantly.

---

## 🎯 Your Challenge

Build a feedback triage system that:
- Creates a GitHub repository for tracking feedback
- Sets up GitHub Actions to trigger on new issues
- Uses goose to automatically analyze, categorize, and label issues
- Triages real festival feedback from the coordinator's notes

**You'll learn:** How to use goose in CI/CD pipelines for real-world automation and understand GitHub Actions workflows.

---

## 🛠️ What You Need

**Tools:**
- **goose CLI** (installed and configured)
- **GitHub account** (free)
- **GitHub CLI (gh)** OR **GitHub MCP extension** (your choice!)
- **API key** for your LLM provider (stored as GitHub Secret)

**Pro tip:** Start a goose session and ask it to help you set everything up!

---
### NEED LLM CREDITS?

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter! 

**Use the ACCESS CODE: `ADVENTDAY6`**

## 📋 Requirements

**Must Have:**
- 🗂️ GitHub repository created for feedback
- ⚙️ GitHub Actions workflow that triggers on new issues
- 🤖 Workflow runs goose to analyze and triage issues
- 🔑 API key configured as GitHub Secret
- 🏷️ At least 3 issues created and triaged by goose
- ✨ Issues labeled appropriately (urgent/feature/question/bug)
- 💬 goose adds helpful comments to each issue

**The Coordinator's Notes:**
We've prepared 3 real festival feedback items for you to triage:

1. [**Urgent Problem**](https://gist.github.com/blackgirlbytes/dd6ce0bf8b8aa4be72375066235776f0) - Heating system issue
2. [**Feature Request**](https://gist.github.com/blackgirlbytes/2782f180de24aa012f0e930248f822db) - Photo booth suggestion  
3. [**Question**](https://gist.github.com/blackgirlbytes/35dc9124d9f10417aaecc936f8d8cae6) - Lost and found location

Create these as GitHub issues and watch goose automatically categorize them!

---

## 🎁 Bonus Challenges (Pick Your Level!)

**🌟 Beginner Bonus:**
- Add priority levels (high/medium/low)
- Include emoji in comments for visual appeal
- Create issue templates to guide submissions
- Add a welcome message for first-time issue creators

**🌟🌟 Intermediate Bonus:**
- Trigger on issue comments (goose responds to questions)
- Create a daily summary issue with all new feedback
- Add sentiment analysis (positive/negative/neutral)
- Integrate with Slack/Discord notifications

**🌟🌟🌟 Advanced Bonus:**
- Multi-stage triage (goose asks clarifying questions)
- Link related issues automatically
- Generate weekly reports from issue data
- Smart duplicate detection
- Create a metrics dashboard

**🌟🌟🌟🌟 Ultimate Challenge:**
- Build a complete issue management system with automated routing, smart notifications, progress tracking, and analytics
- Deploy a bot that monitors and responds 24/7

---

## **📤 Share Your Work**

**📮 Required:** Submit your work to complete Day 6!

Post your solution in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 6**.  
**Accepted formats:**

- Screenshot of goose triaging issues (show the labels and comments goose added!)
- Link to your GitHub repository (if public)
- Screenshot of the GitHub Actions workflow running
- Link to a blog post about your solution
- Link to a video of you solving the problem

**Tag us on socials:**  
[Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## 📖 Quick Resources

**Essential:**
- [goose Documentation](https://block.github.io/goose)
- [CI/CD with goose](https://block.github.io/goose/docs/guides/using-goose-in-cicd.html)
- [GitHub CLI](https://cli.github.com)
- [GitHub MCP Extension](https://github.com/modelcontextprotocol/servers/tree/main/src/github)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)

---

## ✨ You Did It When...

You've got a GitHub repo with a working Actions workflow that automatically triages new issues using goose, properly labels them, and adds helpful comments. **Bonus points:** priority levels, sentiment analysis, or automated notifications!

---