import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Chip, Q as useAppStore, k as Input, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/search-CbzG6Aje.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPage() {
	const [q, setQ] = (0, import_react.useState)("");
	const [cat, setCat] = (0, import_react.useState)("all");
	const tasks = useAppStore((s) => s.tasks);
	const goals = useAppStore((s) => s.goals);
	const projects = useAppStore((s) => s.projects);
	const needle = q.trim().toLowerCase();
	const hits = (0, import_react.useMemo)(() => {
		if (!needle) return {
			tasks: [],
			goals: [],
			projects: []
		};
		const match = (s) => s.toLowerCase().includes(needle);
		return {
			tasks: tasks.filter((t) => (cat === "all" || t.category === cat) && (match(t.title) || match(t.description) || match(t.notes) || match(t.subcategory))),
			goals: goals.filter((g) => match(g.title) || match(g.description)),
			projects: projects.filter((p) => match(p.name) || match(p.description))
		};
	}, [
		needle,
		tasks,
		goals,
		projects,
		cat
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Search",
		hideFab: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus: true,
				value: q,
				onChange: (e) => setQ(e.target.value),
				placeholder: "Tasks, goals, notes, projects"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex gap-2 overflow-x-auto no-scrollbar pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: cat === "all",
						onClick: () => setCat("all"),
						children: "All"
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
			!needle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-center text-sm text-muted",
				children: "Search across your whole plan."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "space-y-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
						children: ["Tasks · ", hits.tasks.length]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: hits.tasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, { task: t }, t.id))
					})] }),
					hits.goals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
						children: "Goals"
					}), hits.goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/goals",
						className: "mb-2 block rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]",
						children: g.title
					}, g.id))] }) : null,
					hits.projects.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
						children: "Projects"
					}), hits.projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/professional",
						className: "mb-2 block rounded-2xl bg-surface px-4 py-3 text-sm shadow-[var(--elev-border)]",
						children: p.name
					}, p.id))] }) : null
				]
			})
		]
	});
}
//#endregion
export { SearchPage as component };
