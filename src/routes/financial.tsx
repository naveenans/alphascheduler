import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskItem } from "@/components/task-item";
import { SectionTitle } from "@/components/ui";
import { formatShortDate, isDueToday, isOverdue, sortByWhen } from "@/lib/date";
import { formatInr } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/financial")({ component: MoneyPage });

function MoneyPage() {
  const all = useAppStore((s) => s.tasks);
  const tasks = all.filter((t) => t.category === "financial");
  const upcoming = sortByWhen(tasks.filter((t) => t.status !== "completed"));
  const dueToday = upcoming.filter((t) => isDueToday(t.date));
  const overdue = upcoming.filter((t) => isOverdue(t.date, t.time, t.status));
  const done = tasks.filter((t) => t.status === "completed");
  const total = upcoming.reduce((s, t) => s + (t.amount ?? 0), 0);
  const groups = new Map<string, number>();
  for (const t of upcoming) {
    const key = t.subcategory || "Other";
    groups.set(key, (groups.get(key) ?? 0) + (t.amount ?? 0));
  }

  return (
    <AppShell title="Financial planner">
      <p className="mb-4 text-sm text-muted">
        Reminders for bills and commitments — not a bank, and never investment advice.
      </p>
      <div className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Upcoming
        </div>
        <div className="mt-1 font-display text-3xl font-semibold tabular-nums text-financial">
          {formatInr(total)}
        </div>
        <p className="mt-1 text-sm text-muted">{upcoming.length} open reminders</p>
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <Stat label="Due today" value={dueToday.length} />
        <Stat label="Waiting" value={overdue.length} />
        <Stat label="Paid" value={done.length} />
      </div>
      <div className="mt-6">
        <SectionTitle>By type</SectionTitle>
        <div className="space-y-2">
          {[...groups.entries()].map(([k, v]) => (
            <div key={k} className="flex justify-between rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]">
              <span>{k}</span>
              <span className="tabular-nums text-financial">{formatInr(v)}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-7">
        <SectionTitle>Schedule</SectionTitle>
        {upcoming.length === 0 ? (
          <p className="text-sm text-muted">No payments on the horizon.</p>
        ) : (
          <div className="space-y-2">
            {upcoming.map((t) => (
              <div key={t.id}>
                <p className="mb-1 text-[11px] text-muted">{formatShortDate(t.date)}</p>
                <TaskItem task={t} showCategory={false} />
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-2xl bg-surface px-3 py-3 shadow-[var(--elev-border)]">
      <div className="text-[11px] text-muted">{label}</div>
      <div className="font-display text-xl font-semibold tabular-nums">{value}</div>
    </div>
  );
}
