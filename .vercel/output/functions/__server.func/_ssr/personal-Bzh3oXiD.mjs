import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as isOverdue, J as sortByWhen, M as SectionTitle, Q as useAppStore, W as isDueToday, d as habitStreak, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/personal-Bzh3oXiD.js
var import_jsx_runtime = require_jsx_runtime();
function PersonalPage() {
	const allTasks = useAppStore((s) => s.tasks);
	const allGoals = useAppStore((s) => s.goals);
	const tasks = allTasks.filter((t) => t.category === "personal");
	const habits = useAppStore((s) => s.habits);
	const goals = allGoals.filter((g) => g.category === "personal");
	const today = sortByWhen(tasks.filter((t) => isDueToday(t.date) && t.status !== "completed"));
	const attention = tasks.filter((t) => isOverdue(t.date, t.time, t.status));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "My life",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-5 text-sm text-muted",
				children: "Family, health, home, and the rituals that keep you well."
			}),
			attention.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 rounded-2xl bg-warn/10 px-4 py-3 text-sm text-warn",
				children: [
					attention.length,
					" personal ",
					attention.length === 1 ? "item is" : "items are",
					" waiting."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Today" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: today.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-surface px-4 py-6 text-sm text-muted shadow-[var(--elev-border)]",
					children: "Nothing personal on the clock. That's allowed."
				}) : today.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, {
					task: t,
					showCategory: false
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/habits",
						className: "text-sm text-muted",
						children: "All"
					}),
					children: "Habits"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-2 gap-2",
					children: habits.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl bg-surface p-3 shadow-[var(--elev-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-sm font-medium",
							children: h.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 text-xs text-muted tabular-nums",
							children: [habitStreak(h), " day streak"]
						})]
					}, h.id))
				})]
			}),
			goals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
					action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/goals",
						className: "text-sm text-muted",
						children: "All"
					}),
					children: "Personal goals"
				}), goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mb-2 rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]",
					children: g.title
				}, g.id))]
			}) : null
		]
	});
}
//#endregion
export { PersonalPage as component };
