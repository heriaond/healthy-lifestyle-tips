"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";

export function EmailSignInDialog({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("email", {
        email,
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        alert("Failed to send magic link. Please try again.");
      } else {
        setSent(true);
      }
    } catch (error) {
      console.error("Email sign-in error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    // Reset state after dialog closes
    setTimeout(() => {
      setSent(false);
      setEmail("");
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in with Email</DialogTitle>
          <DialogDescription>
            {sent
              ? "Check your email for a magic link to sign in."
              : "Enter your email address and we'll send you a magic link to sign in."}
          </DialogDescription>
        </DialogHeader>

        {sent ? (
          <div className="space-y-4">
            <div className="flex items-center justify-center p-6">
              <div className="text-center space-y-3">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Email sent!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Check your inbox at <strong>{email}</strong>
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    The link will expire in 24 hours.
                  </p>
                </div>
              </div>
            </div>
            <Button onClick={handleClose} className="w-full">
              Close
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email address</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoFocus
              />
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                disabled={loading}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading || !email} className="flex-1">
                {loading ? "Sending..." : "Send Magic Link"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
