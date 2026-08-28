import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskItem } from "@/components/task-item";
import { Chip, Empty } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { isDueToday, isOverdue, sortByWhen, todayISO } from "@/lib/date";
import type { Category, Priority } from "@/lib/types";

type StatusFilter = "all" | "today" | "upcoming" | "completed" | "overdue";

type Search = { filter?: StatusFilter; category?: Category };

export const Route = createFileRoute("/tasks")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    filter: (s.filter as StatusFilter) || undefined,
    category: (s.category as Category) || undefined,
  }),
  component: TasksPage,
});

function TasksPage() {
  const search = Route.useSearch();
  const tasks = useAppStore((s) => s.tasks);
  const [status, setStatus] = useState<StatusFilter>(search.filter ?? "today");
  const [cat, setCat] = useState<Category | "all">(search.category ?? "all");
  const [prio, setPrio] = useState<Priority | "all">("all");

  const list = useMemo(() => {
    let next = [...tasks];
    if (cat !== "all") next = next.filter((t) => t.category === cat);
    if (prio !== "all") next = next.filter((t) => t.priority === prio);
    if (status === "today") next = next.filter((t) => isDueToday(t.date));
    if (status === "upcoming")
      next = next.filter(
        (t) => t.status !== "completed" && t.date && t.date > todayISO(),
      );
    if (status === "completed") next = next.filter((t) => t.status === "completed");
    if (status === "overdue") next = next.filter((t) => isOverdue(t.date, t.time, t.status));
    return sortByWhen(next);
  }, [tasks, cat, prio, status]);

  return (
    <AppShell title="Tasks">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
        {(["all", "today", "upcoming", "overdue", "completed"] as StatusFilter[]).map((f) => (
          <Chip key={f} active={status === f} onClick={() => setStatus(f)}>
            {f[0]!.toUpperCase() + f.slice(1)}
          </Chip>
        ))}
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-3">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>
          All lives
        </Chip>
        <Chip tone="personal" active={cat === "personal"} onClick={() => setCat("personal")}>
          Personal
        </Chip>
        <Chip
          tone="professional"
          active={cat === "professional"}
          onClick={() => setCat("professional")}
        >
          Work
        </Chip>
        <Chip tone="financial" active={cat === "financial"} onClick={() => setCat("financial")}>
          Money
        </Chip>
      </div>
      <div className="mb-4 flex gap-2 overflow-x-auto no-scrollbar">
        {(["all", "critical", "high", "medium", "low"] as const).map((p) => (
          <Chip key={p} active={prio === p} onClick={() => setPrio(p)}>
            {p === "all" ? "Any priority" : p[0]!.toUpperCase() + p.slice(1)}
          </Chip>
        ))}
      </div>
      {list.length === 0 ? (
        <Empty
          title={status === "today" ? "No tasks today" : "Nothing here"}
          body="Your schedule is clear. Enjoy the extra time, or plan something important."
        />
      ) : (
        <div className="space-y-2">
          {list.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </div>
      )}
    </AppShell>
  );
}
