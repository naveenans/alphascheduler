import { S as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ChartColumn, T as Briefcase, a as Settings, g as Download, h as Flame, n as UserRound, p as LayoutGrid, t as Wallet, u as MessageSquare, y as ChevronRight } from "../_libs/lucide-react.mjs";
import { Q as useAppStore, o as Wordmark, s as AppShell } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/more-DScABXKx.js
var import_jsx_runtime = require_jsx_runtime();
var LINKS = [
	{
		to: "/personal",
		label: "Personal",
		hint: "Life, family, health",
		icon: UserRound
	},
	{
		to: "/professional",
		label: "Professional",
		hint: "Work, projects, meetings",
		icon: Briefcase
	},
	{
		to: "/financial",
		label: "Financial",
		hint: "Bills, EMIs, goals",
		icon: Wallet
	},
	{
		to: "/habits",
		label: "Habits",
		hint: "Streaks and daily rituals",
		icon: Flame
	},
	{
		to: "/analytics",
		label: "Analytics",
		hint: "How the week is going",
		icon: ChartColumn
	},
	{
		to: "/ai",
		label: "Assistant",
		hint: "Turn notes into a plan",
		icon: MessageSquare
	},
	{
		to: "/widgets",
		label: "Widgets",
		hint: "Home-screen style tiles",
		icon: LayoutGrid
	},
	{
		to: "/backup",
		label: "Backup & restore",
		hint: "JSON export and import",
		icon: Download
	},
	{
		to: "/settings",
		label: "Settings",
		hint: "Theme, reminders, profile",
		icon: Settings
	}
];
function MorePage() {
	const name = useAppStore((s) => s.settings.name);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AppShell, {
		title: "More",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 rounded-[24px] bg-surface p-4 shadow-[var(--elev-border)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wordmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-3 text-sm text-muted",
				children: [name ? `${name} · ` : "", "Plan it. Remember it. Do it. Achieve it."]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-1.5",
			children: LINKS.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: "flex items-center gap-3 rounded-2xl bg-surface px-3 py-3 shadow-[var(--elev-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "grid size-10 place-items-center rounded-xl bg-elevated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-sm font-medium",
								children: item.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block text-[12px] text-muted",
								children: item.hint
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4 text-subtle" })
					]
				}) }, item.to);
			})
		})]
	});
}
//#endregion
export { MorePage as component };
