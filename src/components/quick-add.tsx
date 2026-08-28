import { useMemo, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  AlarmClock,
  CalendarDays,
  ListTodo,
  NotebookPen,
  Target,
  Wallet,
} from "lucide-react";
import { parseQuickAdd } from "@/lib/nlp";
import { emptyDraft, useAppStore } from "@/lib/store";
import { formatShortDate, formatTime } from "@/lib/date";
import type { TaskKind } from "@/lib/types";
import { CATEGORY_META } from "@/lib/types";
import { Button, Chip, Input, Sheet } from "./ui";
import { cn } from "@/lib/utils";

const KINDS: { id: TaskKind; label: string; icon: typeof ListTodo }[] = [
  { id: "todo", label: "Todo", icon: ListTodo },
  { id: "reminder", label: "Reminder", icon: AlarmClock },
  { id: "schedule", label: "Schedule", icon: CalendarDays },
  { id: "payment", label: "Payment", icon: Wallet },
  { id: "goal", label: "Goal", icon: Target },
  { id: "note", label: "Note", icon: NotebookPen },
];

export function QuickAdd({ open, onClose }: { open: boolean; onClose: () => void }) {
  const addTask = useAppStore((s) => s.addTask);
  const addGoal = useAppStore((s) => s.addGoal);
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [kind, setKind] = useState<TaskKind>("todo");
  const parsed = useMemo(() => (text.trim() ? parseQuickAdd(text) : null), [text]);

  function save() {
    if (!parsed) return;
    if (kind === "goal") {
      addGoal({
        title: parsed.title,
        description: "",
        category: parsed.category,
        targetDate: parsed.date,
        targetValue: parsed.amount ?? 1,
        currentValue: 0,
        unit: parsed.amount ? "₹" : "steps",
        taskIds: [],
        milestones: [],
      });
    } else {
      addTask(
        emptyDraft({
          title: parsed.title,
          kind,
          category: kind === "payment" ? "financial" : parsed.category,
          date: parsed.date,
          time: parsed.time,
          priority: parsed.priority,
          amount: parsed.amount,
          repeat: parsed.repeat,
          reminderOffsets: parsed.reminderOffsets,
        }),
      );
    }
    setText("");
    onClose();
  }

  return (
    <Sheet open={open} onClose={onClose} title="Quick add">
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
        {KINDS.map((k) => {
          const Icon = k.icon;
          return (
            <button
              key={k.id}
              type="button"
              onClick={() => setKind(k.id)}
              className={cn(
                "flex h-16 w-[4.6rem] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium",
                "transition-[background-color,color] duration-150",
                kind === k.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted shadow-[var(--elev-border)]",
              )}
            >
              <Icon className="size-4" />
              {k.label}
            </button>
          );
        })}
      </div>
      <Input
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Call client tomorrow at 10 AM"
        onKeyDown={(e) => {
          if (e.key === "Enter") save();
        }}
      />
      {parsed ? (
        <div className="mt-4 rounded-2xl bg-elevated p-4 shadow-[var(--elev-border)]">
          <p className="font-display text-lg font-semibold tracking-tight">{parsed.title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Chip active>{formatShortDate(parsed.date)}</Chip>
            {parsed.time ? <Chip active>{formatTime(parsed.time)}</Chip> : null}
            <Chip tone={parsed.category} active={false}>
              {CATEGORY_META[parsed.category].label}
            </Chip>
            {parsed.amount != null ? (
              <Chip tone="financial">₹{parsed.amount.toLocaleString("en-IN")}</Chip>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="mt-3 text-sm text-muted">
          Try: “Pay electricity bill on 5 Sep” or “Team meeting Friday at 3 PM”.
        </p>
      )}
      <div className="mt-5 flex gap-2">
        <Button className="flex-1" disabled={!parsed} onClick={save}>
          Save
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            onClose();
            navigate({ to: "/create", search: { q: text, kind } });
          }}
        >
          Full editor
        </Button>
      </div>
    </Sheet>
  );
}
