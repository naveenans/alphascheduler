import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Empty, E as Chip, I as daysUntil, L as emptyDraft, N as Sheet, O as Field, Q as useAppStore, T as Button, k as Input, s as AppShell, u as goalProgress, w as Bar } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/goals-C37IxgxQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function GoalsPage() {
	const goals = useAppStore((s) => s.goals);
	const tasks = useAppStore((s) => s.tasks);
	const addGoal = useAppStore((s) => s.addGoal);
	const bump = useAppStore((s) => s.bumpGoal);
	const toggleM = useAppStore((s) => s.toggleMilestone);
	const remove = useAppStore((s) => s.deleteGoal);
	const addTask = useAppStore((s) => s.addTask);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("personal");
	const [target, setTarget] = (0, import_react.useState)("100");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Goals",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-sm font-medium",
			onClick: () => setOpen(true),
			children: "New"
		}),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/habits",
				className: "mb-4 flex justify-between rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Habits & streaks" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted",
					children: "Open"
				})]
			}),
			goals.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: "No goals yet",
				body: "Name one thing worth finishing. Tasks can live underneath it."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoalCard, {
					goal: g,
					pct: goalProgress(g, tasks),
					onBump: (d) => bump(g.id, d),
					onToggle: (mid) => toggleM(g.id, mid),
					onRemove: () => remove(g.id),
					onAddTask: () => addTask(emptyDraft({
						title: `Work on ${g.title}`,
						category: g.category,
						goalId: g.id
					}))
				}, g.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				open,
				onClose: () => setOpen(false),
				title: "New goal",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Title",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							placeholder: "Save ₹1,00,000"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2",
						children: [
							"personal",
							"professional",
							"financial"
						].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: c,
							active: category === c,
							onClick: () => setCategory(c),
							children: c
						}, c))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Target",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: target,
								onChange: (e) => setTarget(e.target.value)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						className: "mt-5 w-full",
						onClick: () => {
							if (!title.trim()) return;
							addGoal({
								title: title.trim(),
								description: "",
								category,
								targetDate: null,
								targetValue: Number(target) || 1,
								currentValue: 0,
								unit: category === "financial" ? "₹" : "units",
								taskIds: [],
								milestones: []
							});
							setTitle("");
							setOpen(false);
						},
						children: "Save goal"
					})
				]
			})
		]
	});
}
function GoalCard({ goal, pct, onBump, onToggle, onRemove, onAddTask }) {
	const remain = daysUntil(goal.targetDate);
	const color = goal.category === "personal" ? "var(--personal)" : goal.category === "professional" ? "var(--professional)" : "var(--financial)";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
					children: goal.category
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-1 font-display text-lg font-semibold tracking-tight",
					children: goal.title
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-display text-lg tabular-nums",
					children: [pct, "%"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
					value: pct,
					color
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-2 text-sm text-muted tabular-nums",
				children: [
					goal.currentValue.toLocaleString("en-IN"),
					" / ",
					goal.targetValue.toLocaleString("en-IN"),
					" ",
					goal.unit,
					remain != null ? ` · ${remain} days left` : ""
				]
			}),
			goal.milestones.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 space-y-1.5",
				children: goal.milestones.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onToggle(m.id),
					className: "flex w-full items-center gap-2 text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "size-2 rounded-full",
						style: { background: m.done ? color : "var(--line)" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: m.done ? "text-muted line-through" : "",
						children: m.title
					})]
				}, m.id))
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "soft",
						onClick: () => onBump(goal.category === "financial" ? 1e3 : 1),
						children: "+ Progress"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onAddTask,
						children: "Add task"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "ghost",
						onClick: onRemove,
						children: "Remove"
					})
				]
			})
		]
	});
}
//#endregion
export { GoalsPage as component };
