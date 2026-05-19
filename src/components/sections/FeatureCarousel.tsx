"use client";

import { motion } from "framer-motion";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";

const features = [
  {
    tag: "01",
    title: "Progressive stage design",
    desc: "Every path breaks your goal into ordered stages — beginner to advanced. No guesswork. You always know exactly what's next.",
    accent: "var(--fp-accent)",
  },
  {
    tag: "02",
    title: "Task completion tracking",
    desc: "Check off each stage as you go. Your progress is saved locally and persists across sessions — no account required.",
    accent: "var(--fp-green)",
  },
  {
    tag: "03",
    title: "Real-time search",
    desc: "Filter 24+ paths by sport, goal, or skill. ⌘K shortcut opens instant search from anywhere on the paths page.",
    accent: "#bc8cff",
  },
  {
    tag: "04",
    title: "Custom path builder",
    desc: "Don't see what you need? Build your own 4-step training path and share it with your community.",
    accent: "#d4ccc4",
  },
];

export default function FeatureCarousel() {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--fp-surface)" }}
      id="features"
    >
      <motion.div
        className="fp-container mb-12"
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <motion.p className="fp-eyebrow" variants={fadeUp}>How it works</motion.p>
        <motion.h2
          style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}
          variants={fadeUp}
        >
          Built for{" "}
          <span style={{ fontStyle: "italic", color: "var(--fp-accent)" }}>
            real progress
          </span>
        </motion.h2>
      </motion.div>

      <motion.div
        className="fp-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        variants={stagger(0.08, 0.15)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {features.map((f) => (
          <motion.div
            key={f.tag}
            variants={fadeUp}
            style={{
              background: "var(--fp-black)",
              border: "1px solid var(--fp-border)",
              borderRadius: 16,
              padding: 28,
              minHeight: 280,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              cursor: "default",
            }}
            whileHover={{
              y: -6,
              borderColor: "var(--fp-border-2)",
              boxShadow: `0 16px 48px rgba(0,0,0,0.4)`,
            }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
          >
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-6 block"
                style={{ color: "var(--fp-text-muted)" }}
              >
                {f.tag}
              </span>
              <h3
                className="text-xl font-semibold mb-3 leading-snug"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--fp-white)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fp-text-muted)" }}>
                {f.desc}
              </p>
            </div>

            {/* Animated accent dot */}
            <motion.div
              className="mt-8 w-10 h-10 rounded-full"
              style={{ backgroundColor: f.accent }}
              whileHover={{ scale: 1.25, opacity: 1 }}
              animate={{ opacity: 0.8 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
