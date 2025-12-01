# Environment Variables Setup

Add these to your `.env.local` file and Railway environment variables:

```bash
# GitHub Configuration
GITHUB_TOKEN=your_github_personal_access_token_here
GITHUB_OWNER=block
GITHUB_REPO=goose
GITHUB_DISCUSSION_CATEGORY_ID=your_category_id_here

# SendGrid (existing)
SENDGRID_API_KEY=your_existing_sendgrid_key
```

## How to Get GitHub Discussion Category ID

Run this helper script to find the category ID:

```bash
tsx scripts/get-category-id.ts
```

Or manually:
1. Go to https://github.com/block/goose/discussions
2. Find the "Advent of AI" category
3. The script will show you all available categories and their IDs

## GitHub Token Permissions Needed

Your GitHub Personal Access Token needs:
- ✅ `public_repo` (or `repo` for private repos)
- ✅ `write:discussion`

Create token at: https://github.com/settings/tokens
