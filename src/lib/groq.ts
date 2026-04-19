import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export interface GroqMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

/**
 * Send a chat completion request to Groq (LLaMA 3).
 * Returns the assistant's text response.
 */
export async function groqChat(
  messages: GroqMessage[],
  maxTokens = 800,
): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-8b-instant",
    messages,
    max_tokens: maxTokens,
    temperature: 0.7,
  });

  return completion.choices[0]?.message?.content ?? "";
}

/**
 * Single-turn helper — pass a system prompt + user message,
 * get back a string. Used by the AI assistant route.
 */
export async function groqComplete(params: {
  system: string;
  user: string;
  maxTokens?: number;
}): Promise<string> {
  return groqChat(
    [
      { role: "system", content: params.system },
      { role: "user", content: params.user },
    ],
    params.maxTokens ?? 800,
  );
}