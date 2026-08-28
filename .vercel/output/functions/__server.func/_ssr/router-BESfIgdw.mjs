import { i as __toESM } from "../_runtime.mjs";
import { H as require_react, S as require_jsx_runtime, _ as createRootRoute, b as useNavigate, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link, x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as string, i as object, n as literal, o as union, r as number } from "../_libs/zod.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { C as addDays, S as addMonths, _ as addYears, a as isTomorrow, b as startOfDay, c as lastDayOfMonth, d as format, f as endOfWeek, h as endOfMonth, i as isYesterday, l as getDay, m as eachDayOfInterval, n as parseISO, o as isToday, p as startOfMonth, r as nextDay, s as isBefore, t as setDate, u as getDate, v as addWeeks, x as startOfWeek, y as addMinutes } from "../_libs/date-fns.mjs";
import { t as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { C as CalendarDays, E as Bell, O as ArrowRight, c as Plus, d as ListTodo, f as ListChecks, i as Target, k as AlarmClock, l as NotebookPen, m as House, o as Settings2, r as TriangleAlert, s as Search, t as Wallet } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-BRvEEocB.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID();
}
function formatInr(amount) {
	return new Intl.NumberFormat("en-IN", {
		style: "currency",
		currency: "INR",
		maximumFractionDigits: 0
	}).format(amount);
}
function iso(d) {
	return format(d, "yyyy-MM-dd");
}
function buildSeed(now = /* @__PURE__ */ new Date()) {
	const today = iso(now);
	const tomorrow = iso(addDays(now, 1));
	const inTwo = iso(addDays(now, 2));
	const inFive = iso(addDays(now, 5));
	const inTen = iso(addDays(now, 10));
	const inEighteen = iso(addDays(now, 18));
	const stamp = now.toISOString();
	const projectId = uid();
	const goalSaveId = uid();
	const goalCertId = uid();
	const habitWalk = uid();
	const habitRead = uid();
	const habitWater = uid();
	const projects = [{
		id: projectId,
		name: "Website Project",
		description: "Client site refresh — reviews, quotes, and launch checklist.",
		createdAt: stamp
	}];
	const tasks = [
		{
			id: uid(),
			title: "Morning Exercise",
			description: "30-minute walk or bodyweight session.",
			notes: "",
			kind: "todo",
			category: "personal",
			subcategory: "Health & Fitness",
			projectId: null,
			goalId: null,
			date: today,
			time: "06:30",
			priority: "medium",
			status: "completed",
			reminderOffsets: [10],
			repeat: { type: "daily" },
			subtasks: [],
			isHabit: true,
			isDemo: true,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: stamp,
			completions: [today]
		},
		{
			id: uid(),
			title: "Call parents",
			description: "Weekend check-in.",
			notes: "",
			kind: "todo",
			category: "personal",
			subcategory: "Family",
			projectId: null,
			goalId: null,
			date: today,
			time: "19:30",
			priority: "high",
			status: "pending",
			reminderOffsets: [15],
			repeat: { type: "none" },
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Grocery shopping",
			description: "Milk, greens, fruit, coffee.",
			notes: "Prefer the evening market.",
			kind: "todo",
			category: "personal",
			subcategory: "Shopping",
			projectId: null,
			goalId: null,
			date: today,
			time: "18:30",
			priority: "medium",
			status: "pending",
			reminderOffsets: [30],
			repeat: {
				type: "weekly",
				days: [now.getDay()]
			},
			subtasks: [{
				id: uid(),
				title: "Vegetables",
				completed: false
			}, {
				id: uid(),
				title: "Household",
				completed: false
			}],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Read 20 pages",
			description: "Evening reading block.",
			notes: "",
			kind: "todo",
			category: "personal",
			subcategory: "Education",
			projectId: null,
			goalId: null,
			date: today,
			time: "21:00",
			priority: "low",
			status: "pending",
			reminderOffsets: [0],
			repeat: { type: "daily" },
			subtasks: [],
			isHabit: true,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Project Review",
			description: "Walk through open tickets with the team.",
			notes: "",
			kind: "schedule",
			category: "professional",
			subcategory: "Reviews",
			projectId,
			goalId: null,
			date: today,
			time: "15:00",
			priority: "high",
			status: "pending",
			reminderOffsets: [15],
			repeat: { type: "none" },
			subtasks: [{
				id: uid(),
				title: "Collect status notes",
				completed: true
			}, {
				id: uid(),
				title: "Prepare agenda",
				completed: false
			}],
			isHabit: false,
			isDemo: true,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Client meeting",
			description: "Scope check for the homepage.",
			notes: "Bring the latest mock.",
			kind: "schedule",
			category: "professional",
			subcategory: "Meetings",
			projectId,
			goalId: null,
			date: today,
			time: "10:00",
			priority: "critical",
			status: "pending",
			reminderOffsets: [15, 60],
			repeat: { type: "none" },
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Send quotation",
			description: "Pricing for phase two.",
			notes: "",
			kind: "todo",
			category: "professional",
			subcategory: "Client Tasks",
			projectId,
			goalId: null,
			date: today,
			time: "12:30",
			priority: "high",
			status: "pending",
			reminderOffsets: [30],
			repeat: { type: "none" },
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Follow-up with customer",
			description: "Confirm last week's deliverable.",
			notes: "",
			kind: "reminder",
			category: "professional",
			subcategory: "Follow-ups",
			projectId,
			goalId: null,
			date: today,
			time: "17:30",
			priority: "medium",
			status: "pending",
			reminderOffsets: [10],
			repeat: { type: "none" },
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Finish project report",
			description: "Draft the weekly status for stakeholders.",
			notes: "",
			kind: "todo",
			category: "professional",
			subcategory: "Reports",
			projectId,
			goalId: goalCertId,
			date: tomorrow,
			time: "11:00",
			priority: "high",
			status: "pending",
			reminderOffsets: [60],
			repeat: { type: "none" },
			subtasks: [
				{
					id: uid(),
					title: "Outline",
					completed: true
				},
				{
					id: uid(),
					title: "Metrics",
					completed: false
				},
				{
					id: uid(),
					title: "Risks",
					completed: false
				}
			],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Electricity Bill",
			description: "Monthly household electricity.",
			notes: "",
			kind: "payment",
			category: "financial",
			subcategory: "Utilities",
			projectId: null,
			goalId: null,
			date: today,
			time: "14:00",
			priority: "high",
			status: "pending",
			reminderOffsets: [1440, 60],
			repeat: {
				type: "monthly",
				day: now.getDate()
			},
			subtasks: [],
			isHabit: false,
			isDemo: true,
			amount: 2499,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Home Loan EMI",
			description: "Scheduled auto-debit reminder.",
			notes: "Do not store account credentials here.",
			kind: "payment",
			category: "financial",
			subcategory: "EMI",
			projectId: null,
			goalId: null,
			date: inFive,
			time: "09:00",
			priority: "critical",
			status: "pending",
			reminderOffsets: [1440],
			repeat: {
				type: "monthly",
				day: Number(inFive.slice(8, 10))
			},
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: 15e3,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "SIP",
			description: "Monthly investment reminder.",
			notes: "",
			kind: "payment",
			category: "financial",
			subcategory: "SIP",
			projectId: null,
			goalId: goalSaveId,
			date: inTen,
			time: "09:30",
			priority: "medium",
			status: "pending",
			reminderOffsets: [1440],
			repeat: {
				type: "monthly",
				day: Number(inTen.slice(8, 10))
			},
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: 5e3,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Health insurance",
			description: "Annual premium reminder.",
			notes: "",
			kind: "payment",
			category: "financial",
			subcategory: "Insurance",
			projectId: null,
			goalId: null,
			date: inEighteen,
			time: "10:00",
			priority: "high",
			status: "pending",
			reminderOffsets: [1440, 10080],
			repeat: { type: "yearly" },
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: 2499,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		},
		{
			id: uid(),
			title: "Buy birthday gift",
			description: "For next week's celebration.",
			notes: "",
			kind: "todo",
			category: "personal",
			subcategory: "Birthdays",
			projectId: null,
			goalId: null,
			date: inTwo,
			time: "16:00",
			priority: "medium",
			status: "pending",
			reminderOffsets: [60],
			repeat: { type: "none" },
			subtasks: [],
			isHabit: false,
			isDemo: false,
			amount: null,
			createdAt: stamp,
			updatedAt: stamp,
			completedAt: null,
			completions: []
		}
	];
	const goals = [
		{
			id: goalSaveId,
			title: "Save ₹1,00,000",
			description: "Emergency fund top-up this year.",
			category: "financial",
			targetDate: iso(addDays(now, 120)),
			targetValue: 1e5,
			currentValue: 42e3,
			unit: "₹",
			taskIds: tasks.filter((t) => t.goalId === goalSaveId).map((t) => t.id),
			milestones: [
				{
					id: uid(),
					title: "₹25,000",
					done: true
				},
				{
					id: uid(),
					title: "₹50,000",
					done: false
				},
				{
					id: uid(),
					title: "₹75,000",
					done: false
				},
				{
					id: uid(),
					title: "₹1,00,000",
					done: false
				}
			],
			createdAt: stamp
		},
		{
			id: goalCertId,
			title: "Complete certification",
			description: "Finish the professional course and exam.",
			category: "professional",
			targetDate: iso(addDays(now, 60)),
			targetValue: 12,
			currentValue: 7,
			unit: "modules",
			taskIds: [],
			milestones: [
				{
					id: uid(),
					title: "Core modules",
					done: true
				},
				{
					id: uid(),
					title: "Practice exam",
					done: false
				},
				{
					id: uid(),
					title: "Final exam",
					done: false
				}
			],
			createdAt: stamp
		},
		{
			id: uid(),
			title: "Exercise 100 days",
			description: "Show up, even if the session is short.",
			category: "personal",
			targetDate: iso(addDays(now, 90)),
			targetValue: 100,
			currentValue: 18,
			unit: "days",
			taskIds: [],
			milestones: [
				{
					id: uid(),
					title: "7-day streak",
					done: true
				},
				{
					id: uid(),
					title: "30 days",
					done: false
				},
				{
					id: uid(),
					title: "100 days",
					done: false
				}
			],
			createdAt: stamp
		}
	];
	const yesterday = iso(addDays(now, -1));
	const twoBack = iso(addDays(now, -2));
	return {
		projects,
		tasks,
		goals,
		habits: [
			{
				id: habitWalk,
				title: "Morning walk",
				category: "personal",
				days: [
					1,
					2,
					3,
					4,
					5,
					6,
					0
				],
				completions: {
					[twoBack]: true,
					[yesterday]: true,
					[today]: true
				},
				createdAt: stamp,
				isDemo: false
			},
			{
				id: habitRead,
				title: "Reading",
				category: "personal",
				days: [
					1,
					2,
					3,
					4,
					5,
					6,
					0
				],
				completions: {
					[twoBack]: true,
					[yesterday]: true
				},
				createdAt: stamp,
				isDemo: false
			},
			{
				id: habitWater,
				title: "Drink water",
				category: "personal",
				days: [
					1,
					2,
					3,
					4,
					5,
					6,
					0
				],
				completions: { [yesterday]: true },
				createdAt: stamp,
				isDemo: false
			}
		]
	};
}
function toISODate(d) {
	return format(d, "yyyy-MM-dd");
}
function todayISO() {
	return toISODate(/* @__PURE__ */ new Date());
}
function combineDateTime(date, time) {
	if (!date) return null;
	const [h, m] = (time ?? "09:00").split(":").map((n) => Number(n));
	const d = parseISO(date);
	d.setHours(h || 0, m || 0, 0, 0);
	return d;
}
function greeting(now = /* @__PURE__ */ new Date()) {
	const h = now.getHours();
	if (h < 5) return "Good night";
	if (h < 12) return "Good morning";
	if (h < 17) return "Good afternoon";
	if (h < 21) return "Good evening";
	return "Good night";
}
function formatDayHeading(d, weekStartsOn = 1) {
	return format(d, "EEEE, d MMMM");
}
function formatShortDate(iso) {
	if (!iso) return "No date";
	const d = parseISO(iso);
	if (isToday(d)) return "Today";
	if (isTomorrow(d)) return "Tomorrow";
	if (isYesterday(d)) return "Yesterday";
	return format(d, "d MMM");
}
function formatTime(t) {
	if (!t) return null;
	const [hStr, mStr] = t.split(":");
	const h = Number(hStr);
	const m = Number(mStr);
	const suffix = h >= 12 ? "PM" : "AM";
	return `${h % 12 || 12}:${String(m).padStart(2, "0")} ${suffix}`;
}
function formatRelativeDue(date, time) {
	const when = combineDateTime(date, time);
	if (!when) return "Unscheduled";
	if (isToday(when)) return time ? `Today · ${formatTime(time)}` : "Today";
	if (isTomorrow(when)) return time ? `Tomorrow · ${formatTime(time)}` : "Tomorrow";
	return time ? `${format(when, "d MMM")} · ${formatTime(time)}` : format(when, "d MMM");
}
function isOverdue(date, time, status) {
	if (status === "completed" || !date) return false;
	const when = combineDateTime(date, time ?? "23:59");
	if (!when) return false;
	return isBefore(when, /* @__PURE__ */ new Date());
}
function isDueToday(date) {
	if (!date) return false;
	return isToday(parseISO(date));
}
function daysUntil(iso) {
	if (!iso) return null;
	const target = startOfDay(parseISO(iso));
	const today = startOfDay(/* @__PURE__ */ new Date());
	return Math.round((target.getTime() - today.getTime()) / 864e5);
}
function monthGrid(anchor, weekStartsOn) {
	const start = startOfWeek(startOfMonth(anchor), { weekStartsOn });
	const end = endOfWeek(endOfMonth(anchor), { weekStartsOn });
	return eachDayOfInterval({
		start,
		end
	});
}
function weekDays(anchor, weekStartsOn) {
	const start = startOfWeek(anchor, { weekStartsOn });
	return eachDayOfInterval({
		start,
		end: addDays(start, 6)
	});
}
function nextRepeatDate(fromISO, rule) {
	if (rule.type === "none") return null;
	const from = parseISO(fromISO);
	switch (rule.type) {
		case "daily": return toISODate(addDays(from, 1));
		case "weekdays": {
			let d = addDays(from, 1);
			while (getDay(d) === 0 || getDay(d) === 6) d = addDays(d, 1);
			return toISODate(d);
		}
		case "weekly": {
			const days = rule.days.length ? rule.days : [getDay(from)];
			let d = addDays(from, 1);
			for (let i = 0; i < 14; i++) {
				if (days.includes(getDay(d))) return toISODate(d);
				d = addDays(d, 1);
			}
			return toISODate(addWeeks(from, 1));
		}
		case "biweekly": return toISODate(addWeeks(from, 2));
		case "monthly": {
			const day = rule.day;
			if (day === -1) return toISODate(lastDayOfMonth(addMonths(from, 1)));
			const next = addMonths(from, 1);
			const last = getDate(lastDayOfMonth(next));
			return toISODate(setDate(next, Math.min(day, last)));
		}
		case "yearly": return toISODate(addYears(from, 1));
		case "custom":
			if (rule.unit === "day") return toISODate(addDays(from, rule.interval));
			if (rule.unit === "week") return toISODate(addWeeks(from, rule.interval));
			if (rule.unit === "month") return toISODate(addMonths(from, rule.interval));
			return toISODate(addYears(from, rule.interval));
	}
}
function repeatLabel(rule) {
	switch (rule.type) {
		case "none": return "Doesn't repeat";
		case "daily": return "Every day";
		case "weekdays": return "Every weekday";
		case "weekly":
			if (rule.days.length === 1) return `Every ${[
				"Sun",
				"Mon",
				"Tue",
				"Wed",
				"Thu",
				"Fri",
				"Sat"
			][rule.days[0]]}`;
			return "Weekly";
		case "biweekly": return "Every 2 weeks";
		case "monthly": return rule.day === -1 ? "Last day of month" : `Monthly on the ${rule.day}`;
		case "yearly": return "Every year";
		case "custom": return `Every ${rule.interval} ${rule.unit}${rule.interval > 1 ? "s" : ""}`;
	}
}
function sortByWhen(items) {
	return [...items].sort((a, b) => {
		return (combineDateTime(a.date, a.time)?.getTime() ?? Number.MAX_SAFE_INTEGER) - (combineDateTime(b.date, b.time)?.getTime() ?? Number.MAX_SAFE_INTEGER);
	});
}
var emptyDraft = (partial) => ({
	title: "",
	description: "",
	notes: "",
	kind: "todo",
	category: "personal",
	subcategory: "",
	projectId: null,
	goalId: null,
	date: todayISO(),
	time: null,
	priority: "medium",
	reminderOffsets: [15],
	repeat: { type: "none" },
	subtasks: [],
	isHabit: false,
	amount: null,
	...partial
});
var defaultSettings = {
	theme: "dark",
	weekStartsOn: 1,
	defaultReminder: 15,
	notificationsEnabled: false,
	aiEnabled: true,
	name: ""
};
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function fromDraft(draft) {
	const stamp = nowIso();
	return {
		id: uid(),
		title: draft.title.trim() || "Untitled",
		description: draft.description,
		notes: draft.notes,
		kind: draft.kind,
		category: draft.category,
		subcategory: draft.subcategory,
		projectId: draft.projectId,
		goalId: draft.goalId,
		date: draft.date,
		time: draft.time,
		priority: draft.priority,
		status: "pending",
		reminderOffsets: draft.reminderOffsets,
		repeat: draft.repeat,
		subtasks: draft.subtasks,
		isHabit: draft.isHabit,
		isDemo: false,
		amount: draft.amount,
		createdAt: stamp,
		updatedAt: stamp,
		completedAt: null,
		completions: []
	};
}
var noopStorage = {
	getItem: () => null,
	setItem: () => {},
	removeItem: () => {}
};
var useAppStore = create()(persist((set, get) => ({
	onboarded: false,
	tasks: [],
	projects: [],
	goals: [],
	habits: [],
	notices: [],
	settings: defaultSettings,
	dismissedMorning: null,
	dismissedEvening: null,
	firedReminders: [],
	completeOnboarding: (name, seed) => {
		const seeded = seed ? buildSeed() : {
			tasks: [],
			projects: [],
			goals: [],
			habits: []
		};
		set({
			onboarded: true,
			settings: {
				...get().settings,
				name: name.trim()
			},
			...seeded
		});
	},
	skipOnboarding: () => {
		set({
			onboarded: true,
			...buildSeed()
		});
	},
	resetDemo: () => set({ ...buildSeed() }),
	removeDemo: () => set({
		tasks: get().tasks.filter((t) => !t.isDemo),
		habits: get().habits.filter((h) => !h.isDemo)
	}),
	addTask: (draft) => {
		const task = fromDraft(draft);
		set({ tasks: [task, ...get().tasks] });
		if (task.goalId) set({ goals: get().goals.map((g) => g.id === task.goalId && !g.taskIds.includes(task.id) ? {
			...g,
			taskIds: [...g.taskIds, task.id]
		} : g) });
		return task.id;
	},
	updateTask: (id, patch) => set({ tasks: get().tasks.map((t) => t.id === id ? {
		...t,
		...patch,
		updatedAt: nowIso()
	} : t) }),
	deleteTask: (id) => set({ tasks: get().tasks.filter((t) => t.id !== id) }),
	toggleTask: (id) => {
		const task = get().tasks.find((t) => t.id === id);
		if (!task) return;
		if (task.status === "completed") {
			set({ tasks: get().tasks.map((t) => t.id === id ? {
				...t,
				status: "pending",
				completedAt: null,
				updatedAt: nowIso()
			} : t) });
			return;
		}
		const stamp = nowIso();
		const date = task.date ?? todayISO();
		const next = nextRepeatDate(date, task.repeat);
		if (next) set({
			tasks: get().tasks.map((t) => t.id === id ? {
				...t,
				date: next,
				status: "pending",
				completedAt: null,
				completions: [...t.completions, date],
				updatedAt: stamp,
				subtasks: t.subtasks.map((s) => ({
					...s,
					completed: false
				}))
			} : t),
			notices: [{
				id: uid(),
				taskId: id,
				title: task.title,
				body: "Completed — next occurrence scheduled.",
				kind: "completed",
				read: false,
				createdAt: stamp
			}, ...get().notices].slice(0, 80)
		});
		else set({
			tasks: get().tasks.map((t) => t.id === id ? {
				...t,
				status: "completed",
				completedAt: stamp,
				updatedAt: stamp
			} : t),
			notices: [{
				id: uid(),
				taskId: id,
				title: task.title,
				body: "Marked complete.",
				kind: "completed",
				read: false,
				createdAt: stamp
			}, ...get().notices].slice(0, 80)
		});
	},
	toggleSubtask: (taskId, subId) => set({ tasks: get().tasks.map((t) => {
		if (t.id !== taskId) return t;
		const subtasks = t.subtasks.map((s) => s.id === subId ? {
			...s,
			completed: !s.completed
		} : s);
		const all = subtasks.length > 0 && subtasks.every((s) => s.completed);
		return {
			...t,
			subtasks,
			status: all ? "completed" : "pending",
			completedAt: all ? nowIso() : null,
			updatedAt: nowIso()
		};
	}) }),
	moveTaskDate: (id, date) => set({ tasks: get().tasks.map((t) => t.id === id ? {
		...t,
		date,
		updatedAt: nowIso()
	} : t) }),
	snoozeTask: (id, minutes) => {
		const base = addMinutes(/* @__PURE__ */ new Date(), minutes);
		get().rescheduleTask(id, toISODate(base), format(base, "HH:mm"));
	},
	rescheduleTask: (id, date, time) => set({ tasks: get().tasks.map((t) => t.id === id ? {
		...t,
		date,
		time,
		status: "pending",
		updatedAt: nowIso()
	} : t) }),
	postponeUnfinishedToTomorrow: () => {
		const iso = toISODate(addDays(/* @__PURE__ */ new Date(), 1));
		const today = todayISO();
		set({ tasks: get().tasks.map((t) => t.status !== "completed" && t.date === today ? {
			...t,
			date: iso,
			updatedAt: nowIso()
		} : t) });
	},
	addProject: (name, description = "") => {
		const p = {
			id: uid(),
			name,
			description,
			createdAt: nowIso()
		};
		set({ projects: [...get().projects, p] });
		return p.id;
	},
	deleteProject: (id) => set({
		projects: get().projects.filter((p) => p.id !== id),
		tasks: get().tasks.map((t) => t.projectId === id ? {
			...t,
			projectId: null
		} : t)
	}),
	addGoal: (goal) => {
		const g = {
			...goal,
			id: uid(),
			createdAt: nowIso()
		};
		set({ goals: [...get().goals, g] });
		return g.id;
	},
	updateGoal: (id, patch) => set({ goals: get().goals.map((g) => g.id === id ? {
		...g,
		...patch
	} : g) }),
	deleteGoal: (id) => set({ goals: get().goals.filter((g) => g.id !== id) }),
	bumpGoal: (id, delta) => set({ goals: get().goals.map((g) => g.id === id ? {
		...g,
		currentValue: Math.max(0, g.currentValue + delta)
	} : g) }),
	toggleMilestone: (goalId, milestoneId) => set({ goals: get().goals.map((g) => g.id !== goalId ? g : {
		...g,
		milestones: g.milestones.map((m) => m.id === milestoneId ? {
			...m,
			done: !m.done
		} : m)
	}) }),
	addHabit: (title, category, days) => {
		const h = {
			id: uid(),
			title,
			category,
			days,
			completions: {},
			createdAt: nowIso(),
			isDemo: false
		};
		set({ habits: [...get().habits, h] });
		return h.id;
	},
	toggleHabitDay: (id, date) => set({ habits: get().habits.map((h) => {
		if (h.id !== id) return h;
		const next = { ...h.completions };
		if (next[date]) delete next[date];
		else next[date] = true;
		return {
			...h,
			completions: next
		};
	}) }),
	deleteHabit: (id) => set({ habits: get().habits.filter((h) => h.id !== id) }),
	addNotice: (n) => set({ notices: [{
		...n,
		id: uid(),
		createdAt: nowIso(),
		read: false
	}, ...get().notices].slice(0, 80) }),
	markNoticeRead: (id) => set({ notices: get().notices.map((n) => n.id === id ? {
		...n,
		read: true
	} : n) }),
	clearNotices: () => set({ notices: [] }),
	markFired: (key) => set({ firedReminders: [...get().firedReminders, key].slice(-400) }),
	updateSettings: (patch) => set({ settings: {
		...get().settings,
		...patch
	} }),
	dismissMorning: () => set({ dismissedMorning: todayISO() }),
	dismissEvening: () => set({ dismissedEvening: todayISO() }),
	importAll: (data) => set({
		tasks: data.tasks ?? get().tasks,
		projects: data.projects ?? get().projects,
		goals: data.goals ?? get().goals,
		habits: data.habits ?? get().habits,
		settings: data.settings ? {
			...defaultSettings,
			...data.settings
		} : get().settings,
		onboarded: data.onboarded ?? get().onboarded
	})
}), {
	name: "alpha-scheduler-v1",
	skipHydration: true,
	storage: createJSONStorage(() => typeof window === "undefined" ? noopStorage : localStorage),
	partialize: (s) => ({
		onboarded: s.onboarded,
		tasks: s.tasks,
		projects: s.projects,
		goals: s.goals,
		habits: s.habits,
		notices: s.notices,
		settings: s.settings,
		dismissedMorning: s.dismissedMorning,
		dismissedEvening: s.dismissedEvening,
		firedReminders: s.firedReminders
	})
}));
function Button({ variant = "primary", size = "md", className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: cn("inline-flex items-center justify-center gap-2 font-medium select-none", "transition-[scale,background-color,color,opacity] duration-150 ease-out", "active:not-disabled:scale-[0.96] disabled:opacity-50", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", size === "sm" && "h-9 rounded-lg px-3 text-sm", size === "md" && "h-11 rounded-xl px-4 text-sm", size === "lg" && "h-12 rounded-2xl px-5 text-[15px]", size === "icon" && "size-11 rounded-xl", variant === "primary" && "bg-accent text-accent-fg", variant === "secondary" && "bg-elevated text-fg shadow-[var(--elev-border)]", variant === "ghost" && "bg-transparent text-fg hover:bg-elevated", variant === "danger" && "bg-danger/15 text-danger", variant === "soft" && "bg-fg/6 text-fg", className),
		...props
	});
}
function Input({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
		className: cn("h-11 w-full rounded-xl bg-elevated px-3.5 text-[15px] text-fg shadow-[var(--elev-border)]", "placeholder:text-subtle outline-none", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", className),
		...props
	});
}
function Textarea({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
		className: cn("min-h-24 w-full rounded-xl bg-elevated px-3.5 py-3 text-[15px] text-fg shadow-[var(--elev-border)]", "placeholder:text-subtle outline-none resize-none", "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent", className),
		...props
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
			children: label
		}), children]
	});
}
function Chip({ active, children, onClick, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 shrink-0 rounded-full px-3.5 text-sm font-medium", "transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96]", active ? "bg-accent text-accent-fg" : cn("bg-elevated text-muted shadow-[var(--elev-border)]", !active && (tone === "personal" ? "text-personal" : tone === "professional" ? "text-professional" : tone === "financial" ? "text-financial" : "text-fg"))),
		children
	});
}
function ProgressRing({ value, size = 56, stroke = 5, color = "var(--accent)", children }) {
	const r = (size - stroke) / 2;
	const c = 2 * Math.PI * r;
	const offset = c * (1 - Math.max(0, Math.min(100, value)) / 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative inline-grid place-items-center",
		style: {
			width: size,
			height: size
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
			width: size,
			height: size,
			className: "-rotate-90",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: "color-mix(in oklab, var(--fg) 10%, transparent)",
				strokeWidth: stroke
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: size / 2,
				cy: size / 2,
				r,
				fill: "none",
				stroke: color,
				strokeWidth: stroke,
				strokeLinecap: "round",
				strokeDasharray: c,
				strokeDashoffset: offset,
				style: { transition: "stroke-dashoffset 500ms cubic-bezier(0.22, 1, 0.36, 1)" }
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "absolute inset-0 grid place-items-center",
			children
		})]
	});
}
function Bar({ value, color = "var(--accent)" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-1.5 overflow-hidden rounded-full bg-fg/8",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full",
			style: {
				width: `${Math.max(0, Math.min(100, value))}%`,
				background: color,
				transition: "width 400ms cubic-bezier(0.22, 1, 0.36, 1)"
			}
		})
	});
}
function Empty({ title, body, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center px-6 py-14 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "font-display text-lg font-semibold text-fg",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1.5 max-w-xs text-sm leading-relaxed text-muted",
				children: body
			}),
			action ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5",
				children: action
			}) : null
		]
	});
}
function Sheet({ open, onClose, children, title }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "absolute inset-0 z-50 flex flex-col justify-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			"aria-label": "Close",
			className: "absolute inset-0 bg-bg/60",
			onClick: onClose
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative max-h-[88%] overflow-y-auto rounded-t-[28px] bg-surface px-5 pb-8 pt-3 shadow-[var(--elev-border)]",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mb-4 h-1 w-10 rounded-full bg-fg/15" }),
				title ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mb-4 font-display text-xl font-semibold tracking-tight",
					children: title
				}) : null,
				children
			]
		})]
	});
}
function PriorityMark({ priority }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("size-2 shrink-0 rounded-full", priority === "critical" ? "bg-danger" : priority === "high" ? "bg-warn" : priority === "medium" ? "bg-professional" : "bg-ok"),
		"aria-hidden": true
	});
}
function SectionTitle({ children, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-3 flex items-end justify-between gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-[17px] font-semibold tracking-tight",
			children
		}), action]
	});
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BESfIgdw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var PERSONAL_WORDS = /\b(gym|walk|grocery|groceries|parents|family|birthday|doctor|dentist|home|hobby|read|water|meditat|yoga|shop|flight|gift|school|class|habit|exercise|run|sleep)\b/i;
var WORK_WORDS = /\b(client|meeting|project|email|deadline|report|quotation|review|standup|call|follow[- ]?up|team|presentation|invoice|proposal|sprint)\b/i;
var MONEY_WORDS = /\b(bill|emi|sip|insurance|rent|tax|salary|loan|card|payment|subscription|electricity|premium|invest|savings|credit)\b/i;
var WEEKDAYS = {
	sunday: 0,
	monday: 1,
	tuesday: 2,
	wednesday: 3,
	thursday: 4,
	friday: 5,
	saturday: 6
};
function parseTime(text) {
	const m = text.match(/\b(?:at\s*)?(\d{1,2})(?::(\d{2}))\s*(am|pm)?\b/i) || text.match(/\b(?:at\s*)?(\d{1,2})\s*(am|pm)\b/i);
	if (!m) {
		if (/\bnoon\b/i.test(text)) return {
			time: "12:00",
			rest: text.replace(/\bnoon\b/i, "")
		};
		if (/\bmidnight\b/i.test(text)) return {
			time: "00:00",
			rest: text.replace(/\bmidnight\b/i, "")
		};
		if (/\bevening\b/i.test(text)) return {
			time: "18:00",
			rest: text.replace(/\bevening\b/i, "")
		};
		return {
			time: null,
			rest: text
		};
	}
	let h = Number(m[1]);
	const min = m[2] && /^\d{2}$/.test(m[2]) ? Number(m[2]) : 0;
	const suffix = (m[3] || "").toLowerCase();
	if (suffix === "pm" && h < 12) h += 12;
	if (suffix === "am" && h === 12) h = 0;
	return {
		time: `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`,
		rest: text.replace(m[0], "")
	};
}
function parseDatePart(text) {
	const now = /* @__PURE__ */ new Date();
	if (/\btoday\b/i.test(text)) return {
		date: todayISO(),
		rest: text.replace(/\btoday\b/i, "")
	};
	if (/\btomorrow\b/i.test(text)) return {
		date: toISODate(addDays(now, 1)),
		rest: text.replace(/\btomorrow\b/i, "")
	};
	if (/\btonight\b/i.test(text)) return {
		date: todayISO(),
		rest: text.replace(/\btonight\b/i, "")
	};
	if (/\bnext week\b/i.test(text)) return {
		date: toISODate(addDays(now, 7)),
		rest: text.replace(/\bnext week\b/i, "")
	};
	const inDays = text.match(/\bin\s+(\d+)\s+days?\b/i);
	if (inDays) return {
		date: toISODate(addDays(now, Number(inDays[1]))),
		rest: text.replace(inDays[0], "")
	};
	for (const [name, day] of Object.entries(WEEKDAYS)) {
		const re = new RegExp(`\\b(?:on\\s+)?(?:next\\s+)?${name}\\b`, "i");
		if (re.test(text)) return {
			date: toISODate(nextDay(now, day)),
			rest: text.replace(re, "")
		};
	}
	const named = text.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i);
	if (named) {
		const mon = {
			jan: "01",
			feb: "02",
			mar: "03",
			apr: "04",
			may: "05",
			jun: "06",
			jul: "07",
			aug: "08",
			sep: "09",
			oct: "10",
			nov: "11",
			dec: "12"
		}[named[2].slice(0, 3).toLowerCase()];
		const day = String(named[1]).padStart(2, "0");
		const year = now.getFullYear();
		let iso = `${year}-${mon}-${day}`;
		if (iso < todayISO()) iso = `${year + 1}-${mon}-${day}`;
		return {
			date: iso,
			rest: text.replace(named[0], "")
		};
	}
	return {
		date: null,
		rest: text
	};
}
function parseAmount(text) {
	const m = text.match(/(?:₹|rs\.?\s*)\s*([\d,]+)(?:\s*\/-)?/i) || text.match(/\b(\d{3,})\s*(?:rupees|inr)\b/i);
	if (!m) return {
		amount: null,
		rest: text
	};
	const amount = Number(m[1].replace(/,/g, ""));
	return {
		amount: Number.isFinite(amount) ? amount : null,
		rest: text.replace(m[0], "")
	};
}
function parseRepeat(text) {
	if (/\bevery\s+day|daily\b/i.test(text)) return { type: "daily" };
	if (/\bweekdays?|every weekday\b/i.test(text)) return { type: "weekdays" };
	if (/\bevery\s+year|yearly|annually\b/i.test(text)) return { type: "yearly" };
	if (/\bevery\s+month|monthly\b/i.test(text)) return {
		type: "monthly",
		day: (/* @__PURE__ */ new Date()).getDate()
	};
	if (/\bevery\s+2\s+weeks|biweekly|fortnight\b/i.test(text)) return { type: "biweekly" };
	const wd = text.match(/\bevery\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i);
	if (wd) return {
		type: "weekly",
		days: [WEEKDAYS[wd[1].toLowerCase()]]
	};
	return { type: "none" };
}
function parsePriority(text) {
	if (/\b(critical|urgent|asap)\b/i.test(text)) return "critical";
	if (/\b(high priority|important)\b/i.test(text)) return "high";
	if (/\blow priority|whenever\b/i.test(text)) return "low";
	return "medium";
}
function parseKind(text, category) {
	if (/\bpay|payment|emi|bill|sip\b/i.test(text) || category === "financial") return "payment";
	if (/\bremind\b/i.test(text)) return "reminder";
	if (/\bgoal|save|target\b/i.test(text)) return "goal";
	if (/\bnote\b/i.test(text)) return "note";
	if (/\bschedule|meeting|appointment\b/i.test(text)) return "schedule";
	return "todo";
}
function guessCategory(text, amount) {
	if (amount != null || MONEY_WORDS.test(text)) return "financial";
	if (WORK_WORDS.test(text)) return "professional";
	if (PERSONAL_WORDS.test(text)) return "personal";
	return "personal";
}
function parseQuickAdd(raw) {
	let text = raw.trim();
	const { time, rest: afterTime } = parseTime(text);
	text = afterTime;
	const { date, rest: afterDate } = parseDatePart(text);
	text = afterDate;
	const { amount, rest: afterAmt } = parseAmount(text);
	text = afterAmt;
	const repeat = parseRepeat(text);
	text = text.replace(/\b(every day|daily|weekdays?|every weekday|every year|yearly|annually|every month|monthly|every 2 weeks|biweekly|fortnight|every (monday|tuesday|wednesday|thursday|friday|saturday|sunday)|today|tomorrow|tonight|next week|at|on)\b/gi, "");
	const priority = parsePriority(text);
	text = text.replace(/\b(critical|urgent|asap|high priority|important|low priority|whenever)\b/gi, "");
	const category = guessCategory(raw, amount);
	const kind = parseKind(raw, category);
	const title = text.replace(/[,\-–]+/g, " ").replace(/\s+/g, " ").trim().replace(/^\w/, (c) => c.toUpperCase()) || raw.trim();
	let confidence = .4;
	if (date) confidence += .2;
	if (time) confidence += .15;
	if (amount != null) confidence += .1;
	if (title.length > 2) confidence += .15;
	return {
		title,
		date: date ?? todayISO(),
		time,
		category,
		priority,
		kind,
		amount,
		repeat,
		reminderOffsets: time ? [0] : [60],
		confidence: Math.min(1, confidence)
	};
}
function insightLine(opts) {
	const { completed, total, importantDone, importantTotal } = opts;
	if (total === 0) return "Your schedule is clear. Enjoy the extra time, or plan something that matters.";
	if (completed === total) return "Beautiful close. Everything you planned is done.";
	if (importantTotal > 0 && importantDone === importantTotal) return `Great job. You finished ${importantDone} of ${importantTotal} important tasks.`;
	if (completed > 0) return `You're on track. ${completed} of ${total} done — one more and the day tilts in your favour.`;
	return "Let's make today count. Start with the first important task.";
}
var PERSONAL_SUBS = [
	"Family",
	"Health & Fitness",
	"Shopping",
	"Home",
	"Travel",
	"Appointments",
	"Birthdays",
	"Anniversaries",
	"Personal Goals",
	"Education",
	"Hobbies",
	"Daily Habits"
];
var PROFESSIONAL_SUBS = [
	"Meetings",
	"Projects",
	"Follow-ups",
	"Calls",
	"Emails",
	"Deadlines",
	"Client Tasks",
	"Team Tasks",
	"Business Travel",
	"Reports",
	"Reviews",
	"Learning"
];
var FINANCIAL_SUBS = [
	"EMI",
	"Credit Card",
	"Insurance",
	"SIP",
	"Investments",
	"Loan",
	"Rent",
	"Utilities",
	"Subscriptions",
	"Tax",
	"Salary",
	"Savings"
];
var REMINDER_PRESETS = [
	{
		label: "At time of task",
		minutes: 0
	},
	{
		label: "5 minutes before",
		minutes: 5
	},
	{
		label: "15 minutes before",
		minutes: 15
	},
	{
		label: "30 minutes before",
		minutes: 30
	},
	{
		label: "1 hour before",
		minutes: 60
	},
	{
		label: "1 day before",
		minutes: 1440
	}
];
var CATEGORY_META = {
	personal: {
		label: "Personal",
		short: "Life",
		tone: "personal"
	},
	professional: {
		label: "Professional",
		short: "Work",
		tone: "professional"
	},
	financial: {
		label: "Financial",
		short: "Money",
		tone: "financial"
	}
};
var KINDS = [
	{
		id: "todo",
		label: "Todo",
		icon: ListTodo
	},
	{
		id: "reminder",
		label: "Reminder",
		icon: AlarmClock
	},
	{
		id: "schedule",
		label: "Schedule",
		icon: CalendarDays
	},
	{
		id: "payment",
		label: "Payment",
		icon: Wallet
	},
	{
		id: "goal",
		label: "Goal",
		icon: Target
	},
	{
		id: "note",
		label: "Note",
		icon: NotebookPen
	}
];
function QuickAdd({ open, onClose }) {
	const addTask = useAppStore((s) => s.addTask);
	const addGoal = useAppStore((s) => s.addGoal);
	const navigate = useNavigate();
	const [text, setText] = (0, import_react.useState)("");
	const [kind, setKind] = (0, import_react.useState)("todo");
	const parsed = (0, import_react.useMemo)(() => text.trim() ? parseQuickAdd(text) : null, [text]);
	function save() {
		if (!parsed) return;
		if (kind === "goal") addGoal({
			title: parsed.title,
			description: "",
			category: parsed.category,
			targetDate: parsed.date,
			targetValue: parsed.amount ?? 1,
			currentValue: 0,
			unit: parsed.amount ? "₹" : "steps",
			taskIds: [],
			milestones: []
		});
		else addTask(emptyDraft({
			title: parsed.title,
			kind,
			category: kind === "payment" ? "financial" : parsed.category,
			date: parsed.date,
			time: parsed.time,
			priority: parsed.priority,
			amount: parsed.amount,
			repeat: parsed.repeat,
			reminderOffsets: parsed.reminderOffsets
		}));
		setText("");
		onClose();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open,
		onClose,
		title: "Quick add",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex gap-2 overflow-x-auto no-scrollbar pb-3",
				children: KINDS.map((k) => {
					const Icon = k.icon;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setKind(k.id),
						className: cn("flex h-16 w-[4.6rem] shrink-0 flex-col items-center justify-center gap-1 rounded-2xl text-[11px] font-medium", "transition-[background-color,color] duration-150", kind === k.id ? "bg-accent text-accent-fg" : "bg-elevated text-muted shadow-[var(--elev-border)]"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), k.label]
					}, k.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				autoFocus: true,
				value: text,
				onChange: (e) => setText(e.target.value),
				placeholder: "Call client tomorrow at 10 AM",
				onKeyDown: (e) => {
					if (e.key === "Enter") save();
				}
			}),
			parsed ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-2xl bg-elevated p-4 shadow-[var(--elev-border)]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-lg font-semibold tracking-tight",
					children: parsed.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-wrap gap-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: true,
							children: formatShortDate(parsed.date)
						}),
						parsed.time ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							active: true,
							children: formatTime(parsed.time)
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: parsed.category,
							active: false,
							children: CATEGORY_META[parsed.category].label
						}),
						parsed.amount != null ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							tone: "financial",
							children: ["₹", parsed.amount.toLocaleString("en-IN")]
						}) : null
					]
				})]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-sm text-muted",
				children: "Try: “Pay electricity bill on 5 Sep” or “Team meeting Friday at 3 PM”."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					disabled: !parsed,
					onClick: save,
					children: "Save"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: () => {
						onClose();
						navigate({
							to: "/create",
							search: {
								q: text,
								kind
							}
						});
					},
					children: "Full editor"
				})]
			})
		]
	});
}
function NotificationEngine() {
	const tasks = useAppStore((s) => s.tasks);
	const enabled = useAppStore((s) => s.settings.notificationsEnabled);
	const fired = useAppStore((s) => s.firedReminders);
	const markFired = useAppStore((s) => s.markFired);
	const addNotice = useAppStore((s) => s.addNotice);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			const now = Date.now();
			for (const task of tasks) {
				if (task.status === "completed" || !task.date) continue;
				if (isOverdue(task.date, task.time, task.status)) {
					const key = `overdue:${task.id}:${task.date}`;
					if (!fired.includes(key)) {
						markFired(key);
						addNotice({
							taskId: task.id,
							title: task.title,
							body: "Still waiting for you.",
							kind: "overdue"
						});
					}
				}
				if (!enabled) continue;
				const when = combineDateTime(task.date, task.time);
				if (!when) continue;
				for (const offset of task.reminderOffsets.length ? task.reminderOffsets : [0]) {
					const fireAt = when.getTime() - offset * 6e4;
					const key = `${task.id}:${offset}:${task.date}`;
					if (fired.includes(key)) continue;
					if (now >= fireAt && now - fireAt < 3e5) {
						markFired(key);
						addNotice({
							taskId: task.id,
							title: task.title,
							body: offset === 0 ? "It's time." : `In ${offset} minutes.`,
							kind: offset === 0 ? "due" : "upcoming"
						});
						if ("Notification" in window && Notification.permission === "granted") try {
							new Notification(task.title, { body: offset === 0 ? "It's time." : `Coming up in ${offset} minutes.` });
						} catch {}
					}
				}
			}
		};
		tick();
		const id = window.setInterval(tick, 3e4);
		return () => window.clearInterval(id);
	}, [
		tasks,
		enabled,
		fired,
		markFired,
		addNotice
	]);
	return null;
}
function taskProgress(task) {
	if (task.status === "completed") return 100;
	if (task.subtasks.length === 0) return 0;
	const done = task.subtasks.filter((s) => s.completed).length;
	return Math.round(done / task.subtasks.length * 100);
}
function categoryStats(tasks, category) {
	const list = tasks.filter((t) => t.category === category && isDueToday(t.date));
	const pending = list.filter((t) => t.status !== "completed").length;
	const done = list.filter((t) => t.status === "completed").length;
	const total = list.length;
	return {
		pending,
		done,
		total,
		pct: total === 0 ? 0 : Math.round(done / total * 100)
	};
}
function todayStats(tasks) {
	const todayDated = tasks.filter((t) => isDueToday(t.date));
	const completed = todayDated.filter((t) => t.status === "completed").length;
	const total = todayDated.length;
	const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status)).length;
	const important = todayDated.filter((t) => t.priority === "critical" || t.priority === "high");
	const importantDone = important.filter((t) => t.status === "completed").length;
	return {
		completed,
		total,
		pct: total === 0 ? 0 : Math.round(completed / total * 100),
		overdue,
		importantDone,
		importantTotal: important.length
	};
}
function productivityScore(tasks, habits) {
	const stats = todayStats(tasks);
	let score = 50;
	if (stats.total > 0) score = Math.round(stats.completed / stats.total * 70);
	else score = 72;
	if (stats.importantTotal > 0) score += Math.round(stats.importantDone / stats.importantTotal * 20);
	else score += 10;
	score -= Math.min(20, stats.overdue * 6);
	const today = todayISO();
	const habitHits = habits.filter((h) => h.completions[today]).length;
	if (habits.length > 0) score += Math.round(habitHits / habits.length * 10);
	return Math.max(0, Math.min(100, score));
}
function habitStreak(habit) {
	let streak = 0;
	const d = /* @__PURE__ */ new Date();
	for (let i = 0; i < 400; i++) {
		const iso = toISODate(d);
		if (habit.completions[iso]) {
			streak += 1;
			d.setDate(d.getDate() - 1);
		} else if (i === 0) d.setDate(d.getDate() - 1);
		else break;
	}
	return streak;
}
function goalProgress(goal, tasks) {
	if (goal.targetValue > 0) return Math.max(0, Math.min(100, Math.round(goal.currentValue / goal.targetValue * 100)));
	const related = tasks.filter((t) => t.goalId === goal.id || goal.taskIds.includes(t.id));
	if (related.length === 0) {
		const miles = goal.milestones;
		if (miles.length === 0) return 0;
		return Math.round(miles.filter((m) => m.done).length / miles.length * 100);
	}
	const done = related.filter((t) => t.status === "completed").length;
	return Math.round(done / related.length * 100);
}
function weeklyCompletion(tasks) {
	return Array.from({ length: 7 }, (_, i) => {
		const d = addDays(/* @__PURE__ */ new Date(), i - 6);
		const iso = toISODate(d);
		const dayTasks = tasks.filter((t) => t.date === iso);
		const done = dayTasks.filter((t) => t.status === "completed").length;
		return {
			iso,
			label: d.toLocaleDateString("en-IN", { weekday: "short" }),
			done,
			total: dayTasks.length,
			pct: dayTasks.length === 0 ? 0 : Math.round(done / dayTasks.length * 100)
		};
	});
}
function distribution(tasks) {
	const cats = {
		personal: 0,
		professional: 0,
		financial: 0
	};
	for (const t of tasks) cats[t.category] += 1;
	return cats;
}
function mostProductiveDay(tasks) {
	const map = /* @__PURE__ */ new Map();
	for (const t of tasks) {
		if (t.status !== "completed" || !t.completedAt) continue;
		const day = t.completedAt.slice(0, 10);
		map.set(day, (map.get(day) ?? 0) + 1);
	}
	let best = {
		day: "—",
		count: 0
	};
	for (const [day, count] of map) if (count > best.count) best = {
		day,
		count
	};
	return best;
}
function PlannerModals() {
	const tasks = useAppStore((s) => s.tasks);
	const habits = useAppStore((s) => s.habits);
	const onboarded = useAppStore((s) => s.onboarded);
	const dismissedMorning = useAppStore((s) => s.dismissedMorning);
	const dismissedEvening = useAppStore((s) => s.dismissedEvening);
	const dismissMorning = useAppStore((s) => s.dismissMorning);
	const dismissEvening = useAppStore((s) => s.dismissEvening);
	const postpone = useAppStore((s) => s.postponeUnfinishedToTomorrow);
	const name = useAppStore((s) => s.settings.name);
	const navigate = useNavigate();
	const hour = (/* @__PURE__ */ new Date()).getHours();
	const today = todayISO();
	const showMorning = onboarded && hour < 11 && dismissedMorning !== today;
	const showEvening = onboarded && hour >= 20 && dismissedEvening !== today && !showMorning;
	const stats = (0, import_react.useMemo)(() => todayStats(tasks), [tasks]);
	const personal = categoryStats(tasks, "personal");
	const professional = categoryStats(tasks, "professional");
	const financial = categoryStats(tasks, "financial");
	const score = productivityScore(tasks, habits);
	const top = tasks.filter((t) => isDueToday(t.date) && t.status !== "completed").sort((a, b) => {
		const rank = {
			critical: 4,
			high: 3,
			medium: 2,
			low: 1
		};
		return rank[b.priority] - rank[a.priority];
	}).slice(0, 3);
	const overdue = tasks.filter((t) => isOverdue(t.date, t.time, t.status)).length;
	if (showMorning) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onClose: dismissMorning,
		title: `${greeting()}${name ? `, ${name}` : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Here's your plan for today."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Personal",
						n: personal.total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Work",
						n: professional.total
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Money",
						n: financial.total
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-5 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted",
				children: "Top priorities"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 space-y-2",
				children: top.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted",
					children: "Your schedule is clear."
				}) : top.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "tabular-nums text-subtle",
						children: i + 1
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: t.title
					})]
				}, t.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-6 w-full",
				onClick: () => {
					dismissMorning();
					navigate({ to: "/today" });
				},
				children: ["Start my day", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
			})
		]
	});
	if (showEvening) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, {
		open: true,
		onClose: dismissEvening,
		title: "Day complete",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					stats.completed,
					"/",
					stats.total || 0,
					" tasks · Productivity ",
					score,
					"/100"
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-3 gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Personal",
						n: `${personal.pct}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Work",
						n: `${professional.pct}%`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
						label: "Money",
						n: `${financial.pct}%`
					})
				]
			}),
			overdue > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-sm text-warn",
				children: [overdue, " still waiting — move them if you like."]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-muted",
				children: "You're on track. Rest well."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					variant: "secondary",
					onClick: () => {
						postpone();
						dismissEvening();
					},
					children: "Move leftover to tomorrow"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "flex-1",
					onClick: dismissEvening,
					children: "Close"
				})]
			})
		]
	});
	return null;
}
function Mini({ label, n }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl bg-elevated px-3 py-3 shadow-[var(--elev-border)]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "text-[11px] text-muted",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1 font-display text-xl font-semibold tabular-nums",
			children: n
		})]
	});
}
var NAV = [
	{
		to: "/",
		label: "Home",
		icon: House
	},
	{
		to: "/tasks",
		label: "Tasks",
		icon: ListChecks
	},
	{
		to: "/calendar",
		label: "Calendar",
		icon: CalendarDays
	},
	{
		to: "/goals",
		label: "Goals",
		icon: Target
	},
	{
		to: "/more",
		label: "More",
		icon: Settings2
	}
];
function AppShell({ children, title, action, hideFab = false }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	const unread = useAppStore((s) => s.notices.filter((n) => !n.read).length);
	const [quick, setQuick] = (0, import_react.useState)(false);
	const active = (0, import_react.useMemo)(() => {
		if (path.startsWith("/tasks") || path.startsWith("/task") || path.startsWith("/create")) return "/tasks";
		if (path.startsWith("/calendar") || path.startsWith("/today")) return "/calendar";
		if (path.startsWith("/goals") || path.startsWith("/habits")) return "/goals";
		if (path.startsWith("/more") || path.startsWith("/settings") || path.startsWith("/analytics") || path.startsWith("/personal") || path.startsWith("/professional") || path.startsWith("/financial") || path.startsWith("/backup") || path.startsWith("/ai") || path.startsWith("/notifications") || path.startsWith("/search") || path.startsWith("/widgets")) return "/more";
		return "/";
	}, [path]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative flex min-h-0 flex-1 flex-col",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "flex items-center justify-between gap-3 px-5 pb-2 pt-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-[22px] font-semibold tracking-tight text-fg",
					children: title ?? "Alpha"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-1",
					children: [
						action,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/search",
							"aria-label": "Search",
							className: "relative grid size-11 place-items-center rounded-xl text-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-[18px]" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/notifications",
							"aria-label": "Notifications",
							className: "relative grid size-11 place-items-center rounded-xl text-fg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-[18px]" }), unread > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute right-2 top-2 grid min-w-4 place-items-center rounded-full bg-danger px-1 text-[9px] font-semibold text-bg tabular-nums",
								children: unread > 9 ? "9+" : unread
							}) : null]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "min-h-0 flex-1 overflow-y-auto px-5 pb-28",
				children
			}),
			!hideFab ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Quick add",
				onClick: () => setQuick(true),
				className: "absolute bottom-[5.6rem] right-5 z-30 grid size-14 place-items-center rounded-full bg-accent text-accent-fg shadow-[var(--elev-border)] transition-[scale] duration-150 ease-out active:scale-[0.96]",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-6" })
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "absolute inset-x-0 bottom-0 z-20 border-t border-line bg-surface/92 px-2 pb-[max(10px,env(safe-area-inset-bottom))] pt-1.5 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid grid-cols-5",
					children: NAV.map((item) => {
						const Icon = item.icon;
						const on = active === item.to;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: item.to,
							className: cn("flex flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium", on ? "text-fg" : "text-subtle"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-[20px]",
								strokeWidth: on ? 2.2 : 1.7
							}), item.label]
						}) }, item.to);
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(QuickAdd, {
				open: quick,
				onClose: () => setQuick(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NotificationEngine, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlannerModals, {})
		]
	});
}
function PhoneFrame({ children }) {
	const theme = useAppStore((s) => s.settings.theme);
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const apply = () => {
			if (theme === "system") {
				const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
				root.setAttribute("data-theme", dark ? "dark" : "light");
			} else root.setAttribute("data-theme", theme);
		};
		apply();
		const mq = window.matchMedia("(prefers-color-scheme: dark)");
		mq.addEventListener("change", apply);
		return () => mq.removeEventListener("change", apply);
	}, [theme]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "app-stage grid min-h-dvh place-items-center bg-stage p-0 md:p-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "app-device relative flex h-dvh w-full max-w-[430px] flex-col overflow-hidden bg-bg md:h-[min(844px,calc(100dvh-48px))] md:rounded-[36px] md:shadow-[var(--elev-border)]",
			children
		})
	});
}
function AlphaLogo({ size = 32, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		width: size,
		height: size,
		className,
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "9",
				fill: "currentColor"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M10.2 8.4c.4-1.6 2.6-2.2 5.8-2.2s5.4.6 5.8 2.2c.2.7.2 1.6.2 2.4v5.1c0 2.4 1.5 3.6 1.5 3.6H8.5s1.5-1.2 1.5-3.6V10.8c0-.8 0-1.7.2-2.4Z",
				fill: "none",
				stroke: "var(--accent-fg)",
				strokeWidth: "1.6",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M13.2 22.2c.6 1.4 1.7 2.1 2.8 2.1s2.2-.7 2.8-2.1",
				fill: "none",
				stroke: "var(--accent-fg)",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M7.2 11.2c-1.4.8-2.2 2-2.2 3.4M24.8 11.2c1.4.8 2.2 2 2.2 3.4",
				fill: "none",
				stroke: "var(--accent-fg)",
				strokeWidth: "1.4",
				strokeLinecap: "round",
				opacity: "0.7"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "16",
				cy: "14.2",
				r: "1.15",
				fill: "var(--personal)"
			})
		]
	});
}
function Wordmark({ compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlphaLogo, {
			size: compact ? 28 : 34,
			className: "text-accent"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "leading-none",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-[15px] font-semibold tracking-tight text-fg",
				children: "Alpha"
			}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted",
				children: "Scheduler"
			}) : null]
		})]
	});
}
var styles_default = "/assets/styles-CfW3oWyS.css";
var APP_NAME = "Alpha Scheduler";
var Route$20 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#07080a"
			},
			{
				name: "description",
				content: "Plan better. Remember everything. Get things done."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@500;600;700&display=swap"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
			className: "antialiased",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HydrateGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }) }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
			]
		})]
	});
}
function HydrateGate({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const [splash, setSplash] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const unsub = useAppStore.persist.onFinishHydration(() => setReady(true));
		useAppStore.persist.rehydrate();
		if (useAppStore.persist.hasHydrated()) setReady(true);
		const t = window.setTimeout(() => setSplash(false), 1100);
		return () => {
			unsub();
			window.clearTimeout(t);
		};
	}, []);
	if (!ready || splash) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhoneFrame, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex h-full flex-col items-center justify-center bg-bg px-8 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlphaLogo, {
				size: 64,
				className: "text-accent"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-6 font-display text-3xl font-semibold tracking-tight text-fg",
				children: "Alpha"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted",
				children: "Scheduler"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 max-w-[16rem] text-sm leading-relaxed text-muted",
				children: "Plan better. Remember everything. Get things done."
			})
		]
	}) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var $$splitComponentImporter$19 = () => import("./routes-9UucwtLP.mjs");
var Route$19 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$19, "component") });
var $$splitComponentImporter$18 = () => import("./ai-BNt84uhb.mjs");
var Route$18 = createFileRoute("/ai")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./analytics-BoaRY28G.mjs");
var Route$17 = createFileRoute("/analytics")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./backup-khh6Bb8U.mjs");
var Route$16 = createFileRoute("/backup")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./calendar-DR7kykqU.mjs");
var Route$15 = createFileRoute("/calendar")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./create-DZ7W13dM.mjs");
var Route$14 = createFileRoute("/create")({
	validateSearch: (s) => ({
		q: typeof s.q === "string" ? s.q : void 0,
		kind: s.kind,
		category: s.category,
		date: typeof s.date === "string" ? s.date : void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./financial-CGc9rFPY.mjs");
var Route$13 = createFileRoute("/financial")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./goals-C37IxgxQ.mjs");
var Route$12 = createFileRoute("/goals")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./habits-DRHmIfif.mjs");
var Route$11 = createFileRoute("/habits")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./more-DScABXKx.mjs");
var Route$10 = createFileRoute("/more")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./notifications-BhRPI19o.mjs");
var Route$9 = createFileRoute("/notifications")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./onboarding-C7mBehtj.mjs");
var Route$8 = createFileRoute("/onboarding")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./personal-Bzh3oXiD.mjs");
var Route$7 = createFileRoute("/personal")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./professional-CfWCqtuu.mjs");
var Route$6 = createFileRoute("/professional")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./search-CbzG6Aje.mjs");
var Route$5 = createFileRoute("/search")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./settings-Cp0IiYqW.mjs");
var Route$4 = createFileRoute("/settings")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./tasks-BbI-cVDd.mjs");
var Route$3 = createFileRoute("/tasks")({
	validateSearch: (s) => ({
		filter: s.filter || void 0,
		category: s.category || void 0
	}),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./today-Brj-GsYP.mjs");
var Route$2 = createFileRoute("/today")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./widgets-CGhYfaI1.mjs");
var Route$1 = createFileRoute("/widgets")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./task._id-CUmHpsrG.mjs");
var Route = createFileRoute("/task/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var rootRouteChildren = {
	IndexRoute: Route$19.update({
		id: "/",
		path: "/",
		getParentRoute: () => Route$20
	}),
	AiRoute: Route$18.update({
		id: "/ai",
		path: "/ai",
		getParentRoute: () => Route$20
	}),
	AnalyticsRoute: Route$17.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => Route$20
	}),
	BackupRoute: Route$16.update({
		id: "/backup",
		path: "/backup",
		getParentRoute: () => Route$20
	}),
	CalendarRoute: Route$15.update({
		id: "/calendar",
		path: "/calendar",
		getParentRoute: () => Route$20
	}),
	CreateRoute: Route$14.update({
		id: "/create",
		path: "/create",
		getParentRoute: () => Route$20
	}),
	FinancialRoute: Route$13.update({
		id: "/financial",
		path: "/financial",
		getParentRoute: () => Route$20
	}),
	GoalsRoute: Route$12.update({
		id: "/goals",
		path: "/goals",
		getParentRoute: () => Route$20
	}),
	HabitsRoute: Route$11.update({
		id: "/habits",
		path: "/habits",
		getParentRoute: () => Route$20
	}),
	MoreRoute: Route$10.update({
		id: "/more",
		path: "/more",
		getParentRoute: () => Route$20
	}),
	NotificationsRoute: Route$9.update({
		id: "/notifications",
		path: "/notifications",
		getParentRoute: () => Route$20
	}),
	OnboardingRoute: Route$8.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => Route$20
	}),
	PersonalRoute: Route$7.update({
		id: "/personal",
		path: "/personal",
		getParentRoute: () => Route$20
	}),
	ProfessionalRoute: Route$6.update({
		id: "/professional",
		path: "/professional",
		getParentRoute: () => Route$20
	}),
	SearchRoute: Route$5.update({
		id: "/search",
		path: "/search",
		getParentRoute: () => Route$20
	}),
	SettingsRoute: Route$4.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => Route$20
	}),
	TasksRoute: Route$3.update({
		id: "/tasks",
		path: "/tasks",
		getParentRoute: () => Route$20
	}),
	TodayRoute: Route$2.update({
		id: "/today",
		path: "/today",
		getParentRoute: () => Route$20
	}),
	WidgetsRoute: Route$1.update({
		id: "/widgets",
		path: "/widgets",
		getParentRoute: () => Route$20
	}),
	TaskIdRoute: Route.update({
		id: "/task/$id",
		path: "/task/$id",
		getParentRoute: () => Route$20
	})
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { weekDays as $, PriorityMark as A, formatRelativeDue as B, parseQuickAdd as C, Empty as D, Chip as E, cn as F, isOverdue as G, formatTime as H, daysUntil as I, sortByWhen as J, monthGrid as K, emptyDraft as L, SectionTitle as M, Sheet as N, Field as O, Textarea as P, useAppStore as Q, formatDayHeading as R, insightLine as S, Button as T, greeting as U, formatShortDate as V, isDueToday as W, todayISO as X, toISODate as Y, uid as Z, CATEGORY_META as _, AlphaLogo as a, PROFESSIONAL_SUBS as b, categoryStats as c, habitStreak as d, mostProductiveDay as f, weeklyCompletion as g, todayStats as h, Route$14 as i, ProgressRing as j, Input as k, distribution as l, taskProgress as m, Route as n, Wordmark as o, productivityScore as p, repeatLabel as q, Route$3 as r, AppShell as s, router_exports as t, goalProgress as u, FINANCIAL_SUBS as v, Bar as w, REMINDER_PRESETS as x, PERSONAL_SUBS as y, formatInr as z };
