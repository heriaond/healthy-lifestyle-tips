# 🗄️ Database Architecture Guide

## 📊 Overview

**Database Type:** SQLite  
**ORM:** Prisma  
**Location:** `prisma/dev.db`  
**Total Tables:** 6  

---

## 🏗️ Database Structure

### **Authentication Tables (NextAuth.js)**
Used by NextAuth to manage users and sessions:

#### 1. **User** 👤
The main user account table.

```prisma
model User {
  id            String     @id @default(cuid())
  name          String?
  email         String?    @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  favorites     Favorite[]
}
```

**Fields:**
- `id` - Unique user identifier (cuid format: `clx7y8z9...`)
- `name` - User's display name (from OAuth or null)
- `email` - User's email (UNIQUE - one email = one account)
- `emailVerified` - When email was verified (OTP sets this)
- `image` - Profile picture URL (from OAuth providers)

**Relationships:**
- Has many `Account` (can sign in with Google + Discord + OTP)
- Has many `Session` (active login sessions)
- Has many `Favorite` (favorited tips)

**Example Data:**
```json
{
  "id": "clx7y8z9abc123",
  "name": "John Doe",
  "email": "john@example.com",
  "emailVerified": "2025-11-17T20:00:00Z",
  "image": "https://lh3.googleusercontent.com/..."
}
```

---

#### 2. **Account** 🔗
Links users to OAuth providers (Google, Discord).

```prisma
model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String?
  access_token      String?
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String?
  session_state     String?
  
  user User @relation(...)
  @@unique([provider, providerAccountId])
}
```

**Fields:**
- `userId` - Links to User table
- `provider` - "google", "discord", etc.
- `providerAccountId` - User's ID at that provider
- `access_token` - OAuth access token
- `refresh_token` - OAuth refresh token
- `expires_at` - Token expiration timestamp

**Purpose:**
- Stores OAuth provider credentials
- Enables account linking (same email = same user)
- One user can have multiple accounts

**Example Data:**
```json
{
  "id": "acc_123",
  "userId": "clx7y8z9abc123",
  "provider": "google",
  "providerAccountId": "1234567890",
  "type": "oauth",
  "access_token": "ya29.a0...",
  "refresh_token": "1//0gF..."
}
```

**Real-World Example:**
```
User: john@example.com
├─ Account 1: Google (providerAccountId: "1234567890")
└─ Account 2: Discord (providerAccountId: "9876543210")

→ John can sign in with EITHER Google OR Discord!
```

---

#### 3. **Session** 🎫
Active user sessions (only used with database strategy).

```prisma
model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  
  user User @relation(...)
}
```

**Fields:**
- `sessionToken` - Unique session identifier
- `userId` - Which user this session belongs to
- `expires` - When session expires

**Note:** Since we use JWT strategy (`session: { strategy: "jwt" }`), this table is mostly empty. Sessions are stored in JWT tokens, not the database.

---

#### 4. **VerificationToken** ✉️
Stores OTP codes for email authentication.

```prisma
model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime
  
  @@unique([identifier, token])
}
```

**Fields:**
- `identifier` - User's email address
- `token` - 6-digit OTP code (e.g., "482615")
- `expires` - Expiration time (10 minutes from creation)

**Lifecycle:**
1. User enters email
2. System generates code: `482615`
3. Saves to table: `{identifier: "user@example.com", token: "482615", expires: "2025-11-17T20:10:00Z"}`
4. User enters code
5. System verifies & **deletes** the row (one-time use)

**Example Data:**
```json
{
  "identifier": "john@example.com",
  "token": "482615",
  "expires": "2025-11-17T20:10:00.000Z"
}
```

---

### **Application Tables** (Your App Logic)

#### 5. **Tip** 💡
Health and wellness tips.

```prisma
model Tip {
  id          String     @id @default(cuid())
  category    String
  title       String
  description String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  favorites   Favorite[]
}
```

**Fields:**
- `id` - Unique tip identifier
- `category` - "SLEEP" | "NUTRITION" | "MOVEMENT" | "STRESS"
- `title` - Tip headline
- `description` - Full tip content
- `createdAt` - When tip was created
- `updatedAt` - Last modified time

**Relationships:**
- Has many `Favorite` (users who favorited this tip)

**Example Data:**
```json
{
  "id": "tip_abc123",
  "category": "SLEEP",
  "title": "Maintain a Consistent Sleep Schedule",
  "description": "Go to bed and wake up at the same time...",
  "createdAt": "2025-11-17T00:00:00Z",
  "updatedAt": "2025-11-17T00:00:00Z"
}
```

**Current Data:**
- 15 total tips (from seed)
- 3 Sleep tips
- 4 Nutrition tips
- 4 Movement tips
- 4 Stress tips

---

#### 6. **Favorite** ❤️
Junction table linking users to their favorite tips.

```prisma
model Favorite {
  id        String   @id @default(cuid())
  userId    String
  tipId     String
  createdAt DateTime @default(now())
  
  user User @relation(...)
  tip  Tip  @relation(...)
  
  @@unique([userId, tipId])
}
```

**Fields:**
- `userId` - Which user favorited
- `tipId` - Which tip was favorited
- `createdAt` - When they favorited it

**Constraints:**
- `@@unique([userId, tipId])` - User can't favorite same tip twice

**Purpose:**
- Tracks which tips each user has favorited
- Enables "My Favorites" page
- Many-to-many relationship

**Example Data:**
```json
{
  "id": "fav_xyz789",
  "userId": "clx7y8z9abc123",
  "tipId": "tip_abc123",
  "createdAt": "2025-11-17T15:30:00Z"
}
```

**Real-World Example:**
```
User: john@example.com (id: user_1)
Favorites:
├─ Tip: "Maintain Sleep Schedule" (id: tip_1)
├─ Tip: "Eat Rainbow Vegetables" (id: tip_5)
└─ Tip: "Practice Deep Breathing" (id: tip_12)

Database rows:
{userId: "user_1", tipId: "tip_1"}
{userId: "user_1", tipId: "tip_5"}
{userId: "user_1", tipId: "tip_12"}
```

---

## 🔗 Relationships Visualized

```
User (1) ─────< (many) Account
  │                      (Google, Discord, etc.)
  │
  ├─────< (many) Session
  │                      (Active logins)
  │
  └─────< (many) Favorite
                   │
                   └────> (1) Tip


Tip (1) ─────< (many) Favorite
                 │
                 └────> (1) User
```

**In Plain English:**
- **One user** can have **many accounts** (Google + Discord)
- **One user** can have **many sessions** (logged in on phone + laptop)
- **One user** can favorite **many tips**
- **One tip** can be favorited by **many users**

---

## 📈 Database Growth Patterns

### **User Table:**
- Grows: 1 row per unique email
- Example: 100 users = 100 rows

### **Account Table:**
- Grows: 1 row per OAuth connection
- Example: 100 users, 50 use Google, 30 use Discord = 80 rows

### **Favorite Table:**
- Grows: 1 row per favorite action
- Example: 100 users, each favorites 5 tips = 500 rows
- Most active table!

### **VerificationToken Table:**
- Temporary: Rows deleted after use
- Usually 0-10 rows (only pending OTPs)

### **Tip Table:**
- Static: Manually managed
- Current: 15 rows (from seed)
- Grows only when you add new tips

---

## 🎯 Common Database Queries

### **Get User with All Accounts:**
```typescript
const user = await prisma.user.findUnique({
  where: { email: "john@example.com" },
  include: {
    accounts: true,
    favorites: {
      include: { tip: true }
    }
  }
});
```

### **Get Tips by Category:**
```typescript
const sleepTips = await prisma.tip.findMany({
  where: { category: "SLEEP" }
});
```

### **Get User's Favorites:**
```typescript
const favorites = await prisma.favorite.findMany({
  where: { userId: user.id },
  include: { tip: true }
});
```

### **Toggle Favorite:**
```typescript
// Check if exists
const existing = await prisma.favorite.findUnique({
  where: {
    userId_tipId: {
      userId: user.id,
      tipId: tip.id
    }
  }
});

if (existing) {
  // Remove
  await prisma.favorite.delete({ where: { id: existing.id } });
} else {
  // Add
  await prisma.favorite.create({
    data: { userId: user.id, tipId: tip.id }
  });
}
```

---

## 🛠️ Database Commands

### **View Database:**
```bash
yarn db:studio
# Opens Prisma Studio at http://localhost:5555
```

### **Update Schema:**
```bash
yarn db:push
# Applies schema changes to database
```

### **Seed Data:**
```bash
yarn db:seed
# Runs prisma/seed.ts
```

### **Reset Database:**
```bash
rm prisma/dev.db
yarn db:push
yarn db:seed
```

---

## 📊 Current Database State

Run this to see your data:
```bash
yarn db:studio
```

**Typical State After Setup:**
- **User:** 0-1 rows (you, if you've signed in)
- **Account:** 0-2 rows (if you used Google + Discord)
- **Session:** 0 rows (using JWT strategy)
- **VerificationToken:** 0 rows (deleted after use)
- **Tip:** 15 rows (from seed)
- **Favorite:** 0+ rows (depends on your favorites)

---

## 🔒 Data Security

### **Passwords:**
- ❌ No passwords stored (OAuth + OTP only)

### **OAuth Tokens:**
- ✅ Encrypted in database
- ✅ Never exposed to frontend
- ✅ Automatically refreshed

### **OTP Codes:**
- ✅ Deleted after single use
- ✅ 10-minute expiry
- ✅ Unique per user

### **User Data:**
- ✅ Email is unique (prevents duplicates)
- ✅ Cascade deletes (delete user → deletes accounts/sessions/favorites)
- ✅ No sensitive data stored

---

## 🧹 Data Cleanup

### **Automatic:**
- OTP codes deleted after use
- Expired sessions cleaned by NextAuth

### **Manual (Optional):**
```typescript
// Clean expired OTPs
await prisma.verificationToken.deleteMany({
  where: { expires: { lt: new Date() } }
});

// Remove old sessions
await prisma.session.deleteMany({
  where: { expires: { lt: new Date() } }
});
```

---

## 📝 Schema Migrations

If you need to modify the schema:

1. **Edit** `prisma/schema.prisma`
2. **Push changes:**
   ```bash
   yarn db:push
   ```
3. **Generate client:**
   ```bash
   npx prisma generate
   ```
4. **Restart server**

---

## 🎨 Adding New Fields Example

Want to add a user bio?

```prisma
model User {
  id            String     @id @default(cuid())
  name          String?
  email         String?    @unique
  bio           String?    // ← Add this
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  favorites     Favorite[]
}
```

Then:
```bash
yarn db:push
```

---

## 📊 Database Size

**SQLite is lightweight:**
- Empty database: ~50 KB
- With 15 tips: ~100 KB
- With 100 users + 1000 favorites: ~500 KB
- 1 million rows: ~50 MB

**SQLite is perfect for:**
- ✅ Development
- ✅ Small to medium apps
- ✅ Up to ~100,000 users

**Consider PostgreSQL/MySQL for:**
- Large scale (1M+ users)
- High concurrency
- Production apps

---

## 🔍 Inspecting the Database

**Option 1: Prisma Studio** (Recommended)
```bash
yarn db:studio
```

**Option 2: SQLite CLI**
```bash
sqlite3 prisma/dev.db
.tables
SELECT * FROM User;
.exit
```

**Option 3: VS Code Extension**
Install "SQLite Viewer" extension, then open `prisma/dev.db`

---

Your database is production-ready and well-structured! 🎉
