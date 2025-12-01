# Day 1: The Fortune Teller's Tent ⛄️

## The Crisis
Madame Zelda's fortune-telling app crashed during the festival opening. 50 people are waiting in line. She needs fortunes NOW.

## Your Mission
Use goose CLI to generate winter fortunes with different personalities on demand.

**Today's Skill:** CLI automation with `goose run`

## Requirements
- Generate at least 3 fortunes with different moods (grumpy, poetic, festive, sarcastic, mysterious)
- Make them visually appealing (ASCII art, emojis, borders)
- Winter-themed and magical

## Example Output
```
╔═══════════════════════════════════════╗
║        ✨ THE CRYSTAL SPEAKS ✨       ║
║          (Grumpy Prophecy)            ║
╠═══════════════════════════════════════╣
║                                       ║
║  The snow will be deeper than your   ║
║  motivation to shovel it. Your       ║
║  mittens will always be damp.        ║
║                                       ║
║  Lucky activity: Complaining         ║
║  Unlucky item: Ice scrapers          ║
║                                       ║
╚═══════════════════════════════════════╝
```

## The Tool
```bash
goose run --text "your instructions here" --quiet
```

**Flags:**
- `--text` - Your instructions
- `--quiet` - Shows only output (no thinking process)
- `--interactive` - Continue chatting after the task

## Why This Matters
- **Speed:** Prototype ideas in seconds
- **Automation:** Perfect for repetitive tasks
- **Integration:** CLI commands work in scripts and workflows
- **Production:** Real AI engineers use CLI tools daily

## Bonus Challenges
🌟 **Beginner:** Generate 5+ fortune styles, experiment with prompts
🌟🌟 **Intermediate:** Create a bash script wrapper, add CLI arguments
🌟🌟🌟 **Advanced:** Build a menu system, integrate with another tool

## Resources
- [goose Documentation](https://block.github.io/goose/)
- [CLI Commands Guide](https://block.github.io/goose/docs/guides/goose-cli-commands)
- [Quickstart](https://block.github.io/goose/docs/quickstart)

## Solution
```bash
goose run --text "Generate a grumpy winter fortune with ASCII art borders" --quiet
```

## Share Your Work
Post your best fortune with #AdventOfAI #Day1 and tag @goose_oss!

**Example:**
> Day 1 of #AdventOfAI complete! 🎪⛄️
> Built a CLI fortune generator with @goose_oss and learned about rapid AI prototyping.
> The grumpy snowman fortunes are *chef's kiss* 😂

---

**✅ Success:** You've completed Day 1 when you can generate fortunes with different personalities using goose CLI.
