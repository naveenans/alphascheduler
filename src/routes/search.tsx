import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Chip, Input } from "@/components/ui";
import { TaskItem } from "@/components/task-item";
import { useAppStore } from "@/lib/store";
import type { Category } from "@/lib/types";

export const Route = createFileRoute("/search")({ component: SearchPage });

function SearchPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<Category | "all">("all");
  const tasks = useAppStore((s) => s.tasks);
  const goals = useAppStore((s) => s.goals);
  const projects = useAppStore((s) => s.projects);

  const needle = q.trim().toLowerCase();
  const hits = useMemo(() => {
    if (!needle) return { tasks: [], goals: [], projects: [] };
    const match = (s: string) => s.toLowerCase().includes(needle);
    return {
      tasks: tasks.filter(
        (t) =>
          (cat === "all" || t.category === cat) &&
          (match(t.title) || match(t.description) || match(t.notes) || match(t.subcategory)),
      ),
      goals: goals.filter((g) => match(g.title) || match(g.description)),
      projects: projects.filter((p) => match(p.name) || match(p.description)),
    };
  }, [needle, tasks, goals, projects, cat]);

  return (
    <AppShell title="Search" hideFab>
      <Input
        autoFocus
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Tasks, goals, notes, projects"
      />
      <div className="mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-3">
        <Chip active={cat === "all"} onClick={() => setCat("all")}>
          All
        </Chip>
        <Chip tone="personal" active={cat === "personal"} onClick={() => setCat("personal")}>
          Personal
        </Chip>
        <Chip tone="professional" active={cat === "professional"} onClick={() => setCat("professional")}>
          Work
        </Chip>
        <Chip tone="financial" active={cat === "financial"} onClick={() => setCat("financial")}>
          Money
        </Chip>
      </div>
      {!needle ? (
        <p className="mt-8 text-center text-sm text-muted">Search across your whole plan.</p>
      ) : (
        <div className="space-y-6">
          <section>
            <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
              Tasks · {hits.tasks.length}
            </h2>
            <div className="space-y-2">
              {hits.tasks.map((t) => (
                <TaskItem key={t.id} task={t} />
              ))}
            </div>
          </section>
          {hits.goals.length > 0 ? (
            <section>
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Goals</h2>
              {hits.goals.map((g) => (
                <Link key={g.id} to="/goals" className="mb-2 block rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]">
                  {g.title}
                </Link>
              ))}
            </section>
          ) : null}
          {hits.projects.length > 0 ? (
            <section>
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Projects</h2>
              {hits.projects.map((p) => (
                <Link key={p.id} to="/professional" className="mb-2 block rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]">
                  {p.name}
                </Link>
              ))}
            </section>
          ) : null}
        </div>
      )}
    </AppShell>
  );
}
