import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Category, categoryArray, categoryIcons, categoryDescriptions } from "@/types";

export default async function Home() {
  const tipCounts = await prisma.tip.groupBy({
    by: ["category"],
    _count: true,
  });

  const recentTips = await prisma.tip.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to Healthy Lifestyle Tips
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover practical tips for better sleep, nutrition, movement, and stress management.
          Start your journey to a healthier you today!
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categoryArray.map((category) => {
            const Icon = categoryIcons[category];
            const count = tipCounts.find((c) => c.category === category)?._count || 0;
            
            return (
              <Card key={category} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Icon className="h-6 w-6 text-primary" />
                    <CardTitle className="capitalize">
                      {category.toLowerCase()}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {categoryDescriptions[category]}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/category/${category}`}>
                    <Button className="w-full">
                      View {count} Tips
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Recent Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {recentTips.map((tip) => {
            const Icon = categoryIcons[tip.category as Category];
            return (
              <Card key={tip.id}>
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <Icon className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground capitalize">
                      {tip.category.toLowerCase()}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{tip.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {tip.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </div>
  );
}
