import { addDays, format, nextDay, type Day } from "date-fns";
import type { Category, Priority, RepeatRule, TaskKind } from "./types";
import { todayISO, toISODate } from "./date";

export interface ParsedQuickAdd {
  title: string;
  date: string | null;
  time: string | null;
  category: Category;
  priority: Priority;
  kind: TaskKind;
  amount: number | null;
  repeat: RepeatRule;
  reminderOffsets: number[];
  confidence: number;
}

const PERSONAL_WORDS =
  /\b(gym|walk|grocery|groceries|parents|family|birthday|doctor|dentist|home|hobby|read|water|meditat|yoga|shop|flight|gift|school|class|habit|exercise|run|sleep)\b/i;
const WORK_WORDS =
  /\b(client|meeting|project|email|deadline|report|quotation|review|standup|call|follow[- ]?up|team|presentation|invoice|proposal|sprint)\b/i;
const MONEY_WORDS =
  /\b(bill|emi|sip|insurance|rent|tax|salary|loan|card|payment|subscription|electricity|premium|invest|savings|credit)\b/i;

const WEEKDAYS: Record<string, Day> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

function parseTime(text: string): { time: string | null; rest: string } {
  const m =
    text.match(/\b(?:at\s*)?(\d{1,2})(?::(\d{2}))\s*(am|pm)?\b/i) ||
    text.match(/\b(?:at\s*)?(\d{1,2})\s*(am|pm)\b/i);
  if (!m) {
    if (/\bnoon\b/i.test(text)) return { time: "12:00", rest: text.replace(/\bnoon\b/i, "") };
    if (/\bmidnight\b/i.test(text))
      return { time: "00:00", rest: text.replace(/\bmidnight\b/i, "") };
    if (/\bevening\b/i.test(text))
      return { time: "18:00", rest: text.replace(/\bevening\b/i, "") };
    return { time: null, rest: text };
  }
  let h = Number(m[1]);
  const min = m[2] && /^\d{2}$/.test(m[2]) ? Number(m[2]) : 0;
  const suffix = (m[3] || "").toLowerCase();
  if (suffix === "pm" && h < 12) h += 12;
  if (suffix === "am" && h === 12) h = 0;
  const time = `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  return { time, rest: text.replace(m[0], "") };
}

function parseDatePart(text: string): { date: string | null; rest: string } {
  const now = new Date();
  if (/\btoday\b/i.test(text)) return { date: todayISO(), rest: text.replace(/\btoday\b/i, "") };
  if (/\btomorrow\b/i.test(text))
    return { date: toISODate(addDays(now, 1)), rest: text.replace(/\btomorrow\b/i, "") };
  if (/\btonight\b/i.test(text))
    return { date: todayISO(), rest: text.replace(/\btonight\b/i, "") };
  if (/\bnext week\b/i.test(text))
    return { date: toISODate(addDays(now, 7)), rest: text.replace(/\bnext week\b/i, "") };

  const inDays = text.match(/\bin\s+(\d+)\s+days?\b/i);
  if (inDays)
    return {
      date: toISODate(addDays(now, Number(inDays[1]))),
      rest: text.replace(inDays[0], ""),
    };

  for (const [name, day] of Object.entries(WEEKDAYS)) {
    const re = new RegExp(`\\b(?:on\\s+)?(?:next\\s+)?${name}\\b`, "i");
    if (re.test(text)) {
      const d = nextDay(now, day);
      return { date: toISODate(d), rest: text.replace(re, "") };
    }
  }

  const named = text.match(
    /\b(\d{1,2})(?:st|nd|rd|th)?\s+(jan(?:uary)?|feb(?:ruary)?|mar(?:ch)?|apr(?:il)?|may|jun(?:e)?|jul(?:y)?|aug(?:ust)?|sep(?:t|tember)?|oct(?:ober)?|nov(?:ember)?|dec(?:ember)?)\b/i,
  );
  if (named) {
    const months: Record<string, string> = {
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
      dec: "12",
    };
    const mon = months[named[2]!.slice(0, 3).toLowerCase()]!;
    const day = String(named[1]).padStart(2, "0");
    const year = now.getFullYear();
    let iso = `${year}-${mon}-${day}`;
    if (iso < todayISO()) iso = `${year + 1}-${mon}-${day}`;
    return { date: iso, rest: text.replace(named[0], "") };
  }

  return { date: null, rest: text };
}

function parseAmount(text: string): { amount: number | null; rest: string } {
  const m =
    text.match(/(?:₹|rs\.?\s*)\s*([\d,]+)(?:\s*\/-)?/i) ||
    text.match(/\b(\d{3,})\s*(?:rupees|inr)\b/i);
  if (!m) return { amount: null, rest: text };
  const amount = Number(m[1]!.replace(/,/g, ""));
  return { amount: Number.isFinite(amount) ? amount : null, rest: text.replace(m[0], "") };
}

function parseRepeat(text: string): RepeatRule {
  if (/\bevery\s+day|daily\b/i.test(text)) return { type: "daily" };
  if (/\bweekdays?|every weekday\b/i.test(text)) return { type: "weekdays" };
  if (/\bevery\s+year|yearly|annually\b/i.test(text)) return { type: "yearly" };
  if (/\bevery\s+month|monthly\b/i.test(text)) return { type: "monthly", day: new Date().getDate() };
  if (/\bevery\s+2\s+weeks|biweekly|fortnight\b/i.test(text)) return { type: "biweekly" };
  const wd = text.match(
    /\bevery\s+(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/i,
  );
  if (wd) return { type: "weekly", days: [WEEKDAYS[wd[1]!.toLowerCase()]!] };
  return { type: "none" };
}

function parsePriority(text: string): Priority {
  if (/\b(critical|urgent|asap)\b/i.test(text)) return "critical";
  if (/\b(high priority|important)\b/i.test(text)) return "high";
  if (/\blow priority|whenever\b/i.test(text)) return "low";
  return "medium";
}

function parseKind(text: string, category: Category): TaskKind {
  if (/\bpay|payment|emi|bill|sip\b/i.test(text) || category === "financial") return "payment";
  if (/\bremind\b/i.test(text)) return "reminder";
  if (/\bgoal|save|target\b/i.test(text)) return "goal";
  if (/\bnote\b/i.test(text)) return "note";
  if (/\bschedule|meeting|appointment\b/i.test(text)) return "schedule";
  return "todo";
}

function guessCategory(text: string, amount: number | null): Category {
  if (amount != null || MONEY_WORDS.test(text)) return "financial";
  if (WORK_WORDS.test(text)) return "professional";
  if (PERSONAL_WORDS.test(text)) return "personal";
  return "personal";
}

export function parseQuickAdd(raw: string): ParsedQuickAdd {
  let text = raw.trim();
  const { time, rest: afterTime } = parseTime(text);
  text = afterTime;
  const { date, rest: afterDate } = parseDatePart(text);
  text = afterDate;
  const { amount, rest: afterAmt } = parseAmount(text);
  text = afterAmt;
  const repeat = parseRepeat(text);
  text = text.replace(
    /\b(every day|daily|weekdays?|every weekday|every year|yearly|annually|every month|monthly|every 2 weeks|biweekly|fortnight|every (monday|tuesday|wednesday|thursday|friday|saturday|sunday)|today|tomorrow|tonight|next week|at|on)\b/gi,
    "",
  );
  const priority = parsePriority(text);
  text = text.replace(
    /\b(critical|urgent|asap|high priority|important|low priority|whenever)\b/gi,
    "",
  );
  const category = guessCategory(raw, amount);
  const kind = parseKind(raw, category);

  const title =
    text
      .replace(/[,\-–]+/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .replace(/^\w/, (c) => c.toUpperCase()) || raw.trim();

  let confidence = 0.4;
  if (date) confidence += 0.2;
  if (time) confidence += 0.15;
  if (amount != null) confidence += 0.1;
  if (title.length > 2) confidence += 0.15;

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
    confidence: Math.min(1, confidence),
  };
}

export function insightLine(opts: {
  completed: number;
  total: number;
  importantDone: number;
  importantTotal: number;
}) {
  const { completed, total, importantDone, importantTotal } = opts;
  if (total === 0)
    return "Your schedule is clear. Enjoy the extra time, or plan something that matters.";
  if (completed === total) return "Beautiful close. Everything you planned is done.";
  if (importantTotal > 0 && importantDone === importantTotal)
    return `Great job. You finished ${importantDone} of ${importantTotal} important tasks.`;
  if (completed > 0)
    return `You're on track. ${completed} of ${total} done — one more and the day tilts in your favour.`;
  return "Let's make today count. Start with the first important task.";
}

export function formatDraftPreview(p: ParsedQuickAdd) {
  const bits = [p.title];
  if (p.date) bits.push(p.date === format(new Date(), "yyyy-MM-dd") ? "Today" : p.date);
  if (p.time) bits.push(p.time);
  bits.push(p.category);
  return bits.join(" · ");
}
