import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/task-form";
import { parseQuickAdd } from "@/lib/nlp";
import { emptyDraft, useAppStore } from "@/lib/store";
import type { Category, TaskKind } from "@/lib/types";

type Search = { q?: string; kind?: TaskKind; category?: Category; date?: string };

export const Route = createFileRoute("/create")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : undefined,
    kind: s.kind as TaskKind | undefined,
    category: s.category as Category | undefined,
    date: typeof s.date === "string" ? s.date : undefined,
  }),
  component: CreatePage,
});

function CreatePage() {
  const search = Route.useSearch();
  const add = useAppStore((s) => s.addTask);
  const navigate = useNavigate();
  const parsed = search.q ? parseQuickAdd(search.q) : null;
  const initial = emptyDraft({
    title: parsed?.title ?? search.q ?? "",
    kind: search.kind ?? parsed?.kind ?? "todo",
    category: search.category ?? parsed?.category ?? "personal",
    date: search.date ?? parsed?.date ?? null,
    time: parsed?.time ?? null,
    amount: parsed?.amount ?? null,
    priority: parsed?.priority ?? "medium",
    repeat: parsed?.repeat ?? { type: "none" },
  });

  return (
    <AppShell title="New task" hideFab>
      <TaskForm
        initial={initial}
        submitLabel="Save task"
        onSubmit={(draft) => {
          const id = add(draft);
          navigate({ to: "/task/$id", params: { id } });
        }}
      />
    </AppShell>
  );
}
