# Quick Setup Guide

Follow these steps to get your Healthy Lifestyle Tips application running:

## Step 1: Install Dependencies

```bash
cd healthy-lifestyle-tips
npm install
```

## Step 2: Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Generate a NextAuth secret:
   ```bash
   openssl rand -base64 32
   ```

3. Set up Google OAuth:
   - Go to https://console.cloud.google.com/
   - Create a new project
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
   - Copy the Client ID and Client Secret

4. Update your `.env` file with:
   ```env
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="<your-generated-secret>"
   GOOGLE_CLIENT_ID="<your-google-client-id>"
   GOOGLE_CLIENT_SECRET="<your-google-client-secret>"
   ```

## Step 3: Initialize Database

```bash
npm run db:push
npm run db:seed
```

## Step 4: Start the Development Server

```bash
npm run dev
```

Visit http://localhost:3000 to see your application!

## What You Can Do

✅ Browse health tips by category (Sleep, Nutrition, Movement, Stress)
✅ Sign in with your Google account
✅ Save your favorite tips
✅ View all your favorites in one place

## Troubleshooting

**Can't sign in?**
- Make sure your Google OAuth credentials are correctly set in `.env`
- Verify the redirect URI in Google Cloud Console matches exactly
- Check that NEXTAUTH_URL and NEXTAUTH_SECRET are set

**Database errors?**
- Try deleting `prisma/dev.db` and running `npm run db:push` again
- Make sure you've run the seed script: `npm run db:seed`

**Module not found errors?**
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again

## Next Steps

- Customize the tips by editing `prisma/seed.ts`
- Modify the color scheme in `app/globals.css`
- Add more categories or features as needed

Enjoy your Healthy Lifestyle Tips app! 🌱
