# Healthy Lifestyle Tips

A Next.js web application for discovering and saving healthy lifestyle tips across four categories: Sleep, Nutrition, Movement, and Stress Management.

## Features

- **Browse Tips by Category**: Explore health tips organized into Sleep, Nutrition, Movement, and Stress categories
- **Google OAuth Authentication**: Sign in securely with your Google account
- **Favorite Tips**: Save your favorite tips for easy access later
- **Responsive Design**: Built with Tailwind CSS and shadcn/ui components
- **Type-Safe**: Full TypeScript support
- **Database**: SQLite with Prisma ORM

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (built on Radix UI)
- **Authentication**: NextAuth.js with Google OAuth
- **Database**: SQLite with Prisma ORM
- **Icons**: Lucide React

## Prerequisites

- Node.js 18+ and yarn
- A Google Cloud Platform account (for OAuth credentials)

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
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
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
│   │   ├── auth/           # NextAuth.js routes
│   │   └── favorites/      # Favorites API
│   ├── category/[category]/ # Category pages
│   ├── favorites/          # Favorites page
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   ├── navigation.tsx      # Navigation bar
│   ├── providers.tsx       # Session provider
│   └── tip-card.tsx        # Tip card component
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

- **User**: User accounts (NextAuth)
- **Account**: OAuth accounts (NextAuth)
- **Session**: User sessions (NextAuth)
- **Tip**: Health tips with category, title, and description
- **Favorite**: User's favorited tips

## Features in Detail

### Authentication

- Users can sign in with their Google account
- Session management handled by NextAuth.js
- Protected routes require authentication

### Browse Tips

- Tips are organized into four categories: Sleep, Nutrition, Movement, and Stress
- Each category has a dedicated page showing all relevant tips
- Homepage displays recent tips and category overview

### Favorites

- Authenticated users can favorite/unfavorite tips
- Favorites page shows all saved tips
- Favorite status persists across sessions

## Customization

### Adding More Tips

You can add more tips by editing `prisma/seed.ts` and running:

```bash
yarn db:seed
```

### Styling

- Modify `app/globals.css` to change the color scheme
- Update `tailwind.config.ts` for Tailwind customization
- Edit component styles in individual component files

## Troubleshooting

**Database errors:**

- Make sure to run `yarn db:push` after any schema changes
- Delete `prisma/dev.db` and re-run migrations for a fresh start

**Authentication errors:**

- Verify your Google OAuth credentials are correct
- Ensure the redirect URI matches exactly in Google Cloud Console
- Check that NEXTAUTH_SECRET is set and NEXTAUTH_URL matches your dev server

## License

MIT
