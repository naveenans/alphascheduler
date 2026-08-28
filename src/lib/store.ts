import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { addDays, addMinutes, format } from "date-fns";
import type {
  Category,
  Goal,
  Habit,
  Notice,
  Priority,
  Project,
  RepeatRule,
  Settings,
  Subtask,
  Task,
  TaskKind,
} from "./types";
import { uid } from "./utils";
import { buildSeed } from "./seed";
import { nextRepeatDate, todayISO, toISODate } from "./date";

export interface TaskDraft {
  title: string;
  description: string;
  notes: string;
  kind: TaskKind;
  category: Category;
  subcategory: string;
  projectId: string | null;
  goalId: string | null;
  date: string | null;
  time: string | null;
  priority: Priority;
  reminderOffsets: number[];
  repeat: RepeatRule;
  subtasks: Subtask[];
  isHabit: boolean;
  amount: number | null;
}

export const emptyDraft = (partial?: Partial<TaskDraft>): TaskDraft => ({
  title: "",
  description: "",
  notes: "",
  kind: "todo",
  category: "personal",
  subcategory: "",
  projectId: null,
  goalId: null,
  date: todayISO(),
  time: null,
  priority: "medium",
  reminderOffsets: [15],
  repeat: { type: "none" },
  subtasks: [],
  isHabit: false,
  amount: null,
  ...partial,
});

interface AppState {
  onboarded: boolean;
  tasks: Task[];
  projects: Project[];
  goals: Goal[];
  habits: Habit[];
  notices: Notice[];
  settings: Settings;
  dismissedMorning: string | null;
  dismissedEvening: string | null;
  firedReminders: string[];

  completeOnboarding: (name: string, seed: boolean) => void;
  skipOnboarding: () => void;
  resetDemo: () => void;
  removeDemo: () => void;

  addTask: (draft: TaskDraft) => string;
  updateTask: (id: string, patch: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  toggleTask: (id: string) => void;
  toggleSubtask: (taskId: string, subId: string) => void;
  moveTaskDate: (id: string, date: string) => void;
  snoozeTask: (id: string, minutes: number) => void;
  rescheduleTask: (id: string, date: string, time: string | null) => void;
  postponeUnfinishedToTomorrow: () => void;

  addProject: (name: string, description?: string) => string;
  deleteProject: (id: string) => void;

  addGoal: (goal: Omit<Goal, "id" | "createdAt">) => string;
  updateGoal: (id: string, patch: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  bumpGoal: (id: string, delta: number) => void;
  toggleMilestone: (goalId: string, milestoneId: string) => void;

  addHabit: (title: string, category: Category, days: number[]) => string;
  toggleHabitDay: (id: string, date: string) => void;
  deleteHabit: (id: string) => void;

  addNotice: (n: Omit<Notice, "id" | "createdAt" | "read">) => void;
  markNoticeRead: (id: string) => void;
  clearNotices: () => void;
  markFired: (key: string) => void;

  updateSettings: (patch: Partial<Settings>) => void;
  dismissMorning: () => void;
  dismissEvening: () => void;
  importAll: (
    data: Partial<
      Pick<AppState, "tasks" | "projects" | "goals" | "habits" | "settings" | "onboarded">
    >,
  ) => void;
}

const defaultSettings: Settings = {
  theme: "dark",
  weekStartsOn: 1,
  defaultReminder: 15,
  notificationsEnabled: false,
  aiEnabled: true,
  name: "",
};

function nowIso() {
  return new Date().toISOString();
}

function fromDraft(draft: TaskDraft): Task {
  const stamp = nowIso();
  return {
    id: uid(),
    title: draft.title.trim() || "Untitled",
    description: draft.description,
    notes: draft.notes,
    kind: draft.kind,
    category: draft.category,
    subcategory: draft.subcategory,
    projectId: draft.projectId,
    goalId: draft.goalId,
    date: draft.date,
    time: draft.time,
    priority: draft.priority,
    status: "pending",
    reminderOffsets: draft.reminderOffsets,
    repeat: draft.repeat,
    subtasks: draft.subtasks,
    isHabit: draft.isHabit,
    isDemo: false,
    amount: draft.amount,
    createdAt: stamp,
    updatedAt: stamp,
    completedAt: null,
    completions: [],
  };
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      onboarded: false,
      tasks: [],
      projects: [],
      goals: [],
      habits: [],
      notices: [],
      settings: defaultSettings,
      dismissedMorning: null,
      dismissedEvening: null,
      firedReminders: [],

      completeOnboarding: (name, seed) => {
        const seeded = seed ? buildSeed() : { tasks: [], projects: [], goals: [], habits: [] };
        set({
          onboarded: true,
          settings: { ...get().settings, name: name.trim() },
          ...seeded,
        });
      },
      skipOnboarding: () => {
        const seeded = buildSeed();
        set({ onboarded: true, ...seeded });
      },
      resetDemo: () => set({ ...buildSeed() }),
      removeDemo: () =>
        set({
          tasks: get().tasks.filter((t) => !t.isDemo),
          habits: get().habits.filter((h) => !h.isDemo),
        }),

      addTask: (draft) => {
        const task = fromDraft(draft);
        set({ tasks: [task, ...get().tasks] });
        if (task.goalId) {
          set({
            goals: get().goals.map((g) =>
              g.id === task.goalId && !g.taskIds.includes(task.id)
                ? { ...g, taskIds: [...g.taskIds, task.id] }
                : g,
            ),
          });
        }
        return task.id;
      },
      updateTask: (id, patch) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, ...patch, updatedAt: nowIso() } : t,
          ),
        }),
      deleteTask: (id) => set({ tasks: get().tasks.filter((t) => t.id !== id) }),
      toggleTask: (id) => {
        const task = get().tasks.find((t) => t.id === id);
        if (!task) return;
        if (task.status === "completed") {
          set({
            tasks: get().tasks.map((t) =>
              t.id === id
                ? { ...t, status: "pending", completedAt: null, updatedAt: nowIso() }
                : t,
            ),
          });
          return;
        }
        const stamp = nowIso();
        const date = task.date ?? todayISO();
        const next = nextRepeatDate(date, task.repeat);
        if (next) {
          set({
            tasks: get().tasks.map((t) =>
              t.id === id
                ? {
                    ...t,
                    date: next,
                    status: "pending",
                    completedAt: null,
                    completions: [...t.completions, date],
                    updatedAt: stamp,
                    subtasks: t.subtasks.map((s) => ({ ...s, completed: false })),
                  }
                : t,
            ),
            notices: [
              {
                id: uid(),
                taskId: id,
                title: task.title,
                body: "Completed — next occurrence scheduled.",
                kind: "completed" as const,
                read: false,
                createdAt: stamp,
              },
              ...get().notices,
            ].slice(0, 80),
          });
        } else {
          set({
            tasks: get().tasks.map((t) =>
              t.id === id
                ? { ...t, status: "completed", completedAt: stamp, updatedAt: stamp }
                : t,
            ),
            notices: [
              {
                id: uid(),
                taskId: id,
                title: task.title,
                body: "Marked complete.",
                kind: "completed" as const,
                read: false,
                createdAt: stamp,
              },
              ...get().notices,
            ].slice(0, 80),
          });
        }
      },
      toggleSubtask: (taskId, subId) =>
        set({
          tasks: get().tasks.map((t) => {
            if (t.id !== taskId) return t;
            const subtasks = t.subtasks.map((s) =>
              s.id === subId ? { ...s, completed: !s.completed } : s,
            );
            const all = subtasks.length > 0 && subtasks.every((s) => s.completed);
            return {
              ...t,
              subtasks,
              status: all ? "completed" : "pending",
              completedAt: all ? nowIso() : null,
              updatedAt: nowIso(),
            };
          }),
        }),
      moveTaskDate: (id, date) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, date, updatedAt: nowIso() } : t,
          ),
        }),
      snoozeTask: (id, minutes) => {
        const base = addMinutes(new Date(), minutes);
        get().rescheduleTask(id, toISODate(base), format(base, "HH:mm"));
      },
      rescheduleTask: (id, date, time) =>
        set({
          tasks: get().tasks.map((t) =>
            t.id === id
              ? { ...t, date, time, status: "pending", updatedAt: nowIso() }
              : t,
          ),
        }),
      postponeUnfinishedToTomorrow: () => {
        const iso = toISODate(addDays(new Date(), 1));
        const today = todayISO();
        set({
          tasks: get().tasks.map((t) =>
            t.status !== "completed" && t.date === today
              ? { ...t, date: iso, updatedAt: nowIso() }
              : t,
          ),
        });
      },

      addProject: (name, description = "") => {
        const p: Project = { id: uid(), name, description, createdAt: nowIso() };
        set({ projects: [...get().projects, p] });
        return p.id;
      },
      deleteProject: (id) =>
        set({
          projects: get().projects.filter((p) => p.id !== id),
          tasks: get().tasks.map((t) =>
            t.projectId === id ? { ...t, projectId: null } : t,
          ),
        }),

      addGoal: (goal) => {
        const g: Goal = { ...goal, id: uid(), createdAt: nowIso() };
        set({ goals: [...get().goals, g] });
        return g.id;
      },
      updateGoal: (id, patch) =>
        set({
          goals: get().goals.map((g) => (g.id === id ? { ...g, ...patch } : g)),
        }),
      deleteGoal: (id) => set({ goals: get().goals.filter((g) => g.id !== id) }),
      bumpGoal: (id, delta) =>
        set({
          goals: get().goals.map((g) =>
            g.id === id
              ? { ...g, currentValue: Math.max(0, g.currentValue + delta) }
              : g,
          ),
        }),
      toggleMilestone: (goalId, milestoneId) =>
        set({
          goals: get().goals.map((g) =>
            g.id !== goalId
              ? g
              : {
                  ...g,
                  milestones: g.milestones.map((m) =>
                    m.id === milestoneId ? { ...m, done: !m.done } : m,
                  ),
                },
          ),
        }),

      addHabit: (title, category, days) => {
        const h: Habit = {
          id: uid(),
          title,
          category,
          days,
          completions: {},
          createdAt: nowIso(),
          isDemo: false,
        };
        set({ habits: [...get().habits, h] });
        return h.id;
      },
      toggleHabitDay: (id, date) =>
        set({
          habits: get().habits.map((h) => {
            if (h.id !== id) return h;
            const next = { ...h.completions };
            if (next[date]) delete next[date];
            else next[date] = true;
            return { ...h, completions: next };
          }),
        }),
      deleteHabit: (id) => set({ habits: get().habits.filter((h) => h.id !== id) }),

      addNotice: (n) =>
        set({
          notices: [
            { ...n, id: uid(), createdAt: nowIso(), read: false },
            ...get().notices,
          ].slice(0, 80),
        }),
      markNoticeRead: (id) =>
        set({
          notices: get().notices.map((n) => (n.id === id ? { ...n, read: true } : n)),
        }),
      clearNotices: () => set({ notices: [] }),
      markFired: (key) =>
        set({ firedReminders: [...get().firedReminders, key].slice(-400) }),

      updateSettings: (patch) =>
        set({ settings: { ...get().settings, ...patch } }),
      dismissMorning: () => set({ dismissedMorning: todayISO() }),
      dismissEvening: () => set({ dismissedEvening: todayISO() }),
      importAll: (data) =>
        set({
          tasks: data.tasks ?? get().tasks,
          projects: data.projects ?? get().projects,
          goals: data.goals ?? get().goals,
          habits: data.habits ?? get().habits,
          settings: data.settings
            ? { ...defaultSettings, ...data.settings }
            : get().settings,
          onboarded: data.onboarded ?? get().onboarded,
        }),
    }),
    {
      name: "alpha-scheduler-v1",
      skipHydration: true,
      storage: createJSONStorage(() =>
        typeof window === "undefined" ? noopStorage : localStorage,
      ),
      partialize: (s) => ({
        onboarded: s.onboarded,
        tasks: s.tasks,
        projects: s.projects,
        goals: s.goals,
        habits: s.habits,
        notices: s.notices,
        settings: s.settings,
        dismissedMorning: s.dismissedMorning,
        dismissedEvening: s.dismissedEvening,
        firedReminders: s.firedReminders,
      }),
    },
  ),
);

export function selectTask(id: string) {
  return useAppStore.getState().tasks.find((t) => t.id === id);
}
