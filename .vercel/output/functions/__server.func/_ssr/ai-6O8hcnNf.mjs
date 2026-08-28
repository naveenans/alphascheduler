import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import { a as string, i as object, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ai-6O8hcnNf.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
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
var askAlpha_createServerFn_handler = createServerRpc({
	id: "456e918a2d517c12888cfc8f8b446e4f87311467bf0c585b4d8260dc51d3a365",
	name: "askAlpha",
	filename: "src/lib/ai.ts"
}, (opts) => askAlpha.__executeServer(opts));
var askAlpha = createServerFn({ method: "POST" }).validator((input) => Input.parse(input)).handler(askAlpha_createServerFn_handler, async ({ data }) => {
	const apiKey = process.env.XAI_API_KEY;
	if (!apiKey) return {
		ok: false,
		error: "AI is not available in this environment."
	};
	const system = `You are Alpha, a calm productivity companion inside Alpha Scheduler.
Return ONLY valid JSON with keys: insight (string), tasks (array), subtasks (array of strings).
Each task: title, category (personal|professional|financial), date (YYYY-MM-DD or null), time (HH:mm or null), priority (critical|high|medium|low), amount (number or null), reason (short).
Never give investment advice. Never store or request banking credentials.
Tone: positive, professional, motivating. No guilt. No emoji.
Today's context may be provided. Suggest reasonable times. Do not create more than 8 tasks.
Mode: ${data.mode}`;
	const res = await fetch("https://api.x.ai/v1/chat/completions", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${apiKey}`
		},
		body: JSON.stringify({
			model: "grok-4.5",
			temperature: .3,
			max_tokens: 700,
			messages: [{
				role: "system",
				content: system
			}, {
				role: "user",
				content: data.context ? `${data.prompt}\n\nContext:\n${data.context}` : data.prompt
			}]
		})
	});
	if (!res.ok) return {
		ok: false,
		error: "The assistant could not be reached. Try again."
	};
	const text = (await res.json()).choices?.[0]?.message?.content ?? "";
	const jsonStart = text.indexOf("{");
	const jsonEnd = text.lastIndexOf("}");
	if (jsonStart < 0 || jsonEnd < 0) return {
		ok: true,
		insight: text.slice(0, 280) || "I couldn't structure that. Try a shorter request.",
		tasks: [],
		subtasks: []
	};
	try {
		const parsed = JSON.parse(text.slice(jsonStart, jsonEnd + 1));
		return {
			ok: true,
			insight: parsed.insight ?? "Here's a plan you can confirm.",
			tasks: Array.isArray(parsed.tasks) ? parsed.tasks.slice(0, 8) : [],
			subtasks: Array.isArray(parsed.subtasks) ? parsed.subtasks.slice(0, 12) : []
		};
	} catch {
		return {
			ok: false,
			error: "The assistant returned something I couldn't read."
		};
	}
});
//#endregion
export { askAlpha_createServerFn_handler };
