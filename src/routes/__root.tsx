import { type ReactNode, useEffect, useState } from "react";
import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { PhoneFrame } from "@/components/app-shell";
import { AlphaLogo } from "@/components/logo";
import { useAppStore } from "@/lib/store";
import appCss from "../styles.css?url";

const APP_NAME = "Alpha Scheduler";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: APP_NAME },
      { name: "theme-color", content: "#07080a" },
      {
        name: "description",
        content: "Plan better. Remember everything. Get things done.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700&family=Syne:wght@500;600;700&display=swap",
      },
    ],
  }),
  component: Root,
});

function Root() {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="antialiased">
        <PreviewHostBridge />
        <AuthProvider>
          <HydrateGate>
            <PhoneFrame>
              <Outlet />
            </PhoneFrame>
          </HydrateGate>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}

function HydrateGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [splash, setSplash] = useState(true);

  useEffect(() => {
    const unsub = useAppStore.persist.onFinishHydration(() => setReady(true));
    void useAppStore.persist.rehydrate();
    if (useAppStore.persist.hasHydrated()) setReady(true);
    const t = window.setTimeout(() => setSplash(false), 1100);
    return () => {
      unsub();
      window.clearTimeout(t);
    };
  }, []);

  if (!ready || splash) {
    return (
      <PhoneFrame>
        <div className="flex h-full flex-col items-center justify-center bg-bg px-8 text-center">
          <AlphaLogo size={64} className="text-accent" />
          <h1 className="mt-6 font-display text-3xl font-semibold tracking-tight text-fg">
            Alpha
          </h1>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">
            Scheduler
          </p>
          <p className="mt-8 max-w-[16rem] text-sm leading-relaxed text-muted">
            Plan better. Remember everything. Get things done.
          </p>
        </div>
      </PhoneFrame>
    );
  }
  return <>{children}</>;
}
