import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { categoryArray, Category } from "@/types/categories";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";

    const tips = await prisma.tip.findMany({
      where: search
        ? {
            OR: [
              { title: { contains: search } },
              { description: { contains: search } },
            ],
          }
        : undefined,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ tips });
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
