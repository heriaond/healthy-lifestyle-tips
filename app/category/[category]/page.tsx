import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TipCard } from "@/components/tip-card";
import { Category, categoryArray, categoryIcons, categoryDescriptions } from "@/types";

export async function generateStaticParams() {
  return categoryArray.map((category) => ({ category }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { category: categoryParam } = await params;
  const category = categoryParam.toUpperCase() as Category;

  if (!categoryArray.includes(category as Category)) {
    notFound();
  }

  const tips = await prisma.tip.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });

  // Get user's favorites
  let favoritedTipIds = new Set<string>();
  if (session?.user?.id) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: session.user.id },
      select: { tipId: true },
    });
    favoritedTipIds = new Set(favorites.map((f) => f.tipId));
  }

  const Icon = categoryIcons[category];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Icon className="h-10 w-10 text-primary" />
        <div>
          <h1 className="text-3xl font-bold capitalize">
            {category.toLowerCase()} Tips
          </h1>
          <p className="text-muted-foreground">{categoryDescriptions[category]}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tips.map((tip) => (
          <TipCard
            key={tip.id}
            tip={tip}
            initialFavorited={favoritedTipIds.has(tip.id)}
          />
        ))}
      </div>

      {tips.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No tips found for this category.</p>
        </div>
      )}
    </div>
  );
}
