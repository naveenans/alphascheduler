import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BarChart3,
  Briefcase,
  ChevronRight,
  Download,
  Flame,
  LayoutGrid,
  MessageSquare,
  Settings,
  UserRound,
  Wallet,
} from "lucide-react";
import { AppShell } from "@/components/app-shell";
import { Wordmark } from "@/components/logo";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/more")({ component: MorePage });

const LINKS = [
  { to: "/personal", label: "Personal", hint: "Life, family, health", icon: UserRound },
  { to: "/professional", label: "Professional", hint: "Work, projects, meetings", icon: Briefcase },
  { to: "/financial", label: "Financial", hint: "Bills, EMIs, goals", icon: Wallet },
  { to: "/habits", label: "Habits", hint: "Streaks and daily rituals", icon: Flame },
  { to: "/analytics", label: "Analytics", hint: "How the week is going", icon: BarChart3 },
  { to: "/ai", label: "Assistant", hint: "Turn notes into a plan", icon: MessageSquare },
  { to: "/widgets", label: "Widgets", hint: "Home-screen style tiles", icon: LayoutGrid },
  { to: "/backup", label: "Backup & restore", hint: "JSON export and import", icon: Download },
  { to: "/settings", label: "Settings", hint: "Theme, reminders, profile", icon: Settings },
] as const;

function MorePage() {
  const name = useAppStore((s) => s.settings.name);
  return (
    <AppShell title="More">
      <div className="mb-5 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
        <Wordmark />
        <p className="mt-3 text-sm text-muted">
          {name ? `${name} · ` : ""}Plan it. Remember it. Do it. Achieve it.
        </p>
      </div>
      <ul className="space-y-1.5">
        {LINKS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className="flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 shadow-[var(--elev-border)]"
              >
                <span className="grid size-10 place-items-center rounded-xl bg-elevated">
                  <Icon className="size-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium">{item.label}</span>
                  <span className="block text-[12px] text-muted">{item.hint}</span>
                </span>
                <ChevronRight className="size-4 text-subtle" />
              </Link>
            </li>
          );
        })}
      </ul>
    </AppShell>
  );
}
