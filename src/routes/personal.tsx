import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskItem } from "@/components/task-item";
import { SectionTitle } from "@/components/ui";
import { isDueToday, isOverdue, sortByWhen } from "@/lib/date";
import { habitStreak } from "@/lib/productivity";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/personal")({ component: PersonalPage });

function PersonalPage() {
  const allTasks = useAppStore((s) => s.tasks);
  const allGoals = useAppStore((s) => s.goals);
  const tasks = allTasks.filter((t) => t.category === "personal");
  const habits = useAppStore((s) => s.habits);
  const goals = allGoals.filter((g) => g.category === "personal");
  const today = sortByWhen(tasks.filter((t) => isDueToday(t.date) && t.status !== "completed"));
  const attention = tasks.filter((t) => isOverdue(t.date, t.time, t.status));

  return (
    <AppShell title="My life">
      <p className="mb-5 text-sm text-muted">Family, health, home, and the rituals that keep you well.</p>
      {attention.length > 0 ? (
        <p className="mb-4 rounded-2xl bg-warn/10 px-4 py-3 text-sm text-warn">
          {attention.length} personal {attention.length === 1 ? "item is" : "items are"} waiting.
        </p>
      ) : null}
      <SectionTitle>Today</SectionTitle>
      <div className="space-y-2">
        {today.length === 0 ? (
          <p className="rounded-2xl bg-surface px-4 py-6 text-sm text-muted shadow-[var(--elev-border)]">
            Nothing personal on the clock. That's allowed.
          </p>
        ) : (
          today.map((t) => <TaskItem key={t.id} task={t} showCategory={false} />)
        )}
      </div>
      <div className="mt-7">
        <SectionTitle action={<Link to="/habits" className="text-sm text-muted">All</Link>}>
          Habits
        </SectionTitle>
        <div className="grid grid-cols-2 gap-2">
          {habits.map((h) => (
            <div key={h.id} className="rounded-2xl bg-surface p-3 shadow-[var(--elev-border)]">
              <div className="text-sm font-medium">{h.title}</div>
              <div className="mt-1 text-xs text-muted tabular-nums">{habitStreak(h)} day streak</div>
            </div>
          ))}
        </div>
      </div>
      {goals.length > 0 ? (
        <div className="mt-7">
          <SectionTitle action={<Link to="/goals" className="text-sm text-muted">All</Link>}>
            Personal goals
          </SectionTitle>
          {goals.map((g) => (
            <div key={g.id} className="mb-2 rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]">
              {g.title}
            </div>
          ))}
        </div>
      ) : null}
    </AppShell>
  );
}
