import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TipCard } from "@/components/tip-card";
import { Heart } from "lucide-react";

export default async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    include: { tip: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Heart className="h-10 w-10 text-primary fill-primary" />
        <div>
          <h1 className="text-3xl font-bold">My Favorite Tips</h1>
          <p className="text-muted-foreground">
            Your collection of saved health and wellness tips
          </p>
        </div>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {favorites.map((fav) => (
            <TipCard key={fav.id} tip={fav.tip} initialFavorited={true} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            You haven&apos;t favorited any tips yet.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Browse tips and click the heart icon to save your favorites!
          </p>
        </div>
      )}
    </div>
  );
}
