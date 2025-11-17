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
import { Mail, ArrowLeft } from "lucide-react";

export function EmailOTPDialog({ children }: { children: React.ReactNode }) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"email" | "otp">("email");
  const [open, setOpen] = useState(false);

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (data.success) {
        setStep("otp");
      } else {
        alert(data.error || "Failed to send OTP. Please try again.");
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in using the email-otp provider
      const result = await signIn("email-otp", {
        email,
        otp,
        redirect: false,
      });

      if (result?.error) {
        alert("Invalid or expired code. Please try again.");
      } else if (result?.ok) {
        // Successfully authenticated
        handleClose();
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Verify OTP error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setStep("email");
      setEmail("");
      setOtp("");
    }, 200);
  };

  const handleBack = () => {
    setStep("email");
    setOtp("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in with Email</DialogTitle>
          <DialogDescription>
            {step === "email"
              ? "Enter your email address to receive a verification code."
              : `We sent a 6-digit code to ${email}`}
          </DialogDescription>
        </DialogHeader>

        {step === "email" ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
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
                {loading ? "Sending..." : "Send Code"}
              </Button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="otp">Verification Code</Label>
              <Input
                id="otp"
                type="text"
                placeholder="123456"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                disabled={loading}
                autoFocus
                maxLength={6}
                className="text-center text-2xl tracking-widest"
              />
              <p className="text-xs text-muted-foreground text-center">
                Enter the 6-digit code sent to your email
              </p>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                size="icon"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="flex-1"
              >
                {loading ? "Verifying..." : "Verify & Sign In"}
              </Button>
            </div>
            <Button
              type="button"
              variant="link"
              onClick={handleSendOTP}
              disabled={loading}
              className="w-full"
            >
              Resend code
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
