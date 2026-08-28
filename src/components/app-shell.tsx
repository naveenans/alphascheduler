import { type ReactNode, useEffect, useMemo, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, CalendarDays, Home, ListChecks, Plus, Search, Settings2, Target } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { QuickAdd } from "./quick-add";
import { NotificationEngine } from "./notification-engine";
import { PlannerModals } from "./planner";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/tasks", label: "Tasks", icon: ListChecks },
  { to: "/calendar", label: "Calendar", icon: CalendarDays },
  { to: "/goals", label: "Goals", icon: Target },
  { to: "/more", label: "More", icon: Settings2 },
] as const;

export function AppShell({
  children,
  title,
  action,
  hideFab = false,
}: {
  children: ReactNode;
  title?: string;
  action?: ReactNode;
  hideFab?: boolean;
}) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const unread = useAppStore((s) => s.notices.filter((n) => !n.read).length);
  const [quick, setQuick] = useState(false);

  const active = useMemo(() => {
    if (path.startsWith("/tasks") || path.startsWith("/task") || path.startsWith("/create"))
      return "/tasks";
    if (path.startsWith("/calendar") || path.startsWith("/today")) return "/calendar";
    if (path.startsWith("/goals") || path.startsWith("/habits")) return "/goals";
    if (
      path.startsWith("/more") ||
      path.startsWith("/settings") ||
      path.startsWith("/analytics") ||
      path.startsWith("/personal") ||
      path.startsWith("/professional") ||
      path.startsWith("/financial") ||
      path.startsWith("/backup") ||
      path.startsWith("/ai") ||
      path.startsWith("/notifications") ||
      path.startsWith("/search") ||
      path.startsWith("/widgets")
    )
      return "/more";
    return "/";
  }, [path]);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <header className="flex items-center justify-between gap-3 px-5 pb-2 pt-4">
        <h1 className="font-display text-[22px] font-semibold tracking-tight text-fg">
          {title ?? "Alpha"}
        </h1>
        <div className="flex items-center gap-1">
          {action}
          <Link
            to="/search"
            aria-label="Search"
            className="relative grid size-11 place-items-center rounded-xl text-fg"
          >
            <Search className="size-[18px]" />
          </Link>
          <Link
            to="/notifications"
            aria-label="Notifications"
            className="relative grid size-11 place-items-center rounded-xl text-fg"
          >
            <Bell className="size-[18px]" />
            {unread > 0 ? (
              <span className="absolute right-2 top-2 grid min-w-4 place-items-center rounded-full bg-danger px-1 text-[9px] font-semibold text-bg tabular-nums">
                {unread > 9 ? "9+" : unread}
              </span>
            ) : null}
          </Link>
        </div>
      </header>
      <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-28">{children}</div>
      {!hideFab ? (
        <button
          type="button"
          aria-label="Quick add"
          onClick={() => setQuick(true)}
          className="absolute bottom-[5.6rem] right-5 z-30 grid size-14 place-items-center rounded-full bg-accent text-accent-fg shadow-[var(--elev-border)] transition-[scale] duration-150 ease-out active:scale-[0.96]"
        >
          <Plus className="size-6" />
        </button>
      ) : null}
      <nav className="absolute inset-x-0 bottom-0 z-20 border-t border-line bg-surface/92 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md">
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const on = active === item.to;
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium",
                    on ? "text-fg" : "text-subtle",
                  )}
                >
                  <Icon className="size-[20px]" strokeWidth={on ? 2.2 : 1.7} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <QuickAdd open={quick} onClose={() => setQuick(false)} />
      <NotificationEngine />
      <PlannerModals />
    </div>
  );
}

export function PhoneFrame({ children }: { children: ReactNode }) {
  const theme = useAppStore((s) => s.settings.theme);

  useEffect(() => {
    const root = document.documentElement;
    const apply = () => {
      if (theme === "system") {
        const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        root.setAttribute("data-theme", dark ? "dark" : "light");
      } else {
        root.setAttribute("data-theme", theme);
      }
    };
    apply();
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [theme]);

  return (
    <div className="app-stage grid min-h-dvh place-items-center bg-stage p-0 md:p-6">
      <div className="app-device relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-bg md:h-[min(844px,calc(100dvh-48px))] md:rounded-[36px] md:shadow-[var(--elev-border)]">
        {children}
      </div>
    </div>
  );
}
