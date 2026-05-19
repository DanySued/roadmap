"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform, type MotionValue } from "framer-motion";
import PathIcon from "./PathIcon";
import type { Path } from "@/lib/data/paths";

export default function PathCard({ path }: { path: Path }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const glowOpacity = useMotionValue(0);

  const rotateXInput = useTransform(mouseY, [0, 1], [5, -5]);
  const rotateYInput = useTransform(mouseX, [0, 1], [-5, 5]);
  const rotateX = useSpring(rotateXInput, { stiffness: 350, damping: 30 });
  const rotateY = useSpring(rotateYInput, { stiffness: 350, damping: 30 });
  const glowSpring = useSpring(glowOpacity, { stiffness: 300, damping: 30 });

  const glowGx = useTransform(mouseX, [0, 1], [0, 100]);
  const glowGy = useTransform(mouseY, [0, 1], [0, 100]);
  const glowBg = useTransform(
    [glowGx, glowGy] as MotionValue<number>[],
    ([x, y]: number[]) =>
      `radial-gradient(circle at ${x}% ${y}%, ${path.color}28 0%, transparent 55%)`
  );

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!containerRef.current) return;
    const r = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }

  function handleMouseEnter() {
    glowOpacity.set(1);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
    glowOpacity.set(0);
  }

  return (
    <div
      ref={containerRef}
      style={{ perspective: 900 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          borderRadius: 16,
          overflow: "hidden",
          position: "relative",
          background: "var(--fp-surface)",
          border: "1px solid var(--fp-border)",
        }}
        initial="rest"
        whileHover="hover"
        animate="rest"
        variants={{
          rest: {
            y: 0,
            borderColor: "var(--fp-border)",
            boxShadow: "0 0 0 rgba(0,0,0,0)",
          },
          hover: {
            y: -5,
            borderColor: "var(--fp-border-2)",
            boxShadow: "0 18px 52px rgba(0,0,0,0.45)",
          },
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Cursor-tracked glow */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: glowBg,
            opacity: glowSpring,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Static corner glow */}
        <div
          style={{
            position: "absolute",
            top: -20,
            right: -20,
            width: 80,
            height: 80,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${path.color}22 0%, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        <Link
          href={`/paths/${path.id}`}
          className="group block"
          style={{ padding: 24, position: "relative", zIndex: 1, textDecoration: "none" }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
            <motion.div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: `${path.color}18`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                border: `1px solid ${path.color}30`,
                color: path.color,
              }}
              variants={{
                rest: { scale: 1, rotate: 0 },
                hover: { scale: 1.08, rotate: -4 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <PathIcon name={path.icon} size={22} strokeWidth={1.5} />
            </motion.div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--fp-white)", lineHeight: 1.3, fontFamily: "var(--font-dm-sans), sans-serif" }}>
                  {path.title}
                </h3>
                {path.popular && (
                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fp-accent)", background: "rgba(207,123,75,0.12)", border: "1px solid rgba(207,123,75,0.25)", borderRadius: 4, padding: "1px 6px", flexShrink: 0 }}>
                    Popular
                  </span>
                )}
              </div>
              <p style={{ fontSize: 13, color: "var(--fp-text-muted)", lineHeight: 1.5 }}>
                {path.desc}
              </p>
            </div>
          </div>

          <motion.div
            style={{
              marginTop: 16,
              display: "flex",
              alignItems: "center",
              gap: 6,
              color: "var(--fp-accent)",
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: "0.04em",
            }}
            variants={{
              rest: { opacity: 0, x: -6 },
              hover: { opacity: 1, x: 0 },
            }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Start path
            <motion.svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              variants={{ rest: { x: 0 }, hover: { x: 3 } }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </motion.svg>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
