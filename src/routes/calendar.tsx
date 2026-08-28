import { useMemo, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { addDays, format, isSameDay, isToday, startOfMonth } from "date-fns";
import { AppShell } from "@/components/app-shell";
import { TaskItem } from "@/components/task-item";
import { Chip } from "@/components/ui";
import { monthGrid, toISODate, weekDays } from "@/lib/date";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/calendar")({ component: CalendarPage });

function CalendarPage() {
  const weekStartsOn = useAppStore((s) => s.settings.weekStartsOn);
  const tasks = useAppStore((s) => s.tasks);
  const move = useAppStore((s) => s.moveTaskDate);
  const [anchor, setAnchor] = useState(() => startOfMonth(new Date()));
  const [selected, setSelected] = useState(() => new Date());
  const [mode, setMode] = useState<"month" | "week" | "day">("month");
  const [dragging, setDragging] = useState<string | null>(null);
  const navigate = useNavigate();

  const days = useMemo(
    () => (mode === "week" ? weekDays(selected, weekStartsOn) : monthGrid(anchor, weekStartsOn)),
    [anchor, selected, mode, weekStartsOn],
  );

  const selectedIso = toISODate(selected);
  const dayTasks = tasks.filter((t) => t.date === selectedIso);

  const labels = ["S", "M", "T", "W", "T", "F", "S"];
  const ordered =
    weekStartsOn === 1 ? [...labels.slice(1), labels[0]!] : labels;

  return (
    <AppShell title="Calendar">
      <div className="flex gap-2 pb-4">
        <Chip active={mode === "month"} onClick={() => setMode("month")}>
          Month
        </Chip>
        <Chip active={mode === "week"} onClick={() => setMode("week")}>
          Week
        </Chip>
        <Chip active={mode === "day"} onClick={() => setMode("day")}>
          Day
        </Chip>
      </div>
      <div className="flex items-center justify-between pb-3">
        <button
          type="button"
          className="grid size-11 place-items-center"
          onClick={() => {
            if (mode === "month") setAnchor(addDays(anchor, -30));
            else setSelected(addDays(selected, mode === "week" ? -7 : -1));
          }}
          aria-label="Previous"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="font-display text-lg font-semibold">
          {format(mode === "month" ? anchor : selected, "MMMM yyyy")}
        </div>
        <button
          type="button"
          className="grid size-11 place-items-center"
          onClick={() => {
            if (mode === "month") setAnchor(addDays(anchor, 32));
            else setSelected(addDays(selected, mode === "week" ? 7 : 1));
          }}
          aria-label="Next"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>
      {mode !== "day" ? (
        <>
          <div className="grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle">
            {ordered.map((d, i) => (
              <div key={`${d}-${i}`} className="py-2">
                {d}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((d) => {
              const iso = toISODate(d);
              const dots = tasks.filter((t) => t.date === iso);
              const on = isSameDay(d, selected);
              const muted = mode === "month" && d.getMonth() !== anchor.getMonth();
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelected(d)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => {
                    e.preventDefault();
                    const id = e.dataTransfer.getData("text/task-id") || dragging;
                    if (id) move(id, iso);
                    setDragging(null);
                  }}
                  className={cn(
                    "flex h-12 flex-col items-center justify-center rounded-xl text-sm tabular-nums",
                    on && "bg-accent text-accent-fg",
                    !on && isToday(d) && "bg-elevated",
                    muted && "opacity-35",
                  )}
                >
                  {d.getDate()}
                  <span className="mt-0.5 flex gap-0.5">
                    {["personal", "professional", "financial"].map((c) =>
                      dots.some((t) => t.category === c) ? (
                        <i
                          key={c}
                          className="block size-1 rounded-full"
                          style={{
                            background: on
                              ? "var(--accent-fg)"
                              : c === "personal"
                                ? "var(--personal)"
                                : c === "professional"
                                  ? "var(--professional)"
                                  : "var(--financial)",
                          }}
                        />
                      ) : null,
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </>
      ) : null}
      <div className="mt-5 space-y-2">
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-[17px] font-semibold">{format(selected, "EEEE d")}</h3>
          <button
            type="button"
            className="text-sm text-muted"
            onClick={() => navigate({ to: "/create", search: { date: selectedIso } })}
          >
            Add
          </button>
        </div>
        {dayTasks.length === 0 ? (
          <p className="rounded-2xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--elev-border)]">
            Nothing planned. A quiet day is still a good day.
          </p>
        ) : (
          dayTasks.map((t) => (
            <div
              key={t.id}
              draggable
              onDragStart={(e) => {
                e.dataTransfer.setData("text/task-id", t.id);
                setDragging(t.id);
              }}
            >
              <TaskItem task={t} />
            </div>
          ))
        )}
        <p className="pt-2 text-center text-[11px] text-subtle">
          Drag a task onto another date to reschedule.
        </p>
      </div>
    </AppShell>
  );
}
