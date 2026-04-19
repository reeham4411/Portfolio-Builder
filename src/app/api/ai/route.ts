import { NextRequest, NextResponse } from "next/server";
import { requireAuthUser } from "@/lib/auth";
import { groqComplete } from "@/lib/groq";

const SYSTEM_PROMPT = `You are an expert portfolio writing assistant.
You help professionals write compelling content for their portfolio websites.
Your tone is confident, concise, and human — never robotic or generic.
Always write in first person unless asked otherwise.
Keep responses focused and under 150 words unless a list is requested.
If you generate a bio or project description the user can apply directly,
end your response with one of these tags on its own line:
[APPLY:bio] — if the entire response is a ready-to-use bio
[APPLY:projectDesc] — if the entire response is a ready-to-use project description
Do not explain the tag. Just place it at the end.`;

export async function POST(req: NextRequest) {
  try {
    // Auth guard — AI is only for logged-in users
    await requireAuthUser();

    const { prompt } = await req.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    if (prompt.length > 2000) {
      return NextResponse.json(
        { error: "Prompt too long (max 2000 characters)" },
        { status: 400 },
      );
    }

    const content = await groqComplete({
      system: SYSTEM_PROMPT,
      user: prompt,
      maxTokens: 600,
    });

    return NextResponse.json({ content });
  }  catch (err: unknown) {
  console.error("AI route error:", err);

  if (err instanceof Error && err.message === "UNAUTHORIZED") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      error:
        err instanceof Error
          ? err.message
          : "AI generation failed. Please try again.",
    },
    { status: 500 },
  );
}}