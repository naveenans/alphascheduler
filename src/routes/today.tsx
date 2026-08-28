import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { TaskItem } from "@/components/task-item";
import { todayStats } from "@/lib/productivity";
import { formatTime, isDueToday, sortByWhen } from "@/lib/date";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/today")({ component: TodayPage });

function TodayPage() {
  const tasks = useAppStore((s) => s.tasks);
  const list = sortByWhen(tasks.filter((t) => isDueToday(t.date)));
  const stats = todayStats(tasks);
  const timed = list.filter((t) => t.time);
  const untimed = list.filter((t) => !t.time);

  return (
    <AppShell title="Today">
      <div className="mb-5 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Timeline
        </div>
        <div className="mt-1 font-display text-2xl font-semibold tabular-nums">
          {stats.completed}/{stats.total} done
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-fg/8">
          <div
            className="h-full rounded-full bg-accent"
            style={{ width: `${stats.pct}%` }}
          />
        </div>
      </div>
      <ol className="relative space-y-3 border-l border-line pl-5">
        {timed.map((t) => (
          <li key={t.id} className="relative">
            <span
              className={cn(
                "absolute -left-[27px] top-5 size-2.5 rounded-full",
                t.status === "completed" ? "bg-ok" : "bg-accent",
              )}
            />
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted tabular-nums">
              {formatTime(t.time)}
            </p>
            <TaskItem task={t} />
          </li>
        ))}
      </ol>
      {untimed.length > 0 ? (
        <div className="mt-6 space-y-2">
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Anytime
          </h3>
          {untimed.map((t) => (
            <TaskItem key={t.id} task={t} />
          ))}
        </div>
      ) : null}
      {list.length === 0 ? (
        <p className="mt-8 text-center text-sm text-muted">Your schedule is clear.</p>
      ) : null}
    </AppShell>
  );
}
