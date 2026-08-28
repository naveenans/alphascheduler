export type Category = "personal" | "professional" | "financial";
export type Priority = "critical" | "high" | "medium" | "low";
export type TaskStatus = "pending" | "completed";
export type TaskKind = "todo" | "reminder" | "schedule" | "payment" | "goal" | "note";
export type ThemeMode = "system" | "light" | "dark";
export type RepeatUnit = "day" | "week" | "month" | "year";

export type RepeatRule =
  | { type: "none" }
  | { type: "daily" }
  | { type: "weekdays" }
  | { type: "weekly"; days: number[] }
  | { type: "biweekly" }
  | { type: "monthly"; day: number }
  | { type: "yearly" }
  | { type: "custom"; interval: number; unit: RepeatUnit };

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  notes: string;
  kind: TaskKind;
  category: Category;
  subcategory: string;
  projectId: string | null;
  goalId: string | null;
  date: string | null;
  time: string | null;
  priority: Priority;
  status: TaskStatus;
  reminderOffsets: number[];
  repeat: RepeatRule;
  subtasks: Subtask[];
  isHabit: boolean;
  isDemo: boolean;
  amount: number | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  completions: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

export interface Milestone {
  id: string;
  title: string;
  done: boolean;
}

export interface Goal {
  id: string;
  title: string;
  description: string;
  category: Category;
  targetDate: string | null;
  targetValue: number;
  currentValue: number;
  unit: string;
  taskIds: string[];
  milestones: Milestone[];
  createdAt: string;
}

export interface Habit {
  id: string;
  title: string;
  category: Category;
  days: number[];
  completions: Record<string, boolean>;
  createdAt: string;
  isDemo: boolean;
}

export type NoticeKind = "upcoming" | "due" | "overdue" | "completed";

export interface Notice {
  id: string;
  taskId: string | null;
  title: string;
  body: string;
  kind: NoticeKind;
  read: boolean;
  createdAt: string;
}

export interface Settings {
  theme: ThemeMode;
  weekStartsOn: 0 | 1;
  defaultReminder: number;
  notificationsEnabled: boolean;
  aiEnabled: boolean;
  name: string;
}

export const PERSONAL_SUBS = [
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
  "Daily Habits",
] as const;

export const PROFESSIONAL_SUBS = [
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
  "Learning",
] as const;

export const FINANCIAL_SUBS = [
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
  "Savings",
] as const;

export const REMINDER_PRESETS = [
  { label: "At time of task", minutes: 0 },
  { label: "5 minutes before", minutes: 5 },
  { label: "15 minutes before", minutes: 15 },
  { label: "30 minutes before", minutes: 30 },
  { label: "1 hour before", minutes: 60 },
  { label: "1 day before", minutes: 1440 },
] as const;

export const CATEGORY_META: Record<
  Category,
  { label: string; short: string; tone: string }
> = {
  personal: { label: "Personal", short: "Life", tone: "personal" },
  professional: { label: "Professional", short: "Work", tone: "professional" },
  financial: { label: "Financial", short: "Money", tone: "financial" },
};

export const PRIORITY_META: Record<Priority, { label: string; rank: number }> = {
  critical: { label: "Critical", rank: 4 },
  high: { label: "High", rank: 3 },
  medium: { label: "Medium", rank: 2 },
  low: { label: "Low", rank: 1 },
};
