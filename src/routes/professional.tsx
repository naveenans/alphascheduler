import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskItem } from "@/components/task-item";
import { Bar, Button, Field, Input, SectionTitle, Sheet } from "@/components/ui";
import { isDueToday, isOverdue, sortByWhen } from "@/lib/date";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/professional")({ component: WorkPage });

function WorkPage() {
  const all = useAppStore((s) => s.tasks);
  const tasks = all.filter((t) => t.category === "professional");
  const projects = useAppStore((s) => s.projects);
  const addProject = useAppStore((s) => s.addProject);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const today = sortByWhen(tasks.filter((t) => isDueToday(t.date)));
  const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status));
  const meetings = today.filter((t) => t.subcategory === "Meetings" || t.kind === "schedule");
  const follow = tasks.filter((t) => t.subcategory === "Follow-ups" && t.status !== "completed");

  return (
    <AppShell
      title="Work planner"
      action={
        <button type="button" className="text-sm font-medium" onClick={() => setOpen(true)}>
          Project
        </button>
      }
    >
      {overdue.length > 0 ? (
        <p className="mb-4 rounded-2xl bg-warn/10 px-4 py-3 text-sm text-warn">
          {overdue.length} work {overdue.length === 1 ? "item needs" : "items need"} a new time.
        </p>
      ) : null}
      <SectionTitle>Today</SectionTitle>
      <div className="space-y-2">
        {today.length === 0 ? (
          <p className="rounded-2xl bg-surface px-4 py-6 text-sm text-muted shadow-[var(--elev-border)]">
            No work on the board today.
          </p>
        ) : (
          today.map((t) => <TaskItem key={t.id} task={t} showCategory={false} />)
        )}
      </div>
      <div className="mt-7">
        <SectionTitle>Projects</SectionTitle>
        {projects.length === 0 ? (
          <p className="text-sm text-muted">Create a project to group client work.</p>
        ) : (
          <div className="space-y-2">
            {projects.map((p) => {
              const pts = tasks.filter((t) => t.projectId === p.id);
              const done = pts.filter((t) => t.status === "completed").length;
              const pct = pts.length ? Math.round((done / pts.length) * 100) : 0;
              return (
                <div key={p.id} className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
                  <div className="flex justify-between">
                    <h3 className="font-display text-lg font-semibold">{p.name}</h3>
                    <span className="tabular-nums text-sm text-muted">{pct}%</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.description}</p>
                  <div className="mt-3">
                    <Bar value={pct} color="var(--professional)" />
                  </div>
                  <p className="mt-2 text-xs text-subtle tabular-nums">
                    {done}/{pts.length} tasks completed
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
      {meetings.length > 0 ? (
        <div className="mt-7">
          <SectionTitle>Meetings</SectionTitle>
          <div className="space-y-2">
            {meetings.map((t) => (
              <TaskItem key={t.id} task={t} showCategory={false} />
            ))}
          </div>
        </div>
      ) : null}
      {follow.length > 0 ? (
        <div className="mt-7">
          <SectionTitle>Follow-ups</SectionTitle>
          <div className="space-y-2">
            {follow.map((t) => (
              <TaskItem key={t.id} task={t} showCategory={false} />
            ))}
          </div>
        </div>
      ) : null}
      <Sheet open={open} onClose={() => setOpen(false)} title="New project">
        <Field label="Name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Website project" />
        </Field>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            if (!name.trim()) return;
            addProject(name.trim());
            setName("");
            setOpen(false);
          }}
        >
          Save project
        </Button>
      </Sheet>
    </AppShell>
  );
}
