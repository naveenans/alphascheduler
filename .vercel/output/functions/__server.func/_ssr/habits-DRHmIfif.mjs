import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as addDays, d as format } from "../_libs/date-fns.mjs";
import { D as Empty, E as Chip, F as cn, N as Sheet, O as Field, Q as useAppStore, T as Button, X as todayISO, Y as toISODate, d as habitStreak, k as Input, s as AppShell } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/habits-DRHmIfif.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HabitsPage() {
	const habits = useAppStore((s) => s.habits);
	const toggle = useAppStore((s) => s.toggleHabitDay);
	const add = useAppStore((s) => s.addHabit);
	const remove = useAppStore((s) => s.deleteHabit);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [days, setDays] = (0, import_react.useState)([
		1,
		2,
		3,
		4,
		5
	]);
	const today = todayISO();
	const week = Array.from({ length: 7 }, (_, i) => addDays(/* @__PURE__ */ new Date(), i - 6));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Habits",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "text-sm font-medium",
			onClick: () => setOpen(true),
			children: "New"
		}),
		children: [habits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "No habits yet",
			body: "Pick a small daily action. Streaks grow when you simply show up."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: habits.map((h) => {
				const streak = habitStreak(h);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-lg font-semibold",
							children: h.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-sm text-muted tabular-nums",
							children: [streak, " day streak"]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted",
							onClick: () => remove(h.id),
							children: "Remove"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 flex justify-between",
						children: week.map((d) => {
							const iso = toISODate(d);
							const on = Boolean(h.completions[iso]);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => toggle(h.id, iso),
								className: "flex flex-col items-center gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-subtle",
									children: format(d, "EEEEE")
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("grid size-9 place-items-center rounded-full text-xs tabular-nums", on ? "bg-ok text-bg" : "bg-elevated text-muted", iso === today && !on && "shadow-[var(--elev-border)]"),
									children: d.getDate()
								})]
							}, iso);
						})
					})]
				}, h.id);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
			open,
			onClose: () => setOpen(false),
			title: "New habit",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Title",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: title,
						onChange: (e) => setTitle(e.target.value),
						placeholder: "Morning walk"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
					children: "Days"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-2 flex flex-wrap gap-2",
					children: [
						"S",
						"M",
						"T",
						"W",
						"T",
						"F",
						"S"
					].map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: days.includes(i),
						onClick: () => setDays(days.includes(i) ? days.filter((d) => d !== i) : [...days, i].sort()),
						children: label
					}, `${label}-${i}`))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-5 w-full",
					onClick: () => {
						if (!title.trim()) return;
						add(title.trim(), "personal", days);
						setTitle("");
						setOpen(false);
					},
					children: "Save habit"
				})
			]
		})]
	});
}
//#endregion
export { HabitsPage as component };
