"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { Play, Clock, ArrowRight } from "lucide-react";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";

const VIDEOS = [
  {
    id: "full-body-strength",
    title: "Full Body Strength Workout",
    category: "Strength",
    duration: "32 min",
    level: "Beginner",
    color: "#aaa8ff",
    gradient: "linear-gradient(135deg, #1a1730 0%, #2d2850 100%)",
    href: "https://www.youtube.com/results?search_query=full+body+strength+workout+beginner",
  },
  {
    id: "5k-plan-overview",
    title: "5K Training Plan: Week 1 Overview",
    category: "Running",
    duration: "18 min",
    level: "Beginner",
    color: "#7f9ef8",
    gradient: "linear-gradient(135deg, #111830 0%, #1a2850 100%)",
    href: "https://www.youtube.com/results?search_query=couch+to+5k+training+plan+week+1",
  },
  {
    id: "morning-yoga",
    title: "Morning Yoga Flow",
    category: "Yoga",
    duration: "25 min",
    level: "All Levels",
    color: "#c1cff8",
    gradient: "linear-gradient(135deg, #151830 0%, #1e2245 100%)",
    href: "https://www.youtube.com/results?search_query=morning+yoga+flow+yoga+with+adriene",
  },
  {
    id: "crossfit-fundamentals",
    title: "CrossFit Fundamentals",
    category: "CrossFit",
    duration: "45 min",
    level: "Beginner",
    color: "#fffba5",
    gradient: "linear-gradient(135deg, #1a1a10 0%, #2b2b18 100%)",
    href: "https://www.youtube.com/results?search_query=crossfit+fundamentals+movements+beginners",
  },
  {
    id: "nutrition-101",
    title: "Nutrition 101: Macros Explained",
    category: "Nutrition",
    duration: "22 min",
    level: "All Levels",
    color: "#7f9ef8",
    gradient: "linear-gradient(135deg, #0f1525 0%, #18213a 100%)",
    href: "https://www.youtube.com/results?search_query=macros+explained+nutrition+for+beginners",
  },
  {
    id: "core-series",
    title: "Core Strength: 4-Week Series Intro",
    category: "Strength",
    duration: "15 min",
    level: "Intermediate",
    color: "#aaa8ff",
    gradient: "linear-gradient(135deg, #1a1730 0%, #2d2850 100%)",
    href: "https://www.youtube.com/results?search_query=core+strength+workout+series+athlean+x",
  },
  {
    id: "recovery-stretching",
    title: "Post-Workout Recovery & Stretching",
    category: "Recovery",
    duration: "30 min",
    level: "All Levels",
    color: "#c1cff8",
    gradient: "linear-gradient(135deg, #151830 0%, #1e2245 100%)",
    href: "https://www.youtube.com/results?search_query=post+workout+stretching+recovery+routine",
  },
  {
    id: "marathon-week1",
    title: "Marathon Training: Week 1 Walkthrough",
    category: "Running",
    duration: "40 min",
    level: "Intermediate",
    color: "#7f9ef8",
    gradient: "linear-gradient(135deg, #111830 0%, #1a2850 100%)",
    href: "https://www.youtube.com/results?search_query=beginner+marathon+training+plan+week+by+week",
  },
  {
    id: "pilates-beginners",
    title: "Pilates for Beginners",
    category: "Yoga",
    duration: "20 min",
    level: "Beginner",
    color: "#fad0f3",
    gradient: "linear-gradient(135deg, #1a1020 0%, #2b1838 100%)",
    href: "https://www.youtube.com/results?search_query=pilates+for+beginners+full+workout",
  },
  {
    id: "boxing-basics",
    title: "Boxing Basics: Stance & Jab",
    category: "CrossFit",
    duration: "35 min",
    level: "Beginner",
    color: "#7f9ef8",
    gradient: "linear-gradient(135deg, #111830 0%, #1a2850 100%)",
    href: "https://www.youtube.com/results?search_query=boxing+fundamentals+stance+jab+cross+beginner",
  },
  {
    id: "hiit-20min",
    title: "20-Minute HIIT Blast",
    category: "Cardio",
    duration: "20 min",
    level: "Intermediate",
    color: "#fad0f3",
    gradient: "linear-gradient(135deg, #1a1020 0%, #2b1838 100%)",
    href: "https://www.youtube.com/results?search_query=20+minute+hiit+workout+no+equipment",
  },
  {
    id: "flexibility-mobility",
    title: "Flexibility & Mobility Deep Dive",
    category: "Yoga",
    duration: "28 min",
    level: "All Levels",
    color: "#fffba5",
    gradient: "linear-gradient(135deg, #1a1a10 0%, #2b2b18 100%)",
    href: "https://www.youtube.com/results?search_query=full+body+flexibility+and+mobility+routine",
  },
];

const CATEGORIES = ["All", "Strength", "Running", "Yoga", "CrossFit", "Nutrition", "Recovery", "Cardio"];

const LEVEL_COLORS: Record<string, { bg: string; text: string }> = {
  Beginner: { bg: "rgba(127,158,248,0.15)", text: "#7f9ef8" },
  Intermediate: { bg: "rgba(170,168,255,0.15)", text: "#aaa8ff" },
  Advanced: { bg: "rgba(250,208,243,0.15)", text: "#fad0f3" },
  "All Levels": { bg: "rgba(193,207,248,0.15)", text: "#c1cff8" },
};

export default function VideosPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? VIDEOS : VIDEOS.filter((v) => v.category === activeCategory);

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
                    background: "rgba(127,158,248,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Play size={20} color="#7f9ef8" />
                </div>
                <p className="fp-eyebrow" style={{ marginBottom: 0 }}>Video Library</p>
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
                Watch, learn,{" "}
                <span style={{ fontStyle: "italic" }}>and move.</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                style={{ fontSize: 16, color: "var(--fp-text-muted)", maxWidth: 520, lineHeight: 1.65 }}
              >
                Guided workouts, training walkthroughs, and technique breakdowns — all
                organized by path so you know exactly what to watch next.
              </motion.p>

              {/* Filter buttons */}
              <motion.div
                variants={fadeUp}
                style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 32 }}
              >
                {CATEGORIES.map((cat) => {
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
                          layoutId="video-tab-pill"
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

        {/* Video Grid */}
        <section style={{ paddingTop: 56, paddingBottom: 96 }}>
          <div className="fp-container">
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: 20,
              }}
            >
              <AnimatePresence mode="sync">
                {filtered.map((video, i) => {
                  const levelStyle = LEVEL_COLORS[video.level] ?? LEVEL_COLORS["All Levels"];
                  return (
                    <motion.div
                      key={video.id}
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
                        overflow: "hidden",
                      }}
                    >
                      <Link
                        href={video.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none", display: "block" }}
                      >
                        {/* Thumbnail */}
                        <div
                          style={{
                            height: 180,
                            background: video.gradient,
                            position: "relative",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              background: `radial-gradient(circle at 40% 40%, ${video.color}20 0%, transparent 65%)`,
                            }}
                          />
                          <motion.div
                            style={{
                              width: 52,
                              height: 52,
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.12)",
                              border: "1px solid rgba(255,255,255,0.2)",
                              backdropFilter: "blur(8px)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
                              zIndex: 1,
                            }}
                            whileHover={{ scale: 1.12, background: "rgba(255,255,255,0.22)" }}
                            transition={{ duration: 0.18 }}
                          >
                            <Play size={20} color="white" fill="white" style={{ marginLeft: 2 }} />
                          </motion.div>
                          <div
                            style={{
                              position: "absolute",
                              bottom: 10,
                              right: 10,
                              padding: "3px 8px",
                              background: "rgba(0,0,0,0.6)",
                              borderRadius: 6,
                              fontSize: 12,
                              fontWeight: 600,
                              color: "white",
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            }}
                          >
                            <Clock size={11} />
                            {video.duration}
                          </div>
                        </div>

                        {/* Info */}
                        <div style={{ padding: "20px" }}>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                            <span
                              style={{
                                padding: "3px 9px",
                                background: `${video.color}18`,
                                color: video.color,
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {video.category}
                            </span>
                            <span
                              style={{
                                padding: "3px 9px",
                                background: levelStyle.bg,
                                color: levelStyle.text,
                                borderRadius: 20,
                                fontSize: 11,
                                fontWeight: 600,
                              }}
                            >
                              {video.level}
                            </span>
                          </div>
                          <h3
                            style={{
                              fontSize: 15,
                              fontWeight: 700,
                              color: "var(--fp-white)",
                              lineHeight: 1.35,
                              fontFamily: "var(--font-dm-sans), sans-serif",
                              letterSpacing: "-0.1px",
                            }}
                          >
                            {video.title}
                          </h3>
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
              Follow along with a full path.
            </h2>
            <p style={{ fontSize: 15, color: "var(--fp-text-muted)", marginBottom: 28 }}>
              Each training path has videos, guides, and structured tasks — all in one place.
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
