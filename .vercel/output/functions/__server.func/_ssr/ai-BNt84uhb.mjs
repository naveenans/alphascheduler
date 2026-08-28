import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, t as _enum } from "../_libs/zod.mjs";
import { C as parseQuickAdd, E as Chip, L as emptyDraft, P as Textarea, Q as useAppStore, R as formatDayHeading, T as Button, X as todayISO, _ as CATEGORY_META, s as AppShell } from "./router-BESfIgdw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-BNt84uhb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var Input = object({
	prompt: string().min(1).max(2e3),
	context: string().max(4e3).optional(),
	mode: _enum([
		"parse",
		"plan",
		"summary",
		"subtasks",
		"insight"
	]).default("parse")
});
var askAlpha = createServerFn({ method: "POST" }).validator((input) => Input.parse(input)).handler(createSsrRpc("456e918a2d517c12888cfc8f8b446e4f87311467bf0c585b4d8260dc51d3a365"));
function AiPage() {
	const enabled = useAppStore((s) => s.settings.aiEnabled);
	const tasks = useAppStore((s) => s.tasks);
	const addTask = useAppStore((s) => s.addTask);
	const [prompt, setPrompt] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [insight, setInsight] = (0, import_react.useState)("");
	const [suggestions, setSuggestions] = (0, import_react.useState)([]);
	const [picked, setPicked] = (0, import_react.useState)({});
	const context = (0, import_react.useMemo)(() => {
		const today = tasks.filter((t) => t.date === todayISO()).map((t) => `${t.status === "completed" ? "done" : "open"} · ${t.category} · ${t.title}`).join("\n");
		return `Today is ${formatDayHeading(/* @__PURE__ */ new Date())}.\n${today || "No tasks dated today."}`;
	}, [tasks]);
	async function run(mode) {
		if (!prompt.trim() && mode === "parse") return;
		setBusy(true);
		setError("");
		try {
			const result = await askAlpha({ data: {
				prompt: mode === "summary" ? "Summarize today's workload and suggest a calm plan for tomorrow." : prompt,
				context,
				mode
			} });
			if (!result.ok) {
				if (mode === "parse") fallbackLocal();
				else setError(result.error);
				return;
			}
			setInsight(result.insight);
			setSuggestions(result.tasks);
			setPicked(Object.fromEntries(result.tasks.map((_, i) => [i, true])));
		} catch {
			if (mode === "parse") fallbackLocal();
			else setError("Something went wrong. Try again.");
		} finally {
			setBusy(false);
		}
	}
	function fallbackLocal() {
		const chunks = prompt.split(/,| and | then |\n/i).map((s) => s.trim()).filter(Boolean);
		const items = (chunks.length ? chunks : [prompt]).map((c) => {
			const p = parseQuickAdd(c);
			return {
				title: p.title,
				category: p.category,
				date: p.date,
				time: p.time,
				priority: p.priority,
				amount: p.amount,
				reason: "Parsed on device"
			};
		});
		setInsight("I sketched this from your words. Confirm anything you want saved.");
		setSuggestions(items);
		setPicked(Object.fromEntries(items.map((_, i) => [i, true])));
	}
	function confirm() {
		suggestions.forEach((s, i) => {
			if (!picked[i]) return;
			addTask(emptyDraft({
				title: s.title,
				category: s.category,
				date: s.date,
				time: s.time,
				priority: s.priority,
				amount: s.amount,
				kind: s.category === "financial" ? "payment" : "todo"
			}));
		});
		setSuggestions([]);
		setInsight("Saved. Let's make today count.");
		setPrompt("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, {
		title: "Assistant",
		children: !enabled ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "The assistant is off. Enable it in Settings when you want help planning."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm leading-relaxed text-muted",
				children: "Describe what you need in plain language. I'll propose tasks — nothing is created until you confirm."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
				className: "mt-4 min-h-32",
				value: prompt,
				onChange: (e) => setPrompt(e.target.value),
				placeholder: "I need to finish the project report, call the client and pay the electricity bill tomorrow."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: busy,
					onClick: () => void run("parse"),
					children: busy ? "Thinking…" : "Propose tasks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					disabled: busy,
					onClick: () => void run("summary"),
					children: "Summarize today"
				})]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-warn",
				children: error
			}) : null,
			insight ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-[15px] leading-relaxed",
				children: insight
			}) : null,
			suggestions.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-2",
				children: [suggestions.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setPicked((p) => ({
						...p,
						[i]: !p[i]
					})),
					className: "w-full rounded-2xl bg-surface px-4 py-3 text-left shadow-[var(--elev-border)]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: s.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: Boolean(picked[i]),
							children: picked[i] ? "Keep" : "Skip"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-1 text-xs text-muted",
						children: [
							CATEGORY_META[s.category].label,
							s.date ? ` · ${s.date}` : "",
							s.time ? ` · ${s.time}` : "",
							s.reason ? ` · ${s.reason}` : ""
						]
					})]
				}, `${s.title}-${i}`)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-2 w-full",
					onClick: confirm,
					children: "Create selected"
				})]
			}) : null
		] })
	});
}
//#endregion
export { AiPage as component };
