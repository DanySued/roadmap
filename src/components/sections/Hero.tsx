import Link from "next/link";

const headlineBase: React.CSSProperties = {
  fontSize: "clamp(3rem, 5.6vw, 4rem)",
  color: "var(--fp-white)",
  fontFamily: "var(--font-instrument-serif), serif",
  fontWeight: 400,
  lineHeight: 1.05,
  letterSpacing: "-0.01em",
  display: "block",
};

export default function Hero() {
  return (
    <section
      className="relative flex flex-col justify-end pb-12 sm:pb-20 overflow-hidden"
      style={{ backgroundColor: "var(--fp-black)", minHeight: "clamp(520px, calc(100vh - 64px), 900px)" }}
    >
      <div className="hero-deco absolute inset-0" style={{ background: "radial-gradient(ellipse 80% 60% at 60% 40%, rgba(207,123,75,0.08) 0%, rgba(26,23,20,0.95) 70%)" }} />
      <div className="hero-deco hero-drift-left absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full opacity-15" style={{ background: "radial-gradient(circle, var(--fp-accent) 0%, transparent 70%)" }} />
      <div className="hero-deco hero-drift-right absolute bottom-0 -left-12 w-[400px] h-[400px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, var(--fp-green) 0%, transparent 70%)" }} />
      <div className="hero-deco hero-drift-subtle absolute right-0 top-0 bottom-0 w-1/2 hidden lg:flex items-center justify-center opacity-20">
        <div className="w-64 h-64 rounded-full" style={{ background: "radial-gradient(circle at 40% 40%, rgba(207,123,75,0.25) 0%, rgba(42,36,32,0.5) 60%, transparent 100%)", boxShadow: "0 0 120px 40px rgba(207,123,75,0.08)" }} />
      </div>

      <div className="fp-container relative z-10">
        <p className="fp-eyebrow">
          Structured fitness for every goal
        </p>

        <span className="block" style={headlineBase}>
          Train with purpose.
        </span>
        <span className="block mb-6" style={{ ...headlineBase, fontStyle: "italic" }}>
          Progress with clarity.
        </span>

        <p className="mb-10 max-w-md leading-relaxed" style={{ color: "rgba(212,204,196,0.75)", fontSize: "0.9375rem" }}>
          24+ curated training paths — from strength to marathon, yoga to CrossFit.
          Each path breaks your goal into progressive stages you can actually follow.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <Link
            href="/paths"
            className="inline-flex items-center px-8 py-3.5 text-sm font-semibold rounded-xl transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
            style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
          >
            Browse Paths
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-60"
            style={{ color: "var(--fp-text-muted)" }}
          >
            Learn more
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>

        <div className="flex flex-wrap items-center gap-6 mt-16 pt-8" style={{ borderTop: "1px solid var(--fp-border)" }}>
          {[
            { label: "Training paths", value: "24+" },
            { label: "Active users", value: "500K+" },
            { label: "Workouts logged", value: "2.5M+" },
          ].map(({ label, value }) => (
            <div key={label}>
              <p className="font-semibold text-base" style={{ color: "var(--fp-white)" }}>{value}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--fp-text-muted)" }}>{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
