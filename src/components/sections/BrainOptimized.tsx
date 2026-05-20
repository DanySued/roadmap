"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";
import { getIcon } from "@/components/fitpath/PathIcon";

const tabs = [
  {
    id: "structure",
    icon: "layers",
    label: "Follow a clear progression",
    heading: "Know exactly what to do next.",
    body: "Ordered stages from foundations to advanced. Complete each task, check it off, move forward.",
    stat: { value: "3×", label: "better adherence with structured paths" },
    accent: "var(--fp-accent)",
    accentRaw: "#aaa8ff",
  },
  {
    id: "track",
    icon: "clipboard-list",
    label: "Track every step",
    heading: "Your progress, always saved.",
    body: "No account needed. Progress lives locally and waits exactly where you left off.",
    stat: { value: "87%", label: "of users complete more stages with tracking" },
    accent: "var(--fp-green)",
    accentRaw: "#7f9ef8",
  },
  {
    id: "celebrate",
    icon: "sparkles",
    label: "Stay motivated",
    heading: "Wins should feel like wins.",
    body: "Every task triggers a celebration. Small wins are the difference between week 3 and week 8.",
    stat: { value: "2.1×", label: "more likely to finish the full path" },
    accent: "#bc8cff",
    accentRaw: "#bc8cff",
  },
];

const progressItems = [
  { label: "Form fundamentals", pct: 100 },
  { label: "Baseline strength", pct: 100 },
  { label: "Progressive overload", pct: 100 },
  { label: "Hypertrophy phase", pct: 60 },
  { label: "Strength phase", pct: 0 },
];

export default function BrainOptimized() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];
  const barsRef = useRef<HTMLDivElement>(null);
  const barsInView = useInView(barsRef, { once: true, margin: "-80px" });

  return (
    <section className="fp-section" style={{ backgroundColor: "var(--fp-black)" }}>
      <div className="fp-container">
        <motion.div
          variants={stagger(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p className="fp-eyebrow" variants={fadeUp}>Why it works</motion.p>
          <motion.h2
            className="mb-16"
            style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}
            variants={fadeUp}
          >
            Structure beats{" "}
            <span style={{ fontStyle: "italic", color: "var(--fp-accent)" }}>motivation.</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <div className="flex flex-col gap-3 mb-12">
              {tabs.map((t) => {
                const isActive = active === t.id;
                const IconComp = getIcon(t.icon);
                return (
                  <motion.button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className="text-left px-5 py-4 rounded-xl text-sm font-medium flex items-center gap-3"
                    style={{
                      position: "relative",
                      color: isActive ? "var(--fp-white)" : "var(--fp-text-muted)",
                      background: "transparent",
                      border: "1px solid transparent",
                      cursor: "pointer",
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      zIndex: 0,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="brain-tab-pill"
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 12,
                          background: "rgba(170,168,255,0.1)",
                          border: "1px solid rgba(170,168,255,0.25)",
                          zIndex: -1,
                        }}
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <motion.span
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: 8,
                        background: isActive ? `${t.accentRaw}18` : "rgba(255,255,255,0.05)",
                        border: `1px solid ${isActive ? t.accentRaw + "30" : "rgba(255,255,255,0.08)"}`,
                        color: isActive ? t.accent : "var(--fp-text-muted)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                      animate={{ scale: isActive ? 1.05 : 1 }}
                      transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                      {IconComp && <IconComp size={15} strokeWidth={1.75} />}
                    </motion.span>
                    {t.label}
                  </motion.button>
                );
              })}
            </div>

            {/* Stat */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id + "-stat"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
                className="flex flex-wrap items-baseline gap-3 px-6 py-4 rounded-2xl"
                style={{ backgroundColor: "var(--fp-surface)" }}
              >
                <span className="text-5xl font-light" style={{ fontFamily: "var(--font-instrument-serif)", color: current.accent }}>
                  {current.stat.value}
                </span>
                <span className="text-sm" style={{ color: "var(--fp-text-muted)" }}>
                  {current.stat.label}
                </span>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Content panel */}
          <div className="lg:pt-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <h3 className="text-2xl font-semibold mb-5 leading-snug" style={{ fontFamily: "var(--font-dm-sans)", color: "var(--fp-white)" }}>
                  {current.heading}
                </h3>
                <p className="leading-relaxed text-base" style={{ color: "var(--fp-text-muted)" }}>
                  {current.body}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* Progress visualization */}
            <motion.div
              ref={barsRef}
              className="mt-10 rounded-2xl p-6 overflow-hidden"
              style={{ backgroundColor: "var(--fp-surface)", border: "1px solid var(--fp-border)" }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
            >
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--fp-text-muted)" }}>
                Strength Training Path — progress
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {progressItems.map(({ label, pct }, i) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: pct === 100 ? "var(--fp-green)" : "var(--fp-text-muted)", width: "45%", minWidth: 120, flexShrink: 0 }}>
                      {pct === 100 ? "✓ " : ""}{label}
                    </span>
                    <div style={{ flex: 1, height: 4, background: "var(--fp-border)", borderRadius: 4, overflow: "hidden" }}>
                      <motion.div
                        style={{
                          height: "100%",
                          background: pct === 100 ? "var(--fp-green)" : "var(--fp-accent)",
                          borderRadius: 4,
                        }}
                        initial={{ width: 0 }}
                        animate={barsInView ? { width: pct > 0 ? `${pct}%` : "4px" } : { width: 0 }}
                        transition={{ duration: 0.7, delay: i * 0.1 + 0.3, ease: EASE_OUT }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
