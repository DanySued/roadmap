"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import ThemeToggle from "./ThemeToggle";
import { EASE_OUT } from "@/lib/motion";

const NAV_ITEMS = [
  { label: "Paths", href: "/paths" },
  { label: "Guides", href: "/guides" },
  { label: "Videos", href: "/videos" },
] as const;

function getInitials(name: string) {
  return name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
}

const MotionLink = motion(Link);

export default function Nav() {
  const { user, logout, isLoading } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <motion.header
      className="sticky top-0 z-50"
      animate={{
        backgroundColor: scrolled ? "rgba(3,2,3,0.82)" : "rgba(3,2,3,0)",
        backdropFilter: scrolled ? "blur(20px) saturate(180%)" : "blur(0px) saturate(100%)",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.07)" : "1px solid rgba(255,255,255,0)",
      }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
    >
      <div className="fp-container flex items-center justify-between h-16">
        {/* Logo */}
        <MotionLink
          href="/"
          className="flex items-center gap-2.5"
          whileHover={{ opacity: 0.8 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
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
            whileHover={{ scale: 1.08, rotate: -6 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
          >
            <Dumbbell size={18} strokeWidth={2} />
          </motion.div>
          <span style={{ fontWeight: 700, fontSize: 17, letterSpacing: "-0.3px", color: "var(--fp-white)", fontFamily: "var(--font-dm-sans), sans-serif" }}>
            FitPath
          </span>
        </MotionLink>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <MotionLink
              key={item.label}
              href={item.href}
              className="relative text-sm font-medium py-1"
              style={{ color: "var(--fp-text-muted)" }}
              initial="rest"
              whileHover="hover"
              animate="rest"
            >
              <motion.span
                variants={{ rest: { color: "var(--fp-text-muted)" }, hover: { color: "var(--fp-white)" } }}
                transition={{ duration: 0.15 }}
              >
                {item.label}
              </motion.span>
              <motion.span
                variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  height: 1,
                  background: "var(--fp-accent)",
                  transformOrigin: "left",
                  display: "block",
                }}
              />
            </MotionLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          {!isLoading && (
            user ? (
              <div ref={dropdownRef} style={{ position: "relative" }}>
                <motion.button
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
                  }}
                  whileHover={{ borderColor: "rgba(170,168,255,0.3)" }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                >
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--fp-accent)", color: "var(--fp-black)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                    {getInitials(user.name)}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "var(--fp-text)", maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {user.name.split(" ")[0]}
                  </span>
                  <motion.span animate={{ rotate: dropdownOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown size={13} color="var(--fp-text-muted)" />
                  </motion.span>
                </motion.button>

                <AnimatePresence>
                  {dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                      style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, minWidth: 200, background: "var(--fp-surface)", border: "1px solid var(--fp-border-2)", borderRadius: 14, padding: "8px", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", zIndex: 100 }}
                    >
                      <div style={{ padding: "10px 12px 12px", borderBottom: "1px solid var(--fp-border)", marginBottom: 6 }}>
                        <p style={{ fontSize: 13, fontWeight: 700, color: "var(--fp-white)", marginBottom: 2 }}>{user.name}</p>
                        <p style={{ fontSize: 12, color: "var(--fp-text-muted)" }}>{user.email}</p>
                      </div>
                      <Link href="/dashboard" onClick={() => setDropdownOpen(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "var(--fp-text)", textDecoration: "none", transition: "background 0.15s" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.05)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <LayoutDashboard size={14} color="var(--fp-text-muted)" />
                        Dashboard
                      </Link>
                      <button onClick={handleLogout} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 8, fontSize: 13, fontWeight: 500, color: "#f87171", background: "transparent", border: "none", cursor: "pointer", width: "100%", textAlign: "left", transition: "background 0.15s", fontFamily: "var(--font-dm-sans), sans-serif" }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(239,68,68,0.06)")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                      >
                        <LogOut size={14} />
                        Sign out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <MotionLink
                  href="/login"
                  className="text-sm font-medium"
                  style={{ color: "var(--fp-text-muted)" }}
                  whileHover={{ color: "var(--fp-white)" }}
                  transition={{ duration: 0.15 }}
                >
                  Log in
                </MotionLink>
                <MotionLink
                  href="/signup"
                  className="inline-flex items-center px-5 py-2 text-sm font-semibold rounded-xl"
                  style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
                  whileHover={{ scale: 1.04, boxShadow: "0 0 20px rgba(170,168,255,0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                >
                  Sign up free
                </MotionLink>
              </>
            )
          )}
        </div>

        {/* Mobile hamburger */}
        <motion.button
          className="md:hidden p-2 -mr-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          whileTap={{ scale: 0.9 }}
        >
          <motion.span
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 5 : 0 }}
            transition={{ duration: 0.2 }}
            className="block w-5 h-px mb-1.5"
            style={{ backgroundColor: "var(--fp-text)" }}
          />
          <motion.span
            animate={{ opacity: menuOpen ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="block w-5 h-px mb-1.5"
            style={{ backgroundColor: "var(--fp-text)" }}
          />
          <motion.span
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -5 : 0, width: menuOpen ? "20px" : "12px" }}
            transition={{ duration: 0.2 }}
            className="block h-px"
            style={{ backgroundColor: "var(--fp-text)", width: 12 }}
          />
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT }}
            style={{ overflow: "hidden" }}
            className="md:hidden border-t"
          >
            <div className="fp-container py-6 flex flex-col gap-5" style={{ borderColor: "var(--fp-border)", backgroundColor: "var(--fp-black)" }}>
              <ThemeToggle />
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25, ease: EASE_OUT }}
                >
                  <Link href={item.href} className="text-base font-medium" style={{ color: "var(--fp-text)" }} onClick={() => setMenuOpen(false)}>
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              {!isLoading && (
                user ? (
                  <>
                    <Link href="/dashboard" className="text-base font-medium" style={{ color: "var(--fp-text)" }} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <button onClick={() => { handleLogout(); setMenuOpen(false); }} style={{ textAlign: "left", fontSize: 16, fontWeight: 500, color: "#f87171", background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-dm-sans), sans-serif", padding: 0 }}>
                      Sign out
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/login" className="text-base font-medium" style={{ color: "var(--fp-text-muted)" }} onClick={() => setMenuOpen(false)}>Log in</Link>
                    <Link href="/signup" className="inline-flex items-center justify-center px-6 py-3 text-sm font-semibold rounded-xl w-full" style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }} onClick={() => setMenuOpen(false)}>
                      Sign up free
                    </Link>
                  </>
                )
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
