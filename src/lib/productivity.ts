import { addDays } from "date-fns";
import type { Goal, Habit, Task } from "./types";
import { isDueToday, isOverdue, todayISO, toISODate } from "./date";

export function taskProgress(task: Task) {
  if (task.status === "completed") return 100;
  if (task.subtasks.length === 0) return 0;
  const done = task.subtasks.filter((s) => s.completed).length;
  return Math.round((done / task.subtasks.length) * 100);
}

export function categoryStats(tasks: Task[], category: Task["category"]) {
  const list = tasks.filter((t) => t.category === category && isDueToday(t.date));
  const pending = list.filter((t) => t.status !== "completed").length;
  const done = list.filter((t) => t.status === "completed").length;
  const total = list.length;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  return { pending, done, total, pct };
}

export function todayStats(tasks: Task[]) {
  const todayDated = tasks.filter((t) => isDueToday(t.date));
  const completed = todayDated.filter((t) => t.status === "completed").length;
  const total = todayDated.length;
  const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status)).length;
  const important = todayDated.filter((t) => t.priority === "critical" || t.priority === "high");
  const importantDone = important.filter((t) => t.status === "completed").length;
  return {
    completed,
    total,
    pct: total === 0 ? 0 : Math.round((completed / total) * 100),
    overdue,
    importantDone,
    importantTotal: important.length,
  };
}

export function productivityScore(tasks: Task[], habits: Habit[]) {
  const stats = todayStats(tasks);
  let score = 50;
  if (stats.total > 0) score = Math.round((stats.completed / stats.total) * 70);
  else score = 72;
  if (stats.importantTotal > 0) {
    score += Math.round((stats.importantDone / stats.importantTotal) * 20);
  } else {
    score += 10;
  }
  score -= Math.min(20, stats.overdue * 6);
  const today = todayISO();
  const habitHits = habits.filter((h) => h.completions[today]).length;
  if (habits.length > 0) score += Math.round((habitHits / habits.length) * 10);
  return Math.max(0, Math.min(100, score));
}

export function habitStreak(habit: Habit) {
  let streak = 0;
  const d = new Date();
  for (let i = 0; i < 400; i++) {
    const iso = toISODate(d);
    if (habit.completions[iso]) {
      streak += 1;
      d.setDate(d.getDate() - 1);
    } else if (i === 0) {
      d.setDate(d.getDate() - 1);
    } else break;
  }
  return streak;
}

export function goalProgress(goal: Goal, tasks: Task[]) {
  if (goal.targetValue > 0) {
    return Math.max(0, Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100)));
  }
  const related = tasks.filter((t) => t.goalId === goal.id || goal.taskIds.includes(t.id));
  if (related.length === 0) {
    const miles = goal.milestones;
    if (miles.length === 0) return 0;
    return Math.round((miles.filter((m) => m.done).length / miles.length) * 100);
  }
  const done = related.filter((t) => t.status === "completed").length;
  return Math.round((done / related.length) * 100);
}

export function weeklyCompletion(tasks: Task[]) {
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = addDays(new Date(), i - 6);
    const iso = toISODate(d);
    const dayTasks = tasks.filter((t) => t.date === iso);
    const done = dayTasks.filter((t) => t.status === "completed").length;
    return {
      iso,
      label: d.toLocaleDateString("en-IN", { weekday: "short" }),
      done,
      total: dayTasks.length,
      pct: dayTasks.length === 0 ? 0 : Math.round((done / dayTasks.length) * 100),
    };
  });
  return days;
}

export function distribution(tasks: Task[]) {
  const cats = { personal: 0, professional: 0, financial: 0 };
  for (const t of tasks) cats[t.category] += 1;
  return cats;
}

export function mostProductiveDay(tasks: Task[]) {
  const map = new Map<string, number>();
  for (const t of tasks) {
    if (t.status !== "completed" || !t.completedAt) continue;
    const day = t.completedAt.slice(0, 10);
    map.set(day, (map.get(day) ?? 0) + 1);
  }
  let best = { day: "—", count: 0 };
  for (const [day, count] of map) {
    if (count > best.count) best = { day, count };
  }
  return best;
}
