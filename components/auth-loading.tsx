"use client";

import { useSession } from "next-auth/react";
import { LoadingSpinner } from "@/components/loading-spinner";

export function AuthLoading({ children }: { children: React.ReactNode }) {
  const { status } = useSession();

  if (status === "loading") {
    return <LoadingSpinner text="Authenticating" fullPage />;
  }

  return <>{children}</>;
}
