import { notFound } from "next/navigation";
import Link from "next/link";
import { Wrench } from "lucide-react";
import Nav from "@/components/sections/Nav";
import Footer from "@/components/sections/Footer";
import TaskList from "@/components/fitpath/TaskList";
import PathIcon from "@/components/fitpath/PathIcon";
import { ALL_PATHS } from "@/lib/data/paths";
import { PATH_DATA } from "@/lib/data/path-details";

type Props = { params: Promise<{ id: string }> };

export async function generateStaticParams() {
  return ALL_PATHS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const path = ALL_PATHS.find((p) => p.id === id);
  if (!path) return {};
  return {
    title: `${path.title} — FitPath`,
    description: path.desc,
  };
}

export default async function PathDetailPage({ params }: Props) {
  const { id } = await params;
  const pathMeta = ALL_PATHS.find((p) => p.id === id);
  if (!pathMeta) notFound();

  const pathDetail = PATH_DATA[id];

  return (
    <>
      <Nav />
      <main style={{ minHeight: "100vh" }}>
        {/* Header */}
        <section
          style={{
            paddingTop: 96,
            paddingBottom: 48,
            borderBottom: "1px solid var(--fp-border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              top: -60,
              right: -60,
              width: 300,
              height: 300,
              borderRadius: "50%",
              background: `radial-gradient(circle, ${pathMeta.color}18 0%, transparent 70%)`,
              pointerEvents: "none",
            }}
          />

          <div className="fp-container" style={{ position: "relative", zIndex: 1 }}>
            {/* Back link */}
            <Link
              href="/paths"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                fontSize: 13,
                color: "var(--fp-text-muted)",
                marginBottom: 24,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M8 3L4 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              All paths
            </Link>

            <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap" }}>
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 16,
                  background: `${pathMeta.color}18`,
                  border: `1px solid ${pathMeta.color}30`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: pathMeta.color,
                  flexShrink: 0,
                }}
              >
                <PathIcon name={pathMeta.icon} size={30} strokeWidth={1.5} />
              </div>
              <div>
                <h1
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    color: "var(--fp-white)",
                    marginBottom: 10,
                  }}
                >
                  {pathMeta.title}
                </h1>
                <p style={{ fontSize: 15, color: "var(--fp-text-muted)", maxWidth: 500 }}>
                  {pathMeta.desc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Task list or coming soon */}
        <section style={{ paddingTop: 48, paddingBottom: 80 }}>
          <div className="fp-container" style={{ maxWidth: 680 }}>
            {pathDetail ? (
              <TaskList pathId={id} pathDetail={pathDetail} />
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "80px 40px",
                  background: "var(--fp-surface)",
                  border: "1px solid var(--fp-border)",
                  borderRadius: 20,
                }}
              >
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 16, color: "var(--fp-text-muted)" }}>
                  <Wrench size={48} strokeWidth={1} />
                </div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: "var(--fp-white)",
                    marginBottom: 10,
                    fontFamily: "var(--font-dm-sans), sans-serif",
                  }}
                >
                  Coming soon
                </h2>
                <p style={{ fontSize: 14, color: "var(--fp-text-muted)", maxWidth: 360, margin: "0 auto 24px" }}>
                  Detailed task stages for this path are in progress. In the meantime, explore our other fully-mapped paths.
                </p>
                <Link
                  href="/paths"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "10px 20px",
                    borderRadius: 10,
                    background: "var(--fp-accent)",
                    color: "var(--fp-black)",
                    fontSize: 14,
                    fontWeight: 600,
                    transition: "opacity 0.15s",
                  }}
                >
                  Browse all paths
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
