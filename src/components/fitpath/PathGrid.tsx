"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { PATHS, ALL_PATHS, CATEGORY_LABELS, type PathCategory } from "@/lib/data/paths";
import { EASE_OUT } from "@/lib/motion";
import PathCard from "./PathCard";

export default function PathGrid() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<PathCategory | "all">("all");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const q = query.toLowerCase();

  const filteredPaths =
    activeCategory === "all"
      ? ALL_PATHS.filter((p) => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
      : PATHS[activeCategory].filter((p) => p.title.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q));

  const categories: Array<{ key: PathCategory | "all"; label: string }> = [
    { key: "all", label: "All Paths" },
    { key: "role", label: CATEGORY_LABELS.role },
    { key: "skill", label: CATEGORY_LABELS.skill },
    { key: "bestpractices", label: CATEGORY_LABELS.bestpractices },
  ];

  return (
    <div>
      {/* Search + filters */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 32 }}>
        {/* Search input */}
        <motion.div
          style={{ position: "relative", flex: "1 1 260px", maxWidth: 440 }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        >
          <Search size={16} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--fp-text-muted)" }} />
          <motion.input
            ref={searchRef}
            type="text"
            placeholder="Search paths…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              background: "var(--fp-surface)",
              border: "1px solid var(--fp-border)",
              borderRadius: 10,
              padding: "10px 14px 10px 40px",
              fontSize: 14,
              color: "var(--fp-text)",
              outline: "none",
              transition: "border-color 0.15s, box-shadow 0.15s",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "var(--fp-accent)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(170,168,255,0.12)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "var(--fp-border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <span style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", fontSize: 11, color: "var(--fp-text-muted)", pointerEvents: "none", fontFamily: "var(--font-geist-mono), monospace" }}>
            ⌘K
          </span>
        </motion.div>

        {/* Category tabs with sliding indicator */}
        <motion.div
          style={{ display: "flex", gap: 6, flexWrap: "wrap" }}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.06, ease: EASE_OUT }}
        >
          {categories.map(({ key, label }) => {
            const active = activeCategory === key;
            return (
              <motion.button
                key={key}
                onClick={() => setActiveCategory(key)}
                style={{
                  position: "relative",
                  padding: "8px 14px",
                  borderRadius: 8,
                  fontSize: 13,
                  fontWeight: 500,
                  border: "1px solid transparent",
                  background: "transparent",
                  color: active ? "var(--fp-accent)" : "var(--fp-text-muted)",
                  cursor: "pointer",
                  fontFamily: "var(--font-dm-sans), sans-serif",
                  zIndex: 0,
                }}
                whileHover={{ color: active ? "var(--fp-accent)" : "var(--fp-text)" }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.15 }}
              >
                {active && (
                  <motion.span
                    layoutId="tab-pill"
                    style={{
                      position: "absolute",
                      inset: 0,
                      borderRadius: 8,
                      background: "rgba(170,168,255,0.1)",
                      border: "1px solid rgba(170,168,255,0.28)",
                      zIndex: -1,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {label}
              </motion.button>
            );
          })}
        </motion.div>
      </div>

      {/* Results count */}
      <AnimatePresence mode="wait">
        {query && (
          <motion.p
            key={query}
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 13, color: "var(--fp-text-muted)", marginBottom: 20 }}
          >
            {filteredPaths.length} result{filteredPaths.length !== 1 ? "s" : ""} for &quot;{query}&quot;
          </motion.p>
        )}
      </AnimatePresence>

      {/* Grid */}
      {filteredPaths.length > 0 ? (
        <motion.div
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}
        >
          <AnimatePresence mode="sync">
            {filteredPaths.map((path, i) => (
              <motion.div
                key={path.id}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    duration: 0.35,
                    delay: Math.min(i * 0.05, 0.35),
                    ease: EASE_OUT,
                  },
                }}
                exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
              >
                <PathCard path={path} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ textAlign: "center", padding: "60px 0", color: "var(--fp-text-muted)" }}
        >
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
            <Search size={36} strokeWidth={1} />
          </div>
          <p style={{ fontSize: 15, fontWeight: 500, color: "var(--fp-text)", marginBottom: 6 }}>No paths found</p>
          <p style={{ fontSize: 13 }}>Try a different search term or category</p>
        </motion.div>
      )}
    </div>
  );
}
