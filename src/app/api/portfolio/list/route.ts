import { NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth";
import { listUserPortfolios } from "@/lib/portfolio";

export async function GET() {
  try {
    const user = await requireAuthUser();
    const portfolios = await listUserPortfolios(user.id);
    return NextResponse.json({ portfolios });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: (err as Error).message || "Failed to fetch portfolios" },
      { status: 500 },
    );
  }
}