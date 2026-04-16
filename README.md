# Healthy Lifestyle Tips

**Live:** [https://healthy-lifestyle-tips.vercel.app/](https://healthy-lifestyle-tips.vercel.app/)

A Next.js web application for discovering and saving healthy lifestyle tips across four categories: Sleep, Nutrition, Movement, and Stress Management.

## Features

- **Browse Tips by Category**: Explore health tips organized into Sleep, Nutrition, Movement, and Stress categories
- **Search & Filter**: Full-text search across tip titles and descriptions with category filtering and pagination
- **Google OAuth Authentication**: Sign in securely with your Google account
- **Email OTP Authentication**: Sign in via one-time password sent to your email
- **Favorite Tips**: Save your favorite tips for easy access later
- **My Tips**: Create and manage your own health tips
- **Admin Panel**: Admin dashboard for managing users and viewing statistics
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui components
- **Type-Safe**: Full TypeScript support
- **Database**: PostgreSQL with Prisma ORM

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI)
- **Authentication**: NextAuth.js with Google OAuth + Email OTP (Nodemailer)
- **Database**: PostgreSQL (Vercel Postgres) with Prisma ORM
- **Icons**: Lucide React
- **Deployment**: Vercel

## Prerequisites

- Node.js 18+ and yarn
- A Google Cloud Platform account (for OAuth credentials)
- A PostgreSQL database (e.g. Vercel Postgres)
- An SMTP email account (for OTP emails)

## Getting Started

### 1. Install Dependencies

```bash
yarn install
```

### 2. Set Up Environment Variables

Copy the `.env.example` file to `.env`:

```bash
cp .env.example .env
```

Then update the `.env` file with your credentials:

```env
DATABASE_URL="postgresql://user:password@host:5432/dbname"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-email-password"
EMAIL_FROM="your-email@example.com"
```

**To generate a NEXTAUTH_SECRET:**

```bash
openssl rand -base64 32
```

**To get Google OAuth credentials:**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client ID
5. Set application type to "Web application"
6. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
7. Add authorized JavaScript origins: `http://localhost:3000`
8. Copy the Client ID and Client Secret to your `.env` file

### 3. Set Up the Database

Initialize the database and run migrations:

```bash
yarn db:push
```

Seed the database with sample tips:

```bash
yarn db:seed
```

Preview the database:

```bash
yarn db:studio
```

### 4. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production application
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint
- `yarn db:push` - Push Prisma schema changes to the database
- `yarn db:seed` - Seed the database with sample data
- `yarn db:studio` - Open Prisma Studio to view/edit database

## Project Structure

```
healthy-lifestyle-tips/
├── app/                      # Next.js App Router pages
│   ├── api/                 # API routes
│   │   ├── auth/           # NextAuth.js + OTP routes
│   │   ├── tips/           # Tips CRUD API
│   │   ├── favorites/      # Favorites toggle API
│   │   └── admin/          # Admin-only API routes
│   ├── category/[category]/ # Category pages
│   ├── favorites/          # Favorites page
│   ├── my-tips/            # User's own tips page
│   ├── admin/              # Admin dashboard
│   ├── about/              # Project presentation
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── navigation.tsx      # Navigation bar
│   ├── providers.tsx       # Session provider
│   ├── tip-card.tsx        # Tip card component
│   └── search-bar.tsx      # Search & filter component
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── prisma.ts           # Prisma client
│   └── utils.ts            # Helper functions
├── prisma/                  # Prisma schema and migrations
│   ├── schema.prisma       # Database schema
│   └── seed.ts             # Seed script
├── types/                   # TypeScript type definitions
└── public/                  # Static assets
```

## Database Schema

The application uses the following main models:

- **User**: User accounts with role support (`user` / `admin`)
- **Account**: OAuth accounts (NextAuth)
- **Session**: User sessions (NextAuth)
- **Tip**: Health tips with category, title, description, and author
- **Favorite**: User's favorited tips (unique per user+tip)

## Features in Detail

### Authentication

- Sign in with Google OAuth
- Sign in with Email OTP (one-time password sent via email)
- Session management handled by NextAuth.js
- Protected routes require authentication

### Browse & Search Tips

- Tips are organized into four categories: Sleep, Nutrition, Movement, and Stress
- Full-text search across titles and/or descriptions
- Filter by one or multiple categories
- Pagination support
- Homepage displays recent tips and category overview

### Favorites

- Authenticated users can favorite/unfavorite tips
- Favorites page shows all saved tips
- Favorite status persists across sessions

### My Tips

- Authenticated users can create their own tips
- Users can delete tips they created
- Admins can delete any tip

### Admin Panel

- View site statistics (total users, tips, favorites, per-category counts)
- List all users with their tip and favorite counts
- Promote/demote users to admin role
- Delete user accounts

## Troubleshooting

**Database errors:**

- Make sure to run `yarn db:push` after any schema changes
- Ensure `DATABASE_URL` points to a valid PostgreSQL connection string

**Authentication errors:**

- Verify your Google OAuth credentials are correct
- Ensure the redirect URI matches exactly in Google Cloud Console
- Check that `NEXTAUTH_SECRET` is set and `NEXTAUTH_URL` matches your dev server
- For OTP emails, verify your SMTP credentials are correct

## License

MIT
