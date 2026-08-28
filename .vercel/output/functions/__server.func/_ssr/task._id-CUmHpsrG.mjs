import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as formatRelativeDue, E as Chip, Q as useAppStore, T as Button, _ as CATEGORY_META, m as taskProgress, n as Route, q as repeatLabel, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskForm } from "./task-form-CXlmHSKx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/task._id-CUmHpsrG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TaskDetail() {
	const { id } = Route.useParams();
	const task = useAppStore((s) => s.tasks.find((t) => t.id === id));
	const toggle = useAppStore((s) => s.toggleTask);
	const toggleSub = useAppStore((s) => s.toggleSubtask);
	const remove = useAppStore((s) => s.deleteTask);
	const update = useAppStore((s) => s.updateTask);
	const snooze = useAppStore((s) => s.snoozeTask);
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(false);
	if (!task) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Task",
		hideFab: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "This task is no longer here."
		})
	});
	if (editing) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Edit",
		hideFab: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskForm, {
			initial: task,
			submitLabel: "Update",
			onSubmit: (draft) => {
				update(task.id, draft);
				setEditing(false);
			}
		})
	});
	const pct = taskProgress(task);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Task",
		hideFab: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "stagger-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-[11px] font-semibold uppercase tracking-[0.16em] text-muted",
					children: [CATEGORY_META[task.category].label, task.subcategory ? ` · ${task.subcategory}` : ""]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-2 font-display text-[28px] font-semibold leading-tight tracking-tight",
					children: task.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: formatRelativeDue(task.date, task.time)
				}),
				task.amount != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 font-display text-2xl tabular-nums text-financial",
					children: ["₹", task.amount.toLocaleString("en-IN")]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: false,
							children: task.priority
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: repeatLabel(task.repeat) }),
						task.isDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, { children: "Sample" }) : null
					]
				}),
				task.description ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-[15px] leading-relaxed",
					children: task.description
				}) : null,
				task.notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 rounded-2xl bg-elevated p-3 text-sm text-muted shadow-[var(--elev-border)]",
					children: task.notes
				}) : null,
				task.subtasks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex justify-between text-sm text-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Steps" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "tabular-nums",
							children: [pct, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: task.subtasks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => toggleSub(task.id, s.id),
							className: "flex w-full items-center gap-3 rounded-2xl bg-surface px-3 py-3 text-left text-sm shadow-[var(--elev-border)]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-5 place-items-center rounded-full",
								style: {
									background: s.completed ? "var(--ok)" : "var(--elevated)",
									color: "var(--bg)"
								},
								children: s.completed ? "✓" : ""
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: s.completed ? "text-muted line-through" : "",
								children: s.title
							})]
						}, s.id))
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							onClick: () => toggle(task.id),
							children: task.status === "completed" ? "Reopen" : "Mark done"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => snooze(task.id, 15),
							children: "Snooze 15m"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "secondary",
							onClick: () => setEditing(true),
							children: "Edit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "danger",
							onClick: () => {
								remove(task.id);
								navigate({ to: "/tasks" });
							},
							children: "Delete"
						})
					]
				})
			]
		})
	});
}
//#endregion
export { TaskDetail as component };
