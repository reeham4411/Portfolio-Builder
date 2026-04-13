export async function generateAIContent(prompt: string): Promise<string> {
  const response = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });
  if (!response.ok) throw new Error("AI generation failed");
  const data = await response.json();
  return data.content;
}