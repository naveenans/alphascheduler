import { useAppStore } from "./store";

export function exportPayload() {
  const s = useAppStore.getState();
  return {
    app: "alpha-scheduler",
    version: 1,
    exportedAt: new Date().toISOString(),
    onboarded: s.onboarded,
    settings: s.settings,
    tasks: s.tasks,
    projects: s.projects,
    goals: s.goals,
    habits: s.habits,
    notices: s.notices,
  };
}

export function downloadBackup() {
  const blob = new Blob([JSON.stringify(exportPayload(), null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `alpha-scheduler-${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function readBackupFile(file: File) {
  const text = await file.text();
  const data = JSON.parse(text) as ReturnType<typeof exportPayload>;
  if (data.app !== "alpha-scheduler") {
    throw new Error("This file doesn't look like an Alpha Scheduler backup.");
  }
  return data;
}
