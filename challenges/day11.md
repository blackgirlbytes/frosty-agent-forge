## Day 11: The Fun House Photo Booth 📸✨

### Welcome Back, AI Engineer

The Winter Festival wants to add something magical to the entrance: a **Fun House Photo Booth** where visitors can take selfies with festive face filters \- snowflake crowns, reindeer antlers, frosty beards, sparkling effects\!

The festival director, Maya, has a vision: "I want people to open it on their phones, see themselves with fun filters in real-time, click a button, and boom \- instant winter magic photo they can share\!"

But here's the thing: Maya needs this built by tomorrow, and it's a lot of work for one person. You need to:

* Build a web app with camera access  
* Implement face detection  
* Create multiple fun filters  
* Make it mobile-friendly  
* Add photo capture and download  
* Write documentation

That's where **subagents** come in.

---

### **🎯 Your Mission: Build The Photo Booth App with Subagents**

Instead of building everything yourself, you'll **delegate work to specialized subagents** \- like having a dev team where each person handles a specific part of the project.

**This teaches you:** How to break down complex projects and use subagents to parallelize development work, and when to run them sequentially vs in parallel.

---

### NEED LLM CREDITS?

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter.

**Use the ACCESS CODE: `ADVENTDAY11`**

### **💡 The Subagent Approach**

Think of subagents as your temporary dev team. You're the tech lead \- you describe what needs to be built, and goose will create specialized subagents to handle different parts.

**Here's a suggested split (but you can organize it however you want\!):**

**Subagent 1: Core App Builder**

* Creates the web app structure (HTML/CSS/JS)  
* Sets up camera access and video preview  
* Handles photo capture and download  
* Makes it mobile-responsive

**Subagent 2: Filter Engineer**

* Implements face detection (using a library like face-api.js or MediaPipe)  
* Creates the fun filters (snowflakes, antlers, beards, sparkles, etc.)  
* Handles filter switching and real-time application

**Optional Subagents (if you want to level up\!):**

* **Documentation Writer** \- Creates a README  
* **Test Engineer** \- Writes simple tests  
* **Stylist** \- Makes it look festive and polished  
* **Performance Optimizer** \- Ensures smooth camera/filter performance

---

### 🎨 What Filters Should It Have?

Get creative\! Here are some ideas:

* ✨ Sparkle effects around face  
* ⛄ Snowman nose and buttons  
* 🎄 Christmas tree hat

---

### **🔧 How to Use Subagents**

You'll use **natural language** to tell goose to create subagents and divide the work. goose automatically handles the coordination and execution.

**New to subagents?** Check out these resources to learn how they work:

**📖 Resources:**

* [Subagents Guide](https://block.github.io/goose/docs/guides/subagents) \- Complete guide on how to use subagents  
* [Orchestrating 6 Subagents Blog](https://block.github.io/goose/blog/2025/07/21/orchestrating-subagents) \- Real-world example of building an app with subagents  
* [Vibe Coding with goose: Building Apps with AI Agents](https://block.github.io/goose/blog/2025/08/10/vibe-coding-with-goose-building-apps-with-ai-agents) \- Workshop on building apps with subagents  
* [Agent Coordination Patterns](https://block.github.io/goose/blog/2025/08/14/agent-coordination-patterns) \- Understanding when to use sequential vs parallel execution

**🎥 Watch & Learn:**

* [Subagents Walkthrough Video](https://youtube.com/embed/Uk4TtJUykK4) \- Introduction to subagents  
* [How I Built an App with 6 Subagents](https://www.youtube.com/watch?v=yIBrD5AxtTc) \- Deep dive into real project

**💡 Key Concepts to Understand:**

**Sequential vs Parallel:**

* **Sequential**: Tasks run one after another (use keywords like "first...then", "after")  
* **Parallel**: Tasks run simultaneously (use keywords like "parallel", "simultaneously", "at the same time")

**Think about:** Does Subagent 2 need Subagent 1's work to be done first? Or can they work independently?

---

### **📝 Requirements**

**Core Functionality:**  
 ✅ Use goose to create and orchestrate subagents  
 ✅ Split the work between at least 2 subagents  
 ✅ Build a working web app that accesses the camera  
 ✅ Implement face detection  
 ✅ Create at least 3 fun face filters  
 ✅ Users can switch between filters  
 ✅ Users can capture and download photos  
 ✅ Works on mobile devices

---

### 🎯 Level Up (Bonus Challenges)

**Beginner 🌟:**

* Add more filters (5+ total)  
* Add a festive background or UI theme  
* Include a filter preview gallery  
* Add sound effects when taking photos

**Intermediate 🌟🌟:**

* Add 3+ more subagents (docs, tests, styling, etc.)  
* Create animated filters (moving snowflakes, blinking lights)  
* Add photo editing options (brightness, contrast)  
* Create a photo gallery to view captured photos

**Advanced 🌟🌟🌟:**

* Add face landmark tracking (filters follow face movement perfectly)  
* Create combo filters (multiple effects at once)  
* Add social media sharing functionality  
* Deploy it (Day 4 skills\!) so festival attendees can actually use it

**Ultimate Challenge 🌟🌟🌟🌟:**

* Build a complete photo booth system with:  
  * Multiple filter categories (winter, silly, elegant)  
  * Custom filter creator  
  * Photo booth mode (countdown timer, burst photos)  
  * Print-ready output  
  * QR code for easy access  
  * Deploy it live for the festival\!

---

## **📤 Share Your Work**

**📮 Required:** Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 11**.

**Accepted Formats:**
* Screenshot of your app
* Link to a blog post about your solution  
* Link to a video of you solving the problem  
* Link to your repo
* Link to your application

**Tag us:** [Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)