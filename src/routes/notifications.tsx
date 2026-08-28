import { createFileRoute, Link } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button, Empty } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { format } from "date-fns";

export const Route = createFileRoute("/notifications")({ component: NoticesPage });

function NoticesPage() {
  const notices = useAppStore((s) => s.notices);
  const mark = useAppStore((s) => s.markNoticeRead);
  const clear = useAppStore((s) => s.clearNotices);
  const grouped = {
    upcoming: notices.filter((n) => n.kind === "upcoming"),
    due: notices.filter((n) => n.kind === "due"),
    overdue: notices.filter((n) => n.kind === "overdue"),
    completed: notices.filter((n) => n.kind === "completed"),
  };

  return (
    <AppShell title="Notifications">
      <div className="mb-4 flex justify-end">
        <Button size="sm" variant="ghost" onClick={clear}>
          Clear
        </Button>
      </div>
      {notices.length === 0 ? (
        <Empty title="All quiet" body="Reminders and completions will collect here." />
      ) : (
        (["upcoming", "due", "overdue", "completed"] as const).map((k) =>
          grouped[k].length === 0 ? null : (
            <section key={k} className="mb-6">
              <h2 className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
                {k === "due" ? "Due soon" : k[0]!.toUpperCase() + k.slice(1)}
              </h2>
              <ul className="space-y-2">
                {grouped[k].map((n) => (
                  <li key={n.id}>
                    <button
                      type="button"
                      onClick={() => mark(n.id)}
                      className="w-full rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--elev-border)]"
                    >
                      <div className="flex justify-between gap-2">
                        <p className="text-sm font-medium">{n.title}</p>
                        {!n.read ? <span className="size-2 rounded-full bg-accent" /> : null}
                      </div>
                      <p className="mt-0.5 text-xs text-muted">{n.body}</p>
                      <p className="mt-1 text-[11px] text-subtle">
                        {format(new Date(n.createdAt), "d MMM, HH:mm")}
                      </p>
                    </button>
                    {n.taskId ? (
                      <Link to="/task/$id" params={{ id: n.taskId }} className="mt-1 block px-1 text-xs text-muted">
                        Open task
                      </Link>
                    ) : null}
                  </li>
                ))}
              </ul>
            </section>
          ),
        )
      )}
    </AppShell>
  );
}
