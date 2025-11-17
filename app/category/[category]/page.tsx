import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { TipCard } from "@/components/tip-card";
import { Moon, Apple, Dumbbell, Brain } from "lucide-react";

const categoryIcons = {
  SLEEP: Moon,
  NUTRITION: Apple,
  MOVEMENT: Dumbbell,
  STRESS: Brain,
};

const categoryDescriptions = {
  SLEEP: "Tips for better sleep and healthy sleep habits",
  NUTRITION: "Nutrition advice and healthy eating practices",
  MOVEMENT: "Exercise tips and physical activity recommendations",
  STRESS: "Stress management and relaxation techniques",
};

type CategoryType = "SLEEP" | "NUTRITION" | "MOVEMENT" | "STRESS";

export async function generateStaticParams() {
  return [
    { category: "SLEEP" },
    { category: "NUTRITION" },
    { category: "MOVEMENT" },
    { category: "STRESS" },
  ];
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category.toUpperCase() as CategoryType;

  if (!["SLEEP", "NUTRITION", "MOVEMENT", "STRESS"].includes(category)) {
    notFound();
  }

  const tips = await prisma.tip.findMany({
    where: { category },
    orderBy: { createdAt: "desc" },
  });

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
          <TipCard key={tip.id} tip={tip} />
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
