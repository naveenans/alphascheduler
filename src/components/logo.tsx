export function AlphaLogo({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="9" fill="currentColor" />
      <path
        d="M10.2 8.4c.4-1.6 2.6-2.2 5.8-2.2s5.4.6 5.8 2.2c.2.7.2 1.6.2 2.4v5.1c0 2.4 1.5 3.6 1.5 3.6H8.5s1.5-1.2 1.5-3.6V10.8c0-.8 0-1.7.2-2.4Z"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M13.2 22.2c.6 1.4 1.7 2.1 2.8 2.1s2.2-.7 2.8-2.1"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M7.2 11.2c-1.4.8-2.2 2-2.2 3.4M24.8 11.2c1.4.8 2.2 2 2.2 3.4"
        fill="none"
        stroke="var(--accent-fg)"
        strokeWidth="1.4"
        strokeLinecap="round"
        opacity="0.7"
      />
      <circle cx="16" cy="14.2" r="1.15" fill="var(--personal)" />
    </svg>
  );
}

export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <AlphaLogo size={compact ? 28 : 34} className="text-accent" />
      <div className="leading-none">
        <div className="font-display text-[15px] font-semibold tracking-tight text-fg">
          Alpha
        </div>
        {!compact ? (
          <div className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
            Scheduler
          </div>
        ) : null}
      </div>
    </div>
  );
}
