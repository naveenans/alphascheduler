import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Chip, O as Field, Q as useAppStore, T as Button, k as Input, s as AppShell } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-Cp0IiYqW.js
var import_jsx_runtime = require_jsx_runtime();
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Settings",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "space-y-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Profile name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: settings.name,
						onChange: (e) => update({ name: e.target.value }),
						placeholder: "Your name"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
					children: "Theme"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						"system",
						"light",
						"dark"
					].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: settings.theme === t,
						onClick: () => update({ theme: t }),
						children: t[0].toUpperCase() + t.slice(1)
					}, t))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
					children: "Week starts on"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: settings.weekStartsOn === 1,
						onClick: () => update({ weekStartsOn: 1 }),
						children: "Monday"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: settings.weekStartsOn === 0,
						onClick: () => update({ weekStartsOn: 0 }),
						children: "Sunday"
					})]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
					children: "Default reminder"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: [
						0,
						5,
						15,
						30,
						60
					].map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: settings.defaultReminder === m,
						onClick: () => update({ defaultReminder: m }),
						children: m === 0 ? "At time" : `${m} min`
					}, m))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-[var(--elev-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: "Notifications"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: "Browser reminders while Alpha is open"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: settings.notificationsEnabled ? "primary" : "secondary",
						onClick: () => {
							if (settings.notificationsEnabled) update({ notificationsEnabled: false });
							else enableNotes();
						},
						children: settings.notificationsEnabled ? "On" : "Enable"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between rounded-2xl bg-surface px-4 py-3 shadow-[var(--elev-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-sm font-medium",
						children: "Assistant"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-xs text-muted",
						children: "Natural-language planning"
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: settings.aiEnabled ? "primary" : "secondary",
						onClick: () => update({ aiEnabled: !settings.aiEnabled }),
						children: settings.aiEnabled ? "On" : "Off"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: "Sample tasks"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Demo items are marked “Sample”. Remove them once you're settled."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "secondary",
								onClick: removeDemo,
								children: "Remove samples"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: resetDemo,
								children: "Restore samples"
							})]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-surface p-4 text-sm leading-relaxed text-muted shadow-[var(--elev-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold text-fg",
							children: "Privacy"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: "Alpha keeps your plan on this device. Financial entries are reminders only — never store card PINs, passwords, or banking credentials."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-xs",
							children: "Alpha Scheduler · Plan better. Remember everything."
						})
					]
				})
			]
		})
	});
}
//#endregion
export { SettingsPage as component };
