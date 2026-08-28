import { S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as format } from "../_libs/date-fns.mjs";
import { Q as useAppStore, f as mostProductiveDay, g as weeklyCompletion, l as distribution, p as productivityScore, s as AppShell } from "./router-BESfIgdw.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/analytics-BoaRY28G.js
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const tasks = useAppStore((s) => s.tasks);
	const habits = useAppStore((s) => s.habits);
	const week = weeklyCompletion(tasks);
	const dist = distribution(tasks);
	const score = productivityScore(tasks, habits);
	const best = mostProductiveDay(tasks);
	const total = dist.personal + dist.professional + dist.financial || 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Analytics",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-display text-4xl font-semibold tabular-nums",
						children: score
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted",
						children: "of 100 — keep the pace you already have."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 mt-7 font-display text-[17px] font-semibold",
				children: "This week"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "h-44 rounded-[24px] bg-surface p-3 shadow-[var(--elev-border)]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
					width: "100%",
					height: "100%",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
						data: week,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
								stroke: "color-mix(in oklab, var(--fg) 8%, transparent)",
								vertical: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
								dataKey: "label",
								tick: {
									fill: "var(--muted)",
									fontSize: 11
								},
								axisLine: false,
								tickLine: false
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, { hide: true }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
								background: "var(--elevated)",
								border: "none",
								borderRadius: 12,
								color: "var(--fg)"
							} }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
								dataKey: "pct",
								fill: "var(--fg)",
								radius: [
									6,
									6,
									6,
									6
								]
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-3 mt-7 font-display text-[17px] font-semibold",
				children: "Distribution"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-3 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Personal",
						color: "var(--personal)",
						n: dist.personal,
						total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Professional",
						color: "var(--professional)",
						n: dist.professional,
						total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
						label: "Financial",
						color: "var(--financial)",
						n: dist.financial,
						total
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-5 text-sm text-muted",
				children: [
					"Most productive day:",
					" ",
					best.count === 0 ? "still forming" : `${format(new Date(best.day), "EEEE d MMM")} · ${best.count} done`
				]
			})
		]
	});
}
function Row({ label, color, n, total }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-1 flex justify-between text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "tabular-nums text-muted",
			children: n
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-fg/8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full",
			style: {
				width: `${n / total * 100}%`,
				background: color
			}
		})
	})] });
}
//#endregion
export { AnalyticsPage as component };
