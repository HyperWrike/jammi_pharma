import { action } from "../_generated/server";
import { v } from "convex/values";

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export const chatCompletion = action({
  args: {
    systemPrompt: v.string(),
    catalogContext: v.string(),
    userMessage: v.string(),
    model: v.optional(v.string()),
  },
  handler: async (_ctx, args) => {
    const groqKey =
      process.env.GROQ_API_KEY ||
      process.env.GROQ_KEY ||
      process.env.GROQ_API_TOKEN;

    if (!groqKey) {
      return {
        ok: false,
        status: 401,
        error: "GROQ_API_KEY is not configured in Convex environment",
      };
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groqKey}`,
      },
      body: JSON.stringify({
        model: args.model || "llama-3.3-70b-versatile",
        temperature: 0.3,
        max_tokens: 700,
        messages: [
          { role: "system", content: args.systemPrompt },
          { role: "system", content: `CATALOG:\n${args.catalogContext}` },
          { role: "user", content: args.userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return {
        ok: false,
        status: response.status,
        error: text.slice(0, 300),
      };
    }

    const data = await response.json();
    const content = data?.choices?.[0]?.message?.content || "";

    return {
      ok: true,
      content,
    };
  },
});
