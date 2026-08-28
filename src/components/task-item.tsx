import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Clock } from "lucide-react";
import type { Task } from "@/lib/types";
import { CATEGORY_META } from "@/lib/types";
import { formatTime, isOverdue } from "@/lib/date";
import { taskProgress } from "@/lib/productivity";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PriorityMark } from "./ui";

export function TaskItem({
  task,
  showCategory = true,
}: {
  task: Task;
  showCategory?: boolean;
}) {
  const toggle = useAppStore((s) => s.toggleTask);
  const remove = useAppStore((s) => s.deleteTask);
  const navigate = useNavigate();
  const overdue = isOverdue(task.date, task.time, task.status);
  const done = task.status === "completed";
  const pct = taskProgress(task);
  const [dx, setDx] = useState(0);
  const startX = useRef<number | null>(null);

  const tone =
    task.category === "personal"
      ? "text-personal"
      : task.category === "professional"
        ? "text-professional"
        : "text-financial";

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <div className="absolute inset-y-0 left-0 flex w-24 items-center justify-center bg-ok/20 text-ok">
        <Check className="size-5" />
      </div>
      <div className="absolute inset-y-0 right-0 flex w-24 items-center justify-center bg-danger/15 text-danger">
        <span className="text-xs font-semibold">Remove</span>
      </div>
      <button
        type="button"
        onPointerDown={(e) => {
          startX.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (startX.current == null) return;
          setDx(Math.max(-96, Math.min(96, e.clientX - startX.current)));
        }}
        onPointerUp={() => {
          if (dx > 72) toggle(task.id);
          else if (dx < -72) remove(task.id);
          setDx(0);
          startX.current = null;
        }}
        onPointerCancel={() => {
          setDx(0);
          startX.current = null;
        }}
        onClick={() => {
          if (Math.abs(dx) > 8) return;
          navigate({ to: "/task/$id", params: { id: task.id } });
        }}
        className={cn(
          "relative flex w-full items-start gap-3 bg-surface px-3.5 py-3.5 text-left shadow-[var(--elev-border)]",
          "transition-[transform] duration-150 ease-out",
        )}
        style={{ transform: `translateX(${dx}px)` }}
      >
        <span
          role="checkbox"
          aria-checked={done}
          onClick={(e) => {
            e.stopPropagation();
            toggle(task.id);
          }}
          className={cn(
            "mt-0.5 grid size-6 shrink-0 place-items-center rounded-full",
            "transition-[background-color,scale] duration-200 ease-out",
            done ? "bg-ok text-bg" : "bg-elevated shadow-[var(--elev-border)]",
          )}
        >
          {done ? <Check className="size-3.5" strokeWidth={2.6} /> : null}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p
              className={cn(
                "font-medium leading-snug text-fg",
                done && "text-muted line-through",
              )}
            >
              {task.title}
            </p>
            <PriorityMark priority={task.priority} />
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-muted">
            {task.time ? (
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" />
                {formatTime(task.time)}
              </span>
            ) : null}
            {showCategory ? (
              <span className={cn("font-medium", tone)}>{CATEGORY_META[task.category].label}</span>
            ) : null}
            {task.amount != null ? (
              <span className="tabular-nums text-financial">
                ₹{task.amount.toLocaleString("en-IN")}
              </span>
            ) : null}
            {overdue ? <span className="text-warn">Needs attention</span> : null}
            {task.isDemo ? <span className="text-subtle">Sample</span> : null}
          </div>
          {task.subtasks.length > 0 ? (
            <div className="mt-2">
              <div className="h-1 overflow-hidden rounded-full bg-fg/8">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${pct}%` }}
                />
              </div>
              <p className="mt-1 text-[11px] text-subtle tabular-nums">
                {task.subtasks.filter((s) => s.completed).length}/{task.subtasks.length} steps
              </p>
            </div>
          ) : null}
        </div>
      </button>
    </div>
  );
}
