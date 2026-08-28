import type { ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { formatTime, isDueToday, sortByWhen } from "@/lib/date";
import { productivityScore, todayStats } from "@/lib/productivity";
import { formatInr } from "@/lib/utils";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/widgets")({ component: WidgetsPage });

function WidgetsPage() {
  const tasks = useAppStore((s) => s.tasks);
  const habits = useAppStore((s) => s.habits);
  const today = sortByWhen(tasks.filter((t) => isDueToday(t.date) && t.status !== "completed")).slice(0, 5);
  const next = sortByWhen(tasks.filter((t) => t.status !== "completed" && t.date)).at(0);
  const stats = todayStats(tasks);
  const score = productivityScore(tasks, habits);
  const money = sortByWhen(
    tasks.filter((t) => t.category === "financial" && t.status !== "completed"),
  ).slice(0, 3);

  return (
    <AppShell title="Widgets">
      <p className="mb-5 text-sm text-muted">
        Live tiles you can pin mentally — or screenshot onto a home screen. Light and dark follow your theme.
      </p>
      <div className="grid gap-3">
        <Tile title="Today's tasks">
          {today.length === 0 ? (
            <p className="text-sm text-muted">Clear calendar.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {today.map((t) => (
                <li key={t.id} className="flex justify-between gap-2">
                  <span className="truncate">{t.title}</span>
                  <span className="text-muted tabular-nums">{formatTime(t.time) ?? "—"}</span>
                </li>
              ))}
            </ul>
          )}
        </Tile>
        <Link to="/create" className="block rounded-[24px] bg-accent px-4 py-5 text-accent-fg">
          <div className="text-[11px] font-semibold uppercase tracking-[0.16em] opacity-70">Quick add</div>
          <div className="mt-1 font-display text-xl font-semibold">Capture a task</div>
        </Link>
        <Tile title="Next reminder">
          {next ? (
            <div>
              <div className="font-display text-lg font-semibold">{next.title}</div>
              <div className="text-sm text-muted">
                {next.date} {formatTime(next.time) ?? ""}
              </div>
            </div>
          ) : (
            <p className="text-sm text-muted">Nothing waiting.</p>
          )}
        </Tile>
        <Tile title="Productivity">
          <div className="font-display text-4xl font-semibold tabular-nums">{stats.pct}%</div>
          <p className="text-sm text-muted">Score {score}/100</p>
        </Tile>
        <Tile title="Financial">
          {money.length === 0 ? (
            <p className="text-sm text-muted">No upcoming payments.</p>
          ) : (
            <ul className="space-y-1.5 text-sm">
              {money.map((t) => (
                <li key={t.id} className="flex justify-between">
                  <span className="truncate">{t.title}</span>
                  <span className="tabular-nums text-financial">
                    {t.amount != null ? formatInr(t.amount) : "—"}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Tile>
      </div>
    </AppShell>
  );
}

function Tile({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
      <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">{title}</h2>
      {children}
    </section>
  );
}
