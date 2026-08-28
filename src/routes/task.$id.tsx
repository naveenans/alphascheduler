import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskForm } from "@/components/task-form";
import { Button, Chip } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { formatRelativeDue, repeatLabel } from "@/lib/date";
import { taskProgress } from "@/lib/productivity";
import { CATEGORY_META } from "@/lib/types";

export const Route = createFileRoute("/task/$id")({ component: TaskDetail });

function TaskDetail() {
  const { id } = Route.useParams();
  const task = useAppStore((s) => s.tasks.find((t) => t.id === id));
  const toggle = useAppStore((s) => s.toggleTask);
  const toggleSub = useAppStore((s) => s.toggleSubtask);
  const remove = useAppStore((s) => s.deleteTask);
  const update = useAppStore((s) => s.updateTask);
  const snooze = useAppStore((s) => s.snoozeTask);
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);

  if (!task) {
    return (
      <AppShell title="Task" hideFab>
        <p className="text-sm text-muted">This task is no longer here.</p>
      </AppShell>
    );
  }

  if (editing) {
    return (
      <AppShell title="Edit" hideFab>
        <TaskForm
          initial={task}
          submitLabel="Update"
          onSubmit={(draft) => {
            update(task.id, draft);
            setEditing(false);
          }}
        />
      </AppShell>
    );
  }

  const pct = taskProgress(task);

  return (
    <AppShell title="Task" hideFab>
      <div className="stagger-in">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          {CATEGORY_META[task.category].label}
          {task.subcategory ? ` · ${task.subcategory}` : ""}
        </p>
        <h2 className="mt-2 font-display text-[28px] font-semibold leading-tight tracking-tight">
          {task.title}
        </h2>
        <p className="mt-2 text-sm text-muted">{formatRelativeDue(task.date, task.time)}</p>
        {task.amount != null ? (
          <p className="mt-1 font-display text-2xl tabular-nums text-financial">
            ₹{task.amount.toLocaleString("en-IN")}
          </p>
        ) : null}
        <div className="mt-4 flex flex-wrap gap-2">
          <Chip active={false}>{task.priority}</Chip>
          <Chip>{repeatLabel(task.repeat)}</Chip>
          {task.isDemo ? <Chip>Sample</Chip> : null}
        </div>
        {task.description ? <p className="mt-5 text-[15px] leading-relaxed">{task.description}</p> : null}
        {task.notes ? (
          <p className="mt-3 rounded-2xl bg-elevated p-3 text-sm text-muted shadow-[var(--elev-border)]">
            {task.notes}
          </p>
        ) : null}
        {task.subtasks.length > 0 ? (
          <div className="mt-6">
            <div className="mb-2 flex justify-between text-sm text-muted">
              <span>Steps</span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <div className="space-y-2">
              {task.subtasks.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => toggleSub(task.id, s.id)}
                  className="flex w-full items-center gap-3 rounded-2xl bg-surface px-3 py-3 text-left text-sm shadow-[var(--elev-border)]"
                >
                  <span
                    className="grid size-5 place-items-center rounded-full"
                    style={{
                      background: s.completed ? "var(--ok)" : "var(--elevated)",
                      color: "var(--bg)",
                    }}
                  >
                    {s.completed ? "✓" : ""}
                  </span>
                  <span className={s.completed ? "text-muted line-through" : ""}>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        ) : null}
        <div className="mt-8 grid grid-cols-2 gap-2">
          <Button onClick={() => toggle(task.id)}>
            {task.status === "completed" ? "Reopen" : "Mark done"}
          </Button>
          <Button variant="secondary" onClick={() => snooze(task.id, 15)}>
            Snooze 15m
          </Button>
          <Button variant="secondary" onClick={() => setEditing(true)}>
            Edit
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              remove(task.id);
              navigate({ to: "/tasks" });
            }}
          >
            Delete
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
