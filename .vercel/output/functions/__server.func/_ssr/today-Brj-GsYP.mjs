import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as cn, H as formatTime, J as sortByWhen, Q as useAppStore, W as isDueToday, h as todayStats, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/today-Brj-GsYP.js
var import_jsx_runtime = require_jsx_runtime();
function TodayPage() {
	const tasks = useAppStore((s) => s.tasks);
	const list = sortByWhen(tasks.filter((t) => isDueToday(t.date)));
	const stats = todayStats(tasks);
	const timed = list.filter((t) => t.time);
	const untimed = list.filter((t) => !t.time);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Today",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-5 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
						children: "Timeline"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-1 font-display text-2xl font-semibold tabular-nums",
						children: [
							stats.completed,
							"/",
							stats.total,
							" done"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 h-1.5 overflow-hidden rounded-full bg-fg/8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "h-full rounded-full bg-accent",
							style: { width: `${stats.pct}%` }
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "relative space-y-3 border-l border-line pl-5",
				children: timed.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -left-[27px] top-5 size-2.5 rounded-full", t.status === "completed" ? "bg-ok" : "bg-accent") }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted tabular-nums",
							children: formatTime(t.time)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, { task: t })
					]
				}, t.id))
			}),
			untimed.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 space-y-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
					children: "Anytime"
				}), untimed.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, { task: t }, t.id))]
			}) : null,
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-sm text-muted",
				children: "Your schedule is clear."
			}) : null
		]
	});
}
//#endregion
export { TodayPage as component };
