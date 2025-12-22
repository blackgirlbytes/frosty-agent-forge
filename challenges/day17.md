
---

# **🎄 Day 17: The Winter Wishlist App**

## **📖 The Story**

It's the final night of the Winter Festival, and there's one last magical tradition to bring to life.

In the center of the festival stands an ancient, frost-covered mailbox known as the Winter Fairy's Wishbox. For generations, children (and let's be honest, adults too) have written their wishes on paper and dropped them in, hoping the Winter Fairy would see them.

But this year, the Festival Director wants to modernize the magic. Instead of paper wishes that get lost or soggy, she wants a digital wishlist that appears beautifully right inside goose \- like magic appearing in the conversation\!

"Imagine," she says, eyes sparkling, someone sends their wish to goose \- just type what your heart desires \- and poof \- it appears in a beautiful, enchanted list."\!

This is your final challenge: Build the Winter Fairy's digital wishbox using MCP UI \- a way to render beautiful visual interfaces directly inside the chat.

---

## **📋 Requirements**

### **Core Challenge: Build the Wishlist App**

Create an MCP-UI server that renders a magical wishlist UI directly in goose.

1. **Make a Wish** 🌟

   * Tell goose something like: *"I wish for warm mittens"* or *"Add 'snow on Christmas' to my wishbox"*  
   * Each wish has: the wish itself, category (toy/experience/kindness/magic), and how much they want it (dream wish/hopeful wish/small wish)  
   * The updated wishbox UI appears showing your new wish\!

2. **View Your Wishes** ✨

   * Ask goose: *"Show me my wishes"* or *"What's in my wishbox?"*  
   * A beautiful, magical UI renders displaying all your wishes  
   * Wishes are styled by how much you want them (dream wishes glow brighter\!)

3. **Grant a Wish** 🧚

   * Tell goose: *"My mittens wish came true\!"* or *"Grant the snow wish"*  
   * The UI re-renders with that wish sparkling as granted ✨

4. **Release a Wish** 🍃  
5.   
   * Tell goose: *"Remove the mittens wish"* or *"Let go of my first wish"*  
   * The wishbox UI updates without that wish

6. **Works in goose** 🪿  
   * Your MCP server runs locally  
   * Every time you talk to goose about your wishes, the UI magically appears

---

### Example Conversation

```
You: "Dear Winter Fairy, I wish for a cozy scarf"

goose: ✨ Your wish has been added to the Wishbox!

┌─────────────────────────────────────────────┐
│     ✨ WINTER FAIRY'S WISHBOX ✨            │
├─────────────────────────────────────────────┤
│  🌟 A cozy scarf                            │
│     Category: Clothing                       │
│     Status: ⏳ Awaiting fairy magic...      │
└─────────────────────────────────────────────┘

You: "Show me all my wishes"

goose: ✨ Here's your Wishbox!

┌─────────────────────────────────────────────┐
│     ✨ WINTER FAIRY'S WISHBOX ✨            │
├─────────────────────────────────────────────┤
│  🌟 A cozy scarf                            │
│     ⏳ Awaiting fairy magic...              │
│                                             │
│  ✅ Hot cocoa by the fire                   │
│     ✨ GRANTED!                             │
└─────────────────────────────────────────────┘

You: "The scarf wish came true!"

goose: ✨ How wonderful! Your wish has been granted!

┌─────────────────────────────────────────────┐
│     ✨ WINTER FAIRY'S WISHBOX ✨            │
├─────────────────────────────────────────────┤
│  ✅ A cozy scarf                            │
│     ✨ GRANTED!                             │
│                                             │
│  ✅ Hot cocoa by the fire                   │
│     ✨ GRANTED!                             │
└─────────────────────────────────────────────┘
```

## NEED LLM CREDITS?

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter.

**Use the ACCESS CODE:** `ADVENTDAY17`

## **Resources 📚**

* Video: [How to Build an MCP-UI Server](https://www.youtube.com/watch?v=Kxj-vFBO_9U)  
* Tutorial: [Build an MCP-UI Server in TypeScript](https://mcpui.dev/guide/server/typescript/walkthrough)   
* Tutorial: [Build an MCP-UI Server in Python](https://mcpui.dev/guide/server/python/walkthrough)  
* [Convert to MCP-UI app to a ChatGPT App](https://mcpui.dev/guide/apps-sdk)   
* [Guide: What is MCP-UI?](https://mcpui.dev/guide/introduction)  
* [MCP UI Specification](https://modelcontextprotocol.io/docs/ui)  
* [Apps SDK Docs](https://developers.openai.com/apps-sdk)  
* [Getting Started Guide](https://developers.openai.com/apps-sdk/getting-started)  
* [Example Apps](https://github.com/openai/apps-sdk-examples)

### Inspiration

* [Bubble wrap repository](https://github.com/aharvard/mcp-bubble-wrap)  
* [Chess app example](https://x.com/gching/status/1988250074850488715) \- Real-time chess in ChatGPT and goose\!

## 🎁 Level Up (Bonus Challenges)

### Beginner ⭐

* Add wish categories (toys, experiences, kindness, magic)  
* Add priority levels (dream wish vs. small wish)  
* Make the UI extra magical (more emojis, sparkle effects, colors)  
* Add a "wish of the day" highlight  
* Include encouraging messages from the Winter Fairy

### Intermediate ⭐⭐

* **Deploy your MCP server remotely** (so it's not just localhost)  
* Host on a cloud service (Railway, Fly.io, etc.)  
* Configure goose to connect to your remote server  
* Share the server URL so others can use your wishbox\!

### Advanced ⭐⭐⭐

* **Make it a ChatGPT App** using the [ChatGPT Apps SDK](https://developers.openai.com/apps-sdk)  
* Same MCP server works in BOTH goose AND ChatGPT  
* Experience the "build once, run anywhere" magic of MCP  
* [See example](https://x.com/gching/status/1988250074850488715) of cross-platform MCP apps

### Ultimate Challenge ⭐⭐⭐⭐

* Add multiple wishlists (family wishbox, friends wishbox)  
* Implement "secret wishes" that only the fairy can see  
* Add wish history and statistics  
* Create a "grant random wish" feature for the fairy  
* Build an admin view for the Winter Fairy herself

## 📤 Share Your Work

**📮 Required:** Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 17**.

### Accepted Formats

* Screen recording of adding wishes and seeing the UI update  
* Screenshot of your MCP-UI server rendering inside goose  
* Blog post  
* Video

**Tag us:** [Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## **🎯 Success Criteria**

You'll know you've completed Day 17 when:  
* ✅ You've created an MCP server with wishlist tools  
* ✅ Your server returns MCP UI content (not just text)  
* ✅ The wishlist UI renders visually in goose  

