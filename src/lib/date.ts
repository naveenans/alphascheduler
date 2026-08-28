import {
  addDays,
  addMonths,
  addWeeks,
  addYears,
  format,
  getDay,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  isTomorrow,
  isYesterday,
  parseISO,
  startOfDay,
  startOfMonth,
  startOfWeek,
  endOfMonth,
  endOfWeek,
  eachDayOfInterval,
  setDate,
  lastDayOfMonth,
  getDate,
} from "date-fns";
import type { RepeatRule } from "./types";

export function parseDate(iso: string) {
  return parseISO(iso);
}

export function toISODate(d: Date) {
  return format(d, "yyyy-MM-dd");
}

export function todayISO() {
  return toISODate(new Date());
}

export function combineDateTime(date: string | null, time: string | null): Date | null {
  if (!date) return null;
  const [h, m] = (time ?? "09:00").split(":").map((n) => Number(n));
  const d = parseISO(date);
  d.setHours(h || 0, m || 0, 0, 0);
  return d;
}

export function greeting(now = new Date()) {
  const h = now.getHours();
  if (h < 5) return "Good night";
  if (h < 12) return "Good morning";
  if (h < 17) return "Good afternoon";
  if (h < 21) return "Good evening";
  return "Good night";
}

export function formatDayHeading(d: Date, weekStartsOn: 0 | 1 = 1) {
  void weekStartsOn;
  return format(d, "EEEE, d MMMM");
}

export function formatShortDate(iso: string | null) {
  if (!iso) return "No date";
  const d = parseISO(iso);
  if (isToday(d)) return "Today";
  if (isTomorrow(d)) return "Tomorrow";
  if (isYesterday(d)) return "Yesterday";
  return format(d, "d MMM");
}

export function formatTime(t: string | null) {
  if (!t) return null;
  const [hStr, mStr] = t.split(":");
  const h = Number(hStr);
  const m = Number(mStr);
  const suffix = h >= 12 ? "PM" : "AM";
  const hr = h % 12 || 12;
  return `${hr}:${String(m).padStart(2, "0")} ${suffix}`;
}

export function formatRelativeDue(date: string | null, time: string | null) {
  const when = combineDateTime(date, time);
  if (!when) return "Unscheduled";
  if (isToday(when)) return time ? `Today · ${formatTime(time)}` : "Today";
  if (isTomorrow(when)) return time ? `Tomorrow · ${formatTime(time)}` : "Tomorrow";
  return time ? `${format(when, "d MMM")} · ${formatTime(time)}` : format(when, "d MMM");
}

export function isOverdue(date: string | null, time: string | null, status: string) {
  if (status === "completed" || !date) return false;
  const when = combineDateTime(date, time ?? "23:59");
  if (!when) return false;
  return isBefore(when, new Date());
}

export function isDueToday(date: string | null) {
  if (!date) return false;
  return isToday(parseISO(date));
}

export function daysUntil(iso: string | null) {
  if (!iso) return null;
  const target = startOfDay(parseISO(iso));
  const today = startOfDay(new Date());
  return Math.round((target.getTime() - today.getTime()) / 86400000);
}

export function monthGrid(anchor: Date, weekStartsOn: 0 | 1) {
  const start = startOfWeek(startOfMonth(anchor), { weekStartsOn });
  const end = endOfWeek(endOfMonth(anchor), { weekStartsOn });
  return eachDayOfInterval({ start, end });
}

export function weekDays(anchor: Date, weekStartsOn: 0 | 1) {
  const start = startOfWeek(anchor, { weekStartsOn });
  return eachDayOfInterval({ start, end: addDays(start, 6) });
}

export function nextRepeatDate(fromISO: string, rule: RepeatRule): string | null {
  if (rule.type === "none") return null;
  const from = parseISO(fromISO);
  switch (rule.type) {
    case "daily":
      return toISODate(addDays(from, 1));
    case "weekdays": {
      let d = addDays(from, 1);
      while (getDay(d) === 0 || getDay(d) === 6) d = addDays(d, 1);
      return toISODate(d);
    }
    case "weekly": {
      const days = rule.days.length ? rule.days : [getDay(from)];
      let d = addDays(from, 1);
      for (let i = 0; i < 14; i++) {
        if (days.includes(getDay(d))) return toISODate(d);
        d = addDays(d, 1);
      }
      return toISODate(addWeeks(from, 1));
    }
    case "biweekly":
      return toISODate(addWeeks(from, 2));
    case "monthly": {
      const day = rule.day;
      if (day === -1) return toISODate(lastDayOfMonth(addMonths(from, 1)));
      const next = addMonths(from, 1);
      const last = getDate(lastDayOfMonth(next));
      return toISODate(setDate(next, Math.min(day, last)));
    }
    case "yearly":
      return toISODate(addYears(from, 1));
    case "custom": {
      if (rule.unit === "day") return toISODate(addDays(from, rule.interval));
      if (rule.unit === "week") return toISODate(addWeeks(from, rule.interval));
      if (rule.unit === "month") return toISODate(addMonths(from, rule.interval));
      return toISODate(addYears(from, rule.interval));
    }
  }
}

export function repeatLabel(rule: RepeatRule) {
  switch (rule.type) {
    case "none":
      return "Doesn't repeat";
    case "daily":
      return "Every day";
    case "weekdays":
      return "Every weekday";
    case "weekly": {
      if (rule.days.length === 1) {
        const names = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        return `Every ${names[rule.days[0]!]}`;
      }
      return "Weekly";
    }
    case "biweekly":
      return "Every 2 weeks";
    case "monthly":
      return rule.day === -1 ? "Last day of month" : `Monthly on the ${rule.day}`;
    case "yearly":
      return "Every year";
    case "custom":
      return `Every ${rule.interval} ${rule.unit}${rule.interval > 1 ? "s" : ""}`;
  }
}

export function sortByWhen<T extends { date: string | null; time: string | null }>(items: T[]) {
  return [...items].sort((a, b) => {
    const at = combineDateTime(a.date, a.time)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    const bt = combineDateTime(b.date, b.time)?.getTime() ?? Number.MAX_SAFE_INTEGER;
    return at - bt;
  });
}

export function inRange(iso: string | null, start: Date, end: Date) {
  if (!iso) return false;
  const d = parseISO(iso);
  return !isBefore(d, startOfDay(start)) && !isAfter(d, end);
}

export { isToday, isSameDay, format, parseISO, addDays, startOfDay };
