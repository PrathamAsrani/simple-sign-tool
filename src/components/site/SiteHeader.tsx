import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Lockup } from "./Mark";

const nav = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About" },
  { to: "/support", label: "Support" },
  { to: "/privacy", label: "Privacy" },
  { to: "/terms", label: "Terms" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    [
      "font-heading text-[13px] font-semibold uppercase tracking-[0.1em] transition-colors",
      isActive ? "text-industry-steel700" : "text-industry-n700 hover:text-industry-ink",
    ].join(" ");

  return (
    <header className="sticky top-0 z-40 border-b border-industry-line bg-industry-bg/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link to="/" onClick={() => setOpen(false)}>
          <Lockup size={30} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end} className={linkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Menu"
          className="flex h-11 w-11 items-center justify-center border border-industry-line md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <>
                <path d="M18 6 6 18" />
                <path d="M6 6l12 12" />
              </>
            ) : (
              <>
                <path d="M3 7h18" />
                <path d="M3 17h18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-industry-line md:hidden">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                [
                  "block border-b border-industry-line px-5 py-4 font-heading text-[13px] font-semibold uppercase tracking-[0.1em]",
                  isActive ? "text-industry-steel700" : "text-industry-n700",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}
