import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as formatTime, J as sortByWhen, Q as useAppStore, W as isDueToday, h as todayStats, p as productivityScore, s as AppShell, z as formatInr } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/widgets-CGhYfaI1.js
var import_jsx_runtime = require_jsx_runtime();
function WidgetsPage() {
	const tasks = useAppStore((s) => s.tasks);
	const habits = useAppStore((s) => s.habits);
	const today = sortByWhen(tasks.filter((t) => isDueToday(t.date) && t.status !== "completed")).slice(0, 5);
	const next = sortByWhen(tasks.filter((t) => t.status !== "completed" && t.date)).at(0);
	const stats = todayStats(tasks);
	const score = productivityScore(tasks, habits);
	const money = sortByWhen(tasks.filter((t) => t.category === "financial" && t.status !== "completed")).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Widgets",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 text-sm text-muted",
			children: "Live tiles you can pin mentally — or screenshot onto a home screen. Light and dark follow your theme."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					title: "Today's tasks",
					children: today.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Clear calendar."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5 text-sm",
						children: today.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted tabular-nums",
								children: formatTime(t.time) ?? "—"
							})]
						}, t.id))
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/create",
					className: "block rounded-[24px] bg-accent px-4 py-5 text-accent-fg",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase tracking-[0.16em] opacity-70",
						children: "Quick add"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-xl font-semibold",
						children: "Capture a task"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					title: "Next reminder",
					children: next ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-semibold",
						children: next.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted",
						children: [
							next.date,
							" ",
							formatTime(next.time) ?? ""
						]
					})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "Nothing waiting."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tile, {
					title: "Productivity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "font-display text-4xl font-semibold tabular-nums",
						children: [stats.pct, "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							"Score ",
							score,
							"/100"
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tile, {
					title: "Financial",
					children: money.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No upcoming payments."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "space-y-1.5 text-sm",
						children: money.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: t.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "tabular-nums text-financial",
								children: t.amount != null ? formatInr(t.amount) : "—"
							})]
						}, t.id))
					})
				})
			]
		})]
	});
}
function Tile({ title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
			children: title
		}), children]
	});
}
//#endregion
export { WidgetsPage as component };
