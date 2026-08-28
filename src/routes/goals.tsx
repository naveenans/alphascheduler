import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Bar, Button, Chip, Empty, Field, Input, Sheet } from "@/components/ui";
import { daysUntil } from "@/lib/date";
import { goalProgress } from "@/lib/productivity";
import { emptyDraft, useAppStore } from "@/lib/store";
import type { Category, Goal } from "@/lib/types";

export const Route = createFileRoute("/goals")({ component: GoalsPage });

function GoalsPage() {
  const goals = useAppStore((s) => s.goals);
  const tasks = useAppStore((s) => s.tasks);
  const addGoal = useAppStore((s) => s.addGoal);
  const bump = useAppStore((s) => s.bumpGoal);
  const toggleM = useAppStore((s) => s.toggleMilestone);
  const remove = useAppStore((s) => s.deleteGoal);
  const addTask = useAppStore((s) => s.addTask);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("personal");
  const [target, setTarget] = useState("100");

  return (
    <AppShell
      title="Goals"
      action={
        <button type="button" className="text-sm font-medium" onClick={() => setOpen(true)}>
          New
        </button>
      }
    >
      <Link to="/habits" className="mb-4 flex justify-between rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]">
        <span>Habits & streaks</span>
        <span className="text-muted">Open</span>
      </Link>
      {goals.length === 0 ? (
        <Empty title="No goals yet" body="Name one thing worth finishing. Tasks can live underneath it." />
      ) : (
        <div className="space-y-3">
          {goals.map((g) => (
            <GoalCard
              key={g.id}
              goal={g}
              pct={goalProgress(g, tasks)}
              onBump={(d) => bump(g.id, d)}
              onToggle={(mid) => toggleM(g.id, mid)}
              onRemove={() => remove(g.id)}
              onAddTask={() =>
                addTask(
                  emptyDraft({
                    title: `Work on ${g.title}`,
                    category: g.category,
                    goalId: g.id,
                  }),
                )
              }
            />
          ))}
        </div>
      )}
      <Sheet open={open} onClose={() => setOpen(false)} title="New goal">
        <Field label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Save ₹1,00,000" />
        </Field>
        <div className="mt-3 flex gap-2">
          {(["personal", "professional", "financial"] as Category[]).map((c) => (
            <Chip key={c} tone={c} active={category === c} onClick={() => setCategory(c)}>
              {c}
            </Chip>
          ))}
        </div>
        <div className="mt-3">
          <Field label="Target">
            <Input type="number" value={target} onChange={(e) => setTarget(e.target.value)} />
          </Field>
        </div>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            if (!title.trim()) return;
            addGoal({
              title: title.trim(),
              description: "",
              category,
              targetDate: null,
              targetValue: Number(target) || 1,
              currentValue: 0,
              unit: category === "financial" ? "₹" : "units",
              taskIds: [],
              milestones: [],
            });
            setTitle("");
            setOpen(false);
          }}
        >
          Save goal
        </Button>
      </Sheet>
    </AppShell>
  );
}

function GoalCard({
  goal,
  pct,
  onBump,
  onToggle,
  onRemove,
  onAddTask,
}: {
  goal: Goal;
  pct: number;
  onBump: (d: number) => void;
  onToggle: (id: string) => void;
  onRemove: () => void;
  onAddTask: () => void;
}) {
  const remain = daysUntil(goal.targetDate);
  const color =
    goal.category === "personal"
      ? "var(--personal)"
      : goal.category === "professional"
        ? "var(--professional)"
        : "var(--financial)";
  return (
    <div className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            {goal.category}
          </div>
          <h3 className="mt-1 font-display text-lg font-semibold tracking-tight">{goal.title}</h3>
        </div>
        <span className="font-display text-lg tabular-nums">{pct}%</span>
      </div>
      <div className="mt-3">
        <Bar value={pct} color={color} />
      </div>
      <p className="mt-2 text-sm text-muted tabular-nums">
        {goal.currentValue.toLocaleString("en-IN")} / {goal.targetValue.toLocaleString("en-IN")} {goal.unit}
        {remain != null ? ` · ${remain} days left` : ""}
      </p>
      {goal.milestones.length > 0 ? (
        <div className="mt-3 space-y-1.5">
          {goal.milestones.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => onToggle(m.id)}
              className="flex w-full items-center gap-2 text-left text-sm"
            >
              <span className="size-2 rounded-full" style={{ background: m.done ? color : "var(--line)" }} />
              <span className={m.done ? "text-muted line-through" : ""}>{m.title}</span>
            </button>
          ))}
        </div>
      ) : null}
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="soft" onClick={() => onBump(goal.category === "financial" ? 1000 : 1)}>
          + Progress
        </Button>
        <Button size="sm" variant="ghost" onClick={onAddTask}>
          Add task
        </Button>
        <Button size="sm" variant="ghost" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}
