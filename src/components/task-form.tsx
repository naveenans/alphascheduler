import { useState } from "react";
import {
  FINANCIAL_SUBS,
  PERSONAL_SUBS,
  PROFESSIONAL_SUBS,
  REMINDER_PRESETS,
  type Category,
  type Priority,
  type RepeatRule,
  type TaskKind,
} from "@/lib/types";
import { emptyDraft, type TaskDraft, useAppStore } from "@/lib/store";
import { uid } from "@/lib/utils";
import { Button, Chip, Field, Input, Textarea } from "./ui";

const KINDS: TaskKind[] = ["todo", "reminder", "schedule", "payment", "note"];
const PRIOS: Priority[] = ["low", "medium", "high", "critical"];
const CATS: Category[] = ["personal", "professional", "financial"];

function subsFor(cat: Category) {
  if (cat === "personal") return PERSONAL_SUBS;
  if (cat === "professional") return PROFESSIONAL_SUBS;
  return FINANCIAL_SUBS;
}

export function TaskForm({
  initial,
  submitLabel = "Save",
  onSubmit,
}: {
  initial?: Partial<TaskDraft>;
  submitLabel?: string;
  onSubmit: (draft: TaskDraft) => void;
}) {
  const projects = useAppStore((s) => s.projects);
  const goals = useAppStore((s) => s.goals);
  const [draft, setDraft] = useState<TaskDraft>(() => emptyDraft(initial));
  const [subTitle, setSubTitle] = useState("");

  function patch(p: Partial<TaskDraft>) {
    setDraft((d) => ({ ...d, ...p }));
  }

  const repeats: { label: string; rule: RepeatRule }[] = [
    { label: "Doesn't repeat", rule: { type: "none" } },
    { label: "Daily", rule: { type: "daily" } },
    { label: "Weekdays", rule: { type: "weekdays" } },
    { label: "Weekly", rule: { type: "weekly", days: [new Date().getDay()] } },
    { label: "Every 2 weeks", rule: { type: "biweekly" } },
    { label: "Monthly", rule: { type: "monthly", day: new Date().getDate() } },
    { label: "Yearly", rule: { type: "yearly" } },
  ];

  return (
    <form
      className="space-y-5 pb-8"
      onSubmit={(e) => {
        e.preventDefault();
        if (!draft.title.trim()) return;
        onSubmit(draft);
      }}
    >
      <Field label="Title">
        <Input
          required
          value={draft.title}
          onChange={(e) => patch({ title: e.target.value })}
          placeholder="What needs doing?"
        />
      </Field>
      <Field label="Description">
        <Textarea
          value={draft.description}
          onChange={(e) => patch({ description: e.target.value })}
          placeholder="Optional details"
        />
      </Field>
      <Field label="Type">
        <div className="flex flex-wrap gap-2">
          {KINDS.map((k) => (
            <Chip key={k} active={draft.kind === k} onClick={() => patch({ kind: k })}>
              {k[0]!.toUpperCase() + k.slice(1)}
            </Chip>
          ))}
        </div>
      </Field>
      <Field label="Category">
        <div className="flex flex-wrap gap-2">
          {CATS.map((c) => (
            <Chip
              key={c}
              tone={c}
              active={draft.category === c}
              onClick={() =>
                patch({
                  category: c,
                  subcategory: "",
                  kind: c === "financial" ? "payment" : draft.kind,
                })
              }
            >
              {c[0]!.toUpperCase() + c.slice(1)}
            </Chip>
          ))}
        </div>
      </Field>
      <Field label="Subcategory">
        <div className="flex flex-wrap gap-2">
          {subsFor(draft.category).map((s) => (
            <Chip
              key={s}
              active={draft.subcategory === s}
              onClick={() => patch({ subcategory: s })}
            >
              {s}
            </Chip>
          ))}
        </div>
      </Field>
      <div className="grid grid-cols-2 gap-3">
        <Field label="Date">
          <Input
            type="date"
            value={draft.date ?? ""}
            onChange={(e) => patch({ date: e.target.value || null })}
          />
        </Field>
        <Field label="Time">
          <Input
            type="time"
            value={draft.time ?? ""}
            onChange={(e) => patch({ time: e.target.value || null })}
          />
        </Field>
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          size="sm"
          variant="soft"
          onClick={() => patch({ date: new Date().toISOString().slice(0, 10) })}
        >
          Today
        </Button>
        <Button
          type="button"
          size="sm"
          variant="soft"
          onClick={() => {
            const d = new Date();
            d.setDate(d.getDate() + 1);
            patch({ date: d.toISOString().slice(0, 10) });
          }}
        >
          Tomorrow
        </Button>
      </div>
      {draft.category === "financial" ? (
        <Field label="Amount (INR)">
          <Input
            type="number"
            min={0}
            value={draft.amount ?? ""}
            onChange={(e) =>
              patch({ amount: e.target.value === "" ? null : Number(e.target.value) })
            }
            placeholder="15000"
          />
        </Field>
      ) : null}
      <Field label="Priority">
        <div className="flex flex-wrap gap-2">
          {PRIOS.map((p) => (
            <Chip key={p} active={draft.priority === p} onClick={() => patch({ priority: p })}>
              {p[0]!.toUpperCase() + p.slice(1)}
            </Chip>
          ))}
        </div>
      </Field>
      <Field label="Reminder">
        <div className="flex flex-wrap gap-2">
          {REMINDER_PRESETS.map((p) => {
            const on = draft.reminderOffsets.includes(p.minutes);
            return (
              <Chip
                key={p.minutes}
                active={on}
                onClick={() =>
                  patch({
                    reminderOffsets: on
                      ? draft.reminderOffsets.filter((m) => m !== p.minutes)
                      : [...draft.reminderOffsets, p.minutes],
                  })
                }
              >
                {p.label}
              </Chip>
            );
          })}
        </div>
      </Field>
      <Field label="Repeat">
        <div className="flex flex-wrap gap-2">
          {repeats.map((r) => (
            <Chip
              key={r.label}
              active={draft.repeat.type === r.rule.type}
              onClick={() => patch({ repeat: r.rule })}
            >
              {r.label}
            </Chip>
          ))}
        </div>
      </Field>
      <Field label="Subtasks">
        <div className="space-y-2">
          {draft.subtasks.map((s) => (
            <div key={s.id} className="flex items-center gap-2 rounded-xl bg-elevated px-3 py-2 text-sm shadow-[var(--elev-border)]">
              <span className="flex-1">{s.title}</span>
              <button
                type="button"
                className="text-xs text-muted"
                onClick={() => patch({ subtasks: draft.subtasks.filter((x) => x.id !== s.id) })}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="flex gap-2">
            <Input
              value={subTitle}
              onChange={(e) => setSubTitle(e.target.value)}
              placeholder="Add a step"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  if (!subTitle.trim()) return;
                  patch({
                    subtasks: [...draft.subtasks, { id: uid(), title: subTitle.trim(), completed: false }],
                  });
                  setSubTitle("");
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                if (!subTitle.trim()) return;
                patch({
                  subtasks: [...draft.subtasks, { id: uid(), title: subTitle.trim(), completed: false }],
                });
                setSubTitle("");
              }}
            >
              Add
            </Button>
          </div>
        </div>
      </Field>
      <Field label="Notes">
        <Textarea
          value={draft.notes}
          onChange={(e) => patch({ notes: e.target.value })}
          placeholder="Private notes"
        />
      </Field>
      {projects.length > 0 && draft.category === "professional" ? (
        <Field label="Project">
          <div className="flex flex-wrap gap-2">
            <Chip active={!draft.projectId} onClick={() => patch({ projectId: null })}>
              None
            </Chip>
            {projects.map((p) => (
              <Chip
                key={p.id}
                active={draft.projectId === p.id}
                onClick={() => patch({ projectId: p.id })}
              >
                {p.name}
              </Chip>
            ))}
          </div>
        </Field>
      ) : null}
      {goals.length > 0 ? (
        <Field label="Linked goal">
          <div className="flex flex-wrap gap-2">
            <Chip active={!draft.goalId} onClick={() => patch({ goalId: null })}>
              None
            </Chip>
            {goals.map((g) => (
              <Chip key={g.id} active={draft.goalId === g.id} onClick={() => patch({ goalId: g.id })}>
                {g.title}
              </Chip>
            ))}
          </div>
        </Field>
      ) : null}
      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={draft.isHabit}
          onChange={(e) => patch({ isHabit: e.target.checked })}
          className="size-4 accent-[var(--accent)]"
        />
        Track as a habit
      </label>
      <Button type="submit" className="w-full" size="lg">
        {submitLabel}
      </Button>
    </form>
  );
}
