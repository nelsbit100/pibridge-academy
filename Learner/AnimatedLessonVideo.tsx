// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Animated Lesson Video Engine
// Plays scripted, animated lessons: 13 scene renderer types with
// narration timed automatically at ~144 wpm (lessonVideos/core).
// ──────────────────────────────────────────────────────────────

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Play, Pause, RotateCcw, SkipBack, SkipForward, Volume2, VolumeX, Captions, CaptionsOff,
} from "lucide-react";
import {
  ACCENTS, scheduleScene, quizRevealAt,
  type LessonVideoScript, type VideoScene, type SceneSchedule, type CompareSceneData,
} from "../lessonVideos/core";

const C = {
  panel: "#141414",
  line: "#262626",
  amber: "#f59e0b",
  cyan: "#22d3ee",
  purple: "#a78bfa",
  green: "#34d399",
  rose: "#fb7185",
  text: "#e5e5e5",
  dim: "#8b8b8b",
};

// small constant for term-card stagger in keyterms scenes
const LEAD_IN_PX = 0.3;

function fmtTime(s: number): string {
  const m = Math.floor(s / 60);
  const r = Math.floor(s % 60);
  return `${m}:${r.toString().padStart(2, "0")}`;
}

function accentHex(name?: string): string {
  return ACCENTS[(name ?? "amber") as keyof typeof ACCENTS] ?? ACCENTS.amber;
}

// ════════════════════════════════════════════════════════════════
// Scene renderers
// ════════════════════════════════════════════════════════════════

function SceneFrame({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-8 md:px-14 overflow-hidden">
      <div
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-[0.07] blur-3xl animate-pulse"
        style={{ background: accent }}
      />
      <div
        className="absolute -bottom-32 -right-16 w-[28rem] h-[28rem] rounded-full opacity-[0.05] blur-3xl animate-pulse"
        style={{ background: C.cyan, animationDelay: "1.5s" }}
      />
      <div className="relative w-full max-w-3xl">{children}</div>
    </div>
  );
}

function SceneHeading({ text, accent, center = true }: { text: string; accent: string; center?: boolean }) {
  return (
    <h3
      className={`text-xl md:text-2xl font-bold text-white mb-6 ${center ? "text-center" : ""}`}
    >
      {text}
      <span className="block mt-1 h-0.5 w-12 mx-auto mt-3 rounded-full" style={{ background: accent }} />
    </h3>
  );
}

function TitleScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "title" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        {scene.eyebrow && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="text-xs font-mono tracking-[0.35em] uppercase mb-6"
            style={{ color: accent }}
          >
            {scene.eyebrow}
          </motion.p>
        )}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">{scene.heading}</h2>
        {scene.subheading && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-base md:text-lg mt-5 max-w-2xl mx-auto"
            style={{ color: C.dim }}
          >
            {scene.subheading}
          </motion.p>
        )}
        {scene.objectives && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
            className="mt-8 text-left inline-block"
          >
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: accent }}>In this lesson</p>
            <ul className="space-y-2">
              {scene.objectives.map((o, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-neutral-300">
                  <span style={{ color: accent }}>✓</span> {o}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </motion.div>
    </SceneFrame>
  );
}

function KeyTermsScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "keyterms" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading ?? "Key Terms"} accent={accent} />
      <div className="grid grid-cols-2 gap-4">
        {scene.terms.map((t, i) => {
          const termAccent = t.color ? accentHex(t.color) : accent;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: LEAD_IN_PX + i * 0.45, duration: 0.5 }}
              className="rounded-xl border p-4"
              style={{ borderColor: `${termAccent}44`, background: C.panel }}
            >
              <p className="text-sm font-bold mb-1" style={{ color: termAccent }}>{t.term}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{t.definition}</p>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}

function BulletsScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "bullets" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading} accent={accent} center={false} />
      <ul className="space-y-4">
        {scene.items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: LEAD_IN_PX + i * 0.45, duration: 0.45 }}
            className="flex items-start gap-4"
          >
            <span
              className="mt-1 w-6 h-6 rounded-md flex items-center justify-center shrink-0 text-xs font-bold"
              style={{ background: `${accent}22`, color: accent }}
            >
              {i + 1}
            </span>
            <span className="text-sm md:text-base text-neutral-200 leading-relaxed">
              <span className="font-semibold text-white">{item.label}</span>
              {item.detail && <span className="text-neutral-400"> — {item.detail}</span>}
            </span>
          </motion.li>
        ))}
      </ul>
    </SceneFrame>
  );
}

function StepsScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "steps" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading} accent={accent} />
      <div className="flex items-start justify-between gap-2">
        {scene.steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: LEAD_IN_PX + i * 0.5, duration: 0.5 }}
            className="flex-1 flex flex-col items-center text-center"
          >
            <div
              className="w-11 h-11 rounded-full flex items-center justify-center text-base font-extrabold mb-3 border-2"
              style={{ borderColor: accent, color: accent, background: `${accent}14` }}
            >
              {i + 1}
            </div>
            <p className="text-sm font-semibold text-white leading-snug">{step.title}</p>
            {step.detail && <p className="text-xs mt-1.5 text-neutral-500 leading-snug">{step.detail}</p>}
          </motion.div>
        ))}
      </div>
    </SceneFrame>
  );
}

function DiagramScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "diagram" }>; accent: string }) {
  const W = 760, H = 380;
  return (
    <SceneFrame accent={accent}>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 text-center">{scene.heading}</h3>
      {scene.subtitle && <p className="text-xs text-neutral-500 mb-4 text-center">{scene.subtitle}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {scene.edges.map((edge, i) => {
          const a = scene.nodes[edge.from], b = scene.nodes[edge.to];
          if (!a || !b) return null;
          return (
            <g key={`e-${i}`}>
              <motion.line
                x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                stroke={edge.animated ? accent : C.line}
                strokeWidth={2}
                strokeDasharray={edge.animated ? "6 6" : undefined}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.5 + i * 0.3, duration: 0.6 }}
              />
              {edge.label && (
                <motion.text
                  x={(a.x + b.x) / 2} y={(a.y + b.y) / 2 - 8}
                  textAnchor="middle" fill={C.dim} fontSize="11"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.3 }}
                >
                  {edge.label}
                </motion.text>
              )}
            </g>
          );
        })}
        {Object.entries(scene.nodes).map(([id, node], i) => (
          <motion.g
            key={id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 + i * 0.22, duration: 0.45 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {node.shape === "circle" ? (
              <circle cx={node.x} cy={node.y} r={30} fill={C.panel} stroke={node.emphasis ? accent : C.line} strokeWidth={node.emphasis ? 2 : 1.5} />
            ) : (
              <rect x={node.x - 46} y={node.y - 25} width={92} height={50} rx={10} fill={C.panel} stroke={node.emphasis ? accent : C.line} strokeWidth={node.emphasis ? 2 : 1.5} />
            )}
            <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.emphasis ? accent : C.text} fontSize="12" fontWeight={600}>
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </SceneFrame>
  );
}

function FlowScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "flow" }>; accent: string }) {
  const W = 760, H = 380;
  return (
    <SceneFrame accent={accent}>
      <h3 className="text-xl md:text-2xl font-bold text-white mb-1 text-center">{scene.heading}</h3>
      {scene.subtitle && <p className="text-xs text-neutral-500 mb-4 text-center">{scene.subtitle}</p>}
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
        {scene.edges.map((edge, i) => {
          const a = scene.nodes[edge.from], b = scene.nodes[edge.to];
          if (!a || !b) return null;
          return (
            <g key={i}>
              <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={C.line} strokeWidth={2} />
              <circle r={5} fill={accent}>
                <animateMotion
                  dur={`${edge.speed ?? 2}s`}
                  repeatCount="indefinite"
                  begin={`${i * 0.4}s`}
                  path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                />
              </circle>
            </g>
          );
        })}
        {Object.entries(scene.nodes).map(([id, node], i) => (
          <motion.g
            key={id}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.08 + i * 0.2 }}
            style={{ transformOrigin: `${node.x}px ${node.y}px` }}
          >
            {node.shape === "circle" ? (
              <circle cx={node.x} cy={node.y} r={32} fill={C.panel} stroke={node.emphasis ? accent : C.line} strokeWidth={node.emphasis ? 2 : 1.5} />
            ) : (
              <rect x={node.x - 52} y={node.y - 26} width={104} height={52} rx={12} fill={C.panel} stroke={node.emphasis ? accent : C.line} strokeWidth={node.emphasis ? 2 : 1.5} />
            )}
            <text x={node.x} y={node.y + 4} textAnchor="middle" fill={C.text} fontSize="12" fontWeight={600}>
              {node.label}
            </text>
          </motion.g>
        ))}
      </svg>
    </SceneFrame>
  );
}

function CodeScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "code" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: C.line, background: "#0d0d0d" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: C.line, background: C.panel }}>
          <span className="w-3 h-3 rounded-full" style={{ background: C.rose }} />
          <span className="w-3 h-3 rounded-full" style={{ background: C.amber }} />
          <span className="w-3 h-3 rounded-full" style={{ background: C.green }} />
          <span className="ml-3 text-xs font-mono" style={{ color: C.dim }}>{scene.file}</span>
        </div>
        <div className="p-5 font-mono text-xs md:text-sm leading-7 min-h-[15rem]">
          {scene.codeLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: LEAD_IN_PX + i * 0.28 }}
              className="whitespace-pre"
            >
              <span style={{ color: line.trimStart().startsWith("//") || line.trimStart().startsWith("#") || line.trimStart().startsWith("--") ? C.dim : accent }}>{line}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}

function TerminalScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "terminal" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <div className="rounded-2xl overflow-hidden border" style={{ borderColor: C.line, background: "#050505" }}>
        <div className="flex items-center gap-2 px-4 py-3 border-b" style={{ borderColor: C.line, background: C.panel }}>
          <span className="w-3 h-3 rounded-full" style={{ background: C.rose }} />
          <span className="w-3 h-3 rounded-full" style={{ background: C.amber }} />
          <span className="w-3 h-3 rounded-full" style={{ background: C.green }} />
          <span className="ml-3 text-xs font-mono" style={{ color: C.dim }}>terminal</span>
        </div>
        <div className="p-5 font-mono text-xs md:text-sm leading-7 min-h-[15rem]">
          {scene.entries.map((entry, i) => (
            <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: LEAD_IN_PX + i * 0.42 }}>
              {entry.type === "command" ? (
                <span>
                  <span style={{ color: accent }}>$ </span>
                  <span className="text-white">{entry.text}</span>
                </span>
              ) : (
                <span style={{ color: C.dim }}>{entry.text}</span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </SceneFrame>
  );
}

function CompareScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "compare" }>; accent: string }) {
  const cols = [
    { side: scene.left, x: -40 },
    ...(scene.middle ? [{ side: scene.middle, x: 0 }] : []),
    { side: scene.right, x: 40 },
  ] as { side: CompareSceneData["left"]; x: number }[];
  const grid = cols.length === 3 ? "grid-cols-3" : "grid-cols-2";
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading} accent={accent} />
      <div className={`grid ${grid} gap-4`}>
        {cols.map(({ side, x }, s) => {
          const color = side.accent ? accentHex(side.accent) : (s === cols.length - 1 ? C.green : C.rose);
          return (
            <motion.div
              key={s}
              initial={{ opacity: 0, x }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: LEAD_IN_PX + s * 0.35, duration: 0.55 }}
              className="rounded-2xl border p-4"
              style={{ borderColor: `${color}55`, background: C.panel }}
            >
              <p className="text-xs font-mono tracking-widest uppercase mb-3" style={{ color }}>{side.title}</p>
              <ul className="space-y-2">
                {side.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: LEAD_IN_PX + 0.4 + s * 0.3 + i * 0.25 }}
                    className="text-xs md:text-sm text-neutral-300 leading-relaxed flex gap-2"
                  >
                    <span style={{ color }}>▪</span>
                    {pt}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}

function ScenarioScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "scenario" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs font-mono tracking-[0.3em] uppercase mb-5" style={{ color: accent }}>
          {scene.label ?? "Case Study"}
        </p>
        <div className="rounded-2xl border p-6 space-y-5" style={{ borderColor: C.line, background: C.panel }}>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">Context</p>
            <p className="text-sm text-neutral-300 leading-relaxed">{scene.context}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}>
            <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">What happened</p>
            <p className="text-sm text-white leading-relaxed font-medium">{scene.event}</p>
          </motion.div>
          {scene.question && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
              <p className="text-[10px] font-mono uppercase tracking-widest mb-1.5" style={{ color: accent }}>Think</p>
              <p className="text-sm italic text-neutral-300">{scene.question}</p>
            </motion.div>
          )}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}>
            <div className="pt-4 border-t" style={{ borderColor: C.line }}>
              <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 mb-1.5">Resolution</p>
              <p className="text-sm leading-relaxed" style={{ color: accent }}>{scene.resolution}</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </SceneFrame>
  );
}

function QuizScene({ scene, accent, elapsed }: { scene: Extract<VideoScene, { kind: "quiz" }>; accent: string; elapsed: number }) {
  const revealed = elapsed >= quizRevealAt(scene);
  return (
    <SceneFrame accent={accent}>
      <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <p className="text-xs font-mono tracking-[0.3em] uppercase mb-4" style={{ color: accent }}>Knowledge check</p>
        <p className="text-lg md:text-xl font-bold text-white leading-snug mb-6">{scene.question}</p>
        <div className="grid grid-cols-2 gap-3">
          {scene.options.map((opt, i) => {
            const isAnswer = i === scene.answerIndex;
            const highlight = revealed && isAnswer;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.3 }}
                className="rounded-xl border px-4 py-3 text-sm transition-colors"
                style={{
                  borderColor: highlight ? accent : C.line,
                  background: highlight ? `${accent}1a` : C.panel,
                  color: highlight ? accent : C.text,
                  fontWeight: highlight ? 700 : 500,
                }}
              >
                <span className="mr-2 font-mono text-xs opacity-70">{String.fromCharCode(65 + i)}</span>
                {opt}
                {highlight && <span className="ml-2">✓</span>}
              </motion.div>
            );
          })}
        </div>
        <AnimatePresence>
          {revealed && (
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-sm text-neutral-300 leading-relaxed"
            >
              <span className="font-semibold" style={{ color: accent }}>Why: </span>
              {scene.explanation}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </SceneFrame>
  );
}

function StatScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "stat" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-6xl md:text-7xl font-extrabold"
          style={{ color: accent }}
        >
          {scene.value}
        </motion.p>
        <p className="text-lg md:text-xl text-white font-semibold mt-5">{scene.label}</p>
        {scene.detail && <p className="text-sm text-neutral-500 mt-3 max-w-xl mx-auto leading-relaxed">{scene.detail}</p>}
      </motion.div>
    </SceneFrame>
  );
}

function RecapScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "recap" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading ?? "Recap — what you now know"} accent={accent} />
      <ul className="space-y-3">
        {scene.points.map((pt, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: LEAD_IN_PX + i * 0.4, duration: 0.45 }}
            className="flex items-start gap-3 rounded-xl border px-4 py-3"
            style={{ borderColor: C.line, background: C.panel }}
          >
            <span className="mt-0.5 text-sm font-bold" style={{ color: accent }}>✓</span>
            <span className="text-sm text-neutral-200 leading-relaxed">{pt}</span>
          </motion.li>
        ))}
      </ul>
    </SceneFrame>
  );
}

function RowsScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "rows" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading} accent={accent} />
      {scene.subtitle && <p className="text-xs text-neutral-500 mb-5 text-center">{scene.subtitle}</p>}
      <div className="space-y-3">
        {scene.rows.map((row, i) => {
          const rowAccent = accentHex(row.color);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: LEAD_IN_PX + i * 0.45, duration: 0.5 }}
              className="flex items-stretch gap-4 rounded-xl border"
              style={{ borderColor: C.line, background: C.panel }}
            >
              <div className="w-1.5 rounded-l-xl shrink-0" style={{ background: rowAccent }} />
              <div className="py-3.5 pr-5 min-w-0">
                <p className="text-sm font-bold text-white leading-snug">{row.label}</p>
                {row.detail && <p className="text-xs text-neutral-400 mt-1 leading-relaxed">{row.detail}</p>}
              </div>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}

function StatGridScene({ scene, accent }: { scene: Extract<VideoScene, { kind: "statgrid" }>; accent: string }) {
  return (
    <SceneFrame accent={accent}>
      <SceneHeading text={scene.heading ?? "By the numbers"} accent={accent} />
      {scene.subtitle && <p className="text-xs text-neutral-500 mb-5 text-center">{scene.subtitle}</p>}
      <div className={scene.stats.length >= 4 ? "grid grid-cols-2 gap-5" : "flex items-stretch justify-center gap-6"}>
        {scene.stats.map((s, i) => {
          const statAccent = accentHex(s.color) ?? accent;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 18, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: LEAD_IN_PX + i * 0.35, duration: 0.5 }}
              className="flex-1 rounded-2xl border px-5 py-6 text-center"
              style={{ borderColor: `${statAccent}44`, background: C.panel }}
            >
              <p className="text-4xl md:text-5xl font-extrabold" style={{ color: statAccent }}>{s.value}</p>
              <p className="text-xs md:text-sm text-neutral-300 mt-3 leading-relaxed">{s.label}</p>
            </motion.div>
          );
        })}
      </div>
    </SceneFrame>
  );
}

function QuizCardScene({ scene, accent, elapsed }: { scene: Extract<VideoScene, { kind: "quizcard" }>; accent: string; elapsed: number }) {
  const cardIdx = Math.min(scene.cards.length - 1, Math.max(0, Math.floor((elapsed - 1.2) / 9)));
  const card = scene.cards[cardIdx];
  const revealed = elapsed >= 1.2 + cardIdx * 9 + 5.5;
  return (
    <SceneFrame accent={accent}>
      <p className="text-xs font-mono tracking-[0.3em] uppercase mb-3 text-center" style={{ color: accent }}>
        Knowledge check · {cardIdx + 1}/{scene.cards.length}
      </p>
      <motion.div key={cardIdx} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-center">
        <p className="text-lg md:text-xl font-bold text-white leading-snug mb-6">{card.question}</p>
        <div className="grid grid-cols-2 gap-3 max-w-3xl mx-auto">
          {card.options.map((opt, i) => {
            const isAnswer = i === card.answerIndex;
            const highlight = revealed && isAnswer;
            return (
              <motion.div
                key={`${cardIdx}-${i}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.25 }}
                className="rounded-xl border px-4 py-3 text-sm transition-colors"
                style={{
                  borderColor: highlight ? accent : C.line,
                  background: highlight ? `${accent}1a` : C.panel,
                  color: highlight ? accent : C.text,
                  fontWeight: highlight ? 700 : 500,
                }}
              >
                <span className="mr-2 font-mono text-xs opacity-70">{String.fromCharCode(65 + i)}</span>
                {opt}
                {highlight && <span className="ml-2">✓</span>}
              </motion.div>
            );
          })}
        </div>
        {revealed && card.explanation && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-sm text-neutral-300 leading-relaxed max-w-2xl mx-auto"
          >
            <span className="font-semibold" style={{ color: accent }}>Why: </span>
            {card.explanation}
          </motion.p>
        )}
      </motion.div>
    </SceneFrame>
  );
}

function SceneRenderer({ scene, schedule, elapsed }: { scene: VideoScene; schedule: SceneSchedule; elapsed: number }) {
  const accent = accentHex(scene.accent);
  switch (scene.kind) {
    case "title": return <TitleScene scene={scene} accent={accent} />;
    case "keyterms": return <KeyTermsScene scene={scene} accent={accent} />;
    case "bullets": return <BulletsScene scene={scene} accent={accent} />;
    case "steps": return <StepsScene scene={scene} accent={accent} />;
    case "diagram": return <DiagramScene scene={scene} accent={accent} />;
    case "rows": return <RowsScene scene={scene} accent={accent} />;
    case "flow": return <FlowScene scene={scene} accent={accent} />;
    case "code": return <CodeScene scene={scene} accent={accent} />;
    case "terminal": return <TerminalScene scene={scene} accent={accent} />;
    case "compare": return <CompareScene scene={scene} accent={accent} />;
    case "scenario": return <ScenarioScene scene={scene} accent={accent} />;
    case "quiz": return <QuizScene scene={scene} accent={accent} elapsed={elapsed} />;
    case "quizcard": return <QuizCardScene scene={scene} accent={accent} elapsed={elapsed} />;
    case "stat": return <StatScene scene={scene} accent={accent} />;
    case "statgrid": return <StatGridScene scene={scene} accent={accent} />;
    case "recap": return <RecapScene scene={scene} accent={accent} />;
  }
}

// ════════════════════════════════════════════════════════════════
// Main player — one absolute clock drives scenes, captions, voice
// ════════════════════════════════════════════════════════════════

interface AnimatedLessonVideoProps {
  script: LessonVideoScript | undefined;
  /** Resume playback from this position (seconds) on first play. */
  resumeAt?: number;
  onEnded?: () => void;
  /** Throttled position reports (~every 4s) for save/resume. */
  onProgress?: (seconds: number) => void;
}

const TICK_MS = 200;

interface CompiledScene {
  scene: VideoScene;
  start: number; // absolute
  schedule: SceneSchedule;
}

function compile(script: LessonVideoScript): { scenes: CompiledScene[]; total: number } {
  const scenes: CompiledScene[] = [];
  let t = 0;
  for (const scene of script.scenes) {
    const schedule = scheduleScene(scene);
    scenes.push({ scene, start: t, schedule });
    t += schedule.duration;
  }
  return { scenes, total: t };
}

export function AnimatedLessonVideo({ script, resumeAt = 0, onEnded, onProgress }: AnimatedLessonVideoProps) {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [captionsOn, setCaptionsOn] = useState(true);

  const compiled = useMemo(() => (script ? compile(script) : null), [script]);
  const totalDuration = compiled?.total ?? 0;

  const onEndedRef = useRef(onEnded);
  onEndedRef.current = onEnded;
  const onProgressRef = useRef(onProgress);
  onProgressRef.current = onProgress;
  const lastProgressRef = useRef(0);

  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);
  const spokenKeyRef = useRef<string>("");

  // Locate the active scene from the absolute clock
  const active = useMemo(() => {
    if (!compiled) return null;
    for (const c of compiled.scenes) {
      if (time < c.start + c.schedule.duration) return c;
    }
    return compiled.scenes[compiled.scenes.length - 1] ?? null;
  }, [compiled, time]);

  const sceneIdx = active ? compiled!.scenes.indexOf(active) : 0;
  const elapsed = active ? Math.max(0, Math.min(time - active.start, active.schedule.duration)) : 0;
  const scene = active?.scene;

  // Voices (Chrome loads them asynchronously)
  useEffect(() => {
    if (!("speechSynthesis" in window)) return;
    const load = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length === 0) return;
      const english = voices.filter((v) => v.lang?.toLowerCase().startsWith("en"));
      const pool = english.length > 0 ? english : voices;
      voiceRef.current =
        pool.find((v) => /google uk english male/i.test(v.name)) ||
        pool.find((v) => /google us english/i.test(v.name)) ||
        pool.find((v) => /daniel|arthur|guy|aria|jenny|male/i.test(v.name)) ||
        pool[0];
    };
    load();
    window.speechSynthesis.onvoiceschanged = load;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  const stopSpeech = useCallback(() => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (muted || !("speechSynthesis" in window)) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        if (voiceRef.current) u.voice = voiceRef.current;
        u.rate = 1.02;
        u.pitch = 1;
        window.speechSynthesis.speak(u);
      } catch {
        /* speech unsupported — captions carry the lesson */
      }
    },
    [muted]
  );

  // Reset on script change — resuming from the saved position if provided
  useEffect(() => {
    stopSpeech();
    spokenKeyRef.current = "";
    setPlaying(false);
    setStarted(false);
    const resume = Math.max(0, Math.min(resumeAt, totalDuration - 0.5));
    setTime(resume);
    lastProgressRef.current = resume;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [script]);

  useEffect(() => stopSpeech, [stopSpeech]);

  // Clock
  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setTime((t) => Math.min(t + TICK_MS / 1000, totalDuration));
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [playing, totalDuration]);

  // End of video
  useEffect(() => {
    if (started && totalDuration > 0 && time >= totalDuration) {
      setPlaying(false);
      stopSpeech();
      onProgressRef.current?.(totalDuration);
      onEndedRef.current?.();
    }
  }, [time, totalDuration, started, stopSpeech]);

  // Throttled position saving (~every 4s of playback)
  useEffect(() => {
    if (!started) return;
    if (time - lastProgressRef.current >= 4) {
      lastProgressRef.current = time;
      onProgressRef.current?.(time);
    }
  }, [time, started]);

  // Captions + speech — one utterance per scheduled line
  const currentLine = active?.schedule.lines.find((l) => elapsed >= l.start && elapsed < l.end) ?? null;
  useEffect(() => {
    if (!currentLine) return;
    const key = `${script?.lessonId ?? ""}:${sceneIdx}:${currentLine.index}`;
    if (key !== spokenKeyRef.current) {
      spokenKeyRef.current = key;
      speak(currentLine.text);
    }
  }, [currentLine, sceneIdx, script, speak]);

  const togglePlay = () => {
    if (time >= totalDuration) {
      setTime(0);
      spokenKeyRef.current = "";
      stopSpeech();
      setStarted(true);
      setPlaying(true);
      return;
    }
    if (!started) setStarted(true);
    setPlaying((p) => {
      if ("speechSynthesis" in window) {
        if (p) window.speechSynthesis.pause();
        else window.speechSynthesis.resume();
      }
      return !p;
    });
  };

  const seekToScene = (idx: number) => {
    if (!compiled) return;
    const clamped = Math.max(0, Math.min(compiled.scenes.length - 1, idx));
    setTime(compiled.scenes[clamped].start + 0.01);
    spokenKeyRef.current = "";
    stopSpeech();
  };

  const restart = () => {
    setTime(0);
    spokenKeyRef.current = "";
    stopSpeech();
    setStarted(true);
    setPlaying(true);
  };

  if (!script || !compiled || !scene || !active) return null;

  return (
    <div className="relative aspect-video bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden select-none" data-testid="animated-lesson-video">
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneIdx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="absolute inset-0"
        >
          <SceneRenderer scene={scene} schedule={active.schedule} elapsed={elapsed} />
        </motion.div>
      </AnimatePresence>

      {/* Start overlay */}
      {!started && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-neutral-950/80 backdrop-blur-sm group cursor-pointer"
          aria-label={`Play ${script.lessonTitle}`}
        >
          <span className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
            <Play className="w-9 h-9 text-neutral-950 ml-1" />
          </span>
          <span className="text-white font-semibold">{script.lessonTitle}</span>
          <span className="text-xs text-neutral-400 mt-1">
            {resumeAt >= 5 && resumeAt < totalDuration - 5
              ? `Resume at ${fmtTime(resumeAt)} / ${fmtTime(totalDuration)} · narrated`
              : `Animated lesson · ${fmtTime(totalDuration)} · narrated`}
          </span>
        </button>
      )}

      {/* Caption bar */}
      {started && captionsOn && currentLine && (
        <div className="absolute bottom-16 left-0 right-0 z-10 flex justify-center px-6 pointer-events-none">
          <p
            className="max-w-2xl text-center text-sm md:text-base text-white bg-neutral-950/75 backdrop-blur px-4 py-2 rounded-lg leading-relaxed"
            data-testid="video-caption"
          >
            {currentLine.text}
          </p>
        </div>
      )}

      {/* Controls */}
      {started && (
        <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-3 pt-6 bg-gradient-to-t from-neutral-950/90 to-transparent">
          <div className="flex items-center gap-1 mb-2">
            {compiled.scenes.map((c, i) => (
              <button
                key={i}
                onClick={() => seekToScene(i)}
                className="h-1.5 flex-1 rounded-full overflow-hidden group/seg"
                style={{ background: i < sceneIdx ? accentHex(script.scenes[i]?.accent) : C.line }}
                aria-label={`Go to scene ${i + 1}`}
              >
                {i === sceneIdx && (
                  <div
                    className="h-full pointer-events-none"
                    style={{
                      width: `${Math.min(100, (elapsed / c.schedule.duration) * 100)}%`,
                      background: accentHex(script.scenes[i]?.accent),
                    }}
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-neutral-300">
            <button onClick={togglePlay} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors" aria-label={playing ? "Pause" : "Play"}>
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button onClick={restart} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors" aria-label="Restart lesson video">
              <RotateCcw className="w-4 h-4" />
            </button>
            <button onClick={() => seekToScene(sceneIdx - 1)} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors" aria-label="Previous scene">
              <SkipBack className="w-4 h-4" />
            </button>
            <button onClick={() => seekToScene(sceneIdx + 1)} className="p-2 hover:bg-neutral-800 rounded-lg transition-colors" aria-label="Next scene">
              <SkipForward className="w-4 h-4" />
            </button>
            <span className="text-xs font-mono text-neutral-500 ml-1">
              {fmtTime(Math.min(time, totalDuration))} / {fmtTime(totalDuration)}
            </span>
            <span className="flex-1" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-neutral-600 mr-1">
              scene {sceneIdx + 1}/{compiled.scenes.length}
            </span>
            <button
              onClick={() => setCaptionsOn((c) => !c)}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label={captionsOn ? "Hide captions" : "Show captions"}
            >
              {captionsOn ? <Captions className="w-5 h-5" /> : <CaptionsOff className="w-5 h-5 text-neutral-500" />}
            </button>
            <button
              onClick={() => {
                setMuted((m) => {
                  if (!m) stopSpeech(); // muting stops the active utterance immediately
                  return !m;
                });
              }}
              className="p-2 hover:bg-neutral-800 rounded-lg transition-colors"
              aria-label={muted ? "Unmute narration" : "Mute narration"}
            >
              {muted ? <VolumeX className="w-5 h-5 text-neutral-500" /> : <Volume2 className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
