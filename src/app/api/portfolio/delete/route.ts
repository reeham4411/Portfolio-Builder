import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth";
import { deletePortfolio } from "@/lib/portfolio";

export async function DELETE(req: NextRequest) {
  try {
    const user = await requireAuthUser();

    const { portfolioId } = await req.json();

    if (!portfolioId) {
      return NextResponse.json(
        { error: "portfolioId is required" },
        { status: 400 },
      );
    }

    await deletePortfolio({ portfolioId, userId: user.id });

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: (err as Error).message || "Failed to delete portfolio" },
      { status: 500 },
    );
  }
}