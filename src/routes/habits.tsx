import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { addDays, format } from "date-fns";
import { AppShell } from "@/components/app-shell";
import { Button, Chip, Empty, Field, Input, Sheet } from "@/components/ui";
import { todayISO, toISODate } from "@/lib/date";
import { habitStreak } from "@/lib/productivity";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import type { Category } from "@/lib/types";

export const Route = createFileRoute("/habits")({ component: HabitsPage });

function HabitsPage() {
  const habits = useAppStore((s) => s.habits);
  const toggle = useAppStore((s) => s.toggleHabitDay);
  const add = useAppStore((s) => s.addHabit);
  const remove = useAppStore((s) => s.deleteHabit);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [days, setDays] = useState<number[]>([1, 2, 3, 4, 5]);
  const today = todayISO();
  const week = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i - 6));

  return (
    <AppShell
      title="Habits"
      action={
        <button type="button" className="text-sm font-medium" onClick={() => setOpen(true)}>
          New
        </button>
      }
    >
      {habits.length === 0 ? (
        <Empty title="No habits yet" body="Pick a small daily action. Streaks grow when you simply show up." />
      ) : (
        <div className="space-y-3">
          {habits.map((h) => {
            const streak = habitStreak(h);
            return (
              <div key={h.id} className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display text-lg font-semibold">{h.title}</h3>
                    <p className="text-sm text-muted tabular-nums">
                      {streak} day streak
                    </p>
                  </div>
                  <button type="button" className="text-xs text-muted" onClick={() => remove(h.id)}>
                    Remove
                  </button>
                </div>
                <div className="mt-4 flex justify-between">
                  {week.map((d) => {
                    const iso = toISODate(d);
                    const on = Boolean(h.completions[iso]);
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => toggle(h.id, iso)}
                        className="flex flex-col items-center gap-1"
                      >
                        <span className="text-[10px] text-subtle">{format(d, "EEEEE")}</span>
                        <span
                          className={cn(
                            "grid size-9 place-items-center rounded-full text-xs tabular-nums",
                            on ? "bg-ok text-bg" : "bg-elevated text-muted",
                            iso === today && !on && "shadow-[var(--elev-border)]",
                          )}
                        >
                          {d.getDate()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
      <Sheet open={open} onClose={() => setOpen(false)} title="New habit">
        <Field label="Title">
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Morning walk" />
        </Field>
        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Days</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((label, i) => (
            <Chip
              key={`${label}-${i}`}
              active={days.includes(i)}
              onClick={() =>
                setDays(days.includes(i) ? days.filter((d) => d !== i) : [...days, i].sort())
              }
            >
              {label}
            </Chip>
          ))}
        </div>
        <Button
          className="mt-5 w-full"
          onClick={() => {
            if (!title.trim()) return;
            add(title.trim(), "personal" satisfies Category, days);
            setTitle("");
            setOpen(false);
          }}
        >
          Save habit
        </Button>
      </Sheet>
    </AppShell>
  );
}
