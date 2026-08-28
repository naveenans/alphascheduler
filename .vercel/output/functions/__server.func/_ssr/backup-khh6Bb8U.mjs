import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { Q as useAppStore, T as Button, s as AppShell } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/backup-khh6Bb8U.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function exportPayload() {
	const s = useAppStore.getState();
	return {
		app: "alpha-scheduler",
		version: 1,
		exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
		onboarded: s.onboarded,
		settings: s.settings,
		tasks: s.tasks,
		projects: s.projects,
		goals: s.goals,
		habits: s.habits,
		notices: s.notices
	};
}
function downloadBackup() {
	const blob = new Blob([JSON.stringify(exportPayload(), null, 2)], { type: "application/json" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `alpha-scheduler-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`;
	a.click();
	URL.revokeObjectURL(url);
}
async function readBackupFile(file) {
	const text = await file.text();
	const data = JSON.parse(text);
	if (data.app !== "alpha-scheduler") throw new Error("This file doesn't look like an Alpha Scheduler backup.");
	return data;
}
function BackupPage() {
	const fileRef = (0, import_react.useRef)(null);
	const importAll = useAppStore((s) => s.importAll);
	const [msg, setMsg] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Backup",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Your data lives on this device. Export a JSON file to keep a copy, or import one to restore."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "w-full",
						onClick: downloadBackup,
						children: "Export data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "secondary",
						className: "w-full",
						onClick: () => fileRef.current?.click(),
						children: "Import data"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "application/json",
						className: "hidden",
						onChange: async (e) => {
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
						}
					})
				]
			}),
			msg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: msg
			}) : null
		]
	});
}
//#endregion
export { BackupPage as component };
