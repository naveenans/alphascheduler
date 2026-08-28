import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as addDays, d as format, g as isSameDay, o as isToday, p as startOfMonth } from "../_libs/date-fns.mjs";
import { b as ChevronLeft, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { $ as weekDays, E as Chip, F as cn, K as monthGrid, Q as useAppStore, Y as toISODate, s as AppShell } from "./router-BESfIgdw.mjs";
import { t as TaskItem } from "./task-item-BBfQEVsJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calendar-DR7kykqU.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CalendarPage() {
	const weekStartsOn = useAppStore((s) => s.settings.weekStartsOn);
	const tasks = useAppStore((s) => s.tasks);
	const move = useAppStore((s) => s.moveTaskDate);
	const [anchor, setAnchor] = (0, import_react.useState)(() => startOfMonth(/* @__PURE__ */ new Date()));
	const [selected, setSelected] = (0, import_react.useState)(() => /* @__PURE__ */ new Date());
	const [mode, setMode] = (0, import_react.useState)("month");
	const [dragging, setDragging] = (0, import_react.useState)(null);
	const navigate = useNavigate();
	const days = (0, import_react.useMemo)(() => mode === "week" ? weekDays(selected, weekStartsOn) : monthGrid(anchor, weekStartsOn), [
		anchor,
		selected,
		mode,
		weekStartsOn
	]);
	const selectedIso = toISODate(selected);
	const dayTasks = tasks.filter((t) => t.date === selectedIso);
	const labels = [
		"S",
		"M",
		"T",
		"W",
		"T",
		"F",
		"S"
	];
	const ordered = weekStartsOn === 1 ? [...labels.slice(1), labels[0]] : labels;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Calendar",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2 pb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: mode === "month",
						onClick: () => setMode("month"),
						children: "Month"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: mode === "week",
						onClick: () => setMode("week"),
						children: "Week"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: mode === "day",
						onClick: () => setMode("day"),
						children: "Day"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center",
						onClick: () => {
							if (mode === "month") setAnchor(addDays(anchor, -30));
							else setSelected(addDays(selected, mode === "week" ? -7 : -1));
						},
						"aria-label": "Previous",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-lg font-semibold",
						children: format(mode === "month" ? anchor : selected, "MMMM yyyy")
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "grid size-11 place-items-center",
						onClick: () => {
							if (mode === "month") setAnchor(addDays(anchor, 32));
							else setSelected(addDays(selected, mode === "week" ? 7 : 1));
						},
						"aria-label": "Next",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
					})
				]
			}),
			mode !== "day" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-subtle",
				children: ordered.map((d, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-2",
					children: d
				}, `${d}-${i}`))
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid grid-cols-7 gap-1",
				children: days.map((d) => {
					const iso = toISODate(d);
					const dots = tasks.filter((t) => t.date === iso);
					const on = isSameDay(d, selected);
					const muted = mode === "month" && d.getMonth() !== anchor.getMonth();
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelected(d),
						onDragOver: (e) => e.preventDefault(),
						onDrop: (e) => {
							e.preventDefault();
							const id = e.dataTransfer.getData("text/task-id") || dragging;
							if (id) move(id, iso);
							setDragging(null);
						},
						className: cn("flex h-12 flex-col items-center justify-center rounded-xl text-sm tabular-nums", on && "bg-accent text-accent-fg", !on && isToday(d) && "bg-elevated", muted && "opacity-35"),
						children: [d.getDate(), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-0.5 flex gap-0.5",
							children: [
								"personal",
								"professional",
								"financial"
							].map((c) => dots.some((t) => t.category === c) ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
								className: "block size-1 rounded-full",
								style: { background: on ? "var(--accent-fg)" : c === "personal" ? "var(--personal)" : c === "professional" ? "var(--professional)" : "var(--financial)" }
							}, c) : null)
						})]
					}, iso);
				})
			})] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 space-y-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-2 flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-[17px] font-semibold",
							children: format(selected, "EEEE d")
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-sm text-muted",
							onClick: () => navigate({
								to: "/create",
								search: { date: selectedIso }
							}),
							children: "Add"
						})]
					}),
					dayTasks.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-2xl bg-surface px-4 py-8 text-center text-sm text-muted shadow-[var(--elev-border)]",
						children: "Nothing planned. A quiet day is still a good day."
					}) : dayTasks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						draggable: true,
						onDragStart: (e) => {
							e.dataTransfer.setData("text/task-id", t.id);
							setDragging(t.id);
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TaskItem, { task: t })
					}, t.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pt-2 text-center text-[11px] text-subtle",
						children: "Drag a task onto another date to reschedule."
					})
				]
			})
		]
	});
}
//#endregion
export { CalendarPage as component };
