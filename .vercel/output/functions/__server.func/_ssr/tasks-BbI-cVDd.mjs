import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Empty, E as Chip, G as isOverdue, J as sortByWhen, Q as useAppStore, W as isDueToday, X as todayISO, r as Route$3, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/tasks-BbI-cVDd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function TasksPage() {
	const search = Route$3.useSearch();
	const tasks = useAppStore((s) => s.tasks);
	const [status, setStatus] = (0, import_react.useState)(search.filter ?? "today");
	const [cat, setCat] = (0, import_react.useState)(search.category ?? "all");
	const [prio, setPrio] = (0, import_react.useState)("all");
	const list = (0, import_react.useMemo)(() => {
		let next = [...tasks];
		if (cat !== "all") next = next.filter((t) => t.category === cat);
		if (prio !== "all") next = next.filter((t) => t.priority === prio);
		if (status === "today") next = next.filter((t) => isDueToday(t.date));
		if (status === "upcoming") next = next.filter((t) => t.status !== "completed" && t.date && t.date > todayISO());
		if (status === "completed") next = next.filter((t) => t.status === "completed");
		if (status === "overdue") next = next.filter((t) => isOverdue(t.date, t.time, t.status));
		return sortByWhen(next);
	}, [
		tasks,
		cat,
		prio,
		status
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Tasks",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto no-scrollbar pb-2",
				children: [
					"all",
					"today",
					"upcoming",
					"overdue",
					"completed"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: status === f,
					onClick: () => setStatus(f),
					children: f[0].toUpperCase() + f.slice(1)
				}, f))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 flex gap-2 overflow-x-auto no-scrollbar pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: cat === "all",
						onClick: () => setCat("all"),
						children: "All lives"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "personal",
						active: cat === "personal",
						onClick: () => setCat("personal"),
						children: "Personal"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "professional",
						active: cat === "professional",
						onClick: () => setCat("professional"),
						children: "Work"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: "financial",
						active: cat === "financial",
						onClick: () => setCat("financial"),
						children: "Money"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4 flex gap-2 overflow-x-auto no-scrollbar",
				children: [
					"all",
					"critical",
					"high",
					"medium",
					"low"
				].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
					active: prio === p,
					onClick: () => setPrio(p),
					children: p === "all" ? "Any priority" : p[0].toUpperCase() + p.slice(1)
				}, p))
			}),
			list.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
				title: status === "today" ? "No tasks today" : "Nothing here",
				body: "Your schedule is clear. Enjoy the extra time, or plan something important."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-2",
				children: list.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, { task: t }, t.id))
			})
		]
	});
}
//#endregion
export { TasksPage as component };
