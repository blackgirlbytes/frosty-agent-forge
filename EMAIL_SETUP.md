# Email Notification Setup Guide

This guide explains how to set up SendGrid for the Advent of AI email notifications.

## Overview

The email system does two things:
1. **Stores email addresses** in a SendGrid contact list
2. **Sends immediate confirmation emails** when users sign up

## Setup Steps

### 1. Create a SendGrid Account

1. Go to [SendGrid](https://sendgrid.com/) and sign up for a free account
2. Free tier includes 100 emails/day which should be sufficient for testing

### 2. Create an API Key

1. Go to **Settings** → **API Keys**
2. Click **Create API Key**
3. Name it something like "Advent of AI Notifications"
4. Select **Full Access** (or at minimum: Mail Send + Marketing Campaigns)
5. Copy the API key (you won't see it again!)

### 3. Create a Contact List

1. Go to **Marketing** → **Contacts**
2. Click **Create a New List**
3. Name it "Advent of AI Signups" (or whatever you prefer)
4. Once created, click on the list name
5. Copy the **List ID** from the URL (it looks like: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`)

### 4. Verify Sender Email (Important!)

SendGrid requires you to verify your sender email before you can send emails:

1. Go to **Settings** → **Sender Authentication**
2. Choose one of these options:
   - **Single Sender Verification** (easier, good for testing)
     - Click "Verify a Single Sender"
     - Enter your email address (e.g., `noreply@yourdomain.com`)
     - Check your inbox and click the verification link
   - **Domain Authentication** (better for production)
     - Follow the domain authentication flow
     - Add DNS records to your domain

### 5. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
SENDGRID_API_KEY=SG.your_actual_api_key_here
SENDGRID_LIST_ID=your_list_id_here
FROM_EMAIL=noreply@yourdomain.com
```

**Important:** 
- The `FROM_EMAIL` must match the email you verified in step 4
- Never commit `.env.local` to git (it's already in `.gitignore`)

### 6. Install Dependencies

Run this command (if you haven't already):

```bash
npm install @sendgrid/mail @sendgrid/client
```

### 7. Test the Integration

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3001`
3. Enter your email in the signup form
4. Click "Get Notified"
5. Check your inbox for the confirmation email

## How It Works

### API Endpoint: `/api/notify`

When a user submits the signup form:

1. **Validates the email** format
2. **Adds to SendGrid contact list** using the Marketing API
3. **Sends confirmation email** immediately using the Mail API
4. **Returns success/error** to the frontend

### Email Template

The confirmation email includes:
- Welcome message with snowflake theme
- Information about the 17 challenges
- Links to goose documentation and Discord
- Countdown reminder for December 1st

## Sending Bulk Emails Later

When you're ready to notify everyone about challenge unlocks:

1. Go to **Marketing** → **Single Sends**
2. Click **Create a Single Send**
3. Design your email
4. Select your "Advent of AI Signups" list
5. Schedule or send immediately

## Troubleshooting

### "Failed to send email" Error

- Check that your `SENDGRID_API_KEY` is correct
- Verify that your sender email is authenticated
- Check SendGrid dashboard for any account issues

### "Failed to add contact" Error

- Verify your `SENDGRID_LIST_ID` is correct
- Ensure your API key has Marketing Campaigns permissions

### Email Not Arriving

- Check spam/junk folder
- Verify sender email is authenticated in SendGrid
- Check SendGrid Activity Feed for delivery status

### Rate Limits

- Free tier: 100 emails/day
- If you need more, upgrade your SendGrid plan

## Security Notes

- Never expose your API key in client-side code
- The API route runs server-side only
- `.env.local` is gitignored by default
- Consider adding rate limiting for production

## Production Checklist

Before going live:

- [ ] Domain authentication completed (not just single sender)
- [ ] Sender email matches your domain
- [ ] API key has appropriate permissions (not Full Access)
- [ ] Rate limiting implemented on `/api/notify`
- [ ] Error monitoring set up
- [ ] SendGrid plan upgraded if expecting high volume
- [ ] Unsubscribe links working (SendGrid handles this automatically)
- [ ] Privacy policy and terms updated

## Resources

- [SendGrid Documentation](https://docs.sendgrid.com/)
- [SendGrid Node.js Library](https://github.com/sendgrid/sendgrid-nodejs)
- [Marketing Campaigns API](https://docs.sendgrid.com/api-reference/contacts/add-or-update-a-contact)
- [Mail Send API](https://docs.sendgrid.com/api-reference/mail-send/mail-send)
