
# **Day 9: The Gift Tag Generator 🎁✨**

## **Welcome Back, AI Engineer**

The Winter Festival gift exchange is tomorrow, and there's a problem.

Maya, the festival coordinator, just realized they have **50+ gifts** ready to distribute to volunteers, performers, and special guests... but **no gift tags**!

*"We need personalized tags for EVERY gift! Each one needs the recipient's name, what's inside, who it's from, and it needs to match our festival aesthetic. I could write them all by hand but that would take HOURS!"*

She turns to you hopefully:

*"You've been doing all that amazing goose stuff... can you help? We need something we can run over and over with different details."*

That's when it hits you: **This is the perfect use case for a parameterized recipe!**

---

## **Your Mission: Build a Reusable Gift Tag Generator**

Create a goose recipe that accepts parameters and generates beautifully formatted gift tags on demand.

**What Makes This Different:**
* **Previous Days:** Your recipes were specific to one task
* **Today:** You're creating a **parameterized recipe** - same recipe, different inputs each time

---

## **🎯 What You'll Build**

A recipe called `gift-tag-generator.yaml` that accepts these parameters:

**Required:**
* **recipient_name** - Who's receiving the gift
* **gift_description** - What's inside
* **sender_name** - Who it's from
* **tag_style** - The aesthetic (elegant, playful, minimalist, or festive)

**Optional:**
* **include_poem** - Whether to add a short festive poem (true/false)

**Example:**
```bash
goose run gift-tag-generator.yaml \
  --recipient_name "Sofia the Storyteller" \
  --gift_description "Hand-knitted winter scarf" \
  --sender_name "The Festival Team" \
  --tag_style "elegant" \
  --include_poem true
```

---

## **🎨 What Maya Needs**

Each gift tag should look something like this:

```
╔════════════════════════════════════════════════╗
║              🎁 GIFT TAG 🎁                    ║
║                                                ║
║  TO: Sofia the Storyteller                     ║
║  GIFT: Hand-knitted winter scarf               ║
║  FROM: The Festival Team                       ║
║                                                ║
║  "Wrapped with warmth and winter cheer,       ║
║   A gift to brighten your new year!"          ║
╚════════════════════════════════════════════════╝
```

**The tag style should change based on the `tag_style` parameter:**
* **elegant** - Classic borders, sophisticated language
* **playful** - Fun emojis, casual tone
* **minimalist** - Clean lines, simple design
* **festive** - Lots of winter/holiday decorations

---

## **🛠️ How to Build Your Recipe**

### **NEED LLM CREDITS?**

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter! 

**Use the ACCESS CODE: `ADVENTDAY9`**

### **Key Resources:**
* [Recipe Reference - Parameters](https://block.github.io/goose/docs/guides/recipes/recipe-reference#parameters)
* [Advanced Recipe Tips (Video)](https://block.github.io/goose/docs/guides/recipes/)

### **Recipe Structure:**
```yaml
name: Gift Tag Generator
description: Generate personalized gift tags

parameters:
  recipient_name:
    type: string
    description: Who's receiving the gift
    required: true
  # ... define other parameters
  
instructions: |
  You are a gift tag designer...
```

---

## **📋 Requirements**

**Your Recipe Must:**
✅ Be saved as `gift-tag-generator.yaml`  
✅ Accept all 5 parameters (4 required, 1 optional)  
✅ Generate beautifully formatted gift tags  
✅ Adapt design based on `tag_style` parameter  
✅ Be reusable with different inputs

**Your Testing:**
✅ Generate at least 3 different gift tags  
✅ Test at least 2 different styles  
✅ Try with and without poems

---

## **🎁 Bonus Challenges**

* **Add a `color_scheme` parameter** (winter blues, warm reds, elegant gold)
* **Support multiple output formats** (markdown, HTML, plain text)
* **Generate multiple tags at once** from a CSV file
* **Export to PDF** ready for printing

---

## **📤 Share Your Work**

**📮 Required:** Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 9**.

**Share:**
* Your `gift-tag-generator.yaml` file
* Screenshots of 3+ different gift tags
* The parameter combinations you tested

**Tag us:** [Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## **✅ Success Criteria**

You've completed Day 9 when:

✅ You've created a working `gift-tag-generator.yaml` recipe  
✅ It accepts all 5 parameters correctly  
✅ You've generated tags for different recipients  
✅ The style changes based on the `tag_style` parameter  
✅ You understand how parameters make recipes reusable

**The "Aha!" Moment:** Any repetitive task with variation (reports, emails, documents, tags) can become a parameterized recipe. Build the template once, use it forever with different inputs. 🚀