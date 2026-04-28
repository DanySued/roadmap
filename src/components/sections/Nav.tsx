"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Dumbbell } from "lucide-react";

const NAV_ITEMS = [
  { label: "Paths", href: "/paths" },
  { label: "Guides", href: "/paths" },
  { label: "Videos", href: "/paths" },
] as const;

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const next = window.scrollY > 10;
      setScrolled((prev) => (prev === next ? prev : next));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed top-11 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(3,2,3,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--fp-border)" : "none",
      }}
    >
      <div className="fp-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <div
            style={{
              width: 32,
              height: 32,
              background: "var(--fp-accent)",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--fp-black)",
            }}
          >
            <Dumbbell size={18} strokeWidth={2} />
          </div>
          <span
            style={{
              fontWeight: 700,
              fontSize: 17,
              letterSpacing: "-0.3px",
              color: "var(--fp-white)",
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}
          >
            FitPath
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium transition-opacity hover:opacity-100"
              style={{ color: "var(--fp-text-muted)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <Link
            href="/paths"
            className="hidden md:inline-flex items-center px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
            style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
          >
            Browse Paths
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className="block w-5 h-px mb-1.5" style={{ backgroundColor: "var(--fp-text)" }} />
            <span className="block w-5 h-px mb-1.5" style={{ backgroundColor: "var(--fp-text)" }} />
            <span className="block w-3 h-px" style={{ backgroundColor: "var(--fp-text)" }} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "rgba(3,2,3,0.97)",
            backdropFilter: "blur(12px)",
            borderColor: "var(--fp-border)",
          }}
        >
          <div className="fp-container py-6 flex flex-col gap-5">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-base font-medium"
                style={{ color: "var(--fp-text)" }}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/paths"
              className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl w-full"
              style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
              onClick={() => setMenuOpen(false)}
            >
              Browse Paths
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
