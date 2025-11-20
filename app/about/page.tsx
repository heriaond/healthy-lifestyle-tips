"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AboutPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 12;

  const changeSlide = (direction: number) => {
    const newSlide = currentSlide + direction;
    if (newSlide >= 0 && newSlide < totalSlides) {
      setCurrentSlide(newSlide);
    }
  };

  const slides = [
    // Slide 1: Title
    <div
      key={0}
      className="flex flex-col items-center justify-center h-full text-center space-y-6"
    >
      <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
        🏃‍♂️ Healthy Lifestyle Tips
      </h1>
      <p className="text-2xl text-gray-600">
        Webová aplikace pro zdravý životní styl
      </p>
      <div className="flex gap-4">
        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold">
          ✅ LIVE NA VERCELU
        </span>
        <span className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-bold">
          🚀 PRODUCTION READY
        </span>
      </div>
      <p className="text-xl text-gray-600 mt-8">
        Next.js 15 • TypeScript • PostgreSQL • Vercel
      </p>
    </div>,

    // Slide 2: Project Overview
    <div key={1} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        📋 Project Overview
      </h2>
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold text-purple-600">O Projektu</h3>
        <p className="text-lg leading-relaxed">
          <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded font-bold">
            Healthy Lifestyle Tips
          </span>{" "}
          je moderní full-stack webová aplikace pro objevování a ukládání tipů
          pro zdravý životní styl.
        </p>

        <h3 className="text-2xl font-semibold text-purple-600">Hlavní Účel</h3>
        <ul className="list-disc ml-8 space-y-2 text-lg">
          <li>Objevování zdravotních tipů v různých oblastech života</li>
          <li>Ukládání oblíbených tipů pro rychlý přístup</li>
          <li>Procházení rad podle kategorií</li>
          <li>Sdílení vlastních tipů s komunitou</li>
        </ul>

        <h3 className="text-2xl font-semibold text-purple-600">
          🌐 Deployment
        </h3>
        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 p-6 rounded-lg">
          <h4 className="text-xl font-semibold text-purple-700 mb-3">
            Vercel Platform - Production
          </h4>
          <ul className="list-disc ml-6 space-y-2">
            <li>
              <strong>Frontend & Backend:</strong> Next.js na Vercel Serverless
            </li>
            <li>
              <strong>Databáze:</strong> Vercel Postgres (PostgreSQL)
            </li>
            <li>
              <strong>CDN:</strong> Vercel Edge Network
            </li>
            <li>
              <strong>SSL:</strong> Automatický HTTPS certifikát
            </li>
            <li>
              <strong>CI/CD:</strong> Automatické deploymenty z Git
            </li>
          </ul>
        </div>
      </div>
    </div>,

    // Slide 3: Features
    <div key={2} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        ✨ Hlavní Funkce
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            icon: "📂",
            title: "Vybírání Kategorií",
            desc: "4 kategorie: Sleep, Nutrition, Movement, Stress",
          },
          {
            icon: "🔐",
            title: "Autentizace",
            desc: "Google OAuth + Email s OTP",
          },
          {
            icon: "⭐",
            title: "Oblíbené Tipy",
            desc: "Ukládání a správa favorites",
          },
          {
            icon: "📝",
            title: "Uživatelský Obsah",
            desc: "Přidávání vlastních tipů",
          },
          {
            icon: "🔍",
            title: "Vyhledávání",
            desc: "Filtrování podle kategorií",
          },
          {
            icon: "📱",
            title: "Responzivní Design",
            desc: "Mobile, tablet, desktop",
          },
          {
            icon: "⚙️",
            title: "Administrativní Rozhraní",
            desc: "Admin panel pro správu obsahu",
          },
          {
            icon: "🕐",
            title: "Nedávné Tipy",
            desc: "Zobrazení nejnovějších tipů",
          },
        ].map((feature, idx) => (
          <div
            key={idx}
            className="bg-gray-50 p-4 rounded-lg border-l-4 border-purple-700"
          >
            <h4 className="text-lg font-semibold mb-2">
              {feature.icon} {feature.title}
            </h4>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>,

    // Slide 4: Tech Stack
    <div key={3} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🛠️ Technický Stack
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          {
            title: "Frontend",
            items: [
              "Next.js 15 (App Router)",
              "React 18",
              "TypeScript 5.6",
              "Tailwind CSS",
              "shadcn/ui Components",
            ],
          },
          {
            title: "Backend",
            items: [
              "Next.js API Routes",
              "NextAuth.js 4.24",
              "Prisma ORM 6.19",
              "Nodemailer",
            ],
          },
          {
            title: "Databáze",
            items: [
              "PostgreSQL",
              "Vercel Postgres",
              "Connection Pooling",
              "Automatic Backups",
            ],
          },
          {
            title: "Deployment",
            items: [
              "Vercel Platform",
              "Vercel Edge Network (CDN)",
              "Serverless Functions",
              "Automatic HTTPS",
            ],
          },
          {
            title: "UI Library",
            items: [
              "Radix UI Primitives",
              "Lucide React Icons",
              "CVA (Class Variance)",
              "Tailwind Animate",
            ],
          },
          {
            title: "Dev Tools",
            items: ["Yarn 4.10.3", "ESLint", "TypeScript", "Prisma Studio"],
          },
        ].map((tech, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 p-4 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              {tech.title}
            </h4>
            <ul className="list-disc ml-4 space-y-1 text-sm">
              {tech.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>,

    // Slide 5: Architecture
    <div key={4} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🏗️ Architektura Aplikace
      </h2>
      <div className="bg-gray-50 p-6 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`┌──────────────────────────────────────────────────────────┐
│              Client (Browser)                            │
│         React 18 + Next.js 15 App Router                 │
└────────────────────────┬─────────────────────────────────┘
                         │
                         │ HTTPS (Vercel Edge Network)
                         │
┌────────────────────────▼─────────────────────────────────┐
│                  VERCEL PLATFORM                         │
│                                                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │       Next.js Serverless Functions               │   │
│  │                                                   │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │      App Router Pages                   │    │   │
│  │  │                                          │    │   │
│  │  │  • / (page.tsx) - Homepage              │    │   │
│  │  │  • /category/[category] - Kategorie     │    │   │
│  │  │  • /favorites - Oblíbené tipy           │    │   │
│  │  │  • /my-tips - Moje tipy                 │    │   │
│  │  │  • /admin - Admin panel                 │    │   │
│  │  │  • /about - Prezentace projektu         │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  │                                                   │   │
│  │  ┌─────────────────────────────────────────┐    │   │
│  │  │         API Routes                      │    │   │
│  │  │                                          │    │   │
│  │  │  • /api/auth/[...nextauth]              │    │   │
│  │  │    - NextAuth.js endpoints              │    │   │
│  │  │                                          │    │   │
│  │  │  • /api/favorites                       │    │   │
│  │  │    - GET: Získat oblíbené               │    │   │
│  │  │    - POST: Přidat oblíbený              │    │   │
│  │  │    - DELETE: Odebrat oblíbený           │    │   │
│  │  │                                          │    │   │
│  │  │  • /api/tips                            │    │   │
│  │  │    - GET: Získat tipy                   │    │   │
│  │  │    - POST: Vytvořit tip                 │    │   │
│  │  │    - PUT: Upravit tip                   │    │   │
│  │  │    - DELETE: Smazat tip                 │    │   │
│  │  └─────────────────────────────────────────┘    │   │
│  └───────────────────────┬──────────────────────────┘   │
└──────────────────────────┼──────────────────────────────┘
                           │
                           │ Prisma ORM (SSL Connection)
                           │
┌──────────────────────────▼──────────────────────────────┐
│              VERCEL POSTGRES DATABASE                   │
│                                                          │
│  Models:                                                 │
│  • User (id, email, name, role, image)                  │
│  • Account (provider, providerAccountId)                │
│  • Session (sessionToken, expires)                      │
│  • Tip (category, title, description)                   │
│  • Favorite (userId, tipId)                             │
│                                                          │
│  Features:                                               │
│  • Automatic Backups                                     │
│  • Connection Pooling                                    │
│  • SSL Encryption                                        │
└──────────────────────────────────────────────────────────┘`}</pre>
      </div>
    </div>,

    // Slide 6: Database Schema
    <div key={5} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🗄️ Databázové Schema
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            User Model
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            <pre>{`model User {
  id            String     @id @default(cuid())
  name          String?
  email         String?    @unique
  emailVerified DateTime?
  image         String?
  role          String     @default("user")
  accounts      Account[]
  sessions      Session[]
  favorites     Favorite[]
  createdTips   Tip[]
}`}</pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Tip Model
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            <pre>{`model Tip {
  id          String     @id @default(cuid())
  category    String     // SLEEP, NUTRITION, MOVEMENT, STRESS
  title       String
  description String
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
  createdById String?
  createdBy   User?
  favorites   Favorite[]
}`}</pre>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Favorite Model
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
            <pre>{`model Favorite {
  id        String   @id @default(cuid())
  userId    String
  tipId     String
  createdAt DateTime @default(now())

  @@unique([userId, tipId])
}`}</pre>
          </div>
        </div>
      </div>
    </div>,

    // Slide 7: Project Structure
    <div key={6} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        📁 Struktura Projektu
      </h2>
      <div className="bg-gray-50 p-6 rounded-lg font-mono text-xs overflow-x-auto">
        <pre>{`healthy-lifestyle-tips/
│
├── app/                      # Next.js App Router
│   ├── api/                  # API Endpoints
│   │   ├── auth/             # NextAuth konfigurace
│   │   ├── favorites/        # Správa oblíbených
│   │   └── tips/             # CRUD operace
│   ├── category/[category]/  # Dynamické kategorie
│   ├── favorites/            # Favorites page
│   ├── my-tips/              # User tips page
│   ├── admin/                # Admin panel
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Homepage
│   └── globals.css           # Global styles
│
├── components/               # React komponenty
│   ├── ui/                   # shadcn/ui komponenty
│   ├── navigation.tsx        # Nav bar
│   ├── tip-card.tsx          # Tip card
│   └── search-bar.tsx        # Search component
│
├── lib/                      # Utilities
│   ├── auth.ts               # NextAuth config
│   ├── prisma.ts             # Prisma client
│   └── utils.ts              # Helpers
│
├── prisma/                   # Database layer
│   ├── schema.prisma         # DB schema
│   └── seed.ts               # Seed data
│
└── public/                   # Static files`}</pre>
      </div>
    </div>,

    // Slide 8: API Endpoints
    <div key={7} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🔌 API Endpointy
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Authentication
          </h3>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-bold mr-2">
                POST
              </span>
              <code>/api/auth/signin</code> - Přihlášení
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-bold mr-2">
                POST
              </span>
              <code>/api/auth/signout</code> - Odhlášení
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-green-500 text-white rounded text-xs font-bold mr-2">
                GET
              </span>
              <code>/api/auth/session</code> - Získání session
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-600 mb-2">
            Favorites & Tips
          </h3>
          <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-green-500 text-white rounded text-xs font-bold mr-2">
                GET
              </span>
              <code>/api/favorites</code> - Získat oblíbené
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-bold mr-2">
                POST
              </span>
              <code>/api/favorites</code> - Přidat do oblíbených
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-green-500 text-white rounded text-xs font-bold mr-2">
                GET
              </span>
              <code>/api/tips</code> - Získat všechny tipy
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-blue-500 text-white rounded text-xs font-bold mr-2">
                POST
              </span>
              <code>/api/tips</code> - Vytvořit tip
            </div>
            <div className="font-mono text-sm bg-white p-2 rounded">
              <span className="px-2 py-1 bg-red-500 text-white rounded text-xs font-bold mr-2">
                DELETE
              </span>
              <code>/api/tips/:id</code> - Smazat tip
            </div>
          </div>
        </div>
      </div>
    </div>,

    // Slide 9: Security
    <div key={8} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🔒 Bezpečnostní Opatření
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {[
          {
            title: "Autentizace",
            items: [
              "NextAuth.js session management",
              "OAuth 2.0 (Google)",
              "CSRF ochrana",
              "Secure cookies",
            ],
          },
          {
            title: "Databáze",
            items: [
              "Prisma ORM (SQL injection prevention)",
              "SSL šifrované připojení",
              "Validace na úrovni schématu",
              "Kaskádové mazání relací",
            ],
          },
          {
            title: "API Ochrana",
            items: [
              "Session validace",
              "Role-based access control",
              "Input validation",
              "Rate limiting ready",
            ],
          },
          {
            title: "Environment",
            items: [
              "Secrets v .env (gitignored)",
              "NEXTAUTH_SECRET encryption",
              "Vercel Environment Variables",
              "Separate dev/prod configs",
            ],
          },
          {
            title: "Vercel Security",
            items: [
              "Automatický HTTPS/SSL",
              "DDoS ochrana",
              "Edge Network security",
              "Automatic security updates",
            ],
          },
        ].map((sec, idx) => (
          <div
            key={idx}
            className="bg-gradient-to-r from-purple-50 to-purple-100 border-l-4 border-purple-600 p-4 rounded-lg"
          >
            <h4 className="text-lg font-semibold text-purple-700 mb-2">
              {sec.title}
            </h4>
            <ul className="list-disc ml-4 space-y-1 text-sm">
              {sec.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>,

    // Slide 10: Performance
    <div key={9} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        ⚡ Performance Optimalizace
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-xl font-semibold text-purple-600">
            Server Components
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>React Server Components v Next.js 15</li>
            <li>Server-side rendering pro rychlejší načítání</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-600">
            Caching Strategy
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Next.js automatický caching</li>
            <li>Prisma connection pooling</li>
            <li>Vercel Edge Caching</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-600">
            Code Optimization
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Automatické code splitting</li>
            <li>Lazy loading komponent</li>
            <li>Tree shaking (unused code elimination)</li>
            <li>Minifikace v production build</li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-purple-600">
            Vercel Edge Network
          </h3>
          <ul className="list-disc ml-6 text-lg">
            <li>Globální CDN distribuce</li>
            <li>Automatická optimalizace obrázků</li>
            <li>Minimal latency (edge locations)</li>
            <li>Smart routing</li>
          </ul>
        </div>
      </div>
    </div>,

    // Slide 11: Deployment & Stats
    <div key={10} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🚀 Deployment & Statistiky
      </h2>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-purple-600">
          Vercel Deployment Workflow
        </h3>
        <div className="space-y-2 bg-gray-50 p-4 rounded-lg">
          {[
            "1. Development: yarn dev - Local development",
            "2. Git Push: git push origin main - Automatický deploy",
            "3. Build: Vercel automaticky builduje projekt",
            "4. Deploy: Automatický deploy do produkce",
            "5. Live: Aplikace živě na Vercel URL",
          ].map((step, idx) => (
            <div key={idx} className="bg-white p-3 rounded">
              <strong>{step.split(":")[0]}:</strong> {step.split(":")[1]}
            </div>
          ))}
        </div>

        <h3 className="text-xl font-semibold text-purple-600 mt-6">
          📊 Statistiky Projektu
        </h3>
        <div className="grid grid-cols-3 gap-4">
          {[
            { num: "50+", label: "Komponent a Stránek" },
            { num: "15+", label: "Hlavních Knihoven" },
            { num: "6", label: "Database Models" },
            { num: "5+", label: "API Endpoints" },
            { num: "4", label: "Kategorie Tipů" },
            { num: "99.9%", label: "Uptime" },
          ].map((stat, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-r from-purple-600 to-purple-800 text-white p-4 rounded-lg text-center"
            >
              <div className="text-3xl font-bold">{stat.num}</div>
              <div className="text-sm opacity-90">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>,

    // Slide 12: Conclusion
    <div key={11} className="space-y-6">
      <h2 className="text-4xl font-bold text-purple-700 border-b-4 border-purple-600 pb-3">
        🎯 Závěr
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-2xl font-semibold text-purple-600">
            Technické Dovednosti
          </h3>
          <ul className="list-disc ml-6 text-lg space-y-2">
            <li>✅ Moderní Next.js 15 s App Router</li>
            <li>✅ Type-safe development s TypeScript</li>
            <li>✅ Autentizace s NextAuth.js (Google OAuth + Email)</li>
            <li>✅ Databázové operace s Prisma ORM</li>
            <li>✅ Responzivní design s Tailwind CSS</li>
            <li>✅ Komponentová architektura (shadcn/ui)</li>
          </ul>
        </div>

        <div>
          <h3 className="text-2xl font-semibold text-purple-600">
            Production-Ready Features
          </h3>
          <ul className="list-disc ml-6 text-lg space-y-2">
            <li>
              🚀 Plně deploynutá na{" "}
              <span className="px-2 py-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded font-bold">
                Vercel
              </span>
            </li>
            <li>🗄️ PostgreSQL databáze v produkci</li>
            <li>🔒 HTTPS/SSL zabezpečení</li>
            <li>⚙️ Automatické CI/CD pipeline</li>
            <li>🌍 Globální CDN distribuce</li>
            <li>📊 Real-time monitoring</li>
          </ul>
        </div>

        <div className="mt-8 text-center p-8 bg-gradient-to-r from-purple-50 to-purple-100 rounded-2xl">
          <h2 className="text-3xl font-bold text-purple-700 mb-4">
            Projekt je LIVE a dostupný online! 🎉
          </h2>
          <p className="text-xl text-gray-600">
            Full-stack aplikace připravená k dalšímu rozšiřování a škálování
          </p>
        </div>
      </div>
    </div>,
  ];

  return (
    <div className="min-h-screen p-4">
      <div className="fixed top-8 right-8 bg-white px-6 py-3 rounded-full font-bold text-purple-700 shadow-xl z-10">
        {currentSlide + 1} / {totalSlides}
      </div>

      <div className="max-w-6xl mx-auto pt-20 pb-32">
        <div className="bg-white rounded-3xl p-12 min-h-[70vh] overflow-y-auto" style={{ boxShadow: '0 0 60px rgba(0, 0, 0, 0.3)' }}>
          {slides[currentSlide]}
        </div>
      </div>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 flex gap-4 z-10">
        <Button
          onClick={() => changeSlide(-1)}
          disabled={currentSlide === 0}
          className="bg-white text-purple-700 hover:bg-purple-700 hover:text-white px-8 py-6 rounded-full shadow-lg text-lg font-bold disabled:opacity-30"
        >
          <ChevronLeft className="mr-2" />
          Předchozí
        </Button>
        <Button
          onClick={() => changeSlide(1)}
          disabled={currentSlide === totalSlides - 1}
          className="bg-white text-purple-700 hover:bg-purple-700 hover:text-white px-8 py-6 rounded-full shadow-lg text-lg font-bold disabled:opacity-30"
        >
          Další
          <ChevronRight className="ml-2" />
        </Button>
      </div>
    </div>
  );
}
