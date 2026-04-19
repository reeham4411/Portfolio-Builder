import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth";
import { publishPortfolio, getPortfolioById } from "@/lib/portfolio";
import { generateSlug } from "@/lib/slug";
import { createClient } from "@/lib/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthUser();

    const { portfolioId, fullName } = await req.json();

    if (!portfolioId) {
      return NextResponse.json(
        { error: "portfolioId is required" },
        { status: 400 },
      );
    }

    // Verify the portfolio belongs to this user
    const existing = await getPortfolioById(portfolioId);
    if (!existing) {
      return NextResponse.json(
        { error: "Portfolio not found" },
        { status: 404 },
      );
    }
    if (existing.user_id !== user.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Re-use existing slug if already published, otherwise generate a fresh one
    let slug = existing.slug;

    if (!slug) {
      const supabase = await createClient();
      let attempts = 0;

      // Retry up to 5 times to get a unique slug
      while (attempts < 5) {
        const candidate = generateSlug(fullName || "portfolio");
        const { data } = await supabase
          .from("portfolios")
          .select("id")
          .eq("slug", candidate)
          .maybeSingle();

        if (!data) {
          slug = candidate;
          break;
        }
        attempts++;
      }

      if (!slug) {
        return NextResponse.json(
          { error: "Failed to generate unique slug. Try again." },
          { status: 500 },
        );
      }
    }

    const portfolio = await publishPortfolio({
      portfolioId,
      userId: user.id,
      slug,
    });

    return NextResponse.json({ portfolio });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: (err as Error).message || "Failed to publish portfolio" },
      { status: 500 },
    );
  }
}