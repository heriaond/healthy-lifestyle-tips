# Email OTP Authentication System

## ✅ What I Built:

Instead of magic links (clickable links), you now have an **OTP (One-Time Password) system** where users:

1. Enter their email
2. Receive a **6-digit code** in their email
3. Enter the code in the app
4. Get authenticated

---

## 📧 How It Works:

### Step 1: User Enters Email
- User clicks "Sign In" → "Email (OTP Code)"
- Dialog opens asking for email
- User enters email and clicks "Send Code"

### Step 2: System Sends OTP
- **API**: `/api/auth/send-otp`
- Generates random 6-digit code (e.g., `482615`)
- Saves to database (`VerificationToken` table)
- Expires in 10 minutes
- Sends email with the code

### Step 3: User Enters Code
- Dialog shows OTP input field
- User types the 6-digit code from email
- Clicks "Verify & Sign In"

### Step 4: System Verifies & Authenticates
- **Provider**: `email-otp` (Credentials provider)
- Checks if OTP exists in database
- Checks if it's expired
- Creates or gets user account
- Deletes used OTP
- Signs user in with JWT session

---

## 📁 Files Created:

### 1. `/components/email-otp-dialog.tsx`
- Beautiful 2-step dialog:
  - Step 1: Enter email → Send code
  - Step 2: Enter 6-digit OTP → Verify
- Includes:
  - Loading states
  - Error handling
  - Back button
  - Resend code button
  - Auto-format OTP input (numbers only, max 6 digits)

### 2. `/app/api/auth/send-otp/route.ts`
- Generates 6-digit OTP
- Saves to database with 10-minute expiry
- Sends beautiful HTML email with code
- Logs OTP to console for testing

### 3. `/app/api/auth/verify-otp/route.ts`
- (Optional - not used in final flow)
- Validates OTP from database
- Creates/updates user

### 4. Updated `/lib/auth.ts`
- Added `CredentialsProvider` with id `"email-otp"`
- Handles OTP verification
- Creates user accounts
- Issues JWT session
- Added JWT callbacks for session management

### 5. Updated `/components/navigation.tsx`
- Changed "Email (Magic Link)" to "Email (OTP Code)"
- Uses `EmailOTPDialog` instead of magic link dialog

---

## 📧 Email Template:

Users receive this beautiful email:

```
┌─────────────────────────────────────┐
│ Your Verification Code              │
│                                      │
│ Use this code to sign in to         │
│ Healthy Lifestyle Tips:              │
│                                      │
│ ┌─────────────────────────────────┐ │
│ │                                 │ │
│ │          482615                 │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│                                      │
│ This code will expire in 10 minutes.│
│                                      │
│ If you didn't request this code,    │
│ you can safely ignore this email.   │
└─────────────────────────────────────┘
```

---

## 🎨 UI Flow:

### Dialog Step 1 - Enter Email:
```
┌────────────────────────────────┐
│ Sign in with Email          ×  │
├────────────────────────────────┤
│ Enter your email address to    │
│ receive a verification code.   │
│                                 │
│ Email address                   │
│ ┌─────────────────────────────┐│
│ │ you@example.com             ││
│ └─────────────────────────────┘│
│                                 │
│ [Cancel]    [Send Code]        │
└────────────────────────────────┘
```

### Dialog Step 2 - Enter OTP:
```
┌────────────────────────────────┐
│ Sign in with Email          ×  │
├────────────────────────────────┤
│ We sent a 6-digit code to      │
│ you@example.com                 │
│                                 │
│ Verification Code               │
│ ┌─────────────────────────────┐│
│ │     1  2  3  4  5  6        ││
│ └─────────────────────────────┘│
│ Enter the 6-digit code sent    │
│ to your email                   │
│                                 │
│ [←]  [Verify & Sign In]        │
│                                 │
│      Resend code                │
└────────────────────────────────┘
```

---

## 🔒 Security Features:

- ✅ **OTP expires in 10 minutes**
- ✅ **One-time use** (deleted after verification)
- ✅ **Email verification** (user must have access to email)
- ✅ **JWT sessions** (secure, stateless)
- ✅ **Rate limiting possible** (can add to send-otp endpoint)
- ✅ **No passwords stored**

---

## 🚀 To Use:

1. **Restart your dev server:**
   ```bash
   yarn dev
   ```

2. **Click "Sign In" → "Email (OTP Code)"**

3. **Enter your email**

4. **Check your email** for the 6-digit code

5. **Enter the code** in the dialog

6. **Signed in!** ✅

---

## 🐛 Testing:

The OTP is also logged to your **server console** for easy testing:

```bash
✅ OTP sent to user@example.com: 482615
```

Just copy the code from your terminal!

---

## ⚙️ Configuration:

All email settings use the same `.env` variables:

```env
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-app-password"
EMAIL_FROM="your-email@gmail.com"
```

---

## 🎯 Database:

Uses the existing `VerificationToken` table:

```prisma
model VerificationToken {
  identifier String  // User's email
  token      String  // 6-digit OTP
  expires    DateTime // 10 minutes from creation
  
  @@unique([identifier, token])
}
```

---

## 📱 UX Improvements:

- Large, centered OTP input
- Auto-formats (numbers only)
- Max 6 digits
- Loading states
- Clear error messages
- Back button to change email
- Resend code option
- Success redirect

---

Enjoy your new OTP authentication system! 🎉
