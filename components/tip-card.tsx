"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Heart, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Tip } from "@/types";

export function TipCard({ tip, initialFavorited = false }: { tip: Tip; initialFavorited?: boolean }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // Check if user can delete this tip
  const canDelete = session && (
    tip.createdById === session.user?.id ||
    session.user?.role === "admin"
  );

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

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/tips/${tip.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDeleteDialogOpen(false);
        router.refresh();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete tip");
      }
    } catch (error) {
      console.error("Error deleting tip:", error);
      alert("An error occurred while deleting the tip");
    } finally {
      setDeleting(false);
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
          <div className="flex items-center gap-1">
            {canDelete && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={deleting}
                className="shrink-0 text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-5 w-5" />
              </Button>
            )}
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
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">{tip.description}</p>
      </CardContent>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Tip</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{tip.title}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
