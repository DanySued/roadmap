"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { fadeUp, stagger, EASE_OUT } from "@/lib/motion";

const testimonials = [
  {
    source: "Reddit r/Fitness",
    quote: "Finally something that breaks goals into actual steps. I've tried 4 different apps — this is the first one where I know what to do on day 30.",
    handle: "u/steadyprogress_22",
  },
  {
    source: "Twitter / X",
    quote: "The strength training path got me from 0 to 3x/week consistently. The task-by-task format is the difference between me finishing and quitting.",
    handle: "@liftjourney",
  },
  {
    source: "Community Discord",
    quote: "Used the marathon path to prep for my first race. The stage breakdowns made a 16-week plan feel totally approachable.",
    handle: "firstmarathon_dani",
  },
];

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [4, -4]), { stiffness: 350, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-4, 4]), { stiffness: 350, damping: 30 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width);
    mouseY.set((e.clientY - r.top) / r.height);
  }
  function onMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div ref={ref} style={{ perspective: 800 }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        whileHover={{ y: -4, boxShadow: "0 16px 48px rgba(0,0,0,0.45)" }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function Research() {
  return (
    <section className="fp-section" style={{ backgroundColor: "var(--fp-surface)" }}>
      <div className="fp-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left */}
          <motion.div
            variants={stagger(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.p className="fp-eyebrow" variants={fadeUp}>What users say</motion.p>
            <motion.h2
              style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}
              variants={fadeUp}
            >
              Real people,
              <br />
              <span style={{ fontStyle: "italic" }}>real results.</span>
            </motion.h2>

            <motion.p
              className="mt-6 leading-relaxed max-w-sm"
              style={{ color: "var(--fp-text-muted)", fontSize: "0.9375rem" }}
              variants={fadeUp}
            >
              Not willpower. Not motivation. Just steps you can follow.
            </motion.p>

            <motion.div className="flex flex-wrap gap-6 sm:gap-8 mt-10 sm:mt-12" variants={stagger(0.08, 0.1)}>
              {[
                { value: "500K+", label: "Active users" },
                { value: "24+", label: "Training paths" },
                { value: "2.5M+", label: "Tasks completed" },
              ].map(({ value, label }) => (
                <motion.div key={label} variants={fadeUp}>
                  <motion.p
                    className="text-3xl font-light"
                    style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--fp-accent)" }}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE_OUT }}
                  >
                    {value}
                  </motion.p>
                  <p className="text-xs mt-1" style={{ color: "var(--fp-text-muted)" }}>{label}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: testimonials */}
          <motion.div
            className="flex flex-col gap-5"
            variants={stagger(0.1, 0.15)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {testimonials.map((t) => (
              <motion.div key={t.handle} variants={fadeUp}>
                <TiltCard>
                  <div
                    className="rounded-2xl p-6"
                    style={{ backgroundColor: "var(--fp-black)", border: "1px solid var(--fp-border)", borderRadius: 16 }}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--fp-accent)" }}>
                        {t.source}
                      </span>
                      <span className="text-xs" style={{ color: "var(--fp-text-muted)" }}>
                        {t.handle}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--fp-text)" }}>
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
