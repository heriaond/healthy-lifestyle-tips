import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { Navigation } from "@/components/navigation";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Healthy Lifestyle Tips",
  description: "Your guide to better sleep, nutrition, movement, and stress management",
  keywords: ["health", "lifestyle", "tips", "sleep", "nutrition", "movement", "stress management", "wellness"],
  authors: [{ name: "Healthy Lifestyle Tips" }],
  openGraph: {
    title: "Healthy Lifestyle Tips",
    description: "Discover practical tips for better sleep, nutrition, movement, and stress management. Start your journey to a healthier you today!",
    type: "website",
    locale: "en_US",
    siteName: "Healthy Lifestyle Tips",
  },
  twitter: {
    card: "summary_large_image",
    title: "Healthy Lifestyle Tips",
    description: "Discover practical tips for better sleep, nutrition, movement, and stress management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navigation />
          <main className="container mx-auto px-4 py-8">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
