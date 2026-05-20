"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No account needed. Progress is saved locally in your browser and persists between sessions.",
  },
  {
    q: "How many training paths are available?",
    a: "24+ paths across sports and goals — strength, running, yoga, marathon, CrossFit, and more. New paths added regularly.",
  },
  {
    q: "Can I build my own path?",
    a: "Yes. Create a 4-step structured path with your own stages and tasks, save it locally, and share it.",
  },
  {
    q: "How detailed are the task stages?",
    a: "Each path has 6–10 progressive tasks — clear milestones that move you from where you are to the next level.",
  },
  {
    q: "Is FitPath really free?",
    a: "Completely free. No paywall, no premium tier, no email required.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="fp-section" style={{ backgroundColor: "var(--fp-black)" }} id="faq">
      <div className="fp-container max-w-3xl">
        <motion.div
          variants={stagger(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p className="fp-eyebrow" variants={fadeUp}>FAQ</motion.p>
          <motion.h2
            className="mb-14"
            style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}
            variants={fadeUp}
          >
            Answers to
            <br />
            <span style={{ fontStyle: "italic" }}>good questions.</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className="flex flex-col"
          variants={stagger(0.07, 0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {faqs.map((item, i) => (
            <motion.div key={i} style={{ borderTop: "1px solid var(--fp-border)" }} variants={fadeUp}>
              <button
                className="w-full flex items-center justify-between py-6 text-left gap-8"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <motion.span
                  className="text-base font-medium"
                  animate={{ color: open === i ? "var(--fp-white)" : "var(--fp-text)" }}
                  transition={{ duration: 0.2 }}
                >
                  {item.q}
                </motion.span>
                <motion.span
                  className="text-xl shrink-0"
                  style={{ color: "var(--fp-text-muted)", display: "block" }}
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="answer"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ height: { duration: 0.32, ease: EASE_OUT }, opacity: { duration: 0.22 } }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="pb-6 text-sm leading-relaxed" style={{ color: "var(--fp-text-muted)" }}>
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
          <div style={{ borderTop: "1px solid var(--fp-border)" }} />
        </motion.div>
      </div>
    </section>
  );
}
