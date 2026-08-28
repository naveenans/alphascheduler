import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as isOverdue, J as sortByWhen, M as SectionTitle, Q as useAppStore, V as formatShortDate, W as isDueToday, s as AppShell, z as formatInr } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/financial-CGc9rFPY.js
var import_jsx_runtime = require_jsx_runtime();
function MoneyPage() {
	const tasks = useAppStore((s) => s.tasks).filter((t) => t.category === "financial");
	const upcoming = sortByWhen(tasks.filter((t) => t.status !== "completed"));
	const dueToday = upcoming.filter((t) => isDueToday(t.date));
	const overdue = upcoming.filter((t) => isOverdue(t.date, t.time, t.status));
	const done = tasks.filter((t) => t.status === "completed");
	const total = upcoming.reduce((s, t) => s + (t.amount ?? 0), 0);
	const groups = /* @__PURE__ */ new Map();
	for (const t of upcoming) {
		const key = t.subcategory || "Other";
		groups.set(key, (groups.get(key) ?? 0) + (t.amount ?? 0));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Financial planner",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-4 text-sm text-muted",
				children: "Reminders for bills and commitments — not a bank, and never investment advice."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
						children: "Upcoming"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-3xl font-semibold tabular-nums text-financial",
						children: formatInr(total)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-sm text-muted",
						children: [upcoming.length, " open reminders"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Due today",
						value: dueToday.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Waiting",
						value: overdue.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Paid",
						value: done.length
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "By type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: [...groups.entries()].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex justify-between rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: k }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "tabular-nums text-financial",
							children: formatInr(v)
						})]
					}, k))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Schedule" }), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "No payments on the horizon."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: upcoming.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-1 text-[11px] text-muted",
						children: formatShortDate(t.date)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, {
						task: t,
						showCategory: false
					})] }, t.id))
				})]
			})
		]
	});
}
function Stat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-surface px-3 py-3 shadow-[var(--elev-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-display text-xl font-semibold tabular-nums",
			children: value
		})]
	});
}
//#endregion
export { MoneyPage as component };
