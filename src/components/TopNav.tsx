"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { Dot } from "./Dot";

const links = [
  { href: "/", label: "BRIEF" },
  { href: "/financial", label: "FINANCIAL" },
  { href: "/dashboard/sales", label: "SALES VIEW" },
  { href: "/dashboard/owner", label: "OWNER VIEW" },
];

export function TopNav() {
  const pathname = usePathname() ?? "/";
  const normalized = pathname.replace(/\/$/, "") || "/";

  return (
    <header className="sticky top-0 z-30 border-b border-ink-border bg-ink-bg/95 backdrop-blur">
      <div className="max-w-[1180px] mx-auto px-9 py-3 flex items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div>
            <div className="font-display text-[14px] font-extrabold tracking-tight leading-none">
              VISIBLE EDGE
            </div>
            <div className="font-mono text-[8.5px] uppercase tracking-[0.22em] text-white/70 mt-1 font-semibold">
              Lead Operations / CMMC Vertical
            </div>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {links.map((l) => {
            const active =
              l.href === "/"
                ? normalized === "/"
                : normalized === l.href || normalized.startsWith(l.href + "/");
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.18em] font-bold rounded-sm transition-colors ${
                  active
                    ? "bg-accent-amber/10 text-accent-amber border border-accent-amber/30"
                    : "text-white/70 hover:text-white border border-transparent hover:bg-white/5"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="font-mono text-[10px] tabular flex items-center gap-2 text-white/70">
          <span className="font-bold">RUN</span>
          <span className="text-emerald-400 font-bold">LIVE</span>
          <Dot status="green" />
        </div>
      </div>
    </header>
  );
}
