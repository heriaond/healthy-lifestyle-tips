import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    if (user?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    // Get statistics
    const [
      totalUsers,
      totalTips,
      totalFavorites,
      adminCount,
      tipsByCategory,
      recentUsers,
      recentTips,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.tip.count(),
      prisma.favorite.count(),
      prisma.user.count({ where: { role: "admin" } }),
      prisma.tip.groupBy({
        by: ["category"],
        _count: { id: true },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { id: "desc" },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
        },
      }),
      prisma.tip.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          title: true,
          category: true,
          createdAt: true,
          createdBy: {
            select: { email: true },
          },
        },
      }),
    ]);

    // Transform tipsByCategory to a more usable format
    const categoryStats = tipsByCategory.reduce(
      (acc, item) => {
        acc[item.category] = item._count.id;
        return acc;
      },
      {} as Record<string, number>
    );

    return NextResponse.json({
      stats: {
        totalUsers,
        totalTips,
        totalFavorites,
        adminCount,
        categoryStats,
      },
      recentUsers,
      recentTips,
    });
  } catch (error) {
    console.error("Admin stats error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
