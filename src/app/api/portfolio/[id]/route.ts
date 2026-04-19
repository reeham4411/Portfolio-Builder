import { NextRequest, NextResponse } from "next/server";
import { getPortfolioById } from "@/lib/portfolio";
import { getAuthUser } from "@/lib/auth";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json({ error: "Portfolio ID required" }, { status: 400 });
    }

    const portfolio = await getPortfolioById(id);

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // If the portfolio is not published, only the owner can view it
    if (!portfolio.is_published) {
      const user = await getAuthUser();
      if (!user || user.id !== portfolio.user_id) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    return NextResponse.json({ portfolio });
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 },
    );
  }
}