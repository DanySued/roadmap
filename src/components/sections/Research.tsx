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

export default function Research() {
  return (
    <section className="fp-section" style={{ backgroundColor: "var(--fp-surface)" }}>
      <div className="fp-container">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div>
            <p className="fp-eyebrow">What users say</p>
            <h2 style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}>
              Real people,
              <br />
              <span style={{ fontStyle: "italic" }}>real results.</span>
            </h2>

            <p
              className="mt-6 leading-relaxed max-w-sm"
              style={{ color: "var(--fp-text-muted)", fontSize: "0.9375rem" }}
            >
              FitPath works because structure works. Not willpower, not motivation —
              just a clear sequence of steps you can actually follow.
            </p>

            <div className="flex flex-wrap gap-6 sm:gap-8 mt-10 sm:mt-12">
              {[
                { value: "500K+", label: "Active users" },
                { value: "24+", label: "Training paths" },
                { value: "2.5M+", label: "Tasks completed" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p
                    className="text-3xl font-light"
                    style={{ fontFamily: "var(--font-instrument-serif)", color: "var(--fp-accent)" }}
                  >
                    {value}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "var(--fp-text-muted)" }}>
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {testimonials.map((t) => (
              <div
                key={t.handle}
                className="rounded-2xl p-6 transition-all duration-200"
                style={{ backgroundColor: "var(--fp-black)", border: "1px solid var(--fp-border)" }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ color: "var(--fp-accent)" }}
                  >
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
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
