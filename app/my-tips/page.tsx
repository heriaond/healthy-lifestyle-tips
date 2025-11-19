import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TipCard } from "@/components/tip-card";
import { Lightbulb } from "lucide-react";

export default async function MyTipsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/");
  }

  const tips = await prisma.tip.findMany({
    where: { createdById: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  // Get user's favorites to mark them
  const favorites = await prisma.favorite.findMany({
    where: { userId: session.user.id },
    select: { tipId: true },
  });

  const favoritedTipIds = new Set(favorites.map((f) => f.tipId));

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Lightbulb className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">My Tips</h1>
          <p className="text-muted-foreground">
            Tips you've created and shared with the community
          </p>
        </div>
      </div>

      {tips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tips.map((tip) => (
            <TipCard
              key={tip.id}
              tip={tip}
              initialFavorited={favoritedTipIds.has(tip.id)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Lightbulb className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">
            You haven't created any tips yet.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Click "Add Tip" in the navigation to share your first tip!
          </p>
        </div>
      )}
    </div>
  );
}
