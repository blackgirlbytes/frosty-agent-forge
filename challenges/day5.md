# **Day 5: The Homecoming Board ✈️❄️**

**Welcome Back, AI Engineer\!**

The Winter Festival is the talk of the town thanks to your amazing work\! Now for the grand finale: **The Homecoming Board** \- a magical display at the festival entrance showing real flights arriving, families reuniting, travelers coming home for the holidays.

**The twist?** It's freezing outside. Gloves. Mittens. Touchscreens don't work. ❄️🧤

**The solution?** Pure gesture magic. Wave to navigate. Point to select. No touching required \- just hand movements in the air.

---

## **🎯 Your Mission**

Build a **gesture-controlled flight tracker** showing real airplane arrivals, controlled entirely by hand movements.

**You'll create:**

* Real flight data from actual airports  
* 2+ hand gesture controls (swipe, pinch, wave, point)  
* Winter/holiday themed interface  
* Webcam-powered hand tracking  
* Magical, touchless interaction

**Why this matters:** You're using pre-trained AI models (MediaPipe) for hand tracking \- that's computer vision AI running 30-60 times per second in your browser\! This is modern AI engineering: combining ML models with real-world data to create magical experiences.

---

## **🛠️ What You Need**

**Tools:**

* **goose** (Desktop or CLI \- your pick\!)  
* **Developer extension** (definitely need this one)  
* **MediaPipe** \- Google's computer vision library (goose will help you set it up)  
* **Flight API** \- Try AviationStack (free tier) or OpenSky Network (totally free)

**Pro tip:** Ask goose "Help me set up MediaPipe for hand tracking" and "What's a good free flight tracking API?" \- let it do the research\!

---
### NEED LLM CREDITS?

Sign up at [goose-credits.dev](http://goose-credits.dev/) to get free credits for Claude Sonnet 4.5 via OpenRouter! 

**Use the ACCESS CODE: `ADVENTDAY5`**

## **✅ Requirements**

**Must Have:**

* ✈️ Real flight arrival data from at least one airport  
* 👋 At least 2 different gesture types working  
* 📸 Webcam hand tracking with MediaPipe  
* 🎄 Winter/holiday themed styling  
* 💫 Visual feedback when gestures are detected  
* ℹ️ Flight info displayed (number, origin, ETA, airline)

**Technical:**

* Works in real-time  
* Uses MediaPipe for hand tracking  
* Integrates with a real flight data API

---

## **💡 Tips From the Trenches**

We learned some things building this challenge - here's what'll save you headaches:

**Gesture Selection Matters:**
* **Start simple!** Pick 2 gestures that are very different from each other
* ✅ Great combo: **Closed fist** + **Open palm** (totally distinct hand shapes)
* ⚠️ Tricky combos: Pointing finger can be misread as a fist, peace sign vs pointing, etc.
* Similar gestures = confused detection = frustration

**Hand Tracking Gotchas:**
* If your skeleton overlay appears on the opposite side of your hand, you need to mirror both the video AND the landmarks together
* Lower the debounce time (200-400ms) for snappier response
* MediaPipe's detection confidence can be tuned - start with 0.7

**Flight API Tips:**
* OpenSky's `/states/all` endpoint (live aircraft positions) is more reliable than `/flights/arrival`
* You'll likely need a CORS proxy for browser requests (try `corsproxy.io`)
* The free tier has rate limits - cache your data!

## **🎁 Bonus Challenges (Pick Your Level\!)**

**🌟 Beginner Bonus:**

* Add a 3rd gesture type  
* Show departures too  
* Add sound effects for gestures  
* Visual hand skeleton overlay

**🌟🌟 Intermediate Bonus:**

* Support multiple airports (switch with gestures)  
* Two-handed gestures  
* Voice feedback ("Flight from NYC arriving in 20 minutes")  
* Smooth gesture animations

**🌟🌟🌟 Advanced Bonus:**

* Build a gesture training mode (custom gestures\!)  
* Add pose detection (full body control)  
* Deploy it so others can use it  
* AR elements overlaid on video feed

**🌟🌟🌟🌟 Ultimate Challenge:**

* Multi-user support (multiple people controlling at once\!)  
* ML that learns your gesture preferences  
* Mobile app version  
* Analytics dashboard

---

## **📤 Share Your Work**

**📮 Required:** Submit your work to complete Day 5\!

Post your solution in the [Advent of AI Discussion](https://github.com/block/goose/discussions/categories/advent-of-ai) under **Day 5**.  
 **Accepted formats:**

* Video/GIF of you controlling it with gestures \- we NEED to see those hands in action\! 👋  
* Link to your live site  
* Link to a blog post about your solution  
* Link to a video of you solving the problem  
* Link to your repo

**Tag us on socials:**  
[Discord](https://discord.gg/goose-oss) • [Twitter/X](https://x.com/goose_oss) • [YouTube](https://www.youtube.com/@goose-oss) • [LinkedIn](https://www.linkedin.com/company/goose-oss) • [Bluesky](https://bsky.app/profile/opensource.block.xyz)


---

## **📖 Resources for AI Engineers

**Essential:**

* [goose Documentation](https://block.github.io/goose)  
* [MediaPipe Hands Guide](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker)  
* [AviationStack API](https://aviationstack.com/)  
* [OpenSky Network](https://openskynetwork.github.io/opensky-api/)

**Computer Vision:**

* [MediaPipe Examples](https://mediapipe-studio.webapps.google.com/demo/hand_landmarker) \- Try it in your browser\!  
* [Hand Landmarks Guide](https://developers.google.com/mediapipe/solutions/vision/hand_landmarker#hand_landmarker_model) \- All 21 points explained

---

## **✨ You Know You Did It When...**

You've got a working webcam app with 2+ gestures controlling real flight data, winter-themed, and you can navigate without touching anything. **Bonus points:** 3+ gestures, multiple airports, sound effects, or you deployed it live\!
