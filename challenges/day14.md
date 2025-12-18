# Day 14: The Festival Operations Manual 📚✨

## Welcome Back, AI Engineer

The Winter Festival was a MASSIVE success. So massive, in fact, that the Festival Director just got off a call with three neighboring towns who want to run their own winter festivals next year.

But there's a problem: **all the knowledge is trapped in people's heads.**

Madame Zelda knows exactly how to handle skeptical customers and keep the fortune line moving. Marcus has memorized the security protocols and knows which vendors cause trouble. Maria developed a whole system for the lost & found that cut resolution time in half. Elena figured out the perfect workflow for last-minute poster requests.

The Festival Director gathers everyone in the main tent:

> "We can't send our entire team to three different towns. We need to capture what you all know - your expertise, your workflows, your hard-won lessons - so that ANY festival coordinator can tap into it. We need an **Operations Manual**... but not a boring PDF that nobody reads. Something that actually HELPS people in the moment."

You realize this is the perfect use case for **goose Skills** - reusable sets of instructions that teach goose domain expertise. Instead of a static document, you'll create living knowledge that goose can apply whenever someone needs help.

**Your mission:** Create a Festival Operations Skill that captures the team's expertise and can be shared with any future festival organizer.

**Today's lesson:** Creating and using Skills - portable, shareable expertise for goose

---

## 🎯 Your Challenge: Build The Operations Manual Skill

The Festival Director needs you to capture the team's knowledge into a skill that any coordinator can use. When someone asks goose "How do I handle an angry vendor?" or "What's the closing checklist?", goose should know exactly what to do - because you taught it.

**This teaches you:** How to create Skills that give goose domain expertise, making your knowledge portable and shareable across projects, teams, and even tools (Skills work in Claude Desktop too!).

### Your Task:

Create a `festival-operations` skill that captures the team's expertise. The skill should help with common festival scenarios that coordinators face.

⚠️ **You'll need:**
- goose version **1.17.0 or higher** (check with `goose --version`)
- **Skills extension enabled** (Settings → Extensions → Skills)
- Developer extension enabled (to create files)

---

## 💳 Need LLM Credits?

Sign up at [goose-credits.dev](https://goose-credits.dev) to get free credits for Claude Sonnet 4.5 via OpenRouter.

Use the ACCESS CODE: **ADVENTDAY14**

---

## 📋 The Team's Expertise to Capture

The Festival Director has gathered notes from each team member. Your skill should incorporate this knowledge:

### From Madame Zelda (Customer Experience):
```
HANDLING DIFFICULT CUSTOMERS:
- Always acknowledge their frustration first
- Offer alternatives, never just say "no"
- If someone's been waiting 20+ min, bump them up with a "VIP reading"
- Skeptics get the "mysterious stranger" fortune style - it wins them over
- Kids under 10 get the "adventure quest" style - parents love it

KEEPING THE LINE MOVING:
- Fortunes should be 2-3 minutes max
- If someone wants to chat, offer a "extended reading" slot for later
- Always have 5 pre-written fortunes ready for rush periods
```

### From Marcus (Security & Vendor Relations):
```
VENDOR ISSUES:
- Food vendors: Check health permits BEFORE they set up, not after
- Noise complaints: First warning is verbal, second is written, third is shutdown
- Vendor disputes: Never take sides publicly, mediate in the back office
- Payment issues: All vendors must pay 50% upfront, balance day-of

SECURITY PROTOCOLS:
- Lost child: Code Yellow - all exits notify, description broadcast
- Medical emergency: Code Blue - clear path to medical tent, call 911
- Weather emergency: Code White - announce shelter locations, secure loose items
- Suspicious activity: Code Orange - security team converges, don't confront alone
```

### From Maria (Lost & Found):
```
INTAKE PROCESS:
- Photo EVERYTHING before storing
- Tag with: item description, location found, time, finder's name
- High-value items (phones, wallets, jewelry) go in locked cabinet
- Perishables (food, drinks) disposed after 2 hours

MATCHING PROCESS:
- Ask claimants to describe item BEFORE showing it
- Check ID for high-value items
- Log all claims (successful and unsuccessful)
- Unclaimed items after 30 days go to charity

COMMON PATTERNS:
- Ice rink = mittens and scarves (check there first)
- Food court = phones and wallets (people put them down to eat)
- Kids areas = stuffed animals (URGENT - kids are devastated)
```

### From Elena (Marketing & Communications):
```
LAST-MINUTE REQUESTS:
- Poster changes: Need 2 hours minimum for print shop
- Social media posts: Can do in 15 minutes if content is provided
- Press inquiries: Route to Festival Director, never speak on record
- Sponsor logo additions: Check contract first, some have exclusivity

EMERGENCY COMMUNICATIONS:
- Weather delays: Post to all channels simultaneously
- Event cancellations: Email ticket holders FIRST, then public announcement
- Good news: Social media first, email newsletter follows
```

---

## 🛠️ The Tool: goose Skills

### What is a Skill?

A skill is a markdown file with YAML frontmatter that teaches goose domain expertise. When goose starts a session, it discovers available skills and can load them when relevant.

### Skill File Structure

Each skill lives in its own directory with a `SKILL.md` file:

```
~/.config/goose/skills/
└── festival-operations/
    ├── SKILL.md           # Required: The skill definition
    ├── checklists/        # Optional: Supporting files
    │   ├── opening.md
    │   └── closing.md
    └── templates/         # Optional: Templates goose can use
        └── incident-report.md
```

### SKILL.md Format

```markdown
---
name: festival-operations
description: Expert knowledge for running winter festival operations
---

# Festival Operations Guide

[Your skill content here - this is what goose learns]
```

### Skill Locations (Priority Order)

goose checks these directories and combines what it finds:

| Directory | Scope | Priority |
|-----------|-------|----------|
| `~/.claude/skills/` | Global, Claude compatible | 1 (lowest) |
| `~/.config/goose/skills/` | Global, goose-specific | 2 |
| `./.claude/skills/` | Project-specific, Claude compatible | 3 |
| `./.goose/skills/` | Project-specific | 4 (highest) |

**Pro tip:** Use `~/.config/goose/skills/` for personal skills you want everywhere. Use `./.goose/skills/` for project-specific expertise.

### How Skills Get Used

1. **Discovery:** When goose starts, it scans skill directories
2. **Instructions:** goose adds available skills to its knowledge
3. **Loading:** When you ask something relevant, goose loads the skill
4. **Application:** goose applies the skill's expertise to help you

You can also explicitly ask: *"Use the festival-operations skill to help me handle this vendor complaint"*

---


### Skills vs Recipes - What's the Difference?

| Aspect | **Recipes** | **Skills** |
|--------|-------------|------------|
| **Purpose** | Run a specific task | Provide domain knowledge |
| **When used** | Explicitly run by user | Automatically available in sessions |
| **Analogy** | A script you execute | A reference guide you consult |
| **Example** | "Generate a poster for this event" | "How to handle vendor disputes" |

**Think of it this way:**
- **Recipes** = "Do this task"
- **Skills** = "Know this stuff"

---

## 📝 Requirements

### Core Functionality:
✅ Create a skill directory at `~/.config/goose/skills/festival-operations/`
✅ Create a `SKILL.md` file with proper frontmatter (`name` and `description`)
✅ Include at least 4 sections covering different expertise areas
✅ Incorporate knowledge from all 4 team members
✅ Include at least 2 supporting files (checklists, templates, etc.)

### The Skill Must:
✅ Be discoverable by goose (appears when you ask "what skills do you have?")
✅ Be loadable (goose can use it when relevant)
✅ Provide actionable guidance (not just information, but what to DO)
✅ Be shareable (someone else could copy your skill folder and use it)

### Test Your Skill:

Ask goose this question to verify your skill is working:

> "A vendor is playing music too loud and neighboring vendors are complaining. What should I do?"

goose should respond with the specific protocol from your skill (verbal warning → written warning → shutdown).

---

## 🎁 Level Up (Bonus Challenges)

### Beginner ⭐:
- Add more sections (volunteer management, weather contingencies)
- Create a quick-reference checklist as a supporting file
- Add emoji and formatting to make the skill scannable
- Test in both goose Desktop and CLI

### Intermediate ⭐⭐:
- Create multiple related skills (one per department)
- Add a `templates/` folder with incident report templates
- Include decision trees for complex scenarios
- Test that the skill works in Claude Desktop too (Claude compatibility!)

### Advanced ⭐⭐⭐:
- Create a skill that references other skills ("see security-protocols skill")
- Add scripts in supporting files that goose can run
- Build a skill generator recipe that interviews experts and creates skills
- Create a skill testing checklist to validate skill quality

### Ultimate Challenge ⭐⭐⭐⭐:
**Build a "Mini Me" Skill** - Create a skill that captures YOUR expertise as an AI engineer. Include:
- How you like to approach problems
- Your coding preferences and standards
- Your communication style
- Common decisions you make repeatedly
- Your debugging workflow

The goal: Could someone else use your skill and get goose to work the way YOU would work? Make yourself portable! 🧠

---

## 📤 Share Your Work

**📮 Required:** Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 14**.

**Accepted Formats:**
- Screenshot of goose responding to a question using your skill
- Link to a blog post about your solution
- Link to a video of you solving the problem
- Link to your skill files (repo or gist)

**Tag us:** [Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## 📚 Resources for AI Engineers

### Essential Reading:
- [Skills Extension Documentation](https://block.github.io/goose/docs/mcp/skills-mcp) - Complete reference
- [Using Skills Guide](https://block.github.io/goose/docs/guides/context-engineering/using-skills) - How to create and use skills
- [goose Documentation](https://block.github.io/goose/) - Full reference

### Related Concepts:
- [.goosehints](https://block.github.io/goose/docs/guides/context-engineering/using-goosehints) - Project-level context (different from skills!)
- [Recipes](https://block.github.io/goose/docs/guides/recipes/) - Task automation (complements skills)

### Claude Compatibility:
- Skills use the same format as Claude Desktop
- goose discovers skills from both `.claude/skills/` and `.goose/skills/`
- Share skills between tools or create tool-specific versions

---

## ✅ Success Criteria

You'll know you've completed Day 14 when:

✅ You're running goose version 1.17.0 or higher
✅ You've enabled the Skills extension
✅ You've created a skill directory with `SKILL.md`
✅ Your skill has proper YAML frontmatter (`name` and `description`)
✅ Your skill covers at least 4 areas of expertise
✅ You've included at least 2 supporting files
✅ goose can use your skill to answer the vendor noise complaint question
✅ You understand the difference between Skills and Recipes

---

**Ready to capture some expertise? Create your skills directory and let's preserve that festival knowledge!** 🚀