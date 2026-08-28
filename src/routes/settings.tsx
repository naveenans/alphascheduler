import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button, Chip, Field, Input } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import type { ThemeMode } from "@/lib/types";

export const Route = createFileRoute("/settings")({ component: SettingsPage });

function SettingsPage() {
  const settings = useAppStore((s) => s.settings);
  const update = useAppStore((s) => s.updateSettings);
  const removeDemo = useAppStore((s) => s.removeDemo);
  const resetDemo = useAppStore((s) => s.resetDemo);

  async function enableNotes() {
    if (!("Notification" in window)) {
      update({ notificationsEnabled: true });
      return;
    }
    const perm = await Notification.requestPermission();
    update({ notificationsEnabled: perm === "granted" || perm === "default" });
  }

  return (
    <AppShell title="Settings">
      <div className="space-y-6">
        <Field label="Profile name">
          <Input
            value={settings.name}
            onChange={(e) => update({ name: e.target.value })}
            placeholder="Your name"
          />
        </Field>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">Theme</p>
          <div className="flex flex-wrap gap-2">
            {(["system", "light", "dark"] as ThemeMode[]).map((t) => (
              <Chip key={t} active={settings.theme === t} onClick={() => update({ theme: t })}>
                {t[0]!.toUpperCase() + t.slice(1)}
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Week starts on
          </p>
          <div className="flex gap-2">
            <Chip active={settings.weekStartsOn === 1} onClick={() => update({ weekStartsOn: 1 })}>
              Monday
            </Chip>
            <Chip active={settings.weekStartsOn === 0} onClick={() => update({ weekStartsOn: 0 })}>
              Sunday
            </Chip>
          </div>
        </div>
        <div>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
            Default reminder
          </p>
          <div className="flex flex-wrap gap-2">
            {[0, 5, 15, 30, 60].map((m) => (
              <Chip
                key={m}
                active={settings.defaultReminder === m}
                onClick={() => update({ defaultReminder: m })}
              >
                {m === 0 ? "At time" : `${m} min`}
              </Chip>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-[var(--elev-border)]">
          <div>
            <div className="text-sm font-medium">Notifications</div>
            <div className="text-xs text-muted">Browser reminders while Alpha is open</div>
          </div>
          <Button
            size="sm"
            variant={settings.notificationsEnabled ? "primary" : "secondary"}
            onClick={() => {
              if (settings.notificationsEnabled) update({ notificationsEnabled: false });
              else void enableNotes();
            }}
          >
            {settings.notificationsEnabled ? "On" : "Enable"}
          </Button>
        </div>
        <div className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-[var(--elev-border)]">
          <div>
            <div className="text-sm font-medium">Assistant</div>
            <div className="text-xs text-muted">Natural-language planning</div>
          </div>
          <Button
            size="sm"
            variant={settings.aiEnabled ? "primary" : "secondary"}
            onClick={() => update({ aiEnabled: !settings.aiEnabled })}
          >
            {settings.aiEnabled ? "On" : "Off"}
          </Button>
        </div>
        <div className="rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]">
          <h3 className="font-display text-lg font-semibold">Sample tasks</h3>
          <p className="mt-1 text-sm text-muted">
            Demo items are marked “Sample”. Remove them once you're settled.
          </p>
          <div className="mt-3 flex gap-2">
            <Button size="sm" variant="secondary" onClick={removeDemo}>
              Remove samples
            </Button>
            <Button size="sm" variant="ghost" onClick={resetDemo}>
              Restore samples
            </Button>
          </div>
        </div>
        <div className="rounded-[24px] bg-surface p-4 text-sm leading-relaxed text-muted shadow-[var(--elev-border)]">
          <h3 className="font-display text-lg font-semibold text-fg">Privacy</h3>
          <p className="mt-2">
            Alpha keeps your plan on this device. Financial entries are reminders only — never
            store card PINs, passwords, or banking credentials.
          </p>
          <p className="mt-3 text-xs">Alpha Scheduler · Plan better. Remember everything.</p>
        </div>
      </div>
    </AppShell>
  );
}
