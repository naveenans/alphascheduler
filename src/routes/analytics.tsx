import { createFileRoute } from "@tanstack/react-router";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AppShell } from "@/components/app-shell";
import { distribution, mostProductiveDay, productivityScore, weeklyCompletion } from "@/lib/productivity";
import { useAppStore } from "@/lib/store";
import { format } from "date-fns";

export const Route = createFileRoute("/analytics")({ component: AnalyticsPage });

function AnalyticsPage() {
  const tasks = useAppStore((s) => s.tasks);
  const habits = useAppStore((s) => s.habits);
  const week = weeklyCompletion(tasks);
  const dist = distribution(tasks);
  const score = productivityScore(tasks, habits);
  const best = mostProductiveDay(tasks);
  const total = dist.personal + dist.professional + dist.financial || 1;

  return (
    <AppShell title="Analytics">
      <div className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
        <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-muted">
          Today
        </div>
        <div className="mt-1 font-display text-4xl font-semibold tabular-nums">{score}</div>
        <p className="mt-1 text-sm text-muted">of 100 — keep the pace you already have.</p>
      </div>
      <h2 className="mb-3 mt-7 font-display text-[17px] font-semibold">This week</h2>
      <div className="h-44 rounded-[24px] bg-surface p-3 shadow-[var(--elev-border)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={week}>
            <CartesianGrid stroke="color-mix(in oklab, var(--fg) 8%, transparent)" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: "var(--muted)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{
                background: "var(--elevated)",
                border: "none",
                borderRadius: 12,
                color: "var(--fg)",
              }}
            />
            <Bar dataKey="pct" fill="var(--fg)" radius={[6, 6, 6, 6]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <h2 className="mb-3 mt-7 font-display text-[17px] font-semibold">Distribution</h2>
      <div className="space-y-3 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
        <Row label="Personal" color="var(--personal)" n={dist.personal} total={total} />
        <Row label="Professional" color="var(--professional)" n={dist.professional} total={total} />
        <Row label="Financial" color="var(--financial)" n={dist.financial} total={total} />
      </div>
      <p className="mt-5 text-sm text-muted">
        Most productive day:{" "}
        {best.count === 0 ? "still forming" : `${format(new Date(best.day), "EEEE d MMM")} · ${best.count} done`}
      </p>
    </AppShell>
  );
}

function Row({ label, color, n, total }: { label: string; color: string; n: number; total: number }) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-sm">
        <span>{label}</span>
        <span className="tabular-nums text-muted">{n}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-fg/8">
        <div className="h-full rounded-full" style={{ width: `${(n / total) * 100}%`, background: color }} />
      </div>
    </div>
  );
}
