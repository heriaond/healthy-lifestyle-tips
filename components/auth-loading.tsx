"use client";

import { useSession } from "next-auth/react";

export function AuthLoading({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-muted rounded-full"></div>
          <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Text with animated dots */}
        <div className="mt-6 text-lg text-muted-foreground">
          Authenticating
          <span className="inline-flex w-8">
            <span className="animate-bounce" style={{ animationDelay: "0ms" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "150ms" }}>.</span>
            <span className="animate-bounce" style={{ animationDelay: "300ms" }}>.</span>
          </span>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
