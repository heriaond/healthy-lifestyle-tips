# Authentication Guide

## 📧 How Magic Links Work

### The Flow:
1. **User enters email** → NextAuth generates a unique token
2. **Email sent** → User receives email with a magic link
3. **User clicks link** → Token is verified
4. **Auto sign-in** → User is logged in without password

### What Happens Behind the Scenes:

```
User enters: john@example.com
     ↓
NextAuth creates VerificationToken in database:
  - identifier: john@example.com
  - token: random-unique-string
  - expires: 24 hours from now
     ↓
Email sent with link: 
  http://localhost:3000/api/auth/callback/email?token=random-unique-string&email=john@example.com
     ↓
User clicks link
     ↓
NextAuth verifies:
  1. Token exists in database
  2. Token not expired
  3. Email matches
     ↓
If valid:
  - Check if User with this email exists
  - If YES: Sign them in
  - If NO: Create new User account, then sign in
  - Delete used token
```

### Does it create a new account?

**First time using email:**
- ✅ Creates new User account
- ✅ User table gets a new entry with that email
- ✅ No password stored (passwordless!)

**Returning user with same email:**
- ✅ Signs into existing account
- ❌ Does NOT create duplicate account

---

## 🔗 What Happens When Same Email is Used Across Providers?

This is a **GREAT question** because it's a common source of confusion!

### Default Behavior (Current Setup):

**Scenario 1: Sign in with Google (john@example.com)**
```
Creates:
  - User: { email: "john@example.com", name: "John Doe" }
  - Account: { provider: "google", userId: user.id }
```

**Scenario 2: Later sign in with Discord (same email: john@example.com)**
```
NextAuth checks: Does User with john@example.com exist?
  - YES, it exists from Google sign-in

Action:
  - Creates: Account { provider: "discord", userId: existing-user.id }
  - Links Discord to SAME User account
  - User now has 2 login methods for 1 account
```

**Scenario 3: Sign in with Magic Link (john@example.com)**
```
NextAuth checks: Does User with john@example.com exist?
  - YES, it exists from previous sign-ins

Action:
  - No new Account created (email provider doesn't use Account table)
  - Signs into the SAME User account
  - User can now use Google, Discord, OR Magic Link
```

### Visual Representation:

```
Database State After Using All 3 Methods:

User Table:
┌─────┬──────────────────┬──────────┐
│ ID  │ Email            │ Name     │
├─────┼──────────────────┼──────────┤
│ 1   │ john@example.com │ John Doe │
└─────┴──────────────────┴──────────┘

Account Table:
┌─────┬──────────┬──────────┐
│ ID  │ Provider │ User ID  │
├─────┼──────────┼──────────┤
│ 1   │ google   │ 1        │  ← From Google OAuth
│ 2   │ discord  │ 1        │  ← From Discord OAuth
└─────┴──────────┴──────────┘

Result: ONE user, THREE ways to sign in!
```

---

## 🎯 Key Points:

### ✅ Automatic Account Linking (Because of Prisma Adapter):
- **Same email = Same account**
- Google, Discord, Magic Link all link to one User
- User can sign in with ANY method they've used before

### 🔍 What If Emails DON'T Match?

**Example:**
- Google: john@gmail.com
- Discord: john@discord.com
- Magic Link: john@work.com

**Result:** 3 separate User accounts (different emails = different users)

### 🛡️ Security Consideration:

**Email Verification:**
- Google & Discord: Already verified by provider ✅
- Magic Link: Verified when user clicks link ✅

**Risk:** If someone gets access to your email, they could:
- Use magic link to sign in
- Add Discord if it uses same email
- This is why email security is critical!

---

## 🔧 How to Test This:

### Test 1: Account Linking
1. Sign in with Google using `yourname@gmail.com`
2. Sign out
3. Sign in with Magic Link using `yourname@gmail.com`
4. Check database: Should be SAME user, different accounts

### Test 2: Separate Accounts  
1. Sign in with Google using `yourname@gmail.com`
2. Sign out
3. Sign in with Discord using different email
4. Check database: Should be TWO different users

---

## 📊 Database Schema Explanation:

```prisma
model User {
  id       String    @id
  email    String?   @unique  ← This is the linking key!
  accounts Account[] ← Multiple OAuth providers
}

model Account {
  provider  String   ← "google", "discord", etc.
  userId    String   ← Links back to User
}

model VerificationToken {
  identifier String  ← Email for magic links
  token      String  ← One-time use token
}
```

**Why it works:**
- `User.email` is UNIQUE
- When new provider tries to sign in, NextAuth checks email
- If email exists → Link to existing User
- If email new → Create new User

---

## 🚀 Setting Up Each Provider:

### Discord OAuth:
1. Go to https://discord.com/developers/applications
2. Create "New Application"
3. Go to OAuth2 settings
4. Add redirect: `http://localhost:3000/api/auth/callback/discord`
5. Copy Client ID and Client Secret to `.env`

### Email (Magic Links):
1. Get SMTP credentials (Gmail, SendGrid, Resend, etc.)
2. For Gmail:
   - Enable 2FA
   - Create App Password (not your regular password!)
   - Use in `.env` as `EMAIL_SERVER_PASSWORD`
3. Update `.env` with email settings

### Update your `.env`:
```env
# Discord
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"

# Email
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-gmail-app-password"
EMAIL_FROM="noreply@yourdomain.com"
```

---

## 🎨 Current UI Changes:

- "Sign In" button now shows a dropdown with 3 options:
  - Sign in with Google
  - Sign in with Discord
  - Sign in with Email (Magic Link)

---

## ⚡ Pro Tips:

1. **For Production:** Use a dedicated email service (SendGrid, Resend, Postmark)
   - Gmail works for testing but has rate limits

2. **Account Unlinking:** 
   - Users can't unlink providers by default
   - Need to build a settings page if you want this feature

3. **Force Email Verification:**
   - Email provider verifies on link click
   - OAuth providers trust Google/Discord's verification

4. **Multiple Accounts with Same Email:**
   - Default Prisma adapter LINKS them automatically
   - If you want separate accounts, need custom adapter logic

---

## 🐛 Troubleshooting:

**Magic link not sending?**
- Check SMTP credentials
- Check spam folder
- Verify EMAIL_FROM matches your domain (or use Gmail address)

**Account not linking?**
- Emails must match EXACTLY
- Check User table for existing email
- Verify Prisma adapter is configured correctly

**Discord/Google not working?**
- Check redirect URIs match exactly
- Verify CLIENT_ID and CLIENT_SECRET
- Make sure OAuth app is not in development mode (for Discord)
