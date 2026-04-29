"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Dumbbell, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { label: "Paths", href: "/paths" },
  { label: "Guides", href: "/guides" },
  { label: "Videos", href: "/videos" },
] as const;

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function Nav() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    logout();
    setDropdownOpen(false);
    router.push("/");
  }

  return (
    <header className="relative z-50">
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

        {/* Desktop CTA — auth-aware */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {!isLoading && (
            user ? (
              /* Logged-in: avatar dropdown */
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "6px 10px 6px 6px",
                    background: "var(--fp-surface)",
                    border: "1px solid var(--fp-border-2)",
                    borderRadius: 10,
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = "rgba(170,168,255,0.3)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--fp-border-2)")}
                >
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      background: "var(--fp-accent)",
                      color: "var(--fp-black)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 11,
                      fontWeight: 800,
                      fontFamily: "var(--font-dm-sans), sans-serif",
                    }}
                  >
                    {getInitials(user.name)}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fp-text)", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <ChevronDown size={13} color="var(--fp-text-muted)" style={{ transition: "transform 0.2s", transform: dropdownOpen ? "rotate(180deg)" : "rotate(0deg)" }} />
                </button>

                {dropdownOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      right: 0,
                      minWidth: 200,
                      background: "var(--fp-surface)",
                      border: "1px solid var(--fp-border-2)",
                      borderRadius: 14,
                      padding: "8px",
                      boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
                      zIndex: 100,
                    }}
                  >
                    <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid var(--fp-border)", marginBottom: 6 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: "var(--fp-white)", marginBottom: 2 }}>{user.name}</p>
                      <p style={{ fontSize: 12, color: "var(--fp-text-muted)" }}>{user.email}</p>
                    </div>
                    <Link
                      href="/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "var(--fp-text)",
                        textDecoration: "none",
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <LayoutDashboard size={14} color="var(--fp-text-muted)" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        padding: "10px 12px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#f87171",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        width: "100%",
                        textAlign: "left",
                        transition: "background 0.15s",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <LogOut size={14} />
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged-out: Login + Sign Up */
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium transition-opacity hover:opacity-100"
                  style={{ color: "var(--fp-text-muted)" }}
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex items-center px-5 py-2 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                  style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
                >
                  Sign up free
                </Link>
              </>
            )
          )}
        </div>

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

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden border-t"
          style={{
            backgroundColor: "var(--fp-black)",
            backdropFilter: "blur(12px)",
            borderColor: "var(--fp-border)",
          }}
        >
          <div className="fp-container py-6 flex flex-col gap-5">
            <ThemeToggle />
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

            {!isLoading && (
              user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="text-base font-medium"
                    style={{ color: "var(--fp-text)" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => { handleLogout(); setMenuOpen(false); }}
                    style={{
                      textAlign: "left",
                      fontSize: 16,
                      fontWeight: 500,
                      color: "#f87171",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      padding: 0,
                    }}
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="text-base font-medium"
                    style={{ color: "var(--fp-text)" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Log in
                  </Link>
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl w-full"
                    style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
                    onClick={() => setMenuOpen(false)}
                  >
                    Sign up free
                  </Link>
                </>
              )
            )}
          </div>
        </div>
      )}
    </header>
  );
}
