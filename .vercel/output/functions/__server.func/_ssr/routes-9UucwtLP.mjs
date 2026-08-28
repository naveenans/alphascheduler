import { S as require_jsx_runtime, v as Link, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { O as ArrowRight, T as Briefcase, _ as CloudSun, n as UserRound, t as Wallet } from "../_libs/lucide-react.mjs";
import { F as cn, G as isOverdue, J as sortByWhen, M as SectionTitle, Q as useAppStore, R as formatDayHeading, S as insightLine, U as greeting, W as isDueToday, c as categoryStats, h as todayStats, j as ProgressRing, p as productivityScore, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-9UucwtLP.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	if (!useAppStore((s) => s.onboarded)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/onboarding" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dashboard, {});
}
function Dashboard() {
	const tasks = useAppStore((s) => s.tasks);
	const habits = useAppStore((s) => s.habits);
	const name = useAppStore((s) => s.settings.name);
	const stats = todayStats(tasks);
	const score = productivityScore(tasks, habits);
	const personal = categoryStats(tasks, "personal");
	const professional = categoryStats(tasks, "professional");
	const financial = categoryStats(tasks, "financial");
	const todayList = sortByWhen(tasks.filter((t) => isDueToday(t.date))).slice(0, 6);
	const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status));
	const insight = insightLine({
		completed: stats.completed,
		total: stats.total,
		importantDone: stats.importantDone,
		importantTotal: stats.importantTotal
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: `${greeting()}${name ? `, ${name.split(" ")[0]}` : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: formatDayHeading(/* @__PURE__ */ new Date())
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-4 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
							value: score,
							size: 72,
							stroke: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-sm font-semibold tabular-nums",
								children: score
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
									children: "Your day"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-1 font-display text-xl font-semibold tracking-tight",
									children: [stats.pct, "% planned"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm leading-snug text-muted",
									children: insight
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudSun, {
							className: "size-5 text-subtle",
							"aria-hidden": true
						})
					]
				}),
				overdue.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/tasks",
					search: { filter: "overdue" },
					className: "mt-4 flex items-center justify-between rounded-2xl bg-warn/10 px-4 py-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-warn",
						children: [
							"Needs attention · ",
							overdue.length,
							" waiting for you"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 text-warn" })]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
							to: "/personal",
							label: "Personal",
							hint: "Life",
							pending: personal.pending,
							pct: personal.pct,
							color: "var(--personal)",
							icon: UserRound
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
							to: "/professional",
							label: "Professional",
							hint: "Work",
							pending: professional.pending,
							pct: professional.pct,
							color: "var(--professional)",
							icon: Briefcase
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryCard, {
							to: "/financial",
							label: "Financial",
							hint: "Money",
							pending: financial.pending,
							pct: financial.pct,
							color: "var(--financial)",
							icon: Wallet
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, {
						action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/today",
							className: "text-sm text-muted",
							children: "Timeline"
						}),
						children: "Today"
					}), todayList.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--elev-border)]",
						children: "Your schedule is clear. Enjoy the extra time, or plan something important."
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: todayList.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, { task: t }, t.id))
					})]
				})
			]
		})
	});
}
function CategoryCard({ to, label, hint, pending, pct, color, icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex items-center gap-4 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]", "transition-[scale] duration-150 ease-out active:scale-[0.98]"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid size-12 place-items-center rounded-2xl",
				style: {
					background: `color-mix(in oklab, ${color} 16%, transparent)`,
					color
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-[11px] font-medium uppercase tracking-[0.16em] text-muted",
						children: hint
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-semibold tracking-tight",
						children: label
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "text-sm text-muted tabular-nums",
						children: [pending, " pending"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressRing, {
				value: pct,
				size: 52,
				stroke: 4,
				color,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-[10px] font-semibold tabular-nums text-fg",
					children: [pct, "%"]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
