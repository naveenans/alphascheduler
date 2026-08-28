import { useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { BellRing, Briefcase, CalendarCheck, Wallet } from "lucide-react";
import { AlphaLogo } from "@/components/logo";
import { Button, Input } from "@/components/ui";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({ component: Onboarding });

const STEPS = [
  {
    title: "Organize your life",
    body: "Everything important, in one calm place — personal, work, and money.",
    icon: BellRing,
  },
  {
    title: "Plan your work",
    body: "Stay ahead of deadlines, meetings, and the projects that actually matter.",
    icon: Briefcase,
  },
  {
    title: "Never miss a payment",
    body: "Keep EMIs, bills, and subscriptions in view. Reminders only — never credentials.",
    icon: Wallet,
  },
  {
    title: "Ready to begin?",
    body: "A few sample tasks will show you the ropes. Remove them whenever you like.",
    icon: CalendarCheck,
  },
];

function Onboarding() {
  const onboarded = useAppStore((s) => s.onboarded);
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const complete = useAppStore((s) => s.completeOnboarding);
  const skip = useAppStore((s) => s.skipOnboarding);
  const navigate = useNavigate();
  const s = STEPS[step]!;
  const Icon = s.icon;
  const last = step === STEPS.length - 1;

  if (onboarded) return <Navigate to="/" />;

  function finish(seed: boolean) {
    complete(name, seed);
    navigate({ to: "/" });
  }

  return (
    <div className="flex h-full flex-col bg-bg px-6 pb-8 pt-10">
      <div className="flex items-center justify-between">
        <AlphaLogo size={36} className="text-accent" />
        <button
          type="button"
          className="h-11 px-2 text-sm text-muted"
          onClick={() => {
            skip();
            navigate({ to: "/" });
          }}
        >
          Skip
        </button>
      </div>
      <div className="flex flex-1 flex-col justify-center">
        <div className="grid size-16 place-items-center rounded-3xl bg-elevated text-fg shadow-[var(--elev-border)]">
          <Icon className="size-7" />
        </div>
        <h1 className="mt-8 font-display text-[32px] font-semibold leading-tight tracking-tight">
          {s.title}
        </h1>
        <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{s.body}</p>
        {last ? (
          <div className="mt-8">
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="What should we call you?"
            />
          </div>
        ) : null}
      </div>
      <div className="flex items-center gap-2">
        {STEPS.map((_, i) => (
          <span
            key={i}
            className="h-1 flex-1 rounded-full"
            style={{
              background:
                i <= step ? "var(--fg)" : "color-mix(in oklab, var(--fg) 15%, transparent)",
            }}
          />
        ))}
      </div>
      <div className="mt-6 flex gap-2">
        {step > 0 ? (
          <Button variant="secondary" className="flex-1" onClick={() => setStep((n) => n - 1)}>
            Back
          </Button>
        ) : null}
        {last ? (
          <Button className="flex-1" onClick={() => finish(true)}>
            Create my first plan
          </Button>
        ) : (
          <Button className="flex-1" onClick={() => setStep((n) => n + 1)}>
            Continue
          </Button>
        )}
      </div>
    </div>
  );
}
