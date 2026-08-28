import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, b as useNavigate, y as Navigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as BellRing, T as Briefcase, t as Wallet, w as CalendarCheck } from "../_libs/lucide-react.mjs";
import { Q as useAppStore, T as Button, a as AlphaLogo, k as Input } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/onboarding-C7mBehtj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var STEPS = [
	{
		title: "Organize your life",
		body: "Everything important, in one calm place — personal, work, and money.",
		icon: BellRing
	},
	{
		title: "Plan your work",
		body: "Stay ahead of deadlines, meetings, and the projects that actually matter.",
		icon: Briefcase
	},
	{
		title: "Never miss a payment",
		body: "Keep EMIs, bills, and subscriptions in view. Reminders only — never credentials.",
		icon: Wallet
	},
	{
		title: "Ready to begin?",
		body: "A few sample tasks will show you the ropes. Remove them whenever you like.",
		icon: CalendarCheck
	}
];
function Onboarding() {
	const onboarded = useAppStore((s) => s.onboarded);
	const [step, setStep] = (0, import_react.useState)(0);
	const [name, setName] = (0, import_react.useState)("");
	const complete = useAppStore((s) => s.completeOnboarding);
	const skip = useAppStore((s) => s.skipOnboarding);
	const navigate = useNavigate();
	const s = STEPS[step];
	const Icon = s.icon;
	const last = step === STEPS.length - 1;
	if (onboarded) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigate, { to: "/" });
	function finish(seed) {
		complete(name, seed);
		navigate({ to: "/" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col bg-bg px-6 pb-8 pt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlphaLogo, {
					size: 36,
					className: "text-accent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "h-11 px-2 text-sm text-muted",
					onClick: () => {
						skip();
						navigate({ to: "/" });
					},
					children: "Skip"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col justify-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid size-16 place-items-center rounded-3xl bg-elevated text-fg shadow-[var(--elev-border)]",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-8 font-display text-[32px] font-semibold leading-tight tracking-tight",
						children: s.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-[15px] leading-relaxed text-muted",
						children: s.body
					}),
					last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: name,
							onChange: (e) => setName(e.target.value),
							placeholder: "What should we call you?"
						})
					}) : null
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex items-center gap-2",
				children: STEPS.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "h-1 flex-1 rounded-full",
					style: { background: i <= step ? "var(--fg)" : "color-mix(in oklab, var(--fg) 15%, transparent)" }
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex gap-2",
				children: [step > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					className: "flex-1",
					onClick: () => setStep((n) => n - 1),
					children: "Back"
				}) : null, last ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => finish(true),
					children: "Create my first plan"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: () => setStep((n) => n + 1),
					children: "Continue"
				})]
			})
		]
	});
}
//#endregion
export { Onboarding as component };
