import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Chip, L as emptyDraft, O as Field, P as Textarea, Q as useAppStore, T as Button, Z as uid, b as PROFESSIONAL_SUBS, k as Input, v as FINANCIAL_SUBS, x as REMINDER_PRESETS, y as PERSONAL_SUBS } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/task-form-CXlmHSKx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KINDS = [
	"todo",
	"reminder",
	"schedule",
	"payment",
	"note"
];
var PRIOS = [
	"low",
	"medium",
	"high",
	"critical"
];
var CATS = [
	"personal",
	"professional",
	"financial"
];
function subsFor(cat) {
	if (cat === "personal") return PERSONAL_SUBS;
	if (cat === "professional") return PROFESSIONAL_SUBS;
	return FINANCIAL_SUBS;
}
function TaskForm({ initial, submitLabel = "Save", onSubmit }) {
	const projects = useAppStore((s) => s.projects);
	const goals = useAppStore((s) => s.goals);
	const [draft, setDraft] = (0, import_react.useState)(() => emptyDraft(initial));
	const [subTitle, setSubTitle] = (0, import_react.useState)("");
	function patch(p) {
		setDraft((d) => ({
			...d,
			...p
		}));
	}
	const repeats = [
		{
			label: "Doesn't repeat",
			rule: { type: "none" }
		},
		{
			label: "Daily",
			rule: { type: "daily" }
		},
		{
			label: "Weekdays",
			rule: { type: "weekdays" }
		},
		{
			label: "Weekly",
			rule: {
				type: "weekly",
				days: [(/* @__PURE__ */ new Date()).getDay()]
			}
		},
		{
			label: "Every 2 weeks",
			rule: { type: "biweekly" }
		},
		{
			label: "Monthly",
			rule: {
				type: "monthly",
				day: (/* @__PURE__ */ new Date()).getDate()
			}
		},
		{
			label: "Yearly",
			rule: { type: "yearly" }
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "space-y-5 pb-8",
		onSubmit: (e) => {
			e.preventDefault();
			if (!draft.title.trim()) return;
			onSubmit(draft);
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Title",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					required: true,
					value: draft.title,
					onChange: (e) => patch({ title: e.target.value }),
					placeholder: "What needs doing?"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Description",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft.description,
					onChange: (e) => patch({ description: e.target.value }),
					placeholder: "Optional details"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Type",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: KINDS.map((k) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: draft.kind === k,
						onClick: () => patch({ kind: k }),
						children: k[0].toUpperCase() + k.slice(1)
					}, k))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Category",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: CATS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						tone: c,
						active: draft.category === c,
						onClick: () => patch({
							category: c,
							subcategory: "",
							kind: c === "financial" ? "payment" : draft.kind
						}),
						children: c[0].toUpperCase() + c.slice(1)
					}, c))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Subcategory",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: subsFor(draft.category).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: draft.subcategory === s,
						onClick: () => patch({ subcategory: s }),
						children: s
					}, s))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Date",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "date",
						value: draft.date ?? "",
						onChange: (e) => patch({ date: e.target.value || null })
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Time",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "time",
						value: draft.time ?? "",
						onChange: (e) => patch({ time: e.target.value || null })
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "soft",
					onClick: () => patch({ date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10) }),
					children: "Today"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					size: "sm",
					variant: "soft",
					onClick: () => {
						const d = /* @__PURE__ */ new Date();
						d.setDate(d.getDate() + 1);
						patch({ date: d.toISOString().slice(0, 10) });
					},
					children: "Tomorrow"
				})]
			}),
			draft.category === "financial" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Amount (INR)",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					type: "number",
					min: 0,
					value: draft.amount ?? "",
					onChange: (e) => patch({ amount: e.target.value === "" ? null : Number(e.target.value) }),
					placeholder: "15000"
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Priority",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: PRIOS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: draft.priority === p,
						onClick: () => patch({ priority: p }),
						children: p[0].toUpperCase() + p.slice(1)
					}, p))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Reminder",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: REMINDER_PRESETS.map((p) => {
						const on = draft.reminderOffsets.includes(p.minutes);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: on,
							onClick: () => patch({ reminderOffsets: on ? draft.reminderOffsets.filter((m) => m !== p.minutes) : [...draft.reminderOffsets, p.minutes] }),
							children: p.label
						}, p.minutes);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Repeat",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-2",
					children: repeats.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: draft.repeat.type === r.rule.type,
						onClick: () => patch({ repeat: r.rule }),
						children: r.label
					}, r.label))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Subtasks",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-2",
					children: [draft.subtasks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 rounded-xl bg-elevated px-3 py-2 text-sm shadow-[var(--elev-border)]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex-1",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "text-xs text-muted",
							onClick: () => patch({ subtasks: draft.subtasks.filter((x) => x.id !== s.id) }),
							children: "Remove"
						})]
					}, s.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: subTitle,
							onChange: (e) => setSubTitle(e.target.value),
							placeholder: "Add a step",
							onKeyDown: (e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									if (!subTitle.trim()) return;
									patch({ subtasks: [...draft.subtasks, {
										id: uid(),
										title: subTitle.trim(),
										completed: false
									}] });
									setSubTitle("");
								}
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "secondary",
							onClick: () => {
								if (!subTitle.trim()) return;
								patch({ subtasks: [...draft.subtasks, {
									id: uid(),
									title: subTitle.trim(),
									completed: false
								}] });
								setSubTitle("");
							},
							children: "Add"
						})]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Notes",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
					value: draft.notes,
					onChange: (e) => patch({ notes: e.target.value }),
					placeholder: "Private notes"
				})
			}),
			projects.length > 0 && draft.category === "professional" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Project",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !draft.projectId,
						onClick: () => patch({ projectId: null }),
						children: "None"
					}), projects.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: draft.projectId === p.id,
						onClick: () => patch({ projectId: p.id }),
						children: p.name
					}, p.id))]
				})
			}) : null,
			goals.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Linked goal",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: !draft.goalId,
						onClick: () => patch({ goalId: null }),
						children: "None"
					}), goals.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
						active: draft.goalId === g.id,
						onClick: () => patch({ goalId: g.id }),
						children: g.title
					}, g.id))]
				})
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "flex items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: draft.isHabit,
					onChange: (e) => patch({ isHabit: e.target.checked }),
					className: "size-4 accent-[var(--accent)]"
				}), "Track as a habit"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				className: "w-full",
				size: "lg",
				children: submitLabel
			})
		]
	});
}
//#endregion
export { TaskForm as t };
