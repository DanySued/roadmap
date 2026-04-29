"use client";

import { useState } from "react";

const tabs = [
  {
    id: "structure",
    label: "Follow a clear progression",
    heading: "Know exactly what to do next.",
    body:
      "Each FitPath path is broken into ordered stages — from foundations to advanced. No more guessing. You complete each task, check it off, and move forward with confidence.",
    stat: { value: "3×", label: "better adherence with structured paths" },
    accent: "var(--fp-accent)",
  },
  {
    id: "track",
    label: "Track every step",
    heading: "Your progress, always saved.",
    body:
      "Complete a task and it's remembered. No account needed — your progress is stored locally and persists across sessions. Come back a week later, pick up exactly where you left off.",
    stat: { value: "87%", label: "of users complete more stages with tracking" },
    accent: "var(--fp-green)",
  },
  {
    id: "celebrate",
    label: "Stay motivated",
    heading: "Wins should feel like wins.",
    body:
      "Every task completion triggers an encouragement toast and a confetti burst. Small celebrations make the difference between quitting on week 3 and reaching your peak on week 8.",
    stat: { value: "2.1×", label: "more likely to finish the full path" },
    accent: "#bc8cff",
  },
];

export default function BrainOptimized() {
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find((t) => t.id === active) ?? tabs[0];

  return (
    <section
      className="fp-section"
      style={{ backgroundColor: "var(--fp-black)" }}
    >
      <div className="fp-container">
        <p className="fp-eyebrow">Why it works</p>
        <h2
          className="mb-16"
          style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}
        >
          Structure beats{" "}
          <span style={{ fontStyle: "italic", color: "var(--fp-accent)" }}>
            motivation.
          </span>
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Tabs */}
          <div>
            <div className="flex flex-col gap-3 mb-12">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActive(t.id)}
                  className="text-left px-6 py-4 rounded-xl transition-all duration-200 text-sm font-medium"
                  style={{
                    backgroundColor: active === t.id ? "rgba(207,123,75,0.1)" : "transparent",
                    color: active === t.id ? "var(--fp-white)" : "var(--fp-text-muted)",
                    border: active === t.id ? "1px solid rgba(207,123,75,0.25)" : "1px solid transparent",
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Stat */}
            <div
              className="flex flex-wrap items-baseline gap-3 px-6 py-4 rounded-2xl"
              style={{ backgroundColor: "var(--fp-surface)" }}
            >
              <span
                className="text-5xl font-light"
                style={{ fontFamily: "var(--font-instrument-serif)", color: current.accent }}
              >
                {current.stat.value}
              </span>
              <span className="text-sm" style={{ color: "var(--fp-text-muted)" }}>
                {current.stat.label}
              </span>
            </div>
          </div>

          {/* Content panel */}
          <div key={current.id} className="lg:pt-2">
            <h3
              className="text-2xl font-semibold mb-5 leading-snug"
              style={{ fontFamily: "var(--font-dm-sans)", color: "var(--fp-white)" }}
            >
              {current.heading}
            </h3>
            <p className="leading-relaxed text-base" style={{ color: "var(--fp-text-muted)" }}>
              {current.body}
            </p>

            {/* Visual — progress visualization */}
            <div
              className="mt-10 rounded-2xl p-6 overflow-hidden"
              style={{ backgroundColor: "var(--fp-surface)", border: "1px solid var(--fp-border)" }}
            >
              <p className="text-xs uppercase tracking-widest mb-4" style={{ color: "var(--fp-text-muted)" }}>
                Strength Training Path — progress
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { label: "Form fundamentals", pct: 100 },
                  { label: "Baseline strength", pct: 100 },
                  { label: "Progressive overload", pct: 100 },
                  { label: "Hypertrophy phase", pct: 60 },
                  { label: "Strength phase", pct: 0 },
                ].map(({ label, pct }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 12, color: pct === 100 ? "var(--fp-green)" : "var(--fp-text-muted)", width: "45%", minWidth: 120, flexShrink: 0 }}>
                      {pct === 100 ? "✓ " : ""}{label}
                    </span>
                    <div style={{ flex: 1, height: 4, background: "var(--fp-border)", borderRadius: 4 }}>
                      <div
                        style={{
                          height: "100%",
                          width: `${pct}%`,
                          background: pct === 100 ? "var(--fp-green)" : "var(--fp-accent)",
                          borderRadius: 4,
                          opacity: pct > 0 ? 1 : 0.2,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
