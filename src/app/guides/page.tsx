"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { GUIDES, CATEGORY_COLORS } from "@/lib/data/guides";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";

const ALL_CATEGORIES = ["All", "Strength", "Nutrition", "Recovery", "Running", "Cardio", "Flexibility"];

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? GUIDES : GUIDES.filter((g) => g.category === activeCategory);

  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--fp-black)" }}>
        {/* Hero */}
        <section style={{ paddingTop: 96, paddingBottom: 56, borderBottom: "1px solid var(--fp-border)" }}>
          <div className="fp-container">
            <motion.div
              variants={stagger(0.1)}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 10,
                    background: "rgba(170,168,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <BookOpen size={20} color="var(--fp-accent)" />
                </div>
                <p className="fp-eyebrow" style={{ marginBottom: 0 }}>Fitness Guides</p>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  color: "var(--fp-white)",
                  maxWidth: 640,
                  marginBottom: 16,
                }}
              >
                Learn the science behind{" "}
                <span style={{ fontStyle: "italic" }}>better training.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{ fontSize: 16, color: "var(--fp-text-muted)", maxWidth: 520, lineHeight: 1.65 }}
              >
                Expert-written guides covering strength, nutrition, recovery, and everything
                in between. No fluff — just the principles that actually move the needle.
              </motion.p>

              {/* Filter buttons */}
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32 }}
              >
                {ALL_CATEGORIES.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <motion.button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      style={{
                        position: "relative",
                        padding: "8px 14px",
                        borderRadius: 8,
                        fontSize: 13,
                        fontWeight: 500,
                        border: "1px solid transparent",
                        background: "transparent",
                        color: isActive ? "var(--fp-accent)" : "var(--fp-text-muted)",
                        cursor: "pointer",
                        fontFamily: "var(--font-dm-sans), sans-serif",
                        zIndex: 0,
                      }}
                      whileHover={{ color: isActive ? "var(--fp-accent)" : "var(--fp-text)" }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ duration: 0.15 }}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="guide-tab-pill"
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
                      {cat}
                    </motion.button>
                  );
                })}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Guides Grid */}
        <section style={{ paddingTop: 56, paddingBottom: 96 }}>
          <div className="fp-container">
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 20,
              }}
            >
              <AnimatePresence mode="sync">
                {filtered.map((guide, i) => {
                  const color = CATEGORY_COLORS[guide.category] ?? "#aaa8ff";
                  return (
                    <motion.div
                      key={guide.id}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      animate={{
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        transition: {
                          duration: 0.35,
                          delay: Math.min(i * 0.05, 0.3),
                          ease: EASE_OUT,
                        },
                      }}
                      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.18 } }}
                      whileHover={{
                        y: -6,
                        borderColor: "var(--fp-border-2)",
                        boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
                      }}
                      transition={{ duration: 0.22, ease: EASE_OUT }}
                      style={{
                        background: "var(--fp-surface)",
                        border: "1px solid var(--fp-border)",
                        borderRadius: 16,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Link
                        href={`/guides/${guide.id}`}
                        style={{
                          textDecoration: "none",
                          display: "flex",
                          flexDirection: "column",
                          flex: 1,
                          padding: 28,
                          gap: 16,
                        }}
                      >
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <span
                            style={{
                              padding: "4px 10px",
                              background: `${color}18`,
                              color,
                              borderRadius: 20,
                              fontSize: 12,
                              fontWeight: 600,
                              letterSpacing: "0.02em",
                            }}
                          >
                            {guide.category}
                          </span>
                          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--fp-text-muted)" }}>
                            <Clock size={12} />
                            {guide.readTime} read
                          </span>
                        </div>

                        <div style={{ flex: 1 }}>
                          <h3
                            style={{
                              fontSize: 17,
                              fontWeight: 700,
                              color: "var(--fp-white)",
                              marginBottom: 10,
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              lineHeight: 1.3,
                              letterSpacing: "-0.2px",
                            }}
                          >
                            {guide.title}
                          </h3>
                          <p style={{ fontSize: 14, color: "var(--fp-text-muted)", lineHeight: 1.6 }}>
                            {guide.excerpt}
                          </p>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "var(--fp-accent)" }}>
                          Read guide <ArrowRight size={14} />
                        </div>
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ paddingBlock: "5rem", borderTop: "1px solid var(--fp-border)", textAlign: "center" }}>
          <div className="fp-container">
            <h2 style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", color: "var(--fp-white)", marginBottom: 12 }}>
              Ready to put it into practice?
            </h2>
            <p style={{ fontSize: 15, color: "var(--fp-text-muted)", marginBottom: 28 }}>
              Browse our structured training paths and track your progress stage by stage.
            </p>
            <Link
              href="/paths"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "14px 28px",
                background: "var(--fp-accent)",
                color: "var(--fp-black)",
                borderRadius: 12,
                fontWeight: 700,
                fontSize: 15,
                textDecoration: "none",
              }}
            >
              Browse Paths <ArrowRight size={16} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
