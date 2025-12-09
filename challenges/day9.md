# Day 9: The Gift Tag Dilemma 🎁✨
## Welcome Back, AI Engineer

The Winter Festival gift exchange is tomorrow, and the organizers have a *major* problem:  
they’ve wrapped **50+ gifts** for volunteers, performers, and special guests…  
but **not a single gift tag exists**.

Maya, the festival coordinator, is spiraling. Each gift needs a personalized tag with:

- The recipient’s name  
- What the gift is  
- Who it’s from  
- A style that matches the festival aesthetic  

She *could* write them all by hand, but that would take hours.  
The print shop *could* help — but only if everything follows one consistent format.

That’s where you come in.

But just as you’re gearing up to help, Maya gets a call from the print shop:

> “Maya, we can do WAY more than basic tags.  
> QR codes. Specialty papers. Embossing. Multilingual greetings.  
> If you can give us structured data, we can make these tags *spectacular*.”

She turns to you — hopeful, desperate:

**“These tags can’t just be labels.  
They need to be an *experience*. Can you build a system that handles all of this?”**

Your Day 9 challenge begins.

---

## 🎯 Your Mission

Create a **`gift-tag-generator.yaml`** recipe that generates *beautiful, fully formatted, print-ready gift tags* using Goose.

These tags should adapt to different aesthetics, recipient preferences, languages, poems, layouts, and QR codes — all from parameters.

This is your first true **design-system recipe**.

---

## 🧩 Required Parameters  
Your recipe **must** support every one of these parameters:

- `recipient_name`  
- `gift_description`  
- `sender_name`  
- `tag_style` — one of: `elegant`, `playful`, `minimalist`, `festive`  
- `include_poem` — boolean
- `qr_message_url` — embed a working QR code if provided  
- `gift_size` — `small`, `medium`, or `large` (affects layout)  
- `recipient_preferences` (object):
  - `favorite_color`
  - `language` (supports multilingual greetings)
  - `tone` (formal, casual, humorous, heartfelt)

---

## 🧠 What Your Recipe Should Do

Your recipe should apply **smart logic + design rules** to produce a final output that changes dramatically depending on the inputs.

### Your recipe must:

#### **1. Generate dynamic, style-driven layouts**
`tag_style` should influence:
- typography  
- spacing  
- color palette  
- decorative elements  
- emoji (if appropriate)  
- composition  

#### **2. Handle multilingual content**
Greeting + optional poem should appear in:
- English  
- Spanish  
- French  
- (and more if you want!)

#### **3. Support QR code embedding**
If `qr_message_url` is present:
- Generate a QR code  
- Embed it **inside** the final HTML tag  

#### **4. Adapt based on gift size**
- `small` → compact, minimal layout  
- `medium` → balanced layout  
- `large` → more room for design elements  

#### **5. Generate a thoughtful, context-aware poem**
When `include_poem: true`, poem must:
- match the selected **tone**  
- reference the **gift**  
- fit the **style**  

#### **6. Output print-ready HTML**
This means:
- Valid HTML structure  
- Inline CSS  
- Dimensions appropriate for printing  
- Single-tag layout ready to save or export  
-Output a clean, print-ready HTML file containing only the tag itself, no preview wrappers or UI scaffolding. 

---

## 📦 Example Scenarios to Test

### **Scenario 1: Volunteer**
```yaml
recipient_name: "Sarah Chen"
gift_description: "Handmade scarf"
sender_name: "Festival Committee"
tag_style: "festive"
include_poem: true
qr_message_url: null
recipient_preferences:
  favorite_color: "red"
  language: "English"
  tone: "heartfelt"
gift_size: "medium"
```
### Scenario 2: The Performer (Advanced)
```yaml
recipient_name: "Marcus Rodriguez"
gift_description: "Professional microphone"
sender_name: "Winter Festival Team"
tag_style: "elegant"
include_poem: true
qr_message_url: "https://example.com/thank-you-marcus"
recipient_preferences:
  favorite_color: "navy blue"
  language: "Spanish"
  tone: "formal"
gift_size: "medium"
```

### Scenario 3: The Special Guest (Full Features)
```yaml
recipient_name: "Emma Thompson"
gift_description: "Artisan chocolate collection"
sender_name: "Mayor's Office"
tag_style: "minimalist"
include_poem: true
qr_message_url: "https://example.com/special-message"
recipient_preferences:
  favorite_color: "gold"
  language: "French"
  tone: "heartfelt"
gift_size: "small"
```
---

## 🎁 Bonus Challenges

### Beginner 🌟
- Add seasonal emoji that match each tag style  
- Include a version number or metadata footer  
- Try faux-foil or drop-shadow effects using CSS  

### Intermediate 🌟🌟
- Create print-ready PDFs  
- Implement a “batch mode” that processes multiple tags from a CSV file  
- Add custom font selections per style  
- Build a small gallery page that previews all styles  

### Advanced 🌟🌟🌟
- Generate real, scannable QR codes (not just placeholders)  
- Create a web interface for tag preview  
- Support custom logo or image uploads  
- Implement advanced layout algorithms (text wrapping, spacing, constraints)  
- Add a “theme builder” that lets users define their own styles  
- Export tags in multiple formats (PDF, PNG, etc.)  

### Ultimate Challenge 🌟🌟🌟🌟
Build a full **Gift Tag Management System** that can:

- Import recipient lists from CSV/Excel  
- Bulk-generate hundreds of tags  
- Track which tags have been printed  
- Support multiple events/festivals  
- Create a print queue system  
- Generate shipping labels alongside gift tags  
- Provide a mobile scanning app for QR codes  
- Offer analytics: Most popular gifts, scan counts, etc.

---

## 🛠️ How to Build Your Recipe

### **NEED LLM CREDITS?**
If you need compute to run your recipe:  
Sign up at **[goose-credits.dev](https://goose-credits.dev/)** to get **free credits** for Claude Sonnet 4.5 via OpenRouter!

**Use the ACCESS CODE:** `ADVENTDAY9`

---

### **Key Resources**
- 📘 **Recipe Reference – Parameters**  
  https://block.github.io/goose/docs/guides/recipes/recipe-reference#parameters

- 🎥 **Advanced Recipe Tips (Video)**  
  https://block.github.io/goose/docs/guides/recipes/

---

---
## 📤 Share Your Work

📮 **Required:**  
Submit your work in the **Advent of AI Discussion** under **Day 9**.

### Accepted Formats

**Required:**
- Your recipe file (so others can use it!)
- Screenshots of **at least 3 different tag styles**
- An example showing **QR code integration**

**Optional but awesome:**
- A side-by-side comparison of all 4 tag styles
- A batch of tags ready for printing
- A video showing your recipe in action
- Multi-language examples
- Your most creative custom poem
- A print “tag sheet” (multiple tags on a page)
- Any bonus features you added

### Share on Socials  
If you want to show off:  
- **Discord** — #adventofai  
- **Twitter/X**  
- **YouTube**  
- **LinkedIn**  
- **Bluesky**

---

## 🛠️ Success Criteria

You've completed Day 9 when:

✅ A working `gift-tag-generator.yaml` recipe  
✅ All required parameters  
✅ Logic that adapts layout, styling, content, and poem  
✅ Working QR code embedding  
✅ Print-ready HTML output  
✅ At least **3 generated tags**
