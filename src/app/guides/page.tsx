"use client";

import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import Link from "next/link";
import { BookOpen, Clock, ArrowRight } from "lucide-react";
import { GUIDES, CATEGORY_COLORS } from "@/lib/data/guides";

const ALL_CATEGORIES = ["All", "Strength", "Nutrition", "Recovery", "Running", "Cardio", "Flexibility"];

export default function GuidesPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--fp-black)" }}>
        {/* Hero */}
        <section style={{ paddingTop: 96, paddingBottom: 56, borderBottom: "1px solid var(--fp-border)" }}>
          <div className="fp-container">
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
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
            </div>
            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                color: "var(--fp-white)",
                maxWidth: 640,
                marginBottom: 16,
              }}
            >
              Learn the science behind{" "}
              <span style={{ fontStyle: "italic" }}>better training.</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--fp-text-muted)", maxWidth: 520, lineHeight: 1.65 }}>
              Expert-written guides covering strength, nutrition, recovery, and everything
              in between. No fluff — just the principles that actually move the needle.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
              {ALL_CATEGORIES.map((cat) => (
                <span
                  key={cat}
                  style={{
                    padding: "6px 14px",
                    background: cat === "All" ? "var(--fp-accent)" : "var(--fp-surface)",
                    color: cat === "All" ? "var(--fp-black)" : "var(--fp-text-muted)",
                    border: "1px solid var(--fp-border)",
                    borderRadius: 20,
                    fontSize: 13,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section style={{ paddingTop: 56, paddingBottom: 96 }}>
          <div className="fp-container">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                gap: 20,
              }}
            >
              {GUIDES.map((guide) => {
                const color = CATEGORY_COLORS[guide.category] ?? "#aaa8ff";
                return (
                  <Link
                    key={guide.id}
                    href={`/guides/${guide.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <article
                      style={{
                        padding: "28px",
                        background: "var(--fp-surface)",
                        border: "1px solid var(--fp-border)",
                        borderRadius: 16,
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        cursor: "pointer",
                        transition: "border-color 0.2s, transform 0.2s",
                        height: "100%",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "var(--fp-border-2)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "var(--fp-border)";
                        e.currentTarget.style.transform = "translateY(0)";
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
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            fontSize: 12,
                            color: "var(--fp-text-muted)",
                          }}
                        >
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

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--fp-accent)",
                        }}
                      >
                        Read guide <ArrowRight size={14} />
                      </div>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section
          style={{
            paddingBlock: "5rem",
            borderTop: "1px solid var(--fp-border)",
            textAlign: "center",
          }}
        >
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
