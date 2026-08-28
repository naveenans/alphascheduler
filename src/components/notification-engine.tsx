import { useEffect } from "react";
import { combineDateTime, isOverdue } from "@/lib/date";
import { useAppStore } from "@/lib/store";

export function NotificationEngine() {
  const tasks = useAppStore((s) => s.tasks);
  const enabled = useAppStore((s) => s.settings.notificationsEnabled);
  const fired = useAppStore((s) => s.firedReminders);
  const markFired = useAppStore((s) => s.markFired);
  const addNotice = useAppStore((s) => s.addNotice);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      for (const task of tasks) {
        if (task.status === "completed" || !task.date) continue;
        if (isOverdue(task.date, task.time, task.status)) {
          const key = `overdue:${task.id}:${task.date}`;
          if (!fired.includes(key)) {
            markFired(key);
            addNotice({
              taskId: task.id,
              title: task.title,
              body: "Still waiting for you.",
              kind: "overdue",
            });
          }
        }
        if (!enabled) continue;
        const when = combineDateTime(task.date, task.time);
        if (!when) continue;
        for (const offset of task.reminderOffsets.length ? task.reminderOffsets : [0]) {
          const fireAt = when.getTime() - offset * 60_000;
          const key = `${task.id}:${offset}:${task.date}`;
          if (fired.includes(key)) continue;
          if (now >= fireAt && now - fireAt < 5 * 60_000) {
            markFired(key);
            addNotice({
              taskId: task.id,
              title: task.title,
              body: offset === 0 ? "It's time." : `In ${offset} minutes.`,
              kind: offset === 0 ? "due" : "upcoming",
            });
            if ("Notification" in window && Notification.permission === "granted") {
              try {
                new Notification(task.title, {
                  body: offset === 0 ? "It's time." : `Coming up in ${offset} minutes.`,
                });
              } catch {
                /* ignore */
              }
            }
          }
        }
      }
    };
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, [tasks, enabled, fired, markFired, addNotice]);

  return null;
}
