"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Trophy, Sparkles, Flame, CheckCircle2, Medal, Target, Activity,
  ClipboardList, BookOpen, Play, TrendingUp, Shield, Moon, Calendar, Apple, Waves,
  Lock, X, ArrowRight, HeartPulse,
} from "lucide-react";
import type { RoadmapStage, RoadmapMeta } from "@/lib/data/path-details";

// ── Types ────────────────────────────────────────────────────────────────────
type Props = {
  pathId: string;
  pathColor: string;
  stages: RoadmapStage[];
  roadmapMeta: RoadmapMeta[];
};

// ── Constants ────────────────────────────────────────────────────────────────
const VB_W = 1100;
const VB_H = 2160;

// ── Geometry ─────────────────────────────────────────────────────────────────
function buildLayout(amplitude: number) {
  const cx = VB_W / 2;
  const dx = 230 * amplitude;
  const ys = [140, 440, 740, 1040, 1340, 1640, 1960];
  const sides = [-1, 1, -1, 1, -1, 1, 0];
  return ys.map((y, i) => ({ x: cx + sides[i] * dx, y, side: sides[i] }));
}

function buildRoadPath(points: { x: number; y: number }[]) {
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1], p1 = points[i];
    const midY = (p0.y + p1.y) / 2;
    d += ` C ${p0.x} ${midY}, ${p1.x} ${midY}, ${p1.x} ${p1.y}`;
  }
  return d;
}

// ── Icon map ──────────────────────────────────────────────────────────────────
const LINK_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  "clipboard-list": ClipboardList,
  "book-open": BookOpen,
  "heart-pulse": HeartPulse,
  "play": Play,
  "target": Target,
  "trending-up": TrendingUp,
  "shield": Shield,
  "apple": Apple,
  "waves": Waves,
  "moon": Moon,
  "calendar": Calendar,
  "trophy": Trophy,
};

// ── Confetti ──────────────────────────────────────────────────────────────────
function confettiBurst() {
  if (typeof window === "undefined") return;
  const colors = ["#aaa8ff", "#7f9ef8", "#fad0f3", "#fffba5", "#c1cff8", "#ffffff"];
  const count = 180;
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 10 + 6;
    const x = Math.random() * 100;
    const delay = Math.random() * 0.6;
    const duration = Math.random() * 2 + 2;
    const rotate = Math.random() * 720 - 360;
    const dx = (Math.random() - 0.5) * 200;
    el.style.position = "fixed";
    el.style.left = `${x}vw`;
    el.style.top = "-10px";
    el.style.width = `${size}px`;
    el.style.height = `${size}px`;
    el.style.background = color;
    el.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    el.style.pointerEvents = "none";
    el.style.zIndex = "9999";
    el.style.animation = `rm-fall ${duration}s ${delay}s cubic-bezier(.25,.46,.45,.94) forwards`;
    (el.style as unknown as Record<string, string>)["--dx"] = `${dx}px`;
    (el.style as unknown as Record<string, string>)["--rot"] = `${rotate}deg`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), (duration + delay) * 1000 + 100);
  }
}

// ── MapPin ────────────────────────────────────────────────────────────────────
function MapPin({
  state,
  stageNum,
  color,
  onClick,
}: {
  state: "done" | "current" | "locked";
  stageNum: number;
  color: string;
  onClick?: () => void;
}) {
  const isFinish = stageNum === 7;

  if (isFinish && state === "done") {
    return (
      <button
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 56,
          height: 56,
        }}
        aria-label="Stage 7 complete"
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: "50%",
            background: `linear-gradient(135deg, #fffba5, #fad0f3)`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: `0 0 0 4px rgba(255,251,165,0.25), 0 8px 24px rgba(0,0,0,0.4)`,
            animation: "rm-head-pulse 2s ease-in-out infinite",
          }}
        >
          <Trophy size={26} color="#030203" strokeWidth={2} />
        </div>
      </button>
    );
  }

  if (state === "current") {
    return (
      <button
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 48,
          height: 48,
        }}
        aria-label={`Stage ${stageNum} current`}
      >
        <div className="rm-pulse-ring" style={{
          width: 48,
          height: 48,
          borderRadius: "50%",
          background: color,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 0 3px ${color}55, 0 6px 20px rgba(0,0,0,0.4)`,
          animation: "rm-pulse 2s ease-in-out infinite",
          position: "relative",
        }}>
          <span style={{ fontSize: 16, fontWeight: 700, color: "#030203" }}>{stageNum}</span>
        </div>
      </button>
    );
  }

  if (state === "done") {
    return (
      <button
        onClick={onClick}
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: 44,
          height: 44,
        }}
        aria-label={`Stage ${stageNum} done`}
      >
        <div style={{
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: `linear-gradient(135deg, ${color}, ${color}cc)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: `0 0 0 2px ${color}44, 0 4px 16px rgba(0,0,0,0.4)`,
        }}>
          <CheckCircle2 size={20} color="#030203" strokeWidth={2.5} />
        </div>
      </button>
    );
  }

  // locked
  return (
    <div style={{
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.06)",
      border: "1.5px solid rgba(255,255,255,0.12)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}>
      <Lock size={16} color="rgba(255,255,255,0.3)" strokeWidth={2} />
    </div>
  );
}

// ── CelebrationOverlay ────────────────────────────────────────────────────────
function CelebrationOverlay({
  stage,
  completedCount,
  totalCount,
  onDismiss,
}: {
  stage: RoadmapStage;
  completedCount: number;
  totalCount: number;
  onDismiss: () => void;
}) {
  const [timerWidth, setTimerWidth] = useState(100);
  const DURATION = 10000;

  useEffect(() => {
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setTimerWidth(pct);
      if (elapsed < DURATION) requestAnimationFrame(tick);
      else onDismiss();
    };
    const raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDismiss]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onDismiss(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onDismiss]);

  const words = stage.title.split(" ");
  const lastWord = words.pop();
  const restWords = words.join(" ");

  const isFinish = stage.id === 7;

  return (
    <div
      onClick={onDismiss}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        background: "rgba(3,2,3,0.75)",
        backdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "linear-gradient(160deg, #1a1c28 0%, #111318 100%)",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: 24,
          padding: "40px 36px 32px",
          maxWidth: 440,
          width: "100%",
          position: "relative",
          animation: "rm-celebrate-pop .5s cubic-bezier(.34,1.56,.64,1) forwards",
          overflow: "hidden",
        }}
      >
        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: isFinish
                ? "linear-gradient(135deg, #fffba5, #fad0f3)"
                : "linear-gradient(135deg, #aaa8ff, #7f9ef8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: isFinish
                ? "0 0 0 6px rgba(255,251,165,0.2), 0 12px 32px rgba(0,0,0,0.4)"
                : "0 0 0 6px rgba(170,168,255,0.2), 0 12px 32px rgba(0,0,0,0.4)",
              animation: "rm-celebrate-badge .6s cubic-bezier(.34,1.56,.64,1) .1s backwards",
            }}
          >
            {isFinish ? (
              <Trophy size={32} color="#030203" strokeWidth={2} />
            ) : (
              <Medal size={32} color="#030203" strokeWidth={2} />
            )}
          </div>
        </div>

        {/* Eyebrow */}
        <p style={{
          textAlign: "center",
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.4)",
          marginBottom: 10,
        }}>
          Stage {stage.id} complete
        </p>

        {/* Title */}
        <h2 style={{
          textAlign: "center",
          fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 8,
          fontFamily: "var(--font-instrument-serif), serif",
          lineHeight: 1.2,
        }}>
          {restWords && <>{restWords} </>}
          {lastWord && <em style={{ fontStyle: "italic" }}>{lastWord}</em>}
        </h2>

        {/* Duration */}
        <p style={{
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.45)",
          marginBottom: 20,
        }}>
          {stage.milestone} · {stage.duration}
        </p>

        {/* Motivational sub text */}
        <p style={{
          textAlign: "center",
          fontSize: 14,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.6,
          marginBottom: 24,
          padding: "0 8px",
        }}>
          {isFinish
            ? "You've completed the full marathon journey. Incredible commitment."
            : "Keep your momentum — the next stage is unlocked and ready."}
        </p>

        {/* Progress count */}
        <div style={{
          textAlign: "center",
          fontSize: 13,
          color: "rgba(255,255,255,0.35)",
          marginBottom: 20,
        }}>
          {completedCount} of {totalCount} stages complete
        </div>

        {/* Timer bar */}
        <div style={{
          height: 3,
          borderRadius: 2,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}>
          <div
            style={{
              height: "100%",
              borderRadius: 2,
              background: "linear-gradient(90deg, #aaa8ff, #7f9ef8)",
              width: `${timerWidth}%`,
              transition: "width 0.1s linear",
            }}
          />
        </div>
      </div>
    </div>
  );
}

// ── StageDetailsModal ─────────────────────────────────────────────────────────
function StageDetailsModal({
  stage,
  onClose,
}: {
  stage: RoadmapStage;
  onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 900,
        background: "rgba(3,2,3,0.7)",
        backdropFilter: "blur(10px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#111318",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: 20,
          padding: "32px 28px",
          maxWidth: 480,
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          position: "relative",
          animation: "rm-modal-in .3s cubic-bezier(.34,1.2,.64,1) forwards",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 16,
            right: 16,
            background: "rgba(255,255,255,0.06)",
            border: "none",
            borderRadius: 8,
            width: 32,
            height: 32,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(255,255,255,0.5)",
          }}
        >
          <X size={16} />
        </button>

        {/* Header pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 6,
            padding: "4px 10px",
          }}>
            Stage {stage.id}
          </span>
          <span style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.4)",
            background: "rgba(255,255,255,0.06)",
            borderRadius: 6,
            padding: "4px 10px",
          }}>
            {stage.duration}
          </span>
        </div>

        {/* Title */}
        <h3 style={{
          fontSize: "1.35rem",
          fontWeight: 700,
          color: "#ffffff",
          marginBottom: 12,
          fontFamily: "var(--font-instrument-serif), serif",
        }}>
          {stage.title}
        </h3>

        {/* Desc */}
        <p style={{
          fontSize: 14,
          color: "rgba(255,255,255,0.6)",
          lineHeight: 1.7,
          marginBottom: 24,
        }}>
          {stage.desc}
        </p>

        {/* What you'll do */}
        <p style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.35)",
          marginBottom: 12,
        }}>
          What you&apos;ll do
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px" }}>
          {stage.details.map((d, i) => (
            <li key={i} style={{
              display: "flex",
              gap: 10,
              alignItems: "flex-start",
              marginBottom: 10,
            }}>
              <span style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "rgba(170,168,255,0.15)",
                border: "1px solid rgba(170,168,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}>
                <CheckCircle2 size={11} color="#aaa8ff" strokeWidth={2.5} />
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", lineHeight: 1.55 }}>{d}</span>
            </li>
          ))}
        </ul>

        {/* Links */}
        {stage.links.length > 0 && (
          <>
            <p style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
              marginBottom: 12,
            }}>
              More on this stage
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {stage.links.map((link, i) => {
                const Icon = LINK_ICONS[link.icon] || BookOpen;
                return (
                  <button
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      cursor: "pointer",
                      textAlign: "left",
                      width: "100%",
                      transition: "background 0.15s",
                    }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.07)"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.04)"; }}
                  >
                    <span style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "rgba(170,168,255,0.1)",
                      border: "1px solid rgba(170,168,255,0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}>
                      <Icon size={15} color="#aaa8ff" strokeWidth={1.8} />
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{link.label}</span>
                    <ArrowRight size={13} color="rgba(255,255,255,0.3)" strokeWidth={2} style={{ marginLeft: "auto" }} />
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── RoadmapView ───────────────────────────────────────────────────────────────
export default function RoadmapView({ pathId, pathColor, stages, roadmapMeta }: Props) {
  const AMPLITUDE = 0.95;
  const SHOW_MILESTONES = true;

  const [completed, setCompleted] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [celebrateStage, setCelebrateStage] = useState<RoadmapStage | null>(null);

  const [pathLength, setPathLength] = useState(0);
  const [shineAnim, setShineAnim] = useState<{ fromOffset: number; toOffset: number } | null>(null);
  const prevCompletedRef = useRef<number[]>([]);
  const pathRef = useRef<SVGPathElement | null>(null);
  const shineRef = useRef<SVGPathElement | null>(null);

  // Persist state
  useEffect(() => {
    const saved = localStorage.getItem(`fitpath_progress_${pathId}`);
    if (saved) {
      try { setCompleted(JSON.parse(saved)); } catch {}
    }
    const savedStarted = localStorage.getItem(`fitpath_started_${pathId}`);
    if (savedStarted === "true") setStarted(true);
  }, [pathId]);

  useEffect(() => {
    localStorage.setItem(`fitpath_progress_${pathId}`, JSON.stringify(completed));
  }, [completed, pathId]);

  useEffect(() => {
    localStorage.setItem(`fitpath_started_${pathId}`, String(started));
  }, [started, pathId]);

  const layout = buildLayout(AMPLITUDE);
  const roadPath = buildRoadPath(layout);

  // Measure path length
  useLayoutEffect(() => {
    if (pathRef.current) {
      setPathLength(pathRef.current.getTotalLength());
    }
  }, [roadPath]);

  // Compute progress
  const total = stages.length;
  const doneCount = completed.length;
  const fillFraction = pathLength > 0 ? (doneCount / total) : 0;
  const filledLength = fillFraction * pathLength;

  // Shine animation on new completion
  useEffect(() => {
    const prev = prevCompletedRef.current;
    if (completed.length > prev.length && pathLength > 0) {
      const prevFraction = prev.length / total;
      const newFraction = completed.length / total;
      const fromOffset = pathLength - prevFraction * pathLength;
      const toOffset = pathLength - newFraction * pathLength;
      setShineAnim({ fromOffset, toOffset });
      setTimeout(() => setShineAnim(null), 1200);
    }
    prevCompletedRef.current = completed;
  }, [completed, pathLength, total]);

  // Apply shine to SVG element
  useEffect(() => {
    if (!shineRef.current || !shineAnim) return;
    const el = shineRef.current;
    el.style.strokeDasharray = String(pathLength);
    el.style.strokeDashoffset = String(shineAnim.fromOffset);
    el.classList.remove("rm-road-shine");
    void (el as unknown as HTMLElement).offsetWidth;
    el.style.strokeDashoffset = String(shineAnim.toOffset);
    el.classList.add("rm-road-shine");
  }, [shineAnim, pathLength]);

  // Sequential lock logic
  const firstUnfinishedIdx = stages.findIndex((s) => !completed.includes(s.id));
  const mostRecentCompletedId = completed.length > 0 ? completed[completed.length - 1] : null;

  function getStageState(stage: RoadmapStage): "done" | "current" | "locked" {
    if (completed.includes(stage.id)) return "done";
    const idx = stages.findIndex((s) => s.id === stage.id);
    if (idx === firstUnfinishedIdx) return "current";
    return "locked";
  }

  function canToggle(stage: RoadmapStage): boolean {
    const state = getStageState(stage);
    if (state === "current") {
      if (stage.id === stages[0].id) return started;
      return true;
    }
    if (state === "done") {
      return stage.id === mostRecentCompletedId;
    }
    return false;
  }

  const handlePinClick = useCallback((stage: RoadmapStage) => {
    if (!canToggle(stage)) return;
    const isDone = completed.includes(stage.id);
    if (isDone) {
      // uncheck most recent
      setCompleted((prev) => prev.filter((id) => id !== stage.id));
    } else {
      // complete
      const next = [...completed, stage.id];
      setCompleted(next);
      confettiBurst();
      setCelebrateStage(stage);
    }
  }, [canToggle, completed]);

  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return (
    <>
      {/* ── Injected CSS ───────────────────────────────────────────────── */}
      <style>{`
        @keyframes rm-pulse {
          0%, 100% { box-shadow: 0 0 0 3px ${pathColor}55, 0 6px 20px rgba(0,0,0,.4); transform: scale(1); }
          50%       { box-shadow: 0 0 0 8px ${pathColor}22, 0 6px 20px rgba(0,0,0,.4); transform: scale(1.06); }
        }
        @keyframes rm-head-pulse {
          0%, 100% { transform: scale(1); }
          50%       { transform: scale(1.08); }
        }
        @keyframes rm-shine-sweep {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes rm-fall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--dx)) rotate(var(--rot)); opacity: 0; }
        }
        @keyframes rm-celebrate-pop {
          0%   { transform: translateY(20px) scale(.94); }
          60%  { transform: translateY(-4px) scale(1.02); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes rm-celebrate-badge {
          0%   { transform: scale(.5) rotate(-20deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes rm-modal-in {
          0%   { transform: translateY(16px) scale(.97); }
          100% { transform: translateY(0) scale(1); }
        }
        @keyframes rm-fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes rm-letsgo-pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(170,168,255,.4); }
          50%       { transform: scale(1.03); box-shadow: 0 6px 28px rgba(170,168,255,.6); }
        }
        .rm-road-progress { transition: stroke-dashoffset .9s cubic-bezier(.22,.8,.24,1); }
        .rm-road-shine { animation: rm-shine-sweep 1.1s cubic-bezier(.3,.7,.3,1) forwards; }
        .rm-letsgo-btn {
          animation: rm-letsgo-pulse 2.4s ease-in-out infinite;
          cursor: pointer;
          border: none;
          padding: 14px 32px;
          border-radius: 12px;
          background: linear-gradient(135deg, #aaa8ff, #7f9ef8);
          color: #030203;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: .02em;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: opacity .15s;
        }
        .rm-letsgo-btn:hover { opacity: .9; }
        .rm-stage-card {
          background: rgba(17,19,24,.92);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 16px;
          padding: 16px 18px;
          position: absolute;
          width: 31%;
          backdrop-filter: blur(8px);
          transition: border-color .2s;
        }
        .rm-stage-card:hover { border-color: rgba(255,255,255,.18); }
        .rm-stage-card-locked {
          opacity: .45;
        }
        .rm-milestone-label {
          position: absolute;
          font-size: 11px;
          font-weight: 600;
          color: rgba(255,255,255,.35);
          letter-spacing: .06em;
          text-transform: uppercase;
          white-space: nowrap;
        }
        .rm-leader-line {
          position: absolute;
          height: 1px;
          background: rgba(255,255,255,.14);
          transform-origin: left center;
        }
        .rm-pin-wrap {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 10;
        }
      `}</style>

      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section style={{
        paddingTop: 96,
        paddingBottom: 48,
        borderBottom: "1px solid var(--fp-border)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Ambient glow */}
        <div style={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 340,
          height: 340,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${pathColor}18 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

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
              textDecoration: "none",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M8 3L4 7l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            All paths
          </Link>

          {/* Icon + eyebrow + title + desc */}
          <div style={{ display: "flex", alignItems: "flex-start", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: `${pathColor}18`,
              border: `1px solid ${pathColor}30`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <Activity size={30} strokeWidth={1.5} color="#7f9ef8" />
            </div>
            <div>
              <p style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--fp-text-muted)",
                marginBottom: 8,
              }}>
                Training path · By sport
              </p>
              <h1 style={{
                fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                fontFamily: "var(--font-instrument-serif), serif",
                color: "var(--fp-white)",
                marginBottom: 10,
                lineHeight: 1.15,
              }}>
                Running <em style={{ fontStyle: "italic" }}>roadmap.</em>
              </h1>
              <p style={{ fontSize: 15, color: "var(--fp-text-muted)", maxWidth: 500 }}>
                Training progression from beginner to marathon runner
              </p>
            </div>
          </div>

          {/* Meta grid */}
          <div style={{
            display: "flex",
            gap: 32,
            flexWrap: "wrap",
            marginBottom: 32,
          }}>
            {roadmapMeta.map((m) => (
              <div key={m.label}>
                <div style={{ fontSize: 20, fontWeight: 700, color: "var(--fp-white)", marginBottom: 2 }}>{m.value}</div>
                <div style={{ fontSize: 12, color: "var(--fp-text-muted)" }}>{m.label}</div>
              </div>
            ))}
          </div>

          {/* Progress strip */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 13, color: "var(--fp-text-muted)" }}>Progress</span>
              <span style={{ fontSize: 13, color: "var(--fp-text-muted)" }}>{doneCount}/{total} ({pct}%)</span>
            </div>
            <div style={{
              height: 6,
              borderRadius: 3,
              background: "rgba(255,255,255,0.08)",
              overflow: "hidden",
            }}>
              <div style={{
                height: "100%",
                borderRadius: 3,
                background: `linear-gradient(90deg, ${pathColor}, #aaa8ff)`,
                width: `${pct}%`,
                transition: "width .9s cubic-bezier(.22,.8,.24,1)",
              }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Let's go CTA (if not started) ──────────────────────────────── */}
      {!started && doneCount === 0 && (
        <section style={{ padding: "40px 0", borderBottom: "1px solid var(--fp-border)" }}>
          <div className="fp-container" style={{ display: "flex", justifyContent: "center" }}>
            <button
              className="rm-letsgo-btn"
              onClick={() => setStarted(true)}
            >
              <Flame size={18} strokeWidth={2} />
              Let&apos;s go
            </button>
          </div>
        </section>
      )}

      {/* ── Roadmap canvas ──────────────────────────────────────────────── */}
      <section style={{ padding: "40px 0 80px" }}>
        <div className="fp-container">
          <div style={{
            position: "relative",
            aspectRatio: `${VB_W}/${VB_H}`,
            maxWidth: 880,
            margin: "0 auto",
          }}>
            {/* SVG road */}
            <svg
              width="100%"
              height="100%"
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", inset: 0 }}
            >
              <defs>
                <filter id="rm-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#000" floodOpacity="0.5" />
                </filter>
              </defs>

              {/* Road base (grey track) */}
              <path
                d={roadPath}
                fill="none"
                stroke="rgba(255,255,255,0.07)"
                strokeWidth={52}
                strokeLinecap="round"
              />
              {/* Road edge lines */}
              <path
                d={roadPath}
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth={56}
                strokeLinecap="round"
              />

              {/* Progress fill */}
              <path
                ref={pathRef}
                d={roadPath}
                fill="none"
                stroke={pathColor}
                strokeWidth={10}
                strokeLinecap="round"
                strokeDasharray={pathLength}
                strokeDashoffset={pathLength > 0 ? pathLength - filledLength : pathLength}
                className="rm-road-progress"
                style={{ opacity: 0.7, filter: `drop-shadow(0 0 6px ${pathColor}88)` }}
              />

              {/* Shine sweep */}
              {shineAnim && (
                <path
                  ref={shineRef}
                  d={roadPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.9)"
                  strokeWidth={12}
                  strokeLinecap="round"
                />
              )}
            </svg>

            {/* Overlay for pins, cards, labels */}
            <div style={{ position: "absolute", inset: 0 }}>
              {stages.map((stage, i) => {
                const pt = layout[i];
                const pctLeft = (pt.x / VB_W) * 100;
                const pctTop = (pt.y / VB_H) * 100;
                const side = pt.side as -1 | 1 | 0;
                const stageState = getStageState(stage);
                const isLocked = stageState === "locked";
                const isFinish = stage.id === 7;

                // Card positioning
                let cardLeft: string | undefined;
                let cardRight: string | undefined;
                let cardTop: string;

                if (isFinish) {
                  cardLeft = "50%";
                  cardTop = `${pctTop + 4}%`;
                } else if (side === -1) {
                  // pin is on left; card goes further left
                  cardRight = `${100 - pctLeft + 2}%`;
                  cardTop = `${pctTop - 6}%`;
                } else {
                  // side === 1; pin on right; card goes further right
                  cardLeft = `${pctLeft + 2}%`;
                  cardTop = `${pctTop - 6}%`;
                }

                // Milestone label (opposite side from card)
                let mlLeft: string | undefined;
                let mlRight: string | undefined;
                const mlTop = `${pctTop - 3}%`;

                if (!isFinish) {
                  if (side === -1) {
                    // card is on left; milestone on right
                    mlLeft = `${pctLeft + 4}%`;
                  } else {
                    mlRight = `${100 - pctLeft + 4}%`;
                  }
                }

                return (
                  <div key={stage.id}>
                    {/* Pin */}
                    <div
                      className="rm-pin-wrap"
                      style={{
                        left: `${pctLeft}%`,
                        top: `${pctTop}%`,
                      }}
                    >
                      <MapPin
                        state={stageState}
                        stageNum={stage.id}
                        color={pathColor}
                        onClick={() => handlePinClick(stage)}
                      />
                    </div>

                    {/* Stage card */}
                    <div
                      className={`rm-stage-card${isLocked ? " rm-stage-card-locked" : ""}`}
                      style={{
                        left: cardLeft,
                        right: cardRight,
                        top: cardTop,
                        transform: isFinish ? "translateX(-50%)" : undefined,
                      }}
                    >
                      {/* Stage number + duration */}
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{
                          fontSize: 10,
                          fontWeight: 700,
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                          color: stageState === "done" ? pathColor : "rgba(255,255,255,0.3)",
                        }}>
                          Stage {stage.id}
                        </span>
                        <span style={{
                          fontSize: 10,
                          color: "rgba(255,255,255,0.3)",
                          fontWeight: 500,
                        }}>
                          {stage.duration}
                        </span>
                      </div>

                      {/* Title */}
                      <p style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: isLocked ? "rgba(255,255,255,0.4)" : "var(--fp-white)",
                        marginBottom: 6,
                        lineHeight: 1.35,
                      }}>
                        {stage.title}
                      </p>

                      {/* Desc snippet */}
                      {!isLocked && (
                        <p style={{
                          fontSize: 11,
                          color: "rgba(255,255,255,0.45)",
                          lineHeight: 1.5,
                          marginBottom: 10,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}>
                          {stage.desc}
                        </p>
                      )}

                      {/* Actions */}
                      <div style={{ display: "flex", gap: 6, alignItems: "center", flexWrap: "wrap" }}>
                        {!isLocked && (
                          <button
                            onClick={() => setExpandedId(stage.id)}
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: "rgba(255,255,255,0.5)",
                              background: "rgba(255,255,255,0.06)",
                              border: "none",
                              borderRadius: 6,
                              padding: "4px 8px",
                              cursor: "pointer",
                              transition: "color .15s, background .15s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.8)";
                              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.1)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.5)";
                              (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.06)";
                            }}
                          >
                            Details
                          </button>
                        )}
                        {canToggle(stage) && (
                          <button
                            onClick={() => handlePinClick(stage)}
                            style={{
                              fontSize: 10,
                              fontWeight: 600,
                              color: stageState === "done" ? "rgba(255,255,255,.5)" : "#030203",
                              background: stageState === "done"
                                ? "rgba(255,255,255,0.06)"
                                : `linear-gradient(135deg, ${pathColor}, #aaa8ff)`,
                              border: "none",
                              borderRadius: 6,
                              padding: "4px 8px",
                              cursor: "pointer",
                              transition: "opacity .15s",
                            }}
                          >
                            {stageState === "done" ? "Undo" : isFinish ? "Finish!" : "Complete"}
                          </button>
                        )}
                        {isLocked && !canToggle(stage) && (
                          <span style={{ fontSize: 10, color: "rgba(255,255,255,.25)" }}>Locked</span>
                        )}
                      </div>
                    </div>

                    {/* Milestone label */}
                    {SHOW_MILESTONES && !isFinish && (
                      <div
                        className="rm-milestone-label"
                        style={{
                          left: mlLeft,
                          right: mlRight,
                          top: mlTop,
                        }}
                      >
                        {stage.milestone}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Finish marker if all done */}
              {doneCount === total && (
                <div style={{
                  position: "absolute",
                  left: "50%",
                  bottom: "1%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 8,
                  animation: "rm-fade-in .6s ease forwards",
                }}>
                  <Trophy size={32} color="#fffba5" strokeWidth={1.5} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fffba5", letterSpacing: ".05em" }}>
                    Marathon complete!
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stage Details Modal ─────────────────────────────────────────── */}
      {expandedId !== null && (() => {
        const stage = stages.find((s) => s.id === expandedId);
        return stage ? (
          <StageDetailsModal stage={stage} onClose={() => setExpandedId(null)} />
        ) : null;
      })()}

      {/* ── Celebration Overlay ─────────────────────────────────────────── */}
      {celebrateStage && (
        <CelebrationOverlay
          stage={celebrateStage}
          completedCount={doneCount}
          totalCount={total}
          onDismiss={() => setCelebrateStage(null)}
        />
      )}
    </>
  );
}
