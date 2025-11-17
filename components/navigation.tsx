"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Home, Menu, Mail } from "lucide-react";
import { FaGoogle, FaDiscord } from "react-icons/fa";
import { EmailOTPDialog } from "@/components/email-otp-dialog";

const categories = [
  { name: "Sleep", value: "SLEEP" },
  { name: "Nutrition", value: "NUTRITION" },
  { name: "Movement", value: "MOVEMENT" },
  { name: "Stress", value: "STRESS" },
];

export function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="border-b bg-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/" className="text-xl font-bold text-primary">
              Healthy Lifestyle Tips
            </Link>
            
            <div className="hidden md:flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <Menu className="mr-2 h-4 w-4" />
                    Categories
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>Browse by Category</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {categories.map((cat) => (
                    <DropdownMenuItem key={cat.value} asChild>
                      <Link href={`/category/${cat.value}`}>{cat.name}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {session && (
                <Link href="/favorites">
                  <Button variant="ghost" size="sm">
                    <Heart className="mr-2 h-4 w-4" />
                    Favorites
                  </Button>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar>
                      <AvatarImage src={session.user?.image || ""} alt={session.user?.name || ""} />
                      <AvatarFallback>
                        {session.user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="md:hidden">
                    <Link href="/favorites">Favorites</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="md:hidden" />
                  <DropdownMenuItem onClick={() => signOut()}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>Sign In</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Sign-in with</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => signIn("google")}>
                    <FaGoogle className="mr-2 h-4 w-4" />
                    Google
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signIn("discord")}>
                    <FaDiscord className="mr-2 h-4 w-4" />
                    Discord
                  </DropdownMenuItem>
                  <EmailOTPDialog>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      <Mail className="mr-2 h-4 w-4" />
                      Email (OTP Code)
                    </DropdownMenuItem>
                  </EmailOTPDialog>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
