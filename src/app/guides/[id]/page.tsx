import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import { GUIDES_BY_ID, CATEGORY_COLORS } from "@/lib/data/guides";
import { Clock, ArrowLeft, CheckCircle, ArrowRight } from "lucide-react";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  const { GUIDES } = await import("@/lib/data/guides");
  return GUIDES.map((g) => ({ id: g.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const guide = GUIDES_BY_ID[id];
  if (!guide) return {};
  return {
    title: `${guide.title} — FitPath Guides`,
    description: guide.excerpt,
  };
}

export default async function GuidePage({ params }: Props) {
  const { id } = await params;
  const guide = GUIDES_BY_ID[id];
  if (!guide) notFound();

  const color = CATEGORY_COLORS[guide.category] ?? "#aaa8ff";

  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh", backgroundColor: "var(--fp-black)" }}>
        {/* Hero */}
        <section
          style={{
            paddingTop: 80,
            paddingBottom: 56,
            borderBottom: "1px solid var(--fp-border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -80,
              right: -80,
              width: 500,
              height: 500,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${color}12 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />
          <div className="fp-container" style={{ maxWidth: 760, position: "relative", zIndex: 1 }}>
            <Link
              href="/guides"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--fp-text-muted)",
                marginBottom: 28,
                textDecoration: "none",
              }}
            >
              <ArrowLeft size={14} />
              All guides
            </Link>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <span
                style={{
                  padding: "4px 12px",
                  background: `${color}18`,
                  color,
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.02em",
                }}
              >
                {guide.category}
              </span>
              <span
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  fontSize: 12,
                  color: "var(--fp-text-muted)",
                }}
              >
                <Clock size={12} />
                {guide.readTime} read
              </span>
            </div>

            <h1
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                color: "var(--fp-white)",
                marginBottom: 20,
                lineHeight: 1.1,
              }}
            >
              {guide.title}
            </h1>

            <p
              style={{
                fontSize: 17,
                color: "var(--fp-text-muted)",
                lineHeight: 1.7,
                maxWidth: 600,
              }}
            >
              {guide.intro}
            </p>
          </div>
        </section>

        {/* Article body */}
        <section style={{ paddingTop: 56, paddingBottom: 80 }}>
          <div className="fp-container" style={{ maxWidth: 680 }}>
            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>
              {guide.sections.map((section, i) => (
                <div key={i}>
                  <h2
                    style={{
                      fontSize: "clamp(1.1rem, 2vw, 1.35rem)",
                      fontWeight: 700,
                      color: "var(--fp-white)",
                      marginBottom: 14,
                      fontFamily: "var(--font-dm-sans), sans-serif",
                      lineHeight: 1.3,
                    }}
                  >
                    {section.heading}
                  </h2>
                  <p
                    style={{
                      fontSize: 16,
                      color: "var(--fp-text)",
                      lineHeight: 1.8,
                    }}
                  >
                    {section.body}
                  </p>
                </div>
              ))}
            </div>

            {/* Key takeaways */}
            <div
              style={{
                marginTop: 64,
                padding: "32px",
                background: `${color}08`,
                border: `1px solid ${color}20`,
                borderRadius: 18,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                <CheckCircle size={18} color={color} />
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 700,
                    color: "var(--fp-white)",
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  Key Takeaways
                </h3>
              </div>
              <ul style={{ display: "flex", flexDirection: "column", gap: 12, listStyle: "none", padding: 0, margin: 0 }}>
                {guide.keyTakeaways.map((point, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      fontSize: 14,
                      color: "var(--fp-text-muted)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        background: `${color}22`,
                        color,
                        fontSize: 11,
                        fontWeight: 800,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      {i + 1}
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div
              style={{
                marginTop: 56,
                paddingTop: 48,
                borderTop: "1px solid var(--fp-border)",
                textAlign: "center",
              }}
            >
              <p style={{ fontSize: 15, color: "var(--fp-text-muted)", marginBottom: 20 }}>
                Ready to put this into practice?
              </p>
              <Link
                href="/paths"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "13px 26px",
                  background: "var(--fp-accent)",
                  color: "var(--fp-black)",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 14,
                  textDecoration: "none",
                }}
              >
                Browse Training Paths <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>

        {/* More guides */}
        <section
          style={{
            paddingBlock: "4rem",
            borderTop: "1px solid var(--fp-border)",
          }}
        >
          <div className="fp-container">
            <p style={{ fontSize: 13, fontWeight: 600, color: "var(--fp-text-muted)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 24 }}>
              More guides
            </p>
            <Link
              href="/guides"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 14,
                fontWeight: 600,
                color: "var(--fp-accent)",
                textDecoration: "none",
              }}
            >
              View all guides <ArrowRight size={14} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
