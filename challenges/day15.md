## **Day 15: The Social Media Blitz**

It's 48 hours before the Winter Festival's biggest event \- the **Grand Ice Sculpture Unveiling** \- and the marketing team just got approval for a major social media push across Instagram, Twitter/X, and Facebook.

Zara, the social media coordinator, knows from experience that each platform performs best with **completely different content**:

* **Instagram** needs a captivating caption with strategic hashtags and emoji  
* **Twitter/X** needs a concise thread that builds excitement  
* **Facebook** needs a detailed event description with all the logistics

She's been manually customizing content for each platform, but with three more events to promote this week, she's looking for a smarter workflow.

**You realize this is perfect for automation:** What if she could create **one main recipe that calls specialized sub-recipes** for each platform? Input the event details once, get perfectly formatted content for all three platforms instantly. And she could reuse this system for every future event\!

### **Your Mission**

Create a **social media campaign system** using sub-recipes:

**Create 3 sub-recipes:**

1. `instagram-post.yaml` \- Generates Instagram caption with hashtags  
2. `twitter-thread.yaml` \- Creates a Twitter/X thread (3-5 tweets)  
3. `facebook-event.yaml` \- Generates Facebook event description

**Create 1 main recipe:**

* `social-campaign.yaml` \- Orchestrates all three sub-recipes to generate a complete campaign

**All recipes should accept these core parameters:**

* `event_name` \- Name of the festival event  
* `event_date` \- When it's happening  
* `event_description` \- What it's about  
* `target_audience` \- Who should attend  
* `call_to_action` \- What you want people to do

### **Resources for Discovery**

**Learn about sub-recipes:**

* [Recipe Reference \- Sub-recipes](https://block.github.io/goose/docs/guides/recipes/recipe-reference)  
* [Advanced Recipe Tips (Video)](https://www.youtube.com/watch?v=VIDEO_ID_1)  
* [Recipes Guide](https://block.github.io/goose/docs/guides/recipes/)

**Hint**: Look for examples in the goose repository that use sub-recipes or call other recipes\!

## NEED LLM CREDITS?

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter.

**Use the ACCESS CODE:** `ADVENTDAY15`

### **Success Criteria**

✅ Create 4 working recipe files (3 sub-recipes \+ 1 main orchestrator)  
 ✅ Each sub-recipe generates platform-specific content  
 ✅ The main recipe successfully calls all 3 sub-recipes  
 ✅ Run the campaign generator for the "Grand Ice Sculpture Unveiling"  
 ✅ Get properly formatted content for Instagram, Twitter/X, and Facebook

**Bonus**: Make each platform's content feel authentic to that platform's style and tone\!

---
