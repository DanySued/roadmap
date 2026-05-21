"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PathIcon from "./PathIcon";
import type { Path } from "@/lib/data/paths";

export default function PathCard({ path }: { path: Path }) {
  return (
    <motion.div
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
          y: -6,
          borderColor: "var(--fp-border-2)",
          boxShadow: "0 16px 48px rgba(0,0,0,0.4)",
        },
      }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: "var(--fp-surface)",
        border: "1px solid var(--fp-border)",
        borderRadius: 16,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Subtle top accent line */}
      <motion.div
        variants={{
          rest: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: `linear-gradient(90deg, transparent, ${path.color}88, transparent)`,
          transformOrigin: "center",
          pointerEvents: "none",
        }}
      />

      <Link
        href={`/paths/${path.id}`}
        style={{ display: "block", padding: "32px 28px 28px", textDecoration: "none" }}
      >
        {/* Icon */}
        <motion.div
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.1 },
          }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: `${path.color}18`,
            border: `1px solid ${path.color}30`,
            color: path.color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px",
          }}
        >
          <PathIcon name={path.icon} size={26} strokeWidth={1.5} />
        </motion.div>

        {/* Title + badges */}
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, marginBottom: 4 }}>
            <h3 style={{
              fontSize: 16,
              fontWeight: 700,
              color: "var(--fp-white)",
              lineHeight: 1.25,
              fontFamily: "var(--font-dm-sans), sans-serif",
            }}>
              {path.title}
            </h3>
            {path.isNew && (
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 18, delay: 0.1 }}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#4ade80",
                  background: "rgba(74,222,128,0.12)",
                  border: "1px solid rgba(74,222,128,0.3)",
                  borderRadius: 4,
                  padding: "1px 6px",
                  flexShrink: 0,
                }}
              >
                New
              </motion.span>
            )}
            {path.popular && !path.isNew && (
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "var(--fp-accent)",
                background: "rgba(170,168,255,0.12)",
                border: "1px solid rgba(170,168,255,0.25)",
                borderRadius: 4,
                padding: "1px 6px",
                flexShrink: 0,
              }}>
                Popular
              </span>
            )}
          </div>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 13,
          color: "var(--fp-text-muted)",
          lineHeight: 1.6,
          textAlign: "center",
          marginBottom: 24,
        }}>
          {path.desc}
        </p>

        {/* CTA */}
        <motion.div
          variants={{
            rest: { opacity: 0.4 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.04em",
            color: "var(--fp-accent)",
          }}
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
  );
}
