import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as Clock, x as Check } from "../_libs/lucide-react.mjs";
import { A as PriorityMark, F as cn, G as isOverdue, H as formatTime, Q as useAppStore, _ as CATEGORY_META, m as taskProgress } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/task-item-BBfQEVsJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TaskItem({ task, showCategory = true }) {
	const toggle = useAppStore((s) => s.toggleTask);
	const remove = useAppStore((s) => s.deleteTask);
	const navigate = useNavigate();
	const overdue = isOverdue(task.date, task.time, task.status);
	const done = task.status === "completed";
	const pct = taskProgress(task);
	const [dx, setDx] = (0, import_react.useState)(0);
	const startX = (0, import_react.useRef)(null);
	const tone = task.category === "personal" ? "text-personal" : task.category === "professional" ? "text-professional" : "text-financial";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden rounded-2xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 left-0 flex w-24 items-center justify-center bg-ok/20 text-ok",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-y-0 right-0 flex w-24 items-center justify-center bg-danger/15 text-danger",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs font-semibold",
					children: "Remove"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onPointerDown: (e) => {
					startX.current = e.clientX;
				},
				onPointerMove: (e) => {
					if (startX.current == null) return;
					setDx(Math.max(-96, Math.min(96, e.clientX - startX.current)));
				},
				onPointerUp: () => {
					if (dx > 72) toggle(task.id);
					else if (dx < -72) remove(task.id);
					setDx(0);
					startX.current = null;
				},
				onPointerCancel: () => {
					setDx(0);
					startX.current = null;
				},
				onClick: () => {
					if (Math.abs(dx) > 8) return;
					navigate({
						to: "/task/$id",
						params: { id: task.id }
					});
				},
				className: cn("relative flex w-full items-start gap-3 bg-surface px-3.5 py-3.5 text-left shadow-[var(--elev-border)]", "transition-[transform] duration-150 ease-out"),
				style: { transform: `translateX(${dx}px)` },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					role: "checkbox",
					"aria-checked": done,
					onClick: (e) => {
						e.stopPropagation();
						toggle(task.id);
					},
					className: cn("mt-0.5 grid size-6 shrink-0 place-items-center rounded-full", "transition-[background-color,scale] duration-200 ease-out", done ? "bg-ok text-bg" : "bg-elevated shadow-[var(--elev-border)]"),
					children: done ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
						className: "size-3.5",
						strokeWidth: 2.6
					}) : null
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 flex-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("font-medium leading-snug text-fg", done && "text-muted line-through"),
								children: task.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityMark, { priority: task.priority })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-1 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12px] text-muted",
							children: [
								task.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "inline-flex items-center gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-3" }), formatTime(task.time)]
								}) : null,
								showCategory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("font-medium", tone),
									children: CATEGORY_META[task.category].label
								}) : null,
								task.amount != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular-nums text-financial",
									children: ["₹", task.amount.toLocaleString("en-IN")]
								}) : null,
								overdue ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-warn",
									children: "Needs attention"
								}) : null,
								task.isDemo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-subtle",
									children: "Sample"
								}) : null
							]
						}),
						task.subtasks.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-1 overflow-hidden rounded-full bg-fg/8",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-accent",
									style: { width: `${pct}%` }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-subtle tabular-nums",
								children: [
									task.subtasks.filter((s) => s.completed).length,
									"/",
									task.subtasks.length,
									" steps"
								]
							})]
						}) : null
					]
				})]
			})
		]
	});
}
//#endregion
export { TaskItem as t };
