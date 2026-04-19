import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth";
import { upsertPortfolio } from "@/lib/portfolio";
import type { PortfolioData, TemplateId } from "@/types/portfolio";

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuthUser();

    const body = await req.json();
    const {
      portfolioId,
      title,
      templateId,
      content,
    }: {
      portfolioId: string | null;
      title: string;
      templateId: TemplateId;
      content: PortfolioData;
    } = body;

    if (!templateId || !content) {
      return NextResponse.json(
        { error: "templateId and content are required" },
        { status: 400 },
      );
    }

    const portfolio = await upsertPortfolio({
      portfolioId: portfolioId ?? null,
      userId: user.id,
      title: title || `${content.personalInfo?.name || "Untitled"} Portfolio`,
      templateId,
      content,
    });

    return NextResponse.json({ portfolio });
  } catch (err: unknown) {
    if (err instanceof Error && err.message === "UNAUTHORIZED") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.json(
      { error: (err as Error).message || "Failed to save portfolio" },
      { status: 500 },
    );
  }
}