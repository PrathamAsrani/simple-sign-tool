import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { site } from "@/lib/site";

/** Header, content, footer — and a scroll reset, since this is a single-page app. */
export function SiteLayout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}

/** A blueprint object: hairline box with a + registration mark at each corner. */
export function Blueprint({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative border border-industry-line ${className}`}>
      {[
        "-left-[6px] -top-[6px]",
        "-right-[6px] -top-[6px]",
        "-bottom-[6px] -left-[6px]",
        "-bottom-[6px] -right-[6px]",
      ].map((pos) => (
        <span key={pos} className={`pointer-events-none absolute h-3 w-3 ${pos}`} aria-hidden>
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-industry-ink/50" />
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-industry-ink/50" />
        </span>
      ))}
      {children}
    </div>
  );
}

/** The masthead every text page opens with. */
export function PageHeader({
  kicker,
  title,
  intro,
}: {
  kicker?: string;
  title: string;
  intro?: string;
}) {
  return (
    <div className="border-b border-industry-line bg-industry-surface">
      <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
        {kicker && (
          <p className="font-heading text-[11px] font-semibold uppercase tracking-[0.16em] text-industry-steel700">
            {kicker}
          </p>
        )}
        <h1 className="mt-3 text-4xl font-bold uppercase leading-none tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && <p className="mt-5 text-lg leading-relaxed text-industry-n700">{intro}</p>}
        <p className="mt-6 text-sm text-industry-n600">Last updated: {site.lastUpdated}</p>
      </div>
    </div>
  );
}

/** Body copy for the legal pages: one column, generous measure, hairline rules. */
export function Prose({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div
        className="
          space-y-6 text-[15px] leading-relaxed text-industry-n700
          [&_a]:text-industry-steel700 [&_a]:underline [&_a]:underline-offset-4
          [&_h2]:mb-3 [&_h2]:mt-12 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:uppercase [&_h2]:tracking-wide [&_h2]:text-industry-ink
          [&_h3]:mb-2 [&_h3]:mt-8 [&_h3]:font-heading [&_h3]:text-base [&_h3]:font-semibold [&_h3]:uppercase [&_h3]:tracking-[0.08em] [&_h3]:text-industry-ink
          [&_li]:pl-1 [&_strong]:text-industry-ink
          [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5
        "
      >
        {children}
      </div>
    </div>
  );
}
