"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";

type Tip = {
  id: string;
  category: string;
  title: string;
  description: string;
  createdAt: Date;
};

export function TipCard({ tip, initialFavorited = false }: { tip: Tip; initialFavorited?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  const toggleFavorite = async () => {
    if (!session) {
      alert("Please sign in to favorite tips");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipId: tip.id }),
      });

      if (response.ok) {
        const data = await response.json();
        setFavorited(data.favorited);
        router.refresh();
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setLoading(false);
    }
  };

  const heartClass = favorited 
    ? "h-5 w-5 fill-red-500 text-red-500" 
    : "h-5 w-5 text-muted-foreground";

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <CardDescription className="capitalize mb-2">
              {tip.category.toLowerCase()}
            </CardDescription>
            <CardTitle className="text-lg">{tip.title}</CardTitle>
          </div>
          {session && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFavorite}
              disabled={loading}
              className="shrink-0"
            >
              <Heart className={heartClass} />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{tip.description}</p>
      </CardContent>
    </Card>
  );
}
