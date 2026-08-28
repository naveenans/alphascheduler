import { useMemo } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { greeting, isDueToday, isOverdue, todayISO } from "@/lib/date";
import { categoryStats, productivityScore, todayStats } from "@/lib/productivity";
import { useAppStore } from "@/lib/store";
import { Button, Sheet } from "./ui";

export function PlannerModals() {
  const tasks = useAppStore((s) => s.tasks);
  const habits = useAppStore((s) => s.habits);
  const onboarded = useAppStore((s) => s.onboarded);
  const dismissedMorning = useAppStore((s) => s.dismissedMorning);
  const dismissedEvening = useAppStore((s) => s.dismissedEvening);
  const dismissMorning = useAppStore((s) => s.dismissMorning);
  const dismissEvening = useAppStore((s) => s.dismissEvening);
  const postpone = useAppStore((s) => s.postponeUnfinishedToTomorrow);
  const name = useAppStore((s) => s.settings.name);
  const navigate = useNavigate();

  const hour = new Date().getHours();
  const today = todayISO();
  const showMorning = onboarded && hour < 11 && dismissedMorning !== today;
  const showEvening = onboarded && hour >= 20 && dismissedEvening !== today && !showMorning;

  const stats = useMemo(() => todayStats(tasks), [tasks]);
  const personal = categoryStats(tasks, "personal");
  const professional = categoryStats(tasks, "professional");
  const financial = categoryStats(tasks, "financial");
  const score = productivityScore(tasks, habits);
  const top = tasks
    .filter((t) => isDueToday(t.date) && t.status !== "completed")
    .sort((a, b) => {
      const rank = { critical: 4, high: 3, medium: 2, low: 1 };
      return rank[b.priority] - rank[a.priority];
    })
    .slice(0, 3);

  const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status)).length;

  if (showMorning) {
    return (
      <Sheet open onClose={dismissMorning} title={`${greeting()}${name ? `, ${name}` : ""}`}>
        <p className="text-sm text-muted">Here's your plan for today.</p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Mini label="Personal" n={personal.total} />
          <Mini label="Work" n={professional.total} />
          <Mini label="Money" n={financial.total} />
        </div>
        <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
          Top priorities
        </h3>
        <ol className="mt-2 space-y-2">
          {top.length === 0 ? (
            <p className="text-sm text-muted">Your schedule is clear.</p>
          ) : (
            top.map((t, i) => (
              <li key={t.id} className="flex gap-3 text-sm">
                <span className="tabular-nums text-subtle">{i + 1}</span>
                <span className="font-medium">{t.title}</span>
              </li>
            ))
          )}
        </ol>
        <Button
          className="mt-6 w-full"
          onClick={() => {
            dismissMorning();
            navigate({ to: "/today" });
          }}
        >
          Start my day
          <ArrowRight className="size-4" />
        </Button>
      </Sheet>
    );
  }

  if (showEvening) {
    return (
      <Sheet open onClose={dismissEvening} title="Day complete">
        <p className="text-sm text-muted">
          {stats.completed}/{stats.total || 0} tasks · Productivity {score}/100
        </p>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <Mini label="Personal" n={`${personal.pct}%`} />
          <Mini label="Work" n={`${professional.pct}%`} />
          <Mini label="Money" n={`${financial.pct}%`} />
        </div>
        {overdue > 0 ? (
          <p className="mt-4 text-sm text-warn">{overdue} still waiting — move them if you like.</p>
        ) : (
          <p className="mt-4 text-sm text-muted">You're on track. Rest well.</p>
        )}
        <div className="mt-5 flex gap-2">
          <Button
            className="flex-1"
            variant="secondary"
            onClick={() => {
              postpone();
              dismissEvening();
            }}
          >
            Move leftover to tomorrow
          </Button>
          <Button className="flex-1" onClick={dismissEvening}>
            Close
          </Button>
        </div>
      </Sheet>
    );
  }

  return null;
}

function Mini({ label, n }: { label: string; n: number | string }) {
  return (
    <div className="rounded-2xl bg-elevated px-3 py-3 shadow-[var(--elev-border)]">
      <div className="text-[11px] text-muted">{label}</div>
      <div className="mt-1 font-display text-xl font-semibold tabular-nums">{n}</div>
    </div>
  );
}
