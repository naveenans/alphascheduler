import { createFileRoute, Link, Navigate } from "@tanstack/react-router";
import { ArrowRight, Briefcase, CloudSun, UserRound, Wallet } from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { ProgressRing, SectionTitle } from "@/components/ui";
import { TaskItem } from "@/components/task-item";
import { useAppStore } from "@/lib/store";
import { formatDayHeading, greeting, isDueToday, isOverdue, sortByWhen } from "@/lib/date";
import { categoryStats, productivityScore, todayStats } from "@/lib/productivity";
import { insightLine } from "@/lib/nlp";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const onboarded = useAppStore((s) => s.onboarded);
  if (!onboarded) return <Navigate to="/onboarding" />;
  return <Dashboard />;
}

function Dashboard() {
  const tasks = useAppStore((s) => s.tasks);
  const habits = useAppStore((s) => s.habits);
  const name = useAppStore((s) => s.settings.name);
  const stats = todayStats(tasks);
  const score = productivityScore(tasks, habits);
  const personal = categoryStats(tasks, "personal");
  const professional = categoryStats(tasks, "professional");
  const financial = categoryStats(tasks, "financial");
  const todayList = sortByWhen(tasks.filter((t) => isDueToday(t.date))).slice(0, 6);
  const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status));
  const insight = insightLine({
    completed: stats.completed,
    total: stats.total,
    importantDone: stats.importantDone,
    importantTotal: stats.importantTotal,
  });

  return (
    <AppShell title={`${greeting()}${name ? `, ${name.split(" ")[0]}` : ""}`}>
      <div className="stagger-in">
        <p className="text-sm text-muted">{formatDayHeading(new Date())}</p>
        <div className="mt-4 flex items-center gap-4 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
          <ProgressRing value={score} size={72} stroke={6}>
            <span className="font-display text-sm font-semibold tabular-nums">{score}</span>
          </ProgressRing>
          <div className="min-w-0 flex-1">
            <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
              Your day
            </div>
            <div className="mt-1 font-display text-xl font-semibold tracking-tight">
              {stats.pct}% planned
            </div>
            <p className="mt-1 text-sm leading-snug text-muted">{insight}</p>
          </div>
          <CloudSun className="size-5 text-subtle" aria-hidden />
        </div>

        {overdue.length > 0 ? (
          <Link
            to="/tasks"
            search={{ filter: "overdue" }}
            className="mt-4 flex items-center justify-between rounded-2xl bg-warn/10 px-4 py-3 text-sm"
          >
            <span className="text-warn">
              Needs attention · {overdue.length} waiting for you
            </span>
            <ArrowRight className="size-4 text-warn" />
          </Link>
        ) : null}

        <div className="mt-5 grid gap-3">
          <CategoryCard
            to="/personal"
            label="Personal"
            hint="Life"
            pending={personal.pending}
            pct={personal.pct}
            color="var(--personal)"
            icon={UserRound}
          />
          <CategoryCard
            to="/professional"
            label="Professional"
            hint="Work"
            pending={professional.pending}
            pct={professional.pct}
            color="var(--professional)"
            icon={Briefcase}
          />
          <CategoryCard
            to="/financial"
            label="Financial"
            hint="Money"
            pending={financial.pending}
            pct={financial.pct}
            color="var(--financial)"
            icon={Wallet}
          />
        </div>

        <div className="mt-8">
          <SectionTitle
            action={
              <Link to="/today" className="text-sm text-muted">
                Timeline
              </Link>
            }
          >
            Today
          </SectionTitle>
          {todayList.length === 0 ? (
            <p className="rounded-2xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--elev-border)]">
              Your schedule is clear. Enjoy the extra time, or plan something important.
            </p>
          ) : (
            <div className="space-y-2">
              {todayList.map((t) => (
                <TaskItem key={t.id} task={t} />
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

function CategoryCard({
  to,
  label,
  hint,
  pending,
  pct,
  color,
  icon: Icon,
}: {
  to: "/personal" | "/professional" | "/financial";
  label: string;
  hint: string;
  pending: number;
  pct: number;
  color: string;
  icon: typeof UserRound;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-4 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
        "transition-[scale] duration-150 ease-out active:scale-[0.98]",
      )}
    >
      <div
        className="grid size-12 place-items-center rounded-2xl"
        style={{ background: `color-mix(in oklab, ${color} 16%, transparent)`, color }}
      >
        <Icon className="size-5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted">{hint}</div>
        <div className="font-display text-lg font-semibold tracking-tight">{label}</div>
        <div className="text-sm text-muted tabular-nums">{pending} pending</div>
      </div>
      <ProgressRing value={pct} size={52} stroke={4} color={color}>
        <span className="text-[10px] font-semibold tabular-nums text-fg">{pct}%</span>
      </ProgressRing>
    </Link>
  );
}
