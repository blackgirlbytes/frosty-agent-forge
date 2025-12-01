# External Cron Setup (Reliable Alternative)

Since GitHub Actions scheduled workflows on private repos are unreliable, we're using an external cron service instead.

## ✅ This Approach:
- Works with private repos
- Runs on exact schedule (no delays)
- Free and reliable
- Triggers your Railway-deployed app

---

## Step 1: Add CRON_SECRET to Railway

Generate a random secret:
```bash
openssl rand -hex 32
```

Add to Railway environment variables:
```
CRON_SECRET=your_random_secret_here
```

Also add to `.env.local` for local testing.

---

## Step 2: Deploy to Railway

Make sure your app is deployed and you have the URL, e.g.:
```
https://frosty-agent-forge.up.railway.app
```

---

## Step 3: Set Up cron-job.org

1. Go to: https://cron-job.org/en/
2. Sign up (free account)
3. Create two cron jobs:

### Cron Job 1: Unlock Challenge 2

- **Title:** Unlock Challenge 2
- **URL:** `https://your-app.railway.app/api/cron/unlock`
- **Method:** POST
- **Request Body (JSON):**
  ```json
  {"day": 2}
  ```
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_CRON_SECRET`
- **Schedule:** Every day at 3:09 AM ET (8:09 AM UTC)
  - Cron expression: `9 8 * * *`

### Cron Job 2: Unlock Challenge 3

- **Title:** Unlock Challenge 3  
- **URL:** `https://your-app.railway.app/api/cron/unlock`
- **Method:** POST
- **Request Body (JSON):**
  ```json
  {"day": 3}
  ```
- **Headers:**
  - `Content-Type: application/json`
  - `Authorization: Bearer YOUR_CRON_SECRET`
- **Schedule:** Every day at 3:12 AM ET (8:12 AM UTC)
  - Cron expression: `12 8 * * *`

---

## Step 4: Test Immediately

You can test the endpoint right now with curl:

```bash
curl -X POST https://your-app.railway.app/api/cron/unlock \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_CRON_SECRET" \
  -d '{"day": 2}'
```

This should:
1. Create a discussion in `block/goose`
2. Unlock challenge 2 in your database
3. Return success JSON

---

## Benefits Over GitHub Actions

✅ Works with private repos  
✅ No delays - runs exactly on schedule  
✅ Free forever  
✅ Easy to monitor and debug  
✅ Can manually trigger anytime  

---

## For Production (All 17 Days)

You'd create 17 cron jobs, one for each day:
- Day 1: Dec 1, 12 PM ET
- Day 2: Dec 2, 12 PM ET
- etc.

Each with its own schedule and `{"day": X}` in the body.
