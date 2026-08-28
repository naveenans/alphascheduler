import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/app-shell";
import { Button } from "@/components/ui";
import { downloadBackup, readBackupFile } from "@/lib/backup";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/backup")({ component: BackupPage });

function BackupPage() {
  const fileRef = useRef<HTMLInputElement>(null);
  const importAll = useAppStore((s) => s.importAll);
  const [msg, setMsg] = useState("");

  return (
    <AppShell title="Backup">
      <p className="text-sm leading-relaxed text-muted">
        Your data lives on this device. Export a JSON file to keep a copy, or import one to restore.
      </p>
      <div className="mt-6 space-y-3">
        <Button className="w-full" onClick={downloadBackup}>
          Export data
        </Button>
        <Button variant="secondary" className="w-full" onClick={() => fileRef.current?.click()}>
          Import data
        </Button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            e.target.value = "";
            if (!file) return;
            try {
              const data = await readBackupFile(file);
              importAll(data);
              setMsg("Restored. Your plan is back.");
            } catch {
              setMsg("That file couldn't be read. Try an Alpha Scheduler export.");
            }
          }}
        />
      </div>
      {msg ? <p className="mt-4 text-sm text-muted">{msg}</p> : null}
    </AppShell>
  );
}
