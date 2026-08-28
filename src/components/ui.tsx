import {
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost" | "danger" | "soft";
  size?: "sm" | "md" | "lg" | "icon";
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium select-none",
        "transition-[scale,background-color,color,opacity] duration-150 ease-out",
        "active:not-disabled:scale-[0.96] disabled:opacity-50",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        size === "sm" && "h-9 rounded-lg px-3 text-sm",
        size === "md" && "h-11 rounded-xl px-4 text-sm",
        size === "lg" && "h-12 rounded-2xl px-5 text-[15px]",
        size === "icon" && "size-11 rounded-xl",
        variant === "primary" && "bg-accent text-accent-fg",
        variant === "secondary" && "bg-elevated text-fg shadow-[var(--elev-border)]",
        variant === "ghost" && "bg-transparent text-fg hover:bg-elevated",
        variant === "danger" && "bg-danger/15 text-danger",
        variant === "soft" && "bg-fg/6 text-fg",
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-11 w-full rounded-xl bg-elevated px-3.5 text-[15px] text-fg shadow-[var(--elev-border)]",
        "placeholder:text-subtle outline-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-24 w-full rounded-xl bg-elevated px-3.5 py-3 text-[15px] text-fg shadow-[var(--elev-border)]",
        "placeholder:text-subtle outline-none resize-none",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
        className,
      )}
      {...props}
    />
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

export function Chip({
  active,
  children,
  onClick,
  tone,
}: {
  active?: boolean;
  children: ReactNode;
  onClick?: () => void;
  tone?: "personal" | "professional" | "financial" | "default";
}) {
  const color =
    tone === "personal"
      ? "text-personal"
      : tone === "professional"
        ? "text-professional"
        : tone === "financial"
          ? "text-financial"
          : "text-fg";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full px-3.5 text-sm font-medium",
        "transition-[background-color,color,scale] duration-150 ease-out active:scale-[0.96]",
        active ? "bg-accent text-accent-fg" : cn("bg-elevated text-muted shadow-[var(--elev-border)]", !active && color),
      )}
    >
      {children}
    </button>
  );
}

export function ProgressRing({
  value,
  size = 56,
  stroke = 5,
  color = "var(--accent)",
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  color?: string;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(100, value)) / 100);
  return (
    <div className="relative inline-grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="color-mix(in oklab, var(--fg) 10%, transparent)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 500ms cubic-bezier(0.22, 1, 0.36, 1)" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

export function Bar({ value, color = "var(--accent)" }: { value: number; color?: string }) {
  return (
    <div className="h-1.5 overflow-hidden rounded-full bg-fg/8">
      <div
        className="h-full rounded-full"
        style={{
          width: `${Math.max(0, Math.min(100, value))}%`,
          background: color,
          transition: "width 400ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />
    </div>
  );
}

export function Empty({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center">
      <h3 className="font-display text-lg font-semibold text-fg">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{body}</p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

export function Sheet({
  open,
  onClose,
  children,
  title,
}: {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex flex-col justify-end">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-bg/60"
        onClick={onClose}
      />
      <div className="relative max-h-[88%] overflow-y-auto rounded-t-[28px] bg-surface px-5 pb-8 pt-3 shadow-[var(--elev-border)]">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-fg/15" />
        {title ? (
          <h2 className="mb-4 font-display text-xl font-semibold tracking-tight">{title}</h2>
        ) : null}
        {children}
      </div>
    </div>
  );
}

export function PriorityMark({ priority }: { priority: "critical" | "high" | "medium" | "low" }) {
  const color =
    priority === "critical"
      ? "bg-danger"
      : priority === "high"
        ? "bg-warn"
        : priority === "medium"
          ? "bg-professional"
          : "bg-ok";
  return <span className={cn("size-2 shrink-0 rounded-full", color)} aria-hidden />;
}

export function SectionTitle({ children, action }: { children: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-3">
      <h2 className="font-display text-[17px] font-semibold tracking-tight">{children}</h2>
      {action}
    </div>
  );
}
