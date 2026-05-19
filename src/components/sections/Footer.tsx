"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";

const links: Record<string, { label: string; href: string }[]> = {
  Paths: [
    { label: "Strength Training", href: "/paths/strength-training" },
    { label: "Running", href: "/paths/running" },
    { label: "Yoga", href: "/paths/yoga" },
    { label: "CrossFit", href: "/paths/crossfit" },
  ],
  Goals: [
    { label: "Weight Loss", href: "/paths/weight-loss" },
    { label: "Muscle Building", href: "/paths/muscle-building" },
    { label: "Endurance", href: "/paths/cardio-endurance" },
    { label: "Flexibility", href: "/paths/flexibility" },
  ],
  Resources: [
    { label: "Guides", href: "/guides" },
    { label: "Videos", href: "/videos" },
    { label: "All Paths", href: "/paths" },
    { label: "FAQ", href: "/#faq" },
  ],
  Project: [
    { label: "About", href: "/about" },
    { label: "GitHub", href: "https://github.com/DanySued/roadmap" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ],
};

const MotionLink = motion(Link);

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--fp-surface)" }}>
      {/* CTA band */}
      <motion.div
        className="fp-section"
        style={{ borderBottom: "1px solid var(--fp-border)" }}
        variants={stagger(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="fp-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <motion.div variants={fadeUp}>
            <h2
              className="mb-3"
              style={{ fontSize: "clamp(2rem, 3.5vw, 2.5rem)", lineHeight: 1.1, color: "var(--fp-white)" }}
            >
              Start your path.
              <br />
              <span style={{ fontStyle: "italic", color: "var(--fp-accent)" }}>
                Track your progress.
              </span>
            </h2>
            <p className="text-sm" style={{ color: "var(--fp-text-muted)" }}>
              24+ structured training paths. Free, no account required.
            </p>
          </motion.div>

          <motion.div variants={fadeUp}>
            <MotionLink
              href="/paths"
              className="inline-flex items-center px-8 py-4 rounded-xl font-semibold shrink-0"
              style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
              whileHover={{ scale: 1.04, boxShadow: "0 0 28px rgba(170,168,255,0.35)" }}
              whileTap={{ scale: 0.96 }}
              transition={{ duration: 0.15, ease: EASE_OUT }}
            >
              Browse Paths
            </MotionLink>
          </motion.div>
        </div>
      </motion.div>

      {/* Links */}
      <motion.div
        style={{ paddingBlock: "3rem" }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: EASE_OUT }}
      >
        <div className="fp-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p className="text-xs font-semibold uppercase tracking-widest mb-5" style={{ color: "var(--fp-text-muted)" }}>
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <MotionLink
                        href={item.href}
                        className="text-sm"
                        style={{ color: "var(--fp-text-muted)" }}
                        whileHover={{ color: "var(--fp-white)", x: 2 }}
                        transition={{ duration: 0.15 }}
                        target={item.href.startsWith("http") ? "_blank" : undefined}
                        rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      >
                        {item.label}
                      </MotionLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-8"
            style={{ borderTop: "1px solid var(--fp-border)" }}
          >
            <div className="flex gap-6 text-xs" style={{ color: "var(--fp-text-muted)" }}>
              <Link href="/privacy" className="hover:opacity-70 transition-opacity">Privacy Policy</Link>
              <Link href="/terms" className="hover:opacity-70 transition-opacity">Terms of Service</Link>
              <span>© 2026 FitPath — Built by Dany Sue</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Large display wordmark */}
      <div className="fp-container pb-6 overflow-hidden" style={{ borderTop: "1px solid var(--fp-border)" }}>
        <MotionLink
          href="/"
          className="block leading-none"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "clamp(4rem, 10vw, 7rem)",
            color: "var(--fp-white)",
            letterSpacing: "-0.02em",
          }}
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.2 }}
        >
          fitpath
        </MotionLink>
      </div>
    </footer>
  );
}
