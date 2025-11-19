import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryArray, Category } from "@/types/categories";

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const categories = searchParams.get("categories")?.split(",").filter(Boolean) || [];
    const searchIn = searchParams.get("searchIn") || "both";
    const showFavorites = searchParams.get("favorites") === "true";
    const showMyTips = searchParams.get("myTips") === "true";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "9");

    // Get user's favorites for filtering and display
    let userFavoriteIds: string[] = [];
    if (session?.user?.id) {
      const favorites = await prisma.favorite.findMany({
        where: { userId: session.user.id },
        select: { tipId: true },
      });
      userFavoriteIds = favorites.map((f) => f.tipId);
    }

    // Build where clause
    const whereConditions: any[] = [];

    // Category filter
    if (categories.length > 0) {
      whereConditions.push({
        category: { in: categories },
      });
    }

    // Label filters (can be combined with OR)
    if (session?.user?.id && (showFavorites || showMyTips)) {
      const labelConditions: any[] = [];

      if (showFavorites) {
        labelConditions.push({
          id: { in: userFavoriteIds },
        });
      }

      if (showMyTips) {
        labelConditions.push({
          createdById: session.user.id,
        });
      }

      if (labelConditions.length > 0) {
        whereConditions.push({ OR: labelConditions });
      }
    }

    // Search filter
    if (search.trim()) {
      const searchConditions: any[] = [];

      if (searchIn === "title" || searchIn === "both") {
        searchConditions.push({ title: { contains: search } });
      }
      if (searchIn === "description" || searchIn === "both") {
        searchConditions.push({ description: { contains: search } });
      }

      if (searchConditions.length > 0) {
        whereConditions.push({ OR: searchConditions });
      }
    }

    const where = whereConditions.length > 0 ? { AND: whereConditions } : undefined;

    // Get total count
    const total = await prisma.tip.count({ where });

    // Get paginated results
    const tips = await prisma.tip.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * limit,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      tips,
      total,
      page,
      totalPages,
      hasMore: page < totalPages,
      favoritedIds: userFavoriteIds,
    });
  } catch (error) {
    console.error("Tips search error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, category } = await req.json();

    // Validate required fields
    if (!title || !description || !category) {
      return NextResponse.json(
        { error: "Title, description, and category are required" },
        { status: 400 }
      );
    }

    // Validate title length
    if (title.length < 1 || title.length > 100) {
      return NextResponse.json(
        { error: "Title must be between 1 and 100 characters" },
        { status: 400 }
      );
    }

    // Validate description length
    if (description.length < 1 || description.length > 500) {
      return NextResponse.json(
        { error: "Description must be between 1 and 500 characters" },
        { status: 400 }
      );
    }

    // Validate category
    if (!categoryArray.includes(category as Category)) {
      return NextResponse.json({ error: "Invalid category" }, { status: 400 });
    }

    // Create the tip
    const tip = await prisma.tip.create({
      data: {
        title,
        description,
        category: category as Category,
        createdBy: {
          connect: { id: session.user.id },
        },
      },
    });

    return NextResponse.json({ tip }, { status: 201 });
  } catch (error) {
    console.error("Tips API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
