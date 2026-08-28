import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button, Chip, Textarea } from "@/components/ui";
import { askAlpha, type AiResult, type AiTaskSuggestion } from "@/lib/ai";
import { parseQuickAdd } from "@/lib/nlp";
import { emptyDraft, useAppStore } from "@/lib/store";
import { formatDayHeading, todayISO } from "@/lib/date";
import { CATEGORY_META } from "@/lib/types";

export const Route = createFileRoute("/ai")({ component: AiPage });

function AiPage() {
  const enabled = useAppStore((s) => s.settings.aiEnabled);
  const tasks = useAppStore((s) => s.tasks);
  const addTask = useAppStore((s) => s.addTask);
  const [prompt, setPrompt] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [insight, setInsight] = useState("");
  const [suggestions, setSuggestions] = useState<AiTaskSuggestion[]>([]);
  const [picked, setPicked] = useState<Record<number, boolean>>({});

  const context = useMemo(() => {
    const today = tasks
      .filter((t) => t.date === todayISO())
      .map((t) => `${t.status === "completed" ? "done" : "open"} · ${t.category} · ${t.title}`)
      .join("\n");
    return `Today is ${formatDayHeading(new Date())}.\n${today || "No tasks dated today."}`;
  }, [tasks]);

  async function run(mode: "parse" | "plan" | "summary") {
    if (!prompt.trim() && mode === "parse") return;
    setBusy(true);
    setError("");
    try {
      const result: AiResult = await askAlpha({
        data: {
          prompt:
            mode === "summary"
              ? "Summarize today's workload and suggest a calm plan for tomorrow."
              : prompt,
          context,
          mode,
        },
      });
      if (!result.ok) {
        if (mode === "parse") fallbackLocal();
        else setError(result.error);
        return;
      }
      setInsight(result.insight);
      setSuggestions(result.tasks);
      setPicked(Object.fromEntries(result.tasks.map((_, i) => [i, true])));
    } catch {
      if (mode === "parse") fallbackLocal();
      else setError("Something went wrong. Try again.");
    } finally {
      setBusy(false);
    }
  }

  function fallbackLocal() {
    const chunks = prompt
      .split(/,| and | then |\n/i)
      .map((s) => s.trim())
      .filter(Boolean);
    const items = (chunks.length ? chunks : [prompt]).map((c) => {
      const p = parseQuickAdd(c);
      return {
        title: p.title,
        category: p.category,
        date: p.date,
        time: p.time,
        priority: p.priority,
        amount: p.amount,
        reason: "Parsed on device",
      } satisfies AiTaskSuggestion;
    });
    setInsight("I sketched this from your words. Confirm anything you want saved.");
    setSuggestions(items);
    setPicked(Object.fromEntries(items.map((_, i) => [i, true])));
  }

  function confirm() {
    suggestions.forEach((s, i) => {
      if (!picked[i]) return;
      addTask(
        emptyDraft({
          title: s.title,
          category: s.category,
          date: s.date,
          time: s.time,
          priority: s.priority,
          amount: s.amount,
          kind: s.category === "financial" ? "payment" : "todo",
        }),
      );
    });
    setSuggestions([]);
    setInsight("Saved. Let's make today count.");
    setPrompt("");
  }

  return (
    <AppShell title="Assistant">
      {!enabled ? (
        <p className="text-sm text-muted">The assistant is off. Enable it in Settings when you want help planning.</p>
      ) : (
        <>
          <p className="text-sm leading-relaxed text-muted">
            Describe what you need in plain language. I'll propose tasks — nothing is created until you confirm.
          </p>
          <Textarea
            className="mt-4 min-h-32"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="I need to finish the project report, call the client and pay the electricity bill tomorrow."
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <Button disabled={busy} onClick={() => void run("parse")}>
              {busy ? "Thinking…" : "Propose tasks"}
            </Button>
            <Button variant="secondary" disabled={busy} onClick={() => void run("summary")}>
              Summarize today
            </Button>
          </div>
          {error ? <p className="mt-3 text-sm text-warn">{error}</p> : null}
          {insight ? <p className="mt-5 text-[15px] leading-relaxed">{insight}</p> : null}
          {suggestions.length > 0 ? (
            <div className="mt-4 space-y-2">
              {suggestions.map((s, i) => (
                <button
                  key={`${s.title}-${i}`}
                  type="button"
                  onClick={() => setPicked((p) => ({ ...p, [i]: !p[i] }))}
                  className="w-full rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--elev-border)]"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="font-medium">{s.title}</p>
                    <Chip active={Boolean(picked[i])}>{picked[i] ? "Keep" : "Skip"}</Chip>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    {CATEGORY_META[s.category].label}
                    {s.date ? ` · ${s.date}` : ""}
                    {s.time ? ` · ${s.time}` : ""}
                    {s.reason ? ` · ${s.reason}` : ""}
                  </p>
                </button>
              ))}
              <Button className="mt-2 w-full" onClick={confirm}>
                Create selected
              </Button>
            </div>
          ) : null}
        </>
      )}
    </AppShell>
  );
}
