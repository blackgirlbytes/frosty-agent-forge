# Day 10: The Festival Poster Generator 🎨📢

**Welcome Back, AI Engineer**

The Winter Festival’s marketing coordinator, Elena, is losing it. She has spent 8 hours in Photoshop creating posters for 15 different festival events. Same layout every time. Different names, times, locations, and themes. All done manually.

“There has to be a better way!” she yells, tossing her stylus aside. “I’m rebuilding the same poster over and over!”

She is right. And you know the solution: **recipes with parameters and conditionals**.

So far, you have built recipes that behave the same way every time. Today, you will build one that adapts based on input, making it flexible, reusable, and scalable.

---

## **🎯 Your Mission: Build a Parameterized Poster Generator**

Elena needs one recipe that can generate posters for *any* festival event. Same recipe. Different inputs. Different results.

**The Challenge:**
Create a recipe that accepts parameters and uses conditional logic to generate customized festival posters.

---

## **📋 Event Details**

Start with these three events:

**Hot Cocoa Tasting**

* December 15, 2pm–4pm
* Main Plaza
* Food event
* Warm and cozy

**Kids’ Storytelling Hour**

* December 17, 3pm–4pm
* Storytelling Tent
* Kids event
* Playful and fun

**Live Music Performance**

* December 18, 7pm–9pm
* Main Stage
* Performance
* Sophisticated

Elena wants to run the recipe once per event and get a polished, ready-to-share poster each time.

---

## **🔧 Required Parameters**

Each poster should accept:

* **event_name**
* **event_datetime**
* **location**
* **event_type** (food, kids, performance, competition, workshop)

Optional parameters are encouraged.

---

## **🧠 Example: Parameters + Conditionals in Action**

Before designing posters, here is a simple recipe that demonstrates how **parameters and conditional logic** work together.

This recipe changes its output based on which parameters are provided and how they are set.

```yaml
version: 1.0.0
title: Simple Greeting Example
description: A simple recipe showing how to use conditionals

prompt: |
  Hello {{ name }}!

  {% if favorite_color %}
  I see your favorite color is {{ favorite_color }}. That's a great choice!
  {% endif %}

  {% if age %}
    {% if age < 18 %}
    You're pretty young! I'll keep things simple and fun.
    {% elif age >= 18 and age < 65 %}
    Great to meet an adult user!
    {% else %}
    It's wonderful to meet someone with life experience!
    {% endif %}
  {% endif %}

  {% if wants_joke %}
  Here's a joke for you: Why did the programmer quit? Because they didn't get arrays! 😄
  {% endif %}

  Now, how can I help you today?

parameters:
  - key: name
    requirement: required

  - key: favorite_color
    requirement: optional

  - key: age
    input_type: integer
    requirement: optional

  - key: wants_joke
    input_type: boolean
    requirement: optional
    default: false
```

**What to notice:**

* Optional parameters can be missing
* Output changes based on values
* One recipe supports many outcomes

This same pattern will power your poster generator.

---

## **🔍 Your Task**

Build a recipe that:

* Accepts required and optional parameters
* Uses conditional logic based on event type
* Generates a festival-themed HTML poster
* Saves output with a descriptive filename
* Runs in both CLI and Desktop

---

## **🎨 Design Logic**

Use conditional logic to automatically style posters based on `event_type`:

* **Food events**: Warm and inviting
* **Kids events**: Bright, playful, emoji-friendly
* **Performances**: Elegant and refined
* **Competitions**: Bold and energetic
* **Workshops**: Creative and instructional

---

## **📚 Resources**

* [Recipe Guide](https://block.github.io/goose/docs/guides/recipes/)
* [Recipe Reference](https://block.github.io/goose/docs/guides/recipes/recipe-reference)
* [Recipe Parameters](https://block.github.io/goose/docs/guides/recipes/recipe-reference#parameters)
* [Recipes Tutorial](https://block.github.io/goose/docs/tutorials/recipes-tutorial)
* [Running Recipes](https://block.github.io/goose/docs/guides/goose-cli-commands#run)
* [Community Recipes](https://block.github.io/goose/recipes)
* [Jinja2 Templating](https://jinja.palletsprojects.com/en/stable/templates/)

**Video:**

* [Advanced recipe tips and conditional logic](https://www.youtube.com/watch?v=1szmJSKInnU)

---

### **NEED LLM CREDITS?**

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter.

**Use the ACCESS CODE: `ADVENTDAY10`**

---

## **🎁 Level Up (Optional)**

* Add extra parameters
* Support batch or multi-format output
* Create style or branding variants

---

## **📤 Share Your Work**

**📮 Required:** Submit in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 10**.

**Accepted Formats:**

* Screenshot of your structured output
* Blog post
* Video walkthrough
* Repo link

**Tag us:**
[Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)

---

## **✅ Success Criteria**

* Recipe uses parameters
* Conditional logic changes output
* Posters generate correctly

You are good to go.
