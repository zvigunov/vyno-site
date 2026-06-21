"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";

const links = [
  { label: "Funcționalități", href: "#features" },
  { label: "Devino partener", href: "/partners" },
  { label: "Premium", href: "/premium" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        background: "rgba(250,246,238,0.92)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(13,13,13,0.07)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <Logo size="sm" variant="light" />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="nav-link">
              {l.label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          <span
            className="block w-5 h-px transition-all"
            style={{
              background: "#0D0D0D",
              transform: open ? "rotate(45deg) translate(2px, 4px)" : "none",
            }}
          />
          <span
            className="block w-5 h-px transition-all"
            style={{ background: "#0D0D0D", opacity: open ? 0 : 1 }}
          />
          <span
            className="block w-5 h-px transition-all"
            style={{
              background: "#0D0D0D",
              transform: open ? "rotate(-45deg) translate(2px, -4px)" : "none",
            }}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden border-t flex flex-col px-6 py-4 gap-4"
          style={{
            borderColor: "rgba(13,13,13,0.07)",
            background: "rgba(250,246,238,0.97)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm no-underline"
              style={{ color: "rgba(13,13,13,0.65)" }}
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
