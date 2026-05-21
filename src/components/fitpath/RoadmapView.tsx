"use client";

import { useState, useEffect, useLayoutEffect, useRef, useMemo } from "react";
import Link from "next/link";
import {
  Trophy, Medal, Flame,
  ClipboardList, BookOpen, Play, TrendingUp, Shield, Moon, Calendar, Apple, Waves,
  X, ArrowRight, HeartPulse, CheckCircle2,
} from "lucide-react";
import type { RoadmapStage, RoadmapMeta } from "@/lib/data/path-details";

type Props = {
  pathId: string;
  pathColor: string;
  stages: RoadmapStage[];
  roadmapMeta: RoadmapMeta[];
};

const VB_W = 1100;
const VB_H = 2200;
const ROAD_W = 48;

function buildLayout(amplitude: number) {
  const cx = VB_W / 2;
  const dx = 220 * amplitude;
  const ys = [160, 460, 760, 1060, 1360, 1660, 1980];
  const sides = [-1, 1, -1, 1, -1, 1, 0];
  return ys.map((y, i) => ({ x: cx + sides[i] * dx, y, side: sides[i] }));
}

function buildRoadPath(pts: { x: number; y: number }[]) {
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1], b = pts[i];
    const my = (a.y + b.y) / 2;
    d += ` C ${a.x} ${my}, ${b.x} ${my}, ${b.x} ${b.y}`;
  }
  return d;
}

const LINK_ICONS: Record<string, React.ComponentType<{ size?: number; strokeWidth?: number; color?: string }>> = {
  "clipboard-list": ClipboardList, "book-open": BookOpen, "heart-pulse": HeartPulse,
  "play": Play, "target": Medal, "trending-up": TrendingUp, "shield": Shield,
  "apple": Apple, "waves": Waves, "moon": Moon, "calendar": Calendar, "trophy": Trophy,
};

const CELEBRATE = [
  { head: "You crushed it!", sub: "One stage closer to the finish line." },
  { head: "Look at you go!", sub: "Every mile compounds. Keep stacking." },
  { head: "That's the work.", sub: "Discipline beats motivation every time." },
  { head: "Stage cleared.", sub: "The road keeps opening up for you." },
  { head: "Phenomenal effort!", sub: "Recovery now, hard work next." },
  { head: "Eyes up — keep going.", sub: "Closer than you were yesterday." },
];

function confettiBurst() {
  if (typeof window === "undefined") return;
  const colors = ["#aaa8ff", "#7f9ef8", "#fad0f3", "#fffba5", "#c1cff8", "#fff"];
  const el = document.createElement("div");
  el.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:9999;overflow:hidden;";
  document.body.appendChild(el);
  for (let i = 0; i < 200; i++) {
    const p = document.createElement("div");
    const c = colors[Math.floor(Math.random() * colors.length)];
    const sz = Math.random() * 11 + 5;
    const x = Math.random() * 100;
    const dur = Math.random() * 2 + 2;
    const delay = Math.random() * 0.7;
    const sway = (Math.random() - 0.5) * 280;
    const rot = Math.random() * 900 - 450;
    const shape = Math.random() > 0.45 ? "50%" : Math.random() > 0.5 ? "2px" : "0";
    p.style.cssText = `position:absolute;top:-12px;left:${x}vw;width:${sz}px;height:${sz * (Math.random() < 0.4 ? 0.38 : 1)}px;border-radius:${shape};background:${c};opacity:.95;--dx:${sway}px;--rot:${rot}deg;animation:rm-fall ${dur}s ${delay}s cubic-bezier(.25,.6,.3,1) forwards;`;
    el.appendChild(p);
  }
  setTimeout(() => el.remove(), 4500);
}

// ── Proper map-pin SVG (matches prototype exactly) ────────────────────────────
function MapPin({ state, num, color, canAct, onClick }: {
  state: "done" | "current" | "locked";
  num: number;
  color: string;
  canAct: boolean;
  onClick?: () => void;
}) {
  const fill = state === "done" ? "#aaa8ff" : state === "current" ? color : "#1e2235";
  const stroke = state === "done" ? "#c8c6ff" : state === "current" ? "#aac4ff" : "#363b52";
  const id = `pg-${state}-${num}`;
  const inner = (
    <svg width={46} height={58} viewBox="0 0 46 58" fill="none" style={{ display: "block", filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.55))" }}>
      <defs>
        <radialGradient id={id} cx="0.35" cy="0.28" r="0.72">
          <stop offset="0%" stopColor="rgba(255,255,255,0.52)" />
          <stop offset="55%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
      </defs>
      {/* shadow ellipse */}
      <ellipse cx={23} cy={56} rx={9} ry={2} fill="rgba(0,0,0,0.45)" />
      {/* pin body */}
      <path
        d="M23 1.5C12.5 1.5 4 9.7 4 19.8c0 5.7 2.7 10.7 6.8 14.7 4.2 4.1 9.5 9.7 11.4 14.6.4 1 1.6 1 2 0 1.9-4.9 7.2-10.5 11.4-14.6 4.1-4 6.8-9 6.8-14.7C42.4 9.7 33.5 1.5 23 1.5Z"
        fill={fill} stroke={stroke} strokeWidth={1.4}
      />
      {/* gloss overlay */}
      <path
        d="M23 1.5C12.5 1.5 4 9.7 4 19.8c0 5.7 2.7 10.7 6.8 14.7 4.2 4.1 9.5 9.7 11.4 14.6.4 1 1.6 1 2 0 1.9-4.9 7.2-10.5 11.4-14.6 4.1-4 6.8-9 6.8-14.7C42.4 9.7 33.5 1.5 23 1.5Z"
        fill={`url(#${id})`}
      />
      {/* inner circle */}
      <circle cx={23} cy={20} r={9.5} fill="#0c0d14" />
      {state === "done" ? (
        <path d="M17.5 20.2l3.7 3.6 7.4-7.4" stroke="#aaa8ff" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
      ) : state === "locked" ? (
        <>
          <rect x={18.5} y={20} width={9} height={7} rx={1.5} fill="none" stroke="rgba(255,255,255,.3)" strokeWidth={1.5} />
          <path d="M19.8 20v-2.2a3.2 3.2 0 016.4 0V20" fill="none" stroke="rgba(255,255,255,.3)" strokeWidth={1.5} strokeLinecap="round" />
        </>
      ) : (
        <path d="M17.5 20.2l3.7 3.6 7.4-7.4" stroke={color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" opacity={0.75} />
      )}
    </svg>
  );

  if (!canAct && state !== "current") {
    return <div style={{ cursor: "default" }}>{inner}</div>;
  }

  return (
    <button
      onClick={onClick}
      aria-label={`Stage ${num}: ${state}`}
      style={{ background: "none", border: "none", padding: 0, cursor: canAct ? "pointer" : "default", display: "block", transition: "transform .2s cubic-bezier(.2,.7,.2,1)" }}
      className="rm-pin-btn"
    >
      {inner}
    </button>
  );
}

// ── Finish medallion ──────────────────────────────────────────────────────────
function FinishMedal({ done, canAct, onClick }: { done: boolean; canAct: boolean; onClick?: () => void }) {
  const inner = (
    <div style={{
      width: 80, height: 80, borderRadius: "50%",
      background: done ? "linear-gradient(135deg, #fffba5, #fad0f3)" : "#aaa8ff",
      color: "#030203",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexDirection: "column", gap: 2,
      boxShadow: done
        ? "0 0 0 6px rgba(255,251,165,.2), 0 12px 40px rgba(0,0,0,.5)"
        : "0 0 0 6px rgba(170,168,255,.18), 0 12px 40px rgba(170,168,255,.3)",
    }}>
      {done ? (
        <Trophy size={30} color="#030203" strokeWidth={1.8} />
      ) : (
        <>
          <span style={{ fontFamily: "var(--font-instrument-serif, Georgia, serif)", fontStyle: "italic", fontSize: 17, lineHeight: 1, fontWeight: 400 }}>Finish</span>
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 2 }}>26.2 mi</span>
        </>
      )}
    </div>
  );
  return (
    <button onClick={canAct ? onClick : undefined}
      style={{ background: "none", border: "none", padding: 0, cursor: canAct ? "pointer" : "default" }}
      className={done ? "rm-pin-btn" : ""}>
      {inner}
    </button>
  );
}

// ── Stage card ────────────────────────────────────────────────────────────────
function StageCard({ stage, state, canToggle, onDetails, onToggle }: {
  stage: RoadmapStage;
  state: "done" | "current" | "locked";
  canToggle: boolean;
  onDetails: () => void;
  onToggle: () => void;
}) {
  const isDone = state === "done";
  const isCurrent = state === "current";
  const isLocked = state === "locked";

  return (
    <div className={`rm-card rm-card-${state}`}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <span className="rm-card-stage-label">Stage {String(stage.id).padStart(2, "0")}</span>
        <span className="rm-card-duration">{stage.duration}</span>
      </div>

      <h3 className={`rm-card-title${isDone ? " rm-card-title-done" : ""}`}>
        {stage.title}
      </h3>

      {!isLocked && (
        <p className="rm-card-desc">{stage.desc}</p>
      )}

      <div className="rm-card-foot">
        {!isLocked && (
          <button className="rm-card-details-btn" onClick={onDetails}>
            Details
            <svg width={11} height={11} viewBox="0 0 12 12" fill="none">
              <path d="M5 2H2v3M7 10h3V7M2 2l3.5 3.5M10 10L6.5 6.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        {canToggle ? (
          <button className={`rm-card-action${isDone ? " rm-card-action-undo" : " rm-card-action-complete"}`} onClick={onToggle}>
            {isDone ? "Undo" : isCurrent ? "Mark complete" : ""}
            {!isDone && (
              <svg width={12} height={12} viewBox="0 0 14 14" fill="none">
                <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ) : isLocked ? (
          <span className="rm-card-locked-label">Locked</span>
        ) : null}
      </div>
    </div>
  );
}

// ── Details modal ─────────────────────────────────────────────────────────────
function StageDetailsModal({ stage, onClose }: { stage: RoadmapStage; onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [onClose]);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 900,
      background: "rgba(3,2,3,0.72)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#111318", border: "1px solid rgba(255,255,255,.11)",
        borderRadius: 22, padding: "32px 30px 28px", maxWidth: 500, width: "100%",
        maxHeight: "86vh", overflowY: "auto", position: "relative",
        animation: "rm-modal-in .28s cubic-bezier(.34,1.2,.64,1) forwards",
        boxShadow: "0 32px 80px rgba(0,0,0,.6)",
      }}>
        <button onClick={onClose} style={{
          position: "absolute", top: 14, right: 14, width: 32, height: 32,
          background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)",
          borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center",
          cursor: "pointer", color: "rgba(255,255,255,.5)", transition: "background .15s",
        }}>
          <X size={15} />
        </button>

        <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#aaa8ff", background: "rgba(170,168,255,.12)", borderRadius: 6, padding: "4px 10px" }}>
            Stage {stage.id}
          </span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,.4)", background: "rgba(255,255,255,.06)", borderRadius: 6, padding: "4px 10px" }}>
            {stage.duration}
          </span>
        </div>

        <h3 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#fff", marginBottom: 10, fontFamily: "var(--font-instrument-serif, Georgia, serif)", lineHeight: 1.2 }}>
          {stage.title}
        </h3>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, marginBottom: 24 }}>{stage.desc}</p>

        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 12 }}>What you&apos;ll do</p>
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", display: "flex", flexDirection: "column", gap: 8 }}>
          {stage.details.map((d, i) => (
            <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ flexShrink: 0, marginTop: 2, width: 18, height: 18, borderRadius: "50%", background: "rgba(170,168,255,.14)", border: "1px solid rgba(170,168,255,.28)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <CheckCircle2 size={10} color="#aaa8ff" strokeWidth={2.5} />
              </span>
              <span style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.6 }}>{d}</span>
            </li>
          ))}
        </ul>

        {stage.links.length > 0 && (
          <>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)", marginBottom: 12 }}>More on this stage</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {stage.links.map((lk, i) => {
                const Icon = LINK_ICONS[lk.icon] || BookOpen;
                return (
                  <button key={i} className="rm-link-row" style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, cursor: "pointer", textAlign: "left", width: "100%", transition: "background .15s, border-color .15s" }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, background: "rgba(170,168,255,.1)", border: "1px solid rgba(170,168,255,.18)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Icon size={14} color="#aaa8ff" strokeWidth={1.8} />
                    </span>
                    <span style={{ fontSize: 13, color: "rgba(255,255,255,.75)", fontWeight: 500 }}>{lk.label}</span>
                    <ArrowRight size={13} color="rgba(255,255,255,.25)" strokeWidth={2} style={{ marginLeft: "auto" }} />
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

// ── Celebration overlay ───────────────────────────────────────────────────────
function CelebrationOverlay({ stage, doneCount, total, onDismiss }: {
  stage: RoadmapStage; doneCount: number; total: number; onDismiss: () => void;
}) {
  const [pct, setPct] = useState(100);
  const DURATION = 10000;
  const variant = useMemo(() => CELEBRATE[(doneCount - 1) % CELEBRATE.length], [doneCount]);
  const isFinal = doneCount === total;

  useEffect(() => {
    const start = Date.now();
    let raf: number;
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.max(0, 100 - (elapsed / DURATION) * 100);
      setPct(p);
      if (elapsed < DURATION) raf = requestAnimationFrame(tick);
      else onDismiss();
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDismiss]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onDismiss(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onDismiss]);

  const words = (isFinal ? "Marathon complete!" : variant.head).split(" ");
  const last = words.pop()!;

  return (
    <div onClick={onDismiss} style={{
      position: "fixed", inset: 0, zIndex: 1000,
      background: "radial-gradient(circle at 50% 40%, rgba(170,168,255,.14), rgba(3,2,3,.82) 70%)",
      backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "linear-gradient(160deg, #1a1c2c 0%, #111318 100%)",
        border: "1px solid rgba(170,168,255,.26)",
        borderRadius: 24, padding: "44px 40px 32px", maxWidth: 460, width: "100%",
        position: "relative", textAlign: "center", overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,.7), 0 0 0 1px rgba(170,168,255,.08)",
        animation: "rm-celebrate-pop .5s cubic-bezier(.34,1.4,.64,1) forwards",
      }}>
        <button onClick={onDismiss} style={{ position: "absolute", top: 14, right: 14, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.45)", transition: "background .15s, color .15s" }}
          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.12)"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.06)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.45)"; }}>
          <X size={14} />
        </button>

        {/* Badge */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 22 }}>
          <div style={{
            width: 76, height: 76, borderRadius: "50%",
            background: isFinal ? "linear-gradient(135deg,#fffba5,#fad0f3)" : "linear-gradient(135deg,#aaa8ff,#7f9ef8)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: isFinal
              ? "0 0 0 8px rgba(255,251,165,.15), 0 16px 48px rgba(0,0,0,.5)"
              : "0 0 0 8px rgba(170,168,255,.18), 0 16px 48px rgba(170,168,255,.3)",
            animation: "rm-badge-pop .65s cubic-bezier(.34,1.5,.64,1) .12s backwards",
          }}>
            {isFinal ? <Trophy size={34} color="#030203" strokeWidth={1.8} /> : <Medal size={34} color="#030203" strokeWidth={1.8} />}
          </div>
        </div>

        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".2em", textTransform: "uppercase", color: "#aaa8ff", marginBottom: 12 }}>
          Stage {stage.id} complete
        </p>

        <h2 style={{ fontSize: "clamp(1.5rem,3.5vw,2.1rem)", fontWeight: 700, color: "#fff", lineHeight: 1.15, marginBottom: 10, fontFamily: "var(--font-instrument-serif,Georgia,serif)" }}>
          {words.join(" ")}{words.length ? " " : ""}<em style={{ fontStyle: "italic" }}>{last}</em>
        </h2>

        <p style={{ fontSize: 13, color: "rgba(255,255,255,.45)", marginBottom: 8 }}>
          <strong style={{ color: "rgba(255,255,255,.75)", fontWeight: 600 }}>{stage.title}</strong> · {stage.duration}
        </p>
        <p style={{ fontSize: 14, color: "rgba(255,255,255,.55)", lineHeight: 1.6, marginBottom: 28, padding: "0 8px" }}>
          {isFinal ? "You've completed the full marathon journey. Incredible commitment." : variant.sub}
        </p>

        <div style={{ padding: "16px 0", borderTop: "1px solid rgba(255,255,255,.07)", display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.3)" }}>Progress</span>
          <span style={{ fontFamily: "var(--font-instrument-serif,Georgia,serif)", fontStyle: "italic", fontSize: 22, color: "#fff" }}>
            {doneCount}<span style={{ color: "rgba(255,255,255,.3)", fontSize: 16 }}> / {total}</span>
          </span>
        </div>

        {/* Timer drain bar */}
        <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 2, background: "linear-gradient(90deg,#aaa8ff,#7f9ef8)", width: `${pct}%`, transition: "width .1s linear" }} />
        </div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function RoadmapView({ pathId, pathColor, stages, roadmapMeta }: Props) {
  const AMPLITUDE = 0.95;
  const [completed, setCompleted] = useState<number[]>([]);
  const [started, setStarted] = useState(false);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [celebrateStage, setCelebrateStage] = useState<RoadmapStage | null>(null);
  const [pathLen, setPathLen] = useState(0);
  const [shineKey, setShineKey] = useState(0);
  const [shineOffsets, setShineOffsets] = useState<{ from: number; to: number } | null>(null);
  const measureRef = useRef<SVGPathElement>(null);
  const prevCountRef = useRef(0);

  // Persist
  useEffect(() => {
    const s = localStorage.getItem(`fitpath_progress_${pathId}`);
    if (s) { try { const p = JSON.parse(s); setCompleted(p); if (p.length > 0) setStarted(true); } catch {} }
    if (localStorage.getItem(`fitpath_started_${pathId}`) === "1") setStarted(true);
  }, [pathId]);
  useEffect(() => { localStorage.setItem(`fitpath_progress_${pathId}`, JSON.stringify(completed)); }, [completed, pathId]);
  useEffect(() => { localStorage.setItem(`fitpath_started_${pathId}`, started ? "1" : "0"); }, [started, pathId]);

  const layout = useMemo(() => buildLayout(AMPLITUDE), []);
  const roadPath = useMemo(() => buildRoadPath(layout), [layout]);

  useLayoutEffect(() => {
    if (measureRef.current) setPathLen(measureRef.current.getTotalLength());
  }, [roadPath]);

  // Shine on new completion
  useEffect(() => {
    const prev = prevCountRef.current;
    if (completed.length > prev && pathLen > 0) {
      const from = pathLen - (prev / stages.length) * pathLen;
      const to = pathLen - (completed.length / stages.length) * pathLen;
      setShineOffsets({ from, to });
      setShineKey(k => k + 1);
      setTimeout(() => setShineOffsets(null), 1400);
    }
    prevCountRef.current = completed.length;
  }, [completed.length, pathLen, stages.length]);

  const total = stages.length;
  const doneCount = completed.length;
  const pct = total > 0 ? Math.round((doneCount / total) * 100) : 0;
  const filledLen = pathLen > 0 ? (doneCount / total) * pathLen : 0;

  const firstUnfinishedIdx = stages.findIndex(s => !completed.includes(s.id));
  const lastDoneId = doneCount > 0 ? completed[doneCount - 1] : null;

  function stageState(s: RoadmapStage): "done" | "current" | "locked" {
    if (completed.includes(s.id)) return "done";
    const idx = stages.findIndex(x => x.id === s.id);
    return idx === firstUnfinishedIdx ? "current" : "locked";
  }

  function canToggle(s: RoadmapStage): boolean {
    const st = stageState(s);
    if (st === "current") return s.id === stages[0].id ? started : true;
    if (st === "done") return s.id === lastDoneId;
    return false;
  }

  function handleToggle(s: RoadmapStage) {
    const isDone = completed.includes(s.id);
    if (isDone) {
      setCompleted(p => p.filter(id => id !== s.id));
    } else {
      setCompleted(p => [...p, s.id]);
      confettiBurst();
      setCelebrateStage(s);
    }
  }

  // head glow position — last completed pin
  const headPt = doneCount > 0 ? layout[Math.min(doneCount, total) - 1] : null;

  return (
    <>
      <style>{`
        @keyframes rm-fall {
          0%   { transform: translateY(0) translateX(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) translateX(var(--dx,0)) rotate(var(--rot,720deg)); opacity: 0; }
        }
        @keyframes rm-celebrate-pop {
          0%   { transform: translateY(22px) scale(.93); }
          60%  { transform: translateY(-5px) scale(1.025); }
          100% { transform: none; }
        }
        @keyframes rm-badge-pop {
          0%   { transform: scale(.4) rotate(-30deg); }
          100% { transform: none; }
        }
        @keyframes rm-modal-in {
          0%   { transform: translateY(18px) scale(.96); opacity: 0; }
          100% { transform: none; opacity: 1; }
        }
        @keyframes rm-pulse {
          0%,100% { box-shadow: 0 0 0 4px ${pathColor}44, 0 8px 24px rgba(0,0,0,.5); }
          50%      { box-shadow: 0 0 0 10px ${pathColor}18, 0 8px 24px rgba(0,0,0,.5); }
        }
        @keyframes rm-road-shine {
          0%   { stroke-dashoffset: var(--shine-from); opacity: .75; }
          100% { stroke-dashoffset: var(--shine-to); opacity: 0; }
        }
        @keyframes rm-letsgo-ring {
          0%   { box-shadow: 0 0 0 0 rgba(170,168,255,.7); }
          70%  { box-shadow: 0 0 0 22px rgba(170,168,255,0); }
          100% { box-shadow: 0 0 0 0 rgba(170,168,255,0); }
        }
        @keyframes rm-head-glow {
          0%,100% { opacity: .7; }
          50%      { opacity: .95; }
        }
        @keyframes rm-fadein { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
        .rm-road-progress { transition: stroke-dashoffset 1s cubic-bezier(.22,.8,.24,1); }
        .rm-road-shine-anim { animation: rm-road-shine 1.2s cubic-bezier(.3,.7,.3,1) forwards; }
        .rm-pin-btn:hover { transform: translateY(-3px) scale(1.06); }
        .rm-pin-btn:active { transform: translateY(0) scale(.97); }
        .rm-card {
          width: 100%;
          background: rgba(14,16,22,.94);
          border: 1px solid rgba(255,255,255,.09);
          border-radius: 16px; padding: 16px 18px;
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          transition: transform .22s cubic-bezier(.2,.7,.2,1), border-color .2s, box-shadow .22s;
        }
        .rm-card:hover { transform: translateY(-3px); border-color: rgba(255,255,255,.18); box-shadow: 0 16px 48px rgba(0,0,0,.45); }
        .rm-card-current {
          border-color: rgba(170,168,255,.45) !important;
          box-shadow: 0 0 0 1px rgba(170,168,255,.18), 0 12px 40px rgba(170,168,255,.1);
        }
        .rm-card-current:hover { border-color: rgba(170,168,255,.65) !important; }
        .rm-card-done { background: rgba(170,168,255,.05); border-color: rgba(170,168,255,.18) !important; }
        .rm-card-locked { opacity: .5; pointer-events: none; }
        .rm-card-stage-label { font-size: 10px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; color: rgba(255,255,255,.28); }
        .rm-card-current .rm-card-stage-label { color: #aaa8ff; }
        .rm-card-done .rm-card-stage-label { color: rgba(127,158,248,.7); }
        .rm-card-duration { font-size: 10px; color: rgba(255,255,255,.3); font-weight: 500; }
        .rm-card-title { font-size: 13px; font-weight: 600; color: #fff; line-height: 1.35; margin: 0 0 6px; }
        .rm-card-title-done { text-decoration: line-through; color: rgba(255,255,255,.4); }
        .rm-card-desc { font-size: 11.5px; color: rgba(255,255,255,.42); line-height: 1.55; margin: 0 0 10px;
          display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .rm-card-foot { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
        .rm-card-details-btn { font-size: 10px; font-weight: 600; color: rgba(255,255,255,.45); background: rgba(255,255,255,.06); border: none; border-radius: 6px; padding: 4px 9px; cursor: pointer; display: inline-flex; align-items: center; gap: 4px; transition: color .15s, background .15s; }
        .rm-card-details-btn:hover { color: rgba(255,255,255,.85); background: rgba(255,255,255,.1); }
        .rm-card-action { font-size: 10px; font-weight: 700; border: none; border-radius: 6px; padding: 5px 10px; cursor: pointer; display: inline-flex; align-items: center; gap: 5px; transition: opacity .15s, transform .15s; margin-left: auto; }
        .rm-card-action:hover { opacity: .88; transform: translateX(1px); }
        .rm-card-action-complete { background: linear-gradient(135deg, ${pathColor}, #aaa8ff); color: #030203; }
        .rm-card-action-undo { background: rgba(255,255,255,.07); color: rgba(255,255,255,.5); }
        .rm-card-locked-label { font-size: 10px; color: rgba(255,255,255,.2); margin-left: auto; }
        .rm-leader { position: absolute; height: 1px; background: rgba(255,255,255,.12); top: 0; }
        .rm-milestone { position: absolute; font-size: 10.5px; font-weight: 700; text-transform: uppercase; letter-spacing: .12em; color: rgba(255,255,255,.25); line-height: 1.35; max-width: 160px; }
        .rm-milestone-done { color: rgba(170,168,255,.65); }
        .rm-milestone-current { color: ${pathColor}; }
        .rm-letsgo-gate { position: absolute; left: 50%; transform: translate(-50%, -100%); display: flex; flex-direction: column; align-items: center; gap: 12px; padding-bottom: 24px; z-index: 8; }
        .rm-letsgo-btn { display: inline-flex; align-items: center; gap: 10px; background: #aaa8ff; color: #030203; border: none; padding: 14px 30px; border-radius: 14px; font-size: 16px; font-weight: 700; letter-spacing: .01em; cursor: pointer; animation: rm-letsgo-ring 2s ease-out infinite; transition: transform .15s, box-shadow .2s; box-shadow: 0 12px 36px rgba(170,168,255,.35); }
        .rm-letsgo-btn:hover { transform: translateY(-2px); box-shadow: 0 18px 48px rgba(170,168,255,.5); }
        .rm-letsgo-btn:active { transform: translateY(0) scale(.97); }
        .rm-letsgo-arrow { width: 2px; height: 28px; background: linear-gradient(180deg, rgba(170,168,255,.6) 0%, rgba(170,168,255,0) 100%); border-radius: 1px; }
        .rm-link-row:hover { background: rgba(255,255,255,.08) !important; border-color: rgba(255,255,255,.14) !important; }
      `}</style>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section style={{ paddingTop: 88, paddingBottom: 48, borderBottom: "1px solid var(--fp-border)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: -80, right: -80, width: 380, height: 380, borderRadius: "50%", background: `radial-gradient(circle, ${pathColor}1a 0%, transparent 68%)`, pointerEvents: "none" }} />
        <div className="fp-container" style={{ position: "relative", zIndex: 1 }}>
          <Link href="/paths" style={{ display: "inline-flex", alignItems: "center", gap: 7, fontSize: 13, color: "var(--fp-text-muted)", marginBottom: 28, textDecoration: "none", transition: "color .15s" }}>
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none"><path d="M8 3L4 7l4 4" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" /></svg>
            All paths
          </Link>
          <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 36 }}>
            <div style={{ width: 68, height: 68, borderRadius: 17, background: `${pathColor}18`, border: `1px solid ${pathColor}30`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: pathColor }}>
              <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "var(--fp-text-muted)", marginBottom: 10 }}>Training path · By sport</p>
              <h1 style={{ fontFamily: "var(--font-dm-sans,DM Sans,sans-serif)", fontSize: "clamp(1.85rem,4vw,2.85rem)", fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.1, letterSpacing: "-.01em" }}>
                Running <em style={{ fontFamily: "var(--font-instrument-serif,Georgia,serif)", fontStyle: "italic", fontWeight: 400 }}>roadmap.</em>
              </h1>
              <p style={{ fontSize: 15, color: "var(--fp-text-muted)", maxWidth: 500, lineHeight: 1.6 }}>Seven progressive stages drawn out like a road — pick up exactly where you left off.</p>
            </div>
          </div>

          <div style={{ display: "flex", gap: 36, flexWrap: "wrap", paddingTop: 20, borderTop: "1px solid var(--fp-border)", marginBottom: 28 }}>
            {roadmapMeta.map(m => (
              <div key={m.label}>
                <div style={{ fontSize: 19, fontWeight: 700, color: "#fff", marginBottom: 2, fontVariantNumeric: "tabular-nums" }}>{m.value}</div>
                <div style={{ fontSize: 11, color: "var(--fp-text-muted)", letterSpacing: ".02em" }}>{m.label}</div>
              </div>
            ))}
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: 12.5, color: "var(--fp-text-muted)", fontWeight: 500 }}>Your progress</span>
              <span style={{ fontSize: 13, color: "#aaa8ff", fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{doneCount} / {total} ({pct}%)</span>
            </div>
            <div style={{ height: 7, borderRadius: 999, background: "rgba(255,255,255,.07)", overflow: "hidden" }}>
              <div style={{ height: "100%", borderRadius: 999, background: "linear-gradient(90deg, #aaa8ff 0%, #7f9ef8 100%)", width: `${pct}%`, transition: "width 1s cubic-bezier(.22,.8,.24,1)" }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── Section header ───────────────────────────────────────────────── */}
      <section style={{ padding: "36px 0 8px" }}>
        <div className="fp-container" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: 16, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-dm-sans,DM Sans,sans-serif)", fontSize: 26, fontWeight: 600, color: "#fff", margin: 0, letterSpacing: "-.01em" }}>
              Your <em style={{ fontFamily: "var(--font-instrument-serif,Georgia,serif)", fontStyle: "italic", fontWeight: 400, color: "#aaa8ff" }}>road</em> to 26.2.
            </h2>
            <p style={{ fontSize: 13, color: "var(--fp-text-muted)", margin: "6px 0 0" }}>Tap any pin to log a stage. Your progress lights up the road.</p>
          </div>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            {[["#aaa8ff", "Done"], [pathColor, "Up next"], ["rgba(255,255,255,.15)", "Future"]].map(([c, l]) => (
              <span key={l} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: "rgba(255,255,255,.4)" }}>
                <span style={{ width: 9, height: 9, borderRadius: "50%", background: c, display: "inline-block" }} />
                {l}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Roadmap canvas ───────────────────────────────────────────────── */}
      <section style={{ padding: "24px 0 96px" }}>
        <div className="fp-container">
          <div style={{ position: "relative", aspectRatio: `${VB_W}/${VB_H}`, maxWidth: 900, margin: "0 auto" }}>

            {/* SVG road */}
            <svg width="100%" height="100%" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid meet"
              style={{ position: "absolute", inset: 0 }}>
              <defs>
                <filter id="rm-road-shadow">
                  <feGaussianBlur in="SourceAlpha" stdDeviation={7} />
                  <feOffset dy={4} />
                  <feComponentTransfer><feFuncA type="linear" slope={0.55} /></feComponentTransfer>
                  <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="rm-head-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(170,168,255,.6)" />
                  <stop offset="55%" stopColor="rgba(170,168,255,.18)" />
                  <stop offset="100%" stopColor="rgba(170,168,255,0)" />
                </radialGradient>
                <radialGradient id="rm-finish-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(170,168,255,.25)" />
                  <stop offset="100%" stopColor="rgba(170,168,255,0)" />
                </radialGradient>
              </defs>

              {/* Hidden measurement path */}
              <path ref={measureRef} d={roadPath} fill="none" stroke="none" style={{ visibility: "hidden" }} />

              {/* Road: outer edge shadow */}
              <path d={roadPath} fill="none" stroke="#1a1f2e" strokeWidth={ROAD_W + 10} strokeLinecap="round" strokeLinejoin="round" filter="url(#rm-road-shadow)" />
              {/* Road: surface */}
              <path d={roadPath} fill="none" stroke="#0e1220" strokeWidth={ROAD_W} strokeLinecap="round" strokeLinejoin="round" />
              {/* Road: inner surface highlight */}
              <path d={roadPath} fill="none" stroke="#141826" strokeWidth={ROAD_W - 10} strokeLinecap="round" strokeLinejoin="round" />

              {/* Progress fill — full road width */}
              {pathLen > 0 && doneCount > 0 && (
                <path
                  d={roadPath} fill="none" stroke="#aaa8ff"
                  strokeWidth={ROAD_W} strokeLinecap="round" strokeLinejoin="round"
                  opacity={0.92}
                  strokeDasharray={pathLen}
                  strokeDashoffset={pathLen - filledLen}
                  className="rm-road-progress"
                />
              )}

              {/* Shine sweep on completion */}
              {shineOffsets && pathLen > 0 && (
                <path
                  key={shineKey}
                  d={roadPath} fill="none"
                  stroke="rgba(255,255,255,.85)" strokeWidth={ROAD_W - 16}
                  strokeLinecap="round" strokeLinejoin="round"
                  strokeDasharray={`${Math.max(50, pathLen * 0.055)} ${pathLen}`}
                  className="rm-road-shine-anim"
                  style={{
                    ["--shine-from" as string]: `${shineOffsets.from}px`,
                    ["--shine-to" as string]: `${shineOffsets.to}px`,
                  }}
                />
              )}

              {/* Centerline dashes */}
              <path d={roadPath} fill="none" stroke="rgba(220,225,240,.22)"
                strokeWidth={2} strokeLinecap="butt" strokeDasharray="13 17" />

              {/* Head glow at leading edge */}
              {headPt && (
                <>
                  <circle cx={headPt.x} cy={headPt.y} r={72} fill="url(#rm-head-grad)"
                    style={{ animation: "rm-head-glow 2.2s ease-in-out infinite" }} />
                  <circle cx={headPt.x} cy={headPt.y} r={22} fill="rgba(170,168,255,.35)" />
                </>
              )}

              {/* Finish area glow */}
              <circle cx={layout[layout.length - 1].x} cy={layout[layout.length - 1].y} r={110} fill="url(#rm-finish-glow)" />
            </svg>

            {/* HTML overlay — pins, cards, labels, gate */}
            <div style={{ position: "absolute", inset: 0 }}>

              {/* Let's go gate above stage 1 */}
              {!started && (
                <div className="rm-letsgo-gate" style={{ top: `${(layout[0].y / VB_H) * 100}%` }}>
                  <button className="rm-letsgo-btn" onClick={() => { setStarted(true); confettiBurst(); }}>
                    <Flame size={18} strokeWidth={2} />
                    Let&apos;s go
                  </button>
                  <div className="rm-letsgo-arrow" />
                </div>
              )}

              {stages.map((stage, i) => {
                const pt = layout[i];
                const pL = (pt.x / VB_W) * 100;   // % left
                const pT = (pt.y / VB_H) * 100;   // % top
                const side = pt.side as -1 | 1 | 0;
                const st = stageState(stage);
                const ct = canToggle(stage);
                const isFinish = stage.id === stages[stages.length - 1].id;
                const roadHalfPct = ((ROAD_W / 2 + 4) / VB_W) * 100;  // ~2.7%
                const gap = 5;  // % gap between road edge and card

                // Card placement — always below the pin
                const pinHPct = (58 / VB_H) * 100;   // pin SVG height as % of canvas
                const cardGapPct = 0.8;
                let cardStyle: React.CSSProperties;
                if (isFinish) {
                  cardStyle = { left: `${pL}%`, top: `${pT + 5}%`, transform: "translateX(-50%)", width: "35%" };
                } else {
                  cardStyle = { left: `${pL}%`, top: `${pT + pinHPct + cardGapPct}%`, transform: "translateX(-50%)", width: "32%" };
                }

                // Milestone label — to the side of the pin (based on which side the pin is on)
                let msStyle: React.CSSProperties | null = null;
                if (!isFinish) {
                  const msOff = roadHalfPct + 1.5;
                  if (side === -1) {
                    msStyle = { right: `${100 - pL + msOff}%`, top: `${pT}%`, transform: "translateY(-50%)", textAlign: "right" };
                  } else {
                    msStyle = { left: `${pL + msOff}%`, top: `${pT}%`, transform: "translateY(-50%)", textAlign: "left" };
                  }
                }

                return (
                  <div key={stage.id}>
                    {/* Pin */}
                    <div style={{ position: "absolute", left: `${pL}%`, top: `${pT}%`, transform: isFinish ? "translate(-50%,-50%)" : "translate(-50%,-100%)", zIndex: 10 }}>
                      {isFinish
                        ? <FinishMedal done={st === "done"} canAct={ct} onClick={() => handleToggle(stage)} />
                        : (
                          <>
                            {st === "current" && (
                              <div style={{ position: "absolute", left: "50%", bottom: 4, transform: "translateX(-50%)", width: 34, height: 34, borderRadius: "50%", background: pathColor, opacity: .45, filter: "blur(4px)", animation: "rm-head-glow 1.8s ease-in-out infinite" }} />
                            )}
                            <MapPin state={st} num={stage.id} color={pathColor} canAct={ct} onClick={() => handleToggle(stage)} />
                          </>
                        )
                      }
                    </div>

                    {/* Card */}
                    <div style={{ position: "absolute", ...cardStyle, pointerEvents: "none" }}>
                      <div style={{ pointerEvents: "auto" }}>
                        <StageCard
                          stage={stage} state={st} canToggle={ct}
                          onDetails={() => setExpandedId(stage.id)}
                          onToggle={() => handleToggle(stage)}
                        />
                      </div>
                    </div>

                    {/* Milestone label */}
                    {msStyle && (
                      <div className={`rm-milestone${st === "done" ? " rm-milestone-done" : st === "current" ? " rm-milestone-current" : ""}`}
                        style={{ ...msStyle, position: "absolute" }}>
                        {stage.milestone}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Marathon complete banner */}
              {doneCount === total && (
                <div style={{ position: "absolute", left: "50%", bottom: "0.5%", transform: "translateX(-50%)", textAlign: "center", animation: "rm-fadein .8s ease forwards" }}>
                  <Trophy size={28} color="#fffba5" strokeWidth={1.5} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#fffba5", letterSpacing: ".06em", marginTop: 4 }}>Marathon complete!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Details modal ────────────────────────────────────────────────── */}
      {expandedId !== null && (() => {
        const s = stages.find(x => x.id === expandedId);
        return s ? <StageDetailsModal stage={s} onClose={() => setExpandedId(null)} /> : null;
      })()}

      {/* ── Celebration overlay ──────────────────────────────────────────── */}
      {celebrateStage && (
        <CelebrationOverlay
          stage={celebrateStage} doneCount={doneCount} total={total}
          onDismiss={() => setCelebrateStage(null)}
        />
      )}
    </>
  );
}
