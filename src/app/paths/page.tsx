import PathGrid from "@/components/fitpath/PathGrid";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { ALL_PATHS } from "@/lib/data/paths";

export const metadata = {
  title: "Training Paths — FitPath",
  description: "Browse 24+ structured fitness training paths. From strength to marathon, yoga to CrossFit.",
};

export default function PathsPage() {
  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh" }}>
        {/* Hero header */}
        <section
          style={{
            paddingTop: 96,
            paddingBottom: 48,
            borderBottom: "1px solid var(--fp-border)",
          }}
        >
          <div className="fp-container">
            <p className="fp-eyebrow">24+ Training Paths</p>
            <h1
              style={{
                fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                color: "var(--fp-white)",
                maxWidth: 600,
                marginBottom: 16,
              }}
            >
              Find your{" "}
              <span style={{ fontStyle: "italic" }}>next challenge.</span>
            </h1>
            <p style={{ fontSize: 16, color: "var(--fp-text-muted)", maxWidth: 520 }}>
              Curated training paths from beginner to elite — each with progressive stages and
              task tracking so you always know what to do next.
            </p>

            {/* Stats strip */}
            <div
              style={{
                display: "flex",
                gap: 32,
                marginTop: 32,
                paddingTop: 24,
                borderTop: "1px solid var(--fp-border)",
                flexWrap: "wrap",
              }}
            >
              {[
                { value: `${ALL_PATHS.length}`, label: "Total paths" },
                { value: "500K+", label: "Active users" },
                { value: "Free", label: "Always" },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p style={{ fontWeight: 700, fontSize: 18, color: "var(--fp-white)" }}>{value}</p>
                  <p style={{ fontSize: 12, color: "var(--fp-text-muted)", marginTop: 2 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Grid */}
        <section style={{ paddingTop: 48, paddingBottom: 80 }}>
          <div className="fp-container">
            <PathGrid />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
