import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const Input = z.object({
  prompt: z.string().min(1).max(2000),
  context: z.string().max(4000).optional(),
  mode: z
    .enum(["parse", "plan", "summary", "subtasks", "insight"])
    .default("parse"),
});

export type AiTaskSuggestion = {
  title: string;
  category: "personal" | "professional" | "financial";
  date: string | null;
  time: string | null;
  priority: "critical" | "high" | "medium" | "low";
  amount: number | null;
  reason: string;
};

export type AiResult =
  | {
      ok: true;
      insight: string;
      tasks: AiTaskSuggestion[];
      subtasks: string[];
    }
  | { ok: false; error: string };

export const askAlpha = createServerFn({ method: "POST" })
  .validator((input: unknown) => Input.parse(input))
  .handler(async ({ data }): Promise<AiResult> => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false, error: "AI is not available in this environment." };
    }

    const system = `You are Alpha, a calm productivity companion inside Alpha Scheduler.
Return ONLY valid JSON with keys: insight (string), tasks (array), subtasks (array of strings).
Each task: title, category (personal|professional|financial), date (YYYY-MM-DD or null), time (HH:mm or null), priority (critical|high|medium|low), amount (number or null), reason (short).
Never give investment advice. Never store or request banking credentials.
Tone: positive, professional, motivating. No guilt. No emoji.
Today's context may be provided. Suggest reasonable times. Do not create more than 8 tasks.
Mode: ${data.mode}`;

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        temperature: 0.3,
        max_tokens: 700,
        messages: [
          { role: "system", content: system },
          {
            role: "user",
            content: data.context
              ? `${data.prompt}\n\nContext:\n${data.context}`
              : data.prompt,
          },
        ],
      }),
    });

    if (!res.ok) {
      return { ok: false, error: "The assistant could not be reached. Try again." };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content ?? "";
    const jsonStart = text.indexOf("{");
    const jsonEnd = text.lastIndexOf("}");
    if (jsonStart < 0 || jsonEnd < 0) {
      return {
        ok: true,
        insight: text.slice(0, 280) || "I couldn't structure that. Try a shorter request.",
        tasks: [],
        subtasks: [],
      };
    }
    try {
      const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1)) as {
        insight?: string;
        tasks?: AiTaskSuggestion[];
        subtasks?: string[];
      };
      return {
        ok: true,
        insight: parsed.insight ?? "Here's a plan you can confirm.",
        tasks: Array.isArray(parsed.tasks) ? parsed.tasks.slice(0, 8) : [],
        subtasks: Array.isArray(parsed.subtasks) ? parsed.subtasks.slice(0, 12) : [],
      };
    } catch {
      return { ok: false, error: "The assistant returned something I couldn't read." };
    }
  });
