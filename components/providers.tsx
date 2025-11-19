"use client";

import { SessionProvider } from "next-auth/react";
import { AuthLoading } from "@/components/auth-loading";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthLoading>{children}</AuthLoading>
    </SessionProvider>
  );
}
