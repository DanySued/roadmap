export default function Problem() {
  const stats = [
    { value: "73%", label: "of people abandon fitness goals within 3 months" },
    { value: "9 in 10", label: "cite \"not knowing what to do next\" as the main reason" },
    { value: "3×", label: "better results when following a structured progression" },
  ];

  return (
    <section className="fp-section" style={{ backgroundColor: "var(--fp-surface)" }} id="learn">
      <div className="fp-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: text */}
          <div>
            <p className="fp-eyebrow">The problem</p>
            <h2 style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}>
              Motivation isn&apos;t
              <br />
              <span style={{ fontStyle: "italic" }}>your problem.</span>
            </h2>

            <p className="mt-6 mb-10 leading-relaxed max-w-md" style={{ color: "var(--fp-text-muted)", fontSize: "0.9375rem" }}>
              Most people quit fitness not because they&apos;re lazy — but because they don&apos;t
              have a clear path. Random workouts, conflicting advice, no sense of progress.
              Structure beats motivation, every time.
            </p>

            <div className="flex flex-col gap-5">
              {stats.map(({ value, label }) => (
                <div key={label} className="flex items-center gap-4">
                  <span
                    className="text-2xl font-bold shrink-0"
                    style={{ color: "var(--fp-accent)", fontFamily: "var(--font-instrument-serif)" }}
                  >
                    {value}
                  </span>
                  <span className="text-sm" style={{ color: "var(--fp-text-muted)" }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: visual card */}
          <div className="relative mt-4 lg:mt-0">
            <div
              className="rounded-3xl overflow-hidden aspect-[4/5]"
              style={{ backgroundColor: "var(--fp-black)", border: "1px solid var(--fp-border)" }}
            >
              <div className="w-full h-full flex items-center justify-center p-6 sm:p-12">
                <div className="relative w-full max-w-xs">
                  {/* Path progression visualization */}
                  {[
                    { label: "Week 1–2: Foundations", width: "100%", color: "rgba(207,123,75,0.9)", done: true },
                    { label: "Week 3–4: Volume", width: "75%", color: "rgba(207,123,75,0.65)", done: true },
                    { label: "Week 5–6: Intensity", width: "45%", color: "rgba(207,123,75,0.4)", done: false },
                    { label: "Week 7–8: Peak", width: "15%", color: "rgba(207,123,75,0.2)", done: false },
                  ].map(({ label, width, color, done }) => (
                    <div key={label} className="mb-3">
                      <div className="flex justify-between mb-1.5 items-center">
                        <span className="text-xs font-medium" style={{ color: done ? "var(--fp-text)" : "var(--fp-text-muted)" }}>
                          {label}
                        </span>
                        {done && <span style={{ color: "var(--fp-green)", fontSize: 11 }}>✓</span>}
                      </div>
                      <div className="h-6 rounded-full" style={{ width, backgroundColor: color, minWidth: "2.5rem" }} />
                    </div>
                  ))}
                  <p
                    className="mt-8 text-xs font-semibold uppercase tracking-widest text-center"
                    style={{ color: "var(--fp-text-muted)" }}
                  >
                    Strength Training Path — Week 5
                  </p>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div
              className="absolute bottom-3 left-3 sm:-bottom-6 sm:-left-6 rounded-2xl p-5 shadow-xl max-w-[200px]"
              style={{ backgroundColor: "var(--fp-surface)", border: "1px solid var(--fp-border-2)", color: "var(--fp-text)" }}
            >
              <p className="text-xs mb-1" style={{ color: "var(--fp-text-muted)" }}>Completion</p>
              <p
                className="text-4xl font-bold"
                style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--fp-accent)" }}
              >
                63%
              </p>
              <p className="text-xs mt-1" style={{ color: "var(--fp-text-muted)" }}>5 of 7 tasks done</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
