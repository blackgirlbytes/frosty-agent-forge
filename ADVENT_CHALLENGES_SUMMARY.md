# 🎄 Advent of AI - Challenge Summary

## Overview
A 17-day challenge series (weekdays only, Dec 1-24, 2025) teaching AI engineering through the **goose** framework. Each day builds on previous skills while solving real Winter Festival problems.

---

## 📅 Challenge Breakdown

### **Day 1: The Fortune Teller's Tent** 🔮
**Crisis:** Madame Zelda's fortune-telling app crashed with 50 people in line  
**Solution:** CLI automation with `goose run`  
**Skills:** Command-line automation, rapid prototyping, one-off tasks  
**Output:** Generate winter fortunes with different personalities (grumpy, poetic, festive)  
**Key Learning:** Using AI for rapid prototyping via CLI

---

### **Day 2: The Storyteller's Booth** 🎪📖
**Crisis:** Storyteller has laryngitis, interactive booth needs to open now  
**Solution:** Build choose-your-own-adventure web app with goose Desktop  
**Skills:** Conversational development, developer extension, interactive UIs  
**Output:** Web app with branching story paths, multiple endings, winter styling  
**Key Learning:** Building complete applications through conversation, watching goose use tools transparently

---

### **Day 3: The Hot Cocoa Championship Crisis** 🏆☕
**Crisis:** Data analyst sick, need championship results visualized for awards ceremony  
**Solution:** Transform raw tournament data into visualizations with auto-visualiser extension  
**Skills:** Data visualization, MCP extensions, MCP-UI  
**Output:** Interactive charts (tournament bracket, vote distributions, recipe comparisons)  
**Key Learning:** Using MCP extensions to create interactive visualizations from unstructured data

---

### **Day 4: The Festival Website Launch** 🌐❄️
**Crisis:** Need website to promote next year's festival, zero budget, launch today  
**Solution:** Build and deploy website using multiple extensions (developer + Vercel/Netlify)  
**Skills:** Multi-extension workflows, deployment, end-to-end shipping  
**Output:** Live festival website with email signup, deployed to production  
**Key Learning:** Orchestrating multiple MCP extensions to go from idea to deployed website

---

### **Day 5: The Homecoming Board** ✈️❄️
**Crisis:** Need touchless display showing flight arrivals (gloves don't work on touchscreens)  
**Solution:** Build gesture-controlled flight tracker using MediaPipe + flight APIs  
**Skills:** Computer vision, gesture recognition, real-time data integration  
**Output:** Webcam app with hand gesture controls showing real flight data  
**Key Learning:** Using pre-trained AI models (MediaPipe) for computer vision applications

---

### **Day 6: The Festival Feedback System** 🎪💬
**Crisis:** Festival feedback is chaos - sticky notes everywhere, no organization  
**Solution:** GitHub repository with automated issue triage using GitHub Actions + goose  
**Skills:** CI/CD automation, GitHub Actions, production workflows  
**Output:** Automated system that labels and categorizes issues instantly  
**Key Learning:** Running goose in CI/CD pipelines for real-world automation

---

### **Day 7: The Lost & Found Data Detective** 🔍🧤
**Crisis:** Maria spends 2 hours organizing messy lost & found notes after every event  
**Solution:** Create a reusable recipe that transforms messy data into organized web app  
**Skills:** Creating shareable recipes, data cleaning, recipe architecture  
**Output:** Recipe that generates organized inventory web app from messy notes  
**Key Learning:** Building reusable recipes that anyone can use for any event

---

### **Day 8: Dmitri's Data Dilemma** 🤓📱
**Crisis:** Dmitri needs vendor data in machine-readable format (not human text)  
**Solution:** Use goose to output structured data (JSON) instead of conversational text  
**Skills:** Structured output, data formats, machine-readable vs human-readable  
**Output:** Clean JSON vendor data that apps can parse  
**Key Learning:** Discovering `--output-format json` and when to use structured output

---

### **Day 9: The Gift Tag Dilemma** 🎁
**Crisis:** 50+ gifts need personalized tags, print shop needs consistent format  
**Solution:** Create recipe with parameters for gift tag generation  
**Skills:** Recipe parameters, reusable templates  
**Output:** Parameterized recipe that generates formatted gift tags  
**Key Learning:** Using parameters to make recipes flexible and reusable

---

### **Day 10: The Festival Poster Generator** 🎨📢
**Crisis:** Elena spent 8 hours in Photoshop making 15 similar posters  
**Solution:** Build parameterized recipe with conditional logic for event posters  
**Skills:** Parameters + conditionals, Jinja2 templating, adaptive recipes  
**Output:** One recipe that generates different poster styles based on event type  
**Key Learning:** Using conditional logic to create recipes that adapt behavior based on parameters

---

### **Day 11: The Social Media Blitz** 📱✨
**Crisis:** Need to create platform-specific content for Instagram, Twitter, Facebook  
**Solution:** Main recipe that orchestrates sub-recipes for each platform  
**Skills:** Sub-recipes, recipe composition, workflow orchestration  
**Output:** Complete social media campaign from one command  
**Key Learning:** Breaking complex projects into specialized sub-recipes

---

### **Day 12: The Festival Gossip Column** 📰☕
**Crisis:** Festival needs daily entertainment - gossip column with ongoing storylines  
**Solution:** Scheduled recipe that generates daily gazette at 5 PM automatically  
**Skills:** Scheduled recipes, creative content generation, narrative continuity  
**Output:** Automated daily gossip column with recurring characters and storylines  
**Key Learning:** Using goose scheduling for automated content generation

---

### **Day 13: The Fun House Photo Booth** 📸✨
**Crisis:** Festival wants photo booth with face filters - lots of work for one person  
**Solution:** Use subagents to parallelize development (app builder + filter engineer)  
**Skills:** Subagent orchestration, task delegation, parallel development  
**Output:** Web app with camera access, face detection, and multiple fun filters  
**Key Learning:** Breaking down complex projects and using subagents like a dev team

---

### **Day 14: The Festival Mascot Crisis** 🎭☃️
**Crisis:** Committee can't decide on mascot - need multiple perspectives and democratic vote  
**Solution:** Use Council of Mine MCP extension (9 AI personalities debate and vote)  
**Skills:** MCP sampling, intelligent extensions, multi-perspective analysis  
**Output:** Democratic decision from 9 AI council members with reasoning  
**Key Learning:** How MCP sampling enables extensions to create intelligent agents

---

### **Day 15: The Festival Performance Mystery** 🔍⚡
**Crisis:** goose sessions have unpredictable performance - some fast, some slow  
**Solution:** Set up OpenTelemetry (OTLP) observability with Jaeger  
**Skills:** Observability, tracing, performance monitoring, production debugging  
**Output:** Visibility into goose operations with traces showing bottlenecks  
**Key Learning:** Using OpenTelemetry to monitor and debug AI workflows

---

### **Day 16: The Festival Countdown App** ⏰❄️
**Crisis:** People asking "when's the next festival?" - need countdown with email signup  
**Solution:** Build app using .goosehints and planning documents for structured development  
**Skills:** Project structure, .goosehints files, planning documents  
**Output:** Countdown app with rotating fun facts and email signup  
**Key Learning:** How project structure and planning make goose more effective

---

### **Day 17: The Winter Wishlist App** 🎁✨
**Crisis:** Gift shop needs wishlist system that works on phones (ChatGPT) and laptops (goose)  
**Solution:** Build MCP UI app that works in both ChatGPT and goose  
**Skills:** MCP UI, cross-platform AI apps, ChatGPT Apps SDK  
**Output:** Wishlist app that syncs between ChatGPT and goose in real-time  
**Key Learning:** Building once and shipping to multiple AI platforms

---

## 🎯 Skill Progression

### Week 1: Foundations
- **Day 1-2:** CLI automation → Conversational development
- **Day 3-4:** Data visualization → Multi-extension workflows → Deployment
- **Day 5-6:** Computer vision → CI/CD automation

### Week 2: Advanced Patterns
- **Day 7-8:** Reusable recipes → Structured output
- **Day 9-10:** Parameters → Conditionals
- **Day 11-12:** Sub-recipes → Scheduled automation

### Week 3: Production & Scale
- **Day 13-14:** Subagents → MCP sampling
- **Day 15-16:** Observability → Project structure
- **Day 17:** Cross-platform deployment

---

## 🛠️ Technologies Covered

### Core goose Concepts
- CLI commands (`goose run`, `goose session`)
- Desktop conversational interface
- Developer extension (file creation, shell commands)
- Recipe system (parameters, conditionals, sub-recipes)
- Scheduling system
- Subagents (parallel & sequential)

### MCP Extensions
- **Auto-visualiser:** Data visualization with MCP-UI
- **Vercel/Netlify:** Deployment
- **GitHub:** Issue management
- **Council of Mine:** Multi-perspective AI agents (MCP sampling)
- **YouTube Transcript:** Video caption generation

### External Technologies
- **MediaPipe:** Computer vision and gesture recognition
- **GitHub Actions:** CI/CD automation
- **OpenTelemetry/Jaeger:** Observability and tracing
- **ChatGPT Apps SDK:** Cross-platform AI apps

### Web Technologies
- HTML/CSS/JavaScript
- Single-page applications
- Mobile-responsive design
- Real-time data integration

---

## 📊 Challenge Statistics

- **Total Days:** 17 (weekdays only)
- **Difficulty Progression:** Beginner → Intermediate → Advanced
- **Project Types:** CLI tools, web apps, automation, recipes, extensions
- **Bonus Challenges:** 4 levels per day (Beginner ⭐ → Ultimate ⭐⭐⭐⭐)
- **Real-world Applications:** Event management, content generation, data processing, deployment

---

## 🎓 What Participants Learn

### Technical Skills
1. **AI Engineering Workflows:** From idea to production
2. **Extension Architecture:** Understanding MCP and how extensions work
3. **Recipe Development:** Creating reusable, shareable AI agents
4. **Production Patterns:** Scheduling, observability, CI/CD
5. **Cross-platform Development:** Build once, deploy everywhere

### Soft Skills
1. **Problem Decomposition:** Breaking complex projects into manageable pieces
2. **Planning & Structure:** When to plan vs. when to iterate
3. **Tool Selection:** Choosing the right approach for each problem
4. **Production Thinking:** Building for reliability and scale

---

## 🌟 Unique Aspects

1. **Narrative Continuity:** All challenges are connected through the Winter Festival story
2. **Progressive Complexity:** Each day builds on previous skills
3. **Real-world Problems:** Every challenge solves an actual use case
4. **Multiple Approaches:** Participants discover their own solutions
5. **Community Sharing:** Daily social media sharing with #AdventOfAI
6. **Bonus Challenges:** Self-paced depth for advanced learners

---

## 🎯 Success Metrics

Each day has clear success criteria:
- ✅ Core functionality working
- ✅ Understanding key concepts
- ✅ Ability to explain what was learned
- ✅ (Bonus) Additional features implemented

---

## 🔗 Resources

- **Main Site:** block.github.io/goose
- **Documentation:** Complete guides for each concept
- **Community:** Discord (#adventofai channel)
- **Social:** Twitter/X, YouTube, LinkedIn, Bluesky

---

## 🎉 The Big Picture

**Advent of AI** transforms developers into AI engineers through hands-on challenges that mirror real-world scenarios. By the end of 17 days, participants will have:

- Built 17+ working projects
- Mastered the goose framework
- Understood MCP architecture
- Created reusable recipes
- Deployed production applications
- Learned observability and monitoring
- Built cross-platform AI apps

All while having fun saving a Winter Festival! ❄️🎄
