import Link from "next/link";

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
    { label: "Best Practices", href: "/paths" },
    { label: "Guides", href: "/paths" },
    { label: "Videos", href: "/paths" },
    { label: "FAQ", href: "/#faq" },
  ],
  Project: [
    { label: "About", href: "/#learn" },
    { label: "Changelog", href: "/paths" },
    { label: "GitHub", href: "https://github.com/DanySued/roadmap" },
    { label: "Privacy", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--fp-surface)" }}>
      {/* CTA band */}
      <div
        className="fp-section"
        style={{ borderBottom: "1px solid var(--fp-border)" }}
      >
        <div className="fp-container flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
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
          </div>

          <Link
            href="/paths"
            className="inline-flex items-center px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:opacity-90 shrink-0"
            style={{ backgroundColor: "var(--fp-accent)", color: "var(--fp-black)" }}
          >
            Browse Paths
          </Link>
        </div>
      </div>

      {/* Links */}
      <div style={{ paddingBlock: "3rem" }}>
        <div className="fp-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
            {Object.entries(links).map(([group, items]) => (
              <div key={group}>
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-5"
                  style={{ color: "var(--fp-text-muted)" }}
                >
                  {group}
                </p>
                <ul className="flex flex-col gap-3">
                  {items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm transition-opacity hover:opacity-100"
                        style={{ color: "var(--fp-text-muted)" }}
                        {...(item.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      >
                        {item.label}
                      </Link>
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
              <Link href="#" className="hover:opacity-70 transition-opacity">Privacy Policy</Link>
              <Link href="#" className="hover:opacity-70 transition-opacity">Terms of Service</Link>
              <span>© 2026 FitPath — Built by Dany Sue</span>
            </div>
          </div>
        </div>
      </div>

      {/* Large display wordmark */}
      <div
        className="fp-container pb-6 overflow-hidden"
        style={{ borderTop: "1px solid var(--fp-border)" }}
      >
        <Link
          href="/"
          className="block leading-none hover:opacity-70 transition-opacity"
          style={{
            fontFamily: "var(--font-instrument-serif)",
            fontStyle: "italic",
            fontSize: "clamp(4rem, 10vw, 7rem)",
            color: "var(--fp-white)",
            letterSpacing: "-0.02em",
          }}
        >
          fitpath
        </Link>
      </div>
    </footer>
  );
}
