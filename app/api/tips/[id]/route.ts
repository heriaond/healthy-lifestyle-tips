import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    // Get the tip to check ownership
    const tip = await prisma.tip.findUnique({
      where: { id },
      select: { createdById: true },
    });

    if (!tip) {
      return NextResponse.json({ error: "Tip not found" }, { status: 404 });
    }

    // Check authorization: user must be creator or admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { role: true },
    });

    const isCreator = tip.createdById === session.user.id;
    const isAdmin = user?.role === "admin";

    if (!isCreator && !isAdmin) {
      return NextResponse.json(
        { error: "You don't have permission to delete this tip" },
        { status: 403 }
      );
    }

    // Delete the tip
    await prisma.tip.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete tip error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
