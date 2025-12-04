# **Day 7: The Lost & Found Data Detective 🔍🧤**

## **Welcome Back, AI Engineer**

The Winter Festival is in full swing, and your contributions have been legendary. But today's challenge is different.

The Lost & Found booth has been chaos since day one. Maria has been frantically scribbling lost items on scraps of paper and sticky notes. By the end of each day, she has a pile of messy notes that take her **2 hours to organize** before she can help people find their items.

Yesterday, she stayed until midnight trying to match a crying child with their lost teddy bear.

But here's the thing: **This isn't just a Winter Festival problem.** Maria runs lost & found at the Summer Fair, the Spring Concert Series, and the Autumn Harvest Festival too. Every event, same chaos.

And it's not just Maria. There are **hundreds of event coordinators** facing this exact problem at festivals, conferences, schools, and venues around the world.

## **Your Mission: Build a Recipe That Anyone Can Use**

Today, you're not just solving a problem for yourself. You're creating a **reusable recipe** that:

* **Works for Maria** at any of her events  
* **Works for other event coordinators** at their festivals  
* **Works for anyone** who needs to organize messy lost & found data

This is what makes goose recipes powerful: **You build it once, share it, and anyone can use it.**

---

## **Today's Lesson: Creating Shareable Recipes**

Up until now, you've been using goose interactively - you chat, it helps, you iterate. That's great for one-off tasks.

But what if you could **capture that expertise** and make it reusable? What if you could create a recipe that:

* **Knows its job** - Has domain expertise baked in  
* **Works independently** - Just give it data, it handles the rest  
* **Scales infinitely** - Handles 20 items or 200 items  
* **Works for anyone** - Share the recipe, they can use it too

That's what recipes are: **Shareable specialized agents.**

### **The Recipe You'll Create:**

A **Lost & Found Data Detective** that:

1. **Understands lost & found operations** - Recognizes duplicates, standardizes locations, categorizes items, matches pairs, assesses urgency  
2. **Cleans messy data** - Merges duplicates, standardizes formats, identifies patterns  
3. **Builds a web app** - Summary dashboard, organized inventory, potential matches highlighted, search/filter functionality  
4. **Works for anyone, anytime** - Same expertise, every time, no customization needed

---

## **📋 The Data: Festival Chaos**

Maria has given you messy notes from three different festival days. Your recipe should be able to handle **any of them** (or all of them!).

**Choose your dataset:**
* **[Day 1: Opening Day Chaos](https://gist.github.com/blackgirlbytes/ab0d76342a31d0c3fc8d7dc4539fc9a8)** - 20 items, everyone's excited and dropping things everywhere!
* **[Day 2: Peak Crowd Day](https://gist.github.com/blackgirlbytes/09b6be89352c572d27049cade39a3f69)** - 35 items, the busiest day with urgent items everywhere!
* **[Day 3: Family Day Frenzy](https://gist.github.com/blackgirlbytes/24f5201fb611aa88a62f6e4494952eb9)** - 45 items, families rushing around and leaving things behind!

Each dataset includes messy items like:
```
blue scarf, found near ice rink, 2pm
BLUE SCARF - ice skating area - 2:15pm
iPhone 13 pro, black case, storytelling tent, 3pm - URGENT
red mitten for kid, cocoa booth, around 2:30
```

Your recipe needs to turn this chaos into something organized and useful.

---

## **🛠️ How to Build Your Recipe**

### **NEED LLM CREDITS?**

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter! 

**Use the ACCESS CODE: `ADVENTDAY7`**

### **Step 1: Create the Recipe**
Use goose Desktop to build your recipe through conversation. Ask goose to help you create the recipe file and define the expertise it should have.

**Key resources:**
* [Recipe Guide](https://block.github.io/goose/docs/guides/recipes/) - Complete guide with examples  
* [How to Create Recipes](https://block.github.io/goose/docs/guides/recipes/session-recipes) - Step-by-step  
* [Recipe Tutorial](https://block.github.io/goose/docs/tutorials/recipes-tutorial) - Hands-on tutorial

### **Step 2: Define the Expertise**
Your recipe should know how to:
* Identify duplicates (blue scarf = BLUE SCARF)
* Standardize locations (ice rink = ice skating area)
* Categorize items (clothing, electronics, keys, etc.)
* Flag urgent items (electronics, jewelry, IDs)
* Match potential lost + found pairs

### **Step 3: Test and Iterate**
Run it with the data, see what it produces, refine the instructions.

### **Step 4: Generate the Web App**
Your recipe should create a beautiful web app that shows:

**Summary Dashboard:**
```
📊 SUMMARY OF FINDINGS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
• Total Entries: 32
• Unique Items: 18 (14 duplicates merged)
• Potential Matches: 6 pairs
• Urgent Items: 3 (electronics)

🚨 URGENT ITEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📱 iPhone 13 Pro - Storytelling Tent
💍 Gold Wedding Ring - Storytelling Tent

✅ MATCHED ITEMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🧣 Blue Scarf - Ice Rink (2 reports merged)
🔑 Toyota Keys - Parking Lot (2 reports merged)
```

**Organized Inventory:**
* Electronics (urgent - red highlight)
* Clothing (scarves, mittens, hats, jackets)
* Keys & Wallets
* Accessories (glasses, jewelry, watches)
* Other

**Features:** Search, filter by category, sort by urgency, mobile-responsive, festive winter theme

---

## **🎯 Requirements**

### **Your Recipe Must:**
✅ Accept messy lost & found data as input  
✅ Clean and standardize entries  
✅ Identify and merge duplicates  
✅ Match potential pairs  
✅ Categorize items and assess urgency  
✅ Generate a complete web app (HTML/CSS/JS)  
✅ Be reusable with different data  
✅ Be shareable with others

### **The Web App Must:**
✅ Display summary statistics  
✅ Highlight urgent items  
✅ Show matched pairs  
✅ Organize by categories  
✅ Be visually appealing and functional  
✅ Have a festive winter theme

---

## **🎁 Bonus Challenges**

Want to level up? Try:

* **Test all three datasets** - Run your recipe on Day 1, 2, and 3 data
* **Add real search/filter functionality** that works  
* **Make it mobile-responsive** for Maria's phone  
* **Create a multi-day view** combining all three datasets to show trends
* **Create export to PDF** for end-of-day reports  
* **Deploy the web app** (Day 4 skills!)  
* **Share your recipe publicly** with documentation

---

## **📤 Share Your Work**

**📮 Required:** Submit your work in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 7**.

**Accepted formats**
- Screenshot of your site
- Screenshot of goose triaging issues (show the labels and comments goose added!)
- Link to your GitHub repository (if public)
- Screenshot of the GitHub Actions workflow running
- Link to a blog post about your solution
- Link to a video of you solving the problem


**Tag us on socials:**  
[Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## **✅ Success Criteria**

You've completed Day 7 when:

✅ You've created a recipe using goose Desktop  
✅ The recipe processes lost & found data  
✅ It generates a functional web app  
✅ Duplicates are merged, urgent items flagged  
✅ Items are organized by category  
✅ The web app looks good and works well  
✅ You understand that recipes are shareable specialists

**You've leveled up when you realize:** This same pattern works for ANY repetitive data task - vendor inventories, volunteer schedules, feedback analysis, event planning. Build once, use forever, share with everyone.

---

**📚 Additional Resources**

* [goose Documentation](https://block.github.io/goose/)
* [Recipe Reference](https://block.github.io/goose/docs/guides/recipes/recipe-reference)
* [Community Recipes](https://block.github.io/goose/recipes)