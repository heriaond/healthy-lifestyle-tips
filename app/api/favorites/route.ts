import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { tipId } = await req.json();

    if (!tipId) {
      return NextResponse.json({ error: "Tip ID is required" }, { status: 400 });
    }

    // Check if already favorited
    const existing = await prisma.favorite.findUnique({
      where: {
        userId_tipId: {
          userId: session.user.id,
          tipId,
        },
      },
    });

    if (existing) {
      // Remove favorite
      await prisma.favorite.delete({
        where: {
          id: existing.id,
        },
      });
      return NextResponse.json({ favorited: false });
    } else {
      // Add favorite
      await prisma.favorite.create({
        data: {
          userId: session.user.id,
          tipId,
        },
      });
      return NextResponse.json({ favorited: true });
    }
  } catch (error) {
    console.error("Favorites API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
