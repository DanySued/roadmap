import Link from "next/link";

const features = [
  {
    tag: "01",
    title: "Progressive stage design",
    desc: "Every path breaks your goal into ordered stages — beginner to advanced. No guesswork. You always know exactly what's next.",
    accent: "var(--fp-accent)",
  },
  {
    tag: "02",
    title: "Task completion tracking",
    desc: "Check off each stage as you go. Your progress is saved locally and persists across sessions — no account required.",
    accent: "var(--fp-green)",
  },
  {
    tag: "03",
    title: "Real-time search",
    desc: "Filter 24+ paths by sport, goal, or skill. ⌘K shortcut opens instant search from anywhere on the paths page.",
    accent: "#bc8cff",
  },
  {
    tag: "04",
    title: "Custom path builder",
    desc: "Don't see what you need? Build your own 4-step training path and share it with your community.",
    accent: "#d4ccc4",
  },
];

export default function FeatureCarousel() {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ backgroundColor: "var(--fp-surface)" }}
      id="features"
    >
      <div className="fp-container mb-12">
        <p className="fp-eyebrow">How it works</p>
        <h2 style={{ fontSize: "clamp(2.25rem, 4.8vw, 3rem)", color: "var(--fp-white)" }}>
          Built for{" "}
          <span style={{ fontStyle: "italic", color: "var(--fp-accent)" }}>
            real progress
          </span>
        </h2>
      </div>

      {/* Responsive bento grid */}
      <div className="fp-container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((f) => (
          <div
            key={f.tag}
            className="rounded-2xl p-7 flex flex-col justify-between"
            style={{
              backgroundColor: "var(--fp-black)",
              border: "1px solid var(--fp-border)",
              minHeight: "280px",
            }}
          >
            <div>
              <span
                className="text-xs font-semibold uppercase tracking-widest mb-6 block"
                style={{ color: "var(--fp-text-muted)" }}
              >
                {f.tag}
              </span>
              <h3
                className="text-xl font-semibold mb-3 leading-snug"
                style={{ fontFamily: "var(--font-dm-sans)", color: "var(--fp-white)" }}
              >
                {f.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--fp-text-muted)" }}>
                {f.desc}
              </p>
            </div>

            {/* Color accent dot */}
            <div
              className="mt-8 w-10 h-10 rounded-full opacity-80"
              style={{ backgroundColor: f.accent }}
            />
          </div>
        ))}

      </div>
    </section>

  );
}
