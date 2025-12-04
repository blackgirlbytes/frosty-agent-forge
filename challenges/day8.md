# **Day 8: Dmitri's Data Dilemma 🤓📱**

## **Welcome Back, AI Engineer**

Meet Dmitri, the Festival's accidentally-hired "Digital Transformation Consultant." He showed up with a tablet, three chargers, and a very serious expression. The Festival Director thought she was hiring a "Digital Artist" to paint portraits, but Dmitri thought it said "Digital Architect."

This morning, he cornered you at the hot cocoa stand:

*"Look at this CHAOS! I tried to find food vendors and got... a crumpled paper map with hot cocoa stains! In 2025! I need this data in a PROPER FORMAT. Something my app can PARSE!"*

He hands you a crumpled napkin with vendor names. There's definitely a hot cocoa stain.

---

## **🎯 Your Mission: Save Dmitri's App (Sanity)**

**What You Need to Do:**
1. Take the messy vendor list (below)
2. Use goose to clean and structure it
3. Figure out how to get goose to output machine-readable data (json)
4. Save it to a file with a silly name

**The Challenge:** How do you make goose output data that a machine can read instead of pretty text for humans? 🤔

**Hint:** Try `goose run --help` - there might be something useful there...

---

## **📝 The Messy Vendor List**

```
╔═══════════════════════════════════════════════════════════╗
║          DMITRI'S NAPKIN NOTES (with stains!)            ║
╠═══════════════════════════════════════════════════════════╣
║  Joes hot cocoa - main plaza - hot drinks & pastries     ║
║  TACO TRUCK DEL FUEGO!!! north entrance mexican food     ║
║  sweet treats bakery, near the ice rink... cookies       ║
║  Pierogi Palace - east side - polish food                ║
║  Waffle Wonderland next to storytelling tent WAFFLES     ║
║  mamas meatballs - food court area - italian             ║
║  The Pretzel Pretender - west plaza - pretzels           ║
║  Curry in a Hurry mobile cart roams around               ║
║  Sushi on Ice - near skating rink - sushi                ║
║  PIZZA PALACE - main stage area - pizza slices           ║
╚═══════════════════════════════════════════════════════════╝
      ☕ <- (hot cocoa stain)
```

---

## **🎨 What Dmitri Wants**

```
╔═══════════════════════════════════════════════════════════╗
║             DMITRI'S DREAM OUTPUT                         ║
╠═══════════════════════════════════════════════════════════╣
║  {                                                        ║
║    "vendors": [                                           ║
║      {                                                    ║
║        "name": "Joe's Hot Cocoa",                         ║
║        "location": "Main Plaza",                          ║
║        "cuisine": "Hot drinks & pastries"                 ║
║      }                                                    ║
║    ]                                                      ║
║  }                                                        ║
╚═══════════════════════════════════════════════════════════╝
```

---

## **🛠️ Getting Started**

### **NEED LLM CREDITS?**

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter! 

**Use the ACCESS CODE: `ADVENTDAY8`**

---

## **🎁 Bonus Challenges**

* **Parse the output** with a Python/Node script
* **Build a simple HTML page** that displays the data
* **Create an HTTP server** that serves the data
* **Deploy it** so Dmitri can actually use it

---

## **📤 Share Your Work**

**📮 Required:** Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 8**.

**Accepted Formats:**
* Screenshot of your structured output
* Link to a blog post about your solution  
* Link to a video of you solving the problem  
* Link to your repo

**Tag us:** [Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## **Silly Filename Suggestions**

* `dmitris-definitely-not-a-disaster.json`
* `hot-cocoa-stain-free-data.json`
* `dmitris-sanity-saver.json`
* `no-more-napkin-notes.json`
* `taco-truck-locator-supreme.json`

---

## **✅ Success Criteria**

✅ You figured out how to get structured output from goose  
✅ You turned messy data into clean, parseable data  
✅ Dmitri's app could use your output  
✅ You saved it to a silly filename  

**The "Aha!" Moment:** Days 1-7 you made things for HUMANS. Day 8 you make things for MACHINES. Same goose. Different output. 🚀
