# Day 12: The Festival Mascot Crisis 🎭⛄

## Welcome Back, AI Engineer

The Winter Festival has been a MASSIVE success, and now the organizers want to make it official: they need a mascot.

But here's the problem. The Festival Committee has been arguing about this for THREE HOURS.

### The Debate So Far

- The Marketing Director wants a **snowman** ⛄ (Classic! Recognizable! Easy to make costumes!)
- The Entertainment Coordinator wants a **penguin** 🐧 (Cute! Marketable! Kids love penguins!)
- The Volunteer Manager wants a **polar bear** 🐻‍❄️ (Majestic! Powerful! Represents strength!)
- The Artistic Director wants a **magical ice fairy** 🧚 (Whimsical! Unique! Instagram-worthy!)
- The Local Historian wants a **friendly yeti** 🦣 (Mysterious! Fun! Tells a story!)

The Festival Director is exhausted. She slams her hand on the table.

> **"ENOUGH! I need MULTIPLE perspectives on this. Not just five people yelling. I want to hear from a pragmatist, a visionary, someone who thinks about systems, an optimist, a devil's advocate, a mediator, a user advocate, a traditionalist, AND a data analyst. Then we VOTE!"**

You realize this is the PERFECT use case for the Council of Mine MCP extension.  
Nine AI personalities who debate topics and vote democratically.

---

## 🎯 Your Mission: Convene the Council

Help the Festival Director settle the mascot debate by using the Council of Mine extension to get nine different perspectives, conduct democratic voting, and synthesize a final decision.

**This teaches you:**  
How MCP sampling enables extensions to create specialized AI agents that can think, debate, and make decisions using goose's AI capabilities.

### Requirements

1. Follow the [Council of Mine Extension docs](https://block.github.io/goose/docs/mcp/council-of-mine-mcp)
2. Prompt goose

---

## NEED LLM CREDITS?

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter.

**Use the ACCESS CODE:** `ADVENTDAY12`

---

## 💡 AI Engineering Skills You'll Learn

### Today's Focus: MCP Sampling

#### What is MCP Sampling?

MCP Sampling is a feature in the Model Context Protocol that allows MCP extensions to ask goose's AI for help with their tasks. Instead of just returning raw data, extensions can use goose's AI to:

- Analyze information intelligently
- Generate contextual responses
- Create multiple AI perspectives
- Make informed decisions

#### How It Works

```text
Normal Extension:
You → goose → Extension → Returns data → goose interprets

MCP Sampling Extension:
You → goose → Extension → Asks goose's LLM for help
→ Extension gets AI response → Returns intelligent analysis → goose
````

#### Why This Matters

* **Specialized agents:** Extensions become intelligent specialists, not just data providers
* **Distributed AI:** One extension can orchestrate multiple AI perspectives
* **Domain expertise:** Extensions combine their knowledge with AI reasoning
* **Novel interactions:** Create entirely new ways to use AI

#### Real-World Applications

* Multi-perspective analysis (like Council of Mine)
* Smart documentation that explains code in context
* Intelligent search that filters and ranks results
* Database analyzers with specific recommendations
* Code review systems with multiple expert viewpoints

---

## 🎯 Level Up (Bonus Challenges)

### Beginner 🌟

* Run a second debate: "What should the mascot's name be?"
* Run a third debate: "Should the mascot have a sidekick?"
* View past debates using `list_past_debates` and `view_debate`
* Try a completely different topic (favorite cookie, festival color scheme)

### Intermediate 🌟🌟

* Debate multiple related topics and compare results:

  * Mascot choice
  * Mascot name
  * Mascot personality traits
  * Mascot origin story
* Analyze how different council members voted across debates
* Create a summary document of all debates

### Advanced 🌟🌟🌟

* Run debates on increasingly complex topics:

  * "Should the festival expand to five days or stay at three?"
  * "What's the best way to make the festival more sustainable?"
  * "How should we balance tradition with innovation?"
* Compare how the council handles simple vs complex decisions
* Analyze voting patterns (does the Devil's Advocate always vote contrarian?)

### Ultimate Challenge 🌟🌟🌟🌟

* Build your own MCP sampling extension that creates specialized AI agents
* Follow the [Building Custom Extensions tutorial](https://block.github.io/goose/docs/tutorials/custom-extensions)
* Create a council of your own design (different personalities, different voting rules)
* Share your extension with the community

---

## 📤 Share Your Work

**📮 Required:**
Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 11**.

### Accepted Formats

* Screenshot of the council members debating
* Their final decision

**Tag us:**
[Discord](https://discord.gg/goose-oss) •
[Twitter/X](https://x.com/goose_oss) •
[YouTube](https://www.youtube.com/@goose-oss) •
[LinkedIn](https://www.linkedin.com/company/goose-oss) •
[Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## 📚 Resources for AI Engineers

### Essential Reading

* [Council of Mine Extension Docs](https://block.github.io/goose/docs/mcp/council-of-mine-mcp)

### Bonus Reading

* [MCP Protocol](https://modelcontextprotocol.io/)
* [goose Documentation](https://block.github.io/goose/)
* [MCP Sampling Guide](https://block.github.io/goose/docs/guides/mcp-sampling)
* [Council of Mine Repository](https://github.com/block/mcp-council-of-mine)
* [MCP Sampling Specification](https://modelcontextprotocol.io/specification/draft/client/sampling)
* [Building Custom Extensions](https://block.github.io/goose/docs/tutorials/custom-extensions)

---

## ✅ Success Criteria

You'll know you've completed Day 12 when:

* ✅ You've successfully installed the Council of Mine extension
* ✅ You've started a debate on the mascot topic
* ✅ You've seen all nine council member opinions
* ✅ You've conducted voting and seen the results


