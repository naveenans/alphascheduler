import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as format } from "../_libs/date-fns.mjs";
import { D as Empty, Q as useAppStore, T as Button, s as AppShell } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/notifications-BhRPI19o.js
var import_jsx_runtime = require_jsx_runtime();
function NoticesPage() {
	const notices = useAppStore((s) => s.notices);
	const mark = useAppStore((s) => s.markNoticeRead);
	const clear = useAppStore((s) => s.clearNotices);
	const grouped = {
		upcoming: notices.filter((n) => n.kind === "upcoming"),
		due: notices.filter((n) => n.kind === "due"),
		overdue: notices.filter((n) => n.kind === "overdue"),
		completed: notices.filter((n) => n.kind === "completed")
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "Notifications",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex justify-end",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: "ghost",
				onClick: clear,
				children: "Clear"
			})
		}), notices.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Empty, {
			title: "All quiet",
			body: "Reminders and completions will collect here."
		}) : [
			"upcoming",
			"due",
			"overdue",
			"completed"
		].map((k) => grouped[k].length === 0 ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mb-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
				children: k === "due" ? "Due soon" : k[0].toUpperCase() + k.slice(1)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: grouped[k].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => mark(n.id),
					className: "w-full rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--elev-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: n.title
							}), !n.read ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-2 rounded-full bg-accent" }) : null]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted",
							children: n.body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[11px] text-subtle",
							children: format(new Date(n.createdAt), "d MMM, HH:mm")
						})
					]
				}), n.taskId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/task/$id",
					params: { id: n.taskId },
					className: "mt-1 block px-1 text-xs text-muted",
					children: "Open task"
				}) : null] }, n.id))
			})]
		}, k))]
	});
}
//#endregion
export { NoticesPage as component };
