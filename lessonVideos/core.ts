// ──────────────────────────────────────────────────────────────
// PiBridge Academy — Lesson Video Core
// Scene model + narration-driven auto-pacing.
// Authors write narration lines; durations are computed at ~144
// words per minute so captions, speech and scene length stay in
// sync by construction.
//
// Authoring styles:
//   • Label-first (legacy): title("Heading", "eyebrow", "sub", lines, accent, objectives)
//   • Object-style (preferred): title({ heading, eyebrow, sub, goals, accent })
// Objects may omit narration lines; a short narration is then
// synthesized from the visible content so the video still speaks.
// ──────────────────────────────────────────────────────────────

export type AccentColor =
  | "amber" | "cyan" | "purple" | "green" | "rose"
  | "lime" | "sky" | "violet" | "slate" | "teal";

export const ACCENTS: Record<AccentColor, string> = {
  amber: "#f59e0b",
  cyan: "#22d3ee",
  purple: "#a78bfa",
  green: "#34d399",
  rose: "#fb7185",
  lime: "#a3e635",
  sky: "#38bdf8",
  violet: "#8b5cf6",
  slate: "#94a3b8",
  teal: "#2dd4bf",
};

// ── Pacing constants ──
export const WORDS_PER_SEC = 2.4; // ≈ 144 wpm — recommended e-learning narration rate
const LINE_BASE = 0.9; // breathing room before a line
const LINE_GAP = 0.55; // pause between lines
const LEAD_IN = 1.4; // scene settles before first line
const LEAD_OUT = 2.2; // hold after last line
const MIN_SCENE = 8;

export function lineSeconds(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return LINE_BASE + words / WORDS_PER_SEC;
}

export interface ScheduledLine {
  index: number;
  start: number;
  end: number;
  text: string;
}

export interface SceneSchedule {
  duration: number;
  lines: ScheduledLine[];
}

/** Compute a scene's duration and per-line caption schedule from its narration. */
export function scheduleScene(scene: VideoScene): SceneSchedule {
  let t = LEAD_IN;
  const lines: ScheduledLine[] = [];
  scene.lines.forEach((text, i) => {
    const d = lineSeconds(text);
    lines.push({ index: i, start: t, end: t + d, text });
    t += d + LINE_GAP;
  });
  const duration = Math.max(MIN_SCENE, t - LINE_GAP + LEAD_OUT);
  return { duration, lines };
}

/** Compute the total duration of a script from its scenes. */
export function scriptDuration(scenes: VideoScene[]): number {
  return scenes.reduce((sum, s) => sum + scheduleScene(s).duration, 0);
}

// ── Scene data shapes ──

export interface TitleSceneData {
  kind: "title";
  heading: string;
  eyebrow?: string;
  subheading?: string;
  objectives?: string[];
  accent?: AccentColor;
  lines: string[];
}

export interface KeyTermsSceneData {
  kind: "keyterms";
  heading?: string;
  terms: { term: string; definition: string; color?: AccentColor }[];
  accent?: AccentColor;
  lines: string[];
}

export interface BulletsSceneData {
  kind: "bullets";
  heading: string;
  items: { label: string; detail?: string; kind?: "good" | "bad" | "info" }[];
  accent?: AccentColor;
  lines: string[];
}

export interface StepsSceneData {
  kind: "steps";
  heading: string;
  steps: { title: string; detail?: string }[];
  accent?: AccentColor;
  lines: string[];
}

export interface DiagramNode {
  label: string;
  x: number;
  y: number;
  shape?: "circle" | "square";
  emphasis?: boolean;
}
export interface DiagramSceneData {
  kind: "diagram";
  heading: string;
  subtitle?: string;
  nodes: Record<string, DiagramNode>;
  edges: { from: string; to: string; label?: string; animated?: boolean }[];
  accent?: AccentColor;
  lines: string[];
}

export interface RowsRow {
  label: string;
  detail?: string;
  color?: AccentColor;
}
export interface RowsSceneData {
  kind: "rows";
  heading: string;
  subtitle?: string;
  rows: RowsRow[];
  accent?: AccentColor;
  lines: string[];
}

export interface FlowSceneData {
  kind: "flow";
  heading: string;
  subtitle?: string;
  nodes: Record<string, DiagramNode>;
  edges: { from: string; to: string; speed?: number; animated?: boolean; label?: string }[];
  accent?: AccentColor;
  lines: string[];
}

export interface CodeSceneData {
  kind: "code";
  file: string;
  codeLines: string[];
  accent?: AccentColor;
  lines: string[];
}

export interface TerminalEntry {
  type: "command" | "output";
  text: string;
}
export interface TerminalSceneData {
  kind: "terminal";
  entries: TerminalEntry[];
  accent?: AccentColor;
  lines: string[];
}

export interface CompareSide {
  title: string;
  points: string[];
  accent?: AccentColor;
  verdict?: string;
}
export interface CompareSceneData {
  kind: "compare";
  heading: string;
  left: CompareSide;
  middle?: CompareSide;
  right: CompareSide;
  accent?: AccentColor;
  lines: string[];
}

export interface ScenarioSceneData {
  kind: "scenario";
  label?: string;
  context: string;
  event: string;
  question?: string;
  resolution: string;
  accent?: AccentColor;
  lines: string[];
}

export interface QuizSceneData {
  kind: "quiz";
  heading?: string;
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
  accent?: AccentColor;
  lines: string[];
}

export interface QuizCardSceneData {
  kind: "quizcard";
  heading?: string;
  cards: { question: string; options: string[]; answerIndex: number; explanation: string }[];
  accent?: AccentColor;
  lines: string[];
}

export interface StatSceneData {
  kind: "stat";
  value: string;
  label: string;
  detail?: string;
  accent?: AccentColor;
  lines: string[];
}

export interface StatGridSceneData {
  kind: "statgrid";
  heading?: string;
  subtitle?: string;
  stats: { value: string; label: string; color?: AccentColor }[];
  accent?: AccentColor;
  lines: string[];
}

export interface RecapSceneData {
  kind: "recap";
  heading?: string;
  points: string[];
  accent?: AccentColor;
  lines: string[];
}

export type VideoScene =
  | TitleSceneData
  | KeyTermsSceneData
  | BulletsSceneData
  | StepsSceneData
  | DiagramSceneData
  | RowsSceneData
  | FlowSceneData
  | CodeSceneData
  | TerminalSceneData
  | CompareSceneData
  | ScenarioSceneData
  | QuizSceneData
  | QuizCardSceneData
  | StatSceneData
  | StatGridSceneData
  | RecapSceneData;

export interface LessonVideoScript {
  lessonId: string;
  lessonTitle: string;
  courseId?: string;
  scenes: VideoScene[];
}

// When the quiz renderer should reveal the correct answer:
export function quizRevealAt(scene: QuizSceneData): number {
  return LEAD_IN + lineSeconds(scene.question) + LINE_GAP * 2;
}

/** When a quiz-card's next question should advance (seconds into the scene). */
export function quizCardRevealAt(cardIndex: number): number {
  return LEAD_IN + cardIndex * 9 + 4;
}

// ── Small narration synthesizers (object-style authoring) ──

const syn = (parts: (string | undefined | null)[], fallback = "Let's take a closer look."): string[] => {
  const out = parts.filter((p): p is string => Boolean(p && p.trim()));
  return out.length > 0 ? out : [fallback];
};

function narrateList(heading: string, items: string[]): string[] {
  return syn([heading, ...items], heading);
}

// ── Authoring helpers: dual-mode (label-first OR object-style) ──

type Accent = AccentColor | undefined;
type Lines = string[];

export interface TitleObj {
  heading: string;
  eyebrow?: string;
  sub?: string;
  subheading?: string;
  goals?: string[];
  objectives?: string[];
  accent?: AccentColor;
}

export function title(a: TitleObj): VideoScene;
export function title(heading: string, eyebrow: string, subheading: string, lines: Lines, accent?: AccentColor, objectives?: string[]): VideoScene;
export function title(a: TitleObj | string, eyebrow?: string, subheading?: string, lines?: Lines, accent?: AccentColor, objectives?: string[]): VideoScene {
  if (typeof a === "object") {
    const heading = a.heading ?? "";
    return {
      kind: "title",
      heading,
      eyebrow: a.eyebrow,
      subheading: a.sub ?? a.subheading,
      objectives: a.goals ?? a.objectives,
      accent: a.accent ?? "amber",
      lines: syn([a.eyebrow ? `Welcome to ${a.eyebrow}.` : undefined, heading, a.sub ?? a.subheading, ...(a.goals ?? a.objectives ?? [])]),
    };
  }
  return { kind: "title", heading: a, eyebrow, subheading, objectives, accent: accent ?? "amber", lines: lines ?? [] };
}

export type KeyTerm = { term: string; definition: string; color?: AccentColor };
export function keyterms(terms: KeyTerm[], lines: Lines, accent?: AccentColor): VideoScene;
export function keyterms(terms: KeyTerm[], lead: string, accent?: AccentColor): VideoScene;
export function keyterms(terms: KeyTerm[], linesOrLead: Lines | string, accent?: AccentColor): VideoScene {
  const lines = Array.isArray(linesOrLead) ? linesOrLead : [linesOrLead];
  return { kind: "keyterms", heading: "Key Terms", terms, accent: accent ?? "cyan", lines };
}

export type BulletItem = { label?: string; text?: string; detail?: string; note?: string; kind?: "good" | "bad" | "info" };
export interface BulletsObj {
  heading: string;
  items: BulletItem[];
  accent?: AccentColor;
}
export function bullets(obj: BulletsObj, lead?: string): VideoScene;
export function bullets(heading: string, items: { label: string; detail?: string }[], lines: Lines, accent?: AccentColor): VideoScene;
export function bullets(objOrHeading: BulletsObj | string, itemsOrLead?: { label: string; detail?: string }[] | string, lines?: Lines, accent?: AccentColor): VideoScene {
  if (typeof objOrHeading === "object") {
    const lead = typeof itemsOrLead === "string" ? itemsOrLead : undefined;
    const normalized = objOrHeading.items.map((it) => ({
      label: it.text ?? it.label ?? "",
      detail: it.note ?? it.detail,
      kind: it.kind,
    }));
    return {
      kind: "bullets",
      heading: objOrHeading.heading,
      items: normalized,
      accent: objOrHeading.accent ?? "amber",
      lines: narrateList(objOrHeading.heading, normalized.map((n) => (n.detail ? `${n.label} — ${n.detail}` : n.label))).concat(lead ? [lead] : []).slice(0, 6),
    };
  }
  return { kind: "bullets", heading: objOrHeading, items: itemsOrLead as { label: string; detail?: string }[], accent: accent ?? "amber", lines: lines ?? [] };
}

export type StepItem = { label?: string; title?: string; detail?: string; color?: AccentColor };
export interface StepsObj {
  heading: string;
  sub?: string;
  steps: StepItem[];
  accent?: AccentColor;
}
export function steps(obj: StepsObj, lead?: string): VideoScene;
export function steps(heading: string, s: { title: string; detail?: string }[], lines: Lines, accent?: AccentColor): VideoScene;
export function steps(objOrHeading: StepsObj | string, sOrLead?: { title: string; detail?: string }[] | string, lines?: Lines, accent?: AccentColor): VideoScene {
  if (typeof objOrHeading === "object") {
    const normalized = objOrHeading.steps.map((st) => ({ title: st.title ?? st.label ?? "", detail: st.detail }));
    return {
      kind: "steps",
      heading: objOrHeading.heading,
      steps: normalized,
      accent: objOrHeading.accent ?? "cyan",
      lines: narrateList(objOrHeading.heading, normalized.map((n) => `${normalized.indexOf(n) + 1}. ${n.title}${n.detail ? ` — ${n.detail}` : ""}`)),
    };
  }
  return { kind: "steps", heading: objOrHeading, steps: sOrLead as { title: string; detail?: string }[], accent: accent ?? "cyan", lines: lines ?? [] };
}

export interface DiagramObj {
  heading: string;
  sub?: string;
  rows: RowsRow[];
  accent?: AccentColor;
}
export function diagram(obj: DiagramObj, lead?: string): VideoScene;
export function diagram(heading: string, nodes: Record<string, DiagramNode>, edges: DiagramSceneData["edges"], lines: Lines, subtitle?: string, accent?: AccentColor): VideoScene;
export function diagram(objOrHeading: DiagramObj | string, nodesOrLead?: Record<string, DiagramNode> | string, edges?: DiagramSceneData["edges"], lines?: Lines, subtitle?: string, accent?: AccentColor): VideoScene {
  if (typeof objOrHeading === "object") {
    return {
      kind: "rows",
      heading: objOrHeading.heading,
      subtitle: objOrHeading.sub,
      rows: objOrHeading.rows,
      accent: objOrHeading.accent ?? "cyan",
      lines: narrateList(objOrHeading.heading, objOrHeading.rows.map((r) => r.label)),
    };
  }
  return { kind: "diagram", heading: objOrHeading, subtitle, nodes: nodesOrLead as Record<string, DiagramNode>, edges: edges ?? [], accent: accent ?? "cyan", lines: lines ?? [] };
}

export interface FlowNodeObj {
  id: string;
  label: string;
  shape?: "pill" | "rect" | "diamond" | "cyl";
  color?: AccentColor;
}
export interface FlowObj {
  heading: string;
  sub?: string;
  nodes: FlowNodeObj[];
  edges: { from: string; to: string; animated?: boolean; label?: string }[];
  accent?: AccentColor;
}
export function flow(obj: FlowObj, lead?: string): VideoScene;
export function flow(heading: string, nodes: Record<string, DiagramNode>, edges: FlowSceneData["edges"], lines: Lines, subtitle?: string, accent?: AccentColor): VideoScene;
export function flow(objOrHeading: FlowObj | string, nodesOrLead?: Record<string, DiagramNode> | string, edges?: FlowSceneData["edges"], lines?: Lines, subtitle?: string, accent?: AccentColor): VideoScene {
  if (typeof objOrHeading === "object") {
    // Auto-layout: read order → columns of 4, then wrap; diamonds = decision circles
    const out: Record<string, DiagramNode> = {};
    const W = 150, H = 120, COLS = 4, X0 = 110, Y0 = 110;
    objOrHeading.nodes.forEach((n, i) => {
      const col = i % COLS, row = Math.floor(i / COLS);
      out[n.id] = {
        label: n.label,
        x: X0 + col * W,
        y: Y0 + row * H,
        shape: n.shape === "diamond" || n.shape === "pill" ? "circle" : "square",
        emphasis: n.shape === "pill",
      };
    });
    return {
      kind: "flow",
      heading: objOrHeading.heading,
      subtitle: objOrHeading.sub,
      nodes: out,
      edges: objOrHeading.edges,
      accent: objOrHeading.accent ?? "amber",
      lines: narrateList(objOrHeading.heading, objOrHeading.nodes.map((n) => n.label)),
    };
  }
  return { kind: "flow", heading: objOrHeading, subtitle, nodes: nodesOrLead as Record<string, DiagramNode>, edges: edges ?? [], accent: accent ?? "amber", lines: lines ?? [] };
}

export interface CodeObj {
  heading?: string;
  sub?: string;
  lang: string;
  codeLines: string[];
  captions?: string[];
  accent?: AccentColor;
}
export function code(obj: CodeObj, lead?: string): VideoScene;
export function code(file: string, codeLines: string[], lines: Lines, accent?: AccentColor): VideoScene;
export function code(objOrFile: CodeObj | string, codeLinesOrLead?: string[] | string, lines?: Lines, accent?: AccentColor): VideoScene {
  if (typeof objOrFile === "object") {
    const captions = objOrFile.captions ?? [];
    return {
      kind: "code",
      file: objOrFile.lang,
      codeLines: objOrFile.codeLines,
      accent: objOrFile.accent ?? "green",
      lines: captions.length > 0 ? captions : narrateList(objOrFile.heading ?? "Code", []),
    };
  }
  return { kind: "code", file: objOrFile, codeLines: codeLinesOrLead as string[], accent: accent ?? "green", lines: lines ?? [] };
}

export interface TerminalObj {
  heading?: string;
  sub?: string;
  prompt?: string;
  commandLines: string[];
  captions?: string[];
  accent?: AccentColor;
}
export function terminal(obj: TerminalObj, lead?: string): VideoScene;
export function terminal(entries: TerminalEntry[], lines: Lines, accent?: AccentColor): VideoScene;
export function terminal(objOrEntries: TerminalObj | TerminalEntry[], linesOrLead?: Lines | string, accent?: AccentColor): VideoScene {
  if (!Array.isArray(objOrEntries)) {
    const prompt = objOrEntries.prompt ?? "$";
    const captions = objOrEntries.captions ?? [];
    return {
      kind: "terminal",
      entries: objOrEntries.commandLines.map((text) => ({ type: "command" as const, text })),
      accent: objOrEntries.accent ?? "green",
      lines: captions.length > 0 ? captions : narrateList(objOrEntries.heading ?? "Terminal", []),
    };
  }
  return { kind: "terminal", entries: objOrEntries, accent: accent ?? "green", lines: (Array.isArray(linesOrLead) ? linesOrLead : linesOrLead ? [linesOrLead] : []) };
}

export interface CompareSideObj {
  label?: string;
  title?: string;
  points: string[];
  verdict?: string;
  color?: AccentColor;
  accent?: AccentColor;
}
export interface CompareObj {
  heading: string;
  left: CompareSideObj;
  middle?: CompareSideObj;
  right: CompareSideObj;
  accent?: AccentColor;
}
export function compare(obj: CompareObj, lead?: string): VideoScene;
export function compare(heading: string, left: CompareSide, right: CompareSide, lines: Lines, accent?: AccentColor): VideoScene;
export function compare(objOrHeading: CompareObj | string, leftOrLead?: CompareSide | string, right?: CompareSide, lines?: Lines, accent?: AccentColor): VideoScene {
  if (typeof objOrHeading === "object") {
    const side = (s: CompareSideObj): CompareSide => ({
      title: s.title ?? s.label ?? "",
      points: s.verdict ? [...s.points, s.verdict] : s.points,
      accent: s.accent ?? s.color,
      verdict: s.verdict,
    });
    return {
      kind: "compare",
      heading: objOrHeading.heading,
      left: side(objOrHeading.left),
      middle: objOrHeading.middle ? side(objOrHeading.middle) : undefined,
      right: side(objOrHeading.right),
      accent: objOrHeading.accent ?? "purple",
      lines: narrateList(objOrHeading.heading, [...objOrHeading.left.points.slice(0, 2), ...(objOrHeading.middle?.points.slice(0, 2) ?? []), ...objOrHeading.right.points.slice(0, 2)]),
    };
  }
  return { kind: "compare", heading: objOrHeading, left: leftOrLead as CompareSide, right: right as CompareSide, accent: accent ?? "purple", lines: lines ?? [] };
}

export interface ScenarioObj {
  heading?: string;
  label?: string;
  text?: string;
  context?: string;
  event?: string;
  resolution?: string;
  question?: string;
  accent?: AccentColor;
}
export function scenario(obj: ScenarioObj, lead?: string): VideoScene;
export function scenario(label: string, context: string, event: string, resolution: string, lines?: Lines, accent?: AccentColor, question?: string): VideoScene;
export function scenario(objOrLabel: ScenarioObj | string, contextOrLead?: string, event?: string, resolution?: string, lines?: Lines, accent?: AccentColor, question?: string): VideoScene {
  if (typeof objOrLabel === "object") {
    const text = objOrLabel.text ?? objOrLabel.context ?? "";
    return {
      kind: "scenario",
      label: objOrLabel.label ?? objOrLabel.heading ?? "Case Study",
      context: text,
      event: objOrLabel.event ?? "",
      resolution: objOrLabel.resolution ?? "",
      question: objOrLabel.question,
      accent: objOrLabel.accent ?? "rose",
      lines: syn([objOrLabel.heading ?? "Case study.", text, objOrLabel.resolution]),
    };
  }
  return { kind: "scenario", label: objOrLabel, context: contextOrLead ?? "", event: event ?? "", resolution: resolution ?? "", question, accent: accent ?? "rose", lines: lines ?? [contextOrLead ?? "", event ?? "", resolution ?? ""] };
}

export type QuizCardInput = { question: string; options: string[]; answer: number; explain?: string; explanation?: string };
export function quiz(cards: QuizCardInput[], heading?: string): VideoScene;
export function quiz(question: string, options: string[], answerIndex: number, explanation: string, lines: Lines, accent?: AccentColor): VideoScene;
export function quiz(cardsOrQuestion: QuizCardInput[] | string, optionsOrHeading?: string[] | string, answerIndex?: number, explanation?: string, lines?: Lines, accent?: AccentColor): VideoScene {
  if (Array.isArray(cardsOrQuestion)) {
    return {
      kind: "quizcard",
      heading: typeof optionsOrHeading === "string" ? optionsOrHeading : "Knowledge Check",
      cards: cardsOrQuestion.map((c) => ({ question: c.question, options: c.options, answerIndex: c.answer, explanation: c.explain ?? c.explanation ?? "" })),
      accent: accent ?? "purple",
      lines: narrateList("Let's check what you learned.", cardsOrQuestion.map((c) => c.question)),
    };
  }
  return { kind: "quiz", heading: undefined, question: cardsOrQuestion, options: (optionsOrHeading as string[]) ?? [], answerIndex: answerIndex ?? 0, explanation: explanation ?? "", accent: accent ?? "purple", lines: lines ?? [] };
}

export interface StatObj {
  heading?: string;
  sub?: string;
  stats: { value: string; label: string; color?: AccentColor }[];
  accent?: AccentColor;
}
export function stat(obj: StatObj, lead?: string): VideoScene;
export function stat(value: string, label: string, detail: string, lines: Lines, accent?: AccentColor): VideoScene;
export function stat(objOrValue: StatObj | string, labelOrLead?: string, detail?: string, lines?: Lines, accent?: AccentColor): VideoScene {
  if (typeof objOrValue === "object") {
    return {
      kind: "statgrid",
      heading: objOrValue.heading,
      subtitle: objOrValue.sub,
      stats: objOrValue.stats,
      accent: objOrValue.accent ?? "amber",
      lines: narrateList(objOrValue.heading ?? "By the numbers", objOrValue.stats.map((s) => `${s.value} — ${s.label}`)),
    };
  }
  return { kind: "stat", value: objOrValue, label: labelOrLead ?? "", detail, accent: accent ?? "amber", lines: lines ?? [] };
}

export interface RecapObj {
  points: string[];
  accent?: AccentColor;
}
export function recap(obj: RecapObj): VideoScene;
export function recap(points: string[], lines: Lines, accent?: AccentColor): VideoScene;
export function recap(objOrPoints: RecapObj | string[], lines?: Lines, accent?: AccentColor): VideoScene {
  if (!Array.isArray(objOrPoints)) {
    return {
      kind: "recap",
      heading: "Recap — what you now know",
      points: objOrPoints.points,
      accent: objOrPoints.accent ?? "amber",
      lines: narrateList("Let's lock in what you learned.", objOrPoints.points),
    };
  }
  return { kind: "recap", heading: "Recap — what you now know", points: objOrPoints, accent: accent ?? "amber", lines: lines ?? [] };
}