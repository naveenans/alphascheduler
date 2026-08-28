import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { G as isOverdue, J as sortByWhen, M as SectionTitle, N as Sheet, O as Field, Q as useAppStore, T as Button, W as isDueToday, k as Input, s as AppShell, w as Bar } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/professional-CfWCqtuu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WorkPage() {
	const tasks = useAppStore((s) => s.tasks).filter((t) => t.category === "professional");
	const projects = useAppStore((s) => s.projects);
	const addProject = useAppStore((s) => s.addProject);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [name, setName] = (0, import_react.useState)("");
	const today = sortByWhen(tasks.filter((t) => isDueToday(t.date)));
	const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status));
	const meetings = today.filter((t) => t.subcategory === "Meetings" || t.kind === "schedule");
	const follow = tasks.filter((t) => t.subcategory === "Follow-ups" && t.status !== "completed");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Work planner",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-sm font-medium",
			onClick: () => setOpen(true),
			children: "Project"
		}),
		children: [
			overdue.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mb-4 rounded-2xl bg-warn/10 px-4 py-3 text-sm text-warn",
				children: [
					overdue.length,
					" work ",
					overdue.length === 1 ? "item needs" : "items need",
					" a new time."
				]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Today" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: today.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-2xl bg-surface px-4 py-6 text-sm text-muted shadow-[var(--elev-border)]",
					children: "No work on the board today."
				}) : today.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, {
					task: t,
					showCategory: false
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Projects" }), projects.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Create a project to group client work."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: projects.map((p) => {
						const pts = tasks.filter((t) => t.projectId === p.id);
						const done = pts.filter((t) => t.status === "completed").length;
						const pct = pts.length ? Math.round(done / pts.length * 100) : 0;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-display text-lg font-semibold",
										children: p.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-sm text-muted",
										children: [pct, "%"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: p.description
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mt-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
										value: pct,
										color: "var(--professional)"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-subtle tabular-nums",
									children: [
										done,
										"/",
										pts.length,
										" tasks completed"
									]
								})
							]
						}, p.id);
					})
				})]
			}),
			meetings.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Meetings" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: meetings.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, {
						task: t,
						showCategory: false
					}, t.id))
				})]
			}) : null,
			follow.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-7",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionTitle, { children: "Follow-ups" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-2",
					children: follow.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, {
						task: t,
						showCategory: false
					}, t.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
				open,
				onClose: () => setOpen(false),
				title: "New project",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Name",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: name,
						onChange: (e) => setName(e.target.value),
						placeholder: "Website project"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					onClick: () => {
						if (!name.trim()) return;
						addProject(name.trim());
						setName("");
						setOpen(false);
					},
					children: "Save project"
				})]
			})
		]
	});
}
//#endregion
export { WorkPage as component };
