"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No account needed. Your progress is saved locally in your browser using localStorage. It persists between sessions — just don't clear your browser data and your progress will always be there.",
  },
  {
    q: "How many training paths are available?",
    a: "24+ paths across sports (strength, running, yoga, cycling, CrossFit, boxing, and more), goals (weight loss, muscle building, endurance, flexibility), and best practices (recovery, nutrition, sleep). New paths are added regularly.",
  },
  {
    q: "Can I build my own path?",
    a: "Yes. The custom path builder lets you create a 4-step structured training path with your own stages and tasks. You can save it locally and share it with your community.",
  },
  {
    q: "How detailed are the task stages?",
    a: "Each path has 6–10 progressive tasks with a clear title and a short description of what to actually do. Think of each task as a milestone that moves you from where you are to the next level.",
  },
  {
    q: "Is FitPath really free?",
    a: "Yes, completely free. No paywall, no premium tier, no email required. FitPath is a portfolio project built to help people train with structure.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="fp-section" style={{ backgroundColor: "var(--fp-black)" }} id="faq">
      <div className="fp-container max-w-3xl">
        <p className="fp-eyebrow">FAQ</p>
        <h2
          className="mb-14"
          style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}
        >
          Answers to
          <br />
          <span style={{ fontStyle: "italic" }}>good questions.</span>
        </h2>

        <div className="flex flex-col">
          {faqs.map((item, i) => (
            <div key={i} style={{ borderTop: "1px solid var(--fp-border)" }}>
              <button
                className="w-full flex items-center justify-between py-6 text-left gap-8 group"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span
                  className="text-base font-medium"
                  style={{ color: "var(--fp-text)" }}
                >
                  {item.q}
                </span>
                <span
                  className="text-xl shrink-0 transition-transform duration-200"
                  style={{
                    color: "var(--fp-text-muted)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                  }}
                >
                  +
                </span>
              </button>

              {open === i && (
                <p
                  className="pb-6 text-sm leading-relaxed"
                  style={{ color: "var(--fp-text-muted)" }}
                >
                  {item.a}
                </p>
              )}
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--fp-border)" }} />
        </div>
      </div>
    </section>
  );
}
